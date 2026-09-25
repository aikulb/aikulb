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
        <p className="text-sm text-neutral-600 mb-4">The requested ai klub digital profile does not exist.</p>
        <Link to="/" className="px-6 py-3 rounded-xl bg-[#FF3838] hover:bg-[#e62e2e] text-white font-bold transition">Go to ai klub Home</Link>
      </div>
    );
  }

  const profileUrl = window.location.href;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col items-center justify-start pb-16 font-sans">
      {/* Mobile Container Frame */}
      <div className="w-full max-w-md bg-[#080B11] text-white min-h-screen border-x border-neutral-800 shadow-2xl relative flex flex-col justify-between overflow-hidden">
        <div>
          {/* Top Curved Red Banner */}
          <div className="h-28 w-full bg-gradient-to-r from-[#FF4D4D] via-[#FF3838] to-[#E62E2E] relative overflow-hidden flex items-start justify-between p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.25),transparent_70%)] pointer-events-none" />
            
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-white font-manrope text-xs font-bold border border-white/20">
              <img src="/assets/logo.png" alt="ai klub" className="w-4 h-4 object-contain mix-blend-screen" />
              <span>ai klub Smart Card</span>
            </div>

            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md border border-white/20 shadow transition"
              title="Share Profile & QR"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Split Profile Header Card */}
          <div className="px-4 relative -mt-10">
            <div className="rounded-2xl bg-[#0F1420] border border-neutral-800 shadow-2xl overflow-hidden flex items-stretch">
              {/* Left Photo Avatar */}
              <div className="w-32 bg-neutral-900 relative shrink-0 overflow-hidden border-r border-neutral-800">
                <img
                  src={profile.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'}
                  alt={profile.full_name}
                  className="w-full h-full object-cover object-center min-h-[120px]"
                />
              </div>

              {/* Right Dark Info Box */}
              <div className="flex-1 p-3.5 bg-[#0B0E17] flex flex-col justify-between">
                <div>
                  <h1 className="font-extrabold text-white text-lg font-heading leading-tight">{profile.full_name}</h1>
                  <p className="text-xs text-slate-300 font-medium font-inter mt-1">
                    {profile.title} {profile.company ? `• ${profile.company}` : ''}
                  </p>
                </div>

                <div className="pt-3">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#FF4D4D]/15 border border-[#FF4D4D]/30 text-[#FF4D4D] text-xs font-bold">
                    <Sparkles className="w-3 h-3" />
                    <span>Verified Profile</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Contact & Share Pill Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <a
                href={`/api/profile/vcf/${profile.username}`}
                download
                onClick={() => api.trackInteraction(profile.id, 'vcf')}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#FF4D4D] to-[#FF3838] hover:from-[#e63939] hover:to-[#d92626] text-white font-extrabold text-xs font-manrope shadow-lg flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Save Contact</span>
              </a>

              <button
                onClick={() => {
                  api.trackInteraction(profile.id, 'share');
                  if (navigator.share) {
                    navigator.share({ title: profile.full_name, url: window.location.href }).catch(() => setShowShareModal(true));
                  } else {
                    setShowShareModal(true);
                  }
                }}
                className="w-full py-3 rounded-full bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#0F172A] font-extrabold text-xs font-manrope shadow-md flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#0F172A]" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* ABOUT Section */}
          <div className="px-4 mt-5 space-y-1.5">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">ABOUT</h3>
            <div className="p-3.5 rounded-2xl bg-[#0F1420] border border-neutral-800 text-xs text-slate-300 leading-relaxed font-inter">
              {profile.bio || 'With the smart business cards and digital cards, you will be able to reach your clients very easily and hassle-free.'}
            </div>
          </div>

          {/* CONTACT ME Section */}
          <div className="px-4 mt-5 space-y-2">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">CONTACT ME</h3>
            <div className="space-y-2 font-inter text-xs">
              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#0F1420] border border-neutral-800 hover:border-[#FF4D4D]/50 text-slate-200 transition group"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-7 h-7 rounded-full bg-[#FF4D4D]/15 text-[#FF4D4D] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-200 truncate">{profile.phone}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#FF4D4D] transition-colors" />
                </a>
              )}

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#0F1420] border border-neutral-800 hover:border-[#FF4D4D]/50 text-slate-200 transition group"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-7 h-7 rounded-full bg-[#FF4D4D]/15 text-[#FF4D4D] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-200 truncate">{profile.email}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#FF4D4D] transition-colors" />
                </a>
              )}

              {profile.website && (
                <a
                  href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#0F1420] border border-neutral-800 hover:border-[#FF4D4D]/50 text-slate-200 transition group"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-7 h-7 rounded-full bg-[#FF4D4D]/15 text-[#FF4D4D] flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-200 truncate">{profile.website}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#FF4D4D] transition-colors" />
                </a>
              )}
            </div>
          </div>

          {/* ON THE SOCIAL Section */}
          <div className="px-4 mt-5 space-y-2">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">ON THE SOCIAL</h3>
            <div className="flex flex-wrap gap-2">
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#0F1420] border border-neutral-800 text-blue-400 flex items-center space-x-2 text-xs font-bold shadow-sm hover:border-blue-500 transition">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile.instagram && (
                <a href={profile.instagram} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#0F1420] border border-neutral-800 text-pink-400 flex items-center space-x-2 text-xs font-bold shadow-sm hover:border-pink-500 transition">
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              )}
              {profile.youtube && (
                <a href={profile.youtube} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#0F1420] border border-neutral-800 text-red-400 flex items-center space-x-2 text-xs font-bold shadow-sm hover:border-red-500 transition">
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
              )}
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#0F1420] border border-neutral-800 text-slate-200 flex items-center space-x-2 text-xs font-bold shadow-sm hover:border-slate-300 transition">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Lead Capture Action Button */}
          <div className="px-4 mt-6">
            <button
              onClick={() => setShowLeadModal(true)}
              className="w-full py-3.5 rounded-2xl bg-[#0F1420] hover:bg-[#151C2C] text-white font-bold text-xs flex items-center justify-center space-x-2 border border-[#FF4D4D]/30 shadow-md transition"
            >
              <UserPlus className="w-4 h-4 text-[#FF4D4D]" />
              <span>Connect & Exchange Details</span>
            </button>
          </div>

          {/* Custom Links & Services Section */}
          {(profile.custom_links || []).length > 0 && (
            <div className="px-4 mt-5 space-y-2">
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">FEATURED LINKS & DOCUMENTS</h3>
              <div className="space-y-2">
                {profile.custom_links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-2xl bg-[#0F1420] border border-neutral-800 hover:border-[#FF4D4D] flex justify-between items-center text-xs font-bold text-white shadow-sm transition"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-[#FF4D4D]" />
                      <span>{link.title}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
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

        {/* ai klub Footer Branding */}
        <div className="p-6 text-center border-t border-neutral-200 mt-12 bg-white">
          <Link to="/" className="inline-flex items-center space-x-2 text-xs text-neutral-600 hover:text-[#FF3838] font-mono">
            <div className="w-5 h-5 rounded bg-[#FF3838] text-white font-black text-[10px] flex items-center justify-center">ak</div>
            <span>Powered by ai klub Smart Identity Engine</span>
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
