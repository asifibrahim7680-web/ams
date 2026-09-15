import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Filter,
  Eye,
  RefreshCw,
  Users,
  Building,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Team, RegistrationStatus, PaymentStatus } from '../types';
import { fetchAllTeams, updateRegistrationStatus } from '../lib/supabase';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState<'ALL' | 'Software' | 'Hardware' | 'Open Domain'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | RegistrationStatus>('ALL');
  const [selectedTeamDetail, setSelectedTeamDetail] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadTeams();
    }
  }, [isOpen]);

  const loadTeams = async () => {
    setIsLoading(true);
    const data = await fetchAllTeams();
    setTeams(data);
    setIsLoading(false);
  };

  const handleStatusChange = async (team_id: string, newStatus: RegistrationStatus) => {
    await updateRegistrationStatus(team_id, newStatus);
    setTeams((prev) =>
      prev.map((t) => (t.team_id === team_id ? { ...t, registration_status: newStatus } : t))
    );
    if (selectedTeamDetail?.team_id === team_id) {
      setSelectedTeamDetail((prev) => prev ? { ...prev, registration_status: newStatus } : null);
    }
  };

  const handlePaymentToggle = async (team_id: string, currentStatus: PaymentStatus) => {
    const nextStatus: PaymentStatus = currentStatus === 'PAID' ? 'PENDING' : 'PAID';
    const team = teams.find((t) => t.team_id === team_id);
    if (!team) return;
    await updateRegistrationStatus(team_id, team.registration_status, nextStatus);
    setTeams((prev) =>
      prev.map((t) => (t.team_id === team_id ? { ...t, payment_status: nextStatus } : t))
    );
    if (selectedTeamDetail?.team_id === team_id) {
      setSelectedTeamDetail((prev) => prev ? { ...prev, payment_status: nextStatus } : null);
    }
  };

  const exportCSV = () => {
    if (teams.length === 0) return;
    const headers = [
      'Team ID',
      'Team Name',
      'College',
      'Department',
      'Track',
      'Sub Track',
      'Leader Name',
      'Leader Email',
      'Leader Phone',
      'Project Title',
      'Members Count',
      'Status',
      'Payment',
    ];
    const rows = teams.map((t) => [
      t.team_id,
      `"${t.team_name.replace(/"/g, '""')}"`,
      `"${t.college_name.replace(/"/g, '""')}"`,
      `"${t.department.replace(/"/g, '""')}"`,
      t.track,
      t.sub_track || '',
      `"${t.leader_name.replace(/"/g, '""')}"`,
      t.leader_email,
      t.leader_phone,
      `"${t.project_title.replace(/"/g, '""')}"`,
      t.members?.length || 0,
      t.registration_status,
      t.payment_status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `frost_hacks_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  const filteredTeams = teams.filter((t) => {
    const matchesTrack = trackFilter === 'ALL' || t.track === trackFilter;
    const matchesStatus = statusFilter === 'ALL' || t.registration_status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      t.team_name.toLowerCase().includes(q) ||
      t.team_id.toLowerCase().includes(q) ||
      t.college_name.toLowerCase().includes(q) ||
      t.leader_name.toLowerCase().includes(q);

    return matchesTrack && matchesStatus && matchesQuery;
  });

  const totalTeams = teams.length;
  const totalParticipants = teams.reduce((acc, t) => acc + (t.members?.length || 0), 0);
  const totalColleges = new Set(teams.map((t) => t.college_name)).size;
  const softwareTeams = teams.filter((t) => t.track === 'Software').length;
  const hardwareTeams = teams.filter((t) => t.track === 'Hardware').length;
  const openDomainTeams = teams.filter((t) => t.track === 'Open Domain').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl glass-panel rounded-3xl shadow-2xl border border-white/25 text-left my-6 overflow-hidden flex flex-col max-h-[90vh] bg-zinc-950 text-white">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/15 flex items-center justify-center text-white">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-lg text-white">
                  Organizer Admin Console
                </h3>
                <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 border border-white/20 text-white font-bold">
                  VERIFIED ACCESS
                </span>
              </div>
              <p className="font-mono-tech text-xs text-zinc-400">
                Real-time cohort management, slot confirmation, and dataset exports
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadTeams}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              title="Refresh roster"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-white' : ''}`} />
            </button>
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white font-mono-tech text-xs font-bold transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 6 Key Analytics Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 p-4 bg-zinc-900/50 border-b border-white/10">
          <div className="p-3 rounded-xl bg-zinc-900 border border-white/15 text-center shadow-sm">
            <span className="font-heading font-black text-2xl text-white block">
              {totalTeams}
            </span>
            <span className="font-mono-tech text-[10px] text-zinc-400 font-bold uppercase">TOTAL TEAMS</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900 border border-white/15 text-center shadow-sm">
            <span className="font-heading font-black text-2xl text-white block">
              {totalParticipants}
            </span>
            <span className="font-mono-tech text-[10px] text-zinc-400 font-bold uppercase">PARTICIPANTS</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900 border border-white/15 text-center shadow-sm">
            <span className="font-heading font-black text-2xl text-white block">
              {totalColleges}
            </span>
            <span className="font-mono-tech text-[10px] text-zinc-400 font-bold uppercase">COLLEGES</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900 border border-white/15 text-center shadow-sm">
            <span className="font-heading font-black text-2xl text-white block">
              {softwareTeams}
            </span>
            <span className="font-mono-tech text-[10px] text-zinc-400 font-bold uppercase">SOFTWARE</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900 border border-white/15 text-center shadow-sm">
            <span className="font-heading font-black text-2xl text-white block">
              {hardwareTeams}
            </span>
            <span className="font-mono-tech text-[10px] text-zinc-400 font-bold uppercase">HARDWARE</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900 border border-white/15 text-center shadow-sm">
            <span className="font-heading font-black text-2xl text-white block">
              {openDomainTeams}
            </span>
            <span className="font-mono-tech text-[10px] text-zinc-400 font-bold uppercase">OPEN DOMAIN</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 bg-zinc-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by team, ID, leader, or college..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-zinc-900 border border-white/20 text-white text-xs font-mono-tech placeholder-zinc-500 focus:outline-none focus:border-white shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Track Filter */}
            <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/15 text-[11px] font-mono-tech shadow-sm">
              <span className="text-zinc-400 px-1.5 font-bold">Track:</span>
              {(['ALL', 'Software', 'Hardware', 'Open Domain'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTrackFilter(t)}
                  className={`px-2 py-0.5 rounded-lg font-bold transition ${
                    trackFilter === t
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t === 'Open Domain' ? 'Open' : t}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/15 text-[11px] font-mono-tech shadow-sm">
              <span className="text-zinc-400 px-1.5 font-bold">Status:</span>
              {(['ALL', 'PENDING', 'VERIFIED', 'REJECTED'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2 py-0.5 rounded-lg font-bold transition ${
                    statusFilter === s
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto flex-1 p-4">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="border-b border-white/10 font-mono-tech text-[11px] text-zinc-400 uppercase">
                <th className="pb-3 pr-4">Team ID &amp; Name</th>
                <th className="pb-3 pr-4">Track</th>
                <th className="pb-3 pr-4">College</th>
                <th className="pb-3 pr-4">Leader</th>
                <th className="pb-3 pr-4">Members</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Fee Payment</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredTeams.map((team) => (
                <tr key={team.team_id} className="hover:bg-zinc-900/60 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="font-mono-tech text-xs font-bold text-white">
                      {team.team_id}
                    </div>
                    <div className="font-heading font-black text-white text-sm">
                      {team.team_name}
                    </div>
                  </td>
                  <td className="py-3 pr-4 font-mono-tech text-xs">
                    <span className="text-white font-bold">{team.track}</span>
                    {team.sub_track && (
                      <span className="text-zinc-400 text-[10px] block font-mono-tech">
                        {team.sub_track}
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-xs text-zinc-400 max-w-[150px] truncate" title={team.college_name}>
                    {team.college_name}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="text-xs text-white font-bold">{team.leader_name}</div>
                    <div className="text-[11px] font-mono-tech text-zinc-400">{team.leader_phone}</div>
                  </td>
                  <td className="py-3 pr-4 font-mono-tech text-xs text-white font-bold">
                    {team.members?.length || 0}
                  </td>
                  <td className="py-3 pr-4">
                    <select
                      value={team.registration_status}
                      onChange={(e) =>
                        handleStatusChange(team.team_id, e.target.value as RegistrationStatus)
                      }
                      className={`px-2 py-1 rounded-lg font-mono-tech text-[11px] font-bold border focus:outline-none shadow-sm ${
                        team.registration_status === 'VERIFIED'
                          ? 'bg-zinc-800 border-white/30 text-white'
                          : team.registration_status === 'REJECTED'
                          ? 'bg-red-950/70 border-red-500/40 text-red-300'
                          : 'bg-zinc-800/80 border-white/20 text-zinc-300'
                      }`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="VERIFIED">VERIFIED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </td>
                  <td className="py-3 pr-4">
                    <button
                      onClick={() => handlePaymentToggle(team.team_id, team.payment_status)}
                      className={`px-2.5 py-1 rounded-lg font-mono-tech text-[11px] font-bold border transition-colors shadow-sm ${
                        team.payment_status === 'PAID'
                          ? 'bg-zinc-800 border-white/30 text-white'
                          : 'bg-zinc-950 border-white/15 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {team.payment_status === 'PAID' ? 'PAID (₹' + ((team.members?.length || 2) * 200) + ')' : 'UNPAID'}
                    </button>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setSelectedTeamDetail(team)}
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 inline-flex items-center gap-1 font-mono-tech text-[11px] font-bold shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTeams.length === 0 && (
            <div className="text-center py-12 text-zinc-400 font-mono-tech text-xs">
              No registered teams match the current query and filters.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-900 flex items-center justify-between text-xs font-mono-tech text-zinc-400">
          <div>Showing {filteredTeams.length} of {teams.length} Registered Teams</div>
          <button
            onClick={onClose}
            className="btn-neon-outline px-4 py-1.5 rounded-xl font-bold"
          >
            Close Terminal
          </button>
        </div>
      </div>

      {/* Team Inspection Modal */}
      {selectedTeamDetail && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 shadow-2xl border border-white/25 bg-zinc-950 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono-tech text-xs font-bold text-black px-2 py-0.5 rounded-md bg-white">
                  {selectedTeamDetail.team_id}
                </span>
                <span className="font-mono-tech text-xs text-zinc-300 font-bold">
                  {selectedTeamDetail.track}
                </span>
              </div>
              <button
                onClick={() => setSelectedTeamDetail(null)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h4 className="font-heading font-black text-xl text-white mb-1">
              {selectedTeamDetail.team_name}
            </h4>
            <p className="text-xs text-zinc-400 mb-4">
              {selectedTeamDetail.college_name} • {selectedTeamDetail.department}
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/15 shadow-sm">
                <div className="font-mono-tech text-[11px] text-white font-bold mb-1">
                  PROJECT: {selectedTeamDetail.project_title}
                </div>
                <p className="text-zinc-300 leading-relaxed">{selectedTeamDetail.project_description}</p>
              </div>

              <div>
                <div className="font-mono-tech text-[11px] text-zinc-400 font-bold uppercase mb-1.5">
                  Roster Members ({selectedTeamDetail.members?.length || 0}):
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {selectedTeamDetail.members?.map((m, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 flex justify-between items-center shadow-sm"
                    >
                      <div>
                        <span className="font-bold text-white">{m.name}</span>{' '}
                        <span className="font-mono-tech text-zinc-400 text-[10px]">({m.email})</span>
                      </div>
                      <span className="font-mono-tech text-[10px] text-white font-bold">{m.college_id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedTeamDetail(null)}
                className="btn-neon-primary px-5 py-2 rounded-xl text-black bg-white font-mono-tech text-xs font-bold uppercase"
              >
                Done Inspecting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
