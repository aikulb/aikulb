import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Layout, Zap, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export const ChooseDashboardPage = () => {
  const navigate = useNavigate();
  const { user, loginAsDemoUser } = useAuth();

  const handleSelectClassic = async () => {
    if (!user) {
      await loginAsDemoUser();
    }
    navigate('/dashboard?mode=classic');
  };

  const handleSelectNew = async () => {
    if (!user) {
      await loginAsDemoUser();
    }
    navigate('/dashboard?mode=new');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-36 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center">
        {/* Header */}
        <div className="space-y-4 mb-16 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF3838]/10 border border-[#FF3838]/20 text-[#FF3838] text-xs font-manrope font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FF3838]" />
            <span>Digital Identity Workspace</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 font-manrope tracking-tight">
            Choose Your Dashboard
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-inter">
            Select the experience that matches your workflow.
          </p>
        </div>

        {/* 2 Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Card 1: Classic Dashboard */}
          <div className="p-10 rounded-3xl bg-neutral-50 border border-neutral-200 hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between items-center text-center space-y-8 group shadow-sm hover:shadow-xl">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-800 mx-auto group-hover:scale-110 transition-transform">
                <Layout className="w-8 h-8 text-neutral-700" />
              </div>
              <h2 className="text-2xl font-extrabold text-neutral-900 font-manrope">Classic Dashboard</h2>
              <p className="text-sm text-neutral-600 font-inter leading-relaxed max-w-xs mx-auto">
                The original interface you know and trust. Stable, clean, and familiar profile management.
              </p>
            </div>

            <div className="w-full pt-4 border-t border-neutral-200">
              <button
                onClick={handleSelectClassic}
                className="w-full py-4 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 font-extrabold text-xs font-manrope uppercase tracking-wider border border-neutral-300 transition shadow-xs cursor-pointer"
              >
                CONTINUE TO CLASSIC
              </button>
            </div>
          </div>

          {/* Card 2: New Dashboard */}
          <div className="p-10 rounded-3xl bg-neutral-50 border border-[#FF3838]/30 hover:border-[#FF3838] transition-all duration-300 flex flex-col justify-between items-center text-center space-y-8 group shadow-sm hover:shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1 bg-[#FF3838] text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl shadow-md">
              RECOMMENDED 2026
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF3838] to-[#FF6B6B] text-white flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg shadow-[#FF3838]/25">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-neutral-900 font-manrope">New AI Dashboard</h2>
              <p className="text-sm text-neutral-600 font-inter leading-relaxed max-w-xs mx-auto">
                Enhanced speed, modern design, AI bio generator, real-time analytics, and advanced lead CRM features.
              </p>
            </div>

            <div className="w-full pt-4 border-t border-neutral-200">
              <button
                onClick={handleSelectNew}
                className="w-full py-4 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-extrabold text-xs font-manrope uppercase tracking-wider transition shadow-md shadow-[#FF3838]/20 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>ENTER NEW DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Direct Auth Link Footer */}
        <div className="mt-12 text-xs text-neutral-500 font-inter flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#FF3838]" />
          <span>Already registered? <button onClick={() => navigate('/auth?mode=login')} className="text-[#FF3838] font-bold hover:underline font-manrope">Login with Email & Password</button></span>
        </div>
      </main>

      <Footer />
    </div>
  );
};
