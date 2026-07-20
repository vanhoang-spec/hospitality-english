import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { DEPARTMENTS } from "@/lib/departments";
import { useSession, useProfile } from "@/lib/auth";

export const Route = createFileRoute("/admin-lounge")({
  head: () => ({ meta: [{ title: "Admin Lounge — Embassy Language" }] }),
  component: AdminLoungeGate,
});

type Scenario = { id: string; department_id: string; week_number: number; title_en: string; title_vi: string };
type Lesson = { id: string; scenario_id: string; lesson_order: number; title_en: string; title_vi: string };

function AdminLoungeGate() {
  const { session, loading: sessionLoading } = useSession();
  const userId = session?.user.id;
  const { data: profile, isLoading: profileLoading } = useProfile(userId);

  if (sessionLoading || profileLoading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-sm text-foreground/70">Đang tải…</p>
      </main>
    );
  }
  if (profile?.role !== "super_admin") {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-sm text-foreground/70">Trang này chỉ dành cho quản trị hệ thống.</p>
      </main>
    );
  }
  return <AdminLounge />;
}

function AdminLounge() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filter, setFilter] = useState<string>("ALL");
  const [toast, setToast] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    department_id: "FO",
    week_number: 21,
    title_en: "",
    title_vi: "",
    lessons: [
      { title_en: "", title_vi: "" },
      { title_en: "", title_vi: "" },
      { title_en: "", title_vi: "" },
      { title_en: "", title_vi: "" },
    ],
  });

  async function load() {
    const [{ data: s }, { data: l }] = await Promise.all([
      supabase.from("scenarios").select("*").order("department_id").order("week_number"),
      supabase.from("lessons").select("*").order("lesson_order"),
    ]);
    setScenarios((s as Scenario[]) ?? []);
    setLessons((l as Lesson[]) ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () => (filter === "ALL" ? scenarios : scenarios.filter((s) => s.department_id === filter)),
    [scenarios, filter],
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const { data: scen, error } = await supabase
      .from("scenarios")
      .insert({
        department_id: form.department_id,
        week_number: Number(form.week_number),
        title_en: form.title_en,
        title_vi: form.title_vi,
      })
      .select()
      .single();
    if (error || !scen) {
      setSubmitting(false);
      setToast("⚠ " + (error?.message ?? "Insert failed"));
      setTimeout(() => setToast(null), 3000);
      return;
    }
    const lessonPayload = form.lessons
      .filter((l) => l.title_en.trim())
      .map((l, i) => ({
        scenario_id: (scen as Scenario).id,
        lesson_order: i + 1,
        title_en: l.title_en,
        title_vi: l.title_vi,
      }));
    if (lessonPayload.length) await supabase.from("lessons").insert(lessonPayload);
    await load();
    setSubmitting(false);
    setToast("✦ New Scenario Successfully Standardized!");
    setTimeout(() => setToast(null), 3000);
    setForm({ ...form, title_en: "", title_vi: "", week_number: Number(form.week_number) + 1, lessons: form.lessons.map(() => ({ title_en: "", title_vi: "" })) });
  }

  return (
    <main className="relative min-h-[calc(100vh-72px)]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Hidden Portal · Admin</span>
        </div>
        <h1 className="font-display mt-3 text-5xl">Admin <span className="italic text-primary">Lounge</span></h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <section className="border border-primary/30 bg-card p-5 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl">Operational Entries</h2>
              <div className="flex flex-wrap gap-1">
                {["ALL", ...DEPARTMENTS.map((d) => d.code)].map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`px-3 py-1 text-[10px] uppercase tracking-[0.25em] ${
                      filter === c ? "bg-primary text-primary-foreground" : "border border-primary/30 text-foreground/70 hover:border-primary"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 max-h-[560px] overflow-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-card text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                  <tr>
                    <th className="border-b border-primary/20 py-2 text-left">Dep</th>
                    <th className="border-b border-primary/20 py-2 text-left">Wk</th>
                    <th className="border-b border-primary/20 py-2 text-left">Title</th>
                    <th className="border-b border-primary/20 py-2 text-left">Lessons</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => {
                    const ls = lessons.filter((l) => l.scenario_id === s.id);
                    return (
                      <tr key={s.id} className="border-b border-primary/10">
                        <td className="py-2 text-primary">{s.department_id}</td>
                        <td className="py-2">{s.week_number}</td>
                        <td className="py-2">
                          <div>{s.title_en}</div>
                          <div className="text-xs italic text-foreground/60">{s.title_vi}</div>
                        </td>
                        <td className="py-2 text-xs text-foreground/70">{ls.length}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="border border-primary/40 bg-card p-6 shadow-xl">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Artisan Creator</div>
            <h2 className="font-display mt-2 text-2xl">New Scenario</h2>
            <form onSubmit={submit} className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Department</span>
                  <select
                    value={form.department_id}
                    onChange={(e) => setForm({ ...form, department_id: e.target.value })}
                    className="mt-1 w-full border border-primary/30 bg-background px-3 py-2 text-sm"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d.code} value={d.code}>{d.code} · {d.name_en}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Week</span>
                  <input
                    type="number"
                    value={form.week_number}
                    onChange={(e) => setForm({ ...form, week_number: Number(e.target.value) })}
                    className="mt-1 w-full border border-primary/30 bg-background px-3 py-2 text-sm"
                  />
                </label>
              </div>
              <Input label="Title (EN)" value={form.title_en} onChange={(v) => setForm({ ...form, title_en: v })} required />
              <Input label="Tiêu đề (VI)" value={form.title_vi} onChange={(v) => setForm({ ...form, title_vi: v })} required />

              <div className="space-y-2 border-t border-primary/20 pt-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-primary">Micro-Lessons</div>
                {form.lessons.map((l, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <input
                      placeholder={`Lesson ${i + 1} EN`}
                      value={l.title_en}
                      onChange={(e) => {
                        const next = [...form.lessons];
                        next[i] = { ...next[i], title_en: e.target.value };
                        setForm({ ...form, lessons: next });
                      }}
                      className="border border-primary/30 bg-background px-3 py-2 text-sm"
                    />
                    <input
                      placeholder={`Tiêu đề ${i + 1} VI`}
                      value={l.title_vi}
                      onChange={(e) => {
                        const next = [...form.lessons];
                        next[i] = { ...next[i], title_vi: e.target.value };
                        setForm({ ...form, lessons: next });
                      }}
                      className="border border-primary/30 bg-background px-3 py-2 text-sm"
                    />
                  </div>
                ))}
              </div>

              <button
                disabled={submitting}
                className="relative w-full overflow-hidden bg-primary py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-xl disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <span className="relative z-10">Standardising…</span>
                    <span className="absolute inset-0 animate-[shimmer2_1.4s_linear_infinite]"
                      style={{ background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)" }} />
                    <style>{`@keyframes shimmer2 { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }`}</style>
                  </>
                ) : (
                  "Standardise Scenario"
                )}
              </button>
            </form>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border border-primary bg-card px-6 py-3 font-display text-base text-primary shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Input({ label, value, onChange, required }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">{label}</span>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-primary/30 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
    </label>
  );
}
