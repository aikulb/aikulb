import React from 'react';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { TrustMarquee } from '../components/TrustMarquee';
import { ValueProp } from '../components/ValueProp';
import { HowItWorks } from '../components/HowItWorks';
import { ProductPortfolioSection } from '../components/ProductPortfolioSection';
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
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 flex flex-col font-sans">
      {/* Fixed Top Header Container with AnnouncementBar & Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Navbar />
      </header>

      {/* Main Homepage Content Assembly with Proper Top Padding (pt-28 sm:pt-32 to prevent header clipping) */}
      <main className="flex-grow pt-28 sm:pt-32">
        <HeroSection />
        <TrustMarquee />
        <ValueProp />
        <HowItWorks />
        <ProductPortfolioSection />
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
