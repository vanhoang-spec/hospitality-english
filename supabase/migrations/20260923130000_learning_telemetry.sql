-- ============================================================
-- What a hotel actually asks for in a review meeting: how long did
-- people study, how much did they finish, did they keep up with the
-- spaced review, and how often are they right the FIRST time.
--
-- None of that could be answered before this migration, because
-- lesson_progress keeps exactly one row per (user, department, week,
-- suite) and overwrites it. A row says "mastered, 80%" and says nothing
-- about how many attempts that took, when, or for how long. These two
-- tables are append-only for that reason: an event that never gets
-- overwritten is the only thing a time series can be built from.
-- ============================================================

-- One row per graded item the learner answers, anywhere in the app.
create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  org_id uuid references public.organizations (id) on delete set null,
  department_id text not null,
  week_number integer not null check (week_number between 1 and 40),
  suite text not null,
  -- Stable across content edits: "vocab:FO:15:Welcome drink", the same
  -- shape the review scheduler already uses.
  item_key text not null,
  attempt_no integer not null default 1 check (attempt_no > 0),
  correct boolean not null,
  is_first_try boolean not null,
  ms_spent integer check (ms_spent is null or ms_spent >= 0),
  created_at timestamptz not null default now()
);

create index if not exists attempts_user_time_idx on public.attempts (user_id, created_at desc);
create index if not exists attempts_org_time_idx on public.attempts (org_id, created_at desc);
create index if not exists attempts_user_scope_idx
  on public.attempts (user_id, department_id, week_number, suite);

-- One row per sitting in front of a suite. `seconds_active` is heartbeat
-- time with the tab visible, not wall clock: a learner who opens the app
-- and goes to lunch must not bill the hotel an hour of "study".
create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  org_id uuid references public.organizations (id) on delete set null,
  department_id text,
  week_number integer check (week_number is null or week_number between 1 and 40),
  suite text,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  seconds_active integer not null default 0 check (seconds_active >= 0)
);

create index if not exists study_sessions_user_time_idx
  on public.study_sessions (user_id, started_at desc);
create index if not exists study_sessions_org_time_idx
  on public.study_sessions (org_id, started_at desc);

alter table public.attempts enable row level security;
alter table public.study_sessions enable row level security;

-- Learners write their own and read their own.
drop policy if exists "Users insert their own attempts" on public.attempts;
create policy "Users insert their own attempts"
  on public.attempts for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "Users read their own attempts" on public.attempts;
create policy "Users read their own attempts"
  on public.attempts for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Users write their own study sessions" on public.study_sessions;
create policy "Users write their own study sessions"
  on public.study_sessions for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "Users update their own study sessions" on public.study_sessions;
create policy "Users update their own study sessions"
  on public.study_sessions for update to authenticated using (auth.uid() = user_id);

drop policy if exists "Users read their own study sessions" on public.study_sessions;
create policy "Users read their own study sessions"
  on public.study_sessions for select to authenticated using (auth.uid() = user_id);

-- HR reads its own hotel; the platform owner reads everything. Neither
-- can write: a report nobody can edit is worth more than one they can.
drop policy if exists "Org admins read attempts in their org" on public.attempts;
create policy "Org admins read attempts in their org"
  on public.attempts for select to authenticated
  using (public.is_org_admin(org_id) or public.is_super_admin());

drop policy if exists "Org admins read study sessions in their org" on public.study_sessions;
create policy "Org admins read study sessions in their org"
  on public.study_sessions for select to authenticated
  using (public.is_org_admin(org_id) or public.is_super_admin());

-- A lapsed contract stops new events, the same way it stops progress.
drop policy if exists "Attempts need an active subscription" on public.attempts;
create policy "Attempts need an active subscription"
  on public.attempts as restrictive for insert to authenticated
  with check (public.org_is_active(public.current_org_id()));

drop policy if exists "Study sessions need an active subscription" on public.study_sessions;
create policy "Study sessions need an active subscription"
  on public.study_sessions as restrictive for insert to authenticated
  with check (public.org_is_active(public.current_org_id()));

grant select, insert on public.attempts to authenticated;
grant select, insert, update on public.study_sessions to authenticated;
