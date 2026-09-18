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
    <section className="py-16 bg-white border-y border-slate-200 overflow-hidden transition-colors duration-300 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center flex flex-col items-center justify-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-mono font-bold uppercase tracking-wider">
          <span className={`w-2 h-2 rounded-full ${isDbSynced ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
          <span>{isDbSynced ? 'Database Synced Enterprise Network' : 'Trusted Enterprise Partners'}</span>
        </div>
        <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-800 font-manrope">
          Trusted by Professionals Building the Future
        </h3>
      </div>

      {/* Auto-Scrolling Marquee Container with Left & Right Gradient Edges */}
      <div className="relative w-full flex overflow-hidden py-2 select-none group">
        {/* Left Fading Edge Mask */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        
        {/* Continuous Auto-Scrolling Ribbon */}
        <div className="animate-marquee flex items-center space-x-6 whitespace-nowrap px-4">
          {marqueeItems.map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="flex items-center space-x-3.5 px-6 py-3.5 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-[#6C4CFF]/40 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6C4CFF]/15 to-[#3B82F6]/15 border border-[#6C4CFF]/30 flex items-center justify-center font-black text-[#6C4CFF] text-xs font-mono shadow-xs">
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
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
      </div>

      {/* High Contrast Live Statistics Section */}
      <div className="mt-16 bg-[#F8F9FA] border-t border-slate-200 text-slate-900 py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 font-manrope tracking-tight mb-2">{stats.profiles}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#6C4CFF] font-manrope">Digital Profiles</div>
            <div className="text-[11px] text-slate-600 mt-1 font-inter font-medium">Active global accounts</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl sm:text-5xl font-black text-[#6C4CFF] font-manrope tracking-tight mb-2">{stats.connections}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-600 font-manrope">Connections</div>
            <div className="text-[11px] text-slate-600 mt-1 font-inter font-medium">NFC Taps & QR Scans</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl sm:text-5xl font-black text-[#3B82F6] font-manrope tracking-tight mb-2">{stats.teams}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-manrope">Business Teams</div>
            <div className="text-[11px] text-slate-600 mt-1 font-inter font-medium">Corporate enterprise accounts</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl sm:text-5xl font-black text-emerald-600 font-manrope tracking-tight mb-2">{stats.reliability}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-manrope">Platform Reliability</div>
            <div className="text-[11px] text-slate-600 mt-1 font-inter font-medium">Uptime SLA guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
};
