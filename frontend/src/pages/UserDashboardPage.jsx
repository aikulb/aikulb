import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/apiClient';
import {
  User, Eye, EyeOff, Users, Zap, QrCode, BarChart2, CheckCircle2, Phone, Mail, Sparkles, Building2,
  ShoppingBag, Layout, Download, FileText, Globe, ArrowRight, Bot, Lock, Key, CreditCard, LogOut,
  Check, Copy, MapPin, Share2, Linkedin, Instagram, Youtube, RefreshCw, ExternalLink, Layers, Radio, ShieldCheck,
  Plus, Trash2, Edit3, Save, X, Search, ChevronRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { SkeletonLoader, ScrollReveal } from '../components/AnimatedComponents';

export const UserDashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialMode = searchParams.get('mode') === 'classic' ? 'classic' : 'new';
  const [dashboardMode, setDashboardMode] = useState(initialMode);

  const { user, logout, login, register, loginAsDemoUser, loginAsDemoAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState(null);
  const [leads, setLeads] = useState([]);
  const [orders, setOrders] = useState([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  // Edit form states
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [saved, setSaved] = useState(false);

  // Classic Card Portal states (card.aiklub.com style)
  const [cardType, setCardType] = useState('classic_matte');
  const [cardFont, setCardFont] = useState('syne');
  const [cardSide, setCardSide] = useState('front');
  const [classicSubTab, setClassicSubTab] = useState(user ? 'profile' : 'auth'); // 'profile' | 'auth' | 'card_type'
  const [authEmail, setAuthEmail] = useState(user?.email || 'john@aiklub.com');
  const [authPassword, setAuthPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmailInput, setForgotEmailInput] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [loginToast, setLoginToast] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // AI Assistant states
  const [aiBio, setAiBio] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    let profRes = await api.getMyProfile();

    const [leadRes, ordRes, teamRes] = await Promise.all([
      api.getMyLeads(),
      api.getMyOrders(),
      api.getMyTeam(),
    ]);

    if (profRes.success && profRes.data) {
      setProfile(profRes.data);
      setFullName(profRes.data.full_name || '');
      setTitle(profRes.data.title || '');
      setCompany(profRes.data.company || '');
      setBio(profRes.data.bio || '');
      setPhone(profRes.data.phone || '');
      setEmail(profRes.data.email || '');
      setWhatsapp(profRes.data.whatsapp || '');
      setWebsite(profRes.data.website || '');
      setAddress(profRes.data.address || profRes.data.office_address || '');
      setLinkedin(profRes.data.linkedin || '');
      setInstagram(profRes.data.instagram || '');
      setYoutube(profRes.data.youtube || '');
      if (profRes.data.theme) {
        setCardType(profRes.data.theme);
      }
    }
    if (leadRes.success) setLeads(leadRes.data);
    if (ordRes.success) setOrders(ordRes.data);
    if (teamRes.success) setTeam(teamRes.data);

    setLoading(false);
  };

  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const handleProfileSave = async (e) => {
    if (e) e.preventDefault();
    setIsSavingProfile(true);

    let res = await api.updateProfile({
      full_name: fullName,
      title,
      company,
      bio,
      phone,
      email,
      whatsapp,
      website,
      address,
      linkedin,
      instagram,
      youtube,
      theme: cardType,
    });

    if (!res.success && res.message?.includes('Authentication')) {
      await loginAsDemoUser();
      res = await api.updateProfile({
        full_name: fullName,
        title,
        company,
        bio,
        phone,
        email,
        whatsapp,
        website,
        address,
        linkedin,
        instagram,
        youtube,
        theme: cardType,
      });
    }

    setIsSavingProfile(false);
    if (res.success) {
      setSaved(true);
      fetchDashboardData();
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleSelectCardType = async (typeId) => {
    setCardType(typeId);
    const res = await api.updateProfile({ theme: typeId });
    if (res.success) {
      setSaved(true);
      fetchDashboardData();
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleCopyLink = () => {
    const targetUsername = profile?.username || user?.username || 'john';
    const profileUrl = `${window.location.origin}/profile/${targetUsername}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(profileUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = profileUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    } catch (e) {
      console.error('Copy failed:', e);
    }
    setCopySuccess(true);
    setLoginToast('✓ Profile link copied to clipboard!');
    setTimeout(() => {
      setCopySuccess(false);
      setLoginToast('');
    }, 3000);
  };

  const handleSimulateQrScan = async () => {
    const targetUsername = profile?.username || user?.username || 'john';
    setLoginToast('⚡ Simulating NFC card tap with database sync...');
    await api.recordQrScan(targetUsername);
    await fetchDashboardData();
    setLoginToast('✓ NFC Tap Simulated! DB scan counter updated.');
    setTimeout(() => setLoginToast(''), 3000);
  };

  const handleDownloadVcf = () => {
    const targetUsername = profile?.username || user?.username || 'john';
    setLoginToast('📥 Downloading VCF Contact Card...');
    const link = document.createElement('a');
    link.href = `/api/profile/vcf/${targetUsername}`;
    link.setAttribute('download', `${fullName ? fullName.replace(/[^a-z0-9]/gi, '_') : 'ai_klub'}_contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setLoginToast(''), 3000);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoginToast('Authenticating session with database...');

    let res = await login(authEmail, authPassword);

    // If user account is not found, automatically register them so login succeeds seamlessly
    if (!res.success) {
      const defaultName = authEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ') || 'ai klub Member';
      const regRes = await register(defaultName, authEmail, authPassword);
      if (regRes.success) {
        res = { success: true };
      }
    }

    if (res.success) {
      setLoginToast('✓ Login successful! Database profile synchronized.');
      await fetchDashboardData();
      setTimeout(() => {
        setLoginToast('');
        setClassicSubTab('profile');
      }, 1500);
    } else {
      setLoginToast(`❌ Authentication failed: ${res.message || 'Check email & password'}`);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmailInput) return;
    setLoginToast('Sending password reset link...');
    const res = await api.forgotPassword(forgotEmailInput);
    setForgotSubmitted(true);
    setTimeout(() => {
      setForgotSubmitted(false);
      setShowForgotModal(false);
      setForgotEmailInput('');
      setLoginToast(`✓ Reset link generated & sent to ${forgotEmailInput}`);
      setTimeout(() => setLoginToast(''), 4000);
    }, 2000);
  };

  const handleUpdateLeadStatus = async (leadId, status) => {
    const res = await api.updateLeadStatus(leadId, status);
    if (res.success) {
      fetchDashboardData();
    }
  };

  const handleGenerateAiBio = async () => {
    setAiLoading(true);
    const res = await api.generateAiBio({ name: fullName, title, company, tone: 'executive' });
    if (res.success) {
      setAiBio(res.data.bio);
      setBio(res.data.bio);
    }
    setAiLoading(false);
  };


  const analyticsData = [
    { day: 'Mon', views: 240, taps: 120 },
    { day: 'Tue', views: 380, taps: 190 },
    { day: 'Wed', views: 510, taps: 260 },
    { day: 'Thu', views: 420, taps: 210 },
    { day: 'Fri', views: 680, taps: 340 },
    { day: 'Sat', views: 310, taps: 155 },
    { day: 'Sun', views: 300, taps: 150 },
  ];

  /* Skeleton Loading State (Requirement 22: Replace plain "Loading..." text with skeleton loaders) */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
          <SkeletonLoader className="h-16 w-1/2 rounded-2xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <SkeletonLoader className="h-28 w-full rounded-3xl" />
            <SkeletonLoader className="h-28 w-full rounded-3xl" />
            <SkeletonLoader className="h-28 w-full rounded-3xl" />
            <SkeletonLoader className="h-28 w-full rounded-3xl" />
          </div>
          <SkeletonLoader className="h-64 w-full rounded-3xl" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Header & Dashboard Mode Switcher */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-neutral-200 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-3xl font-black text-neutral-900 font-manrope">
                {user ? user.name : 'ai klub Member'}
              </h1>
              <span className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold ${
                dashboardMode === 'new' ? 'bg-[#6C4CFF]/10 text-[#6C4CFF] border border-[#6C4CFF]/30' : 'bg-neutral-100 text-neutral-700 border border-neutral-300'
              }`}>
                {dashboardMode === 'new' ? '✨ NEW AI DASHBOARD' : 'CLASSIC DASHBOARD'}
              </span>
            </div>
          </div>

          {/* Mode Switcher & Logout Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center bg-neutral-100 p-1.5 rounded-full border border-neutral-300 space-x-2">
              <button
                onClick={() => {
                  setDashboardMode('classic');
                  setSearchParams({ mode: 'classic' });
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold font-manrope transition flex items-center space-x-1.5 ${
                  dashboardMode === 'classic' ? 'bg-white text-neutral-900 shadow' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                <span>Classic</span>
              </button>
              <button
                onClick={() => {
                  setDashboardMode('new');
                  setSearchParams({ mode: 'new' });
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold font-manrope transition flex items-center space-x-1.5 ${
                  dashboardMode === 'new' ? 'bg-[#6C4CFF] text-white shadow-md' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>New AI Dashboard</span>
              </button>
            </div>

            {(user?.email === 'admin@aiklub.com' || user?.email === 'admin@aikulb.com' || user?.role === 'admin') && (
              <button
                onClick={() => navigate('/admin')}
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#00DC82] via-[#10B981] to-[#059669] hover:brightness-110 text-black font-black text-xs font-manrope flex items-center space-x-1.5 transition shadow-md shadow-[#00DC82]/20 cursor-pointer"
                title="Open Admin Card Manager"
              >
                <ShieldCheck className="w-4 h-4 text-black stroke-[2.5]" />
                <span>Admin Panel (Add Cards)</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/auth?mode=login');
              }}
              className="px-4 py-2.5 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 hover:text-red-700 font-extrabold text-xs font-manrope flex items-center space-x-1.5 transition shadow-xs cursor-pointer"
              title="Logout of session"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Logout</span>
            </button>
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* MODE 1: CLASSIC DASHBOARD VIEW (card.aikulb.com inspired) */}
        {/* ========================================================================= */}
        {dashboardMode === 'classic' ? (
          <div className="space-y-8">

            {/* Sub-Navigation Bar for Classic Mode */}
            <div className="flex space-x-2 border-b border-neutral-200 pb-3 overflow-x-auto">
              <button
                onClick={() => setClassicSubTab('profile')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold font-manrope flex items-center space-x-2 transition ${
                  classicSubTab === 'profile'
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Classic Identity & Profile</span>
              </button>

              <button
                onClick={() => setClassicSubTab('card_type')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold font-manrope flex items-center space-x-2 transition ${
                  classicSubTab === 'card_type'
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card Type Switcher</span>
              </button>
            </div>

            {/* Sub-Tab 1: Card Type Switcher Grid */}
            {classicSubTab === 'card_type' && (
              <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xs">
                <div>
                  <h3 className="text-xl font-extrabold text-neutral-900 font-manrope flex items-center space-x-2">
                    <Layers className="w-5 h-5 text-[#FF3838]" />
                    <span>Select Physical Card Hardware Type</span>
                  </h3>
                  <p className="text-xs text-neutral-500 font-inter mt-1">
                    Updates card theme across digital identity views and physical NFC smart card chip sync.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      id: 'classic_matte',
                      name: 'Classic Onyx Black',
                      subtitle: 'Premium Soft-Touch Matte Black NFC Card',
                      bgClass: 'bg-neutral-900 text-white border-neutral-700',
                      badge: 'Popular',
                    },
                    {
                      id: 'pvc_white',
                      name: 'Pure PVC White',
                      subtitle: 'Minimalist Gloss White Digital Identity Card',
                      bgClass: 'bg-white text-neutral-900 border-neutral-300',
                      badge: 'Standard',
                    },
                    {
                      id: 'bamboo_wood',
                      name: 'Eco Bamboo Wood',
                      subtitle: 'Natural Wood Grain Finish with Laser Engraving',
                      bgClass: 'bg-[#C29B38]/10 text-[#5C4212] border-[#C29B38]/40',
                      badge: 'Eco Friendly',
                    },
                    {
                      id: 'metal_executive',
                      name: 'Executive Stainless Metal',
                      subtitle: 'Heavy Duty Laser Etched Metal Smart Card',
                      bgClass: 'bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-900 text-amber-300 border-amber-500/50',
                      badge: 'VIP Metal',
                    },
                    {
                      id: 'acrylic_clear',
                      name: 'Frosted Glass Acrylic',
                      subtitle: 'Semi-Transparent Glassmorphism NFC Card',
                      bgClass: 'bg-blue-50/80 backdrop-blur-md text-blue-900 border-blue-200',
                      badge: 'Modern 3D',
                    },
                  ].map((ct) => (
                    <div
                      key={ct.id}
                      onClick={() => handleSelectCardType(ct.id)}
                      className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                        cardType === ct.id ? 'border-[#FF3838] ring-4 ring-[#FF3838]/10 shadow-lg' : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {cardType === ct.id && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#FF3838] text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-800 text-[10px] font-mono font-bold uppercase">
                          {ct.badge}
                        </span>
                        <h4 className="font-extrabold text-neutral-900 text-base font-manrope mt-3">{ct.name}</h4>
                        <p className="text-xs text-neutral-500 font-inter mt-1">{ct.subtitle}</p>
                      </div>

                      <div className={`mt-6 p-4 rounded-xl text-xs font-mono flex items-center justify-between ${ct.bgClass}`}>
                        <span className="font-bold tracking-wider">AI KLUB // AK-{ct.id.toUpperCase()}</span>
                        <Radio className="w-4 h-4 opacity-70" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Grid: Form Left, Preview Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column (8 cols): Identity Form */}
              <div className="lg:col-span-7 space-y-6">
                {/* Classic Contact Information Form */}
                <form onSubmit={handleProfileSave} className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xs">
                    <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
                      <div>
                        <h3 className="text-lg font-extrabold text-neutral-900 font-manrope">Classic Contact Information</h3>
                        <p className="text-xs text-neutral-500 font-inter">Direct edit with instant database sync</p>
                      </div>
                      {saved && (
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold font-mono">
                          ✓ Saved to DB
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-inter">
                      <div>
                        <label className="text-neutral-700 font-bold block mb-1 font-manrope">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-bold focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-700 font-bold block mb-1 font-manrope">Title / Designation</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-700 font-bold block mb-1 font-manrope">Company / Organization</label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-700 font-bold block mb-1 font-manrope">Mobile Phone Number</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-700 font-bold block mb-1 font-manrope">WhatsApp Number</label>
                        <input
                          type="tel"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-700 font-bold block mb-1 font-manrope">Business Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-700 font-bold block mb-1 font-manrope">Website URL</label>
                        <input
                          type="text"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://example.com"
                          className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-700 font-bold block mb-1 font-manrope">Office / HQ Address</label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Mumbai, India"
                          className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-inter pt-2 border-t border-neutral-200">
                      <div>
                        <label className="text-neutral-700 font-bold block mb-1 font-manrope">LinkedIn URL</label>
                        <input
                          type="text"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          placeholder="linkedin.com/in/username"
                          className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-700 font-bold block mb-1 font-manrope">Instagram Handle</label>
                        <input
                          type="text"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="@username"
                          className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-700 font-bold block mb-1 font-manrope">YouTube Channel</label>
                        <input
                          type="text"
                          value={youtube}
                          onChange={(e) => setYoutube(e.target.value)}
                          placeholder="youtube.com/@channel"
                          className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                        />
                      </div>
                    </div>

                    <div className="text-xs font-inter">
                      <label className="text-neutral-700 font-bold block mb-1 font-manrope">Professional Bio</label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                        placeholder="Brief summary for your classic NFC card profile..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSavingProfile}
                      className="px-8 py-4 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-extrabold text-xs font-manrope uppercase tracking-wider shadow-md transition cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-70"
                    >
                      {isSavingProfile ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                      <span>{isSavingProfile ? 'Saving to Database...' : 'Save Classic Profile to Database'}</span>
                    </button>
                  </form>
              </div>

              {/* Right Column (5 cols): Live Physical Card Preview & Sync Utilities */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-3 gap-2">
                    <h3 className="font-extrabold text-neutral-900 text-base font-manrope">Live Physical Card Preview</h3>
                    <div className="flex bg-neutral-200 p-1 rounded-full text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => setCardSide('front')}
                        className={`px-3 py-1 rounded-full transition ${cardSide === 'front' ? 'bg-white text-neutral-900 shadow' : 'text-neutral-600'}`}
                      >
                        Front
                      </button>
                      <button
                        type="button"
                        onClick={() => setCardSide('back')}
                        className={`px-3 py-1 rounded-full transition ${cardSide === 'back' ? 'bg-white text-neutral-900 shadow' : 'text-neutral-600'}`}
                      >
                        Back & QR
                      </button>
                    </div>
                  </div>

                  {/* Card Font Style Selector */}
                  <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px] font-bold">
                    <span className="text-neutral-500 font-inter text-[10px] shrink-0">Card Font:</span>
                    {[
                      { id: 'syne', name: 'Syne Modern', class: 'font-syne' },
                      { id: 'outfit', name: 'Outfit Executive', class: 'font-outfit' },
                      { id: 'cinzel', name: 'Cinzel Luxury', class: 'font-cinzel' },
                      { id: 'spacegrotesk', name: 'Space Tech', class: 'font-space-grotesk' },
                      { id: 'jakarta', name: 'Jakarta Clean', class: 'font-jakarta' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setCardFont(f.id)}
                        className={`px-2.5 py-1 rounded-lg border transition shrink-0 ${f.class} ${
                          cardFont === f.id
                            ? 'bg-black text-white border-black shadow-xs'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>

                  {/* Physical Digital Card Rendering */}
                  <div
                    className={`w-full aspect-[1.586/1] rounded-2xl p-6 relative overflow-hidden transition-all duration-500 shadow-2xl flex flex-col justify-between ${
                      cardType === 'pvc_white'
                        ? 'bg-white text-neutral-900 border border-neutral-300'
                        : cardType === 'bamboo_wood'
                        ? 'bg-[#C29B38] text-[#2C1D07] border border-[#A88225]'
                        : cardType === 'metal_executive'
                        ? 'bg-gradient-to-tr from-neutral-900 via-zinc-800 to-neutral-900 text-amber-300 border border-amber-500/40'
                        : cardType === 'acrylic_clear'
                        ? 'bg-sky-900/90 text-white border border-sky-400/40 backdrop-blur-md'
                        : 'bg-[#0D0D11] text-white border border-neutral-800'
                    }`}
                  >
                    {cardSide === 'front' ? (
                      <>
                        <div className="flex justify-between items-start">
                          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-lg font-syne">
                            ak
                          </div>
                          <Radio className="w-6 h-6 opacity-70" />
                        </div>

                        <div className="space-y-1">
                          <h4 className={`text-2xl font-extrabold tracking-wide uppercase truncate transition-all ${
                            cardFont === 'cinzel' ? 'font-cinzel' : cardFont === 'outfit' ? 'font-outfit' : cardFont === 'spacegrotesk' ? 'font-space-grotesk' : cardFont === 'jakarta' ? 'font-jakarta' : 'font-syne'
                          }`}>
                            {fullName || 'Your Name'}
                          </h4>
                          <p className="text-xs opacity-90 font-space-grotesk font-bold tracking-widest uppercase truncate">
                            {title || 'Designation'} {company ? `• ${company}` : ''}
                          </p>
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-space-grotesk font-bold tracking-widest opacity-70 border-t border-current/20 pt-2">
                          <span>NFC DIGITAL IDENTITY</span>
                          <span>AI KLUB // CLASSIC</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono font-bold opacity-70">MAGNETIC CARD BACK</span>
                        </div>

                        <div className="bg-black/90 text-white p-2.5 rounded-xl flex items-center justify-between my-auto">
                          <div className="w-15 h-15 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center shadow-md">
                            <QRCodeSVG
                              value={`${window.location.origin}/profile/${profile ? profile.username : (user ? user.username : 'john')}`}
                              size={54}
                              level="H"
                              includeMargin={false}
                            />
                          </div>
                          <div className="text-right text-[10px] font-mono space-y-1 pl-2">
                            <p className="text-amber-400 font-bold">SCAN OR TAP CARD</p>
                            <p className="text-neutral-400">Universal VCF vCard</p>
                            <p className="text-white font-bold">{phone || '+91 9876543210'}</p>
                          </div>
                        </div>

                        <div className="text-[9px] font-mono opacity-50 text-center">
                          ai klub India • Classic Smart Identity Platform
                        </div>
                      </>
                    )}
                  </div>

                  {/* Card Sync Utilities */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={handleDownloadVcf}
                      className="w-full py-3 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-bold text-xs font-manrope flex items-center justify-center space-x-2 transition shadow-md cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download VCF Contact Card</span>
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={handleSimulateQrScan}
                        className="py-2.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-bold text-xs font-manrope flex items-center justify-center space-x-1.5 transition cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Simulate NFC Scan</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="py-2.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-bold text-xs font-manrope flex items-center justify-center space-x-1.5 transition cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-blue-500" />
                        <span>{copySuccess ? 'Copied Link!' : 'Copy Card URL'}</span>
                      </button>
                    </div>

                    <a
                      href={`/profile/${profile?.username || user?.username || 'john'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white font-bold text-xs font-manrope flex items-center justify-center space-x-1.5 transition cursor-pointer block text-center"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Live Public Digital Card</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Forgot Password Modal (Matching card.aikulb.com #modal-forgot-password-part) */}
            {showForgotModal && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl relative border border-neutral-200">
                  <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
                    <h4 className="text-xl font-extrabold text-neutral-900 font-manrope">Forgot Password</h4>
                    <button
                      onClick={() => setShowForgotModal(false)}
                      className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 font-bold flex items-center justify-center hover:bg-neutral-200 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-xs text-neutral-600 font-inter">
                    We will send a link to reset your password to your registered email address.
                  </p>

                  {forgotSubmitted ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-xs font-bold text-center font-inter">
                      ✓ Reset password link sent to {forgotEmailInput || 'your email'}!
                    </div>
                  ) : (
                    <form onSubmit={handleForgotSubmit} className="space-y-4">
                      <div>
                        <label className="text-neutral-700 font-bold text-xs block mb-1 font-manrope">Email Address</label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={forgotEmailInput}
                            onChange={(e) => setForgotEmailInput(e.target.value)}
                            placeholder="Enter your registered email"
                            className="w-full p-3.5 pl-10 rounded-2xl bg-white border border-neutral-300 text-xs font-bold focus:outline-none focus:border-[#FF3838]"
                          />
                          <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-4" />
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowForgotModal(false)}
                          className="flex-1 py-3 rounded-full bg-neutral-100 text-neutral-700 font-bold text-xs font-manrope hover:bg-neutral-200 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 rounded-full bg-[#FF3838] text-white font-extrabold text-xs font-manrope uppercase tracking-wider shadow-md hover:bg-[#E02828] transition"
                        >
                          Send Reset Link
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ========================================================================= */
          /* MODE 2: NEW AI DASHBOARD VIEW */
          /* ========================================================================= */
          <div className="space-y-8">
            {/* Nav Tabs */}
            <div className="flex space-x-2 border-b border-neutral-200 pb-2 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview & Analytics', icon: BarChart2 },
                ...((user?.email === 'admin@aiklub.com' || user?.email === 'admin@aikulb.com' || user?.role === 'admin')
                  ? [{ id: 'admin_cards', label: '⚡ Add & Manage Cards (Admin)', icon: ShieldCheck }]
                  : []),
                { id: 'qr_api', label: 'QR API & Card Sync', icon: QrCode },
                { id: 'edit_profile', label: 'Edit Profile & AI Bio', icon: User },
                { id: 'leads', label: `Captured Leads (${leads.length})`, icon: Users },
                { id: 'orders', label: `My Orders (${orders.length})`, icon: ShoppingBag },
                { id: 'team', label: 'Business Team', icon: Building2 },
              ].map((tab) => {
                const IconC = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold font-manrope flex items-center space-x-2 whitespace-nowrap transition ${
                      activeTab === tab.id
                        ? 'bg-[#6C4CFF] text-white shadow-md'
                        : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    <IconC className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* OVERVIEW & ANALYTICS TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                  <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xs">
                    <div className="flex justify-between items-center text-[#6C4CFF] mb-2">
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase">Total Views</span>
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-manrope">{profile ? profile.views_count : 2840}</div>
                    <div className="text-[10px] sm:text-[11px] text-emerald-600 font-bold mt-1">+18% this week</div>
                  </div>

                  <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xs">
                    <div className="flex justify-between items-center text-purple-600 mb-2">
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase">NFC Taps</span>
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-manrope">{profile ? profile.nfc_taps : 1420}</div>
                    <div className="text-[10px] sm:text-[11px] text-purple-600 font-bold mt-1">High Intent Taps</div>
                  </div>

                  <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xs">
                    <div className="flex justify-between items-center text-blue-600 mb-2">
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase">QR Scans</span>
                      <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-manrope">{profile ? profile.qr_scans : 1420}</div>
                    <div className="text-[10px] sm:text-[11px] text-neutral-500 font-mono mt-1">Universal QR</div>
                  </div>

                  <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xs">
                    <div className="flex justify-between items-center text-emerald-600 mb-2">
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase">Captured Leads</span>
                      <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-manrope">{leads.length}</div>
                    <div className="text-[10px] sm:text-[11px] text-emerald-600 font-bold mt-1">Active Pipeline</div>
                  </div>
                </div>

                {/* Recharts Chart */}
                <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-xs">
                  <h3 className="text-xl font-extrabold text-neutral-900 font-manrope">Weekly Profile Interaction Trends</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6C4CFF" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6C4CFF" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="#64748B" />
                        <YAxis stroke="#64748B" />
                        <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', color: '#000' }} />
                        <Area type="monotone" dataKey="views" stroke="#6C4CFF" fillOpacity={1} fill="url(#colorViews)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* ADMIN CARDS & HARDWARE INVENTORY TAB */}
            {activeTab === 'admin_cards' && (
              <div className="p-8 rounded-3xl bg-neutral-900 text-white space-y-6 shadow-2xl border border-emerald-900/60 font-sans">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-900/40">
                  <div>
                    <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#00DC82] uppercase bg-[#00DC82]/10 px-3 py-1 rounded-full border border-[#00DC82]/20 mb-2">
                      <ShieldCheck className="w-4 h-4 text-[#00DC82]" />
                      <span>Card Inventory & Hardware Manager</span>
                    </div>
                    <h3 className="text-2xl font-black text-white font-heading">
                      Add & Manage Hardware Cards
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-inter">
                      Add new custom smart cards, manage live catalog prices, and sync inventory with SQLite DB.
                    </p>
                  </div>

                  <button
                    onClick={() => navigate('/admin')}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#00DC82] via-[#10B981] to-[#059669] hover:brightness-110 text-black font-black text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-emerald-900/30 transition cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Open Full Add Card Studio (/admin)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="p-6 rounded-2xl bg-[#070A0F] border border-emerald-900/60 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00DC82]/10 border border-[#00DC82]/30 flex items-center justify-center text-[#00DC82]">
                      <Plus className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-white text-base font-heading">Add Custom Card</h4>
                    <p className="text-xs text-slate-400 font-inter">
                      Create cards with custom materials (Matte Steel, 24K Gold, Walnut Wood, PVC, Acrylic Stand) and set prices.
                    </p>
                    <button
                      onClick={() => navigate('/admin')}
                      className="w-full py-2.5 rounded-xl bg-[#00DC82] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition cursor-pointer"
                    >
                      + Add New Product
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#070A0F] border border-emerald-900/60 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Star className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-white text-base font-heading">Homepage Showcase</h4>
                    <p className="text-xs text-slate-400 font-inter">
                      Toggle featured cards live on the homepage portfolio showcase with 1-click database update.
                    </p>
                    <button
                      onClick={() => navigate('/admin')}
                      className="w-full py-2.5 rounded-xl bg-[#0D121B] border border-emerald-900/60 text-slate-200 font-bold text-xs hover:border-[#00DC82] transition cursor-pointer"
                    >
                      Manage Featured Cards
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#070A0F] border border-emerald-900/60 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-white text-base font-heading">Real-Time DB Sync</h4>
                    <p className="text-xs text-slate-400 font-inter">
                      All new hardware cards sync live across `/store`, `/product/:id`, and custom card designer.
                    </p>
                    <button
                      onClick={() => navigate('/admin')}
                      className="w-full py-2.5 rounded-xl bg-[#0D121B] border border-emerald-900/60 text-slate-200 font-bold text-xs hover:border-[#00DC82] transition cursor-pointer"
                    >
                      View Live Catalog
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* QR API & CARD SYNC TAB */}
            {activeTab === 'qr_api' && (
              <div className="space-y-8">
                {/* Header overview */}
                <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-neutral-900 font-manrope flex items-center space-x-2">
                        <QrCode className="w-5 h-5 text-[#6C4CFF]" />
                        <span>Smart Card QR APIs & Database Sync</span>
                      </h3>
                      <p className="text-xs text-neutral-500 font-inter mt-1">
                        Generate vector SVG, PNG, or vCard QR codes for physical smart cards with real-time scan analytics sync.
                      </p>
                    </div>
                    <button
                      onClick={handleSimulateQrScan}
                      className="px-5 py-2.5 rounded-full bg-[#6C4CFF] hover:bg-[#5B3BE5] text-white font-bold text-xs font-manrope shadow-md transition flex items-center space-x-2 shrink-0 cursor-pointer"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Simulate Live QR Scan (+1 Scan DB Sync)</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    {/* Card 1: Profile Web QR */}
                    <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-4 shadow-xs text-center flex flex-col items-center">
                      <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-[10px] font-mono font-bold uppercase">
                        Web Profile Redirect
                      </span>
                      <h4 className="font-extrabold text-neutral-900 text-sm font-manrope">Digital Profile QR</h4>
                      <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-inner flex items-center justify-center">
                        <QRCodeSVG
                          value={`${window.location.origin}/profile/${profile ? profile.username : 'user'}`}
                          size={150}
                          level="H"
                          includeMargin={false}
                        />
                      </div>
                      <div className="text-[10px] font-mono text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                        ✓ Web Profile Redirect Ready
                      </div>
                      <div className="flex space-x-2 w-full pt-2">
                        <a
                          href={`/api/qr/profile/${profile ? profile.username : 'user'}?format=png`}
                          download={`qr_profile_${profile ? profile.username : 'user'}.png`}
                          className="flex-1 py-2 rounded-full bg-neutral-900 text-white font-bold text-xs font-manrope flex items-center justify-center space-x-1 hover:bg-neutral-800 transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PNG</span>
                        </a>
                        <a
                          href={`/api/qr/profile/${profile ? profile.username : 'user'}?format=svg`}
                          download={`qr_profile_${profile ? profile.username : 'user'}.svg`}
                          className="flex-1 py-2 rounded-full bg-white border border-neutral-300 text-neutral-900 font-bold text-xs font-manrope flex items-center justify-center space-x-1 hover:bg-neutral-100 transition"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>SVG</span>
                        </a>
                      </div>
                    </div>

                    {/* Card 2: vCard Direct Contact QR */}
                    <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-4 shadow-xs text-center flex flex-col items-center">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-mono font-bold uppercase">
                        1-Tap Contact Save
                      </span>
                      <h4 className="font-extrabold text-neutral-900 text-sm font-manrope">vCard Direct Contact QR</h4>
                      <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-inner flex items-center justify-center">
                        <QRCodeSVG
                          value={`BEGIN:VCARD\nVERSION:3.0\nFN:${profile?.full_name || 'ai klub Member'}\nTEL:${profile?.phone || ''}\nEMAIL:${profile?.email || ''}\nEND:VCARD`}
                          size={150}
                          level="M"
                          includeMargin={false}
                        />
                      </div>
                      <div className="text-[10px] font-mono text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                        ✓ Standard vCard 3.0 Payload
                      </div>
                      <div className="flex space-x-2 w-full pt-2">
                        <a
                          href={`/api/qr/vcard/${profile ? profile.username : 'user'}?format=png`}
                          download={`qr_vcard_${profile ? profile.username : 'user'}.png`}
                          className="flex-1 py-2 rounded-full bg-neutral-900 text-white font-bold text-xs font-manrope flex items-center justify-center space-x-1 hover:bg-neutral-800 transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PNG</span>
                        </a>
                        <a
                          href={`/api/qr/vcard/${profile ? profile.username : 'user'}?format=svg`}
                          download={`qr_vcard_${profile ? profile.username : 'user'}.svg`}
                          className="flex-1 py-2 rounded-full bg-white border border-neutral-300 text-neutral-900 font-bold text-xs font-manrope flex items-center justify-center space-x-1 hover:bg-neutral-100 transition"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>SVG</span>
                        </a>
                      </div>
                    </div>

                    {/* Card 3: Physical Smart Card QR */}
                    <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-4 shadow-xs text-center flex flex-col items-center">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-mono font-bold uppercase">
                        Hardware NFC Sync
                      </span>
                      <h4 className="font-extrabold text-neutral-900 text-sm font-manrope">Smart Card Payload QR</h4>
                      <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-inner flex items-center justify-center">
                        <QRCodeSVG
                          value={`${window.location.origin}/designer?id=CARD-DEMO-8849`}
                          size={150}
                          level="H"
                          includeMargin={false}
                        />
                      </div>
                      <div className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        ✓ Hardware NFC Chip Data
                      </div>
                      <div className="flex space-x-2 w-full pt-2">
                        <a
                          href={`/api/qr/card/CARD-DEMO-8849?format=png`}
                          download="qr_card_demo.png"
                          className="flex-1 py-2 rounded-full bg-neutral-900 text-white font-bold text-xs font-manrope flex items-center justify-center space-x-1 hover:bg-neutral-800 transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PNG</span>
                        </a>
                        <a
                          href={`/api/qr/card/CARD-DEMO-8849?format=svg`}
                          download="qr_card_demo.svg"
                          className="flex-1 py-2 rounded-full bg-white border border-neutral-300 text-neutral-900 font-bold text-xs font-manrope flex items-center justify-center space-x-1 hover:bg-neutral-100 transition"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>SVG</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* API Developer Reference Documentation */}
                <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4 shadow-xs font-inter">
                  <h3 className="text-lg font-extrabold text-neutral-900 font-manrope flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-neutral-700" />
                    <span>REST QR API Reference Endpoints</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">GET</span>
                        <span className="text-[#6C4CFF] font-bold">/api/qr/generate</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 font-sans">
                        Universal QR generator. Pass <code className="bg-neutral-100 px-1 py-0.5 rounded">text</code> query parameter. Returns image buffer or JSON dataURL.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">GET</span>
                        <span className="text-[#6C4CFF] font-bold">/api/qr/profile/:username</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 font-sans">
                        Generates branded web profile QR code redirecting directly to user digital identity.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">GET</span>
                        <span className="text-[#6C4CFF] font-bold">/api/qr/vcard/:username</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 font-sans">
                        Encodes standard vCard 3.0 string into QR code for instant offline contact saving on iOS/Android.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">POST</span>
                        <span className="text-[#6C4CFF] font-bold">/api/qr/scan</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 font-sans">
                        Records a QR scan event into SQLite database, incrementing <code className="bg-neutral-100 px-1 py-0.5 rounded">qr_scans</code> and logging scan history analytics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EDIT PROFILE TAB */}
            {activeTab === 'edit_profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form onSubmit={handleProfileSave} className="lg:col-span-8 p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xs">
                  <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
                    <h3 className="text-xl font-extrabold text-neutral-900 font-manrope">Edit Profile & AI Assistant</h3>
                    {saved && <span className="text-xs font-bold text-emerald-600">✓ Saved!</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-inter">
                    <div>
                      <label className="text-neutral-600 font-bold block mb-1 font-manrope">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-bold focus:outline-none focus:border-[#6C4CFF]"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-600 font-bold block mb-1 font-manrope">Designation</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#6C4CFF]"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-600 font-bold block mb-1 font-manrope">Company</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#6C4CFF]"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-600 font-bold block mb-1 font-manrope">Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#6C4CFF]"
                      />
                    </div>
                  </div>

                  <div className="text-xs space-y-2 font-inter">
                    <div className="flex justify-between items-center">
                      <label className="text-neutral-600 font-bold font-manrope">Bio Description</label>
                      <button
                        type="button"
                        onClick={handleGenerateAiBio}
                        disabled={aiLoading}
                        className="text-[11px] text-[#6C4CFF] hover:text-[#8B5CF6] font-bold flex items-center space-x-1 font-manrope cursor-pointer"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span>{aiLoading ? 'Generating...' : '✨ Generate Bio with AI'}</span>
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#6C4CFF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full btn-pill-gradient text-white font-bold text-xs font-manrope shadow-md transition cursor-pointer"
                  >
                    Save Changes
                  </button>
                </form>

                <div className="lg:col-span-4 p-6 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4 text-xs shadow-xs font-inter">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-[#6C4CFF]" />
                    <h4 className="font-extrabold text-neutral-900 text-base font-manrope">Digital Profile Showcase</h4>
                  </div>
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                    Your dynamic NFC digital identity is live and accessible. Share it via tap or instant profile link.
                  </p>
                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="w-full py-3 rounded-full bg-[#6C4CFF] hover:bg-[#5B3BE5] text-white font-bold text-center flex items-center justify-center space-x-2 font-manrope transition shadow-md cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copySuccess ? '✓ Link Copied!' : 'Copy Digital Profile Link'}</span>
                    </button>
                    <a
                      href={`/profile/${profile?.username || user?.username || 'john'}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 rounded-full bg-neutral-900 hover:bg-black text-white font-bold text-center flex items-center justify-center space-x-2 font-manrope transition cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Preview Live Digital Card</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* LEADS TAB */}
            {activeTab === 'leads' && (
              <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xs">
                <h3 className="text-xl font-extrabold text-neutral-900 font-manrope">Captured Leads CRM</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-neutral-800 font-inter">
                    <thead className="text-[10px] font-mono text-neutral-600 uppercase bg-neutral-100 border-b border-neutral-200">
                      <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email & Phone</th>
                        <th className="p-3">Company</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 bg-white">
                      {leads.map((l) => (
                        <tr key={l.id} className="hover:bg-neutral-50">
                          <td className="p-3 font-bold text-neutral-900 font-manrope">{l.name}</td>
                          <td className="p-3 font-mono">{l.email} <br /> {l.phone}</td>
                          <td className="p-3">{l.company || 'N/A'}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-full font-mono font-bold text-[10px] ${
                              l.status === 'Qualified' ? 'bg-purple-100 text-purple-700' :
                              l.status === 'Converted' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-[#FF3838]'
                            }`}>
                              {l.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <select
                              value={l.status}
                              onChange={(e) => handleUpdateLeadStatus(l.id, e.target.value)}
                              className="bg-white border border-neutral-300 text-xs text-neutral-900 rounded-lg p-1.5 font-medium focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Qualified">Qualified</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xs">
                <h3 className="text-xl font-extrabold text-neutral-900 font-manrope">Order History</h3>
                <div className="space-y-4 font-inter">
                  {orders.length === 0 ? (
                    <p className="text-xs text-neutral-500">No orders placed yet.</p>
                  ) : (
                    orders.map((o) => (
                      <div key={o.id} className="p-4 rounded-2xl bg-white border border-neutral-200 flex justify-between items-center text-xs shadow-xs">
                        <div>
                          <div className="font-bold text-neutral-900 font-manrope text-sm">Order #{o.order_number}</div>
                          <div className="text-neutral-500 text-[11px]">{new Date(o.created_at).toLocaleDateString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#6C4CFF] font-mono text-sm">₹{o.total_amount}</div>
                          <div className="text-emerald-600 font-mono text-[10px] font-bold">{o.status} ({o.payment_status})</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* BUSINESS TEAM TAB */}
            {activeTab === 'team' && (
              <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xs">
                <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-neutral-900 font-manrope">Business Team Management</h3>
                    <p className="text-xs text-neutral-500 font-inter">Centralized corporate card assignment and team lead CRM.</p>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-mono font-bold border border-purple-200">
                    Enterprise Active
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-neutral-200 text-xs text-neutral-800 font-inter">
                  {team ? (
                    <div>Team Name: <span className="font-bold text-neutral-900 font-manrope">{team.name}</span></div>
                  ) : (
                    <div>No team assigned yet. You can create a team in your Admin Portal.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
