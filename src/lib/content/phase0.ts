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
// HARD CONSTRAINTS honoured throughout (verified by scripts/verify-phase0.mjs):
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

import type { GameRound, GrammarItem, LessonContent, ReadingItem, SpeakingItem, VocabItem, WeekContent } from "./week-content";

const RESORT = "Lotus Bay";

// ------------------------------------------------------------
// Department lexicons — the only per-department variation in P0.
// ------------------------------------------------------------
type P0Item = { word: string; phonetic: string; definition: string; icon: string };

export type P0Lexicon = {
  code: string;
  deptEn: string;
  deptPhonetic: string;
  deptVi: string;
  staff: string;
  /** Where this staff member greets guests, lowercase, article included. */
  station: string;
  items: [P0Item, P0Item, P0Item, P0Item, P0Item, P0Item];
  /** A service this department owns, used for opening-hours work in week 3. */
  service: { en: string; vi: string; open: string; close: string };
  /** One paid item, used for price work in week 4. */
  priced: { en: string; vi: string; usd: number; usdWord: string };
  roomNo: { digits: string; spoken: string };
  floor: { ordinal: string; vi: string };
};

export const LEXICONS: Record<string, P0Lexicon> = {
  FO: {
    code: "FO",
    deptEn: "Front Office",
    deptPhonetic: "/frʌnt ˈɒfɪs/",
    deptVi: "Lễ tân",
    staff: "Nam",
    station: "the front desk",
    items: [
      { word: "Key", phonetic: "/kiː/", definition: "Chìa khóa phòng", icon: "🔑" },
      { word: "Passport", phonetic: "/ˈpɑːspɔːt/", definition: "Hộ chiếu", icon: "🛂" },
      { word: "Luggage", phonetic: "/ˈlʌɡɪdʒ/", definition: "Hành lý", icon: "🧳" },
      { word: "Form", phonetic: "/fɔːm/", definition: "Tờ khai, biểu mẫu", icon: "📋" },
      { word: "Map", phonetic: "/mæp/", definition: "Bản đồ", icon: "🗺️" },
      { word: "Pen", phonetic: "/pen/", definition: "Bút", icon: "🖊️" },
    ],
    service: { en: "check-in", vi: "giờ nhận phòng", open: "two", close: "eleven" },
    priced: { en: "airport transfer", vi: "xe đưa đón sân bay", usd: 25, usdWord: "twenty-five" },
    roomNo: { digits: "205", spoken: "two-oh-five" },
    floor: { ordinal: "second", vi: "tầng hai" },
  },
  FB: {
    code: "FB",
    deptEn: "Food and Beverage",
    deptPhonetic: "/fuːd ənd ˈbevərɪdʒ/",
    deptVi: "Nhà hàng & Bar",
    staff: "Linh",
    station: "the restaurant door",
    items: [
      { word: "Menu", phonetic: "/ˈmenjuː/", definition: "Thực đơn", icon: "📋" },
      { word: "Table", phonetic: "/ˈteɪbl/", definition: "Bàn ăn", icon: "🪑" },
      { word: "Water", phonetic: "/ˈwɔːtə/", definition: "Nước lọc", icon: "💧" },
      { word: "Coffee", phonetic: "/ˈkɒfi/", definition: "Cà phê", icon: "☕" },
      { word: "Spoon", phonetic: "/spuːn/", definition: "Thìa", icon: "🥄" },
      { word: "Napkin", phonetic: "/ˈnæpkɪn/", definition: "Khăn ăn", icon: "🧻" },
    ],
    service: { en: "breakfast", vi: "bữa sáng", open: "six", close: "ten" },
    priced: { en: "Vietnamese coffee", vi: "cà phê Việt Nam", usd: 4, usdWord: "four" },
    roomNo: { digits: "310", spoken: "three-one-oh" },
    floor: { ordinal: "third", vi: "tầng ba" },
  },
  HK: {
    code: "HK",
    deptEn: "Housekeeping",
    deptPhonetic: "/ˈhaʊskiːpɪŋ/",
    deptVi: "Buồng phòng",
    staff: "Huy",
    station: "the guest room door",
    items: [
      { word: "Towel", phonetic: "/ˈtaʊəl/", definition: "Khăn tắm", icon: "🧺" },
      { word: "Soap", phonetic: "/səʊp/", definition: "Xà phòng", icon: "🧼" },
      { word: "Pillow", phonetic: "/ˈpɪləʊ/", definition: "Gối", icon: "🛏️" },
      { word: "Blanket", phonetic: "/ˈblæŋkɪt/", definition: "Chăn", icon: "🛌" },
      { word: "Hanger", phonetic: "/ˈhæŋə/", definition: "Móc treo quần áo", icon: "🧥" },
      { word: "Bin", phonetic: "/bɪn/", definition: "Thùng rác", icon: "🗑️" },
    ],
    service: { en: "room cleaning", vi: "giờ dọn phòng", open: "eight", close: "four" },
    priced: { en: "laundry for one shirt", vi: "giặt là một áo sơ mi", usd: 3, usdWord: "three" },
    roomNo: { digits: "812", spoken: "eight-one-two" },
    floor: { ordinal: "eighth", vi: "tầng tám" },
  },
  SW: {
    code: "SW",
    deptEn: "Spa and Wellness",
    deptPhonetic: "/spɑː ənd ˈwelnəs/",
    deptVi: "Spa & Sức khỏe",
    staff: "Mai",
    station: "the spa reception",
    items: [
      { word: "Robe", phonetic: "/rəʊb/", definition: "Áo choàng tắm", icon: "🥼" },
      { word: "Locker", phonetic: "/ˈlɒkə/", definition: "Tủ khóa", icon: "🔒" },
      { word: "Slipper", phonetic: "/ˈslɪpə/", definition: "Dép đi trong spa", icon: "🩴" },
      { word: "Tea", phonetic: "/tiː/", definition: "Trà thảo mộc", icon: "🍵" },
      { word: "Oil", phonetic: "/ɔɪl/", definition: "Tinh dầu", icon: "🫗" },
      { word: "Candle", phonetic: "/ˈkændl/", definition: "Nến thơm", icon: "🕯️" },
    ],
    // Open and close must differ — the week-3 reading questions offer both
    // as answer options, so identical values give the learner two identical
    // choices and no correct answer to pick.
    service: { en: "the spa", vi: "giờ mở cửa spa", open: "ten", close: "eight" },
    priced: { en: "foot massage", vi: "massage chân", usd: 30, usdWord: "thirty" },
    roomNo: { digits: "104", spoken: "one-oh-four" },
    floor: { ordinal: "first", vi: "tầng một" },
  },
  GR: {
    code: "GR",
    deptEn: "Guest Relations",
    deptPhonetic: "/ɡest rɪˈleɪʃnz/",
    deptVi: "Quan hệ khách hàng",
    staff: "Trang",
    station: "the lounge door",
    items: [
      // "Lounge card", not "Card" — the shared week-4 payment vocabulary
      // already teaches "Card", and one department must not meet the same
      // headword twice with two different meanings.
      { word: "Lounge card", phonetic: "/laʊndʒ kɑːd/", definition: "Thẻ ra vào phòng chờ", icon: "💳" },
      { word: "Gift", phonetic: "/ɡɪft/", definition: "Quà tặng", icon: "🎁" },
      { word: "Flower", phonetic: "/ˈflaʊə/", definition: "Hoa", icon: "💐" },
      { word: "Letter", phonetic: "/ˈletə/", definition: "Thư", icon: "✉️" },
      { word: "Seat", phonetic: "/siːt/", definition: "Chỗ ngồi", icon: "💺" },
      { word: "Umbrella", phonetic: "/ʌmˈbrelə/", definition: "Ô, dù", icon: "☂️" },
    ],
    service: { en: "the lounge", vi: "giờ mở cửa phòng chờ", open: "seven", close: "ten" },
    priced: { en: "birthday cake", vi: "bánh sinh nhật", usd: 20, usdWord: "twenty" },
    roomNo: { digits: "720", spoken: "seven-two-oh" },
    floor: { ordinal: "seventh", vi: "tầng bảy" },
  },
  BO: {
    code: "BO",
    deptEn: "Back Office",
    deptPhonetic: "/bæk ˈɒfɪs/",
    deptVi: "Vận hành & Kinh doanh",
    staff: "Dũng",
    station: "the office door",
    items: [
      { word: "Invoice", phonetic: "/ˈɪnvɔɪs/", definition: "Hóa đơn", icon: "🧾" },
      { word: "Email", phonetic: "/ˈiːmeɪl/", definition: "Thư điện tử", icon: "📧" },
      { word: "Folder", phonetic: "/ˈfəʊldə/", definition: "Tập hồ sơ", icon: "📁" },
      { word: "Printer", phonetic: "/ˈprɪntə/", definition: "Máy in", icon: "🖨️" },
      { word: "Chair", phonetic: "/tʃeə/", definition: "Ghế", icon: "🪑" },
      { word: "Pen", phonetic: "/pen/", definition: "Bút", icon: "🖊️" },
    ],
    service: { en: "the office", vi: "giờ làm việc văn phòng", open: "eight", close: "five" },
    priced: { en: "meeting room for one hour", vi: "phòng họp một giờ", usd: 50, usdWord: "fifty" },
    roomNo: { digits: "415", spoken: "four-one-five" },
    floor: { ordinal: "fourth", vi: "tầng bốn" },
  },
};

// ------------------------------------------------------------
// Small authoring helpers.
// ------------------------------------------------------------
export function v(word: string, phonetic: string, definition: string, context: string, icon: string): VocabItem {
  return { word, phonetic, definition, context, icon };
}
export function g(rude: string, polite: string, rule: string): GrammarItem {
  return { rude, polite, rule };
}
export function sp(guestPrompt: string, targetResponse: string, helpTip: string): SpeakingItem {
  return { guestPrompt, targetResponse, helpTip };
}
export function read(text: string, questions: ReadingItem["questions"]): ReadingItem {
  return { text, questions };
}
export function game(prompt: string, correct: string, wrongA: string, wrongB: string): GameRound {
  return {
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
  parts: { vocabulary: VocabItem[]; grammar: GrammarItem[]; speaking: SpeakingItem[]; reading: ReadingItem; game: GameRound[] },
): LessonContent {
  return { lessonId: `${lx.code}_${week}_${order}`, lessonOrder: order, titleEn, titleVi, ...parts };
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
        v("Good morning", "/ɡʊd ˈmɔːnɪŋ/", "Chào buổi sáng (trước 12h)", "Good morning, sir.", "🌅"),
        v("Good afternoon", "/ɡʊd ˌɑːftəˈnuːn/", "Chào buổi chiều (12h–18h)", "Good afternoon, madam.", "☀️"),
        v("Welcome", "/ˈwelkəm/", "Chào mừng, đón chào", `Welcome to ${RESORT}.`, "🙏"),
      ],
      grammar: [
        g("Morning.", "Good morning, sir.", "Không nói cụt 'Morning'. Với khách luôn nói đủ 'Good morning' và thêm 'sir' (nam) hoặc 'madam' (nữ)."),
        g("Hey, come in.", `Welcome to ${RESORT}.`, "Không dùng 'Hey' với khách. Câu đón chuẩn là 'Welcome to' + tên khách sạn."),
      ],
      speaking: [
        sp("Hello!", "Good morning, sir. Welcome.", "Chào theo buổi: morning (trước 12h), afternoon (12h–18h), evening (sau 18h)."),
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
      game: [game("Good evening.", "Good evening, madam.", "Good morning.", "Bye bye.")],
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
        v("Alphabet", "/ˈælfəbet/", "Bảng chữ cái", "Please say the alphabet slowly.", "🔤"),
      ],
      grammar: [
        g("What your name?", "May I have your name?", "Tiếng Anh cần động từ. Câu hỏi tên lịch sự là 'May I have your name?' — không nói 'What your name?'."),
        g("Spell please.", "How do you spell that?", "Muốn khách đánh vần, hỏi trọn câu 'How do you spell that?'."),
        g("Say it again.", "Could you spell that, please?", "Tên khó nghe hoặc có chữ cái dễ nhầm (như E và I), hãy nhờ khách đánh vần từng chữ."),
      ],
      speaking: [
        sp("My name is Ivy. I-V-Y.", "Thank you. I-V-Y is correct.", "Nhắc lại từng chữ cái khách vừa đánh vần để xác nhận không nghe nhầm."),
      ],
      reading: read(
        `A guest says: "My name is Anna Smith. A-N-N-A, S-M-I-T-H." ${lx.staff} writes each letter and says: "Thank you. A-N-N-A, S-M-I-T-H."`,
        [
          {
            q: "Khách đánh vần tên bằng cách nào?",
            options: ["Nói từng chữ cái một", "Nói cả tên một lần", "Viết ra giấy"],
            correct: 0,
            explanation: "'A-N-N-A, S-M-I-T-H' — đọc từng chữ cái, đây là cách đánh vần tên chuẩn.",
          },
          {
            q: `Vì sao ${lx.staff} nhắc lại từng chữ cái?`,
            options: ["Để xác nhận không nghe nhầm", "Để khách chờ lâu", "Vì không hiểu tên khách"],
            correct: 0,
            explanation: "Nhắc lại từng chữ cái là cách xác nhận chính xác nhất khi ghi tên khách.",
          },
        ],
      ),
      game: [game("It is spelled J-A-N-E.", "J-A-N-E. Thank you.", "Jane, okay.", "J-A-M-E.")],
    }),

    lesson(lx, 1, 3, "I Work Here", "Tôi làm ở bộ phận nào", {
      vocabulary: [
        v(lx.deptEn, lx.deptPhonetic, `Bộ phận ${lx.deptVi}`, `I am from ${lx.deptEn}.`, "🏢"),
        v("Help", "/help/", "Giúp đỡ", "May I help you?", "🤝"),
      ],
      grammar: [
        g(`I ${lx.deptEn}.`, `I am from ${lx.deptEn}.`, "Tiếng Việt bỏ được động từ 'là', tiếng Anh thì không. Luôn có 'am/is/are': I AM from…"),
        g("You are from where?", "Where are you from?", "Từ để hỏi đứng đầu câu trong tiếng Anh: 'Where are you from?' — không đặt cuối như tiếng Việt."),
      ],
      speaking: [
        sp("Excuse me, who are you?", `I am from ${lx.deptEn}.`, "Giới thiệu bộ phận giúp khách biết bạn giúp được việc gì."),
      ],
      reading: read(
        `${lx.staff} works at ${lx.station}. ${lx.staff} says: "Good afternoon, madam. I am from ${lx.deptEn}. May I help you?"`,
        [
          {
            q: `${lx.staff} làm ở bộ phận nào?`,
            options: [lx.deptVi, "Bếp", "Bảo vệ"],
            correct: 0,
            explanation: `${lx.staff} nói "I am from ${lx.deptEn}" — tức bộ phận ${lx.deptVi}.`,
          },
          {
            q: "Câu nào dùng để mời khách cho mình giúp?",
            options: ["May I help you?", "Where are you from?", "How do you spell that?"],
            correct: 0,
            explanation: "'May I help you?' là câu mời giúp đỡ chuẩn mực trong khách sạn.",
          },
        ],
      ),
      game: [game("Are you the manager?", `No, madam. I am from ${lx.deptEn}.`, "Yes yes.", "I no manager.")],
    }),

    lesson(lx, 1, 4, "Goodbye & Thank You", "Cảm ơn & tạm biệt", {
      vocabulary: [
        v("Thank you", "/ˈθæŋk juː/", "Cảm ơn", "Thank you very much.", "🙏"),
        v("Goodbye", "/ˌɡʊdˈbaɪ/", "Tạm biệt", "Goodbye, sir.", "👋"),
      ],
      grammar: [
        g("Thank.", "Thank you very much.", "Phải có 'you': THANK YOU. Muốn nhấn mạnh thì thêm 'very much'."),
        g("Bye.", "Goodbye, sir. Good night.", "'Bye' quá thân mật với khách. Dùng 'Goodbye' kèm 'sir/madam'."),
      ],
      speaking: [
        sp("Thank you for your help!", "You are welcome, madam.", "Khi khách cảm ơn, đáp 'You are welcome' — không im lặng hoặc chỉ gật đầu."),
      ],
      reading: read(
        `The guest leaves ${lx.station}. ${lx.staff} smiles and says: "Thank you, sir. Goodbye. Have a nice day."`,
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
            explanation: "'Have a nice day' dùng ban ngày; 'Good night' chỉ dùng buổi tối khi khách đi ngủ.",
          },
        ],
      ),
      game: [
        game("See you tomorrow.", "Goodbye, sir. Have a nice day.", "OK bye.", "Yes, tomorrow."),
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
        v("Zero", "/ˈzɪərəʊ/", "Số 0 (đọc là 'oh' trong số phòng)", "Room two-oh-five.", "0️⃣"),
        v("Room", "/ruːm/", "Phòng", `Room ${lx.roomNo.spoken}, sir.`, "🚪"),
        v("Hundred", "/ˈhʌndrəd/", "Trăm", "One hundred dollars.", "💯"),
      ],
      grammar: [
        g(`Room ${lx.roomNo.digits} hundred.`, `Room ${lx.roomNo.spoken}, sir.`, `Số phòng đọc từng chữ số, không đọc như số đếm: ${lx.roomNo.digits} = ${lx.roomNo.spoken}. Số 0 đọc là 'oh'.`),
        g("Room number what?", "What is your room number?", "Câu hỏi cần 'is' và trật tự: What IS your room number?"),
        g("Two ten, right?", "It is twenty, sir.", "Hàng chục: TWENTY (20), THIRTY (30), FORTY (40) … NINETY (90). Ghép thêm số cuối để có số lớn hơn: 20 + 5 = twenty-five."),
      ],
      speaking: [
        sp("What is my room number?", `Your room is ${lx.roomNo.spoken}.`, `Đọc rõ từng chữ số. ${lx.roomNo.digits} đọc là "${lx.roomNo.spoken}".`),
        sp("What is the total, please?", "It is forty-five dollars, sir.", "Số hàng chục ghép số lẻ có dấu gạch ngang, không có khoảng trắng: forty-five, không phải 'forty five'."),
      ],
      reading: read(
        `A guest asks about the room number. ${lx.staff} looks and says: "Your room is ${lx.roomNo.spoken}, sir. Here is your key. The total today is forty-five dollars."`,
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
            explanation: "Khi đọc số phòng, người Anh–Mỹ đọc số 0 là 'oh' (ví dụ 205 = two-oh-five).",
          },
        ],
      ),
      game: [
        game("Is my room three-oh-five?", "Yes, room three-oh-five, sir.", "Yes, room 305 hundred.", "Room what?"),
        game("Is the total thirty dollars?", "No, sir. It is forty dollars.", "Thirty yes, sir.", "Dollar forty is."),
      ],
    }),

    lesson(lx, 2, 2, "Floors & the Lift", "Tầng lầu & thang máy", {
      vocabulary: [
        v("Floor", "/flɔː/", "Tầng", `The ${lx.floor.ordinal} floor, madam.`, "🛗"),
        v("Lift", "/lɪft/", "Thang máy (Anh–Anh; Mỹ: elevator)", "The lift is over there.", "🛗"),
      ],
      grammar: [
        g(`Go floor ${lx.floor.ordinal}.`, `Go to the ${lx.floor.ordinal} floor.`, "Cần 'to the' trước tên tầng: go TO THE second floor."),
        g("Which floor my room?", "Which floor is my room on?", "Câu hỏi cần động từ 'is'. Đây là câu khách hay hỏi — nghe hiểu được là đủ."),
      ],
      speaking: [
        sp("Which floor, please?", `The ${lx.floor.ordinal} floor, madam.`, "Trả lời ngắn gọn: 'The + số thứ tự + floor'. Không cần cả câu dài."),
      ],
      reading: read(
        `The guest asks: "Which floor is my room on?" ${lx.staff} points to the lift and says: "The ${lx.floor.ordinal} floor, madam."`,
        [
          {
            q: "Phòng khách ở tầng mấy?",
            options: [lx.floor.vi, "Tầng trệt", "Tầng mười"],
            correct: 0,
            explanation: `${lx.staff} nói "The ${lx.floor.ordinal} floor" — tức ${lx.floor.vi}.`,
          },
          {
            q: "'Lift' nghĩa là gì?",
            options: ["Thang máy", "Cầu thang bộ", "Cửa ra vào"],
            correct: 0,
            explanation: "'Lift' (Anh–Anh) = 'elevator' (Anh–Mỹ) = thang máy.",
          },
        ],
      ),
      game: [game("Where is the lift?", "The lift is over there, sir.", "Lift there.", "I don't know.")],
    }),

    lesson(lx, 2, 3, "Counting Items", "Đếm đồ vật", {
      vocabulary: [
        v(i1.word, i1.phonetic, i1.definition, `Two ${i1.word.toLowerCase()}s, please.`, i1.icon),
        v(i2.word, i2.phonetic, i2.definition, `Here is your ${i2.word.toLowerCase()}.`, i2.icon),
      ],
      grammar: [
        g(`Two ${i1.word.toLowerCase()}.`, `Two ${i1.word.toLowerCase()}s, please.`, `Từ hai trở lên phải thêm -s: one ${i1.word.toLowerCase()} → two ${i1.word.toLowerCase()}s. Tiếng Việt không đổi từ, tiếng Anh thì có.`),
        g(`I bring you ${i1.word.toLowerCase()}.`, `I will bring two ${i1.word.toLowerCase()}s.`, "Việc sắp làm dùng 'will': I WILL bring. Và nhớ mạo từ hoặc số trước danh từ."),
      ],
      speaking: [
        sp(`Two ${i1.word.toLowerCase()}s, please.`, `Yes, two ${i1.word.toLowerCase()}s. One moment.`, "Nhắc lại số lượng khách yêu cầu để xác nhận — tránh mang sai."),
      ],
      reading: read(
        `A guest wants two ${i1.word.toLowerCase()}s. ${lx.staff} says: "Yes, madam. Two ${i1.word.toLowerCase()}s. One moment, please."`,
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
          `Can I have one more ${i2.word.toLowerCase()}?`,
          `Of course. One ${i2.word.toLowerCase()}, madam.`,
          `Yes, one ${i2.word.toLowerCase()}s.`,
          "No more.",
        ),
      ],
    }),

    lesson(lx, 2, 4, "How Many?", "Hỏi số lượng", {
      vocabulary: [
        v(i3.word, i3.phonetic, i3.definition, `Three ${i3.word.toLowerCase()}s, sir.`, i3.icon),
        v(i4.word, i4.phonetic, i4.definition, `Here is the ${i4.word.toLowerCase()}.`, i4.icon),
      ],
      grammar: [
        g(`How much ${i3.word.toLowerCase()}s?`, `How many ${i3.word.toLowerCase()}s, sir?`, "Đếm được thì dùng 'How many' (how many towels); không đếm được mới dùng 'How much' (how much water)."),
        g("Give me three.", `Three ${i3.word.toLowerCase()}s, please.`, "'Give me' nghe ra lệnh. Nói số lượng + tên đồ + 'please'."),
      ],
      speaking: [
        sp(`I need three ${i3.word.toLowerCase()}s.`, `Three ${i3.word.toLowerCase()}s. Yes, madam.`, "Xác nhận lại rồi mới đi lấy. Đừng chỉ gật đầu."),
      ],
      reading: read(
        `${lx.staff} asks: "How many ${i3.word.toLowerCase()}s, sir?" The guest says: "Three, please." ${lx.staff} says: "Three ${i3.word.toLowerCase()}s. One moment."`,
        [
          {
            q: `Vì sao dùng "How many" chứ không phải "How much"?`,
            options: [`Vì ${i3.word.toLowerCase()} đếm được`, "Vì hỏi giá tiền", "Vì khách là nam"],
            correct: 0,
            explanation: "'How many' dùng cho danh từ đếm được; 'How much' dùng cho tiền hoặc thứ không đếm được.",
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
          `We are four people tonight.`,
          `Four people. Thank you, sir.`,
          `How much people?`,
          `Four person.`,
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
        v("Half past", "/hɑːf pɑːst/", "Rưỡi (7:30 = half past seven)", "It is half past seven.", "🕢"),
      ],
      grammar: [
        g("Now seven.", "It is seven o'clock.", "Câu tiếng Anh cần chủ ngữ 'It' và động từ 'is': IT IS seven o'clock."),
        g("What time now?", "What time is it?", "Câu hỏi giờ chuẩn là 'What time is it?' — có động từ 'is'."),
      ],
      speaking: [
        sp("Excuse me, what time is it?", "It is seven o'clock, sir.", "Giờ đúng thì thêm 'o'clock'. 7:30 nói 'half past seven'."),
      ],
      reading: read(
        `A guest asks ${lx.staff} the time. ${lx.staff} looks at the clock and says: "It is half past seven, sir."`,
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
      game: [game("Is it eight o'clock now?", "No, sir. It is half past seven.", "Yes, now eight.", "Time eight.")],
    }),

    lesson(lx, 3, 2, "Days of the Week", "Các ngày trong tuần", {
      vocabulary: [
        v("Today", "/təˈdeɪ/", "Hôm nay", "Today is Monday.", "📅"),
        v("Tomorrow", "/təˈmɒrəʊ/", "Ngày mai", "Your tour is tomorrow.", "📆"),
      ],
      grammar: [
        g("Today Monday.", "Today is Monday.", "Lại là động từ 'is'. Tiếng Việt nói 'Hôm nay thứ Hai', tiếng Anh phải có IS."),
        g("Tomorrow I clean.", "I will clean tomorrow.", "Việc tương lai dùng 'will' + động từ: I WILL clean."),
      ],
      speaking: [
        sp("When is my city tour?", "Your tour is tomorrow, madam.", "Nói rõ 'today' hay 'tomorrow' để khách không nhầm lịch."),
      ],
      reading: read(
        `Today is Monday. A guest asks about the city tour. ${lx.staff} checks and says: "Your tour is tomorrow, madam. Tuesday."`,
        [
          {
            q: "Chuyến tham quan diễn ra ngày nào?",
            options: ["Thứ Ba", "Thứ Hai", "Chủ nhật"],
            correct: 0,
            explanation: "Hôm nay là thứ Hai, tour là 'tomorrow' — tức thứ Ba.",
          },
          {
            q: "'Tomorrow' nghĩa là gì?",
            options: ["Ngày mai", "Hôm nay", "Hôm qua"],
            correct: 0,
            explanation: "today = hôm nay, tomorrow = ngày mai.",
          },
        ],
      ),
      game: [game("Is the tour today?", "No, madam. It is tomorrow.", "Yes, today tour.", "Tour Monday no.")],
    }),

    lesson(lx, 3, 3, "Opening & Closing Hours", "Giờ mở cửa & đóng cửa", {
      vocabulary: [
        v("Open", "/ˈəʊpən/", "Mở cửa", `We open at ${lx.service.open}.`, "🔓"),
        v("Close", "/kləʊz/", "Đóng cửa", `We close at ${lx.service.close}.`, "🔒"),
      ],
      grammar: [
        g(`Open ${lx.service.open}.`, `We open at ${lx.service.open}.`, "Cần chủ ngữ 'We' và giới từ 'at' trước giờ: we open AT six."),
        g(`${lx.service.en} close ${lx.service.close}.`, `We close at ${lx.service.close}, sir.`, "Động từ phải chia và có 'at' trước giờ. Nói ngắn gọn với chủ ngữ 'We'."),
      ],
      speaking: [
        sp("What time do you open?", `We open at ${lx.service.open}, madam.`, "Công thức: 'We open at + giờ'. Đóng cửa thì 'We close at + giờ'."),
      ],
      reading: read(
        `A guest asks about ${lx.service.en}. ${lx.staff} says: "We open at ${lx.service.open} and close at ${lx.service.close}, sir."`,
        [
          {
            q: `${lx.service.vi} mở lúc mấy giờ?`,
            options: [`${lx.service.open}`, `${lx.service.close}`, "Cả ngày"],
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
          `Open ${lx.service.open} yes.`,
          `We close ${lx.service.close}.`,
        ),
      ],
    }),

    lesson(lx, 3, 4, "What Time Is Breakfast?", "Hỏi giờ dịch vụ", {
      vocabulary: [
        v("Start", "/stɑːt/", "Bắt đầu", `It starts at ${lx.service.open}.`, "▶️"),
        v("Finish", "/ˈfɪnɪʃ/", "Kết thúc", `It finishes at ${lx.service.close}.`, "⏹️"),
      ],
      grammar: [
        g(`What time ${lx.service.en}?`, `What time is ${lx.service.en}?`, "Câu hỏi cần 'is': What time IS breakfast?"),
        g(`${lx.service.en} finish ${lx.service.close}.`, `It finishes at ${lx.service.close}.`, "Chủ ngữ 'It' + động từ thêm -s (finishes) + 'at' trước giờ."),
      ],
      speaking: [
        sp(`What time is ${lx.service.en}?`, `It starts at ${lx.service.open} o'clock.`, "Trả lời cả giờ bắt đầu; nếu khách cần, nói thêm giờ kết thúc."),
      ],
      reading: read(
        `A guest asks: "What time is ${lx.service.en}?" ${lx.staff} answers: "It starts at ${lx.service.open} and finishes at ${lx.service.close}, madam."`,
        [
          {
            q: "Câu hỏi của khách thiếu gì nếu nói 'What time breakfast?'",
            options: ["Thiếu động từ 'is'", "Thiếu 'please'", "Thiếu tên khách"],
            correct: 0,
            explanation: "Câu hỏi tiếng Anh cần động từ: What time IS breakfast?",
          },
          {
            q: `Dịch vụ kết thúc lúc mấy giờ?`,
            options: [`${lx.service.close}`, `${lx.service.open}`, "Nửa đêm"],
            correct: 0,
            explanation: `Nhân viên nói "finishes at ${lx.service.close}".`,
          },
        ],
      ),
      game: [
        game(
          `Am I too late?`,
          `No, madam. We finish at ${lx.service.close}.`,
          `Yes, too late now.`,
          `Finish ${lx.service.close}.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 4 — Prices, Money & Quantities
// Function: say a price · ask/answer "How much?" · handle
//           dollars and dong · confirm a total.
// ============================================================
function week4(lx: P0Lexicon): LessonContent[] {
  return [
    lesson(lx, 4, 1, "Prices in Dollars", "Giá bằng đô la", {
      vocabulary: [
        v("Price", "/praɪs/", "Giá", "The price is twenty dollars.", "💲"),
        v("Dollar", "/ˈdɒlə/", "Đô la Mỹ", `It is ${lx.priced.usd} dollars.`, "💵"),
        v("Free", "/friː/", "Miễn phí", "The water is free, sir.", "🆓"),
      ],
      grammar: [
        g(`Twenty dollar.`, `It is twenty dollars.`, "Từ 2 đô trở lên phải có -s: twenty dollarS. Và cần 'It is' ở đầu."),
        g("Price what?", "How much is it?", "Hỏi giá chuẩn là 'How much is it?' — không hỏi 'Price what?'."),
      ],
      speaking: [
        sp("How much is it?", `It is ${lx.priced.usdWord} dollars, sir.`, "Công thức: 'It is + số + dollars'. Nhớ -s khi từ 2 trở lên."),
      ],
      reading: read(
        `A guest asks about the ${lx.priced.en}. ${lx.staff} says: "It is ${lx.priced.usd} dollars, sir." The guest says: "That is fine."`,
        [
          {
            q: `${lx.priced.vi} giá bao nhiêu?`,
            options: [`${lx.priced.usd} đô`, "Miễn phí", "10 đô"],
            correct: 0,
            explanation: `Nhân viên nói "It is ${lx.priced.usd} dollars".`,
          },
          {
            q: "Vì sao nói 'dollars' chứ không phải 'dollar'?",
            options: ["Vì nhiều hơn một", "Vì lịch sự hơn", "Vì khách là nam"],
            correct: 0,
            explanation: "Danh từ đếm được, số nhiều phải thêm -s: two dollars, twenty dollars.",
          },
        ],
      ),
      game: [game("Is the water free?", "Yes, madam. It is free.", "No, water dollar.", "Free no.")],
    }),

    lesson(lx, 4, 2, "Cash or Card?", "Tiền mặt hay thẻ", {
      vocabulary: [
        v("Cash", "/kæʃ/", "Tiền mặt", "Cash or card, sir?", "💵"),
        v("Card", "/kɑːd/", "Thẻ ngân hàng", "You can pay by card.", "💳"),
      ],
      grammar: [
        g("You pay money how?", "Cash or card, sir?", "Câu hỏi ngắn, lịch sự: 'Cash or card?' — dễ hiểu hơn câu dịch từng chữ từ tiếng Việt."),
        g("I no take card.", "We take cards, madam.", "Phủ định/khẳng định cần đúng động từ: WE TAKE cards. Không nói 'I no take'."),
      ],
      speaking: [
        sp("Can I pay by card?", "Yes, card is fine, sir.", "Đáp ngắn và rõ. Nếu chỉ nhận tiền mặt: 'Cash only, please.'"),
      ],
      reading: read(
        `${lx.staff} asks: "Cash or card, sir?" The guest gives a card. ${lx.staff} says: "Thank you. Card is fine."`,
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
      game: [game("Do you take Visa?", "Yes, sir. We take cards.", "Visa I no know.", "Cash only yes.")],
    }),

    lesson(lx, 4, 3, "Vietnamese Dong", "Tiền đồng Việt Nam", {
      vocabulary: [
        v("Dong", "/dɒŋ/", "Đồng (tiền Việt Nam)", "Five hundred thousand dong.", "🇻🇳"),
        v("Change", "/tʃeɪndʒ/", "Tiền thối lại", "Here is your change.", "🪙"),
      ],
      grammar: [
        g("Dong five hundred thousand.", "Five hundred thousand dong.", "Tiếng Anh nói số trước, đơn vị tiền sau: five hundred thousand DONG."),
        g("Money back here.", "Here is your change.", "Tiền thối gọi là 'change'. Đưa cho khách nói 'Here is your change.'"),
      ],
      speaking: [
        sp("Do you take dong?", "Yes, we take dong, madam.", "Nhắc lại đơn vị tiền khách hỏi để xác nhận rõ ràng."),
      ],
      reading: read(
        `The guest pays with dong. ${lx.staff} counts the money and says: "Thank you, madam. Here is your change."`,
        [
          {
            q: "'Change' trong bài nghĩa là gì?",
            options: ["Tiền thối lại", "Thay đổi lịch", "Đổi phòng"],
            correct: 0,
            explanation: "Trong thanh toán, 'change' là tiền thối lại cho khách.",
          },
          {
            q: "Trật tự đúng khi nói số tiền là gì?",
            options: ["Số trước, đơn vị sau", "Đơn vị trước, số sau", "Không quan trọng"],
            correct: 0,
            explanation: "Tiếng Anh: 'five hundred thousand dong' — số đứng trước đơn vị tiền.",
          },
        ],
      ),
      game: [game("Can I pay in dong?", "Of course, madam. We take dong.", "Dong no good.", "Yes, dong five hundred.")],
    }),

    lesson(lx, 4, 4, "Confirming the Total", "Xác nhận tổng tiền", {
      vocabulary: [
        v("Total", "/ˈtəʊtl/", "Tổng cộng", "The total is thirty dollars.", "🧮"),
        v("Bill", "/bɪl/", "Hóa đơn", "Here is your bill, sir.", "🧾"),
      ],
      grammar: [
        g("Total thirty.", "The total is thirty dollars.", "Cần mạo từ 'The', động từ 'is' và đơn vị tiền: THE total IS thirty DOLLARS."),
        g("You want how many?", "How many would you like?", "Hỏi lịch sự dùng 'would you like' thay vì 'you want'."),
      ],
      speaking: [
        sp("Two coffees, please.", "Two coffees. Eight dollars, please.", "Nhắc lại món và nói tổng tiền — khách nghe rõ, tránh tranh cãi hóa đơn."),
      ],
      reading: read(
        `The guest orders two coffees. ${lx.staff} says: "Two coffees. The total is eight dollars, sir. Here is your bill."`,
        [
          {
            q: "Tổng tiền là bao nhiêu?",
            options: ["8 đô", "2 đô", "18 đô"],
            correct: 0,
            explanation: "Nhân viên nói 'The total is eight dollars.'",
          },
          {
            q: `Vì sao ${lx.staff} nhắc lại "Two coffees"?`,
            options: ["Để xác nhận đúng món khách gọi", "Vì quên", "Để bán thêm"],
            correct: 0,
            explanation: "Nhắc lại đơn hàng trước khi báo giá là quy trình chuẩn, tránh nhầm lẫn.",
          },
        ],
      ),
      game: [game("Here is fifty dollars.", "Thank you, sir. Your change, please.", "Fifty dollar OK.", "Total fifty yes.")],
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
        g("Give me your bag.", "May I take your bag?", "Câu xin phép dùng 'May I…?'. 'Give me' nghe như ra lệnh."),
        g("Sit.", "Please have a seat.", "Mời khách ngồi nói 'Please have a seat' — chỉ nói 'Sit' là bất lịch sự."),
      ],
      speaking: [
        sp("Could you help me, please?", "Of course, madam. Certainly.", "'Of course' và 'Certainly' là hai cách nhận lời lịch sự nhất."),
      ],
      reading: read(
        `A guest needs help at ${lx.station}. ${lx.staff} smiles and says: "Of course, madam. Please have a seat."`,
        [
          {
            q: "Câu nào dùng để mời khách ngồi?",
            options: ["Please have a seat.", "Sit down now.", "You sit."],
            correct: 0,
            explanation: "'Please have a seat' là câu mời ngồi lịch sự chuẩn trong khách sạn.",
          },
          {
            q: "'Of course' dùng để làm gì?",
            options: ["Nhận lời giúp khách", "Từ chối khách", "Hỏi giá"],
            correct: 0,
            explanation: "'Of course' = 'Vâng, dĩ nhiên rồi' — dùng khi vui vẻ nhận lời.",
          },
        ],
      ),
      game: [game("May I sit here?", "Of course, sir. Please have a seat.", "Yes sit.", "Here no sit.")],
    }),

    lesson(lx, 5, 2, "One Moment, Please", "Xin chờ một lát", {
      vocabulary: [
        v("Moment", "/ˈməʊmənt/", "Khoảnh khắc, một lát", "One moment, please.", "⏳"),
        v("Wait", "/weɪt/", "Chờ, đợi", "Please wait here, madam.", "⏸️"),
      ],
      grammar: [
        g("Wait.", "One moment, please, sir.", "Bảo khách 'Wait' rất thô. Câu chuẩn là 'One moment, please'."),
        g("You wait here.", "Please wait here, madam.", "Thêm 'Please' ở đầu và 'madam/sir' ở cuối để câu thành lời mời, không thành mệnh lệnh."),
      ],
      speaking: [
        sp("Can I have my key, please?", "One moment, please, sir.", "Luôn báo khách phải chờ, đừng im lặng bỏ đi. Chờ lâu thì quay lại báo tiếp."),
      ],
      reading: read(
        `The guest asks for a ${i1.word.toLowerCase()}. ${lx.staff} says: "One moment, please, sir." ${lx.staff} comes back in two minutes.`,
        [
          {
            q: "Câu nào dùng khi cần khách chờ?",
            options: ["One moment, please.", "Wait.", "You wait."],
            correct: 0,
            explanation: "'One moment, please' vừa lịch sự vừa cho khách biết sẽ không lâu.",
          },
          {
            q: "Nên làm gì khi để khách chờ?",
            options: ["Báo khách rồi quay lại sớm", "Im lặng bỏ đi", "Nói khách tự tìm"],
            correct: 0,
            explanation: "Báo trước và quay lại đúng hẹn là nguyên tắc dịch vụ cơ bản.",
          },
        ],
      ),
      game: [game("Is my table ready?", "One moment, please. I will check.", "Wait there.", "Table no ready.")],
    }),

    lesson(lx, 5, 3, "Here You Are", "Đây ạ, mời anh/chị", {
      vocabulary: [
        v("Here you are", "/hɪə juː ɑː/", "Đây ạ (khi đưa đồ cho khách)", "Here you are, sir.", "🤲"),
        v("This way", "/ðɪs weɪ/", "Mời đi lối này", "This way, please.", "➡️"),
      ],
      grammar: [
        g("Take it.", "Here you are, sir.", "Khi đưa đồ cho khách, nói 'Here you are' — không nói 'Take it'."),
        g("Go there.", "This way, please, madam.", "Dẫn khách nói 'This way, please' kèm cử chỉ tay mở, không chỉ trỏ ngón tay."),
      ],
      speaking: [
        sp("Here is my passport.", "Thank you. Here you are.", "Nhận đồ thì cảm ơn; đưa trả đồ thì nói 'Here you are'."),
      ],
      reading: read(
        `${lx.staff} gives the ${i5.word.toLowerCase()} to the guest and says: "Here you are, madam." Then ${lx.staff} says: "This way, please."`,
        [
          {
            q: "Câu nào nói khi đưa đồ cho khách?",
            options: ["Here you are.", "Take it.", "This is."],
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
      game: [game("Where is the lounge?", "This way, please, sir.", "Go there.", "Lounge that.")],
    }),

    lesson(lx, 5, 4, "Excuse Me & I Am Sorry", "Xin lỗi & Xin thứ lỗi", {
      vocabulary: [
        v("Excuse me", "/ɪkˈskjuːz miː/", "Xin phép, xin lỗi (khi làm phiền)", "Excuse me, sir.", "🙇"),
        v("Sorry", "/ˈsɒri/", "Xin lỗi (khi có lỗi)", "I am very sorry, madam.", "😔"),
      ],
      grammar: [
        g("Sorry sorry.", "I am very sorry, sir.", "Nói trọn câu 'I am very sorry' — lặp 'sorry sorry' nghe luống cuống, thiếu chuyên nghiệp."),
        g("Move please.", "Excuse me, please.", "Khi cần đi qua hoặc ngắt lời, dùng 'Excuse me' — không nói 'Move'."),
      ],
      speaking: [
        sp("This is the wrong key.", "I am very sorry, madam.", "Xin lỗi trước, sửa sau. 'Excuse me' dùng khi làm phiền; 'Sorry' dùng khi mình sai."),
      ],
      reading: read(
        `${lx.staff} gives the wrong ${i1.word.toLowerCase()}. The guest says: "This is wrong." ${lx.staff} says: "I am very sorry, madam. One moment."`,
        [
          {
            q: "Khi mình làm sai thì nói gì?",
            options: ["I am very sorry.", "Excuse me.", "Of course."],
            correct: 0,
            explanation: "'Sorry' dùng khi mình có lỗi; 'Excuse me' dùng khi làm phiền hoặc xin phép.",
          },
          {
            q: `Sau khi xin lỗi, ${lx.staff} làm gì?`,
            options: ["Nói 'One moment' rồi đi sửa", "Bỏ đi", "Cãi lại khách"],
            correct: 0,
            explanation: "Xin lỗi phải đi kèm hành động sửa lỗi ngay — đó là bước đầu của quy trình khắc phục dịch vụ.",
          },
        ],
      ),
      game: [game("You gave me the wrong bill.", "I am very sorry, sir.", "No, bill correct.", "Sorry sorry.")],
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
        g("Morning. Name what?", "Good morning. May I have your name?", "Nối hai kỹ năng tuần 1: chào đủ câu, rồi hỏi tên bằng 'May I have…?'."),
        g("You from where?", "Where are you from, sir?", "Từ hỏi đứng đầu, động từ theo sau: WHERE ARE you from?"),
      ],
      speaking: [
        sp("Good morning. I am Anna Smith.", "Good morning, madam. Welcome.", "Chào lại đúng buổi, xưng hô đúng giới tính, rồi mới sang bước tiếp."),
      ],
      reading: read(
        `It is 8 AM. A guest arrives at ${lx.station}. ${lx.staff} says: "Good morning, madam. Welcome to ${RESORT}. May I have your name?"`,
        [
          {
            q: "Nhân viên làm mấy việc trong lời chào?",
            options: ["Ba: chào, đón, hỏi tên", "Một: chào", "Hai: chào và tạm biệt"],
            correct: 0,
            explanation: "Good morning (chào) + Welcome to (đón) + May I have your name? (hỏi tên) — chuỗi ba bước chuẩn.",
          },
          {
            q: "Gọi khách nữ bằng từ nào?",
            options: ["Madam", "Sir", "Mister"],
            correct: 0,
            explanation: "sir = khách nam, madam = khách nữ. Gọi sai là lỗi lễ tân cơ bản.",
          },
        ],
      ),
      game: [game("Good afternoon.", "Good afternoon, sir. Welcome.", "Good morning, sir.", "Afternoon.")],
    }),

    lesson(lx, 6, 2, "Room, Floor & Items", "Phòng, tầng & đồ dùng", {
      vocabulary: [
        v("Ready", "/ˈredi/", "Đã sẵn sàng", "Your room is ready.", "✅"),
        v("Bring", "/brɪŋ/", "Mang tới", `I will bring two ${i1.word.toLowerCase()}s.`, "🛎️"),
      ],
      grammar: [
        g(`Room ${lx.roomNo.digits} hundred, floor ${lx.floor.ordinal}.`, `Room ${lx.roomNo.spoken}, ${lx.floor.ordinal} floor.`, "Ôn tuần 2: số phòng đọc từng chữ số, tầng dùng số thứ tự."),
        g(`I bring two ${i1.word.toLowerCase()}.`, `I will bring two ${i1.word.toLowerCase()}s.`, "Ôn hai lỗi cùng lúc: thiếu 'will' cho việc sắp làm, và thiếu -s số nhiều."),
      ],
      speaking: [
        sp("Which room and floor?", `Room ${lx.roomNo.spoken}, ${lx.floor.ordinal} floor.`, "Trả lời gọn hai thông tin khách cần nhất: số phòng và tầng."),
      ],
      reading: read(
        `${lx.staff} says: "Your room is ready, sir. Room ${lx.roomNo.spoken}, ${lx.floor.ordinal} floor. I will bring two ${i1.word.toLowerCase()}s."`,
        [
          {
            q: `Phòng khách ở tầng nào?`,
            options: [lx.floor.vi, "Tầng trệt", "Tầng hai mươi"],
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
          `Is my room ready?`,
          `Yes, sir. Room ${lx.roomNo.spoken} is ready.`,
          `Room ready yes.`,
          `Room ${lx.roomNo.digits} hundred.`,
        ),
      ],
    }),

    lesson(lx, 6, 3, "Time & Price Together", "Giờ giấc & giá tiền", {
      vocabulary: [
        v("Again", "/əˈɡen/", "Lại, lần nữa", "Could you say that again?", "🔁"),
        v("Understand", "/ˌʌndəˈstænd/", "Hiểu", "I understand, madam.", "💡"),
      ],
      grammar: [
        g(`${lx.service.en} open ${lx.service.open}, price ${lx.priced.usdWord} dollar.`, `We open at ${lx.service.open}. It is ${lx.priced.usdWord} dollars.`, "Ôn tuần 3 và 4: 'at' trước giờ, 'It is' trước giá, và -s ở 'dollars'."),
        g("I no understand.", "Sorry, I do not understand.", "Phủ định cần trợ động từ: I DO NOT understand. Xin lỗi trước rồi nhờ khách nhắc lại."),
      ],
      speaking: [
        sp("Sorry, what time and how much?", `We open at ${lx.service.open}. It is ${lx.priced.usdWord} dollars.`, "Khi khách hỏi hai thông tin, trả lời tách thành hai câu ngắn — dễ nghe hơn một câu dài."),
      ],
      reading: read(
        `A guest asks about ${lx.service.en} and the ${lx.priced.en}. ${lx.staff} says: "We open at ${lx.service.open}, madam. The ${lx.priced.en} is ${lx.priced.usd} dollars."`,
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
            explanation: "Ở trình độ này, hai câu ngắn rõ ràng hơn một câu dài — khách cũng dễ nghe hơn.",
          },
        ],
      ),
      game: [
        game(
          `Sorry, I did not hear you.`,
          `Of course, sir. We open at ${lx.service.open}.`,
          `I say again no.`,
          `You no hear.`,
        ),
      ],
    }),

    lesson(lx, 6, 4, "The Full Service Chain", "Chuỗi phục vụ hoàn chỉnh", {
      vocabulary: [
        v("Enjoy", "/ɪnˈdʒɔɪ/", "Tận hưởng", "Enjoy your stay, sir.", "😊"),
        v("Anything else", "/ˈeniθɪŋ els/", "Còn gì nữa không ạ", "Anything else, madam?", "➕"),
      ],
      grammar: [
        g("You want more?", "Anything else, madam?", "Câu hỏi thêm nhu cầu chuẩn là 'Anything else?' — ngắn, lịch sự, dùng được mọi bộ phận."),
        g("Go enjoy.", "Enjoy your stay, sir.", "Câu chúc khi tiễn khách: 'Enjoy your stay' (khách đang lưu trú) hoặc 'Have a nice day'."),
      ],
      speaking: [
        sp(`Thank you. That is all.`, `Thank you, madam. Enjoy your stay.`, "Kết thúc luôn có ba phần: cảm ơn – lời chúc – nụ cười. Đây là ấn tượng cuối của khách."),
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
            explanation: "'Enjoy your stay' dành cho khách còn ở lại; 'Have a nice day' dùng khi khách ra ngoài.",
          },
        ],
      ),
      game: [game("No, that is all. Thank you.", "Thank you, sir. Enjoy your stay.", "OK finish.", "Nothing more no.")],
    }),
  ];
}

// ------------------------------------------------------------
// Week assembly + spaced-recycling word lists.
// ------------------------------------------------------------
const WEEK_META: Record<number, { en: string; vi: string; build: (lx: P0Lexicon) => LessonContent[] }> = {
  1: { en: "Alphabet, Names & Greetings", vi: "Bảng chữ cái, Đánh vần tên & Chào hỏi", build: week1 },
  2: { en: "Numbers, Rooms & Floors", vi: "Số đếm, Số phòng & Số tầng", build: week2 },
  3: { en: "Times, Dates & Opening Hours", vi: "Giờ, Ngày & Giờ mở cửa dịch vụ", build: week3 },
  4: { en: "Prices, Money & Quantities", vi: "Giá cả, Tiền tệ & Số lượng", build: week4 },
  5: { en: "Core Courtesy Phrases", vi: "Cụm câu lịch sự cốt lõi", build: week5 },
  6: { en: "Checkpoint — Survival Foundation", vi: "Kiểm tra tổng hợp — Nền tảng sống còn", build: week6 },
};

/** Headwords recycled into a week's quizzes, drawn from earlier weeks of
 *  the same department. Quota per the matrix: ≥3 items from week 2 on,
 *  and a heavy sweep at the week-6 checkpoint. */
function reviewWordsFor(lx: P0Lexicon, week: number): string[] | undefined {
  if (week === 1) return undefined;
  const earlier: string[] = [];
  for (let w = 1; w < week; w++) {
    for (const l of WEEK_META[w].build(lx)) {
      for (const item of l.vocabulary) earlier.push(item.word);
    }
  }
  // Checkpoint recycles broadly; ordinary weeks take a focused slice
  // from the two most recent weeks so recall stays fresh, not scattered.
  if (week === 6) return earlier;
  return earlier.slice(-6);
}

function buildWeek(lx: P0Lexicon, week: number): WeekContent {
  const meta = WEEK_META[week];
  return {
    departmentId: lx.code,
    weekNumber: week,
    weekTitleEn: meta.en,
    weekTitleVi: meta.vi,
    lessons: meta.build(lx),
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
    [1, 2, 3, 4, 5, 6].flatMap((w) => WEEK_META[w].build(lx).flatMap((l) => l.vocabulary.map((i) => i.word))),
  ]),
);
