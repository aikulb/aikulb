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
                <span>View Demo Public Profile</span>
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
              className="w-full max-w-sm rounded-[42px] p-3 bg-[#0A0A0C] border-4 border-neutral-800 shadow-[0_25px_60px_rgba(108,76,255,0.3)] relative overflow-hidden z-10 select-none text-white"
            >
              {/* Mobile Screen Header Notch */}
              <div className="w-28 h-4 bg-[#000000] rounded-b-xl mx-auto mb-2 border-x border-b border-neutral-800 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-black" />
              </div>

              {/* Screen Container */}
              <div className="w-full bg-[#080B11] rounded-[32px] overflow-hidden border border-neutral-800 pb-3">
                {/* Red Curved Header Cap */}
                <div className="h-14 w-full bg-gradient-to-r from-[#FF4D4D] via-[#FF3838] to-[#E62E2E] rounded-b-[24px] relative overflow-hidden" />

                {/* Split Profile Header Card */}
                <div className="-mt-7 mx-3 rounded-2xl bg-[#0F1420] border border-neutral-800 shadow-xl overflow-hidden flex items-stretch">
                  <div className="w-24 bg-neutral-900 relative shrink-0 overflow-hidden border-r border-neutral-800">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
                      alt="Nicholas Perry"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 p-2.5 bg-[#0B0E17] flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-white text-sm font-manrope leading-snug">Nicholas Perry</h3>
                      <p className="text-[10px] text-slate-300 font-inter mt-0.5">Designer @ aikulb</p>
                    </div>
                    <div className="pt-2">
                      <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-[#FF4D4D]/15 border border-[#FF4D4D]/30 text-[#FF4D4D] text-[9px] font-bold">
                        <img src="/assets/logo.png" alt="aikulb" className="w-3 h-3 object-contain" />
                        <span>aikulb</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-3 px-3">
                  <a
                    href="/api/profile/vcf/john"
                    download
                    className="w-full py-2 rounded-full bg-gradient-to-r from-[#FF4D4D] to-[#FF3838] text-white font-extrabold text-[11px] font-manrope shadow flex items-center justify-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save Contact</span>
                  </a>
                  <Link
                    to="/profile/john"
                    target="_blank"
                    className="w-full py-2 rounded-full bg-[#E2E8F0] text-[#0F172A] font-extrabold text-[11px] font-manrope shadow flex items-center justify-center space-x-1"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#0F172A]" />
                    <span>Share</span>
                  </Link>
                </div>

                {/* ABOUT Section */}
                <div className="mt-3 px-3">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">ABOUT</span>
                  <p className="p-2.5 rounded-xl bg-[#0F1420] border border-neutral-800 text-[10px] text-slate-300 leading-snug font-inter">
                    With the smart business cards and digital cards, you will be able to reach your clients very easily and hassle-free.
                  </p>
                </div>

                {/* CONTACT ME Section */}
                <div className="mt-3 px-3 space-y-1 font-inter text-[11px]">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">CONTACT ME</span>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#0F1420] border border-neutral-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full bg-[#FF4D4D]/15 text-[#FF4D4D] flex items-center justify-center">
                        <Phone className="w-3 h-3" />
                      </div>
                      <span>149-219-4462</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#0F1420] border border-neutral-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full bg-[#FF4D4D]/15 text-[#FF4D4D] flex items-center justify-center">
                        <Mail className="w-3 h-3" />
                      </div>
                      <span>nicholas@aikulb.com</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#0F1420] border border-neutral-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full bg-[#FF4D4D]/15 text-[#FF4D4D] flex items-center justify-center">
                        <Globe className="w-3 h-3" />
                      </div>
                      <span>www.aikulb.com</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
