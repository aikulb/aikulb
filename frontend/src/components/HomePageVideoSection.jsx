import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, Play, Pause, Check, ShieldCheck, Zap } from 'lucide-react';
import { ScrollReveal } from './AnimatedComponents';
import homePageVideo from '../videos/HomePage.mp4';

export const HomePageVideoSection = () => {
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

  const checklistItems = [
    'Tap your ai klub Card on any smartphone',
    'Your Digital Profile opens instantly',
    'Save contact details in one click',
    'Share social media, website & portfolio',
    'Works with Android & iPhone',
    'No App. No Subscription. Lifetime Access',
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0D1220] via-[#090D16] to-[#0B0F19] text-white relative overflow-hidden border-b border-slate-800/80 transition-colors duration-300">
      {/* Subtle ambient radial glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00DC82]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2-Column Side-by-Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Text Context & Benefits Checklist */}
          <ScrollReveal className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-manrope text-white tracking-tight leading-[1.1]">
                How ai klub Card Works
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-inter font-medium leading-relaxed max-w-2xl">
                Share your contact details, website, social media profiles, portfolio, brochures and more with a single tap. No app required.
              </p>
            </div>

            {/* Checklist items */}
            <div className="space-y-3 pt-2">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-sm sm:text-base text-slate-200 font-inter font-semibold">
                  <div className="w-5 h-5 rounded-full bg-[#00DC82]/15 border border-[#00DC82]/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#00DC82]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Bottom Highlight Callout Box */}
            <div className="mt-6 p-5 rounded-2xl bg-[#0E1524] border border-slate-800/90 space-y-1.5 shadow-xl">
              <h4 className="font-extrabold text-sm sm:text-base text-[#00DC82] font-manrope flex items-center space-x-2">
                <span>Tap Card</span>
                <span className="text-slate-500">→</span>
                <span>Open Digital Profile</span>
                <span className="text-slate-500">→</span>
                <span>Save Contact VCF</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-inter font-medium leading-relaxed">
                Instantly share your professional identity and stay connected without exchanging paper business cards.
              </p>
            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN: Video Player (Only video visible, black sidebars removed) */}
          <ScrollReveal className="lg:col-span-5 flex justify-center">
            <div className="relative w-fit mx-auto rounded-3xl overflow-hidden shadow-2xl group">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="block max-w-full sm:max-w-[380px] h-auto object-cover rounded-3xl filter brightness-95"
              >
                <source src={homePageVideo} type="video/mp4" />
              </video>

              {/* Floating Video Controls */}
              <div className="absolute top-4 right-4 z-20 flex items-center space-x-2.5">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white hover:text-[#00DC82] flex items-center justify-center transition hover:scale-110 cursor-pointer shadow-lg"
                  title={isPlaying ? 'Pause Video' : 'Play Video'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white hover:text-[#00DC82] flex items-center justify-center transition hover:scale-110 cursor-pointer shadow-lg"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00DC82]" />}
                </button>
              </div>

              {/* AK Trishul Logo Badge */}
              <div className="absolute bottom-9 right-8 sm:bottom-11 sm:right-10 z-30 pointer-events-none">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black/30 border border-white/15 shadow-xl flex items-center justify-center p-2 backdrop-blur-md">
                  <img src="/assets/logo.png" alt="AK Trishul Logo" className="w-full h-full object-contain mix-blend-screen filter brightness-125" />
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};
