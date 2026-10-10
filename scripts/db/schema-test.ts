// Every migration, applied in order to an empty Postgres, then the rules
// that keep accounts honest — checked by running SQL, not by reading it.
//
//   bun run test:db                      (supabase/migrations)
//   bun scripts/db/schema-test.ts <dir>  (another migration set)
//
// Embedded Postgres (PGlite), so no Docker and no Supabase project: the
// few Supabase pieces the migrations lean on (roles, auth.users, auth.uid,
// the realtime publication) are stubbed below. What this cannot see is
// Supabase Auth itself — it tests what the database does with an
// auth.users row, not how GoTrue writes one.
//
// Why it exists: until 20260929090000 the profile trigger took `role` and
// `org_id` from user_metadata, which the person signing up writes. A
// signup carrying {"role": "super_admin"} became a platform owner. Public
// signup was off, so nobody could reach it — until the day someone turned
// it on. The first check below fails on the schema before that migration.
import { PGlite } from "@electric-sql/pglite";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = process.argv[2] ?? fileURLToPath(new URL("../../supabase/migrations", import.meta.url));
const db = new PGlite();

await db.exec(`
  create role anon nologin; create role authenticated nologin; create role service_role nologin bypassrls;
  grant usage on schema public to anon, authenticated, service_role;
  create schema auth;
  grant usage on schema auth to anon, authenticated, service_role;
  create table auth.users (
    id uuid primary key default gen_random_uuid(),
    phone text,
    raw_user_meta_data jsonb not null default '{}'::jsonb,
    raw_app_meta_data jsonb not null default '{}'::jsonb
  );
  create function auth.uid() returns uuid language sql stable as
    $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  create function auth.role() returns text language sql stable as
    $$ select current_setting('role', true) $$;
  grant execute on function auth.uid() to anon, authenticated, service_role;
  create publication supabase_realtime;
`);

let applied = 0;
for (const f of readdirSync(dir)
  .filter((n) => n.endsWith(".sql"))
  .sort()) {
  try {
    await db.exec(readFileSync(join(dir, f), "utf8"));
    applied++;
  } catch (e) {
    console.log(`MIGRATION FAILED: ${f}\n  ${(e as Error).message}`);
    process.exit(1);
  }
}
console.log(`applied ${applied} migrations`);

let pass = 0;
let fail = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
}
async function one<T = Record<string, unknown>>(sql: string, params: unknown[] = []) {
  return (await db.query<T>(sql, params)).rows[0];
}
async function raises(sql: string, params: unknown[] = []): Promise<string | null> {
  try {
    await db.query(sql, params);
    return null;
  } catch (e) {
    return (e as Error).message;
  }
}

// ── A hotel with one learner seat (no subscription → seat_limit fallback)
const org = (await one<{ id: string }>(
  `insert into public.organizations (name, seat_limit) values ('Test Resort', 1) returning id`,
))!.id;
const other = (await one<{ id: string }>(
  `insert into public.organizations (name, seat_limit) values ('Other Hotel', 5) returning id`,
))!.id;

// ── 1. handle_new_user ignores identity the signer-upper wrote
const forged = (await one<{ id: string }>(
  `insert into auth.users (phone, raw_user_meta_data) values ('84900000001', $1) returning id`,
  [JSON.stringify({ full_name: "Mallory", role: "super_admin", org_id: org })],
))!.id;
const fp = await one<{ role: string; org_id: string | null; full_name: string }>(
  `select role, org_id, full_name from public.profiles where id = $1`,
  [forged],
);
check(
  "user_metadata {role: super_admin} lands as a plain member with no hotel",
  fp?.role === "member" && fp?.org_id === null,
  JSON.stringify(fp),
);
check("full_name still read from user_metadata", fp?.full_name === "Mallory");

// ── 2. app_metadata (service role only) is what counts
const hr = (await one<{ id: string }>(
  `insert into auth.users (phone, raw_user_meta_data, raw_app_meta_data) values ('84900000002', $1, $2) returning id`,
  [JSON.stringify({ full_name: "HR Lan" }), JSON.stringify({ role: "org_admin", org_id: org })],
))!.id;
const hp = await one<{ role: string; org_id: string }>(
  `select role, org_id from public.profiles where id = $1`,
  [hr],
);
check(
  "app_metadata {role: org_admin, org_id} is honoured",
  hp?.role === "org_admin" && hp?.org_id === org,
);

const m1 = (await one<{ id: string }>(
  `insert into auth.users (phone, raw_app_meta_data) values ('84900000003', $1) returning id`,
  [JSON.stringify({ role: "member", org_id: org, department: "FO" })],
))!.id;
const mp = await one<{ department: string }>(
  `select department from public.profiles where id = $1`,
  [m1],
);
check("department read from app_metadata", mp?.department === "FO");

const seatErr = await raises(
  `insert into auth.users (phone, raw_app_meta_data) values ('84900000004', $1)`,
  [JSON.stringify({ role: "member", org_id: org })],
);
check(
  "seat quota still stops the 2nd learner on a 1-seat hotel",
  /SEAT_QUOTA_EXCEEDED/.test(seatErr ?? ""),
  seatErr ?? "no error",
);

// ── 3. Shape constraints
check(
  "learner link without a hotel is refused",
  (await raises(`insert into public.signup_links (token, kind) values ('t-bad-1', 'learner')`)) !==
    null,
);
check(
  "organization link usable twice is refused",
  (await raises(
    `insert into public.signup_links (token, kind, plan_code, term, max_uses) values ('t-bad-2', 'organization', 'p50', 'm3', 2)`,
  )) !== null,
);
check(
  "learner link carrying a plan is refused",
  (await raises(
    `insert into public.signup_links (token, kind, org_id, plan_code) values ('t-bad-3', 'learner', $1, 'p50')`,
    [org],
  )) !== null,
);

// ── 4. claim / release
await db.query(
  `insert into public.signup_links (token, kind, org_id, max_uses) values ('t-once', 'learner', $1, 1)`,
  [org],
);
const c1 = await db.query(`select * from public.claim_signup_link('t-once')`);
const c2 = await db.query(`select * from public.claim_signup_link('t-once')`);
check("max_uses 1: first claim gets the row", c1.rows.length === 1);
check("max_uses 1: second claim gets nothing", c2.rows.length === 0);
const onceId = (c1.rows[0] as { id: string }).id;
await db.query(`select public.release_signup_link($1)`, [onceId]);
const c3 = await db.query(`select * from public.claim_signup_link('t-once')`);
check("a released use can be claimed again", c3.rows.length === 1);
await db.query(`select public.release_signup_link($1)`, [onceId]);
await db.query(`select public.release_signup_link($1)`, [onceId]);
const uc = await one<{ use_count: number }>(
  `select use_count from public.signup_links where id = $1`,
  [onceId],
);
check(
  "release never drives use_count below zero",
  uc?.use_count === 0,
  `use_count=${uc?.use_count}`,
);

await db.query(
  `insert into public.signup_links (token, kind, org_id, expires_at) values ('t-expired', 'learner', $1, now() - interval '1 minute')`,
  [org],
);
check(
  "expired link cannot be claimed",
  (await db.query(`select * from public.claim_signup_link('t-expired')`)).rows.length === 0,
);
await db.query(
  `insert into public.signup_links (token, kind, org_id, revoked_at) values ('t-revoked', 'learner', $1, now())`,
  [org],
);
check(
  "revoked link cannot be claimed",
  (await db.query(`select * from public.claim_signup_link('t-revoked')`)).rows.length === 0,
);
await db.query(
  `insert into public.signup_links (token, kind, org_id) values ('t-open', 'learner', $1)`,
  [org],
);
for (let i = 0; i < 5; i++) await db.query(`select * from public.claim_signup_link('t-open')`);
const open = await one<{ use_count: number }>(
  `select use_count from public.signup_links where token = 't-open'`,
);
check("unlimited link counts every use", open?.use_count === 5);

await db.query(
  `insert into public.signup_links (token, kind, plan_code, term, max_uses) values ('t-hotel', 'organization', 'p100', 'm6', 1)`,
);
await db.query(
  `insert into public.signup_links (token, kind, org_id) values ('t-other', 'learner', $1)`,
  [other],
);

// ── 5. Who can call and read what
/** Run ONE statement as a role; the error message, or null if allowed. */
async function asRole(role: string, sql: string, sub?: string): Promise<string | null> {
  await db.exec(`${sub ? `set request.jwt.claim.sub = '${sub}';` : ""} set role ${role};`);
  try {
    return await raises(sql);
  } finally {
    await db.exec(`reset role; reset request.jwt.claim.sub;`);
  }
}
// Control: the helper must be able to say "allowed", or every check below
// passes for free.
const control = await asRole("authenticated", `select 1`);
check("control: a harmless statement as authenticated is allowed", control === null, control ?? "");
const anonCall = await asRole("anon", `select * from public.claim_signup_link('t-open')`);
check(
  "anon cannot call claim_signup_link",
  /permission denied/.test(anonCall ?? ""),
  anonCall ?? "allowed!",
);
const authCall = await asRole(
  "authenticated",
  `select * from public.claim_signup_link('t-open')`,
  hr,
);
check(
  "signed-in users cannot call claim_signup_link either",
  /permission denied/.test(authCall ?? ""),
  authCall ?? "allowed!",
);
const svcCall = await asRole("service_role", `select * from public.claim_signup_link('t-nope')`);
check("service_role can call claim_signup_link", svcCall === null, svcCall ?? "");

async function visibleAs(userId: string): Promise<string[]> {
  await db.exec(`set request.jwt.claim.sub = '${userId}'; set role authenticated;`);
  const r = await db.query<{ token: string }>(
    `select token from public.signup_links order by token`,
  );
  await db.exec(`reset role; reset request.jwt.claim.sub;`);
  return r.rows.map((x) => x.token);
}
const hrSees = await visibleAs(hr);
check(
  "HR sees own hotel's learner links only",
  hrSees.includes("t-open") && !hrSees.includes("t-other") && !hrSees.includes("t-hotel"),
  hrSees.join(","),
);
const memberSees = await visibleAs(m1);
check("a learner sees no links", memberSees.length === 0, memberSees.join(","));
const owner = (await one<{ id: string }>(
  `insert into auth.users (phone, raw_app_meta_data) values ('84900000009', $1) returning id`,
  [JSON.stringify({ role: "super_admin" })],
))!.id;
const ownerSees = await visibleAs(owner);
check(
  "platform owner sees every link, hotels' and learners'",
  ownerSees.includes("t-hotel") && ownerSees.includes("t-other") && ownerSees.includes("t-open"),
  ownerSees.join(","),
);
const hrWrite = await asRole(
  "authenticated",
  `update public.signup_links set max_uses = 999 where token = 't-open'`,
  hr,
);
const after = await one<{ max_uses: number | null }>(
  `select max_uses from public.signup_links where token = 't-open'`,
);
check(
  "HR cannot edit a link directly (writes only via server)",
  after?.max_uses === null,
  `${hrWrite ?? "no error"}; max_uses=${after?.max_uses}`,
);
const hrInsert = await asRole(
  "authenticated",
  `insert into public.signup_links (token, kind, org_id) values ('t-forged', 'learner', '${org}')`,
  hr,
);
check("HR cannot insert a link directly", hrInsert !== null, hrInsert ?? "allowed!");

// Deleting a group keeps the link, just without a group.
const g = (await one<{ id: string }>(
  `insert into public.groups (org_id, name) values ($1, 'FO Oct') returning id`,
  [org],
))!.id;
await db.query(
  `insert into public.signup_links (token, kind, org_id, group_id) values ('t-group', 'learner', $1, $2)`,
  [org, g],
);
await db.query(`delete from public.groups where id = $1`, [g]);
const lg = await one<{ group_id: string | null }>(
  `select group_id from public.signup_links where token = 't-group'`,
);
check("deleting the group keeps the link, group cleared", lg !== undefined && lg.group_id === null);

// ── 6. Retail: one learner, through a partner (20261001090000) ──
const hotelKind = await one<{ kind: string }>(
  `select kind from public.organizations where id = $1`,
  [org],
);
check("existing organisations default to kind 'hotel'", hotelKind?.kind === "hotel");

const p1 = await one<{ seats: number; m3: string; m12: string }>(
  `select p.seats,
          (select price from public.plan_prices where plan_code = 'p1' and term = 'm3') as m3,
          (select price from public.plan_prices where plan_code = 'p1' and term = 'm12') as m12
     from public.plans p where p.code = 'p1'`,
);
check(
  "plan p1 is one seat, list price 267.300 (3 months) and 712.800 (12 months)",
  p1?.seats === 1 && Number(p1?.m3) === 267300 && Number(p1?.m12) === 712800,
  JSON.stringify(p1),
);

const partner = (await one<{ id: string }>(
  `insert into public.partners (name) values ('Test Partner') returning id`,
))!.id;
check(
  "a partner name is unique regardless of case",
  (await raises(`insert into public.partners (name) values ('test partner')`)) !== null,
);
check(
  "a retail link with partner, discount and trial is accepted",
  (await raises(
    `insert into public.signup_links (token, kind, partner_id, discount_pct, trial_days, expires_at)
     values ('t-retail', 'retail', $1, 30, 7, now() + interval '90 days')`,
    [partner],
  )) === null,
);
check(
  "a retail link without a partner is refused",
  (await raises(
    `insert into public.signup_links (token, kind, discount_pct, trial_days) values ('t-r2', 'retail', 30, 7)`,
  )) !== null,
);
check(
  "a retail link with a zero-day trial is refused (it would read as active forever)",
  (await raises(
    `insert into public.signup_links (token, kind, partner_id, discount_pct, trial_days)
     values ('t-r3', 'retail', $1, 30, 0)`,
    [partner],
  )) !== null,
);
check(
  "a learner link carrying a discount is refused",
  (await raises(
    `insert into public.signup_links (token, kind, org_id, discount_pct) values ('t-r4', 'learner', $1, 30)`,
    [org],
  )) !== null,
);
check(
  "a retail link can still be claimed like any other",
  (await db.query(`select * from public.claim_signup_link('t-retail')`)).rows.length === 1,
);

// A retail learner: a one-seat 'individual' organisation on a 7-day trial.
const solo = (await one<{ id: string }>(
  `insert into public.organizations (name, seat_limit, kind, partner_id)
   values ('Cá nhân · Lan', 1, 'individual', $1) returning id`,
  [partner],
))!.id;
await db.query(
  `insert into public.subscriptions (org_id, plan_code, kind, starts_at, ends_at)
   values ($1, 'p1', 'trial', now(), now() + interval '7 days')`,
  [solo],
);
const lan = (await one<{ id: string }>(
  `insert into auth.users (phone, raw_app_meta_data) values ('84900000010', $1) returning id`,
  [JSON.stringify({ role: "member", org_id: solo })],
))!.id;
const solo2 = await raises(
  `insert into auth.users (phone, raw_app_meta_data) values ('84900000011', $1)`,
  [JSON.stringify({ role: "member", org_id: solo })],
);
check(
  "an individual organisation holds exactly one learner",
  /SEAT_QUOTA_EXCEEDED/.test(solo2 ?? ""),
  solo2 ?? "second learner allowed!",
);
const trialActive = await one<{ a: boolean }>(`select public.org_is_active($1) as a`, [solo]);
check("a learner on trial is active", trialActive?.a === true);
await db.query(
  `update public.subscriptions set starts_at = now() - interval '8 days', ends_at = now() - interval '1 day'
    where org_id = $1`,
  [solo],
);
const trialOver = await one<{ a: boolean }>(`select public.org_is_active($1) as a`, [solo]);
check("a learner whose trial ran out is not active", trialOver?.a === false);

// Orders
await db.query(
  `insert into public.orders (code, org_id, user_id, partner_id, plan_code, term, list_price, discount_pct, amount)
   values ('EHTEST01', $1, $2, $3, 'p1', 'm3', 267300, 30, 190000)`,
  [solo, lan, partner],
);
check(
  "a second open order for the same learner is refused",
  (await raises(
    `insert into public.orders (code, org_id, plan_code, term, list_price, amount)
     values ('EHTEST02', $1, 'p1', 'm6', 475200, 340000)`,
    [solo],
  )) !== null,
);
check(
  "an order marked paid without a payment time is refused",
  (await raises(`update public.orders set status = 'paid' where code = 'EHTEST01'`)) !== null,
);
check(
  "an order term outside 3/6/9/12 months is refused",
  (await raises(
    `insert into public.orders (code, org_id, plan_code, term, list_price, amount)
     values ('EHTEST03', $1, 'p1', 'trial', 0, 0)`,
    [org],
  )) !== null,
);
const lanSees = await asRole("authenticated", `select code from public.orders`, lan);
const lanOrders = await (async () => {
  await db.exec(`set request.jwt.claim.sub = '${lan}'; set role authenticated;`);
  const r = await db.query<{ code: string }>(`select code from public.orders`);
  await db.exec(`reset role; reset request.jwt.claim.sub;`);
  return r.rows.map((x) => x.code);
})();
check(
  "a learner reads their own order",
  lanSees === null && lanOrders.includes("EHTEST01"),
  lanOrders.join(","),
);
const hrOrders = await (async () => {
  await db.exec(`set request.jwt.claim.sub = '${hr}'; set role authenticated;`);
  const r = await db.query<{ code: string }>(`select code from public.orders`);
  await db.exec(`reset role; reset request.jwt.claim.sub;`);
  return r.rows.length;
})();
check("a hotel's HR sees no one's orders", hrOrders === 0, `${hrOrders} rows`);
check(
  "a learner cannot mark their own order paid",
  (await asRole(
    "authenticated",
    `update public.orders set status = 'paid', paid_at = now() where code = 'EHTEST01'`,
    lan,
  )) !== null ||
    (await one<{ status: string }>(`select status from public.orders where code = 'EHTEST01'`))
      ?.status === "pending",
);
const acctRows = await (async () => {
  await db.exec(`set request.jwt.claim.sub = '${lan}'; set role authenticated;`);
  const r = await db.query(`select * from public.payment_accounts`);
  await db.exec(`reset role; reset request.jwt.claim.sub;`);
  return r.rows.length;
})();
check(
  "learners cannot read the payment account table directly",
  acctRows === 0,
  `${acctRows} rows`,
);

// ── Company details (org_details): the licence name, tax code and the HR
// representative's phone and email. A learner can read their own
// organizations row, so these live apart and only HR and the owner read them.
await db.query(
  `insert into public.org_details (org_id, legal_name, address, tax_code, rep_name, rep_phone, rep_email)
   values ($1, 'Công ty TNHH Test', '1 Trần Phú, Vũng Tàu', '0312345678', 'HR Lan', '+84900000002', 'hr@test.vn'),
          ($2, 'Công ty CP Other', '2 Lê Lợi, Huế', '0312345678-001', 'HR Other', '+84900000099', 'hr@other.vn')`,
  [org, other],
);
async function detailsAs(userId: string): Promise<string[]> {
  await db.exec(`set request.jwt.claim.sub = '${userId}'; set role authenticated;`);
  const r = await db.query<{ legal_name: string }>(
    `select legal_name from public.org_details order by legal_name`,
  );
  await db.exec(`reset role; reset request.jwt.claim.sub;`);
  return r.rows.map((x) => x.legal_name);
}
const learnerDetails = await detailsAs(m1);
check(
  "a learner cannot read their own hotel's company details",
  learnerDetails.length === 0,
  `${learnerDetails.length} rows`,
);
const hrDetails = await detailsAs(hr);
check(
  "HR reads their own hotel's company details, and no other hotel's",
  hrDetails.length === 1 && hrDetails[0] === "Công ty TNHH Test",
  hrDetails.join(","),
);
const ownerDetails = await detailsAs(owner);
check(
  "platform owner reads every hotel's company details",
  ownerDetails.length === 2,
  ownerDetails.join(","),
);
const hrDetailsWrite = await asRole(
  "authenticated",
  `update public.org_details set tax_code = '0000000000'`,
  hr,
);
check(
  "HR cannot edit company details directly (writes only via server)",
  /permission denied/.test(hrDetailsWrite ?? ""),
  hrDetailsWrite ?? "allowed!",
);

const third = (await one<{ id: string }>(
  `insert into public.organizations (name, seat_limit) values ('Third Hotel', 5) returning id`,
))!.id;
const detailsInsert = (taxCode: string, phone: string, email: string) =>
  raises(
    `insert into public.org_details (org_id, legal_name, address, tax_code, rep_name, rep_phone, rep_email)
     values ($1, 'Công ty TNHH Third', '3 Hùng Vương, Đà Nẵng', $2, 'HR Third', $3, $4)`,
    [third, taxCode, phone, email],
  );
check(
  "a 9-digit tax code is refused",
  /check constraint/.test((await detailsInsert("031234567", "+84900000077", "a@b.vn")) ?? ""),
);
check(
  "a phone not in +84 form is refused",
  /check constraint/.test((await detailsInsert("0312345678", "0900000077", "a@b.vn")) ?? ""),
);
check(
  "an email without @ is refused",
  /check constraint/.test((await detailsInsert("0312345678", "+84900000077", "a.b.vn")) ?? ""),
);
// Control: the same row with good values goes in, so the three above failed
// on the value they changed and not on something else.
const goodDetails = await detailsInsert("0312345678-002", "+84900000077", "a@b.vn");
check("control: valid company details are accepted", goodDetails === null, goodDetails ?? "");

// ── CRM integration (20261007120000): partner links for hotels, the two
// CRM commands that change several rows at once, the event log.
const partnerRow = (await one<{ id: string }>(
  `insert into public.partners (name) values ('Đối tác thử CRM') returning id`,
))!.id;
check(
  "a partner hotel link without discount_scope is refused",
  /signup_links_shape/.test(
    (await raises(
      `insert into public.signup_links (token, kind, partner_id, discount_pct, trial_days)
       values ('t-ph-1', 'partner_hotel', $1, 10, 30)`,
      [partnerRow],
    )) ?? "",
  ),
);
check(
  "a partner hotel link with both a percent and an amount off is refused",
  /signup_links_shape/.test(
    (await raises(
      `insert into public.signup_links (token, kind, partner_id, discount_pct, discount_amount, discount_scope, trial_days)
       values ('t-ph-2', 'partner_hotel', $1, 10, 50000, 'first', 30)`,
      [partnerRow],
    )) ?? "",
  ),
);
const goodPh = await raises(
  `insert into public.signup_links (token, kind, partner_id, discount_amount, discount_scope, trial_days)
   values ('t-ph-3', 'partner_hotel', $1, 50000, 'every', 30)`,
  [partnerRow],
);
check(
  "control: a partner hotel link with an amount off is accepted",
  goodPh === null,
  goodPh ?? "",
);

const luu = (ref: string, kind: string, partnerRef: string, partnerName: string, open = true) =>
  db.query<{ link_id: string; link_token: string; tao_moi: boolean }>(
    `select * from public.crm_luu_link($1, $2, $3, $4, 30, null, 'every', 7, null, null, $5, $6)`,
    [ref, kind, partnerRef, partnerName, open, `tok-${ref}`],
  );
const l1 = (await luu("crm-link-1", "retail", "crm-partner-9", "Đối tác thử CRM")).rows[0]!;
const adopted = await one<{ crm_ref: string; n: number }>(
  `select max(crm_ref) as crm_ref, count(*)::int as n from public.partners where lower(name) = lower('Đối tác thử CRM')`,
);
check(
  "crm_luu_link adopts the same-named partner made in the app instead of a second one",
  l1.tao_moi === true && adopted?.n === 1 && adopted?.crm_ref === "crm-partner-9",
  JSON.stringify(adopted),
);
const l2 = (await luu("crm-link-1", "retail", "crm-partner-9", "Đối tác thử CRM", false)).rows[0]!;
const revoked = await one<{ revoked_at: string | null }>(
  `select revoked_at from public.signup_links where crm_ref = 'crm-link-1'`,
);
check(
  "crm_luu_link again with the same crm_ref edits the link and keeps its token",
  l2.tao_moi === false && l2.link_token === l1.link_token && l2.link_id === l1.link_id,
  `${l1.link_token} → ${l2.link_token}`,
);
check("dang_mo false revokes the link", revoked?.revoked_at !== null);
const kindSwitch = await raises(
  `select * from public.crm_luu_link('crm-link-1', 'partner_hotel', 'crm-partner-9', 'Đối tác thử CRM', 30, null, 'every', 7, null, null, true, 'tok-x')`,
);
check(
  "a link cannot switch between hotel and individual",
  /XUNG_DOT/.test(kindSwitch ?? ""),
  kindSwitch ?? "allowed!",
);
const luuAsUser = await asRole(
  "authenticated",
  `select * from public.crm_luu_link('crm-link-2', 'retail', 'p', 'Ai đó', 0, null, null, 7, null, null, true, 'tok-y')`,
  owner,
);
check(
  "even the platform owner's browser cannot call crm_luu_link",
  /permission denied/.test(luuAsUser ?? ""),
  luuAsUser ?? "allowed!",
);

// A hotel on a 30-day trial, then the CRM confirms a 12-month invoice.
const capOrg = (await one<{ id: string }>(
  `insert into public.organizations (name, seat_limit) values ('CRM Hotel', 50) returning id`,
))!.id;
await db.query(
  `insert into public.subscriptions (org_id, plan_code, kind, starts_at, ends_at, price)
   values ($1, 'p50', 'trial', now() - interval '1 day', now() + interval '30 days', 0)`,
  [capOrg],
);
const cap1 = await one<{ ket_thuc: string; da_xu_ly_truoc: boolean }>(
  `select * from public.crm_cap_goi('crm-pay-1', $1, 'p100', 'm12', 12000000)`,
  [capOrg],
);
const afterCap = await one<{ n: number; seats: number; months: number }>(
  `select (select count(*)::int from public.subscriptions where org_id = $1 and status = 'active') as n,
          (select seat_limit from public.organizations where id = $1) as seats,
          (select round(extract(epoch from (ends_at - now())) / 86400)::int from public.subscriptions
            where org_id = $1 and status = 'active') as months`,
  [capOrg],
);
check(
  "crm_cap_goi opens the paid term after the trial days left, on the plan's seats",
  cap1?.da_xu_ly_truoc === false &&
    afterCap?.n === 1 &&
    afterCap?.seats === 100 &&
    afterCap.months >= 30 + 364 &&
    afterCap.months <= 30 + 366,
  JSON.stringify(afterCap),
);
const cap2 = await one<{ ket_thuc: string; da_xu_ly_truoc: boolean }>(
  `select * from public.crm_cap_goi('crm-pay-1', $1, 'p100', 'm12', 12000000)`,
  [capOrg],
);
const activeAfterRepeat = await one<{ n: number }>(
  `select count(*)::int as n from public.subscriptions where org_id = $1`,
  [capOrg],
);
check(
  "the same crm_ref sent twice adds the term once",
  cap2?.da_xu_ly_truoc === true &&
    new Date(cap2.ket_thuc).getTime() === new Date(cap1!.ket_thuc).getTime() &&
    activeAfterRepeat?.n === 2,
  `${activeAfterRepeat?.n} rows (trial + paid)`,
);
const indiv = (await one<{ id: string }>(
  `insert into public.organizations (name, seat_limit, kind) values ('Cá nhân · Thử', 1, 'individual') returning id`,
))!.id;
check(
  "crm_cap_goi refuses a one-person retail account",
  /DU_LIEU_SAI/.test(
    (await raises(`select * from public.crm_cap_goi('crm-pay-2', $1, 'p50', 'm3', 1)`, [indiv])) ??
      "",
  ),
);
check(
  "crm_cap_goi refuses the one-seat retail plan for a hotel",
  /DU_LIEU_SAI/.test(
    (await raises(`select * from public.crm_cap_goi('crm-pay-3', $1, 'p1', 'm3', 1)`, [capOrg])) ??
      "",
  ),
);
const capAsHr = await asRole(
  "authenticated",
  `select * from public.crm_cap_goi('crm-pay-4', '${capOrg}', 'p500', 'm12', 0)`,
  hr,
);
check(
  "a signed-in user cannot call crm_cap_goi",
  /permission denied/.test(capAsHr ?? ""),
  capAsHr ?? "allowed!",
);

await db.query(
  `insert into public.crm_events (loai, du_lieu) values ('khach_san_dang_ky', '{"app_org_id":"x"}')`,
);
const eventsAsOwner = await asRole("authenticated", `select * from public.crm_events`, owner);
check(
  "nobody signed in can read the CRM event log, the platform owner included",
  /permission denied/.test(eventsAsOwner ?? ""),
  eventsAsOwner ?? "allowed!",
);
check(
  "the event log refuses an unknown event type",
  /check constraint/.test(
    (await raises(`insert into public.crm_events (loai, du_lieu) values ('xoa_het', '{}')`)) ?? "",
  ),
);

// ── Renewal (20261008090000): a pending renewal keeps a learner learning
// for seven days after the old term ended, and no longer.
const renewOrg = (await one<{ id: string }>(
  `insert into public.organizations (name, seat_limit, kind) values ('Cá nhân · Gia hạn', 1, 'individual') returning id`,
))!.id;
await db.query(
  `insert into public.subscriptions (org_id, plan_code, kind, starts_at, ends_at, price)
   values ($1, 'p1', 'm3', now() - interval '93 days', now() - interval '2 days', 190000)`,
  [renewOrg],
);
const isActive = async (org: string) =>
  (await one<{ a: boolean }>(`select public.org_is_active($1) as a`, [org]))?.a;
check(
  "a term that ended two days ago, with nothing pending, is not active",
  (await isActive(renewOrg)) === false,
);

await db.query(
  `insert into public.orders (code, org_id, plan_code, term, list_price, amount, kind)
   values ('EHFIRST1', $1, 'p1', 'm3', 267300, 190000, 'first')`,
  [renewOrg],
);
check("an unpaid FIRST order gives no grace", (await isActive(renewOrg)) === false);
await db.query(`delete from public.orders where code = 'EHFIRST1'`);

await db.query(
  `insert into public.orders (code, org_id, plan_code, term, list_price, amount, kind, grace_until)
   values ('EHRENEW1', $1, 'p1', 'm3', 267300, 270000, 'renewal', now() + interval '5 days')`,
  [renewOrg],
);
check(
  "a pending renewal inside its grace keeps the learner active",
  (await isActive(renewOrg)) === true,
);
await db.query(
  `update public.orders set grace_until = now() - interval '1 minute' where code = 'EHRENEW1'`,
);
check("past grace_until the learner is stopped", (await isActive(renewOrg)) === false);
await db.query(
  `update public.orders set grace_until = now() + interval '5 days', status = 'paid', paid_at = now() where code = 'EHRENEW1'`,
);
check(
  "a PAID renewal grants no grace by itself (its new term does that)",
  (await isActive(renewOrg)) === false,
);

const tok = await one<{ pay_token: string }>(
  `select pay_token from public.orders where code = 'EHRENEW1'`,
);
check(
  "every order gets an unguessable payment-link token",
  /^[0-9a-f]{32}$/.test(tok?.pay_token ?? ""),
  tok?.pay_token ?? "",
);
check(
  "a first order cannot carry a grace date",
  /orders_grace_only_renewal/.test(
    (await raises(
      `insert into public.orders (code, org_id, plan_code, term, list_price, amount, kind, grace_until)
       values ('EHBAD001', $1, 'p1', 'm3', 1, 1, 'first', now())`,
      [renewOrg],
    )) ?? "",
  ),
);
const graceAsLearner = await asRole(
  "authenticated",
  `select public.org_is_active('${renewOrg}')`,
  m1,
);
check(
  "signed-in users can still call org_is_active (the app's lapse screen reads it)",
  graceAsLearner === null,
  graceAsLearner ?? "",
);
const renewEvent = await raises(
  `insert into public.crm_events (loai, du_lieu) values ('don_gia_han', '{"ma_don":"EHRENEW1"}')`,
);
check("the event log accepts don_gia_han", renewEvent === null, renewEvent ?? "");

// ── Invitations from the CRM (20261008120000): gift or trial, single use,
// no partner.
const moi = (ref: string, kind: string, plan: string, days: number, open = true) =>
  db.query<{ link_id: string; link_token: string; tao_moi: boolean; da_dung: boolean }>(
    `select * from public.crm_moi_khach_san($1, 'b2b-cust-1', $2, $3, $4, null, $5, $6, $7)`,
    [ref, kind, plan, days, JSON.stringify({ ten_khach_san: "Lugano" }), open, `inv-${ref}`],
  );
const inv1 = (await moi("inv-1", "gift", "p100", 90)).rows[0]!;
const invRow = await one<{
  kind: string;
  max_uses: number;
  trial_days: number;
  invite_kind: string;
}>(
  `select kind, max_uses, trial_days, invite_kind from public.signup_links where crm_ref = 'inv-1'`,
);
check(
  "crm_moi_khach_san makes a single-use gift invitation",
  inv1.tao_moi === true &&
    invRow?.kind === "invite" &&
    invRow.max_uses === 1 &&
    invRow.trial_days === 90 &&
    invRow.invite_kind === "gift",
  JSON.stringify(invRow),
);
const inv2 = (await moi("inv-1", "trial", "p200", 200)).rows[0]!;
const invRow2 = await one<{ plan_code: string; trial_days: number }>(
  `select plan_code, trial_days from public.signup_links where crm_ref = 'inv-1'`,
);
check(
  "an unused invitation is edited in place, same token, up to 365 days",
  inv2.tao_moi === false &&
    inv2.link_token === inv1.link_token &&
    invRow2?.plan_code === "p200" &&
    invRow2.trial_days === 200,
  JSON.stringify(invRow2),
);
await db.query(`select * from public.claim_signup_link($1)`, [inv1.link_token]);
const inv3 = (await moi("inv-1", "gift", "p50", 10)).rows[0]!;
const invRow3 = await one<{ plan_code: string }>(
  `select plan_code from public.signup_links where crm_ref = 'inv-1'`,
);
check(
  "a used invitation is left alone and reported as used",
  inv3.da_dung === true && invRow3?.plan_code === "p200",
  JSON.stringify(inv3),
);
check(
  "a second claim of a used invitation gets nothing",
  (await db.query(`select * from public.claim_signup_link($1)`, [inv1.link_token])).rows.length ===
    0,
);
check(
  "an invitation on the one-seat retail plan is refused",
  /DU_LIEU_SAI/.test(
    (await raises(
      `select * from public.crm_moi_khach_san('inv-2', 'c', 'gift', 'p1', 30, null, null, true, 't')`,
    )) ?? "",
  ),
);
check(
  "an invitation of 366 days is refused",
  /trial_days_check/.test(
    (await raises(
      `select * from public.crm_moi_khach_san('inv-3', 'c', 'gift', 'p50', 366, null, null, true, 't3')`,
    )) ?? "",
  ),
);
check(
  "a partner link's crm_ref cannot be turned into an invitation",
  /XUNG_DOT/.test(
    (await raises(
      `select * from public.crm_moi_khach_san('crm-link-1', 'c', 'gift', 'p50', 30, null, null, true, 't4')`,
    )) ?? "",
  ),
);
const moiAsUser = await asRole(
  "authenticated",
  `select * from public.crm_moi_khach_san('inv-4', 'c', 'gift', 'p50', 30, null, null, true, 't5')`,
  owner,
);
check(
  "nobody signed in can call crm_moi_khach_san",
  /permission denied/.test(moiAsUser ?? ""),
  moiAsUser ?? "allowed!",
);
const giftSub = await raises(
  `insert into public.subscriptions (org_id, plan_code, kind, starts_at, ends_at, price)
   values ($1, 'p100', 'gift', now(), now() + interval '90 days', 0)`,
  [third],
);
check("a subscription can be a gift", giftSub === null, giftSub ?? "");

// ── Password reset by email (20261008150000) ───────────────────
// HR Lan (84900000002) adds an address; learner m1 has none at first.
const badEmail = await raises(`update public.profiles set email = 'Lan@Hotel.vn' where id = $1`, [
  hr,
]);
check(
  "an email must be stored lower-case and look like an address",
  /profiles_email_check/.test(badEmail ?? "") &&
    /profiles_email_check/.test(
      (await raises(`update public.profiles set email = 'not an email' where id = $1`, [hr])) ?? "",
    ),
  badEmail ?? "accepted",
);
const ownEmail = await asRole(
  "authenticated",
  `update public.profiles set email = 'lan@hotel.vn' where id = '${hr}'`,
  hr,
);
const lanEmail = await one<{ email: string | null }>(
  `select email from public.profiles where id = $1`,
  [hr],
);
check(
  "a person can add their own email",
  ownEmail === null && lanEmail?.email === "lan@hotel.vn",
  ownEmail ?? JSON.stringify(lanEmail),
);
async function rowsAs(sub: string, sql: string) {
  await db.exec(`set request.jwt.claim.sub = '${sub}'; set role authenticated;`);
  try {
    return (await db.query(sql)).rows;
  } finally {
    await db.exec(`reset role; reset request.jwt.claim.sub;`);
  }
}
check(
  "a learner cannot read a colleague's email",
  (await rowsAs(m1, `select email from public.profiles where id = '${hr}'`)).length === 0,
);

const hex = (c: string) => c.repeat(64);
const ask = (phone: string, hash: string) =>
  db.query<{ email: string; full_name: string }>(
    `select * from public.password_reset_request($1, $2)`,
    [phone, hash],
  );
const tokenCount = async (user: string) =>
  Number(
    (await one<{ n: number }>(
      `select count(*)::int as n from public.password_reset_tokens where user_id = $1`,
      [user],
    ))!.n,
  );
check(
  "a phone with no email gets nothing and stores no token",
  (await ask("+84900000003", hex("0"))).rows.length === 0 && (await tokenCount(m1)) === 0,
);
check("an unknown phone gets nothing", (await ask("+84999999999", hex("1"))).rows.length === 0);
const askA = (await ask("+84900000002", hex("a"))).rows;
const tokA = await one<{ email: string; minutes: number }>(
  `select email, round(extract(epoch from expires_at - created_at) / 60)::int as minutes
     from public.password_reset_tokens where token_hash = $1`,
  [hex("a")],
);
check(
  "a phone with an email gets the address and a 30-minute token",
  askA[0]?.email === "lan@hotel.vn" && tokA?.email === "lan@hotel.vn" && tokA.minutes === 30,
  JSON.stringify({ askA, tokA }),
);
check(
  "the phone matches without the leading +",
  (await ask("84900000002", hex("b"))).rows.length === 1,
);
await ask("+84900000002", hex("c"));
check(
  "a fourth request in the same hour is ignored",
  (await ask("+84900000002", hex("d"))).rows.length === 0 && (await tokenCount(hr)) === 3,
  `tokens=${await tokenCount(hr)}`,
);
const claim = (hash: string) =>
  db.query<{ user_id: string; token_id: string }>(`select * from public.password_reset_claim($1)`, [
    hash,
  ]);
const claimA = (await claim(hex("a"))).rows;
check(
  "a fresh token is claimed for its account",
  claimA[0]?.user_id === hr,
  JSON.stringify(claimA),
);
check("a claimed token cannot be claimed again", (await claim(hex("a"))).rows.length === 0);
check(
  "claiming one token retires the account's other live tokens",
  (await claim(hex("b"))).rows.length === 0 && (await claim(hex("c"))).rows.length === 0,
);
await db.query(
  `insert into public.password_reset_tokens (user_id, token_hash, email, created_at, expires_at)
   values ($1, $2, 'lan@hotel.vn', now() - interval '2 hours', now() - interval '90 minutes')`,
  [hr, hex("e")],
);
check("an expired token cannot be claimed", (await claim(hex("e"))).rows.length === 0);
const askAsUser = await asRole(
  "authenticated",
  `select * from public.password_reset_request('+84900000002', '${hex("f")}')`,
  m1,
);
const claimAsAnon = await asRole(
  "anon",
  `select * from public.password_reset_claim('${hex("f")}')`,
);
check(
  "nobody signed in, and nobody signed out, can ask for or claim a token",
  /permission denied/.test(askAsUser ?? "") && /permission denied/.test(claimAsAnon ?? ""),
  `${askAsUser} | ${claimAsAnon}`,
);
const readTokens = await asRole(
  "authenticated",
  `select token_hash from public.password_reset_tokens`,
  hr,
);
check(
  "nobody signed in can read the token table, not even its owner",
  /permission denied/.test(readTokens ?? ""),
  readTokens ?? "allowed!",
);

// ── A partner's demo account follows the partner (20261008180000) ──
const luuDoiTac = (ref: string, name: string, active: boolean) =>
  db.query<{ partner_id: string; tao_moi: boolean; active: boolean }>(
    `select * from public.crm_luu_doi_tac($1, $2, $3)`,
    [ref, name, active],
  );
const dt = (await luuDoiTac("dt-1", "Đối tác Demo", true)).rows[0]!;
check("crm_luu_doi_tac makes a new, active partner", dt.tao_moi && dt.active);
const demoOrg = (await one<{ id: string }>(
  `insert into public.organizations (name, seat_limit, kind, partner_id)
   values ('Đối tác · Demo', 1, 'partner_demo', $1) returning id`,
  [dt.partner_id],
))!.id;
const demoSub = await raises(
  `insert into public.subscriptions (org_id, plan_code, kind, starts_at, ends_at, price)
   values ($1, 'p1', 'demo', now() - interval '1 minute', '2100-01-01', 0)`,
  [demoOrg],
);
check(
  "a demo organisation and its open-ended demo plan are allowed",
  demoSub === null,
  demoSub ?? "",
);
const live = async () =>
  (await one<{ a: boolean }>(`select public.org_is_active($1) as a`, [demoOrg]))!.a;
// Open on the partner being active alone (20261010090000): links no longer
// decide it, in either direction.
check("an active partner with no link yet: the demo account is open", (await live()) === true);
await db.query(
  `insert into public.signup_links (token, kind, partner_id, discount_pct, trial_days)
   values ('t-demo-1', 'retail', $1, 20, 7)`,
  [dt.partner_id],
);
await db.query(`update public.signup_links set revoked_at = now() where token = 't-demo-1'`);
await db.query(
  `insert into public.signup_links (token, kind, partner_id, discount_pct, trial_days, expires_at)
   values ('t-demo-2', 'retail', $1, 20, 7, now() - interval '1 day')`,
  [dt.partner_id],
);
check("every link revoked or past its end: the account stays open", (await live()) === true);
await db.query(
  `insert into public.signup_links (token, kind, partner_id, discount_pct, trial_days, expires_at)
   values ('t-demo-3', 'retail', $1, 20, 7, now() + interval '30 days')`,
  [dt.partner_id],
);
const off = (await luuDoiTac("dt-1", "Đối tác Demo", false)).rows[0]!;
const stamped = await one<{ s: string | null }>(
  `select status_changed_at as s from public.partners where id = $1`,
  [dt.partner_id],
);
check(
  "switching the partner off closes the demo account and stamps the change",
  !off.tao_moi && !off.active && (await live()) === false && stamped?.s !== null,
);
check(
  "a switched-off partner's link takes nobody in",
  (await db.query(`select * from public.claim_signup_link('t-demo-3')`)).rows.length === 0,
);
await luuDoiTac("dt-1", "Đối tác Demo", true);
check(
  "switched back on: the link works and the account opens",
  (await db.query(`select * from public.claim_signup_link('t-demo-3')`)).rows.length === 1 &&
    (await live()) === true,
);
const demoUser = (await one<{ id: string }>(
  `insert into auth.users (phone, raw_app_meta_data) values ('84900000077', $1) returning id`,
  [JSON.stringify({ role: "member", org_id: demoOrg })],
))!.id;
check(
  "the demo organisation holds its one learner",
  /SEAT_QUOTA_EXCEEDED/.test(
    (await raises(`insert into auth.users (phone, raw_app_meta_data) values ('84900000078', $1)`, [
      JSON.stringify({ role: "member", org_id: demoOrg }),
    ])) ?? "",
  ),
);
const otherOrgLive = await one<{ a: boolean }>(`select public.org_is_active($1) as a`, [org]);
check("a hotel's own rule is unchanged", otherOrgLive?.a === true);
await db.query(`insert into public.partners (name) values ('Đối tác Làm Trong App')`);
const adoptedDt = (await luuDoiTac("dt-2", "đối tác làm trong app", true)).rows[0]!;
const adoptedCount = await one<{ n: number }>(
  `select count(*)::int as n from public.partners where lower(name) = lower('Đối tác làm trong app')`,
);
check(
  "crm_luu_doi_tac adopts the same-named partner made in the app",
  !adoptedDt.tao_moi && adoptedCount?.n === 1,
);
check(
  "renaming onto another partner's name is refused",
  /partners_name_key/.test(
    (await raises(`select * from public.crm_luu_doi_tac('dt-2', 'Đối tác Demo', true)`)) ?? "",
  ),
);
const doiTacAsUser = await asRole(
  "authenticated",
  `select * from public.crm_luu_doi_tac('dt-3', 'Ai đó', true)`,
  owner,
);
const liveAsUser = await asRole(
  "authenticated",
  `select public.partner_is_live('${dt.partner_id}')`,
  owner,
);
check(
  "nobody signed in can call crm_luu_doi_tac or partner_is_live",
  /permission denied/.test(doiTacAsUser ?? "") && /permission denied/.test(liveAsUser ?? ""),
  `${doiTacAsUser} | ${liveAsUser}`,
);
const activation = await raises(
  `insert into public.password_reset_tokens (user_id, token_hash, email, expires_at, purpose)
   values ($1, $2, null, now() + interval '7 days', 'activate')`,
  [demoUser, "9".repeat(64)],
);
check("an activation token needs no email", activation === null, activation ?? "");
check(
  "a token's purpose is reset or activate, nothing else",
  /password_reset_tokens_purpose_check/.test(
    (await raises(
      `insert into public.password_reset_tokens (user_id, token_hash, expires_at, purpose)
       values ($1, $2, now() + interval '1 hour', 'other')`,
      [demoUser, "8".repeat(64)],
    )) ?? "",
  ),
);
check(
  "the CRM can be told a partner changed",
  (await raises(
    `insert into public.crm_events (loai, du_lieu) values ('doi_tac_cap_nhat', '{"doi_tac_crm_id":"dt-1"}')`,
  )) === null,
);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
