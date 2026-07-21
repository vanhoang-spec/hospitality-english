import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getDepartment } from "@/lib/departments";
import { getWeekContent } from "@/lib/content/week-content";
import { speakEN } from "@/lib/speech";
import { SuiteComingSoon } from "@/components/suites/SuiteComingSoon";

export const Route = createFileRoute("/handbook/$dep/$week")({
  head: ({ params }) => ({ meta: [{ title: `Sổ tay tuần ${params.week} — Embassy Hospitality` }] }),
  component: HandbookPage,
});

/** Read-aloud button. Hidden when printing — paper cannot speak. */
function Speak({ text, rate = 0.75 }: { text: string; rate?: number }) {
  return (
    <button
      onClick={() => speakEN(text, rate)}
      className="print-hide shrink-0 border border-primary/40 px-2 py-0.5 text-[10px] text-primary transition-colors hover:border-primary hover:bg-primary/10"
      aria-label={`Nghe: ${text}`}
    >
      🔊
    </button>
  );
}

function HandbookPage() {
  const { dep, week } = Route.useParams();
  const department = getDepartment(dep);
  if (!department) throw notFound();

  const content = getWeekContent(dep, week);

  // Every target line the learner should be able to produce this week —
  // the grammar answers plus the spoken responses. These are the patterns
  // to drill at home, so they lead the page.
  const patterns = content
    ? Array.from(
        new Set([
          ...content.lessons.flatMap((l) => l.speaking.map((s) => s.targetResponse)),
          ...content.lessons.flatMap((l) => l.grammar.map((g) => g.polite)),
        ]),
      )
    : [];
  const vocabulary = content?.lessons.flatMap((l) => l.vocabulary) ?? [];

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 md:py-14">
      {/* Print rules: drop the app chrome so the sheet is pure study material. */}
      <style>{`
        @media print {
          .print-hide { display: none !important; }
          header, nav { display: none !important; }
          main { max-width: none !important; padding: 0 !important; }
          body { background: #fff !important; color: #000 !important; }
          .hb-card {
            border: 1px solid #999 !important;
            background: #fff !important;
            box-shadow: none !important;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .hb-section { break-inside: avoid; page-break-inside: avoid; }
          .hb-ink { color: #000 !important; }
          .hb-muted { color: #444 !important; }
          a { text-decoration: none !important; color: #000 !important; }
        }
      `}</style>

      <div className="print-hide">
        <Link
          to="/department/$dep"
          params={{ dep: department.code }}
          className="text-xs uppercase tracking-[0.3em] text-primary hover:opacity-80"
        >
          ← {department.name_en} Timeline
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Sổ tay tự luyện</span>
        </div>
        <h1 className="font-display hb-ink mt-3 text-4xl text-foreground">
          Tuần {week} · <span className="italic text-primary">{department.name_vi ?? department.name_en}</span>
        </h1>
        {content && <p className="hb-muted mt-2 text-sm text-foreground/70">{content.weekTitleVi}</p>}
      </motion.div>

      {!content ? (
        <SuiteComingSoon />
      ) : (
        <>
          <div className="print-hide mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => window.print()}
              className="bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
            >
              🖨️ In sổ tay mang về
            </button>
            <span className="text-xs text-foreground/60">
              Bấm 🔊 để nghe mẫu — luyện lại mỗi câu 5 lần là nhớ được.
            </span>
          </div>

          {/* PATTERNS — the substitution frames, the heart of home practice. */}
          <section className="hb-section mt-8">
            <h2 className="font-display hb-ink text-2xl text-foreground">1 · Mẫu câu cần thuộc</h2>
            <p className="hb-muted mt-1 text-sm text-foreground/70">
              Đọc to từng câu, rồi thay từ vựng ở mục 2 vào cùng khung câu — đó là cách luyện nhanh nhất.
            </p>
            <ol className="mt-4 space-y-2">
              {patterns.map((p) => (
                <li key={p} className="hb-card flex items-start justify-between gap-3 border border-primary/25 bg-card p-3">
                  <span className="hb-ink font-display text-base text-foreground">{p}</span>
                  <Speak text={p} />
                </li>
              ))}
            </ol>
          </section>

          {/* VOCABULARY */}
          <section className="hb-section mt-10">
            <h2 className="font-display hb-ink text-2xl text-foreground">
              2 · Từ vựng tuần này ({vocabulary.length} từ)
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-primary/30 text-left text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                    <th className="py-2 pr-3">Từ</th>
                    <th className="py-2 pr-3">Phiên âm</th>
                    <th className="py-2 pr-3">Nghĩa</th>
                    <th className="py-2 pr-3">Ví dụ</th>
                    <th className="print-hide py-2" />
                  </tr>
                </thead>
                <tbody>
                  {vocabulary.map((item) => (
                    <tr key={item.word} className="border-b border-primary/10 align-top">
                      <td className="hb-ink py-2 pr-3 font-display text-foreground">
                        {item.icon} {item.word}
                      </td>
                      <td className="hb-muted py-2 pr-3 text-xs text-foreground/60">{item.phonetic}</td>
                      <td className="hb-ink py-2 pr-3">{item.definition}</td>
                      <td className="hb-muted py-2 pr-3 text-xs italic text-foreground/70">{item.context}</td>
                      <td className="print-hide py-2">
                        <Speak text={item.word} rate={0.7} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SPEAKING PAIRS */}
          <section className="hb-section mt-10">
            <h2 className="font-display hb-ink text-2xl text-foreground">3 · Luyện nói theo cặp</h2>
            <p className="hb-muted mt-1 text-sm text-foreground/70">
              Che phần trả lời, nghe câu của khách rồi tự nói. Sau đó mở ra so lại.
            </p>
            <div className="mt-4 space-y-3">
              {content.lessons.flatMap((l) =>
                l.speaking.map((s) => (
                  <div key={s.guestPrompt} className="hb-card border border-primary/25 bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-primary">Khách nói</div>
                        <p className="hb-ink mt-1 text-sm text-foreground">"{s.guestPrompt}"</p>
                      </div>
                      <Speak text={s.guestPrompt} rate={0.8} />
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-3 border-t border-primary/15 pt-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-primary">Bạn trả lời</div>
                        <p className="hb-ink mt-1 font-display text-base text-foreground">{s.targetResponse}</p>
                      </div>
                      <Speak text={s.targetResponse} />
                    </div>
                    <p className="hb-muted mt-3 border-l-2 border-primary/50 pl-3 text-xs italic text-foreground/70">
                      💡 {s.helpTip}
                    </p>
                  </div>
                )),
              )}
            </div>
          </section>

          {/* GRAMMAR CONTRASTS */}
          <section className="hb-section mt-10">
            <h2 className="font-display hb-ink text-2xl text-foreground">4 · Lỗi thường gặp cần tránh</h2>
            <div className="mt-4 space-y-2">
              {content.lessons.flatMap((l) =>
                l.grammar.map((gr) => (
                  <div key={gr.polite} className="hb-card border border-primary/25 bg-card p-3">
                    <p className="text-sm text-destructive line-through decoration-destructive/60">{gr.rude}</p>
                    <p className="hb-ink font-display mt-1 text-base text-foreground">{gr.polite}</p>
                    <p className="hb-muted mt-1 text-xs italic text-foreground/70">{gr.rule}</p>
                  </div>
                )),
              )}
            </div>
          </section>

          <p className="hb-muted mt-10 border-t border-primary/20 pt-4 text-center text-xs text-foreground/50">
            Embassy Hospitality · {department.name_en} · Tuần {week} — {content.weekTitleEn}
          </p>
        </>
      )}
    </main>
  );
}
