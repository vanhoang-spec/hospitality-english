// What one learner pays, buying for themself through a partner link.
//
// Owner's rule (01/10/2026): the list price of plan p1 for the term, less
// the link's discount, rounded UP to the next 10,000 VND. Computed in one
// place so the signup page, the payment page and the order agree.

export const RETAIL_TERMS = ["m3", "m6", "m9", "m12"] as const;
export type RetailTerm = (typeof RETAIL_TERMS)[number];

export const RETAIL_ROUND_TO = 10_000;

export function retailAmount(listPrice: number, discountPct: number): number {
  // Work in whole đồng before rounding: 267,300 × 0.7 is 187,109.99999… in
  // floating point, and a ceil on that must not depend on the last digit.
  const discounted = Math.round(listPrice * (100 - discountPct)) / 100;
  return Math.max(0, Math.ceil(discounted / RETAIL_ROUND_TO - 1e-9)) * RETAIL_ROUND_TO;
}

export const RETAIL_TERM_MONTHS: Record<RetailTerm, number> = { m3: 3, m6: 6, m9: 9, m12: 12 };
