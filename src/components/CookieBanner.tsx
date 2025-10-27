
import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-brand-dark/90 backdrop-blur-sm text-white p-4 z-50 animate-slide-up">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-300">
          Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Durch die weitere Nutzung dieser Website stimmen Sie unserer Cookie-Richtlinie zu.
        </p>
        <button
          onClick={handleAccept}
          className="bg-brand-gold hover:bg-yellow-600 text-brand-dark font-bold py-2 px-6 rounded-lg text-sm flex-shrink-0"
        >
          Akzeptieren
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
