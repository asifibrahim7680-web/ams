import React from 'react';
import { Sparkles, Shield, Award, UserCheck, Star } from 'lucide-react';
import { SITE_DATA } from '../data/siteData';

export const Patrons: React.FC = () => {
  const icons = [Shield, Star, Award, UserCheck];

  return (
    <section id="patrons" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header matching reference */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 text-xs font-mono uppercase mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>{SITE_DATA.patrons.label}</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          {SITE_DATA.patrons.heading}
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          {SITE_DATA.patrons.sub}
        </p>
      </div>

      {/* Main Patrons Category Banner */}
      <div className="text-center mb-8">
        <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-white/15 text-xs font-mono text-zinc-300 uppercase tracking-widest font-semibold">
          {SITE_DATA.patrons.groupLabel}
        </span>
      </div>

      {/* Grid of Patrons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {SITE_DATA.patrons.main.map((patron, idx) => {
          const IconComp = icons[idx % icons.length];
          const isFeatured = patron.featured;

          return (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between text-center relative overflow-hidden group ${
                isFeatured
                  ? 'bg-zinc-900 border-white/40 shadow-2xl scale-[1.02]'
                  : 'bg-zinc-950/70 border-white/15 hover:border-white/30'
              }`}
            >
              {isFeatured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-b-lg bg-white text-black font-mono text-[10px] font-bold uppercase tracking-wider">
                  CHIEF PATRON
                </div>
              )}

              <div>
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/15 mx-auto flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform shadow-md mt-2">
                  <IconComp className="w-7 h-7 text-white" />
                </div>

                <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block mb-2">
                  {patron.role}
                </span>

                <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
                  {patron.title}
                </h3>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-zinc-400">
                Aalim Muhammed Salegh College of Engineering
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
