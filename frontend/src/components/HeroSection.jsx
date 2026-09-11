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
    <section className="relative min-h-[85vh] pt-8 sm:pt-14 pb-20 flex items-center justify-center bg-[#F8F9FA] text-slate-900 overflow-hidden pattern-tech">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#6C4CFF]/10 rounded-full blur-[120px] pointer-events-none animate-orb-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[500px] h-[500px] bg-[#3B82F6]/10 rounded-full blur-[120px] pointer-events-none animate-orb-slow [animation-delay:4s]" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Entrance Sequence */}
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? "show" : "hidden"}
          animate="show"
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Step 1: Branding Tagline */}
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#6C4CFF] animate-ping" />
            <span className="text-slate-800 text-xs font-bold uppercase tracking-wider font-manrope">
              Worldwide Delivery • Instant NFC Setup
            </span>
          </motion.div>

          {/* Step 2: Hero Headline - "Your Identity. One Tap." */}
          <motion.div variants={itemVariants}>
            <h1 className="hero-h1 font-extrabold text-slate-900 font-manrope tracking-tight leading-[1.02]">
              Your Identity. <br />
              <span className="aikulb-gradient-text">One Tap.</span>
            </h1>
            <p className="mt-3 text-lg font-bold text-slate-700 font-manrope">
              The Future of Business Cards & Digital Identity
            </p>
          </motion.div>

          {/* Step 3: Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-600 font-inter font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed"
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
                className="btn-pill-coral w-full sm:w-auto text-center inline-block cursor-pointer shadow-xl"
              >
                CREATE YOUR DIGITAL PROFILE
              </Link>
            </MagneticButton>

            <MagneticButton strength={4} className="w-full sm:w-auto">
              <Link
                to="/customize"
                className="w-full sm:w-auto text-center inline-block cursor-pointer bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg transition-all font-manrope"
              >
                DESIGN YOUR CARD
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Step 6: Floating Analytics & Feature Badges */}
          <motion.div
            variants={itemVariants}
            className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-inter font-medium border-t border-slate-200"
          >
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#6C4CFF]" />
              <span>100% Smartphone Compatible</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#8B5CF6]" />
              <span>No App Download Needed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#3B82F6]" />
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

      {/* Floating WhatsApp Help Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5">
        <div className="hidden sm:block bg-slate-900 text-white font-semibold text-xs py-2 px-3.5 rounded-lg shadow-2xl border border-slate-700 font-manrope">
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
