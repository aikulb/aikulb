import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { ProductPortfolioSection } from '../components/ProductPortfolioSection';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { api } from '../services/apiClient';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingBag, Heart, Star, Sparkles, Check, LayoutGrid } from 'lucide-react';
import { BlackMetalCardVisual, GoldMetalCardVisual, SilverMetalCardVisual, BlueMetalCardVisual, RoseGoldMetalCardVisual, WoodCardVisual, SmartStandVisual } from '../components/ProductVisuals';
import { ScrollReveal, StaggerContainer, StaggerItem, SkeletonLoader } from '../components/AnimatedComponents';

export const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCat = searchParams.get('cat') || '';
  const searchParamQuery = searchParams.get('search') || '';

  // View Mode: 'portfolio' (Rich Showcase) vs 'grid' (Compact Grid)
  const [viewMode, setViewMode] = useState(currentCat || searchParamQuery ? 'grid' : 'portfolio');
  const [searchQuery, setSearchQuery] = useState(searchParamQuery);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchData();
  }, [currentCat, selectedMaterial, sortBy]);

  const fetchData = async () => {
    setLoading(true);
    let query = '?1=1';
    if (currentCat) query += `&category=${currentCat}`;
    if (selectedMaterial) query += `&material=${selectedMaterial}`;
    if (sortBy) query += `&sort=${sortBy}`;
    if (searchQuery) query += `&search=${searchQuery}`;

    const [prodRes, catRes] = await Promise.all([
      api.getProducts(query),
      api.getCategories(),
    ]);

    if (prodRes.success) setProducts(prodRes.data);
    if (catRes.success) setCategories(catRes.data);
    setLoading(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setViewMode('grid');
    fetchData();
  };

  const handleAddToCartWithToast = (product) => {
    addToCart(product, 1);
    setToastMessage(`Added "${product.name}" to your cart!`);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const renderProductVisual = (p) => {
    const slug = (p.slug || '').toLowerCase();
    const name = (p.name || '').toLowerCase();
    const cardId = p.id || p.slug || 'AK-CARD';
    
    if (slug.includes('gold') || name.includes('gold')) {
      return <GoldMetalCardVisual name={p.name} cardId={cardId} />;
    }
    if (slug.includes('silver') || name.includes('silver') || slug.includes('platinum')) {
      return <SilverMetalCardVisual name={p.name} cardId={cardId} />;
    }
    if (slug.includes('blue') || name.includes('blue') || slug.includes('sapphire')) {
      return <BlueMetalCardVisual name={p.name} cardId={cardId} />;
    }
    if (slug.includes('rose') || name.includes('rose')) {
      return <RoseGoldMetalCardVisual name={p.name} cardId={cardId} />;
    }
    if (slug.includes('wood') || slug.includes('bamboo') || name.includes('wood')) {
      return <WoodCardVisual name={p.name} cardId={cardId} />;
    }
    if (slug.includes('stand') || name.includes('stand')) {
      return <SmartStandVisual cardId={cardId} />;
    }
    return <BlackMetalCardVisual name={p.name} cardId={cardId} />;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 flex flex-col font-sans relative">
      <Navbar />

      {/* Floating Success Toast Animation */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white border border-[#10B981]/50 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center space-x-2.5 font-manrope text-sm font-bold"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-0 pb-24 w-full">
        {/* Store Catalog Hero Section with Executive Photographic Background (Inspired by Reference Image 1) */}
        <section className="relative w-full pt-28 sm:pt-36 pb-20 sm:pb-28 bg-[#0B0F17] text-white overflow-hidden border-b border-neutral-800 mb-12 shadow-2xl">
          {/* Executive Photographic Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
            style={{ backgroundImage: `url('/assets/store_hero_bg.jpg')` }}
          />

          {/* Multi-layer Dark Gradient & Vignette Overlay for High Contrast Text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0D]/95 via-[#0A0A0D]/75 to-[#0A0A0D]/90 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0D]/40 via-transparent to-[#0A0A0D]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <ScrollReveal className="max-w-4xl mx-auto space-y-6">
              {/* Main Headline matching Image 1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-manrope tracking-tight leading-[1.08] drop-shadow-md">
                The Ultimate Smart Metal Business Card In Luxurious Metal
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-inter max-w-2xl mx-auto leading-relaxed drop-shadow">
                Explore aerospace metal, natural wood, waterproof PVC smart cards, and countertop NFC standees.
              </p>

              {/* Action Buttons matching Image 1 */}
              <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
                <Link
                  to="/customize"
                  className="btn-pill-coral text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-2xl transition hover:scale-105 font-manrope uppercase tracking-wider inline-flex items-center space-x-2 cursor-pointer"
                >
                  <span>GET FREE DESIGN PREVIEW</span>
                </Link>

                <button
                  onClick={() => {
                    const el = document.getElementById('catalog-content');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-pill-outline-white text-xs sm:text-sm px-7 py-3 rounded-full font-manrope uppercase tracking-wider transition hover:bg-white hover:text-black cursor-pointer"
                >
                  EXPLORE CATALOG
                </button>
              </div>

              {/* Catalog View Toggle Buttons */}
              <div className="pt-8 flex justify-center">
                <div className="inline-flex p-1.5 rounded-full bg-slate-900/80 border border-neutral-700/80 backdrop-blur-xl shadow-2xl">
                  <button
                    onClick={() => setViewMode('portfolio')}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold font-manrope transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                      viewMode === 'portfolio'
                        ? 'aikulb-gradient-bg text-white shadow-lg scale-105'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Rich Portfolio Catalog</span>
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold font-manrope transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                      viewMode === 'grid'
                        ? 'aikulb-gradient-bg text-white shadow-lg scale-105'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>Compact Grid View</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div id="catalog-content">

        {/* View Mode 1: Rich Portfolio Catalog (ai klub Inspired Layout with specs & 3D tilt) */}
        {viewMode === 'portfolio' ? (
          <ProductPortfolioSection />
        ) : (
          /* View Mode 2: Searchable Filterable Compact Grid */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter & Search Controls Bar */}
            <ScrollReveal yOffset={20} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md mb-12 space-y-4">
              <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search products by name, material, SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#10B981] shadow-sm font-inter"
                  />
                </div>

                {/* Material Dropdown */}
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="px-4 py-3 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-[#10B981] shadow-sm font-inter"
                >
                  <option value="">All Materials</option>
                  <option value="Steel">Stainless Steel</option>
                  <option value="Gold">24K Gold</option>
                  <option value="Wood">Walnut & Bamboo Wood</option>
                  <option value="PVC">Waterproof PVC</option>
                  <option value="Acrylic">Acrylic Standee</option>
                </select>

                {/* Sorting Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:border-[#10B981] shadow-sm font-inter"
                >
                  <option value="featured">Featured First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </form>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2.5 pt-3 border-t border-slate-200">
                <button
                  onClick={() => setSearchParams({})}
                  className={`px-4 py-2 rounded-full text-xs font-bold font-manrope transition ${
                    !currentCat ? 'bg-[#10B981] text-white shadow-md' : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSearchParams({ cat: cat.slug })}
                    className={`px-4 py-2 rounded-full text-xs font-bold font-manrope transition ${
                      currentCat === cat.slug ? 'bg-[#10B981] text-white shadow-md' : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Products Grid with Skeleton Loaders */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <SkeletonLoader key={n} className="h-[380px] w-full rounded-3xl" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 space-y-4 bg-white rounded-3xl border border-slate-200">
                <Filter className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900 font-manrope">No products found</h3>
                <p className="text-sm text-slate-500 font-inter">Try adjusting your material or category filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedMaterial('');
                    setSearchParams({});
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#10B981] text-white text-sm font-bold font-manrope hover:bg-[#5b3ee0] transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.07}>
                {products.map((p) => {
                  const inWish = isInWishlist(p.id);
                  return (
                    <StaggerItem key={p.id}>
                      <div className="group rounded-3xl bg-white border border-slate-200 hover:border-[#10B981] p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-md hover:shadow-xl flex flex-col justify-between h-full">
                        <div>
                          {/* Visual Render Header */}
                          <div className="relative mb-5 rounded-2xl p-2 bg-[#F8F9FA] border border-slate-200 transition-transform duration-300 group-hover:scale-[1.01]">
                            {renderProductVisual(p)}

                            {/* Wishlist Button Micro-bounce */}
                            <motion.button
                              whileTap={{ scale: 1.25 }}
                              onClick={() => toggleWishlist(p)}
                              className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md transition ${
                                inWish ? 'bg-red-500/20 text-red-500 border border-red-500/40' : 'bg-white/90 text-slate-700 border border-slate-200 hover:text-slate-900 shadow-md'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${inWish ? 'fill-red-500' : ''}`} />
                            </motion.button>
                          </div>

                          {/* Details */}
                          <div className="flex justify-between items-start mb-2">
                            <Link to={`/product/${p.slug}`} className="font-extrabold text-lg text-slate-900 font-manrope hover:text-[#10B981] transition line-clamp-1">
                              {p.name}
                            </Link>
                            <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold font-mono">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span>{p.rating}</span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 font-inter line-clamp-2 leading-relaxed mb-4">
                            {p.short_description || p.description}
                          </p>
                        </div>

                        {/* Price & Add to Cart Action */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <div className="flex items-baseline space-x-2">
                              <span className="font-black text-slate-900 text-xl font-manrope">₹{p.price}</span>
                              {p.original_price && (
                                <span className="text-xs text-slate-400 line-through font-mono">₹{p.original_price}</span>
                              )}
                            </div>
                            <span className="text-[10px] text-emerald-600 font-mono font-bold block">{p.discount}% OFF</span>
                          </div>

                          <div className="flex space-x-2">
                            <Link
                              to={`/product/${p.slug}`}
                              className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs font-manrope border border-slate-200 transition"
                            >
                              Details
                            </Link>

                            <motion.button
                              whileHover={{ y: -2, scale: 1.02 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAddToCartWithToast(p)}
                              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00DC82] via-[#10B981] to-[#059669] hover:brightness-110 text-black font-extrabold text-xs font-manrope flex items-center space-x-1.5 shadow-md shadow-[#10B981]/25 transition cursor-pointer"
                            >
                              <ShoppingBag className="w-4 h-4 text-black" />
                              <span>ADD</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            )}
          </div>
        )}
        </div>
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
};

