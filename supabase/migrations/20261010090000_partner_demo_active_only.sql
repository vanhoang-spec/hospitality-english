-- A partner's demo account is open while the partner is active — a live
-- link is no longer asked for (owner, 10/10/2026; replaces the 08/10 rule in
-- 20261008180000).
--
-- The CRM now lists Embassy's own CS/Admission staff as partners and
-- switches each one on as they agree to take part. They have no link yet,
-- and must be able to learn with the app first, to know what they are
-- introducing. Under the old rule their account stayed closed until a link
-- existed.
--
-- Unchanged: switching a partner off closes the account and stops every
-- link of theirs taking sign-ups (claim_signup_link). org_is_active() still
-- asks this function for a partner_demo organisation.

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
  );
$$;

revoke execute on function public.partner_is_live(uuid) from public, anon, authenticated;
grant execute on function public.partner_is_live(uuid) to service_role;
