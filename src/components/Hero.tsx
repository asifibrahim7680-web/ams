import React, { useState, useEffect } from 'react';
import { Sparkles, Crown, Award, Calendar, Clock, Code2, Cpu, Globe, ArrowRight, ChevronDown, CheckCircle, Trophy, Users, IndianRupee } from 'lucide-react';
import { Eclipse } from './ui/Eclipse';

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  // Live Countdown Timer targeting October 01, 2026 09:00 AM IST
  const targetDate = new Date('2026-10-01T09:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    hasStarted: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
          hasStarted: true,
        });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
        hasStarted: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const countdownUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-32 pb-16 px-3 sm:px-6 lg:px-8 overflow-hidden cyber-grid">
      {/* React Bits Eclipse Background - Turbulent Spectral Corona in Sky Blue */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 flex items-center justify-center overflow-hidden">
        <Eclipse
          speed={0.8}
          radius={0.34}
          edgeSoftness={0.5}
          reach={0.85}
          turbulence={1.1}
          streaks={1.2}
          brightness={1.6}
          colorCycle={0.35}
          colors={['#38BDF8', '#7DD3FC', '#0284C7', '#BAE6FD']}
          coreColor="#050505"
          backgroundColor="transparent"
          cursorInteraction={true}
          cursorStrength={1.2}
          className="w-full h-full"
        />
      </div>

      {/* Ambient Monochrome & Sky Blue Glow Blobs */}
      <div className="glow-blob-purple top-10 left-1/4"></div>
      <div className="glow-blob-blue bottom-10 right-1/4"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* College Accreditation Banner */}
        <div className="flex flex-col items-center gap-1 mb-4 px-2">
          <span className="font-heading font-bold text-white text-base sm:text-xl md:text-2xl leading-tight text-center tracking-wide">
            Aalim Muhammed Salegh College of Engineering, Chennai
          </span>
          <span className="font-mono text-zinc-400 text-xs sm:text-sm tracking-wider uppercase">
            Nizara Educational Campus • Avadi IAF, Chennai - 600055
          </span>
        </div>

        {/* Main Display Title with Sky Blue Year */}
        <h1 className="font-heading font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase drop-shadow-sm break-words max-w-full">
          <span>AMSFROST</span>{' '}
          <span className="text-sky-400 font-mono drop-shadow-[0_0_35px_rgba(56,189,248,0.6)]">2026</span>
        </h1>

        {/* Supporting Tagline */}
        <div className="mt-3 flex items-center justify-center gap-3 text-sm sm:text-2xl md:text-3xl font-bold tracking-wider text-zinc-200 uppercase">
          <span className="h-[2px] w-4 sm:w-12 bg-sky-400/80 rounded shadow-[0_0_8px_rgba(56,189,248,0.5)]"></span>
          <span>Code. Build. <span className="text-sky-400">Innovate.</span></span>
          <span className="h-[2px] w-4 sm:w-12 bg-sky-400/80 rounded shadow-[0_0_8px_rgba(56,189,248,0.5)]"></span>
        </div>

        {/* Date & Location Pill */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-sky-400/30 text-zinc-200 font-mono-tech text-xs sm:text-sm font-semibold tracking-wider shadow-[0_0_15px_rgba(56,189,248,0.15)]">
          <Calendar className="w-4 h-4 text-sky-400" />
          <span>01 OCTOBER 2026 • CHENNAI</span>
        </div>

        {/* Competitions Badge Ribbon */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-zinc-900/90 border border-sky-400/25 text-zinc-200 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 hover:border-sky-400/50 transition-colors">
            <span className="text-sky-400 font-mono">{'{ }'}</span>
            01 · CRACK THE CODE (₹100)
          </span>
          <span className="text-zinc-600 hidden min-[400px]:inline">•</span>
          <span className="px-3.5 py-1 rounded-full bg-zinc-900/90 border border-sky-400/25 text-zinc-200 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 hover:border-sky-400/50 transition-colors">
            <span className="text-sky-400 font-mono">&gt;&gt;_</span>
            02 · HACKATHON (₹200)
          </span>
          <span className="text-zinc-600 hidden min-[400px]:inline">•</span>
          <span className="px-3.5 py-1 rounded-full bg-sky-400 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_20px_rgba(56,189,248,0.4)]">
            <span className="font-mono">◇▱</span>
            03 · TECHFORGE (₹200)
          </span>
        </div>

        {/* 4 Stat Highlights Grid from Reference */}
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
          <div className="bg-zinc-900/90 border border-white/15 hover:border-sky-400/40 rounded-2xl p-3.5 text-center shadow-sm transition-colors">
            <div className="font-heading font-black text-2xl sm:text-3xl text-white">3</div>
            <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Competitions</div>
          </div>
          <div className="bg-zinc-900/90 border border-white/15 hover:border-sky-400/40 rounded-2xl p-3.5 text-center shadow-sm transition-colors">
            <div className="font-heading font-black text-2xl sm:text-3xl text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">100%</div>
            <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Student Driven</div>
          </div>
          <div className="bg-zinc-900/90 border border-white/15 hover:border-sky-400/40 rounded-2xl p-3.5 text-center shadow-sm transition-colors">
            <div className="font-heading font-black text-2xl sm:text-3xl text-white">01</div>
            <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Day</div>
          </div>
          <div className="bg-zinc-900/90 border border-white/15 hover:border-sky-400/40 rounded-2xl p-3.5 text-center shadow-sm transition-colors">
            <div className="font-heading font-black text-2xl sm:text-3xl text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">₹200</div>
            <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Starting Fee</div>
          </div>
        </div>

        {/* Countdown Timer Area */}
        <div className="mt-6 sm:mt-8 w-full max-w-xl">
          <p className="text-[10px] sm:text-xs font-mono-tech text-zinc-400 uppercase tracking-widest mb-2 font-bold">
            EVENT DAY COUNTDOWN (01 OCT 2026)
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-4 my-2 max-w-full overflow-x-auto py-1">
            {countdownUnits.map((unit, idx) => (
              <div key={unit.label} className="flex items-center">
                <div className="flex flex-col items-center bg-zinc-900/90 border border-white/15 hover:border-sky-400/40 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2.5 sm:py-3.5 min-w-[65px] sm:min-w-[95px] shadow-md transition-colors">
                  <span className="font-mono-tech font-black text-2xl sm:text-4xl text-sky-400 tracking-tight drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]">
                    {unit.value}
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-bold tracking-widest text-zinc-400 uppercase mt-0.5">
                    {unit.label}
                  </span>
                </div>
                {idx < countdownUnits.length - 1 && (
                  <span className="text-xl sm:text-3xl font-black text-zinc-600 ml-2 sm:ml-4 select-none">
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md">
          <button
            onClick={onOpenRegister}
            className="w-full sm:w-auto flex-1 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-xs sm:text-sm text-black bg-sky-400 hover:bg-sky-300 flex items-center justify-center gap-2.5 uppercase tracking-wider shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all hover:scale-[1.02]"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#events"
            className="w-full sm:w-auto flex-1 btn-neon-outline px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm text-white hover:border-sky-400/60 hover:text-sky-100 flex items-center justify-center gap-2 transition"
          >
            <span>EXPLORE EVENTS</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* Form Note */}
        <p className="mt-3 text-[10px] sm:text-xs text-zinc-400 font-medium">
          Open to students of all colleges. Student ID required at check-in.
        </p>
      </div>
    </section>
  );
};

export const StatsHighlights: React.FC = () => {
  const stats = [
    {
      label: 'COMPETITIONS',
      value: '3 TRACKS',
      subtext: 'Crack the Code • Hackathon • TechForge',
      icon: Globe,
    },
    {
      label: 'TEAM FORMAT',
      value: '1 – 5 MEMBERS',
      subtext: 'Solo / Duo / Teams per event',
      icon: Users,
    },
    {
      label: 'REGISTRATION FEE',
      value: 'FROM ₹100',
      subtext: '₹100 (Code) • ₹200 (Hack / TechForge)',
      icon: IndianRupee,
    },
    {
      label: 'EVENT DAY',
      value: '01 OCT 2026',
      subtext: 'AMS College of Engineering, Chennai',
      icon: Calendar,
    },
  ];

  return (
    <section className="relative z-20 -mt-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {stats.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden shadow-md border border-white/15"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full pointer-events-none"></div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-xs font-mono-tech font-bold tracking-wider text-zinc-400 uppercase">
                  {stat.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/15 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <IconComp className="w-4 h-4" />
                </div>
              </div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-400 mt-1 font-medium">{stat.subtext}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
