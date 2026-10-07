// The five commands the Embassy CRM sends this app (contract:
// docs/TICH_HOP_HOSPITALITY.md in the CRM repo — change that file first,
// then this one). The route in src/routes/api/crm.ts checks the signature
// and hands the parsed body here.
//
// Every command is safe to repeat: links are keyed by the CRM's crm_ref,
// a paid plan by the CRM's payment id, an order confirmation by the CRM's
// confirmation id. The CRM retries anything that ends in 5xx and gives up
// on 4xx, so a 4xx must mean "this request will never work as sent".
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { activateOrder, logAdminAction } from "@/lib/account-provisioning.server";

export type CrmErrorCode = "du_lieu_sai" | "khong_tim_thay" | "xung_dot";

export class CrmError extends Error {
  constructor(
    readonly code: CrmErrorCode,
    message: string,
  ) {
    super(message);
  }
}

const STATUS: Record<CrmErrorCode, number> = {
  du_lieu_sai: 400,
  khong_tim_thay: 404,
  xung_dot: 409,
};
export const statusOf = (code: CrmErrorCode) => STATUS[code];

/** A database error raised on purpose by crm_luu_link / crm_cap_goi starts
 *  with the contract's error word; anything else is a fault worth a retry. */
function fromDb(message: string): never {
  if (message.includes("XUNG_DOT")) throw new CrmError("xung_dot", message);
  if (message.includes("KHONG_TIM_THAY")) throw new CrmError("khong_tim_thay", message);
  if (message.includes("DU_LIEU_SAI")) throw new CrmError("du_lieu_sai", message);
  if (/partners_name_key/.test(message)) {
    throw new CrmError("xung_dot", "Tên đối tác trùng với một đối tác khác trong app.");
  }
  if (/signup_links_within_uses/.test(message)) {
    throw new CrmError("xung_dot", "Số lượt tối đa nhỏ hơn số người đã đăng ký qua link.");
  }
  throw new Error(message);
}

const CRM_REF = z.string().trim().min(1).max(100);
const DATE = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày phải có dạng YYYY-MM-DD.");

const luuLink = z.object({
  hanh_dong: z.literal("luu_link"),
  crm_ref: CRM_REF,
  doi_tuong: z.enum(["khach_san", "ca_nhan"]),
  doi_tac: z.object({ crm_id: CRM_REF, ten: z.string().trim().min(2).max(120) }),
  giam: z.discriminatedUnion("kieu", [
    z.object({
      kieu: z.literal("khong"),
      ap_dung: z.enum(["hop_dong_dau", "moi_lan_mua"]).optional(),
    }),
    z.object({
      kieu: z.literal("phan_tram"),
      gia_tri: z.number().min(0).max(90),
      ap_dung: z.enum(["hop_dong_dau", "moi_lan_mua"]).optional(),
    }),
    z.object({
      kieu: z.literal("so_tien"),
      gia_tri: z.number().min(0).max(1_000_000_000),
      ap_dung: z.enum(["hop_dong_dau", "moi_lan_mua"]).optional(),
    }),
  ]),
  hoc_thu_ngay: z.number().int().min(1).max(60),
  het_han: DATE.nullable(),
  so_luot_toi_da: z.number().int().min(1).max(100_000).nullable(),
  dang_mo: z.boolean(),
});

const layBangGia = z.object({ hanh_dong: z.literal("lay_bang_gia") });

const laySuKien = z.object({
  hanh_dong: z.literal("lay_su_kien"),
  sau_id: z.number().int().min(0),
  toi_da: z.number().int().min(1).max(500).default(200),
});

const capGoi = z.object({
  hanh_dong: z.literal("cap_goi"),
  crm_ref: CRM_REF,
  app_org_id: z.string().uuid(),
  goi: z.enum(["p50", "p100", "p200", "p300", "p500"]),
  ky_han: z.enum(["m3", "m6", "m9", "m12"]),
  so_tien_truoc_vat: z.number().min(0),
});

const xacNhanDon = z.object({
  hanh_dong: z.literal("xac_nhan_don"),
  crm_ref: CRM_REF,
  ma_don: z.string().trim().min(4).max(20),
  ma_giao_dich: z.string().trim().max(120).nullable().optional(),
});

export const crmCommand = z.discriminatedUnion("hanh_dong", [
  luuLink,
  layBangGia,
  laySuKien,
  capGoi,
  xacNhanDon,
]);
export type CrmCommand = z.infer<typeof crmCommand>;

/** 18 random bytes, URL-safe — the same shape as the app's own links. */
function newToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function runCrmCommand(
  cmd: CrmCommand,
  origin: string,
): Promise<Record<string, unknown>> {
  switch (cmd.hanh_dong) {
    case "luu_link": {
      const g = cmd.giam;
      const pct = g.kieu === "phan_tram" ? g.gia_tri : g.kieu === "khong" ? 0 : null;
      const amount = g.kieu === "so_tien" ? g.gia_tri : null;
      // Hotels need a scope; for one learner the first order is the only
      // one the app sells today, so the CRM's choice is kept for later.
      const scope = g.ap_dung === "moi_lan_mua" ? "every" : "first";
      const { data, error } = await supabaseAdmin.rpc("crm_luu_link", {
        p_crm_ref: cmd.crm_ref,
        p_kind: cmd.doi_tuong === "khach_san" ? "partner_hotel" : "retail",
        p_partner_ref: cmd.doi_tac.crm_id,
        p_partner_name: cmd.doi_tac.ten,
        p_discount_pct: pct as number,
        p_discount_amount: amount as number,
        p_discount_scope: scope,
        p_trial_days: cmd.hoc_thu_ngay,
        // The whole of the last day, Vietnam time.
        p_expires_at: (cmd.het_han ? `${cmd.het_han}T23:59:59+07:00` : null) as string,
        p_max_uses: cmd.so_luot_toi_da as number,
        p_open: cmd.dang_mo,
        p_new_token: newToken(),
      });
      if (error) fromDb(error.message);
      const row = (data ?? [])[0];
      if (!row) throw new Error("crm_luu_link returned nothing");
      await logAdminAction({
        actorId: null,
        orgId: null,
        action: row.tao_moi ? "crm.link.create" : "crm.link.update",
        meta: { link_id: row.link_id, crm_ref: cmd.crm_ref, dang_mo: cmd.dang_mo },
      });
      return {
        link_id: row.link_id,
        url: `${origin}/join/${row.link_token}`,
        tao_moi: row.tao_moi,
      };
    }

    case "lay_bang_gia": {
      const [{ data: prices, error }, { data: plans, error: plansErr }] = await Promise.all([
        supabaseAdmin.from("plan_prices").select("plan_code, term, price"),
        supabaseAdmin.from("plans").select("code, seats"),
      ]);
      if (error || plansErr) throw new Error((error ?? plansErr)!.message);
      const seats = new Map((plans ?? []).map((p) => [p.code, p.seats]));
      return {
        gia: (prices ?? [])
          .filter((p) => p.price !== null)
          .map((p) => ({
            goi: p.plan_code,
            so_ghe: seats.get(p.plan_code) ?? null,
            ky_han: p.term,
            gia_niem_yet: Number(p.price),
          })),
      };
    }

    case "lay_su_kien": {
      const { data, error } = await supabaseAdmin
        .from("crm_events")
        .select("id, loai, du_lieu, luc")
        .gt("id", cmd.sau_id)
        .order("id", { ascending: true })
        .limit(cmd.toi_da + 1);
      if (error) throw new Error(error.message);
      const rows = data ?? [];
      return { su_kien: rows.slice(0, cmd.toi_da), con_nua: rows.length > cmd.toi_da };
    }

    case "cap_goi": {
      const { data, error } = await supabaseAdmin.rpc("crm_cap_goi", {
        p_crm_ref: cmd.crm_ref,
        p_org: cmd.app_org_id,
        p_plan: cmd.goi,
        p_term: cmd.ky_han,
        p_price: cmd.so_tien_truoc_vat,
      });
      if (error) fromDb(error.message);
      const row = (data ?? [])[0];
      if (!row) throw new Error("crm_cap_goi returned nothing");
      if (!row.da_xu_ly_truoc) {
        await logAdminAction({
          actorId: null,
          orgId: cmd.app_org_id,
          action: "crm.cap_goi",
          meta: {
            crm_ref: cmd.crm_ref,
            plan: cmd.goi,
            term: cmd.ky_han,
            price: cmd.so_tien_truoc_vat,
            ends_at: row.ket_thuc,
          },
        });
      }
      return { bat_dau: row.bat_dau, ket_thuc: row.ket_thuc, da_xu_ly_truoc: row.da_xu_ly_truoc };
    }

    case "xac_nhan_don": {
      const { data: order, error } = await supabaseAdmin
        .from("orders")
        .select("id, org_id, status, crm_ref, amount")
        .eq("code", cmd.ma_don.toUpperCase())
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (!order) throw new CrmError("khong_tim_thay", `Không có đơn ${cmd.ma_don}.`);

      const current = async () => {
        const { data: sub } = await supabaseAdmin
          .from("subscriptions")
          .select("ends_at")
          .eq("org_id", order.org_id)
          .eq("status", "active")
          .maybeSingle();
        return sub?.ends_at ?? null;
      };

      if (order.status === "paid") {
        if (order.crm_ref === cmd.crm_ref) {
          return { ket_thuc: await current(), so_tien: Number(order.amount), da_xu_ly_truoc: true };
        }
        throw new CrmError(
          "xung_dot",
          order.crm_ref
            ? "Đơn này đã được xác nhận bằng một phiếu khác trong CRM."
            : "Đơn này đã được xác nhận trong app (Super Admin).",
        );
      }
      if (order.status !== "pending") {
        throw new CrmError("xung_dot", "Đơn này đã bị huỷ.");
      }
      try {
        const { endsAt } = await activateOrder({
          orderId: order.id,
          actorId: null,
          paymentRef: cmd.ma_giao_dich ?? null,
          crmRef: cmd.crm_ref,
        });
        return { ket_thuc: endsAt, so_tien: Number(order.amount), da_xu_ly_truoc: false };
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        // Two confirmations for one order racing: the loser sees the order
        // no longer pending. If the winner was this same confirmation (a
        // retry that overtook the first try), that is success, not conflict.
        if (/không còn ở trạng thái chờ/.test(message)) {
          const { data: again } = await supabaseAdmin
            .from("orders")
            .select("status, crm_ref")
            .eq("id", order.id)
            .maybeSingle();
          if (again?.status === "paid" && again.crm_ref === cmd.crm_ref) {
            return {
              ket_thuc: await current(),
              so_tien: Number(order.amount),
              da_xu_ly_truoc: true,
            };
          }
          throw new CrmError("xung_dot", message);
        }
        if (/orders_crm_ref_key/.test(message)) {
          throw new CrmError("xung_dot", "Phiếu CRM này đã dùng để xác nhận một đơn khác.");
        }
        throw e;
      }
    }
  }
}
