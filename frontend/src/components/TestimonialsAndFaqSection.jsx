import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal, StaggerContainer, StaggerItem } from './AnimatedComponents';
import { ContactHelpSection } from './ContactHelpSection';

export const TestimonialsAndFaqSection = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const testimonials = [
    {
      name: 'Vikram Malhotra',
      role: 'Managing Director, Vertex Capital',
      text: 'The aikulb Black Metal card is a game changer at conferences. Every single CEO I tap with is blown away by how seamless the digital profile loads.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Priya Sharma',
      role: 'Founder, CloudGrid Tech',
      text: 'We deployed aikulb custom cards for our entire 45-person sales force. Our team captured over 300 qualified leads in the first month alone!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Dr. Rajesh Mehta',
      role: 'Chief Surgeon, Elevate Health',
      text: 'Having the aikulb Smart Stand on our reception counter quadrupled our 5-star Google Reviews in less than 3 weeks. Incredible ROI.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    },
  ];

  const faqs = [
    {
      q: 'Does the recipient need a dedicated aikulb app to view my profile?',
      a: 'No! The recipient does NOT need any app. When they tap your aikulb NFC card or scan the QR code on their smartphone, your digital profile opens instantly in their native mobile browser.',
    },
    {
      q: 'Which smartphones are compatible with aikulb NFC smart cards?',
      a: 'aikulb NFC cards are compatible with 99%+ of modern smartphones including iPhones (iPhone XS and newer) and all NFC-enabled Android devices (Samsung, Google Pixel, OnePlus, etc.). The dynamic QR code on the card ensures 100% fallback compatibility for older models.',
    },
    {
      q: 'Can I update my digital profile information after ordering my card?',
      a: 'Yes, absolutely! Your physical aikulb card links dynamically to your cloud digital profile. You can update your phone numbers, social links, portfolio, and company info anytime from your aikulb User Dashboard without needing a new card.',
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
    <section id="faq" className="py-24 bg-[#FAFAFA] relative transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Sub-section */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
            Verified Customer Reviews
          </div>
          <h2 className="section-h2 text-slate-900">
            Loved by Executives & Teams
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 font-inter">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 flex flex-col justify-between h-full card-hover-elevation">
                <div className="space-y-3">
                  <div className="flex space-x-1 text-amber-400">
                    {[...Array(t.rating)].map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 italic leading-relaxed">"{t.text}"</p>
                </div>
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[#6C4CFF]/40" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-manrope">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Full Interactive Contact & Help Center Section (TapMo Inspired with DB Sync) */}
        <div className="mt-16 border-t border-slate-200 pt-16">
          <ContactHelpSection />
        </div>
      </div>
    </section>
  );
};
