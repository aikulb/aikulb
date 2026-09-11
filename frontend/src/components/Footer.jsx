import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, ShieldCheck, Cpu, Globe, Zap } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimatedComponents';

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
    <footer className="bg-[#F8F9FA] border-t border-slate-200 text-slate-600 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand & Newsletter with Scroll Reveal (Requirement 26) */}
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-200">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C4CFF] to-[#8B5CF6] p-0.5 shadow-md shadow-[#6C4CFF]/20">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-bold text-white text-sm tracking-tighter">
                  ak
                </div>
              </div>
              <span className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight">aikulb</span>
            </div>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              aikulb is the next-generation smart networking platform offering NFC-enabled digital business cards, smart stands, QR products, digital profiles, lead capture, and team networking solutions.
            </p>
            <div className="flex items-center space-x-5 text-xs text-slate-600 pt-1">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#6C4CFF]" />
                <span>Encrypted Identity</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-[#6C4CFF]" />
                <span>Instant Tap NFC</span>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6C4CFF]/10 text-[#6C4CFF] text-xs font-semibold mb-3">
                <Zap className="w-3.5 h-3.5" />
                <span>Stay Connected</span>
              </div>
              <h4 className="text-xl font-heading font-extrabold text-slate-900 tracking-tight">Get the Latest aikulb Updates</h4>
              <p className="text-xs text-slate-600 mt-1">
                Subscribe for exclusive smart hardware drops, platform features, and networking insights.
              </p>
            </div>
            {subscribed ? (
              <div className="mt-4 p-3.5 rounded-2xl bg-[#6C4CFF]/10 border border-[#6C4CFF]/30 text-[#6C4CFF] text-sm font-semibold flex items-center space-x-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-[#6C4CFF]" />
                <span>Thank you! You are subscribed to aikulb Insider updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-5 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6C4CFF] text-sm font-medium"
                />
                <button
                  type="submit"
                  className="btn-pill-gradient text-white font-medium text-sm flex items-center justify-center space-x-2 px-6 py-3 rounded-full cursor-pointer hover:opacity-95 transition-all shadow-lg"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>

        {/* Links Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-slate-200 text-xs sm:text-sm" staggerDelay={0.06}>
          <StaggerItem>
            <h5 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Products</h5>
            <ul className="space-y-2.5">
              <li><Link to="/store?cat=cat-metal" className="hover:text-[#6C4CFF] transition">Metal NFC Cards</Link></li>
              <li><Link to="/store?cat=cat-wood" className="hover:text-[#6C4CFF] transition">Wooden Smart Cards</Link></li>
              <li><Link to="/store?cat=cat-pvc" className="hover:text-[#6C4CFF] transition">PVC Smart Cards</Link></li>
              <li><Link to="/store?cat=cat-stand" className="hover:text-[#6C4CFF] transition">Smart NFC Stands</Link></li>
              <li><Link to="/store?cat=cat-review" className="hover:text-[#6C4CFF] transition">Review Smart Cards</Link></li>
              <li><Link to="/customize" className="text-[#6C4CFF] font-bold hover:underline">Custom Card Designer</Link></li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h5 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Solutions</h5>
            <ul className="space-y-2.5">
              <li><a href="#industry" className="hover:text-[#6C4CFF] transition">For Executives & CEOs</a></li>
              <li><a href="#industry" className="hover:text-[#6C4CFF] transition">For Real Estate Brokers</a></li>
              <li><a href="#industry" className="hover:text-[#6C4CFF] transition">For Doctors & Clinics</a></li>
              <li><a href="#teams" className="hover:text-[#6C4CFF] transition">Corporate Teams Solutions</a></li>
              <li><a href="#review-section" className="hover:text-[#6C4CFF] transition">Google Review Automation</a></li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h5 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Company</h5>
            <ul className="space-y-2.5">
              <li><a href="#about" className="hover:text-[#6C4CFF] transition">About aikulb</a></li>
              <li><a href="#careers" className="hover:text-[#6C4CFF] transition">Careers</a></li>
              <li><a href="#blog" className="hover:text-[#6C4CFF] transition">Blog & Insights</a></li>
              <li><a href="#press" className="hover:text-[#6C4CFF] transition">Press Kit</a></li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h5 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Support</h5>
            <ul className="space-y-2.5">
              <li><a href="#faq" className="hover:text-[#6C4CFF] transition">Help Center & FAQ</a></li>
              <li><a href="#shipping" className="hover:text-[#6C4CFF] transition">Shipping & Delivery</a></li>
              <li><a href="#returns" className="hover:text-[#6C4CFF] transition">Returns Policy</a></li>
              <li><a href="#contact" className="hover:text-[#6C4CFF] transition">Contact Support</a></li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h5 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Legal</h5>
            <ul className="space-y-2.5">
              <li><a href="#privacy" className="hover:text-[#6C4CFF] transition">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-[#6C4CFF] transition">Terms of Service</a></li>
              <li><a href="#security" className="hover:text-[#6C4CFF] transition">Data Security</a></li>
              <li><a href="#refund" className="hover:text-[#6C4CFF] transition">Refund Policy</a></li>
            </ul>
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} aikulb Inc. All rights reserved. Your Identity. One Tap.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5"><Globe className="w-3.5 h-3.5 text-[#6C4CFF]" /> <span>Global Edition</span></span>
            <span>Made with precision for modern professionals.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
