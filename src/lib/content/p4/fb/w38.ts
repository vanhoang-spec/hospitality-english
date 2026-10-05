// FB week 38 — Presenting a Banquet Proposal (hand-authored Phase 4, see
// ../kit.ts).
//
// The matrix gives week 38 the short three-part pitch, and for a restaurant
// the pitch is the banquet proposal: the menu, the price, the next steps. Four
// lessons: the shape of the walk-through; the price said in full ("seven
// hundred thousand plus-plus — about eight hundred and ten thousand all in",
// five percent service and ten percent VAT on top); the honest drinks advice,
// which sometimes recommends against the dearer package; and the close —
// tasting, the date the price is valid until, one follow-up, and a gracious
// goodbye when the answer is no.
//
// The terms underneath are week 37's, unchanged: the deposit confirms the
// date after the tasting, the contract comes from the manager in writing, and
// a lower price, a dropped service charge or a price held past its date is the
// manager's decision, asked for on the host's behalf. In a proposal meeting
// the price IS said aloud — that is the difference from the wine list at the
// table (week 32), and the reading says so.
//
// Kept from the earlier week because the floor managers rated it: 700++ ≈ 810,
// building backwards from the host's budget, the honest upsell, follow up
// once. Fixed: no weekday the guest never named, no number the guest has to
// remember from a page the learner never saw.
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

// ── Lesson 1 — the shape of a pitch ──────────────────────────────────────────
const t1a =
  "Thank you, madam. May I walk you through the proposal in three parts: the menu, the price and the next steps?";
const t1b =
  "Since you mentioned seafood, madam, the menu is built around it, with dishes the whole table can share.";
const t1c =
  "Yes, madam: seven hundred thousand per head, plus service and VAT. Then the next steps: a tasting and a date.";

const lesson1 = L(38, 1, "The Shape of a Pitch", "Hình dạng của một bài trình bày", {
  vocabulary: [
    c("Walk you through", "May I walk you through the proposal before you read it?", [
      "/wɔːk juː θruː/",
      "Trình bày lần lượt cho khách theo dõi",
      "🧭",
    ]),
    c("Proposal", "The proposal holds the menu, the price and the next steps.", [
      "/prəˈpəʊzl/",
      "Bản đề xuất (thực đơn, giá, điều khoản)",
      "📑",
    ]),
    c("In three parts", "Present the proposal in three parts, and say so first.", [
      "/ɪn θriː pɑːts/",
      "Chia thành ba phần",
      "3️⃣",
    ]),
    c("Next steps", "Every meeting ends with the next steps and a date.", [
      "/nekst steps/",
      "Các bước tiếp theo",
      "👣",
    ]),
  ],
  grammar: [
    g(
      "Here is paper. Price at bottom. Any question?",
      "May I walk you through it, madam? There are three parts: the menu, the price and the next steps.",
      "Khung mở bài: 'May I walk you through…?' + báo trước số phần. Người nghe biết bản đồ trước thì nghe chi tiết dễ hơn. Sau 'May I' là động từ nguyên mẫu.",
      "May I walking you through it, madam? There are three parts: the menu, the price and the next steps.",
    ),
    g(
      "Very cheap for you. Good deal. Sign here.",
      "First the menu, then the price, and finally the next steps — please stop me at any point.",
      "Từ nối thứ tự First… then… finally… giúp người nghe theo kịp. 'finally' là trạng từ, có -ly. Mời khách ngắt lời biến bài trình bày thành cuộc trò chuyện.",
      "First the menu, then the price, and final the next steps — please stop me at any point.",
    ),
  ],
  speaking: [
    also(
      sp(
        "We have twenty minutes before our next meeting. What have you prepared for us?",
        t1a,
        "Mở bằng tấm bản đồ: 'walk you through' + 'in three parts', rồi đọc tên ba phần. Khách bận nghe được cấu trúc trước khi nghe chi tiết.",
      ),
      [
        "Thank you, madam. May I walk you through the proposal in three parts: the menu, the price, and the next steps?",
      ],
    ),
    also(
      sp(
        "Fine. Start with the menu, then. We said we would like seafood.",
        t1b,
        "Phần một bắt đầu bằng chính lời của khách: khung quen thuộc 'Since you mentioned'. Khách nghe thấy mình được lắng nghe, không nghe thấy lời chào hàng.",
        undefined,
        undefined,
        t1a,
      ),
      [
        "Since you mentioned seafood, madam, the menu is built around it, with dishes the table can share.",
      ],
    ),
    also(
      sp(
        "That sounds right. And the price — I saw seven hundred thousand on the page?",
        t1c,
        "Phần hai và phần ba: nhắc lại con số khách vừa đọc kèm 'plus service and VAT', rồi chuyển sang 'next steps' ngay — không để khoảng lặng sau con số.",
        undefined,
        undefined,
        t1b,
      ),
      [
        "Yes, madam: seven hundred thousand per head, plus service and VAT. Then the next steps: a tasting and a date.",
      ],
    ),
    sp(
      "Sorry to interrupt — is the wine included in that price?",
      "Please stop me at any time, madam. The wine is not in that price, and the drinks come next.",
      "Khách ngắt lời là tín hiệu tốt: cảm ơn bằng lời mời ngắt tiếp, trả lời thẳng câu hỏi, rồi nói phần nào sẽ tới.",
    ),
    also(
      sp(
        "Just email me the document. I will read it later.",
        "Of course, madam. May I take two minutes to walk you through it first? Then the proposal is yours to keep.",
        "Không ép, chỉ xin hai phút. Lý do ngầm: con số do bạn nói ra thì rõ hơn con số khách tự đọc một mình.",
      ),
      [
        "Of course, madam. May I take two minutes to walk you through it first? Then the proposal is yours.",
      ],
    ),
    sp(
      "You are presenting the wedding proposal this afternoon. How will you open?",
      "In three parts: the menu, the price per head and the next steps. Then I stop and listen.",
      "Trả lời quản lý: không sir/madam. Câu đầu là cấu trúc, câu sau là thói quen quan trọng nhất của người trình bày — dừng lại và nghe.",
      "manager",
    ),
  ],
  reading: read(
    `PRESENTING A PROPOSAL — THREE PARTS, THEN SILENCE
A host who asks for a proposal is usually busy, often nervous, and sometimes comparing three hotels. Make the next ten minutes easy to follow.
Begin with the map: "May I walk you through the proposal in three parts: the menu, the price and the next steps?" A host who knows the shape listens better.
Start each part with the host's own words. "Since you mentioned seafood…" tells the host you listened. "Our chef is famous…" tells them you are selling.
Say the price aloud, slowly, in dong. At the table, a wine price is never read aloud; in a proposal meeting, saying the number is respect. Never let the host find a number on the page that you did not say.
Invite questions: "Please stop me at any point." Then really stop when they do.
Finish with the next steps and a date, not with pressure. Then stop talking. The proposal that sits quietly on the table while the host thinks is the one that gets signed.`,
    [
      {
        q: "Bài trình bày đề xuất nên mở đầu bằng gì?",
        options: [
          "Tấm bản đồ: ba phần sẽ trình bày",
          "Con số đắt nhất để khách quen dần với giá",
          "Một câu chuyện dài về lịch sử của khách sạn",
        ],
        correct: 0,
        explanation:
          "'Begin with the map… in three parts: the menu, the price and the next steps. A host who knows the shape listens better.'",
      },
      {
        q: "Vì sao trong buổi trình bày đề xuất lại được nói giá thành tiếng?",
        options: [
          "Vì khách không đọc được tài liệu tiếng Anh",
          "Vì đó là sự tôn trọng khách",
          "Vì quản lý yêu cầu nói giá trước mọi thứ khác",
        ],
        correct: 1,
        explanation:
          "'in a proposal meeting, saying the number is respect. Never let the host find a number on the page that you did not say.' Ở bàn ăn thì khác: giá rượu không đọc to.",
      },
      {
        q: "Bài đọc khuyên kết thúc buổi trình bày thế nào?",
        options: [
          "Thúc khách ký ngay để giữ được ngày đẹp",
          "Giảm thêm một chút để khách quyết nhanh hơn",
          "Nêu bước tiếp theo, rồi dừng nói",
        ],
        correct: 2,
        explanation:
          "'Finish with the next steps and a date, not with pressure. Then stop talking.'",
      },
    ],
  ),
  game: [
    round(
      "Just give me the bottom line. I do not need the whole story.",
      "Of course, madam — seven hundred thousand plus-plus per head, and the date is held for a week.",
      "Of course, madam — seven hundred thousand plus-plus per head, and the date is hold for a week.",
      "It depends on many things, madam — the menu, the drinks, the room and even the season.",
      "'the date is hold' sai: bị động cần quá khứ phân từ 'held'. Câu 'It depends on many things' đúng tiếng Anh nhưng né đúng điều khách vừa hỏi — một con số. Đáp án đưa con số và một mốc ngày.",
      2,
    ),
    round(
      "How do I start a proposal meeting? I usually just hand over the document.",
      "Start with the map: three parts — the menu, the price and the next steps, in that order.",
      "Start with the map: three part — the menu, the price and the next step.",
      "Hand it over and wait. If the host has any questions, they will ask them.",
      "'three part… the next step' sai số nhiều: 'three parts', 'next steps'. Câu 'Hand it over and wait' đúng ngữ pháp nhưng bỏ mất việc chính của buổi gặp — dẫn khách qua đề xuất. Đáp án đưa khung ba phần.",
      0,
      "colleague",
    ),
  ],
});

// ── Lesson 2 — plus-plus, said in full ───────────────────────────────────────
const t2a = "It means a five percent service charge and ten percent VAT on top, madam.";
const t2b =
  "About eight hundred and ten thousand all in, madam. I will print that number on the proposal.";
const t2c =
  "You are right, madam. From now on, I will show the all-in price next to the plus-plus one.";

const lesson2 = L(38, 2, "Plus-Plus, Said in Full", "Giá plus-plus, nói thành số cuối", {
  vocabulary: [
    c("Plus-plus", "Seven hundred plus-plus means service and VAT go on top.", [
      "/ˌplʌs ˈplʌs/",
      "Giá chưa gồm phí phục vụ và thuế VAT (dấu ++)",
      "➕",
    ]),
    c("All in", "Give the host the price all in, not only the plus-plus price.", [
      "/ɔːl ɪn/",
      "Đã gồm tất cả các khoản",
      "🧮",
    ]),
    c("Round number", "Give the host one round number to repeat in the office.", [
      "/raʊnd ˈnʌmbə/",
      "Con số tròn, dễ nhớ",
      "⭕",
    ]),
    c("Work backwards", "Work backwards from the host's budget, on paper.", [
      "/wɜːk ˈbækwədz/",
      "Tính ngược từ con số của khách",
      "⏪",
    ]),
    c("Budget", "A host with a fixed budget deserves a menu that fits it.", [
      "/ˈbʌdʒɪt/",
      "Ngân sách",
      "💰",
    ]),
  ],
  grammar: [
    g(
      "VAT extra, service extra. Normal thing.",
      "The menu is seven hundred thousand plus-plus, sir — about eight hundred and ten thousand all in.",
      "'Plus-plus' phải được dịch ra số cuối ngay trong cùng một câu. Chủ ngữ 'The menu' số ít nên dùng 'is'.",
      "The menu are seven hundred thousand plus-plus, sir — about eight hundred and ten thousand all in.",
    ),
    g(
      "Your budget too small. Cannot.",
      "Let us work backwards from your budget, madam: thirty million for forty guests is seven hundred and fifty thousand each.",
      "Tính ngược từ ngân sách của khách là tôn trọng, không phải nhượng bộ. Sau 'Let us' là động từ nguyên mẫu: work.",
      "Let us works backwards from your budget, madam: thirty million for forty guests is seven hundred and fifty thousand each.",
    ),
  ],
  speaking: [
    sp(
      "Your quote says seven hundred thousand plus-plus. What does plus-plus mean?",
      t2a,
      "Định nghĩa ngắn, đủ hai khoản: phí phục vụ và VAT, 'on top' — cộng thêm vào giá thực đơn.",
    ),
    also(
      sp(
        "So what is the real number for each person?",
        t2b,
        "Câu trả lời là MỘT con số tròn, nói kèm 'all in'. Vế sau là việc của bạn: in con số đó lên bản đề xuất.",
        undefined,
        undefined,
        t2a,
      ),
      [
        "About eight hundred and ten thousand all in, madam. I will print that number on the proposal for you.",
      ],
    ),
    also(
      sp(
        "Then why not just write that number in the first place?",
        t2c,
        "Khách đúng thì để khách đúng: 'You are right'. Rồi một thay đổi cụ thể bạn tự làm được — in giá trọn gói cạnh giá 'plus-plus'.",
        undefined,
        undefined,
        t2b,
      ),
      ["You are right, madam. From now on, I will show the all-in price beside the plus-plus one."],
    ),
    also(
      sp(
        "Our budget is thirty million for forty guests, and that is final.",
        "Then let us work backwards from thirty million, sir: that is seven hundred and fifty thousand per head, all in.",
        "Con số do khách nêu: chia ngay trước mặt khách, thành tiếng. 'Work backwards' — bắt đầu từ ngân sách của khách, không từ bảng giá.",
      ),
      [
        "Then let us work backwards from thirty million, sir. That is seven hundred and fifty thousand per head, all in.",
      ],
    ),
    risk(
      also(
        sp(
          "Can you just drop the service charge so it fits our budget?",
          "The service charge is set by my manager, sir. However, I can make a menu for your budget.",
          "Phí phục vụ không phải quyền của bạn: nói ai đặt ra nó. 'However' mở việc bạn làm được — một thực đơn vừa ngân sách, không bớt phí.",
          undefined,
          ["manager"],
        ),
        [
          "The service charge is set by my manager, sir. However, I can make a menu for your budget instead.",
          "My manager sets the service charge, sir. However, I can make a menu for your budget.",
        ],
      ),
    ),
    sp(
      "The host wants one number to take back to her office. What do I give her?",
      "One round number, all in: eight hundred and ten thousand per head. Nothing she has to work out.",
      "Nói với đồng nghiệp: không sir/madam. Chủ tiệc sẽ phải nhắc lại con số trong cuộc họp của họ — cho họ một 'round number', đã gồm mọi khoản.",
      "colleague",
    ),
  ],
  reading: read(
    `THE NUMBERS CONVERSATION
Quote in dong, always. The menu is priced in dong, and the contract is signed in dong.
"Plus-plus" means a five percent service charge and ten percent VAT on top of the menu price. Translate it in the same breath: "seven hundred thousand plus-plus — about eight hundred and ten thousand all in."
Give the host one round number they can repeat in their own office. The committee will remember the last number you said, so make it the honest, full one.
A host who starts with a budget gets respect, not pressure. Work backwards from their number, on paper, in front of them: thirty million for forty guests is seven hundred and fifty thousand per head, all in. Then show the menu that fits.
The service charge and VAT are not yours to drop. If a host asks, the answer is the manager's, and the honest help you can give is a menu that fits the budget.
Never quote a number you cannot hold. Every proposal carries the date it is valid until.`,
    [
      {
        q: "'Plus-plus' nghĩa là gì?",
        options: [
          "Giá đã gồm mọi khoản phí và thuế",
          "Cộng thêm phí phục vụ và VAT",
          "Giá riêng cho khách đặt từ hai bàn trở lên",
        ],
        correct: 1,
        explanation:
          "'Plus-plus means a five percent service charge and ten percent VAT on top of the menu price.' Vì vậy phải dịch ngay ra số cuối cùng.",
      },
      {
        q: "Khách nêu ngân sách trước thì người trình bày làm gì?",
        options: [
          "Tính ngược từ ngân sách",
          "Thuyết phục khách tăng ngân sách cho xứng tầm tiệc",
          "Hứa xin quản lý giảm giá cho vừa túi tiền khách",
        ],
        correct: 0,
        explanation:
          "'Work backwards from their number, on paper, in front of them… Then show the menu that fits.'",
      },
      {
        q: "Khách xin bỏ phí phục vụ để vừa ngân sách thì ai quyết?",
        options: [
          "Người trình bày, để giữ được bữa tiệc",
          "Bếp trưởng, vì thực đơn là của bếp",
          "Quản lý",
        ],
        correct: 2,
        explanation:
          "'The service charge and VAT are not yours to drop. If a host asks, the answer is the manager's.' Việc của bạn là một thực đơn vừa ngân sách.",
      },
    ],
  ),
  game: [
    round(
      "Your quote says seven hundred thousand plus-plus. My boss hates surprises. What do we really pay?",
      "About eight hundred and ten thousand per head all in, sir. I will print that number for you.",
      "About eight hundred and ten thousand per head all in, sir. I will printing that number for you.",
      "The plus-plus is very small, sir — most companies do not even notice it on the invoice.",
      "'I will printing' sai: sau 'will' là động từ nguyên mẫu (print). Câu 'most companies do not even notice it' đúng ngữ pháp nhưng xem nhẹ đúng nỗi lo của khách. Đáp án dịch ra con số cuối và in ra.",
      0,
    ),
    round(
      "The host has thirty million for forty people. Shall I show her our most expensive menu anyway?",
      "No — work backwards from her budget, and show the menu that fits it.",
      "No — work backwards from her budget, and shows the menu that fits it.",
      "Yes — once she tastes it, she will find the extra money somewhere.",
      "'and shows' sai: hai mệnh lệnh nối bằng 'and' đều dùng động từ nguyên mẫu (work… and show). Câu 'she will find the extra money somewhere' đúng ngữ pháp nhưng ép khách vượt ngân sách. Đáp án bắt đầu từ con số của khách.",
      1,
      "colleague",
    ),
  ],
});

// ── Lesson 3 — the drinks question ───────────────────────────────────────────
const t3a =
  "Yes, madam — for forty guests over three hours, it will work out cheaper. For a short lunch, I would recommend against it.";
const t3b = "Because a host who believes my numbers comes back, madam. Today, the numbers say yes.";
const t3c =
  "The beverage package covers beer, house wine and soft drinks for three hours, madam. Cocktails are added by consumption.";

const lesson3 = L(38, 3, "The Drinks Question", "Câu hỏi về đồ uống", {
  vocabulary: [
    c(
      "Beverage package",
      "The beverage package covers beer, wine and soft drinks for three hours.",
      ["/ˈbevərɪdʒ ˈpækɪdʒ/", "Gói đồ uống trọn gói theo giờ", "🍹"],
    ),
    c("By consumption", "By consumption, the host pays only for what is poured.", [
      "/baɪ kənˈsʌmpʃn/",
      "Tính theo lượng thực uống",
      "🧾",
    ]),
    c("Work out cheaper", "For a long evening, the package can work out cheaper.", [
      "/wɜːk aʊt ˈtʃiːpə/",
      "Tính ra thì rẻ hơn",
      "📊",
    ]),
    c(
      "Recommend against",
      "Sometimes the honest answer is to recommend against the dearer option.",
      ["/ˌrekəˈmend əˈɡenst/", "Khuyên không nên chọn", "🙅"],
    ),
  ],
  grammar: [
    g(
      "Take the big package. More money for us — I mean, better for you!",
      "For forty guests over three hours, the package works out cheaper, madam. Here are the numbers.",
      "Bán thêm trung thực là để con số của chính khách làm phép tính. 'the package' số ít nên 'works' có -s.",
      "For forty guests over three hours, the package work out cheaper, madam. Here are the numbers.",
    ),
    g(
      "Package is package. Cannot change anything.",
      "The package covers beer, wine and soft drinks, sir, and cocktails can be added by consumption.",
      "Nói rõ gói gồm gì, rồi mở lối 'by consumption' bên cạnh. Bị động sau 'can be' cần quá khứ phân từ: added.",
      "The package covers beer, wine and soft drinks, sir, and cocktails can be add by consumption.",
    ),
  ],
  speaking: [
    also(
      sp(
        "Be honest — for forty of us over three hours, is the drinks package worth it?",
        t3a,
        "Câu trả lời trung thực có HAI vế: khi nào đáng ('work out cheaper'), khi nào không ('recommend against'). Con số do khách nêu nên được nhắc lại.",
      ),
      [
        "Yes, madam — for forty guests over three hours, it will work out cheaper. For a short lunch, I would recommend against it, though.",
      ],
    ),
    sp(
      "Why would you ever recommend against your own package?",
      t3b,
      "Lý do thật nói bằng 'Because': lòng tin quay lại thành khách quen. Câu sau đưa câu chuyện về đúng bàn này.",
      undefined,
      undefined,
      t3a,
    ),
    also(
      sp(
        "All right. What exactly does the package cover?",
        t3c,
        "Nói rõ BIÊN của gói (đồ gì, bao lâu), rồi cái nằm ngoài gói được tính 'by consumption'. Vang nhà là lựa chọn đáng tự hào, không phải lựa chọn rẻ.",
        undefined,
        undefined,
        t3b,
      ),
      [
        "The beverage package covers beer, house wine and soft drinks for three hours, madam. Cocktails can be added by consumption.",
      ],
    ),
    also(
      sp(
        "We will just pay for what people drink. It is simpler.",
        "By consumption it is, sir. Shall I set a limit, so the bar asks you before it goes over?",
        "Nhận lựa chọn của khách ngay, rồi một câu hỏi bảo vệ ví của khách: đặt mức giới hạn để quầy bar hỏi trước khi vượt.",
      ),
      [
        "By consumption it is, sir. Shall I set a limit, so the bar checks with you before it goes over?",
      ],
    ),
    sp(
      "Which option makes more money for you? I will take the other one.",
      "Honestly, the package, sir — and for your group it is still cheaper. The numbers are on this page.",
      "Câu hỏi khó trả lời bằng sự thật, rồi bằng chứng trên giấy. Không né, không đùa.",
    ),
    sp(
      "The host chose by consumption. What goes on the event order?",
      "By consumption, with the limit the host set. The bar asks her before it goes over.",
      "Nói với đồng nghiệp: không sir/madam. Ghi đủ hai ý để quầy bar làm đúng: cách tính và mức giới hạn.",
      "colleague",
    ),
  ],
  reading: read(
    `THE DRINKS QUESTION — PACKAGE OR BY CONSUMPTION
Every banquet proposal has a drinks page, and the host will ask which option is better.
The beverage package suits a long, thirsty evening: one price per head, a fixed number of hours, and no counting. By consumption suits a short or quiet event: the host pays for what is poured.
The honest seller runs the host's own numbers aloud: how many guests, how many hours, what this group drinks. Then the seller recommends, and sometimes recommends against the dearer option. A host who hears "I would not take the package for your lunch" believes every number after it.
By consumption always travels with a limit. The host names a number, and the bar asks before going over it. No host should learn the size of the bar bill from the invoice.
House wine, local beer and soft drinks are proud choices, not cheap ones. A party is remembered for its warmth, not for its most expensive bottle.
What the package holds and what it costs are on this season's banquet card. Quote the card, not your memory.`,
    [
      {
        q: "Gói đồ uống hợp với bữa tiệc như thế nào?",
        options: [
          "Tiệc dài, khách uống nhiều",
          "Bữa trưa ngắn, khách uống rất ít",
          "Tiệc có nhiều trẻ em và người lớn tuổi",
        ],
        correct: 0,
        explanation:
          "'The beverage package suits a long, thirsty evening… By consumption suits a short or quiet event.'",
      },
      {
        q: "Vì sao người bán trung thực đôi khi khuyên KHÔNG chọn gói đắt hơn?",
        options: [
          "Vì quản lý không cho bán gói đồ uống vào buổi trưa",
          "Vì khách sẽ tin mọi con số sau đó",
          "Vì gói đồ uống luôn khiến nhà hàng bị lỗ vốn",
        ],
        correct: 1,
        explanation:
          "'A host who hears I would not take the package for your lunch believes every number after it.'",
      },
      {
        q: "'By consumption' luôn đi kèm điều gì?",
        options: [
          "Một khoản cọc bằng giá của cả gói đồ uống",
          "Một nhân viên đứng đếm chai ở cửa phòng tiệc",
          "Một mức giới hạn do chủ tiệc đặt",
        ],
        correct: 2,
        explanation:
          "'By consumption always travels with a limit. The host names a number, and the bar asks before going over it.'",
      },
    ],
  ),
  game: [
    round(
      "Is the drinks package just a way to make us spend more?",
      "Not for your group, sir — for forty guests over three hours, it works out cheaper. Let me show you how.",
      "Not for your group, sir — for forty guests over three hours, it work out cheaper.",
      "Every group takes the package, sir, so it must be the right choice for you as well.",
      "'it work out' thiếu -s: 'it' đi với 'works'. Câu 'Every group takes the package' đúng ngữ pháp nhưng ép khách theo đám đông thay vì tính cho chính bàn này. Đáp án trả lời bằng con số của khách và mời khách xem cách tính.",
      2,
    ),
    round(
      "The host wants the package for a ninety-minute lunch. Shall I just sell it?",
      "Run her numbers first. For a short lunch, we recommend against it.",
      "Run her numbers first. For a short lunch, we recommends against it.",
      "Yes, sell it — the package is the best number on our sales report this month.",
      "'we recommends' sai: chủ ngữ 'we' không thêm -s. Câu bán vì doanh số tháng này đúng ngữ pháp nhưng đặt lợi của nhà hàng lên trên lợi của khách. Đáp án tính cho khách trước.",
      0,
      "colleague",
    ),
  ],
});

// ── Lesson 4 — tasting, validity and the follow-up ──────────────────────────
const t4a =
  "Three steps, madam: a tasting session, the deposit to confirm the date, and then the contract in writing.";
const t4b =
  "Please bring her, madam. The tasting session is for the decision-maker, and her seat will be ready.";
const t4c = "It is valid until the thirtieth, madam. After that, next season's prices apply.";

const lesson4 = L(
  38,
  4,
  "Tasting, Validity and the Follow-Up",
  "Nếm thử, hiệu lực báo giá và lần gọi lại",
  {
    vocabulary: [
      c("Tasting session", "The tasting session sells more than any brochure.", [
        "/ˈteɪstɪŋ ˈseʃn/",
        "Buổi nếm thử thực đơn tiệc",
        "🥄",
      ]),
      c("Valid until", "This price is valid until the end of the month.", [
        "/ˈvælɪd ənˈtɪl/",
        "Có hiệu lực tới (ngày…)",
        "📅",
      ]),
      c("Follow up", "Follow up once, on the day you promised.", [
        "/ˈfɒləʊ ʌp/",
        "Liên lạc lại một lần để hỏi kết quả",
        "📞",
      ]),
      c("Decision-maker", "Invite the decision-maker to the tasting session.", [
        "/dɪˈsɪʒn ˌmeɪkə/",
        "Người có quyền quyết định",
        "👑",
      ]),
    ],
    grammar: [
      g(
        "You sign now or lose the date. Many people want it.",
        "The date is held for you until Friday, madam, and you can taste the menu before you sign.",
        "Thời hạn rõ ràng thay cho lời hối thúc. Bị động 'is held' dùng quá khứ phân từ của 'hold': held.",
        "The date is hold for you until Friday, madam, and you can taste the menu before you sign.",
      ),
      g(
        "Deposit first. Then we talk.",
        "After the tasting, sir, the deposit confirms the date, and my manager sends the contract in writing.",
        "Trình tự: nếm thử — cọc — hợp đồng bằng văn bản. 'the deposit' số ít nên 'confirms' có -s.",
        "After the tasting, sir, the deposit confirm the date, and my manager sends the contract in writing.",
      ),
    ],
    speaking: [
      also(
        sp(
          "We love the proposal. What happens next?",
          t4a,
          "Lại là cấu trúc đếm: 'Three steps', rồi đếm đủ ba. Kết thúc bằng 'in writing' — người đặt tiệc cho công ty yên tâm khi nghe chữ đó.",
        ),
        [
          "Three steps, madam: a tasting session, the deposit to confirm the date, then the contract in writing.",
        ],
      ),
      also(
        sp(
          "Can our director come to the tasting? She decides everything.",
          t4b,
          "Người quyết định ngồi ở buổi nếm thử là điều bạn mong nhất: mời ngay, gọi đúng vai trò 'decision-maker'.",
          undefined,
          undefined,
          t4a,
        ),
        [
          "Please bring her, madam. The tasting session is for the decision-maker, and a seat will be ready for her.",
        ],
      ),
      also(
        sp(
          "And the proposal says the price holds until the thirtieth. What happens after that?",
          t4c,
          "Con số do khách đọc: nhắc lại bằng 'valid until'. Câu sau nói hậu quả thật, không dọa, không hối thúc.",
          undefined,
          undefined,
          t4b,
        ),
        ["It is valid until the thirtieth, madam. After that, next season's prices will apply."],
      ),
      also(
        sp(
          "We need two weeks to think. Will you keep calling us?",
          "I will follow up once, sir, at the end of the two weeks. After that, the next call is yours.",
          "Lời hứa không làm phiền cũng là một lời bán hàng: 'follow up' đúng MỘT lần, vào đúng mốc khách nêu.",
        ),
        [
          "I will follow up once, sir, when the two weeks are over. After that, the next call is yours.",
        ],
      ),
      risk(
        also(
          sp(
            "Can you hold this price for us until next year?",
            "My manager decides that, sir. May I ask her on your behalf?",
            "Giữ giá quá hạn là quyết định về tiền của quản lý. Một câu nói rõ, một câu xin phép hỏi thay khách. Không tự hứa.",
            undefined,
            ["manager"],
          ),
          [
            "My manager decides that, sir. Shall I ask her on your behalf?",
            "That is for my manager to decide, sir. May I ask her on your behalf?",
          ],
        ),
      ),
      sp(
        "The family went quiet after the tasting. Shall we call them every day?",
        "Once is enough. I will follow up on the day I promised, and then the decision is theirs.",
        "Trả lời quản lý: không sir/madam. Gọi hai lần là đeo bám; một lần đúng hẹn là chuyên nghiệp.",
        "manager",
      ),
    ],
    reading: read(
      `CLOSING WITHOUT PUSHING
Every proposal leaves the meeting with three dates on it: the tasting session, the date the price is valid until, and the end of the provisional booking. Dates make decisions kind: nobody is pushed, and everybody knows the clock.
The tasting session is where most banquets are sold. Invite the decision-maker, seat them at a real table, and pour the real wine.
After the tasting, the deposit confirms the date, and the manager sends the contract in writing. The floor presents the steps; the manager signs the numbers.
Follow up once, on the day you promised. Twice is a chase, and a chase tells the host the room is empty.
A request to hold the price past its date, or to lower it, is the manager's decision. Offer to ask, and say when you will come back.
When the answer is no, thank the host, ask for nothing, and leave the door open. If anyone asks why the host chose another hotel, it is the manager, later and gently, never the floor at the goodbye.`,
      [
        {
          q: "Ba mốc ngày trên một bản đề xuất là gì?",
          options: [
            "Nếm thử, hạn giá, hạn giữ chỗ",
            "Ngày ký, ngày thanh toán, ngày tổ chức tiệc",
            "Ngày gặp đầu, ngày gọi lại, ngày nhận tiền cọc",
          ],
          correct: 0,
          explanation:
            "'three dates on it: the tasting session, the date the price is valid until, and the end of the provisional booking.'",
        },
        {
          q: "Vì sao chỉ gọi lại khách đúng một lần?",
          options: [
            "Vì gọi nhiều lần tốn tiền điện thoại của nhà hàng",
            "Gọi hai lần là đeo bám",
            "Vì quản lý cấm nhân viên gọi điện cho khách",
          ],
          correct: 1,
          explanation:
            "'Follow up once, on the day you promised. Twice is a chase, and a chase tells the host the room is empty.'",
        },
        {
          q: "Khách chọn khách sạn khác. Người trình bày nên làm gì?",
          options: [
            "Hỏi ngay lý do để rút kinh nghiệm cho lần sau",
            "Giảm giá thêm một lần cuối trước khi khách đi",
            "Cảm ơn, không hỏi gì, để ngỏ cửa",
          ],
          correct: 2,
          explanation:
            "'thank the host, ask for nothing, and leave the door open.' Hỏi lý do là việc của quản lý, sau đó và thật nhẹ nhàng.",
        },
      ],
    ),
    game: [
      round(
        "We are ninety percent sure, but our director wants to taste the menu first.",
        "Then the tasting session is for her, madam, and your date stays held until then. Which day suits her best?",
        "Then the tasting session is for her, madam, and your date stay held until then.",
        "Then perhaps a small deposit today, madam — just between us, so nobody takes your date.",
        "'your date stay' thiếu -s: 'your date' số ít nên 'stays'. Câu xin cọc 'just between us' đúng ngữ pháp nhưng là áp lực và một thoả thuận ngoài quy trình. Đáp án mời người quyết định tới buổi nếm thử và hỏi ngày hợp với bà ấy.",
        1,
      ),
      round(
        "Thank you for the proposal, but we have chosen another hotel.",
        "Thank you for considering us, madam. If anything changes, our door is open.",
        "Thank you for consider us, madam. If anything changes, our door is open.",
        "May I ask which hotel, madam, and what price they gave you? We may be able to beat it.",
        "'Thank you for consider' sai: sau 'for' là V-ing (considering). Câu hỏi khách sạn nào và giá bao nhiêu đúng tiếng Anh nhưng biến lời chào tạm biệt thành cuộc mặc cả — và giá không phải quyền của bạn. Đáp án cảm ơn và để ngỏ cửa.",
        0,
      ),
    ],
  },
);

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: trình bày một đề xuất tiệc theo ba phần (thực đơn, giá, bước tiếp theo), dịch giá plus-plus ra con số cuối cùng, tính ngược từ ngân sách của khách, tư vấn gói đồ uống trung thực — kể cả khuyên không nên chọn — và chốt bằng buổi nếm thử, hạn hiệu lực báo giá và đúng một lần gọi lại, không thúc ép.",
  title: { en: "Presenting a Banquet Proposal", vi: "Trình bày đề xuất tiệc" },
};
