import React from 'react';

export const TrustMarquee = () => {
  const brands = [
    { name: 'Nexa Global', tag: 'AI Systems' },
    { name: 'Vertex Ventures', tag: 'Venture Capital' },
    { name: 'Orbit Labs', tag: 'Smart Hardware' },
    { name: 'NovaTech', tag: 'Cloud Infra' },
    { name: 'CloudGrid', tag: 'Enterprise Data' },
    { name: 'Apex Capital', tag: 'FinTech' },
    { name: 'Elevate Health', tag: 'Biotech' },
    { name: 'CoreLabs', tag: 'Software' },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#111111] border-y border-slate-200 dark:border-slate-800/80 overflow-hidden transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
          Trusted by Professionals Building the Future
        </h3>
      </div>

      {/* Scrolling Marquee Row */}
      <div className="relative w-full flex overflow-x-hidden">
        <div className="animate-marquee flex items-center space-x-12 whitespace-nowrap py-2">
          {brands.concat(brands).map((b, i) => (
            <div key={i} className="flex items-center space-x-3 px-6 py-3 rounded-2xl bg-[#F7F7F5] dark:bg-[#1A1A1A] border border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-[#6C4CFF]/15 border border-[#6C4CFF]/30 flex items-center justify-center font-bold text-[#6C4CFF] text-xs font-mono">
                {b.name.substring(0, 2)}
              </div>
              <div>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm tracking-wide font-manrope block">{b.name}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-semibold">{b.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strong Deep Black Statistics Section */}
      <div className="mt-16 bg-[#090909] text-white py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-3xl bg-[#111111] border border-[#262626]">
            <div className="text-4xl sm:text-5xl font-black text-white font-manrope tracking-tight mb-2">50K+</div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300 font-manrope">Digital Profiles</div>
            <div className="text-[11px] text-slate-400 mt-1 font-inter">Active global accounts</div>
          </div>

          <div className="p-6 rounded-3xl bg-[#111111] border border-[#262626]">
            <div className="text-4xl sm:text-5xl font-black text-[#6C4CFF] font-manrope tracking-tight mb-2">1M+</div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300 font-manrope">Connections</div>
            <div className="text-[11px] text-slate-400 mt-1 font-inter">NFC Taps & QR Scans</div>
          </div>

          <div className="p-6 rounded-3xl bg-[#111111] border border-[#262626]">
            <div className="text-4xl sm:text-5xl font-black text-[#3B82F6] font-manrope tracking-tight mb-2">500+</div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-300 font-manrope">Business Teams</div>
            <div className="text-[11px] text-slate-400 mt-1 font-inter">Corporate enterprise accounts</div>
          </div>

          <div className="p-6 rounded-3xl bg-[#111111] border border-[#262626]">
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-manrope tracking-tight mb-2">99.9%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-manrope">Platform Reliability</div>
            <div className="text-[11px] text-slate-400 mt-1 font-inter">Uptime SLA guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
};
