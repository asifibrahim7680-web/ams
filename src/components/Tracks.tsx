import React from 'react';
import { Code2, Cpu, Globe, ArrowRight, FileText, Sparkles, CheckCircle } from 'lucide-react';
import { TrackType } from '../types';

interface TracksProps {
  onSelectTrackForRegistration: (track: TrackType) => void;
}

export const Tracks: React.FC<TracksProps> = ({ onSelectTrackForRegistration }) => {
  const tracksData = [
    {
      id: 'software',
      title: 'SOFTWARE TRACK',
      tagline: 'Code • Build • Solve',
      trackType: 'Software' as TrackType,
      icon: Code2,
      accent: 'from-white to-zinc-500',
      borderGlow: 'hover:border-white/40 shadow-md',
      iconColor: 'text-white',
      description:
        'Build innovative software solutions using modern programming languages, web & mobile applications, Artificial Intelligence, cloud microservices, or data-driven systems solving real-world challenges.',
      eligibleDomains: 'Web Apps, Mobile Apps, Cloud Services, AI/ML, DevOps, FinTech, EdTech',
      examples: 'Intelligent triage dashboards, offline-first health apps, automated financial compliance tools, algorithmic civic helpers',
      technologies: [
        'React / Next.js',
        'Python / FastAPI',
        'TypeScript / Node.js',
        'PostgreSQL / Supabase',
        'PyTorch / Gemini API',
      ],
      problemAnchor: '#problems',
    },
    {
      id: 'hardware',
      title: 'HARDWARE TRACK',
      tagline: 'Design • Innovate • Impact',
      trackType: 'Hardware' as TrackType,
      icon: Cpu,
      accent: 'from-zinc-300 to-zinc-600',
      borderGlow: 'hover:border-white/40 shadow-md',
      iconColor: 'text-white',
      description:
        'Design and prototype physical computing architectures, embedded systems, IoT sensor arrays, microcontrollers, or robotics solving tangible real-world physical and industrial challenges.',
      eligibleDomains: 'IoT & Telemetry, Embedded Systems, Robotics & Automation, Smart Hardware, Wearables',
      examples: 'Autonomous warehouse robots, agricultural soil telemetry nodes, smart grid power optimizers, wearable patient vitals monitors',
      technologies: [
        'ESP32 / Arduino / STM32',
        'Raspberry Pi / Jetson',
        'MQTT / LoRaWAN',
        'C / C++ Embedded',
        'Sensor & Actuator Arrays',
      ],
      problemAnchor: '#problems',
    },
    {
      id: 'open',
      title: 'OPEN DOMAIN TRACK',
      tagline: 'Hybrid • Software + Hardware Innovation',
      trackType: 'Open Domain' as TrackType,
      icon: Globe,
      accent: 'from-white via-zinc-400 to-zinc-700',
      borderGlow: 'border-2 border-white/35 shadow-xl',
      iconColor: 'text-white',
      description:
        'Bring your own visionary idea! Open Domain eliminates restrictive boundaries and explicitly supports BOTH pure Software, pure Hardware, or cutting-edge Hybrid prototypes.',
      eligibleDomains: 'Open Software, Open Hardware, Cross-Disciplinary Cyber-Physical Systems, CleanTech',
      examples: 'AI-guided camera sorting bin, drone delivery telemetry with web dashboard, smart prosthesis with mobile telemetry, green energy analytics',
      technologies: [
        '⚡ Open Software Stacks',
        '🛠️ Open Hardware Assemblies',
        '🤖 Hybrid Cyber-Physical Systems',
        '🌱 Assistive & CleanTech',
        '💡 Unconstrained Innovation',
      ],
      isFlagship: true,
      problemAnchor: '#problems',
    },
  ];

  return (
    <section id="tracks" className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-white text-xs font-mono-tech uppercase mb-3 shadow-sm">
          <Code2 className="w-3.5 h-3.5 text-white" />
          <span>DUAL &amp; OPEN COMPETITION TRACKS</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          CHOOSE YOUR <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">TRACK</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          Whether you excel at code syntax, circuit synthesis, or novel interdisciplinary solutions, FROST Hacks has a dedicated track for your team to build and shine.
        </p>

        {/* Problem Statements Action Link Button */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#problems"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 shadow-md hover:scale-105 group"
          >
            <FileText className="w-4 h-4 text-white group-hover:rotate-6 transition-transform" />
            <span>VIEW PROBLEM STATEMENTS</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>

      {/* 3 Tracks Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {tracksData.map((track) => {
          const IconComp = track.icon;
          return (
            <div
              key={track.id}
              className={`glass-panel rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group border border-white/15 relative overflow-hidden ${track.borderGlow}`}
            >
              {/* Top Accent Gradient Stripe */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${track.accent}`}></div>

              <div>
                {/* Icon & Badge Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    <IconComp className={`w-7 h-7 ${track.iconColor}`} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/15 text-xs font-mono-tech text-zinc-300 font-bold tracking-wider">
                    {track.tagline}
                  </span>
                </div>

                {/* Track Title */}
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
                  {track.title}
                </h3>

                {track.isFlagship && (
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold text-white bg-zinc-800 px-2.5 py-1 rounded-md border border-white/15">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>SUPPORTS BOTH SOFTWARE &amp; HARDWARE</span>
                  </div>
                )}

                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                  {track.description}
                </p>

                {/* Eligible Domains & Examples */}
                <div className="mt-4 space-y-2 pt-3 border-t border-white/10 text-xs">
                  <div>
                    <span className="font-mono-tech text-[11px] font-bold text-zinc-400 uppercase">Eligible Domains: </span>
                    <span className="text-zinc-200">{track.eligibleDomains}</span>
                  </div>
                  <div>
                    <span className="font-mono-tech text-[11px] font-bold text-zinc-400 uppercase">Examples: </span>
                    <span className="text-zinc-400 italic">{track.examples}</span>
                  </div>
                </div>

                {/* Suggested Tech & Focus Areas */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wider mb-2 font-bold">
                    SUGGESTED TECH STACK
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {track.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-zinc-900 border border-white/10 text-zinc-300 text-[11px] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                <button
                  onClick={() => onSelectTrackForRegistration(track.trackType)}
                  className="w-full btn-neon-primary py-3 px-4 rounded-xl font-bold text-xs text-black flex items-center justify-center gap-2 uppercase tracking-wider shadow-md transition-all hover:scale-[1.02]"
                >
                  <span>Register for this Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={track.problemAnchor}
                  className="w-full py-2 px-3 rounded-xl font-bold text-[11px] text-zinc-400 hover:text-white hover:bg-zinc-900 flex items-center justify-center gap-1.5 uppercase tracking-wider transition-all"
                >
                  <FileText className="w-3 h-3 text-white" />
                  <span>Check Track Problems</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
