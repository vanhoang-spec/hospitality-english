-- An account's hotel and role reach its profile — they did not.
--
-- Since 20260929090000, handle_new_user takes org_id, role and department
-- from raw_app_meta_data at INSERT, because that is the part of an account
-- only the server can write. But Supabase Auth does not put the caller's
-- app_metadata in the INSERT: admin.createUser inserts the row with
-- {provider, providers} only and writes the rest with an UPDATE a moment
-- later, in the same transaction. The trigger therefore read nothing, and
-- every account made since then got a profile with no organisation and the
-- role 'member' — a hotel's HR included.
--
-- Found on production on 10/10/2026: the first account made after that
-- migration (a partner's demo account) had app_metadata.org_id set and
-- profiles.org_id null. The embedded-database test could not see it: it
-- writes auth.users rows whole, the way Auth does not.
--
-- Fix: follow that UPDATE. When org_id, role or department change in
-- raw_app_meta_data, the profile is brought in line, inside Auth's own
-- transaction — so the seat quota (enforce_seat_quota fires on this
-- update) still refuses the whole sign-up when a hotel is full.

-- ── The guard lets this one writer through ───────────────────
-- A profile's role and organisation may be changed by the service role,
-- and now also by the trigger below. That is told apart from a person's
-- own request by two things together: the flag the trigger sets for its
-- own statement, and being inside a trigger at all (pg_trigger_depth),
-- which a request through the API can never be.
create or replace function public.prevent_self_role_org_change()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if current_setting('role', true) = 'service_role' then
    return new;
  end if;
  if pg_trigger_depth() > 1 and current_setting('app.identity_sync', true) = 'on' then
    return new;
  end if;

  if new.role is distinct from old.role or new.org_id is distinct from old.org_id then
    raise exception 'ROLE_OR_ORG_CHANGE_NOT_ALLOWED';
  end if;

  return new;
end;
$$;

revoke execute on function public.prevent_self_role_org_change() from public, anon, authenticated;

-- ── app_metadata changed: the profile follows ───────────────
create or replace function public.handle_user_identity_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  old_org text := old.raw_app_meta_data->>'org_id';
  new_org text := new.raw_app_meta_data->>'org_id';
  old_role text := old.raw_app_meta_data->>'role';
  new_role text := new.raw_app_meta_data->>'role';
  old_dep text := old.raw_app_meta_data->>'department';
  new_dep text := new.raw_app_meta_data->>'department';
begin
  if new_org is not distinct from old_org
     and new_role is not distinct from old_role
     and new_dep is not distinct from old_dep then
    return new;
  end if;

  perform set_config('app.identity_sync', 'on', true);
  update public.profiles
     set org_id = case when new_org is distinct from old_org
                       then nullif(new_org, '')::uuid else org_id end,
         -- A role taken out of app_metadata does not demote anyone.
         role = case when new_role is distinct from old_role and nullif(new_role, '') is not null
                     then new_role else role end,
         department = case when new_dep is distinct from old_dep
                           then nullif(new_dep, '') else department end
   where id = new.id;
  perform set_config('app.identity_sync', 'off', true);

  return new;
end;
$$;

revoke execute on function public.handle_user_identity_change() from public, anon, authenticated;

drop trigger if exists on_auth_user_identity_changed on auth.users;
create trigger on_auth_user_identity_changed
  after update of raw_app_meta_data on auth.users
  for each row execute function public.handle_user_identity_change();

-- ── Accounts made in between ─────────────────────────────────
-- Every profile with no organisation whose account says, in app_metadata,
-- which organisation it belongs to (and that organisation still exists).
-- Read first, as the owner; then written as the service role, which is the
-- guard's first door — and the seat quota still has its say.
do $$
declare
  ids uuid[];
  orgs uuid[];
  roles text[];
  deps text[];
  fixed integer := 0;
begin
  select array_agg(p.id),
         array_agg((u.raw_app_meta_data->>'org_id')::uuid),
         array_agg(nullif(u.raw_app_meta_data->>'role', '')),
         array_agg(nullif(u.raw_app_meta_data->>'department', ''))
    into ids, orgs, roles, deps
    from public.profiles p
    join auth.users u on u.id = p.id
    join public.organizations o on o.id::text = u.raw_app_meta_data->>'org_id'
   where p.org_id is null;

  if ids is not null then
    set local role service_role;
    update public.profiles p
       set org_id = x.org,
           role = coalesce(x.role, p.role),
           department = coalesce(x.dep, p.department)
      from unnest(ids, orgs, roles, deps) as x(id, org, role, dep)
     where p.id = x.id;
    get diagnostics fixed = row_count;
    reset role;
  end if;
  raise notice 'profiles given their organisation: %', fixed;
end $$;
