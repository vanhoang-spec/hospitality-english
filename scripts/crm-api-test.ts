// The door the Embassy CRM uses (POST /api/crm), tested without a server
// and without a database: the handler is called directly, and Supabase is
// pointed at an address nothing listens on, so no request here can reach
// a real project even if a test is wrong. What runs against the database
// (crm_luu_link, crm_cap_goi) is tested in scripts/db/schema-test.ts.
//
//   bun scripts/crm-api-test.ts
process.env.SUPABASE_URL = "http://127.0.0.1:9";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-not-a-key";

const { checkCrmSignature, signCrmRequest, hmacHex } = await import("../src/lib/crm-signature.ts");
const { retailAmount, discountLabel } = await import("../src/lib/retail-pricing.ts");
const { Route } = await import("../src/routes/api/crm.ts");

let pass = 0;
let fail = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
}

// ── Signature
// A fixed vector, so the CRM side can check its own signer against it:
// HMAC_SHA256("khoa-thu", "1700000000.{}").
const vector = await hmacHex("khoa-thu", "1700000000.{}");
check("HMAC vector is 64 hex characters", /^[0-9a-f]{64}$/.test(vector), vector);

const secret = "khoa-bi-mat-thu";
const body = JSON.stringify({ hanh_dong: "lay_bang_gia" });
const now = 1_800_000_000;
const signed = await signCrmRequest(secret, body, now);
const verdict = (over: Partial<Parameters<typeof checkCrmSignature>[0]>) =>
  checkCrmSignature({
    rawBody: body,
    timestamp: signed["x-crm-timestamp"],
    signature: signed["x-crm-signature"],
    secret,
    nowSeconds: now,
    ...over,
  });
check("a correctly signed request passes", (await verdict({})) === "ok");
check(
  "one byte of the body changed fails",
  (await verdict({ rawBody: body + " " })) === "sai_chu_ky",
);
check("another secret fails", (await verdict({ secret: "khoa-khac" })) === "sai_chu_ky");
check("no signature fails", (await verdict({ signature: null })) === "sai_chu_ky");
check("a non-numeric timestamp fails", (await verdict({ timestamp: "abc" })) === "sai_chu_ky");
check(
  "upper-case hex is accepted",
  (await verdict({ signature: signed["x-crm-signature"].toUpperCase() })) === "ok",
);
check("299 seconds late passes", (await verdict({ nowSeconds: now + 299 })) === "ok");
check(
  "301 seconds late is refused as lech_gio",
  (await verdict({ nowSeconds: now + 301 })) === "lech_gio",
);
check(
  "301 seconds early is refused as lech_gio",
  (await verdict({ nowSeconds: now - 301 })) === "lech_gio",
);

// ── Prices
check("30% off 267.300 rounds up to 190.000", retailAmount(267300, 30) === 190000);
check("50.000 off 267.300 rounds up to 220.000", retailAmount(267300, 0, 50000) === 220000);
check(
  "an amount off larger than the price is free, not negative",
  retailAmount(267300, 0, 999999) === 0,
);
check("a percent label", discountLabel({ pct: 30, amount: 0 }) === "30%");
check(
  "an amount label",
  discountLabel({ pct: 0, amount: 50000 }) === "50.000 ₫",
  discountLabel({ pct: 0, amount: 50000 }),
);

// ── The route
type PostHandler = (ctx: { request: Request }) => Promise<Response>;
const handlers = (Route.options as unknown as { server: { handlers: { POST: PostHandler } } })
  .server.handlers;
async function post(raw: string, headers: Record<string, string>) {
  const res: Response = await handlers.POST({
    request: new Request("https://hospitality.embassy.edu.vn/api/crm", {
      method: "POST",
      body: raw,
      headers,
    }),
  });
  return { status: res.status, json: (await res.json()) as Record<string, unknown> };
}
const live = async (raw: string) => signCrmRequest(secret, raw);

delete process.env.CRM_HMAC_SECRET;
const noSecret = await post(body, await live(body));
check(
  "before the secret is set: 503 chua_cau_hinh (the CRM keeps retrying)",
  noSecret.status === 503 && noSecret.json.ma_loi === "chua_cau_hinh",
  JSON.stringify(noSecret),
);

process.env.CRM_HMAC_SECRET = secret;
const unsigned = await post(body, {});
check("unsigned: 401 sai_chu_ky", unsigned.status === 401 && unsigned.json.ma_loi === "sai_chu_ky");
const stale = await post(
  body,
  await signCrmRequest(secret, body, Math.floor(Date.now() / 1000) - 600),
);
check("ten minutes old: 401 lech_gio", stale.status === 401 && stale.json.ma_loi === "lech_gio");
const wrongKey = await post(body, await signCrmRequest("khoa-khac", body));
check("signed with another key: 401", wrongKey.status === 401);

const notJson = "{hanh_dong:";
const bad = await post(notJson, await live(notJson));
check(
  "signed but not JSON: 400 du_lieu_sai",
  bad.status === 400 && bad.json.ma_loi === "du_lieu_sai",
);

const unknown = JSON.stringify({ hanh_dong: "xoa_het" });
const unk = await post(unknown, await live(unknown));
check(
  "an unknown command: 400 du_lieu_sai",
  unk.status === 400 && unk.json.ma_loi === "du_lieu_sai",
);

const badLink = JSON.stringify({
  hanh_dong: "luu_link",
  crm_ref: "x",
  doi_tuong: "khach_san",
  doi_tac: { crm_id: "p", ten: "Đối tác" },
  giam: { kieu: "phan_tram", gia_tri: 95 },
  hoc_thu_ngay: 7,
  het_han: null,
  so_luot_toi_da: null,
  dang_mo: true,
});
const bl = await post(badLink, await live(badLink));
check(
  "a 95% discount is refused before the database is touched",
  bl.status === 400 && String(bl.json.thong_diep).includes("giam"),
  String(bl.json.thong_diep),
);

const badDate = JSON.stringify({
  hanh_dong: "luu_link",
  crm_ref: "x",
  doi_tuong: "ca_nhan",
  doi_tac: { crm_id: "p", ten: "Đối tác" },
  giam: { kieu: "khong" },
  hoc_thu_ngay: 7,
  het_han: "31/12/2026",
  so_luot_toi_da: null,
  dang_mo: true,
});
const bd = await post(badDate, await live(badDate));
check("a date not in YYYY-MM-DD is refused", bd.status === 400, String(bd.json.thong_diep));

const badPlan = JSON.stringify({
  hanh_dong: "cap_goi",
  crm_ref: "pay-1",
  app_org_id: "00000000-0000-0000-0000-000000000000",
  goi: "p1",
  ky_han: "m12",
  so_tien_truoc_vat: 1,
});
const bp = await post(badPlan, await live(badPlan));
check(
  "cap_goi with the one-seat retail plan is refused",
  bp.status === 400,
  String(bp.json.thong_diep),
);

// ── Renewal price (owner, 07/10/2026): the link's discount only while its
// offer still runs, and never for a link set to "first contract only".
const { renewalDiscount } = await import("../src/lib/retail-pricing.ts");
const at = new Date("2027-01-10T00:00:00+07:00");
const offer = {
  discount_pct: 30,
  discount_amount: null,
  discount_scope: "every",
  expires_at: "2026-12-31T23:59:59+07:00",
  revoked_at: null,
};
const r = (link: typeof offer | null, now: Date) => JSON.stringify(renewalDiscount(link, now));
check(
  "a renewal inside the offer keeps its 30%",
  r(offer, new Date("2026-11-20T00:00:00+07:00")) === '{"pct":30,"amount":0}',
);
check(
  "a renewal after the offer's last day pays list price",
  r(offer, at) === '{"pct":0,"amount":0}',
);
check(
  "a link set to first contract only gives renewals nothing",
  r({ ...offer, discount_scope: "first", expires_at: null }, at) === '{"pct":0,"amount":0}',
);
check(
  "a revoked link gives renewals nothing",
  r({ ...offer, expires_at: null, revoked_at: "2026-10-01T00:00:00Z" }, at) ===
    '{"pct":0,"amount":0}',
);
check(
  "an app-made link with no end date keeps its discount",
  r({ ...offer, discount_scope: null as unknown as string, expires_at: null }, at) ===
    '{"pct":30,"amount":0}',
);
check("no link: list price", r(null, at) === '{"pct":0,"amount":0}');

// ── The daily renewal cron is not an open trigger.
const { Route: Cron } = await import("../src/routes/api/cron.gia-han.ts");
type GetHandler = (ctx: { request: Request }) => Promise<Response>;
const cronGet = (Cron.options as unknown as { server: { handlers: { GET: GetHandler } } }).server
  .handlers.GET;
const cronCall = (auth?: string) =>
  cronGet({
    request: new Request("https://hospitality.embassy.edu.vn/api/cron/gia-han", {
      headers: auth ? { authorization: auth } : {},
    }),
  });
delete process.env.CRON_SECRET;
check("cron without CRON_SECRET set: 503", (await cronCall("Bearer x")).status === 503);
process.env.CRON_SECRET = "cron-thu";
check("cron with no key: 401", (await cronCall()).status === 401);
check("cron with the wrong key: 401", (await cronCall("Bearer khac")).status === 401);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
