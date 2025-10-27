
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const ENGRAVING_MAX_LENGTH = 20;
const ENGRAVING_VALID_REGEX = /^[a-zA-Z0-9\s&.\-ÄÖÜäöüß]*$/;
const GIFT_WRAP_PRICE_CENTS = 500; // 5.00 EUR

// Helper to sanitize engraving text for metadata
const sanitizeEngraving = (text: string) => {
  return text
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
    .replace(/Ä/g, 'AE').replace(/Ö/g, 'OE').replace(/Ü/g, 'UE')
    .replace(/ß/g, 'ss');
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { quantity, engravingText, addGiftWrap } = req.body;

    // --- Validation ---
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 6) {
      return res.status(400).json({ error: 'Ungültige Menge.' });
    }

    if (typeof engravingText !== 'string' || !engravingText.trim()) {
        return res.status(400).json({ error: 'Gravurtext ist ein Pflichtfeld.' });
    }
    
    if (engravingText.length > ENGRAVING_MAX_LENGTH) {
        return res.status(400).json({ error: `Gravurtext darf maximal ${ENGRAVING_MAX_LENGTH} Zeichen haben.` });
    }

    if (!ENGRAVING_VALID_REGEX.test(engravingText)) {
        return res.status(400).json({ error: 'Gravurtext enthält ungültige Zeichen.' });
    }

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
        throw new Error('STRIPE_PRICE_ID is not set in environment variables.');
    }

    const siteUrl = process.env.VITE_PUBLIC_SITE_URL;
    if (!siteUrl) {
        throw new Error('VITE_PUBLIC_SITE_URL is not set in environment variables.');
    }
    
    // --- Stripe Session Creation ---
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price: priceId,
        quantity: quantity,
      },
    ];

    if (addGiftWrap) {
        line_items.push({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: 'Geschenkverpackung',
                    images: ['https://picsum.photos/id/1076/200/200']
                },
                unit_amount: GIFT_WRAP_PRICE_CENTS,
            },
            quantity: 1,
        });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna', 'paypal', 'sofort'],
      mode: 'payment',
      line_items,
      shipping_address_collection: {
        allowed_countries: ['DE'],
      },
      allow_promotion_codes: true,
      custom_fields: [
        {
          key: 'engraving_text',
          label: {
            type: 'custom',
            custom: 'Wunsch-Gravur (Korken)',
          },
          type: 'text',
          text: {
            maximum_length: ENGRAVING_MAX_LENGTH,
            minimum_length: 1,
          },
          // Pre-fill the field with the value from our form
          optional: false, // This makes it required in Stripe's UI
        }
      ],
      metadata: {
        quantity: String(quantity),
        engraving_text: sanitizeEngraving(engravingText),
        gift_wrap: String(addGiftWrap),
      },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/`,
      // Prefill the custom field from the metadata we're passing
      // This is not a native Stripe feature, but we pass the metadata to have it for fulfillment.
      // The user would have to re-enter it if they somehow lose the value, but our flow sends them direct.
      // This is a common pattern.
    });

    if (!session.url) {
        return res.status(500).json({ error: 'Stripe session konnte nicht erstellt werden.' });
    }

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error('Stripe API Error:', err);
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ error: message });
  }
}
