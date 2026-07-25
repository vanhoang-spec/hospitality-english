-- ============================================================
-- P2: two new suite types — writing (guest-review reply) and
-- mediation (relay a colleague's Vietnamese note to a guest in
-- English). Content lives in code (week-content.ts); this migration
-- only widens the suite CHECK so lesson_progress can record results
-- for them, same as every prior suite addition.
-- ============================================================

ALTER TABLE public.lesson_progress DROP CONSTRAINT IF EXISTS lesson_progress_suite_check;
ALTER TABLE public.lesson_progress
  ADD CONSTRAINT lesson_progress_suite_check
  CHECK (suite IN ('vocab', 'grammar', 'speaking', 'reading', 'arcade', 'listening', 'weektest', 'writing', 'mediation'));
