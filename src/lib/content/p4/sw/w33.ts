// SW week 33 — Disputes and compensation, the whole of LAST: Listen,
// Apologise, Solve, Thank ("Our policy allows… up to…", "Let me check with
// my supervisor"). Hand-authored Phase 4, see ../kit.ts.
//
// What the spa desk owns here, and what it routes, is the Phase 3 rule one
// step further. It listens and writes the details down before anything else;
// it apologises for what the guest met, never with a verdict; it explains a
// PUBLISHED policy (the four-hour reschedule, the voucher's expiry date, the
// package's three months) and never an internal limit; and everything that is
// money — a corrected bill, an expired voucher accepted anyway, a dress, a
// bracelet — goes to the supervisor or the manager, with a time to come back.
// An injury is not a dispute: a hot stone burn is stopped, cooled and seen by
// the hotel nurse, someone stays with the guest, and fault and money are not
// discussed at the treatment bed. The manager follows up in writing.
import type { AuthoredWeek } from "../kit";
import { cardsFor, lessonsFor, risk } from "../kit";
import { game, g, read, sp } from "../../phase0";

const c = cardsFor("SW");
const L = lessonsFor("SW");

// ── Lesson 1 — Listen first, then apologise ────────────────────────────
const t1a = "I am sorry about this, madam. Could you tell me the details, please?";
const t1b = "Thank you, madam. Let me check the treatment schedule and your bill now.";

const lesson1 = L(33, 1, "Listen First, Then Apologise", "Lắng nghe trước, xin lỗi sau", {
  vocabulary: [
    c("Listen", "When a guest complains, we listen first and do not interrupt.", [
      "/ˈlɪsn/",
      "Lắng nghe",
      "👂",
    ]),
    c("Dispute", "The guest has a dispute about her spa bill.", [
      "/dɪˈspjuːt/",
      "Tranh chấp, sự khiếu nại (về hoá đơn, dịch vụ)",
      "⚖️",
    ]),
    c("Overcharge", "There was an overcharge on the bill, so the supervisor corrected it.", [
      "/ˈəʊvətʃɑːdʒ/",
      "Khoản tính tiền quá mức",
      "💸",
    ]),
    c("Detail", "Please tell me every detail, and I will write it down.", [
      "/ˈdiːteɪl/",
      "Chi tiết",
      "🔍",
    ]),
  ],
  grammar: [
    g(
      "What is problem? Tell me.",
      "Could you tell me what the problem was, madam?",
      "Câu hỏi nằm trong câu hỏi khác ('Could you tell me…') thì GIỮ trật tự câu kể: 'what the problem was', không đảo 'was' lên trước.",
      "Could you tell me what was the problem, madam?",
    ),
    g(
      "Sorry. I check.",
      "I am sorry about the bill, sir. I am checking it now.",
      "Xin lỗi về điều khách gặp ('about the bill'), chưa kết luận lỗi của ai. Việc đang làm ngay lúc nói: 'I am checking' — đủ 'am' + V-ing.",
      "I am sorry about the bill, sir. I checking it now.",
    ),
  ],
  speaking: [
    sp(
      "I want to dispute this bill. It is wrong!",
      t1a,
      "Bước L — Listen: xin lỗi về chuyện khách gặp, rồi mời khách kể chi tiết. Chưa giải thích, chưa bào chữa.",
    ),
    sp(
      "I had a sixty-minute massage, but you charged me for ninety minutes.",
      t1b,
      "Nghe xong thì kiểm tra hai thứ: lịch trị liệu và hoá đơn. Chưa nói ai đúng ai sai.",
      undefined,
      undefined,
      t1a,
    ),
    {
      ...sp(
        "Well? Was I overcharged or not?",
        "Yes, madam, there was an overcharge. I will ask my supervisor to correct the bill now.",
        "Kiểm tra xong mới nói kết quả. Sửa hoá đơn là chuyện tiền — nhờ giám sát sửa, không tự sửa.",
        undefined,
        ["overcharge", "ask", "supervisor", "bill"],
        t1b,
      ),
      alsoAccept: [
        "Yes, madam, there was an overcharge, and I will ask my supervisor to correct the bill now.",
        "I am sorry, madam, there was an overcharge. I will ask my supervisor to correct the bill now.",
      ],
    },
    {
      ...sp(
        "Your therapist was rude to me, and I want to complain.",
        "I am sorry to hear that, sir. Please tell me what happened, and I will put every detail on file.",
        "Khiếu nại về nhân viên: không bênh đồng nghiệp, không kết luận. Mời khách kể, và ghi từng chi tiết vào hồ sơ.",
      ),
      alsoAccept: [
        "I am very sorry to hear that, sir. Please tell me what happened, and I will put every detail on file.",
      ],
    },
    sp(
      "I do not want to argue. I just want someone to listen.",
      "Of course, madam. I will listen first, and I will not interrupt you.",
      "Khách cần được nghe: hứa đúng điều đó — nghe trước, không ngắt lời.",
    ),
    sp(
      "What happened at the spa desk this morning?",
      "A returning guest had a dispute about an overcharge, so I asked the supervisor to correct her bill.",
      "Báo cáo cho quản lý: chuyện gì, và bạn đã chuyển cho ai. Nói với cấp trên thì không dùng sir hay madam.",
      "manager",
    ),
  ],
  reading: read(
    `Every new receptionist at the spa learns four letters from the spa manager: LAST. L is for Listen: the guest speaks first, and you write down the details without interrupting. A is for Apologise: you say sorry for what the guest met, but you do not decide whose fault it was. S is for Solve: you do what your job allows, and you pass the rest to your supervisor with a time. T is for Thank: you thank the guest for telling you, because a complaint helps the spa improve. On Monday, Ms Garcia comes to the desk with her bill. She is angry, because she had a sixty-minute massage and the bill shows ninety minutes. Phuong listens to the whole story. Then she says she is sorry, and she checks the treatment schedule. It was an overcharge, so Phuong asks her supervisor to correct the bill. Before Ms Garcia leaves, Phuong thanks her for her patience.`,
    [
      {
        q: "Bước 'A — Apologise' yêu cầu điều gì?",
        options: [
          "Nhận lỗi về phía spa ngay để khách bớt giận",
          "Xin lỗi điều khách gặp, chưa kết luận lỗi",
          "Xin lỗi rồi chuyển ngay cho quản lý xử lý",
        ],
        correct: 1,
        explanation:
          "'you say sorry for what the guest met, but you do not decide whose fault it was' — xin lỗi không phải là nhận lỗi.",
      },
      {
        q: "Phương làm gì ngay sau khi nghe hết câu chuyện?",
        options: [
          "Xin lỗi và kiểm tra lịch trị liệu",
          "Tự sửa hoá đơn cho khách",
          "Giải thích hệ thống tính tiền của spa",
        ],
        correct: 0,
        explanation:
          "'Then she says she is sorry, and she checks the treatment schedule' — Apologise, rồi kiểm tra trước khi giải quyết.",
      },
      {
        q: "Ai sửa hoá đơn của bà Garcia?",
        options: [
          "Chính Phương, vì lỗi đã rõ ràng",
          "Bộ phận kế toán của khách sạn, vào hôm sau",
          "Giám sát của Phương",
        ],
        correct: 2,
        explanation:
          "'It was an overcharge, so Phuong asks her supervisor to correct the bill' — sửa tiền là việc của cấp trên.",
      },
    ],
  ),
  game: [
    game(
      "This bill is wrong, and I am very angry about it.",
      "I am sorry about this, madam. Could you tell me the details of the problem, please?",
      "I am sorry about this, madam. Could you telling me the details, please?",
      "Please calm down, madam. Our system never makes mistakes with the bills.",
      undefined,
      "Câu thứ hai sai dạng: sau 'Could you' là động từ nguyên mẫu 'tell'. Câu thứ ba bảo khách bình tĩnh và cãi rằng hệ thống không sai — trái với bước Listen. Câu đúng xin lỗi về chuyện khách gặp và mời khách kể chi tiết.",
    ),
    game(
      "You charged me twice for the same massage!",
      "I am sorry, sir. Let me check the bill now, and I will ask my supervisor to correct any mistake.",
      "I am sorry, sir. Let me checking the bill now, and I will ask my supervisor to correct any mistake.",
      "That is impossible, sir. The system does it automatically, so you must be wrong.",
      undefined,
      "Câu thứ hai sai dạng: sau 'Let me' là động từ nguyên mẫu 'check'. Câu thứ ba đúng ngữ pháp nhưng kết luận khách sai trước khi kiểm tra. Câu đúng kiểm tra, rồi nhờ giám sát sửa nếu có sai.",
    ),
  ],
});

// ── Lesson 2 — What our policy allows ──────────────────────────────────
const t2a = "Of course, madam. May I see the voucher, so I can check that it is valid?";
const t2b = "I am sorry, madam. The expiry date has passed, so the voucher is no longer valid.";

const lesson2 = L(33, 2, "What Our Policy Allows", "Chính sách cho phép đến đâu", {
  vocabulary: [
    c("Allow", "Our policy allows a free reschedule up to four hours before.", [
      "/əˈlaʊ/",
      "Cho phép",
      "👍",
    ]),
    c("Up to", "You can use the package up to three months after you buy it.", [
      "/ˈʌp tuː/",
      "Cho tới, tối đa (một mốc, một mức)",
      "⏳",
    ]),
    c("Voucher", "The voucher is a gift from her company.", [
      "/ˈvaʊtʃə/",
      "Phiếu quà tặng, phiếu dịch vụ",
      "🎟️",
    ]),
    c("Expiry date", "The expiry date is printed on the back of the voucher.", [
      "/ɪkˈspaɪəri deɪt/",
      "Ngày hết hạn",
      "📅",
    ]),
    c("Valid", "This voucher is valid until the end of the month.", [
      "/ˈvælɪd/",
      "Còn hiệu lực, còn dùng được",
      "✔️",
    ]),
  ],
  grammar: [
    g(
      "Policy say you can change before four hours.",
      "Our policy allows a free reschedule up to four hours before your treatment.",
      "'Our policy' là chủ ngữ số ít → 'allows', có -s. 'up to four hours before' = chậm nhất là bốn tiếng trước giờ hẹn.",
      "Our policy allow a free reschedule up to four hours before your treatment.",
    ),
    g(
      "Voucher can use all treatment.",
      "The voucher allows you to choose any treatment on the menu.",
      "'allow + người + to + động từ': 'allows you to choose'. Người Việt hay bỏ 'to'.",
      "The voucher allows you choose any treatment on the menu.",
    ),
  ],
  speaking: [
    sp(
      "I have a spa voucher from my company. Can I use it today?",
      t2a,
      "Đồng ý, rồi xin xem phiếu để kiểm tra còn hiệu lực — chưa hứa trước khi xem.",
    ),
    sp(
      "Here it is. Is there a problem?",
      t2b,
      "Nói sự thật trên phiếu: ngày hết hạn đã qua. Chỉ nêu điều in trên phiếu, không đoán thêm.",
      undefined,
      undefined,
      t2a,
    ),
    risk({
      ...sp(
        "Oh no. Can you not accept it anyway? It was only a week ago.",
        "I cannot accept it, madam, but let me check with my supervisor now.",
        "Nhận phiếu hết hạn là chuyện tiền: không tự nhận. Nói rõ bạn không thể, rồi 'let me check with my supervisor'.",
        undefined,
        ["check", "supervisor"],
        t2b,
      ),
      alsoAccept: [
        "I am sorry, I cannot accept it, madam, but let me check with my supervisor now.",
        "I cannot accept it, madam, but I will check with my supervisor now.",
      ],
    }),
    {
      ...sp(
        "Can I move my massage from this afternoon to tomorrow?",
        "Yes, madam. Our policy allows you to reschedule at no charge up to four hours before.",
        "Chính sách công bố cho khách thì nói rõ: 'allows', 'up to', kèm mốc giờ. Đây là điều khách được phép, không phải ưu đãi.",
      ),
      alsoAccept: [
        "Yes, madam. Our policy allows you to reschedule at no charge up to four hours before your massage.",
      ],
    },
    sp(
      "My package is older than three months. Can I still use the last session?",
      "I am sorry, sir. Our policy does not allow package sessions after three months, so I will ask my manager if we can help.",
      "Câu phủ định: 'does not allow' (không thêm -s vào 'allow' sau 'does'). Nêu đúng chính sách khách đã mua, rồi chuyển phần ngoại lệ cho quản lý — không tự hứa.",
    ),
    sp(
      "What can I use this voucher for?",
      "The voucher allows you to choose any treatment on the menu, up to the value printed on it.",
      "Giải thích phiếu bằng 'allows you to' và 'up to' — giới hạn là giá trị in trên phiếu.",
    ),
  ],
  reading: read(
    `Ms Nakamura brings a spa voucher to the desk. It was a birthday gift from her company, and she wants a facial this afternoon. Tuan asks to see the voucher, so he can check that it is valid. The expiry date was last Friday, so the voucher is no longer valid. Ms Nakamura is upset, because she was away on business all month. Tuan does not argue about the date, and he does not accept the voucher himself. He says he is sorry, and he explains what the policy allows: the voucher can be used up to the expiry date printed on it. Then he says, "Let me check with my supervisor now." Ten minutes later, the supervisor comes to the desk. She agrees to accept the voucher this one time, as a goodwill gesture. Tuan books the facial for four o'clock, and he thanks Ms Nakamura for waiting.`,
    [
      {
        q: "Vì sao phiếu của bà Nakamura không còn hiệu lực?",
        options: [
          "Vì ngày hết hạn đã qua",
          "Vì phiếu không dùng được cho chăm sóc da mặt",
          "Vì phiếu do công ty tặng chứ không phải khách sạn",
        ],
        correct: 0,
        explanation: "'The expiry date was last Friday, so the voucher is no longer valid.'",
      },
      {
        q: "Tuấn làm gì khi khách buồn vì phiếu hết hạn?",
        options: [
          "Tự nhận phiếu vì chỉ quá hạn vài ngày thôi",
          "Giải thích chính sách và hỏi giám sát",
          "Đề nghị khách mua một phiếu mới",
        ],
        correct: 1,
        explanation:
          "'he does not accept the voucher himself… he explains what the policy allows… \"Let me check with my supervisor now.\"'",
      },
      {
        q: "Ai quyết định nhận phiếu lần này?",
        options: ["Chính bà Nakamura", "Tuấn, sau khi xin lỗi khách", "Giám sát của Tuấn"],
        correct: 2,
        explanation:
          "'the supervisor… agrees to accept the voucher this one time, as a goodwill gesture' — ngoại lệ về tiền là quyết định của cấp trên.",
      },
    ],
  ),
  game: [
    game(
      "Can I move my massage to tomorrow? It starts in six hours.",
      "Yes, madam. Our policy allows you to reschedule at no charge up to four hours before your massage.",
      "Yes, madam. Our policy allow you to reschedule at no charge up to four hours before.",
      "Yes, madam, but there is a charge for every change, because the room was kept for you.",
      undefined,
      "Câu thứ hai sai hoà hợp: 'Our policy' số ít → 'allows'. Câu thứ ba nói sai chính sách — khách đổi lịch trước bốn tiếng thì không mất phí. Câu đúng nêu đúng điều chính sách cho phép.",
    ),
    game(
      "My voucher expired yesterday. Can you accept it anyway?",
      "I cannot accept it, madam, but let me check with my supervisor now.",
      "I cannot accept it, madam, but let me to check with my supervisor now.",
      "Of course, madam. One day is nothing, so I will accept it for you this time.",
      undefined,
      "Câu thứ hai sai cấu trúc: sau 'let me' là động từ nguyên mẫu, không có 'to'. Câu thứ ba thân thiện nhưng tự quyết một chuyện tiền — nhận phiếu hết hạn là việc của giám sát. Câu đúng nói rõ giới hạn của mình và hỏi giám sát ngay.",
    ),
  ],
});

// ── Lesson 3 — Let me check with my supervisor ─────────────────────────
const t3a = "I am very sorry, madam. May I see the stain, so I can note the details?";
const t3b =
  "I understand, madam. Dry cleaning and compensation are my manager's decision, so let me check with her now.";

const lesson3 = L(33, 3, "Let Me Check With My Supervisor", "Để tôi hỏi giám sát", {
  vocabulary: [
    c("Compensation", "Compensation is always the manager's decision.", [
      "/ˌkɒmpenˈseɪʃn/",
      "Sự bồi thường",
      "💰",
    ]),
    c("Stain", "The massage oil left a stain on her dress.", ["/steɪn/", "Vết bẩn, vết ố", "🟤"]),
    c("Dry cleaning", "Silk usually needs dry cleaning, not washing.", [
      "/ˌdraɪ ˈkliːnɪŋ/",
      "Giặt khô",
      "👗",
    ]),
    c("Lost property", "Please check lost property before you call security.", [
      "/ˌlɒst ˈprɒpəti/",
      "Đồ thất lạc; nơi giữ đồ thất lạc",
      "🧳",
    ]),
  ],
  grammar: [
    g(
      "I ask boss, later I tell you.",
      "Let me check with my supervisor, and I will come back to you within the hour.",
      "'Let me' + động từ nguyên mẫu, không có 'to'. Xin ý kiến cấp trên luôn kèm một mốc quay lại: 'within the hour'.",
      "Let me to check with my supervisor, and I will come back to you within the hour.",
    ),
    g(
      "Money for dress? Maybe yes.",
      "I am not able to offer compensation, but my manager will call you today.",
      "'not able to' + động từ nguyên mẫu ('offer'). Nói rõ giới hạn của mình, rồi nói ai làm gì tiếp.",
      "I am not able to offering compensation, but my manager will call you today.",
    ),
  ],
  speaking: [
    sp(
      "Look! The massage oil left a stain on my silk dress.",
      t3a,
      "Xin lỗi, rồi xin xem vết dầu để ghi lại chi tiết — chưa hứa gì về tiền.",
    ),
    sp(
      "It is a very expensive dress. Who will pay for the dry cleaning?",
      t3b,
      "Tiền giặt khô hay bồi thường đều là quyết định của quản lý. Nói rõ điều đó, rồi hỏi ngay.",
      undefined,
      undefined,
      t3a,
    ),
    {
      ...sp(
        "And how long will that take?",
        "I will come back to you within the hour, madam, with my manager's answer.",
        "Không hứa thay quản lý; hứa điều bạn làm được: quay lại kèm một mốc giờ.",
        undefined,
        undefined,
        t3b,
      ),
      alsoAccept: [
        "I will come back to you within the hour, madam, with an answer from my manager.",
      ],
    },
    risk({
      ...sp(
        "My gold bracelet is missing from my locker. You must pay for it!",
        "I am very sorry, madam. Let me check lost property first, and I will call my manager now.",
        "Đồ mất trong tủ: không hứa đền. Kiểm tra nơi giữ đồ thất lạc trước, rồi gọi quản lý.",
        undefined,
        ["check", "lost", "property", "first", "call", "manager"],
      ),
      alsoAccept: [
        "I am very sorry, madam. I will check lost property first, and I will call my manager now.",
        "I am sorry, madam. Let me check lost property first, and then I will call my manager now.",
      ],
    }),
    risk({
      ...sp(
        "I want compensation for my dress right now.",
        "I am sorry, madam. I cannot offer compensation, but my manager will call you today.",
        "Khách đòi bồi thường ngay: bạn không có quyền đưa ra. Nói rõ giới hạn, rồi nói ai gọi lại và khi nào.",
        undefined,
        ["offer", "compensation", "manager", "call"],
      ),
      alsoAccept: [
        "I am very sorry, madam. I cannot offer compensation, but my manager will call you today.",
        "I am sorry, madam. I am not able to offer compensation, but my manager will call you today.",
      ],
    }),
    sp(
      "A guest is asking about compensation for her dress. What did you tell her?",
      "I said compensation is your decision, and I promised to come back to her within the hour.",
      "Báo cáo cho quản lý: bạn đã nói gì, và đã hứa gì. Nói với cấp trên thì không dùng madam.",
      "manager",
    ),
  ],
  reading: read(
    `After a hot stone massage, Mrs Novak finds a dark stain of oil on her silk dress. She comes to the desk, and she is very upset. Khanh says she is very sorry, and she asks to see the stain, so she can note the details. Mrs Novak asks who will pay for the dry cleaning. Khanh does not say yes, and she does not say no. She explains that compensation is her manager's decision, and she says she will come back within the hour. Then she calls her manager. Forty minutes later, the manager meets Mrs Novak in the relaxation area. She offers to send the dress for dry cleaning at the hotel's cost. On the same afternoon, another guest says her gold bracelet is missing from her locker. Khanh checks lost property first. The bracelet is not there, so she calls her manager and security. She does not promise the guest any money.`,
    [
      {
        q: "Khi khách hỏi ai trả tiền giặt khô, Khánh nói gì?",
        options: [
          "Khách sạn sẽ trả toàn bộ tiền giặt khô",
          "Bồi thường là quyết định của quản lý",
          "Khách nên tự mang váy đi giặt",
        ],
        correct: 1,
        explanation:
          "'She explains that compensation is her manager's decision' — nhân viên quầy không tự hứa tiền.",
      },
      {
        q: "Ai đề nghị gửi váy đi giặt khô bằng chi phí của khách sạn?",
        options: [
          "Khánh, ngay khi thấy vết dầu",
          "Bộ phận giặt là của khách sạn",
          "Quản lý, sau khi gặp khách",
        ],
        correct: 2,
        explanation:
          "'the manager meets Mrs Novak… She offers to send the dress for dry cleaning at the hotel's cost.'",
      },
      {
        q: "Khi vị khách thứ hai báo mất vòng tay, Khánh làm gì trước tiên?",
        options: [
          "Kiểm tra nơi giữ đồ thất lạc",
          "Hứa khách sạn sẽ đền chiếc vòng",
          "Hỏi khách vòng tay giá bao nhiêu",
        ],
        correct: 0,
        explanation:
          "'Khanh checks lost property first. The bracelet is not there, so she calls her manager and security.'",
      },
    ],
  ),
  game: [
    game(
      "Your oil ruined my dress. I want compensation now.",
      "I am very sorry, madam. Compensation is my manager's decision, so let me check with her now.",
      "I am very sorry, madam. Compensation is my manager decision, so let me check with her now.",
      "I am very sorry, madam. The hotel will pay for a new dress, so please send me the receipt.",
      undefined,
      "Câu thứ hai thiếu sở hữu cách: 'my manager's decision'. Câu thứ ba lịch sự nhưng tự hứa tiền thay quản lý — một lời hứa không ai duyệt. Câu đúng nói rõ ai quyết và hỏi ngay.",
    ),
    game(
      "What did you promise the guest about her bracelet?",
      "Nothing about money. I checked lost property and called security.",
      "Nothing about money. I checked lost property and call security yesterday.",
      "I told her the hotel would pay for it, so she is happy now.",
      "manager",
      "Câu thứ hai lẫn thì: 'checked' rồi lại 'call' cho cùng một việc đã xong. Câu thứ ba đúng ngữ pháp nhưng đã hứa đền tiền — quyết định đó không thuộc về nhân viên quầy. Câu đúng báo đúng việc đã làm và không hứa tiền.",
    ),
  ],
});

// ── Lesson 4 — An injury is not a dispute ──────────────────────────────
const t4a = "I will stop now, madam, and clean the burn with cool water straight away.";
const t4b = "I am not sure, madam. The hotel nurse is coming now, and I will stay with you.";

const lesson4 = L(33, 4, "An Injury Is Not a Dispute", "Thương tích không phải là tranh chấp", {
  vocabulary: [
    c("Burn", "A hot stone can cause a burn if it is too hot.", [
      "/bɜːn/",
      "Vết bỏng; làm bỏng",
      "🔥",
    ]),
    c("Fault", "We never talk about fault at the treatment bed.", [
      "/fɔːlt/",
      "Lỗi, trách nhiệm (về một sự cố)",
      "❌",
    ]),
    c("Stay with the guest", "Please stay with the guest until the nurse comes.", [
      "/ˌsteɪ wɪð ðə ˈɡest/",
      "Ở lại bên khách (không để khách một mình)",
      "🧍",
    ]),
    c("In writing", "The manager will reply to the guest in writing.", [
      "/ɪn ˈraɪtɪŋ/",
      "Bằng văn bản",
      "✍️",
    ]),
    c("Follow up", "My manager will follow up with you tomorrow.", [
      "/ˌfɒləʊ ˈʌp/",
      "Liên hệ lại, theo dõi tiếp",
      "📞",
    ]),
  ],
  grammar: [
    g(
      "Thanks you tell us.",
      "Thank you for telling us, sir. Your feedback helps us improve.",
      "Bước T — Thank: 'Thank you for + V-ing'. Sau giới từ 'for' là V-ing, không phải động từ nguyên mẫu.",
      "Thank you for tell us, sir. Your feedback helps us improve.",
    ),
    g(
      "Manager write you tomorrow.",
      "My manager will follow up with you in writing tomorrow.",
      "Sau 'will' là động từ nguyên mẫu: 'will follow up', không thêm -s.",
      "My manager will follows up with you in writing tomorrow.",
    ),
  ],
  speaking: [
    risk({
      ...sp(
        "Ouch! That stone is burning my back!",
        t4a,
        "Bỏng là chuyện an toàn, không phải khiếu nại: dừng ngay, làm mát vết bỏng bằng nước mát.",
        undefined,
        ["stop", "clean", "burn", "cool", "water", "straight", "away"],
      ),
      alsoAccept: [
        "I will stop the treatment now, madam, and clean the burn with cool water straight away.",
        "I will stop now and clean the burn with cool water straight away, madam.",
      ],
    }),
    risk({
      ...sp(
        "It really hurts. Is it serious?",
        t4b,
        "Không chẩn đoán. Trấn an bằng một việc và một mốc: y tá đang tới ngay, và bạn ở lại với khách.",
        undefined,
        ["hotel", "nurse", "stay"],
        t4a,
      ),
      alsoAccept: [
        "I am not sure, madam. The hotel nurse is coming now, and I will stay here with you.",
        "I cannot say, madam. The hotel nurse is coming now, and I will stay with you.",
      ],
    }),
    sp(
      "This is your fault. Who is going to pay for this?",
      "I am so sorry you are hurt, madam. The nurse comes first, and my manager will speak with you later.",
      "Không nhận lỗi, không bàn tiền bên giường trị liệu. Y tá trước, quản lý nói chuyện sau.",
      undefined,
      undefined,
      t4b,
    ),
    risk({
      ...sp(
        "I heard a guest shout in room four. What do you need?",
        "Please stay with the guest, and I will call the hotel nurse now.",
        "Nói với đồng nghiệp — không dùng sir hay madam. Một người ở lại bên khách, một người gọi y tá.",
        "colleague",
        ["stay", "guest", "call", "hotel", "nurse"],
      ),
      alsoAccept: [
        "Please stay with the guest. I will call the hotel nurse now.",
        "Please stay with the guest while I call the hotel nurse now.",
      ],
    }),
    sp(
      "Did you tell the guest it was our fault?",
      "No. I did not talk about fault or money, and I stayed with her until the nurse came.",
      "Báo cáo cho quản lý: không nói chuyện lỗi hay tiền; bạn đã ở lại với khách.",
      "manager",
    ),
    {
      ...sp(
        "Will anyone follow up about my back?",
        "Yes, madam. My manager will follow up with you in writing today, and thank you for telling us.",
        "Bước T — Thank: nói ai liên hệ lại, bằng cách nào, khi nào — rồi cảm ơn khách đã cho biết.",
      ),
      alsoAccept: [
        "Yes, madam. My manager will follow up with you in writing today. Thank you for telling us.",
      ],
    },
    sp(
      "Can I book another massage for tomorrow?",
      "The nurse will give you aftercare advice first, madam, and please avoid any heat on the burn.",
      "Sau một vết bỏng, y tá dặn trước rồi mới đặt liệu trình mới. Lời dặn của bạn: tránh nhiệt.",
    ),
  ],
  reading: read(
    `During a hot stone massage, Mrs Tran suddenly cries out. One stone is too hot, and there is a red burn on her back. Her therapist, Vy, does not argue and does not explain. She stops at once, and she cleans the burn with cool water. She presses the call button, and her colleague comes in. Vy asks the colleague to stay with the guest while she calls the hotel nurse. The nurse arrives in a few minutes and looks at the burn. Mrs Tran is angry. She says it is the spa's fault, and she asks who will pay. Vy does not talk about fault or money. She says she is very sorry that Mrs Tran is hurt, and that the manager will speak with her after the nurse. Vy writes an incident report straight away. The next morning, the spa manager follows up with Mrs Tran in writing. She thanks her for telling the spa, and she invites her to a meeting.`,
    [
      {
        q: "Việc đầu tiên Vy làm khi khách bị bỏng là gì?",
        options: [
          "Giải thích vì sao đá bị quá nóng",
          "Gọi quản lý đến xin lỗi khách",
          "Dừng ngay, làm mát vết bỏng",
        ],
        correct: 2,
        explanation:
          "'She stops at once, and she cleans the burn with cool water' — an toàn trước, giải thích sau.",
      },
      {
        q: "Khi khách nói đó là lỗi của spa và hỏi ai trả tiền, Vy làm gì?",
        options: [
          "Nhận lỗi ngay để khách bớt giận hơn",
          "Hứa spa sẽ trả mọi chi phí cho khách",
          "Không bàn lỗi hay tiền, chờ quản lý",
        ],
        correct: 2,
        explanation:
          "'Vy does not talk about fault or money… the manager will speak with her after the nurse.'",
      },
      {
        q: "Sáng hôm sau, quản lý spa làm gì?",
        options: [
          "Gọi điện để hỏi khách có muốn đổi liệu trình",
          "Liên hệ lại bằng văn bản và mời gặp",
          "Gửi hoá đơn đã giảm giá cho khách",
        ],
        correct: 1,
        explanation:
          "'the spa manager follows up with Mrs Tran in writing. She thanks her… and she invites her to a meeting.'",
      },
    ],
  ),
  game: [
    game(
      "Ouch! The stone is too hot!",
      "I will stop now, madam, and clean the burn with cool water.",
      "I will stopping now, madam, and clean the burn with cool water.",
      "I am sorry, madam. Please stay calm. It is only a small burn, and it is not serious at all.",
      undefined,
      "Câu thứ hai sai dạng: sau 'will' là động từ nguyên mẫu 'stop'. Câu thứ ba bảo khách bình tĩnh và tự kết luận 'không nghiêm trọng' — nhân viên không chẩn đoán, và trấn an phải bằng một việc cụ thể. Câu đúng dừng ngay và làm mát vết bỏng.",
    ),
    game(
      "Is the hotel going to pay for my burn?",
      "My manager will speak with you about that, madam. Right now, the nurse comes first.",
      "My manager will speaks with you about that, madam. Right now, the nurse comes first.",
      "Yes, madam. It was our fault, so we will pay for everything, of course.",
      undefined,
      "Câu thứ hai sai dạng: sau 'will' không thêm -s ('will speak'). Câu thứ ba nhận lỗi và hứa tiền ngay bên giường trị liệu — cả hai đều không phải việc của kỹ thuật viên. Câu đúng chuyển chuyện tiền cho quản lý và giữ ưu tiên là y tá.",
    ),
  ],
});

export const week: AuthoredWeek = {
  title: { en: "Disputes and Compensation", vi: "Tranh chấp và bồi thường" },
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: xử lý khiếu nại đủ bốn bước LAST — lắng nghe và hỏi chi tiết, xin lỗi mà không kết luận lỗi, giải quyết trong phạm vi chính sách ('Our policy allows… up to…') rồi 'Let me check with my supervisor' kèm mốc quay lại, cảm ơn khách — và khi khách bị bỏng thì dừng, làm mát, gọi y tá, ở lại bên khách, không bàn lỗi hay tiền.",
};
