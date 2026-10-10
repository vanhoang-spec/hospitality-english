// Retail billing: what a learner who bought for themself sees and can
// change, and what the platform owner does when the money has arrived.
//
// Nothing here moves money. Until the partner's payment feature is wired
// in, the learner transfers to the company account using the order code
// as the note, and the owner confirms the order in the console.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireSuperAdmin } from "@/lib/platform-admin-actions";

export type RetailOption = { term: string; months: number; listPrice: number; amount: number };

export type MyBilling =
  | { individual: false }
  | {
      individual: true;
      partnerName: string | null;
      subscription: { kind: string; endsAt: string; active: boolean } | null;
      order: {
        id: string;
        code: string;
        term: string;
        amount: number;
        listPrice: number;
        discountPct: number;
        discountAmount: number;
        status: string;
        paidAt: string | null;
        /** 'first' or 'renewal'. */
        kind: string;
        /** A renewal: the learner keeps learning until this while it waits. */
        graceUntil: string | null;
        /** The page that shows how to pay without signing in. */
        payUrl: string;
      } | null;
      /** Terms the open order can be switched to, at its own discount. */
      options: RetailOption[];
      /** Where to send the money; null until the owner has entered it. */
      account: {
        bankName: string;
        bankBin: string | null;
        accountNo: string;
        accountName: string;
      } | null;
    };

async function callerOrg(
  supabase: Parameters<typeof requireSuperAdmin>[0],
  userId: string,
): Promise<string | null> {
  const { data } = await supabase.from("profiles").select("org_id").eq("id", userId).single();
  return data?.org_id ?? null;
}

export const getMyBilling = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MyBilling> => {
    const orgId = await callerOrg(context.supabase, context.userId);
    if (!orgId) return { individual: false };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: org } = await supabaseAdmin
      .from("organizations")
      .select("kind, partner_id")
      .eq("id", orgId)
      .single();
    if (!org || org.kind !== "individual") return { individual: false };

    // A learner opening the app near or after the end of their term finds
    // the renewal order already there (the daily cron makes it too). A
    // failure here must not hide the page that tells them how to pay.
    const { createDueRenewals, payUrl } = await import("@/lib/account-provisioning.server");
    await createDueRenewals({ orgId }).catch((e) => console.error("renewal:", e));

    const [{ data: partner }, { data: sub }, { data: orders }, { data: acct }] = await Promise.all([
      org.partner_id
        ? supabaseAdmin.from("partners").select("name").eq("id", org.partner_id).maybeSingle()
        : Promise.resolve({ data: null }),
      supabaseAdmin
        .from("subscriptions")
        .select("kind, ends_at")
        .eq("org_id", orgId)
        .eq("status", "active")
        .maybeSingle(),
      supabaseAdmin
        .from("orders")
        .select(
          "id, code, term, amount, list_price, discount_pct, discount_amount, status, paid_at, created_at, kind, grace_until, pay_token",
        )
        .eq("org_id", orgId)
        .neq("status", "cancelled")
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("payment_accounts")
        .select("bank_name, bank_bin, account_no, account_name")
        .eq("id", 1)
        .maybeSingle(),
    ]);

    // The open order if there is one; otherwise the last one paid.
    const rows = orders ?? [];
    const row = rows.find((o) => o.status === "pending") ?? rows[0] ?? null;
    const order = row
      ? {
          id: row.id,
          code: row.code,
          term: row.term,
          amount: Number(row.amount),
          listPrice: Number(row.list_price),
          discountPct: Number(row.discount_pct),
          discountAmount: Number(row.discount_amount),
          status: row.status,
          paidAt: row.paid_at,
          kind: row.kind,
          graceUntil: row.grace_until,
          payUrl: payUrl(row.pay_token),
        }
      : null;

    const options: RetailOption[] = [];
    if (order?.status === "pending") {
      const { retailQuote } = await import("@/lib/account-provisioning.server");
      const { RETAIL_TERMS, RETAIL_TERM_MONTHS } = await import("@/lib/retail-pricing");
      for (const term of RETAIL_TERMS) {
        try {
          const q = await retailQuote(term, {
            pct: order.discountPct,
            amount: order.discountAmount,
          });
          options.push({ term, months: RETAIL_TERM_MONTHS[term], ...q });
        } catch {
          /* no list price for this term */
        }
      }
    }

    return {
      individual: true,
      partnerName: (partner as { name: string } | null)?.name ?? null,
      subscription: sub
        ? { kind: sub.kind, endsAt: sub.ends_at, active: new Date(sub.ends_at) > new Date() }
        : null,
      order,
      options,
      account:
        acct?.account_no && acct.account_name
          ? {
              bankName: acct.bank_name ?? "",
              bankBin: acct.bank_bin,
              accountNo: acct.account_no,
              accountName: acct.account_name,
            }
          : null,
    };
  });

/** Switch the open order to another term, at the discount it was opened
 *  with — a learner who signed up during the offer keeps it. */
export const changeMyOrderTerm = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ term: z.enum(["m3", "m6", "m9", "m12"]) }))
  .handler(async ({ data, context }) => {
    const orgId = await callerOrg(context.supabase, context.userId);
    if (!orgId) throw new Error("Không tìm thấy tài khoản.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { retailQuote, recordCrmEvent } = await import("@/lib/account-provisioning.server");

    const { data: order } = await supabaseAdmin
      .from("orders")
      .select("id, code, discount_pct, discount_amount")
      .eq("org_id", orgId)
      .eq("status", "pending")
      .maybeSingle();
    if (!order) throw new Error("Không có đơn nào đang chờ thanh toán.");

    const q = await retailQuote(data.term, {
      pct: Number(order.discount_pct),
      amount: Number(order.discount_amount),
    });
    const { data: changed, error } = await supabaseAdmin
      .from("orders")
      .update({ term: data.term, list_price: q.listPrice, amount: q.amount })
      .eq("id", order.id)
      .eq("status", "pending")
      .select("id")
      .maybeSingle();
    if (error) throw new Error(error.message);
    // The CRM holds a copy of the order for its accountant: the amount it
    // expects on the bank statement has just changed.
    if (changed) {
      await recordCrmEvent(
        "don_cap_nhat",
        { ma_don: order.code, ky_han: data.term, gia_niem_yet: q.listPrice, so_tien: q.amount },
        orgId,
      );
    }
    return { amount: q.amount };
  });

// ── Paying without signing in ────────────────────────────────

export type PublicOrder =
  | { ok: false }
  | {
      ok: true;
      code: string;
      term: string;
      amount: number;
      listPrice: number;
      status: string;
      kind: string;
      graceUntil: string | null;
      account: {
        bankName: string;
        bankBin: string | null;
        accountNo: string;
        accountName: string;
      } | null;
    };

/** The order behind a payment link (/tt/<token>) — what CS sends over
 *  Zalo. Public: the 122-bit token is the permission, and the answer holds
 *  only what a bank transfer needs. Never the learner's name or phone. */
export const getPublicOrder = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string().regex(/^[0-9a-f]{32}$/) }))
  .handler(async ({ data }): Promise<PublicOrder> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [{ data: order }, { data: acct }] = await Promise.all([
      supabaseAdmin
        .from("orders")
        .select("code, term, amount, list_price, status, kind, grace_until")
        .eq("pay_token", data.token)
        .maybeSingle(),
      supabaseAdmin
        .from("payment_accounts")
        .select("bank_name, bank_bin, account_no, account_name")
        .eq("id", 1)
        .maybeSingle(),
    ]);
    if (!order || order.status === "cancelled") return { ok: false };
    return {
      ok: true,
      code: order.code,
      term: order.term,
      amount: Number(order.amount),
      listPrice: Number(order.list_price),
      status: order.status,
      kind: order.kind,
      graceUntil: order.grace_until,
      account:
        acct?.account_no && acct.account_name
          ? {
              bankName: acct.bank_name ?? "",
              bankBin: acct.bank_bin,
              accountNo: acct.account_no,
              accountName: acct.account_name,
            }
          : null,
    };
  });

// ── Platform owner ───────────────────────────────────────────

export const confirmOrderPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      orderId: z.string().uuid(),
      paymentRef: z.string().trim().max(120).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    await requireSuperAdmin(context.supabase, context.userId);
    const { activateOrder } = await import("@/lib/account-provisioning.server");
    return activateOrder({
      orderId: data.orderId,
      actorId: context.userId,
      paymentRef: data.paymentRef || null,
    });
  });

export const setPaymentAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      bankName: z.string().trim().min(2).max(120),
      bankBin: z
        .string()
        .trim()
        .regex(/^\d{6}$/, "Mã BIN ngân hàng gồm 6 chữ số.")
        .or(z.literal("")),
      accountNo: z
        .string()
        .trim()
        .regex(/^[0-9A-Za-z]{4,30}$/, "Số tài khoản không hợp lệ."),
      accountName: z.string().trim().min(2).max(120),
    }),
  )
  .handler(async ({ data, context }) => {
    await requireSuperAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { logAdminAction } = await import("@/lib/account-provisioning.server");

    const { error } = await supabaseAdmin.from("payment_accounts").upsert({
      id: 1,
      bank_name: data.bankName,
      bank_bin: data.bankBin || null,
      account_no: data.accountNo,
      // Bank apps show the holder in capitals without accents; store what
      // the owner typed, the QR service normalises it.
      account_name: data.accountName,
      updated_at: new Date().toISOString(),
      updated_by: context.userId,
    });
    if (error) throw new Error(error.message);

    await logAdminAction({
      actorId: context.userId,
      orgId: null,
      action: "payment_account.set",
      meta: { bank_name: data.bankName },
    });
    return { success: true as const };
  });
