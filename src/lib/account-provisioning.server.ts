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

/** Create a hotel, its contract, and its first HR account.
 *
 *  If the HR account cannot be created (the phone is already registered,
 *  most often) the hotel row is removed again — otherwise every retry
 *  would leave an empty hotel with a live contract behind it. */
export async function provisionOrganization(input: {
  name: string;
  planCode: string;
  term: string;
  price: number | null | undefined;
  hrPhone: string;
  hrFullName: string;
  hrPassword: string;
  mustChangePassword: boolean;
  actorId: string | null;
  action: string;
  meta?: Record<string, unknown>;
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
    .insert({ name: input.name, seat_limit: plan.seats })
    .select("id")
    .single();
  if (orgErr || !org) throw new Error(orgErr?.message ?? "Không tạo được khách sạn.");

  const undo = async () => {
    await supabaseAdmin.from("organizations").delete().eq("id", org.id);
  };

  const now = new Date();
  const agreed = input.price ?? (await listPrice(input.planCode, input.term));
  const { error: subErr } = await supabaseAdmin.from("subscriptions").insert({
    org_id: org.id,
    plan_code: input.planCode,
    kind: input.term,
    starts_at: now.toISOString(),
    ends_at: endsAt(input.term, now),
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

  return { orgId: org.id, hrUserId: created.user.id };
}

// ── One learner, buying for themself ─────────────────────────

/** What goes in the transfer note: "EH" and six characters without
 *  look-alikes (no 0/O, 1/I/L), so it survives being read off a phone and
 *  typed into a banking app. */
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
export async function retailQuote(term: string, discountPct: number) {
  const { retailAmount } = await import("@/lib/retail-pricing");
  const list = await listPrice("p1", term);
  if (list === null || list <= 0) {
    throw new Error("Chưa có giá bán lẻ cho gói này. Vui lòng báo quản trị viên.");
  }
  return { listPrice: list, amount: retailAmount(list, discountPct) };
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
  discountPct: number;
  trialDays: number;
}): Promise<{ orderCode: string; amount: number }> {
  const quote = await retailQuote(input.term, input.discountPct);

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
      const { error } = await supabaseAdmin.from("orders").insert({
        code,
        org_id: org.id,
        user_id: userId,
        partner_id: input.partnerId,
        link_id: input.linkId,
        plan_code: "p1",
        term: input.term,
        list_price: quote.listPrice,
        discount_pct: input.discountPct,
        amount: quote.amount,
      });
      if (!error) return { orderCode: code, amount: quote.amount };
      if (!/duplicate key|unique/i.test(error.message)) throw new Error(error.message);
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
  actorId: string;
  paymentRef?: string | null;
}): Promise<{ endsAt: string }> {
  const nowIso = new Date().toISOString();
  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .update({
      status: "paid",
      paid_at: nowIso,
      confirmed_by: input.actorId,
      payment_ref: input.paymentRef ?? null,
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
      .update({ status: "pending", paid_at: null, confirmed_by: null, payment_ref: null })
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
