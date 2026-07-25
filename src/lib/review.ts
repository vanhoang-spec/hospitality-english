// SM-2-lite spaced repetition over review_items.
//
// Item keys are stable references into week content:
//   "vocab:FO:1:Welcome"              — vocabulary headword (unique within a week)
//   "grammar:FO:1:no-can-do"          — slug of the puzzle's rude line
//   "speaking:FO:1:wheres-my-luggage" — slug of the guest prompt
// Slugs (not array indices) survive content edits — reordering or
// inserting a puzzle in week-content.ts must not silently repoint an
// existing learner's review schedule at different content.
// Seeding happens when a learner first masters the matching suite for a
// week; scheduling state then lives entirely in the review_items table.

import { supabase } from "@/integrations/supabase/client";
import { getWeekContent, type GrammarItem, type SpeakingItem, type VocabItem } from "@/lib/content/week-content";
import { addDays, localDateStr } from "@/lib/date";

export type ReviewItemRow = {
  id: string;
  user_id: string;
  item_key: string;
  item_type: "vocab" | "grammar" | "speaking";
  department_id: string;
  week_number: number;
  due_at: string;
  interval_days: number;
  streak: number;
  last_result: boolean | null;
};

const INTERVAL_GROWTH = 2.2;
const INTERVAL_CAP_DAYS = 60;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Seeds review items for a week's vocab/grammar/speaking content the
 * first time that suite is COMPLETED (not gated on mastery — the learner
 * who scores below the bar needs spaced review most). Idempotent —
 * existing rows (and their scheduling state) are left untouched. */
export async function seedReviewItems(
  userId: string,
  departmentId: string,
  weekNumber: number,
  itemType: "vocab" | "grammar" | "speaking",
): Promise<void> {
  const content = getWeekContent(departmentId, weekNumber);
  if (!content) return;
  const dep = departmentId.toUpperCase();

  let keys: string[] = [];
  if (itemType === "vocab") {
    keys = content.lessons.flatMap((l) => l.vocabulary.map((v) => `vocab:${dep}:${weekNumber}:${v.word}`));
  } else if (itemType === "grammar") {
    keys = content.lessons.flatMap((l) => l.grammar).map((g) => `grammar:${dep}:${weekNumber}:${slugify(g.rude)}`);
  } else {
    keys = content.lessons.flatMap((l) => l.speaking).map((s) => `speaking:${dep}:${weekNumber}:${slugify(s.guestPrompt)}`);
  }

  const rows = keys.map((item_key) => ({
    user_id: userId,
    item_key,
    item_type: itemType,
    department_id: dep,
    week_number: weekNumber,
    due_at: addDays(localDateStr(), 1),
  }));

  await supabase.from("review_items").upsert(rows, { onConflict: "user_id,item_key", ignoreDuplicates: true });
}

export async function fetchDueItems(userId: string, limit = 20): Promise<ReviewItemRow[]> {
  const { data, error } = await supabase
    .from("review_items")
    .select("*")
    .eq("user_id", userId)
    .lte("due_at", localDateStr())
    .order("due_at", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as ReviewItemRow[];
}

export async function fetchDueCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("review_items")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .lte("due_at", localDateStr());
  if (error) throw error;
  return count ?? 0;
}

/** Applies a review outcome: growing interval on success, reset to
 * 1 day on failure. Returns the next due date. */
export async function applyReviewResult(item: ReviewItemRow, correct: boolean): Promise<string> {
  const nextInterval = correct ? Math.min(INTERVAL_CAP_DAYS, Math.ceil(item.interval_days * INTERVAL_GROWTH)) : 1;
  const dueAt = addDays(localDateStr(), nextInterval);
  await supabase
    .from("review_items")
    .update({
      interval_days: nextInterval,
      streak: correct ? item.streak + 1 : 0,
      last_result: correct,
      due_at: dueAt,
    })
    .eq("id", item.id);
  return dueAt;
}

// ---------------------------------------------------------------
// Resolving an item_key back to renderable content for the session.
// ---------------------------------------------------------------

export type ResolvedReviewItem =
  | { kind: "vocab"; row: ReviewItemRow; vocab: VocabItem; weekVocab: VocabItem[] }
  | { kind: "grammar"; row: ReviewItemRow; grammar: GrammarItem }
  | { kind: "speaking"; row: ReviewItemRow; speaking: SpeakingItem; options: { text: string; correct: boolean }[] };

export function resolveReviewItem(row: ReviewItemRow): ResolvedReviewItem | null {
  const content = getWeekContent(row.department_id, row.week_number);
  if (!content) return null;
  const parts = row.item_key.split(":");
  const ref = parts.slice(3).join(":");

  if (row.item_type === "vocab") {
    const weekVocab = content.lessons.flatMap((l) => l.vocabulary);
    const vocab = weekVocab.find((v) => v.word === ref);
    if (!vocab) return null;
    return { kind: "vocab", row, vocab, weekVocab };
  }

  if (row.item_type === "grammar") {
    const flat = content.lessons.flatMap((l) => l.grammar);
    const grammar = flat.find((g) => slugify(g.rude) === ref);
    if (!grammar) return null;
    return { kind: "grammar", row, grammar };
  }

  const flatSpeaking = content.lessons.flatMap((l) => l.speaking);
  const speaking = flatSpeaking.find((s) => slugify(s.guestPrompt) === ref);
  if (!speaking) return null;
  // Prefer the game round authored for this prompt (its wrong options
  // are purpose-built rude distractors); otherwise fall back to other
  // target responses from the same week.
  const matchingRound = content.lessons.flatMap((l) => l.game).find((g) => g.prompt === speaking.guestPrompt);
  let options: { text: string; correct: boolean }[];
  if (matchingRound) {
    options = matchingRound.options.map((o) => ({ text: o.text, correct: o.correct }));
  } else {
    const others = flatSpeaking.filter((s) => s !== speaking).map((s) => s.targetResponse);
    options = [
      { text: speaking.targetResponse, correct: true },
      ...others.slice(0, 2).map((text) => ({ text, correct: false })),
    ];
  }
  return { kind: "speaking", row, speaking, options };
}
