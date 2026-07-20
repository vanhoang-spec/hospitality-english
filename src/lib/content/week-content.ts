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

export const FB_WEEK_1: WeekContent = {
  departmentId: "FB",
  weekNumber: 1,
  weekTitleEn: "Breakfast Buffet Welcoming & Station Mapping",
  weekTitleVi: "Điều Phối & Đón Tiếp Tại Nhà Hàng Buffet Sáng",
  lessons: [
    {
      lessonId: "FB_1_1",
      lessonOrder: 1,
      titleEn: "Greeting & Breakfast Voucher Verification",
      titleVi: "Chào đón & Kiểm tra Phiếu ăn sáng",
      vocabulary: [
        { word: "Entrance", phonetic: "/ˈɛntrəns/", definition: "Lối vào", context: "Please wait for me at the restaurant entrance.", icon: "🚪" },
        { word: "Breakfast voucher", phonetic: "/ˈbrɛkfəst ˈvaʊtʃər/", definition: "Phiếu ăn sáng", context: "Could I see your breakfast voucher, please?", icon: "🎫" },
        { word: "In-house guest", phonetic: "/ɪn haʊs ɡɛst/", definition: "Khách đang lưu trú tại khách sạn", context: "All in-house guests receive complimentary breakfast.", icon: "🏨" },
        { word: "Verify", phonetic: "/ˈvɛrɪfaɪ/", definition: "Xác minh, kiểm tra", context: "I need to verify your room number on our list.", icon: "🔍" },
      ],
      grammar: [
        { rude: "What's your room number?", polite: "May I ask for your room number, please?", rule: "Use 'May I ask for...' to request information softly with a modal verb." },
        { rude: "You're not on the list.", polite: "I'm sorry, I can't find your name on the list just yet. Could you give me a moment?", rule: "Open with an apology and a hedge ('just yet') before delivering a problem." },
      ],
      speaking: {
        guestPrompt: "Good morning. We're staying in room 512, is breakfast included?",
        targetResponse: "Good morning, and welcome. Yes, of course. May I just check your room number on our list, please?",
        helpTip: "Link 'check your' smoothly so it sounds like one word: 'che-kyer'.",
      },
      reading: {
        text: "IN-HOUSE GUEST LIST - BREAKFAST\nRoom 512 - Mr. David Green - 2 Adults - B&B Included\nRoom 608 - Ms. Lisa Tran - 1 Adult - Room Only (No Breakfast)\nRestaurant Hours: 06:30 - 10:00",
        questions: [
          { q: "Which guest is NOT included for breakfast?", options: ["A. Mr. David Green in Room 512", "B. Ms. Lisa Tran in Room 608", "C. Both guests"], correct: 1 },
          { q: "What does 'B&B' mean for the guest in Room 512?", options: ["A. Bed and Breakfast included", "B. Bed only, no meals", "C. Breakfast paid separately"], correct: 0 },
        ],
      },
      arcade: [
        { bad: "Room number?", good: "May I have your room number, please?" },
        { bad: "You're not on my list.", good: "I'm sorry, I can't find your name yet — could you give me one moment?" },
      ],
      game: {
        prompt: "Good morning. We're staying in room 512, is breakfast included?",
        options: [
          { text: "Good morning, and welcome. May I just check your room number on our list, please?", correct: true },
          { text: "Room number?", correct: false },
          { text: "Yes, go sit down.", correct: false },
        ],
      },
    },
    {
      lessonId: "FB_1_2",
      lessonOrder: 2,
      titleEn: "Queue Management at Peak Hours",
      titleVi: "Quản lý Hàng đợi Giờ cao điểm",
      vocabulary: [
        { word: "Queue", phonetic: "/kjuː/", definition: "Hàng đợi, xếp hàng", context: "There is a short queue near the entrance this morning.", icon: "🧍" },
        { word: "Peak hours", phonetic: "/piːk ˈaʊərz/", definition: "Giờ cao điểm", context: "Breakfast is busiest during peak hours, from 8 to 9:30.", icon: "⏰" },
        { word: "Available", phonetic: "/əˈveɪləbəl/", definition: "Còn trống, sẵn sàng sử dụng", context: "A window table will be available very soon.", icon: "✅" },
        { word: "Shortly", phonetic: "/ˈʃɔːrtli/", definition: "Trong chốc lát, sớm thôi", context: "Your table will be ready shortly, sir.", icon: "⏱️" },
      ],
      grammar: [
        { rude: "Wait there.", polite: "Would you mind waiting here for just a moment, sir?", rule: "Use 'Would you mind...?' to turn a command into an indirect, polite request." },
        { rude: "Table's not ready.", polite: "Your table is being prepared right now, it will only take a few minutes.", rule: "Use the passive voice ('is being prepared') to sound professional and avoid blame." },
      ],
      speaking: {
        guestPrompt: "There are no tables free right now. How long do we have to wait?",
        targetResponse: "I'm sorry for the wait, sir. Would you mind waiting here for just five minutes? A table will be free very soon.",
        helpTip: "Say 'sorry' gently and keep your tone calm and unhurried, not apologetic in a worried way.",
      },
      reading: {
        text: "STAFF MEMO - PEAK HOUR SEATING\nBetween 8:00 - 9:30 AM, all tables are usually full.\nStaff must offer a waiting area near the entrance and inform guests of the approximate waiting time.\nDo not let guests stand near the buffet line.",
        questions: [
          { q: "During which hours are tables usually full?", options: ["A. 6:00 - 7:00 AM", "B. 8:00 - 9:30 AM", "C. 10:00 - 11:00 AM"], correct: 1 },
          { q: "Where should waiting guests be directed to?", options: ["A. Near the buffet line", "B. To another restaurant", "C. To the waiting area near the entrance"], correct: 2 },
        ],
      },
      arcade: [
        { bad: "No table. Wait.", good: "I'm sorry, all tables are full right now. Would you mind waiting a few minutes?" },
        { bad: "Stand there.", good: "Please wait in this area, a table will be ready shortly." },
      ],
      game: {
        prompt: "There are no tables free right now. How long do we have to wait?",
        options: [
          { text: "I'm sorry for the wait, sir. Would you mind waiting here for just five minutes?", correct: true },
          { text: "No table. Wait.", correct: false },
          { text: "I don't know, just stand there.", correct: false },
        ],
      },
    },
    {
      lessonId: "FB_1_3",
      lessonOrder: 3,
      titleEn: "Escorting Guests & Station Mapping",
      titleVi: "Dẫn khách & Giới thiệu Sơ đồ Buffet",
      vocabulary: [
        { word: "Escort", phonetic: "/ɪˈskɔːrt/", definition: "Dẫn, hộ tống khách", context: "Let me escort you to your table, please follow me.", icon: "🚶" },
        { word: "Live station", phonetic: "/laɪv ˈsteɪʃən/", definition: "Quầy chế biến món nóng trực tiếp", context: "Our live station serves hot Phở and eggs every morning.", icon: "🍳" },
        { word: "Bakery corner", phonetic: "/ˈbeɪkəri ˈkɔːrnər/", definition: "Khu vực quầy bánh mì", context: "You will find fresh croissants at the bakery corner.", icon: "🥐" },
        { word: "Juice area", phonetic: "/dʒuːs ˈɛriə/", definition: "Khu vực nước trái cây", context: "The juice area is right next to the coffee machines.", icon: "🧃" },
      ],
      grammar: [
        { rude: "Go get food there.", polite: "Let me show you where the hot food station is.", rule: "Use 'Let me...' to offer help instead of giving a direct order." },
        { rude: "Coffee's over there.", polite: "You'll find the coffee and juice station just next to the bakery corner.", rule: "Use 'You'll find...' to guide guests gently instead of pointing or commanding." },
      ],
      speaking: {
        guestPrompt: "This is our first time here — where can we find something hot to eat?",
        targetResponse: "Let me show you. Our live station over there serves hot Phở and eggs, and the bakery corner is right next to it.",
        helpTip: "Practice linking 'show' and 'you' so they blend smoothly into 'show-you'.",
      },
      reading: {
        text: "BREAKFAST STATION MAP\nLive Station: Phở & Made-to-Order Eggs (Center)\nBakery Corner: Bread, Croissants, Jam (Left Wall)\nJuice & Beverage Area: Fresh Juice, Coffee, Tea (Near Windows)",
        questions: [
          { q: "Where is the bakery corner located?", options: ["A. Center", "B. Left wall", "C. Near the windows"], correct: 1 },
          { q: "What can guests order at the live station?", options: ["A. Only bread and jam", "B. Only coffee", "C. Phở and made-to-order eggs"], correct: 2 },
        ],
      },
      arcade: [
        { bad: "Food is over there.", good: "Let me show you where the hot food station is." },
        { bad: "Coffee, that way.", good: "You'll find the coffee and juice area just next to the bakery corner." },
      ],
      game: {
        prompt: "This is our first time here — where can we find something hot to eat?",
        options: [
          { text: "Let me show you. Our live station serves hot Phở and eggs, and the bakery corner is right next to it.", correct: true },
          { text: "Food is over there.", correct: false },
          { text: "I don't know, look around.", correct: false },
        ],
      },
    },
    {
      lessonId: "FB_1_4",
      lessonOrder: 4,
      titleEn: "Table Clearing & Satisfaction Check",
      titleVi: "Dọn bàn & Hỏi thăm Mức độ hài lòng",
      vocabulary: [
        { word: "Clear", phonetic: "/klɪr/", definition: "Dọn (đĩa, bàn)", context: "May I clear this plate for you, ma'am?", icon: "🍽️" },
        { word: "Empty plate", phonetic: "/ˈɛmpti pleɪt/", definition: "Đĩa đã dùng xong, trống", context: "I can see an empty plate, shall I take it away?", icon: "🍴" },
        { word: "Enjoy", phonetic: "/ɪnˈdʒɔɪ/", definition: "Thưởng thức, hài lòng", context: "I hope you are enjoying your breakfast.", icon: "😊" },
        { word: "Satisfied", phonetic: "/ˈsætɪsfaɪd/", definition: "Hài lòng", context: "We always want our guests to feel fully satisfied.", icon: "👍" },
      ],
      grammar: [
        { rude: "Give me your plate.", polite: "Would you like me to clear your plate for you?", rule: "Use 'Would you like me to...?' to offer service without sounding intrusive." },
        { rude: "Is food ok?", polite: "I hope you're enjoying your breakfast so far, is everything to your liking?", rule: "Use 'I hope...' plus a warm tag question to check satisfaction naturally." },
      ],
      speaking: {
        guestPrompt: "We're all finished, thank you. The food was lovely.",
        targetResponse: "I'm so glad to hear that. Would you like me to clear your plates for you?",
        helpTip: "Smile while saying 'glad to hear that' — it naturally lifts your pitch and sounds sincere.",
      },
      reading: {
        text: "TABLE SERVICE SOP - CLEARING\nAlways ask for permission before clearing any plate.\nNever clear a plate while a guest is still using cutlery on it.\nAsk 'Is everything to your liking?' at least once during the meal.",
        questions: [
          { q: "When should staff NOT clear a plate?", options: ["A. When it is empty", "B. While the guest is still using cutlery on it", "C. After the guest leaves"], correct: 1 },
          { q: "What should staff ask during the meal?", options: ["A. 'Is everything to your liking?'", "B. 'Are you finished?'", "C. 'How much did you eat?'"], correct: 0 },
        ],
      },
      arcade: [
        { bad: "Finished? Give plate.", good: "Would you like me to clear your plate for you?" },
        { bad: "Food good?", good: "I hope you're enjoying your breakfast, is everything to your liking?" },
      ],
      game: {
        prompt: "We're all finished, thank you. The food was lovely.",
        options: [
          { text: "I'm so glad to hear that. Would you like me to clear your plates for you?", correct: true },
          { text: "Finished? Give plate.", correct: false },
          { text: "Okay, bye.", correct: false },
        ],
      },
    },
  ],
};

export const HK_WEEK_1: WeekContent = {
  departmentId: "HK",
  weekNumber: 1,
  weekTitleEn: "Room Service Requests & Extra Amenities",
  weekTitleVi: "Quy Trình Giao Tiếp Phòng Khách & Phục Vụ Tiện Ích",
  lessons: [
    {
      lessonId: "HK_1_1",
      lessonOrder: 1,
      titleEn: "Knock & Announce SOP",
      titleVi: "Quy trình Gõ cửa & Thông báo",
      vocabulary: [
        { word: "Housekeeping", phonetic: "/ˈhaʊsˌkiːpɪŋ/", definition: "Bộ phận buồng phòng", context: "Housekeeping! Good morning!", icon: "🧹" },
        { word: "Knock", phonetic: "/nɒk/", definition: "Gõ cửa", context: "Please knock twice before entering the room.", icon: "👊" },
        { word: "Occupied", phonetic: "/ˈɒkjʊpaɪd/", definition: "Đang có khách ở (phòng)", context: "The status shows this room is occupied.", icon: "🚪" },
        { word: "Announce", phonetic: "/əˈnaʊns/", definition: "Thông báo danh tính", context: "Always announce yourself before entering.", icon: "📢" },
      ],
      grammar: [
        { rude: "Housekeeping, open the door.", polite: "Housekeeping! May I come in to service the room?", rule: "Use 'May I come in...' as a modal verb to ask permission, not a command." },
        { rude: "I'm coming in now.", polite: "Would it be convenient for me to clean the room now?", rule: "Use 'Would it be convenient...' to check timing politely." },
      ],
      speaking: {
        guestPrompt: "Oh, sorry, I'm still in the room. Can you come back later?",
        targetResponse: "Of course, ma'am. I'm sorry to disturb you. I will come back later. Thank you.",
        helpTip: "Link the words smoothly in 'sorry to disturb' — soften the 't' sound into the next word.",
      },
      reading: {
        text: "HOUSEKEEPING SOP - KNOCK AND ANNOUNCE:\n1. Knock on the door twice and say 'Housekeeping' in a clear voice.\n2. Wait at least 10 seconds for a response.\n3. If there is no answer, knock and announce a second time before entering.\n4. If a guest answers, greet them and politely ask permission to clean the room.",
        questions: [
          { q: "What should staff say while knocking on the door?", options: ["A. Room service", "B. Housekeeping", "C. Reception"], correct: 1 },
          { q: "How long should staff wait for a response after knocking?", options: ["A. At least 10 seconds", "B. 1 minute", "C. No need to wait"], correct: 0 },
        ],
      },
      arcade: [
        { bad: "Housekeeping, open up.", good: "Housekeeping! May I come in to clean your room?" },
        { bad: "I'm coming in.", good: "Excuse me, is now a good time to service the room?" },
      ],
      game: {
        prompt: "Oh, sorry, I'm still in the room. Can you come back later?",
        options: [
          { text: "Of course, ma'am. I'm sorry to disturb you. I will come back later.", correct: true },
          { text: "No problem, I will just clean quickly now.", correct: false },
          { text: "You should have put the DND sign up.", correct: false },
        ],
      },
    },
    {
      lessonId: "HK_1_2",
      lessonOrder: 2,
      titleEn: "Amenities Requests",
      titleVi: "Xử lý Yêu cầu Tiện ích",
      vocabulary: [
        { word: "Amenities", phonetic: "/əˈmiːnətiz/", definition: "Vật dụng tiện nghi", context: "We are happy to provide extra amenities.", icon: "🧴" },
        { word: "Bath towel", phonetic: "/bɑːθ ˈtaʊəl/", definition: "Khăn tắm", context: "Could I get an extra bath towel, please?", icon: "🛁" },
        { word: "Razor", phonetic: "/ˈreɪzər/", definition: "Dao cạo râu", context: "I can bring a disposable razor to your room shortly.", icon: "🪒" },
        { word: "Complimentary", phonetic: "/kəmˈplɪmentəri/", definition: "Miễn phí (dịch vụ đi kèm)", context: "Bottled water is complimentary in every room.", icon: "💧" },
      ],
      grammar: [
        { rude: "What do you want?", polite: "How may I assist you today?", rule: "Use the open, polite question 'How may I...' instead of a blunt one." },
        { rude: "Wait there.", polite: "I will bring that up to your room right away.", rule: "Use 'will' with a specific time reference to reassure the guest instead of giving a command." },
      ],
      speaking: {
        guestPrompt: "Hi, could I get two more bath towels and a razor sent up to room 812?",
        targetResponse: "Certainly, sir. I will send two extra towels and a razor to room 812 right away.",
        helpTip: "Practice linking 'send up' smoothly — connect the 'd' straight into the 'u' sound.",
      },
      reading: {
        text: "HOUSEKEEPING AMENITIES REQUEST FORM\nRoom: 812\nItems Requested: 2x Bath Towel, 1x Razor\nRequested Time: 3:15 PM\nDelivery Deadline: Within 15 minutes\nNote: Bottled water is complimentary, no charge to guest.",
        questions: [
          { q: "How many bath towels did the guest in Room 812 request?", options: ["A. One", "B. Two", "C. Three"], correct: 1 },
          { q: "What is the delivery deadline for amenities requests?", options: ["A. Within 15 minutes", "B. Within 1 hour", "C. Next morning"], correct: 0 },
        ],
      },
      arcade: [
        { bad: "What do you want?", good: "How may I assist you today?" },
        { bad: "Wait there, I'm busy.", good: "I will bring that to your room right away." },
      ],
      game: {
        prompt: "Hi, could I get two more bath towels and a razor sent up to room 812?",
        options: [
          { text: "Certainly, sir. I will send two extra towels and a razor to room 812 right away.", correct: true },
          { text: "What do you want them for?", correct: false },
          { text: "Wait there, I'm busy right now.", correct: false },
        ],
      },
    },
    {
      lessonId: "HK_1_3",
      lessonOrder: 3,
      titleEn: "Rollaway Beds & Equipment Loans",
      titleVi: "Giường phụ & Cho mượn Thiết bị",
      vocabulary: [
        { word: "Rollaway bed", phonetic: "/ˈroʊləweɪ bɛd/", definition: "Giường phụ có bánh xe", context: "We can set up a rollaway bed for an extra guest.", icon: "🛏️" },
        { word: "Adapter", phonetic: "/əˈdæptər/", definition: "Bộ chuyển đổi ổ cắm", context: "I can lend you a universal adapter for your device.", icon: "🔌" },
        { word: "Iron", phonetic: "/ˈaɪərn/", definition: "Bàn là (ủi đồ)", context: "Would you like to borrow an iron and ironing board?", icon: "👔" },
        { word: "Extra charge", phonetic: "/ˈɛkstrə tʃɑːrdʒ/", definition: "Phụ phí", context: "Please note the rollaway bed has an extra charge per night.", icon: "💲" },
      ],
      grammar: [
        { rude: "You want a bed or not?", polite: "Would you like us to set up a rollaway bed for you?", rule: "Use 'Would you like us to...' to offer a service politely." },
        { rude: "That costs more money.", polite: "Please note there is a small extra charge for this service.", rule: "Soften unwelcome news with 'Please note...' instead of stating it bluntly." },
      ],
      speaking: {
        guestPrompt: "My son is joining us tonight. Do you have an extra bed we could use?",
        targetResponse: "Certainly, sir. We can set up a rollaway bed in your room. Please note there is a small extra charge per night.",
        helpTip: "Stress the word 'certainly' at the start of your reply to sound warm and confident.",
      },
      reading: {
        text: "IN-ROOM SERVICE MENU:\nRollaway Bed: 300,000 VND / night (please request 2 hours in advance)\nUniversal Adapter: Complimentary, subject to availability\nIron & Ironing Board: Complimentary, delivered within 20 minutes",
        questions: [
          { q: "How much does the rollaway bed cost per night?", options: ["A. Free", "B. 300,000 VND", "C. 500,000 VND"], correct: 1 },
          { q: "How far in advance should guests request a rollaway bed?", options: ["A. 2 hours", "B. 1 day", "C. No need to request"], correct: 0 },
        ],
      },
      arcade: [
        { bad: "You want a bed or not?", good: "Would you like us to set up a rollaway bed for you?" },
        { bad: "That costs more money.", good: "Please note there is a small extra charge for this service." },
      ],
      game: {
        prompt: "My son is joining us tonight. Do you have an extra bed we could use?",
        options: [
          { text: "Certainly, sir. We can set up a rollaway bed in your room, with a small extra charge per night.", correct: true },
          { text: "You want a bed or not?", correct: false },
          { text: "We don't have extra beds.", correct: false },
        ],
      },
    },
    {
      lessonId: "HK_1_4",
      lessonOrder: 4,
      titleEn: "Handling Do Not Disturb Rooms",
      titleVi: "Xử lý Phòng treo biển DND",
      vocabulary: [
        { word: "Do Not Disturb", phonetic: "/duː nɒt dɪˈstɜːrb/", definition: "Biển \"Xin đừng làm phiền\"", context: "The sign on the door says Do Not Disturb.", icon: "🚫" },
        { word: "Courtesy call", phonetic: "/ˈkɜːrtəsi kɔːl/", definition: "Cuộc gọi nhắc nhở lịch sự", context: "We will make a courtesy call before checkout time.", icon: "☎️" },
        { word: "Voicemail", phonetic: "/ˈvɔɪsmeɪl/", definition: "Hộp thư thoại", context: "I will leave a voicemail if the guest doesn't answer.", icon: "📥" },
        { word: "Slip under the door", phonetic: "/slɪp ˈʌndər ðə dɔːr/", definition: "Nhét đồ/giấy qua khe cửa", context: "I will slip a note under the door instead.", icon: "✉️" },
      ],
      grammar: [
        { rude: "Wake up, we need to clean.", polite: "I'm sorry to disturb you, but could I check if you need housekeeping later?", rule: "Apologize first with 'I'm sorry to disturb you, but...' before making a request." },
        { rude: "You have to open the door now.", polite: "Whenever it's convenient, could you please let us know when we may service the room?", rule: "Use 'Whenever it's convenient...' to give the guest control over timing." },
      ],
      speaking: {
        guestPrompt: "Hello? Yes, this is room 1005, sorry, I forgot to remove the sign.",
        targetResponse: "No problem at all, sir. Would now be a good time for us to clean the room, or shall we come back later?",
        helpTip: "Let your tone rise gently on 'later' so it sounds like a genuine question, not a command.",
      },
      reading: {
        text: "DND HANDLING PROCEDURE:\n- If a room shows Do Not Disturb past 2:00 PM, call the room to check on the guest.\n- If there is no answer, leave a polite voicemail and slip a courtesy note under the door.\n- Never remove the DND sign or enter without guest confirmation.",
        questions: [
          { q: "What time should staff call a DND room to check on the guest?", options: ["A. Past 2:00 PM", "B. Past 6:00 PM", "C. Immediately in the morning"], correct: 0 },
          { q: "What should staff do if there is no answer on the phone?", options: ["A. Enter the room anyway", "B. Leave a voicemail and slip a note under the door", "C. Ignore the room"], correct: 1 },
        ],
      },
      arcade: [
        { bad: "Wake up, we need to clean.", good: "I'm sorry to disturb you, but could I check when housekeeping may visit?" },
        { bad: "You have to open the door now.", good: "Whenever it's convenient, could you let us know when we may service the room?" },
      ],
      game: {
        prompt: "Hello? Yes, this is room 1005, sorry, I forgot to remove the sign.",
        options: [
          { text: "No problem at all, sir. Would now be a good time for us to clean the room, or shall we come back later?", correct: true },
          { text: "You have to open the door now.", correct: false },
          { text: "You should not have that sign up.", correct: false },
        ],
      },
    },
  ],
};

export const SW_WEEK_1: WeekContent = {
  departmentId: "SW",
  weekNumber: 1,
  weekTitleEn: "Spa Treatment Consultation & Package Upselling",
  weekTitleVi: "Tư Vấn Liệu Trình Spa & Kỹ Thuật Upselling Gói Trị Liệu",
  lessons: [
    {
      lessonId: "SW_1_1",
      lessonOrder: 1,
      titleEn: "Welcoming Guests & Health Consultation Form",
      titleVi: "Chào đón Khách & Phiếu Khảo sát Sức khỏe",
      vocabulary: [
        { word: "Consultation", phonetic: "/ˌkɒnsəlˈteɪʃən/", definition: "Sự tư vấn, buổi tham vấn", context: "Please complete this health consultation form before your treatment.", icon: "📋" },
        { word: "Allergy", phonetic: "/ˈælərdʒi/", definition: "Dị ứng", context: "Do you have any allergies to essential oils or nuts?", icon: "🤧" },
        { word: "Pressure", phonetic: "/ˈprɛʃər/", definition: "Lực ấn, áp lực (khi massage)", context: "What pressure level do you prefer, light or firm?", icon: "✋" },
        { word: "Condition", phonetic: "/kənˈdɪʃən/", definition: "Tình trạng (sức khỏe)", context: "Please let us know if you have any medical conditions.", icon: "🩺" },
      ],
      grammar: [
        { rude: "Fill this out.", polite: "Could you please fill out this health form for us?", rule: "Use 'Could you please...' + verb to turn a command into a polite request." },
        { rude: "Do you have allergies?", polite: "Would you mind telling us if you have any allergies?", rule: "'Would you mind + verb-ing' softens a direct question about personal or health information." },
      ],
      speaking: {
        guestPrompt: "This is my first time here. What do I need to do?",
        targetResponse: "Welcome to our spa! Before your treatment, please take a seat and fill out this short health consultation form for us.",
        helpTip: "Link 'fill out' smoothly — the 't' connects to the next vowel, sounding like 'fi-lout'.",
      },
      reading: {
        text: "SPA HEALTH CONSULTATION FORM\nGuest Name: Ms. Lan Pham\nAny allergies: Peanut oil\nSkin condition: Sensitive skin\nPregnant: No\nPreferred pressure: Medium\nAreas to avoid: Lower back (recent injury)",
        questions: [
          { q: "Which area should the therapist avoid during the massage?", options: ["A. The guest's arms", "B. The guest's lower back", "C. The guest's shoulders"], correct: 1 },
          { q: "What allergy does the guest have?", options: ["A. Peanut oil", "B. Lavender", "C. Nuts and dairy"], correct: 0 },
        ],
      },
      arcade: [
        { bad: "Sign here.", good: "Could you please sign here for us?" },
        { bad: "You have to wait.", good: "Would you mind waiting just a moment, please?" },
      ],
      game: {
        prompt: "This is my first time here. What do I need to do?",
        options: [
          { text: "Welcome to our spa! Before your treatment, please take a seat and fill out this short health consultation form for us.", correct: true },
          { text: "Sit down and fill this form.", correct: false },
          { text: "We don't know, ask someone else.", correct: false },
        ],
      },
    },
    {
      lessonId: "SW_1_2",
      lessonOrder: 2,
      titleEn: "Explaining Treatment Types",
      titleVi: "Giải thích các Liệu pháp Trị liệu",
      vocabulary: [
        { word: "Traditional", phonetic: "/trəˈdɪʃənəl/", definition: "Truyền thống", context: "Our traditional Vietnamese massage uses gentle stretching techniques.", icon: "🇻🇳" },
        { word: "Hot stone", phonetic: "/hɒt stoʊn/", definition: "Đá nóng", context: "The hot stone massage uses heated basalt stones to relax your muscles.", icon: "🪨" },
        { word: "Herbal steam", phonetic: "/ˈhɜːrbəl stiːm/", definition: "Xông hơi thảo dược", context: "Herbal steam opens your pores and clears your sinuses.", icon: "🌿" },
        { word: "Circulation", phonetic: "/ˌsɜːrkjəˈleɪʃən/", definition: "Sự tuần hoàn (máu)", context: "This treatment improves blood circulation throughout your body.", icon: "💓" },
      ],
      grammar: [
        { rude: "This one is better than that one.", polite: "I'd recommend our hot stone massage, as it works especially well for muscle tension.", rule: "Use 'I'd recommend...' + reason with 'as/because' to suggest, instead of a blunt comparison." },
        { rude: "That treatment is old-fashioned.", polite: "Our traditional massage is a wonderful choice if you prefer gentle, relaxing techniques.", rule: "Use 'is a wonderful choice if...' to frame an option positively rather than criticize another." },
      ],
      speaking: {
        guestPrompt: "I'm not sure which massage to choose. What's the difference?",
        targetResponse: "Of course! Our traditional Vietnamese massage focuses on stretching, while the hot stone massage uses heated stones for deeper muscle relief. Which sounds better for you?",
        helpTip: "Stress the contrast words 'traditional' and 'hot stone' a little louder so the guest hears the comparison clearly.",
      },
      reading: {
        text: "SERENITY SPA - TREATMENT MENU\nTraditional Vietnamese Massage - 60 min - Gentle stretching, eases fatigue\nHot Stone Massage - 75 min - Heated basalt stones, deep muscle relief\nHerbal Steam Therapy - 30 min - Local herbs, clears sinuses, softens skin",
        questions: [
          { q: "Which treatment uses heated basalt stones?", options: ["A. Traditional Vietnamese Massage", "B. Hot Stone Massage", "C. Herbal Steam Therapy"], correct: 1 },
          { q: "How long does the Herbal Steam Therapy last?", options: ["A. 30 minutes", "B. 60 minutes", "C. 75 minutes"], correct: 0 },
        ],
      },
      arcade: [
        { bad: "That one is boring.", good: "That treatment is more relaxing and gentle." },
        { bad: "I don't know, just pick one.", good: "Let me explain the difference so you can choose the best option." },
      ],
      game: {
        prompt: "I'm not sure which massage to choose. What's the difference?",
        options: [
          { text: "Of course! Our traditional Vietnamese massage focuses on stretching, while the hot stone massage uses heated stones for deeper muscle relief. Which sounds better for you?", correct: true },
          { text: "They are all the same, just pick one.", correct: false },
          { text: "The hot stone one is the only good one.", correct: false },
        ],
      },
    },
    {
      lessonId: "SW_1_3",
      lessonOrder: 3,
      titleEn: "Upselling to Combo & Family Packages",
      titleVi: "Kỹ thuật Upselling Gói Combo & Gia đình",
      vocabulary: [
        { word: "Package", phonetic: "/ˈpækɪdʒ/", definition: "Gói dịch vụ", context: "We have a special couple's package this week.", icon: "🎁" },
        { word: "Combo", phonetic: "/ˈkɒmboʊ/", definition: "Gói kết hợp", context: "The combo includes a massage and a facial treatment.", icon: "🧖" },
        { word: "Complimentary", phonetic: "/ˌkɒmplɪˈmɛntəri/", definition: "Miễn phí (đi kèm)", context: "The family package includes a complimentary herbal tea.", icon: "🍵" },
        { word: "Membership", phonetic: "/ˈmɛmbərʃɪp/", definition: "Thẻ hội viên", context: "Would you like to hear about our long-term membership plans?", icon: "💳" },
      ],
      grammar: [
        { rude: "You should buy the bigger package.", polite: "Have you considered our couple's combo? It's a lovely way to relax together.", rule: "Use 'Have you considered...?' to suggest an upgrade without pressuring the guest." },
        { rude: "It's cheaper if you buy more.", polite: "If you'd like, we could offer you our family package at a special rate.", rule: "Use a conditional 'If you'd like, we could...' to offer an upgrade gently." },
      ],
      speaking: {
        guestPrompt: "I just want a single massage for myself today.",
        targetResponse: "That sounds lovely. If you'd like, we also have a couple's combo package this week — would you like to bring your partner next time?",
        helpTip: "Raise your intonation at the end of 'next time?' to keep the offer friendly, not pushy.",
      },
      reading: {
        text: "SERENITY SPA - THIS MONTH'S OFFER\nCouple's Combo: 2 x 90-min Massage + Herbal Tea for Two - 20% off\nFamily Care Package: 4 Sessions (Valid 3 Months) - Save 1,200,000 VND\nBook 2 or more sessions to receive a complimentary foot scrub.",
        questions: [
          { q: "What do guests receive with the Couple's Combo?", options: ["A. Herbal tea for two", "B. A free foot scrub", "C. A discount voucher"], correct: 0 },
          { q: "How long is the Family Care Package valid?", options: ["A. 1 month", "B. 3 months", "C. 1 year"], correct: 1 },
        ],
      },
      arcade: [
        { bad: "Buy the bigger package, it's better.", good: "Our combo package might be a nice option if you'd like extra relaxation." },
        { bad: "Just get the membership, everyone does.", good: "May I tell you a little about our membership benefits?" },
      ],
      game: {
        prompt: "I just want a single massage for myself today.",
        options: [
          { text: "That sounds lovely. If you'd like, we also have a couple's combo package this week — would you like to bring your partner next time?", correct: true },
          { text: "No, we only sell single sessions.", correct: false },
          { text: "You should really buy the family package instead.", correct: false },
        ],
      },
    },
    {
      lessonId: "SW_1_4",
      lessonOrder: 4,
      titleEn: "Post-Treatment Feedback & Product Recommendation",
      titleVi: "Thu thập Phản hồi & Tư vấn Sản phẩm Mang về",
      vocabulary: [
        { word: "Feedback", phonetic: "/ˈfiːdbæk/", definition: "Phản hồi, góp ý", context: "May I ask for your feedback about the massage today?", icon: "💬" },
        { word: "Essential oil", phonetic: "/ɪˈsɛnʃəl ɔɪl/", definition: "Tinh dầu", context: "This essential oil helped relax your muscles during the session.", icon: "🧴" },
        { word: "Moisturize", phonetic: "/ˈmɔɪstʃəraɪz/", definition: "Dưỡng ẩm", context: "This cream will moisturize your skin after the steam treatment.", icon: "💧" },
        { word: "Recommend", phonetic: "/ˌrɛkəˈmɛnd/", definition: "Giới thiệu, đề xuất", context: "I'd like to recommend a take-home product for your skin type.", icon: "🛍️" },
      ],
      grammar: [
        { rude: "How was it?", polite: "May I ask how you found your treatment today?", rule: "Use 'May I ask...' to open a feedback question more formally." },
        { rude: "You should buy this cream.", polite: "This moisturizing cream will be recommended for your skin type, if you're interested.", rule: "Use passive voice ('will be recommended') to suggest a product gently, without sounding pushy." },
      ],
      speaking: {
        guestPrompt: "That massage was wonderful, thank you.",
        targetResponse: "I'm so glad to hear that! May I recommend this lavender essential oil to help you relax at home too?",
        helpTip: "Smile while you speak — it naturally warms your tone on 'I'm so glad to hear that'.",
      },
      reading: {
        text: "SERENITY SPA - TAKE-HOME PRODUCTS\nLavender Essential Oil - Relaxation & sleep support - 350,000 VND\nGinger Body Scrub - Improves circulation - 280,000 VND\nAloe Vera Moisturizer - For sensitive, sun-exposed skin - 320,000 VND\nAsk your therapist which product suits your skin type.",
        questions: [
          { q: "Which product is best for sensitive, sun-exposed skin?", options: ["A. Lavender Essential Oil", "B. Ginger Body Scrub", "C. Aloe Vera Moisturizer"], correct: 2 },
          { q: "What is the Lavender Essential Oil used for?", options: ["A. Improves circulation", "B. Relaxation and sleep support", "C. Sun protection"], correct: 1 },
        ],
      },
      arcade: [
        { bad: "Did you like it?", good: "May I ask how you found your treatment today?" },
        { bad: "You need this cream.", good: "This cream might be perfect for your skin type — would you like to try it?" },
      ],
      game: {
        prompt: "That massage was wonderful, thank you.",
        options: [
          { text: "I'm so glad to hear that! May I recommend this lavender essential oil to help you relax at home too?", correct: true },
          { text: "Okay, thanks. Goodbye.", correct: false },
          { text: "You should have told us earlier.", correct: false },
        ],
      },
    },
  ],
};

export const GR_WEEK_1: WeekContent = {
  departmentId: "GR",
  weekNumber: 1,
  weekTitleEn: "VIP & Executive Club Benefits Management",
  weekTitleVi: "Chăm Sóc Khách Hàng Thượng Lưu (HNWI) Tại Executive Lounge",
  lessons: [
    {
      lessonId: "GR_1_1",
      lessonOrder: 1,
      titleEn: "Welcoming VIP Guests & Introducing Club Privileges",
      titleVi: "Đón tiếp Khách VIP & Giới thiệu Đặc quyền Club",
      vocabulary: [
        { word: "Privilege", phonetic: "/ˈprɪvəlɪdʒ/", definition: "Đặc quyền", context: "As a Club member, you have access to several exclusive privileges.", icon: "🎁" },
        { word: "Complimentary", phonetic: "/ˌkɒmplɪˈmɛntəri/", definition: "Miễn phí (đi kèm dịch vụ)", context: "Breakfast is complimentary for all Executive Suite guests.", icon: "🆓" },
        { word: "Personalized", phonetic: "/ˈpɜːrsənəlaɪzd/", definition: "Được cá nhân hóa", context: "We have prepared a personalized welcome for you, Mr. Tran.", icon: "✨" },
        { word: "Access", phonetic: "/ˈæksɛs/", definition: "Quyền sử dụng, truy cập", context: "Your key card gives you access to the Executive Lounge on the 20th floor.", icon: "🔑" },
      ],
      grammar: [
        { rude: "You get free breakfast and evening drinks.", polite: "You will be entitled to complimentary breakfast and evening cocktails.", rule: "Use 'will be entitled to' instead of 'get' to sound more formal and precise about guest privileges." },
        { rude: "I need to explain the rules to you.", polite: "Allow me to walk you through your Club privileges.", rule: "Use 'Allow me to...' as a polite softener when offering to explain or assist." },
      ],
      speaking: {
        guestPrompt: "This is my first time staying in a Club Room. What do I actually get?",
        targetResponse: "Welcome, Mr. Tran. As a Club Room guest, you're entitled to Executive Lounge access, complimentary breakfast, all-day refreshments, and evening cocktails. Allow me to explain each privilege in detail.",
        helpTip: "Link 'entitled to' smoothly — pronounce it as one flowing phrase, /ɪnˈtaɪtəld tə/, not word by word.",
      },
      reading: {
        text: "EXECUTIVE CLUB PRIVILEGES\nGuest: Mr. Minh Tran | Room: Club Suite 1802\n- Executive Lounge access (7:00 AM - 10:00 PM)\n- Complimentary breakfast & all-day refreshments\n- Evening Cocktail Hour (6:00 PM - 8:00 PM)\n- Late check-out until 2:00 PM (subject to availability)\n- Complimentary pressing of two garments per stay",
        questions: [
          { q: "What time does the Executive Lounge close?", options: ["A. 8:00 PM", "B. 10:00 PM", "C. 2:00 PM"], correct: 1 },
          { q: "What is included besides breakfast and drinks?", options: ["A. Free spa treatment", "B. Free garment pressing", "C. Free airport transfer"], correct: 1 },
        ],
      },
      arcade: [
        { bad: "You get free stuff here.", good: "You are entitled to a range of complimentary privileges during your stay." },
        { bad: "I'll tell you the rules now.", good: "Allow me to walk you through your Club benefits." },
      ],
      game: {
        prompt: "This is my first time staying in a Club Room. What do I actually get?",
        options: [
          { text: "Welcome, Mr. Tran. As a Club Room guest, you're entitled to Executive Lounge access, complimentary breakfast, all-day refreshments, and evening cocktails.", correct: true },
          { text: "You just get free breakfast, that's it.", correct: false },
          { text: "I don't know, please ask someone else.", correct: false },
        ],
      },
    },
    {
      lessonId: "GR_1_2",
      lessonOrder: 2,
      titleEn: "Afternoon Tea & Evening Cocktail Hour Service",
      titleVi: "Phục vụ Trà Chiều & Giờ Cocktail Buổi Tối",
      vocabulary: [
        { word: "Refreshments", phonetic: "/rɪˈfrɛʃmənts/", definition: "Đồ ăn nhẹ, thức uống giải khát", context: "Refreshments are served in the lounge throughout the day.", icon: "🍰" },
        { word: "Selection", phonetic: "/sɪˈlɛkʃən/", definition: "Sự lựa chọn (đa dạng món)", context: "We offer a selection of teas, pastries, and finger sandwiches.", icon: "🍵" },
        { word: "Canapés", phonetic: "/ˈkænəpeɪz/", definition: "Món khai vị nhỏ", context: "Our chef prepares fresh canapés for Cocktail Hour every evening.", icon: "🍢" },
        { word: "Replenish", phonetic: "/rɪˈplɛnɪʃ/", definition: "Bổ sung thêm (đồ ăn/uống)", context: "I will replenish the pastry tray for you right away.", icon: "🔄" },
      ],
      grammar: [
        { rude: "Do you want tea or coffee?", polite: "Would you prefer tea or coffee this afternoon?", rule: "Use 'Would you prefer...' instead of 'Do you want...' for a softer, more refined offer." },
        { rude: "The drinks are over there, help yourself.", polite: "Our Cocktail Hour selection is displayed on the counter — please feel free to help yourself.", rule: "Add a polite lead-in phrase before an instruction to soften a direct command." },
      ],
      speaking: {
        guestPrompt: "Is there a set time for the afternoon tea, or can I come anytime?",
        targetResponse: "Afternoon Tea is served daily from 3:00 to 5:00 PM, madam. You're welcome to join us anytime within that window, and I'll be happy to prepare a fresh selection for you.",
        helpTip: "Practice the linking sound between 'set' and 'time' — /sɛt‿taɪm/ — so it flows naturally instead of sounding choppy.",
      },
      reading: {
        text: "EXECUTIVE LOUNGE DAILY SCHEDULE\n7:00 - 10:30 AM: Breakfast\n10:30 AM - 3:00 PM: All-day Refreshments\n3:00 - 5:00 PM: Afternoon Tea\n6:00 - 8:00 PM: Evening Cocktail Hour (canapés & selected beverages)\nNote: Children under 12 are welcome before 6:00 PM only.",
        questions: [
          { q: "When can guests enjoy Afternoon Tea?", options: ["A. 7:00 - 10:30 AM", "B. 3:00 - 5:00 PM", "C. 6:00 - 8:00 PM"], correct: 1 },
          { q: "What is the age policy for the lounge?", options: ["A. No children allowed at all", "B. Children under 12 welcome only before 6:00 PM", "C. Children must be accompanied after 8:00 PM"], correct: 1 },
        ],
      },
      arcade: [
        { bad: "Tea is from 3 to 5, that's it.", good: "Afternoon Tea is served daily from 3:00 to 5:00 PM — please join us anytime within that window." },
        { bad: "Kids can't come after 6.", good: "For a relaxed atmosphere, we welcome children in the lounge until 6:00 PM." },
      ],
      game: {
        prompt: "Is there a set time for the afternoon tea, or can I come anytime?",
        options: [
          { text: "Afternoon Tea is served daily from 3:00 to 5:00 PM, madam. You're welcome to join us anytime within that window.", correct: true },
          { text: "Anytime, we don't have a schedule.", correct: false },
          { text: "Tea time is only in the morning.", correct: false },
        ],
      },
    },
    {
      lessonId: "GR_1_3",
      lessonOrder: 3,
      titleEn: "Executive Assistance: Meeting Rooms & Urgent Printing",
      titleVi: "Hỗ trợ Thư ký Hành chính: Đặt Phòng Họp & In ấn Khẩn cấp",
      vocabulary: [
        { word: "Confidential", phonetic: "/ˌkɒnfɪˈdɛnʃəl/", definition: "Bảo mật, riêng tư", context: "This is a confidential business meeting, so we need a private room.", icon: "🔒" },
        { word: "Availability", phonetic: "/əˌveɪləˈbɪləti/", definition: "Tình trạng còn trống", context: "Let me check the availability of our private meeting room.", icon: "📆" },
        { word: "Urgent", phonetic: "/ˈɜːrdʒənt/", definition: "Khẩn cấp", context: "I have an urgent document that needs printing before my 3 PM call.", icon: "⏰" },
        { word: "Assistance", phonetic: "/əˈsɪstəns/", definition: "Sự hỗ trợ, giúp đỡ", context: "Our Guest Relations team is happy to provide assistance with your documents.", icon: "🤝" },
      ],
      grammar: [
        { rude: "You can't use the meeting room now, it's busy.", polite: "I'm afraid the meeting room is currently occupied — may I reserve it for you at 2:00 PM instead?", rule: "Use 'I'm afraid...' to soften bad news, then immediately offer an alternative." },
        { rude: "Send me the file and I'll print it.", polite: "If you could send me the file, I would be glad to have it printed for you right away.", rule: "Use conditional 'If you could...' with 'I would be glad to...' to make a request-and-offer sound courteous." },
      ],
      speaking: {
        guestPrompt: "I need a private room for a confidential call in 30 minutes, and I also have a document that must be printed urgently.",
        targetResponse: "Certainly, sir. I'll reserve our private meeting room for you right away, and if you could send me the document, I would be glad to have it printed immediately.",
        helpTip: "Stress the key words 'right away' and 'immediately' with a slightly rising then falling tone to sound efficient and reassuring.",
      },
      reading: {
        text: "BUSINESS CENTER REQUEST FORM\nGuest: Ms. Lan Pham | Suite 2105\nService Requested: Private Meeting Room (30 mins)\nPrinting: 1 document, Confidential, 5 copies\nRequested Time: 2:30 PM\nStatus: Confirmed - Room B, Urgent Print Queue",
        questions: [
          { q: "How many copies of the document does the guest need?", options: ["A. 1 copy", "B. 5 copies", "C. 10 copies"], correct: 1 },
          { q: "What type of document is being printed?", options: ["A. Confidential", "B. Public", "C. Marketing material"], correct: 0 },
        ],
      },
      arcade: [
        { bad: "The room is busy, come back later.", good: "I'm afraid the room is currently occupied — may I reserve it for you at a later time?" },
        { bad: "Just email it, I'll print it whenever.", good: "If you could send me the file now, I would be glad to have it printed right away." },
      ],
      game: {
        prompt: "I need a private room for a confidential call in 30 minutes, and I also have a document that must be printed urgently.",
        options: [
          { text: "Certainly, sir. I'll reserve our private meeting room for you right away, and if you could send me the document, I would be glad to have it printed immediately.", correct: true },
          { text: "Sorry, we don't have a printer here.", correct: false },
          { text: "You should have booked earlier.", correct: false },
        ],
      },
    },
    {
      lessonId: "GR_1_4",
      lessonOrder: 4,
      titleEn: "Managing Guest History Profiles & Preferences",
      titleVi: "Quản trị Hồ sơ Lịch sử Khách hàng & Ghi nhận Sở thích",
      vocabulary: [
        { word: "Preference", phonetic: "/ˈprɛfərəns/", definition: "Sở thích, sự ưu tiên", context: "Please note the guest's preference for a high floor room.", icon: "📝" },
        { word: "Anniversary", phonetic: "/ˌænɪˈvɜːrsəri/", definition: "Ngày kỷ niệm", context: "Mr. and Mrs. Lee are celebrating their wedding anniversary during this stay.", icon: "💍" },
        { word: "Allergy", phonetic: "/ˈælərdʒi/", definition: "Dị ứng", context: "The guest has a shellfish allergy, so please inform the kitchen.", icon: "⚠️" },
        { word: "Recurring", phonetic: "/rɪˈkɜːrɪŋ/", definition: "Lặp lại, thường xuyên", context: "This is a recurring request from our loyal guest — he always asks for extra pillows.", icon: "🔁" },
      ],
      grammar: [
        { rude: "Write down what he likes.", polite: "Let's make sure to record his preferences in the guest profile.", rule: "Use 'Let's make sure to...' to turn a blunt instruction into a collaborative, professional suggestion." },
        { rude: "He wants a firm pillow, note it.", polite: "It has been noted that the guest prefers a firm pillow for future stays.", rule: "Use the passive voice ('It has been noted that...') to record information formally and objectively." },
      ],
      speaking: {
        guestPrompt: "By the way, I noticed you remembered I like my coffee black with no sugar. That was really thoughtful.",
        targetResponse: "Thank you, sir. It has been noted in your profile, so we can make sure every detail is just right for your future stays with us as well.",
        helpTip: "Soften the ending with a falling intonation on 'future stays with us' to sound sincere rather than robotic.",
      },
      reading: {
        text: "GUEST HISTORY PROFILE\nGuest: Mr. James Carter | Loyalty Tier: Diamond\nPreferences:\n- Coffee: Black, no sugar\n- Pillow: Firm, 2 extra\n- Room: High floor, away from elevator\n- Special Note: Wedding anniversary on Aug 15 - arrange small cake\nAllergy: None reported",
        questions: [
          { q: "How does Mr. Carter like his coffee?", options: ["A. Black, no sugar", "B. With milk and sugar", "C. Black with sugar"], correct: 0 },
          { q: "What special arrangement should be made for Mr. Carter?", options: ["A. Airport pickup", "B. A small cake for his anniversary", "C. Extra towels"], correct: 1 },
        ],
      },
      arcade: [
        { bad: "Just remember he likes black coffee, don't bother writing it down.", good: "Let's make sure to record his coffee preference in the guest profile for future visits." },
        { bad: "He wants a firm pillow, whatever.", good: "It has been noted that the guest prefers a firm pillow for future stays." },
      ],
      game: {
        prompt: "By the way, I noticed you remembered I like my coffee black with no sugar. That was really thoughtful.",
        options: [
          { text: "Thank you, sir. It has been noted in your profile, so we can make sure every detail is just right for your future stays with us.", correct: true },
          { text: "Oh, I don't really remember guest preferences.", correct: false },
          { text: "That's just a coincidence, sir.", correct: false },
        ],
      },
    },
  ],
};

export const BO_WEEK_1: WeekContent = {
  departmentId: "BO",
  weekNumber: 1,
  weekTitleEn: "B2B Account Sales & Contract Negotiations",
  weekTitleVi: "Đàm Phán Hợp Đồng Đại Lý Lữ Hành & Doanh Nghiệp (B2B Account Sales)",
  lessons: [
    {
      lessonId: "BO_1_1",
      lessonOrder: 1,
      titleEn: "Pitching Corporate Rates & Closing the Contract",
      titleVi: "Chào giá Doanh nghiệp & Chốt Hợp đồng",
      vocabulary: [
        { word: "Corporate rate", phonetic: "/ˈkɔːrpərət reɪt/", definition: "Giá phòng dành cho doanh nghiệp", context: "We can offer you a special corporate rate for your company.", icon: "🏢" },
        { word: "Volume contract", phonetic: "/ˈvɒljuːm ˈkɒntrækt/", definition: "Hợp đồng theo số lượng lớn", context: "This volume contract guarantees you the best price all year.", icon: "📄" },
        { word: "Competitive", phonetic: "/kəmˈpɛtɪtɪv/", definition: "Có tính cạnh tranh", context: "Our rates are very competitive compared to nearby hotels.", icon: "💪" },
        { word: "Sign (a contract)", phonetic: "/saɪn/", definition: "Ký (hợp đồng)", context: "We would be delighted if you could sign the agreement today.", icon: "✍️" },
      ],
      grammar: [
        { rude: "You should sign now.", polite: "Would you be interested in signing the agreement today?", rule: "Use 'Would you be interested in...' to introduce an offer softly instead of pushing directly." },
        { rude: "This is the best price, take it.", polite: "I would strongly recommend this package, as it offers the best value for your volume.", rule: "Use 'I would strongly recommend...' to give advice diplomatically instead of a command." },
      ],
      speaking: {
        guestPrompt: "Your rates look good, but what can you offer for 200 room-nights a month?",
        targetResponse: "For that volume, we can offer you our best corporate rate, along with a complimentary upgrade for your VIP clients.",
        helpTip: "Link 'complimentary upgrade' smoothly — don't pause between the two words.",
      },
      reading: {
        text: "GRAND HOTEL - CORPORATE RATE PROPOSAL\nPartner: Viet Travel Co., Ltd.\nRoom Type: Deluxe Room\nCorporate Rate: 1,800,000 VND/night (net)\nMinimum Volume: 150 room-nights/month\nContract Term: 12 months",
        questions: [
          { q: "What is the minimum volume required for this corporate rate?", options: ["A. 100 room-nights/month", "B. 150 room-nights/month", "C. 200 room-nights/month"], correct: 1 },
          { q: "How long is the contract term?", options: ["A. 6 months", "B. 12 months", "C. 24 months"], correct: 1 },
        ],
      },
      arcade: [
        { bad: "Buy more rooms, cheaper price.", good: "The more rooms you commit to, the more competitive our rate becomes." },
        { bad: "Sign here now.", good: "Shall we go ahead and finalize the agreement today?" },
      ],
      game: {
        prompt: "Your rates look good, but what can you offer for 200 room-nights a month?",
        options: [
          { text: "For that volume, we can offer you our best corporate rate, along with a complimentary upgrade.", correct: true },
          { text: "This is the best price, take it.", correct: false },
          { text: "We don't discuss volume, just book normally.", correct: false },
        ],
      },
    },
    {
      lessonId: "BO_1_2",
      lessonOrder: 2,
      titleEn: "Allotment & Release Period",
      titleVi: "Thỏa thuận Phân bổ Phòng & Thời hạn Hoàn phòng",
      vocabulary: [
        { word: "Allotment", phonetic: "/əˈlɒtmənt/", definition: "Số lượng phòng phân bổ", context: "We can guarantee an allotment of 10 rooms every weekend.", icon: "🛏️" },
        { word: "Release period", phonetic: "/rɪˈliːs ˈpɪəriəd/", definition: "Thời hạn hoàn trả phòng không bán được", context: "The release period for unsold rooms is 7 days before arrival.", icon: "⏳" },
        { word: "Unsold rooms", phonetic: "/ʌnˈsoʊld ruːmz/", definition: "Phòng chưa được bán", context: "Please confirm or release the unsold rooms by Friday.", icon: "🚪" },
        { word: "Confirm", phonetic: "/kənˈfɜːrm/", definition: "Xác nhận", context: "Could you confirm your rooms before the release deadline?", icon: "✅" },
      ],
      grammar: [
        { rude: "Give back rooms you don't sell.", polite: "If you cannot sell the rooms, we would ask that you release them by the deadline.", rule: "Use a conditional 'If... we would ask that...' to state a policy collaboratively." },
        { rude: "We will cancel rooms automatically.", polite: "Any unsold rooms will be automatically released after the deadline.", rule: "Use passive voice ('will be released') to state a policy neutrally, without sounding like blame." },
      ],
      speaking: {
        guestPrompt: "How many rooms can you hold for us, and until when?",
        targetResponse: "We can allot 10 rooms per night, with a release period of 7 days before arrival.",
        helpTip: "Stress the number and the noun together: 'TEN rooms', 'SEVEN days' — this avoids confusion on the phone.",
      },
      reading: {
        text: "CONTRACT CLAUSE 4 - ROOM ALLOTMENT:\nThe Hotel shall allot ten (10) rooms per night to the Partner.\nAny rooms not confirmed by the Partner within the Release Period (7 days prior to arrival) shall be automatically released back to general inventory.",
        questions: [
          { q: "How many rooms does the Hotel allot per night?", options: ["A. 5 rooms", "B. 10 rooms", "C. 15 rooms"], correct: 1 },
          { q: "What happens to rooms not confirmed within the release period?", options: ["A. They are held for another week", "B. They are released back to general inventory", "C. They are given a discount"], correct: 1 },
        ],
      },
      arcade: [
        { bad: "You lose rooms if you're late.", good: "Unconfirmed rooms will be released back to inventory after the deadline." },
        { bad: "Tell us fast if you want rooms.", good: "Please confirm your room requirement before the release period ends." },
      ],
      game: {
        prompt: "How many rooms can you hold for us, and until when?",
        options: [
          { text: "We can allot 10 rooms per night, with a release period of 7 days before arrival.", correct: true },
          { text: "You lose rooms if you're late.", correct: false },
          { text: "We don't hold rooms for anyone.", correct: false },
        ],
      },
    },
    {
      lessonId: "BO_1_3",
      lessonOrder: 3,
      titleEn: "Blackout Dates & Cancellation Policy",
      titleVi: "Ngày Hạn chế Cao điểm & Chính sách Hủy phòng",
      vocabulary: [
        { word: "Blackout dates", phonetic: "/ˈblækaʊt deɪts/", definition: "Ngày hạn chế áp dụng giá/hợp đồng", context: "The contract rate does not apply during blackout dates like Tet holiday.", icon: "🚫" },
        { word: "Peak season", phonetic: "/piːk ˈsiːzən/", definition: "Mùa cao điểm", context: "Blackout dates usually fall during the peak season.", icon: "📈" },
        { word: "Cancellation policy", phonetic: "/ˌkænsəˈleɪʃən ˈpɒləsi/", definition: "Chính sách hủy phòng", context: "Please review our cancellation policy before confirming the booking.", icon: "📋" },
        { word: "Penalty fee", phonetic: "/ˈpɛnəlti fiː/", definition: "Phí phạt", context: "A penalty fee applies for cancellations made after the deadline.", icon: "⚠️" },
      ],
      grammar: [
        { rude: "You can't book on those dates.", polite: "We kindly request that you avoid booking during the listed blackout dates.", rule: "Use 'We kindly request that...' to make a formal restriction sound polite." },
        { rude: "You pay a fine if you cancel late.", polite: "I'm afraid a penalty fee will apply for cancellations made after the deadline.", rule: "Use 'I'm afraid...' to soften a negative or restrictive statement." },
      ],
      speaking: {
        guestPrompt: "What if our client needs to cancel a group booking close to Tet holiday?",
        targetResponse: "I'm afraid Tet falls within our blackout dates, and a penalty fee will apply for late cancellations.",
        helpTip: "Practice the soft, apologetic tone on 'I'm afraid' — drop your pitch slightly to sound sincere, not harsh.",
      },
      reading: {
        text: "CONTRACT CLAUSE 6 - BLACKOUT DATES & CANCELLATION:\nThe Contract Rate excludes the following Blackout Dates: 15 Jan - 05 Feb (Tet Holiday), 30 Apr - 03 May.\nCancellations made less than 14 days before arrival are subject to a penalty fee of one (1) night's rate.",
        questions: [
          { q: "Which holiday is listed as a blackout date?", options: ["A. Christmas", "B. Tet Holiday", "C. National Day"], correct: 1 },
          { q: "What is the penalty for cancelling less than 14 days before arrival?", options: ["A. No penalty", "B. One night's rate", "C. Full stay charge"], correct: 1 },
        ],
      },
      arcade: [
        { bad: "No booking on those days, sorry.", good: "We kindly request that bookings avoid the blackout dates listed in the contract." },
        { bad: "Too late, you pay fine.", good: "I'm afraid a penalty fee applies for cancellations made after the 14-day deadline." },
      ],
      game: {
        prompt: "What if our client needs to cancel a group booking close to Tet holiday?",
        options: [
          { text: "I'm afraid Tet falls within our blackout dates, and a penalty fee will apply for late cancellations.", correct: true },
          { text: "No booking on those days, sorry.", correct: false },
          { text: "That's not my problem, check the contract yourself.", correct: false },
        ],
      },
    },
    {
      lessonId: "BO_1_4",
      lessonOrder: 4,
      titleEn: "Handling Rate Pressure & Commission Disputes",
      titleVi: "Xử lý Ép giá & Tranh chấp Hoa hồng",
      vocabulary: [
        { word: "Commission rate", phonetic: "/kəˈmɪʃən reɪt/", definition: "Tỷ lệ hoa hồng", context: "Our standard commission rate for travel agents is 10 percent.", icon: "💵" },
        { word: "Undercut", phonetic: "/ˌʌndərˈkʌt/", definition: "Phá giá, chào giá thấp hơn", context: "Another hotel is trying to undercut our rate.", icon: "📉" },
        { word: "Renegotiate", phonetic: "/ˌriːnɪˈɡoʊʃieɪt/", definition: "Đàm phán lại", context: "We are open to renegotiate the terms next quarter.", icon: "🔄" },
        { word: "Long-term partnership", phonetic: "/lɔːŋ tɜːrm ˈpɑːrtnərʃɪp/", definition: "Quan hệ đối tác lâu dài", context: "We value this as a long-term partnership, not a one-time deal.", icon: "🤝" },
      ],
      grammar: [
        { rude: "No, we won't raise your commission.", polite: "I understand your concern, however, our current commission rate is already very competitive.", rule: "Use 'I understand your concern, however...' to acknowledge the partner's point before disagreeing." },
        { rude: "Take it or leave it.", polite: "What if we offered a slightly higher commission in exchange for a longer contract term?", rule: "Use 'What if we...' to propose a counter-offer instead of flatly rejecting a request." },
      ],
      speaking: {
        guestPrompt: "Another hotel is offering us 15% commission. Can you match that, or we'll move our business there?",
        targetResponse: "I understand your concern, however, what if we offered 12% commission in exchange for a longer, exclusive contract?",
        helpTip: "Keep your intonation calm and steady on 'however' — a rising, defensive tone can sound like an argument.",
      },
      reading: {
        text: "EMAIL FROM TRAVEL AGENT PARTNER:\nSubject: Commission Review Request\nHi team, we've received a better offer from a competitor hotel at 15% commission. We currently receive 10% with you. Please advise if you can match this, or we may need to shift our allocation next quarter.",
        questions: [
          { q: "What commission rate is the competitor hotel offering?", options: ["A. 10%", "B. 12%", "C. 15%"], correct: 2 },
          { q: "What does the partner say might happen if the rate is not matched?", options: ["A. They will end the partnership immediately", "B. They may shift allocation next quarter", "C. They will sue the hotel"], correct: 1 },
        ],
      },
      arcade: [
        { bad: "No, we won't raise your commission.", good: "I understand your concern, however, our rate already reflects strong added value." },
        { bad: "Go to the other hotel then.", good: "Let's discuss how we can strengthen this long-term partnership together." },
      ],
      game: {
        prompt: "Another hotel is offering us 15% commission. Can you match that, or we'll move our business there?",
        options: [
          { text: "I understand your concern, however, what if we offered 12% commission in exchange for a longer, exclusive contract?", correct: true },
          { text: "No, we won't raise your commission.", correct: false },
          { text: "Go to the other hotel then, we don't care.", correct: false },
        ],
      },
    },
  ],
};

// Registry — keyed by `${DEP}-${week}`.
const REGISTRY: Record<string, WeekContent> = {
  "FO-1": FO_WEEK_1,
  "FB-1": FB_WEEK_1,
  "HK-1": HK_WEEK_1,
  "SW-1": SW_WEEK_1,
  "GR-1": GR_WEEK_1,
  "BO-1": BO_WEEK_1,
};

export function getWeekContent(dep: string, week: string | number): WeekContent | null {
  const wk = typeof week === "string" ? parseInt(week, 10) : week;
  return REGISTRY[`${dep.toUpperCase()}-${wk}`] ?? null;
}
