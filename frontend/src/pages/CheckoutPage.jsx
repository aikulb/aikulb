import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useCart } from '../context/CartContext';
import { api } from '../services/apiClient';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, CreditCard, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI / Razorpay');
  const [placedOrder, setPlacedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setCouponError('');
    const res = await api.validateCoupon(couponCode);
    if (res.success) {
      setDiscountPercent(res.data.discount_percent);
      setCouponApplied(true);
    } else {
      setCouponError(res.message || 'Invalid coupon code');
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      items: cartItems,
      shipping_address: address,
      coupon_code: couponApplied ? couponCode : null,
      payment_method: paymentMethod,
    };

    const res = await api.createOrder(orderData);
    if (res.success) {
      setPlacedOrder(res.data);
      clearCart();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
    setLoading(false);
  };

  if (placedOrder) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-36 pb-24 max-w-2xl mx-auto px-4 w-full text-center space-y-6">
          <div className="p-10 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-extrabold text-neutral-900 font-manrope">Order Confirmed!</h1>
            <p className="text-sm text-neutral-600 font-inter">
              Thank you for choosing aikulb! Your order <strong>#{placedOrder.order_number}</strong> is now being processed.
            </p>
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 text-xs font-mono space-y-1 text-left">
              <div className="flex justify-between"><span className="text-neutral-500">Total Amount:</span><span className="text-[#FF3838] font-bold">₹{placedOrder.total_amount}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Payment Status:</span><span className="text-emerald-600 font-bold">{placedOrder.payment_status}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Method:</span><span className="text-neutral-800 font-bold">{placedOrder.payment_method}</span></div>
            </div>
            <div className="pt-4 flex justify-center space-x-4">
              <Link to="/dashboard" className="px-6 py-3 rounded-full bg-[#FF3838] text-white font-bold text-xs font-manrope">
                View in Dashboard
              </Link>
              <Link to="/store" className="px-6 py-3 rounded-full bg-neutral-100 text-neutral-800 font-bold text-xs font-manrope border border-neutral-300">
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-36 pb-24 text-center space-y-4 font-manrope">
          <ShoppingBag className="w-16 h-16 text-neutral-400 mx-auto" />
          <h2 className="text-2xl font-bold text-neutral-900">Your Cart is Empty</h2>
          <Link to="/store" className="inline-block px-6 py-3 rounded-full bg-[#FF3838] text-white font-bold text-xs shadow-md">
            Browse aikulb Store
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 font-manrope mb-8">Checkout & Shipping</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Address & Payment Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Address Box */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-xs">
              <h3 className="text-lg font-extrabold text-neutral-900 font-manrope">Shipping Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-inter">
                <div>
                  <label className="text-neutral-600 font-bold block mb-1 font-manrope">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:border-[#FF3838] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 font-bold block mb-1 font-manrope">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:border-[#FF3838] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 font-bold block mb-1 font-manrope">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:border-[#FF3838] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 font-bold block mb-1 font-manrope">Pincode / ZIP *</label>
                  <input
                    type="text"
                    required
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:border-[#FF3838] focus:outline-none"
                  />
                </div>
              </div>

              <div className="text-xs font-inter">
                <label className="text-neutral-600 font-bold block mb-1 font-manrope">Street Address *</label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:border-[#FF3838] focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method Box */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-xs">
              <h3 className="text-lg font-extrabold text-neutral-900 font-manrope">Payment Gateway Selection</h3>
              <div className="space-y-2 text-xs font-manrope">
                {['UPI / Razorpay', 'Credit or Debit Card', 'Cash on Delivery'].map((m) => (
                  <label
                    key={m}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === m ? 'border-[#FF3838] bg-[#FF3838]/10 text-neutral-900 font-extrabold' : 'border-neutral-200 bg-white text-neutral-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === m}
                        onChange={() => setPaymentMethod(m)}
                      />
                      <span>{m}</span>
                    </div>
                    <CreditCard className="w-4 h-4 text-[#FF3838]" />
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Order Summary */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xs">
            <h3 className="text-lg font-extrabold text-neutral-900 font-manrope">Order Summary</h3>

            <div className="space-y-3 max-h-60 overflow-y-auto font-inter">
              {cartItems.map((item) => (
                <div key={item.itemKey} className="flex justify-between items-center text-xs p-3 rounded-2xl bg-white border border-neutral-200">
                  <div>
                    <div className="font-bold text-neutral-900 font-manrope">{item.name}</div>
                    <div className="text-neutral-500">Qty: {item.quantity} • {item.material}</div>
                  </div>
                  <span className="font-mono font-bold text-[#FF3838]">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Coupon Box */}
            <div className="pt-4 border-t border-neutral-200 space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Coupon Code (e.g. AIKULB10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full bg-white border border-neutral-300 text-neutral-900 text-xs font-mono uppercase focus:outline-none focus:border-[#FF3838]"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs font-manrope transition"
                >
                  Apply
                </button>
              </div>
              {couponApplied && <div className="text-[11px] text-emerald-600 font-mono font-bold">Coupon Applied! ({discountPercent}% OFF)</div>}
              {couponError && <div className="text-[11px] text-red-500 font-mono font-bold">{couponError}</div>}
            </div>

            {/* Total Calculation */}
            <div className="pt-4 border-t border-neutral-200 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-900 font-black text-xl pt-3 border-t border-neutral-200 font-manrope">
                <span>Total Amount</span>
                <span className="text-[#FF3838]">₹{finalTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-bold text-sm shadow-lg shadow-[#FF3838]/20 flex items-center justify-center space-x-2 font-manrope transition cursor-pointer"
            >
              <span>{loading ? 'Processing Order...' : 'Complete & Pay Order'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};
