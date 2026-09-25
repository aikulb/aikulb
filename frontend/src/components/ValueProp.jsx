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
    <section className="py-24 bg-white border-t border-slate-200/80 relative text-slate-900 transition-colors duration-300 overflow-hidden">
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-[10px] font-mono font-bold tracking-widest uppercase">
            <span>SMART HARDWARE + CLOUD DIGITAL PLATFORM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-manrope tracking-tight">
            More Than a Business Card.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-inter font-medium leading-relaxed">
            AI Klub combines smart hardware with a powerful cloud digital identity software stack.
          </p>
        </ScrollReveal>

        {/* 6 Feature Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" staggerDelay={0.08}>
          {features.map((f, i) => {
            const IconComponent = f.icon;
            return (
              <StaggerItem key={i}>
                <div className="group relative p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between h-full hover:-translate-y-1">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-amber-600" />
                      </div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                        {f.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 font-manrope mb-3 group-hover:text-amber-700 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-sm text-slate-700 font-inter leading-relaxed font-medium">
                      {f.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Animated Key Statistics Counter Strip */}
        <ScrollReveal yOffset={25} className="p-8 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-md grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-manrope">
              <AnimatedCounter from={0} to={50} suffix="K+" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-inter font-semibold mt-1 uppercase tracking-wider">
              Profiles Active
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-manrope">
              <AnimatedCounter from={0} to={120} suffix="K+" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-inter font-semibold mt-1 uppercase tracking-wider">
              NFC Taps & Scans
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-manrope">
              <AnimatedCounter from={0} to={45} suffix="K+" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-inter font-semibold mt-1 uppercase tracking-wider">
              Leads Captured
            </p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-manrope">
              <AnimatedCounter from={0} to={99} suffix=".9%" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-inter font-semibold mt-1 uppercase tracking-wider">
              Uptime Reliability
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
