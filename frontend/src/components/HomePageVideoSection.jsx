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
    <section className="py-16 sm:py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200 transition-colors duration-300">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2-Column Side-by-Side Layout matching Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Text Context & Benefits Checklist */}
          <ScrollReveal className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-900 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#00DC82]" />
              <span>AI KLUB IN ACTION • 4K DEMO</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-manrope text-slate-900 tracking-tight leading-[1.1]">
                How ai klub Card Works
              </h2>
              <p className="text-base sm:text-lg text-slate-700 font-inter font-medium leading-relaxed max-w-2xl">
                Share your contact details, website, social media profiles, portfolio, brochures and more with a single tap. No app required.
              </p>
            </div>

            {/* Checklist items */}
            <div className="space-y-2.5 pt-2">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-sm sm:text-base text-slate-900 font-inter font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#00B068]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Bottom Highlight Callout Box matching Reference Image 2 */}
            <div className="mt-6 p-5 rounded-2xl bg-[#FFF5F5] border border-[#FFD0D0] space-y-1.5 shadow-sm">
              <h4 className="font-extrabold text-sm sm:text-base text-[#E53E3E] font-manrope flex items-center space-x-2">
                <span>Tap</span>
                <span>→</span>
                <span>Open Profile</span>
                <span>→</span>
                <span>Save Contact</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 font-inter font-medium leading-relaxed">
                Instantly share your professional identity and stay connected without exchanging paper business cards.
              </p>
            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN: Video Player (Outlier border line removed) */}
          <ScrollReveal className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] rounded-[32px] overflow-hidden bg-black shadow-2xl group">
              <div className="relative w-full flex items-center justify-center bg-black overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-auto object-contain max-h-[620px] filter brightness-95"
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
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};
