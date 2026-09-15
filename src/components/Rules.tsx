import React, { useState } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { COMPETITIONS } from '../data/siteData';

export const Rules: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<'all' | 'crack-the-code' | 'hackathon' | 'techforge'>('all');

  const generalRules = [
    {
      title: 'Originality & Authoring',
      desc: 'All submitted work, code, and circuit designs must be original and developed within the event window.',
    },
    {
      title: 'Student ID Verification',
      desc: 'Valid college ID cards are mandatory for all team members at the on-campus check-in desk.',
    },
    {
      title: 'Strict Submission Deadlines',
      desc: 'Late submissions, demos, or presentation uploads past the buzzer will not be evaluated.',
    },
    {
      title: 'Finality of Jury Decisions',
      desc: 'All evaluations, scores, and decisions made by the jury and organizing committee are final and binding.',
    },
  ];

  return (
    <section id="rules" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 text-xs font-mono uppercase mb-3 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
          <span>06 / RULES</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Know the rules. <span className="text-zinc-400">Play fair.</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          Full rule sets are kept short and readable — review competition-specific requirements below.
        </p>
      </div>

      {/* General Event Conduct Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {generalRules.map((rule, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-zinc-950 border border-white/15 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-zinc-400">0{idx + 1}</span>
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-heading font-bold text-white text-base mb-1.5">
                {rule.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {rule.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Competition-Specific Rules Tabs / Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {COMPETITIONS.map((comp) => (
          <div
            key={comp.id}
            className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-zinc-950/70 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg text-white font-bold">{comp.symbol}</span>
                  <span className="font-mono text-xs text-zinc-400">{comp.index} / RULES</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-white/15 text-[11px] font-mono text-zinc-300">
                  {comp.teamSize}
                </span>
              </div>

              <h3 className="font-heading font-black text-xl text-white mb-2">
                {comp.name}
              </h3>
              <p className="text-xs text-zinc-400 mb-4">
                {comp.tagline}
              </p>

              <ul className="space-y-2.5">
                {comp.details.rules.map((rule, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <span className="font-mono text-zinc-500 font-bold shrink-0 mt-0.5">
                      {rIdx + 1}.
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Eligibility: All Colleges</span>
              <span>Fee: {comp.fee}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
