// ============================================================
// PHASE 0 — pre-A1 (weeks 1-6) · docs/curriculum-level-matrix.md
//
// Design rationale (Academic Director notes):
//
// At pre-A1 the language IS the same across all six departments —
// the alphabet, numbers, clock times, prices and courtesy formulas
// are universal. What differs is only the *props*: which nouns the
// learner handles, which service has which opening hours, what a
// thing costs. So this module separates:
//
//   SPINE   — the pedagogy: what is taught in each of the 24 lessons,
//             the sentence frames, the L1-interference error pairs.
//   LEXICON — per-department props: staff name, station, six countable
//             items, one timed service, one priced service.
//
// Authoring 36 near-identical WeekContent objects by hand is exactly
// the copy-paste failure the content audit flagged. Composing them
// from one spine guarantees every department gets the same CEFR
// ladder, and a pedagogical fix lands in one place instead of six.
//
// HARD CONSTRAINTS honoured throughout (gated by scripts/verify-content.ts;
// the bank contract is docs/phase0-phase1-bank-contract.md):
//  · Target sentences ≤ 5 words, single clause (P0 cap in the matrix).
//  · Every `targetResponse` contains ≥ 2 words of ≥ 4 letters —
//    below that, ListeningSuite silently drops the cloze task.
//  · `game.prompt` never repeats `speaking.guestPrompt` of its lesson,
//    and grammar pairs are never recycled as game options.
//  · 8-10 new vocabulary items per week; `reviewWords` from week 2 on.
//
// Grammar "rude" lines are deliberately the *learner's* likely error
// (Vietnamese L1 interference: dropped copula, missing article, no
// plural -s, transferred word order) — not a rude guest. At pre-A1
// the useful contrast is broken-English vs. correct-English.
// ============================================================

import { normalize, PROMISE_VERBS } from "@/lib/speaking-score";
import type {
  GameRound,
  GrammarItem,
  LessonContent,
  ReadingItem,
  SpeakingItem,
  VocabItem,
  WeekContent,
} from "./week-content";

const RESORT = "Lotus Bay";

// ------------------------------------------------------------
// Department lexicons — the only per-department variation in P0.
// ------------------------------------------------------------
/** `mass: true` marks an uncountable noun. Week 2 lesson 4 IS the countable
 *  vs uncountable lesson: it renders `How many {items[2]}s?` and keys its
 *  reading answer to "{word} đếm được". Front Office had `Luggage` there and
 *  F&B had `Water`, so both departments drilled `"Three luggages, sir."` /
 *  `"How many waters, sir?"` five times as the model, with `"Vì luggage đếm
 *  được"` as the answer key — while the rule in the SAME lesson used water as
 *  its example of an uncountable noun. verify-content now refuses a mass noun
 *  at index 0 or 2, the two slots the plural frames read. */
type P0Item = {
  word: string;
  phonetic: string;
  definition: string;
  icon: string;
  mass?: true;
};

export type P0Lexicon = {
  code: string;
  deptEn: string;
  deptPhonetic: string;
  deptVi: string;
  staff: string;
  /** Pronouns for `staff`. Three of the six personas are women (Linh, Mai,
   *  Trang) and the P3/P4 frames used to hardcode "He"/"His", so half the
   *  course narrated a learner's own department persona as a man — 25
   *  passages across weeks 25-39. Any frame referring back to `staff` must
   *  read from here. */
  pron: { subj: string; obj: string; poss: string; refl: string };
  /** Where this staff member greets guests, lowercase, article included. */
  station: string;
  items: [P0Item, P0Item, P0Item, P0Item, P0Item, P0Item];
  /** A service this department owns, used for opening-hours work in week 3. */
  /** `isEvent` marks a service whose name is an EVENT noun — check-in,
   *  breakfast, room cleaning. Week 3 lesson 4 asks "What time is {service}?",
   *  which is idiomatic only for events. Spa, Guest Relations and Back Office
   *  name a PLACE ("the spa", "the lounge", "the office"), and the frame taught
   *  them "What time is the lounge?" as the model correct sentence on six
   *  surfaces — the lesson title, the grammar model, its rule, the graded
   *  speaking target, the reading passage and a reading answer key. A place
   *  cannot be a time. Places take do-support instead: "What time does the
   *  lounge open?" */
  service: { en: string; vi: string; open: string; close: string; isEvent?: true };
  /** One paid item, used for price work in week 4. */
  /** Giá dịch vụ dùng để dạy số tiền. VND là đơn vị giao dịch thật ở
   *  Việt Nam nên nó dẫn dắt; USD giữ lại cho bài quy đổi (tuần 4 bài 3).
   *  `vndWord` phải đọc được trong 3 từ tiếng Anh trở xuống — trần pre-A1
   *  là 5 từ một câu. */
  priced: {
    en: string;
    vi: string;
    vnd: number;
    vndWord: string;
    usd: number;
    usdWord: string;
  };
  /** The department's own SCHEDULABLE service, for week 3's today/tomorrow
   *  frames. `priced` cannot do this job: it names what the department
   *  CHARGES for, and half of those are not appointments — "When is my
   *  Vietnamese coffee?" answered "It is tomorrow" is a service failure, and
   *  "Your laundry for one shirt is tomorrow." is not a sentence. Kept short
   *  enough for the 5-word cap: `Is my ${booking} today?` */
  booking: { en: string; vi: string };
  /** Danh từ đi sau "Enjoy your …" khi tiễn khách. Lễ tân tiễn một kỳ nghỉ,
   *  nhà hàng tiễn một bữa ăn, spa tiễn một buổi trị liệu. Chốt cứng "stay"
   *  cho cả sáu là dạy nhân viên bàn một cách kết hợp từ sai. */
  closing: { en: string; vi: string };
  /** `cardinal` là cách đọc SAI mà người Việt hay mắc: đọc số phòng như số
   *  đếm ("two hundred five") thay vì đọc từng chữ số. Vế `rude` phải đọc lên
   *  được, nên không dùng chữ số ở đó. */
  roomNo: { digits: string; spoken: string; cardinal: string };
  /** `cardinal` chỉ dùng cho nhiễu và cho vế sai: "the eight floor" thay vì
   *  "the eighth floor" là lỗi số đếm/số thứ tự phổ biến nhất. */
  floor: { ordinal: string; cardinal: string; vi: string };
};

/** Chữ cái đầu câu. Số tiền VND hay đứng đầu câu ("Five hundred thousand
 *  dong, sir.") nên khung phải hoa nó lên — 18 câu mẫu từng bắt đầu bằng
 *  chữ thường vì thiếu bước này. */
/** Title Case cho tên bài — capFirst chỉ hoa chữ đầu chuỗi, nên
 *  `What Time Is ${capFirst("the spa")}?` ra "The spa" giữa tiêu đề. */
function titleCase(s: string): string {
  return s
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function capFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const LEXICONS: Record<string, P0Lexicon> = {
  FO: {
    code: "FO",
    deptEn: "Front Office",
    deptPhonetic: "/frʌnt ˈɒfɪs/",
    deptVi: "Lễ tân",
    staff: "Nam",
    pron: { subj: "he", obj: "him", poss: "his", refl: "himself" },
    station: "the front desk",
    items: [
      { word: "Key", phonetic: "/kiː/", definition: "Chìa khóa phòng", icon: "🔑" },
      { word: "Passport", phonetic: "/ˈpɑːspɔːt/", definition: "Hộ chiếu", icon: "🛂" },
      { word: "Form", phonetic: "/fɔːm/", definition: "Tờ khai, biểu mẫu", icon: "📋" },
      { word: "Luggage", phonetic: "/ˈlʌɡɪdʒ/", definition: "Hành lý", icon: "🧳", mass: true },
      { word: "Map", phonetic: "/mæp/", definition: "Bản đồ", icon: "🗺️" },
      { word: "Pen", phonetic: "/pen/", definition: "Bút", icon: "🖊️" },
    ],
    service: { en: "check-in", vi: "nhận phòng", open: "two", close: "eleven", isEvent: true },
    priced: {
      en: "airport transfer",
      vi: "xe đưa đón sân bay",
      vnd: 500000,
      vndWord: "five hundred thousand",
      usd: 20,
      usdWord: "twenty",
    },
    booking: { en: "airport transfer", vi: "xe đưa đón" },
    closing: { en: "stay", vi: "kỳ nghỉ" },
    roomNo: { digits: "205", spoken: "two-oh-five", cardinal: "two hundred five" },
    floor: { ordinal: "second", cardinal: "two", vi: "tầng hai" },
  },
  FB: {
    code: "FB",
    deptEn: "Food and Beverage",
    deptPhonetic: "/fuːd ənd ˈbevərɪdʒ/",
    deptVi: "Nhà hàng & Bar",
    staff: "Linh",
    pron: { subj: "she", obj: "her", poss: "her", refl: "herself" },
    station: "the restaurant door",
    items: [
      { word: "Menu", phonetic: "/ˈmenjuː/", definition: "Thực đơn", icon: "📋" },
      { word: "Table", phonetic: "/ˈteɪbl/", definition: "Bàn ăn", icon: "🪑" },
      { word: "Spoon", phonetic: "/spuːn/", definition: "Thìa", icon: "🥄" },
      // Index 4 is NOT taught as a headword — only 0-3 get a v() card — and
      // FB-36 reviews "Water", so parking it there orphaned that review card.
      { word: "Water", phonetic: "/ˈwɔːtə/", definition: "Nước lọc", icon: "💧", mass: true },
      { word: "Coffee", phonetic: "/ˈkɒfi/", definition: "Cà phê", icon: "☕", mass: true },
      { word: "Napkin", phonetic: "/ˈnæpkɪn/", definition: "Khăn ăn", icon: "🧻" },
    ],
    service: { en: "breakfast", vi: "bữa sáng", open: "six", close: "ten", isEvent: true },
    priced: {
      en: "Vietnamese coffee",
      vi: "cà phê Việt Nam",
      vnd: 90000,
      vndWord: "ninety thousand",
      usd: 4,
      usdWord: "four",
    },
    booking: { en: "table booking", vi: "đặt bàn" },
    closing: { en: "meal", vi: "bữa ăn" },
    roomNo: { digits: "310", spoken: "three-one-oh", cardinal: "three hundred ten" },
    floor: { ordinal: "third", cardinal: "three", vi: "tầng ba" },
  },
  HK: {
    code: "HK",
    deptEn: "Housekeeping",
    deptPhonetic: "/ˈhaʊskiːpɪŋ/",
    deptVi: "Buồng phòng",
    staff: "Huy",
    pron: { subj: "he", obj: "him", poss: "his", refl: "himself" },
    station: "the guest room door",
    items: [
      { word: "Towel", phonetic: "/ˈtaʊəl/", definition: "Khăn tắm", icon: "🧺" },
      { word: "Soap", phonetic: "/səʊp/", definition: "Xà phòng", icon: "🧼", mass: true },
      { word: "Pillow", phonetic: "/ˈpɪləʊ/", definition: "Gối", icon: "🛏️" },
      { word: "Blanket", phonetic: "/ˈblæŋkɪt/", definition: "Chăn", icon: "🛌" },
      { word: "Hanger", phonetic: "/ˈhæŋə/", definition: "Móc treo quần áo", icon: "🧥" },
      { word: "Bin", phonetic: "/bɪn/", definition: "Thùng rác", icon: "🗑️" },
    ],
    service: { en: "room cleaning", vi: "dọn phòng", open: "eight", close: "four", isEvent: true },
    priced: {
      en: "shirt laundry",
      vi: "giặt là áo sơ mi",
      vnd: 70000,
      vndWord: "seventy thousand",
      usd: 3,
      usdWord: "three",
    },
    booking: { en: "laundry", vi: "đồ giặt" },
    closing: { en: "stay", vi: "kỳ nghỉ" },
    roomNo: { digits: "812", spoken: "eight-one-two", cardinal: "eight hundred twelve" },
    floor: { ordinal: "eighth", cardinal: "eight", vi: "tầng tám" },
  },
  SW: {
    code: "SW",
    deptEn: "Spa and Wellness",
    deptPhonetic: "/spɑː ənd ˈwelnəs/",
    deptVi: "Spa & Sức khỏe",
    staff: "Mai",
    pron: { subj: "she", obj: "her", poss: "her", refl: "herself" },
    station: "the spa reception",
    items: [
      { word: "Robe", phonetic: "/rəʊb/", definition: "Áo choàng tắm", icon: "🥼" },
      { word: "Locker", phonetic: "/ˈlɒkə/", definition: "Tủ khóa", icon: "🔒" },
      { word: "Slipper", phonetic: "/ˈslɪpə/", definition: "Dép đi trong spa", icon: "🩴" },
      // "Trà", not "Trà thảo mộc" — herbal tea is its own SW week-9 headword.
      { word: "Tea", phonetic: "/tiː/", definition: "Trà", icon: "🍵", mass: true },
      { word: "Oil", phonetic: "/ɔɪl/", definition: "Tinh dầu", icon: "🫗", mass: true },
      { word: "Candle", phonetic: "/ˈkændl/", definition: "Nến thơm", icon: "🕯️" },
    ],
    // Open and close must differ — the week-3 reading questions offer both
    // as answer options, so identical values give the learner two identical
    // choices and no correct answer to pick.
    service: { en: "the spa", vi: "spa", open: "ten", close: "nine" },
    priced: {
      en: "foot massage",
      vi: "massage chân",
      vnd: 700000,
      vndWord: "seven hundred thousand",
      usd: 28,
      usdWord: "twenty-eight",
    },
    booking: { en: "massage", vi: "buổi massage" },
    closing: { en: "treatment", vi: "buổi trị liệu" },
    roomNo: { digits: "104", spoken: "one-oh-four", cardinal: "one hundred four" },
    floor: { ordinal: "first", cardinal: "one", vi: "tầng một" },
  },
  GR: {
    code: "GR",
    deptEn: "Guest Relations",
    deptPhonetic: "/ɡest rɪˈleɪʃnz/",
    deptVi: "Quan hệ khách hàng",
    staff: "Trang",
    pron: { subj: "she", obj: "her", poss: "her", refl: "herself" },
    station: "the lounge door",
    items: [
      // "Lounge card", not "Card" — the shared week-4 payment vocabulary
      // already teaches "Card", and one department must not meet the same
      // headword twice with two different meanings.
      {
        word: "Lounge card",
        phonetic: "/laʊndʒ kɑːd/",
        definition: "Thẻ ra vào phòng chờ",
        icon: "💳",
      },
      { word: "Gift", phonetic: "/ɡɪft/", definition: "Quà tặng", icon: "🎁" },
      { word: "Flower", phonetic: "/ˈflaʊə/", definition: "Hoa", icon: "💐" },
      // Đổi từ `Letter` vì tuần 1 dạy `Letter` với nghĩa "chữ cái" — cùng một
      // headword mang hai nghĩa thì lịch ôn tập ghi đè lên nhau (cổng trùng
      // headword chặn). `Envelope` đúng nghiệp vụ Quan hệ khách hàng hơn.
      { word: "Envelope", phonetic: "/ˈenvələʊp/", definition: "Phong bì", icon: "✉️" },
      { word: "Seat", phonetic: "/siːt/", definition: "Chỗ ngồi", icon: "💺" },
      { word: "Umbrella", phonetic: "/ʌmˈbrelə/", definition: "Ô, dù", icon: "☂️" },
    ],
    service: { en: "the lounge", vi: "phòng chờ", open: "seven", close: "ten" },
    priced: {
      en: "birthday cake",
      vi: "bánh sinh nhật",
      vnd: 500000,
      vndWord: "five hundred thousand",
      usd: 20,
      usdWord: "twenty",
    },
    booking: { en: "birthday cake", vi: "bánh sinh nhật" },
    closing: { en: "stay", vi: "kỳ nghỉ" },
    roomNo: { digits: "720", spoken: "seven-two-oh", cardinal: "seven hundred twenty" },
    floor: { ordinal: "seventh", cardinal: "seven", vi: "tầng bảy" },
  },
  BO: {
    code: "BO",
    deptEn: "Back Office",
    deptPhonetic: "/bæk ˈɒfɪs/",
    deptVi: "Vận hành & Kinh doanh",
    staff: "Dũng",
    pron: { subj: "he", obj: "him", poss: "his", refl: "himself" },
    station: "the office door",
    items: [
      // "Hóa đơn" bare collided with the Bill card three weeks later, and the
      // vocabulary paper printed both as options with one of them marked wrong.
      {
        word: "Invoice",
        phonetic: "/ˈɪnvɔɪs/",
        definition: "Hóa đơn công ty (thanh toán sau)",
        icon: "🧾",
      },
      { word: "Email", phonetic: "/ˈiːmeɪl/", definition: "Thư điện tử", icon: "📧" },
      { word: "Folder", phonetic: "/ˈfəʊldə/", definition: "Tập hồ sơ", icon: "📁" },
      { word: "Printer", phonetic: "/ˈprɪntə/", definition: "Máy in", icon: "🖨️" },
      { word: "Chair", phonetic: "/tʃeə/", definition: "Ghế", icon: "🪑" },
      { word: "Pen", phonetic: "/pen/", definition: "Bút", icon: "🖊️" },
    ],
    service: { en: "the office", vi: "văn phòng", open: "eight", close: "five" },
    priced: {
      en: "meeting room for one hour",
      vi: "phòng họp một giờ",
      vnd: 1000000,
      vndWord: "one million",
      usd: 40,
      usdWord: "forty",
    },
    booking: { en: "meeting room", vi: "phòng họp" },
    closing: { en: "day", vi: "một ngày tốt lành" },
    roomNo: { digits: "415", spoken: "four-one-five", cardinal: "four hundred fifteen" },
    floor: { ordinal: "fourth", cardinal: "four", vi: "tầng bốn" },
  },
};

// ------------------------------------------------------------
// Small authoring helpers.
// ------------------------------------------------------------
export function v(
  word: string,
  phonetic: string,
  definition: string,
  context: string,
  icon: string,
): VocabItem {
  return { word, phonetic, definition, context, icon };
}
/** `nearMiss` is a repair that LOOKS right and is still wrong, and it is the
 *  only thing that makes the checkpoint grammar block measure grammar.
 *
 *  Its distractors are other pairs' `polite` lines, picked for highest word
 *  overlap with the stem — which killed "pick the longest" but left "pick the
 *  option sharing most words with the question" winning 53%.
 *  CHECKPOINT_BLOCK_FLOOR_PCT is 50 and checkpointPassed requires every block
 *  to clear its own floor, so that trick alone carried the grammar block. I
 *  had deprioritised this after comparing 56% against the 70% OVERALL pass
 *  mark — the wrong threshold. Four audit reports caught it.
 *
 *  A good nearMiss shares nearly every word with the correct answer, so word
 *  overlap stops discriminating and the learner has to read the repair. */
export function g(rude: string, polite: string, rule: string, nearMiss?: string): GrammarItem {
  return { rude, polite, rule, ...(nearMiss ? { nearMiss } : {}) };
}
/** `role` marks who says `guestPrompt`. It defaults to the guest, which is
 *  right for most of the course and was wrong for all 342 speaking items of
 *  weeks 1-14: the field was never set once, so a room attendant — whose day
 *  is mostly floor supervisor and linen room — practised fourteen weeks of
 *  guest talk and never once heard a colleague. Week 7 lesson 4 is titled
 *  "Asking a Colleague for Help" and its prompt was still a guest's. */
/** `must` names the words this frame cannot lose beyond the ones the grader
 *  derives on its own (numbers, the copula, `will`, negation, the -s, a
 *  title+surname). Five audit reports independently called the empty state of
 *  this field the largest remaining hole, and each ran the grader to prove it:
 *  "Before we start, any." passed an `any injuries?` item at 80%; "Careful,
 *  madam. The floor is." passed `the floor is wet` at 83%; "I will ask the
 *  manager." passed `ask the kitchen` — in the food-allergy lesson — at 86%.
 *
 *  Use it where ONE content word carries the lesson: the refusal, the safety
 *  term, the department you escalate to. Not for words a fluent learner could
 *  reasonably paraphrase. */
export function sp(
  guestPrompt: string,
  targetResponse: string,
  helpTip: string,
  role?: SpeakingItem["speakerRole"],
  must?: string[],
  follows?: string,
): SpeakingItem {
  return {
    guestPrompt,
    targetResponse,
    helpTip,
    ...(role ? { speakerRole: role } : {}),
    ...(must ? { requiredTokens: must } : {}),
    ...(follows ? { follows } : {}),
  };
}
export function read(text: string, questions: ReadingItem["questions"]): ReadingItem {
  return { text, questions };
}
export function game(
  prompt: string,
  correct: string,
  wrongA: string,
  wrongB: string,
  role?: GameRound["speakerRole"],
  explanation?: string,
): GameRound {
  return {
    ...(role ? { speakerRole: role } : {}),
    ...(explanation ? { explanation } : {}),
    prompt,
    options: [
      { text: correct, correct: true, kind: "answer" as const },
      // wrongA is the broken-English option by the contract of this helper,
      // wrongB the one that is correct English and wrong for the job. Tagging
      // them lets the arcade explain the one the learner actually popped.
      { text: wrongA, correct: false, kind: "form" as const },
      { text: wrongB, correct: false, kind: "register" as const },
    ],
  };
}
function lesson(
  lx: P0Lexicon,
  week: number,
  order: number,
  titleEn: string,
  titleVi: string,
  parts: {
    vocabulary: VocabItem[];
    grammar: GrammarItem[];
    speaking: SpeakingItem[];
    reading: ReadingItem;
    game: GameRound[];
  },
): LessonContent {
  return {
    lessonId: `${lx.code}_${week}_${order}`,
    lessonOrder: order,
    titleEn,
    titleVi,
    ...parts,
    // A speaking item may not be passed by dropping the word the lesson is
    // about. Five academic reviews measured the same hole from five modules:
    // strip the content and the grader still passed the answer, because only
    // 73 of 259 frames had bothered to declare requiredTokens by hand. The
    // lesson already knows which words it teaches — so every headword of this
    // lesson that actually appears in a target is required in that target,
    // automatically, in all six departments and every week.
    //
    // Function words inside a multi-word headword ("Here YOU ARE", "OF
    // course") are left to the function-word allowance; locking them here
    // would fail an honest answer for the reason that allowance exists.
    speaking: parts.speaking.map((sp) => {
      // Headword nhiều từ khoá theo CỤM: nếu cả cụm có mặt trong câu mẫu thì
      // mọi từ của nó đều bắt buộc, kể cả hư từ. 'Thank you' mất 'you' là lỗi
      // mà tuần 1 bài 4 tồn tại để sửa; loại 'you' khỏi danh sách để cứu 'Here
      // you are' đã vô tình mở luôn cửa đó.
      // Tokenised by the grader's own normalize() on BOTH sides. They used to
      // differ by one character — this kept the hyphen, the grader splits on
      // it — so a headword like "Wake-up call" locked a token the grader can
      // never see, and the target failed when read back word for word.
      const said = new Set(normalize(sp.targetResponse));
      const heads = parts.vocabulary.flatMap((v) => {
        const parts_ = normalize(v.word);
        if (parts_.length > 1 && parts_.every((w) => said.has(w))) return parts_;
        return parts_.filter((w) => w.length > 2 && !HEADWORD_FUNCTION_WORDS.has(w));
      });
      const add = heads
        .map((w) =>
          said.has(w) ? w : said.has(w + "s") ? w + "s" : said.has(w + "es") ? w + "es" : null,
        )
        .filter((w): w is string => w !== null);
      for (const v of said) if (PROMISE_VERBS.has(v)) add.push(v);
      return add.length
        ? { ...sp, requiredTokens: [...new Set([...(sp.requiredTokens ?? []), ...add])] }
        : sp;
    }),
  };
}

/** Headwords the automatic lock must NOT touch.
 *
 *  Two kinds. Function words inside a multi-word headword ("Here YOU ARE",
 *  "half PAST") belong to the function-word allowance, not to the hard list.
 *  And sir/madam/the day-part are headwords that the grader frees ON PURPOSE
 *  — the guest line usually fixes neither the gender nor the hour, so both
 *  are coin-flips and honorificIsFree()/greetingIsFree() exist to say so.
 *  Locking them here quietly undid that: measured, dropping "madam" went from
 *  97.8% forgiven to 85.5%. */
const HEADWORD_FUNCTION_WORDS = new Set([
  "you",
  "are",
  "here",
  "the",
  "and",
  "else",
  "past",
  "sir",
  "madam",
  "maam",
  "good",
  "morning",
  "afternoon",
  "evening",
]);

// ============================================================
// WEEK 1 — Alphabet, Names & Greetings
// Function: greet by time of day · give and spell a name ·
//           say which department you work in · close politely.
// ============================================================
function week1(lx: P0Lexicon): LessonContent[] {
  const [i1] = lx.items;
  return [
    lesson(lx, 1, 1, "Greeting by Time of Day", "Chào khách theo buổi trong ngày", {
      vocabulary: [
        v(
          "Good morning",
          "/ɡʊd ˈmɔːnɪŋ/",
          "Chào buổi sáng (trước 12h)",
          "Good morning, sir.",
          "🌅",
        ),
        v("Madam", "/ˈmædəm/", "Thưa bà (gọi khách nữ)", "Good afternoon, madam.", "👋"),
        v("Welcome", "/ˈwelkəm/", "Chào mừng, đón chào", `Welcome to ${RESORT}.`, "🙏"),
      ],
      grammar: [
        g(
          "Morning.",
          "Good morning, sir.",
          "Không nói cụt 'Morning'. Với khách luôn nói đủ 'Good morning' và thêm 'sir' (nam) hoặc 'madam' (nữ).",
          "Good morning, mister.",
        ),
        g(
          "Hey, come in.",
          `Welcome to ${RESORT}.`,
          "Không dùng 'Hey' với khách. Câu đón chuẩn là 'Welcome to' + tên khách sạn.",
          "Welcome at Lotus Bay.",
        ),
      ],
      speaking: [
        sp(
          "Good morning!",
          "Good morning, sir. Welcome.",
          "Chào theo buổi: morning (trước 12h), afternoon (12h–18h), evening (sau 18h). 'Welcome' trọng âm âm tiết đầu: WEL-come — âm tiết đầu to và dài hơn hẳn, đừng nhấn đều hai âm.",
        ),
        sp(
          "Good afternoon. I am Mrs Lee.",
          "Good afternoon, Mrs Lee.",
          "Khách vừa nói tên mình ra thì dùng tên, đừng lùi về 'madam' — gọi đúng họ khách là nâng cấp rẻ nhất trong nghề. Chào lại đúng buổi khách vừa chào.",
        ),
      ],
      reading: read(
        `It is 9 AM. A guest is at ${lx.station}. ${lx.staff} says: "Good morning, sir. Welcome to ${RESORT}."`,
        [
          {
            q: `${lx.staff} chào khách vào buổi nào?`,
            options: ["Buổi sáng", "Buổi chiều", "Buổi tối"],
            correct: 0,
            explanation: "9 AM là buổi sáng, nên dùng 'Good morning'.",
          },
          {
            q: "Từ nào dùng để đón khách đến khách sạn?",
            options: ["Welcome", "Goodbye", "Sorry"],
            correct: 0,
            explanation: "'Welcome to' + tên khách sạn là câu đón khách chuẩn.",
          },
        ],
      ),
      game: [
        // Đề cũ chỉ là "Good evening." và chấm "Good evening, sir." là SAI — không có
        // dữ kiện giới tính nào, nên một đáp án đúng bị chấm sai. Ba auditor độc
        // lập cùng bắt, ở đúng vòng game ĐẦU TIÊN của cả khoá.
        game(
          "Good evening. We just arrived.",
          `Good evening. Welcome to ${RESORT}.`,
          "Evening. Come in.",
          "Hello. Welcome.",
          undefined,
          "Đáp án đó không sai ngữ pháp, nhưng thiếu buổi trong ngày và thiếu tên khu nghỉ — khách vừa xuống xe cần nghe mình đã tới đúng nơi.",
        ),
        game(
          "Good evening. I am Mrs Smith.",
          "Good evening, Mrs Smith.",
          "Good evening, madam.",
          "Good evening. Do you want a room?",
          undefined,
          "Khách vừa nói tên mình ra. 'Good evening, madam.' không sai câu nào, nhưng nó bỏ đi thứ khách vừa đưa cho bạn — dùng HỌ khách là nâng cấp rẻ nhất trong nghề, và lùi về 'madam' là quay lại mức phục vụ cho người lạ. Câu thứ ba thì vừa suồng sã vừa bỏ qua khả năng khách đã đặt trước.",
        ),
      ],
    }),

    lesson(lx, 1, 2, "Spelling a Name", "Đánh vần tên khách", {
      // The week is titled "Alphabet" but the old lesson only taught the
      // QUESTION "How do you spell that?" — never the letters themselves.
      // Taking a spelled name down correctly by phone/at the desk is a
      // day-one job skill (and week 17 already assumes it), so this
      // lesson now drills the actual letter-by-letter exchange.
      vocabulary: [
        v("Name", "/neɪm/", "Tên", "May I have your name?", "📛"),
        v("Spell", "/spel/", "Đánh vần", "How do you spell that?", "🔤"),
        // Ô thẻ này đã hai lần đổi chủ. Đầu tiên là `Alphabet` — headword duy
        // nhất của bài không bao giờ được nói ra. Rồi `Letter`, và nó cũng thế:
        // nhân viên nói TÊN các chữ cái, không nói chữ "letter". Tên 26 chữ cái
        // vẫn nằm đủ trong luật của cặp ngữ pháp thứ tư ngay dưới đây, nên
        // không mất gì. Chỗ này nay thuộc về `Sir`, từ mà học viên phải nói từ
        // câu đầu tiên của tuần 1 và trước nay chỉ được dạy ở tuần 6.
        v("Sir", "/sɜː/", "Thưa ông (gọi khách nam)", "Is that E or I, sir?", "🎩"),
      ],
      grammar: [
        g(
          "What your name?",
          "May I have your name?",
          "Tiếng Anh cần động từ. Câu hỏi tên lịch sự là 'May I have your name?' — không nói 'What your name?'.",
          "May I have you name?",
        ),
        g(
          "Spell please.",
          "How do you spell that?",
          "Muốn khách đánh vần, hỏi trọn câu 'How do you spell that?'.",
          "How do you spelling that?",
        ),
        g(
          "E? I? Same same.",
          "Is that E or I, sir?",
          "E /iː/ và I /aɪ/ nghe rất khác nhau nhưng người Việt hay lẫn vì mặt chữ. Không chắc thì hỏi thẳng từng chữ một, đừng đoán rồi ghi sai tên khách.",
          "Is that a E or a I, sir?",
        ),
        g(
          "Say it again.",
          "Could you spell that, please?",
          "Tên có chữ dễ nhầm thì nhờ khách đánh vần. Đủ 26 tên chữ cái: A /eɪ/ B /biː/ C /siː/ D /diː/ E /iː/ F /ef/ G /dʒiː/ H /eɪtʃ/ I /aɪ/ J /dʒeɪ/ K /keɪ/ L /el/ M /em/ N /en/ O /əʊ/ P /piː/ Q /kjuː/ R /ɑː/ S /es/ T /tiː/ U /juː/ V /viː/ W /ˈdʌbljuː/ X /eks/ Y /waɪ/ Z /zed/. Tám chữ người Việt hay lẫn nhất: A · E · I · G · J · R · W · Y.",
          "Could you spelling that, please?",
        ),
      ],
      speaking: [
        sp(
          // "I-V-Y is correct" đặt lễ tân vào vai người phán xét tên của chính
          // khách. Công thức đọc-lại chuẩn là nhắc lại rồi cảm ơn.
          "It is Ryan. R-Y-A-N.",
          "Thank you. R-Y-A-N, madam.",
          "Nhắc lại đúng thứ tự từng chữ, không nhắc lại cả tên. R /ɑː/ và Y /waɪ/ đều nằm trong tám tên chữ cái người Việt hay lẫn — đọc tách rời, đừng nối liền.",
        ),
        sp(
          "My name is Ivy. I-V-Y.",
          "Thank you. I-V-Y, madam.",
          "Nhắc lại từng chữ cái khách vừa đánh vần để xác nhận không nghe nhầm. 'Thank' mở đầu bằng /θ/ — đầu lưỡi chạm nhẹ răng trên, đừng để thành tank hay sank. Đọc tên chữ cái phải tách rời và đủ độ dài: chữ I là /aɪ/ hai âm, không phải /iː/ một âm.",
        ),
      ],
      reading: read(
        `A guest says: "My name is Anna Smith. A-N-N-A, S-M-I-T-H." ${lx.staff} writes each letter and says: "Thank you. A-N-N-A, S-M-I-T-H."`,
        [
          {
            // Đề cũ tự chứa đáp án: "đánh vần" nghĩa là đọc từng chữ cái. Nay
            // buộc học viên phải ĐỌC được các chữ cái trong bài.
            q: "Khách tên gì?",
            options: ["Anna Smith", "Anna Smart", "Hanna Smith"],
            correct: 0,
            explanation:
              "Bài đọc đánh vần A-N-N-A, S-M-I-T-H — không có H đầu, và kết thúc bằng T-H.",
          },
          {
            q: `Vì sao ${lx.staff} nhắc lại từng chữ cái?`,
            options: ["Để xác nhận không nghe nhầm", "Để khách chờ lâu", "Vì không hiểu tên khách"],
            correct: 0,
            explanation: "Nhắc lại từng chữ cái là cách xác nhận chính xác nhất khi ghi tên khách.",
          },
        ],
      ),
      game: [
        game("My name is Ryan.", "How do you spell that?", "Spell please.", "Ryan. OK, thank you."),
        game(
          "It is spelled J-A-N-E.",
          "J-A-N-E. Thank you.",
          "Jane, okay. Thank you madam.",
          "J-A-M-E. Thank you very much, madam.",
          undefined,
          "Câu đó dài và lịch sự hơn, nhưng đánh vần sai một chữ: N thành M. Nhắc lại để xác nhận mà nhắc sai còn tệ hơn không nhắc.",
        ),
      ],
    }),

    lesson(lx, 1, 3, "I Work Here", "Tôi làm ở bộ phận nào", {
      vocabulary: [
        v(
          lx.deptEn,
          lx.deptPhonetic,
          `Bộ phận ${lx.deptVi}`,
          `My name is ${lx.staff}. I am from ${lx.deptEn}.`,
          "🏢",
        ),
        v("Help", "/help/", "Giúp đỡ", "May I help you?", "🤝"),
      ],
      grammar: [
        g(
          `I ${lx.deptEn}.`,
          `My name is ${lx.staff}. I am from ${lx.deptEn}.`,
          "Tiếng Việt bỏ được động từ 'là', tiếng Anh thì không. Luôn có 'am/is/are': I AM from…",
          `My name is ${lx.staff}. I from ${lx.deptEn}.`,
        ),
        g(
          "You are from where?",
          "Where are you from?",
          "Từ để hỏi đứng đầu câu trong tiếng Anh: 'Where are you from?' — không đặt cuối như tiếng Việt.",
          "Where you are from?",
        ),
      ],
      speaking: [
        sp(
          "Excuse me, are you busy?",
          "No, madam. May I help you?",
          "Khách hỏi giúp thì nhận lời trước rồi mới hỏi việc gì — đừng hỏi ngược lại 'what?'. 'help' có /h/ đầu và /p/ cuối, phải bật cả hai.",
        ),
        sp(
          "Excuse me, who are you?",
          `My name is ${lx.staff}. I am from ${lx.deptEn}.`,
          "Nói tên rồi mới nói bộ phận: khách nhớ được người đã giúp mình thì mới khen đúng tên. Cụm /fr/ đầu từ 'from' phải bật cả hai âm — bỏ /r/ thì thành 'phôm'.",
        ),
      ],
      reading: read(
        `${lx.staff} works at ${lx.station}. ${lx.staff} says: "Good afternoon, madam. My name is ${lx.staff}. I am from ${lx.deptEn}. May I help you?"`,
        [
          {
            q: `${lx.staff} làm ở bộ phận nào?`,
            options: [lx.deptVi, "Bếp", "Bảo vệ"],
            correct: 0,
            explanation: `${lx.staff} nói "My name is ${lx.staff}. I am from ${lx.deptEn}" — tức bộ phận ${lx.deptVi}.`,
          },
          {
            q: "Câu nào dùng để mời khách cho mình giúp?",
            options: ["May I help you?", "Where are you from?", "How do you spell that?"],
            correct: 0,
            explanation: "'May I help you?' là câu mời giúp đỡ chuẩn mực trong khách sạn.",
          },
        ],
      ),
      game: [
        game(
          "Could you help me with this bag?",
          "One moment, madam. I will call the bellman.",
          "Bag? OK.",
          "Yes madam, I take your bag now.",
          undefined,
          "Nghe sốt sắng, nhưng hành lý là việc của bellman. Tự cầm hành lý của khách là vượt phận sự và mất dấu trách nhiệm nếu thất lạc.",
        ),
        game(
          "Are you the manager?",
          `No, madam. I am from ${lx.deptEn}.`,
          "I no manager.",
          `Yes, madam. I am the manager of ${lx.deptEn}.`,
          undefined,
          "Nhận mình là quản lý khi không phải là nói dối khách, và khách sẽ đòi những việc bạn không có quyền quyết.",
        ),
      ],
    }),

    lesson(lx, 1, 4, "Goodbye & Thank You", "Cảm ơn & tạm biệt", {
      vocabulary: [
        v("Thank you", "/ˈθæŋk juː/", "Cảm ơn", "Thank you very much.", "🙏"),
        v("Goodbye", "/ˌɡʊdˈbaɪ/", "Tạm biệt", "Goodbye, sir.", "👋"),
      ],
      grammar: [
        g(
          "Thank.",
          "Thank you very much.",
          "Phải có 'you': THANK YOU. Muốn nhấn mạnh thì thêm 'very much'.",
          "Thanks you very much.",
        ),
        g(
          "Bye.",
          "Goodbye, sir. Have a nice day.",
          "'Bye' quá thân mật với khách. Dùng 'Goodbye' kèm 'sir/madam'. Đừng dùng 'Good night' ở đây — nó chỉ dành cho buổi tối lúc khách đi ngủ.",
          "Goodbye, sir. Have nice day.",
        ),
      ],
      speaking: [
        sp(
          "We are leaving now.",
          "Thank you, madam. Goodbye.",
          "Khách báo rời đi thì cảm ơn TRƯỚC rồi mới chào — cảm ơn suông nghe như đang giục, chào suông nghe như đang tiễn.",
          undefined,
          ["goodbye"],
        ),
        sp(
          "Thank you for your help!",
          "You are welcome, madam.",
          "Khi khách cảm ơn, đáp 'You are welcome' — không im lặng hoặc chỉ gật đầu. 'madam' trọng âm âm tiết đầu: MA-dam, không phải ma-DAM.",
          undefined,
          ["welcome"],
        ),
      ],
      reading: read(
        // "The guest leaves the guest room door." — Housekeeping's station is a
        // doorway, and you cannot leave a door. Say goodbye AT the station and
        // the frame reads for all six.
        // Câu hỏi 1 hỏi nhân viên đáp thế nào khi khách CẢM ƠN, nhưng trong bài
        // đọc chính nhân viên mới là người cảm ơn, và "You are welcome" không
        // xuất hiện. Hai auditor nêu. Nay bài đọc chứa đúng cặp thoại đó.
        `The guest says goodbye at ${lx.station}: "Thank you!" ${lx.staff} smiles: "You are welcome, sir. Goodbye. Have a nice day."`,
        [
          {
            q: "Khách cảm ơn thì nhân viên đáp thế nào?",
            options: ["You are welcome.", "Thank.", "Bye bye."],
            correct: 0,
            explanation: "'You are welcome' là câu đáp lễ chuẩn khi khách nói cảm ơn.",
          },
          {
            q: "Câu chúc nào phù hợp khi tiễn khách ban ngày?",
            options: ["Have a nice day.", "Good night.", "Welcome."],
            correct: 0,
            explanation:
              "'Have a nice day' dùng ban ngày; 'Good night' chỉ dùng buổi tối khi khách đi ngủ.",
          },
        ],
      ),
      game: [
        game(
          "You have been very kind.",
          "Thank you very much, madam.",
          "OK.",
          "You are welcome, madam.",
          undefined,
          "'You are welcome' là câu đáp lời CẢM ƠN. Ở đây khách đang KHEN, và lời khen thì đáp bằng lời cảm ơn. Đáp nhầm nghe như bạn không nghe rõ khách vừa nói gì.",
        ),
        game(
          "See you tomorrow.",
          "Goodbye, sir. Have a nice day.",
          "OK bye.",
          "Yes. Tomorrow I am not working here.",
          undefined,
          "Đúng ngữ pháp, nhưng lịch làm việc của nhân viên không phải chuyện của khách. Lượt chào tạm biệt chỉ cần một câu chúc.",
        ),
      ],
    }),
  ].map((l) => l);
}

// ============================================================
// WEEK 2 — Numbers, Rooms & Floors
// Function: say digits · read a room number the hotel way ·
//           name a floor · count items with plural -s.
// ============================================================
function week2(lx: P0Lexicon): LessonContent[] {
  const [i1, i2, i3, i4] = lx.items;
  return [
    lesson(lx, 2, 1, "Numbers Zero to One Hundred", "Số đếm 0 đến 100", {
      // The matrix promises 0-100, but the old lesson stopped at twenty —
      // prices in week 4 already need "twenty-five dollars" and "five
      // hundred thousand dong" with no lesson ever teaching the tens
      // pattern that builds them. This lesson adds it.
      vocabulary: [
        v("Number", "/ˈnʌmbə/", "Con số", "What is your room number?", "🔢"),
        v("Thirteen", "/ˌθɜːˈtiːn/", "Số 13 — trọng âm ở cuối", "Thirteen, sir. One three.", "🔢"),
        v("Room", "/ruːm/", "Phòng", `Room ${lx.roomNo.spoken}, sir.`, "🚪"),
        v("Hundred", "/ˈhʌndrəd/", "Trăm", "One hundred thousand dong.", "💯"),
      ],
      grammar: [
        g(
          `Room ${lx.roomNo.cardinal}.`,
          `Room ${lx.roomNo.spoken}, sir.`,
          `Số phòng đọc từng chữ số, không đọc như số đếm: ${lx.roomNo.digits} = ${lx.roomNo.spoken}, chứ không phải ${lx.roomNo.cardinal}.`,
          `The room ${lx.roomNo.spoken}, sir.`,
        ),
        g(
          "Room number what?",
          "What is your room number?",
          "Câu hỏi cần 'is' và trật tự: What IS your room number?",
          "What is you room number?",
        ),
        g(
          "How many, thirty?",
          "Thirteen or thirty, sir?",
          "13 và 30 nghe gần giống nhau, khác nhau ở trọng âm: thir-TEEN nhấn cuối và kéo dài; THIR-ty nhấn đầu, đuôi ngắn. Nghe không chắc thì hỏi lại cả hai con số, đừng đoán.",
          "Thirteen or thirty, the sir?",
        ),
        g(
          "Room three zero five.",
          "Room three-oh-five, sir.",
          "Chữ số 0 có hai cách đọc: đứng một mình là 'zero', nhưng trong số phòng và số điện thoại thì đọc là 'oh' /əʊ/ — môi tròn lại rồi mới buông.",
          "Room thirty-oh-five, sir.",
        ),
        g(
          "Two ten, right?",
          "It is twenty, sir.",
          "Một tới mười hai: one · two · three · four · five · six · seven · eight · nine · ten · eleven · twelve. Hàng chục: twenty (20) · thirty (30) · forty (40) · fifty · sixty · seventy · eighty · ninety. Ghép hàng chục với số lẻ bằng gạch ngang: 20 + 5 = twenty-five.",
          "It is twenties, sir.",
        ),
      ],
      speaking: [
        sp(
          // "What is my room number?" là câu khách hỏi LỄ TÂN. Nhân viên spa,
          // buồng phòng hay nhà hàng không đọc số phòng khách cho khách nghe.
          // "Which room, please?" đúng cho cả sáu: phòng khách, phòng đang dọn,
          // phòng trị liệu, phòng ăn riêng, phòng họp.
          `I am in room ${lx.roomNo.spoken}.`,
          `Room ${lx.roomNo.spoken}. Thank you, sir.`,
          `Đọc lại số phòng khách vừa nói là cách duy nhất chắc chắn nghe đúng. ${lx.roomNo.digits} đọc từng chữ số: "${lx.roomNo.spoken}". Số 0 trong số phòng đọc thành âm /əʊ/, môi tròn lại rồi mới buông.`,
        ),
        sp(
          // Tuần 2 dạy tổng tiền bằng ĐÔ, rồi tuần 4 dạy rằng nói một con số đô
          // chính xác là hứa một tỷ giá khách sạn không quyết định — và rằng hoá
          // đơn tính bằng tiền đồng. Sáu auditor nêu: học viên luyện thói quen
          // sai hai tuần trước khi được dạy đó là sai. "Forty-five" vẫn là số
          // hàng chục mà tuần 2 cần dạy.
          "How many guests today?",
          "Forty-five guests, sir.",
          "Số hàng chục ghép số lẻ có dấu gạch ngang, không có khoảng trắng: forty-five, không phải 'forty five'. Trọng âm dịch chuyển: đứng một mình thì forty-FIVE, nhưng có danh từ theo sau thì dồn về đầu — FOR-ty-five guests.",
          "manager",
        ),
      ],
      reading: read(
        // Was "Here is your key. The total today is forty-five dollars." — a key
        // handover and a cash transaction, hardcoded into all six departments.
        // Three Hotel Manager auditors called it a control failure: a room
        // attendant, a server and a spa therapist hand over no keys and take no
        // money. The item and the price now come from the department.
        `${lx.staff} says: "Good morning, sir." The guest says: "I am in room ${lx.roomNo.spoken}." ${lx.staff} writes the number and reads it back: "Room ${lx.roomNo.spoken}. Thank you, sir." Then ${lx.staff} says: "Here is your ${i1.word.toLowerCase()}."`,
        [
          {
            q: `Số phòng ${lx.roomNo.digits} đọc thế nào?`,
            options: [lx.roomNo.spoken, `${lx.roomNo.digits} hundred`, "room number"],
            correct: 0,
            explanation: `Trong khách sạn, số phòng đọc từng chữ số: ${lx.roomNo.spoken}.`,
          },
          {
            q: "Nhân viên làm gì sau khi nghe số phòng?",
            options: ["Ghi lại rồi đọc lại cho khách nghe", "Đi lấy đồ ngay", "Hỏi lại tên khách"],
            correct: 0,
            explanation: `Bài đọc: ${lx.staff} "writes the number and reads it back" — ghi rồi đọc lại là cách duy nhất chắc chắn nghe đúng.`,
          },
        ],
      ),
      game: [
        game(
          "Is my room three-oh-five?",
          "Yes, room three-oh-five, sir.",
          "Room number what you say, sir?",
          "Yes, room three hundred and five, sir.",
          undefined,
          "Số phòng đọc từng chữ số: three-oh-five. Đọc thành 'three hundred and five' là cách đọc số lượng, khách rất dễ nghe nhầm sang phòng khác.",
        ),
        game(
          // Đề hỏi bằng tiền đồng, đáp án trả lời bằng đô, không có cầu nối quy
          // đổi nào — học viên không thể suy ra. Giữ nguyên một đơn vị.
          "Is that forty guests?",
          "No, sir. Forty-five guests.",
          "Forty guest yes.",
          "Yes, sir. It is forty guests today.",
          undefined,
          "Từ đầu tiên của câu trả lời có/không phải đúng. Bốn mươi lăm khách chứ không phải bốn mươi, nên phải mở đầu bằng 'No'.",
        ),
      ],
    }),

    lesson(lx, 2, 2, "Floors & the Lift", "Tầng lầu & thang máy", {
      vocabulary: [
        v("Floor", "/flɔː/", "Tầng", `The ${lx.floor.ordinal} floor, madam.`, "🛗"),
        v("Lift", "/lɪft/", "Thang máy (Anh–Anh; Mỹ: elevator)", "The lift is over there.", "🛗"),
      ],
      grammar: [
        g(
          `Go floor ${lx.floor.ordinal}.`,
          `Go to the ${lx.floor.ordinal} floor, madam.`,
          `Kèm 'madam/sir' ở cuối — chỉ đường không tag nghe như ra lệnh, và tuần 5 sẽ gọi đúng kiểu đó là thô. Cần 'to the' trước tên tầng: go TO THE ${lx.floor.ordinal} floor. Tầng gọi bằng số thứ tự: first · second · third · fourth · fifth · sixth · seventh · eighth · ninth · tenth.`,
          `Go to ${lx.floor.ordinal} floor, madam.`,
        ),
        g(
          `Room ${lx.floor.ordinal} floor.`,
          `On the ${lx.floor.ordinal} floor, madam.`,
          `Trả lời tầng cần 'on the' trước số thứ tự. Khách hỏi "Which floor is my room on?" — câu đó bạn chỉ cần nghe hiểu, còn câu phải nói ra là câu trả lời.`,
          `On the ${lx.floor.cardinal} floor, madam.`,
        ),
      ],
      speaking: [
        sp(
          "Is there a lift?",
          "Yes, madam. It is over there.",
          "Chỉ hướng bằng lời rồi mới bằng tay, và bàn tay mở chứ không chỉ ngón. 'there' mở đầu bằng /ð/ có rung — lưỡi chạm răng.",
        ),
        sp(
          "Which floor, please?",
          `The ${lx.floor.ordinal} floor, madam.`,
          "Trả lời ngắn gọn: 'The + số thứ tự + floor'. Không cần cả câu dài. 'The' mở đầu bằng /ð/ — lưỡi chạm răng VÀ có rung, đừng thành 'đờ' hay 'zờ'.",
        ),
      ],
      reading: read(
        `The guest says: "I am in room ${lx.roomNo.spoken}. Which floor is that?" ${lx.staff} points to the lift and says: "The ${lx.floor.ordinal} floor, madam." The guest says: "Thank you."`,
        [
          {
            q: "Phòng khách ở tầng mấy?",
            // Đáp án đúng là phương án DUY NHẤT viết thường, và mẹo chính tả ấy
            // sống sót qua Fisher–Yates. 24 câu hỏi ở Phase 0 dính lỗi này.
            options: [capFirst(lx.floor.vi), "Tầng trệt", "Tầng mười"],
            correct: 0,
            explanation: `${lx.staff} nói "The ${lx.floor.ordinal} floor" — tức ${lx.floor.vi}.`,
          },
          {
            q: `${lx.staff} chỉ tay về phía nào?`,
            options: ["Thang máy", "Cầu thang bộ", "Cửa ra vào"],
            correct: 0,
            explanation: `Bài đọc: ${lx.staff} points to the lift — 'lift' (Anh–Anh) = 'elevator' (Anh–Mỹ) = thang máy.`,
          },
        ],
      ),
      game: [
        game(
          `Is my room on the ${lx.floor.ordinal} floor?`,
          `Yes, madam. The ${lx.floor.ordinal} floor.`,
          "Yes, floor yes madam.",
          `No madam, go to the ${lx.floor.ordinal} floor.`,
          undefined,
          `Câu kia mở đầu bằng 'No' rồi lại chỉ đúng tầng khách vừa hỏi — khách nghe chữ đầu tiên là 'No' và sẽ đi tìm tầng khác. Trả lời câu hỏi có/không thì chữ đầu tiên phải đúng.`,
        ),
        game(
          "Where is the lift?",
          "The lift is over there, sir.",
          "Lift there.",
          "I do not know, sir.",
          undefined,
          "Đây là câu không được phép nói về chính nơi mình làm việc. Không biết thì dẫn khách tới người biết, không dừng ở 'tôi không biết'.",
        ),
      ],
    }),

    lesson(lx, 2, 3, "Counting Items", "Đếm đồ vật", {
      vocabulary: [
        v(i1.word, i1.phonetic, i1.definition, `Two ${i1.word.toLowerCase()}s, please.`, i1.icon),
        v(i2.word, i2.phonetic, i2.definition, `Here is your ${i2.word.toLowerCase()}.`, i2.icon),
      ],
      grammar: [
        g(
          `Two ${i1.word.toLowerCase()}.`,
          `Two ${i1.word.toLowerCase()}s, please.`,
          `Từ hai trở lên phải thêm -s: one ${i1.word.toLowerCase()} → two ${i1.word.toLowerCase()}s. Tiếng Việt không đổi từ, tiếng Anh thì có.`,
          `Two of ${i1.word.toLowerCase()}s, please.`,
        ),
        g(
          // Dùng i2 chứ không phải i1: game của bài này đã chuyển sang i1 (đề cũ
          // hỏi "Can I have one more passport?"), nên i2 mất chỗ dùng và thành
          // headword dạy xong bỏ đấy ở cả sáu bộ phận.
          `I bring you ${i1.word.toLowerCase()}.`,
          `I will bring your ${i1.word.toLowerCase()}.`,
          "Việc sắp làm dùng 'will': I WILL bring. Và nhớ tính từ sở hữu 'your' trước danh từ — a, an, the mới là mạo từ.",
          `I will bring you ${i1.word.toLowerCase()}.`,
        ),
      ],
      speaking: [
        sp(
          "I need one, not two.",
          `One ${i1.word.toLowerCase()}, madam. One moment.`,
          "Nhắc lại số lượng rồi mới đi lấy — im lặng quay đi làm khách tưởng bạn chưa nghe. Một và hai khác nhau ở đuôi -s: nghe kỹ đuôi.",
        ),
        sp(
          `Two ${i1.word.toLowerCase()}s, please.`,
          `Yes, two ${i1.word.toLowerCase()}s. One moment.`,
          "Nhắc lại số lượng khách yêu cầu để xác nhận — tránh mang sai. Đuôi số nhiều ở đây đọc /z/ CÓ RUNG, không phải /s/ — sau nguyên âm hay phụ âm hữu thanh thì luôn là /z/ (sau âm xuýt thì thành /ɪz/). Người Việt hay nuốt hẳn âm cuối này.",
        ),
        sp(
          `Could I have my ${i2.word.toLowerCase()}?`,
          `Here is your ${i2.word.toLowerCase()}, madam.`,
          "Đồ cầm được thì trao bằng hai tay và đợi khách cầm chắc; thứ không trao tay được — cái bàn, cái tủ — thì mở bàn tay chỉ về phía nó. Câu nói giữ nguyên, chỉ đổi động từ theo số lượng: một cái dạng số ít, từ hai trở lên đổi sang số nhiều.",
          undefined,
          [i2.word.toLowerCase()],
        ),
      ],
      reading: read(
        `A guest from room ${lx.roomNo.spoken} wants two ${i1.word.toLowerCase()}s. ${lx.staff} says: "Good afternoon, madam. Two ${i1.word.toLowerCase()}s. One moment, please." ${lx.staff} comes back and says: "Here are your ${i1.word.toLowerCase()}s, madam."`,
        [
          {
            q: "Khách muốn mấy cái?",
            options: ["Hai", "Một", "Ba"],
            correct: 0,
            explanation: `Khách nói "two ${i1.word.toLowerCase()}s" — số nhiều có -s ở cuối.`,
          },
          {
            q: `Vì sao ${lx.staff} nhắc lại "Two ${i1.word.toLowerCase()}s"?`,
            options: ["Để xác nhận đúng số lượng", "Vì không hiểu", "Để khách chờ lâu"],
            correct: 0,
            explanation: "Nhắc lại yêu cầu là kỹ năng xác nhận cơ bản, giúp không mang nhầm.",
          },
        ],
      ),
      game: [
        game(
          "I need two, not three.",
          "Two, madam. One moment.",
          "Three, madam.",
          "Yes, madam. Three.",
          undefined,
          "Khách vừa sửa lại số lượng. Nhắc lại con số MỚI rồi mới đi lấy — hai đáp án kia đều lặp lại con số khách vừa bác bỏ.",
        ),
        game(
          // Chạy trên i2 nên Lễ tân hỏi "Can I have one more passport?" và đáp
          // "Of course" — khách sạn không cấp hộ chiếu. i1 đúng cho cả sáu:
          // key / menu / towel / robe / lounge card / invoice.
          //
          // Và nhiễu cũ là câu TRUNG THỰC khi hết hàng, bị chấm sai. Nhiễu
          // phải sai vì HÌNH THỨC, không phải vì một sự thật không hiển thị.
          `Can I have one more ${i1.word.toLowerCase()}?`,
          "One moment. I will check, madam.",
          `Yes, one ${i1.word.toLowerCase()}s.`,
          `One ${i1.word.toLowerCase()} coming, madam, you wait.`,
          undefined,
          "Cả hai đáp án kia hứa trước khi kiểm tra còn hàng hay không. Xin thêm đồ thì luôn xem đã, rồi mới trả lời.",
        ),
      ],
    }),

    lesson(lx, 2, 4, "How Many?", "Hỏi số lượng", {
      vocabulary: [
        v(i3.word, i3.phonetic, i3.definition, `Three ${i3.word.toLowerCase()}s, sir.`, i3.icon),
        v(i4.word, i4.phonetic, i4.definition, `Here is the ${i4.word.toLowerCase()}.`, i4.icon),
      ],
      grammar: [
        g(
          `How much ${i3.word.toLowerCase()}s?`,
          `How many ${i3.word.toLowerCase()}s, sir?`,
          "Đếm được thì dùng 'How many' (how many towels); không đếm được mới dùng 'How much' (how much water).",
          `How many ${i3.word.toLowerCase()}, sir?`,
        ),
        g(
          "Give me three.",
          `Three ${i3.word.toLowerCase()}s, please.`,
          "'Give me' nghe ra lệnh. Nói số lượng + tên đồ + 'please'.",
          `Three ${i3.word.toLowerCase()}, please.`,
        ),
      ],
      speaking: [
        sp(
          `I need thirteen ${i3.word.toLowerCase()}s.`,
          `Thirteen ${i3.word.toLowerCase()}s. One three, madam.`,
          "Nhắc lại số rồi đọc lại từng chữ số: one three. Đó là cách duy nhất chắc chắn khách nghe đúng. thir-TEEN nhấn ở cuối.",
        ),
        sp(
          `I need three ${i3.word.toLowerCase()}s.`,
          `Three ${i3.word.toLowerCase()}s. Yes, madam.`,
          "Xác nhận lại rồi mới đi lấy. Đừng chỉ gật đầu. 'Three' có /θ/ rồi mới tới /r/ — đọc chậm cả hai âm, đừng để thành tri hay free.",
        ),
      ],
      reading: read(
        `${lx.staff} asks: "How many ${i3.word.toLowerCase()}s, sir?" The guest says: "Three, please." ${lx.staff} says: "Three ${i3.word.toLowerCase()}s. One moment."`,
        [
          {
            q: "Nhân viên nhắc lại yêu cầu vào lúc nào?",
            options: [
              "Ngay sau khi khách trả lời",
              "Sau khi đã mang đồ tới",
              "Không nhắc lại lần nào",
            ],
            correct: 0,
            explanation: `Bài đọc: khách nói "Three, please." rồi ${lx.staff} nhắc lại ngay "Three ${i3.word.toLowerCase()}s." — nhắc lại trước khi đi lấy, không phải lúc quay về.`,
          },
          {
            q: "Khách cần mấy cái?",
            options: ["Ba", "Hai", "Bốn"],
            correct: 0,
            explanation: "Khách trả lời 'Three, please.'",
          },
        ],
      ),
      game: [
        game(
          `There are four of us.`,
          `Four people. Thank you, sir.`,
          `How much people?`,
          `Four person, thank you sir.`,
          undefined,
          "'Person' có số nhiều bất quy tắc là 'people' — không thêm -s, cũng không giữ nguyên số ít.",
        ),
        game(
          `Where is my ${i4.word.toLowerCase()}?`,
          `Your ${i4.word.toLowerCase()} is here, sir.`,
          `Here, sir. You take.`,
          `I do not know, sir. Sorry.`,
          undefined,
          "Xin lỗi rồi bỏ đó thì đồ của khách vẫn mất. Không thấy thì đi tìm hoặc hỏi người đang giữ.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 3 — Times, Dates & Opening Hours
// Function: tell the clock time · name days · state when a
//           service opens and closes · ask "What time…?".
// ============================================================
function week3(lx: P0Lexicon): LessonContent[] {
  return [
    lesson(lx, 3, 1, "Telling the Time", "Nói giờ", {
      vocabulary: [
        v("Time", "/taɪm/", "Thời gian, giờ", "What time is it?", "⏰"),
        v("O'clock", "/əˈklɒk/", "Giờ chẵn, ví dụ 7:00", "It is seven o'clock.", "🕖"),
        v("Half past", "/hɑːf pɑːst/", "Rưỡi, ví dụ 7:30", "It is half past seven.", "🕢"),
      ],
      grammar: [
        g(
          "Now seven.",
          "It is seven o'clock.",
          "Câu tiếng Anh cần chủ ngữ 'It' và động từ 'is': IT IS seven o'clock.",
          "It is seven of clock.",
        ),
        g(
          "What time now?",
          "What time is it?",
          "Câu hỏi giờ chuẩn là 'What time is it?' — có động từ 'is'.",
          "What time it is?",
        ),
      ],
      speaking: [
        sp(
          "Sorry, is it half past six?",
          "No, madam. Half past seven.",
          "Sửa lại giờ thì nói cả cụm, đừng chỉ nói mỗi con số — khách còn phải ghép lại. Nói 'No' trước rồi mới nói giờ đúng.",
        ),
        sp(
          "Excuse me, what time is it?",
          "It is seven o'clock, sir.",
          "Giờ đúng thì thêm o'clock. Giờ rưỡi thì nói half past — 7:30 là half past seven. Trọng âm rơi vào CLOCK, và âm /k/ cuối phải bật ra.",
        ),
      ],
      reading: read(
        `${lx.staff} says: "Good morning, madam." The guest asks the time. ${lx.staff} looks at the clock and says: "It is half past seven, madam." The guest says: "Thank you."`,
        [
          {
            q: "Bây giờ là mấy giờ?",
            options: ["7 giờ 30", "7 giờ đúng", "8 giờ 30"],
            correct: 0,
            explanation: "'Half past seven' nghĩa là 7 giờ rưỡi (7:30).",
          },
          {
            q: "Nhân viên nhìn vào đâu trước khi trả lời?",
            options: ["Đồng hồ", "Điện thoại của khách", "Sổ ghi chép"],
            correct: 0,
            explanation: `Bài đọc: ${lx.staff} "looks at the clock" — nhìn đồng hồ rồi mới nói giờ, đừng đoán.`,
          },
        ],
      ),
      game: [
        game(
          "Excuse me, do you have the time?",
          "It is half past seven, madam.",
          "Half seven.",
          "Yes madam, I have a watch here.",
          undefined,
          "'Do you have the time?' là hỏi MẤY GIỜ, không hỏi bạn có đồng hồ không. Trả lời 'Yes' là hiểu sai câu hỏi.",
        ),
        game(
          "Is it eight o'clock now?",
          "No, sir. It is half past seven.",
          "Time eight.",
          "Yes, it is eight, sir.",
          undefined,
          "Bảy giờ rưỡi thì chưa tới tám giờ. Gật cho nhanh là báo sai giờ, và khách có thể lỡ hẹn vì câu đó.",
        ),
      ],
    }),

    lesson(lx, 3, 2, "Days of the Week", "Các ngày trong tuần", {
      vocabulary: [
        v("Today", "/təˈdeɪ/", "Hôm nay", "Today is Monday.", "📅"),
        v(
          "Monday",
          "/ˈmʌndeɪ/",
          "Thứ Hai (thứ luôn viết hoa)",
          "Monday, Tuesday, Wednesday.",
          "🗓️",
        ),
        v("Tomorrow", "/təˈmɒrəʊ/", "Ngày mai", `Your ${lx.booking.en} is tomorrow.`, "📆"),
      ],
      grammar: [
        g(
          "Today Monday.",
          "Today is Monday.",
          "Lại là động từ 'is'. Tiếng Việt nói 'Hôm nay thứ Hai', tiếng Anh phải có IS. Bảy ngày trong tuần, luôn viết hoa chữ đầu: Monday · Tuesday · Wednesday · Thursday · Friday · Saturday · Sunday.",
          "Today are Monday.",
        ),
        g(
          // "Tomorrow I start at two." là tiếng Anh ĐÚNG (hiện tại đơn cho lịch
          // cố định) và bị gạch làm lỗi — hai auditor nêu, và chính khoá học
          // dùng đúng cấu trúc đó hai bài sau. Vế rude phải là lỗi L1 thật.
          "Tomorrow I checking, sir.",
          "I will check tomorrow, sir.",
          "Việc tương lai dùng 'will' + động từ nguyên mẫu: I WILL check. Trạng ngữ thời gian đứng cuối câu — 'I will check tomorrow', không phải 'Tomorrow I will check'.",
          "I will checking tomorrow, sir.",
        ),
      ],
      speaking: [
        sp(
          // "City tour" là việc của Quan hệ khách hàng. Nhân viên spa, buồng
          // phòng và nhà hàng được dạy xác nhận lịch tour từ trí nhớ, không có
          // quyền tra hệ thống. Bốn auditor nêu. Dùng chính dịch vụ có giá của
          // bộ phận thay thế.
          "Is today Tuesday?",
          "No, madam. Today is Monday.",
          "Sửa lại ngày phải nói đủ 'Today is Monday', không nói cụt mỗi tên thứ. Thứ trong tuần luôn viết hoa và luôn có 'is' đứng trước.",
        ),
        sp(
          `When is my ${lx.booking.en}?`,
          `It is tomorrow, madam.`,
          "Nói rõ ngày để khách không nhầm lịch, đừng chỉ gật đầu. 'tomorrow' trọng âm ở giữa: to-MOR-row, ba âm tiết.",
        ),
      ],
      reading: read(
        `Today is Monday. A guest from room ${lx.roomNo.spoken} asks about the ${lx.booking.en}. ${lx.staff} checks and says: "It is tomorrow, madam. Tuesday." The guest says: "Thank you." ${lx.staff} says: "Goodbye, madam."`,
        [
          {
            // Bài đọc đã đổi sang dịch vụ của bộ phận, câu hỏi và game thì tôi
            // bỏ quên — nên bài đọc nói về giặt là còn câu hỏi vẫn hỏi "chuyến
            // tham quan". Năm auditor nêu. Sửa một khung là sửa ĐỦ BỘ.
            q: `${capFirst(lx.booking.vi)} diễn ra ngày nào?`,
            options: ["Thứ Ba", "Thứ Hai", "Chủ nhật"],
            correct: 0,
            explanation: `Hôm nay là thứ Hai, ${lx.booking.vi} là 'tomorrow' — tức thứ Ba.`,
          },
          {
            q: "Khách ở phòng nào?",
            options: [lx.roomNo.spoken, lx.roomNo.cardinal, "room number"],
            correct: 0,
            explanation: `Bài đọc mở đầu: "A guest from room ${lx.roomNo.spoken}" — số phòng đọc từng chữ số.`,
          },
        ],
      ),
      game: [
        game(
          "What day is it today?",
          "It is Monday, sir.",
          "Monday, sir. Today Monday.",
          "Today Monday, sir. Tomorrow Tuesday.",
          undefined,
          "Thừa thông tin khách không hỏi, và cả hai vế đều thiếu 'is'.",
        ),
        game(
          `Is my ${lx.booking.en} today?`,
          "No, madam. It is tomorrow.",
          "Monday no, madam.",
          "Yes, madam. It is today at two.",
          undefined,
          "Nghe trôi chảy nhưng sai ngày — khách sẽ tới nhầm hôm. Lịch ghi là ngày mai.",
        ),
      ],
    }),

    lesson(lx, 3, 3, "Opening & Closing Hours", "Giờ mở cửa & đóng cửa", {
      vocabulary: [
        v("Open", "/ˈəʊpən/", "Mở cửa", `We open at ${lx.service.open}.`, "🔓"),
        v("Close", "/kləʊz/", "Đóng cửa", `We close at ${lx.service.close}.`, "🔒"),
      ],
      grammar: [
        g(
          `Open ${lx.service.open}.`,
          `We open at ${lx.service.open}.`,
          `Cần chủ ngữ 'We' và giới từ 'at' trước giờ: we open AT ${lx.service.open}.`,
          `We open in ${lx.service.open}.`,
        ),
        g(
          `${capFirst(lx.service.en)} close ${lx.service.close}.`,
          `We close at ${lx.service.close}, sir.`,
          "Chủ ngữ 'we' thì động từ giữ nguyên dạng: we close. Chỉ he, she, it mới thêm -s: it closes. Và luôn có 'at' trước giờ.",
          `We close ${lx.service.close}, sir.`,
        ),
      ],
      speaking: [
        sp(
          "What time do you open?",
          `We open at ${lx.service.open}, madam.`,
          "Công thức: 'We open at + giờ'. Đóng cửa thì 'We close at + giờ'. 'open' trọng âm âm tiết đầu: O-pen.",
          undefined,
          ["open", "at"],
        ),
        sp(
          "And what time do you close?",
          `We close at ${lx.service.close}, madam.`,
          "Cùng công thức, chỉ đổi động từ. Chú ý 'close' ở đây là ĐỘNG TỪ, đọc /kləʊz/ rung ở cuối — khác hẳn tính từ 'close' /kləʊs/ nghĩa là gần. Người Việt hay đọc cả hai thành /s/.",
          undefined,
          ["close", "at"],
        ),
      ],
      reading: read(
        `A guest at the lift asks about ${lx.service.en}. ${lx.staff} says: "Good morning, sir. We open at ${lx.service.open} and close at ${lx.service.close}." The guest says: "Thank you."`,
        [
          {
            // Was `${lx.service.vi} mở lúc mấy giờ?` — service.vi already began
            // with "giờ" for four departments, so it read "giờ mở cửa spa mở lúc
            // mấy giờ?". And "Cả ngày" was the only Vietnamese option among two
            // English ones, which makes it eliminable without reading.
            q: `${capFirst(lx.service.vi)} phục vụ từ mấy giờ?`,
            options: [`${lx.service.open}`, `${lx.service.close}`, "all day"],
            correct: 0,
            explanation: `${lx.staff} nói "We open at ${lx.service.open}".`,
          },
          {
            q: "Giới từ nào đứng trước giờ?",
            options: ["at", "in", "on"],
            correct: 0,
            explanation: "Trước giờ cụ thể luôn dùng 'at': at six, at nine o'clock.",
          },
        ],
      ),
      game: [
        game(
          "Are you open on Monday?",
          "Yes, madam. Every day.",
          "Monday open, madam, yes yes.",
          "Yes madam, we are open all week long.",
          undefined,
          "Khách hỏi đúng MỘT ngày. 'Every day' trả lời thẳng câu đó và còn cho khách biết thêm; câu kia dài hơn mà không thêm được thông tin nào.",
        ),
        game(
          `Are you open now?`,
          `Yes, sir. We close at ${lx.service.close}.`,
          // "We are open all night" là câu ĐÚNG với quầy lễ tân 24/24, nên nó
          // không dùng làm nhiễu được. Nhiễu mới sai vì thì, không vì sự thật.
          `Open ${lx.service.open} yes.`,
          `Yes, we opening now, sir.`,
          undefined,
          "'We opening' thiếu 'are'. Câu đúng còn cho khách biết mấy giờ đóng, tức là còn bao nhiêu thời gian.",
        ),
      ],
    }),

    lesson(
      lx,
      3,
      4,
      lx.service.isEvent
        ? `What Time Is ${titleCase(lx.service.en)}?`
        : `What Time Does ${titleCase(lx.service.en)} Open?`,
      "Hỏi giờ dịch vụ",
      {
        vocabulary: [
          v("Start", "/stɑːt/", "Bắt đầu", `We start at ${lx.service.open}.`, "▶️"),
          v("Finish", "/ˈfɪnɪʃ/", "Kết thúc", `We finish at ${lx.service.close}.`, "⏹️"),
        ],
        grammar: [
          lx.service.isEvent
            ? g(
                `What time ${lx.service.en}?`,
                `What time is ${lx.service.en}?`,
                `Câu hỏi cần 'is': What time IS ${lx.service.en}?`,
              )
            : g(
                `What time ${lx.service.en} open?`,
                `What time does ${lx.service.en} open?`,
                `Với động từ thường, câu hỏi cần 'does': What time DOES ${lx.service.en} open?`,
              ),
          g(
            `${capFirst(lx.service.en)} finish ${lx.service.close}.`,
            `It finishes at ${lx.service.close}.`,
            "Chủ ngữ 'It' + động từ thêm -s (finishes) + 'at' trước giờ.",
            `It finishes in ${lx.service.close}.`,
          ),
        ],
        speaking: [
          sp(
            "Sorry, could you say the time again?",
            `It starts at ${lx.service.open}, madam.`,
            "Khách hỏi lại thì nói chậm hơn, đừng nói to hơn. Nhắc lại nguyên cụm giờ chứ không nhắc mỗi con số.",
          ),
          sp(
            lx.service.isEvent
              ? `What time is ${lx.service.en}?`
              : `What time does ${lx.service.en} open?`,
            lx.service.isEvent
              ? `It starts at ${lx.service.open} o'clock.`
              : `We start at ${lx.service.open} o'clock.`,
            lx.service.isEvent
              ? "Trả lời cả giờ bắt đầu; nếu khách cần, nói thêm giờ kết thúc. 'starts' kết thúc bằng cụm /ts/ — phải nghe được cả hai âm, đừng dừng ở 'star'."
              : "Trả lời cả giờ bắt đầu; nếu khách cần, nói thêm giờ kết thúc. 'start' đóng bằng /t/ — phải bật ra, đừng dừng lại ở 'sta'.",
          ),
        ],
        reading: read(
          lx.service.isEvent
            ? `A guest from room ${lx.roomNo.spoken} asks: "What time is ${lx.service.en}?" ${lx.staff} answers: "It starts at ${lx.service.open} and finishes at ${lx.service.close}, madam." The guest says: "Thank you." ${lx.staff} says: "You are welcome."`
            : `A guest from room ${lx.roomNo.spoken} asks: "What time does ${lx.service.en} open?" ${lx.staff} answers: "It opens at ${lx.service.open} and closes at ${lx.service.close}, madam." The guest says: "Thank you." ${lx.staff} says: "You are welcome."`,
          [
            {
              q: "Nhân viên đáp lại lời cảm ơn bằng câu gì?",
              options: ["You are welcome.", "Thank you.", "Goodbye."],
              correct: 0,
              explanation:
                "Bài đọc kết bằng đúng cặp đó: khách cảm ơn, nhân viên đáp 'You are welcome.' — im lặng hoặc chỉ gật đầu là bỏ mất nửa sau của phép lịch sự.",
            },
            {
              q: `Dịch vụ kết thúc lúc mấy giờ?`,
              options: [`${lx.service.close}`, `${lx.service.open}`, "midnight"],
              correct: 0,
              explanation: lx.service.isEvent
                ? `Nhân viên nói "finishes at ${lx.service.close}".`
                : `Nhân viên nói "closes at ${lx.service.close}".`,
            },
          ],
        ),
        game: [
          game(
            `Does it finish at ${lx.service.open}?`,
            `No, sir. It finishes at ${lx.service.close}.`,
            `Finish ${lx.service.close}.`,
            `Yes sir, at ${lx.service.open}.`,
            undefined,
            "Khách đang nhầm giờ mở với giờ đóng. Gật theo là xác nhận cái sai.",
          ),
          game(
            `Am I too late?`,
            `No, madam. We finish at ${lx.service.close}.`,
            `Finish ${lx.service.close}.`,
            `Yes, madam. We are finish now.`,
            undefined,
            "Vừa sai sự thật vừa sai động từ: không có dạng 'are finish'. Và câu đó đuổi khách về khi vẫn còn giờ phục vụ.",
          ),
        ],
      },
    ),
  ];
}

// ============================================================
// WEEK 4 — Prices, Money & Quantities
// Function: say a price · ask/answer "How much?" · handle
//           dollars and dong · confirm a total.
// ============================================================
function week4(lx: P0Lexicon): LessonContent[] {
  return [
    lesson(lx, 4, 1, "Prices in Dong", "Giá bằng tiền đồng", {
      vocabulary: [
        v("Price", "/praɪs/", "Giá", `The price is ${lx.priced.vndWord}.`, "💲"),
        v(
          "Dong",
          "/dɒŋ/",
          "Đồng (tiền Việt Nam)",
          `${capFirst(lx.priced.vndWord)} dong, sir.`,
          "🇻🇳",
        ),
        v("Free", "/friː/", "Miễn phí", "The wifi is free, sir.", "🆓"),
      ],
      grammar: [
        g(
          `${capFirst(lx.priced.vndWord)} dongs.`,
          `${capFirst(lx.priced.vndWord)} dong, sir.`,
          "'Dong' KHÔNG bao giờ thêm -s, dù số tiền lớn đến đâu. Đây là ngoại lệ với thói quen thêm -s cho số nhiều.",
          `${capFirst(lx.priced.vndWord)} of dong, sir.`,
        ),
        g(
          "Price what?",
          "How much is it?",
          "Hỏi giá chuẩn là 'How much is it?' — không hỏi 'Price what?'.",
          "How much it is?",
        ),
      ],
      speaking: [
        sp(
          "Is the price in dong?",
          "Yes, madam. All prices are in dong.",
          "Nói rõ đơn vị ngay để khách khỏi nhẩm sang đô. Số tiền đọc thành cụm liền, không ngắt từng chữ số.",
        ),
        sp(
          "How much is it?",
          `${capFirst(lx.priced.vndWord)} dong, sir.`,
          "Đọc số tiền thành cụm liền, đừng ngắt từng chữ — ngắt từng chữ khách phải cộng nhẩm lại.",
        ),
      ],
      reading: read(
        `${lx.staff} says: "Good morning, sir." The guest asks about the ${lx.priced.en}. ${lx.staff} says: "${capFirst(lx.priced.vndWord)} dong, sir." The guest says: "That is fine. Thank you."`,
        [
          {
            q: `${capFirst(lx.priced.vi)} giá bao nhiêu?`,
            options: [`${lx.priced.vnd.toLocaleString("vi-VN")} đồng`, "Miễn phí", "Chưa nói giá"],
            correct: 0,
            explanation: `Nhân viên nói "${lx.priced.vndWord} dong".`,
          },
          {
            q: "Khách phản ứng thế nào khi nghe giá?",
            options: ["Đồng ý luôn", "Chê đắt", "Hỏi xin giảm giá"],
            correct: 0,
            explanation:
              'Bài đọc: khách nói "That is fine. Thank you." — báo giá rõ ràng ngay từ đầu thì hiếm khi phải mặc cả.',
          },
        ],
      ),
      game: [
        game(
          "Is there a price list?",
          "Yes, sir. One moment.",
          "Price list no have, sir.",
          "Yes sir, price list I bring you.",
          undefined,
          "Câu thứ ba đảo tân ngữ lên trước theo trật tự tiếng Việt và thiếu mạo từ — tiếng Anh là chủ ngữ–động từ–tân ngữ: 'I will bring you the price list.' Đây đúng là lỗi mà tuần 2 bài 3 dạy bạn bỏ.",
        ),
        game(
          "Is the wifi free?",
          "Yes, madam. It is free.",
          "Free wifi yes madam you take.",
          "Yes, madam, the wifi is a free.",
          undefined,
          "'Free' là tính từ, không đi kèm mạo từ 'a'.",
        ),
      ],
    }),

    lesson(lx, 4, 2, "Cash or Card?", "Tiền mặt hay thẻ", {
      vocabulary: [
        v("Cash", "/kæʃ/", "Tiền mặt", "Cash or card, sir?", "💵"),
        v("Card", "/kɑːd/", "Thẻ ngân hàng", "You can pay by card.", "💳"),
      ],
      grammar: [
        g(
          "You pay money how?",
          "Cash or card, sir?",
          "Câu hỏi ngắn, lịch sự: 'Cash or card?' — dễ hiểu hơn câu dịch từng chữ từ tiếng Việt.",
          "Cash or the card, sir?",
        ),
        g(
          "I no take card.",
          "We take cards, madam.",
          "Phủ định/khẳng định cần đúng động từ: WE TAKE cards. Không nói 'I no take'.",
          "We take card, madam.",
        ),
      ],
      speaking: [
        sp(
          "Do you take cash?",
          "Yes, madam. Cash is fine.",
          "Nhận cả hai hình thức thì nói rõ tên từng cái. Nói gộp thành một chữ thì khách vẫn phải đoán chữ đó gồm những gì.",
        ),
        sp(
          "Can I pay by card?",
          "Yes, card is fine, sir.",
          "Đáp ngắn và rõ. Câu hỏi chọn một trong hai lên giọng ở vế đầu rồi xuống ở vế sau: Cash ↗ or card ↘? — đọc bằng một giọng đều thì khách nghe ra câu kể chứ không ra câu hỏi. Từ 'card' có /d/ cuối, đừng đọc thành ca.",
        ),
      ],
      reading: read(
        `A guest from room ${lx.roomNo.spoken} asks for the bill. ${lx.staff} asks: "Cash or card, sir?" The guest gives a card. ${lx.staff} says: "Thank you. Card is fine."`,
        [
          {
            q: "Khách trả tiền bằng gì?",
            options: ["Thẻ", "Tiền mặt", "Chuyển khoản"],
            correct: 0,
            explanation: "Khách đưa thẻ, nhân viên nói 'Card is fine.'",
          },
          {
            q: "Câu nào hỏi hình thức thanh toán?",
            options: ["Cash or card, sir?", "How many, sir?", "What time, sir?"],
            correct: 0,
            explanation: "'Cash or card?' là câu hỏi thanh toán ngắn gọn, chuẩn mực.",
          },
        ],
      ),
      game: [
        game(
          "I only have cash today.",
          "Cash is fine, sir.",
          "Card better, sir.",
          "No problem, sir. Cash or card is fine.",
          undefined,
          "Khách vừa nói chỉ có tiền mặt. Nhắc lại 'cash or card' là chưa nghe khách nói.",
        ),
        game(
          "Do you take Visa?",
          // "No, sir. Cash only." bị chấm SAI trong khi helpTip của chính ô này
          // dạy đúng câu đó. Năm auditor nêu.
          "Yes, sir. We take cards.",
          "Visa card I am not knowing, sir.",
          "Yes, sir. We are taking cards.",
          undefined,
          "Việc luôn đúng thì dùng hiện tại đơn: 'we take'. 'We are taking' nghe như chỉ hôm nay mới nhận thẻ.",
        ),
      ],
    }),

    // Khách nước ngoài vẫn hỏi giá bằng đô, nên bài này giữ lại — nhưng đúng
    // vị trí của nó: một bài quy đổi, không phải đơn vị mặc định của khách sạn.
    lesson(lx, 4, 3, "When a Guest Asks in Dollars", "Khi khách hỏi giá bằng đô", {
      vocabulary: [
        v("Dollar", "/ˈdɒlə/", "Đô la Mỹ", `It is about ${lx.priced.usdWord} dollars.`, "💵"),
        v("Change", "/tʃeɪndʒ/", "Tiền thối lại", "Here is your change.", "🪙"),
      ],
      grammar: [
        g(
          `${capFirst(lx.priced.usdWord)} dollar.`,
          `It is about ${lx.priced.usdWord} dollars.`,
          "Hai điều: từ 2 đô trở lên phải có -s, và thêm 'about' vì tỷ giá thay đổi hằng ngày.",
          `It is about ${lx.priced.usdWord} dollar.`,
        ),
        g(
          "We take dollar too.",
          "We take dong, madam.",
          "Khách sạn thu bằng tiền đồng. Nói giá quy đổi để khách hình dung, nhưng hoá đơn vẫn là dong.",
          "We take dongs, madam.",
        ),
      ],
      speaking: [
        sp(
          "Can I pay in dollars?",
          "I am sorry. We take dong, madam.",
          "Xin lỗi TRƯỚC rồi mới từ chối — đảo ngược lại thì lời xin lỗi nghe như từ đệm. Nói luôn nơi đổi được tiền thì khách còn kịp xoay.",
          undefined,
          ["sorry", "dong"],
        ),
        sp(
          "How much is that in dollars?",
          `It is about ${lx.priced.usdWord} dollars, sir.`,
          "Giữ 'about' — nói một con số đô chính xác là hứa một tỷ giá bạn không kiểm soát được. Từ này trọng âm ở âm tiết sau: a-BOUT, và /t/ cuối phải bật.",
          undefined,
          ["about"],
        ),
      ],
      reading: read(
        `A guest at ${lx.station} asks the price in dollars. ${lx.staff} says: "Good afternoon, sir. It is about ${lx.priced.usdWord} dollars. We take dong." The guest pays, gets change and says: "Thank you."`,
        [
          {
            q: "Vì sao nhân viên nói 'about'?",
            options: [
              "Vì tỷ giá thay đổi hằng ngày",
              "Vì khách sạn muốn khách trả bằng đô la",
              "Vì chưa biết giá",
            ],
            correct: 0,
            explanation: "Nói con số đô chính xác là hứa một tỷ giá khách sạn không quyết định.",
          },
          {
            q: "Khách sạn thu tiền bằng đơn vị nào?",
            options: ["Tiền đồng", "Đô la Mỹ", "Cả hai đều được"],
            correct: 0,
            explanation: "Giá quy đổi chỉ để khách hình dung; hoá đơn và thanh toán là tiền đồng.",
          },
        ],
      ),
      game: [
        game(
          "Do you take dollars here?",
          "I am sorry. We take dong, sir.",
          "Dollar no good here, sir.",
          "Yes sir, dollars are fine here too.",
          undefined,
          "Sai thực tế: khách sạn thu tiền đồng. Hứa nhận đô rồi thu ngân từ chối là khách mất mặt ngay tại quầy.",
        ),
        game(
          "Can I pay in dong?",
          "Of course, madam. We take dong.",
          "Dong no good.",
          "Sorry, dollars only madam.",
          undefined,
          "Ngược hẳn thực tế. Tiền đồng thì luôn nhận được.",
        ),
      ],
    }),

    lesson(lx, 4, 4, "Confirming the Total", "Xác nhận tổng tiền", {
      vocabulary: [
        v("Total", "/ˈtəʊtl/", "Tổng cộng", `The total is ${lx.priced.vndWord} dong.`, "🧮"),
        v("Bill", "/bɪl/", "Hóa đơn", "Here is your bill, sir.", "🧾"),
      ],
      grammar: [
        g(
          // The rule demanded a currency unit — "THE total IS thirty DOLLARS" —
          // over a model that has none, and named dollars in a lesson whose own
          // week teaches that the bill is in dong. GrammarSuite makes the learner
          // rebuild `polite` from chips while reading `rule`, so a rule that
          // disagrees with its model is a wrong instruction at the moment of use.
          // Five auditors flagged this pair and its twin in week 6.
          `Total ${lx.priced.vndWord}.`,
          `The total is ${lx.priced.vndWord} dong.`,
          "Cần mạo từ 'The' và động từ 'is': THE total IS … Số tiền đọc liền cả cụm, và 'dong' giữ nguyên khi số nhiều (tuần 4 bài 1).",
          `The total are ${lx.priced.vndWord}.`,
        ),
        g(
          "You want how many?",
          "How many would you like?",
          "Hỏi lịch sự dùng 'would you like' thay vì 'you want'.",
          "How many you would like?",
        ),
      ],
      speaking: [
        sp(
          "Could I have the bill, please?",
          "Certainly, madam. One moment.",
          "Khách đòi hoá đơn là lúc dễ mất điểm nhất: nhận lời rồi mang ra ngay, đừng để khách phải gọi lần thứ hai. 'Certainly' trọng âm âm tiết đầu: CER-tain-ly.",
        ),
        sp(
          "The total, please.",
          `${capFirst(lx.priced.vndWord)} dong, sir. Here is your bill.`,
          "Nhắc lại món và nói tổng tiền — khách nghe rõ, tránh tranh cãi hóa đơn. Âm /l/ CUỐI từ là lỗi nặng nhất của người Việt: total, bill, towel — đầu lưỡi phải chạm lợi trên và giữ ở đó, đừng buông thành tô-tồ hay biu.",
          undefined,
          ["bill"],
        ),
      ],
      reading: read(
        // Week 4 gave three prices for the same two coffees: 90,000 dong for ONE
        // in lesson 1, 90,000 for TWO in this lesson's speaking, and eight dollars
        // for two here — in the week whose subject is money. And coffee is F&B's
        // item, hardcoded into all six departments. Both now read the lexicon.
        `The guest from room ${lx.roomNo.spoken} asks for the bill. ${lx.staff} says: "The total is ${lx.priced.vndWord} dong, sir. Here is your bill." The guest says: "Thank you." ${lx.staff} says: "Goodbye, sir."`,
        [
          {
            q: "Tổng tiền là bao nhiêu?",
            options: [`${lx.priced.vnd.toLocaleString("vi-VN")} đồng`, "Tám đô", "Chưa nói giá"],
            correct: 0,
            explanation: `Nhân viên nói "The total is ${lx.priced.vndWord} dong." — hoá đơn tính bằng tiền đồng, không phải đô.`,
          },
          {
            q: `Vì sao ${lx.staff} nhắc lại tổng tiền trước khi đưa hoá đơn?`,
            options: [
              "Để khách nghe rõ trước khi trả tiền",
              "Vì khách thường không nhớ giá đã báo",
              "Để bán thêm",
            ],
            correct: 0,
            explanation:
              "Báo tổng tiền thành tiếng trước khi đưa hoá đơn là cách tránh tranh cãi ngay tại quầy.",
          },
        ],
      ),
      game: [
        game(
          "Could we have the bill, please?",
          "Certainly, sir. One moment.",
          "Bill? OK, I go and bring now.",
          "Yes sir, I will bring it very soon.",
          undefined,
          "'Very soon' là một lời hứa không có mốc thời gian — khách sẽ tự đặt mốc, và bạn sẽ trễ so với mốc đó. 'One moment' hứa đúng thứ bạn kiểm soát được.",
        ),
        game(
          // "Your change, please." ASKS THE GUEST for change. Three auditors.
          // The lesson's own vocabulary card one lesson earlier has the right
          // form: "Here is your change."
          // The note has to cover every department's total: the Spa bill is
          // seven hundred thousand, so handing over five hundred thousand left
          // "Here is your change." as the answer to an underpayment.
          "Here is two million.",
          "Two million dong. Here is your change.",
          "Fifty dollar OK.",
          "Thank you, sir. There is no change today.",
          undefined,
          "Nhắc lại số tiền khách đưa rồi mới thối là quy tắc đếm tiền. Và không bao giờ giữ tiền thừa của khách.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 5 — Core Courtesy Phrases
// Function: the fixed politeness chunks every department uses —
//           please/thank you, hold on, here you are, apologise.
// ============================================================
function week5(lx: P0Lexicon): LessonContent[] {
  const [i1, , , , i5] = lx.items;
  return [
    lesson(lx, 5, 1, "Please & Of Course", "Làm ơn & Vâng, dĩ nhiên", {
      vocabulary: [
        v("Please", "/pliːz/", "Làm ơn, xin mời", "This way, please.", "🙏"),
        v("Of course", "/əv ˈkɔːs/", "Vâng, dĩ nhiên rồi", "Of course, madam.", "✔️"),
        v("Certainly", "/ˈsɜːtnli/", "Chắc chắn rồi (trang trọng)", "Certainly, sir.", "👍"),
      ],
      grammar: [
        g(
          // "May I take your bag?" là việc của bell-boy, và ba auditor nêu nó ở
          // các bộ phận không khuân đồ. "May I help you?" dạy đúng cấu trúc
          // 'May I…?' và là câu quầy nào cũng dùng nhiều nhất — trước đây nó chỉ
          // nằm trong thẻ từ vựng, chưa lần nào là câu học viên phải nói ra.
          "Wait, I help you.",
          "May I help you, sir?",
          "Câu xin phép dùng 'May I…?'. Nói trống không nghe như ra lệnh.",
          "May I to help you, sir?",
        ),
        g(
          "Sit.",
          "Please have a seat.",
          "Mời khách ngồi nói 'Please have a seat' — chỉ nói 'Sit' là bất lịch sự.",
          "Please have seat.",
        ),
      ],
      speaking: [
        sp(
          "Could you carry this for me?",
          "Certainly. I will call the bellman.",
          "Hành lý là việc của bộ phận hành lý, và cũng là cách tự bảo vệ: đồ trong vali hỏng hay mất sau khi bạn cầm vào thì không có phiếu giao nhận nào chứng minh. Nhận lời trước rồi mới gọi — 'Certainly' trọng âm âm tiết đầu: CER-tain-ly. 'Bellman' /ˈbelmæn/ là nhân viên khuân hành lý, nhiều khách sạn gọi là porter; nhấn âm đầu BELL-man.",
          undefined,
          ["bellman"],
        ),
        sp(
          "Could you help me, please?",
          "Of course, madam. How may I help?",
          "'Of course' là cách nhận lời lịch sự nhất, và nối ngay bằng một câu hỏi mở thì nghe chủ động hơn là dừng lại. 'course' đóng bằng /s/ — đừng nuốt mất âm cuối.",
        ),
      ],
      reading: read(
        `A guest needs help at ${lx.station}. ${lx.staff} smiles and says: "Good morning, madam. Of course. Please have a seat." The guest says: "Thank you."`,
        [
          {
            q: `${lx.staff} làm gì trước khi nói?`,
            options: ["Mỉm cười", "Nhìn đồng hồ", "Gọi quản lý"],
            correct: 0,
            explanation: `Bài đọc: ${lx.staff} "smiles and says" — nét mặt tới trước lời nói, và khách thấy nó trước.`,
          },
          {
            q: `${lx.staff} mời khách làm gì?`,
            options: ["Ngồi xuống", "Đợi ở ngoài", "Quay lại sau"],
            correct: 0,
            explanation: `Bài đọc: ${lx.staff} nói "Please have a seat" — mời khách ngồi.`,
          },
        ],
      ),
      game: [
        game(
          "Could you carry this bag?",
          "I will call the bellman, madam.",
          "Bag heavy, madam.",
          "Of course madam, I will take it up for you.",
          undefined,
          "Nhận lời khiêng hành lý nghe rất tận tình, nhưng hành lý là việc của bộ phận hành lý — và là cách tự bảo vệ: đồ hỏng hay mất sau khi bạn cầm vào thì không có phiếu giao nhận nào chứng minh.",
        ),
        game(
          // Nhiễu cũ là câu XIN PHÉP CẤP TRÊN — đúng nghiệp vụ ở phòng chờ có
          // kiểm soát thẻ — bị chấm sai, trong khi tuần 5 bài 2 lại chấm ĐÚNG
          // cho "One moment, please. I will check." Ba auditor nêu mâu thuẫn.
          "May I sit here?",
          "Certainly, sir. Please have a seat.",
          "Yes sit.",
          "Of course, sir. You can to sit down here.",
          undefined,
          "Sau 'can' là động từ nguyên thể không 'to': can sit, không phải can to sit.",
        ),
      ],
    }),

    lesson(lx, 5, 2, "One Moment, Please", "Xin chờ một lát", {
      vocabulary: [
        v("Moment", "/ˈməʊmənt/", "Khoảnh khắc, một lát", "One moment, please.", "⏳"),
        v("Wait", "/weɪt/", "Chờ, đợi", "Please wait here, madam.", "⏸️"),
      ],
      grammar: [
        g(
          "Wait.",
          "One moment, please, sir.",
          "Bảo khách 'Wait' rất thô. Câu chuẩn là 'One moment, please' — 'One minute' hứa đúng sáu mươi giây và khách sẽ bấm giờ, còn 'moment' thì không hứa con số nào.",
          "One moment, please, the sir.",
        ),
        g(
          "I no can do.",
          "One moment. I will call my manager.",
          "Việc vượt thẩm quyền thì gọi quản lý, và phải NÓI RA là mình đang đi gọi. Im lặng bỏ đi khiến khách tưởng bị phớt lờ. Đây là câu dùng được cho mọi tình huống bạn không tự quyết được.",
          "One moment. I call my manager.",
        ),
        g(
          "You wait here.",
          "Please wait here, madam.",
          "Thêm 'Please' ở đầu và 'madam/sir' ở cuối để câu thành lời mời, không thành mệnh lệnh.",
          "Please you wait here, madam.",
        ),
      ],
      speaking: [
        sp(
          "I want to speak to the manager.",
          "One moment. I will call my manager.",
          "Khách đòi gặp quản lý thì gọi ngay, đừng hỏi lý do và đừng tự thanh minh. Gọi nhanh là cách hạ nhiệt tốt nhất. 'Manager' đọc /ˈmænɪdʒə/ — nhấn âm đầu MAN, đuôi -ger là /dʒə/ như trong village, không phải /ɡə/.",
          undefined,
          ["manager"],
        ),
        sp(
          `Could you bring me ${/^[aeiou]/i.test(i1.word) ? "an" : "a"} ${i1.word.toLowerCase()}?`,
          "One moment, please, sir.",
          "Luôn báo khách phải chờ, đừng im lặng bỏ đi. Chờ lâu thì quay lại báo tiếp. 'please' kết thúc bằng /z/ có rung — không phải /s/, và đừng cụt thành pli.",
        ),
      ],
      reading: read(
        `A guest from room ${lx.roomNo.spoken} asks for the ${i1.word.toLowerCase()}. ${lx.staff} says: "One moment, please, sir." ${lx.staff} comes back in two minutes and says: "Here you are, sir."`,
        [
          {
            q: `${lx.staff} quay lại sau bao lâu?`,
            options: ["Hai phút", "Hai mươi phút", "Nửa tiếng"],
            correct: 0,
            explanation:
              "Bài đọc: \"comes back in two minutes\". Đó là thứ làm câu 'One moment' thành thật — nói xong mà mười lăm phút sau mới quay lại thì lần sau khách không tin nữa.",
          },
          {
            q: "Nên làm gì khi để khách chờ?",
            options: [
              "Báo khách rồi quay lại sớm",
              "Đi làm việc khác, không nói gì với khách",
              "Nói khách tự tìm",
            ],
            correct: 0,
            explanation: "Báo trước và quay lại đúng hẹn là nguyên tắc dịch vụ cơ bản.",
          },
        ],
      ),
      game: [
        game(
          "This is not good enough.",
          "One moment. I will call my manager.",
          "Sorry sorry, madam.",
          "I am very sorry, madam. What can I do?",
          undefined,
          "Xin lỗi thì đúng, nhưng hỏi khách 'tôi làm gì được?' là đẩy việc ngược cho khách. Khách phàn nàn thì mình đưa ra bước tiếp theo.",
        ),
        game(
          `Is my ${i1.word.toLowerCase()} here yet?`,
          "One moment, please. I will check.",
          "Wait there.",
          `Your ${i1.word.toLowerCase()} not here, madam.`,
          undefined,
          "Khẳng định đồ chưa tới khi chưa đi kiểm, và câu còn thiếu 'is'.",
        ),
      ],
    }),

    lesson(lx, 5, 3, "Here You Are", "Đây ạ, mời anh/chị", {
      vocabulary: [
        v(
          "Here you are",
          "/hɪə juː ɑː/",
          "Đây ạ (khi đưa đồ cho khách)",
          "Here you are, sir.",
          "🤲",
        ),
        v("This way", "/ðɪs weɪ/", "Mời đi lối này", "This way, please.", "➡️"),
      ],
      grammar: [
        g(
          "Take it.",
          "Here you are, sir.",
          "Khi đưa đồ cho khách, nói 'Here you are' — không nói 'Take it'.",
          "Here are you, sir.",
        ),
        g(
          "Go there.",
          "This way, please, madam.",
          "Dẫn khách nói 'This way, please' kèm cử chỉ tay mở, không chỉ trỏ ngón tay.",
          "This way, please go, madam.",
        ),
      ],
      speaking: [
        sp(
          // Khách ĐƯA đồ, còn "Here you are" là công thức TRAO đồ — tôi đổi đề
          // sáng nay và làm lệch cặp. Nay khách xin, nhân viên trao.
          "Where is the lounge, please?",
          "This way, please, madam.",
          "Dẫn khách đi trước một bước, đừng chỉ tay rồi đứng lại. Bàn tay mở, không chỉ ngón.",
        ),
        sp(
          `Is that my ${i1.word.toLowerCase()}?`,
          "Here you are, madam.",
          "Nhận đồ thì cảm ơn; đưa trả đồ thì nói 'Here you are'. Cụm này đọc nối liền, trọng âm rơi vào HERE chứ không phải 'are' — tách rời từng từ nghe như đang đánh vần.",
        ),
      ],
      reading: read(
        // items[4] không trao tay được ở ba bộ phận — Spa ra "gives the oil",
        // Quan hệ khách hàng "gives the seat", Back Office "gives the chair".
        // items[0] trao tay được ở cả sáu, và đây là bài dạy CÔNG THỨC TRAO ĐỒ.
        `${lx.staff} gives the ${i1.word.toLowerCase()} to the guest and says: "Here you are, madam." The guest says: "Thank you." Then ${lx.staff} says: "This way, please." ${lx.staff} walks in front and shows the way.`,
        [
          {
            q: "Câu nào nói khi đưa đồ cho khách?",
            options: ["Here you are.", "Put it on the table there.", "This is."],
            correct: 0,
            explanation: "'Here you are' là câu chuẩn khi trao đồ vật cho khách.",
          },
          {
            q: `${lx.staff} nói "This way, please" vào lúc nào?`,
            options: [
              "Sau khi đưa đồ và khách đã cảm ơn",
              "Trước khi đưa đồ",
              "Trong lúc khách đang nói",
            ],
            correct: 0,
            explanation:
              "Xong việc trước mắt rồi mới dẫn đi — cắt ngang giữa chừng làm khách phải chọn giữa cầm đồ và bước theo. Và dẫn thì đi TRƯỚC, không chỉ tay rồi đứng yên.",
          },
        ],
      ),
      game: [
        game(
          `Is that ${i1.word.toLowerCase()} for me?`,
          "Here you are, madam.",
          "Yes, you take this one.",
          "Yes madam, this one is for you.",
          undefined,
          "Đúng ngữ pháp, nhưng lúc TRAO tận tay thì câu chuẩn là 'Here you are' — vừa trả lời vừa báo là đang đưa.",
        ),
        game(
          "Where is the lounge?",
          "This way, please, sir.",
          "Go there.",
          "Ask at the desk, sir.",
          undefined,
          "Đẩy khách đi hỏi người khác trong khi mình biết đường. Chỉ chuyển tiếp khi thật sự không biết.",
        ),
      ],
    }),

    lesson(lx, 5, 4, "Excuse Me & I Am Sorry", "Xin lỗi & Xin thứ lỗi", {
      vocabulary: [
        v(
          "Excuse me",
          "/ɪkˈskjuːz miː/",
          "Xin phép, xin lỗi (khi làm phiền)",
          "Excuse me, sir.",
          "🙇",
        ),
        v("Sorry", "/ˈsɒri/", "Xin lỗi (khi có lỗi)", "I am very sorry, madam.", "😔"),
      ],
      grammar: [
        g(
          "Sorry sorry.",
          "I am very sorry, sir.",
          "Nói trọn câu 'I am very sorry' — lặp 'sorry sorry' nghe luống cuống, thiếu chuyên nghiệp.",
          "It is very sorry, sir.",
        ),
        g(
          "Move please.",
          "Excuse me, please.",
          "Khi cần đi qua hoặc ngắt lời, dùng 'Excuse me' — không nói 'Move'.",
          "Excuse me, please move.",
        ),
      ],
      speaking: [
        sp(
          "Excuse me, could I ask you something?",
          "Of course, madam. Please ask.",
          "Khách mở đầu bằng Excuse me là đang xin phép làm phiền, không phải đang xin lỗi. Đáp lại bằng một lời mời, đừng đáp bằng một câu xin lỗi.",
        ),
        sp(
          `This is the wrong ${i1.word.toLowerCase()}.`,
          "I am very sorry, madam. One moment.",
          "Xin lỗi trước, sửa sau. Từ 'very' mở đầu bằng /v/ — răng trên chạm môi dưới, đừng thành be-ry.",
        ),
      ],
      reading: read(
        `${lx.staff} gives the wrong ${i1.word.toLowerCase()}. The guest says: "Excuse me, this is wrong." ${lx.staff} says: "I am very sorry, madam. One moment." ${lx.staff} comes back and says: "Here you are. Thank you for waiting."`,
        [
          {
            q: "Khi mình làm sai thì nói gì?",
            options: ["I am very sorry.", "Excuse me, that is not my fault.", "Of course."],
            correct: 0,
            explanation:
              "'Sorry' dùng khi mình có lỗi. Phương án kia mở đầu bằng 'Excuse me' nghe rất lịch sự, nhưng vế sau chối trách nhiệm — câu dài và êm tai vẫn có thể là câu sai.",
          },
          {
            q: `Sau khi xin lỗi, ${lx.staff} làm gì?`,
            options: ["Nói 'One moment' rồi đi sửa", "Bỏ đi", "Cãi lại khách"],
            correct: 0,
            explanation:
              "Xin lỗi phải đi kèm hành động sửa lỗi ngay — đó là bước đầu của quy trình khắc phục dịch vụ.",
          },
        ],
      ),
      game: [
        game(
          "Excuse me, may I ask something?",
          "Of course, sir. Please ask.",
          "What you want?",
          "I am very sorry, sir. Please ask.",
          undefined,
          "Không có gì để xin lỗi ở đây. Xin lỗi khi mình không có lỗi làm khách tưởng họ đang làm phiền.",
        ),
        game(
          `You gave me the wrong ${i1.word.toLowerCase()}.`,
          "I am very sorry, sir. One moment.",
          "Sorry sorry.",
          "That is not my mistake, sir. I am sorry.",
          undefined,
          "Cãi lỗi trước mặt khách. Ai làm sai không quan trọng bằng việc đổi lại ngay.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 6 — Checkpoint: Survival Foundation
// Every lesson chains two or three functions from weeks 1-5 into
// one short guest interaction. New vocabulary is deliberately
// light (8 items) — the load here is recall, not intake.
// ============================================================
function week6(lx: P0Lexicon): LessonContent[] {
  const [i1, i2] = lx.items;
  return [
    lesson(lx, 6, 1, "Welcome & Name", "Đón khách & hỏi tên", {
      vocabulary: [
        v("Guest", "/ɡest/", "Khách", "The guest is at the door.", "🧳"),
        v(
          "Ms",
          "/mɪz/",
          "Cô/Bà (khi chưa rõ khách đã lập gia đình hay chưa)",
          "Good morning, Ms Smith.",
          "🪪",
        ),
      ],
      grammar: [
        g(
          "Morning. Name what?",
          "Good morning. May I have your name?",
          "Nối hai kỹ năng tuần 1: chào đủ câu, rồi hỏi tên bằng 'May I have…?'.",
          "Good morning. May I have you name?",
        ),
        g(
          "You from where?",
          "Where are you from, sir?",
          "Từ hỏi đứng đầu, động từ theo sau: WHERE ARE you from?",
          "Where you are from, sir?",
        ),
      ],
      speaking: [
        sp(
          // The guest gives her name and the model answer threw it away. Using
          // the surname is the cheapest upgrade in hospitality English and the
          // course never taught it once in fourteen weeks.
          "Good afternoon. I am Mr Chen. I stayed here in May.",
          "Welcome back, Mr Chen.",
          "Khách quen thì thêm 'back' — hai chữ đó nói rằng bạn nhớ họ. Gọi bằng HỌ kèm Mr, Mrs hoặc Ms, không gọi tên riêng.",
          undefined,
          ["back"],
        ),
        sp(
          "Good morning. I have a booking. I am Anna Smith.",
          "Good morning, Ms Smith.",
          "Khách vừa xưng tên thì phải dùng lại tên đó: 'Ms' + HỌ, không phải tên gọi. Dùng 'Ms' khi chưa biết tình trạng hôn nhân của khách; đừng đoán bằng Mrs hay Miss. Dùng đúng họ khách là nâng cấp rẻ nhất trong nghề. 'Good' có /d/ cuối — đừng dừng lại ở 'gút'.",
        ),
        sp(
          `I am Mr Chen. I am in room ${lx.roomNo.spoken}.`,
          `Thank you, Mr Chen. Room ${lx.roomNo.spoken}.`,
          "Nối tuần 1 với tuần 2 trong một lượt: gọi khách bằng HỌ, rồi nhắc lại số phòng từng chữ số. Nhắc lại số phòng không phải nói thừa — đó là bước xác nhận, và số phòng là chỗ sai đắt nhất trong cả ca.",
        ),
      ],
      reading: read(
        `It is 8 AM. A guest arrives at ${lx.station}. ${lx.staff} says: "Good morning, madam. Welcome to ${RESORT}. May I have your name?"`,
        [
          {
            q: "Nhân viên làm mấy việc trong lời chào?",
            options: ["Ba: chào, đón, hỏi tên", "Một: chào", "Hai: chào và tạm biệt"],
            correct: 0,
            explanation:
              "Good morning (chào) + Welcome to (đón) + May I have your name? (hỏi tên) — chuỗi ba bước chuẩn.",
          },
          {
            q: "Gọi khách nữ bằng từ nào?",
            options: ["Madam", "Sir", "Mister"],
            correct: 0,
            explanation: "sir = khách nam, madam = khách nữ. Gọi sai là lỗi cơ bản ở mọi bộ phận.",
          },
        ],
      ),
      game: [
        game(
          "Hello again. I am Mr Chen.",
          "Welcome back, Mr Chen.",
          "Hello Chen, welcome back.",
          "Welcome back, sir. Nice to see you.",
          undefined,
          "Câu kia lịch sự và đúng ngữ pháp, nhưng khách vừa nói tên mình ra. Dùng đúng họ khách là nâng cấp rẻ nhất trong nghề — bỏ qua nó rồi gọi 'sir' là quay về mức phục vụ cho người lạ.",
        ),
        game(
          "Good afternoon.",
          "Good afternoon, sir. Welcome.",
          "Afternoon, you come in please sir.",
          "Good morning, sir. Welcome to Lotus Bay.",
          undefined,
          "Khách chào buổi chiều, mình chào lại buổi sáng. Luôn chào lại đúng buổi khách vừa nói.",
        ),
      ],
    }),

    lesson(lx, 6, 2, "Room, Floor & Items", "Phòng, tầng & đồ dùng", {
      vocabulary: [
        v("Ready", "/ˈredi/", "Đã sẵn sàng", "Your room is ready.", "✅"),
        v("Bring", "/brɪŋ/", "Mang tới", `I will bring two ${i1.word.toLowerCase()}s.`, "🛎️"),
      ],
      grammar: [
        g(
          `Room ${lx.roomNo.cardinal}, floor ${lx.floor.ordinal}.`,
          `Room ${lx.roomNo.spoken}, ${lx.floor.ordinal} floor.`,
          "Ôn tuần 2: số phòng đọc từng chữ số, tầng dùng số thứ tự.",
          `Room ${lx.roomNo.spoken}, floor ${lx.floor.ordinal}.`,
        ),
        g(
          `I bring two ${i1.word.toLowerCase()}.`,
          `I will bring two ${i1.word.toLowerCase()}s.`,
          "Ôn hai lỗi cùng lúc: thiếu 'will' cho việc sắp làm, và thiếu -s số nhiều.",
          `I will bring two ${i1.word.toLowerCase()}.`,
        ),
      ],
      speaking: [
        sp(
          `I am in room ${lx.roomNo.spoken}. Which floor?`,
          `The ${lx.floor.ordinal} floor, madam.`,
          "Nghe số phòng thì trả lời đúng tầng của số đó. Tầng gọi bằng số thứ tự, không bằng số đếm.",
        ),
        sp(
          `Is room ${lx.roomNo.spoken} ready?`,
          `Room ${lx.roomNo.spoken} is ready. ${capFirst(lx.floor.ordinal)} floor.`,
          `Đây là lượt BÀN GIAO giữa nhân viên với nhau, không phải lời khách — với khách thì câu trả lời khác hẳn, xem lượt game cuối bài. Số thứ tự của tầng đóng bằng phụ âm khó: ${lx.floor.ordinal} kết bằng ${/th$/.test(lx.floor.ordinal) ? "/θ/ — lưỡi chạm răng" : /d$/.test(lx.floor.ordinal) ? "/d/" : "cụm /st/"}. Nghe kỹ âm cuối rồi bắt chước đúng âm đó.`,
          "colleague",
        ),
        sp(
          `Could you bring two ${i1.word.toLowerCase()}s to room ${lx.roomNo.spoken}?`,
          `Two ${i1.word.toLowerCase()}s to room ${lx.roomNo.spoken}. One moment.`,
          "Nối hai việc của tuần 2 vào một lượt: nhắc lại SỐ LƯỢNG và nhắc lại SỐ PHÒNG. Đọc số phòng từng chữ số. Nhắc lại cả hai rồi mới đi — sai một trong hai là đi lại hai lần.",
        ),
      ],
      reading: read(
        `A colleague asks ${lx.staff}: "Is room ${lx.roomNo.spoken} ready?" ${lx.staff} checks the list and says: "Room ${lx.roomNo.spoken} is ready. ${capFirst(lx.floor.ordinal)} floor." Then a guest asks the same question. ${lx.staff} says: "One moment, sir. I will check."`,
        [
          {
            q: `Phòng khách ở tầng nào?`,
            options: [capFirst(lx.floor.vi), "Tầng trệt", "Tầng hai mươi"],
            correct: 0,
            explanation: `Nhân viên nói "${lx.floor.ordinal} floor" — tức ${lx.floor.vi}.`,
          },
          {
            q: "Khách hỏi phòng xong chưa, nhân viên đáp thế nào?",
            options: [
              "Xin khách chờ để đi kiểm tra",
              "Trả lời ngay là phòng đã sẵn sàng",
              "Hẹn khách hai giờ chiều",
            ],
            correct: 0,
            explanation:
              "Với đồng nghiệp thì trả lời thẳng vì mình vừa xem danh sách. Với khách thì phải đi kiểm tra rồi mới trả lời — hứa liều một giờ mà phòng chưa xong là khiếu nại.",
          },
        ],
      ),
      game: [
        game(
          `Is my room on the ${lx.floor.ordinal} floor?`,
          `Yes, madam. The ${lx.floor.ordinal} floor.`,
          "Yes floor.",
          `Yes madam, and the lift is over there.`,
          undefined,
          "Thông tin thêm không sai, nhưng câu xác nhận phải nhắc lại đúng tầng để khách biết mình đã nghe đúng.",
        ),
        game(
          // Đề không cho biết mấy giờ, nên câu TRUNG THỰC cho khách đến sớm —
          // việc thường xuyên nhất ở quầy — bị chấm sai. Bốn auditor nêu. Nay
          // đề nói rõ khách đến sớm, và câu trung thực là ĐÁP ÁN ĐÚNG.
          `I am early. Is my room ready?`,
          // Giờ phòng sẵn sàng là giờ NHẬN PHÒNG, không phải giờ mở cửa của bộ
          // phận — service.open cho ra "ready at ten" ở Spa, "at six" ở Nhà hàng.
          `One moment, sir. I will check.`,
          `Room ready yes.`,
          `Yes, sir. Your room is ready now.`,
          undefined,
          "Hứa phòng đã sẵn sàng mà chưa kiểm danh sách. Khách lên tới nơi gặp phòng chưa dọn là hỏng cả lần nhận phòng.",
        ),
      ],
    }),

    lesson(lx, 6, 3, "Time & Price Together", "Giờ giấc & giá tiền", {
      vocabulary: [
        v("Again", "/əˈɡen/", "Lại, lần nữa", "Could you say that again?", "🔁"),
        v("Understand", "/ˌʌndəˈstænd/", "Hiểu", "I understand, madam.", "💡"),
      ],
      grammar: [
        g(
          `${capFirst(lx.service.en)} open ${lx.service.open}, price ${lx.priced.vndWord} dong.`,
          `We open at ${lx.service.open}. ${capFirst(lx.priced.vndWord)} dong.`,
          "Ôn tuần 3 và 4: 'at' đứng trước giờ, và số tiền đọc liền cả cụm rồi mới tới 'dong' — không thêm -s.",
          `We open at ${lx.service.open}. ${capFirst(lx.priced.vndWord)} dongs.`,
        ),
        g(
          "I no understand.",
          "Sorry, I do not understand.",
          "Phủ định cần trợ động từ: I DO NOT understand. Xin lỗi trước rồi nhờ khách nhắc lại.",
          "Sorry, I do not understanding.",
        ),
      ],
      speaking: [
        sp(
          "Sorry, I did not understand.",
          "I am sorry, madam. I will say it again.",
          "Khách chưa hiểu thì nhắc lại CHẬM HƠN, đừng nhắc lại to hơn. Nói ra là mình sẽ nói chậm lại thì khách yên tâm hỏi tiếp.",
        ),
        sp(
          "Sorry, what time and how much?",
          `We open at ${lx.service.open}. ${capFirst(lx.priced.vndWord)} dong.`,
          "Khi khách hỏi hai thông tin, trả lời tách thành hai câu ngắn — dễ nghe hơn một câu dài. Nghỉ hẳn một nhịp giữa hai câu: chỗ ngắt cũng là một phần của phát âm.",
        ),
        sp(
          "Could you say the price again?",
          `Of course, madam. ${capFirst(lx.priced.vndWord)} dong.`,
          "Khách nhờ nhắc lại thì nhận lời trước đã — 'Of course' của tuần 5 — rồi mới đọc lại con số. Đọc chậm hơn lần đầu, và đọc liền cả cụm tiền rồi mới tới 'dong'.",
          undefined,
          ["dong"],
        ),
      ],
      reading: read(
        // Cả hai câu hỏi của bài này đều không có neo trong chính bài đọc — ba
        // auditor nêu, và bài đọc đi kèm câu hỏi cả trong đề checkpoint, nên học
        // viên đọc kỹ vẫn không trả lời được. Nay lời nhờ nhắc lại nằm trong bài.
        `A guest asks about ${lx.service.en} and the ${lx.priced.en}. The guest says: "Sorry, could you say that again?" ${lx.staff} answers twice: "We open at ${lx.service.open}, madam. The ${lx.priced.en} is ${lx.priced.vndWord} dong."`,
        [
          {
            q: "Khi không nghe rõ, nên nói câu nào?",
            options: ["Could you say that again?", "What?", "I no understand."],
            correct: 0,
            explanation: "'Could you say that again?' là cách nhờ nhắc lại lịch sự nhất.",
          },
          {
            q: "Cách trả lời hai câu hỏi cùng lúc tốt nhất là gì?",
            options: ["Tách thành hai câu ngắn", "Gộp thành một câu dài", "Chỉ trả lời một ý"],
            correct: 0,
            explanation:
              "Ở trình độ này, hai câu ngắn rõ ràng hơn một câu dài — khách cũng dễ nghe hơn.",
          },
        ],
      ),
      game: [
        game(
          "Sorry, could you speak slowly?",
          "Of course, madam. Slowly.",
          "Slow, yes. I speak slow now.",
          "Of course, madam. I speak more loudly.",
          undefined,
          "Nói TO hơn không giúp gì khi khách chưa nghe kịp — âm lượng không phải tốc độ, và nói to còn nghe như mất kiên nhẫn. Khách xin nói chậm thì nhận lời rồi nói chậm lại, giữ nguyên âm lượng.",
        ),
        game(
          // "Of course" không phải câu đáp cho "I did not hear you" — nó nhận
          // lời, còn ở đây phải xin lỗi rồi nhắc lại.
          `Sorry, I did not hear you.`,
          `I am sorry, sir. We open at ${lx.service.open}.`,
          `You no hear.`,
          `Please listen carefully, sir. I said ${lx.service.open}.`,
          undefined,
          "Bảo khách 'nghe cho kỹ' là trách khách. Khách không nghe rõ thì mình nhắc lại, chậm hơn một nhịp.",
        ),
      ],
    }),

    lesson(lx, 6, 4, "The Full Service Chain", "Chuỗi phục vụ hoàn chỉnh", {
      vocabulary: [
        v("Enjoy", "/ɪnˈdʒɔɪ/", "Tận hưởng", `Enjoy your ${lx.closing.en}, sir.`, "😊"),
        v("Anything else", "/ˈeniθɪŋ els/", "Còn gì nữa không ạ", "Anything else, madam?", "➕"),
      ],
      grammar: [
        g(
          "You want more?",
          "Anything else, madam?",
          "Câu hỏi thêm nhu cầu chuẩn là 'Anything else?' — ngắn, lịch sự, dùng được mọi bộ phận.",
          "Anything else you want, madam?",
        ),
        g(
          "Go enjoy.",
          `Enjoy your ${lx.closing.en}, sir.`,
          `Câu chúc khi tiễn khách phải hợp với việc vừa xong: lễ tân tiễn một kỳ nghỉ, nhà hàng tiễn một bữa ăn, spa tiễn một buổi trị liệu. Ở bộ phận này là ${lx.closing.vi} — 'Enjoy your ${lx.closing.en}'. Còn 'Have a nice day' là lời chúc khi khách RỜI ĐI — ra phố hay trả phòng — nên tuần 1 dạy nó ở lượt tạm biệt là đúng; ở đây khách vừa dùng xong dịch vụ, chúc theo dịch vụ.`,
          `Enjoying your ${lx.closing.en}, sir.`,
        ),
      ],
      speaking: [
        sp(
          `Could I have one more ${i1.word.toLowerCase()}?`,
          "One moment. I will check, madam.",
          `Thứ cấp thêm thì phải kiểm tra trước, không cấp theo phản xạ — nhất là ${i1.definition.toLowerCase()}. Câu hỏi còn-gì-nữa-không để dành cho lúc đã xong việc, không phải lúc vừa nhận một yêu cầu mới.`,
          undefined,
          ["check"],
        ),
        sp(
          `Thank you. That is all.`,
          `Thank you, madam. Enjoy your ${lx.closing.en}.`,
          // Ghi chú cũ nhắm cụm /st/ của 'stay', nhưng danh từ kết thúc nay đổi
          // theo bộ phận (meal, treatment, day) nên mẹo trích một từ mà nửa số bộ
          // phận không nói. Chuyển sang từ có ở cả sáu.
          "Kết thúc luôn có ba phần: cảm ơn – lời chúc – nụ cười. Đây là ấn tượng cuối của khách, và khách nhớ nó lâu hơn mọi câu ở giữa. 'Enjoy' trọng âm ở âm tiết sau: en-JOY, đừng nhấn đều hai âm.",
          undefined,
          ["enjoy"],
        ),
        sp(
          "First, some water, please.",
          "Thank you, madam. Anything else?",
          "Hỏi câu này SAU khi xong việc, không phải lúc vừa nhận yêu cầu mới. 'Anything' đọc liền một hơi, trọng âm ở A đầu.",
          undefined,
          ["anything"],
        ),
      ],
      reading: read(
        `${lx.staff} brings the ${i1.word.toLowerCase()} and asks: "Anything else, madam?" The guest says: "No, thank you." ${lx.staff} says: "Enjoy your ${lx.closing.en}."`,
        [
          {
            q: "Câu nào hỏi khách còn cần gì nữa không?",
            options: ["Anything else?", "You want more?", "What else you?"],
            correct: 0,
            explanation: "'Anything else?' là câu hỏi chốt nhu cầu chuẩn mực, dùng ở mọi bộ phận.",
          },
          {
            q: "Câu chúc nào dùng với khách đang lưu trú?",
            options: [`Enjoy your ${lx.closing.en}.`, "Goodbye forever.", "Good night now."],
            correct: 0,
            explanation: `'Enjoy your ${lx.closing.en}' dành cho khách vừa dùng xong dịch vụ ở đây; 'Have a nice day' dùng khi khách rời khách sạn.`,
          },
        ],
      ),
      game: [
        game(
          "Yes, one more thing please.",
          "Certainly, sir. What is it?",
          "More thing? OK, you tell me sir.",
          "Anything else, sir? Please tell me now.",
          undefined,
          "Khách vừa nói là còn một việc; hỏi lại 'anything else' là hỏi đúng câu vừa được trả lời. 'Now' còn nghe như giục.",
        ),
        game(
          "No, that is all. Thank you.",
          `Thank you, sir. Enjoy your ${lx.closing.en}.`,
          "OK finish.",
          "Thank you. Goodbye now.",
          undefined,
          "Không sai, nhưng lượt chào cuối là chỗ chúc khách một câu. 'Goodbye now' cụt và nghe như muốn kết thúc gấp.",
        ),
      ],
    }),
  ];
}

// ------------------------------------------------------------
// Week assembly + spaced-recycling word lists.
// ------------------------------------------------------------
const WEEK_META: Record<
  number,
  { en: string; vi: string; build: (lx: P0Lexicon) => LessonContent[] }
> = {
  1: {
    en: "Alphabet, Names & Greetings",
    vi: "Bảng chữ cái, Đánh vần tên & Chào hỏi",
    build: week1,
  },
  2: { en: "Numbers, Rooms & Floors", vi: "Số đếm, Số phòng & Số tầng", build: week2 },
  3: { en: "Times, Dates & Opening Hours", vi: "Giờ, Ngày & Giờ mở cửa dịch vụ", build: week3 },
  4: { en: "Prices, Money & Quantities", vi: "Giá cả, Tiền tệ & Số lượng", build: week4 },
  5: { en: "Core Courtesy Phrases", vi: "Cụm câu lịch sự cốt lõi", build: week5 },
  6: {
    en: "Checkpoint — Survival Foundation",
    vi: "Kiểm tra tổng hợp — Nền tảng sống còn",
    build: week6,
  },
};

/** Headwords recycled into a week's quizzes, drawn from earlier weeks of
 *  the same department. Quota per the matrix: ≥3 items from week 2 on,
 *  and a heavy sweep at the week-6 checkpoint. */
/** `n` items spread evenly across `xs` rather than taken off one end.
 *
 *  Both phases used to sample the review list by position — Phase 0 took the
 *  literal tail, Phase 1 took the literal head — and headwords are authored
 *  lesson by lesson, so "position" means "lesson". Phase 0 therefore only ever
 *  recycled lessons 3-4 and Phase 1 only ever lesson 1. Measured: 14 of the 38
 *  pre-A1 headwords reached the week-6 checkpoint having never appeared in a
 *  single review list, and they were the survival ones — Good morning, Welcome,
 *  Name, Number, Room, Time, Price, Free. */
export function spread(xs: string[], n: number, offset = 0): string[] {
  if (xs.length <= n) return xs;
  const step = xs.length / n;
  const out: string[] = [];
  for (let k = 0; k < n; k++) out.push(xs[Math.floor(offset + k * step) % xs.length]!);
  return Array.from(new Set(out));
}

// ============================================================
// DEPARTMENT LESSONS
//
// The spine above is one frame rendered six ways, which is what makes a
// change to it cheap. What it cannot do is a transaction only one
// department has: a room attendant who must not take cash, a therapist who
// must ask about injuries before touching anyone, a server who must not
// guess about an allergy. Ten audit reports converge on that — the two
// lowest-scoring modules are the two whose core work the spine cannot
// express.
//
// So a department may REPLACE one spine lesson. Keyed by the lessonId the
// spine would have produced, so lesson order and week structure are
// untouched. Back Office is deliberately absent: it keeps the spine
// everywhere, per the decision to leave it out of this pass.
//
// Hard constraint measured before authoring any of these: the replacement
// must carry the SAME headwords as the lesson it replaces. Weeks 1-3 sit
// at the 10-word cap, and a headword minted twice inside weeks 1-22 is a
// blocking error — the review scheduler keys on the word, so a second card
// silently overwrites the first one's schedule. Department content
// therefore lives in the grammar, speaking, reading and game, which is
// where the audits located it anyway: the complaint was never about which
// words are on the cards, it was about what the staff is shown doing.
const DEPT_LESSONS: Record<string, (lx: P0Lexicon) => LessonContent> = {
  // Housekeeping's single most-used sentence in the building, and the spine
  // has no room for it: the spine's 1.4 is a goodbye at a service counter.
  // A room attendant's goodbye happens at a door they had to be let through.
  // Wet floors and hot towels. Both were zero across all 24 spa lessons —
  // `wet`, `slippery`, `hot`, `careful` — in a department built around steam
  // rooms, showers and oil. Slipping is a spa's largest liability, and the
  // sentence that prevents it fits inside the five-word cap.
  //
  // The same lesson repairs a defect the noun substitution created: the spine
  // counts items[2] one by one ("Thirteen slippers.") and Spa's items[2] is
  // Slipper, which is issued in PAIRS. Nobody hands out 6.5 pairs. Counting
  // moves to the robe, which is issued singly, and the slipper card keeps its
  // slot as a receptive word.
  SW_2_4: (lx) =>
    lesson(lx, 2, 4, "Slippers, Tea and a Wet Floor", "Dép, trà & sàn ướt", {
      vocabulary: [
        v("Slipper", "/ˈslɪpə/", "Dép spa (đi theo đôi)", "Your slippers, madam.", "🩴"),
        v("Careful", "/ˈkeəfl/", "Cẩn thận", "Careful, madam. The floor is wet.", "⚠️"),
      ],
      grammar: [
        g(
          "How much robes?",
          "How many robes, madam?",
          "Đếm được thì dùng 'How many'; không đếm được mới dùng 'How much'. Áo choàng đếm từng cái, còn dép thì đếm theo ĐÔI — không ai đưa khách mười ba chiếc dép.",
          "How many robe, madam?",
        ),
        g(
          "Floor wet, careful.",
          "Careful, madam. The floor is wet.",
          "Sàn spa lúc nào cũng có nước. Nói TRƯỚC khi khách bước, không phải sau khi khách trượt — và nói cả khi bạn nghĩ khách đã thấy.",
          "Careful, madam. The floor is wets.",
        ),
      ],
      speaking: [
        sp(
          "Do I need slippers?",
          "Your slippers, madam.",
          "Đưa cả đôi và đặt xuống sàn cho khách xỏ — đừng đưa lên tay. Đuôi số nhiều đọc /z/ có rung, không phải /s/.",
        ),
        sp(
          "Where do I walk?",
          "Careful, madam. The floor is wet.",
          "'Careful' /ˈkeəfl/ là 'cẩn thận', 'wet' /wet/ là 'ướt' — hai từ này không có thẻ riêng nhưng phải nói được ngay. Cảnh báo sàn ướt là câu nói nhiều nhất trong ca của bạn. 'wet' kết thúc bằng /t/ phải bật ra thành tiếng. Nuốt đuôi thì khách chỉ nghe được một nguyên âm, và câu cảnh báo mất hết tác dụng.",
          undefined,
          ["careful", "wet"],
        ),
        sp(
          "That was very relaxing.",
          "Some tea, madam?",
          "Mời nước hoặc trà sau liệu trình vừa là chuẩn 5 sao vừa là yêu cầu sức khoẻ — mô vừa được tác động cần bù nước.",
        ),
      ],
      reading: read(
        `${lx.staff} gives the guest a robe and slippers. The floor near the shower is wet. ${lx.staff} says: "Careful, madam. The floor is wet." After the treatment ${lx.staff} asks: "Some tea, madam?" The guest says: "Yes, please."`,
        [
          {
            q: "Sàn ướt thì nói câu nào?",
            options: [
              "Careful, madam. The floor is wet.",
              "Floor wet, careful.",
              "Please walk slowly.",
            ],
            correct: 0,
            explanation:
              "Nói trước khi khách bước, bằng câu đủ. Trượt ngã ở khu ướt là rủi ro trách nhiệm lớn nhất của một spa.",
          },
          {
            q: "Vì sao mời trà sau liệu trình?",
            options: [
              "Vừa là chuẩn dịch vụ vừa để bù nước",
              "Để khách ở lại lâu hơn",
              "Để tính thêm tiền",
            ],
            correct: 0,
            explanation:
              "Mô vừa được tác động cần bù nước. Đây là bước chăm sóc, không phải bước bán thêm.",
          },
        ],
      ),
      game: [
        game(
          "Is the floor slippery here?",
          "Careful, madam. The floor is wet.",
          "Yes wet, careful.",
          "It is fine, madam. Please walk here.",
          undefined,
          "Trấn an trong khi sàn thật sự ướt. Sàn ướt là phải cảnh báo — đây là câu an toàn bắt buộc, không phải phép lịch sự.",
        ),
        game(
          "Do I get slippers too?",
          "Your slippers, madam.",
          "Slipper yes.",
          "One slipper now, madam. One after.",
          undefined,
          "Dép luôn đưa cả đôi, và 'slipper' số ít cũng sai.",
        ),
      ],
    }),

  // Somebody unwell in the lounge. `doctor`, `emergency`, `ambulance` and
  // `sick` were all zero across the module, and a Guest Relations officer at
  // a resort lounge door is the first person to see a guest faint in the
  // heat. The spine's 5.2 owns "one moment" and "wait" — which is exactly
  // what you say while help is coming.
  GR_5_2: (lx) =>
    lesson(lx, 5, 2, "When Someone Is Unwell", "Khi khách không khoẻ", {
      vocabulary: [
        v("Moment", "/ˈməʊmənt/", "Một lát", "One moment, please.", "⏳"),
        v("Wait", "/weɪt/", "Đợi", "Please wait here, sir.", "⏸️"),
      ],
      grammar: [
        g(
          "You sick? Sit.",
          "Are you all right, madam?",
          "Hỏi trước khi chạm vào khách, và hỏi bằng câu đủ. Khách đang choáng cần nghe một câu bình tĩnh, không phải một mệnh lệnh.",
          "Are you all right, the madam?",
        ),
        g(
          "I call doctor you wait.",
          "One moment. I will call a doctor.",
          "Nói ra là mình đang đi gọi, rồi đi gọi thật. Đừng tự đoán bệnh, đừng cho khách uống gì, và đừng bỏ khách một mình.",
          "One moment. I call a doctor.",
        ),
      ],
      speaking: [
        sp(
          "I feel dizzy.",
          "Please sit down here, madam.",
          "Mời khách ngồi TRƯỚC khi làm gì khác — người choáng ngã rất nhanh. Câu này ngắn có lý do.",
          undefined,
          ["sit", "down"],
        ),
        sp(
          "I am not well at all.",
          "One moment. I will call a doctor.",
          "Gọi bác sĩ là việc gọi ngay, không phải việc hỏi ý khách. Nói ra để khách biết có người đang lo. 'Doctor' đọc /ˈdɒktə/ — âm cuối là /ə/ nhẹ, đừng thành đốc-tơ.",
          undefined,
          ["doctor"],
        ),
        sp(
          "I have been waiting twenty minutes.",
          "I am very sorry, madam. One moment.",
          "Xin lỗi TRƯỚC, giải thích sau — và đừng giải thích gì cả nếu khách chưa hỏi. Khách phàn nàn về thời gian thì thứ họ muốn nghe đầu tiên là bạn biết họ đã chờ.",
          undefined,
          ["sorry"],
        ),
        sp(
          "Is my car here yet?",
          "One moment, madam. I will check.",
          "Đừng trả lời từ trí nhớ. Xem rồi mới nói — và nói ra là mình đang đi xem, đừng im lặng bỏ đi.",
          undefined,
          ["check"],
        ),
        sp(
          "This is not good enough.",
          "One moment. I will call my manager.",
          "Khách nói tới mức này thì việc đã vượt bạn. Gọi quản lý ngay, đừng hỏi lý do và đừng tự thanh minh — gọi nhanh là cách hạ nhiệt tốt nhất.",
          undefined,
          ["manager"],
        ),
        sp(
          "Please stay with me.",
          "Of course. Please wait here, madam.",
          "Ở lại với khách cho tới khi có người tới. Bỏ đi lấy nước cũng là bỏ khách một mình.",
        ),
      ],
      reading: read(
        `A guest at ${lx.station} looks unwell. ${lx.staff} asks: "Are you all right, madam?" The guest says: "I feel dizzy." ${lx.staff} says: "Please sit down here." ${lx.staff} does not give the guest anything to drink. ${lx.staff} says: "One moment. I will call a doctor." and stays with the guest.`,
        [
          {
            q: `Vì sao ${lx.staff} không cho khách uống gì?`,
            options: [
              "Chưa biết khách bị gì — để bác sĩ quyết",
              "Vì nước ở xa quá",
              "Vì khách chưa xin",
            ],
            correct: 0,
            explanation:
              "Cho uống nhầm có thể làm nặng thêm, và người choáng có thể sặc. Chỉ y tế mới quyết được.",
          },
          {
            q: "Việc đầu tiên phải làm là gì?",
            options: ["Mời khách ngồi xuống", "Chạy đi gọi bác sĩ ngay", "Hỏi số phòng khách"],
            correct: 0,
            explanation:
              "Người choáng ngã rất nhanh. Cho ngồi trước rồi mới gọi — và gọi mà vẫn đứng cạnh khách.",
          },
        ],
      ),
      game: [
        game(
          "I do not feel well.",
          "Please sit down here, madam.",
          "You sit.",
          "Do you want some water, madam?",
          undefined,
          "Nước là việc sau. Khách thấy trong người không ổn thì cho ngồi xuống trước đã, kẻo ngã.",
        ),
        game(
          "My husband has fallen down.",
          "One moment. I will call a doctor.",
          "He OK? He stand up?",
          "Please help him up, madam. I will get water.",
          undefined,
          "Không đỡ người vừa ngã dậy khi chưa biết thương ở đâu. Gọi y tế trước, đỡ dậy sau.",
        ),
      ],
    }),

  // Taking a table booking. `reservation` was zero across all 24 F&B lessons,
  // and "Do you have a reservation?" is the second sentence of every service.
  // The spine's 1.2 already spells a guest's name — for a restaurant that IS
  // the booking, so the same three headwords carry a real transaction instead
  // of a front-desk one.
  FB_1_2: (lx) =>
    lesson(lx, 1, 2, "Taking a Table Booking", "Nhận đặt bàn", {
      vocabulary: [
        v("Name", "/neɪm/", "Tên", "May I have your name?", "📛"),
        v("Spell", "/spel/", "Đánh vần", "How do you spell that?", "🔤"),
        v("Sir", "/sɜː/", "Thưa ông (gọi khách nam)", "Thank you. S-M-I-T-H, sir.", "🎩"),
      ],
      grammar: [
        g(
          "You book table?",
          "Do you have a booking, madam?",
          "Câu đầu tiên khi khách tới cửa nhà hàng là hỏi đã đặt bàn chưa — trước cả khi hỏi mấy người. Có đặt thì tra tên, chưa đặt thì mới xếp chỗ.",
          "Do you have booking, madam?",
        ),
        g(
          "What your name?",
          "May I have your name?",
          "Tiếng Anh cần động từ. Câu hỏi tên lịch sự là 'May I have your name?' — không nói 'What your name?'.",
          "May I have you name?",
        ),
        g(
          "Spell please.",
          "How do you spell that?",
          "Tên ghi sai thì tìm không ra phiếu đặt bàn. Đủ 26 tên chữ cái: A /eɪ/ B /biː/ C /siː/ D /diː/ E /iː/ F /ef/ G /dʒiː/ H /eɪtʃ/ I /aɪ/ J /dʒeɪ/ K /keɪ/ L /el/ M /em/ N /en/ O /əʊ/ P /piː/ Q /kjuː/ R /ɑː/ S /es/ T /tiː/ U /juː/ V /viː/ W /ˈdʌbljuː/ X /eks/ Y /waɪ/ Z /zed/.",
          "How do you spelling that?",
        ),
      ],
      speaking: [
        sp(
          "Good evening. We have a booking.",
          "May I have your name, sir?",
          "Khách nói đã đặt bàn thì hỏi tên ngay, đừng hỏi mấy người trước — tên mở ra cả phiếu đặt.",
          undefined,
          ["name"],
        ),
        sp(
          "It is Smith. S-M-I-T-H.",
          "Thank you. S-M-I-T-H, sir.",
          "Đọc lại từng chữ cái khách vừa đánh vần. Sai một chữ là tra không ra phiếu, và khách phải đứng chờ ở cửa.",
        ),
        sp(
          "No, we do not have a booking.",
          "One moment. I will check, madam.",
          "Chưa đặt bàn thì đừng nói ngay là hết chỗ. Xin khách chờ rồi đi xem sơ đồ bàn.",
          undefined,
          ["check"],
        ),
      ],
      reading: read(
        `A guest says: "Good evening. We have a booking." ${lx.staff} asks: "May I have your name, sir?" The guest says: "Smith. S-M-I-T-H." ${lx.staff} writes each letter, reads it back, and finds the booking. Then ${lx.staff} says: "This way, please."`,
        [
          {
            q: `Vì sao ${lx.staff} hỏi tên trước khi hỏi mấy người?`,
            options: [
              "Vì tên mở ra cả phiếu đặt bàn",
              "Vì khách sạn cần tên để tính tiền",
              "Vì đó là phép lịch sự",
            ],
            correct: 0,
            explanation:
              "Phiếu đặt bàn đã có số người, giờ và yêu cầu đặc biệt. Hỏi tên là lấy được tất cả cùng lúc.",
          },
          {
            q: "Khách đánh vần tên, nhân viên làm gì?",
            options: ["Ghi từng chữ rồi đọc lại", "Ghi rồi đi luôn", "Nhớ trong đầu"],
            correct: 0,
            explanation: `Bài đọc: "${lx.staff} writes each letter, reads it back" — sai một chữ là tra không ra phiếu.`,
          },
        ],
      ),
      game: [
        game(
          "Good evening. Table for two.",
          "Do you have a booking, madam?",
          "Two? OK.",
          "Yes madam, please sit anywhere you like.",
          undefined,
          "Xếp khách ngồi trước khi tra sổ đặt bàn: bàn đó có thể đã có người đặt.",
        ),
        game(
          "The booking is under Chen.",
          "Thank you. How do you spell that?",
          "Chen, OK.",
          "Chen? I do not see it, madam.",
          undefined,
          "Chưa đánh vần đã kết luận không có. Rất nhiều họ nghe giống nhau, phải xác nhận mặt chữ đã.",
        ),
      ],
    }),

  // Check-out. Five Hotel Manager reports counted it at zero occurrences
  // across all 24 lessons, and it is half of a front desk's day. It also
  // resolves a contradiction the spine created: FO's `service.close` is
  // "eleven", so the shared 3.4 frame rendered "check-in finishes at eleven"
  // one lesson after 3.4's neighbour taught that the desk never closes. No
  // hotel closes check-in; eleven was the CHECK-OUT hour wearing the wrong
  // label. Same two headwords, so the vocabulary budget is untouched.
  FO_3_4: (lx) =>
    lesson(lx, 3, 4, "Check-in and Check-out", "Giờ nhận phòng & trả phòng", {
      vocabulary: [
        v("Start", "/stɑːt/", "Bắt đầu", "Check-in starts at two.", "▶️"),
        v("Finish", "/ˈfɪnɪʃ/", "Kết thúc", "Please finish by twelve.", "⏹️"),
      ],
      grammar: [
        g(
          "What time check-in?",
          "What time is check-in?",
          "Câu hỏi cần 'is': What time IS check-in?",
          "What time it is check-in?",
        ),
        g(
          "Check-out eleven.",
          "Check-out is at twelve.",
          "Nhận phòng có giờ BẮT ĐẦU, trả phòng có giờ KẾT THÚC — hai con số khác nhau, đừng gộp. Và quầy thì không có giờ đóng: khách đến hai giờ sáng vẫn nhận phòng được.",
          "Check-out is at twelfth.",
        ),
      ],
      speaking: [
        sp(
          "What time is check-in?",
          "It starts at two, madam.",
          "Trả lời giờ bắt đầu trước. Khách đến sớm thì mới cần nói thêm, đừng dồn hết vào một câu.",
        ),
        sp(
          "What time must I leave the room?",
          "Check-out is at twelve, madam.",
          "Nói giờ trả phòng thành tiếng ngay lúc nhận phòng thì sáng hôm sau không ai bất ngờ. 'twelve' có /v/ giữa — răng trên chạm môi dưới.",
          undefined,
          ["check", "out"],
        ),
        sp(
          "Can I stay until two?",
          "One moment. I will ask my manager.",
          "Trả phòng muộn là quyết định của quản lý, không phải của bạn. Đừng hứa, cũng đừng từ chối thẳng — đi hỏi. 'Manager' đọc /ˈmænɪdʒə/, nhấn âm đầu MAN.",
          undefined,
          ["manager"],
        ),
      ],
      reading: read(
        `A guest asks: "What time is check-in?" ${lx.staff} says: "It starts at two, madam." The guest asks about leaving. ${lx.staff} says: "Check-out is at twelve." The guest asks to stay until two. ${lx.staff} does not promise. ${lx.staff} says: "One moment. I will ask my manager."`,
        [
          {
            q: "Trả phòng lúc mấy giờ?",
            options: ["Mười hai giờ", "Hai giờ", "Mười một giờ"],
            correct: 0,
            explanation: `Bài đọc: "Check-out is at twelve." Nhận phòng từ hai giờ, trả phòng trước mười hai giờ — hai con số khác nhau.`,
          },
          {
            q: "Khách xin ở thêm tới hai giờ chiều thì làm gì?",
            options: ["Hỏi quản lý rồi mới trả lời", "Đồng ý ngay", "Từ chối ngay"],
            correct: 0,
            explanation:
              "Trả phòng muộn phụ thuộc phòng hôm đó đã kín chưa — chỉ quản lý biết. Hứa liều thì khách mất chỗ, từ chối liều thì khách sạn mất doanh thu.",
          },
        ],
      ),
      game: [
        game(
          "What time can I check in?",
          "From two, madam.",
          "Two, yes yes madam.",
          "Any time, madam. The desk is open.",
          undefined,
          "Quầy trực 24/24 không có nghĩa là phòng sẵn sàng bất cứ lúc nào. Giờ nhận phòng là từ hai giờ.",
        ),
        game(
          "Is check-out at eleven?",
          "No, sir. Twelve.",
          "Eleven yes sir, correct.",
          "Yes sir, eleven o'clock in the morning.",
          undefined,
          "Gật theo giờ khách đoán. Trả phòng lúc mười hai giờ; xác nhận sai khiến khách bị tính thêm hoặc phải vội.",
        ),
      ],
    }),

  HK_1_4: (lx) =>
    lesson(lx, 1, 4, "At the Guest Room Door", "Gõ cửa, xin phép & chào ra", {
      vocabulary: [
        v("Thank you", "/ˈθæŋk juː/", "Cảm ơn", "Thank you, madam.", "🙏"),
        v("Goodbye", "/ˌɡʊdˈbaɪ/", "Tạm biệt", "Goodbye. Have a nice day.", "👋"),
      ],
      grammar: [
        g(
          "I come in.",
          "May I come in, madam?",
          "Vào phòng khách là xin phép, không phải báo trước. Gõ ba tiếng, nói rõ 'Housekeeping', rồi đợi trả lời. Không ai đáp thì gõ lại một lần nữa — vẫn không đáp thì mới mở, và mở xong vẫn phải nói lại một lần.",
          "I may come in, madam?",
        ),
        g(
          "Sign there, I clean.",
          "I will come back later.",
          "Cửa treo biển Do Not Disturb thì KHÔNG gõ, không gọi, không mở — kể cả khi đã muộn và phòng đó là phòng cuối trong ca. Ghi lại số phòng, báo giám sát, quay lại sau.",
          "I will coming back later.",
        ),
        g(
          "Finish. Bye.",
          "Thank you, madam. Goodbye.",
          "Dọn xong phải chào, đừng lặng lẽ đi ra. Khách cần biết trong phòng đã hết người.",
          "Thank you, madam. Bye bye.",
        ),
      ],
      speaking: [
        sp(
          "Yes? Who is it?",
          "Housekeeping. May I come in?",
          "Nói tên bộ phận TRƯỚC rồi mới xin phép — khách sau cánh cửa cần biết ai đang gõ trước khi quyết định mở. 'Housekeeping' trọng âm ở âm tiết đầu: HOUSE-keeping.",
          undefined,
          ["housekeeping"],
        ),
        sp(
          "Not now, please. Come back later.",
          "Yes, madam. Thank you.",
          "Khách từ chối thì cảm ơn rồi đi, không hỏi lại, không nài. Ghi lại phòng để quay lại sau.",
        ),
        sp(
          "There is a sign on my door.",
          "Yes, madam. I will come back later.",
          "Biển Do Not Disturb là câu trả lời cuối cùng, không phải lời mời hỏi lại. Không gõ, không gọi qua cửa. Ghi phòng lại rồi đi.",
        ),
        sp(
          "I am finished. Thank you!",
          "Thank you, madam. Goodbye.",
          "Câu chào ra cửa gồm hai phần: cảm ơn rồi tạm biệt. Âm /θ/ đầu 'Thank' — đầu lưỡi chạm nhẹ răng trên, đừng thành 'tank'.",
          undefined,
          ["goodbye"],
        ),
      ],
      reading: read(
        `The sign on room ${lx.roomNo.spoken} says "Do Not Disturb". ${lx.staff} does not knock and walks on. The next sign says "Make Up Room". ${lx.staff} knocks three times and says: "Housekeeping." Nobody answers. ${lx.staff} knocks again and waits. The guest opens the door. ${lx.staff} asks: "May I come in, madam?" The guest says: "Not now, please." ${lx.staff} says: "Yes, madam. Thank you." and writes the room number down.`,
        [
          {
            q: `${lx.staff} làm gì khi gõ lần đầu không ai trả lời?`,
            options: ["Gõ lại rồi đợi", "Mở cửa vào luôn", "Bỏ phòng đó cả ngày"],
            correct: 0,
            explanation: `Bài đọc: "Nobody answers. ${lx.staff} knocks again and waits." — gõ lại và đợi, không tự mở.`,
          },
          {
            q: "Khách nói chưa dọn được thì làm gì?",
            options: ["Cảm ơn, đi ra, ghi lại phòng", "Vẫn vào dọn", "Đứng đợi trước cửa"],
            correct: 0,
            explanation:
              "Ghi lại số phòng để quay lại sau — nếu không sẽ quên và phòng không được dọn.",
          },
        ],
      ),
      game: [
        game(
          "Not now, please. I am sleeping.",
          "Yes, madam. I will come later.",
          "OK I come in now.",
          "Why? I clean now.",
          undefined,
          "Khách từ chối thì rút lui và hẹn lại. Không hỏi lý do, và tuyệt đối không vào.",
        ),
        game(
          "Who is at the door?",
          "Housekeeping, madam.",
          "Me, madam. Please open the door.",
          "It is the hotel staff outside.",
          undefined,
          "Đúng ngữ pháp nhưng không cho biết bộ phận nào. Khách ở trong phòng cần nghe đúng một từ: Housekeeping.",
        ),
        game(
          "Did you see the sign on my door?",
          "Yes, madam. I did not knock.",
          "Sign? No, madam.",
          "Yes madam, but I knocked one time only.",
          undefined,
          "Có biển 'đừng làm phiền' thì gõ một lần cũng đã là sai. Thấy biển là đi tiếp, không gõ.",
        ),
        game(
          "Thank you for cleaning!",
          "Thank you, madam. Goodbye.",
          "OK bye bye.",
          "You welcome, madam. Come again.",
          undefined,
          "Câu đó kéo dài cuộc nói chuyện ngay trong phòng khách. Nhận lời cảm ơn rồi chào và ra.",
        ),
      ],
    }),

  // The spine's 4.2 hands every department the same cash-or-card counter
  // transaction. A room attendant has no till, no receipt book and no way
  // to prove what was handed over — three Hotel Manager auditors called
  // taking money in a guest room a control failure, and it is the single
  // clearest thing this module can teach about money.
  HK_4_2: (lx) =>
    lesson(lx, 4, 2, "I Cannot Take Money", "Không nhận tiền trong phòng", {
      vocabulary: [
        v("Cash", "/kæʃ/", "Tiền mặt", "I cannot take cash, madam.", "💵"),
        v("Card", "/kɑːd/", "Thẻ ngân hàng", "Reception takes your card.", "💳"),
      ],
      grammar: [
        g(
          "Give me money.",
          "I cannot take cash, madam.",
          "Nhân viên buồng phòng không thu tiền trong phòng khách: không có hoá đơn, không có máy tính tiền, và mất tiền thì không ai chứng minh được. Mọi khoản đều qua lễ tân.",
          "I do not can take cash, madam.",
        ),
        g(
          "You pay downstairs.",
          "Please pay at reception, sir.",
          "Chỉ đường bằng câu mời chứ không bằng câu sai khiến: thêm 'Please' và nói rõ chỗ.",
          "Please to pay at reception, sir.",
        ),
      ],
      speaking: [
        sp(
          "Can I pay you for the laundry?",
          "I cannot take cash, sir. Please pay at reception.",
          "Từ chối rồi phải chỉ ngay chỗ trả được — từ chối không kèm lối đi là đẩy việc cho khách. Âm /ʃ/ cuối 'cash': môi hơi tròn, hơi thoát đều.",
          undefined,
          ["cash", "reception"],
        ),
        sp(
          "Where do I pay?",
          "At reception, madam.",
          "Trả lời thẳng nơi cần đến. 'reception' trọng âm âm tiết giữa: re-CEP-tion.",
          undefined,
          ["reception"],
        ),
        sp(
          "Can I pay by card?",
          "Yes, sir. Reception takes your card.",
          "Khách hỏi thẻ thì trả lời có, và nói rõ nơi quẹt được — đừng chỉ nói 'yes' rồi để khách tự tìm.",
          undefined,
          ["reception", "card"],
        ),
      ],
      reading: read(
        `A guest says: "Here is the money for the laundry." ${lx.staff} says: "I cannot take cash, madam. Please pay at reception." The guest asks: "Can I pay by card?" ${lx.staff} says: "Yes, madam. Reception takes your card." Then ${lx.staff} writes the room number on the laundry list.`,
        [
          {
            q: `Vì sao ${lx.staff} không nhận tiền?`,
            options: [
              "Buồng phòng không thu tiền trong phòng khách",
              "Vì khách đưa thiếu tiền",
              "Vì hôm nay đã hết ca làm",
            ],
            correct: 0,
            explanation:
              "Trong phòng khách không có hoá đơn và không có máy tính tiền, nên không chứng minh được đã nhận bao nhiêu. Mọi khoản thu đều qua lễ tân.",
          },
          {
            q: `${lx.staff} chỉ khách đến đâu để trả tiền?`,
            options: ["Lễ tân", "Nhà hàng", "Phòng giặt"],
            correct: 0,
            explanation: `Bài đọc: ${lx.staff} nói "Please pay at reception."`,
          },
        ],
      ),
      game: [
        game(
          "Please take the money for the laundry.",
          "I cannot take cash, madam.",
          "OK, thank you very much, madam.",
          "Yes, madam. I will give it to reception.",
          undefined,
          "Nghe như đúng quy trình nhưng vẫn là cầm tiền của khách. Buồng phòng không cầm tiền, kể cả để chuyển hộ.",
        ),
        game(
          "So where do I pay for this?",
          "At reception, sir.",
          "Pay later.",
          "You can pay me now, sir.",
          undefined,
          "Sai quy trình thu tiền: mọi khoản đều thanh toán ở lễ tân, có hoá đơn.",
        ),
      ],
    }),

  // The spine's 3.3 is a counter answering "what time do you open?".
  // Housekeeping's version of that question is asked the other way round —
  // the department wants into the room, and the guest decides when. Two
  // Hotel Manager auditors ranked "ask before you clean" above every
  // vocabulary item in the module.
  HK_3_3: (lx) =>
    lesson(lx, 3, 3, "Now or Later?", "Dọn bây giờ hay lát nữa", {
      vocabulary: [
        v("Open", "/ˈəʊpən/", "Mở cửa", "The laundry opens at eight.", "🔓"),
        v("Close", "/kləʊz/", "Đóng cửa", "The laundry closes at four.", "🔒"),
      ],
      grammar: [
        g(
          "I clean now.",
          "May I clean now, madam?",
          "Khách trả tiền cho căn phòng đó nên khách quyết định lúc nào dọn. Hỏi rồi mới vào; hỏi xong thì làm đúng giờ khách chọn.",
          "May I to clean now, madam?",
        ),
        g(
          "Later I come.",
          "I will come back. At two, madam.",
          "Nói rõ GIỜ quay lại, đừng nói 'later' suông — khách còn sắp xếp việc của họ quanh giờ đó.",
          "I will come back at later, madam.",
        ),
      ],
      speaking: [
        sp(
          "Could you clean my room?",
          "Yes, madam. Now or later?",
          "Đừng chỉ gật rồi vào. Hỏi một câu ngắn để khách chọn giờ — câu này tiết kiệm cho bạn cả lượt quay lại vô ích.",
          undefined,
          ["later"],
        ),
        sp(
          "Later, please. At two.",
          "At two, madam. Thank you.",
          "Nhắc lại giờ khách vừa nói rồi mới cảm ơn: đó là cách duy nhất chắc chắn bạn nghe đúng giờ.",
        ),
        sp(
          "What time does the laundry open?",
          "It opens at eight, sir.",
          "Trong câu hỏi, chữ does đã mang dấu ngôi ba số ít nên động từ để nguyên: does it open. Trong câu trả lời không còn does nữa, nên chính động từ phải mang đuôi -s: it opens. Cụm /nz/ cuối phải nghe được cả hai âm.",
        ),
        sp(
          "Yes? Is that housekeeping?",
          "Housekeeping. May I clean now, madam?",
          "Câu bạn nói nhiều nhất trong cả toà nhà, và nó có hai nửa: xưng bộ phận, rồi XIN PHÉP. Bỏ nửa sau là tự cho mình quyền vào phòng người khác.",
          undefined,
          ["housekeeping", "clean"],
        ),
        sp(
          "Oh — you are still here.",
          "Good morning, madam. May I come back?",
          "Khách về giữa lúc bạn đang dọn dở thì phòng là của họ, không phải của bạn. Chào, rồi hỏi có nên quay lại sau không — đừng vừa lau vừa nói chuyện.",
        ),
      ],
      reading: read(
        `The laundry opens at eight and closes at four. ${lx.staff} knocks and asks: "May I clean now, madam?" The guest says: "Later, please. At two." ${lx.staff} says: "At two, madam. Thank you." ${lx.staff} writes room ${lx.roomNo.spoken} and two o'clock on the list, and comes back at two.`,
        [
          {
            q: "Khách muốn dọn phòng lúc mấy giờ?",
            options: ["Hai giờ", "Tám giờ", "Bốn giờ"],
            correct: 0,
            explanation: `Bài đọc: khách nói "Later, please. At two." và ${lx.staff} nhắc lại "At two, madam."`,
          },
          {
            q: `Vì sao ${lx.staff} ghi số phòng và giờ ra giấy?`,
            options: [
              "Để quay lại đúng giờ khách đã chọn",
              "Để báo cho lễ tân thu tiền",
              "Để nhớ đường về phòng đó",
            ],
            correct: 0,
            explanation:
              "Hỏi giờ rồi quên là tệ hơn không hỏi: khách đã sắp xếp việc quanh giờ đó. Ghi lại là phần bắt buộc của câu hỏi.",
          },
        ],
      ),
      game: [
        game(
          "Can you come back this afternoon?",
          "Yes, madam. What time?",
          "OK madam, this afternoon is fine.",
          "Yes, madam. I will come at some time.",
          undefined,
          "Hẹn mà không có giờ thì khách không biết chờ lúc nào. Nhận lời thì chốt giờ.",
        ),
        game(
          "What time does the laundry close?",
          "It closes at four, madam.",
          "Four.",
          "It close at four o'clock, madam.",
          undefined,
          "Chủ ngữ 'it' thì động từ phải có -s: it closeS at four.",
        ),
      ],
    }),

  // Reading the whole module end to end found week 4 contradicting itself:
  // 4.2 now teaches "I cannot take cash", and then 4.3 has the same person
  // take a payment and hand back change, and 4.4 hand over a bill. A learner
  // who reads the week in order is told the rule and shown it broken twice,
  // in the two lessons right after it. Both lessons keep their headwords and
  // their subject — quoting a price in dollars, saying a total — and lose
  // only the part where Housekeeping becomes a cashier.
  HK_4_3: (lx) =>
    lesson(lx, 4, 3, "When a Guest Asks in Dollars", "Khi khách hỏi giá bằng đô", {
      vocabulary: [
        v("Dollar", "/ˈdɒlə/", "Đô la Mỹ", `It is about ${lx.priced.usdWord} dollars.`, "💵"),
        v("Reception", "/rɪˈsepʃn/", "Quầy lễ tân", "Please pay at reception, sir.", "🛎️"),
        v("Change", "/tʃeɪndʒ/", "Tiền thối", "Your change is at reception.", "🪙"),
      ],
      grammar: [
        g(
          `${capFirst(lx.priced.usdWord)} dollar.`,
          `It is about ${lx.priced.usdWord} dollars.`,
          "Hai điều: từ 2 đô trở lên phải có -s, và luôn thêm 'about' vì tỷ giá đổi hằng ngày. Nói một con số đô chính xác là hứa một tỷ giá bạn không quyết định.",
          `It is about ${lx.priced.usdWord} dollar.`,
        ),
        g(
          "Give me the money.",
          "Please pay at reception, sir.",
          "Báo giá được, nhận tiền thì không. Câu báo giá luôn đi kèm câu chỉ chỗ trả, nếu không khách sẽ đưa tiền ngay tại chỗ.",
          "Please give the money at reception, sir.",
        ),
      ],
      speaking: [
        sp(
          "How much is that in dollars?",
          `It is about ${lx.priced.usdWord} dollars, sir.`,
          "Giữ 'about' — nói một con số đô chính xác là hứa một tỷ giá bạn không kiểm soát được. Từ này trọng âm ở âm tiết sau: a-BOUT, và /t/ cuối phải bật.",
          undefined,
          ["about"],
        ),
        sp(
          "Can I pay you in dollars?",
          "I am sorry. We take dong, sir.",
          "Xin lỗi trước rồi mới nói chính sách — từ chối trần trụi nghe như bạn đang chê tiền của khách. Rồi mới chỉ chỗ trả. 'Dong' không thêm -s, giống yen hay baht.",
          undefined,
          ["sorry", "dong"],
        ),
        sp(
          "So where do I pay?",
          "Please pay at reception, sir.",
          "Ngoại tệ hay tiền đồng cũng vậy: chỗ trả tiền là lễ tân. Trả lời gọn rồi chỉ chỗ, đừng giải thích dài.",
          undefined,
          ["reception"],
        ),
        sp(
          "Who gives me my change?",
          "Your change is at reception, madam.",
          "Ai thu tiền thì người đó thối tiền. 'change' mở đầu và kết thúc đều bằng /tʃ/ và /dʒ/ — hai âm khác nhau, đừng đọc thành 'chen'.",
          undefined,
          ["reception", "change"],
        ),
      ],
      reading: read(
        `A guest asks ${lx.staff} the price in dollars. ${lx.staff} says: "It is about ${lx.priced.usdWord} dollars, madam. We take dong." The guest takes out money. ${lx.staff} says: "Please pay at reception, madam. Reception gives your change." The guest says: "Thank you."`,
        [
          {
            q: `Vì sao ${lx.staff} nói 'about'?`,
            options: [
              "Vì tỷ giá thay đổi hằng ngày",
              "Vì khách sạn muốn khách trả bằng đô la",
              "Vì chưa biết giá",
            ],
            correct: 0,
            explanation: "Nói con số đô chính xác là hứa một tỷ giá khách sạn không quyết định.",
          },
          {
            q: `Khách đưa tiền ra, ${lx.staff} làm gì?`,
            options: ["Chỉ khách xuống lễ tân", "Nhận tiền rồi thối lại", "Bảo khách trả sau"],
            correct: 0,
            explanation:
              "Bài 2 của tuần này đã nói: buồng phòng không thu tiền. Báo giá thì được, cầm tiền thì không — kể cả khi khách đã cầm sẵn trên tay.",
          },
        ],
      ),
      game: [
        game(
          "Do you take dollars here?",
          "I am sorry. We take dong, sir.",
          "Dollar no good here, sir.",
          "Yes sir, dollars are fine here too.",
          undefined,
          "Sai thực tế: khách sạn thu tiền đồng. Hứa nhận đô rồi thu ngân từ chối là khách mất mặt ngay tại quầy.",
        ),
        game(
          "Here, take the money.",
          "Please pay at reception, madam.",
          "OK, thank you.",
          "Yes madam, I will take it for you.",
          undefined,
          "Vẫn là cầm tiền của khách. Chỉ đường tới lễ tân, không cầm hộ.",
        ),
      ],
    }),

  HK_4_4: (lx) =>
    lesson(lx, 4, 4, "The Laundry Total", "Tổng tiền đồ giặt", {
      vocabulary: [
        v("Total", "/ˈtəʊtl/", "Tổng cộng", `The total is ${lx.priced.vndWord} dong.`, "🧮"),
        v("Bill", "/bɪl/", "Hóa đơn", "Reception has your bill.", "🧾"),
      ],
      grammar: [
        g(
          `Total ${lx.priced.vndWord}.`,
          `The total is ${lx.priced.vndWord} dong.`,
          "Cần mạo từ 'The' và động từ 'is': THE total IS … Số tiền đọc liền cả cụm, và 'dong' giữ nguyên khi số nhiều (tuần 4 bài 1).",
          `The total are ${lx.priced.vndWord}.`,
        ),
        g(
          "Bill here.",
          "Reception has your bill, sir.",
          "Buồng phòng ghi phiếu, lễ tân giữ hoá đơn. Nói rõ hoá đơn ở đâu thì khách không phải đi hỏi vòng.",
          "Reception have your bill, sir.",
        ),
      ],
      speaking: [
        sp(
          "How much for the laundry?",
          `The total is ${lx.priced.vndWord} dong.`,
          "Báo tổng thành tiếng trước khi ghi phiếu — khách nghe rõ ngay tại phòng thì không tranh cãi lúc trả phòng. Âm /l/ CUỐI từ là lỗi nặng nhất của người Việt: total, bill, towel — đầu lưỡi chạm lợi trên và giữ ở đó.",
          undefined,
          ["total"],
        ),
        sp(
          "How much do I owe for the shirts?",
          "One moment, madam. I will check.",
          "Giá giặt là tính theo từng món và có bảng riêng — đừng nhẩm trong đầu rồi nói ra. Xin khách chờ, xem bảng, rồi trả lời một con số chắc chắn.",
          undefined,
          ["check"],
        ),
        sp(
          "Could I have the bill, please?",
          "Reception has your bill, madam.",
          "Không hứa mang hoá đơn lên phòng. Nói đúng nơi có hoá đơn, và nói ngay lần đầu.",
          undefined,
          ["reception", "bill"],
        ),
        sp(
          "Is the laundry on my bill?",
          "Yes, madam. On your bill.",
          "Trả lời có ngay từ đầu câu rồi mới nhắc lại chỗ. Khách hỏi câu này là đang kiểm tra chi phí, không phải đang trách.",
          undefined,
          ["bill"],
        ),
      ],
      reading: read(
        `${lx.staff} counts the laundry and says: "The total is ${lx.priced.vndWord} dong, madam." ${lx.staff} writes it on the list. The guest asks: "Could I have the bill?" ${lx.staff} says: "Reception has your bill, madam." The guest says: "Thank you." ${lx.staff} says: "Goodbye, madam."`,
        [
          {
            q: "Tổng tiền là bao nhiêu?",
            options: [`${lx.priced.vnd.toLocaleString("vi-VN")} đồng`, "Tám đô", "Chưa nói giá"],
            correct: 0,
            explanation: `Nhân viên nói "The total is ${lx.priced.vndWord} dong." — hoá đơn tính bằng tiền đồng, không phải đô.`,
          },
          {
            q: "Khách xin hoá đơn thì nói gì?",
            options: ["Hoá đơn ở lễ tân", "Mang hoá đơn lên phòng", "Hẹn khách hôm sau"],
            correct: 0,
            explanation:
              "Buồng phòng ghi phiếu, lễ tân giữ hoá đơn. Hứa mang lên phòng là hứa một việc mình không làm được.",
          },
        ],
      ),
      game: [
        game(
          "How much is the laundry?",
          `The total is ${lx.priced.vndWord} dong.`,
          `Total ${lx.priced.vndWord}.`,
          "I do not know, madam. Ask reception.",
          undefined,
          "Giá dịch vụ của chính bộ phận mình thì phải biết. Đẩy sang lễ tân ở đây là để khách đi thêm một vòng vô ích.",
        ),
        game(
          "Can you bring my bill here?",
          "Reception has your bill, sir.",
          "Bill no here.",
          "Yes sir, I will bring it to your room.",
          undefined,
          "Hoá đơn do lễ tân giữ. Hứa mang tới phòng là hứa việc mình không làm được.",
        ),
      ],
    }),

  // Lost property. The spine's 5.4 is an apology for handing over the wrong
  // item; a room attendant's version is finding something that is not theirs
  // in a room whose guest has gone out. Nothing anywhere in the six weeks
  // tells them what to do with it, and "put it back where it was" is wrong.
  HK_5_4: (lx) =>
    lesson(lx, 5, 4, "I Found Something", "Nhặt được đồ của khách", {
      vocabulary: [
        v(
          "Excuse me",
          "/ɪkˈskjuːz miː/",
          "Xin phép, xin lỗi (khi làm phiền)",
          "Excuse me, sir.",
          "🙇",
        ),
        v("Sorry", "/ˈsɒri/", "Xin lỗi (khi có lỗi)", "I am very sorry, madam.", "😔"),
      ],
      grammar: [
        g(
          "I keep it.",
          "I will tell my supervisor.",
          "Đồ nhặt trong phòng không bao giờ giữ lại và cũng không cất vào ngăn kéo. Giao cho quản lý ngay trong ca, và nói ra để có người thứ hai biết.",
          "I will tell to my supervisor.",
        ),
        g(
          "Money here, I no see.",
          "Excuse me, sir. Is this yours?",
          "Thấy đồ giá trị mà khách còn trong phòng thì hỏi ngay tại chỗ. Im lặng là tự đặt mình vào thế nghi ngờ.",
          "Excuse me, sir. Is this your?",
        ),
      ],
      speaking: [
        sp(
          "Did you see a watch in my room?",
          "Yes, madam. It is with my supervisor.",
          "Trả lời thẳng và nói rõ đồ đang ở đâu. Đừng nói 'maybe' — khách đang lo mất đồ. 'Supervisor' /ˈsuːpəvaɪzə/ là tổ trưởng ca của bạn; nhấn âm ĐẦU: SU-per-vi-sor.",
          undefined,
          ["supervisor"],
        ),
        sp(
          "Is this my phone?",
          "Excuse me, madam. Is this yours?",
          "Không tự khẳng định đồ của ai. Hỏi lại để khách xác nhận. 'yours' kết thúc bằng /z/ có rung.",
        ),
        sp(
          "I am sorry, that is not mine.",
          "I am very sorry, madam.",
          "Nhầm thì xin lỗi đầy đủ 'I am very sorry' rồi mang đồ đi giao, đừng chỉ nói 'sorry' cụt.",
        ),
      ],
      reading: read(
        `${lx.staff} cleans room ${lx.roomNo.spoken} and finds a watch under a ${lx.items[2].word.toLowerCase()}. The guest is out. ${lx.staff} does not put it in a drawer. ${lx.staff} tells the supervisor and writes the room number and the time. Later the guest asks: "Did you see a watch?" ${lx.staff} says: "Yes, madam. It is with my supervisor."`,
        [
          {
            q: `${lx.staff} làm gì với chiếc đồng hồ nhặt được?`,
            options: [
              "Giao cho quản lý và ghi lại phòng, giờ",
              "Cất vào ngăn kéo trong phòng",
              "Giữ đến khi khách hỏi",
            ],
            correct: 0,
            explanation:
              "Giao ngay trong ca và ghi lại. Cất vào ngăn kéo thì khách tìm không ra và không ai biết ai đã động vào.",
          },
          {
            q: "Vì sao phải báo quản lý ngay?",
            options: [
              "Để có người thứ hai biết, không bị nghi ngờ",
              "Vì quản lý sẽ giữ làm của mình",
              "Vì nhân viên không được vào phòng",
            ],
            correct: 0,
            explanation:
              "Một mình biết là một mình chịu ngờ vực. Báo ngay là cách tự bảo vệ, không phải thủ tục hình thức.",
          },
        ],
      ),
      game: [
        game(
          "This is for you. Thank you.",
          "Thank you very much, madam.",
          "No no, madam.",
          "I cannot take cash, madam.",
          undefined,
          "Tiền BOA khác tiền THANH TOÁN: khách tự nguyện đưa cho bạn thì nhận bằng lời cảm ơn và xử theo quy định boa của khách sạn. Đáp án thứ ba là câu cho tiền giặt là — dùng nhầm ở đây là từ chối một món quà.",
        ),
        game(
          "There is money on the table.",
          "Excuse me, sir. Is this yours?",
          "I no touch, sir.",
          "I will put it away, sir.",
          undefined,
          "Không tự cất tiền của khách đi đâu cả. Hỏi ngay tại chỗ, trước mặt khách.",
        ),
        game(
          "I lost my ring in the room.",
          "One moment, madam. I will ask my supervisor.",
          "Not here, madam.",
          "Sorry madam, I did not see it.",
          undefined,
          "Tự phủ nhận là tự đặt mình vào thế bị nghi. Đồ thất lạc phải báo cấp trên để có người thứ hai cùng biết.",
        ),
      ],
    }),

  // The one question a therapist must ask before touching anybody, and the
  // spine has no slot for it: 3.4 is "what time do we start?". Here the
  // start is the screening. Injury, allergy and pregnancy each change or
  // cancel a treatment, and none of the six weeks currently says so.
  // The key. `key`, `key card` and `master key` were zero across all 24
  // Housekeeping lessons — and "I lost my key, open 812 for me" is what a
  // stranger says in a corridor, several times a week, to the one member of
  // staff who can physically open the door. The module already spends a whole
  // lesson refusing cash, a rarer event by far.
  //
  // Worse, it compounded: HK_6_1 has a room attendant asking a guest their
  // name at the room door, so a learner left week 6 holding the first half of
  // exactly the wrong sequence — collect a name, and no sentence to refuse.
  // The spine's 5.3 headwords fit this without a change: `This way` points at
  // reception, `Here you are` hands over the towel that was the real request.
  HK_5_3: (lx) =>
    lesson(lx, 5, 3, "I Cannot Open the Door", "Không mở cửa phòng cho ai", {
      vocabulary: [
        v(
          "Here you are",
          "/hɪə juː ɑː/",
          "Đây ạ (khi đưa đồ cho khách)",
          "Here you are, madam.",
          "🤲",
        ),
        v("This way", "/ðɪs weɪ/", "Mời đi lối này", "This way to reception.", "➡️"),
      ],
      grammar: [
        g(
          "OK, I open.",
          "I am sorry, sir. I cannot open the door.",
          "Tên và số phòng KHÔNG phải là quyền vào phòng — người lạ nghe được cả hai chỉ bằng cách đứng gần quầy. Chìa khoá do lễ tân cấp sau khi xem giấy tờ. Bạn không có cách nào kiểm chứng, nên bạn không phải là người quyết định.",
          "I am sorry, sir. I cannot open door.",
        ),
        g(
          "Go there.",
          "This way to reception, madam.",
          "Từ chối rồi phải chỉ ngay lối đi. Từ chối suông là đẩy việc cho khách, và khách sẽ đi hỏi người khác dễ tính hơn.",
          "This way to the reception, madam.",
        ),
      ],
      speaking: [
        sp(
          "I lost my key. Can you open my room?",
          "I am sorry, sir. I cannot open the door.",
          "Nói bằng giọng bình thường, không hạ giọng như đang giấu. Đây là quy định của khách sạn, không phải quyết định của bạn — và khách thật sự sẽ hiểu ngay.",
          undefined,
          ["open", "door"],
        ),
        sp(
          "Where do I get a new key?",
          "This way to reception, sir.",
          "Chỉ lối bằng bàn tay mở và nói rõ nơi đến. Đừng rời xe đẩy và đừng bỏ phòng đang mở để dẫn khách đi.",
          undefined,
          ["reception"],
        ),
        sp(
          "Could I have a clean towel?",
          "Here you are, madam.",
          "Việc bạn LÀM được thì làm ngay và làm vui vẻ — khăn sạch có sẵn trên xe đẩy nên trao được liền, không cần bước đi kiểm. Đồ phải đi lấy ở kho thì mới kiểm trước rồi hứa sau (tuần 2 bài 3). Từ chối một việc không có nghĩa là từ chối cả người.",
        ),
      ],
      reading: read(
        `A man at the door of room ${lx.roomNo.spoken} says: "I lost my key." ${lx.staff} does not open the door. ${lx.staff} does not ask his name. ${lx.staff} says: "I am sorry, sir. I cannot open the door. This way to reception." The man goes to reception. Later a guest asks for a towel and ${lx.staff} says: "Here you are, madam."`,
        [
          {
            q: `Vì sao ${lx.staff} không hỏi tên người đó?`,
            options: [
              "Vì tên không chứng minh được quyền vào phòng",
              "Vì hỏi tên là bất lịch sự",
              "Vì đã biết tên khách rồi",
            ],
            correct: 0,
            explanation:
              "Xin lỗi rồi mới từ chối, và chỉ ngay lối đi — từ chối suông làm khách thật sự thấy mình bị nghi. Người lạ nghe được tên và số phòng chỉ bằng cách đứng gần quầy. Hỏi tên rồi mở cửa là tự biến mình thành khoá cuối cùng — mà bạn không có cách nào kiểm chứng.",
          },
          {
            q: "Từ chối xong thì làm gì?",
            options: ["Chỉ khách xuống lễ tân", "Đứng im", "Bảo khách tự tìm"],
            correct: 0,
            explanation: `Bài đọc: "This way to reception." — từ chối suông là đẩy việc cho khách, và khách sẽ đi hỏi người khác dễ tính hơn.`,
          },
        ],
      ),
      game: [
        game(
          "I lost my key. Open the door, please.",
          "I am sorry, sir. I cannot open the door.",
          "OK sir, one moment.",
          "What is your name, sir?",
          undefined,
          "Hỏi tên nghe rất hợp lý, và đó chính là chỗ nguy hiểm: tên đúng không chứng minh được gì, nhưng hỏi xong thì bạn đã tự đặt mình vào thế phải quyết định. Câu duy nhất an toàn là không mở, và chỉ lối xuống lễ tân.",
        ),
        game(
          "Can I borrow your key?",
          "I am sorry, sir. I cannot.",
          "OK, but quickly, sir.",
          "My key is only for cleaning, sir.",
          undefined,
          "Chìa tầng mở được nhiều phòng — nó không rời tay bạn, không cho mượn, không có ngoại lệ. Đáp án thứ ba giải thích đúng mà vẫn sai: giải thích xong người ta sẽ mặc cả, còn lời từ chối gọn thì không mở cửa cho cuộc mặc cả nào.",
        ),
        game(
          "So where do I go?",
          "This way to reception, madam.",
          "Reception there.",
          "Downstairs, madam. Please ask someone there.",
          undefined,
          "Đáp án thứ ba đúng hướng nhưng đẩy khách đi hỏi một người vô danh. Nói rõ TÊN nơi đến — khách đang bực vì mất chìa, đừng bắt họ đoán tiếp.",
        ),
      ],
    }),

  // Reporting a fault. `broken`, `not working` and `maintenance` were zero, and
  // after the key this is the second most common thing a guest says to a room
  // attendant. The spine's 5.2 already owns "one moment" and "wait" — which is
  // what you say while you fetch somebody who can fix it.
  HK_5_2: (lx) =>
    lesson(lx, 5, 2, "Something Is Broken", "Báo hỏng trong phòng", {
      vocabulary: [
        v("Moment", "/ˈməʊmənt/", "Một lát", "One moment, please.", "⏳"),
        v("Wait", "/weɪt/", "Đợi", "Please wait here, sir.", "⏸️"),
        v("Careful", "/ˈkeəfl/", "Cẩn thận", "Careful, madam. The floor is wet.", "⚠️"),
      ],
      grammar: [
        g(
          "Water no good.",
          "One moment. I will call maintenance.",
          "Buồng phòng không tự sửa, nhưng buồng phòng là mắt của kỹ thuật. Báo ngay trong ca, và nói cho khách biết bạn đang đi gọi ai — im lặng bỏ đi khiến khách tưởng bị phớt lờ.",
          "One moment. I will call to maintenance.",
        ),
        g(
          "You wait here.",
          "Please wait here, madam.",
          "Thêm 'Please' ở đầu và 'madam' ở cuối để câu thành lời mời chứ không thành mệnh lệnh.",
          "Please waiting here, madam.",
        ),
      ],
      speaking: [
        sp(
          "The air conditioner is not working.",
          "One moment. I will call maintenance.",
          "Nghe xong nói ngay mình sẽ gọi ai. 'maintenance' trọng âm âm tiết đầu: MAIN-te-nance.",
          undefined,
          ["maintenance"],
        ),
        sp(
          "The hot water is cold.",
          "I am very sorry, madam. One moment.",
          "Xin lỗi trước, sửa sau. Khách đang khó chịu thật, đừng giải thích trước khi xin lỗi.",
        ),
        sp(
          "Is someone coming today?",
          "One moment, madam. I will check.",
          "Đừng gật cho xong. Xem sổ báo hỏng hoặc gọi kỹ thuật rồi mới trả lời — khách sẽ sắp xếp cả buổi chiều quanh câu trả lời của bạn.",
          undefined,
          ["check"],
        ),
        sp(
          "How long will it take?",
          "Please wait here, madam.",
          "Đừng đoán thời gian sửa — bạn không phải người sửa. Xin khách chờ rồi để kỹ thuật nói con số, và nói rõ bạn đang đi gọi họ.",
          undefined,
          ["wait"],
        ),
        sp(
          "My son is by your trolley.",
          "Careful, madam. One moment.",
          "Trên xe đẩy có hoá chất và đồ nặng. Cảnh báo trước, rồi tự tay đẩy xe ra xa — đừng chờ khách gọi con lại. 'Trolley' là xe đẩy của bạn; từ này không có thẻ riêng nhưng nghe được là phải hiểu.",
          undefined,
          ["careful"],
        ),
        sp(
          "Can I walk here?",
          "Careful, madam. The floor is wet.",
          "Câu này nói nhiều nhất trong cả ca của bạn: mỗi lần đặt cây lau xuống là một lần phải nói. Nói TRƯỚC khi khách bước, không nói sau. 'Careful' trọng âm âm tiết đầu: CARE-ful.",
          undefined,
          ["careful", "wet"],
        ),
      ],
      reading: read(
        `A guest in room ${lx.roomNo.spoken} says: "The air conditioner is not working." ${lx.staff} does not try to fix it. ${lx.staff} says: "I am very sorry, madam. One moment. I will call maintenance." ${lx.staff} writes the room number down and calls. Then ${lx.staff} says: "Please wait here, madam."`,
        [
          {
            q: `Vì sao ${lx.staff} không tự sửa?`,
            options: [
              "Vì sửa máy là việc của kỹ thuật",
              "Vì không có thời gian",
              "Vì khách chưa yêu cầu",
            ],
            correct: 0,
            explanation:
              "Tự sửa mà hỏng thêm thì trách nhiệm thuộc về bạn. Buồng phòng là mắt của kỹ thuật, không phải tay của kỹ thuật.",
          },
          {
            q: "Khách hỏi bao lâu thì xong, nên nói gì?",
            options: ["Xin khách chờ", "Đoán một con số", "Nói là nhanh thôi"],
            correct: 0,
            explanation:
              "Đoán một con số là hứa thay người khác. Hứa mười phút mà kỹ thuật tới sau bốn mươi phút thì người bị trách là bạn.",
          },
        ],
      ),
      game: [
        game(
          "The light in the bathroom is broken.",
          "One moment. I will call maintenance.",
          "Light broken? OK.",
          "I will fix it now, madam. No problem.",
          undefined,
          "Nhận sửa nghe rất tận tình, nhưng bạn không phải thợ điện. Sửa hỏng thêm thì trách nhiệm chuyển sang bạn, và khách vẫn phải chờ kỹ thuật.",
        ),
        game(
          "Will it take long?",
          "Please wait here, madam.",
          "No, quick.",
          "Ten minutes, madam. Maybe fifteen.",
          undefined,
          "Con số nghe cụ thể và trấn an, nhưng bạn không kiểm soát được nó. Hứa thay kỹ thuật là cách chắc chắn nhất để bị trách khi họ tới muộn.",
        ),
        game(
          "You did not clean my room today.",
          "I am very sorry, madam. I will call my manager.",
          "Not me, madam. Other people clean.",
          "I am very sorry, madam. I will clean it now.",
          undefined,
          "Đáp án thứ ba nghe rất tận tình và vẫn sai: khách đang phàn nàn về cả ca làm, không phải đang xin dọn phòng. Việc này lên quản lý — và đáp án thứ hai thì đổ cho đồng nghiệp ngay trước mặt khách.",
        ),
        game(
          "Can I come past?",
          "Careful, madam. The floor is wet.",
          "Wet, madam. Careful careful.",
          "Yes madam, please walk here. It is dry.",
          undefined,
          "Đáp án thứ ba mời khách đi qua một chỗ bạn vừa lau. Sàn còn ướt thì cảnh báo, không mời — và đừng bảo đảm chỗ nào khô khi bạn chưa sờ vào.",
        ),
      ],
    }),

  // The corridor. The spine's 5.1 seats a guest — "Please have a seat" — which
  // belongs at a desk or a restaurant; there is no chair outside room 812, and
  // offering one inside a guest's own room is meaningless. Same headwords, same
  // teaching point (accept warmly and act), moved to where this department
  // actually stands.
  HK_5_1: (lx) =>
    lesson(lx, 5, 1, "Yes, Right Away", "Nhận việc ngay tại cửa", {
      vocabulary: [
        v("Please", "/pliːz/", "Làm ơn, xin mời", "Please tell me, madam.", "🙏"),
        v("Of course", "/əv ˈkɔːs/", "Vâng, dĩ nhiên rồi", "Of course, madam.", "✔️"),
        v("Certainly", "/ˈsɜːtnli/", "Chắc chắn rồi (trang trọng)", "Certainly, sir.", "👍"),
      ],
      grammar: [
        g(
          "Room now, OK.",
          "Of course, madam. Right away.",
          "Nhận việc thì nhận rõ ràng và nói khi nào làm. 'Right away' nghĩa là làm ngay bây giờ — chỉ nói khi bạn làm được ngay thật.",
          "Of course, madam. Right way.",
        ),
        g(
          "You want what?",
          "Please tell me, madam.",
          "Hỏi khách cần gì bằng một lời mời, không bằng một câu cộc. Câu này mở, nên khách nói ra được cả những việc họ ngại nhờ.",
          "Please telling me, madam.",
        ),
      ],
      speaking: [
        sp(
          "Could you clean the bathroom first?",
          "Certainly, madam. Right away.",
          "'Certainly' là lời nhận việc trang trọng nhất, và không mất thêm giây nào so với cách nói cộc. Trọng âm âm tiết đầu: CER-tain-ly.",
          undefined,
          ["right", "away"],
        ),
        sp(
          "I need something for the room.",
          "Please tell me, madam.",
          "Khách nói mơ hồ thì mời họ nói rõ, đừng đoán rồi mang sai đồ.",
          undefined,
          ["tell"],
        ),
        sp(
          "Can you come back in ten minutes?",
          "Of course, madam. Ten minutes.",
          "Nhắc lại con số khách vừa nói rồi mới đi. Đó là cách duy nhất chắc chắn bạn quay lại đúng lúc.",
        ),
      ],
      reading: read(
        `A guest opens the door and says: "I need something for the room." ${lx.staff} stays by the trolley and says: "Please tell me, madam." The guest asks: "Could you clean the bathroom first?" ${lx.staff} says: "Certainly, madam. Right away." Then the guest asks for two more towels. ${lx.staff} says: "One moment, madam. I will check."`,
        [
          {
            q: `Khách nói mơ hồ, ${lx.staff} làm gì?`,
            options: ["Mời khách nói rõ", "Đoán rồi đi lấy", "Bảo khách gọi lễ tân"],
            correct: 0,
            explanation: `Bài đọc: "Please tell me, madam." — đoán rồi mang sai đồ là mất hai lượt đi lại.`,
          },
          {
            q: `Vì sao ${lx.staff} đứng cạnh xe đẩy?`,
            options: ["Không rời xe đẩy và phòng đang mở", "Vì hành lang chật", "Vì đang mệt"],
            correct: 0,
            explanation:
              "Trên xe đẩy có đồ vải sạch, hoá chất và chìa tầng, và cửa phòng thì đang mở. Rời khỏi cả hai, dù chỉ một phút, là để lại hai thứ vô chủ.",
          },
        ],
      ),
      game: [
        game(
          "Could you empty the bin, please?",
          "Certainly, madam. Right away.",
          "Bin? OK.",
          "Of course madam, I will do it some time today.",
          undefined,
          "'Some time today' nghe như đang nhận lời nhưng thực ra là một lời hứa không có mốc. Khách sẽ tự đặt mốc, và bạn sẽ trễ so với mốc đó.",
        ),
        game(
          "I need a few things, please.",
          "Please tell me, madam.",
          "Something? OK madam.",
          "Of course, madam. I will bring towels.",
          undefined,
          "Đáp án thứ ba nghe chủ động, nhưng khách chưa nói cần gì. Đoán rồi mang sai đồ là mất hai lượt đi lại và khách phải nhờ lại từ đầu.",
        ),
      ],
    }),

  // Week 6 lesson 1 rendered for Housekeeping put a room attendant at a guest
  // room door, welcoming an arriving guest and asking their name — the first
  // half of exactly the sequence HK_5_3 exists to stop, sitting in the last
  // week before the checkpoint. The Hotel Manager review called it the
  // module's blocker. Same headwords, same function (greet, use the name),
  // moved to the corridor where this department actually meets people: after
  // check-in, from a list that already has the name on it.
  HK_6_1: (lx) =>
    lesson(lx, 6, 1, "Meeting a Guest", "Gặp khách ở hành lang", {
      vocabulary: [
        v("Guest", "/ɡest/", "Khách", "The guest is out, madam.", "🧳"),
        v(
          "Ms",
          "/mɪz/",
          "Cô/Bà (khi chưa rõ khách đã lập gia đình hay chưa)",
          "Good morning, Ms Smith.",
          "🪪",
        ),
      ],
      grammar: [
        g(
          "Morning. You Missus Smith?",
          "Good morning, Ms Smith.",
          "Tên khách nằm trên danh sách phòng của bạn — đọc ở đó, đừng hỏi khách ở cửa. Gọi bằng HỌ kèm Ms; hỏi tên tại cửa phòng chính là nửa đầu của chuỗi mà bài 5.3 dạy bạn chặn.",
          "Good morning, Ms Anna.",
        ),
        g(
          `The guest want ${lx.items[0].word.toLowerCase()}.`,
          `The guest is out. Room ${lx.roomNo.spoken}.`,
          "Báo đồng nghiệp thì báo bằng SỐ PHÒNG, không bằng tên khách. Và 'guest' số ít đi với 'is'.",
          `The guest out. Room ${lx.roomNo.spoken}.`,
        ),
      ],
      speaking: [
        sp(
          `Good morning. I am Anna Smith, room ${lx.roomNo.spoken}.`,
          "Good morning, Ms Smith.",
          "Khách tự xưng tên thì dùng lại HỌ ngay. Danh xưng ở đây đọc /mɪz/, có rung ở âm cuối — cách đọc /mɪs/ là một từ khác hẳn. Không chắc khách đã lập gia đình chưa thì luôn dùng dạng có rung.",
        ),
        sp(
          "Hello. Are you cleaning my room now?",
          "Yes, madam. May I come in?",
          "Gặp khách ngay tại cửa thì vẫn xin phép, dù bạn đang đứng sẵn ở đó với xe đẩy. Khách là người quyết định lúc nào bạn vào.",
        ),
        sp(
          `Is anyone in ${lx.roomNo.spoken}?`,
          "Nobody is inside. The guest is out.",
          "Đây là lượt nói với ĐỒNG NGHIỆP, không phải với khách — và ngay cả với đồng nghiệp cũng chỉ nói phòng có người hay không, không nói khách đi đâu.",
          "colleague",
        ),
      ],
      reading: read(
        `${lx.staff} is in the corridor with the trolley. A guest says: "Good morning. I am Anna Smith, room ${lx.roomNo.spoken}." ${lx.staff} does not ask for the name again and says: "Good morning, Ms Smith. May I clean now?" The guest says: "Yes, please." Later a colleague asks about room ${lx.roomNo.spoken} and ${lx.staff} says: "The guest is out, madam."`,
        [
          {
            q: `Vì sao ${lx.staff} không hỏi lại tên khách?`,
            options: [
              "Vì khách vừa tự nói tên rồi",
              "Vì hỏi tên là bất lịch sự",
              "Vì buồng phòng không cần biết tên",
            ],
            correct: 0,
            explanation:
              "Khách vừa nói ra tên và số phòng. Hỏi lại là bắt khách nói hai lần — và ở cửa phòng, hỏi tên còn là bước đầu của chuỗi mà bài 5.3 dạy bạn dừng lại.",
          },
          {
            q: "Với đồng nghiệp thì nói gì về phòng đó?",
            options: ["Khách đang ra ngoài", "Tên khách và giờ khách về", "Không nói gì cả"],
            correct: 0,
            explanation: `Bài đọc: "The guest is out, madam." — đủ để đồng nghiệp biết vào dọn được, và không lộ gì thêm về khách.`,
          },
        ],
      ),
      game: [
        game(
          "Good morning. I am Anna Smith.",
          "Good morning, Ms Smith.",
          "Hello Anna.",
          "Good morning, madam. Welcome to Lotus Bay. May I have your name?",
          undefined,
          "Đáp án thứ ba là lời chào của LỄ TÂN, dành cho khách vừa tới. Buồng phòng gặp khách đã nhận phòng từ hôm trước — và hỏi tên ngay tại cửa phòng là việc bài 5.3 dạy bạn không làm.",
        ),
        game(
          "Which room is Mrs Chen in?",
          "I am sorry, madam. Please ask at reception.",
          `Room ${lx.roomNo.spoken}.`,
          `She is on the ${lx.floor.ordinal} floor, madam.`,
          undefined,
          "Nói tầng nghe như đã giữ kín số phòng, nhưng nó xác nhận khách đang ở đây và thu hẹp còn một hành lang. Người cầm chìa tầng thì không trả lời câu hỏi kiểu này.",
        ),
      ],
    }),

  // The front desk never closes — FO_3_3 is a whole lesson saying so — and
  // then week 6 lesson 3 rendered "We open at two" for Front Office five
  // times in one lesson, because the spine reads service.open and for this
  // department that field is the CHECK-IN hour. The last lesson but one
  // before the checkpoint, contradicting the safety lesson three weeks back.
  FO_6_3: (lx) =>
    lesson(lx, 6, 3, "Time & Price Together", "Giờ giấc & giá tiền", {
      vocabulary: [
        v("Again", "/əˈɡen/", "Lại, lần nữa", "Could you say that again?", "🔁"),
        v("Understand", "/ˌʌndəˈstænd/", "Hiểu", "I understand, madam.", "💡"),
      ],
      grammar: [
        g(
          `Check-in two, price ${lx.priced.vndWord} dong.`,
          `Check-in starts at two. ${capFirst(lx.priced.vndWord)} dong.`,
          "Ôn tuần 3 và tuần 4 trong một câu. Chú ý cái được nói ra là GIỜ NHẬN PHÒNG, không phải giờ mở cửa: quầy lễ tân không có giờ mở cửa.",
          `Check-in start at two. ${capFirst(lx.priced.vndWord)} dong.`,
        ),
        g(
          "I no understand.",
          "Sorry, I do not understand.",
          "Phủ định cần trợ động từ: I DO NOT understand. Xin lỗi trước rồi nhờ khách nhắc lại.",
          "Sorry, I do not understanding.",
        ),
      ],
      speaking: [
        sp(
          "Sorry, I did not understand.",
          "I am sorry, madam. I will say it again.",
          "Khách chưa hiểu thì nhắc lại CHẬM HƠN, đừng nhắc lại to hơn. Nói ra là mình sẽ nhắc lại thì khách yên tâm hỏi tiếp.",
        ),
        sp(
          "Sorry, what time and how much?",
          `Check-in starts at two. ${capFirst(lx.priced.vndWord)} dong.`,
          "Khách hỏi hai thông tin thì trả lời tách thành hai câu ngắn, nghỉ hẳn một nhịp giữa hai câu.",
        ),
        sp(
          "Is the desk open at midnight?",
          "Yes, sir. We never close.",
          "Ôn tuần 3: quầy trực suốt đêm. Đừng bao giờ nói ra một giờ đóng cửa — khách có việc lúc hai giờ sáng sẽ không xuống nữa.",
        ),
      ],
      reading: read(
        `A guest asks ${lx.staff} about check-in and the ${lx.priced.en}. ${lx.staff} says: "Check-in starts at two, madam. ${capFirst(lx.priced.vndWord)} dong." The guest says: "Sorry, could you say that again?" ${lx.staff} says it again, slowly. Then the guest asks about the night and ${lx.staff} says: "We never close, madam."`,
        [
          {
            q: "Khách nhận phòng được từ mấy giờ?",
            options: ["Hai giờ", "Nửa đêm", "Sáu giờ"],
            correct: 0,
            explanation: `Bài đọc: "Check-in starts at two." — đó là giờ NHẬN PHÒNG, khác với giờ trực của quầy.`,
          },
          {
            q: "Ban đêm quầy lễ tân thế nào?",
            options: ["Luôn có người", "Đóng lúc mười một giờ", "Chỉ mở khi có khách gọi"],
            correct: 0,
            explanation: `Bài đọc: "We never close." — quầy trực 24 giờ, và đó là điểm khác biệt của bộ phận này.`,
          },
        ],
      ),
      game: [
        game(
          "Sorry, could you speak slowly?",
          "Of course, madam. Slowly.",
          "Slow, yes. I speak slow now.",
          "Of course, madam. I speak more loudly.",
          undefined,
          "Nói TO hơn không giúp gì khi khách chưa nghe kịp — âm lượng không phải tốc độ, và nói to còn nghe như mất kiên nhẫn.",
        ),
        game(
          "What time do you open?",
          "We never close, sir. Check-in starts at two.",
          "Two, sir.",
          "We open at two, sir.",
          undefined,
          "Câu hỏi trộn hai thứ vào một. Quầy không có giờ mở cửa; cái có giờ là việc nhận phòng. Trả lời 'We open at two' là dạy khách rằng trước hai giờ không có ai ở quầy.",
        ),
      ],
    }),

  // Week 6 lesson 2 is the spine's "Room, Floor & Items", and it hands every
  // department a Front Office job: read the room list, hand a room number to a
  // colleague, tell a guest whether their ROOM is ready. Four Hotel Manager
  // reviews flagged it separately — a waiter, a spa therapist and a lounge
  // host do not do that. Same two headwords (Ready, Bring), same two moves
  // (confirm a place, promise to fetch), pointed at what each department
  // actually has: a table, a treatment room, a lounge seat.
  FB_6_2: (lx) =>
    lesson(lx, 6, 2, "Table & Order Together", "Bàn & đồ mang tới", {
      vocabulary: [
        v("Ready", "/ˈredi/", "Đã sẵn sàng", "Your table is ready.", "✅"),
        v(
          "Bring",
          "/brɪŋ/",
          "Mang tới",
          `I will bring two ${lx.items[0].word.toLowerCase()}s.`,
          "🛎️",
        ),
      ],
      grammar: [
        g(
          "Table ten ready.",
          "Table ten is ready, madam.",
          "Ôn tuần 2 và tuần 5: câu cần 'is', và số bàn đọc như số đếm bình thường — khác số phòng, vốn đọc từng chữ số.",
          "Table ten ready, madam.",
        ),
        g(
          `I bring two ${lx.items[0].word.toLowerCase()}.`,
          `I will bring two ${lx.items[0].word.toLowerCase()}s.`,
          "Ôn hai lỗi cùng lúc: thiếu 'will' cho việc sắp làm, và thiếu -s số nhiều.",
          `I will bring two ${lx.items[0].word.toLowerCase()}.`,
        ),
      ],
      speaking: [
        sp(
          "We have a booking. Is our table ready?",
          "Your table is ready, madam.",
          "Lượt này diễn ra SAU khi đồng nghiệp vừa xác nhận bàn (lượt bàn giao ngay dưới) — chưa ai kiểm thì câu đúng là xin khách chờ để đi xem. Trả lời thẳng vào cái khách hỏi, và nói 'your table' chứ không nói 'the table'.",
        ),
        sp(
          "Is table ten ready?",
          "Table ten is ready. Two guests.",
          "Đây là lượt bàn giao với ĐỒNG NGHIỆP: nói số bàn rồi nói số khách, đúng thứ tự đó. Với khách thì câu trả lời khác hẳn.",
          "colleague",
        ),
        sp(
          `Could you bring two ${lx.items[0].word.toLowerCase()}s to table ten?`,
          `Two ${lx.items[0].word.toLowerCase()}s to table ten. One moment.`,
          "Nhắc lại SỐ LƯỢNG và SỐ BÀN rồi mới đi. Sai một trong hai là đi lại hai lần, và bàn bên cạnh phải chờ thêm.",
        ),
      ],
      reading: read(
        `A colleague asks ${lx.staff}: "Is table ten ready?" ${lx.staff} looks at the table and says: "Table ten is ready. Two guests." Then two guests arrive. ${lx.staff} says: "Good evening. Your table is ready, madam." One guest asks for two ${lx.items[0].word.toLowerCase()}s and ${lx.staff} says: "Two ${lx.items[0].word.toLowerCase()}s to table ten. One moment."`,
        [
          {
            q: `${lx.staff} nói gì với ĐỒNG NGHIỆP?`,
            options: ["Số bàn và số khách", "Tên khách", "Món khách sẽ gọi"],
            correct: 0,
            explanation: `Bài đọc: "Table ten is ready. Two guests." — bàn giao giữa nhân viên chỉ cần hai con số đó.`,
          },
          {
            q: "Vì sao nhắc lại yêu cầu trước khi đi lấy?",
            options: [
              "Để khách sửa ngay nếu mình nghe sai",
              "Để khách biết mình lịch sự",
              "Vì bếp yêu cầu như vậy",
            ],
            correct: 0,
            explanation:
              "Nhắc lại là lần duy nhất khách sửa được trước khi bạn rời bàn. Bỏ bước này thì lỗi chỉ lộ ra lúc đồ đã bưng tới.",
          },
        ],
      ),
      game: [
        game(
          "Is our table ready?",
          "Your table is ready, madam.",
          "Table ready.",
          "Your room is ready, madam.",
          undefined,
          "Nhà hàng không xếp phòng cho khách. Đáp án thứ ba đúng ngữ pháp nhưng thuộc về lễ tân — và khách đang đứng ở cửa phòng ăn sẽ không hiểu bạn nói gì.",
        ),
        game(
          `Could you bring two ${lx.items[0].word.toLowerCase()}s?`,
          `Two ${lx.items[0].word.toLowerCase()}s. One moment, madam.`,
          `Six ${lx.items[0].word.toLowerCase()}.`,
          `Yes madam, I bring now.`,
          undefined,
          "Nhắc lại con số rồi mới đi. Và việc sắp làm cần 'will': 'I bring now' thiếu trợ động từ mà cả tuần 2 lẫn tuần 6 đều dạy.",
        ),
        game(
          "Is table ten free now?",
          "One moment, sir. I will check.",
          "Table ten free yes.",
          "Yes, sir. Table ten is free.",
          undefined,
          "Đáp án thứ ba đúng ngữ pháp nhưng hứa một cái bàn mà chưa nhìn sổ. Bàn trống trên sổ và bàn trống ngoài phòng ăn là hai chuyện — khách đã ngồi xuống rồi mà phải đứng lên là mất cả bữa.",
        ),
        game(
          "Can I charge it to my room?",
          "Of course. Your name and room, sir?",
          "Room? OK sir.",
          "Of course, sir. No problem.",
          undefined,
          "Ghi nợ vào phòng thì phải có số phòng và chữ ký — đó là toàn bộ phần kiểm soát mà nhân viên bàn nắm. 'No problem' nghe dễ chịu nhưng nó bỏ qua đúng bước đó, và hoá đơn sẽ không về được phòng nào cả.",
        ),
      ],
    }),

  SW_6_2: (lx) =>
    lesson(lx, 6, 2, "The Room & the Time", "Phòng trị liệu & giờ hẹn", {
      vocabulary: [
        v("Ready", "/ˈredi/", "Đã sẵn sàng", "The room is ready, madam.", "✅"),
        v(
          "Bring",
          "/brɪŋ/",
          "Mang tới",
          `I will bring two ${lx.items[0].word.toLowerCase()}s.`,
          "🛎️",
        ),
      ],
      grammar: [
        g(
          "Room ready. You come.",
          "The room is ready, madam.",
          "Ôn tuần 5: câu cần 'is', và mời khách bằng một câu thông báo chứ không bằng mệnh lệnh. Đây là phòng trị liệu, không phải phòng ngủ của khách.",
          "Room is ready, madam.",
        ),
        g(
          `I bring two ${lx.items[0].word.toLowerCase()}.`,
          `I will bring two ${lx.items[0].word.toLowerCase()}s.`,
          "Ôn hai lỗi cùng lúc: thiếu 'will' cho việc sắp làm, và thiếu -s số nhiều.",
          `I will bring two ${lx.items[0].word.toLowerCase()}.`,
        ),
      ],
      speaking: [
        sp(
          "I am here for my massage.",
          "The room is ready, madam.",
          "Khách tới đúng hẹn thì câu đầu tiên là phòng đã sẵn sàng — đừng để khách phải hỏi. 'Ready' trọng âm âm tiết đầu: REA-dy.",
        ),
        sp(
          "Is room one ready?",
          "Room one is ready. One guest.",
          "Lượt bàn giao với ĐỒNG NGHIỆP: phòng nào, mấy khách. Không nói tên khách, không nói khách làm liệu trình gì.",
          "colleague",
        ),
        sp(
          `Could you bring two ${lx.items[0].word.toLowerCase()}s to room one?`,
          `Two ${lx.items[0].word.toLowerCase()}s to room one. One moment.`,
          "Nhắc lại số lượng và số phòng rồi mới đi. Trong khu trị liệu, đi lại hai lần nghĩa là mở cửa phòng hai lần.",
        ),
      ],
      reading: read(
        `A guest arrives at ${lx.station} for a ${lx.booking.en}. A colleague asks: "Is room one ready?" ${lx.staff} says: "Room one is ready. One guest." Then ${lx.staff} says to the guest: "Good afternoon. The room is ready, madam. This way, please." The guest asks for two ${lx.items[0].word.toLowerCase()}s and ${lx.staff} says: "Two ${lx.items[0].word.toLowerCase()}s to room one. One moment."`,
        [
          {
            q: `${lx.staff} nói gì với khách vừa tới?`,
            options: ["Phòng đã sẵn sàng", "Hỏi khách tên gì", "Hỏi khách trả tiền thế nào"],
            correct: 0,
            explanation: `Bài đọc: "The room is ready, madam." — khách tới đúng hẹn thì không phải hỏi câu nào.`,
          },
          {
            q: "Với đồng nghiệp thì báo những gì?",
            options: ["Số phòng và số khách", "Tên khách và liệu trình", "Giá tiền"],
            correct: 0,
            explanation:
              "Bàn giao chỉ cần đủ để người kia làm việc. Tên khách và liệu trình là thông tin riêng, không nói ra ở khu vực có người qua lại.",
          },
        ],
      ),
      game: [
        game(
          "I have a booking at four.",
          "The room is ready, madam.",
          "Room ready, yes.",
          "Your room is ready, madam. The eighth floor.",
          undefined,
          "Đáp án thứ ba là câu của lễ tân: nó chỉ khách lên phòng ngủ. Spa không xếp phòng ngủ, và khách đang đứng ở quầy spa.",
        ),
        game(
          `Could you bring two ${lx.items[0].word.toLowerCase()}s?`,
          `Two ${lx.items[0].word.toLowerCase()}s. One moment, madam.`,
          `Six ${lx.items[0].word.toLowerCase()}.`,
          `Yes madam, I bring now.`,
          undefined,
          "Nhắc lại con số rồi mới đi. Và việc sắp làm cần 'will': 'I bring now' thiếu đúng trợ động từ mà bài này dạy.",
        ),
        game(
          "I am early. Is the room ready?",
          "One moment, madam. I will check.",
          "Room ready yes.",
          "Yes, madam. The room is ready.",
          undefined,
          "Đáp án thứ ba hứa một phòng chưa ai xem. Phòng trị liệu phải được dọn, thay khăn và chỉnh nhiệt giữa hai khách — khách vào sớm mà phòng chưa xong thì họ ngồi chờ trong phòng chờ, không phải trên bàn.",
        ),
        game(
          "Can I charge it to my room?",
          "Of course, madam. Your room number?",
          "Room? OK madam.",
          "Of course, madam. No problem.",
          undefined,
          "Ghi nợ vào phòng thì phải có số phòng và chữ ký. 'No problem' nghe dễ chịu nhưng bỏ mất đúng bước đó, và khách sẽ bị hỏi lại lúc trả phòng — đúng lúc họ đang vội.",
        ),
      ],
    }),

  GR_6_2: (lx) =>
    lesson(lx, 6, 2, "The Lounge & the Card", "Phòng chờ & thẻ khách", {
      vocabulary: [
        v("Ready", "/ˈredi/", "Đã sẵn sàng", "Your seat is ready, madam.", "✅"),
        v(
          "Bring",
          "/brɪŋ/",
          "Mang tới",
          `I will bring two ${lx.items[0].word.toLowerCase()}s.`,
          "🛎️",
        ),
      ],
      grammar: [
        g(
          "Seat ready. Sit there.",
          "Your seat is ready, madam.",
          "Ôn tuần 5: câu cần 'is', và mời khách ngồi bằng một câu thông báo kèm cử chỉ tay mở, không bằng mệnh lệnh.",
          "Your seat ready, madam.",
        ),
        g(
          `Room ${lx.roomNo.cardinal}? OK.`,
          `May I see your card, madam?`,
          "Ở phòng chờ có người lạ ngồi ngay bên cạnh, nên đừng đọc to số phòng của khách. Xin xem thẻ là cách kiểm tra không phát thanh gì cả.",
          "May I to see your card, madam?",
        ),
      ],
      speaking: [
        sp(
          "Good afternoon. Is the lounge open?",
          "Your seat is ready, madam.",
          "Khách bước vào phòng chờ thì câu đầu tiên là chỗ ngồi đã sẵn sàng. 'Ready' trọng âm âm tiết đầu: REA-dy.",
        ),
        sp(
          `I am in room ${lx.roomNo.spoken}. Can I come in?`,
          `May I see your card, madam?`,
          "Tuần 2 dạy nhắc lại số phòng để xác nhận — ở quầy vắng thì đúng. Ở phòng chờ đông người lạ thì ĐỔI CÁCH xác nhận: xin xem thẻ, và nếu phải ghi thì ghi ra giấy. Vẫn là bước xác nhận đó, đổi hình thức cho hợp chỗ đứng.",
        ),
        sp(
          `Could you bring two ${lx.items[0].word.toLowerCase()}s to the lounge?`,
          `Two ${lx.items[0].word.toLowerCase()}s to the lounge. One moment.`,
          "Nhắc lại số lượng rồi mới đi. Nói 'the lounge' chứ không nói số phòng: nơi giao đồ là nơi khách đang ngồi.",
        ),
        sp(
          "Is there space for four now?",
          "One moment, madam. I will check.",
          "Phòng chờ đầy hay trống là chuyện của phút này, không phải của trí nhớ. Xem rồi mới trả lời.",
          undefined,
          ["check"],
        ),
        sp(
          "Is the lounge ready?",
          "The lounge is ready. Six guests.",
          "Lượt bàn giao với ĐỒNG NGHIỆP: trạng thái thì gọn thế này là đủ. Còn bàn giao HỒ SƠ khách thì phải đủ tên và số phòng — thiếu là ca sau làm sai. Chỉ cần hạ giọng và không bàn giao ở chỗ khách nghe được.",
          "colleague",
        ),
      ],
      reading: read(
        `A guest comes to ${lx.station} and says: "I am in room ${lx.roomNo.spoken}." ${lx.staff} does not say the room number again. ${lx.staff} says: "May I see your card, madam?" The guest shows it. ${lx.staff} says: "Thank you. Your seat is ready." Later ${lx.staff} says: "Two ${lx.items[0].word.toLowerCase()}s to the lounge. One moment."`,
        [
          {
            q: `Vì sao ${lx.staff} xin xem thẻ thay vì hỏi lại số phòng?`,
            options: [
              "Vì thẻ kiểm được mà không phải nói to",
              "Vì số phòng không quan trọng",
              "Vì khách đã nói rồi nên thừa",
            ],
            correct: 0,
            explanation:
              "Phòng chờ là chỗ đông người lạ ngồi sát nhau. Kiểm bằng một vật thì không ai nghe được gì; hỏi lại bằng lời thì cả phòng nghe. Đây không phải là bỏ bước nhắc lại của tuần 2 — chỉ là đổi cách kiểm cho hợp chỗ đứng.",
          },
          {
            q: "Kiểm tra khách bằng cách nào?",
            options: ["Xin xem thẻ khách", "Hỏi to số phòng", "Hỏi tên khách"],
            correct: 0,
            explanation: `Bài đọc: "May I see your card, madam?" — kiểm tra bằng vật, không bằng lời nói to.`,
          },
        ],
      ),
      game: [
        game(
          `I am in room ${lx.roomNo.spoken}.`,
          `May I see your card, madam?`,
          `Room ${lx.roomNo.cardinal}? OK.`,
          `Yes madam, please come in.`,
          undefined,
          "Đáp án thứ ba cho khách vào mà chưa kiểm gì. Ở phòng chờ, cái kiểm được là tấm thẻ — nó xác nhận quyền vào mà không cần nói to điều gì về khách.",
        ),
        game(
          "Is there a seat for me?",
          "Your seat is ready, madam.",
          "Seat ready.",
          "Your room is ready, madam.",
          undefined,
          "Phòng chờ không xếp phòng ngủ. Đáp án thứ ba là câu của lễ tân, và nó trả lời một câu hỏi khách không hỏi.",
        ),
      ],
    }),

  // "Enjoy your meal" as the guest is handed the MENU. The spine's closing
  // chain works for a department that finishes when the guest leaves; a
  // restaurant finishes when the food arrives, and the review found the wish
  // landing three steps early.
  FB_6_4: (lx) =>
    lesson(lx, 6, 4, "The Full Service Chain", "Chuỗi phục vụ hoàn chỉnh", {
      vocabulary: [
        v("Enjoy", "/ɪnˈdʒɔɪ/", "Tận hưởng", "Enjoy your meal, sir.", "😊"),
        v("Anything else", "/ˈeniθɪŋ els/", "Còn gì nữa không ạ", "Anything else, madam?", "➕"),
      ],
      grammar: [
        g(
          "You want more?",
          "Anything else, madam?",
          "Câu hỏi thêm nhu cầu chuẩn là 'Anything else?' — ngắn, lịch sự, và hỏi sau khi đã ghi xong đơn chứ không phải trước.",
          "Anything else you want, madam?",
        ),
        g(
          "Go enjoy.",
          "Enjoy your meal, sir.",
          "Câu chúc này đi kèm ĐỒ ĂN, không đi kèm thực đơn. Nói lúc đặt đĩa xuống bàn; nói lúc đưa menu là chúc khách ngon miệng với tờ giấy.",
          "Enjoy you meal, sir.",
        ),
      ],
      speaking: [
        sp(
          "Could I have one more menu?",
          "One moment. I will check, madam.",
          "Thứ cấp thêm thì kiểm trước rồi mới hứa. Câu hỏi còn-gì-nữa-không để dành cho lúc đã ghi xong đơn, không phải lúc vừa nhận một yêu cầu mới.",
          undefined,
          ["check"],
        ),
        sp(
          "And one orange juice, please.",
          "Thank you, madam. Anything else?",
          "Hỏi câu này ngay sau khi đọc lại đơn — đó là lần cuối khách thêm được món trước khi bạn vào bếp. 'Anything' đọc liền một hơi, trọng âm ở A đầu.",
          undefined,
          ["anything"],
        ),
        sp(
          "Mmm, this is very good.",
          "Is everything all right, madam?",
          "Ghé lại sau miếng đầu tiên, một câu, rồi đi — đừng đứng chờ khách khen tiếp. Khách chê ngay lúc này thì còn sửa được; để tới lúc tính tiền thì chỉ còn xin lỗi.",
        ),
        sp(
          "Oh, that looks good.",
          "Enjoy your meal, sir.",
          "Nói đúng lúc đặt đĩa xuống bàn, không nói lúc đưa thực đơn. 'Enjoy' trọng âm ở âm tiết sau: en-JOY.",
          undefined,
          ["enjoy"],
        ),
      ],
      reading: read(
        `${lx.staff} brings the ${lx.items[0].word.toLowerCase()} and takes the order. Then ${lx.staff} reads it back and asks: "Anything else, madam?" The guest says: "No, thank you." ${lx.staff} goes to the kitchen. Later ${lx.staff} brings the food, puts it down and says: "Enjoy your meal."`,
        [
          {
            q: `${lx.staff} nói "Enjoy your meal" vào lúc nào?`,
            options: ["Lúc đặt đồ ăn xuống bàn", "Lúc đưa thực đơn", "Lúc khách bước vào"],
            correct: 0,
            explanation:
              "Câu chúc đi kèm đồ ăn. Nói lúc đưa thực đơn thì khách còn chưa gọi món, và tới lúc món ra thì không còn gì để nói nữa.",
          },
          {
            q: '"Anything else?" hỏi vào lúc nào?',
            options: ["Sau khi đọc lại đơn", "Trước khi đưa thực đơn", "Lúc khách đang ăn"],
            correct: 0,
            explanation:
              "Đó là lần cuối khách thêm được món trước khi bếp bắt đầu. Hỏi lúc khách đang ăn là cắt ngang bữa.",
          },
        ],
      ),
      game: [
        game(
          "Oh, that looks lovely.",
          "Enjoy your meal, madam.",
          "Eat, madam.",
          "Enjoy your stay, madam.",
          undefined,
          "Câu chúc phải hợp với việc vừa xong. 'Enjoy your stay' là câu của lễ tân tiễn khách lên phòng — ở bàn ăn nó nghe như bạn nhầm bộ phận.",
        ),
        game(
          "Yes, one more thing please.",
          "Certainly, madam. What is it?",
          "More thing? OK, you tell me madam.",
          "Anything else, madam? Please tell me now.",
          undefined,
          "Khách vừa nói là còn một việc; hỏi lại 'anything else' là hỏi đúng câu vừa được trả lời. 'Now' còn nghe như giục khách.",
        ),
      ],
    }),

  // The first lesson of the course, rendered for Housekeeping, had a room
  // attendant standing at a guest room door saying "Welcome to Lotus Bay" to
  // someone who has just arrived. HK_6_1 — five weeks later — teaches that
  // exact line as the front desk's, and marks it wrong here. The Hotel Manager
  // review made it blocker three. Same three headwords, same teaching point
  // (greet by the hour, use the name when the guest gives it), moved to the
  // corridor of a floor whose guests checked in yesterday.
  HK_1_1: (lx) =>
    lesson(lx, 1, 1, "Greeting in the Corridor", "Chào khách ở hành lang", {
      vocabulary: [
        v(
          "Good morning",
          "/ɡʊd ˈmɔːnɪŋ/",
          "Chào buổi sáng (trước 12h)",
          "Good morning, sir.",
          "🌅",
        ),
        v("Madam", "/ˈmædəm/", "Thưa bà (gọi khách nữ)", "Good afternoon, madam.", "👋"),
        v("Welcome", "/ˈwelkəm/", "Không có gì (đáp lời cảm ơn)", "You are welcome, madam.", "🙏"),
      ],
      grammar: [
        g(
          "Morning.",
          "Good morning, sir.",
          "Không nói cụt 'Morning'. Với khách luôn nói đủ 'Good morning' và thêm 'sir' (nam) hoặc 'madam' (nữ). Gặp khách ở hành lang thì vẫn chào, dù tay đang đẩy xe.",
          "Good morning, mister.",
        ),
        g(
          "OK, no problem.",
          "You are welcome, madam.",
          "Khách cảm ơn thì đáp 'You are welcome' — đủ câu, có 'are'. Buồng phòng được cảm ơn nhiều lần mỗi ca, nên câu này phải bật ra không cần nghĩ.",
          "You welcome, madam.",
        ),
      ],
      speaking: [
        sp(
          "Good morning!",
          "Good morning, madam.",
          "Chào theo buổi: morning (trước 12h), afternoon (12h–18h), evening (sau 18h). Chào trước khi khách chào bạn — người đẩy xe trong hành lang là người chào trước.",
        ),
        sp(
          "Good afternoon. I am Mrs Lee.",
          "Good afternoon, Mrs Lee.",
          "Khách vừa nói tên mình ra thì dùng tên, đừng lùi về 'madam' — gọi đúng họ khách là nâng cấp rẻ nhất trong nghề. Chào lại đúng buổi khách vừa chào.",
        ),
        sp(
          "Thank you for the extra towels.",
          "You are welcome, madam.",
          "Đáp đủ câu, đừng chỉ gật hay nói 'no problem'. 'Welcome' trọng âm âm tiết đầu: WEL-come.",
        ),
      ],
      reading: read(
        `It is 9 AM. ${lx.staff} is in the corridor with the trolley. A guest comes out of room ${lx.roomNo.spoken}. ${lx.staff} says: "Good morning, madam." The guest says: "Good morning. Thank you for the extra towels." ${lx.staff} says: "You are welcome, madam."`,
        [
          {
            q: `${lx.staff} chào khách vào buổi nào?`,
            options: ["Buổi sáng", "Buổi chiều", "Buổi tối"],
            correct: 0,
            explanation: "9 AM là buổi sáng, nên dùng 'Good morning'.",
          },
          {
            q: "Khách cảm ơn thì đáp bằng câu nào?",
            options: ["You are welcome, madam.", "No problem.", "OK, madam."],
            correct: 0,
            explanation:
              "Đáp đủ câu. 'No problem' nghe như việc đó vốn là phiền phức mà bạn đang bỏ qua; 'You are welcome' thì không mang nghĩa đó.",
          },
        ],
      ),
      game: [
        game(
          "Good evening. We just arrived.",
          "Good evening, madam.",
          "Evening. Come in.",
          "Good evening. Welcome to Lotus Bay.",
          undefined,
          "Đáp án thứ ba là lời đón của LỄ TÂN, nói ở cửa chính lúc khách xuống xe. Buồng phòng gặp khách trong hành lang, sau khi họ đã nhận phòng — chào theo buổi là đủ, và đón khách vào khách sạn không phải việc của bạn.",
        ),
        game(
          "Thank you so much for this.",
          "You are welcome, madam.",
          "OK madam, no problem.",
          "Thank you very much, madam.",
          undefined,
          "Đáp án thứ ba đáp lời cảm ơn bằng một lời cảm ơn khác — nghe như bạn không nghe rõ khách vừa nói gì. Lời cảm ơn thì đáp bằng 'You are welcome'.",
        ),
      ],
    }),

  // Week 4 rendered for Guest Relations puts a lounge host behind a till:
  // taking cash, taking cards, handing over a bill and counting change out of
  // two million dong. The Hotel Manager review made it blocker one and pointed
  // at the precedent already in this file — Housekeeping refuses money in
  // three lessons for exactly the same reason, and the reason is not politeness
  // but control: no till, no receipt, no second person, and nothing to prove
  // anything with if the money goes missing. Guest Relations stands at a
  // lounge door with no drawer either.
  //
  // Same headwords in all three lessons, so the vocabulary budget and the
  // review scheduler are untouched.
  GR_4_2: (lx) =>
    lesson(lx, 4, 2, "I Cannot Take Money", "Không thu tiền ở phòng chờ", {
      vocabulary: [
        v("Cash", "/kæʃ/", "Tiền mặt", "I cannot take cash, sir.", "💵"),
        v("Card", "/kɑːd/", "Thẻ ngân hàng", "Reception takes your card.", "💳"),
      ],
      grammar: [
        g(
          "Give me money.",
          "I cannot take cash, madam.",
          "Phòng chờ không có két, không có máy in hoá đơn, và không có người thứ hai đứng cạnh. Mất tiền thì không ai chứng minh được điều gì — nên mọi khoản đều đi qua lễ tân, kể cả khoản nhỏ.",
          "I do not can take cash, madam.",
        ),
        g(
          "You pay downstairs.",
          "Please pay at reception, sir.",
          "Từ chối rồi phải chỉ ngay chỗ trả. Chỉ đường bằng câu mời, không bằng câu sai khiến: thêm 'Please' và nói rõ nơi đến.",
          "Please to pay at reception, sir.",
        ),
      ],
      speaking: [
        sp(
          "Here, take the money for the drinks.",
          "I cannot take cash, madam.",
          "Nói bằng giọng bình thường, không ngại. Đây là quy định của khách sạn, không phải bạn đang chê tiền của khách — và khách quen với việc này ở mọi khách sạn tốt.",
          undefined,
          ["cash"],
        ),
        sp(
          "So where do I pay for this?",
          "Please pay at reception, sir.",
          "Từ chối xong là chỉ đường ngay, trong cùng một hơi. Từ chối suông thì khách phải tự đi hỏi, và họ sẽ hỏi người dễ tính hơn.",
          undefined,
          ["reception"],
        ),
        sp(
          "Can I use my card here?",
          "Reception takes your card, madam.",
          "Nói ai làm được việc đó, đừng chỉ nói bạn không làm được. 'Card' có /d/ cuối — đừng đọc thành 'ca'.",
          undefined,
          ["reception", "card"],
        ),
      ],
      reading: read(
        `A guest at ${lx.station} gives ${lx.staff} some money for the drinks. ${lx.staff} does not take it. ${lx.staff} says: "I cannot take cash, madam. Please pay at reception." The guest asks about a card. ${lx.staff} says: "Reception takes your card, madam." Then ${lx.staff} shows the guest the way.`,
        [
          {
            q: `Vì sao ${lx.staff} không cầm tiền?`,
            options: [
              "Vì ở đây không có hoá đơn và không có két",
              "Vì khách trả thiếu",
              "Vì khách phải trả bằng thẻ",
            ],
            correct: 0,
            explanation:
              "Không có hoá đơn thì không có bằng chứng đã nhận bao nhiêu, và không có người thứ hai thì không ai xác nhận được. Đây là chuyện kiểm soát, không phải chuyện lịch sự.",
          },
          {
            q: "Từ chối xong thì làm gì?",
            options: ["Chỉ khách xuống lễ tân", "Đứng im", "Bảo khách hỏi người khác"],
            correct: 0,
            explanation: `Bài đọc: "Please pay at reception." — từ chối suông là đẩy việc cho khách.`,
          },
        ],
      ),
      game: [
        game(
          "Please just take it for the drinks.",
          "I cannot take cash, madam.",
          "OK, thank you very much, madam.",
          "Yes, madam. I will give it to reception.",
          undefined,
          "Đáp án thứ ba nghe như đúng quy trình nhưng vẫn là cầm tiền của khách — và giữa quầy phòng chờ với lễ tân thì không có phiếu giao nhận nào cả.",
        ),
        game(
          "Where do I pay, then?",
          "Please pay at reception, madam.",
          "Pay later.",
          "You can pay me now, madam.",
          undefined,
          "Sai quy trình thu tiền: mọi khoản đều thanh toán ở lễ tân, nơi có két và có hoá đơn.",
        ),
      ],
    }),

  GR_4_3: (lx) =>
    lesson(lx, 4, 3, "When a Guest Asks in Dollars", "Khi khách hỏi giá bằng đô", {
      vocabulary: [
        v("Dollar", "/ˈdɒlə/", "Đô la Mỹ", `It is about ${lx.priced.usdWord} dollars.`, "💵"),
        v("Change", "/tʃeɪndʒ/", "Tiền thối", "Your change is at reception.", "🪙"),
      ],
      grammar: [
        g(
          `${capFirst(lx.priced.usdWord)} dollar.`,
          `It is about ${lx.priced.usdWord} dollars.`,
          "Hai điều: từ 2 đô trở lên phải có -s, và luôn thêm 'about' vì tỷ giá đổi hằng ngày. Nói một con số đô chính xác là hứa một tỷ giá bạn không quyết định.",
          `It is about ${lx.priced.usdWord} dollar.`,
        ),
        g(
          "Give me the money.",
          "Please pay at reception, sir.",
          "Báo giá thì được, nhận tiền thì không. Câu báo giá luôn đi kèm câu chỉ chỗ trả — nếu không, khách sẽ rút ví ra ngay tại chỗ.",
          "Please give the money at reception, sir.",
        ),
      ],
      speaking: [
        sp(
          "How much is that in dollars?",
          `It is about ${lx.priced.usdWord} dollars, sir.`,
          "Luôn có 'about'. Tỷ giá đổi hằng ngày và bạn không phải là người quyết định nó — nói một con số chính xác là hứa thay lễ tân.",
          undefined,
          ["about"],
        ),
        sp(
          "Can I pay you in dollars?",
          "I am sorry. We take dong, madam.",
          "Xin lỗi trước rồi mới nói chính sách — từ chối trần trụi nghe như bạn đang chê tiền của khách. 'Dong' không thêm -s, giống yen hay baht.",
          undefined,
          ["sorry", "dong"],
        ),
        sp(
          "Who gives me my change?",
          "Your change is at reception, madam.",
          "Nói rõ tiền thối ở đâu chứ đừng chỉ nói bạn không có. Khách vừa đưa tiền ra thì thứ họ cần nghe là chỗ lấy lại, không phải lời từ chối.",
          undefined,
          ["reception"],
        ),
      ],
      reading: read(
        `A guest asks ${lx.staff}: "How much is that in dollars?" ${lx.staff} says: "It is about ${lx.priced.usdWord} dollars, madam." The guest takes out some dollars. ${lx.staff} says: "I am sorry. We take dong, madam. Please pay at reception." ${lx.staff} does not take the money.`,
        [
          {
            q: `Vì sao ${lx.staff} nói "about"?`,
            options: [
              "Vì tỷ giá đổi hằng ngày",
              "Vì không nhớ giá chính xác",
              "Vì khách chưa quyết định",
            ],
            correct: 0,
            explanation:
              "Nói một con số đô chính xác là hứa một tỷ giá mà bạn không quyết định. 'About' để câu đúng mà vẫn giúp được khách hình dung.",
          },
          {
            q: "Khách đưa đô la thì làm gì?",
            options: [
              "Xin lỗi, nói nhận tiền đồng, chỉ xuống lễ tân",
              "Cầm rồi đưa lễ tân",
              "Nhận",
            ],
            correct: 0,
            explanation:
              "Cầm hộ vẫn là cầm tiền. Xin lỗi trước, nói chính sách, rồi chỉ chỗ trả — đủ ba nhịp trong một lượt.",
          },
        ],
      ),
      game: [
        game(
          "Do you take dollars here?",
          "I am sorry. We take dong, madam.",
          "Dollar no good here, madam.",
          "Yes madam, dollars are fine here too.",
          undefined,
          "Sai thực tế: khách sạn thu tiền đồng. Hứa nhận đô rồi lễ tân từ chối là khách mất mặt hai lần.",
        ),
        game(
          "Here, take the dollars.",
          "Please pay at reception, madam.",
          "OK, thank you.",
          "Yes madam, I will take it for you.",
          undefined,
          "Vẫn là cầm tiền của khách. Chỉ đường tới lễ tân, không cầm hộ — kể cả khi khách nài.",
        ),
      ],
    }),

  GR_4_4: (lx) =>
    lesson(lx, 4, 4, "The Bill Is at Reception", "Hoá đơn ở lễ tân", {
      vocabulary: [
        v("Total", "/ˈtəʊtl/", "Tổng cộng", `The total is ${lx.priced.vndWord} dong.`, "🧮"),
        v("Bill", "/bɪl/", "Hóa đơn", "Reception has your bill, sir.", "🧾"),
      ],
      grammar: [
        g(
          `Total ${lx.priced.vndWord}.`,
          `The total is ${lx.priced.vndWord} dong.`,
          "Cần mạo từ 'The' và động từ 'is': THE total IS … Số tiền đọc liền cả cụm, và 'dong' giữ nguyên khi số nhiều.",
          `The total are ${lx.priced.vndWord} dong.`,
        ),
        g(
          "Bill here.",
          "Reception has your bill, madam.",
          "Phòng chờ ghi phiếu, lễ tân giữ hoá đơn. Nói rõ hoá đơn ở đâu thì khách không phải đi hỏi vòng.",
          "Reception have your bill, madam.",
        ),
      ],
      speaking: [
        sp(
          `How much for the ${lx.booking.en}?`,
          `The total is ${lx.priced.vndWord} dong.`,
          "Biết giá dịch vụ của chính bộ phận mình. Đẩy sang lễ tân ở chỗ này là bắt khách đi thêm một vòng vô ích.",
          undefined,
          ["total"],
        ),
        sp(
          "Could I have the bill, please?",
          "Reception has your bill, madam.",
          "Nói ai giữ hoá đơn, đừng chỉ nói bạn không có. 'Bill' có /l/ cuối — lưỡi chạm lợi trên và giữ lại, đừng nuốt mất.",
          undefined,
          ["reception", "bill"],
        ),
        sp(
          "Can you check my bill for me?",
          "One moment, madam. I will check.",
          "Xem phiếu rồi mới trả lời, đừng nói từ trí nhớ. Nói ra là mình đang đi xem — im lặng bỏ đi khiến khách tưởng bị phớt lờ.",
          undefined,
          ["check"],
        ),
        sp(
          "Is the lounge on my bill?",
          "Yes, madam. On your bill.",
          "Xác nhận ngắn rồi dừng. Khách hỏi có được ghi nợ không thì chỉ cần biết có, không cần nghe giải thích quy trình.",
          undefined,
          ["bill"],
        ),
      ],
      reading: read(
        `A guest asks ${lx.staff}: "How much for the ${lx.booking.en}?" ${lx.staff} says: "The total is ${lx.priced.vndWord} dong, madam." The guest asks for the bill. ${lx.staff} says: "Reception has your bill, madam." ${lx.staff} writes the room number on a slip and gives it to reception.`,
        [
          {
            q: `${lx.staff} có giữ hoá đơn không?`,
            options: ["Không — lễ tân giữ", "Có", "Không ai giữ"],
            correct: 0,
            explanation: `Bài đọc: "Reception has your bill." — phòng chờ ghi phiếu, lễ tân giữ hoá đơn và thu tiền.`,
          },
          {
            q: "Khách hỏi giá dịch vụ của chính bộ phận mình thì sao?",
            options: ["Trả lời ngay", "Bảo khách hỏi lễ tân", "Bảo khách đợi quản lý"],
            correct: 0,
            explanation:
              "Giá dịch vụ của bộ phận mình thì phải thuộc. Chỉ chuyển sang lễ tân ở khâu THU TIỀN, không phải ở khâu báo giá.",
          },
        ],
      ),
      game: [
        game(
          `How much is the ${lx.booking.en}?`,
          `The total is ${lx.priced.vndWord} dong.`,
          `Total ${lx.priced.vndWord}.`,
          "I do not know, madam. Ask reception.",
          undefined,
          "Giá dịch vụ của chính bộ phận mình thì phải biết. Đẩy sang lễ tân ở đây là để khách đi thêm một vòng vô ích.",
        ),
        game(
          "Can you bring my bill here?",
          "Reception has your bill, sir.",
          "Bill no here.",
          "Yes sir, I will bring it to you.",
          undefined,
          "Hoá đơn do lễ tân giữ. Hứa mang tới là hứa một việc bạn không làm được, và khách sẽ ngồi chờ một tờ giấy không tới.",
        ),
      ],
    }),

  // Week 1 lesson 2 taught Housekeeping to ask a guest's name with no anchor,
  // and weeks 5-6 then teach that collecting a name at a room door is the
  // first half of the sequence that opens doors for strangers. The Hotel
  // Manager review made the pair its second blocker. Same three headwords;
  // the name-asking now has the one legitimate anchor this department owns —
  // the laundry slip, which needs a name in writing.
  HK_1_2: (lx) =>
    lesson(lx, 1, 2, "The Name on the Laundry Slip", "Tên trên phiếu giặt là", {
      vocabulary: [
        v("Name", "/neɪm/", "Tên", "May I have your name?", "📛"),
        v("Spell", "/spel/", "Đánh vần", "How do you spell that?", "🔤"),
        v("Sir", "/sɜː/", "Thưa ông (gọi khách nam)", "Thank you. R-Y-A-N, sir.", "🎩"),
      ],
      grammar: [
        g(
          "What your name?",
          "May I have your name?",
          "Hỏi tên khi có phiếu cần ghi — phiếu giặt là ghi sai tên là áo trả nhầm phòng. Còn ở cửa phòng thì KHÔNG hỏi tên: tên nằm sẵn trên danh sách của bạn (xem bài 5.3). Câu hỏi cần động từ: May I HAVE your name?",
          "May I have you name?",
        ),
        g(
          "Say it again.",
          "Could you spell that, please?",
          "Tên có chữ dễ nhầm thì nhờ khách đánh vần. Đủ 26 tên chữ cái: A /eɪ/ B /biː/ C /siː/ D /diː/ E /iː/ F /ef/ G /dʒiː/ H /eɪtʃ/ I /aɪ/ J /dʒeɪ/ K /keɪ/ L /el/ M /em/ N /en/ O /əʊ/ P /piː/ Q /kjuː/ R /ɑː/ S /es/ T /tiː/ U /juː/ V /viː/ W /ˈdʌbljuː/ X /eks/ Y /waɪ/ Z /zed/. Tám chữ người Việt hay lẫn nhất: A · E · I · G · J · R · W · Y.",
          "Could you spelling that, please?",
        ),
      ],
      speaking: [
        sp(
          "It is Ryan. R-Y-A-N.",
          "Thank you. R-Y-A-N, sir.",
          "Nhắc lại đúng thứ tự từng chữ để phiếu ghi đúng, không nhắc lại cả tên. R /ɑː/ và Y /waɪ/ đều nằm trong tám tên chữ cái người Việt hay lẫn — đọc tách rời, đừng nối liền.",
        ),
        sp(
          "My name is Ivy. I-V-Y.",
          "Thank you. I-V-Y, madam.",
          "Nhắc lại từng chữ cái khách vừa đánh vần để xác nhận không nghe nhầm. 'Thank' mở đầu bằng /θ/ — đầu lưỡi chạm nhẹ răng trên, đừng để thành tank hay sank. Chữ I là /aɪ/ hai âm, không phải /iː/ một âm.",
        ),
      ],
      reading: read(
        `A guest gives ${lx.staff} two shirts for laundry. ${lx.staff} takes the slip and asks: "May I have your name?" The guest says: "Ryan. R-Y-A-N." ${lx.staff} writes each letter and says: "Thank you. R-Y-A-N, sir." The name goes on the slip, and the shirts come back to the right room.`,
        [
          {
            q: `Vì sao ${lx.staff} hỏi tên ở đây?`,
            options: [
              "Vì phiếu giặt là cần ghi tên",
              "Vì muốn làm quen với khách",
              "Vì khách gõ nhầm cửa",
            ],
            correct: 0,
            explanation:
              "Tên đi theo phiếu để áo về đúng phòng. Đây là chỗ DUY NHẤT buồng phòng hỏi tên — ở cửa phòng thì tên đã nằm trên danh sách của bạn.",
          },
          {
            q: `Vì sao ${lx.staff} nhắc lại từng chữ cái?`,
            options: ["Để xác nhận không nghe nhầm", "Để khách chờ lâu", "Vì không hiểu tên khách"],
            correct: 0,
            explanation: "Nhắc lại từng chữ cái là cách xác nhận chính xác nhất khi ghi tên khách.",
          },
        ],
      ),
      game: [
        game("My name is Ryan.", "How do you spell that?", "Spell please.", "Ryan. OK, thank you."),
        game(
          "It is spelled J-A-N-E.",
          "J-A-N-E. Thank you.",
          "Jane, okay. Thank you madam.",
          "J-A-M-E. Thank you very much, madam.",
          undefined,
          "Câu đó dài và lịch sự hơn, nhưng đánh vần sai một chữ: N thành M. Nhắc lại để xác nhận mà nhắc sai còn tệ hơn không nhắc.",
        ),
      ],
    }),

  // Hundred was a dead card in Housekeeping: the price here is seventy
  // thousand, so outside its own card the word appeared only in sentences
  // marked WRONG. The academic review proposed the one-for-one swap — Bin is
  // in this department's lexicon, appears in its arcade prompts, and was a
  // headword nowhere in HK's forty weeks. The review schedule follows
  // automatically now that it reads the real lessons. The manager turn also
  // counts ROOMS, not guests — a floor supervisor asks a room attendant how
  // many rooms, never how many guests.
  HK_2_1: (lx) =>
    lesson(lx, 2, 1, "Numbers Zero to One Hundred", "Số đếm 0 đến 100", {
      vocabulary: [
        v("Number", "/ˈnʌmbə/", "Con số", "What is your room number?", "🔢"),
        v("Thirteen", "/ˌθɜːˈtiːn/", "Số 13 — trọng âm ở cuối", "Thirteen, sir. One three.", "🔢"),
        v("Room", "/ruːm/", "Phòng", `Room ${lx.roomNo.spoken}, sir.`, "🚪"),
        v("Bin", "/bɪn/", "Thùng rác", "Two bins in your room.", "🗑️"),
      ],
      grammar: [
        g(
          `Room ${lx.roomNo.cardinal}.`,
          `Room ${lx.roomNo.spoken}, sir.`,
          `Số phòng đọc từng chữ số, không đọc như số đếm: ${lx.roomNo.digits} = ${lx.roomNo.spoken}, chứ không phải ${lx.roomNo.cardinal}.`,
          `The room ${lx.roomNo.spoken}, sir.`,
        ),
        g(
          "Room number what?",
          "What is your room number?",
          "Câu hỏi cần 'is' và trật tự: What IS your room number?",
          "What is you room number?",
        ),
        g(
          "How many, thirty?",
          "Thirteen or thirty, sir?",
          "13 và 30 nghe gần giống nhau, khác nhau ở trọng âm: thir-TEEN nhấn cuối và kéo dài; THIR-ty nhấn đầu, đuôi ngắn. Nghe không chắc thì hỏi lại cả hai con số, đừng đoán.",
          "Thirteen or thirty, the sir?",
        ),
        g(
          "Room three zero five.",
          "Room three-oh-five, sir.",
          "Chữ số 0 có hai cách đọc: đứng một mình là 'zero', nhưng trong số phòng và số điện thoại thì đọc là 'oh' /əʊ/ — môi tròn lại rồi mới buông.",
          "Room thirty-oh-five, sir.",
        ),
        g(
          "Two ten, right?",
          "It is twenty, sir.",
          "Một tới mười hai: one · two · three · four · five · six · seven · eight · nine · ten · eleven · twelve. Hàng chục: twenty (20) · thirty (30) · forty (40) · fifty · sixty · seventy · eighty · ninety. Ghép hàng chục với số lẻ bằng gạch ngang: 20 + 5 = twenty-five.",
          "It is twenties, sir.",
        ),
      ],
      speaking: [
        sp(
          `I am in room ${lx.roomNo.spoken}.`,
          `Room ${lx.roomNo.spoken}. Thank you, sir.`,
          `Đọc lại số phòng khách vừa nói là cách duy nhất chắc chắn nghe đúng. ${lx.roomNo.digits} đọc từng chữ số: "${lx.roomNo.spoken}". Số 0 trong số phòng đọc thành âm /əʊ/, môi tròn lại rồi mới buông.`,
        ),
        sp(
          "How many rooms today?",
          "Forty-five rooms, sir.",
          "Tổ trưởng giao ca hỏi số PHÒNG, và bạn báo số phòng — buồng phòng đếm phòng, không đếm khách. Số hàng chục ghép số lẻ có gạch ngang: forty-five. Trọng âm dịch chuyển khi có danh từ theo sau: FOR-ty-five rooms.",
          "manager",
        ),
      ],
      reading: read(
        `${lx.staff} says: "Good morning, sir." The guest says: "I am in room ${lx.roomNo.spoken}." ${lx.staff} writes the number and reads it back: "Room ${lx.roomNo.spoken}. Thank you, sir." Then ${lx.staff} says: "Here is your ${lx.items[0].word.toLowerCase()}."`,
        [
          {
            q: `Số phòng ${lx.roomNo.digits} đọc thế nào?`,
            options: [lx.roomNo.spoken, `${lx.roomNo.digits} hundred`, "room number"],
            correct: 0,
            explanation: `Trong khách sạn, số phòng đọc từng chữ số: ${lx.roomNo.spoken}.`,
          },
          {
            q: `${lx.staff} làm gì sau khi nghe số phòng?`,
            options: ["Ghi lại rồi đọc lại cho khách nghe", "Gật đầu rồi đi", "Hỏi tên khách"],
            correct: 0,
            explanation:
              "Ghi rồi đọc lại là bước xác nhận — nghe nhầm một chữ số là mang đồ tới nhầm phòng.",
          },
        ],
      ),
      game: [
        game(
          "Is my room three-oh-five?",
          "Yes, room three-oh-five, sir.",
          "Room number what you say, sir?",
          "Yes, room three hundred and five, sir.",
          undefined,
          "Số phòng đọc từng chữ số: three-oh-five. Đọc thành 'three hundred and five' là cách đọc số lượng, khách rất dễ nghe nhầm sang phòng khác.",
        ),
        game(
          "Is that forty rooms?",
          "No, sir. Forty-five rooms.",
          "Forty room yes.",
          "Yes, sir. It is forty rooms today.",
          "manager",
          "Từ đầu tiên của câu trả lời có/không phải đúng. Bốn mươi lăm phòng chứ không phải bốn mươi, nên phải mở đầu bằng 'No' — báo sai số phòng cho tổ trưởng là cả ca chia việc sai.",
        ),
        game(
          "Is there a second bin?",
          "Yes, madam. Two bins.",
          "Bin one only.",
          "Yes madam, one bin is enough.",
          undefined,
          "Khách hỏi có thùng thứ hai không — trả lời bằng CON SỐ thật trong phòng. Đáp án thứ ba đúng ngữ pháp nhưng cãi lại nhu cầu của khách thay vì trả lời câu hỏi.",
        ),
      ],
    }),

  // The full-service-chain lesson, pointed at what Guest Relations actually
  // chains: receiving a request and arranging it. Four weeks of this module
  // priced, dated and billed a birthday cake without ever teaching the turn
  // that ACCEPTS the arrangement — the department's defining move, per its
  // Hotel Manager review. Same two headwords as the spine frame.
  GR_6_4: (lx) =>
    lesson(lx, 6, 4, "The Full Service Chain", "Chuỗi phục vụ hoàn chỉnh", {
      vocabulary: [
        v("Enjoy", "/ɪnˈdʒɔɪ/", "Tận hưởng", "Enjoy your stay, sir.", "😊"),
        v("Anything else", "/ˈeniθɪŋ els/", "Còn gì nữa không ạ", "Anything else, madam?", "➕"),
      ],
      grammar: [
        g(
          "You want more?",
          "Anything else, madam?",
          "Câu hỏi thêm nhu cầu chuẩn là 'Anything else?' — ngắn, lịch sự, và hỏi sau khi đã ghi xong yêu cầu chứ không phải trước.",
          "Anything else you want, madam?",
        ),
        g(
          "Go enjoy.",
          "Enjoy your stay, sir.",
          "Câu chúc khi tiễn khách phải hợp với việc vừa xong. Ở phòng chờ, khách quay về kỳ nghỉ của họ — 'Enjoy your stay'. Còn 'Have a nice day' là lời chúc khi khách RỜI ĐI, nên tuần 1 dạy nó ở lượt tạm biệt là đúng.",
          "Enjoying your stay, sir.",
        ),
      ],
      speaking: [
        sp(
          "Could you bring flowers to the lounge?",
          "Of course, madam. I will bring them.",
          "Đây là nước cờ định danh của bộ phận: NHẬN một yêu cầu sắp xếp — nhận rõ ràng, nói mình sẽ làm gì. Việc vượt quyền mới phải hỏi quản lý; hoa cho phòng chờ là việc của bạn.",
        ),
        sp(
          "First, some water, please.",
          "Thank you, madam. Anything else?",
          "Khách đang mở một DANH SÁCH — hỏi 'Anything else?' ngay sau món đầu để nhận trọn danh sách một lần, đỡ cho khách phải gọi lại. 'Anything' đọc liền một hơi, trọng âm ở A đầu.",
          undefined,
          ["anything"],
        ),
        sp(
          "Could I have one more lounge card?",
          "One moment. I will check, madam.",
          "Thứ cấp thêm thì kiểm trước rồi mới hứa — thẻ phòng chờ có hạn mức theo phòng.",
          undefined,
          ["check"],
        ),
        sp(
          "That was very good, thank you.",
          "Thank you very much, madam.",
          "Lời KHEN thì đáp bằng lời cảm ơn — đúng như tuần 1 đã dạy. Đáp bằng câu giao dịch là không nghe ra khách vừa nói gì.",
        ),
        sp(
          "Thank you. That is all.",
          "Thank you, madam. Enjoy your stay.",
          "Kết thúc luôn có ba phần: cảm ơn – lời chúc – nụ cười. Đây là ấn tượng cuối của khách. 'Enjoy' trọng âm ở âm tiết sau: en-JOY.",
          undefined,
          ["enjoy"],
        ),
      ],
      reading: read(
        `A guest at ${lx.station} says: "Could you bring flowers to the lounge?" ${lx.staff} says: "Of course, madam. I will bring them." Then: "Anything else?" The guest asks for one more lounge card. ${lx.staff} says: "One moment. I will check, madam." Later the guest says: "That was very good, thank you." ${lx.staff} says: "Thank you very much, madam. Enjoy your stay."`,
        [
          {
            q: "Yêu cầu về hoa và yêu cầu về thẻ khác nhau chỗ nào?",
            options: [
              "Hoa nhận ngay, thẻ phải kiểm rồi mới hứa",
              "Cả hai đều phải hỏi quản lý",
              "Cả hai đều nhận ngay",
            ],
            correct: 0,
            explanation:
              "Hoa cho phòng chờ là việc trong tay bạn — nhận ngay. Thẻ phòng chờ có hạn mức, nên kiểm trước rồi mới hứa. Biết việc nào thuộc loại nào chính là nghề.",
          },
          {
            q: "Khách khen thì đáp thế nào?",
            options: ["Cảm ơn khách", "Hỏi khách cần gì nữa", "Chúc khách lên đường"],
            correct: 0,
            explanation: `Bài đọc: "Thank you very much, madam." — lời khen thì đáp bằng lời cảm ơn, như tuần 1 đã dạy.`,
          },
        ],
      ),
      game: [
        game(
          "Yes, one more thing please.",
          "Certainly, madam. What is it?",
          "More thing? OK, you tell me madam.",
          "Anything else, madam? Please tell me now.",
          undefined,
          "Khách vừa nói là còn một việc; hỏi lại 'anything else' là hỏi đúng câu vừa được trả lời. 'Now' còn nghe như giục khách.",
        ),
        game(
          "No, that is all. Thank you.",
          "Thank you, madam. Enjoy your stay.",
          "OK finish.",
          "Thank you. Goodbye now.",
          undefined,
          "Không sai, nhưng lượt chào cuối là chỗ chúc khách một câu. 'Goodbye now' cụt và nghe như muốn kết thúc gấp.",
        ),
      ],
    }),

  SW_3_4: (lx) =>
    lesson(lx, 3, 4, "Before We Start", "Hỏi trước khi bắt đầu", {
      vocabulary: [
        v("Start", "/stɑːt/", "Bắt đầu", "Before we start, madam.", "▶️"),
        v("Finish", "/ˈfɪnɪʃ/", "Kết thúc", "We finish at eight.", "⏹️"),
      ],
      grammar: [
        g(
          "You have problem?",
          "Do you have any injuries?",
          "Hỏi trước khi chạm vào người khách, không hỏi giữa chừng. Ba việc phải hỏi: chấn thương, dị ứng, và có thai. Bất kỳ câu trả lời 'có' nào cũng phải báo quản lý trước khi bắt đầu.",
          "Do you have any injury?",
        ),
        g(
          "I ask my boss.",
          "I will ask my manager, madam.",
          "Không tự quyết khi khách nói có chấn thương hay đang mang thai. Nói rõ mình sẽ hỏi ai, rồi đi hỏi thật.",
          "I will ask to my manager, madam.",
        ),
      ],
      speaking: [
        sp(
          "I am ready. Let us start.",
          "Before we start, any injuries?",
          "Câu này hỏi TRƯỚC khi khách nằm xuống, không phải sau. 'injury' trọng âm âm tiết đầu: IN-ju-ry.",
          undefined,
          ["injuries", "before"],
        ),
        sp(
          "My back is not good.",
          "Thank you, madam. I will check.",
          "Khách nói có vấn đề thì cảm ơn — họ vừa giúp bạn tránh làm họ đau — rồi mới đi hỏi quản lý.",
        ),
        sp(
          "What time does the spa close today?",
          "We finish at eight, madam.",
          "Nói giờ kết thúc để khách còn xếp lịch phần sau của ngày. 'finish' đóng bằng /ʃ/ — môi hơi tròn, hơi thoát đều, đừng thành 'phi-nít'.",
        ),
        sp(
          "I am four months pregnant.",
          "Thank you, madam. One moment, please.",
          "Có thai là trường hợp phải hỏi quản lý, không có ngoại lệ và không tự quyết. Đừng tỏ ra lúng túng: cảm ơn, xin khách chờ, rồi đi hỏi.",
        ),
        sp(
          "Nothing at all, thank you.",
          "Any allergies, madam?",
          "Hỏi đủ ba câu, đừng dừng ở câu đầu. Dị ứng ở đây là dị ứng với tinh dầu và kem, không phải với đồ ăn — nhiều khách không nghĩ tới, nên phải hỏi thẳng.",
          undefined,
          ["allergies"],
        ),
        sp(
          "Is that everything?",
          "One more, madam. Are you pregnant?",
          "Câu khó hỏi nhất trong ba câu, và là câu đổi cả liệu trình. Hỏi bằng giọng bình thường như hai câu kia; ngập ngừng mới làm khách thấy kỳ. Ba tháng đầu thì nhìn không ra, nên không bao giờ đoán.",
          undefined,
          ["pregnant"],
        ),
      ],
      reading: read(
        `A guest comes in for a ${lx.priced.en}. ${lx.staff} asks first, before the guest lies down: "Before we start, any injuries?" The guest says: "My back is not good." ${lx.staff} does not start. ${lx.staff} says: "Thank you, madam. I will check with my manager." The manager comes and changes the treatment. Then they start.`,
        [
          {
            q: `Vì sao ${lx.staff} chưa bắt đầu?`,
            options: [
              "Khách báo có vấn đề ở lưng",
              "Vì chưa tới giờ hẹn",
              "Vì khách chưa trả tiền",
            ],
            correct: 0,
            explanation: `Bài đọc: khách nói "My back is not good." — ${lx.staff} dừng lại và hỏi quản lý trước.`,
          },
          {
            q: "Ba điều phải hỏi trước mỗi liệu trình là gì?",
            options: [
              "Chấn thương, dị ứng, có thai",
              "Tên, số phòng, giờ về",
              "Giá tiền, cách trả, tiền tip",
            ],
            correct: 0,
            explanation:
              "Cả ba đều có thể làm liệu trình phải đổi hoặc phải hoãn. Hỏi mất mười giây; không hỏi thì có thể làm khách đau.",
          },
        ],
      ),
      game: [
        game(
          "I have a bad knee, but it is fine.",
          "Thank you, madam. I will check.",
          "OK madam, no problem.",
          "It is fine, madam.",
          undefined,
          "Khách tự nói 'không sao' không phải là được phép bỏ qua. Có chấn thương thì ghi lại và hỏi kỹ thuật viên.",
        ),
        game(
          "Can we start now?",
          "Before we start, any allergies?",
          "Yes, start now.",
          "Yes, lie down now.",
          undefined,
          "Câu sàng lọc phải hỏi TRƯỚC khi khách nằm xuống, không hỏi giữa chừng.",
        ),
        game(
          "Is that everything you need to know?",
          "One more, madam. Are you pregnant?",
          "Yes, all finish. We start.",
          "Yes, madam. You look very well.",
          undefined,
          "Hỏi đủ ba câu, kể cả câu ngại hỏi nhất. Nhìn mà đoán là cách sai: nhiều liệu trình phải đổi hẳn hoặc phải hoãn khi khách đang mang thai, và ba tháng đầu thì nhìn không ra.",
        ),
      ],
    }),

  // Modesty and consent in the changing room. Two auditors put this first
  // for the module: a guest who does not know whether to undress, and a
  // therapist with no sentence for it, is the single most common way this
  // department makes somebody uncomfortable. The spine's 5.3 already hands
  // something over and shows the way — exactly the two moves needed.
  SW_5_3: (lx) =>
    lesson(lx, 5, 3, "The Changing Room", "Phòng thay đồ & áo choàng", {
      vocabulary: [
        v(
          "Here you are",
          "/hɪə juː ɑː/",
          "Đây ạ (khi đưa đồ cho khách)",
          "Here you are, madam.",
          "🤲",
        ),
        v("This way", "/ðɪs weɪ/", "Mời đi lối này", "This way, please.", "➡️"),
      ],
      grammar: [
        g(
          "You take off clothes.",
          "Keep your underwear on, madam.",
          "Đừng bảo khách cởi đồ. Nói khách ĐƯỢC PHÉP giữ lại gì — câu đó trả quyền quyết định về cho khách và bỏ hết phần ngượng ngùng. 'Underwear' /ˈʌndəweə/ là đồ lót; từ này không có thẻ riêng nhưng phải nói được ngay và nói bằng giọng bình thường.",
          "Keep your underwear, madam.",
        ),
        g(
          "Change there.",
          "This way, please. The changing room.",
          "Chỉ phòng thay đồ bằng câu mời kèm cử chỉ tay mở, và đi trước dẫn khách chứ không chỉ trỏ.",
          "This way, please. Changing room.",
        ),
      ],
      speaking: [
        sp(
          "Where do I change?",
          "This way, please, madam.",
          "Dẫn khách đi, đừng chỉ tay rồi đứng yên. 'This' mở đầu bằng /ð/ có rung — lưỡi chạm răng, đừng thành 'đít'.",
        ),
        sp(
          "Do I take everything off?",
          "Keep your underwear on, madam.",
          "Trả lời thẳng và trả lời ngay. Khách hỏi câu này là đang ngại; ậm ừ một giây thôi cũng làm họ ngại thêm.",
          undefined,
          ["underwear", "on"],
        ),
        sp(
          "Is there a robe?",
          `Here you are, madam. A ${lx.items[0].word.toLowerCase()} and ${lx.items[2].word.toLowerCase()}s.`,
          "Đưa đồ thì nói 'Here you are' và đưa bằng hai tay. Kể luôn thứ đang đưa để khách biết đủ chưa.",
        ),
        sp(
          "Do I take the robe off?",
          "You are covered, madam.",
          "Khách hỏi câu này là đang lo bị hở. Trả lời bằng SỰ THẬT về tấm khăn phủ, không bằng một lời trấn an chung chung — và nói trước khi khách phải hỏi lần thứ hai.",
          undefined,
          ["covered"],
        ),
        sp(
          "I am ready.",
          "Any area to avoid, madam?",
          "Hỏi trước khi chạm, mỗi buổi, kể cả với khách quen. Câu này cho khách nói ra chỗ họ không muốn bị chạm mà không phải giải thích lý do.",
          undefined,
          ["avoid"],
        ),
      ],
      reading: read(
        `A guest asks ${lx.staff}: "Where do I change?" ${lx.staff} says: "This way, please, madam." ${lx.staff} gives a ${lx.items[0].word.toLowerCase()} and ${lx.items[2].word.toLowerCase()}s and says: "Here you are." The guest asks: "Do I take everything off?" ${lx.staff} says: "You can keep your underwear on, madam." Then ${lx.staff} shows the ${lx.items[1].word.toLowerCase()} and waits outside.`,
        [
          {
            q: "Khách hỏi có phải cởi hết không, câu trả lời đúng là gì?",
            options: [
              "Keep your underwear on, madam.",
              "Yes, take everything off.",
              "Up to you, madam.",
            ],
            correct: 0,
            explanation:
              "Câu này nói rõ khách được giữ lại gì, nên khách không phải đoán và không phải hỏi lại.",
          },
          {
            q: `${lx.staff} làm gì trong lúc khách thay đồ?`,
            options: ["Đợi ở ngoài", "Đứng trong phòng chờ", "Đi làm việc khác luôn"],
            correct: 0,
            explanation: `Bài đọc: ${lx.staff} "waits outside" — ở ngoài nhưng vẫn gần, để khách gọi được ngay.`,
          },
        ],
      ),
      game: [
        game(
          "Do I wear anything under the robe?",
          "Keep your underwear on, madam.",
          "No, madam. Nothing.",
          "Up to you, madam.",
          undefined,
          "Để khách tự đoán trong tình huống nhạy cảm. Quy định của khu nghỉ thì phải nói rõ ràng.",
        ),
        game(
          "Where can I put my bag?",
          `In the ${lx.items[1].word.toLowerCase()}, madam.`,
          "Put your bag on the seat, madam.",
          "Anywhere, madam. It is safe here.",
          undefined,
          "Không bao giờ bảo đảm an toàn cho đồ để hớ hênh. Chỉ đúng chỗ cất có khoá.",
        ),
        game(
          "Yes? Who is that?",
          "It is me, madam. Are you ready?",
          "Me, madam. I come in.",
          "It is me, madam. I will wait outside.",
          undefined,
          "Đáp án thứ ba lịch sự và an toàn, nhưng nó bỏ khách lại một mình mà không ai biết phải chờ bao lâu. Xưng mình rồi HỎI — câu hỏi trả quyền mở cửa về cho khách.",
        ),
      ],
    }),

  // Checking comfort DURING a treatment. Nothing in the spine has a learner
  // ask a question they must ask three or four times in one appointment,
  // and a guest in pain who has no sentence to interrupt with is the injury
  // this module exists to prevent.
  SW_5_1: (lx) =>
    lesson(lx, 5, 1, "Is That All Right?", "Hỏi khách có ổn không", {
      vocabulary: [
        v("Please", "/pliːz/", "Làm ơn, xin mời", "Please tell me, madam.", "🙏"),
        v("Of course", "/əv ˈkɔːs/", "Vâng, dĩ nhiên rồi", "Of course, madam.", "✔️"),
        v("Certainly", "/ˈsɜːtnli/", "Chắc chắn rồi (trang trọng)", "Certainly, sir.", "👍"),
      ],
      grammar: [
        g(
          "Good? Yes?",
          "Is the pressure all right?",
          "Hỏi bằng câu đủ, không hỏi bằng một chữ. Hỏi ít nhất ba lần một buổi: lúc mới bắt đầu, lúc đổi vùng, và lúc tăng lực.",
          "Is the pressure all right, yes?",
        ),
        g(
          "I do soft now.",
          "Of course, madam. Softer.",
          "Khách kêu đau thì đổi ngay và nói ra là mình đã đổi. Đừng chỉ im lặng làm nhẹ đi — khách không biết bạn có nghe hay không. 'Softer' là 'soft' + đuôi so sánh -er: nhẹ HƠN mức đang làm.",
          "Of course, madam. More soft.",
        ),
      ],
      speaking: [
        sp(
          "Mmm... that is a bit strong.",
          "Of course, madam. Softer.",
          "Đổi ngay lập tức và nói một tiếng. Câu này ngắn có lý do: đang giữa liệu trình, khách không muốn nghe giải thích dài.",
          undefined,
          ["softer"],
        ),
        sp(
          "Is it going to hurt?",
          "Please tell me, madam. I will stop.",
          "Cho khách một câu để dừng bạn lại. Khách nào biết mình dừng được thì mới thả lỏng ra được.",
          undefined,
          ["stop"],
        ),
        sp(
          "Could you bring me some water?",
          "Certainly, madam.",
          "'Certainly' trang trọng hơn một tiếng vâng suông và không mất thêm giây nào. Trọng âm âm tiết đầu: CER-tain-ly. Nhận lời ngay với việc bạn làm được; việc đổi phạm vi liệu trình thì không phải việc bạn nhận.",
        ),
        sp(
          "That feels nice.",
          "Is the pressure all right?",
          "Hỏi ít nhất ba lần một buổi: lúc mới bắt đầu, lúc đổi vùng, lúc tăng lực. Khách khen không có nghĩa là đủ nhẹ — nhiều người ngại nói. 'Pressure' trọng âm âm tiết đầu, /ˈpreʃə/, đuôi /ʃə/ nhẹ.",
          undefined,
          ["pressure"],
        ),
        sp(
          "Can you go a bit higher?",
          "Not there, madam. I am sorry.",
          "Câu này phải bật ra được không cần nghĩ, và nói bằng giọng bình thường — không cười trừ, không im lặng làm tiếp. Từ chối trước, xin lỗi sau; đảo lại thì lời từ chối nghe như đang thương lượng. Sau buổi, báo quản lý.",
          undefined,
          ["sorry"],
        ),
        sp(
          "I feel a little dizzy.",
          "One moment, madam. Please sit.",
          "Cho khách ngồi TRƯỚC đã, rồi mới đi gọi người — khách choáng mà đứng dậy đi theo bạn là lúc họ ngã. Phòng trị liệu nóng và khách vừa nằm lâu, nên chuyện này xảy ra thật.",
          undefined,
          ["sit"],
        ),
        sp(
          "What is that on my back?",
          "Careful, madam. The towel is hot.",
          "Báo TRƯỚC khi đặt khăn nóng xuống, và báo bằng đúng chữ 'hot'. Khách nằm sấp thì không nhìn thấy gì đang tới — lời báo là thứ duy nhất họ có.",
          undefined,
          ["careful", "hot"],
        ),
      ],
      reading: read(
        `${lx.staff} starts the ${lx.priced.en} and asks: "Is the pressure all right?" The guest says: "That is a bit strong." ${lx.staff} says: "Of course, madam. Softer." ${lx.staff} asks again after ten minutes. Before the end ${lx.staff} says: "Please tell me if it hurts. I will stop."`,
        [
          {
            q: `${lx.staff} hỏi khách về lực bấm mấy lần?`,
            options: ["Nhiều lần trong buổi", "Một lần lúc đầu", "Chỉ khi khách kêu"],
            correct: 0,
            explanation: `Bài đọc: hỏi lúc bắt đầu, rồi "asks again after ten minutes" — hỏi lại là việc bình thường, không phải làm phiền.`,
          },
          {
            q: "Khách nói mạnh quá thì đáp thế nào?",
            options: [
              "Of course, madam. Softer.",
              "It is normal, madam.",
              "OK, five minutes more.",
            ],
            correct: 0,
            explanation:
              "Đổi ngay và nói ra là đã đổi. Khách nằm sấp không nhìn thấy bạn, nên im lặng làm nhẹ đi thì khách không biết.",
          },
        ],
      ),
      game: [
        game(
          "That is too strong for me.",
          "Of course, madam. Softer.",
          "Strong is good, madam.",
          "Sorry madam, five minutes more only.",
          undefined,
          "Khách kêu mạnh quá mà mặc cả thời gian. Khách nói đau là giảm lực ngay, không thương lượng.",
        ),
        game(
          "Could you do my shoulders too?",
          "One moment. I will ask my manager.",
          "No shoulders, madam.",
          "Certainly, madam.",
          undefined,
          "Nhận lời nghe chiều khách, nhưng đổi phạm vi liệu trình giữa buổi không phải việc bạn tự quyết — liệu trình đã sàng lọc theo đúng vùng đã hẹn. Hỏi quản lý, và câu từ chối thẳng thì thô.",
        ),
        game(
          "Are we doing the towels now?",
          "Careful, madam. The towel is hot.",
          "Towel, madam. Hot.",
          "It is a warm towel, madam. Relax.",
          undefined,
          "Báo TRƯỚC khi đặt khăn nóng lên người khách, và báo bằng đúng chữ 'hot'. 'Warm' làm khách không chuẩn bị, mà khách nằm sấp thì không nhìn thấy gì đang tới.",
        ),
      ],
    }),

  // The one F&B question with a fatal wrong answer, and the spine's 5.1 —
  // "of course, certainly" — is the exact slot for it: the polite reflex
  // "Yes madam, it is fine" is what kills people. Four auditors ranked this
  // first for the module.
  FB_5_1: (lx) =>
    lesson(lx, 5, 1, "Any Allergies?", "Hỏi dị ứng", {
      vocabulary: [
        v("Please", "/pliːz/", "Làm ơn, xin mời", "Please tell me, madam.", "🙏"),
        v("Of course", "/əv ˈkɔːs/", "Vâng, dĩ nhiên rồi", "Of course, madam.", "✔️"),
        v("Certainly", "/ˈsɜːtnli/", "Chắc chắn rồi (trang trọng)", "Certainly, sir.", "👍"),
        v("Allergy", "/ˈælədʒi/", "Dị ứng thức ăn", "Any allergies, madam?", "⚠️"),
      ],
      grammar: [
        g(
          "No problem, no nuts.",
          "One moment. I will ask the kitchen.",
          "Không bao giờ tự khẳng định món có gì. Bạn không nấu món đó và công thức đổi theo ngày. Câu duy nhất đúng là đi hỏi bếp rồi quay lại trả lời.",
          "One moment. I will ask to the kitchen.",
        ),
        g(
          "You allergy?",
          "Any allergies, madam? Please tell me.",
          "Hỏi dị ứng bằng câu đủ, hỏi mọi bàn, và hỏi TRƯỚC khi nhận gọi món chứ không phải lúc bưng ra.",
          "Do you have allergy, madam?",
        ),
      ],
      speaking: [
        sp(
          "Does this have peanuts?",
          "One moment. I will ask the kitchen.",
          "Đừng đoán, dù chắc đến mấy. Và đừng mở đầu bằng 'Of course' — đáp một câu hỏi có/không bằng 'Of course' thì người Anh nghe ra là 'dĩ nhiên là CÓ'. Câu an toàn chỉ nói bạn sẽ đi hỏi ai. 'Kitchen' /ˈkɪtʃɪn/ là gian bếp — không có thẻ riêng nhưng phải nói được ngay, trọng âm âm tiết đầu.",
          undefined,
          ["kitchen"],
        ),
        sp(
          "My son is allergic to milk.",
          "Thank you, sir. I will tell the kitchen.",
          "Khách đang BÁO một việc, không nhờ một việc — nên cảm ơn, đừng nhận lời. 'Certainly' ở đây nghe như đang đồng ý với một yêu cầu, và nó bỏ mất lời cảm ơn dành cho người vừa giúp bạn tránh làm hại họ.",
          undefined,
          ["kitchen"],
        ),
        sp(
          "Is there anything with nuts?",
          "Please wait, madam. I will ask.",
          "Xin khách chờ rồi đi hỏi thật. Chờ ba mươi giây tốt hơn một câu đoán.",
          undefined,
          ["wait", "ask"],
        ),
        sp(
          "Oh, is that ours?",
          "Careful, sir. The plate is hot.",
          "Nói TRƯỚC khi đặt đĩa xuống, không nói sau. Đây là câu bạn lặp lại nhiều lần mỗi ca, nên phải bật ra không cần nghĩ. 'Careful' trọng âm âm tiết đầu: CARE-ful.",
          undefined,
          ["careful", "hot"],
        ),
        sp(
          "Two more beers, please.",
          "One moment. I will ask my manager.",
          "Khách đã uống bao nhiêu và có nên dừng không là quyết định của quản lý ca — nhận lời rồi rót thêm là chỗ nhân viên mới hay bị kỷ luật nhất. Riêng TUỔI thì người rót tự kiểm: chưa đủ mười tám là không phục vụ, không có ngoại lệ. 'Manager' /ˈmænɪdʒə/, nhấn âm đầu MAN.",
          undefined,
          ["manager"],
        ),
      ],
      reading: read(
        `A guest says: "My son is allergic to milk." ${lx.staff} does not guess. ${lx.staff} says: "Thank you, sir. I will tell the kitchen." ${lx.staff} writes it on the order and tells the chef. The chef changes one dish. ${lx.staff} comes back and says: "The kitchen knows, sir. The chef says it is safe."`,
        [
          {
            q: `Khách báo con bị dị ứng sữa, ${lx.staff} phải làm gì?`,
            options: ["Đi hỏi bếp rồi trả lời", "Trả lời là không có", "Bảo khách gọi món khác"],
            correct: 0,
            explanation:
              "Người phục vụ không nấu món đó và công thức đổi theo ngày. Đoán đúng chín lần vẫn không bù được lần thứ mười.",
          },
          {
            q: `Vì sao ${lx.staff} ghi vào phiếu gọi món?`,
            options: [
              "Để bếp biết chắc chắn, không phụ thuộc trí nhớ",
              "Để tính thêm tiền",
              "Để nhớ bàn nào đã gọi",
            ],
            correct: 0,
            explanation:
              "Nói miệng qua ba người thì mất. Viết ra là cách duy nhất chắc chắn tới bếp.",
          },
        ],
      ),
      game: [
        game(
          "Is there milk in this soup?",
          "One moment. I will ask the kitchen.",
          "No milk, madam.",
          "I think no milk, madam.",
          undefined,
          "'Tôi nghĩ là không' không phải câu trả lời cho câu hỏi dị ứng. Chỉ bếp mới biết chắc thành phần.",
        ),
        game(
          "We are ready to order.",
          "Any allergies at the table, madam?",
          "Order now? OK madam.",
          "Yes madam, please tell me your order now.",
          undefined,
          "Hỏi dị ứng TRƯỚC khi ghi món. Ghi xong mới hỏi thì bếp đã bắt đầu nấu.",
        ),
        game(
          "I am allergic to seafood.",
          "Thank you, sir. I will tell the kitchen.",
          "OK, no seafood.",
          "No problem, sir. Everything here is safe.",
          undefined,
          "Không bao giờ tự bảo lãnh một món là an toàn. Việc của mình là chuyển thông tin cho bếp và mang câu trả lời của bếp ra.",
        ),
        game(
          "Is that our soup?",
          "Careful, sir. The plate is hot.",
          "Yes, soup. Hot plate, careful.",
          "Yes, sir. Here is your soup.",
          undefined,
          "Đặt đĩa nóng xuống mà không báo là cách làm khách bỏng tay phổ biến nhất. Nói 'Careful' TRƯỚC, rồi mới đặt xuống — không nói sau.",
        ),
        game(
          "Excuse me, my spoon fell.",
          "One moment, sir. A new spoon.",
          "Spoon OK, sir. Please use.",
          "Yes sir, I will pick it up.",
          undefined,
          "Đồ rơi xuống sàn là thay, không nhặt lên lau rồi dùng tiếp — và nhặt lên TRƯỚC MẶT khách rồi mang đi cũng chưa đủ: phải nói rõ sẽ mang cái MỚI ra. Vệ sinh là thứ khách nhìn thấy, không phải thứ khách tin.",
        ),
      ],
    }),

  // Reading an order back. The spine's 6.3 already owns "again" and
  // "understand"; in a restaurant those two words ARE the read-back, and
  // the module currently teaches a server to nod at a four-item order.
  FB_6_3: (lx) =>
    lesson(lx, 6, 3, "Taking the Order", "Nhận gọi món & đọc lại", {
      vocabulary: [
        v("Again", "/əˈɡen/", "Lại, lần nữa", "Could you say that again?", "🔁"),
        v("Understand", "/ˌʌndəˈstænd/", "Hiểu", "I understand, madam.", "💡"),
      ],
      grammar: [
        g(
          "What you want?",
          "May I take your order?",
          "Câu mở đầu nhận gọi món là một lời mời, không phải một câu hỏi trống. Cầm bút sẵn rồi mới hỏi.",
          "May I take your orders?",
        ),
        g(
          "Yes yes, I know.",
          "Could you say that again?",
          "Nghe không rõ thì hỏi lại ngay tại bàn. Gật cho qua rồi mang sai món ra thì mất gấp đôi thời gian và mất cả bữa ăn của khách.",
          "Could you say again, please?",
        ),
      ],
      speaking: [
        sp(
          "Two coffees and one soup, please.",
          "Two coffees, one soup. I understand, madam.",
          "Đọc lại nguyên đơn hàng rồi mới rời bàn. Đọc lại số lượng trước, tên món sau — đúng thứ tự khách vừa nói.",
        ),
        sp(
          "Sorry, could you repeat that?",
          "Of course. Two coffees, one soup.",
          "Khách hỏi lại thì đọc lại đúng những gì đã ghi, đừng nói lại theo trí nhớ.",
        ),
        sp(
          "No allergies. We are ready to order.",
          "Certainly, madam. May I take your order?",
          "Tới bàn trong vòng vài giây khi khách gọi. 'order' trọng âm âm tiết đầu: OR-der.",
        ),
        sp(
          "You brought the wrong soup.",
          "I am very sorry, madam. One moment.",
          "Xin lỗi trước, sửa sau, và đừng giải thích ai ghi sai. Mang sai món là lỗi của nhà hàng, không phải của người bưng.",
          undefined,
          ["sorry"],
        ),
        sp(
          "Just two waters for now, please.",
          "Two waters. I understand, madam.",
          "Đồ uống cũng đọc lại như món ăn — sai hai ly nước không ai giận, nhưng thói quen đọc lại thì phải đều tay từ thứ nhỏ nhất.",
        ),
        sp(
          "One soup, please.",
          "I am sorry. The soup is finished.",
          "Món hết thì nói ngay khi khách gọi, đừng để bếp trả ngược ra sau mười phút. Nói xong gợi ý món khác — im lặng là bắt khách tự làm lại từ đầu.",
          undefined,
          ["finished"],
        ),
        sp(
          "Yes, we are ready to order now.",
          "Any allergies at the table, madam?",
          "Ôn tuần 5, dùng thật ở tuần 6: câu này đứng TRƯỚC lúc cầm bút, không phải sau khi ghi xong. Ghi xong mới hỏi thì bếp đã bắt đầu nấu.",
          undefined,
          ["allergies"],
        ),
      ],
      reading: read(
        `${lx.staff} asks first: "Any allergies at the table, madam?" The guest says: "No, nothing." Then the guest says: "Two coffees and one soup, please." The room is noisy. ${lx.staff} asks: "Could you say that again?" The guest repeats it. ${lx.staff} writes it down and reads it back: "Two coffees, one soup. I understand, madam." Then ${lx.staff} goes to the kitchen.`,
        [
          {
            q: `Vì sao ${lx.staff} hỏi lại khách?`,
            options: ["Vì phòng ăn ồn, nghe không chắc", "Vì khách nói sai", "Vì món đó đã hết"],
            correct: 0,
            explanation: `Bài đọc: "The room is noisy." — nghe không chắc thì hỏi lại ngay tại bàn.`,
          },
          {
            q: "Sau khi ghi xong phải làm gì?",
            options: [
              "Đọc lại cả đơn cho khách nghe",
              "Đi thẳng vào bếp",
              "Hỏi khách trả tiền thế nào",
            ],
            correct: 0,
            explanation:
              "Đọc lại là lần duy nhất khách sửa được trước khi bếp nấu. Bỏ bước này là để khách phát hiện lỗi lúc món đã ra.",
          },
        ],
      ),
      game: [
        game(
          "Three teas, please.",
          "Three teas. I understand, sir.",
          "OK three.",
          "Yes sir, three teas now.",
          undefined,
          "Đọc lại đơn để khách nghe và sửa là bước bắt buộc. 'Now' chỉ là hứa nhanh, không phải xác nhận.",
        ),
        game(
          "Sorry, I did not hear you.",
          "Of course, madam. Two coffees, one soup.",
          "Say again.",
          "It is fine, madam. I remember it.",
          undefined,
          "Người không nghe rõ ở đây là KHÁCH. Khách xin nghe lại thì đọc lại đúng đơn đã ghi — không bắt khách nói lại, và không bỏ qua.",
        ),
        game(
          "One tea, please. No — two.",
          "Two teas. I understand, madam.",
          "One tea and two tea, madam.",
          "Yes madam, one tea coming.",
          undefined,
          "Khách vừa sửa số. Đọc lại con số MỚI — không đọc lại con số đầu tiên, và không cộng cả hai lại.",
        ),
        game(
          "We are ready. Four soups, please.",
          "Any allergies at the table, madam?",
          "Four soup, madam. OK.",
          "Four soups. I will tell the kitchen, madam.",
          undefined,
          "Đáp án thứ ba đọc lại đúng đơn và đúng ngữ pháp — nhưng bỏ mất câu hỏi dị ứng, và bếp bắt đầu nấu ngay sau câu đó. Hỏi dị ứng trước, đọc lại đơn sau.",
        ),
      ],
    }),

  // The desk that never closes. The spine's 3.3 teaches every department to
  // say "we close at eleven" — for a front desk that sentence is false, and
  // two auditors flagged it as the answer that sends a guest with a problem
  // at 2 a.m. away from the only staffed counter in the building.
  FO_3_3: (lx) =>
    lesson(lx, 3, 3, "The Desk Never Closes", "Quầy trực 24 giờ", {
      vocabulary: [
        v("Open", "/ˈəʊpən/", "Mở cửa", "The desk is open all day.", "🔓"),
        v("Close", "/kləʊz/", "Đóng cửa", "The restaurant closes at ten.", "🔒"),
      ],
      grammar: [
        g(
          "We close eleven.",
          "The desk never closes, sir.",
          "Quầy lễ tân không đóng. Nói giờ đóng cửa là đuổi khách có việc lúc hai giờ sáng khỏi chỗ duy nhất còn người trực.",
          "The desk never close, sir.",
        ),
        g(
          "Night no people.",
          "Someone is here all night.",
          "Khách hỏi ban đêm có ai không là đang lo. Trả lời rõ ràng là có người, đừng trả lời bằng giờ giấc.",
          "Someone are here all night.",
        ),
      ],
      speaking: [
        sp(
          "What time do you close?",
          "We never close, sir. Twenty-four hours.",
          "Đừng nhận câu hỏi rồi trả lời bằng một con số. Câu hỏi này có tiền đề sai, và việc của bạn là sửa tiền đề đó.",
          undefined,
          ["never", "close"],
        ),
        sp(
          "Is anyone here at midnight?",
          "Yes, madam. Someone is here.",
          "Trả lời 'yes' ngay từ đầu câu. Khách hỏi lúc nửa đêm không có kiên nhẫn nghe vòng vo.",
          undefined,
          ["someone"],
        ),
        sp(
          "What time does the restaurant close?",
          "It closes at ten, madam.",
          "Giờ đóng cửa của BỘ PHẬN KHÁC thì trả lời bình thường. Chỉ quầy lễ tân là không có giờ đóng.",
        ),
      ],
      reading: read(
        `A guest asks ${lx.staff}: "What time do you close?" ${lx.staff} says: "The desk is open twenty-four hours, sir. Someone is here all night." The guest asks about the restaurant. ${lx.staff} says: "It closes at ten, sir." The guest says: "Thank you." ${lx.staff} says: "You are welcome."`,
        [
          {
            q: "Quầy lễ tân đóng cửa lúc mấy giờ?",
            options: ["Không đóng cửa", "Mười một giờ đêm", "Mười giờ tối"],
            correct: 0,
            explanation: `Bài đọc: "The desk is open twenty-four hours." — luôn có người trực.`,
          },
          {
            q: "Nhà hàng đóng cửa lúc mấy giờ?",
            options: ["Mười giờ", "Không đóng cửa", "Hai giờ"],
            correct: 0,
            explanation:
              "Bộ phận khác vẫn có giờ đóng cửa bình thường — chỉ riêng quầy lễ tân là không.",
          },
        ],
      ),
      game: [
        game(
          "Is the front desk open at 3 a.m.?",
          "Yes, sir. Someone is here.",
          "Night closed, sir.",
          "Yes sir, but please come back in the morning.",
          undefined,
          "Vừa nói có người trực vừa bảo khách sáng mai quay lại. Quầy 24/24 nghĩa là giải quyết được ngay bây giờ.",
        ),
        game(
          "What time does the front desk close?",
          "It does not close, madam. Twenty-four hours.",
          "Eleven, madam.",
          "Ten o'clock, madam.",
          undefined,
          "Cả hai đáp án sai đều nêu một giờ đóng cửa. Quầy lễ tân không có giờ đóng.",
        ),
      ],
    }),

  // A key handed to whoever asks for it is the failure this department is
  // built to prevent, and the spine's 5.2 — one moment, please wait — is
  // where the pause belongs. Two auditors put verification first for the
  // module; nothing in six weeks asks a guest to prove who they are.
  FO_5_2: (lx) =>
    lesson(lx, 5, 2, "May I See Your Passport?", "Xác minh trước khi đưa chìa", {
      vocabulary: [
        v("Moment", "/ˈməʊmənt/", "Một lát", "One moment, please.", "⏳"),
        v("Wait", "/weɪt/", "Đợi", "Please wait here, sir.", "⏸️"),
      ],
      grammar: [
        g(
          "Room number? OK, here.",
          "May I see your passport, sir?",
          "Số phòng không phải bằng chứng — ai đứng cạnh quầy cũng nghe được. Chìa khoá chỉ đưa sau khi xem giấy tờ, không có ngoại lệ, kể cả khách quen.",
          "May I to see your passport, sir?",
        ),
        g(
          "I no can do.",
          "One moment. I will call my manager.",
          "Việc vượt thẩm quyền thì gọi quản lý, và phải NÓI RA là mình đang đi gọi. Im lặng bỏ đi khiến khách tưởng bị phớt lờ. Câu này dùng được cho mọi tình huống bạn không tự quyết được.",
          "One moment. I will call to my manager.",
        ),
        g(
          "You wait.",
          "One moment, please. I will check.",
          "Xin khách chờ bằng câu mời, và nói rõ bạn đang làm gì trong lúc đó.",
          "One moment, please. I checking.",
        ),
      ],
      speaking: [
        sp(
          "I lost my key.",
          "May I see your passport, sir?",
          "Đừng xin lỗi trước khi hỏi. Xem giấy tờ là việc bình thường và khách quen với nó ở mọi khách sạn tốt.",
          undefined,
          ["passport"],
        ),
        sp(
          "Hello? Is that the front desk?",
          "Front Office. Good morning, madam.",
          "Nhấc máy trong ba hồi chuông và xưng bộ phận TRƯỚC, chào sau — người gọi cần biết ngay mình bấm đúng số chưa. Nói chậm hơn khi nói qua điện thoại: người nghe không thấy miệng bạn.",
          undefined,
          ["office"],
        ),
        sp(
          "My wife is not well.",
          "One moment, sir. I will get help.",
          "Không hỏi thêm câu nào, không tự chẩn đoán, không rời quầy để chạy tới xem. Nói ra là mình đang đi gọi người, rồi gọi thật — quầy lễ tân là nơi mọi cuộc gọi khẩn đi ra.",
          undefined,
          ["help"],
        ),
        sp(
          "Here you are. My passport.",
          "Thank you, sir. One moment, please.",
          "Cầm giấy tờ thì cảm ơn rồi xin khách chờ trong lúc đối chiếu. Đừng vừa xem vừa im lặng.",
        ),
        sp(
          "I want to speak to the manager.",
          "One moment. I will call my manager.",
          "Khách đòi gặp quản lý thì gọi ngay, đừng hỏi lý do và đừng tự thanh minh. Gọi nhanh là cách hạ nhiệt tốt nhất. 'Manager' đọc /ˈmænɪdʒə/ — nhấn âm đầu MAN, đuôi -ger là /dʒə/ như trong village, không phải /ɡə/.",
          undefined,
          ["manager"],
        ),
        sp(
          "Which room is Mr Chen in?",
          "I am sorry, sir. I cannot say.",
          "Không xác nhận, không phủ nhận. Mời người hỏi ngồi chờ nghe như đã từ chối, nhưng nó đã nói rằng có người tên đó ở đây — chỉ còn thiếu số phòng. Nói mình không nói được, bằng giọng bình thường, rồi báo quản lý.",
          undefined,
          ["sorry"],
        ),
      ],
      reading: read(
        `A guest says: "I lost my key. Room ${lx.roomNo.spoken}." ${lx.staff} says: "May I see your passport, sir?" The guest gives it. ${lx.staff} says: "Thank you, sir. One moment, please." ${lx.staff} checks the name against the room, then gives a new ${lx.items[0].word.toLowerCase()} and says: "Here you are, sir."`,
        [
          {
            q: `Vì sao ${lx.staff} xem hộ chiếu trước khi đưa chìa?`,
            options: [
              "Số phòng ai đứng cạnh quầy cũng nghe được",
              "Vì khách chưa trả tiền phòng",
              "Vì đó là thủ tục nhận phòng",
            ],
            correct: 0,
            explanation:
              "Biết số phòng không chứng minh được đó là phòng của mình. Chỉ giấy tờ mới nối được tên với phòng.",
          },
          {
            q: "Người lạ hỏi số phòng của khách khác thì làm gì?",
            options: [
              "Nói mình không nói được, rồi báo quản lý",
              "Mời họ ngồi chờ ở sảnh",
              "Nói số phòng",
            ],
            correct: 0,
            explanation:
              "Mời ngồi chờ nghe như đã từ chối, nhưng nó xác nhận có người tên đó ở đây. Câu duy nhất không lộ gì là câu nói rằng bạn không nói được — rồi để quản lý quyết.",
          },
        ],
      ),
      game: [
        game(
          "My key does not work.",
          "May I see your passport, sir?",
          "OK, one key, sir.",
          "Of course, sir. Here.",
          undefined,
          "Đưa chìa mới mà không kiểm giấy tờ. Ai cũng có thể nói 'chìa phòng tôi hỏng'.",
        ),
        game(
          "This is not good enough.",
          "One moment. I will call my manager.",
          "Sorry sorry, sir.",
          "I am very sorry, sir. What can I do?",
          undefined,
          "Xin lỗi thì đúng, nhưng hỏi khách 'tôi làm gì được?' là đẩy việc ngược cho khách. Vượt thẩm quyền thì gọi quản lý.",
        ),
        game(
          "Which room is Mrs Chen in?",
          "I am sorry, madam. I cannot say.",
          "Room seven-two-oh.",
          "I am sorry, madam. Please wait here.",
          undefined,
          "Đáp án thứ ba nghe như đã từ chối, và đó là chỗ bẫy: mời người hỏi ngồi chờ đã nói rằng CÓ một người tên đó ở đây — chỉ còn thiếu số phòng. Không xác nhận, không phủ nhận, rồi báo quản lý.",
        ),
      ],
    }),

  // The guest's own name, and the two ways this department gets it wrong:
  // reading a family name as a given name, and using a first name at all.
  // The spine's 1.2 already teaches spelling a name — for Guest Relations
  // that is the smaller half of the job.
  GR_1_2: (lx) =>
    lesson(lx, 1, 2, "The Guest's Name", "Tên khách & cách gọi", {
      vocabulary: [
        v("Name", "/neɪm/", "Tên", "May I have your name?", "📛"),
        v("Spell", "/spel/", "Đánh vần", "How do you spell that?", "🔤"),
        v("Sir", "/sɜː/", "Thưa ông (gọi khách nam)", "Your family name, sir. Mr Chen.", "🎩"),
      ],
      grammar: [
        g(
          "Hello Anna.",
          "Good morning, Ms Smith.",
          "Gọi khách bằng HỌ kèm Mr, Mrs hoặc Ms — không gọi tên riêng, dù khách trẻ. Không chắc là bà hay cô thì dùng Ms, đọc /mɪz/ có rung ở cuối, khác hẳn Miss /mɪs/.",
        ),
        g(
          "Spell please.",
          "How do you spell that?",
          "Muốn khách đánh vần, hỏi trọn câu. Đủ 26 tên chữ cái: A /eɪ/ B /biː/ C /siː/ D /diː/ E /iː/ F /ef/ G /dʒiː/ H /eɪtʃ/ I /aɪ/ J /dʒeɪ/ K /keɪ/ L /el/ M /em/ N /en/ O /əʊ/ P /piː/ Q /kjuː/ R /ɑː/ S /es/ T /tiː/ U /juː/ V /viː/ W /ˈdʌbljuː/ X /eks/ Y /waɪ/ Z /zed/. Tám chữ hay lẫn nhất: A · E · I · G · J · R · W · Y.",
          "How do you spelling that?",
        ),
        g(
          "Mr Wei, welcome.",
          "Welcome, Mr Chen.",
          "Tên Trung, Hàn, Việt viết HỌ TRƯỚC: Chen Wei thì họ là Chen. Gọi 'Mr Wei' là gọi bằng tên riêng. Không chắc thì hỏi: which is your family name?",
        ),
      ],
      speaking: [
        sp(
          "My name is Chen Wei.",
          "Welcome, Mr Chen.",
          "Họ đứng trước ở tên Trung, Hàn, Việt. Nghe 'Chen Wei' thì gọi Mr Chen, không phải Mr Wei.",
        ),
        sp(
          "I am Anna Smith. A-N-N-A.",
          "Thank you, Ms Smith.",
          "Nhắc lại HỌ để khách biết bạn nghe đúng. Không chắc bà hay cô thì Ms là an toàn nhất.",
        ),
        sp(
          "Sorry, which name do you use?",
          "Your family name, sir. Mr Chen.",
          "Hỏi thẳng còn hơn gọi sai suốt kỳ nghỉ. Câu hỏi này lịch sự ở mọi nền văn hoá.",
        ),
      ],
      reading: read(
        `A guest says: "My name is Chen Wei." ${lx.staff} does not say "Mr Wei". ${lx.staff} says: "Welcome, Mr Chen." Another guest says: "I am Anna Smith. A-N-N-A, S-M-I-T-H." ${lx.staff} writes each letter and says: "Thank you, Ms Smith."`,
        [
          {
            q: "Khách tên Chen Wei thì gọi là gì?",
            options: ["Mr Chen", "Mr Wei", "Mr Chen Wei"],
            correct: 0,
            explanation:
              "Tên Trung, Hàn, Việt viết họ trước: Chen là họ. Gọi 'Mr Wei' là gọi bằng tên riêng.",
          },
          {
            q: "Không biết khách đã lập gia đình chưa thì dùng gì?",
            options: ["Ms", "Mrs", "Miss"],
            correct: 0,
            explanation:
              "'Ms' dùng được cho mọi phụ nữ và không hỏi gì về đời tư. 'Mrs' và 'Miss' đều là đoán.",
          },
        ],
      ),
      game: [
        game(
          "I am Kim Min-jun.",
          "Welcome, Mr Kim.",
          "Hello Min-jun, welcome here.",
          "Welcome, Mr Min-jun. This way, please.",
          undefined,
          "Tên Hàn, Trung, Việt viết HỌ TRƯỚC: Kim là họ, Min-jun là tên. Gọi 'Mr Min-jun' là gọi khách bằng tên riêng.",
        ),
        game(
          "My name is Anna Smith.",
          "Thank you, Ms Smith.",
          "Hello Anna.",
          "Thank you, Mrs Anna. Please come in.",
          undefined,
          "Hai lỗi cùng lúc: gọi bằng tên riêng, và tự đoán khách đã có gia đình. Không chắc thì dùng Ms.",
        ),
      ],
    }),

  // Confirming that a named guest is staying is the commonest way a hotel
  // hands a stranger what they came for. The spine's 5.4 owns sorry and
  // excuse me; a refusal is exactly what those two words are for here.
  GR_5_4: (lx) =>
    lesson(lx, 5, 4, "I Cannot Say", "Từ chối tiết lộ thông tin khách", {
      vocabulary: [
        v(
          "Excuse me",
          "/ɪkˈskjuːz miː/",
          "Xin phép, xin lỗi (khi làm phiền)",
          "Excuse me, sir.",
          "🙇",
        ),
        v("Sorry", "/ˈsɒri/", "Xin lỗi (khi có lỗi)", "I am sorry, madam.", "😔"),
      ],
      grammar: [
        g(
          "Yes, she is here.",
          "I am sorry, sir. I cannot say.",
          "Không xác nhận một người có ở khách sạn hay không, với bất kỳ ai. Chỉ cần nói 'có' là đã trao đi thứ người hỏi cần.",
        ),
        g(
          "You go find her.",
          "Excuse me, sir. One moment.",
          "Từ chối rồi vẫn phải lịch sự và vẫn phải giúp: mời người hỏi chờ, rồi báo quản lý xử lý.",
        ),
      ],
      speaking: [
        sp(
          "Is Mrs Chen staying here?",
          "I am sorry, sir. I cannot say.",
          "Câu này nói bằng giọng bình thường, không hạ giọng như đang giấu. Đây là quy định, không phải chuyện riêng của bạn.",
          undefined,
          ["sorry"],
        ),
        sp(
          "I am her husband. Just tell me.",
          "Excuse me, sir. One moment, please.",
          "Người hỏi nói là người nhà cũng không đổi gì — bạn không kiểm chứng được. Mời chờ rồi gọi quản lý.",
        ),
        sp(
          "Delivery. This is for room seven-two-oh.",
          "One moment, sir. Reception takes it.",
          "Giao hàng hợp lệ vẫn không đi thẳng lên phòng: mọi món đồ vào khách sạn đều qua lễ tân để có người ghi nhận. Khác với người lạ gửi đồ cho KHÁCH CỤ THỂ — ca đó gọi quản lý (lượt dưới).",
          undefined,
          ["reception"],
        ),
        sp(
          "Can you give her this letter?",
          "One moment. I will call my manager.",
          "Người đã bị từ chối mà không bỏ đi, lại chuyển sang gửi đồ — đó là lúc việc này thôi thuộc về bạn. Nhận đồ nghe như vô hại nhưng nó đưa một vật vào khách sạn không ai kiểm, và biến bạn thành kênh liên lạc cho người mà khách có thể đang tránh. Gọi quản lý.",
          undefined,
          ["manager"],
        ),
      ],
      reading: read(
        `A man asks ${lx.staff}: "Is Mrs Chen staying here?" ${lx.staff} says: "I am sorry, sir. I cannot say." The man says: "I am her husband." ${lx.staff} does not change the answer. ${lx.staff} says: "Excuse me, sir. One moment, please." The man then asks ${lx.staff} to pass on a letter. ${lx.staff} does not take it. ${lx.staff} says: "One moment. I will call my manager." The manager comes and talks to the man.`,
        [
          {
            q: `Người hỏi nói mình là chồng khách, ${lx.staff} có nói không?`,
            options: [
              "Không — không kiểm chứng được, và gọi quản lý",
              "Có, vì đó là người nhà",
              "Có, nhưng chỉ nói số tầng",
            ],
            correct: 0,
            explanation:
              "Người xưng là người nhà thì càng phải cẩn thận. Bạn không có cách nào kiểm chứng, nên không phải bạn là người quyết định.",
          },
          {
            q: "Người đó nhờ chuyển một lá thư, nên làm gì?",
            options: [
              "Không nhận, gọi quản lý",
              "Nhận thư vì việc đó không tiết lộ gì",
              "Nhận rồi bỏ vào hộp thư",
            ],
            correct: 0,
            explanation:
              "Người đã bị từ chối mà chuyển sang gửi đồ thì việc này thôi thuộc thẩm quyền tuyến đầu. Và chỉ cần nhận thư là bạn đã xác nhận rằng có ai đó ở đây để mà nhận.",
          },
        ],
      ),
      game: [
        game(
          "Is Mr Tran in room seven-two-oh?",
          "I am sorry, sir. I cannot say.",
          "No, sir.",
          "One moment, sir. I will look in the computer.",
          undefined,
          "Cả hai đáp án kia đều đã trả lời. 'No' nói rằng ông Trần KHÔNG ở phòng đó — tức là xác nhận có danh sách và bạn đang đọc nó. Còn mở máy tra giúp thì đúng là đang tra thật. Không xác nhận, không phủ nhận, không tra: câu duy nhất an toàn là câu không nói gì về khách.",
        ),
        game(
          "Please just give her this bag.",
          "One moment. I will call my manager.",
          "Room seven-two-oh.",
          "She is in the lounge.",
          undefined,
          "Nói khách đang ở sảnh nghe như từ chối nhận đồ, nhưng nó vừa xác nhận khách có ở đây vừa chỉ chỗ tìm — với đúng người vừa bị từ chối một lần. Người không bỏ đi sau lần từ chối đầu là việc của quản lý, không phải của bạn.",
        ),
      ],
    }),
};

function reviewWordsFor(lx: P0Lexicon, week: number): string[] | undefined {
  if (week === 1) return undefined;
  // The review list must be built from the lessons the learner actually
  // gets — department override first, spine as fallback — or the two drift:
  // a headword added by an override (F&B's Allergy, week 5) never entered
  // the review schedule, and a headword swapped out by one would have left
  // the schedule pointing at a card that no longer exists.
  const realWeek = (w: number) =>
    WEEK_META[w].build(lx).map((l) => DEPT_LESSONS[l.lessonId]?.(lx) ?? l);
  const earlier: string[] = [];
  for (let w = 1; w < week; w++) {
    for (const l of realWeek(w)) {
      for (const item of l.vocabulary) earlier.push(item.word);
    }
  }
  // Checkpoint recycles broadly — but as a SAMPLE, not a dump. The full
  // 47-item list meant VocabSuite's draw covered 8.5% of the phase in the
  // one week whose job is consolidation; spread() keeps every prior week
  // represented while the checkpoint's own paper still samples the whole
  // phase via buildPaper.
  //
  // Week 5 is taken WHOLE first, then the rest is sampled. Sampling the
  // combined list evenly gave week 5 about three slots, so six of its nine
  // headwords — Please, Certainly, Moment, Here you are, Excuse me, Sorry,
  // the courtesy formulas the job runs on — reached the checkpoint having
  // never been recycled once. Four audit reports counted it independently.
  // Recency argues the other way too: week 5 is the week the checkpoint sits
  // next to, so it is the one a spaced-retrieval schedule should not skip.
  if (week === 6) {
    const w5: string[] = [];
    for (const l of realWeek(5)) for (const item of l.vocabulary) w5.push(item.word);
    const before5 = earlier.filter((w) => !w5.includes(w));
    return [...new Set([...w5, ...spread(before5, 20 - w5.length)])];
  }
  // Every headword of last week, not a six-item slice of it. Six slots cannot
  // cover a nine-item week however they are chosen, and `slice(-6)` chose the
  // literal tail, so lessons 1-2 of every week went to the checkpoint never
  // reviewed. Returning the whole week guarantees each headword one spaced
  // retrieval at lag 1.
  const lastWeek: string[] = [];
  for (const l of realWeek(week - 1)) {
    for (const item of l.vocabulary) lastWeek.push(item.word);
  }
  // Plus a lag-3 visit. The list was strictly lag-1 — a word met in week 1
  // was not seen again until week 6, and week 5's courtesy formulas reached
  // the checkpoint with a single spaced retrieval. Three items from three
  // weeks back put an expanding interval in the schedule; spread() so the
  // sample crosses lessons instead of taking one lesson's head.
  const threeBack = week - 3;
  if (threeBack >= 1) {
    const src: string[] = [];
    for (const l of WEEK_META[threeBack].build(lx)) {
      for (const item of l.vocabulary) src.push(item.word);
    }
    lastWeek.push(...spread(src, 3, week % 3));
  }
  return [...new Set(lastWeek)];
}

/** Widen the per-lesson headword lock (see lesson()) to the whole week.
 *
 *  Lesson 3.4 recycles lesson 3.1s clock words and 2.1s room numbers; those
 *  are words this learner has been taught and is being asked to say, so they
 *  are not droppable either. Done here rather than in lesson() because this
 *  is the first point that can see all four lessons at once, department
 *  overrides included. */
/** Locks every headword a WEEK teaches into the requiredTokens of any target
 *  that already says it, so the grader cannot pass an answer with the lesson
 *  word deleted. Exported because Phase 1 shipped without it: three audits
 *  measured the same hole independently — a Phase 1 target stripped of its
 *  headword passed 96.2% of the time against 2.3% in Phase 0, and a simulated
 *  oral checkpoint cleared 100% of sittings saying "This is our , sir."  */
/** Re-exported so the content layer keeps one name for it. The list itself
 *  lives in the grader, where it also reaches the twenty-six hand-authored
 *  weeks and every grammar model, not only the weeks that call
 *  lockWeekHeadwords(). */
export { PROMISE_VERBS };

export function lockWeekHeadwords(
  lessons: LessonContent[],
  reviewWords: string[] = [],
): LessonContent[] {
  const heads = [
    ...new Set(
      [
        ...lessons.flatMap((l) => l.vocabulary).map((v) => v.word),
        // The week's REVIEW list too. This scanned only the cards a week
        // teaches, so every "Ôn tuần N" item — the entire retrieval half of
        // the course — was ungraded on the word it exists to retrieve: an
        // audit measured 64 of 316 drop-one-content-word passes landing
        // exactly on a previous week's headword. "Our pool attendant works
        // with me." passed as "Our pool works with me"; "The steam room is
        // next to it." passed as "The steam is next to it."
        ...reviewWords,
      ]
        .flatMap((w) => normalize(w))
        .filter((w) => w.length > 2 && !HEADWORD_FUNCTION_WORDS.has(w)),
    ),
  ];
  return lessons.map((l) => ({
    ...l,
    speaking: l.speaking.map((sp) => {
      const said = new Set(normalize(sp.targetResponse));
      const add = heads
        .map((w) =>
          said.has(w) ? w : said.has(w + "s") ? w + "s" : said.has(w + "es") ? w + "es" : null,
        )
        .filter((w): w is string => w !== null);
      for (const v of said) if (PROMISE_VERBS.has(v)) add.push(v);
      return add.length
        ? { ...sp, requiredTokens: [...new Set([...(sp.requiredTokens ?? []), ...add])] }
        : sp;
    }),
  }));
}

function buildWeek(lx: P0Lexicon, week: number): WeekContent {
  const meta = WEEK_META[week];
  const review = reviewWordsFor(lx, week);
  return {
    departmentId: lx.code,
    weekNumber: week,
    weekTitleEn: meta.en,
    weekTitleVi: meta.vi,
    // A department lesson replaces the spine lesson at the same id, so the
    // week keeps its four lessons in the same order and every id downstream
    // — progress records, review keys, deep links — stays valid.
    lessons: lockWeekHeadwords(
      meta.build(lx).map((l) => DEPT_LESSONS[l.lessonId]?.(lx) ?? l),
      review,
    ),
    reviewWords: review,
  };
}

/** All 36 Phase 0 weeks (6 departments × weeks 1-6), keyed `${DEP}-${week}`. */
export const PHASE0_WEEKS: Record<string, WeekContent> = Object.fromEntries(
  Object.values(LEXICONS).flatMap((lx) =>
    [1, 2, 3, 4, 5, 6].map((w) => [`${lx.code}-${w}`, buildWeek(lx, w)] as const),
  ),
);

/** Every Phase 0 headword a department met, in teaching order — the
 *  long-spacing pool Phase 1 recycles from. */
export const PHASE0_WORDS_BY_DEP: Record<string, string[]> = Object.fromEntries(
  Object.values(LEXICONS).map((lx) => [
    lx.code,
    // Reads through buildWeek, not WEEK_META directly: a department lesson
    // that replaced a spine one must contribute ITS headwords here, or the
    // Phase 1 recycling pool would carry words the learner never saw.
    [1, 2, 3, 4, 5, 6].flatMap((w) =>
      buildWeek(lx, w).lessons.flatMap((l) => l.vocabulary.map((i) => i.word)),
    ),
  ]),
);
