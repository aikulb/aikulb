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
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[80vh] pt-1 sm:pt-3 pb-16 flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Subtle Luxury Dark Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Entrance Sequence */}
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? "show" : "hidden"}
          animate="show"
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Step 2: Hero Headline - "Your Identity. One Tap." */}
          <motion.div variants={itemVariants}>
            <h1 className="hero-h1 font-extrabold text-white font-manrope tracking-tight leading-[1.02]">
              Your Identity. <br />
              <span className="text-[#00DC82] drop-shadow-[0_0_20px_rgba(0,220,130,0.2)] font-extrabold">One Tap.</span>
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
                className="w-full sm:w-auto text-center inline-block cursor-pointer bg-[#00DC82] hover:bg-[#00c975] text-black font-extrabold text-sm px-8 py-4 rounded-full shadow-lg transition-all font-manrope uppercase tracking-wide transform hover:scale-[1.02]"
              >
                CREATE YOUR DIGITAL PROFILE
              </Link>
            </MagneticButton>

            <MagneticButton strength={4} className="w-full sm:w-auto">
              <Link
                to="/customize"
                className="w-full sm:w-auto text-center inline-block cursor-pointer bg-white/5 hover:bg-white/10 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg border border-white/15 hover:border-white/30 transition-all font-manrope uppercase tracking-wide backdrop-blur-md"
              >
                DESIGN YOUR CARD
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Step 6: Floating Analytics & Feature Badges */}
          <motion.div
            variants={itemVariants}
            className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-inter font-medium border-t border-neutral-900"
          >
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#00DC82]" />
              <span>100% Smartphone Compatible</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#00DC82]" />
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

