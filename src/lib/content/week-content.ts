// Late-A1 CEFR content payload for Week 1 / Front Office.
// Concrete, courteous, modal-verb-led phrases tailored to 4-5★ hotels in Vietnam.

export type VocabItem = { word: string; phonetic: string; definition: string; context: string };
export type GrammarItem = { rude: string; polite: string; rule: string };
export type SpeakingItem = { guestPrompt: string; targetResponse: string; helpTip: string };
export type ReadingItem = { text: string; question: string; options: string[]; correctAnswer: number };
export type ArcadeItem = { bad: string; good: string };

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
        { word: "Welcome", phonetic: "/ˈwɛlkəm/", definition: "Chào đón", context: "Welcome to our hotel, sir." },
        { word: "Reservation", phonetic: "/ˌrɛzərˈveɪʃən/", definition: "Sự đặt phòng trước", context: "Do you have a reservation with us?" },
        { word: "Booking reference", phonetic: "/ˈbʊkɪŋ ˈrɛfərəns/", definition: "Mã số đặt phòng", context: "May I have your booking reference number?" },
        { word: "System", phonetic: "/ˈsɪstəm/", definition: "Hệ thống máy tính", context: "Let me check our system for your name." },
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
        question: "How did the guest pay for the room?",
        options: ["Paid online via Agoda", "Pay later at the front desk", "Cash deposit"],
        correctAnswer: 0,
      },
      arcade: [
        { bad: "Tell me your booking code.", good: "Could you provide your booking reference, please?" },
        { bad: "Sit there.", good: "Please take a seat in the lobby." },
      ],
    },
    {
      lessonId: "FO_1_2",
      lessonOrder: 2,
      titleEn: "Passport & Registration SOP",
      titleVi: "Mượn hộ chiếu & Đăng ký lưu trú",
      vocabulary: [
        { word: "Passport", phonetic: "/ˈpæspɔːrt/", definition: "Hộ chiếu", context: "May I have your passport, please?" },
        { word: "Local registration", phonetic: "/ˈloʊkəl ˌrɛdʒɪˈstreɪʃən/", definition: "Đăng ký lưu trú địa phương", context: "We need your passport for local registration." },
        { word: "Mandatory", phonetic: "/ˈmændətɔːri/", definition: "Bắt buộc theo quy định", context: "This registration is mandatory by law." },
        { word: "Keep briefly", phonetic: "/kiːp ˈbriːfli/", definition: "Giữ lại trong thời gian ngắn", context: "I will keep your passport briefly to scan it." },
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
        question: "What document must international guests show at check-in?",
        options: ["A copy of their credit card", "Their original passport", "A flight ticket"],
        correctAnswer: 1,
      },
      arcade: [
        { bad: "Give passport now.", good: "May I have your passport for registration, please?" },
        { bad: "Sign name here.", good: "Could you please sign your name here?" },
      ],
    },
    {
      lessonId: "FO_1_3",
      lessonOrder: 3,
      titleEn: "Pre-authorization Process",
      titleVi: "Quy trình quẹt thẻ đặt cọc",
      vocabulary: [
        { word: "Pre-authorization", phonetic: "/ˌpriːˌɔːθəraɪˈzeɪʃən/", definition: "Khoảng tạm giữ/Đặt cọc thẻ", context: "We require a credit card pre-authorization." },
        { word: "Incidental charges", phonetic: "/ˌɪnsɪˈdɛntl ˈtʃɑːrdʒɪz/", definition: "Chi phí phát sinh (minibar, v.v.)", context: "The deposit is for any incidental charges." },
        { word: "Deposit", phonetic: "/dɪˈpɒzɪt/", definition: "Tiền đặt cọc", context: "The security deposit is completely refundable." },
        { word: "Refund", phonetic: "/ˈriːfʌnd/", definition: "Hoàn tiền lại", context: "We will refund the amount at check-out." },
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
        question: "When will the security deposit be released?",
        options: ["At check-out time", "Two weeks later", "At dinner time"],
        correctAnswer: 0,
      },
      arcade: [
        { bad: "Give me card for money.", good: "May I have your credit card for the deposit, please?" },
        { bad: "Minibar is not free.", good: "The deposit covers incidental charges like the minibar." },
      ],
    },
    {
      lessonId: "FO_1_4",
      lessonOrder: 4,
      titleEn: "Amenities & Key Delivery",
      titleVi: "Giao chìa khóa & Giới thiệu tiện ích",
      vocabulary: [
        { word: "Room key", phonetic: "/ruːm kiː/", definition: "Chìa khóa phòng", context: "Here is your electronic room keycard." },
        { word: "Elevator", phonetic: "/ˈɛlɪveɪtər/", definition: "Thang máy", context: "The elevators are just behind you on the left." },
        { word: "Breakfast buffet", phonetic: "/ˈbrɛkfəst ˈbʊfeɪ/", definition: "Buffet ăn sáng", context: "Our breakfast buffet is on the first floor." },
        { word: "Opening hours", phonetic: "/ˈoʊpənɪŋ ˈaʊərz/", definition: "Giờ mở cửa", context: "The swimming pool opening hours are from 6 AM to 9 PM." },
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
        question: "Where is the swimming pool located?",
        options: ["On the first floor", "On the rooftop", "Inside room 512"],
        correctAnswer: 1,
      },
      arcade: [
        { bad: "Eat breakfast from 6 to 10.", good: "Breakfast is available from 6:30 AM until 10:00 AM." },
        { bad: "Take key and go.", good: "Here is your keycard, your room is on the fifth floor." },
      ],
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
