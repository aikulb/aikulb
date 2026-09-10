import React from 'react';
import { Twitter, Linkedin, Facebook, Youtube, Instagram, PhoneCall } from 'lucide-react';

export const AnnouncementBar = () => {
  return (
    <div className="bg-[#FF3838] text-white text-xs py-2 px-4 font-manrope font-semibold tracking-wide border-b border-red-600/30">
      <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Side: Social Media Icons */}
        <div className="flex items-center space-x-3.5 text-white/90">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition" title="Twitter / X">
            <Twitter className="w-3.5 h-3.5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition" title="LinkedIn">
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition" title="Facebook">
            <Facebook className="w-3.5 h-3.5" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition" title="YouTube">
            <Youtube className="w-3.5 h-3.5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition" title="Instagram">
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:text-black transition" title="WhatsApp">
            <PhoneCall className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Center/Right Text Announcement */}
        <div className="text-center md:text-right font-medium text-[11px] sm:text-xs">
          No Hidden Charges, Free Design, Lifetime Validity & Your Approval First! Use code <span className="font-extrabold underline decoration-white/50">"VERVEET"</span> during checkout.
        </div>
      </div>
    </div>
  );
};
