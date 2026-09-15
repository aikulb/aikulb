import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ChevronDown, User, Menu, X, LogOut } from 'lucide-react';
import { ScrollProgress } from './AnimatedComponents';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

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
    <>
      {/* 2-3px Top Page Scroll Progress Bar */}
      <ScrollProgress />

      <nav
        className={`w-full transition-all duration-300 z-50 ${
          isScrolled
            ? 'bg-[#0B0F17]/95 backdrop-blur-xl py-3 border-b border-neutral-800/80 shadow-2xl shadow-black/50'
            : 'bg-[#0B0F17] py-3.5 border-b border-neutral-800'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - lowercase aikulb with Red/Violet Accent Icon */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C4CFF] via-[#8B5CF6] to-[#3B82F6] p-0.5 shadow-md shadow-[#6C4CFF]/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0B0F17] rounded-[14px] flex items-center justify-center font-black text-white text-sm font-manrope">
                ak
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tight text-white font-manrope lowercase">
                aikulb
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 text-sm font-bold font-manrope text-neutral-200">
            <Link to="/" className={`hover:text-[#A78BFA] transition ${location.pathname === '/' ? 'text-[#A78BFA]' : 'text-white'}`}>
              Home
            </Link>
            
            <Link to="/customize" className={`hover:text-[#A78BFA] transition whitespace-nowrap ${location.pathname === '/customize' ? 'text-[#A78BFA]' : 'text-white'}`}>
              Design Card
            </Link>

            {/* Shop Mega Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-white hover:text-[#A78BFA] transition py-2 focus:outline-none cursor-pointer">
                <span>Shop</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180 text-[#A78BFA]' : 'text-neutral-400'}`} />
              </button>

              <AnimatePresence>
                {shopDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full -left-64 w-[1000px] max-w-[92vw] pt-3 z-50"
                  >
                    <div className="bg-[#121826]/98 backdrop-blur-2xl border border-neutral-800 rounded-3xl p-7 shadow-2xl shadow-black/80 grid grid-cols-4 gap-6 text-left">
                      
                      {/* Column 1: Product Type */}
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-white font-manrope text-sm tracking-tight border-b border-neutral-800 pb-2 flex items-center space-x-2">
                          <span className="w-1.5 h-3.5 bg-[#6C4CFF] rounded-full inline-block"></span>
                          <span>By Product Type</span>
                        </h4>
                        <ul className="space-y-2 font-inter text-xs">
                          <li>
                            <Link to="/store?cat=cat-metal" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#A78BFA] hover:translate-x-1 transition-all font-medium block">
                              Metal NFC Business Card
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?cat=cat-wood" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#A78BFA] hover:translate-x-1 transition-all font-medium block">
                              Wooden NFC Business Card
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?cat=cat-pvc" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#A78BFA] hover:translate-x-1 transition-all font-medium block">
                              PVC NFC Business Card
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?cat=cat-stand" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#A78BFA] hover:translate-x-1 transition-all font-medium block">
                              Smart Standees & NFC Tags
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 2: By Industry */}
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-white font-manrope text-sm tracking-tight border-b border-neutral-800 pb-2 flex items-center space-x-2">
                          <span className="w-1.5 h-3.5 bg-purple-500 rounded-full inline-block"></span>
                          <span>By Industry</span>
                        </h4>
                        <ul className="space-y-2 font-inter text-xs">
                          <li>
                            <Link to="/store?search=Event" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#A78BFA] hover:translate-x-1 transition-all font-medium block">
                              Event & Management
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Hospitality" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#A78BFA] hover:translate-x-1 transition-all font-medium block">
                              Hospitality
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Health" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#A78BFA] hover:translate-x-1 transition-all font-medium block">
                              Health Care
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=IT" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#A78BFA] hover:translate-x-1 transition-all font-medium block">
                              IT & Security Firms
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 3: By Profession */}
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-white font-manrope text-sm tracking-tight border-b border-neutral-800 pb-2 flex items-center space-x-2">
                          <span className="w-1.5 h-3.5 bg-blue-500 rounded-full inline-block"></span>
                          <span>By Profession</span>
                        </h4>
                        <ul className="space-y-2 font-inter text-xs">
                          <li>
                            <Link to="/store?search=Doctor" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#A78BFA] hover:translate-x-1 transition-all font-medium block">
                              Doctors & Surgeons
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Lawyer" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#A78BFA] hover:translate-x-1 transition-all font-medium block">
                              Lawyers & Advocates
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Sales" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#A78BFA] hover:translate-x-1 transition-all font-medium block">
                              Sales Executives
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Freelancer" onClick={() => setShopDropdownOpen(false)} className="text-neutral-300 hover:text-[#A78BFA] hover:translate-x-1 transition-all font-medium block">
                              Freelancers & Creators
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 4: Promo Card */}
                      <div>
                        <Link
                          to="/store?cat=cat-review"
                          onClick={() => setShopDropdownOpen(false)}
                          className="group/card block bg-[#1E293B] border border-neutral-700 rounded-2xl overflow-hidden hover:border-[#6C4CFF] transition-all duration-300 shadow-md h-full flex flex-col justify-between"
                        >
                          <div className="h-28 bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center p-3 relative">
                            <div className="w-16 h-18 bg-[#0F172A] rounded-lg shadow-xl p-1.5 border border-neutral-700 flex flex-col justify-between items-center text-center">
                              <span className="font-extrabold text-[#4285F4] text-[11px]">G</span>
                              <span className="text-[7px] text-amber-400 font-bold">★★★★★</span>
                              <span className="text-[6px] text-neutral-300 font-bold">Google Review</span>
                            </div>
                          </div>
                          <div className="p-3 text-left flex-grow flex items-center">
                            <h5 className="font-bold text-white text-xs font-manrope group-hover/card:text-[#A78BFA] transition leading-snug">
                              Google Review Card – Boost Reviews 10x
                            </h5>
                          </div>
                        </Link>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/metal-card" className={`hover:text-[#A78BFA] transition whitespace-nowrap ${location.pathname === '/metal-card' ? 'text-[#A78BFA]' : 'text-white'}`}>
              Metal Card
            </Link>

            <Link to="/store" className={`hover:text-[#A78BFA] transition ${location.pathname === '/store' ? 'text-[#A78BFA]' : 'text-white'}`}>
              Store Catalog
            </Link>

            <Link to="/contact" className={`hover:text-[#A78BFA] transition ${location.pathname === '/contact' ? 'text-[#A78BFA]' : 'text-white'}`}>
              Help & FAQ
            </Link>

            <Link to="/create-profile" className="hover:text-[#A78BFA] transition font-bold text-white whitespace-nowrap">
              Create Profile
            </Link>
          </div>

          {/* Action Items (Right Side) */}
          <div className="hidden lg:flex items-center space-x-5 shrink-0">
            {/* Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-[#A78BFA] transition cursor-pointer"
              title="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {totalCount > 0 && (
                <motion.span
                  key={totalCount}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: [0.6, 1.3, 1] }}
                  transition={{ duration: 0.4 }}
                  className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full aikulb-gradient-bg text-white font-bold text-[10px] flex items-center justify-center shadow-md shadow-[#6C4CFF]/40"
                >
                  {totalCount}
                </motion.span>
              )}
            </button>

            {/* User Auth state */}
            {user ? (
              <div className="flex items-center space-x-2.5">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-full bg-neutral-900 border border-neutral-700 text-white hover:border-[#6C4CFF] hover:bg-neutral-800 transition text-xs font-bold font-manrope flex items-center space-x-1.5 shadow-sm"
                >
                  <User className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/auth?mode=login');
                  }}
                  className="px-3.5 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 transition text-xs font-bold font-manrope flex items-center space-x-1.5 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth?mode=login"
                className="text-xs font-extrabold uppercase tracking-wider text-white hover:opacity-90 transition font-manrope bg-gradient-to-r from-[#6C4CFF] to-[#8B5CF6] px-5 py-2.5 rounded-full shadow-md shadow-[#6C4CFF]/30"
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
              <ShoppingCart className="w-5 h-5 text-white" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#6C4CFF] text-white font-bold text-[10px] flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-900 text-white border border-neutral-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B0F17] border-b border-neutral-800 px-6 py-6 space-y-4 font-manrope animate-in fade-in duration-200 shadow-2xl">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white font-semibold text-base hover:text-[#A78BFA]"
            >
              Home
            </Link>

            <Link
              to="/customize"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white font-semibold text-base hover:text-[#A78BFA]"
            >
              Design Your Card
            </Link>
            <Link
              to="/store"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white font-semibold text-base hover:text-[#A78BFA]"
            >
              Shop Product Catalog
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white font-semibold text-base hover:text-[#A78BFA]"
            >
              Help & FAQ
            </Link>
            <Link
              to="/create-profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#A78BFA] font-bold text-base"
            >
              Create Profile
            </Link>

            {user ? (
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-3 text-center rounded-xl bg-neutral-900 border border-neutral-700 text-white font-bold text-sm"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    navigate('/auth?mode=login');
                  }}
                  className="w-full py-3 text-center rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-sm flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-neutral-800">
                <Link
                  to="/auth?mode=login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-3 text-center rounded-xl bg-[#6C4CFF] text-white font-bold text-sm uppercase tracking-wider"
                >
                  Login / Register
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

