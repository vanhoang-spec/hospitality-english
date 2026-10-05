// FB week 32 — Personalised Advice (hand-authored Phase 4, see ../kit.ts).
//
// Advice that starts from the guest, not from the menu: "Based on your
// flight…", "Since you mentioned the fish…". Four tables: the returning guest
// (the preference card read as a question, never as a verdict), the table that
// needs pace and discretion, the wine list where the price is pointed at and
// never read aloud, and the guest who says "surprise me".
//
// Kept from the earlier week because the floor managers rated it: the card
// records facts, not opinions; what a guest discusses stays at the table; a
// "surprise me" table is trust, not a wallet, and the allergy question comes
// before anything is chosen. Fixed: every detail a model answer says is now in
// the guest's own line, so the turn tests advice, not memory of a card the
// learner never saw; and a request about another guest is refused.
import type { GameRound, SpeakingItem } from "../../week-content";
import { g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("FB");
const L = lessonsFor("FB");
/** The turn plus the other wordings the course accepts for it. */
const also = (s: SpeakingItem, alts: string[]): SpeakingItem => ({ ...s, alsoAccept: alts });
/** One arcade round: the right answer at index `at`, the broken-English option
 *  (`form`) and the correct-English-wrong-job option (`register`) around it. */
function round(
  prompt: string,
  right: string,
  form: string,
  register: string,
  explanation: string,
  at: 0 | 1 | 2,
  speakerRole?: GameRound["speakerRole"],
): GameRound {
  const options: GameRound["options"] = [
    { text: form, correct: false, kind: "form" },
    { text: register, correct: false, kind: "register" },
  ];
  options.splice(at, 0, { text: right, correct: true, kind: "answer" });
  return { ...(speakerRole ? { speakerRole } : {}), prompt, options, explanation };
}

// ── Lesson 1 — the guest who has been here before ────────────────────────────
const t1a = "Of course, madam — welcome back. Would you like the same table as on your last visit?";
const t1b = "We do, madam. Your usual order is on your preference card, so the tea is coming now.";
const t1c =
  "Since you enjoyed the sea bass, madam, may I suggest the fish of the day? It is in season.";

const lesson1 = L(32, 1, "The Guest Who Has Been Here Before", "Vị khách đã từng đến", {
  vocabulary: [
    c("Usual order", "Your usual order to start, sir — jasmine tea while you read the menu?"),
    c("Preference card", "The preference card says the guest takes no coriander.", [
      "/ˈprefrəns kɑːd/",
      "Thẻ ghi sở thích của khách quen",
      "🗂️",
    ]),
    c("Last visit", "On your last visit you enjoyed the sea bass, madam.", [
      "/lɑːst ˈvɪzɪt/",
      "Lần ghé trước của khách",
      "📅",
    ]),
    c("Recognise", "I recognised the guest from her last visit and greeted her by name.", [
      "/ˈrekəɡnaɪz/",
      "Nhận ra (một vị khách quen)",
      "👀",
    ]),
  ],
  grammar: [
    g(
      "I know what you want already.",
      "On your last visit you enjoyed the sea bass, madam. Shall I bring it again?",
      "Nhắc lần trước bằng quá khứ đơn 'you enjoyed' (có -ed), rồi hỏi lại bằng 'Shall I…?' — trí nhớ dùng để phục vụ, không để quyết định thay khách.",
      "On your last visit you enjoy the sea bass, madam. Shall I bring it again?",
    ),
    g(
      "Card say no coriander. So no coriander.",
      "Since you mentioned it last time, madam, shall I leave out the coriander again?",
      "'Since you mentioned…' (vì lần trước chị đã nói…) dùng quá khứ đơn, có -ed. Ghi chú trên thẻ được nói thành câu hỏi, vì khẩu vị có thể đã đổi.",
      "Since you mention it last time, madam, shall I leave out the coriander again?",
    ),
  ],
  speaking: [
    also(
      sp(
        "Oh, you remembered us! We came here in March.",
        t1a,
        "Chào mừng khách quay lại, rồi biến trí nhớ thành câu hỏi bằng 'Would you like'. Khách vẫn là người chọn.",
      ),
      ["Of course, madam — welcome back. Would you like the same table as last time?"],
    ),
    sp(
      "Yes, please. Do you still have my usual order on file — the jasmine tea?",
      t1b,
      "Khách đã nói món trà nên bạn chỉ cần xác nhận: 'usual order', 'preference card', rồi ', so' + việc đang làm.",
      undefined,
      undefined,
      t1a,
    ),
    also(
      sp(
        "Lovely. Last time I had the sea bass, but tonight I want something new.",
        t1c,
        "Khung của tuần (Since you enjoyed) — gợi ý đi từ điều khách vừa kể. Câu sau là lý do ngắn: 'in season'.",
        undefined,
        undefined,
        t1b,
      ),
      [
        "Since you enjoyed the sea bass, madam, may I recommend the fish of the day? It is in season.",
      ],
    ),
    sp(
      "How did you know I take my coffee without sugar?",
      "It is on your preference card, sir. We noted it on your last visit.",
      "Trả lời thật và nhẹ nhàng: thông tin đến từ 'preference card'. Không đùa 'đoán may', không khoe hệ thống.",
    ),
    sp(
      "Is that the guest from last month? I am not completely sure it is him.",
      "If you do not recognise him for sure, greet him warmly and do not use his name.",
      "Nói với đồng nghiệp: không sir/madam. Gọi sai tên khách tệ hơn không gọi tên — chưa chắc thì chào ấm áp là đủ.",
      "colleague",
    ),
    also(
      sp(
        "Please do not make a fuss. I prefer to be just another guest tonight.",
        "Of course, sir. I will note that on your preference card, and we will keep everything simple.",
        "Có khách thích được nhận ra, có khách muốn riêng tư. Làm theo khách và ghi lại điều đó cho lần sau.",
      ),
      [
        "Of course, sir. I will write that on your preference card, and we will keep everything simple.",
      ],
    ),
  ],
  reading: read(
    `PREFERENCE CARDS — HOW A RESTAURANT REMEMBERS
Before the shift, read the reservation book against the preference cards. A returning guest is greeted by name once, at the door — not at every visit to the table.
A card records facts the guest showed us: "no coriander", "window table", "tea before ordering". It never records opinions. Write "asked for the bill twice", never "impatient".
Use the card as a question, not a verdict. Tastes change, so "Still no coriander, madam?" takes two seconds and saves a dish coming back.
If you are not sure you recognise a guest, do not guess a name. A warm "Good evening, welcome" is never wrong, and a wrong name is hard to take back.
Some guests love being known; others want to be left alone. Follow the guest, not the card, and write down what you learn. If a guest asks how we knew something, say it plainly: "It is on your preference card from your last visit." Honesty sounds like care. A clever answer sounds like someone is watching.`,
    [
      {
        q: "Thẻ preference card được ghi những gì?",
        options: [
          "Nhận xét của nhân viên về tính cách của khách",
          "Sự thật khách thể hiện, như 'không rau mùi'",
          "Dự đoán những món khách sẽ gọi trong lần tới",
        ],
        correct: 1,
        explanation:
          "'A card records facts the guest showed us… It never records opinions.' Ghi 'asked for the bill twice', không bao giờ ghi 'impatient'.",
      },
      {
        q: "Không chắc đã nhận ra khách thì người phục vụ làm gì?",
        options: [
          "Đoán một cái tên gần đúng để khách thấy được quan tâm",
          "Hỏi thẳng khách đã từng đến nhà hàng bao nhiêu lần",
          "Chào ấm áp, không đoán tên",
        ],
        correct: 2,
        explanation:
          "'do not guess a name. A warm Good evening, welcome is never wrong, and a wrong name is hard to take back.'",
      },
      {
        q: "Khách hỏi vì sao nhà hàng biết sở thích của mình, nên trả lời thế nào?",
        options: [
          "Nói thật: thông tin có trong thẻ từ lần trước",
          "Nói đùa rằng nhân viên đoán rất giỏi",
          "Nói hệ thống ghi lại mọi thứ khách từng gọi",
        ],
        correct: 0,
        explanation:
          "'say it plainly: It is on your preference card from your last visit.' Câu trả lời 'khéo' nghe như có người đang theo dõi khách.",
      },
    ],
  ),
  game: [
    round(
      "How on earth did you know I always drink sparkling water?",
      "We noted it on your last visit, madam. Still sparkling tonight?",
      "We note it on your last visit, madam. Still sparkling tonight?",
      "Our system records everything every guest has ever ordered here, madam.",
      "'We note it on your last visit' sai thì: chuyện lần trước phải dùng quá khứ 'noted'. 'Our system records everything every guest has ever ordered' đúng ngữ pháp nhưng làm khách thấy bị theo dõi. Đáp án nói thật nguồn thông tin, rồi hỏi lại vì khẩu vị có thể đã đổi.",
      0,
    ),
    round(
      "The card says table four hates coriander. I will just leave it out without asking.",
      "Ask first — tastes change, and most guests like to be asked.",
      "Ask first — tastes changes, and most guest like to be asked.",
      "Good, and write 'difficult guest' on the card so the next shift knows.",
      "'tastes changes… most guest' sai số ít/số nhiều: 'tastes change', 'most guests'. Câu 'write difficult guest on the card' đúng tiếng Anh nhưng ghi nhận xét thay cho sự thật — thẻ chỉ ghi điều khách thể hiện. Đáp án dùng thẻ như một câu hỏi.",
      2,
      "colleague",
    ),
  ],
});

// ── Lesson 2 — reading the table ─────────────────────────────────────────────
const t2a =
  "Of course, sir. For a business dinner I will be discreet, and I will only come to the table when you look up.";
const t2b =
  "Since you are in no hurry, sir, I will pace the courses slowly and refill your glasses quietly.";
const t2c =
  "Thank you, sir. I will tell the kitchen now, and I will ask your guest about allergies before you order.";

const lesson2 = L(32, 2, "Reading the Table", "Đọc bàn khách", {
  vocabulary: [
    c("Based on", "Based on your time, I would suggest the set lunch.", [
      "/beɪst ɒn/",
      "Dựa trên… — mở đầu lời tư vấn theo hoàn cảnh khách",
      "🧭",
    ]),
    c("Business dinner", "Service stays quiet and quick at a business dinner.", [
      "/ˈbɪznəs ˈdɪnə/",
      "Bữa tối bàn công việc",
      "💼",
    ]),
    c("Dining pace", "May I ask what dining pace you would like tonight?"),
    c("Discreet", "Be discreet when a table is deep in conversation.", [
      "/dɪˈskriːt/",
      "Kín đáo, ý tứ",
      "🤫",
    ]),
    c("In no hurry", "We are in no hurry, so the courses can come slowly.", [
      "/ɪn nəʊ ˈhʌri/",
      "Không vội, thong thả",
      "🐢",
    ]),
  ],
  grammar: [
    g(
      "Order now please, kitchen closing soon.",
      "Based on your time, I would suggest dishes that come out quickly.",
      "'Based on + danh từ, I would suggest…' — lời khuyên đi từ hoàn cảnh CỦA KHÁCH, không từ lịch của bếp. 'dishes that come' — chủ ngữ số nhiều, không thêm -s.",
      "Based on your time, I would suggest dishes that comes out quickly.",
    ),
    g(
      "You want food fast or slow?",
      "Shall I bring the courses together, or pace them through the evening?",
      "Câu hỏi lựa chọn với 'or' trao quyền đặt nhịp bữa ăn cho khách. Sau 'Shall I' là động từ nguyên mẫu.",
      "Shall I bringing the courses together, or pace them through the evening?",
    ),
  ],
  speaking: [
    also(
      sp(
        "We are here for a business dinner. We need to talk, not to be interrupted.",
        t2a,
        "Hứa đúng điều khách cần: 'discreet', và một tín hiệu cụ thể — bạn chỉ tới bàn khi khách ngẩng lên.",
      ),
      [
        "Of course, sir. For a business dinner I will be discreet, and I will come to the table only when you look up.",
      ],
    ),
    also(
      sp(
        "Good. And the food? We are in no hurry.",
        t2b,
        "Khung của tuần (Since you are) nhắc lại đúng điều khách nói ('in no hurry'), rồi hai việc bạn sẽ làm.",
        undefined,
        undefined,
        t2a,
      ),
      [
        "Since you are in no hurry, sir, I will pace the courses slowly and refill your glasses without a word.",
      ],
    ),
    sp(
      "One of my guests does not eat beef, and I am not sure about anything else.",
      t2c,
      "Ghi điều khách đã nói cho bếp, rồi hỏi dị ứng trực tiếp người sẽ ăn — kín đáo, trước khi gọi món.",
      undefined,
      ["kitchen", "allergies"],
      t2b,
    ),
    also(
      sp(
        "We have a flight at nine, but we would love to try the tasting menu.",
        "Based on your flight, sir, may I suggest the shorter tasting menu? It comes out faster.",
        "'Based on your flight' — lời khuyên xuất phát từ lịch của khách. Không hứa giờ thay bếp, chỉ nói món ra nhanh hơn.",
      ),
      ["Based on your flight, sir, may I recommend the shorter tasting menu? It comes out faster."],
    ),
    sp(
      "It is the first evening of our holiday. We want to take everything slowly.",
      "Then you are in the right place, madam. I will set a gentle dining pace, and the evening is yours.",
      "Đọc 'dining pace' liền một cụm. Nói chậm đúng như điều bạn hứa — nhịp nói của bạn là lời cam kết đầu tiên.",
    ),
    risk(
      also(
        sp(
          "Was my business partner here last night? Who was he having dinner with?",
          "I am sorry, sir, I cannot talk about other guests. How may I help you tonight?",
          "Riêng tư: không xác nhận khách khác có đến, không kể ai ngồi với ai. Từ chối một câu, rồi quay về bàn của chính vị khách này.",
        ),
        [
          "I am sorry, sir, but I cannot talk about other guests. How may I help you tonight?",
          "I am afraid I cannot talk about other guests, sir. How may I help you tonight?",
        ],
      ),
    ),
  ],
  reading: read(
    `READING THE TABLE — SIGNALS BEFORE WORDS
Every table tells you something before anyone speaks. Good advice starts there.
Laptops or papers on the table mean a working meal. Serve from the side away from the documents, keep refills silent, and never interrupt a sentence. Wait for a pause, then offer.
A guest dining alone is a guest, not a problem. Never say "Just one?". Offer the seat with the view, and check back as often as at any other table.
Menus closed and eyes up: the table is ready to order. Two menus still open after a long time: offer help with "May I answer anything about the menu?"
Ask about pace as well as food. A table with a flight wants speed; a table on holiday wants time. Then advise from what you notice: "Based on your time, I would suggest…" turns a guess into service.
And what you notice stays at the table. What guests discuss, and who dines with whom, is never repeated. Not to other guests, not to callers, and not even to colleagues who are only curious.`,
    [
      {
        q: "Bàn có laptop và giấy tờ thì phục vụ thế nào?",
        options: [
          "Rót nước lặng lẽ, chờ khách ngừng nói",
          "Mời món ngay để khách không phải chờ lâu hơn nữa",
          "Đề nghị khách dọn bớt giấy tờ để bày món ăn ra",
        ],
        correct: 0,
        explanation:
          "'keep refills silent, and never interrupt a sentence. Wait for a pause, then offer.'",
      },
      {
        q: "Vì sao phải hỏi về nhịp độ bữa ăn chứ không chỉ hỏi món?",
        options: [
          "Vì bếp cần biết trước để chia ca cho nhân viên",
          "Vì mỗi bàn cần một nhịp khác nhau",
          "Vì khách đi máy bay luôn muốn gọi ít món hơn",
        ],
        correct: 1,
        explanation:
          "'A table with a flight wants speed; a table on holiday wants time.' Nhịp độ cũng là một phần của lời tư vấn.",
      },
      {
        q: "Một người gọi tới hỏi tối qua ai ăn tối cùng một vị khách. Theo bài, nhân viên làm gì?",
        options: [
          "Kể lại nếu người hỏi là đồng nghiệp của vị khách đó",
          "Chỉ nói tên, không kể nội dung câu chuyện của bàn",
          "Không kể gì cả",
        ],
        correct: 2,
        explanation:
          "'who dines with whom, is never repeated. Not to other guests, not to callers, and not even to colleagues.'",
      },
    ],
  ),
  game: [
    round(
      "We are celebrating a deal, but we still have emails to send tonight.",
      "Then shall I bring the courses quickly, sir, and coffee straight after?",
      "Then shall I brings the courses quickly, sir, and coffee straight after?",
      "Then I will bring our full tasting menu, sir, so you can celebrate this properly tonight.",
      "'shall I brings' sai: sau 'shall' là động từ nguyên mẫu 'bring'. Câu mang cả thực đơn nếm thử đúng ngữ pháp nhưng bỏ qua điều khách vừa nói — họ còn việc phải làm. Đáp án đọc đúng hoàn cảnh và hỏi lại nhịp độ.",
      1,
    ),
    round(
      "Who was the lady with Mr. Chen at table five last night?",
      "I am sorry, madam, I cannot talk about other guests.",
      "I am sorry, madam, I cannot talking about other guests.",
      "I did not see her face, madam, but she came in just after he did.",
      "'cannot talking' sai: sau 'cannot' là động từ nguyên mẫu 'talk'. Câu 'I did not see her face… she came in just after he did' đúng tiếng Anh nhưng vẫn kể chuyện của khách khác. Đáp án từ chối ngắn gọn, không xác nhận gì.",
      2,
    ),
  ],
});

// ── Lesson 3 — wine without reading the price aloud ─────────────────────────
const t3a =
  "Then I would suggest our house wine, madam. The white is dry and light, and it goes with most dishes.";
const t3b = "It is good, madam. Our sommelier chose it, and guests are often delighted by it.";
const t3c = "Then a half bottle may suit you, madam, and I can bring a soft drink for the driver.";

const lesson3 = L(
  32,
  3,
  "Wine Without Reading the Price Aloud",
  "Tư vấn vang — không đọc giá thành tiếng",
  {
    vocabulary: [
      c("Since you mentioned", "Since you mentioned the fish, a dry white would suit it nicely.", [
        "/sɪns juː ˈmenʃənd/",
        "Vì anh/chị đã nói… — mở đầu lời tư vấn theo điều khách kể",
        "💬",
      ]),
      c("House wine", "The house wine is a friendly choice for a relaxed dinner.", [
        "/haʊs waɪn/",
        "Vang nhà — lựa chọn phổ thông, giá dễ chịu",
        "🍷",
      ]),
      c("Dry", "A dry white goes well with grilled fish.", [
        "/draɪ/",
        "(Vang) khô, không ngọt",
        "🍾",
      ]),
      c("Full-bodied", "This red is full-bodied, so it suits the steak.", [
        "/ˌfʊl ˈbɒdid/",
        "(Vang) đậm, nhiều tầng vị",
        "🍇",
      ]),
      c("Half bottle", "A half bottle lets you try a wine without ordering a full one.", [
        "/hɑːf ˈbɒtl/",
        "Chai vang nhỏ, bằng nửa chai thường",
        "🫙",
      ]),
    ],
    grammar: [
      g(
        "That wine is three million dong, you know.",
        "A lovely choice, sir. May I also show you two other wines on this page?",
        "Giá rượu không đọc thành tiếng trước bàn — chỉ tay trên danh sách để con số tự nói. 'two other wines' — số nhiều có -s.",
        "A lovely choice, sir. May I also show you two other wine on this page?",
      ),
      g(
        "You don't know wine? Then take the house wine.",
        "Since you mentioned the fish, madam, a dry white would go nicely with it.",
        "'Since you mentioned…' (quá khứ, có -ed): lời tư vấn đi từ điều khách vừa nói, không đi từ chai đắt nhất danh sách.",
        "Since you mention the fish, madam, a dry white would go nicely with it.",
      ),
    ],
    speaking: [
      also(
        sp(
          "Which wine should we have? Nothing too fancy — we are not experts.",
          t3a,
          "Gợi ý vang nhà một cách tự tin, không xin lỗi vì nó rẻ: gọi tên ('house wine'), rồi tả vị bằng 'dry' và 'light'.",
        ),
        [
          "Then I would recommend our house wine, madam. The white is dry and light, and it goes with most dishes.",
        ],
      ),
      sp(
        "Is it good, though? Or just cheap?",
        t3b,
        "Bảo vệ lựa chọn của khách bằng một sự thật ('Our sommelier chose it') và một tính từ cảm xúc ('delighted').",
        undefined,
        ["sommelier"],
        t3a,
      ),
      also(
        sp(
          "We are only two, and one of us has to drive later.",
          t3c,
          "Phục vụ rượu có trách nhiệm: gợi ý 'half bottle', và một đồ uống không cồn cho người lái xe — không bình luận, không giảng giải.",
          undefined,
          undefined,
          t3b,
        ),
        [
          "Then a half bottle may suit you, madam, and I can bring a soft drink for the driver too.",
        ],
      ),
      also(
        sp(
          "We love big red wines. What goes with the steak?",
          "Since you mentioned the steak, sir, a full-bodied red would suit it well.",
          "Khung của tuần: 'Since you mentioned' nhắc lại món khách nói, rồi gợi ý loại vang bằng 'full-bodied'.",
        ),
        ["Since you mentioned the steak, sir, I would suggest a full-bodied red."],
      ),
      sp(
        "We want something special — but between us, not at a crazy price.",
        "Understood, sir. May I show you this part of the list? These two wines are lovely and well priced.",
        "Kín đáo về tiền: không đọc con số, chỉ tay vào một phần của danh sách. Hạ giọng một chút khi nói.",
      ),
      risk(
        also(
          sp(
            "This bottle is far too expensive. Can you give us a better price?",
            "I cannot change the price, sir. May I check with my manager, or show you a half bottle?",
            "Giá không phải quyền của bạn: nói rõ một câu, rồi hai lối đi — hỏi quản lý hoặc gợi ý 'half bottle'. Không tự giảm, không hứa.",
            undefined,
            ["price", "manager"],
          ),
          [
            "I am not able to change the price, sir. May I check with my manager, or show you a half bottle?",
            "I cannot change the price, sir. May I show you a half bottle, or check with my manager?",
          ],
        ),
      ),
    ],
    reading: read(
      `WINE AT THE TABLE — DISCRETION RULES
The list speaks the numbers. Point to the page and let the guest read the price. It is never said aloud across the table, because the host may be paying for guests who should not hear it.
Advise from what the guest has told you. "Since you mentioned the fish, a dry white would go nicely" is advice. "Our finest bottle is this one" is a sales speech.
There is no shame in the house wine. Recommend it by name and by taste, never with an apology. A guest who feels judged for the cheaper bottle does not come back.
A half bottle or a glass is a recommendation, not a downgrade. Offer it with the same pride as the grandest bottle, especially when someone at the table is driving.
Whoever ordered the bottle tastes first. Pour the taste, wait for the nod, then serve the table, finishing with the host.
Prices are set by the restaurant, not by the floor. If a guest asks for a better price, the answer belongs to your manager. Offer to ask, and offer a smaller bottle while you do.`,
      [
        {
          q: "Vì sao không đọc to giá rượu trước bàn?",
          options: [
            "Vì người chủ bàn có thể đang trả tiền cho khách mời",
            "Vì giá rượu thay đổi mỗi ngày nên dễ đọc sai số",
            "Vì khách nước ngoài không quen cách đọc tiền đồng",
          ],
          correct: 0,
          explanation:
            "'the host may be paying for guests who should not hear it' — chỉ vào danh sách để khách tự đọc.",
        },
        {
          q: "Theo bài, đâu là một lời TƯ VẤN, không phải lời chào hàng?",
          options: [
            "Giới thiệu ngay chai ngon nhất và đắt nhất trong hầm",
            "Đọc to ba chai bán chạy nhất tuần này cho cả bàn nghe",
            "Gợi ý vang trắng khô vì khách vừa nhắc món cá",
          ],
          correct: 2,
          explanation:
            "'Since you mentioned the fish, a dry white would go nicely is advice. Our finest bottle is this one is a sales speech.'",
        },
        {
          q: "Khách xin giá tốt hơn, người phục vụ làm gì?",
          options: [
            "Tự giảm một ít để giữ không khí vui vẻ cho bàn",
            "Đề nghị hỏi quản lý và gợi ý chai nhỏ hơn",
            "Giải thích rằng giá rượu ở đây đã là rẻ nhất phố",
          ],
          correct: 1,
          explanation:
            "'the answer belongs to your manager. Offer to ask, and offer a smaller bottle while you do.' Nhân viên sảnh không tự đổi giá.",
        },
      ],
    ),
    game: [
      round(
        "Honestly, the wine list scares me. What do people drink with the sea bass?",
        "Most guests choose a dry white with the sea bass, madam.",
        "Most guest choose a dry white with sea bass, madam.",
        "Our finest bottle is the Burgundy, madam — many guests tell us it is worth every single dong.",
        "'Most guest choose… with sea bass' sai số nhiều ('guests') và thiếu mạo từ 'the'. Câu giới thiệu chai Burgundy đúng ngữ pháp nhưng đẩy khách tới chai đắt nhất trong khi khách vừa nói mình sợ danh sách rượu. Đáp án tư vấn đơn giản, đúng món khách gọi.",
        2,
      ),
      round(
        "I think my wife's wine is corked. It smells strange.",
        "I am sorry, sir. I will ask the sommelier to check it now.",
        "I am sorry, sir. I will ask the sommelier check it now.",
        "That is how this wine is meant to smell, sir — it is a natural wine, so it is a little wild.",
        "'ask the sommelier check it' thiếu 'to': ask + người + to + động từ. Câu 'That is how this wine is meant to smell' đúng tiếng Anh nhưng tự phán thay chuyên gia và cãi khách. Đáp án nhận lời và đưa việc cho người có chuyên môn.",
        0,
      ),
    ],
  },
);

// ── Lesson 4 — when the guest says: you choose ───────────────────────────────
const t4a =
  "My personal favourite is the fish in a clay pot, sir. Is there anything you do not eat?";
const t4b = "Not at all, sir. It is braised with pepper and fish sauce, so it is rich, not hot.";
const t4c = "Since you are not very hungry, sir, one clay pot to share would be enough.";
const t4d = "With pleasure, sir. Does anyone at the table have an allergy?";
const t4e = "Then how adventurous shall I go, sir — something local and bold, or something gentle?";
const t4f =
  "Wonderful, sir. I will tell the chef this is a “surprise me” table, and he will choose with me.";

const lesson4 = L(32, 4, "When the Guest Says: You Choose", "Khi khách nói: bạn chọn giúp tôi", {
  vocabulary: [
    c("Personal favourite", "My personal favourite is the fish in a clay pot.", [
      "/ˈpɜːsənl ˈfeɪvərɪt/",
      "Món tôi thích nhất — lời tư vấn có dấu ấn riêng",
      "💛",
    ]),
    c("Surprise me", "When a guest says 'surprise me', ask one safety question first.", [
      "/səˈpraɪz miː/",
      "'Chọn giúp tôi đi' — khách trao quyền chọn món",
      "🎁",
    ]),
    c("Adventurous", "Are you feeling adventurous tonight, sir?", [
      "/ədˈventʃərəs/",
      "Thích thử món lạ",
      "🌶️",
    ]),
    c("Clay pot", "The fish is braised in a clay pot with pepper and fish sauce.", [
      "/ˈkleɪ pɒt/",
      "Nồi đất — món kho kiểu Việt",
      "🏺",
    ]),
  ],
  grammar: [
    g(
      "Everything on our menu is good.",
      "My personal favourite is the fish in a clay pot — I order it on my day off.",
      "'My personal favourite' + một chi tiết thật làm lời tư vấn đáng tin. Chủ ngữ số ít nên dùng 'is'. 'Everything is good' nghĩa là chưa tư vấn gì cả.",
      "My personal favourite are the fish in a clay pot — I order it on my day off.",
    ),
    g(
      "OK, I choose. You eat what comes out.",
      "Happily, madam. Before I choose, is there anything you do not eat?",
      "Nhận lời bằng 'Happily', rồi MỘT câu hỏi an toàn trước khi chọn. Với 'you' dùng 'do not', không dùng 'does not'.",
      "Happily, madam. Before I choose, is there anything you does not eat?",
    ),
  ],
  speaking: [
    also(
      sp(
        "We cannot decide at all. What would you eat, honestly?",
        t4a,
        "Nói món thật mình thích bằng 'My personal favourite', rồi hỏi ngay một câu an toàn trước khi khách gọi.",
      ),
      [
        "My personal favourite is the fish in a clay pot, sir. Is there anything you do not eat, though?",
      ],
    ),
    sp(
      "We eat everything! But is it very spicy?",
      t4b,
      "Trả lời đúng điều khách lo (cay), và nói thật thành phần: 'fish sauce'. Câu ghép với 'so' nói kết quả.",
      undefined,
      undefined,
      t4a,
    ),
    also(
      sp(
        "Sounds good. Is it a big dish? We are not very hungry tonight.",
        t4c,
        "Nhắc lại đúng lời khách (Since you are not very hungry); gợi ý gọi ít đi là lời tư vấn đáng tin nhất.",
        undefined,
        undefined,
        t4b,
      ),
      ["Since you are not very hungry, sir, one clay pot to share should be enough."],
    ),
    risk(
      also(
        sp(
          "Just bring us whatever the chef is proudest of tonight. Surprise us!",
          t4d,
          "Khách trao quyền chọn món thì câu đầu tiên luôn là câu hỏi dị ứng — trước mọi gợi ý.",
          undefined,
          ["table", "allergy"],
        ),
        [
          "Of course, sir. Does anyone at the table have an allergy?",
          "With pleasure. Does anyone at the table have an allergy, sir?",
        ],
      ),
    ),
    sp(
      "No allergies at all, and we eat everything!",
      t4e,
      "Câu hỏi thứ hai đo mức khách muốn thử món lạ ('adventurous'), và đưa một lựa chọn với 'or'.",
      undefined,
      undefined,
      t4d,
    ),
    also(
      sp(
        "Local and bold, please. We trust you.",
        t4f,
        "Báo bếp đây là bàn 'surprise me' — bếp trưởng có thể muốn gửi món riêng. Bạn và bếp cùng chọn, không chọn một mình.",
        undefined,
        undefined,
        t4e,
      ),
      [
        "Wonderful, sir. I will tell the chef this is a “surprise me” table, and we will choose together.",
      ],
    ),
  ],
  reading: read(
    `'SURPRISE ME' — A PRIVILEGE WITH RULES
A guest who hands you the menu is giving you trust, not their wallet.
Ask two things before anything moves. First: does anyone at the table have an allergy, or anything they do not eat? Second: how adventurous should you go? One cautious eater changes the whole order.
Choose from the middle of the menu. A guest who trusts you with the choice is not asking you to spend their money. A guest who wants the most expensive dish orders it without help.
Give a personal favourite only if it is true. "My personal favourite is the fish in a clay pot" works because you really eat it on your day off.
Name each dish as it arrives. A surprise the guest cannot name later is a story they cannot retell.
Leave one door open: "If the river fish is too far for you, the beef can come out instead."
Finally, tell the kitchen it is a "surprise me" table. The chef may want to send something of their own.`,
    [
      {
        q: "Trước khi chọn món thay khách, phải hỏi hai điều gì?",
        options: [
          "Ngân sách của bàn và thời gian khách có",
          "Dị ứng hoặc món kiêng, và mức muốn thử món lạ",
          "Quốc tịch của khách và số lần đã đến nhà hàng",
        ],
        correct: 1,
        explanation:
          "'does anyone at the table have an allergy… how adventurous should you go?' Câu hỏi dị ứng luôn đứng đầu.",
      },
      {
        q: "Vì sao nên chọn món ở tầm giữa của thực đơn?",
        options: [
          "Khách trao niềm tin, không trao ví tiền",
          "Vì món tầm giữa luôn là những món ngon nhất của bếp",
          "Vì bếp chuẩn bị các món tầm giữa nhanh hơn hẳn",
        ],
        correct: 0,
        explanation:
          "'A guest who trusts you with the choice is not asking you to spend their money.'",
      },
      {
        q: "Vì sao phải báo bếp đây là bàn 'surprise me'?",
        options: [
          "Để bếp tính thêm phí phục vụ cho bàn đặc biệt",
          "Để bếp làm món nhanh hơn những bàn bình thường",
          "Vì bếp trưởng có thể muốn gửi món riêng",
        ],
        correct: 2,
        explanation: "'tell the kitchen… The chef may want to send something of their own.'",
      },
    ],
  ),
  game: [
    round(
      "Surprise us — but my husband barely ate at lunch, so he is starving.",
      "A hungry table is easy to please, madam. Is there anything you do not eat?",
      "A hungry table is easy to please, madam. Is there anything you not eat?",
      "Then I will bring every signature dish we have, madam — a real feast for him.",
      "'anything you not eat' thiếu trợ động từ 'do'. Câu mang mọi món đặc trưng đúng ngữ pháp nhưng bỏ câu hỏi dị ứng và tiêu tiền thay khách. Đáp án nhận lời vui vẻ rồi hỏi điều an toàn trước.",
      1,
    ),
    round(
      "Table seven said 'surprise me'. I will bring them the lobster — it is the most expensive.",
      "Ask about allergies first, and choose from the middle of the menu.",
      "Ask about allergy first, and choosing from middle of the menu.",
      "Good idea. The most expensive dish always makes a very good impression on a table.",
      "'choosing from middle' sai dạng động từ (choose) và thiếu 'the'. Câu khen chọn món đắt nhất đúng tiếng Anh nhưng hiểu sai lời khách: họ trao niềm tin, không trao ví tiền. Đáp án nhắc đúng hai việc: hỏi dị ứng, chọn tầm giữa.",
      0,
      "colleague",
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: tư vấn theo đúng người khách bằng 'Based on…' và 'Since you mentioned…' — với khách quen, bàn công việc, chai vang vừa túi và bàn 'chọn giúp tôi' — và luôn hỏi dị ứng trước khi chọn món thay khách, không bàn chuyện của khách khác.",
};
