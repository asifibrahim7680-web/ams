import React from 'react';
import { Trophy, Award, Medal, Sparkles, Star, ShieldCheck, Briefcase, IndianRupee } from 'lucide-react';

export const Prizes: React.FC = () => {
  return (
    <section id="prizes" className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-white text-xs font-mono-tech uppercase mb-3 shadow-sm">
          <Trophy className="w-3.5 h-3.5 text-white" />
          <span>PRIZES &amp; RECOGNITION</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          REWARDING <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">EXCELLENCE</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          Competitors vie for a ₹25,000 prize pool, prestigious championship trophies, and fast-track corporate internship opportunities.
        </p>
      </div>

      {/* Hero Grand Prize Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/30 text-center max-w-4xl mx-auto mb-10 relative overflow-hidden shadow-2xl bg-zinc-950">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-zinc-900 border border-white/20 text-xs font-mono-tech font-bold text-zinc-300 uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>SUBSTANTIAL REWARDS ACROSS ALL 3 TRACKS</span>
        </div>

        <div className="font-heading font-black text-5xl sm:text-7xl text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          ₹25,000
        </div>
        <div className="font-mono-tech font-bold text-sm sm:text-base text-zinc-400 uppercase tracking-widest mt-1">
          TOTAL CASH PRIZE POOL + AWARDS &amp; PERKS
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto mt-3">
          Cash bounties, winner trophies, runner-up mementos, merit certificates, and exclusive sponsor gifts awarded to top builders.
        </p>
      </div>

      {/* Exclusive Internship Partner Banner */}
      <div className="glass-panel rounded-2xl p-5 sm:p-7 border border-white/15 max-w-4xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md bg-zinc-950/80">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-white shrink-0 shadow-sm">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-tech font-bold text-zinc-400 uppercase tracking-wider">
                CAREER ACCELERATION PARTNER
              </span>
              <span className="px-2 py-0.5 rounded bg-white text-black text-[10px] font-mono-tech font-bold">
                WYNTRIX INNOVATION
              </span>
            </div>
            <h3 className="font-heading font-black text-lg sm:text-xl text-white mt-0.5">
              FAST-TRACK INDUSTRY INTERNSHIP OPPORTUNITY
            </h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Top-performing teams and category champions receive priority evaluation and direct interview shortlists for paid industry internships.
            </p>
          </div>
        </div>
        <span className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-200 border border-white/15 font-mono-tech text-xs font-bold whitespace-nowrap shadow-sm">
          🏆 Winners &amp; Finalists
        </span>
      </div>

      {/* 3 Main Podium Prize Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
        {/* 1st Prize */}
        <div className="glass-panel rounded-3xl p-6 border-2 border-white bg-zinc-900 text-center shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-white/20 flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
            🥇
          </div>
          <span className="text-[11px] font-mono-tech font-bold text-black bg-white px-3 py-1 rounded-full uppercase inline-block mb-2">
            CHAMPIONS
          </span>
          <h3 className="font-heading font-black text-2xl text-white mb-2">
            FIRST PRIZE
          </h3>
          <div className="p-3 rounded-2xl bg-zinc-950 border border-white/15 mb-4">
            <p className="font-mono-tech text-xs text-zinc-300 font-bold">
              Prize distribution will be announced by the organizers.
            </p>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Grand Championship Trophy, Official Winners Certificate, Merit Recognition, and Priority Internship Interview Fast-Track.
          </p>
        </div>

        {/* 2nd Prize */}
        <div className="glass-panel rounded-3xl p-6 border border-white/15 bg-zinc-950 text-center shadow-md hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/15 flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
            🥈
          </div>
          <span className="text-[11px] font-mono-tech font-bold text-zinc-200 bg-zinc-800 px-3 py-1 rounded-full border border-white/15 uppercase inline-block mb-2">
            FIRST RUNNER-UP
          </span>
          <h3 className="font-heading font-black text-2xl text-white mb-2">
            SECOND PRIZE
          </h3>
          <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/10 mb-4">
            <p className="font-mono-tech text-xs text-zinc-300 font-bold">
              Prize distribution will be announced by the organizers.
            </p>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Runners-Up Trophy, Silver Mementos, Official Merit Certificate, and Internship Shortlist Consideration.
          </p>
        </div>

        {/* 3rd Prize */}
        <div className="glass-panel rounded-3xl p-6 border border-white/15 bg-zinc-950 text-center shadow-md hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/15 flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
            🥉
          </div>
          <span className="text-[11px] font-mono-tech font-bold text-zinc-300 bg-zinc-800 px-3 py-1 rounded-full border border-white/15 uppercase inline-block mb-2">
            SECOND RUNNER-UP
          </span>
          <h3 className="font-heading font-black text-2xl text-white mb-2">
            THIRD PRIZE
          </h3>
          <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/10 mb-4">
            <p className="font-mono-tech text-xs text-zinc-300 font-bold">
              Prize distribution will be announced by the organizers.
            </p>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Third Place Trophy, Bronze Mementos, Official Merit Certificate, and Exclusive Hackathon Goodies.
          </p>
        </div>
      </div>

      {/* Special Recognition Categories Grid */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs font-mono-tech text-zinc-400 uppercase tracking-widest font-bold">
            SPECIAL CATEGORY RECOGNITION
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel rounded-2xl p-4 border border-white/15 bg-zinc-950/70 shadow-sm text-center">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 text-white flex items-center justify-center mx-auto mb-2 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-black text-sm text-white">
              BEST INNOVATION
            </h4>
            <p className="text-[11px] text-zinc-400 mt-1">
              Novelty of approach &amp; disruptive concept framing
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-4 border border-white/15 bg-zinc-950/70 shadow-sm text-center">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 text-white flex items-center justify-center mx-auto mb-2 font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-black text-sm text-white">
              BEST TECHNICAL IMPLEMENTATION
            </h4>
            <p className="text-[11px] text-zinc-400 mt-1">
              Outstanding architecture, hygiene &amp; functional demo
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-4 border border-white/15 bg-zinc-950/70 shadow-sm text-center">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 text-white flex items-center justify-center mx-auto mb-2 font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-black text-sm text-white">
              BEST INTERDISCIPLINARY TEAM
            </h4>
            <p className="text-[11px] text-zinc-400 mt-1">
              Excellence across software, hardware &amp; cross-domain synergy
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-4 border border-white/15 bg-zinc-950/70 shadow-sm text-center">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 text-white flex items-center justify-center mx-auto mb-2 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-black text-sm text-white">
              BEST SOCIAL IMPACT
            </h4>
            <p className="text-[11px] text-zinc-400 mt-1">
              Tangible positive change for community &amp; environmental issues
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
