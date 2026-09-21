import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Card3DTilt, OriginalNfcSignal } from './AnimatedComponents';
import { RotateCw, Check, Share2, Download } from 'lucide-react';

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
export const FloatingHeroCard = ({ name = "JOHN DOE", title = "Founder & CEO", company = "aikulb TECH" }) => (
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
            <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-extrabold tracking-tight text-white text-lg font-manrope lowercase">aikulb</span>
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
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aikulb.com/card/${cardId}`);
  return (
    <FlipCardContainer
      childrenFront={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#1C1D22] via-[#0E0F12] to-[#040405] border border-neutral-700/90 rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
          
          {/* Top Header Row */}
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-black border border-neutral-700 p-0.5 shadow flex items-center justify-center">
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-white tracking-tight text-sm font-manrope lowercase">aikulb</span>
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
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-white text-xs font-manrope lowercase">aikulb</span>
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
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aikulb.com/card/${cardId}`);
  return (
    <FlipCardContainer
      childrenFront={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#E6C363] via-[#B8860B] to-[#78540B] border border-amber-300/80 rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(255,255,255,0.25),transparent)] pointer-events-none" />
          
          {/* Top Header Row */}
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-black border border-amber-400/60 p-0.5 shadow flex items-center justify-center">
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-neutral-900 tracking-tight text-sm font-manrope lowercase">aikulb</span>
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
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-neutral-950 text-xs font-manrope lowercase">aikulb</span>
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
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aikulb.com/card/${cardId}`);
  return (
    <FlipCardContainer
      childrenFront={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#F1F5F9] via-[#CBD5E1] to-[#64748B] border border-slate-300 rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(255,255,255,0.4),transparent)] pointer-events-none" />

          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-black border border-slate-400 p-0.5 shadow flex items-center justify-center">
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-slate-900 tracking-tight text-sm font-manrope lowercase">aikulb</span>
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
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-slate-900 text-xs font-manrope lowercase">aikulb</span>
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
 * 4K Organic Walnut Wood Card Visual
 */
export const WoodCardVisual = ({ name = "WOODEN NFC CARD", cardId = "AK-WOOD-WALNUT-004", qrValue }) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aikulb.com/card/${cardId}`);
  return (
    <FlipCardContainer
      childrenFront={
        <div className="relative w-full h-full p-5 bg-gradient-to-br from-[#3D2517] via-[#24150C] to-[#120B06] border border-amber-800/80 rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-black border border-amber-600/60 p-0.5 shadow flex items-center justify-center">
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-amber-200 tracking-tight text-sm font-manrope lowercase">aikulb</span>
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
                <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-amber-200 text-xs font-manrope lowercase">aikulb</span>
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
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aikulb.com/card/${cardId}`);
  return (
    <div className="relative w-full max-w-[400px] mx-auto aspect-square rounded-3xl p-6 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#090D16] border border-neutral-800 shadow-2xl flex flex-col items-center justify-between select-none">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-1.5">
          <div className="w-5 h-5 rounded bg-black border border-neutral-700 p-0.5 flex items-center justify-center">
            <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xs font-bold text-[#00DC82] tracking-wider uppercase font-manrope">aikulb STAND</span>
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
 * Interactive Hand Tapping Card Phone Visual with Fully Working Buttons
 */
export const HandTappingCardPhoneVisual = () => {
  const [toastMessage, setToastMessage] = useState('');

  const handleSaveContact = () => {
    const vcardString = `BEGIN:VCARD\nVERSION:3.0\nN:Perry;Nicholas;;;\nFN:Nicholas Perry\nORG:aikulb\nTITLE:Founder @ aikulb\nTEL;TYPE=CELL:+14155552671\nEMAIL:nicholas@aikulb.com\nURL:https://aikulb.com\nEND:VCARD`;
    const blob = new Blob([vcardString], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Nicholas_Perry_Contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('✓ Contact saved to phone address book!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleShareProfile = async () => {
    const profileUrl = window.location.origin + '/profile/nicholas';
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Nicholas Perry - aikulb Profile',
          text: 'Connect with Nicholas Perry on aikulb',
          url: profileUrl,
        });
      } catch {
        navigator.clipboard.writeText(profileUrl);
        setToastMessage('✓ Profile link copied to clipboard!');
        setTimeout(() => setToastMessage(''), 3000);
      }
    } else {
      navigator.clipboard.writeText(profileUrl);
      setToastMessage('✓ Profile link copied to clipboard!');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto flex items-center justify-center py-6 select-none">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -top-4 z-50 bg-[#00DC82] text-black font-extrabold text-xs px-4 py-2 rounded-full shadow-2xl font-manrope flex items-center space-x-1.5"
          >
            <Check className="w-4 h-4 text-black" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-64 sm:w-72 h-[480px] bg-[#0A0A0A] rounded-[42px] border-4 border-neutral-800 p-3 shadow-2xl overflow-hidden flex flex-col justify-between">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#000000] rounded-full z-30 flex items-center justify-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#1e1e2d]" />
        </div>

        <div className="w-full h-full bg-[#0D121B] rounded-[32px] pt-8 px-4 pb-4 overflow-hidden flex flex-col justify-between text-white relative z-10 border border-neutral-800">
          <div className="bg-[#070A0F] border border-neutral-800 rounded-2xl p-4 text-center space-y-3 relative overflow-hidden shadow-lg">
            <div className="w-16 h-16 rounded-full mx-auto bg-neutral-800 border border-neutral-700 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#0D121B] rounded-full flex items-center justify-center overflow-hidden p-1">
                <img src="/assets/logo.png" alt="Profile Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white font-manrope">Nicholas Perry</h3>
              <p className="text-xs text-slate-400 font-inter">Founder @ <span className="text-white font-bold">aikulb</span></p>
            </div>

            <div className="inline-flex items-center space-x-1.5 bg-[#00DC82]/10 text-[#00DC82] border border-[#00DC82]/30 px-3 py-1 rounded-full text-[10px] font-bold font-manrope">
              <NfcIcon className="w-3 h-3 text-[#00DC82]" />
              <span>aikulb Verified</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button 
                type="button"
                onClick={handleSaveContact}
                className="w-full py-2.5 rounded-xl bg-[#00DC82] hover:bg-[#00c975] text-black font-extrabold text-xs font-manrope shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1"
              >
                <Download className="w-3.5 h-3.5 text-black" />
                <span>Save Contact</span>
              </button>
              <button 
                type="button"
                onClick={handleShareProfile}
                className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold text-xs font-manrope transition-all cursor-pointer flex items-center justify-center space-x-1"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-300" />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div className="bg-[#070A0F] border border-neutral-800 rounded-xl p-3 text-[11px] text-slate-400 space-y-1">
            <p className="font-bold text-[#00DC82] uppercase tracking-wider text-[9px] font-mono">ABOUT</p>
            <p className="leading-tight">With aikulb smart business cards, share contact info, custom links & services with 1 tap.</p>
          </div>

          <div className="bg-[#070A0F] rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-300 border border-neutral-800">
            <span className="font-bold font-manrope text-[11px]">Direct Contact</span>
            <span className="w-2 h-2 rounded-full bg-[#00DC82]" />
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
            <div className="relative w-56 sm:w-64 h-36 rounded-2xl bg-gradient-to-br from-[#1C1D22] via-[#0E0F12] to-[#040405] border border-neutral-700/80 shadow-2xl p-4 flex flex-col justify-between z-20 overflow-hidden group select-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-card-shimmer pointer-events-none" />

              <div className="flex justify-between items-center z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-black border border-neutral-700 p-0.5 flex items-center justify-center">
                    <img src="/assets/logo.png" alt="aikulb Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-extrabold text-white text-xs font-manrope lowercase tracking-tight">aikulb</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[#00DC82]">
                  <span className="text-[8px] font-mono font-bold tracking-widest uppercase">NFC ACTIVE</span>
                  <NfcIcon className="w-3.5 h-3.5" />
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
                <span className="text-[8px] text-[#00DC82] font-mono font-bold tracking-wider uppercase">
                  SMART NFC PASS
                </span>
              </div>
            </div>
          </Card3DTilt>
        </motion.div>
      </div>
    </div>
  );
};
