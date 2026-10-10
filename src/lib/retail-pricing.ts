// What one learner pays, buying for themself through a partner link.
//
// Owner's rule (01/10/2026): the list price of plan p1 for the term, less
// the link's discount, rounded UP to the next 10,000 VND. Computed in one
// place so the signup page, the payment page and the order agree.

export const RETAIL_TERMS = ["m3", "m6", "m9", "m12"] as const;
export type RetailTerm = (typeof RETAIL_TERMS)[number];

export const RETAIL_ROUND_TO = 10_000;

/** A link takes a percent OFF or an amount of money off — never both
 *  (the database refuses a link carrying both). */
export type Discount = { pct: number; amount: number };

export function retailAmount(listPrice: number, discountPct: number, discountAmount = 0): number {
  // Work in whole đồng before rounding: 267,300 × 0.7 is 187,109.99999… in
  // floating point, and a ceil on that must not depend on the last digit.
  const discounted = Math.round(listPrice * (100 - discountPct)) / 100 - discountAmount;
  return Math.max(0, Math.ceil(discounted / RETAIL_ROUND_TO - 1e-9)) * RETAIL_ROUND_TO;
}

/** Renewal timing (owner, 07/10/2026): the renewal order opens this many
 *  days before the paid term ends, and while it waits for payment the
 *  learner keeps learning this many days after it ended. */
export const RENEW_BEFORE_DAYS = 7;
export const RENEW_GRACE_DAYS = 7;

/** The parts of a signup link a renewal price depends on. */
export type OfferLink = {
  discount_pct: number | null;
  discount_amount: number | null;
  discount_scope: string | null;
  expires_at: string | null;
  revoked_at: string | null;
};

/** What a renewal is discounted by (owner, 07/10/2026): the link the
 *  learner came through, only while that offer is still running — not
 *  revoked, not past its last day — and not when the link was set to
 *  discount the first contract only. Otherwise today's list price. */
export function renewalDiscount(link: OfferLink | null, now: Date = new Date()): Discount {
  const none = { pct: 0, amount: 0 };
  if (!link || link.revoked_at || link.discount_scope === "first") return none;
  if (link.expires_at && new Date(link.expires_at) <= now) return none;
  return { pct: Number(link.discount_pct ?? 0), amount: Number(link.discount_amount ?? 0) };
}

/** The discount as a learner reads it: "30%" or "50.000 ₫". */
export function discountLabel(d: Discount): string {
  if (d.amount > 0) return `${Math.round(d.amount).toLocaleString("vi-VN")} ₫`;
  return `${d.pct}%`;
}

export const RETAIL_TERM_MONTHS: Record<RetailTerm, number> = { m3: 3, m6: 6, m9: 9, m12: 12 };
