import React from 'react';
import { Smartphone, Link as LinkIcon, RotateCcw, Share2 } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './AnimatedComponents';

export const RedFeatureBanner = () => {
  const features = [
    {
      icon: Share2,
      title: 'Unlimited Sharing',
      description: 'Never run out of physical business cards again',
    },
    {
      icon: Smartphone,
      title: 'No App Required',
      description: "Instant contact sharing without recipient downloading an app",
    },
    {
      icon: LinkIcon,
      title: 'Custom Handle',
      description: 'Your own personalized handle (aiklub.com/yourname)',
    },
    {
      icon: RotateCcw,
      title: 'Live Info Updates',
      description: 'Update your contact details & links anytime for free',
    },
  ];

  return (
    <section className="bg-[#F8FAFC] text-slate-900 py-12 sm:py-16 relative overflow-hidden border-y border-slate-200/80 shadow-xs">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center" staggerDelay={0.08}>
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <StaggerItem key={idx}>
                <div className="flex flex-col items-center space-y-3 group p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300 mb-1">
                    <IconComponent className="w-7 h-7 text-amber-600 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-manrope tracking-tight group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-700 font-inter font-medium leading-relaxed max-w-[220px]">
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
