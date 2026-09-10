import React from 'react';
import { Share2, QrCode, MessageSquare, UserPlus, Users, BarChart3, ArrowUpRight } from 'lucide-react';

export const ValueProp = () => {
  const features = [
    {
      icon: Share2,
      title: 'Instant Contact Sharing',
      description: 'Tap your card on any modern smartphone to instantly share your phone, email, VCF contact card, and social links.',
      badge: 'NFC Microchip',
    },
    {
      icon: QrCode,
      title: 'Dynamic QR Code',
      description: 'Built-in high resolution dynamic QR code on every card ensures 100% compatibility with non-NFC older devices.',
      badge: 'Universal Access',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Integration',
      description: 'Allow clients and potential leads to initiate 1-tap direct WhatsApp conversations without saving phone numbers.',
      badge: 'Direct Chat',
    },
    {
      icon: UserPlus,
      title: 'Lead Capture Form',
      description: 'Collect visitor names, emails, phone numbers, and custom inquiries directly into your aikulb CRM database.',
      badge: 'Lead Gen',
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Manage employee cards, standardize corporate profile designs, assign NFC chips, and track enterprise leads centrally.',
      badge: 'Enterprise',
    },
    {
      icon: BarChart3,
      title: 'Profile Analytics',
      description: 'Track profile views, NFC tap counts, link click-through rates, and location interaction insights in real-time.',
      badge: 'Live Data',
    },
  ];

  return (
    <section className="py-24 bg-[#F7F7F5] dark:bg-[#090909] relative transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-white dark:bg-[#111111] border border-slate-200 dark:border-slate-800 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
            All-In-One Networking Engine
          </div>
          <h2 className="section-h2 text-slate-900 dark:text-white">
            More Than a Business Card.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-inter">
            aikulb combines smart hardware with a powerful cloud digital identity software stack.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const IconComponent = f.icon;
            return (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#262626] card-hover-elevation flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#6C4CFF]/10 dark:bg-[#6C4CFF]/20 text-[#6C4CFF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-[#6C4CFF]" />
                    </div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-slate-100 dark:bg-[#1A1A1A] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-manrope mb-3 group-hover:text-[#6C4CFF] transition">
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-inter leading-relaxed">
                    {f.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-bold font-manrope text-[#6C4CFF] group-hover:translate-x-1 transition-transform">
                  <span>Explore Feature</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
