
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const faqs = [
  {
    question: 'Wie lange dauert der Versand?',
    answer: 'Wir versenden deine Bestellung innerhalb von 24 Stunden. In der Regel dauert der Versand mit unserem Partner DHL 2-3 Werktage innerhalb Deutschlands.',
  },
  {
    question: 'Welche Zeichen sind für die Gravur erlaubt?',
    answer: 'Du kannst Buchstaben (A-Z), Zahlen (0-9) und die Sonderzeichen & . - verwenden. Umlaute wie ä, ö, ü werden automatisch als AE, OE, UE graviert, um die bestmögliche Lesbarkeit zu gewährleisten.',
  },
  {
    question: 'Kann ich meine Bestellung widerrufen?',
    answer: 'Standardprodukte können innerhalb von 14 Tagen widerrufen werden. Bitte beachte jedoch, dass personalisierte Produkte (Flaschen mit individueller Kork-Gravur) vom Widerrufsrecht ausgeschlossen sind, es sei denn, es liegt ein Mangel am Produkt vor.',
  },
  {
    question: 'Wie wird das Alter bei der Zustellung geprüft?',
    answer: 'Wir versenden unsere Produkte mit einer Alterssichtprüfung durch DHL. Der Zusteller prüft bei der Übergabe, ob die empfangende Person volljährig ist. Eine Zustellung an Packstationen ist daher nicht möglich.',
  },
];

interface FAQItemProps {
  item: { question: string, answer: string };
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left text-lg font-medium text-brand-dark"
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <ChevronDown className={twMerge("w-6 h-6 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <div
        className={twMerge(
          "grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out",
          isOpen && "grid-rows-[1fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="pt-2 text-slate-600">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};


const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif">Häufig gestellte Fragen</h2>
        </div>
        <div>
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              item={faq} 
              isOpen={openIndex === index} 
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
