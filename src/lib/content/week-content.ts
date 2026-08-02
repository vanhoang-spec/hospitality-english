// Authored week content, keyed by department + week per the 40-week
// matrix (docs/curriculum-level-matrix.md). Phase 0 (weeks 1-6, pre-A1)
// is composed in ./phase0.ts; the A2-B1 weeks below are hand-authored —
// concrete, courteous, modal-verb-led phrases for 4-5★ hotels in Vietnam.

import { PHASE0_WEEKS, PHASE0_WORDS_BY_DEP } from "./phase0";
import { buildPhase1, phase1WordsByDep } from "./phase1";
import { buildPhase2, phase2WordsByDep } from "./phase2";
import { buildPhase3, phase3WordsByDep, WEEK26_MEDIATION_TASKS } from "./phase3";
import { buildPhase4, WEEK33_WRITING_TASKS } from "./phase4";

/** Everything a department met in Phases 0-1, in teaching order — the
 *  long-spacing recycling pool Phase 2 draws on. */
const PRIOR_WORDS_BY_DEP: Record<string, string[]> = (() => {
  const p1 = phase1WordsByDep();
  const out: Record<string, string[]> = {};
  for (const code of Object.keys(PHASE0_WORDS_BY_DEP)) {
    out[code] = [...PHASE0_WORDS_BY_DEP[code], ...(p1[code] ?? [])];
  }
  return out;
})();

export type VocabItem = {
  word: string;
  phonetic: string;
  definition: string;
  context: string;
  icon?: string;
};
export type GrammarItem = { rude: string; polite: string; rule: string };
export type SpeakingItem = { guestPrompt: string; targetResponse: string; helpTip: string };
export type ReadingQuestion = {
  q: string;
  options: string[];
  correct: number;
  explanation?: string;
};
export type ReadingItem = { text: string; questions: ReadingQuestion[] };
export type ArcadeItem = { bad: string; good: string };
export type GameOption = { text: string; correct: boolean };
export type GameRound = { prompt: string; options: GameOption[] };

export type LessonContent = {
  lessonId: string;
  lessonOrder: number;
  titleEn: string;
  titleVi: string;
  vocabulary: VocabItem[];
  grammar: GrammarItem[];
  speaking: SpeakingItem[];
  reading: ReadingItem;
  /** Legacy field — no suite reads it (ArcadeSuite runs on `game`).
   *  Kept optional so existing weeks still typecheck; do not author new ones. */
  arcade?: ArcadeItem[];
  game: GameRound[];
};

/** One idea the learner's answer has to get across. Scoring accepts ANY of
 *  the listed English expressions (word-boundary, case-insensitive), so a
 *  learner who writes "we sincerely apologise" scores the same as one who
 *  writes "sorry" — paraphrase is the skill, not keyword recall.
 *
 *  `labelVi` is what the learner sees in the checklist. It is deliberately
 *  Vietnamese and deliberately does NOT contain the English target words:
 *  the first version of this feature printed the required keywords inside
 *  the task instructions, which turned the exercise into copy-the-answer. */
export type RequiredIdea = {
  labelVi: string;
  any: string[];
};

/** A guest's online review + the model 5-star written reply — the writing
 *  production skill the app had none of before P2. */
export type WritingTask = {
  reviewMeta: string;
  reviewText: string;
  promptVi: string;
  mustConvey: RequiredIdea[];
  modelReply: string;
  explanationVi: string;
};

/** A Vietnamese colleague's note that the learner must relay to an
 *  English-speaking guest — the mediation skill (interpreting between a
 *  guest and a Vietnamese-speaking colleague) named by the audit as the
 *  most common real B1 task in a VN hotel and absent from all 40 weeks. */
export type MediationTask = {
  colleagueNoteVi: string;
  promptVi: string;
  mustConvey: RequiredIdea[];
  modelAnswer: string;
  explanationVi: string;
};

export type WeekContent = {
  departmentId: string;
  weekNumber: number;
  weekTitleEn: string;
  weekTitleVi: string;
  lessons: LessonContent[];
  /** Vocabulary headwords from earlier weeks to interleave into this
   *  week's quizzes/cloze for spaced recycling (P5 content standard). */
  reviewWords?: string[];
  /** Present only on the one week per phase that carries it (P2 content
   *  standard) — see phase3.ts week 26 / phase4.ts week 33. */
  writing?: WritingTask;
  mediation?: MediationTask;
};

export const FO_WEEK_17: WeekContent = {
  departmentId: "FO",
  weekNumber: 17,
  weekTitleEn: "Standard Check-in & OTA Booking Verification",
  weekTitleVi: "Quy trình Đón tiếp & Check-in Khách Lẻ",
  // Pulled forward from Phases 0-1 so this week joins the spaced-recycling
  // system instead of standing outside it.
  reviewWords: [
    "Passport",
    "Form",
    "Room",
    "Signature",
    "Check in",
    "Receipt",
    "Register",
    "Luggage",
  ],
  lessons: [
    {
      lessonId: "FO_17_1",
      lessonOrder: 1,
      titleEn: "Greeting & PMS Verification",
      titleVi: "Chào đón & Kiểm tra hệ thống",
      vocabulary: [
        {
          word: "Welcome",
          phonetic: "/ˈwelkəm/",
          definition: "Chào đón",
          context: "Welcome to our hotel, sir.",
          icon: "🙏",
        },
        {
          word: "Reservation",
          phonetic: "/ˌrezəˈveɪʃən/",
          definition: "Sự đặt phòng trước",
          context: "Do you have a reservation with us?",
          icon: "📅",
        },
        {
          word: "Booking reference",
          phonetic: "/ˈbʊkɪŋ ˈrefərəns/",
          definition: "Mã số đặt phòng",
          context: "May I have your booking reference number?",
          icon: "🔖",
        },
        {
          word: "Registration card",
          phonetic: "/ˌredʒɪˈstreɪʃən kɑːd/",
          definition: "Phiếu đăng ký lưu trú",
          context: "Could you please sign the registration card for me?",
          icon: "📝",
        },
      ],
      grammar: [
        {
          rude: "Give me your name.",
          polite: "May I have your name, please?",
          rule: "Xin thông tin của khách bằng 'May I have…?' — lịch sự hơn hẳn câu mệnh lệnh.",
        },
        {
          rude: "What is your booking number?",
          polite: "Could you please share your booking reference?",
          rule: "Câu hỏi mang tính nghiệp vụ mở đầu bằng 'Could you please…?'.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Hello, I have a booking under the name of David Green.",
          targetResponse:
            "Good morning, sir. Welcome to our hotel. Let me check our system for your name, please.",
          helpTip: "Remember to pronounce the ending sound in 'good morning' and 'welcome'.",
        },
      ],
      reading: {
        text: "AGODA CONFIRMATION VOUCHER\nGuest Name: David Green\nRoom Type: Deluxe Ocean View\nStay: 2 Nights\nStatus: Confirmed / Paid Online",
        questions: [
          {
            q: "Khách đã thanh toán phòng bằng cách nào?",
            options: ["A. Paid online via Agoda", "B. Pay later at front desk", "C. Cash"],
            correct: 0,
          },
          {
            q: "David Green đã đặt loại phòng nào?",
            options: ["A. Standard Room", "B. Superior City View", "C. Deluxe Ocean View"],
            correct: 2,
          },
        ],
      },
      arcade: [
        {
          bad: "Tell me your booking code.",
          good: "Could you provide your booking reference, please?",
        },
        { bad: "Sit there.", good: "Please take a seat in the lobby." },
      ],
      game: [
        {
          prompt: "Good evening. I have a reservation for tonight.",
          options: [
            { text: "May I have your name, please?", correct: true },
            { text: "Give me your name.", correct: false },
            { text: "Who are you?", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_17_2",
      lessonOrder: 2,
      titleEn: "Passport & Registration SOP",
      titleVi: "Mượn hộ chiếu & Đăng ký lưu trú",
      vocabulary: [
        {
          word: "Passport",
          phonetic: "/ˈpæspɔːt/",
          definition: "Hộ chiếu",
          context: "May I have your passport, please?",
          icon: "📘",
        },
        {
          word: "Local registration",
          phonetic: "/ˈləʊkəl ˌredʒɪˈstreɪʃən/",
          definition: "Đăng ký lưu trú địa phương",
          context: "We need your passport for local registration.",
          icon: "📝",
        },
        {
          word: "Mandatory",
          phonetic: "/ˈmændətɔːri/",
          definition: "Bắt buộc theo quy định",
          context: "This registration is mandatory by law.",
          icon: "⚖️",
        },
        {
          word: "Keep briefly",
          phonetic: "/kiːp ˈbriːfli/",
          definition: "Giữ lại trong thời gian ngắn",
          context: "I will keep your passport briefly to scan it.",
          icon: "⏱️",
        },
      ],
      grammar: [
        {
          rude: "Give passport.",
          polite: "Could you provide your passport, please?",
          rule: "Làm mềm lời đề nghị bằng 'Could you…, please?'. Một từ làm mềm là đủ — 'please kindly' nghe không tự nhiên.",
        },
        {
          rude: "I take this.",
          polite: "May I hold your passport for a moment?",
          rule: "Xin phép giữ tạm thứ gì đó bằng 'May I hold…?'.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Sure, here is my passport. Do you need to keep it?",
          targetResponse:
            "Thank you, sir. I just need to keep it briefly for our local registration process.",
          helpTip: "Focus on the linked sound in 'keep it briefly'.",
        },
      ],
      reading: {
        text: "HOTEL SOP - LOCAL REGISTRATION:\nAll international guests must show their original passport at check-in. The receptionist must scan the identity page and upload it to the local immigration portal before 11:00 PM.",
        questions: [
          {
            q: "Khách quốc tế phải xuất trình giấy tờ gì khi nhận phòng?",
            options: ["A. Credit card", "B. Original passport", "C. Flight ticket"],
            correct: 1,
          },
          {
            q: "Lễ tân phải tải bản scan hộ chiếu lên khi nào?",
            options: ["A. Next morning", "B. Before 11:00 PM", "C. After check-out"],
            correct: 1,
          },
        ],
      },
      arcade: [
        { bad: "Give passport now.", good: "May I have your passport for registration, please?" },
        { bad: "Sign name here.", good: "Could you please sign your name here?" },
      ],
      game: [
        {
          prompt: "Will you be holding on to my passport for long?",
          options: [
            { text: "I just need to keep it briefly for local registration, sir.", correct: true },
            { text: "Give passport now.", correct: false },
            { text: "Yes, I take this.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_17_3",
      lessonOrder: 3,
      titleEn: "Pre-authorization Process",
      titleVi: "Quy trình quẹt thẻ đặt cọc",
      vocabulary: [
        {
          word: "Pre-authorization",
          phonetic: "/ˌpriːˌɔːθəraɪˈzeɪʃən/",
          definition: "Khoảng tạm giữ/Đặt cọc thẻ",
          context: "We require a credit card pre-authorization.",
          icon: "💳",
        },
        {
          word: "Incidental charges",
          phonetic: "/ˌɪnsɪˈdentl ˈtʃɑːdʒɪz/",
          definition: "Chi phí phát sinh (minibar, v.v.)",
          context: "The deposit is for any incidental charges.",
          icon: "🧾",
        },
        {
          word: "Deposit",
          phonetic: "/dɪˈpɒzɪt/",
          definition: "Tiền đặt cọc",
          context: "The security deposit is completely refundable.",
          icon: "💰",
        },
        {
          word: "Refund",
          phonetic: "/ˈriːfʌnd/",
          definition: "Hoàn tiền lại",
          context: "We will refund the amount at check-out.",
          icon: "💵",
        },
      ],
      grammar: [
        {
          rude: "Give me your credit card.",
          polite: "May I secure a pre-authorization on your credit card?",
          rule: "Dùng 'May I secure…?' thay vì đòi thẻ của khách.",
        },
        {
          rude: "You must pay for minibar.",
          polite: "This deposit is for incidental charges like the minibar.",
          rule: "Giải thích quy định nhẹ nhàng bằng 'This is for…'.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Why do you need my credit card if the room is already paid?",
          targetResponse:
            "I understand, madam. This is just a temporary deposit for any incidental charges during your stay.",
          helpTip: "Pronounce 'incidental charges' clearly by breaking it down: in-ci-den-tal.",
        },
      ],
      reading: {
        text: "INCIDENTAL POLICY:\nA security deposit of 1,000,000 VND per night is required at check-in. This amount will be released automatically at check-out if there are no mini-bar or laundry uses.",
        questions: [
          {
            q: "Tiền đặt cọc được hoàn khi nào?",
            options: ["A. At check-out time", "B. Two weeks later", "C. At dinner time"],
            correct: 0,
          },
          {
            q: "Tiền đặt cọc mỗi đêm là bao nhiêu?",
            options: ["A. 500,000 VND", "B. 1,000,000 VND", "C. 2,000,000 VND"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Give me card for money.",
          good: "May I have your credit card for the deposit, please?",
        },
        {
          bad: "Minibar is not free.",
          good: "The deposit covers incidental charges like the minibar.",
        },
      ],
      game: [
        {
          prompt: "What is this extra hold on my card for?",
          options: [
            {
              text: "This is just a temporary deposit for incidental charges, madam.",
              correct: true,
            },
            { text: "Minibar is not free.", correct: false },
            { text: "Give me card for money.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_17_4",
      lessonOrder: 4,
      titleEn: "Amenities & Key Delivery",
      titleVi: "Giao chìa khóa & Giới thiệu tiện ích",
      vocabulary: [
        {
          word: "Room key",
          phonetic: "/ruːm kiː/",
          definition: "Chìa khóa phòng",
          context: "Here is your electronic room keycard.",
          icon: "🔑",
        },
        {
          word: "Elevator",
          phonetic: "/ˈelɪveɪtə/",
          definition: "Thang máy",
          context: "The elevators are just behind you on the left.",
          icon: "🛗",
        },
        {
          word: "Breakfast buffet",
          phonetic: "/ˈbrekfəst ˈbʊfeɪ/",
          definition: "Buffet ăn sáng",
          context: "Our breakfast buffet is on the first floor.",
          icon: "🍽️",
        },
        {
          word: "ETA",
          phonetic: "/iː tiː eɪ/",
          definition: "Giờ dự kiến đến (estimated time of arrival)",
          context: "Could you tell me your ETA so we can prepare your room?",
          icon: "🕐",
        },
      ],
      grammar: [
        {
          rude: "Go to first floor for food.",
          polite: "Breakfast is served at the main restaurant on the first floor.",
          rule: "Câu bị động kiểu 'Breakfast is served…' nghe chuyên nghiệp hơn.",
        },
        {
          rude: "Pool closes at 9.",
          polite: "The swimming pool is open until 9:00 PM.",
          rule: "Nói giờ hoạt động bằng 'is open until…'.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Thank you. What time is breakfast served tomorrow morning?",
          targetResponse:
            "Our complimentary breakfast buffet is served from 6:30 AM until 10:00 AM, sir.",
          helpTip: "Ensure a clear 't' sound at the end of 'breakfast' and 's' sound in 'served'.",
        },
      ],
      reading: {
        text: "WELCOME TO THE RESORT:\n- Your room is 512 (5th Floor). Use your keycard in the elevator.\n- Breakfast Buffet: Lotus Restaurant (1st Floor) | 06:30 - 10:00.\n- Fitness Center & Infinity Pool: Rooftop | 06:00 - 21:00.",
        questions: [
          {
            q: "Hồ bơi nằm ở đâu?",
            options: ["A. First floor", "B. On the rooftop", "C. Room 512"],
            correct: 1,
          },
          {
            q: "Buffet sáng miễn phí đóng lúc mấy giờ?",
            options: ["A. 9:00 AM", "B. 10:00 AM", "C. 11:00 AM"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Eat breakfast from 6 to 10.",
          good: "Breakfast is available from 6:30 AM until 10:00 AM.",
        },
        { bad: "Take key and go.", good: "Here is your keycard, your room is on the fifth floor." },
      ],
      game: [
        {
          prompt: "We have an early flight. When does breakfast open?",
          options: [
            {
              text: "Our complimentary breakfast buffet is served from 6:30 AM until 10:00 AM, sir.",
              correct: true,
            },
            { text: "Go to first floor and eat from 6 to 10.", correct: false },
            { text: "Restaurant is over there, go eat.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const FB_WEEK_15: WeekContent = {
  departmentId: "FB",
  weekNumber: 15,
  weekTitleEn: "Breakfast Buffet Welcoming & Station Mapping",
  weekTitleVi: "Điều Phối & Đón Tiếp Tại Nhà Hàng Buffet Sáng",
  reviewWords: ["Menu", "Table", "Serve", "Plate", "Fresh", "Booking", "Dining room", "Glass"],
  lessons: [
    {
      lessonId: "FB_15_1",
      lessonOrder: 1,
      titleEn: "Greeting & Breakfast Voucher Verification",
      titleVi: "Chào đón & Kiểm tra Phiếu ăn sáng",
      vocabulary: [
        {
          word: "Entrance",
          phonetic: "/ˈentrəns/",
          definition: "Lối vào",
          context: "Please wait for me at the restaurant entrance.",
          icon: "🚪",
        },
        {
          word: "Breakfast voucher",
          phonetic: "/ˈbrekfəst ˈvaʊtʃə/",
          definition: "Phiếu ăn sáng",
          context: "Could I see your breakfast voucher, please?",
          icon: "🎫",
        },
        {
          word: "In-house guest",
          phonetic: "/ɪn haʊs ɡest/",
          definition: "Khách đang lưu trú tại khách sạn",
          context: "All in-house guests receive complimentary breakfast.",
          icon: "🏨",
        },
        {
          word: "Verify",
          phonetic: "/ˈverɪfaɪ/",
          definition: "Xác minh, kiểm tra",
          context: "I need to verify your room number on our list.",
          icon: "🔍",
        },
      ],
      grammar: [
        {
          rude: "What's your room number?",
          polite: "May I ask for your room number, please?",
          rule: "Hỏi xin thông tin nhẹ nhàng bằng động từ khuyết thiếu: 'May I ask for…?'.",
        },
        {
          rude: "You're not on the list.",
          polite:
            "I'm sorry, I can't find your name on the list just yet. Could you give me a moment?",
          rule: "Báo tin không vui: xin lỗi trước, rồi rào bằng 'just yet'.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Good morning. We're staying in room 512, is breakfast included?",
          targetResponse:
            "Good morning, and welcome. Yes, of course. May I just check your room number on our list, please?",
          helpTip: "Link 'check your' smoothly so it sounds like one word: 'che-kyer'.",
        },
      ],
      reading: {
        text: "IN-HOUSE GUEST LIST - BREAKFAST\nRoom 512 - Mr. David Green - 2 Adults - B&B Included\nRoom 608 - Ms. Lisa Tran - 1 Adult - Room Only (No Breakfast)\nRestaurant Hours: 06:30 - 10:00",
        questions: [
          {
            q: "Khách nào KHÔNG được kèm bữa sáng?",
            options: [
              "A. Mr. David Green in Room 512",
              "B. Ms. Lisa Tran in Room 608",
              "C. Both guests",
            ],
            correct: 1,
          },
          {
            q: "'B&B' nghĩa là gì với khách phòng 512?",
            options: [
              "A. Bed and Breakfast included",
              "B. Bed only, no meals",
              "C. Breakfast paid separately",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        { bad: "Room number?", good: "May I have your room number, please?" },
        {
          bad: "You're not on my list.",
          good: "I'm sorry, I can't find your name yet — could you give me one moment?",
        },
      ],
      game: [
        {
          prompt: "Hi, we would like breakfast. We are in room 306.",
          options: [
            {
              text: "Good morning, and welcome. May I just check your room number on our list, please?",
              correct: true,
            },
            { text: "Room number?", correct: false },
            { text: "Yes, go sit down.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FB_15_2",
      lessonOrder: 2,
      titleEn: "Queue Management at Peak Hours",
      titleVi: "Quản lý Hàng đợi Giờ cao điểm",
      vocabulary: [
        {
          word: "Queue",
          phonetic: "/kjuː/",
          definition: "Hàng đợi, xếp hàng",
          context: "There is a short queue near the entrance this morning.",
          icon: "🧍",
        },
        {
          word: "Peak hours",
          phonetic: "/piːk ˈaʊəz/",
          definition: "Giờ cao điểm",
          context: "Breakfast is busiest during peak hours, from 8 to 9:30.",
          icon: "⏰",
        },
        {
          word: "Available",
          phonetic: "/əˈveɪləbəl/",
          definition: "Còn trống, sẵn sàng sử dụng",
          context: "A window table will be available very soon.",
          icon: "✅",
        },
        {
          word: "Shortly",
          phonetic: "/ˈʃɔːtli/",
          definition: "Trong chốc lát, sớm thôi",
          context: "Your table will be ready shortly, sir.",
          icon: "⏱️",
        },
      ],
      grammar: [
        {
          rude: "Wait there.",
          polite: "Would you mind waiting here for just a moment, sir?",
          rule: "'Would you mind…?' biến câu mệnh lệnh thành lời đề nghị gián tiếp, lịch sự.",
        },
        {
          rude: "Table's not ready.",
          polite: "Your table is being prepared now. It will take a few minutes.",
          rule: "Bị động ('is being prepared') nghe chuyên nghiệp và không quy lỗi cho ai.",
        },
      ],
      speaking: [
        {
          guestPrompt: "There are no tables free right now. How long do we have to wait?",
          targetResponse:
            "I'm sorry for the wait, sir. Would you mind waiting here for just five minutes? A table will be free very soon.",
          helpTip:
            "Say 'sorry' gently and keep your tone calm and unhurried, not apologetic in a worried way.",
        },
      ],
      reading: {
        text: "STAFF MEMO - PEAK HOUR SEATING\nBetween 8:00 - 9:30 AM, all tables are usually full.\nStaff must offer a waiting area near the entrance and inform guests of the approximate waiting time.\nDo not let guests stand near the buffet line.",
        questions: [
          {
            q: "Khung giờ nào nhà hàng thường kín bàn?",
            options: ["A. 6:00 - 7:00 AM", "B. 8:00 - 9:30 AM", "C. 10:00 - 11:00 AM"],
            correct: 1,
          },
          {
            q: "Nên mời khách đang chờ sang đâu?",
            options: [
              "A. Near the buffet line",
              "B. To another restaurant",
              "C. To the waiting area near the entrance",
            ],
            correct: 2,
          },
        ],
      },
      arcade: [
        {
          bad: "No table. Wait.",
          good: "I'm sorry, all tables are full right now. Would you mind waiting a few minutes?",
        },
        { bad: "Stand there.", good: "Please wait in this area, a table will be ready shortly." },
      ],
      game: [
        {
          prompt: "Everything looks full. Should we come back later?",
          options: [
            {
              text: "I'm sorry for the wait, sir. Would you mind waiting here for just five minutes?",
              correct: true,
            },
            { text: "No table. Wait.", correct: false },
            { text: "I don't know, just stand there.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FB_15_3",
      lessonOrder: 3,
      titleEn: "Escorting Guests & Station Mapping",
      titleVi: "Dẫn khách & Giới thiệu Sơ đồ Buffet",
      vocabulary: [
        {
          word: "Escort",
          phonetic: "/ɪˈskɔːt/",
          definition: "Dẫn, hộ tống khách",
          context: "Let me escort you to your table, please follow me.",
          icon: "🚶",
        },
        {
          word: "Live station",
          phonetic: "/laɪv ˈsteɪʃən/",
          definition: "Quầy chế biến món nóng trực tiếp",
          context: "Our live station serves hot Phở and eggs every morning.",
          icon: "🍳",
        },
        {
          word: "Bakery corner",
          phonetic: "/ˈbeɪkəri ˈkɔːnə/",
          definition: "Khu vực quầy bánh mì",
          context: "You will find fresh croissants at the bakery corner.",
          icon: "🥐",
        },
        {
          word: "Juice area",
          phonetic: "/dʒuːs ˈeriə/",
          definition: "Khu vực nước trái cây",
          context: "The juice area is right next to the coffee machines.",
          icon: "🧃",
        },
      ],
      grammar: [
        {
          rude: "Go get food there.",
          polite: "Let me show you where the hot food station is.",
          rule: "'Let me…' là lời mời giúp đỡ, không phải ra lệnh.",
        },
        {
          rude: "Coffee's over there.",
          polite: "You'll find the coffee and juice station just next to the bakery corner.",
          rule: "'You'll find…' hướng dẫn khách nhẹ nhàng, thay vì chỉ trỏ hay ra lệnh.",
        },
      ],
      speaking: [
        {
          guestPrompt: "This is our first time here — where can we find something hot to eat?",
          targetResponse:
            "Let me show you. Our live station serves hot Phở and eggs. The bakery corner is next to it.",
          helpTip: "Practice linking 'show' and 'you' so they blend smoothly into 'show-you'.",
        },
      ],
      reading: {
        text: "BREAKFAST STATION MAP\nLive Station: Phở & Made-to-Order Eggs (Center)\nBakery Corner: Bread, Croissants, Jam (Left Wall)\nJuice & Beverage Area: Fresh Juice, Coffee, Tea (Near Windows)",
        questions: [
          {
            q: "Quầy bánh nằm ở đâu?",
            options: ["A. Center", "B. Left wall", "C. Near the windows"],
            correct: 1,
          },
          {
            q: "Khách gọi được món gì ở quầy chế biến tại chỗ?",
            options: ["A. Only bread and jam", "B. Only coffee", "C. Phở and made-to-order eggs"],
            correct: 2,
          },
        ],
      },
      arcade: [
        { bad: "Food is over there.", good: "Let me show you where the hot food station is." },
        {
          bad: "Coffee, that way.",
          good: "You'll find the coffee and juice area just next to the bakery corner.",
        },
      ],
      game: [
        {
          prompt: "We cannot find the hot food. Could you point us there?",
          options: [
            {
              text: "Let me show you. Our live station serves hot Phở and eggs. The bakery corner is next to it.",
              correct: true,
            },
            { text: "Food is over there.", correct: false },
            { text: "I don't know, look around.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FB_15_4",
      lessonOrder: 4,
      titleEn: "Table Clearing & Satisfaction Check",
      titleVi: "Dọn bàn & Hỏi thăm Mức độ hài lòng",
      vocabulary: [
        {
          word: "Clear",
          phonetic: "/klɪə/",
          definition: "Dọn (đĩa, bàn)",
          context: "May I clear this plate for you, madam?",
          icon: "🍽️",
        },
        {
          word: "Empty plate",
          phonetic: "/ˈempti pleɪt/",
          definition: "Đĩa đã dùng xong, trống",
          context: "I can see an empty plate, shall I take it away?",
          icon: "🍴",
        },
        {
          word: "Enjoy",
          phonetic: "/ɪnˈdʒɔɪ/",
          definition: "Thưởng thức, hài lòng",
          context: "I hope you are enjoying your breakfast.",
          icon: "😊",
        },
        {
          word: "Satisfied",
          phonetic: "/ˈsætɪsfaɪd/",
          definition: "Hài lòng",
          context: "We always want our guests to feel fully satisfied.",
          icon: "👍",
        },
      ],
      grammar: [
        {
          rude: "Give me your plate.",
          polite: "Would you like me to clear your plate for you?",
          rule: "'Would you like me to…?' mời phục vụ mà không gây phiền.",
        },
        {
          rude: "Is food ok?",
          polite: "I hope you're enjoying your breakfast so far, is everything to your liking?",
          rule: "'I hope…' kèm câu hỏi đuôi ấm áp để hỏi khách có hài lòng không.",
        },
      ],
      speaking: [
        {
          guestPrompt: "We're all finished, thank you. The food was lovely.",
          targetResponse:
            "I'm so glad to hear that. Would you like me to clear your plates for you?",
          helpTip:
            "Smile while saying 'glad to hear that' — it naturally lifts your pitch and sounds sincere.",
        },
      ],
      reading: {
        text: "TABLE SERVICE SOP - CLEARING\nAlways ask for permission before clearing any plate.\nNever clear a plate while a guest is still using cutlery on it.\nAsk 'Is everything to your liking?' at least once during the meal.",
        questions: [
          {
            q: "Khi nào nhân viên KHÔNG được dọn đĩa?",
            options: [
              "A. When it is empty",
              "B. While the guest is still using cutlery on it",
              "C. After the guest leaves",
            ],
            correct: 1,
          },
          {
            q: "Trong bữa ăn, nhân viên nên hỏi câu gì?",
            options: [
              "A. 'Is everything to your liking?'",
              "B. 'Are you finished?'",
              "C. 'How much did you eat?'",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        { bad: "Finished? Give plate.", good: "Would you like me to clear your plate for you?" },
        {
          bad: "Food good?",
          good: "I hope you're enjoying your breakfast, is everything to your liking?",
        },
      ],
      game: [
        {
          prompt: "That was delicious, thank you. We are done now.",
          options: [
            {
              text: "I'm so glad to hear that. Would you like me to clear your plates for you?",
              correct: true,
            },
            { text: "Finished? Give plate.", correct: false },
            { text: "Okay, bye.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const HK_WEEK_15: WeekContent = {
  departmentId: "HK",
  weekNumber: 15,
  weekTitleEn: "Room Service Requests & Extra Amenities",
  weekTitleVi: "Quy Trình Giao Tiếp Phòng Khách & Phục Vụ Tiện Ích",
  reviewWords: [
    "Towel",
    "Soap",
    "Pillow",
    "Clean",
    "Guest room",
    "Request",
    "In five minutes",
    "Make the bed",
  ],
  lessons: [
    {
      lessonId: "HK_15_1",
      lessonOrder: 1,
      titleEn: "Knock & Announce SOP",
      titleVi: "Quy trình Gõ cửa & Thông báo",
      vocabulary: [
        {
          word: "Housekeeping",
          phonetic: "/ˈhaʊsˌkiːpɪŋ/",
          definition: "Bộ phận Buồng phòng",
          context: "Housekeeping! Good morning!",
          icon: "🧹",
        },
        {
          word: "Knock",
          phonetic: "/nɒk/",
          definition: "Gõ cửa",
          context: "Please knock twice before entering the room.",
          icon: "👊",
        },
        {
          word: "Occupied",
          phonetic: "/ˈɒkjʊpaɪd/",
          definition: "Đang có khách ở (phòng)",
          context: "The status shows this room is occupied.",
          icon: "🚪",
        },
        {
          word: "Announce",
          phonetic: "/əˈnaʊns/",
          definition: "Thông báo danh tính",
          context: "Always announce yourself before entering.",
          icon: "📢",
        },
      ],
      grammar: [
        {
          rude: "Housekeeping, open the door.",
          polite: "Housekeeping! May I come in to service the room?",
          rule: "Xin phép vào phòng bằng 'May I come in…?', không nói trống không.",
        },
        {
          rude: "I'm coming in now.",
          polite: "Would it be convenient for me to clean the room now?",
          rule: "Hỏi giờ giấc lịch sự bằng 'Would it be convenient…?'.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Oh, sorry, I'm still in the room. Can you come back later?",
          targetResponse:
            "Of course, madam. I'm sorry to disturb you. I will come back later. Thank you.",
          helpTip:
            "Link the words smoothly in 'sorry to disturb' — soften the 't' sound into the next word.",
        },
      ],
      reading: {
        text: "HOUSEKEEPING SOP - KNOCK AND ANNOUNCE:\n1. Knock on the door twice and say 'Housekeeping' in a clear voice.\n2. Wait at least 10 seconds for a response.\n3. If there is no answer, knock and announce a second time before entering.\n4. If a guest answers, greet them and politely ask permission to clean the room.",
        questions: [
          {
            q: "Khi gõ cửa, nhân viên phải nói gì?",
            options: ["A. Room service", "B. Housekeeping", "C. Reception"],
            correct: 1,
          },
          {
            q: "Sau khi gõ cửa, phải chờ phản hồi bao lâu?",
            options: ["A. At least 10 seconds", "B. 1 minute", "C. No need to wait"],
            correct: 0,
          },
        ],
      },
      arcade: [
        { bad: "Housekeeping, open up.", good: "Housekeeping! May I come in to clean your room?" },
        { bad: "I'm coming in.", good: "Excuse me, is now a good time to service the room?" },
      ],
      game: [
        {
          prompt: "Hello? I am just getting dressed. Could you wait?",
          options: [
            {
              text: "Of course, madam. I'm sorry to disturb you. I will come back later.",
              correct: true,
            },
            { text: "No problem, I will just clean quickly now.", correct: false },
            { text: "You should have put the DND sign up.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "HK_15_2",
      lessonOrder: 2,
      titleEn: "Amenities Requests",
      titleVi: "Xử lý Yêu cầu Tiện ích",
      vocabulary: [
        {
          word: "Amenities",
          phonetic: "/əˈmiːnətiz/",
          definition: "Vật dụng tiện nghi",
          context: "We are happy to provide extra amenities.",
          icon: "🧴",
        },
        {
          word: "Bath towel",
          phonetic: "/bɑːθ ˈtaʊəl/",
          definition: "Khăn tắm",
          context: "Could I get an extra bath towel, please?",
          icon: "🛁",
        },
        {
          word: "Razor",
          phonetic: "/ˈreɪzə/",
          definition: "Dao cạo râu",
          context: "I can bring a disposable razor to your room shortly.",
          icon: "🪒",
        },
        {
          word: "Complimentary",
          phonetic: "/ˌkɒmplɪˈmentəri/",
          definition: "Miễn phí (dịch vụ đi kèm)",
          context: "Bottled water is complimentary in every room.",
          icon: "💧",
        },
      ],
      grammar: [
        {
          rude: "What do you want?",
          polite: "How may I assist you today?",
          rule: "Câu hỏi mở lịch sự 'How may I…?' thay cho câu cộc lốc.",
        },
        {
          rude: "Wait there.",
          polite: "I will bring that up to your room right away.",
          rule: "'will' kèm mốc thời gian cụ thể làm khách yên tâm, thay vì ra lệnh.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Hi, could I get two more bath towels and a razor sent up to room 812?",
          targetResponse:
            "Certainly, sir. I will send two extra towels and a razor. They will arrive right away.",
          helpTip:
            "Practice linking 'send up' smoothly — connect the 'd' straight into the 'u' sound.",
        },
      ],
      reading: {
        text: "HOUSEKEEPING AMENITIES REQUEST FORM\nRoom: 812\nItems Requested: 2x Bath Towel, 1x Razor\nRequested Time: 3:15 PM\nDelivery Deadline: Within 15 minutes\nNote: Bottled water is complimentary, no charge to guest.",
        questions: [
          {
            q: "Khách phòng 812 xin mấy chiếc khăn tắm?",
            options: ["A. One", "B. Two", "C. Three"],
            correct: 1,
          },
          {
            q: "Yêu cầu đồ dùng phải giao trong bao lâu?",
            options: ["A. Within 15 minutes", "B. Within 1 hour", "C. Next morning"],
            correct: 0,
          },
        ],
      },
      arcade: [
        { bad: "What do you want?", good: "How may I assist you today?" },
        { bad: "Wait there, I'm busy.", good: "I will bring that to your room right away." },
      ],
      game: [
        {
          prompt: "Could you send up some towels and a razor, please?",
          options: [
            {
              text: "Certainly, sir. I will send two extra towels and a razor. They will arrive right away.",
              correct: true,
            },
            { text: "What do you want them for?", correct: false },
            { text: "Wait there, I'm busy right now.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "HK_15_3",
      lessonOrder: 3,
      titleEn: "Rollaway Beds & Equipment Loans",
      titleVi: "Giường phụ & Cho mượn Thiết bị",
      vocabulary: [
        {
          word: "Rollaway bed",
          phonetic: "/ˈrəʊləweɪ bed/",
          definition: "Giường phụ có bánh xe",
          context: "We can set up a rollaway bed for an extra guest.",
          icon: "🛏️",
        },
        {
          word: "Adapter",
          phonetic: "/əˈdæptə/",
          definition: "Bộ chuyển đổi ổ cắm",
          context: "I can lend you a universal adapter for your device.",
          icon: "🔌",
        },
        {
          word: "Iron",
          phonetic: "/ˈaɪən/",
          definition: "Bàn là (ủi đồ)",
          context: "Would you like to borrow an iron and ironing board?",
          icon: "👔",
        },
        {
          word: "Extra charge",
          phonetic: "/ˈekstrə tʃɑːdʒ/",
          definition: "Phụ phí",
          context: "Please note the rollaway bed has an extra charge per night.",
          icon: "💲",
        },
      ],
      grammar: [
        {
          rude: "You want a bed or not?",
          polite: "Would you like us to set up a rollaway bed for you?",
          rule: "Mời dùng dịch vụ lịch sự bằng 'Would you like us to…?'.",
        },
        {
          rude: "That costs more money.",
          polite: "Please note there is a small extra charge for this service.",
          rule: "Làm mềm tin không vui bằng 'Please note…' thay vì nói thẳng tuột.",
        },
      ],
      speaking: [
        {
          guestPrompt: "My son is joining us tonight. Do you have an extra bed we could use?",
          targetResponse:
            "Certainly, sir. We can set up a rollaway bed in your room. Please note there is a small extra charge per night.",
          helpTip:
            "Stress the word 'certainly' at the start of your reply to sound warm and confident.",
        },
      ],
      reading: {
        text: "IN-ROOM SERVICE MENU:\nRollaway Bed: 300,000 VND / night (please request 2 hours in advance)\nUniversal Adapter: Complimentary, subject to availability\nIron & Ironing Board: Complimentary, delivered within 20 minutes",
        questions: [
          {
            q: "Giường phụ giá bao nhiêu một đêm?",
            options: ["A. Free", "B. 300,000 VND", "C. 500,000 VND"],
            correct: 1,
          },
          {
            q: "Khách cần báo trước bao lâu để xin giường phụ?",
            options: ["A. 2 hours", "B. 1 day", "C. No need to request"],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "You want a bed or not?",
          good: "Would you like us to set up a rollaway bed for you?",
        },
        {
          bad: "That costs more money.",
          good: "Please note there is a small extra charge for this service.",
        },
      ],
      game: [
        {
          prompt: "My nephew arrives tonight. Can we add another bed?",
          options: [
            {
              text: "Certainly, sir. We can set up a rollaway bed in your room, with a small extra charge per night.",
              correct: true,
            },
            { text: "You want a bed or not?", correct: false },
            { text: "We don't have extra beds.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "HK_15_4",
      lessonOrder: 4,
      titleEn: "Handling Do Not Disturb Rooms",
      titleVi: "Xử lý Phòng treo biển DND",
      vocabulary: [
        {
          word: "Do Not Disturb",
          phonetic: "/duː nɒt dɪˈstɜːb/",
          definition: 'Biển "Xin đừng làm phiền"',
          context: "The sign on the door says Do Not Disturb.",
          icon: "🚫",
        },
        {
          word: "Courtesy call",
          phonetic: "/ˈkɜːtəsi kɔːl/",
          definition: "Cuộc gọi nhắc nhở lịch sự",
          context: "We will make a courtesy call before checkout time.",
          icon: "☎️",
        },
        {
          word: "Voicemail",
          phonetic: "/ˈvɔɪsmeɪl/",
          definition: "Hộp thư thoại",
          context: "I will leave a voicemail if the guest doesn't answer.",
          icon: "📥",
        },
        {
          word: "Slip under the door",
          phonetic: "/slɪp ˈʌndə ðə dɔː/",
          definition: "Nhét đồ/giấy qua khe cửa",
          context: "I will slip a note under the door instead.",
          icon: "✉️",
        },
      ],
      grammar: [
        {
          rude: "Wake up, we need to clean.",
          polite: "I'm sorry to disturb you. Could I check if you need housekeeping later?",
          rule: "Xin lỗi trước bằng 'I'm sorry to disturb you, but…' rồi mới nêu đề nghị.",
        },
        {
          rude: "You have to open the door now.",
          polite: "Whenever it's convenient, please let us know. When may we service the room?",
          rule: "'Whenever it's convenient…' để khách tự chọn thời điểm.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Hello? Yes, this is room 1005, sorry, I forgot to remove the sign.",
          targetResponse:
            "Not at all, sir. Would now be a good time to clean? Or shall we come back later?",
          helpTip:
            "Let your tone rise gently on 'later' so it sounds like a genuine question, not a command.",
        },
      ],
      reading: {
        text: "DND HANDLING PROCEDURE:\n- If a room shows Do Not Disturb past 2:00 PM, call the room to check on the guest.\n- If there is no answer, leave a polite voicemail and slip a courtesy note under the door.\n- Never remove the DND sign or enter without guest confirmation.",
        questions: [
          {
            q: "Mấy giờ thì gọi vào phòng treo DND để hỏi thăm khách?",
            options: ["A. Past 2:00 PM", "B. Past 6:00 PM", "C. Immediately in the morning"],
            correct: 0,
          },
          {
            q: "Nếu gọi điện không ai bắt máy, nhân viên phải làm gì?",
            options: [
              "A. Enter the room anyway",
              "B. Leave a voicemail and slip a note under the door",
              "C. Ignore the room",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Wake up, we need to clean.",
          good: "I'm sorry to disturb you, but could I check when housekeeping may visit?",
        },
        {
          bad: "You have to open the door now.",
          good: "Whenever it's convenient, could you let us know when we may service the room?",
        },
      ],
      game: [
        {
          prompt: "Sorry, the sign has been up since yesterday by mistake.",
          options: [
            {
              text: "Not at all, sir. Would now be a good time to clean? Or shall we come back later?",
              correct: true,
            },
            { text: "You have to open the door now.", correct: false },
            { text: "You should not have that sign up.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const SW_WEEK_23: WeekContent = {
  departmentId: "SW",
  weekNumber: 23,
  weekTitleEn: "Spa Treatment Consultation & Package Upselling",
  weekTitleVi: "Tư Vấn Liệu Trình Spa & Kỹ Thuật Upselling Gói Trị Liệu",
  // Pulled forward from Phases 0-2 so this week joins the spaced-recycling
  // system instead of standing outside it.
  reviewWords: [
    "Therapist",
    "Appointment",
    "Relaxing",
    "Massage",
    "Health condition",
    "Included",
    "Popular choice",
    "Skin type",
  ],
  lessons: [
    {
      lessonId: "SW_23_1",
      lessonOrder: 1,
      titleEn: "Welcoming Guests & Health Consultation Form",
      titleVi: "Chào đón Khách & Phiếu Khảo sát Sức khỏe",
      vocabulary: [
        {
          word: "Consultation",
          phonetic: "/ˌkɒnsəlˈteɪʃən/",
          definition: "Sự tư vấn, buổi tham vấn",
          context: "Please complete this health consultation form before your treatment.",
          icon: "📋",
        },
        {
          word: "Allergy",
          phonetic: "/ˈælədʒi/",
          definition: "Dị ứng",
          context: "Do you have any allergies to essential oils or nuts?",
          icon: "🤧",
        },
        {
          word: "Pressure",
          phonetic: "/ˈpreʃə/",
          definition: "Lực ấn, áp lực (khi massage)",
          context: "What pressure level do you prefer, light or firm?",
          icon: "✋",
        },
        {
          word: "Condition",
          phonetic: "/kənˈdɪʃən/",
          definition: "Tình trạng (sức khỏe)",
          context: "Please let us know if you have any medical conditions.",
          icon: "🩺",
        },
      ],
      grammar: [
        {
          rude: "Fill this out.",
          polite: "Could you please fill out this health form for us?",
          rule: "'Could you please…' + động từ biến mệnh lệnh thành đề nghị lịch sự.",
        },
        {
          rude: "Do you have allergies?",
          polite: "Would you mind telling us if you have any allergies?",
          rule: "'Would you mind + V-ing' làm mềm câu hỏi về thông tin cá nhân hay sức khỏe.",
        },
      ],
      speaking: [
        {
          guestPrompt: "This is my first time here. What do I need to do?",
          targetResponse:
            "Welcome to our spa! Before your treatment, please take a seat and fill out this short health consultation form for us.",
          helpTip:
            "Link 'fill out' smoothly — the 't' connects to the next vowel, sounding like 'fi-lout'.",
        },
      ],
      reading: {
        text: "SPA HEALTH CONSULTATION FORM\nGuest Name: Ms. Lan Pham\nAny allergies: Peanut oil\nSkin condition: Sensitive skin\nPregnant: No\nPreferred pressure: Medium\nAreas to avoid: Lower back (recent injury)",
        questions: [
          {
            q: "Trong lúc xoa bóp, kỹ thuật viên phải tránh vùng nào?",
            options: [
              "A. The guest's arms",
              "B. The guest's lower back",
              "C. The guest's shoulders",
            ],
            correct: 1,
          },
          {
            q: "Khách bị dị ứng gì?",
            options: ["A. Peanut oil", "B. Lavender", "C. Nuts and dairy"],
            correct: 0,
          },
        ],
      },
      arcade: [
        { bad: "Sign here.", good: "Could you please sign here for us?" },
        { bad: "You have to wait.", good: "Would you mind waiting just a moment, please?" },
      ],
      game: [
        {
          prompt: "I came here last year, but my doctor has given me new medication since then.",
          options: [
            {
              text: "Thank you for telling us, madam. Would you mind filling out a new health consultation form?",
              correct: true,
            },
            { text: "Your old form is still here, so don't worry about it.", correct: false },
            { text: "Just tell the therapist inside when you go in.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "SW_23_2",
      lessonOrder: 2,
      titleEn: "Explaining Treatment Types",
      titleVi: "Giải thích các Liệu pháp Trị liệu",
      vocabulary: [
        {
          word: "Contraindication check",
          phonetic: "/ˌkɒntrəˌɪndɪˈkeɪʃn tʃek/",
          definition: "Kiểm tra chống chỉ định trước liệu trình",
          context: "We always do a contraindication check before any treatment.",
          icon: "⚠️",
        },
        {
          word: "Hot stone",
          phonetic: "/hɒt stəʊn/",
          definition: "Đá nóng",
          context: "The hot stone massage uses heated basalt stones to relax your muscles.",
          icon: "🪨",
        },
        {
          word: "Herbal steam",
          phonetic: "/ˈhɜːbəl stiːm/",
          definition: "Xông hơi thảo dược",
          context: "Herbal steam opens your pores and clears your sinuses.",
          icon: "🌿",
        },
        {
          word: "Circulation",
          phonetic: "/ˌsɜːkjəˈleɪʃən/",
          definition: "Sự tuần hoàn (máu)",
          context: "This treatment improves blood circulation throughout your body.",
          icon: "💓",
        },
      ],
      grammar: [
        {
          rude: "This one is better than that one.",
          polite:
            "I'd recommend our hot stone massage, as it works especially well for muscle tension.",
          rule: "'I'd recommend…' kèm lý do với 'as/because' — gợi ý có căn cứ, không so sánh cộc lốc.",
        },
        {
          rude: "That treatment is old-fashioned.",
          polite:
            "Our traditional massage is a wonderful choice if you prefer gentle, relaxing techniques.",
          rule: "'is a wonderful choice if…' khen lựa chọn này thay vì chê lựa chọn kia.",
        },
      ],
      speaking: [
        {
          guestPrompt: "I'm not sure which massage to choose. What's the difference?",
          targetResponse:
            "Of course! Our traditional Vietnamese massage focuses on stretching. The hot stone massage uses heated stones for deeper muscle relief. Which sounds better for you?",
          helpTip:
            "Stress the contrast words 'traditional' and 'hot stone' a little louder so the guest hears the comparison clearly.",
        },
      ],
      reading: {
        text: "SERENITY SPA - TREATMENT MENU\nTraditional Vietnamese Massage - 60 min - Gentle stretching, eases fatigue\nHot Stone Massage - 75 min - Heated basalt stones, deep muscle relief\nHerbal Steam Therapy - 30 min - Local herbs, clears sinuses, softens skin",
        questions: [
          {
            q: "Liệu trình nào dùng đá bazan làm nóng?",
            options: [
              "A. Traditional Vietnamese Massage",
              "B. Hot Stone Massage",
              "C. Herbal Steam Therapy",
            ],
            correct: 1,
          },
          {
            q: "Liệu trình xông thảo mộc kéo dài bao lâu?",
            options: ["A. 30 minutes", "B. 60 minutes", "C. 75 minutes"],
            correct: 0,
          },
        ],
      },
      arcade: [
        { bad: "That one is boring.", good: "That treatment is more relaxing and gentle." },
        {
          bad: "I don't know, just pick one.",
          good: "Let me explain the difference so you can choose the best option.",
        },
      ],
      game: [
        {
          prompt: "My shoulders are very tense today. Is the herbal steam enough for that?",
          options: [
            {
              text: "Herbal steam is lovely for relaxing, madam. For deep muscle tension, I'd recommend our hot stone massage.",
              correct: true,
            },
            {
              text: "Yes, the steam is fine. Every treatment does the same thing.",
              correct: false,
            },
            { text: "I'm not a doctor, so I really can't say.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "SW_23_3",
      lessonOrder: 3,
      titleEn: "Upselling to Combo & Family Packages",
      titleVi: "Kỹ thuật Upselling Gói Combo & Gia đình",
      vocabulary: [
        {
          word: "Package",
          phonetic: "/ˈpækɪdʒ/",
          definition: "Gói dịch vụ",
          context: "We have a special couple's package this week.",
          icon: "🎁",
        },
        {
          word: "Combo",
          phonetic: "/ˈkɒmbəʊ/",
          definition: "Gói kết hợp",
          context: "The combo includes a massage and a facial treatment.",
          icon: "🧖",
        },
        {
          word: "Complimentary",
          phonetic: "/ˌkɒmplɪˈmentəri/",
          definition: "Miễn phí (đi kèm)",
          context: "The family package includes a complimentary herbal tea.",
          icon: "🍵",
        },
        {
          word: "Draping technique",
          phonetic: "/ˈdreɪpɪŋ tekˈniːk/",
          definition: "Kỹ thuật phủ khăn giữ kín đáo cho khách",
          context: "Our therapists always use proper draping technique for your comfort.",
          icon: "🩹",
        },
      ],
      grammar: [
        {
          rude: "You should buy the bigger package.",
          polite: "Have you considered our couple's combo? It's a lovely way to relax together.",
          rule: "'Have you considered…?' gợi ý nâng hạng mà không ép khách.",
        },
        {
          rude: "It's cheaper if you buy more.",
          polite: "If you'd like, we could offer you our family package at a special rate.",
          rule: "Câu điều kiện 'If you'd like, we could…' mời nâng hạng nhẹ nhàng.",
        },
      ],
      speaking: [
        {
          guestPrompt: "I just want a single massage for myself today.",
          targetResponse:
            "That sounds lovely. If you'd like, we also have a couple's combo package this week. Would you like to bring your partner next time?",
          helpTip:
            "Raise your intonation at the end of 'next time?' to keep the offer friendly, not pushy.",
        },
      ],
      reading: {
        text: "SERENITY SPA - THIS MONTH'S OFFER\nCouple's Combo: 2 x 90-min Massage + Herbal Tea for Two - 20% off\nFamily Care Package: 4 Sessions (Valid 3 Months) - Save 1,200,000 VND\nBook 2 or more sessions to receive a complimentary foot scrub.",
        questions: [
          {
            q: "Gói Couple's Combo tặng kèm những gì?",
            options: ["A. Herbal tea for two", "B. A free foot scrub", "C. A discount voucher"],
            correct: 0,
          },
          {
            q: "Gói Family Care có hiệu lực bao lâu?",
            options: ["A. 1 month", "B. 3 months", "C. 1 year"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Buy the bigger package, it's better.",
          good: "Our combo package might be a nice option if you'd like extra relaxation.",
        },
        {
          bad: "Just get the membership, everyone does.",
          good: "May I tell you a little about our membership benefits?",
        },
      ],
      game: [
        {
          prompt: "We're staying two weeks, so I'd like a massage every few days.",
          options: [
            {
              text: "Have you considered our family care package? Four sessions stay valid for three months.",
              correct: true,
            },
            { text: "Then just come back and pay the full price each time.", correct: false },
            { text: "You have to book every session separately at the desk.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "SW_23_4",
      lessonOrder: 4,
      titleEn: "Post-Treatment Feedback & Product Recommendation",
      titleVi: "Thu thập Phản hồi & Tư vấn Sản phẩm Mang về",
      vocabulary: [
        {
          word: "Feedback",
          phonetic: "/ˈfiːdbæk/",
          definition: "Phản hồi, góp ý",
          context: "May I ask for your feedback about the massage today?",
          icon: "💬",
        },
        {
          word: "Essential oil",
          phonetic: "/ɪˈsenʃəl ɔɪl/",
          definition: "Tinh dầu",
          context: "This essential oil helped relax your muscles during the session.",
          icon: "🧴",
        },
        {
          word: "Moisturize",
          phonetic: "/ˈmɔɪstʃəraɪz/",
          definition: "Dưỡng ẩm",
          context: "This cream will moisturize your skin after the steam treatment.",
          icon: "💧",
        },
        {
          word: "Recommend",
          phonetic: "/ˌrekəˈmend/",
          definition: "Giới thiệu, đề xuất",
          context: "I'd like to recommend a take-home product for your skin type.",
          icon: "🛍️",
        },
      ],
      grammar: [
        {
          rude: "How was it?",
          polite: "May I ask how you found your treatment today?",
          rule: "Mở đầu câu hỏi lấy ý kiến trang trọng bằng 'May I ask…?'.",
        },
        {
          rude: "You should buy this cream.",
          polite:
            "If you're interested, I could recommend this moisturizing cream for your skin type.",
          rule: "'If you're interested, I could…' giới thiệu sản phẩm mà không nài ép.",
        },
      ],
      speaking: [
        {
          guestPrompt: "That massage was wonderful, thank you.",
          targetResponse:
            "I'm so glad to hear that! May I recommend this lavender essential oil to help you relax at home too?",
          helpTip:
            "Smile while you speak — it naturally warms your tone on 'I'm so glad to hear that'.",
        },
      ],
      reading: {
        text: "SERENITY SPA - TAKE-HOME PRODUCTS\nLavender Essential Oil - Relaxation & sleep support - 350,000 VND\nGinger Body Scrub - Improves circulation - 280,000 VND\nAloe Vera Moisturizer - For sensitive, sun-exposed skin - 320,000 VND\nAsk your therapist which product suits your skin type.",
        questions: [
          {
            q: "Sản phẩm nào hợp nhất với da nhạy cảm, bị nắng?",
            options: [
              "A. Lavender Essential Oil",
              "B. Ginger Body Scrub",
              "C. Aloe Vera Moisturizer",
            ],
            correct: 2,
          },
          {
            q: "Tinh dầu oải hương dùng để làm gì?",
            options: [
              "A. Improves circulation",
              "B. Relaxation and sleep support",
              "C. Sun protection",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        { bad: "Did you like it?", good: "May I ask how you found your treatment today?" },
        {
          bad: "You need this cream.",
          good: "This cream might be perfect for your skin type — would you like to try it?",
        },
      ],
      game: [
        {
          prompt: "My skin feels a little dry after the herbal steam.",
          options: [
            {
              text: "Thank you for sharing that, madam. May I recommend our aloe vera moisturizer for sensitive skin?",
              correct: true,
            },
            { text: "That always happens after steam, so it is normal.", correct: false },
            { text: "You can buy some cream in a shop outside.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const GR_WEEK_27: WeekContent = {
  departmentId: "GR",
  weekNumber: 27,
  weekTitleEn: "VIP & Executive Club Benefits Management",
  weekTitleVi: "Chăm Sóc Khách Hàng Thượng Lưu (HNWI) Tại Executive Lounge",
  // Pulled forward from Phases 0-3 so this week joins the spaced-recycling
  // system instead of standing outside it.
  reviewWords: [
    "Lounge access",
    "Afternoon tea",
    "Evening cocktail hour",
    "Meeting room",
    "Coffee preference",
    "Pillow type",
    "Guest history",
    "Late check-out",
  ],
  lessons: [
    {
      lessonId: "GR_27_1",
      lessonOrder: 1,
      titleEn: "Welcoming VIP Guests & Introducing Club Privileges",
      titleVi: "Đón tiếp Khách VIP & Giới thiệu Đặc quyền Club",
      vocabulary: [
        {
          word: "Privilege",
          phonetic: "/ˈprɪvəlɪdʒ/",
          definition: "Đặc quyền",
          context: "As a Club member, you have access to several exclusive privileges.",
          icon: "🎁",
        },
        {
          word: "Complimentary",
          phonetic: "/ˌkɒmplɪˈmentəri/",
          definition: "Miễn phí (đi kèm dịch vụ)",
          context: "Breakfast is complimentary for all Executive Suite guests.",
          icon: "🆓",
        },
        {
          word: "Personalized",
          phonetic: "/ˈpɜːsənəlaɪzd/",
          definition: "Được cá nhân hóa",
          context: "We have prepared a personalized welcome for you, Mr. Tran.",
          icon: "✨",
        },
        {
          word: "Access",
          phonetic: "/ˈækses/",
          definition: "Quyền sử dụng, truy cập",
          context: "Your key card gives you access to the Executive Lounge on the 20th floor.",
          icon: "🔑",
        },
      ],
      grammar: [
        {
          rude: "You get free breakfast and evening drinks.",
          polite: "You will be entitled to complimentary breakfast and evening cocktails.",
          rule: "Nói quyền lợi của khách bằng 'will be entitled to' — trang trọng và chính xác hơn 'get'.",
        },
        {
          rude: "I need to explain the rules to you.",
          polite: "Allow me to walk you through your Club privileges.",
          rule: "'Allow me to…' là cách mở lời lịch sự khi muốn giải thích hoặc giúp khách.",
        },
      ],
      speaking: [
        {
          guestPrompt: "This is my first time staying in a Club Room. What do I actually get?",
          targetResponse:
            "Welcome, Mr. Tran. As a Club Room guest, you're entitled to Executive Lounge access and complimentary breakfast. You also receive all-day refreshments and evening cocktails. Allow me to explain each privilege in detail.",
          helpTip:
            "Link 'entitled to' smoothly — pronounce it as one flowing phrase, /ɪnˈtaɪtəld tə/, not word by word.",
        },
      ],
      reading: {
        text: "EXECUTIVE CLUB PRIVILEGES\nGuest: Mr. Minh Tran | Room: Club Suite 1802\n- Executive Lounge access (7:00 AM - 10:00 PM)\n- Complimentary breakfast & all-day refreshments\n- Evening Cocktail Hour (6:00 PM - 8:00 PM)\n- Late check-out until 2:00 PM (subject to availability)\n- Complimentary pressing of two garments per stay",
        questions: [
          {
            q: "Executive Lounge đóng cửa lúc mấy giờ?",
            options: ["A. 8:00 PM", "B. 10:00 PM", "C. 2:00 PM"],
            correct: 1,
          },
          {
            q: "Ngoài bữa sáng và đồ uống còn kèm gì?",
            options: [
              "A. Free spa treatment",
              "B. Free garment pressing",
              "C. Free airport transfer",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "You get free stuff here.",
          good: "You are entitled to a range of complimentary privileges during your stay.",
        },
        {
          bad: "I'll tell you the rules now.",
          good: "Allow me to walk you through your Club benefits.",
        },
      ],
      game: [
        {
          prompt: "May my wife join me in the Executive Lounge tomorrow morning?",
          options: [
            {
              text: "Of course, sir. Your Club Room privileges include lounge access for two guests.",
              correct: true,
            },
            { text: "No, the lounge is only for the person who booked.", correct: false },
            { text: "I have no idea, please ask at the front desk.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "GR_27_2",
      lessonOrder: 2,
      titleEn: "Afternoon Tea & Evening Cocktail Hour Service",
      titleVi: "Phục vụ Trà Chiều & Giờ Cocktail Buổi Tối",
      vocabulary: [
        {
          word: "Refreshments",
          phonetic: "/rɪˈfreʃmənts/",
          definition: "Đồ ăn nhẹ, thức uống giải khát",
          context: "Refreshments are served in the lounge throughout the day.",
          icon: "🍰",
        },
        {
          word: "Guest satisfaction score",
          phonetic: "/ɡest ˌsætɪsˈfækʃn skɔː/",
          definition: "Điểm hài lòng của khách",
          context: "Your feedback directly affects our guest satisfaction score.",
          icon: "📊",
        },
        {
          word: "Canapés",
          phonetic: "/ˈkænəpeɪz/",
          definition: "Món khai vị nhỏ",
          context: "Our chef prepares fresh canapés for Cocktail Hour every evening.",
          icon: "🍢",
        },
        {
          word: "Replenish",
          phonetic: "/rɪˈplenɪʃ/",
          definition: "Bổ sung thêm (đồ ăn/uống)",
          context: "I will replenish the pastry tray for you right away.",
          icon: "🔄",
        },
      ],
      grammar: [
        {
          rude: "Do you want tea or coffee?",
          polite: "Would you prefer tea or coffee this afternoon?",
          rule: "'Would you prefer…?' nhã hơn 'Do you want…?'.",
        },
        {
          rude: "The drinks are over there, help yourself.",
          polite:
            "Our Cocktail Hour selection is displayed on the counter — please feel free to help yourself.",
          rule: "Thêm một cụm mở đầu lịch sự trước khi hướng dẫn để câu không thành mệnh lệnh.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Is there a set time for the afternoon tea, or can I come anytime?",
          targetResponse:
            "Afternoon Tea is served daily from 3:00 to 5:00 PM, madam. You're welcome to join us anytime within that window. I'll be happy to prepare a fresh selection for you.",
          helpTip:
            "Practice the linking sound between 'set' and 'time' — /set‿taɪm/ — so it flows naturally instead of sounding choppy.",
        },
      ],
      reading: {
        text: "EXECUTIVE LOUNGE DAILY SCHEDULE\n7:00 - 10:30 AM: Breakfast\n10:30 AM - 3:00 PM: All-day Refreshments\n3:00 - 5:00 PM: Afternoon Tea\n6:00 - 8:00 PM: Evening Cocktail Hour (canapés & selected beverages)\nNote: Children under 12 are welcome before 6:00 PM only.",
        questions: [
          {
            q: "Khách dùng trà chiều được vào khung giờ nào?",
            options: ["A. 7:00 - 10:30 AM", "B. 3:00 - 5:00 PM", "C. 6:00 - 8:00 PM"],
            correct: 1,
          },
          {
            q: "Quy định độ tuổi vào phòng chờ là gì?",
            options: [
              "A. No children allowed at all",
              "B. Children under 12 welcome only before 6:00 PM",
              "C. Children must be accompanied after 8:00 PM",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Tea is from 3 to 5, that's it.",
          good: "Afternoon Tea is served daily from 3:00 to 5:00 PM — please join us anytime within that window.",
        },
        {
          bad: "Kids can't come after 6.",
          good: "For a relaxed atmosphere, we welcome children in the lounge until 6:00 PM.",
        },
      ],
      game: [
        {
          prompt: "The canapé tray at the Cocktail Hour counter is almost empty.",
          options: [
            {
              text: "Thank you for letting me know, sir. I will replenish the tray right away.",
              correct: true,
            },
            { text: "Cocktail Hour finishes soon, so we do not refill it.", correct: false },
            { text: "The kitchen is closed, so there is nothing I can do.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "GR_27_3",
      lessonOrder: 3,
      titleEn: "Executive Assistance: Meeting Rooms & Urgent Printing",
      titleVi: "Hỗ trợ Thư ký Hành chính: Đặt Phòng Họp & In ấn Khẩn cấp",
      vocabulary: [
        {
          word: "Confidential",
          phonetic: "/ˌkɒnfɪˈdenʃəl/",
          definition: "Bảo mật, riêng tư",
          context: "This is a confidential business meeting, so we need a private room.",
          icon: "🔒",
        },
        {
          word: "Availability",
          phonetic: "/əˌveɪləˈbɪləti/",
          definition: "Tình trạng còn trống",
          context: "Let me check the availability of our private meeting room.",
          icon: "📆",
        },
        {
          word: "Urgent",
          phonetic: "/ˈɜːdʒənt/",
          definition: "Khẩn cấp",
          context: "I have an urgent document that needs printing before my 3 PM call.",
          icon: "⏰",
        },
        {
          word: "Assistance",
          phonetic: "/əˈsɪstəns/",
          definition: "Sự hỗ trợ, giúp đỡ",
          context: "Our Guest Relations team is happy to provide assistance with your documents.",
          icon: "🤝",
        },
      ],
      grammar: [
        {
          rude: "You can't use the meeting room now, it's busy.",
          polite:
            "I'm afraid the meeting room is currently occupied. May I reserve it for you at 2:00 PM instead?",
          rule: "'I'm afraid…' làm mềm tin xấu — nói xong phải đưa ngay phương án thay thế.",
        },
        {
          rude: "Send me the file and I'll print it.",
          polite:
            "If you could send me the file, I would be glad to help. I'll have it printed for you right away.",
          rule: "Ghép 'If you could…' với 'I would be glad to…' để vừa đề nghị vừa mời một cách nhã nhặn.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "I need a private room for a confidential call in 30 minutes, and I also have a document that must be printed urgently.",
          targetResponse:
            "Certainly, sir. I'll reserve our private meeting room for you right away. If you could send me the document, I would be glad to help. It will be printed immediately.",
          helpTip:
            "Stress the key words 'right away' and 'immediately' with a slightly rising then falling tone to sound efficient and reassuring.",
        },
      ],
      reading: {
        text: "BUSINESS CENTER REQUEST FORM\nGuest: Ms. Lan Pham | Suite 2105\nService Requested: Private Meeting Room (30 mins)\nPrinting: 1 document, Confidential, 5 copies\nRequested Time: 2:30 PM\nStatus: Confirmed - Room B, Urgent Print Queue",
        questions: [
          {
            q: "Khách cần bao nhiêu bản sao tài liệu?",
            options: ["A. 1 copy", "B. 5 copies", "C. 10 copies"],
            correct: 1,
          },
          {
            q: "Tài liệu đang in là loại gì?",
            options: ["A. Confidential", "B. Public", "C. Marketing material"],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "The room is busy, come back later.",
          good: "I'm afraid the room is currently occupied — may I reserve it for you at a later time?",
        },
        {
          bad: "Just email it, I'll print it whenever.",
          good: "If you could send me the file now, I would be glad to have it printed right away.",
        },
      ],
      game: [
        {
          prompt: "Could I use the small meeting room right now for a private interview?",
          options: [
            {
              text: "I'm afraid the room is currently occupied. May I reserve it for you at 2:00 PM instead?",
              correct: true,
            },
            { text: "It's busy, so come back later and check again yourself.", correct: false },
            { text: "You can just use a table in the lobby.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "GR_27_4",
      lessonOrder: 4,
      titleEn: "Managing Guest History Profiles & Preferences",
      titleVi: "Quản trị Hồ sơ Lịch sử Khách hàng & Ghi nhận Sở thích",
      vocabulary: [
        {
          word: "Preference",
          phonetic: "/ˈprefərəns/",
          definition: "Sở thích, sự ưu tiên",
          context: "Please note the guest's preference for a high floor room.",
          icon: "📝",
        },
        {
          word: "Anniversary",
          phonetic: "/ˌænɪˈvɜːsəri/",
          definition: "Ngày kỷ niệm",
          context: "Mr. and Mrs. Lee are celebrating their wedding anniversary during this stay.",
          icon: "💍",
        },
        {
          word: "Allergy",
          phonetic: "/ˈælədʒi/",
          definition: "Dị ứng",
          context: "The guest has a shellfish allergy, so please inform the kitchen.",
          icon: "⚠️",
        },
        {
          word: "Post-stay follow-up",
          phonetic: "/pəʊst steɪ ˈfɒləʊ ʌp/",
          definition: "Liên hệ hỏi thăm sau khi khách rời khách sạn",
          context: "We will send a post-stay follow-up to thank you for your visit.",
          icon: "✉️",
        },
      ],
      grammar: [
        {
          rude: "Write down what he likes.",
          polite: "Let's make sure to record his preferences in the guest profile.",
          rule: "'Let's make sure to…' biến lời nhắc cộc thành đề nghị cùng làm.",
        },
        {
          rude: "He wants a firm pillow, note it.",
          polite: "It has been noted that the guest prefers a firm pillow for future stays.",
          rule: "Bị động 'It has been noted that…' để ghi nhận thông tin một cách khách quan.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "By the way, I noticed you remembered I like my coffee black with no sugar. That was really thoughtful.",
          targetResponse:
            "My pleasure, sir. It has been noted in your profile. We will make sure every future stay feels just as personal.",
          helpTip:
            "Soften the ending with a falling intonation on 'just as personal' to sound sincere rather than robotic.",
        },
      ],
      reading: {
        text: "GUEST HISTORY PROFILE\nGuest: Mr. James Carter | Loyalty Tier: Diamond\nPreferences:\n- Coffee: Black, no sugar\n- Pillow: Firm, 2 extra\n- Room: High floor, away from elevator\n- Special Note: Wedding anniversary on Aug 15 - arrange small cake\nAllergy: None reported",
        questions: [
          {
            q: "Ông Carter thích uống cà phê thế nào?",
            options: ["A. Black, no sugar", "B. With milk and sugar", "C. Black with sugar"],
            correct: 0,
          },
          {
            q: "Cần chuẩn bị riêng điều gì cho ông Carter?",
            options: [
              "A. Airport pickup",
              "B. A small cake for his anniversary",
              "C. Extra towels",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Just remember he likes black coffee, don't bother writing it down.",
          good: "Let's make sure to record his coffee preference in the guest profile for future visits.",
        },
        {
          bad: "He wants a firm pillow, whatever.",
          good: "It has been noted that the guest prefers a firm pillow for future stays.",
        },
      ],
      game: [
        {
          prompt: "We'll be back in October for our wedding anniversary.",
          options: [
            {
              text: "How wonderful, madam. It has been noted in your profile for your next stay.",
              correct: true,
            },
            { text: "Please remind us again when you arrive in October.", correct: false },
            { text: "We don't keep records of personal dates here.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const BO_WEEK_37: WeekContent = {
  departmentId: "BO",
  weekNumber: 37,
  weekTitleEn: "B2B Account Sales & Contract Negotiations",
  weekTitleVi: "Đàm Phán Hợp Đồng Đại Lý Lữ Hành & Doanh Nghiệp (B2B Account Sales)",
  // Pulled forward from Phases 0-3 so this hand-authored week joins the
  // spaced-recycling system instead of standing outside it.
  reviewWords: [
    "Policy",
    "Company name",
    "Reply by email",
    "Check the order",
    "Deadline",
    "Agreed",
    "Volume discount",
    "Deposit policy",
  ],
  lessons: [
    {
      lessonId: "BO_37_1",
      lessonOrder: 1,
      titleEn: "Pitching Corporate Rates & Closing the Contract",
      titleVi: "Chào giá Doanh nghiệp & Chốt Hợp đồng",
      vocabulary: [
        {
          word: "Corporate rate",
          phonetic: "/ˈkɔːpərət reɪt/",
          definition: "Giá phòng dành cho doanh nghiệp",
          context: "We can offer you a special corporate rate for your company.",
          icon: "🏢",
        },
        {
          word: "Volume contract",
          phonetic: "/ˈvɒljuːm ˈkɒntrækt/",
          definition: "Hợp đồng theo số lượng lớn",
          context: "This volume contract guarantees you the best price all year.",
          icon: "📄",
        },
        {
          word: "Occupancy rate",
          phonetic: "/ˈɒkjʊpənsi reɪt/",
          definition: "Tỷ lệ lấp đầy phòng",
          context: "Our occupancy rate this month allows some flexibility on price.",
          icon: "📈",
        },
        {
          word: "Sign (a contract)",
          phonetic: "/saɪn/",
          definition: "Ký (hợp đồng)",
          context: "We would be delighted if you could sign the agreement today.",
          icon: "✍️",
        },
      ],
      grammar: [
        {
          rude: "You should sign now.",
          polite: "Would you be interested in signing the agreement today?",
          rule: "'Would you be interested in…?' mở lời chào dịch vụ nhẹ nhàng.",
        },
        {
          rude: "This is the best price, take it.",
          polite:
            "I would strongly recommend this package, as it offers the best value for your volume.",
          rule: "'I would strongly recommend…' khuyên mạnh mà vẫn khéo, không ra lệnh.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Your rates look good, but what can you offer for 200 room-nights a month?",
          targetResponse:
            "For that volume, we can offer you our best corporate rate, along with a complimentary upgrade for your VIP clients.",
          helpTip: "Link 'complimentary upgrade' smoothly — don't pause between the two words.",
        },
      ],
      reading: {
        text: "GRAND HOTEL - CORPORATE RATE PROPOSAL\nPartner: Viet Travel Co., Ltd.\nRoom Type: Deluxe Room\nCorporate Rate: 1,800,000 VND/night (net)\nMinimum Volume: 150 room-nights/month\nContract Term: 12 months",
        questions: [
          {
            q: "Mức giá doanh nghiệp này đòi sản lượng tối thiểu bao nhiêu?",
            options: [
              "A. 100 room-nights/month",
              "B. 150 room-nights/month",
              "C. 200 room-nights/month",
            ],
            correct: 1,
          },
          {
            q: "Hợp đồng có thời hạn bao lâu?",
            options: ["A. 6 months", "B. 12 months", "C. 24 months"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Buy more rooms, cheaper price.",
          good: "The more rooms you commit to, the more competitive our rate becomes.",
        },
        { bad: "Sign here now.", good: "Shall we go ahead and finalize the agreement today?" },
      ],
      game: [
        {
          prompt: "If we commit to 300 room-nights a month, what more can you do for us?",
          options: [
            {
              text: "At that volume, we could offer an even more competitive rate, plus complimentary breakfast for all your guests.",
              correct: true,
            },
            { text: "This is the best price, take it.", correct: false },
            { text: "We don't offer better rates for larger volumes.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "BO_37_2",
      lessonOrder: 2,
      titleEn: "Allotment & Release Period",
      titleVi: "Thỏa thuận Phân bổ Phòng & Thời hạn Hoàn phòng",
      vocabulary: [
        {
          word: "Allotment",
          phonetic: "/əˈlɒtmənt/",
          definition: "Số lượng phòng phân bổ",
          context: "We can guarantee an allotment of 10 rooms every weekend.",
          icon: "🛏️",
        },
        {
          word: "Release period",
          phonetic: "/rɪˈliːs ˈpɪəriəd/",
          definition: "Thời hạn hoàn trả phòng không bán được",
          context: "The release period for unsold rooms is 7 days before arrival.",
          icon: "⏳",
        },
        {
          word: "Unsold rooms",
          phonetic: "/ʌnˈsəʊld ruːmz/",
          definition: "Phòng chưa được bán",
          context: "Please confirm or release the unsold rooms by Friday.",
          icon: "🚪",
        },
        {
          word: "Confirm",
          phonetic: "/kənˈfɜːm/",
          definition: "Xác nhận",
          context: "Could you confirm your rooms before the release deadline?",
          icon: "✅",
        },
      ],
      grammar: [
        {
          rude: "Give back rooms you don't sell.",
          polite:
            "If you cannot sell the rooms, we would ask that you release them by the deadline.",
          rule: "Câu điều kiện 'If… we would ask that…' nêu quy định theo cách cùng hợp tác.",
        },
        {
          rude: "We will cancel rooms automatically.",
          polite: "Any unsold rooms will be automatically released after the deadline.",
          rule: "Bị động 'will be released' nêu chính sách trung tính, không như đang trách khách.",
        },
      ],
      speaking: [
        {
          guestPrompt: "How many rooms can you hold for us, and until when?",
          targetResponse:
            "We can allot 10 rooms per night, with a release period of 7 days before arrival.",
          helpTip:
            "Stress the number and the noun together: 'TEN rooms', 'SEVEN days' — this avoids confusion on the phone.",
        },
      ],
      reading: {
        text: "CONTRACT CLAUSE 4 - ROOM ALLOTMENT:\nThe Hotel shall allot ten (10) rooms per night to the Partner.\nAny rooms not confirmed by the Partner within the Release Period (7 days prior to arrival) shall be automatically released back to general inventory.",
        questions: [
          {
            q: "Khách sạn giữ bao nhiêu phòng mỗi đêm cho đối tác?",
            options: ["A. 5 rooms", "B. 10 rooms", "C. 15 rooms"],
            correct: 1,
          },
          {
            q: "Phòng không được xác nhận trong hạn giữ chỗ sẽ ra sao?",
            options: [
              "A. They are held for another week",
              "B. They are released back to general inventory",
              "C. They are given a discount",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "You lose rooms if you're late.",
          good: "Unconfirmed rooms will be released back to inventory after the deadline.",
        },
        {
          bad: "Tell us fast if you want rooms.",
          good: "Please confirm your room requirement before the release period ends.",
        },
      ],
      game: [
        {
          prompt:
            "What happens if we need to confirm rooms after the release period has already passed?",
          options: [
            {
              text: "Once the release period ends, we can no longer guarantee the allotment, though I'm happy to check current availability for you.",
              correct: true,
            },
            { text: "It doesn't matter, we'll always hold the rooms for you.", correct: false },
            { text: "You should have confirmed earlier, nothing we can do now.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "BO_37_3",
      lessonOrder: 3,
      titleEn: "Blackout Dates & Cancellation Policy",
      titleVi: "Ngày Hạn chế Cao điểm & Chính sách Hủy phòng",
      vocabulary: [
        {
          word: "Blackout dates",
          phonetic: "/ˈblækaʊt deɪts/",
          definition: "Ngày hạn chế áp dụng giá/hợp đồng",
          context: "The contract rate does not apply during blackout dates like Tet holiday.",
          icon: "🚫",
        },
        {
          word: "Peak season",
          phonetic: "/piːk ˈsiːzən/",
          definition: "Mùa cao điểm",
          context: "Blackout dates usually fall during the peak season.",
          icon: "📈",
        },
        {
          word: "Cancellation policy",
          phonetic: "/ˌkænsəˈleɪʃən ˈpɒləsi/",
          definition: "Chính sách hủy phòng",
          context: "Please review our cancellation policy before confirming the booking.",
          icon: "📋",
        },
        {
          word: "Penalty fee",
          phonetic: "/ˈpenəlti fiː/",
          definition: "Phí phạt",
          context: "A penalty fee applies for cancellations made after the deadline.",
          icon: "⚠️",
        },
      ],
      grammar: [
        {
          rude: "You can't book on those dates.",
          polite: "We kindly request that you avoid booking during the listed blackout dates.",
          rule: "'We kindly request that…' làm lời hạn chế trang trọng mà vẫn lịch sự.",
        },
        {
          rude: "You pay a fine if you cancel late.",
          polite: "I'm afraid a penalty fee will apply for cancellations made after the deadline.",
          rule: "'I'm afraid…' làm mềm câu từ chối hoặc hạn chế.",
        },
      ],
      speaking: [
        {
          guestPrompt: "What if our client needs to cancel a group booking close to Tet holiday?",
          targetResponse:
            "I'm afraid Tet falls within our blackout dates, and a penalty fee will apply for late cancellations.",
          helpTip:
            "Practice the soft, apologetic tone on 'I'm afraid' — drop your pitch slightly to sound sincere, not harsh.",
        },
      ],
      reading: {
        text: "CONTRACT CLAUSE 6 - BLACKOUT DATES & CANCELLATION:\nThe Contract Rate excludes the following Blackout Dates: 15 Jan - 05 Feb (Tet Holiday), 30 Apr - 03 May.\nCancellations made less than 14 days before arrival are subject to a penalty fee of one (1) night's rate.",
        questions: [
          {
            q: "Dịp lễ nào bị liệt vào ngày không áp dụng giá?",
            options: ["A. Christmas", "B. Tet Holiday", "C. National Day"],
            correct: 1,
          },
          {
            q: "Hủy dưới 14 ngày trước ngày đến thì bị phạt thế nào?",
            options: ["A. No penalty", "B. One night's rate", "C. Full stay charge"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "No booking on those days, sorry.",
          good: "We kindly request that bookings avoid the blackout dates listed in the contract.",
        },
        {
          bad: "Too late, you pay fine.",
          good: "I'm afraid a penalty fee applies for cancellations made after the 14-day deadline.",
        },
      ],
      game: [
        {
          prompt:
            "What about a booking around National Day — does the contract rate still apply then?",
          options: [
            {
              text: "I'm afraid National Day also falls within our blackout dates, so the standard rate would apply instead of the contract rate.",
              correct: true,
            },
            { text: "No, blackout dates are only for Tet.", correct: false },
            { text: "Don't worry about it, we'll sort it out later.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "BO_37_4",
      lessonOrder: 4,
      titleEn: "Handling Rate Pressure & Commission Disputes",
      titleVi: "Xử lý Ép giá & Tranh chấp Hoa hồng",
      vocabulary: [
        {
          word: "Commission rate",
          phonetic: "/kəˈmɪʃən reɪt/",
          definition: "Tỷ lệ hoa hồng",
          context: "Our standard commission rate for travel agents is 10 percent.",
          icon: "💵",
        },
        {
          word: "ADR",
          phonetic: "/eɪ diː ɑː/",
          definition: "Giá phòng bình quân (Average Daily Rate)",
          context: "We calculate ADR before agreeing to any group discount.",
          icon: "💰",
        },
        {
          word: "Renegotiate",
          phonetic: "/ˌriːnɪˈɡəʊʃieɪt/",
          definition: "Đàm phán lại",
          context: "We are open to renegotiate the terms next quarter.",
          icon: "🔄",
        },
        {
          word: "Long-term partnership",
          phonetic: "/lɔːŋ tɜːm ˈpɑːtnəʃɪp/",
          definition: "Quan hệ đối tác lâu dài",
          context: "We value this as a long-term partnership, not a one-time deal.",
          icon: "🤝",
        },
      ],
      grammar: [
        {
          rude: "No, we won't raise your commission.",
          polite:
            "I understand your concern, however, our current commission rate is already very competitive.",
          rule: "'I understand your concern, however…' — ghi nhận ý đối tác trước khi phản biện.",
        },
        {
          rude: "Take it or leave it.",
          polite:
            "What if we offered a slightly higher commission in exchange for a longer contract term?",
          rule: "'What if we…?' đưa phương án đối ứng thay vì từ chối thẳng.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "Another hotel is offering us 15% commission. Can you match that, or we'll move our business there?",
          targetResponse:
            "I understand your concern, however, what if we offered 12% commission in exchange for a longer, exclusive contract?",
          helpTip:
            "Keep your intonation calm and steady on 'however' — a rising, defensive tone can sound like an argument.",
        },
      ],
      reading: {
        text: "EMAIL FROM TRAVEL AGENT PARTNER:\nSubject: Commission Review Request\nHi team, we've received a better offer from a competitor hotel at 15% commission. We currently receive 10% with you. Please advise if you can match this, or we may need to shift our allocation next quarter.",
        questions: [
          {
            q: "Khách sạn đối thủ chào mức hoa hồng bao nhiêu?",
            options: ["A. 10%", "B. 12%", "C. 15%"],
            correct: 2,
          },
          {
            q: "Đối tác nói điều gì có thể xảy ra nếu không theo được mức giá đó?",
            options: [
              "A. They will end the partnership immediately",
              "B. They may shift allocation next quarter",
              "C. They will sue the hotel",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "No, we won't raise your commission.",
          good: "I understand your concern, however, our rate already reflects strong added value.",
        },
        {
          bad: "Go to the other hotel then.",
          good: "Let's discuss how we can strengthen this long-term partnership together.",
        },
      ],
      game: [
        {
          prompt:
            "A competitor is offering us a signing bonus too. Can you offer something similar?",
          options: [
            {
              text: "I understand your concern, however, what if we offered a small volume bonus in exchange for extending our long-term partnership?",
              correct: true,
            },
            { text: "No, we don't do bonuses.", correct: false },
            { text: "Go ahead and sign with them then.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const FO_WEEK_26: WeekContent = {
  departmentId: "FO",
  weekNumber: 26,
  weekTitleEn: "Group & MICE Check-in Management",
  weekTitleVi: "Quản lý Đoàn Khách Tour & Phái Đoàn Doanh Nghiệp (MICE Groups)",
  // Pulled forward from Phases 0-2 so this week joins the spaced-recycling
  // system instead of standing outside it.
  reviewWords: [
    "Check in",
    "Bellman",
    "Luggage",
    "Lobby",
    "Confirm the details",
    "Room key",
    "Settle the bill",
    "Breakfast buffet",
  ],
  mediation: WEEK26_MEDIATION_TASKS.FO,
  lessons: [
    {
      lessonId: "FO_26_1",
      lessonOrder: 1,
      titleEn: "Rooming List Verification with the Tour Leader",
      titleVi: "Đối chiếu Danh sách phòng cùng Trưởng đoàn",
      vocabulary: [
        {
          word: "Rooming list",
          phonetic: "/ˈruːmɪŋ lɪst/",
          definition: "Danh sách phân bổ phòng",
          context: "Let's go through the rooming list together, sir.",
          icon: "📋",
        },
        {
          word: "Tour leader",
          phonetic: "/tʊə ˈliːdə/",
          definition: "Trưởng đoàn",
          context: "The tour leader will confirm the final numbers.",
          icon: "🧑‍💼",
        },
        {
          word: "Point of contact",
          phonetic: "/pɔɪnt əv ˈkɒntækt/",
          definition: "Đầu mối liên hệ",
          context: "You are our point of contact for the whole group.",
          icon: "📞",
        },
        {
          word: "Discrepancy",
          phonetic: "/dɪˈskrepənsi/",
          definition: "Sự sai lệch, không khớp",
          context: "We found a small discrepancy in the room count.",
          icon: "⚠️",
        },
      ],
      grammar: [
        {
          rude: "This list is wrong.",
          polite:
            "I've noticed a small discrepancy on the list — could we double-check it together?",
          rule: "'I've noticed…' kèm một câu hỏi để nêu vấn đề mà không đổ lỗi cho khách.",
        },
        {
          rude: "Give me the final numbers.",
          polite: "Would you be able to confirm the final numbers for us?",
          rule: "'Would you be able to…?' là cách hỏi xác nhận mềm hơn.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "Here's our group's rooming list. We have 25 rooms booked under Sunrise Travel.",
          targetResponse:
            "Thank you. Let's go through the list together. We'll confirm each guest name and room type before we start check-in.",
          helpTip:
            "Link the words smoothly in 'check-in' — /ˈtʃek ɪn/ — so it does not sound like two separate words.",
        },
      ],
      reading: {
        text: "ROOMING LIST - SUNRISE TRAVEL GROUP\nGroup Size: 25 Rooms / 50 Pax\nArrival Date: 20 JUL 2026\nRoom Type: 20 Twin Rooms, 5 Triple Rooms (extra bed)\nSpecial Note: 2 guests require rooms on a low floor",
        questions: [
          {
            q: "Trong đoàn có bao nhiêu phòng cần giường phụ?",
            options: ["A. 20", "B. 5", "C. 2"],
            correct: 1,
          },
          {
            q: "Hai khách có ghi chú yêu cầu đặc biệt gì?",
            options: ["A. Early check-in", "B. Extra pillows", "C. Low floor rooms"],
            correct: 2,
          },
        ],
      },
      arcade: [
        {
          bad: "Your list is wrong.",
          good: "I think there might be a small discrepancy — shall we check it together?",
        },
        {
          bad: "Tell me the numbers now.",
          good: "Could you confirm the final headcount for us, please?",
        },
      ],
      game: [
        {
          prompt: "Our booking says 30 rooms, but your screen shows only 28.",
          options: [
            {
              text: "I've noticed a small discrepancy, sir. Could we double-check the list together?",
              correct: true,
            },
            { text: "Our system is never wrong, so 28 is the correct number.", correct: false },
            { text: "You'll have to call your travel agent about that.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_26_2",
      lessonOrder: 2,
      titleEn: "Express Check-in & Bellman Coordination",
      titleVi: "Phát phòng nhanh & Phối hợp cùng Bellman",
      vocabulary: [
        {
          word: "Express check-in",
          phonetic: "/ɪkˈspres ˈtʃek ɪn/",
          definition: "Thủ tục nhận phòng nhanh",
          context: "We have prepared an express check-in for your group.",
          icon: "⚡",
        },
        {
          word: "Key packet",
          phonetic: "/kiː ˈpækɪt/",
          definition: "Bộ chìa khóa đã chuẩn bị sẵn",
          context: "Each key packet is labeled with the guest's name.",
          icon: "🗝️",
        },
        {
          word: "Luggage tag",
          phonetic: "/ˈlʌɡɪdʒ tæɡ/",
          definition: "Thẻ hành lý",
          context: "Please attach a luggage tag to each suitcase.",
          icon: "🏷️",
        },
        {
          word: "Coordinate",
          phonetic: "/kəʊˈɔːdɪneɪt/",
          definition: "Phối hợp, điều phối",
          context: "I will coordinate with the bellman team on your luggage.",
          icon: "🤝",
        },
      ],
      grammar: [
        {
          rude: "Wait for your bags.",
          polite:
            "Let me coordinate with our bellman team so your luggage arrives directly at your room.",
          rule: "'Let me + động từ' — chủ động đề nghị giúp.",
        },
        {
          rude: "Bags come later.",
          polite: "Your luggage will be delivered to your room shortly by our bellman.",
          rule: "Bị động 'will be delivered' mô tả quy trình một cách chuyên nghiệp.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "We're in a hurry — our group has a meeting in twenty minutes. Can we skip the long check-in?",
          targetResponse:
            "Of course. We've prepared an express check-in for your group. Key packets are ready for each guest. You can go straight to your rooms.",
          helpTip:
            "Stress the first syllable in 'express' and link 'go straight to' smoothly without pausing between words.",
        },
      ],
      reading: {
        text: "EXPRESS GROUP CHECK-IN - SOP\nStep 1: Pre-assign rooms & key packets before arrival.\nStep 2: Hand out key packets in the lobby (max 5 minutes).\nStep 3: Bellman team collects luggage tags and delivers bags directly to rooms.",
        questions: [
          {
            q: "Trước khi đoàn đến phải chuẩn bị gì?",
            options: ["A. Key packets", "B. Luggage tags only", "C. Nothing"],
            correct: 0,
          },
          {
            q: "Ai đưa hành lý thẳng lên phòng?",
            options: ["A. Front desk staff", "B. The bellman team", "C. The tour leader"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "You wait here for check-in.",
          good: "We've prepared an express check-in, so this will only take a few minutes.",
        },
        {
          bad: "Leave your bags there.",
          good: "You may leave your luggage here — our bellman will bring it up shortly.",
        },
      ],
      game: [
        {
          prompt: "Our coach has just arrived. Who will take fifty suitcases up to the rooms?",
          options: [
            {
              text: "Let me coordinate with our bellman team. Your luggage will be delivered to each room shortly.",
              correct: true,
            },
            { text: "Each guest carries their own bags to the lift.", correct: false },
            { text: "Leave them in the lobby and check on them later.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_26_3",
      lessonOrder: 3,
      titleEn: "Handling Room Swaps & Split Billing",
      titleVi: "Xử lý Đổi phòng chéo & Tách hóa đơn",
      vocabulary: [
        {
          word: "Swap rooms",
          phonetic: "/swɒp ruːmz/",
          definition: "Đổi phòng cho nhau",
          context: "The two guests would like to swap rooms.",
          icon: "🔄",
        },
        {
          word: "Split the bill",
          phonetic: "/splɪt ðə bɪl/",
          definition: "Tách hóa đơn",
          context: "Could we split the bill between two rooms?",
          icon: "🧾",
        },
        {
          word: "Individually",
          phonetic: "/ˌɪndɪˈvɪdʒuəli/",
          definition: "Riêng lẻ, từng người một",
          context: "Each guest will be billed individually.",
          icon: "👤",
        },
        {
          word: "Adjust",
          phonetic: "/əˈdʒʌst/",
          definition: "Điều chỉnh",
          context: "I will adjust the folio for you right away.",
          icon: "🛠️",
        },
      ],
      grammar: [
        {
          rude: "You can't change rooms now.",
          polite:
            "I'm afraid room changes need a quick update in our system. I can arrange that for you now.",
          rule: "'I'm afraid…' làm mềm giới hạn, rồi mới đưa giải pháp.",
        },
        {
          rude: "I can't split it.",
          polite: "If you would like, I can set up two separate folios for individual billing.",
          rule: "Câu điều kiện 'If you would like, I can…' đưa lựa chọn một cách lịch sự.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "Actually, my colleague and I would like to swap our rooms, and could you split our bill into two separate ones?",
          targetResponse:
            "Certainly, sir. I'll just need a moment to update it in our system. Then I can set up two separate folios for you.",
          helpTip:
            "Use a warm, falling intonation on 'Certainly, sir' so it sounds reassuring rather than routine.",
        },
      ],
      reading: {
        text: "FRONT DESK NOTE - ROOM ADJUSTMENT\nRoom 812 (Mr. Tran) and Room 815 (Mr. Le) requested to swap rooms.\nBoth guests also requested separate folios for individual billing.\nAction: Update PMS room assignment and issue two new keycards.",
        questions: [
          {
            q: "Ông Trần và ông Lê yêu cầu gì về phòng của họ?",
            options: ["A. To swap rooms", "B. To upgrade rooms", "C. To cancel their rooms"],
            correct: 0,
          },
          {
            q: "Khách yêu cầu đổi gì trong cách xuất hóa đơn?",
            options: ["A. One combined bill", "B. Separate folios", "C. No bill needed"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "You can't swap rooms.",
          good: "I'm afraid I'll need a moment to update this, but I can arrange the room swap for you.",
        },
        {
          bad: "One bill only.",
          good: "If you would like, I can split this into two separate bills.",
        },
      ],
      game: [
        {
          prompt: "Our company covers the room only. Can my minibar go on a separate bill?",
          options: [
            {
              text: "If you would like, I can set up two separate folios for individual billing.",
              correct: true,
            },
            { text: "No, everything stays on one bill for the company.", correct: false },
            { text: "Sort that out with your company after check-out.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_26_4",
      lessonOrder: 4,
      titleEn: "Group Announcements: Breakfast & Shuttle Bus",
      titleVi: "Thông báo đoàn: Giờ ăn sáng & Lịch xe đưa đón",
      vocabulary: [
        {
          word: "Shuttle bus",
          phonetic: "/ˈʃʌtl bʌs/",
          definition: "Xe buýt đưa đón",
          context: "The shuttle bus departs from the main lobby.",
          icon: "🚌",
        },
        {
          word: "Departure time",
          phonetic: "/dɪˈpɑːtʃə taɪm/",
          definition: "Giờ khởi hành",
          context: "Please note the departure time for tomorrow's shuttle.",
          icon: "⏰",
        },
        {
          word: "Group breakfast",
          phonetic: "/ɡruːp ˈbrekfəst/",
          definition: "Ăn sáng tập thể",
          context: "Group breakfast is reserved in the private hall.",
          icon: "🥐",
        },
        {
          word: "Announcement",
          phonetic: "/əˈnaʊnsmənt/",
          definition: "Thông báo",
          context: "I have a short announcement for the whole group.",
          icon: "📢",
        },
      ],
      grammar: [
        {
          rude: "Listen up, breakfast is at 7.",
          polite: "Please note that group breakfast will be served at 7:00 AM in the private hall.",
          rule: "'Please note that…' mở đầu thông báo trang trọng cho đoàn khách.",
        },
        {
          rude: "Don't be late for the bus.",
          polite:
            "Would you mind reminding your group to be at the lobby five minutes before departure?",
          rule: "'Would you mind + V-ing' để đề nghị hoặc nhắc nhở lịch sự.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "Could you let our group know about tomorrow's schedule before we head up to our rooms?",
          targetResponse:
            "Of course. Please note that group breakfast will be served at 7:00 AM. The shuttle bus departs the lobby at 8:00 AM sharp.",
          helpTip:
            "Enunciate 'seven' and 'eight' clearly and pause briefly between the two times so the group does not confuse them.",
        },
      ],
      reading: {
        text: "GROUP NOTICE BOARD - SUNRISE TRAVEL\nGroup Breakfast: 07:00 - 08:00, Lotus Private Hall\nShuttle Bus Departure: 08:00 AM sharp, Main Lobby\nPlease be seated five minutes before departure.",
        questions: [
          {
            q: "Đoàn sẽ ăn sáng ở đâu?",
            options: ["A. Lotus Private Hall", "B. Main Lobby", "C. Rooftop Restaurant"],
            correct: 0,
          },
          {
            q: "Xe đưa đón khởi hành lúc mấy giờ?",
            options: ["A. 07:00 AM", "B. 07:55 AM", "C. 08:00 AM"],
            correct: 2,
          },
        ],
      },
      arcade: [
        {
          bad: "Breakfast 7, bus 8, don't be late.",
          good: "Please note that breakfast is at 7:00 AM and the shuttle departs at 8:00 AM.",
        },
        {
          bad: "Hurry up for the bus.",
          good: "Would you mind reminding your group to be ready five minutes early?",
        },
      ],
      game: [
        {
          prompt: "Some of my group are always late. Can you help me with the bus?",
          options: [
            {
              text: "Would you mind reminding your group to be at the lobby five minutes before departure?",
              correct: true,
            },
            { text: "That's your job as the tour leader, not ours.", correct: false },
            { text: "The bus will simply leave without them.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const FB_WEEK_31: WeekContent = {
  departmentId: "FB",
  weekNumber: 31,
  weekTitleEn: "Presenting Local Cuisine & Coffee Culture",
  weekTitleVi: "Quảng Bá Văn Hóa Ẩm Thực Bản Địa (Culinary Storytelling)",
  // Pulled forward from Phases 0-3 so this hand-authored week joins the
  // spaced-recycling system instead of standing outside it.
  reviewWords: ["Menu", "Delicious", "Kitchen", "Chef", "Tasting menu", "Enjoy", "Sweet", "Guest"],
  lessons: [
    {
      lessonId: "FB_31_1",
      lessonOrder: 1,
      titleEn: "Explaining Heritage Dishes to Foreign Guests",
      titleVi: "Giới thiệu Món ăn Di sản cho Khách nước ngoài",
      vocabulary: [
        {
          word: "Broth",
          phonetic: "/brɒθ/",
          definition: "Nước dùng (nước lèo)",
          context: "Our beef Phở broth is simmered for many hours with spices.",
          icon: "🍲",
        },
        {
          word: "Simmer",
          phonetic: "/ˈsɪmə/",
          definition: "Ninh, hầm nhỏ lửa",
          context: "The bones are simmered slowly to make the broth rich and clear.",
          icon: "🔥",
        },
        {
          word: "Fresh herbs",
          phonetic: "/freʃ hɜːbz/",
          definition: "Rau thơm tươi",
          context: "Please add fresh herbs and a squeeze of lime to your Phở.",
          icon: "🌿",
        },
        {
          word: "Dipping sauce",
          phonetic: "/ˈdɪpɪŋ sɔːs/",
          definition: "Nước chấm",
          context: "Chả giò is served with a sweet and sour dipping sauce.",
          icon: "🥣",
        },
      ],
      grammar: [
        {
          rude: "Eat it like this.",
          polite: "You might like to try it this way, if you'd enjoy the full flavor.",
          rule: "'You might like to…' là gợi ý, không phải chỉ thị.",
        },
        {
          rude: "This has meat in it.",
          polite: "I should mention this dish contains beef, in case that's helpful to know.",
          rule: "'I should mention…' để chủ động cung cấp thông tin hữu ích một cách khéo léo.",
        },
      ],
      speaking: [
        {
          guestPrompt: "This smells wonderful. What exactly is in this Phở?",
          targetResponse:
            "Thank you! It's a beef broth simmered for hours with warm spices, served with rice noodles, fresh herbs, and lime.",
          helpTip:
            "Link 'simmered for' smoothly so the 'd' flows straight into 'for': 'simmer-dfor'.",
        },
      ],
      reading: {
        text: "MENU NOTE - BEEF PHỞ (PHỞ BÒ)\nBroth: Beef bones simmered 8 hours with star anise & cinnamon\nNoodles: Fresh flat rice noodles\nServed with: Fresh herbs, bean sprouts, lime, chili\nChef's Tip: Add herbs just before eating for the best aroma.",
        questions: [
          {
            q: "Nước dùng bò được ninh trong bao lâu?",
            options: ["A. 2 hours", "B. 8 hours", "C. 1 hour"],
            correct: 1,
          },
          {
            q: "Theo lời bếp trưởng, khi nào mới cho rau thơm vào?",
            options: [
              "A. While the broth is simmering",
              "B. Just before eating",
              "C. The night before",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Eat it like this.",
          good: "You might like to try it this way, if you'd enjoy the full flavor.",
        },
        {
          bad: "It has beef.",
          good: "I should mention this dish contains beef, in case that's helpful to know.",
        },
      ],
      game: [
        {
          prompt: "This looks delicious. What's actually in these spring rolls?",
          options: [
            {
              text: "They're filled with pork and vegetables, wrapped in rice paper, and served with a sweet and sour dipping sauce.",
              correct: true,
            },
            { text: "Just some meat, try it and see.", correct: false },
            { text: "I'm not sure, it's a house recipe.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FB_31_2",
      lessonOrder: 2,
      titleEn: "Guiding Guests Through Vietnamese Coffee Culture",
      titleVi: "Hướng dẫn Trải nghiệm Văn hóa Cà phê Việt Nam",
      vocabulary: [
        {
          word: "Robusta bean",
          phonetic: "/rəʊˈbʌstə biːn/",
          definition: "Hạt cà phê Robusta",
          context: "Vietnamese coffee is famous for its strong Robusta beans.",
          icon: "☕",
        },
        {
          word: "Condensed milk",
          phonetic: "/kənˈdenst mɪlk/",
          definition: "Sữa đặc",
          context: "Cà phê sữa đá is coffee mixed with sweet condensed milk.",
          icon: "🥛",
        },
        {
          word: "Wine by the glass",
          phonetic: "/waɪn baɪ ðə ɡlɑːs/",
          definition: "Rượu vang bán theo ly",
          context: "We also offer this wine by the glass if you would like to try it first.",
          icon: "🍷",
        },
        {
          word: "Steak doneness",
          phonetic: "/steɪk ˈdʌnnəs/",
          definition: "Độ chín của bò bít tết",
          context: "How would you like your steak doneness — rare, medium, or well done?",
          icon: "🥩",
        },
      ],
      grammar: [
        {
          rude: "Drink it slow, it's hot.",
          polite: "You'll find it's best enjoyed slowly, as it's served quite hot.",
          rule: "'You'll find it's best…' biến lời khuyên thành gợi mở, không phải cảnh cáo.",
        },
        {
          rude: "Wait, the coffee is dripping.",
          polite: "While the coffee is dripping, please feel free to relax and take in the aroma.",
          rule: "'While…' biến lúc chờ đợi thành trải nghiệm có người hướng dẫn.",
        },
      ],
      speaking: [
        {
          guestPrompt: "I've heard about egg coffee — is that really made with real egg?",
          targetResponse:
            "Yes, it is! The egg yolk is whisked with condensed milk until light and creamy, then poured over hot coffee.",
          helpTip:
            "Stress 'whisked' and 'creamy' to sound enthusiastic and make the description more inviting.",
        },
      ],
      reading: {
        text: "VIETNAMESE COFFEE MENU\nCà Phê Sữa Đá: Robusta coffee, condensed milk, served over ice\nCà Phê Trứng: Whisked egg yolk & condensed milk over hot coffee\nBạc Sỉu: Coffee with a higher ratio of condensed milk, less bitter\nBrewing Method: Traditional metal drip filter (phin), 4-5 minutes",
        questions: [
          {
            q: "Pha phin truyền thống mất bao lâu?",
            options: ["A. 4-5 minutes", "B. 30 seconds", "C. 1 hour"],
            correct: 0,
          },
          {
            q: "What makes Bạc Sỉu different from Cà Phê Sữa Đá?",
            options: [
              "A. It has no coffee at all",
              "B. It has a higher ratio of condensed milk",
              "C. It is always served hot",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Drink it slow, it's hot.",
          good: "You'll find it's best enjoyed slowly, as it's served quite hot.",
        },
        {
          bad: "Wait, it's still dripping.",
          good: "While the coffee is dripping, please feel free to relax and enjoy the aroma.",
        },
      ],
      game: [
        {
          prompt: "How long does it actually take to brew coffee with that little metal filter?",
          options: [
            {
              text: "The drip filter usually takes four to five minutes, so please feel free to relax while it slowly drips.",
              correct: true,
            },
            { text: "It's quick, just wait a second.", correct: false },
            { text: "I don't really know, I never make it myself.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FB_31_3",
      lessonOrder: 3,
      titleEn: "Gathering Allergy & Dietary Information",
      titleVi: "Khai thác Thông tin Dị ứng & Chế độ Ăn kiêng",
      vocabulary: [
        {
          word: "Allergic reaction",
          phonetic: "/əˈlɜːdʒɪk riˈækʃən/",
          definition: "Phản ứng dị ứng",
          context: "Please tell us if you've ever had an allergic reaction to seafood.",
          icon: "⚠️",
        },
        {
          word: "Vegetarian",
          phonetic: "/ˌvedʒɪˈteəriən/",
          definition: "Người ăn chay",
          context: "We have a separate vegetarian menu with plant-based dishes.",
          icon: "🥦",
        },
        {
          word: "Gluten-free",
          phonetic: "/ˈɡluːtən friː/",
          definition: "Không chứa gluten",
          context: "Our rice noodle dishes are naturally gluten-free.",
          icon: "🌾",
        },
        {
          word: "Cross-contamination",
          phonetic: "/krɒs kənˌtæmɪˈneɪʃən/",
          definition: "Nhiễm chéo (thực phẩm)",
          context: "We take extra care to avoid cross-contamination in the kitchen.",
          icon: "🧼",
        },
      ],
      grammar: [
        {
          rude: "Are you allergic to anything?",
          polite: "Before I take your order, may I check if there's anything you're allergic to?",
          rule: "Đặt câu hỏi theo khung 'Before I…, may I check…?' — nghe chu đáo chứ không như tra hỏi.",
        },
        {
          rude: "We can't guarantee that.",
          polite:
            "I'm not able to guarantee that completely, but I'll let the kitchen know right away.",
          rule: "Nêu giới hạn thì phải kèm ngay một hành động trấn an.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "I should mention I have a peanut allergy, and my husband doesn't eat gluten.",
          targetResponse:
            "Thank you so much for letting me know. I'll note both of those and speak with the kitchen to make sure your dishes are safe.",
          helpTip:
            "Keep your pitch calm and steady on 'thank you so much' — it reassures nervous guests.",
        },
      ],
      reading: {
        text: "GUEST DIETARY NOTE\nTable 14 - Mr. & Mrs. Carter\nMrs. Carter: Peanut allergy (severe)\nMr. Carter: Gluten-free diet\nKitchen Note: Use separate pan, avoid peanut oil, confirm all sauces before serving.",
        questions: [
          {
            q: "Bà Carter bị dị ứng gì?",
            options: ["A. Peanut allergy", "B. Seafood allergy", "C. Dairy allergy"],
            correct: 0,
          },
          {
            q: "Theo ghi chú, bếp phải làm gì trước khi phục vụ?",
            options: [
              "A. Nothing special",
              "B. Confirm all sauces and use a separate pan",
              "C. Add extra peanut oil",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Are you allergic to anything?",
          good: "Before I take your order, may I check if there's anything you're allergic to?",
        },
        {
          bad: "We can't guarantee that.",
          good: "I'm not able to guarantee that completely, but I'll let the kitchen know right away.",
        },
      ],
      game: [
        {
          prompt: "Just so you know, I'm allergic to shellfish, and my daughter is vegetarian.",
          options: [
            {
              text: "Thank you for telling me. I'll make a note of both and check with the kitchen to keep your dishes completely safe.",
              correct: true,
            },
            { text: "Okay, just avoid the seafood dishes yourselves.", correct: false },
            { text: "That's fine, don't worry about it.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FB_31_4",
      lessonOrder: 4,
      titleEn: "Recommending Signature Dishes",
      titleVi: "Đề xuất Món ăn Đặc sản Signature",
      vocabulary: [
        {
          word: "Signature dish",
          phonetic: "/ˈsɪɡnətʃə dɪʃ/",
          definition: "Món ăn đặc trưng, đặc sản của nhà hàng",
          context: "Our chef's signature dish is the grilled lemongrass beef.",
          icon: "⭐",
        },
        {
          word: "Recommend",
          phonetic: "/ˌrekəˈmend/",
          definition: "Đề xuất, gợi ý",
          context: "May I recommend a dish based on what you enjoy?",
          icon: "👌",
        },
        {
          word: "Spicy level",
          phonetic: "/ˈspaɪsi ˈlevəl/",
          definition: "Mức độ cay",
          context: "Would you prefer a mild or a spicy level for this dish?",
          icon: "🌶️",
        },
        {
          word: "Pair well with",
          phonetic: "/peə wel wɪð/",
          definition: "Kết hợp tốt với, hợp với",
          context: "This dish pairs well with a glass of chilled white wine.",
          icon: "🍷",
        },
      ],
      grammar: [
        {
          rude: "You should get this.",
          polite: "Based on what you've enjoyed so far, I'd suggest our signature lemongrass beef.",
          rule: "'Based on…, I'd suggest…' — tư vấn theo đúng nhu cầu khách, không áp đặt.",
        },
        {
          rude: "Everyone likes this one.",
          polite: "This is one of our most loved dishes, and it might suit your taste perfectly.",
          rule: "Từ rào như 'might suit' giúp gợi ý tự tin mà không nài ép.",
        },
      ],
      speaking: [
        {
          guestPrompt: "We love spicy food and fresh seafood — what would you recommend for us?",
          targetResponse:
            "In that case, I'd suggest our signature grilled squid with chili lime sauce — it's spicy, fresh, and a real guest favorite.",
          helpTip:
            "Stress 'signature' and 'favorite' to sound genuinely proud of the recommendation.",
        },
      ],
      reading: {
        text: "CHEF'S SIGNATURE RECOMMENDATIONS\nFor Spice Lovers: Grilled Squid with Chili Lime Sauce\nFor Vegetarian Guests: Stir-Fried Morning Glory with Tofu\nFor Special Occasions: Grilled Lemongrass Beef, pairs well with red wine\nNote: Ask about the guest's preferences before recommending a dish.",
        questions: [
          {
            q: "Món nào được gợi ý cho khách thích ăn cay?",
            options: [
              "A. Stir-Fried Morning Glory",
              "B. Grilled Squid with Chili Lime Sauce",
              "C. Grilled Lemongrass Beef",
            ],
            correct: 1,
          },
          {
            q: "Món bò nướng sả hợp với món gì?",
            options: ["A. Red wine", "B. Iced coffee", "C. Green tea"],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "You should get this.",
          good: "Based on what you've enjoyed so far, I'd suggest our signature lemongrass beef.",
        },
        {
          bad: "Everyone likes this one.",
          good: "This is one of our most loved dishes, and it might suit your taste perfectly.",
        },
      ],
      game: [
        {
          prompt: "We're vegetarian, but we'd still love something special tonight. Any ideas?",
          options: [
            {
              text: "For a memorable vegetarian dish, I'd recommend our stir-fried morning glory with tofu — it's fresh, flavorful, and a real favorite.",
              correct: true,
            },
            { text: "We don't have much for vegetarians, sorry.", correct: false },
            { text: "Just get the salad, it's fine.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const HK_WEEK_33: WeekContent = {
  departmentId: "HK",
  weekNumber: 33,
  weekTitleEn: "Express Laundry Service & Damage Disputes",
  weekTitleVi: "Dịch Vụ Giặt Là Cao Cấp & Tranh Chấp Đồ Vải",
  // Pulled forward from Phases 0-3 so this hand-authored week joins the
  // spaced-recycling system instead of standing outside it.
  reviewWords: [
    "Torn",
    "Damaged",
    "Disappointed",
    "Concern",
    "Charge",
    "Check",
    "Complimentary",
    "Extra charge",
  ],
  writing: WEEK33_WRITING_TASKS.HK,
  lessons: [
    {
      lessonId: "HK_33_1",
      lessonOrder: 1,
      titleEn: "Laundry Pick-up & Item Inspection",
      titleVi: "Nhận đồ giặt & Kiểm tra tình trạng",
      vocabulary: [
        {
          word: "Laundry bag",
          phonetic: "/ˈlɔːndri bæg/",
          definition: "Túi đựng đồ giặt",
          context: "Please place your laundry in this laundry bag.",
          icon: "👜",
        },
        {
          word: "Laundry list",
          phonetic: "/ˈlɔːndri lɪst/",
          definition: "Phiếu kê đồ giặt",
          context: "Could you fill out this laundry list before I collect your items?",
          icon: "📝",
        },
        {
          word: "Inspect",
          phonetic: "/ɪnˈspekt/",
          definition: "Kiểm tra kỹ lưỡng",
          context: "I need to inspect each item before sending it to the laundry.",
          icon: "🔍",
        },
        {
          word: "Stain",
          phonetic: "/steɪn/",
          definition: "Vết bẩn",
          context: "I noticed a small stain on this shirt, sir.",
          icon: "🔴",
        },
      ],
      grammar: [
        {
          rude: "Count your clothes.",
          polite: "Shall we count the items together, sir?",
          rule: "'Shall we…?' mời khách cùng làm một việc.",
        },
        {
          rude: "You have a stain here.",
          polite: "I've noticed a small mark here — would you like me to point it out?",
          rule: "Làm mềm nhận xét bằng 'I've noticed…' thay vì nói thẳng.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Here are my clothes for laundry. Can you check them now?",
          targetResponse:
            "Of course, sir. Let's go through each item together and note down the count and condition before I take them.",
          helpTip: "Link 'go through' smoothly — /ɡəʊ θruː/ — don't pause between the two words.",
        },
      ],
      reading: {
        text: "LAUNDRY PICK-UP RECORD\nRoom: 812\nGuest: Mr. Tanaka\nItems Collected: 3 Shirts, 2 Trousers, 1 Jacket\nCondition Noted: Small stain on 1 shirt collar\nCollected by: Housekeeping Attendant - Linh\nTime: 9:15 AM",
        questions: [
          {
            q: "Khách gửi giặt mấy chiếc quần?",
            options: ["A. 1", "B. 2", "C. 3"],
            correct: 1,
          },
          {
            q: "Trước khi nhận đồ đã ghi nhận tình trạng gì?",
            options: ["A. A missing button", "B. A torn sleeve", "C. A small stain on the collar"],
            correct: 2,
          },
        ],
      },
      arcade: [
        { bad: "Give me your clothes.", good: "May I collect your laundry items now, sir?" },
        {
          bad: "You didn't count this.",
          good: "I don't think this item was included in the count — shall we check again?",
        },
      ],
      game: [
        {
          prompt: "I'm in a rush — can you just take these without checking them first?",
          options: [
            {
              text: "I understand you're in a hurry, sir, but we still need to quickly count and note the condition of each item first.",
              correct: true,
            },
            { text: "Sure, we'll just take your word for it.", correct: false },
            { text: "No, come back later when you're not busy.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "HK_33_2",
      lessonOrder: 2,
      titleEn: "Laundry Service Tiers & Pricing",
      titleVi: "Phân hệ dịch vụ giặt là & Biểu phí",
      vocabulary: [
        {
          word: "Lost & Found",
          phonetic: "/lɒst ænd faʊnd/",
          definition: "Bộ phận quản lý đồ thất lạc",
          context: "I will send this item to Lost & Found for you.",
          icon: "🔍",
        },
        {
          word: "Dry cleaning",
          phonetic: "/draɪ ˈkliːnɪŋ/",
          definition: "Giặt khô",
          context: "This silk dress requires dry cleaning, not regular wash.",
          icon: "🧥",
        },
        {
          word: "Express service",
          phonetic: "/ɪkˈspres ˈsɜːvɪs/",
          definition: "Dịch vụ hỏa tốc",
          context: "Express service returns your laundry within 4 hours.",
          icon: "⚡",
        },
        {
          word: "Surcharge",
          phonetic: "/ˈsɜːtʃɑːdʒ/",
          definition: "Phụ phí",
          context: "A 50% surcharge applies for express service.",
          icon: "💰",
        },
      ],
      grammar: [
        {
          rude: "Express costs more.",
          polite:
            "Express service comes with an additional surcharge of 50%, if that works for you.",
          rule: "Nói về chi phí kèm theo bằng 'comes with' thay vì phán một câu về giá.",
        },
        {
          rude: "You must choose a service.",
          polite: "Which service would you prefer — regular, express, or dry cleaning?",
          rule: "Đưa lựa chọn bằng 'would you prefer', không ra lệnh.",
        },
      ],
      speaking: [
        {
          guestPrompt: "I need this suit back by tonight. What are my options?",
          targetResponse:
            "For same-day delivery, I'd recommend our express service. It carries a 50% surcharge, but your suit will be ready by 6 PM.",
          helpTip:
            "Stress the key numbers clearly — 'fifty percent' and 'six PM' — so the guest doesn't mishear the price or time.",
        },
      ],
      reading: {
        text: "HOTEL LAUNDRY SERVICE MENU\nRegular Wash: Ready in 24 hours - Standard Rate\nDry Cleaning: Ready in 24 hours - +30% of Standard Rate\nExpress Service: Ready in 4 hours - +50% of Standard Rate\nNote: Express orders placed after 6 PM will be delivered the next morning.",
        questions: [
          {
            q: "Giặt khô tính phụ thu bao nhiêu?",
            options: ["A. +50%", "B. +30%", "C. No extra charge"],
            correct: 1,
          },
          {
            q: "Đơn giặt nhanh đặt sau 18h thì sao?",
            options: [
              "A. It is cancelled",
              "B. It is delivered within 4 hours anyway",
              "C. It is delivered the next morning",
            ],
            correct: 2,
          },
        ],
      },
      arcade: [
        {
          bad: "Dry cleaning is expensive.",
          good: "Dry cleaning includes a 30% additional charge for the special care process.",
        },
        {
          bad: "You can't get it back today.",
          good: "For today's return, express service would be the best option, though it carries a surcharge.",
        },
      ],
      game: [
        {
          prompt: "Can I get my dress ready by tomorrow morning without paying the express fee?",
          options: [
            {
              text: "Yes, of course. Our regular wash service is ready in 24 hours, so it will be back well before tomorrow morning, at no extra charge.",
              correct: true,
            },
            { text: "No, express is the only fast option we have.", correct: false },
            { text: "That's not possible, you'll have to pay more.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "HK_33_3",
      lessonOrder: 3,
      titleEn: "Handling Damage Complaints",
      titleVi: "Xử lý khiếu nại đồ giặt bị hư hỏng",
      vocabulary: [
        {
          word: "Shrunk",
          phonetic: "/ʃrʌŋk/",
          definition: "Bị co rút (vải)",
          context: "I'm afraid this sweater has shrunk after washing.",
          icon: "📉",
        },
        {
          word: "Faded",
          phonetic: "/ˈfeɪdɪd/",
          definition: "Bị phai màu",
          context: "The color of this shirt has faded slightly.",
          icon: "🎨",
        },
        {
          word: "Missing button",
          phonetic: "/ˈmɪsɪŋ ˈbʌtn/",
          definition: "Cúc áo bị mất",
          context: "I noticed a missing button on your jacket, sir.",
          icon: "🔘",
        },
        {
          word: "Apologize",
          phonetic: "/əˈpɒlədʒaɪz/",
          definition: "Xin lỗi",
          context: "Please allow me to apologize for this inconvenience.",
          icon: "🙇",
        },
      ],
      grammar: [
        {
          rude: "It's not our fault.",
          polite:
            "Let me look into what may have caused this, and I sincerely apologize for the inconvenience.",
          rule: "Cách nói gián tiếp 'look into what may have caused' — nhận trách nhiệm xử lý mà không quy lỗi cho ai.",
        },
        {
          rude: "This always happens.",
          polite:
            "This isn't something we expect to happen, and I'd like to make it right for you.",
          rule: "'I'd like to…' thể hiện sẵn sàng xử lý, nghe chủ động chứ không phủi tay.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "My white shirt came back with a stain and one button is missing! This is unacceptable.",
          targetResponse:
            "I'm very sorry to hear that, sir. Let me take a look right away, and I'll personally make sure this is resolved for you.",
          helpTip:
            "Use a calm, falling intonation on 'I'm very sorry' to sound sincere, not rushed or defensive.",
        },
      ],
      reading: {
        text: "LAUNDRY DAMAGE INCIDENT REPORT\nRoom: 1204\nGuest: Ms. Delacroix\nItem: White cotton blouse\nIssue Reported: Faded color, missing button\nReported On: Return of laundry, 5:40 PM\nAction: Escalated to Housekeeping Supervisor for review",
        questions: [
          {
            q: "Khách phản ánh hai vấn đề gì?",
            options: [
              "A. Faded color and missing button",
              "B. Torn sleeve and wrong size",
              "C. Wrong item returned",
            ],
            correct: 0,
          },
          {
            q: "Sự việc được báo lên ai?",
            options: [
              "A. The Front Office Manager",
              "B. The Housekeeping Supervisor",
              "C. The Laundry Vendor directly",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "It's not our fault the shirt shrank.",
          good: "I understand your concern — let me check what may have happened with this item.",
        },
        {
          bad: "Things like this happen sometimes.",
          good: "I'm sorry this happened. Let me report it right away and find a solution for you.",
        },
      ],
      game: [
        {
          prompt: "My favorite sweater has shrunk, and now it doesn't even fit me anymore!",
          options: [
            {
              text: "I'm very sorry to hear that, madam. Let me report this right away and find out what happened so we can make it right for you.",
              correct: true,
            },
            { text: "That happens sometimes with wool, nothing we can do.", correct: false },
            { text: "Are you sure it isn't just the same size as before?", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "HK_33_4",
      lessonOrder: 4,
      titleEn: "Negotiating Compensation per SOP",
      titleVi: "Thương lượng đền bù theo quy định SOP",
      vocabulary: [
        {
          word: "Compensation",
          phonetic: "/ˌkɒmpənˈseɪʃən/",
          definition: "Sự bồi thường",
          context: "We would like to offer compensation for the damaged item.",
          icon: "💵",
        },
        {
          word: "Policy",
          phonetic: "/ˈpɒləsi/",
          definition: "Chính sách",
          context: "Our compensation policy covers up to 10 times the laundry fee.",
          icon: "📋",
        },
        {
          word: "Reimburse",
          phonetic: "/ˌriːɪmˈbɜːs/",
          definition: "Hoàn tiền",
          context: "We can reimburse you according to hotel policy.",
          icon: "🔄",
        },
        {
          word: "Par stock",
          phonetic: "/pɑː stɒk/",
          definition: "Định mức đồ vải/vật tư tiêu chuẩn cho mỗi phòng",
          context: "Each room keeps a par stock of two towel sets.",
          icon: "📦",
        },
      ],
      grammar: [
        {
          rude: "We can only give you this much.",
          polite:
            "According to our policy, we're able to offer up to this amount — may I get my supervisor to confirm the details?",
          rule: "'we're able to…' kèm đề nghị xin ý kiến cấp trên — biến giới hạn thành hướng giải quyết.",
        },
        {
          rude: "That's the maximum, take it or leave it.",
          polite:
            "I understand this may not fully cover the item's value, but this is the maximum our policy allows — I hope this helps.",
          rule: "Ghi nhận cảm xúc của khách bằng 'I understand…' trước khi nêu giới hạn chính sách.",
        },
      ],
      speaking: [
        {
          guestPrompt: "This shirt cost me $80. Your $20 compensation isn't enough.",
          targetResponse:
            "I completely understand, sir. Our policy allows compensation of up to 10 times the laundry fee, which comes to $20. Let me check with my supervisor if we can review this further for you.",
          helpTip:
            "Practice the phrase 'ten times the laundry fee' — stress 'ten times' clearly so the guest understands how the amount was calculated.",
        },
      ],
      reading: {
        text: "HOUSEKEEPING SOP - LAUNDRY COMPENSATION GUIDE\nMinor Damage (stain, small mark): Free re-cleaning\nMajor Damage (shrinkage, fading, tearing): Up to 10x the laundry service fee\nLost Item: Up to 10x the laundry service fee or replacement value, whichever is lower, pending Manager approval\nAll compensation above $50 requires Duty Manager sign-off.",
        questions: [
          {
            q: "Hư hỏng nhẹ như vết ố được bồi thường thế nào?",
            options: ["A. Cash refund", "B. Free re-cleaning", "C. 10x the laundry fee"],
            correct: 1,
          },
          {
            q: "Bồi thường trên 50 đô cần điều kiện gì?",
            options: [
              "A. Guest signature only",
              "B. Duty Manager sign-off",
              "C. No approval needed",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Twenty dollars, that's it.",
          good: "Our policy allows up to $20 in this case — let me see if my supervisor can review it further.",
        },
        {
          bad: "You can't get more than that.",
          good: "I hear your concern, sir. Let me escalate this to my supervisor to see what more we can do.",
        },
      ],
      game: [
        {
          prompt: "This dress cost me $150. A refund of the cleaning fee alone isn't fair.",
          options: [
            {
              text: "I completely understand, sir. Our policy allows compensation of up to 10 times the laundry fee. Let me check with my supervisor if we can review this further for you.",
              correct: true,
            },
            { text: "That's the maximum we can offer, end of discussion.", correct: false },
            {
              text: "You should have read our policy before sending it for cleaning.",
              correct: false,
            },
          ],
        },
      ],
    },
  ],
};

export const SW_WEEK_19: WeekContent = {
  departmentId: "SW",
  weekNumber: 19,
  weekTitleEn: "Pool & Private Cabana Elite Service",
  weekTitleVi: "Điều Phối Khu Vực Hồ Bơi/Bãi Biển & Cảnh Báo An Toàn",
  reviewWords: [
    "Locker",
    "Robe",
    "Swimming pool",
    "Bath towel",
    "Slippery",
    "Pool attendant",
    "Shower",
    "Appointment",
  ],
  lessons: [
    {
      lessonId: "SW_19_1",
      lessonOrder: 1,
      titleEn: "Towel Station Service & Cabana Directions",
      titleVi: "Phục vụ tại Quầy Khăn & Hướng dẫn Cabana",
      vocabulary: [
        {
          word: "Towel station",
          phonetic: "/ˈtaʊəl ˈsteɪʃən/",
          definition: "Quầy phát khăn",
          context: "You can pick up fresh towels at the towel station near the pool entrance.",
          icon: "🧺",
        },
        {
          word: "Locker",
          phonetic: "/ˈlɒkə/",
          definition: "Tủ đồ có khóa",
          context: "Your locker number is printed on this key card.",
          icon: "🔐",
        },
        {
          word: "Cabana",
          phonetic: "/kəˈbænə/",
          definition: "Nhà nghỉ mát riêng bên hồ bơi",
          context: "This private cabana is reserved for you until 5 p.m.",
          icon: "🏖️",
        },
        {
          word: "Key card",
          phonetic: "/kiː kɑːd/",
          definition: "Thẻ chìa khóa",
          context: "This key card opens both your locker and the private cabana.",
          icon: "🗝️",
        },
      ],
      grammar: [
        {
          rude: "Towels are over there.",
          polite: "Fresh towels are at the station past the pool bar. Please help yourself.",
          rule: "Chỉ chỗ xong thêm 'Please help yourself' để lời chỉ dẫn thành lời mời.",
        },
        {
          rude: "Use your key for the locker.",
          polite: "Your room key card will open the locker for you.",
          rule: "Câu tương lai 'will open' đưa thông tin trung tính, dễ tiếp nhận.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Where can I get a towel, and do you have private cabanas?",
          targetResponse:
            "Of course! Fresh towels are at the station over there. I would be happy to show you a private cabana.",
          helpTip:
            "Link 'towel station' smoothly as one phrase — don't pause between the two words.",
        },
      ],
      reading: {
        text: "POOL AREA GUEST GUIDE\nTowel Station: Located at the pool entrance, open 7:00 AM - 7:00 PM\nLockers: Complimentary, use your room key card\nPrivate Cabanas: Reserve at least 2 hours in advance at the Pool Bar\nLost your key card? Please inform any pool attendant immediately.",
        questions: [
          {
            q: "Khách cần gì để dùng tủ khóa?",
            options: ["A. A separate rental fee", "B. Their room key card", "C. A signed form"],
            correct: 1,
          },
          {
            q: "Cần đặt chòi riêng trước bao lâu?",
            options: ["A. At least 30 minutes", "B. At least 2 hours", "C. One full day"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Towels are over there.",
          good: "You'll find fresh towels at the towel station just past the pool bar.",
        },
        {
          bad: "Use your key for the locker.",
          good: "Your room key card will open the locker for you.",
        },
      ],
      game: [
        {
          prompt: "Is there somewhere to get towels and a shaded seat?",
          options: [
            {
              text: "Of course! Fresh towels are at the station over there. I would be happy to show you a private cabana.",
              correct: true,
            },
            { text: "Towels are over there, and cabanas are full today.", correct: false },
            { text: "I'm not sure, please ask another staff member.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "SW_19_2",
      lessonOrder: 2,
      titleEn: "Pool Safety Rules: Children & Swimwear",
      titleVi: "Nội quy An toàn Hồ bơi: Trẻ em & Trang phục",
      vocabulary: [
        {
          word: "Policy",
          phonetic: "/ˈpɒləsi/",
          definition: "Quy định, chính sách",
          context: "Our pool policy requires children under 12 to be supervised.",
          icon: "📜",
        },
        {
          word: "Supervise",
          phonetic: "/ˈsuːpəvaɪz/",
          definition: "Giám sát",
          context: "Please supervise your children closely near the pool.",
          icon: "👀",
        },
        {
          word: "Swimwear",
          phonetic: "/ˈswɪmweə/",
          definition: "Trang phục bơi",
          context: "Proper swimwear is required in the pool area.",
          icon: "🩱",
        },
        {
          word: "Lifeguard",
          phonetic: "/ˈlaɪfɡɑːd/",
          definition: "Nhân viên cứu hộ",
          context: "Our lifeguard is on duty from 7 a.m. to 7 p.m.",
          icon: "🛟",
        },
      ],
      grammar: [
        {
          rude: "Your kid needs an adult with him.",
          polite:
            "I'm afraid children under 12 must be with an adult. That applies in the pool area.",
          rule: "'I'm afraid…' làm mềm khi phải nêu quy định bắt buộc.",
        },
        {
          rude: "You can't wear that in the pool.",
          polite: "Would you mind changing into proper swimwear before entering the pool, please?",
          rule: "'Would you mind + V-ing…?' để đề nghị khách thay đổi hành vi một cách lịch sự.",
        },
      ],
      speaking: [
        {
          guestPrompt: "My son is 8. Can he swim by himself while I relax here?",
          targetResponse:
            "I'm afraid children under 12 must be with an adult, sir. Our lifeguard is also on duty to help.",
          helpTip:
            "Stress the words 'under 12' clearly so the guest understands the exact age policy.",
        },
      ],
      reading: {
        text: "SUNSET POOL - HOUSE RULES\n1. Children under 12 must be accompanied by an adult at all times.\n2. Proper swimwear is required; no jeans or plain t-shirts in the water.\n3. Diving is not permitted in the shallow end.\n4. Lifeguard on duty: 7:00 AM - 7:00 PM daily.",
        questions: [
          {
            q: "Theo nội quy, trẻ dưới 12 tuổi xuống hồ phải có ai đi kèm?",
            options: ["A. A swimming certificate", "B. An adult", "C. A pool pass"],
            correct: 1,
          },
          {
            q: "Ở khu nước nông không được làm gì?",
            options: ["A. Diving", "B. Floating", "C. Standing"],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "No jeans allowed.",
          good: "I'm afraid jeans aren't considered proper swimwear for the pool.",
        },
        {
          bad: "Watch your kid.",
          good: "Could you please keep a close eye on your child while he's in the water?",
        },
      ],
      game: [
        {
          prompt: "My daughter is 9. May she go in the water alone?",
          options: [
            {
              text: "I'm afraid children under 12 must be with an adult, sir. Our lifeguard is also on duty to help.",
              correct: true,
            },
            { text: "Sure, no problem, just relax.", correct: false },
            { text: "Kids can't swim here at all.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "SW_19_3",
      lessonOrder: 3,
      titleEn: "Severe Weather & Red Flag Warnings",
      titleVi: "Cảnh báo Thời tiết Nguy hiểm & Cờ đỏ",
      vocabulary: [
        {
          word: "Warning",
          phonetic: "/ˈwɔːnɪŋ/",
          definition: "Cảnh báo",
          context: "We have issued a storm warning for this afternoon.",
          icon: "⚠️",
        },
        {
          word: "Rough sea",
          phonetic: "/rʌf siː/",
          definition: "Biển động",
          context: "Swimming is not allowed today because of the rough sea.",
          icon: "🌊",
        },
        {
          word: "Red flag",
          phonetic: "/red flæg/",
          definition: "Cờ đỏ (cấm bơi)",
          context: "When the red flag is up, guests must stay out of the water.",
          icon: "🚩",
        },
        {
          word: "Current",
          phonetic: "/ˈkɜːrənt/",
          definition: "Dòng chảy (nước)",
          context: "Strong currents can be dangerous for swimmers today.",
          icon: "🌀",
        },
      ],
      grammar: [
        {
          rude: "The sea is too dangerous today.",
          polite: "For your safety, swimming is not recommended today due to rough sea conditions.",
          rule: "Mở đầu lời cảnh báo bằng 'For your safety, …' — quan tâm chứ không hù dọa.",
        },
        {
          rude: "You can't swim, the flag is red.",
          polite: "I'm sorry, sir. Guests may not enter the water now. The red flag is displayed.",
          rule: "Bị động 'are not permitted' nêu quy định trang trọng hơn 'can't'.",
        },
      ],
      speaking: [
        {
          guestPrompt: "The weather looks fine to me. Why can't I go swimming?",
          targetResponse:
            "I understand, sir. The sea is too rough today. The red flag is up, so swimming is not allowed.",
          helpTip:
            "Keep your pitch gentle and falling on 'I understand, sir' so the warning sounds caring, not commanding.",
        },
      ],
      reading: {
        text: "RESORT SAFETY BULLETIN\nStatus: RED FLAG - Tropical Storm Approaching\nSea Condition: Strong currents and rough waves expected until 6:00 PM\nSwimming: Prohibited in the ocean; pool remains open\nGuests are advised to stay on the beach deck and avoid the shoreline.",
        questions: [
          {
            q: "Cờ đỏ cảnh báo cấm điều gì?",
            options: [
              "A. Swimming in the ocean",
              "B. Sitting on the beach deck",
              "C. Using the pool",
            ],
            correct: 0,
          },
          {
            q: "Trong lúc có cảnh báo, khu nào vẫn mở?",
            options: ["A. The beach shoreline", "B. The pool", "C. The private cabanas"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "No swimming, the sea's bad.",
          good: "For your safety, we ask all guests to avoid swimming until the sea calms down.",
        },
        {
          bad: "Stay out, red flag's up.",
          good: "I'm sorry, but the red flag means guests are not permitted to swim right now.",
        },
      ],
      game: [
        {
          prompt: "Other guests are in the water. Why can't we swim?",
          options: [
            {
              text: "I understand, sir. The sea is too rough today. The red flag is up, so swimming is not allowed.",
              correct: true,
            },
            { text: "Rules are rules, no swimming today.", correct: false },
            { text: "The weather is fine, you can swim if you want.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "SW_19_4",
      lessonOrder: 4,
      titleEn: "Basic Beach First Aid: Cramps & Heat Exhaustion",
      titleVi: "Sơ cứu Cơ bản tại Bãi biển: Chuột rút & Say nắng",
      vocabulary: [
        {
          word: "Cramp",
          phonetic: "/kræmp/",
          definition: "Chuột rút",
          context: "If you feel a cramp in your leg, please signal our lifeguard right away.",
          icon: "🦵",
        },
        {
          word: "Heat exhaustion",
          phonetic: "/hiːt ɪɡˈzɔːstʃən/",
          definition: "Say nắng, kiệt sức do nóng",
          context: "Heat exhaustion can happen quickly under the tropical sun.",
          icon: "🥵",
        },
        {
          word: "Dizzy",
          phonetic: "/ˈdɪzi/",
          definition: "Chóng mặt",
          context: "Please tell us immediately if you feel dizzy or nauseous.",
          icon: "😵",
        },
        {
          word: "Shade",
          phonetic: "/ʃeɪd/",
          definition: "Bóng râm",
          context: "Let's move you to the shade so you can cool down.",
          icon: "⛱️",
        },
      ],
      grammar: [
        {
          rude: "Sit down, you're sick.",
          polite: "Let's get you into the shade and have a seat right away, sir.",
          rule: "'Let's…' cùng khách hành động, nghe quan tâm chứ không ra lệnh.",
        },
        {
          rude: "Drink water, you're dehydrated.",
          polite: "Please try to drink some water slowly. I will bring you a cool towel.",
          rule: "'Please try to…' kèm một câu trấn an để hướng dẫn khách trong tình huống khẩn.",
        },
      ],
      speaking: [
        {
          guestPrompt: "I feel really dizzy and my leg is cramping.",
          targetResponse:
            "Let's get you into the shade right away, sir. Please sit down slowly. I will bring water now.",
          helpTip:
            "Speak slowly and lower your pitch slightly — a calm voice reassures a guest who feels unwell.",
        },
      ],
      reading: {
        text: "BEACH FIRST AID - QUICK GUIDE\nHeat Exhaustion Signs: Dizziness, heavy sweating, weakness\nAction: Move guest to shade, offer water, loosen tight clothing\nMuscle Cramps: Gently stretch the affected muscle, apply light massage\nAlways call the on-duty nurse for serious cases: Ext. 115",
        questions: [
          {
            q: "Gặp khách bị say nắng, việc đầu tiên phải làm là gì?",
            options: [
              "A. Give them coffee",
              "B. Move them to the shade",
              "C. Ask them to keep swimming",
            ],
            correct: 1,
          },
          {
            q: "Ca nặng thì gọi số máy lẻ nào?",
            options: ["A. Ext. 100", "B. Ext. 115", "C. Ext. 911"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Sit down, you're sick.",
          good: "Let's get you into the shade and have a seat right away, sir.",
        },
        {
          bad: "Drink water, you're dehydrated.",
          good: "Please try to drink some water slowly. I will bring you a cool towel.",
        },
      ],
      game: [
        {
          prompt: "I feel very hot and a bit faint right now.",
          options: [
            {
              text: "Let's get you into the shade right away, sir. Please sit down slowly. I will bring water now.",
              correct: true,
            },
            { text: "You'll be fine, just keep walking.", correct: false },
            { text: "Please wait here, I'll be back later.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const GR_WEEK_34: WeekContent = {
  departmentId: "GR",
  weekNumber: 34,
  weekTitleEn: "Milestone Surprise Execution",
  weekTitleVi: "Thiết Kế Trải Nghiệm Bất Ngờ (Milestone Moments)",
  // Pulled forward from Phases 0-3 so this hand-authored week joins the
  // spaced-recycling system instead of standing outside it.
  reviewWords: [
    "Special",
    "Ask the manager",
    "Arrange",
    "Decorate",
    "Follow up",
    "Photo",
    "Elegant",
    "Before dinner",
  ],
  lessons: [
    {
      lessonId: "GR_34_1",
      lessonOrder: 1,
      titleEn: "Discovering Special Occasions",
      titleVi: "Khai thác thông tin để phát hiện dịp đặc biệt",
      vocabulary: [
        {
          word: "Occasion",
          phonetic: "/əˈkeɪʒən/",
          definition: "Dịp, sự kiện đặc biệt",
          context: "Are you celebrating a special occasion with us?",
          icon: "🎉",
        },
        {
          word: "Anniversary",
          phonetic: "/ˌænɪˈvɜːsəri/",
          definition: "Ngày kỷ niệm",
          context: "Congratulations on your wedding anniversary!",
          icon: "💍",
        },
        {
          word: "Honeymoon",
          phonetic: "/ˈhʌnimuːn/",
          definition: "Tuần trăng mật",
          context: "I noticed you're here on your honeymoon.",
          icon: "🌙",
        },
        {
          word: "Milestone",
          phonetic: "/ˈmaɪlstəʊn/",
          definition: "Cột mốc quan trọng",
          context: "We would love to celebrate this milestone with you.",
          icon: "🏆",
        },
      ],
      grammar: [
        {
          rude: "Why are you here?",
          polite: "May I ask if you're celebrating anything special during your stay?",
          rule: "Câu hỏi gián tiếp với 'if' làm mềm câu hỏi riêng tư — quan tâm chứ không tọc mạch.",
        },
        {
          rude: "Is this your honeymoon?",
          polite: "I couldn't help but notice the lovely bouquet — are you newlyweds, perhaps?",
          rule: "Thêm trạng từ rào 'perhaps' để lời phỏng đoán thành nhận xét nhã nhặn.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Actually, we just got married last week! This is our honeymoon.",
          targetResponse:
            "Congratulations to you both! It would be our pleasure to make your stay extra special. May I ask if there's anything specific you'd love us to prepare?",
          helpTip:
            "Link 'Congratulations to' smoothly — the /s/ sound flows straight into 'to' without a pause, keeping the phrase warm and natural.",
        },
      ],
      reading: {
        text: "GUEST PROFILE NOTE – GR OBSERVATION LOG\nRoom: 812\nGuest: Mr. & Mrs. Tran\nObservation: Guest mentioned \"first anniversary trip\" during check-in small talk.\nGuests wearing matching rings, asked concierge about rose petal options.\nAction: Flag profile as 'Anniversary – Day 2 of stay'. Notify GR Manager for surprise planning.",
        questions: [
          {
            q: "Dấu hiệu nào khiến nhân viên đoán khách đang có dịp đặc biệt?",
            options: [
              'A. They mentioned a "first anniversary trip"',
              "B. They asked for extra towels",
              "C. They requested a late checkout",
            ],
            correct: 0,
          },
          {
            q: "Sau khi nhận ra điều đó, nhân viên nên làm gì?",
            options: [
              "A. Ignore it and continue as normal",
              "B. Flag the profile and notify the GR Manager",
              "C. Ask the guests to confirm in writing",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Why are you two here together?",
          good: "Are you celebrating something special with us this trip?",
        },
        {
          bad: "Is that your wife?",
          good: "May I ask, are you two celebrating an anniversary or something special?",
        },
      ],
      game: [
        {
          prompt: "It's actually my fortieth birthday this weekend, if you must know!",
          options: [
            {
              text: "What a wonderful milestone to celebrate, sir! It would be our pleasure to make this stay special — is there anything in particular you'd enjoy?",
              correct: true,
            },
            { text: "Happy birthday. Anyway, here are your keys.", correct: false },
            { text: "Oh, okay. Enjoy your stay then.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "GR_34_2",
      lessonOrder: 2,
      titleEn: "Coordinating with Kitchen & Housekeeping",
      titleVi: "Phối hợp nội bộ với Bếp và Housekeeping",
      vocabulary: [
        {
          word: "Coordinate",
          phonetic: "/kəʊˈɔːdɪneɪt/",
          definition: "Phối hợp",
          context: "I will coordinate with the kitchen for the cake.",
          icon: "🤝",
        },
        {
          word: "Set-up",
          phonetic: "/ˈset ʌp/",
          definition: "Sự bài trí, thiết lập",
          context: "The romantic set-up will be ready by 6 PM.",
          icon: "🛏️",
        },
        {
          word: "Petal",
          phonetic: "/ˈpetl/",
          definition: "Cánh hoa",
          context: "We will decorate the bed with rose petals.",
          icon: "🌹",
        },
        {
          word: "Amenity",
          phonetic: "/əˈmenɪti/",
          definition: "Tiện nghi/quà tặng đi kèm",
          context: "Please prepare the anniversary amenity for Room 812.",
          icon: "🎁",
        },
      ],
      grammar: [
        {
          rude: "Send a cake to room 812.",
          polite: "Could you please arrange for a cake to be sent to Room 812 by 6 PM?",
          rule: "Bị động 'to be sent' làm yêu cầu nội bộ nghe chuyên nghiệp, cùng phối hợp chứ không ra lệnh.",
        },
        {
          rude: "I need towels for the bed now.",
          polite:
            "Would it be possible to have the towel decoration set up before the guests return?",
          rule: "'Would it be possible to…?' là cách nhờ đồng nghiệp gián tiếp và rất lịch sự.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "Housekeeping here. We only have white towels left, no red ones for the heart shape. What should we do?",
          targetResponse:
            "That's fine, please use the white towels for now and add extra rose petals for color. Thank you for letting me know.",
          helpTip:
            "Practice the linking sound in 'letting me know' — the /ŋ/ blends softly into 'me', so avoid pronouncing a hard 'g' at the end of 'letting'.",
        },
      ],
      reading: {
        text: 'INTERNAL COORDINATION SLIP – SPECIAL SET-UP\nRoom: 1205\nOccasion: Wedding Anniversary\nRequested by: GR Team\nKitchen: 1 heart-shaped chocolate cake, "Happy Anniversary" in red icing, deliver 6:45 PM\nHousekeeping: Rose petal bed decoration + 2 candles, complete by 6:30 PM\nGR: Confirm room access with guest before 6:15 PM',
        questions: [
          {
            q: "Buồng phòng phải trang trí xong trước mấy giờ?",
            options: ["A. 6:15 PM", "B. 6:30 PM", "C. 6:45 PM"],
            correct: 1,
          },
          {
            q: "GR phải xác nhận điều gì trước 18h15?",
            options: ["A. Room access with the guest", "B. The cake flavor", "C. The candle color"],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Just bring the cake whenever.",
          good: "Could you please deliver the cake by 6:45 PM sharp?",
        },
        {
          bad: "Housekeeping, do the flowers now.",
          good: "Housekeeping, would you be able to complete the flower set-up by 6:30 PM?",
        },
      ],
      game: [
        {
          prompt:
            "Kitchen here. We're out of red velvet, but we do have a chocolate cake ready. What should we tell the guest?",
          options: [
            {
              text: "That's fine, please send the chocolate cake instead and let me update the guest myself. Thank you for checking with me.",
              correct: true,
            },
            { text: "Just send whatever you have, don't tell me.", correct: false },
            { text: "Cancel the whole cake order then.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "GR_34_3",
      lessonOrder: 3,
      titleEn: "Presenting the Gift with Elegant Words",
      titleVi: "Trao quà và lời chúc mừng nghệ thuật, quý phái",
      vocabulary: [
        {
          word: "Present",
          phonetic: "/prɪˈzent/",
          definition: "Trao tặng (một cách trang trọng)",
          context: "Allow me to present this gift on behalf of our hotel.",
          icon: "🎀",
        },
        {
          word: "Heartfelt",
          phonetic: "/ˈhɑːtfelt/",
          definition: "Chân thành, từ đáy lòng",
          context: "Please accept our heartfelt congratulations.",
          icon: "💖",
        },
        {
          word: "Honor",
          phonetic: "/ˈɒnə/",
          definition: "Vinh dự",
          context: "It is our honor to celebrate this special day with you.",
          icon: "🙌",
        },
        {
          word: "Cherish",
          phonetic: "/ˈtʃerɪʃ/",
          definition: "Trân trọng, nâng niu",
          context: "May you always cherish this beautiful moment.",
          icon: "✨",
        },
      ],
      grammar: [
        {
          rude: "Here's your cake.",
          polite:
            "On behalf of our entire team, we are delighted to present this cake to celebrate your special day.",
          rule: "'On behalf of…' kèm 'delighted to' nâng một lời trao tặng thành nghi thức trang trọng.",
        },
        {
          rude: "Happy anniversary. Enjoy.",
          polite:
            "May your love continue to grow, and may this anniversary be the first of many more to celebrate together.",
          rule: "Mở lời chúc bằng 'May…' tạo câu chúc trang trọng, có vần điệu.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "Oh my goodness, you didn't have to do all this! This is beautiful, thank you so much!",
          targetResponse:
            "It is truly our honor, madam. On behalf of the entire team, we wish you both a lifetime of happiness. Congratulations once again.",
          helpTip:
            "Stress the words 'truly' and 'honor' with a slight rise in pitch — this rising intonation adds sincerity and warmth to the compliment.",
        },
      ],
      reading: {
        text: 'MILESTONE MOMENT – PRESENTATION CHECKLIST\n1. Confirm guest is in the room before entering\n2. Knock, announce "Guest Relations" politely\n3. Present cake/gift with both hands\n4. Deliver congratulatory speech (use guest\'s name)\n5. Offer photo assistance if guest wishes\n6. Exit graciously, wish them a wonderful evening',
        questions: [
          {
            q: "Khi bưng bánh hoặc quà vào phòng, phải cầm thế nào?",
            options: ["A. With both hands", "B. Behind their back", "C. On a rolling cart only"],
            correct: 0,
          },
          {
            q: "Bước 2 trong checklist là gì?",
            options: [
              "A. Offer photo assistance",
              "B. Knock and announce politely",
              "C. Exit the room",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Congrats. Bye.",
          good: "Congratulations once again — please enjoy this special evening together.",
        },
        {
          bad: "Here, take this.",
          good: "Please allow me to present this small gift to celebrate your milestone.",
        },
      ],
      game: [
        {
          prompt:
            "This is wonderful. Would it be possible for someone to take a photo of us with the cake?",
          options: [
            {
              text: "It would be our absolute pleasure, madam. Allow me to take a lovely photo of this special moment for you both.",
              correct: true,
            },
            { text: "Sure, but I'm quite busy right now.", correct: false },
            { text: "I'm not really good with cameras, sorry.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "GR_34_4",
      lessonOrder: 4,
      titleEn: "Recovering from a Surprise Set-up Error",
      titleVi: "Xử lý khi set-up bất ngờ bị lỗi",
      vocabulary: [
        {
          word: "Misspell",
          phonetic: "/ˌmɪsˈspel/",
          definition: "Viết sai chính tả",
          context: "We noticed the guest's name was misspelled on the card.",
          icon: "✏️",
        },
        {
          word: "Apologize",
          phonetic: "/əˈpɒlədʒaɪz/",
          definition: "Xin lỗi",
          context: "Please allow me to sincerely apologize for this mistake.",
          icon: "🙇",
        },
        {
          word: "Replace",
          phonetic: "/rɪˈpleɪs/",
          definition: "Thay thế",
          context: "We will replace the cake immediately at no charge.",
          icon: "🔄",
        },
        {
          word: "Resolve",
          phonetic: "/rɪˈzɒlv/",
          definition: "Giải quyết (vấn đề)",
          context: "Our team is already working to resolve this issue.",
          icon: "🛠️",
        },
      ],
      grammar: [
        {
          rude: "We made a mistake with your cake.",
          polite:
            "I am so sorry — it seems there has been a mix-up with your cake, and we are correcting it right away.",
          rule: "Cụm bị động gián tiếp 'it seems there has been…' làm nhẹ việc thừa nhận lỗi của nhân viên.",
        },
        {
          rude: "We spelled your name wrong. Sorry.",
          polite:
            "I do apologize for the error on your card; may we prepare a corrected one for you immediately?",
          rule: "Sau lời xin lỗi dùng 'may we…' để đề nghị ngay giải pháp, giữ trọng tâm vào việc khắc phục.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "Um, this isn't the cake we ordered, and my wife's name is spelled wrong on the card too.",
          targetResponse:
            "I sincerely apologize for this mix-up, sir. Please allow us five minutes to bring the correct cake with a new card, prepared exactly as you requested.",
          helpTip:
            "Link 'sincerely apologize' smoothly, letting the final /i/ of 'sincerely' flow straight into 'apologize' without a pause, to sound calm and genuine.",
        },
      ],
      reading: {
        text: 'GR INCIDENT LOG – SET-UP ERROR\nRoom: 1508\nIssue: Kitchen delivered chocolate cake instead of requested vanilla; guest name "Nguyen" printed as "Nguyan" on card\nAction Taken: GR apologized immediately, contacted Kitchen for replacement within 10 minutes, complimentary bottle of wine offered\nFollow-up: Manager to review order-confirmation process with Kitchen team',
        questions: [
          {
            q: "Sự cố này mô tả lỗi gì?",
            options: [
              "A. Wrong cake flavor and a misspelled name",
              "B. Late delivery only",
              "C. Wrong room number",
            ],
            correct: 0,
          },
          {
            q: "GR đã tặng khách gì để bày tỏ thiện chí?",
            options: [
              "A. A room discount",
              "B. A complimentary bottle of wine",
              "C. A free extra night",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "That's what the kitchen sent us, not our fault.",
          good: "I am so sorry for this error — let me fix it for you right away.",
        },
        {
          bad: "Oh well, we'll try to fix the name next time.",
          good: "May we prepare a corrected card for you immediately, free of charge?",
        },
      ],
      game: [
        {
          prompt:
            "This isn't quite what we asked for — we wanted rose petals, not orchids, on the bed.",
          options: [
            {
              text: "I sincerely apologize for this mix-up, madam. Please allow me a few minutes to arrange the correct rose petals exactly as you requested.",
              correct: true,
            },
            { text: "Orchids look nicer anyway, don't you think?", correct: false },
            { text: "We can fix that tomorrow if you like.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const BO_WEEK_38: WeekContent = {
  departmentId: "BO",
  weekNumber: 38,
  weekTitleEn: "MICE & Event Proposal Pitching (BEO)",
  weekTitleVi: "Đấu Thầu Sự Kiện MICE & Ký Kết Văn Bản BEO",
  // Pulled forward from Phases 0-3 so this hand-authored week joins the
  // spaced-recycling system instead of standing outside it.
  reviewWords: [
    "Meeting room",
    "Meeting package",
    "Projector",
    "Confirm the booking",
    "Room block",
    "Company tax code",
    "Corporate rate",
    "Volume contract",
  ],
  lessons: [
    {
      lessonId: "BO_38_1",
      lessonOrder: 1,
      titleEn: "Receiving the RFP & Building a Cost Estimate",
      titleVi: "Tiếp nhận RFP & Xây dựng bảng dự toán",
      vocabulary: [
        {
          word: "Request for Proposal (RFP)",
          phonetic: "/rɪˈkwest fɔː prəˈpəʊzəl/",
          definition: "Văn bản yêu cầu chào giá",
          context: "We received an RFP from a corporation for their annual conference.",
          icon: "📄",
        },
        {
          word: "Cost estimate",
          phonetic: "/kɔːst ˈestɪmət/",
          definition: "Bảng dự toán chi phí",
          context: "I will prepare a cost estimate based on your requirements.",
          icon: "💰",
        },
        {
          word: "Corporate client",
          phonetic: "/ˈkɔːpərət ˈklaɪənt/",
          definition: "Khách hàng doanh nghiệp",
          context: "Our corporate clients often book the Grand Ballroom.",
          icon: "🏢",
        },
        {
          word: "Budget",
          phonetic: "/ˈbʌdʒɪt/",
          definition: "Ngân sách",
          context: "Could you tell me your budget for this event?",
          icon: "💵",
        },
      ],
      grammar: [
        {
          rude: "How much money do you have?",
          polite: "Could you share your estimated budget for this event?",
          rule: "'Could you share…?' hỏi thông tin nhạy cảm một cách gián tiếp.",
        },
        {
          rude: "Send me the RFP now.",
          polite: "Would you be able to send us the RFP at your earliest convenience?",
          rule: "'Would you be able to…?' dùng động từ khuyết thiếu để làm mềm lời đề nghị.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "We are planning a 3-day conference for 200 delegates. Can you send us a proposal?",
          targetResponse:
            "Certainly. I will prepare a detailed cost estimate based on your requirements and send it to you within 24 hours.",
          helpTip: "Link the words in 'send it to you' smoothly — it sounds like 'sen-di-tuh-you'.",
        },
      ],
      reading: {
        text: "REQUEST FOR PROPOSAL\nCompany: Saigon Tech Corporation\nEvent: Annual Sales Conference\nDelegates: 200 pax\nDates: 15-17 October\nBudget Range: $15,000 - $20,000\nDeadline for Proposal: 25 July",
        questions: [
          {
            q: "Hội nghị có bao nhiêu đại biểu tham dự?",
            options: ["A. 15", "B. 200", "C. 20"],
            correct: 1,
          },
          {
            q: "Hạn nộp đề xuất là khi nào?",
            options: ["A. 15 October", "B. 17 October", "C. 25 July"],
            correct: 2,
          },
        ],
      },
      arcade: [
        { bad: "Give me your budget.", good: "Could you share your estimated budget with us?" },
        {
          bad: "We don't know the price yet.",
          good: "We will confirm the final price once we finalize the details.",
        },
      ],
      game: [
        {
          prompt:
            "We're organizing a one-day workshop for eighty people. Could you prepare a quote for us?",
          options: [
            {
              text: "Certainly. I'll put together a detailed cost estimate for your workshop and send it over within twenty-four hours.",
              correct: true,
            },
            { text: "We don't handle events that small.", correct: false },
            { text: "You'll need to call our sales office yourself.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "BO_38_2",
      lessonOrder: 2,
      titleEn: "Site Inspection & Seating Layouts",
      titleVi: "Khảo sát mặt bằng & Sơ đồ setup bàn ghế",
      vocabulary: [
        {
          word: "Site inspection",
          phonetic: "/saɪt ɪnˈspekʃən/",
          definition: "Khảo sát mặt bằng",
          context: "Let's begin the site inspection in our main ballroom.",
          icon: "🔍",
        },
        {
          word: "Seating layout",
          phonetic: "/ˈsiːtɪŋ ˈleɪaʊt/",
          definition: "Sơ đồ bố trí bàn ghế",
          context: "This seating layout works well for large conferences.",
          icon: "🪑",
        },
        {
          word: "Theater style",
          phonetic: "/ˈθiːətə staɪl/",
          definition: "Kiểu rạp hát (ghế xếp hàng)",
          context: "Theater style is best for a keynote presentation.",
          icon: "🎭",
        },
        {
          word: "Capacity",
          phonetic: "/kəˈpæsɪti/",
          definition: "Sức chứa",
          context: "The ballroom has a capacity of 300 guests in banquet style.",
          icon: "👥",
        },
      ],
      grammar: [
        {
          rude: "Follow me.",
          polite: "Please follow me this way, and I'll show you the ballroom.",
          rule: "'Please' kèm câu đầy đủ biến lời hướng dẫn thành lời mời thân thiện.",
        },
        {
          rude: "This room fits 300 people.",
          polite: "This room can comfortably accommodate up to 300 guests.",
          rule: "'can' đi với trạng từ 'comfortably' tạo giọng tích cực, làm khách yên tâm.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "We need a room that can hold 150 people in a classroom setup. Can you show us one?",
          targetResponse:
            "Of course. Please follow me this way. Our Ballroom B can comfortably accommodate 150 guests in classroom style.",
          helpTip: "Stress the word 'comfortably' to sound confident and reassuring.",
        },
      ],
      reading: {
        text: "VENUE FLOOR PLAN NOTE\nBallroom B\nTheater Style: 250 pax\nClassroom Style: 150 pax\nBanquet Style: 180 pax\nCeiling Height: 4.5m\nNatural Light: Yes (with blackout curtains)",
        questions: [
          {
            q: "Ballroom B kê kiểu lớp học chứa được bao nhiêu khách?",
            options: ["A. 250", "B. 150", "C. 180"],
            correct: 1,
          },
          {
            q: "Ballroom B có ánh sáng tự nhiên không?",
            options: [
              "A. No windows at all",
              "B. Yes, with blackout curtains",
              "C. Only in the evening",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "This room is big enough.",
          good: "This room can comfortably accommodate your group size.",
        },
        { bad: "Come here.", good: "Please come this way, and I will show you around." },
      ],
      game: [
        {
          prompt: "Do you have a space that fits 250 guests theater style for a keynote?",
          options: [
            {
              text: "Yes, we do. Please follow me — our Ballroom B comfortably accommodates 250 guests in theater style.",
              correct: true,
            },
            { text: "I'm not sure of the exact capacity.", correct: false },
            { text: "That's too many people for any of our rooms.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "BO_38_3",
      lessonOrder: 3,
      titleEn: "Negotiating Menu, Beverage & Technical Terms",
      titleVi: "Đàm phán thực đơn, đồ uống & điều khoản kỹ thuật",
      vocabulary: [
        {
          word: "Beverage package",
          phonetic: "/ˈbevərɪdʒ ˈpækɪdʒ/",
          definition: "Gói đồ uống",
          context: "Our beverage package includes soft drinks and coffee.",
          icon: "🥤",
        },
        {
          word: "Set menu",
          phonetic: "/set ˈmenjuː/",
          definition: "Thực đơn cố định",
          context: "We recommend our three-course set menu for the gala dinner.",
          icon: "🍽️",
        },
        {
          word: "Audio-visual (AV) equipment",
          phonetic: "/ˈɔːdiəʊ ˈvɪʒuəl ɪˈkwɪpmənt/",
          definition: "Thiết bị nghe nhìn",
          context: "The AV equipment includes a projector and wireless microphones.",
          icon: "🎤",
        },
        {
          word: "LED screen",
          phonetic: "/ˌel iː ˈdiː skriːn/",
          definition: "Màn hình LED",
          context: "We can install an LED screen behind the main stage.",
          icon: "📺",
        },
      ],
      grammar: [
        {
          rude: "You must pay extra for the LED screen.",
          polite: "There will be an additional charge for the LED screen.",
          rule: "Cấu trúc vô nhân xưng 'There will be…' nêu chi phí trung tính, thay cho 'you must'.",
        },
        {
          rude: "That menu is too expensive for you.",
          polite:
            "This menu is a bit above your current budget, but we can suggest a similar option.",
          rule: "'a bit' kèm một phương án thay thế để làm nhẹ tin không vui.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "We'd like to include a live band and a large LED screen for our gala dinner. What are our options?",
          targetResponse:
            "That sounds exciting. There will be an additional charge for the LED screen. I can also recommend our in-house sound and lighting package for the band.",
          helpTip:
            "Practice linking 'sound and lighting' smoothly, like one word: 'sound-n-lighting'.",
        },
      ],
      reading: {
        text: "AV & TECHNICAL PROPOSAL - ADDENDUM\nSound System: Wireless mic x4, Speaker set\nLighting: Stage wash + spotlight\nLED Screen: 4m x 3m, additional $300\nSetup Time Required: 3 hours before event",
        questions: [
          {
            q: "Màn hình LED tính thêm bao nhiêu?",
            options: ["A. $300", "B. $400", "C. Free of charge"],
            correct: 0,
          },
          {
            q: "Trước sự kiện cần bao nhiêu thời gian dựng?",
            options: ["A. 1 hour", "B. 3 hours", "C. 30 minutes"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "You have to pay more for that.",
          good: "There will be an additional charge for that service.",
        },
        {
          bad: "That's not included.",
          good: "That item is not part of the standard package, but we can add it for an extra fee.",
        },
      ],
      game: [
        {
          prompt:
            "We won't need a live band, but we'd like extra wireless microphones for speeches. Is that possible?",
          options: [
            {
              text: "Of course. We can add extra wireless microphones to your package, and I can also recommend our in-house sound team to manage them on the day.",
              correct: true,
            },
            { text: "We only have one microphone available.", correct: false },
            { text: "That's not something we usually provide.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "BO_38_4",
      lessonOrder: 4,
      titleEn: "Finalizing the BEO for Sign-off",
      titleVi: "Hoàn thiện Lệnh tổ chức sự kiện (BEO) để ký kết",
      vocabulary: [
        {
          word: "Banquet Event Order (BEO)",
          phonetic: "/ˈbæŋkwɪt ɪˈvent ˈɔːdə/",
          definition: "Lệnh tổ chức sự kiện",
          context: "Please review the BEO carefully before signing.",
          icon: "📋",
        },
        {
          word: "Sign-off",
          phonetic: "/ˈsaɪn ɔːf/",
          definition: "Sự ký duyệt, xác nhận",
          context: "We need your sign-off by Friday to confirm the booking.",
          icon: "✍️",
        },
        {
          word: "Final headcount",
          phonetic: "/ˈfaɪnəl ˈhedkaʊnt/",
          definition: "Số lượng khách cuối cùng",
          context: "Please confirm your final headcount three days before the event.",
          icon: "🔢",
        },
        {
          word: "Deposit",
          phonetic: "/dɪˈpɑːzɪt/",
          definition: "Tiền đặt cọc",
          context: "A 50% deposit is required to confirm the reservation.",
          icon: "💳",
        },
      ],
      grammar: [
        {
          rude: "Sign this now.",
          polite: "Could you please review and sign the BEO at your earliest convenience?",
          rule: "'Could you please…' kèm 'at your earliest convenience' — đề nghị lịch sự mà không tạo áp lực.",
        },
        {
          rude: "You need to tell us the final number of guests.",
          polite: "We would appreciate it if you could confirm your final headcount by Wednesday.",
          rule: "Câu điều kiện 'We would appreciate it if you could…' làm lời đề nghị nghe nhã nhặn.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Everything looks good. What do we need to do to confirm the booking?",
          targetResponse:
            "Wonderful. Could you please review and sign the BEO, and we would appreciate a 50% deposit to confirm your reservation.",
          helpTip: "Keep a rising, friendly tone on 'Wonderful' to sound warm and professional.",
        },
      ],
      reading: {
        text: "BANQUET EVENT ORDER (DRAFT)\nClient: Saigon Tech Corporation\nEvent Date: 15 October\nRoom: Grand Ballroom\nFinal Headcount: Due 3 days before event\nDeposit Required: 50% upon signing\nStatus: Pending Client Sign-off",
        questions: [
          {
            q: "Khi nào phải chốt số khách cuối cùng?",
            options: [
              "A. On the event day",
              "B. 3 days before the event",
              "C. 1 week after signing",
            ],
            correct: 1,
          },
          {
            q: "BEO hiện đang ở trạng thái nào?",
            options: ["A. Confirmed and paid", "B. Cancelled", "C. Pending client sign-off"],
            correct: 2,
          },
        ],
      },
      arcade: [
        {
          bad: "Sign here now.",
          good: "Could you please review and sign the BEO when convenient?",
        },
        {
          bad: "Tell us the number of guests.",
          good: "We would appreciate it if you could confirm your final headcount.",
        },
      ],
      game: [
        {
          prompt:
            "We might need to change a few details later. Is that still possible after we sign?",
          options: [
            {
              text: "Yes, minor changes are possible, but please let us know as early as you can so we can update the BEO in time.",
              correct: true,
            },
            { text: "No changes are allowed once you sign.", correct: false },
            { text: "That's fine, just tell us whenever you feel like it.", correct: false },
          ],
        },
      ],
    },
  ],
};

// ============================================================
// RECOVERED WEEKS 37-38 — the B2B contract/proposal weeks were the same
// for all six departments. A receptionist was learning "allotment",
// "release period" and "credit facility": commercial terms only Back
// Office ever uses. BO keeps them. Everyone else spends the two weeks on
// work they actually do, which is where the audit found the real holes.
//
// Front Office gets Concierge — measured at zero across all 240 authored
// dep-weeks. "City tour" appeared once, at week 3, as a prop for teaching
// the days of the week; there was no landmark, no tour booking, no taxi
// call and no restaurant reservation anywhere in the course.
// ============================================================

export const FO_WEEK_37: WeekContent = {
  departmentId: "FO",
  weekNumber: 37,
  weekTitleEn: "The Concierge Desk — Recommending the City",
  weekTitleVi: "Quầy Concierge — Tư vấn điểm đến cho khách",
  // Pulled forward from Phases 0-3 so this hand-authored week joins the
  // spaced-recycling system instead of standing outside it.
  reviewWords: ["City map", "Taxi", "Directions", "Near", "Lobby", "Recommend", "Trip", "Umbrella"],
  lessons: [
    {
      lessonId: "FO_37_1",
      lessonOrder: 1,
      titleEn: "Naming What Is Worth Seeing",
      titleVi: "Gọi tên điểm đến đáng đi",
      vocabulary: [
        {
          word: "Landmark",
          phonetic: "/ˈlændmɑːk/",
          definition: "Địa danh nổi bật, dễ nhận ra",
          context: "The cathedral is the easiest landmark to find from here.",
          icon: "🗿",
        },
        {
          word: "Old Quarter",
          phonetic: "/əʊld ˈkwɔːtə/",
          definition: "Khu phố cổ",
          context: "The Old Quarter is best explored on foot.",
          icon: "🏘️",
        },
        {
          word: "Water puppet show",
          phonetic: "/ˈwɔːtə ˈpʌpɪt ʃəʊ/",
          definition: "Múa rối nước",
          context: "The water puppet show lasts about one hour.",
          icon: "🎭",
        },
        {
          word: "Worth seeing",
          phonetic: "/wɜːθ ˈsiːɪŋ/",
          definition: "Đáng để ghé xem",
          context: "The old bridge is worth seeing at sunset.",
          icon: "👀",
        },
      ],
      grammar: [
        {
          rude: "Go to the Old Quarter.",
          polite: "If you have a free morning, the Old Quarter is well worth the walk.",
          rule: "Mở bằng mệnh đề 'If you have…' biến mệnh lệnh thành gợi ý — khách vẫn được quyền chọn.",
        },
        {
          rude: "That place is boring.",
          polite:
            "The museum is quieter in the afternoon, madam, if you would rather avoid the crowds.",
          rule: "Không chê điểm đến. Nêu một điều kiện khách quan ('quieter in the afternoon') rồi để khách tự quyết.",
        },
      ],
      speaking: [
        {
          guestPrompt: "We only have one free day. What should we see?",
          targetResponse:
            "If you have just one day, sir, I would start with the Old Quarter. The water puppet show is lovely after dinner.",
          helpTip:
            "Nối 'start with the' thành một hơi. Đừng tách rời từng từ — câu tư vấn phải nghe như lời khuyên, không như đọc danh sách.",
        },
        {
          guestPrompt: "Is the museum far from here?",
          targetResponse:
            "It is about ten minutes on foot, madam, and the walk itself passes two landmarks worth seeing.",
          helpTip:
            "'About' đứng trước con số làm câu trả lời mềm và trung thực hơn — bạn ước lượng chứ không cam kết chính xác.",
        },
      ],
      reading: {
        text: "CONCIERGE DESK — WALKING RECOMMENDATIONS\nOld Quarter: 10 min on foot. Best 7-10 AM or after 4 PM. Narrow lanes, wear flat shoes.\nCity Museum: 12 min on foot. Closed Mondays. Entrance 60,000 VND.\nWater Puppet Theatre: 15 min by taxi. Shows 18:00 and 20:00. Book one day ahead.\nNote: In the rainy season, offer the guest an umbrella from the desk before they leave.",
        questions: [
          {
            q: "Bảo tàng thành phố đóng cửa vào ngày nào?",
            options: ["A. Sundays", "B. Mondays", "C. It never closes"],
            correct: 1,
          },
          {
            q: "Theo ghi chú, mùa mưa thì nhân viên nên làm gì trước khi khách rời quầy?",
            options: [
              "A. Offer the guest an umbrella from the desk",
              "B. Tell the guest to stay in the hotel",
              "C. Cancel the guest's plan",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "I don't know, just walk around.",
          good: "May I suggest the Old Quarter, sir? It is ten minutes on foot from our door.",
        },
        {
          bad: "Museum closed today. Go tomorrow.",
          good: "The museum is closed on Mondays, madam. Would tomorrow morning suit you instead?",
        },
      ],
      game: [
        {
          prompt: "We have three hours before our flight. Is that enough to see anything?",
          options: [
            {
              text: "Three hours is comfortable for the Old Quarter, sir. It is close, and I can hold your bags here.",
              correct: true,
            },
            { text: "No, three hours is not enough. Please wait in the lobby.", correct: false },
            { text: "Maybe. It depends on the traffic.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_37_2",
      lessonOrder: 2,
      titleEn: "How Far, How Long, How Much",
      titleVi: "Bao xa, bao lâu, bao nhiêu tiền",
      vocabulary: [
        {
          word: "Walking distance",
          phonetic: "/ˈwɔːkɪŋ ˈdɪstəns/",
          definition: "Khoảng cách đi bộ được",
          context: "The night market is within walking distance of the hotel.",
          icon: "🚶",
        },
        {
          word: "Entrance fee",
          phonetic: "/ˈentrəns fiː/",
          definition: "Phí vào cửa",
          context: "The entrance fee is sixty thousand dong per person.",
          icon: "🎫",
        },
        {
          word: "Half-day",
          phonetic: "/hɑːf deɪ/",
          definition: "Nửa ngày",
          context: "The half-day trip returns before lunch.",
          icon: "🕧",
        },
        {
          word: "Peak hour",
          phonetic: "/piːk aʊə/",
          definition: "Giờ cao điểm",
          context: "Please avoid peak hour if you are going to the airport.",
          icon: "🚦",
        },
      ],
      grammar: [
        {
          rude: "It is far. Take a taxi.",
          polite: "It is a little far to walk, sir, so a taxi would be more comfortable.",
          rule: "'A little' làm nhẹ thông tin bất lợi, rồi 'so' dẫn thẳng sang giải pháp — nêu vấn đề phải kèm lối ra.",
        },
        {
          rude: "You pay entrance fee yourself.",
          polite:
            "The entrance fee is not included, madam, but it is only sixty thousand dong at the gate.",
          rule: "Nói rõ khoản không bao gồm trước, rồi 'but it is only…' để khách thấy con số nhỏ hơn nỗi lo.",
        },
      ],
      speaking: [
        {
          guestPrompt: "How long does it take to get to the airport?",
          targetResponse:
            "Around forty minutes, sir, but at peak hour I would allow a full hour to be safe.",
          helpTip:
            "Đưa hai con số: bình thường và tình huống xấu. Khách ra sân bay cần biên an toàn, không cần con số đẹp.",
        },
      ],
      reading: {
        text: "TRANSFER & TIMING GUIDE — CONCIERGE\nAirport: 40 min normal, 60-70 min at peak hour (07:00-09:00, 17:00-19:00).\nNight Market: 8 min on foot, within walking distance. Opens 18:00.\nHalf-day countryside trip: departs 08:00, returns 12:30. Entrance fee not included.\nFull-day trip: departs 08:00, returns 17:00. Lunch included.\nAlways confirm the guest's flight time before recommending a departure time.",
        questions: [
          {
            q: "Đi sân bay vào giờ cao điểm mất bao lâu?",
            options: ["A. 40 minutes", "B. 60-70 minutes", "C. 8 minutes"],
            correct: 1,
          },
          {
            q: "Chuyến nửa ngày về khách sạn lúc mấy giờ?",
            options: ["A. 12:30", "B. 17:00", "C. 18:00"],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Forty minutes. Maybe more. I am not sure.",
          good: "Around forty minutes, sir, and an hour at peak time. Shall I book the car for eight?",
        },
        {
          bad: "The trip price does not have entrance fee.",
          good: "The entrance fee is paid at the gate, madam — sixty thousand dong per person.",
        },
      ],
      game: [
        {
          prompt: "My flight is at two in the afternoon. When should we leave the hotel?",
          options: [
            {
              text: "I would suggest leaving by eleven, madam. That clears the peak hour and leaves time to check in.",
              correct: true,
            },
            { text: "Two o'clock flight, so leave at one.", correct: false },
            { text: "Whenever you like. The car is always ready.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_37_3",
      lessonOrder: 3,
      titleEn: "Matching the Guest to the Right Trip",
      titleVi: "Chọn đúng trải nghiệm cho đúng khách",
      vocabulary: [
        {
          word: "Guided tour",
          phonetic: "/ˈɡaɪdɪd tʊə/",
          definition: "Tour có hướng dẫn viên",
          context: "A guided tour is easier if you do not speak Vietnamese.",
          icon: "🧭",
        },
        {
          word: "On your own",
          phonetic: "/ɒn jɔːr əʊn/",
          definition: "Tự đi, không theo đoàn",
          context: "You can explore the market on your own if you prefer.",
          icon: "🙋",
        },
        {
          word: "Stroller",
          phonetic: "/ˈstrəʊlə/",
          definition: "Xe đẩy em bé",
          context: "The lanes are narrow, so a stroller may be difficult.",
          icon: "👶",
        },
        {
          word: "Pace",
          phonetic: "/peɪs/",
          definition: "Nhịp độ, tốc độ đi",
          context: "The countryside trip has a gentle pace.",
          icon: "🐢",
        },
      ],
      grammar: [
        {
          rude: "You have a baby, so no tour for you.",
          polite:
            "With a young child, madam, I would suggest the countryside trip — the pace is much gentler.",
          rule: "Đừng nói khách 'không đi được'. Nêu hoàn cảnh rồi đề xuất lựa chọn hợp hơn.",
        },
        {
          rude: "Old people cannot walk there.",
          polite:
            "The lanes are quite steep, sir, so many guests prefer the boat route for the same view.",
          rule: "Tránh nhận xét về tuổi tác hay thể trạng. Mô tả địa hình và để khách tự cân nhắc.",
        },
      ],
      speaking: [
        {
          guestPrompt: "We are travelling with my mother. She walks slowly.",
          targetResponse:
            "Then I would recommend the boat route, sir. There is very little walking, and the view is the same.",
          helpTip:
            "'Then I would recommend' cho thấy bạn nghe rồi mới tư vấn — không đọc thuộc một gợi ý có sẵn.",
        },
        {
          guestPrompt: "We would rather not join a big group.",
          targetResponse:
            "Of course, madam. You can do the same route on your own, and I will mark the stops on your map.",
          helpTip:
            "Nhận yêu cầu ('Of course'), giữ nguyên nội dung khách muốn, chỉ đổi hình thức. Rồi thêm một hành động cụ thể.",
        },
      ],
      reading: {
        text: "TOUR MATCHING NOTES — FOR DESK USE\nFamilies with small children: countryside trip (gentle pace, short walks, shaded seating). Avoid the hill pagoda — 200 steps, no stroller access.\nGuests over 70 or with mobility needs: boat route. Same scenery, almost no walking.\nIndependent travellers: give the walking map, mark 4 stops, no guide needed.\nGuests with no Vietnamese and a tight schedule: guided tour, English-speaking guide, hotel pick-up.",
        questions: [
          {
            q: "Vì sao không nên gợi ý chùa trên đồi cho gia đình có trẻ nhỏ?",
            options: [
              "A. It is too expensive",
              "B. There are 200 steps and no stroller access",
              "C. It closes early",
            ],
            correct: 1,
          },
          {
            q: "Khách không nói được tiếng Việt và ít thời gian thì hợp với lựa chọn nào?",
            options: [
              "A. The walking map on their own",
              "B. The boat route",
              "C. A guided tour with an English-speaking guide",
            ],
            correct: 2,
          },
        ],
      },
      arcade: [
        {
          bad: "Your mother is too old for this tour.",
          good: "The boat route may suit your mother better, sir — the same view with almost no walking.",
        },
        {
          bad: "Group tour only. No choice.",
          good: "You may also go on your own, madam. Shall I mark the four best stops on your map?",
        },
      ],
      game: [
        {
          prompt: "Our children are five and seven. Will they be bored on this trip?",
          options: [
            {
              text: "The countryside trip suits their age well, madam — short walks, a boat ride, and a stop at the buffalo field.",
              correct: true,
            },
            {
              text: "Children are always bored on tours. Leave them at the hotel.",
              correct: false,
            },
            { text: "I think it is fine. Most people like it.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_37_4",
      lessonOrder: 4,
      titleEn: "Honest Advice When the Answer Is No",
      titleVi: "Tư vấn trung thực khi câu trả lời là không",
      vocabulary: [
        {
          word: "Fully booked",
          phonetic: "/ˈfʊli bʊkt/",
          definition: "Đã kín chỗ",
          context: "The sunset cruise is fully booked this evening.",
          icon: "🚫",
        },
        {
          word: "Alternative",
          phonetic: "/ɔːlˈtɜːnətɪv/",
          definition: "Phương án thay thế",
          context: "May I offer an alternative for tomorrow?",
          icon: "🔀",
        },
        {
          word: "Overrated",
          phonetic: "/ˌəʊvəˈreɪtɪd/",
          definition: "Được khen quá mức so với thực tế",
          context: "Some guests find that spot overrated in the rainy season.",
          icon: "🤔",
        },
        {
          word: "Honestly",
          phonetic: "/ˈɒnɪstli/",
          definition: "Nói thật lòng",
          context: "Honestly, sir, the market is quieter on a weekday.",
          icon: "🤝",
        },
      ],
      grammar: [
        {
          rude: "No tickets. Nothing I can do.",
          polite:
            "The cruise is fully booked tonight, sir, but I can hold two seats for tomorrow at six.",
          rule: "Không bao giờ dừng ở lời từ chối. Cấu trúc: sự thật + 'but' + một phương án cụ thể có giờ giấc.",
        },
        {
          rude: "That place is not good, don't go.",
          polite:
            "Honestly, madam, many guests find it crowded in July. The riverside walk is calmer.",
          rule: "'Honestly' báo hiệu lời khuyên thật lòng. Đưa lý do cụ thể rồi mới nêu lựa chọn khác.",
        },
      ],
      speaking: [
        {
          guestPrompt: "The hotel website said the cruise runs every night.",
          targetResponse:
            "I am sorry for the confusion, madam. It does run nightly, but tonight it is fully booked. May I hold tomorrow for you?",
          helpTip:
            "Xin lỗi vì sự nhầm lẫn, không phủ nhận điều khách đọc được. Rồi chuyển ngay sang việc bạn làm được.",
        },
      ],
      reading: {
        text: "CONCIERGE LOG — 14 JULY\n19:10 Room 604 requested 2 seats, sunset cruise tonight. Operator confirmed FULLY BOOKED.\nAction taken: offered tomorrow 18:00, held 2 seats under guest name, no deposit required.\nAlso offered riverside walk this evening as an alternative, with a map and torch from the desk.\nGuest accepted both. Follow up at 17:00 tomorrow to reconfirm the cruise pick-up.",
        questions: [
          {
            q: "Nhân viên đã làm gì sau khi biết du thuyền hết chỗ?",
            options: [
              "A. Told the guest to try again another time",
              "B. Held two seats for the next evening and offered a walk tonight",
              "C. Asked the guest to pay a deposit",
            ],
            correct: 1,
          },
          {
            q: "Ngày hôm sau phải làm gì lúc 17h?",
            options: [
              "A. Follow up to reconfirm the cruise pick-up",
              "B. Cancel the booking",
              "C. Send the guest a new map",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Sold out. Try another hotel.",
          good: "It is fully booked tonight, sir, but I have held two seats for tomorrow at six.",
        },
        {
          bad: "Don't go there, it is bad.",
          good: "Honestly, madam, July is very crowded there. The riverside walk is calmer this week.",
        },
      ],
      game: [
        {
          prompt: "Everyone online says this temple is the best thing in the city. Is it?",
          options: [
            {
              text: "It is beautiful early in the morning, sir. By ten it is very crowded, so I would go before eight.",
              correct: true,
            },
            { text: "Yes, it is the best. Everyone loves it.", correct: false },
            { text: "It is overrated. I would not bother.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const FO_WEEK_38: WeekContent = {
  departmentId: "FO",
  weekNumber: 38,
  weekTitleEn: "The Concierge Desk — Arranging and Confirming",
  weekTitleVi: "Quầy Concierge — Đặt chỗ và xác nhận cho khách",
  reviewWords: [
    "Landmark",
    "Guided tour",
    "Fully booked",
    "Peak hour",
    "Confirmed",
    "Arrange a taxi",
    "Booking reference",
    "Departure time",
  ],
  lessons: [
    {
      lessonId: "FO_38_1",
      lessonOrder: 1,
      titleEn: "Booking a Tour for a Guest",
      titleVi: "Đặt tour thay cho khách",
      vocabulary: [
        {
          word: "Availability",
          phonetic: "/əˌveɪləˈbɪləti/",
          definition: "Tình trạng còn chỗ",
          context: "Let me check availability for Thursday morning.",
          icon: "📅",
        },
        {
          word: "Pick-up point",
          phonetic: "/ˈpɪk ʌp pɔɪnt/",
          definition: "Điểm đón khách",
          context: "The pick-up point is the main lobby door.",
          icon: "📍",
        },
        {
          word: "Itinerary",
          phonetic: "/aɪˈtɪnərəri/",
          definition: "Lịch trình chi tiết",
          context: "I will print the itinerary for you tonight.",
          icon: "🗒️",
        },
        {
          word: "Head count",
          phonetic: "/hed kaʊnt/",
          definition: "Số người tham gia",
          context: "May I confirm the head count for the tour?",
          icon: "🔢",
        },
      ],
      grammar: [
        {
          rude: "How many people? Tell me now.",
          polite: "May I confirm the head count, sir, so the operator reserves the right vehicle?",
          rule: "Nêu LÝ DO hỏi ('so the operator…') biến câu hỏi hành chính thành sự chăm sóc.",
        },
        {
          rude: "I will check. Wait there.",
          polite: "Let me check availability for you, madam. It will take two minutes, no longer.",
          rule: "Cam kết một khoảng thời gian cụ thể. 'Wait' không kèm con số là chờ vô hạn với khách.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Can you book the countryside tour for the four of us on Thursday?",
          targetResponse:
            "Certainly, sir. Let me check availability for Thursday, and I will confirm the head count and pick-up point with you.",
          helpTip:
            "Nhắc lại thông tin khách vừa nói (thứ Năm, bốn người) trong câu trả lời — đó là cách chứng minh bạn đã nghe đúng.",
        },
      ],
      reading: {
        text: "TOUR BOOKING SLIP — CONCIERGE\nGuest: Mr. Alvarez, Room 1108\nTour: Countryside half-day, Thursday 12 March\nHead count: 4 adults\nPick-up point: Main lobby door, 07:45 (tour departs 08:00)\nOperator: Green Fields Travel, ref GF-4471\nDesk actions: print itinerary tonight · leave wake-up call 06:45 · reconfirm with operator Wednesday 18:00",
        questions: [
          {
            q: "Khách được đón lúc mấy giờ và ở đâu?",
            options: [
              "A. 08:00 at the car park",
              "B. 07:45 at the main lobby door",
              "C. 06:45 in the restaurant",
            ],
            correct: 1,
          },
          {
            q: "Quầy phải xác nhận lại với công ty tour vào lúc nào?",
            options: ["A. Thursday 08:00", "B. Wednesday 18:00", "C. Thursday 07:45"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "How many? Four? Okay, done.",
          good: "Four adults, Thursday morning. May I confirm the pick-up point as the lobby door, sir?",
        },
        {
          bad: "Wait. I check.",
          good: "Let me check availability for you, madam — two minutes and I will come back to you.",
        },
      ],
      game: [
        {
          prompt: "Book us on the eight o'clock tour tomorrow, please.",
          options: [
            {
              text: "With pleasure, madam. May I confirm the head count, and shall I arrange a wake-up call for a quarter to seven?",
              correct: true,
            },
            { text: "Okay. Be in the lobby at eight.", correct: false },
            { text: "I will try. Come back later and I will tell you.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_38_2",
      lessonOrder: 2,
      titleEn: "Calling a Taxi and Agreeing the Fare",
      titleVi: "Gọi taxi và thống nhất giá cước",
      vocabulary: [
        {
          word: "Metered taxi",
          phonetic: "/ˈmiːtəd ˈtæksi/",
          definition: "Taxi tính theo đồng hồ",
          context: "I will call a metered taxi for you, sir.",
          icon: "🚕",
        },
        {
          word: "Fare",
          phonetic: "/feə/",
          definition: "Tiền cước xe",
          context: "The fare to the airport is about four hundred thousand dong.",
          icon: "💵",
        },
        {
          word: "Fixed price",
          phonetic: "/fɪkst praɪs/",
          definition: "Giá trọn gói, không đổi",
          context: "Our hotel car is a fixed price to the airport.",
          icon: "🏷️",
        },
        {
          word: "Plate number",
          phonetic: "/pleɪt ˈnʌmbə/",
          definition: "Biển số xe",
          context: "I have written the plate number on your card.",
          icon: "🔖",
        },
      ],
      grammar: [
        {
          rude: "Take any taxi outside.",
          polite:
            "I would rather call a metered taxi from the desk, sir — the fare is then on record.",
          rule: "'I would rather' nêu khuyến nghị nghề nghiệp mà không hạ thấp lựa chọn của khách.",
        },
        {
          rude: "Driver will tell you price.",
          polite:
            "The fare is about four hundred thousand dong on the meter, madam, and I have noted the plate number.",
          rule: "Đưa trước con số ước lượng và biển số. Khách nước ngoài sợ nhất là không biết mình sẽ trả bao nhiêu.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "Last time a driver charged us triple. Can you make sure that does not happen?",
          targetResponse:
            "I understand, madam. I will call a metered taxi myself and write the plate number and the usual fare on your card.",
          helpTip:
            "'I understand' rồi hành động cụ thể. Đừng bào chữa cho tài xế lần trước — khách cần bảo đảm cho lần này.",
        },
      ],
      reading: {
        text: "TRANSPORT CARD — GIVE ONE TO EVERY DEPARTING GUEST\nHotel car to airport: FIXED PRICE 450,000 VND. Book at the desk, 30 min notice.\nMetered taxi to airport: usually 380,000-420,000 VND depending on traffic.\nDesk procedure: call the taxi, note the plate number on the guest card, hand the card to the guest.\nIf the guest returns with a fare complaint, log the plate number and the amount, then inform the Duty Manager the same shift.",
        questions: [
          {
            q: "Xe khách sạn đi sân bay có giá bao nhiêu?",
            options: ["A. 380,000 VND", "B. 450,000 VND fixed", "C. It depends on the meter"],
            correct: 1,
          },
          {
            q: "Nếu khách quay lại phàn nàn về giá cước thì phải làm gì?",
            options: [
              "A. Log the plate number and amount, then inform the Duty Manager",
              "B. Pay the difference from the desk float",
              "C. Ask the guest to call the taxi company",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Taxi is outside. Go and ask them.",
          good: "Allow me to call one for you, sir. I will note the plate number on your card.",
        },
        {
          bad: "Price is price. I cannot help.",
          good: "The meter should read about four hundred thousand, madam. Please keep this card with the plate number.",
        },
      ],
      game: [
        {
          prompt: "How much should a taxi to the airport cost? I do not want to be cheated.",
          options: [
            {
              text: "About four hundred thousand dong on the meter, sir. Our own car is fixed at four hundred and fifty.",
              correct: true,
            },
            { text: "It depends. Ask the driver before you get in.", correct: false },
            { text: "Taxis here are fine. Do not worry about it.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_38_3",
      lessonOrder: 3,
      titleEn: "Reserving a Restaurant Table",
      titleVi: "Đặt bàn nhà hàng bên ngoài",
      vocabulary: [
        {
          word: "Table for two",
          phonetic: "/ˈteɪbl fə tuː/",
          definition: "Bàn hai người",
          context: "I have reserved a table for two at seven.",
          icon: "🍽️",
        },
        {
          word: "Dress code",
          phonetic: "/dres kəʊd/",
          definition: "Quy định trang phục",
          context: "That restaurant has a smart dress code in the evening.",
          icon: "👔",
        },
        {
          word: "Dietary requirement",
          phonetic: "/ˈdaɪətəri rɪˈkwaɪəmənt/",
          definition: "Yêu cầu về chế độ ăn",
          context: "Please tell me any dietary requirement before I call.",
          icon: "🥗",
        },
        {
          word: "Under your name",
          phonetic: "/ˈʌndə jɔː neɪm/",
          definition: "Đặt dưới tên của quý khách",
          context: "The booking is under your name, sir.",
          icon: "📝",
        },
      ],
      grammar: [
        {
          rude: "You eat meat or not?",
          polite:
            "May I ask if anyone in your party has a dietary requirement, madam? I will pass it on.",
          rule: "Hỏi gián tiếp 'May I ask if…' cho chủ đề riêng tư, và nói rõ bạn sẽ dùng thông tin để làm gì.",
        },
        {
          rude: "Wear proper clothes there.",
          polite:
            "One small note, sir: they ask for long trousers in the evening. Nothing formal beyond that.",
          rule: "Báo trước quy định bằng 'One small note' và giới hạn ngay ('nothing formal beyond that') để khách không lo lắng thừa.",
        },
      ],
      speaking: [
        {
          guestPrompt: "We would like somewhere quiet for our anniversary tonight.",
          targetResponse:
            "How lovely. May I suggest the riverside terrace, madam? I will ask for a corner table under your name.",
          helpTip:
            "Ghi nhận dịp đặc biệt bằng một câu ngắn ('How lovely') rồi mới tư vấn — sự ấm áp đến trước thông tin.",
        },
        {
          guestPrompt: "One of us cannot eat shellfish. Is that a problem?",
          targetResponse:
            "Not at all, sir. I will note the shellfish allergy on the booking and confirm it with the restaurant when I call.",
          helpTip:
            "Với dị ứng, phải nói rõ hai bước: ghi vào booking VÀ xác nhận qua điện thoại. Một bước là chưa đủ an toàn.",
        },
      ],
      reading: {
        text: "OUTSIDE DINING — DESK REFERENCE\nRiverside Terrace: quiet, corner tables available, smart casual, long trousers after 18:00. Book 4 hours ahead.\nStreet Kitchen: lively and loud, no reservations, best before 19:00.\nLotus Vegetarian: fully vegetarian, good for dietary requirements, book 1 day ahead.\nWhen booking: give the guest's name, the head count, the time, and ANY dietary requirement. Write the confirmation on a card for the guest.",
        questions: [
          {
            q: "Nhà hàng nào phù hợp nhất cho khách ăn chay?",
            options: ["A. Riverside Terrace", "B. Street Kitchen", "C. Lotus Vegetarian"],
            correct: 2,
          },
          {
            q: "Khi gọi điện đặt bàn, phải cung cấp những thông tin nào?",
            options: [
              "A. Only the guest's room number",
              "B. Name, head count, time, and any dietary requirement",
              "C. The guest's passport number",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "That restaurant is full. Eat here.",
          good: "They are full at seven, sir. I can hold eight thirty there, or book our terrace at seven.",
        },
        {
          bad: "Allergy? Tell the waiter yourself.",
          good: "I will note the shellfish allergy on the booking and confirm it by phone, madam.",
        },
      ],
      game: [
        {
          prompt: "Book us a table somewhere good tonight. Surprise us.",
          options: [
            {
              text: "It would be my pleasure, sir. May I ask the head count and whether anyone has a dietary requirement?",
              correct: true,
            },
            { text: "Okay, I will choose something. Come back at seven.", correct: false },
            { text: "I cannot choose for you. Please tell me the restaurant.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_38_4",
      lessonOrder: 4,
      titleEn: "Left Luggage and the Late Departure",
      titleVi: "Giữ hành lý và khách rời muộn",
      vocabulary: [
        {
          word: "Left luggage",
          phonetic: "/left ˈlʌɡɪdʒ/",
          definition: "Dịch vụ giữ hành lý",
          context: "We can keep your bags in left luggage until six.",
          icon: "🧳",
        },
        {
          word: "Claim tag",
          phonetic: "/kleɪm tæɡ/",
          definition: "Phiếu nhận lại hành lý",
          context: "Please keep the claim tag until you collect the bags.",
          icon: "🏷️",
        },
        {
          word: "Day-use shower",
          phonetic: "/deɪ juːs ˈʃaʊə/",
          definition: "Phòng tắm dùng trong ngày",
          context: "A day-use shower is available near the pool.",
          icon: "🚿",
        },
        {
          word: "Collect",
          phonetic: "/kəˈlekt/",
          definition: "Đến lấy lại đồ",
          context: "What time would you like to collect your luggage?",
          icon: "🤲",
        },
      ],
      grammar: [
        {
          rude: "Put your bags there. Take this paper.",
          polite:
            "May I keep your bags in left luggage, sir? Here is your claim tag — please keep it safe.",
          rule: "Xin phép trước khi cầm đồ của khách, rồi giao phiếu kèm một lời dặn ngắn.",
        },
        {
          rude: "Check-out is twelve. You must go.",
          polite:
            "Check-out is at twelve, madam, but you are very welcome to use the pool and the shower until your flight.",
          rule: "Nêu quy định rồi nối ngay bằng 'but you are welcome to…' — khách nghe thấy điều còn được, chứ không chỉ điều mất.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "Our flight is at nine tonight but check-out is at noon. What do we do for eight hours?",
          targetResponse:
            "We will keep your luggage here, madam, and you are welcome to use the pool and the day-use shower until you leave.",
          helpTip:
            "Trả lời cả hai nỗi lo cùng lúc: hành lý để đâu, và người đi đâu. Khách hỏi một câu nhưng đang lo hai việc.",
        },
      ],
      reading: {
        text: "LEFT LUGGAGE PROCEDURE — FRONT OFFICE\n1. Count the bags with the guest and write the number on the claim tag.\n2. Give the top half of the tag to the guest, tie the bottom half to the bag.\n3. Note the collection time in the log book.\n4. Never release a bag without the claim tag. If the guest has lost it, check photo ID against the log and call the Duty Manager.\nDay-use facilities for departing guests: pool, changing room, day-use shower until 18:00.",
        questions: [
          {
            q: "Nếu khách làm mất phiếu nhận hành lý thì phải làm gì?",
            options: [
              "A. Give the bag anyway if the guest describes it",
              "B. Check photo ID against the log and call the Duty Manager",
              "C. Keep the bag until the next day",
            ],
            correct: 1,
          },
          {
            q: "Khách đã trả phòng dùng được phòng tắm ban ngày tới mấy giờ?",
            options: ["A. 12:00", "B. 18:00", "C. 21:00"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "No tag, no bag. Rules are rules.",
          good: "Without the tag I must check your ID against our log, sir. May I see your passport?",
        },
        {
          bad: "You cannot stay after twelve.",
          good: "Your room is until twelve, madam, but the pool and shower are yours until six.",
        },
      ],
      game: [
        {
          prompt:
            "We checked out this morning but our car is not here yet. Can we leave the suitcases?",
          options: [
            {
              text: "Of course, sir. I will count the bags with you and give you a claim tag — collect them whenever your car arrives.",
              correct: true,
            },
            { text: "Yes, put them in the corner. Nobody will touch them.", correct: false },
            { text: "We only keep bags for guests who are still checked in.", correct: false },
          ],
        },
      ],
    },
  ],
};

/** The Phase 2 overrides, named once so the recycling pool below and the
 *  registry itself cannot drift apart. */
const P2_OVERRIDES: Record<string, WeekContent> = {
  "FB-15": FB_WEEK_15,
  "HK-15": HK_WEEK_15,
  "FO-17": FO_WEEK_17,
  "SW-19": SW_WEEK_19,
};

/** Everything a department met in Phases 0-2 — the pool Phase 3 walks
 *  across weeks 23-29. Declared here, not at the top of the file, because
 *  it reads the hand-authored week constants above. */
const PRIOR_WORDS_THROUGH_P2_BY_DEP: Record<string, string[]> = (() => {
  const p2 = phase2WordsByDep(P2_OVERRIDES);
  const out: Record<string, string[]> = {};
  for (const code of Object.keys(PRIOR_WORDS_BY_DEP)) {
    out[code] = [...PRIOR_WORDS_BY_DEP[code], ...(p2[code] ?? [])];
  }
  return out;
})();

/** The hand-authored weeks that sit inside the Phase 3 and Phase 4
 *  ranges. Named once so the recycling pools and the registry cannot
 *  drift apart. */
const P3_OVERRIDES: Record<string, WeekContent> = {
  "SW-23": SW_WEEK_23,
  "FO-26": FO_WEEK_26,
  "GR-27": GR_WEEK_27,
};
const P4_OVERRIDES: Record<string, WeekContent> = {
  "FB-31": FB_WEEK_31,
  "HK-33": HK_WEEK_33,
  "GR-34": GR_WEEK_34,
  "BO-37": BO_WEEK_37,
  "BO-38": BO_WEEK_38,
  "FO-37": FO_WEEK_37,
  "FO-38": FO_WEEK_38,
};

/** Everything a department met in Phases 0-3 — the pool Phase 4 walks
 *  across weeks 31-39. */
const PRIOR_WORDS_THROUGH_P3_BY_DEP: Record<string, string[]> = (() => {
  const p3 = phase3WordsByDep(P3_OVERRIDES);
  const out: Record<string, string[]> = {};
  for (const code of Object.keys(PRIOR_WORDS_THROUGH_P2_BY_DEP)) {
    out[code] = [...PRIOR_WORDS_THROUGH_P2_BY_DEP[code], ...(p3[code] ?? [])];
  }
  return out;
})();

// Registry — keyed by `${DEP}-${week}`.
// Order matters: the hand-authored weeks are spread LAST so they win
// over the Phase 2 spine for the four slots they occupy (FB-15, HK-15,
// FO-17, SW-19) and the three in Phase 3 (SW-23, FO-26, GR-27) — see the
// notes at the top of phase2.ts and phase3.ts.
const REGISTRY: Record<string, WeekContent> = {
  ...PHASE0_WEEKS,
  ...buildPhase1(PHASE0_WORDS_BY_DEP),
  ...buildPhase2(PRIOR_WORDS_BY_DEP, P2_OVERRIDES),
  ...buildPhase3(PRIOR_WORDS_THROUGH_P2_BY_DEP, P3_OVERRIDES),
  ...buildPhase4(PRIOR_WORDS_THROUGH_P3_BY_DEP, P4_OVERRIDES),
  "FO-17": FO_WEEK_17,
  "FB-15": FB_WEEK_15,
  "HK-15": HK_WEEK_15,
  "SW-23": SW_WEEK_23,
  "GR-27": GR_WEEK_27,
  "BO-37": BO_WEEK_37,
  "FO-26": FO_WEEK_26,
  "FB-31": FB_WEEK_31,
  "HK-33": HK_WEEK_33,
  "SW-19": SW_WEEK_19,
  "GR-34": GR_WEEK_34,
  "BO-38": BO_WEEK_38,
  "FO-37": FO_WEEK_37,
  "FO-38": FO_WEEK_38,
};

/** Every registered dep-week, keyed `${DEP}-${week}`. Exposed for the
 *  content QA gate (scripts/verify-content.ts); app code should use
 *  getWeekContent() instead of reaching into the registry. */
export const ALL_WEEKS: Readonly<Record<string, WeekContent>> = REGISTRY;

export function getWeekContent(dep: string, week: string | number): WeekContent | null {
  const wk = typeof week === "string" ? parseInt(week, 10) : week;
  return REGISTRY[`${dep.toUpperCase()}-${wk}`] ?? null;
}

export const AVAILABLE_WEEKS = Array.from(
  new Set(Object.keys(REGISTRY).map((k) => parseInt(k.split("-")[1], 10))),
).sort((a, b) => a - b);

/** Resolves review headwords (a week's `reviewWords`) back to their full
 *  VocabItems by searching all registered weeks of the same department.
 *  Unknown words are dropped silently — a typo in reviewWords must never
 *  crash a quiz. */
export function resolveReviewVocab(dep: string, words: string[]): VocabItem[] {
  const depPrefix = `${dep.toUpperCase()}-`;
  const wanted = new Set(words.map((w) => w.toLowerCase()));
  const found: VocabItem[] = [];
  const seen = new Set<string>();
  for (const [key, week] of Object.entries(REGISTRY)) {
    if (!key.startsWith(depPrefix)) continue;
    for (const lessonContent of week.lessons) {
      for (const item of lessonContent.vocabulary) {
        const lower = item.word.toLowerCase();
        if (wanted.has(lower) && !seen.has(lower)) {
          seen.add(lower);
          found.push(item);
        }
      }
    }
  }
  return found;
}
