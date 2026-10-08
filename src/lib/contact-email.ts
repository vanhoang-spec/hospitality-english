// A person's contact email — where a forgotten password is reset
// (profiles.email, migration 20261008150000). Signing in stays by phone.
// Optional everywhere: an empty box means none.
import { z } from "zod";

const isEmail = (v: string) => z.string().email().safeParse(v).success;

/** Trimmed and lower-cased, the form the database insists on; "" → null. */
export const optionalContactEmail = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, "Email dài quá 254 ký tự.")
  .refine((v) => v === "" || isEmail(v), "Email không hợp lệ.")
  .nullish()
  .transform((v) => v || null);

/** For a form: what is wrong with what was typed, or null if it is fine. */
export function contactEmailProblem(raw: string): string | null {
  const parsed = optionalContactEmail.safeParse(raw);
  return parsed.success ? null : (parsed.error.issues[0]?.message ?? "Email không hợp lệ.");
}
