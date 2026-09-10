import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, ShoppingBag, Check, RotateCw, QrCode } from 'lucide-react';
import { CardChip } from './ProductVisuals';
import confetti from 'canvas-confetti';

export const CustomCardDesignerSection = () => {
  const [name, setName] = useState('JOHN DOE');
  const [title, setTitle] = useState('FOUNDER & CEO');
  const [company, setCompany] = useState('ABC TECHNOLOGIES');
  const [material, setMaterial] = useState('black_metal');
  const [qrPosition, setQrPosition] = useState('back-bottom');
  const [isFront, setIsFront] = useState(true);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

  const materials = [
    { id: 'black_metal', name: 'Matte Black Metal', price: 1999, color: 'from-[#1A1A1A] to-[#090909]' },
    { id: 'gold_metal', name: '24K Mirror Gold', price: 2399, color: 'from-[#3D2C0D] to-[#120D03]' },
    { id: 'silver_metal', name: 'Brushed Silver Steel', price: 1999, color: 'from-[#2D3748] to-[#0D1117]' },
    { id: 'walnut_wood', name: 'Organic Walnut Wood', price: 1499, color: 'from-[#3D261A] to-[#120A06]' },
    { id: 'pvc_matte', name: 'Matte Black PVC', price: 999, color: 'from-[#1F2937] to-[#111827]' },
  ];

  const currentMat = materials.find(m => m.id === material) || materials[0];

  const handleAddToCart = () => {
    const customProduct = {
      id: `custom-${material}-${Date.now()}`,
      name: `Custom aikulb ${currentMat.name}`,
      price: currentMat.price,
      original_price: currentMat.price + 1000,
      material: currentMat.name,
      image_url: '/assets/products/metal_black.svg',
    };

    addToCart(customProduct, 1, {
      name,
      title,
      company,
      material: currentMat.name,
      qrPosition,
    });

    setAdded(true);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <section id="customizer" className="py-24 bg-white dark:bg-[#111111] border-t border-slate-200 dark:border-slate-800/80 relative transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#6C4CFF]/10 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Studio</span>
          </div>
          <h2 className="section-h2 text-slate-900 dark:text-white">
            Design Your aikulb Card
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-inter">
            Personalize laser engraving, materials, typography, and QR placement live.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Controls Column */}
          <div className="lg:col-span-6 space-y-6 bg-[#F7F7F5] dark:bg-[#090909] p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest font-mono mb-2">
                Card Holder Name
              </label>
              <input
                type="text"
                maxLength={24}
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#111111] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold tracking-wider font-manrope uppercase text-sm focus:outline-none focus:border-[#6C4CFF]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest font-mono mb-2">
                  Job Designation
                </label>
                <input
                  type="text"
                  maxLength={28}
                  value={title}
                  onChange={(e) => setTitle(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#111111] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-inter font-medium focus:outline-none focus:border-[#6C4CFF]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest font-mono mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  maxLength={28}
                  value={company}
                  onChange={(e) => setCompany(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#111111] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-inter font-medium focus:outline-none focus:border-[#6C4CFF]"
                />
              </div>
            </div>

            {/* Material Options */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest font-mono mb-3">
                Select Card Material & Finish
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-manrope">
                {materials.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m.id)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition ${
                      material === m.id
                        ? 'border-[#6C4CFF] bg-[#6C4CFF]/10 text-slate-900 dark:text-white shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111111] text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="text-xs font-bold block">{m.name}</span>
                    <span className="text-[11px] font-mono text-[#6C4CFF] font-bold mt-1">₹{m.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* QR Position */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest font-mono mb-2">
                QR Code Placement
              </label>
              <div className="flex space-x-3">
                {['back-bottom', 'back-center', 'front-corner'].map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setQrPosition(pos)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold capitalize border font-manrope ${
                      qrPosition === pos
                        ? 'bg-[#111111] dark:bg-white text-white dark:text-[#090909] border-transparent'
                        : 'bg-white dark:bg-[#111111] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {pos.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="btn-pill-gradient flex-1 flex items-center justify-center space-x-2 shadow-lg"
              >
                {added ? <Check className="w-4 h-4 text-emerald-300" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{added ? 'Added to Cart!' : `Add Custom Card (₹${currentMat.price})`}</span>
              </button>

              <button
                onClick={() => setIsFront(!isFront)}
                className="btn-pill-secondary flex items-center justify-center space-x-2"
              >
                <RotateCw className="w-4 h-4 text-[#6C4CFF]" />
                <span>Flip Side ({isFront ? 'Front' : 'Back'})</span>
              </button>
            </div>
          </div>

          {/* Right Live Card Preview */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-6">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#6C4CFF] flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#6C4CFF] animate-ping"></span>
              <span>LIVE CARD ENGRAVING PREVIEW</span>
            </div>

            {/* Interactive Live Card Mockup Container */}
            <div className="w-full max-w-md aspect-[1.586] rounded-3xl p-6 bg-gradient-to-br transition-all duration-500 shadow-2xl relative flex flex-col justify-between overflow-hidden border border-white/20">
              <div className={`absolute inset-0 bg-gradient-to-br ${currentMat.color} -z-10`}></div>

              {isFront ? (
                /* FRONT VIEW */
                <>
                  <div className="flex justify-between items-center z-10">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg aikulb-gradient-bg flex items-center justify-center font-black text-white text-xs font-manrope">
                        ak
                      </div>
                      <span className="font-extrabold text-white text-base tracking-tight font-manrope lowercase">aikulb</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-purple-200 border border-white/20 px-2.5 py-0.5 rounded-full">
                      {currentMat.name}
                    </span>
                  </div>

                  <div className="my-3 z-10">
                    <CardChip className="w-12 h-9" />
                  </div>

                  <div className="border-t border-white/20 pt-3 z-10">
                    <h3 className="font-extrabold text-white text-lg tracking-wider font-manrope uppercase">{name || 'YOUR NAME'}</h3>
                    <p className="text-xs text-purple-200 font-bold uppercase tracking-wider font-inter">{title || 'TITLE'} • {company || 'COMPANY'}</p>
                  </div>
                </>
              ) : (
                /* BACK VIEW */
                <div className="w-full h-full flex flex-col justify-between items-center text-center p-4">
                  <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest font-bold">
                    aikulb NFC PASS • DYNAMIC IDENTITY CHIP
                  </div>
                  <div className="p-3 bg-white rounded-2xl shadow-xl my-auto">
                    <QrCode className="w-20 h-20 text-slate-950" />
                  </div>
                  <div className="text-[10px] font-mono text-purple-200 uppercase tracking-wider font-bold">
                    SCAN OR TAP PHONE TO CONNECT
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center max-w-sm font-inter">
              Laser engraved with sub-millimeter precision. Embedded with NTAG216 high-speed NFC microchip.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
