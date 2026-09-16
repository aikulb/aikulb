import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { api } from '../services/apiClient';
import { Sparkles, ArrowRight, User, Lock, Mail, ShieldCheck, Eye, EyeOff, Key } from 'lucide-react';

export const AuthPages = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [isRegister, setIsRegister] = useState(initialMode === 'register');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const { login, register, loginAsDemoUser, loginAsDemoAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMsg('');

    let res;
    if (isRegister) {
      res = await register(name, email, password);
    } else {
      res = await login(email, password);
    }

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message || 'Authentication failed');
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setInfoMsg('Dispatching password reset link...');
    const res = await api.forgotPassword(forgotEmail);
    setShowForgotModal(false);
    setInfoMsg(`✓ Reset link sent to ${forgotEmail}`);
    setTimeout(() => setInfoMsg(''), 4000);
  };

  const handleDemoUser = async () => {
    const res = await loginAsDemoUser();
    if (res.success) navigate('/dashboard');
  };

  const handleDemoAdmin = async () => {
    const res = await loginAsDemoAdmin();
    if (res.success) navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-36 pb-24 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xl relative">
          {/* Forgot Password Modal */}
          {showForgotModal && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 rounded-3xl p-8 flex flex-col justify-center space-y-4 shadow-2xl">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-extrabold text-neutral-900 font-manrope">Reset Password</h3>
                <p className="text-xs text-neutral-500 font-inter">Enter your account email to receive a reset link</p>
              </div>
              <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs font-inter">
                <div>
                  <label className="text-neutral-700 font-bold block mb-1 font-manrope">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="john@aikulb.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="w-1/2 py-3 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold font-manrope transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-bold font-manrope shadow-md shadow-[#FF3838]/20 transition cursor-pointer"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF3838] to-[#FF6B6B] p-0.5 mx-auto shadow-md shadow-[#FF3838]/20">
              <div className="w-full h-full bg-[#000000] rounded-[14px] flex items-center justify-center font-black text-[#FF3838] text-base font-manrope">
                ak
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-neutral-900 font-manrope">
              {isRegister ? 'Create Digital Profile' : 'Sign in to aikulb'}
            </h2>
            <p className="text-xs text-neutral-500 font-inter">Your Identity. One Tap.</p>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-red-100 text-red-700 text-xs font-semibold text-center border border-red-200 font-inter">
              {error}
            </div>
          )}

          {infoMsg && (
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-semibold text-center border border-emerald-200 font-inter">
              {infoMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-inter">
            {isRegister && (
              <div>
                <label className="text-neutral-700 font-bold block mb-1 font-manrope">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-neutral-700 font-bold block mb-1 font-manrope">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="john@aikulb.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-neutral-700 font-bold font-manrope">Password</label>
                {!isRegister && (
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[#FF3838] font-bold text-[11px] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 p-1 rounded-lg text-neutral-400 hover:text-neutral-800 transition cursor-pointer"
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-[#FF3838]" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-bold text-xs font-manrope shadow-md shadow-[#FF3838]/20 transition cursor-pointer"
            >
              {isRegister ? 'Register Account' : 'Login'}
            </button>
          </form>

          {/* Switch Auth Mode */}
          <div className="text-center text-xs text-neutral-600 font-inter pt-2 space-y-2">
            {isRegister ? (
              <div>Already have an account? <button type="button" onClick={() => setIsRegister(false)} className="text-[#FF3838] font-bold hover:underline cursor-pointer">Login</button></div>
            ) : (
              <div>New to aikulb? <button type="button" onClick={() => navigate('/create-profile')} className="text-[#FF3838] font-bold hover:underline cursor-pointer">Create Profile</button></div>
            )}
            <div className="pt-2 border-t border-neutral-200">
              <Link to="/create-profile" className="inline-flex items-center space-x-1.5 text-xs text-[#FF3838] font-extrabold hover:underline font-manrope">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Or use Full Interactive Profile Builder →</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
