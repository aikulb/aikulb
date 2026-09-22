import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, ShieldCheck, Cpu, Globe, Zap } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimatedComponents';
import { AikulbLogo } from './AikulbLogo';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-black border-t border-neutral-900 text-slate-400 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand & Newsletter */}
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-neutral-900">
          <div className="lg:col-span-5 space-y-5">
            <AikulbLogo size="lg" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              ai klub is the next-generation smart networking platform offering NFC-enabled digital business cards, smart stands, QR products, digital profiles, lead capture, and team networking solutions.
            </p>
            <div className="flex items-center space-x-5 text-xs text-slate-400 pt-1">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00DC82]" />
                <span>Encrypted Identity</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-[#00DC82]" />
                <span>Instant Tap NFC</span>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00DC82]/10 text-[#00DC82] text-xs font-semibold mb-3 border border-[#00DC82]/20">
                <Zap className="w-3.5 h-3.5" />
                <span>Stay Connected</span>
              </div>
              <h4 className="text-xl font-heading font-extrabold text-white tracking-tight">Get the Latest ai klub Updates</h4>
              <p className="text-xs text-slate-400 mt-1">
                Subscribe for exclusive smart hardware drops, platform features, and networking insights.
              </p>
            </div>
            {subscribed ? (
              <div className="mt-4 p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-[#00DC82] text-sm font-semibold flex items-center space-x-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-[#00DC82]" />
                <span>Thank you! You are subscribed to ai klub Insider updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-5 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-full bg-black border border-neutral-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#00DC82] text-sm font-medium"
                />
                <button
                  type="submit"
                  className="bg-[#00DC82] hover:bg-[#00c975] text-black font-extrabold text-sm flex items-center justify-center space-x-2 px-6 py-3 rounded-full cursor-pointer transition-all shadow-lg font-manrope uppercase tracking-wide"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4 text-black" />
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>

        {/* Links Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-neutral-900 text-xs sm:text-sm" staggerDelay={0.06}>
          <StaggerItem>
            <h5 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-4">Products</h5>
            <ul className="space-y-2.5">
              <li><Link to="/metal-card" className="hover:text-[#00DC82] transition">Metal NFC Cards</Link></li>
              <li><Link to="/store?cat=cat-wood" className="hover:text-[#00DC82] transition">Wooden Smart Cards</Link></li>
              <li><Link to="/store?cat=cat-pvc" className="hover:text-[#00DC82] transition">PVC Smart Cards</Link></li>
              <li><Link to="/store?cat=cat-stand" className="hover:text-[#00DC82] transition">Smart NFC Stands</Link></li>
              <li><Link to="/store?cat=cat-review" className="hover:text-[#00DC82] transition">Review Smart Cards</Link></li>
              <li><Link to="/customize" className="text-[#00DC82] font-bold hover:underline">Custom Card Designer</Link></li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h5 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-4">Solutions</h5>
            <ul className="space-y-2.5">
              <li><Link to="/metal-card" className="hover:text-[#00DC82] transition">For Executives & CEOs</Link></li>
              <li><Link to="/store" className="hover:text-[#00DC82] transition">For Real Estate Brokers</Link></li>
              <li><Link to="/store" className="hover:text-[#00DC82] transition">For Doctors & Clinics</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#00DC82] transition">Corporate Teams Solutions</Link></li>
              <li><Link to="/store" className="hover:text-[#00DC82] transition">Google Review Automation</Link></li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h5 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-4">Company</h5>
            <ul className="space-y-2.5">
              <li><Link to="/" className="hover:text-[#00DC82] transition">About ai klub</Link></li>
              <li><Link to="/contact" className="hover:text-[#00DC82] transition">Careers</Link></li>
              <li><Link to="/store" className="hover:text-[#00DC82] transition">Blog & Insights</Link></li>
              <li><Link to="/contact" className="hover:text-[#00DC82] transition">Press Kit</Link></li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h5 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-4">Support & WhatsApp</h5>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="https://wa.me/917799529358?text=Hi%20ai%20klub!%20I%20have%20a%20question%20about%20NFC%20cards." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#00DC82] font-extrabold hover:underline flex items-center gap-1.5"
                >
                  <span>WhatsApp: +91 77995 29358</span>
                </a>
              </li>
              <li><a href="tel:+917799529358" className="hover:text-[#00DC82] transition font-mono font-bold text-white">+91 77995 29358</a></li>
              <li><Link to="/contact" className="hover:text-[#00DC82] transition">Help Center & FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-[#00DC82] transition">Shipping & Delivery</Link></li>
              <li><Link to="/contact" className="hover:text-[#00DC82] transition">Contact Support</Link></li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h5 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-4">Legal</h5>
            <ul className="space-y-2.5">
              <li><Link to="/contact" className="hover:text-[#00DC82] transition">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-[#00DC82] transition">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-[#00DC82] transition">Data Security</Link></li>
              <li><Link to="/contact" className="hover:text-[#00DC82] transition">Refund Policy</Link></li>
            </ul>
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} ai klub Inc. All rights reserved. Your Identity. One Tap.</p>

          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5"><Globe className="w-3.5 h-3.5 text-[#00DC82]" /> <span>Global Edition</span></span>
            <span>Made with precision for modern professionals.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
