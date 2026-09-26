import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession, useProfile } from "@/lib/auth";
import { SHIPPING_DEPARTMENTS } from "@/lib/departments";

export const Route = createFileRoute("/org-access")({
  head: () => ({ meta: [{ title: "Nhóm & quyền truy cập — Embassy Hospitality" }] }),
  component: OrgAccessPage,
});

type Group = { id: string; name: string };
type Member = { id: string; full_name: string | null; department: string | null };
type Rule = {
  id: string;
  group_id: string | null;
  department_id: string;
  week_from: number;
  week_to: number;
};

function OrgAccessPage() {
  const { session } = useSession();
  const { data: profile } = useProfile(session?.user.id);
  const orgId = profile?.org_id ?? null;
  const isHr = profile?.role === "org_admin";
  const qc = useQueryClient();

  const [groupName, setGroupName] = useState("");
  const [ruleGroup, setRuleGroup] = useState<string>("");
  const [ruleDep, setRuleDep] = useState(SHIPPING_DEPARTMENTS[0]?.code ?? "FO");
  const [ruleFrom, setRuleFrom] = useState(1);
  const [ruleTo, setRuleTo] = useState(6);
  const [assignGroup, setAssignGroup] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["org-access-admin", orgId] as const,
    queryFn: async () => {
      if (!orgId) return null;
      const [
        { data: groups },
        { data: members },
        { data: rules },
        { data: settings },
        { data: gm },
      ] = await Promise.all([
        supabase.from("groups").select("id, name").eq("org_id", orgId).order("name"),
        supabase
          .from("profiles")
          .select("id, full_name, department, role")
          .eq("org_id", orgId)
          .eq("role", "member")
          .order("full_name"),
        supabase
          .from("access_rules")
          .select("id, group_id, department_id, week_from, week_to")
          .eq("org_id", orgId),
        supabase.from("org_settings").select("sequential_mode").eq("org_id", orgId).maybeSingle(),
        supabase.from("group_members").select("group_id, user_id"),
      ]);
      return {
        groups: (groups ?? []) as Group[],
        members: (members ?? []) as Member[],
        rules: (rules ?? []) as Rule[],
        sequential: settings?.sequential_mode ?? false,
        membership: (gm ?? []) as { group_id: string; user_id: string }[],
      };
    },
    enabled: !!orgId && isHr,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["org-access-admin", orgId] });

  const addGroup = useMutation({
    mutationFn: async () => {
      if (!orgId || !groupName.trim()) return;
      const { error } = await supabase
        .from("groups")
        .insert({ org_id: orgId, name: groupName.trim(), created_by: session?.user.id ?? null });
      if (error) throw error;
    },
    onSuccess: () => {
      setGroupName("");
      invalidate();
    },
  });

  const removeGroup = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("groups").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const addRule = useMutation({
    mutationFn: async () => {
      if (!orgId) return;
      const { error } = await supabase.from("access_rules").insert({
        org_id: orgId,
        group_id: ruleGroup || null,
        department_id: ruleDep,
        week_from: ruleFrom,
        week_to: ruleTo,
      });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const removeRule = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("access_rules").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const toggleSequential = useMutation({
    mutationFn: async (next: boolean) => {
      if (!orgId) return;
      const { error } = await supabase
        .from("org_settings")
        .upsert({ org_id: orgId, sequential_mode: next, updated_at: new Date().toISOString() });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const setMembership = useMutation({
    mutationFn: async ({ userId, inGroup }: { userId: string; inGroup: boolean }) => {
      if (!assignGroup) return;
      if (inGroup) {
        const { error } = await supabase
          .from("group_members")
          .insert({ group_id: assignGroup, user_id: userId });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("group_members")
          .delete()
          .eq("group_id", assignGroup)
          .eq("user_id", userId);
        if (error) throw error;
      }
    },
    onSuccess: invalidate,
  });

  if (!profile) return <Shell>Đang tải…</Shell>;
  if (!isHr) return <Shell>Trang này dành cho tài khoản HR của khách sạn.</Shell>;

  const groups = data?.groups ?? [];
  const members = data?.members ?? [];
  const rules = data?.rules ?? [];
  const membership = data?.membership ?? [];
  const inAssignGroup = new Set(
    membership.filter((m) => m.group_id === assignGroup).map((m) => m.user_id),
  );
  const groupName_ = (id: string | null) =>
    id === null ? "Cả khách sạn" : (groups.find((g) => g.id === id)?.name ?? "—");

  return (
    <Shell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Quyền truy cập</div>
          <h1 className="font-display mt-2 text-3xl">Nhóm học viên &amp; khoá theo tuần</h1>
        </div>
        <div className="flex gap-2">
          <Link
            to="/org-reports"
            className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
          >
            Báo cáo
          </Link>
          <Link
            to="/org-admin"
            className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
          >
            Danh sách nhân sự
          </Link>
        </div>
      </div>

      <section className="mt-8 border border-primary/20 bg-card p-5">
        <h2 className="text-sm uppercase tracking-[0.2em] text-primary">Học theo lộ trình</h2>
        <p className="mt-2 text-sm text-foreground/75">
          Khi bật, học viên phải hoàn thành tuần trước (ít nhất 4 phần đạt chuẩn) mới mở được tuần
          kế tiếp. Khi tắt, mọi tuần trong giai đoạn đã mở đều vào được.
        </p>
        <button
          onClick={() => toggleSequential.mutate(!(data?.sequential ?? false))}
          className={`mt-4 border px-5 py-2 text-xs uppercase tracking-[0.2em] ${
            data?.sequential
              ? "border-primary bg-primary/15 text-primary"
              : "border-primary/40 hover:border-primary"
          }`}
        >
          {data?.sequential ? "Đang bật" : "Đang tắt"}
        </button>
      </section>

      <section className="mt-6 border border-primary/20 bg-card p-5">
        <h2 className="text-sm uppercase tracking-[0.2em] text-primary">Nhóm (batch)</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Ví dụ: Batch FO tháng 9"
            className="border border-primary/30 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={() => addGroup.mutate()}
            className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
          >
            Thêm nhóm
          </button>
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          {groups.map((g) => (
            <li
              key={g.id}
              className="flex items-center justify-between border-b border-primary/10 pb-2"
            >
              <span>{g.name}</span>
              <span className="flex gap-3">
                <button
                  onClick={() => setAssignGroup(g.id)}
                  className="text-xs uppercase tracking-[0.2em] text-primary hover:underline"
                >
                  Gán học viên
                </button>
                <button
                  onClick={() => removeGroup.mutate(g.id)}
                  className="text-xs uppercase tracking-[0.2em] text-destructive hover:underline"
                >
                  Xoá
                </button>
              </span>
            </li>
          ))}
          {groups.length === 0 && <li className="text-foreground/60">Chưa có nhóm nào.</li>}
        </ul>

        {assignGroup && (
          <div className="mt-5 border-t border-primary/10 pt-4">
            <div className="text-xs uppercase tracking-[0.2em] text-foreground/60">
              Gán học viên vào: {groupName_(assignGroup)}
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((m) => {
                const checked = inAssignGroup.has(m.id);
                return (
                  <label key={m.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setMembership.mutate({ userId: m.id, inGroup: !checked })}
                    />
                    <span>
                      {m.full_name ?? "—"}
                      {m.department ? (
                        <span className="text-foreground/50"> · {m.department}</span>
                      ) : null}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </section>

      <section className="mt-6 border border-primary/20 bg-card p-5">
        <h2 className="text-sm uppercase tracking-[0.2em] text-primary">Ma trận mở khoá</h2>
        <p className="mt-2 text-sm text-foreground/75">
          Không có dòng nào nghĩa là mở hết. Thêm một dòng là chỉ những gì được liệt kê mới mở.
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-2">
          <select
            value={ruleGroup}
            onChange={(e) => setRuleGroup(e.target.value)}
            className="border border-primary/30 bg-background px-3 py-2 text-sm"
          >
            <option value="">Cả khách sạn</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          <select
            value={ruleDep}
            onChange={(e) => setRuleDep(e.target.value)}
            className="border border-primary/30 bg-background px-3 py-2 text-sm"
          >
            {SHIPPING_DEPARTMENTS.map((d) => (
              <option key={d.code} value={d.code}>
                {d.code} — {d.name_vi}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            max={40}
            value={ruleFrom}
            onChange={(e) => setRuleFrom(Number(e.target.value))}
            className="w-20 border border-primary/30 bg-background px-3 py-2 text-sm"
          />
          <span className="pb-2 text-sm text-foreground/60">→</span>
          <input
            type="number"
            min={1}
            max={40}
            value={ruleTo}
            onChange={(e) => setRuleTo(Number(e.target.value))}
            className="w-20 border border-primary/30 bg-background px-3 py-2 text-sm"
          />
          <button
            onClick={() => addRule.mutate()}
            className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
          >
            Thêm dòng
          </button>
        </div>

        <table className="mt-5 w-full text-sm">
          <thead className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">
            <tr>
              <th className="py-2 text-left">Áp dụng cho</th>
              <th className="py-2 text-left">Bộ phận</th>
              <th className="py-2 text-left">Tuần</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {rules.map((r) => (
              <tr key={r.id} className="border-t border-primary/10">
                <td className="py-2">{groupName_(r.group_id)}</td>
                <td className="py-2">{r.department_id}</td>
                <td className="py-2">
                  {r.week_from}–{r.week_to}
                </td>
                <td className="py-2 text-right">
                  <button
                    onClick={() => removeRule.mutate(r.id)}
                    className="text-xs uppercase tracking-[0.2em] text-destructive hover:underline"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {rules.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-foreground/60">
                  Chưa có dòng nào — học viên mở được mọi bộ phận và mọi tuần đã đến lượt.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="mt-4 text-xs text-foreground/50">
          Lưu ý: đây là khoá ở giao diện. Nội dung bài học nằm trong ứng dụng tải về máy, nên khoá
          này để điều tiết lộ trình học, không phải để giữ bí mật nội dung.
        </p>
      </section>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>;
}
