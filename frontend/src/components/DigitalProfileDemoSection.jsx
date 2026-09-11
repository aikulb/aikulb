import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, Download, Globe, Linkedin, ArrowRight, Eye, Touchpad as Touch, QrCode, UserCheck } from 'lucide-react';
import { ScrollReveal } from './AnimatedComponents';

export const DigitalProfileDemoSection = () => {
  return (
    <section className="py-24 bg-[#F8F9FA] text-slate-900 border-t border-slate-200 relative overflow-hidden">
      {/* Ambient Violet Glow */}
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_50%_50%,rgba(108,76,255,0.12),transparent_60%)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Info Column */}
          <ScrollReveal className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#6C4CFF]/10 border border-[#6C4CFF]/20 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
              Smart Cloud Profile Engine
            </div>
            <h2 className="section-h2 text-slate-900 font-extrabold">
              One Digital Profile.<br />
              <span className="aikulb-gradient-text">Infinite Opportunities.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-inter font-medium leading-relaxed">
              When someone taps your aikulb NFC card, your dynamic digital identity opens immediately in their mobile browser. No recipient app installation needed.
            </p>

            <ul className="space-y-3.5 text-sm text-slate-700 font-inter font-medium">
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-[#6C4CFF]/15 text-[#6C4CFF] flex items-center justify-center font-bold text-xs">✓</div>
                <span>1-Tap VCF Contact Download directly into smartphone address book.</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-[#6C4CFF]/15 text-[#6C4CFF] flex items-center justify-center font-bold text-xs">✓</div>
                <span>Direct WhatsApp, Call, Email, and Social Media routing.</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-[#6C4CFF]/15 text-[#6C4CFF] flex items-center justify-center font-bold text-xs">✓</div>
                <span>Embed PDF brochures, Calendly booking links, and service pricing.</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-[#6C4CFF]/15 text-[#6C4CFF] flex items-center justify-center font-bold text-xs">✓</div>
                <span>Built-in Lead Capture CRM form to collect client contact details.</span>
              </li>
            </ul>

            <div className="pt-4">
              <Link
                to="/profile/john"
                target="_blank"
                className="btn-pill-gradient inline-flex items-center space-x-2 shadow-xl hover:scale-105 transition-transform"
              >
                <span>View Demo Public Profile (/profile/john)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Right Interactive Mobile Phone Showcase Mockup (Requirement 12: opacity 0->1, scale 0.9->1, y 30px->0) */}
          <div className="lg:col-span-6 flex justify-center relative">
            
            {/* Surrounding Floating Analytics Widgets (Requirement 12) */}
            {/* Widget 1: Profile Views */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              animate={{ y: [0, -6, 0] }}
              /* repeat floating animation */
              style={{ animation: 'floatWidget 4s ease-in-out infinite' }}
              className="absolute -top-6 -left-4 sm:left-2 z-20 bg-[#161618]/90 border border-purple-500/40 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-inter"
            >
              <div className="p-1.5 rounded-xl bg-purple-500/20 text-purple-300">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase font-mono">PROFILE VIEWS</p>
                <p className="font-black text-white font-manrope text-xs">1,480 Taps</p>
              </div>
            </motion.div>

            {/* Widget 2: NFC Taps */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-20 -right-4 sm:right-0 z-20 bg-[#161618]/90 border border-cyan-500/40 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-inter"
            >
              <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-300">
                <Touch className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase font-mono">INSTANT TAP</p>
                <p className="font-black text-white font-manrope text-xs">100% Verified</p>
              </div>
            </motion.div>

            {/* Widget 3: QR Scans */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute bottom-24 -left-4 sm:left-4 z-20 bg-[#161618]/90 border border-blue-500/40 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-inter"
            >
              <div className="p-1.5 rounded-xl bg-blue-500/20 text-blue-300">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase font-mono">DYNAMIC QR</p>
                <p className="font-black text-white font-manrope text-xs">Scan & Save</p>
              </div>
            </motion.div>

            {/* Widget 4: Leads Captured */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -bottom-4 -right-2 sm:right-6 z-20 bg-[#161618]/90 border border-emerald-500/40 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-inter"
            >
              <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-300">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase font-mono">LEADS CAPTURED</p>
                <p className="font-black text-white font-manrope text-xs">+342 CRM Contacts</p>
              </div>
            </motion.div>

            {/* Main Phone Mockup Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="w-full max-w-sm rounded-[42px] p-4 bg-[#111111] border-4 border-neutral-800 shadow-[0_25px_60px_rgba(108,76,255,0.3)] relative overflow-hidden z-10"
            >
              {/* Mobile Screen Header Notch */}
              <div className="w-32 h-5 bg-[#1A1A1A] rounded-b-2xl mx-auto mb-4 border-x border-b border-neutral-800 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-black" />
              </div>

              {/* Profile Avatar Header */}
              <div className="text-center space-y-3 px-4">
                <div className="relative w-20 h-20 mx-auto rounded-full p-1 aikulb-gradient-bg">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                    alt="John Doe"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#111111]" />
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
