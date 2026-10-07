-- ============================================================
-- Company details of each hotel: the name on its business licence, its
-- address and tax code, and the HR person who represents it, with a phone
-- number and an email. The contract and the invoice need all of them.
--
-- A table of its own rather than columns on organizations: every learner
-- can read their own organizations row (the app shows the hotel's name),
-- and a learner has no business reading the tax code or HR's phone and
-- email. Here only that hotel's HR and the platform owner can read, and
-- nobody can write from a browser — the server functions write with the
-- service role and record it in admin_actions.
--
-- Hotels opened before this table have no row. The platform console shows
-- them as missing until the owner fills them in.
-- ============================================================

create table if not exists public.org_details (
  org_id uuid primary key references public.organizations (id) on delete cascade,
  -- The company name exactly as on the business licence. organizations.name
  -- stays the short name learners see ("Sea Pearl Resort").
  legal_name text not null check (char_length(legal_name) between 2 and 200),
  address text not null check (char_length(address) between 5 and 300),
  -- Ten digits; a branch adds a dash and three more (0123456789-001). Not
  -- unique: two resorts of one company can each buy their own plan.
  tax_code text not null check (tax_code ~ '^[0-9]{10}(-[0-9]{3})?$'),
  rep_name text not null check (char_length(rep_name) between 2 and 120),
  -- Same form the server normalises every phone to: +84 and nine digits.
  rep_phone text not null check (rep_phone ~ '^\+84[0-9]{9}$'),
  rep_email text not null check (
    char_length(rep_email) <= 254 and rep_email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  ),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

drop trigger if exists update_org_details_updated_at on public.org_details;
create trigger update_org_details_updated_at
  before update on public.org_details
  for each row execute function public.update_updated_at_column();

alter table public.org_details enable row level security;

-- Reading only. is_org_admin() checks the caller's own org, and the
-- platform owner belongs to none, so the owner needs is_super_admin().
drop policy if exists "HR and platform owners read company details" on public.org_details;
create policy "HR and platform owners read company details"
  on public.org_details for select to authenticated
  using (public.is_super_admin() or public.is_org_admin(org_id));

grant select on public.org_details to authenticated;
grant all on public.org_details to service_role;
