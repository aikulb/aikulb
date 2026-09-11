import React from 'react';
import { Share2, QrCode, MessageSquare, UserPlus, Users, BarChart3, ArrowUpRight } from 'lucide-react';
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
    <section className="py-24 bg-[#F8F9FA] relative transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-white border border-slate-200 text-[#6C4CFF] text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
            All-In-One Networking Engine
          </div>
          <h2 className="section-h2 text-slate-900">
            More Than a Business Card.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-inter">
            aikulb combines smart hardware with a powerful cloud digital identity software stack.
          </p>
        </ScrollReveal>

        {/* 6 Feature Cards Grid with Sequential Stagger (Requirement 5) */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" staggerDelay={0.08}>
          {features.map((f, i) => {
            const IconComponent = f.icon;
            return (
              <StaggerItem key={i}>
                <div className="group relative p-8 rounded-3xl bg-white border border-slate-200 card-hover-elevation flex flex-col justify-between h-full shadow-sm">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#6C4CFF]/10 text-[#6C4CFF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-[#6C4CFF]" />
                      </div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {f.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 font-manrope mb-3 group-hover:text-[#6C4CFF] transition">
                      {f.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-inter leading-relaxed">
                      {f.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center text-xs font-bold font-manrope text-[#6C4CFF] group-hover:translate-x-1.5 transition-transform duration-250">
                    <span>Explore Feature</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Animated Key Statistics Counter Strip (Requirement 11) */}
        <ScrollReveal yOffset={25} className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-manrope aikulb-gradient-text">
              <AnimatedCounter from={0} to={50} suffix="K+" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-inter font-medium mt-1 uppercase tracking-wider">
              Profiles Active
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-manrope aikulb-gradient-text">
              <AnimatedCounter from={0} to={120} suffix="K+" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-inter font-medium mt-1 uppercase tracking-wider">
              NFC Taps & Scans
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-manrope aikulb-gradient-text">
              <AnimatedCounter from={0} to={45} suffix="K+" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-inter font-medium mt-1 uppercase tracking-wider">
              Leads Captured
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-manrope aikulb-gradient-text">
              <AnimatedCounter from={0} to={99} suffix=".9%" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-inter font-medium mt-1 uppercase tracking-wider">
              Uptime Reliability
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
