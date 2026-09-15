import React from 'react';
import { Zap, Cpu, CheckCircle, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 text-xs font-mono uppercase mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>01 / ABOUT</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Three ways to compete. <span className="text-zinc-400">One platform to build.</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-lg mt-4 leading-relaxed font-medium">
          AMSFROST 2026 brings students together to compete in coding, software innovation, and hardware engineering at Aalim Muhammed Salegh College of Engineering, Chennai.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-400">
          <span className="px-3 py-1 rounded bg-zinc-900 border border-white/15 text-zinc-300">
            01 OCTOBER 2026
          </span>
          <span>•</span>
          <span className="px-3 py-1 rounded bg-zinc-900 border border-white/15 text-zinc-300">
            CHENNAI, TAMIL NADU
          </span>
          <span>•</span>
          <span className="px-3 py-1 rounded bg-zinc-900 border border-white/15 text-zinc-300">
            INTER-COLLEGE
          </span>
        </div>
      </div>

      {/* 3 Competition Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Crack the Code */}
        <div className="glass-panel rounded-2xl p-6 border border-white/15 shadow-sm hover:border-white/40 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xl text-white font-black">{'{ }'}</span>
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-zinc-900 border border-white/20 text-zinc-300">
                01 · ₹100 / participant
              </span>
            </div>
            <h3 className="font-heading font-black text-xl text-white mb-1.5">
              CRACK THE CODE
            </h3>
            <div className="text-xs font-mono text-zinc-400 mb-3 uppercase tracking-wider">
              Coding &amp; Debugging • 1–2 Members
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              A timed battle of logic, speed, and precision across three rounds: Code Sprint, Debugging Arena, and the Final Code Challenge.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-zinc-400">
            <span>Solo or Duo</span>
            <a href="#events" className="text-white hover:underline">View challenge &rarr;</a>
          </div>
        </div>

        {/* Hackathon */}
        <div className="glass-panel rounded-2xl p-6 border border-white/30 bg-zinc-900/60 shadow-sm hover:border-white/50 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xl text-white font-black">&gt;&gt;_</span>
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-zinc-900 border border-white/20 text-zinc-300">
                02 · ₹200 / participant
              </span>
            </div>
            <h3 className="font-heading font-black text-xl text-white mb-1.5">
              HACKATHON
            </h3>
            <div className="text-xs font-mono text-zinc-400 mb-3 uppercase tracking-wider">
              Software &amp; Innovation • 2–5 Members
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Find a problem. Build the solution. A full-day build sprint across technology domains including AI/ML, Cybersecurity, IoT, and FinTech.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-zinc-400">
            <span>Teams of 2–5</span>
            <a href="#events" className="text-white hover:underline">View challenge &rarr;</a>
          </div>
        </div>

        {/* TechForge */}
        <div className="glass-panel rounded-2xl p-6 border border-white/15 shadow-sm hover:border-white/40 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xl text-white font-black">◇▱</span>
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-zinc-900 border border-white/20 text-zinc-300">
                03 · ₹200 / participant
              </span>
            </div>
            <h3 className="font-heading font-black text-xl text-white mb-1.5">
              TECHFORGE
            </h3>
            <div className="text-xs font-mono text-zinc-400 mb-3 uppercase tracking-wider">
              Hardware &amp; Engineering • 2–4 Members
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Design. Build. Demonstrate. Turn ideas into working physical prototypes in a single day across Robotics, IoT, EV, and Automation.
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-zinc-400">
            <span>Teams of 2–4</span>
            <a href="#events" className="text-white hover:underline">View challenge &rarr;</a>
          </div>
        </div>
      </div>

      {/* College Footprint Banner */}
      <div className="rounded-2xl p-6 sm:p-8 bg-zinc-950 border border-white/15 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            Host Institution
          </div>
          <div className="text-lg sm:text-xl font-heading font-bold text-white">
            Aalim Muhammed Salegh College of Engineering
          </div>
          <p className="text-xs text-zinc-400 max-w-xl">
            Nizara Educational Campus, Muthapudupet, Avadi IAF, Chennai - 600055. Providing an inclusive stage for inter-college innovators across Tamil Nadu and beyond.
          </p>
        </div>
        <div className="flex flex-col items-center sm:items-end shrink-0 gap-2">
          <span className="px-3.5 py-1 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider">
            Inter-College Event
          </span>
          <span className="text-xs font-mono text-zinc-400">
            Student ID required at check-in
          </span>
        </div>
      </div>
    </section>
  );
};
