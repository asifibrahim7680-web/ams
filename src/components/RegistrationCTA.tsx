import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Users } from 'lucide-react';

interface RegistrationCTAProps {
  onOpenRegister: () => void;
}

export const RegistrationCTA: React.FC<RegistrationCTAProps> = ({ onOpenRegister }) => {
  return (
    <section className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel rounded-3xl p-8 sm:p-14 border border-white/20 relative overflow-hidden shadow-2xl bg-zinc-950 text-center max-w-5xl mx-auto">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/20 text-xs font-mono font-bold text-zinc-300 uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>AMSFROST 2026 • REGISTRATION</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight mb-4">
            Ready to <span className="text-zinc-400">compete?</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8">
            Choose your challenge: Crack the Code, Hackathon, or TechForge. Register your team today for Chennai's premier inter-college tech challenge.
          </p>

          {/* Quick Perks Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-left">
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 flex items-center gap-2.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-white shrink-0" />
              <span className="text-xs font-mono text-zinc-200">3 Competitions</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 flex items-center gap-2.5 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-white shrink-0" />
              <span className="text-xs font-mono text-zinc-200">Free Food &amp; Kit</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 flex items-center gap-2.5 shadow-sm">
              <Users className="w-4 h-4 text-white shrink-0" />
              <span className="text-xs font-mono text-zinc-200">Inter-College</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 flex items-center gap-2.5 shadow-sm">
              <Flame className="w-4 h-4 text-white shrink-0" />
              <span className="text-xs font-mono text-zinc-200">From ₹100/head</span>
            </div>
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenRegister}
            className="btn-neon-primary px-8 sm:px-12 py-4 rounded-2xl font-bold text-sm sm:text-base text-black inline-flex items-center gap-2.5 uppercase tracking-wider shadow-xl hover:scale-105 transition-all"
          >
            <span>REGISTER FOR AMSFROST 2026</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="mt-4 text-xs font-mono text-zinc-500">
            01 October 2026 • Aalim Muhammed Salegh College of Engineering, Chennai
          </p>
        </div>
      </div>
    </section>
  );
};
