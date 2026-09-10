import React from 'react';
import { Link } from 'react-router-dom';
import { HandTappingCardPhoneVisual } from './ProductVisuals';
import { MessageCircle } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] pt-32 sm:pt-40 pb-20 flex items-center justify-center bg-[#000000] text-white overflow-hidden">
      {/* Background Subtle Gradient radial light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,56,56,0.08),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text Content */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Worldwide Delivery Tagline */}
          <div className="text-neutral-300 text-lg sm:text-xl font-medium tracking-wide font-manrope">
            Worldwide Delivery
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold text-white font-manrope tracking-tight leading-[1.04]">
            The Future of <br />
            Business Cards
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-neutral-300 font-inter font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Instantly share your contact and social profiles with a single tap!
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link
              to="/create-profile"
              className="btn-pill-outline-white w-full sm:w-auto text-center"
            >
              CREATE FREE PROFILE
            </Link>

            <Link
              to="/customize"
              className="btn-pill-coral w-full sm:w-auto text-center"
            >
              DESIGN YOUR CARD
            </Link>
          </div>
        </div>

        {/* Right Visual Column - Hand Tapping Phone Visual */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <HandTappingCardPhoneVisual />
        </div>
      </div>

      {/* Floating WhatsApp Help Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5">
        <div className="hidden sm:block bg-white text-black font-semibold text-xs py-2 px-3.5 rounded-lg shadow-2xl border border-neutral-200 font-manrope">
          Need any Help? Chat with us
        </div>
        <a
          href="https://wa.me/919999999999?text=Hi%20aikulb%20Team!%20I%20have%20a%20question%20about%20smart%20cards."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110 cursor-pointer"
          title="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        </a>
      </div>
    </section>
  );
};

