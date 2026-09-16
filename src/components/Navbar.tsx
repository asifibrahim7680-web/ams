import React, { useState } from 'react';
import { FrostLogo } from './FrostLogo';
import { Menu, X, Shield, LayoutDashboard, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenParticipantDashboard: () => void;
  onOpenAdminDashboard: () => void;
  onOpenSupabaseGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenParticipantDashboard,
  onOpenAdminDashboard,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Glass Reveal', href: '#glass-reveal' },
    { label: 'Events', href: '#events' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Rules', href: '#rules' },
    { label: 'Evaluation', href: '#evaluation' },
    { label: 'Patrons', href: '#patrons' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Main Glass Navigation Bar */}
      <div className="bg-[#0A0A0C]/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="h-18 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Logo & Category Badges */}
          <div className="flex items-center gap-3">
            <a href="#home" className="flex items-center">
              <FrostLogo size={36} />
            </a>
            <div className="hidden xl:flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/20 text-zinc-200 font-mono-tech font-bold text-[10px] tracking-wider uppercase">
                CRACK THE CODE
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/20 text-zinc-200 font-mono-tech font-bold text-[10px] tracking-wider uppercase">
                HACKATHON
              </span>
              <span className="px-2 py-0.5 rounded bg-white text-black font-mono-tech font-bold text-[10px] tracking-wider uppercase shadow-sm">
                TECHFORGE
              </span>
            </div>
          </div>

          {/* Desktop Nav Links Pill Container */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/90 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Participant Dashboard Quick Link */}
            <button
              onClick={onOpenParticipantDashboard}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 border border-white/20 hover:border-white/40 transition-all shadow-sm"
              title="View Participant Team Portal"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-white" />
              <span>My Team</span>
            </button>

            {/* Admin Dashboard Quick Link */}
            <button
              onClick={onOpenAdminDashboard}
              className="inline-flex items-center justify-center p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-zinc-300 hover:text-white transition-all shadow-sm"
              title="Organizer / Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Primary Neon Register CTA Button */}
            <button
              onClick={onOpenRegister}
              className="px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold text-black bg-sky-400 hover:bg-sky-300 tracking-wider flex items-center gap-1.5 uppercase shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all hover:scale-105"
            >
              <span>REGISTER NOW</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 text-white hover:text-zinc-300 border border-white/20 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A0A0C]/98 border-b border-white/15 px-5 py-5 space-y-3 backdrop-blur-2xl transition-all shadow-2xl">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 text-xs font-semibold text-zinc-200 hover:text-white hover:bg-zinc-800 transition"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full btn-neon-primary py-3 rounded-xl text-center text-xs font-bold text-black flex items-center justify-center gap-2 uppercase shadow-lg"
              >
                <span>REGISTER NOW</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenParticipantDashboard();
                }}
                className="w-full py-3 rounded-xl text-center text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 border border-white/20 flex items-center justify-center gap-2 uppercase transition"
              >
                <LayoutDashboard className="w-4 h-4 text-white" />
                <span>PARTICIPANT DASHBOARD</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminDashboard();
                }}
                className="w-full py-2.5 rounded-xl text-center text-xs font-bold text-zinc-300 bg-zinc-950 border border-white/15 flex items-center justify-center gap-2 transition"
              >
                <Shield className="w-3.5 h-3.5 text-zinc-400" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
