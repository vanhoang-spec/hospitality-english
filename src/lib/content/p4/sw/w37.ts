// SW week 37 — Terms and conditions at the spa: conditions, rates and time
// limits ("valid for…", "ten per cent off", "as long as…", "If you cancel less
// than four hours before…"). Hand-authored Phase 4, see ../kit.ts.
//
// The spa does not sell contracts, so its "terms" week is the terms a guest
// actually meets (curriculum matrix, the week 37-38 table): a membership and a
// package, the cancellation and no-show fees, a therapist request, and the
// conditions of a treatment itself. Every term here is the PUBLISHED one the
// earlier weeks already used — the package lasts three months, a reschedule is
// free up to four hours before, a fee is waived only by the manager — and the
// desk explains it plainly and routes every exception to the manager. The
// therapist-request lesson keeps the old week's standard (a routine question,
// never "why", the truth early, three choices, never "try a man this once"),
// minus the free thirty minutes the desk used to give away on its own. The
// consent lesson ends in the turn the old week left in a game: a sensitive
// area is declined, and a guest who insists ends the treatment.
import type { AuthoredWeek } from "../kit";
import { cardsFor, lessonsFor, risk } from "../kit";
import { game, g, read, sp } from "../../phase0";

const c = cardsFor("SW");
const L = lessonsFor("SW");

// ── Lesson 1 — Membership and package terms ────────────────────────────
const t1a =
  "It includes the pool, the gym and the sauna every day, and members receive ten per cent off treatments.";
const t1b = "It is valid for one year, madam, and you can renew it in the last month.";
const t1c =
  "You can freeze your membership for one month a year, as long as you tell us in writing.";

const lesson1 = L(
  37,
  1,
  "Membership and Package Terms",
  "Điều khoản thẻ hội viên và gói liệu trình",
  {
    vocabulary: [
      c("Membership", "A spa membership includes the pool, the gym and the sauna.", [
        "/ˈmembəʃɪp/",
        "Thẻ hội viên, tư cách hội viên",
        "💳",
      ]),
      c("Per cent", "Members receive ten per cent off every treatment.", [
        "/pə ˈsent/",
        "Phần trăm",
        "💯",
      ]),
      c("Renew", "You can renew your membership in the last month.", [
        "/rɪˈnjuː/",
        "Gia hạn",
        "🔁",
      ]),
      c("Freeze", "Members can freeze the membership for one month a year.", [
        "/friːz/",
        "Tạm ngưng (thẻ hội viên) trong một thời gian",
        "🧊",
      ]),
      c("Non-transferable", "The package is non-transferable, so only the buyer can use it.", [
        "/ˌnɒn trænsˈfɜːrəbl/",
        "Không chuyển nhượng được (không cho người khác dùng)",
        "🚫",
      ]),
    ],
    grammar: [
      g(
        "Package three months.",
        "The package is valid for three months from the day you buy it.",
        "'valid for + khoảng thời gian'. Người Việt hay nói 'valid in three months' (dịch 'có giá trị trong ba tháng') — nghe như ba tháng nữa mới dùng được.",
        "The package is valid in three months from the day you buy it.",
      ),
      g(
        "Member discount ten.",
        "Members receive ten per cent off every treatment on the menu.",
        "'ten per cent off' = giảm mười phần trăm. Chủ ngữ 'Members' số nhiều → 'receive', không thêm -s. Đây là quyền lợi in sẵn trong điều khoản thẻ, không phải giảm giá bạn tự đưa ra.",
        "Members receives ten per cent off every treatment on the menu.",
      ),
    ],
    speaking: [
      sp(
        "What does the spa membership include?",
        t1a,
        "Kể quyền lợi đúng như điều khoản in sẵn: ba khu dùng hằng ngày, và một tỷ lệ giảm cho liệu trình — mười phần trăm ('per cent').",
      ),
      {
        ...sp(
          "And how long is the membership valid for?",
          t1b,
          "Một thời hạn (một năm) và một điều kiện gia hạn ('renew' trong tháng cuối cùng).",
          undefined,
          undefined,
          t1a,
        ),
        alsoAccept: [
          "It is valid for one year, madam, and you can renew it during the last month.",
        ],
      },
      {
        ...sp(
          "I travel a lot for work. What if I am away for a month?",
          t1c,
          "Một điều kiện nối bằng cụm 'miễn là' (as long as): được tạm ngưng thẻ một tháng mỗi năm, miễn là khách báo bằng văn bản.",
          undefined,
          undefined,
          t1b,
        ),
        alsoAccept: [
          "You can freeze your membership for one month a year, as long as you ask us in writing.",
        ],
      },
      risk({
        ...sp(
          "Can my husband use the last two sessions of my package?",
          "I am sorry, madam. The package is non-transferable, but I can ask my manager.",
          "Gói không chuyển nhượng được: nói rõ điều khoản. Ngoại lệ là việc của quản lý — bạn hỏi giúp, không tự hứa.",
          undefined,
          ["package", "non", "transferable", "ask", "manager"],
        ),
        alsoAccept: [
          "I am sorry, madam. The package is non-transferable, but I will ask my manager.",
          "I am afraid the package is non-transferable, madam, but I can ask my manager.",
        ],
      }),
      {
        ...sp(
          "I am joining next month. Can I pay member prices today?",
          "I am afraid the member price starts on the day your membership starts, sir.",
          "Giá hội viên bắt đầu cùng ngày thẻ có hiệu lực — nói đúng điều khoản, giọng phục vụ, không mặc cả.",
        ),
        alsoAccept: ["I am afraid the member price begins on the day your membership starts, sir."],
      },
      sp(
        "A member wants to freeze her membership for the whole summer. Is that all right?",
        "Our terms allow one month a year, so please ask the spa manager about a longer freeze.",
        "Nói với đồng nghiệp — không dùng sir hay madam. Điều khoản cho một tháng; hơn thế là ngoại lệ, quản lý spa quyết.",
        "colleague",
      ),
    ],
    reading: read(
      `Ms Hall is working in the city for six months, and she asks about the spa membership. Vy, the spa receptionist, explains the terms one by one. The membership includes the pool, the gym and the sauna every day. Members also receive ten per cent off every treatment. The membership is valid for one year, and members can renew it in the last month. Ms Hall travels a lot, so she asks what happens when she is away. Vy explains that she can freeze the membership for one month a year, as long as she asks in writing. Then Ms Hall asks if her husband can use the last two sessions of her old massage package. Vy says the package is non-transferable, but she can ask her manager. She also explains that the member price starts on the day the membership starts. Ms Hall joins that afternoon. The next week, she asks to freeze her membership for the whole summer. Vy does not say yes or no. She asks the spa manager, because the terms allow only one month a year.`,
      [
        {
          q: "Thẻ hội viên có giá trị bao lâu?",
          options: [
            "Ba tháng kể từ ngày mua",
            "Một năm, gia hạn trong tháng cuối",
            "Sáu tháng, đúng bằng thời gian khách làm việc ở đây",
          ],
          correct: 1,
          explanation:
            "'The membership is valid for one year, and members can renew it in the last month.' Ba tháng là thời hạn của gói liệu trình, không phải của thẻ.",
        },
        {
          q: "Khi khách muốn tạm ngưng thẻ suốt mùa hè, Vy làm gì?",
          options: [
            "Hỏi quản lý spa trước, vì điều khoản chỉ cho tạm ngưng một tháng mỗi năm",
            "Đồng ý ngay vì khách vừa đăng ký hội viên tuần trước",
            "Từ chối và đề nghị khách huỷ thẻ rồi đăng ký lại sau",
          ],
          correct: 0,
          explanation:
            "'She asks the spa manager, because the terms allow only one month a year' — vượt điều khoản là ngoại lệ, quản lý quyết.",
        },
        {
          q: "Chồng khách có dùng được hai buổi còn lại trong gói của bà không?",
          options: [
            "Được, vì hai người là vợ chồng",
            "Được, nếu trả thêm một khoản phí chuyển nhượng nhỏ",
            "Theo điều khoản thì không; Vy sẽ hỏi quản lý",
          ],
          correct: 2,
          explanation:
            "'Vy says the package is non-transferable, but she can ask her manager' — nói đúng điều khoản, và ngoại lệ thì hỏi quản lý.",
        },
      ],
    ),
    game: [
      game(
        "How long can I use this package?",
        "It is valid for three months from the day you buy it, madam.",
        "It is valid in three months from the day you buy it, madam.",
        "As long as you like, madam. We never really check the dates on our packages.",
        undefined,
        "Câu thứ hai sai giới từ: thời hạn hiệu lực là 'valid for three months'. Câu thứ ba nói sai điều khoản — gói chỉ dùng được ba tháng, và một lời hứa 'thoải mái' hôm nay thành khiếu nại vào tháng thứ tư. Câu đúng nói rõ thời hạn.",
      ),
      game(
        "Can I bring my friend to the pool on my membership card?",
        "I am afraid the membership is for you only, madam, but I can ask my manager.",
        "Of course, madam. Just give her your card, and nobody at the desk will checks her name.",
        "Of course, madam. Just give her your card, and nobody at the desk will check her name.",
        undefined,
        "Câu thứ hai sai dạng: sau 'will' là động từ nguyên mẫu 'check', không thêm -s. Cả câu thứ hai lẫn câu thứ ba đều chiều khách bằng cách bỏ qua điều khoản và hứa thay cả quầy lễ tân. Câu đúng nói rõ thẻ chỉ dành cho chủ thẻ và hỏi quản lý cho ngoại lệ.",
      ),
    ],
  },
);

// ── Lesson 2 — Cancellation and no-show terms ──────────────────────────
const t2a = "You can cancel at no charge up to four hours before your treatment, sir.";
const t2b =
  "A late cancellation has a fifty per cent fee, and a no-show is charged at the full price.";
const t2c = "I cannot waive the cancellation fee, sir, but I can ask my manager for you.";

const lesson2 = L(37, 2, "Cancellation and No-Show Terms", "Điều khoản huỷ lịch và không đến", {
  vocabulary: [
    c("Late cancellation", "A late cancellation is less than four hours before the treatment.", [
      "/ˌleɪt ˌkænsəˈleɪʃn/",
      "Huỷ muộn (sát giờ hẹn)",
      "⏰",
    ]),
    c("Cancellation fee", "Only the manager can waive a cancellation fee.", [
      "/ˌkænsəˈleɪʃn fiː/",
      "Phí huỷ lịch",
      "🧾",
    ]),
    c("Full price", "A no-show is charged at the full price of the treatment.", [
      "/ˌfʊl ˈpraɪs/",
      "Nguyên giá, toàn bộ giá",
      "💵",
    ]),
    c("Rebook", "If you call before the window closes, I can rebook you at no charge.", [
      "/ˌriːˈbʊk/",
      "Đặt lại lịch",
      "📅",
    ]),
  ],
  grammar: [
    g(
      "If you cancel late, you pay half.",
      "If you cancel less than four hours before, there is a fifty per cent fee.",
      "Câu điều kiện loại 1: vế 'if' dùng hiện tại đơn ('If you cancel'), không dùng 'will cancel' — 'will' chỉ nằm ở vế kết quả.",
      "If you will cancel less than four hours before, there is a fifty per cent fee.",
    ),
    g(
      "No come, pay all.",
      "A no-show is charged at the full price, madam.",
      "Bị động 'is charged at + mức giá' — cần 'is'. Người Việt hay bỏ 'is' ('A no-show charged at…') vì tiếng Việt không có động từ 'to be' ở đây.",
      "A no-show charged at the full price, madam.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "Before I book, what happens if I need to cancel?",
        t2a,
        "Nói điều khoản công bố bằng một mốc: miễn phí nếu huỷ trước giờ hẹn từ bốn tiếng trở lên.",
      ),
      alsoAccept: ["You can cancel at no charge up to four hours before the treatment, sir."],
    },
    {
      ...sp(
        "And if I cancel later than that?",
        t2b,
        "Hai mức phí, mỗi mức một điều kiện: huỷ muộn năm mươi phần trăm, không đến thì nguyên giá.",
        undefined,
        undefined,
        t2a,
      ),
      alsoAccept: [
        "A late cancellation is charged at fifty per cent, and a no-show is charged at the full price.",
      ],
    },
    risk({
      ...sp(
        "That seems strict. Would you waive the fee if I were ill?",
        t2c,
        "Miễn phí huỷ là việc của quản lý. Nói rõ bạn không miễn được, rồi đề nghị hỏi giúp — không hứa trước kết quả.",
        undefined,
        ["waive", "cancellation", "fee", "ask", "manager"],
        t2b,
      ),
      alsoAccept: [
        "I am not able to waive the cancellation fee, sir, but I can ask my manager for you.",
        "I cannot waive the cancellation fee myself, sir, but I can ask my manager for you.",
      ],
    }),
    sp(
      "I am twenty minutes late. Can I still have the full ninety minutes?",
      "I am sorry, sir. Your massage still ends at four, because the next guest is booked then.",
      "Khách đến muộn: liệu trình vẫn kết thúc đúng giờ. Nói lý do thật — khách sau đã đặt giờ đó.",
    ),
    {
      ...sp(
        "I need to move my massage from Thursday to Friday. It is only Monday today.",
        "Of course, madam. That is more than four hours before, so I can rebook you at no charge.",
        "Trong điều khoản thì đặt lại miễn phí — đó là quyền của khách, không phải ưu đãi bạn tặng.",
      ),
      alsoAccept: [
        "Of course, madam. It is more than four hours before, so I can rebook you at no charge.",
      ],
    },
    sp(
      "Mr Hale just called to cancel his three o'clock massage. It is one o'clock now.",
      "That is a late cancellation, so the fee applies. Please note the time of his call.",
      "Nói với đồng nghiệp — không dùng sir hay madam. Gọi đúng tên trường hợp, và ghi giờ khách gọi làm bằng chứng.",
      "colleague",
    ),
    sp(
      "You charged me the full price, but I simply forgot the booking!",
      "I am sorry, madam. Let me check the booking and our reminder, and I will ask my manager about the charge.",
      "Bỏ phí là việc của quản lý: kiểm tra lịch đặt và tin nhắc lịch trước, rồi hỏi quản lý — không tự xoá phí.",
    ),
  ],
  reading: read(
    `Mr Hale books a ninety-minute massage for Thursday at three. Before he books, he asks Lan about the cancellation terms. Lan explains them clearly. He can cancel at no charge up to four hours before. A late cancellation has a fifty per cent fee, and a no-show is charged at the full price. Mr Hale says that is fair. On Thursday at one o'clock, he calls the spa, because his business meeting has moved. Lan's colleague takes the call. She notes the time carefully, because it is a late cancellation. Then Mr Hale asks if the spa can waive the fee. Lan explains that she cannot waive a cancellation fee, but she can ask her manager. The manager checks the booking and keeps the fee. However, she offers to rebook him for Friday morning with a free foot soak. Mr Hale accepts, and he thanks Lan for explaining the terms on the first day.`,
    [
      {
        q: "Huỷ muộn (dưới bốn tiếng trước giờ hẹn) thì chịu phí thế nào?",
        options: [
          "Không mất phí nếu khách gọi điện báo trước",
          "Phí năm mươi phần trăm",
          "Trả toàn bộ giá của liệu trình đã đặt",
        ],
        correct: 1,
        explanation:
          "'A late cancellation has a fifty per cent fee, and a no-show is charged at the full price' — nguyên giá là mức của khách không đến.",
      },
      {
        q: "Vì sao đồng nghiệp của Lan ghi lại giờ khách gọi?",
        options: [
          "Vì khách gọi lúc một giờ cho lịch ba giờ, tức là huỷ muộn",
          "Vì khách muốn đổi sang một kỹ thuật viên khác",
          "Vì quản lý dặn phải gọi lại cho mọi khách",
        ],
        correct: 0,
        explanation:
          "'She notes the time carefully, because it is a late cancellation' — giờ gọi quyết định khách thuộc điều khoản nào.",
      },
      {
        q: "Ai quyết định giữ phí và tặng khách buổi ngâm chân?",
        options: [
          "Lan, theo đúng điều khoản đã giải thích",
          "Đồng nghiệp đã nghe máy hôm thứ Năm",
          "Quản lý của Lan, sau khi xem lại lịch",
        ],
        correct: 2,
        explanation:
          "'The manager checks the booking and keeps the fee. However, she offers to rebook him… with a free foot soak' — phí và quà đều là quyết định của quản lý.",
      },
    ],
  ),
  game: [
    game(
      "What happens if I cancel two hours before my massage?",
      "That is a late cancellation, sir, so there is a fifty per cent fee for the massage.",
      "Nothing at all, sir. We only charge the guests who forgets to call us.",
      "Nothing at all, sir. We only charge the guests who forget to call us.",
      undefined,
      "Câu thứ hai sai hoà hợp: 'the guests' số nhiều → 'forget', không thêm -s. Cả câu thứ hai lẫn câu thứ ba đều nói sai điều khoản — huỷ dưới bốn tiếng vẫn có phí, dù khách có gọi. Câu đúng gọi đúng tên trường hợp và nói mức phí.",
    ),
    game(
      "I missed my massage. Please just take the charge off.",
      "I am sorry, madam. I will ask my manager about the charge today.",
      "Of course, madam. I will takes it off the bill now, and nobody will notice.",
      "Of course, madam. I will take it off the bill now, and nobody will notice.",
      undefined,
      "Câu thứ hai sai dạng: sau 'will' là động từ nguyên mẫu 'take', không thêm -s. Cả câu thứ hai lẫn câu thứ ba đều tự xoá một khoản phí — việc đó là của quản lý, và 'không ai để ý' là lời của người biết mình đang làm sai. Câu đúng chuyển cho quản lý kèm mốc hôm nay.",
    ),
  ],
});

// ── Lesson 3 — Therapist requests and gratuity ─────────────────────────
const t3a =
  "You are right, madam, and I am sorry. Our female therapists are fully booked at two, but one is free at five.";
const t3b = "Then I can rebook you for tomorrow morning, or put you on the waiting list for today.";
const t3c =
  "Of course, madam. You are on the waiting list, and I will call your room if a female therapist becomes free.";

const lesson3 = L(37, 3, "Therapist Requests and Gratuity", "Yêu cầu kỹ thuật viên và tiền boa", {
  vocabulary: [
    c("Female therapist", "Would you prefer a female therapist, madam?", [
      "/ˌfiːmeɪl ˈθerəpɪst/",
      "Kỹ thuật viên nữ",
      "👩",
    ]),
    c("Routine question", "It is a routine question we ask every guest.", [
      "/ruːˌtiːn ˈkwestʃən/",
      "Câu hỏi thủ tục (hỏi mọi khách)",
      "📋",
    ]),
    c("Waiting list", "I can put you on the waiting list for this afternoon.", [
      "/ˈweɪtɪŋ lɪst/",
      "Danh sách chờ",
      "📃",
    ]),
    c("Gratuity", "A gratuity is never expected, because service is included.", [
      "/ɡrəˈtjuːəti/",
      "Tiền boa, tiền cảm ơn",
      "🙏",
    ]),
    c("Tip box", "Every tip goes into the tip box and is shared by the whole team.", [
      "/ˈtɪp bɒks/",
      "Hộp tiền boa chung của cả đội",
      "📦",
    ]),
  ],
  grammar: [
    g(
      "Man or woman? You choose.",
      "It is a routine question we ask every guest, madam.",
      "Mệnh đề quan hệ: 'a routine question (that) we ask every guest'. Không lặp 'it' sau 'ask' — 'question' đã là tân ngữ của 'ask' rồi.",
      "It is a routine question we ask it every guest, madam.",
    ),
    g(
      "Tip? Ten percent, usually.",
      "There is no usual amount, sir. Service is already included in the price.",
      "Không nêu con số tiền boa — nêu con số là biến lời cảm ơn thành hoá đơn. 'included in the price': giới từ là 'in'.",
      "There is no usual amount, sir. Service is already included on the price.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "I booked a female therapist, but the desk says I have a man today.",
        t3a,
        "Công nhận khách đúng TRƯỚC, xin lỗi, rồi nói sự thật và một giờ cụ thể. Không bao giờ đề nghị khách 'thử' kỹ thuật viên nam.",
      ),
      alsoAccept: [
        "You are right, madam, and I am very sorry. Our female therapists are fully booked at two, but one is free at five.",
      ],
    },
    {
      ...sp(
        "Five is too late for me.",
        t3b,
        "Thêm hai lựa chọn, để khách quyết: đặt lại sáng mai, hoặc vào danh sách chờ hôm nay.",
        undefined,
        undefined,
        t3a,
      ),
      alsoAccept: [
        "Then I can rebook you for tomorrow morning, or I can put you on the waiting list for today.",
      ],
    },
    sp(
      "The waiting list, please. I will think about tomorrow.",
      t3c,
      "Xác nhận khách đã vào danh sách chờ, và hứa việc của bạn: gọi lên phòng khi có kỹ thuật viên nữ trống.",
      undefined,
      undefined,
      t3b,
    ),
    {
      ...sp(
        "Why do you ask if I prefer a man or a woman?",
        "It is a routine question we ask every guest, sir, and I will note your answer on file.",
        "Không giải thích dài, không hỏi lại lý do của khách. Câu hỏi thủ tục, hỏi mọi khách — và ghi hồ sơ để khách không phải nói lại.",
      ),
      alsoAccept: [
        "It is a routine question we ask every guest, sir, and I will put your answer on file.",
      ],
    },
    sp(
      "How much do people usually tip here?",
      "There is no usual amount, madam. A gratuity is never expected, because service is included in the price.",
      "Không bao giờ nêu con số. Nói rõ tiền boa không bắt buộc, và vì sao.",
    ),
    {
      ...sp(
        "This is just for you. Please do not tell the others.",
        "That is very kind of you, sir. Every gratuity goes into the tip box and is shared by the whole team.",
        "Nhận lời cảm ơn, nhưng không giữ riêng: mọi khoản tiền boa vào hộp chung ('tip box') và chia cho cả đội.",
      ),
      alsoAccept: [
        "That is very kind of you, sir. Every gratuity goes into the tip box, and the whole team shares it.",
      ],
    },
    sp(
      "Mrs Lee is asking why her female therapist changed. What should I tell her?",
      "Please tell her the truth now, and offer her five today, tomorrow morning or the waiting list.",
      "Nói với đồng nghiệp — không dùng sir hay madam. Báo sớm, nói thật, đưa ba lựa chọn.",
      "colleague",
    ),
  ],
  reading: read(
    `Mrs Lee booked a female therapist for Saturday at two. On Saturday morning, her therapist calls in sick, and every other female therapist is fully booked at two. Duc, the receptionist, does not wait until Mrs Lee arrives in her robe. He calls her room at ten. He tells her she is right to expect a female therapist, and he is sorry. He never asks her to try a male therapist instead. He offers her three choices: a female therapist at five, a booking tomorrow morning, or the waiting list for today. Mrs Lee chooses the waiting list. At half past two, another guest cancels, so Duc calls Mrs Lee straight away. After her massage, Mrs Lee wants to give her therapist some money. She asks Duc how much people usually give. Duc says there is no usual amount, and a gratuity is never expected. Mrs Lee gives the therapist an envelope anyway. The therapist thanks her warmly and puts it in the tip box, because every tip is shared by the whole team.`,
    [
      {
        q: "Vì sao Đức gọi cho bà Lee từ mười giờ sáng?",
        options: [
          "Để nhắc bà nhớ mang theo áo choàng xuống spa",
          "Để báo tin sớm, trước khi bà mặc áo choàng xuống tới spa",
          "Để mời bà nâng hạng liệu trình buổi chiều",
        ],
        correct: 1,
        explanation:
          "'Duc… does not wait until Mrs Lee arrives in her robe. He calls her room at ten' — khách nghe tin xấu ở cửa phòng trị liệu là đã cởi đồ và chuẩn bị xong.",
      },
      {
        q: "Đức đưa cho bà Lee những lựa chọn nào?",
        options: [
          "Một kỹ thuật viên nam lúc hai giờ, giảm giá mười phần trăm",
          "Hoàn tiền toàn bộ và một phiếu quà tặng cho lần sau",
          "Năm giờ chiều, sáng mai, hoặc danh sách chờ",
        ],
        correct: 2,
        explanation:
          "'a female therapist at five, a booking tomorrow morning, or the waiting list for today' — cả ba đều giữ đúng yêu cầu của khách.",
      },
      {
        q: "Kỹ thuật viên làm gì với phong bì tiền của bà Lee?",
        options: [
          "Bỏ vào hộp tiền boa chung của cả đội",
          "Giữ riêng vì khách đưa tận tay mình",
          "Trả lại vì nhân viên không được nhận tiền",
        ],
        correct: 0,
        explanation:
          "'puts it in the tip box, because every tip is shared by the whole team' — nhận lịch sự, không giữ riêng, không từ chối thẳng.",
      },
    ],
  ),
  game: [
    game(
      "I am standing here in my robe, and now there is no female therapist?",
      "I am very sorry, madam. Please take your time to dress, and I will rebook you with a female therapist.",
      "I am very sorry, madam. Please take your time to dress, and I will rebooking you with a female therapist.",
      "Our male therapists are very professional, madam. Could you try one just this once?",
      undefined,
      "Câu thứ hai sai dạng: sau 'will' là động từ nguyên mẫu 'rebook'. Câu thứ ba lịch sự nhưng xin khách bỏ yêu cầu của chính mình — điều không bao giờ được đề nghị. Câu đúng xin lỗi, cho khách thời gian, và giữ đúng yêu cầu.",
    ),
    game(
      "How much should I tip the therapist?",
      "There is no usual amount, sir. A gratuity is never expected.",
      "There is no usual amount, sir. A gratuity is never expect.",
      "Most guests give about ten per cent, sir, so that would be a good amount for you.",
      undefined,
      "Câu thứ hai sai dạng: bị động cần phân từ hai 'is never expected'. Câu thứ ba nêu một con số — biến lời cảm ơn tự nguyện thành một khoản phải trả. Câu đúng nói không có mức thông thường và tiền boa không bắt buộc.",
    ),
  ],
});

// ── Lesson 4 — Comfort, consent and the line we do not cross ───────────
const t4a =
  "Please undress only as far as you feel comfortable, madam. I will step outside while you get ready.";
const t4b =
  "Yes, madam. Only the area I am working on is uncovered, and you can ask me to stop at any moment.";
const t4c = "Please tell me at any moment, madam, and I will use a lighter pressure straight away.";
const t4d = "I am sorry, sir. I must decline, because that is a sensitive area.";

const lesson4 = L(37, 4, "Comfort and Consent", "Sự thoải mái và đồng thuận trong liệu trình", {
  vocabulary: [
    c("Step outside", "I will step outside while you get ready.", [
      "/ˌstep aʊtˈsaɪd/",
      "Ra ngoài phòng (để khách chuẩn bị)",
      "🚪",
    ]),
    c("At any moment", "You can ask me to stop at any moment.", [
      "/ət ˌeni ˈməʊmənt/",
      "Bất cứ lúc nào",
      "✋",
    ]),
    c("Decline", "If a guest asks for a sensitive area, we decline politely.", [
      "/dɪˈklaɪn/",
      "Từ chối (một cách lịch sự)",
      "🙅",
    ]),
    c("Professional", "Every treatment stays professional from start to finish.", [
      "/prəˈfeʃənl/",
      "Chuyên nghiệp, đúng chuẩn nghề",
      "🧑‍⚕️",
    ]),
  ],
  grammar: [
    g(
      "Take everything off, lie down.",
      "Please undress only as far as you feel comfortable, sir.",
      "'as far as you feel comfortable' = tới mức khách thấy thoải mái — khách quyết, không phải bạn. Sau 'feel' là tính từ 'comfortable', không phải trạng từ 'comfortably'.",
      "Please undress only as far as you feel comfortably, sir.",
    ),
    g(
      "I go out. You ready, I come in.",
      "I will step outside while you get ready, and I will knock before I come back in.",
      "Sau 'before' (và 'while', 'until') dùng hiện tại đơn dù nói về tương lai: 'before I come back in', không phải 'before I will come back in'.",
      "I will step outside while you get ready, and I will knock before I will come back in.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "This is my first massage. What do I need to take off?",
        t4a,
        "Khách quyết cởi tới đâu, không phải bạn. Rồi một việc của bạn: ra ngoài ('step outside') trong lúc khách chuẩn bị.",
      ),
      alsoAccept: [
        "Please undress only as far as you feel comfortable, madam, and I will step outside while you get ready.",
      ],
    },
    {
      ...sp(
        "Will I be covered the whole time?",
        t4b,
        "Hai bảo đảm cụ thể thay cho lời động viên: chỉ chỗ đang làm mới mở khăn, và khách được dừng bất cứ lúc nào ('at any moment').",
        undefined,
        undefined,
        t4a,
      ),
      alsoAccept: [
        "Yes, madam. Only the area I am working on is uncovered, and you can ask me to stop at any time.",
      ],
    },
    {
      ...sp(
        "And what if the pressure is too strong?",
        t4c,
        "Trao quyền cho khách, rồi hứa làm ngay — không giải thích vì sao đau.",
        undefined,
        undefined,
        t4b,
      ),
      alsoAccept: [
        "Please tell me at any moment, madam, and I will use a lighter pressure at once.",
      ],
    },
    risk({
      ...sp(
        "Could you go a little higher, closer to the top of my leg?",
        t4d,
        "Khách xin xoa vùng nhạy cảm: từ chối ngay, lịch sự, kèm một lý do ngắn. Không 'thử một chút', không im lặng làm theo.",
        undefined,
        ["decline", "sensitive", "area"],
      ),
      alsoAccept: [
        "I am sorry, sir, but I must decline, because that is a sensitive area.",
        "I am sorry, sir. I have to decline, because that is a sensitive area.",
      ],
    }),
    risk({
      ...sp(
        "Come on. Nobody will know.",
        "Then I will stop the treatment now, sir, and step outside.",
        "Khách đòi lần nữa: dừng buổi trị liệu và ra khỏi phòng. Không tranh luận. Ngay sau đó báo quản lý spa.",
        undefined,
        ["stop", "treatment", "step", "outside"],
        t4d,
      ),
      alsoAccept: [
        "Then I am stopping the treatment now, sir, and I will step outside.",
        "Then I will stop the treatment now, sir, and I will step outside.",
      ],
    }),
    sp(
      "Why did you stop the massage in room five?",
      "The guest asked twice for a sensitive area, so I stopped the treatment to keep it professional.",
      "Báo cáo cho quản lý ngay sau sự việc — không dùng sir hay madam: khách đã đòi gì, bạn đã làm gì.",
      "manager",
    ),
  ],
  reading: read(
    `Mr Grant is having his first massage, and he is a little shy. Before the treatment, Khoa explains how it works. Mr Grant can undress only as far as he feels comfortable. Khoa steps outside while he gets ready, and he knocks before he comes back in. During the massage, only the area Khoa is working on is uncovered. After five minutes, Khoa checks the pressure and reminds Mr Grant that he can ask him to stop at any moment. Later, Mr Grant asks Khoa to work higher, near the top of his leg. Khoa declines politely, because that is a sensitive area. He continues on Mr Grant's back. A minute later, Mr Grant asks again and says nobody will know. This time Khoa stops the treatment and steps outside. He tells the spa manager straight away, and she speaks with the guest. Khoa writes down exactly what was said. The spa manager thanks him for keeping the treatment professional.`,
    [
      {
        q: "Khoa nói gì về việc cởi đồ trước buổi massage?",
        options: [
          "Khách cởi tới mức mình thấy thoải mái",
          "Khách phải cởi hết để kỹ thuật viên làm cho đúng",
          "Khách giữ nguyên quần áo, chỉ cần cởi giày",
        ],
        correct: 0,
        explanation:
          "'Mr Grant can undress only as far as he feels comfortable' — khách quyết, kỹ thuật viên ra ngoài trong lúc khách chuẩn bị.",
      },
      {
        q: "Khoa kiểm tra lực ấn khi nào?",
        options: [
          "Chỉ một lần, lúc vừa bắt đầu",
          "Sau năm phút đầu, kèm lời nhắc khách có thể xin dừng bất cứ lúc nào",
          "Chỉ khi khách kêu đau thành tiếng",
        ],
        correct: 1,
        explanation:
          "'After five minutes, Khoa checks the pressure and reminds Mr Grant that he can ask him to stop at any moment.'",
      },
      {
        q: "Khi khách đề nghị lần thứ hai, Khoa làm gì?",
        options: [
          "Làm thử một chút cho khách vui lòng",
          "Im lặng, rồi tiếp tục massage lưng như không có gì xảy ra",
          "Dừng buổi, ra khỏi phòng và báo quản lý spa ngay",
        ],
        correct: 2,
        explanation:
          "'This time Khoa stops the treatment and steps outside. He tells the spa manager straight away' — lần đầu từ chối, lần hai dừng buổi.",
      },
    ],
  ),
  game: [
    game(
      "Could you work a little higher, near the top of my leg?",
      "I am sorry, sir. I must decline, because that is a sensitive area. I will continue on your back.",
      "I am sorry, sir. I must declining, because that is a sensitive area.",
      "All right, sir, just this once, but please do not mention it to anyone.",
      undefined,
      "Câu thứ hai sai dạng: sau 'must' là động từ nguyên mẫu 'decline'. Câu thứ ba đồng ý làm một việc vượt ranh giới nghề và còn xin khách giữ bí mật. Câu đúng từ chối lịch sự, kèm lý do ngắn, rồi làm tiếp ở lưng.",
    ),
    game(
      "Do I have to take everything off?",
      "No, madam. Please undress only as far as you feel comfortable.",
      "Yes, madam. It is much easier for the therapist, so please taking everything off.",
      "Yes, madam. It is much easier for the therapist, so please take everything off.",
      undefined,
      "Câu thứ hai sai dạng: sau 'please' là động từ nguyên mẫu 'take', không phải 'taking'. Cả câu thứ hai lẫn câu thứ ba đều đặt sự tiện của kỹ thuật viên lên trên quyền của khách. Câu đúng để khách tự quyết.",
    ),
  ],
});

export const week: AuthoredWeek = {
  title: {
    en: "Terms and Conditions at the Spa",
    vi: "Điều khoản gói, thẻ hội viên và điều kiện liệu trình",
  },
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: giải thích điều khoản bằng điều kiện, tỷ lệ và thời hạn ('valid for…', 'ten per cent off', 'as long as…', 'If you cancel less than four hours before…') — thẻ hội viên (gia hạn, tạm ngưng, không chuyển nhượng), phí huỷ muộn và không đến; nhận yêu cầu kỹ thuật viên nữ như một câu hỏi thủ tục và đưa ba lựa chọn khi không đáp ứng được; nói về tiền boa mà không nêu con số; giữ đồng thuận và che phủ khăn — từ chối vùng nhạy cảm, dừng buổi nếu khách đòi tiếp; mọi miễn phí hay ngoại lệ đều hỏi quản lý.",
};
