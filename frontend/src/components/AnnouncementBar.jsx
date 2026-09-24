import React from 'react';
import { Twitter, Linkedin, Facebook, Youtube, Instagram, PhoneCall, Sparkles } from 'lucide-react';

export const AnnouncementBar = () => {
  return (
    <div className="bg-black border-b border-neutral-900 text-white text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 font-manrope font-semibold tracking-wide shadow-md shrink-0">
      <div className="max-w-[1320px] mx-auto flex flex-row items-center justify-between gap-2">
        {/* Left Side: Social Media Icons (hidden on small mobile to preserve header height) */}
        <div className="hidden sm:flex items-center space-x-3 text-slate-400">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00DC82] transition" title="Twitter / X">
            <Twitter className="w-3.5 h-3.5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00DC82] transition" title="LinkedIn">
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00DC82] transition" title="Facebook">
            <Facebook className="w-3.5 h-3.5" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00DC82] transition" title="YouTube">
            <Youtube className="w-3.5 h-3.5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00DC82] transition" title="Instagram">
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a href="https://wa.me/917799529358" target="_blank" rel="noopener noreferrer" className="hover:text-[#00DC82] transition" title="WhatsApp">
            <PhoneCall className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Center/Right Text Announcement */}
        <div className="w-full sm:w-auto text-center sm:text-right font-medium text-[10px] sm:text-xs flex items-center justify-center sm:justify-end space-x-1.5 text-slate-300">
          <Sparkles className="w-3 h-3 text-[#00DC82] shrink-0" />
          <span className="truncate sm:whitespace-normal">No Hidden Charges • Free Design Setup • Code <span className="font-black text-[#00DC82]">"AIKULB10"</span> (10% OFF)</span>
        </div>
      </div>
    </div>
  );
};
