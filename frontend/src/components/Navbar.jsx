import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ChevronDown, User, Menu, X, LogOut, ShieldCheck } from 'lucide-react';
import { ScrollProgress } from './AnimatedComponents';
import { AikulbLogo } from './AikulbLogo';

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
            ? 'bg-black py-3 border-b border-neutral-900'
            : 'bg-black py-3.5 border-b border-neutral-900'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Aikulb AK Trident Logo */}
          <AikulbLogo size="md" darkText={false} />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 text-sm font-bold font-manrope text-slate-300">
            <Link to="/" className={`hover:text-[#00DC82] transition ${location.pathname === '/' ? 'text-[#00DC82] font-extrabold' : 'text-slate-300'}`}>
              Home
            </Link>
            
            <Link to="/customize" className={`hover:text-[#00DC82] transition whitespace-nowrap ${location.pathname === '/customize' ? 'text-[#00DC82] font-extrabold' : 'text-slate-300'}`}>
              Design Card
            </Link>

            {/* Shop Mega Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-slate-300 hover:text-[#00DC82] transition py-2 focus:outline-none cursor-pointer">
                <span>Shop</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180 text-[#00DC82]' : 'text-slate-500'}`} />
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
                    <div className="bg-[#0D121B]/98 backdrop-blur-2xl border border-emerald-900/60 rounded-3xl p-7 shadow-2xl shadow-black/90 grid grid-cols-4 gap-6 text-left">
                      
                      {/* Column 1: Product Type */}
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-white font-manrope text-sm tracking-tight border-b border-emerald-900/60 pb-2 flex items-center space-x-2">
                          <span className="w-1.5 h-3.5 bg-[#00DC82] rounded-full inline-block"></span>
                          <span>By Product Type</span>
                        </h4>
                        <ul className="space-y-2 font-inter text-xs">
                          <li>
                            <Link to="/store?cat=cat-metal" onClick={() => setShopDropdownOpen(false)} className="text-slate-300 hover:text-[#00DC82] hover:translate-x-1 transition-all font-medium block">
                              Metal NFC Business Card
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?cat=cat-wood" onClick={() => setShopDropdownOpen(false)} className="text-slate-300 hover:text-[#00DC82] hover:translate-x-1 transition-all font-medium block">
                              Wooden NFC Business Card
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?cat=cat-pvc" onClick={() => setShopDropdownOpen(false)} className="text-slate-300 hover:text-[#00DC82] hover:translate-x-1 transition-all font-medium block">
                              PVC NFC Business Card
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?cat=cat-stand" onClick={() => setShopDropdownOpen(false)} className="text-slate-300 hover:text-[#00DC82] hover:translate-x-1 transition-all font-medium block">
                              Smart Standees & NFC Tags
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 2: By Industry */}
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-white font-manrope text-sm tracking-tight border-b border-emerald-900/60 pb-2 flex items-center space-x-2">
                          <span className="w-1.5 h-3.5 bg-emerald-400 rounded-full inline-block"></span>
                          <span>By Industry</span>
                        </h4>
                        <ul className="space-y-2 font-inter text-xs">
                          <li>
                            <Link to="/store?search=Event" onClick={() => setShopDropdownOpen(false)} className="text-slate-300 hover:text-[#00DC82] hover:translate-x-1 transition-all font-medium block">
                              Event & Management
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Hospitality" onClick={() => setShopDropdownOpen(false)} className="text-slate-300 hover:text-[#00DC82] hover:translate-x-1 transition-all font-medium block">
                              Hospitality
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Health" onClick={() => setShopDropdownOpen(false)} className="text-slate-300 hover:text-[#00DC82] hover:translate-x-1 transition-all font-medium block">
                              Health Care
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=IT" onClick={() => setShopDropdownOpen(false)} className="text-slate-300 hover:text-[#00DC82] hover:translate-x-1 transition-all font-medium block">
                              IT & Security Firms
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 3: By Profession */}
                      <div className="space-y-3">
                        <h4 className="font-extrabold text-white font-manrope text-sm tracking-tight border-b border-emerald-900/60 pb-2 flex items-center space-x-2">
                          <span className="w-1.5 h-3.5 bg-teal-400 rounded-full inline-block"></span>
                          <span>By Profession</span>
                        </h4>
                        <ul className="space-y-2 font-inter text-xs">
                          <li>
                            <Link to="/store?search=Doctor" onClick={() => setShopDropdownOpen(false)} className="text-slate-300 hover:text-[#00DC82] hover:translate-x-1 transition-all font-medium block">
                              Doctors & Surgeons
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Lawyer" onClick={() => setShopDropdownOpen(false)} className="text-slate-300 hover:text-[#00DC82] hover:translate-x-1 transition-all font-medium block">
                              Lawyers & Advocates
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Sales" onClick={() => setShopDropdownOpen(false)} className="text-slate-300 hover:text-[#00DC82] hover:translate-x-1 transition-all font-medium block">
                              Sales Executives
                            </Link>
                          </li>
                          <li>
                            <Link to="/store?search=Freelancer" onClick={() => setShopDropdownOpen(false)} className="text-slate-300 hover:text-[#00DC82] hover:translate-x-1 transition-all font-medium block">
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
                          className="group/card block bg-[#070A0F] border border-emerald-900/60 rounded-2xl overflow-hidden hover:border-[#00DC82] transition-all duration-300 shadow-md h-full flex flex-col justify-between"
                        >
                          <div className="h-28 bg-[#030508] flex items-center justify-center p-3 relative">
                            <div className="w-16 h-18 bg-[#0D121B] rounded-lg shadow-xl p-1.5 border border-emerald-900/50 flex flex-col justify-between items-center text-center">
                              <span className="font-extrabold text-[#4285F4] text-[11px]">G</span>
                              <span className="text-[7px] text-amber-400 font-bold">★★★★★</span>
                              <span className="text-[6px] text-neutral-300 font-bold">Google Review</span>
                            </div>
                          </div>
                          <div className="p-3 text-left flex-grow flex items-center">
                            <h5 className="font-bold text-white text-xs font-manrope group-hover/card:text-[#00DC82] transition leading-snug">
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

            <Link to="/metal-card" className={`hover:text-[#00DC82] transition whitespace-nowrap ${location.pathname === '/metal-card' ? 'text-[#00DC82] font-extrabold' : 'text-slate-300'}`}>
              Metal Card
            </Link>

            <Link to="/store" className={`hover:text-[#00DC82] transition ${location.pathname === '/store' ? 'text-[#00DC82] font-extrabold' : 'text-slate-300'}`}>
              Store Catalog
            </Link>

            <Link to="/contact" className={`hover:text-[#00DC82] transition ${location.pathname === '/contact' ? 'text-[#00DC82] font-extrabold' : 'text-slate-300'}`}>
              Help & FAQ
            </Link>

            <Link to="/create-profile" className="hover:text-[#00DC82] transition font-bold text-slate-300 whitespace-nowrap">
              Create Profile
            </Link>
          </div>

          {/* Action Items (Right Side) */}
          <div className="hidden lg:flex items-center space-x-5 shrink-0">
            {/* Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-300 hover:text-[#00DC82] transition cursor-pointer"
              title="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-slate-300" />
              {totalCount > 0 && (
                <motion.span
                  key={totalCount}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: [0.6, 1.3, 1] }}
                  transition={{ duration: 0.4 }}
                  className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-gradient-to-r from-[#00DC82] to-[#059669] text-black font-extrabold text-[10px] flex items-center justify-center shadow-md shadow-[#10B981]/30"
                >
                  {totalCount}
                </motion.span>
              )}
            </button>

            {/* User Auth state */}
            {user ? (
              <div className="flex items-center space-x-2.5">
                {(user.email === 'admin@aiklub.com' || user.email === 'admin@aikulb.com' || user.role === 'admin') && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 rounded-full bg-[#00DC82] text-black hover:brightness-110 transition text-xs font-black font-manrope flex items-center space-x-1.5 shadow-md shadow-[#00DC82]/20"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                    <span>Admin Panel</span>
                  </Link>
                )}

                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-full bg-[#0D121B] border border-emerald-900/60 text-white hover:border-[#00DC82] hover:bg-[#161F2E] transition text-xs font-bold font-manrope flex items-center space-x-1.5 shadow-md"
                >
                  <User className="w-3.5 h-3.5 text-[#00DC82]" />
                  <span>Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/auth?mode=login');
                  }}
                  className="px-3.5 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition text-xs font-bold font-manrope flex items-center space-x-1.5 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth?mode=login"
                className="text-xs font-black uppercase tracking-wider text-black hover:brightness-110 transition font-manrope bg-gradient-to-r from-[#00DC82] via-[#10B981] to-[#059669] px-5 py-2.5 rounded-full shadow-md shadow-[#10B981]/25"
              >
                LOGIN
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-300"
            >
              <ShoppingCart className="w-5 h-5 text-slate-300" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00DC82] text-black font-bold text-[10px] flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0D121B] text-white border border-emerald-900/60"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#070A0F] border-b border-emerald-950 px-6 py-6 space-y-4 font-manrope animate-in fade-in duration-200 shadow-2xl">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white font-semibold text-base hover:text-[#00DC82]"
            >
              Home
            </Link>

            <Link
              to="/customize"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white font-semibold text-base hover:text-[#00DC82]"
            >
              Design Your Card
            </Link>
            <Link
              to="/store"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white font-semibold text-base hover:text-[#00DC82]"
            >
              Shop Product Catalog
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white font-semibold text-base hover:text-[#00DC82]"
            >
              Help & FAQ
            </Link>
            <Link
              to="/create-profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#00DC82] font-bold text-base"
            >
              Create Profile
            </Link>

            {user ? (
              <div className="pt-4 border-t border-emerald-950 space-y-3">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-3 text-center rounded-xl bg-[#0D121B] border border-emerald-900/60 text-white font-bold text-sm"
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
              <div className="pt-4 border-t border-emerald-950">
                <Link
                  to="/auth?mode=login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-3 text-center rounded-xl bg-gradient-to-r from-[#00DC82] to-[#059669] text-black font-black text-sm uppercase tracking-wider"
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
