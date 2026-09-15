import React from 'react';
import { Users, IndianRupee, Utensils, Wrench, Globe, Sparkles, ShieldCheck } from 'lucide-react';

export const ParticipationDetails: React.FC = () => {
  const details = [
    {
      icon: Users,
      label: 'TEAM FORMATION',
      value: '2 – 4 Members',
      desc: 'Form teams of 2 to 4 students. Cross-departmental, inter-year, and inter-college team collaborations are warmly permitted.',
    },
    {
      icon: IndianRupee,
      label: 'REGISTRATION FEE',
      value: '₹200 Per Head',
      desc: 'Transparent pricing of ₹200 per team member. Covers delegate badge kits, all meals, energy snacks, Wi-Fi, and lab resources.',
    },
    {
      icon: Utensils,
      label: 'FOOD & REFRESHMENTS',
      value: '100% Provided Free',
      desc: 'All meals including morning breakfast, hot buffet lunch, high-tea, snacks, and continuous coffee/tea refuels are fully complimentary.',
    },
    {
      icon: Wrench,
      label: 'HARDWARE WORKBENCHES',
      value: 'Lab Access & Stations',
      desc: 'Dedicated electronics workbenches equipped with high-speed power strips, testing instruments, breadboards, and lab assistance.',
    },
    {
      icon: Globe,
      label: 'THREE DEDICATED TRACKS',
      value: 'SW, HW & Open Domain',
      desc: 'Choose Software Track, Hardware Track, or Open Domain. Open Domain explicitly supports both software and hardware implementations.',
    },
    {
      icon: Sparkles,
      label: 'EVENT LEVEL & ELIGIBILITY',
      value: 'National Inter-College',
      desc: 'Open to all bona fide engineering, arts & science, and polytechnic college students across India with valid college ID cards.',
    },
  ];

  return (
    <section id="details" className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 text-xs font-mono-tech uppercase mb-3 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
          <span>EVENT LOGISTICS &amp; GUIDELINES</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          PARTICIPATION <span className="text-gradient-cyan">DETAILS</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
          Everything you need to know about team limits, nominal fee, venue facilities, and hackathon accommodations.
        </p>
      </div>

      {/* 6 Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {details.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/15 hover:border-white/40 hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono-tech font-bold text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded-md border border-white/15 uppercase">
                    {item.label}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <div className="font-heading font-black text-xl sm:text-2xl text-white mb-2">
                  {item.value}
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-zinc-400">
                <span>✓ Verified guideline</span>
                <span className="w-2 h-2 rounded-full bg-white/60 group-hover:bg-white transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
