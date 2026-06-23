// Late-A1 CEFR content payload for Week 1 / Front Office.
// Concrete, courteous, modal-verb-led phrases tailored to 4-5★ hotels in Vietnam.

export type VocabItem = {
  word: string;
  phonetic: string;
  definition: string;
  context: string;
  icon?: string;
};
export type GrammarItem = { rude: string; polite: string; rule: string };
export type SpeakingItem = { guestPrompt: string; targetResponse: string; helpTip: string };
export type ReadingQuestion = { q: string; options: string[]; correct: number };
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
  speaking: SpeakingItem;
  reading: ReadingItem;
  arcade: ArcadeItem[];
  game: GameRound;
};

export type WeekContent = {
  departmentId: string;
  weekNumber: number;
  weekTitleEn: string;
  weekTitleVi: string;
  lessons: LessonContent[];
};

export const FO_WEEK_1: WeekContent = {
  departmentId: "FO",
  weekNumber: 1,
  weekTitleEn: "Standard Check-in & OTA Booking Verification",
  weekTitleVi: "Quy trình Đón tiếp & Check-in Khách Lẻ",
  lessons: [
    {
      lessonId: "FO_1_1",
      lessonOrder: 1,
      titleEn: "Greeting & PMS Verification",
      titleVi: "Chào đón & Kiểm tra hệ thống",
      vocabulary: [
        { word: "Welcome", phonetic: "/ˈwɛlkəm/", definition: "Chào đón", context: "Welcome to our hotel, sir.", icon: "🙏" },
        { word: "Reservation", phonetic: "/ˌrɛzərˈveɪʃən/", definition: "Sự đặt phòng trước", context: "Do you have a reservation with us?", icon: "📅" },
        { word: "Booking reference", phonetic: "/ˈbʊkɪŋ ˈrɛfərəns/", definition: "Mã số đặt phòng", context: "May I have your booking reference number?", icon: "🔖" },
        { word: "System", phonetic: "/ˈsɪstəm/", definition: "Hệ thống máy tính", context: "Let me check our system for your name.", icon: "💻" },
      ],
      grammar: [
        { rude: "Give me your name.", polite: "May I have your name, please?", rule: "Use 'May I have...' to ask for information politely." },
        { rude: "What is your booking number?", polite: "Could you please share your booking reference?", rule: "Use 'Could you please...' for professional questions." },
      ],
      speaking: {
        guestPrompt: "Hello, I have a booking under the name of David Green.",
        targetResponse: "Good morning, sir. Welcome to our hotel. Let me check our system for your name, please.",
        helpTip: "Remember to pronounce the ending sound in 'good morning' and 'welcome'.",
      },
      reading: {
        text: "AGODA CONFIRMATION VOUCHER\nGuest Name: David Green\nRoom Type: Deluxe Ocean View\nStay: 2 Nights\nStatus: Confirmed / Paid Online",
        questions: [
          { q: "How did the guest pay for the room?", options: ["A. Paid online via Agoda", "B. Pay later at front desk", "C. Cash"], correct: 0 },
          { q: "What is the room type booked by David Green?", options: ["A. Standard Room", "B. Superior City View", "C. Deluxe Ocean View"], correct: 2 },
        ],
      },
      arcade: [
        { bad: "Tell me your booking code.", good: "Could you provide your booking reference, please?" },
        { bad: "Sit there.", good: "Please take a seat in the lobby." },
      ],
      game: {
        prompt: "Hello, I have a booking under the name of David Green.",
        options: [
          { text: "May I have your name, please?", correct: true },
          { text: "Give me your name.", correct: false },
          { text: "Who are you?", correct: false },
        ],
      },
    },
    {
      lessonId: "FO_1_2",
      lessonOrder: 2,
      titleEn: "Passport & Registration SOP",
      titleVi: "Mượn hộ chiếu & Đăng ký lưu trú",
      vocabulary: [
        { word: "Passport", phonetic: "/ˈpæspɔːrt/", definition: "Hộ chiếu", context: "May I have your passport, please?", icon: "📘" },
        { word: "Local registration", phonetic: "/ˈloʊkəl ˌrɛdʒɪˈstreɪʃən/", definition: "Đăng ký lưu trú địa phương", context: "We need your passport for local registration.", icon: "📝" },
        { word: "Mandatory", phonetic: "/ˈmændətɔːri/", definition: "Bắt buộc theo quy định", context: "This registration is mandatory by law.", icon: "⚖️" },
        { word: "Keep briefly", phonetic: "/kiːp ˈbriːfli/", definition: "Giữ lại trong thời gian ngắn", context: "I will keep your passport briefly to scan it.", icon: "⏱️" },
      ],
      grammar: [
        { rude: "Give passport.", polite: "Could you please kindly provide your passport?", rule: "Add 'kindly' to make requests softer." },
        { rude: "I take this.", polite: "May I hold your passport for a moment?", rule: "Use 'May I hold...' to ask for temporary permission." },
      ],
      speaking: {
        guestPrompt: "Sure, here is my passport. Do you need to keep it?",
        targetResponse: "Thank you, sir. I just need to keep it briefly for our local registration process.",
        helpTip: "Focus on the linked sound in 'keep it briefly'.",
      },
      reading: {
        text: "HOTEL SOP - LOCAL REGISTRATION:\nAll international guests must show their original passport at check-in. The receptionist must scan the identity page and upload it to the local immigration portal before 11:00 PM.",
        questions: [
          { q: "What document must international guests show at check-in?", options: ["A. Credit card", "B. Original passport", "C. Flight ticket"], correct: 1 },
          { q: "When must the receptionist upload the scanned passport?", options: ["A. Next morning", "B. Before 11:00 PM", "C. After check-out"], correct: 1 },
        ],
      },
      arcade: [
        { bad: "Give passport now.", good: "May I have your passport for registration, please?" },
        { bad: "Sign name here.", good: "Could you please sign your name here?" },
      ],
      game: {
        prompt: "Sure, here is my passport. Do you need to keep it?",
        options: [
          { text: "I just need to keep it briefly for local registration, sir.", correct: true },
          { text: "Give passport now.", correct: false },
          { text: "Yes, I take this.", correct: false },
        ],
      },
    },
    {
      lessonId: "FO_1_3",
      lessonOrder: 3,
      titleEn: "Pre-authorization Process",
      titleVi: "Quy trình quẹt thẻ đặt cọc",
      vocabulary: [
        { word: "Pre-authorization", phonetic: "/ˌpriːˌɔːθəraɪˈzeɪʃən/", definition: "Khoảng tạm giữ/Đặt cọc thẻ", context: "We require a credit card pre-authorization.", icon: "💳" },
        { word: "Incidental charges", phonetic: "/ˌɪnsɪˈdɛntl ˈtʃɑːrdʒɪz/", definition: "Chi phí phát sinh (minibar, v.v.)", context: "The deposit is for any incidental charges.", icon: "🧾" },
        { word: "Deposit", phonetic: "/dɪˈpɒzɪt/", definition: "Tiền đặt cọc", context: "The security deposit is completely refundable.", icon: "💰" },
        { word: "Refund", phonetic: "/ˈriːfʌnd/", definition: "Hoàn tiền lại", context: "We will refund the amount at check-out.", icon: "💵" },
      ],
      grammar: [
        { rude: "Give me your credit card.", polite: "May I secure a pre-authorization on your credit card?", rule: "Use 'May I secure...' instead of demanding a card." },
        { rude: "You must pay for minibar.", polite: "This deposit is for incidental charges like the minibar.", rule: "Explain rules gently using 'This is for...'" },
      ],
      speaking: {
        guestPrompt: "Why do you need my credit card if the room is already paid?",
        targetResponse: "I understand, ma'am. This is just a temporary deposit for any incidental charges during your stay.",
        helpTip: "Pronounce 'incidental charges' clearly by breaking it down: in-ci-den-tal.",
      },
      reading: {
        text: "INCIDENTAL POLICY:\nA security deposit of 1,000,000 VND per night is required at check-in. This amount will be released automatically at check-out if there are no mini-bar or laundry uses.",
        questions: [
          { q: "When will the security deposit be released?", options: ["A. At check-out time", "B. Two weeks later", "C. At dinner time"], correct: 0 },
          { q: "What is the security deposit amount per night?", options: ["A. 500,000 VND", "B. 1,000,000 VND", "C. 2,000,000 VND"], correct: 1 },
        ],
      },
      arcade: [
        { bad: "Give me card for money.", good: "May I have your credit card for the deposit, please?" },
        { bad: "Minibar is not free.", good: "The deposit covers incidental charges like the minibar." },
      ],
      game: {
        prompt: "Why do you need my credit card if the room is already paid?",
        options: [
          { text: "This is just a temporary deposit for incidental charges, ma'am.", correct: true },
          { text: "Minibar is not free.", correct: false },
          { text: "Give me card for money.", correct: false },
        ],
      },
    },
    {
      lessonId: "FO_1_4",
      lessonOrder: 4,
      titleEn: "Amenities & Key Delivery",
      titleVi: "Giao chìa khóa & Giới thiệu tiện ích",
      vocabulary: [
        { word: "Room key", phonetic: "/ruːm kiː/", definition: "Chìa khóa phòng", context: "Here is your electronic room keycard.", icon: "🔑" },
        { word: "Elevator", phonetic: "/ˈɛlɪveɪtər/", definition: "Thang máy", context: "The elevators are just behind you on the left.", icon: "🛗" },
        { word: "Breakfast buffet", phonetic: "/ˈbrɛkfəst ˈbʊfeɪ/", definition: "Buffet ăn sáng", context: "Our breakfast buffet is on the first floor.", icon: "🍽️" },
        { word: "Opening hours", phonetic: "/ˈoʊpənɪŋ ˈaʊərz/", definition: "Giờ mở cửa", context: "The swimming pool opening hours are from 6 AM to 9 PM.", icon: "🕐" },
      ],
      grammar: [
        { rude: "Go to first floor for food.", polite: "Breakfast is served at the main restaurant on the first floor.", rule: "Use passive structures like 'Breakfast is served...' to sound professional." },
        { rude: "Pool closes at 9.", polite: "The swimming pool is open until 9:00 PM.", rule: "State facility hours using 'is open until...'." },
      ],
      speaking: {
        guestPrompt: "Thank you. What time is breakfast served tomorrow morning?",
        targetResponse: "Our complimentary breakfast buffet is served from 6:30 AM until 10:00 AM, sir.",
        helpTip: "Ensure a clear 't' sound at the end of 'breakfast' and 's' sound in 'served'.",
      },
      reading: {
        text: "WELCOME TO THE RESORT:\n- Your room is 512 (5th Floor). Use your keycard in the elevator.\n- Breakfast Buffet: Lotus Restaurant (1st Floor) | 06:30 - 10:00.\n- Fitness Center & Infinity Pool: Rooftop | 06:00 - 21:00.",
        questions: [
          { q: "Where is the swimming pool located?", options: ["A. First floor", "B. On the rooftop", "C. Room 512"], correct: 1 },
          { q: "What time does the complimentary breakfast buffet close?", options: ["A. 9:00 AM", "B. 10:00 AM", "C. 11:00 AM"], correct: 1 },
        ],
      },
      arcade: [
        { bad: "Eat breakfast from 6 to 10.", good: "Breakfast is available from 6:30 AM until 10:00 AM." },
        { bad: "Take key and go.", good: "Here is your keycard, your room is on the fifth floor." },
      ],
      game: {
        prompt: "Thank you. What time is breakfast served tomorrow morning?",
        options: [
          { text: "Our complimentary breakfast buffet is served from 6:30 AM until 10:00 AM, sir.", correct: true },
          { text: "Go to first floor and eat from 6 to 10.", correct: false },
          { text: "Restaurant is over there, go eat.", correct: false },
        ],
      },
    },
  ],
};

// Registry — keyed by `${DEP}-${week}`.
const REGISTRY: Record<string, WeekContent> = {
  "FO-1": FO_WEEK_1,
};

export function getWeekContent(dep: string, week: string | number): WeekContent | null {
  const wk = typeof week === "string" ? parseInt(week, 10) : week;
  return REGISTRY[`${dep.toUpperCase()}-${wk}`] ?? null;
}
