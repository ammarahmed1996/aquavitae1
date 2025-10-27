
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { LegalPageType } from '../types';
import { LEGAL_PAGES } from '../config';
import impressumContent from '../../legal/impressum.md?raw';
import datenschutzContent from '../../legal/datenschutz.md?raw';
import agbContent from '../../legal/agb.md?raw';
import widerrufContent from '../../legal/widerruf.md?raw';

interface LegalPageProps {
  type: LegalPageType;
}

const legalContentMap = {
  impressum: impressumContent,
  datenschutz: datenschutzContent,
  agb: agbContent,
  widerruf: widerrufContent,
};

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(legalContentMap[type] || 'Inhalt nicht gefunden.');
  }, [type]);

  const currentPage = LEGAL_PAGES.find(p => p.type === type);

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-brand-dark text-white p-4 shadow-md">
        <div className="container mx-auto">
          <Link to="/" className="text-2xl font-serif font-bold">Aqua Vitae</Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="prose lg:prose-xl max-w-4xl mx-auto">
          <h1>{currentPage?.label}</h1>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </main>
    </div>
  );
};

export default LegalPage;
