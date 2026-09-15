import React, { useState } from 'react';
import { BarChart3, Sparkles } from 'lucide-react';
import { COMPETITIONS } from '../data/siteData';

export const Evaluation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'crack-the-code' | 'hackathon' | 'techforge'>('hackathon');

  const currentComp = COMPETITIONS.find((c) => c.id === activeTab) || COMPETITIONS[1];

  return (
    <section id="evaluation" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 text-xs font-mono uppercase mb-3 shadow-sm">
          <BarChart3 className="w-3.5 h-3.5 text-white" />
          <span>07 / EVALUATION</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          How it's <span className="text-zinc-400">judged.</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          Each competition is scored on its own weighted criteria — transparency for every participant.
        </p>

        {/* Competition Selector Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {COMPETITIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === c.id
                  ? 'bg-white text-black shadow-lg scale-105'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10 hover:border-white/25'
              }`}
            >
              <span>{c.symbol}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Evaluation Dashboard for Selected Competition */}
      <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 bg-zinc-950/80 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-zinc-400">
                {currentComp.index} / {currentComp.category}
              </span>
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
              {currentComp.name} Rubric
            </h3>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-zinc-900 border border-white/15 text-xs font-mono text-zinc-200 self-start sm:self-auto">
            Total Weight: <span className="text-white font-bold">100%</span>
          </div>
        </div>

        {/* Scoring Bars */}
        <div className="space-y-4">
          {currentComp.scoring.map((criterion, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-2 hover:border-white/30 transition-all"
            >
              <div className="flex justify-between items-center text-sm font-mono">
                <span className="text-white font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-400 text-xs flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  {criterion.label}
                </span>
                <span className="text-white font-bold bg-zinc-800 px-2.5 py-0.5 rounded-lg border border-white/15">
                  {criterion.weight}%
                </span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-zinc-200 to-white rounded-full transition-all duration-700"
                  style={{ width: `${criterion.weight * 2.5}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Evaluation Note */}
        <div className="mt-8 p-4 rounded-2xl bg-zinc-900 border border-white/15 text-xs text-zinc-300">
          <span className="font-mono font-bold text-white uppercase mr-1">
            Jury Focus:
          </span>
          {currentComp.details.evaluationNote}
        </div>
      </div>
    </section>
  );
};
