import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { useCart } from '../context/CartContext';
import { api } from '../services/apiClient';
import { Star, ShieldCheck, Cpu, Truck, ShoppingBag, Zap, Check } from 'lucide-react';
import { BlackMetalCardVisual, GoldMetalCardVisual, SilverMetalCardVisual, WoodCardVisual, SmartStandVisual } from '../components/ProductVisuals';
import confetti from 'canvas-confetti';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    const res = await api.getProductById(id);
    if (res.success) {
      setProduct(res.data);
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    confetti({ particleCount: 50, spread: 60 });
    setTimeout(() => setAdded(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const renderVisual = () => {
    if (!product) return null;
    if (product.slug.includes('gold')) return <GoldMetalCardVisual name={product.name} />;
    if (product.slug.includes('silver')) return <SilverMetalCardVisual name={product.name} />;
    if (product.slug.includes('wood') || product.slug.includes('bamboo')) return <WoodCardVisual name={product.name} />;
    if (product.slug.includes('stand')) return <SmartStandVisual />;
    return <BlackMetalCardVisual name={product.name} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070A0F] flex items-center justify-center text-white font-manrope">
        <div className="animate-spin w-8 h-8 border-4 border-[#00DC82] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#070A0F] text-white flex flex-col items-center justify-center p-4 font-manrope">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/store" className="px-6 py-3 rounded-full bg-[#10B981] text-black font-bold">Back to Store</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070A0F] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumbs */}
        <div className="text-xs text-slate-400 font-inter mb-8 flex items-center space-x-2 font-medium">
          <Link to="/" className="hover:text-[#00DC82]">Home</Link>
          <span>/</span>
          <Link to="/store" className="hover:text-[#00DC82]">Store</Link>
          <span>/</span>
          <span className="text-white font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Large Product Gallery Render */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-[#0D121B] border border-emerald-900/50 space-y-6 shadow-xl">
            <div className="p-4 rounded-2xl bg-[#070A0F] border border-emerald-900/60 shadow-2xl">
              {renderVisual()}
            </div>

            {/* Features Highlights Pills */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-manrope">
              <div className="p-3.5 rounded-2xl bg-[#070A0F] border border-emerald-900/40 shadow-xs">
                <Cpu className="w-5 h-5 text-[#00DC82] mx-auto mb-1" />
                <span className="text-white block font-bold">NTAG216 Chip</span>
                <span className="text-[10px] text-slate-400 font-mono">Fast 888 Bytes</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#070A0F] border border-emerald-900/40 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#00DC82] mx-auto mb-1" />
                <span className="text-white block font-bold">Encrypted</span>
                <span className="text-[10px] text-slate-400 font-mono">100% Security</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#070A0F] border border-emerald-900/40 shadow-xs">
                <Truck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="text-white block font-bold">Express Shipping</span>
                <span className="text-[10px] text-slate-400 font-mono">Dispatch in 24h</span>
              </div>
            </div>
          </div>

          {/* Right Specs & Purchase Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#00DC82] text-xs font-manrope font-bold uppercase tracking-wider mb-3">
                {product.material}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-manrope">{product.name}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1 text-amber-400 text-sm font-bold font-mono">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">SKU: {product.sku}</span>
                <span className="text-xs text-[#00DC82] font-mono font-bold">In Stock ({product.stock} units)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-6 rounded-3xl bg-[#0D121B] border border-emerald-900/50 flex items-center justify-between shadow-lg">
              <div>
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-black text-[#00DC82] font-manrope">₹{product.price}</span>
                  {product.original_price && (
                    <span className="text-base text-slate-500 line-through font-mono">₹{product.original_price}</span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1 font-inter">Inclusive of all taxes & lifetime digital profile software license.</p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-[#10B981]/20 text-[#00DC82] text-xs font-mono font-bold border border-[#10B981]/40">
                SAVE {product.discount}%
              </span>
            </div>

            <p className="text-sm text-slate-300 font-inter leading-relaxed">
              {product.description}
            </p>

            {/* Quantity & Actions */}
            <div className="space-y-4 pt-4 border-t border-emerald-950">
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest font-manrope">Quantity:</span>
                <div className="flex items-center space-x-3 bg-[#070A0F] rounded-full px-4 py-1.5 border border-emerald-900/60">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-slate-400 hover:text-white font-bold px-2 cursor-pointer">-</button>
                  <span className="text-sm font-bold text-white px-2 font-manrope">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-slate-400 hover:text-white font-bold px-2 cursor-pointer">+</button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 rounded-full bg-gradient-to-r from-[#00DC82] via-[#10B981] to-[#059669] hover:brightness-110 text-black font-extrabold text-base font-manrope flex items-center justify-center space-x-2 shadow-lg shadow-[#10B981]/30 transition cursor-pointer uppercase tracking-wider"
                >
                  {added ? <Check className="w-5 h-5 text-black" /> : <ShoppingBag className="w-5 h-5 text-black" />}
                  <span>{added ? 'Added to Cart!' : `Add to Cart (₹${product.price * quantity})`}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 rounded-full bg-[#070A0F] hover:bg-[#121927] border border-emerald-900/60 text-white font-extrabold text-base font-manrope flex items-center justify-center space-x-2 shadow-lg transition cursor-pointer uppercase tracking-wider"
                >
                  <Zap className="w-5 h-5 text-[#00DC82]" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 p-8 rounded-3xl bg-[#0D121B] border border-emerald-900/50 space-y-6 shadow-xl">
            <h3 className="text-2xl font-extrabold text-white font-manrope">Specifications & Technical Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-inter">
              <div className="p-4 rounded-2xl bg-[#070A0F] border border-emerald-900/60 flex justify-between">
                <span className="text-slate-400 font-bold">NFC Microchip:</span>
                <span className="text-[#00DC82] font-mono font-bold">NTAG216 High Speed</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#070A0F] border border-emerald-900/60 flex justify-between">
                <span className="text-slate-400 font-bold">Memory Capacity:</span>
                <span className="text-white font-mono font-bold">888 Bytes NDEF</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#070A0F] border border-emerald-900/60 flex justify-between">
                <span className="text-slate-400 font-bold">Material Finish:</span>
                <span className="text-white font-bold">{product.material}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#070A0F] border border-emerald-900/60 flex justify-between">
                <span className="text-slate-400 font-bold">QR Backup:</span>
                <span className="text-emerald-400 font-mono font-bold">Universal Dynamic QR</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-8 rounded-3xl bg-[#0D121B] border border-emerald-900/50 space-y-4 shadow-xl">
            <h3 className="text-xl font-extrabold text-white font-manrope">Verified Customer Reviews</h3>
            <div className="space-y-3">
              {(product.reviews || []).length === 0 ? (
                <p className="text-xs text-slate-400 font-inter">No reviews submitted yet. Be the first to review!</p>
              ) : (
                product.reviews.map((r, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#070A0F] border border-emerald-900/60 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white font-manrope">{r.user_name}</span>
                      <span className="text-amber-400 font-mono font-bold">★ {r.rating}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-inter italic">"{r.comment}"</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
};
