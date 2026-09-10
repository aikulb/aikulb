import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageSquare, Download, Globe, Linkedin, ArrowRight } from 'lucide-react';

export const DigitalProfileDemoSection = () => {
  return (
    <section className="py-24 bg-[#090909] text-white relative overflow-hidden">
      {/* Ambient Violet Glow */}
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_50%_50%,rgba(108,76,255,0.22),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#6C4CFF]/20 border border-[#6C4CFF]/30 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
              Smart Cloud Profile Engine
            </div>
            <h2 className="section-h2 text-white">
              One Digital Profile.<br />
              <span className="aikulb-gradient-text">Infinite Opportunities.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-inter leading-relaxed">
              When someone taps your aikulb NFC card, your dynamic digital identity opens immediately in their mobile browser. No recipient app installation needed.
            </p>

            <ul className="space-y-3.5 text-sm text-slate-300 font-inter">
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-[#6C4CFF]/30 text-[#6C4CFF] flex items-center justify-center font-bold text-xs">✓</div>
                <span>1-Tap VCF Contact Download directly into smartphone address book.</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-[#6C4CFF]/30 text-[#6C4CFF] flex items-center justify-center font-bold text-xs">✓</div>
                <span>Direct WhatsApp, Call, Email, and Social Media routing.</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-[#6C4CFF]/30 text-[#6C4CFF] flex items-center justify-center font-bold text-xs">✓</div>
                <span>Embed PDF brochures, Calendly booking links, and service pricing.</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-[#6C4CFF]/30 text-[#6C4CFF] flex items-center justify-center font-bold text-xs">✓</div>
                <span>Built-in Lead Capture CRM form to collect client contact details.</span>
              </li>
            </ul>

            <div className="pt-4">
              <Link
                to="/profile/john"
                target="_blank"
                className="btn-pill-gradient inline-flex items-center space-x-2 shadow-xl"
              >
                <span>View Demo Public Profile (/profile/john)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Interactive Mobile Phone Showcase Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-[42px] p-4 bg-[#111111] border-4 border-neutral-800 shadow-[0_25px_60px_rgba(108,76,255,0.3)] relative overflow-hidden">
              {/* Mobile Screen Header Notch */}
              <div className="w-32 h-5 bg-[#1A1A1A] rounded-b-2xl mx-auto mb-4 border-x border-b border-neutral-800 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-black"></div>
              </div>

              {/* Profile Avatar Header */}
              <div className="text-center space-y-3 px-4">
                <div className="relative w-20 h-20 mx-auto rounded-full p-1 aikulb-gradient-bg">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                    alt="John Doe"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#111111]"></div>
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg font-manrope">John Doe</h3>
                  <p className="text-xs text-purple-300 font-medium font-inter">Founder & CEO • ABC Technologies</p>
                </div>
                <p className="text-[11px] text-slate-400 font-inter leading-tight">
                  Building next-gen AI platforms and smart hardware solutions.
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-4 gap-2 my-4 px-2 font-inter">
                <a href="tel:+1234567890" className="p-2.5 rounded-2xl bg-[#1A1A1A] border border-neutral-800 hover:border-[#6C4CFF] text-purple-300 flex flex-col items-center">
                  <Phone className="w-4 h-4 mb-1" />
                  <span className="text-[9px] font-bold">Call</span>
                </a>
                <a href="https://wa.me/15552345678" target="_blank" rel="noreferrer" className="p-2.5 rounded-2xl bg-[#1A1A1A] border border-neutral-800 hover:border-emerald-400 text-emerald-400 flex flex-col items-center">
                  <MessageSquare className="w-4 h-4 mb-1" />
                  <span className="text-[9px] font-bold">WhatsApp</span>
                </a>
                <a href="mailto:john@abctechnologies.com" className="p-2.5 rounded-2xl bg-[#1A1A1A] border border-neutral-800 hover:border-purple-400 text-purple-400 flex flex-col items-center">
                  <Mail className="w-4 h-4 mb-1" />
                  <span className="text-[9px] font-bold">Email</span>
                </a>
                <a href="/api/profile/vcf/john" download className="p-2.5 rounded-2xl aikulb-gradient-bg text-white font-bold flex flex-col items-center shadow-md">
                  <Download className="w-4 h-4 mb-1" />
                  <span className="text-[9px]">Save VCF</span>
                </a>
              </div>

              {/* Links & Services Section */}
              <div className="space-y-2 px-2 text-xs font-inter">
                <div className="p-3 rounded-2xl bg-[#1A1A1A] border border-neutral-800 flex justify-between items-center text-slate-200">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>Company Deck 2026.pdf</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </div>

                <div className="p-3 rounded-2xl bg-[#1A1A1A] border border-neutral-800 flex justify-between items-center text-slate-200">
                  <div className="flex items-center space-x-2">
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>Connect on LinkedIn</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>

              {/* Connect With Me Form Preview */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#1A1A1A] border border-[#6C4CFF]/30 text-center font-inter">
                <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider block mb-1 font-manrope">CONNECT WITH JOHN</span>
                <div className="space-y-1.5">
                  <input type="text" disabled placeholder="Your Name" className="w-full text-[10px] p-2 rounded-xl bg-black border border-neutral-800 text-slate-400" />
                  <button className="w-full text-[10px] py-2 rounded-full aikulb-gradient-bg text-white font-bold font-manrope">Submit Contact Inquiry</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
