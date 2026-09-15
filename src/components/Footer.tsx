import React from 'react';
import { FrostLogo } from './FrostLogo';
import { Database, Shield, LayoutDashboard, Sparkles, ArrowUp, Crown, Award } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

interface FooterProps {
  onOpenRegister: () => void;
  onOpenParticipantDashboard: () => void;
  onOpenAdminDashboard: () => void;
  onOpenSupabaseGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRegister,
  onOpenParticipantDashboard,
  onOpenAdminDashboard,
  onOpenSupabaseGuide,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black text-white border-t border-white/10 pt-14 pb-12 overflow-hidden">
      {/* Sponsors Showcase Strip at top of footer */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-12 pb-10 border-b border-white/10">
        <div className="text-center mb-6">
          <span className="font-mono-tech text-xs text-zinc-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-white" />
            OFFICIAL TITLE SPONSORS &amp; INDUSTRY PARTNERS
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          <span className="px-4 py-2 rounded-xl bg-white text-black font-black text-sm tracking-wider shadow-md">
            BRITANNIA®
          </span>
          <span className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/20 text-white font-black text-sm tracking-wider shadow-md">
            MAJESTRONICZ
          </span>
          <span className="px-3.5 py-2 rounded-xl bg-zinc-800 text-white font-extrabold text-sm border border-white/10 shadow-md">
            NTCS
          </span>
          <span className="px-3.5 py-2 rounded-xl bg-black border border-white/30 text-white font-bold text-sm shadow-md">
            WYNTRIX INNOVATION
          </span>
          <span className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/15 text-zinc-300 font-bold text-sm shadow-md">
            SILICON SYSTEMS
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <FrostLogo size={40} />
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              FROST Hacks is a national-level, high-octane one-day tech hackathon uniting student coders, hardware architects, and creative problem solvers. Compete across Software, Hardware, and Open Domain tracks for ₹25,000 in total bounties.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono-tech">
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/10 text-zinc-300">
                ONE-DAY TECH MARATHON
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/10 text-white font-bold">
                NATIONAL INTER-COLLEGE
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3">
            <h4 className="font-mono-tech text-xs text-white uppercase tracking-widest font-bold mb-3">
              EXPLORE SECTIONS
            </h4>
            <ul className="space-y-2 text-xs font-mono-tech text-zinc-400">
              <li><a href="#home" className="hover:text-white transition">01. Home &amp; Kickoff</a></li>
              <li><a href="#about" className="hover:text-white transition">02. About &amp; Ecosystem</a></li>
              <li><a href="#tracks" className="hover:text-white transition">03. Dual &amp; Open Tracks</a></li>
              <li><a href="#problems" className="hover:text-white transition">04. Problem Statements</a></li>
              <li><a href="#timeline" className="hover:text-white transition">05. 14-Stage Schedule</a></li>
              <li><a href="#prizes" className="hover:text-white transition">06. ₹25K Prize Pool</a></li>
              <li><a href="#details" className="hover:text-white transition">07. Participation Details</a></li>
              <li><a href="#faq" className="hover:text-white transition">08. Knowledge Base (FAQ)</a></li>
              <li><a href="#contact" className="hover:text-white transition">09. Coordinator Contacts</a></li>
            </ul>
          </div>

          {/* Portals & Architecture */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono-tech text-xs text-white uppercase tracking-widest font-bold mb-3">
              TEAM &amp; ORGANIZER PORTALS
            </h4>
            <div className="space-y-2 text-xs font-mono-tech">
              <button
                onClick={onOpenRegister}
                className="w-full text-left px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white transition flex items-center justify-between border border-white/15"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Register Team (₹200 / Head)</span>
                </div>
                <span className="text-[10px] text-white font-bold">OPEN</span>
              </button>

              <button
                onClick={onOpenParticipantDashboard}
                className="w-full text-left px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white transition flex items-center gap-2 border border-white/15"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-white" />
                <span>My Team Participant Portal</span>
              </button>

              <button
                onClick={onOpenAdminDashboard}
                className="w-full text-left px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white transition flex items-center gap-2 border border-white/15"
              >
                <Shield className="w-3.5 h-3.5 text-white" />
                <span>Organizer Admin Console</span>
              </button>

              <button
                onClick={onOpenSupabaseGuide}
                className="w-full text-left px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white transition flex items-center justify-between border border-white/15"
              >
                <div className="flex items-center gap-2">
                  <Database className={`w-3.5 h-3.5 ${isSupabaseConfigured ? 'text-white' : 'text-zinc-500'}`} />
                  <span>Supabase Database Status</span>
                </div>
                <span className="text-[10px] text-zinc-400">{isSupabaseConfigured ? 'Live' : 'Guide'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-zinc-500">
          <div>
            © {new Date().getFullYear()} FROST Hacks. All rights reserved. National-Level Collegiate Hackathon.
          </div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/15 transition"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};
