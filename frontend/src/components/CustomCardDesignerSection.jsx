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
import { BlackMetalCardVisual, GoldMetalCardVisual, SilverMetalCardVisual } from './ProductVisuals';

export const CustomCardDesignerSection = () => {
  // Main Card Details State
  const [name, setName] = useState('ALEXANDER VANCE');
  const [title, setTitle] = useState('CHIEF EXECUTIVE OFFICER');
  const [company, setCompany] = useState('NEURAL DYNAMICS INC.');
  
  // Customization Options State
  const [material, setMaterial] = useState('black_metal');
  const [fontStyle, setFontStyle] = useState('manrope');
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
      name: 'aikulb Metal NFC Business Card – Black with Silver Laser Engraving',
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
      name: 'aikulb Metal NFC Business Card - Gold Laser Engraving',
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
      q: 'What is the aikulb Business Card and how does it work?',
      a: 'An aikulb Business Card is a smart business card embedded with an NTAG216 NFC chip and dynamic QR code. Tapping it against a smartphone instantly transfers your complete contact profile, social links, portfolio, and VCF contact card to the recipient phone.'
    },
    {
      q: 'Is the aikulb business card compatible with non-nfc smartphones?',
      a: 'Yes! Every aikulb card includes a high-definition dynamic QR code printed on the back. Older or non-NFC smartphones can simply scan the QR code with their camera to instantly view your profile.'
    },
    {
      q: 'Is it compatible with Android or iOS phones?',
      a: 'Yes, 100% compatible! It works seamlessly with iPhones (iPhone XS and newer) and all NFC-enabled Android devices from Samsung, Google, OnePlus, Xiaomi, and Vivo.'
    },
    {
      q: 'Where can I tap the aikulb Card on an iPhone?',
      a: 'For iPhones (iPhone XS, 11, 12, 13, 14, 15, 16), tap the top edge of the card against the very top edge of the back of the iPhone near the camera module.'
    },
    {
      q: 'What are the benefits of the smart business card and aikulb Digital card?',
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
      id: 'black_metal',
      name: 'Matte Black Metal',
      price: 1999,
      badge: 'Bestseller',
      bgClass: 'bg-metallic-black',
      glowColor: 'rgba(108, 76, 255, 0.3)',
      desc: 'Aerospace Grade Stainless Steel with Matte Obsidian Finish',
      textureBorder: 'border-neutral-700/60'
    },
    {
      id: 'gold_metal',
      name: '24K Mirror Gold',
      price: 2499,
      badge: 'Ultra Luxury',
      bgClass: 'bg-metallic-gold',
      glowColor: 'rgba(255, 215, 0, 0.4)',
      desc: 'Polished 24K Gold Mirror Electroplate Finish',
      textureBorder: 'border-yellow-500/50'
    },
    {
      id: 'silver_metal',
      name: 'Brushed Steel Silver',
      price: 1999,
      badge: 'Executive',
      bgClass: 'bg-metallic-silver',
      glowColor: 'rgba(226, 232, 240, 0.4)',
      desc: 'Brushed Metallic Silver Steel with Micro-grain Finish',
      textureBorder: 'border-slate-400/50'
    },
    {
      id: 'rosegold_metal',
      name: 'Rose Gold Edition',
      price: 2299,
      badge: 'Premium',
      bgClass: 'bg-metallic-rosegold',
      glowColor: 'rgba(232, 180, 184, 0.4)',
      desc: 'Anodized Warm Copper & Rose Gold Metallic Alloy',
      textureBorder: 'border-rose-400/50'
    },
    {
      id: 'emerald_metal',
      name: 'Stealth Emerald',
      price: 2199,
      badge: 'Limited',
      bgClass: 'bg-metallic-emerald',
      glowColor: 'rgba(13, 59, 46, 0.5)',
      desc: 'Deep Metallic Emerald Green Anodized Titanium Steel',
      textureBorder: 'border-emerald-700/50'
    },
    {
      id: 'walnut_wood',
      name: 'Organic Walnut Wood',
      price: 1499,
      badge: 'Eco Friendly',
      bgClass: 'bg-organic-wood',
      glowColor: 'rgba(90, 58, 41, 0.4)',
      desc: 'Sustainably Sourced Natural American Dark Walnut Wood',
      textureBorder: 'border-amber-900/50'
    }
  ];

  // Font Styles Dataset
  const fonts = [
    { id: 'manrope', name: 'Manrope Sans', fontClass: 'font-manrope', sample: 'Aa' },
    { id: 'playfair', name: 'Luxury Serif', fontClass: 'font-playfair', sample: 'Aa' },
    { id: 'spacemono', name: 'Tech Mono', fontClass: 'font-spacemono', sample: 'Aa' },
    { id: 'script', name: 'Signature Script', fontClass: 'font-script', sample: 'Aa' }
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

  // Add Custom Card to Cart
  const handleAddToCart = () => {
    const customProduct = {
      id: `custom-card-${material}-${Date.now()}`,
      name: `Custom aikulb ${currentMat.name}`,
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
        qrUrl: `https://aikulb.com/p/${qrHandle}`,
        qrPosition,
        addons: addons.map(id => addonOptions.find(a => a.id === id)?.name)
      }
    };

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
    const specsText = `aikulb Card Specs:\n- Name: ${name}\n- Title: ${title}\n- Company: ${company}\n- Material: ${currentMat.name}\n- Font: ${currentFont.name}\n- Inlay: ${currentInlay.name}\n- Chip: ${currentChip.name}\n- QR URL: https://aikulb.com/p/${qrHandle}\n- Price: ₹${totalPrice}`;
    navigator.clipboard.writeText(specsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Render Card Logo Component
  const renderCardLogo = () => {
    if (logoType === 'custom' && customLogoUrl) {
      return <img src={customLogoUrl} alt="Custom Logo" className="w-7 h-7 object-contain rounded" />;
    }
    const iconObj = presetIcons.find(i => i.id === logoType);
    if (iconObj && iconObj.icon) {
      const IconComponent = iconObj.icon;
      return <IconComponent className="w-6 h-6 text-current" />;
    }
    return (
      <div className="w-7 h-7 rounded-lg aikulb-gradient-bg flex items-center justify-center font-black text-white text-xs font-manrope shadow">
        ak
      </div>
    );
  };

  return (
    <section id="customizer" className="py-20 bg-[#F8F9FA] text-slate-900 border-t border-slate-200 relative transition-colors duration-300 overflow-hidden">
      {/* Background Dynamic Ambient Glow reflecting current material */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[140px] opacity-15 pointer-events-none transition-all duration-700"
        style={{ background: currentMat.glowColor }}
      ></div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Studio Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#6C4CFF]/10 border border-[#6C4CFF]/20 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Interactive Hardware Studio 3.0</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-manrope tracking-tight">
            Design Your Custom aikulb Smart Card
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-inter font-medium">
            Live laser engraving engine. Customize materials, fonts, metallic foil inlays, microchips & dynamic QR code.
          </p>

          {/* Quick Presets Bar */}
          <div className="pt-3 flex flex-wrap justify-center gap-2 text-xs font-manrope font-bold">
            <span className="text-slate-500 self-center mr-1 text-[11px] uppercase tracking-wider">Quick Presets:</span>
            <button onClick={() => applyPreset('ceo')} className="px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-slate-800 hover:bg-[#6C4CFF] hover:text-white shadow-sm transition">Executive CEO</button>
            <button onClick={() => applyPreset('tech')} className="px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-slate-800 hover:bg-[#6C4CFF] hover:text-white shadow-sm transition">Tech Founder</button>
            <button onClick={() => applyPreset('creative')} className="px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-slate-800 hover:bg-[#6C4CFF] hover:text-white shadow-sm transition">Creative Director</button>
            <button onClick={() => applyPreset('doctor')} className="px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-slate-800 hover:bg-[#6C4CFF] hover:text-white shadow-sm transition">Professional</button>
          </div>
        </div>

        {/* Main 2-Column Grid Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* LEFT: Live Interactive Card Canvas & View Controls */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-6 lg:sticky lg:top-28">
            
            {/* Live Indicator & View Mode */}
            <div className="w-full flex items-center justify-between px-2 text-xs font-mono font-bold uppercase tracking-widest text-[#8B5CF6]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6C4CFF] animate-ping"></span>
                <span>REAL-TIME 3D PREVIEW</span>
              </div>
              <div className="text-slate-400 text-[11px] capitalize">
                Showing: <span className="text-white font-bold">{isFlipped ? 'Back (NFC/QR)' : 'Front (Engraving)'}</span>
              </div>
            </div>

            {/* 3D Perspective Flip Container */}
            <div 
              className="w-full max-w-[460px] aspect-[1.586] perspective-1000 cursor-grab active:cursor-grabbing"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className="w-full h-full relative transform-style-3d transition-transform duration-700 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden"
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`
                }}
              >

                {/* Light Reflection Shimmer Effect */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-3xl">
                  <div className="w-[120%] h-[200%] bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-[150%] rotate-[25deg] animate-card-shimmer"></div>
                </div>

                {/* FRONT SIDE VIEW */}
                <div className={`absolute inset-0 w-full h-full p-6 ${currentMat.bgClass} flex flex-col justify-between backface-hidden rounded-3xl border ${currentMat.textureBorder}`}>
                  
                  {/* Top Header Row: Logo & Material Label */}
                  <div className="flex justify-between items-center z-10">
                    <div className="flex items-center space-x-2 text-white">
                      {renderCardLogo()}
                      <span className="font-extrabold text-white text-base tracking-tight font-manrope lowercase">
                        {logoType === 'ak' ? 'aikulb' : (company.split(' ')[0] || 'brand')}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/80 border border-white/25 px-2.5 py-0.5 rounded-full backdrop-blur-sm bg-black/20">
                      {currentMat.name}
                    </span>
                  </div>

                  {/* Middle Row: Microchip Visual & NFC Signal */}
                  <div className="my-2 z-10 flex items-center justify-between">
                    {/* Dynamic Microchip */}
                    <svg className="w-11 h-9 shadow-lg" viewBox="0 0 40 32" fill="none">
                      <rect width="40" height="32" rx="5" fill="url(#chip-dynamic-grad)" stroke="#D4AF37" strokeWidth="1" />
                      <path d="M0 10H14V22H0" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
                      <path d="M40 10H26V22H40" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
                      <path d="M14 0V32" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
                      <path d="M26 0V32" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
                      <rect x="15" y="11" width="10" height="10" rx="2" fill="#E6CA65" />
                      <defs>
                        <linearGradient id="chip-dynamic-grad" x1="0" y1="0" x2="40" y2="32" gradientUnits="userSpaceOnUse">
                          <stop stopColor={currentChip.chipGrad[0]} />
                          <stop offset="0.5" stopColor={currentChip.chipGrad[1]} />
                          <stop offset="1" stopColor={currentChip.chipGrad[2]} />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="flex items-center space-x-1.5 text-white/90 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                      <Zap className="w-3.5 h-3.5 text-[#22D3EE] animate-pulse" />
                      <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-300">NTAG216 NFC</span>
                    </div>
                  </div>

                  {/* Bottom Laser Engraving Area */}
                  <div className="border-t border-white/20 pt-3 z-10 space-y-0.5">
                    <h3 className={`font-extrabold text-lg sm:text-xl tracking-wider uppercase ${currentFont.fontClass} ${currentInlay.colorClass} transition-all duration-300`}>
                      {name || 'YOUR NAME HERE'}
                    </h3>
                    <p className={`text-xs font-medium tracking-wide uppercase text-white/90 font-inter`}>
                      {title || 'TITLE'} • {company || 'COMPANY'}
                    </p>
                  </div>
                </div>

                {/* BACK SIDE VIEW (Flipped 180deg) */}
                <div className={`absolute inset-0 w-full h-full p-6 ${currentMat.bgClass} flex flex-col justify-between backface-hidden rotate-y-180 rounded-3xl border ${currentMat.textureBorder}`}>
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/80 uppercase tracking-widest font-bold">
                    <span>aikulb DYNAMIC PASS</span>
                    <span className="text-cyan-300">SCAN / TAP PHONE</span>
                  </div>

                  {/* Center QR Code Container */}
                  <div className={`w-full flex-1 flex ${qrPosition === 'center' ? 'items-center justify-center' : qrPosition === 'top-right' ? 'items-start justify-end' : qrPosition === 'bottom-center' ? 'items-end justify-center' : 'items-end justify-end'} my-2`}>
                    <div className="p-3 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col items-center">
                      <QRCodeSVG 
                        value={`https://aikulb.com/p/${qrHandle.toLowerCase().replace(/\s+/g, '-')}`}
                        size={88}
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                  </div>

                  {/* Tagline Footer */}
                  <div className="text-center text-[10px] font-mono text-white/90 uppercase tracking-wider font-bold border-t border-white/15 pt-2">
                    {tagline}
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
          <div className="lg:col-span-6 bg-[#0E0E12] p-6 sm:p-8 rounded-3xl border border-neutral-800 shadow-xl space-y-6 text-white">
            
            {/* Studio Navigation Tabs */}
            <div className="flex border-b border-neutral-800 pb-2 space-x-2 font-manrope font-bold text-xs overflow-x-auto">
              <button
                onClick={() => setActiveTab('material')}
                className={`pb-2 px-3 flex items-center space-x-1.5 border-b-2 transition whitespace-nowrap ${
                  activeTab === 'material'
                    ? 'border-[#6C4CFF] text-[#6C4CFF]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>1. Material & Finish</span>
              </button>

              <button
                onClick={() => setActiveTab('engraving')}
                className={`pb-2 px-3 flex items-center space-x-1.5 border-b-2 transition whitespace-nowrap ${
                  activeTab === 'engraving'
                    ? 'border-[#6C4CFF] text-[#6C4CFF]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>2. Front Engraving</span>
              </button>

              <button
                onClick={() => setActiveTab('backside')}
                className={`pb-2 px-3 flex items-center space-x-1.5 border-b-2 transition whitespace-nowrap ${
                  activeTab === 'backside'
                    ? 'border-[#6C4CFF] text-[#6C4CFF]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>3. Back & QR</span>
              </button>

              <button
                onClick={() => setActiveTab('addons')}
                className={`pb-2 px-3 flex items-center space-x-1.5 border-b-2 transition whitespace-nowrap ${
                  activeTab === 'addons'
                    ? 'border-[#6C4CFF] text-[#6C4CFF]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>4. Extras</span>
              </button>
            </div>

            {/* TAB 1: Material & Finish Options */}
            {activeTab === 'material' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                      Select Card Material & Texture
                    </label>
                    <span className="text-xs text-[#6C4CFF] font-bold font-mono">
                      Selected: {currentMat.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {materials.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMaterial(m.id)}
                        className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 relative overflow-hidden ${
                          material === m.id
                            ? 'border-[#6C4CFF] ring-2 ring-[#6C4CFF]/30 bg-[#6C4CFF]/20 text-white shadow-md'
                            : 'border-neutral-800 bg-[#14141A] text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {m.badge && (
                          <span className="absolute top-2 right-2 text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-black/40 text-[#6C4CFF]">
                            {m.badge}
                          </span>
                        )}
                        <div className="space-y-1 mt-1">
                          <span className="text-xs font-bold block font-manrope">{m.name}</span>
                          <span className="text-[11px] font-mono font-bold text-[#6C4CFF]">₹{m.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 italic font-inter">
                    {currentMat.desc}
                  </p>
                </div>

                {/* Laser Inlay Options */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest font-mono mb-3">
                    Laser Engraving Inlay Finish
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {inlays.map((inl) => (
                      <button
                        key={inl.id}
                        onClick={() => setInlayColor(inl.id)}
                        className={`p-2.5 rounded-xl border flex items-center space-x-2 text-xs font-bold font-manrope transition ${
                          inlayColor === inl.id
                            ? 'border-[#6C4CFF] bg-[#6C4CFF]/20 text-white'
                            : 'border-neutral-800 bg-[#14141A] text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full border border-black/20 ${inl.dotBg}`}></span>
                        <span>{inl.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Microchip Finish */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest font-mono mb-3">
                    NFC Microchip Metal Electroplate
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {chips.map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => setChipFinish(ch.id)}
                        className={`p-2.5 rounded-xl border text-xs font-bold font-manrope transition ${
                          chipFinish === ch.id
                            ? 'border-[#6C4CFF] bg-[#6C4CFF]/20 text-white'
                            : 'border-neutral-800 bg-[#14141A] text-slate-300 hover:border-slate-500'
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
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest font-mono mb-2">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    maxLength={26}
                    value={name}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                    placeholder="E.G. ALEXANDER VANCE"
                    className="w-full px-4 py-3 rounded-2xl bg-[#14141A] border border-neutral-700 text-white font-bold tracking-wider uppercase text-sm focus:outline-none focus:border-[#6C4CFF] focus:ring-1 focus:ring-[#6C4CFF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest font-mono mb-2">
                      Job Designation
                    </label>
                    <input
                      type="text"
                      maxLength={30}
                      value={title}
                      onChange={(e) => setTitle(e.target.value.toUpperCase())}
                      placeholder="CHIEF EXECUTIVE OFFICER"
                      className="w-full px-4 py-3 rounded-2xl bg-[#14141A] border border-neutral-700 text-white text-xs font-inter font-medium focus:outline-none focus:border-[#6C4CFF] focus:ring-1 focus:ring-[#6C4CFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest font-mono mb-2">
                      Company / Brand Name
                    </label>
                    <input
                      type="text"
                      maxLength={30}
                      value={company}
                      onChange={(e) => setCompany(e.target.value.toUpperCase())}
                      placeholder="NEURAL DYNAMICS"
                      className="w-full px-4 py-3 rounded-2xl bg-[#14141A] border border-neutral-700 text-white text-xs font-inter font-medium focus:outline-none focus:border-[#6C4CFF] focus:ring-1 focus:ring-[#6C4CFF]"
                    />
                  </div>
                </div>

                {/* Font Typography Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest font-mono mb-3">
                    Laser Engraving Font Style
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {fonts.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFontStyle(f.id)}
                        className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition ${
                          fontStyle === f.id
                            ? 'border-[#6C4CFF] bg-[#6C4CFF]/20 text-white font-bold'
                            : 'border-neutral-800 bg-[#14141A] text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <span className={`text-xl mb-1 ${f.fontClass}`}>{f.sample}</span>
                        <span className="text-[11px] font-manrope">{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logo & Symbol Selector */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                      Card Logo / Symbol Inlay
                    </label>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-[#6C4CFF] font-bold flex items-center space-x-1 hover:underline"
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
                        className={`p-2.5 rounded-xl border flex items-center justify-center transition ${
                          logoType === ic.id
                            ? 'border-[#6C4CFF] bg-[#6C4CFF]/20 text-[#8B5CF6]'
                            : 'border-neutral-800 bg-[#14141A] text-slate-400 hover:text-white hover:border-neutral-600'
                        }`}
                        title={ic.label}
                      >
                        {ic.id === 'ak' ? (
                          <span className="font-extrabold text-xs font-manrope">ak</span>
                        ) : (
                          React.createElement(ic.icon, { className: "w-4 h-4" })
                        )}
                      </button>
                    ))}
                  </div>
                  {customLogoUrl && logoType === 'custom' && (
                    <div className="mt-2 flex items-center space-x-2 text-xs text-emerald-400 font-mono">
                      <Check className="w-4 h-4" />
                      <span>Custom uploaded logo selected</span>
                      <button onClick={() => { setCustomLogoUrl(null); setLogoType('ak'); }} className="text-rose-400 ml-2 hover:underline">
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
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest font-mono mb-2">
                    Dynamic Digital Profile Handle / URL
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-3 rounded-l-2xl bg-neutral-800 text-slate-300 text-xs font-mono border border-r-0 border-neutral-700">
                      aikulb.com/p/
                    </span>
                    <input
                      type="text"
                      value={qrHandle}
                      onChange={(e) => setQrHandle(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                      className="w-full px-4 py-3 rounded-r-2xl bg-[#14141A] border border-neutral-700 text-white font-mono text-xs focus:outline-none focus:border-[#6C4CFF] focus:ring-1 focus:ring-[#6C4CFF]"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5 font-inter">
                    Tapping the NFC chip or scanning the QR code redirects straight to this profile.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest font-mono mb-2">
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
                        className={`p-2.5 rounded-xl text-xs font-bold border font-manrope capitalize ${
                          qrPosition === pos.id
                            ? 'bg-[#6C4CFF] text-white border-transparent'
                            : 'bg-[#14141A] border-neutral-800 text-slate-300 hover:border-neutral-600'
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest font-mono mb-2">
                    Back Card Tagline
                  </label>
                  <input
                    type="text"
                    maxLength={36}
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 rounded-2xl bg-[#14141A] border border-neutral-700 text-white font-mono text-xs focus:outline-none focus:border-[#6C4CFF] focus:ring-1 focus:ring-[#6C4CFF]"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: Extras & Add-ons */}
            {activeTab === 'addons' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest font-mono mb-1">
                  Enhance Your Card Package
                </label>

                {addonOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => toggleAddon(opt.id)}
                    className={`p-4 rounded-2xl border flex items-start justify-between cursor-pointer transition ${
                      addons.includes(opt.id)
                        ? 'border-[#6C4CFF] bg-[#6C4CFF]/20 text-white'
                        : 'border-neutral-800 bg-[#14141A] text-slate-300 hover:border-slate-600'
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
                        <h4 className="text-xs font-bold font-manrope">{opt.name}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-inter">{opt.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#6C4CFF] whitespace-nowrap ml-2">
                      +₹{opt.price}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Total Price Summary & Checkout Action */}
            <div className="pt-6 border-t border-neutral-800 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[11px] text-slate-400 font-mono font-bold uppercase tracking-wider block">
                    Total Card Investment
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-white font-manrope tracking-tight">
                    ₹{totalPrice}
                  </span>
                  <span className="text-xs text-slate-400 line-through ml-2 font-mono">
                    ₹{totalPrice + 1000}
                  </span>
                </div>
                <div className="text-right text-[11px] text-emerald-400 font-mono font-bold">
                  ✓ Free Shipping Across India
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="btn-pill-gradient flex-1 py-4 flex items-center justify-center space-x-2 shadow-xl hover:scale-[1.01] transition"
                >
                  {added ? <Check className="w-5 h-5 text-emerald-300" /> : <ShoppingBag className="w-5 h-5" />}
                  <span className="text-sm tracking-wide">
                    {added ? 'Added to Cart!' : `Add Custom Card to Order (₹${totalPrice})`}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-400 font-inter">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lifetime Chip Warranty</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
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
              <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-[#F1F5F9] via-[#F8FAFC] to-white border-2 border-purple-500/30 p-5 flex items-center justify-center shadow-xl group-hover:scale-105 group-hover:border-purple-500 transition-all duration-300 relative overflow-hidden">
                <div className="w-40 h-24 bg-slate-900 rounded-2xl border border-slate-700 p-3 shadow-2xl flex flex-col justify-between items-start text-left">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-5 h-5 rounded bg-gradient-to-tr from-[#6C4CFF] to-[#3B82F6] text-[9px] font-black flex items-center justify-center text-white">ak</div>
                    <span className="text-[10px] font-extrabold text-white font-manrope lowercase">aikulb</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[8px] text-cyan-300 font-mono font-bold bg-black/40 px-2 py-0.5 rounded border border-cyan-500/30">
                    <Zap className="w-2.5 h-2.5 text-cyan-400" />
                    <span>NTAG216 CHIP</span>
                  </div>
                </div>
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
              <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-[#F1F5F9] via-[#F8FAFC] to-white border-2 border-blue-500/30 p-5 flex items-center justify-center shadow-xl group-hover:scale-105 group-hover:border-blue-500 transition-all duration-300 relative overflow-hidden">
                <div className="w-28 h-40 bg-slate-900 rounded-2xl border border-slate-700 p-2.5 shadow-2xl flex flex-col items-center justify-between text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#6C4CFF] to-purple-400 p-0.5 mt-1 shadow-md">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white text-xs font-black">ak</div>
                  </div>
                  <div className="space-y-1 w-full flex flex-col items-center">
                    <div className="w-14 h-1.5 bg-slate-600 rounded-full"></div>
                    <div className="w-18 h-1 bg-slate-700 rounded-full"></div>
                  </div>
                  <div className="w-20 h-5 bg-[#6C4CFF] rounded-lg text-[8px] font-extrabold text-white flex items-center justify-center shadow-md">Save Contact</div>
                </div>
              </div>
              <div className="space-y-3 max-w-sm">
                <h3 className="text-2xl font-extrabold text-slate-900 font-manrope">Your Online Profile</h3>
                <p className="text-sm text-slate-600 font-inter leading-relaxed">
                  Our platform generates free online profile/website associated with your NFC card. You can alter and update the content at any time by utilizing your aikulb dashboard.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-6 flex flex-col items-center group">
              <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-[#ECFDF5] via-[#F8FAFC] to-white border-2 border-emerald-500/30 p-5 flex items-center justify-center shadow-xl group-hover:scale-105 group-hover:border-emerald-500 transition-all duration-300 relative overflow-hidden">
                <div className="relative flex items-center justify-center">
                  <Smartphone className="w-28 h-28 text-slate-800" />
                  <Zap className="w-10 h-10 text-[#6C4CFF] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
                </div>
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

      {/* 4. FLOATING CHAT HELP WIDGET */}
      <a
        href="https://wa.me/917042015887?text=Hi%20aikulb!%20I%20need%20help%20customizing%20my%20smart%20card."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 font-manrope text-xs font-extrabold hover:scale-105 transition duration-300 cursor-pointer group"
      >
        <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md group-hover:rotate-12 transition">
          <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
        </div>
        <span className="tracking-tight">Need any Help? Chat with us</span>
      </a>
    </section>
  );
};
