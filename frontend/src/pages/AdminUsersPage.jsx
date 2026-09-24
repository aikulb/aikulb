import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/apiClient';
import {
  Layers,
  Search,
  RefreshCw,
  ArrowLeft,
  UserCheck,
  ExternalLink,
  ShieldCheck,
  Download,
  CheckCircle2,
  Users
} from 'lucide-react';

export const AdminUsersPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    setLoading(true);
    const statsRes = await api.getAdminStats();
    if (statsRes.success && statsRes.data) {
      setStats(statsRes.data.stats);
      setUsers(statsRes.data.recentUsers || []);
    }
    setLoading(false);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const exportUsersCSV = () => {
    if (users.length === 0) return;
    const headers = ['User ID', 'Name', 'Email', 'Role', 'Registration Date'];
    const rows = filteredUsers.map((u) => [
      u.id,
      u.name || 'User',
      u.email || 'N/A',
      u.role || 'customer',
      new Date(u.created_at || Date.now()).toLocaleDateString('en-IN')
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ai_klub_users_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 Exported User Registry CSV!');
  };

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.id || '').toLowerCase().includes(q);

    const matchesRole = roleFilter === 'all' || (u.role || 'customer').toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-neutral-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold font-mono border border-slate-700 flex items-center space-x-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/admin"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-black transition"
          >
            <ArrowLeft className="w-4 h-4 text-teal-600" />
            <span>← Back to Card & Product Management</span>
          </Link>

          <div className="flex items-center space-x-2">
            <button
              onClick={exportUsersCSV}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-black hover:bg-slate-50 text-xs font-bold flex items-center space-x-1.5 shadow-xs transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-teal-600" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={fetchUsersData}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Users</span>
            </button>
          </div>
        </div>

        {/* Page Title & KPI Cards */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-teal-700 uppercase bg-teal-100 px-3 py-1 rounded-full border border-teal-200 mb-2">
                <Layers className="w-4 h-4 text-teal-700" />
                <span>Registered User Database & Digital Profiles</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-manrope">
                User Registry & NFC Profiles
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 font-inter">
                View all registered accounts, manage customer roles, and inspect active digital business card profiles.
              </p>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="text-xs font-mono text-slate-500 uppercase font-bold flex items-center justify-between">
                <span>Total Profiles</span>
                <Layers className="w-4 h-4 text-teal-600" />
              </div>
              <div className="text-3xl font-black text-neutral-900 font-manrope mt-2">{stats?.totalProfiles || users.length}</div>
              <div className="text-[11px] font-semibold text-slate-500 mt-1">Live digital card profiles</div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="text-xs font-mono text-slate-500 uppercase font-bold flex items-center justify-between">
                <span>Registered Users</span>
                <Users className="w-4 h-4 text-teal-600" />
              </div>
              <div className="text-3xl font-black text-teal-600 font-manrope mt-2">{stats?.totalUsers || users.length}</div>
              <div className="text-[11px] font-semibold text-slate-500 mt-1">Total customer accounts</div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden col-span-2 md:col-span-1">
              <div className="text-xs font-mono text-slate-500 uppercase font-bold flex items-center justify-between">
                <span>Database Sync</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-black text-emerald-600 font-manrope mt-2">Active</div>
              <div className="text-[11px] font-semibold text-slate-500 mt-1">SQLite Real-time Connection</div>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search users by Name, Email, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-xs text-neutral-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-600 font-medium"
              />
            </div>

            <div className="flex items-center space-x-3 text-xs font-inter">
              <span className="text-slate-600 font-bold">Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-neutral-900 font-bold text-xs focus:outline-none focus:border-teal-600"
              >
                <option value="all">All Roles</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>

        {/* User List */}
        {loading ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <div className="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-xs font-mono font-bold text-slate-500">Loading User Database...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500 font-medium">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-900 font-manrope">No Users Found</h3>
            <p className="text-xs text-slate-500 mt-1">No user accounts matched your search query.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((usr) => (
              <div
                key={usr.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-teal-400 transition shadow-xs"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 font-extrabold flex items-center justify-center uppercase font-manrope text-base shrink-0 border border-teal-200">
                    {usr.name ? usr.name.substring(0, 2) : 'US'}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-extrabold text-neutral-900 text-base font-manrope">{usr.name || 'AI KLUB User'}</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 text-[10px] font-mono font-bold uppercase border border-teal-200">
                        {usr.role || 'customer'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{usr.email}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Joined: {new Date(usr.created_at || Date.now()).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <span className="text-slate-400 font-mono text-xs font-bold">{usr.id}</span>
                  <a
                    href={`/profile/john`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center space-x-1.5 shadow-xs"
                  >
                    <span>View Digital Card</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
