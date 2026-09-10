import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/apiClient';
import { Phone, Mail, MessageSquare, Download, Globe, Linkedin, Instagram, Youtube, Github, Share2, QrCode, Sparkles, CheckCircle2, UserPlus, FileText, ArrowRight, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const PublicProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Lead Form state
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    setLoading(true);
    const res = await api.getPublicProfile(username);
    if (res.success) {
      setProfile(res.data);
      // Track NFC/Profile view
      api.trackInteraction(res.data.id, 'view');
    }
    setLoading(false);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!profile) return;
    const res = await api.captureLead({
      profile_id: profile.id,
      name: leadName,
      email: leadEmail,
      phone: leadPhone,
      company: leadCompany,
      message: leadMessage,
    });
    if (res.success) {
      setLeadSubmitted(true);
      setTimeout(() => {
        setLeadSubmitted(false);
        setShowLeadModal(false);
      }, 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center text-neutral-900 font-manrope">
        <div className="animate-spin w-8 h-8 border-4 border-[#FF3838] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col items-center justify-center p-4 font-manrope">
        <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
        <p className="text-sm text-neutral-600 mb-4">The aikulb profile "/profile/{username}" does not exist.</p>
        <Link to="/" className="px-6 py-3 rounded-xl bg-[#FF3838] hover:bg-[#e62e2e] text-white font-bold transition">Go to aikulb Home</Link>
      </div>
    );
  }

  const profileUrl = window.location.href;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col items-center justify-start pb-16 font-sans">
      {/* Mobile Container Frame */}
      <div className="w-full max-w-md bg-neutral-50 min-h-screen border-x border-neutral-200 shadow-2xl relative flex flex-col justify-between">
        <div>
          {/* Banner Image */}
          <div className="h-44 w-full relative bg-gradient-to-r from-neutral-800 via-neutral-900 to-black overflow-hidden">
            {profile.banner_url && (
              <img src={profile.banner_url} alt="Banner" className="w-full h-full object-cover opacity-60" />
            )}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setShowShareModal(true)}
                className="p-2 rounded-full bg-white/80 text-neutral-900 hover:text-black backdrop-blur-md border border-neutral-200 shadow"
                title="Share Profile & QR"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Profile Avatar & Identity */}
          <div className="px-6 relative -mt-16 text-center space-y-3">
            <div className="relative w-28 h-28 mx-auto rounded-full p-1.5 bg-gradient-to-tr from-[#FF3838] via-purple-600 to-blue-600 shadow-xl">
              <img
                src={profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                alt={profile.full_name}
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
                ✓
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-neutral-900 font-heading">{profile.full_name}</h1>
              <p className="text-xs text-[#FF3838] font-bold tracking-wide mt-0.5">
                {profile.title} {profile.company ? `• ${profile.company}` : ''}
              </p>
            </div>

            {profile.bio && (
              <p className="text-xs text-neutral-600 leading-relaxed px-2 font-medium">
                {profile.bio}
              </p>
            )}

            {/* Primary 4 Quick Contact Actions */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="p-3 rounded-2xl bg-white border border-neutral-200 hover:border-[#FF3838] text-neutral-900 flex flex-col items-center shadow-sm transition"
                >
                  <Phone className="w-5 h-5 mb-1 text-[#FF3838]" />
                  <span className="text-[10px] font-bold">Call</span>
                </a>
              )}

              {profile.whatsapp && (
                <a
                  href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-white border border-neutral-200 hover:border-emerald-500 text-neutral-900 flex flex-col items-center shadow-sm transition"
                >
                  <MessageSquare className="w-5 h-5 mb-1 text-emerald-600" />
                  <span className="text-[10px] font-bold">WhatsApp</span>
                </a>
              )}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-3 rounded-2xl bg-white border border-neutral-200 hover:border-purple-500 text-neutral-900 flex flex-col items-center shadow-sm transition"
                >
                  <Mail className="w-5 h-5 mb-1 text-purple-600" />
                  <span className="text-[10px] font-bold">Email</span>
                </a>
              )}

              <a
                href={`/api/profile/vcf/${profile.username}`}
                download
                className="p-3 rounded-2xl bg-[#FF3838] hover:bg-[#e62e2e] text-white font-extrabold flex flex-col items-center shadow-md transition"
              >
                <Download className="w-5 h-5 mb-1" />
                <span className="text-[10px]">Save VCF</span>
              </a>
            </div>

            {/* Connect With Me Lead Button */}
            <button
              onClick={() => setShowLeadModal(true)}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs flex items-center justify-center space-x-2 border border-neutral-300 shadow-sm mt-3 transition"
            >
              <UserPlus className="w-4 h-4 text-[#FF3838]" />
              <span>Connect & Share Your Details</span>
            </button>
          </div>

          {/* Social Links Row */}
          <div className="px-6 mt-6 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">Social Channels</h3>
            <div className="flex flex-wrap gap-2">
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white border border-neutral-200 text-blue-600 flex items-center space-x-2 text-xs font-bold shadow-sm">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile.instagram && (
                <a href={profile.instagram} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white border border-neutral-200 text-pink-600 flex items-center space-x-2 text-xs font-bold shadow-sm">
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              )}
              {profile.youtube && (
                <a href={profile.youtube} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white border border-neutral-200 text-red-600 flex items-center space-x-2 text-xs font-bold shadow-sm">
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
              )}
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-900 flex items-center space-x-2 text-xs font-bold shadow-sm">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Custom Links & Services Section */}
          {(profile.custom_links || []).length > 0 && (
            <div className="px-6 mt-6 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">Featured Links & Documents</h3>
              <div className="space-y-2">
                {profile.custom_links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-2xl bg-white border border-neutral-200 hover:border-[#FF3838] flex justify-between items-center text-xs font-bold text-neutral-900 shadow-sm transition"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-[#FF3838]" />
                      <span>{link.title}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {(profile.services || []).length > 0 && (
            <div className="px-6 mt-6 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">Services & Solutions</h3>
              <div className="space-y-2">
                {profile.services.map((s, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white border border-neutral-200 space-y-1 shadow-sm">
                    <div className="font-bold text-neutral-900 text-xs">{s.name}</div>
                    <p className="text-[11px] text-neutral-600 font-medium">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* aikulb Footer Branding */}
        <div className="p-6 text-center border-t border-neutral-200 mt-12 bg-white">
          <Link to="/" className="inline-flex items-center space-x-2 text-xs text-neutral-600 hover:text-[#FF3838] font-mono">
            <div className="w-5 h-5 rounded bg-[#FF3838] text-white font-black text-[10px] flex items-center justify-center">ak</div>
            <span>Powered by aikulb Smart Identity Engine</span>
          </Link>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white border border-neutral-200 rounded-3xl p-6 text-neutral-900 relative space-y-4 shadow-2xl">
            <button
              onClick={() => setShowLeadModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-neutral-900 font-heading">Connect With {profile.full_name}</h3>
              <p className="text-xs text-neutral-600 mt-1">Share your contact details directly to get in touch.</p>
            </div>

            {leadSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold text-center flex items-center justify-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Details sent to {profile.full_name}!</span>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-600 block mb-1 font-semibold">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 block mb-1 font-semibold">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 block mb-1 font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                  />
                </div>
                <div>
                  <label className="text-neutral-600 block mb-1 font-semibold">Message / Note</label>
                  <textarea
                    rows={2}
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 font-medium focus:outline-none focus:border-[#FF3838]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#FF3838] hover:bg-[#e62e2e] text-white font-bold text-xs shadow-lg transition"
                >
                  Submit Details
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Share QR Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-white border border-neutral-200 rounded-3xl p-6 text-neutral-900 text-center relative space-y-4 shadow-2xl">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-neutral-900 font-heading">Share Digital Profile</h3>

            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl mx-auto w-fit shadow-md">
              <QRCodeSVG value={profileUrl} size={180} />
            </div>

            <p className="text-xs text-neutral-600 font-medium">Scan QR code with any smartphone camera to open profile.</p>
          </div>
        </div>
      )}
    </div>
  );
};
