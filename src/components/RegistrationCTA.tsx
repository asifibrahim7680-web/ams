import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Users } from 'lucide-react';

interface RegistrationCTAProps {
  onOpenRegister: () => void;
}

export const RegistrationCTA: React.FC<RegistrationCTAProps> = ({ onOpenRegister }) => {
  return (
    <section className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel rounded-3xl p-8 sm:p-14 border border-white/30 relative overflow-hidden shadow-2xl bg-zinc-950 text-center max-w-5xl mx-auto">
        {/* Decorative background glows */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-xs font-mono-tech font-bold text-white uppercase mb-4 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-white" />
            <span>LIMITED PARTICIPANT SEATS &amp; HARDWARE BENCHES</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight mb-4">
            READY TO BUILD AT <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">FROST HACKS?</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8">
            Assemble your dream team of 2 to 4 builders, choose Software, Hardware, or Open Domain, and claim your spot at the biggest 12-hour collegiate hackathon of the year.
          </p>

          {/* Quick Perks Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-left">
            <div className="p-3 rounded-xl bg-zinc-900 border border-white/15 flex items-center gap-2.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-white shrink-0" />
              <span className="text-xs font-bold text-zinc-200">₹25,000 Cash Pool</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900 border border-white/15 flex items-center gap-2.5 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-white shrink-0" />
              <span className="text-xs font-bold text-zinc-200">Free Food &amp; Snacks</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900 border border-white/15 flex items-center gap-2.5 shadow-sm">
              <Users className="w-4 h-4 text-white shrink-0" />
              <span className="text-xs font-bold text-zinc-200">2 – 4 Members</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900 border border-white/15 flex items-center gap-2.5 shadow-sm">
              <Flame className="w-4 h-4 text-white shrink-0" />
              <span className="text-xs font-bold text-zinc-200">₹200 / Head</span>
            </div>
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenRegister}
            className="btn-neon-primary px-8 sm:px-12 py-4 sm:py-4.5 rounded-2xl font-bold text-sm sm:text-base text-black inline-flex items-center gap-2.5 uppercase tracking-wider shadow-xl hover:scale-105 transition-all"
          >
            <span>REGISTER YOUR SQUAD NOW</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="mt-4 text-xs font-mono-tech text-zinc-500">
            * Online payment via UPI / Netbanking. Instant team confirmation code generated.
          </p>
        </div>
      </div>
    </section>
  );
};
