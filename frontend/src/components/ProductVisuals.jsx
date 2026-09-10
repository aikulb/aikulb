import React from 'react';

export const NfcIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7-3 9-6 11-3-2-6-4-6-11Z" />
    <path d="M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M9.5 12.5a4 4 0 0 0 5 0" />
    <path d="M7 16a8 8 0 0 0 10 0" />
  </svg>
);

export const CardChip = ({ className = "w-10 h-8" }) => (
  <svg className={className} viewBox="0 0 40 32" fill="none">
    <rect width="40" height="32" rx="5" fill="url(#chip-grad)" stroke="#D4AF37" strokeWidth="1" />
    <path d="M0 10H14V22H0" stroke="#B8860B" strokeWidth="1.5" />
    <path d="M40 10H26V22H40" stroke="#B8860B" strokeWidth="1.5" />
    <path d="M14 0V32" stroke="#B8860B" strokeWidth="1.5" />
    <path d="M26 0V32" stroke="#B8860B" strokeWidth="1.5" />
    <rect x="15" y="11" width="10" height="10" rx="2" fill="#E6CA65" />
    <defs>
      <linearGradient id="chip-grad" x1="0" y1="0" x2="40" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5D77F" />
        <stop offset="0.5" stopColor="#CCA041" />
        <stop offset="1" stopColor="#E6C363" />
      </linearGradient>
    </defs>
  </svg>
);

{/* Original Animated Animated NFC Signal Waves Concept */}
export const NfcSignalWaves = ({ className = "w-12 h-12 text-[#6C4CFF]" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none">
    <path d="M12 28A14 14 0 0 1 12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" />
    <path d="M18 25A9 9 0 0 1 18 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse duration-700" />
    <path d="M24 22A4 4 0 0 1 24 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-ping" />
  </svg>
);

export const FloatingHeroCard = ({ name = "JOHN DOE", title = "Founder & CEO", company = "aikulb TECH" }) => (
  <div className="relative w-80 h-48 md:w-96 md:h-56 rounded-3xl p-6 glass-panel border border-[#6C4CFF]/30 shadow-[0_25px_60px_rgba(108,76,255,0.25)] flex flex-col justify-between overflow-hidden group hover:border-[#6C4CFF] transition-all duration-500">
    {/* Dynamic Ambient Violet Glow Background */}
    <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#6C4CFF]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#3B82F6]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
    
    {/* Top Row: Logo & NFC Signal */}
    <div className="flex justify-between items-center z-10">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-lg aikulb-gradient-bg flex items-center justify-center font-black text-white text-xs shadow-md font-manrope">
          ak
        </div>
        <span className="font-extrabold tracking-tight text-white text-lg font-manrope lowercase">aikulb</span>
      </div>
      <div className="flex items-center space-x-2 text-[#22D3EE]">
        <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-300/90 font-bold">NFC PASS</span>
        <NfcIcon className="w-5 h-5 animate-pulse" />
      </div>
    </div>

    {/* Middle Section: Metallic Microchip & Custom Engraving */}
    <div className="flex items-center justify-between z-10 my-2">
      <CardChip className="w-11 h-9 shadow-md" />
      <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 0h2v3h-2v-3zm3 3h3v5h-3v-5zm-3 3h2v2h-2v-2zm0-3h3v2h-3v-2z" />
        </svg>
      </div>
    </div>

    {/* Bottom Section: Engraved Details */}
    <div className="z-10 flex justify-between items-end border-t border-white/10 pt-3">
      <div>
        <h4 className="font-extrabold text-white tracking-wider text-base font-manrope uppercase">{name}</h4>
        <p className="text-xs text-purple-200/90 font-medium tracking-wide font-inter">{title} • {company}</p>
      </div>
      <div className="text-right">
        <span className="text-[9px] uppercase tracking-widest text-slate-300 font-mono font-bold">TAP TO CONNECT</span>
      </div>
    </div>
  </div>
);

export const BlackMetalCardVisual = ({ name = "JOHN DOE", title = "FOUNDER & CEO" }) => (
  <div className="relative w-full aspect-[1.586] rounded-2xl p-5 bg-gradient-to-br from-[#1A1A1A] via-[#111111] to-[#090909] border border-neutral-700/60 shadow-2xl flex flex-col justify-between overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#6C4CFF]/15 rounded-full blur-2xl"></div>
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 rounded bg-gradient-to-br from-[#6C4CFF] to-[#3B82F6] flex items-center justify-center text-xs font-black text-white font-manrope">ak</div>
        <span className="font-extrabold text-white tracking-tight text-sm font-manrope lowercase">aikulb</span>
      </div>
      <div className="text-purple-300 font-mono text-[9px] font-bold tracking-widest border border-purple-500/30 px-2 py-0.5 rounded">BLACK METAL</div>
    </div>
    <div className="my-2 flex justify-between items-center">
      <CardChip />
      <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
        <svg className="w-5 h-5 text-white/80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v3h-3v-3zm-3 3h3v3h-3v-3zm3 3h3v3h-3v-3z" />
        </svg>
      </div>
    </div>
    <div className="border-t border-white/10 pt-2">
      <div className="text-white font-bold text-sm tracking-wider uppercase font-manrope">{name}</div>
      <div className="text-[11px] text-slate-400 uppercase tracking-widest font-inter">{title}</div>
    </div>
  </div>
);

export const GoldMetalCardVisual = ({ name = "EXECUTIVE MEMBER" }) => (
  <div className="relative w-full aspect-[1.586] rounded-2xl p-5 bg-gradient-to-br from-[#3D2C0D] via-[#241A06] to-[#120D03] border border-amber-500/50 shadow-2xl flex flex-col justify-between overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"></div>
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 rounded bg-gradient-to-br from-amber-300 to-yellow-600 flex items-center justify-center text-xs font-black text-black font-manrope">ak</div>
        <span className="font-extrabold text-amber-200 tracking-tight text-sm font-manrope lowercase">aikulb</span>
      </div>
      <div className="text-amber-300 font-mono text-[9px] font-bold tracking-widest border border-amber-500/40 px-2 py-0.5 rounded">24K GOLD</div>
    </div>
    <div className="my-2 flex justify-between items-center">
      <CardChip />
    </div>
    <div className="border-t border-amber-500/20 pt-2">
      <div className="text-amber-100 font-bold text-sm tracking-wider uppercase font-manrope">{name}</div>
      <div className="text-[11px] text-amber-400/80 uppercase tracking-widest font-inter">24K Mirror Gold Finish</div>
    </div>
  </div>
);

export const SilverMetalCardVisual = ({ name = "SILVER EDITION" }) => (
  <div className="relative w-full aspect-[1.586] rounded-2xl p-5 bg-gradient-to-br from-[#2D3748] via-[#1A202C] to-[#0D1117] border border-slate-400/50 shadow-2xl flex flex-col justify-between overflow-hidden">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 rounded bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center text-xs font-black text-slate-900 font-manrope">ak</div>
        <span className="font-extrabold text-slate-100 tracking-tight text-sm font-manrope lowercase">aikulb</span>
      </div>
      <div className="text-slate-300 font-mono text-[9px] font-bold tracking-widest border border-slate-400/40 px-2 py-0.5 rounded">BRUSHED STEEL</div>
    </div>
    <div className="my-2 flex justify-between items-center">
      <CardChip />
    </div>
    <div className="border-t border-slate-500/30 pt-2">
      <div className="text-slate-100 font-bold text-sm tracking-wider uppercase font-manrope">{name}</div>
      <div className="text-[11px] text-slate-400 uppercase tracking-widest font-inter">Brushed Silver Stainless Steel</div>
    </div>
  </div>
);

export const WoodCardVisual = ({ name = "NATURAL WALNUT" }) => (
  <div className="relative w-full aspect-[1.586] rounded-2xl p-5 bg-gradient-to-br from-[#3D261A] via-[#24150D] to-[#120A06] border border-amber-800/60 shadow-2xl flex flex-col justify-between overflow-hidden">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 rounded bg-amber-700 flex items-center justify-center text-xs font-black text-amber-100 font-manrope">ak</div>
        <span className="font-extrabold text-amber-200 tracking-tight text-sm font-manrope lowercase">aikulb</span>
      </div>
      <div className="text-amber-400 font-mono text-[9px] font-bold tracking-widest border border-amber-700/50 px-2 py-0.5 rounded">ORGANIC WOOD</div>
    </div>
    <div className="my-2 flex justify-between items-center">
      <CardChip />
    </div>
    <div className="border-t border-amber-900/40 pt-2">
      <div className="text-amber-100 font-bold text-sm tracking-wider uppercase font-manrope">{name}</div>
      <div className="text-[11px] text-amber-400/70 uppercase tracking-widest font-inter">100% Handcrafted Walnut Wood</div>
    </div>
  </div>
);

export const SmartStandVisual = () => (
  <div className="relative w-full aspect-square rounded-3xl p-6 bg-gradient-to-b from-[#111111] via-[#090909] to-black border border-[#6C4CFF]/30 shadow-2xl flex flex-col items-center justify-between">
    <div className="w-full flex justify-between items-center">
      <span className="text-xs font-bold text-purple-400 tracking-widest uppercase font-manrope">aikulb STAND</span>
      <span className="px-2.5 py-0.5 text-[10px] bg-[#6C4CFF]/20 text-purple-300 rounded-full border border-[#6C4CFF]/30 font-mono font-bold">NFC + QR</span>
    </div>
    <div className="my-4 relative w-36 h-44 bg-[#6C4CFF]/10 border-2 border-[#6C4CFF]/50 rounded-2xl p-4 flex flex-col items-center justify-between shadow-[0_0_30px_rgba(108,76,255,0.25)] backdrop-blur-md">
      <div className="w-10 h-10 rounded-full bg-[#6C4CFF]/20 border border-[#6C4CFF] flex items-center justify-center text-purple-300">
        <NfcIcon className="w-6 h-6 animate-pulse" />
      </div>
      <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-md">
        <div className="w-full h-full bg-[#090909] rounded-lg flex items-center justify-center text-white text-[9px] font-mono text-center font-bold">
          TAP / SCAN
        </div>
      </div>
      <span className="text-[10px] text-purple-300 font-bold tracking-wider font-manrope">TAP FOR MENU & REVIEWS</span>
    </div>
    <span className="text-xs text-slate-400 text-center font-inter">Acrylic Countertop Stand for Business & Retail</span>
  </div>
);

export const HandTappingCardPhoneVisual = () => (
  <div className="relative w-full max-w-lg mx-auto flex items-center justify-center py-6 select-none">
    {/* Ambient Glow behind device */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#FF3838]/15 rounded-full blur-3xl pointer-events-none"></div>

    {/* Smartphone Frame Container */}
    <div className="relative w-64 sm:w-72 h-[480px] bg-[#0A0A0A] rounded-[42px] border-4 border-[#222222] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between">
      {/* Top Camera Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#000000] rounded-full z-30 flex items-center justify-center space-x-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#111]"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#1e1e2d]"></div>
      </div>

      {/* Screen Content - Digital Business Profile */}
      <div className="w-full h-full bg-[#121212] rounded-[32px] pt-8 px-4 pb-4 overflow-hidden flex flex-col justify-between text-white relative z-10">
        {/* Profile Header Card */}
        <div className="bg-[#1A1A1A] border border-neutral-800 rounded-2xl p-4 text-center space-y-3 relative overflow-hidden shadow-lg">
          <div className="w-16 h-16 rounded-full mx-auto bg-gradient-to-tr from-[#FF3838] to-[#FF6B6B] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#222] rounded-full flex items-center justify-center font-bold text-white text-lg">
              NP
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white font-manrope">Nichlolas Perry</h3>
            <p className="text-xs text-neutral-400 font-inter">Designer @ <span className="text-white font-bold">aikulb</span></p>
          </div>
          
          {/* Brand Badge */}
          <div className="inline-flex items-center space-x-1.5 bg-[#FF3838]/15 text-[#FF3838] border border-[#FF3838]/30 px-3 py-1 rounded-full text-[10px] font-bold font-manrope">
            <NfcIcon className="w-3 h-3 text-[#FF3838]" />
            <span>aikulb Verified</span>
          </div>

          {/* Action Buttons inside Phone Screen */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button className="w-full py-2 rounded-xl bg-[#FF3838] hover:bg-[#E02828] text-white font-bold text-xs font-manrope shadow-md shadow-[#FF3838]/20">
              Save Contact
            </button>
            <button className="w-full py-2 rounded-xl bg-[#262626] hover:bg-[#333] text-neutral-200 font-bold text-xs font-manrope">
              Share
            </button>
          </div>
        </div>

        {/* Bio summary inside phone */}
        <div className="bg-[#181818] border border-neutral-800/80 rounded-xl p-3 text-[11px] text-neutral-400 space-y-1">
          <p className="font-bold text-neutral-300 uppercase tracking-wider text-[9px] font-mono">ABOUT</p>
          <p className="leading-tight">With the smart business cards and digital cards, reach your clients easily and hassle-free.</p>
        </div>

        {/* Footer Contact bar inside phone */}
        <div className="bg-[#1A1A1A] rounded-xl p-2.5 flex items-center justify-between text-xs text-neutral-300">
          <span className="font-bold font-manrope text-[11px]">Direct Contact</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </div>

      {/* Tapping NFC Signal Ripple Effect */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="w-16 h-16 rounded-full border-2 border-[#FF3838] animate-ping opacity-75"></div>
      </div>
    </div>

    {/* Hand Holding Card Over Tapping Area */}
    <div className="absolute -top-10 -right-4 sm:right-2 z-40 transform rotate-[-12deg] hover:rotate-[-8deg] transition-transform duration-300">
      {/* Hand SVG representation holding Card */}
      <div className="relative">
        {/* Hand Illustration Overlay */}
        <svg className="w-36 sm:w-44 h-auto text-[#E5C3A6] drop-shadow-2xl absolute -top-8 -right-6 z-10 pointer-events-none" viewBox="0 0 160 160" fill="none">
          <path d="M120 160 C120 120 130 90 110 70 C100 60 85 65 75 75 C70 80 65 90 60 100 C50 120 40 140 30 160 Z" fill="#D8B48F" opacity="0.9" />
          <path d="M105 72 C115 55 105 40 90 35 C75 30 65 42 60 52 C55 62 50 75 45 90 Z" fill="#C9A078" />
        </svg>

        {/* Custom Matte Black Card */}
        <div className="relative w-52 sm:w-60 h-32 rounded-2xl bg-gradient-to-br from-[#1F1F1F] via-[#111111] to-[#050505] border border-neutral-700/80 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between z-20">
          {/* Card Top Row */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1.5">
              <div className="w-6 h-6 rounded bg-[#FF3838] flex items-center justify-center text-[10px] font-black text-white font-manrope">ak</div>
              <span className="font-black text-white text-xs font-manrope lowercase tracking-tight">aikulb</span>
            </div>
            <NfcIcon className="w-4 h-4 text-[#FF3838] animate-pulse" />
          </div>

          {/* Card Name */}
          <div className="border-t border-neutral-800 pt-2">
            <p className="font-extrabold text-white text-xs font-manrope uppercase tracking-wider">Nichlolas Perry</p>
            <p className="text-[9px] text-neutral-400 font-mono tracking-widest uppercase">SMART NFC CARD</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

