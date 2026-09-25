import React from 'react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimatedComponents';

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white border-t border-slate-200/90 relative text-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[10px] font-mono font-bold tracking-widest uppercase">
            <span>3 SIMPLE STEPS TO GET STARTED</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-manrope tracking-tight">
            How AI Klub Works
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-inter font-medium leading-relaxed">
            From unboxing your custom engraved NFC smart card to growing your business network in seconds.
          </p>
        </ScrollReveal>

        {/* 3-Step Grid with Sequential Staggered Reveals */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <StaggerItem className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 hover:border-amber-400/50 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 text-slate-900">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-[#E8BD85] flex items-center justify-center font-black text-xl font-mono mb-4 shadow-md">
                01
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-700 font-bold">STEP 1</span>
              <h3 className="text-2xl font-bold text-slate-900 font-manrope mt-1">Get Your Smart Card</h3>
              <p className="text-sm text-slate-700 font-inter mt-3 leading-relaxed font-medium">
                Choose your card material: Matte Black Metal, 24K Gold, Brushed Silver, Organic Walnut Wood, or Matte PVC. Customize laser etching and logo.
              </p>
            </div>
          </StaggerItem>

          {/* Step 2 */}
          <StaggerItem className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 hover:border-amber-400/50 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 text-slate-900">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-[#E8BD85] flex items-center justify-center font-black text-xl font-mono mb-4 shadow-md">
                02
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-700 font-bold">STEP 2</span>
              <h3 className="text-2xl font-bold text-slate-900 font-manrope mt-1">Create Digital Profile</h3>
              <p className="text-sm text-slate-700 font-inter mt-3 leading-relaxed font-medium">
                Add your photo, designation, company, phone numbers, WhatsApp, LinkedIn, custom services, documents, and lead capture form.
              </p>
            </div>
          </StaggerItem>

          {/* Step 3 */}
          <StaggerItem className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 hover:border-amber-400/50 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 text-slate-900">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#F0C58A] via-[#E8BD85] to-[#D8A360] text-slate-950 flex items-center justify-center font-black text-xl font-mono mb-4 shadow-md">
                03
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-700 font-bold">STEP 3</span>
              <h3 className="text-2xl font-bold text-slate-900 font-manrope mt-1">Tap. Share. Connect.</h3>
              <p className="text-sm text-slate-700 font-inter mt-3 leading-relaxed font-medium">
                Someone taps the AI Klub card on their smartphone. The digital profile opens instantly. No recipient app installation required!
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};

