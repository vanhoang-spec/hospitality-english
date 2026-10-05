// Shared kit for the hand-authored Phase 4 weeks (one folder per department,
// one file per week: p4/<dep>/w31.ts … w40.ts, assembled by p4/<dep>/index.ts).
//
// Phase 4 used to be two things: a spine of frames that read each
// department's bank by slot index (still the whole of Spa weeks 31-36 and
// 38-40 in October 2026), and hand-written week payloads from several batches
// that each kept their own rules. The first blind round of the reopened
// phase (7ed3254, 0 of 10 cells at 7.5) found the frames printing "Nobody has
// been hurt by the severe allergic reaction" and the batches contradicting
// each other from week to week. So every department's ten weeks are now
// written for it, the way Phase 3's are (see p3/kit.ts), and this file only
// keeps the cards honest:
//
//  · A card is looked up by its word: first among the words this department
//    has already glossed in an earlier Phase 4 week (so week 40 can re-present
//    week 31's card unchanged), then the department's Phase 4 and Phase 3
//    banks. An unknown word THROWS — a typo fails the build instead of
//    shipping a card with no pronunciation.
//  · A new word that is in no bank brings its own gloss, explicitly, and is
//    remembered for the department's later weeks.
import type { LessonContent, SpeakingItem, VocabItem } from "../week-content";
import { v } from "../phase0";
import { P4_BANKS } from "../phase4-lexicon";
import { P3_BANKS } from "../phase3-lexicon";

type Gloss = [phonetic: string, definition: string, icon: string];

/** Words each department has glossed in its Phase 4 weeks so far. The week
 *  files are imported in order (index.ts), so week 40 finds week 31's. */
const GLOSSED = new Map<string, Map<string, Gloss>>();

function banked(dep: string): Map<string, Gloss> {
  const out = new Map<string, Gloss>();
  for (const bank of [P3_BANKS[dep], P4_BANKS[dep]])
    for (const group of Object.values(bank ?? {}))
      for (const w of group as {
        word: string;
        phonetic: string;
        definition: string;
        icon: string;
      }[])
        out.set(w.word, [w.phonetic, w.definition, w.icon]);
  return out;
}

/** A card builder bound to one department. */
export function cardsFor(dep: string) {
  const bank = banked(dep);
  const mine = GLOSSED.get(dep) ?? new Map<string, Gloss>();
  GLOSSED.set(dep, mine);
  return (word: string, context: string, gloss?: Gloss): VocabItem => {
    const g = gloss ?? mine.get(word) ?? bank.get(word);
    if (!g)
      throw new Error(
        `p4 kit: "${word}" has no gloss — give one, or use the exact word of an earlier ${dep} card`,
      );
    if (gloss) mine.set(word, gloss);
    return v(word, g[0], g[1], context, g[2]);
  };
}

type Parts = Omit<LessonContent, "lessonId" | "lessonOrder" | "titleEn" | "titleVi">;

/** A lesson builder bound to one department. */
export function lessonsFor(dep: string) {
  return (week: number, order: number, titleEn: string, titleVi: string, parts: Parts) =>
    ({
      lessonId: `${dep}_${week}_${order}`,
      lessonOrder: order,
      titleEn,
      titleVi,
      ...parts,
    }) satisfies LessonContent;
}

/** Marks a turn the checkpoint must find answered right — see
 *  `SpeakingItem.risk`. */
export const risk = (s: SpeakingItem): SpeakingItem => ({ ...s, risk: true });

/** One authored week: its four lessons, its can-do line ("Nói được: …"),
 *  and — only where the shared Phase 4 title does not fit what the
 *  department teaches that week — its own title. */
export type AuthoredWeek = {
  lessons: LessonContent[];
  canDo: string;
  title?: { en: string; vi: string };
};

/** The ten weeks of one department, keeping only the weeks already written:
 *  an unwritten week (no lessons yet) falls back to whatever served it before. */
export function assemble(weeks: Record<number, AuthoredWeek>): {
  lessons: Record<number, LessonContent[]>;
  canDo: Record<number, string>;
  titles: Record<number, { en: string; vi: string }>;
} {
  const lessons: Record<number, LessonContent[]> = {};
  const canDo: Record<number, string> = {};
  const titles: Record<number, { en: string; vi: string }> = {};
  for (const [w, wk] of Object.entries(weeks)) {
    if (wk.lessons.length === 0) continue;
    lessons[Number(w)] = wk.lessons;
    if (wk.canDo) canDo[Number(w)] = wk.canDo;
    if (wk.title) titles[Number(w)] = wk.title;
  }
  return { lessons, canDo, titles };
}
