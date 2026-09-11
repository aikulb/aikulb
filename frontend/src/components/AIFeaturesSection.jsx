import React, { useState } from 'react';
import { Sparkles, Bot, TrendingUp, Zap } from 'lucide-react';
import { api } from '../services/apiClient';
import { ScrollReveal, AiNodesBackground } from './AnimatedComponents';

export const AIFeaturesSection = () => {
  const [name, setName] = useState('Alex Vance');
  const [title, setTitle] = useState('VP of Innovation');
  const [company, setCompany] = useState('Nexa Robotics');
  const [tone, setTone] = useState('executive');
  const [generatedBio, setGeneratedBio] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateBio = async () => {
    setLoading(true);
    const res = await api.generateAiBio({ name, title, company, tone });
    if (res.success) {
      setGeneratedBio(res.data.bio);
    }
    setLoading(false);
  };

  return (
    <section className="py-24 bg-[#F8F9FA] border-t border-slate-200 relative transition-colors duration-300 overflow-hidden">
      {/* Subtle AI Networking Nodes Background */}
      <AiNodesBackground />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#6C4CFF]/10 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 inline mr-1 text-[#6C4CFF]" />
            <span>AI-Powered Networking Stack</span>
          </div>
          <h2 className="section-h2 text-slate-900 font-extrabold">
            AI Profile Assistant & Insights
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-inter font-medium">
            aikulb uses embedded AI to help you write high-converting bios, optimize link placements, and detect warm leads.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left AI Bio Generator Tool Demo */}
          <ScrollReveal yOffset={25} className="lg:col-span-6 p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl">
            <div className="flex items-center space-x-3 border-b border-slate-200 pb-4 font-manrope">
              <div className="p-2 rounded-xl bg-[#6C4CFF]/15 text-[#6C4CFF]">
                <Bot className="w-6 h-6 text-[#6C4CFF]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Test AI Bio Assistant</h3>
                <p className="text-xs text-slate-500 font-inter font-medium">Generate executive bios in 1 click</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-inter">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1 font-semibold">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#6C4CFF]"
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1 font-semibold">Designation</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-[#6C4CFF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-manrope font-semibold">Tone Selection</label>
                <div className="flex space-x-2 font-manrope">
                  {['executive', 'creator', 'consultant'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-3.5 py-1.5 rounded-full capitalize text-xs border font-bold transition-all ${
                        tone === t ? 'bg-slate-900 text-white border-transparent shadow-md' : 'bg-slate-50 text-slate-700 border-slate-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateBio}
                disabled={loading}
                className="w-full py-3.5 rounded-full btn-pill-gradient text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.01] transition-transform"
              >
                <Sparkles className="w-4 h-4 text-purple-200" />
                <span>{loading ? 'Generating...' : 'Generate Bio with AI'}</span>
              </button>

              {generatedBio && (
                <div className="p-4 rounded-2xl bg-[#6C4CFF]/10 border border-[#6C4CFF]/30 text-[#6C4CFF] space-y-2 animate-in fade-in duration-300 font-inter">
                  <div className="text-[10px] font-mono uppercase font-bold text-[#6C4CFF]">AI GENERATED OUTPUT</div>
                  <p className="text-xs leading-relaxed font-medium">{generatedBio}</p>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Right AI Insights Cards */}
          <ScrollReveal yOffset={25} delay={0.15} className="lg:col-span-6 space-y-4 font-inter">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl flex space-x-4 card-hover-elevation">
              <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-600 h-fit">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-base font-manrope">WhatsApp Engagement Spike</h4>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">+38% Clicks</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                  Your WhatsApp button receives 38% more clicks than your email button. Consider setting WhatsApp as your primary hero action button.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl flex space-x-4 card-hover-elevation">
              <div className="p-3 rounded-2xl bg-[#6C4CFF]/15 text-[#6C4CFF] h-fit">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-base font-manrope">High-Intent Lead Detected</h4>
                  <span className="text-xs font-mono font-bold text-[#6C4CFF] bg-[#6C4CFF]/10 px-2.5 py-0.5 rounded-full border border-[#6C4CFF]/30">Hot Lead</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                  Sarah Jenkins from Vertex Ventures viewed your profile 3 times in 24 hours and saved your contact card. Recommended action: Send direct follow-up.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
