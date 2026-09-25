import React, { useState, useEffect } from 'react';
import { api } from '../services/apiClient';

const DEFAULT_STATS = {
  profiles: '50K+',
  connections: '1M+',
  teams: '500+',
  reliability: '99.9%'
};

export const TrustMarquee = () => {
  const [stats, setStats] = useState(DEFAULT_STATS);

  useEffect(() => {
    let isMounted = true;
    const fetchHomepageData = async () => {
      try {
        const data = await api.getHomepageContent();
        if (data && data.success && data.data && isMounted) {
          if (data.data.platform_stats) {
            setStats(data.data.platform_stats);
          }
        }
      } catch (err) {
        console.warn('Syncing default statistics content (Fallback):', err.message);
      }
    };

    fetchHomepageData();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-16 bg-white border-y border-slate-200/80 overflow-hidden relative text-slate-900 select-none">
      
      {/* Top Header Tagline */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center flex items-center justify-center space-x-3 relative z-10">
        <span className="w-8 h-[2px] bg-amber-500 rounded-full shrink-0"></span>
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 font-manrope">
          TRUSTED BY EXECUTIVES, SALES TEAMS & INDUSTRY LEADERS
        </h3>
        <span className="w-8 h-[2px] bg-amber-500 rounded-full shrink-0"></span>
      </div>

      {/* High Contrast Statistics Section */}
      <div className="bg-[#F8FAFC] text-slate-900 py-16 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 font-manrope tracking-tight mb-2">
              {stats.profiles}
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 font-manrope">Digital Profiles</div>
            <div className="text-[11px] text-slate-700 mt-1 font-inter font-medium">Active global accounts</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 font-manrope tracking-tight mb-2">
              {stats.connections}
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 font-manrope">Connections</div>
            <div className="text-[11px] text-slate-700 mt-1 font-inter font-medium">NFC Taps & QR Scans</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 font-manrope tracking-tight mb-2">
              {stats.teams}
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 font-manrope">Business Teams</div>
            <div className="text-[11px] text-slate-700 mt-1 font-inter font-medium">Corporate enterprise accounts</div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 font-manrope tracking-tight mb-2">
              {stats.reliability}
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 font-manrope">Platform Reliability</div>
            <div className="text-[11px] text-slate-700 mt-1 font-inter font-medium">Uptime SLA guarantee</div>
          </div>

        </div>
      </div>
    </section>
  );
};
