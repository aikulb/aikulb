import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, Download, Globe, Linkedin, ArrowRight, Eye, 
  Touchpad as Touch, QrCode, UserCheck, Twitter, Facebook, 
  Instagram, Paperclip, ChevronRight 
} from 'lucide-react';
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

          {/* Right Interactive Mobile Phone Showcase Mockup */}
          <div className="lg:col-span-6 flex justify-center relative py-4">
            {/* Main Phone Mockup Element (Light Theme matching 1st Reference Image) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="w-full max-w-sm rounded-[42px] p-3 bg-[#0A0A0C] border-4 border-neutral-800 shadow-[0_25px_60px_rgba(0,0,0,0.4)] relative overflow-hidden z-10 select-none"
            >
              {/* Mobile Screen Header Notch */}
              <div className="w-28 h-4 bg-[#000000] rounded-b-xl mx-auto mb-2 border-x border-b border-neutral-800 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-black" />
              </div>

              {/* Screen Container - Pure White Theme */}
              <div className="w-full bg-[#FFFFFF] rounded-[32px] overflow-hidden border border-neutral-200 p-2.5 text-slate-900 space-y-2.5">
                {/* Header Red Curve Cap */}
                <div className="h-14 w-full bg-[#FF4545] rounded-b-[22px] relative overflow-hidden" />

                {/* Split Profile Header Card */}
                <div className="-mt-9 mx-1 rounded-2xl bg-[#090C15] border border-neutral-800 shadow-xl overflow-hidden flex items-stretch text-white">
                  <div className="w-24 bg-neutral-900 relative shrink-0 overflow-hidden border-r border-neutral-800">
                    <img
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400"
                      alt="Nicholas Perry"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 p-2.5 bg-[#0A0D17] flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-white text-sm font-manrope leading-tight">Nicholas<br />Perry</h3>
                      <p className="text-[10px] text-slate-300 font-inter mt-0.5 font-medium">Designer @ aiklub</p>
                    </div>
                    <div className="pt-1.5">
                      <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-red-500/15 border border-red-500/30 text-[#FF4545] text-[9px] font-bold">
                        <img src="/assets/logo.png" alt="aiklub" className="w-3 h-3 object-contain mix-blend-screen" />
                        <span>aiklub</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 px-1 pt-0.5">
                  <div className="w-full py-2 rounded-full bg-[#FF4545] hover:bg-[#e03838] text-white font-extrabold text-[11px] font-manrope shadow-xs flex items-center justify-center space-x-1 cursor-pointer">
                    <span>Save Contact</span>
                  </div>
                  <div className="w-full py-2 rounded-full bg-[#EAEFEF] text-[#1E293B] font-extrabold text-[11px] font-manrope shadow-xs flex items-center justify-center space-x-1 cursor-pointer">
                    <span>Share</span>
                  </div>
                </div>

                {/* ABOUT Section */}
                <div className="px-1">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">ABOUT</span>
                  <p className="text-[10px] text-slate-700 leading-relaxed font-inter font-medium">
                    With the smart business cards and digital cards, you will be able to reach your clients very easily and hassle-free.
                  </p>
                </div>

                <div className="border-b border-slate-100 my-1 mx-1" />

                {/* CONTACT ME Section */}
                <div className="px-1 space-y-1.5 font-inter text-[10px]">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">CONTACT ME</span>
                  
                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full border border-red-400/50 text-[#FF4545] flex items-center justify-center bg-red-50/50">
                        <Phone className="w-3 h-3" />
                      </div>
                      <span className="text-slate-800 font-semibold">149-219-4462</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full border border-red-400/50 text-[#FF4545] flex items-center justify-center bg-red-50/50">
                        <Mail className="w-3 h-3" />
                      </div>
                      <span className="text-slate-800 font-semibold truncate max-w-[150px]">nicholas@aiklub.com</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full border border-red-400/50 text-[#FF4545] flex items-center justify-center bg-red-50/50">
                        <Paperclip className="w-3 h-3" />
                      </div>
                      <span className="text-slate-800 font-semibold">www.aiklub.com</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                <div className="border-b border-slate-100 my-1 mx-1" />

                {/* ON THE SOCIAL Section */}
                <div className="px-1">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1.5">ON THE SOCIAL</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-[#FF4545] text-white flex items-center justify-center shadow-xs">
                      <Linkedin className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#FF4545] text-white flex items-center justify-center shadow-xs">
                      <Twitter className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#FF4545] text-white flex items-center justify-center shadow-xs">
                      <Facebook className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#FF4545] text-white flex items-center justify-center shadow-xs">
                      <Instagram className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom Tab Navigation Pills */}
                <div className="pt-2 px-1 pb-1 flex items-center justify-between gap-1.5">
                  <div className="flex-1 py-1.5 px-1 rounded-full bg-[#FF4545] text-white text-[9px] font-bold text-center shadow-xs">
                    SERVICES
                  </div>
                  <div className="flex-1 py-1.5 px-1 rounded-full bg-[#EAEFEF] text-slate-700 text-[9px] font-bold text-center">
                    GALLERY
                  </div>
                  <div className="flex-1 py-1.5 px-1 rounded-full bg-[#EAEFEF] text-slate-700 text-[9px] font-bold text-center">
                    TESTIMONIALS
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
