import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/appraisal")({
  head: () => ({
    meta: [
      { title: "My Career Appraisal — Maison Lumière" },
      {
        name: "description",
        content:
          "Your personal performance dashboard — fluency, courtesy, reflex, and crisis-handling mastery.",
      },
      { property: "og:title", content: "My Career Appraisal — Maison Lumière" },
      {
        property: "og:description",
        content:
          "A premium appraisal of your hospitality competencies with personalised HR recommendations.",
      },
    ],
  }),
  component: AppraisalPage,
});

type Metrics = {
  fluency_score: number;
  courtesy_score: number;
  reflex_speed: number;
  crisis_handling_score: number;
};

type Profile = {
  full_name: string | null;
  job_rank: string;
  service_stars: number;
  daily_streak: number;
};

const DEMO_METRICS: Metrics = {
  fluency_score: 78,
  courtesy_score: 86,
  reflex_speed: 62,
  crisis_handling_score: 54,
};

const DEMO_PROFILE: Profile = {
  full_name: "Esteemed Apprentice",
  job_rank: "Trainee",
  service_stars: 142,
  daily_streak: 7,
};

function AppraisalPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    async function load() {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;
      if (!user) {
        setMetrics(DEMO_METRICS);
        setProfile(DEMO_PROFILE);
        setLoaded(true);
        return;
      }

      const [{ data: prof }, { data: m }] = await Promise.all([
        supabase
          .from("profiles")
          .select("full_name, job_rank, service_stars, daily_streak")
          .eq("id", user.id)
          .maybeSingle(),
        supabase
          .from("performance_metrics")
          .select(
            "fluency_score, courtesy_score, reflex_speed, crisis_handling_score",
          )
          .eq("profile_id", user.id)
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);

      setProfile(prof ?? DEMO_PROFILE);
      setMetrics(m ?? DEMO_METRICS);
      setLoaded(true);

      channel = supabase
        .channel("appraisal-metrics")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "performance_metrics",
            filter: `profile_id=eq.${user.id}`,
          },
          (payload) => {
            const next = payload.new as Partial<Metrics> | null;
            if (next && "fluency_score" in next) {
              setMetrics((prev) => ({ ...(prev ?? DEMO_METRICS), ...next } as Metrics));
            }
          },
        )
        .subscribe();
    }

    load();
    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  const m = metrics ?? DEMO_METRICS;
  const p = profile ?? DEMO_PROFILE;

  const meters = useMemo(
    () => [
      { key: "fluency", label: "Fluency Index", value: m.fluency_score, suffix: "%" },
      { key: "courtesy", label: "Courteousness Score", value: m.courtesy_score, suffix: "%" },
      { key: "reflex", label: "Rush-hour Reflex", value: Math.round(m.reflex_speed), suffix: "%" },
      { key: "crisis", label: "Crisis Mastery", value: m.crisis_handling_score, suffix: "%" },
    ],
    [m],
  );

  const recommendations = buildRecommendations(m);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at top right, color-mix(in oklab, var(--gold) 16%, transparent), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <Link
              to="/"
              className="text-xs uppercase tracking-[0.3em] text-primary hover:opacity-80"
            >
              ← Maison Lumière
            </Link>
            <h1 className="font-display mt-4 text-5xl leading-tight md:text-6xl">
              My Career <span className="italic text-primary">Appraisal</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-foreground/70">
              A quarterly reflection of your craft — measured with the precision of a maître d'hôtel.
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-[0.3em] text-foreground/60">Apprentice</div>
            <div className="font-display mt-1 text-2xl">{p.full_name || "Guest"}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] text-primary">{p.job_rank}</div>
          </div>
        </motion.header>

        {/* Performance card */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-12 overflow-hidden border border-primary/30 bg-card shadow-xl"
        >
          <div className="grid gap-px bg-primary/20 md:grid-cols-[1.1fr_1fr]">
            <div className="bg-card p-8 md:p-10">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-primary">
                  Performance Summary
                </span>
                <span className="text-xs text-foreground/60">Updated live</span>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {meters.map((meter, i) => (
                  <RadialMeter key={meter.key} {...meter} delay={0.2 + i * 0.08} />
                ))}
              </div>
            </div>

            <div className="bg-card p-8 md:p-10">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-primary">
                  Competency Radar
                </span>
                <span className="text-xs text-foreground/60">Quarterly</span>
              </div>
              <RadarChart
                points={[
                  m.fluency_score,
                  m.courtesy_score,
                  Math.round(m.reflex_speed),
                  m.crisis_handling_score,
                ]}
                labels={["Fluency", "Courtesy", "Reflex", "Crisis"]}
              />
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-foreground/70">
                <Stat label="Service Stars" value={p.service_stars.toString()} />
                <Stat label="Daily Streak" value={`${p.daily_streak} days`} />
              </div>
            </div>
          </div>
        </motion.section>

        {/* HR Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-12"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary">
              HR Recommendation
            </h2>
          </div>
          <h3 className="font-display mt-3 text-3xl md:text-4xl">
            A curated path forward.
          </h3>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {recommendations.map((rec, i) => (
              <motion.article
                key={rec.title}
                initial={{ opacity: 0, x: -20 }}
                animate={loaded ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.45 + i * 0.08 }}
                className={
                  rec.tone === "gold"
                    ? "border-l-2 border-primary bg-card p-6 shadow-xl"
                    : "border-l-2 border-primary/30 bg-card p-6 shadow-xl"
                }
              >
                <div
                  className={
                    rec.tone === "gold"
                      ? "text-xs uppercase tracking-[0.3em] text-primary"
                      : "text-xs uppercase tracking-[0.3em] text-foreground/60"
                  }
                >
                  {rec.tag}
                </div>
                <h4 className="font-display mt-3 text-xl text-foreground">{rec.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">{rec.body}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-primary/30 px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">{label}</div>
      <div className="font-display mt-1 text-lg text-primary">{value}</div>
    </div>
  );
}

function RadialMeter({
  label,
  value,
  suffix,
  delay,
}: {
  label: string;
  value: number;
  suffix: string;
  delay: number;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = 36;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (clamped / 100) * circ;

  return (
    <div className="flex items-center gap-4">
      <svg width="92" height="92" viewBox="0 0 92 92" className="-rotate-90">
        <circle
          cx="46"
          cy="46"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="3"
          className="text-primary"
        />
        <motion.circle
          cx="46"
          cy="46"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
          {label}
        </div>
        <div className="font-display mt-1 text-2xl text-foreground">
          {clamped}
          <span className="ml-0.5 text-base text-primary">{suffix}</span>
        </div>
      </div>
    </div>
  );
}

function RadarChart({ points, labels }: { points: number[]; labels: string[] }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 96;
  const angles = points.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / points.length);

  const toXY = (value: number, idx: number) => {
    const r = (Math.max(0, Math.min(100, value)) / 100) * maxR;
    return [cx + r * Math.cos(angles[idx]), cy + r * Math.sin(angles[idx])] as const;
  };

  const polyPoints = points.map((v, i) => toXY(v, i).join(",")).join(" ");

  return (
    <div className="mt-6 flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {[0.25, 0.5, 0.75, 1].map((ratio) => (
          <polygon
            key={ratio}
            points={angles
              .map((a) => {
                const r = ratio * maxR;
                return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
              })
              .join(" ")}
            fill="none"
            stroke="currentColor"
            strokeOpacity={ratio === 1 ? "0.35" : "0.1"}
            className="text-primary"
          />
        ))}
        {angles.map((a, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + maxR * Math.cos(a)}
            y2={cy + maxR * Math.sin(a)}
            stroke="currentColor"
            strokeOpacity="0.1"
            className="text-primary"
          />
        ))}
        <motion.polygon
          points={polyPoints}
          fill="currentColor"
          fillOpacity="0.18"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary"
          initial={{ opacity: 0, scale: 0.85, transformOrigin: `${cx}px ${cy}px` }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        {points.map((_, i) => {
          const [x, y] = toXY(points[i], i);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="currentColor"
              className="text-primary"
            />
          );
        })}
        {labels.map((label, i) => {
          const r = maxR + 18;
          const x = cx + r * Math.cos(angles[i]);
          const y = cy + r * Math.sin(angles[i]);
          return (
            <text
              key={label}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-current text-[10px] uppercase tracking-[0.2em] text-foreground/70"
              style={{ letterSpacing: "0.18em" }}
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

type Recommendation = {
  tag: string;
  title: string;
  body: string;
  tone: "gold" | "muted";
};

function buildRecommendations(m: Metrics): Recommendation[] {
  const recs: Recommendation[] = [];

  if (m.reflex_speed < 70) {
    recs.push({
      tag: "Priority Training",
      tone: "gold",
      title: "Enrol in the VIP Rush Arcade",
      body:
        "Your rush-hour reflexes suggest peak-hour shifts may overwhelm. A fortnight in the VIP Rush Arcade will sharpen your tempo and composure under pressure.",
    });
  }

  if (m.crisis_handling_score < 65) {
    recs.push({
      tag: "Mentorship",
      tone: "gold",
      title: "Shadow the Duty Manager",
      body:
        "Guest complaints currently land harder than they should. A week of crisis mentorship with the duty manager will transform escalations into recoveries.",
    });
  }

  if (m.fluency_score < 75) {
    recs.push({
      tag: "Language Atelier",
      tone: "muted",
      title: "Refine Pronunciation in the Salon",
      body:
        "Schedule three sessions in the Language Atelier to elevate diction — the difference between courteous and unforgettable.",
    });
  }

  if (m.courtesy_score < 80) {
    recs.push({
      tag: "Etiquette Studio",
      tone: "muted",
      title: "Review Polite Grammar Modules",
      body:
        "Revisit the Etiquette Studio's polite-form lessons. Small grammatical graces compound into a guest's lasting impression.",
    });
  }

  if (recs.length === 0) {
    recs.push({
      tag: "Distinction",
      tone: "gold",
      title: "Candidate for Promotion Review",
      body:
        "All competencies sit well above the maison's benchmark. Your dossier has been queued for the next promotion review with the Director of Guest Services.",
    });
  }

  return recs;
}
