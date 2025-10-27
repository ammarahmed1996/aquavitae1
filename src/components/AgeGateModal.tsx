
import React from 'react';

interface AgeGateModalProps {
  onVerify: () => void;
}

const AgeGateModal: React.FC<AgeGateModalProps> = ({ onVerify }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] animate-fade-in p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold font-serif text-brand-dark mb-4">Willkommen bei Aqua Vitae</h2>
        <p className="text-slate-600 mb-6">Bitte bestätige, dass du mindestens 18 Jahre alt bist, um fortzufahren.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onVerify}
            className="w-full bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Ja, ich bin über 18
          </button>
          <a
            href="https://www.google.com"
            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Nein, ich bin unter 18
          </a>
        </div>
        <p className="text-xs text-slate-400 mt-6">
          Der Verkauf von Alkohol an Minderjährige ist gesetzlich verboten. Bitte trinke verantwortungsbewusst.
        </p>
      </div>
    </div>
  );
};

export default AgeGateModal;
