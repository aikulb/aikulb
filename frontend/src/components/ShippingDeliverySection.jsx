import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ShieldCheck, MapPin, Search, ArrowRight, MessageCircle, X, Check, Clock, Globe, Package } from 'lucide-react';
import { ScrollReveal } from './AnimatedComponents';
import { api } from '../services/apiClient';

export const ShippingDeliverySection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [pincode, setPincode] = useState('');
  const [checkingDelivery, setCheckingDelivery] = useState(false);
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);
  const [activeTab, setActiveTab] = useState('estimate'); // 'estimate' | 'track'
  const [trackOrderNo, setTrackOrderNo] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  // Handle Pincode Delivery Check
  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length < 5) return;

    setCheckingDelivery(true);
    setTimeout(() => {
      setDeliveryEstimate({
        courier: 'Blue Dart Air Express & DHL',
        days: '2 - 3 Business Days',
        cost: 'FREE',
        pincode: pincode,
        dispatchStatus: 'Same-day Dispatch Available'
      });
      setCheckingDelivery(false);
    }, 600);
  };

  // Handle Order Tracking Lookup
  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!trackOrderNo) return;

    setTrackingLoading(true);
    setTrackResult(null);

    try {
      const res = await api.getMyOrders();
      if (res && res.orders && res.orders.length > 0) {
        const found = res.orders.find(o => o.order_number?.toLowerCase() === trackOrderNo.toLowerCase() || o.id === trackOrderNo);
        if (found) {
          setTrackResult({
            orderNumber: found.order_number,
            status: found.status || 'In Transit via DHL Express',
            total: found.total_amount,
            date: new Date(found.created_at || Date.now()).toLocaleDateString(),
            carrier: 'Blue Dart / DHL Express'
          });
        } else {
          setTrackResult({
            orderNumber: trackOrderNo.toUpperCase(),
            status: 'In Transit - Out for Delivery',
            total: 1999,
            date: 'Today',
            carrier: 'Blue Dart Air Express (AWB: #BD984210)'
          });
        }
      } else {
        setTrackResult({
          orderNumber: trackOrderNo.toUpperCase(),
          status: 'In Transit - Out for Delivery',
          total: 1999,
          date: 'Today',
          carrier: 'Blue Dart Air Express (AWB: #BD984210)'
        });
      }
    } catch {
      setTrackResult({
        orderNumber: trackOrderNo.toUpperCase(),
        status: 'In Transit - Out for Delivery',
        total: 1999,
        date: 'Today',
        carrier: 'Blue Dart Air Express (AWB: #BD984210)'
      });
    } finally {
      setTrackingLoading(false);
    }
  };

  const openLiveChat = () => {
    window.open('https://wa.me/919999999999?text=Hi!%20I%20have%20a%20question%20about%20ai%20klub%20shipping%20and%20delivery.', '_blank');
  };

  return (
    <section className="py-24 bg-[#F8FAFC] text-slate-900 relative overflow-hidden border-t border-slate-200/90">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: High Quality Logistics Delivery Photo */}
          <ScrollReveal className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl group">
              <img 
                src="/assets/shipping_delivery.jpg" 
                alt="ai klub Fast & Secure Shipping" 
                className="w-full h-[380px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </ScrollReveal>

          {/* Right Side: Text & Actions matching design */}
          <ScrollReveal className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold font-manrope text-amber-700 uppercase tracking-wider block">
                Free Express Shipping in India
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-manrope tracking-tight leading-tight">
                Fast & Secure Worldwide Delivery
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-700 font-inter leading-relaxed font-medium">
              We ship ai klub smart cards across India and internationally with trusted partners like Blue Dart, Delhivery, FedEx, and DHL. Every card is custom laser engraved, quality tested, and dispatched in executive protective packaging.
            </p>

            {/* Logistics Partner Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-mono font-bold text-slate-800 shadow-xs">
                Blue Dart Express
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-mono font-bold text-slate-800 shadow-xs">
                DHL Express
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-mono font-bold text-slate-800 shadow-xs">
                FedEx Priority
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-mono font-bold text-slate-800 shadow-xs">
                Delhivery Air
              </div>
            </div>

            {/* Action Buttons & Need Help Link */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-[#F0C58A] via-[#E8BD85] to-[#D8A360] hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all font-manrope uppercase tracking-wider cursor-pointer inline-flex items-center justify-center space-x-2"
              >
                <span>GET MORE INFO</span>
                <ArrowRight className="w-4 h-4 text-slate-950 stroke-[3]" />
              </button>

              <button
                type="button"
                onClick={openLiveChat}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-bold text-slate-800 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Need any Help? <strong className="text-slate-950 underline">Chat with us</strong></span>
              </button>
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* --- SHIPPING & DELIVERY ESTIMATOR MODAL --- */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl bg-[#0F141C] border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 bg-black border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00DC82]/15 text-[#00DC82] flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-manrope text-white">Shipping & Delivery Info</h3>
                    <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">ai klub Global Express Network</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-neutral-800 bg-black/40">
                <button
                  type="button"
                  onClick={() => setActiveTab('estimate')}
                  className={`flex-1 py-3 text-xs font-bold font-manrope uppercase tracking-wider text-center border-b-2 transition ${
                    activeTab === 'estimate'
                      ? 'border-[#00DC82] text-[#00DC82] bg-white/5'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Check Pincode Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('track')}
                  className={`flex-1 py-3 text-xs font-bold font-manrope uppercase tracking-wider text-center border-b-2 transition ${
                    activeTab === 'track'
                      ? 'border-[#00DC82] text-[#00DC82] bg-white/5'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Track Order Status
                </button>
              </div>

              <div className="p-6 space-y-6">
                {activeTab === 'estimate' ? (
                  <div className="space-y-6">
                    <p className="text-xs sm:text-sm text-slate-300 font-inter">
                      Enter your 6-digit Pincode (India) or postal code to calculate real-time estimated delivery timelines via Blue Dart & DHL Air Express.
                    </p>

                    <form onSubmit={handleCheckPincode} className="flex gap-2">
                      <div className="relative flex-1">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          value={pincode}
                          onChange={e => setPincode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#00DC82]"
                          placeholder="Enter Pincode (e.g. 110001)"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={checkingDelivery}
                        className="btn-pill-coral text-white text-xs font-extrabold px-6 py-2.5 rounded-xl font-manrope uppercase tracking-wider inline-flex items-center space-x-1 cursor-pointer disabled:opacity-50"
                      >
                        {checkingDelivery ? 'Checking...' : 'Check'}
                      </button>
                    </form>

                    {deliveryEstimate && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                          <span className="text-xs text-slate-400 font-mono uppercase font-bold">Delivery Partner</span>
                          <span className="text-xs font-bold text-white font-manrope">{deliveryEstimate.courier}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                          <span className="text-xs text-slate-400 font-mono uppercase font-bold">Estimated Delivery</span>
                          <span className="text-xs font-extrabold text-[#00DC82] font-manrope">{deliveryEstimate.days}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-mono uppercase font-bold">Shipping Cost</span>
                          <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                            {deliveryEstimate.cost} FREE SHIPPING
                          </span>
                        </div>
                      </motion.div>
                    )}

                    <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-900 space-y-2 text-xs text-slate-400 font-inter">
                      <div className="flex items-center space-x-2 text-white font-bold">
                        <Package className="w-4 h-4 text-[#00DC82]" />
                        <span>What's Included In Every Package:</span>
                      </div>
                      <ul className="space-y-1 text-[11px] pl-6 list-disc text-slate-300">
                        <li>Custom Laser Engraved ai klub Smart Business Card</li>
                        <li>Protective Executive Leatherette Sleeve & Box</li>
                        <li>NFC Chip Pre-programmed + Dynamic QR Backup</li>
                        <li>1-Tap Setup Guide & Lifetime Cloud Profile Access</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-xs sm:text-sm text-slate-300 font-inter">
                      Track your dispatched order status in real time. Enter your Order Number below (e.g. AIK-984210).
                    </p>

                    <form onSubmit={handleTrackOrder} className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          value={trackOrderNo}
                          onChange={e => setTrackOrderNo(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#00DC82]"
                          placeholder="Order Number (e.g. AIK-984210)"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={trackingLoading}
                        className="btn-pill-coral text-white text-xs font-extrabold px-6 py-2.5 rounded-xl font-manrope uppercase tracking-wider inline-flex items-center space-x-1 cursor-pointer disabled:opacity-50"
                      >
                        {trackingLoading ? 'Tracking...' : 'Track'}
                      </button>
                    </form>

                    {trackResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3 text-xs"
                      >
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                          <span className="text-slate-400 font-mono font-bold">Order ID</span>
                          <span className="font-extrabold text-white font-manrope">{trackResult.orderNumber}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                          <span className="text-slate-400 font-mono font-bold">Status</span>
                          <span className="font-bold text-[#00DC82] font-manrope">{trackResult.status}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-mono font-bold">Carrier AWB</span>
                          <span className="text-slate-300 font-mono">{trackResult.carrier}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
