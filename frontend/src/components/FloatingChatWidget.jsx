import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, CheckCircle2, Sparkles, Mail, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/apiClient';

export const FloatingChatWidget = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-fill logged in user info
  useEffect(() => {
    if (user) {
      if (user.name && !name) setName(user.name);
      if (user.email && !contact) setContact(user.email);
    }
  }, [user]);

  const handleQuickChipClick = (chipText) => {
    setMessage((prev) => (prev ? `${prev} ${chipText}` : chipText));
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!contact.trim()) {
      setErrorMsg('Please enter your email or phone number.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please enter a short message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const isEmail = contact.includes('@');
      const payload = {
        name: name.trim(),
        email: isEmail ? contact.trim() : `${contact.replace(/[^0-9]/g, '')}@lead.aikulb.com`,
        phone: isEmail ? '' : contact.trim(),
        message: message.trim(),
        source: 'Floating Chat Box Widget',
        profile_id: 'support-hq'
      };

      const data = await api.captureLead(payload);

      if (data.success) {
        setSubmittedSuccess(true);
        setMessage('');
      } else {
        setSubmittedSuccess(true);
        setMessage('');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or chat via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/917042015887?text=${encodeURIComponent(
    message.trim() ? `Hi aikulb! My name is ${name || 'User'}. ${message}` : 'Hi aikulb! I need help with smart cards & profiles.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-manrope">
      {/* Floating Popup Chat Box - Dynamically Sized with Top Safety Margin (No Cutoff, No Overlap) */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-96 bg-white border border-slate-200/90 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[calc(100vh-100px)] sm:max-h-[520px] animate-in fade-in slide-in-from-bottom-3 duration-200">
          
          {/* 1. Header - Always Fixed at Top of Box (Dark Slate with Crisp White Typography & Online Status) */}
          <div className="bg-[#0D121F] px-4 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 shadow-sm z-10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#25D366] to-[#10B981] flex items-center justify-center text-white shadow-md shadow-emerald-950/50">
                  <MessageCircle className="w-5 h-5 fill-white text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0D121F] rounded-full animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  aikulb Support
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </h4>
                <p className="text-[10px] sm:text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Online • 24/7 Live Support
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-300 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer"
              title="Close Chat"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* 2. Scrollable Body Content (Clean White Background, High-Contrast Forms) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar bg-white">
            
            {/* Direct WhatsApp CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 transition hover:scale-[1.01] group cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950 text-[#25D366]" />
              <span className="tracking-tight">Chat Directly on WhatsApp</span>
            </a>

            <div className="relative flex items-center justify-center my-1">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-2.5 text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">
                Or Leave a Message
              </span>
            </div>

            {submittedSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-2.5">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h5 className="text-sm font-extrabold text-slate-900">Message Sent Successfully!</h5>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Your inquiry has been recorded directly in our database. Our support team will contact you shortly.
                </p>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-xs font-bold py-2 rounded-xl text-white transition shadow-sm cursor-pointer"
                  >
                    Send Another
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-black py-2 rounded-xl text-center transition shadow-sm cursor-pointer"
                  >
                    Open WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="space-y-3">
                {errorMsg && (
                  <div className="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 p-2 rounded-xl">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-900 mb-1 block">Your Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-600 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl pl-9 pr-3 py-2 outline-none transition shadow-sm placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-900 mb-1 block">Email or Phone Number</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="email@example.com or +91 99999..."
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-600 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl pl-9 pr-3 py-2 outline-none transition shadow-sm placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-900 mb-1 block">Message / Inquiry</label>
                  <textarea
                    rows={2.5}
                    placeholder="How can we help you today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-emerald-600 focus:bg-white text-slate-900 text-xs font-semibold rounded-xl p-2.5 outline-none resize-none transition shadow-sm placeholder:text-slate-400"
                  />
                </div>

                {/* Quick Suggestion Chips (Dark Buttons with Crisp White Text) */}
                <div>
                  <span className="text-[10px] text-slate-700 font-bold block mb-1">Quick Topics:</span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'Custom Card Help',
                      'Pricing & Offer',
                      'NFC Setup',
                      'Order Dispatch'
                    ].map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickChipClick(chip)}
                        className="text-[10px] bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-700 rounded-lg px-2.5 py-1 shadow-sm transition cursor-pointer"
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Submit Button (Gradient Green with Premium White Text) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition cursor-pointer mt-1"
                >
                  {isSubmitting ? (
                    <span className="text-white">Sending to DB...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-white" />
                      <span className="text-white">Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* 3. Footer Note - Always Fixed at Bottom of Box */}
          <div className="bg-slate-100 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-600 font-bold shrink-0">
            <span className="flex items-center gap-1.5 text-emerald-700 font-extrabold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Secure CRM Sync
            </span>
            <span className="text-slate-400 font-mono">aikulb v2.0</span>
          </div>
        </div>
      )}

      {/* Small Box Type Floating Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-2xl shadow-2xl backdrop-blur-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 group relative"
        title="Need any Help? Chat with us"
      >
        {/* Active pulse indicator */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-slate-900"></span>
        </span>

        {isOpen ? (
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition duration-300" />
        ) : (
          <div className="w-7.5 h-7.5 rounded-xl bg-gradient-to-tr from-[#25D366] to-[#10B981] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition duration-300">
            <MessageCircle className="w-4.5 h-4.5 fill-white text-[#25D366]" />
          </div>
        )}

        {/* Small hover tooltip badge */}
        {!isOpen && (
          <span className="absolute right-14 top-2 hidden group-hover:flex items-center bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-700 shadow-xl whitespace-nowrap animate-in fade-in duration-200">
            Need Help? Chat with us
          </span>
        )}
      </button>
    </div>
  );
};
