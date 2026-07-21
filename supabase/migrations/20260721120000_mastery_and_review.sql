-- ============================================================
-- Pedagogy upgrade P1: mastery tracking + spaced-repetition state.
--
-- lesson_progress gains score_pct/mastered so "completion" can mean
-- "met the pass threshold" instead of "clicked once", and the suite
-- CHECK admits the new 'listening' and 'weektest' activities.
-- review_items holds per-user SM-2-lite scheduling state for the
-- Daily Review feature.
-- ============================================================

ALTER TABLE public.lesson_progress
  ADD COLUMN score_pct INTEGER CHECK (score_pct >= 0 AND score_pct <= 100),
  ADD COLUMN mastered BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.lesson_progress DROP CONSTRAINT lesson_progress_suite_check;
ALTER TABLE public.lesson_progress
  ADD CONSTRAINT lesson_progress_suite_check
  CHECK (suite IN ('vocab', 'grammar', 'speaking', 'reading', 'arcade', 'listening', 'weektest'));

-- ------------------------------------------------------------
-- review_items: one row per learnable item a user has mastered,
-- scheduled for spaced review. item_key example values:
--   "vocab:FO:1:Pre-authorization"  "grammar:FO:1:0"  "speaking:FO:1:2"
-- ------------------------------------------------------------
CREATE TABLE public.review_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_key TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('vocab', 'grammar', 'speaking')),
  department_id TEXT NOT NULL,
  week_number INTEGER NOT NULL CHECK (week_number BETWEEN 1 AND 20),
  due_at DATE NOT NULL DEFAULT (CURRENT_DATE + 1),
  interval_days INTEGER NOT NULL DEFAULT 1 CHECK (interval_days >= 1),
  streak INTEGER NOT NULL DEFAULT 0,
  last_result BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, item_key)
);

CREATE INDEX review_items_user_due_idx ON public.review_items(user_id, due_at);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.review_items TO authenticated;
GRANT ALL ON public.review_items TO service_role;

ALTER TABLE public.review_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own review items"
  ON public.review_items FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Org admins can read members' review state (same pattern as
-- lesson_progress in 20260720155502).
CREATE POLICY "Org admins can view review items in their org"
  ON public.review_items FOR SELECT
  TO authenticated
  USING (public.is_org_admin(public.org_of(user_id)));

CREATE TRIGGER update_review_items_updated_at
  BEFORE UPDATE ON public.review_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
