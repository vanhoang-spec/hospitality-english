-- ============================================================
-- Renewing a learner who bought for themself.
--
-- Owner's rules (07/10/2026):
--   * Seven days before a paid term ends, the app opens a renewal order
--     on its own: the same term as last time, today's list price, and the
--     discount of the link the learner came through only while that offer
--     is still running (not expired, not revoked, not "first contract only").
--   * The learner gets it as a banner in the app, and as a payment link that
--     opens without signing in (amount, order code, QR) — CS sends that link
--     over Zalo from the CRM.
--   * The CRM's accountant confirms the money, as for a first order.
--   * Grace: while a renewal order waits for payment, the learner keeps
--     learning for 7 days after the old term ended. Confirmed during the
--     grace, the new term counts from the day of confirmation; confirmed
--     before the old term ends, it follows straight on.
--
-- Contract with the CRM: docs/TICH_HOP_HOSPITALITY.md in the CRM repo
-- (event don_gia_han, link_thanh_toan).
-- ============================================================

alter table public.orders
  add column if not exists kind text not null default 'first'
    check (kind in ('first', 'renewal'));

-- Only a renewal has a grace period: the old term's end plus seven days.
alter table public.orders add column if not exists grace_until timestamptz;
alter table public.orders drop constraint if exists orders_grace_only_renewal;
alter table public.orders
  add constraint orders_grace_only_renewal check (grace_until is null or kind = 'renewal');

-- The payment link that opens without signing in. 122 random bits; the
-- page shows only what a bank transfer needs, nothing about the learner.
alter table public.orders add column if not exists pay_token text;
update public.orders
   set pay_token = replace(gen_random_uuid()::text, '-', '')
 where pay_token is null;
alter table public.orders
  alter column pay_token set default replace(gen_random_uuid()::text, '-', '');
alter table public.orders alter column pay_token set not null;
create unique index if not exists orders_pay_token_key on public.orders (pay_token);

-- The CRM hears about every renewal order, to send its payment link.
alter table public.crm_events drop constraint if exists crm_events_loai_check;
alter table public.crm_events
  add constraint crm_events_loai_check
    check (loai in ('khach_san_dang_ky', 'ca_nhan_dang_ky', 'don_cap_nhat', 'don_gia_han'));

-- ── Active, now with the renewal grace ──────────────────────
-- Same rule as before, plus: a renewal order still waiting for payment
-- keeps the organisation active until its grace_until. Everything that
-- stops a lapsed learner reads this one function (the RESTRICTIVE
-- progress policies, the server, and the app's lapse screen), so the
-- grace holds everywhere at once.
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
