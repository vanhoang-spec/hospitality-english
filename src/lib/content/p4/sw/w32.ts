// SW week 32 — Personalised consultation ("Based on…", "Since you
// mentioned…"). Hand-authored Phase 4, see ../kit.ts.
//
// Personal advice is built on what the guest SAID and on the health form,
// in that order, and it never skips the form: a returning guest's
// preferences are on file, but the health form is checked at every visit,
// because health changes (Phase 3 taught the same reflex). Pregnancy goes to
// the manager, medication to the supervisor, a recent operation needs a
// doctor's note, and another guest's form is never read out — not even to a
// husband. Nothing on a booking is changed without asking the guest first.
import type { AuthoredWeek } from "../kit";
import { cardsFor, lessonsFor, risk } from "../kit";
import { game, g, read, sp } from "../../phase0";

const c = cardsFor("SW");
const L = lessonsFor("SW");

// ── Lesson 1 — Based on what you told me ───────────────────────────────
const t1a =
  "Welcome, madam. Many guests with jet lag find a gentle massage refreshing, and we can personalise it for you.";
const t1b = "Where do you feel the most tension, and do you prefer light or firm pressure?";
const t1c = "Based on what you told me, I recommend a light massage on your neck and shoulders.";

const lesson1 = L(32, 1, "Based on What You Told Me", "Tư vấn dựa trên lời khách", {
  vocabulary: [
    c("Based on", "Based on your form, I recommend light pressure today.", [
      "/ˈbeɪst ɒn/",
      "Dựa trên",
      "📋",
    ]),
    c("Personalise", "We personalise every massage after the consultation.", [
      "/ˈpɜːsənəlaɪz/",
      "Cá nhân hoá, làm riêng cho từng khách",
      "🎯",
    ]),
    c("Jet lag", "After a long flight, many guests have jet lag.", [
      "/ˈdʒet læɡ/",
      "Mệt mỏi do lệch múi giờ",
      "✈️",
    ]),
    c("Tension", "Most of the tension is in your neck and shoulders.", [
      "/ˈtenʃn/",
      "Sự căng cứng (ở cơ)",
      "😣",
    ]),
  ],
  grammar: [
    g(
      "You say neck, so neck massage.",
      "Based on what you told me, I recommend a massage on your neck.",
      "'Based on' + danh từ hoặc 'what you told me' — mở lời tư vấn cho khách thấy bạn đã nghe. Luôn có -d: 'Based', không phải 'Base'.",
      "Base on what you told me, I recommend a massage on your neck.",
    ),
    g(
      "Where tension? Light or strong?",
      "Where do you feel the most tension, and do you prefer light or firm pressure?",
      "Hai câu hỏi nối bằng ', and'; mỗi câu hỏi có trợ động từ 'do' đứng trước chủ ngữ. Người Việt hay bỏ 'do': 'Where you feel…'.",
      "Where you feel the most tension, and do you prefer light or firm pressure?",
    ),
  ],
  speaking: [
    {
      ...sp(
        "I flew in from London this morning, and I feel terrible.",
        t1a,
        "Chào khách, kể điều nhiều khách bị lệch múi giờ cảm thấy, rồi hứa làm riêng cho khách — chưa chọn thay khách.",
      ),
      alsoAccept: [
        "Welcome, madam. Many guests with jet lag find a gentle massage refreshing, and we can personalise it.",
      ],
    },
    sp(
      "What do you need to know?",
      t1b,
      "Hai câu hỏi tư vấn trong một lượt: chỗ căng cứng nhất, và lực ấn khách thích.",
      undefined,
      undefined,
      t1a,
    ),
    {
      ...sp(
        "My neck and shoulders, and light pressure, please.",
        t1c,
        "Nhắc lại đúng điều khách vừa nói bằng 'Based on', rồi mới gợi ý.",
        undefined,
        undefined,
        t1b,
      ),
      alsoAccept: [
        "Based on what you told me, I suggest a light massage on your neck and shoulders.",
      ],
    },
    sp(
      "I filled in the form already. Do you need anything else?",
      "Thank you, sir. Based on your form, I recommend the deep tissue massage, and we will avoid the sensitive area you noted.",
      "Gợi ý dựa trên phiếu: chọn liệu trình, và nói rõ sẽ tránh vùng khách đã ghi.",
    ),
    risk({
      ...sp(
        "I should say that I am pregnant. Does that change your advice?",
        "Thank you, madam. Based on that, I will check with my manager first.",
        "Khách mang thai: lời khuyên dừng lại ở đây. Bạn không tự chọn liệu trình — hỏi quản lý trước.",
        undefined,
        ["based", "check", "manager", "first"],
      ),
      alsoAccept: [
        "Thank you, madam. Based on that, I will ask my manager first.",
        "Thank you for telling me, madam. Based on that, I will check with my manager first.",
      ],
    }),
    sp(
      "Can you make the massage a bit shorter? I have dinner at eight.",
      "Of course, madam. We can personalise the length, so you finish well before eight.",
      "Làm riêng theo lịch của khách: đồng ý, rồi nói kết quả bằng ', so'.",
    ),
  ],
  reading: read(
    `Mr Park arrives at the spa at eleven in the morning. He flew in from Seoul overnight, and he has bad jet lag. Thu, the receptionist, does not start with the menu. She asks two questions first: where he feels the most tension, and whether he prefers light or firm pressure. Mr Park says his neck is very stiff, and he likes firm pressure. Then Thu reads his health declaration form. On the form, he wrote that his right shoulder is a sensitive area after an old injury. Based on his answers and his form, Thu recommends the deep tissue massage with firm pressure on his neck. She also says the therapist will avoid the right shoulder. Mr Park asks for a shorter massage, because he has a meeting at three. Thu personalises the length, and she tells him the new price before she changes the booking. He leaves the spa on time and in a much better mood.`,
    [
      {
        q: "Thu bắt đầu buổi tư vấn bằng việc gì?",
        options: [
          "Đưa thực đơn để khách tự chọn liệu trình",
          "Giới thiệu liệu trình đặc trưng của spa",
          "Hỏi hai câu: chỗ căng cứng nhất và lực ấn khách thích",
        ],
        correct: 2,
        explanation:
          "'She asks two questions first: where he feels the most tension, and whether he prefers light or firm pressure.'",
      },
      {
        q: "Vì sao kỹ thuật viên sẽ tránh vai phải của khách?",
        options: [
          "Vì khách nói vai phải không bị căng cứng",
          "Vì khách ghi trên phiếu rằng vai phải nhạy cảm sau chấn thương cũ",
          "Vì khách chỉ đặt massage cổ trong buổi đó",
        ],
        correct: 1,
        explanation:
          "'he wrote that his right shoulder is a sensitive area after an old injury' — lời khuyên dựa trên cả lời khách lẫn phiếu sức khoẻ.",
      },
      {
        q: "Thu làm gì trước khi rút ngắn buổi massage?",
        options: [
          "Hỏi quản lý xem có được rút ngắn không",
          "Báo khách giá mới trước khi đổi lịch đặt",
          "Đổi lịch đặt trước rồi gửi giá mới qua email",
        ],
        correct: 1,
        explanation:
          "'she tells him the new price before she changes the booking' — đổi lịch đặt là đổi tiền, nên khách phải biết trước.",
      },
    ],
  ),
  game: [
    game(
      "I have terrible jet lag. What do you suggest?",
      "Based on what you told me, I suggest a gentle massage with light pressure.",
      "Base on what you told me, I suggest a gentle massage with light pressure.",
      "Everyone loves our deep tissue massage, sir, so I will book that one for you right away.",
      undefined,
      "Câu thứ hai sai hình thái: phải là 'Based on', có -d. Câu thứ ba đúng ngữ pháp nhưng bỏ qua điều khách vừa nói và tự đặt lịch khi khách chưa đồng ý. Câu đúng gợi ý dựa trên nhu cầu của chính khách.",
    ),
    game(
      "I am pregnant. Can I have the hot stone massage?",
      "Thank you, madam. The hot stone is not suitable, and I will check with my manager first.",
      "Of course, madam. We simply uses cooler stones for pregnant guests, so it is completely safe for you.",
      "Of course, madam. We simply use cooler stones for pregnant guests, so it is completely safe for you.",
      undefined,
      "Câu thứ hai sai hoà hợp: chủ ngữ 'We' → 'use', không thêm -s. Cả câu thứ hai lẫn câu thứ ba đều tự nghĩ ra một cách làm và hứa 'hoàn toàn an toàn' — đá nóng là chống chỉ định khi mang thai, và quản lý mới là người quyết. Câu đúng nói rõ không phù hợp rồi hỏi quản lý.",
    ),
  ],
});

// ── Lesson 2 — Since you mentioned… ────────────────────────────────────
const t2a = "Well done, sir. For sore muscles, I recommend the deep tissue massage on your legs.";
const t2b = "It can feel strong, sir, but you can ask me to use a lighter pressure at any time.";
const t2c =
  "Since you mentioned the race, I suggest a warm foot soak tonight, and please drink plenty of water.";

const lesson2 = L(32, 2, "Since You Mentioned…", "Nhắc lại điều khách đã nói", {
  vocabulary: [
    c("Since you mentioned", "Since you mentioned your back, we can start with the shoulders.", [
      "/sɪns juː ˈmenʃənd/",
      "Vì quý khách có nhắc tới… (nối lại lời khách)",
      "💬",
    ]),
    c("Posture", "Sitting at a desk all day can affect your posture.", [
      "/ˈpɒstʃə/",
      "Tư thế (ngồi, đứng)",
      "🪑",
    ]),
    c("Sore", "My legs are sore after the long walk.", ["/sɔː/", "Đau nhức", "🤕"]),
    c("Muscle", "The warmth helps tight muscles relax.", ["/ˈmʌsl/", "Cơ, bắp thịt", "💪"]),
  ],
  grammar: [
    g(
      "You said race before. Foot soak.",
      "Since you mentioned the race, I suggest a warm foot soak tonight.",
      "'Since you mentioned…' nối lại điều khách nói TRƯỚC đó, nên động từ ở quá khứ: 'mentioned'. Rồi mới đến lời gợi ý.",
      "Since you mention the race, I suggest a warm foot soak tonight.",
    ),
    g(
      "Your neck bad because computer.",
      "Since you work at a desk, we can focus on your neck and shoulders.",
      "'Since' ở đây nghĩa là 'vì' — đi với một mệnh đề đủ chủ ngữ và động từ ('you work'). Sau 'can' là động từ nguyên mẫu 'focus'.",
      "Since you work at a desk, we can focusing on your neck and shoulders.",
    ),
  ],
  speaking: [
    sp(
      "I ran a half marathon yesterday, and my legs are very sore.",
      t2a,
      "Khen một câu ngắn, rồi gợi ý đúng chỗ khách đau nhức.",
    ),
    sp(
      "Will it hurt?",
      t2b,
      "Nói thật là có thể hơi mạnh, ', but' khách luôn có quyền xin nhẹ hơn.",
      undefined,
      undefined,
      t2a,
    ),
    {
      ...sp(
        "Good. Is there anything I should do afterwards?",
        t2c,
        "Nối lại điều khách nói lúc đầu bằng 'Since you mentioned', rồi khuyên hai việc đơn giản.",
        undefined,
        undefined,
        t2b,
      ),
      alsoAccept: [
        "Since you mentioned the race, I recommend a warm foot soak tonight, and please drink plenty of water.",
      ],
    },
    {
      ...sp(
        "I work at a desk all day, and my neck is always stiff.",
        "Since you mentioned your desk, we can focus on your neck, and I can show you a few posture tips.",
        "Nối lại chi tiết khách nói ('desk'), chọn vùng tập trung, rồi thêm một việc khách tự làm được.",
      ),
      alsoAccept: [
        "Since you work at a desk, we can focus on your neck, and I can show you a few posture tips.",
      ],
    },
    sp(
      "My shoulders feel tight, but I really hate strong pressure.",
      "Then I recommend the hot stone massage, madam. The warmth relaxes every tight muscle without strong pressure.",
      "Khách ghét lực mạnh: chọn liệu trình dùng hơi ấm thay cho lực tay, và nói lý do.",
    ),
    sp(
      "The guest in room three says her lower back is sore. What should I use?",
      "Please check her health declaration form first, and then use light pressure on her lower back.",
      "Nói với đồng nghiệp — không dùng sir hay madam. Phiếu sức khoẻ trước, rồi mới đến lực ấn.",
      "colleague",
    ),
  ],
  reading: read(
    `Two guests come to the spa on the same afternoon, and Lan uses one simple habit with both of them. She listens first, and later she uses their own words. The first guest is Mr Evans. He ran a half marathon yesterday, and his legs are sore. Lan recommends the deep tissue massage on his legs, and she tells him he can ask for lighter pressure at any time. After the massage, she uses his own words again. Since he mentioned the race, she suggests a warm foot soak tonight. Mr Evans laughs, because he forgot he told her. The second guest is a software engineer. He works at a desk all day, and his neck is always stiff. Lan suggests the hot stone massage, because he does not like strong pressure. At the end, she shows him two posture tips for his desk. Both guests write the same thing on their comment cards: the advice felt personal.`,
    [
      {
        q: "Thói quen của Lan với cả hai vị khách là gì?",
        options: [
          "Giới thiệu liệu trình đắt nhất trước",
          "Nghe khách trước, rồi khi tư vấn thì dùng lại chính lời của khách",
          "Đưa phiếu góp ý cho khách ngay khi khách đến",
        ],
        correct: 1,
        explanation:
          "'She listens first, and later she uses their own words' — đó chính là tác dụng của 'Since you mentioned…'.",
      },
      {
        q: "Vì sao Lan gợi ý massage đá nóng cho vị khách thứ hai?",
        options: [
          "Vì đá nóng là liệu trình mới của spa",
          "Vì khách vừa chạy bán marathon hôm qua",
          "Vì khách không thích lực ấn mạnh",
        ],
        correct: 2,
        explanation:
          "'Lan suggests the hot stone massage, because he does not like strong pressure.'",
      },
      {
        q: "Hai vị khách cùng viết gì trên phiếu góp ý?",
        options: [
          "Lời khuyên giống như dành riêng cho mình",
          "Giá liệu trình hợp lý so với khách sạn khác",
          "Lực ấn quá mạnh so với mong muốn",
        ],
        correct: 0,
        explanation:
          "'Both guests write the same thing on their comment cards: the advice felt personal.'",
      },
    ],
  ),
  game: [
    game(
      "I sit at a computer all day. My neck is killing me.",
      "Since you mentioned your computer, we can focus on your neck and shoulders.",
      "Since you mention your computer, we can focus on your neck and shoulders.",
      "That is because of your bad posture, sir. You should really change the chair in your office.",
      undefined,
      "Câu thứ hai sai thì: lời khách đã nói xong nên là 'mentioned'. Câu thứ ba đúng ngữ pháp nhưng trách khách và đưa lời khuyên ngoài việc của spa. Câu đúng dùng lại lời khách để chọn vùng tập trung.",
    ),
    game(
      "My guest says her legs are sore after running. What do you suggest?",
      "Check her health form first, and then use firm pressure only if she says she wants it.",
      "Just use your strongest pressure. Runners always wants it hard.",
      "Just use your strongest pressure. Runners always want it hard.",
      "colleague",
      "Câu thứ hai sai hoà hợp: 'Runners' số nhiều → 'want', không thêm -s. Cả câu thứ hai lẫn câu thứ ba đều đoán thay khách và bỏ qua phiếu sức khoẻ. Câu đúng: phiếu trước, lực ấn theo ý khách.",
    ),
  ],
});

// ── Lesson 3 — Returning guests: ask again ─────────────────────────────
const t3a =
  "Welcome back, madam. Your preferences are on file, but we check your health form at every visit.";
const t3b = "Yes, please, madam. Health can change in a year, so the form must be up to date.";

const lesson3 = L(32, 3, "Returning Guests: Ask Again", "Khách quen: vẫn hỏi lại", {
  vocabulary: [
    c("Returning guest", "A returning guest still fills in a new health form.", [
      "/rɪˈtɜːnɪŋ ɡest/",
      "Khách quay lại, khách quen",
      "🔁",
    ]),
    c("On file", "Your favourite oil is on file from your last visit.", [
      "/ɒn ˈfaɪl/",
      "Có trong hồ sơ",
      "🗂️",
    ]),
    c("Medication", "Please write any medication on the health form.", [
      "/ˌmedɪˈkeɪʃn/",
      "Thuốc (khách đang dùng)",
      "💊",
    ]),
    c("Recent", "After a recent operation, we need a doctor's note.", [
      "/ˈriːsnt/",
      "Gần đây, mới xảy ra",
      "🗓️",
    ]),
    c("Up to date", "The health form must be up to date before every treatment.", [
      "/ˌʌp tə ˈdeɪt/",
      "Được cập nhật mới nhất",
      "🔄",
    ]),
  ],
  grammar: [
    g(
      "Same as last time? Nothing change?",
      "Has anything changed since your last visit, madam?",
      "Hỏi về khoảng thời gian từ lần trước đến nay dùng hiện tại hoàn thành: 'Has anything changed'. Sau 'has' là phân từ hai, có -ed.",
      "Has anything change since your last visit, madam?",
    ),
    g(
      "You take medicine?",
      "Are you taking any medication at the moment, sir?",
      "Hỏi về việc đang diễn ra quanh thời điểm này: 'Are you taking…?' — 'are' + V-ing. Người Việt hay giữ 'take' nguyên mẫu sau 'are'.",
      "Are you take any medication at the moment, sir?",
    ),
  ],
  speaking: [
    sp(
      "Hello again! I was here last year. Do you still have my details?",
      t3a,
      "Chào đón khách quen, nói sở thích vẫn trong hồ sơ — ', but' phiếu sức khoẻ thì kiểm tra lại mỗi lần.",
    ),
    {
      ...sp(
        "Oh. Do I really need to fill it in again?",
        t3b,
        "Nói lý do thật: sức khoẻ thay đổi được trong một năm, nên phiếu phải mới.",
        undefined,
        undefined,
        t3a,
      ),
      alsoAccept: [
        "Yes, please, madam. Your health can change in a year, so the form must be up to date.",
      ],
    },
    sp(
      "Fine. Actually, I had an operation on my knee in March.",
      "Thank you, madam. After a recent operation, we need a doctor's note before the massage.",
      "Phẫu thuật gần đây: cần giấy bác sĩ trước khi massage — đúng quy định đã học.",
      undefined,
      undefined,
      t3b,
    ),
    risk({
      ...sp(
        "You know me, so we can skip the health form today, right?",
        "I am sorry, madam. We check the form at every visit, because health can change.",
        "Khách quen muốn bỏ phiếu sức khoẻ: không bỏ. Xin lỗi, và nói lý do bằng 'because'.",
        undefined,
        ["check", "form", "visit", "because", "health", "change"],
      ),
      alsoAccept: [
        "I am sorry, madam. We check the form at every visit, because your health can change.",
        "I am sorry, madam. We check the health form at every visit, because health can change.",
      ],
    }),
    risk({
      ...sp(
        "I take blood thinners. Is a deep tissue massage all right?",
        "Thank you, sir. Please add your medication to the health declaration form, and I will check with my supervisor first.",
        "Thuốc chống đông là chuyện an toàn: không tự trả lời. Mời khách ghi vào phiếu, rồi hỏi giám sát trước.",
        undefined,
        ["add", "medication", "form", "check", "supervisor", "first"],
      ),
      alsoAccept: [
        "Thank you for telling me, sir. Please add your medication to the health declaration form, and I will check with my supervisor first.",
        "Thank you, sir. Please write your medication on the health declaration form, and I will check with my supervisor first.",
      ],
    }),
    sp(
      "Last time I had lemongrass oil. Can I have it again, please?",
      "Of course, madam. It is on file, and I will prepare the lemongrass oil for you.",
      "Khách quen nhắc sở thích cũ: xác nhận là có trong hồ sơ, rồi làm đúng như vậy.",
    ),
    sp(
      "Mr Lee is back today. Can I use his notes from last time?",
      "Yes. For a returning guest, please read the notes, but check that the health form is up to date first.",
      "Nói với đồng nghiệp: ghi chú cũ dùng được, ', but' phiếu sức khoẻ phải là bản mới.",
      "colleague",
    ),
  ],
  reading: read(
    `Mrs Dubois is a returning guest. She had six massages here last year, and she remembers every therapist by name. When she arrives, Nga greets her warmly and tells her that her preferences are on file: lemongrass oil, light pressure and a quiet room. Then Nga gives her a new health form. Mrs Dubois is a little surprised. "You know me," she says. "Do we really need this again?" Nga explains that health can change in a year, so the form must be up to date. Mrs Dubois fills it in, and she writes something new: she had a knee operation two months ago. Because the operation is recent, Nga asks for a doctor's note before the massage. Mrs Dubois has the note on her phone, so the therapist can start on time. At the end, Mrs Dubois thanks Nga. She says the new form was a good idea, because she had forgotten to mention her knee.`,
    [
      {
        q: "Hồ sơ của bà Dubois có sẵn những gì?",
        options: [
          "Sở thích về dầu, lực ấn và phòng yên tĩnh",
          "Phiếu sức khoẻ của năm ngoái, không cần làm mới",
          "Giấy của bác sĩ về đầu gối của bà",
        ],
        correct: 0,
        explanation:
          "'her preferences are on file: lemongrass oil, light pressure and a quiet room' — sở thích có sẵn, phiếu sức khoẻ thì làm mới.",
      },
      {
        q: "Vì sao Nga xin giấy của bác sĩ?",
        options: [
          "Vì bà Dubois muốn đổi sang lực ấn mạnh hơn",
          "Vì phiếu năm ngoái đã hết hạn",
          "Vì ca mổ đầu gối mới diễn ra gần đây",
        ],
        correct: 2,
        explanation:
          "'Because the operation is recent, Nga asks for a doctor's note before the massage.'",
      },
      {
        q: "Cuối buổi, bà Dubois nghĩ gì về phiếu mới?",
        options: [
          "Phiếu mới làm bà mất thời gian vô ích",
          "Là ý hay, vì bà đã quên nhắc tới ca mổ đầu gối của mình",
          "Phiếu mới chỉ cần cho khách lần đầu tới spa",
        ],
        correct: 1,
        explanation:
          "'She says the new form was a good idea, because she had forgotten to mention her knee.'",
      },
    ],
  ),
  game: [
    game(
      "I filled in a form here three weeks ago. Can we use that one?",
      "I am afraid we need a new form today, sir. It must be up to date, even after three weeks.",
      "Of course, sir. It was only three weeks ago, so we can used your old form.",
      "Of course, sir. It was only three weeks ago, so we can use your old form.",
      undefined,
      "Câu thứ hai sai dạng: sau 'can' là động từ nguyên mẫu 'use', không phải 'used'. Cả câu thứ hai lẫn câu thứ ba đều bỏ phiếu mới vì 'mới ba tuần' — nhưng phiếu sức khoẻ được kiểm tra ở mỗi lần đến, vì sức khoẻ thay đổi bất cứ lúc nào. Câu đúng xin phiếu mới và nói lý do.",
    ),
    game(
      "I started some new tablets for my blood pressure last week.",
      "Thank you, madam. Please write the tablets on your health form, and my supervisor will look at it first.",
      "Thank you, madam. Please write the tablets on your health form, and my supervisor will looks at it first.",
      "No problem, madam. Many guests take those tablets, so we can start the hot stones now.",
      undefined,
      "Câu thứ hai sai dạng: sau 'will' là động từ nguyên mẫu 'look', không thêm -s. Câu thứ ba tự kết luận 'không sao' về thuốc huyết áp — kỹ thuật viên không tự quyết, và đá nóng có thể là chống chỉ định. Câu đúng mời khách ghi thuốc vào phiếu và để giám sát xem trước.",
    ),
  ],
});

// ── Lesson 4 — Advice for after the treatment ──────────────────────────
const t4a =
  "I am delighted, madam. Please avoid the sauna this evening, and use sunscreen if you go outside.";
const t4b = "Based on your skin type, I recommend a light cream with no perfume.";

const lesson4 = L(32, 4, "Advice for After the Treatment", "Lời khuyên sau liệu trình", {
  vocabulary: [
    c("Aftercare", "Your therapist will give you some aftercare advice.", [
      "/ˈɑːftəkeə/",
      "Chăm sóc sau liệu trình",
      "🧴",
    ]),
    c("Skin type", "Based on your skin type, we choose the cream.", [
      "/ˈskɪn taɪp/",
      "Loại da",
      "🧑",
    ]),
    c("Sunscreen", "After a facial, please use sunscreen if you go outside.", [
      "/ˈsʌnskriːn/",
      "Kem chống nắng",
      "☀️",
    ]),
    c("Permission", "With your permission, I will note it on your file.", [
      "/pəˈmɪʃn/",
      "Sự cho phép",
      "✅",
    ]),
  ],
  grammar: [
    g(
      "No sauna tonight. No sun.",
      "Please avoid using the sauna this evening, madam.",
      "Sau 'avoid' là V-ing: 'avoid using'. Người Việt hay dịch 'tránh làm gì' thành 'avoid to use'.",
      "Please avoid to use the sauna this evening, madam.",
    ),
    g(
      "I write your oil in computer, okay?",
      "With your permission, I will note your favourite oil on file.",
      "Xin phép trước khi ghi thông tin vào hồ sơ: 'With your permission, I will…'. Sau 'will' là động từ nguyên mẫu 'note'.",
      "With your permission, I will noted your favourite oil on file.",
    ),
  ],
  speaking: [
    sp(
      "My skin feels lovely after the facial. Any advice for tonight?",
      t4a,
      "Đón lời khen, rồi dặn hai việc cụ thể: tránh phòng xông hơi tối nay, và dùng kem chống nắng ('sunscreen') khi ra ngoài.",
    ),
    {
      ...sp(
        "What cream should I use at home?",
        t4b,
        "Gợi ý dựa trên loại da của khách ('Based on'), không phải sản phẩm đắt nhất.",
        undefined,
        undefined,
        t4a,
      ),
      alsoAccept: ["Based on your skin type, I suggest a light cream with no perfume."],
    },
    sp(
      "Can you write that down for me?",
      "Of course, madam. I will write your aftercare advice on a card for you.",
      "Viết lời khuyên ra thẻ — khách mang về, không phải nhớ.",
      undefined,
      undefined,
      t4b,
    ),
    {
      ...sp(
        "Could you remember that I like light pressure?",
        "Of course, sir. With your permission, I will note your preference on file.",
        "Ghi sở thích vào hồ sơ là thông tin của khách: xin phép trước bằng 'With your permission'.",
      ),
      alsoAccept: ["Of course, sir. With your permission, I will note it on file."],
    },
    sp(
      "Is there anything I should avoid after the hot stone massage?",
      "Please avoid alcohol tonight, sir. Ginger tea and plenty of water are a better choice.",
      "Lời khuyên sau đá nóng: một việc nên tránh (rượu), rồi một lựa chọn tốt hơn.",
    ),
    risk({
      ...sp(
        "What did my wife write on her health form? She will not tell me.",
        "I am sorry, sir. I cannot tell you about her health form, but you can ask her.",
        "Phiếu sức khoẻ là thông tin riêng của từng khách, kể cả với vợ chồng. Không đọc, không gợi ý — mời khách hỏi người đó.",
        undefined,
        ["tell", "health", "form", "ask"],
      ),
      alsoAccept: [
        "I am sorry, sir. I cannot tell you what is on her health form, but you can ask her.",
        "I am sorry, sir. Her health form is private, but you can ask her.",
      ],
    }),
  ],
  reading: read(
    `After her facial, Ms Ahmed sits in the relaxation area with a cup of ginger tea. Her therapist, Huong, comes to give her the aftercare advice. First, Huong says that Ms Ahmed should avoid the sauna this evening and use sunscreen outside, because her skin is sensitive after a facial. Then Ms Ahmed asks about a cream for home. Huong does not choose the most expensive cream on the shelf. Based on Ms Ahmed's skin type, she recommends a light cream with no perfume. She writes both ideas on a small aftercare card. Before Ms Ahmed leaves, Huong asks one more question. With her permission, may she note the cream and the light pressure on file? Ms Ahmed says yes. Later, Ms Ahmed's husband asks Huong what his wife wrote on her health form. Huong says she cannot tell him, but he can ask his wife. He laughs and says that is fair.`,
    [
      {
        q: "Vì sao khách nên tránh phòng xông hơi và dùng kem chống nắng tối nay?",
        options: [
          "Vì phòng xông hơi đóng cửa vào buổi tối",
          "Vì da còn nhạy cảm sau khi làm mặt",
          "Vì khách vừa uống trà gừng xong",
        ],
        correct: 1,
        explanation: "'because her skin is sensitive after a facial'.",
      },
      {
        q: "Hương chọn kem cho khách dựa vào đâu?",
        options: [
          "Giá của các loại kem trên kệ",
          "Loại kem mà quản lý muốn bán",
          "Loại da của khách",
        ],
        correct: 2,
        explanation:
          "'Based on Ms Ahmed's skin type, she recommends a light cream with no perfume.'",
      },
      {
        q: "Khi người chồng hỏi về phiếu sức khoẻ của vợ, Hương làm gì?",
        options: [
          "Nói không thể cho biết, và mời ông hỏi vợ",
          "Đọc phiếu cho ông vì hai người là vợ chồng",
          "Gọi quản lý ra để quyết có nên nói không",
        ],
        correct: 0,
        explanation:
          "'Huong says she cannot tell him, but he can ask his wife' — thông tin sức khoẻ là riêng của từng khách.",
      },
    ],
  ),
  game: [
    game(
      "What should I do after my facial tonight?",
      "Please avoid the sun and the sauna this evening, madam.",
      "Nothing special, madam. Your skin will be perfect, so you can doing anything you like.",
      "Nothing special, madam. Your skin will be perfect, so you can do anything you like.",
      undefined,
      "Câu thứ hai sai dạng: sau 'can' là động từ nguyên mẫu 'do', không phải 'doing'. Cả câu thứ hai lẫn câu thứ ba đều bỏ phần chăm sóc sau liệu trình và hứa 'da sẽ hoàn hảo'. Câu đúng cho một lời khuyên cụ thể.",
    ),
    game(
      "My mother had a facial here this morning. Did she write anything about allergies?",
      "I am sorry, madam. Her form is private, but your mother can tell you herself.",
      "I am sorry, madam. Her form is private, but your mother can tells you herself.",
      "Of course, madam. Let me check her form. She wrote that she is allergic to nuts and lavender.",
      undefined,
      "Câu thứ hai sai dạng: sau 'can' là động từ nguyên mẫu 'tell', không thêm -s. Câu thứ ba lịch sự nhưng đọc thông tin sức khoẻ của một khách cho người khác — vi phạm quyền riêng tư, kể cả giữa mẹ và con. Câu đúng từ chối và để chính người mẹ kể.",
    ),
  ],
});

export const week: AuthoredWeek = {
  title: { en: "Personal Advice", vi: "Tư vấn riêng cho từng khách" },
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: tư vấn riêng cho từng khách bằng 'Based on…' và 'Since you mentioned…', hỏi lực ấn và vùng căng cứng, dặn chăm sóc sau liệu trình bằng 'avoid + V-ing' — và với khách quen vẫn kiểm tra lại phiếu sức khoẻ, đưa thuốc đang dùng cho giám sát, xin giấy bác sĩ sau phẫu thuật, không đọc phiếu của khách này cho người khác.",
};
