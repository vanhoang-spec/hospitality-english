-- ============================================================
-- review_items.item_key for grammar/speaking was a positional index
-- into lessons.flatMap(...) (e.g. "grammar:FO:1:0"). Editing the order
-- of week-content.ts would silently repoint an existing learner's
-- review schedule at different content. review.ts now derives the key
-- from a slug of the puzzle's own text instead, which survives
-- reordering/insertion. Drop the old index-keyed rows so they get
-- reseeded (with the new stable key) next time the learner masters
-- that suite.
-- ============================================================

DELETE FROM public.review_items
WHERE item_type IN ('grammar', 'speaking')
  AND item_key ~ ':[0-9]+$';
