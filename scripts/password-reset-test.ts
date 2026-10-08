// Password reset by email, the steps between the database and the mail
// service, tested with fakes for both (password-reset.server.ts takes
// them as `deps`). What the database does with a token — once, 30
// minutes, three an hour — is tested in scripts/db/schema-test.ts.
//
//   bun scripts/password-reset-test.ts
process.env.SUPABASE_URL = "http://127.0.0.1:9";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-not-a-key";

const { startReset, finishReset, sha256Hex, newResetToken, resetEmail } =
  await import("../src/lib/password-reset.server.ts");
const { optionalContactEmail, contactEmailProblem } = await import("../src/lib/contact-email.ts");
const { mapCsvHeaders } = await import("../src/lib/csv.ts");
type Deps = Parameters<typeof startReset>[1];

let pass = 0;
let fail = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
}
async function error(p: Promise<unknown>): Promise<string | null> {
  try {
    await p;
    return null;
  } catch (e) {
    return (e as Error).message;
  }
}

/** One account, +84912345678, with an email unless told otherwise. */
function fakes(opts: { email?: string | null; refuse?: string } = {}) {
  const email = opts.email === undefined ? "lan@hotel.vn" : opts.email;
  const tokens = new Map<string, { used: boolean; id: string }>();
  const mail: { to: string; subject: string; html: string; text: string }[] = [];
  const released: string[] = [];
  const passwords: string[] = [];
  const deps: Deps = {
    async request(phone, tokenHash) {
      if (phone !== "+84912345678" || !email) return null;
      tokens.set(tokenHash, { used: false, id: `t${tokens.size + 1}` });
      return { email, full_name: "Lan <HR>" };
    },
    async claim(tokenHash) {
      const t = tokens.get(tokenHash);
      if (!t || t.used) return null;
      t.used = true;
      return { user_id: "u1", token_id: t.id };
    },
    async release(tokenId) {
      released.push(tokenId);
      for (const t of tokens.values()) if (t.id === tokenId) t.used = false;
    },
    async setPassword(_userId, password) {
      if (opts.refuse) return opts.refuse;
      passwords.push(password);
      return null;
    },
    async finish() {
      return { phone: "84912345678" };
    },
    async send(message) {
      mail.push(message);
      return true;
    },
    origin: "https://hospitality.example",
  };
  return { deps, tokens, mail, released, passwords };
}
const tokenOf = (url: string) => /\/dat-lai-mat-khau\/([A-Za-z0-9_-]+)/.exec(url)?.[1] ?? "";

// ── Token
const t1 = newResetToken();
check("a token is 43 URL-safe characters", /^[A-Za-z0-9_-]{43}$/.test(t1), t1);
check("two tokens differ", newResetToken() !== t1);
check(
  "sha256 of a token is the 64-hex form the database requires",
  /^[0-9a-f]{64}$/.test(await sha256Hex(t1)),
);
check(
  "sha256 matches a known vector",
  (await sha256Hex("abc")) === "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
);

// ── Asking for a link
const a = fakes();
await startReset("+84912345678", a.deps);
const link = tokenOf(a.mail[0]?.text ?? "");
check(
  "a phone with an email gets one mail, to that address, with a link",
  a.mail.length === 1 && a.mail[0]!.to === "lan@hotel.vn" && link.length === 43,
  a.mail[0]?.text,
);
check(
  "the database holds the token's hash, never the token",
  a.tokens.has(await sha256Hex(link)) && !a.tokens.has(link),
);
check(
  "the mail's button carries the same link as its text",
  a.mail[0]!.html.includes(`https://hospitality.example/dat-lai-mat-khau/${link}`),
);
check(
  "the name in the mail is escaped",
  a.mail[0]!.html.includes("Lan &lt;HR&gt;") && !a.mail[0]!.html.includes("<HR>"),
);
const none = fakes({ email: null });
await startReset("+84912345678", none.deps);
await startReset("+84900000000", a.deps);
check(
  "no email on the account, or no account: no mail, and no error either way",
  none.mail.length === 0 && a.mail.length === 1,
);

// ── Using it
const done = await finishReset(link, "matkhaumoi1", a.deps);
check(
  "the link sets the password and hands back the phone to sign in with",
  a.passwords[0] === "matkhaumoi1" && done.phone === "+84912345678",
  JSON.stringify(done),
);
check(
  "the same link a second time is refused",
  /hết hạn hoặc đã được dùng/.test((await error(finishReset(link, "khac12345", a.deps))) ?? ""),
);
check(
  "a made-up link is refused",
  /hết hạn hoặc đã được dùng/.test(
    (await error(finishReset(newResetToken(), "khac12345", a.deps))) ?? "",
  ),
);
const r = fakes({ refuse: "Password is known to be weak" });
await startReset("+84912345678", r.deps);
const rLink = tokenOf(r.mail[0]!.text);
const refused = await error(finishReset(rLink, "12345678", r.deps));
check(
  "a refused password says why and gives the link back",
  refused === "Password is known to be weak" && r.released.length === 1,
  `${refused} / released ${r.released.join(",")}`,
);
check("the given-back link still works", (await r.deps.claim(await sha256Hex(rLink))) !== null);
check("the mail says how long the link lasts", resetEmail(null, "u").text.includes("30 phút"));

// ── The address itself
check(
  "an email is trimmed and lower-cased; an empty box means none",
  optionalContactEmail.parse("  Lan@Hotel.VN ") === "lan@hotel.vn" &&
    optionalContactEmail.parse("") === null &&
    optionalContactEmail.parse(undefined) === null,
);
check(
  "a typo is caught on the form",
  contactEmailProblem("lan@hotel") !== null &&
    contactEmailProblem("lan hotel.vn") !== null &&
    contactEmailProblem("") === null,
);
check(
  "the CSV import finds an Email column",
  mapCsvHeaders(["Tên", "Số điện thoại", "Mật khẩu", "Phòng ban", "Email"]).email === 4 &&
    mapCsvHeaders(["Tên", "SĐT"]).email === -1,
);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
