
import React from 'react';
import { PlayCircle } from 'lucide-react';
import {
  GALLERY_IMAGE_URLS,
  UGC_VIDEO_URL,
  PRODUCT_VIDEO_URL,
  VIDEO_POSTER_URL
} from '../config';

const MediaGallery: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-dark text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif">Ein Gin für alle Sinne</h2>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
            Erlebe die Verwandlung, die Handwerkskunst und die Freude am Teilen.
          </p>
        </div>
        
        {/* Videos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video">
            <video
              className="w-full h-full object-cover"
              src={PRODUCT_VIDEO_URL}
              poster={VIDEO_POSTER_URL}
              controls
              loop
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm font-semibold">Pour & Studio Shot</div>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video">
            <video
              className="w-full h-full object-cover"
              src={UGC_VIDEO_URL}
              poster={VIDEO_POSTER_URL.replace('id/23', 'id/24')}
              controls
              playsInline
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm font-semibold">Unboxing & Gravur</div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_IMAGE_URLS.map((url, index) => (
            <div key={index} className={`rounded-lg overflow-hidden shadow-lg group relative ${index === 0 || index === 5 ? 'col-span-2 row-span-2' : ''}`}>
              <img
                src={url}
                alt={`Aqua Vitae Gin Gallery Image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;
