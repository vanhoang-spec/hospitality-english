#!/usr/bin/env node
// Bootstrap a new hotel/resort organization + its first org_admin account.
// Run locally (never in CI) with the service-role key from .env:
//
//   node scripts/seed-org.mjs "Maison Lumière" 100 "Nguyen Van A" 0912345678 "TempPass123!"
//
// Promoting the app owner's own account to super_admin is a separate,
// one-off manual SQL statement — not this script's job.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENV_PATH = join(__dirname, "..", ".env");

function loadEnv() {
  const env = { ...process.env };
  let raw;
  try {
    raw = readFileSync(ENV_PATH, "utf8");
  } catch {
    return env;
  }
  for (const line of raw.split(/\r?\n/)) {
    if (!line.includes("=") || line.trim().startsWith("#")) continue;
    const idx = line.indexOf("=");
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^"|"$/g, "");
    if (!(key in env)) env[key] = value;
  }
  return env;
}

function normalizeVNPhone(raw) {
  const digits = raw.trim().replace(/[\s.\-()]/g, "");
  let national;
  if (digits.startsWith("+84")) national = digits.slice(3);
  else if (digits.startsWith("84")) national = digits.slice(2);
  else if (digits.startsWith("0")) national = digits.slice(1);
  else national = digits;
  if (!/^\d{9}$/.test(national)) {
    throw new Error(
      `Số điện thoại không hợp lệ: "${raw}" (cần đúng 9 chữ số sau đầu số quốc gia).`,
    );
  }
  return `+84${national}`;
}

async function main() {
  const [orgName, seatLimitRaw, adminName, adminPhoneRaw, adminPassword] = process.argv.slice(2);

  if (!orgName || !seatLimitRaw || !adminName || !adminPhoneRaw || !adminPassword) {
    console.error(
      'Usage: node scripts/seed-org.mjs "<Tên khách sạn>" <seat_limit> "<Tên admin>" <SĐT admin> "<Mật khẩu>"',
    );
    process.exit(1);
  }

  const seatLimit = Number(seatLimitRaw);
  if (!Number.isInteger(seatLimit) || seatLimit <= 0) {
    console.error(`seat_limit phải là số nguyên dương, nhận được: "${seatLimitRaw}"`);
    process.exit(1);
  }
  if (adminPassword.length < 8) {
    console.error("Mật khẩu cần ít nhất 8 ký tự.");
    process.exit(1);
  }

  const adminPhone = normalizeVNPhone(adminPhoneRaw);

  const env = loadEnv();
  const SUPABASE_URL = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error("Thiếu SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trong .env");
    process.exit(1);
  }

  const restHeaders = {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };

  console.log(`Đang tạo tổ chức "${orgName}" (seat_limit=${seatLimit})…`);
  const orgRes = await fetch(`${SUPABASE_URL}/rest/v1/organizations`, {
    method: "POST",
    headers: { ...restHeaders, Prefer: "return=representation" },
    body: JSON.stringify({ name: orgName, seat_limit: seatLimit }),
  });
  const orgBody = await orgRes.json();
  if (!orgRes.ok) {
    console.error("Tạo tổ chức thất bại:", orgBody);
    process.exit(1);
  }
  const org = Array.isArray(orgBody) ? orgBody[0] : orgBody;
  console.log(`✓ Tổ chức đã tạo: ${org.id}`);

  console.log(`Đang tạo tài khoản admin "${adminName}" (${adminPhone})…`);
  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: restHeaders,
    body: JSON.stringify({
      phone: adminPhone,
      password: adminPassword,
      phone_confirm: true,
      user_metadata: { full_name: adminName, org_id: org.id, role: "org_admin" },
    }),
  });
  const user = await userRes.json();
  if (!userRes.ok) {
    console.error("Tạo tài khoản admin thất bại:", user);
    console.error(
      `Tổ chức "${orgName}" (${org.id}) đã được tạo — xóa thủ công nếu muốn thử lại từ đầu.`,
    );
    process.exit(1);
  }

  console.log("✓ Hoàn tất. Thông tin đăng nhập cho admin đầu tiên:");
  console.log(`  Tổ chức:        ${orgName} (${org.id})`);
  console.log(`  SĐT đăng nhập:  ${adminPhoneRaw}`);
  console.log(`  Mật khẩu:       ${adminPassword}`);
  console.log(`  User ID:        ${user.id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
