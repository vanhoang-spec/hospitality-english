-- ============================================================
-- The Embassy CRM drives partner links and confirms payments.
--
-- Contract (the single design for both repos): docs/TICH_HOP_HOSPITALITY.md
-- in the CRM repo. In short: the owner makes a partner link in the CRM,
-- with a commission for the partner (the CRM's business — nothing about it
-- is stored here) and a discount for whoever buys through it. The CRM
-- calls this app, signed with a shared secret, to save the link, to read
-- what happened (sign-ups, orders), and — once its accountant has
-- confirmed the money — to open a hotel's plan or a learner's order.
--
-- What this migration adds:
--   * signup_links kind 'partner_hotel': a reusable link a partner hands
--     to hotels. Each hotel that uses it starts a trial on the plan it
--     picks. Retail links (one learner) already exist.
--   * a discount in money as well as in percent, and whether a hotel's
--     discount covers only the first contract or every purchase.
--   * crm_ref on partners, links, subscriptions and orders: the CRM's id,
--     which makes every CRM command safe to send twice.
--   * crm_events: what happened here, for the CRM to pull. Append-only.
--   * crm_luu_link, crm_cap_goi: the two commands that must change several
--     rows at once, as single transactions. Service role only.
-- ============================================================

-- ── Partners and links carry the CRM's id ───────────────────
alter table public.partners add column if not exists crm_ref text;
create unique index if not exists partners_crm_ref_key
  on public.partners (crm_ref) where crm_ref is not null;

alter table public.signup_links add column if not exists crm_ref text;
create unique index if not exists signup_links_crm_ref_key
  on public.signup_links (crm_ref) where crm_ref is not null;

-- A discount is a percent OR an amount of money, never both.
alter table public.signup_links
  add column if not exists discount_amount numeric(14, 2)
    check (discount_amount is null or discount_amount >= 0);
-- For a hotel: 'first' = the first contract only, 'every' = every purchase
-- through this link. Prices for hotels are set on the CRM's invoice; the
-- app only shows the right sentence on the sign-up page.
alter table public.signup_links
  add column if not exists discount_scope text
    check (discount_scope is null or discount_scope in ('first', 'every'));

alter table public.signup_links drop constraint if exists signup_links_kind_check;
alter table public.signup_links
  add constraint signup_links_kind_check
    check (kind in ('learner', 'organization', 'retail', 'partner_hotel'));

alter table public.signup_links drop constraint if exists signup_links_shape;
alter table public.signup_links add constraint signup_links_shape check (
  (kind = 'learner'
    and org_id is not null
    and plan_code is null and term is null and price is null
    and partner_id is null and discount_pct is null and discount_amount is null
    and discount_scope is null and trial_days is null)
  or
  (kind = 'organization'
    and group_id is null and department is null
    and plan_code is not null and term is not null
    and max_uses = 1
    and partner_id is null and discount_pct is null and discount_amount is null
    and discount_scope is null and trial_days is null)
  or
  (kind = 'retail'
    and org_id is null and group_id is null and department is null
    and plan_code is null and term is null and price is null
    and partner_id is not null and trial_days is not null
    and ((discount_pct is null) <> (discount_amount is null)))
  or
  -- The hotel picks its plan on the sign-up page, so the link names none.
  -- org_id stays null: many hotels can sign up through one partner link,
  -- and each hotel records the link it came through instead.
  (kind = 'partner_hotel'
    and org_id is null and group_id is null and department is null
    and plan_code is null and term is null and price is null
    and partner_id is not null and trial_days is not null
    and discount_scope is not null
    and ((discount_pct is null) <> (discount_amount is null)))
);

-- ── Where a hotel came from ─────────────────────────────────
alter table public.organizations
  add column if not exists signup_link_id uuid references public.signup_links (id) on delete set null;
create index if not exists organizations_signup_link_idx on public.organizations (signup_link_id);

-- ── CRM ids on what the CRM confirms ────────────────────────
alter table public.subscriptions add column if not exists crm_ref text;
create unique index if not exists subscriptions_crm_ref_key
  on public.subscriptions (crm_ref) where crm_ref is not null;

alter table public.orders add column if not exists crm_ref text;
create unique index if not exists orders_crm_ref_key
  on public.orders (crm_ref) where crm_ref is not null;
alter table public.orders
  add column if not exists discount_amount numeric(14, 2) not null default 0
    check (discount_amount >= 0);

-- ── What happened, for the CRM to pull ──────────────────────
-- The CRM keeps the last id it handled and asks for what comes after.
-- Rows are never changed or deleted, so an id read once means the same
-- thing forever. Nobody reads this table from a browser.
create table if not exists public.crm_events (
  id bigint generated always as identity primary key,
  loai text not null check (loai in ('khach_san_dang_ky', 'ca_nhan_dang_ky', 'don_cap_nhat')),
  du_lieu jsonb not null,
  luc timestamptz not null default now()
);
alter table public.crm_events enable row level security;
revoke all on public.crm_events from public, anon, authenticated;
grant all on public.crm_events to service_role;

-- ── Save a partner link (CRM command luu_link) ──────────────
-- Upserts the partner by the CRM's id (adopting a same-named partner made
-- in the app before the CRM existed), then the link by its crm_ref. The
-- token is drawn by the caller and only used when the link is new, so a
-- link keeps its URL however often the CRM edits it.
create or replace function public.crm_luu_link(
  p_crm_ref text,
  p_kind text,
  p_partner_ref text,
  p_partner_name text,
  p_discount_pct numeric,
  p_discount_amount numeric,
  p_discount_scope text,
  p_trial_days integer,
  p_expires_at timestamptz,
  p_max_uses integer,
  p_open boolean,
  p_new_token text
)
returns table (link_id uuid, link_token text, tao_moi boolean)
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_partner uuid;
  v_link public.signup_links%rowtype;
begin
  if p_kind not in ('retail', 'partner_hotel') then
    raise exception 'DU_LIEU_SAI: doi_tuong';
  end if;

  select id into v_partner from public.partners where crm_ref = p_partner_ref;
  if v_partner is null then
    select id into v_partner from public.partners
     where lower(name) = lower(p_partner_name) and crm_ref is null;
    if v_partner is null then
      insert into public.partners (name, crm_ref)
      values (p_partner_name, p_partner_ref)
      returning id into v_partner;
    else
      update public.partners set crm_ref = p_partner_ref, name = p_partner_name
       where id = v_partner;
    end if;
  else
    update public.partners set name = p_partner_name
     where id = v_partner and name is distinct from p_partner_name;
  end if;

  select * into v_link from public.signup_links where crm_ref = p_crm_ref for update;
  if found then
    if v_link.kind <> p_kind then
      raise exception 'XUNG_DOT: doi_tuong cua link da tao khong doi duoc';
    end if;
    update public.signup_links
       set partner_id = v_partner,
           discount_pct = p_discount_pct,
           discount_amount = p_discount_amount,
           discount_scope = p_discount_scope,
           trial_days = p_trial_days,
           expires_at = p_expires_at,
           max_uses = p_max_uses,
           revoked_at = case when p_open then null else coalesce(revoked_at, now()) end
     where id = v_link.id;
    return query select v_link.id, v_link.token, false;
  else
    insert into public.signup_links (
      token, kind, crm_ref, partner_id, discount_pct, discount_amount, discount_scope,
      trial_days, expires_at, max_uses, revoked_at
    ) values (
      p_new_token, p_kind, p_crm_ref, v_partner, p_discount_pct, p_discount_amount,
      p_discount_scope, p_trial_days, p_expires_at, p_max_uses,
      case when p_open then null else now() end
    )
    returning id into v_link.id;
    return query select v_link.id, p_new_token, true;
  end if;
end;
$$;

-- ── Open a hotel's paid plan (CRM command cap_goi) ──────────
-- Sent once the CRM's accountant has confirmed a B2B invoice. The paid
-- term follows on from whatever the hotel still has — trial days
-- included — exactly as a retail order does. The old row is closed and
-- the new one opened in one transaction, so "one active plan per hotel"
-- never has zero or two answers, and a repeat of the same crm_ref returns
-- the first result instead of adding the term twice.
create or replace function public.crm_cap_goi(
  p_crm_ref text,
  p_org uuid,
  p_plan text,
  p_term text,
  p_price numeric
)
returns table (bat_dau timestamptz, ket_thuc timestamptz, da_xu_ly_truoc boolean)
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_kind text;
  v_seats integer;
  v_months integer;
  v_prev public.subscriptions%rowtype;
  v_start timestamptz;
  v_end timestamptz;
begin
  select s.starts_at, s.ends_at into bat_dau, ket_thuc
    from public.subscriptions s where s.crm_ref = p_crm_ref;
  if found then
    da_xu_ly_truoc := true;
    return next;
    return;
  end if;

  select o.kind into v_kind from public.organizations o where o.id = p_org for update;
  if not found then
    raise exception 'KHONG_TIM_THAY: app_org_id';
  end if;
  if v_kind <> 'hotel' then
    raise exception 'DU_LIEU_SAI: to chuc nay khong phai khach san';
  end if;

  select p.seats into v_seats from public.plans p where p.code = p_plan and p.code <> 'p1';
  if v_seats is null then
    raise exception 'DU_LIEU_SAI: goi';
  end if;
  v_months := case p_term when 'm3' then 3 when 'm6' then 6 when 'm9' then 9 when 'm12' then 12 end;
  if v_months is null then
    raise exception 'DU_LIEU_SAI: ky_han';
  end if;

  select * into v_prev from public.subscriptions s
   where s.org_id = p_org and s.status = 'active' for update;

  -- A minute early, for the clock reason given in provisionIndividual.
  v_start := now() - interval '1 minute';
  v_end := greatest(now(), coalesce(v_prev.ends_at, now())) + make_interval(months => v_months);

  if v_prev.id is not null then
    update public.subscriptions set status = 'cancelled' where id = v_prev.id;
  end if;
  insert into public.subscriptions (org_id, plan_code, kind, starts_at, ends_at, price, crm_ref)
  values (p_org, p_plan, p_term, v_start, v_end, p_price, p_crm_ref);
  update public.organizations set seat_limit = v_seats where id = p_org;

  bat_dau := v_start;
  ket_thuc := v_end;
  da_xu_ly_truoc := false;
  return next;
end;
$$;

revoke execute on function public.crm_luu_link(
  text, text, text, text, numeric, numeric, text, integer, timestamptz, integer, boolean, text
) from public, anon, authenticated;
grant execute on function public.crm_luu_link(
  text, text, text, text, numeric, numeric, text, integer, timestamptz, integer, boolean, text
) to service_role;
revoke execute on function public.crm_cap_goi(text, uuid, text, text, numeric)
  from public, anon, authenticated;
grant execute on function public.crm_cap_goi(text, uuid, text, text, numeric) to service_role;
