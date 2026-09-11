import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Hotel, Store, Scissors, Stethoscope, Calendar, ArrowRight } from 'lucide-react';
import { SmartStandVisual } from './ProductVisuals';

export const SmartStandSection = () => {
  const useCases = [
    { icon: Utensils, title: 'Restaurants & Cafes', desc: 'Tap for digital QR menu, online ordering, or review.' },
    { icon: Hotel, title: 'Hotels & Resorts', desc: 'Tap for room check-in, concierge links, & Wi-Fi credentials.' },
    { icon: Store, title: 'Retail Stores', desc: 'Tap for instant discount coupons & customer loyalty signup.' },
    { icon: Scissors, title: 'Salons & Spas', desc: 'Tap to book appointment slots or view service rate card.' },
    { icon: Stethoscope, title: 'Clinics & Doctors', desc: 'Tap to book consultations or view doctor profiles.' },
    { icon: Calendar, title: 'Events & Expos', desc: 'Tap for event agenda, speaker bios, and sponsor links.' },
  ];

  return (
    <section className="py-24 bg-[#F8F9FA] border-t border-slate-200 relative transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#6C4CFF]/10 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
              Smart Countertop Hardware
            </div>
            <h2 className="section-h2 text-slate-900 font-extrabold">
              aikulb Smart Standee
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-inter font-medium">
              Clear crystal acrylic desk stands embedded with dual NFC microchip + high resolution QR code for business receptions, retail counters, and venues.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 font-inter">
              {useCases.map((u, i) => {
                const IconComp = u.icon;
                return (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                    <div className="flex items-center space-x-2 text-[#6C4CFF]">
                      <IconComp className="w-4 h-4" />
                      <span className="font-bold text-slate-900 text-xs font-manrope">{u.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium">{u.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <Link
                to="/store?cat=cat-stand"
                className="btn-pill-gradient inline-flex items-center space-x-2 shadow-xl"
              >
                <span>Order Smart Stand (₹799)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md">
              <SmartStandVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
