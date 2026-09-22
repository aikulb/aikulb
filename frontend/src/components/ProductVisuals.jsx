import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Card3DTilt, OriginalNfcSignal } from './AnimatedComponents';
import { RotateCw, Check, Share2, Download, Phone, Mail, Globe, ChevronRight, Linkedin, Instagram, Twitter, Github, ExternalLink } from 'lucide-react';
import { api } from '../services/apiClient';
import { silverTrishul, goldTrishul, silverWorld, blueWorld, blueTrishul } from '../assets/cardAssets';

export const NfcIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7-3 9-6 11-3-2-6-4-6-11Z" />
    <path d="M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M9.5 12.5a4 4 0 0 0 5 0" />
    <path d="M7 16a8 8 0 0 0 10 0" />
  </svg>
);

export const CardChip = ({ className = "w-11 h-8" }) => (
  <svg className={className} viewBox="0 0 44 34" fill="none">
    <rect width="44" height="34" rx="6" fill="url(#chip-grad-4k)" stroke="#D4AF37" strokeWidth="1" />
    <path d="M0 11H15V23H0" stroke="#997010" strokeWidth="1.2" />
    <path d="M44 11H29V23H44" stroke="#997010" strokeWidth="1.2" />
    <path d="M15 0V34" stroke="#997010" strokeWidth="1.2" />
    <path d="M29 0V34" stroke="#997010" strokeWidth="1.2" />
    <rect x="16" y="12" width="12" height="10" rx="2" fill="#F3E5AB" stroke="#B8860B" strokeWidth="0.8" />
    <circle cx="22" cy="17" r="1.5" fill="#B8860B" />
    <defs>
      <linearGradient id="chip-grad-4k" x1="0" y1="0" x2="44" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F7E7A1" />
        <stop offset="0.3" stopColor="#D4AF37" />
        <stop offset="0.7" stopColor="#AA7C11" />
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
    <div className="w-full max-w-[440px] mx-auto flex flex-col items-center">
      <Card3DTilt maxRotateX={4} maxRotateY={6} className="w-full">
        <div 
          onClick={() => setIsFlipped(!isFlipped)} 
          className="relative w-full aspect-[1.586] perspective-1000 cursor-pointer group select-none"
          title="Click card to flip (Front / Back)"
        >
          <div 
            className="w-full h-full relative transform-style-3d transition-transform duration-700 rounded-2xl shadow-2xl"
            style={{ transform: `rotateY(${isFlipped ? 180 : 0}deg)` }}
          >
            {/* FRONT FACE */}
            <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden">
              {childrenFront}
            </div>

            {/* BACK FACE */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden">
              {childrenBack}
            </div>
          </div>
        </div>
      </Card3DTilt>

      {/* REVERSE SYMBOL FLIP BUTTON (OUTSIDE THE CARD) */}
      <button 
        type="button" 
        onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }}
        className="mt-3.5 px-4 py-1.5 rounded-full bg-[#070A0F]/90 hover:bg-[#0E131F] border border-neutral-700/80 text-white hover:text-[#00DC82] text-xs font-mono font-bold flex items-center space-x-2 transition-all shadow-lg hover:scale-105 cursor-pointer group/flipbtn select-none"
        title="Reverse / Flip Card View"
      >
        <RotateCw className={`w-3.5 h-3.5 text-[#00DC82] transition-transform duration-500 group-hover/flipbtn:rotate-180 ${isFlipped ? 'rotate-180' : ''}`} />
        <span>Flip Side ({isFlipped ? 'Back View' : 'Front View'})</span>
      </button>
    </div>
  );
};

/**
 * Floating Hero Card
 */
export const FloatingHeroCard = ({ name = "JOHN DOE", title = "Founder & CEO", company = "ai klub TECH" }) => (
  <Card3DTilt maxRotateX={4} maxRotateY={6}>
    <motion.div
      animate={{
        y: [0, -12, 0],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative w-80 h-48 md:w-96 md:h-56 rounded-2xl p-6 bg-gradient-to-br from-[#1C1D22] via-[#0E0F12] to-[#040405] border border-neutral-700/80 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-[#00DC82] transition-colors duration-500 select-none"
    >
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-black border border-neutral-700 p-0.5 shadow-md flex items-center justify-center">
            <img src="/assets/logo.png" alt="ai klub Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-extrabold tracking-tight text-white text-lg font-manrope lowercase">ai klub</span>
        </div>
        <div className="flex items-center space-x-2 text-[#00DC82]">
          <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400 font-bold">NFC PASS</span>
          <NfcIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-center justify-between z-10 my-2">
        <CardChip className="w-11 h-9 shadow-md" />
      </div>

      <div className="z-10 flex justify-between items-end border-t border-neutral-800 pt-3">
        <div>
          <h4 className="font-extrabold text-white text-base font-manrope uppercase tracking-tight leading-snug">{name}</h4>
          <p className="text-xs text-slate-300 font-medium font-inter tracking-normal mt-0.5">{title} • {company}</p>
        </div>
        <div className="text-right">
          <span className="text-[9px] uppercase tracking-wider text-[#00DC82] font-mono font-bold">TAP TO CONNECT</span>
        </div>
      </div>
    </motion.div>
  </Card3DTilt>
);

/**
 * 4K Black Metal Card Visual
 */
export const BlackMetalCardVisual = ({ name = "BLACK METAL NFC CARD", title = "FOUNDER & CEO", cardId = "AK-BLACK-METAL-001", qrValue }) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aiklub.com/card/${cardId}`);
  return (
    <FlipCardContainer
      childrenFront={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#1C1D22] via-[#0E0F12] to-[#040405] border border-neutral-700/90 rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
          
          {/* Top Header Row */}
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-black border border-neutral-700 p-0.5 shadow flex items-center justify-center">
                <img src="/assets/logo.png" alt="ai klub Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-white tracking-tight text-sm font-manrope lowercase">ai klub</span>
            </div>
            <div className="text-[#00DC82] font-mono text-[9px] font-extrabold tracking-wider border border-[#00DC82]/30 bg-black/80 px-2 py-0.5 rounded shadow-sm">
              MATTE BLACK METAL
            </div>
          </div>

          {/* Middle Row */}
          <div className="my-2 flex justify-between items-center z-10">
            <CardChip />
          </div>

          {/* Bottom Row */}
          <div className="border-t border-neutral-800 pt-2 z-10">
            <div className="text-white font-extrabold text-sm tracking-tight uppercase font-manrope leading-snug drop-shadow-sm">{name}</div>
            <div className="text-[10px] text-[#00DC82] uppercase tracking-wider font-inter font-bold mt-0.5">{title}</div>
          </div>
        </div>
      }
      childrenBack={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#1C1D22] via-[#0E0F12] to-[#040405] border border-neutral-700/90 rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-black border border-neutral-700 p-0.5 flex items-center justify-center">
                <img src="/assets/logo.png" alt="ai klub Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-white text-xs font-manrope lowercase">ai klub</span>
            </div>
            <span className="text-[#00DC82] bg-black/80 px-2 py-0.5 rounded border border-neutral-800 font-mono text-[8px] font-bold">1-TAP NFC & QR</span>
          </div>

          <div className="flex-1 flex items-center justify-center my-1 z-10">
            <div className="p-2 bg-white rounded-xl shadow-2xl flex flex-col items-center">
              <QRCodeSVG value={finalQr} size={54} level="H" />
            </div>
          </div>

          <div className="text-center text-[9px] font-mono text-slate-300 uppercase tracking-wider font-bold border-t border-neutral-800 pt-2 z-10">
            TAP OR SCAN TO CONNECT
          </div>
        </div>
      }
    />
  );
};

/**
 * 4K Gold Metal Card Visual
 */
export const GoldMetalCardVisual = ({ name = "24K GOLD NFC CARD", cardId = "AK-GOLD-24K-002", qrValue }) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aiklub.com/card/${cardId}`);
  return (
    <FlipCardContainer
      childrenFront={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#E6C363] via-[#B8860B] to-[#78540B] border border-amber-300/80 rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(255,255,255,0.25),transparent)] pointer-events-none" />
          
          {/* Top Header Row */}
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-black border border-amber-400/60 p-0.5 shadow flex items-center justify-center">
                <img src="/assets/logo.png" alt="ai klub Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-neutral-900 tracking-tight text-sm font-manrope lowercase">ai klub</span>
            </div>
            <div className="text-amber-100 font-mono text-[9px] font-extrabold tracking-wider border border-amber-300/60 bg-black/80 px-2 py-0.5 rounded shadow-sm">
              24K GOLD METAL
            </div>
          </div>

          <div className="my-2 flex justify-between items-center z-10">
            <CardChip />
          </div>

          <div className="border-t border-amber-900/30 pt-2 z-10">
            <div className="text-neutral-950 font-black text-sm tracking-tight uppercase font-manrope leading-snug">{name}</div>
            <div className="text-[10px] text-neutral-800 uppercase tracking-wider font-inter font-bold mt-0.5">24K Electroplated Gold Metal</div>
          </div>
        </div>
      }
      childrenBack={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#E6C363] via-[#B8860B] to-[#78540B] border border-amber-300/80 rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-black border border-amber-400/60 p-0.5 flex items-center justify-center">
                <img src="/assets/logo.png" alt="ai klub Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-neutral-950 text-xs font-manrope lowercase">ai klub</span>
            </div>
            <span className="text-amber-300 bg-black/80 px-2 py-0.5 rounded border border-amber-400/60 font-mono text-[8px] font-bold">1-TAP NFC & QR</span>
          </div>

          <div className="flex-1 flex items-center justify-center my-1 z-10">
            <div className="p-2 bg-white rounded-xl shadow-2xl flex flex-col items-center">
              <QRCodeSVG value={finalQr} size={54} level="H" />
            </div>
          </div>

          <div className="text-center text-[9px] font-mono text-neutral-900 uppercase tracking-wider font-extrabold border-t border-amber-900/30 pt-2 z-10">
            TAP OR SCAN TO CONNECT
          </div>
        </div>
      }
    />
  );
};

/**
 * 4K Silver Metal Card Visual
 */
export const SilverMetalCardVisual = ({ name = "SILVER METAL CARD", cardId = "AK-SILVER-STEEL-003", qrValue }) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aiklub.com/card/${cardId}`);
  return (
    <FlipCardContainer
      childrenFront={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#F1F5F9] via-[#CBD5E1] to-[#64748B] border border-slate-300 rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(255,255,255,0.4),transparent)] pointer-events-none" />

          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-black border border-slate-400 p-0.5 shadow flex items-center justify-center">
                <img src="/assets/logo.png" alt="ai klub Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-slate-900 tracking-tight text-sm font-manrope lowercase">ai klub</span>
            </div>
            <div className="text-slate-100 font-mono text-[9px] font-bold tracking-wider border border-slate-400 bg-black/80 px-2 py-0.5 rounded shadow-sm">
              BRUSHED STEEL
            </div>
          </div>

          <div className="my-2 flex justify-between items-center z-10">
            <CardChip />
          </div>

          <div className="border-t border-slate-400/50 pt-2 z-10">
            <div className="text-slate-950 font-black text-sm tracking-tight uppercase font-manrope leading-snug">{name}</div>
            <div className="text-[10px] text-slate-800 uppercase tracking-wider font-inter font-bold mt-0.5">Brushed Silver Stainless Steel</div>
          </div>
        </div>
      }
      childrenBack={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#F1F5F9] via-[#CBD5E1] to-[#64748B] border border-slate-300 rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-black border border-slate-400 p-0.5 flex items-center justify-center">
                <img src="/assets/logo.png" alt="ai klub Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-slate-900 text-xs font-manrope lowercase">ai klub</span>
            </div>
            <span className="text-slate-200 bg-black/80 px-2 py-0.5 rounded border border-slate-400 font-mono text-[8px] font-bold">1-TAP NFC & QR</span>
          </div>

          <div className="flex-1 flex items-center justify-center my-1 z-10">
            <div className="p-2 bg-white rounded-xl shadow-2xl flex flex-col items-center">
              <QRCodeSVG value={finalQr} size={54} level="H" />
            </div>
          </div>

          <div className="text-center text-[9px] font-mono text-slate-900 uppercase tracking-wider font-extrabold border-t border-slate-400/50 pt-2 z-10">
            TAP OR SCAN TO CONNECT
          </div>
        </div>
      }
    />
  );
};

/**
 * Generic Authentic Photo Card Visual Component
 */
export const PhotoCardVisual = ({ imageSrc, name = "ALEXANDER VANCE", title, cardId = "AK-PHOTO-001", qrValue, badge = "PREMIUM NFC CARD" }) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aiklub.com/card/${cardId}`);
  return (
    <FlipCardContainer
      childrenFront={
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group border border-neutral-700/80 bg-black">
          <img src={imageSrc} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {name && (
            <div className="absolute bottom-3 left-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex justify-between items-center">
              <div>
                <div className="text-white font-extrabold text-xs font-manrope uppercase tracking-wider">{name}</div>
                {title && <div className="text-[9px] text-[#00DC82] font-mono font-bold uppercase">{title}</div>}
              </div>
              <span className="text-[8px] font-mono text-slate-300 font-bold px-2 py-0.5 rounded bg-white/10 border border-white/20">{badge}</span>
            </div>
          )}
        </div>
      }
      childrenBack={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#1C1D22] via-[#0E0F12] to-[#040405] border border-neutral-700/90 rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-black border border-neutral-700 p-0.5 flex items-center justify-center">
                <img src="/assets/logo.png" alt="ai klub Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-white text-xs font-manrope lowercase">ai klub</span>
            </div>
            <span className="text-[#00DC82] bg-black/80 px-2 py-0.5 rounded border border-neutral-800 font-mono text-[8px] font-bold">1-TAP NFC & QR</span>
          </div>

          <div className="flex-1 flex items-center justify-center my-1 z-10">
            <div className="p-2.5 bg-white rounded-xl shadow-2xl flex flex-col items-center">
              <QRCodeSVG value={finalQr} size={58} level="H" />
            </div>
          </div>

          <div className="text-center text-[9px] font-mono text-slate-200 uppercase tracking-wider font-extrabold border-t border-neutral-800 pt-2 z-10">
            TAP OR SCAN TO CONNECT
          </div>
        </div>
      }
    />
  );
};

export const GoldTrishulCardVisual = (props) => <PhotoCardVisual imageSrc={goldTrishul} badge="24K GOLD TRISHUL" {...props} />;
export const SilverTrishulCardVisual = (props) => <PhotoCardVisual imageSrc={silverTrishul} badge="PLATINUM SILVER TRISHUL" {...props} />;
export const BlueWorldCardVisual = (props) => <PhotoCardVisual imageSrc={blueWorld} badge="SAPPHIRE BLUE WORLD MAP" {...props} />;
export const BlueTrishulCardVisual = (props) => <PhotoCardVisual imageSrc={blueTrishul} badge="SAPPHIRE BLUE TRISHUL" {...props} />;
export const SilverWorldCardVisual = (props) => <PhotoCardVisual imageSrc={silverWorld} badge="SILVER WORLD MAP" {...props} />;

/**
 * 4K Organic Walnut Wood Card Visual
 */
export const WoodCardVisual = ({ name = "WOODEN NFC CARD", cardId = "AK-WOOD-WALNUT-004", qrValue }) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aiklub.com/card/${cardId}`);
  return (
    <FlipCardContainer
      childrenFront={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#3D2517] via-[#24150C] to-[#120B06] border border-amber-800/80 rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-black border border-amber-600/60 p-0.5 shadow flex items-center justify-center">
                <img src="/assets/logo.png" alt="ai klub Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-amber-200 tracking-tight text-sm font-manrope lowercase">ai klub</span>
            </div>
            <div className="text-amber-300 font-mono text-[9px] font-bold tracking-wider border border-amber-600/60 bg-black/80 px-2 py-0.5 rounded shadow-sm">
              ORGANIC WALNUT
            </div>
          </div>

          <div className="my-2 flex justify-between items-center z-10">
            <CardChip />
          </div>

          <div className="border-t border-amber-800/40 pt-2 z-10">
            <div className="text-amber-100 font-black text-sm tracking-tight uppercase font-manrope leading-snug drop-shadow-sm">{name}</div>
            <div className="text-[10px] text-amber-400 uppercase tracking-wider font-inter font-bold mt-0.5">100% Handcrafted Walnut Wood</div>
          </div>
        </div>
      }
      childrenBack={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#3D2517] via-[#24150C] to-[#120B06] border border-amber-800/80 rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-black border border-amber-600/60 p-0.5 flex items-center justify-center">
                <img src="/assets/logo.png" alt="ai klub Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-amber-200 text-xs font-manrope lowercase">ai klub</span>
            </div>
            <span className="text-amber-300 bg-black/80 px-2 py-0.5 rounded border border-amber-600/60 font-mono text-[8px] font-bold">1-TAP NFC & QR</span>
          </div>

          <div className="flex-1 flex items-center justify-center my-1 z-10">
            <div className="p-2 bg-white rounded-xl shadow-2xl flex flex-col items-center">
              <QRCodeSVG value={finalQr} size={54} level="H" />
            </div>
          </div>

          <div className="text-center text-[9px] font-mono text-amber-200 uppercase tracking-wider font-bold border-t border-amber-800/40 pt-2 z-10">
            TAP OR SCAN TO CONNECT
          </div>
        </div>
      }
    />
  );
};

export const SmartStandVisual = ({ cardId = "AK-STAND-005", qrValue }) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aiklub.com/card/${cardId}`);
  return (
    <div className="relative w-full max-w-[400px] mx-auto aspect-square rounded-3xl p-6 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#090D16] border border-neutral-800 shadow-2xl flex flex-col items-center justify-between select-none">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-1.5">
          <div className="w-5 h-5 rounded bg-black border border-neutral-700 p-0.5 flex items-center justify-center">
            <img src="/assets/logo.png" alt="ai klub Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xs font-bold text-[#00DC82] tracking-wider uppercase font-manrope">ai klub STAND</span>
        </div>
        <span className="px-2.5 py-0.5 text-[10px] bg-black text-[#00DC82] rounded-full border border-neutral-800 font-mono font-bold">NFC + QR</span>
      </div>

      <div className="my-4 relative w-36 h-44 bg-neutral-900 border border-neutral-700 rounded-2xl p-4 flex flex-col items-center justify-between shadow-2xl">
        <div className="w-10 h-10 rounded-full bg-black border border-[#00DC82] flex items-center justify-center text-[#00DC82]">
          <NfcIcon className="w-6 h-6" />
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
 * Photorealistic Studio Hand Mockup Visual matching Reference Images 1, 2 & 3:
 * - Real photorealistic studio human hands holding the smartphone frame
 * - Real photorealistic studio human hand holding/pinching the black NFC card
 * - Static presentation graphic (NO pointer-events, NO interactive click triggers inside the mockup image)
 * - 100% static & crisp display with ZERO scrolling & NO scrollbars
 */
export const HandTappingCardPhoneVisual = ({ initialUsername = 'nicholas' }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadProfile = async () => {
      try {
        const res = await api.getPublicProfile(initialUsername);
        if (res && res.success && res.data && isMounted) {
          setProfile(res.data);
        }
      } catch {
        // Fall back gracefully
      }
    };
    loadProfile();
    return () => { isMounted = false; };
  }, [initialUsername]);

  // Display values matching Reference Image 2
  const name = profile?.full_name || 'Nicholas Perry';
  const title = profile?.title || 'Designer @ ai klub';
  const bio = profile?.bio || 'With the smart business cards and digital cards, you will be able to reach your clients very easily and hassle-free.';
  const phone = profile?.phone || '149-219-4462';
  const email = profile?.email || 'nicholas@aiklub.com';
  const website = profile?.website || 'www.aiklub.com';
  const avatarUrl = profile?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center py-4 select-none pointer-events-none">
      
      {/* Outer Container Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">

        {/* 1. SINGLE TOP REAL STUDIO HUMAN HAND HOLDING MATTE BLACK NFC CARD (FULL MOBILE SCREEN VISIBLE, NO BLACK OVERLAY) */}
        <div className="relative z-20 -mb-2 sm:-mb-3 pointer-events-none flex items-center justify-center">
          <div className="w-72 sm:w-80 h-[260px] sm:h-[295px] relative flex items-center justify-center overflow-hidden">
            <img
              src="/assets/real_hand_holding_card_hero.jpg"
              alt="Real studio hand holding ai klub NFC card"
              className="w-full h-auto object-cover object-top mix-blend-screen opacity-100 filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
            />
          </div>
        </div>

        {/* 2. FOREGROUND SMARTPHONE DISPLAY (100% BRIGHT & VISIBLE - TOUCHING NFC CARD FOR SCANNING) */}
        <div className="relative w-60 sm:w-66 h-[440px] sm:h-[460px] bg-[#0A0A0C] rounded-[40px] border-4 border-neutral-800 p-1.5 shadow-[0_30px_70px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col justify-between z-30 pointer-events-none select-none">
          
          {/* Hardware Notch Pill */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#000000] rounded-full z-40 flex items-center justify-center space-x-1.5 border border-neutral-800">
            <div className="w-2 h-2 rounded-full bg-[#15151b]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#20202d]" />
          </div>

          {/* Screen Viewport - OVERFLOW-HIDDEN with ZERO scrollbars */}
          <div className="w-full h-full bg-[#080B11] rounded-[32px] overflow-hidden text-white relative z-10 border border-neutral-800/80 flex flex-col justify-between pointer-events-none select-none">
            
            <div>
              {/* Top Red/Coral Curved Header Cap */}
              <div className="h-12 w-full bg-gradient-to-r from-[#FF4D4D] via-[#FF3838] to-[#E62E2E] rounded-b-[22px] relative overflow-hidden flex items-end justify-center pb-0.5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.25),transparent_70%)] pointer-events-none" />
              </div>

              {/* Split Profile Header Card */}
              <div className="-mt-6 mx-2 rounded-xl bg-[#0F1420] border border-neutral-800/90 shadow-lg overflow-hidden flex items-stretch">
                {/* Left Photo Avatar */}
                <div className="w-20 sm:w-22 bg-neutral-900 relative shrink-0 overflow-hidden border-r border-neutral-800">
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Right Dark Info Box */}
                <div className="flex-1 p-2 bg-[#0B0E17] flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-white text-[11px] sm:text-xs font-manrope leading-tight">
                      {name}
                    </h3>
                    <p className="text-[9px] text-slate-300 font-inter font-medium mt-0.5">
                      {title}
                    </p>
                  </div>

                  {/* ai klub Logo Emblem */}
                  <div className="pt-1">
                    <div className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-[#FF4D4D]/10 border border-[#FF4D4D]/30">
                      <img src="/assets/logo.png" alt="ai klub" className="w-2.5 h-2.5 object-contain" />
                      <span className="text-[8px] font-bold font-manrope text-[#FF4D4D] lowercase">ai klub</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Static Action Buttons Row */}
              <div className="grid grid-cols-2 gap-1.5 mt-2 px-2">
                <div className="w-full py-1.5 rounded-full bg-gradient-to-r from-[#FF4D4D] to-[#FF3838] text-white font-extrabold text-[10px] font-manrope shadow flex items-center justify-center space-x-1">
                  <Download className="w-3 h-3 text-white" />
                  <span>Save Contact</span>
                </div>

                <div className="w-full py-1.5 rounded-full bg-[#E2E8F0] text-[#0F172A] font-extrabold text-[10px] font-manrope shadow flex items-center justify-center space-x-1">
                  <Share2 className="w-3 h-3 text-[#0F172A]" />
                  <span>Share</span>
                </div>
              </div>

              {/* ABOUT Section */}
              <div className="mt-2 px-2">
                <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  ABOUT
                </span>
                <div className="p-2 rounded-lg bg-[#0F1420]/90 border border-neutral-800/80 text-[9px] text-slate-300 leading-tight font-inter">
                  {bio}
                </div>
              </div>

              {/* CONTACT ME Section */}
              <div className="mt-2 px-2">
                <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  CONTACT ME
                </span>

                <div className="space-y-1 font-inter text-[9px]">
                  {/* Phone Item */}
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#0F1420]/90 border border-neutral-800/80 text-slate-200">
                    <div className="flex items-center space-x-1.5 overflow-hidden">
                      <div className="w-4 h-4 rounded-full bg-[#FF4D4D]/15 text-[#FF4D4D] flex items-center justify-center shrink-0">
                        <Phone className="w-2.5 h-2.5" />
                      </div>
                      <span className="font-medium text-slate-200 truncate">{phone}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  </div>

                  {/* Email Item */}
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#0F1420]/90 border border-neutral-800/80 text-slate-200">
                    <div className="flex items-center space-x-1.5 overflow-hidden">
                      <div className="w-4 h-4 rounded-full bg-[#FF4D4D]/15 text-[#FF4D4D] flex items-center justify-center shrink-0">
                        <Mail className="w-2.5 h-2.5" />
                      </div>
                      <span className="font-medium text-slate-200 truncate">{email}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  </div>

                  {/* Website Item */}
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-[#0F1420]/90 border border-neutral-800/80 text-slate-200">
                    <div className="flex items-center space-x-1.5 overflow-hidden">
                      <div className="w-4 h-4 rounded-full bg-[#FF4D4D]/15 text-[#FF4D4D] flex items-center justify-center shrink-0">
                        <Globe className="w-2.5 h-2.5" />
                      </div>
                      <span className="font-medium text-slate-200 truncate">{website}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  </div>
                </div>
              </div>

              {/* ON THE SOCIAL Section */}
              <div className="mt-2 px-2">
                <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  ON THE SOCIAL
                </span>

                <div className="flex items-center space-x-1.5">
                  <div className="p-1 rounded bg-[#0F1420]/90 border border-neutral-800/80 text-blue-400 flex items-center justify-center">
                    <Linkedin className="w-3 h-3" />
                  </div>
                  <div className="p-1 rounded bg-[#0F1420]/90 border border-neutral-800/80 text-pink-400 flex items-center justify-center">
                    <Instagram className="w-3 h-3" />
                  </div>
                  <div className="p-1 rounded bg-[#0F1420]/90 border border-neutral-800/80 text-cyan-400 flex items-center justify-center">
                    <Twitter className="w-3 h-3" />
                  </div>
                  <div className="p-1 rounded bg-[#0F1420]/90 border border-neutral-800/80 text-slate-200 flex items-center justify-center">
                    <Github className="w-3 h-3" />
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Powered By Branding */}
            <div className="p-1 text-center border-t border-neutral-800/80 bg-[#06080D]">
              <span className="text-[7.5px] font-mono text-slate-400 uppercase tracking-wider">
                1-Tap NFC & Dynamic Digital Identity
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
