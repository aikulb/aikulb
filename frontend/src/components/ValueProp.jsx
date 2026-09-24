import React from 'react';
import { Share2, QrCode, MessageSquare, UserPlus, Users, BarChart3 } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedCounter } from './AnimatedComponents';

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
      description: 'Collect visitor names, emails, phone numbers, and custom inquiries directly into your AI Klub CRM database.',
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
    <section className="py-24 bg-[#FAFAFC] border-t border-slate-200/90 relative text-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="section-h2 text-slate-900">
            More Than a Business Card.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-inter font-medium">
            AI Klub combines smart hardware with a powerful cloud digital identity software stack.
          </p>
        </ScrollReveal>

        {/* 6 Feature Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" staggerDelay={0.08}>
          {features.map((f, i) => {
            const IconComponent = f.icon;
            return (
              <StaggerItem key={i}>
                <div className="group relative p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-red-400/50 transition-all duration-300 flex flex-col justify-between h-full shadow-sm hover:shadow-xl hover:-translate-y-1">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#FF3B3B]/10 text-[#FF3B3B] border border-[#FF3B3B]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-[#FF3B3B]" />
                      </div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {f.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 font-manrope mb-3 group-hover:text-[#FF3B3B] transition">
                      {f.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-inter leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Animated Key Statistics Counter Strip */}
        <ScrollReveal yOffset={25} className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#FF3B3B] font-manrope">
              <AnimatedCounter from={0} to={50} suffix="K+" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-inter font-semibold mt-1 uppercase tracking-wider">
              Profiles Active
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#FF3B3B] font-manrope">
              <AnimatedCounter from={0} to={120} suffix="K+" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-inter font-semibold mt-1 uppercase tracking-wider">
              NFC Taps & Scans
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#FF3B3B] font-manrope">
              <AnimatedCounter from={0} to={45} suffix="K+" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-inter font-semibold mt-1 uppercase tracking-wider">
              Leads Captured
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#FF3B3B] font-manrope">
              <AnimatedCounter from={0} to={99} suffix=".9%" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-inter font-semibold mt-1 uppercase tracking-wider">
              Uptime Reliability
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
