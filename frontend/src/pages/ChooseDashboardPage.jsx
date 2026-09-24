import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Layout, Zap, ArrowRight, UserCheck } from 'lucide-react';

export const ChooseDashboardPage = () => {
  const navigate = useNavigate();
  const { user, loginAsDemoUser } = useAuth();

  const handleSelectClassic = () => {
    if (!user) {
      navigate('/auth?mode=login');
    } else {
      navigate('/dashboard?mode=classic');
    }
  };

  const handleSelectNew = () => {
    if (!user) {
      navigate('/auth?mode=login');
    } else {
      navigate('/dashboard?mode=new');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center">
        {/* Header */}
        <div className="space-y-4 mb-16 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#00875A] text-xs font-manrope font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#00875A]" />
            <span>Digital Identity Workspace</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 font-manrope tracking-tight">
            Choose Your Dashboard
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-inter font-medium">
            Select the experience that matches your workflow.
          </p>
        </div>

        {/* 2 Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Card 1: Classic Dashboard */}
          <div className="p-10 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-slate-300 transition-all duration-300 flex flex-col justify-between items-center text-center space-y-8 group shadow-sm hover:shadow-md">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 mx-auto group-hover:scale-110 transition-transform">
                <Layout className="w-8 h-8 text-slate-700" />
              </div>
              <h2 className="text-2xl font-extrabold text-neutral-900 font-manrope">Classic Dashboard</h2>
              <p className="text-sm text-slate-600 font-inter leading-relaxed max-w-xs mx-auto">
                The original interface you know and trust. Stable, clean, and familiar profile management.
              </p>
            </div>

            <div className="w-full pt-4 border-t border-slate-200">
              <button
                onClick={handleSelectClassic}
                className="w-full py-4 rounded-full bg-neutral-900 hover:bg-black text-white font-extrabold text-xs font-manrope uppercase tracking-wider border border-neutral-900 transition shadow-xs cursor-pointer"
              >
                CONTINUE TO CLASSIC
              </button>
            </div>
          </div>

          {/* Card 2: New Dashboard */}
          <div className="p-10 rounded-3xl bg-[#F8FAFC] border border-emerald-200 hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between items-center text-center space-y-8 group shadow-sm hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-r from-[#00DC82] to-[#059669] text-white font-mono text-[10px] font-black uppercase tracking-widest rounded-bl-2xl shadow-xs">
              RECOMMENDED
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00DC82] via-[#10B981] to-[#059669] text-white flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-md">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-neutral-900 font-manrope">New AI Dashboard</h2>
              <p className="text-sm text-slate-600 font-inter leading-relaxed max-w-xs mx-auto">
                Enhanced speed, modern design, AI bio generator, real-time analytics, and advanced lead CRM features.
              </p>
            </div>

            <div className="w-full pt-4 border-t border-slate-200">
              <button
                onClick={handleSelectNew}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#00DC82] via-[#10B981] to-[#059669] hover:brightness-105 text-white font-extrabold text-xs font-manrope uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>ENTER NEW DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Direct Auth Link Footer */}
        {!user && (
          <div className="mt-12 text-xs text-slate-500 font-inter">
            Need a quick demo?{' '}
            <button
              onClick={() => loginAsDemoUser().then(() => navigate('/dashboard'))}
              className="text-[#00875A] font-extrabold hover:underline inline-flex items-center space-x-1 cursor-pointer font-manrope"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Login as Demo User →</span>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
