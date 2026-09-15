import React from 'react';
import { Users, IndianRupee, Utensils, Wrench, Globe, Sparkles, ShieldCheck } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

interface ParticipationDetailsProps {
  onOpenRegister?: () => void;
}

export const ParticipationDetails: React.FC<ParticipationDetailsProps> = ({ onOpenRegister }) => {
  const details = [
    {
      icon: Users,
      label: 'TEAM SIZES PER CHALLENGE',
      value: 'Crack: 1–2 | Hack: 2–5 | Tech: 2–4',
      desc: 'Crack the Code supports individual or duo participants. Hackathon requires 2–5 members. TechForge requires 2–4 members.',
    },
    {
      icon: IndianRupee,
      label: 'REGISTRATION FEES',
      value: '₹100 or ₹200 Per Head',
      desc: 'Crack the Code is ₹100 per participant. Hackathon and TechForge are ₹200 per participant. Transparent fees per registered member.',
    },
    {
      icon: Utensils,
      label: 'FOOD & REFRESHMENTS',
      value: 'Provided for All Participants',
      desc: 'Complimentary refreshments and lunch will be served to all registered participants on the event day.',
    },
    {
      icon: Wrench,
      label: 'HARDWARE WORKBENCHES',
      value: 'Lab Access & Stations',
      desc: 'TechForge teams receive workbench allocation with power strips, testing instruments, and technical lab assistance.',
    },
    {
      icon: Globe,
      label: 'VENUE & LOCATION',
      value: 'AMS College, Chennai',
      desc: `${SITE_DATA.campusAddress}. Easily accessible from Chennai Central and Avadi IAF.`,
    },
    {
      icon: ShieldCheck,
      label: 'ELIGIBILITY & VERIFICATION',
      value: 'All Recognized Colleges',
      desc: 'Open to enrolled undergraduate and postgraduate students from any recognized college with a valid physical or digital Student ID.',
    },
  ];

  return (
    <section id="details" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 text-xs font-mono uppercase mb-3 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
          <span>EVENT LOGISTICS &amp; GUIDELINES</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Participation <span className="text-zinc-400">Details.</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          Key facts on team sizes, registration fees, on-campus facilities, and verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {details.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/15 bg-zinc-950/70 hover:border-white/35 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/15 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2">
                  {item.value}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                01 OCT 2026 • CHENNAI
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
