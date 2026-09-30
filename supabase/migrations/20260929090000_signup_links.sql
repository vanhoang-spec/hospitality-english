-- ============================================================
-- Signup links: a learner joins their hotel, or a hotel opens its
-- own account, from a link — instead of HR typing ninety names.
--
-- Two kinds, one table:
--   * learner       — made by the hotel's HR. Lands the new account in
--                     that hotel, optionally in one batch (group) and one
--                     department. Takes a seat like any learner.
--   * organization  — made by the platform owner for a hotel that has
--                     agreed to buy. Carries the plan, term and price
--                     already agreed; whoever opens it names the hotel
--                     and becomes its first HR account. Single use.
--
-- Accounts are still created on the SERVER with the service role. Public
-- signup in Supabase Auth stays off (it is off on production today), and
-- nothing here needs it on: the token in the link is the permission.
-- ============================================================

create table if not exists public.signup_links (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  kind text not null check (kind in ('learner', 'organization')),
  label text,
  -- learner links: the hotel to join. organization links: null until
  -- used, then the hotel that was created — so the owner can see which
  -- link became which customer.
  org_id uuid references public.organizations (id) on delete cascade,
  group_id uuid references public.groups (id) on delete set null,
  department text,
  plan_code text references public.plans (code),
  term text check (term in ('trial', 'm3', 'm6', 'm9', 'm12')),
  price numeric(14, 2),
  max_uses integer check (max_uses is null or max_uses > 0),
  use_count integer not null default 0,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint signup_links_shape check (
    (kind = 'learner'
      and org_id is not null
      and plan_code is null and term is null and price is null)
    or
    (kind = 'organization'
      and group_id is null and department is null
      and plan_code is not null and term is not null
      and max_uses = 1)
  ),
  constraint signup_links_within_uses check (max_uses is null or use_count <= max_uses)
);

create index if not exists signup_links_org_idx on public.signup_links (org_id);

alter table public.signup_links enable row level security;

-- Reading only. Every write goes through a server function, which checks
-- the caller's role and records it in admin_actions.
drop policy if exists "Org admins read their learner links" on public.signup_links;
create policy "Org admins read their learner links"
  on public.signup_links for select to authenticated
  using (kind = 'learner' and public.is_org_admin(org_id));

drop policy if exists "Super admins read all signup links" on public.signup_links;
create policy "Super admins read all signup links"
  on public.signup_links for select to authenticated
  using (public.is_super_admin());

grant select on public.signup_links to authenticated;

-- ── Claiming a use, atomically ──────────────────────────────
-- Two people opening a "max 1" link in the same second must not both get
-- in. The row is updated only if it is still live, and the caller gets
-- the row back only if the update happened.
create or replace function public.claim_signup_link(link_token text)
returns setof public.signup_links
language sql
volatile
security definer
set search_path = public
as $$
  update public.signup_links
     set use_count = use_count + 1
   where token = link_token
     and revoked_at is null
     and (expires_at is null or now() < expires_at)
     and (max_uses is null or use_count < max_uses)
  returning *;
$$;

-- Hand a use back when the account could not be created after all (phone
-- already registered, no seat left), so a typo does not burn the link.
create or replace function public.release_signup_link(link_id uuid)
returns void
language sql
volatile
security definer
set search_path = public
as $$
  update public.signup_links
     set use_count = greatest(use_count - 1, 0)
   where id = link_id;
$$;

revoke execute on function public.claim_signup_link(text) from public, anon, authenticated;
revoke execute on function public.release_signup_link(uuid) from public, anon, authenticated;
grant execute on function public.claim_signup_link(text) to service_role;
grant execute on function public.release_signup_link(uuid) to service_role;

-- ── Who a new account is, decided by the server only ────────
-- handle_new_user used to read org_id and role from raw_user_meta_data —
-- the part of a signup request the PERSON SIGNING UP writes. With public
-- signup off that could not be reached; the day someone switched it on,
-- anyone could have signed up with {"role": "super_admin"}.
--
-- raw_app_meta_data can only be written with the service role, which is
-- how every account in this product is created. The name still comes
-- from user_metadata: it is harmless, and it is theirs to write.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, org_id, role, department)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    new.phone,
    nullif(new.raw_app_meta_data->>'org_id', '')::uuid,
    coalesce(nullif(new.raw_app_meta_data->>'role', ''), 'member'),
    nullif(new.raw_app_meta_data->>'department', '')
  );

  insert into public.performance_metrics (profile_id)
  values (new.id);

  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
