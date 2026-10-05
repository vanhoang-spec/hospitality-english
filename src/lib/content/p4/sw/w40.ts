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
  "Welcome back, sir. As a returning guest, your preferences are on file, but please fill in a new health form first.";
const t1b =
  "Thank you for telling me, sir. Please add the medication to the form, and I will check with my supervisor first.";
const t1c =
  "I cannot say yet, sir, but based on her answer, the therapist will choose the right pressure for you.";

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
        "Chào đón khách quen, nói sở thích vẫn trong hồ sơ — nhưng phiếu sức khoẻ thì làm mới trước khi làm gì khác.",
      ),
      alsoAccept: [
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
      ],
    }),
    {
      ...sp(
        "Will the supervisor say no to my massage?",
        t1c,
        "Không đoán thay giám sát. Nói điều chắc chắn: kỹ thuật viên sẽ chọn lực ấn dựa trên câu trả lời ('based on').",
        undefined,
        undefined,
        t1b,
      ),
      alsoAccept: [
        "I am not sure yet, sir, but based on her answer, the therapist will choose the right pressure for you.",
      ],
    },
    sp(
      "What is special about your signature ritual?",
      "Our signature ritual starts with a herbal bath, and then the therapist gives you a full body massage.",
      "Kể hai bước theo thứ tự bằng ', and then' — câu chuyện ngắn, đúng sự thật, không hứa chữa bệnh.",
    ),
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
      ],
    }),
    {
      ...sp(
        "I am allergic to nuts. Which oil will you use on me?",
        "Thank you, madam. I will check the label first, and the therapist will use a nut-free oil.",
        "Dị ứng: không trả lời theo trí nhớ. Kiểm tra nhãn trước, rồi nói loại dầu sẽ dùng.",
      ),
      alsoAccept: [
        "Thank you for telling me, madam. I will check the label first, and the therapist will use a nut-free oil.",
      ],
    },
    sp(
      "My ten o'clock guest wrote 'sore lower back' on her form. What do you suggest?",
      "Based on her form, please use light pressure on her lower back and check with her after five minutes.",
      "Nói với đồng nghiệp — không dùng sir hay madam. Gợi ý dựa trên phiếu, kèm một mốc kiểm tra lại lực ấn.",
      "colleague",
    ),
  ],
  reading: read(
    `The spa opens at nine, and Ngan is at the desk. Her first guest is Mr Hart, a returning guest from last spring. His preferences are on file, but Ngan still gives him a new health form. On the form, he writes that he has started a new medication for his heart. Ngan thanks him and checks with her supervisor before anything else. The supervisor reads the form and chooses a gentle massage with light pressure, and no hot stones. At ten, Ms Diaz asks about the signature ritual. Ngan tells the story in two parts: a herbal bath, and then a full body massage. Ms Diaz loves the idea, and then she says she is pregnant. Ngan congratulates her, explains that the ritual has a hot herbal bath, and checks with her manager first. The manager suggests a prenatal massage instead. At eleven, a guest says she is allergic to nuts. Ngan checks the oil label before the treatment, and the therapist uses a nut-free oil.`,
    [
      {
        q: "Ông Hart có phải điền phiếu sức khoẻ mới không?",
        options: [
          "Không, vì sở thích của ông đã có trong hồ sơ",
          "Có, dù ông là khách quen",
          "Chỉ khi ông muốn đổi sang liệu trình khác",
        ],
        correct: 1,
        explanation:
          "'His preferences are on file, but Ngan still gives him a new health form' — sở thích dùng lại được, phiếu sức khoẻ thì làm mới mỗi lần.",
      },
      {
        q: "Ai chọn liệu trình cho ông Hart sau khi ông ghi thuốc tim mạch?",
        options: [
          "Giám sát",
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
          "Vì bà mang thai, mà nghi thức có bồn nóng",
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
      "Yes, please, sir. We check the form at every visit, because health can change.",
      "Yes, please, sir. We checks the form at every visit, because health can change.",
      "No, sir. You look very well today, so we can use last year's form.",
      undefined,
      "Câu thứ hai sai hoà hợp: chủ ngữ 'We' → 'check', không thêm -s. Câu thứ ba đoán sức khoẻ qua vẻ ngoài và bỏ một bước an toàn. Câu đúng giữ phiếu mới và nói lý do.",
    ),
    game(
      "I am pregnant. Is the signature ritual safe for me?",
      "Thank you for telling me, madam. The ritual has a hot herbal bath, so I will check with my manager first.",
      "Thank you, madam. The ritual have a hot herbal bath, so I will check with my manager first.",
      "Yes, madam. The herbs are all natural, so the ritual is safe for everyone.",
      undefined,
      "Câu thứ hai sai hoà hợp: 'The ritual' số ít → 'has'. Câu thứ ba tự hứa an toàn — thảo dược tự nhiên không có nghĩa là bồn ngâm nóng hợp với người mang thai, và quyết định là của quản lý. Câu đúng nói lý do rồi hỏi quản lý.",
    ),
  ],
});

// ── Lesson 2 — Midday: bills, vouchers and fees ────────────────────────
const t2a =
  "I am sorry about this, madam. May I see the bill, so I can check the treatment schedule?";
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
          "I am sorry about this, madam. Could I see the bill, so I can check the treatment schedule?",
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
        ],
      }),
      risk({
        ...sp(
          "I cancelled one hour before. Waive the fee, or I will write a bad review.",
          "I understand, sir. I cannot waive the fee, but I will ask my manager this afternoon.",
          "Khách doạ đánh giá xấu không đổi thẩm quyền: miễn phí là việc của quản lý. Giữ giọng bình thản, hứa việc của bạn kèm mốc giờ.",
          undefined,
          ["waive", "fee", "ask", "manager"],
        ),
        alsoAccept: [
          "I understand, sir. I am not able to waive the fee, but I will ask my manager this afternoon.",
          "I understand, sir. I cannot waive the fee myself, but I will ask my manager this afternoon.",
        ],
      }),
      sp(
        "Can you take my Friday evening shift? I have a family dinner.",
        "I can, in exchange for your Sunday morning, but we need the supervisor's approval first.",
        "Nói với đồng nghiệp — không dùng sir hay madam. Đồng ý có điều kiện, và nhắc bước giám sát duyệt.",
        "colleague",
      ),
      {
        ...sp(
          "The membership is in my husband's name. Can I use it today?",
          "I am sorry, madam. The membership is non-transferable, but I can ask my manager about a day pass.",
          "Nói đúng điều khoản thẻ, rồi đưa một cách khác — ngoại lệ thì quản lý quyết.",
        ),
        alsoAccept: [
          "I am sorry, madam. The membership is non-transferable, but I will ask my manager about a day pass.",
        ],
      },
    ],
    reading: read(
      `At noon, the spa desk is busy with money questions. First, Mrs Lopez says she had one facial but was charged for two. Quang says sorry, asks to see the bill and checks the treatment schedule. It is an overcharge, so his supervisor corrects it, and Quang brings Mrs Lopez the new bill. He thanks her for telling the spa. Next, a guest shows a voucher with an expiry date from last week. Quang does not accept it himself. He asks his supervisor, who accepts it this one time. Then a guest who cancelled one hour before his massage asks Quang to waive the fee. He says he will write a bad review. Quang stays polite and patient, and he says only the manager can waive the fee. He asks her that afternoon. Finally, his colleague Nam asks him to take his Friday evening shift. Quang agrees in exchange for Nam's Sunday morning, and they ask the supervisor for approval together.`,
      [
        {
          q: "Ai sửa hoá đơn của bà Lopez?",
          options: [
            "Quang, ngay tại quầy",
            "Giám sát của Quang",
            "Bộ phận kế toán, vào ngày hôm sau",
          ],
          correct: 1,
          explanation:
            "'It is an overcharge, so his supervisor corrects it, and Quang brings Mrs Lopez the new bill.'",
        },
        {
          q: "Khi khách doạ viết đánh giá xấu, Quang làm gì?",
          options: [
            "Giữ lịch sự, nói chỉ quản lý được miễn phí",
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
        "Waive the fee, or I will write a bad review online.",
        "I understand, sir. I cannot waive the fee, but I will ask my manager today.",
        "I understand, sir. I cannot waive the fee, but I will asking my manager today.",
        "All right, sir, I will waive it now. Please just do not write that review.",
        undefined,
        "Câu thứ hai sai dạng: sau 'will' là động từ nguyên mẫu 'ask'. Câu thứ ba tự miễn phí vì sợ một lời doạ — vượt thẩm quyền, và dạy khách rằng doạ là có tác dụng. Câu đúng giữ thẩm quyền, hứa việc của mình.",
      ),
    ],
  },
);

// ── Lesson 3 — Afternoon: an anniversary to plan ──────────────────────
const t3a =
  "Congratulations, sir. Since it is your anniversary, I suggest a couple's massage at six and rose petals in your room afterwards.";
const t3b =
  "The highlight is a herbal bath for two, and then champagne in the suite after the heat.";
const t3c = "Of course, sir. We will be discreet, and nobody will sing or bring a cake.";

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
          "Điểm nổi bật ('highlight') để cuối — và sâm panh đi SAU nhiệt, đúng luật cũ.",
          undefined,
          undefined,
          t3a,
        ),
        alsoAccept: [
          "The highlight is a herbal bath for two, and then champagne in the suite after the bath.",
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
          "Of course, sir. We will be discreet, and nobody will sing or bring in a cake.",
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
        ],
      }),
      sp(
        "My friend Anna is staying with you. Is she in the spa right now? I want to surprise her.",
        "I am sorry, madam. I cannot say who is in the spa, but you can leave a message at reception.",
        "Không xác nhận ai có ở spa, kể cả để làm quà bất ngờ. Từ chối ngắn, rồi đưa một cách khác.",
      ),
      sp(
        "Housekeeping is asking when the anniversary couple will be back in their room.",
        "They finish at half past seven. Please ask Housekeeping to have the rose petals ready by then.",
        "Nói với đồng nghiệp — không dùng sir hay madam. Một giờ cụ thể, và việc cần xong trước giờ đó.",
        "colleague",
      ),
      sp(
        "What is planned for the anniversary couple?",
        "A couple's massage at six, a herbal bath for two, and champagne after the heat. We are keeping it discreet.",
        "Báo cáo cho quản lý — không dùng sir hay madam: kế hoạch theo thứ tự, và mong muốn của khách.",
        "manager",
      ),
    ],
    reading: read(
      `On Thursday afternoon, Mr Ortiz comes to the spa desk. It is his tenth wedding anniversary on Friday, and he wants to plan a surprise. Hien presents a short plan in three parts. First, she repeats what he wants: a quiet evening for two. Then she gives the plan: a couple's massage at six, a herbal bath for two, and champagne in the suite after the heat. Finally, she gives the next step: Housekeeping will put rose petals in their room. Mr Ortiz also wants lilies in the treatment room. Hien first asks if his wife has an allergy to pollen. He remembers that she has hay fever, so they choose soft music and a card instead of flowers. He adds that his wife does not like a fuss, and Hien promises to be discreet. Later, a woman calls and asks if her friend is in the spa. Hien does not say yes or no. She offers to take a message at reception.`,
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
            "'Then she gives the plan: a couple's massage at six, a herbal bath for two, and champagne in the suite after the heat.'",
        },
        {
          q: "Vì sao cuối cùng không có hoa ly trong phòng?",
          options: [
            "Vì vợ ông Ortiz bị dị ứng phấn hoa",
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
        "Of course, sir. Flowers are natural, so they are fine for every guest.",
        undefined,
        "Câu thứ hai sai giới từ: 'allergy to', không phải 'allergy with'. Câu thứ ba cho rằng tự nhiên là an toàn — phấn hoa là nguyên nhân dị ứng rất phổ biến. Câu đúng khen ý tưởng rồi hỏi dị ứng trước.",
      ),
      game(
        "Is my friend Anna in the spa now? I want to surprise her.",
        "I am sorry, madam. I cannot say who is in the spa today.",
        "I am sorry, madam. I cannot saying who is in the spa today.",
        "Yes, madam. She is in the steam room until four, so you can wait for her here.",
        undefined,
        "Câu thứ hai sai dạng: sau 'cannot' là động từ nguyên mẫu 'say'. Câu thứ ba tiết lộ khách đang ở đâu và tới mấy giờ cho một người gọi điện — vi phạm riêng tư và an toàn của khách. Câu đúng không xác nhận gì.",
      ),
    ],
  },
);

// ── Lesson 4 — Evening: danger first, then the handover ────────────────
const t4a = "Please walk out of the sauna with me now, madam, and rest in the cool area.";
const t4b = "Of course, madam. Please sip it slowly, and the nurse will be here in three minutes.";
const t4c =
  "Please rest here until the nurse arrives, madam. The sauna can wait until she has seen you.";

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
        "Nurse here, three minute.",
        "The nurse will be here in three minutes, sir.",
        "Một mốc giờ: 'in three minutes' = ba phút NỮA. 'after three minutes' là lỗi dịch thẳng 'sau ba phút'.",
        "The nurse will be here after three minutes, sir.",
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
        ],
      }),
      {
        ...sp(
          "Can I have some cold water, please?",
          t4b,
          "Một việc cho khách (uống từng ngụm nhỏ) và một mốc giờ có thật (y tá, ba phút).",
          undefined,
          undefined,
          t4a,
        ),
        alsoAccept: [
          "Of course, madam. Please sip it slowly. The nurse will be here in three minutes.",
        ],
      },
      {
        ...sp(
          "I feel better now. I will go back in for five more minutes.",
          t4c,
          "Khách thấy đỡ vẫn chưa quay lại chỗ nóng: chờ y tá xem trước. Nói nhẹ nhàng, không tranh luận.",
          undefined,
          undefined,
          t4b,
        ),
        alsoAccept: [
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
        ],
      }),
      sp(
        "A guest in the sauna says she is light-headed, and the phone is ringing.",
        "Danger first. Please walk the light-headed guest to the cool area, and I will call the nurse.",
        "Nói với đồng nghiệp — không dùng sir hay madam. Xếp thứ tự bằng hai chữ ('Danger first'), rồi chia việc: đồng nghiệp đưa khách ra, bạn gọi y tá.",
        "colleague",
      ),
      sp(
        "It is a quarter to ten. A guest wants to book a facial for tomorrow. Shall I do it?",
        "Please write it in the handover note and give it to Lan by name. She starts at ten.",
        "Nói với đồng nghiệp — không dùng sir hay madam. Mười lăm phút cuối ca: không mở việc mới, ghi lại và giao đích danh.",
        "colleague",
      ),
      sp(
        "Is there anything I should know before you go home?",
        "Yes. A guest was light-headed in the sauna, so we called the nurse, and it is all in the handover note.",
        "Báo cáo cho Quản lý trực trước khi về — không dùng sir hay madam: việc quan trọng nhất, và nó đã được ghi ở đâu.",
        "manager",
      ),
    ],
    reading: read(
      `From eight to ten, Hoang looks after the wet area. At half past eight, a guest in the sauna says she feels light-headed. Hoang walks her out of the sauna and takes her to the cool area. He asks her to sip some water slowly, and his colleague calls the hotel nurse, who arrives in three minutes. The guest feels better and wants to go back into the sauna. Hoang asks her to rest until the nurse has seen her. At nine, a thunderstorm starts, and there is lightning over the outdoor pool. One guest wants to finish his swim. Hoang asks him to step out of the pool straight away, and he closes off the outdoor pool. At a quarter to ten, a guest asks to book a facial for tomorrow. Hoang's shift ends at ten, so he does not start a new job. He writes the request in the handover note and gives it to Lan by name. Before he goes home, he tells the Duty Manager about the evening.`,
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
          q: "Vì sao Hoàng không tự đặt lịch làm mặt lúc mười giờ kém mười lăm?",
          options: [
            "Vì lịch làm mặt ngày mai đã kín",
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
        "I feel light-headed, but I want to finish my sauna.",
        "Please come out of the sauna with me now, madam, and rest in the cool area.",
        "Please come out the sauna with me now, madam, and rest in the cool area.",
        "Just five more minutes, madam, but drink some water and come out if it gets worse.",
        undefined,
        "Câu thứ hai thiếu 'of': 'come out of the sauna'. Câu thứ ba để khách đang choáng ở lại trong nhiệt thêm năm phút — trái luật an toàn. Câu đúng đưa khách ra ngay và cho nghỉ ở khu vực mát.",
      ),
      game(
        "It is ten to ten. A guest wants to book a facial for tomorrow.",
        "Please write it in the handover note and give it to Lan by name. She starts at ten.",
        "Please write it in the handover note and gives it to Lan by name.",
        "Just book it quickly yourself, and do not worry about the note.",
        "colleague",
        "Câu thứ hai sai dạng: 'and' nối hai động từ mệnh lệnh cùng dạng, 'write… give'. Câu thứ ba mở việc mới ở phút cuối ca và bỏ qua sổ bàn giao — ca sau không biết gì. Câu đúng ghi lại, giao đích danh và nói Lan vào ca lúc nào.",
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
    "Nói được: xử lý trọn một ca ở spa, trộn mọi chức năng của phase — tư vấn dựa trên phiếu sức khoẻ và lời khách, kể ngắn về liệu trình mà không hứa chữa bệnh; xử lý hoá đơn sai, phiếu quá hạn, phí huỷ đúng thẩm quyền (giám sát sửa hoá đơn, quản lý quyết miễn phí); lên kế hoạch kín đáo cho dịp kỷ niệm, hỏi dị ứng phấn hoa trước, không xác nhận khách có ở spa; xử lý khách choáng váng và sét theo thứ tự 'nguy hiểm trước', rồi bàn giao đích danh vào cuối ca.",
};
