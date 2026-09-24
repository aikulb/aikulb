import React from 'react';
import { Smartphone, Zap, Link as LinkIcon, RotateCcw, ShieldCheck, Share2 } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimatedComponents';

export const RedFeatureBanner = () => {
  const features = [
    {
      icon: Share2,
      title: 'Unlimited Sharing',
      description: 'Never run out of business cards again',
    },
    {
      icon: Smartphone,
      title: 'No App!',
      description: "Don't need an app for AI Klub to work",
    },
    {
      icon: LinkIcon,
      title: 'My AI Klub',
      description: 'Your own custom link aiklub.com/yourname',
    },
    {
      icon: RotateCcw,
      title: 'Update Your Info.',
      description: 'Edit your information anytime',
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#FF4D4D] via-[#FF3B3B] to-[#FF4D4D] text-white py-12 sm:py-16 relative overflow-hidden border-y border-red-400/40 shadow-xl">
      {/* Background Subtle Wave Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)] pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center" staggerDelay={0.1}>
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <StaggerItem key={idx}>
                <div className="flex flex-col items-center space-y-3 group p-4 rounded-2xl hover:bg-white/10 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/30 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-1">
                    <IconComponent className="w-8 h-8 text-white stroke-[2]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-manrope tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/95 font-inter font-medium leading-relaxed max-w-[220px]">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
