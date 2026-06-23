import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SpeakingSuite } from "@/components/suites/SpeakingSuite";
import { ArcadeSuite } from "@/components/suites/ArcadeSuite";
import { BoardGameSuite } from "@/components/suites/BoardGameSuite";
import { StaticSuite } from "@/components/suites/StaticSuite";

const TITLES: Record<string, string> = {
  vocab: "Premium Vocabulary",
  grammar: "Courteous Grammar",
  speaking: "Elite AI Speaking",
  reading: "Executive Reading",
  arcade: "VIP Rush Arcade",
  board: "Executive Challenge Board",
};

export const Route = createFileRoute("/suite/$suite")({
  head: ({ params }) => ({ meta: [{ title: `${TITLES[params.suite] ?? "Suite"} — Skill Suite` }] }),
  component: SuitePage,
});

function SuitePage() {
  const { suite } = Route.useParams();
  if (!TITLES[suite]) throw notFound();

  return (
    <main className="relative min-h-[calc(100vh-72px)]">
      <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">
        <Link to="/" className="text-xs uppercase tracking-[0.3em] text-primary hover:opacity-80">
          ← Lounge
        </Link>
        <h1 className="font-display mt-4 text-4xl md:text-5xl">{TITLES[suite]}</h1>

        <div className="mt-8">
          {suite === "speaking" && <SpeakingSuite />}
          {suite === "arcade" && <ArcadeSuite />}
          {suite === "board" && <BoardGameSuite />}
          {suite === "vocab" && <StaticSuite kind="vocab" />}
          {suite === "grammar" && <StaticSuite kind="grammar" />}
          {suite === "reading" && <StaticSuite kind="reading" />}
        </div>
      </div>
    </main>
  );
}
