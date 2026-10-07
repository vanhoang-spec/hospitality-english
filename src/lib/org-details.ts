// A hotel's company details — the name on its business licence, address,
// tax code, and the HR person who represents it. One set of rules for the
// three forms that collect them (the platform console, the hotel signup
// link, the console's edit row) and for the server functions behind them,
// so a value the page accepts is never refused by the database's checks
// in supabase/migrations/20261007090000_org_details.sql.
import { z } from "zod";
import { normalizeVNPhone, InvalidPhoneError } from "@/lib/phone";

/** Ten digits; a branch adds a dash and three more. */
export const TAX_CODE_PATTERN = /^\d{10}(-\d{3})?$/;

const legalName = z
  .string()
  .trim()
  .min(2, "Hãy nhập tên công ty đúng như trên giấy phép kinh doanh.")
  .max(200, "Tên công ty dài quá 200 ký tự.");

const address = z
  .string()
  .trim()
  .min(5, "Hãy nhập địa chỉ của công ty.")
  .max(300, "Địa chỉ dài quá 300 ký tự.");

const taxCode = z
  .string()
  .transform((s) => s.replace(/[\s.]/g, ""))
  .pipe(
    z
      .string()
      .regex(
        TAX_CODE_PATTERN,
        "Mã số thuế gồm 10 chữ số; chi nhánh thêm dấu gạch và 3 chữ số (VD: 0123456789-001).",
      ),
  );

const repName = z
  .string()
  .trim()
  .min(2, "Hãy nhập họ tên người đại diện.")
  .max(120, "Họ tên dài quá 120 ký tự.");

const repEmail = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, "Email dài quá 254 ký tự.")
  .email("Email người đại diện không hợp lệ.");

const repPhone = z.string().transform((raw, ctx) => {
  try {
    return normalizeVNPhone(raw);
  } catch (e) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: e instanceof InvalidPhoneError ? e.message : "Số điện thoại không hợp lệ.",
    });
    return z.NEVER;
  }
});

/** The company half: what the licence says. */
export const companySchema = z.object({ legalName, address, taxCode });

/** Everything kept about a hotel, as the edit row sends it. */
export const orgDetailsSchema = companySchema.extend({ repName, repPhone, repEmail });

/** When a hotel is opened, its representative is the person getting the
 *  first HR account — name and phone come from those fields, so only the
 *  email is extra. */
export const newOrgDetailsSchema = companySchema.extend({ repEmail });

export type OrgDetailsInput = z.input<typeof orgDetailsSchema>;
export type OrgDetails = z.output<typeof orgDetailsSchema>;

/** The first problem with a form's values, in words for the person filling
 *  it in — or null when they are fine. Pages call this before sending, so
 *  the server's own check (the same schema) only ever catches tampering. */
export function firstProblem(schema: z.ZodTypeAny, values: unknown): string | null {
  const result = schema.safeParse(values);
  return result.success ? null : (result.error.issues[0]?.message ?? "Thông tin chưa hợp lệ.");
}
