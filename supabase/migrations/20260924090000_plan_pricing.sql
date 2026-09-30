-- ============================================================
-- Bảng giá: một mức giá cho mỗi (gói × kỳ hạn), và số tiền THẬT
-- đã bán cho từng hợp đồng.
--
-- Vì sao tách làm hai chỗ:
--   * `plan_prices` là BẢNG GIÁ NIÊM YẾT — thứ Super Admin sửa một
--     lần rồi dùng cho mọi khách sạn. Đổi bảng giá không được phép
--     làm đổi số tiền của hợp đồng đã ký.
--   * `subscriptions.price` là SỐ TIỀN ĐÃ CHỐT của đúng hợp đồng đó.
--     Bán có chiết khấu là chuyện bình thường, và hoá đơn phải khớp
--     với cái đã ký chứ không khớp với bảng giá hôm nay.
--
-- Tiền để ở `numeric(14,2)` chứ không phải số thực: VND không có phần
-- lẻ nhưng numeric không làm tròn sai, và cột `currency` để sẵn cho
-- trường hợp bán cho resort nước ngoài.
-- ============================================================

create table if not exists public.plan_prices (
  plan_code text not null references public.plans (code) on delete cascade,
  term text not null check (term in ('trial', 'm3', 'm6', 'm9', 'm12')),
  price numeric(14, 2) not null default 0 check (price >= 0),
  currency text not null default 'VND',
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null,
  primary key (plan_code, term)
);

comment on table public.plan_prices is
  'Bảng giá niêm yết theo gói × kỳ hạn. Sửa ở /admin-console. Không ảnh hưởng hợp đồng đã ký.';

-- Dựng sẵn đủ 25 ô (5 gói × 5 kỳ hạn) với giá 0, để màn hình quản trị
-- luôn có một lưới đầy đủ để điền thay vì phải tự đoán ô nào còn thiếu.
-- Bản dùng thử để 0 và không sửa được ở giao diện — nó miễn phí theo
-- đúng điều đã chốt với khách hàng đầu tiên.
insert into public.plan_prices (plan_code, term, price)
select p.code, t.term, 0
  from public.plans p
 cross join (values ('trial'), ('m3'), ('m6'), ('m9'), ('m12')) as t (term)
on conflict (plan_code, term) do nothing;

-- Số tiền đã chốt của chính hợp đồng này. Null = hợp đồng cũ có trước
-- khi có bảng giá; đừng suy ra 0, vì 0 nghĩa là "miễn phí" chứ không
-- phải "không biết".
alter table public.subscriptions
  add column if not exists price numeric(14, 2) check (price is null or price >= 0);
alter table public.subscriptions
  add column if not exists currency text not null default 'VND';

comment on column public.subscriptions.price is
  'Số tiền đã chốt cho hợp đồng này. NULL = hợp đồng có trước bảng giá.';

-- ── Row level security ──────────────────────────────────────
alter table public.plan_prices enable row level security;

-- Ai đăng nhập cũng đọc được bảng giá: màn hình tạo khách sạn và màn
-- hình gia hạn đều cần nó để điền sẵn số tiền, và giá niêm yết không
-- phải bí mật.
drop policy if exists "Anyone signed in can read plan prices" on public.plan_prices;
create policy "Anyone signed in can read plan prices"
  on public.plan_prices for select to authenticated using (true);

drop policy if exists "Super admins manage plan prices" on public.plan_prices;
create policy "Super admins manage plan prices"
  on public.plan_prices for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());
