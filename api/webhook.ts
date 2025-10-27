import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
// FIX: Import Buffer to resolve type errors for Node.js environments.
import { Buffer } from 'buffer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// This is required to read the raw request body for webhook signature verification.
export const config = {
  api: {
    bodyParser: false,
  },
};

const readRawBody = (req: VercelRequest): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
    });
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await readRawBody(req);
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    const message = `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`;
    console.error(message);
    return res.status(400).send(message);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // FULFILLMENT LOGIC
      // This is where you would trigger your fulfillment process.
      // e.g., send order details to your ERP, a database, or an email notification.
      console.log('✅ Payment successful for session:', session.id);
      console.log('Customer email:', session.customer_details?.email);
      console.log('Metadata (Engraving):', session.metadata?.engraving_text);
      console.log('Metadata (Quantity):', session.metadata?.quantity);
      // You can retrieve line items to get full order details:
      // const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).json({ received: true });
}
