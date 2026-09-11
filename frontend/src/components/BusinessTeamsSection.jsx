import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Users, BarChart2, ArrowRight } from 'lucide-react';

export const BusinessTeamsSection = () => {
  return (
    <section id="teams" className="py-24 bg-[#F8F9FA] border-t border-slate-200 relative transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
              Enterprise Solution
            </div>
            <h2 className="section-h2 text-slate-900 font-extrabold">
              aikulb for Teams & Enterprises
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-inter font-medium">
              Equip your sales team, executives, and employees with standardized NFC smart cards, central identity management, and team-wide lead capture analytics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-inter">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <Building2 className="w-5 h-5 text-[#6C4CFF] mb-2" />
                <h4 className="font-bold text-slate-900 text-base font-manrope">Centralized Dashboard</h4>
                <p className="text-xs text-slate-600 mt-1 font-medium">Manage 10 to 1,000+ employee digital profiles in one click.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <BarChart2 className="w-5 h-5 text-[#8B5CF6] mb-2" />
                <h4 className="font-bold text-slate-900 text-base font-manrope">Team Lead CRM</h4>
                <p className="text-xs text-slate-600 mt-1 font-medium">Aggregate all leads collected by field sales representatives in real time.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <Shield className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-base font-manrope">Card Locking & Security</h4>
                <p className="text-xs text-slate-600 mt-1 font-medium">Instantly enable or disable employee cards when team members transition.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <Users className="w-5 h-5 text-amber-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-base font-manrope">Brand Consistency</h4>
                <p className="text-xs text-slate-600 mt-1 font-medium">Ensure every employee shares official corporate branding and logos.</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/create-profile"
                className="btn-pill-gradient inline-flex items-center space-x-2 shadow-xl"
              >
                <span>Build Your Team Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Graphical Mockup */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4 font-manrope">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Executive Team Portal</h3>
                <p className="text-xs text-slate-500 font-inter font-medium">12 Active Members • 482 Leads Generated</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                ENTERPRISE SLA
              </span>
            </div>

            <div className="space-y-3 font-inter">
              {[
                { name: 'Sarah Jenkins', role: 'VP Enterprise Sales', views: '840 Taps', leads: '34 Leads' },
                { name: 'David Miller', role: 'Head of Growth', views: '620 Taps', leads: '28 Leads' },
                { name: 'Elena Rostova', role: 'Solutions Architect', views: '410 Taps', leads: '19 Leads' },
              ].map((m, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-slate-900 font-manrope">{m.name}</div>
                    <div className="text-slate-600 text-[11px] font-medium">{m.role}</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-[#6C4CFF] font-bold">{m.views}</div>
                    <div className="text-[#8B5CF6] font-bold">{m.leads}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
