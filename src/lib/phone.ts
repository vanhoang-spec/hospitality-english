// Vietnamese phone number helpers.
//
// Supabase Auth stores auth.users.phone (and our denormalized profiles.phone
// copy) WITHOUT a leading '+' — e.g. "84912345678", not "+84912345678".
// The Admin API and signInWithPassword both expect E.164 WITH '+' as input;
// normalizeVNPhone() produces that input format consistently for both call
// sites so a user created with one form can always sign in with the other.

const VN_NATIONAL_DIGITS = 9;

export class InvalidPhoneError extends Error {
  constructor() {
    super("Số điện thoại không hợp lệ. Nhập đúng định dạng số Việt Nam (VD: 0912345678).");
    this.name = "InvalidPhoneError";
  }
}

/** "0912345678" | "84912345678" | "+84912345678" -> "+84912345678" */
export function normalizeVNPhone(raw: string): string {
  const digits = raw.trim().replace(/[\s.\-()]/g, "");

  let national: string;
  if (digits.startsWith("+84")) national = digits.slice(3);
  else if (digits.startsWith("84")) national = digits.slice(2);
  else if (digits.startsWith("0")) national = digits.slice(1);
  else national = digits;

  if (!/^\d+$/.test(national) || national.length !== VN_NATIONAL_DIGITS) {
    throw new InvalidPhoneError();
  }

  return `+84${national}`;
}

/** Stored form ("84912345678" or "+84912345678") -> local display ("0912345678") */
export function formatPhoneDisplay(stored: string | null | undefined): string {
  if (!stored) return "—";
  const digits = stored.replace(/^\+/, "");
  if (digits.startsWith("84") && digits.length === 2 + VN_NATIONAL_DIGITS) {
    return `0${digits.slice(2)}`;
  }
  return `+${digits}`;
}
