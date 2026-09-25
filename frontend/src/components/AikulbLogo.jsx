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
      {/* Official AK Trident Logo Emblem */}
      <div className="relative flex items-center justify-center group-hover:scale-105 transition-all duration-300">
        <img
          src="/assets/logo.png"
          alt="AI KLUB Logo"
          className={`${currentSize.img} object-contain mix-blend-screen filter brightness-125 group-hover:brightness-150 transition-all`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
            if (e.target.parentNode) {
              e.target.parentNode.innerHTML = `<span class="font-black text-white text-xs font-manrope">AK</span>`;
            }
          }}
        />
      </div>

      {/* Brand Text Name */}
      {showText && (
        <div className="flex items-center">
          <span className={`font-black tracking-tight ${darkText ? 'text-slate-900' : 'text-white'} font-manrope ${currentSize.text} leading-none`}>
            AI Klub
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
