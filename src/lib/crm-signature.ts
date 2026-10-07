// Signing between the Embassy CRM and this app — the same scheme the CRM
// already uses with the Ôn Luyện app (contract: docs/TICH_HOP_HOSPITALITY.md
// in the CRM repo):
//
//   x-crm-timestamp: Unix seconds when sent
//   x-crm-signature: hex HMAC_SHA256(secret, timestamp + "." + raw body)
//
// The secret never travels; a request older or newer than five minutes is
// refused, and every command carries a crm_ref so a replay inside that
// window changes nothing. Web Crypto only, so this runs in Node, Bun and
// the browser alike and can be tested without a server.

export const MAX_SKEW_SECONDS = 300;

const encoder = new TextEncoder();

export async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(message)));
  return Array.from(sig, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Same-length strings compared without stopping at the first difference,
 *  so the time taken says nothing about how much of a guess was right. */
function sameText(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export type SignatureCheck = "ok" | "sai_chu_ky" | "lech_gio";

export async function checkCrmSignature(input: {
  rawBody: string;
  timestamp: string | null;
  signature: string | null;
  secret: string;
  nowSeconds?: number;
}): Promise<SignatureCheck> {
  const { rawBody, timestamp, signature, secret } = input;
  if (!timestamp || !signature || !/^\d{1,12}$/.test(timestamp)) return "sai_chu_ky";
  const expected = await hmacHex(secret, `${timestamp}.${rawBody}`);
  if (!sameText(expected, signature.trim().toLowerCase())) return "sai_chu_ky";
  const now = input.nowSeconds ?? Math.floor(Date.now() / 1000);
  if (Math.abs(now - Number(timestamp)) > MAX_SKEW_SECONDS) return "lech_gio";
  return "ok";
}

/** What the CRM side does — used by the tests here, and a reference for
 *  the sender in the CRM repo. */
export async function signCrmRequest(secret: string, rawBody: string, nowSeconds?: number) {
  const timestamp = String(nowSeconds ?? Math.floor(Date.now() / 1000));
  return {
    "x-crm-timestamp": timestamp,
    "x-crm-signature": await hmacHex(secret, `${timestamp}.${rawBody}`),
  };
}
