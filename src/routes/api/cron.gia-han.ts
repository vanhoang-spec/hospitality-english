import { createFileRoute } from "@tanstack/react-router";

// GET /api/cron/gia-han — once a day (vercel.json "crons"), open the
// renewal orders that fell due (createDueRenewals), so the CRM hears about
// them and CS can send the payment link even to a learner who has not
// opened the app. Learners who do open the app get theirs on the spot too.
//
// Vercel calls cron paths with "Authorization: Bearer <CRON_SECRET>" when
// that environment variable is set. Without it this refuses (503), so the
// path is never an open trigger.

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

export const Route = createFileRoute("/api/cron/gia-han")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const secret = process.env.CRON_SECRET;
        if (!secret) return json(503, { ok: false, error: "CRON_SECRET chưa được đặt." });
        if (request.headers.get("authorization") !== `Bearer ${secret}`) {
          return json(401, { ok: false, error: "Sai khoá." });
        }
        try {
          const { createDueRenewals } = await import("@/lib/account-provisioning.server");
          const made = await createDueRenewals();
          return json(200, { ok: true, don_gia_han_moi: made });
        } catch (e) {
          console.error("cron gia-han:", e);
          return json(500, { ok: false, error: "Lỗi máy chủ." });
        }
      },
    },
  },
});
