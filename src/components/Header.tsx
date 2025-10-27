
import React from 'react';
import { Gift } from 'lucide-react';

const Header: React.FC = () => {
  const scrollToPurchase = () => {
    document.getElementById('purchase-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm animate-fade-in">
      <div className="bg-brand-gold text-white text-center p-2 text-sm font-medium flex items-center justify-center">
        <Gift className="w-4 h-4 mr-2" />
        Holiday Deal – bis Heiligabend sparen und personalisieren!
      </div>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-serif text-brand-blue font-bold">
          Aqua Vitae
        </h1>
        <button
          onClick={scrollToPurchase}
          className="bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Jetzt personalisieren
        </button>
      </div>
    </header>
  );
};

export default Header;
