import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Card3DTilt, OriginalNfcSignal } from './AnimatedComponents';
import { RotateCw, Zap } from 'lucide-react';

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

export const NfcSignalWaves = ({ className = "w-12 h-12 text-[#00DC82]" }) => (
  <OriginalNfcSignal className={className} />
);

/**
 * Reusable Interactive 3D Flip Card Component (Front & Back View Toggle)
 */
export const FlipCardContainer = ({ childrenFront, childrenBack }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Card3DTilt maxRotateX={4} maxRotateY={6}>
      <div 
        onClick={() => setIsFlipped(!isFlipped)} 
        className="relative w-full max-w-[440px] mx-auto aspect-[1.586] perspective-1000 cursor-pointer group select-none"
        title="Click to Flip Card (Front / Back)"
      >
        <div 
          className="w-full h-full relative transform-style-3d transition-transform duration-700 rounded-2xl shadow-2xl"
          style={{ transform: `rotateY(${isFlipped ? 180 : 0}deg)` }}
        >
          {/* FRONT FACE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden">
            {childrenFront}
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
              className="absolute top-3 right-3 z-30 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-mono font-bold text-emerald-400 border border-emerald-500/40 flex items-center space-x-1 opacity-80 group-hover:opacity-100 transition-all hover:bg-black/90 hover:scale-105"
            >
              <RotateCw className="w-3 h-3 text-[#00DC82]" />
              <span>Flip Back 🔄</span>
            </button>
          </div>

          {/* BACK FACE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden">
            {childrenBack}
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
              className="absolute top-3 right-3 z-30 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-mono font-bold text-emerald-400 border border-emerald-500/40 flex items-center space-x-1 opacity-80 group-hover:opacity-100 transition-all hover:bg-black/90 hover:scale-105"
            >
              <RotateCw className="w-3 h-3 text-[#00DC82]" />
              <span>Flip Front 🔄</span>
            </button>
          </div>
        </div>
      </div>
    </Card3DTilt>
  );
};

/**
 * Floating Hero Card
 */
export const FloatingHeroCard = ({ name = "JOHN DOE", title = "Founder & CEO", company = "aikulb TECH" }) => (
  <Card3DTilt maxRotateX={4} maxRotateY={6}>
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 1.5, 0, -1.5, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative w-80 h-48 md:w-96 md:h-56 rounded-3xl p-6 bg-[#0B0F17] border border-emerald-900/60 shadow-[0_25px_60px_rgba(16,185,129,0.2)] flex flex-col justify-between overflow-hidden group hover:border-[#00DC82] transition-colors duration-500 select-none"
    >
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#10B981]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#00DC82]/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

      <div className="flex justify-between items-center z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#070A0F] border border-[#10B981]/50 p-0.5 shadow-md flex items-center justify-center">
            <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
          </div>
          <span className="font-black tracking-tight text-white text-lg font-manrope lowercase">aikulb</span>
        </div>
        <div className="flex items-center space-x-2 text-[#00DC82]">
          <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400 font-bold">NFC PASS</span>
          <NfcIcon className="w-5 h-5 animate-pulse" />
        </div>
      </div>

      <div className="flex items-center justify-between z-10 my-2">
        <CardChip className="w-11 h-9 shadow-md" />
      </div>

      <div className="z-10 flex justify-between items-end border-t border-emerald-950 pt-3">
        <div>
          <h4 className="font-black text-white text-base font-manrope uppercase tracking-tight leading-snug">{name}</h4>
          <p className="text-xs text-emerald-300/90 font-medium font-inter tracking-normal mt-0.5">{title} • {company}</p>
        </div>
        <div className="text-right">
          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono font-bold">TAP TO CONNECT</span>
        </div>
      </div>
    </motion.div>
  </Card3DTilt>
);

export const BlackMetalCardVisual = ({ name = "BLACK METAL NFC CARD", title = "FOUNDER & CEO", cardId = "AK-BLACK-METAL-001", qrValue }) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aikulb.com/card/${cardId}`);
  return (
    <FlipCardContainer
      childrenFront={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#2B2B30] via-[#161619] to-[#0A0A0C] border border-slate-600/90 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.2)] flex flex-col justify-between select-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#10B981]/20 rounded-full blur-2xl pointer-events-none" />
          
          {/* Top Header Row */}
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#070A0F] border border-[#10B981]/50 p-0.5 shadow flex items-center justify-center">
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(16,185,129,0.6)]" />
              </div>
              <span className="font-black text-white tracking-tight text-sm font-manrope lowercase">aikulb</span>
            </div>
            <div className="text-[#00DC82] font-mono text-[9px] font-extrabold tracking-wider border border-emerald-500/40 bg-emerald-950/80 px-2 py-0.5 rounded shadow-sm">
              BLACK METAL
            </div>
          </div>

          {/* Middle Row */}
          <div className="my-2 flex justify-between items-center z-10">
            <CardChip />
          </div>

          {/* Bottom Row */}
          <div className="border-t border-white/20 pt-2 z-10">
            <div className="text-white font-black text-sm tracking-tight uppercase font-manrope leading-snug drop-shadow-sm">{name}</div>
            <div className="text-[10px] text-emerald-400 uppercase tracking-wider font-inter font-bold mt-0.5">{title}</div>
          </div>
        </div>
      }
      childrenBack={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#2B2B30] via-[#161619] to-[#0A0A0C] border border-slate-600/90 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col justify-between select-none overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-[#070A0F] border border-[#10B981]/50 p-0.5 flex items-center justify-center">
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-white text-xs font-manrope lowercase">aikulb</span>
            </div>
            <span className="text-emerald-400 bg-black/70 px-2 py-0.5 rounded border border-emerald-500/40 font-mono text-[8px] font-bold">1-TAP NFC & QR</span>
          </div>

          <div className="flex-1 flex items-center justify-center my-1 z-10">
            <div className="p-1.5 bg-white rounded-xl shadow-2xl flex flex-col items-center border border-slate-200">
              <QRCodeSVG value={finalQr} size={54} level="H" />
            </div>
          </div>

          <div className="text-center text-[9px] font-mono text-white/90 uppercase tracking-wider font-bold border-t border-white/20 pt-2 z-10">
            TAP OR SCAN TO CONNECT
          </div>
        </div>
      }
    />
  );
};

export const GoldMetalCardVisual = ({ name = "24K GOLD NFC CARD", cardId = "AK-GOLD-24K-002", qrValue }) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aikulb.com/card/${cardId}`);
  return (
    <FlipCardContainer
      childrenFront={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#4A3712] via-[#2D210A] to-[#171105] border border-amber-400/80 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.25)] flex flex-col justify-between select-none overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/25 rounded-full blur-2xl pointer-events-none" />
          
          {/* Top Header Row */}
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#070A0F] border border-amber-400/60 p-0.5 shadow flex items-center justify-center">
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(245,158,11,0.6)]" />
              </div>
              <span className="font-extrabold text-amber-200 tracking-tight text-sm font-manrope lowercase">aikulb</span>
            </div>
            <div className="text-amber-300 font-mono text-[9px] font-bold tracking-wider border border-amber-400/60 bg-amber-950/80 px-2 py-0.5 rounded shadow-sm">
              24K GOLD
            </div>
          </div>

          <div className="my-2 flex justify-between items-center z-10">
            <CardChip />
          </div>

          <div className="border-t border-amber-400/30 pt-2 z-10">
            <div className="text-amber-100 font-black text-sm tracking-tight uppercase font-manrope leading-snug drop-shadow-sm">{name}</div>
            <div className="text-[10px] text-amber-400 uppercase tracking-wider font-inter font-bold mt-0.5">24K Electroplated Gold Metal</div>
          </div>
        </div>
      }
      childrenBack={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#4A3712] via-[#2D210A] to-[#171105] border border-amber-400/80 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col justify-between select-none overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-[#070A0F] border border-amber-400/60 p-0.5 flex items-center justify-center">
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-amber-200 text-xs font-manrope lowercase">aikulb</span>
            </div>
            <span className="text-amber-300 bg-black/70 px-2 py-0.5 rounded border border-amber-400/60 font-mono text-[8px] font-bold">1-TAP NFC & QR</span>
          </div>

          <div className="flex-1 flex items-center justify-center my-1 z-10">
            <div className="p-1.5 bg-white rounded-xl shadow-2xl flex flex-col items-center">
              <QRCodeSVG value={finalQr} size={54} level="H" />
            </div>
          </div>

          <div className="text-center text-[9px] font-mono text-amber-200 uppercase tracking-wider font-bold border-t border-amber-400/30 pt-2 z-10">
            TAP OR SCAN TO CONNECT
          </div>
        </div>
      }
    />
  );
};

export const SilverMetalCardVisual = ({ name = "SILVER METAL CARD", cardId = "AK-SILVER-STEEL-003", qrValue }) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aikulb.com/card/${cardId}`);
  return (
    <FlipCardContainer
      childrenFront={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#3D4859] via-[#242C3A] to-[#121722] border border-slate-300/80 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(203,213,225,0.2)] flex flex-col justify-between select-none overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#070A0F] border border-slate-300/50 p-0.5 shadow flex items-center justify-center">
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-slate-100 tracking-tight text-sm font-manrope lowercase">aikulb</span>
            </div>
            <div className="text-slate-200 font-mono text-[9px] font-bold tracking-wider border border-slate-300/50 bg-slate-900/80 px-2 py-0.5 rounded shadow-sm">
              BRUSHED STEEL
            </div>
          </div>

          <div className="my-2 flex justify-between items-center z-10">
            <CardChip />
          </div>

          <div className="border-t border-slate-400/40 pt-2 z-10">
            <div className="text-slate-100 font-black text-sm tracking-tight uppercase font-manrope leading-snug drop-shadow-sm">{name}</div>
            <div className="text-[10px] text-slate-300 uppercase tracking-wider font-inter font-bold mt-0.5">Brushed Silver Stainless Steel</div>
          </div>
        </div>
      }
      childrenBack={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#3D4859] via-[#242C3A] to-[#121722] border border-slate-300/80 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col justify-between select-none overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-[#070A0F] border border-slate-300/50 p-0.5 flex items-center justify-center">
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-slate-100 text-xs font-manrope lowercase">aikulb</span>
            </div>
            <span className="text-slate-200 bg-black/70 px-2 py-0.5 rounded border border-slate-300/50 font-mono text-[8px] font-bold">1-TAP NFC & QR</span>
          </div>

          <div className="flex-1 flex items-center justify-center my-1 z-10">
            <div className="p-1.5 bg-white rounded-xl shadow-2xl flex flex-col items-center">
              <QRCodeSVG value={finalQr} size={54} level="H" />
            </div>
          </div>

          <div className="text-center text-[9px] font-mono text-slate-200 uppercase tracking-wider font-bold border-t border-slate-400/40 pt-2 z-10">
            TAP OR SCAN TO CONNECT
          </div>
        </div>
      }
    />
  );
};

export const WoodCardVisual = ({ name = "WOODEN NFC CARD", cardId = "AK-WOOD-WALNUT-004", qrValue }) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aikulb.com/card/${cardId}`);
  return (
    <FlipCardContainer
      childrenFront={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#4A3022] via-[#2B1B13] to-[#170E0A] border border-amber-700/80 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(217,119,6,0.2)] flex flex-col justify-between select-none overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#070A0F] border border-amber-600/60 p-0.5 shadow flex items-center justify-center">
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(217,119,6,0.6)]" />
              </div>
              <span className="font-extrabold text-amber-200 tracking-tight text-sm font-manrope lowercase">aikulb</span>
            </div>
            <div className="text-amber-300 font-mono text-[9px] font-bold tracking-wider border border-amber-600/60 bg-amber-950/80 px-2 py-0.5 rounded shadow-sm">
              ORGANIC WOOD
            </div>
          </div>

          <div className="my-2 flex justify-between items-center z-10">
            <CardChip />
          </div>

          <div className="border-t border-amber-700/40 pt-2 z-10">
            <div className="text-amber-100 font-black text-sm tracking-tight uppercase font-manrope leading-snug drop-shadow-sm">{name}</div>
            <div className="text-[10px] text-amber-400 uppercase tracking-wider font-inter font-bold mt-0.5">100% Handcrafted Walnut Wood</div>
          </div>
        </div>
      }
      childrenBack={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#4A3022] via-[#2B1B13] to-[#170E0A] border border-amber-700/80 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col justify-between select-none overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-[#070A0F] border border-amber-600/60 p-0.5 flex items-center justify-center">
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-amber-200 text-xs font-manrope lowercase">aikulb</span>
            </div>
            <span className="text-amber-300 bg-black/70 px-2 py-0.5 rounded border border-amber-600/60 font-mono text-[8px] font-bold">1-TAP NFC & QR</span>
          </div>

          <div className="flex-1 flex items-center justify-center my-1 z-10">
            <div className="p-1.5 bg-white rounded-xl shadow-2xl flex flex-col items-center">
              <QRCodeSVG value={finalQr} size={54} level="H" />
            </div>
          </div>

          <div className="text-center text-[9px] font-mono text-amber-200 uppercase tracking-wider font-bold border-t border-amber-700/40 pt-2 z-10">
            TAP OR SCAN TO CONNECT
          </div>
        </div>
      }
    />
  );
};

export const SmartStandVisual = ({ cardId = "AK-STAND-005", qrValue }) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aikulb.com/card/${cardId}`);
  return (
    <div className="relative w-full max-w-[400px] mx-auto aspect-square rounded-3xl p-6 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#090D16] border border-emerald-500/40 shadow-2xl flex flex-col items-center justify-between select-none">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-1.5">
          <div className="w-5 h-5 rounded bg-[#070A0F] border border-[#10B981]/50 p-0.5 flex items-center justify-center">
            <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xs font-bold text-[#00DC82] tracking-wider uppercase font-manrope">aikulb STAND</span>
        </div>
        <span className="px-2.5 py-0.5 text-[10px] bg-[#10B981]/20 text-[#00DC82] rounded-full border border-[#10B981]/40 font-mono font-bold">NFC + QR</span>
      </div>

      <div className="my-4 relative w-36 h-44 bg-[#10B981]/15 border-2 border-[#10B981]/50 rounded-2xl p-4 flex flex-col items-center justify-between shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-md">
        <div className="w-10 h-10 rounded-full bg-[#10B981]/30 border border-[#00DC82] flex items-center justify-center text-[#00DC82]">
          <NfcIcon className="w-6 h-6 animate-pulse" />
        </div>
        <div className="p-1 bg-white rounded-xl shadow-md flex flex-col items-center justify-center">
          <QRCodeSVG value={finalQr} size={48} level="H" />
        </div>
        <span className="text-[10px] text-[#00DC82] font-bold tracking-wider font-manrope text-center">TAP FOR MENU & REVIEWS</span>
      </div>
      <span className="text-xs text-slate-300 text-center font-inter font-semibold">Acrylic Countertop Stand for Business & Retail</span>
    </div>
  );
};

/**
 * Hand Tapping Card Phone Visual
 */
export const HandTappingCardPhoneVisual = () => (
  <div className="relative w-full max-w-lg mx-auto flex items-center justify-center py-6 select-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#10B981]/20 rounded-full blur-3xl pointer-events-none" />

    <div className="relative w-64 sm:w-72 h-[480px] bg-[#0A0A0A] rounded-[42px] border-4 border-neutral-800 p-3 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#000000] rounded-full z-30 flex items-center justify-center space-x-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#111]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#1e1e2d]" />
      </div>

      <div className="w-full h-full bg-[#0D121B] rounded-[32px] pt-8 px-4 pb-4 overflow-hidden flex flex-col justify-between text-white relative z-10 border border-emerald-900/30">
        <div className="bg-[#070A0F] border border-emerald-900/50 rounded-2xl p-4 text-center space-y-3 relative overflow-hidden shadow-lg">
          <div className="w-16 h-16 rounded-full mx-auto bg-gradient-to-tr from-[#00DC82] via-[#10B981] to-[#059669] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#0D121B] rounded-full flex items-center justify-center overflow-hidden p-1">
              <img src="/assets/logo.png" alt="Profile Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white font-manrope">Nicholas Perry</h3>
            <p className="text-xs text-slate-400 font-inter">Founder @ <span className="text-white font-bold">aikulb</span></p>
          </div>

          <div className="inline-flex items-center space-x-1.5 bg-[#10B981]/20 text-[#00DC82] border border-[#10B981]/30 px-3 py-1 rounded-full text-[10px] font-bold font-manrope">
            <NfcIcon className="w-3 h-3 text-[#00DC82]" />
            <span>aikulb Verified</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button className="w-full py-2 rounded-xl bg-gradient-to-r from-[#00DC82] to-[#059669] text-black font-extrabold text-xs font-manrope shadow-md shadow-[#10B981]/25 hover:scale-[1.02] transition-transform">
              Save Contact
            </button>
            <button className="w-full py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-emerald-900/40 text-neutral-200 font-bold text-xs font-manrope transition-colors">
              Share
            </button>
          </div>
        </div>

        <div className="bg-[#070A0F] border border-emerald-900/40 rounded-xl p-3 text-[11px] text-slate-400 space-y-1">
          <p className="font-bold text-[#00DC82] uppercase tracking-wider text-[9px] font-mono">ABOUT</p>
          <p className="leading-tight">With aikulb smart business cards, share contact info, custom links & services with 1 tap.</p>
        </div>

        <div className="bg-[#070A0F] rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-300 border border-emerald-900/40">
          <span className="font-bold font-manrope text-[11px]">Direct Contact</span>
          <span className="w-2 h-2 rounded-full bg-[#00DC82] animate-pulse" />
        </div>
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <OriginalNfcSignal className="w-16 h-16" />
      </div>
    </div>

    <div className="absolute -top-12 -right-6 sm:-right-4 z-40 transform rotate-[-8deg]">
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [-8, -6, -8],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <Card3DTilt maxRotateX={5} maxRotateY={7}>
          <div className="relative w-56 sm:w-64 h-36 rounded-2xl bg-gradient-to-br from-[#28282C] via-[#161618] to-[#0B0B0D] border border-neutral-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-4 flex flex-col justify-between z-20 overflow-hidden group select-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-card-shimmer pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#10B981]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex justify-between items-center z-10">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-[#070A0F] border border-[#10B981]/40 p-0.5 flex items-center justify-center">
                  <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-extrabold text-white text-xs font-manrope lowercase tracking-tight">aikulb</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[#00DC82]">
                <span className="text-[8px] font-mono font-bold tracking-widest uppercase">NFC ACTIVE</span>
                <NfcIcon className="w-3.5 h-3.5 animate-pulse" />
              </div>
            </div>

            <div className="my-1 flex items-center justify-between z-10">
              <CardChip className="w-9 h-7 shadow-xs" />
              <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-mono text-slate-300 font-bold tracking-widest">
                VERIFIED PASS
              </div>
            </div>

            <div className="border-t border-white/10 pt-2 z-10 flex justify-between items-end">
              <div>
                <p className="font-black text-white text-xs font-manrope uppercase tracking-tight leading-snug">
                  Nicholas Perry
                </p>
                <p className="text-[9px] text-[#00DC82] font-medium font-inter tracking-normal mt-0.5">
                  Founder @ aikulb
                </p>
              </div>
              <span className="text-[8px] text-emerald-400 font-mono font-bold tracking-wider uppercase">
                SMART NFC PASS
              </span>
            </div>
          </div>
        </Card3DTilt>
      </motion.div>
    </div>
  </div>
);
