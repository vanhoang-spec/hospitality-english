// SW week 39 — Rehearsal week with two NEW rules (curriculum matrix, the
// week 39 note). Hand-authored Phase 4, see ../kit.ts.
//
// Rule 1, priorities: when several things arrive at once, "danger first" is
// something you DO — call 115 and the hotel nurse, keep someone with the
// guest, and only then the Duty Manager; the guests who are waiting get one
// sentence and one time ("I will be with you in five minutes"), and the phone
// waits. Nobody tells the waiting guests what happened to the other guest.
// Rule 2, the last fifteen minutes of a shift: no new job is started. It is
// written in the handover note and handed over BY NAME to someone on the next
// shift, with the time the guest was promised — and danger is the one thing
// that never waits for the next shift. Lessons 3 and 4 rehearse the phase
// across a morning at the desk and an evening in the treatment rooms, with
// the same rules weeks 31-38 taught: a voucher is checked, a bill is corrected
// by the supervisor, a room number is never given, a burn is cooled and the
// nurse called, no sauna after alcohol, a mother-to-be is kept out of the heat
// and the manager is told. A guest with chest pain does not walk anywhere:
// 115 and an ambulance first, the Duty Manager after.
import type { AuthoredWeek } from "../kit";
import { cardsFor, lessonsFor, risk } from "../kit";
import { game, g, read, sp } from "../../phase0";

const c = cardsFor("SW");
const L = lessonsFor("SW");

// ── Lesson 1 — Danger first ────────────────────────────────────────────
const t1a =
  "I am sorry, madam. There is an urgent problem in the spa, and I will be with you in five minutes.";
const t1b =
  "I am sorry for the wait, madam. In the meantime, please have some herbal tea in the relaxing area.";
const t1c = "I cannot say more, madam, but the nurse is on her way. Thank you for waiting.";

const lesson1 = L(39, 1, "Danger First", "Nguy hiểm trước — thứ tự ưu tiên", {
  vocabulary: [
    c("Priority", "A guest's safety is always our first priority.", [
      "/praɪˈɒrəti/",
      "Việc được ưu tiên; thứ tự ưu tiên",
      "🔝",
    ]),
    c("Urgent", "A fall in the steam room is urgent; a new booking can wait.", [
      "/ˈɜːdʒənt/",
      "Khẩn cấp, gấp",
      "🚨",
    ]),
    c("Danger first", "Danger first: we help the guest before we answer the phone.", [
      "/ˈdeɪndʒə ˌfɜːst/",
      "Nguy hiểm trước — an toàn của con người là việc đầu tiên",
      "⚠️",
    ]),
    c("In the meantime", "The nurse is coming; in the meantime, please stay with the guest.", [
      "/ɪn ðə ˈmiːntaɪm/",
      "Trong lúc chờ đợi",
      "⏳",
    ]),
    c("Emergency services", "Danger first: we call the emergency services before anyone else.", [
      "/ɪˈmɜːdʒənsi ˌsɜːvɪsɪz/",
      "Dịch vụ cấp cứu khẩn cấp (như 115)",
      "🆘",
    ]),
  ],
  grammar: [
    g(
      "Booking later. Guest now.",
      "The booking can wait, but the guest in the steam room cannot.",
      "'can wait' = để sau được. Sau 'can' là động từ nguyên mẫu, không thêm -s. Phủ định viết liền: 'cannot'.",
      "The booking can waits, but the guest in the steam room cannot.",
    ),
    g(
      "Wait five minutes. Drink tea.",
      "I will be with you in five minutes, madam. In the meantime, please have some tea.",
      "'In the meantime' (trong lúc chờ) đứng đầu câu, rồi dấu phẩy. Không bỏ 'the': 'In meantime' là sai — người Việt hay bỏ mạo từ vì tiếng Việt không có.",
      "I will be with you in five minutes, madam. In meantime, please have some tea.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "Excuse me, we have a massage booked at three. Can you check us in?",
        t1a,
        "Khách đang chờ nhận MỘT câu và MỘT mốc giờ: có việc khẩn ('urgent'), năm phút nữa bạn quay lại. Không kể chuyện của khách khác.",
      ),
      alsoAccept: [
        "I am very sorry, madam. There is an urgent problem in the spa, and I will be with you in five minutes.",
      ],
    },
    {
      ...sp(
        "Five minutes? But our massage starts at three.",
        t1b,
        "Xin lỗi vì phải chờ, rồi cho khách một việc để làm trong lúc chờ ('In the meantime').",
        undefined,
        undefined,
        t1a,
      ),
      alsoAccept: [
        "I am sorry for the wait, madam. In the meantime, please enjoy some herbal tea in the relaxing area.",
      ],
    },
    {
      ...sp(
        "Is everything all right in there?",
        t1c,
        "Chuyện sức khoẻ của khách khác là riêng tư: không kể, không đoán. Một sự thật ngắn (y tá đang tới), rồi cảm ơn khách đã chờ.",
        undefined,
        undefined,
        t1b,
      ),
      alsoAccept: [
        "I cannot say more, madam, but the nurse is on her way. Thank you for your patience.",
      ],
    },
    risk({
      ...sp(
        "Help! A man has fallen in the steam room, and he is not moving!",
        "Please show me where he is, sir. My colleague is calling 115 and the hotel nurse now.",
        "Nguy hiểm trước nghĩa là LÀM: đi ngay tới chỗ khách, và 115 cùng y tá được gọi NGAY lúc này — không phải sau khi nghe máy hay làm thủ tục.",
        undefined,
        ["show", "colleague", "calling", "hotel", "nurse"],
      ),
      alsoAccept: [
        "Please show me where he is, sir. My colleague is calling 115 and the hotel nurse right now.",
        "Please show me where he is, sir. My colleague is calling the hotel nurse and 115 now.",
      ],
    }),
    risk({
      ...sp(
        "I am with the man on the floor. What should I do?",
        "Please switch off the steam, open the door and stay with him. Do not move him. The nurse is on her way.",
        "Nói với đồng nghiệp — không dùng sir hay madam. Người nằm trong phòng xông: tắt hơi nóng, mở cửa, ở lại với khách; khách bị ngã thì không di chuyển. Y tá đang tới — không hứa số phút.",
        "colleague",
        ["off", "steam", "open", "door", "stay"],
      ),
      alsoAccept: [
        "Please switch off the steam and open the door, and stay with him. Do not move him. The nurse is on her way.",
        "Please turn off the steam, open the door and stay with him. Do not move him. The nurse is coming now.",
        "Please switch off the steam, open the door and stay with him, but do not move him. The nurse is on her way.",
      ],
    }),
    {
      ...sp(
        "The phone is ringing, and two guests are waiting at the desk. Which first?",
        "Danger first: the guest in the steam room is our priority. The phone can wait.",
        "Nói với đồng nghiệp — không dùng sir hay madam. Xếp thứ tự bằng một câu: nguy hiểm trước, điện thoại để sau.",
        "colleague",
      ),
      alsoAccept: [
        "Danger first: the guest in the steam room is our priority, and the phone can wait.",
      ],
    },
    sp(
      "Tell me what happened, in order.",
      "A guest fell in the steam room. We called the emergency services and the nurse first, and then I called you.",
      "Báo cáo cho Quản lý trực đúng thứ tự đã làm — không dùng sir hay madam: 115 và y tá trước, quản lý sau.",
      "manager",
    ),
    risk({
      ...sp(
        "My chest feels very tight. I think I will just walk back to my room.",
        "Please sit down and stay here, sir. My colleague is calling 115 for an ambulance, and I will stay with you.",
        "Đau ngực là cấp cứu: không để khách tự đi về phòng. Mời khách ngồi yên tại chỗ, nói rõ đồng nghiệp đang gọi 115 xin xe cấp cứu, và bạn ở lại với khách.",
        undefined,
        ["stay", "ambulance"],
      ),
      alsoAccept: [
        "Please sit down and stay here, sir. My colleague is calling 115 for an ambulance now, and I will stay with you.",
        "Please do not walk, sir. Sit down and stay here, and my colleague is calling 115 for an ambulance.",
        "Please sit down here, sir, and do not walk to your room. My colleague is calling 115 for an ambulance.",
      ],
    }),
    risk({
      ...sp(
        "A guest in the gym has chest pain and is short of breath. Shall I call the Duty Manager first?",
        "No. He is short of breath, so call 115 for an ambulance first, and then the Duty Manager.",
        "Nói với đồng nghiệp — không dùng sir hay madam. Đau ngực: 115 xin xe cấp cứu TRƯỚC, Quản lý trực SAU — đúng luật 'nguy hiểm trước'.",
        "colleague",
        ["ambulance", "first", "duty", "manager"],
      ),
      alsoAccept: [
        "No. Please call 115 for an ambulance first, and then tell the Duty Manager.",
        "Call 115 for an ambulance first, please, and then the Duty Manager.",
        "No. Call 115 for an ambulance first, and then the manager on duty.",
      ],
    }),
  ],
  reading: read(
    `It is five to three on Saturday, and the spa desk is busy. The phone is ringing, and a couple are waiting to check in for their massage at three. Then a guest runs in. A man has fallen in the steam room, and he is not moving. Hanh, the receptionist, knows the rule: danger first. She asks Son to call 115 and the hotel nurse, and she goes with the guest to the steam room. She asks the pool attendant to switch off the steam, open the door and stay with the man without moving him. Then she calls the Duty Manager. On her way back, she speaks to the couple. She says there is an urgent problem, and she will be with them in five minutes. In the meantime, she offers them herbal tea in the relaxing area. The wife asks if everything is all right. Hanh does not talk about the other guest. She only says that the nurse is on her way. The phone stops ringing, and Hanh calls the number back at a quarter past three.`,
    [
      {
        q: "Việc đầu tiên Hạnh làm khi nghe tin có người ngã là gì?",
        options: [
          "Nghe điện thoại đang đổ chuông",
          "Nhờ đồng nghiệp gọi 115 và y tá, rồi đi ngay tới chỗ khách bị ngã",
          "Làm thủ tục nhanh cho cặp khách đang chờ",
        ],
        correct: 1,
        explanation:
          "'She asks Son to call 115 and the hotel nurse, and she goes with the guest to the steam room' — nguy hiểm trước nghĩa là hành động ngay.",
      },
      {
        q: "Hạnh nói gì với cặp khách đang chờ?",
        options: [
          "Một lời xin lỗi và một mốc năm phút",
          "Kể chi tiết chuyện xảy ra trong phòng xông hơi",
          "Mời họ quay lại vào một ngày khác",
        ],
        correct: 0,
        explanation:
          "'She says there is an urgent problem, and she will be with them in five minutes' — một câu, một mốc giờ, không kể chuyện của khách khác.",
      },
      {
        q: "Hạnh gọi Quản lý trực khi nào?",
        options: [
          "Trước khi bất kỳ ai gọi 115 hay y tá",
          "Chỉ khi khách muốn khiếu nại về sự cố",
          "Sau khi đã gọi 115 và y tá",
        ],
        correct: 2,
        explanation:
          "'She asks Son to call 115 and the hotel nurse… Then she calls the Duty Manager' — nguy hiểm trước, quản lý sau.",
      },
    ],
  ),
  game: [
    game(
      "The phone is ringing, and a guest has fallen by the pool. Which first?",
      "The guest by the pool first. The phone can wait.",
      "Answer the phone first, because it might is a booking for tonight.",
      "Answer the phone first, because it might be a booking for tonight.",
      "colleague",
      "Câu thứ hai sai dạng: sau 'might' là động từ nguyên mẫu 'be'. Cả câu thứ hai lẫn câu thứ ba đều đặt một cuộc gọi có thể là đặt lịch lên trên một người bị ngã. Câu đúng: nguy hiểm trước, điện thoại sau.",
    ),
    game(
      "Our facial was at four, and we are still waiting. What is happening?",
      "I am very sorry, sir. We have an urgent situation, and your therapist will be with you in ten minutes.",
      "I am very sorry, sir. We have an urgent situation, and your therapist will being with you in ten minutes.",
      "A guest collapsed in the steam room, sir, and we think it is his heart.",
      undefined,
      "Câu thứ hai sai dạng: sau 'will' là động từ nguyên mẫu 'be', không phải 'being'. Câu thứ ba kể chuyện sức khoẻ của một khách khác và còn đoán bệnh. Câu đúng: một câu xin lỗi, một mốc giờ.",
    ),
  ],
});

// ── Lesson 2 — The last fifteen minutes of a shift ─────────────────────
const t2a =
  "Of course, madam. Let me write down your details, and my colleague Mai, who starts at three, will plan the group booking with you.";
const t2b = "Yes, madam. I will hand it over to Mai by name, and she will call your room by four.";
const t2c =
  "My shift ends in ten minutes, madam, and a group plan needs time, so Mai can give it her full attention.";

const lesson2 = L(39, 2, "The Last Fifteen Minutes", "Mười lăm phút cuối ca", {
  vocabulary: [
    c(
      "End of shift",
      "In the last fifteen minutes before the end of shift, we do not start a new job.",
      ["/ˌend əv ˈʃɪft/", "Cuối ca làm việc", "🕒"],
    ),
    c("Handover note", "Every open request goes in the handover note.", [
      "/ˈhændəʊvə nəʊt/",
      "Ghi chú bàn giao ca",
      "📓",
    ]),
    c("Next shift", "The next shift starts at three o'clock.", [
      "/ˌnekst ˈʃɪft/",
      "Ca sau, ca kế tiếp",
      "🔄",
    ]),
    c("By name", "We hand over every request by name, never to 'someone'.", [
      "/baɪ ˈneɪm/",
      "Đích danh (nêu rõ tên người nhận việc)",
      "🏷️",
    ]),
    c("Open request", "An open request is a guest's request that nobody has finished yet.", [
      "/ˌəʊpən rɪˈkwest/",
      "Yêu cầu còn dở, chưa ai xử lý xong",
      "📂",
    ]),
  ],
  grammar: [
    g(
      "Mai, she start three, she call you.",
      "My colleague Mai, who starts at three, will call you by four.",
      "Thêm thông tin về một người bằng ', who…,' chen giữa câu. 'who' thay cho Mai (một người), nên động từ vẫn thêm -s: 'who starts'.",
      "My colleague Mai, who start at three, will call you by four.",
    ),
    g(
      "Your request, I give Mai.",
      "Your request will be handed over to Mai by name, madam.",
      "Bị động tương lai: 'will be + phân từ hai' — 'handed', có -ed. Người Việt hay giữ nguyên 'hand' sau 'will be'.",
      "Your request will be hand over to Mai by name, madam.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "Hello. I would like to plan a spa day for six friends next week.",
        t2a,
        "Mười lăm phút cuối ca: không tự mở việc mới. Ghi lại thông tin, rồi nói rõ ĐÍCH DANH người ca sau sẽ làm cùng khách.",
      ),
      alsoAccept: [
        "Of course, madam. I will write down your details, and my colleague Mai, who starts at three, will plan the group booking with you.",
        "Of course, madam. Let me write down your details, and my colleague Mai, who starts at three, will plan it with you.",
      ],
    },
    {
      ...sp(
        "Can she call me today?",
        t2b,
        "Bàn giao đích danh ('by name'), và một mốc giờ khách được hứa — mốc đó đi cùng ghi chú bàn giao.",
        undefined,
        undefined,
        t2a,
      ),
      alsoAccept: [
        "Yes, madam. I will hand it over to Mai by name, and she will call your room before four.",
      ],
    },
    {
      ...sp(
        "Why can you not do it yourself?",
        t2c,
        "Nói lý do thật, ngắn: ca sắp hết, việc cần thời gian — nên người làm trọn được việc đó sẽ nhận.",
        undefined,
        undefined,
        t2b,
      ),
      alsoAccept: [
        "My shift ends in ten minutes, madam, and a group plan needs time, so Mai can give it all her attention.",
      ],
    },
    {
      ...sp(
        "Hi, I am starting now. Is there anything for me?",
        "Yes. Mrs Fox came just before the end of shift, and her open request is in the handover note.",
        "Nói với đồng nghiệp ca sau — không dùng sir hay madam: ai, khi nào, việc gì còn dở, và việc đó nằm ở đâu.",
        "colleague",
      ),
      alsoAccept: [
        "Yes. Mrs Fox came just before the end of shift, and her open request is in the handover note for you.",
      ],
    },
    sp(
      "Can I have a quick massage now? It is only ten to nine.",
      "I am sorry, sir. My shift ends at nine, but my colleague Vy can give you a massage at a quarter past nine.",
      "Kỹ thuật viên cũng giữ luật cuối ca: không nhận liệu trình mới, nhưng đưa khách cho đích danh người ca sau, kèm giờ.",
    ),
    risk({
      ...sp(
        "A guest feels dizzy in the steam room, but my shift ends in five minutes.",
        "That cannot wait for the next shift. Please walk her to the cool area, and I will call the nurse now.",
        "Nói với đồng nghiệp — không dùng sir hay madam. Luật cuối ca có một ngoại lệ: nguy hiểm không bao giờ để cho ca sau.",
        "colleague",
        ["wait", "next", "shift", "walk", "cool", "area", "call", "nurse"],
      ),
      alsoAccept: [
        "That cannot wait for the next shift. Please walk her to the cool area, and I will call the nurse straight away.",
        "That cannot wait for the next shift. Please walk her to the cool area now, and I will call the nurse.",
        "That cannot wait. Please walk her to the cool area, and I will call the nurse now.",
        "Danger first. Please walk the light-headed guest to the cool area, and I will call the nurse.",
        "If she is light-headed, please walk her out to the cool area. I am calling the nurse now.",
        "Danger first: the light-headed guest is our priority. Please walk her to the cool area, and I will call the nurse.",
      ],
    }),
    sp(
      "Why is Mrs Fox's group booking in Mai's handover note?",
      "Mrs Fox came at ten to three, so I wrote it down and handed it over to Mai by name.",
      "Báo cáo cho quản lý — không dùng sir hay madam: giờ khách tới, và bạn đã làm đúng luật cuối ca thế nào.",
      "manager",
    ),
  ],
  reading: read(
    `At the spa, the morning shift ends at three, and the rule for the last fifteen minutes is simple. Nobody starts a new job. A new request goes in the handover note, and it is handed over by name to someone on the next shift. At ten to three, Mrs Fox comes to the desk. She wants to plan a spa day for six friends next week. Thu does not start the plan herself, because a group plan needs time. She writes down Mrs Fox's details and tells her that Mai, who starts at three, will call her room by four. At five to three, a colleague says a guest feels dizzy in the steam room. Thu does not leave this for the next shift. Danger never waits. She calls the hotel nurse, and her colleague walks the guest to the cool area. At three, Mai arrives. Thu gives her the handover note and tells her about Mrs Fox by name. Mai calls Mrs Fox at half past three.`,
    [
      {
        q: "Luật mười lăm phút cuối ca là gì?",
        options: [
          "Không mở việc mới; ghi vào sổ bàn giao và giao đích danh cho ca sau",
          "Làm thật nhanh mọi việc khách yêu cầu trước khi về",
          "Nhờ khách quay lại vào hôm sau cho chắc chắn",
        ],
        correct: 0,
        explanation:
          "'Nobody starts a new job. A new request goes in the handover note, and it is handed over by name to someone on the next shift.'",
      },
      {
        q: "Vì sao Thu xử lý ngay chuyện khách choáng váng dù sắp hết ca?",
        options: [
          "Vì Mai còn lâu mới tới, phải đợi tới ba giờ",
          "Vì nguy hiểm không để cho ca sau",
          "Vì khách đó là khách quen của riêng Thu",
        ],
        correct: 1,
        explanation:
          "'Thu does not leave this for the next shift. Danger never waits.' — luật cuối ca không áp dụng cho chuyện an toàn.",
      },
      {
        q: "Ai gọi cho bà Fox, và khi nào?",
        options: [
          "Thu, ngay trước ba giờ",
          "Quản lý, vào sáng hôm sau",
          "Mai, lúc ba giờ rưỡi, trước mốc bốn giờ đã hứa",
        ],
        correct: 2,
        explanation:
          "'Mai calls Mrs Fox at half past three' — đúng người được bàn giao, trước mốc bốn giờ đã hứa với khách.",
      },
    ],
  ),
  game: [
    game(
      "It is ten to three. Could you plan a spa day for my six friends?",
      "Of course, madam. I will write down your request, and Mai will plan it with you at three.",
      "Yes, madam. Let me starting the whole plan now, even if I have to stay late.",
      "Yes, madam. Let me start the whole plan now, even if I have to stay late.",
      undefined,
      "Câu thứ hai sai dạng: sau 'Let me' là động từ nguyên mẫu 'start'. Cả câu thứ hai lẫn câu thứ ba đều nghe nhiệt tình nhưng mở một việc lớn ở phút cuối ca — việc dễ bị bỏ dở, và ca sau không biết gì. Câu đúng ghi lại và giao đích danh cho Mai.",
    ),
    game(
      "Who should I give Mrs Fox's request to?",
      "Give it to Mai by name, and write it in the handover note.",
      "Give it to Mai by name, and writing it in the handover note.",
      "Just leave it on the desk for somebody.",
      "colleague",
      "Câu thứ hai sai dạng: 'and' nối hai động từ cùng dạng mệnh lệnh, 'Give… write'. Câu thứ ba giao việc cho 'ai đó' — tức là không ai cả. Câu đúng giao đích danh và ghi vào sổ bàn giao.",
    ),
  ],
});

// ── Lesson 3 — Rehearsal: a busy morning at the desk ───────────────────
const t3a = "Good morning, madam. May I see the voucher, so I can check the expiry date?";
const t3b =
  "Thank you, madam. The voucher is valid, and a female therapist is free at three this afternoon.";
const t3c = "Then you can cancel at no charge until eleven; after that, it is a late cancellation.";

const lesson3 = L(39, 3, "Rehearsal: A Morning at the Desk", "Tổng duyệt: buổi sáng ở quầy spa", {
  vocabulary: [
    c("Queue", "When there is a queue at the desk, we greet every guest in it.", [
      "/kjuː/",
      "Hàng người đang chờ",
      "👥",
    ]),
    c("Walk-in", "A walk-in is a guest who comes to the spa without a booking.", [
      "/ˈwɔːk ɪn/",
      "Khách vãng lai (đến không đặt trước)",
      "🚶",
    ]),
    c("Double charge", "A double charge is corrected by the supervisor, not at the desk.", [
      "/ˌdʌbl ˈtʃɑːdʒ/",
      "Khoản bị tính tiền hai lần",
      "🧾",
    ]),
    c("Take a message", "If you cannot help a caller, please take a message.", [
      "/ˌteɪk ə ˈmesɪdʒ/",
      "Nhận lời nhắn",
      "💬",
    ]),
  ],
  grammar: [
    g(
      "Voucher, show me. I check.",
      "May I see the voucher, so I can check the expiry date?",
      "'so I can' + động từ nguyên mẫu: 'so I can check'. Xin xem giấy tờ bằng câu hỏi 'May I see…?', không ra lệnh.",
      "May I see the voucher, so I can checking the expiry date?",
    ),
    g(
      "Supervisor correct the bill already.",
      "The bill was corrected by the supervisor, madam.",
      "Bị động quá khứ: 'was + phân từ hai' — 'corrected' (đã được sửa). Thiếu -ed thì 'correct' thành tính từ 'đúng', và câu mất nghĩa.",
      "The bill was correct by the supervisor, madam.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "Good morning. I have a spa voucher from my company, and I would like a massage today.",
        t3a,
        "Phiếu quà tặng: xem phiếu và ngày hết hạn trước, chưa hứa gì trước khi xem.",
      ),
      alsoAccept: ["Good morning, madam. May I see your voucher, so I can check the expiry date?"],
    },
    {
      ...sp(
        "Here you are. And could I have a female therapist, please?",
        t3b,
        "Hai câu trả lời trong một lượt: phiếu còn hiệu lực, và một giờ cụ thể có kỹ thuật viên nữ.",
        undefined,
        undefined,
        t3a,
      ),
      alsoAccept: [
        "Thank you, madam. The voucher is valid, and a female therapist is free at three o'clock this afternoon.",
      ],
    },
    {
      ...sp(
        "Three is perfect. But my meeting might move.",
        t3c,
        "Nói điều khoản huỷ bằng một mốc giờ thật (bốn tiếng trước ba giờ là mười một giờ), rồi gọi đúng tên trường hợp sau mốc đó.",
        undefined,
        undefined,
        t3b,
      ),
      alsoAccept: [
        "Then you can cancel at no charge until eleven. After that, it is a late cancellation.",
      ],
    },
    risk({
      ...sp(
        "I am Mrs Chen's husband. What is her room number? I want to send her flowers.",
        "I am sorry, sir. I cannot tell you the room number of any guest, but I can take a message.",
        "Riêng tư không có ngoại lệ, kể cả với người nói là chồng của khách: không đọc số phòng, không xác nhận khách có ở đây. Đưa một cách khác.",
        undefined,
        ["tell", "room", "number", "guest", "take"],
      ),
      alsoAccept: [
        "I am sorry, sir. I cannot give you the room number of any guest, but I can take a message.",
        "I am afraid I cannot tell you the room number of any guest, sir, but I can take a message.",
        "I am sorry, sir. I cannot give out any guest's room number, but I can take a message for her.",
        "I am sorry, sir. I cannot tell you the room number of any guest.",
      ],
    }),
    sp(
      "A guest says she was charged twice for her facial. Can I fix the bill?",
      "Please listen first and note the details of the double charge, and then ask the supervisor to correct the bill.",
      "Nói với đồng nghiệp — không dùng sir hay madam. Lắng nghe, ghi chi tiết, rồi giám sát sửa hoá đơn — không tự sửa.",
      "colleague",
    ),
    {
      ...sp(
        "There is a queue, and I have no booking. Can I still have a massage this morning?",
        "It is our peak time, sir. As a walk-in, the first free time is at eleven, and I can book it for you now.",
        "Khách vãng lai giờ cao điểm: nói thật là đang đông, rồi giờ trống thật gần nhất, và đề nghị đặt luôn. Hàng chờ không làm bạn trả lời cộc.",
      ),
      alsoAccept: [
        "It is our peak time, sir. As a walk-in, the first free time is eleven o'clock, and I can book it for you now.",
        "Of course, sir. As a walk-in, the first free time is at eleven, and I can book it for you now.",
      ],
    },
    {
      ...sp(
        "I cancelled at noon for my two o'clock massage. Do I really have to pay?",
        "I am sorry, madam. That is a late cancellation, and only my manager can make an exception, so I will ask her today.",
        "Gọi đúng tên điều khoản, rồi nói rõ ai có quyền làm ngoại lệ — quản lý — và hỏi giúp kèm mốc hôm nay.",
      ),
      alsoAccept: [
        "I am sorry, madam. That is a late cancellation, but I will ask my manager about the fee today.",
      ],
    },
    sp(
      "How was the morning at the desk?",
      "It was busy: a queue at nine, a walk-in and a dispute about a double charge, which the supervisor corrected.",
      "Báo cáo cho quản lý — không dùng sir hay madam: kể ngắn từng việc, và ai đã xử lý phần tiền.",
      "manager",
    ),
    {
      ...sp(
        "Can I buy the rice scrub you used on me this morning?",
        "Of course, madam. It is handmade here with ginger from our own harvest, and every ingredient is on the label.",
        "Bán khi khách hỏi: kể ngắn câu chuyện sản phẩm (làm tay, gừng tự trồng), và nhắc nhãn ghi đủ thành phần.",
      ),
      alsoAccept: [
        "Of course, madam. It is handmade here with ginger from our own harvest, and all the ingredients are on the label.",
      ],
    },
    {
      ...sp(
        "I had a facial this morning. Can I lie in the sun by the pool this afternoon?",
        "Please use sunscreen if you go outside, madam, because your skin is sensitive after a facial.",
        "Lời dặn sau làm mặt: một việc cụ thể (kem chống nắng), và lý do bằng 'because'.",
      ),
      alsoAccept: [
        "Of course, madam. Please use sunscreen if you go outside, because your skin is sensitive after a facial.",
      ],
    },
  ],
  reading: read(
    `Kim works at the spa desk on Monday morning, and every request needs a different rule. At nine, there is a queue at the desk, and Mrs Chen shows a voucher from her company. Kim checks the expiry date first, and the voucher is valid. Mrs Chen asks for a female therapist, and one is free at three. Kim explains that she can cancel at no charge until eleven; after that, it is a late cancellation. At ten, a man calls and says he is Mrs Chen's husband. He wants her room number, because he would like to send flowers. Kim does not give the number, and she does not say whether Mrs Chen is staying at the hotel. She offers to take a message. A walk-in asks for a massage, and Kim books him at eleven. Then another guest says she was charged twice for her facial. Kim listens, notes the details of the double charge and asks the supervisor, who corrects the bill. At noon, a guest cancels a two o'clock massage. It is a late cancellation, so Kim asks her manager about the fee.`,
    [
      {
        q: "Khi người gọi điện nói là chồng của bà Chen, Kim làm gì?",
        options: [
          "Cho số phòng vì đó là người nhà của khách",
          "Không cho số phòng, không nói bà có ở khách sạn, và đề nghị nhận lời nhắn",
          "Hỏi bà Chen trước rồi gọi lại cho ông",
        ],
        correct: 1,
        explanation:
          "'Kim does not give the number, and she does not say whether Mrs Chen is staying at the hotel. She offers to take a message.'",
      },
      {
        q: "Ai sửa hoá đơn bị tính hai lần?",
        options: [
          "Giám sát",
          "Chính Kim, ngay tại quầy lễ tân",
          "Kỹ thuật viên đã làm mặt cho khách",
        ],
        correct: 0,
        explanation:
          "'Kim listens, notes the details of the double charge and asks the supervisor, who corrects the bill' — sửa tiền là việc của giám sát.",
      },
      {
        q: "Bà Chen được huỷ miễn phí tới mấy giờ?",
        options: ["Tới ba giờ chiều", "Tới mười hai giờ trưa hôm đó", "Tới mười một giờ sáng"],
        correct: 2,
        explanation:
          "'she can cancel at no charge until eleven; after that, it is a late cancellation' — bốn tiếng trước giờ hẹn ba giờ.",
      },
    ],
  ),
  game: [
    game(
      "I am her brother. Is she staying here, and which room is she in?",
      "I am sorry, sir. We do not give out any guest details, but you can leave her a note at reception.",
      "Of course, sir. As her brother, you can goes straight up to room five hundred and two.",
      "Of course, sir. As her brother, you can go straight up to room five hundred and two.",
      undefined,
      "Câu thứ hai sai dạng: sau 'can' là động từ nguyên mẫu 'go', không thêm -es. Cả câu thứ hai lẫn câu thứ ba đều tin lời người hỏi và đọc số phòng — nhân viên không biết người đó có thật là anh trai của khách hay không. Câu đúng không xác nhận khách có ở đây, không đọc số phòng, và đưa một cách khác.",
    ),
    game(
      "A guest was charged twice for her facial. Shall I just fix it myself?",
      "Please note the details, and then ask the supervisor to correct the bill.",
      "Please note the details, and then ask the supervisor correct the bill.",
      "Yes, just delete one charge. The supervisor is always too busy for small things.",
      "colleague",
      "Câu thứ hai thiếu 'to': 'ask + người + to + động từ'. Câu thứ ba tự sửa tiền trên hoá đơn — việc của giám sát, dù khoản tiền nhỏ. Câu đúng ghi chi tiết rồi nhờ giám sát.",
    ),
  ],
});

// ── Lesson 4 — Rehearsal: an evening in the treatment rooms ────────────
const t4a = "I am stopping now, sir, and I will put cool water on the burn straight away.";
const t4b = "I cannot say, sir, but the hotel nurse is on her way, and I will stay with you.";
const t4c = "The nurse comes first, sir, and my manager will speak with you after that.";

const lesson4 = L(
  39,
  4,
  "Rehearsal: An Evening in the Treatment Rooms",
  "Tổng duyệt: buổi tối ở khu trị liệu",
  {
    vocabulary: [
      c("Hot stone", "Before every massage, the therapist checks the heat of each hot stone.", [
        "/ˌhɒt ˈstəʊn/",
        "Đá nóng (dùng trong massage)",
        "🪨",
      ]),
      c("Wine", "After a glass of wine at dinner, a guest does not use the sauna.", [
        "/waɪn/",
        "Rượu vang",
        "🍷",
      ]),
      c(
        "Stay covered",
        "During the massage, the guest can stay covered with a towel at all times.",
        ["/ˌsteɪ ˈkʌvəd/", "Luôn được che phủ (bằng khăn)", "🛏️"],
      ),
      c("Closing time", "Closing time at the spa is ten o'clock at night.", [
        "/ˈkləʊzɪŋ taɪm/",
        "Giờ đóng cửa",
        "🔒",
      ]),
    ],
    grammar: [
      g(
        "No sauna. You drink wine.",
        "We cannot let you use the sauna after alcohol, sir.",
        "Sau 'let you' là động từ nguyên mẫu KHÔNG 'to': 'let you use'. Người Việt hay thêm 'to' vì dịch 'để bạn dùng'.",
        "We cannot let you to use the sauna after alcohol, sir.",
      ),
      g(
        "Pregnant? I ask manager.",
        "I will check with my manager first, madam.",
        "'check with + người' = hỏi ý kiến ai. Bỏ 'with' ('check my manager') thì nghĩa thành 'kiểm tra quản lý của tôi'.",
        "I will check my manager first, madam.",
      ),
    ],
    speaking: [
      {
        ...sp(
          "Ow! That stone is far too hot on my shoulder.",
          t4a,
          "Bỏng: dừng ngay và làm mát vết bỏng bằng nước mát — đúng thứ tự đã học, không giải thích, không xin lỗi dài.",
        ),
        alsoAccept: [
          "I am stopping now, sir, and I will put cool water on the burn at once.",
          "I will stop now, sir, and put cool water on the burn straight away.",
        ],
      },
      {
        ...sp(
          "It still stings. Is it bad?",
          t4b,
          "Không chẩn đoán, không hứa số phút thay y tá. Một sự thật (y tá đang tới) và một lời hứa (bạn ở lại).",
          undefined,
          undefined,
          t4a,
        ),
        alsoAccept: [
          "I am not sure, sir, but the hotel nurse is on her way, and I will stay with you.",
          "I am not sure, sir. The hotel nurse is coming now, and I will stay with you.",
          "I am not sure, sir, but the nurse is on her way.",
        ],
      },
      {
        ...sp(
          "Is the spa going to pay for this?",
          t4c,
          "Không bàn lỗi hay tiền bên giường trị liệu: y tá trước, quản lý nói chuyện sau.",
          undefined,
          undefined,
          t4b,
        ),
        alsoAccept: [
          "The nurse comes first, sir, and my manager will speak with you after the nurse.",
        ],
      },
      risk({
        ...sp(
          "I had two glasses of wine at dinner. Can I use the sauna now?",
          "I am sorry, sir. After wine, we cannot let you use the sauna, but the relaxing area is open.",
          "Rượu rồi nhiệt là luật an toàn, không thương lượng — một ly hay hai ly cũng vậy. Từ chối rõ, rồi một chỗ khác khách dùng được.",
          undefined,
          ["wine", "use", "sauna", "relaxing", "area", "open"],
        ),
        alsoAccept: [
          "I am sorry, sir. We cannot let you use the sauna after alcohol, but the relaxing area is open.",
          "I am afraid we cannot let you use the sauna after wine, sir, but the relaxing area is open.",
          "I am sorry, sir. You cannot use the sauna after wine, but the relaxing area is open.",
          "I am sorry, sir. We cannot let you use the sauna after alcohol; however, you can rest in the quiet corner.",
        ],
      }),
      {
        ...sp(
          "The lights have gone out again! Are you still there?",
          "Yes, madam, I am right here. It is a power cut, my torch is on, and I will not leave the room.",
          "Mất điện: một câu cho khách biết bạn vẫn ở đây, nói đúng tên sự việc, đèn pin đang bật, và bạn không rời phòng.",
        ),
        alsoAccept: [
          "Yes, madam, I am right here. It is a power cut, my torch is on, and I am not leaving the room.",
          "Yes, madam, I am right here. My torch is on, and I will not leave the room.",
        ],
      },
      risk({
        ...sp(
          "The guest in room four is pregnant, and she wants to use the sauna.",
          "She is a mother-to-be, so she cannot use the sauna or any heat treatment; please tell the manager.",
          "Nói với đồng nghiệp — không dùng sir hay madam. Khách mang thai thì không dùng phòng xông hay liệu trình dùng nhiệt — đúng kế hoạch quản lý đã duyệt; đồng nghiệp không tự mở phòng xông, và báo quản lý.",
          "colleague",
          ["sauna", "manager"],
        ),
        alsoAccept: [
          "She is a mother-to-be, so she cannot use the sauna; please tell the manager.",
          "She is pregnant, so she cannot use the sauna or any heat treatment. Please tell the manager.",
          "She is a mother-to-be, so no sauna and no heat treatment; please tell the manager.",
        ],
      }),
      {
        ...sp(
          "I am a bit nervous. Can I stop the massage if I do not like it?",
          "Many guests feel nervous at first, madam. You can ask me to stop at any moment, and you will stay covered.",
          "Công nhận cảm giác của khách bằng một câu, rồi hai bảo đảm cụ thể thay cho lời động viên: được dừng bất cứ lúc nào, và luôn được che phủ.",
        ),
        alsoAccept: [
          "Many guests feel nervous at first, madam. You can ask me to stop at any time, and you will stay covered.",
          "Of course, madam. You can ask me to stop at any moment, and you will stay covered.",
        ],
      },
      sp(
        "How was the evening in the treatment rooms?",
        "It was busy until closing time. A guest had a burn from a hot stone, so I stopped, cooled it and called the nurse.",
        "Báo cáo cho quản lý bằng thì quá khứ — không dùng sir hay madam: việc quan trọng nhất, rồi ba việc bạn đã làm theo thứ tự.",
        "manager",
      ),
      risk({
        ...sp(
          "I had a small operation on my shoulder last month. Is a hot stone massage all right?",
          "Thank you for telling me, sir. After a recent operation, we need a doctor's note before any massage.",
          "Phẫu thuật gần đây: không tự nói có hay không. Cảm ơn khách, rồi nói đúng quy định — cần giấy bác sĩ trước mọi liệu trình massage.",
          undefined,
          ["recent", "doctor's", "note"],
        ),
        alsoAccept: [
          "Thank you, sir. After a recent operation, we need a doctor's note before the massage.",
          "Thank you for telling me, sir. We need a doctor's note before any massage after a recent operation.",
          "Thank you for telling me, sir. After a recent operation, a massage needs a doctor's note first.",
        ],
      }),
      risk({
        ...sp(
          "My earrings are not in my locker! The spa must pay for them.",
          "I am very sorry, madam. I will look in lost property first, and then I will call my manager.",
          "Đồ mất trong tủ: không hứa đền, không tranh luận. Kiểm tra nơi giữ đồ thất lạc trước, rồi gọi quản lý.",
          undefined,
          ["lost", "property", "first", "call", "manager"],
        ),
        alsoAccept: [
          "I am very sorry, madam. Let me check lost property first, and I will call my manager now.",
          "I am very sorry, madam. Payment is my manager's decision, so let me check lost property first and call her now.",
          "I am so sorry, madam. I will check lost property first, and then I will call my manager.",
        ],
      }),
    ],
    reading: read(
      `Tuan works the evening shift in the treatment rooms, and it is a long evening. At seven, a hot stone is too hot on a guest's shoulder. Tuan stops at once and puts cool water on the burn. The guest asks if it is bad. Tuan does not guess. He says the hotel nurse is on her way, and he stays with him. When the guest asks who will pay, Tuan says the nurse comes first and the manager will speak with him later. At eight, another guest has had wine at dinner and asks for the sauna. Tuan says no, kindly, and offers the relaxing area. At half past eight, a guest who is pregnant wants to use the sauna. Tuan explains that she cannot use it, and he tells the manager. At nine, the power goes off. Tuan is with a nervous guest, so he switches on his torch and stays in the room. At closing time, he writes everything in the handover note.`,
      [
        {
          q: "Khi khách bị bỏng vì đá nóng, Tuấn làm gì đầu tiên?",
          options: [
            "Dừng lại ngay và cho nước mát lên vết bỏng trên vai khách",
            "Hỏi khách có muốn đổi sang loại đá khác không",
            "Gọi quản lý tới xin lỗi khách trước",
          ],
          correct: 0,
          explanation:
            "'Tuan stops at once and puts cool water on the burn' — dừng và làm mát trước, mọi chuyện khác để sau.",
        },
        {
          q: "Vì sao Tuấn không mở phòng xông hơi cho vị khách lúc tám giờ?",
          options: [
            "Vì phòng xông hơi đang được sửa chữa",
            "Vì khách vừa uống rượu",
            "Vì khách chưa đặt lịch trước ở quầy",
          ],
          correct: 1,
          explanation:
            "'another guest has had wine at dinner and asks for the sauna. Tuan says no, kindly' — rượu rồi nhiệt là luật an toàn.",
        },
        {
          q: "Tuấn làm gì khi khách mang thai muốn vào phòng xông hơi?",
          options: [
            "Mở phòng nhưng giảm nhiệt độ xuống",
            "Cho khách vào nếu khách tự ký cam kết",
            "Không cho dùng phòng xông, rồi báo quản lý",
          ],
          correct: 2,
          explanation:
            "'Tuan explains that she cannot use it, and he tells the manager' — khách mang thai không dùng liệu trình dùng nhiệt, và quản lý được báo.",
        },
      ],
    ),
    game: [
      game(
        "I only had one glass of wine. Can I use the sauna?",
        "I am sorry, sir. We cannot let you use the sauna after alcohol, even after one glass.",
        "I am sorry, sir. We cannot let you to use the sauna after alcohol.",
        "One glass is fine, sir. Just stay for a shorter time than usual.",
        undefined,
        "Câu thứ hai thừa 'to': sau 'let you' là 'use'. Câu thứ ba tự quyết 'một ly thì không sao' — luật an toàn không có mức 'một ly'. Câu đúng từ chối rõ ràng, kể cả khi khách chỉ uống một ly.",
      ),
      game(
        "The lights went out! Are you leaving me?",
        "No, madam. I am right here, and my torch is on.",
        "One moment, madam. I will go and find out what happen, and then I will come back.",
        "One moment, madam. I will go and find out what happened, and then I will come back.",
        undefined,
        "Câu thứ hai sai thì: việc đã xảy ra nên là 'what happened', không phải 'what happen'. Cả câu thứ hai lẫn câu thứ ba đều bỏ khách lại một mình trong bóng tối để đi hỏi chuyện. Câu đúng ở lại và bật đèn pin.",
      ),
    ],
  },
);

export const week: AuthoredWeek = {
  title: {
    en: "Priorities and the Last Fifteen Minutes",
    vi: "Thứ tự ưu tiên và mười lăm phút cuối ca",
  },
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: xếp thứ tự khi nhiều việc tới cùng lúc — nguy hiểm trước (gọi 115 và y tá, có người ở lại với khách; khách đau ngực thì ngồi yên, gọi 115 xin xe cấp cứu, không để khách tự đi), Quản lý trực sau, khách đang chờ nhận một câu xin lỗi và một mốc giờ ('I will be with you in five minutes. In the meantime…'); giữ luật mười lăm phút cuối ca — không mở việc mới, ghi vào ghi chú bàn giao và giao đích danh cho ca sau, nhưng nguy hiểm không bao giờ để cho ca sau; và tổng duyệt cả phase ở quầy và ở khu trị liệu: phiếu quà tặng, kỹ thuật viên nữ, huỷ muộn, số phòng, hoá đơn, bỏng, rượu và phòng xông hơi, khách mang thai, mất điện.",
};
