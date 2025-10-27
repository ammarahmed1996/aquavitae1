
import React, { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingCart, Gift, AlertCircle } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import {
  PRODUCT_NAME,
  PRODUCT_DETAILS,
  PRICE_EUR,
  ENGRAVING_MAX_LENGTH,
  ENGRAVING_VALID_REGEX,
  ENGRAVING_HINT,
  SHIPPING_TEXT,
  DEADLINE,
  GIFT_WRAP_PRICE_EUR,
} from '../config';

const PurchaseSection: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [engraving, setEngraving] = useState('');
  const [addGiftWrap, setAddGiftWrap] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [engravingError, setEngravingError] = useState<string | null>(null);

  const { isExpired } = useCountdown(DEADLINE);

  const totalPrice = (quantity * PRICE_EUR + (addGiftWrap ? GIFT_WRAP_PRICE_EUR : 0)).toFixed(2);

  useEffect(() => {
    validateEngraving(engraving);
  }, [engraving]);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, Math.min(6, prev + amount)));
  };

  const validateEngraving = (text: string) => {
    if (!text) {
      setEngravingError('Die Gravur ist ein Pflichtfeld.');
      return false;
    }
    if (text.length > ENGRAVING_MAX_LENGTH) {
      setEngravingError(`Maximal ${ENGRAVING_MAX_LENGTH} Zeichen erlaubt.`);
      return false;
    }
    if (!ENGRAVING_VALID_REGEX.test(text)) {
      setEngravingError(`Unerlaubte Zeichen. Erlaubt: ${ENGRAVING_HINT}. Umlaute werden als AE, OE, UE graviert.`);
      return false;
    }
    setEngravingError(null);
    return true;
  };

  const handleEngravingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEngraving(e.target.value);
  };
  
  const handleCheckout = async () => {
    setError(null);
    if (!validateEngraving(engraving) || isExpired) {
      return;
    }
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          quantity, 
          engravingText: engraving,
          addGiftWrap,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Ein Fehler ist aufgetreten.');
      }
      
      const { url } = await response.json();
      window.location.href = url;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout konnte nicht gestartet werden.');
      setIsProcessing(false);
    }
  };

  return (
    <section id="purchase-section" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img src="https://images.unsplash.com/photo-1627236560113-d8a14354e2a8?q=80&w=1974&auto=format&fit=crop" alt={PRODUCT_NAME} className="rounded-lg shadow-2xl w-full" loading="lazy" />
        </div>
        <div className="animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-brand-dark mb-2">{PRODUCT_NAME}</h2>
          <p className="text-slate-600 mb-4">{PRODUCT_DETAILS}</p>
          <p className="text-4xl md:text-5xl font-bold text-brand-blue mb-6">€{totalPrice.replace('.', ',')}</p>

          {isExpired ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <p className="font-bold">Aktion beendet</p>
              <p>Die limitierte Weihnachts-Aktion ist leider abgelaufen.</p>
            </div>
          ) : (
            <>
              {/* Quantity Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Menge</label>
                <div className="flex items-center">
                  <button onClick={() => handleQuantityChange(-1)} className="p-2 border rounded-l-md hover:bg-slate-100 transition"><Minus size={16}/></button>
                  <span className="px-6 py-2 border-t border-b font-bold text-lg">{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} className="p-2 border rounded-r-md hover:bg-slate-100 transition"><Plus size={16}/></button>
                </div>
              </div>

              {/* Engraving Input */}
              <div className="mb-4">
                <label htmlFor="engraving" className="block text-sm font-medium text-slate-700 mb-2">
                  Personalisierter Kork <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="engraving" 
                    value={engraving}
                    onChange={handleEngravingChange}
                    maxLength={ENGRAVING_MAX_LENGTH}
                    className={`w-full p-3 border rounded-md shadow-sm ${engravingError ? 'border-red-500' : 'border-slate-300 focus:border-brand-blue'} focus:ring-brand-blue transition`}
                    placeholder="Dein Wunschtext..."
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    {engraving.length}/{ENGRAVING_MAX_LENGTH}
                  </span>
                </div>
                {engravingError && <p className="text-red-600 text-sm mt-1">{engravingError}</p>}
                <p className="text-xs text-slate-500 mt-1">Erlaubt: {ENGRAVING_HINT}. Umlaute (ä,ö,ü) werden als AE, OE, UE graviert.</p>
              </div>

              {/* Gift Wrap Checkbox */}
              <div className="mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={addGiftWrap} onChange={() => setAddGiftWrap(v => !v)} className="h-5 w-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue-light" />
                  <span className="text-slate-700 flex items-center">
                    <Gift className="w-5 h-5 mr-2 text-brand-gold" />
                    Als Geschenk verpacken? (+{GIFT_WRAP_PRICE_EUR.toFixed(2).replace('.', ',')} €)
                  </span>
                </label>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center" role="alert">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              <button 
                onClick={handleCheckout} 
                disabled={isProcessing || !!engravingError || engraving.length === 0}
                className="w-full bg-brand-blue hover:bg-brand-blue-light disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-lg"
              >
                <ShoppingCart className="w-6 h-6 mr-3" />
                {isProcessing ? 'Bitte warten...' : 'Sicher bezahlen'}
              </button>

              <div className="text-center text-sm text-slate-500 mt-4">
                <p>{SHIPPING_TEXT} inkl. Sendungsverfolgung</p>
                <p>Abgabe nur an Personen über 18 Jahre.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PurchaseSection;
