// SW week 38 — Presenting a treatment plan: a short pitch in three parts —
// the guest's need ("Since you…"), the plan in order ("First…, then…, and
// finally…"), and the next step ("In total…", "The next step is…").
// Hand-authored Phase 4, see ../kit.ts.
//
// The spa presents to a guest, not to a buyer (curriculum matrix, the week
// 37-38 table), so the pitch is a plan for one guest's stay. It keeps every
// rule the earlier weeks set: the health form comes before the booking and can
// change the plan (high blood pressure means no herbal bath — week 31's rule);
// champagne is served after the heat, never with it (week 34); a discount on
// a package or a plan is the manager's, said plainly (week 35); and a plan for
// a mother-to-be is the one the manager chose (weeks 31 and 34), with no heat
// treatment in it. A pitch never criticises the spa next door and never
// pushes: "There is no obligation."
import type { AuthoredWeek } from "../kit";
import { cardsFor, lessonsFor, risk } from "../kit";
import { game, g, read, sp } from "../../phase0";

const c = cardsFor("SW");
const L = lessonsFor("SW");

// ── Lesson 1 — A plan in three parts ───────────────────────────────────
const t1a =
  "Since you play every morning, I suggest a treatment plan over four days, not one long massage.";
const t1b =
  "First, a foot soak tonight; then a deep tissue massage on Thursday; and finally, the signature ritual on Saturday.";
const t1c =
  "In total, it is three treatments. The next step is to check your health form, and then I can book them.";

const lesson1 = L(38, 1, "A Plan in Three Parts", "Kế hoạch ba phần", {
  vocabulary: [
    c("Treatment plan", "A treatment plan puts the right treatment on the right day.", [
      "/ˈtriːtmənt plæn/",
      "Kế hoạch liệu trình (nhiều buổi, theo thứ tự)",
      "🗒️",
    ]),
    c("Proposal", "My proposal has three parts: your need, the plan and the next step.", [
      "/prəˈpəʊzl/",
      "Đề xuất",
      "📑",
    ]),
    c("Recovery", "A warm foot soak helps your recovery after a long game of golf.", [
      "/rɪˈkʌvəri/",
      "Sự hồi phục (của cơ thể)",
      "🔋",
    ]),
    c("In total", "In total, the plan is three treatments over four days.", [
      "/ɪn ˈtəʊtl/",
      "Tổng cộng",
      "🧮",
    ]),
    c("Next step", "The next step is a short check of your health form.", [
      "/ˌnekst ˈstep/",
      "Bước tiếp theo",
      "➡️",
    ]),
  ],
  grammar: [
    g(
      "Last day, ritual. Very good.",
      "And finally, on Saturday, you can enjoy the signature ritual.",
      "'finally' mở bước cuối trong một danh sách. 'at last' nghĩa là 'cuối cùng thì cũng…' sau khi chờ lâu — lỗi dịch thẳng chữ 'cuối cùng'.",
      "And at last, on Saturday, you can enjoy the signature ritual.",
    ),
    g(
      "Foot soak tonight. Good for recovery.",
      "I suggest a foot soak tonight, which helps your recovery after golf.",
      "'which' nối thêm lợi ích cho cả vế trước, sau dấu phẩy. Người Việt hay dùng 'it' ('…tonight, it helps…') — thành hai câu dính nhau bằng dấu phẩy.",
      "I suggest a foot soak tonight, it helps your recovery after golf.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "I play golf every morning, and my back is stiff by the evening. What do you suggest?",
        t1a,
        "Phần một của đề xuất: nhắc lại nhu cầu của khách, rồi nói hình dạng kế hoạch — nhiều buổi ngắn, không phải một buổi dài.",
      ),
      alsoAccept: [
        "Since you play every morning, I recommend a treatment plan over four days, not one long massage.",
      ],
    },
    {
      ...sp(
        "What would the plan look like?",
        t1b,
        "Phần hai: kế hoạch theo thứ tự — 'First', 'then', 'and finally' — mỗi bước một liệu trình và một ngày.",
        undefined,
        undefined,
        t1a,
      ),
      alsoAccept: [
        "First, a foot soak tonight, then a deep tissue massage on Thursday, and finally the signature ritual on Saturday.",
      ],
    },
    {
      ...sp(
        "That sounds good. What happens now?",
        t1c,
        "Phần ba: tổng cộng ('In total') và bước tiếp theo ('next step'). Phiếu sức khoẻ luôn đi trước khi đặt lịch.",
        undefined,
        undefined,
        t1b,
      ),
      alsoAccept: [
        "In total, it is three treatments. The next step is your health form, and then I can book them.",
      ],
    },
    {
      ...sp(
        "Why not just one long massage tomorrow?",
        "To be honest, sir, three shorter treatments are better for your muscles and your recovery than one long massage.",
        "Khách hỏi lại: trả lời thật, bằng một câu so sánh hơn, không bán thêm.",
      ),
      alsoAccept: [
        "To be honest, sir, three shorter treatments are better for your recovery than one long massage.",
      ],
    },
    risk({
      ...sp(
        "I should tell you that I have high blood pressure.",
        "Thank you, sir. With high blood pressure, I cannot offer the herbal bath, so I will change the plan.",
        "Phiếu sức khoẻ có thể đổi kế hoạch: huyết áp cao thì không bồn ngâm nóng. Nói rõ, rồi đổi kế hoạch — không 'thử ngắn thôi'.",
        undefined,
        ["high", "blood", "pressure", "offer", "herbal", "bath", "change", "plan"],
      ),
      alsoAccept: [
        "Thank you for telling me, sir. With high blood pressure, I cannot offer the herbal bath, so I will change the plan.",
        "Thank you, sir. I cannot offer the herbal bath with high blood pressure, so I will change the plan.",
        "Thank you for telling me, sir. The herbal bath is not suitable with high blood pressure, so I will change the plan.",
        "Thank you, sir. With high blood pressure, the herbal bath is not safe, so I will change the plan.",
      ],
    }),
    {
      ...sp(
        "Can you send me all of this in writing?",
        "Of course, sir. I will send you the proposal by email tonight, with every day and time.",
        "Đề xuất bằng văn bản: khách có lịch rõ ràng, và không ai phải nhớ.",
      ),
      alsoAccept: [
        "Of course, sir. I will email you the proposal tonight, with every day and time.",
      ],
    },
    sp(
      "Mr Ito wanted a plan for his golf week. What did you suggest?",
      "I suggested a foot soak tonight, a deep tissue massage on Thursday and the ritual on Saturday.",
      "Báo cáo cho quản lý bằng thì quá khứ — không dùng sir hay madam.",
      "manager",
    ),
  ],
  reading: read(
    `Mr Ito is staying at the hotel for four nights on a golf holiday. He plays every morning, and by the evening his back is stiff. At the spa desk, Thu presents a short proposal in three parts. First, she repeats his need: golf every morning and a stiff back. Second, she gives the plan. He will have a foot soak tonight, then a deep tissue massage on Thursday, and finally the signature ritual on Saturday. Third, she gives the next step. In total, it is three treatments, and he must fill in the health form before she books them. Mr Ito asks why she does not suggest one long massage. Thu says honestly that three shorter treatments are better for his recovery. On the form, Mr Ito writes that he has high blood pressure. Thu thanks him and changes the plan, because she cannot offer the herbal bath. On Saturday, he will have a back massage instead. That evening, she emails him the proposal with every day and time.`,
    [
      {
        q: "Phần thứ hai trong đề xuất của Thu là gì?",
        options: [
          "Nhắc lại nhu cầu của khách",
          "Ba liệu trình theo từng ngày",
          "Bước tiếp theo: điền phiếu sức khoẻ",
        ],
        correct: 1,
        explanation:
          "'Second, she gives the plan. He will have a foot soak tonight, then a deep tissue massage…' — nhu cầu là phần một, bước tiếp theo là phần ba.",
      },
      {
        q: "Vì sao Thu đổi liệu trình ngày thứ Bảy?",
        options: [
          "Vì khách ghi trên phiếu là bị huyết áp cao, nên không ngâm bồn được",
          "Vì khách muốn tiết kiệm tiền hơn",
          "Vì kỹ thuật viên ngày thứ Bảy đã kín lịch",
        ],
        correct: 0,
        explanation:
          "'Mr Ito writes that he has high blood pressure. Thu thanks him and changes the plan, because she cannot offer the herbal bath.'",
      },
      {
        q: "Thu trả lời thế nào khi khách hỏi vì sao không làm một buổi dài?",
        options: [
          "Một buổi dài đắt hơn ba buổi ngắn cộng lại",
          "Spa không còn phòng trống cho buổi dài",
          "Ba buổi ngắn tốt hơn cho sự hồi phục",
        ],
        correct: 2,
        explanation:
          "'Thu says honestly that three shorter treatments are better for his recovery' — lý do là lợi ích của khách, không phải doanh thu hay lịch phòng.",
      },
    ],
  ),
  game: [
    game(
      "So what is your plan for my week?",
      "First a foot soak, then a massage, and finally the signature ritual.",
      "Our most expensive package, sir. It have everything, so you do not need to choose.",
      "Our most expensive package, sir. It has everything, so you do not need to choose.",
      undefined,
      "Câu thứ hai sai hoà hợp: chủ ngữ 'It' → 'has', không phải 'have'. Cả câu thứ hai lẫn câu thứ ba đều không có kế hoạch nào, chỉ có giá — và chọn thay khách. Câu đúng trình bày ba bước theo thứ tự với 'First… then… and finally'.",
    ),
    game(
      "Why do you suggest a foot soak tonight?",
      "It is short and warm, sir, which helps your recovery after a long morning of golf.",
      "It is short and warm, it helps your recovery after golf.",
      "Because it is the only free time we have tonight, sir, so please take it.",
      undefined,
      "Câu thứ hai nối hai câu bằng dấu phẩy ('…warm, it helps') — phải là 'which helps'. Câu thứ ba nói lý do của spa, không phải lợi ích cho khách, và ép khách nhận. Câu đúng nói lợi ích thật.",
    ),
  ],
});

// ── Lesson 2 — Presenting a package ────────────────────────────────────
const t2a =
  "Congratulations, madam. Since it is your honeymoon, I recommend our wellness package for couples over three days.";
const t2b =
  "First, a couple's massage; then a rice scrub; and the highlight is the signature ritual on your last evening.";
const t2c =
  "Yes, madam. It is better value for money than three single treatments, and herbal tea is included.";

const lesson2 = L(38, 2, "Presenting a Package", "Giới thiệu một gói liệu trình", {
  vocabulary: [
    c("Wellness package", "Our wellness package has three treatments over three days.", [
      "/ˈwelnəs ˌpækɪdʒ/",
      "Gói chăm sóc sức khoẻ (nhiều liệu trình)",
      "🎁",
    ]),
    c("Highlight", "The highlight of the package is the ritual on the last evening.", [
      "/ˈhaɪlaɪt/",
      "Điểm nổi bật nhất",
      "🌟",
    ]),
    c("Add-on", "A foot soak is a popular add-on to any massage.", [
      "/ˈæd ɒn/",
      "Dịch vụ thêm (mua kèm)",
      "➕",
    ]),
    c("Value for money", "The package is better value for money than three single treatments.", [
      "/ˌvæljuː fə ˈmʌni/",
      "Đáng đồng tiền, giá hợp lý so với giá trị",
      "⚖️",
    ]),
    c("Couple's massage", "In a couple's massage, two therapists work side by side in one suite.", [
      "/ˌkʌplz ˈmæsɑːʒ/",
      "Massage đôi (hai người cùng một phòng)",
      "💑",
    ]),
  ],
  grammar: [
    g(
      "Package good, more cheap.",
      "The package is better value for money than three single treatments.",
      "So sánh hơn của 'good' là 'better' — không thêm 'more' ('more better' là lỗi rất hay gặp).",
      "The package is more better value for money than three single treatments.",
    ),
    g(
      "Every treatments ninety minutes.",
      "Each treatment is ninety minutes, and herbal tea is included after each one.",
      "'each' đi với danh từ SỐ ÍT: 'each treatment', không phải 'each treatments'.",
      "Each treatments is ninety minutes, and herbal tea is included after each one.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "We are here for three nights on our honeymoon. What do you recommend?",
        t2a,
        "Phần một: chúc mừng ngắn, nhắc lại dịp của khách, rồi gọi tên gói ('wellness package').",
      ),
      alsoAccept: [
        "Congratulations, madam. Since it is your honeymoon, I suggest our wellness package for couples over three days.",
      ],
    },
    {
      ...sp(
        "What is in it?",
        t2b,
        "Phần hai: các bước theo thứ tự, và để điểm nổi bật ('highlight') ở cuối cho khách nhớ.",
        undefined,
        undefined,
        t2a,
      ),
      alsoAccept: [
        "First, a couple's massage, then a rice scrub, and the highlight is the signature ritual on your last evening.",
      ],
    },
    {
      ...sp(
        "And is it good value?",
        t2c,
        "Phần ba: một so sánh thật với giá ba liệu trình lẻ, và nói rõ cái gì đã gồm trong giá.",
        undefined,
        undefined,
        t2b,
      ),
      alsoAccept: [
        "Yes, madam. It is better value for money than three single treatments, and the herbal tea is included.",
      ],
    },
    {
      ...sp(
        "Can we have champagne in the suite during the herbal bath?",
        "Champagne comes after the ritual, a rest and some water, sir, because alcohol and heat do not mix.",
        "Rượu không đi cùng nhiệt — luật cũ, giữ nguyên trong gói trăng mật. Không bỏ niềm vui của khách, chỉ đổi thời điểm: sau nghi thức, khi khách đã nghỉ và uống nước.",
      ),
      alsoAccept: [
        "Champagne comes after the ritual, a rest and some water, sir, because alcohol and heat are not safe together.",
      ],
    },
    risk({
      ...sp(
        "It is our honeymoon. Is there a discount on the package?",
        "Congratulations, sir. I cannot offer a discount on the package, but I will ask my manager today.",
        "Dịp đặc biệt không đổi luật: giảm giá là quyết định của quản lý. Nói rõ, rồi hỏi giúp kèm mốc hôm nay.",
        undefined,
        ["offer", "discount", "package", "ask", "manager"],
      ),
      alsoAccept: [
        "Congratulations, sir. I am not able to offer a discount on the package, but I will ask my manager today.",
        "Congratulations, sir. I cannot offer a discount on the package myself, but I will ask my manager today.",
        "Congratulations, sir. I cannot give a discount myself, but I will ask my manager today.",
        "I am sorry, sir. I cannot offer a discount, but I will ask my manager.",
        "Congratulations, sir. A discount on the package is my manager's decision, so I will ask her today.",
      ],
    }),
    sp(
      "What is an add-on?",
      "An add-on is a short extra treatment, madam, like a foot soak before your massage.",
      "Giải thích một từ của thực đơn bằng một ví dụ cụ thể.",
    ),
    sp(
      "Did the honeymoon couple choose a package?",
      "Yes. They chose the wellness package, and the highlight is the ritual on their last evening.",
      "Báo cáo cho quản lý — không dùng sir hay madam: khách chọn gì, và điều khách mong nhất.",
      "manager",
    ),
  ],
  reading: read(
    `Mr and Mrs Bauer are on their honeymoon, and they ask Hoa for something special for their three nights. Hoa presents the wellness package for couples. On the first day, they will have a couple's massage. On the second day, they will have a rice scrub. The highlight comes on the last evening: the signature ritual in the couple's suite. Hoa explains that the package is better value for money than three single treatments, and herbal tea is included after each one. Mrs Bauer asks about a foot soak, and Hoa explains that it is a short add-on. Then Mr Bauer asks for champagne in the herbal bath. Hoa says the spa will serve it after the ritual, a rest and some water, because alcohol and heat do not mix. Finally, he asks for a honeymoon discount. Hoa cannot offer one, so she asks her manager the same day. The manager keeps the price, but she sends a small honeymoon cake to their suite.`,
    [
      {
        q: "Điểm nổi bật nhất của gói là gì?",
        options: [
          "Massage đôi vào ngày đầu tiên",
          "Tẩy tế bào chết bằng gạo vào ngày thứ hai",
          "Nghi thức đặc trưng vào tối cuối",
        ],
        correct: 2,
        explanation:
          "'The highlight comes on the last evening: the signature ritual in the couple's suite.'",
      },
      {
        q: "Vì sao sâm panh được phục vụ sau nghi thức?",
        options: [
          "Vì rượu và nhiệt không đi cùng nhau, kể cả trong tuần trăng mật",
          "Vì quầy bar của khách sạn chỉ mở cửa sau tám giờ",
          "Vì quản lý muốn tặng kèm bánh cùng lúc",
        ],
        correct: 0,
        explanation:
          "'the spa will serve it after the ritual, a rest and some water, because alcohol and heat do not mix' — luật an toàn không đổi vì là tuần trăng mật.",
      },
      {
        q: "Ai quyết định về yêu cầu giảm giá?",
        options: ["Hoa, ngay tại quầy", "Quản lý của Hoa", "Ông bà Bauer"],
        correct: 1,
        explanation:
          "'Hoa cannot offer one, so she asks her manager… The manager keeps the price, but she sends a small honeymoon cake' — giá và quà đều do quản lý quyết.",
      },
    ],
  ),
  game: [
    game(
      "Is the package really worth it?",
      "Yes, madam. It is better value for money than three single treatments.",
      "Of course, madam. Everybody buy it, so it must be the best choice for you as well.",
      "Of course, madam. Everybody buys it, so it must be the best choice for you as well.",
      undefined,
      "Câu thứ hai sai hoà hợp: 'Everybody' đi với động từ số ít 'buys'. Cả câu thứ hai lẫn câu thứ ba đều ép khách bằng 'ai cũng mua' thay cho lý do thật. Câu đúng so sánh với giá ba liệu trình lẻ.",
    ),
    game(
      "Can we have the champagne in the herbal bath?",
      "We will serve it after the ritual, madam, once you have rested and had some water.",
      "We will serving it after the ritual, madam, once you have rested and had some water.",
      "Of course, madam. A glass in the warm bath makes a perfect honeymoon photo.",
      undefined,
      "Câu thứ hai sai dạng: sau 'will' là động từ nguyên mẫu 'serve'. Câu thứ ba chiều khách nhưng cho rượu vào ngay trong nhiệt — không an toàn. Câu đúng giữ niềm vui, chỉ đổi thời điểm: sau nghi thức, khi khách đã nghỉ và uống nước.",
    ),
  ],
});

// ── Lesson 3 — Questions after the plan ────────────────────────────────
const t3a =
  "I understand, madam. If the plan is over your budget, we can offer a shorter version without the herbal bath.";
const t3b =
  "It takes one hour instead of two, and it still includes the back massage and herbal tea.";
const t3c =
  "You do not have to book today, madam. There is no obligation, and I can hold the time until noon tomorrow.";

const lesson3 = L(38, 3, "Questions After the Plan", "Trả lời thắc mắc sau khi trình bày", {
  vocabulary: [
    c("Budget", "If the plan is over your budget, we can make it shorter.", [
      "/ˈbʌdʒɪt/",
      "Ngân sách, số tiền định chi",
      "👛",
    ]),
    c("Compare", "Many guests compare our spa with the one next door.", [
      "/kəmˈpeə/",
      "So sánh",
      "🔍",
    ]),
    c("Shorter version", "There is a shorter version of the ritual, without the herbal bath.", [
      "/ˌʃɔːtə ˈvɜːʃn/",
      "Phiên bản ngắn hơn",
      "✂️",
    ]),
    c("No obligation", "There is no obligation to book today.", [
      "/ˌnəʊ ˌɒblɪˈɡeɪʃn/",
      "Không bắt buộc (khách không phải cam kết)",
      "🆓",
    ]),
  ],
  grammar: [
    g(
      "No must book today.",
      "You do not have to book today, madam. There is no obligation.",
      "'Không bắt buộc' là 'do not have to'. 'must' không đứng sau 'do not' — 'do not must' là lỗi dịch thẳng 'không phải'.",
      "You do not must book today, madam. There is no obligation.",
    ),
    g(
      "Short one cheap.",
      "The shorter version costs less, and it still includes the back massage.",
      "Chủ ngữ số ít 'The shorter version' → 'costs', có -s. Người Việt hay bỏ -s ở động từ sau một cụm danh từ dài.",
      "The shorter version cost less, and it still includes the back massage.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "The plan sounds lovely, but it is over my budget.",
        t3a,
        "Không ép, không giảm giá: đưa một phiên bản ngắn hơn ('shorter version') và nói rõ bỏ phần nào.",
      ),
      alsoAccept: [
        "I understand, madam. If it is over your budget, we can offer a shorter version without the herbal bath.",
      ],
    },
    {
      ...sp(
        "How much shorter is it?",
        t3b,
        "Một con số thật (một tiếng thay vì hai), rồi điều khách vẫn giữ được.",
        undefined,
        undefined,
        t3a,
      ),
      alsoAccept: [
        "It takes one hour instead of two, and it still includes the back massage and the herbal tea.",
      ],
    },
    {
      ...sp(
        "Do I have to decide now?",
        t3c,
        "Không ép khách: 'no obligation', rồi một việc bạn làm được — giữ giờ tới một mốc rõ ràng.",
        undefined,
        undefined,
        t3b,
      ),
      alsoAccept: [
        "You do not have to book today, madam. There is no obligation, and I can hold the time until tomorrow at noon.",
        "There is no obligation, madam. You do not have to book today, and I can hold the time until noon tomorrow.",
      ],
    },
    {
      ...sp(
        "The spa next door is cheaper. Why should I book here?",
        "You are welcome to compare, madam. Our price includes the herbal bath, the tea and a private room.",
        "Không chê spa khác. Mời khách so sánh ('compare'), rồi nói rõ giá của mình gồm những gì.",
      ),
      alsoAccept: [
        "You are welcome to compare, madam. Our price includes the herbal bath, the herbal tea and a private room.",
      ],
    },
    risk({
      ...sp(
        "Give me ten per cent off, and I will book the full plan now.",
        "I am sorry, madam. I cannot offer ten per cent off, but I will ask my manager today.",
        "Khách mặc cả: bạn không nêu con số nào. Giảm giá là của quản lý — nói rõ, hỏi giúp, kèm mốc hôm nay.",
        undefined,
        ["offer", "per", "cent", "off", "ask", "manager"],
      ),
      alsoAccept: [
        "I am sorry, madam. I am not able to offer ten per cent off, but I will ask my manager today.",
        "I am sorry, madam. I cannot offer ten per cent off myself, but I will ask my manager today.",
        "I am sorry, madam. I cannot give you ten per cent off, but I will ask my manager today.",
        "I am sorry, madam. I cannot offer a discount, but I will ask my manager today.",
        "I am sorry, madam. I cannot offer a discount, but I will ask my manager.",
        "I am sorry, madam. A discount is my manager's decision, but I will ask her today.",
      ],
    }),
    sp(
      "Is the shorter version still good for my back?",
      "Yes, madam. It still includes the full back massage, so it suits your budget and your back.",
      "Trả lời đúng điều khách lo (cái lưng), rồi nối với điều thứ hai (ngân sách).",
    ),
    sp(
      "Did Mrs Costa book the plan?",
      "Not yet. The full plan was over her budget, so I am holding the shorter version until noon tomorrow.",
      "Báo cáo cho quản lý — không dùng sir hay madam: kết quả, lý do, và việc bạn đang giữ.",
      "manager",
    ),
  ],
  reading: read(
    `Mrs Costa likes the three-day plan that Minh presents, but it is over her budget. Minh does not push. He offers a shorter version without the herbal bath. It takes one hour instead of two, and it still includes the back massage and herbal tea. Then Mrs Costa says the spa next door is cheaper. Minh does not say anything bad about the other spa. He says she is welcome to compare, and he explains what the price includes. Mrs Costa asks for ten per cent off the full plan. Minh says he cannot offer that, but he will ask his manager today. The manager decides that the price stays the same. Mrs Costa is not sure yet, so she asks if she has to decide now. Minh tells her there is no obligation, and he holds the time until noon tomorrow. The next morning, she books the shorter version.`,
    [
      {
        q: "Minh trả lời thế nào khi khách so sánh với spa bên cạnh?",
        options: [
          "Mời khách so sánh, nói rõ giá gồm gì",
          "Nói spa bên cạnh không sạch sẽ bằng spa mình",
          "Đề nghị giảm giá cho bằng mức của spa bên cạnh",
        ],
        correct: 0,
        explanation:
          "'Minh does not say anything bad about the other spa. He says she is welcome to compare, and he explains what the price includes.'",
      },
      {
        q: "Khi kế hoạch vượt ngân sách của khách, Minh làm gì?",
        options: [
          "Giảm giá ngay để giữ chân khách",
          "Đưa phiên bản ngắn hơn, không có bồn ngâm thảo dược",
          "Khuyên khách quay lại khi có thêm tiền",
        ],
        correct: 1,
        explanation:
          "'He offers a shorter version without the herbal bath' — đổi kế hoạch, không đổi giá.",
      },
      {
        q: "Cuối cùng bà Costa đặt gì?",
        options: [
          "Kế hoạch ba ngày, được giảm mười phần trăm",
          "Kế hoạch ba ngày đầy đủ, giá không đổi",
          "Phiên bản ngắn hơn, chốt vào sáng hôm sau",
        ],
        correct: 2,
        explanation:
          "'The next morning, she books the shorter version.' Quản lý giữ nguyên giá, nên không có mười phần trăm nào.",
      },
    ],
  ),
  game: [
    game(
      "Do I have to book the plan today?",
      "You do not have to book today, madam. There is no obligation.",
      "You do not must book today, madam. There is no obligation.",
      "Yes, madam. This price is only for today, so it is much better to book now.",
      undefined,
      "Câu thứ hai sai: 'do not must' — 'không bắt buộc' là 'do not have to'. Câu thứ ba ép khách bằng một hạn chót bịa ra. Câu đúng để khách tự quyết.",
    ),
    game(
      "A hotel down the road sells the same facial for much less.",
      "Please feel free to compare, sir. Our facial also includes a hand massage and a private room.",
      "That hotel is not very clean, sir, so I would never going there myself.",
      "That hotel is not very clean, sir, so I would never go there myself.",
      undefined,
      "Câu thứ hai sai dạng: sau 'would never' là động từ nguyên mẫu 'go', không phải 'going'. Cả câu thứ hai lẫn câu thứ ba đều chê một doanh nghiệp khác trước mặt khách — thiếu chuyên nghiệp, và khách không tin thêm vào spa của bạn. Câu đúng mời so sánh và nói liệu trình của mình gồm gì.",
    ),
  ],
});

// ── Lesson 4 — A plan the manager has checked ──────────────────────────
const t4a =
  "Yes, madam. My manager has checked your form, and she suggests a prenatal massage on Tuesday and Friday.";
const t4b =
  "You will lie in the side-lying position, madam, with soft pillows, and the pressure will be light.";
const t4c =
  "I am sorry, madam. There are no heat treatments in your plan, so no sauna and no herbal bath.";

const lesson4 = L(38, 4, "A Plan the Manager Has Checked", "Kế hoạch đã được quản lý duyệt", {
  vocabulary: [
    c("Prenatal massage", "A prenatal massage is a gentle massage for a mother-to-be.", [
      "/ˌpriːˈneɪtl ˈmæsɑːʒ/",
      "Massage cho phụ nữ mang thai",
      "🌸",
    ]),
    c("Side-lying", "In the side-lying position, the guest rests on her side with soft pillows.", [
      "/ˈsaɪd ˌlaɪɪŋ/",
      "Tư thế nằm nghiêng",
      "🛌",
    ]),
    c("Heat treatment", "A sauna, a herbal bath and hot stones are all heat treatments.", [
      "/ˈhiːt ˌtriːtmənt/",
      "Liệu trình dùng nhiệt (xông hơi, ngâm nóng, đá nóng)",
      "♨️",
    ]),
    c("Summary", "Here is a short summary of your plan.", ["/ˈsʌməri/", "Bản tóm tắt", "📝"]),
  ],
  grammar: [
    g(
      "Manager check already. OK.",
      "My manager has checked your form, madam, and she suggests a gentle plan.",
      "Việc vừa làm xong, kết quả còn ở hiện tại: 'has checked' — sau 'has' là phân từ hai (-ed), không phải động từ nguyên mẫu.",
      "My manager has check your form, madam, and she suggests a gentle plan.",
    ),
    g(
      "No sauna for you this week.",
      "During your stay, you should not use the sauna or the steam room, madam.",
      "Sau 'should not' là động từ nguyên mẫu KHÔNG 'to': 'should not use'. Người Việt hay thêm 'to' ('should not to use').",
      "During your stay, you should not to use the sauna or the steam room, madam.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "Did your manager look at my form? I am five months pregnant.",
        t4a,
        "Khách mang thai: kế hoạch là của quản lý, bạn chỉ trình bày. Nói ai đã xem phiếu, rồi liệu trình và ngày.",
      ),
      alsoAccept: [
        "Yes, madam. My manager has checked your form, and she recommends a prenatal massage on Tuesday and Friday.",
      ],
    },
    {
      ...sp(
        "How will I lie on the bed with my bump?",
        t4b,
        "Một tư thế ('side-lying'), một chi tiết cho khách yên tâm (gối mềm), và lực ấn nhẹ.",
        undefined,
        undefined,
        t4a,
      ),
      alsoAccept: [
        "You will lie in the side-lying position, madam, with soft pillows, and we will use light pressure.",
      ],
    },
    risk({
      ...sp(
        "Can I also use the sauna and the herbal bath?",
        t4c,
        "Kế hoạch quản lý duyệt không có liệu trình dùng nhiệt. Nói rõ, không thương lượng, không tự thêm.",
        undefined,
        ["heat", "treatments", "plan", "sauna", "herbal", "bath"],
        t4b,
      ),
      alsoAccept: [
        "I am sorry, madam. Your plan has no heat treatments, so no sauna and no herbal bath.",
        "I am afraid there are no heat treatments in your plan, madam, so no sauna and no herbal bath.",
        "I am sorry, madam. Your plan has no heat treatments, so you cannot use the sauna or the herbal bath.",
        "I am sorry, madam. My manager's plan has no heat treatments, so no sauna and no herbal bath.",
      ],
    }),
    {
      ...sp(
        "Could you write it all down for me?",
        "Of course, madam. Here is a short summary of your plan, with both days and times.",
        "Một bản tóm tắt ('summary') bằng văn bản — khách mang về, không phải nhớ.",
      ),
      alsoAccept: [
        "Of course, madam. Here is a short summary of your plan, with both days and both times.",
      ],
    },
    sp(
      "What if I feel uncomfortable during the massage?",
      "Please tell your therapist at any moment, madam, and she will stop or change your position.",
      "Trao quyền cho khách: nói bất cứ lúc nào, và kỹ thuật viên dừng hoặc đổi tư thế ngay.",
    ),
    sp(
      "Ms Rossi is booked with me on Tuesday. Is there anything I should know?",
      "Yes. She is a mother-to-be, so please give her a prenatal massage, side-lying, with no heat treatment.",
      "Nói với đồng nghiệp — không dùng sir hay madam. Truyền đúng kế hoạch quản lý đã duyệt, không thêm bớt.",
      "colleague",
    ),
  ],
  reading: read(
    `Ms Rossi is five months pregnant, and she is staying at the hotel for a week. On Monday, she fills in the health form and asks for a massage. Lan, the receptionist, checks with her manager first. The manager reads the form and chooses a plan for her. On Tuesday morning, Lan presents it. There will be a prenatal massage on Tuesday and on Friday, in the side-lying position, with soft pillows and light pressure. There are no heat treatments in the plan, so there is no sauna, no steam room and no herbal bath. Ms Rossi asks if she can add hot stones, because a friend says they are fine. Lan does not argue. She explains that the manager chose a plan without heat. Then she gives Ms Rossi a short written summary of both days. She also tells her that she can ask the therapist to stop at any moment. Ms Rossi says the plan makes her feel safe and relaxed.`,
    [
      {
        q: "Ai chọn kế hoạch liệu trình cho bà Rossi?",
        options: [
          "Lan, theo thực đơn của spa",
          "Quản lý, sau khi đọc phiếu sức khoẻ",
          "Chính bà Rossi, theo lời khuyên của một người bạn",
        ],
        correct: 1,
        explanation:
          "'Lan… checks with her manager first. The manager reads the form and chooses a plan for her' — Lan chỉ trình bày kế hoạch.",
      },
      {
        q: "Vì sao kế hoạch không có phòng xông hơi?",
        options: [
          "Vì phòng xông hơi đang được bảo trì cả tuần",
          "Vì bà Rossi nói bà không thích chỗ nóng",
          "Vì quản lý chọn một kế hoạch không có liệu trình dùng nhiệt",
        ],
        correct: 2,
        explanation:
          "'There are no heat treatments in the plan, so there is no sauna, no steam room and no herbal bath.'",
      },
      {
        q: "Lan đưa cho bà Rossi thứ gì?",
        options: [
          "Bản tóm tắt kế hoạch",
          "Một phiếu giảm giá dùng cho lần tới",
          "Một chai dầu massage để dùng ở nhà",
        ],
        correct: 0,
        explanation: "'Then she gives Ms Rossi a short written summary of both days.'",
      },
    ],
  ),
  game: [
    game(
      "Has anyone looked at my health form yet?",
      "Yes, madam. My manager has checked it, and she suggests a prenatal massage.",
      "Not yet, madam, but I am sure everything are fine, so let us start your massage now.",
      "Not yet, madam, but I am sure everything is fine, so let us start your massage now.",
      undefined,
      "Câu thứ hai sai hoà hợp: 'everything' đi với động từ số ít 'is'. Cả câu thứ hai lẫn câu thứ ba đều bắt đầu liệu trình cho khách mang thai khi quản lý chưa xem phiếu — trái luật. Câu đúng nói ai đã xem phiếu và kế hoạch là gì.",
    ),
    game(
      "My friend says hot stones are fine when you are pregnant.",
      "Thank you, madam. My manager chose a plan with no heat treatments, so we will not use hot stones.",
      "Thank you, madam. Your plan has no heat treatments, so we will not using hot stones.",
      "Then your friend is probably right, madam. Let us add a few, just to try.",
      undefined,
      "Câu thứ hai sai dạng: sau 'will not' là động từ nguyên mẫu 'use'. Câu thứ ba bỏ kế hoạch quản lý đã duyệt vì lời một người bạn. Câu đúng nhắc rằng quản lý đã chọn kế hoạch, giữ kế hoạch, lịch sự, không tranh luận.",
    ),
  ],
});

export const week: AuthoredWeek = {
  title: { en: "Presenting a Treatment Plan", vi: "Trình bày kế hoạch liệu trình cho khách" },
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: trình bày một kế hoạch liệu trình theo ba phần — nhu cầu của khách ('Since you…'), kế hoạch theo thứ tự ('First…, then…, and finally…'), bước tiếp theo ('In total…', 'The next step is…'); giới thiệu một gói, điểm nổi bật và vì sao đáng đồng tiền; trả lời khi kế hoạch vượt ngân sách bằng phiên bản ngắn hơn, không chê spa khác, không ép khách ('There is no obligation'); trình bày kế hoạch quản lý đã duyệt cho khách mang thai, không có liệu trình dùng nhiệt — và giảm giá vẫn là việc của quản lý.",
};
