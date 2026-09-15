import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, Flag, Flame, Layers, Utensils, Award, Users } from 'lucide-react';

export const Timeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'builds' | 'reviews' | 'refreshments'>('all');

  const stages = [
    {
      stage: 'STAGE 01',
      time: '8:00 AM – 8:45 AM',
      category: 'logistics',
      title: 'Reporting, Kit Distribution & Workbench Sync',
      desc: 'Arrival at the campus tech arena, physical team verification, ID credential badges, Wi-Fi provisioning, and hardware bench allocation.',
      icon: Users,
    },
    {
      stage: 'STAGE 02',
      time: '8:45 AM – 9:15 AM',
      category: 'milestones',
      title: 'Inauguration Ceremony & Rules Briefing',
      desc: 'Welcome addresses by faculty heads, introduction of industry mentors, and briefing on jury evaluation guidelines.',
      icon: Flag,
    },
    {
      stage: 'STAGE 03',
      time: '9:15 AM – 9:30 AM',
      category: 'builds',
      title: 'Problem Statements Release & Sprint Kickoff',
      desc: 'Official unlocking of challenge domains for Software, Hardware, and Open Domain teams. Timer starts ticking!',
      icon: Flame,
      highlight: true,
    },
    {
      stage: 'STAGE 04',
      time: '9:30 AM – 11:00 AM',
      category: 'builds',
      title: 'Ideation, Architecture & Schema Blueprinting',
      desc: 'Component breakdown, circuit pin diagrams, database schema mapping, and initial repository creation.',
      icon: Layers,
    },
    {
      stage: 'STAGE 05',
      time: '11:00 AM – 11:20 AM',
      category: 'refreshments',
      title: 'Mid-Morning Tea & Energy Boost',
      desc: 'Hot tea, coffee, cookies, and quick networking breakout with neighboring teams.',
      icon: Utensils,
    },
    {
      stage: 'STAGE 06',
      time: '11:30 AM – 1:00 PM',
      category: 'reviews',
      title: 'Mentor Round 1: Architecture & Feasibility',
      desc: 'Judges and senior engineers visit individual workbenches to audit system design, sensor selection, and technical feasibility.',
      icon: CheckCircle2,
      milestone: true,
    },
    {
      stage: 'STAGE 07',
      time: '1:00 PM – 2:00 PM',
      category: 'refreshments',
      title: 'Buffet Lunch & High-Energy Refuel',
      desc: 'Wholesome buffet lunch served at the campus dining hall. Brain recharge before the deep-dive afternoon build.',
      icon: Utensils,
    },
    {
      stage: 'STAGE 08',
      time: '2:00 PM – 4:30 PM',
      category: 'builds',
      title: 'Sub-Zero Deep Build Phase',
      desc: 'Core implementation sprint: front-end wiring, backend API microservices, soldering, sensor integration, and firmware debugging.',
      icon: Flame,
      highlight: true,
    },
    {
      stage: 'STAGE 09',
      time: '4:30 PM – 5:30 PM',
      category: 'reviews',
      title: 'Mentor Round 2: Progress & Working Demo Check',
      desc: 'Hands-on review checking working components, code commits, physical circuit testing, and UX polish.',
      icon: CheckCircle2,
      milestone: true,
    },
    {
      stage: 'STAGE 10',
      time: '5:30 PM – 6:00 PM',
      category: 'refreshments',
      title: 'High Tea, Snacks & Midnight Vibe Music',
      desc: 'Evening tea, savory snacks, energizing playlist, and quick minigames to de-stress before the final push.',
      icon: Utensils,
    },
    {
      stage: 'STAGE 11',
      time: '6:00 PM – 7:15 PM',
      category: 'builds',
      title: 'Final Integration & Deployment Lock',
      desc: 'Production deployment, circuit enclosures, live URL staging, edge-case testing, and pitch slide finalization.',
      icon: Layers,
    },
    {
      stage: 'STAGE 12',
      time: '7:15 PM – 7:30 PM',
      category: 'milestones',
      title: 'Hard Code & Prototype Freeze',
      desc: 'Buzzer sounds! All repositories locked, physical prototypes placed on presentation pedestals, submission forms closed.',
      icon: Flag,
      milestone: true,
    },
    {
      stage: 'STAGE 13',
      time: '7:30 PM – 8:30 PM',
      category: 'reviews',
      title: 'Grand Jury Demos & Evaluation',
      desc: 'Top shortlisted teams present live 5-minute pitches followed by 2-minute rigorous jury Q&A and rubric scoring.',
      icon: Award,
      milestone: true,
    },
    {
      stage: 'STAGE 14',
      time: '8:30 PM – 9:00 PM',
      category: 'milestones',
      title: 'Valedictory & ₹25,000 Prize Distribution',
      desc: 'Announcement of track champions, trophy presentations, cash prize distribution, and official closing photos.',
      icon: Award,
      winner: true,
    },
  ];

  const filteredStages = stages.filter((s) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'builds') return s.category === 'builds';
    if (activeTab === 'reviews') return s.category === 'reviews' || s.milestone;
    if (activeTab === 'refreshments') return s.category === 'refreshments';
    return true;
  });

  return (
    <section id="timeline" className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-white text-xs font-mono-tech uppercase mb-3 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-white" />
          <span>EVENT TIMELINE</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          HACKATHON <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">JOURNEY</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          A synchronized 14-stage journey engineered to ensure maximum coding velocity, expert mentorship check-ins, and delicious food breaks.
        </p>

        {/* Category Filter Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'Full Journey (All 14 Stages)' },
            { id: 'builds', label: 'Build Sessions' },
            { id: 'reviews', label: 'Reviews & Milestones' },
            { id: 'refreshments', label: 'Meals & Refreshments' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200 uppercase ${
                activeTab === tab.id
                  ? 'bg-white text-black shadow-md'
                  : 'bg-zinc-900 text-zinc-300 border border-white/15 hover:bg-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alternating Center Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central Vertical Line */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-white via-zinc-400 to-white/20 sm:-translate-x-1/2" />

        <div className="space-y-6 sm:space-y-8">
          {filteredStages.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const IconComp = item.icon;

            return (
              <div
                key={item.stage}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-5 sm:gap-8 group`}
              >
                {/* Center Node Icon */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-zinc-900 border-2 border-white flex items-center justify-center text-white shadow-md z-10 group-hover:scale-110 transition-transform">
                  <IconComp className="w-4 h-4" />
                </div>

                {/* Content Card */}
                <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-6 w-full">
                  <div
                    className={`glass-panel rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:-translate-y-1 ${
                      item.winner
                        ? 'border-2 border-white bg-zinc-900 shadow-xl'
                        : item.highlight
                        ? 'border-white/40 bg-zinc-900/80 shadow-md'
                        : 'border-white/15 hover:border-white/35 bg-zinc-950/70'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-mono-tech text-xs font-bold text-white">
                        {item.stage}
                      </span>
                      <span className="font-mono-tech text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-semibold border border-white/10">
                        {item.time}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-lg text-white mb-1.5 group-hover:text-zinc-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>

                    {item.winner && (
                      <div className="mt-3 pt-2 border-t border-white/15 inline-flex items-center gap-1.5 text-xs font-bold text-zinc-200">
                        <Award className="w-3.5 h-3.5 text-white" />
                        <span>Grand Trophy &amp; Cash Prize Handover</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
