import React, { useState } from 'react';
import { HelpCircle, AlertCircle, Sparkles, X, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProblemStatement } from '../types';

interface ProblemStatementsProps {
  onSelectProblemForRegistration?: (problemId: string, track: string) => void;
}

export const ProblemStatements: React.FC<ProblemStatementsProps> = ({ onSelectProblemForRegistration }) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'SOFTWARE' | 'HARDWARE' | 'OPEN DOMAIN'>('ALL');
  const [selectedProblem, setSelectedProblem] = useState<ProblemStatement | null>(null);

  const problemStatements: ProblemStatement[] = [
    {
      id: 'ps-soft-01',
      code: 'PS-SOFT-01',
      title: 'Problem statement will be announced by the organizers.',
      track: 'SOFTWARE',
      category: 'TO BE ANNOUNCED',
      description:
        'Official problem brief and dataset specifications will be officially unveiled during the opening ceremony by the FROST Hacks technical panel.',
      expectedSolution:
        'A functional software application (web, mobile, or cloud) addressing the official problem brief with clean architecture and live deployment.',
      constraints: 'Modern open-source libraries allowed. Complete code must be committed to GitHub during the hackathon sprint.',
      isAnnounced: false,
    },
    {
      id: 'ps-soft-02',
      code: 'PS-SOFT-02',
      title: 'Problem statement will be announced by the organizers.',
      track: 'SOFTWARE',
      category: 'TO BE ANNOUNCED',
      description:
        'Official problem brief and technical constraints will be released synchronously across all participant terminals prior to Sprint commencement.',
      expectedSolution:
        'Scalable digital system with modular APIs, authentication, data persistence, and intuitive responsive user interface.',
      constraints: 'Pre-existing repositories are prohibited. Development starts strictly after the kickoff protocol.',
      isAnnounced: false,
    },
    {
      id: 'ps-hard-01',
      code: 'PS-HARD-01',
      title: 'Problem statement will be announced by the organizers.',
      track: 'HARDWARE',
      category: 'TO BE ANNOUNCED',
      description:
        'Official hardware challenge theme and sensor integration objectives will be unveiled during the opening briefing.',
      expectedSolution:
        'A working physical prototype, microcontroller circuit, or IoT embedded apparatus demonstrating sensor acquisition and control logic.',
      constraints: 'Teams provide their own development boards and components. Soldering must comply with campus safety protocols.',
      isAnnounced: false,
    },
    {
      id: 'ps-hard-02',
      code: 'PS-HARD-02',
      title: 'Problem statement will be announced by the organizers.',
      track: 'HARDWARE',
      category: 'TO BE ANNOUNCED',
      description:
        'Official hardware theme, telemetry parameters, and actuation benchmarks will be released at kickoff.',
      expectedSolution:
        'Functional embedded device with real-time telemetry processing, firmware logic, and physical demonstration.',
      constraints: 'Standard microcontrollers (ESP32, STM32, Arduino, Raspberry Pi, etc.) supported.',
      isAnnounced: false,
    },
    {
      id: 'ps-open-01',
      code: 'PS-OPEN-01',
      title: 'NO FIXED PROBLEM STATEMENT — OPEN INNOVATION',
      track: 'OPEN DOMAIN',
      category: 'OPEN SOFTWARE & OPEN HARDWARE',
      description:
        'Identify a meaningful real-world problem and engineer your own innovative solution. Teams have complete freedom to define their mission.',
      expectedSolution:
        'Deliver either an innovative Software platform OR a physical Hardware apparatus (or unified interdisciplinary prototype) that effectively tackles your chosen problem.',
      constraints:
        'Must be an original, student-driven creation initiated and built during the one-day hackathon sprint.',
      isAnnounced: true,
      subTracks: ['OPEN SOFTWARE', 'OPEN HARDWARE'],
    },
  ];

  const filteredProblems =
    activeTab === 'ALL'
      ? problemStatements
      : problemStatements.filter((p) => p.track === activeTab);

  return (
    <section id="problems" className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-white text-xs font-mono-tech uppercase mb-3 shadow-sm">
          <HelpCircle className="w-3.5 h-3.5 text-white" />
          <span>CHALLENGE MATRIX</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          PROBLEM <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">STATEMENTS</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          Official problem statements for Software and Hardware tracks will be announced on the event day by the organizers.
          Open Domain participants enjoy full autonomy to tackle their own chosen challenge across both Software and Hardware.
        </p>
      </div>

      {/* Official Organizers Directive Notice */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/15 mb-10 flex items-start sm:items-center gap-3.5 max-w-4xl mx-auto shadow-sm bg-zinc-950/80">
        <AlertCircle className="w-5 h-5 text-white shrink-0 mt-0.5 sm:mt-0" />
        <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <span className="font-mono-tech text-white font-bold">OFFICIAL DIRECTIVE: </span>
          Track challenges for Software &amp; Hardware will be unlocked during the Opening Protocol.
          In the <strong className="text-white">Open Domain</strong> track, there is <strong className="text-white">NO FIXED PROBLEM STATEMENT</strong> — bring your own innovative concept across{' '}
          <strong className="text-white">Open Software</strong> or <strong className="text-white">Open Hardware</strong>.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
        {(['ALL', 'SOFTWARE', 'HARDWARE', 'OPEN DOMAIN'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === tab
                ? 'bg-white text-black shadow-md'
                : 'bg-zinc-900 text-zinc-300 border border-white/15 hover:bg-zinc-800'
            }`}
          >
            {tab === 'OPEN DOMAIN' ? 'OPEN DOMAIN (SW / HW)' : tab}
          </button>
        ))}
      </div>

      {/* Problem Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProblems.map((prob) => {
          const isOpenDomain = prob.track === 'OPEN DOMAIN';
          return (
            <div
              key={prob.id}
              className={`glass-panel rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group border ${
                isOpenDomain
                  ? 'border-white/40 bg-zinc-900/80 shadow-md'
                  : 'border-white/15 hover:border-white/35 bg-zinc-950/70 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-tech text-xs font-bold text-white px-2.5 py-1 rounded-md bg-zinc-900 border border-white/15">
                    {prob.code}
                  </span>
                  <span
                    className={`font-mono-tech text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                      isOpenDomain
                        ? 'bg-white text-black shadow-sm'
                        : 'bg-zinc-800 text-zinc-300 border border-white/10'
                    }`}
                  >
                    {prob.track}
                  </span>
                </div>

                <h3 className="font-heading font-black text-lg text-white mb-2 group-hover:text-zinc-300 transition-colors leading-snug">
                  {prob.title}
                </h3>

                <p className="text-xs text-zinc-400 mb-4 leading-relaxed line-clamp-3">
                  {prob.description}
                </p>

                {isOpenDomain && prob.subTracks && (
                  <div className="flex items-center gap-2 mb-4">
                    {prob.subTracks.map((st) => (
                      <span
                        key={st}
                        className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-white/15 text-[10px] font-mono-tech text-zinc-300 font-bold"
                      >
                        ✓ {st}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-[11px] text-zinc-500">CATEGORY:</span>
                    <span className="font-mono-tech text-[11px] text-zinc-200 font-bold">{prob.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-[11px] text-zinc-500">RELEASE STATUS:</span>
                    <span className={`font-mono-tech text-[11px] font-bold ${isOpenDomain ? 'text-emerald-400' : 'text-zinc-300'}`}>
                      {isOpenDomain ? 'OPEN & UNLOCKED' : 'AWAITING BRIEF'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
                <button
                  onClick={() => setSelectedProblem(prob)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/15 font-mono-tech text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5 text-white" />
                  <span>VIEW DETAILS</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 bg-zinc-950 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono-tech text-xs font-bold text-white px-2.5 py-0.5 rounded-md bg-zinc-900 border border-white/15">
                  {selectedProblem.code}
                </span>
                <span className="font-mono-tech text-xs text-zinc-400 font-bold uppercase">{selectedProblem.track}</span>
              </div>
              <button
                onClick={() => setSelectedProblem(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-heading font-black text-xl text-white mb-4">
              {selectedProblem.title}
            </h3>

            <div className="space-y-4 text-xs text-zinc-300">
              <div>
                <div className="font-mono-tech text-white font-bold uppercase mb-1">Overview:</div>
                <p className="text-zinc-400 leading-relaxed">{selectedProblem.description}</p>
              </div>

              <div>
                <div className="font-mono-tech text-white font-bold uppercase mb-1">Expected Solution:</div>
                <p className="text-zinc-400 leading-relaxed">{selectedProblem.expectedSolution}</p>
              </div>

              <div>
                <div className="font-mono-tech text-white font-bold uppercase mb-1">Sprint Constraints:</div>
                <p className="text-zinc-400 leading-relaxed">{selectedProblem.constraints}</p>
              </div>

              {selectedProblem.track === 'OPEN DOMAIN' && (
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/15">
                  <div className="font-mono-tech text-xs font-bold text-white mb-1">
                    OPEN DOMAIN DUAL PATH:
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    You can participate as <strong className="text-white">Open Software</strong> (any application, AI model, or distributed system) OR as <strong className="text-white">Open Hardware</strong> (any robotics, embedded board, or smart device).
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/15 flex justify-end">
              <button
                onClick={() => setSelectedProblem(null)}
                className="btn-neon-primary px-6 py-2 rounded-xl text-black font-mono-tech text-xs font-bold uppercase tracking-wider"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
