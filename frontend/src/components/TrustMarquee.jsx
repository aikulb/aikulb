import React, { useState, useEffect } from 'react';
import { api } from '../services/apiClient';

const DEFAULT_BRANDS = [
  { name: 'Nexa Global', tag: 'AI Systems', code: 'Ne' },
  { name: 'Vertex Ventures', tag: 'Venture Capital', code: 'Ve' },
  { name: 'Orbit Labs', tag: 'Smart Hardware', code: 'Or' },
  { name: 'NovaTech', tag: 'Cloud Infra', code: 'No' },
  { name: 'CloudGrid', tag: 'Enterprise Data', code: 'Cl' },
  { name: 'Apex Capital', tag: 'FinTech', code: 'Ap' },
  { name: 'Elevate Health', tag: 'Biotech', code: 'El' },
  { name: 'CoreLabs', tag: 'Software', code: 'Co' },
  { name: 'Quantum Tech', tag: 'Deep Learning', code: 'Qu' },
  { name: 'Pulse Robotics', tag: 'Robotics', code: 'Pu' }
];

const DEFAULT_STATS = {
  profiles: '50K+',
  connections: '1M+',
  teams: '500+',
  reliability: '99.9%'
};

export const TrustMarquee = () => {
  const [brands, setBrands] = useState(DEFAULT_BRANDS);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [isDbSynced, setIsDbSynced] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchHomepageData = async () => {
      try {
        const data = await api.getHomepageContent();
        if (data && data.success && data.data && isMounted) {
          if (data.data.trusted_brands) {
            setBrands(data.data.trusted_brands);
          }
          if (data.data.platform_stats) {
            setStats(data.data.platform_stats);
          }
          setIsDbSynced(true);
        }
      } catch (err) {
        console.warn('Syncing default marquee content (Database API offline fallback):', err.message);
      }
    };

    fetchHomepageData();
    return () => { isMounted = false; };
  }, []);

  // Repeat items for continuous infinite scrolling marquee loop
  const marqueeItems = [...brands, ...brands, ...brands];

  return (
    <section className="py-16 bg-white border-y border-slate-200/90 overflow-hidden relative transition-colors duration-300 text-slate-900">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center flex flex-col items-center justify-center space-y-2 relative z-10">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF3B3B] font-manrope">
          ⚡ Trusted by Executives, Sales Teams & Industry Leaders
        </h3>
      </div>

      {/* Auto-Scrolling Marquee Container */}
      <div className="relative w-full flex overflow-hidden py-3 select-none group z-10">
        {/* Left Fading Edge Mask */}
        <div className="absolute top-0 left-0 bottom-0 w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        
        {/* Continuous Auto-Scrolling Ribbon */}
        <div className="animate-marquee flex items-center space-x-6 whitespace-nowrap px-4">
          {marqueeItems.map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="flex items-center space-x-3.5 px-6 py-3.5 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-[#FF3B3B]/40 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FF3B3B]/10 border border-[#FF3B3B]/20 flex items-center justify-center font-black text-[#FF3B3B] text-xs font-mono shadow-xs">
                {b.code || b.name.substring(0, 2)}
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-sm tracking-tight font-manrope block">{b.name}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-semibold block">{b.tag}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Fading Edge Mask */}
        <div className="absolute top-0 right-0 bottom-0 w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
      </div>

      {/* High Contrast Live Statistics Section */}
      <div className="mt-16 bg-[#F8FAFC] border-t border-slate-200/90 text-slate-900 py-16 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-300">
            <div className="text-4xl sm:text-5xl font-black text-[#FF3B3B] font-manrope tracking-tight mb-2">{stats.profiles}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800 font-manrope">Digital Profiles</div>
            <div className="text-[11px] text-slate-500 mt-1 font-inter font-medium">Active global accounts</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-300">
            <div className="text-4xl sm:text-5xl font-black text-[#FF3B3B] font-manrope tracking-tight mb-2">{stats.connections}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800 font-manrope">Connections</div>
            <div className="text-[11px] text-slate-500 mt-1 font-inter font-medium">NFC Taps & QR Scans</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-300">
            <div className="text-4xl sm:text-5xl font-black text-[#FF3B3B] font-manrope tracking-tight mb-2">{stats.teams}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800 font-manrope">Business Teams</div>
            <div className="text-[11px] text-slate-500 mt-1 font-inter font-medium">Corporate enterprise accounts</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-300">
            <div className="text-4xl sm:text-5xl font-black text-[#FF3B3B] font-manrope tracking-tight mb-2">{stats.reliability}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800 font-manrope">Platform Reliability</div>
            <div className="text-[11px] text-slate-500 mt-1 font-inter font-medium">Uptime SLA guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
};
