-- ==========================================================
-- FROST HACKS: SUPABASE DATABASE INITIALIZATION SCHEMA
-- Copy this script and paste it into the Supabase SQL Editor:
-- Supabase Dashboard -> Project -> SQL Editor -> New Query -> Run
-- ==========================================================

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Create Teams Table
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

-- 3. Create Team Members Table
create table if not exists public.team_members (
  id uuid default gen_random_uuid() primary key,
  team_id text not null references public.teams(team_id) on delete cascade,
  name text not null,
  email text not null,
  department text not null,
  college_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create Registrations Table
create table if not exists public.registrations (
  id uuid default gen_random_uuid() primary key,
  team_id text unique not null references public.teams(team_id) on delete cascade,
  registration_status text default 'PENDING' check (registration_status in ('PENDING', 'VERIFIED', 'REJECTED')),
  payment_status text default 'PENDING' check (payment_status in ('PENDING', 'PAID')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Row Level Security (RLS) Policies
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.registrations enable row level security;

-- Allow public anonymous team creation (Registration Form)
create policy "Allow public to register team" 
on public.teams for insert 
with check (true);

create policy "Allow public to read team by team_id" 
on public.teams for select 
using (true);

create policy "Allow public to register team members" 
on public.team_members for insert 
with check (true);

create policy "Allow public to view team members" 
on public.team_members for select 
using (true);

create policy "Allow public to create registration status" 
on public.registrations for insert 
with check (true);

create policy "Allow read registrations" 
on public.registrations for select 
using (true);

-- Allow updates (e.g. Admin or status updates)
create policy "Allow update registrations" 
on public.registrations for update 
using (true);
