/**
 * A grammar note for a speaking target, derived from the sentence itself.
 *
 * `SpeakingSuite` hides the target on the first attempt, so the helpTip is
 * the only scaffold a learner has at the moment they must produce the
 * sentence. Across Phase 2, 24% of tips named a grammatical form; the other
 * 76% gave professional advice — why to say it, never how to build it. Three
 * independent reviews reported the same thing, one of them measuring a week
 * with 0 of 30 tips saying anything about English.
 *
 * The note has to be computed here rather than written beside each tip
 * because the spine authors one template that renders six different
 * sentences: `Please ${lo(p10)} on this line.` is "Please sign your name…"
 * for Front Office and "Please print your name…" for F&B, and a note quoting
 * the wrong verb is worse than no note at all. Every branch below names a
 * form the finished sentence visibly uses and quotes only words that
 * sentence contains, which also keeps it inside the helpTip-quote gate.
 *
 * A wrong grammar note is worse than none, so anything the branches cannot
 * classify confidently returns null and the tip is left alone.
 */

/** Tips that already name a form are left untouched.
 *
 *  The first version of this list carried the bare token "thì " — one of the
 *  commonest words in Vietnamese, meaning "then". Every tip containing it was
 *  read as already naming a tense and skipped, so the sentences that most
 *  needed a note were the ones that could never get one. */
const NAMES_A_FORM =
  /động từ|mạo từ|ở thì |chia thì |thì hiện tại|thì quá khứ|thì tương lai|chủ ngữ|trạng từ|giới từ|số nhiều|quá khứ|hiện tại|bị động|so sánh|đuôi -s|tính từ|danh từ|trợ động từ|-ing|to \+|câu hỏi|thứ tự từ|đại từ/i;

const PAST =
  /\b(was|were|had|went|took|came|made|said|got|arrived|confirmed|cleaned|served|noted|listed|completed|arranged|finished|started|sent|checked|booked|signed|added|fixed|prepared|reported)\b/i;

/** Words that can follow a modal without being the verb it governs — an
 *  elliptical "My manager can, sir." must not be read as "can sir". */
const NOT_A_VERB = new Set(
  (
    "sir madam please and but or not also too now then today i you we he she they it the a an my your our " +
    "always never often usually sometimes just still only really certainly perhaps of"
  ).split(" "),
);

const capitaliseI = (s: string) => s.replace(/\bi\b/g, "I");

export function formNote(target: string): string | null {
  const s =
    " " +
    target
      .toLowerCase()
      .replace(/[^a-z' ]/g, " ")
      .replace(/\s+/g, " ") +
    " ";
  let m: RegExpMatchArray | null;

  if ((m = s.match(/ (do not|does not) (\w+) /)))
    return `Phủ định: '${m[1]}' rồi tới động từ gốc — ${m[1]} ${m[2]}.`;

  // "not" may sit between the auxiliary and the participle: "is not confirmed"
  // is still passive, and reading it as a past simple would teach the wrong
  // thing about the most common negative shape in the phase.
  // An adverb may sit between the auxiliary and the participle — "is fully
  // booked" — and without this slot the past-simple branch below claimed it,
  // teaching an adjectival participle as a past tense five weeks before the
  // past tense is taught at all.
  // Not every -ed word after a copula is a participle. "unlimited" and
  // "unhurried" are adjectives that never had a verb, and calling them passive
  // teaches a structure the sentence does not contain.
  const ADJECTIVE_ED =
    /^(unlimited|unhurried|unfinished|tired|pleased|interested|worried|surprised|excited|crowded|complicated|detailed|dedicated|talented|elderly)$/;
  if (
    (m = s.match(
      / (is|are|was|were) (not |fully |already |now |just )?(\w+ed|given|taken|made|sent|put|shown|held|kept|written|done) /,
    )) &&
    !ADJECTIVE_ED.test(m[3])
  )
    return `Bị động: '${m[1]}' + phân từ hai — ${m[1]} ${m[2] ?? ""}${m[3]}.`;

  // "everything", "morning", "evening" and their kin end in -ing and are not
  // participles: "and that is everything" was being taught as a present
  // continuous. A note that names the wrong form is worse than no note.
  if (
    (m = s.match(/ (am|is|are) (\w+ing) /)) &&
    !/^((every|some|no|any)thing|(morn|even)ing|nothing|string|ring|king|thing)$/.test(m[2])
  )
    return `Hiện tại tiếp diễn cho việc đang làm: ${m[1]} ${m[2]}.`;

  if (
    (m = s.match(/ (could|would|may|can|will|shall|must) (i|you|we|he|she|they) (\w+) /)) &&
    !NOT_A_VERB.has(m[3])
  )
    return capitaliseI(`Sau '${m[1]}' động từ giữ nguyên dạng gốc: ${m[1]} ${m[2]} ${m[3]}.`);

  if ((m = s.match(/ (could|would|may|can|will|shall|must) (\w+) /)) && !NOT_A_VERB.has(m[2]))
    return `Sau '${m[1]}' động từ giữ nguyên dạng gốc: ${m[1]} ${m[2]}.`;

  if ((m = s.match(/^ please (\w+) /)))
    return `Câu mệnh lệnh lịch sự: Please + động từ gốc — please ${m[1]}.`;

  if ((m = s.match(/ the (\w+) of the (\w+) /)))
    return `Danh từ trừu tượng cần 'the' và cụm bổ nghĩa: the ${m[1]} of the ${m[2]}.`;

  // The whole noun phrase, not the adjective in front of it: "a good match",
  // never "a good". The {0,2} prefix is lazy so the phrase stops at the first
  // boundary rather than swallowing "a day pass today".
  // The phrase runs to a real boundary, so "a city tour" is not cut down to
  // "a city" and "a safety rule here" does not swallow the adverb. Adding
  // "here", "there" and "too" to the terminators fixed the second; making the
  // head noun greedy up to a terminator fixed the first.
  // The terminators need a boundary of their own: without one, "to" matched
  // the front of "tour" and cut "a city tour" down to "a city".
  // A finite verb ends the phrase too, or "A towel cover stays on at all
  // times." hands back "a towel cover stays" as the noun.
  const nounPhrase =
    /\b(an?) ((?:\w+ ){0,2}?\w+?)(?=[.,?!]|$| (?:for|today|too|to|in|on|at|with|of|and|is|are|was|were|has|have|stays|opens|closes|costs|needs|includes|takes|now|here|there|please|sir|madam)(?![a-z]))/i;
  if ((m = target.match(nounPhrase)))
    return m[1].toLowerCase() === "an"
      ? `Mạo từ 'an' đứng trước âm nguyên âm: an ${m[2].toLowerCase()}.`
      : `Danh từ đếm được số ít cần mạo từ: a ${m[2].toLowerCase()}.`;

  if ((m = s.match(/ (i|we|you|they) (always|never|often|usually|sometimes) (\w+) /)))
    return capitaliseI(`Trạng từ tần suất đứng trước động từ chính: ${m[1]} ${m[2]} ${m[3]}.`);

  if ((m = s.match(/ (the \w+|it|he|she) (includes|has|opens|closes|starts|costs|needs|takes) /)))
    return `Chủ ngữ số ít đi với động từ có -s: ${m[2]}.`;

  if (PAST.test(target) && (m = target.match(PAST)))
    return `Quá khứ đơn: động từ chia quá khứ — ${m[1].toLowerCase()}.`;

  if ((m = s.match(/ (\w{3,})s (are|were) /)))
    return `Danh từ số nhiều đi với '${m[2]}': ${m[1]}s ${m[2]}.`;

  return null;
}

/** Longest a tip may grow to. Past this the note stops being a hint and
 *  starts being a paragraph the learner will skip. */
const MAX_TIP = 190;

export function tipWithFormNote(tip: string, target: string): string {
  if (NAMES_A_FORM.test(tip)) return tip;
  const note = formNote(target);
  if (!note) return tip;
  const joined = tip ? `${tip.replace(/\s+$/, "")} ${note}` : note;
  return joined.length > MAX_TIP ? tip : joined;
}
