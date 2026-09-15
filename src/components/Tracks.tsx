import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle, Eye } from 'lucide-react';
import { COMPETITIONS, Competition } from '../data/siteData';
import { ChallengeDetailModal } from './ChallengeDetailModal';
import { TrackType } from '../types';

interface TracksProps {
  onSelectTrackForRegistration: (track: TrackType) => void;
}

export const Tracks: React.FC<TracksProps> = ({ onSelectTrackForRegistration }) => {
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenDetail = (comp: Competition) => {
    setSelectedCompetition(comp);
    setIsDetailOpen(true);
  };

  const handleRegisterFromModal = (comp: Competition) => {
    // Map to TrackType
    let track: TrackType = 'Software';
    if (comp.id === 'crack-the-code') track = 'Crack the Code';
    else if (comp.id === 'hackathon') track = 'Hackathon';
    else if (comp.id === 'techforge') track = 'TechForge';
    onSelectTrackForRegistration(track);
  };

  return (
    <section id="events" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div id="tracks" className="absolute -top-24"></div>

      {/* Section Header matching reference site */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 text-xs font-mono uppercase mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>02 / EVENTS</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Choose your <span className="text-zinc-400">challenge.</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          Three ways to compete. Select a track to view stages, scoring criteria, and registration details.
        </p>
      </div>

      {/* 3 Competitions Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {COMPETITIONS.map((comp) => (
          <div
            key={comp.id}
            className="glass-panel rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group border border-white/15 relative overflow-hidden bg-zinc-950/70"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-zinc-400 to-zinc-700"></div>

            <div>
              {/* Header: Symbol + Index & Fee */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md font-mono text-xl text-white font-bold">
                  {comp.symbol}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-mono text-zinc-400">{comp.index} / 03</span>
                  <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/20 text-xs font-mono text-zinc-200 font-bold">
                    {comp.fee}
                  </span>
                </div>
              </div>

              {/* Category & Name */}
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
                {comp.category}
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
                {comp.name}
              </h3>
              <div className="text-xs font-mono text-zinc-300 mt-1 font-semibold">
                Team Size: {comp.teamSize}
              </div>

              {/* Tagline & Description */}
              <div className="mt-3 p-3 rounded-xl bg-zinc-900/50 border border-white/10 text-xs text-zinc-300 font-medium italic">
                "{comp.tagline}"
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed">
                {comp.description}
              </p>

              {/* Stages Pill Strip */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 font-bold">
                  STAGES &amp; STRUCTURE
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {comp.stages.map((st, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-zinc-300 text-[11px] font-mono"
                    >
                      {i + 1}. {st}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5">
              <button
                onClick={() => handleOpenDetail(comp)}
                className="w-full py-2.5 px-4 rounded-xl border border-white/20 hover:border-white/40 text-white font-mono text-xs flex items-center justify-center gap-2 transition bg-zinc-900 hover:bg-zinc-800"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Challenge</span>
              </button>

              <button
                onClick={() => {
                  let track: TrackType = 'Software';
                  if (comp.id === 'crack-the-code') track = 'Crack the Code';
                  else if (comp.id === 'hackathon') track = 'Hackathon';
                  else if (comp.id === 'techforge') track = 'TechForge';
                  onSelectTrackForRegistration(track);
                }}
                className="w-full btn-neon-primary py-3 px-4 rounded-xl font-bold text-xs text-black flex items-center justify-center gap-2 uppercase tracking-wider shadow-md transition-all hover:scale-[1.02]"
              >
                <span>Register for {comp.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Challenge Detail Modal */}
      <ChallengeDetailModal
        competition={selectedCompetition}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onRegister={handleRegisterFromModal}
      />
    </section>
  );
};
