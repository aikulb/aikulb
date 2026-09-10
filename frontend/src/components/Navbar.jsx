import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ChevronDown, User, Menu, X, Sparkles, PhoneCall } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`w-full transition-all duration-300 ${
        isScrolled ? 'bg-[#000000]/95 backdrop-blur-md py-3 border-b border-neutral-800 shadow-xl' : 'bg-[#000000] py-4 border-b border-neutral-900'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - lowercase aikulb with Red Accent Icon */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF3838] to-[#FF6B6B] p-0.5 shadow-lg shadow-[#FF3838]/25 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#000000] rounded-[14px] flex items-center justify-center font-black text-[#FF3838] text-base font-manrope">
              ak
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-3xl tracking-tight text-white font-manrope lowercase">
              aikulb
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links - Increased Font Size matching reference site */}
        <div className="hidden lg:flex items-center space-x-8 text-base sm:text-[17px] font-bold font-manrope text-white">
          <Link to="/" className={`hover:text-[#FF3838] transition ${location.pathname === '/' ? 'text-[#FF3838]' : ''}`}>
            Home
          </Link>
          
          <Link to="/customize" className="hover:text-[#FF3838] transition whitespace-nowrap">
            Design Your Card
          </Link>

          {/* Shop Mega Menu Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <button className="flex items-center space-x-1 hover:text-[#FF3838] transition py-2 focus:outline-none cursor-pointer">
              <span>Shop</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180 text-[#FF3838]' : ''}`} />
            </button>

            {shopDropdownOpen && (
              <div className="absolute top-full -left-72 w-[1140px] max-w-[95vw] pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="bg-[#0A0A0A]/98 backdrop-blur-2xl border border-neutral-800/90 rounded-3xl p-8 shadow-[0_35px_80px_rgba(0,0,0,0.95)] grid grid-cols-5 gap-8 text-left">
                  
                  {/* Column 1: Product Type */}
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-white font-manrope text-base tracking-tight border-b border-neutral-800 pb-2.5 flex items-center space-x-2">
                      <span className="w-1.5 h-4 bg-[#FF3838] rounded-full inline-block"></span>
                      <span>Product Type</span>
                    </h4>
                    <ul className="space-y-3 font-inter text-sm">
                      <li>
                        <Link to="/store?cat=cat-metal" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          Metal NFC Business Card
                        </Link>
                      </li>
                      <li>
                        <Link to="/store?cat=cat-wood" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          Wooden NFC Business Card
                        </Link>
                      </li>
                      <li>
                        <Link to="/store?cat=cat-pvc" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          PVC NFC Business Card
                        </Link>
                      </li>
                      <li>
                        <Link to="/store?cat=cat-stand" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          Smart Standees
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: By Industry */}
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-white font-manrope text-base tracking-tight border-b border-neutral-800 pb-2.5 flex items-center space-x-2">
                      <span className="w-1.5 h-4 bg-purple-500 rounded-full inline-block"></span>
                      <span>By Industry</span>
                    </h4>
                    <ul className="space-y-3 font-inter text-sm">
                      <li>
                        <Link to="/store?search=Event" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          Event & Management
                        </Link>
                      </li>
                      <li>
                        <Link to="/store?search=Hospitality" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          Hospitality
                        </Link>
                      </li>
                      <li>
                        <Link to="/store?search=Health" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          Health Care
                        </Link>
                      </li>
                      <li>
                        <Link to="/store?search=IT" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          IT & Security
                        </Link>
                      </li>
                      <li>
                        <Link to="/store?search=Legal" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          Legal Firms
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: By Profession */}
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-white font-manrope text-base tracking-tight border-b border-neutral-800 pb-2.5 flex items-center space-x-2">
                      <span className="w-1.5 h-4 bg-blue-500 rounded-full inline-block"></span>
                      <span>By Profession</span>
                    </h4>
                    <ul className="space-y-2.5 font-inter text-sm">
                      <li>
                        <Link to="/store?search=Doctor" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          Doctor
                        </Link>
                      </li>
                      <li>
                        <Link to="/store?search=Lawyer" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          Lawyer & Advocate
                        </Link>
                      </li>
                      <li>
                        <Link to="/store?search=CA" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          CA
                        </Link>
                      </li>
                      <li>
                        <Link to="/store?search=Sales" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          Sales Professionals
                        </Link>
                      </li>
                      <li>
                        <Link to="/store?search=Freelancer" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          Freelancer
                        </Link>
                      </li>
                      <li>
                        <Link to="/store?search=Influencer" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          Social Media Influencers
                        </Link>
                      </li>
                      <li>
                        <Link to="/store?search=Jewellery" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#FF3838] hover:translate-x-1 transition-all duration-200 font-medium block whitespace-nowrap">
                          Jewellery Professionals
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 4: Featured Promo Card 1 (Google Review) */}
                  <div>
                    <Link
                      to="/store?cat=cat-review"
                      onClick={() => setShopDropdownOpen(false)}
                      className="group/card block bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#FF3838]/60 transition-all duration-300 shadow-xl h-full flex flex-col justify-between"
                    >
                      <div className="h-32 bg-gradient-to-tr from-[#181818] via-[#242424] to-[#121212] flex items-center justify-center p-3 relative">
                        {/* SVG Google Review Cards Graphic */}
                        <div className="flex -space-x-3">
                          <div className="w-16 h-20 bg-white rounded-lg shadow-2xl p-1.5 transform -rotate-6 border border-neutral-200 flex flex-col justify-between items-center text-center">
                            <span className="font-extrabold text-[#4285F4] text-[11px]">G</span>
                            <span className="text-[7px] text-amber-500 font-bold">★★★★★</span>
                            <span className="text-[6px] text-neutral-700 font-bold">Review us on Google</span>
                          </div>
                          <div className="w-16 h-20 bg-white rounded-lg shadow-2xl p-1.5 transform rotate-6 border border-neutral-200 flex flex-col justify-between items-center text-center z-10">
                            <span className="font-extrabold text-[#EA4335] text-[11px]">G</span>
                            <span className="text-[7px] text-amber-500 font-bold">★★★★★</span>
                            <span className="text-[6px] text-neutral-700 font-bold">Review us on Google</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 text-left flex-grow flex items-center">
                        <h5 className="font-bold text-white text-xs font-manrope group-hover/card:text-[#FF3838] transition leading-snug">
                          Google Review Card – Boost Your Business with NFC Technology
                        </h5>
                      </div>
                    </Link>
                  </div>

                  {/* Column 5: Featured Promo Card 2 (Gift Packaging) */}
                  <div>
                    <Link
                      to="/customize"
                      onClick={() => setShopDropdownOpen(false)}
                      className="group/card block bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#FF3838]/60 transition-all duration-300 shadow-xl h-full flex flex-col justify-between"
                    >
                      <div className="h-32 bg-gradient-to-tr from-[#241010] via-[#181818] to-[#0A0A0A] flex items-center justify-center p-3 relative">
                        {/* Premium Gift Box Graphic */}
                        <div className="relative w-24 h-20 bg-[#1E1E1E] rounded-xl border border-red-500/50 p-2 shadow-2xl flex flex-col justify-between items-center">
                          <div className="w-full h-2 bg-[#FF3838] rounded-full"></div>
                          <div className="w-16 h-9 bg-neutral-900 border border-neutral-700 rounded-md flex items-center justify-center text-[9px] font-extrabold text-white font-manrope">
                            aikulb CARD
                          </div>
                          <div className="text-[7px] text-red-400 font-mono font-bold">PREMIUM GIFT BOX</div>
                        </div>
                      </div>
                      <div className="p-4 text-left flex-grow flex items-center">
                        <h5 className="font-bold text-white text-xs font-manrope group-hover/card:text-[#FF3838] transition leading-snug">
                          Send the Perfect Gift – Add Premium Packaging!
                        </h5>
                      </div>
                    </Link>
                  </div>

                </div>
              </div>
            )}
          </div>

          <Link to="/store?cat=cat-metal" className="hover:text-[#FF3838] transition whitespace-nowrap">
            Metal Card
          </Link>

          <Link to="/store" className="hover:text-[#FF3838] transition">
            Catalog
          </Link>

          <a href="#contact" className="hover:text-[#FF3838] transition">
            Contact
          </a>

          <Link to="/create-profile" className="hover:text-[#FF3838] transition font-bold text-white whitespace-nowrap">
            Create Profile
          </Link>
        </div>

        {/* Action Items (Right Side) */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white hover:text-[#FF3838] transition cursor-pointer"
            title="View Shopping Cart"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF3838] text-white font-bold text-[10px] flex items-center justify-center shadow">
                {totalCount}
              </span>
            )}
          </button>

          {/* User Auth state */}
          {user ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-full bg-[#1A1A1A] border border-neutral-700 text-white hover:border-[#FF3838] transition text-sm font-bold font-manrope flex items-center space-x-1.5"
              >
                <User className="w-4 h-4 text-[#FF3838]" />
                <span>Dashboard</span>
              </Link>
            </div>
          ) : (
            <Link
              to="/auth?mode=login"
              className="text-sm font-extrabold uppercase tracking-wider text-white hover:text-[#FF3838] transition font-manrope"
            >
              LOGIN
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center space-x-3 lg:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF3838] text-white font-bold text-[10px] flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#1A1A1A] text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b border-neutral-800 px-6 py-6 space-y-4 font-manrope">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-semibold text-base hover:text-[#FF3838]"
          >
            Home
          </Link>
          <Link
            to="/customize"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-semibold text-base hover:text-[#FF3838]"
          >
            Design Your Card
          </Link>
          <Link
            to="/store"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-semibold text-base hover:text-[#FF3838]"
          >
            Shop Product Catalog
          </Link>
          <Link
            to="/store?cat=cat-metal"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-semibold text-base hover:text-[#FF3838]"
          >
            Metal Cards
          </Link>
          <Link
            to="/create-profile"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#FF3838] font-bold text-base"
          >
            Create Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

