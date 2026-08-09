import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { SpeakingSuite } from "@/components/suites/SpeakingSuite";
import { ArcadeSuite } from "@/components/suites/ArcadeSuite";
import { VocabSuite } from "@/components/suites/VocabSuite";
import { GrammarSuite } from "@/components/suites/GrammarSuite";
import { ReadingSuite } from "@/components/suites/ReadingSuite";
import { ListeningSuite } from "@/components/suites/ListeningSuite";
import { WeekTestSuite } from "@/components/suites/WeekTestSuite";
import { WritingSuite } from "@/components/suites/WritingSuite";
import { MediationSuite } from "@/components/suites/MediationSuite";
import { getDepartment } from "@/lib/departments";
import { useSession } from "@/lib/auth";
import { rememberPlace } from "@/lib/progress";
import { useWeekAccess } from "@/lib/week-access";
import { WeekLocked } from "@/components/WeekLocked";

const TITLES: Record<string, { en: string; tag: string }> = {
  vocab: { en: "Premium Vocabulary", tag: "Lexicon" },
  grammar: { en: "Courteous Grammar", tag: "Etiquette" },
  speaking: { en: "Elite AI Speaking", tag: "Voice" },
  listening: { en: "Golden Ear Listening", tag: "Attention" },
  reading: { en: "Executive Reading", tag: "Comprehension" },
  arcade: { en: "VIP Rush Arcade", tag: "Reflex" },
  weektest: { en: "Phase Checkpoint Test", tag: "Assessment" },
  writing: { en: "Guest Review Reply", tag: "Writing" },
  mediation: { en: "Bridge the Language Gap", tag: "Mediation" },
};

export const Route = createFileRoute("/learn/$dep/$week/$suite")({
  head: ({ params }) => ({
    meta: [{ title: `${TITLES[params.suite]?.en ?? "Suite"} · Week ${params.week}` }],
  }),
  component: SuitePage,
});

function SuitePage() {
  const { dep, week, suite } = Route.useParams();
  // Called before the notFound() throw so the hook order never depends on
  // whether the route params resolve.
  const access = useWeekAccess(dep);
  const { session, loading: sessionLoading } = useSession();
  const department = getDepartment(dep);
  const meta = TITLES[suite];

  // The "Tiếp tục học" card points here (P2-4). Recorded on opening a
  // suite rather than on finishing one, so an interrupted session still
  // leaves a trail back — that is the session the learner most needs to
  // find again. Locked weeks are excluded: sending someone back to a wall
  // is worse than showing no card.
  const unlocked = !access.ready || access.isUnlocked(week);
  useEffect(() => {
    if (sessionLoading || !department || !unlocked) return;
    rememberPlace(session?.user.id, department.code, week);
  }, [sessionLoading, session?.user.id, department, week, unlocked]);

  if (!department || !meta) throw notFound();

  // A suite URL is the other way into a week's content, so the gate has to
  // hold here too — not just on the timeline and the week hub.
  if (access.ready && !access.isUnlocked(week)) {
    return (
      <main className="relative min-h-[calc(100vh-72px)] px-6 py-16 md:px-10">
        <WeekLocked dep={department.code} week={week} next={access.next} />
      </main>
    );
  }

  return (
    <main className="relative min-h-[calc(100vh-72px)]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl px-6 py-10 md:px-10"
      >
        <Link
          to="/department/$dep/week/$week"
          params={{ dep: department.code, week }}
          className="text-xs uppercase tracking-[0.3em] text-primary hover:opacity-80"
        >
          ← Week {week} · {department.name_en}
        </Link>
        <div className="mt-4 flex items-center gap-3">
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary">{meta.tag}</span>
        </div>
        <h1 className="font-display mt-3 text-4xl md:text-5xl">{meta.en}</h1>
        <div className="mt-1 text-xs italic text-foreground/55">
          {department.name_en} · {department.name_vi} · Week {week}
        </div>

        <div className="mt-10">
          {suite === "vocab" && <VocabSuite dep={department.code} week={week} />}
          {suite === "grammar" && <GrammarSuite dep={department.code} week={week} />}
          {suite === "speaking" && <SpeakingSuite dep={department.code} week={week} />}
          {suite === "listening" && <ListeningSuite dep={department.code} week={week} />}
          {suite === "reading" && <ReadingSuite dep={department.code} week={week} />}
          {suite === "arcade" && <ArcadeSuite dep={department.code} week={week} />}
          {suite === "weektest" && <WeekTestSuite dep={department.code} week={week} />}
          {suite === "writing" && <WritingSuite dep={department.code} week={week} />}
          {suite === "mediation" && <MediationSuite dep={department.code} week={week} />}
        </div>
      </motion.div>
    </main>
  );
}
