import React from 'react';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { TrustMarquee } from '../components/TrustMarquee';
import { ValueProp } from '../components/ValueProp';
import { HowItWorks } from '../components/HowItWorks';
import { ProductCategoriesSection } from '../components/ProductCategoriesSection';
import { CustomCardDesignerSection } from '../components/CustomCardDesignerSection';
import { DigitalProfileDemoSection } from '../components/DigitalProfileDemoSection';
import { BusinessTeamsSection } from '../components/BusinessTeamsSection';
import { SmartReviewSection } from '../components/SmartReviewSection';
import { SmartStandSection } from '../components/SmartStandSection';
import { IndustrySolutionsSection } from '../components/IndustrySolutionsSection';
import { AIFeaturesSection } from '../components/AIFeaturesSection';
import { TestimonialsAndFaqSection } from '../components/TestimonialsAndFaqSection';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 flex flex-col font-sans">
      {/* Fixed Top Header Container with AnnouncementBar & Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Navbar />
      </header>

      {/* Main Homepage Content Assembly */}
      <main className="flex-grow pt-14">
        <HeroSection />
        <TrustMarquee />
        <ValueProp />
        <HowItWorks />
        <ProductCategoriesSection />
        <CustomCardDesignerSection />
        <DigitalProfileDemoSection />
        <BusinessTeamsSection />
        <SmartReviewSection />
        <SmartStandSection />
        <IndustrySolutionsSection />
        <AIFeaturesSection />
        <TestimonialsAndFaqSection />
      </main>

      {/* Global Cart Drawer Component */}
      <CartDrawer />

      {/* Footer Component */}
      <Footer />
    </div>
  );
};
