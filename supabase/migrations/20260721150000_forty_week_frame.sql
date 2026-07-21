-- ============================================================
-- 40-week curriculum frame (docs/curriculum-level-matrix.md).
--
-- 1. Widen week_number CHECKs from 1..20 to 1..40.
-- 2. Seed scenarios + lessons for weeks 21-40 (all 6 departments),
--    mirroring the original 20260623180007 seed shape.
-- 3. Relocate the 12 authored weeks from their old "week 1-2" slots
--    to their audited CEFR positions (swap week_number pairwise, so
--    each scenario keeps its id and its lessons follow along).
-- 4. Retitle weeks 1-14 with the shared pre-A1/A1 spine themes and
--    name the checkpoint weeks.
-- ============================================================

-- 1. Widen CHECK constraints -------------------------------------
ALTER TABLE public.lesson_progress
  DROP CONSTRAINT IF EXISTS lesson_progress_week_number_check;
ALTER TABLE public.lesson_progress
  ADD CONSTRAINT lesson_progress_week_number_check CHECK (week_number BETWEEN 1 AND 40);

ALTER TABLE public.review_items
  DROP CONSTRAINT IF EXISTS review_items_week_number_check;
ALTER TABLE public.review_items
  ADD CONSTRAINT review_items_week_number_check CHECK (week_number BETWEEN 1 AND 40);

-- 2. Seed weeks 21-40 (idempotent) -------------------------------
DO $seed40$
DECLARE
  dep RECORD;
  wk INTEGER;
  l INTEGER;
  s_id UUID;
  topics TEXT[] := ARRAY['Greeting & Welcome', 'Service Sequence', 'Handling Requests', 'Farewell & Recovery'];
  topics_vi TEXT[] := ARRAY['Chào đón khách', 'Quy trình phục vụ', 'Xử lý yêu cầu', 'Tiễn khách & khắc phục'];
BEGIN
  IF (SELECT COUNT(*) FROM public.scenarios WHERE week_number > 20) > 0 THEN
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
    FOR wk IN 21..40 LOOP
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
$seed40$;

-- 3. Relocate the 12 authored weeks (pairwise week_number swap) ---
-- Matrix mapping: FO 1->17, 2->26 · FB 1->15, 2->31 · HK 1->15, 2->33
--                 SW 1->23, 2->19 · GR 1->27, 2->34 · BO 1->37, 2->38
-- Only run once: skip if FO week 17 already carries the authored title.
DO $relocate$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.scenarios
    WHERE department_id = 'FO' AND week_number = 17
      AND title_en = 'Standard Check-in & OTA Booking Verification'
  ) THEN
    RETURN;
  END IF;

  UPDATE public.scenarios SET week_number = CASE week_number WHEN 1 THEN 17 WHEN 17 THEN 1 END
    WHERE department_id = 'FO' AND week_number IN (1, 17);
  UPDATE public.scenarios SET week_number = CASE week_number WHEN 2 THEN 26 WHEN 26 THEN 2 END
    WHERE department_id = 'FO' AND week_number IN (2, 26);

  UPDATE public.scenarios SET week_number = CASE week_number WHEN 1 THEN 15 WHEN 15 THEN 1 END
    WHERE department_id = 'FB' AND week_number IN (1, 15);
  UPDATE public.scenarios SET week_number = CASE week_number WHEN 2 THEN 31 WHEN 31 THEN 2 END
    WHERE department_id = 'FB' AND week_number IN (2, 31);

  UPDATE public.scenarios SET week_number = CASE week_number WHEN 1 THEN 15 WHEN 15 THEN 1 END
    WHERE department_id = 'HK' AND week_number IN (1, 15);
  UPDATE public.scenarios SET week_number = CASE week_number WHEN 2 THEN 33 WHEN 33 THEN 2 END
    WHERE department_id = 'HK' AND week_number IN (2, 33);

  UPDATE public.scenarios SET week_number = CASE week_number WHEN 1 THEN 23 WHEN 23 THEN 1 END
    WHERE department_id = 'SW' AND week_number IN (1, 23);
  UPDATE public.scenarios SET week_number = CASE week_number WHEN 2 THEN 19 WHEN 19 THEN 2 END
    WHERE department_id = 'SW' AND week_number IN (2, 19);

  UPDATE public.scenarios SET week_number = CASE week_number WHEN 1 THEN 27 WHEN 27 THEN 1 END
    WHERE department_id = 'GR' AND week_number IN (1, 27);
  UPDATE public.scenarios SET week_number = CASE week_number WHEN 2 THEN 34 WHEN 34 THEN 2 END
    WHERE department_id = 'GR' AND week_number IN (2, 34);

  UPDATE public.scenarios SET week_number = CASE week_number WHEN 1 THEN 37 WHEN 37 THEN 1 END
    WHERE department_id = 'BO' AND week_number IN (1, 37);
  UPDATE public.scenarios SET week_number = CASE week_number WHEN 2 THEN 38 WHEN 38 THEN 2 END
    WHERE department_id = 'BO' AND week_number IN (2, 38);
END
$relocate$;

-- 4. Shared spine titles for weeks 1-14 + checkpoint weeks --------
-- (applies to every department — Phase 0/1 use one common spine)
UPDATE public.scenarios SET title_en = 'Alphabet, Names & Greetings',            title_vi = 'Bảng chữ cái, Đánh vần tên & Chào hỏi'       WHERE week_number = 1;
UPDATE public.scenarios SET title_en = 'Numbers, Rooms & Floors',                title_vi = 'Số đếm, Số phòng & Số tầng'                   WHERE week_number = 2;
UPDATE public.scenarios SET title_en = 'Times, Dates & Opening Hours',           title_vi = 'Giờ, Ngày & Giờ mở cửa dịch vụ'               WHERE week_number = 3;
UPDATE public.scenarios SET title_en = 'Prices, Money & Quantities',             title_vi = 'Giá cả, Tiền tệ & Số lượng'                   WHERE week_number = 4;
UPDATE public.scenarios SET title_en = 'Core Courtesy Phrases',                  title_vi = 'Cụm câu lịch sự cốt lõi'                      WHERE week_number = 5;
UPDATE public.scenarios SET title_en = 'Checkpoint — Survival Foundation',       title_vi = 'Kiểm tra tổng hợp — Nền tảng sống còn'        WHERE week_number = 6;
UPDATE public.scenarios SET title_en = 'People & Jobs in the Hotel',             title_vi = 'Con người & Công việc trong khách sạn'        WHERE week_number = 7;
UPDATE public.scenarios SET title_en = 'Places & Directions',                    title_vi = 'Vị trí & Chỉ đường trong khuôn viên'          WHERE week_number = 8;
UPDATE public.scenarios SET title_en = 'Simple Guest Requests',                  title_vi = 'Yêu cầu đơn giản của khách'                   WHERE week_number = 9;
UPDATE public.scenarios SET title_en = 'Describing Things & States',             title_vi = 'Mô tả đồ vật & Trạng thái'                    WHERE week_number = 10;
UPDATE public.scenarios SET title_en = 'Schedules & Shift Routines',             title_vi = 'Lịch trình & Thói quen ca làm'                WHERE week_number = 11;
UPDATE public.scenarios SET title_en = 'Answering the Phone',                    title_vi = 'Nghe điện thoại cơ bản'                       WHERE week_number = 12;
UPDATE public.scenarios SET title_en = 'Simple Problems & Apologies',            title_vi = 'Sự cố đơn giản & Xin lỗi'                     WHERE week_number = 13;
UPDATE public.scenarios SET title_en = 'Checkpoint — First Sentences',           title_vi = 'Kiểm tra tổng hợp — Giao tiếp câu đơn'        WHERE week_number = 14;
UPDATE public.scenarios SET title_en = 'Checkpoint — Core SOP Service',          title_vi = 'Kiểm tra tổng hợp — Nghiệp vụ chuẩn'          WHERE week_number = 22;
UPDATE public.scenarios SET title_en = 'Checkpoint — Proactive Service',         title_vi = 'Kiểm tra tổng hợp — Dịch vụ chủ động'         WHERE week_number = 30;
UPDATE public.scenarios SET title_en = 'Final Assessment — B1.1 Hospitality',    title_vi = 'Đánh giá cuối khóa — B1.1 nghiệp vụ'          WHERE week_number = 40;
