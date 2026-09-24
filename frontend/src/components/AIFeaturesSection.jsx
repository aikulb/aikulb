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
    <section className="py-24 bg-gradient-to-b from-[#070A10] via-[#0B0F19] to-[#080C14] border-t border-slate-800/80 relative text-white transition-colors duration-300 overflow-hidden">
      {/* Subtle AI Networking Nodes Background */}
      <AiNodesBackground />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#00DC82]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="section-h2 text-white font-extrabold">
            AI Profile Assistant & Insights
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-inter font-medium">
            ai klub uses embedded AI to help you write high-converting bios, optimize link placements, and detect warm leads.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left AI Bio Generator Tool Demo */}
          <ScrollReveal yOffset={25} className="lg:col-span-6 p-8 rounded-3xl bg-[#0F172A]/90 backdrop-blur-md border border-slate-800/90 space-y-6 shadow-2xl text-white">
            <div className="flex items-center space-x-3 border-b border-slate-800/80 pb-4 font-manrope">
              <div className="p-2 rounded-xl bg-[#00DC82]/15 text-[#00DC82] border border-[#00DC82]/30">
                <Bot className="w-6 h-6 text-[#00DC82]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Test AI Bio Assistant</h3>
                <p className="text-xs text-slate-400 font-inter font-medium">Generate executive bios in 1 click</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-inter">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#0A0E18] border border-slate-700/80 text-white font-bold focus:outline-none focus:border-[#00DC82]"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Designation</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#0A0E18] border border-slate-700/80 text-white font-bold focus:outline-none focus:border-[#00DC82]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-manrope font-semibold">Tone Selection</label>
                <div className="flex space-x-2 font-manrope">
                  {['executive', 'creator', 'consultant'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-3.5 py-1.5 rounded-full capitalize text-xs border font-bold transition-all cursor-pointer ${
                        tone === t ? 'bg-[#00DC82] text-slate-950 border-transparent shadow-md' : 'bg-[#0A0E18] text-slate-300 border-slate-700'
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
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#00DC82] via-[#10B981] to-[#059669] hover:brightness-110 text-slate-950 font-black text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/40 transition-transform cursor-pointer font-manrope uppercase tracking-wider"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{loading ? 'Generating...' : 'Generate Bio with AI'}</span>
              </button>

              {generatedBio && (
                <div className="p-4 rounded-2xl bg-[#00DC82]/10 border border-[#00DC82]/30 text-[#00DC82] space-y-2 animate-in fade-in duration-300 font-inter">
                  <div className="text-[10px] font-mono uppercase font-bold text-[#00DC82]">AI GENERATED OUTPUT</div>
                  <p className="text-xs leading-relaxed font-medium">{generatedBio}</p>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Right AI Insights Cards */}
          <ScrollReveal yOffset={25} delay={0.15} className="lg:col-span-6 space-y-4 font-inter">
            <div className="p-6 rounded-3xl bg-[#0F172A]/90 backdrop-blur-md border border-slate-800/90 shadow-2xl flex space-x-4 hover:border-[#00DC82]/40 transition-all duration-300">
              <div className="p-3 rounded-2xl bg-[#00DC82]/15 text-[#00DC82] border border-[#00DC82]/30 h-fit shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-base font-manrope">WhatsApp Engagement Spike</h4>
                  <span className="text-xs font-mono font-bold text-[#00DC82] bg-[#00DC82]/15 px-2.5 py-0.5 rounded-full border border-[#00DC82]/30">+38% Clicks</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed font-medium">
                  Your WhatsApp button receives 38% more clicks than your email button. Consider setting WhatsApp as your primary hero action button.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0F172A]/90 backdrop-blur-md border border-slate-800/90 shadow-2xl flex space-x-4 hover:border-[#00DC82]/40 transition-all duration-300">
              <div className="p-3 rounded-2xl bg-[#00DC82]/15 text-[#00DC82] border border-[#00DC82]/30 h-fit shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-base font-manrope">High-Intent Lead Detected</h4>
                  <span className="text-xs font-mono font-bold text-[#00DC82] bg-[#00DC82]/15 px-2.5 py-0.5 rounded-full border border-[#00DC82]/30">Hot Lead</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed font-medium">
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
