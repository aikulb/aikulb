import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MoveLeft, MoveRight } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimatedComponents';

export const ProductCategoriesSection = () => {
  const carouselRef = useRef(null);

  const categories = [
    {
      title: 'Metal NFC Cards',
      desc: 'Precision laser engraved stainless steel matte black, 24K gold mirror & brushed silver.',
      price: 'From ₹1,999',
      tag: 'Executive Choice',
      catId: 'cat-metal',
    },
    {
      title: 'Wooden NFC Cards',
      desc: 'Handcrafted from 100% natural organic dark walnut and eco-friendly bamboo wood.',
      price: 'From ₹1,399',
      tag: 'Eco Friendly',
      catId: 'cat-wood',
    },
    {
      title: 'PVC Smart Cards',
      desc: 'High durability waterproof matte PVC cards with vibrant full color printing.',
      price: 'From ₹999',
      tag: 'Popular',
      catId: 'cat-pvc',
    },
    {
      title: 'Smart NFC Standees',
      desc: 'Dual NFC + QR acrylic desk stands for Google reviews, menus, and lead generation.',
      price: 'From ₹799',
      tag: 'Retail & Office',
      catId: 'cat-stand',
    },
    {
      title: 'NFC Review Cards',
      desc: 'Tap-to-review Google and Trustpilot smart cards to multiply customer reviews 10x.',
      price: 'From ₹599',
      tag: '5-Star Reviews',
      catId: 'cat-review',
    },
    {
      title: 'Custom Corporate Cards',
      desc: 'Tailored enterprise cards with custom corporate logos, employee names, and team analytics.',
      price: 'Bulk Pricing',
      tag: 'Enterprise Teams',
      catId: 'cat-metal',
    },
  ];

  return (
    <section className="py-24 bg-[#F8F9FA] border-t border-slate-200 relative transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block px-3.5 py-1 rounded-full bg-white border border-slate-200 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-sm">
              Smart Hardware Store
            </div>
            <h2 className="section-h2 text-slate-900 font-extrabold">
              Choose Your aikulb
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline text-xs text-slate-500 font-mono font-bold uppercase tracking-wider">
              Swipe or Drag Cards
            </span>
            <Link
              to="/store"
              className="inline-flex items-center space-x-2 text-[#6C4CFF] hover:underline font-bold text-sm font-manrope transition"
            >
              <span>Explore Entire Store</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Draggable Carousel Container */}
        <motion.div ref={carouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing pb-4">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((c, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ duration: 0.25 }}
                  className="p-8 rounded-3xl bg-white border border-slate-200 card-hover-elevation flex flex-col justify-between group h-full shadow-lg"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {c.tag}
                      </span>
                      <span className="font-extrabold text-slate-900 text-base font-manrope">{c.price}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 font-manrope mb-2 group-hover:text-[#6C4CFF] transition">
                      {c.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-inter leading-relaxed mb-6 font-medium">
                      {c.desc}
                    </p>
                  </div>

                  <Link
                    to={`/store?cat=${c.catId}`}
                    className="w-full py-3.5 rounded-full border border-slate-300 text-slate-800 font-bold text-xs font-manrope text-center flex items-center justify-center space-x-2 transition hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm"
                  >
                    <span>View Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>
      </div>
    </section>
  );
};
