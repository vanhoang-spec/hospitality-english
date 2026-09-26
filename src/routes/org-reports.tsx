import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession, useProfile } from "@/lib/auth";
import { useOrgSubscription, PLAN_LABEL, TERM_LABEL } from "@/lib/subscription";
import { toCsv } from "@/lib/csv";

export const Route = createFileRoute("/org-reports")({
  head: () => ({ meta: [{ title: "Báo cáo học tập — Embassy Hospitality" }] }),
  component: OrgReportsPage,
});

const WINDOW_DAYS = 30;

type Row = {
  userId: string;
  name: string;
  department: string | null;
  minutes: number;
  attempts: number;
  correct: number;
  firstTry: number;
  firstTryCorrect: number;
  reviewsDue: number;
  weeksTouched: number;
};

function pct(n: number, d: number) {
  return d === 0 ? "—" : `${Math.round((n / d) * 100)}%`;
}

function OrgReportsPage() {
  const { session } = useSession();
  const { data: profile } = useProfile(session?.user.id);
  const orgId = profile?.org_id ?? null;
  const isHr = profile?.role === "org_admin";
  const { data: subscription } = useOrgSubscription(orgId);
  const [query, setQuery] = useState("");

  const since = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - WINDOW_DAYS);
    return d.toISOString();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["org-report", orgId, since] as const,
    queryFn: async (): Promise<Row[]> => {
      if (!orgId) return [];
      // Aggregated in the browser: Postgrest has no GROUP BY, and a hotel
      // is at most 500 learners over a 30-day window. If a chain ever
      // outgrows this, the answer is a view, not a bigger fetch.
      const [{ data: members }, { data: sessions }, { data: attempts }, { data: reviews }] =
        await Promise.all([
          supabase.from("profiles").select("id, full_name, department, role").eq("org_id", orgId),
          supabase
            .from("study_sessions")
            .select("user_id, seconds_active, started_at")
            .eq("org_id", orgId)
            .gte("started_at", since)
            .limit(20000),
          supabase
            .from("attempts")
            .select("user_id, correct, is_first_try, week_number, created_at")
            .eq("org_id", orgId)
            .gte("created_at", since)
            .limit(50000),
          supabase
            .from("review_items")
            .select("user_id, due_at")
            .lte("due_at", new Date().toISOString().slice(0, 10))
            .limit(20000),
        ]);

      const rows = new Map<string, Row>();
      for (const m of members ?? []) {
        if (m.role !== "member") continue;
        rows.set(m.id, {
          userId: m.id,
          name: m.full_name ?? "—",
          department: m.department,
          minutes: 0,
          attempts: 0,
          correct: 0,
          firstTry: 0,
          firstTryCorrect: 0,
          reviewsDue: 0,
          weeksTouched: 0,
        });
      }
      const weeks = new Map<string, Set<number>>();
      for (const s of sessions ?? []) {
        const row = rows.get(s.user_id);
        if (row) row.minutes += Math.round((s.seconds_active ?? 0) / 60);
      }
      for (const a of attempts ?? []) {
        const row = rows.get(a.user_id);
        if (!row) continue;
        row.attempts++;
        if (a.correct) row.correct++;
        if (a.is_first_try) {
          row.firstTry++;
          if (a.correct) row.firstTryCorrect++;
        }
        const set = weeks.get(a.user_id) ?? new Set<number>();
        set.add(a.week_number);
        weeks.set(a.user_id, set);
      }
      for (const r of reviews ?? []) {
        const row = rows.get(r.user_id);
        if (row) row.reviewsDue++;
      }
      for (const [userId, set] of weeks) {
        const row = rows.get(userId);
        if (row) row.weeksTouched = set.size;
      }
      return [...rows.values()].sort((a, b) => b.minutes - a.minutes);
    },
    enabled: !!orgId && isHr,
  });

  if (!profile) return <Shell>Đang tải…</Shell>;
  if (!isHr) return <Shell>Trang này dành cho tài khoản HR của khách sạn.</Shell>;

  const rows = (data ?? []).filter((r) =>
    query.trim() ? r.name.toLowerCase().includes(query.trim().toLowerCase()) : true,
  );
  const totals = rows.reduce(
    (t, r) => ({
      minutes: t.minutes + r.minutes,
      attempts: t.attempts + r.attempts,
      correct: t.correct + r.correct,
      firstTry: t.firstTry + r.firstTry,
      firstTryCorrect: t.firstTryCorrect + r.firstTryCorrect,
      active: t.active + (r.minutes > 0 ? 1 : 0),
    }),
    { minutes: 0, attempts: 0, correct: 0, firstTry: 0, firstTryCorrect: 0, active: 0 },
  );

  function exportCsv() {
    const csv = toCsv([
      [
        "Họ tên",
        "Phòng ban",
        "Phút học 30 ngày",
        "Số lượt làm",
        "Đúng",
        "Đúng lần đầu",
        "Thẻ ôn quá hạn",
        "Số tuần đã học",
      ],
      ...rows.map((r) => [
        r.name,
        r.department ?? "",
        String(r.minutes),
        String(r.attempts),
        pct(r.correct, r.attempts),
        pct(r.firstTryCorrect, r.firstTry),
        String(r.reviewsDue),
        String(r.weeksTouched),
      ]),
    ]);
    // Excel on Windows reads a CSV as the system codepage unless it finds a
    // byte-order mark, and this file is full of Vietnamese.
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bao-cao-hoc-tap-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Shell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
            Báo cáo · {WINDOW_DAYS} ngày gần nhất
          </div>
          <h1 className="font-display mt-2 text-3xl">Học viên của khách sạn</h1>
          {subscription && (
            <p className="mt-1 text-xs text-foreground/60">
              Gói {PLAN_LABEL[subscription.planCode] ?? subscription.planCode} ·{" "}
              {TERM_LABEL[subscription.kind] ?? subscription.kind} · còn {subscription.daysLeft}{" "}
              ngày
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên…"
            className="border border-primary/30 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={exportCsv}
            className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
          >
            Xuất CSV
          </button>
          <Link
            to="/org-admin"
            className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
          >
            Danh sách nhân sự
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Học viên có học" value={`${totals.active}/${rows.length}`} />
        <Stat label="Tổng giờ học" value={`${Math.round(totals.minutes / 60)} giờ`} />
        <Stat label="Lượt làm bài" value={String(totals.attempts)} />
        <Stat label="Tỷ lệ đúng" value={pct(totals.correct, totals.attempts)} />
        <Stat label="Đúng ngay lần đầu" value={pct(totals.firstTryCorrect, totals.firstTry)} />
      </div>

      <div className="mt-8 overflow-x-auto border border-primary/20">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-card text-[10px] uppercase tracking-[0.2em] text-foreground/60">
            <tr>
              <th className="px-3 py-2 text-left">Học viên</th>
              <th className="px-3 py-2 text-left">Phòng ban</th>
              <th className="px-3 py-2 text-right">Phút học</th>
              <th className="px-3 py-2 text-right">Lượt làm</th>
              <th className="px-3 py-2 text-right">Đúng</th>
              <th className="px-3 py-2 text-right">Đúng lần đầu</th>
              <th className="px-3 py-2 text-right">Ôn quá hạn</th>
              <th className="px-3 py-2 text-right">Tuần đã học</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-foreground/60">
                  Đang tải…
                </td>
              </tr>
            )}
            {!isLoading && rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-foreground/60">
                  Chưa có dữ liệu học tập trong {WINDOW_DAYS} ngày qua.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={r.userId} className="border-t border-primary/10">
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2 text-foreground/70">{r.department ?? "—"}</td>
                <td className="px-3 py-2 text-right">{r.minutes}</td>
                <td className="px-3 py-2 text-right">{r.attempts}</td>
                <td className="px-3 py-2 text-right">{pct(r.correct, r.attempts)}</td>
                <td className="px-3 py-2 text-right">{pct(r.firstTryCorrect, r.firstTry)}</td>
                <td className="px-3 py-2 text-right">{r.reviewsDue}</td>
                <td className="px-3 py-2 text-right">{r.weeksTouched}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-foreground/50">
        Thời gian học chỉ tính khi tab đang mở và hiển thị. "Đúng lần đầu" tính trên lượt trả lời
        đầu tiên của mỗi câu trong một buổi học.
      </p>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-primary/20 bg-card p-4">
      <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">{label}</div>
      <div className="font-display mt-1 text-2xl text-primary">{value}</div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>;
}
