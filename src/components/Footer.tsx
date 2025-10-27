
import React from 'react';
import { Link } from 'react-router-dom';
import { INSTAGRAM_URL, FACEBOOK_URL, LEGAL_PAGES } from '../config';
import InstagramIcon from './icons/InstagramIcon';
import FacebookIcon from './icons/FacebookIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-slate-300 py-12">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-serif text-white mb-4">Aqua Vitae</h3>
        <p className="mb-6 max-w-md mx-auto text-slate-400">Handgemachter Gin für besondere Momente.</p>
        
        <div className="flex justify-center space-x-6 mb-8">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-300 hover:text-white transition-colors">
            <InstagramIcon className="w-7 h-7" />
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-300 hover:text-white transition-colors">
            <FacebookIcon className="w-7 h-7" />
          </a>
        </div>

        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-8 text-sm">
          {LEGAL_PAGES.map(page => (
            <Link key={page.path} to={page.path} className="hover:text-white transition-colors">
              {page.label}
            </Link>
          ))}
        </div>

        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Aqua Vitae. Alle Rechte vorbehalten. Genuss mit Verantwortung.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
