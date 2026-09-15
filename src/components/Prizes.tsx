import React from 'react';
import { Trophy, Award, Sparkles, Star, ShieldCheck, Briefcase } from 'lucide-react';
import { PRIZE_PODIUM, RECOGNITION_PERKS, RECOGNITION_BADGES } from '../data/siteData';

export const Prizes: React.FC = () => {
  return (
    <section id="prizes" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header matching reference */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 text-xs font-mono uppercase mb-3 shadow-sm">
          <Trophy className="w-3.5 h-3.5 text-white" />
          <span>05 / RECOGNITION</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Build something <span className="text-zinc-400">worth remembering.</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          Cash prizes, verified credentials, and real career opportunities awarded to outstanding teams.
        </p>
      </div>

      {/* 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
        {/* 2nd Prize */}
        <div className="order-2 md:order-1 glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-zinc-950/70 flex flex-col justify-between text-center group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/15 mx-auto flex items-center justify-center font-mono font-bold text-lg text-zinc-400 mb-4">
              2
            </div>
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
              {PRIZE_PODIUM[1].place}
            </span>
            <div className="font-heading font-black text-3xl sm:text-4xl text-white mt-2">
              {PRIZE_PODIUM[1].amount}
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              {PRIZE_PODIUM[1].note}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-zinc-400">
            Runner Up Accolade
          </div>
        </div>

        {/* 1st Prize (Featured Center) */}
        <div className="order-1 md:order-2 glass-panel rounded-3xl p-8 sm:p-10 border-2 border-white/40 bg-zinc-900/90 shadow-2xl flex flex-col justify-between text-center relative overflow-hidden group scale-105">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1 rounded-b-xl bg-white text-black font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm">
            CHAMPION
          </div>

          <div>
            <div className="w-16 h-16 rounded-2xl bg-white text-black mx-auto flex items-center justify-center font-mono font-black text-2xl mb-4 shadow-lg mt-2">
              1
            </div>
            <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest font-semibold">
              {PRIZE_PODIUM[0].place}
            </span>
            <div className="font-heading font-black text-4xl sm:text-5xl text-white mt-2 tracking-tight">
              {PRIZE_PODIUM[0].amount}
            </div>
            <p className="text-xs text-zinc-300 mt-2">
              {PRIZE_PODIUM[0].note}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20 text-xs font-mono text-white font-semibold">
            Trophy + Certificate + Merit
          </div>
        </div>

        {/* 3rd Prize */}
        <div className="order-3 glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-zinc-950/70 flex flex-col justify-between text-center group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/15 mx-auto flex items-center justify-center font-mono font-bold text-lg text-zinc-400 mb-4">
              3
            </div>
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
              {PRIZE_PODIUM[2].place}
            </span>
            <div className="font-heading font-black text-3xl sm:text-4xl text-white mt-2">
              {PRIZE_PODIUM[2].amount}
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              {PRIZE_PODIUM[2].note}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-zinc-400">
            Second Runner Up
          </div>
        </div>
      </div>

      {/* Perks & Recognition Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10">
        {RECOGNITION_PERKS.map((perk, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-zinc-950 border border-white/15 flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/15 flex items-center justify-center text-white shrink-0">
              {i === 0 ? <Award className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-white">
                {perk.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                {perk.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Special Recognition Badges from Reference */}
      <div className="rounded-3xl p-6 sm:p-8 bg-zinc-950/90 border border-white/15 max-w-4xl mx-auto text-center">
        <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-4">
          SPECIAL RECOGNITION CATEGORIES
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {RECOGNITION_BADGES.map((badge, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 flex flex-col items-center justify-center gap-1.5"
            >
              <Star className="w-4 h-4 text-white" />
              <span className="font-mono text-xs text-zinc-200 font-semibold text-center">
                {badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
