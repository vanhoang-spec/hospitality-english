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
  /** `cardinal` là cách đọc SAI mà người Việt hay mắc: đọc số phòng như số
   *  đếm ("two hundred five") thay vì đọc từng chữ số. Vế `rude` phải đọc lên
   *  được, nên không dùng chữ số ở đó. */
  roomNo: { digits: string; spoken: string; cardinal: string };
  floor: { ordinal: string; vi: string };
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
    roomNo: { digits: "205", spoken: "two-oh-five", cardinal: "two hundred five" },
    floor: { ordinal: "second", vi: "tầng hai" },
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
    roomNo: { digits: "310", spoken: "three-one-oh", cardinal: "three hundred ten" },
    floor: { ordinal: "third", vi: "tầng ba" },
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
    roomNo: { digits: "812", spoken: "eight-one-two", cardinal: "eight hundred twelve" },
    floor: { ordinal: "eighth", vi: "tầng tám" },
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
    service: { en: "the spa", vi: "spa", open: "ten", close: "eight" },
    priced: {
      en: "foot massage",
      vi: "massage chân",
      vnd: 700000,
      vndWord: "seven hundred thousand",
      usd: 28,
      usdWord: "twenty-eight",
    },
    booking: { en: "massage", vi: "buổi massage" },
    roomNo: { digits: "104", spoken: "one-oh-four", cardinal: "one hundred four" },
    floor: { ordinal: "first", vi: "tầng một" },
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
    roomNo: { digits: "720", spoken: "seven-two-oh", cardinal: "seven hundred twenty" },
    floor: { ordinal: "seventh", vi: "tầng bảy" },
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
      { word: "Invoice", phonetic: "/ˈɪnvɔɪs/", definition: "Hóa đơn", icon: "🧾" },
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
    roomNo: { digits: "415", spoken: "four-one-five", cardinal: "four hundred fifteen" },
    floor: { ordinal: "fourth", vi: "tầng bốn" },
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
export function g(rude: string, polite: string, rule: string): GrammarItem {
  return { rude, polite, rule };
}
/** `role` marks who says `guestPrompt`. It defaults to the guest, which is
 *  right for most of the course and was wrong for all 342 speaking items of
 *  weeks 1-14: the field was never set once, so a room attendant — whose day
 *  is mostly floor supervisor and linen room — practised fourteen weeks of
 *  guest talk and never once heard a colleague. Week 7 lesson 4 is titled
 *  "Asking a Colleague for Help" and its prompt was still a guest's. */
export function sp(
  guestPrompt: string,
  targetResponse: string,
  helpTip: string,
  role?: SpeakingItem["speakerRole"],
): SpeakingItem {
  return role
    ? { guestPrompt, targetResponse, helpTip, speakerRole: role }
    : { guestPrompt, targetResponse, helpTip };
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
): GameRound {
  return {
    ...(role ? { speakerRole: role } : {}),
    prompt,
    options: [
      { text: correct, correct: true },
      { text: wrongA, correct: false },
      { text: wrongB, correct: false },
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
  };
}

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
        ),
        g(
          "Hey, come in.",
          `Welcome to ${RESORT}.`,
          "Không dùng 'Hey' với khách. Câu đón chuẩn là 'Welcome to' + tên khách sạn.",
        ),
      ],
      speaking: [
        sp(
          "Hello!",
          "Good morning, sir. Welcome.",
          "Chào theo buổi: morning (trước 12h), afternoon (12h–18h), evening (sau 18h). 'Welcome' trọng âm âm tiết đầu: WEL-come — âm tiết đầu to và dài hơn hẳn, đừng nhấn đều hai âm.",
        ),
        sp(
          "Good afternoon. I am Mrs Lee.",
          "Good afternoon, madam.",
          "Khách xưng Mrs nên là nữ: đáp 'madam'. Khách nam thì dùng sir. Chào lại đúng buổi mà khách vừa chào. 'madam' trọng âm âm tiết đầu: MA-dam, đuôi đọc nhẹ.",
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
          "Good evening. Welcome, madam.",
          "Evening. Come in.",
          "Hello. Welcome.",
        ),
        game(
          "Good evening. I am Mrs Smith.",
          "Good evening, madam.",
          "Good morning, madam. Welcome.",
          "Good evening. Do you want a room?",
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
        // Thẻ cũ là `Alphabet` với câu ví dụ "Please say the alphabet slowly."
        // — câu không lễ tân nào nói, và là headword duy nhất của bài không
        // bao giờ được dùng lại. Trong khi đó bài này chấm J-A-M-E với J-A-N-E
        // bằng bộ mã chưa từng dạy: TÊN chữ cái không xuất hiện ở đâu trong
        // sáu tuần. Bốn báo cáo nêu. Thẻ nay mang chính tên các chữ cái mà
        // bài dùng, và chỉ những chữ người Việt hay nghe nhầm.
        v("Letter", "/ˈletə/", "Chữ cái", "A-N-N-A. Four letters.", "🔤"),
      ],
      grammar: [
        g(
          "What your name?",
          "May I have your name?",
          "Tiếng Anh cần động từ. Câu hỏi tên lịch sự là 'May I have your name?' — không nói 'What your name?'.",
        ),
        g(
          "Spell please.",
          "How do you spell that?",
          "Muốn khách đánh vần, hỏi trọn câu 'How do you spell that?'.",
        ),
        g(
          "E? I? Same same.",
          "Is that E or I, sir?",
          "E /iː/ và I /aɪ/ nghe rất khác nhau nhưng người Việt hay lẫn vì mặt chữ. Không chắc thì hỏi thẳng từng chữ một, đừng đoán rồi ghi sai tên khách.",
        ),
        g(
          "Say it again.",
          "Could you spell that, please?",
          "Tên có chữ dễ nhầm thì nhờ khách đánh vần. Tám tên chữ cái người Việt hay lẫn nhất: A /eɪ/ · E /iː/ · I /aɪ/ · G /dʒiː/ · J /dʒeɪ/ · R /ɑː/ · W /ˈdʌbljuː/ · Y /waɪ/. Nghe không chắc thì hỏi lại từng chữ.",
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
        ),
        g(
          "You are from where?",
          "Where are you from?",
          "Từ để hỏi đứng đầu câu trong tiếng Anh: 'Where are you from?' — không đặt cuối như tiếng Việt.",
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
          "One moment, madam. I will help.",
          "Bag? OK.",
          "Yes madam, I help you.",
        ),
        game(
          "Are you the manager?",
          `No, madam. I am from ${lx.deptEn}.`,
          "I no manager.",
          `Yes, madam. I am the manager of ${lx.deptEn}.`,
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
        ),
        g(
          "Bye.",
          "Goodbye, sir. Have a nice day.",
          "'Bye' quá thân mật với khách. Dùng 'Goodbye' kèm 'sir/madam'. Đừng dùng 'Good night' ở đây — nó chỉ dành cho buổi tối lúc khách đi ngủ.",
        ),
      ],
      speaking: [
        sp(
          "We are leaving now.",
          "Thank you, madam. Goodbye.",
          "Khách báo rời đi thì cảm ơn TRƯỚC rồi mới chào — cảm ơn suông nghe như đang giục, chào suông nghe như đang tiễn.",
        ),
        sp(
          "Thank you for your help!",
          "You are welcome, madam.",
          "Khi khách cảm ơn, đáp 'You are welcome' — không im lặng hoặc chỉ gật đầu. 'madam' trọng âm âm tiết đầu: MA-dam, không phải ma-DAM.",
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
        ),
        game(
          "See you tomorrow.",
          "Goodbye, sir. Have a nice day.",
          "OK bye.",
          "Yes. Tomorrow I am not working here.",
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
        ),
        g(
          "Room number what?",
          "What is your room number?",
          "Câu hỏi cần 'is' và trật tự: What IS your room number?",
        ),
        g(
          "How many, thirty?",
          "Thirteen or thirty, sir?",
          "13 và 30 nghe gần giống nhau, khác nhau ở trọng âm: thir-TEEN nhấn cuối và kéo dài; THIR-ty nhấn đầu, đuôi ngắn. Nghe không chắc thì hỏi lại cả hai con số, đừng đoán.",
        ),
        g(
          "Room three zero five.",
          "Room three-oh-five, sir.",
          "Chữ số 0 có hai cách đọc: đứng một mình là 'zero', nhưng trong số phòng và số điện thoại thì đọc là 'oh' /əʊ/ — môi tròn lại rồi mới buông.",
        ),
        g(
          "Two ten, right?",
          "It is twenty, sir.",
          "Hàng chục: TWENTY (20), THIRTY (30), FORTY (40) … NINETY (90). Ghép thêm số cuối để có số lớn hơn: 20 + 5 = twenty-five.",
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
          "Số hàng chục ghép số lẻ có dấu gạch ngang, không có khoảng trắng: forty-five, không phải 'forty five'. Trọng âm rơi vào phần sau: forty-FIVE.",
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
            q: "Số 0 trong số phòng đọc là gì?",
            options: ["oh", "zero", "nothing"],
            correct: 0,
            explanation:
              "Khi đọc số phòng, người Anh–Mỹ đọc số 0 là 'oh' (ví dụ 205 = two-oh-five).",
          },
        ],
      ),
      game: [
        game(
          "Is my room three-oh-five?",
          "Yes, room three-oh-five, sir.",
          "Room number what you say, sir?",
          "Yes, room three hundred and five, sir.",
        ),
        game(
          // Đề hỏi bằng tiền đồng, đáp án trả lời bằng đô, không có cầu nối quy
          // đổi nào — học viên không thể suy ra. Giữ nguyên một đơn vị.
          "Is that forty guests?",
          "No, sir. Forty-five guests.",
          "Forty guest yes.",
          "Yes, sir. It is forty guests today.",
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
          `Go to the ${lx.floor.ordinal} floor.`,
          `Cần 'to the' trước tên tầng: go TO THE ${lx.floor.ordinal} floor. Tầng gọi bằng số thứ tự, không phải số đếm: first · second · third · fourth · fifth · sixth · seventh · eighth · ninth · tenth.`,
        ),
        g(
          "Which floor my room?",
          "Which floor is my room on?",
          "Câu hỏi cần động từ 'is'. Đây là câu khách hay hỏi — nghe hiểu được là đủ.",
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
        ),
        game(
          "Where is the lift?",
          "The lift is over there, sir.",
          "Lift there.",
          "I do not know, sir.",
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
        ),
        g(
          // Dùng i2 chứ không phải i1: game của bài này đã chuyển sang i1 (đề cũ
          // hỏi "Can I have one more passport?"), nên i2 mất chỗ dùng và thành
          // headword dạy xong bỏ đấy ở cả sáu bộ phận.
          `I bring you ${i2.word.toLowerCase()}.`,
          `I will bring your ${i2.word.toLowerCase()}.`,
          "Việc sắp làm dùng 'will': I WILL bring. Và nhớ tính từ sở hữu 'your' trước danh từ — a, an, the mới là mạo từ.",
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
      ],
      reading: read(
        `A guest from room ${lx.roomNo.spoken} wants two ${i1.word.toLowerCase()}s. ${lx.staff} says: "Good afternoon, madam. Two ${i1.word.toLowerCase()}s. One moment, please."`,
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
        ),
        game(
          // Chạy trên i2 nên Lễ tân hỏi "Can I have one more passport?" và đáp
          // "Of course" — khách sạn không cấp hộ chiếu. i1 đúng cho cả sáu:
          // key / menu / towel / robe / lounge card / invoice.
          //
          // Và nhiễu cũ là câu TRUNG THỰC khi hết hàng, bị chấm sai. Nhiễu
          // phải sai vì HÌNH THỨC, không phải vì một sự thật không hiển thị.
          `Can I have one more ${i1.word.toLowerCase()}?`,
          `Of course. One ${i1.word.toLowerCase()}, madam.`,
          `Yes, one ${i1.word.toLowerCase()}s.`,
          `One ${i1.word.toLowerCase()} coming, madam, you wait.`,
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
        ),
        g(
          "Give me three.",
          `Three ${i3.word.toLowerCase()}s, please.`,
          "'Give me' nghe ra lệnh. Nói số lượng + tên đồ + 'please'.",
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
            q: `Vì sao dùng "How many" chứ không phải "How much"?`,
            options: [`Vì ${i3.word.toLowerCase()} đếm được`, "Vì hỏi giá tiền", "Vì khách là nam"],
            correct: 0,
            explanation:
              "'How many' dùng cho danh từ đếm được; 'How much' dùng cho tiền hoặc thứ không đếm được.",
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
        ),
        game(
          `Where is my ${i4.word.toLowerCase()}?`,
          `It is here, sir.`,
          `Here, sir. You take.`,
          `I do not know, sir. Sorry.`,
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
        v("O'clock", "/əˈklɒk/", "Giờ đúng (7:00 = seven o'clock)", "It is seven o'clock.", "🕖"),
        v(
          "Half past",
          "/hɑːf pɑːst/",
          "Rưỡi (7:30 = half past seven)",
          "It is half past seven.",
          "🕢",
        ),
      ],
      grammar: [
        g(
          "Now seven.",
          "It is seven o'clock.",
          "Câu tiếng Anh cần chủ ngữ 'It' và động từ 'is': IT IS seven o'clock.",
        ),
        g(
          "What time now?",
          "What time is it?",
          "Câu hỏi giờ chuẩn là 'What time is it?' — có động từ 'is'.",
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
          "Giờ đúng thì thêm 'o'clock'. 7:30 nói 'half past seven'. Trọng âm rơi vào CLOCK, và âm /k/ cuối phải bật ra.",
        ),
      ],
      reading: read(
        `${lx.staff} says: "Good morning, madam. Welcome." The guest asks the time. ${lx.staff} looks at the clock and says: "It is half past seven, madam." The guest says: "Thank you."`,
        [
          {
            q: "Bây giờ là mấy giờ?",
            options: ["7 giờ 30", "7 giờ đúng", "8 giờ 30"],
            correct: 0,
            explanation: "'Half past seven' nghĩa là 7 giờ rưỡi (7:30).",
          },
          {
            q: "'O'clock' dùng khi nào?",
            options: ["Khi giờ đúng, không có phút lẻ", "Khi giờ rưỡi", "Khi hỏi giá"],
            correct: 0,
            explanation: "'O'clock' chỉ dùng cho giờ tròn: five o'clock, nine o'clock.",
          },
        ],
      ),
      game: [
        game(
          "Excuse me, do you have the time?",
          "It is half past seven, madam.",
          "Half seven.",
          "Yes madam, I have a watch here.",
        ),
        game(
          "Is it eight o'clock now?",
          "No, sir. It is half past seven.",
          "Time eight.",
          "Yes, it is eight, sir.",
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
        ),
        g(
          // "Tomorrow I start at two." là tiếng Anh ĐÚNG (hiện tại đơn cho lịch
          // cố định) và bị gạch làm lỗi — hai auditor nêu, và chính khoá học
          // dùng đúng cấu trúc đó hai bài sau. Vế rude phải là lỗi L1 thật.
          `Tomorrow I starting at ${lx.service.open}.`,
          `I will start at ${lx.service.open} tomorrow.`,
          "Việc tương lai dùng 'will' + động từ: I WILL start.",
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
        ),
        game(
          `Is my ${lx.booking.en} today?`,
          "No, madam. It is tomorrow.",
          "Monday no, madam.",
          "Yes, madam. It is today at two.",
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
        ),
        g(
          `${capFirst(lx.service.en)} close ${lx.service.close}.`,
          `We close at ${lx.service.close}, sir.`,
          "Động từ phải chia và có 'at' trước giờ. Nói ngắn gọn với chủ ngữ 'We'.",
        ),
      ],
      speaking: [
        sp(
          "What time do you open?",
          `We open at ${lx.service.open}, madam.`,
          "Công thức: 'We open at + giờ'. Đóng cửa thì 'We close at + giờ'. 'open' trọng âm âm tiết đầu: O-pen.",
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
          `Are you open now?`,
          `Yes, sir. We close at ${lx.service.close}.`,
          // "We are open all night" là câu ĐÚNG với quầy lễ tân 24/24, nên nó
          // không dùng làm nhiễu được. Nhiễu mới sai vì thì, không vì sự thật.
          `Open ${lx.service.open} yes.`,
          `Yes, we opening now, sir.`,
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
              q: lx.service.isEvent
                ? `Câu hỏi của khách thiếu gì nếu nói "What time ${lx.service.en}?"`
                : `Câu hỏi của khách thiếu gì nếu nói "What time ${lx.service.en} open?"`,
              options: lx.service.isEvent
                ? ["Thiếu động từ 'is'", "Thiếu 'please'", "Thiếu tên khách"]
                : ["Thiếu trợ động từ 'does'", "Thiếu 'please'", "Thiếu tên khách"],
              correct: 0,
              explanation: lx.service.isEvent
                ? `Câu hỏi tiếng Anh cần động từ: What time IS ${lx.service.en}?`
                : `Động từ thường cần trợ động từ: What time DOES ${lx.service.en} open?`,
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
          ),
          game(
            `Am I too late?`,
            `No, madam. We finish at ${lx.service.close}.`,
            `Finish ${lx.service.close}.`,
            `Yes, madam. We are finish now.`,
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
        v("Free", "/friː/", "Miễn phí", "The water is free, sir.", "🆓"),
      ],
      grammar: [
        g(
          `${capFirst(lx.priced.vndWord)} dongs.`,
          `${capFirst(lx.priced.vndWord)} dong, sir.`,
          "'Dong' KHÔNG bao giờ thêm -s, dù số tiền lớn đến đâu. Đây là ngoại lệ với thói quen thêm -s cho số nhiều.",
        ),
        g(
          "Price what?",
          "How much is it?",
          "Hỏi giá chuẩn là 'How much is it?' — không hỏi 'Price what?'.",
        ),
      ],
      speaking: [
        sp(
          "Is the price in dong?",
          "Yes, madam. All prices are dong.",
          "Nói rõ đơn vị ngay để khách khỏi nhẩm sang đô. Số tiền đọc thành cụm liền, không ngắt từng chữ số.",
        ),
        sp(
          "How much is it?",
          `${capFirst(lx.priced.vndWord)} dong, sir.`,
          "Đọc số tiền thành cụm liền, đừng ngắt từng chữ — ngắt từng chữ khách phải cộng nhẩm lại.",
        ),
      ],
      reading: read(
        `${lx.staff} says: "Welcome, sir." The guest asks about the ${lx.priced.en}. ${lx.staff} says: "${capFirst(lx.priced.vndWord)} dong, sir." The guest says: "That is fine. Thank you."`,
        [
          {
            q: `${capFirst(lx.priced.vi)} giá bao nhiêu?`,
            options: [`${lx.priced.vnd.toLocaleString("vi-VN")} đồng`, "Miễn phí", "Chưa nói giá"],
            correct: 0,
            explanation: `Nhân viên nói "${lx.priced.vndWord} dong".`,
          },
          {
            q: "Vì sao KHÔNG nói 'dongs'?",
            options: [
              "Vì 'dong' giữ nguyên khi số nhiều",
              "Vì trong tiếng Việt không có số nhiều",
              "Vì khách là người nước ngoài",
            ],
            correct: 0,
            explanation:
              "'Dong' đếm được nhưng có dạng số nhiều bất biến, giống yen hay baht: một dong, năm trăm nghìn dong — không bao giờ 'dongs'.",
          },
        ],
      ),
      game: [
        game(
          "Is there a price list?",
          "Yes, sir. One moment.",
          "Price list no have, sir.",
          "Yes sir, I will bring the price list.",
        ),
        game(
          "Is the water free?",
          "Yes, madam. It is free.",
          "Free water yes madam you take.",
          "Yes, madam, water is a free.",
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
        ),
        g(
          "I no take card.",
          "We take cards, madam.",
          "Phủ định/khẳng định cần đúng động từ: WE TAKE cards. Không nói 'I no take'.",
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
        ),
        game(
          "Do you take Visa?",
          // "No, sir. Cash only." bị chấm SAI trong khi helpTip của chính ô này
          // dạy đúng câu đó. Năm auditor nêu.
          "Yes, sir. We take cards.",
          "Visa card I am not knowing, sir.",
          "Yes, sir. We are taking cards.",
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
        ),
        g(
          "We take dollar too.",
          "We take dong, madam.",
          "Khách sạn thu bằng tiền đồng. Nói giá quy đổi để khách hình dung, nhưng hoá đơn vẫn là dong.",
        ),
      ],
      speaking: [
        sp(
          "Can I pay in dollars?",
          "We take dong, madam. Sorry.",
          "Từ chối ngoại tệ thì nói ngay đơn vị khách sạn nhận, đừng chỉ nói không. Khách còn kịp ra quầy đổi tiền.",
        ),
        sp(
          "How much is that in dollars?",
          `It is about ${lx.priced.usdWord} dollars, sir.`,
          "Giữ 'about' — nói một con số đô chính xác là hứa một tỷ giá bạn không kiểm soát được. Từ này trọng âm ở âm tiết sau: a-BOUT, và /t/ cuối phải bật.",
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
          "We take dong, sir.",
          "Dollar no good here, sir.",
          "Yes sir, dollars are fine here too.",
        ),
        game(
          "Can I pay in dong?",
          "Of course, madam. We take dong.",
          "Dong no good.",
          "Sorry, dollars only madam.",
        ),
      ],
    }),

    lesson(lx, 4, 4, "Confirming the Total", "Xác nhận tổng tiền", {
      vocabulary: [
        v("Total", "/ˈtəʊtl/", "Tổng cộng", `The total is ${lx.priced.vndWord}.`, "🧮"),
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
          `The total is ${lx.priced.vndWord}.`,
          "Cần mạo từ 'The' và động từ 'is': THE total IS … Số tiền đọc liền cả cụm, và 'dong' giữ nguyên khi số nhiều (tuần 4 bài 1).",
        ),
        g(
          "You want how many?",
          "How many would you like?",
          "Hỏi lịch sự dùng 'would you like' thay vì 'you want'.",
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
        ),
        game(
          // "Your change, please." ASKS THE GUEST for change. Three auditors.
          // The lesson's own vocabulary card one lesson earlier has the right
          // form: "Here is your change."
          // The note has to cover every department's total: the Spa bill is
          // seven hundred thousand, so handing over five hundred thousand left
          // "Here is your change." as the answer to an underpayment.
          "Here is two million.",
          "Thank you, sir. Here is your change.",
          "Fifty dollar OK.",
          "Thank you, sir. There is no change today.",
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
        ),
        g(
          "Sit.",
          "Please have a seat.",
          "Mời khách ngồi nói 'Please have a seat' — chỉ nói 'Sit' là bất lịch sự.",
        ),
      ],
      speaking: [
        sp(
          "Could you carry this for me?",
          "Certainly, madam. One moment.",
          "Nhận lời trước rồi mới hành động. 'Certainly' trang trọng hơn và không mất thêm giây nào — trọng âm âm tiết đầu: CER-tain-ly.",
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
            q: "Câu nào dùng để mời khách ngồi?",
            options: ["Please have a seat.", "Please stand over there.", "You sit."],
            correct: 0,
            explanation: "'Please have a seat' là câu mời ngồi lịch sự chuẩn trong khách sạn.",
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
          "Certainly, madam.",
          "Bag heavy, madam.",
          "Of course madam, please wait one moment.",
        ),
        game(
          // Nhiễu cũ là câu XIN PHÉP CẤP TRÊN — đúng nghiệp vụ ở phòng chờ có
          // kiểm soát thẻ — bị chấm sai, trong khi tuần 5 bài 2 lại chấm ĐÚNG
          // cho "One moment, please. I will check." Ba auditor nêu mâu thuẫn.
          "May I sit here?",
          "Certainly, sir. Please have a seat.",
          "Yes sit.",
          "Of course, sir. You can to sit down here.",
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
          "Bảo khách 'Wait' rất thô. Câu chuẩn là 'One moment, please'.",
        ),
        g(
          "You wait here.",
          "Please wait here, madam.",
          "Thêm 'Please' ở đầu và 'madam/sir' ở cuối để câu thành lời mời, không thành mệnh lệnh.",
        ),
      ],
      speaking: [
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
            q: "Câu nào dùng khi cần khách chờ?",
            options: ["One moment, please.", "Wait.", "You wait."],
            correct: 0,
            explanation: "'One moment, please' vừa lịch sự vừa cho khách biết sẽ không lâu.",
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
          `Is my ${i1.word.toLowerCase()} here yet?`,
          "One moment, please. I will check.",
          "Wait there.",
          `Your ${i1.word.toLowerCase()} not here, madam.`,
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
        ),
        g(
          "Go there.",
          "This way, please, madam.",
          "Dẫn khách nói 'This way, please' kèm cử chỉ tay mở, không chỉ trỏ ngón tay.",
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
        `${lx.staff} gives the ${i1.word.toLowerCase()} to the guest and says: "Here you are, madam." Then ${lx.staff} says: "This way, please."`,
        [
          {
            q: "Câu nào nói khi đưa đồ cho khách?",
            options: ["Here you are.", "Put it on the table there.", "This is."],
            correct: 0,
            explanation: "'Here you are' là câu chuẩn khi trao đồ vật cho khách.",
          },
          {
            q: "Câu nào dùng khi dẫn khách đi?",
            options: ["This way, please.", "Go there.", "You go."],
            correct: 0,
            explanation: "'This way, please' kèm cử chỉ tay mở là cách dẫn khách lịch sự.",
          },
        ],
      ),
      game: [
        game(
          `Is that ${i1.word.toLowerCase()} for me?`,
          "Here you are, madam.",
          "Yes, you take this one.",
          "Yes madam, this one is for you.",
        ),
        game(
          "Where is the lounge?",
          "This way, please, sir.",
          "Go there.",
          "Ask at the desk, sir.",
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
        ),
        g(
          "Move please.",
          "Excuse me, please.",
          "Khi cần đi qua hoặc ngắt lời, dùng 'Excuse me' — không nói 'Move'.",
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
        ),
        game(
          `You gave me the wrong ${i1.word.toLowerCase()}.`,
          "I am very sorry, sir.",
          "Sorry sorry.",
          "That is not my mistake, sir. I am sorry.",
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
        v("Sir", "/sɜː/", "Thưa ông (gọi khách nam)", "Good morning, sir.", "🎩"),
      ],
      grammar: [
        g(
          "Morning. Name what?",
          "Good morning. May I have your name?",
          "Nối hai kỹ năng tuần 1: chào đủ câu, rồi hỏi tên bằng 'May I have…?'.",
        ),
        g(
          "You from where?",
          "Where are you from, sir?",
          "Từ hỏi đứng đầu, động từ theo sau: WHERE ARE you from?",
        ),
      ],
      speaking: [
        sp(
          // The guest gives her name and the model answer threw it away. Using
          // the surname is the cheapest upgrade in hospitality English and the
          // course never taught it once in fourteen weeks.
          "Good afternoon. I am Mr Chen.",
          "Welcome back, Mr Chen.",
          "Khách quen thì thêm 'back' — hai chữ đó nói rằng bạn nhớ họ. Gọi bằng HỌ kèm Mr, Mrs hoặc Ms, không gọi tên riêng.",
        ),
        sp(
          "Good morning. I am Anna Smith.",
          "Good morning, Ms Smith.",
          "Khách vừa xưng tên thì phải dùng lại tên đó: 'Ms' + HỌ, không phải tên gọi. Dùng 'Ms' khi chưa biết tình trạng hôn nhân của khách; đừng đoán bằng Mrs hay Miss. Dùng đúng họ khách là nâng cấp rẻ nhất trong nghề. 'Good' có /d/ cuối — đừng dừng lại ở 'gút'.",
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
            explanation: "sir = khách nam, madam = khách nữ. Gọi sai là lỗi lễ tân cơ bản.",
          },
        ],
      ),
      game: [
        game(
          "Hello again. I am Mr Chen.",
          "Welcome back, Mr Chen.",
          "Hello Chen, welcome back.",
          "Welcome back, sir. Nice to see you.",
        ),
        game(
          "Good afternoon.",
          "Good afternoon, sir. Welcome.",
          "Afternoon, you come in please sir.",
          "Good morning, sir. Welcome to Lotus Bay.",
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
          `Room ${lx.roomNo.digits} hundred, floor ${lx.floor.ordinal}.`,
          `Room ${lx.roomNo.spoken}, ${lx.floor.ordinal} floor.`,
          "Ôn tuần 2: số phòng đọc từng chữ số, tầng dùng số thứ tự.",
        ),
        g(
          `I bring two ${i1.word.toLowerCase()}.`,
          `I will bring two ${i1.word.toLowerCase()}s.`,
          "Ôn hai lỗi cùng lúc: thiếu 'will' cho việc sắp làm, và thiếu -s số nhiều.",
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
          `Yes. Room ${lx.roomNo.spoken}, ${lx.floor.ordinal} floor.`,
          "Trả lời gọn hai thông tin khách cần nhất: số phòng và tầng. Số thứ tự của tầng đóng bằng phụ âm khó, và mỗi từ một kiểu: có từ kết bằng /d/, có từ kết bằng /θ/ (lưỡi chạm răng), có từ kết bằng cụm /st/. Nghe kỹ âm cuối trong mẫu rồi bắt chước đúng âm đó.",
        ),
      ],
      reading: read(
        `${lx.staff} says: "Your room is ready, sir. Room ${lx.roomNo.spoken}, ${lx.floor.ordinal} floor. I will bring two ${i1.word.toLowerCase()}s."`,
        [
          {
            q: `Phòng khách ở tầng nào?`,
            options: [capFirst(lx.floor.vi), "Tầng trệt", "Tầng hai mươi"],
            correct: 0,
            explanation: `Nhân viên nói "${lx.floor.ordinal} floor" — tức ${lx.floor.vi}.`,
          },
          {
            q: `Nhân viên sẽ mang mấy cái ${i1.definition.toLowerCase()}?`,
            options: ["Hai", "Một", "Ba"],
            correct: 0,
            explanation: `"two ${i1.word.toLowerCase()}s" — số nhiều có -s.`,
          },
        ],
      ),
      game: [
        game(
          `Is my room on the ${lx.floor.ordinal} floor?`,
          `Yes, madam. The ${lx.floor.ordinal} floor.`,
          "Yes floor.",
          `Yes madam, and the lift is over there.`,
        ),
        game(
          // Đề không cho biết mấy giờ, nên câu TRUNG THỰC cho khách đến sớm —
          // việc thường xuyên nhất ở quầy — bị chấm sai. Bốn auditor nêu. Nay
          // đề nói rõ khách đến sớm, và câu trung thực là ĐÁP ÁN ĐÚNG.
          `I am early. Is my room ready?`,
          // Giờ phòng sẵn sàng là giờ NHẬN PHÒNG, không phải giờ mở cửa của bộ
          // phận — service.open cho ra "ready at ten" ở Spa, "at six" ở Nhà hàng.
          `Not yet, sir. It is ready at two.`,
          `Room ready yes.`,
          `Yes, sir. Your room is ready now.`,
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
        ),
        g(
          "I no understand.",
          "Sorry, I do not understand.",
          "Phủ định cần trợ động từ: I DO NOT understand. Xin lỗi trước rồi nhờ khách nhắc lại.",
        ),
      ],
      speaking: [
        sp(
          "Sorry, I did not understand.",
          "I am sorry, madam. Again, slowly.",
          "Khách chưa hiểu thì nhắc lại CHẬM HƠN, đừng nhắc lại to hơn. Nói ra là mình sẽ nói chậm lại thì khách yên tâm hỏi tiếp.",
        ),
        sp(
          "Sorry, what time and how much?",
          `We open at ${lx.service.open}. ${capFirst(lx.priced.vndWord)} dong.`,
          "Khi khách hỏi hai thông tin, trả lời tách thành hai câu ngắn — dễ nghe hơn một câu dài. Nghỉ hẳn một nhịp giữa hai câu: chỗ ngắt cũng là một phần của phát âm.",
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
          "I am sorry madam, I will speak slowly.",
        ),
        game(
          // "Of course" không phải câu đáp cho "I did not hear you" — nó nhận
          // lời, còn ở đây phải xin lỗi rồi nhắc lại.
          `Sorry, I did not hear you.`,
          `I am sorry, sir. We open at ${lx.service.open}.`,
          `You no hear.`,
          `Please listen carefully, sir. I said ${lx.service.open}.`,
        ),
      ],
    }),

    lesson(lx, 6, 4, "The Full Service Chain", "Chuỗi phục vụ hoàn chỉnh", {
      vocabulary: [
        v("Enjoy", "/ɪnˈdʒɔɪ/", "Tận hưởng", "Enjoy your stay, sir.", "😊"),
        v("Anything else", "/ˈeniθɪŋ els/", "Còn gì nữa không ạ", "Anything else, madam?", "➕"),
      ],
      grammar: [
        g(
          "You want more?",
          "Anything else, madam?",
          "Câu hỏi thêm nhu cầu chuẩn là 'Anything else?' — ngắn, lịch sự, dùng được mọi bộ phận.",
        ),
        g(
          "Go enjoy.",
          "Enjoy your stay, sir.",
          "Câu chúc khi tiễn khách: 'Enjoy your stay' (khách đang lưu trú) hoặc 'Have a nice day'.",
        ),
      ],
      speaking: [
        sp(
          `Could I have one more ${i1.word.toLowerCase()}?`,
          "Certainly, madam. Anything else?",
          "Xong một việc thì hỏi luôn còn gì nữa không — câu đó gộp hai lượt đi lại thành một, và khách không phải gọi lần nữa.",
        ),
        sp(
          `Thank you. That is all.`,
          `Thank you, madam. Enjoy your stay.`,
          "Kết thúc luôn có ba phần: cảm ơn – lời chúc – nụ cười. Đây là ấn tượng cuối của khách. 'Enjoy' trọng âm ở âm tiết sau: en-JOY; cụm /st/ đầu 'stay' phải bật cả hai âm.",
        ),
      ],
      reading: read(
        `${lx.staff} brings the ${i2.word.toLowerCase()} and asks: "Anything else, madam?" The guest says: "No, thank you." ${lx.staff} says: "Enjoy your stay."`,
        [
          {
            q: "Câu nào hỏi khách còn cần gì nữa không?",
            options: ["Anything else?", "You want more?", "What else you?"],
            correct: 0,
            explanation: "'Anything else?' là câu hỏi chốt nhu cầu chuẩn mực, dùng ở mọi bộ phận.",
          },
          {
            q: "Câu chúc nào dùng với khách đang lưu trú?",
            options: ["Enjoy your stay.", "Goodbye forever.", "Good night now."],
            correct: 0,
            explanation:
              "'Enjoy your stay' dành cho khách còn ở lại; 'Have a nice day' dùng khi khách ra ngoài.",
          },
        ],
      ),
      game: [
        game(
          "Yes, one more thing please.",
          "Certainly, sir. What is it?",
          "More thing? OK, you tell me sir.",
          "Anything else, sir? Please tell me now.",
        ),
        game(
          "No, that is all. Thank you.",
          "Thank you, sir. Enjoy your stay.",
          "OK finish.",
          "Thank you. Goodbye now.",
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
        ),
        g(
          "Finish. Bye.",
          "Thank you, madam. Goodbye.",
          "Dọn xong phải chào, đừng lặng lẽ đi ra. Khách cần biết trong phòng đã hết người.",
        ),
      ],
      speaking: [
        sp(
          "Yes? Who is it?",
          "Housekeeping. May I come in?",
          "Nói tên bộ phận TRƯỚC rồi mới xin phép — khách sau cánh cửa cần biết ai đang gõ trước khi quyết định mở. 'Housekeeping' trọng âm ở âm tiết đầu: HOUSE-keeping.",
        ),
        sp(
          "Not now, please. Come back later.",
          "Yes, madam. Thank you.",
          "Khách từ chối thì cảm ơn rồi đi, không hỏi lại, không nài. Ghi lại phòng để quay lại sau.",
        ),
        sp(
          "I am finished. Thank you!",
          "Thank you, madam. Goodbye.",
          "Câu chào ra cửa gồm hai phần: cảm ơn rồi tạm biệt. Âm /θ/ đầu 'Thank' — đầu lưỡi chạm nhẹ răng trên, đừng thành 'tank'.",
        ),
      ],
      reading: read(
        `${lx.staff} knocks three times and says: "Housekeeping." Nobody answers. ${lx.staff} knocks again and waits. The guest opens the door. ${lx.staff} asks: "May I come in, madam?" The guest says: "Not now, please." ${lx.staff} says: "Yes, madam. Thank you." and writes the room number down.`,
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
        ),
        game(
          "Who is at the door?",
          "Housekeeping, madam.",
          "Me, madam. Please open the door.",
          "It is the hotel staff outside.",
        ),
        game(
          "Thank you for cleaning!",
          "Thank you, madam. Goodbye.",
          "OK bye bye.",
          "You are welcome. I clean every day here.",
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
        ),
        g(
          "You pay downstairs.",
          "Please pay at reception, sir.",
          "Chỉ đường bằng câu mời chứ không bằng câu sai khiến: thêm 'Please' và nói rõ chỗ.",
        ),
      ],
      speaking: [
        sp(
          "Can I pay you for the laundry?",
          "I cannot take cash, sir. Please pay at reception.",
          "Từ chối rồi phải chỉ ngay chỗ trả được — từ chối không kèm lối đi là đẩy việc cho khách. Âm /ʃ/ cuối 'cash': môi hơi tròn, hơi thoát đều.",
        ),
        sp(
          "Where do I pay?",
          "At reception, madam.",
          "Trả lời thẳng nơi cần đến. 'reception' trọng âm âm tiết giữa: re-CEP-tion.",
        ),
        sp(
          "Can I pay by card?",
          "Yes, sir. Reception takes your card.",
          "Khách hỏi thẻ thì trả lời có, và nói rõ nơi quẹt được — đừng chỉ nói 'yes' rồi để khách tự tìm.",
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
        ),
        game(
          "So where do I pay for this?",
          "At reception, sir.",
          "Pay later.",
          "You can pay me now, sir.",
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
        ),
        g(
          "Later I come.",
          "I will come back at two.",
          "Nói rõ GIỜ quay lại, đừng nói 'later' suông — khách còn sắp xếp việc của họ quanh giờ đó.",
        ),
      ],
      speaking: [
        sp(
          "Could you clean my room?",
          "Yes, madam. Now or later?",
          "Đừng chỉ gật rồi vào. Hỏi một câu ngắn để khách chọn giờ — câu này tiết kiệm cho bạn cả lượt quay lại vô ích.",
        ),
        sp(
          "Later, please. At two.",
          "At two, madam. Thank you.",
          "Nhắc lại giờ khách vừa nói rồi mới cảm ơn: đó là cách duy nhất chắc chắn bạn nghe đúng giờ.",
        ),
        sp(
          "What time does the laundry open?",
          "It opens at eight, sir.",
          "Câu hỏi có 'does' thì câu trả lời thêm -s vào động từ: it OPENS. Cụm /nz/ cuối phải nghe được cả hai âm.",
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
        ),
        game(
          "What time does the laundry close?",
          "It closes at four, madam.",
          "Four.",
          "It close at four o'clock, madam.",
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
        v("Change", "/tʃeɪndʒ/", "Tiền thối", "Reception gives your change.", "🪙"),
      ],
      grammar: [
        g(
          `${capFirst(lx.priced.usdWord)} dollar.`,
          `It is about ${lx.priced.usdWord} dollars.`,
          "Hai điều: từ 2 đô trở lên phải có -s, và luôn thêm 'about' vì tỷ giá đổi hằng ngày. Nói một con số đô chính xác là hứa một tỷ giá bạn không quyết định.",
        ),
        g(
          "Give me the money.",
          "Please pay at reception, sir.",
          "Báo giá được, nhận tiền thì không. Câu báo giá luôn đi kèm câu chỉ chỗ trả, nếu không khách sẽ đưa tiền ngay tại chỗ.",
        ),
      ],
      speaking: [
        sp(
          "How much is that in dollars?",
          `It is about ${lx.priced.usdWord} dollars, sir.`,
          "Giữ 'about' — nói một con số đô chính xác là hứa một tỷ giá bạn không kiểm soát được. Từ này trọng âm ở âm tiết sau: a-BOUT, và /t/ cuối phải bật.",
        ),
        sp(
          "Can I pay you in dollars?",
          "Please pay at reception, sir.",
          "Ngoại tệ hay tiền đồng cũng vậy: chỗ trả tiền là lễ tân. Trả lời gọn rồi chỉ chỗ, đừng giải thích dài.",
        ),
        sp(
          "Who gives me my change?",
          "Reception gives your change, madam.",
          "Ai thu tiền thì người đó thối tiền. 'change' mở đầu và kết thúc đều bằng /tʃ/ và /dʒ/ — hai âm khác nhau, đừng đọc thành 'chen'.",
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
          "We take dong, sir.",
          "Dollar no good here, sir.",
          "Yes sir, dollars are fine here too.",
        ),
        game(
          "Here, take the money.",
          "Please pay at reception, madam.",
          "OK, thank you.",
          "Yes madam, I will take it for you.",
        ),
      ],
    }),

  HK_4_4: (lx) =>
    lesson(lx, 4, 4, "The Laundry Total", "Tổng tiền đồ giặt", {
      vocabulary: [
        v("Total", "/ˈtəʊtl/", "Tổng cộng", `The total is ${lx.priced.vndWord}.`, "🧮"),
        v("Bill", "/bɪl/", "Hóa đơn", "Reception has your bill.", "🧾"),
      ],
      grammar: [
        g(
          `Total ${lx.priced.vndWord}.`,
          `The total is ${lx.priced.vndWord}.`,
          "Cần mạo từ 'The' và động từ 'is': THE total IS … Số tiền đọc liền cả cụm, và 'dong' giữ nguyên khi số nhiều (tuần 4 bài 1).",
        ),
        g(
          "Bill here.",
          "Reception has your bill, sir.",
          "Buồng phòng ghi phiếu, lễ tân giữ hoá đơn. Nói rõ hoá đơn ở đâu thì khách không phải đi hỏi vòng.",
        ),
      ],
      speaking: [
        sp(
          "How much for the laundry?",
          `The total is ${lx.priced.vndWord} dong.`,
          "Báo tổng thành tiếng trước khi ghi phiếu — khách nghe rõ ngay tại phòng thì không tranh cãi lúc trả phòng. Âm /l/ CUỐI từ là lỗi nặng nhất của người Việt: total, bill, towel — đầu lưỡi chạm lợi trên và giữ ở đó.",
        ),
        sp(
          "Could I have the bill, please?",
          "Reception has your bill, madam.",
          "Không hứa mang hoá đơn lên phòng. Nói đúng nơi có hoá đơn, và nói ngay lần đầu.",
        ),
        sp(
          "Is the laundry on my bill?",
          "Yes, madam. On your bill.",
          "Trả lời có ngay từ đầu câu rồi mới nhắc lại chỗ. Khách hỏi câu này là đang kiểm tra chi phí, không phải đang trách.",
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
        ),
        game(
          "Can you bring my bill here?",
          "Reception has your bill, sir.",
          "Bill no here.",
          "Yes sir, I will bring it to your room.",
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
          "I will tell my supervisor now.",
          "Đồ nhặt trong phòng không bao giờ giữ lại và cũng không cất vào ngăn kéo. Giao cho quản lý ngay trong ca, và nói ra để có người thứ hai biết.",
        ),
        g(
          "Money here, I no see.",
          "Excuse me, sir. Is this yours?",
          "Thấy đồ giá trị mà khách còn trong phòng thì hỏi ngay tại chỗ. Im lặng là tự đặt mình vào thế nghi ngờ.",
        ),
      ],
      speaking: [
        sp(
          "Did you see a watch in my room?",
          "Yes, madam. It is with my supervisor.",
          "Trả lời thẳng và nói rõ đồ đang ở đâu. Đừng nói 'maybe' — khách đang lo mất đồ.",
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
          "There is money on the table.",
          "Excuse me, sir. Is this yours?",
          "I no touch, madam.",
          "I will put it away, sir.",
        ),
        game(
          "I lost my ring in the room.",
          "One moment, madam. I will ask my supervisor.",
          "Not here, madam.",
          "Sorry madam, I did not see it.",
        ),
      ],
    }),

  // The one question a therapist must ask before touching anybody, and the
  // spine has no slot for it: 3.4 is "what time do we start?". Here the
  // start is the screening. Injury, allergy and pregnancy each change or
  // cancel a treatment, and none of the six weeks currently says so.
  SW_3_4: (lx) =>
    lesson(lx, 3, 4, "Before We Start", "Hỏi trước khi bắt đầu", {
      vocabulary: [
        v("Start", "/stɑːt/", "Bắt đầu", "Before we start, madam.", "▶️"),
        v("Finish", "/ˈfɪnɪʃ/", "Kết thúc", "We finish at eight.", "⏹️"),
      ],
      grammar: [
        g(
          "You have problem?",
          "Do you have any injury?",
          "Hỏi trước khi chạm vào người khách, không hỏi giữa chừng. Ba việc phải hỏi: chấn thương, dị ứng, và có thai. Bất kỳ câu trả lời 'có' nào cũng phải báo quản lý trước khi bắt đầu.",
        ),
        g(
          "I ask my boss.",
          "I will check with my manager.",
          "Không tự quyết khi khách nói có chấn thương hay đang mang thai. Nói rõ mình sẽ hỏi ai, rồi đi hỏi thật.",
        ),
      ],
      speaking: [
        sp(
          "I am ready. Let us start.",
          "Before we start, any injury?",
          "Câu này hỏi TRƯỚC khi khách nằm xuống, không phải sau. 'injury' trọng âm âm tiết đầu: IN-ju-ry.",
        ),
        sp(
          "My back is not good.",
          "Thank you, madam. I will check.",
          "Khách nói có vấn đề thì cảm ơn — họ vừa giúp bạn tránh làm họ đau — rồi mới đi hỏi quản lý.",
        ),
        sp(
          "What time do we finish?",
          "We finish at eight, madam.",
          "Nói giờ kết thúc để khách còn xếp lịch phần sau của ngày. 'finish' đóng bằng /ʃ/ — môi hơi tròn, hơi thoát đều, đừng thành 'phi-nít'.",
        ),
        sp(
          "I am four months pregnant.",
          "Thank you, madam. One moment, please.",
          "Có thai là trường hợp phải hỏi quản lý, không có ngoại lệ và không tự quyết. Đừng tỏ ra lúng túng: cảm ơn, xin khách chờ, rồi đi hỏi.",
        ),
      ],
      reading: read(
        `A guest lies down for a ${lx.priced.en}. ${lx.staff} asks: "Before we start, any injury?" The guest says: "My back is not good." ${lx.staff} does not start. ${lx.staff} says: "Thank you, madam. I will check with my manager." The manager comes and changes the treatment. Then they start.`,
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
        ),
        game(
          "Can we start now?",
          "Before we start, any allergy?",
          "Yes, start now.",
          "Yes, lie down now.",
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
          "You can keep your underwear on.",
          "Đừng bảo khách cởi đồ. Nói khách ĐƯỢC PHÉP giữ lại gì — câu đó trả quyền quyết định về cho khách và bỏ hết phần ngượng ngùng.",
        ),
        g(
          "Change there.",
          "This way, please. The changing room.",
          "Chỉ phòng thay đồ bằng câu mời kèm cử chỉ tay mở, và đi trước dẫn khách chứ không chỉ trỏ.",
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
          "You can keep your underwear on.",
          "Trả lời thẳng và trả lời ngay. Khách hỏi câu này là đang ngại; ậm ừ một giây thôi cũng làm họ ngại thêm.",
        ),
        sp(
          "Is there a robe?",
          `Here you are, madam. A ${lx.items[0].word.toLowerCase()} and ${lx.items[2].word.toLowerCase()}s.`,
          "Đưa đồ thì nói 'Here you are' và đưa bằng hai tay. Kể luôn thứ đang đưa để khách biết đủ chưa.",
        ),
      ],
      reading: read(
        `A guest asks ${lx.staff}: "Where do I change?" ${lx.staff} says: "This way, please, madam." ${lx.staff} gives a ${lx.items[0].word.toLowerCase()} and ${lx.items[2].word.toLowerCase()}s and says: "Here you are." The guest asks: "Do I take everything off?" ${lx.staff} says: "You can keep your underwear on, madam." Then ${lx.staff} shows the ${lx.items[1].word.toLowerCase()} and waits outside.`,
        [
          {
            q: "Khách hỏi có phải cởi hết không, câu trả lời đúng là gì?",
            options: [
              "You can keep your underwear on.",
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
          "You can keep your underwear on.",
          "No, madam. Nothing.",
          "Up to you, madam.",
        ),
        game(
          "Where can I put my bag?",
          `In the ${lx.items[1].word.toLowerCase()}, madam.`,
          "Put your bag on the seat, madam.",
          "Anywhere, madam. It is safe here.",
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
        ),
        g(
          "I do soft now.",
          "Of course, madam. Softer.",
          "Khách kêu đau thì đổi ngay và nói ra là mình đã đổi. Đừng chỉ im lặng làm nhẹ đi — khách không biết bạn có nghe hay không.",
        ),
      ],
      speaking: [
        sp(
          "Mmm... that is a bit strong.",
          "Of course, madam. Softer.",
          "Đổi ngay lập tức và nói một tiếng. Câu này ngắn có lý do: đang giữa liệu trình, khách không muốn nghe giải thích dài.",
        ),
        sp(
          "Is it going to hurt?",
          "Please tell me, madam. I will stop.",
          "Cho khách một câu để dừng bạn lại. Khách nào biết mình dừng được thì mới thả lỏng ra được.",
        ),
        sp(
          "Could you do my shoulders?",
          "Certainly, madam.",
          "'Certainly' trang trọng hơn một tiếng vâng suông và không mất thêm giây nào. Trọng âm âm tiết đầu: CER-tain-ly.",
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
        ),
        game(
          "Could you do my shoulders too?",
          "Certainly, madam.",
          "No shoulders, madam.",
          "Yes madam, but the price is more.",
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
      ],
      grammar: [
        g(
          "No problem, no nuts.",
          "Of course, madam. I will check.",
          "Không bao giờ tự khẳng định món có gì. Bạn không nấu món đó và công thức đổi theo ngày. Câu duy nhất đúng là đi hỏi bếp rồi quay lại trả lời.",
        ),
        g(
          "You allergy?",
          "Please tell me about any allergy.",
          "Hỏi dị ứng bằng câu đủ, hỏi mọi bàn, và hỏi TRƯỚC khi nhận gọi món chứ không phải lúc bưng ra.",
        ),
      ],
      speaking: [
        sp(
          "Does this have peanuts?",
          "Of course, madam. I will check.",
          "Đừng đoán, dù chắc đến mấy. 'Of course' ở đây nghĩa là 'dĩ nhiên tôi sẽ đi hỏi', không phải 'dĩ nhiên là không có'.",
        ),
        sp(
          "My son is allergic to milk.",
          "Certainly, sir. I will tell the kitchen.",
          "Nghe xong phải nói ra là sẽ báo bếp — khách cần biết thông tin đã đi tới nơi cần tới.",
        ),
        sp(
          "Is there anything with nuts?",
          "Please wait, madam. I will ask.",
          "Xin khách chờ rồi đi hỏi thật. Chờ ba mươi giây tốt hơn một câu đoán.",
        ),
      ],
      reading: read(
        `A guest says: "My son is allergic to milk." ${lx.staff} does not guess. ${lx.staff} says: "Certainly, sir. I will tell the kitchen." ${lx.staff} writes it on the order and tells the chef. The chef changes one dish. ${lx.staff} comes back and says: "The kitchen knows, sir."`,
        [
          {
            q: `Khách hỏi món có đậu phộng không, ${lx.staff} phải làm gì?`,
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
          "Of course, madam. I will check.",
          "No milk, madam.",
          "I think no milk, madam.",
        ),
        game(
          "I am allergic to seafood.",
          "Certainly, sir. I will tell the kitchen.",
          "OK, no seafood.",
          "No problem, sir. Everything here is safe.",
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
        ),
        g(
          "Yes yes, I know.",
          "Could you say that again?",
          "Nghe không rõ thì hỏi lại ngay tại bàn. Gật cho qua rồi mang sai món ra thì mất gấp đôi thời gian và mất cả bữa ăn của khách.",
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
          "Excuse me, we are ready to order.",
          "Certainly, madam. May I take your order?",
          "Tới bàn trong vòng vài giây khi khách gọi. 'order' trọng âm âm tiết đầu: OR-der.",
        ),
      ],
      reading: read(
        `A guest says: "Two coffees and one soup, please." The room is noisy. ${lx.staff} asks: "Could you say that again?" The guest repeats it. ${lx.staff} writes it down and reads it back: "Two coffees, one soup. I understand, madam." Then ${lx.staff} goes to the kitchen.`,
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
        ),
        game(
          "Sorry, I did not hear you.",
          "Could you say that again?",
          "Say again.",
          "It is fine, madam. I remember it.",
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
          "The desk is open twenty-four hours.",
          "Quầy lễ tân không đóng. Nói giờ đóng cửa là đuổi khách có việc lúc hai giờ sáng khỏi chỗ duy nhất còn người trực.",
        ),
        g(
          "Night no people.",
          "Someone is here all night.",
          "Khách hỏi ban đêm có ai không là đang lo. Trả lời rõ ràng là có người, đừng trả lời bằng giờ giấc.",
        ),
      ],
      speaking: [
        sp(
          "What time do you close?",
          "We never close, sir. Twenty-four hours.",
          "Đừng nhận câu hỏi rồi trả lời bằng một con số. Câu hỏi này có tiền đề sai, và việc của bạn là sửa tiền đề đó.",
        ),
        sp(
          "Is anyone here at midnight?",
          "Yes, madam. Someone is here.",
          "Trả lời 'yes' ngay từ đầu câu. Khách hỏi lúc nửa đêm không có kiên nhẫn nghe vòng vo.",
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
        ),
        game(
          "What time does the front desk close?",
          "It does not close, madam. Twenty-four hours.",
          "Eleven, madam.",
          "Ten o'clock, madam.",
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
        ),
        g(
          "You wait.",
          "One moment, please. I will check.",
          "Xin khách chờ bằng câu mời, và nói rõ bạn đang làm gì trong lúc đó.",
        ),
      ],
      speaking: [
        sp(
          "I lost my key.",
          "May I see your passport, sir?",
          "Đừng xin lỗi trước khi hỏi. Xem giấy tờ là việc bình thường và khách quen với nó ở mọi khách sạn tốt.",
        ),
        sp(
          "Here you are. My passport.",
          "Thank you, sir. One moment, please.",
          "Cầm giấy tờ thì cảm ơn rồi xin khách chờ trong lúc đối chiếu. Đừng vừa xem vừa im lặng.",
        ),
        sp(
          "Which room is Mr Chen in?",
          "I am sorry, sir. Please wait here.",
          "Không nói số phòng của khách khác cho bất kỳ ai. Mời người hỏi chờ rồi báo quản lý.",
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
            options: ["Không nói, mời chờ rồi báo quản lý", "Nói số phòng", "Bảo họ tự lên tìm"],
            correct: 0,
            explanation:
              "Số phòng của khách là thông tin riêng tư. Người hỏi có thể có lý do chính đáng, nhưng người quyết định không phải là bạn.",
          },
        ],
      ),
      game: [
        game(
          "My key does not work.",
          "May I see your passport, sir?",
          "OK, one key, sir.",
          "Of course, sir. Here.",
        ),
        game(
          "Which room is Mrs Chen in?",
          "I am sorry, madam. Please wait here.",
          "Room seven-two-oh.",
          "She is upstairs, madam. Second floor.",
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
        v("Letter", "/ˈletə/", "Chữ cái", "C-H-E-N. Four letters.", "🔡"),
      ],
      grammar: [
        g(
          "Hello Anna.",
          "Good morning, Ms Smith.",
          "Gọi khách bằng HỌ kèm Mr, Mrs hoặc Ms — không gọi tên riêng, dù khách trẻ. Không chắc là bà hay cô thì dùng Ms.",
        ),
        g(
          "Spell please.",
          "How do you spell that?",
          "Muốn khách đánh vần, hỏi trọn câu. Tám tên chữ cái người Việt hay lẫn nhất: A /eɪ/ · E /iː/ · I /aɪ/ · G /dʒiː/ · J /dʒeɪ/ · R /ɑː/ · W /ˈdʌbljuː/ · Y /waɪ/.",
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
        ),
        game(
          "My name is Anna Smith.",
          "Thank you, Ms Smith.",
          "Hello Anna.",
          "Thank you, Mrs Anna. Please come in.",
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
        ),
        sp(
          "I am her husband. Just tell me.",
          "Excuse me, sir. One moment, please.",
          "Người hỏi nói là người nhà cũng không đổi gì — bạn không kiểm chứng được. Mời chờ rồi gọi quản lý.",
        ),
        sp(
          "Can you give her this letter?",
          "Certainly, sir. I will try.",
          "Nhận thư thì được, vì việc đó không tiết lộ gì. Nói 'I will try' chứ đừng hứa là sẽ chuyển tới tay.",
        ),
      ],
      reading: read(
        `A man asks ${lx.staff}: "Is Mrs Chen staying here?" ${lx.staff} says: "I am sorry, sir. I cannot say." The man says: "I am her husband." ${lx.staff} does not change the answer. ${lx.staff} says: "Excuse me, sir. One moment, please." and calls the manager. The manager comes and talks to the man.`,
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
            q: "Vì sao chỉ nói 'có' thôi cũng đã là sai?",
            options: [
              "Nói 'có' là đã cho biết khách đang ở đây",
              "Vì câu đó không lịch sự",
              "Vì phải hỏi tên trước",
            ],
            correct: 0,
            explanation:
              "Người tìm khách chỉ cần biết đúng một điều: người đó có ở đây không. Nói 'có' là đã trao đi thứ họ cần.",
          },
        ],
      ),
      game: [
        game(
          "Is Mr Tran in room seven-two-oh?",
          "I am sorry, sir. I cannot say.",
          "No, madam.",
          "One moment, sir. I will look in the computer.",
        ),
        game(
          "I am her sister. Which room?",
          "Excuse me, madam. One moment.",
          "Room seven-two-oh.",
          "She is in the lounge.",
        ),
      ],
    }),
};

function reviewWordsFor(lx: P0Lexicon, week: number): string[] | undefined {
  if (week === 1) return undefined;
  const earlier: string[] = [];
  for (let w = 1; w < week; w++) {
    for (const l of WEEK_META[w].build(lx)) {
      for (const item of l.vocabulary) earlier.push(item.word);
    }
  }
  // Checkpoint recycles broadly — but as a SAMPLE, not a dump. The full
  // 47-item list meant VocabSuite's draw covered 8.5% of the phase in the
  // one week whose job is consolidation; spread() keeps every prior week
  // represented while the checkpoint's own paper still samples the whole
  // phase via buildPaper.
  if (week === 6) return spread(earlier, 20);
  // Every headword of last week, not a six-item slice of it. Six slots cannot
  // cover a nine-item week however they are chosen, and `slice(-6)` chose the
  // literal tail, so lessons 1-2 of every week went to the checkpoint never
  // reviewed. Returning the whole week guarantees each headword one spaced
  // retrieval at lag 1.
  const lastWeek: string[] = [];
  for (const l of WEEK_META[week - 1].build(lx)) {
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

function buildWeek(lx: P0Lexicon, week: number): WeekContent {
  const meta = WEEK_META[week];
  return {
    departmentId: lx.code,
    weekNumber: week,
    weekTitleEn: meta.en,
    weekTitleVi: meta.vi,
    // A department lesson replaces the spine lesson at the same id, so the
    // week keeps its four lessons in the same order and every id downstream
    // — progress records, review keys, deep links — stays valid.
    lessons: meta.build(lx).map((l) => DEPT_LESSONS[l.lessonId]?.(lx) ?? l),
    reviewWords: reviewWordsFor(lx, week),
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
