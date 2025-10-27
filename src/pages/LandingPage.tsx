
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import PurchaseSection from '../components/PurchaseSection';
import Features from '../components/Features';
import MediaGallery from '../components/MediaGallery';
import SocialProof from '../components/SocialProof';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-brand-light">
      <Header />
      <main>
        <Hero />
        <PurchaseSection />
        <Features />
        <MediaGallery />
        <SocialProof />
        <FAQ />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default LandingPage;
