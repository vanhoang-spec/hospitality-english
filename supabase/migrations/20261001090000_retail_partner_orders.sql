-- ============================================================
-- Selling to one learner at a time, through a partner.
--
-- A partner that runs payment tooling for four-star hotels shows the
-- course to those hotels' staff. A member of staff signs up from the
-- partner's link, for themself: 3, 6, 9 or 12 months, at a discount the
-- owner sets on the link (30% until 31/12/2026), after a free trial
-- (7 days). The partner takes no commission; the link only records that
-- the learner came through them.
--
-- How it fits what exists: a retail learner is a one-seat organisation of
-- kind 'individual' on plan p1. Everything that already stops a lapsed
-- hotel — org_is_active(), the RESTRICTIVE progress policies, the lapse
-- screen — stops a learner whose trial ran out, with no second mechanism
-- to keep in step. Hotels are kind 'hotel', the default, so every
-- existing row keeps its meaning.
--
-- Money: an order carries the amount and a short code for the transfer
-- note. Nothing here moves money. Until the partner's payment feature is
-- wired in, the owner marks an order paid in the console.
-- ============================================================

-- ── Partners ────────────────────────────────────────────────
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  note text,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null
);
create unique index if not exists partners_name_key on public.partners (lower(name));

alter table public.partners enable row level security;
drop policy if exists "Super admins read partners" on public.partners;
create policy "Super admins read partners"
  on public.partners for select to authenticated using (public.is_super_admin());
grant select on public.partners to authenticated;

-- ── Organisations: hotel or one person ──────────────────────
alter table public.organizations
  add column if not exists kind text not null default 'hotel'
    check (kind in ('hotel', 'individual'));
alter table public.organizations
  add column if not exists partner_id uuid references public.partners (id) on delete set null;
create index if not exists organizations_partner_idx on public.organizations (partner_id);

-- ── One seat, and its list price ────────────────────────────
-- The owner's sheet (Book1.xlsx, row "1 học viên"): 99,000 VND a month,
-- times 0.9/0.8/0.7/0.6 for 3/6/9/12 months, times the months. The
-- discount is not here — it belongs to the link that sells at it.
insert into public.plans (code, seats, sort_order) values ('p1', 1, 0)
on conflict (code) do nothing;

insert into public.plan_prices (plan_code, term, price) values
  ('p1', 'trial', 0),
  ('p1', 'm3', 267300),
  ('p1', 'm6', 475200),
  ('p1', 'm9', 623700),
  ('p1', 'm12', 712800)
on conflict (plan_code, term) do nothing;

-- ── Retail signup links ─────────────────────────────────────
alter table public.signup_links drop constraint if exists signup_links_kind_check;
alter table public.signup_links
  add constraint signup_links_kind_check check (kind in ('learner', 'organization', 'retail'));

alter table public.signup_links
  add column if not exists partner_id uuid references public.partners (id) on delete restrict;
alter table public.signup_links
  add column if not exists discount_pct numeric(5, 2)
    check (discount_pct is null or (discount_pct >= 0 and discount_pct < 100));
-- At least one day: a zero-day trial would mean an organisation with no
-- live subscription, and org_is_active() reads "no subscription row" as a
-- hotel that predates plans — active forever.
alter table public.signup_links
  add column if not exists trial_days integer
    check (trial_days is null or trial_days between 1 and 60);

alter table public.signup_links drop constraint if exists signup_links_shape;
alter table public.signup_links add constraint signup_links_shape check (
  (kind = 'learner'
    and org_id is not null
    and plan_code is null and term is null and price is null
    and partner_id is null and discount_pct is null and trial_days is null)
  or
  (kind = 'organization'
    and group_id is null and department is null
    and plan_code is not null and term is not null
    and max_uses = 1
    and partner_id is null and discount_pct is null and trial_days is null)
  or
  (kind = 'retail'
    and org_id is null and group_id is null and department is null
    and plan_code is null and term is null and price is null
    and partner_id is not null and discount_pct is not null and trial_days is not null)
);

-- ── Orders ──────────────────────────────────────────────────
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  -- What the learner writes in the transfer note. Short, no look-alike
  -- characters, unique.
  code text not null unique,
  org_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  partner_id uuid references public.partners (id) on delete set null,
  link_id uuid references public.signup_links (id) on delete set null,
  plan_code text not null references public.plans (code),
  term text not null check (term in ('m3', 'm6', 'm9', 'm12')),
  list_price numeric(14, 2) not null check (list_price >= 0),
  discount_pct numeric(5, 2) not null default 0 check (discount_pct >= 0 and discount_pct < 100),
  amount numeric(14, 2) not null check (amount >= 0),
  currency text not null default 'VND',
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  payment_ref text,
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  confirmed_by uuid references auth.users (id) on delete set null,
  constraint orders_paid_has_time check ((status = 'paid') = (paid_at is not null))
);
-- One open order per learner: changing the term edits it, it does not
-- stack a second amount to pay.
create unique index if not exists orders_one_pending_per_org
  on public.orders (org_id) where status = 'pending';
create index if not exists orders_partner_idx on public.orders (partner_id, created_at desc);

alter table public.orders enable row level security;
drop policy if exists "Learners read their own orders" on public.orders;
create policy "Learners read their own orders"
  on public.orders for select to authenticated using (user_id = auth.uid());
drop policy if exists "Super admins read all orders" on public.orders;
create policy "Super admins read all orders"
  on public.orders for select to authenticated using (public.is_super_admin());
grant select on public.orders to authenticated;

-- ── Where the money goes ────────────────────────────────────
-- One row. Learners never read it directly; the payment page gets it from
-- a server function, so only the fields a transfer needs leave the server.
create table if not exists public.payment_accounts (
  id integer primary key default 1 check (id = 1),
  bank_name text,
  -- NAPAS BIN (e.g. 970436), what a VietQR code needs to name the bank.
  bank_bin text,
  account_no text,
  account_name text,
  note text,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);
insert into public.payment_accounts (id) values (1) on conflict (id) do nothing;

alter table public.payment_accounts enable row level security;
drop policy if exists "Super admins read the payment account" on public.payment_accounts;
create policy "Super admins read the payment account"
  on public.payment_accounts for select to authenticated using (public.is_super_admin());
grant select on public.payment_accounts to authenticated;
