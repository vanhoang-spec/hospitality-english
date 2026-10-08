// Creating an account has three doors now: HR types a learner in, a
// learner opens their hotel's signup link, a hotel opens the link the
// platform owner sent it. They must enforce the same limits — seats, a
// live contract, five HR at most — so the doors share one hallway.
//
// Server-only (service role). Server functions import it dynamically
// inside their handlers, the same way they import client.server, so it
// never reaches the browser bundle.
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const MAX_ORG_ADMINS = 5;

const TERM_MONTHS: Record<string, number> = { trial: 1, m3: 3, m6: 6, m9: 9, m12: 12 };

export function endsAt(kind: string, from: Date): string {
  const months = TERM_MONTHS[kind] ?? 1;
  const end = new Date(from);
  end.setMonth(end.getMonth() + months);
  return end.toISOString();
}

export function friendlyAuthError(message: string): string {
  if (/phone_exists|already registered/i.test(message)) {
    return "Số điện thoại này đã được đăng ký trong hệ thống.";
  }
  if (/SEAT_QUOTA_EXCEEDED/.test(message)) {
    return "Nhóm đã đạt giới hạn số lượng thành viên.";
  }
  // Supabase Auth hides the trigger's own message behind this one. The
  // trigger that most often says no is the seat quota — two people taking
  // the last seat in the same second, past the friendly pre-check.
  if (/database error (creating|saving) new user/i.test(message)) {
    return "Không tạo được tài khoản — khách sạn có thể vừa dùng hết chỗ học viên. Hãy báo bộ phận nhân sự.";
  }
  return message;
}

/** Who did what to whom. Written with the service role, so a browser can
 *  never forge or erase a line; HR reads it back through RLS. */
export async function logAdminAction(entry: {
  actorId: string | null;
  orgId: string | null;
  action: string;
  targetUserId?: string;
  meta?: Record<string, unknown>;
}) {
  await supabaseAdmin.from("admin_actions").insert({
    actor_id: entry.actorId,
    org_id: entry.orgId,
    action: entry.action,
    target_user_id: entry.targetUserId ?? null,
    meta: (entry.meta ?? {}) as never,
  });
}

/** Something the CRM should hear about, written to crm_events for it to
 *  pull (contract: docs/TICH_HOP_HOSPITALITY.md in the CRM repo).
 *
 *  Called after the sign-up has already succeeded, so it never throws: a
 *  learner who has an account must not be told the sign-up failed because
 *  a log row did not land. A failure is recorded in admin_actions with the
 *  whole event, so it can be replayed by hand. */
export async function recordCrmEvent(
  loai: "khach_san_dang_ky" | "ca_nhan_dang_ky" | "don_cap_nhat" | "don_gia_han",
  du_lieu: Record<string, unknown>,
  orgId: string | null,
) {
  const { error } = await supabaseAdmin
    .from("crm_events")
    .insert({ loai, du_lieu: du_lieu as never });
  if (error) {
    console.error(`crm_events ${loai}: ${error.message}`);
    await logAdminAction({
      actorId: null,
      orgId,
      action: "crm.event_failed",
      meta: { loai, du_lieu, error: error.message },
    }).catch(() => undefined);
  }
}

/** A lapsed hotel may still be read and reported on; it may not take on
 *  new learners. The same rule is a RESTRICTIVE policy on the progress
 *  tables, so an expired org cannot record learning either. */
export async function requireActiveSubscription(orgId: string) {
  const { data, error } = await supabaseAdmin.rpc("org_is_active", { target: orgId });
  if (error) throw new Error(error.message);
  if (data === false) {
    throw new Error("Gói của khách sạn đã hết hạn. Vui lòng gia hạn trước khi thêm học viên.");
  }
}

/** Seats left for learners, or null when the limit is unknown. */
export async function seatsLeft(orgId: string): Promise<number | null> {
  const { data: seatLimit } = await supabaseAdmin.rpc("org_seat_limit", { target: orgId });
  if (typeof seatLimit !== "number") return null;
  const { count } = await supabaseAdmin
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("org_id", orgId)
    .eq("role", "member");
  return Math.max(seatLimit - (count ?? 0), 0);
}

/** Giá niêm yết của (gói × kỳ hạn) tại thời điểm ký. Trả về null nếu
 *  chưa ai điền bảng giá — null nghĩa là "chưa biết", khác hẳn 0 là
 *  "miễn phí", nên đừng thay bằng 0. */
export async function listPrice(planCode: string, term: string): Promise<number | null> {
  const { data } = await supabaseAdmin
    .from("plan_prices")
    .select("price")
    .eq("plan_code", planCode)
    .eq("term", term)
    .maybeSingle();
  if (!data) return null;
  const n = Number((data as { price: number | string }).price);
  return Number.isFinite(n) ? n : null;
}

/** Create one account inside a hotel. `phone` must already be normalised.
 *
 *  Identity (org, role, department) goes into app_metadata, which only
 *  the service role can write — that is what handle_new_user reads. It is
 *  ALSO written to user_metadata, because production still runs the old
 *  trigger until migration 20260929090000 is applied, and an account
 *  created in between must not land with no hotel. */
export async function provisionMember(input: {
  orgId: string;
  phone: string;
  fullName: string;
  password: string;
  role: "member" | "org_admin";
  department?: string | null;
  mustChangePassword: boolean;
  actorId: string | null;
  action: string;
  meta?: Record<string, unknown>;
}): Promise<string> {
  if (input.role === "org_admin") {
    const { count: adminCount } = await supabaseAdmin
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("org_id", input.orgId)
      .eq("role", "org_admin");
    if ((adminCount ?? 0) >= MAX_ORG_ADMINS) {
      throw new Error(`Nhóm đã đạt tối đa ${MAX_ORG_ADMINS} admin.`);
    }
  }

  await requireActiveSubscription(input.orgId);

  // Friendly pre-check for UX; the DB trigger (enforce_seat_quota) is the
  // hard, race-safe backstop that actually protects the limit. Both count
  // LEARNERS only — an HR account is not a seat the hotel pays for.
  if (input.role === "member") {
    const left = await seatsLeft(input.orgId);
    if (left === 0) {
      throw new Error("Khách sạn đã dùng hết chỗ học viên của gói.");
    }
  }

  const identity = {
    org_id: input.orgId,
    role: input.role,
    department: input.department ?? null,
  };
  const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
    phone: input.phone,
    password: input.password,
    phone_confirm: true,
    user_metadata: { full_name: input.fullName, ...identity },
    app_metadata: identity,
  });
  if (error || !created.user) {
    throw new Error(friendlyAuthError(error?.message ?? "Tạo tài khoản thất bại."));
  }

  if (input.mustChangePassword) {
    await supabaseAdmin
      .from("profiles")
      .update({ must_change_password: true })
      .eq("id", created.user.id);
  }

  await logAdminAction({
    actorId: input.actorId ?? created.user.id,
    orgId: input.orgId,
    action: input.action,
    targetUserId: created.user.id,
    meta: { role: input.role, department: input.department ?? null, ...input.meta },
  });

  return created.user.id;
}

/** Create a hotel, its company details, its contract, and its first HR
 *  account. The HR person is the hotel's representative, so the details row
 *  takes their name and phone; `company` adds what the licence says and the
 *  representative's email (validated by newOrgDetailsSchema in
 *  org-details.ts before it gets here).
 *
 *  If the HR account cannot be created (the phone is already registered,
 *  most often) the hotel row is removed again — otherwise every retry
 *  would leave an empty hotel with a live contract behind it. The details
 *  and the contract go with it (on delete cascade). */
export async function provisionOrganization(input: {
  name: string;
  planCode: string;
  term: string;
  price: number | null | undefined;
  hrPhone: string;
  hrFullName: string;
  hrPassword: string;
  company: { legalName: string; address: string; taxCode: string; repEmail: string };
  mustChangePassword: boolean;
  actorId: string | null;
  action: string;
  meta?: Record<string, unknown>;
  /** A free period of this many days instead of the default month: a
   *  partner link's trial, or a CRM invitation (trial or gift). */
  trialDays?: number;
  /** What the free period is called: 'trial' (default) or 'gift' (a CRM
   *  invitation for a hotel already learning with Embassy). */
  freeKind?: "trial" | "gift";
  /** The link the hotel signed up through, its partner, and — for a CRM
   *  invitation — the CRM's customer id, handed back in the event. */
  signupLink?: {
    id: string;
    partnerId: string | null;
    crmRef: string | null;
    crmCustomerRef?: string | null;
  };
}): Promise<{ orgId: string; hrUserId: string }> {
  const { data: plan, error: planErr } = await supabaseAdmin
    .from("plans")
    .select("seats")
    .eq("code", input.planCode)
    .single();
  if (planErr || !plan) throw new Error("Gói không hợp lệ.");

  // seat_limit stays in step with the plan so the legacy fallback in
  // org_seat_limit() never disagrees with the subscription.
  const { data: org, error: orgErr } = await supabaseAdmin
    .from("organizations")
    .insert({
      name: input.name,
      seat_limit: plan.seats,
      signup_link_id: input.signupLink?.id ?? null,
      partner_id: input.signupLink?.partnerId ?? null,
    })
    .select("id")
    .single();
  if (orgErr || !org) throw new Error(orgErr?.message ?? "Không tạo được khách sạn.");

  const undo = async () => {
    await supabaseAdmin.from("organizations").delete().eq("id", org.id);
  };

  const { error: detailsErr } = await supabaseAdmin.from("org_details").insert({
    org_id: org.id,
    legal_name: input.company.legalName,
    address: input.company.address,
    tax_code: input.company.taxCode,
    rep_name: input.hrFullName,
    rep_phone: input.hrPhone,
    rep_email: input.company.repEmail,
    updated_by: input.actorId,
  });
  if (detailsErr) {
    await undo();
    throw new Error(detailsErr.message);
  }

  const now = new Date();
  const trial = input.trialDays !== undefined;
  const agreed = trial ? 0 : (input.price ?? (await listPrice(input.planCode, input.term)));
  const ends = trial
    ? new Date(now.getTime() + input.trialDays! * 24 * 60 * 60 * 1000).toISOString()
    : endsAt(input.term, now);
  const { error: subErr } = await supabaseAdmin.from("subscriptions").insert({
    org_id: org.id,
    plan_code: input.planCode,
    kind: trial ? (input.freeKind ?? "trial") : input.term,
    // A minute early, for the clock reason given in provisionIndividual:
    // the HR account is created seconds from now and checks this row.
    starts_at: new Date(now.getTime() - 60_000).toISOString(),
    ends_at: ends,
    price: agreed,
    created_by: input.actorId,
  });
  if (subErr) {
    await undo();
    throw new Error(subErr.message);
  }

  const identity = { org_id: org.id, role: "org_admin" as const };
  const { data: created, error: userErr } = await supabaseAdmin.auth.admin.createUser({
    phone: input.hrPhone,
    password: input.hrPassword,
    phone_confirm: true,
    user_metadata: { full_name: input.hrFullName, ...identity },
    app_metadata: identity,
  });
  if (userErr || !created.user) {
    await undo();
    throw new Error(friendlyAuthError(userErr?.message ?? "Không tạo được tài khoản HR."));
  }

  if (input.mustChangePassword) {
    await supabaseAdmin
      .from("profiles")
      .update({ must_change_password: true })
      .eq("id", created.user.id);
  }

  await logAdminAction({
    actorId: input.actorId ?? created.user.id,
    orgId: org.id,
    action: input.action,
    targetUserId: created.user.id,
    meta: { plan: input.planCode, term: input.term, price: agreed, ...input.meta },
  });

  await recordCrmEvent(
    "khach_san_dang_ky",
    {
      app_org_id: org.id,
      link_crm_ref: input.signupLink?.crmRef ?? null,
      khach_crm_id: input.signupLink?.crmCustomerRef ?? null,
      ten_khach_san: input.name,
      cong_ty: {
        ten: input.company.legalName,
        mst: input.company.taxCode,
        dia_chi: input.company.address,
      },
      dai_dien: { ten: input.hrFullName, sdt: input.hrPhone, email: input.company.repEmail },
      goi: input.planCode,
      ky_han: trial ? (input.freeKind ?? "trial") : input.term,
      het_han: ends,
    },
    org.id,
  );

  return { orgId: org.id, hrUserId: created.user.id };
}

// ── One learner, buying for themself ─────────────────────────

/** What goes in the transfer note: "EH" and six characters without
 *  look-alikes (no 0/O, 1/I/L), so it survives being read off a phone and
 *  typed into a banking app. */
/** The page a learner (or CS, over Zalo) opens to pay an order without
 *  signing in: amount, order code, QR. APP_ORIGIN overrides the live
 *  domain for previews. */
export function payUrl(payToken: string): string {
  const origin = process.env.APP_ORIGIN || "https://hospitality.embassy.edu.vn";
  return `${origin}/tt/${payToken}`;
}

function newOrderCode(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  let out = "EH";
  for (const b of bytes) out += chars[b % chars.length];
  return out;
}

/** Price one retail term: list price of p1 less the discount, rounded up
 *  to 10,000 VND. Throws if the owner has no list price for that term —
 *  an order must never be written for an amount nobody set. */
export async function retailQuote(term: string, discount: { pct: number; amount: number }) {
  const { retailAmount } = await import("@/lib/retail-pricing");
  const list = await listPrice("p1", term);
  if (list === null || list <= 0) {
    throw new Error("Chưa có giá bán lẻ cho gói này. Vui lòng báo quản trị viên.");
  }
  return { listPrice: list, amount: retailAmount(list, discount.pct, discount.amount) };
}

/** A retail learner: a one-seat organisation of kind 'individual', on a
 *  trial that starts now, with the account inside it and one open order.
 *
 *  Every step after the organisation is undone if a later one fails —
 *  most often the phone is already registered — so a retry never leaves
 *  an empty organisation with a live trial behind. */
export async function provisionIndividual(input: {
  fullName: string;
  phone: string;
  password: string;
  department: string;
  term: string;
  partnerId: string;
  linkId: string;
  /** The CRM's id for the link, when the CRM made it. */
  linkCrmRef: string | null;
  discount: { pct: number; amount: number };
  trialDays: number;
}): Promise<{ orderCode: string; amount: number }> {
  const quote = await retailQuote(input.term, input.discount);

  const { data: org, error: orgErr } = await supabaseAdmin
    .from("organizations")
    .insert({
      name: `Cá nhân · ${input.fullName}`,
      seat_limit: 1,
      kind: "individual",
      partner_id: input.partnerId,
    })
    .select("id")
    .single();
  if (orgErr || !org) throw new Error(orgErr?.message ?? "Không tạo được tài khoản.");

  const undo = async () => {
    await supabaseAdmin.from("organizations").delete().eq("id", org.id);
  };

  try {
    const now = new Date();
    const trialEnd = new Date(now.getTime() + input.trialDays * 24 * 60 * 60 * 1000);
    const { error: subErr } = await supabaseAdmin.from("subscriptions").insert({
      org_id: org.id,
      plan_code: "p1",
      kind: "trial",
      // A minute early: org_is_active() compares against the DATABASE
      // clock, and provisionMember checks it seconds from now. If this
      // server ran a few seconds ahead, the trial would not have "started"
      // yet and the signup would be refused as an expired plan.
      starts_at: new Date(now.getTime() - 60_000).toISOString(),
      ends_at: trialEnd.toISOString(),
      price: 0,
    });
    if (subErr) throw new Error(subErr.message);

    // They chose this password themselves: no forced change at first login.
    const userId = await provisionMember({
      orgId: org.id,
      phone: input.phone,
      fullName: input.fullName,
      password: input.password,
      role: "member",
      department: input.department,
      mustChangePassword: false,
      actorId: null,
      action: "member.signup_retail",
      meta: { link_id: input.linkId, partner_id: input.partnerId },
    });

    // The code is random; on the rare collision, draw again.
    for (let attempt = 0; attempt < 5; attempt++) {
      const code = newOrderCode();
      const { data: placed, error } = await supabaseAdmin
        .from("orders")
        .insert({
          code,
          org_id: org.id,
          user_id: userId,
          partner_id: input.partnerId,
          link_id: input.linkId,
          plan_code: "p1",
          term: input.term,
          list_price: quote.listPrice,
          discount_pct: input.discount.pct,
          discount_amount: input.discount.amount,
          amount: quote.amount,
        })
        .select("pay_token")
        .single();
      if (!error && placed) {
        await recordCrmEvent(
          "ca_nhan_dang_ky",
          {
            app_org_id: org.id,
            app_user_id: userId,
            link_crm_ref: input.linkCrmRef,
            ho_ten: input.fullName,
            sdt: input.phone,
            bo_phan: input.department,
            hoc_thu_den: trialEnd.toISOString(),
            don: {
              ma_don: code,
              ky_han: input.term,
              gia_niem_yet: quote.listPrice,
              giam: { phan_tram: input.discount.pct, so_tien: input.discount.amount },
              so_tien: quote.amount,
              link_thanh_toan: payUrl(placed.pay_token),
            },
          },
          org.id,
        );
        return { orderCode: code, amount: quote.amount };
      }
      if (error && !/duplicate key|unique/i.test(error.message)) throw new Error(error.message);
    }
    throw new Error("Không tạo được mã đơn hàng. Vui lòng thử lại.");
  } catch (e) {
    // Removing the organisation cascades to its subscription and order;
    // the auth account, if one was made, goes separately.
    const { data: members } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("org_id", org.id);
    for (const m of members ?? []) await supabaseAdmin.auth.admin.deleteUser(m.id);
    await undo();
    throw e;
  }
}

/** Mark an order paid and give the learner their term.
 *
 *  The paid term starts now and ends that many months after whichever is
 *  later — now, or the end of the time they already have — so paying on
 *  day two of a seven-day trial does not throw away the other five. The
 *  order is flipped first, conditionally, so two clicks cannot both run. */
export async function activateOrder(input: {
  orderId: string;
  /** null when the CRM confirmed the money (the CRM records who). */
  actorId: string | null;
  paymentRef?: string | null;
  /** The CRM's id for the confirmation — the order keeps it, so the CRM
   *  sending the same confirmation twice is recognised. */
  crmRef?: string | null;
}): Promise<{ endsAt: string }> {
  const nowIso = new Date().toISOString();
  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .update({
      status: "paid",
      paid_at: nowIso,
      confirmed_by: input.actorId,
      payment_ref: input.paymentRef ?? null,
      crm_ref: input.crmRef ?? null,
    })
    .eq("id", input.orderId)
    .eq("status", "pending")
    .select("id, org_id, plan_code, term, amount, code")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!order) throw new Error("Đơn này không còn ở trạng thái chờ thanh toán.");

  const { data: current } = await supabaseAdmin
    .from("subscriptions")
    .select("id, ends_at")
    .eq("org_id", order.org_id)
    .eq("status", "active")
    .maybeSingle();

  const now = new Date();
  const base =
    current?.ends_at && new Date(current.ends_at) > now ? new Date(current.ends_at) : now;
  const end = endsAt(order.term, base);

  if (current) {
    await supabaseAdmin.from("subscriptions").update({ status: "cancelled" }).eq("id", current.id);
  }
  const { error: subErr } = await supabaseAdmin.from("subscriptions").insert({
    org_id: order.org_id,
    plan_code: order.plan_code,
    kind: order.term,
    // A minute early, for the same clock reason as the trial above.
    starts_at: new Date(now.getTime() - 60_000).toISOString(),
    ends_at: end,
    price: Number(order.amount),
    created_by: input.actorId,
  });
  if (subErr) {
    // Put the order back so it can be confirmed again once fixed.
    await supabaseAdmin
      .from("orders")
      .update({
        status: "pending",
        paid_at: null,
        confirmed_by: null,
        payment_ref: null,
        crm_ref: null,
      })
      .eq("id", order.id);
    if (current) {
      await supabaseAdmin.from("subscriptions").update({ status: "active" }).eq("id", current.id);
    }
    throw new Error(subErr.message);
  }

  await logAdminAction({
    actorId: input.actorId,
    orgId: order.org_id,
    action: "order.paid",
    meta: {
      order_id: order.id,
      code: order.code,
      term: order.term,
      amount: Number(order.amount),
      payment_ref: input.paymentRef ?? null,
      ends_at: end,
    },
  });

  return { endsAt: end };
}

/** Open the renewal orders that are due (owner, 07/10/2026).
 *
 *  A learner whose paid term ends within RENEW_BEFORE_DAYS gets one
 *  renewal order: the term they bought last time, today's list price, and
 *  their link's discount only while that offer still runs. While it waits
 *  for payment they keep learning until RENEW_GRACE_DAYS after the term
 *  ended (org_is_active reads grace_until). The CRM hears about it
 *  (don_gia_han) with the payment link, for CS to send over Zalo.
 *
 *  Without `orgId` (the daily cron): every learner whose term ends within
 *  the window or ended less than the grace ago. With `orgId` (the learner
 *  opening the app): that learner, however long ago the term ended — a
 *  learner who comes back after months still finds an order to pay.
 *
 *  Safe to run any number of times: one pending order per learner is a
 *  unique index, and the loser of a race simply finds the order there. */
export async function createDueRenewals(
  opts: { orgId?: string; now?: Date } = {},
): Promise<number> {
  const { RENEW_BEFORE_DAYS, RENEW_GRACE_DAYS, renewalDiscount } =
    await import("@/lib/retail-pricing");
  const now = opts.now ?? new Date();
  const day = 86_400_000;
  let query = supabaseAdmin
    .from("subscriptions")
    .select("org_id, ends_at, organizations!inner(kind)")
    .eq("status", "active")
    .eq("organizations.kind", "individual")
    .neq("kind", "trial")
    .lte("ends_at", new Date(now.getTime() + RENEW_BEFORE_DAYS * day).toISOString());
  query = opts.orgId
    ? query.eq("org_id", opts.orgId)
    : query.gt("ends_at", new Date(now.getTime() - RENEW_GRACE_DAYS * day).toISOString());
  const { data: subs, error } = await query;
  if (error) throw new Error(error.message);

  let made = 0;
  for (const sub of subs ?? []) {
    const { data: orders } = await supabaseAdmin
      .from("orders")
      .select("status, term, user_id, partner_id, link_id")
      .eq("org_id", sub.org_id)
      .order("created_at", { ascending: false });
    if ((orders ?? []).some((o) => o.status === "pending")) continue;
    // Never paid at all: the first order is still the one to pay.
    const last = (orders ?? []).find((o) => o.status === "paid");
    if (!last) continue;

    const { data: link } = last.link_id
      ? await supabaseAdmin
          .from("signup_links")
          .select("discount_pct, discount_amount, discount_scope, expires_at, revoked_at, crm_ref")
          .eq("id", last.link_id)
          .maybeSingle()
      : { data: null };
    const discount = renewalDiscount(link, now);
    let quote: { listPrice: number; amount: number };
    try {
      quote = await retailQuote(last.term, discount);
    } catch {
      continue; // no list price for that term today: nothing to sell yet
    }
    const graceUntil = new Date(new Date(sub.ends_at).getTime() + RENEW_GRACE_DAYS * day);

    for (let attempt = 0; attempt < 5; attempt++) {
      const code = newOrderCode();
      const { data: placed, error: insertErr } = await supabaseAdmin
        .from("orders")
        .insert({
          code,
          org_id: sub.org_id,
          user_id: last.user_id,
          partner_id: last.partner_id,
          link_id: last.link_id,
          plan_code: "p1",
          term: last.term,
          list_price: quote.listPrice,
          discount_pct: discount.pct,
          discount_amount: discount.amount,
          amount: quote.amount,
          kind: "renewal",
          grace_until: graceUntil.toISOString(),
        })
        .select("pay_token")
        .single();
      if (insertErr || !placed) {
        const message = insertErr?.message ?? "no row";
        if (/orders_one_pending_per_org/.test(message)) break; // made meanwhile
        if (/duplicate key|unique/i.test(message)) continue; // order code collision
        throw new Error(message);
      }
      made++;
      const { data: who } = last.user_id
        ? await supabaseAdmin
            .from("profiles")
            .select("full_name, phone")
            .eq("id", last.user_id)
            .maybeSingle()
        : { data: null };
      await recordCrmEvent(
        "don_gia_han",
        {
          app_org_id: sub.org_id,
          app_user_id: last.user_id,
          link_crm_ref: link?.crm_ref ?? null,
          ho_ten: who?.full_name ?? null,
          sdt: who?.phone ? `+${who.phone.replace(/^\+/, "")}` : null,
          het_han_cu: sub.ends_at,
          an_han_den: graceUntil.toISOString(),
          don: {
            ma_don: code,
            ky_han: last.term,
            gia_niem_yet: quote.listPrice,
            giam: { phan_tram: discount.pct, so_tien: discount.amount },
            so_tien: quote.amount,
            link_thanh_toan: payUrl(placed.pay_token),
          },
        },
        sub.org_id,
      );
      break;
    }
  }
  return made;
}
