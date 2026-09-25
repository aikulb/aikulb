import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Users, BarChart2, ArrowRight } from 'lucide-react';
import { MagneticButton, ScrollReveal } from './AnimatedComponents';

export const BusinessTeamsSection = () => {
  return (
    <section id="teams" className="py-24 bg-white border-t border-slate-200/90 relative text-slate-900 transition-colors duration-300 overflow-hidden select-none">
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <ScrollReveal className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[10px] font-mono font-bold tracking-widest uppercase">
            <span>FOR CORPORATES, SALES TEAMS & ENTERPRISES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-manrope tracking-tight">
            ai klub for Teams & Enterprises
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-inter font-medium leading-relaxed">
            Equip your sales team, executives, and employees with standardized NFC smart cards, central identity management, and team-wide lead capture analytics.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-inter mb-14">
          
          <div className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-3 hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6 text-amber-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg font-manrope group-hover:text-amber-700 transition-colors">Centralized Dashboard</h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">Manage 10 to 1,000+ employee digital profiles in one click.</p>
          </div>

          <div className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-3 hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart2 className="w-6 h-6 text-amber-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg font-manrope group-hover:text-amber-700 transition-colors">Team Lead CRM</h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">Aggregate all leads collected by field sales representatives in real time.</p>
          </div>

          <div className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-3 hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg font-manrope group-hover:text-amber-700 transition-colors">Card Security</h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">Instantly enable or disable employee cards when team members transition.</p>
          </div>

          <div className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-3 hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg font-manrope group-hover:text-amber-700 transition-colors">Brand Consistency</h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">Ensure every employee shares official corporate branding and logos.</p>
          </div>

        </div>

        <div className="text-center flex justify-center">
          <MagneticButton strength={4}>
            <Link
              to="/create-profile"
              className="bg-gradient-to-r from-[#F0C58A] via-[#E8BD85] to-[#D8A360] hover:brightness-110 text-slate-950 font-black tracking-wider uppercase px-8 py-4 rounded-full shadow-lg hover:scale-105 inline-flex items-center space-x-3 cursor-pointer text-xs font-manrope"
            >
              <span>Build Your Team Plan</span>
              <ArrowRight className="w-4 h-4 stroke-[3] text-slate-950" />
            </Link>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
};
