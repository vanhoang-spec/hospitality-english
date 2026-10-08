-- ============================================================
-- A hotel invited straight from the CRM, with no partner (contract:
-- docs/TICH_HOP_HOSPITALITY.md in the CRM repo, decisions #17-#19,
-- command moi_khach_san).
--
-- Two uses, one mechanism. CS opens a B2B customer in the CRM and either
-- GIFTS the app to a hotel already learning with Embassy (Lugano,
-- Swandor), or invites a prospect to TRY it. The CRM sends the plan
-- (50-500 learners), a number of days, and what it already knows about
-- the company; the app answers with a single-use link, pre-filled, that
-- HR checks, corrects if need be, and signs up through. Free either way.
--
-- What this adds:
--   * signup_links kind 'invite': single use, a plan, a number of days,
--     gift or trial, the pre-fill, and the CRM's customer id to hand back.
--   * subscriptions kind 'gift' beside 'trial', so a gift reads as one in
--     reports and the CRM.
--   * trial_days up to 365 (a gift can last months; partner trials stay
--     whatever the CRM sends).
--   * crm_moi_khach_san: the upsert, as one transaction, service role only.
-- ============================================================

alter table public.signup_links
  add column if not exists invite_kind text check (invite_kind is null or invite_kind in ('gift', 'trial'));
alter table public.signup_links add column if not exists prefill jsonb;
alter table public.signup_links add column if not exists crm_customer_ref text;

alter table public.signup_links drop constraint if exists signup_links_trial_days_check;
alter table public.signup_links
  add constraint signup_links_trial_days_check check (trial_days is null or trial_days between 1 and 365);

alter table public.signup_links drop constraint if exists signup_links_kind_check;
alter table public.signup_links
  add constraint signup_links_kind_check
    check (kind in ('learner', 'organization', 'retail', 'partner_hotel', 'invite'));

alter table public.signup_links drop constraint if exists signup_links_shape;
alter table public.signup_links add constraint signup_links_shape check (
  (kind = 'learner'
    and org_id is not null
    and plan_code is null and term is null and price is null
    and partner_id is null and discount_pct is null and discount_amount is null
    and discount_scope is null and trial_days is null
    and invite_kind is null and prefill is null and crm_customer_ref is null)
  or
  (kind = 'organization'
    and group_id is null and department is null
    and plan_code is not null and term is not null
    and max_uses = 1
    and partner_id is null and discount_pct is null and discount_amount is null
    and discount_scope is null and trial_days is null
    and invite_kind is null and prefill is null and crm_customer_ref is null)
  or
  (kind = 'retail'
    and org_id is null and group_id is null and department is null
    and plan_code is null and term is null and price is null
    and partner_id is not null and trial_days is not null
    and ((discount_pct is null) <> (discount_amount is null))
    and invite_kind is null and prefill is null and crm_customer_ref is null)
  or
  (kind = 'partner_hotel'
    and org_id is null and group_id is null and department is null
    and plan_code is null and term is null and price is null
    and partner_id is not null and trial_days is not null
    and discount_scope is not null
    and ((discount_pct is null) <> (discount_amount is null))
    and invite_kind is null and prefill is null and crm_customer_ref is null)
  or
  -- org_id is filled in once the link has been used, as for 'organization'.
  (kind = 'invite'
    and group_id is null and department is null
    and plan_code is not null and term is null and price is null
    and partner_id is null and discount_pct is null and discount_amount is null
    and discount_scope is null
    and trial_days is not null and max_uses = 1
    and invite_kind is not null)
);

alter table public.subscriptions drop constraint if exists subscriptions_kind_check;
alter table public.subscriptions
  add constraint subscriptions_kind_check
    check (kind in ('trial', 'gift', 'm3', 'm6', 'm9', 'm12'));

-- ── Save an invitation (CRM command moi_khach_san) ──────────
-- New: a single-use link with the caller's token. Not yet used: edited in
-- place, token kept. Already used: left alone, reported as used — the
-- hotel it made is the CRM's from then on.
create or replace function public.crm_moi_khach_san(
  p_crm_ref text,
  p_customer_ref text,
  p_invite_kind text,
  p_plan text,
  p_days integer,
  p_expires_at timestamptz,
  p_prefill jsonb,
  p_open boolean,
  p_new_token text
)
returns table (link_id uuid, link_token text, tao_moi boolean, da_dung boolean)
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_link public.signup_links%rowtype;
begin
  if p_invite_kind not in ('gift', 'trial') then
    raise exception 'DU_LIEU_SAI: loai';
  end if;
  if not exists (select 1 from public.plans p where p.code = p_plan and p.code <> 'p1') then
    raise exception 'DU_LIEU_SAI: goi';
  end if;

  select * into v_link from public.signup_links where crm_ref = p_crm_ref for update;
  if found then
    if v_link.kind <> 'invite' then
      raise exception 'XUNG_DOT: crm_ref nay thuoc mot link khac';
    end if;
    if v_link.use_count > 0 then
      return query select v_link.id, v_link.token, false, true;
      return;
    end if;
    update public.signup_links
       set crm_customer_ref = p_customer_ref,
           invite_kind = p_invite_kind,
           plan_code = p_plan,
           trial_days = p_days,
           expires_at = p_expires_at,
           prefill = p_prefill,
           revoked_at = case when p_open then null else coalesce(revoked_at, now()) end
     where id = v_link.id;
    return query select v_link.id, v_link.token, false, false;
  else
    insert into public.signup_links (
      token, kind, crm_ref, crm_customer_ref, invite_kind, plan_code, trial_days,
      expires_at, prefill, max_uses, revoked_at
    ) values (
      p_new_token, 'invite', p_crm_ref, p_customer_ref, p_invite_kind, p_plan, p_days,
      p_expires_at, p_prefill, 1, case when p_open then null else now() end
    )
    returning id into v_link.id;
    return query select v_link.id, p_new_token, true, false;
  end if;
end;
$$;

revoke execute on function public.crm_moi_khach_san(
  text, text, text, text, integer, timestamptz, jsonb, boolean, text
) from public, anon, authenticated;
grant execute on function public.crm_moi_khach_san(
  text, text, text, text, integer, timestamptz, jsonb, boolean, text
) to service_role;
