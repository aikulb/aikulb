import React, { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ShoppingBag, Check, RotateCw, QrCode, Upload, 
  Trash2, ShieldCheck, Share2, Palette, Type, 
  Sliders, Award, Crown, Zap,
  Globe, Shield, Star, Code, Briefcase, Plus, MessageCircle, ArrowRight, Smartphone, Eye
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { api } from '../services/apiClient';
import { BlackMetalCardVisual, GoldMetalCardVisual, SilverMetalCardVisual, WavyAccentLines, TrishulAkEmblem, DotMatrixWorldMap, FivePillarsGrid } from './ProductVisuals';
import { silverTrishul, goldTrishul, silverWorld, blueWorld, blueTrishul } from '../assets/cardAssets';

export const CustomCardDesignerSection = () => {
  // Main Card Details State
  const [name, setName] = useState('ALEXANDER VANCE');
  const [title, setTitle] = useState('CHIEF EXECUTIVE OFFICER');
  const [company, setCompany] = useState('NEURAL DYNAMICS INC.');
  
  // Customization Options State
  const [material, setMaterial] = useState('black_metal');
  const [fontStyle, setFontStyle] = useState('syne');
  const [inlayColor, setInlayColor] = useState('gold');
  const [chipFinish, setChipFinish] = useState('gold');
  
  // Logo & Icon State
  const [logoType, setLogoType] = useState('ak');
  const [customLogoUrl, setCustomLogoUrl] = useState(null);

  // Back Side & QR State
  const [qrHandle, setQrHandle] = useState('alex-vance');
  const [qrPosition, setQrPosition] = useState('bottom-right');
  const [tagline, setTagline] = useState('TAP OR SCAN TO CONNECT');

  // Studio Interactive State
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState('material');
  const [addons, setAddons] = useState(['hologram']);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const [openDesignerFaq, setOpenDesignerFaq] = useState(0);
  const [toastMsg, setToastMsg] = useState('');

  const fileInputRef = useRef(null);
  const { addToCart, setIsCartOpen } = useCart();

  const similarProducts = [
    {
      id: 'sim-black-silver',
      name: 'ai klub Metal NFC Business Card – Black with Silver Laser Engraving',
      weight: '20g',
      price: 1999,
      original_price: 2899,
      material: 'Stainless Steel',
      visualType: 'black_metal',
      slug: 'black-metal-card'
    },
    {
      id: 'sim-gold-mirror',
      name: 'Metal business card with gold mirror finish',
      weight: '20g',
      price: 2399,
      original_price: 2899,
      material: '24K Gold Alloy',
      visualType: 'gold_metal',
      slug: '24k-gold-metal-card'
    },
    {
      id: 'sim-black-gold',
      name: 'ai klub Metal NFC Business Card - Gold Laser Engraving',
      weight: '20g',
      price: 2399,
      original_price: 2899,
      material: 'Stainless Steel',
      visualType: 'black_metal',
      slug: 'black-metal-card'
    },
    {
      id: 'sim-class-connect',
      name: 'Black Metal NFC Card with Gold Laser Engraving – Class That Connects',
      weight: '20g',
      price: 2799,
      original_price: 3499,
      material: 'Matte Steel',
      visualType: 'black_metal',
      slug: 'black-metal-card'
    }
  ];

  const designerFaqs = [
    {
      q: 'What is NFC technology ?',
      a: 'NFC (Near Field Communication) is a wireless data technology that allows short-range communication between your smart card and any NFC-enabled smartphone with a single tap, without requiring Bluetooth pairing or apps.'
    },
    {
      q: 'What is the ai klub Business Card and how does it work?',
      a: 'An ai klub Business Card is a smart business card embedded with an NTAG216 NFC chip and dynamic QR code. Tapping it against a smartphone instantly transfers your complete contact profile, social links, portfolio, and VCF contact card to the recipient phone.'
    },
    {
      q: 'Is the ai klub business card compatible with non-nfc smartphones?',
      a: 'Yes! Every ai klub card includes a high-definition dynamic QR code printed on the back. Older or non-NFC smartphones can simply scan the QR code with their camera to instantly view your profile.'
    },
    {
      q: 'Is it compatible with Android or iOS phones?',
      a: 'Yes, 100% compatible! It works seamlessly with iPhones (iPhone XS and newer) and all NFC-enabled Android devices from Samsung, Google, OnePlus, Xiaomi, and Vivo.'
    },
    {
      q: 'Where can I tap the ai klub Card on an iPhone?',
      a: 'For iPhones (iPhone XS, 11, 12, 13, 14, 15, 16), tap the top edge of the card against the very top edge of the back of the iPhone near the camera module.'
    },
    {
      q: 'What are the benefits of the smart business card and ai klub Digital card?',
      a: 'Key benefits include: 1-tap contact saving, lifetime reusable card (no paper waste), instant updates from your admin dashboard anytime, zero app download required for recipients, and automated lead capture analytics.'
    }
  ];

  const handleAddToCartSimilar = (p) => {
    addToCart({
      id: p.id,
      name: p.name,
      price: p.price,
      material: p.material,
      image_url: ''
    }, 1);
    setToastMsg(`Added "${p.name}" to your cart!`);
    setTimeout(() => setToastMsg(''), 2500);
  };

  // Material Finishes Dataset
  const materials = [
    {
      id: 'gold_trishul',
      name: '24K Gold Trishul Emblem Edition',
      price: 1999,
      badge: 'Flagship 3D',
      bgClass: 'bg-gradient-to-br from-[#FCE8A6] via-[#D4AF37] to-[#8A6711] text-neutral-950',
      glowColor: 'rgba(255, 215, 0, 0.4)',
      desc: 'Brushed 24K Gold Metal with 3D Engraved Trishul Emblem & QR',
      textureBorder: 'border-yellow-500/50'
    },
    {
      id: 'silver_trishul',
      name: 'Platinum Silver Trishul Edition',
      price: 1899,
      badge: 'Executive',
      bgClass: 'bg-gradient-to-br from-[#F1F3F5] via-[#D8DCF0] to-[#B0B7C6] text-slate-950',
      glowColor: 'rgba(226, 232, 240, 0.4)',
      desc: 'Platinum Silver Stainless Steel with Trishul Emblem Accent',
      textureBorder: 'border-slate-400/50'
    },
    {
      id: 'blue_world',
      name: 'Sapphire Blue World Map Edition',
      price: 2199,
      badge: 'Global Series',
      bgClass: 'bg-gradient-to-br from-[#0F2847] via-[#0A192F] to-[#040D1A] text-white',
      glowColor: 'rgba(0, 150, 255, 0.4)',
      desc: 'Electric Sapphire Blue Alloy with Etched Dot-Matrix World Map',
      textureBorder: 'border-blue-500/50'
    },
    {
      id: 'blue_trishul',
      name: 'Sapphire Blue Trishul Edition',
      price: 2099,
      badge: 'Best Seller',
      bgClass: 'bg-gradient-to-br from-[#0B1E3D] via-[#07132B] to-[#020714] text-white',
      glowColor: 'rgba(108, 76, 255, 0.4)',
      desc: 'Metallic Sapphire Blue with Chrome Trishul Emblem',
      textureBorder: 'border-indigo-500/50'
    },
    {
      id: 'silver_world',
      name: 'Platinum Silver World Map Edition',
      price: 1999,
      badge: 'World Series',
      bgClass: 'bg-gradient-to-br from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] text-slate-950',
      glowColor: 'rgba(200, 210, 225, 0.4)',
      desc: 'Brushed Platinum Silver with Etched World Map & 5 Pillars',
      textureBorder: 'border-slate-300/50'
    },
    {
      id: 'black_metal',
      name: 'Matte Obsidian Black Metal',
      price: 1999,
      badge: 'Stealth Edition',
      bgClass: 'bg-gradient-to-br from-[#1F242D] via-[#0F1217] to-[#050608] text-white',
      glowColor: 'rgba(108, 76, 255, 0.3)',
      desc: 'Aerospace Grade Stainless Steel with Matte Obsidian Finish',
      textureBorder: 'border-neutral-700/60'
    }
  ];

  // Font Styles Dataset
  const fonts = [
    { id: 'syne', name: 'Syne Modern Bold', fontClass: 'font-syne', sample: 'Aa' },
    { id: 'outfit', name: 'Outfit Executive', fontClass: 'font-outfit', sample: 'Aa' },
    { id: 'spacegrotesk', name: 'Space Grotesk Tech', fontClass: 'font-space-grotesk', sample: 'Aa' },
    { id: 'cinzel', name: 'Cinzel Luxury Serif', fontClass: 'font-cinzel', sample: 'Aa' },
    { id: 'jakarta', name: 'Plus Jakarta Sans', fontClass: 'font-jakarta', sample: 'Aa' },
    { id: 'manrope', name: 'Manrope Sans', fontClass: 'font-manrope', sample: 'Aa' },
    { id: 'playfair', name: 'Luxury Serif', fontClass: 'font-playfair', sample: 'Aa' },
    { id: 'spacemono', name: 'Tech Mono', fontClass: 'font-spacemono', sample: 'Aa' }
  ];

  // Laser Inlay Colors
  const inlays = [
    { id: 'gold', name: 'Gold Foil', colorClass: 'text-inlay-gold', dotBg: 'bg-[#F5D77F]' },
    { id: 'silver', name: 'Silver Chrome', colorClass: 'text-inlay-silver', dotBg: 'bg-[#E2E8F0]' },
    { id: 'white', name: 'Clean White', colorClass: 'text-inlay-white', dotBg: 'bg-[#FFFFFF]' },
    { id: 'stealth', name: 'Stealth Dark', colorClass: 'text-inlay-stealth', dotBg: 'bg-[#111115]' }
  ];

  // Microchip Finishes
  const chips = [
    { id: 'gold', name: '24K Gold Chip', chipGrad: ['#F5D77F', '#CCA041', '#E6C363'] },
    { id: 'platinum', name: 'Platinum Chip', chipGrad: ['#F1F5F9', '#94A3B8', '#CBD5E1'] },
    { id: 'stealth', name: 'Stealth Black Chip', chipGrad: ['#334155', '#0F172A', '#1E293B'] }
  ];

  // Preset Symbols
  const presetIcons = [
    { id: 'ak', label: 'aikulb Logo', icon: null },
    { id: 'crown', label: 'Crown', icon: Crown },
    { id: 'lightning', label: 'Power', icon: Zap },
    { id: 'shield', label: 'Shield', icon: Shield },
    { id: 'globe', label: 'Global', icon: Globe },
    { id: 'star', label: 'Star', icon: Star },
    { id: 'code', label: 'Dev', icon: Code },
    { id: 'briefcase', label: 'Corporate', icon: Briefcase }
  ];

  // Optional Addons
  const addonOptions = [
    { id: 'hologram', name: 'Holographic Chip Security Inlay', price: 299, desc: 'Rainbow foil anti-counterfeit holographic seal' },
    { id: 'express', name: 'Express 24H Laser Engraving', price: 199, desc: 'Priority queue dispatch within 24 hours' },
    { id: 'gift', name: 'Velvet Gift Packaging Box', price: 149, desc: 'Sleek luxury box with velvet card holder' }
  ];

  const currentMat = materials.find(m => m.id === material) || materials[0];
  const currentFont = fonts.find(f => f.id === fontStyle) || fonts[0];
  const currentInlay = inlays.find(i => i.id === inlayColor) || inlays[0];
  const currentChip = chips.find(c => c.id === chipFinish) || chips[0];

  // Calculate Total Dynamic Price
  const addonTotal = addons.reduce((sum, addId) => {
    const opt = addonOptions.find(o => o.id === addId);
    return sum + (opt ? opt.price : 0);
  }, 0);
  const totalPrice = currentMat.price + addonTotal;

  // Handle Image Upload for Logo
  const handleLogoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setCustomLogoUrl(uploadEvent.target.result);
        setLogoType('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset Switcher Handler
  const applyPreset = (presetKey) => {
    if (presetKey === 'ceo') {
      setName('ALEXANDER VANCE');
      setTitle('CHIEF EXECUTIVE OFFICER');
      setCompany('NEURAL DYNAMICS INC.');
      setMaterial('gold_metal');
      setFontStyle('playfair');
      setInlayColor('white');
      setLogoType('crown');
      setQrHandle('alexander-vance');
    } else if (presetKey === 'tech') {
      setName('SOPHIA CHEN');
      setTitle('FOUNDER & CTO');
      setCompany('QUANTUM AI LABS');
      setMaterial('black_metal');
      setFontStyle('spacemono');
      setInlayColor('gold');
      setLogoType('code');
      setQrHandle('sophia-chen');
    } else if (presetKey === 'creative') {
      setName('MARCUS REYES');
      setTitle('CREATIVE DIRECTOR');
      setCompany('STUDIO EIGHT DESIGN');
      setMaterial('rosegold_metal');
      setFontStyle('script');
      setInlayColor('silver');
      setLogoType('star');
      setQrHandle('marcus-reyes');
    } else if (presetKey === 'doctor') {
      setName('DR. EMILY WATSON');
      setTitle('NEUROSURGEON');
      setCompany('METRO HEALTH SYSTEM');
      setMaterial('silver_metal');
      setFontStyle('manrope');
      setInlayColor('white');
      setLogoType('shield');
      setQrHandle('dr-emily-watson');
    }
  };

  // Addon Toggle Handler
  const toggleAddon = (addId) => {
    if (addons.includes(addId)) {
      setAddons(addons.filter(id => id !== addId));
    } else {
      setAddons([...addons, addId]);
    }
  };

  // Mouse Move 3D Tilt Effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // max deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Add Custom Card to Cart & Sync with Database
  const handleAddToCart = async () => {
    const customProduct = {
      id: `custom-card-${material}-${Date.now()}`,
      name: `Custom ai klub ${currentMat.name}`,
      price: totalPrice,
      original_price: totalPrice + 1000,
      material: currentMat.name,
      image_url: '/assets/products/metal_black.svg',
      custom_specs: {
        name,
        title,
        company,
        material: currentMat.name,
        fontStyle: currentFont.name,
        inlayColor: currentInlay.name,
        chipFinish: currentChip.name,
        qrUrl: `https://aiklub.com/p/${qrHandle}`,
        qrPosition,
        addons: addons.map(id => addonOptions.find(a => a.id === id)?.name)
      }
    };

    try {
      await api.saveCustomDesign({
        card_name: customProduct.name,
        material: currentMat.name,
        color: currentMat.glowColor,
        text_line1: name,
        text_line2: `${title} - ${company}`,
        logo_url: customLogoUrl || '',
        qr_position: qrPosition,
        social_icons: addons
      });
    } catch (err) {
      console.warn('Syncing custom card design (local state active):', err);
    }

    addToCart(customProduct, 1, customProduct.custom_specs);

    setAdded(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setAdded(false);
      setIsCartOpen(true);
    }, 1200);
  };

  // Copy Specifications Text
  const handleCopySpecs = () => {
    const specsText = `ai klub Card Specs:\n- Name: ${name}\n- Title: ${title}\n- Company: ${company}\n- Material: ${currentMat.name}\n- Font: ${currentFont.name}\n- Inlay: ${currentInlay.name}\n- Chip: ${currentChip.name}\n- QR URL: https://aiklub.com/p/${qrHandle}\n- Price: ₹${totalPrice}`;
    navigator.clipboard.writeText(specsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Render Card Logo Component
  const renderCardLogo = () => {
    if (logoType === 'custom' && customLogoUrl) {
      return <img src={customLogoUrl} alt="Custom Logo" className="w-7 h-7 object-contain rounded" />;
    }
    if (logoType === 'ak') {
      return (
        <div className="w-7 h-7 rounded-lg bg-[#070A0F] border border-[#10B981]/50 p-0.5 shadow flex items-center justify-center">
          <img src="/assets/logo.png" alt="Official ai klub Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
        </div>
      );
    }
    const iconObj = presetIcons.find(i => i.id === logoType);
    if (iconObj && iconObj.icon) {
      const IconComponent = iconObj.icon;
      return <IconComponent className="w-6 h-6 text-current" />;
    }
    return (
      <div className="w-7 h-7 rounded-lg bg-[#070A0F] border border-[#10B981]/50 p-0.5 shadow flex items-center justify-center">
        <img src="/assets/logo.png" alt="Official ai klub Logo" className="w-full h-full object-contain" />
      </div>
    );
  };

  return (
    <section id="customizer" className="bg-[#FAFAFA] text-slate-900 relative transition-colors duration-300 overflow-hidden">
      {/* Background Dynamic Ambient Glow reflecting current material */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[140px] opacity-15 pointer-events-none transition-all duration-700"
        style={{ background: currentMat.glowColor }}
      ></div>

      {/* Full-width Studio Hero Header Banner attached directly to dark Navbar */}
      <div className="relative w-full pt-24 sm:pt-32 lg:pt-36 pb-14 sm:pb-20 bg-[#0B0F17] text-white overflow-hidden border-b border-neutral-800 mb-12 shadow-2xl">
        {/* Executive Photographic Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/assets/store_hero_bg.jpg')` }}
        />

        {/* Multi-layer Dark Gradient & Vignette Overlay for High Contrast Text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0D]/95 via-[#0A0A0D]/80 to-[#0A0A0D]/90 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0D]/50 via-transparent to-[#0A0A0D]" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-manrope tracking-tight leading-tight drop-shadow-md">
            Design Your Custom ai klub Smart Card
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-inter font-medium max-w-2xl mx-auto leading-relaxed drop-shadow">
            Live laser engraving engine. Customize materials, fonts, metallic foil inlays, microchips & dynamic QR code.
          </p>

          {/* Quick Presets Bar with Glassmorphic Buttons */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-2.5 text-xs font-manrope font-bold">
            <span className="text-slate-400 self-center mr-1 text-[11px] font-mono font-bold uppercase tracking-wider">Quick Presets:</span>
            <button onClick={() => applyPreset('ceo')} className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#6C4CFF] border border-white/20 text-white shadow-md transition cursor-pointer backdrop-blur-md">Executive CEO</button>
            <button onClick={() => applyPreset('tech')} className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#6C4CFF] border border-white/20 text-white shadow-md transition cursor-pointer backdrop-blur-md">Tech Founder</button>
            <button onClick={() => applyPreset('creative')} className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#6C4CFF] border border-white/20 text-white shadow-md transition cursor-pointer backdrop-blur-md">Creative Director</button>
            <button onClick={() => applyPreset('doctor')} className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#6C4CFF] border border-white/20 text-white shadow-md transition cursor-pointer backdrop-blur-md">Professional</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        {/* Main 2-Column Grid Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* LEFT: Live Interactive Card Canvas & View Controls */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-6 lg:sticky lg:top-28">
            
            {/* Live Indicator & View Mode */}
            <div className="w-full flex items-center justify-between px-2 text-xs font-mono font-bold uppercase tracking-widest text-[#8B5CF6]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6C4CFF]"></span>
                <span>REAL-TIME 3D PREVIEW</span>
              </div>
              <div className="text-slate-400 text-[11px] capitalize">
                Showing: <span className="text-white font-bold">{isFlipped ? 'Back (NFC/QR)' : 'Front (Engraving)'}</span>
              </div>
            </div>

            {/* 3D Perspective Flip Container */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full max-w-[460px] aspect-[1.586] perspective-1000 cursor-pointer select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              title="Click card to flip (Front / Back)"
            >
              <div 
                className="w-full h-full relative transform-style-3d transition-transform duration-700 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`
                }}
              >

                {/* Light Reflection Shimmer Effect */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-3xl">
                  <div className="w-[120%] h-[200%] bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-[150%] rotate-[25deg] animate-card-shimmer"></div>
                </div>

                {/* FRONT SIDE VIEW (Matching 2nd Reference Image) */}
                <div className={`absolute inset-0 w-full h-full p-4.5 sm:p-5 ${currentMat.bgClass} flex flex-col justify-between backface-hidden rounded-3xl border ${currentMat.textureBorder} shadow-2xl overflow-hidden select-none`}>
                  
                  {/* Top Header Row: 4-Pillars Corner Accent (Top Left) & NFC Signal (Top Right) */}
                  <div className="flex justify-between items-start z-10 w-full">
                    <div className="flex flex-col items-start font-mono text-[7.5px] tracking-[0.18em] leading-[1.3] uppercase font-bold text-current">
                      <span>CONNECT</span>
                      <span>COLLABORATE</span>
                      <span>CREATE</span>
                      <span>GROW</span>
                      <div className="w-5 h-[1.5px] bg-current mt-0.5 opacity-75" />
                    </div>
                    <div className="flex items-center space-x-1 font-mono text-[10px] font-black tracking-wider text-current">
                      <span>NFC</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 8a4 4 0 0 1 4 4" />
                        <path d="M12 5a7 7 0 0 1 7 7" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                    </div>
                  </div>

                  {/* Center Area: Logo / Trishul Emblem & Brand Name */}
                  <div className="flex flex-col items-center justify-center z-10 my-auto text-center">
                    {logoType === 'ak' ? (
                      <TrishulAkEmblem className="w-11 h-11 text-current drop-shadow-md" />
                    ) : (
                      renderCardLogo()
                    )}
                    <h3 className="text-xl sm:text-2xl font-black font-manrope tracking-tight mt-0.5 text-current">
                      {logoType === 'ak' ? 'Ai Klub' : (company.split(' ')[0] || 'brand')}
                    </h3>
                    <p className="text-[7.5px] font-mono tracking-[0.22em] uppercase font-bold mt-0.5 opacity-85 text-current">
                      PEOPLE | IDEAS | TECHNOLOGY
                    </p>
                  </div>

                  {/* User Laser Engraved Name & Title (Bottom Left Overlay) */}
                  <div className="z-10 max-w-[200px] sm:max-w-[240px] mb-1">
                    <h4 className={`font-black text-xs sm:text-sm tracking-tight uppercase ${currentFont.fontClass} ${currentInlay.colorClass} transition-all duration-300 leading-snug drop-shadow-md truncate`}>
                      {name || 'YOUR NAME HERE'}
                    </h4>
                    <p className="text-[9px] font-bold uppercase opacity-90 font-inter mt-0.5 truncate text-current">
                      {title || 'TITLE'} {company ? `• ${company}` : ''}
                    </p>
                  </div>

                  {/* Bottom Left Metallic Wavy Accent Lines */}
                  <div className="absolute bottom-0 left-0 pointer-events-none opacity-40 z-0">
                    <WavyAccentLines className="w-22 h-22 sm:w-24 sm:h-24 text-current" />
                  </div>

                  {/* Bottom Right Framed QR Code + TAP TO CONNECT */}
                  <div className="absolute bottom-2.5 right-3.5 flex flex-col items-center z-20">
                    <div className="p-1 bg-white rounded-lg shadow-md border border-black/10">
                      <QRCodeSVG 
                        value={`${window.location.origin}/profile/${qrHandle || 'custom-card'}`}
                        size={36}
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                    <span className="text-[6px] sm:text-[6.5px] font-mono font-bold tracking-wider mt-0.5 uppercase text-current">TAP TO CONNECT</span>
                  </div>
                </div>

                {/* BACK SIDE VIEW (Matching 3rd Reference Image) */}
                <div className={`absolute inset-0 w-full h-full p-4.5 sm:p-5 ${currentMat.bgClass} flex flex-col justify-between backface-hidden rotate-y-180 rounded-3xl border ${currentMat.textureBorder} shadow-2xl overflow-hidden select-none`}>
                  {/* Background Laser-Etched Dot Matrix World Map */}
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                    <DotMatrixWorldMap className="w-full h-full text-current" />
                  </div>

                  {/* Top Bar: Brand Logo (Top Left) & Top Right Accent */}
                  <div className="flex justify-between items-start z-10 w-full">
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-sm sm:text-base font-manrope text-current">Ai Klub</span>
                    </div>
                    <div className="text-right text-[8px] font-mono text-current opacity-85 font-bold tracking-wider">
                      MORE<br />THAN A CARD<br />A COMMUNITY
                    </div>
                  </div>

                  {/* Center Area: Brand Slogan */}
                  <div className="text-center z-10 my-auto">
                    <h3 className="text-lg sm:text-xl font-black font-manrope tracking-tight text-current drop-shadow">Ai Klub</h3>
                    <p className="text-[8.5px] sm:text-[9.5px] font-mono tracking-[0.2em] text-current opacity-90 font-bold border-b border-current/40 pb-1 inline-block">
                      A SMARTER TOMORROW TOGETHER
                    </p>
                  </div>

                  {/* Bottom Area: 5 Strategic Pillars Grid & Footer Accent */}
                  <div className="z-10 space-y-1 w-full">
                    <FivePillarsGrid className="text-current border-t border-current/40 pt-1.5" />
                    <div className="flex justify-between items-center text-[7.5px] sm:text-[8.5px] font-mono opacity-80 font-bold pt-1 text-current">
                      <span>{tagline || 'TAP . CONNECT . GROW.'}</span>
                      <span>1-TAP NFC & QR</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Action Buttons Below Card Canvas */}
            <div className="flex items-center space-x-3 w-full max-w-[460px]">
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-manrope font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.02] transition"
              >
                <RotateCw className="w-4 h-4 text-[#6C4CFF]" />
                <span>Flip Side ({isFlipped ? 'Back View' : 'Front View'})</span>
              </button>

              <button
                onClick={handleCopySpecs}
                className="py-3 px-4 rounded-2xl bg-slate-200 dark:bg-neutral-800 text-slate-800 dark:text-slate-200 font-manrope font-bold text-xs flex items-center space-x-1.5 hover:bg-slate-300 dark:hover:bg-neutral-700 transition"
                title="Copy Card Specs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Share Specs'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center max-w-sm font-inter">
              Sub-millimeter laser deep etching. Embedded NTAG216 high-frequency microchip & 100% waterproof.
            </p>
          </div>

          {/* RIGHT: Studio Controls Tabs Column */}
          <div className="lg:col-span-6 bg-white p-4 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xl space-y-6 text-slate-900">
            
            {/* Studio Navigation Tabs */}
            <div className="flex bg-slate-100/90 border border-slate-200 p-1.5 rounded-2xl space-x-1 font-manrope font-bold text-xs overflow-x-auto">
              <button
                onClick={() => setActiveTab('material')}
                className={`py-2.5 px-3.5 rounded-xl flex items-center space-x-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'material'
                    ? 'bg-white text-slate-950 shadow-md border border-slate-200/80 font-extrabold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/60 font-semibold'
                }`}
              >
                <Palette className="w-3.5 h-3.5 text-[#6C4CFF]" />
                <span>1. Material & Finish</span>
              </button>

              <button
                onClick={() => setActiveTab('engraving')}
                className={`py-2.5 px-3.5 rounded-xl flex items-center space-x-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'engraving'
                    ? 'bg-white text-slate-950 shadow-md border border-slate-200/80 font-extrabold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/60 font-semibold'
                }`}
              >
                <Type className="w-3.5 h-3.5 text-[#6C4CFF]" />
                <span>2. Front Engraving</span>
              </button>

              <button
                onClick={() => setActiveTab('backside')}
                className={`py-2.5 px-3.5 rounded-xl flex items-center space-x-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'backside'
                    ? 'bg-white text-slate-950 shadow-md border border-slate-200/80 font-extrabold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/60 font-semibold'
                }`}
              >
                <QrCode className="w-3.5 h-3.5 text-[#6C4CFF]" />
                <span>3. Back & QR</span>
              </button>

              <button
                onClick={() => setActiveTab('addons')}
                className={`py-2.5 px-3.5 rounded-xl flex items-center space-x-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'addons'
                    ? 'bg-white text-slate-950 shadow-md border border-slate-200/80 font-extrabold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/60 font-semibold'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-[#6C4CFF]" />
                <span>4. Extras</span>
              </button>
            </div>

            {/* TAB 1: Material & Finish Options */}
            {activeTab === 'material' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-extrabold text-slate-900 uppercase tracking-widest font-mono">
                      Select Card Material & Texture
                    </label>
                    <span className="text-xs text-[#6C4CFF] font-extrabold font-mono">
                      Selected: {currentMat.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {materials.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMaterial(m.id)}
                        className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                          material === m.id
                            ? 'border-[#6C4CFF] ring-2 ring-[#6C4CFF]/20 bg-[#6C4CFF]/5 text-slate-950 shadow-md'
                            : 'border-slate-200 bg-slate-50/80 text-slate-800 hover:border-slate-400 hover:bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-1 w-full mb-1">
                          <span className="text-[11px] font-mono font-extrabold text-[#6C4CFF]">₹{m.price}</span>
                          {m.badge && (
                            <span className="text-[8px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 shrink-0">
                              {m.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-extrabold block font-manrope text-slate-950 leading-snug">{m.name}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-2.5 italic font-inter font-medium">
                    {currentMat.desc}
                  </p>
                </div>

                {/* Laser Inlay Options */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-widest font-mono mb-3">
                    Laser Engraving Inlay Finish
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {inlays.map((inl) => (
                      <button
                        key={inl.id}
                        onClick={() => setInlayColor(inl.id)}
                        className={`p-2.5 rounded-xl border flex items-center space-x-2 text-xs font-bold font-manrope transition cursor-pointer ${
                          inlayColor === inl.id
                            ? 'border-[#6C4CFF] bg-[#6C4CFF]/10 text-slate-950 shadow-sm'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-white'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs ${inl.dotBg}`}></span>
                        <span className="text-slate-950 font-extrabold">{inl.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Microchip Finish */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-widest font-mono mb-3">
                    NFC Microchip Metal Electroplate
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {chips.map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => setChipFinish(ch.id)}
                        className={`p-2.5 rounded-xl border text-xs font-extrabold font-manrope transition cursor-pointer ${
                          chipFinish === ch.id
                            ? 'border-[#6C4CFF] bg-[#6C4CFF]/10 text-slate-950 shadow-sm'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-white'
                        }`}
                      >
                        {ch.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Front Engraving & Typography */}
            {activeTab === 'engraving' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-widest font-mono mb-2">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    maxLength={26}
                    value={name}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                    placeholder="E.G. ALEXANDER VANCE"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 font-extrabold tracking-wider uppercase text-sm focus:outline-none focus:bg-white focus:border-[#6C4CFF] focus:ring-2 focus:ring-[#6C4CFF]/20 transition shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-widest font-mono mb-2">
                      Job Designation
                    </label>
                    <input
                      type="text"
                      maxLength={30}
                      value={title}
                      onChange={(e) => setTitle(e.target.value.toUpperCase())}
                      placeholder="CHIEF EXECUTIVE OFFICER"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-xs font-inter font-bold focus:outline-none focus:bg-white focus:border-[#6C4CFF] focus:ring-2 focus:ring-[#6C4CFF]/20 transition shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-widest font-mono mb-2">
                      Company / Brand Name
                    </label>
                    <input
                      type="text"
                      maxLength={30}
                      value={company}
                      onChange={(e) => setCompany(e.target.value.toUpperCase())}
                      placeholder="NEURAL DYNAMICS"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-xs font-inter font-bold focus:outline-none focus:bg-white focus:border-[#6C4CFF] focus:ring-2 focus:ring-[#6C4CFF]/20 transition shadow-xs"
                    />
                  </div>
                </div>

                {/* Font Typography Selector */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-widest font-mono mb-3">
                    Laser Engraving Font Style
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {fonts.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFontStyle(f.id)}
                        className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition cursor-pointer ${
                          fontStyle === f.id
                            ? 'border-[#6C4CFF] bg-[#6C4CFF]/10 text-slate-950 font-extrabold shadow-sm'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-white'
                        }`}
                      >
                        <span className={`text-xl mb-1 text-slate-950 ${f.fontClass}`}>{f.sample}</span>
                        <span className="text-[11px] font-manrope font-extrabold text-slate-900">{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logo & Symbol Selector */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-extrabold text-slate-900 uppercase tracking-widest font-mono">
                      Card Logo / Symbol Inlay
                    </label>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-[#6C4CFF] font-extrabold flex items-center space-x-1 hover:underline cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Custom Logo</span>
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleLogoUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {presetIcons.map((ic) => (
                      <button
                        key={ic.id}
                        onClick={() => setLogoType(ic.id)}
                        className={`p-2.5 rounded-xl border flex items-center justify-center transition cursor-pointer ${
                          logoType === ic.id
                            ? 'border-[#6C4CFF] bg-[#6C4CFF]/15 text-[#6C4CFF] font-extrabold shadow-sm'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-950 hover:border-slate-400 hover:bg-white'
                        }`}
                        title={ic.label}
                      >
                        {ic.id === 'ak' ? (
                          <span className="font-extrabold text-xs font-manrope text-slate-950">ak</span>
                        ) : (
                          React.createElement(ic.icon, { className: "w-4 h-4" })
                        )}
                      </button>
                    ))}
                  </div>
                  {customLogoUrl && logoType === 'custom' && (
                    <div className="mt-2 flex items-center space-x-2 text-xs text-emerald-600 font-mono font-bold">
                      <Check className="w-4 h-4" />
                      <span>Custom uploaded logo selected</span>
                      <button onClick={() => { setCustomLogoUrl(null); setLogoType('ak'); }} className="text-rose-600 ml-2 hover:underline cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5 inline" /> Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: Back & QR Customization */}
            {activeTab === 'backside' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-widest font-mono mb-2">
                    QR Code Placement
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'bottom-right', label: 'Bottom Right' },
                      { id: 'bottom-center', label: 'Bottom Center' },
                      { id: 'top-right', label: 'Top Right' },
                      { id: 'center', label: 'Full Center' }
                    ].map((pos) => (
                      <button
                        key={pos.id}
                        onClick={() => { setQrPosition(pos.id); setIsFlipped(true); }}
                        className={`p-2.5 rounded-xl text-xs font-extrabold border font-manrope capitalize cursor-pointer ${
                          qrPosition === pos.id
                            ? 'bg-[#6C4CFF] text-white border-transparent shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-400 hover:bg-white'
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-widest font-mono mb-2">
                    Back Card Tagline
                  </label>
                  <input
                    type="text"
                    maxLength={36}
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 font-mono text-xs font-bold focus:outline-none focus:bg-white focus:border-[#6C4CFF] focus:ring-2 focus:ring-[#6C4CFF]/20"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: Extras & Add-ons */}
            {activeTab === 'addons' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-widest font-mono mb-1">
                  Enhance Your Card Package
                </label>

                {addonOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => toggleAddon(opt.id)}
                    className={`p-4 rounded-2xl border flex items-start justify-between cursor-pointer transition ${
                      addons.includes(opt.id)
                        ? 'border-[#6C4CFF] bg-[#6C4CFF]/10 text-slate-950 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-400 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={addons.includes(opt.id)}
                        onChange={() => {}}
                        className="mt-1 rounded text-[#6C4CFF] focus:ring-[#6C4CFF]"
                      />
                      <div>
                        <h4 className="text-xs font-extrabold font-manrope text-slate-950">{opt.name}</h4>
                        <p className="text-[11px] text-slate-600 mt-0.5 font-inter font-medium">{opt.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-extrabold text-[#6C4CFF] whitespace-nowrap ml-2">
                      +₹{opt.price}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Total Price Summary & Checkout Action */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[11px] text-slate-600 font-mono font-bold uppercase tracking-wider block">
                    TOTAL CARD INVESTMENT
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-950 font-manrope tracking-tight">
                    ₹{totalPrice}
                  </span>
                  <span className="text-xs text-slate-400 line-through ml-2 font-mono">
                    ₹{totalPrice + 1000}
                  </span>
                </div>
                <div className="text-right text-[11px] text-emerald-600 font-mono font-extrabold">
                  ✓ Free Shipping Across India
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-2xl bg-[#00DC82] hover:bg-[#00c975] text-slate-950 font-extrabold text-sm sm:text-base font-manrope uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl hover:scale-[1.01] transition cursor-pointer"
                >
                  {added ? <Check className="w-5 h-5 text-slate-950" /> : <ShoppingBag className="w-5 h-5 text-slate-950" />}
                  <span className="text-slate-950">
                    {added ? 'Added to Cart!' : `Add Custom Card to Order (₹${totalPrice})`}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-600 font-inter font-semibold">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Lifetime Chip Warranty</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Sub-Millimeter Precision</span>
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Toast Notification Container */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="fixed bottom-20 right-8 z-50 bg-[#090909]/95 text-white border border-[#6C4CFF]/50 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center space-x-2.5 font-manrope text-sm font-bold"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>{toastMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. HOW IT WORKS */}
        <div className="mt-28 border-t border-slate-200 pt-20">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#6C4CFF]/10 border border-[#6C4CFF]/20 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider">
              Seamless 3-Step Networking
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-manrope tracking-tight">
              How it Works
            </h2>
            <p className="text-base text-slate-600 font-inter font-medium leading-relaxed max-w-xl mx-auto">
              Simple 3-step process to transform your physical business card into a dynamic smart networking asset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Step 1 */}
            <div className="space-y-6 flex flex-col items-center group">
              <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-[#F1F5F9] via-[#F8FAFC] to-white border-2 border-purple-500/30 p-2 flex items-center justify-center shadow-xl group-hover:scale-105 group-hover:border-purple-500 transition-all duration-300 relative overflow-hidden">
                <img 
                  src="/assets/smart_nfc_card_step.jpg" 
                  alt="Smart NFC Card" 
                  className="w-full h-full object-cover rounded-full filter brightness-105 transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="space-y-3 max-w-sm">
                <h3 className="text-2xl font-extrabold text-slate-900 font-manrope">Smart NFC Card</h3>
                <p className="text-sm text-slate-600 font-inter leading-relaxed">
                  Design your NFC card with our design tool or send us your details so we will design your card using your logo and industry. We will send preview for your approval before printing.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-6 flex flex-col items-center group">
              <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-[#F1F5F9] via-[#F8FAFC] to-white border-2 border-blue-500/30 p-2 flex items-center justify-center shadow-xl group-hover:scale-105 group-hover:border-blue-500 transition-all duration-300 relative overflow-hidden">
                <img 
                  src="/assets/online_profile_step.jpg" 
                  alt="Your Online Profile" 
                  className="w-full h-full object-cover rounded-full filter brightness-105 transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="space-y-3 max-w-sm">
                <h3 className="text-2xl font-extrabold text-slate-900 font-manrope">Your Online Profile</h3>
                <p className="text-sm text-slate-600 font-inter leading-relaxed">
                  Our platform generates free online profile/website associated with your NFC card. You can alter and update the content at any time by utilizing your ai klub dashboard.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-6 flex flex-col items-center group">
              <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-[#ECFDF5] via-[#F8FAFC] to-white border-2 border-emerald-500/30 p-2 flex items-center justify-center shadow-xl group-hover:scale-105 group-hover:border-emerald-500 transition-all duration-300 relative overflow-hidden">
                <img 
                  src="/assets/tap_share_save_step.jpg" 
                  alt="Tap, Share & Save" 
                  className="w-full h-full object-cover rounded-full filter brightness-105 transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="space-y-3 max-w-sm">
                <h3 className="text-2xl font-extrabold text-slate-900 font-manrope">Tap, Share & Save</h3>
                <p className="text-sm text-slate-600 font-inter leading-relaxed">
                  Share business profile and contact info easily by tapping card on devices. No app needed, saves time and makes connection seamless.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SIMILAR PRODUCTS CAROUSEL / GRID */}
        <div className="mt-28 border-t border-slate-200 pt-20">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-manrope tracking-tight">
                Similar Products
              </h2>
              <p className="text-xs text-slate-600 font-inter mt-1">Explore top recommended smart NFC hardware options.</p>
            </div>
            <Link to="/store" className="text-sm font-extrabold text-red-600 hover:text-red-700 flex items-center space-x-1 transition font-manrope bg-red-50 px-4 py-2 rounded-full border border-red-200">
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((prod) => (
              <div key={prod.id} className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md hover:shadow-xl hover:border-[#6C4CFF]/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                <div>
                  {/* Top Image Preview Container */}
                  <div className="relative h-56 bg-slate-50 p-4 pt-6 flex items-center justify-center overflow-hidden border-b border-slate-200">
                    <span className="absolute top-3 right-3 z-30 bg-red-600 text-white font-black font-mono text-[10px] uppercase px-2.5 py-1 rounded-md shadow-md tracking-wider">
                      Sale
                    </span>

                    {/* Card Visual Render */}
                    <div className="w-full scale-95 transition-transform duration-300 group-hover:scale-100">
                      {prod.visualType === 'gold_metal' ? (
                        <GoldMetalCardVisual name={prod.name} />
                      ) : prod.visualType === 'silver_metal' ? (
                        <SilverMetalCardVisual name={prod.name} />
                      ) : (
                        <BlackMetalCardVisual name={prod.name} />
                      )}
                    </div>
                  </div>

                  {/* Details Container */}
                  <div className="p-6 space-y-3">
                    <h4 className="font-extrabold text-base text-slate-900 font-manrope line-clamp-2 leading-snug group-hover:text-[#6C4CFF] transition">
                      {prod.name}
                    </h4>
                    
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200">
                        {prod.weight}
                      </span>
                    </div>

                    <div className="flex items-baseline space-x-2 pt-1 font-manrope">
                      <span className="text-xl font-black text-red-600 font-manrope">₹{prod.price.toLocaleString()}.00</span>
                      <span className="text-xs text-slate-400 font-mono line-through">₹{prod.original_price.toLocaleString()}.00</span>
                    </div>
                  </div>
                </div>

                {/* Quick Add to Cart Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleAddToCartSimilar(prod)}
                    className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-[#6C4CFF] text-white font-bold text-xs font-manrope transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. YOU HAVE QUESTION ? WE HAVE ANSWERS! */}
        <div className="mt-28 border-t border-slate-200 pt-20">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-manrope tracking-tight">
              You have question ? We have answers!
            </h2>
            <p className="text-sm text-slate-600 font-inter font-medium">Clear answers to help you pick and design your custom smart card.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 font-inter">
            {designerFaqs.map((faq, fIdx) => {
              const isOpen = openDesignerFaq === fIdx;
              return (
                <div key={fIdx} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-all duration-200">
                  <button
                    onClick={() => setOpenDesignerFaq(isOpen ? null : fIdx)}
                    className="w-full p-6 text-left flex justify-between items-center text-slate-900 font-bold text-base sm:text-lg font-manrope focus:outline-none hover:text-red-600 transition-colors cursor-pointer group"
                  >
                    <span className="pr-4 leading-snug">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="w-8 h-8 rounded-full border-2 border-red-500 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-50"
                    >
                      <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-200 pt-4 font-inter font-medium">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
