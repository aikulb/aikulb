import React from 'react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimatedComponents';

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white border-t border-slate-200/90 relative text-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="section-h2 text-slate-900 font-extrabold">
            How AI Klub Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-inter font-medium">
            From unboxing your custom engraved NFC smart card to growing your business network in seconds.
          </p>
        </ScrollReveal>

        {/* 3-Step Grid with Sequential Staggered Reveals */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <StaggerItem className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 hover:border-red-400/50 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 text-slate-900">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF3B3B] text-white flex items-center justify-center font-black text-xl font-mono mb-4 shadow-md shadow-red-500/20">
                01
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF3B3B] font-bold">STEP 1</span>
              <h3 className="text-2xl font-bold text-slate-900 font-manrope mt-1">Get Your Smart Card</h3>
              <p className="text-sm text-slate-600 font-inter mt-3 leading-relaxed font-medium">
                Choose your card material: Matte Black Metal, 24K Gold, Brushed Silver, Organic Walnut Wood, or Matte PVC. Customize laser etching and logo.
              </p>
            </div>
          </StaggerItem>

          {/* Step 2 */}
          <StaggerItem className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 hover:border-red-400/50 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 text-slate-900">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF3B3B] text-white flex items-center justify-center font-black text-xl font-mono mb-4 shadow-md shadow-red-500/20">
                02
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF3B3B] font-bold">STEP 2</span>
              <h3 className="text-2xl font-bold text-slate-900 font-manrope mt-1">Create Digital Profile</h3>
              <p className="text-sm text-slate-600 font-inter mt-3 leading-relaxed font-medium">
                Add your photo, designation, company, phone numbers, WhatsApp, LinkedIn, custom services, documents, and lead capture form.
              </p>
            </div>
          </StaggerItem>

          {/* Step 3 */}
          <StaggerItem className="p-8 rounded-3xl bg-[#F8FAFC] border border-red-300/80 space-y-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 text-slate-900">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#FF4D4D] to-[#FF3B3B] text-white flex items-center justify-center font-black text-xl font-mono mb-4 shadow-md shadow-red-500/30">
                03
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF3B3B] font-bold">STEP 3</span>
              <h3 className="text-2xl font-bold text-slate-900 font-manrope mt-1">Tap. Share. Connect.</h3>
              <p className="text-sm text-slate-600 font-inter mt-3 leading-relaxed font-medium">
                Someone taps the AI Klub card on their smartphone. The digital profile opens instantly. No recipient app installation required!
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};

