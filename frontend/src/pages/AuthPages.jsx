import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Sparkles, ArrowRight, User, Lock, Mail, ShieldCheck } from 'lucide-react';

export const AuthPages = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [isRegister, setIsRegister] = useState(initialMode === 'register');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, register, loginAsDemoUser, loginAsDemoAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

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
        <div className="w-full max-w-md p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xl">
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

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-inter">
            {isRegister && (
              <div>
                <label className="text-neutral-700 font-bold block mb-1 font-manrope">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
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
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
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
              <label className="text-neutral-700 font-bold block mb-1 font-manrope">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-bold text-xs font-manrope shadow-md shadow-[#FF3838]/20 transition"
            >
              {isRegister ? 'Register Account' : 'Login'}
            </button>
          </form>

          {/* Demo Buttons Row */}
          <div className="pt-4 border-t border-neutral-200 space-y-2 text-xs font-manrope">
            <span className="text-[10px] font-mono text-neutral-400 uppercase block text-center font-bold">Quick Demo Access</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDemoUser}
                className="py-2.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 font-bold border border-neutral-300 transition"
              >
                Demo User
              </button>
              <button
                onClick={handleDemoAdmin}
                className="py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold transition"
              >
                Demo Admin
              </button>
            </div>
          </div>

          {/* Switch Auth Mode */}
          <div className="text-center text-xs text-neutral-600 font-inter pt-2">
            {isRegister ? (
              <span>Already have an account? <button onClick={() => setIsRegister(false)} className="text-[#FF3838] font-bold">Login</button></span>
            ) : (
              <span>New to aikulb? <button onClick={() => setIsRegister(true)} className="text-[#FF3838] font-bold">Create Profile</button></span>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
