import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Users, BarChart2, ArrowRight } from 'lucide-react';

export const BusinessTeamsSection = () => {
  return (
    <section id="teams" className="py-24 bg-[#FAFAFC] border-t border-slate-200/90 relative text-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-manrope tracking-tight">
            ai klub for Teams & Enterprises
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-inter font-medium leading-relaxed">
            Equip your sales team, executives, and employees with standardized NFC smart cards, central identity management, and team-wide lead capture analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-inter mb-12">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:border-red-300 hover:shadow-md transition-all duration-300">
            <Building2 className="w-6 h-6 text-[#FF3B3B] mb-3" />
            <h4 className="font-bold text-slate-900 text-lg font-manrope">Centralized Dashboard</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">Manage 10 to 1,000+ employee digital profiles in one click.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:border-red-300 hover:shadow-md transition-all duration-300">
            <BarChart2 className="w-6 h-6 text-[#FF3B3B] mb-3" />
            <h4 className="font-bold text-slate-900 text-lg font-manrope">Team Lead CRM</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">Aggregate all leads collected by field sales representatives in real time.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:border-red-300 hover:shadow-md transition-all duration-300">
            <Shield className="w-6 h-6 text-[#FF3B3B] mb-3" />
            <h4 className="font-bold text-slate-900 text-lg font-manrope">Card Security</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">Instantly enable or disable employee cards when team members transition.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-2 hover:border-red-300 hover:shadow-md transition-all duration-300">
            <Users className="w-6 h-6 text-[#FF3B3B] mb-3" />
            <h4 className="font-bold text-slate-900 text-lg font-manrope">Brand Consistency</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">Ensure every employee shares official corporate branding and logos.</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/create-profile"
            className="bg-gradient-to-r from-[#FF4D4D] via-[#FF3B3B] to-[#FF4D4D] hover:brightness-110 text-white font-extrabold tracking-wider uppercase px-8 py-4 rounded-full shadow-lg shadow-red-500/25 transition-all hover:scale-105 inline-flex items-center space-x-3 cursor-pointer text-xs font-manrope"
          >
            <span>Build Your Team Plan</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
