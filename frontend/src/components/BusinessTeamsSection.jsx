import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Users, BarChart2, ArrowRight } from 'lucide-react';

export const BusinessTeamsSection = () => {
  return (
    <section id="teams" className="py-24 bg-[#F7F7F5] dark:bg-[#090909] border-t border-slate-200 dark:border-slate-800/80 relative transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-mono font-bold uppercase tracking-wider">
              Enterprise Solution
            </div>
            <h2 className="section-h2 text-slate-900 dark:text-white">
              aikulb for Teams & Enterprises
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-inter">
              Equip your sales team, executives, and employees with standardized NFC smart cards, central identity management, and team-wide lead capture analytics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-inter">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-slate-800">
                <Building2 className="w-5 h-5 text-[#6C4CFF] mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base font-manrope">Centralized Dashboard</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage 10 to 1,000+ employee digital profiles in one click.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-slate-800">
                <BarChart2 className="w-5 h-5 text-[#8B5CF6] mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base font-manrope">Team Lead CRM</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Aggregate all leads collected by field sales representatives in real time.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-slate-800">
                <Shield className="w-5 h-5 text-emerald-500 mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base font-manrope">Card Locking & Security</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Instantly enable or disable employee cards when team members transition.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-slate-800">
                <Users className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base font-manrope">Brand Consistency</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ensure every employee shares official corporate branding and logos.</p>
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
          <div className="lg:col-span-6 p-8 rounded-3xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4 font-manrope">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Executive Team Portal</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">12 Active Members • 482 Leads Generated</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                ENTERPRISE SLA
              </span>
            </div>

            <div className="space-y-3 font-inter">
              {[
                { name: 'Sarah Jenkins', role: 'VP Enterprise Sales', views: '840 Taps', leads: '34 Leads' },
                { name: 'David Miller', role: 'Head of Growth', views: '620 Taps', leads: '28 Leads' },
                { name: 'Elena Rostova', role: 'Solutions Architect', views: '410 Taps', leads: '19 Leads' },
              ].map((m, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#F7F7F5] dark:bg-[#1A1A1A] border border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white font-manrope">{m.name}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">{m.role}</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-[#6C4CFF] font-bold">{m.views}</div>
                    <div className="text-[#8B5CF6]">{m.leads}</div>
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
