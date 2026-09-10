import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Scale, Briefcase, Home, Code, Camera, Coffee, Users, ArrowRight } from 'lucide-react';

export const IndustrySolutionsSection = () => {
  const [selectedInd, setSelectedInd] = useState('Real Estate');
  const navigate = useNavigate();

  const industries = [
    { icon: Home, name: 'Real Estate', card: 'Black Metal NFC Card', desc: 'Share property catalogs, WhatsApp tour bookings, and client VCF contacts instantly.' },
    { icon: Stethoscope, name: 'Doctors & Clinics', card: 'Smart NFC Standee', desc: 'Allow patients to tap for clinic appointment booking & Google reviews.' },
    { icon: Scale, name: 'Lawyers & Legal', card: 'Gold Metal NFC Card', desc: 'Executive 24K Gold card with firm credentials and confidential appointment links.' },
    { icon: Briefcase, name: 'Consultants & CEOs', card: 'Matte Black Steel', desc: 'Share executive bio, pitch deck, Calendly meeting link, and VCF card.' },
    { icon: Code, name: 'IT Professionals', card: 'Silver Metal Card', desc: 'Direct links to GitHub, LinkedIn, portfolio, and tech resume.' },
    { icon: Camera, name: 'Creators & Freelancers', card: 'NFC Social Card', desc: 'Instant 1-tap follower growth for Instagram, YouTube, & Portfolio.' },
    { icon: Users, name: 'Sales Teams', card: 'Custom Corporate PVC', desc: 'Bulk team cards with centralized lead capture CRM dashboard.' },
    { icon: Coffee, name: 'Restaurants & Retail', card: 'Smart Review Stand', desc: 'Countertop tap for digital menus and 5-star Google review automation.' },
  ];

  const current = industries.find(i => i.name === selectedInd) || industries[0];

  return (
    <section id="industry" className="py-24 bg-white dark:bg-[#111111] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#6C4CFF]/10 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider">
            Tailored Industry Solutions
          </div>
          <h2 className="section-h2 text-slate-900 dark:text-white">
            Built for Your Profession
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-inter">
            Select your industry to see recommended aikulb products and profile configurations.
          </p>
        </div>

        {/* Industry Selector Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 font-manrope">
          {industries.map((ind) => {
            const IconC = ind.icon;
            const active = ind.name === selectedInd;
            return (
              <button
                key={ind.name}
                onClick={() => setSelectedInd(ind.name)}
                className={`px-4.5 py-2.5 rounded-full text-xs font-bold flex items-center space-x-2 transition ${
                  active
                    ? 'btn-pill-gradient shadow-md'
                    : 'bg-[#F7F7F5] dark:bg-[#090909] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#6C4CFF]'
                }`}
              >
                <IconC className="w-4 h-4" />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Industry Showcase Card */}
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-[#F7F7F5] dark:bg-[#090909] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-xs font-mono text-[#6C4CFF] font-bold uppercase tracking-widest">RECOMMENDED SOLUTION</span>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white font-manrope">{current.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-inter leading-relaxed">{current.desc}</p>
            <div className="inline-block px-3 py-1 rounded-full bg-white dark:bg-[#111111] border border-slate-200 dark:border-slate-800 text-purple-600 dark:text-purple-300 text-xs font-mono font-bold">
              Recommended Hardware: {current.card}
            </div>
          </div>

          <button
            onClick={() => navigate('/store')}
            className="btn-pill-primary whitespace-nowrap flex items-center space-x-2 shadow-lg"
          >
            <span>View {current.name} Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
