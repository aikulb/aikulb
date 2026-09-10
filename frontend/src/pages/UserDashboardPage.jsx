import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/apiClient';
import { User, Eye, Users, Zap, QrCode, BarChart2, CheckCircle2, Phone, Mail, Sparkles, Building2, ShoppingBag, Layout, Download, FileText, Globe, ArrowRight, Bot } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const UserDashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'classic' ? 'classic' : 'new';
  const [dashboardMode, setDashboardMode] = useState(initialMode);

  const { user } = useAuth();
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
  const [saved, setSaved] = useState(false);

  // AI Assistant states
  const [aiBio, setAiBio] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    const [profRes, leadRes, ordRes, teamRes] = await Promise.all([
      api.getMyProfile(),
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
    }
    if (leadRes.success) setLeads(leadRes.data);
    if (ordRes.success) setOrders(ordRes.data);
    if (teamRes.success) setTeam(teamRes.data);

    setLoading(false);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    const res = await api.updateProfile({
      full_name: fullName,
      title,
      company,
      bio,
      phone,
      email,
      whatsapp,
      website,
    });
    if (res.success) {
      setSaved(true);
      fetchDashboardData();
      setTimeout(() => setSaved(false), 3000);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center text-neutral-900 font-manrope">
        <div className="animate-spin w-8 h-8 border-4 border-[#FF3838] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Header & Dashboard Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-neutral-200 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-3xl font-black text-neutral-900 font-manrope">
                {user ? user.name : 'aikulb Member'}
              </h1>
              <span className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold ${
                dashboardMode === 'new' ? 'bg-[#FF3838]/10 text-[#FF3838] border border-[#FF3838]/30' : 'bg-neutral-100 text-neutral-700 border border-neutral-300'
              }`}>
                {dashboardMode === 'new' ? '✨ NEW AI DASHBOARD' : 'CLASSIC DASHBOARD'}
              </span>
            </div>
            <p className="text-xs text-neutral-500 font-mono">
              Public Identity URL: <span className="text-[#FF3838] font-bold">/profile/{profile ? profile.username : 'user'}</span>
            </p>
          </div>

          {/* Mode Switcher Pill */}
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
                dashboardMode === 'new' ? 'bg-[#FF3838] text-white shadow-md' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>New AI Dashboard</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODE 1: CLASSIC DASHBOARD VIEW */}
        {/* ========================================================================= */}
        {dashboardMode === 'classic' ? (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200 flex justify-between items-center text-xs shadow-xs">
              <div>
                <h3 className="font-extrabold text-neutral-900 text-base font-manrope">Classic Identity Manager</h3>
                <p className="text-neutral-500 font-inter">Stable, clear, and direct contact card management.</p>
              </div>
              {profile && (
                <a
                  href={`/api/profile/vcf/${profile.username}`}
                  download
                  className="px-5 py-2.5 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-bold text-xs flex items-center space-x-1 font-manrope shadow-md transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download VCF Card</span>
                </a>
              )}
            </div>

            <form onSubmit={handleProfileSave} className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-6 shadow-xs">
              <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
                <h3 className="text-lg font-extrabold text-neutral-900 font-manrope">Classic Contact Information</h3>
                {saved && <span className="text-xs font-bold text-emerald-600">✓ Changes Saved</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-inter">
                <div>
                  <label className="text-neutral-600 font-bold block mb-1 font-manrope">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-bold focus:outline-none focus:border-[#FF3838]"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 font-bold block mb-1 font-manrope">Title / Designation</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 font-bold block mb-1 font-manrope">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 font-bold block mb-1 font-manrope">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 font-bold block mb-1 font-manrope">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 font-bold block mb-1 font-manrope">Website URL</label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                  />
                </div>
              </div>

              <div className="text-xs font-inter">
                <label className="text-neutral-600 font-bold block mb-1 font-manrope">Professional Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-extrabold text-xs font-manrope shadow-md transition cursor-pointer"
              >
                Save Classic Profile
              </button>
            </form>
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
                        ? 'bg-[#FF3838] text-white shadow-md'
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xs">
                    <div className="flex justify-between items-center text-[#FF3838] mb-2">
                      <span className="text-xs font-mono font-bold uppercase">Total Views</span>
                      <Eye className="w-5 h-5" />
                    </div>
                    <div className="text-3xl font-black text-neutral-900 font-manrope">{profile ? profile.views_count : 2840}</div>
                    <div className="text-[11px] text-emerald-600 font-bold mt-1">+18% this week</div>
                  </div>

                  <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xs">
                    <div className="flex justify-between items-center text-purple-600 mb-2">
                      <span className="text-xs font-mono font-bold uppercase">NFC Taps</span>
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="text-3xl font-black text-neutral-900 font-manrope">{profile ? profile.nfc_taps : 1420}</div>
                    <div className="text-[11px] text-purple-600 font-bold mt-1">High Intent Taps</div>
                  </div>

                  <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xs">
                    <div className="flex justify-between items-center text-blue-600 mb-2">
                      <span className="text-xs font-mono font-bold uppercase">QR Scans</span>
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div className="text-3xl font-black text-neutral-900 font-manrope">{profile ? profile.qr_scans : 1420}</div>
                    <div className="text-[11px] text-neutral-500 font-mono mt-1">Universal QR</div>
                  </div>

                  <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xs">
                    <div className="flex justify-between items-center text-emerald-600 mb-2">
                      <span className="text-xs font-mono font-bold uppercase">Captured Leads</span>
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="text-3xl font-black text-neutral-900 font-manrope">{leads.length}</div>
                    <div className="text-[11px] text-emerald-600 font-bold mt-1">Active Pipeline</div>
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
                            <stop offset="5%" stopColor="#FF3838" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#FF3838" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="#64748B" />
                        <YAxis stroke="#64748B" />
                        <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', color: '#000' }} />
                        <Area type="monotone" dataKey="views" stroke="#FF3838" fillOpacity={1} fill="url(#colorViews)" />
                      </AreaChart>
                    </ResponsiveContainer>
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
                        className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 font-bold focus:outline-none focus:border-[#FF3838]"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-600 font-bold block mb-1 font-manrope">Designation</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-600 font-bold block mb-1 font-manrope">Company</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-600 font-bold block mb-1 font-manrope">Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
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
                        className="text-[11px] text-[#FF3838] hover:text-[#E02828] font-bold flex items-center space-x-1 font-manrope"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span>{aiLoading ? 'Generating...' : '✨ Generate Bio with AI'}</span>
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-3 rounded-2xl bg-white border border-neutral-300 text-neutral-900 focus:outline-none focus:border-[#FF3838]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-[#FF3838] hover:bg-[#E02828] text-white font-bold text-xs font-manrope shadow-md transition"
                  >
                    Save Changes
                  </button>
                </form>

                <div className="lg:col-span-4 p-6 rounded-3xl bg-neutral-50 border border-neutral-200 space-y-4 text-xs shadow-xs font-inter">
                  <h4 className="font-extrabold text-neutral-900 text-base font-manrope">Public Link</h4>
                  <div className="p-3.5 rounded-2xl bg-white border border-neutral-300 font-mono text-[#FF3838] text-[11px] break-all font-bold">
                    /profile/{profile ? profile.username : 'user'}
                  </div>
                  {profile && (
                    <a
                      href={`/profile/${profile.username}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-center block font-manrope transition"
                    >
                      Preview Live Profile
                    </a>
                  )}
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
                          <div className="font-bold text-[#FF3838] font-mono text-sm">₹{o.total_amount}</div>
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
