import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Check, ArrowUpRight, TrendingUp, Sparkles, MessageCircle, ShieldCheck, Zap
} from 'lucide-react';
import { MagneticButton } from './AnimatedComponents';
import { useAnimationAccessibility } from '../utils/animationUtils';

export const HeroVisualMatchingImage1 = () => {
  return (
    <div className="relative w-full max-w-[460px] mx-auto flex justify-center items-center py-6 select-none">
      
      {/* Top Floating Glass Analytics Card: Profile Views 2,840 */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute top-0 -left-2 sm:-left-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] space-y-1 font-inter min-w-[160px]"
      >
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Profile Views</div>
        <div className="text-2xl font-black text-slate-900 font-manrope tracking-tight">2,840</div>
        <div className="text-[10px] font-bold text-emerald-600 flex items-center space-x-1">
          <TrendingUp className="w-3 h-3 text-emerald-600" />
          <span>↑ 28% This Month</span>
        </div>
      </motion.div>

      {/* Main 3D Crimson Red Smart Business Card matching Image 1 */}
      <motion.div
        initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
        animate={{ opacity: 1, rotate: -4, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-[280px] sm:w-[320px] aspect-[1.586/1] rounded-3xl bg-gradient-to-br from-[#FF4D4D] via-[#FF3B3B] to-[#E62E2E] border-2 border-red-300/40 shadow-[0_30px_70px_rgba(255,59,59,0.35)] p-6 flex flex-col justify-between text-white relative overflow-hidden transform hover:rotate-0 transition-transform duration-500 group"
      >
        {/* Subtle Ambient Curved Overlay Lines */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-xl pointer-events-none" />
        
        {/* Card Header: Brand Name & Contactless NFC Logo */}
        <div className="flex justify-between items-start z-10">
          <div>
            <span className="text-xl font-black tracking-tight font-syne text-white block">TapMo</span>
            <span className="text-[9px] font-mono text-white/80 font-bold uppercase tracking-widest block">ai klub Edition</span>
          </div>
          <div className="flex items-center space-x-1 text-white opacity-90">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <span className="font-mono text-xs font-bold font-syne">)))</span>
          </div>
        </div>

        {/* Embedded Smart Chip Placeholder */}
        <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-yellow-300 via-amber-400 to-yellow-200 border border-amber-500/60 shadow-inner z-10 my-2" />

        {/* Card Footer: Smart Business Card Designation */}
        <div className="z-10 flex justify-between items-end">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest font-syne text-white">
              Smart Business Card
            </div>
            <div className="text-[10px] text-white/80 font-mono font-medium">NFC + Dynamic QR Core</div>
          </div>
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Bottom Floating Glass Analytics Card: Leads Generated 148 */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute -bottom-2 -right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] space-y-1.5 font-inter min-w-[170px]"
      >
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Leads Generated</div>
        <div className="text-2xl font-black text-slate-900 font-manrope tracking-tight">148</div>
        <div className="pt-1 border-t border-slate-100 text-[10px] font-semibold text-slate-500 flex items-center space-x-1">
          <MessageCircle className="w-3 h-3 text-[#FF3B3B]" />
          <span>Need any Help? <strong className="text-slate-900">Chat with us</strong></span>
        </div>
      </motion.div>

    </div>
  );
};

export const HeroSection = () => {
  const { prefersReducedMotion } = useAnimationAccessibility();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const featureBadges = [
    'Instant Contact Sharing',
    'Dynamic QR Code',
    'WhatsApp Integration',
    'Team Management',
    'Lead Capture Form',
    'Lifetime Access',
  ];

  return (
    <section className="relative min-h-[85vh] pt-4 sm:pt-8 pb-16 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50/20 text-slate-900 overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-900/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column Entrance Sequence (Matching Image 1) */}
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? "show" : "hidden"}
          animate="show"
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Hero Headline matching Image 1: "One Tap. Infinite Connections." */}
          <motion.div variants={itemVariants}>
            <h1 className="hero-h1 font-black text-slate-900 font-manrope tracking-tight leading-[1.05] text-4xl sm:text-6xl lg:text-7xl">
              One Tap. <br />
              <span className="text-[#FF3B3B] drop-shadow-sm font-extrabold">Infinite Connections.</span>
            </h1>
          </motion.div>

          {/* Supporting Subtitle Text matching Image 1 */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-600 font-inter font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Share your contact details, website, WhatsApp, social profiles, portfolio and brochures instantly with a single tap. No apps. No paper. No hassle.
          </motion.p>

          {/* 6 Quick Feature Badges Grid matching Image 1 */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 max-w-lg mx-auto lg:mx-0 pt-1"
          >
            {featureBadges.map((badge, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-red-400/60 px-4 py-2.5 rounded-2xl text-xs font-extrabold text-slate-800 flex items-center space-x-2 transition-all duration-200"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{badge}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4 w-full"
          >
            <MagneticButton strength={4} className="w-full sm:w-auto">
              <Link
                to="/create-profile"
                className="w-full sm:w-auto text-center block cursor-pointer bg-[#FF3B3B] hover:bg-[#e03030] text-white font-extrabold text-xs sm:text-sm px-8 py-4 rounded-full shadow-lg shadow-red-500/25 transition-all font-manrope uppercase tracking-wider transform hover:scale-105"
              >
                CREATE YOUR DIGITAL PROFILE
              </Link>
            </MagneticButton>

            <MagneticButton strength={4} className="w-full sm:w-auto">
              <Link
                to="/customize"
                className="w-full sm:w-auto text-center block cursor-pointer bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-full shadow-md transition-all font-manrope uppercase tracking-wider"
              >
                DESIGN YOUR CARD
              </Link>
            </MagneticButton>
          </motion.div>

        </motion.div>

        {/* Right Visual Column with 3D Red Smart Card & Real-time Analytics Cards (Image 1 Visual) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <HeroVisualMatchingImage1 />
        </motion.div>
      </div>
    </section>
  );
};
