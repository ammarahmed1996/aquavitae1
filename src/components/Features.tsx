
import React from 'react';
import { Leaf, FlaskConical, Gem, Droplets } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="w-10 h-10 text-brand-gold" />,
    title: 'Made in Germany',
    description: 'Regional und nachhaltig in Deutschland hergestellt.',
  },
  {
    icon: <FlaskConical className="w-10 h-10 text-brand-gold" />,
    title: 'Handgemacht – Apotheker-Tradition',
    description: 'Nach traditionellen Rezepturen in kleinen Chargen destilliert.',
  },
  {
    icon: <Gem className="w-10 h-10 text-brand-gold" />,
    title: 'Limitierte Edition',
    description: 'Exklusiv für Weihnachten & Silvester – nur solange der Vorrat reicht.',
  },
  {
    icon: <Droplets className="w-10 h-10 text-brand-gold" />,
    title: 'Farbwechsel mit Zitrone',
    description: 'Ein magischer Effekt, der von tiefblau zu einem leuchtenden Lila wechselt.',
  },
];

const Features: React.FC = () => {
  return (
    <section className="bg-brand-light py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif">Die Seele von Aqua Vitae</h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Jede Flasche ist ein Versprechen – für Qualität, Handwerkskunst und unvergessliche Momente.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-brand-dark">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
