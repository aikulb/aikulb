import React from 'react';
import { Link } from 'react-router-dom';

export const AikulbLogo = ({
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  showText = true,
  className = '',
  glow = true,
  darkText = false,
  onClick
}) => {
  const sizeMap = {
    sm: { img: 'w-7 h-7', text: 'text-lg', container: 'p-0.5 rounded-xl' },
    md: { img: 'w-9 h-9', text: 'text-2xl', container: 'p-0.5 rounded-2xl' },
    lg: { img: 'w-12 h-12', text: 'text-3xl', container: 'p-1 rounded-2xl' },
    xl: { img: 'w-16 h-16', text: 'text-4xl', container: 'p-1 rounded-3xl' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const logoContent = (
    <div className={`flex items-center space-x-3 group shrink-0 ${className}`}>
      {/* Official AK Trident Logo Emblem Container */}
      <div
        className={`relative ${currentSize.container} bg-gradient-to-tr from-[#059669] via-[#10B981] to-[#00DC82] ${
          glow ? 'shadow-lg shadow-[#10B981]/25 group-hover:shadow-[#00DC82]/40' : ''
        } group-hover:scale-105 transition-all duration-300`}
      >
        <div className="w-full h-full bg-[#070A0F] rounded-[13px] flex items-center justify-center overflow-hidden p-0.5">
          <img
            src="/assets/logo.png"
            alt="AIKULB Logo"
            className={`${currentSize.img} object-contain rounded-lg filter drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] group-hover:brightness-110 transition-all`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              if (e.target.parentNode) {
                e.target.parentNode.innerHTML = `<span class="font-black text-white text-xs font-manrope">AK</span>`;
              }
            }}
          />
        </div>
      </div>

      {/* Brand Text Name */}
      {showText && (
        <div className="flex items-center">
          <span className={`font-black tracking-tight ${darkText ? 'text-slate-900' : 'text-white'} font-manrope lowercase ${currentSize.text} leading-none`}>
            aikulb
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00DC82] ml-0.5 animate-pulse"></span>
          </span>
        </div>
      )}
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="cursor-pointer">
        {logoContent}
      </div>
    );
  }

  return <Link to="/" className="inline-block">{logoContent}</Link>;
};

export default AikulbLogo;
