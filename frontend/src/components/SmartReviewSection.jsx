import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Smartphone, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const SmartReviewSection = () => {
  return (
    <section id="review-section" className="py-24 bg-[#FAFAFA] border-t border-slate-200 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Flow Column */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
                5-STAR REVIEW AUTOMATION
              </span>
              <div className="flex space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            {/* Workflow Visual Graphic */}
            <div className="space-y-4 font-inter">
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold text-xs font-mono">
                    01
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-manrope">Customer Taps Card / Stand</h4>
                    <p className="text-xs text-slate-500">Near-field tap or QR scan on smartphone</p>
                  </div>
                </div>
                <Zap className="w-5 h-5 text-amber-500 animate-pulse" />
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#6C4CFF]/15 text-[#6C4CFF] flex items-center justify-center font-bold text-xs font-mono">
                    02
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-manrope">Review Page Opens Instantly</h4>
                    <p className="text-xs text-slate-500">Redirects straight to your Google Business page</p>
                  </div>
                </div>
                <Smartphone className="w-5 h-5 text-[#6C4CFF]" />
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-bold text-xs font-mono">
                    03
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-manrope">5-Star Review Submitted</h4>
                    <p className="text-xs text-slate-500">Boost local SEO rank & customer trust</p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Right Description Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-mono font-bold uppercase tracking-wider">
              Smart Review Products
            </div>
            <h2 className="section-h2 text-slate-900">
              A Better Way to Get Google Reviews
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-inter leading-relaxed">
              Stop typing long URLs or asking customers verbally. Hand them an aikulb Review Card or place an aikulb Smart Stand on your countertop for instant 5-star Google feedback.
            </p>

            <ul className="space-y-3.5 text-sm text-slate-600 font-inter">
              <li className="flex items-center space-x-3">
                <span className="text-amber-500 font-bold">★</span>
                <span>Multiply your Google Business review volume by up to 10x.</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-amber-500 font-bold">★</span>
                <span>Works on all iPhone & Android smartphones without app download.</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-amber-500 font-bold">★</span>
                <span>Pre-programmed with your exact Google Place Review link.</span>
              </li>
            </ul>

            <div className="pt-4">
              <Link
                to="/store?cat=cat-review"
                className="btn-pill-gradient inline-flex items-center space-x-2 shadow-xl"
              >
                <span>Get aikulb Review Card (₹599)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
