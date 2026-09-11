import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ChevronDown, User, Menu, X, Sparkles } from 'lucide-react';
import { ScrollProgress } from './AnimatedComponents';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
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
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl py-3 border-b border-slate-200 shadow-sm'
            : 'bg-white py-3.5 border-b border-slate-200/80'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - lowercase aikulb with Red/Violet Accent Icon */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C4CFF] via-[#8B5CF6] to-[#3B82F6] p-0.5 shadow-md shadow-[#6C4CFF]/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-black text-white text-sm font-manrope">
                ak
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tight text-slate-900 font-manrope lowercase">
                aikulb
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 text-sm font-bold font-manrope text-slate-900">
            <Link to="/" className={`hover:text-[#6C4CFF] transition ${location.pathname === '/' ? 'text-[#6C4CFF]' : ''}`}>
              Home
            </Link>
            
            <Link to="/customize" className="hover:text-[#6C4CFF] transition whitespace-nowrap">
              Design Card
            </Link>

            {/* Shop Mega Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 hover:text-[#6C4CFF] transition py-2 focus:outline-none cursor-pointer">
                <span>Shop</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180 text-[#6C4CFF]' : ''}`} />
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
                    <div className="bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-7 shadow-2xl grid grid-cols-4 gap-6 text-left">
                      
                      {/* Column 1: Product Type */}
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-slate-900 font-manrope text-sm tracking-tight border-b border-slate-200 pb-2 flex items-center space-x-2">
                          <span className="w-1.5 h-3.5 bg-[#6C4CFF] rounded-full inline-block"></span>
                          <span>By Product Type</span>
                        </h4>
                        <ul className="space-y-2 font-inter text-xs">
                          <li>
                            <Link to="/store?cat=cat-metal" onClick={() => setShopDropdownOpen(false)} className="text-slate-600 hover:text-[#6C4CFF] hover:translate-x-1 transition-all font-medium block">
                              Metal NFC Business Card
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?cat=cat-wood" onClick={() => setShopDropdownOpen(false)} className="text-slate-600 hover:text-[#6C4CFF] hover:translate-x-1 transition-all font-medium block">
                              Wooden NFC Business Card
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?cat=cat-pvc" onClick={() => setShopDropdownOpen(false)} className="text-slate-600 hover:text-[#6C4CFF] hover:translate-x-1 transition-all font-medium block">
                              PVC NFC Business Card
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?cat=cat-stand" onClick={() => setShopDropdownOpen(false)} className="text-slate-600 hover:text-[#6C4CFF] hover:translate-x-1 transition-all font-medium block">
                              Smart Standees & NFC Tags
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 2: By Industry */}
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-slate-900 font-manrope text-sm tracking-tight border-b border-slate-200 pb-2 flex items-center space-x-2">
                          <span className="w-1.5 h-3.5 bg-purple-500 rounded-full inline-block"></span>
                          <span>By Industry</span>
                        </h4>
                        <ul className="space-y-2 font-inter text-xs">
                          <li>
                            <Link to="/store?search=Event" onClick={() => setShopDropdownOpen(false)} className="text-slate-600 hover:text-[#6C4CFF] hover:translate-x-1 transition-all font-medium block">
                              Event & Management
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Hospitality" onClick={() => setShopDropdownOpen(false)} className="text-slate-600 hover:text-[#6C4CFF] hover:translate-x-1 transition-all font-medium block">
                              Hospitality
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Health" onClick={() => setShopDropdownOpen(false)} className="text-slate-600 hover:text-[#6C4CFF] hover:translate-x-1 transition-all font-medium block">
                              Health Care
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=IT" onClick={() => setShopDropdownOpen(false)} className="text-slate-600 hover:text-[#6C4CFF] hover:translate-x-1 transition-all font-medium block">
                              IT & Security Firms
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 3: By Profession */}
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-slate-900 font-manrope text-sm tracking-tight border-b border-slate-200 pb-2 flex items-center space-x-2">
                          <span className="w-1.5 h-3.5 bg-blue-500 rounded-full inline-block"></span>
                          <span>By Profession</span>
                        </h4>
                        <ul className="space-y-2 font-inter text-xs">
                          <li>
                            <Link to="/store?search=Doctor" onClick={() => setShopDropdownOpen(false)} className="text-slate-600 hover:text-[#6C4CFF] hover:translate-x-1 transition-all font-medium block">
                              Doctors & Surgeons
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Lawyer" onClick={() => setShopDropdownOpen(false)} className="text-slate-600 hover:text-[#6C4CFF] hover:translate-x-1 transition-all font-medium block">
                              Lawyers & Advocates
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Sales" onClick={() => setShopDropdownOpen(false)} className="text-slate-600 hover:text-[#6C4CFF] hover:translate-x-1 transition-all font-medium block">
                              Sales Executives
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Freelancer" onClick={() => setShopDropdownOpen(false)} className="text-slate-600 hover:text-[#6C4CFF] hover:translate-x-1 transition-all font-medium block">
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
                          className="group/card block bg-[#F8FAFC] border border-slate-200 rounded-2xl overflow-hidden hover:border-[#6C4CFF]/60 transition-all duration-300 shadow-md h-full flex flex-col justify-between"
                        >
                          <div className="h-28 bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-100 flex items-center justify-center p-3 relative">
                            <div className="w-16 h-18 bg-white rounded-lg shadow-xl p-1.5 border border-slate-200 flex flex-col justify-between items-center text-center">
                              <span className="font-extrabold text-[#4285F4] text-[11px]">G</span>
                              <span className="text-[7px] text-amber-500 font-bold">★★★★★</span>
                              <span className="text-[6px] text-slate-700 font-bold">Google Review</span>
                            </div>
                          </div>
                          <div className="p-3 text-left flex-grow flex items-center">
                            <h5 className="font-bold text-slate-900 text-xs font-manrope group-hover/card:text-[#6C4CFF] transition leading-snug">
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

            <Link to="/store" className="hover:text-[#6C4CFF] transition">
              Store Catalog
            </Link>

            <Link to="/contact" className="hover:text-[#6C4CFF] transition">
              Help & FAQ
            </Link>

            <Link to="/create-profile" className="hover:text-[#6C4CFF] transition font-bold text-slate-900 whitespace-nowrap">
              Create Profile
            </Link>
          </div>

          {/* Action Items (Right Side) */}
          <div className="hidden lg:flex items-center space-x-5 shrink-0">
            {/* Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-900 hover:text-[#6C4CFF] transition cursor-pointer"
              title="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-slate-900" />
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
              <div className="flex items-center space-x-3">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-full bg-slate-100 border border-slate-300 text-slate-900 hover:border-[#6C4CFF] transition text-xs font-bold font-manrope flex items-center space-x-1.5 shadow-sm"
                >
                  <User className="w-3.5 h-3.5 text-[#6C4CFF]" />
                  <span>Dashboard</span>
                </Link>
              </div>
            ) : (
              <Link
                to="/auth?mode=login"
                className="text-xs font-extrabold uppercase tracking-wider text-white hover:bg-slate-800 transition font-manrope bg-slate-900 px-4.5 py-2 rounded-full shadow-md"
              >
                LOGIN
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-900"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#6C4CFF] text-white font-bold text-[10px] flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-900 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 font-manrope animate-in fade-in duration-200 shadow-xl">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-900 font-semibold text-base hover:text-[#6C4CFF]"
            >
              Home
            </Link>

            <Link
              to="/customize"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-900 font-semibold text-base hover:text-[#6C4CFF]"
            >
              Design Your Card
            </Link>
            <Link
              to="/store"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-900 font-semibold text-base hover:text-[#6C4CFF]"
            >
              Shop Product Catalog
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-900 font-semibold text-base hover:text-[#6C4CFF]"
            >
              Help & FAQ
            </Link>
            <Link
              to="/create-profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#6C4CFF] font-bold text-base"
            >
              Create Profile
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};
