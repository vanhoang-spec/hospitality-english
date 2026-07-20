-- Phase 6 lockdown: scenarios/lessons were opened to `anon` (full CRUD) as a
-- shortcut for the old single-tenant admin-lounge CMS. Now that /admin-lounge
-- is gated behind super_admin in the client, close the same hole at the DB
-- layer — the client gate is only UX, RLS is the real boundary.

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin'
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;

REVOKE ALL ON public.scenarios FROM anon;
REVOKE ALL ON public.lessons FROM anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.scenarios TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lessons TO authenticated;

DROP POLICY IF EXISTS "Anyone can read scenarios" ON public.scenarios;
DROP POLICY IF EXISTS "Anyone can write scenarios" ON public.scenarios;
DROP POLICY IF EXISTS "Anyone can read lessons" ON public.lessons;
DROP POLICY IF EXISTS "Anyone can write lessons" ON public.lessons;

-- "Authenticated users can read scenarios/lessons" (USING true) already
-- exists from the original migration and is kept as-is.

CREATE POLICY "Super admins can insert scenarios"
  ON public.scenarios FOR INSERT TO authenticated WITH CHECK (public.is_super_admin());
CREATE POLICY "Super admins can update scenarios"
  ON public.scenarios FOR UPDATE TO authenticated USING (public.is_super_admin()) WITH CHECK (public.is_super_admin());
CREATE POLICY "Super admins can delete scenarios"
  ON public.scenarios FOR DELETE TO authenticated USING (public.is_super_admin());

CREATE POLICY "Super admins can insert lessons"
  ON public.lessons FOR INSERT TO authenticated WITH CHECK (public.is_super_admin());
CREATE POLICY "Super admins can update lessons"
  ON public.lessons FOR UPDATE TO authenticated USING (public.is_super_admin()) WITH CHECK (public.is_super_admin());
CREATE POLICY "Super admins can delete lessons"
  ON public.lessons FOR DELETE TO authenticated USING (public.is_super_admin());
