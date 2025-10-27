
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="bg-brand-light min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 max-w-2xl w-full text-center animate-fade-in">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-brand-dark mb-4">
          Danke! Bestellung eingegangen.
        </h1>
        <p className="text-slate-600 mb-6">
          Wir haben deine Bestellung erhalten und werden sie so schnell wie möglich bearbeiten.
        </p>
        <div className="bg-slate-50 p-4 rounded-md text-left text-sm">
          <p className="font-semibold text-slate-800 mb-2">Wichtiger Hinweis:</p>
          <p className="text-slate-600">
            Du erhältst in Kürze eine E-Mail von Stripe mit deiner Bestellbestätigung und allen Details. Bitte überprüfe auch deinen Spam-Ordner.
          </p>
          {sessionId && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="font-semibold text-slate-800">Deine Bestellreferenz:</p>
              <p className="text-slate-500 text-xs break-all">{sessionId}</p>
            </div>
          )}
        </div>
        <Link 
          to="/" 
          className="mt-8 inline-block bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
