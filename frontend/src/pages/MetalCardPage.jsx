import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { MetalCardSection } from '../components/MetalCardSection';

export const MetalCardPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 flex flex-col font-sans relative">
      <Navbar />
      <main className="pt-0 flex-grow w-full">
        <MetalCardSection />
      </main>
      <CartDrawer />
      <Footer />
    </div>
  );
};
