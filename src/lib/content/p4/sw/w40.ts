// SW week 40 — Final assessment: one full shift at the spa, morning to
// closing. Hand-authored Phase 4, see ../kit.ts.
//
// No new rule and no new word: every card re-presents a headword of weeks
// 31-39 in a new sentence, and every turn is a situation from a real shift
// that mixes the phase's functions — a consultation built on the health form
// and on what the guest said, a story told without a promise, a bill, a
// voucher and a fee handled at the right level of authority, an anniversary
// planned discreetly with the pollen question asked first, a guest who is
// light-headed in the sauna and lightning over the pool handled danger first,
// and the last request of the day written in the handover note and given to a
// colleague by name. Every rule is the one the phase already taught: the
// supervisor corrects a bill and checks a medication, the manager decides a
// pregnancy, a fee or a discount, a room is never named, and the nurse comes
// before anything else. Nothing here talks about the course itself.
import type { AuthoredWeek } from "../kit";
import { cardsFor, lessonsFor, risk } from "../kit";
import { game, g, read, sp } from "../../phase0";

const c = cardsFor("SW");
const L = lessonsFor("SW");

// ── Lesson 1 — Morning: consultations ──────────────────────────────────
const t1a =
  "Welcome back, sir. As a returning guest, your preferences are on file, but your health form must be up to date.";
const t1b =
  "Thank you for telling me, sir. Please add the medication to the form, and I will check with my supervisor first.";
const t1c =
  "I cannot say yet, sir, but based on her answer, the therapist will personalise the pressure for you.";

const lesson1 = L(40, 1, "Morning: Consultations", "Buổi sáng: tư vấn cho khách", {
  vocabulary: [
    c("Signature ritual", "At nine, the first guest of the day asks about the signature ritual."),
    c("Based on", "Based on the health form, the therapist chooses light pressure."),
    c("Returning guest", "Every returning guest fills in the health form again at the desk."),
    c("Medication", "If a guest lists a new medication, the supervisor checks it first."),
  ],
  grammar: [
    g(
      "You say knee before. I tell therapist.",
      "Since you mentioned your knee, I will tell the therapist before she starts.",
      "'Since you mentioned…' nối lại điều khách đã nói TRƯỚC đó, nên động từ ở quá khứ: 'mentioned'.",
      "Since you mention your knee, I will tell the therapist before she starts.",
    ),
    g(
      "Bath soothing, guests relaxing after.",
      "The herbal bath is soothing, and most guests feel relaxed afterwards.",
      "Đuôi -ing tả thứ GÂY ra cảm giác ('soothing'); đuôi -ed tả cảm giác của NGƯỜI ('feel relaxed'). Khách không 'feel relaxing'.",
      "The herbal bath is soothing, and most guests feel relaxing afterwards.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "Good morning! I was here last spring. Can I have my usual massage again?",
        t1a,
        "Chào đón khách quen, nói sở thích vẫn trong hồ sơ — nhưng phiếu sức khoẻ phải là bản mới nhất trước khi làm gì khác.",
      ),
      alsoAccept: [
        "Welcome back, sir. As a returning guest, your preferences are on file, but please fill in a new health form first.",
        "Welcome back, sir. As a returning guest, your preferences are on file, but may I ask you to fill in a new health form first?",
      ],
    },
    risk({
      ...sp(
        "All right. I have started a new medication for my heart.",
        t1b,
        "Thuốc khách đang dùng: không tự trả lời là massage được hay không. Mời khách ghi vào phiếu, rồi hỏi giám sát trước.",
        undefined,
        ["add", "medication", "form", "check", "supervisor", "first"],
        t1a,
      ),
      alsoAccept: [
        "Thank you, sir. Please add the medication to the form, and I will check with my supervisor first.",
        "Thank you for telling me, sir. Please write the medication on the form, and I will check with my supervisor first.",
        "Thank you, sir. Please add your medication to the health declaration form, and I will check with my supervisor first.",
        "Thank you, sir. Please write your medication on the health form, and I will check with my supervisor first.",
      ],
    }),
    {
      ...sp(
        "Will the supervisor say no to my massage?",
        t1c,
        "Không đoán thay giám sát. Nói điều chắc chắn: dựa trên câu trả lời ('based on'), kỹ thuật viên sẽ chỉnh lực ấn riêng cho khách.",
        undefined,
        undefined,
        t1b,
      ),
      alsoAccept: [
        "I am not sure yet, sir, but based on her answer, the therapist will personalise the pressure for you.",
        "I cannot say yet, sir, but based on her answer, the therapist will choose the right pressure for you.",
      ],
    },
    {
      ...sp(
        "What is special about your signature ritual?",
        "Our signature ritual comes from a mountain tradition: a soothing herbal bath, and then a full body massage.",
        "Kể ngắn nguồn gốc và hai bước theo thứ tự bằng ', and then' — câu chuyện đúng sự thật, không hứa chữa bệnh.",
      ),
      alsoAccept: [
        "Our signature ritual starts with a herbal bath, and then the therapist gives you a full body massage.",
        "Our signature ritual comes from a mountain tradition: first a soothing herbal bath, and then a full body massage.",
      ],
    },
    risk({
      ...sp(
        "I am pregnant, but I would love to try the signature ritual.",
        "Congratulations, madam. The ritual has a hot herbal bath, so I will check with my manager first.",
        "Khách mang thai và một liệu trình nóng: không tự nói có hay không. Chúc mừng, nói lý do, rồi hỏi quản lý trước.",
        undefined,
        ["ritual", "hot", "herbal", "bath", "check", "manager", "first"],
      ),
      alsoAccept: [
        "Congratulations, madam. The ritual has a hot herbal bath, so let me check with my manager first.",
        "Congratulations, madam. The ritual includes a hot herbal bath, so I will check with my manager first.",
        "Thank you for telling me, madam. The ritual has a hot herbal bath, so I will check with my manager first.",
        "Thank you, madam. I will check with my manager first.",
        "Congratulations, madam. I will check with my manager first.",
        "Thank you, madam. Based on that, I will check with my manager first.",
      ],
    }),
    {
      ...sp(
        "I am allergic to nuts. Which oil will you use on me?",
        "Thank you, madam. I will check every ingredient on the label first, and the therapist will use a nut-free oil.",
        "Dị ứng: không trả lời theo trí nhớ. Kiểm tra từng thành phần trên nhãn trước, rồi nói loại dầu sẽ dùng.",
      ),
      alsoAccept: [
        "Thank you for telling me, madam. I will check every ingredient on the label first, and the therapist will use a nut-free oil.",
        "Thank you, madam. I will check the label first, and the therapist will use a nut-free oil.",
        "Thank you, madam. I will check the ingredients first and use a nut-free oil.",
      ],
    },
    sp(
      "My ten o'clock guest wrote 'sore lower back' on her form. What do you suggest?",
      "Based on her form, please use light pressure on her sore lower back and check with her after five minutes.",
      "Nói với đồng nghiệp — không dùng sir hay madam. Gợi ý dựa trên phiếu, kèm một mốc kiểm tra lại lực ấn.",
      "colleague",
    ),
    {
      ...sp(
        "I flew in from Paris last night, and my neck feels so tight.",
        "Since you mentioned the flight, I suggest a gentle jet lag massage that focuses on the tension in your neck.",
        "Dùng lại chính lời khách (chuyến bay, cái cổ) để gợi ý một liệu trình hợp với khách — chưa nói giá, chưa ép.",
      ),
      alsoAccept: [
        "Since you mentioned the flight, I recommend a gentle jet lag massage that focuses on the tension in your neck.",
        "Since you mentioned the flight, I suggest a gentle massage for jet lag that focuses on the tension in your neck.",
      ],
    },
    {
      ...sp(
        "My back has hurt for months. Will a hot stone massage cure it?",
        "I cannot promise a cure, sir. The real benefit of the hot stones is the warmth, and many guests sleep well afterwards.",
        "Không hứa chữa bệnh. Nói thật lợi ích có thật của liệu trình, bằng một câu ghép ', and'.",
      ),
      alsoAccept: [
        "I am sorry, sir, I cannot promise a cure. The real benefit of the hot stones is the warmth, and many guests sleep well afterwards.",
        "I cannot promise a cure, sir, but many guests find the warm stones very relaxing.",
      ],
    },
  ],
  reading: read(
    `The spa opens at nine, and Ngan is at the desk. Her first guest is Mr Hart, a returning guest from last spring. His preferences are on file, but Ngan still gives him a new health form. On the form, he writes that he has started a new medication for his heart. Ngan thanks him and checks with her supervisor before anything else. The supervisor reads the form and chooses a gentle massage with light pressure, and no hot stones. At ten, Ms Diaz asks about the signature ritual. Ngan tells the story in two parts: a herbal bath, and then a full body massage. Ms Diaz loves the idea, and then she says she is pregnant. Ngan congratulates her, explains that the ritual has a hot herbal bath, and checks with her manager first. The manager suggests a prenatal massage instead. At eleven, a guest says she is allergic to nuts. Ngan checks the oil label before the treatment, and the therapist uses a nut-free oil.`,
    [
      {
        q: "Ông Hart có phải điền phiếu sức khoẻ mới không?",
        options: [
          "Không, vì sở thích của ông đã có trong hồ sơ",
          "Có, dù ông là khách quen và sở thích đã có trong hồ sơ",
          "Chỉ khi ông muốn đổi sang liệu trình khác",
        ],
        correct: 1,
        explanation:
          "'His preferences are on file, but Ngan still gives him a new health form' — sở thích dùng lại được, phiếu sức khoẻ thì làm mới mỗi lần.",
      },
      {
        q: "Ai chọn liệu trình cho ông Hart sau khi ông ghi thuốc tim mạch?",
        options: [
          "Giám sát, sau khi đọc phiếu mới",
          "Ngân, theo hồ sơ của năm ngoái",
          "Chính ông Hart, theo thói quen cũ",
        ],
        correct: 0,
        explanation:
          "'The supervisor reads the form and chooses a gentle massage with light pressure, and no hot stones.'",
      },
      {
        q: "Vì sao Ngân hỏi quản lý trước khi trả lời bà Diaz?",
        options: [
          "Vì bà Diaz muốn được giảm giá cho nghi thức này",
          "Vì nghi thức đặc trưng đã kín lịch suốt cả ngày",
          "Vì bà mang thai, mà nghi thức bắt đầu bằng một bồn ngâm nóng",
        ],
        correct: 2,
        explanation:
          "'Ngan congratulates her, explains that the ritual has a hot herbal bath, and checks with her manager first.'",
      },
    ],
  ),
  game: [
    game(
      "I was here last year. Do I really need a new health form?",
      "Yes, please, sir. We check the form at every visit, because health can change in a year.",
      "Yes, please, sir. We checks the form at every visit, because health can change.",
      "No, sir. You look very well today, so we can use last year's form.",
      undefined,
      "Câu thứ hai sai hoà hợp: chủ ngữ 'We' → 'check', không thêm -s. Câu thứ ba đoán sức khoẻ qua vẻ ngoài và bỏ một bước an toàn. Câu đúng giữ phiếu mới và nói lý do.",
    ),
    game(
      "I am expecting a baby in May. Can I book the hot stone massage?",
      "Congratulations, madam. Hot stones are a heat treatment, so I will ask my manager first.",
      "Yes, madam. The stones are only warm, so they is safe for everyone.",
      "Yes, madam. The stones are only warm, so they are safe for everyone.",
      undefined,
      "Câu thứ hai sai hoà hợp: 'they' số nhiều → 'are', không phải 'is'. Cả câu thứ hai lẫn câu thứ ba đều tự hứa an toàn — đá nóng là liệu trình dùng nhiệt, và với khách mang thai thì quản lý mới là người quyết. Câu đúng chúc mừng, nói lý do rồi hỏi quản lý.",
    ),
  ],
});

// ── Lesson 2 — Midday: bills, vouchers and fees ────────────────────────
const t2a =
  "I am sorry about the double charge, madam. May I see the bill, so I can check the treatment schedule?";
const t2b =
  "Yes, madam, there is an overcharge. My supervisor will correct it now, and I will bring you the new bill.";
const t2c = "Thank you for telling us, madam, and I am sorry for the trouble.";

const lesson2 = L(
  40,
  2,
  "Midday: Bills, Vouchers and Fees",
  "Buổi trưa: hoá đơn, phiếu quà tặng và phí",
  {
    vocabulary: [
      c("Overcharge", "At noon, a guest finds an overcharge on her bill."),
      c("Expiry date", "The desk checks the expiry date before it accepts any voucher."),
      c("Waive", "Only the manager can waive a fee, even for a regular guest."),
      c("In exchange for", "Nam takes Lan's evening shift in exchange for her Sunday morning."),
    ],
    grammar: [
      g(
        "Policy say you change free, before noon.",
        "The policy allows you to move the booking at no charge until noon.",
        "'allow + người + to + động từ': 'allows you to move'. Người Việt hay bỏ 'to' ('allows you move').",
        "The policy allows you move the booking at no charge until noon.",
      ),
      g(
        "Fee, I cannot. Manager maybe.",
        "I am not able to waive the fee, but I will ask my manager this afternoon.",
        "'not able to' + động từ nguyên mẫu: 'not able to waive'. Nói rõ giới hạn của mình, rồi nói ai quyết và khi nào.",
        "I am not able to waiving the fee, but I will ask my manager this afternoon.",
      ),
    ],
    speaking: [
      {
        ...sp(
          "This bill is wrong. I had one facial, but you charged me for two.",
          t2a,
          "Bước đầu của LAST: xin lỗi về chuyện khách gặp, rồi xin xem hoá đơn và kiểm tra lịch trị liệu — chưa kết luận ai sai.",
        ),
        alsoAccept: [
          "I am sorry about the double charge, madam. Could I see the bill, so I can check the treatment schedule?",
          "I am sorry about this, madam. May I see the bill, so I can check the treatment schedule?",
        ],
      },
      {
        ...sp(
          "Here it is. Can you see the problem?",
          t2b,
          "Kiểm tra xong mới nói kết quả. Sửa hoá đơn là việc của giám sát — bạn hứa việc của mình: mang hoá đơn mới tới.",
          undefined,
          undefined,
          t2a,
        ),
        alsoAccept: [
          "Yes, madam, there is an overcharge. My supervisor will correct it now, and I will bring the new bill to you.",
        ],
      },
      {
        ...sp(
          "Thank you. That was quicker than I expected.",
          t2c,
          "Bước cuối của LAST: cảm ơn khách đã cho biết, và xin lỗi một lần nữa — ngắn gọn.",
          undefined,
          undefined,
          t2b,
        ),
        alsoAccept: ["Thank you for telling us, madam, and I am very sorry for the trouble."],
      },
      risk({
        ...sp(
          "My voucher expired last week. Please accept it anyway.",
          "I am sorry, madam. The expiry date has passed, so I will ask my supervisor now.",
          "Nhận phiếu quá hạn là chuyện tiền: không tự nhận. Nói sự thật trên phiếu, rồi hỏi giám sát ngay.",
          undefined,
          ["expiry", "date", "ask", "supervisor"],
        ),
        alsoAccept: [
          "I am sorry, madam. The expiry date has passed, so I will check with my supervisor now.",
          "I am afraid the expiry date has passed, madam, so I will ask my supervisor now.",
          "I cannot accept it, madam, but let me check with my supervisor now.",
          "I am sorry, madam. The voucher has expired, so I will ask my supervisor now.",
          "I am sorry, madam. Accepting it is my supervisor's decision, so I will ask her now.",
        ],
      }),
      risk({
        ...sp(
          "I cancelled one hour before. Waive the fee, or I will write a bad review.",
          "I understand, sir. I cannot waive the cancellation fee, but I will ask my manager this afternoon.",
          "Khách doạ đánh giá xấu không đổi thẩm quyền: miễn phí là việc của quản lý. Giữ giọng bình thản, hứa việc của bạn kèm mốc giờ.",
          undefined,
          ["waive", "fee", "ask", "manager"],
        ),
        alsoAccept: [
          "I understand, sir. I am not able to waive the cancellation fee, but I will ask my manager this afternoon.",
          "I understand, sir. I cannot waive the cancellation fee myself, but I will ask my manager this afternoon.",
          "I understand, sir. I cannot waive the fee, but I will ask my manager today.",
          "I am sorry, sir. I cannot waive the fee; however, I will ask my manager today.",
          "I cannot waive the cancellation fee, sir, but I can ask my manager for you.",
          "I understand, sir. Waiving the fee is my manager's decision, so I will ask her this afternoon.",
        ],
      }),
      {
        ...sp(
          "Can you take my Friday evening shift? I need a day off for a family dinner.",
          "Yes, we can swap: I work Friday in exchange for your Sunday morning, but your day off needs the supervisor's approval first.",
          "Nói với đồng nghiệp — không dùng sir hay madam. Đồng ý đổi ca có điều kiện, và nhắc ngày nghỉ phải được giám sát duyệt trước.",
          "colleague",
        ),
        alsoAccept: [
          "I can, in exchange for your Sunday morning, but we need the supervisor's approval first.",
          "Yes, we can swap: I work Friday in exchange for your Sunday morning, but the supervisor must approve your day off first.",
        ],
      },
      {
        ...sp(
          "The membership is in my husband's name. Can I use it today?",
          "I am sorry, madam. The membership is non-transferable, but you can book any treatment today at the full price.",
          "Nói đúng điều khoản thẻ (không chuyển nhượng), rồi đưa một cách khác có thật mà bạn được quyết: đặt liệu trình hôm nay với nguyên giá.",
        ),
        alsoAccept: [
          "I am sorry, madam. The membership is for your husband only, but you can book any treatment today at the full price.",
          "I am sorry, madam. The membership is non-transferable, but I can ask my manager.",
        ],
      },
      risk({
        ...sp(
          "Look, the massage oil left a stain on my dress. Who will pay for the dry cleaning?",
          "I am very sorry for the stain, madam. My manager decides on dry cleaning, so let me check with her now.",
          "Váy dính dầu là chuyện tiền: không tự hứa trả, không chối. Xin lỗi về điều khách gặp, nói rõ ai quyết, rồi hỏi ngay.",
          undefined,
          ["dry", "cleaning", "manager", "check"],
        ),
        alsoAccept: [
          "I am very sorry about the stain, madam. Dry cleaning is my manager's decision, so let me check with her now.",
          "I am very sorry about the stain, madam. Dry cleaning is my manager's decision, so I will ask her now.",
          "I understand, madam. Dry cleaning and compensation are my manager's decision, so let me check with her now.",
          "I am very sorry, madam. I cannot promise the dry cleaning, but let me check with my manager now.",
        ],
      }),
      sp(
        "The guest with the oil on her dress says it was our fault. What did you tell her?",
        "I did not talk about fault or compensation. I said you will follow up with her today.",
        "Báo cáo cho quản lý — không dùng sir hay madam: điều bạn KHÔNG nói (lỗi, bồi thường), và việc ai sẽ làm tiếp.",
        "manager",
      ),
    ],
    reading: read(
      `At noon, the spa desk is busy with money questions. First, Mrs Lopez says she had one facial but was charged for two. Quang says sorry, asks to see the bill and checks the treatment schedule. It is an overcharge, so his supervisor corrects it, and Quang brings Mrs Lopez the new bill. He thanks her for telling the spa. Next, a guest shows a voucher with an expiry date from last week. Quang does not accept it himself. He asks his supervisor, who accepts it this one time. Then a guest who cancelled one hour before his massage asks Quang to waive the fee. He says he will write a bad review. Quang stays polite and patient, and he says only the manager can waive the fee. He asks her that afternoon. Finally, his colleague Nam asks him to take his Friday evening shift. Quang agrees in exchange for Nam's Sunday morning, and they ask the supervisor for approval together.`,
      [
        {
          q: "Ai sửa hoá đơn của bà Lopez?",
          options: [
            "Quang, ngay tại quầy",
            "Giám sát của Quang, ngay trưa đó",
            "Bộ phận kế toán, vào ngày hôm sau",
          ],
          correct: 1,
          explanation:
            "'It is an overcharge, so his supervisor corrects it, and Quang brings Mrs Lopez the new bill.'",
        },
        {
          q: "Khi khách doạ viết đánh giá xấu, Quang làm gì?",
          options: [
            "Giữ lịch sự và kiên nhẫn, nói chỉ quản lý mới được miễn phí",
            "Miễn phí ngay để khách không viết đánh giá",
            "Nói khách sai và từ chối nói chuyện tiếp",
          ],
          correct: 0,
          explanation:
            "'Quang stays polite and patient, and he says only the manager can waive the fee' — lời doạ không đổi ai là người quyết.",
        },
        {
          q: "Quang và Nam đổi ca theo cách nào?",
          options: [
            "Tự đổi trên bảng phân ca, không cần báo cho ai",
            "Quang làm thay mà không đòi đổi lại ca nào",
            "Đổi lấy sáng Chủ nhật, có giám sát duyệt",
          ],
          correct: 2,
          explanation:
            "'Quang agrees in exchange for Nam's Sunday morning, and they ask the supervisor for approval together.'",
        },
      ],
    ),
    game: [
      game(
        "You charged me for two facials, but I only had one!",
        "I am sorry, madam. Let me check the bill, and my supervisor will correct any mistake.",
        "I am sorry, madam. Let me checking the bill, and my supervisor will correct any mistake.",
        "That is impossible, madam. Our system never makes mistakes with the bills.",
        undefined,
        "Câu thứ hai sai dạng: sau 'Let me' là động từ nguyên mẫu 'check'. Câu thứ ba cãi khách trước khi kiểm tra — trái với bước lắng nghe. Câu đúng kiểm tra, rồi giám sát sửa nếu có sai.",
      ),
      game(
        "Your therapist was ten minutes late. I want this massage for free.",
        "I am sorry about the wait, madam. A free massage is my manager's decision, so I will ask her now.",
        "I am sorry about the wait, madam. A free massage is my manager's decision, so I will asking her now.",
        "Of course, madam. I will take it off your bill right now.",
        undefined,
        "Câu thứ hai sai dạng: sau 'will' là động từ nguyên mẫu 'ask'. Câu thứ ba tự miễn phí một liệu trình — vượt thẩm quyền, dù kỹ thuật viên đến muộn thật. Câu đúng xin lỗi về chuyện khách gặp, nói rõ ai quyết và hỏi ngay.",
      ),
    ],
  },
);

// ── Lesson 3 — Afternoon: an anniversary to plan ──────────────────────
const t3a =
  "Congratulations, sir. Since it is your anniversary, I suggest a couple's massage at six and rose petals in your room afterwards.";
const t3b =
  "The highlight is a herbal bath for two, and then champagne in the suite after a rest and some water.";
const t3c =
  "Of course, sir. We will keep the surprise discreet, and nobody will sing or bring a cake.";

const lesson3 = L(
  40,
  3,
  "Afternoon: An Anniversary to Plan",
  "Buổi chiều: lên kế hoạch cho dịp kỷ niệm",
  {
    vocabulary: [
      c("Anniversary", "On Friday, a couple celebrate their tenth wedding anniversary at the spa."),
      c("Pollen", "Before any flowers go into a treatment room, we ask about pollen."),
      c("Highlight", "The highlight of the evening is a herbal bath for two."),
      c("Discreet", "The couple want a quiet evening, so the whole team stays discreet."),
    ],
    grammar: [
      g(
        "You celebrate something this week?",
        "May I ask if you are celebrating anything special this week?",
        "Sau 'May I ask if…' giữ trật tự câu kể: 'you are celebrating', không đảo 'are you'.",
        "May I ask if are you celebrating anything special this week?",
      ),
      g(
        "All spa team say happy anniversary.",
        "On behalf of the spa team, we wish you a very happy anniversary.",
        "'On behalf of + người/nhóm' = thay mặt cho. Không bỏ 'of': 'on behalf the team' là sai.",
        "On behalf the spa team, we wish you a very happy anniversary.",
      ),
    ],
    speaking: [
      {
        ...sp(
          "It is our tenth wedding anniversary on Friday. Can you plan something for us?",
          t3a,
          "Phần một và hai của một đề xuất: nhắc lại dịp của khách, rồi kế hoạch có giờ cụ thể.",
        ),
        alsoAccept: [
          "Congratulations, sir. Since it is your anniversary, I recommend a couple's massage at six and rose petals in your room afterwards.",
        ],
      },
      {
        ...sp(
          "Lovely. And what is the highlight?",
          t3b,
          "Điểm nổi bật ('highlight') để cuối — và sâm panh đi SAU bồn ngâm, khi khách đã nghỉ và uống nước, đúng luật cũ.",
          undefined,
          undefined,
          t3a,
        ),
        alsoAccept: [
          "The highlight is a herbal bath for two, and then champagne in the suite after some rest and water.",
        ],
      },
      {
        ...sp(
          "My wife does not like a fuss, so please keep it quiet.",
          t3c,
          "Hứa kín đáo ('discreet'), rồi nói rõ kín đáo nghĩa là gì — không hát, không bánh.",
          undefined,
          undefined,
          t3b,
        ),
        alsoAccept: [
          "Of course, sir. We will keep the surprise discreet, and nobody will sing or bring in a cake.",
          "Of course, sir. We will be discreet, and nobody will sing or bring a cake.",
        ],
      },
      risk({
        ...sp(
          "Could you fill the treatment room with lilies? She loves them.",
          "They are lovely, sir, but may I ask first if your wife has an allergy to pollen?",
          "Hoa trong phòng trị liệu: hỏi dị ứng phấn hoa TRƯỚC khi hứa. Khen ý tưởng, rồi hỏi tế nhị.",
          undefined,
          ["ask", "first", "allergy", "pollen"],
        ),
        alsoAccept: [
          "They are lovely, sir, but may I first ask if your wife has an allergy to pollen?",
          "They are lovely, sir. May I ask first if your wife has any allergy to pollen?",
          "They are lovely, sir. May I ask if your wife is allergic to pollen first?",
          "They are beautiful, sir, but may I ask first if your wife has an allergy to pollen?",
          "That is a lovely surprise, sir. May I ask if your wife has any allergy to pollen?",
        ],
      }),
      {
        ...sp(
          "My friend Anna is staying with you. Is she in the spa right now? I want to surprise her.",
          "I am sorry, madam. I cannot say who is in the spa, but I can take a message for you.",
          "Không xác nhận ai có ở spa, kể cả để làm quà bất ngờ. Từ chối ngắn, rồi đưa một cách khác: nhận lời nhắn.",
        ),
        alsoAccept: [
          "I am sorry, madam. I cannot say who is in the spa, but you can leave a message at reception.",
        ],
      },
      sp(
        "Housekeeping is asking when the anniversary couple will be back in their room.",
        "They finish at half past seven, so please coordinate with Housekeeping and have the rose petals ready by then.",
        "Nói với đồng nghiệp — không dùng sir hay madam. Một giờ cụ thể, rồi nhờ phối hợp với buồng phòng để việc xong trước giờ đó.",
        "colleague",
      ),
      sp(
        "What is planned for the anniversary couple?",
        "For their special occasion, a couple's massage at six and a herbal bath, with champagne after a rest and water. We are keeping it discreet.",
        "Báo cáo cho quản lý — không dùng sir hay madam: kế hoạch theo thứ tự, và mong muốn của khách.",
        "manager",
      ),
      {
        ...sp(
          "Could you write the plan down for my wife and me?",
          "Of course, sir. Here is a short summary of the treatment plan, and the next step is to confirm the time.",
          "Phần ba của một đề xuất: đưa bản tóm tắt bằng văn bản, rồi nói bước tiếp theo.",
        ),
        alsoAccept: [
          "Of course, sir. Here is a summary of the treatment plan, and the next step is to confirm the time.",
        ],
      },
      {
        ...sp(
          "Thank you. I think she will love it.",
          "It is our pleasure, sir. On behalf of the spa team, wishing you both a very happy anniversary.",
          "Lời chúc trang trọng thay mặt cả đội spa, ngắn gọn — rồi để khách đi.",
        ),
        alsoAccept: [
          "It was our pleasure, sir. On behalf of the spa team, we wish you both a very happy anniversary.",
          "It is our pleasure, sir. On behalf of the spa team, we wish you both a happy anniversary.",
        ],
      },
    ],
    reading: read(
      `On Thursday afternoon, Mr Ortiz comes to the spa desk. It is his tenth wedding anniversary on Friday, and he wants to plan a surprise. Hien presents a short plan in three parts. First, she repeats what he wants: a quiet evening for two. Then she gives the plan: a couple's massage at six, a herbal bath for two, and champagne after a rest and some water. Finally, she gives the next step: Housekeeping will put rose petals in their room. Mr Ortiz also wants lilies in the treatment room. Hien first asks if his wife has an allergy to pollen. He remembers that she has hay fever, so they choose soft music and a card instead of flowers. He adds that his wife does not like a fuss, and Hien promises to be discreet. Later, a woman calls and asks if her friend is in the spa. Hien does not say yes or no. She offers to take a message at reception.`,
      [
        {
          q: "Phần thứ hai trong kế hoạch của Hiền là gì?",
          options: [
            "Nhắc lại mong muốn của khách",
            "Massage đôi, bồn ngâm, rồi sâm panh sau",
            "Buồng phòng rải cánh hoa hồng trong phòng ngủ",
          ],
          correct: 1,
          explanation:
            "'Then she gives the plan: a couple's massage at six, a herbal bath for two, and champagne after a rest and some water.'",
        },
        {
          q: "Vì sao cuối cùng không có hoa ly trong phòng?",
          options: [
            "Vì Hiền hỏi trước, và ông nhớ ra vợ bị dị ứng phấn hoa",
            "Vì hoa ly quá đắt cho dịp kỷ niệm lần này",
            "Vì spa không cho mang hoa vào phòng trị liệu",
          ],
          correct: 0,
          explanation:
            "'Hien first asks if his wife has an allergy to pollen. He remembers that she has hay fever' — hỏi trước, nên tránh được một sự cố.",
        },
        {
          q: "Khi có người gọi hỏi bạn mình có ở spa không, Hiền làm gì?",
          options: [
            "Nói bạn của người gọi đang ở phòng xông hơi",
            "Hỏi tên người gọi rồi đọc số phòng của khách",
            "Không xác nhận, nhận lời nhắn",
          ],
          correct: 2,
          explanation:
            "'Hien does not say yes or no. She offers to take a message at reception' — không xác nhận khách có ở đây.",
        },
      ],
    ),
    game: [
      game(
        "I want lilies all over the treatment room for my wife.",
        "That is lovely, sir. May I ask if your wife has any allergy to pollen?",
        "That is lovely, sir. May I ask if your wife has any allergy with pollen?",
        "Of course, sir. Flowers are natural, so they are perfectly fine for every guest.",
        undefined,
        "Câu thứ hai sai giới từ: 'allergy to', không phải 'allergy with'. Câu thứ ba cho rằng tự nhiên là an toàn — phấn hoa là nguyên nhân dị ứng rất phổ biến. Câu đúng khen ý tưởng rồi hỏi dị ứng trước.",
      ),
      game(
        "Is my friend Anna in the spa now? I want to surprise her.",
        "I am sorry, madam. I cannot say who is in the spa today.",
        "Yes, madam. She is in the steam room until four, so you can waiting for her here.",
        "Yes, madam. She is in the steam room until four, so you can wait for her here.",
        undefined,
        "Câu thứ hai sai dạng: sau 'can' là động từ nguyên mẫu 'wait'. Cả câu thứ hai lẫn câu thứ ba đều tiết lộ khách đang ở đâu và tới mấy giờ cho người hỏi — vi phạm riêng tư và an toàn của khách. Câu đúng không xác nhận gì.",
      ),
    ],
  },
);

// ── Lesson 4 — Evening: danger first, then the handover ────────────────
const t4a = "Please walk out of the sauna with me now, madam, and rest in the cool area.";
const t4b = "Of course, madam. Please sip it slowly, and the nurse is on her way.";
const t4c =
  "Please rest here until the nurse has seen you, madam. In the meantime, please keep sipping your water.";

const lesson4 = L(
  40,
  4,
  "Evening: Danger First, Then the Handover",
  "Buổi tối: nguy hiểm trước, rồi bàn giao",
  {
    vocabulary: [
      c("Light-headed", "At half past eight, a guest feels light-headed in the sauna."),
      c("Lightning", "At nine, there is lightning over the outdoor pool."),
      c("Danger first", "Danger first: a guest in the sauna comes before a ringing phone."),
      c("Handover note", "The last request of the evening goes in the handover note."),
      c("By name", "The evening attendant hands the request to Lan by name."),
    ],
    grammar: [
      g(
        "Wait, three minute. I come.",
        "I will be with you in three minutes, sir.",
        "Một mốc giờ cho việc của chính bạn: 'in three minutes' = ba phút NỮA. 'after three minutes' là lỗi dịch thẳng 'sau ba phút'. Chỉ hứa giờ cho việc của mình, không hứa thay y tá.",
        "I will be with you after three minutes, sir.",
      ),
      g(
        "You rest, nurse come.",
        "Please rest in the cool area until the nurse arrives, madam.",
        "Sau 'until' dùng hiện tại đơn dù nói về tương lai: 'until the nurse arrives', không phải 'will arrive'.",
        "Please rest in the cool area until the nurse will arrive, madam.",
      ),
    ],
    speaking: [
      risk({
        ...sp(
          "I feel light-headed. Everything is spinning.",
          t4a,
          "Choáng váng trong phòng xông: ra khỏi chỗ nóng NGAY, nghỉ ở khu vực mát. Một việc, nói ngắn.",
          undefined,
          ["walk", "out", "sauna", "rest", "cool", "area"],
        ),
        alsoAccept: [
          "Please come out of the sauna with me now, madam, and rest in the cool area.",
          "Please walk out of the sauna with me now, madam, and sit in the cool area.",
          "Please come out of the sauna with me now, madam, and sit in the cool area.",
        ],
      }),
      {
        ...sp(
          "Can I have some cold water, please?",
          t4b,
          "Một việc cho khách (uống từng ngụm nhỏ) và một sự thật (y tá đang tới) — không hứa số phút thay y tá.",
          undefined,
          undefined,
          t4a,
        ),
        alsoAccept: [
          "Of course, madam. Please sip it slowly. The nurse is on her way.",
          "Of course, madam. Please sip it slowly, and the nurse is coming now.",
        ],
      },
      {
        ...sp(
          "I feel better now. I will go back in for five more minutes.",
          t4c,
          "Khách thấy đỡ vẫn chưa quay lại chỗ nóng: chờ y tá xem trước. Nói nhẹ nhàng, không tranh luận, và cho khách một việc trong lúc chờ ('In the meantime').",
          undefined,
          undefined,
          t4b,
        ),
        alsoAccept: [
          "Please rest here until the nurse arrives, madam. The sauna can wait until she has seen you.",
          "Please rest here until the nurse arrives, madam. The sauna can wait until the nurse has seen you.",
        ],
      },
      risk({
        ...sp(
          "It is only drizzle. I am finishing my swim.",
          "I am sorry, sir. There is lightning again, so please step out of the pool now.",
          "Có sét là lên bờ, mưa to hay nhỏ cũng vậy. Một lý do, một việc khách phải làm ngay.",
          undefined,
          ["lightning", "step", "out", "pool"],
        ),
        alsoAccept: [
          "I am sorry, sir. There is lightning again, so please step out of the pool straight away.",
          "I am afraid there is lightning again, sir, so please step out of the pool now.",
          "I am sorry, sir. There is lightning, so please step out of the pool now.",
          "I am sorry, sir. There is lightning again, so please get out of the pool now.",
        ],
      }),
      {
        ...sp(
          "A guest in the sauna says she is light-headed, and the phone is ringing.",
          "Danger first: the light-headed guest is our priority. Please walk her to the cool area, and I will call the nurse.",
          "Nói với đồng nghiệp — không dùng sir hay madam. Xếp thứ tự bằng hai chữ ('Danger first'), nói ai được ưu tiên, rồi chia việc: đồng nghiệp đưa khách ra, bạn gọi y tá.",
          "colleague",
        ),
        alsoAccept: [
          "Danger first. Please walk the light-headed guest to the cool area, and I will call the nurse.",
          "Danger first. Please walk her to the cool area, and I will call the nurse now.",
          "If she is light-headed, please walk her out to the cool area. I am calling the nurse now.",
        ],
      },
      {
        ...sp(
          "It is a quarter to ten. A guest wants to plan a birthday spa day for eight friends. Shall I start it?",
          "It is nearly closing time, so please put it in the handover note for Lan by name. She starts at ten tomorrow morning.",
          "Nói với đồng nghiệp — không dùng sir hay madam. Mười lăm phút cuối ca: một việc lớn như lên kế hoạch cho nhóm thì không mở — ghi lại, giao đích danh, và nói giờ người đó bắt đầu.",
          "colleague",
        ),
        alsoAccept: [
          "It is nearly closing time, so please write it in the handover note and give it to Lan by name. She starts at ten tomorrow morning.",
        ],
      },
      {
        ...sp(
          "Is there anything I should know before you go home?",
          "Yes. An overheated guest saw the nurse, and I closed off the pool during the thunderstorm. It is all in the handover note for the next shift.",
          "Báo cáo cho Quản lý trực trước khi về — không dùng sir hay madam: hai việc quan trọng nhất của buổi tối, và chúng đã được ghi ở đâu.",
          "manager",
        ),
        alsoAccept: [
          "Yes. A guest was light-headed in the sauna, so we called the nurse, and it is all in the handover note.",
        ],
      },
      risk({
        ...sp(
          "The guest in room two has swollen lips, and the phone is ringing. What first?",
          "Please stop the treatment and use the emergency button. I am calling 115 now.",
          "Nói với đồng nghiệp — không dùng sir hay madam. Môi sưng có thể là dị ứng nặng: điện thoại chờ, dừng liệu trình, bấm nút khẩn cấp, và bạn gọi 115 ngay.",
          "colleague",
          ["treatment", "use", "emergency", "button"],
        ),
        alsoAccept: [
          "Danger first: please stop the treatment and use the emergency button. I am calling 115 now.",
          "Danger first: please stop the treatment and press the emergency button. I am calling 115 now.",
          "Please stop the treatment and use the emergency button. I will call 115 now.",
          "Please stop the treatment and press the emergency button. I will call 115 now.",
          "Danger first. Please stop the treatment and use the emergency button, and I am calling 115 now.",
        ],
      }),
      {
        ...sp(
          "The pool smells strongly of chlorine tonight, and my eyes sting.",
          "Thank you, sir. Please rinse your eyes with fresh water, and I will close off the pool until the water test is clear.",
          "Một việc khách tự làm ngay (rửa mắt bằng nước sạch), và một việc của bạn: rào hồ tới khi kết quả kiểm tra nước đạt — không hứa giờ mở lại.",
        ),
        alsoAccept: [
          "Thank you for telling me, sir. Please rinse your eyes with fresh water, and I will close off the pool until the water test is clear.",
          "Please rinse your eyes with fresh water, sir, and I will close off the pool until the water test is clear.",
        ],
      },
    ],
    reading: read(
      `From eight to ten, Hoang looks after the wet area. At half past eight, a guest in the sauna says she feels light-headed. Hoang walks her out of the sauna and takes her to the cool area. He asks her to sip some water slowly, and his colleague calls the hotel nurse, who arrives in three minutes. The guest feels better and wants to go back into the sauna. Hoang asks her to rest until the nurse has seen her. At nine, a thunderstorm starts, and there is lightning over the outdoor pool. One guest wants to finish his swim. Hoang asks him to step out of the pool straight away, and he closes off the outdoor pool. At a quarter to ten, a guest asks to plan a birthday spa day for eight friends. Hoang's shift ends at ten, so he does not start a new job. He writes the request in the handover note and gives it to Lan by name. Before he goes home, he tells the Duty Manager about the evening.`,
      [
        {
          q: "Hoàng làm gì khi khách choáng váng trong phòng xông hơi?",
          options: [
            "Đưa khách ra khu vực mát, cho uống nước",
            "Bảo khách ngồi thấp xuống ngay trong phòng xông",
            "Gọi chồng khách tới đưa khách về phòng nghỉ",
          ],
          correct: 0,
          explanation:
            "'Hoang walks her out of the sauna and takes her to the cool area. He asks her to sip some water slowly' — ra khỏi chỗ nóng trước tiên.",
        },
        {
          q: "Vì sao Hoàng không tự lên kế hoạch cho nhóm lúc mười giờ kém mười lăm?",
          options: [
            "Vì spa không nhận khách đi theo nhóm",
            "Vì sắp hết ca, nên ghi vào sổ bàn giao",
            "Vì khách chưa đưa phiếu sức khoẻ cho Hoàng xem",
          ],
          correct: 1,
          explanation:
            "'Hoang's shift ends at ten, so he does not start a new job. He writes the request in the handover note and gives it to Lan by name.'",
        },
        {
          q: "Trước khi về, Hoàng làm gì?",
          options: [
            "Đóng cửa phòng xông hơi rồi về ngay",
            "Gọi cho từng khách để cảm ơn họ",
            "Báo lại buổi tối cho Quản lý trực",
          ],
          correct: 2,
          explanation: "'Before he goes home, he tells the Duty Manager about the evening.'",
        },
      ],
    ),
    game: [
      game(
        "My head is spinning in this steam room, but I paid for thirty minutes.",
        "I will help you out now, sir. Please sit in the cool area and sip some water.",
        "Then just stay for five more minutes, sir, but drink some water and come out if it get worse.",
        "Then just stay for five more minutes, sir, but drink some water and come out if it gets worse.",
        undefined,
        "Câu thứ hai sai hoà hợp: 'it' → 'gets', có -s. Cả câu thứ hai lẫn câu thứ ba đều để khách đang choáng ở lại trong nhiệt thêm năm phút — trái luật an toàn, dù khách đã trả tiền. Câu đúng đưa khách ra ngay và cho nghỉ ở khu vực mát.",
      ),
      game(
        "It is five to ten. A guest wants to plan a spa morning for her ten friends.",
        "Please put it in the handover note for Lan by name, and tell the guest that Lan will call her tomorrow by eleven.",
        "Please put it in the handover note for Lan by name, and tell the guest that Lan call her tomorrow by eleven.",
        "Just start the whole plan yourself now. It only takes an hour.",
        "colleague",
        "Câu thứ hai thiếu 'will': hứa việc sắp làm phải là 'Lan will call'. Câu thứ ba tự mở một việc lớn ở phút cuối ca và bỏ qua sổ bàn giao — dễ bỏ dở, và ca sau không biết gì. Câu đúng ghi lại, giao đích danh cho Lan, và cho khách một mốc giờ.",
      ),
    ],
  },
);

export const week: AuthoredWeek = {
  title: {
    en: "Final Assessment: A Full Shift",
    vi: "Đánh giá cuối khoá: một ca làm việc trọn vẹn",
  },
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: xử lý trọn một ca ở spa, trộn mọi chức năng của phase — tư vấn dựa trên phiếu sức khoẻ và lời khách, kể ngắn về liệu trình mà không hứa chữa bệnh; xử lý hoá đơn sai, phiếu quá hạn, phí huỷ, tiền giặt khô đúng thẩm quyền (giám sát sửa hoá đơn, quản lý quyết miễn phí và bồi thường); lên kế hoạch kín đáo cho dịp kỷ niệm, hỏi dị ứng phấn hoa trước, không xác nhận khách có ở spa; xử lý khách choáng váng, môi sưng và sét theo thứ tự 'nguy hiểm trước', rồi bàn giao đích danh vào cuối ca.",
};
