import React from 'react';
import { Trophy, Wrench, Users, Music, Award, Utensils, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyParticipate: React.FC = () => {
  const reasons = [
    {
      icon: Trophy,
      title: '₹25,000 Cash Prize Pool',
      desc: 'Exciting cash rewards, winner trophies, runner-up accolades, and certificates for outstanding engineering.',
      tag: 'CASH REWARDS',
    },
    {
      icon: Wrench,
      title: 'Hardware Lab & Workbenches',
      desc: 'Dedicated hardware lab stations with sensor kits, breadboards, testing tools, and electronics support staff.',
      tag: 'MAKER BENCHES',
    },
    {
      icon: Users,
      title: 'Expert Mentorship Checkpoints',
      desc: 'Periodic reviews with senior software developers and hardware engineers to evaluate progress and guide solutions.',
      tag: 'LIVE GUIDANCE',
    },
    {
      icon: Music,
      title: 'Networking & Vibe Sessions',
      desc: 'Midnight breakout vibe time with high-energy music, interactive minigames, and peer connections across colleges.',
      tag: 'COLLEGIATE VIBES',
    },
    {
      icon: Award,
      title: 'Industry Internship Opportunity',
      desc: 'Winners and top-performing teams receive fast-track free industry-aligned internship opportunities at partner tech firms.',
      tag: 'INTERNSHIP PERKS',
    },
    {
      icon: Utensils,
      title: 'Meals & Energizing Refreshments',
      desc: 'Nutritious dinner, midnight snacks, tea & coffee refuels, and breakfast provided free throughout the 12-hour build.',
      tag: 'FULL CATERING',
    },
  ];

  return (
    <section className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 text-xs font-mono-tech uppercase mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>KEY PARTICIPATION PERKS</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          WHY JOIN <span className="text-gradient-cyan">FROST HACKS?</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
          More than just a hackathon — it's an immersive 12-hour high-octane engineering playground designed to accelerate your career, build lasting friendships, and create real impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/15 hover:border-white/40 hover:-translate-y-1 transition-all duration-300 shadow-sm group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-sm">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono-tech font-bold text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded-md border border-white/15 uppercase">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-heading font-black text-xl text-white mb-2 group-hover:text-zinc-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-zinc-400">
                <span>✓ Included with pass</span>
                <span className="w-2 h-2 rounded-full bg-white/60 group-hover:bg-white transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
