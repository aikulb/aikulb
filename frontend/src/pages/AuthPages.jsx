import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { api } from '../services/apiClient';
import { Sparkles, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { AikulbLogo } from '../components/AikulbLogo';

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
    await api.forgotPassword(forgotEmail);
    setShowForgotModal(false);
    setInfoMsg(`✓ Reset link sent to ${forgotEmail}`);
    setTimeout(() => setInfoMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-36 pb-24 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-5 sm:p-8 rounded-3xl bg-[#0D121B] border border-emerald-900/50 space-y-6 shadow-2xl relative shadow-black/80">
          {/* Forgot Password Modal */}
          {showForgotModal && (
            <div className="absolute inset-0 bg-[#070A0F]/95 backdrop-blur-sm z-20 rounded-3xl p-8 flex flex-col justify-center space-y-4 shadow-2xl border border-emerald-900/60">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-extrabold text-white font-manrope">Reset Password</h3>
                <p className="text-xs text-slate-400 font-inter">Enter your account email to receive a reset link</p>
              </div>
              <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs font-inter">
                <div>
                  <label className="text-slate-300 font-bold block mb-1 font-manrope">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="john@aiklub.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#070A0F] border border-emerald-900/60 text-white font-medium focus:outline-none focus:border-[#00DC82]"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="w-1/2 py-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-slate-300 font-bold font-manrope transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 rounded-full bg-gradient-to-r from-[#00DC82] to-[#059669] text-black font-extrabold font-manrope shadow-md shadow-[#10B981]/25 transition cursor-pointer"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="text-center space-y-3 flex flex-col items-center">
            <AikulbLogo size="lg" darkText={false} />
            <h2 className="text-2xl font-extrabold text-white font-manrope pt-2">
              {isRegister ? 'Create Digital Profile' : 'Sign in to ai klub'}
            </h2>
            <p className="text-xs text-emerald-400 font-mono">Your Identity. One Tap.</p>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-red-500/15 text-red-400 text-xs font-semibold text-center border border-red-500/30 font-inter">
              {error}
            </div>
          )}

          {infoMsg && (
            <div className="p-3 rounded-2xl bg-[#10B981]/15 text-[#00DC82] text-xs font-semibold text-center border border-[#10B981]/30 font-inter">
              {infoMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-inter">
            {isRegister && (
              <div>
                <label className="text-slate-300 font-bold block mb-1 font-manrope">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#070A0F] border border-emerald-900/60 text-white font-medium focus:outline-none focus:border-[#00DC82]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-slate-300 font-bold block mb-1 font-manrope">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="john@aiklub.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#070A0F] border border-emerald-900/60 text-white font-medium focus:outline-none focus:border-[#00DC82]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-300 font-bold font-manrope">Password</label>
                {!isRegister && (
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[#00DC82] font-bold text-[11px] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-2xl bg-[#070A0F] border border-emerald-900/60 text-white font-medium focus:outline-none focus:border-[#00DC82]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 p-1 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-[#00DC82]" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#00DC82] via-[#10B981] to-[#059669] hover:brightness-110 text-black font-extrabold text-xs font-manrope shadow-md shadow-[#10B981]/30 transition cursor-pointer uppercase tracking-wider"
            >
              {isRegister ? 'Register Account' : 'Login'}
            </button>
          </form>

          {/* Switch Auth Mode */}
          <div className="text-center text-xs text-slate-400 font-inter pt-2 space-y-2">
            {isRegister ? (
              <div>Already have an account? <button type="button" onClick={() => setIsRegister(false)} className="text-[#00DC82] font-bold hover:underline cursor-pointer">Login</button></div>
            ) : (
              <div>New to ai klub? <button type="button" onClick={() => navigate('/create-profile')} className="text-[#00DC82] font-bold hover:underline cursor-pointer">Create Profile</button></div>
            )}
            <div className="pt-2 border-t border-emerald-950">
              <Link to="/create-profile" className="inline-flex items-center space-x-1.5 text-xs text-[#00DC82] font-extrabold hover:underline font-manrope">
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

