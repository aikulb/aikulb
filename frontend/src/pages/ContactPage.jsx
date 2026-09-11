import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { ContactHelpSection } from '../components/ContactHelpSection';

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-sans relative">
      <Navbar />

      <main className="flex-grow pt-28 sm:pt-32">
        <ContactHelpSection />
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
};
