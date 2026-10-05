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
// "rather" ("would rather" is not a modal and a verb), the object pronouns
// ("I am going to HIM now" is a continuous of "go") and the prepositions ("I
// can, IN exchange for…") are on it since Phase 4 round 2 found each printed
// as the verb a learner should keep bare.
const NOT_A_VERB = new Set(
  (
    "sir madam please and but or not also too now then today i you we he she they it the a an my your our " +
    "always never often usually sometimes just still only really certainly perhaps of rather " +
    "him her them me us in on at for with to from by after before"
  ).split(" "),
);

/** A verb that ends a noun phrase: "a guest FELL", "I saw a guest COLLAPSE",
 *  "a card hold LOOKS", "a fee APPLIES" were each printed as the noun the
 *  article belongs to. */
// Only words that cannot be the noun: "a long WAIT" and "a quick CALL" are
// nouns, so the bare forms that double as nouns are left off.
const ENDS_A_NOUN_PHRASE =
  /^(fell|falls|collapse|collapses|collapsed|looks|applies|comes|goes|arrives|says|happens|seems|gets|leaves|\w+ed)$/;

const capitaliseI = (s: string) => s.replace(/\bi\b/g, "I");

/** Not every -ed word after a copula or auxiliary is a participle.
 *  "unlimited" and "unhurried" are adjectives that never had a verb, and
 *  calling them passive (or perfect) teaches a structure the sentence does
 *  not contain. Shared by the passive, perfect and modal-passive branches. */
// Phase 4 round 2 added the feelings and states its tips called passive:
// "is relaxed", "will be thrilled", "are short-staffed", "is light-headed",
// "is uncovered" (the course's own week-31 lesson teaches -ed adjectives).
const ADJECTIVE_ED =
  /^(unlimited|unhurried|unfinished|tired|pleased|interested|worried|surprised|excited|crowded|complicated|detailed|dedicated|talented|elderly|disappointed|satisfied|delighted|annoyed|confused|upset|corked|stained|chipped|cracked|scratched|relaxed|thrilled|amazed|stressed|scared|frightened|exhausted|overwhelmed|embarrassed|concerned|uncovered|short_staffed|\w+_headed)$/;

/** Words ending in -ing that are not a verb's -ing form. "that was DURING
 *  quiet hours" was taught as a past continuous ("was during") in a week-28
 *  tip, and "everything", "morning" and their kin were the same mistake
 *  earlier. Shared by both continuous branches. */
// …and the -ing adjectives and nouns Phase 4 printed as continuous: "is
// soothing", "is refreshing", "There is lightning".
const NOT_A_PARTICIPLE =
  /^((every|some|no|any)thing|(morn|even)ing|nothing|string|ring|king|thing|spring|during|including|according|regarding|concerning|pending|following|building|ceiling|wedding|clothing|bedding|pudding|sibling|stuffing|soothing|relaxing|refreshing|lightning|amazing|interesting|exciting|charming|boring|welcoming|calming|comforting|stunning|surprising|disappointing|worrying|annoying|tiring|missing)$/;

/** A hyphenated verb is ONE verb. Stripping punctuation used to turn
 *  "can re-clean" into "can re clean", and the modal rule printed "Sau
 *  'can' động từ giữ nguyên dạng gốc: can re." to Housekeeping in weeks 28
 *  and 30. The hyphen is held as "_" — which `\w` matches — while the rules
 *  run, and put back on the way out. */
export function formNote(target: string): string | null {
  // "deep clean" is one verb as well, written open: "We can deep clean the
  // carpet" was printed "Sau 'can' động từ giữ nguyên dạng gốc: can deep."
  const held = target.replace(/\b(deep) (clean)/gi, "$1·$2");
  return (
    formNoteHeld(held)
      ?.replace(/deep_clean/g, "deep clean")
      .replace(/·/g, " ")
      .replace(/_/g, "-") ?? null
  );
}

function formNoteHeld(target: string): string | null {
  const s =
    " " +
    target
      .toLowerCase()
      .replace(/([a-z])[-·]([a-z])/g, "$1_$2")
      .replace(/[^a-z'_ ]/g, " ")
      .replace(/\s+/g, " ") +
    " ";
  let m: RegExpMatchArray | null;

  // "The Do Not Disturb sign was on the door." names a sign, and the note
  // taught it as a negative with a bare verb.
  // "…, I do not, madam" has no verb after the "not" ("do not madam").
  if (
    (m = s.match(/ (do not|does not) (\w+) /)) &&
    !/do not disturb/i.test(target) &&
    !NOT_A_VERB.has(m[2])
  )
    return `Phủ định: '${m[1]}' rồi tới động từ gốc — ${m[1]} ${m[2]}.`;

  // "What if we SERVED the shorter set menu?" is week 35's suggestion frame,
  // and the past-simple branch below taught it as a past tense.
  // Only when the verb is in the past: "What if we BOOK two rooms" is a plain
  // present and needs no note about it.
  if (
    (m = s.match(/ what if (we|i|you|they) (\w+) /)) &&
    /(ed|^took|^made|^gave|^sent|^kept|^held|^brought|^left|^told|^put|^ran|^came|^went|^split)$/.test(
      m[2],
    )
  )
    return `Gợi ý lịch sự: What if + động từ quá khứ (nói về khả năng, không phải quá khứ) — ${capitaliseI(`what if ${m[1]} ${m[2]}`)}.`;

  // "The steak is being remade" is a passive in the continuous, not a
  // present continuous of "be".
  if ((m = s.match(/ (is|are) being (\w+ed|\w*made|taken|sent|done|given|kept|held|shown) /)))
    return `Bị động tiếp diễn: '${m[1]} being' + phân từ hai — ${m[1]} being ${m[2]}.`;

  // The four branches below exist because the ones further down claimed
  // their sentences first, and always as the wrong form. This file runs on
  // all forty weeks, so the misreadings landed exactly where a phase was
  // teaching the very form the note denied: week 25 ("We are going to send…"
  // called a present continuous), week 29 ("I was checking… when the guest
  // called." called a past simple because of "was"), week 32 ("I have
  // arranged…" called a past simple), week 37 ("must be ventilated" called a
  // bare-verb modal). Each earns its slot ahead of the branch that misread it.

  // Past continuous before PAST: "was" alone is not a past simple lesson
  // when the -ing verb beside it is the actual form.
  // Named for what it always means — an action in progress at a past moment —
  // not for the interruption it only sometimes has: "Engineering was fixing
  // the shower at ten." has nothing breaking in, and the old wording ("việc
  // khác xen vào") described a clause the sentence does not contain.
  if ((m = s.match(/ (was|were) (not )?(\w+ing) /)) && !NOT_A_PARTICIPLE.test(m[3]))
    return `Quá khứ tiếp diễn — việc đang diễn ra tại một lúc trong quá khứ: ${m[1]} ${m[2] ?? ""}${m[3]}.`;

  // Present perfect before PAST: "I have arranged…" is not "arranged" the
  // past simple. The participle list is closed so "We have a city tour"
  // (have as a main verb) can never match, and the word before "have" must
  // not be a modal — "should not have happened" is a modal perfect, and
  // calling it a present tense is the exact class of error this file was
  // rewritten to stop making.
  // The word before "has" may be a room number the cleaner stripped: "1207
  // has had no entry…" was taught as a past simple of "had".
  if (
    (m = s.match(
      /(?: (\w+))? (has|have) (not |already |just )?(\w+ed|been|done|gone|made|taken|given|sent|put|shown|held|kept|written|seen|come|left|found|told|brought|read|set|had|smelt|felt|lost|paid|bought|heard|met|spent|slept|understood|forgotten|eaten|broken|chosen|spoken) /,
    )) &&
    !/^(should|would|could|may|might|must|will|can|shall|to|not)$/.test(m[1] ?? "") &&
    !ADJECTIVE_ED.test(m[4])
  )
    return `Hiện tại hoàn thành: '${m[2]}' + phân từ hai — ${m[2]} ${m[3] ?? ""}${m[4]}.`;

  // Modal passive before the modal branches: in "must be ventilated" the
  // lesson is the passive, not "after 'must' the verb stays base".
  if (
    (m = s.match(
      / (will|would|can|could|may|might|must|shall|should) (not )?be (\w+ed|given|taken|made|sent|put|shown|held|kept|written|done|seen|found|served|printed|handled|arranged|confirmed|cleaned|charged|refunded|delivered) /,
    )) &&
    !ADJECTIVE_ED.test(m[3])
  )
    return `Bị động với '${m[1]}': ${m[1]} ${m[2] ?? ""}be ${m[3]}.`;

  // Going-to future before the continuous branch: "going" ends in -ing, so
  // without this slot "We are going to send a bellman up" reads as a present
  // continuous. Only when a verb follows, though — "Your room number is
  // going to the fire team now." really is continuous, and the word after
  // "to" there is a determiner, not a verb.
  if (
    (m = s.match(/ (am|is|are) (not )?going to (\w+) /)) &&
    !NOT_A_VERB.has(m[3]) &&
    !/^(the|this|that|these|those|another|any|some)$/.test(m[3])
  )
    return `Thì tương lai gần: going to ${m[3]}.`;

  // "not" may sit between the auxiliary and the participle: "is not confirmed"
  // is still passive, and reading it as a past simple would teach the wrong
  // thing about the most common negative shape in the phase.
  // An adverb may sit between the auxiliary and the participle — "is fully
  // booked" — and without this slot the past-simple branch below claimed it,
  // teaching an adjectival participle as a past tense five weeks before the
  // past tense is taught at all.
  if (
    (m = s.match(
      / (is|are|was|were) (not |fully |already |now |just )?(\w+ed|given|taken|made|sent|put|shown|held|kept|written|done) /,
    )) &&
    !ADJECTIVE_ED.test(m[3]) &&
    // "What I can DO IS PUT it to my manager" is a cleft with a bare verb.
    !/ do (is|was) /.test(s)
  )
    // "We are fully booked" — the -ed word is the state the week teaches as
    // an adjective, and no note is better than calling it passive (or, one
    // branch further down, a past tense).
    return m[2] === "fully "
      ? null
      : `Bị động: '${m[1]}' + phân từ hai — ${m[1]} ${m[2] ?? ""}${m[3]}.`;

  // "everything", "morning", "evening" and their kin end in -ing and are not
  // participles: "and that is everything" was being taught as a present
  // continuous. A note that names the wrong form is worse than no note.
  if (
    (m = s.match(/ (am|is|are) (\w+ing) /)) &&
    !NOT_A_PARTICIPLE.test(m[2]) &&
    !new RegExp(` there ${m[1]} ${m[2]} `).test(s)
  )
    return `Hiện tại tiếp diễn — việc đang làm hoặc đã sắp xếp: ${m[1]} ${m[2]}.`;

  // "Can someone bring…" — the subject sits between the modal and the verb,
  // and the old note quoted the subject as the verb ("can someone").
  if (
    (m = s.match(
      / (could|would|may|can|will|shall|must) (i|you|we|he|she|they|someone|somebody|anyone|anybody|everyone|nobody) (\w+) /,
    )) &&
    !NOT_A_VERB.has(m[3])
  )
    return capitaliseI(`Sau '${m[1]}' động từ giữ nguyên dạng gốc: ${m[1]} ${m[2]} ${m[3]}.`);

  if ((m = s.match(/ (could|would|may|can|will|shall|must) (\w+) /)) && !NOT_A_VERB.has(m[2]))
    return `Sau '${m[1]}' động từ giữ nguyên dạng gốc: ${m[1]} ${m[2]}.`;

  if ((m = s.match(/^ please (\w+) /)))
    return `Câu mệnh lệnh lịch sự: Please + động từ gốc — please ${m[1]}.`;

  // A noun phrase built with "of", not an abstract noun: "the back of the
  // menu" and "the cocktail of the day" were both taught as abstract nouns.
  if ((m = s.match(/ the (\w+) of the (\w+) /)))
    return `Cụm danh từ với 'of' — cả hai danh từ đều có 'the': the ${m[1]} of the ${m[2]}.`;

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
    // Adverbs and particles end it too: "a bellman up", "a message instead",
    // "a suite myself" and "a small table outside" were all printed as the
    // noun a learner should put the article in front of.
    /\b(an?) ((?:\w+ ){0,2}?\w+?)(?=[.,?!]|$| (?:for|today|too|to|in|on|at|with|of|and|but|or|so|is|are|was|were|has|have|stays|opens|closes|costs|needs|includes|takes|now|then|here|there|please|sir|madam|up|down|out|off|back|away|over|instead|again|myself|yourself|himself|herself|ourselves|themselves|outside|inside|first|later|tomorrow|tonight|soon|before|after|until|by|from|into|this|that|when|while|if|because|as|than|right|yet|already|still|like|such)(?![a-z]))/i;
  // "a little", "a few", "a lot", "a bit" are quantities, not a countable
  // noun taking its article: "It costs a little more" was teaching "a little
  // more" as a singular noun in five tips across Phase 3.
  // "in a row" and "a great deal more" are set phrases, not a noun taking
  // its article.
  if (
    (m = target.match(nounPhrase)) &&
    !/^(little|few|lot|bit|great deal|good deal)\b/i.test(m[2]) &&
    !/\bin a row\b/i.test(target)
  ) {
    const words = m[2].toLowerCase().split(" ");
    while (words.length > 1 && ENDS_A_NOUN_PHRASE.test(words[words.length - 1]!)) words.pop();
    const phrase = words.join(" ");
    if (!ENDS_A_NOUN_PHRASE.test(phrase))
      return m[1].toLowerCase() === "an"
        ? `Mạo từ 'an' đứng trước âm nguyên âm: an ${phrase}.`
        : `Danh từ đếm được số ít cần mạo từ: a ${phrase}.`;
  }

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

/** `seen` is the lesson's notes so far, by kind (the text before the colon).
 *  A note says something the first time; "Sau 'will' động từ giữ nguyên dạng
 *  gốc" on 58 of Front Office's 176 Phase 3 tips was a blind review's example
 *  of feedback that stops being read. Once per lesson per kind. */
export function tipWithFormNote(tip: string, target: string, seen?: Set<string>): string {
  if (NAMES_A_FORM.test(tip)) return tip;
  const note = formNote(target);
  if (!note) return tip;
  const kind = note.split(":")[0]!;
  if (seen?.has(kind)) return tip;
  seen?.add(kind);
  const joined = tip ? `${tip.replace(/\s+$/, "")} ${note}` : note;
  return joined.length > MAX_TIP ? tip : joined;
}
