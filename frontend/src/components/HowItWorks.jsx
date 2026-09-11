import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, UserCheck, Smartphone, ArrowRight } from 'lucide-react';
import { BlackMetalCardVisual } from './ProductVisuals';
import { ScrollReveal, StaggerContainer, StaggerItem, OriginalNfcSignal } from './AnimatedComponents';

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-[#F8F9FA] border-t border-slate-200 relative pattern-tech transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#6C4CFF]/10 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider">
            Simple 3-Step Process
          </div>
          <h2 className="section-h2 text-slate-900 font-extrabold">
            How aikulb Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-inter font-medium">
            From unboxing your custom engraved NFC smart card to growing your business network in seconds.
          </p>
        </ScrollReveal>

        {/* 3-Step Grid with Sequential Staggered Reveals */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <StaggerItem className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 flex flex-col justify-between shadow-md">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#6C4CFF]/15 text-[#6C4CFF] flex items-center justify-center font-black text-xl font-mono mb-4">
                01
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#6C4CFF] font-bold">STEP 1</span>
              <h3 className="text-2xl font-bold text-slate-900 font-manrope mt-1">Get Your Smart Card</h3>
              <p className="text-sm text-slate-600 font-inter mt-2 leading-relaxed font-medium">
                Choose your card material: Matte Black Metal, 24K Gold, Brushed Silver, Organic Walnut Wood, or Matte PVC. Customize laser etching and logo.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
              <BlackMetalCardVisual name="EXECUTIVE CUSTOM" title="aikulb PASSPORT" />
            </div>
          </StaggerItem>

          {/* Step 2 */}
          <StaggerItem className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 flex flex-col justify-between shadow-md">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center font-black text-xl font-mono mb-4">
                02
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#8B5CF6] font-bold">STEP 2</span>
              <h3 className="text-2xl font-bold text-slate-900 font-manrope mt-1">Create Digital Profile</h3>
              <p className="text-sm text-slate-600 font-inter mt-2 leading-relaxed font-medium">
                Add your photo, designation, company, phone numbers, WhatsApp, LinkedIn, custom services, documents, and lead capture form.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2.5 text-xs font-inter font-medium">
              <div className="flex items-center justify-between text-slate-800 border-b border-slate-200 pb-2">
                <span className="font-semibold">Contact Data:</span>
                <span className="text-emerald-600 font-mono font-bold">VCF Ready</span>
              </div>
              <div className="flex items-center justify-between text-slate-800 border-b border-slate-200 pb-2">
                <span className="font-semibold">Social Links:</span>
                <span className="text-[#6C4CFF] font-mono font-bold">8 Connected</span>
              </div>
              <div className="flex items-center justify-between text-slate-800">
                <span className="font-semibold">Lead CRM:</span>
                <span className="text-[#8B5CF6] font-mono font-bold">Enabled</span>
              </div>
            </div>
          </StaggerItem>

          {/* Step 3 */}
          <StaggerItem className="p-8 rounded-3xl bg-white border border-[#6C4CFF]/30 space-y-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl aikulb-gradient-bg text-white flex items-center justify-center font-black text-xl font-mono mb-4 shadow-lg shadow-[#6C4CFF]/30">
                03
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#6C4CFF] font-bold">STEP 3</span>
              <h3 className="text-2xl font-bold text-slate-900 font-manrope mt-1">Tap. Share. Connect.</h3>
              <p className="text-sm text-slate-600 font-inter mt-2 leading-relaxed font-medium">
                Someone taps the aikulb card on their smartphone. The digital profile opens instantly. No recipient app installation required!
              </p>
            </div>

            {/* Animated CARD -> NFC SIGNAL -> PHONE -> PROFILE Flow */}
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between text-center overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <CreditCard className="w-5 h-5 text-[#6C4CFF] mb-1" />
                <span className="text-[9px] text-slate-600 font-mono font-bold">CARD</span>
              </motion.div>
              
              <div className="w-10 h-10 flex items-center justify-center">
                <OriginalNfcSignal className="w-8 h-8" />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center"
              >
                <Smartphone className="w-5 h-5 text-[#8B5CF6] mb-1" />
                <span className="text-[9px] text-slate-600 font-mono font-bold">PHONE</span>
              </motion.div>

              <ArrowRight className="w-4 h-4 text-[#3B82F6]" />

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col items-center"
              >
                <UserCheck className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-[9px] text-slate-600 font-mono font-bold">PROFILE</span>
              </motion.div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};
