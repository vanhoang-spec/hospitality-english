-- ============================================================
-- Selling the course to hotels: plans, subscriptions, seats,
-- one live session per learner, and an admin audit trail.
--
-- What this migration assumes, because it is what was decided:
--   * A "seat" is an ACCOUNT, not a concurrent connection. Delete a
--     learner and the seat is free again. Concurrency is handled
--     separately and cheaply, by allowing one live session per account
--     (active_sessions below) — that is the real worry, three people
--     sharing one login, and it does not need a licence server.
--   * HR accounts do not consume seats. Today the seat trigger counts
--     every row in the org, which would bill a hotel for its own admins.
--   * When a subscription lapses the LEARNERS stop; HR keeps reading and
--     exporting. So the block below is on writes, not on reads.
--
-- The HR role is the existing `org_admin` value — same permissions, and
-- the UI calls it HR. Adding a fourth role would have meant rewriting
-- is_org_admin(), four RLS policies and every server function for a
-- rename, with nothing gained.
-- ============================================================

-- ── Plans ───────────────────────────────────────────────────
create table if not exists public.plans (
  code text primary key,
  seats integer not null check (seats > 0),
  sort_order integer not null default 0
);

insert into public.plans (code, seats, sort_order) values
  ('p50', 50, 1),
  ('p100', 100, 2),
  ('p200', 200, 3),
  ('p300', 300, 4),
  ('p500', 500, 5)
on conflict (code) do nothing;

-- ── Subscriptions ───────────────────────────────────────────
-- `kind` carries the term the hotel bought: a one-month free trial, or
-- 3/6/9/12 paid months. `ends_at` is the fact the app enforces; `kind`
-- is what an invoice says.
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  plan_code text not null references public.plans(code),
  kind text not null check (kind in ('trial', 'm3', 'm6', 'm9', 'm12')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz not null,
  status text not null default 'active' check (status in ('active', 'expired', 'cancelled')),
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null,
  constraint subscriptions_period check (ends_at > starts_at)
);

-- One live contract per hotel. A renewal cancels or expires the old row
-- first, so "which plan is this hotel on?" always has one answer.
create unique index if not exists subscriptions_one_active_per_org
  on public.subscriptions (org_id) where status = 'active';
create index if not exists subscriptions_org_idx on public.subscriptions (org_id);

-- ── Per-organisation settings ───────────────────────────────
-- sequential_mode: when on, a learner must master week N before week N+1
-- opens. Off by default — the first hotels asked for open access.
create table if not exists public.org_settings (
  org_id uuid primary key references public.organizations (id) on delete cascade,
  sequential_mode boolean not null default false,
  updated_at timestamptz not null default now()
);

-- ── Admin audit trail ───────────────────────────────────────
-- Who reset whose password, who deleted whom. Written by the server
-- functions (service role); nobody can write it from a browser.
create table if not exists public.admin_actions (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users (id) on delete set null,
  org_id uuid references public.organizations (id) on delete cascade,
  action text not null,
  target_user_id uuid,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists admin_actions_org_idx on public.admin_actions (org_id, created_at desc);

-- ── One live session per account ────────────────────────────
-- The browser mints a session id at sign-in and heartbeats it. A second
-- device signing in writes its own id; the first device notices on its
-- next heartbeat and signs itself out. This is the cheap half of
-- "100 users means 100 users" — it stops one login being shared by a
-- whole shift, which is what a seat count cannot see.
create table if not exists public.active_sessions (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  session_id text not null,
  last_seen timestamptz not null default now(),
  user_agent text
);

-- ── Helpers (SECURITY DEFINER, like the ones already here) ──
-- How many learner seats this organisation has bought. Falls back to
-- organizations.seat_limit for an org with no subscription row yet.
create or replace function public.org_seat_limit(target uuid)
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select p.seats
       from public.subscriptions s
       join public.plans p on p.code = s.plan_code
      where s.org_id = target
        and s.status = 'active'
        and now() < s.ends_at
      order by s.ends_at desc
      limit 1),
    (select o.seat_limit from public.organizations o where o.id = target),
    0
  );
$$;

-- Whether learners may still work. An organisation with no subscription
-- row at all is treated as active: those are the orgs that existed
-- before this migration, and a schema change must not lock anybody out.
create or replace function public.org_is_active(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select case
    when target is null then false
    when not exists (select 1 from public.subscriptions where org_id = target) then true
    else exists (
      select 1 from public.subscriptions
       where org_id = target
         and status = 'active'
         and now() >= starts_at
         and now() < ends_at
    )
  end;
$$;

revoke execute on function public.org_seat_limit(uuid) from public, anon;
revoke execute on function public.org_is_active(uuid) from public, anon;
grant execute on function public.org_seat_limit(uuid) to authenticated;
grant execute on function public.org_is_active(uuid) to authenticated;

-- ── Seats count LEARNERS only, against the plan ─────────────
create or replace function public.enforce_seat_quota()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  seat_limit integer;
  used integer;
begin
  if new.org_id is null then
    return new;
  end if;

  -- HR and platform accounts are free.
  if new.role is distinct from 'member' then
    return new;
  end if;

  -- Nothing that matters changed: same org, still a learner.
  if tg_op = 'UPDATE'
     and old.org_id is not distinct from new.org_id
     and old.role = 'member' then
    return new;
  end if;

  -- Serialise concurrent signups for this organisation.
  perform 1 from public.organizations where id = new.org_id for update;

  seat_limit := public.org_seat_limit(new.org_id);

  select count(*) into used
    from public.profiles
   where org_id = new.org_id
     and role = 'member'
     and id <> new.id;

  if used >= seat_limit then
    raise exception 'SEAT_QUOTA_EXCEEDED: % of % seats in use', used, seat_limit;
  end if;

  return new;
end;
$$;

revoke execute on function public.enforce_seat_quota() from public, anon, authenticated;

-- Promoting an HR account back to learner consumes a seat, so the
-- trigger has to watch `role` as well as `org_id`.
drop trigger if exists enforce_profiles_seat_quota on public.profiles;
create trigger enforce_profiles_seat_quota
  before insert or update of org_id, role on public.profiles
  for each row execute function public.enforce_seat_quota();

-- ── Row level security ──────────────────────────────────────
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.org_settings enable row level security;
alter table public.admin_actions enable row level security;
alter table public.active_sessions enable row level security;

drop policy if exists "Anyone signed in can read plans" on public.plans;
create policy "Anyone signed in can read plans"
  on public.plans for select to authenticated using (true);

drop policy if exists "Members can view their own subscription" on public.subscriptions;
create policy "Members can view their own subscription"
  on public.subscriptions for select to authenticated
  using (org_id = public.current_org_id());

drop policy if exists "Super admins manage subscriptions" on public.subscriptions;
create policy "Super admins manage subscriptions"
  on public.subscriptions for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

drop policy if exists "Members can view their org settings" on public.org_settings;
create policy "Members can view their org settings"
  on public.org_settings for select to authenticated
  using (org_id = public.current_org_id());

drop policy if exists "Org admins change their org settings" on public.org_settings;
create policy "Org admins change their org settings"
  on public.org_settings for all to authenticated
  using (public.is_org_admin(org_id)) with check (public.is_org_admin(org_id));

drop policy if exists "Org admins read their audit trail" on public.admin_actions;
create policy "Org admins read their audit trail"
  on public.admin_actions for select to authenticated
  using (public.is_org_admin(org_id) or public.is_super_admin());

drop policy if exists "Users manage their own session row" on public.active_sessions;
create policy "Users manage their own session row"
  on public.active_sessions for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Learners stop when the contract lapses; HR keeps reading. RESTRICTIVE
-- so it ANDs with the existing self-only policies rather than replacing
-- them, and only on writes — an expired hotel can still be reported on.
drop policy if exists "Progress inserts need an active subscription" on public.lesson_progress;
create policy "Progress inserts need an active subscription"
  on public.lesson_progress as restrictive for insert to authenticated
  with check (public.org_is_active(public.current_org_id()));

drop policy if exists "Progress updates need an active subscription" on public.lesson_progress;
create policy "Progress updates need an active subscription"
  on public.lesson_progress as restrictive for update to authenticated
  using (public.org_is_active(public.current_org_id()));

drop policy if exists "Review inserts need an active subscription" on public.review_items;
create policy "Review inserts need an active subscription"
  on public.review_items as restrictive for insert to authenticated
  with check (public.org_is_active(public.current_org_id()));

drop policy if exists "Review updates need an active subscription" on public.review_items;
create policy "Review updates need an active subscription"
  on public.review_items as restrictive for update to authenticated
  using (public.org_is_active(public.current_org_id()));

-- ── The platform owner can see across hotels ────────────────
-- `is_super_admin()` already existed but only ever gated the content
-- tables, so the person who runs the platform could not read a single
-- row of what they sell.
drop policy if exists "Super admins can view all profiles" on public.profiles;
create policy "Super admins can view all profiles"
  on public.profiles for select to authenticated using (public.is_super_admin());

drop policy if exists "Super admins can view all organizations" on public.organizations;
create policy "Super admins can view all organizations"
  on public.organizations for select to authenticated using (public.is_super_admin());

drop policy if exists "Super admins can view all progress" on public.lesson_progress;
create policy "Super admins can view all progress"
  on public.lesson_progress for select to authenticated using (public.is_super_admin());

drop policy if exists "Super admins can view all metrics" on public.performance_metrics;
create policy "Super admins can view all metrics"
  on public.performance_metrics for select to authenticated using (public.is_super_admin());

grant select on public.plans to authenticated;
grant select on public.subscriptions to authenticated;
grant select, insert, update on public.org_settings to authenticated;
grant select on public.admin_actions to authenticated;
grant select, insert, update, delete on public.active_sessions to authenticated;
