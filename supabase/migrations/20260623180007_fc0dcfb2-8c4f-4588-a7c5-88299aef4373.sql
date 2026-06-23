
-- Update default values on performance_metrics
ALTER TABLE public.performance_metrics
  ALTER COLUMN fluency_score SET DEFAULT 70,
  ALTER COLUMN courtesy_score SET DEFAULT 70,
  ALTER COLUMN reflex_speed SET DEFAULT 5.0,
  ALTER COLUMN crisis_handling_score SET DEFAULT 70;

-- Open scenarios and lessons to anon for demo + admin CMS authoring
GRANT SELECT, INSERT, UPDATE, DELETE ON public.scenarios TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lessons TO anon;

DROP POLICY IF EXISTS "Anyone can read scenarios" ON public.scenarios;
DROP POLICY IF EXISTS "Anyone can write scenarios" ON public.scenarios;
DROP POLICY IF EXISTS "Anyone can read lessons" ON public.lessons;
DROP POLICY IF EXISTS "Anyone can write lessons" ON public.lessons;

CREATE POLICY "Anyone can read scenarios" ON public.scenarios FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can write scenarios" ON public.scenarios FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read lessons" ON public.lessons FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can write lessons" ON public.lessons FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Seed scenarios (6 departments x 20 weeks) and 4 lessons each, only if not already seeded
DO $seed$
DECLARE
  dep RECORD;
  wk INTEGER;
  s_id UUID;
  l INTEGER;
  topics TEXT[] := ARRAY['Greeting & Welcome', 'Service Sequence', 'Handling Requests', 'Farewell & Recovery'];
  topics_vi TEXT[] := ARRAY['Chào đón khách', 'Quy trình phục vụ', 'Xử lý yêu cầu', 'Tiễn khách & khắc phục'];
BEGIN
  IF (SELECT COUNT(*) FROM public.scenarios) > 0 THEN
    RETURN;
  END IF;

  FOR dep IN SELECT * FROM (VALUES
    ('FO', 'Front Office', 'Lễ tân'),
    ('FB', 'Food & Beverage', 'Nhà hàng & Bar'),
    ('HK', 'Housekeeping', 'Buồng phòng'),
    ('SW', 'Spa & Wellness', 'Spa & Sức khỏe'),
    ('GR', 'Guest Relations', 'Quan hệ khách hàng'),
    ('BO', 'Back Office', 'Vận hành & Kinh doanh')
  ) AS t(code, en, vi)
  LOOP
    FOR wk IN 1..20 LOOP
      s_id := gen_random_uuid();
      INSERT INTO public.scenarios (id, department_id, week_number, title_en, title_vi)
      VALUES (s_id, dep.code, wk, dep.en || ' — Week ' || wk, dep.vi || ' — Tuần ' || wk);

      FOR l IN 1..4 LOOP
        INSERT INTO public.lessons (scenario_id, lesson_order, title_en, title_vi)
        VALUES (s_id, l, topics[l] || ' (W' || wk || ')', topics_vi[l] || ' (Tuần ' || wk || ')');
      END LOOP;
    END LOOP;
  END LOOP;
END
$seed$;
