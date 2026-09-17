import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { useCart } from '../context/CartContext';
import { api } from '../services/apiClient';
import { Star, ShieldCheck, Cpu, Truck, ShoppingBag, Zap, Check, ArrowLeft } from 'lucide-react';
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
    const cardId = product.id || product.slug || 'AK-CARD';
    if (product.slug?.includes('gold')) return <GoldMetalCardVisual name={product.name} cardId={cardId} />;
    if (product.slug?.includes('silver')) return <SilverMetalCardVisual name={product.name} cardId={cardId} />;
    if (product.slug?.includes('wood') || product.slug?.includes('bamboo')) return <WoodCardVisual name={product.name} cardId={cardId} />;
    if (product.slug?.includes('stand')) return <SmartStandVisual cardId={cardId} />;
    return <BlackMetalCardVisual name={product.name} cardId={cardId} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center text-slate-900 font-manrope">
        <div className="animate-spin w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full"></div>
        <p className="text-xs font-bold text-slate-500 mt-3 font-mono">Loading Product Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col items-center justify-center p-6 font-manrope space-y-4">
        <h2 className="text-3xl font-extrabold text-slate-900">Product Not Found</h2>
        <p className="text-sm text-slate-600">The product you are looking for does not exist or has been moved.</p>
        <Link to="/store" className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center space-x-2 shadow-md">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-slate-500 font-inter mb-8 flex items-center space-x-2 font-medium">
          <Link to="/" className="hover:text-emerald-600 transition">Home</Link>
          <span>/</span>
          <Link to="/store" className="hover:text-emerald-600 transition">Store</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Large Product Showcase Gallery */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-slate-200/90 space-y-6 shadow-xl">
            {/* Dedicated Product Showcase Canvas Container with Radial Spotlight */}
            <div className="w-full p-6 sm:p-8 rounded-2xl bg-[#090D16] border border-slate-800 shadow-2xl flex items-center justify-center min-h-[330px] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
              <div className="w-full max-w-[420px] relative z-10">
                {renderVisual()}
              </div>
            </div>

            {/* Features Highlights Pills */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-manrope">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs flex flex-col items-center space-y-1">
                <Cpu className="w-5 h-5 text-emerald-600 mb-0.5" />
                <span className="text-slate-900 block font-extrabold text-xs">NTAG216 Chip</span>
                <span className="text-[10px] text-slate-500 font-mono">Fast 888 Bytes</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs flex flex-col items-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-0.5" />
                <span className="text-slate-900 block font-extrabold text-xs">Encrypted</span>
                <span className="text-[10px] text-slate-500 font-mono">100% Security</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs flex flex-col items-center space-y-1">
                <Truck className="w-5 h-5 text-emerald-600 mb-0.5" />
                <span className="text-slate-900 block font-extrabold text-xs">Express Shipping</span>
                <span className="text-[10px] text-slate-500 font-mono">Dispatch 24h</span>
              </div>
            </div>
          </div>

          {/* Right Specs & Purchase Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-manrope font-bold uppercase tracking-wider mb-3">
                {product.material}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-manrope tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2.5">
                <div className="flex items-center space-x-1 text-amber-500 text-sm font-bold font-mono">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">SKU: {product.sku}</span>
                <span className="text-xs text-emerald-700 font-mono font-bold">In Stock ({product.stock} units)</span>
              </div>
            </div>

            {/* Premium Dark Price Box Banner */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white flex items-center justify-between shadow-xl">
              <div>
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-black text-emerald-400 font-manrope">₹{product.price}</span>
                  {product.original_price && (
                    <span className="text-base text-slate-400 line-through font-mono">₹{product.original_price}</span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-1 font-inter">Inclusive of all taxes & lifetime digital profile software license.</p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40">
                SAVE {product.discount}%
              </span>
            </div>

            <p className="text-sm text-slate-600 font-inter leading-relaxed">
              {product.description}
            </p>

            {/* Quantity & Actions */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-widest font-manrope">Quantity:</span>
                <div className="flex items-center space-x-3 bg-slate-100 rounded-full px-4 py-2 border border-slate-300 shadow-inner">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-slate-600 hover:text-slate-900 font-bold px-2 cursor-pointer">-</button>
                  <span className="text-sm font-bold text-slate-900 px-2 font-manrope">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-slate-600 hover:text-slate-900 font-bold px-2 cursor-pointer">+</button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base font-manrope flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition cursor-pointer uppercase tracking-wider"
                >
                  {added ? <Check className="w-5 h-5 text-white" /> : <ShoppingBag className="w-5 h-5 text-white" />}
                  <span>{added ? 'Added to Cart!' : `Add to Cart (₹${product.price * quantity})`}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base font-manrope flex items-center justify-center space-x-2 shadow-md transition cursor-pointer uppercase tracking-wider"
                >
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Verified Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 p-8 rounded-3xl bg-white border border-slate-200/90 space-y-6 shadow-xl">
            <h3 className="text-2xl font-extrabold text-slate-900 font-manrope">Specifications & Technical Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-inter">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-500 font-bold">NFC Microchip:</span>
                <span className="text-emerald-700 font-mono font-bold">NTAG216 High Speed</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-500 font-bold">Memory Capacity:</span>
                <span className="text-slate-900 font-mono font-bold">888 Bytes NDEF</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-500 font-bold">Material Finish:</span>
                <span className="text-slate-900 font-bold">{product.material}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-500 font-bold">QR Backup:</span>
                <span className="text-emerald-700 font-mono font-bold">Universal Dynamic QR</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-8 rounded-3xl bg-white border border-slate-200/90 space-y-4 shadow-xl">
            <h3 className="text-xl font-extrabold text-slate-900 font-manrope">Verified Customer Reviews</h3>
            <div className="space-y-3">
              {(product.reviews || []).length === 0 ? (
                <p className="text-xs text-slate-500 font-inter italic">No reviews submitted yet. Be the first to review!</p>
              ) : (
                product.reviews.map((r, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900 font-manrope">{r.user_name}</span>
                      <span className="text-amber-500 font-mono font-bold">★ {r.rating}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-inter italic">"{r.comment}"</p>
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
