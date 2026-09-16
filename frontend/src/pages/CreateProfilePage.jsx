import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { api } from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import {
  User, Mail, Lock, AtSign, Briefcase, Building, FileText,
  Phone, Globe, MapPin, Linkedin, Instagram, Youtube, Sparkles,
  CheckCircle2, ArrowRight, ArrowLeft, Palette, Image as ImageIcon,
  Zap, Link2, ShieldCheck, Check, AlertCircle, RefreshCw, Eye, EyeOff
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CreateProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState({ checking: false, available: null, msg: '' });

  // Form Fields State
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    username: '',
    title: '',
    company: '',
    bio: '',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    banner_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    theme: 'dark-electric',
    phone: '',
    whatsapp: '',
    website: '',
    address: '',
    linkedin: '',
    instagram: '',
    youtube: '',
    github: '',
    custom_links: [
      { title: 'Book a Meeting', url: 'https://calendly.com', icon: 'Calendar' },
      { title: 'Company Portfolio', url: 'https://aikulb.com', icon: 'Globe' }
    ]
  });

  // Auto-generate username from full_name if username is empty
  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData(prev => {
      const autoUser = prev.username ? prev.username : val.toLowerCase().replace(/[^a-z0-9]/g, '');
      return { ...prev, full_name: val, username: autoUser };
    });
  };

  // Live Username Availability Check
  useEffect(() => {
    if (!formData.username || formData.username.length < 3) {
      setUsernameStatus({ checking: false, available: null, msg: '' });
      return;
    }

    const timer = setTimeout(async () => {
      setUsernameStatus({ checking: true, available: null, msg: 'Checking handle availability...' });
      const res = await api.checkUsername(formData.username);
      if (res.success) {
        if (res.data.available) {
          setUsernameStatus({ checking: false, available: true, msg: '✓ Handle available!' });
        } else {
          setUsernameStatus({ checking: false, available: false, msg: '✕ Handle already taken' });
        }
      } else {
        setUsernameStatus({ checking: false, available: null, msg: '' });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [formData.username]);

  // AI Bio Generator
  const handleGenerateAiBio = async () => {
    if (!formData.full_name) {
      setError('Please enter your Full Name first to generate AI bio');
      return;
    }
    setAiLoading(true);
    setError('');
    const res = await api.generateAiBio({
      name: formData.full_name,
      title: formData.title || 'Professional',
      company: formData.company || 'Enterprise'
    });
    if (res.success && res.data.bio) {
      setFormData(prev => ({ ...prev, bio: res.data.bio }));
    } else {
      setFormData(prev => ({
        ...prev,
        bio: `Passionate ${formData.title || 'professional'} at ${formData.company || 'tech enterprise'}. Dedicated to driving digital innovation and smart networking.`
      }));
    }
    setAiLoading(false);
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.full_name || !formData.email || !formData.password) {
      setError('Please fill in all required fields (Full Name, Email, Password)');
      return;
    }

    const autoUsername = formData.username || formData.full_name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'user';
    const submissionData = { ...formData, username: autoUsername };

    setLoading(true);
    const res = await api.createProfile(submissionData);

    if (res.success) {
      if (res.data.token) {
        localStorage.setItem('aikulb_token', res.data.token);
      }
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      const createdUsername = res.data.profile?.username || formData.username;
      setTimeout(() => {
        navigate(`/profile/${createdUsername}`);
        window.location.reload();
      }, 1000);
    } else {
      setError(res.message || 'Failed to create digital profile. Please try again.');
      setLoading(false);
    }
  };

  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF3838]/10 border border-[#FF3838]/20 text-[#FF3838] text-xs font-manrope font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FF3838]" />
            <span>Digital Identity Creator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 font-manrope tracking-tight">
            Create Your Dynamic Digital Profile
          </h1>
          <p className="text-base text-neutral-600 font-inter font-medium leading-relaxed">
            Set up your tap-ready digital profile in minutes. Syncs instantly with all your aikulb NFC cards & QR codes.
          </p>

          {/* Stepper Progress Bar */}
          <div className="pt-6 max-w-xl mx-auto flex items-center justify-between text-xs font-manrope font-bold">
            {[
              { num: 1, label: 'Account' },
              { num: 2, label: 'Personal' },
              { num: 3, label: 'Social & Links' },
              { num: 4, label: 'Theme & Finish' }
            ].map(s => (
              <button
                key={s.num}
                onClick={() => setStep(s.num)}
                className={`flex items-center space-x-2 pb-2 border-b-2 transition ${
                  step === s.num
                    ? 'border-[#FF3838] text-[#FF3838]'
                    : step > s.num
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-neutral-200 text-neutral-400'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                  step === s.num ? 'bg-[#FF3838] text-white' : step > s.num ? 'bg-emerald-500 text-white' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form + Live Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Builder Input Form */}
          <div className="lg:col-span-7 bg-neutral-50 p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
            
            {error && (
              <div className="p-4 rounded-2xl bg-red-100 border border-red-200 text-red-700 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6 text-xs font-inter">

              {/* STEP 1: Account Credentials & Handle */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <h3 className="text-lg font-extrabold text-neutral-900 font-manrope border-b border-neutral-200 pb-3">
                    Step 1: Account Setup
                  </h3>

                  <div>
                    <label className="text-neutral-700 font-bold block mb-1 font-manrope">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        name="create_profile_name"
                        autoComplete="off"
                        required
                        placeholder="E.g. Alexander Vance"
                        value={formData.full_name}
                        onChange={handleNameChange}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-neutral-700 font-bold block mb-1 font-manrope">Email Address *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          name="create_profile_email"
                          autoComplete="off"
                          required
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-neutral-700 font-bold block mb-1 font-manrope">Password *</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="create_profile_password"
                          autoComplete="new-password"
                          required
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-bold text-xs font-manrope flex items-center space-x-2 shadow-md transition cursor-pointer"
                    >
                      <span>Next: Personal Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Professional & Personal Information */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <h3 className="text-lg font-extrabold text-neutral-900 font-manrope border-b border-neutral-200 pb-3">
                    Step 2: Professional & Business Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-neutral-700 font-bold block mb-1 font-manrope">Job Title / Designation</label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          placeholder="Founder & Chief Executive"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-neutral-700 font-bold block mb-1 font-manrope">Company / Organization</label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          placeholder="Neural Dynamics Global"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-neutral-700 font-bold font-manrope">Bio Summary</label>
                      <button
                        type="button"
                        onClick={handleGenerateAiBio}
                        disabled={aiLoading}
                        className="text-xs text-[#FF3838] font-bold flex items-center space-x-1 hover:underline cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#FF3838]" />
                        <span>{aiLoading ? 'Generating AI Bio...' : '✨ Generate AI Bio'}</span>
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Write a brief professional summary or click Generate AI Bio..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-neutral-700 font-bold block mb-1 font-manrope">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-neutral-700 font-bold block mb-1 font-manrope">WhatsApp Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          placeholder="919876543210"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-neutral-700 font-bold block mb-1 font-manrope">Website URL</label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                        <input
                          type="url"
                          placeholder="https://company.com"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-neutral-700 font-bold block mb-1 font-manrope">Office Location / Address</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          placeholder="New Delhi, India"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold text-xs font-manrope flex items-center space-x-1 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-bold text-xs font-manrope flex items-center space-x-2 shadow-md transition cursor-pointer"
                    >
                      <span>Next: Social Profiles</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Social Media & Custom Links */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <h3 className="text-lg font-extrabold text-neutral-900 font-manrope border-b border-neutral-200 pb-3">
                    Step 3: Social Media & Action Links
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="text-neutral-700 font-bold block mb-1 font-manrope">LinkedIn URL</label>
                      <div className="relative">
                        <Linkedin className="w-4 h-4 text-[#0A66C2] absolute left-3.5 top-3.5" />
                        <input
                          type="url"
                          placeholder="https://linkedin.com/in/username"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-neutral-700 font-bold block mb-1 font-manrope">Instagram Profile / Handle</label>
                      <div className="relative">
                        <Instagram className="w-4 h-4 text-[#E4405F] absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          placeholder="https://instagram.com/username"
                          value={formData.instagram}
                          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-neutral-700 font-bold block mb-1 font-manrope">YouTube Channel Link</label>
                      <div className="relative">
                        <Youtube className="w-4 h-4 text-[#FF0000] absolute left-3.5 top-3.5" />
                        <input
                          type="url"
                          placeholder="https://youtube.com/@channel"
                          value={formData.youtube}
                          onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Custom Action Links */}
                  <div className="pt-3">
                    <label className="text-neutral-700 font-bold block mb-2 font-manrope">Custom Action Buttons (e.g. Deck, Booking)</label>
                    <div className="space-y-2">
                      {formData.custom_links.map((link, idx) => (
                        <div key={idx} className="flex space-x-2 items-center">
                          <input
                            type="text"
                            placeholder="Title (e.g. Book Meeting)"
                            value={link.title}
                            onChange={(e) => {
                              const updated = [...formData.custom_links];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, custom_links: updated });
                            }}
                            className="w-1/3 p-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 font-medium text-xs focus:outline-none"
                          />
                          <input
                            type="url"
                            placeholder="https://..."
                            value={link.url}
                            onChange={(e) => {
                              const updated = [...formData.custom_links];
                              updated[idx].url = e.target.value;
                              setFormData({ ...formData, custom_links: updated });
                            }}
                            className="flex-1 p-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 font-medium text-xs focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-3 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold text-xs font-manrope flex items-center space-x-1 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-6 py-3 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-bold text-xs font-manrope flex items-center space-x-2 shadow-md transition cursor-pointer"
                    >
                      <span>Next: Choose Theme</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Theme & Avatar Selection */}
              {step === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <h3 className="text-lg font-extrabold text-neutral-900 font-manrope border-b border-neutral-200 pb-3">
                    Step 4: Design Theme & Avatar Photo
                  </h3>

                  <div>
                    <label className="text-neutral-700 font-bold block mb-2 font-manrope">Select Digital Profile Theme</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'dark-electric', name: 'Electric Dark', color: 'bg-slate-900 text-purple-400 border-purple-500' },
                        { id: 'luxury-gold', name: 'Executive Gold', color: 'bg-amber-950 text-amber-300 border-amber-500' },
                        { id: 'clean-light', name: 'Clean Light', color: 'bg-white text-slate-900 border-slate-300' },
                        { id: 'neon-cyber', name: 'Neon Cyber', color: 'bg-cyan-950 text-cyan-400 border-cyan-500' },
                        { id: 'minimal-slate', name: 'Charcoal Minimal', color: 'bg-neutral-900 text-neutral-200 border-neutral-700' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, theme: t.id })}
                          className={`p-3 rounded-2xl border flex flex-col justify-between text-left transition ${t.color} ${
                            formData.theme === t.id ? 'ring-2 ring-[#FF3838] shadow-md font-bold' : 'opacity-80 hover:opacity-100'
                          }`}
                        >
                          <span className="text-xs font-bold font-manrope">{t.name}</span>
                          <span className="text-[10px] font-mono mt-2">● Active Theme</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-neutral-700 font-bold block mb-2 font-manrope">Avatar Photo Presets</label>
                    <div className="flex space-x-3 items-center">
                      {presetAvatars.map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setFormData({ ...formData, avatar_url: url })}
                          className={`w-12 h-12 rounded-full overflow-hidden border-2 transition ${
                            formData.avatar_url === url ? 'border-[#FF3838] scale-110 shadow-md' : 'border-neutral-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={url} alt="Avatar Preset" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-neutral-700 font-bold block mb-1 font-manrope">Custom Photo Image URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={formData.avatar_url}
                      onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                      className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-3 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold text-xs font-manrope flex items-center space-x-1 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3.5 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-extrabold text-xs font-manrope shadow-lg shadow-[#FF3838]/25 flex items-center space-x-2 transition cursor-pointer"
                    >
                      <span>{loading ? 'Creating Profile...' : 'Launch My Digital Profile 🚀'}</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>

          {/* RIGHT: Real-time Live Digital Card Preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
              <span>LIVE PROFILE PREVIEW</span>
              <span className="text-[#FF3838] font-bold">REAL-TIME SYNC</span>
            </div>

            {/* Mobile Card Phone Shell */}
            <div className={`w-full max-w-sm mx-auto rounded-[36px] p-6 shadow-2xl border border-neutral-800 transition-all duration-300 flex flex-col justify-between space-y-6 ${
              formData.theme === 'luxury-gold' ? 'bg-[#1C160C] text-amber-100' :
              formData.theme === 'clean-light' ? 'bg-[#F8FAFC] text-slate-900' :
              formData.theme === 'neon-cyber' ? 'bg-[#081B26] text-cyan-200' :
              formData.theme === 'minimal-slate' ? 'bg-[#121212] text-neutral-200' :
              'bg-[#0E0E16] text-purple-100'
            }`}>
              
              {/* Header Info */}
              <div className="text-center space-y-3 relative">
                <div className="w-24 h-24 rounded-full mx-auto p-1 bg-gradient-to-tr from-[#FF3838] to-purple-500 shadow-xl overflow-hidden">
                  <img
                    src={formData.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-xl font-manrope">
                    {formData.full_name || 'YOUR FULL NAME'}
                  </h3>
                  <p className="text-xs font-semibold opacity-80">
                    {formData.title || 'DESIGNATION'} • {formData.company || 'COMPANY'}
                  </p>
                  <span className="inline-block px-3 py-0.5 rounded-full bg-white/10 text-[11px] font-mono font-bold">
                    @{formData.username || 'username'}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-center leading-relaxed opacity-85 font-inter max-w-xs mx-auto">
                {formData.bio || 'Your bio preview will display here live as you type...'}
              </p>

              {/* Action Buttons */}
              <div className="space-y-2">
                {formData.custom_links.map((link, idx) => (
                  <div
                    key={idx}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold font-manrope text-center shadow-xs flex items-center justify-between"
                  >
                    <span>{link.title || 'Custom Action Link'}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                  </div>
                ))}
              </div>

              {/* Footer NFC Tag */}
              <div className="pt-4 border-t border-white/10 text-center flex items-center justify-center space-x-1.5 text-[10px] font-mono opacity-60">
                <Zap className="w-3 h-3 text-[#FF3838]" />
                <span>TAP NFC OR SCAN QR CODE TO SAVE CONTACT</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};
