import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, ChevronRight, Wifi, QrCode, Zap
} from 'lucide-react';
import { MagneticButton, ScrollReveal } from './AnimatedComponents';
import { TrishulAkEmblem } from './ProductVisuals';
import homePageVideo from '../videos/HomePage.mp4';

export const DarkHeroSection = () => {
  return (
    <section className="relative min-h-[90vh] pt-10 sm:pt-14 pb-16 sm:pb-24 flex items-center justify-center bg-[#07090E] text-white border-b border-slate-800/80 overflow-hidden select-none">
      
      {/* 1. DYNAMIC BACKGROUND VIDEO (Positioned on Right Side) */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-3/5 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105 opacity-90 transition-all duration-700"
        >
          <source src={homePageVideo} type="video/mp4" />
        </video>

        {/* Black Gradient Overlay on top from Right to Left (Transparent on Right -> Black on Left) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090E] via-[#07090E]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-[#07090E]/40" />
      </div>

      {/* 2. AMBIENT WARM GOLDEN RADIAL GLOWS */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#E8BD85]/12 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-600/8 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* 3. HERO CONTENT CONTAINER (Shifted Left) */}
      <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <ScrollReveal className="max-w-2xl space-y-6 text-left flex flex-col items-start">
          
          {/* Top Tagline matching Image 4 (Left line + Tagline text) */}
          <div className="flex items-center justify-start space-x-3 text-[#E8BD85] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
            <span className="w-8 h-[2px] bg-[#E8BD85] rounded-full shrink-0"></span>
            <span>PREMIUM NFC SMART BUSINESS & DIGITAL IDENTITY PLATFORM</span>
          </div>

          {/* Main Title: Your Digital Identity. One Tap Away. */}
          <div className="space-y-2 text-left">
            <h1 className="font-black text-white font-manrope tracking-tight leading-[1.04] text-4xl sm:text-6xl lg:text-7xl">
              Your Digital Identity. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCE5BF] via-[#E8BD85] to-[#C99855] drop-shadow-[0_0_35px_rgba(232,189,133,0.35)] font-black">
                One Tap Away.
              </span>
            </h1>
          </div>

          {/* Description Paragraph */}
          <p className="text-base sm:text-lg text-slate-300 font-inter font-medium leading-relaxed max-w-xl text-left">
            Share your contact details, social profiles and professional identity instantly with NFC + QR.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 pt-2 w-full sm:w-auto font-manrope">
            <MagneticButton strength={4} className="w-full sm:w-auto">
              <Link
                to="/store"
                className="w-full sm:w-auto text-center cursor-pointer bg-gradient-to-r from-[#F0C58A] via-[#E8BD85] to-[#D8A360] hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm px-8 py-4 rounded-full shadow-[0_0_30px_rgba(232,189,133,0.35)] transition-all uppercase tracking-wider inline-flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <span>Get Your Card</span>
                <ChevronRight className="w-4 h-4 text-slate-950 stroke-[3]" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={4} className="w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto text-center cursor-pointer bg-slate-900/80 hover:bg-slate-800/90 text-white border border-[#E8BD85]/40 font-bold text-xs sm:text-sm px-8 py-4 rounded-full shadow-md transition-all uppercase tracking-wider inline-flex items-center justify-center space-x-2 backdrop-blur-md"
              >
                <span>See How It Works</span>
                <Play className="w-3.5 h-3.5 text-[#E8BD85] fill-[#E8BD85]" />
              </button>
            </MagneticButton>
          </div>

          {/* 3 Bottom Features matching Image 3 (Minimal divided layout) */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-6 sm:gap-0 sm:divide-x sm:divide-slate-800/90 text-left">
            
            {/* Feature 1: NFC */}
            <div className="flex items-center space-x-3 sm:pr-6">
              <div className="text-[#E8BD85]">
                <Wifi className="w-7 h-7 rotate-90" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-white block uppercase tracking-wide">NFC</span>
                <span className="text-[11px] text-slate-400 font-medium">Tap & Connect</span>
              </div>
            </div>

            {/* Feature 2: QR */}
            <div className="flex items-center space-x-3 sm:px-6">
              <div className="text-[#E8BD85]">
                <QrCode className="w-7 h-7" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-white block uppercase tracking-wide">QR</span>
                <span className="text-[11px] text-slate-400 font-medium">Scan & Share</span>
              </div>
            </div>

            {/* Feature 3: Tap to Connect */}
            <div className="flex items-center space-x-3 sm:pl-6">
              <div className="w-8 h-8 rounded-full border border-[#E8BD85]/60 text-[#E8BD85] flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 fill-[#E8BD85]" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-white block uppercase tracking-wide">Tap to Connect</span>
                <span className="text-[11px] text-slate-400 font-medium">Instant Access</span>
              </div>
            </div>

          </div>

        </ScrollReveal>

      </div>
    </section>
  );
};
