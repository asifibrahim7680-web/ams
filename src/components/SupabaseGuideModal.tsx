import React, { useState } from 'react';
import { Check, Copy, ExternalLink, X, Database, ShieldCheck, Server } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

interface SupabaseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseGuideModal: React.FC<SupabaseGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlSchema = `-- Copy & Paste this into Supabase -> SQL Editor -> New Query -> Run
create extension if not exists "uuid-ossp";

create table if not exists public.teams (
  id uuid default gen_random_uuid() primary key,
  team_id text unique not null,
  team_name text not null,
  college_name text not null,
  department text not null,
  leader_name text not null,
  leader_email text not null,
  leader_phone text not null,
  track text not null check (track in ('Software', 'Hardware', 'Open Domain')),
  sub_track text default '',
  project_title text not null,
  project_description text not null,
  problem_statement_id text default 'PENDING_RELEASE',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.team_members (
  id uuid default gen_random_uuid() primary key,
  team_id text not null references public.teams(team_id) on delete cascade,
  name text not null,
  email text not null,
  department text not null,
  college_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.registrations (
  id uuid default gen_random_uuid() primary key,
  team_id text unique not null references public.teams(team_id) on delete cascade,
  registration_status text default 'PENDING' check (registration_status in ('PENDING', 'VERIFIED', 'REJECTED')),
  payment_status text default 'PENDING' check (payment_status in ('PENDING', 'PAID')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.registrations enable row level security;

create policy "Allow public insert teams" on public.teams for insert with check (true);
create policy "Allow public select teams" on public.teams for select using (true);
create policy "Allow public insert members" on public.team_members for insert with check (true);
create policy "Allow public select members" on public.team_members for select using (true);
create policy "Allow public insert registrations" on public.registrations for insert with check (true);
create policy "Allow public select registrations" on public.registrations for select using (true);
create policy "Allow update registrations" on public.registrations for update using (true);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/25 bg-zinc-950 text-white text-left my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/15 flex items-center justify-center text-white">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white">
                Supabase Integration Guide
              </h3>
              <p className="font-mono-tech text-xs text-zinc-400">
                Step-by-step cloud database provisioning for FROST Hacks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current status pill */}
        <div className="my-4 p-3 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isSupabaseConfigured ? 'bg-white animate-pulse' : 'bg-zinc-500'}`}></span>
            <span className="font-mono-tech text-xs text-white font-bold">
              Status: {isSupabaseConfigured ? 'Connected to live Supabase Cloud Project' : 'Running in Local Persistence Mode (Active & Ready)'}
            </span>
          </div>
          <span className="font-mono-tech text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-white/15 font-bold">
            {isSupabaseConfigured ? 'CLOUD SYNC' : 'OFFLINE HYBRID'}
          </span>
        </div>

        {/* The 4 clear steps */}
        <div className="space-y-3.5 text-xs text-zinc-300 max-h-[60vh] overflow-y-auto pr-1">
          {/* Step 1 */}
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/15 shadow-sm">
            <div className="font-mono-tech text-xs font-bold text-white uppercase tracking-wider mb-1">
              Step 1: WHERE TO CLICK
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              1. Open <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-white font-bold underline inline-flex items-center gap-0.5">supabase.com <ExternalLink className="w-3 h-3" /></a> and sign in.
              <br />
              2. In your dashboard, click the button <strong>"New Project"</strong>.
              <br />
              3. Name it <code className="text-white font-mono-tech font-bold bg-zinc-800 px-1 rounded border border-white/10">frost-hacks</code>, enter a database password, and choose your nearest region.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/15 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <div className="font-mono-tech text-xs font-bold text-white uppercase tracking-wider">
                Step 2: WHAT TO CREATE (SQL SCHEMA)
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-800 hover:bg-white hover:text-black text-white font-mono-tech text-[11px] font-bold border border-white/15 transition-all shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied SQL!' : 'Copy SQL Script'}
              </button>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed mb-2">
              In your Supabase project sidebar on the left, click <strong>"SQL Editor"</strong>.
              Click <strong>"New query"</strong>, paste the script below, and click <strong>"Run"</strong>.
            </p>
            <div className="max-h-24 overflow-y-auto rounded-xl bg-black p-2.5 font-mono-tech text-[11px] text-zinc-300 border border-white/10">
              <pre className="whitespace-pre">{sqlSchema.substring(0, 260)}... (click "Copy SQL Script" above for full schema)</pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/15 shadow-sm">
            <div className="font-mono-tech text-xs font-bold text-white uppercase tracking-wider mb-1">
              Step 3: WHAT TO COPY
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              In your Supabase dashboard, click <strong>Project Settings (Gear icon)</strong> &rarr; <strong>"API"</strong>.
              Copy these two values:
              <br />
              • <strong>Project URL</strong> (<code className="text-white font-mono-tech">https://abcdefghijkl.supabase.co</code>)
              <br />
              • <strong>Project API anon key</strong> (<code className="text-white font-mono-tech">eyJhbGciOi...</code>)
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/15 shadow-sm">
            <div className="font-mono-tech text-xs font-bold text-white uppercase tracking-wider mb-1">
              Step 4: WHERE TO PASTE IT (VERCEL &amp; LOCAL)
            </div>
            <div className="text-xs text-zinc-300 leading-relaxed space-y-1">
              <p>
                <strong>For Vercel Deployment:</strong>
                <br />
                Go to your Project in Vercel &rarr; <strong>Settings</strong> &rarr; <strong>Environment Variables</strong>.
                Add these exact variable names:
              </p>
              <div className="bg-black p-2 rounded-xl font-mono-tech text-[11px] text-zinc-300 border border-white/10">
                <div>NEXT_PUBLIC_SUPABASE_URL = your-project-url</div>
                <div>NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key</div>
                <div>VITE_SUPABASE_URL = your-project-url</div>
                <div>VITE_SUPABASE_ANON_KEY = your-anon-key</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="btn-neon-primary px-6 py-2.5 rounded-xl font-mono-tech text-xs font-bold uppercase tracking-wider text-black bg-white shadow-md"
          >
            I Understand / Close
          </button>
        </div>
      </div>
    </div>
  );
};
