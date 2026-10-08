-- A partner gets a free account of their own: to learn with, and to know
-- what they are selling to hotels. It is open while the partner is active
-- AND has at least one live link (not revoked, not past its end). Switching
-- the partner off closes their links and that account together; a new link,
-- or switching back on, opens it again. Both the app and the CRM can switch
-- a partner; the state lives here.
--
-- The partner sets their own password from an activation link (a reset
-- token with purpose 'activate'): nobody else ever knows it.

-- ── Partners: on or off, and their demo account ─────────────
alter table public.partners add column if not exists active boolean not null default true;
alter table public.partners add column if not exists status_changed_at timestamptz;
alter table public.partners add column if not exists phone text;
alter table public.partners add column if not exists email text;
alter table public.partners
  add column if not exists demo_org_id uuid references public.organizations (id) on delete set null;
alter table public.partners
  add column if not exists demo_user_id uuid references public.profiles (id) on delete set null;

-- ── The demo account's organisation, and its open-ended plan ─
alter table public.organizations drop constraint if exists organizations_kind_check;
alter table public.organizations
  add constraint organizations_kind_check check (kind in ('hotel', 'individual', 'partner_demo'));

alter table public.subscriptions drop constraint if exists subscriptions_kind_check;
alter table public.subscriptions
  add constraint subscriptions_kind_check
    check (kind in ('trial', 'gift', 'm3', 'm6', 'm9', 'm12', 'demo'));

-- ── Is a partner live: switched on, with a link still open ──
-- A link that has filled up still counts: the programme is running.
create or replace function public.partner_is_live(p_partner uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.partners p
     where p.id = p_partner
       and p.active
       and exists (
         select 1
           from public.signup_links l
          where l.partner_id = p.id
            and l.kind in ('retail', 'partner_hotel')
            and l.revoked_at is null
            and (l.expires_at is null or now() < l.expires_at)
       )
  );
$$;

revoke execute on function public.partner_is_live(uuid) from public, anon, authenticated;
grant execute on function public.partner_is_live(uuid) to service_role;

-- ── Active, now with the partner's demo account ─────────────
-- Unchanged for hotels and individuals (20261008090000). A partner's demo
-- organisation follows the partner instead of a plan's dates.
create or replace function public.org_is_active(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select case
    when target is null then false
    when exists (
      select 1 from public.organizations o where o.id = target and o.kind = 'partner_demo'
    ) then coalesce(
      public.partner_is_live(
        (select o.partner_id from public.organizations o where o.id = target)
      ),
      false
    )
    when not exists (select 1 from public.subscriptions where org_id = target) then true
    else exists (
      select 1 from public.subscriptions
       where org_id = target
         and status = 'active'
         and now() >= starts_at
         and now() < ends_at
    ) or exists (
      select 1 from public.orders
       where org_id = target
         and kind = 'renewal'
         and status = 'pending'
         and now() < grace_until
    )
  end;
$$;

revoke execute on function public.org_is_active(uuid) from public, anon;
grant execute on function public.org_is_active(uuid) to authenticated;

-- ── A switched-off partner's links take nobody in ───────────
create or replace function public.claim_signup_link(link_token text)
returns setof public.signup_links
language sql
volatile
security definer
set search_path = public
as $$
  update public.signup_links as l
     set use_count = l.use_count + 1
   where l.token = link_token
     and l.revoked_at is null
     and (l.expires_at is null or now() < l.expires_at)
     and (l.max_uses is null or l.use_count < l.max_uses)
     and (
       l.partner_id is null
       or exists (select 1 from public.partners p where p.id = l.partner_id and p.active)
     )
  returning l.*;
$$;

revoke execute on function public.claim_signup_link(text) from public, anon, authenticated;
grant execute on function public.claim_signup_link(text) to service_role;

-- ── Activation links ride on the reset tokens ───────────────
alter table public.password_reset_tokens
  add column if not exists purpose text not null default 'reset';
alter table public.password_reset_tokens drop constraint if exists password_reset_tokens_purpose_check;
alter table public.password_reset_tokens
  add constraint password_reset_tokens_purpose_check check (purpose in ('reset', 'activate'));
-- An activation is sent by whoever made the account, not to an address.
alter table public.password_reset_tokens alter column email drop not null;

-- ── The CRM can hear that a partner was switched in the app ─
alter table public.crm_events drop constraint if exists crm_events_loai_check;
alter table public.crm_events
  add constraint crm_events_loai_check
    check (loai in ('khach_san_dang_ky', 'ca_nhan_dang_ky', 'don_cap_nhat', 'don_gia_han',
                    'doi_tac_cap_nhat'));

-- ── Save a partner (CRM command luu_doi_tac) ────────────────
-- Upserts by the CRM's id, adopting a same-named partner made in the app
-- (as crm_luu_link does), and sets it on or off. The demo account itself
-- is made by the server (it needs Supabase Auth), not here.
create or replace function public.crm_luu_doi_tac(
  p_partner_ref text,
  p_name text,
  p_active boolean
)
returns table (partner_id uuid, tao_moi boolean, demo_user_id uuid, active boolean)
language plpgsql
volatile
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  v_id uuid;
  v_new boolean := false;
begin
  select p.id into v_id from public.partners p where p.crm_ref = p_partner_ref;
  if v_id is null then
    select p.id into v_id from public.partners p
     where lower(p.name) = lower(p_name) and p.crm_ref is null;
    if v_id is null then
      insert into public.partners (name, crm_ref, active, status_changed_at)
      values (p_name, p_partner_ref, p_active, now())
      returning id into v_id;
      v_new := true;
    else
      update public.partners set crm_ref = p_partner_ref where id = v_id;
    end if;
  end if;

  update public.partners
     set name = p_name,
         status_changed_at = case when active is distinct from p_active then now()
                                  else status_changed_at end,
         active = p_active
   where id = v_id;

  return query
    select p.id, v_new, p.demo_user_id, p.active from public.partners p where p.id = v_id;
end;
$$;

revoke execute on function public.crm_luu_doi_tac(text, text, boolean) from public, anon, authenticated;
grant execute on function public.crm_luu_doi_tac(text, text, boolean) to service_role;
