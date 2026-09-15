import React from 'react';
import { Sparkles, Terminal, Users, Cpu, Award } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export const WhyParticipate: React.FC = () => {
  const icons = [Terminal, Users, Cpu, Award];

  return (
    <section id="experience" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 text-xs font-mono uppercase mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>{SITE_DATA.experience.label}</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          More than a <span className="text-zinc-400">competition.</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
          AMSFROST 2026 is built to challenge your problem-solving depth, accelerate teamwork, and reward true engineering execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {SITE_DATA.experience.items.map((item, idx) => {
          const IconComp = icons[idx % icons.length];
          return (
            <div
              key={item.index}
              className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/15 bg-zinc-950/70 hover:border-white/40 transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-zinc-400 font-bold">
                    {item.index}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.note}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                AMSFROST 2026
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
