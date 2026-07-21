-- Adds a "department" attribute to profiles so org-admins can tag
-- each employee (e.g. FO/FB/HK/SW/GR/BO or a free-text value for
-- departments that don't map to the 6 learning-content codes).
-- Deliberately no CHECK constraint — the 6 codes are a UI nudge, not
-- a hard requirement, per the org owner's request to also allow
-- free-text department names.

ALTER TABLE public.profiles ADD COLUMN department TEXT;

CREATE INDEX profiles_department_idx ON public.profiles(department);

-- handle_new_user: also read department from the user_metadata
-- createMember() now sets.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, org_id, role, department)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NEW.phone,
    NULLIF(NEW.raw_user_meta_data->>'org_id', '')::UUID,
    COALESCE(NEW.raw_user_meta_data->>'role', 'member'),
    NULLIF(NEW.raw_user_meta_data->>'department', '')
  );

  INSERT INTO public.performance_metrics (profile_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$;
