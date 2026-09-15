import React from 'react';
import { X, CheckCircle, Award, Users, Shield, ArrowRight, IndianRupee } from 'lucide-react';
import { Competition } from '../data/siteData';

interface ChallengeDetailModalProps {
  competition: Competition | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (comp: Competition) => void;
}

export const ChallengeDetailModal: React.FC<ChallengeDetailModalProps> = ({
  competition,
  isOpen,
  onClose,
  onRegister,
}) => {
  if (!isOpen || !competition) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl bg-zinc-950 border border-white/20 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-start justify-between bg-zinc-900/60 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/20 flex items-center justify-center text-white font-mono text-xl font-bold">
              {competition.symbol}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-zinc-400">
                  {competition.index} / CHALLENGE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-white/15 text-[11px] font-mono text-zinc-300">
                  {competition.category}
                </span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
                {competition.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 text-center">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Team Size</div>
              <div className="font-heading font-bold text-white text-sm sm:text-base mt-1">
                {competition.teamSize}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 text-center">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Registration Fee</div>
              <div className="font-heading font-bold text-white text-sm sm:text-base mt-1">
                {competition.fee}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 text-center">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Stages / Rounds</div>
              <div className="font-heading font-bold text-white text-sm sm:text-base mt-1">
                3 Key Rounds
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 text-center">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Eligibility</div>
              <div className="font-heading font-bold text-white text-sm sm:text-base mt-1">
                All Colleges
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
              Overview
            </h3>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
              {competition.description}
            </p>
          </div>

          {/* Procedure / Rounds */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3">
              Competition Procedure
            </h3>
            <div className="space-y-2.5">
              {competition.details.procedure.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-zinc-900/70 border border-white/10 flex items-start gap-3 text-sm text-zinc-200"
                >
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 border border-white/15">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Domains if applicable */}
          {competition.details.suggestedDomains && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2.5">
                Suggested Domains
              </h3>
              <div className="flex flex-wrap gap-2">
                {competition.details.suggestedDomains.map((dom) => (
                  <span
                    key={dom}
                    className="px-3 py-1 rounded-full bg-zinc-900 border border-white/15 text-xs font-mono text-zinc-300"
                  >
                    {dom}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Scoring Weights */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3">
              Evaluation Criteria &amp; Weights
            </h3>
            <div className="space-y-2">
              {competition.scoring.map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-300">{s.label}</span>
                    <span className="text-white font-bold">{s.weight}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${s.weight * 2.5}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-400 mt-2.5 italic">
              {competition.details.evaluationNote}
            </p>
          </div>

          {/* Rules */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3">
              Rules &amp; Regulations
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
              {competition.details.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-white shrink-0">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility & Check-in */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/15">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-2 flex items-center gap-1.5 font-bold">
              <Shield className="w-4 h-4 text-white" />
              Check-in &amp; Eligibility
            </h4>
            <ul className="space-y-1 text-xs text-zinc-300">
              {competition.details.eligibility.map((el, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>{el}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-white/10 bg-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-zinc-400 text-center sm:text-left">
            Fee: <strong className="text-white">{competition.fee}</strong> • 01 OCT 2026
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-white/20 text-xs font-mono text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRegister(competition);
              }}
              className="flex-1 sm:flex-initial btn-neon-primary px-6 py-2.5 rounded-xl text-xs font-bold text-black flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg"
            >
              <span>Register for this challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
