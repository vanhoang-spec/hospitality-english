import { createFileRoute } from "@tanstack/react-router";

// POST /api/crm — the one door the Embassy CRM knocks on (contract:
// docs/TICH_HOP_HOSPITALITY.md in the CRM repo). No session, no cookie:
// a request is let in only by its HMAC signature over the exact bytes of
// its body, with the secret both sides hold (CRM_HMAC_SECRET here).
//
// Answers follow the contract: 200 {ok:true,…}; 4xx {ok:false, ma_loi,
// thong_diep} which the CRM does not retry; 5xx which it retries later.
// 503 chua_cau_hinh until the secret is set, so the CRM keeps its queue
// instead of dropping it.

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

export const Route = createFileRoute("/api/crm")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.CRM_HMAC_SECRET;
        if (!secret) {
          return json(503, {
            ok: false,
            ma_loi: "chua_cau_hinh",
            thong_diep: "App chưa được cài khoá CRM_HMAC_SECRET.",
          });
        }

        const rawBody = await request.text();
        const { checkCrmSignature } = await import("@/lib/crm-signature");
        const verdict = await checkCrmSignature({
          rawBody,
          timestamp: request.headers.get("x-crm-timestamp"),
          signature: request.headers.get("x-crm-signature"),
          secret,
        });
        if (verdict !== "ok") {
          return json(401, {
            ok: false,
            ma_loi: verdict,
            thong_diep:
              verdict === "lech_gio"
                ? "Giờ gửi lệch quá 300 giây so với máy chủ app."
                : "Chữ ký không đúng.",
          });
        }

        const { crmCommand, runCrmCommand, CrmError, statusOf } =
          await import("@/lib/crm-api.server");
        let body: unknown;
        try {
          body = JSON.parse(rawBody);
        } catch {
          return json(400, {
            ok: false,
            ma_loi: "du_lieu_sai",
            thong_diep: "Thân lệnh không phải JSON.",
          });
        }
        const parsed = crmCommand.safeParse(body);
        if (!parsed.success) {
          const issue = parsed.error.issues[0];
          return json(400, {
            ok: false,
            ma_loi: "du_lieu_sai",
            thong_diep: issue
              ? `${issue.path.join(".") || "lệnh"}: ${issue.message}`
              : "Lệnh không hợp lệ.",
          });
        }

        try {
          const result = await runCrmCommand(parsed.data, new URL(request.url).origin);
          return json(200, { ok: true, ...result });
        } catch (e) {
          if (e instanceof CrmError) {
            return json(statusOf(e.code), { ok: false, ma_loi: e.code, thong_diep: e.message });
          }
          console.error("crm api:", e);
          return json(500, {
            ok: false,
            ma_loi: "loi_may_chu",
            thong_diep: "Lỗi máy chủ app — CRM sẽ thử lại.",
          });
        }
      },
    },
  },
});
