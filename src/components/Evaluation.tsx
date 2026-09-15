import React from 'react';
import { Award, Zap, CheckCircle2, BarChart3, AlertCircle } from 'lucide-react';
import { EvaluationItem } from '../types';

export const Evaluation: React.FC = () => {
  const criteria: EvaluationItem[] = [
    {
      name: 'Technical Implementation',
      weight: 25,
      isHighest: true,
      description:
        'Architectural complexity, code hygiene, robust concurrency, secure APIs, or robust sensor firmware logic.',
    },
    {
      name: 'Innovation & Originality',
      weight: 20,
      description:
        'Novelty of approach, creative problem framing, and distinctive intellectual engineering value.',
    },
    {
      name: 'Problem Identification',
      weight: 15,
      description:
        'Clarity in diagnosing real pain points, domain understanding, and precision of defined scope.',
    },
    {
      name: 'Functionality & Live Demo',
      weight: 15,
      description:
        'End-to-end operational readiness, seamless live demonstration without fatal crashes or stub mockups.',
    },
    {
      name: 'Impact & Scalability',
      weight: 10,
      description:
        'Potential for real-world deployment, practical utility, and architectural scale capabilities.',
    },
    {
      name: 'Presentation & Q&A Defense',
      weight: 10,
      description:
        'Precision in articulating design choices, jury inquiry handling, and technical transparency.',
    },
    {
      name: 'UI/UX & Ergonomics',
      weight: 5,
      description:
        'Intuitive user flow, tactile responsiveness, aesthetic poise, and ergonomic accessibility.',
    },
  ];

  return (
    <section id="evaluation" className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-white text-xs font-mono-tech uppercase mb-3 shadow-sm">
          <BarChart3 className="w-3.5 h-3.5 text-white" />
          <span>SCORING BENCHMARKS</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          HOW PROJECTS ARE <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">JUDGED</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          Evaluation at FROST Hacks is transparent, objective, and weighted heavily toward genuine technical craftsmanship.
        </p>
      </div>

      {/* Highest Weight Banner Callout */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/30 mb-10 flex items-center justify-between flex-wrap gap-4 shadow-md bg-zinc-950/90">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white text-black">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="font-heading font-black text-base sm:text-lg text-white">
              CRITICAL EMPHASIS: TECHNICAL IMPLEMENTATION (25%)
            </div>
            <p className="text-xs text-zinc-400">
              Working code and viable hardware circuits carry the highest singular score weight. Build real working systems.
            </p>
          </div>
        </div>
        <div className="font-mono-tech text-xs text-white font-bold px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/20">
          MAX WEIGHT: 25 PTS
        </div>
      </div>

      {/* Criteria Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {criteria.map((item) => (
          <div
            key={item.name}
            className={`glass-panel rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group border ${
              item.isHighest
                ? 'border-white/40 bg-zinc-900/80 shadow-md'
                : 'border-white/15 hover:border-white/35 bg-zinc-950/70 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading font-bold text-base text-white group-hover:text-zinc-300 transition-colors">
                  {item.name}
                </span>
                <span
                  className={`font-mono-tech text-xs font-bold px-2.5 py-1 rounded-md ${
                    item.isHighest
                      ? 'bg-white text-black shadow-sm'
                      : 'bg-zinc-800 text-zinc-300 border border-white/10'
                  }`}
                >
                  {item.weight}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-zinc-900 rounded-full h-2 mb-3 overflow-hidden border border-white/10">
                <div
                  className={`h-full rounded-full ${
                    item.isHighest
                      ? 'bg-white'
                      : 'bg-zinc-400'
                  }`}
                  style={{ width: `${item.weight * 4}%` }}
                />
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-tech text-zinc-500">
              <span>ALLOCATION: {item.weight} / 100</span>
              {item.isHighest && <span className="text-white font-bold">HIGHEST VALUE</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
