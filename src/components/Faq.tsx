import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { FAQ_LIST } from '../data/siteData';

export const Faq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 text-xs font-mono uppercase mb-3 shadow-sm">
          <HelpCircle className="w-3.5 h-3.5 text-white" />
          <span>08 / FAQ</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Got questions? <span className="text-zinc-400">We've got answers.</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          Frequently asked questions about AMSFROST 2026 registration, eligibility, and the event.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQ_LIST.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-zinc-900 border-white/40 shadow-md'
                  : 'bg-zinc-950/70 border-white/10 hover:border-white/25'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-white"
              >
                <span>{faq.q}</span>
                <span className="p-1 rounded-full bg-zinc-800 border border-white/10 text-white shrink-0">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/10">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions prompt */}
      <div className="mt-12 text-center p-6 rounded-3xl bg-zinc-950 border border-white/15">
        <p className="text-xs sm:text-sm text-zinc-300">
          Have a specific query not covered in the FAQ?
        </p>
        <div className="mt-2 flex items-center justify-center gap-4 text-xs font-mono">
          <a href="#contact" className="text-white underline hover:text-zinc-300">
            Contact Organizers
          </a>
          <span className="text-zinc-600">•</span>
          <a href="mailto:amsfrost@amsce.ac.in" className="text-zinc-400 hover:text-white">
            amsfrost@amsce.ac.in
          </a>
        </div>
      </div>
    </section>
  );
};
