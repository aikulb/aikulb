import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Zap, Sparkles, Eye, Touchpad as Touch, QrCode, 
  UserCheck, Download, Globe, Phone, Mail, ChevronRight,
  Linkedin, Twitter, Facebook, Instagram, Paperclip
} from 'lucide-react';
import { MagneticButton } from './AnimatedComponents';
import { useAnimationAccessibility } from '../utils/animationUtils';

export const HeroPhoneProfileVisual = () => {
  return (
    <div className="relative w-full max-w-[320px] mx-auto flex justify-center items-center py-4 select-none pointer-events-none">
      {/* Real-Time Smartphone Frame (Clean Mobile Theme Matching Reference Image 1) */}
      <div className="w-[265px] sm:w-[285px] aspect-[9/18.5] rounded-[42px] p-2 bg-[#0A0B0E] border-4 border-neutral-800 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative flex flex-col justify-between overflow-hidden z-10">
        {/* Mobile Screen Notch */}
        <div className="w-24 h-3 bg-[#000000] rounded-b-xl mx-auto mb-1 border-x border-b border-neutral-800 flex items-center justify-center shrink-0">
          <div className="w-2 h-2 rounded-full bg-[#18181b]" />
        </div>

        {/* Real-time Phone Inner Display Screen - Pure White Background matching Reference Image 1 */}
        <div className="flex-1 w-full bg-[#FFFFFF] rounded-[30px] overflow-hidden border border-neutral-200 flex flex-col justify-between p-1.5 text-slate-900 overflow-y-auto scrollbar-none">
          <div className="space-y-2">
            {/* Header Red Curve Cap */}
            <div className="h-12 w-full bg-[#FF4545] rounded-b-[18px] relative overflow-hidden shrink-0" />

            {/* Split Profile Header Card */}
            <div className="-mt-8 mx-1 rounded-xl bg-[#090C15] border border-neutral-800 shadow-xl overflow-hidden flex items-stretch text-white">
              <div className="w-20 bg-neutral-900 relative shrink-0 overflow-hidden border-r border-neutral-800">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400"
                  alt="Nicholas Perry"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 p-2 bg-[#0A0D17] flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-white text-xs font-manrope leading-tight">Nicholas<br />Perry</h3>
                  <p className="text-[9px] text-slate-300 font-inter mt-0.5 font-medium">Designer @ aiklub</p>
                </div>
                <div className="pt-1">
                  <div className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-red-500/15 border border-red-500/30 text-[#FF4545] text-[8px] font-bold">
                    <img src="/assets/logo.png" alt="aiklub" className="w-2.5 h-2.5 object-contain" />
                    <span>aiklub</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-1.5 px-1 pt-0.5">
              <div className="w-full py-1.5 rounded-full bg-[#FF4545] hover:bg-[#e03838] text-white font-extrabold text-[10px] font-manrope shadow-sm flex items-center justify-center space-x-1 cursor-pointer">
                <span>Save Contact</span>
              </div>
              <div className="w-full py-1.5 rounded-full bg-[#EAEFEF] text-[#1E293B] font-extrabold text-[10px] font-manrope shadow-sm flex items-center justify-center space-x-1 cursor-pointer">
                <span>Share</span>
              </div>
            </div>

            {/* ABOUT Section */}
            <div className="px-1 pt-1">
              <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">ABOUT</span>
              <p className="text-[9px] text-slate-700 leading-snug font-inter font-medium">
                With the smart business cards and digital cards, you will be able to reach your clients very easily and hassle-free.
              </p>
            </div>

            <div className="border-b border-slate-100 my-1 mx-1" />

            {/* CONTACT ME Section */}
            <div className="px-1 space-y-1 font-inter text-[9px]">
              <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">CONTACT ME</span>
              
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full border border-red-400/50 text-[#FF4545] flex items-center justify-center bg-red-50/50">
                    <Phone className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-slate-800 font-semibold">149-219-4462</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full border border-red-400/50 text-[#FF4545] flex items-center justify-center bg-red-50/50">
                    <Mail className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-slate-800 font-semibold truncate max-w-[130px]">nicholas@aiklub.com</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full border border-red-400/50 text-[#FF4545] flex items-center justify-center bg-red-50/50">
                    <Paperclip className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-slate-800 font-semibold">www.aiklub.com</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            <div className="border-b border-slate-100 my-1 mx-1" />

            {/* ON THE SOCIAL Section */}
            <div className="px-1">
              <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">ON THE SOCIAL</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#FF4545] text-white flex items-center justify-center shadow-xs">
                  <Linkedin className="w-3 h-3" />
                </div>
                <div className="w-6 h-6 rounded-full bg-[#FF4545] text-white flex items-center justify-center shadow-xs">
                  <Twitter className="w-3 h-3" />
                </div>
                <div className="w-6 h-6 rounded-full bg-[#FF4545] text-white flex items-center justify-center shadow-xs">
                  <Facebook className="w-3 h-3" />
                </div>
                <div className="w-6 h-6 rounded-full bg-[#FF4545] text-white flex items-center justify-center shadow-xs">
                  <Instagram className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Bottom Tab Navigation Pills */}
            <div className="pt-2 px-1 pb-1 flex items-center justify-between gap-1">
              <div className="flex-1 py-1 px-1 rounded-full bg-[#FF4545] text-white text-[8px] font-bold text-center shadow-xs">
                SERVICES
              </div>
              <div className="flex-1 py-1 px-1 rounded-full bg-[#EAEFEF] text-slate-700 text-[8px] font-bold text-center">
                GALLERY
              </div>
              <div className="flex-1 py-1 px-1 rounded-full bg-[#EAEFEF] text-slate-700 text-[8px] font-bold text-center">
                TESTIMONIALS
              </div>
            </div>
          </div>
        </div>
      </div>
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
    <section className="relative min-h-[85vh] pt-2 sm:pt-4 pb-16 flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Subtle Luxury Dark Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
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
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
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

        {/* Step 5: Right Visual Column with Real-time Smartphone Visual & Analytics Widgets */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <HeroPhoneProfileVisual />
        </motion.div>
      </div>
    </section>
  );
};
