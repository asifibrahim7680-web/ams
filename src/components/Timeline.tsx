import React, { useState } from 'react';
import { Calendar, Clock, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/siteData';

export const Timeline: React.FC = () => {
  const [showSchedule, setShowSchedule] = useState(false);

  const eventDaySchedule = [
    { time: '08:30 AM – 09:30 AM', title: 'Reporting & Verification', desc: 'Participant check-in, student ID verification, and workstation allocation.' },
    { time: '09:30 AM – 10:00 AM', title: 'Inauguration & Briefing', desc: 'Opening ceremony, jury introduction, and rules orientation.' },
    { time: '10:00 AM', title: 'Competition Kickoff', desc: 'Sprint begins for Crack the Code, Hackathon, and TechForge.' },
    { time: '01:00 PM – 02:00 PM', title: 'Lunch Break & Mid-Review', desc: 'Lunch and checkpoint audit by technical jury mentors.' },
    { time: '02:00 PM – 05:00 PM', title: 'Final Build & Debugging', desc: 'Final code submissions, hardware testing, and prototype polish.' },
    { time: '05:00 PM – 06:30 PM', title: 'Jury Pitch & Live Demos', desc: 'Evaluation rounds, code audits, and live hardware demonstration.' },
    { time: '06:30 PM – 07:30 PM', title: 'Valedictory & Awards', desc: 'Announcement of winners, distribution of cash prizes and certificates.' },
  ];

  return (
    <section id="timeline" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header matching reference */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 text-xs font-mono uppercase mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>04 / TIMELINE</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          The <span className="text-zinc-400">journey.</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
          Registration dates are confirmed by the organizers — key milestones are outlined below.
        </p>
      </div>

      {/* 5 Milestone Cards (Horizontal on Desktop, Vertical on Mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {TIMELINE_EVENTS.map((evt, idx) => {
          const isConfirmed = evt.state === 'confirmed';
          return (
            <div
              key={evt.key}
              className={`rounded-3xl p-5 border flex flex-col justify-between transition-all duration-300 ${
                isConfirmed
                  ? 'bg-zinc-900 border-white/40 shadow-lg scale-[1.02]'
                  : 'bg-zinc-950/70 border-white/15'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-zinc-400">
                    0{idx + 1}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider font-semibold ${
                      isConfirmed
                        ? 'bg-white text-black font-bold'
                        : 'bg-zinc-900 border border-white/10 text-zinc-400'
                    }`}
                  >
                    {isConfirmed ? 'Confirmed' : 'Pending'}
                  </span>
                </div>

                <div className="font-mono text-lg sm:text-xl font-black text-white mb-1">
                  {evt.date}
                </div>

                <h3 className="font-heading font-bold text-base text-zinc-100 mb-2">
                  {evt.label}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {evt.note}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                {isConfirmed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                )}
                <span>{isConfirmed ? 'Event Confirmed' : 'To Be Announced'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Day Breakdown Toggle */}
      <div className="text-center">
        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-xs font-mono text-zinc-200 hover:text-white transition shadow-sm"
        >
          <Clock className="w-3.5 h-3.5 text-white" />
          <span>{showSchedule ? 'Hide Event Day Schedule' : 'View 01 OCT 2026 Event Day Schedule'}</span>
        </button>
      </div>

      {/* Detailed Event Day Schedule */}
      {showSchedule && (
        <div className="mt-8 rounded-3xl bg-zinc-950 border border-white/15 p-6 sm:p-8 max-w-4xl mx-auto shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs text-zinc-400 uppercase">Event Day Breakdown</span>
              <h3 className="font-heading font-black text-xl text-white mt-0.5">
                01 OCTOBER 2026 • AMS CAMPUS
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-white text-black font-mono text-xs font-bold">
              ONE-DAY SPRINT
            </span>
          </div>

          <div className="space-y-4">
            {eventDaySchedule.map((slot, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-zinc-800 border border-white/10 text-white font-mono text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-white text-sm">
                      {slot.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">{slot.desc}</p>
                  </div>
                </div>
                <div className="font-mono text-xs text-zinc-300 bg-zinc-950 px-3 py-1.5 rounded-xl border border-white/10 whitespace-nowrap self-start sm:self-auto">
                  {slot.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
