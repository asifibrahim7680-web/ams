import React, { useState } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { GlassRevealShowcase } from './components/GlassRevealShowcase';
import { Tracks } from './components/Tracks';
import { WhyParticipate } from './components/WhyParticipate';
import { ProblemStatements } from './components/ProblemStatements';
import { Timeline } from './components/Timeline';
import { Prizes } from './components/Prizes';
import { ParticipationDetails } from './components/ParticipationDetails';
import { Evaluation } from './components/Evaluation';
import { Rules } from './components/Rules';
import { RegistrationCTA } from './components/RegistrationCTA';
import { Faq } from './components/Faq';
import { Patrons } from './components/Patrons';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { ParticipantDashboard } from './components/ParticipantDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { SupabaseGuideModal } from './components/SupabaseGuideModal';
import { TrackType, Team } from './types';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isParticipantOpen, setIsParticipantOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSupabaseGuideOpen, setIsSupabaseGuideOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackType>('Software');
  const [lastRegisteredTeamId, setLastRegisteredTeamId] = useState<string | null>(null);

  const handleOpenRegister = (track?: TrackType) => {
    if (track) setSelectedTrack(track);
    setIsRegisterOpen(true);
  };

  const handleRegistrationSuccess = (team: Team) => {
    setLastRegisteredTeamId(team.team_id);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Background Interactive Ambient Canvas */}
      <ParticleBackground />

      {/* Top Header Navigation */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        onOpenParticipantDashboard={() => setIsParticipantOpen(true)}
        onOpenAdminDashboard={() => setIsAdminOpen(true)}
        onOpenSupabaseGuide={() => setIsSupabaseGuideOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenRegister={() => handleOpenRegister()} />
        <About />
        <GlassRevealShowcase />
        <Tracks onSelectTrackForRegistration={(t) => handleOpenRegister(t)} />
        <WhyParticipate onOpenRegister={() => handleOpenRegister()} />
        <ProblemStatements
          onSelectProblemForRegistration={(_id, trackName) => {
            const tr = trackName === 'HARDWARE' ? 'Hardware' : trackName === 'OPEN DOMAIN' ? 'Open Domain' : 'Software';
            handleOpenRegister(tr);
          }}
        />
        <Timeline />
        <Prizes onOpenRegister={() => handleOpenRegister()} />
        <ParticipationDetails onOpenRegister={() => handleOpenRegister()} />
        <Evaluation />
        <Rules />
        <RegistrationCTA onOpenRegister={() => handleOpenRegister()} />
        <Faq onOpenRegister={() => handleOpenRegister()} />
        <Patrons />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer
        onOpenRegister={() => handleOpenRegister()}
        onOpenParticipantDashboard={() => setIsParticipantOpen(true)}
        onOpenAdminDashboard={() => setIsAdminOpen(true)}
        onOpenSupabaseGuide={() => setIsSupabaseGuideOpen(true)}
      />

      {/* Interactive Modals */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        preselectedTrack={selectedTrack}
        onRegistrationSuccess={handleRegistrationSuccess}
      />

      <ParticipantDashboard
        isOpen={isParticipantOpen}
        onClose={() => setIsParticipantOpen(false)}
        activeTeamId={lastRegisteredTeamId}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <SupabaseGuideModal
        isOpen={isSupabaseGuideOpen}
        onClose={() => setIsSupabaseGuideOpen(false)}
      />
    </div>
  );
}
