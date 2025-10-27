
import React from 'react';
import Countdown from './Countdown';
import { HERO_IMAGE_URL, DEADLINE, CURRENT_STOCK, TOTAL_STOCK } from '../config';

const Hero: React.FC = () => {
  const stockPercentage = (CURRENT_STOCK / TOTAL_STOCK) * 100;
  
  const scrollToPurchase = () => {
    document.getElementById('purchase-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative text-white min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center animate-slide-up">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 tracking-tight shadow-text">
          Der Gin, der deinen Namen trägt.
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 text-slate-200">
          Verschenke Aqua Vitae mit personalisiertem Kork – perfekt zu Weihnachten & Silvester.
        </p>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-2xl mx-auto shadow-2xl border border-white/20">
          <Countdown targetDate={DEADLINE} />
          
          <div className="mt-6">
            <div className="flex justify-between items-center text-sm font-medium mb-1">
              <span>Limitierter Vorrat</span>
              <span>Nur noch <strong>{CURRENT_STOCK}</strong> Flaschen</span>
            </div>
            <div className="w-full bg-slate-500 rounded-full h-2.5">
              <div 
                className="bg-brand-gold h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${stockPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <button 
          onClick={scrollToPurchase}
          className="mt-10 bg-brand-gold hover:bg-yellow-600 text-brand-dark font-bold text-lg py-4 px-10 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
          Zum Angebot
        </button>
      </div>
    </section>
  );
};

export default Hero;
