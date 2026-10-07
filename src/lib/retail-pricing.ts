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

/** The discount as a learner reads it: "30%" or "50.000 ₫". */
export function discountLabel(d: Discount): string {
  if (d.amount > 0) return `${Math.round(d.amount).toLocaleString("vi-VN")} ₫`;
  return `${d.pct}%`;
}

export const RETAIL_TERM_MONTHS: Record<RetailTerm, number> = { m3: 3, m6: 6, m9: 9, m12: 12 };
