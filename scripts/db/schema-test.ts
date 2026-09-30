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

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
