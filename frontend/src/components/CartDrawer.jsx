import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F172A] border-l border-slate-800 text-slate-100 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold font-heading">Your Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto" />
                <h3 className="text-lg font-medium text-slate-300">Your cart is empty</h3>
                <p className="text-sm text-slate-500">Explore AIKULB NFC Cards and smart business identity products.</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/store');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-lg hover:shadow-cyan-500/25 transition"
                >
                  Browse Store
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.itemKey} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex space-x-4 items-center">
                  <div className="w-16 h-16 rounded-lg bg-slate-950 p-2 border border-slate-800 flex items-center justify-center">
                    <span className="font-bold text-xs text-cyan-400 text-center">{item.name.substring(0, 12)}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-white line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-slate-400">{item.material || 'NFC Smart Card'}</p>
                    {item.customConfig && (
                      <span className="inline-block mt-1 text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                        Custom Engraved
                      </span>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-cyan-400 text-sm">₹{item.price * item.quantity}</span>
                      <div className="flex items-center space-x-2 bg-slate-800 rounded-lg px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                          className="text-slate-400 hover:text-white px-1 text-sm font-bold"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                          className="text-slate-400 hover:text-white px-1 text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.itemKey)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-900/80 space-y-4">
              <div className="flex justify-between items-center text-sm text-slate-400">
                <span>Subtotal</span>
                <span className="text-lg font-extrabold text-white">₹{subtotal}</span>
              </div>
              <p className="text-xs text-slate-500">Shipping & taxes calculated at checkout.</p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-3.5 rounded-xl gradient-btn text-white font-bold text-base flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
