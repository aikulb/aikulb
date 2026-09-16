import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, Trash2, ShoppingBag, ArrowRight, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[9999] overflow-hidden">
          {/* Backdrop Blur Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-[10000]">
            {/* Drawer Slide-In Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white/95 backdrop-blur-md">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-2xl bg-[#6C4CFF]/10 text-[#6C4CFF]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold font-manrope text-slate-900 leading-tight">Your Cart</h2>
                    <span className="text-xs text-slate-500 font-mono">
                      {cartItems.reduce((a, b) => a + b.quantity, 0)} {cartItems.reduce((a, b) => a + b.quantity, 0) === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {cartItems.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer flex items-center space-x-1 text-xs font-bold font-manrope"
                      title="Clear Cart"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="p-6 flex-1 overflow-y-auto space-y-4 font-inter">
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-manrope">Your cart is empty</h3>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto">Explore aikulb NFC Cards and smart business identity products.</p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/store');
                      }}
                      className="px-6 py-3 rounded-full btn-pill-gradient text-white font-bold text-sm shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                      Browse Store Catalog
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.itemKey}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex space-x-4 items-center shadow-xs"
                    >
                      <div className="w-16 h-16 rounded-xl bg-slate-900 p-2 border border-slate-700 flex items-center justify-center shrink-0 overflow-hidden relative">
                        {item.image_url && (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                        )}
                        <div
                          className="w-full h-full items-center justify-center font-extrabold text-[10px] text-[#A78BFA] text-center font-manrope uppercase"
                          style={{ display: item.image_url ? 'none' : 'flex' }}
                        >
                          {item.name ? item.name.substring(0, 10) : 'CARD'}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 font-manrope truncate">{item.name}</h4>
                        <p className="text-xs text-slate-500 truncate">{item.material || 'NFC Smart Card'}</p>
                        {item.customConfig && (
                          <span className="inline-block mt-1 text-[10px] bg-[#6C4CFF]/15 text-[#6C4CFF] px-2 py-0.5 rounded border border-[#6C4CFF]/30 font-mono font-bold">
                            Custom Laser Engraved
                          </span>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-[#6C4CFF] text-sm font-manrope">₹{item.price * item.quantity}</span>
                          <div className="flex items-center space-x-2 bg-slate-200/80 rounded-lg px-2 py-1 border border-slate-300">
                            <button
                              onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                              className="text-slate-600 hover:text-slate-900 px-1 text-sm font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-slate-900 px-1">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                              className="text-slate-600 hover:text-slate-900 px-1 text-sm font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.itemKey)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-slate-200 transition cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-slate-200 bg-white/95 backdrop-blur-md space-y-4">
                  <div className="flex justify-between items-center text-sm text-slate-500 font-inter">
                    <span>Subtotal</span>
                    <span className="text-xl font-black text-slate-900 font-manrope">₹{subtotal}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-inter">Free nationwide express delivery across India.</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                    className="w-full py-4 rounded-full btn-pill-coral text-white font-bold text-base flex items-center justify-center space-x-2 shadow-xl hover:scale-[1.01] transition-transform cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
