import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SHIPPING_DEPARTMENTS } from "@/lib/departments";
import { useSession } from "@/lib/auth";
import { fetchDueCount } from "@/lib/review";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Departments Lounge — Hospitality English Academy" },
      {
        name: "description",
        content: "Choose your training department in the Embassy Hospitality Academy lounge.",
      },
    ],
  }),
  component: Lounge,
});

function ReviewBanner() {
  const { session } = useSession();
  const userId = session?.user.id;
  const dueQuery = useQuery({
    queryKey: ["review-due-count", userId],
    queryFn: () => fetchDueCount(userId as string),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
  const due = dueQuery.data ?? 0;
  if (due === 0) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
      <Link
        to="/review"
        className="flex flex-wrap items-center justify-between gap-3 border border-primary bg-primary/10 px-5 py-4 shadow-xl transition-colors hover:bg-primary/15"
      >
        <div>
          <span className="font-display text-lg text-foreground">
            🔁 Ôn tập hôm nay — {due} mục đến hạn
          </span>
          <p className="mt-0.5 text-xs text-foreground/65">
            Vài phút ôn đúng thời điểm giúp từ vựng ở lại trí nhớ lâu dài. Hoàn thành để giữ chuỗi
            ngày học 🔥
          </p>
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-primary">Bắt đầu →</span>
      </Link>
    </motion.div>
  );
}

// The headline counts the cards below it. Spelling the number into the copy
// meant the day a department ships, the page would say "Six" over seven cards
// — and nobody re-reads marketing copy while adding a department.
const SPELLED_EN = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];
const SPELLED_VI = ["", "Một", "Hai", "Ba", "Bốn", "Năm", "Sáu", "Bảy", "Tám"];
const COUNT_EN = SPELLED_EN[SHIPPING_DEPARTMENTS.length] ?? SHIPPING_DEPARTMENTS.length;
const COUNT_VI = SPELLED_VI[SHIPPING_DEPARTMENTS.length] ?? SHIPPING_DEPARTMENTS.length;

function Lounge() {
  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at top, color-mix(in oklab, var(--gold) 14%, transparent), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              Departments Lounge
            </span>
          </div>
          <h1 className="font-display mt-4 text-5xl leading-tight md:text-6xl">
            Choose your <span className="italic text-primary">atelier</span>.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-foreground/70">
            {COUNT_EN} departments. Forty weeks each. A quiet path to five-star fluency. Select a
            card to enter the workplace shift timeline.
          </p>
          <p className="mt-2 max-w-2xl text-sm italic text-foreground/50">
            {COUNT_VI} bộ phận. Bốn mươi tuần học chuyên sâu. Hành trình tinh tế chạm ngưỡng lưu
            loát chuẩn 5 sao. Hãy chọn một thẻ để bước vào ca làm việc thực tế.
          </p>
        </motion.div>

        <ReviewBanner />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SHIPPING_DEPARTMENTS.map((d, i) => (
            <FlipCard key={d.code} index={i} dep={d} />
          ))}
        </div>
      </div>
    </main>
  );
}

function FlipCard({ dep, index }: { dep: (typeof SHIPPING_DEPARTMENTS)[number]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.06 }}
      style={{ perspective: 1200 }}
      className="group h-64"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <Link
        to="/department/$dep"
        params={{ dep: dep.code }}
        className="block h-full w-full"
        aria-label={`Open ${dep.name_en} shift timeline`}
        onClick={() => setFlipped(true)}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col justify-between border border-primary/30 bg-card p-7 shadow-xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-start justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">{dep.code}</span>
              <span className="font-display text-3xl text-primary/70">{dep.motif}</span>
            </div>
            <div>
              <h3 className="font-display text-3xl text-foreground">{dep.name_en}</h3>
              <p className="mt-1 text-sm italic text-foreground/60">{dep.name_vi}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-foreground/50">
                {dep.tagline}
              </p>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 border border-primary bg-card p-7 text-center shadow-xl"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Enter</span>
            <h3 className="font-display text-2xl text-foreground">{dep.name_en}</h3>
            <span className="border border-primary/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary">
              40-week shift timeline →
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
