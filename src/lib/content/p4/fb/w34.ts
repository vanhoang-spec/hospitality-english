// FB week 34 — Special Occasions (hand-authored Phase 4, see ../kit.ts).
//
// A birthday, an anniversary, a honeymoon, a proposal: the restaurant takes
// the booking, but the flowers come through the concierge, the petals are
// Housekeeping's and the cake is the pastry team's. The waiter coordinates so
// the guest hears one voice — and promises only what is the restaurant's:
// "I will ask Housekeeping and come back to you within the hour", never
// Housekeeping's time or the florist's price.
//
// The formal wish has one shape ("On behalf of the whole team,
// congratulations…") and one length: a sentence, then a step back. No jokes
// about age or weddings, and no age the guest did not give. A bottle on the
// house still needs the supervisor's approval; the occasion slip still carries
// the allergy question. Kept from the earlier week because the floor managers
// rated it: the slip, the host's signal, the secret handed to one named
// colleague, and plan B told to the host alone, in the same breath as the news.
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

// ── Lesson 1 — taking the occasion brief ─────────────────────────────────────
const t1a =
  "Ten years is a real milestone, sir. May I take the details, from the table to the cake?";
const t1b =
  "Understood, sir. We will keep it a secret, and the cake will wait until you give the signal.";
const t1c = "Of course, sir. Let me read the name on the cake back to you, letter by letter.";

const lesson1 = L(34, 1, "Taking the Occasion Brief", "Nhận đặt chỗ cho một dịp đặc biệt", {
  vocabulary: [
    c("Milestone", "A tenth anniversary is a milestone, so we plan it with care.", [
      "/ˈmaɪlstəʊn/",
      "Cột mốc đáng nhớ — sinh nhật tròn, năm kỷ niệm",
      "🏁",
    ]),
    c("Name on the cake", "What name on the cake would you like, madam?", [
      "/neɪm ɒn ðə keɪk/",
      "Dòng tên viết trên bánh",
      "🎂",
    ]),
    c("Keep it a secret", "We will keep it a secret until the cake arrives.", [
      "/kiːp ɪt ə ˈsiːkrət/",
      "Giữ bí mật",
      "🤐",
    ]),
    c("Timing", "The timing of the cake is the host's decision, not ours.", [
      "/ˈtaɪmɪŋ/",
      "Thời điểm — chọn đúng lúc",
      "⏱️",
    ]),
  ],
  grammar: [
    g(
      "OK birthday dinner. What time you come?",
      "Happy to arrange that, sir. May I take three details: the date, the number of guests and the name on the cake?",
      "Liệt kê 'three details: A, B and C' gom mọi câu hỏi vào MỘT lượt nói — khách đặt tiệc không muốn bị hỏi vụn. 'three details' số nhiều có -s.",
      "Happy to arrange that, sir. May I take three detail: the date, the number of guests and the name on the cake?",
    ),
    g(
      "Who is birthday person? Tell me everything.",
      "Is the dinner a surprise, or does the guest of honour know about it?",
      "Câu hỏi lựa chọn với 'or' hỏi điều quan trọng nhất của một bữa tiệc: AI được biết. Chủ ngữ số ít 'the guest of honour' nên dùng 'does'.",
      "Is the dinner a surprise, or do the guest of honour know about it?",
    ),
  ],
  speaking: [
    also(
      sp(
        "It is our tenth anniversary on Saturday, and I want everything to be special.",
        t1a,
        "Khách đã nói năm kỷ niệm nên bạn được nhắc lại con số đó. Ghi nhận cột mốc ('milestone') trước, rồi xin chi tiết trong một câu.",
      ),
      [
        "Ten years is a real milestone, sir. May I take the details, from the table to the cake, please?",
      ],
    ),
    sp(
      "Please — my wife must not suspect anything at all.",
      t1b,
      "Hứa đúng điều khách lo: 'keep it a secret'. Vế sau trả quyền bấm nút cho chủ tiệc ('until you give the signal').",
      undefined,
      undefined,
      t1a,
    ),
    also(
      sp(
        "Good. And can it say Happy Anniversary, Anna?",
        t1c,
        "Tên trên bánh luôn được đọc lại từng chữ cái — bánh viết sai tên rất khó sửa lúc chín giờ tối.",
        undefined,
        undefined,
        t1b,
      ),
      ["Of course, sir. Let me read the name on the cake back to you, one letter at a time."],
    ),
    risk(
      also(
        sp(
          "My mother turns seventy next week. We want a dinner she will remember.",
          "Seventy is a lovely milestone, madam. Does anyone at the table have an allergy?",
          "Khách đã nói tuổi nên được nhắc lại. Phiếu đặt tiệc luôn có câu hỏi dị ứng — hỏi ngay khi nhận đặt, không đợi tới hôm tiệc.",
          undefined,
          ["table", "allergy"],
        ),
        [
          "Seventy is a wonderful milestone, madam. Does anyone at the table have an allergy?",
          "Seventy is a lovely milestone, madam. Does anyone at the table have an allergy I should know about?",
        ],
      ),
    ),
    sp(
      "When should the cake come out? I have no idea.",
      "The timing is yours, madam. Many guests like it after the main course, when the table is relaxed.",
      "'The timing is yours' — chủ tiệc quyết thời điểm, nhà hàng lo phần thực hiện. Gợi ý một lựa chọn, không quyết thay.",
    ),
    sp(
      "The booking says SURPRISE, but the wife just phoned to ask about it.",
      "Confirm the table only, and say nothing about the cake. Then let the host know she called.",
      "Nói với đồng nghiệp: không sir/madam. Bí mật thuộc về chủ tiệc — xác nhận phần công khai, giữ kín phần bất ngờ.",
      "colleague",
    ),
  ],
  reading: read(
    `AN OCCASION BOOKING — WHAT GOES ON THE SLIP
Date and time. Number of guests. The occasion. Allergies at the table. And the name on the cake: read it back and have the guest spell it, letter by letter. A cake with the wrong spelling is hard to fix at nine in the evening.
Who knows? Mark the booking SURPRISE if one person at the table must not hear about it. Every colleague who touches the table reads the slip before the shift. If the guest of honour phones, confirm the table and nothing else.
The timing belongs to the host. Agree when the cake comes: "after the main course is cleared", or "when I give you a signal". The host owns the moment; we own the delivery.
In this restaurant, a cake from an outside bakery is welcome, with a cake fee named before you accept it. Label it with the table's name in the cold room, and write down when it arrived. Cream out of the fridge has a clock on it.
Ask about age only if the guest offers it. A milestone the guest names is a gift; a number we guess can wound.`,
    [
      {
        q: "Tên trên bánh được kiểm tra thế nào?",
        options: [
          "Nhìn kỹ một lần rồi ghi nhanh vào phiếu đặt chỗ",
          "Để thợ làm bánh tự kiểm tra trước khi giao bánh",
          "Đọc lại tên cho khách nghe, rồi nhờ khách đánh vần từng chữ",
        ],
        correct: 2,
        explanation:
          "'read it back and have the guest spell it, letter by letter' — sửa tên sai trên bánh lúc chín giờ tối rất khó.",
      },
      {
        q: "Khách được tổ chức bất ngờ gọi tới hỏi về đặt chỗ. Nhân viên làm gì?",
        options: [
          "Chỉ xác nhận bàn, không nói gì thêm",
          "Kể hết kế hoạch vì khách đã hỏi trực tiếp",
          "Nói rằng nhà hàng không có đặt chỗ nào cả",
        ],
        correct: 0,
        explanation: "'If the guest of honour phones, confirm the table and nothing else.'",
      },
      {
        q: "Theo bài, khi nào được nói tuổi của khách?",
        options: [
          "Khi nhân viên đoán khá chắc tuổi của khách",
          "Khi chính khách tự nói ra tuổi mình trước",
          "Khi bánh có ghi tuổi để cả bàn cùng vui",
        ],
        correct: 1,
        explanation:
          "'Ask about age only if the guest offers it. A milestone the guest names is a gift; a number we guess can wound.'",
      },
    ],
  ),
  game: [
    round(
      "I would like to book a birthday dinner for my mother. She is turning seventy.",
      "Seventy — what a milestone, madam. May I take the details, including the name on the cake?",
      "Seventy — what a milestone, madam. May I taking the details, including name on the cake?",
      "Lovely, madam. Most guests her age prefer our softer dishes, so I will note the set menu.",
      "'May I taking… including name' sai: sau 'May I' là động từ nguyên mẫu, và cần 'the name'. Câu 'Most guests her age prefer our softer dishes' đúng tiếng Anh nhưng đoán khẩu vị theo tuổi và quyết thay khách. Đáp án chúc mừng cột mốc rồi xin chi tiết.",
      2,
    ),
    round(
      "We are bringing a cake from our favourite bakery. Is that a problem?",
      "Not at all, madam. Our policy allows outside cakes, with a cake fee — may I note it?",
      "Not at all, madam. Our policy allow outside cakes, with a cake fee — may I note it?",
      "Outside cakes are not really allowed, madam, but I will hide it in the kitchen for you this once.",
      "'Our policy allow' thiếu -s: 'policy' số ít nên 'allows'. Câu 'I will hide it for you this once' đúng ngữ pháp nhưng tự đặt ngoại lệ và giấu khoản phí — khách sẽ bất ngờ ở hoá đơn. Đáp án nói luật và phí TRƯỚC khi nhận bánh.",
      0,
    ),
  ],
});

// ── Lesson 2 — working with other departments ────────────────────────────────
const t2a =
  "How lovely, madam. I will coordinate it with the florist and Housekeeping, and come back to you within the hour.";
const t2b =
  "Housekeeping sets that time, madam, so I will ask them now and confirm it with you at dinner.";
const t2c =
  "The florist will give a price first, madam, and nothing is ordered until you agree to it.";

const lesson2 = L(34, 2, "Working With Other Departments", "Phối hợp với các bộ phận khác", {
  vocabulary: [
    c("Coordinate", "The restaurant will coordinate the flowers, the cake and the room.", [
      "/kəʊˈɔːdɪneɪt/",
      "Phối hợp, sắp xếp cùng các bộ phận",
      "🤝",
    ]),
    c("Florist", "The florist needs the order a day ahead.", [
      "/ˈflɒrɪst/",
      "Thợ cắm hoa (thường đặt qua Concierge)",
      "💐",
    ]),
    c("Housekeeping", "Housekeeping can put petals in the room while the couple is at dinner.", [
      "/ˈhaʊskiːpɪŋ/",
      "Bộ phận Buồng phòng",
      "🛏️",
    ]),
    c("Come back to you", "I will ask the florist and come back to you within the hour.", [
      "/kʌm bæk tə juː/",
      "Quay lại báo cho khách, kèm một mốc thời gian",
      "↪️",
    ]),
  ],
  grammar: [
    g(
      "Flowers? Not my department. Call the concierge.",
      "I will coordinate it for you, madam. I will ask the concierge and come back to you by six.",
      "Không đẩy khách sang bộ phận khác: bạn nhận việc phối hợp ('coordinate'), rồi hứa mốc giờ chính BẠN quay lại. Sau 'will' là động từ nguyên mẫu: come.",
      "I will coordinate it for you, madam. I will ask the concierge and coming back to you by six.",
    ),
    g(
      "Housekeeping will do the petals at eight, no problem.",
      "I will ask Housekeeping about the petals, sir, and confirm the time with you before seven.",
      "Giờ của bộ phận khác do họ xác nhận. Bạn chỉ hứa giờ BẠN báo lại cho khách. Hai động từ sau 'will' đều nguyên mẫu: ask, confirm.",
      "I will ask Housekeeping about the petals, sir, and confirms the time with you before seven.",
    ),
  ],
  speaking: [
    also(
      sp(
        "It is our honeymoon. Could there be flowers on the table and in our room?",
        t2a,
        "Bạn là người 'coordinate' — khách chỉ nghe một giọng. Hứa mốc giờ chính bạn quay lại ('come back to you within the hour').",
      ),
      [
        "How lovely, madam. I will coordinate it with Housekeeping and the florist, and come back to you within the hour.",
      ],
    ),
    risk(
      also(
        sp(
          "Can you promise the room will be ready before we go up after dinner?",
          t2b,
          "Không hứa thay bộ phận khác: giờ đó do 'Housekeeping' quyết. Nói việc bạn làm được và lúc bạn báo lại.",
          undefined,
          ["time", "dinner"],
          t2a,
        ),
        [
          "Housekeeping sets that time, madam, so I will ask them now and confirm it with you during dinner.",
          "Housekeeping sets the time, madam, so I will ask them now and confirm it with you at dinner.",
        ],
      ),
    ),
    sp(
      "And who pays for the flowers?",
      t2c,
      "Tiền của khách: giá đưa trước, khách đồng ý rồi mới đặt. Không tự đặt rồi cộng vào hoá đơn.",
      undefined,
      undefined,
      t2b,
    ),
    sp(
      "Housekeeping here. You asked about petals in a room?",
      "Yes, please. The couple is at dinner now. Could you finish the room before they go up?",
      "Nói với đồng nghiệp bộ phận khác: không sir/madam, lịch sự bằng câu hỏi Could you. Không đọc số phòng ở nơi khách nghe được.",
      "colleague",
    ),
    sp(
      "Concierge. The florist can do roses, but only by tomorrow.",
      "Thank you. I will tell the guest now and come back to you with her answer.",
      "'come back to you' dùng được cả với đồng nghiệp: bạn là đầu mối, chuyển câu trả lời hai chiều.",
      "colleague",
    ),
    also(
      sp(
        "We have an early flight tomorrow. Can the restaurant arrange a car to the airport?",
        "Since you mentioned an early flight, sir, I will ask the concierge about a car. I will come back to you before dessert.",
        "Nhắc lại điều khách vừa kể bằng 'Since you mentioned'. Xe là việc của bộ phận khác: bạn hỏi giúp và hứa mốc giờ BẠN quay lại — không hứa xe, không hứa giờ thay họ.",
      ),
      [
        "Since you mentioned an early flight, sir, I will ask the concierge for a car. I will come back to you before dessert.",
      ],
    ),
  ],
  reading: read(
    `ONE OCCASION, FOUR DEPARTMENTS
A special evening rarely belongs to one department. The restaurant takes the booking, but the flowers come through the concierge and the florist. Petals in the room are Housekeeping's work. A note on the guest profile is the Front Desk's.
The guest should never have to call four numbers. The person who took the booking coordinates, and the guest hears one voice.
But you only promise what is yours. You can promise the table, the cake from the pastry team and your own call back. You cannot promise Housekeeping's time or the florist's price. Say "I will ask Housekeeping and come back to you within the hour", then do exactly that.
Every request goes in writing. The room number is for internal notes only and is never read aloud in the dining room. Ask each department for a clear yes and a time, and write down who said it.
Money is the guest's decision. Extras such as roses or a car are priced first and ordered only when the guest agrees.
If one part fails, tell the guest early, with a choice. A late "sorry, no flowers" at the table spoils more than the flowers.`,
    [
      {
        q: "Vì sao người nhận đặt chỗ nên làm đầu mối phối hợp?",
        options: [
          "Vì nhà hàng được tính thêm phí phối hợp với các bộ phận",
          "Để khách chỉ làm việc với một người, không gọi bốn nơi",
          "Vì các bộ phận khác không được nói chuyện với khách",
        ],
        correct: 1,
        explanation:
          "'The guest should never have to call four numbers… the guest hears one voice.'",
      },
      {
        q: "Nhân viên nhà hàng được hứa điều gì?",
        options: [
          "Bàn, bánh của bếp bánh và cuộc gọi báo lại của mình",
          "Giờ Buồng phòng làm xong phòng cho cặp đôi",
          "Giá hoa mà thợ cắm hoa sẽ báo cho khách",
        ],
        correct: 0,
        explanation:
          "'You can promise the table, the cake from the pastry team and your own call back. You cannot promise Housekeeping's time or the florist's price.'",
      },
      {
        q: "Một phần của kế hoạch không làm được thì sao?",
        options: [
          "Lặng lẽ bỏ phần đó, khách có thể không để ý",
          "Đợi tới bữa tối rồi mới xin lỗi khách tại bàn",
          "Báo khách sớm, kèm một lựa chọn khác",
        ],
        correct: 2,
        explanation:
          "'If one part fails, tell the guest early, with a choice. A late sorry, no flowers at the table spoils more than the flowers.'",
      },
    ],
  ),
  game: [
    round(
      "Could Housekeeping put rose petals on our bed while we eat?",
      "I will ask Housekeeping now, sir, and come back to you before your main course.",
      "I will ask Housekeeping now, sir, and coming back to you before your main course.",
      "Of course, sir — Housekeeping will have it all done by eight tonight, I promise you.",
      "'and coming back' sai: hai động từ sau 'will' đều nguyên mẫu (ask… and come). Câu hứa Buồng phòng xong lúc tám giờ đúng tiếng Anh nhưng hứa giờ thay bộ phận khác. Đáp án hứa đúng việc của mình: hỏi, rồi quay lại báo.",
      1,
    ),
    round(
      "The florist says roses cost extra. Shall I just add them to the guest's bill?",
      "No — tell the guest the price first, and order only if she agrees.",
      "No — tell the guest the price first, and order only if she agree.",
      "Yes, she said she wanted roses, so she will not mind paying a little extra.",
      "'if she agree' thiếu -s: 'she agrees'. Câu 'she will not mind paying a little extra' đúng ngữ pháp nhưng tiêu tiền của khách khi khách chưa đồng ý. Đáp án: báo giá trước, khách đồng ý mới đặt.",
      2,
      "colleague",
    ),
  ],
});

// ── Lesson 3 — words for the moment ──────────────────────────────────────────
const t3a = "Congratulations to him, madam! Would you like something sparkling to mark it?";
const t3b =
  "With pleasure, madam. I will bring two glasses now, and then step back so you can enjoy the moment.";
const t3c =
  "Of course, madam. On behalf of the whole team, congratulations, and may the year ahead be a happy one.";

const lesson3 = L(34, 3, "Words for the Moment", "Lời chúc đúng khoảnh khắc", {
  vocabulary: [
    c("Congratulations", "Congratulations on your anniversary, madam.", [
      "/kənˌɡrætʃuˈleɪʃnz/",
      "Lời chúc mừng",
      "🎉",
    ]),
    c("On behalf of", "On behalf of the whole team, happy anniversary.", [
      "/ɒn bɪˈhɑːf əv/",
      "Thay mặt cho",
      "🙇",
    ]),
    c("Raise a glass", "The table would like to raise a glass after the main course.", [
      "/reɪz ə ɡlɑːs/",
      "Nâng ly chúc mừng",
      "🥂",
    ]),
    c("Step back", "Serve the champagne, then step back from the table.", [
      "/step bæk/",
      "Lùi lại — nhường khoảnh khắc cho khách",
      "👣",
    ]),
  ],
  grammar: [
    g(
      "Happy birthday! Blow the candle, grandma!",
      "On behalf of all of us, happy birthday, madam. We are honoured you chose us tonight.",
      "'On behalf of' nâng lời chúc thành lời của cả nhà hàng — trang trọng, một câu, rồi lùi lại. 'We are honoured': tính từ có -ed.",
      "On behalf of all of us, happy birthday, madam. We are honour you chose us tonight.",
    ),
    g(
      "You propose now? I bring ring? So romantic!",
      "Everything is ready, sir. When you would like the champagne, just look my way.",
      "Với khoảnh khắc riêng tư, nhân viên nói ít đi: 'just look my way' — một tín hiệu thay cho mọi câu hỏi. Lời mời nhẹ dùng động từ nguyên mẫu.",
      "Everything is ready, sir. When you would like the champagne, just looking my way.",
    ),
  ],
  speaking: [
    also(
      sp(
        "We are celebrating — my husband was promoted this morning!",
        t3a,
        "Chúc mừng TRƯỚC ('Congratulations to him'), rồi một lời mời vẫn ở dạng câu hỏi. 'Congratulations' trọng âm ở âm LA.",
      ),
      ["Congratulations to him, madam! Would you like something sparkling to celebrate?"],
    ),
    sp(
      "Yes, two glasses of champagne, please.",
      t3b,
      "Phục vụ xong thì 'step back' — khoảnh khắc là của khách. Nói rõ việc làm ngay ('two glasses now').",
      undefined,
      undefined,
      t3a,
    ),
    also(
      sp(
        "Would you say a few words when we raise a glass? Something short.",
        t3c,
        "Một câu chúc chuẩn dùng được cả năm: mở bằng 'On behalf of', rồi 'congratulations', rồi 'may'. Đọc chậm, mỉm cười, rồi lùi lại.",
        undefined,
        undefined,
        t3b,
      ),
      [
        "Of course, madam. On behalf of the whole team, congratulations, and may the coming year be a happy one.",
      ],
    ),
    sp(
      "We would like to make a toast later. How does that work here?",
      "Whenever you are ready to raise a glass, sir, catch my eye, and the champagne will be poured.",
      "Đưa tín hiệu cụ thể cho khách (nhìn về phía bạn), và nhắc lại cụm 'raise a glass'. Bị động 'will be poured' cho việc nhân viên làm.",
    ),
    sp(
      "My wife and I are not drinking. Can we still have a toast?",
      "Of course, sir. We have something sparkling without alcohol, so you can raise a glass too.",
      "Khách không uống rượu: đưa lựa chọn không cồn ngay, không hỏi lý do, không bình luận.",
    ),
    also(
      sp(
        "I am going to propose tonight. Can you help me?",
        "What wonderful news, sir. Tell me the moment you want, and we will be discreet and step back.",
        "Lời cầu hôn: nhân viên kín đáo ('discreet'), không vỗ tay, không tụ tập xem. Khách chọn thời điểm.",
        undefined,
        ["discreet"],
      ),
      [
        "What wonderful news, sir. Tell me the moment you want, and we will step back and be discreet.",
      ],
    ),
    risk(
      also(
        sp(
          "It is our honeymoon. Surely the champagne is on the house?",
          "A bottle on the house needs approval from my supervisor, madam. May I ask her for you?",
          "Dịp vui không đổi luật tiền: món tặng cần 'approval' của giám sát. Xin phép đi hỏi, không hứa trước.",
          undefined,
          ["house", "approval", "supervisor"],
        ),
        [
          "A bottle on the house needs approval from my supervisor, madam. May I ask her now?",
          "A bottle on the house needs approval from my supervisor, madam. Shall I ask her for you?",
        ],
      ),
    ),
  ],
  reading: read(
    `THE STAFF AND THE MOMENT — WHERE WE STAND
A toast, a ring, a first look at the cake: these belong to the guests. Our part is delivery, then distance. Serve, say one short line if the host invites it, and step back.
A formal wish has a shape: "On behalf of the whole team, congratulations on…" or "May the year ahead be…". One sentence is enough.
No jokes about age, about weddings, or about babies to come. A line that lands well at one table can hurt at another, and we cannot know which table is which.
If the table is not drinking, offer something sparkling without alcohol for the toast, and never ask why.
During a proposal, there is no clapping from staff, no gathering of colleagues to watch, and no photographs unless the couple asks. If the answer is not yes, clear quietly and treat the table like any other.
If other tables notice a celebration, keep their service at full attention. The fastest way to spoil a party is a neighbouring table that feels forgotten.
A celebration does not change who decides money. A bottle on the house still needs a supervisor's approval, however happy the evening.`,
    [
      {
        q: "Lời chúc trang trọng của nhân viên có hình dạng thế nào?",
        options: [
          "Một bài phát biểu ngắn khoảng ba đến bốn câu",
          "Chỉ một câu, theo khung On behalf of the whole team hoặc May",
          "Một câu đùa vui để cả bàn cùng cười thoải mái",
        ],
        correct: 1,
        explanation:
          "'A formal wish has a shape: On behalf of the whole team… or May the year ahead be… One sentence is enough.'",
      },
      {
        q: "Nếu lời cầu hôn không được nhận lời, nhân viên làm gì?",
        options: [
          "Mang tráng miệng miễn phí ra để an ủi khách",
          "Đổi khách sang một bàn khuất cho đỡ ngại",
          "Dọn bàn lặng lẽ, phục vụ như mọi bàn khác",
        ],
        correct: 2,
        explanation:
          "'If the answer is not yes, clear quietly and treat the table like any other.' Món tặng cũng không phải quyền của người phục vụ.",
      },
      {
        q: "Khách đang có tiệc vui xin một chai rượu miễn phí. Theo bài thì sao?",
        options: [
          "Vẫn cần giám sát duyệt",
          "Người phục vụ được tự quyết vì đây là dịp đặc biệt",
          "Bếp trưởng quyết, vì rượu đi cùng món tráng miệng",
        ],
        correct: 0,
        explanation:
          "'A celebration does not change who decides money. A bottle on the house still needs a supervisor's approval.'",
      },
    ],
  ),
  game: [
    round(
      "The cake is coming out now — should we all sing, or what do we do?",
      "That is your choice, madam. The cake comes in with the candles lit.",
      "Singing is not allow in the dining room, madam — the other tables must not be disturbed.",
      "Singing is not allowed in the dining room, madam — the other tables must not be disturbed.",
      "'is not allow' sai: bị động cần quá khứ phân từ 'allowed'. Cả câu đó lẫn câu đúng ngữ pháp 'Singing is not allowed…' đều lạnh lùng và lấy mất khoảnh khắc của khách. Đáp án trả quyền chọn cho khách.",
      0,
    ),
    round(
      "It is my parents' fiftieth wedding anniversary. Could you say something?",
      "On behalf of all of us, congratulations on fifty years together.",
      "Fifty years! Was it love at first sight for you two, or did it took a while?",
      "Fifty years! Was it love at first sight for you two, or did it take a while?",
      "'did it took' sai: sau 'did' là động từ nguyên mẫu 'take'. Cả câu đó lẫn câu đúng tiếng Anh 'Was it love at first sight…' đều là câu hỏi đời tư, đùa quá trớn. Đáp án: một câu chúc trang trọng.",
      2,
    ),
  ],
});

// ── Lesson 4 — the cake, the signal and plan B ───────────────────────────────
const t4a =
  "Just catch my eye and give me a small signal, sir. The cake waits out of sight until then.";
const t4b =
  "She will not, sir. The cake stays in the pantry, and the candles are lit there, not at the table.";
const t4c =
  "Every detail is on the slip, sir, and I will pass it on to my colleague by name before I go.";

const lesson4 = L(34, 4, "The Cake, the Signal and Plan B", "Chiếc bánh, tín hiệu và phương án B", {
  vocabulary: [
    c("Signal", "Wait for the host's signal before the cake moves.", [
      "/ˈsɪɡnəl/",
      "Tín hiệu đã hẹn trước với chủ tiệc",
      "🚦",
    ]),
    c("Out of sight", "The cake waits out of sight until the host is ready.", [
      "/aʊt əv saɪt/",
      "Khuất tầm mắt khách",
      "🙈",
    ]),
    c("Pass it on", "Going off shift? Pass it on to one named colleague.", [
      "/pɑːs ɪt ɒn/",
      "Bàn giao lại cho đúng một người kế tiếp",
      "📨",
    ]),
    c("Mix-up", "Two bookings with the same name caused a mix-up with the cakes.", [
      "/ˈmɪks ʌp/",
      "Sự nhầm lẫn",
      "🔀",
    ]),
    c("Plan B", "The pastry team always has a plan B for a dropped cake.", [
      "/plæn biː/",
      "Phương án dự phòng",
      "🅱️",
    ]),
  ],
  grammar: [
    g(
      "The bakery wrote the wrong name, not us.",
      "The name on the cake is wrong, madam, and that is ours to fix. The pastry team is writing it again now.",
      "'That is ours to fix' — nhận trách nhiệm, không chỉ tay sang ai. Đại từ sở hữu đứng một mình là 'ours', không phải 'our'.",
      "The name on the cake is wrong, madam, and that is our to fix. The pastry team is writing it again now.",
    ),
    g(
      "My shift ends at nine. Not my problem after.",
      "I finish soon, madam, so my colleague will look after your evening. She has every detail.",
      "Bàn giao có người nhận: lời hứa không rời đi cùng ca trực. Sau 'will' là động từ nguyên mẫu: will look after.",
      "I finish soon, madam, so my colleague will looks after your evening. She has every detail.",
    ),
  ],
  speaking: [
    also(
      sp(
        "How do I let you know it is time for the cake?",
        t4a,
        "Đưa tín hiệu CỤ THỂ ('signal'), đừng nói 'bất cứ lúc nào'. Vế sau nói bánh ở đâu: 'out of sight'.",
      ),
      [
        "Just catch my eye and give me a small signal, sir. Until then, the cake waits out of sight.",
      ],
    ),
    sp(
      "What if my wife sees the cake before I am ready?",
      t4b,
      "Trấn an bằng sự thật: bánh ở đâu, nến thắp ở đâu. Không tắt đèn cả phòng cho một bàn.",
      undefined,
      undefined,
      t4a,
    ),
    also(
      sp(
        "Wait — you finish at nine? But you know the whole plan!",
        t4c,
        "Bàn giao có tên: 'pass it on to my colleague by name'. Mọi chi tiết nằm trên phiếu, không nằm trong trí nhớ một người.",
        undefined,
        undefined,
        t4b,
      ),
      [
        "Every detail is on the slip, sir, and I will pass it on to my colleague by name before I leave.",
      ],
    ),
    also(
      sp(
        "This says Happy Birthday David. My husband's name is Daniel.",
        "That is our mix-up, madam, and I am sorry. The pastry team is writing it again now.",
        "Nhận lỗi về mình ('our mix-up'), không đổ cho tiệm bánh. Câu sau là việc đang làm ngay.",
      ),
      ["That is our mix-up, madam, and I am so sorry. The pastry team is writing it again now."],
    ),
    sp(
      "You had one job — the cake at nine. It is half past nine!",
      "You are right, sir, and I am sorry. The cake is on its way now, with the candles lit.",
      "Khách đúng thì để khách đúng: 'You are right' trước, rồi việc đang diễn ra. Không kể lý do bếp bận.",
    ),
    sp(
      "The cake fell when we took it out of the fridge. What do we do?",
      "Plan B: plate a birthday dessert with candles, and I will tell the host quietly, away from the table.",
      "Nói với đồng nghiệp bếp bánh: không sir/madam. Tin xấu chỉ báo cho chủ tiệc, tránh xa bàn, kèm ngay 'Plan B'.",
      "colleague",
    ),
  ],
  reading: read(
    `THE SURPRISE ACROSS A SHIFT CHANGE — AND WHEN IT BREAKS
A surprise does not survive on goodwill. It survives on the slip: the signal, where the cake is, the spelling of the name, who must not know, and who pays.
Before you go off shift, hand the slip to one named colleague. Walk them to the cake, point out the host, and have them read the signal back to you. Then introduce them to the host by name.
Brief the team in the back office, not at the pass. Kitchens carry voices, and a surprise can reach the wrong table faster than a starter.
Candles are lit in the pantry, not at the table, and the room lights stay as they are. A sparkler is its own question, because fire rules differ by hotel, so ask your manager before you promise one.
If something breaks, protect the moment. Wrong name on the cake: ask the pastry team how long a new one takes before you promise a time. Cake dropped or missing: tell the host only, away from the table, with plan B in the same breath. The table hears "dessert is coming", not the story.
Afterwards, write what happened on the slip: the fact, the fix and the time.`,
    [
      {
        q: "Bàn giao một bất ngờ cho ca sau gồm những việc gì?",
        options: [
          "Trao phiếu cho một người có tên, dẫn tới chỗ bánh và chỉ mặt chủ tiệc",
          "Ghi vào sổ chung của ca và nhắn tin cho cả nhóm trực tối",
          "Nói nhanh với cả ca trong giờ họp ngay tại khu vực pass",
        ],
        correct: 0,
        explanation:
          "'hand the slip to one named colleague. Walk them to the cake, point out the host…' — và họp ở văn phòng, không ở quầy pass.",
      },
      {
        q: "Bánh bị rơi trước giờ mang ra. Báo cho ai, thế nào?",
        options: [
          "Báo cả bàn cùng nghe để mọi người thông cảm cho bếp",
          "Không báo ai, lặng lẽ bỏ phần bánh khỏi chương trình",
          "Chỉ báo chủ tiệc, tránh xa bàn, kèm phương án B",
        ],
        correct: 2,
        explanation:
          "'tell the host only, away from the table, with plan B in the same breath. The table hears dessert is coming, not the story.'",
      },
      {
        q: "Vì sao phải hỏi quản lý trước khi hứa cắm pháo bông lên bánh?",
        options: [
          "Vì luật về lửa mỗi khách sạn một khác",
          "Vì pháo bông luôn tính thêm phí rất cao",
          "Vì bếp bánh không thích pháo bông",
        ],
        correct: 0,
        explanation:
          "'A sparkler is its own question, because fire rules differ by hotel, so ask your manager before you promise one.'",
      },
    ],
  ),
  game: [
    round(
      "Half past nine and my husband still has not given the signal. The children are falling asleep.",
      "Shall the cake come now, madam, or wait for another day? Either is easy for us.",
      "Shall the cake comes now, madam, or wait for another day? Either is easy for us.",
      "The signal is his to give, madam, so I am afraid we must keep waiting for him.",
      "'Shall the cake comes' sai: sau 'shall' là động từ nguyên mẫu. Câu 'we must keep waiting for him' đúng ngữ pháp nhưng cứng nhắc — buổi tối đã đổi, người phục vụ nên hỏi lại một lần, nhẹ nhàng. Đáp án đưa hai lựa chọn.",
      0,
    ),
    round(
      "The pastry team says a new cake takes twenty minutes. What do I tell the host?",
      "Tell the host quietly, away from the table, and offer a plated dessert with candles now as plan B.",
      "Tell the whole table it will be twenty minute, so everybody knows why they are waiting.",
      "Tell the whole table it will be twenty minutes, so everybody knows why they are waiting.",
      "'twenty minute' thiếu -s: sau số đếm từ hai trở lên là 'minutes'. Cả câu đó lẫn câu đúng tiếng Anh 'Tell the whole table…' đều làm lộ bất ngờ và làm hỏng khoảnh khắc. Đáp án: chỉ chủ tiệc biết, kèm phương án B.",
      1,
      "colleague",
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: nhận đặt một dịp đặc biệt (cột mốc, tên trên bánh, bí mật, dị ứng), phối hợp với Buồng phòng, Concierge và bếp bánh mà chỉ hứa phần của mình ('I will ask… and come back to you…'), nói một câu chúc trang trọng 'On behalf of…' rồi lùi lại, và xử lý khi bất ngờ trục trặc bằng phương án B.",
};
