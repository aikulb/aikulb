import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown, CheckCircle2 } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimatedComponents';

export const TestimonialsAndFaqSection = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const testimonials = [
    {
      name: 'Vikram Malhotra',
      role: 'Managing Director, Vertex Capital',
      text: 'The ai klub Black Metal card is a game changer at conferences. Every single CEO I tap with is blown away by how seamless the digital profile loads.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Priya Sharma',
      role: 'Founder, CloudGrid Tech',
      text: 'We deployed ai klub custom cards for our entire 45-person sales force. Our team captured over 300 qualified leads in the first month alone!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Dr. Rajesh Mehta',
      role: 'Chief Surgeon, Elevate Health',
      text: 'Having the ai klub Smart Stand on our reception counter quadrupled our 5-star Google Reviews in less than 3 weeks. Incredible ROI.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    },
  ];

  const faqs = [
    {
      q: 'Does the recipient need a dedicated ai klub app to view my profile?',
      a: 'No! The recipient does NOT need any app. When they tap your ai klub NFC card or scan the QR code on their smartphone, your digital profile opens instantly in their native mobile browser.',
    },
    {
      q: 'Which smartphones are compatible with ai klub NFC smart cards?',
      a: 'ai klub NFC cards are compatible with 99%+ of modern smartphones including iPhones (iPhone XS and newer) and all NFC-enabled Android devices (Samsung, Google Pixel, OnePlus, etc.). The dynamic QR code on the card ensures 100% fallback compatibility for older models.',
    },
    {
      q: 'Can I update my digital profile information after ordering my card?',
      a: 'Yes, absolutely! Your physical ai klub card links dynamically to your cloud digital profile. You can update your phone numbers, social links, portfolio, and company info anytime from your ai klub User Dashboard without needing a new card.',
    },
    {
      q: 'How does team & corporate enterprise lead capture work?',
      a: 'Business Team plans allow administrators to create standardized employee profiles, assign custom corporate cards, and view aggregated team lead CRM data from a single centralized admin panel.',
    },
    {
      q: 'What material options are available for custom laser engraving?',
      a: 'We offer Aerospace Matte Black Stainless Steel, 24K Electroplated Gold Mirror Metal, Brushed Silver Steel, Organic Dark Walnut Wood, Natural Bamboo, and Waterproof Matte PVC.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white text-slate-900 relative transition-colors duration-300 border-t border-slate-200/90 overflow-hidden select-none">
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Testimonials Sub-section */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[10px] font-mono font-bold tracking-widest uppercase">
            <span>VERIFIED CUSTOMER REVIEWS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-manrope tracking-tight">
            Loved by Executives & Teams
          </h2>
          <p className="text-slate-700 text-base font-inter font-medium">
            See what founders, sales leaders, and executive teams say about networking with ai klub.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 font-inter">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-5 flex flex-col justify-between h-full hover:border-amber-400/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1 text-amber-500">
                      {[...Array(t.rating)].map((_, r) => (
                        <Star key={r} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <div className="flex items-center space-x-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified Client</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium italic">"{t.text}"</p>
                </div>
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-200/90">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-amber-400/50 shadow-xs" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-manrope group-hover:text-amber-700 transition-colors">{t.name}</h4>
                    <p className="text-xs text-slate-600 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* FAQ Section */}
        <ScrollReveal className="max-w-3xl mx-auto space-y-6 pt-12 border-t border-slate-200/90">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-manrope tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-700 text-sm font-inter font-medium">
              Everything you need to know about ai klub NFC smart cards and cloud profiles.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 overflow-hidden transition-all duration-300 hover:border-amber-400/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left font-manrope font-bold text-base text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:text-amber-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 pt-2 text-sm text-slate-700 font-inter leading-relaxed border-t border-slate-200/90 font-medium">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
