import React from 'react';
import { CreditCard, UserCheck, Smartphone, ArrowRight, Zap } from 'lucide-react';
import { BlackMetalCardVisual, NfcSignalWaves } from './ProductVisuals';

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-[#111111] border-t border-slate-200 dark:border-slate-800/80 relative pattern-tech transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#6C4CFF]/10 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider">
            Simple 3-Step Process
          </div>
          <h2 className="section-h2 text-slate-900 dark:text-white">
            How aikulb Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-inter">
            From unboxing your custom engraved NFC smart card to growing your business network in seconds.
          </p>
        </div>

        {/* 3-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="p-8 rounded-3xl bg-[#F7F7F5] dark:bg-[#090909] border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#6C4CFF]/15 text-[#6C4CFF] flex items-center justify-center font-black text-xl font-mono mb-4">
                01
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#6C4CFF] font-bold">STEP 1</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-manrope mt-1">Get Your Smart Card</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-inter mt-2 leading-relaxed">
                Choose your card material: Matte Black Metal, 24K Gold, Brushed Silver, Organic Walnut Wood, or Matte PVC. Customize laser etching and logo.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-slate-800">
              <BlackMetalCardVisual name="EXECUTIVE CUSTOM" title="aikulb PASSPORT" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-8 rounded-3xl bg-[#F7F7F5] dark:bg-[#090909] border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center font-black text-xl font-mono mb-4">
                02
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#8B5CF6] font-bold">STEP 2</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-manrope mt-1">Create Digital Profile</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-inter mt-2 leading-relaxed">
                Add your photo, designation, company, phone numbers, WhatsApp, LinkedIn, custom services, documents, and lead capture form.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs font-inter">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-semibold">Contact Data:</span>
                <span className="text-emerald-500 font-mono font-bold">VCF Ready</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-semibold">Social Links:</span>
                <span className="text-[#6C4CFF] font-mono font-bold">8 Connected</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="font-semibold">Lead CRM:</span>
                <span className="text-[#8B5CF6] font-mono font-bold">Enabled</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-8 rounded-3xl bg-[#F7F7F5] dark:bg-[#090909] border border-[#6C4CFF]/30 space-y-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl aikulb-gradient-bg text-white flex items-center justify-center font-black text-xl font-mono mb-4 shadow-lg shadow-[#6C4CFF]/30">
                03
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#6C4CFF] font-bold">STEP 3</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-manrope mt-1">Tap. Share. Connect.</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-inter mt-2 leading-relaxed">
                Someone taps the aikulb card on their smartphone. The digital profile opens instantly. No recipient app installation required!
              </p>
            </div>

            {/* Animated CARD -> NFC SIGNAL -> PHONE -> PROFILE Flow */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-center">
              <div className="flex flex-col items-center">
                <CreditCard className="w-5 h-5 text-[#6C4CFF] mb-1" />
                <span className="text-[9px] text-slate-500 font-mono font-bold">CARD</span>
              </div>
              
              <NfcSignalWaves className="w-8 h-8 text-[#6C4CFF]" />

              <div className="flex flex-col items-center">
                <Smartphone className="w-5 h-5 text-[#8B5CF6] mb-1" />
                <span className="text-[9px] text-slate-500 font-mono font-bold">PHONE</span>
              </div>

              <ArrowRight className="w-4 h-4 text-[#3B82F6]" />

              <div className="flex flex-col items-center">
                <UserCheck className="w-5 h-5 text-emerald-500 mb-1" />
                <span className="text-[9px] text-slate-500 font-mono font-bold">PROFILE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
