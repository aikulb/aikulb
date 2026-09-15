import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ShieldCheck, Zap, Cpu, Check, ShoppingBag, 
  ArrowRight, Layers, Award, Star, MessageCircle, ChevronDown, Sliders
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/apiClient';
import { ScrollReveal, Card3DTilt, MagneticButton } from './AnimatedComponents';
import { BlackMetalCardVisual, GoldMetalCardVisual, SilverMetalCardVisual } from './ProductVisuals';

export const MetalCardSection = () => {
  const [selectedFinish, setSelectedFinish] = useState('black');
  const [metalProducts, setMetalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMetalProducts();
  }, []);

  const fetchMetalProducts = async () => {
    setLoading(true);
    try {
      const res = await api.getProducts('?category=cat-metal');
      if (res.success && res.data.length > 0) {
        setMetalProducts(res.data);
      }
    } catch (err) {
      console.warn('Syncing metal cards fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCartWithToast = (product) => {
    addToCart(product, 1);
    setToastMessage(`Added "${product.name}" to your cart!`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const finishes = [
    {
      id: 'black',
      name: 'Matte Black Steel',
      tag: 'Executive CXO Choice',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      price: 1999,
      originalPrice: 2999,
      discount: '33% OFF',
      desc: 'Aerospace-grade 316L stainless steel with ultra-smooth matte black PVD coating and high-precision laser engraved branding.',
      visual: <BlackMetalCardVisual name="NICHOLAS PERRY" title="FOUNDER & CEO" />,
      productId: 'prod-metal-black',
    },
    {
      id: 'gold',
      name: '24K Mirror Gold',
      tag: 'Luxurious Mirror Finish',
      badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
      price: 2399,
      originalPrice: 3499,
      discount: '31% OFF',
      desc: 'Electroplated 24K gold metallic mirror finish card. Radiates executive elegance and creates an unforgettable impression.',
      visual: <GoldMetalCardVisual name="VICTORIA CHEN" title="MANAGING DIRECTOR" />,
      productId: 'prod-metal-gold',
    },
    {
      id: 'silver',
      name: 'Brushed Silver Steel',
      tag: 'Classic Stainless Steel',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      price: 1999,
      originalPrice: 2799,
      discount: '28% OFF',
      desc: 'Minimalist brushed silver stainless steel business card featuring custom laser etching and lifetime NFC cloud profile sync.',
      visual: <SilverMetalCardVisual name="MARCUS VANCE" title="CREATIVE DIRECTOR" />,
      productId: 'prod-metal-silver',
    }
  ];

  const currentFinishObj = finishes.find(f => f.id === selectedFinish) || finishes[0];

  const metalFeatures = [
    {
      title: 'Precision Laser Engraving',
      desc: 'High-power optical fiber laser carving produces razor-sharp tactile text and logos that never scratch off or fade.',
      icon: Sparkles,
    },
    {
      title: 'Aerospace Stainless Steel',
      desc: 'Built from 316L surgical-grade stainless steel. Ultra-durable, unbendable, and weighted for premium tactile luxury.',
      icon: ShieldCheck,
    },
    {
      title: 'High Sensitivity NTAG216 Chip',
      desc: 'Embedded with top-tier NTAG216 NFC antenna array for instant 1-tap reading on both iOS iPhones and Android smartphones.',
      icon: Cpu,
    },
    {
      title: 'Dynamic Laser-Etched QR Code',
      desc: 'Includes an engraved dynamic QR code on the back so anyone can scan your profile even on older non-NFC camera phones.',
      icon: Zap,
    }
  ];

  const specsTable = [
    { label: 'Card Dimensions', val: '85.6mm x 54mm (Standard Credit Card Size)' },
    { label: 'Thickness & Weight', val: '0.8mm Thickness • Heavyweight 22 Grams' },
    { label: 'Material Composition', val: '316L Aerospace Stainless Steel & 24K Gold Electroplate' },
    { label: 'NFC Microchip', val: 'NTAG216 High Speed (888 Bytes Data EEPROM)' },
    { label: 'Engraving Technology', val: 'High-Precision Fiber Laser & Deep Etch Inlay' },
    { label: 'Phone Compatibility', val: '100% Compatible with iOS iPhones & Android Smartphones' },
    { label: 'Cloud Access SLA', val: 'Lifetime Unlimited Taps & Dynamic Profile Updates' },
  ];

  const metalFaqs = [
    {
      q: 'How does the aikulb Metal NFC Business Card work?',
      a: 'When you tap your aikulb Metal card near any smartphone, your digital profile opens instantly in the browser. The recipient can save your VCF contact into their address book with 1-click, view your portfolio, WhatsApp, social links, and submit inquiries.',
    },
    {
      q: 'Can I print or engrave my company logo on the metal card?',
      a: 'Yes! We support custom high-precision laser logo engraving, custom vector graphics, name, title, and QR code placement. You can preview your custom card live using our Design Card Studio.',
    },
    {
      q: 'Is the metal card compatible with all phones?',
      a: 'Yes! All modern iPhones (iPhone 7 and newer) and Android smartphones have built-in NFC enabled by default. For any older phone without NFC, the laser-etched dynamic QR code on the back ensures 100% instant connectivity.',
    },
    {
      q: 'Do I need an app or subscription to use the metal card?',
      a: 'No recipient app or recurring monthly fee is needed. Your card comes with lifetime cloud digital profile hosting and free unlimited tap updates.',
    }
  ];

  return (
    <section id="metal-card-section" className="bg-[#FAFAFA] text-slate-900 relative transition-colors duration-300 overflow-hidden">
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

      {/* Hero Banner with Executive Photographic Background Attached Directly to Navbar */}
      <div className="relative w-full pt-28 sm:pt-36 pb-20 bg-[#0B0F17] text-white overflow-hidden border-b border-neutral-800 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105 opacity-40"
          style={{ backgroundImage: `url('/assets/store_hero_bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17]/95 via-[#0B0F17]/85 to-[#0B0F17]/90 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17]/40 via-transparent to-[#0B0F17]" />

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <ScrollReveal className="max-w-4xl mx-auto space-y-5">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Luxurious Metal Collection 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-manrope tracking-tight leading-[1.08] drop-shadow-md">
              The Ultimate Smart Metal Business Card
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-inter max-w-2xl mx-auto leading-relaxed drop-shadow">
              Crafted in luxurious aerospace metal. Instant tap sharing, precision laser engraving, lifetime cloud profile, and unmatched executive impact.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-4 font-manrope">
              <Link
                to="/customize?mat=metal"
                className="btn-pill-coral text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-2xl transition hover:scale-105 uppercase tracking-wider inline-flex items-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>DESIGN YOUR METAL CARD</span>
              </Link>

              <button
                onClick={() => {
                  const el = document.getElementById('metal-finishes');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-pill-outline-white text-xs sm:text-sm px-7 py-3 rounded-full uppercase tracking-wider transition hover:bg-white hover:text-black cursor-pointer"
              >
                EXPLORE METAL FINISHES
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Main Content Area */}
      <div id="metal-finishes" className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        
        {/* Interactive Metal Finishes Showcase */}
        <ScrollReveal className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6C4CFF]">
              Choose Your Signature Finish
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-manrope">
              Crafted in Four Distinct Luxury Metallics
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-inter">
              Select a finish below to preview live 3D visual textures and custom pricing.
            </p>

            {/* Finish Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {finishes.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFinish(f.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold font-manrope transition-all duration-300 cursor-pointer flex items-center space-x-2 ${
                    selectedFinish === f.id
                      ? 'aikulb-gradient-bg text-white shadow-lg scale-105'
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-[#6C4CFF] hover:text-slate-900 shadow-sm'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    f.id === 'black' ? 'bg-neutral-900' : f.id === 'gold' ? 'bg-amber-400' : 'bg-slate-300'
                  }`} />
                  <span>{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Metal Card Spotlight Box */}
          <div className="rounded-[36px] bg-white border border-slate-200 p-8 sm:p-12 shadow-xl relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Visual Preview Column */}
              <div className="lg:col-span-6 flex justify-center items-center">
                <div className="w-full max-w-md">
                  <Card3DTilt maxRotateX={5} maxRotateY={7}>
                    <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 backdrop-blur-md shadow-2xl relative flex flex-col justify-between">
                      {currentFinishObj.visual}

                      {/* Clean Non-Overlapping Price & Savings Bar below Card */}
                      <div className="mt-4 px-4 py-3 rounded-2xl bg-[#0F0F12] border border-neutral-800 text-white flex items-center justify-between shadow-md select-none">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">PRICE:</span>
                          <span className="text-base font-black font-manrope text-[#8B5CF6]">₹{currentFinishObj.price}</span>
                          <span className="text-xs text-slate-400 line-through font-mono">₹{currentFinishObj.originalPrice}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                          {currentFinishObj.discount}
                        </span>
                      </div>
                    </div>
                  </Card3DTilt>
                </div>
              </div>

              {/* Specifications & Actions Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center space-x-3">
                  <span className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold border ${currentFinishObj.badgeColor}`}>
                    {currentFinishObj.tag}
                  </span>
                  <span className="text-xs text-emerald-600 font-mono font-bold flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>In Stock • Ready to Laser Engrave</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-manrope tracking-tight">
                    {currentFinishObj.name} NFC Card
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 font-inter font-medium leading-relaxed">
                    {currentFinishObj.desc}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2 font-inter text-xs">
                  <span className="font-mono uppercase font-bold text-[#6C4CFF] block mb-1">
                    Included with Every Metal Order:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Free Laser Logo & Name Engraving</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Lifetime Cloud Digital Profile Access</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>1-Tap VCF Contact Download</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Lead Capture CRM Integration</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 font-manrope">
                  <MagneticButton strength={3} className="w-full sm:w-auto">
                    <button
                      onClick={() => handleAddToCartWithToast({
                        id: currentFinishObj.productId,
                        name: `aikulb ${currentFinishObj.name} NFC Card`,
                        price: currentFinishObj.price,
                        material: currentFinishObj.name,
                        image_url: '/assets/products/metal_black.svg'
                      })}
                      className="btn-pill-coral w-full sm:w-auto flex items-center justify-center space-x-2 shadow-xl cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart (₹{currentFinishObj.price})</span>
                    </button>
                  </MagneticButton>

                  <button
                    onClick={() => navigate('/customize')}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3.5 rounded-full shadow-md transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-purple-300" />
                    <span>Customize in Design Studio</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* Features & Craftsmanship Grid */}
        <ScrollReveal className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6C4CFF]">
              Engineering Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-manrope">
              Why Leaders Choose aikulb Metal Smart Cards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metalFeatures.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-[#6C4CFF]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6C4CFF]/15 to-[#3B82F6]/15 border border-[#6C4CFF]/30 flex items-center justify-center text-[#6C4CFF] group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-900 font-manrope group-hover:text-[#6C4CFF] transition">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-inter leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Specifications Table */}
        <ScrollReveal className="p-8 sm:p-12 rounded-[36px] bg-white border border-slate-200 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6C4CFF]">
              Technical Data Sheet
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-manrope">
              Metal Card Specifications
            </h3>
          </div>

          <div className="divide-y divide-slate-200 font-inter text-xs sm:text-sm">
            {specsTable.map((spec, sIdx) => (
              <div key={sIdx} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="font-extrabold text-slate-900 font-manrope sm:w-1/3">{spec.label}</span>
                <span className="text-slate-600 font-medium sm:w-2/3">{spec.val}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Metal Card FAQ Accordion */}
        <ScrollReveal className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6C4CFF]">
              Frequently Asked Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-manrope">
              Metal Business Card FAQs
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {metalFaqs.map((faq, fIdx) => (
              <div key={fIdx} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === fIdx ? -1 : fIdx)}
                  className="w-full p-5 text-left font-extrabold text-slate-900 font-manrope text-sm sm:text-base flex justify-between items-center cursor-pointer hover:text-[#6C4CFF] transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${openFaq === fIdx ? 'rotate-180 text-[#6C4CFF]' : ''}`} />
                </button>
                {openFaq === fIdx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 font-inter font-medium leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA Footer Banner */}
        <ScrollReveal className="p-12 rounded-[36px] aikulb-gradient-bg text-center text-white space-y-6 shadow-2xl relative overflow-hidden font-manrope">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Upgrade Your Professional Identity?
          </h2>
          <p className="text-base text-purple-100 max-w-2xl mx-auto font-inter font-medium">
            Order your custom laser-engraved metal business card today and receive instant 1-tap cloud profile activation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              to="/customize?mat=metal"
              className="px-8 py-4 rounded-full bg-white text-[#090909] hover:bg-slate-100 font-extrabold text-sm transition shadow-lg hover:scale-105"
            >
              Design Your Metal Card
            </Link>
            <a
              href="https://wa.me/919999999999?text=Hi%20aikulb!%20I%20have%20a%20question%20about%20Metal%20NFC%20Cards."
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full bg-black/30 hover:bg-black/40 text-white font-bold text-sm border border-white/30 transition hover:scale-105 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
