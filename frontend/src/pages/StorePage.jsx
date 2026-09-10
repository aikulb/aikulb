import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { api } from '../services/apiClient';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, ShoppingBag, Heart, Star, Sparkles, Check, ArrowRight } from 'lucide-react';
import { BlackMetalCardVisual, GoldMetalCardVisual, SilverMetalCardVisual, WoodCardVisual, SmartStandVisual } from '../components/ProductVisuals';

export const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCat = searchParams.get('cat') || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

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
    fetchData();
  };

  const renderProductVisual = (p) => {
    if (p.slug.includes('gold')) return <GoldMetalCardVisual name={p.name} />;
    if (p.slug.includes('silver')) return <SilverMetalCardVisual name={p.name} />;
    if (p.slug.includes('wood') || p.slug.includes('bamboo')) return <WoodCardVisual name={p.name} />;
    if (p.slug.includes('stand')) return <SmartStandVisual />;
    return <BlackMetalCardVisual name={p.name} />;
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Store Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#FF3838]/10 border border-[#FF3838]/20 text-[#FF3838] text-xs font-manrope font-bold uppercase tracking-wider">
            Official Smart Hardware Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 font-manrope tracking-tight">
            aikulb Smart Cards & Hardware
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-inter">
            Explore aerospace metal, natural wood, waterproof PVC smart cards, and countertop NFC standees.
          </p>
        </div>

        {/* Filter & Search Controls Bar */}
        <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-sm mb-12 space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search products by name, material, SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-[#FF3838] shadow-sm font-inter"
              />
            </div>

            {/* Material Dropdown */}
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="px-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-800 text-sm font-medium focus:outline-none focus:border-[#FF3838] shadow-sm font-inter"
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
              className="px-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-800 text-sm font-medium focus:outline-none focus:border-[#FF3838] shadow-sm font-inter"
            >
              <option value="featured">Featured First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </form>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2.5 pt-3 border-t border-neutral-200">
            <button
              onClick={() => setSearchParams({})}
              className={`px-4 py-2 rounded-full text-xs font-bold font-manrope transition ${
                !currentCat ? 'bg-[#FF3838] text-white shadow-md' : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ cat: cat.slug })}
                className={`px-4 py-2 rounded-full text-xs font-bold font-manrope transition ${
                  currentCat === cat.slug ? 'bg-[#FF3838] text-white shadow-md' : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-16">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-3xl bg-neutral-100 animate-pulse border border-neutral-200"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 space-y-4 bg-neutral-50 rounded-3xl border border-neutral-200">
            <Filter className="w-12 h-12 text-neutral-400 mx-auto" />
            <h3 className="text-xl font-bold text-neutral-900 font-manrope">No products found</h3>
            <p className="text-sm text-neutral-600 font-inter">Try adjusting your material or category filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMaterial('');
                setSearchParams({});
              }}
              className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-bold font-manrope hover:bg-neutral-800 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => {
              const inWish = isInWishlist(p.id);
              return (
                <div
                  key={p.id}
                  className="group rounded-3xl bg-white border border-neutral-200 hover:border-[#FF3838]/50 p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Render Header */}
                    <div className="relative mb-6 rounded-2xl overflow-hidden p-2 bg-neutral-950 border border-neutral-800">
                      {renderProductVisual(p)}
                      <button
                        onClick={() => toggleWishlist(p)}
                        className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition ${
                          inWish ? 'bg-red-500/20 text-red-500 border border-red-500/40' : 'bg-neutral-900/80 text-neutral-300 border border-neutral-700 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${inWish ? 'fill-red-500' : ''}`} />
                      </button>
                      <div className="absolute bottom-4 left-4 bg-neutral-900/90 border border-neutral-700 text-white px-3 py-0.5 rounded-full text-[10px] font-mono font-bold">
                        {p.material}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/product/${p.slug}`} className="font-extrabold text-lg text-neutral-900 font-manrope hover:text-[#FF3838] transition line-clamp-1">
                        {p.name}
                      </Link>
                      <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{p.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 font-inter line-clamp-2 leading-relaxed mb-4">
                      {p.short_description || p.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <span className="font-black text-neutral-900 text-xl font-manrope">₹{p.price}</span>
                        {p.original_price && (
                          <span className="text-xs text-neutral-400 line-through font-mono">₹{p.original_price}</span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-600 font-mono font-bold block">{p.discount}% OFF</span>
                    </div>

                    <div className="flex space-x-2">
                      <Link
                        to={`/product/${p.slug}`}
                        className="px-4 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs font-manrope border border-neutral-300 transition"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="px-5 py-2.5 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-bold text-xs font-manrope flex items-center space-x-1.5 shadow-md shadow-[#FF3838]/20 transition"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
};

