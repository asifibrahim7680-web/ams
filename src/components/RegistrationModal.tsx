import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Plus,
  Trash2,
  AlertCircle,
  Sparkles,
  Shield,
  Layers,
  Code2,
  Cpu,
  Globe,
  FileText,
  UserCheck
} from 'lucide-react';
import { TrackType, OpenSubType, Team, TeamMember } from '../types';
import { registerNewTeam } from '../lib/supabase';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTrack?: TrackType;
  onRegistrationSuccess: (team: Team) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  preselectedTrack = 'Software',
  onRegistrationSuccess,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createdTeam, setCreatedTeam] = useState<Team | null>(null);

  // Form State
  const [teamName, setTeamName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [department, setDepartment] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('');

  // Track State
  const [track, setTrack] = useState<TrackType>(preselectedTrack);
  const [subTrack, setSubTrack] = useState<OpenSubType>('Open Software');

  // Project State
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [problemStatementId, setProblemStatementId] = useState(
    preselectedTrack === 'Software' ? 'PS-SOFT-01' : preselectedTrack === 'Hardware' ? 'PS-HARD-01' : 'OPEN-DOMAIN-CUSTOM'
  );

  // Team Members State (2 to 5 members: leader is first member)
  const [members, setMembers] = useState<TeamMember[]>([
    { name: '', email: '', department: '', college_id: '' }, // Leader
    { name: '', email: '', department: '', college_id: '' }, // Member 2
  ]);

  const [agreementChecked, setAgreementChecked] = useState(false);

  if (!isOpen) return null;

  const syncLeaderToFirstMember = () => {
    const updated = [...members];
    updated[0] = {
      ...updated[0],
      name: leaderName,
      email: leaderEmail,
      department: department,
    };
    setMembers(updated);
  };

  const handleAddMember = () => {
    if (members.length >= 5) return;
    setMembers([...members, { name: '', email: '', department: '', college_id: '' }]);
  };

  const handleRemoveMember = (index: number) => {
    if (members.length <= 2) return;
    if (index === 0) return; // Cannot remove team leader
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const handleNext = () => {
    setErrorMessage(null);

    if (step === 1) {
      if (!teamName.trim() || !collegeName.trim() || !department.trim() || !leaderName.trim() || !leaderEmail.trim() || !leaderPhone.trim()) {
        setErrorMessage('All fields in Team Information are required.');
        return;
      }
      if (!leaderEmail.includes('@') || !leaderEmail.includes('.')) {
        setErrorMessage('Please provide a valid leader email address.');
        return;
      }
      syncLeaderToFirstMember();
    }

    if (step === 2) {
      if (track === 'Software' && !problemStatementId) setProblemStatementId('PS-SOFT-01');
      if (track === 'Hardware' && !problemStatementId) setProblemStatementId('PS-HARD-01');
      if (track === 'Open Domain') setProblemStatementId('OPEN-DOMAIN-CUSTOM');
    }

    if (step === 3) {
      if (!projectTitle.trim() || !projectDescription.trim()) {
        setErrorMessage('Please provide both Project Title and Project Description.');
        return;
      }
    }

    if (step === 4) {
      for (let i = 0; i < members.length; i++) {
        const m = members[i];
        if (!m.name.trim() || !m.email.trim() || !m.college_id.trim()) {
          setErrorMessage(`Please complete all details for Member #${i + 1} (including College ID).`);
          return;
        }
      }
    }

    setStep(step + 1);
  };

  const handleBack = () => {
    setErrorMessage(null);
    setStep(Math.max(1, step - 1));
  };

  const handleSubmitRegistration = async () => {
    if (!agreementChecked) {
      setErrorMessage('Please agree to the official hackathon rules and accuracy declaration.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const generatedTeamId = `FRST-2026-${randomCode}`;

      const newTeamPayload = {
        team_id: generatedTeamId,
        team_name: teamName.trim(),
        college_name: collegeName.trim(),
        department: department.trim(),
        leader_name: leaderName.trim(),
        leader_email: leaderEmail.trim(),
        leader_phone: leaderPhone.trim(),
        track: track,
        sub_track: track === 'Open Domain' ? subTrack : '',
        project_title: projectTitle.trim(),
        project_description: projectDescription.trim(),
        problem_statement_id: problemStatementId,
        members: members,
        registration_status: 'PENDING' as const,
        payment_status: 'PENDING' as const,
      };

      const savedTeam = await registerNewTeam(newTeamPayload);

      try {
        confetti({
          particleCount: 110,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFFFFF', '#A1A1AA', '#71717A', '#18181B'],
        });
      } catch {
        // ignore in restricted iframe
      }

      setCreatedTeam(savedTeam);
      onRegistrationSuccess(savedTeam);
    } catch (err: any) {
      console.error('Registration error:', err);
      setErrorMessage('Failed to complete registration. Please check your inputs and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalFee = members.length * 200;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl shadow-2xl border border-white/25 text-left my-6 overflow-hidden bg-zinc-950 text-white">
        {/* Header Ribbon */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/15 flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white">
                FROST Hacks Registration Portal
              </h3>
              <p className="font-mono-tech text-xs text-zinc-400">
                Step {step} of 5 • One-Day National Hackathon
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

        {/* Step Progress Tracker */}
        {!createdTeam && (
          <div className="px-6 pt-4 pb-3 bg-zinc-900/50 border-b border-white/10">
            <div className="grid grid-cols-5 gap-2 text-center">
              {[
                { num: 1, label: 'Team Info' },
                { num: 2, label: 'Track' },
                { num: 3, label: 'Project' },
                { num: 4, label: 'Members' },
                { num: 5, label: 'Review' },
              ].map((s) => (
                <div key={s.num} className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono-tech text-xs font-bold transition-all ${
                      step === s.num
                        ? 'bg-white text-black shadow-md'
                        : step > s.num
                        ? 'bg-zinc-700 text-white'
                        : 'bg-zinc-800 text-zinc-400 border border-white/10'
                    }`}
                  >
                    {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <span
                    className={`text-[10px] font-mono-tech mt-1 hidden sm:block ${
                      step === s.num ? 'text-white font-bold' : 'text-zinc-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[65vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 mb-5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* SUCCESS SCREEN */}
          {createdTeam ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border-2 border-white text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h4 className="font-heading font-black text-2xl text-white">
                Registration Received!
              </h4>

              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Congratulations! Your team <strong>{createdTeam.team_name}</strong> has been registered for{' '}
                <strong>FROST Hacks</strong>.
              </p>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/15 max-w-sm mx-auto text-left space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono-tech text-zinc-400">TEAM ID:</span>
                  <span className="font-mono-tech font-bold text-base text-white">
                    {createdTeam.team_id}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono-tech text-zinc-400">TRACK:</span>
                  <span className="font-mono-tech font-bold text-white">{createdTeam.track}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono-tech text-zinc-400">TOTAL MEMBERS:</span>
                  <span className="font-mono-tech font-bold text-white">{createdTeam.members.length} Members</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-white/10">
                  <span className="font-mono-tech text-zinc-400">FEE AMOUNT:</span>
                  <span className="font-mono-tech font-bold text-white">₹{createdTeam.members.length * 200} (₹200/head)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 max-w-md mx-auto text-xs text-zinc-400">
                Use your <strong>Team ID ({createdTeam.team_id})</strong> to log into the <strong>Participant Dashboard</strong> anytime to view badge status, mentor reviews, and submission links.
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={onClose}
                  className="btn-neon-primary px-8 py-3 rounded-xl font-mono-tech text-xs font-bold uppercase tracking-wider text-black bg-white"
                >
                  RETURN TO HOME
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: TEAM INFORMATION */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-2 mb-4">
                    <h4 className="font-heading font-black text-lg text-white">
                      Team &amp; Institutional Credentials
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Enter your official team name and leader contact details.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="font-mono-tech text-[11px] text-zinc-400 font-bold block mb-1">
                        Team Name *
                      </label>
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. Silicon Mavericks"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-white text-xs font-sans shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="font-mono-tech text-[11px] text-zinc-400 font-bold block mb-1">
                        College / Institution *
                      </label>
                      <input
                        type="text"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        placeholder="e.g. College of Engg & Tech"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-white text-xs font-sans shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono-tech text-[11px] text-zinc-400 font-bold block mb-1">
                      Department / Branch *
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Computer Science & Engineering / Electronics"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-white text-xs font-sans shadow-sm"
                    />
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <div className="font-mono-tech text-xs text-white font-bold uppercase mb-3 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4" />
                      <span>TEAM LEADER PARTICIPANT DETAILS</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="font-mono-tech text-[11px] text-zinc-400 font-bold block mb-1">
                          Leader Full Name *
                        </label>
                        <input
                          type="text"
                          value={leaderName}
                          onChange={(e) => setLeaderName(e.target.value)}
                          placeholder="Leader Name"
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-white text-xs font-sans shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="font-mono-tech text-[11px] text-zinc-400 font-bold block mb-1">
                          Leader Email *
                        </label>
                        <input
                          type="email"
                          value={leaderEmail}
                          onChange={(e) => setLeaderEmail(e.target.value)}
                          placeholder="leader@college.edu"
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-white text-xs font-sans shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="font-mono-tech text-[11px] text-zinc-400 font-bold block mb-1">
                          Leader Mobile / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          value={leaderPhone}
                          onChange={(e) => setLeaderPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-white text-xs font-sans shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: TRACK SELECTION */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-2 mb-4">
                    <h4 className="font-heading font-black text-lg text-white">
                      Select Competition Track
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Choose between Software, Hardware, or Open Domain.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3.5">
                    {/* Software */}
                    <div
                      onClick={() => setTrack('Software')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        track === 'Software'
                          ? 'border-white bg-zinc-900 shadow-md'
                          : 'border-white/15 bg-zinc-950 hover:bg-zinc-900/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Code2 className="w-6 h-6 text-white" />
                          <div>
                            <div className="font-heading font-black text-base text-white">
                              SOFTWARE TRACK
                            </div>
                            <div className="text-xs text-zinc-400">
                              Web apps, mobile solutions, AI models, distributed databases, cloud APIs.
                            </div>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${track === 'Software' ? 'border-white bg-white text-black' : 'border-zinc-600'}`}>
                          {track === 'Software' && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>

                    {/* Hardware */}
                    <div
                      onClick={() => setTrack('Hardware')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        track === 'Hardware'
                          ? 'border-white bg-zinc-900 shadow-md'
                          : 'border-white/15 bg-zinc-950 hover:bg-zinc-900/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Cpu className="w-6 h-6 text-white" />
                          <div>
                            <div className="font-heading font-black text-base text-white">
                              HARDWARE TRACK
                            </div>
                            <div className="text-xs text-zinc-400">
                              Embedded microcontrollers, sensor telemetry, IoT nodes, robotics, circuit hardware.
                            </div>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${track === 'Hardware' ? 'border-white bg-white text-black' : 'border-zinc-600'}`}>
                          {track === 'Hardware' && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>

                    {/* Open Domain */}
                    <div
                      onClick={() => setTrack('Open Domain')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        track === 'Open Domain'
                          ? 'border-white bg-zinc-900 shadow-md'
                          : 'border-white/15 bg-zinc-950 hover:bg-zinc-900/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Globe className="w-6 h-6 text-white" />
                          <div>
                            <div className="font-heading font-black text-base text-white flex items-center gap-2">
                              <span>OPEN DOMAIN TRACK</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-black font-mono-tech font-bold">
                                FLAGSHIP
                              </span>
                            </div>
                            <div className="text-xs text-zinc-400">
                              Open Innovation with NO fixed problem statement. Explicitly supports BOTH Software &amp; Hardware.
                            </div>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${track === 'Open Domain' ? 'border-white bg-white text-black' : 'border-zinc-600'}`}>
                          {track === 'Open Domain' && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      {track === 'Open Domain' && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <label className="font-mono-tech text-[11px] text-zinc-400 font-bold block mb-2">
                            Select Open Domain Path:
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {(['Open Software', 'Open Hardware'] as OpenSubType[]).map((st) => (
                              <button
                                type="button"
                                key={st}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSubTrack(st);
                                }}
                                className={`py-2 px-3 rounded-xl text-xs font-mono-tech font-bold border transition ${
                                  subTrack === st
                                    ? 'bg-white text-black border-white'
                                    : 'bg-zinc-900 text-zinc-300 border-white/10 hover:bg-zinc-800'
                                }`}
                              >
                                {st === 'Open Software' ? '⚡ Open Software' : '🛠️ Open Hardware'}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PROJECT OVERVIEW */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-2 mb-4">
                    <h4 className="font-heading font-black text-lg text-white">
                      Proposed Project Concept
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Briefly describe the prototype or solution your team plans to construct.
                    </p>
                  </div>

                  <div>
                    <label className="font-mono-tech text-[11px] text-zinc-400 font-bold block mb-1">
                      Project Title / Concept Name *
                    </label>
                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      placeholder="e.g. Autonomous Campus Drone Telemetry Node"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-white text-xs font-sans shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="font-mono-tech text-[11px] text-zinc-400 font-bold block mb-1">
                      Project Description &amp; Architecture Outline *
                    </label>
                    <textarea
                      rows={4}
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Describe what problem you are solving, expected components/frameworks, and your planned demo."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-white text-xs font-sans resize-none shadow-sm"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-400">
                    Note: Official challenges for Software &amp; Hardware will be released on event day. You may adapt or refine this project overview during the opening ideation sprint.
                  </div>
                </div>
              )}

              {/* STEP 4: TEAM MEMBERS (2 to 5) */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
                    <div>
                      <h4 className="font-heading font-black text-lg text-white">
                        Squad Members (2 to 5)
                      </h4>
                      <p className="text-xs text-zinc-400">
                        Current squad size: {members.length} members (₹{totalFee} total fee).
                      </p>
                    </div>
                    {members.length < 5 && (
                      <button
                        type="button"
                        onClick={handleAddMember}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 text-xs font-mono-tech font-bold flex items-center gap-1.5 transition shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Member</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    {members.map((member, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-zinc-900 border border-white/15 shadow-sm relative"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono-tech text-xs font-bold text-white">
                            {idx === 0 ? 'MEMBER #1 (TEAM LEADER)' : `MEMBER #${idx + 1}`}
                          </span>
                          {idx > 0 && members.length > 2 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveMember(idx)}
                              className="text-zinc-400 hover:text-white p-1"
                              title="Remove member"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                            placeholder="Full Name *"
                            className="px-3 py-2 rounded-xl bg-zinc-950 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                          />
                          <input
                            type="email"
                            value={member.email}
                            onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                            placeholder="Email Address *"
                            className="px-3 py-2 rounded-xl bg-zinc-950 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                          />
                          <input
                            type="text"
                            value={member.college_id}
                            onChange={(e) => handleMemberChange(idx, 'college_id', e.target.value)}
                            placeholder="College ID / Roll No *"
                            className="px-3 py-2 rounded-xl bg-zinc-950 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW & CONFIRMATION */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-2 mb-4">
                    <h4 className="font-heading font-black text-lg text-white">
                      Review Team Registration
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Please verify all credentials before submitting your registration.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900 border border-white/15 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="font-mono-tech text-zinc-400">Team Name:</span>
                      <span className="font-bold text-white">{teamName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono-tech text-zinc-400">Institution:</span>
                      <span className="font-bold text-white">{collegeName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono-tech text-zinc-400">Selected Track:</span>
                      <span className="font-bold text-white">{track} {track === 'Open Domain' ? `(${subTrack})` : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono-tech text-zinc-400">Team Leader:</span>
                      <span className="font-bold text-white">{leaderName} ({leaderPhone})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono-tech text-zinc-400">Squad Count:</span>
                      <span className="font-bold text-white">{members.length} Members</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/10 text-sm">
                      <span className="font-mono-tech font-bold text-zinc-400">Registration Fee:</span>
                      <span className="font-mono-tech font-black text-white">₹{totalFee} (₹200 / head)</span>
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900 border border-white/15 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreementChecked}
                      onChange={(e) => setAgreementChecked(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-black bg-zinc-800 border-white/20 focus:ring-white"
                    />
                    <span className="text-xs text-zinc-300 leading-relaxed">
                      I declare that all members are bona fide college students, and our team agrees to adhere to FROST Hacks hackathon rules, academic honesty, and code of conduct.
                    </span>
                  </label>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!createdTeam && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-zinc-900 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="btn-neon-outline px-4 py-2.5 rounded-xl text-xs font-mono-tech font-bold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-neon-primary px-6 py-2.5 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider text-black bg-white flex items-center gap-2 shadow-md"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitRegistration}
                className="btn-neon-primary px-8 py-3 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider text-black bg-white flex items-center gap-2 shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Registering Squad...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>CONFIRM &amp; REGISTER (₹{totalFee})</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
