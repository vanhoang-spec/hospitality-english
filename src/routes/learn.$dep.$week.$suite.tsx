import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SpeakingSuite } from "@/components/suites/SpeakingSuite";
import { ArcadeSuite } from "@/components/suites/ArcadeSuite";
import { VocabSuite } from "@/components/suites/VocabSuite";
import { GrammarSuite } from "@/components/suites/GrammarSuite";
import { ReadingSuite } from "@/components/suites/ReadingSuite";
import { ListeningSuite } from "@/components/suites/ListeningSuite";
import { WeekTestSuite } from "@/components/suites/WeekTestSuite";
import { getDepartment } from "@/lib/departments";

const TITLES: Record<string, { en: string; tag: string }> = {
  vocab: { en: "Premium Vocabulary", tag: "Lexicon" },
  grammar: { en: "Courteous Grammar", tag: "Etiquette" },
  speaking: { en: "Elite AI Speaking", tag: "Voice" },
  listening: { en: "Golden Ear Listening", tag: "Attention" },
  reading: { en: "Executive Reading", tag: "Comprehension" },
  arcade: { en: "VIP Rush Arcade", tag: "Reflex" },
  weektest: { en: "Phase Checkpoint Test", tag: "Assessment" },
};

export const Route = createFileRoute("/learn/$dep/$week/$suite")({
  head: ({ params }) => ({ meta: [{ title: `${TITLES[params.suite]?.en ?? "Suite"} · Week ${params.week}` }] }),
  component: SuitePage,
});

function SuitePage() {
  const { dep, week, suite } = Route.useParams();
  const department = getDepartment(dep);
  const meta = TITLES[suite];
  if (!department || !meta) throw notFound();

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
        </div>
      </motion.div>
    </main>
  );
}
