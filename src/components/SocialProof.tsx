
import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Julia R.',
    text: 'Das perfekte Geschenk! Die Gravur war wunderschön und der Gin schmeckt fantastisch. Der Farbwechsel ist der Hammer auf jeder Party.',
    rating: 5,
  },
  {
    name: 'Markus T.',
    text: 'Super schnelle Lieferung und eine wirklich edle Flasche. Man schmeckt die Qualität der Botanicals. Absolute Empfehlung!',
    rating: 5,
  },
  {
    name: 'Sophie B.',
    text: 'Ich bin begeistert! Habe den Gin als Geschenk für meinen Mann gekauft und er war hin und weg. Sieht toll aus und schmeckt noch besser.',
    rating: 5,
  },
];

const ugcImages = [
    'https://picsum.photos/id/102/400/400',
    'https://picsum.photos/id/103/400/400',
    'https://picsum.photos/id/104/400/400',
    'https://picsum.photos/id/105/400/400',
];

const SocialProof: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif">Was unsere Kunden sagen</h2>
          <p className="text-slate-600 mt-2">Echte Momente, geteilt von Gin-Liebhabern.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-brand-gold">
              <div className="flex items-center mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 italic mb-4">"{review.text}"</p>
              <p className="font-bold text-right text-brand-dark">- {review.name}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ugcImages.map((img, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                    <img src={img} alt={`User generated content ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" loading="lazy" />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
