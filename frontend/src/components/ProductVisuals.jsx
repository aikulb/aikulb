import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Card3DTilt } from './AnimatedComponents';
import { RotateCw, Check, Zap } from 'lucide-react';
import { api } from '../services/apiClient';

export const NfcIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7-3 9-6 11-3-2-6-4-6-11Z" />
    <path d="M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M9.5 12.5a4 4 0 0 0 5 0" />
    <path d="M7 16a8 8 0 0 0 10 0" />
  </svg>
);

export const WavyAccentLines = ({ className = "w-24 h-24 opacity-40" }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" stroke="currentColor">
    <path d="M0,120 Q30,60 120,40" strokeWidth="1.8" />
    <path d="M0,110 Q35,55 120,48" strokeWidth="1.4" />
    <path d="M0,100 Q40,50 120,56" strokeWidth="1.1" />
    <path d="M0,90 Q45,45 120,64" strokeWidth="0.8" opacity="0.8" />
    <path d="M0,80 Q50,40 120,72" strokeWidth="0.6" opacity="0.6" />
    <path d="M0,70 Q55,35 120,80" strokeWidth="0.4" opacity="0.4" />
  </svg>
);

/**
 * 3D Engraved Trishul-AK Emblem matching 1st reference image
 */
export const TrishulAkEmblem = ({ className = "w-12 h-12 text-current" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    {/* Center Trishul Shaft & Trident Tip */}
    <path d="M48 8 H52 V72 H48 Z" />
    <path d="M50 4 L57 20 H43 Z" />
    <path d="M34 22 C32 38 42 46 48 46 V41 C44 41 37 36 38 24 Z" />
    <path d="M66 22 C68 38 58 46 52 46 V41 C56 41 63 36 62 24 Z" />
    {/* Monogram A & K Swoops */}
    <path d="M22 65 C38 48 46 44 50 46 C54 44 62 48 78 65 L74 69 C60 54 53 50 50 51 C47 50 40 54 26 69 Z" />
    <path d="M48 46 L70 30 L74 34 L52 50 Z" />
    <path d="M48 48 L70 68 L66 72 L46 52 Z" />
  </svg>
);

export const DotMatrixWorldMap = ({ className = "w-full h-full opacity-20 text-slate-300" }) => (
  <svg className={className} viewBox="0 0 600 300" fill="currentColor">
    <g opacity="0.85">
      <circle cx="90" cy="70" r="2.5"/><circle cx="105" cy="65" r="2.5"/><circle cx="120" cy="70" r="2.5"/><circle cx="135" cy="75" r="2.5"/><circle cx="150" cy="70" r="2.5"/><circle cx="165" cy="65" r="2.5"/><circle cx="180" cy="75" r="2.5"/><circle cx="195" cy="80" r="2.5"/>
      <circle cx="85" cy="85" r="2.5"/><circle cx="100" cy="80" r="2.5"/><circle cx="115" cy="85" r="2.5"/><circle cx="130" cy="90" r="2.5"/><circle cx="145" cy="85" r="2.5"/><circle cx="160" cy="80" r="2.5"/><circle cx="175" cy="90" r="2.5"/><circle cx="190" cy="95" r="2.5"/>
      <circle cx="95" cy="100" r="2.5"/><circle cx="110" cy="95" r="2.5"/><circle cx="125" cy="100" r="2.5"/><circle cx="140" cy="105" r="2.5"/><circle cx="155" cy="100" r="2.5"/><circle cx="170" cy="105" r="2.5"/><circle cx="185" cy="110" r="2.5"/>
      <circle cx="280" cy="65" r="2.5"/><circle cx="295" cy="60" r="2.5"/><circle cx="310" cy="65" r="2.5"/><circle cx="325" cy="60" r="2.5"/><circle cx="340" cy="65" r="2.5"/><circle cx="355" cy="70" r="2.5"/>
      <circle cx="275" cy="80" r="2.5"/><circle cx="290" cy="75" r="2.5"/><circle cx="305" cy="80" r="2.5"/><circle cx="320" cy="75" r="2.5"/><circle cx="335" cy="80" r="2.5"/><circle cx="350" cy="85" r="2.5"/>
      <circle cx="370" cy="65" r="2.5"/><circle cx="385" cy="60" r="2.5"/><circle cx="400" cy="65" r="2.5"/><circle cx="415" cy="60" r="2.5"/><circle cx="430" cy="65" r="2.5"/><circle cx="445" cy="60" r="2.5"/><circle cx="460" cy="65" r="2.5"/><circle cx="475" cy="70" r="2.5"/>
      <circle cx="365" cy="80" r="2.5"/><circle cx="380" cy="75" r="2.5"/><circle cx="395" cy="80" r="2.5"/><circle cx="410" cy="75" r="2.5"/><circle cx="425" cy="80" r="2.5"/><circle cx="440" cy="75" r="2.5"/><circle cx="455" cy="80" r="2.5"/><circle cx="470" cy="85" r="2.5"/>
    </g>
  </svg>
);

export const FivePillarsGrid = ({ className = "text-slate-300 border-t border-slate-500/30 pt-1.5" }) => (
  <div className={`grid grid-cols-5 gap-1 text-center font-mono uppercase text-[7px] sm:text-[8px] font-bold ${className}`}>
    <div className="flex flex-col items-center space-y-0.5 border-r border-current/30 px-0.5">
      <span>PEOPLE</span>
    </div>
    <div className="flex flex-col items-center space-y-0.5 border-r border-current/30 px-0.5">
      <span>IDEAS</span>
    </div>
    <div className="flex flex-col items-center space-y-0.5 border-r border-current/30 px-0.5">
      <span>TECH</span>
    </div>
    <div className="flex flex-col items-center space-y-0.5 border-r border-current/30 px-0.5">
      <span>OPPORTUNITY</span>
    </div>
    <div className="flex flex-col items-center space-y-0.5 px-0.5">
      <span>GLOBAL</span>
    </div>
  </div>
);

/**
 * Reusable Interactive 3D Flip Card Container
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
 * Universal Card Front Face Template matching 1st Reference Image
 */
export const CardFrontTemplate = ({
  bgClass = "bg-gradient-to-br from-[#E6E8EB] via-[#D1D5DB] to-[#9CA3AF] border border-slate-300 text-slate-950",
  shimmer = true,
  emblemClass = "text-slate-900 drop-shadow-sm",
  titleClass = "text-slate-950 font-black",
  subtitleClass = "text-slate-800 font-bold",
  pillarsClass = "text-slate-900 font-bold",
  nfcClass = "text-slate-900 font-bold",
  qrTextClass = "text-slate-900 font-bold",
  wavyClass = "text-slate-700/60",
  cardId = "AK-CARD",
  qrValue,
  name,
  title,
}) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aiklub.com/card/${cardId}`);
  
  return (
    <div className={`relative w-full h-full p-4 sm:p-4.5 ${bgClass} rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden transition-all duration-300`}>
      {shimmer && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(255,255,255,0.35),transparent)] pointer-events-none z-0" />
      )}

      {/* TOP ROW: 4-Pillars Corner Accent (Top Left) & NFC ))) Wave Signal (Top Right) */}
      <div className="flex justify-between items-start z-10 w-full">
        <div className={`flex flex-col items-start font-mono text-[7px] sm:text-[7.5px] tracking-[0.18em] leading-[1.3] uppercase ${pillarsClass}`}>
          <span>CONNECT</span>
          <span>COLLABORATE</span>
          <span>CREATE</span>
          <span>GROW</span>
          <div className="w-4.5 h-[1.5px] bg-current mt-0.5 opacity-75" />
        </div>

        <div className={`flex items-center space-x-1 font-mono text-[9px] sm:text-[10px] font-black tracking-wider ${nfcClass}`}>
          <span>NFC</span>
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 8a4 4 0 0 1 4 4" />
            <path d="M12 5a7 7 0 0 1 7 7" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
        </div>
      </div>

      {/* CENTER AREA: 3D AK Monogram Trishul Emblem + Brand Title + Tagline */}
      <div className="flex flex-col items-center justify-center z-10 my-auto text-center">
        <TrishulAkEmblem className={`w-10 h-10 sm:w-11 sm:h-11 ${emblemClass}`} />
        <h3 className={`text-lg sm:text-xl font-black font-manrope tracking-tight mt-0.5 ${titleClass}`}>Ai Klub</h3>
        <p className={`text-[6.5px] sm:text-[7.5px] font-mono tracking-[0.22em] uppercase font-bold mt-0.5 ${subtitleClass}`}>PEOPLE | IDEAS | TECHNOLOGY</p>
      </div>

      {/* ABSOLUTE BOTTOM LEFT WAVY LINES MOTIF */}
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-40 z-0">
        <WavyAccentLines className={`w-20 h-20 sm:w-24 sm:h-24 ${wavyClass}`} />
      </div>

      {/* ABSOLUTE BOTTOM RIGHT QR CODE + TAP TO CONNECT */}
      <div className="absolute bottom-2.5 right-3 flex flex-col items-center z-20">
        <div className="p-1 bg-white rounded-lg shadow-md border border-black/10">
          <QRCodeSVG value={finalQr} size={36} level="H" />
        </div>
        <span className={`text-[6px] sm:text-[6.5px] font-mono font-bold tracking-wider mt-0.5 uppercase ${qrTextClass}`}>TAP TO CONNECT</span>
      </div>
    </div>
  );
};

/**
 * Universal Card Back Face Template
 */
export const CardBackTemplate = ({
  cardId = "AK-CARD",
  bgClass = "bg-gradient-to-br from-[#1C1D22] via-[#0E0F12] to-[#040405] text-white",
}) => (
  <div className={`relative w-full h-full p-5 ${bgClass} rounded-2xl shadow-2xl flex flex-col justify-between select-none overflow-hidden`}>
    <div className="absolute inset-0 pointer-events-none opacity-20">
      <DotMatrixWorldMap className="w-full h-full" />
    </div>

    <div className="flex justify-between items-start z-10">
      <div className="flex items-center space-x-2">
        <span className="font-extrabold text-sm font-manrope">Ai Klub</span>
      </div>
      <div className="text-right text-[8px] font-mono opacity-80 tracking-wider">
        MORE<br />THAN A CARD<br />A COMMUNITY
      </div>
    </div>

    <div className="text-center z-10 my-1">
      <h3 className="text-lg font-black font-manrope tracking-tight">Ai Klub</h3>
      <p className="text-[9px] font-mono tracking-widest opacity-85 border-b border-current/30 pb-1 inline-block">A SMARTER TOMORROW TOGETHER</p>
    </div>

    <div className="z-10 space-y-1">
      <FivePillarsGrid className="border-t border-current/30 pt-1.5" />
      <div className="flex justify-between items-center text-[8px] font-mono opacity-70 pt-1">
        <span>TAP . CONNECT . GROW.</span>
        <span>1-TAP NFC & QR</span>
      </div>
    </div>
  </div>
);

/**
 * Platinum Silver Metal Card Visual (EXACT 1st Reference Image Design)
 */
export const SilverMetalCardVisual = ({ name, cardId = "AK-SILVER-001", qrValue }) => (
  <FlipCardContainer
    childrenFront={
      <CardFrontTemplate
        bgClass="bg-gradient-to-br from-[#F1F3F5] via-[#D8DCF0] to-[#B0B7C6] border border-slate-300 text-slate-950"
        emblemClass="text-slate-900 drop-shadow-md"
        titleClass="text-slate-950 font-black"
        subtitleClass="text-slate-900 font-extrabold"
        pillarsClass="text-slate-900 font-black"
        nfcClass="text-slate-950 font-black"
        qrTextClass="text-slate-950 font-black"
        wavyClass="text-slate-700/60"
        cardId={cardId}
        qrValue={qrValue}
        name={name}
      />
    }
    childrenBack={<CardBackTemplate cardId={cardId} bgClass="bg-gradient-to-br from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] border border-slate-300 text-slate-950" />}
  />
);

/**
 * 24K Gold Metal Card Visual (Gold Finish matching 1st Reference Image)
 */
export const GoldMetalCardVisual = ({ name, cardId = "AK-GOLD-002", qrValue }) => (
  <FlipCardContainer
    childrenFront={
      <CardFrontTemplate
        bgClass="bg-gradient-to-br from-[#FCE8A6] via-[#D4AF37] to-[#8A6711] border border-amber-300/90 text-neutral-950"
        emblemClass="text-neutral-950 drop-shadow-md"
        titleClass="text-neutral-950 font-black"
        subtitleClass="text-amber-950 font-extrabold"
        pillarsClass="text-neutral-950 font-extrabold"
        nfcClass="text-neutral-950 font-black"
        qrTextClass="text-neutral-950 font-black"
        wavyClass="text-amber-950/60"
        cardId={cardId}
        qrValue={qrValue}
        name={name}
      />
    }
    childrenBack={<CardBackTemplate cardId={cardId} bgClass="bg-gradient-to-br from-[#F5D77F] via-[#D4AF37] to-[#8A6711] border border-amber-300/90 text-neutral-950" />}
  />
);

/**
 * Executive Matte Black Metal Card Visual (Matte Black Finish matching 1st Reference Image)
 */
export const BlackMetalCardVisual = ({ name, cardId = "AK-BLACK-003", qrValue }) => (
  <FlipCardContainer
    childrenFront={
      <CardFrontTemplate
        bgClass="bg-gradient-to-br from-[#1F242D] via-[#0F1217] to-[#050608] border border-neutral-700/90 text-white"
        emblemClass="text-[#00DC82] drop-shadow-[0_0_15px_rgba(0,220,130,0.5)]"
        titleClass="text-white font-black"
        subtitleClass="text-slate-300 font-bold"
        pillarsClass="text-slate-300 font-semibold"
        nfcClass="text-[#00DC82] font-bold"
        qrTextClass="text-slate-200 font-bold"
        wavyClass="text-[#00DC82]/50"
        cardId={cardId}
        qrValue={qrValue}
        name={name}
      />
    }
    childrenBack={<CardBackTemplate cardId={cardId} bgClass="bg-gradient-to-br from-[#1C1D22] via-[#0E0F12] to-[#040405] border border-neutral-700/90 text-white" />}
  />
);

/**
 * Electric Sapphire Blue Metal Card Visual (Sapphire Blue Finish matching 1st Reference Image)
 */
export const BlueMetalCardVisual = ({ name, cardId = "AK-BLUE-004", qrValue }) => (
  <FlipCardContainer
    childrenFront={
      <CardFrontTemplate
        bgClass="bg-gradient-to-br from-[#0F2847] via-[#0A192F] to-[#040D1A] border border-blue-500/50 text-white"
        emblemClass="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        titleClass="text-white font-black"
        subtitleClass="text-cyan-200 font-bold"
        pillarsClass="text-slate-200 font-semibold"
        nfcClass="text-cyan-300 font-bold"
        qrTextClass="text-slate-200 font-bold"
        wavyClass="text-cyan-400/50"
        cardId={cardId}
        qrValue={qrValue}
        name={name}
      />
    }
    childrenBack={<CardBackTemplate cardId={cardId} bgClass="bg-gradient-to-br from-[#0B1426] via-[#060D1A] to-[#02050A] border border-blue-500/50 text-white" />}
  />
);

/**
 * Rose Gold Copper Metal Card Visual (Rose Gold Finish matching 1st Reference Image)
 */
export const RoseGoldMetalCardVisual = ({ name, cardId = "AK-ROSEGOLD-005", qrValue }) => (
  <FlipCardContainer
    childrenFront={
      <CardFrontTemplate
        bgClass="bg-gradient-to-br from-[#F4C3B2] via-[#E09F8C] to-[#B36B58] border border-rose-300/80 text-rose-950"
        emblemClass="text-rose-950 drop-shadow-md"
        titleClass="text-rose-950 font-black"
        subtitleClass="text-rose-900 font-extrabold"
        pillarsClass="text-rose-950 font-bold"
        nfcClass="text-rose-950 font-bold"
        qrTextClass="text-rose-950 font-bold"
        wavyClass="text-rose-950/60"
        cardId={cardId}
        qrValue={qrValue}
        name={name}
      />
    }
    childrenBack={<CardBackTemplate cardId={cardId} bgClass="bg-gradient-to-br from-[#F4C3B2] via-[#E09F8C] to-[#B36B58] border border-rose-300/80 text-rose-950" />}
  />
);

/**
 * Organic Walnut Wood Card Visual (Wood Finish matching 1st Reference Image)
 */
export const WoodCardVisual = ({ name, cardId = "AK-WOOD-006", qrValue }) => (
  <FlipCardContainer
    childrenFront={
      <CardFrontTemplate
        bgClass="bg-gradient-to-br from-[#3D2517] via-[#24150C] to-[#120B06] border border-amber-800/80 text-amber-100"
        emblemClass="text-amber-400 drop-shadow-md"
        titleClass="text-amber-100 font-black"
        subtitleClass="text-amber-300 font-semibold"
        pillarsClass="text-amber-300 font-semibold"
        nfcClass="text-amber-400 font-bold"
        qrTextClass="text-amber-200 font-bold"
        wavyClass="text-amber-500/50"
        cardId={cardId}
        qrValue={qrValue}
        name={name}
      />
    }
    childrenBack={<CardBackTemplate cardId={cardId} bgClass="bg-gradient-to-br from-[#3D2517] via-[#24150C] to-[#120B06] border border-amber-800/80 text-amber-100" />}
  />
);

/**
 * Hero Card Visual
 */
export const FloatingHeroCard = (props) => <SilverMetalCardVisual {...props} />;

/**
 * Mapped Card Visual Aliases (Guarantees every Trishul/World variant uses Image 1 reference design with variant colors!)
 */
export const GoldTrishulCardVisual = (props) => <GoldMetalCardVisual {...props} />;
export const SilverTrishulCardVisual = (props) => <SilverMetalCardVisual {...props} />;
export const BlueWorldCardVisual = (props) => <BlueMetalCardVisual {...props} />;
export const BlueTrishulCardVisual = (props) => <BlueMetalCardVisual {...props} />;
export const SilverWorldCardVisual = (props) => <SilverMetalCardVisual {...props} />;
export const PhotoCardVisual = (props) => <SilverMetalCardVisual {...props} />;

/**
 * Countertop NFC Acrylic Stand Visual
 */
export const SmartStandVisual = ({ cardId = "AK-STAND-005", qrValue }) => {
  const finalQr = qrValue || (typeof window !== 'undefined' ? `${window.location.origin}/card/${cardId}` : `https://aiklub.com/card/${cardId}`);
  return (
    <div className="relative w-full max-w-[400px] mx-auto aspect-square rounded-3xl p-6 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#090D16] border border-neutral-800 shadow-2xl flex flex-col items-center justify-between select-none">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-1.5">
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

export const HandTappingCardPhoneVisual = () => null;
