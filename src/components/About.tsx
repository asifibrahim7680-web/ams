import React from 'react';
import { Zap, Cpu, CheckCircle, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  const gains = [
    {
      title: 'Mentorship from Industry Experts',
      desc: 'Direct real-time architectural guidance, code reviews, and hardware debugging from senior engineers and startup mentors.',
    },
    {
      title: 'Hands-on Hackathon Experience',
      desc: 'Experience high-velocity rapid prototyping, collaborative sprint dynamics, git version control audit, and physical workbench testing.',
    },
    {
      title: 'Certificate of Participation for All',
      desc: 'Every verified participant with a completed project receives an official verified Certificate of Merit & Participation.',
    },
    {
      title: 'Opportunity to Build Portfolio Projects',
      desc: 'Ship an end-to-end working system from scratch to showcase on your GitHub, LinkedIn, and engineering portfolio.',
    },
  ];

  const highlights = [
    'Mentorship from industry experts',
    'Hands-on hackathon experience',
    'Certificate of participation for all',
    'Opportunity to build portfolio projects',
  ];

  return (
    <section id="about" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-white text-xs font-mono-tech uppercase mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>ABOUT THE HACKATHON</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          WHAT IS <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">FROST HACKS?</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          <strong className="text-white">FROST Hacks</strong> is an adrenaline-charged, national-level <strong className="text-white">one-day tech hackathon</strong> uniting collegiate software developers, embedded circuit designers, and interdisciplinary problem solvers to prototype transformative solutions within a dedicated 12-hour sprint.
        </p>
      </div>

      {/* 4 Core Pillars: What, Why, Who, What You Gain */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Why Attend? */}
        <div className="glass-panel rounded-2xl p-6 border border-white/15 shadow-sm hover:border-white/40 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/15 text-white flex items-center justify-center mb-4 font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-xl text-white mb-2">
              Why Attend?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Step away from theoretical coursework into intense hands-on engineering. Test your limits, network with top peer builders, pitch live before industry jury panels, and compete for ₹25,000 cash rewards and internship opportunities.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 font-mono-tech text-[11px] text-zinc-400 font-bold">
            12 HOURS OF PURE CREATIVITY
          </div>
        </div>

        {/* Who Can Participate? */}
        <div className="glass-panel rounded-2xl p-6 border border-white/15 shadow-sm hover:border-white/40 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/15 text-white flex items-center justify-center mb-4 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-xl text-white mb-2">
              Who Can Participate?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Undergraduate and postgraduate students from any recognized college or university. Teams of <strong className="text-white">2 to 5 members</strong> are welcomed across disciplines: Computer Science, Electronics, Robotics, Mechanical, Biotech, or Design.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 font-mono-tech text-[11px] text-zinc-400 font-bold">
            TEAMS OF 2 – 5 STUDENTS
          </div>
        </div>

        {/* What You Will Gain */}
        <div className="glass-panel rounded-2xl p-6 border border-white/15 shadow-sm hover:border-white/40 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/15 text-white flex items-center justify-center mb-4 font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-xl text-white mb-2">
              Dual &amp; Open Tracks
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Choose from Software, Hardware, or Open Domain. Open Domain specifically welcomes both pure software and physical hardware (or hybrid systems), giving you total architectural freedom.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 font-mono-tech text-[11px] text-zinc-400 font-bold">
            SOFTWARE + HARDWARE + OPEN
          </div>
        </div>
      </div>

      {/* Highlighted Gains Banner (4 Key Gains) */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/30 bg-zinc-950/80 shadow-md">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-mono-tech font-bold text-zinc-400 uppercase tracking-widest">
            TANGIBLE PARTICIPANT TAKEAWAYS
          </span>
          <h3 className="font-heading font-black text-2xl text-white mt-1">
            What Participants Will Gain
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gains.map((g, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-zinc-900/90 border border-white/15 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-zinc-800 text-white flex items-center justify-center mb-2.5 font-bold text-xs border border-white/10">
                  0{idx + 1}
                </div>
                <h4 className="font-heading font-bold text-sm text-white mb-1.5">
                  {g.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {g.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Checkmarks */}
        <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-zinc-300">
          {highlights.map((h, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-white" />
              <span>{h}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
