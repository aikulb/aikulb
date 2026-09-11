import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Sparkles, Check, ArrowRight, ShieldCheck, Zap, QrCode, Cpu, Layers, ExternalLink, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ScrollReveal, Card3DTilt, MagneticButton } from './AnimatedComponents';
import { BlackMetalCardVisual, GoldMetalCardVisual, SilverMetalCardVisual, WoodCardVisual, SmartStandVisual } from './ProductVisuals';

export const ProductPortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [toastMessage, setToastMessage] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    setToastMessage(`Added "${item.name}" to cart!`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const categories = [
    { id: 'all', label: 'All Portfolio Products' },
    { id: 'metal', label: 'Metal NFC Cards' },
    { id: 'wood', label: 'Wooden Cards' },
    { id: 'mirror', label: 'Mirror Finish' },
    { id: 'pvc', label: 'PVC Cards' },
    { id: 'review_stand', label: 'Google Review & Stands' },
    { id: 'tags', label: 'Social NFC Tags' },
  ];

  const portfolioItems = [
    {
      id: 'port-black-metal',
      category: 'metal',
      name: 'Black Metal NFC Business Card',
      price: 1999,
      originalPrice: 3499,
      tag: 'Executive CXO Choice',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      description: 'Precision laser engraved aerospace-grade stainless steel matte black card. Perfect for founders, executives, and high-impact first impression networking.',
      specs: [
        { label: 'Printing Type', val: 'Precision Laser Engraving & UV' },
        { label: 'Material', val: 'Aerospace Matte Black Steel' },
        { label: 'NFC Chip', val: 'High Sensitivity NTAG216' },
        { label: 'Engraving Color', val: 'Gold, Silver, or Stealth Black' },
        { label: 'Durability', val: 'Lifetime Scratch Resistant' },
      ],
      features: [
        'Lifetime Cloud Digital Profile Access',
        'Built-in Dynamic QR Code for 100% Phone Support',
        '1-Tap VCF Contact Download to Recipient Phone',
        'Backend Admin Panel to Manage Details Anytime',
      ],
      visualType: 'black_metal',
      bgColor: 'bg-[#090909]',
    },
    {
      id: 'port-wood-bamboo',
      category: 'wood',
      name: 'Wooden Bamboo NFC Business Card',
      price: 1499,
      originalPrice: 2499,
      tag: '100% Organic Eco-Friendly',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      description: 'Handcrafted from organic natural bamboo wood. Combines sustainable eco-friendly craftsmanship with advanced NFC smart networking technology.',
      specs: [
        { label: 'Printing Type', val: 'Deep Engraved & UV Inlay' },
        { label: 'Material', val: '100% Natural Organic Bamboo Wood' },
        { label: 'NFC Chip', val: 'High Sensitivity NTAG216' },
        { label: 'Text Color', val: 'Natural Wood Grain Inlay' },
        { label: 'Durability', val: 'Water-Resistant Eco Wood' },
      ],
      features: [
        'Lifetime Cloud Digital Card Access',
        'Dynamic QR Code for Non-NFC Devices',
        'Integrated Lead Capture CRM & WhatsApp 1-Tap',
        'Technical Support Included',
      ],
      visualType: 'wood',
      bgColor: 'bg-[#0F0E12]',
    },
    {
      id: 'port-wood-cherry',
      category: 'wood',
      name: 'Wooden Dark Cherry NFC Business Card',
      price: 1499,
      originalPrice: 2499,
      tag: 'Rich Natural Texture',
      badgeColor: 'bg-amber-600/20 text-amber-400 border-amber-600/40',
      description: 'Crafted from premium dark cherry wood with rich natural grain patterns. Designed for creative directors, architects, and sustainable brand leaders.',
      specs: [
        { label: 'Printing Type', val: 'UV Color & Laser Carving' },
        { label: 'Material', val: 'Premium Dark Cherry Wood' },
        { label: 'NFC Chip', val: 'High Sensitivity Microchip' },
        { label: 'Text Color', val: 'Custom Multi-Color & Gold Inlay' },
        { label: 'Durability', val: 'Handcrafted Solid Hardwood' },
      ],
      features: [
        'Lifetime Cloud Digital Profile',
        'Dynamic QR Code on Back',
        'Lead Capture Form & VCF Address Book Save',
        'Backend Panel to Edit Info Anytime',
      ],
      visualType: 'wood',
      bgColor: 'bg-[#090909]',
    },
    {
      id: 'port-gold-metal',
      category: 'metal',
      name: '24K Gold Metal NFC Business Card',
      price: 2399,
      originalPrice: 3999,
      tag: '24K Gold Electroplated',
      badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
      description: 'Luxury 24K electroplated gold metal card featuring one-side metallic gold finish and underlying high-sensitivity NFC antenna array.',
      specs: [
        { label: 'Printing Type', val: 'Precision Engraving & UV Inlay' },
        { label: 'Material', val: '24K Electroplated Gold Alloy' },
        { label: 'NFC Chip', val: 'High Sensitivity NTAG216' },
        { label: 'Text Color', val: 'Stealth Black or Dark Engraving' },
        { label: 'Durability', val: 'Tarnish-Proof Mirror Finish' },
      ],
      features: [
        'Lifetime Digital Identity Stack',
        '1-Tap VCF Contact Save into Phonebook',
        'Lead Capture CRM Database Integration',
        'Priority Technical Support',
      ],
      visualType: 'gold_metal',
      bgColor: 'bg-[#120F08]',
    },
    {
      id: 'port-white-metal',
      category: 'metal',
      name: 'Ceramic White Metal NFC Business Card',
      price: 1999,
      originalPrice: 3499,
      tag: 'Minimalist Modern',
      badgeColor: 'bg-slate-200/20 text-slate-100 border-slate-300/40',
      description: 'Sleek matte white ceramic coated metal business card. Provides vibrant color logo printing and ultra-smooth tactile touch.',
      specs: [
        { label: 'Printing Type', val: 'Vibrant HD UV Color Printing' },
        { label: 'Material', val: 'Matte Ceramic Coated Steel' },
        { label: 'NFC Chip', val: 'High Sensitivity Microchip' },
        { label: 'Text Color', val: 'Full Color HD Printing' },
        { label: 'Durability', val: 'Chip-Resistant Ceramic Coat' },
      ],
      features: [
        'Lifetime Digital Card Access',
        'Dynamic QR Code Integration',
        'Analytics & View Counter Tracking',
        'Edit Contact & Links Anytime',
      ],
      visualType: 'silver_metal',
      bgColor: 'bg-[#0D0D10]',
    },
    {
      id: 'port-silver-metal',
      category: 'metal',
      name: 'Brushed Silver Metal NFC Business Card',
      price: 1999,
      originalPrice: 3499,
      tag: 'Stainless Steel Classic',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      description: 'Aerospace brushed silver stainless steel card with laser-etched branding. Delivers a heavy, premium feel in hand.',
      specs: [
        { label: 'Printing Type', val: 'Laser Etching & Engraving' },
        { label: 'Material', val: 'Brushed Stainless Steel' },
        { label: 'NFC Chip', val: 'High Sensitivity NTAG216' },
        { label: 'Text Color', val: 'Deep Metallic Engraved' },
        { label: 'Durability', val: '100% Rust-Proof & Solid' },
      ],
      features: [
        'Lifetime Digital Identity Profile',
        'Dynamic QR Code Print',
        'Instant WhatsApp & Social Links',
        'Backend Panel Management',
      ],
      visualType: 'silver_metal',
      bgColor: 'bg-[#090909]',
    },
    {
      id: 'port-mirror-gold',
      category: 'mirror',
      name: '24K Mirror Gold NFC Business Card',
      price: 2399,
      originalPrice: 3999,
      tag: 'High Reflection Mirror',
      badgeColor: 'bg-amber-400/20 text-amber-200 border-amber-400/40',
      description: 'Ultra-reflective 24K mirror gold finish. Designed to reflect light and make an unforgettable statement when handed over.',
      specs: [
        { label: 'Printing Type', val: 'Laser Engraved Inlay' },
        { label: 'Material', val: 'Mirror Polished Gold Metal' },
        { label: 'NFC Chip', val: 'High Sensitivity Microchip' },
        { label: 'Text Color', val: 'Stealth Engraved Black' },
        { label: 'Durability', val: 'Scratch-Protected Mirror Finish' },
      ],
      features: [
        'Lifetime Cloud Digital Card Access',
        'Dynamic QR Code Support',
        'Real-time Lead Capture & Analytics',
        'Technical Support Included',
      ],
      visualType: 'gold_metal',
      bgColor: 'bg-[#141006]',
    },
    {
      id: 'port-mirror-silver',
      category: 'mirror',
      name: 'Mirror Silver NFC Business Card',
      price: 1999,
      originalPrice: 3499,
      tag: 'Chrome Reflection',
      badgeColor: 'bg-slate-300/20 text-slate-100 border-slate-300/40',
      description: 'High-polish chrome mirror silver steel card. Radiates luxury and precision engineering.',
      specs: [
        { label: 'Printing Type', val: 'Precision Engraving' },
        { label: 'Material', val: 'Chrome Mirror Steel' },
        { label: 'NFC Chip', val: 'High Sensitivity Microchip' },
        { label: 'Text Color', val: 'Laser Etched Inlay' },
        { label: 'Durability', val: 'Reflective Stainless Steel' },
      ],
      features: [
        'Lifetime Digital Identity',
        'Dynamic QR Code Integration',
        '1-Tap Save Contact VCF',
        'Backend Panel Control',
      ],
      visualType: 'silver_metal',
      bgColor: 'bg-[#090909]',
    },
    {
      id: 'port-pvc-custom',
      category: 'pvc',
      name: 'Custom PVC NFC Business Card',
      price: 999,
      originalPrice: 1699,
      tag: 'Full Custom Print',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      description: 'Waterproof matte PVC smart business card with 100% custom full-bleed artwork, company branding, and employee details.',
      specs: [
        { label: 'Printing Type', val: 'Full Color HD Offset UV' },
        { label: 'Material', val: 'Waterproof Matte PVC' },
        { label: 'NFC Chip', val: 'NTAG216 High Sensitivity' },
        { label: 'Text Color', val: 'Any Full Color Palette' },
        { label: 'Durability', val: 'Waterproof & Flexible' },
      ],
      features: [
        'Lifetime Digital Card Access',
        'Dynamic QR Code Printed on Back',
        'Lead Capture Form & Analytics',
        'Backend Admin Management',
      ],
      visualType: 'black_metal',
      bgColor: 'bg-[#0B0D0F]',
    },
    {
      id: 'port-pvc-standard',
      category: 'pvc',
      name: 'Standard Matte PVC NFC Business Card',
      price: 599,
      originalPrice: 999,
      tag: 'Best Seller Value',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      description: 'Classic matte black or white PVC card with pre-formatted corporate layout. Affordable and reliable smart card for sales teams.',
      specs: [
        { label: 'Printing Type', val: 'Standard HD Print' },
        { label: 'Material', val: 'Reinforced Matte PVC' },
        { label: 'NFC Chip', val: 'High Sensitivity Chip' },
        { label: 'Text Color', val: 'White / Gold Print' },
        { label: 'Durability', val: 'Waterproof' },
      ],
      features: [
        'Lifetime Digital Profile Access',
        'Dynamic QR Code Included',
        '1-Tap Contact Download',
        'Technical Support Included',
      ],
      visualType: 'black_metal',
      bgColor: 'bg-[#090909]',
    },
    {
      id: 'port-google-review',
      category: 'review_stand',
      name: 'Google Review NFC Smart Card',
      price: 599,
      originalPrice: 1199,
      tag: '10x Review Booster',
      badgeColor: 'bg-[#4285F4]/20 text-blue-300 border-[#4285F4]/40',
      description: 'Tap-to-review Google Business card. Tap on any customer smartphone to directly open your 5-star Google review submission link.',
      specs: [
        { label: 'Printing Type', val: 'Official Google Review Design' },
        { label: 'Material', val: 'Heavy Duty Waterproof PVC' },
        { label: 'NFC Chip', val: 'Instant Redirect NTAG Chip' },
        { label: 'Compatibility', val: '100% Android & iOS' },
        { label: 'Setup', val: 'Pre-configured with your Google Link' },
      ],
      features: [
        'Direct Tap to Google Review Link',
        'Dynamic QR Code for Camera Scans',
        'No App Required for Customers',
        'Lifetime Unlimited Taps',
      ],
      visualType: 'black_metal',
      bgColor: 'bg-[#0E0F14]',
    },
    {
      id: 'port-smart-standee',
      category: 'review_stand',
      name: 'Smart NFC Countertop Standee',
      price: 799,
      originalPrice: 1499,
      tag: 'Retail & Office Desk Stand',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      description: 'Dual NFC + QR acrylic desk standee. Ideal for restaurant menus, clinic appointments, reception desks, and retail Google review collection.',
      specs: [
        { label: 'Printing Type', val: 'Dual NFC + High-Res QR Code' },
        { label: 'Material', val: 'Crystal Clear Acrylic Stand' },
        { label: 'Placement', val: 'Countertop / Desk Mount' },
        { label: 'Chip Size', val: 'Dual High Sensitivity Chips' },
        { label: 'Durability', val: 'Scratch-Proof Acrylic' },
      ],
      features: [
        'Dual NFC & Dynamic QR Code Display',
        'Instant Auto-Redirect to Menu, Review, or Profile',
        'No App Required for Visitors',
        'Commercial Grade Counter Top Display',
      ],
      visualType: 'smart_stand',
      bgColor: 'bg-[#090909]',
    },
    {
      id: 'port-social-tags',
      category: 'tags',
      name: 'aikulb Smart NFC Social Tags & Keychains',
      price: 499,
      originalPrice: 899,
      tag: 'Compact Phone & Keyring Tag',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      description: 'Adhesive epoxy NFC tag that sticks onto the back of any smartphone or attaches onto your key ring for instant on-the-go contact sharing.',
      specs: [
        { label: 'Printing Type', val: 'Epoxy Dome Protective Finish' },
        { label: 'Material', val: '3M Adhesive Backing & Epoxy' },
        { label: 'Size', val: '30mm Round Compact Tag' },
        { label: 'Chip', val: 'NTAG216 Ultra Sensitivity' },
        { label: 'Durability', val: 'Waterproof & Shockproof' },
      ],
      features: [
        'Sticks to Back of Any Phone Case',
        '1-Tap Instant Social Links & Profile',
        'Lifetime Profile Access Included',
        'No Battery or Charging Needed',
      ],
      visualType: 'black_metal',
      bgColor: 'bg-[#0E0E12]',
    },
  ];

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  const renderVisual = (item) => {
    switch (item.visualType) {
      case 'gold_metal':
        return <GoldMetalCardVisual name={item.name} />;
      case 'silver_metal':
        return <SilverMetalCardVisual name={item.name} />;
      case 'wood':
        return <WoodCardVisual name={item.name} />;
      case 'smart_stand':
        return <SmartStandVisual />;
      default:
        return <BlackMetalCardVisual name={item.name} />;
    }
  };

  return (
    <section id="portfolio-catalog" className="py-24 bg-[#F8F9FA] text-slate-900 relative overflow-hidden transition-colors duration-300">
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white border border-[#6C4CFF]/50 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center space-x-2.5 font-manrope text-sm font-bold"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Module */}
        <ScrollReveal className="text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#6C4CFF]/10 border border-[#6C4CFF]/20 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Smart Hardware Portfolio</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 font-manrope tracking-tight leading-tight">
            aikulb NFC Product Portfolio
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 font-inter font-medium leading-relaxed max-w-2xl mx-auto">
            Explore aikulb’s complete range of smart NFC business cards — from luxury aerospace metal cards for CXOs & founders to eco-friendly wooden cards and high-durability PVC cards for sales teams.
          </p>

          {/* Quick Filter Pill Buttons */}
          <div className="flex flex-wrap justify-center gap-2.5 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold font-manrope transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'aikulb-gradient-bg text-white shadow-lg shadow-[#6C4CFF]/30 scale-105'
                    : 'bg-white text-slate-700 border border-slate-300 hover:border-[#6C4CFF] hover:text-slate-900 shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Alternating Portfolio Section Modules */}
        <div className="space-y-16">
          {filteredItems.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <ScrollReveal key={item.id} yOffset={35} className={`rounded-[36px] bg-white border border-slate-200 p-8 sm:p-12 shadow-xl relative overflow-hidden group`}>
                {/* Subtle Ambient Background Gradient */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#6C4CFF]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#6C4CFF]/15 transition-all duration-700" />

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Visual Column */}
                  <div className={`lg:col-span-5 flex justify-center items-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="w-full max-w-md">
                      <Card3DTilt maxRotateX={4} maxRotateY={6}>
                        <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 backdrop-blur-md shadow-xl relative">
                          {renderVisual(item)}

                          {/* Floating Price Tag */}
                          <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white px-3.5 py-1.5 rounded-full font-manrope font-bold text-xs shadow-lg flex items-center space-x-1.5">
                            <span className="text-[#8B5CF6]">₹{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-[10px] text-slate-400 line-through font-mono">₹{item.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </Card3DTilt>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    {/* Badge */}
                    <div className="flex items-center space-x-3">
                      <span className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold border ${item.badgeColor}`}>
                        {item.tag}
                      </span>
                      <span className="text-xs text-emerald-600 font-mono font-bold flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Ready to Engrave & Ship</span>
                      </span>
                    </div>

                    {/* Title & Price */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-manrope tracking-tight">
                        {item.name}
                      </h3>
                      <div className="mt-2 text-xl font-extrabold text-[#6C4CFF] font-manrope">
                        Price: ₹{item.price} <span className="text-xs text-slate-500 font-inter font-normal">(Inclusive of custom engraving & digital cloud features)</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-600 font-inter font-medium leading-relaxed">
                      {item.description}
                    </p>

                    {/* Printing & Material Specifications */}
                    <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3 font-inter">
                      <h4 className="text-xs font-mono uppercase font-bold text-[#6C4CFF] tracking-wider border-b border-slate-200 pb-2">
                        Material & Printing Specifications
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium">
                        {item.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-center space-x-2 text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6C4CFF]" />
                            <span className="font-bold text-slate-900">{spec.label}:</span>
                            <span className="text-slate-600">{spec.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Digital Features Checklist */}
                    <div className="space-y-2 font-inter text-xs font-medium">
                      <h4 className="text-xs font-mono uppercase font-bold text-slate-800 tracking-wider">
                        Included Digital Features
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                        {item.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center space-x-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 font-manrope">
                      <MagneticButton strength={3} className="w-full sm:w-auto">
                        <button
                          onClick={() => handleAddToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            material: item.specs[1].val,
                            image_url: ''
                          })}
                          className="btn-pill-coral w-full sm:w-auto flex items-center justify-center space-x-2 shadow-xl cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart (₹{item.price})</span>
                        </button>
                      </MagneticButton>

                      <MagneticButton strength={3} className="w-full sm:w-auto">
                        <button
                          onClick={() => navigate('/customize')}
                          className="w-full sm:w-auto flex items-center justify-center space-x-2 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition-all"
                        >
                          <Sparkles className="w-4 h-4 text-purple-300" />
                          <span>Get Free Design Preview</span>
                        </button>
                      </MagneticButton>

                      <a
                        href={`https://wa.me/919999999999?text=Hi%20aikulb!%20I%20want%20to%20order%20the%20${encodeURIComponent(item.name)}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center space-x-1.5 transition whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                        <span>WhatsApp Inquiry</span>
                      </a>
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Footer Portfolio Banner */}
        <ScrollReveal yOffset={30} className="mt-20 p-12 rounded-[36px] aikulb-gradient-bg text-center text-white space-y-6 shadow-2xl relative overflow-hidden font-manrope">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Need Corporate Bulk Ordering or Custom Laser Logos?
          </h2>
          <p className="text-base text-purple-100 max-w-2xl mx-auto font-inter font-medium">
            We provide enterprise bulk pricing, standardized employee smart cards, dedicated account managers, and custom branding for corporate teams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              to="/customize"
              className="px-8 py-4 rounded-full bg-white text-[#090909] hover:bg-slate-100 font-extrabold text-sm transition shadow-lg hover:scale-105"
            >
              Custom Card Studio
            </Link>
            <Link
              to="/store"
              className="px-8 py-4 rounded-full bg-black/30 hover:bg-black/40 text-white font-bold text-sm border border-white/30 transition hover:scale-105"
            >
              Browse E-Commerce Store
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
