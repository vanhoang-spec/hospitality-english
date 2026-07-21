-- ============================================================
-- Repair sub-lesson labels left stale by the 40-week relocation.
--
-- 20260721150000 swapped scenarios.week_number pairwise, but `lessons`
-- rows hang off scenario_id, so they travelled with their scenario. The
-- authored weeks came out right (FO-17 kept its real four steps), but
-- the generic placeholder rows that moved *into* weeks 1-2 kept the
-- week number baked into their titles — FO week 1 rendered
-- "Chào đón khách (Tuần 17)".
--
-- Fix: rewrite the "(W<n>)" / "(Tuần <n>)" suffix on every placeholder
-- lesson to match the week its scenario actually sits in now. Rows whose
-- titles carry no such suffix are hand-authored and are left untouched.
--
-- Note: for weeks that have authored content in week-content.ts, the app
-- no longer reads these rows at all (Tier3SkillSuitesHub prefers the code
-- payload). This migration keeps the placeholder data honest for the
-- weeks that are still awaiting content, and for the admin CMS.
-- ============================================================

UPDATE public.lessons l
SET
  title_en = regexp_replace(l.title_en, '\(W[0-9]+\)', '(W' || s.week_number || ')'),
  title_vi = regexp_replace(l.title_vi, '\(Tuần [0-9]+\)', '(Tuần ' || s.week_number || ')')
FROM public.scenarios s
WHERE l.scenario_id = s.id
  AND l.title_en ~ '\(W[0-9]+\)'
  AND l.title_en !~ ('\(W' || s.week_number || '\)');
