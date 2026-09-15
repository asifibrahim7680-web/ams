import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Github,
  Globe,
  Presentation,
  ShieldCheck,
  User,
  Layers,
  Save,
  Check
} from 'lucide-react';
import { Team, RegistrationStatus } from '../types';
import { fetchAllTeams, updateProjectSubmission } from '../lib/supabase';

interface ParticipantDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  activeTeamId?: string | null;
}

export const ParticipantDashboard: React.FC<ParticipantDashboardProps> = ({
  isOpen,
  onClose,
  activeTeamId,
}) => {
  const [searchQuery, setSearchQuery] = useState(activeTeamId || '');
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [githubRepo, setGithubRepo] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [presentationUrl, setPresentationUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadTeams();
    }
  }, [isOpen]);

  const loadTeams = async () => {
    const list = await fetchAllTeams();
    setTeams(list);
    if (activeTeamId) {
      const match = list.find(
        (t) => t.team_id.toLowerCase() === activeTeamId.toLowerCase()
      );
      if (match) {
        setSelectedTeam(match);
        setGithubRepo(match.github_repo || '');
        setDemoUrl(match.demo_url || '');
        setPresentationUrl(match.presentation_url || '');
      }
    } else if (list.length > 0 && !selectedTeam) {
      setSelectedTeam(list[0]);
      setGithubRepo(list[0].github_repo || '');
      setDemoUrl(list[0].demo_url || '');
      setPresentationUrl(list[0].presentation_url || '');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.trim().toLowerCase();
    const found = teams.find(
      (t) =>
        t.team_id.toLowerCase() === q ||
        t.leader_email.toLowerCase() === q ||
        t.team_name.toLowerCase().includes(q)
    );
    if (found) {
      setSelectedTeam(found);
      setGithubRepo(found.github_repo || '');
      setDemoUrl(found.demo_url || '');
      setPresentationUrl(found.presentation_url || '');
    }
  };

  const handleSaveSubmissions = async () => {
    if (!selectedTeam) return;
    await updateProjectSubmission(selectedTeam.team_id, {
      github_repo: githubRepo,
      demo_url: demoUrl,
      presentation_url: presentationUrl,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl shadow-2xl border border-white/25 text-left my-6 overflow-hidden bg-zinc-950 text-white">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/15 flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white">
                Participant Team Portal
              </h3>
              <p className="font-mono-tech text-xs text-zinc-400">
                Track team status, approval credentials, and submit project links
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search / Lookup Bar */}
        <div className="p-4 bg-zinc-900/50 border-b border-white/10">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Team ID (e.g. FRST-2026-9042) or Leader Email..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-900 border border-white/20 text-white text-xs font-mono-tech placeholder-zinc-500 focus:outline-none focus:border-white shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="btn-neon-primary px-4 py-2 rounded-xl text-black bg-white font-mono-tech text-xs font-bold shadow-sm"
            >
              Lookup
            </button>
          </form>

          {/* Quick Select Buttons from loaded teams */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 text-[11px] font-mono-tech">
            <span className="text-zinc-400 shrink-0">Sample Teams:</span>
            {teams.slice(0, 4).map((t) => (
              <button
                key={t.team_id}
                onClick={() => {
                  setSelectedTeam(t);
                  setSearchQuery(t.team_id);
                  setGithubRepo(t.github_repo || '');
                  setDemoUrl(t.demo_url || '');
                  setPresentationUrl(t.presentation_url || '');
                }}
                className={`px-2.5 py-1 rounded-lg border whitespace-nowrap transition-colors ${
                  selectedTeam?.team_id === t.team_id
                    ? 'bg-white border-white text-black font-bold'
                    : 'bg-zinc-900 border-white/15 text-zinc-300 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {t.team_id} ({t.team_name})
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-5 sm:p-7 max-h-[65vh] overflow-y-auto space-y-6">
          {selectedTeam ? (
            <>
              {/* Primary Team Profile Banner */}
              <div className="p-5 rounded-2xl bg-zinc-900 border border-white/20 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono-tech text-xs font-bold text-black px-2.5 py-0.5 rounded-md bg-white border border-white shadow-sm">
                      {selectedTeam.team_id}
                    </span>
                    <span className="font-mono-tech text-xs text-zinc-300 font-bold">
                      {selectedTeam.track} {selectedTeam.sub_track ? `// ${selectedTeam.sub_track}` : ''}
                    </span>
                  </div>
                  <h4 className="font-heading font-black text-2xl text-white">
                    {selectedTeam.team_name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    {selectedTeam.college_name} • {selectedTeam.department}
                  </p>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <div
                    className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-mono-tech text-xs font-bold shadow-sm ${
                      selectedTeam.registration_status === 'VERIFIED'
                        ? 'bg-zinc-800 border-white/30 text-white'
                        : selectedTeam.registration_status === 'REJECTED'
                        ? 'bg-red-950/70 border-red-500/40 text-red-300'
                        : 'bg-zinc-800/80 border-white/20 text-zinc-300'
                    }`}
                  >
                    {selectedTeam.registration_status === 'VERIFIED' && <CheckCircle className="w-4 h-4" />}
                    {selectedTeam.registration_status === 'PENDING' && <Clock className="w-4 h-4" />}
                    {selectedTeam.registration_status === 'REJECTED' && <XCircle className="w-4 h-4" />}
                    <span>STATUS: {selectedTeam.registration_status}</span>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl border border-white/20 bg-zinc-800/80 font-mono-tech text-xs font-bold text-white shadow-sm">
                    FEE: {selectedTeam.payment_status} (₹{selectedTeam.members ? selectedTeam.members.length * 200 : 400})
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/15 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-xs text-white uppercase tracking-wider font-bold">
                    PROJECT MISSION:
                  </span>
                  <span className="font-mono-tech text-xs text-zinc-400">
                    ALLOCATED ID: {selectedTeam.problem_statement_id}
                  </span>
                </div>
                <h5 className="font-heading font-black text-base text-white">
                  {selectedTeam.project_title}
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedTeam.project_description}
                </p>
              </div>

              {/* Member Roster */}
              <div>
                <div className="font-mono-tech text-xs text-white uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>REGISTERED SQUAD MEMBERS ({selectedTeam.members?.length || 0})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedTeam.members?.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-zinc-900 border border-white/15 flex items-start justify-between shadow-sm"
                    >
                      <div>
                        <div className="font-heading font-bold text-sm text-white">
                          {m.name} {idx === 0 && <span className="text-zinc-400 text-[10px] font-mono-tech">(Leader)</span>}
                        </div>
                        <div className="text-xs text-zinc-400 font-mono-tech mt-0.5">{m.email}</div>
                        <div className="text-[11px] text-zinc-300 mt-0.5">
                          ID: <span className="font-mono-tech font-bold text-white">{m.college_id}</span> • {m.department}
                        </div>
                      </div>
                      <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-white/10 font-bold">
                        M#{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submission Portal Card */}
              <div className="p-5 rounded-2xl bg-zinc-900 border border-white/15 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <Github className="w-4 h-4" />
                    <span className="font-mono-tech text-xs font-bold uppercase tracking-wider">
                      PROJECT ARTIFACTS &amp; REPOSITORY LINKS
                    </span>
                  </div>
                  <span className="font-mono-tech text-[10px] text-zinc-400">ONE-DAY SPRINT PORTAL</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="font-mono-tech text-xs text-zinc-400 font-bold block mb-1">
                      Public GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={githubRepo}
                      onChange={(e) => setGithubRepo(e.target.value)}
                      placeholder="https://github.com/username/frost-project"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/15 text-white font-mono-tech text-xs placeholder-zinc-500 focus:outline-none focus:border-white shadow-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono-tech text-xs text-zinc-400 font-bold block mb-1">
                        Live Demo URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={demoUrl}
                        onChange={(e) => setDemoUrl(e.target.value)}
                        placeholder="https://my-app.vercel.app"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/15 text-white font-mono-tech text-xs placeholder-zinc-500 focus:outline-none focus:border-white shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="font-mono-tech text-xs text-zinc-400 font-bold block mb-1">
                        Presentation Slide Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={presentationUrl}
                        onChange={(e) => setPresentationUrl(e.target.value)}
                        placeholder="https://docs.google.com/presentation/..."
                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/15 text-white font-mono-tech text-xs placeholder-zinc-500 focus:outline-none focus:border-white shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-zinc-400">
                    Commit early and regularly throughout the hackathon.
                  </span>
                  <button
                    onClick={handleSaveSubmissions}
                    className="btn-neon-primary px-4 py-2 rounded-xl text-black bg-white font-mono-tech text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    {saveSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5 text-black" />}
                    <span>{saveSuccess ? 'Saved Submission!' : 'Save Submission Links'}</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-zinc-400">
              <Search className="w-10 h-10 mx-auto mb-2 text-zinc-600" />
              <p className="font-mono-tech text-sm">No team selected. Enter your Team ID above to inspect.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-900 flex justify-end">
          <button
            onClick={onClose}
            className="btn-neon-outline px-5 py-2 rounded-xl text-xs font-mono-tech font-bold"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
