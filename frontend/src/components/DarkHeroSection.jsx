import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Check, Zap, Sparkles } from 'lucide-react';
import { MagneticButton, ScrollReveal } from './AnimatedComponents';
import homePageVideo from '../videos/HomePage.mp4';

export const DarkHeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-[85vh] pt-8 sm:pt-12 pb-16 sm:pb-20 flex items-center justify-center bg-gradient-to-b from-[#0B0F17] via-[#0D121E] to-[#0A0E17] text-white border-b border-slate-800/80 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#00E676]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Dark Hero Typography matching Image 1 */}
        <ScrollReveal className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          {/* Main Title: Your Identity. One Tap. */}
          <div className="space-y-2">
            <h1 className="font-black text-white font-manrope tracking-tight leading-[1.05] text-4xl sm:text-6xl lg:text-7xl">
              Your Identity. <br />
              <span className="text-[#00E676] drop-shadow-[0_0_25px_rgba(0,230,118,0.35)] font-extrabold">
                One Tap.
              </span>
            </h1>
            
            {/* Sub-header matching Image 1 */}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold font-manrope text-slate-200 pt-2 tracking-wide">
              The Future of Business Cards & Digital Identity
            </h2>
          </div>

          {/* Description Paragraph matching Image 1 */}
          <p className="text-base sm:text-lg text-slate-300 font-inter font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            Instantly share your contact details, social links, custom services, and lead forms with a single touch. No recipient app required.
          </p>

          {/* Action Buttons matching Image 1 */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3 w-full">
            <MagneticButton strength={4} className="w-full sm:w-auto">
              <Link
                to="/create-profile"
                className="w-full sm:w-auto text-center block cursor-pointer bg-[#00E676] hover:bg-[#00C853] text-slate-950 font-black text-xs sm:text-sm px-8 py-4 rounded-full shadow-[0_0_30px_rgba(0,230,118,0.4)] transition-all font-manrope uppercase tracking-wider transform hover:scale-105"
              >
                CREATE YOUR DIGITAL PROFILE
              </Link>
            </MagneticButton>

            <MagneticButton strength={4} className="w-full sm:w-auto">
              <Link
                to="/customize"
                className="w-full sm:w-auto text-center block cursor-pointer bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 font-bold text-xs sm:text-sm px-8 py-4 rounded-full shadow-md transition-all font-manrope uppercase tracking-wider"
              >
                DESIGN YOUR CARD
              </Link>
            </MagneticButton>
          </div>

          {/* 3 Trust Indicator Badges matching Image 1 */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-300">
            <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-800 px-3.5 py-2 rounded-full backdrop-blur-md">
              <div className="w-4 h-4 rounded-full bg-[#00E676]/20 text-[#00E676] flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>100% Smartphone Compatible</span>
            </div>

            <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-800 px-3.5 py-2 rounded-full backdrop-blur-md">
              <Zap className="w-4 h-4 text-[#00E676]" />
              <span>No App Download Needed</span>
            </div>

            <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-800 px-3.5 py-2 rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#00E676]" />
              <span>50,000+ Profiles Active</span>
            </div>
          </div>

        </ScrollReveal>

        {/* RIGHT COLUMN: Video Visual Container Patched with Background Gradient Colors */}
        <ScrollReveal className="lg:col-span-5 flex justify-center">
          {/* Gradient Border Frame Patched with Section Background Colors (#0B0F17 / #0D121E / slate-800) */}
          <div className="relative w-fit mx-auto p-[2px] rounded-[26px] bg-gradient-to-br from-slate-700/80 via-[#162032] to-slate-800/90 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(15,23,42,0.8)] border border-slate-700/50 transition-all duration-500">
            
            <div className="relative rounded-[24px] overflow-hidden bg-[#070A0F] group">
              
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="block max-w-full sm:max-w-[360px] lg:max-w-[380px] h-auto object-cover rounded-[24px] filter brightness-95"
              >
                <source src={homePageVideo} type="video/mp4" />
              </video>

              {/* Video Controls (Pause / Mute Buttons) */}
              <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-emerald-400 flex items-center justify-center transition hover:scale-110 cursor-pointer shadow-lg"
                  title={isPlaying ? 'Pause Video' : 'Play Video'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-emerald-400 flex items-center justify-center transition hover:scale-110 cursor-pointer shadow-lg"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00E676]" />}
                </button>
              </div>

              {/* AK Trishul Logo Badge */}
              <div className="absolute bottom-8 right-8 sm:bottom-9 sm:right-9 z-30 pointer-events-none">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-black/30 border border-white/15 shadow-xl flex items-center justify-center p-2.5 backdrop-blur-md">
                  <img src="/assets/logo.png" alt="AK Logo" className="w-full h-full object-contain mix-blend-screen filter brightness-125" />
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
