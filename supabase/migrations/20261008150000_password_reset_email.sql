-- A learner who forgets their password resets it from their email.
--
-- Sign-in is by phone number, so Supabase Auth holds no email to send a
-- recovery message to, and until now a forgotten password meant asking HR.
-- profiles.email is a CONTACT address the learner (or HR) adds; signing in
-- stays by phone. A reset is a random token mailed to that address. The
-- database keeps only its sha256, it lives 30 minutes, it works once, and
-- using one retires every other token the account still holds.

-- ── The address ─────────────────────────────────────────────
alter table public.profiles add column if not exists email text;

alter table public.profiles drop constraint if exists profiles_email_check;
alter table public.profiles add constraint profiles_email_check check (
  email is null
  or (
    length(email) <= 254
    and email = lower(btrim(email))
    and email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  )
);

-- ── The tokens: nobody but the server reads or writes them ──
create table if not exists public.password_reset_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  token_hash text not null unique check (token_hash ~ '^[0-9a-f]{64}$'),
  email text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz
);

create index if not exists password_reset_tokens_user_idx
  on public.password_reset_tokens (user_id, created_at desc);

alter table public.password_reset_tokens enable row level security;
revoke all on public.password_reset_tokens from public, anon, authenticated;
grant all on public.password_reset_tokens to service_role;

-- ── Ask: who owns this phone, and where do we mail them ─────
-- Returns the address and name only when the phone belongs to an account
-- that has an email AND the account has asked fewer than three times this
-- hour; otherwise nothing, and the page says the same thing either way.
-- Accepts "+84…" or "84…": auth.users stores the second, older profiles
-- the first.
create or replace function public.password_reset_request(
  p_phone text,
  p_token_hash text,
  p_minutes integer default 30
)
returns table (email text, full_name text)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  v_digits text := ltrim(btrim(coalesce(p_phone, '')), '+');
  v_id uuid;
  v_email text;
  v_name text;
begin
  if v_digits = '' then
    return;
  end if;

  select p.id, p.email, p.full_name
    into v_id, v_email, v_name
    from public.profiles p
   where p.phone in (v_digits, '+' || v_digits)
     and p.email is not null
   limit 1;
  if v_id is null then
    return;
  end if;

  if (select count(*)
        from public.password_reset_tokens t
       where t.user_id = v_id
         and t.created_at > now() - interval '1 hour') >= 3 then
    return;
  end if;

  insert into public.password_reset_tokens (user_id, token_hash, email, expires_at)
  values (v_id, p_token_hash, v_email, now() + make_interval(mins => p_minutes));

  return query select v_email, v_name;
end;
$$;

-- ── Use: one token, once, before it expires ─────────────────
-- Marks the token used and retires the account's other live tokens, in
-- one statement each, so two tabs racing on the same link cannot both win.
create or replace function public.password_reset_claim(p_token_hash text)
returns table (user_id uuid, token_id uuid)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  v_id uuid;
  v_user uuid;
begin
  update public.password_reset_tokens t
     set used_at = now()
   where t.token_hash = p_token_hash
     and t.used_at is null
     and t.expires_at > now()
  returning t.id, t.user_id into v_id, v_user;
  if v_id is null then
    return;
  end if;

  update public.password_reset_tokens t
     set used_at = now()
   where t.user_id = v_user
     and t.used_at is null;

  return query select v_user, v_id;
end;
$$;

revoke execute on function public.password_reset_request(text, text, integer) from public, anon, authenticated;
revoke execute on function public.password_reset_claim(text) from public, anon, authenticated;
grant execute on function public.password_reset_request(text, text, integer) to service_role;
grant execute on function public.password_reset_claim(text) to service_role;
