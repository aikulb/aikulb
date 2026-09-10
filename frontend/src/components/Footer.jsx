import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, ShieldCheck, Cpu, Globe, Zap } from 'lucide-react';

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
    <footer className="bg-[#090909] border-t border-[#1F1F1F] text-zinc-400 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-[#1F1F1F]">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C4CFF] to-[#8B5CF6] p-0.5 shadow-lg shadow-[#6C4CFF]/20">
                <div className="w-full h-full bg-[#090909] rounded-[14px] flex items-center justify-center font-bold text-[#8B5CF6] text-sm tracking-tighter">
                  ai
                </div>
              </div>
              <span className="font-heading font-extrabold text-2xl text-white tracking-tight">aikulb</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              aikulb is the next-generation smart networking platform offering NFC-enabled digital business cards, smart stands, QR products, digital profiles, lead capture, and team networking solutions.
            </p>
            <div className="flex items-center space-x-5 text-xs text-zinc-400 pt-1">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                <span>Encrypted Identity</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-[#8B5CF6]" />
                <span>Instant Tap NFC</span>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-7 bg-[#111111] border border-[#262626] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6C4CFF]/10 text-[#8B5CF6] text-xs font-semibold mb-3">
                <Zap className="w-3.5 h-3.5" />
                <span>Stay Connected</span>
              </div>
              <h4 className="text-xl font-heading font-bold text-white tracking-tight">Get the Latest aikulb Updates</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Subscribe for exclusive smart hardware drops, platform features, and networking insights.
              </p>
            </div>
            {subscribed ? (
              <div className="mt-4 p-3.5 rounded-2xl bg-[#6C4CFF]/10 border border-[#6C4CFF]/30 text-purple-300 text-sm font-semibold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
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
                  className="flex-1 px-4 py-3 rounded-full bg-[#18181B] border border-[#27272A] text-white placeholder-zinc-500 focus:outline-none focus:border-[#6C4CFF] text-sm"
                />
                <button
                  type="submit"
                  className="btn-pill-gradient text-white font-medium text-sm flex items-center justify-center space-x-2 px-6 py-3 rounded-full cursor-pointer hover:opacity-95 transition-all"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-[#1F1F1F] text-xs sm:text-sm">
          <div>
            <h5 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-4">Products</h5>
            <ul className="space-y-2.5">
              <li><Link to="/store?cat=cat-metal" className="hover:text-white transition">Metal NFC Cards</Link></li>
              <li><Link to="/store?cat=cat-wood" className="hover:text-white transition">Wooden Smart Cards</Link></li>
              <li><Link to="/store?cat=cat-pvc" className="hover:text-white transition">PVC Smart Cards</Link></li>
              <li><Link to="/store?cat=cat-stand" className="hover:text-white transition">Smart NFC Stands</Link></li>
              <li><Link to="/store?cat=cat-review" className="hover:text-white transition">Review Smart Cards</Link></li>
              <li><Link to="/customize" className="text-[#8B5CF6] hover:underline">Custom Card Designer</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-4">Solutions</h5>
            <ul className="space-y-2.5">
              <li><a href="#industry" className="hover:text-white transition">For Executives & CEOs</a></li>
              <li><a href="#industry" className="hover:text-white transition">For Real Estate Brokers</a></li>
              <li><a href="#industry" className="hover:text-white transition">For Doctors & Clinics</a></li>
              <li><a href="#teams" className="hover:text-white transition">Corporate Teams Solutions</a></li>
              <li><a href="#review-section" className="hover:text-white transition">Google Review Automation</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-4">Company</h5>
            <ul className="space-y-2.5">
              <li><a href="#about" className="hover:text-white transition">About aikulb</a></li>
              <li><a href="#careers" className="hover:text-white transition">Careers</a></li>
              <li><a href="#blog" className="hover:text-white transition">Blog & Insights</a></li>
              <li><a href="#press" className="hover:text-white transition">Press Kit</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-4">Support</h5>
            <ul className="space-y-2.5">
              <li><a href="#faq" className="hover:text-white transition">Help Center & FAQ</a></li>
              <li><a href="#shipping" className="hover:text-white transition">Shipping & Delivery</a></li>
              <li><a href="#returns" className="hover:text-white transition">Returns Policy</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact Support</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-4">Legal</h5>
            <ul className="space-y-2.5">
              <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#security" className="hover:text-white transition">Data Security</a></li>
              <li><a href="#refund" className="hover:text-white transition">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} aikulb Inc. All rights reserved. Your Identity. One Tap.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5"><Globe className="w-3.5 h-3.5 text-[#8B5CF6]" /> <span>Global Edition</span></span>
            <span>Made with precision for modern professionals.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

