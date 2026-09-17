import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HandTappingCardPhoneVisual } from './ProductVisuals';
import { MessageCircle, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { MagneticButton } from './AnimatedComponents';
import { useAnimationAccessibility } from '../utils/animationUtils';

export const HeroSection = () => {
  const { prefersReducedMotion } = useAnimationAccessibility();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <section className="relative min-h-[85vh] pt-8 sm:pt-14 pb-20 flex items-center justify-center bg-[#070A0F] text-white overflow-hidden pattern-tech">
      {/* Background Animated Fintech Green Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#10B981]/15 rounded-full blur-[140px] pointer-events-none animate-orb-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[500px] h-[500px] bg-[#00DC82]/10 rounded-full blur-[140px] pointer-events-none animate-orb-slow [animation-delay:4s]" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Entrance Sequence */}
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? "show" : "hidden"}
          animate="show"
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Step 1: Branding Tagline */}
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0D121B] border border-emerald-900/60 shadow-md backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00DC82] animate-ping" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider font-manrope">
              Worldwide Delivery • Instant NFC Setup
            </span>
          </motion.div>

          {/* Step 2: Hero Headline - "Your Identity. One Tap." */}
          <motion.div variants={itemVariants}>
            <h1 className="hero-h1 font-extrabold text-white font-manrope tracking-tight leading-[1.02]">
              Your Identity. <br />
              <span className="bg-gradient-to-r from-[#00DC82] via-[#10B981] to-[#059669] bg-clip-text text-transparent">One Tap.</span>
            </h1>
            <p className="mt-3 text-lg font-bold text-slate-300 font-manrope">
              The Future of Business Cards & Digital Identity
            </p>
          </motion.div>

          {/* Step 3: Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-400 font-inter font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Instantly share your contact details, social links, custom services, and lead forms with a single touch. No recipient app required.
          </motion.p>

          {/* Step 4: CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
          >
            <MagneticButton strength={4} className="w-full sm:w-auto">
              <Link
                to="/create-profile"
                className="w-full sm:w-auto text-center inline-block cursor-pointer bg-gradient-to-r from-[#00DC82] via-[#10B981] to-[#059669] hover:brightness-110 text-black font-extrabold text-sm px-8 py-4 rounded-full shadow-xl shadow-[#10B981]/30 transition-all font-manrope uppercase tracking-wide"
              >
                CREATE YOUR DIGITAL PROFILE
              </Link>
            </MagneticButton>

            <MagneticButton strength={4} className="w-full sm:w-auto">
              <Link
                to="/customize"
                className="w-full sm:w-auto text-center inline-block cursor-pointer bg-[#0D121B] hover:bg-[#161F2E] text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg border border-emerald-900/60 hover:border-[#10B981] transition-all font-manrope uppercase tracking-wide"
              >
                DESIGN YOUR CARD
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Step 6: Floating Analytics & Feature Badges */}
          <motion.div
            variants={itemVariants}
            className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-inter font-medium border-t border-emerald-950"
          >
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#00DC82]" />
              <span>100% Smartphone Compatible</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#10B981]" />
              <span>No App Download Needed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#00DC82]" />
              <span>50,000+ Profiles Active</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Step 5: Right Visual Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <HandTappingCardPhoneVisual />
        </motion.div>
      </div>
    </section>
  );

};
