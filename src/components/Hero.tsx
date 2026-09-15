import React, { useState, useEffect } from 'react';
import { Sparkles, Crown, Award, Calendar, Clock, Code2, Cpu, Globe, ArrowRight, ChevronDown, CheckCircle, Trophy, Users, IndianRupee } from 'lucide-react';
import { Eclipse } from './ui/Eclipse';

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  // Live Countdown Timer (Configurable target date)
  const targetDate = new Date('2026-10-15T08:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: '24',
    hours: '12',
    minutes: '45',
    seconds: '30',
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
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 sm:pt-40 pb-16 px-3 sm:px-6 lg:px-8 overflow-hidden cyber-grid">
      {/* React Bits Eclipse Background - Turbulent Spectral Corona */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 flex items-center justify-center overflow-hidden">
        <Eclipse
          speed={0.8}
          radius={0.34}
          edgeSoftness={0.5}
          reach={0.85}
          turbulence={1.1}
          streaks={1.2}
          brightness={1.4}
          colorCycle={0.35}
          colors={['#FFFFFF', '#E4E4E7', '#A1A1AA', '#52525B']}
          coreColor="#050505"
          backgroundColor="transparent"
          cursorInteraction={true}
          cursorStrength={1.2}
          className="w-full h-full"
        />
      </div>

      {/* Ambient Monochrome Glow Blobs */}
      <div className="glow-blob-purple top-10 left-1/4"></div>
      <div className="glow-blob-blue bottom-10 right-1/4"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* College & Department Accreditations Banner */}
        <div className="flex flex-col items-center gap-1 mb-5 px-2">
          <span className="font-heading font-bold text-white text-lg sm:text-2xl md:text-3xl leading-tight text-center">
            College of Engineering & Technology
          </span>
          <span className="font-heading font-semibold text-zinc-400 text-xs sm:text-base md:text-lg">
            (Autonomous) • Approved by AICTE • NAAC 'A' Grade
          </span>
          <span className="font-heading font-medium text-zinc-400 text-xs sm:text-sm md:text-base leading-tight text-center">
            • Department of Computer Science & Robotics • Student Innovation Council •
          </span>
        </div>

        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/20 text-white font-mono-tech text-[10px] sm:text-xs tracking-widest uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>NATIONAL-LEVEL ONE-DAY MEGA TECH HACKATHON</span>
        </div>

        {/* Main Display Title */}
        <h1 className="font-heading font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase drop-shadow-sm break-words max-w-full">
          <span className="text-gradient-neon">FROST</span>{' '}
          <span className="text-gradient-cyan">HACKS</span>
        </h1>

        {/* Subheading */}
        <div className="mt-3 flex items-center justify-center gap-3 text-xs sm:text-xl md:text-2xl font-bold tracking-wider text-zinc-300 uppercase">
          <span className="h-[2px] w-4 sm:w-12 bg-white/30 rounded"></span>
          <span>12-HOUR NON-STOP INNOVATION</span>
          <span className="h-[2px] w-4 sm:w-12 bg-white/30 rounded"></span>
        </div>

        {/* Tagline */}
        <p className="mt-2 text-xs sm:text-base md:text-lg font-mono-tech text-zinc-400 font-semibold tracking-wide">
          Build. Innovate. Solve. Create.
        </p>

        {/* Sponsors Showcase Banner (Title Sponsor & Partners from Reference) */}
        <div className="mt-6 mb-3 w-full max-w-3xl flex flex-col items-center gap-3 bg-zinc-900/80 border border-white/15 p-4 sm:p-5 rounded-2xl shadow-md backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
            {/* Title Sponsor */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] sm:text-xs font-mono-tech font-bold text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-white" />
                FEATURED SPONSORS
              </span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-zinc-800 border border-white/20 text-white font-black text-xs tracking-wider shadow-sm">
                  BRITANNIA®
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white text-black font-black text-xs tracking-wider shadow-sm">
                  MAJESTRONICZ
                </span>
              </div>
            </div>

            {/* Separator Line */}
            <div className="hidden sm:block h-10 w-[1px] bg-white/15"></div>

            {/* Co-Sponsors & Partners */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] sm:text-xs font-mono-tech font-bold text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-white" />
                OFFICIAL PARTNERS
              </span>
              <div className="flex items-center justify-center flex-wrap gap-2">
                <span className="px-2.5 py-1.5 rounded-xl bg-zinc-800 border border-white/15 text-zinc-100 font-extrabold text-xs shadow-sm">
                  NTCS
                </span>
                <span className="px-2.5 py-1.5 rounded-xl bg-black border border-white/25 text-white font-bold text-xs shadow-sm">
                  WYNTRIX
                </span>
                <span className="px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-white/15 text-zinc-200 font-bold text-xs shadow-sm">
                  SILICON SYSTEMS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Event Date & Duration Bar */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-6 bg-zinc-900/80 border border-white/15 px-4 sm:px-6 py-2.5 rounded-2xl backdrop-blur-md text-[11px] sm:text-sm text-white shadow-md">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Calendar className="w-4 h-4 text-white" />
            <span className="font-bold text-zinc-300">EVENT DATE:</span>
            <span className="text-white font-extrabold">TO BE ANNOUNCED</span>
          </div>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <div className="flex items-center gap-1.5 text-zinc-300 font-mono-tech font-bold">
            <Clock className="w-4 h-4 text-white" />
            <span>ONE-DAY SPRINT (8:00 AM – 8:00 PM)</span>
          </div>
        </div>

        {/* Track Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/20 text-zinc-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-white" />
            SOFTWARE TRACK
          </span>
          <span className="text-zinc-600 hidden min-[400px]:inline">|</span>
          <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/20 text-zinc-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-white" />
            HARDWARE TRACK
          </span>
          <span className="text-zinc-600 hidden min-[400px]:inline">|</span>
          <span className="px-3 py-1 rounded-full bg-white text-black text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-black" />
            OPEN DOMAIN (SW + HW)
          </span>
        </div>

        {/* Countdown Timer Area */}
        <div className="mt-6 sm:mt-8 w-full max-w-xl">
          <p className="text-[10px] sm:text-xs font-mono-tech text-zinc-400 uppercase tracking-widest mb-2 font-bold">
            HACKATHON COMMENCES IN
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-4 my-2 max-w-full overflow-x-auto py-1">
            {countdownUnits.map((unit, idx) => (
              <div key={unit.label} className="flex items-center">
                <div className="flex flex-col items-center bg-zinc-900/90 border border-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2.5 sm:py-3.5 min-w-[65px] sm:min-w-[95px] shadow-md">
                  <span className="font-mono-tech font-black text-2xl sm:text-4xl text-white tracking-tight">
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
            className="w-full sm:w-auto flex-1 btn-neon-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-xs sm:text-sm text-black flex items-center justify-center gap-2.5 uppercase tracking-wider shadow-xl"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#tracks"
            className="w-full sm:w-auto flex-1 btn-neon-outline px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition"
          >
            <span>EXPLORE TRACKS</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* Form Note */}
        <p className="mt-3 text-[10px] sm:text-xs text-zinc-400 font-medium">
          Multi-track registration with online team dashboard &amp; instant confirmation.
        </p>
      </div>

      {/* Overlapping Stats Matrix Ribbon from Reference */}
      <div className="absolute -bottom-10 left-0 right-0 z-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto hidden lg:block">
        {/* Handled by StatsHighlights below */}
      </div>
    </section>
  );
};

export const StatsHighlights: React.FC = () => {
  const stats = [
    {
      label: 'PRIZE POOL',
      value: '₹25,000',
      subtext: 'Cash Rewards & Perks',
      icon: Trophy,
    },
    {
      label: 'TEAM MEMBERS',
      value: '2 – 5',
      subtext: 'Per Team (Cross-dept allowed)',
      icon: Users,
    },
    {
      label: 'REGISTRATION FEE',
      value: '₹200',
      subtext: 'Per Head Only',
      icon: IndianRupee,
    },
    {
      label: 'COMPETITION TRACKS',
      value: '3 TRACKS',
      subtext: 'Software • Hardware • Open',
      icon: Globe,
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
