import React from 'react';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { TrustMarquee } from '../components/TrustMarquee';
import { ValueProp } from '../components/ValueProp';
import { HowItWorks } from '../components/HowItWorks';
import { ProductPortfolioSection } from '../components/ProductPortfolioSection';
import { DigitalProfileDemoSection } from '../components/DigitalProfileDemoSection';
import { ShippingDeliverySection } from '../components/ShippingDeliverySection';
import { BusinessTeamsSection } from '../components/BusinessTeamsSection';
import { TestimonialsAndFaqSection } from '../components/TestimonialsAndFaqSection';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Fixed Top Header Container with AnnouncementBar & Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black">
        <AnnouncementBar />
        <Navbar />
      </header>

      {/* Dedicated Homepage Content Assembly */}
      <main className="flex-grow pt-24 sm:pt-28">
        <HeroSection />
        <TrustMarquee />
        <ValueProp />
        <HowItWorks />
        <ProductPortfolioSection />
        <DigitalProfileDemoSection />
        <ShippingDeliverySection />
        <BusinessTeamsSection />
        <TestimonialsAndFaqSection />
      </main>

      {/* Global Cart Drawer Component */}
      <CartDrawer />

      {/* Footer Component */}
      <Footer />
    </div>
  );
};
