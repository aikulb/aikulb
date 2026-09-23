import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Users, BarChart2, ArrowRight } from 'lucide-react';

export const BusinessTeamsSection = () => {
  return (
    <section id="teams" className="py-24 bg-[#F8F9FA] border-t border-slate-200 relative transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-manrope tracking-tight">
            ai klub for Teams & Enterprises
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-inter font-medium leading-relaxed">
            Equip your sales team, executives, and employees with standardized NFC smart cards, central identity management, and team-wide lead capture analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-inter mb-10">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition">
            <Building2 className="w-6 h-6 text-[#6C4CFF] mb-3" />
            <h4 className="font-bold text-slate-900 text-lg font-manrope">Centralized Dashboard</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">Manage 10 to 1,000+ employee digital profiles in one click.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition">
            <BarChart2 className="w-6 h-6 text-[#8B5CF6] mb-3" />
            <h4 className="font-bold text-slate-900 text-lg font-manrope">Team Lead CRM</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">Aggregate all leads collected by field sales representatives in real time.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition">
            <Shield className="w-6 h-6 text-emerald-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-lg font-manrope">Card Security</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">Instantly enable or disable employee cards when team members transition.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition">
            <Users className="w-6 h-6 text-amber-600 mb-3" />
            <h4 className="font-bold text-slate-900 text-lg font-manrope">Brand Consistency</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">Ensure every employee shares official corporate branding and logos.</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/create-profile"
            className="btn-pill-gradient inline-flex items-center space-x-2 shadow-xl"
          >
            <span>Build Your Team Plan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
