
-- ============================================================
-- Multi-tenant user management: organizations, roles, phone
-- login, per-lesson progress tracking, seat quota enforcement.
-- ============================================================

-- organizations (one per hotel/resort)
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  seat_limit INTEGER NOT NULL DEFAULT 100 CHECK (seat_limit > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.organizations TO authenticated;
GRANT ALL ON public.organizations TO service_role;

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- profiles: add multi-tenant columns
ALTER TABLE public.profiles
  ADD COLUMN org_id UUID REFERENCES public.organizations(id),
  ADD COLUMN role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'org_admin', 'super_admin')),
  ADD COLUMN phone TEXT,
  ADD COLUMN must_change_password BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX profiles_org_id_idx ON public.profiles(org_id);
CREATE UNIQUE INDEX profiles_phone_key ON public.profiles(phone) WHERE phone IS NOT NULL;

-- lesson_progress: per department/week/suite completion + stars
CREATE TABLE public.lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  department_id TEXT NOT NULL,
  week_number INTEGER NOT NULL CHECK (week_number BETWEEN 1 AND 20),
  suite TEXT NOT NULL CHECK (suite IN ('vocab', 'grammar', 'speaking', 'reading', 'arcade')),
  stars INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, department_id, week_number, suite)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_progress TO authenticated;
GRANT ALL ON public.lesson_progress TO service_role;

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own lesson progress"
  ON public.lesson_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lesson progress"
  ON public.lesson_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lesson progress"
  ON public.lesson_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_lesson_progress_updated_at
  BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------
-- RLS helper functions (SECURITY DEFINER: read profiles/orgs
-- bypassing RLS so policies that call them don't recurse).
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.current_org_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT org_id FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.org_of(target_profile UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT org_id FROM public.profiles WHERE id = target_profile;
$$;

CREATE OR REPLACE FUNCTION public.is_org_admin(target_org UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND org_id = target_org
      AND role IN ('org_admin', 'super_admin')
  );
$$;

GRANT EXECUTE ON FUNCTION public.current_org_id() TO authenticated;
GRANT EXECUTE ON FUNCTION public.org_of(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_org_admin(UUID) TO authenticated;

-- org-scoped read access: members already see their own row via
-- the existing self policies; admins additionally see their org.
CREATE POLICY "Org admins can view profiles in their org"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.is_org_admin(org_id));

CREATE POLICY "Org admins can view metrics in their org"
  ON public.performance_metrics FOR SELECT
  TO authenticated
  USING (public.is_org_admin(public.org_of(profile_id)));

CREATE POLICY "Org admins can view lesson progress in their org"
  ON public.lesson_progress FOR SELECT
  TO authenticated
  USING (public.is_org_admin(public.org_of(user_id)));

CREATE POLICY "Members can view their own organization"
  ON public.organizations FOR SELECT
  TO authenticated
  USING (id = public.current_org_id());

-- ------------------------------------------------------------
-- award_stars: atomic increment, callable via supabase.rpc()
-- from the client (avoids read-then-write races on service_stars).
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.award_stars(delta INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_total INTEGER;
BEGIN
  UPDATE public.profiles
  SET service_stars = service_stars + delta,
      updated_at = now()
  WHERE id = auth.uid()
  RETURNING service_stars INTO new_total;

  RETURN new_total;
END;
$$;

GRANT EXECUTE ON FUNCTION public.award_stars(INTEGER) TO authenticated;

-- ------------------------------------------------------------
-- Seat quota: DB-level backstop. Locks the organization row so
-- concurrent inserts into the same org can't both slip past the
-- count check (classic SELECT ... FOR UPDATE serialization).
-- Fires for every INSERT/org reassignment regardless of caller
-- role, including admin.createUser via service_role — this is
-- intentional, it's the hard ceiling, not just a UX check.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.enforce_seat_quota()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  org_seat_limit INTEGER;
  member_count INTEGER;
BEGIN
  IF NEW.org_id IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT seat_limit INTO org_seat_limit
  FROM public.organizations
  WHERE id = NEW.org_id
  FOR UPDATE;

  IF org_seat_limit IS NULL THEN
    RAISE EXCEPTION 'ORG_NOT_FOUND';
  END IF;

  SELECT count(*) INTO member_count
  FROM public.profiles
  WHERE org_id = NEW.org_id
    AND id IS DISTINCT FROM NEW.id;

  IF member_count >= org_seat_limit THEN
    RAISE EXCEPTION 'SEAT_QUOTA_EXCEEDED';
  END IF;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.enforce_seat_quota() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER enforce_profiles_seat_quota
  BEFORE INSERT OR UPDATE OF org_id ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.enforce_seat_quota();

-- ------------------------------------------------------------
-- Prevent members from self-promoting: the existing "Users can
-- update their own profile" policy allows any column change,
-- so role/org_id must be blocked separately. service_role
-- (admin server functions) is exempt — it's how role/org_id
-- ever legitimately change.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.prevent_self_role_org_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF current_setting('role', true) = 'service_role' THEN
    RETURN NEW;
  END IF;

  IF NEW.role IS DISTINCT FROM OLD.role OR NEW.org_id IS DISTINCT FROM OLD.org_id THEN
    RAISE EXCEPTION 'ROLE_OR_ORG_CHANGE_NOT_ALLOWED';
  END IF;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.prevent_self_role_org_change() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER guard_profiles_role_org_change
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_self_role_org_change();

-- ------------------------------------------------------------
-- handle_new_user: extend to read org_id/role/phone from the
-- metadata admin.createUser() sets, and seed performance_metrics
-- (previously missing entirely). Runs inside the same transaction
-- as the auth.users insert, so enforce_seat_quota firing here
-- rolls back the whole signup atomically.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, org_id, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NEW.phone,
    NULLIF(NEW.raw_user_meta_data->>'org_id', '')::UUID,
    COALESCE(NEW.raw_user_meta_data->>'role', 'member')
  );

  INSERT INTO public.performance_metrics (profile_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$;
