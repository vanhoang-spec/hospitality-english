// SW week 36 — Emergencies in the spa: an urgent instruction is ONE action
// and ONE anchor the speaker owns ("Please rest here until the nurse comes";
// "The nurse is on her way") — never a number of minutes promised for the
// nurse, whose time is not the spa's to give. Hand-authored Phase 4, see
// ../kit.ts.
//
// Every emergency below follows the house order that week 33 taught for a
// burn: stop, call, stay. A guest who swells or is short of breath during a
// facial — the therapist stops, cleans the product off, presses the emergency
// button and stays; a colleague calls 115 FIRST and tells the Duty Manager
// after. Heat — the guest is walked out of the steam room to the cool area
// and the hotel nurse is called; nobody goes back into the heat before the
// nurse has seen them. Pool water that smells of chemicals, or lightning —
// everyone steps out of the water first, the pool is closed off, and nobody
// promises when it opens. A power cut — the therapist stays with the guest
// with a torch. Nobody diagnoses ("I am not sure"), nobody says "stay calm",
// "nobody has been hurt" or "there is no danger", and nobody promises a time
// for another team.
import type { AuthoredWeek } from "../kit";
import { cardsFor, lessonsFor, risk } from "../kit";
import { game, g, read, sp } from "../../phase0";

const c = cardsFor("SW");
const L = lessonsFor("SW");

// ── Lesson 1 — Stop, call, stay ────────────────────────────────────────
const t1a =
  "I can see the swelling, madam. I will stop now and clean the cream off with cool water.";
const t1b = "I am pressing the emergency button now, madam, and I will stay with you.";
const t1c = "I am not sure, madam, but the nurse is on her way.";

const lesson1 = L(36, 1, "Stop, Call, Stay", "Dừng lại, gọi người, ở lại với khách", {
  vocabulary: [
    c("Emergency button", "Every treatment room has an emergency button next to the bed.", [
      "/ɪˈmɜːdʒənsi ˌbʌtn/",
      "Nút gọi khẩn cấp (cạnh giường trị liệu)",
      "🔴",
    ]),
    c("Swelling", "Swelling on the lips can be a sign of a serious allergy.", [
      "/ˈswelɪŋ/",
      "Chỗ sưng, sự sưng phồng",
      "👄",
    ]),
    c("Short of breath", "A guest who is short of breath needs help straight away.", [
      "/ˌʃɔːt əv ˈbreθ/",
      "Khó thở, hụt hơi",
      "😮‍💨",
    ]),
    c("Ambulance", "If a guest cannot breathe well, we call 115 for an ambulance.", [
      "/ˈæmbjələns/",
      "Xe cấp cứu",
      "🚑",
    ]),
    c("Duty Manager", "The Duty Manager is in charge of the whole hotel tonight.", [
      "/ˈdjuːti ˌmænɪdʒə/",
      "Quản lý trực (phụ trách cả khách sạn trong ca)",
      "🧑‍💼",
    ]),
  ],
  grammar: [
    g(
      "I press button. Wait.",
      "I am pressing the emergency button now, madam.",
      "Việc đang làm ngay lúc nói dùng 'am + V-ing': 'I am pressing'. Người Việt hay bỏ 'am' ('I pressing…') vì tiếng Việt không có trợ động từ này.",
      "I pressing the emergency button now, madam.",
    ),
    g(
      "Nurse come. Wait.",
      "The nurse is on her way, madam.",
      "'is' không được bỏ: 'The nurse is on her way' = y tá đang trên đường tới. Người Việt hay bỏ 'is' vì tiếng Việt chỉ nói 'Y tá đang tới'. Không hứa một số phút thay y tá — giờ y tá tới không phải việc của spa.",
      "The nurse on her way, madam.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "My lips feel strange, and I think my face is swelling.",
        t1a,
        "Thấy sưng là dừng ngay: dừng liệu trình, rồi lau sạch kem bằng nước mát. Chưa giải thích, chưa đoán nguyên nhân.",
      ),
      alsoAccept: [
        "I can see the swelling, madam. I will stop now and wash the cream off with cool water.",
      ],
    },
    {
      ...sp(
        "It is getting hard to breathe.",
        t1b,
        "Một việc làm ngay — bấm nút khẩn cấp — và một lời hứa: bạn không rời khách.",
        undefined,
        undefined,
        t1a,
      ),
      alsoAccept: ["I am pressing the emergency button now, madam. I will stay with you."],
    },
    risk({
      ...sp(
        "Is it serious? When is the nurse coming?",
        t1c,
        "Không chẩn đoán, và không hứa số phút thay y tá. Trấn an bằng một điều có thật: y tá đang trên đường tới.",
        undefined,
        ["nurse"],
        t1b,
      ),
      alsoAccept: [
        "I cannot say, madam, but the nurse is on her way.",
        "I am not sure, madam. The nurse is on her way.",
        "I am not sure, madam, but the nurse is coming now.",
        "I am not sure, madam. The hotel nurse is coming now, and I will stay with you.",
        "I cannot say, madam, but the hotel nurse is on her way, and I will stay with you.",
      ],
    }),
    risk({
      ...sp(
        "I heard the emergency button. What do you need?",
        "Please call 115 for an ambulance now, and then tell the Duty Manager.",
        "Nói với đồng nghiệp — không dùng sir hay madam. Khách khó thở: gọi 115 TRƯỚC, báo Quản lý trực SAU. Bạn vẫn ở lại với khách.",
        "colleague",
        ["call", "ambulance", "tell", "duty", "manager"],
      ),
      alsoAccept: [
        "Please call 115 for an ambulance now. Then please tell the Duty Manager.",
        "Please call 115 for an ambulance now, and then tell the manager on duty.",
        "Please call 115 for an ambulance now. After that, please tell the Duty Manager.",
      ],
    }),
    {
      ...sp(
        "I can drive my wife to the hospital myself. It will be quicker.",
        "The ambulance is on its way, sir. Please wait here with her until it arrives.",
        "Không để khách tự chở người đang khó thở. Giao cho chồng khách một việc: ở lại với vợ cho tới khi xe cấp cứu tới.",
      ),
      alsoAccept: ["The ambulance is coming, sir. Please wait here with her until it arrives."],
    },
    {
      ...sp(
        "Please make sure nobody uses that cream on me again.",
        "Of course, madam. I will put it on file today, so nobody uses it on you again.",
        "Ghi vào hồ sơ của khách để lần sau không ai dùng lại — hứa một việc bạn làm được ngay hôm nay.",
      ),
      alsoAccept: [
        "Of course, madam. I will note it on file today, so nobody uses it on you again.",
      ],
    },
    sp(
      "What happened in room three this afternoon?",
      "The guest had swelling and was short of breath, so I stopped and pressed the emergency button.",
      "Báo cáo cho quản lý — không dùng sir hay madam: chuyện gì xảy ra, rồi bạn đã làm gì, đúng thứ tự.",
      "manager",
    ),
  ],
  reading: read(
    `Ms Laurent is having a facial on Tuesday afternoon. After ten minutes, she says her lips feel strange. Hien, her therapist, looks closely and sees swelling on her lips. She stops at once and cleans the cream off with cool water. Then Ms Laurent says it is getting hard to breathe. Hien presses the emergency button, which calls the spa desk and the hotel nurse. She tells Ms Laurent that she will stay with her. Her colleague, Tam, runs in. Hien asks Tam to call 115 for an ambulance, and then to tell the Duty Manager. Ms Laurent asks if it is serious. Hien does not guess. She says she is not sure, and that the nurse is on her way. The nurse arrives two minutes later, and the ambulance arrives soon after. Ms Laurent's husband wants to drive her to the hospital himself. Hien asks him to wait with his wife until the ambulance arrives. Later, Hien writes every detail in an incident report. She also puts the cream on Ms Laurent's file, so nobody uses it on her again.`,
    [
      {
        q: "Hiền làm gì ngay khi thấy môi khách sưng?",
        options: [
          "Hỏi khách đã từng bị dị ứng bao giờ chưa",
          "Dừng lại và lau sạch kem bằng nước mát",
          "Thoa một loại kem khác để làm dịu da",
        ],
        correct: 1,
        explanation:
          "'She stops at once and cleans the cream off with cool water' — thấy dấu hiệu lạ thì dừng trước, không hỏi han hay đoán bệnh.",
      },
      {
        q: "Hiền nhờ đồng nghiệp làm hai việc theo thứ tự nào?",
        options: [
          "Gọi 115 xin xe cấp cứu trước, rồi mới báo Quản lý trực",
          "Báo Quản lý trực trước, rồi chờ quyết định",
          "Gọi chồng khách trước, rồi gọi y tá",
        ],
        correct: 0,
        explanation:
          "'Hien asks Tam to call 115 for an ambulance, and then to tell the Duty Manager' — nguy hiểm trước, báo cáo sau.",
      },
      {
        q: "Vì sao Hiền mời chồng khách ở lại chờ cùng vợ?",
        options: [
          "Vì quản lý chưa cho phép khách rời spa",
          "Vì ông chưa ký phiếu sự cố",
          "Vì xe cấp cứu đang trên đường tới",
        ],
        correct: 2,
        explanation:
          "'Hien asks him to wait with his wife until the ambulance arrives' — khách đang khó thở đi xe cấp cứu, không đi xe riêng.",
      },
    ],
  ),
  game: [
    game(
      "My arms are itching badly, and red spots are coming up.",
      "I will stop the scrub now, madam, and wash it off with cool water.",
      "Please stay calm, madam. It is only a small reaction, and it will goes away in a few minutes.",
      "Please stay calm, madam. It is only a small reaction, and it will go away in a few minutes.",
      undefined,
      "Câu thứ hai sai dạng: sau 'will' là động từ nguyên mẫu 'go', không thêm -es. Cả câu thứ hai lẫn câu thứ ba đều bảo khách bình tĩnh và tự đoán 'chỉ là phản ứng nhẹ' — nhân viên không chẩn đoán, và da nổi mẩn có thể là dị ứng nặng. Câu đúng dừng ngay và rửa sạch sản phẩm bằng nước mát.",
    ),
    game(
      "The guest in room two has chest pain. Should I call the Duty Manager?",
      "Call 115 first, please, and then the Duty Manager. I will stay with her.",
      "Let us call the Duty Manager first and wait for her to decides about the ambulance.",
      "Let us call the Duty Manager first and wait for her to decide about the ambulance.",
      "colleague",
      "Câu thứ hai sai dạng: sau 'to' là động từ nguyên mẫu 'decide', không thêm -s. Cả câu thứ hai lẫn câu thứ ba đều đảo thứ tự: chờ quản lý quyết trong khi khách đang đau ngực. Nguy hiểm trước, báo cáo sau — gọi 115 trước, rồi mới báo Quản lý trực, và có người ở lại với khách.",
    ),
  ],
});

// ── Lesson 2 — Too much heat ───────────────────────────────────────────
const t2a = "Please walk out of the steam room with me, madam, and rest in the cool area.";
const t2b = "Of course, madam. Please sip this water slowly, and I am calling the hotel nurse now.";
const t2c = "Please rest here until the nurse comes, madam. She is on her way.";

const lesson2 = L(36, 2, "Too Much Heat", "Khi khách bị quá nóng", {
  vocabulary: [
    c("Light-headed", "If you feel light-headed in the sauna, please come out at once.", [
      "/ˌlaɪt ˈhedɪd/",
      "Choáng váng, lâng lâng",
      "😵‍💫",
    ]),
    c("Overheated", "An overheated guest needs a cool place and some water.", [
      "/ˌəʊvəˈhiːtɪd/",
      "Bị quá nóng (cơ thể)",
      "🥵",
    ]),
    c("Cool area", "The cool area is next to the steam room.", [
      "/ˈkuːl ˌeəriə/",
      "Khu vực mát (để khách nghỉ sau xông hơi)",
      "❄️",
    ]),
    c("Sip", "Please sip the water slowly.", ["/sɪp/", "Nhấp từng ngụm nhỏ", "🥤"]),
  ],
  grammar: [
    g(
      "You come out steam room.",
      "Please walk out of the steam room with me, sir.",
      "'out of + nơi chốn' cần cả hai chữ: 'out of the steam room'. Người Việt hay bỏ 'of' ('out the steam room') vì tiếng Việt chỉ nói 'ra khỏi'.",
      "Please walk out the steam room with me, sir.",
    ),
    g(
      "I stay here, nurse come.",
      "I will stay with you until the nurse comes, sir.",
      "Sau 'until' dùng thì hiện tại đơn dù nói về tương lai: 'until the nurse comes', không phải 'until the nurse will come'.",
      "I will stay with you until the nurse will come, sir.",
    ),
  ],
  speaking: [
    risk({
      ...sp(
        "I feel light-headed. I think the steam is too hot for me.",
        t2a,
        "Choáng váng trong phòng xông là chuyện an toàn: đưa khách RA khỏi chỗ nóng trước, rồi cho khách nghỉ ở khu vực mát ('cool area').",
        undefined,
        ["walk", "out", "steam", "room", "rest", "cool", "area"],
      ),
      alsoAccept: [
        "Please walk out of the steam room with me, madam, and sit in the cool area.",
        "Please come out of the steam room with me, madam, and rest in the cool area.",
        "Please come out of the steam room with me now, madam, and sit down in the cool area.",
      ],
    }),
    {
      ...sp(
        "Could I have some water, please?",
        t2b,
        "Nước mát, uống từng ngụm nhỏ ('sip'), rồi gọi y tá ngay — vẫn ở bên khách.",
        undefined,
        undefined,
        t2a,
      ),
      alsoAccept: [
        "Of course, madam. Please sip this water slowly. I am calling the hotel nurse now.",
      ],
    },
    {
      ...sp(
        "I feel better already. Can I go back into the steam room?",
        t2c,
        "Khách thấy đỡ vẫn chưa quay lại chỗ nóng. Một việc (nghỉ ở đây) và một mốc bạn giữ được: tới khi y tá đến. Không hứa số phút thay y tá.",
        undefined,
        undefined,
        t2b,
      ),
      alsoAccept: [
        "Please rest here until the nurse comes, madam. She is coming now.",
        "Please rest here until the nurse has seen you, madam. She is on her way.",
      ],
    },
    risk({
      ...sp(
        "Come quickly! My husband passed out in the sauna!",
        "I am coming with you now, madam, and my colleague is calling 115 and the hotel nurse.",
        "Khách ngất trong chỗ nóng là cấp cứu: đi ngay cùng khách, và nói rõ đồng nghiệp đang gọi 115 và y tá — không ai phải tự đi tìm người giúp.",
        undefined,
        ["colleague", "calling", "nurse"],
      ),
      alsoAccept: [
        "I am coming with you now, madam, and my colleague is calling the hotel nurse and 115.",
        "I am coming with you now, madam. My colleague is calling 115 and the hotel nurse.",
        "Please show me where he is, madam. My colleague is calling 115 and the hotel nurse now.",
      ],
    }),
    {
      ...sp(
        "A guest in the sauna says she is light-headed.",
        "If she is light-headed, please walk her out to the cool area. I am calling the nurse now.",
        "Nói với đồng nghiệp — không dùng sir hay madam. Giao một việc cụ thể cho đồng nghiệp, còn bạn gọi y tá.",
        "colleague",
      ),
      alsoAccept: [
        "Please walk her out to the cool area, and I am calling the nurse now.",
        "Please walk her to the cool area, and I will call the nurse now.",
      ],
    },
    sp(
      "Why is the steam room closed this afternoon?",
      "A guest was overheated, and the steam room was hotter than normal, so I closed it until engineering checks it.",
      "Báo cáo cho quản lý — không dùng sir hay madam: khách bị quá nóng, phòng xông nóng hơn bình thường, nên đóng lại chờ kỹ thuật kiểm tra.",
      "manager",
    ),
  ],
  reading: read(
    `On a busy Sunday, Mrs Park stays in the steam room for twenty minutes. When she stands up, she feels light-headed, and she holds the wall. Long, the steam room attendant, sees her through the glass door. He walks her out of the steam room at once and takes her to the cool area. He gives her a glass of cool water and asks her to sip it slowly. Then he calls the hotel nurse, and he stays with her. Mrs Park soon feels better, and she wants to go back into the steam room. Long says no, kindly. He asks her to rest until the nurse comes. The nurse arrives five minutes later and checks her. She says Mrs Park was overheated, and she gives her some aftercare advice. Later, Long checks the steam room. The heat is higher than normal, so he closes it until engineering checks it. Then he writes an incident report for his supervisor.`,
    [
      {
        q: "Việc đầu tiên Long làm khi thấy bà Park choáng váng là gì?",
        options: [
          "Gọi y tá rồi đứng chờ ở cửa phòng xông hơi",
          "Đưa bà ra khỏi phòng xông hơi ngay, tới nghỉ ở khu vực mát",
          "Hỏi bà đã ngồi trong phòng xông bao lâu rồi",
        ],
        correct: 1,
        explanation:
          "'He walks her out of the steam room at once and takes her to the cool area' — ra khỏi chỗ nóng trước tiên, rồi mới gọi y tá.",
      },
      {
        q: "Khi bà Park thấy đỡ và muốn quay lại phòng xông, Long làm gì?",
        options: [
          "Mời bà nghỉ cho tới khi y tá đến",
          "Cho bà vào lại nhưng ngồi ít phút hơn lúc trước",
          "Gọi quản lý ra để quyết định thay mình",
        ],
        correct: 0,
        explanation:
          "'He asks her to rest until the nurse comes' — khách thấy đỡ chưa có nghĩa là đã an toàn để quay lại chỗ nóng.",
      },
      {
        q: "Vì sao Long đóng phòng xông hơi?",
        options: [
          "Vì bà Park muốn khiếu nại về phòng xông",
          "Vì đã tới giờ đóng cửa buổi chiều",
          "Vì nhiệt cao hơn bình thường, phải chờ kỹ thuật kiểm tra",
        ],
        correct: 2,
        explanation:
          "'The heat is higher than normal, so he closes it until engineering checks it' — sự cố kỹ thuật thì đóng khu vực, chờ kỹ thuật, không tự sửa.",
      },
    ],
  ),
  game: [
    game(
      "I feel light-headed in this heat.",
      "Please walk out with me now, sir, and rest in the cool area.",
      "Just close your eyes for a few minutes, sir. The heat are very good for your muscles.",
      "Just close your eyes for a few minutes, sir. The heat is very good for your muscles.",
      undefined,
      "Câu thứ hai sai hoà hợp: 'The heat' không đếm được → 'is', không phải 'are'. Cả câu thứ hai lẫn câu thứ ba đều giữ khách ở lại trong nhiệt khi khách đã choáng — trái luật an toàn. Câu đúng đưa khách ra khỏi chỗ nóng và cho nghỉ ở khu vực mát.",
    ),
    game(
      "I feel fine now. Can I go back into the sauna?",
      "Not yet, madam. Please rest here until the nurse comes and checks you.",
      "Not yet, madam. Please rest here until the nurse come and check you.",
      "Of course, madam. Just stay for a shorter time than before, and drink some water.",
      undefined,
      "Câu thứ hai sai hoà hợp: 'the nurse' số ít → 'comes… checks', có -s. Câu thứ ba chiều khách và tự quyết thay y tá — khách vừa bị quá nóng không quay lại nhiệt trước khi y tá xem. Câu đúng giữ khách nghỉ và chờ y tá.",
    ),
  ],
});

// ── Lesson 3 — Something wrong with the pool water ─────────────────────
const t3a = "Thank you, madam. Please step out of the pool now, and we will check the water.";
const t3b = "Please rinse your eyes with fresh water, madam, and the nurse is on her way.";
const t3c =
  "I am sorry, madam. We will close off the pool until the water test is clear, and I will call your room by four.";

const lesson3 = L(36, 3, "Something Wrong With the Water", "Khi nước hồ bơi có vấn đề", {
  vocabulary: [
    c("Chemical smell", "A strong chemical smell at the pool means we check the water at once.", [
      "/ˌkemɪkl ˈsmel/",
      "Mùi hoá chất",
      "🧪",
    ]),
    c("Rinse", "Please rinse your eyes with fresh water.", [
      "/rɪns/",
      "Rửa sạch, tráng lại bằng nước",
      "🚿",
    ]),
    c("Water test", "Engineering does a water test before the pool opens again.", [
      "/ˈwɔːtə test/",
      "Kiểm tra mẫu nước (hồ bơi)",
      "🧫",
    ]),
    c("Close off", "We close off the pool with a rope until it is safe to swim.", [
      "/ˌkləʊz ˈɒf/",
      "Rào lại, không cho vào (một khu vực)",
      "🚧",
    ]),
    c("Chlorine", "Engineering checks the chlorine in the pool water every morning.", [
      "/ˈklɔːriːn/",
      "Clo (hoá chất khử trùng nước hồ bơi)",
      "🧴",
    ]),
  ],
  grammar: [
    g(
      "Water smell chemical.",
      "The pool water smells of chemicals today, madam.",
      "'smell of + danh từ' = có mùi gì. Thiếu 'of' ('smells chemicals') thì câu thành 'nước đi ngửi hoá chất'.",
      "The pool water smells chemicals today, madam.",
    ),
    g(
      "Pool close. Test first.",
      "The pool is closed off until the water test is clear, sir.",
      "Bị động: 'is closed off' (hồ bị rào lại) — cần 'is'. Người Việt hay bỏ 'is' ('The pool closed off…'), nghe như hồ tự đóng từ hôm qua.",
      "The pool closed off until the water test is clear, sir.",
    ),
  ],
  speaking: [
    risk({
      ...sp(
        "The water smells very strongly of chemicals today.",
        t3a,
        "Nước có mùi lạ: mời khách lên bờ TRƯỚC, kiểm tra nước SAU. Không giải thích, không trấn an kiểu 'không sao đâu'.",
        undefined,
        ["step", "out", "pool", "check", "water"],
      ),
      alsoAccept: [
        "Thank you for telling me, madam. Please step out of the pool now, and we will check the water.",
        "Thank you, madam. Please step out of the pool now while we check the water.",
        "Thank you for telling me, madam. Please get out of the pool now, and we will check the water.",
      ],
    }),
    {
      ...sp(
        "My eyes are a bit red and itchy.",
        t3b,
        "Một việc khách tự làm ngay (rửa mắt bằng nước sạch), và nói thật: y tá đang trên đường tới — không hứa số phút thay y tá.",
        undefined,
        undefined,
        t3a,
      ),
      alsoAccept: [
        "Please rinse your eyes with fresh water, madam. The nurse is on her way.",
        "Please rinse your eyes with fresh water, madam, and the nurse is coming now.",
      ],
    },
    {
      ...sp(
        "Can my children swim again this afternoon?",
        t3c,
        "Không hứa giờ mở hồ thay bộ phận kỹ thuật. Nói hồ đóng tới khi kết quả kiểm tra đạt, và hứa việc của bạn: gọi lại trước bốn giờ.",
        undefined,
        undefined,
        t3b,
      ),
      alsoAccept: [
        "I am sorry, madam. The pool is closed off until the water test is clear, and I will call your room by four.",
      ],
    },
    sp(
      "There is a chemical smell at the pool. What should I do?",
      "Please ask everyone to step out of the water and close off the pool. I am calling engineering now.",
      "Nói với đồng nghiệp — không dùng sir hay madam. Hai việc cho đồng nghiệp, một việc của bạn.",
      "colleague",
    ),
    sp(
      "Is the water all right for my baby now?",
      "I cannot say, madam. Please wait until the water test is clear, and I will tell you straight away.",
      "Không tự kết luận nước an toàn. Mời khách chờ kết quả kiểm tra, và hứa báo ngay khi có.",
    ),
    risk({
      ...sp(
        "Quick! A swimmer is in trouble in the deep end!",
        "I am calling the lifeguard now, sir, and I will stay at the pool.",
        "Người bơi gặp nạn: hành động trước, không cảm ơn, không hỏi lại. Gọi cứu hộ ('lifeguard') NGAY, và bạn ở lại bên hồ. Không tự nhảy xuống khi bạn không phải cứu hộ.",
        undefined,
        ["calling", "lifeguard", "stay", "pool"],
      ),
      alsoAccept: [
        "I am calling the lifeguard right now, sir, and I will stay at the pool.",
        "I will call the lifeguard now, sir, and I will stay at the pool.",
        "I will call the lifeguard now and stay at the pool, sir.",
      ],
    }),
    sp(
      "Engineering found too much chlorine in the water. When can we open again?",
      "With too much chlorine, the pool stays closed off until the next water test is clear.",
      "Nói với đồng nghiệp — không dùng sir hay madam. Giờ mở hồ phụ thuộc kết quả kiểm tra, không phụ thuộc lịch của ai.",
      "colleague",
    ),
    sp(
      "Why is the indoor pool closed this morning?",
      "A guest noticed a chemical smell, so I closed off the pool and called engineering for a water test.",
      "Báo cáo cho quản lý: khách phát hiện gì, bạn đã làm gì — không dùng sir hay madam.",
      "manager",
    ),
  ],
  reading: read(
    `At ten in the morning, Mrs Ruiz swims in the indoor pool with her two children. After a few minutes, she notices a strong chemical smell. She tells Phuc, the pool attendant. Phuc thanks her and asks everyone to step out of the water. Then he closes off the pool with a rope and calls engineering. One of the children has red, itchy eyes. Phuc asks him to rinse his eyes with fresh water, and he calls the hotel nurse. The nurse comes in five minutes and checks the boy's eyes. Mrs Ruiz asks if the children can swim again in the afternoon. Phuc does not guess. He explains that the pool stays closed until the water test is clear, and he promises to call her room by four. After lunch, engineering finds too much chlorine in the water and fixes the problem. The water test is clear at half past three. Phuc calls Mrs Ruiz, and the children are back in the pool before four.`,
    [
      {
        q: "Phúc làm gì đầu tiên khi bà Ruiz báo có mùi hoá chất?",
        options: [
          "Mời mọi người lên khỏi hồ",
          "Tự đo nước bằng máy kiểm tra của mình",
          "Xin lỗi và tặng khách một vé bơi khác",
        ],
        correct: 0,
        explanation:
          "'Phuc thanks her and asks everyone to step out of the water' — người lên bờ trước, rồi mới rào hồ và gọi kỹ thuật.",
      },
      {
        q: "Vì sao Phúc không hứa trẻ em được bơi lại vào buổi chiều?",
        options: [
          "Vì quản lý cấm trẻ em vào hồ bơi trong nhà",
          "Vì hồ đóng tới khi kiểm tra nước đạt",
          "Vì bé trai vẫn còn bị đỏ mắt",
        ],
        correct: 1,
        explanation:
          "'the pool stays closed until the water test is clear' — giờ mở hồ phụ thuộc kết quả kiểm tra của kỹ thuật, nên Phúc chỉ hứa việc của mình: gọi lại trước bốn giờ.",
      },
      {
        q: "Cuối cùng chuyện gì xảy ra?",
        options: [
          "Hồ trong nhà đóng cửa suốt cả ngày hôm đó",
          "Bà Ruiz đưa các con sang hồ bơi ngoài trời",
          "Kiểm tra nước đạt lúc ba giờ rưỡi, trẻ em bơi lại trước bốn giờ",
        ],
        correct: 2,
        explanation:
          "'The water test is clear at half past three. Phuc calls Mrs Ruiz, and the children are back in the pool before four.'",
      },
    ],
  ),
  game: [
    game(
      "There is a broken glass at the bottom of the pool.",
      "Thank you for telling me, sir. I will ask everyone to step out, and we will close off the pool.",
      "Thank you, sir. Our cleaner will takes it out later, so please just swim around it.",
      "Thank you, sir. Our cleaner will take it out later, so please just swim around it.",
      undefined,
      "Câu thứ hai sai dạng: sau 'will' là động từ nguyên mẫu 'take', không thêm -s. Cả câu thứ hai lẫn câu thứ ba đều để khách tiếp tục bơi cạnh mảnh thuỷ tinh vỡ — người phải lên bờ trước, rồi mới xử lý hồ. Câu đúng cảm ơn khách, mời mọi người lên bờ và rào hồ lại.",
    ),
    game(
      "Engineering says the water test is not clear yet. Can we open the pool?",
      "Not yet. The pool stays closed off until the test is clear.",
      "Not yet. The pool stay closed off until the test is clear.",
      "Let us open it for adults only. The children can wait until tomorrow.",
      "colleague",
      "Câu thứ hai sai hoà hợp: 'The pool' số ít → 'stays'. Câu thứ ba tự đặt ra một ngoại lệ khi nước chưa đạt kiểm tra — người lớn cũng không an toàn hơn trẻ em. Câu đúng giữ hồ đóng tới khi kết quả đạt.",
    ),
  ],
});

// ── Lesson 4 — Storms and power cuts ───────────────────────────────────
const t4a = "There is a power cut, madam. Please stay on the bed, and I will switch on my torch.";
const t4b = "I am not sure, madam. Engineering is checking it now, and I will stay here with you.";
const t4c = "I will put a warm blanket over you now, madam, and the torch will stay on.";

const lesson4 = L(36, 4, "Storms and Power Cuts", "Giông bão và mất điện", {
  vocabulary: [
    c("Thunderstorm", "The outdoor pool closes during a thunderstorm.", [
      "/ˈθʌndəstɔːm/",
      "Giông bão (có sấm sét)",
      "⛈️",
    ]),
    c("Lightning", "When there is lightning, everyone leaves the outdoor pool.", [
      "/ˈlaɪtnɪŋ/",
      "Sét, tia chớp",
      "⚡",
    ]),
    c("Power cut", "During a power cut, every therapist stays with the guest.", [
      "/ˈpaʊə kʌt/",
      "Mất điện, cúp điện",
      "🔌",
    ]),
    c("Torch", "Every treatment room has a small torch in the drawer.", [
      "/tɔːtʃ/",
      "Đèn pin",
      "🔦",
    ]),
  ],
  grammar: [
    g(
      "Have lightning. Pool close.",
      "There is lightning near the hotel, sir, so the outdoor pool is closed.",
      "Báo có một hiện tượng: 'There is…'. 'Have lightning' là lỗi dịch thẳng 'Có sét' — 'have' cần một chủ ngữ là người hay vật sở hữu.",
      "Have lightning near the hotel, sir, so the outdoor pool is closed.",
    ),
    g(
      "I open the light.",
      "I will switch on my torch now, madam.",
      "Bật đèn, bật đèn pin là 'switch on' (hoặc 'turn on'), không phải 'open' — lỗi dịch thẳng 'mở đèn'.",
      "I will open my torch now, madam.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "Oh! All the lights have gone off.",
        t4a,
        "Nói ngắn điều đang xảy ra (mất điện), rồi một việc cho khách (nằm yên trên giường) và một việc của bạn (bật đèn pin).",
      ),
      alsoAccept: [
        "There is a power cut, madam. Please stay on the bed, and I will turn on my torch.",
      ],
    },
    {
      ...sp(
        "How long will it take to come back?",
        t4b,
        "Giờ có điện là việc của bộ phận kỹ thuật: không hứa thay họ. Nói điều bạn biết, và việc bạn làm — ở lại với khách.",
        undefined,
        undefined,
        t4a,
      ),
      alsoAccept: [
        "I am not sure, madam. Engineering is checking it now, and I will stay with you.",
      ],
    },
    {
      ...sp(
        "It is very dark, and I am getting cold.",
        t4c,
        "Một việc làm ngay cho khách đỡ lạnh (đắp chăn ấm), và đèn pin vẫn bật.",
        undefined,
        undefined,
        t4b,
      ),
      alsoAccept: [
        "I will put a warm blanket over you now, madam, and the torch will stay on here.",
      ],
    },
    risk({
      ...sp(
        "It is only light rain. Can I keep swimming?",
        "I am sorry, sir. There is lightning, so please step out of the pool now.",
        "Có sét là lên bờ, dù mưa nhỏ. Nói lý do bằng một chữ ('lightning') rồi một việc khách phải làm ngay.",
        undefined,
        ["lightning", "step", "out", "pool"],
      ),
      alsoAccept: [
        "I am sorry, sir. There is lightning near the hotel, so please step out of the pool now.",
        "I am sorry, sir. There is lightning, so please step out of the pool straight away.",
        "I am sorry, sir. There is lightning, so please get out of the pool now.",
        "I'm sorry, sir, there is lightning. Please get out of the pool now.",
      ],
    }),
    sp(
      "Where can we wait until the storm is over?",
      "Please wait in the relaxing area, madam. The outdoor pool is closed until the thunderstorm passes; however, the gym is open.",
      "Cho khách một chỗ chờ, nói hồ ngoài trời đóng tới khi hết giông, rồi '; however,' đưa một lựa chọn có thật.",
    ),
    sp(
      "There is a power cut in all the treatment rooms. What should we do?",
      "Please stay with the guest in your room and keep your torch on. Engineering is checking it now.",
      "Nói với đồng nghiệp — không dùng sir hay madam. Không để khách nào một mình trong bóng tối.",
      "colleague",
    ),
    sp(
      "Why did you close the outdoor pool this afternoon?",
      "There was lightning near the hotel, so I asked everyone to step out and closed off the pool.",
      "Báo cáo cho quản lý bằng thì quá khứ: lý do, rồi việc bạn đã làm.",
      "manager",
    ),
  ],
  reading: read(
    `On Thursday afternoon, a thunderstorm comes over the hotel. There is lightning over the sea, and the rain starts. Bao, the pool attendant, asks everyone to step out of the outdoor pool. One guest says it is only light rain and he wants to finish his swim. Bao says he is sorry, but there is lightning, so the guest must step out now. Bao closes off the outdoor pool and shows the guests to the relaxing area. He also tells them that the gym is open. Twenty minutes later, there is a power cut in the spa. In treatment room two, Nga is giving Mrs Weiss a massage. Nga does not leave the room. She switches on her torch and asks Mrs Weiss to stay on the bed. Mrs Weiss asks when the power will come back. Nga says she is not sure, but engineering is checking it. She puts a warm blanket over Mrs Weiss. The lights come back on after a quarter of an hour.`,
    [
      {
        q: "Vì sao Bảo mời khách lên khỏi hồ ngoài trời dù trời chỉ mưa nhỏ?",
        options: ["Vì có sét", "Vì nước hồ có mùi hoá chất", "Vì sắp tới giờ đóng cửa hồ bơi"],
        correct: 0,
        explanation:
          "'there is lightning, so the guest must step out now' — có sét là lên bờ, mưa to hay nhỏ không quan trọng.",
      },
      {
        q: "Khi mất điện, Nga làm gì?",
        options: [
          "Ra quầy lễ tân hỏi bao giờ có điện lại",
          "Đưa bà Weiss ra ngoài chờ",
          "Ở lại trong phòng và bật đèn pin",
        ],
        correct: 2,
        explanation:
          "'Nga does not leave the room. She switches on her torch' — không để khách một mình trong bóng tối.",
      },
      {
        q: "Nga trả lời thế nào khi khách hỏi bao giờ có điện?",
        options: [
          "Hứa chắc chắn chỉ năm phút nữa là có điện lại",
          "Nói chưa chắc, kỹ thuật đang kiểm tra",
          "Mời khách thay đồ và đặt lại liệu trình hôm khác",
        ],
        correct: 1,
        explanation:
          "'Nga says she is not sure, but engineering is checking it' — không hứa giờ thay bộ phận khác.",
      },
    ],
  ),
  game: [
    game(
      "Oh no, the lights have gone off!",
      "There is a power cut, madam. I will switch on my torch now.",
      "There is a power cut, madam. I will open my torch now.",
      "Do not worry, madam. The power will be back in two minutes, I promise you.",
      undefined,
      "Câu thứ hai dịch thẳng 'mở đèn': bật đèn pin là 'switch on'. Câu thứ ba hứa giờ thay bộ phận kỹ thuật — bạn không biết bao giờ có điện. Câu đúng nói điều đang xảy ra và một việc bạn làm ngay.",
    ),
    game(
      "I can hear thunder, but my son wants to stay in the pool a little longer.",
      "I am sorry, madam. During a thunderstorm, everyone must come out of the pool now.",
      "I am sorry, madam. During thunderstorm, everyone must come out of the pool now.",
      "Of course, madam. He can stay near the steps, so he can get out quickly.",
      undefined,
      "Câu thứ hai thiếu mạo từ: 'During a thunderstorm'. Câu thứ ba chiều khách và để trẻ ở dưới nước khi có giông. Câu đúng mời mọi người lên bờ ngay và nói lý do.",
    ),
  ],
});

export const week: AuthoredWeek = {
  title: { en: "Emergencies in the Spa", vi: "Sự cố khẩn cấp ở spa" },
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: xử lý sự cố khẩn cấp ở spa bằng hướng dẫn ngắn 'một việc + một mốc' ('Please rest here until the nurse comes') — dừng liệu trình khi khách sưng hay khó thở, bấm nút khẩn cấp, nhờ đồng nghiệp gọi 115 trước rồi mới báo Quản lý trực, ở lại với khách; khách ngất trong chỗ nóng thì gọi 115 và y tá; đưa khách choáng váng ra khu vực mát; mời khách lên bờ khi nước có mùi hoá chất hay khi có sét, gọi cứu hộ khi có người bơi gặp nạn; ở lại bên khách khi mất điện — không chẩn đoán, không bảo khách 'bình tĩnh', không hứa số phút thay y tá hay bộ phận khác ('The nurse is on her way').",
};
