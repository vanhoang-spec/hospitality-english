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
        // "Welcome" was taught here a second time, having been the first
        // headword of week 1. Phase 2 allows a week 12-16 new items and the
        // declined-card material needed one, so the slot went to the word
        // this department did not have rather than the one it already knew.
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
        // A declined card was measured at zero across all 240 dep-weeks, and
        // pre-authorisation is the moment it happens. The word is taught so
        // staff can READ the terminal; the grammar below teaches them never
        // to say it out loud.
        {
          word: "Declined",
          phonetic: "/dɪˈklaɪnd/",
          definition: "Thẻ bị từ chối thanh toán",
          context: "The terminal says declined, but never use that word aloud.",
          icon: "❌",
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
        {
          rude: "Your card is declined. No good.",
          polite: "The card did not go through, sir. Do you have another one?",
          rule: "Máy hiện 'declined' nhưng bạn nói 'did not go through'. Lỗi thuộc về máy, không thuộc về khách — và người xung quanh không hiểu được câu đó.",
        },
        {
          rude: "Do you have money in the bank?",
          polite: "May I try this at the other terminal, madam?",
          rule: "Đề nghị thử máy khác trước tiên. Khách giữ được thể diện, và đôi khi máy hỏng thật.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Why do you need my credit card if the room is already paid?",
          targetResponse:
            "I understand, madam. This is just a temporary deposit for any incidental charges during your stay.",
          helpTip: "Pronounce 'incidental charges' clearly by breaking it down: in-ci-den-tal.",
        },
        {
          guestPrompt: "That is strange. There is definitely money in that account.",
          targetResponse: "Of course, sir. It is often the machine. May I try another card?",
          helpTip:
            "Đồng ý với khách trước ('Of course'), đổ lỗi cho cái máy, rồi hỏi một câu ngắn. Không bao giờ nhắc tới tài khoản của khách.",
        },
      ],
      reading: {
        text: 'INCIDENTAL POLICY:\nA security deposit of 1,000,000 VND per night is required at check-in. This amount will be released automatically at check-out if there are no mini-bar or laundry uses.\n\nIF THE CARD DOES NOT GO THROUGH:\nNever say "declined" or "refused" where other guests can hear. Say "it did not go through" and offer the other terminal. Then ask quietly for another card. If no card works, invite the guest to step aside with you and call the Duty Manager. Never ask a guest about their bank or their balance.',
        questions: [
          {
            q: "Tiền đặt cọc được hoàn khi nào?",
            options: ["A. At check-out time", "B. Two weeks later", "C. At dinner time"],
            correct: 0,
          },
          {
            q: "Khi thẻ của khách không thanh toán được, tuyệt đối KHÔNG được làm gì?",
            options: [
              "A. Ask the guest about their bank or their balance",
              "B. Offer the other terminal",
              "C. Ask quietly for another card",
            ],
            correct: 0,
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
        {
          bad: "Your card was declined, sir.",
          good: "It did not go through, sir. May I try the other terminal?",
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
        {
          prompt: "Are you telling me in front of everyone that my card does not work?",
          options: [
            {
              text: "Not at all, sir. May I ask you to step this way for a moment?",
              correct: true,
            },
            { text: "The machine says declined. Please use another card.", correct: false },
            { text: "Your bank has refused the payment, sir.", correct: false },
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

// Guest Relations is the department a guest turns to when something has
// gone wrong that is not a service failure. Both of its recovered weeks
// were measured at effectively zero: one first-aid poster in the whole
// course (SW-19, beach heat exhaustion) and no ambulance, clinic, doctor
// or travel insurance anywhere; one storm bulletin, also SW-19, and no
// typhoon, cancelled flight or stranded guest in any department that
// would have to face one.

export const GR_WEEK_37: WeekContent = {
  departmentId: "GR",
  weekNumber: 37,
  weekTitleEn: "Medical Emergencies — Getting Help to the Guest",
  weekTitleVi: "Cấp cứu y tế — Đưa trợ giúp đến với khách",
  reviewWords: [
    "Urgent",
    "Assistance",
    "Allergy",
    "Duty manager",
    "Wheelchair",
    "Confidential",
    "Follow up",
    "Ask the manager",
  ],
  lessons: [
    {
      lessonId: "GR_37_1",
      lessonOrder: 1,
      titleEn: "Calling for Help Without Losing Time",
      titleVi: "Gọi trợ giúp mà không mất thời gian",
      vocabulary: [
        {
          word: "Ambulance",
          phonetic: "/ˈæmbjələns/",
          definition: "Xe cứu thương",
          context: "I am calling an ambulance for you now, sir.",
          icon: "🚑",
        },
        {
          word: "Doctor on call",
          phonetic: "/ˈdɒktər ɒn kɔːl/",
          definition: "Bác sĩ trực (có thể gọi bất cứ lúc nào)",
          context: "Our doctor on call can be here in fifteen minutes.",
          icon: "🩺",
        },
        {
          word: "Symptom",
          phonetic: "/ˈsɪmptəm/",
          definition: "Triệu chứng",
          context: "Could you tell me what symptom started first?",
          icon: "🌡️",
        },
        {
          word: "Conscious",
          phonetic: "/ˈkɒnʃəs/",
          definition: "Còn tỉnh, còn nhận biết",
          context: "The guest is conscious and breathing normally.",
          icon: "👁️",
        },
      ],
      grammar: [
        {
          rude: "What is wrong with him?",
          polite: "Could you tell me what symptom started first, madam? It helps the doctor.",
          rule: "Câu hỏi gián tiếp 'Could you tell me what…' + nêu lý do. Người nhà đang hoảng, họ cần biết vì sao bạn hỏi.",
        },
        {
          rude: "Wait, I ask my manager first.",
          polite: "I am calling the doctor on call now, sir, and my manager is on the way.",
          rule: "Trong cấp cứu, thì hiện tại tiếp diễn 'I am calling' cho khách biết việc ĐANG diễn ra, không phải sẽ diễn ra.",
        },
      ],
      speaking: [
        {
          guestPrompt: "My husband has collapsed in the room. Please, someone help us!",
          targetResponse:
            "I am sending help to your room right now, madam. Is he conscious and breathing? I will stay on the line with you.",
          helpTip:
            "Ba việc trong một lượt nói: cử người, hỏi tình trạng, không cúp máy. Đọc chậm và rõ — người nghe đang hoảng loạn.",
        },
      ],
      reading: {
        text: "MEDICAL EMERGENCY — FIRST RESPONSE CARD (GR)\n1. Send help first, ask questions second. Call ext. 8888 (Duty Manager) and state the room number.\n2. Doctor on call: 15 min to property, day or night.\n3. Ambulance: dial 115. Give the hotel address in Vietnamese, then the room number.\n4. Report to the operator: is the guest conscious, is the guest breathing, what symptom started first, any known allergy.\n5. Do NOT move the guest and do NOT give any medicine, including painkillers.",
        questions: [
          {
            q: "Theo thẻ quy trình, việc đầu tiên phải làm là gì?",
            options: [
              "A. Ask the guest for details first",
              "B. Send help first and ask questions second",
              "C. Find the guest's insurance card",
            ],
            correct: 1,
          },
          {
            q: "Hai điều tuyệt đối KHÔNG được làm là gì?",
            options: [
              "A. Move the guest and give any medicine",
              "B. Call the Duty Manager and the doctor",
              "C. Ask about allergies and symptoms",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "I think you should go to hospital yourself.",
          good: "I am calling an ambulance now, sir. Please stay where you are, and I will stay with you.",
        },
        {
          bad: "I do not know. Ask reception.",
          good: "Our doctor on call can be here in fifteen minutes, madam. Shall I call him now?",
        },
      ],
      game: [
        {
          prompt: "My daughter is very hot and she will not wake up properly.",
          options: [
            {
              text: "I am sending the doctor to your room immediately, madam. Please stay with her, and I will come up myself.",
              correct: true,
            },
            { text: "Please give her some medicine and call us if it gets worse.", correct: false },
            {
              text: "Could you bring her down to the lobby so we can look at her?",
              correct: false,
            },
          ],
        },
      ],
    },
    {
      lessonId: "GR_37_2",
      lessonOrder: 2,
      titleEn: "Staying With the Guest Until Help Arrives",
      titleVi: "Ở lại với khách cho tới khi có trợ giúp",
      vocabulary: [
        {
          word: "Allergic reaction",
          phonetic: "/əˈlɜːdʒɪk riˈækʃən/",
          definition: "Phản ứng dị ứng",
          context: "This looks like an allergic reaction to something he ate.",
          icon: "⚠️",
        },
        {
          word: "Faint",
          phonetic: "/feɪnt/",
          definition: "Ngất, xỉu",
          context: "If you feel faint, please sit down straight away.",
          icon: "💫",
        },
        {
          word: "Shade",
          phonetic: "/ʃeɪd/",
          definition: "Chỗ râm mát",
          context: "Let me move you into the shade, madam.",
          icon: "🌴",
        },
        {
          word: "Reassure",
          phonetic: "/ˌriːəˈʃɔː/",
          definition: "Trấn an",
          context: "Speak slowly to reassure the family while you wait.",
          icon: "🤲",
        },
      ],
      grammar: [
        {
          rude: "Do not worry, it is nothing serious.",
          polite:
            "The doctor is two minutes away, madam. I will stay here with you until he arrives.",
          rule: "Không bao giờ chẩn đoán ('nothing serious'). Trấn an bằng SỰ THẬT kiểm chứng được: ai đang đến, còn bao lâu.",
        },
        {
          rude: "Stand up and walk to the lobby.",
          polite: "Please stay exactly where you are, sir. I am bringing a wheelchair to you.",
          rule: "Câu mệnh lệnh có 'please' là đúng trong cấp cứu — rõ ràng cứu được người, vòng vo thì không.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Is he going to be all right? Please tell me he is going to be all right.",
          targetResponse:
            "The doctor is on his way, madam, and he is in very good hands. I am here with you and I am not leaving.",
          helpTip:
            "Đừng hứa điều bạn không biết. Hứa điều bạn kiểm soát được: bác sĩ đang đến, và bạn không rời đi.",
        },
        {
          guestPrompt: "She fainted by the pool. What do we do?",
          targetResponse:
            "Let me move her into the shade, sir, and please do not give her anything to drink until the doctor has seen her.",
          helpTip:
            "'Please do not…' đi kèm lý do ngầm. Ngăn một việc nguy hiểm phải rõ ràng nhưng vẫn giữ giọng bình tĩnh.",
        },
      ],
      reading: {
        text: "WHILE YOU WAIT — GR STANDING INSTRUCTIONS\nStay with the guest. Never leave to fetch something yourself — send a colleague.\nHeat: move the guest into the shade, loosen tight clothing, cool the neck with a wet towel.\nAllergic reaction: ask whether the guest carries their own medicine, and help them reach it. Do not choose or give medicine yourself.\nNever offer food or drink to a guest who may need surgery.\nKeep the family with you and speak slowly to reassure them. A calm voice is part of the treatment.",
        questions: [
          {
            q: "Vì sao không được tự rời đi lấy đồ?",
            options: [
              "A. Because a colleague should be sent instead and the guest is never left alone",
              "B. Because the equipment is locked away",
              "C. Because the manager has to approve it",
            ],
            correct: 0,
          },
          {
            q: "Với khách bị dị ứng, nhân viên được phép làm gì?",
            options: [
              "A. Choose a suitable medicine from the first aid box",
              "B. Help the guest reach their own medicine, but not choose or give any",
              "C. Give water and wait",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "It is probably just the heat. He will be fine.",
          good: "The doctor is two minutes away, madam. I will stay right here with you until he arrives.",
        },
        {
          bad: "Here, drink some water, you will feel better.",
          good: "Let us wait for the doctor before anything to drink, sir. May I bring you a cool towel instead?",
        },
      ],
      game: [
        {
          prompt: "Should I give him one of my heart tablets? They are the same kind.",
          options: [
            {
              text: "Please do not, madam. The doctor is almost here and he must know exactly what your husband has taken.",
              correct: true,
            },
            { text: "Yes, that is a good idea while we wait.", correct: false },
            { text: "I am not sure. It is your decision.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "GR_37_3",
      lessonOrder: 3,
      titleEn: "The Clinic, the Hospital and the Insurance",
      titleVi: "Phòng khám, bệnh viện và bảo hiểm du lịch",
      vocabulary: [
        {
          word: "International clinic",
          phonetic: "/ˌɪntəˈnæʃənəl ˈklɪnɪk/",
          definition: "Phòng khám quốc tế (có bác sĩ nói tiếng Anh)",
          context: "The international clinic has English-speaking doctors.",
          icon: "🏥",
        },
        {
          word: "Travel insurance",
          phonetic: "/ˈtrævl ɪnˈʃɔːrəns/",
          definition: "Bảo hiểm du lịch",
          context: "Please bring your travel insurance card with you.",
          icon: "📋",
        },
        {
          word: "Direct billing",
          phonetic: "/dəˈrekt ˈbɪlɪŋ/",
          definition: "Bệnh viện thanh toán trực tiếp với bảo hiểm",
          context: "That hospital offers direct billing with most insurers.",
          icon: "💳",
        },
        {
          word: "Medical report",
          phonetic: "/ˈmedɪkl rɪˈpɔːt/",
          definition: "Giấy tờ khám bệnh để nộp bảo hiểm",
          context: "Ask the clinic for a medical report in English.",
          icon: "📄",
        },
      ],
      grammar: [
        {
          rude: "You pay first, insurance later.",
          polite:
            "That hospital offers direct billing, sir, so in most cases you would pay nothing today.",
          rule: "Nói điều khách được lợi trước. 'In most cases' giữ cho câu trung thực mà vẫn nhẹ lòng người nghe.",
        },
        {
          rude: "Go to the clinic. It is on the main road.",
          polite:
            "May I arrange a car to the international clinic, madam? I will call ahead so they expect you.",
          rule: "'May I arrange…' + một hành động thêm ('call ahead') biến chỉ đường thành sự chăm sóc trọn vẹn.",
        },
      ],
      speaking: [
        {
          guestPrompt: "How much is this going to cost me? I am not sure my insurance covers it.",
          targetResponse:
            "The clinic will confirm that with your insurer directly, sir. May I take a copy of your travel insurance card and call them for you?",
          helpTip:
            "Không đoán con số và không đoán bảo hiểm chi trả gì. Chuyển câu hỏi tới nơi trả lời được, rồi nhận việc về mình.",
        },
      ],
      reading: {
        text: "MEDICAL REFERRAL LIST — KEEP AT THE GR DESK\nInternational Clinic (12 min by car): English, Korean, Japanese spoken. Open 24h. Direct billing with most travel insurers.\nProvincial Hospital (20 min): full emergency department, limited English at night. Payment on the day; guest claims later.\nDental emergency (8 min): 08:00-20:00 only.\nAlways: photograph the guest's travel insurance card and passport page before departure, with the guest's permission.\nAsk the clinic for a medical report IN ENGLISH — without it the guest's claim will be refused at home.",
        questions: [
          {
            q: "Vì sao phải xin giấy khám bệnh bằng tiếng Anh?",
            options: [
              "A. Because the hotel needs a copy for its records",
              "B. Because without it the guest's insurance claim will be refused at home",
              "C. Because the clinic charges less for it",
            ],
            correct: 1,
          },
          {
            q: "Nơi nào nhận cấp cứu 24 giờ và thanh toán trực tiếp với bảo hiểm?",
            options: [
              "A. The Provincial Hospital",
              "B. The dental emergency clinic",
              "C. The International Clinic",
            ],
            correct: 2,
          },
        ],
      },
      arcade: [
        {
          bad: "Insurance is your problem, not ours.",
          good: "May I take a copy of your travel insurance card, sir? I will call the clinic and confirm the cover.",
        },
        {
          bad: "Hospital is twenty minutes. Take a taxi.",
          good: "Let me arrange a car to the hospital, madam, and I will call ahead so they are expecting you.",
        },
      ],
      game: [
        {
          prompt: "The doctor wants us to go to hospital but nobody there speaks English.",
          options: [
            {
              text: "I will send a colleague with you to interpret, madam, and I will call the ward before you arrive.",
              correct: true,
            },
            { text: "Most doctors there speak a little English. You will manage.", correct: false },
            { text: "You could use a translation app on your phone.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "GR_37_4",
      lessonOrder: 4,
      titleEn: "Afterwards — The Family, the Record, the Follow-up",
      titleVi: "Sau sự cố — Người nhà, hồ sơ và theo dõi",
      vocabulary: [
        {
          word: "Next of kin",
          phonetic: "/nekst əv kɪn/",
          definition: "Người thân được liên hệ khi có sự cố",
          context: "Do you have a next of kin we should call, madam?",
          icon: "👪",
        },
        {
          word: "Incident report",
          phonetic: "/ˈɪnsɪdənt rɪˈpɔːt/",
          definition: "Biên bản sự việc",
          context: "The incident report must be written before the shift ends.",
          icon: "🗂️",
        },
        {
          word: "Discharged",
          phonetic: "/dɪsˈtʃɑːdʒd/",
          definition: "Được xuất viện",
          context: "The guest was discharged this morning and is back with us.",
          icon: "🏨",
        },
        {
          word: "Check on",
          phonetic: "/tʃek ɒn/",
          definition: "Ghé hỏi thăm tình hình",
          context: "I will check on him again this evening.",
          icon: "🔔",
        },
      ],
      grammar: [
        {
          rude: "Who do we call if you die?",
          polite:
            "May I note a next of kin on your file, madam? It is something we ask every guest.",
          rule: "Câu hỏi nhạy cảm cần hai lớp bảo vệ: hỏi gián tiếp, và nói rõ đây là thủ tục chung chứ không riêng ai.",
        },
        {
          rude: "You are fine now, so forget about it.",
          polite:
            "I am very glad you are back with us, sir. May I check on you again this evening?",
          rule: "Xin phép trước khi ghé thăm lại. Quan tâm mà không xin phép có thể thành làm phiền người vừa ốm dậy.",
        },
      ],
      speaking: [
        {
          guestPrompt: "We are back from the hospital. Honestly, we are exhausted.",
          targetResponse:
            "I am so glad you are back, madam. Your room is ready and quiet, and I will have a light meal sent up whenever you wish.",
          helpTip:
            "Sau bệnh viện, khách không cần lời hoa mỹ. Nêu đúng hai điều họ cần ngay: chỗ nghỉ yên tĩnh và đồ ăn nhẹ.",
        },
      ],
      reading: {
        text: "POST-INCIDENT CHECKLIST — GR\nWithin the shift: write the incident report. Facts only — time, room, what was observed, what was done, who was called. No opinion on the cause and no diagnosis.\nGuest file: record next of kin and the hospital reference. Mark the file CONFIDENTIAL.\nOn return from hospital: quiet room if possible, light meal offered, housekeeping told not to knock in the morning.\nFollow up: check on the guest once a day until departure. Never discuss the guest's condition with any other guest.",
        questions: [
          {
            q: "Biên bản sự việc được phép ghi những gì?",
            options: [
              "A. Facts only — time, room, what was observed and done, who was called",
              "B. The staff member's opinion on what caused it",
              "C. A diagnosis from the hotel nurse",
            ],
            correct: 0,
          },
          {
            q: "Sau khi khách từ bệnh viện về, buồng phòng được dặn điều gì?",
            options: [
              "A. To clean the room early in the morning",
              "B. Not to knock in the morning",
              "C. To ask the guest about the hospital",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "So what did the doctor say was wrong?",
          good: "I am glad you are back with us, sir. May I check on you again this evening?",
        },
        {
          bad: "Room 704 was the one taken to hospital last night.",
          good: "I am afraid I cannot discuss another guest, madam. May I help you with anything else?",
        },
      ],
      game: [
        {
          prompt: "What actually happened to the couple in the room next to ours last night?",
          options: [
            {
              text: "I am afraid I am not able to discuss another guest, sir. Is there anything I can help you with?",
              correct: true,
            },
            { text: "The gentleman was taken to hospital. He is fine now.", correct: false },
            { text: "It was a medical problem, but I cannot say more than that.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const GR_WEEK_38: WeekContent = {
  departmentId: "GR",
  weekNumber: 38,
  weekTitleEn: "Storms and Disrupted Plans",
  weekTitleVi: "Bão và gián đoạn lịch trình của khách",
  reviewWords: [
    "Cancelled",
    "Rainy",
    "Arrange a car",
    "Airport transfer",
    "Take a note",
    "Departure schedule",
    "Update the record",
    "Apology letter",
  ],
  lessons: [
    {
      lessonId: "GR_38_1",
      lessonOrder: 1,
      titleEn: "The Warning and the Announcement",
      titleVi: "Cảnh báo và thông báo tới khách",
      vocabulary: [
        {
          word: "Typhoon",
          phonetic: "/taɪˈfuːn/",
          definition: "Bão nhiệt đới",
          context: "A typhoon is expected to reach the coast on Thursday.",
          icon: "🌀",
        },
        {
          word: "Weather warning",
          phonetic: "/ˈweðə ˈwɔːnɪŋ/",
          definition: "Cảnh báo thời tiết",
          context: "The authorities have issued a weather warning for tonight.",
          icon: "📢",
        },
        {
          word: "Precaution",
          phonetic: "/prɪˈkɔːʃən/",
          definition: "Biện pháp phòng ngừa",
          context: "Closing the beach is a precaution, not an emergency.",
          icon: "🛡️",
        },
        {
          word: "Updated",
          phonetic: "/ʌpˈdeɪtɪd/",
          definition: "Được cập nhật thông tin mới nhất",
          context: "We will keep you updated every three hours.",
          icon: "🔄",
        },
      ],
      grammar: [
        {
          rude: "Big storm coming. Stay inside.",
          polite:
            "A weather warning has been issued for tonight, sir, so the beach will close as a precaution.",
          rule: "Bị động 'has been issued' cho thấy thông tin đến từ cơ quan chức năng, không phải ý kiến của khách sạn.",
        },
        {
          rude: "I do not know when it will finish.",
          polite:
            "We expect it to pass by Friday morning, madam, and I will keep you updated every three hours.",
          rule: "Không biết chính xác thì cam kết NHỊP cập nhật. Khách chịu được sự bất định, không chịu được im lặng.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Is this dangerous? Should we be worried?",
          targetResponse:
            "The hotel is built for this, madam, and we are simply taking precautions. I will come to you personally with every update.",
          helpTip:
            "Trấn an bằng năng lực chuẩn bị của khách sạn, không bằng câu 'đừng lo'. Rồi hứa một việc cụ thể bạn sẽ làm.",
        },
      ],
      reading: {
        text: "GUEST NOTICE — WEATHER UPDATE 1\nA tropical storm warning is in effect from 18:00 today until 09:00 Friday.\nCLOSED as a precaution: beach, outdoor pool, water sports, rooftop bar, garden restaurant.\nOPEN as normal: indoor restaurant, spa, gym, lounge, kids club.\nAll outdoor tours today and tomorrow are postponed. Our team will contact every booked guest individually.\nWe will post an updated notice every three hours at the lounge desk and slide a copy under your door.",
        questions: [
          {
            q: "Trong thời gian có cảnh báo, khu vực nào vẫn mở bình thường?",
            options: [
              "A. The beach and the outdoor pool",
              "B. The spa, the gym and the kids club",
              "C. The rooftop bar",
            ],
            correct: 1,
          },
          {
            q: "Thông báo mới được cập nhật bao lâu một lần?",
            options: ["A. Every hour", "B. Every three hours", "C. Once a day"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Storm coming, everything closed, sorry.",
          good: "The beach closes at six as a precaution, sir. The spa and lounge stay open all evening.",
        },
        {
          bad: "Nobody knows. Maybe two days, maybe more.",
          good: "We expect it to pass by Friday morning, madam, and I will update you every three hours.",
        },
      ],
      game: [
        {
          prompt: "We flew across the world for a beach holiday and now you have closed the beach.",
          options: [
            {
              text: "I know how disappointing that is, madam. The closure is a safety precaution, and may I show you what we have arranged indoors?",
              correct: true,
            },
            { text: "There is nothing we can do about the weather, madam.", correct: false },
            { text: "The beach will probably open again in a few days.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "GR_38_2",
      lessonOrder: 2,
      titleEn: "Postponed Tours and Indoor Alternatives",
      titleVi: "Hoãn tour và chuyển sang hoạt động trong nhà",
      vocabulary: [
        {
          word: "Postpone",
          phonetic: "/pəˈspəʊn/",
          definition: "Hoãn lại sang thời điểm khác",
          context: "We have had to postpone tomorrow's boat trip.",
          icon: "⏸️",
        },
        {
          word: "Full refund",
          phonetic: "/fʊl ˈriːfʌnd/",
          definition: "Hoàn tiền toàn bộ",
          context: "A full refund is available if the new date does not suit you.",
          icon: "💰",
        },
        {
          word: "Indoor activity",
          phonetic: "/ˈɪndɔːr əkˈtɪvəti/",
          definition: "Hoạt động trong nhà",
          context: "We have added three indoor activities for the children.",
          icon: "🎨",
        },
        {
          word: "Rain check",
          phonetic: "/reɪn tʃek/",
          definition: "Phiếu hẹn lại dịp khác",
          context: "May I offer you a rain check for the sunset cruise?",
          icon: "🎟️",
        },
      ],
      grammar: [
        {
          rude: "Tour cancelled. No refund, weather is not our fault.",
          polite:
            "The boat trip is postponed, sir. May I move you to Saturday, or would you prefer a full refund?",
          rule: "Đưa hai lựa chọn cụ thể ngay sau tin xấu. Khách mất quyền kiểm soát thời tiết, phải trả lại cho họ quyền chọn.",
        },
        {
          rude: "Stay in your room, there is nothing to do.",
          polite:
            "We have added a cooking class at eleven and a film for the children at three, madam.",
          rule: "Thay thế phải cụ thể có giờ giấc. 'Có nhiều hoạt động trong nhà' không an ủi được ai.",
        },
      ],
      speaking: [
        {
          guestPrompt: "This was the only day we could do the cruise. Now what?",
          targetResponse:
            "I am sorry, sir. If you leave on Sunday, I can move you to Saturday evening. If not, I will refund it in full today.",
          helpTip:
            "Hai câu điều kiện 'If…, I can… / If not, I will…' bao trọn hai khả năng. Khách không phải hỏi thêm câu nào.",
        },
      ],
      reading: {
        text: "STORM PROGRAMME — GUEST RELATIONS\nAll outdoor tours 14-15 July: POSTPONED. Contact each booked guest by phone, not by note.\nOffer in this order: (1) same tour on the first clear day, (2) rain check valid 12 months, (3) full refund, processed same day.\nAdded indoor programme: cooking class 11:00, spa promotion 14:00, children's film 15:00, live music in the lounge 19:30.\nKeep a list of guests departing before the storm clears — those guests can only be offered a refund, so call them first.",
        questions: [
          {
            q: "Thứ tự phương án được đưa ra cho khách là gì?",
            options: [
              "A. Refund, then rain check, then a new date",
              "B. A new date, then a rain check, then a full refund",
              "C. Only a full refund",
            ],
            correct: 1,
          },
          {
            q: "Vì sao phải gọi trước cho nhóm khách rời đi sớm?",
            options: [
              "A. Because they can only be offered a refund",
              "B. Because they booked the most expensive tour",
              "C. Because they are lounge members",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Weather is not our fault. No refund.",
          good: "May I move you to Saturday, sir, or would you prefer a full refund today?",
        },
        {
          bad: "There are some indoor things, I think.",
          good: "There is a cooking class at eleven and a film for the children at three, madam.",
        },
      ],
      game: [
        {
          prompt: "We leave on Friday morning, so a later date is no use to us at all.",
          options: [
            {
              text: "Then I will refund the trip in full today, madam, and I would like to offer you the cooking class as our guest.",
              correct: true,
            },
            {
              text: "In that case you will need to claim on your travel insurance.",
              correct: false,
            },
            { text: "I can give you a voucher for your next visit.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "GR_38_3",
      lessonOrder: 3,
      titleEn: "Stranded Guests and Changed Flights",
      titleVi: "Khách mắc kẹt và chuyến bay bị đổi",
      vocabulary: [
        {
          word: "Stranded",
          phonetic: "/ˈstrændɪd/",
          definition: "Bị mắc kẹt, không đi tiếp được",
          context: "Two families are stranded until the airport reopens.",
          icon: "🧳",
        },
        {
          word: "Rebook",
          phonetic: "/ˌriːˈbʊk/",
          definition: "Đặt lại vé hoặc phòng",
          context: "The airline will rebook you at no extra cost.",
          icon: "✈️",
        },
        {
          word: "Extend the stay",
          phonetic: "/ɪkˈstend ðə steɪ/",
          definition: "Ở thêm, kéo dài kỳ nghỉ",
          context: "May I extend the stay for you until Sunday?",
          icon: "🗓️",
        },
        {
          word: "Same rate",
          phonetic: "/seɪm reɪt/",
          definition: "Giữ nguyên giá phòng cũ",
          context: "We will hold the same rate for the extra nights.",
          icon: "🏷️",
        },
      ],
      grammar: [
        {
          rude: "Airport closed. Not our problem. New night, new price.",
          polite:
            "The airport is closed until Friday, sir. I will extend the stay at the same rate for you.",
          rule: "Nêu sự thật rồi nhận việc về mình ngay trong câu kế tiếp. Nói 'không phải việc của chúng tôi' là mất khách vĩnh viễn.",
        },
        {
          rude: "Call the airline yourself.",
          polite:
            "May I call the airline on your behalf, madam? They are quicker to answer on our trade line.",
          rule: "'On your behalf' + lý do thực tế. Đề nghị giúp phải kèm lý do thì khách mới thấy đó không phải khách sáo.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Our flight is cancelled and we have nowhere to stay tonight.",
          targetResponse:
            "You are staying right here, madam. I have kept your room at the same rate, and I will call the airline for you now.",
          helpTip:
            "Câu đầu tiên phải xoá nỗi lo lớn nhất: chỗ ngủ. Mọi thứ khác nói sau, khi khách đã thở được.",
        },
        {
          guestPrompt: "Will you charge us for the extra nights?",
          targetResponse:
            "We will hold the same rate you booked, sir, and breakfast stays included for as long as you are with us.",
          helpTip:
            "Trả lời thẳng vào câu hỏi tiền bạc, đừng vòng vo. Rồi thêm một điều tốt nữa mà khách chưa hỏi tới.",
        },
      ],
      reading: {
        text: "STRANDED GUEST PROCEDURE — GR DESK\n1. Room first: extend at the SAME rate the guest already booked. Never quote a walk-in rate to a stranded guest.\n2. Breakfast remains included for every extended night.\n3. Offer to call the airline on the guest's behalf using the trade line, and write the new flight details on a card for the guest.\n4. Log every stranded guest on the shared sheet so the airport representative can group the transfers when the airport reopens.\n5. Guests whose insurance requires proof: issue a letter confirming the dates and the reason for the extension.",
        questions: [
          {
            q: "Khách bị mắc kẹt được tính giá phòng thế nào?",
            options: [
              "A. The walk-in rate for the extra nights",
              "B. The same rate the guest already booked",
              "C. Half the normal rate",
            ],
            correct: 1,
          },
          {
            q: "Khách cần chứng từ cho bảo hiểm thì khách sạn cấp gì?",
            options: [
              "A. A letter confirming the dates and the reason for the extension",
              "B. A copy of the weather warning",
              "C. A new booking confirmation only",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Tonight is a walk-in rate, madam. It is higher.",
          good: "I will hold the same rate you booked, madam, for as long as the airport is closed.",
        },
        {
          bad: "The airline number is on your ticket.",
          good: "May I call the airline on your behalf, sir? Our trade line is answered faster.",
        },
      ],
      game: [
        {
          prompt: "Our insurance company wants proof that we could not fly home. Can you help?",
          options: [
            {
              text: "Of course, madam. I will prepare a letter today confirming your dates and the reason your stay was extended.",
              correct: true,
            },
            { text: "You should ask the airline for that, not the hotel.", correct: false },
            { text: "I can give you your room invoice at check-out.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "GR_38_4",
      lessonOrder: 4,
      titleEn: "When the Power Goes and the Roads Close",
      titleVi: "Khi mất điện và đường bị chia cắt",
      vocabulary: [
        {
          word: "Power cut",
          phonetic: "/ˈpaʊə kʌt/",
          definition: "Mất điện",
          context: "There may be a short power cut during the storm.",
          icon: "🔌",
        },
        {
          word: "Generator",
          phonetic: "/ˈdʒenəreɪtə/",
          definition: "Máy phát điện",
          context: "Our generator supplies the lifts and the corridors.",
          icon: "⚡",
        },
        {
          word: "Torch",
          phonetic: "/tɔːtʃ/",
          definition: "Đèn pin",
          context: "There is a torch in the wardrobe of every room.",
          icon: "🔦",
        },
        {
          word: "Assembly point",
          phonetic: "/əˈsembli pɔɪnt/",
          definition: "Điểm tập trung khi có sự cố",
          context: "The assembly point is the main ballroom, not the garden.",
          icon: "📍",
        },
      ],
      grammar: [
        {
          rude: "Power is out. Use your phone light.",
          polite:
            "There is a torch in the wardrobe of every room, madam, and our generator keeps the corridors lit.",
          rule: "Nói điều CÒN hoạt động ngay sau điều đã hỏng. Người trong bóng tối cần biết mình vẫn an toàn.",
        },
        {
          rude: "Do not use the lift.",
          polite:
            "I would use the staircase during the storm, sir. Our staff are on every floor if you need help.",
          rule: "'I would…' là lời khuyên nghề nghiệp, mềm hơn mệnh lệnh mà vẫn rõ điều nên làm.",
        },
      ],
      speaking: [
        {
          guestPrompt: "The lights just went out. What is happening?",
          targetResponse:
            "It is a short power cut from the storm, madam. Our generator is already running, and I am coming up to your floor now.",
          helpTip:
            "Ba phần: điều gì đang xảy ra, điều gì đã được xử lý, và bạn đang đến. Nói đủ ba phần trong một hơi bình tĩnh.",
        },
      ],
      reading: {
        text: "STORM NIGHT — GR FLOOR DUTY\nGenerator covers: corridors, lifts, one restaurant, the lounge, all fire systems. It does NOT cover room air-conditioning or the minibar fridge.\nEvery room has a torch in the wardrobe. Check the ten rooms with elderly or disabled guests first and hand the torch to them personally.\nAssembly point is the MAIN BALLROOM — never the garden or the car park during a storm.\nIf the roads close: reassure guests that the kitchen holds four days of supplies, and post the meal times at the lounge desk.",
        questions: [
          {
            q: "Máy phát điện KHÔNG cấp điện cho thứ gì?",
            options: [
              "A. The corridors and the lifts",
              "B. Room air-conditioning and the minibar fridge",
              "C. The fire systems",
            ],
            correct: 1,
          },
          {
            q: "Trong bão, điểm tập trung là ở đâu?",
            options: ["A. The garden", "B. The car park", "C. The main ballroom"],
            correct: 2,
          },
        ],
      },
      arcade: [
        {
          bad: "No power. Wait in your room until it comes back.",
          good: "Our generator keeps the corridors and lifts running, sir. There is a torch in your wardrobe.",
        },
        {
          bad: "Everyone go outside to the garden.",
          good: "In a storm our assembly point is the main ballroom, madam. Please follow me indoors.",
        },
      ],
      game: [
        {
          prompt: "If the roads stay closed, are we going to run out of food here?",
          options: [
            {
              text: "Not at all, sir. Our kitchen holds four days of supplies, and the meal times are posted at the lounge desk.",
              correct: true,
            },
            { text: "I hope not. We are waiting to hear from our supplier.", correct: false },
            { text: "The roads usually reopen quickly, so I would not worry.", correct: false },
          ],
        },
      ],
    },
  ],
};

// The last three recovered weeks. Each fills a gap the audit measured
// rather than guessed at: children's menus and Halal food (4 and 5
// strings in 240 dep-weeks, all incidental), therapist gender requests
// and tipping policy (zero and five), insects in a guest room and Lost &
// Found as a procedure rather than a single vocabulary line (six and
// zero). Their week 38 stays on the spine — see the note in the commit.

export const FB_WEEK_37: WeekContent = {
  departmentId: "FB",
  weekNumber: 37,
  weekTitleEn: "Children at the Table, and Guests Who Eat Halal",
  weekTitleVi: "Phục vụ trẻ em và khách ăn Halal",
  reviewWords: [
    "High chair",
    "Dietary need",
    "Nut allergy",
    "Set lunch",
    "Kitchen team",
    "Prepare a nut-free dish",
    "Today's special",
    "Sharing plate",
  ],
  lessons: [
    {
      lessonId: "FB_37_1",
      lessonOrder: 1,
      titleEn: "The Children's Menu",
      titleVi: "Thực đơn dành cho trẻ em",
      vocabulary: [
        {
          word: "Children's menu",
          phonetic: "/ˈtʃɪldrənz ˈmenjuː/",
          definition: "Thực đơn riêng cho trẻ em",
          context: "May I bring you the children's menu, madam?",
          icon: "🧒",
        },
        {
          word: "Small portion",
          phonetic: "/smɔːl ˈpɔːʃən/",
          definition: "Suất nhỏ",
          context: "We can serve a small portion of any main course.",
          icon: "🍽️",
        },
        {
          word: "Mild",
          phonetic: "/maɪld/",
          definition: "Ít cay, vị nhẹ",
          context: "The kitchen will make it mild for the children.",
          icon: "🌶️",
        },
        {
          word: "Straight away",
          phonetic: "/streɪt əˈweɪ/",
          definition: "Ngay lập tức",
          context: "I will bring some bread straight away for the little one.",
          icon: "⚡",
        },
      ],
      grammar: [
        {
          rude: "Children eat the same menu. No special food.",
          polite:
            "We have a children's menu, sir, and the kitchen can make a small portion of anything you see.",
          rule: "Nêu điều có sẵn rồi mở rộng bằng 'and…can'. Bố mẹ cần biết mình còn lựa chọn nào ngoài tờ thực đơn.",
        },
        {
          rude: "Wait for the food like everyone.",
          polite:
            "May I bring the children something small straight away, madam, while the main courses are cooking?",
          rule: "Xin phép trước khi tự ý phục vụ trẻ. Chủ động về thời gian chờ là kỹ năng phục vụ gia đình quan trọng nhất.",
        },
      ],
      speaking: [
        {
          guestPrompt: "My son is four and he is already hungry and tired.",
          targetResponse:
            "Let me bring him some bread and fruit straight away, madam, and a high chair if that would help.",
          helpTip:
            "Trẻ đói không chờ được. Đề xuất đồ ăn nhẹ TRƯỚC khi hỏi món chính — đó là điều cha mẹ nhớ mãi.",
        },
      ],
      reading: {
        text: "CHILDREN'S SERVICE STANDARD — F&B\nOffer the children's menu and a high chair before taking the adults' order.\nBring bread, fruit or plain rice to the table within 3 minutes of seating a family. Do not wait for the order.\nAny main course can be served as a small portion at half price. Any dish can be made mild on request.\nServe the children's food FIRST, not with the adults'.\nNever leave a hot plate or a sharp knife within a child's reach. Place drinks on the far side of the table.",
        questions: [
          {
            q: "Món của trẻ được phục vụ vào lúc nào?",
            options: [
              "A. At the same time as the adults' food",
              "B. First, before the adults' food",
              "C. After the adults have finished",
            ],
            correct: 1,
          },
          {
            q: "Trong vòng 3 phút sau khi gia đình ngồi xuống, phải mang gì ra bàn?",
            options: [
              "A. Bread, fruit or plain rice, without waiting for the order",
              "B. The bill folder",
              "C. The wine list",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Kids eat from the normal menu.",
          good: "May I bring the children's menu, sir? We can also do a small portion of any main course.",
        },
        {
          bad: "Food comes when it comes.",
          good: "Let me bring the little one some bread straight away, madam, while the kitchen prepares your order.",
        },
      ],
      game: [
        {
          prompt:
            "Do you have anything my daughter will actually eat? She is a fussy five-year-old.",
          options: [
            {
              text: "Of course, madam. There is a children's menu, and the kitchen will happily make any dish mild and in a small portion.",
              correct: true,
            },
            { text: "Children usually like the fried rice. Try that.", correct: false },
            { text: "She can share something from your plate.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FB_37_2",
      lessonOrder: 2,
      titleEn: "A Guest Asks Whether the Food Is Halal",
      titleVi: "Khi khách hỏi món ăn có Halal không",
      vocabulary: [
        {
          word: "Halal",
          phonetic: "/həˈlɑːl/",
          definition: "Thực phẩm hợp quy chuẩn Hồi giáo",
          context: "Our beef and chicken are halal certified.",
          icon: "🕌",
        },
        {
          word: "Certified",
          phonetic: "/ˈsɜːtɪfaɪd/",
          definition: "Có chứng nhận chính thức",
          context: "The supplier is certified and we keep the paperwork.",
          icon: "📜",
        },
        {
          word: "Pork",
          phonetic: "/pɔːk/",
          definition: "Thịt lợn",
          context: "This dish contains no pork at all.",
          icon: "🚫",
        },
        {
          word: "Separate utensils",
          phonetic: "/ˈseprət juːˈtensəlz/",
          definition: "Dụng cụ nấu và phục vụ riêng biệt",
          context: "The kitchen uses separate utensils for halal orders.",
          icon: "🍴",
        },
      ],
      grammar: [
        {
          rude: "Yes, halal, no problem.",
          polite:
            "Our beef and chicken are halal certified, sir. The seafood is not, so may I mark your order?",
          rule: "Không bao giờ nói 'có' cho toàn bộ thực đơn. Nói rõ món nào có, món nào không — sai ở đây là xúc phạm đức tin.",
        },
        {
          rude: "I do not know. Ask the chef.",
          polite:
            "Let me check with the chef and bring you a certain answer, madam, rather than guess.",
          rule: "'Rather than guess' cho khách thấy bạn coi trọng câu hỏi. Với yêu cầu tôn giáo, 'chắc là' còn tệ hơn 'tôi chưa biết'.",
        },
      ],
      speaking: [
        {
          guestPrompt: "We do not eat pork. Is the soup made with pork stock?",
          targetResponse:
            "Let me confirm with the chef before you order, sir. If it is made with pork stock, I will ask for a chicken stock version.",
          helpTip:
            "Xác nhận trước khi khách gọi món, không phải sau. Và nêu sẵn giải pháp thay thế trong cùng lượt nói.",
        },
        {
          guestPrompt: "Is the same pan used for the pork dishes?",
          targetResponse:
            "The kitchen keeps separate utensils and a separate pan for halal orders, madam. I will mark the order as halal as well.",
          helpTip:
            "Trả lời đúng câu hỏi về nhiễm chéo, rồi thêm bước bạn sẽ làm. Khách hỏi câu đó vì họ từng gặp sai sót.",
        },
      ],
      reading: {
        text: "HALAL SERVICE — F&B STANDARD\nCertified halal: all beef, lamb and chicken. Certificates are held by the Executive Chef and may be shown to a guest on request.\nNOT certified: seafood suppliers, and any dish cooked with wine, mirin or rice wine.\nContains pork or lard: the pastry section's puff pastry, the house broth, and three items on the breakfast buffet — see the allergen board.\nKitchen procedure: separate utensils, separate pan, halal orders cooked first in the shift.\nWrite HALAL on the order slip. Verbal instructions to the kitchen are not accepted.",
        questions: [
          {
            q: "Nhà hàng phải làm gì để yêu cầu Halal được bếp chấp nhận?",
            options: [
              "A. Tell the kitchen staff verbally",
              "B. Write HALAL on the order slip",
              "C. Ask the guest to speak to the chef",
            ],
            correct: 1,
          },
          {
            q: "Món nào KHÔNG có chứng nhận Halal?",
            options: ["A. The beef", "B. The chicken", "C. The seafood"],
            correct: 2,
          },
        ],
      },
      arcade: [
        {
          bad: "Everything here is halal, do not worry.",
          good: "Our beef and chicken are certified, sir. The seafood is not — may I recommend the beef?",
        },
        {
          bad: "Probably no pork in it.",
          good: "Let me confirm with the chef before you order, madam, rather than give you a guess.",
        },
      ],
      game: [
        {
          prompt:
            "Can you show me the halal certificate? We have been told 'yes' before and it was not true.",
          options: [
            {
              text: "Absolutely, sir. The Executive Chef holds the certificates and I will bring them to your table.",
              correct: true,
            },
            { text: "We do not show those to guests, but I promise it is halal.", correct: false },
            { text: "I am sure it is fine. Our chef is very careful.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FB_37_3",
      lessonOrder: 3,
      titleEn: "When the Honest Answer Is No",
      titleVi: "Khi câu trả lời trung thực là không",
      vocabulary: [
        {
          word: "Cross-contamination",
          phonetic: "/krɒs kənˌtæmɪˈneɪʃən/",
          definition: "Nhiễm chéo giữa các loại thực phẩm",
          context: "We cannot rule out cross-contamination in the buffet.",
          icon: "⚠️",
        },
        {
          word: "Cooking wine",
          phonetic: "/ˈkʊkɪŋ waɪn/",
          definition: "Rượu dùng để nấu ăn",
          context: "That sauce is finished with cooking wine.",
          icon: "🍶",
        },
        {
          word: "Made to order",
          phonetic: "/meɪd tu ˈɔːdə/",
          definition: "Nấu riêng theo yêu cầu",
          context: "I can have a dish made to order for you instead.",
          icon: "👨‍🍳",
        },
        {
          word: "Ingredient",
          phonetic: "/ɪnˈɡriːdiənt/",
          definition: "Thành phần, nguyên liệu",
          context: "I will bring you the full ingredient list.",
          icon: "📝",
        },
      ],
      grammar: [
        {
          rude: "Buffet is fine, just take what you want.",
          polite:
            "At the buffet I cannot rule out cross-contamination, madam, so may I have a dish made to order for you?",
          rule: "Thừa nhận giới hạn rồi đưa ngay lối ra. Câu này bảo vệ khách và bảo vệ cả nhà hàng.",
        },
        {
          rude: "A little wine in the sauce does not count.",
          polite:
            "That sauce is finished with cooking wine, sir. The grilled version has no alcohol at all.",
          rule: "Không tự quyết định điều gì 'không đáng kể' với đức tin hay dị ứng của khách. Nêu sự thật, rồi nêu phương án.",
        },
      ],
      speaking: [
        {
          guestPrompt: "We would like to eat at the buffet like everyone else.",
          targetResponse:
            "Of course, sir. May I walk the buffet with you and point out the safe dishes, and have anything else made to order?",
          helpTip:
            "Đừng tách khách ra khỏi trải nghiệm chung. Đi cùng khách dọc quầy buffet là cách phục vụ vừa an toàn vừa tôn trọng.",
        },
      ],
      reading: {
        text: "BUFFET AND DIETARY REQUESTS — WHAT WE MAY PROMISE\nWe MAY say: this dish contains no pork · this dish is made with certified halal meat · this dish is made to order in a clean pan.\nWe MAY NOT say: the buffet is completely halal · there is no chance of cross-contamination at a shared buffet · a dish is safe for a severe allergy when it has been on an open counter.\nIf a guest has a severe allergy or a strict religious requirement, offer a made-to-order dish from the kitchen instead of the buffet, at no extra charge.\nBring the ingredient list if the guest asks. Never quote it from memory.",
        questions: [
          {
            q: "Điều gì nhân viên KHÔNG được phép khẳng định?",
            options: [
              "A. That a dish contains no pork",
              "B. That there is no chance of cross-contamination at a shared buffet",
              "C. That a dish is made to order in a clean pan",
            ],
            correct: 1,
          },
          {
            q: "Khách dị ứng nặng thì được đề xuất gì?",
            options: [
              "A. A made-to-order dish from the kitchen at no extra charge",
              "B. The safest corner of the buffet",
              "C. A written warning to sign",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "The buffet is completely safe for you.",
          good: "At a shared buffet I cannot promise that, madam. May I have your dish made to order instead?",
        },
        {
          bad: "I think there is no wine in it.",
          good: "That sauce is finished with cooking wine, sir. The grilled version has none at all.",
        },
      ],
      game: [
        {
          prompt:
            "Just tell me honestly — can my son with the severe nut allergy eat from that buffet?",
          options: [
            {
              text: "Honestly, sir, I would not risk it at a shared buffet. Let me have his meal made to order in a clean pan.",
              correct: true,
            },
            { text: "The nut dishes are at the far end, so it should be fine.", correct: false },
            { text: "Yes, our buffet is very carefully separated.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FB_37_4",
      lessonOrder: 4,
      titleEn: "Serving the Family Table",
      titleVi: "Phục vụ trọn vẹn một bàn gia đình",
      vocabulary: [
        {
          word: "Booster seat",
          phonetic: "/ˈbuːstə siːt/",
          definition: "Ghế kê cao cho trẻ lớn hơn",
          context: "Would a booster seat suit your son better?",
          icon: "🪑",
        },
        {
          word: "Spill",
          phonetic: "/spɪl/",
          definition: "Đổ, làm rớt đồ ăn thức uống",
          context: "Please do not worry about the spill, madam.",
          icon: "💧",
        },
        {
          word: "Warm the bottle",
          phonetic: "/wɔːm ðə ˈbɒtl/",
          definition: "Hâm bình sữa cho em bé",
          context: "The kitchen can warm the bottle for you.",
          icon: "🍼",
        },
        {
          word: "At the same time",
          phonetic: "/ət ðə seɪm taɪm/",
          definition: "Cùng một lúc",
          context: "I will serve the adults at the same time, sir.",
          icon: "⏱️",
        },
      ],
      grammar: [
        {
          rude: "You made a mess. Please control your child.",
          polite: "Please do not worry about the spill at all, madam. I will bring a fresh cloth.",
          rule: "Không bao giờ nhắc tới hành vi của đứa trẻ. Xoá nỗi ngại của cha mẹ rồi xử lý, chỉ hai bước đó thôi.",
        },
        {
          rude: "We do not do baby things here.",
          polite: "The kitchen can warm the bottle for you, sir. Shall I take it now?",
          rule: "Chuyển từ 'chúng tôi không có' sang 'chúng tôi làm được gì'. Rồi hỏi một câu để việc đó xảy ra ngay.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Could you bring our food quickly? The baby will not last much longer.",
          targetResponse:
            "I understand completely, madam. I will ask the kitchen to send your table first and bring the children's food ahead of yours.",
          helpTip:
            "'I understand completely' rồi hai hành động cụ thể. Cha mẹ đang căng thẳng cần nghe kế hoạch, không cần lời cảm thông chung chung.",
        },
      ],
      reading: {
        text: "FAMILY TABLE — SERVICE NOTES\nSeating: away from the buffet traffic and the hot station, near a wall if possible. Offer a high chair for under-2s and a booster seat for 3-6s.\nBaby needs: the kitchen will warm a bottle or baby food at any time. Never refuse and never charge for it.\nSpills: clear it without comment. Never look at the parents while you clean.\nTiming: children's dishes go out first; adults' dishes go out at the same time as each other so no adult eats alone.\nAt the end: offer to wrap anything uneaten from the children's plates.",
        questions: [
          {
            q: "Khi khách làm đổ đồ ăn, nhân viên xử lý thế nào?",
            options: [
              "A. Clear it without comment and without looking at the parents",
              "B. Politely ask the parents to be more careful",
              "C. Wait until the family has left",
            ],
            correct: 0,
          },
          {
            q: "Việc hâm bình sữa cho em bé được tính phí thế nào?",
            options: [
              "A. A small service charge applies",
              "B. It is never refused and never charged",
              "C. Only for in-house guests",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Please keep your child at the table.",
          good: "Would a booster seat suit him better, madam? He would reach the table more comfortably.",
        },
        {
          bad: "Warming bottles is not our job.",
          good: "The kitchen will warm the bottle for you, sir. Shall I take it now?",
        },
      ],
      game: [
        {
          prompt: "I am so sorry, he has knocked the whole glass over the table.",
          options: [
            {
              text: "Please do not worry at all, madam. I will bring a fresh cloth and another glass right away.",
              correct: true,
            },
            { text: "It is fine, but perhaps move the glasses away from him.", correct: false },
            { text: "That happens often with children. I will clean it.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const SW_WEEK_37: WeekContent = {
  departmentId: "SW",
  weekNumber: 37,
  weekTitleEn: "Therapist Requests, Comfort and Tipping",
  weekTitleVi: "Yêu cầu kỹ thuật viên, sự thoải mái và chính sách tip",
  reviewWords: [
    "Therapist gender",
    "Therapist choice",
    "Pressure",
    "Consent form",
    "Draping technique",
    "Sensitive area",
    "Treatment fee",
    "Booking notice period",
  ],
  lessons: [
    {
      lessonId: "SW_37_1",
      lessonOrder: 1,
      titleEn: "Asking About Therapist Preference",
      titleVi: "Hỏi về giới tính kỹ thuật viên",
      vocabulary: [
        {
          word: "Female therapist",
          phonetic: "/ˈfiːmeɪl ˈθerəpɪst/",
          definition: "Kỹ thuật viên nữ",
          context: "Would you prefer a female therapist, madam?",
          icon: "👩",
        },
        {
          word: "Male therapist",
          phonetic: "/meɪl ˈθerəpɪst/",
          definition: "Kỹ thuật viên nam",
          context: "A male therapist is available at four o'clock.",
          icon: "👨",
        },
        {
          word: "Routine question",
          phonetic: "/ruːˈtiːn ˈkwestʃən/",
          definition: "Câu hỏi thủ tục, hỏi mọi khách",
          context: "It is a routine question we ask every guest.",
          icon: "📋",
        },
        {
          word: "Either is fine",
          phonetic: "/ˈaɪðər ɪz faɪn/",
          definition: "Bên nào cũng được",
          context: "Please just say if either is fine for you.",
          icon: "👌",
        },
      ],
      grammar: [
        {
          rude: "Man or woman? Choose.",
          polite:
            "Would you prefer a female or a male therapist, madam? It is a routine question we ask everyone.",
          rule: "Nói rõ đây là câu hỏi thủ tục để khách không thấy mình bị soi. Câu này phải hỏi TRƯỚC, không đợi khách nêu.",
        },
        {
          rude: "Why? Do you not like men?",
          polite: "Of course, sir. I will make a note on your file so we never need to ask again.",
          rule: "Không bao giờ hỏi lý do. Nhận yêu cầu, ghi hồ sơ, và cho khách biết lần sau không phải nói lại.",
        },
      ],
      speaking: [
        {
          guestPrompt: "I would rather have a woman. Is that a problem?",
          targetResponse:
            "Not at all, madam. I will book a female therapist and note it on your file so you never need to ask again.",
          helpTip:
            "'Not at all' phải nói nhanh và dứt khoát. Khách vừa nêu một yêu cầu họ ngại nói ra — độ trễ nào cũng bị hiểu là do dự.",
        },
      ],
      reading: {
        text: "THERAPIST PREFERENCE — SPA RECEPTION STANDARD\nAsk every guest at the time of booking: would you prefer a female or a male therapist, or is either fine?\nAsk it as a routine question. Never ask why, and never repeat the question back to the guest in front of others.\nRecord the answer on the guest file. A guest should never have to state the preference twice.\nFor couples, ask each person separately and quietly.\nIf the guest's preferred therapist is unavailable, say so at the time of booking — never at the treatment room door.",
        questions: [
          {
            q: "Với khách đi theo cặp, phải hỏi thế nào?",
            options: [
              "A. Ask them together at the desk",
              "B. Ask each person separately and quietly",
              "C. Ask only the person who is paying",
            ],
            correct: 1,
          },
          {
            q: "Nếu kỹ thuật viên khách muốn không có, phải báo khi nào?",
            options: [
              "A. At the time of booking",
              "B. At the treatment room door",
              "C. After the treatment",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "You do not want a man? Why not?",
          good: "Of course, madam. I will note a female therapist on your file for every future visit.",
        },
        {
          bad: "We give you whoever is free.",
          good: "Would you prefer a female or a male therapist, sir? Either is fine with us.",
        },
      ],
      game: [
        {
          prompt: "For religious reasons my wife can only be treated by a woman.",
          options: [
            {
              text: "Thank you for telling me, sir. I will book a female therapist and record it so it is arranged automatically from now on.",
              correct: true,
            },
            { text: "I will see who is working that day and let you know.", correct: false },
            { text: "Our male therapists are very professional, madam.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "SW_37_2",
      lessonOrder: 2,
      titleEn: "When the Request Cannot Be Met",
      titleVi: "Khi không đáp ứng được yêu cầu",
      vocabulary: [
        {
          word: "Unavailable",
          phonetic: "/ˌʌnəˈveɪləbl/",
          definition: "Không còn trống, không sắp xếp được",
          context: "She is unavailable on Sunday, but free on Monday.",
          icon: "🚫",
        },
        {
          word: "Rearrange",
          phonetic: "/ˌriːəˈreɪndʒ/",
          definition: "Sắp xếp lại lịch",
          context: "May I rearrange your booking for the morning?",
          icon: "🔁",
        },
        {
          word: "Waiting list",
          phonetic: "/ˈweɪtɪŋ lɪst/",
          definition: "Danh sách chờ",
          context: "I will put you on the waiting list for a cancellation.",
          icon: "📃",
        },
        {
          word: "No charge",
          phonetic: "/nəʊ tʃɑːdʒ/",
          definition: "Không tính phí",
          context: "There is no charge to change the appointment.",
          icon: "🆓",
        },
      ],
      grammar: [
        {
          rude: "No woman today. Take the man or nothing.",
          polite:
            "Our female therapists are fully booked today, madam. May I offer you a booking tomorrow at ten, at no charge to change?",
          rule: "Nêu sự thật, rồi lập tức một giờ cụ thể và một điều khách được lợi. Không bao giờ để khách phải chọn giữa hai điều tệ.",
        },
        {
          rude: "You should have said earlier.",
          polite:
            "I am sorry we cannot arrange it for this afternoon, sir. May I put you on the waiting list as well?",
          rule: "Không trách khách về việc đặt muộn. Xin lỗi về kết quả, rồi mở thêm một cánh cửa nữa.",
        },
      ],
      speaking: [
        {
          guestPrompt: "But I booked a female therapist two days ago. Why has it changed?",
          targetResponse:
            "You are right, madam, and I am sorry. She is unwell today. May I rearrange your treatment for tomorrow, with thirty extra minutes as our apology?",
          helpTip:
            "Công nhận khách đúng TRƯỚC khi giải thích. 'You are right' làm dịu tình huống nhanh hơn bất kỳ lý do nào.",
        },
      ],
      reading: {
        text: "WHEN A PREFERENCE CANNOT BE MET — SPA PROCEDURE\nTell the guest as early as possible. A guest who learns at the treatment room door has already undressed and prepared.\nOffer in this order: (1) another time the same day, (2) the next day with 30 free minutes added, (3) full cancellation at no charge.\nAdd the guest to the waiting list for the same day in case of a cancellation, and call them if one comes up.\nNever suggest that the guest's preference is unimportant, and never ask them to accept a therapist they did not choose.\nRecord the failed booking so the Spa Manager can adjust the roster.",
        questions: [
          {
            q: "Vì sao phải báo cho khách càng sớm càng tốt?",
            options: [
              "A. Because the guest at the treatment room door has already undressed and prepared",
              "B. Because the price changes later in the day",
              "C. Because the roster is fixed in the morning",
            ],
            correct: 0,
          },
          {
            q: "Phương án thứ hai được đưa ra là gì?",
            options: [
              "A. Full cancellation at no charge",
              "B. The next day with thirty free minutes added",
              "C. A different therapist immediately",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Only a male therapist is free. Take it or leave it.",
          good: "Our female therapists are booked today, madam. May I offer tomorrow at ten with thirty extra minutes?",
        },
        {
          bad: "You booked too late, that is why.",
          good: "I am sorry we cannot arrange it this afternoon, sir. May I add you to the waiting list?",
        },
      ],
      game: [
        {
          prompt: "I am standing here in a robe and now you tell me there is no female therapist?",
          options: [
            {
              text: "That is our mistake and I am very sorry, madam. Please take your time to dress. I will arrange a new appointment tomorrow, at no charge and with extra time.",
              correct: true,
            },
            {
              text: "It was not on your booking, madam. I can only offer what is free.",
              correct: false,
            },
            {
              text: "Our male therapist is excellent. Would you try him this once?",
              correct: false,
            },
          ],
        },
      ],
    },
    {
      lessonId: "SW_37_3",
      lessonOrder: 3,
      titleEn: "Tips, Gratuity and the House Policy",
      titleVi: "Tiền tip, tiền boa và chính sách của khách sạn",
      vocabulary: [
        {
          word: "Gratuity",
          phonetic: "/ɡrəˈtjuːəti/",
          definition: "Tiền boa, tiền cảm ơn",
          context: "A gratuity is never expected, madam.",
          icon: "🙏",
        },
        {
          word: "Included in the price",
          phonetic: "/ɪnˈkluːdɪd ɪn ðə praɪs/",
          definition: "Đã tính trong giá dịch vụ",
          context: "Service is already included in the price.",
          icon: "🧾",
        },
        {
          word: "Shared fairly",
          phonetic: "/ʃeəd ˈfeəli/",
          definition: "Chia đều cho cả đội",
          context: "Any tip is shared fairly among the whole team.",
          icon: "🤝",
        },
        {
          word: "Tip box",
          phonetic: "/tɪp bɒks/",
          definition: "Hộp nhận tiền boa chung",
          context: "There is a tip box at the spa reception.",
          icon: "📦",
        },
      ],
      grammar: [
        {
          rude: "Tip for me? Thank you, thank you.",
          polite:
            "That is very kind, madam. A gratuity is never expected, but I will put it in the team box.",
          rule: "Nhận lời cảm ơn, nói rõ không bắt buộc, rồi cho biết tiền đi về đâu. Ba bước này giữ được cả sự lịch thiệp lẫn minh bạch.",
        },
        {
          rude: "Service charge already. No more tip.",
          polite:
            "Service is already included in the price, sir, so please do not feel any obligation.",
          rule: "'Please do not feel any obligation' gỡ áp lực cho khách. Đây là câu quan trọng nhất trong bài học này.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "That was wonderful. I would like to give her something extra. Is that allowed?",
          targetResponse:
            "That is very kind of you, sir. It is allowed, and it is shared fairly among the team. There is a tip box at reception.",
          helpTip:
            "Khách hỏi vì sợ làm sai. Trả lời rõ ba điều: được phép, chia thế nào, và bỏ ở đâu.",
        },
        {
          guestPrompt: "How much do people usually tip here?",
          targetResponse:
            "There is really no usual amount, madam. Whatever you feel is right, and honestly your kind words mean just as much to the team.",
          helpTip:
            "Không bao giờ nêu con số. Nêu con số biến lời cảm ơn tự nguyện thành một hoá đơn.",
        },
      ],
      reading: {
        text: "GRATUITY POLICY — SPA & WELLNESS\nService is included in every treatment price. Staff must never ask for, hint at, or suggest an amount for a gratuity.\nIf a guest offers cash directly to a therapist: accept graciously, thank the guest, and place it in the team box at reception before the end of the shift.\nThe box is opened and shared among the whole spa team, including the linen and cleaning staff.\nIf a guest asks how much is usual: say there is no usual amount.\nA guest may also add a gratuity to the room bill. Reception processes this; the therapist never handles it.",
        questions: [
          {
            q: "Nếu khách đưa tiền mặt trực tiếp cho kỹ thuật viên thì phải làm gì?",
            options: [
              "A. Keep it, as it was given personally",
              "B. Accept graciously and place it in the team box before the shift ends",
              "C. Refuse it politely",
            ],
            correct: 1,
          },
          {
            q: "Khi khách hỏi mức tip thông thường là bao nhiêu, phải trả lời sao?",
            options: [
              "A. Say there is no usual amount",
              "B. Suggest ten percent",
              "C. Say it depends on the treatment",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Tip is usually ten percent, madam.",
          good: "There is really no usual amount, madam. Whatever you feel is right.",
        },
        {
          bad: "For me only, please do not tell reception.",
          good: "That is very kind, sir. It goes into the team box and is shared with everyone.",
        },
      ],
      game: [
        {
          prompt: "Please, take this. You have been so kind to us all week.",
          options: [
            {
              text: "That is very kind of you, madam. It is never expected, but thank you — I will put it in the team box.",
              correct: true,
            },
            { text: "Thank you very much. Please do not mention it at reception.", correct: false },
            { text: "I am not allowed to accept anything from guests.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "SW_37_4",
      lessonOrder: 4,
      titleEn: "Comfort and Consent During the Treatment",
      titleVi: "Sự thoải mái và đồng thuận trong lúc trị liệu",
      vocabulary: [
        {
          word: "Covered",
          phonetic: "/ˈkʌvəd/",
          definition: "Được che phủ bằng khăn",
          context: "You will stay covered at all times, madam.",
          icon: "🛏️",
        },
        {
          word: "Say stop",
          phonetic: "/seɪ stɒp/",
          definition: "Nói dừng lại bất cứ lúc nào",
          context: "Please say stop at any moment and I will stop.",
          icon: "✋",
        },
        {
          word: "Undress",
          phonetic: "/ʌnˈdres/",
          definition: "Cởi bớt trang phục",
          context: "Please undress only as far as you feel comfortable.",
          icon: "🧖",
        },
        {
          word: "Step outside",
          phonetic: "/step ˌaʊtˈsaɪd/",
          definition: "Ra ngoài phòng để khách chuẩn bị",
          context: "I will step outside while you get ready.",
          icon: "🚪",
        },
      ],
      grammar: [
        {
          rude: "Take everything off and lie down.",
          polite:
            "Please undress only as far as you feel comfortable, madam. I will step outside while you get ready.",
          rule: "Hai câu này phải nói cùng nhau, mọi lần, mọi khách. Quyền quyết định và sự riêng tư là hai nửa của một điều.",
        },
        {
          rude: "It hurts because your muscle is bad.",
          polite:
            "Please say stop at any moment, sir, and tell me if you would like lighter pressure.",
          rule: "Không giải thích cơn đau, hãy trao quyền dừng lại. Câu này nhắc lại mỗi mười lăm phút trong buổi trị liệu.",
        },
      ],
      speaking: [
        {
          guestPrompt: "I have never had a massage before. I feel a bit nervous.",
          targetResponse:
            "That is very normal, madam. You will stay covered the whole time, and you can say stop at any moment.",
          helpTip:
            "Khách lo lắng cần nghe hai bảo đảm cụ thể chứ không phải lời động viên: luôn được che phủ, và luôn được dừng.",
        },
      ],
      reading: {
        text: "COMFORT AND CONSENT — EVERY TREATMENT, EVERY GUEST\nBefore: explain the treatment in one sentence, say which areas will be worked on, and ask whether any area should be avoided.\nUndressing: the guest undresses only as far as they wish. The therapist leaves the room and knocks before returning.\nDraping: the guest stays covered at all times. Only the area being worked on is uncovered.\nDuring: check the pressure after five minutes, then every fifteen. Remind the guest they may say stop at any moment.\nNever touch a sensitive area. If the guest asks for it, decline politely and inform the Spa Manager after the treatment.",
        questions: [
          {
            q: "Trước khi trị liệu, phải hỏi khách điều gì?",
            options: [
              "A. Whether any area should be avoided",
              "B. How much they will tip",
              "C. Which therapist they had last time",
            ],
            correct: 0,
          },
          {
            q: "Trong lúc trị liệu, phải kiểm tra lực xoa bóp bao lâu một lần?",
            options: [
              "A. Only at the beginning",
              "B. After five minutes, then every fifteen minutes",
              "C. Only if the guest says something",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Everything off, please, and lie face down.",
          good: "Please undress as far as you are comfortable, madam. I will step outside and knock before I return.",
        },
        {
          bad: "You must relax, it will stop hurting.",
          good: "Please say stop at any moment, sir. Would you like me to use a lighter pressure?",
        },
      ],
      game: [
        {
          prompt: "Could you work a little higher up, closer to the top of my leg?",
          options: [
            {
              text: "I am not able to work that area, sir. I will focus on the lower leg and back, where I can help most.",
              correct: true,
            },
            { text: "All right, but please do not mention it to anyone.", correct: false },
            { text: "That is not usually allowed, but I can try a little.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const HK_WEEK_37: WeekContent = {
  departmentId: "HK",
  weekNumber: 37,
  weekTitleEn: "Insects in the Room, and Lost & Found",
  weekTitleVi: "Côn trùng trong phòng và quy trình đồ thất lạc",
  reviewWords: [
    "Lost property",
    "Lost item log",
    "Pest control team",
    "Guest privacy",
    "Never touch",
    "Move you to another room",
    "Duty manager",
    "Report",
  ],
  lessons: [
    {
      lessonId: "HK_37_1",
      lessonOrder: 1,
      titleEn: "A Guest Reports an Insect",
      titleVi: "Khi khách báo có côn trùng trong phòng",
      vocabulary: [
        {
          word: "Insect",
          phonetic: "/ˈɪnsekt/",
          definition: "Côn trùng",
          context: "I am very sorry about the insect, madam.",
          icon: "🐛",
        },
        {
          word: "Mosquito",
          phonetic: "/məˈskiːtəʊ/",
          definition: "Muỗi",
          context: "There is a mosquito net available for the balcony room.",
          icon: "🦟",
        },
        {
          word: "Immediately",
          phonetic: "/ɪˈmiːdiətli/",
          definition: "Ngay lập tức",
          context: "I will come up to your room immediately.",
          icon: "🏃",
        },
        {
          word: "Tropical climate",
          phonetic: "/ˈtrɒpɪkl ˈklaɪmət/",
          definition: "Khí hậu nhiệt đới",
          context: "In a tropical climate we treat every room monthly.",
          icon: "🌴",
        },
      ],
      grammar: [
        {
          rude: "It is Vietnam. There are insects everywhere.",
          polite:
            "I am very sorry, madam. I am coming up immediately, and I will bring a colleague from pest control.",
          rule: "Không bao giờ lấy khí hậu hay đất nước ra để bào chữa. Xin lỗi, rồi nói ai đang đến và khi nào.",
        },
        {
          rude: "It is only one small ant, not a problem.",
          polite:
            "I understand completely, sir. May I move you to another room tonight while we treat this one?",
          rule: "Không đánh giá mức độ nghiêm trọng thay khách. Chuyển thẳng sang giải pháp lớn nhất bạn có quyền đề xuất.",
        },
      ],
      speaking: [
        {
          guestPrompt: "There are ants all over the bathroom floor. This is disgusting.",
          targetResponse:
            "I am so sorry, madam. I am on my way up now, and I would like to move you to another room while we treat this one.",
          helpTip:
            "Xin lỗi thật lòng, nói bạn đang đi lên, rồi đề xuất đổi phòng. Đừng hỏi 'khách muốn gì' — hãy đề xuất trước.",
        },
      ],
      reading: {
        text: "PEST REPORT — HOUSEKEEPING PROCEDURE\n1. Go to the room within 5 minutes. Never send a message instead of a person.\n2. Apologise without explaining the climate, the season or the neighbouring building.\n3. Offer a room move immediately, before the guest asks. If the hotel is full, escalate to the Duty Manager.\n4. Log the room number, the type of insect and the time. Photograph if the guest permits.\n5. Pest control treats the room the same day. The room stays out of order until they sign it off.\n6. Never spray insecticide while the guest or their belongings are in the room.",
        questions: [
          {
            q: "Phải có mặt tại phòng khách trong bao lâu?",
            options: [
              "A. Within 5 minutes",
              "B. Within one hour",
              "C. Before the end of the shift",
            ],
            correct: 0,
          },
          {
            q: "Khi nào tuyệt đối không được xịt thuốc diệt côn trùng?",
            options: [
              "A. While the guest or their belongings are in the room",
              "B. During the morning shift",
              "C. When the window is open",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "This is a tropical country, madam. It happens.",
          good: "I am so sorry, madam. I am coming up now and I would like to move you to another room.",
        },
        {
          bad: "One ant is not really a problem.",
          good: "I understand completely, sir. May I move you tonight while pest control treats this room?",
        },
      ],
      game: [
        {
          prompt: "I have just found a cockroach in my suitcase. I want to leave this hotel.",
          options: [
            {
              text: "I am truly sorry, madam. I am coming up now with the Duty Manager, and we will move you and have your belongings checked.",
              correct: true,
            },
            { text: "Cockroaches come in from outside. It is not from the room.", correct: false },
            { text: "I will send someone to spray the room this afternoon.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "HK_37_2",
      lessonOrder: 2,
      titleEn: "What You Do and Do Not Do",
      titleVi: "Việc được làm và việc không được làm",
      vocabulary: [
        {
          word: "Insect spray",
          phonetic: "/ˈɪnsekt spreɪ/",
          definition: "Thuốc xịt côn trùng",
          context: "Never use insect spray in an occupied room.",
          icon: "🧴",
        },
        {
          word: "Out of order",
          phonetic: "/aʊt əv ˈɔːdə/",
          definition: "Tạm ngưng sử dụng (phòng)",
          context: "The room stays out of order until it is signed off.",
          icon: "⛔",
        },
        {
          word: "Sign off",
          phonetic: "/saɪn ɒf/",
          definition: "Xác nhận đã xử lý xong",
          context: "Pest control must sign off before we sell the room.",
          icon: "✍️",
        },
        {
          word: "Ventilate",
          phonetic: "/ˈventɪleɪt/",
          definition: "Thông gió, mở cho thoáng khí",
          context: "Ventilate the room for two hours after treatment.",
          icon: "🪟",
        },
      ],
      grammar: [
        {
          rude: "I sprayed it already, you can go back in.",
          polite:
            "The room is out of order until pest control sign it off, sir, so your new room is ready instead.",
          rule: "Nêu quy trình an toàn rồi lập tức nêu điều đã sẵn sàng cho khách. Quy định không kèm giải pháp là sự từ chối.",
        },
        {
          rude: "Put your bags there, it is fine.",
          polite:
            "Let me move your belongings myself, madam, so nothing is left in the room during treatment.",
          rule: "Nhận việc về mình thay vì hướng dẫn khách làm. Với sự cố do khách sạn gây ra, khách không nên phải động tay.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Can I just go back in once you have sprayed? I only need my charger.",
          targetResponse:
            "Let me fetch it for you, sir. The room must be ventilated for two hours after treatment, so I would rather bring your things out myself.",
          helpTip:
            "Đề nghị làm thay ngay câu đầu. Giải thích lý do an toàn ở câu sau — khách sẽ chấp nhận dễ hơn nhiều.",
        },
      ],
      reading: {
        text: "PEST TREATMENT — SAFETY RULES FOR ROOM ATTENDANTS\nNEVER spray in an occupied room, and never spray near food, a baby cot, or an open suitcase.\nMove the guest's belongings out yourself before treatment. Bag anything soft separately and label it with the room number.\nAfter treatment: ventilate for two hours minimum, then wash all linen and wipe every hard surface.\nThe room stays OUT OF ORDER until pest control sign it off in the log. Reception cannot sell it before that signature.\nIf the guest reports bites, inform the Duty Manager the same shift — that becomes a medical matter, not a cleaning one.",
        questions: [
          {
            q: "Sau khi xử lý, phòng phải được thông gió tối thiểu bao lâu?",
            options: ["A. Thirty minutes", "B. Two hours", "C. Until the next morning"],
            correct: 1,
          },
          {
            q: "Nếu khách báo bị côn trùng cắn thì việc đó được xử lý thế nào?",
            options: [
              "A. As a cleaning matter for the next shift",
              "B. As a medical matter, reported to the Duty Manager the same shift",
              "C. As a laundry matter",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "I will spray now while you pack.",
          good: "Let me move your belongings out first, madam. We never spray while anything of yours is inside.",
        },
        {
          bad: "Room is fine now, you can move back.",
          good: "The room is out of order until pest control sign it off, sir. Your new room is ready now.",
        },
      ],
      game: [
        {
          prompt: "Why can I not have my old room back? You said it was cleaned this morning.",
          options: [
            {
              text: "It was treated this morning, sir, but it stays out of order until pest control sign it off. That is for your safety.",
              correct: true,
            },
            { text: "You can move back if you really want to.", correct: false },
            { text: "The other room is nicer anyway, madam.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "HK_37_3",
      lessonOrder: 3,
      titleEn: "Lost & Found — Logging What You Find",
      titleVi: "Đồ thất lạc — Ghi nhận món đồ tìm được",
      vocabulary: [
        {
          word: "Found item",
          phonetic: "/faʊnd ˈaɪtəm/",
          definition: "Món đồ khách để quên",
          context: "Every found item goes to the office the same shift.",
          icon: "🔍",
        },
        {
          word: "Sealed bag",
          phonetic: "/siːld bæɡ/",
          definition: "Túi niêm phong",
          context: "Place the ring in a sealed bag with the label.",
          icon: "🔒",
        },
        {
          word: "Storage period",
          phonetic: "/ˈstɔːrɪdʒ ˈpɪəriəd/",
          definition: "Thời hạn lưu giữ đồ",
          context: "The storage period for valuables is six months.",
          icon: "📆",
        },
        {
          word: "Hand in",
          phonetic: "/hænd ɪn/",
          definition: "Nộp lại cho bộ phận quản lý",
          context: "Please hand in anything you find, however small.",
          icon: "🤲",
        },
      ],
      grammar: [
        {
          rude: "It was rubbish, so I threw it away.",
          polite:
            "I found a charger under the bed, madam. I have handed it in and logged it under your room number.",
          rule: "Không tự quyết định món nào là rác. Câu này báo cáo đủ ba việc: tìm thấy gì, nộp chưa, ghi dưới tên ai.",
        },
        {
          rude: "Small things we do not keep.",
          polite:
            "We log every found item, however small, sir, and we keep valuables for six months.",
          rule: "'However small' xoá tan nghi ngờ của khách. Nêu luôn thời hạn lưu giữ để khách biết mình còn thời gian.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "I think I left my wife's earrings in room 508. We checked out this morning.",
          targetResponse:
            "Let me check the lost item log for room 508 right now, madam. Anything valuable is sealed and kept for six months.",
          helpTip:
            "Kiểm tra ngay trong lúc khách còn nghe máy. Nói thời hạn lưu giữ để khách bớt lo dù bạn chưa tìm thấy.",
        },
      ],
      reading: {
        text: "LOST & FOUND — HOUSEKEEPING PROCEDURE\n1. Anything found in a room, however small, is handed in the SAME shift. Nothing stays on the trolley overnight.\n2. Log: room number, date, time, where in the room it was found, and the attendant's name.\n3. Valuables (cash, jewellery, passports, phones, laptops) go into a SEALED BAG, signed by two people, straight to the safe.\n4. Storage: valuables 6 months, ordinary items 3 months, food and opened toiletries discarded immediately.\n5. Never take a found item home, and never decide that something is rubbish. That decision is the Executive Housekeeper's.",
        questions: [
          {
            q: "Đồ có giá trị được cất giữ trong bao lâu?",
            options: ["A. Three months", "B. Six months", "C. One year"],
            correct: 1,
          },
          {
            q: "Ai là người quyết định một món đồ là bỏ đi?",
            options: [
              "A. The room attendant who found it",
              "B. The Executive Housekeeper",
              "C. The guest's next room attendant",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "I did not think it was important, so I left it.",
          good: "I found a charger under the bed, madam, and I have logged it under your room number.",
        },
        {
          bad: "We do not keep small items.",
          good: "We log every found item, however small, sir, and valuables are kept for six months.",
        },
      ],
      game: [
        {
          prompt: "Someone must have taken my watch. It was on the bedside table this morning.",
          options: [
            {
              text: "Let me check the lost item log with you right now, sir. Every valuable is sealed and signed by two people.",
              correct: true,
            },
            { text: "Our staff do not take things, sir.", correct: false },
            { text: "Are you sure you did not pack it already?", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "HK_37_4",
      lessonOrder: 4,
      titleEn: "Returning an Item and the Difficult Claim",
      titleVi: "Trả lại đồ và những yêu cầu khó xử",
      vocabulary: [
        {
          word: "Describe",
          phonetic: "/dɪˈskraɪb/",
          definition: "Mô tả chi tiết món đồ",
          context: "Could you describe the bag for me, sir?",
          icon: "🗣️",
        },
        {
          word: "Proof of identity",
          phonetic: "/pruːf əv aɪˈdentəti/",
          definition: "Giấy tờ tùy thân",
          context: "We need proof of identity before we release an item.",
          icon: "🪪",
        },
        {
          word: "Courier",
          phonetic: "/ˈkʊriə/",
          definition: "Dịch vụ chuyển phát",
          context: "We can send it by courier at your cost.",
          icon: "📮",
        },
        {
          word: "Release",
          phonetic: "/rɪˈliːs/",
          definition: "Giao trả món đồ cho người nhận",
          context: "We can only release the item to the owner.",
          icon: "🔓",
        },
      ],
      grammar: [
        {
          rude: "Prove it is yours first.",
          polite:
            "Could you describe the bag for me, madam? It is how we make sure it reaches you.",
          rule: "Hỏi mô tả kèm lý do bảo vệ chính khách. Không bao giờ nói 'chứng minh đi' — nghe như đang buộc tội.",
        },
        {
          rude: "You cannot have it. Rules.",
          polite:
            "I can only release it to your husband himself, sir, or to you with a written note from him.",
          rule: "Nêu quy định kèm CON ĐƯỜNG hợp lệ. Quy định không kèm lối đi là bức tường, không phải chính sách.",
        },
      ],
      speaking: [
        {
          guestPrompt: "We are already home in Australia. Can you post the camera to us?",
          targetResponse:
            "Of course, madam. We can send it by courier at your cost, and I will email you the tracking number the same day.",
          helpTip:
            "Nói rõ ai trả phí ngay từ đầu để không có bất ngờ về sau, rồi cam kết một hành động có thể kiểm chứng.",
        },
      ],
      reading: {
        text: "RELEASING A FOUND ITEM — HOUSEKEEPING OFFICE\nBefore release: ask the guest to DESCRIBE the item without prompting. Never show it first and ask 'is this yours?'.\nCheck proof of identity and the room record. Only the registered guest may collect.\nA third party (family, driver, colleague) needs written permission from the guest, kept with the log entry.\nPosting: courier at the guest's cost. Send the tracking number the same day. Never post cash, passports or medicine.\nRecord the release: date, who collected, ID checked, signature. An item leaves the log only with a signature against it.",
        questions: [
          {
            q: "Vì sao phải để khách mô tả món đồ trước?",
            options: [
              "A. Because the item must not be shown first and then asked about",
              "B. Because the log needs a longer entry",
              "C. Because the guest may want a different item",
            ],
            correct: 0,
          },
          {
            q: "Món nào tuyệt đối không được gửi qua chuyển phát?",
            options: [
              "A. Clothes and books",
              "B. Cash, passports and medicine",
              "C. Cameras and chargers",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Is this your bag? Here, take it.",
          good: "Could you describe the bag for me first, madam? It is how we make sure it reaches the right guest.",
        },
        {
          bad: "Your driver cannot have it. Goodbye.",
          good: "I can release it to your driver with a written note from you, sir. May I send you the form?",
        },
      ],
      game: [
        {
          prompt:
            "My friend stayed here last week and left a phone. I have come to collect it for her.",
          options: [
            {
              text: "I can release it with a written note from your friend, madam. May I send her a short form to sign?",
              correct: true,
            },
            { text: "Of course. If you can describe it, you can take it.", correct: false },
            { text: "Only she can collect it. There is nothing I can do.", correct: false },
          ],
        },
      ],
    },
  ],
};

// ============================================================
// FRONT OFFICE, PHASE 4 — hand-authored (weeks 31-36, 39-40).
//
// The spine served these from frame × bank, and Phase 4 is where that
// mechanism strains hardest: the situations stop being "name the thing and
// offer it" and become negotiation, dispute, crisis. Both blind audits
// scored P4 the weakest phase in the course and the hand-authored weeks the
// strongest material in it, so these eight move across.
//
// Each replaces a generated week of the SAME function — the matrix promises
// storytelling, personalised advice, disputes, occasions, negotiation,
// crisis, rehearsal and a final week, and that promise is kept. What changes
// is that a receptionist's version of each is written rather than assembled.
// ============================================================

export const FO_WEEK_31: WeekContent = {
  departmentId: "FO",
  weekNumber: 31,
  weekTitleEn: "Telling the Story of the Building",
  weekTitleVi: "Kể câu chuyện của toà nhà",
  reviewWords: [
    "Recommend",
    "Sea-view room",
    "Executive suite",
    "Quieter",
    "Landmark",
    "Old Quarter",
    "Instead",
    "Confident",
  ],
  lessons: [
    {
      lessonId: "FO_31_1",
      lessonOrder: 1,
      titleEn: "What This Building Was Before",
      titleVi: "Toà nhà này trước kia là gì",
      vocabulary: [
        {
          word: "Heritage",
          phonetic: "/ˈherɪtɪdʒ/",
          definition: "Di sản, giá trị lịch sử được giữ lại",
          context: "This wing is a protected heritage building, madam.",
          icon: "🏛️",
        },
        {
          word: "Restored",
          phonetic: "/rɪˈstɔːd/",
          definition: "Được phục dựng lại như nguyên bản",
          context: "The staircase was restored using the original drawings.",
          icon: "🔨",
        },
        {
          word: "Original",
          phonetic: "/əˈrɪdʒɪnəl/",
          definition: "Nguyên bản, từ thuở ban đầu",
          context: "The floor tiles in the lobby are original.",
          icon: "🧱",
        },
        {
          word: "Courtyard",
          phonetic: "/ˈkɔːtjɑːd/",
          definition: "Sân trong giữa toà nhà",
          context: "The courtyard was the family garden a hundred years ago.",
          icon: "🌿",
        },
      ],
      grammar: [
        {
          rude: "This building is old.",
          polite: "This wing dates from 1925, sir, and the lobby tiles are original.",
          rule: "'Old' nghe như xuống cấp. Nêu năm và một chi tiết cụ thể thì cùng một sự thật lại thành giá trị.",
        },
        {
          rude: "They fixed it last year.",
          polite: "The staircase was restored last year using the original drawings, madam.",
          rule: "Bị động 'was restored' đặt trọng tâm vào công trình chứ không vào người sửa — đúng giọng kể di sản.",
        },
      ],
      speaking: [
        {
          guestPrompt: "This lobby is beautiful. How old is the hotel?",
          targetResponse:
            "The building dates from 1925, madam. It was a merchant house, and the courtyard was the family garden.",
          helpTip:
            "Đọc năm 1925 là 'nineteen twenty-five', không phải 'one thousand nine hundred'. Ngắt nhẹ sau năm rồi mới kể tiếp.",
        },
      ],
      reading: {
        text: "FRONT DESK — HOUSE HISTORY CARD\n1925: built as a merchant residence. The courtyard was the family garden.\n1954: became a state guest house. Most original tiles survive in the lobby and on the main staircase.\n2019: restored over 14 months. The staircase was rebuilt from the original 1925 drawings, now displayed by the lift.\nGuests most often ask about: the tiles, the staircase, the courtyard tree (planted 1931).\nIf a guest asks something you do not know, say so and offer the history folder kept at the desk.",
        questions: [
          {
            q: "Cầu thang được phục dựng dựa trên cái gì?",
            options: [
              "A. Photographs from 1954",
              "B. The original 1925 drawings",
              "C. A design by the current owner",
            ],
            correct: 1,
          },
          {
            q: "Nếu khách hỏi điều bạn không biết thì phải làm gì?",
            options: [
              "A. Say so and offer the history folder kept at the desk",
              "B. Give the most likely answer",
              "C. Ask the guest to search online",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "It is a very old building, madam.",
          good: "The building dates from 1925, madam. The lobby tiles are the original ones.",
        },
        {
          bad: "I do not know. Nobody tells us that.",
          good: "I am not certain, sir. May I bring you the history folder from the desk?",
        },
      ],
      game: [
        {
          prompt: "Is this a real old building, or is it new and made to look old?",
          options: [
            {
              text: "It is genuinely from 1925, sir. The lobby tiles and the staircase drawings are the originals.",
              correct: true,
            },
            { text: "It is old. Everything here is very traditional.", correct: false },
            { text: "I think it was built a long time ago, but I am not sure.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_31_2",
      lessonOrder: 2,
      titleEn: "Selling the Room by Its Story",
      titleVi: "Bán phòng bằng câu chuyện, không bằng giá",
      vocabulary: [
        {
          word: "Feature",
          phonetic: "/ˈfiːtʃə/",
          definition: "Điểm đặc trưng của phòng",
          context: "The best feature of that room is the morning light.",
          icon: "✨",
        },
        {
          word: "Overlook",
          phonetic: "/ˌəʊvəˈlʊk/",
          definition: "Nhìn xuống, hướng ra",
          context: "Rooms on this side overlook the courtyard.",
          icon: "🪟",
        },
        {
          word: "Worth the difference",
          phonetic: "/wɜːθ ðə ˈdɪfrəns/",
          definition: "Đáng với khoản chênh lệch",
          context: "Most guests feel it is worth the difference, sir.",
          icon: "⚖️",
        },
        {
          word: "See for yourself",
          phonetic: "/siː fə jɔːˈself/",
          definition: "Tự lên xem tận nơi",
          context: "May I show you the room so you can see for yourself?",
          icon: "👀",
        },
      ],
      grammar: [
        {
          rude: "The suite is better. It costs more.",
          polite:
            "The suite overlooks the courtyard, madam, and the morning light there is quite different.",
          rule: "Nâng cấp bằng một chi tiết cảm nhận được, không bằng từ 'better'. Khách tự rút ra kết luận.",
        },
        {
          rude: "Do you want to pay more or not?",
          polite: "May I show you the room first, sir? Then you can see for yourself.",
          rule: "Mời xem trước khi hỏi tiền. Đây là kỹ thuật bán hàng an toàn nhất ở quầy lễ tân.",
        },
      ],
      speaking: [
        {
          guestPrompt: "What is the difference between this room and the one above it?",
          targetResponse:
            "The room above overlooks the courtyard, sir, so it is quieter and gets the morning light. May I show you?",
          helpTip:
            "Hai lợi ích cụ thể rồi một lời mời. Đừng liệt kê năm thứ — khách chỉ nhớ được hai.",
        },
      ],
      reading: {
        text: "UPSELL GUIDE — FRONT DESK\nCourtyard rooms (floors 2-4): quiet, morning light, view of the 1931 tree. Plus 400,000 VND per night.\nStreet rooms: brighter in the afternoon, closer to the lift, and lively outside until late — busiest on Friday and Saturday evenings.\nMethod: name ONE thing the guest will notice, then offer to show the room. Never lead with the price.\nIf the guest declines, note it and do not raise it again during the stay.\nAfter 22:00, sell the courtyard room on the QUIET, never on the view: a guest off a late flight is the one who needs it most. Say: the courtyard side is away from the street, so you will sleep better tonight.",
        questions: [
          {
            q: "Theo hướng dẫn, phải mở đầu bằng gì?",
            options: [
              "A. The price difference",
              "B. One thing the guest will notice, then an offer to show the room",
              "C. A list of all the room's features",
            ],
            correct: 1,
          },
          {
            q: "Khi khách từ chối nâng cấp thì làm gì?",
            options: [
              "A. Note it and do not raise it again during the stay",
              "B. Offer again at check-out",
              "C. Offer a bigger discount",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "The suite is much better, only four hundred thousand more.",
          good: "The suite overlooks the courtyard, madam. May I show it to you?",
        },
        {
          bad: "So do you want the upgrade or not?",
          good: "Take your time, sir. The room is held for you either way.",
        },
      ],
      game: [
        {
          prompt: "Why would I pay four hundred thousand more for the same size room?",
          options: [
            {
              text: "It overlooks the courtyard rather than the street, sir, so it is noticeably quieter. May I show you both?",
              correct: true,
            },
            { text: "It is our better category. Most guests choose it.", correct: false },
            { text: "You do not have to. The standard room is fine too.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_31_3",
      lessonOrder: 3,
      titleEn: "Reading Whether They Want the Story",
      titleVi: "Đọc xem khách có muốn nghe không",
      vocabulary: [
        {
          word: "Keen",
          phonetic: "/kiːn/",
          definition: "Hào hứng, quan tâm",
          context: "Some guests are keen to hear the history.",
          icon: "🙋",
        },
        {
          word: "Straight to the room",
          phonetic: "/streɪt tə ðə ruːm/",
          definition: "Lên phòng luôn, không nán lại",
          context: "After a night flight, most guests want to go straight to the room.",
          icon: "🛗",
        },
        {
          word: "Another time",
          phonetic: "/əˈnʌðə taɪm/",
          definition: "Để dịp khác",
          context: "I can tell you another time, madam, whenever suits you.",
          icon: "🕰️",
        },
        {
          word: "Briefly",
          phonetic: "/ˈbriːfli/",
          definition: "Ngắn gọn thôi",
          context: "May I mention one thing briefly, sir?",
          icon: "⏱️",
        },
      ],
      grammar: [
        {
          rude: "Let me tell you the whole history of this hotel.",
          polite:
            "May I mention one thing about the building briefly, sir, or would you rather settle in?",
          rule: "Xin phép và đưa sẵn đường thoát. Khách mệt được từ chối mà không thấy ngại.",
        },
        {
          rude: "You are not interested, I see.",
          polite: "Of course, madam. I will tell you another time, whenever suits you.",
          rule: "Không bao giờ để lộ mình phật ý. 'Another time' giữ cánh cửa mở cho cả hai bên.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "Sorry, we have been travelling for twenty hours. Can we just get to the room?",
          targetResponse:
            "Of course, madam. Your key is ready and the lift is on the left. I will tell you about the building another time.",
          helpTip:
            "Ba việc trong một câu ngắn: chìa khoá, lối đi, hẹn dịp khác. Nói nhanh và nhẹ — khách chỉ muốn đi.",
        },
        {
          guestPrompt:
            "We are here for a few days. Is there anything we should know about the place?",
          targetResponse:
            "There is, sir. The staircase was rebuilt from the 1925 drawings, and they are displayed by the lift.",
          helpTip:
            "Khách đã mở cửa thì bước vào bằng một chi tiết cụ thể, không phải một bài giới thiệu chung.",
        },
      ],
      reading: {
        text: "WHEN TO TELL THE STORY — DESK NOTE\nTell it when: the guest asks · the guest is looking around the lobby · check-in is unhurried · the guest mentions architecture, history or photography.\nDo NOT tell it when: the guest arrived on a night flight · there is a queue · the guest is on the phone · the guest has a tired child.\nOne sentence first, always. If the guest asks a second question, continue. If not, stop.\nA guest who says no today may say yes on day two. Note in the profile that the history was offered.",
        questions: [
          {
            q: "Khi nào KHÔNG nên kể chuyện toà nhà?",
            options: [
              "A. When the guest is looking around the lobby",
              "B. When the guest arrived on a night flight or there is a queue",
              "C. When the guest mentions photography",
            ],
            correct: 1,
          },
          {
            q: "Nguyên tắc 'một câu trước' nghĩa là gì?",
            options: [
              "A. Say one sentence; continue only if the guest asks a second question",
              "B. Say one sentence and always continue",
              "C. Wait one minute before speaking",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "This hotel has a very long and interesting history, let me explain.",
          good: "May I mention one thing about the building briefly, madam?",
        },
        {
          bad: "Fine, if you are not interested.",
          good: "Of course, sir. Another time — your key is ready and the lift is on the left.",
        },
      ],
      game: [
        {
          prompt: "We are quite tired, actually.",
          options: [
            {
              text: "Then let me get you upstairs, madam. Your key is here, and the lift is just on the left.",
              correct: true,
            },
            { text: "It will only take two minutes to explain the history.", correct: false },
            { text: "That is a shame. Most guests enjoy hearing about it.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_31_4",
      lessonOrder: 4,
      titleEn: "The Story That Sets Expectations",
      titleVi: "Kể để khách không bị bất ngờ",
      vocabulary: [
        {
          word: "Compact",
          phonetic: "/kəmˈpækt/",
          definition: "Nhỏ gọn (nói về phòng, không mang nghĩa chê)",
          context: "Rooms in the old wing are compact, sir.",
          icon: "📐",
        },
        {
          word: "In all honesty",
          phonetic: "/ɪn ɔːl ˈɒnɪsti/",
          definition: "Nói thẳng, thật lòng",
          context: "In all honesty, madam, the new wing suits families better.",
          icon: "🤝",
        },
        {
          word: "Trade-off",
          phonetic: "/ˈtreɪd ɒf/",
          definition: "Sự đánh đổi giữa hai điều",
          context: "The trade-off is between charm and space.",
          icon: "🔀",
        },
        {
          word: "No surprises",
          phonetic: "/nəʊ səˈpraɪzɪz/",
          definition: "Không để khách bị bất ngờ",
          context: "I mention it now so there are no surprises later.",
          icon: "📋",
        },
      ],
      grammar: [
        {
          rude: "The old rooms are small. Nothing I can do.",
          polite:
            "The old-wing rooms are compact, madam. I mention it now so there are no surprises upstairs.",
          rule: "'Compact' thay cho 'small', và nêu lý do nói trước. Sự thật nói sớm là dịch vụ; nói muộn là khiếu nại.",
        },
        {
          rude: "You should have booked the new wing.",
          polite:
            "In all honesty, sir, the new wing suits a family better. May I move you if a room is free?",
          rule: "Không trách lựa chọn của khách. 'Frankly' cộng một đề nghị hành động biến lời khuyên thành sự giúp đỡ.",
        },
      ],
      speaking: [
        {
          guestPrompt: "The photos online made the room look much bigger than this.",
          targetResponse:
            "I understand, madam, and I am sorry. The old-wing rooms are compact. May I show you a room in the new wing?",
          helpTip:
            "Đừng bảo vệ tấm ảnh. Công nhận, xin lỗi, rồi đưa một lựa chọn thật — theo đúng thứ tự đó.",
        },
      ],
      reading: {
        text: "SETTING EXPECTATIONS AT CHECK-IN — FRONT DESK\nSay these BEFORE the guest goes up, every time:\n· Old wing: rooms are compact (18-22 m2), no bathtub, the lift stops one floor below the top.\n· Courtyard rooms: the tree is lit until 22:00; some guests find it bright.\n· Street rooms: the street is lively until late, and loudest at the weekend. Do not name an hour we cannot hold.\n· Renovation on the fourth floor until 30 April, weekdays 09:00-16:00.\nA guest told at the desk asks a question. A guest who finds out upstairs makes a complaint. Same fact, two very different shifts.",
        questions: [
          {
            q: "Vì sao phải nói những điều này TRƯỚC khi khách lên phòng?",
            options: [
              "A. Because a guest told at the desk asks a question, while one who finds out upstairs complains",
              "B. Because the policy requires a signature",
              "C. Because it saves time at check-out",
            ],
            correct: 0,
          },
          {
            q: "Việc sửa chữa ở tầng bốn diễn ra vào khung giờ nào?",
            options: ["A. 09:00-16:00 on weekdays", "B. All day every day", "C. Only at weekends"],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Nobody complains about the room size normally.",
          good: "The old-wing rooms are compact, madam. I would rather you knew now than upstairs.",
        },
        {
          bad: "There is building work, but it is not very loud.",
          good: "There is work on the fourth floor until four each weekday, sir. Shall I move you higher?",
        },
      ],
      game: [
        {
          prompt: "Nobody told us there would be drilling above our room all morning.",
          options: [
            {
              text: "We should have told you, madam, and I am sorry. May I move you to a room away from the work?",
              correct: true,
            },
            { text: "The renovation is listed on our website, madam.", correct: false },
            { text: "It finishes at four o'clock every day.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const FO_WEEK_32: WeekContent = {
  departmentId: "FO",
  weekNumber: 32,
  weekTitleEn: "Personalised Advice from What You Notice",
  weekTitleVi: "Tư vấn cá nhân hoá từ điều bạn quan sát được",
  reviewWords: [
    "Prefer",
    "Option",
    "Update",
    "Recommend",
    "Quieter",
    "Confident",
    "Instead",
    "Straight away",
  ],
  lessons: [
    {
      lessonId: "FO_32_1",
      lessonOrder: 1,
      titleEn: "Catching a Preference in Passing",
      titleVi: "Bắt lấy sở thích khách nói lướt qua",
      vocabulary: [
        {
          word: "Mention",
          phonetic: "/ˈmenʃən/",
          definition: "Nhắc tới thoáng qua",
          context: "The guest happened to mention a bad back.",
          icon: "💬",
        },
        {
          word: "Light sleeper",
          phonetic: "/laɪt ˈsliːpə/",
          definition: "Người ngủ dễ tỉnh vì tiếng động",
          context: "She said she is a light sleeper, so I moved her upstairs.",
          icon: "🌙",
        },
        {
          word: "Act on it",
          phonetic: "/ækt ɒn ɪt/",
          definition: "Làm gì đó với thông tin vừa nghe",
          context: "Hearing it is not enough — we act on it the same day.",
          icon: "⚡",
        },
        {
          word: "Unprompted",
          phonetic: "/ʌnˈprɒmptɪd/",
          definition: "Tự nhiên làm mà khách không phải hỏi",
          context: "An unprompted change is what guests remember.",
          icon: "🎁",
        },
      ],
      grammar: [
        {
          rude: "You said you sleep badly, so I moved you.",
          polite:
            "You mentioned you are a light sleeper, madam, so I have moved you to the courtyard side.",
          rule: "Nhắc lại đúng chữ khách dùng ('light sleeper'), không diễn giải lại thành điều tiêu cực hơn.",
        },
        {
          rude: "Tell me if you want something changed.",
          polite:
            "I have already moved you, sir. Please tell me if the new room does not suit you.",
          rule: "Làm trước rồi mới mời phản hồi. Hỏi trước là đẩy việc về phía khách.",
        },
      ],
      speaking: [
        {
          guestPrompt: "The traffic outside was quite loud last night, but never mind.",
          targetResponse:
            "I am sorry, madam. Let me move you to a courtyard room tonight — it faces away from the street.",
          helpTip:
            "'Never mind' không có nghĩa là bỏ qua. Khách vừa cho bạn một thông tin quý mà không đòi hỏi gì.",
        },
      ],
      reading: {
        text: "PREFERENCE CAPTURE — FRONT DESK STANDARD\nA preference is anything the guest says about how they want to stay, even in passing, even with a smile.\nCapture from: check-in small talk, complaints softened with 'never mind', requests to housekeeping, what the guest asks the concierge.\nWrite it in the profile the same shift, in the guest's own words. Do not translate 'light sleeper' into 'noise complaint'.\nAct on it within the stay if you can, not at the next booking. An unprompted change on day two is worth more than a perfect room on the next visit.\nNever tell the guest you have 'a note about them'. Say what you did, not what you recorded.",
        questions: [
          {
            q: "Ghi sở thích vào hồ sơ phải theo cách nào?",
            options: [
              "A. In the guest's own words, the same shift",
              "B. Summarised as a complaint category",
              "C. At the end of the stay",
            ],
            correct: 0,
          },
          {
            q: "Với khách, nên nói điều gì?",
            options: [
              "A. That there is a note about them in the system",
              "B. What you did, not what you recorded",
              "C. Which colleague wrote the note",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "I read in your file that you complain about noise.",
          good: "You mentioned the traffic, madam, so I have moved you to the courtyard side.",
        },
        {
          bad: "Next time you book, tell us you want a quiet room.",
          good: "I have moved you tonight, sir. Please tell me if it still is not quiet enough.",
        },
      ],
      game: [
        {
          prompt: "The pillows were a bit soft for me, but it is not a big problem.",
          options: [
            {
              text: "Let me send up a firmer pillow now, sir, and I will note it so your room is ready that way tomorrow.",
              correct: true,
            },
            { text: "I will make a note for your next stay with us.", correct: false },
            { text: "Please call housekeeping directly if you need anything.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_32_2",
      lessonOrder: 2,
      titleEn: "The Guest Who Should Not Have to Repeat",
      titleVi: "Khách quen không phải nói lại lần nữa",
      vocabulary: [
        {
          word: "As before",
          phonetic: "/əz bɪˈfɔː/",
          definition: "Như lần trước",
          context: "High floor and a firm pillow, as before, madam?",
          icon: "🔁",
        },
        {
          word: "On file",
          phonetic: "/ɒn faɪl/",
          definition: "Đã lưu trong hồ sơ",
          context: "Your usual arrangements are on file, sir.",
          icon: "🗂️",
        },
        {
          word: "Fourth stay",
          phonetic: "/fɔːθ steɪ/",
          definition: "Lần lưu trú thứ tư",
          context: "Welcome back — this is your fourth stay with us.",
          icon: "🏅",
        },
        {
          word: "Anything different",
          phonetic: "/ˈeniθɪŋ ˈdɪfrənt/",
          definition: "Có gì cần thay đổi không",
          context: "Is there anything different you would like this time?",
          icon: "🔄",
        },
      ],
      grammar: [
        {
          rude: "Do you want a high floor? Do you want a firm pillow?",
          polite:
            "High floor and a firm pillow, as before, madam? Or anything different this time?",
          rule: "Gộp mọi sở thích đã lưu vào MỘT câu xác nhận, rồi mở một cửa để khách đổi ý.",
        },
        {
          rude: "You have stayed here before, right?",
          polite: "Welcome back, sir. This is your fourth stay with us, and your room is ready.",
          rule: "Đừng hỏi điều hệ thống đã biết. Nói ra con số cho thấy khách sạn thật sự nhớ họ.",
        },
      ],
      speaking: [
        {
          guestPrompt: "I stayed here in March. I hope I do not have to explain everything again.",
          targetResponse:
            "Not at all, madam. High floor, firm pillow and early breakfast are on file. Is there anything different this time?",
          helpTip:
            "Đọc liền ba sở thích thành một chuỗi, không ngắt. Cảm giác trôi chảy chính là bằng chứng bạn đã nhớ.",
        },
      ],
      reading: {
        text: "RETURNING GUEST — DESK PROCEDURE\nBefore arrival: read the profile. Set the room to the recorded preferences before the guest reaches the desk.\nAt the desk: confirm all preferences in ONE sentence, then ask whether anything should change. Never run through them as a list of questions.\nSay the stay number if it is the third or higher. Below that it can sound as if you are counting.\nIf a recorded preference cannot be met tonight, say so at the desk, before the guest goes up.\nAfter departure: update the profile with anything new. A profile that has not changed in three stays is usually a profile nobody is reading.",
        questions: [
          {
            q: "Ở quầy, xác nhận sở thích của khách quen thế nào?",
            options: [
              "A. As a list of questions, one by one",
              "B. In one sentence, then ask whether anything should change",
              "C. Only if the guest raises it first",
            ],
            correct: 1,
          },
          {
            q: "Khi nào thì nên nói số lần lưu trú?",
            options: [
              "A. Every time, from the first stay",
              "B. From the third stay or higher",
              "C. Only for members",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Have you stayed with us before? Let me check the system.",
          good: "Welcome back, madam. This is your fourth stay, and your usual room is ready.",
        },
        {
          bad: "What floor do you want? What pillow do you want?",
          good: "High floor and a firm pillow, as before, sir? Or anything different this time?",
        },
      ],
      game: [
        {
          prompt: "Last time somebody wrote down all my preferences. Did that go anywhere?",
          options: [
            {
              text: "It did, madam. Your room on a high floor was ready, with a firm pillow, before you arrived. Anything different this time?",
              correct: true,
            },
            { text: "Yes, we keep all guest notes in the system.", correct: false },
            { text: "Let me check what my colleague recorded for you.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_32_3",
      lessonOrder: 3,
      titleEn: "When the Preference Cannot Be Met",
      titleVi: "Khi không đáp ứng được sở thích đã lưu",
      vocabulary: [
        {
          word: "Fully occupied",
          phonetic: "/ˈfʊli ˈɒkjupaɪd/",
          definition: "Kín phòng, không còn trống",
          context: "The courtyard side is fully occupied tonight, sir.",
          icon: "🚪",
        },
        {
          word: "Next best",
          phonetic: "/nekst best/",
          definition: "Phương án tốt nhì",
          context: "The next best is a room on a high floor with double glazing.",
          icon: "🥈",
        },
        {
          word: "Double glazing",
          phonetic: "/ˈdʌbl ˈɡleɪzɪŋ/",
          definition: "Cửa kính hai lớp cách âm",
          context: "The new wing has double glazing on every window.",
          icon: "🪟",
        },
        {
          word: "Tomorrow night",
          phonetic: "/təˈmɒrəʊ naɪt/",
          definition: "Đêm mai",
          context: "I can move you to your usual side tomorrow night.",
          icon: "📆",
        },
      ],
      grammar: [
        {
          rude: "No quiet room tonight. Sorry.",
          polite:
            "The courtyard side is fully occupied tonight, madam. The next best is a room on a high floor with double glazing.",
          rule: "Không dừng ở lời từ chối. 'The next best is…' đưa ngay một phương án cụ thể có thể hình dung được.",
        },
        {
          rude: "You will have to accept it for tonight.",
          polite:
            "May I move you to your usual side tomorrow night, sir? It is held under your name already.",
          rule: "Ghép giải pháp tạm thời với một cam kết có thời hạn. Nói 'held under your name' chứ đừng nói 'blocked' — 'block' là tiếng lóng nội bộ, khách nghe ra là bị chặn.",
        },
      ],
      speaking: [
        {
          guestPrompt: "So the quiet room I always get is not available. That is disappointing.",
          targetResponse:
            "I am sorry, madam. Tonight I can offer a room on a high floor with double glazing, and I have held your usual room for tomorrow.",
          helpTip:
            "Xin lỗi, phương án đêm nay, cam kết đêm mai — ba phần, một hơi. Đừng giải thích vì sao hết phòng.",
        },
      ],
      reading: {
        text: "WHEN A RECORDED PREFERENCE FAILS — DESK RULE\n1. Tell the guest at the desk, before they go up. Never let them discover it in the room.\n2. Offer the nearest equivalent and name WHY it is near: double glazing, top floor, away from the lift.\n3. Hold the correct room for the next night and say that you have done so. Say HELD to the guest — block is an internal word and a guest hears it as barred.\n4. Log the failure. Three failures for one guest is a Duty Manager conversation, not a front-desk one.\n5. Do not explain the hotel's occupancy to the guest. It is our problem to solve, not theirs to understand.",
        questions: [
          {
            q: "Vì sao phải báo cho khách ngay tại quầy?",
            options: [
              "A. So they never discover it in the room",
              "B. Because the system requires it",
              "C. To avoid paperwork later",
            ],
            correct: 0,
          },
          {
            q: "Ba lần không đáp ứng được cho cùng một khách thì sao?",
            options: [
              "A. It becomes a Duty Manager conversation",
              "B. The preference is deleted",
              "C. The guest is offered a refund",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "We are very full tonight, so there is nothing available.",
          good: "The courtyard side is full tonight, madam. May I offer a room on a high floor with double glazing?",
        },
        {
          bad: "Maybe tomorrow something will open up.",
          good: "I have held your usual room for tomorrow night, sir. It is under your name.",
        },
      ],
      game: [
        {
          prompt:
            "I book here because of that one quiet room. Now you are telling me I cannot have it?",
          options: [
            {
              text: "Not for tonight, madam, and I am sorry. I have blocked it for tomorrow, and tonight I can offer the quietest room we have.",
              correct: true,
            },
            { text: "We are fully booked tonight. There is nothing I can do.", correct: false },
            { text: "You could try booking earlier next time, madam.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_32_4",
      lessonOrder: 4,
      titleEn: "Writing It So the Next Shift Knows",
      titleVi: "Ghi sao cho ca sau hiểu được",
      vocabulary: [
        {
          word: "In their words",
          phonetic: "/ɪn ðeə wɜːdz/",
          definition: "Ghi đúng lời khách nói",
          context: "Record it in their words, not in yours.",
          icon: "✍️",
        },
        {
          word: "Actionable",
          phonetic: "/ˈækʃənəbl/",
          definition: "Ghi đủ rõ để người sau làm được",
          context: "A note is only useful if it is actionable.",
          icon: "🎯",
        },
        {
          word: "Vague",
          phonetic: "/veɪɡ/",
          definition: "Mơ hồ, chung chung",
          context: "A vague note helps nobody on the next shift.",
          icon: "🌫️",
        },
        {
          word: "Standing request",
          phonetic: "/ˈstændɪŋ rɪˈkwest/",
          definition: "Yêu cầu áp dụng cho mọi lần lưu trú",
          context: "Mark it as a standing request for every future stay.",
          icon: "📌",
        },
      ],
      grammar: [
        {
          rude: "Guest is fussy about rooms.",
          polite:
            "Guest is a light sleeper — prefers courtyard side, high floor. Standing request.",
          rule: "Không bao giờ ghi nhận xét về tính cách khách. Ghi điều kiện cụ thể và hành động cần làm.",
        },
        {
          rude: "Wants a good pillow.",
          polite: "Firm pillow, two of them, placed before arrival. Confirmed by guest in March.",
          rule: "Ghi chú tốt trả lời được ba câu: cái gì, bao nhiêu, khi nào. 'Good' không trả lời câu nào cả.",
        },
      ],
      speaking: [
        {
          guestPrompt: "My colleague left a note last time, but nothing was ready when I arrived.",
          targetResponse:
            "That should not have happened, sir. The note was not specific enough, and I will rewrite it with you now.",
          helpTip:
            "Nhận lỗi về hệ thống, không đổ cho đồng nghiệp. Rồi mời khách cùng sửa — khách thấy mình được nghe.",
        },
      ],
      reading: {
        text: "PROFILE NOTES — WHAT MAKES ONE USABLE\nUSABLE: 'Firm pillow x2, placed before arrival.' · 'Courtyard side, high floor — light sleeper.' · 'Breakfast 06:30, table by the window.'\nNOT USABLE: 'Fussy guest.' · 'Wants good service.' · 'Likes it quiet.' · 'VIP - be careful.'\nA note must survive a reader who has never met the guest. Say WHAT, HOW MANY and WHEN.\nMark a preference as a standing request only when the guest has confirmed it twice.\nNever record an opinion about a guest. Anything in a profile may be read aloud in a complaint review.",
        questions: [
          {
            q: "Một ghi chú dùng được phải trả lời những gì?",
            options: [
              "A. What, how many, and when",
              "B. Who asked and which shift recorded it",
              "C. Why the guest wants it",
            ],
            correct: 0,
          },
          {
            q: "Vì sao không bao giờ ghi nhận xét cá nhân về khách?",
            options: [
              "A. Anything in a profile may be read aloud in a complaint review",
              "B. There is not enough space in the field",
              "C. The system deletes opinions automatically",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Difficult guest, wants everything perfect.",
          good: "Light sleeper — courtyard side, high floor, firm pillow x2 before arrival.",
        },
        {
          bad: "My colleague forgot to write it down properly.",
          good: "The note was not specific enough, madam. Let me rewrite it with you now.",
        },
      ],
      game: [
        {
          prompt: "I told the last receptionist exactly what I needed. Why am I saying it again?",
          options: [
            {
              text: "You should not have to, sir. The note was too vague to act on — may I write it precisely with you now?",
              correct: true,
            },
            { text: "I am afraid I cannot see any note in your profile.", correct: false },
            { text: "My colleague was on the night shift, so I cannot ask her.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const FO_WEEK_33: WeekContent = {
  departmentId: "FO",
  weekNumber: 33,
  weekTitleEn: "Disputes and What You Can Put Right",
  weekTitleVi: "Tranh chấp và những gì bạn có quyền sửa",
  reviewWords: [
    "Concern",
    "Apologise",
    "Disappointed",
    "Double charge",
    "Remove the charge",
    "Refund",
    "Policy",
    "In all honesty",
  ],
  lessons: [
    {
      lessonId: "FO_33_1",
      lessonOrder: 1,
      titleEn: "Hearing the Claim Without Defending",
      titleVi: "Nghe khiếu nại mà không biện hộ",
      vocabulary: [
        {
          word: "Claim",
          phonetic: "/kleɪm/",
          definition: "Khiếu nại đòi bồi hoàn",
          context: "Let me write down exactly what happened, in your words.",
          icon: "📢",
        },
        {
          word: "Interrupt",
          phonetic: "/ˌɪntəˈrʌpt/",
          definition: "Ngắt lời",
          context: "Never interrupt a guest who is still explaining.",
          icon: "🤐",
        },
        {
          word: "Take your word",
          phonetic: "/teɪk jɔː wɜːd/",
          definition: "Tin lời khách nói",
          context: "I take your word for it, madam.",
          icon: "🤝",
        },
        {
          word: "Look into it",
          phonetic: "/lʊk ˈɪntu ɪt/",
          definition: "Kiểm tra, tìm hiểu sự việc",
          context: "I will look into it myself and come back to you.",
          icon: "🔎",
        },
      ],
      grammar: [
        {
          rude: "That cannot be right. Our system never makes mistakes.",
          polite: "I take your word for it, madam. Let me look into it and come back to you.",
          rule: "Không bao giờ bảo vệ hệ thống trước mặt khách. Câu đầu tiên phải là câu đứng về phía họ.",
        },
        {
          rude: "Wait, wait — that is not what happened.",
          polite: "Please go on, sir. I would rather hear all of it before I say anything.",
          rule: "Ngắt lời khách đang khiếu nại làm hỏng cả cuộc nói chuyện. Mời họ nói tiếp là cách hạ nhiệt rẻ nhất.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "I have been charged twice for the same night. This is the third time I have raised it.",
          targetResponse:
            "I am sorry you have had to raise it three times, sir. I take your word for it, and I will look into it now.",
          helpTip:
            "Xin lỗi về việc khách phải nhắc lại ba lần — đó mới là điều họ tức. Số tiền tính sau.",
        },
      ],
      reading: {
        text: "COMPLAINT INTAKE — FRONT DESK\n1. Listen to the end. Do not interrupt, do not check the system while the guest is speaking.\n2. Write the claim in the guest's own words. Read it back to them before you act.\n3. Apologise for the EXPERIENCE first, not for the amount. 'I am sorry you had to raise it three times' lands; 'I am sorry about the 400,000' does not.\n4. Never say the system is correct, never blame another shift, never blame the guest's bank.\n5. Only then check the folio. A guest who feels heard will accept a slower answer.",
        questions: [
          {
            q: "Trong lúc khách đang nói, nhân viên KHÔNG được làm gì?",
            options: [
              "A. Interrupt or check the system",
              "B. Write down what the guest says",
              "C. Look at the guest",
            ],
            correct: 0,
          },
          {
            q: "Phải xin lỗi về điều gì trước tiên?",
            options: ["A. The amount charged", "B. The experience", "C. The other shift's mistake"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Our system does not make that kind of mistake, madam.",
          good: "I take your word for it, madam. Let me look into it and come back to you.",
        },
        {
          bad: "The night shift must have entered it wrong.",
          good: "I am sorry this happened, sir. I will find out what went wrong myself.",
        },
      ],
      game: [
        {
          prompt: "Are you saying I am making this up?",
          options: [
            {
              text: "Not at all, madam. I take your word for it — I only need a moment to find where it went wrong.",
              correct: true,
            },
            { text: "I am just checking the system to see what it says.", correct: false },
            { text: "Sometimes guests remember the amount differently, madam.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_33_2",
      lessonOrder: 2,
      titleEn: "What You Can Put Right Yourself",
      titleVi: "Việc bạn có quyền tự xử lý",
      vocabulary: [
        {
          word: "Authorise",
          phonetic: "/ˈɔːθəraɪz/",
          definition: "Có quyền duyệt, chuẩn chi",
          context: "I can authorise this myself, sir.",
          icon: "✅",
        },
        {
          word: "Straight from the desk",
          phonetic: "/streɪt frəm ðə desk/",
          definition: "Xử lý ngay tại quầy, không phải chờ ai",
          context: "I can remove that straight from the desk, madam.",
          icon: "⚡",
        },
        {
          word: "Escalate",
          phonetic: "/ˈeskəleɪt/",
          definition: "Chuyển lên cấp trên",
          context: "Anything above two million dong I escalate.",
          icon: "⬆️",
        },
        {
          word: "Within ten minutes",
          phonetic: "/wɪˈðɪn ten ˈmɪnɪts/",
          definition: "Trong vòng mười phút",
          context: "He will call you within ten minutes, sir.",
          icon: "⏱️",
        },
      ],
      grammar: [
        {
          rude: "I have to ask my manager about everything.",
          polite: "I can authorise this myself, madam. I have removed it from your bill already.",
          rule: "Nói rõ bạn tự quyết được và việc đã xong. Khách sợ nhất là bị đá qua đá lại.",
        },
        {
          rude: "That is too much money. Not my problem.",
          polite:
            "That is above what I can approve myself, sir. I will come back to you within fifteen minutes either way.",
          rule: "Khi vượt quyền, nói rõ QUY TRÌNH và THỜI HẠN — nhưng đừng nói con số hạn mức, khách sẽ xin ngay dưới ngưỡng. Và hứa việc CHÍNH BẠN làm được, đừng hứa thay quản lý.",
        },
      ],
      speaking: [
        {
          guestPrompt: "How long is this going to take? I have a flight at six.",
          targetResponse:
            "I can remove the minibar charge right now, sir — that is done. The rest needs my Duty Manager, and I will come back to you within fifteen minutes.",
          helpTip:
            "Tách việc làm được ngay ra khỏi việc phải chờ, và đặt chủ ngữ 'I' lên đầu cả hai vế. Khách vội cần thấy có thứ đã xong rồi.",
        },
      ],
      reading: {
        text: "FRONT DESK AUTHORITY LIMITS — THREE TIERS, NO GAP\nUnder 500,000 VND — you decide. Minibar and laundry, one late check-out waiver per stay, one night's parking, one welcome drink, one pressed garment.\n500,000 to 2,000,000 VND — Shift Leader or Duty Manager approves by phone. Write the approving name on the folio before you tell the guest.\nAbove 2,000,000 VND — Duty Manager signs. Also: any refund to a card, any payment to a third party.\nNEVER at the desk, at any amount: injury, theft, or lost valuables. Those go to the Duty Manager, always.\nAn unsigned folio is a REASON to reverse, not an exception to the tiers — a disputed 15,000,000 VND banquet charge is still a Duty Manager decision.\nTell the guest the PROCESS and the TIME, never the number. A guest who learns the threshold asks for the amount just below it.",
        questions: [
          {
            q: "Khoản nào lễ tân được tự duyệt?",
            options: [
              "A. A refund to the guest's card",
              "B. Minibar charges under 500,000 VND",
              "C. Compensation for lost valuables",
            ],
            correct: 1,
          },
          {
            q: "Khiếu nại liên quan tới thương tích hoặc mất đồ có giá trị thì xử lý thế nào?",
            options: [
              "A. Settled at the desk if the amount is small",
              "B. Never settled at the desk — goes to the Duty Manager",
              "C. Sent to the guest's insurance",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "I need to check with my manager first.",
          good: "I can authorise this myself, madam — it is off your bill already.",
        },
        {
          bad: "This is above my level, sorry.",
          good: "That is above what I can approve myself, sir. I will come back to you within fifteen minutes.",
        },
      ],
      game: [
        {
          prompt:
            "Just tell me straight — can you fix this or do I need to speak to somebody else?",
          options: [
            {
              text: "I can remove the minibar charge right now, sir — that is done. The room rate needs my Duty Manager, and I will come back to you within fifteen minutes.",
              correct: true,
            },
            { text: "I will need to speak to my manager about all of it.", correct: false },
            { text: "I can probably do something. Let me see what I can arrange.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_33_3",
      lessonOrder: 3,
      titleEn: "The Charge the Guest Never Made",
      titleVi: "Khoản phí khách không hề tiêu",
      vocabulary: [
        {
          word: "Itemised",
          phonetic: "/ˈaɪtəmaɪzd/",
          definition: "Bảng kê chi tiết từng khoản",
          context: "May I print an itemised bill for you?",
          icon: "🧾",
        },
        {
          word: "Reverse",
          phonetic: "/rɪˈvɜːs/",
          definition: "Huỷ, hoàn lại khoản đã tính",
          context: "I have reversed the charge, madam.",
          icon: "↩️",
        },
        {
          word: "Posted in error",
          phonetic: "/ˈpəʊstɪd ɪn ˈerə/",
          definition: "Bị ghi nhầm vào hoá đơn",
          context: "It was posted in error to your room.",
          icon: "❌",
        },
        {
          word: "On record",
          phonetic: "/ɒn ˈrekɔːd/",
          definition: "Đã ghi nhận lại, tra cứu được về sau",
          context: "The reversal is on record, sir, so it will not come back.",
          icon: "🕊️",
        },
      ],
      grammar: [
        {
          rude: "Somebody in your room drank it.",
          polite: "It looks as though it was posted in error, madam. I have reversed it.",
          rule: "Không bao giờ ám chỉ khách hoặc người đi cùng đã tiêu. 'Posted in error' đặt lỗi vào quy trình.",
        },
        {
          rude: "You can check the bill yourself.",
          polite: "May I print an itemised bill so you can see every line, sir?",
          rule: "Chủ động đưa bảng kê chi tiết. Khách nghi ngờ hoá đơn thì minh bạch rẻ hơn tranh luận.",
        },
      ],
      speaking: [
        {
          guestPrompt: "We never opened the minibar. Not once in four nights.",
          targetResponse:
            "Then it was posted in error, madam, and I have reversed it. May I print a clean itemised bill for you?",
          helpTip:
            "'Then' cho thấy bạn hành động NGAY từ lời khách, không đi xác minh trước. Đó là điều khách nhớ.",
        },
      ],
      reading: {
        text: "DISPUTED POSTING — WHAT THE DESK DOES\nA disputed charge under the authority limit is reversed FIRST and investigated afterwards. The guest is not held while we check.\nNever suggest that a companion, a child or a previous occupant consumed it. Say 'posted in error'.\nPrint a fresh itemised bill after the reversal so the guest leaves with a clean document, not a corrected one.\nWrite a note in the profile recording the EVENT, never a verdict: what was disputed, the amount, that it was reversed at the desk, and by whom. 'Minibar 200,000 disputed 12/08, reversed at desk by Duy, pending stock check.' Never write that the guest was not at fault — the profile is read aloud in complaint reviews and in card chargebacks, and a verdict written before the investigation is evidence against the hotel.\nReport the pattern, not the guest: three minibar disputes on one floor in a week is a stock-control problem, not three dishonest guests.",
        questions: [
          {
            q: "Với khoản tranh chấp trong hạn mức, thứ tự xử lý là gì?",
            options: [
              "A. Investigate first, reverse afterwards",
              "B. Reverse first, investigate afterwards",
              "C. Ask the guest to pay and claim later",
            ],
            correct: 1,
          },
          {
            q: "Ba lần tranh chấp minibar cùng một tầng trong một tuần nghĩa là gì?",
            options: [
              "A. A stock-control problem",
              "B. Three dishonest guests",
              "C. A system fault in the billing software",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Maybe the person staying with you used it.",
          good: "It was posted in error, madam. I have reversed it and I will print a clean bill.",
        },
        {
          bad: "The charge is on the bill, so somebody used it.",
          good: "May I print an itemised bill, sir, so you can see every line for yourself?",
        },
      ],
      game: [
        {
          prompt: "So you think one of my children drank a two-hundred-thousand-dong beer?",
          options: [
            {
              text: "Not at all, sir. It was posted in error and I have already reversed it.",
              correct: true,
            },
            { text: "I am only telling you what the system recorded, sir.", correct: false },
            { text: "Sometimes housekeeping records it by mistake. I will check.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_33_4",
      lessonOrder: 4,
      titleEn: "Putting It in Writing",
      titleVi: "Chốt lại bằng văn bản",
      vocabulary: [
        {
          word: "In writing",
          phonetic: "/ɪn ˈraɪtɪŋ/",
          definition: "Bằng văn bản, có giấy tờ",
          context: "May I confirm that in writing for you?",
          icon: "📝",
        },
        {
          word: "Case number",
          phonetic: "/keɪs ˈnʌmbə/",
          definition: "Mã hồ sơ để tra cứu",
          context: "Your case number is FO dash four one seven.",
          icon: "🔢",
        },
        {
          word: "Working days",
          phonetic: "/ˈwɜːkɪŋ deɪz/",
          definition: "Ngày làm việc, không tính cuối tuần",
          context: "A card refund takes five to seven working days.",
          icon: "📅",
        },
        {
          word: "Follow up",
          phonetic: "/ˌfɒləʊ ˈʌp/",
          definition: "Chủ động liên hệ lại",
          context: "I will follow up with you on Friday either way.",
          icon: "🔔",
        },
      ],
      grammar: [
        {
          rude: "The money will come back sometime.",
          polite:
            "A card refund takes five to seven working days, madam, and I will follow up on Friday either way.",
          rule: "Đưa một khoảng thời gian thật cộng một lời hứa liên hệ lại. 'Sometime' làm khách phải tự đi đòi.",
        },
        {
          rude: "You can trust me, I will remember.",
          polite: "May I confirm that in writing, sir? Your case number is FO dash four one seven.",
          rule: "Với tranh chấp tiền bạc, văn bản bảo vệ cả khách lẫn bạn. Đọc mã hồ sơ thành từng chữ số.",
        },
      ],
      speaking: [
        {
          guestPrompt: "And what happens if the refund does not appear?",
          targetResponse:
            "Then you email me the case number, madam, and I chase it that day. But I will follow up on Friday whether it appears or not.",
          helpTip:
            "Hứa cả hai chiều: khách có đường liên hệ, và bạn vẫn chủ động dù khách không nhắn gì.",
        },
      ],
      reading: {
        text: "CLOSING A DISPUTE — WHAT THE GUEST LEAVES WITH\nEvery settled dispute produces THREE things before the guest walks away:\n1. A clean itemised bill, reprinted after the correction. If a VAT e-invoice was already issued — most company guests and many domestic ones — it cannot be reprinted: call Accounting within the shift, have an adjustment invoice issued, and tell the guest WHEN it will reach their email.\n2. A written confirmation — email or printed slip — naming what was reversed, the amount, and the date.\n3. A case number, read aloud digit by digit and written on the slip.\nRefund timing to state — say the SLOWEST case, never the fastest: cash at the desk, immediate. Domestic VND bank transfer, same working day. Card reversal, usually 7-15 working days and up to 30 for a card issued abroad, because it depends on the guest's own bank, not on us.\nSet your own follow-up before the guest asks for one. A guest chased by the hotel tells a different story from a guest who had to chase the hotel.",
        questions: [
          {
            q: "Khách rời đi phải cầm theo ba thứ gì?",
            options: [
              "A. A clean itemised bill, a written confirmation, and a case number",
              "B. A receipt, a business card, and a voucher",
              "C. An apology letter, a refund and a free night",
            ],
            correct: 0,
          },
          {
            q: "Hoàn tiền vào thẻ mất bao lâu?",
            options: ["A. Immediately", "B. 5-7 working days", "C. Up to 30 days"],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "It will come back to your card eventually.",
          good: "Five to seven working days, madam, and I will follow up on Friday either way.",
        },
        {
          bad: "Do not worry, I will remember your case.",
          good: "May I put it in writing, sir? Your case number is FO dash four one seven.",
        },
      ],
      game: [
        {
          prompt: "I have heard promises like this before and nothing happened.",
          options: [
            {
              text: "Then let me put it in writing, sir. Case number FO dash four one seven, and I will follow up on Friday myself.",
              correct: true,
            },
            { text: "I understand, but this time it really will be processed.", correct: false },
            { text: "Please call the hotel if it does not arrive within a week.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const FO_WEEK_34: WeekContent = {
  departmentId: "FO",
  weekNumber: 34,
  weekTitleEn: "Special Occasions the Desk Can Make Happen",
  weekTitleVi: "Dịp đặc biệt mà quầy lễ tân làm được",
  reviewWords: [
    "Mention",
    "On file",
    "Coordinate",
    "Straight away",
    "Within",
    "Recommend",
    "Confident",
    "Prefer",
  ],
  lessons: [
    {
      lessonId: "FO_34_1",
      lessonOrder: 1,
      titleEn: "Finding Out Without Prying",
      titleVi: "Biết được mà không tọc mạch",
      vocabulary: [
        {
          word: "Celebration",
          phonetic: "/ˌselɪˈbreɪʃən/",
          definition: "Dịp ăn mừng",
          context: "Is this trip a celebration, or a quiet few days?",
          icon: "🎉",
        },
        {
          word: "Pick up on",
          phonetic: "/pɪk ʌp ɒn/",
          definition: "Nhận ra dấu hiệu",
          context: "The desk picked up on the flowers they were carrying.",
          icon: "👂",
        },
        {
          word: "Keep it quiet",
          phonetic: "/kiːp ɪt ˈkwaɪət/",
          definition: "Giữ kín, không để lộ",
          context: "May I ask, sir — is this a surprise for her?",
          icon: "🤫",
        },
        {
          word: "In on it",
          phonetic: "/ɪn ɒn ɪt/",
          definition: "Có biết về bất ngờ đó",
          context: "Is your wife in on it, or is it a surprise?",
          icon: "🎭",
        },
      ],
      grammar: [
        {
          rude: "Why are you here? Honeymoon?",
          polite: "Is this trip a celebration, madam, or a quiet few days away?",
          rule: "Cho khách hai lối trả lời, một lối là 'không có gì đặc biệt'. Câu hỏi chỉ có một đáp án đúng là câu hỏi tọc mạch.",
        },
        {
          rude: "Does she know about the cake?",
          polite: "May I ask, sir — does your wife know, or is it a surprise?",
          rule: "Hỏi ai đã biết TRƯỚC khi sắp xếp. Một câu chúc mừng sai chỗ có thể phá hỏng cả điều bất ngờ.",
        },
      ],
      speaking: [
        {
          guestPrompt: "It is our thirtieth anniversary, actually. We came here on our honeymoon.",
          targetResponse:
            "Thirty years, and back where it started — congratulations to you both. May I arrange something small for this evening?",
          helpTip:
            "Nhắc lại chi tiết khách vừa kể trước khi chúc mừng. Đó là bằng chứng bạn nghe chứ không đáp cho có.",
        },
      ],
      reading: {
        text: "SPOTTING AN OCCASION — FRONT DESK\nAsk once, at check-in, with an exit built in: 'Is this trip a celebration, or a quiet few days away?'\nSigns worth picking up on: flowers or a gift box in the luggage · a cake ordered to the room · both guests dressed up on a weekday · a booking note saying 'quiet table' or 'high floor, romantic'.\nBefore arranging anything, ask WHO KNOWS. A surprise that is announced by a receptionist is not a surprise any more.\nNever assume the relationship. 'Congratulations to you both' works for a couple, a mother and daughter, and two colleagues. 'Congratulations to you and your wife' does not.\nIf the guest says it is nothing special, write NOTHING in the profile and never raise it again.",
        questions: [
          {
            q: "Vì sao phải hỏi ai đã biết trước khi sắp xếp?",
            options: [
              "A. Because a surprise announced by a receptionist is no longer a surprise",
              "B. Because the kitchen needs the name",
              "C. Because the policy requires two signatures",
            ],
            correct: 0,
          },
          {
            q: "Khách nói không có dịp gì đặc biệt thì làm gì?",
            options: [
              "A. Write nothing in the profile and never raise it again",
              "B. Note it as 'declined' and ask again tomorrow",
              "C. Arrange something small anyway",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Honeymoon, is it?",
          good: "Is this trip a celebration, madam, or a quiet few days away?",
        },
        {
          bad: "Congratulations to you and your wife!",
          good: "Congratulations to you both — may I arrange something small for this evening?",
        },
      ],
      game: [
        {
          prompt: "It is my mother's seventieth. I want it to be a surprise.",
          options: [
            {
              text: "How lovely, sir. Then nobody at the desk will mention it — may I arrange the cake for after dinner instead of at check-in?",
              correct: true,
            },
            { text: "Wonderful! We will greet her with it when she arrives.", correct: false },
            {
              text: "I will make a note so all our staff know to congratulate her.",
              correct: false,
            },
          ],
        },
      ],
    },
    {
      lessonId: "FO_34_2",
      lessonOrder: 2,
      titleEn: "What the Desk Can Arrange Tonight",
      titleVi: "Quầy làm được gì ngay tối nay",
      vocabulary: [
        {
          word: "Turn-down surprise",
          phonetic: "/ˈtɜːn daʊn səˈpraɪz/",
          definition: "Bất ngờ bày sẵn lúc dọn phòng buổi tối",
          context: "A turn-down surprise is set while the guests are at dinner.",
          icon: "🛏️",
        },
        {
          word: "At short notice",
          phonetic: "/ət ʃɔːt ˈnəʊtɪs/",
          definition: "Báo gấp, không kịp chuẩn bị lâu",
          context: "The kitchen can do a small cake at short notice.",
          icon: "⏳",
        },
        {
          word: "Handwritten card",
          phonetic: "/ˌhændˈrɪtn kɑːd/",
          definition: "Thiệp viết tay",
          context: "A handwritten card costs nothing and is remembered longest.",
          icon: "💌",
        },
        {
          word: "Complimentary",
          phonetic: "/ˌkɒmplɪˈmentəri/",
          definition: "Miễn phí, do khách sạn tặng",
          context: "The fruit plate is complimentary, madam.",
          icon: "🎁",
        },
      ],
      grammar: [
        {
          rude: "Too late, you should have told us before.",
          polite: "The kitchen can still do a small cake at short notice, sir. Shall I ask them?",
          rule: "Không trách khách báo muộn. Nói cái gì còn kịp, rồi hỏi một câu để việc xảy ra ngay.",
        },
        {
          rude: "We can do a cake, flowers, champagne, decoration, a photo, a late check-out…",
          polite:
            "May I suggest two things, madam: a small cake after dinner and a handwritten card?",
          rule: "Đề xuất tối đa hai thứ. Danh sách dài biến một món quà thành một tờ thực đơn.",
        },
      ],
      speaking: [
        {
          guestPrompt: "We only decided to celebrate an hour ago. Is anything still possible?",
          targetResponse:
            "Quite a lot, madam. The kitchen can do a small cake at short notice, and I can have the room set while you are at dinner.",
          helpTip:
            "'Quite a lot' mở đầu bằng sự rộng rãi. Rồi nêu đúng hai việc cụ thể có thể hình dung được.",
        },
      ],
      reading: {
        text: "WHAT THE DESK CAN ARRANGE — SAME DAY\nWithin 2 hours, no approval needed: handwritten card · fruit plate (complimentary) · rose petals on the bed · room set to 'turn-down surprise' while the guests dine · a quiet table moved to the window.\nWithin 4 hours, kitchen confirmation needed: small cake (6-8 portions, ~350,000-600,000 VND), a written message piped on it, sparkling wine on ice (~800,000-1,500,000 VND).\nNeeds 24 hours: balloons, photographer, room decoration beyond petals, custom or photo cake, a specific flavour, or a cake for a dietary restriction.\nCost note: the card, the petals and the fruit plate are complimentary once per stay. Anything else is posted to the room, and the price is stated to the guest BEFORE it is arranged.\nNever promise the 24-hour items on the same day. A cake that arrives the next morning is worse than no cake.\nNo candles or sparklers in guest rooms — the smoke detector does not know it is a birthday. Ask the kitchen for an LED candle.\nAsk about allergies before ordering any cake. A celebration that sends someone to hospital is the one nobody forgets.",
        questions: [
          {
            q: "Món nào cần báo trước 24 giờ?",
            options: [
              "A. A handwritten card",
              "B. Balloons and a photo cake",
              "C. Rose petals on the bed",
            ],
            correct: 1,
          },
          {
            q: "Với món có tính phí, phải làm gì trước khi sắp xếp?",
            options: [
              "A. State the price to the guest",
              "B. Get the Duty Manager's signature",
              "C. Charge it and tell the guest at check-out",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "You needed to book that yesterday.",
          good: "The kitchen can still do a small cake at short notice, madam. Shall I ask them?",
        },
        {
          bad: "We have cake, flowers, wine, balloons, decoration, photos…",
          good: "May I suggest two things, sir: a cake after dinner, and a handwritten card?",
        },
      ],
      game: [
        {
          prompt: "Could you do balloons and a photographer for tonight?",
          options: [
            {
              text: "Those need a day, madam, and I would rather not promise something that then arrives late. Tonight I can do a cake and set the room while you dine.",
              correct: true,
            },
            { text: "I will try my best to arrange both for tonight.", correct: false },
            { text: "Balloons and a photographer are not available. Sorry.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_34_3",
      lessonOrder: 3,
      titleEn: "The Handover That Makes It Happen",
      titleVi: "Bàn giao để việc thật sự xảy ra",
      vocabulary: [
        {
          word: "Timing",
          phonetic: "/ˈtaɪmɪŋ/",
          definition: "Thời điểm phải khớp",
          context: "The timing matters more than the cake.",
          icon: "🕗",
        },
        {
          word: "Trigger",
          phonetic: "/ˈtrɪɡə/",
          definition: "Dấu hiệu để bắt đầu làm",
          context: "The trigger is the guests leaving for dinner.",
          icon: "🔔",
        },
        {
          word: "Chase it",
          phonetic: "/tʃeɪs ɪt/",
          definition: "Đi hỏi lại cho chắc",
          context: "Ring the kitchen at seven and chase it.",
          icon: "📞",
        },
        {
          word: "Named person",
          phonetic: "/neɪmd ˈpɜːsn/",
          definition: "Người cụ thể chịu trách nhiệm",
          context: "Every step has a named person, not a department.",
          icon: "🙋",
        },
      ],
      grammar: [
        {
          rude: "Housekeeping will do it sometime this evening.",
          polite:
            "Housekeeping sets the room when the guests leave for dinner, madam — around half past seven.",
          rule: "Bàn giao phải có DẤU HIỆU bắt đầu, không phải một khoảng thời gian. 'Sometime' là cách một điều bất ngờ chết đi.",
        },
        {
          rude: "I told the kitchen already.",
          polite: "Chef Nam has it, and I will ring him at seven to chase it myself.",
          rule: "Giao cho một người có tên, và tự mình đi hỏi lại. 'Đã báo bếp rồi' không phải là bàn giao.",
        },
      ],
      speaking: [
        {
          guestPrompt: "So it will definitely be there when we come back up?",
          targetResponse:
            "It will, sir. Housekeeping sets it when you leave for dinner, and I ring the kitchen at seven to check myself.",
          helpTip:
            "Trả lời bằng cơ chế, không bằng lời hứa. Khách tin quy trình cụ thể hơn tin chữ 'chắc chắn'.",
        },
      ],
      reading: {
        text: "OCCASION HANDOVER SLIP — ONE PER ARRANGEMENT\nRoom · guest name · what the occasion is · WHO ALREADY KNOWS.\nEach line carries three things: the task, a NAMED person, and a trigger.\n  Cake, 6 portions, no message — Chef Nam — ready 19:00, held in the pastry fridge\n  Petals and card — Housekeeping, Chi — trigger: guests leave for dinner (~19:30)\n  Card written and signed — Front desk, Duy — before 18:00\n  Chase call to kitchen — Front desk, Duy — 19:00\nA slip with 'Housekeeping' but no name is not a handover; it is a hope. Departments do not remember things, people do.\nThe desk keeps the slip until the guest confirms it happened, then files it in the profile.",
        questions: [
          {
            q: "Mỗi dòng bàn giao phải có ba thứ gì?",
            options: [
              "A. The task, a named person, and a trigger",
              "B. The task, the price, and the room number",
              "C. The department, the time, and the manager",
            ],
            correct: 0,
          },
          {
            q: "Vì sao ghi 'Housekeeping' mà không ghi tên người là chưa đủ?",
            options: [
              "A. Because departments do not remember things, people do",
              "B. Because housekeeping is often busy",
              "C. Because the system needs a staff number",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Housekeeping will sort it out this evening.",
          good: "Chi from housekeeping sets it the moment you leave for dinner, madam.",
        },
        {
          bad: "I passed it to the kitchen, so it should be fine.",
          good: "Chef Nam has it, sir, and I ring him at seven to chase it myself.",
        },
      ],
      game: [
        {
          prompt: "Last time we asked for something like this, nobody actually did it.",
          options: [
            {
              text: "I understand, madam. This time each step has a name against it, and I make the chase call myself at seven.",
              correct: true,
            },
            { text: "That will not happen this time, I promise you.", correct: false },
            { text: "I have already told housekeeping and the kitchen about it.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_34_4",
      lessonOrder: 4,
      titleEn: "When the Surprise Goes Wrong",
      titleVi: "Khi điều bất ngờ hỏng việc",
      vocabulary: [
        {
          word: "Spoil it",
          phonetic: "/spɔɪl ɪt/",
          definition: "Làm hỏng điều bất ngờ",
          context: "A greeting at the desk can spoil it completely.",
          icon: "💔",
        },
        {
          word: "Own the mistake",
          phonetic: "/əʊn ðə mɪˈsteɪk/",
          definition: "Nhận lỗi về mình, không đổ lỗi",
          context: "Own the mistake before the guest has to describe it.",
          icon: "🙇",
        },
        {
          word: "Make it right tonight",
          phonetic: "/meɪk ɪt raɪt təˈnaɪt/",
          definition: "Sửa ngay trong tối nay",
          context: "Let me make it right tonight rather than tomorrow.",
          icon: "🌙",
        },
        {
          word: "Never charge",
          phonetic: "/ˈnevə tʃɑːdʒ/",
          definition: "Tuyệt đối không tính tiền",
          context: "We never charge for an occasion we got wrong.",
          icon: "🚫",
        },
      ],
      grammar: [
        {
          rude: "The kitchen forgot. Nothing I can do now.",
          polite:
            "The cake did not reach your room and that is our mistake, madam. May I bring it up now with the wine?",
          rule: "Nhận lỗi bằng 'our mistake' rồi đề xuất ngay. Đổ lỗi cho bếp không sửa được gì cho khách.",
        },
        {
          rude: "We will take it off the bill and that is that.",
          polite:
            "We never charge for an occasion we got wrong, sir, and I would still like to make it right tonight.",
          rule: "Bỏ phí là mức tối thiểu, không phải cách sửa. Khách mất một dịp, không mất một khoản tiền.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "The receptionist congratulated her at check-in. It was supposed to be a surprise.",
          targetResponse:
            "That is our mistake and I am very sorry, sir. May I move the cake to tomorrow night so there is still a moment she does not expect?",
          helpTip:
            "Nhận lỗi rồi cứu lấy điều còn cứu được. Khách mất bất ngờ hôm nay, nhưng ngày mai vẫn còn.",
        },
      ],
      reading: {
        text: "WHEN AN OCCASION FAILS — FRONT DESK\nThe three failures, in order of how often they happen:\n1. The surprise is spoiled — someone congratulates the guest who was not meant to know. Apologise to the ORGANISER privately, never in front of the other guest, and offer to move the moment to another evening.\n2. The item never arrives. Own it before the guest describes it. Bring it now if the evening is still going; move it to tomorrow if not.\n3. The wrong occasion. A birthday cake for an anniversary, or the wrong name written on the card. Remove it immediately and rewrite; never present a corrected card.\nNever charge for an occasion the hotel got wrong, and do not offer money. The guest lost a moment, not an amount.\nLog every failure. The handover slip shows which step broke, and it is nearly always the one with no name against it.",
        questions: [
          {
            q: "Khi điều bất ngờ bị lộ, phải xin lỗi ai và ở đâu?",
            options: [
              "A. The organiser, privately",
              "B. Both guests, at the desk",
              "C. The guest who was surprised, at dinner",
            ],
            correct: 0,
          },
          {
            q: "Vì sao không nên đề nghị bồi thường bằng tiền?",
            options: [
              "A. Because the guest lost a moment, not an amount",
              "B. Because the desk has no authority",
              "C. Because it would need a manager's approval",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "The kitchen forgot your cake. Sorry about that.",
          good: "Your cake did not reach the room and that is our mistake, madam. May I bring it up now?",
        },
        {
          bad: "We have removed the charge, so it is settled.",
          good: "We never charge for something we got wrong, sir. May I make it right tomorrow evening?",
        },
      ],
      game: [
        {
          prompt: "The card had the wrong name on it. Her name is Mai, not Mai Anh.",
          options: [
            {
              text: "I am sorry, madam — that is our error. I will write a fresh card now rather than send up a corrected one.",
              correct: true,
            },
            {
              text: "I will have the name corrected on the card and sent back up.",
              correct: false,
            },
            { text: "The booking was under Mai Anh, so that is what we used.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const FO_WEEK_35: WeekContent = {
  departmentId: "FO",
  weekNumber: 35,
  weekTitleEn: "Negotiating Without Dropping the Rate",
  weekTitleVi: "Đàm phán mà không phải hạ giá",
  reviewWords: [
    "Pre-authorization",
    "Deposit",
    "Cancellation fee",
    "Waive the late fee",
    "Option",
    "Compact",
    "On file",
    "Authorise",
  ],
  lessons: [
    {
      lessonId: "FO_35_1",
      lessonOrder: 1,
      titleEn: "The Guest Who Found It Cheaper Online",
      titleVi: "Khách tìm được giá rẻ hơn trên mạng",
      vocabulary: [
        {
          word: "Third party",
          phonetic: "/θɜːd ˈpɑːti/",
          definition: "Bên thứ ba (Agoda, Booking.com…)",
          context: "That price is on a third party site, sir.",
          icon: "🌐",
        },
        {
          word: "Non-refundable",
          phonetic: "/ˌnɒn rɪˈfʌndəbl/",
          definition: "Không hoàn tiền nếu huỷ",
          context: "The cheaper rate is non-refundable and prepaid.",
          icon: "🔒",
        },
        {
          word: "Compare like with like",
          phonetic: "/kəmˈpeə laɪk wɪð laɪk/",
          definition: "So sánh đúng hai thứ tương đương",
          context: "May we compare like with like, madam?",
          icon: "⚖️",
        },
        {
          word: "Book direct",
          phonetic: "/bʊk dəˈrekt/",
          definition: "Đặt thẳng với khách sạn",
          context: "Guests who book direct keep free cancellation.",
          icon: "🤝",
        },
      ],
      grammar: [
        {
          rude: "That website price is wrong.",
          polite:
            "I have checked that site, madam, and the cheaper rate there is non-refundable and prepaid.",
          rule: "Hiện tại hoàn thành 'I have checked' cho biết bạn ĐÃ xem rồi và kết quả còn giá trị lúc này — mạnh hơn hẳn 'I checked' vốn chỉ kể một việc trong quá khứ.",
        },
        {
          rude: "You want cheap or you want good?",
          polite:
            "May we compare like with like, sir? Ours includes breakfast and free cancellation.",
          rule: "Câu hỏi mở bằng 'May we…?' kéo khách về cùng phía bàn với bạn. So sánh giá là việc HAI người cùng làm, không phải cuộc cãi.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "Agoda is showing your room forty dollars cheaper than what you just quoted me.",
          targetResponse:
            "I have checked, sir. That rate is prepaid and non-refundable, and ours includes breakfast. May we compare the two side by side?",
          helpTip:
            "Đuôi -ed của 'checked' đọc là /t/, không phải /ɪd/. Người Việt hay nuốt phụ âm cuối — mất /t/ ở đây là mất luôn thì hiện tại hoàn thành.",
        },
      ],
      reading: {
        text: "RATE OBJECTIONS AT THE DESK — WHAT THE THIRD-PARTY PRICE USUALLY HIDES\nPrepaid and non-refundable: the guest pays now and loses everything on a change. Our direct rate cancels free until 18:00 on arrival day.\nRoom only: breakfast for two is 380,000 VND per person if bought separately.\nRun-of-house: the site sells a category, we assign the room. A direct booking can request a floor and a side.\nNo loyalty points, and no upgrade at check-in.\nNEVER say the site is wrong or that the guest misread it. The price is usually real; it is the product that is different.\nIf the guest still prefers the site price, take it graciously and note in the profile that they are rate-sensitive. That note earns more at the next booking than winning the argument tonight.",
        questions: [
          {
            q: "Theo tài liệu, giá trên trang bên thứ ba thường là gì?",
            options: [
              "A. Sai, do trang web hiển thị nhầm",
              "B. Có thật, nhưng là một sản phẩm khác",
              "C. Chỉ dành cho khách nước ngoài",
            ],
            correct: 1,
          },
          {
            q: "Khách vẫn chọn giá trên mạng thì nên làm gì?",
            options: [
              "A. Nhận vui vẻ và ghi hồ sơ rằng khách nhạy cảm về giá",
              "B. Giải thích lại một lần nữa cho tới khi khách hiểu",
              "C. Báo quản lý để duyệt giá bằng trang web",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "That website is wrong, madam.",
          good: "I have checked that site, madam. The cheaper rate there is prepaid and non-refundable.",
        },
        {
          bad: "Fine, book it on the website then.",
          good: "Of course, sir. May I note your preference so we can quote you directly next time?",
        },
      ],
      game: [
        {
          prompt: "Your own website is cheaper than the price you just gave me at this desk.",
          options: [
            {
              text: "Then you should have our website price, madam. Let me apply it now, and I am sorry you had to point it out.",
              correct: true,
            },
            {
              text: "The desk rate and the online rate are set separately, madam.",
              correct: false,
            },
            { text: "Online rates change every hour, so they are hard to match.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_35_2",
      lessonOrder: 2,
      titleEn: "Giving Something That Is Not Money",
      titleVi: "Cho thứ khác thay vì giảm giá",
      vocabulary: [
        {
          word: "Throw in",
          phonetic: "/θrəʊ ɪn/",
          definition: "Tặng kèm thêm",
          context: "I can throw in breakfast for both of you.",
          icon: "➕",
        },
        {
          word: "Costs us little",
          phonetic: "/kɒsts ʌs ˈlɪtl/",
          definition: "Khách sạn tốn ít nhưng khách thấy đáng",
          context: "A late check-out costs us little on a quiet Tuesday.",
          icon: "🪙",
        },
        {
          word: "Worth more to you",
          phonetic: "/wɜːθ mɔː tə juː/",
          definition: "Có giá trị với khách hơn là tiền",
          context: "Two extra hours may be worth more to you than the discount.",
          icon: "💎",
        },
        {
          word: "In exchange",
          phonetic: "/ɪn ɪksˈtʃeɪndʒ/",
          definition: "Đổi lại",
          context: "In exchange, may I ask you to stay the Sunday night?",
          icon: "🔄",
        },
      ],
      grammar: [
        {
          rude: "No discount. Take it or leave it.",
          polite:
            "I cannot move the rate, madam, but I can throw in breakfast for both of you each morning.",
          rule: "Cấu trúc 'I cannot X, but I can Y' giữ nguyên lập trường mà vẫn mở một cánh cửa. Vế 'but' phải cụ thể, đếm được.",
        },
        {
          rude: "If you pay more I give you late check-out.",
          polite:
            "If you can stay the Sunday night, sir, I will hold the same rate and add a late check-out.",
          rule: "Câu điều kiện loại 1: 'If + hiện tại đơn, will + động từ nguyên thể'. KHÔNG dùng 'will' ở vế 'if' — đây là lỗi người Việt hay mắc nhất khi mặc cả.",
        },
      ],
      speaking: [
        {
          guestPrompt: "Come on, give me ten percent. I stay here four times a year.",
          targetResponse:
            "I cannot move the rate, sir, but I can add breakfast and a two o'clock check-out for the whole stay.",
          helpTip:
            "Nhấn mạnh vào 'cannot' rồi hạ giọng ở 'but I can' — ngữ điệu xuống ở vế sau làm lời từ chối nghe như một lời mời.",
        },
      ],
      reading: {
        text: "WHAT THE DESK CAN GIVE INSTEAD OF A DISCOUNT\nCosts the hotel little, and guests value highly: late check-out to 14:00 (on a low-occupancy day) · breakfast added for one or two · welcome drink · a room on a higher floor within the same category · early check-in when the room is ready · one pressed garment.\nCosts the hotel real money, so it needs approval: a category upgrade at weekends, airport transfer, spa credit, waiving a cancellation fee.\nThe order matters. Offer the free item FIRST. A guest who accepts breakfast stops asking about the rate; a guest who is refused a discount and then offered breakfast hears a consolation prize.\nAsk for something back whenever you can — a Sunday night, a direct booking next time, a review. A negotiation where only one side gives teaches the guest to push harder next stay.",
        questions: [
          {
            q: "Vì sao phải đưa món tặng TRƯỚC khi từ chối giảm giá?",
            options: [
              "A. Vì khách nhận bữa sáng rồi sẽ thôi hỏi giá; nếu bị từ chối trước thì món tặng nghe như giải khuyến khích",
              "B. Vì quy định bắt buộc như vậy",
              "C. Vì bữa sáng đắt hơn khoản giảm giá",
            ],
            correct: 0,
          },
          {
            q: "Vì sao nên xin lại một thứ gì đó từ khách?",
            options: [
              "A. Để bù chi phí món tặng",
              "B. Vì cuộc đàm phán chỉ một bên cho sẽ dạy khách ép mạnh hơn lần sau",
              "C. Vì quản lý yêu cầu ghi lại",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "We do not give discounts here.",
          good: "I cannot move the rate, madam, but I can add breakfast for both of you.",
        },
        {
          bad: "If you will stay Sunday I will give late check-out.",
          good: "If you stay the Sunday night, sir, I will hold this rate and add a late check-out.",
        },
      ],
      game: [
        {
          prompt: "Every other hotel gives me something. What can you do for me?",
          options: [
            {
              text: "Quite a lot, madam. Breakfast for both of you and a two o'clock check-out — and if you book direct next time, I will hold this rate.",
              correct: true,
            },
            { text: "I am afraid our rates are already very competitive, madam.", correct: false },
            { text: "Let me ask my manager whether we can reduce the price.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_35_3",
      lessonOrder: 3,
      titleEn: "Holding the Rate Without Saying No",
      titleVi: "Giữ giá mà không phải nói không",
      vocabulary: [
        {
          word: "Hold the rate",
          phonetic: "/həʊld ðə reɪt/",
          definition: "Giữ nguyên mức giá",
          context: "I can hold the rate until Friday for you.",
          icon: "📌",
        },
        {
          word: "Firm on",
          phonetic: "/fɜːm ɒn/",
          definition: "Giữ vững lập trường về điều gì",
          context: "We are firm on the rate this weekend.",
          icon: "🧱",
        },
        {
          word: "Peak weekend",
          phonetic: "/piːk ˈwiːkend/",
          definition: "Cuối tuần cao điểm",
          context: "This is a peak weekend, sir.",
          icon: "📈",
        },
        {
          word: "Sold out by",
          phonetic: "/səʊld aʊt baɪ/",
          definition: "Kín phòng trước thời điểm nào đó",
          context: "We are usually sold out by Thursday.",
          icon: "🚪",
        },
      ],
      grammar: [
        {
          rude: "No. The price is the price.",
          polite:
            "We are firm on the rate this weekend, madam, because we are usually sold out by Thursday.",
          rule: "Mệnh đề 'because' biến lời từ chối thành một sự thật thị trường. Không có 'because', câu chỉ còn là ý muốn của bạn.",
        },
        {
          rude: "Maybe I can do something, I am not sure.",
          polite: "I would rather be straight with you, sir: this rate will not move this weekend.",
          rule: "'I would rather + động từ nguyên thể' nêu lựa chọn của người nói. Nói thẳng một lần tốt hơn để khách hy vọng rồi thất vọng.",
        },
      ],
      speaking: [
        {
          guestPrompt: "So there is really nothing you can do on the price?",
          targetResponse:
            "Not this weekend, madam. We are usually sold out by Thursday. But if you come midweek, I can hold a better rate for you.",
          helpTip:
            "'Sold out' có cụm phụ âm /ldaʊt/ — đừng thêm nguyên âm thành 'sol-đờ-out'. Nối /d/ sang /aʊ/ trong một hơi.",
        },
      ],
      reading: {
        text: "HOLDING A RATE — DESK GUIDANCE\nSay no ONCE, clearly, with a reason from the market rather than from policy: 'we are usually sold out by Thursday' works; 'that is our policy' invites a second attempt.\nNever say 'maybe' or 'let me see what I can do' when the answer is no. A guest who hears maybe will ask again at check-out, and the second refusal costs far more goodwill than the first.\nAlways pair a firm no with an open door on different terms: a midweek date, a longer stay, a direct booking next time.\nIf the guest becomes personal or raises their voice, stop negotiating and call the Duty Manager. A rate conversation is never worth a scene in the lobby, and the desk has nothing left to offer once it has said no clearly.\nRecord every held rate in the profile with the date. A guest who was refused politely in March and quoted well in June usually books.",
        questions: [
          {
            q: "Vì sao KHÔNG được nói 'maybe' khi câu trả lời là không?",
            options: [
              "A. Vì khách sẽ hỏi lại lúc trả phòng, và lần từ chối thứ hai tốn thiện chí hơn nhiều",
              "B. Vì quản lý cấm dùng từ đó",
              "C. Vì khách sẽ nghĩ nhân viên không biết giá",
            ],
            correct: 0,
          },
          {
            q: "Khi khách to tiếng hoặc công kích cá nhân thì phải làm gì?",
            options: [
              "A. Đề nghị một mức giảm nhỏ để hạ nhiệt",
              "B. Ngừng đàm phán và gọi Duty Manager",
              "C. Tiếp tục giải thích cho tới khi khách hiểu",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Maybe. Let me see what I can do.",
          good: "I would rather be straight with you, madam: this rate will not move this weekend.",
        },
        {
          bad: "That is our policy, sir.",
          good: "We are firm this weekend, sir — we are usually sold out by Thursday.",
        },
      ],
      game: [
        {
          prompt: "I will just book somewhere else then.",
          options: [
            {
              text: "I understand, madam. If you change your mind, I can hold this room until six, and I would be glad to quote you for a midweek stay.",
              correct: true,
            },
            { text: "That is your choice, madam. Have a good evening.", correct: false },
            { text: "Wait — let me see if my manager will approve something.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_35_4",
      lessonOrder: 4,
      titleEn: "Closing It So Nobody Argues Later",
      titleVi: "Chốt lại để không ai cãi về sau",
      vocabulary: [
        {
          word: "Agreed rate",
          phonetic: "/əˈɡriːd reɪt/",
          definition: "Mức giá hai bên đã thống nhất",
          context: "The agreed rate is on your confirmation.",
          icon: "✍️",
        },
        {
          word: "Read it back",
          phonetic: "/riːd ɪt bæk/",
          definition: "Đọc lại cho khách xác nhận",
          context: "May I read it back to you before I confirm?",
          icon: "🔁",
        },
        {
          word: "Applies to",
          phonetic: "/əˈplaɪz tuː/",
          definition: "Áp dụng cho phần nào",
          context: "The breakfast applies to both guests, all four nights.",
          icon: "🎯",
        },
        {
          word: "Nothing verbal",
          phonetic: "/ˈnʌθɪŋ ˈvɜːbl/",
          definition: "Không thoả thuận miệng suông",
          context: "Nothing verbal — every concession goes on the booking.",
          icon: "📄",
        },
      ],
      grammar: [
        {
          rude: "Okay, done. See you at check-in.",
          polite:
            "May I read it back to you, madam? Breakfast for two, four nights, and a two o'clock check-out.",
          rule: "Đọc lại bằng danh sách có SỐ LƯỢNG và SỐ ĐÊM. Hai bên nhớ khác nhau là nguồn gốc của mọi cuộc cãi ở quầy thanh toán.",
        },
        {
          rude: "I will remember what we agreed.",
          polite:
            "Everything we agreed has been noted on your booking, sir, so any colleague can see it.",
          rule: "Bị động hiện tại hoàn thành 'has been noted' đặt trọng tâm vào việc ĐÃ được ghi, không vào ai ghi — và ngụ ý nó tồn tại độc lập với ca trực của bạn.",
        },
      ],
      speaking: [
        {
          guestPrompt: "And this is definitely going to be honoured when I arrive next month?",
          targetResponse:
            "It has been noted on the booking, sir. I will email you the confirmation tonight so you have it in writing.",
          helpTip:
            "'Noted' và 'honoured' đều có đuôi /d/. Giữ cả hai — nuốt đuôi làm câu mất thì hoàn thành và nghe như chuyện chưa xảy ra.",
        },
      ],
      reading: {
        text: "CLOSING A NEGOTIATION — FRONT DESK\nEvery concession goes on the BOOKING, not in a colleague's memory. Nothing verbal.\nWrite it as an amount or a count, never as an adjective: 'breakfast x2, 4 nights' not 'breakfast included'; 'check-out 14:00' not 'late check-out'.\nRead it back to the guest before confirming, and send the written confirmation the same shift.\nName what is NOT included as well. A guest who agreed to breakfast and assumed the minibar was free is the argument you are preventing.\nIf the concession runs past your shift or past this stay, tell the Duty Manager the same day. A rate held for a March return is worth nothing if nobody who works in March knows about it.",
        questions: [
          {
            q: "Nên ghi nhượng bộ bằng cách nào?",
            options: [
              "A. Ghi bằng con số hoặc số lượng, không ghi bằng tính từ",
              "B. Ghi ngắn gọn bằng tính từ cho dễ đọc",
              "C. Ghi vào sổ bàn giao ca thay vì vào booking",
            ],
            correct: 0,
          },
          {
            q: "Vì sao phải nêu cả những thứ KHÔNG bao gồm?",
            options: [
              "A. Để hoá đơn dài hơn",
              "B. Vì khách đồng ý bữa sáng rồi tưởng minibar cũng miễn phí chính là cuộc cãi đang được phòng ngừa",
              "C. Vì hệ thống bắt buộc điền đủ trường",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "Okay, agreed. I will remember.",
          good: "May I read it back, madam? Breakfast for two, four nights, check-out at two.",
        },
        {
          bad: "Late check-out is included, that is all noted.",
          good: "Check-out at fourteen hundred, all four nights — it has been noted on your booking, sir.",
        },
      ],
      game: [
        {
          prompt:
            "The last time I agreed something with your colleague, nobody knew about it when I arrived.",
          options: [
            {
              text: "Then let me put it on the booking itself, madam, and email you the confirmation tonight so you hold it too.",
              correct: true,
            },
            { text: "I will make sure I am working the day you arrive, madam.", correct: false },
            { text: "I will tell the team about it at the shift handover.", correct: false },
          ],
        },
      ],
    },
  ],
};

export const FO_WEEK_36: WeekContent = {
  departmentId: "FO",
  weekNumber: 36,
  weekTitleEn: "The First Fifteen Minutes of an Emergency",
  weekTitleVi: "Mười lăm phút đầu của một sự cố khẩn cấp",
  reviewWords: [
    "Emergency exit",
    "Safety",
    "Straight away",
    "Duty manager",
    "Authorise",
    "On record",
    "Update",
    "Within",
  ],
  lessons: [
    {
      lessonId: "FO_36_1",
      lessonOrder: 1,
      titleEn: "Before You Know Anything",
      titleVi: "Khi bạn còn chưa biết chuyện gì",
      vocabulary: [
        {
          word: "Evacuate",
          phonetic: "/ɪˈvækjueɪt/",
          definition: "Sơ tán ra khỏi toà nhà",
          context: "Please evacuate by the nearest staircase.",
          icon: "🚶",
        },
        {
          word: "Stairwell",
          phonetic: "/ˈsteəwel/",
          definition: "Lồng cầu thang bộ",
          context: "The stairwell is at the end of the corridor.",
          icon: "🪜",
        },
        {
          word: "Out of use",
          phonetic: "/aʊt əv juːs/",
          definition: "Ngừng sử dụng",
          context: "The lifts are out of use during an alarm.",
          icon: "⛔",
        },
        {
          word: "Assembly point",
          phonetic: "/əˈsembli pɔɪnt/",
          definition: "Điểm tập trung khi sơ tán",
          context: "Our assembly point is the car park, not the lobby.",
          icon: "📍",
        },
      ],
      grammar: [
        {
          rude: "Do not worry, it is probably nothing.",
          polite: "Please take the stairs to the car park, madam. The lifts are out of use.",
          rule: "Trong sự cố, dùng câu mệnh lệnh có 'please' và nói ĐIỀU PHẢI LÀM. Đoán nguyên nhân ('probably nothing') là điều duy nhất bị cấm tuyệt đối.",
        },
        {
          rude: "Someone pulled the alarm on the fourth floor.",
          polite: "The alarm has been triggered and we are checking it now, sir.",
          rule: "Bị động 'has been triggered' nêu sự việc mà không quy kết ai — bạn chưa biết, và đoán trước mặt khách là cách tin đồn bắt đầu.",
        },
      ],
      speaking: [
        {
          guestPrompt: "What is that noise? Is there a fire?",
          targetResponse:
            "The alarm has been triggered, madam. Please take the stairs to the car park — the lifts are out of use.",
          helpTip:
            "'Triggered' kết thúc bằng /d/ và 'stairs' bằng /z/. Người Việt hay bỏ cả hai; giữ được âm cuối là giữ được thì và số nhiều.",
        },
      ],
      reading: {
        text: "FIRE ALARM — FRONT DESK, FIRST FIFTEEN MINUTES\n0-2 min: do NOT leave the desk. Acknowledge the panel, note the zone, call Security on 7777. The desk is where every guest will come.\n2-5 min: print the in-house list and the room-status report. These two pages are the only record of who is in the building tonight.\nAll fifteen: the lifts are out of use, and you say so before a guest asks. Direct everyone to the nearest stairwell and to the CAR PARK. Never the lobby - the lobby is under the building.\nSay what is known and what is being done. Never guess the cause, never say 'it is probably a false alarm', and never name a floor or a room to a guest.\nIf it IS a drill, you still say all of the above. A guest cannot tell the difference, and the first shift that treats a drill casually is the shift that treats a fire casually.",
        questions: [
          {
            q: "Trong hai phút đầu, lễ tân phải làm gì?",
            options: [
              "A. Rời quầy đi kiểm tra tầng có báo động",
              "B. Ở lại quầy, xác nhận bảng điều khiển và gọi an ninh",
              "C. Đi từng phòng gõ cửa báo khách",
            ],
            correct: 1,
          },
          {
            q: "Vì sao điểm tập trung KHÔNG phải là sảnh?",
            options: [
              "A. Vì sảnh nằm dưới toà nhà",
              "B. Vì sảnh quá nhỏ cho tất cả khách",
              "C. Vì sảnh cần trống để đón xe cứu hoả",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "It is probably a false alarm, madam.",
          good: "The alarm has been triggered and we are checking now, madam. Please take the stairs.",
        },
        {
          bad: "The problem is on the fourth floor.",
          good: "We are checking it now, sir. Please make your way to the car park.",
        },
      ],
      game: [
        {
          prompt: "Is this a real fire or just another drill?",
          options: [
            {
              text: "We are checking that now, sir. Either way, please take the stairs to the car park — I will have news for you there.",
              correct: true,
            },
            { text: "It is almost certainly a drill, sir. They test it monthly.", correct: false },
            { text: "I do not know yet. You can wait here until we find out.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_36_2",
      lessonOrder: 2,
      titleEn: "Guests Who Cannot Take the Stairs",
      titleVi: "Khách không đi cầu thang được",
      vocabulary: [
        {
          word: "Mobility need",
          phonetic: "/məʊˈbɪləti niːd/",
          definition: "Nhu cầu hỗ trợ di chuyển",
          context: "Room 402 has a guest with a mobility need.",
          icon: "♿",
        },
        {
          word: "Refuge point",
          phonetic: "/ˈrefjuːdʒ pɔɪnt/",
          definition: "Điểm chờ cứu hộ trong lồng cầu thang",
          context: "The refuge point is inside the stairwell on each floor.",
          icon: "🛡️",
        },
        {
          word: "Account for",
          phonetic: "/əˈkaʊnt fə/",
          definition: "Xác nhận đã có mặt, không thiếu ai",
          context: "We must account for every guest on the list.",
          icon: "📋",
        },
        {
          word: "Stay with them",
          phonetic: "/steɪ wɪð ðəm/",
          definition: "Ở lại cùng khách, không bỏ đi",
          context: "Someone stays with them until the fire team arrives.",
          icon: "🤝",
        },
      ],
      grammar: [
        {
          rude: "You have to go down the stairs like everybody.",
          polite:
            "The refuge point is inside the stairwell, madam, and I will stay with you until the fire team reaches us.",
          rule: "Không bao giờ ra lệnh cho khách làm điều họ không làm được. Nêu nơi an toàn cụ thể rồi cam kết ở lại — 'I will stay' là lời hứa mạnh nhất trong khủng hoảng.",
        },
        {
          rude: "Room 402 has a disabled guest.",
          polite: "There is a guest with a mobility need on the fourth floor.",
          rule: "Không gọi tình trạng của khách thành nhãn ('a disabled guest'). Và không đọc số phòng nơi khách khác nghe được — kể cả trong sự cố.",
        },
      ],
      speaking: [
        {
          guestPrompt: "My mother uses a wheelchair. We cannot get her down four floors.",
          targetResponse:
            "You do not have to, madam. Take her into the stairwell — that is the refuge point — and I am sending someone up to stay with you.",
          helpTip:
            "'Wheelchair' và 'stairwell' đều có /w/ và /r/ liền nhau. Đọc chậm hai từ này; nói sai một từ trong sự cố là khách hiểu sai chỗ phải đến.",
        },
      ],
      reading: {
        text: "GUESTS WHO CANNOT USE THE STAIRS — FRONT DESK\nAt check-in, every guest with a mobility need is recorded on the in-house list with their FLOOR. This is the only reason the list exists.\nDuring an alarm: they do NOT go down. They go into the stairwell, which is fire-rated and is the refuge point on every floor. A member of staff stays with them.\nThe desk tells Security the floor and the number of people, never the room number over an open radio.\nAt the assembly point, account for every name on the in-house list. Report the ones you cannot find to the fire team by NAME AND FLOOR before they enter the building.\nGuests who refuse to leave are counted as still inside. Their room stays on the not-accounted list until someone has seen them outside.",
        questions: [
          {
            q: "Khách không đi cầu thang được thì đi đâu khi có báo động?",
            options: [
              "A. Xuống bằng thang máy có nhân viên đi kèm",
              "B. Vào trong lồng cầu thang, là điểm chờ cứu hộ",
              "C. Ở lại trong phòng và đóng cửa",
            ],
            correct: 1,
          },
          {
            q: "Khách từ chối rời phòng được tính là gì?",
            options: [
              "A. Vẫn còn ở bên trong toà nhà",
              "B. Đã tự chịu trách nhiệm nên không tính nữa",
              "C. Đã sơ tán vì đã được thông báo",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "Everybody has to use the stairs, madam.",
          good: "The refuge point is inside the stairwell, madam. I am sending someone to stay with you.",
        },
        {
          bad: "We have a disabled guest in 402.",
          good: "There is a guest with a mobility need on the fourth floor, and one on the sixth.",
        },
      ],
      game: [
        {
          prompt: "I have a broken leg. Am I supposed to hop down six floors?",
          options: [
            {
              text: "No, sir. Go into the stairwell and wait just inside — that is the refuge point, and someone is coming to stay with you.",
              correct: true,
            },
            {
              text: "Please try the stairs slowly, sir. We will help you at the bottom.",
              correct: false,
            },
            { text: "Stay in your room, sir, and we will come and find you.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_36_3",
      lessonOrder: 3,
      titleEn: "The Guest Who Will Not Leave",
      titleVi: "Khách không chịu rời đi",
      vocabulary: [
        {
          word: "Refuse to leave",
          phonetic: "/rɪˈfjuːz tə liːv/",
          definition: "Từ chối rời khỏi phòng",
          context: "Two guests on the third floor refuse to leave.",
          icon: "🚪",
        },
        {
          word: "Not accounted for",
          phonetic: "/nɒt əˈkaʊntɪd fə/",
          definition: "Chưa xác nhận được đang ở đâu",
          context: "Room 312 is still not accounted for.",
          icon: "❓",
        },
        {
          word: "Argue with them",
          phonetic: "/ˈɑːɡjuː wɪð ðəm/",
          definition: "Tranh cãi với khách",
          context: "Never argue with them in a corridor.",
          icon: "🚫",
        },
        {
          word: "Hand it over",
          phonetic: "/hænd ɪt ˈəʊvə/",
          definition: "Chuyển việc cho người có thẩm quyền",
          context: "Hand it over to Security and move on.",
          icon: "➡️",
        },
      ],
      grammar: [
        {
          rude: "You must come out right now.",
          polite:
            "The building is being evacuated, sir. May I walk down with you, or shall I send a colleague?",
          rule: "Bị động tiếp diễn 'is being evacuated' cho thấy việc đang diễn ra với TẤT CẢ mọi người, không phải bạn đang chọn riêng khách này.",
        },
        {
          rude: "Fine, stay here then. Not my problem.",
          polite:
            "I will let Security know you are in your room, madam, and someone will come to you.",
          rule: "Không bao giờ bỏ đi mà không báo. Khách ở lại vẫn phải được ghi nhận — im lặng ở đây là nguy hiểm chết người.",
        },
      ],
      speaking: [
        {
          guestPrompt:
            "I have paid for this room and I am not walking down eight floors in a towel.",
          targetResponse:
            "I understand, sir. Take a moment to dress — I will wait at your door and we will go down together.",
          helpTip:
            "Nói câu này chậm và trầm. Trong khủng hoảng, tốc độ nói của bạn là thứ khách sao chép — nói nhanh làm khách hoảng thêm.",
        },
      ],
      reading: {
        text: "A GUEST WHO WILL NOT EVACUATE — FRONT DESK\nAsk twice, calmly, then stop. Do not argue in a corridor and do not touch the guest. The desk has no authority to remove anyone, and an argument keeps two people inside instead of one.\nHand it over: tell Security the FLOOR, the number of people, and that they have declined. Security or the fire officer decides what happens next, not the desk.\nThe room stays on the not-accounted list, and the fire team is told before they enter. That single line is the difference between a search and a rescue.\nCommon reasons a guest refuses, and what works: not dressed (offer to wait at the door) · valuables in the safe (say the room is locked and Security is on the floor) · does not believe it is real (say the fire brigade is on its way, which is true for every alarm) · language (walk to them, point to the stairwell, and go together).\nWrite it in the incident log afterwards with the time you asked and the time you handed over. Never write an opinion about the guest.",
        questions: [
          {
            q: "Hỏi hai lần mà khách vẫn không đi thì làm gì?",
            options: [
              "A. Tiếp tục thuyết phục cho tới khi khách đồng ý",
              "B. Dừng lại và chuyển việc cho an ninh",
              "C. Vào phòng đưa khách ra",
            ],
            correct: 1,
          },
          {
            q: "Vì sao tranh cãi ngoài hành lang là sai?",
            options: [
              "A. Vì nó giữ hai người ở lại bên trong thay vì một",
              "B. Vì làm phiền các khách khác",
              "C. Vì camera hành lang sẽ ghi lại",
            ],
            correct: 0,
          },
        ],
      },
      arcade: [
        {
          bad: "You must leave right now, sir.",
          good: "The building is being evacuated, sir. May I walk down with you?",
        },
        {
          bad: "Suit yourself. I am going down.",
          good: "I will let Security know you are here, madam, and someone will come to you.",
        },
      ],
      game: [
        {
          prompt: "I am not leaving my laptop and passport in an unlocked room.",
          options: [
            {
              text: "Your door locks behind you, sir, and Security is on your floor. Bring the passport and let us go down together.",
              correct: true,
            },
            { text: "Nobody will take anything, sir. The hotel is very safe.", correct: false },
            { text: "You can stay if you prefer. I have to go down now.", correct: false },
          ],
        },
      ],
    },
    {
      lessonId: "FO_36_4",
      lessonOrder: 4,
      titleEn: "After the All-Clear",
      titleVi: "Sau khi có tín hiệu an toàn",
      vocabulary: [
        {
          word: "All-clear",
          phonetic: "/ɔːl ˈklɪə/",
          definition: "Tín hiệu đã an toàn, được vào lại",
          context: "The fire officer gives the all-clear, not the hotel.",
          icon: "✅",
        },
        {
          word: "Shaken",
          phonetic: "/ˈʃeɪkən/",
          definition: "Còn hoảng, chưa hoàn hồn",
          context: "Some guests will be shaken even after a drill.",
          icon: "😰",
        },
        {
          word: "Incident log",
          phonetic: "/ˈɪnsɪdənt lɒɡ/",
          definition: "Sổ ghi sự cố",
          context: "The incident log is written before the shift ends.",
          icon: "📓",
        },
        {
          word: "Check on them",
          phonetic: "/tʃek ɒn ðəm/",
          definition: "Ghé hỏi thăm lại",
          context: "Check on them again in the morning.",
          icon: "🔔",
        },
      ],
      grammar: [
        {
          rude: "It is over. You can go back up.",
          polite: "The fire officer has given the all-clear, madam. The lifts are working again.",
          rule: "Nêu AI cho phép vào lại. Khách vừa sợ cần biết quyết định đến từ cơ quan chức năng, không từ nhân viên khách sạn.",
        },
        {
          rude: "Nothing happened, so there is nothing to write.",
          polite: "I am writing the incident log now, sir, and your name is on the accounted list.",
          rule: "Hiện tại tiếp diễn 'I am writing' cho khách thấy việc đang xảy ra ngay lúc nói. Sự cố nào cũng phải có biên bản, kể cả diễn tập.",
        },
      ],
      speaking: [
        {
          guestPrompt: "My children were terrified. Is this how you run a hotel?",
          targetResponse:
            "I am sorry it frightened them, madam. The alarm did what it should, and the fire officer has cleared the building. May I send something warm up to your room?",
          helpTip:
            "'Frightened' có cụm /tnd/ ở cuối — rất khó. Đọc thành 'frigh-tend', giữ /d/. Nếu khó quá, dùng 'I am sorry they were so frightened'.",
        },
      ],
      reading: {
        text: "AFTER AN EVACUATION — FRONT DESK\nOnly the fire officer gives the all-clear. The desk never tells guests to go back in, however obvious it looks.\nBack in the lobby, do three things in this order: (1) say the all-clear came from the fire officer, (2) say the lifts are working again, (3) offer something warm - tea, water, a seat.\nGuests who were shaken are not settled by an explanation. They are settled by a person staying near them for ten minutes.\nWrite the incident log before the shift ends: time the alarm sounded, zone, time of the all-clear, who was not accounted for and when they were found, and what was said to guests. Facts only, no opinion about any guest.\nNext morning, check on the rooms with children, elderly guests, and anyone who used a refuge point. A note in the profile that they were checked on is worth more than any compensation.",
        questions: [
          {
            q: "Ai là người cho phép khách vào lại toà nhà?",
            options: ["A. Duty Manager", "B. Cán bộ phòng cháy chữa cháy", "C. Trưởng ca lễ tân"],
            correct: 1,
          },
          {
            q: "Khách còn hoảng thì điều gì làm họ bình tâm?",
            options: [
              "A. Một lời giải thích rõ ràng về nguyên nhân",
              "B. Có người ở gần họ chừng mười phút",
              "C. Một khoản bồi thường vào hoá đơn",
            ],
            correct: 1,
          },
        ],
      },
      arcade: [
        {
          bad: "It is finished, you can all go up now.",
          good: "The fire officer has given the all-clear, madam. The lifts are working again.",
        },
        {
          bad: "It was only a drill, so nothing to worry about.",
          good: "I am sorry it frightened them, sir. May I send something warm up to your room?",
        },
      ],
      game: [
        {
          prompt: "Everyone else is going back inside. Can we go up now?",
          options: [
            {
              text: "Not quite yet, madam. We wait for the fire officer to give the all-clear, and I will come and tell you the moment he does.",
              correct: true,
            },
            { text: "Yes, it looks like it is finished. Please use the lifts.", correct: false },
            { text: "If the others are going in, you may follow them, madam.", correct: false },
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
  "FO-31": FO_WEEK_31,
  "FO-32": FO_WEEK_32,
  "FO-33": FO_WEEK_33,
  "FO-34": FO_WEEK_34,
  "FO-35": FO_WEEK_35,
  "FO-36": FO_WEEK_36,
  "GR-37": GR_WEEK_37,
  "GR-38": GR_WEEK_38,
  "FB-37": FB_WEEK_37,
  "SW-37": SW_WEEK_37,
  "HK-37": HK_WEEK_37,
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
  "GR-37": GR_WEEK_37,
  "GR-38": GR_WEEK_38,
  "FB-37": FB_WEEK_37,
  "SW-37": SW_WEEK_37,
  "HK-37": HK_WEEK_37,
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
