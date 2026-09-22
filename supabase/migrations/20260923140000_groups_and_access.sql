-- ============================================================
-- Batches, and who may open which week.
--
-- Today every learner sees all six departments and all forty weeks, and
-- the only gate is the phase checkpoint. Hotels asked for two more:
--   * a batch — "Front Office intake, September" — so HR can look at one
--     group instead of a list of ninety names;
--   * a matrix — that batch may open FO weeks 1-6 and nothing else.
--
-- The gate this builds is a UI gate, deliberately. The whole curriculum
-- ships inside the JavaScript bundle, so a determined learner with
-- DevTools can read week 30 whatever the database says. Locking it for
-- real means serving content per user from the server, which is a
-- different product decision; this is the honest half, and it is what a
-- hotel actually needs to pace a cohort.
-- ============================================================

create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null
);
create index if not exists groups_org_idx on public.groups (org_id);
create unique index if not exists groups_org_name_key on public.groups (org_id, lower(name));

create table if not exists public.group_members (
  group_id uuid not null references public.groups (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  added_at timestamptz not null default now(),
  primary key (group_id, user_id)
);
create index if not exists group_members_user_idx on public.group_members (user_id);

-- A rule opens a window. No rules at all for an organisation means the
-- old behaviour: everything is open. A rule with group_id null applies
-- to the whole hotel; a rule with a group applies to that batch only.
create table if not exists public.access_rules (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  group_id uuid references public.groups (id) on delete cascade,
  department_id text not null,
  week_from integer not null check (week_from between 1 and 40),
  week_to integer not null check (week_to between 1 and 40),
  created_at timestamptz not null default now(),
  constraint access_rules_range check (week_to >= week_from)
);
create index if not exists access_rules_org_idx on public.access_rules (org_id);

alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.access_rules enable row level security;

-- Everyone in the hotel can READ the shape of their own batches and
-- rules — the learner's app needs the rules to know what to open, and a
-- learner seeing the name of their batch is not a leak.
drop policy if exists "Members read groups in their org" on public.groups;
create policy "Members read groups in their org"
  on public.groups for select to authenticated using (org_id = public.current_org_id());

drop policy if exists "Org admins write groups" on public.groups;
create policy "Org admins write groups"
  on public.groups for all to authenticated
  using (public.is_org_admin(org_id)) with check (public.is_org_admin(org_id));

drop policy if exists "Members read their group membership" on public.group_members;
create policy "Members read their group membership"
  on public.group_members for select to authenticated
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.groups g
       where g.id = group_id and public.is_org_admin(g.org_id)
    )
  );

drop policy if exists "Org admins write group membership" on public.group_members;
create policy "Org admins write group membership"
  on public.group_members for all to authenticated
  using (exists (select 1 from public.groups g where g.id = group_id and public.is_org_admin(g.org_id)))
  with check (exists (select 1 from public.groups g where g.id = group_id and public.is_org_admin(g.org_id)));

drop policy if exists "Members read access rules in their org" on public.access_rules;
create policy "Members read access rules in their org"
  on public.access_rules for select to authenticated using (org_id = public.current_org_id());

drop policy if exists "Org admins write access rules" on public.access_rules;
create policy "Org admins write access rules"
  on public.access_rules for all to authenticated
  using (public.is_org_admin(org_id)) with check (public.is_org_admin(org_id));

drop policy if exists "Super admins read groups" on public.groups;
create policy "Super admins read groups"
  on public.groups for select to authenticated using (public.is_super_admin());

drop policy if exists "Super admins read access rules" on public.access_rules;
create policy "Super admins read access rules"
  on public.access_rules for select to authenticated using (public.is_super_admin());

grant select, insert, update, delete on public.groups to authenticated;
grant select, insert, update, delete on public.group_members to authenticated;
grant select, insert, update, delete on public.access_rules to authenticated;
