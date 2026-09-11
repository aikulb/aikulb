import React from 'react';
import { Twitter, Linkedin, Facebook, Youtube, Instagram, PhoneCall, Sparkles } from 'lucide-react';

export const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-[#6C4CFF] via-[#8B5CF6] to-[#3B82F6] text-white text-xs py-2 px-4 font-manrope font-semibold tracking-wide border-b border-white/10 shadow-sm">
      <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Side: Social Media Icons */}
        <div className="flex items-center space-x-3.5 text-white/90">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200 transition" title="Twitter / X">
            <Twitter className="w-3.5 h-3.5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200 transition" title="LinkedIn">
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200 transition" title="Facebook">
            <Facebook className="w-3.5 h-3.5" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200 transition" title="YouTube">
            <Youtube className="w-3.5 h-3.5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200 transition" title="Instagram">
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-200 transition" title="WhatsApp">
            <PhoneCall className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Center/Right Text Announcement */}
        <div className="text-center md:text-right font-medium text-[11px] sm:text-xs flex items-center justify-center md:justify-end space-x-1.5">
          <Sparkles className="w-3 h-3 text-cyan-200" />
          <span>No Hidden Charges • Free Design Setup • Lifetime Validity • Use Code <span className="font-black underline decoration-white/60 text-white">"AIKULB10"</span> for 10% OFF</span>
        </div>
      </div>
    </div>
  );
};
