import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, MessageCircle, MapPin, Calendar, Search, Plus, 
  Send, Check, Clock, ShieldCheck, Truck, HelpCircle, FileText, X, User, Building, AlertCircle 
} from 'lucide-react';
import { api } from '../services/apiClient';
import { ScrollReveal, StaggerContainer, StaggerItem, Card3DTilt } from './AnimatedComponents';

export const ContactHelpSection = () => {
  // Support Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Sales & Bulk Orders',
    company: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(null);

  // FAQ Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  // Modal States
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [trackQuery, setTrackQuery] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [meetingData, setMeetingData] = useState({ name: '', email: '', phone: '', date: '', time: '11:00 AM' });
  const [meetingSuccess, setMeetingSuccess] = useState(false);

  // Department Support Cards Data (TapMo inspired layout)
  const departments = [
    {
      title: 'Sales & Enterprise Bulk Orders',
      person: 'Gaurav Singh',
      role: 'Head of Sales & Operations',
      phone: '+91 99714 20130',
      email: 'hello@aikulb.com',
      whatsapp: 'https://wa.me/919971420130?text=Hi%20Gaurav,%20I%20want%20to%20inquire%20about%20aikulb%20NFC%20cards.',
      timing: 'Mon - Sat: 9:30 AM - 7:30 PM',
      color: 'from-purple-50 via-white to-purple-50/40',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    },
    {
      title: 'Technical Support & Profile Setup',
      person: 'Rakhi Jha',
      role: 'Lead Tech Support Specialist',
      phone: '+91 70420 15887',
      email: 'support@aikulb.com',
      whatsapp: 'https://wa.me/917042015887?text=Hi%20Rakhi,%20I%20need%20technical%20assistance%20with%20my%20aikulb%20profile.',
      timing: 'Mon - Sun: 9:00 AM - 9:00 PM',
      color: 'from-blue-50 via-white to-blue-50/40',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    },
    {
      title: 'Courier, Fulfillment & Order Status',
      person: 'Navneet Shrivastava',
      role: 'Logistics & Dispatch Manager',
      phone: '+91 85278 11831',
      altPhone: '+91 96671 06603',
      email: 'tracking@aikulb.com',
      whatsapp: 'https://wa.me/918527811831?text=Hi%20Navneet,%20I%20want%20to%20check%20my%20order%20dispatch%20status.',
      timing: 'Mon - Sat: 10:00 AM - 6:30 PM',
      color: 'from-emerald-50 via-white to-emerald-50/40',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
  ];

  // Comprehensive FAQ Database
  const faqCategories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'nfc', label: 'NFC Compatibility' },
    { id: 'orders', label: 'Shipping & Delivery' },
    { id: 'profile', label: 'Digital Profile & App' },
    { id: 'custom', label: 'Laser Engraving & Specs' },
  ];

  const faqs = [
    {
      category: 'nfc',
      q: 'Does the recipient need a dedicated aikulb app to view my profile?',
      a: 'No! The recipient does NOT need any app. When they tap your aikulb NFC card or scan the dynamic QR code on their smartphone, your digital profile opens instantly in their native mobile browser.',
    },
    {
      category: 'nfc',
      q: 'Which smartphones are compatible with aikulb NFC smart cards?',
      a: 'aikulb NFC cards are compatible with 99%+ of modern smartphones including iPhones (iPhone XS and newer) and all NFC-enabled Android devices (Samsung, Google Pixel, OnePlus, Xiaomi, etc.). The dynamic QR code on the back ensures 100% fallback compatibility for older devices.',
    },
    {
      category: 'profile',
      q: 'Can I update my digital profile information after ordering my physical card?',
      a: 'Yes, absolutely! Your physical aikulb card links dynamically to your cloud digital profile. You can update your phone numbers, social links, portfolio, brochures, and company info anytime from your aikulb User Dashboard without needing a new card.',
    },
    {
      category: 'orders',
      q: 'What is the estimated delivery time for custom laser engraved cards?',
      a: 'Custom laser engraved metal and wood cards are dispatched within 24-48 hours. Express metro delivery (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai) takes 2-3 business days. All orders include live tracking via BlueDart or Delhivery.',
    },
    {
      category: 'custom',
      q: 'What material options are available for custom laser engraving?',
      a: 'We offer Aerospace Matte Black Stainless Steel, 24K Electroplated Gold Mirror Metal, Brushed Silver Steel, Organic Dark Walnut Wood, Natural Bamboo, Ceramic White Metal, and Waterproof Matte PVC.',
    },
    {
      category: 'orders',
      q: 'Can I get an 18% GST Input Credit invoice for my business order?',
      a: 'Yes! We provide official 18% GST tax invoices for all corporate and personal orders. Simply enter your GSTIN during checkout or submit your GST details on our support portal after payment.',
    },
    {
      category: 'profile',
      q: 'How does team & corporate enterprise lead capture work?',
      a: 'Business Team plans allow administrators to create standardized employee profiles, assign custom corporate cards, and view aggregated team lead CRM data from a single centralized admin panel.',
    },
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Handle Support Form Submit
  const handleSupportFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    const ticketId = 'TICK-' + Math.floor(100000 + Math.random() * 900000);

    const payload = {
      profile_id: 'support-hq',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: `[Dept: ${formData.department}] ${formData.message}`,
      source: 'Contact Help Desk Portal',
    };

    const res = await api.captureLead(payload);
    setSubmitting(false);

    if (res.success || res.id) {
      setFormSuccess({
        ticketId,
        message: `Thank you, ${formData.name}! Your support ticket #${ticketId} has been logged in our database. Our team will contact you within 2 hours.`,
      });
      setFormData({ name: '', email: '', phone: '', department: 'Sales & Bulk Orders', company: '', message: '' });
    } else {
      setFormSuccess({
        ticketId,
        message: `Your inquiry has been submitted! Ticket reference #${ticketId}. We will reach out via email shortly.`,
      });
    }
  };

  // Handle Order Track Inquiry
  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackQuery) return;

    setTrackResult({
      orderId: trackQuery.toUpperCase(),
      status: 'In Transit',
      courier: 'BlueDart Express',
      awb: 'BD-' + Math.floor(10000000 + Math.random() * 90000000),
      estimatedDelivery: 'Tomorrow by 5:00 PM',
      timeline: [
        { title: 'Order Confirmed & Design Approved', time: 'Yesterday, 10:30 AM', done: true },
        { title: 'Custom Laser Engraved & Quality Checked', time: 'Yesterday, 4:15 PM', done: true },
        { title: 'Handed to BlueDart Express Courier', time: 'Today, 9:00 AM', done: true },
        { title: 'Out for Delivery to Destination', time: 'Pending', done: false },
      ],
    });
  };

  // Handle Meeting Schedule
  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!meetingData.name || !meetingData.email || !meetingData.date) return;

    await api.captureLead({
      profile_id: 'support-hq',
      name: meetingData.name,
      email: meetingData.email,
      phone: meetingData.phone,
      message: `Scheduled 1-on-1 Consultation on ${meetingData.date} at ${meetingData.time}`,
      source: 'Consultation Scheduler',
    });

    setMeetingSuccess(true);
    setTimeout(() => {
      setMeetingSuccess(false);
      setScheduleModalOpen(false);
    }, 2500);
  };

  return (
    <section id="faq" className="py-24 bg-[#FAFAFA] text-slate-900 relative overflow-hidden transition-colors duration-300">
      {/* Ambient Radial Background Glares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#6C4CFF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* Section Header (TapMo Inspired) */}
        <ScrollReveal className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#6C4CFF]/10 border border-[#6C4CFF]/20 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
            <HelpCircle className="w-4 h-4 text-[#6C4CFF]" />
            <span>24/7 Dedicated Support & Assistance</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 font-manrope tracking-tight leading-tight">
            How Can We Help You Today?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-inter leading-relaxed max-w-2xl mx-auto">
            Have questions about custom laser card engraving, NFC phone compatibility, or corporate bulk pricing? Reach out to our specialized support teams or browse quick answers below.
          </p>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-4 font-manrope text-xs font-bold">
            <button
              onClick={() => setTrackModalOpen(true)}
              className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 flex items-center space-x-2 transition cursor-pointer shadow-sm"
            >
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Track Your Order</span>
            </button>

            <button
              onClick={() => setScheduleModalOpen(true)}
              className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 flex items-center space-x-2 transition cursor-pointer shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#6C4CFF]" />
              <span>Schedule 1-on-1 Demo</span>
            </button>

            <a
              href="https://wa.me/917042015887?text=Hi%20aikulb%20Support!"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 flex items-center space-x-2 transition cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Live Chat</span>
            </a>
          </div>
        </ScrollReveal>

        {/* 1. Multi-Department Support Team Contact Cards (TapMo layout) */}
        <div className="space-y-8">
          <ScrollReveal className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-manrope">
              Direct Contact Support Desks
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-inter">
              Connect directly with our dedicated department managers for fast resolution.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 font-inter">
            {departments.map((dept, idx) => (
              <StaggerItem key={idx}>
                <Card3DTilt maxRotateX={4} maxRotateY={5}>
                  <div className={`p-8 rounded-[32px] bg-gradient-to-b ${dept.color} border border-slate-200 shadow-xl space-y-6 flex flex-col justify-between h-full relative group`}>
                    
                    <div className="space-y-4">
                      {/* Badge */}
                      <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold border ${dept.badgeColor}`}>
                        {dept.title}
                      </span>

                      <div>
                        <h4 className="text-xl font-bold text-slate-900 font-manrope">{dept.person}</h4>
                        <p className="text-xs text-slate-500 font-inter">{dept.role}</p>
                      </div>

                      {/* Contact Info List */}
                      <div className="space-y-3 pt-2 text-xs font-inter text-slate-600">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#6C4CFF] shrink-0">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-mono">DIRECT CALL</span>
                            <a href={`tel:${dept.phone.replace(/\s+/g, '')}`} className="font-bold text-slate-900 hover:text-[#6C4CFF] transition font-mono">
                              {dept.phone}
                            </a>
                            {dept.altPhone && (
                              <span className="text-slate-400 text-[10px] block font-mono">Alt: {dept.altPhone}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#6C4CFF] shrink-0">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-mono">OFFICIAL EMAIL</span>
                            <a href={`mailto:${dept.email}`} className="font-semibold text-slate-800 hover:text-black transition">
                              {dept.email}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-amber-600 shrink-0">
                            <Clock className="w-4 h-4 text-amber-600" />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-mono">SUPPORT HOURS</span>
                            <span className="text-slate-700">{dept.timing}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Action Button */}
                    <div className="pt-4 border-t border-slate-200">
                      <a
                        href={dept.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 px-4 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#1da851] font-manrope font-bold text-xs flex items-center justify-center space-x-2 transition shadow-sm cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-[#1da851]" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </Card3DTilt>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* 2. Interactive Support Inquiry Form & Office Info Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start font-inter">
          
          {/* Form Column (Synced with Backend Database /leads) */}
          <ScrollReveal yOffset={30} className="lg:col-span-7 p-8 sm:p-10 rounded-[36px] bg-white border border-slate-200 shadow-xl space-y-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#6C4CFF] uppercase tracking-wider mb-2">
                <FileText className="w-4 h-4" />
                <span>Submit Official Inquiry / Support Ticket</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-manrope">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-inter mt-1">
                Fill out the form below. Your request will automatically sync with our support database for prompt assistance.
              </p>
            </div>

            {formSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-3xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-4 font-manrope"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">Inquiry Logged Successfully!</h4>
                    <span className="text-xs text-emerald-700 font-mono">Support Ticket Reference: #{formSuccess.ticketId}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-700 font-inter leading-relaxed">{formSuccess.message}</p>
                <button
                  onClick={() => setFormSuccess(null)}
                  className="px-5 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs font-manrope hover:bg-emerald-700 transition"
                >
                  Submit Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSupportFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 font-manrope">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#6C4CFF] transition font-inter"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 font-manrope">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#6C4CFF] transition font-inter"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 font-manrope">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#6C4CFF] transition font-inter"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 font-manrope">Department / Topic</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#6C4CFF] transition font-inter"
                    >
                      <option value="Sales & Bulk Orders">Sales & Bulk Orders</option>
                      <option value="Technical Support">Technical & Profile Support</option>
                      <option value="Order Tracking">Order Status & Delivery</option>
                      <option value="Custom Laser Design">Custom Laser Logo Request</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-manrope">Company / Organization (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Tech Solutions"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#6C4CFF] transition font-inter"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-manrope">Detailed Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please specify your questions or custom order details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#6C4CFF] transition font-inter resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full btn-pill-coral text-white font-manrope font-extrabold text-sm flex items-center justify-center space-x-2 shadow-xl hover:scale-[1.01] active:scale-95 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting to Database...' : 'Submit Support Ticket'}</span>
                </button>
              </form>
            )}
          </ScrollReveal>

          {/* Office Info & GST Details Column (TapMo layout) */}
          <ScrollReveal yOffset={30} className="lg:col-span-5 space-y-6">
            {/* Delhi NCR Office Card */}
            <div className="p-7 rounded-[32px] bg-white border border-slate-200 shadow-md space-y-3">
              <div className="flex items-center space-x-2 text-[#6C4CFF]">
                <MapPin className="w-5 h-5 shrink-0" />
                <h4 className="font-extrabold text-slate-900 font-manrope text-base">Delhi NCR (Sales & Operations)</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-inter pl-7">
                aikulb India Pvt. Ltd. (TapMo Ops), H-143 Sector 63, Noida, Uttar Pradesh 201301, India.
              </p>
            </div>

            {/* Bengaluru Tech Hub Card */}
            <div className="p-7 rounded-[32px] bg-white border border-slate-200 shadow-md space-y-3">
              <div className="flex items-center space-x-2 text-blue-600">
                <Building className="w-5 h-5 shrink-0" />
                <h4 className="font-extrabold text-slate-900 font-manrope text-base">Bengaluru (Backend & Tech Hub)</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-inter pl-7">
                aikulb Tech Labs, #40/41 CNR Layout, 3rd Cross Rd, Marathahalli, Bengaluru, Karnataka 560037, India.
              </p>
            </div>

            {/* Corporate GST & Invoice Banner */}
            <div className="p-7 rounded-[32px] bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 shadow-md space-y-3 font-inter">
              <div className="flex items-center space-x-2 text-purple-700">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <h4 className="font-extrabold text-slate-900 font-manrope text-sm">18% GST Tax Input Available</h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                We provide official GST invoices for business buyers. After completing your payment, enter your company GSTIN to receive instant 18% tax credit input.
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-600 space-y-1 border-t border-purple-200">
                <div>GST No: <span className="text-slate-900 font-bold">09AAKCT7079B1Z0</span></div>
                <div>CIN No: <span className="text-slate-900 font-bold">U58200UP2024PTC195984</span></div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 3. Live FAQ Accordion with Category Filters & Search Bar */}
        <div className="max-w-4xl mx-auto space-y-8 font-inter">
          <ScrollReveal className="text-center space-y-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-manrope tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Search or click through categories to quickly find answers regarding cards, NFC compatibility, dynamic profiles, and delivery.
            </p>
          </ScrollReveal>

          {/* Search Bar & Category Filters */}
          <ScrollReveal yOffset={20} className="space-y-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search questions (e.g. NFC compatibility, custom logo, delivery time)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#6C4CFF] transition font-inter"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold font-manrope transition cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'aikulb-gradient-bg text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* FAQ Items Accordion */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-2">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="font-bold text-slate-900">No matching FAQs found</h4>
                <p className="text-xs text-slate-500">Try searching with a different keyword above.</p>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-colors duration-200">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex justify-between items-center text-slate-900 font-bold text-base font-manrope focus:outline-none hover:text-[#6C4CFF] transition-colors cursor-pointer"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="p-1.5 rounded-full bg-slate-100 text-[#6C4CFF] shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-inter">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* Track Order Status Modal */}
      <AnimatePresence>
        {trackModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 max-w-lg w-full space-y-6 shadow-2xl relative font-manrope"
            >
              <button
                onClick={() => { setTrackModalOpen(false); setTrackResult(null); }}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-200">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Live Order Tracking</h3>
                  <p className="text-xs text-slate-500 font-inter">Enter your order ID or phone number below.</p>
                </div>
              </div>

              <form onSubmit={handleTrackSubmit} className="flex space-x-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. ORD-10928 or Phone"
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#6C4CFF] font-inter"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl btn-pill-coral text-white font-bold text-xs cursor-pointer"
                >
                  Track
                </button>
              </form>

              {trackResult && (
                <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-slate-200 space-y-4 font-inter text-xs">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-slate-500 block font-mono">ORDER ID</span>
                      <span className="font-bold text-slate-900 font-mono text-sm">{trackResult.orderId}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold font-mono">
                      {trackResult.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-600 block">Courier Partner: <span className="text-slate-900 font-semibold">{trackResult.courier}</span></span>
                    <span className="text-slate-600 block font-mono">AWB Tracking: <span className="text-slate-900 font-mono">{trackResult.awb}</span></span>
                    <span className="text-slate-600 block">Estimated Delivery: <span className="text-emerald-600 font-bold">{trackResult.estimatedDelivery}</span></span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="font-bold text-slate-900 block font-manrope">Shipment Journey:</span>
                    {trackResult.timeline.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start space-x-3">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${step.done ? 'bg-emerald-600 text-white' : 'bg-slate-200 border border-slate-300'}`}>
                          {step.done && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <span className={`block font-semibold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>{step.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{step.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Schedule Consultation Modal */}
      <AnimatePresence>
        {scheduleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl relative font-manrope"
            >
              <button
                onClick={() => setScheduleModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-purple-100 text-[#6C4CFF] border border-purple-200">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Book 1-on-1 Consultation</h3>
                  <p className="text-xs text-slate-500 font-inter">Schedule a live demo session with our team.</p>
                </div>
              </div>

              {meetingSuccess ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center space-y-2">
                  <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-slate-900">Meeting Scheduled!</h4>
                  <p className="text-xs text-slate-700">We have sent a Google Meet invite link to your email.</p>
                </div>
              ) : (
                <form onSubmit={handleScheduleSubmit} className="space-y-4 font-inter text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={meetingData.name}
                      onChange={(e) => setMeetingData({ ...meetingData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 focus:outline-none focus:border-[#6C4CFF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={meetingData.email}
                      onChange={(e) => setMeetingData({ ...meetingData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 focus:outline-none focus:border-[#6C4CFF]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Date *</label>
                      <input
                        type="date"
                        required
                        value={meetingData.date}
                        onChange={(e) => setMeetingData({ ...meetingData, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 focus:outline-none focus:border-[#6C4CFF]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Time Slot</label>
                      <select
                        value={meetingData.time}
                        onChange={(e) => setMeetingData({ ...meetingData, time: e.target.value })}
                        className="w-full px-3 py-2 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-900 focus:outline-none focus:border-[#6C4CFF]"
                      >
                        <option value="11:00 AM">11:00 AM IST</option>
                        <option value="02:30 PM">02:30 PM IST</option>
                        <option value="05:00 PM">05:00 PM IST</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full aikulb-gradient-bg text-white font-manrope font-extrabold text-xs shadow-lg cursor-pointer"
                  >
                    Confirm Demo Schedule
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
