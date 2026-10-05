// FB week 31 — Telling the Story (hand-authored Phase 4, see ../kit.ts).
//
// The week the waiter stops listing a dish and starts telling it: what it is,
// how it is made, why the kitchen is proud of it — in one compound sentence of
// two or three clauses (and / so / but) and ONE feeling word (proud,
// comforting, delighted). The old week was four turns, menu-card readings of
// thirty words, English tips, and a coffee lesson carrying "Steak doneness".
//
// The rule the whole phase keeps from here: the story never replaces the
// facts. A dish with fish sauce, shellfish or crushed peanuts is named as such
// in the same breath, the allergy question comes BEFORE the recommendation,
// and nobody on the floor calls a dish "safe" — the chef confirms it.
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

// ── Lesson 1 — the story in the bowl ────────────────────────────────────────
const t1a = "This is pho, sir. It is a heritage dish, and the broth simmers overnight.";
const t1b = "The bones simmer slowly, so the broth stays clear and full of flavour.";
const t1c = "I would taste the broth first, sir, and then add the herbs and a little lime.";

const lesson1 = L(31, 1, "The Story in the Bowl", "Câu chuyện trong bát phở", {
  vocabulary: [
    c("Broth", "The broth is the heart of every bowl of pho.", [
      "/brɒθ/",
      "Nước dùng (nước lèo) ninh từ xương",
      "🍲",
    ]),
    c("Simmer", "The kitchen lets the beef bones simmer overnight.", [
      "/ˈsɪmə/",
      "Ninh nhỏ lửa, liu riu trong nhiều giờ",
      "♨️",
    ]),
    c("Heritage", "Pho is a heritage dish, and families still cook it at home.", [
      "/ˈherɪtɪdʒ/",
      "Di sản — món truyền thống qua nhiều thế hệ",
      "🏮",
    ]),
    c("Proud", "The whole kitchen is proud of the new menu.", ["/praʊd/", "Tự hào", "😊"]),
    c("Comforting", "A hot bowl of pho is comforting on a rainy evening.", [
      "/ˈkʌmfətɪŋ/",
      "Ấm lòng, dễ chịu như bữa cơm nhà",
      "🤗",
    ]),
  ],
  grammar: [
    g(
      "Pho. Beef. Noodle. Cook long time.",
      "This is pho, sir, and the broth simmers overnight, so the flavour is deep.",
      "Câu ghép ba vế: A, and B, so C. 'and' thêm một thông tin, 'so' nói kết quả. Chủ ngữ số ít 'the broth' nên động từ có -s: simmers.",
      "This is pho, sir, and the broth simmer overnight, so the flavour is deep.",
    ),
    g(
      "Chef like this soup very much.",
      "Our chef is proud of this broth, and he tastes it every morning.",
      "Tính từ cảm xúc đi với giới từ cố định: proud OF (không dùng about/for). Vế sau nối bằng ', and' kể một việc chứng minh niềm tự hào.",
      "Our chef is proud about this broth, and he tastes it every morning.",
    ),
  ],
  speaking: [
    also(
      sp(
        "What is this soup? It smells wonderful.",
        t1a,
        "Câu một: tên món. Câu hai là câu ghép: vế đầu nói món là gì ('a heritage dish'), vế sau kể một chi tiết khiến khách nhớ ('the broth simmers overnight').",
      ),
      ["This is pho, sir. It is a heritage dish, and we simmer the broth overnight."],
    ),
    also(
      sp(
        "Overnight? Why does it take so long?",
        t1b,
        "Trả lời câu hỏi vì sao bằng câu ghép với 'so': nguyên nhân trước, kết quả sau. Chủ ngữ số nhiều nên 'simmer' không thêm -s.",
        undefined,
        undefined,
        t1a,
      ),
      ["The bones simmer slowly, so the broth is clear and full of flavour."],
    ),
    sp(
      "It looks beautiful. How do people eat it here?",
      t1c,
      "Hướng dẫn cách ăn như một lời gợi ý (mở đầu bằng I would), không như mệnh lệnh. Hai bước nối bằng 'and then'.",
      undefined,
      undefined,
      t1b,
    ),
    also(
      sp(
        "I have had a long day, and it is raining again. What would warm me up?",
        "A bowl of pho is comforting on a rainy evening, madam, and it is not too heavy.",
        "Một tính từ cảm xúc là đủ: 'comforting'. Vế thứ hai trả lời nỗi lo thầm của khách — ăn tối muộn có nặng bụng không.",
      ),
      ["A bowl of pho is comforting on a rainy evening, and it is not too heavy, madam."],
    ),
    sp(
      "Is pho really an old dish, or is it just for tourists?",
      "It is a real heritage dish, sir, and many Vietnamese families still cook it at home.",
      "Khách nghi ngờ thì trả lời bằng sự thật, không tranh luận: 'heritage dish' + một bằng chứng đời thường.",
    ),
    sp(
      "A guest asked me about the pho, and I only said 'beef soup'. What should I say next time?",
      "Tell the story: it is a heritage dish, the broth simmers overnight, and our chef is proud of it.",
      "Nói với đồng nghiệp: không sir/madam. Ba ý của một câu chuyện món ăn — món gì, làm thế nào, vì sao tự hào — xếp thành một câu.",
      "colleague",
    ),
  ],
  reading: read(
    `A STORY IN THREE PARTS
A guest who asks "What is this?" is not asking for a list. The guest wants a reason to love the dish. Our servers tell a dish in three short parts: what it is, how it is made, and why we are proud of it.
For pho, it sounds like this: "This is pho, a heritage dish from the north. The beef bones simmer overnight, so the broth is clear and deep. Our chef tastes it every morning before service."
Join the parts with small words — and, so, but — so the story comes out in one breath. Use one feeling word, not five. Proud, comforting or delighted is enough; a string of adjectives sounds like an advert.
Stop when the guest looks back at the bowl. A story is a gift, and a gift that goes on too long becomes a lecture.
One rule never bends: the story never replaces the facts. If a guest asks what is inside, name the ingredients plainly. When you are not sure, check with the kitchen before the guest orders.`,
    [
      {
        q: "Theo bài, câu chuyện về một món ăn gồm những phần nào?",
        options: [
          "Giá món, thời gian chờ và món nên gọi kèm theo",
          "Món gì, làm thế nào, vì sao tự hào",
          "Toàn bộ nguyên liệu, đọc theo đúng thứ tự thực đơn",
        ],
        correct: 1,
        explanation:
          "'what it is, how it is made, and why we are proud of it' — ba phần ngắn, nối bằng and/so/but thành một hơi.",
      },
      {
        q: "Vì sao chỉ nên dùng một tính từ cảm xúc?",
        options: [
          "Nhiều tính từ nghe như quảng cáo",
          "Khách nước ngoài không hiểu những tính từ dài",
          "Bếp trưởng không muốn nhân viên khen món quá lời",
        ],
        correct: 0,
        explanation:
          "'a string of adjectives sounds like an advert' — một chữ đúng chỗ (proud, comforting, delighted) đáng tin hơn năm chữ.",
      },
      {
        q: "Khách hỏi trong món có gì, người phục vụ làm gì?",
        options: [
          "Kể tiếp câu chuyện để khách quên đi câu hỏi về nguyên liệu",
          "Mời khách tự đọc phần mô tả trên thực đơn tiếng Anh",
          "Nói rõ nguyên liệu; chưa chắc thì hỏi bếp",
        ],
        correct: 2,
        explanation:
          "'the story never replaces the facts… When you are not sure, check with the kitchen before the guest orders.' Câu chuyện không bao giờ thay cho thông tin thật.",
      },
    ],
  ),
  game: [
    round(
      "These spring rolls look lovely. What is the story behind them?",
      "They are a family favourite, madam, and we roll them by hand every afternoon.",
      "They is family favourite, madam, and we roll them by hand every afternoon.",
      "Only meat and vegetables inside, madam — try one and you will see.",
      "'They is family favourite' sai hai chỗ: 'they' đi với 'are', và 'favourite' cần mạo từ 'a'. 'Only meat and vegetables inside… try one and you will see' đúng tiếng Anh nhưng trả lời cụt và đẩy việc tìm hiểu sang khách — không có câu chuyện nào. Đáp án kể bằng câu ghép hai vế: món là gì, làm thế nào.",
      1,
    ),
    round(
      "Why is your pho so expensive? It is cheap on the street.",
      "Our broth simmers overnight, sir, and the herbs come in fresh every morning.",
      "Our broth simmering overnight, sir, and the herbs come in fresh every morning.",
      "Street pho is simply not the same quality, sir — in the end, you get what you pay for.",
      "'Our broth simmering overnight' thiếu động từ chia — phải là 'simmers'. Câu chê phở ngoài phố đúng ngữ pháp nhưng hạ thấp món khách yêu và giọng như dạy đời. Đáp án trả lời bằng hai việc thật của bếp, không so sánh với ai.",
      0,
    ),
  ],
});

// ── Lesson 2 — Vietnamese coffee, told well ──────────────────────────────────
const t2a =
  "It is, madam. In egg coffee, the yolk is whisked with condensed milk, and it tastes like a warm dessert.";
const t2b = "Long ago, fresh milk was hard to find, so a Hanoi bartender used egg instead.";
const t2c = "Of course, madam. I will ask the barista to use less condensed milk.";

const lesson2 = L(31, 2, "Vietnamese Coffee, Told Well", "Kể chuyện ly cà phê Việt", {
  vocabulary: [
    c("Phin filter", "The coffee drips slowly through a phin filter at your table.", [
      "/fɪn ˈfɪltə/",
      "Phin — dụng cụ pha cà phê nhỏ giọt bằng kim loại",
      "☕",
    ]),
    c("Egg coffee", "Egg coffee was born in Hanoi when fresh milk was hard to find.", [
      "/eɡ ˈkɒfi/",
      "Cà phê trứng — lòng đỏ đánh bông với sữa đặc",
      "🥚",
    ]),
    c("Condensed milk", "Our iced coffee is sweetened with condensed milk.", [
      "/kənˈdenst mɪlk/",
      "Sữa đặc có đường",
      "🥛",
    ]),
    c("Aroma", "Let the aroma reach you while the coffee drips.", [
      "/əˈrəʊmə/",
      "Mùi thơm, hương (của cà phê, món ăn)",
      "👃",
    ]),
  ],
  grammar: [
    g(
      "Wait. Coffee still drip.",
      "The coffee drips slowly, so please enjoy the aroma while you wait.",
      "Câu ghép với 'so' biến lúc chờ thành một trải nghiệm có lời mời. 'The coffee' số ít nên 'drips' có -s.",
      "The coffee drip slowly, so please enjoy the aroma while you wait.",
    ),
    g(
      "Egg coffee have egg, yes.",
      "Egg coffee is made with egg yolk and condensed milk, and it tastes like a warm dessert.",
      "Bị động 'is made with' để nói món làm từ gì: sau 'is' là quá khứ phân từ 'made', không dùng 'make'. Vế sau nối bằng ', and' kể cảm giác khi uống.",
      "Egg coffee is make with egg yolk and condensed milk, and it tastes like a warm dessert.",
    ),
  ],
  speaking: [
    also(
      sp(
        "Is egg coffee really made with egg? It sounds strange.",
        t2a,
        "Trả lời ngắn 'It is' rồi kể: bị động 'is whisked with' cho cách làm, ', and' cho cảm giác. Nói 'condensed milk' liền một cụm.",
      ),
      [
        "It is, madam. In egg coffee, the yolk is whisked with condensed milk, so it tastes like a warm dessert.",
      ],
    ),
    sp(
      "Why would anyone put egg in coffee?",
      t2b,
      "Câu chuyện có nguyên nhân và kết quả, nối bằng 'so'. Kể bằng quá khứ đơn (was, used).",
      undefined,
      undefined,
      t2a,
    ),
    also(
      sp(
        "I love that story. Can I try one, but not too sweet?",
        t2c,
        "Cá nhân hoá ngay yêu cầu của khách: nhờ người pha chế giảm sữa đặc. Sau ask + người + to là động từ nguyên mẫu.",
        undefined,
        undefined,
        t2b,
      ),
      [
        "Of course, madam. I will ask the barista for less condensed milk.",
        "Certainly, madam. I will ask the barista to use less condensed milk.",
      ],
    ),
    sp(
      "What is that little metal cup on top of my glass?",
      "It is a phin filter, sir. The coffee drips through it slowly, so the aroma comes first.",
      "Gọi tên dụng cụ ('a phin filter'), rồi một câu ghép giải thích vì sao nó chậm mà đáng chờ.",
    ),
    also(
      sp(
        "It is taking so long! Is something wrong with my coffee?",
        "Nothing is wrong, sir. The phin filter is slow on purpose, and the slow drip makes the coffee strong.",
        "Khách sốt ruột: trấn an bằng một câu ngắn trước, rồi giải thích bằng câu ghép. Không xin lỗi cho một điều không phải lỗi.",
      ),
      ["Nothing is wrong, sir. The phin filter is slow on purpose, so the coffee is strong."],
    ),
    sp(
      "I do not drink coffee. Is there anything for me in this café?",
      "Of course, madam. Our lotus tea is light and calming, and it comes with the same slow ritual.",
      "Khách không uống cà phê vẫn được kể một câu chuyện: món thay thế + một tính từ + ', and' nối với trải nghiệm chung của quán.",
    ),
  ],
  reading: read(
    `THE COFFEE CORNER — HOW WE TELL IT
Many guests meet Vietnamese coffee for the first time at our coffee corner. The cup is small, but the story is big, so tell it well.
Iced milk coffee is strong coffee over ice, sweetened with condensed milk. Fresh milk was rare in the past, and condensed milk kept for weeks in the heat.
Egg coffee is a Hanoi story. Long ago, fresh milk was hard to find, so a bartender whisked egg yolk with condensed milk instead. It tastes like a warm dessert.
Both drinks start in a phin filter. The coffee drips slowly, and that is the point: the guest watches, smells the aroma, and slows down too.
Three small habits make the moment work. Set the phin down with a word about the wait. Tell the guest when the last drops have fallen. And ask about sweetness before you pour the milk, because some guests find it very sweet.
If a guest is in a hurry, say so honestly. A phin takes a few minutes, and the barista can prepare an espresso instead.`,
    [
      {
        q: "Vì sao cà phê Việt thường dùng sữa đặc?",
        options: [
          "Vì sữa đặc rẻ hơn sữa tươi và quán nào cũng có sẵn",
          "Vì ngày trước sữa tươi hiếm, sữa đặc để được lâu",
          "Vì khách nước ngoài luôn thích vị thật ngọt và thật béo",
        ],
        correct: 1,
        explanation:
          "'Fresh milk was rare in the past, and condensed milk kept for weeks in the heat.' Câu chuyện có nguồn gốc thật, không phải chuyện giá rẻ.",
      },
      {
        q: "Theo bài, khi nào nên hỏi khách về độ ngọt?",
        options: [
          "Sau khi khách đã uống thử ngụm đầu tiên",
          "Khi khách gọi thêm ly thứ hai trong buổi",
          "Trước khi rót sữa",
        ],
        correct: 2,
        explanation:
          "'ask about sweetness before you pour the milk' — hỏi TRƯỚC, vì sữa đã rót thì không lấy ra được.",
      },
      {
        q: "Khách đang vội thì người phục vụ nói gì?",
        options: [
          "Nói thật phin mất vài phút",
          "Nói rằng phin chỉ mất vài giây để khách yên tâm chờ",
          "Rút phin ra sớm và rót luôn phần cà phê đã nhỏ xuống",
        ],
        correct: 0,
        explanation:
          "'say so honestly. A phin takes a few minutes, and the barista can prepare an espresso instead.' Nói thật thời gian, rồi đưa một lựa chọn nhanh hơn.",
      },
    ],
  ),
  game: [
    round(
      "My coffee is still dripping. Did someone forget to make it properly?",
      "Not at all, sir. The phin is slow on purpose, so the coffee comes out strong.",
      "Not at all, sir. The phin is slow on purpose, so the coffee come out strong.",
      "Please be patient, sir. Every guest has to wait for this coffee, and it is worth it.",
      "'the coffee come out' thiếu -s: chủ ngữ số ít 'the coffee' đi với 'comes'. Câu 'Please be patient… Every guest has to wait' đúng ngữ pháp nhưng bảo khách phải kiên nhẫn — nghe như trách khách. Đáp án trấn an rồi kể lý do bằng câu ghép với 'so'.",
      2,
    ),
    round(
      "What is the difference between your two iced coffees?",
      "The brown one has condensed milk, madam, and the black one has only sugar.",
      "The brown one have condensed milk, madam, and the black one have only sugar.",
      "They are almost the same, madam. Most guests cannot really taste any difference at all.",
      "'The brown one have' sai: 'one' là số ít nên dùng 'has'. Câu 'They are almost the same… cannot really taste any difference' đúng tiếng Anh nhưng không giúp khách chọn và ngầm chê khẩu vị khách. Đáp án so sánh hai ly bằng một câu ghép.",
      0,
    ),
  ],
});

// ── Lesson 3 — the honest story: what is inside ─────────────────────────────
const t3a =
  "They come from the south, madam. We roll rice paper around herbs and prawns, and serve them with peanut sauce.";
const t3b =
  "Thank you for telling me, madam. They contain shellfish, so I would not recommend them for you.";
const t3c =
  "I will write your allergy for the kitchen, madam, and the chef will check the vegetarian roll before you order.";

const lesson3 = L(
  31,
  3,
  "The Honest Story: What Is Inside",
  "Câu chuyện trung thực: trong món có gì",
  {
    vocabulary: [
      c("Fish sauce", "Most Vietnamese dipping sauces start with fish sauce.", [
        "/fɪʃ sɔːs/",
        "Nước mắm",
        "🐟",
      ]),
      c("Shellfish", "The fresh rolls contain shellfish, so please tell me about any allergy.", [
        "/ˈʃelfɪʃ/",
        "Hải sản có vỏ — tôm, cua, sò, ốc",
        "🦐",
      ]),
      c("Crushed peanuts", "The noodle salad is topped with crushed peanuts.", [
        "/krʌʃt ˈpiːnʌts/",
        "Đậu phộng rang giã dập, rắc lên món",
        "🥜",
      ]),
      c("Vegetarian", "Our vegetarian pho uses a broth made from mushrooms.", [
        "/ˌvedʒəˈteəriən/",
        "Món chay — không thịt, không cá",
        "🥬",
      ]),
    ],
    grammar: [
      g(
        "Have peanut. You cannot eat.",
        "The noodle salad contains crushed peanuts, so I will check with the kitchen first.",
        "Nói thành phần bằng 'contains' (chủ ngữ số ít → -s), rồi ', so' + việc chính bạn làm. Không kết luận thay khách 'you cannot eat'.",
        "The noodle salad contain crushed peanuts, so I will check with the kitchen first.",
      ),
      g(
        "No problem, it is safe for you.",
        "I will write your allergy for the kitchen, and the chef will confirm each dish.",
        "Không bao giờ tự hứa 'safe'. Nói hai việc thật: bạn ghi giấy cho bếp, bếp trưởng xác nhận. Sau 'will' là động từ nguyên mẫu: will confirm.",
        "I will write your allergy for the kitchen, and the chef will confirms each dish.",
      ),
    ],
    speaking: [
      sp(
        "These fresh rolls look lovely. What is the story behind them?",
        t3a,
        "Câu chuyện kể luôn thành phần: tôm (prawns) và sốt đậu phộng. Khách nghe thấy món ngon và nghe thấy cả điều có thể gây dị ứng.",
      ),
      risk(
        also(
          sp(
            "Oh. I am allergic to shellfish. Is that a problem?",
            t3b,
            "Cảm ơn khách đã nói, rồi nói thật: 'contain shellfish, so I would not recommend them'. Không đùa, không giảm nhẹ.",
            undefined,
            undefined,
            t3a,
          ),
          [
            "Thank you for telling me, madam. They contain shellfish, so I would not recommend them.",
            "Thank you for telling me. They contain shellfish, madam, so I would not recommend them for you.",
          ],
        ),
      ),
      risk(
        also(
          sp(
            "Then what can I have? Is the vegetarian roll all right for me?",
            t3c,
            "Không tự nói món nào ăn được. Hai việc: ghi dị ứng cho bếp ('write your allergy for the kitchen'), và bếp trưởng kiểm tra món trước khi khách gọi.",
            undefined,
            ["allergy", "kitchen", "chef", "vegetarian"],
            t3b,
          ),
          [
            "The chef will check the vegetarian roll before you order, madam, and I will write your allergy for the kitchen.",
            "I will write your allergy for the kitchen, and the chef will check the vegetarian roll before you order.",
          ],
        ),
      ),
      sp(
        "I do not eat meat or fish. Is the pho vegetarian?",
        "Our classic broth is beef, sir. The vegetarian pho uses mushrooms, and I will check the fish sauce with the chef.",
        "Món chay vẫn có thể có nước mắm. Nói thật món chính, đưa món chay, và hỏi bếp về 'fish sauce'.",
      ),
      also(
        sp(
          "What is in this dipping sauce? It is delicious.",
          "It is fish sauce with lime, sugar and chilli, madam, so it is sweet, sour and salty at once.",
          "Liệt kê thành phần trước, rồi ', so' + cảm giác vị. 'fish sauce' là thông tin khách cần biết, không giấu đi.",
        ),
        [
          "It is fish sauce with lime, sugar and chilli, madam, so it tastes sweet, sour and salty at once.",
        ],
      ),
      risk(
        also(
          sp(
            "Table six asked if the salad has nuts. I think it does not.",
            "Do not guess. Check with the kitchen — the salad comes with crushed peanuts.",
            "Nói với đồng nghiệp: không sir/madam. Câu đầu ngắn và dứt khoát; câu sau là việc phải làm và lý do ('crushed peanuts').",
            "colleague",
          ),
          [
            "Please do not guess. Check with the kitchen — the salad comes with crushed peanuts.",
            "Do not guess. The salad comes with crushed peanuts, so check with the kitchen.",
          ],
        ),
      ),
    ],
    reading: read(
      `A STORY WITH THE FACTS IN IT
A good food story makes a guest hungry. An honest food story also keeps the guest safe.
Many Vietnamese dishes hide strong ingredients in small amounts. Fish sauce goes into dipping sauces, marinades and some salad dressings. Crushed peanuts finish noodle salads and sticky rice. Shrimp paste and dried prawns appear where guests do not expect them.
So the story always carries the facts. When you describe a dish, name anything a guest could react to in the same breath. For example: "The salad is fresh and crunchy, and it is topped with crushed peanuts."
Ask before you recommend, not after: "Before I suggest anything, is there anything you do not eat?"
If a guest names an allergy, thank them and write it on the order for the kitchen. The chef confirms each dish before it is ordered.
Never call a dish "safe" yourself. The kitchen knows what touches each pan and each board; the floor does not.
Vegetarian guests need the same care. A vegetarian broth may still use fish sauce, so check every time, even for a dish you have served a hundred times.`,
      [
        {
          q: "Vì sao câu chuyện món ăn phải nói kèm thành phần dễ gây dị ứng?",
          options: [
            "Để món ăn nghe sang trọng và đắt giá hơn trong mắt khách",
            "Để giữ an toàn cho khách",
            "Vì quy định bắt đọc toàn bộ công thức của bếp cho khách",
          ],
          correct: 1,
          explanation:
            "'An honest food story also keeps the guest safe… name anything a guest could react to in the same breath.'",
        },
        {
          q: "Khách nói mình bị dị ứng, người phục vụ làm gì?",
          options: [
            "Cảm ơn, ghi vào phiếu cho bếp, bếp xác nhận món",
            "Tự chọn món an toàn nhất và mang ra ngay cho khách",
            "Khuyên khách gọi món chay vì món chay không có gì nguy hiểm",
          ],
          correct: 0,
          explanation:
            "'thank them and write it on the order for the kitchen. The chef confirms each dish' — nhân viên sảnh không tự gọi món nào là an toàn.",
        },
        {
          q: "Vì sao món chay vẫn phải kiểm tra với bếp?",
          options: [
            "Vì món chay luôn được nấu chung chảo với món thịt",
            "Vì khách ăn chay thường đổi ý vào phút cuối",
            "Vì nước dùng chay vẫn có thể có nước mắm",
          ],
          correct: 2,
          explanation:
            "'A vegetarian broth may still use fish sauce, so check every time.' Bài không nói món chay luôn nấu chung chảo — đừng đoán thêm.",
        },
      ],
    ),
    game: [
      round(
        "Is there anything in this dish I should know about?",
        "It is topped with crushed peanuts, sir, and the sauce has fish sauce in it.",
        "It topped with crushed peanut, sir, and the sauce have fish sauce in it.",
        "Nothing at all, sir — it is a very simple dish, so it is completely safe for everyone.",
        "'It topped… the sauce have' thiếu 'is' và sai -s ('has'). Câu 'Nothing at all… completely safe for everyone' đúng ngữ pháp nhưng là lời hứa an toàn mà sảnh không có quyền đưa ra. Đáp án nói thật những thành phần khách cần biết.",
        1,
      ),
      round(
        "The guest at table nine is allergic to prawns. I will just pick the prawns out, OK?",
        "No — write it on the order and let the chef make a fresh plate.",
        "No — write it on order and let chef makes a fresh plate.",
        "Fine, but be quick about it, and there is no need to tell the guest.",
        "'on order… let chef makes' thiếu mạo từ 'the' và sai dạng động từ (let + động từ nguyên mẫu: make). Câu 'Fine, but be quick… no need to tell the guest' đúng tiếng Anh nhưng nhặt tôm ra khỏi đĩa không làm món hết tôm — món phải làm lại từ đầu. Đáp án đưa việc về đúng bếp.",
        2,
        "colleague",
      ),
    ],
  },
);

// ── Lesson 4 — the chef's signature ──────────────────────────────────────────
const t4a = "The lemongrass beef is his signature dish, madam, and he is very proud of it.";
const t4b =
  "The beef comes from a local farm, and it is grilled over charcoal, so it smells wonderful.";
const t4c =
  "Then the fish of the day may suit you better, madam. It is in season, and the chef cooks it simply.";

const lesson4 = L(31, 4, "The Chef's Signature", "Món đặc trưng của bếp trưởng", {
  vocabulary: [
    c("Signature dish", "The chef's signature dish is grilled lemongrass beef.", [
      "/ˈsɪɡnətʃə dɪʃ/",
      "Món đặc trưng — món tâm huyết của bếp trưởng",
      "⭐",
    ]),
    c("Local farm", "Our herbs come from a local farm outside the city.", [
      "/ˈləʊkl fɑːm/",
      "Trang trại địa phương cung cấp nguyên liệu",
      "🌾",
    ]),
    c("In season", "Mango is in season now, so the dessert menu changes this week.", [
      "/ɪn ˈsiːzn/",
      "Đang mùa — nguyên liệu ngon nhất lúc này",
      "🗓️",
    ]),
    c("Delighted", "Guests are often delighted by the first taste of the sauce.", [
      "/dɪˈlaɪtɪd/",
      "Rất vui, thích thú",
      "😄",
    ]),
  ],
  grammar: [
    g(
      "Chef special. Very good. You try.",
      "This is our chef's signature dish, and the beef comes from a local farm.",
      "Sở hữu cách: 'our chef's signature dish' — món CỦA bếp trưởng, có 's. Vế thứ hai nối bằng ', and' kể nguồn gốc nguyên liệu, thay cho lời khen chung chung.",
      "This is our chef signature dish, and the beef comes from a local farm.",
    ),
    g(
      "Mango finish soon, order quick.",
      "Mango is in season now, so the chef is using it in tonight's dessert.",
      "Hiện tại tiếp diễn 'is using' cho việc đang diễn ra trong mùa này. Không giục khách; nói lý do khiến món đáng thử.",
      "Mango is in season now, so the chef is use it in tonight's dessert.",
    ),
  ],
  speaking: [
    also(
      sp(
        "Which dish is your chef most proud of?",
        t4a,
        "Khách đã dùng chữ 'proud' — nhắc lại nó trong câu trả lời. Gọi tên món + 'signature dish', rồi ', and' + cảm xúc của bếp trưởng.",
      ),
      ["The lemongrass beef is his signature dish, madam, and he is proud of it."],
    ),
    sp(
      "What makes it so special?",
      t4b,
      "Câu ghép ba vế: nguồn gốc ('from a local farm'), ', and' cách nấu, ', so' kết quả. Mỗi vế một ý, không thêm tính từ.",
      undefined,
      undefined,
      t4a,
    ),
    also(
      sp(
        "It sounds good, but I am not a big meat eater.",
        t4c,
        "Khách không ăn nhiều thịt: chuyển ngay sang món khác (mở đầu bằng Then), và kể lý do món đó đáng thử ('in season').",
        undefined,
        undefined,
        t4b,
      ),
      [
        "Then the fish of the day may suit you better, madam. It is in season, and the chef cooks it very simply.",
      ],
    ),
    sp(
      "Where do your vegetables come from?",
      "Most of them come from a local farm outside the city, sir, and they arrive every morning.",
      "Trả lời câu hỏi nguồn gốc bằng sự thật cụ thể: 'a local farm', và một vế nói độ tươi.",
    ),
    also(
      sp(
        "We are only here for one night. What should we not miss?",
        "If you have one night, sir, try the signature dish — many guests are delighted by it.",
        "Khách đã nói 'one night' nên được nhắc lại. 'delighted by it' — một tính từ cảm xúc thay cho mười lời khen.",
      ),
      [
        "If you only have one night, sir, try the signature dish — many guests are delighted by it.",
      ],
    ),
    sp(
      "Is there a dessert with something local in it?",
      "Mango is in season now, madam, so the pastry team is serving it with sticky rice tonight.",
      "Câu ghép với 'so': điều đang có ('in season') dẫn tới món tối nay. Đọc xôi (sticky rice) liền một cụm.",
    ),
  ],
  reading: read(
    `A DISH WITH A NAME BEHIND IT
Every evening, our head chef walks the floor before service and tastes the sauces. The servers watch, because tonight they will tell his story.
His signature dish is lemongrass beef, grilled over charcoal. The beef comes from a local farm an hour from the city, and the lemongrass grows in the hotel garden. He learned the marinade from his mother, and he still makes it by hand.
A signature dish is not the most expensive dish on the menu. It is the one the chef would cook for his own family. Say that, and the guest understands why it matters.
Seasons give the story a second chapter. When mango is in season, the pastry team serves it with sticky rice. When the rains come, the kitchen adds more soups. A server who knows what is in season sounds like a local, not like a menu.
Keep it honest. If the beef has run out, say so at once and recommend the next best dish. A story about a dish the guest cannot order is a disappointment, not a gift.`,
    [
      {
        q: "Theo bài, món đặc trưng (signature dish) là món như thế nào?",
        options: [
          "Món bếp trưởng sẽ nấu cho gia đình mình",
          "Món đắt nhất trong thực đơn của nhà hàng",
          "Món được nhiều khách nước ngoài gọi nhất mỗi tối",
        ],
        correct: 0,
        explanation:
          "'A signature dish is not the most expensive dish on the menu. It is the one the chef would cook for his own family.'",
      },
      {
        q: "Biết món nào đang vào mùa giúp người phục vụ điều gì?",
        options: [
          "Bán được nhiều món tráng miệng đắt tiền hơn mỗi ngày",
          "Nói chuyện như người địa phương",
          "Không cần hỏi bếp xem hôm nay còn món gì không",
        ],
        correct: 1,
        explanation: "'A server who knows what is in season sounds like a local, not like a menu.'",
      },
      {
        q: "Món bò đã hết thì người phục vụ làm gì?",
        options: [
          "Vẫn kể câu chuyện để khách biết lần sau gọi món",
          "Xin bếp làm thêm một phần nhỏ cho khách",
          "Nói ngay là hết, gợi ý món tốt kế tiếp",
        ],
        correct: 2,
        explanation:
          "'If the beef has run out, say so at once and recommend the next best dish.' Kể về món khách không gọi được chỉ làm khách thất vọng.",
      },
    ],
  ),
  game: [
    round(
      "What is so special about your signature dish?",
      "It is grilled over charcoal, madam, and the beef comes from a local farm.",
      "It grill over charcoal, madam, and the beef come from a local farm.",
      "It is the most expensive dish we have, madam, so of course it must be the best one.",
      "'It grill… the beef come' sai dạng động từ: cần bị động 'is grilled' và 'comes' có -s. Câu 'the most expensive… so it must be the best' đúng ngữ pháp nhưng dùng giá tiền thay cho câu chuyện — khách nghe như bị ép mua món đắt. Đáp án kể cách nấu và nguồn gốc.",
      2,
    ),
    round(
      "Is the mango dessert any good? I have never tried it.",
      "Mango is in season now, sir, so tonight it is at its best.",
      "Mango is in the season now, sir, so tonight it is at it best.",
      "Everybody orders it, sir, so you really have to try it tonight as well.",
      "'in the season… at it best' sai hai chỗ: thành ngữ là 'in season' (không có 'the'), và sở hữu là 'its'. Câu 'Everybody orders it… you really have to try it' đúng tiếng Anh nhưng ép khách theo đám đông. Đáp án đưa lý do thật: món đang vào mùa.",
      1,
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: kể câu chuyện của một món ăn, một ly cà phê hay món đặc trưng của bếp bằng câu ghép hai–ba vế (and, so, but) và một tính từ cảm xúc — và luôn nói rõ thành phần dễ gây dị ứng, để bếp xác nhận trước khi khách gọi món.",
};
