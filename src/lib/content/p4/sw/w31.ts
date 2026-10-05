// SW week 31 — Telling the spa's story (storytelling, compound sentences,
// feeling adjectives). Hand-authored Phase 4, see ../kit.ts.
//
// A story is told from the menu and from the guest, never instead of the
// consultation: the signature ritual starts with a HOT herbal bath, so the
// two reflexes Phase 3 taught come straight back into the story — high blood
// pressure means the bath is not offered (a warm foot soak is), and a guest
// who is pregnant is not answered by the receptionist at all: thank her, and
// check with the manager first. A story never promises a cure.
import type { AuthoredWeek } from "../kit";
import { cardsFor, lessonsFor, risk } from "../kit";
import { game, g, read, sp } from "../../phase0";

const c = cardsFor("SW");
const L = lessonsFor("SW");

// ── Lesson 1 — The signature ritual ────────────────────────────────────
const t1a = "Our signature ritual begins with a herbal bath, and then we do a full body massage.";
const t1b =
  "It comes from a tradition in the northern mountains, and we still use their herbal leaves.";
const t1c = "The water is warm and soothing, so most guests feel relaxed afterwards.";

const lesson1 = L(31, 1, "The Signature Ritual", "Nghi thức đặc trưng của spa", {
  vocabulary: [
    c(
      "Signature ritual",
      "Our signature ritual begins with a herbal bath and ends with a massage.",
    ),
    c("Herbal bath", "The herbal bath uses leaves from the mountains in the north.", [
      "/ˌhɜːbl ˈbɑːθ/",
      "Bồn ngâm lá thuốc thảo dược",
      "🛁",
    ]),
    c("Tradition", "The herbal bath comes from an old tradition in the northern mountains.", [
      "/trəˈdɪʃn/",
      "Truyền thống",
      "🏔️",
    ]),
    c("Soothing", "The warm water is soothing after a long flight.", [
      "/ˈsuːðɪŋ/",
      "Dịu nhẹ, làm cơ thể dễ chịu",
      "🌿",
    ]),
  ],
  grammar: [
    g(
      "Bath first. Then massage. Very nice.",
      "The ritual begins with a herbal bath, and then we do a massage.",
      "Câu ghép hai mệnh đề: nối hai việc theo thứ tự bằng ', and then'. Chủ ngữ số ít 'The ritual' → động từ thêm -s: 'begins'.",
      "The ritual begin with a herbal bath, and then we do a massage.",
    ),
    g(
      "Guests very relaxing after the bath.",
      "Most guests feel relaxed after the herbal bath.",
      "Tính từ đuôi -ed tả cảm giác của NGƯỜI ('feel relaxed'); đuôi -ing tả thứ GÂY ra cảm giác ('The bath is soothing'). Người Việt hay nói ngược: khách 'feel relaxing'.",
      "Most guests feel relaxing after the herbal bath.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "I see a signature ritual on your menu. What is it?",
        t1a,
        "Kể hai bước theo thứ tự trong một câu ghép: bước một, rồi ', and then' bước hai.",
      ),
      alsoAccept: [
        "Our signature ritual starts with a herbal bath, and then we do a full body massage.",
      ],
    },
    sp(
      "A herbal bath? Where does that idea come from?",
      t1b,
      "Lượt hai kể nguồn gốc: một truyền thống ở vùng núi phía Bắc, và spa vẫn dùng lá thuốc của họ.",
      undefined,
      undefined,
      t1a,
    ),
    sp(
      "How does the bath feel? I have never had one.",
      t1c,
      "Lượt ba tả cảm giác: nước thì 'soothing' (gây dễ chịu), còn khách thì cảm thấy thư giãn (đuôi -ed). Nối kết quả bằng ', so'.",
      undefined,
      undefined,
      t1b,
    ),
    {
      ...sp(
        "Can my husband and I do the ritual together?",
        "Yes, madam. We can do the signature ritual in the couple's suite, so you can enjoy it together.",
        "Trả lời 'yes' rồi nói rõ ở đâu: phòng đôi. Kết quả nối bằng ', so'.",
      ),
      alsoAccept: [
        "Yes, madam. You can enjoy the signature ritual together in the couple's suite.",
      ],
    },
    risk({
      ...sp(
        "I am four months pregnant. Can I still have the herbal bath?",
        "Thank you, madam. I will check with my manager first.",
        "Khách mang thai hỏi về bồn ngâm NÓNG: bạn không tự nói có hay không. Cảm ơn khách, rồi hỏi quản lý trước.",
        undefined,
        ["check", "manager", "first"],
      ),
      alsoAccept: [
        "Thank you for telling me, madam. I will check with my manager first.",
        "Thank you, madam. Let me check with my manager first.",
        "Thank you, madam. I will ask my manager first.",
      ],
    }),
    sp(
      "That sounds lovely, but we only have an hour this afternoon.",
      "Then the signature ritual is too long, madam. Shall I book it for another day?",
      "Khách ít thời gian: nói thật là nghi thức quá dài, rồi mời đặt hôm khác — không ép.",
    ),
  ],
  reading: read(
    `Mrs Weber and her husband stop at the spa desk on their first evening. They ask about the signature ritual on the menu. Linh, the spa receptionist, tells the story in three short parts. The ritual begins with a herbal bath, and then the guest has a full body massage. The bath comes from a tradition in the northern mountains, where families boil forest leaves in a big pot of water. Linh explains that the water is warm and soothing, so most guests feel relaxed afterwards. Mrs Weber smiles and says she would love to try it. Then she adds that she is four months pregnant. Linh does not say yes, and she does not say no. She thanks Mrs Weber and checks with her manager first. Ten minutes later, the manager comes to the desk. She suggests a gentle massage without the hot bath. The couple book it for the next morning, together in the couple's suite.`,
    [
      {
        q: "Nghi thức đặc trưng gồm những gì, theo thứ tự nào?",
        options: [
          "Massage toàn thân trước, rồi ngâm bồn lá thuốc",
          "Ngâm bồn lá thuốc trước, rồi massage toàn thân",
          "Chỉ ngâm bồn lá thuốc theo truyền thống vùng núi",
        ],
        correct: 1,
        explanation:
          "'The ritual begins with a herbal bath, and then the guest has a full body massage' — cụm 'and then' cho biết thứ tự.",
      },
      {
        q: "Khi bà Weber nói mình đang mang thai bốn tháng, Linh làm gì?",
        options: [
          "Khuyên bà chỉ ngâm bồn thật ngắn cho an toàn",
          "Nói rằng thảo dược tự nhiên nên không sao cả",
          "Cảm ơn bà và hỏi quản lý trước",
        ],
        correct: 2,
        explanation:
          "'She thanks Mrs Weber and checks with her manager first' — liệu trình nóng cho khách mang thai là việc quản lý quyết, không phải lễ tân.",
      },
      {
        q: "Bồn lá thuốc bắt nguồn từ đâu?",
        options: [
          "Từ truyền thống vùng núi phía Bắc",
          "Từ một spa nổi tiếng ở nước ngoài",
          "Từ công thức riêng của quản lý spa",
        ],
        correct: 0,
        explanation:
          "'The bath comes from a tradition in the northern mountains' — câu chuyện có nguồn gốc thật, kể ngắn gọn.",
      },
    ],
  ),
  game: [
    game(
      "What makes your signature ritual special?",
      "It begins with a herbal bath from a mountain tradition, and then we do a massage.",
      "It begin with herbal bath from a mountain tradition, and then we doing a massage.",
      "It is the most expensive treatment we have, madam, so it is certainly the best choice for you.",
      undefined,
      "Câu thứ hai sai hình thái: 'It begin' thiếu -s, 'we doing' thiếu động từ chính. Câu thứ ba đúng ngữ pháp nhưng lấy GIÁ thay cho câu chuyện — 'đắt nhất nên tốt nhất' là ép bán, và khách hỏi điều gì làm liệu trình đặc biệt. Câu đúng kể nguồn gốc và trình tự.",
    ),
    game(
      "I am pregnant. Will the herbal bath be safe for me?",
      "Thank you for telling me, madam. I will check with my manager first, and then come back to you.",
      "Thank you for tell me, madam. I will checking with my manager first.",
      "Of course, madam. The herbs are all natural, so the bath is perfectly safe for you.",
      undefined,
      "Câu thứ hai sai dạng động từ: 'for tell' (phải là 'for telling') và 'will checking'. Câu thứ ba trôi chảy nhưng tự hứa an toàn: thảo dược tự nhiên không có nghĩa là an toàn khi mang thai, và lễ tân không quyết chuyện này. Câu đúng cảm ơn khách rồi hỏi quản lý.",
    ),
  ],
});

// ── Lesson 2 — Where it comes from ─────────────────────────────────────
const t2a = "The ingredients of our rice scrub are rice, ginger and a little honey.";
const t2b = "Ginger feels warm on the skin, so it is soothing after a long day.";
const t2c = "It is handmade by our spa team, and we prepare it fresh every morning.";

const lesson2 = L(31, 2, "Where It Comes From", "Nguồn gốc nguyên liệu", {
  vocabulary: [
    c("Ingredient", "Every ingredient in the scrub is written on the label.", [
      "/ɪnˈɡriːdiənt/",
      "Thành phần, nguyên liệu",
      "🧾",
    ]),
    c("Ginger", "Ginger feels warm on the skin.", ["/ˈdʒɪndʒə/", "Gừng", "🫚"]),
    c("Rice scrub", "The rice scrub leaves your skin soft and smooth.", [
      "/ˈraɪs skrʌb/",
      "Tẩy tế bào chết bằng bột gạo",
      "🍚",
    ]),
    c("Handmade", "Our rice scrub is handmade by the spa team every morning.", [
      "/ˌhændˈmeɪd/",
      "Làm thủ công, làm bằng tay",
      "🤲",
    ]),
    c("Harvest", "Our gardeners harvest the lemongrass every week.", [
      "/ˈhɑːvɪst/",
      "Thu hái (lá, cây trồng)",
      "🌾",
    ]),
  ],
  grammar: [
    g(
      "Ginger. Warm. Good after walking.",
      "Ginger feels warm on the skin, so it is soothing after a long walk.",
      "Mệnh đề kết quả nối bằng ', so': nguyên nhân trước, kết quả sau. 'Ginger' là danh từ không đếm được → động từ số ít 'feels'.",
      "Ginger feel warm on the skin, so it is soothing after a long walk.",
    ),
    g(
      "Scrub make by hand, every morning.",
      "The rice scrub is handmade, and we prepare it every morning.",
      "Câu ghép bằng ', and': mỗi vế có chủ ngữ riêng. Vế sau có chủ ngữ 'we' → 'prepare', không thêm -s.",
      "The rice scrub is handmade, and we prepares it every morning.",
    ),
  ],
  speaking: [
    sp(
      "What is in the body scrub?",
      t2a,
      "Kể thành phần ngắn gọn, đúng như trên nhãn — không thêm lời khen chung chung.",
    ),
    sp(
      "Why ginger?",
      t2b,
      "Một nguyên nhân, một kết quả: gừng ấm trên da, ', so' dễ chịu sau một ngày dài.",
      undefined,
      undefined,
      t2a,
    ),
    {
      ...sp(
        "Lovely. And who makes the scrub?",
        t2c,
        "Câu ghép hai vế: ai làm ('handmade'), và làm lúc nào. Chi tiết thật làm câu chuyện đáng tin.",
        undefined,
        undefined,
        t2b,
      ),
      alsoAccept: ["It is handmade by our spa team, and we make it fresh every morning."],
    },
    sp(
      "Is the lemongrass in the foot bath from your garden?",
      "Yes, sir. Our gardeners harvest the lemongrass here, and we use it the same week.",
      "Trả lời 'yes', rồi thêm một chi tiết về khu vườn bằng ', and'.",
    ),
    risk({
      ...sp(
        "I am allergic to nuts. Is there any nut oil in the rice scrub?",
        "Thank you, madam. I will check the ingredients first and use a nut-free oil.",
        "Dị ứng hạt: không trả lời theo trí nhớ. Kiểm tra từng thành phần trước, rồi dùng dầu không chứa hạt.",
        undefined,
        ["check", "ingredients", "first", "nut", "free", "oil"],
      ),
      alsoAccept: [
        "Thank you for telling me, madam. I will check the ingredients first and use a nut-free oil.",
        "Thank you, madam. I will check every ingredient first and use a nut-free oil.",
      ],
    }),
    sp(
      "Can I buy the rice scrub to use at home?",
      "Of course, madam. It is in our spa shop, and every ingredient is on the label.",
      "Bán khi khách hỏi: nói chỗ mua, và nhắc nhãn có ghi đủ thành phần.",
    ),
  ],
  reading: read(
    `Every Monday morning, two gardeners harvest lemongrass and ginger in the hotel garden. They carry the baskets to the spa, and the spa team prepares the rice scrub by hand. The scrub has only three ingredients: rice flour, fresh ginger and a little honey. Because it is handmade, each jar has a label with the date and every ingredient. On Tuesday, Ms Tanaka books a rice scrub. Before the treatment, she tells her therapist, Mai, that she is allergic to nuts. Mai does not answer from memory. She reads the label, checks the massage oil for the next step, and chooses a nut-free oil. Ms Tanaka says she feels safe and relaxed. After the treatment, she asks to buy a jar of the scrub. Mai takes her to the spa shop and shows her the label again.`,
    [
      {
        q: "Ai làm món tẩy tế bào chết bằng gạo?",
        options: [
          "Một nhà cung cấp ở ngoài khách sạn",
          "Đội ngũ spa, làm bằng tay",
          "Hai người làm vườn của khách sạn",
        ],
        correct: 1,
        explanation:
          "'the spa team prepares the rice scrub by hand' — người làm vườn chỉ thu hái gừng và sả.",
      },
      {
        q: "Khi khách nói bị dị ứng hạt, Mai làm gì trước tiên?",
        options: [
          "Đọc nhãn và kiểm tra dầu massage",
          "Trả lời ngay vì chị nhớ rõ công thức",
          "Đổi liệu trình của khách sang ngâm chân",
        ],
        correct: 0,
        explanation:
          "'Mai does not answer from memory. She reads the label, checks the massage oil…' — dị ứng thì kiểm tra, không đoán.",
      },
      {
        q: "Trên nhãn mỗi lọ có ghi gì?",
        options: [
          "Giá bán và tên người làm",
          "Cách dùng sản phẩm tại nhà mỗi tối",
          "Ngày làm và từng thành phần",
        ],
        correct: 2,
        explanation: "'each jar has a label with the date and every ingredient'.",
      },
    ],
  ),
  game: [
    game(
      "Is everything in your rice scrub natural?",
      "Yes, madam. It is handmade from rice, ginger and a little honey.",
      "Yes, madam. It handmade from rice, ginger and a little honey.",
      "Yes, madam. Everything here is natural, so it is safe for any skin and any allergy.",
      undefined,
      "Câu thứ hai thiếu động từ 'is' ('It handmade'). Câu thứ ba hứa 'an toàn với mọi làn da và mọi dị ứng' — tự nhiên không có nghĩa là an toàn với người bị dị ứng. Câu đúng kể thành phần để khách tự đối chiếu.",
    ),
    game(
      "Who grows the lemongrass you use?",
      "Our gardeners harvest it here at the hotel, sir.",
      "Our gardeners harvests it here at the hotel, sir.",
      "I have no idea, sir. You will have to ask the garden team about that.",
      undefined,
      "Câu thứ hai sai hoà hợp: 'gardeners' số nhiều → 'harvest', không thêm -s. Câu thứ ba đúng ngữ pháp nhưng đẩy khách đi và bỏ lỡ câu chuyện về khu vườn. Câu đúng trả lời ngắn và tự hào.",
    ),
  ],
});

// ── Lesson 3 — The right story for the guest ───────────────────────────
const t3a = "Yes, sir. I recommend the foot soak, because it is short and very refreshing.";
const t3b =
  "Your feet rest in warm herbal water, and then the therapist massages your feet and legs.";
const t3c = "I am sorry, sir. With high blood pressure, I cannot offer the herbal bath.";

const lesson3 = L(31, 3, "The Right Story for the Guest", "Kể đúng chuyện cho đúng khách", {
  vocabulary: [
    c("Nervous", "Many first-time guests feel a little nervous.", [
      "/ˈnɜːvəs/",
      "Hồi hộp, lo lắng",
      "😟",
    ]),
    c("Refreshing", "A short foot soak is very refreshing before a meeting.", [
      "/rɪˈfreʃɪŋ/",
      "Sảng khoái, làm tỉnh táo",
      "💧",
    ]),
    c("Foot soak", "The foot soak uses warm water with lemongrass and ginger.", [
      "/ˈfʊt səʊk/",
      "Ngâm chân",
      "🦶",
    ]),
    c(
      "Memorable",
      "Many couples say the signature ritual is the most memorable part of their trip.",
      ["/ˈmemərəbl/", "Đáng nhớ", "✨"],
    ),
  ],
  grammar: [
    g(
      "Foot soak. Short. Good for busy.",
      "I recommend the foot soak, because it is short and refreshing.",
      "'because' + một mệnh đề (chủ ngữ + động từ: 'it is short'). 'because of' chỉ đi với danh từ — người Việt hay nói 'because of it is…'.",
      "I recommend the foot soak, because of it is short and refreshing.",
    ),
    g(
      "You nervous? Relax, relax.",
      "Many first-time guests feel nervous, but they relax after a few minutes.",
      "Nối hai ý trái ngược bằng ', but': cảm giác của khách là bình thường, rồi mới trấn an. Chủ ngữ 'they' → 'relax', không thêm -s.",
      "Many first-time guests feel nervous, but they relaxes after a few minutes.",
    ),
  ],
  speaking: [
    sp(
      "I have a meeting at four. Is there something short and refreshing?",
      t3a,
      "Khách bận: chọn câu chuyện NGẮN. Gợi ý một liệu trình và lý do bằng ', because'.",
    ),
    sp(
      "What happens in a foot soak?",
      t3b,
      "Kể hai bước bằng ', and then' — đủ để khách hình dung, không kể dài.",
      undefined,
      undefined,
      t3a,
    ),
    {
      ...sp(
        "Will I be back in time for my meeting at four?",
        "Yes, sir. The foot soak finishes well before four, so you will have plenty of time.",
        "Trả lời đúng điều khách lo: giờ họp. Kết quả nối bằng ', so'.",
        undefined,
        undefined,
        t3b,
      ),
      alsoAccept: ["Yes, sir. It finishes well before four, so you will have plenty of time."],
    },
    risk({
      ...sp(
        "I would love the herbal bath, but I have high blood pressure.",
        t3c,
        "Huyết áp cao: bồn ngâm nóng là chống chỉ định. Từ chối rõ ràng, không kể tiếp câu chuyện về bồn ngâm.",
        undefined,
        ["offer", "herbal", "bath"],
      ),
      alsoAccept: [
        "I am sorry, sir. I cannot offer the herbal bath with high blood pressure.",
        "Thank you for telling me, sir. With high blood pressure, I cannot offer the herbal bath.",
      ],
    }),
    {
      ...sp(
        "Oh, that is a pity. Is there anything else?",
        "I can offer a warm foot soak instead, sir. The water is warm, not hot.",
        "Đổi câu chuyện theo khách: một lựa chọn an toàn, và nói rõ nước ấm chứ không nóng.",
        undefined,
        undefined,
        t3c,
      ),
      alsoAccept: ["I can offer you a warm foot soak instead, sir. The water is warm, not hot."],
    },
    sp(
      "This is my first spa visit, and I feel a bit nervous.",
      "Many guests feel nervous the first time, madam. We use our draping technique, and you can ask me to change anything.",
      "Nói cảm giác của khách là bình thường, rồi trấn an bằng một sự thật về quy trình: kỹ thuật phủ khăn.",
    ),
    sp(
      "We are celebrating our wedding anniversary. Is there something special for couples?",
      "How lovely, madam. Many couples find the signature ritual very memorable, and you can enjoy it side by side.",
      "Khách có dịp đặc biệt: kể câu chuyện cho hai người, bằng tính từ cảm xúc 'memorable'.",
    ),
  ],
  reading: read(
    `On a busy Thursday morning, Hoa works at the spa desk. Three guests arrive within an hour, and each one needs a different story. The first guest is a businessman with a meeting at four. He has no time for the full signature ritual, so Hoa recommends the foot soak, because it is short and refreshing. The second guest is a young man on his first spa visit. He looks nervous and asks many questions. Hoa explains the draping technique slowly, and she tells him he can ask the therapist to change anything. The third guest wants the herbal bath, but he mentions high blood pressure. Hoa does not argue, and she does not tell a long story about the bath. She says she cannot offer it, and she suggests a warm foot soak instead. At lunch, Hoa's manager says something simple. The same menu has many stories, and a good receptionist chooses the right one for each guest.`,
    [
      {
        q: "Vì sao Hoa giới thiệu ngâm chân cho vị khách thứ nhất?",
        options: [
          "Vì đó là liệu trình rẻ nhất trong thực đơn",
          "Vì đó là liệu trình duy nhất còn chỗ trống",
          "Vì khách có họp và cần liệu trình ngắn",
        ],
        correct: 2,
        explanation:
          "'He has no time for the full signature ritual, so Hoa recommends the foot soak, because it is short and refreshing.'",
      },
      {
        q: "Với vị khách bị huyết áp cao, Hoa làm gì?",
        options: [
          "Không mời bồn lá thuốc, gợi ý ngâm chân ấm",
          "Giải thích thật kỹ để khách yên tâm ngâm bồn",
          "Cho khách ngâm bồn nhưng rút ngắn thời gian",
        ],
        correct: 0,
        explanation:
          "'She says she cannot offer it, and she suggests a warm foot soak instead' — chống chỉ định thì đổi liệu trình, không thương lượng.",
      },
      {
        q: "Theo quản lý của Hoa, một lễ tân giỏi làm gì?",
        options: [
          "Kể cùng một câu chuyện thật hay cho mọi khách",
          "Chọn đúng câu chuyện cho từng vị khách",
          "Kể thật ngắn để phục vụ được nhiều khách hơn",
        ],
        correct: 1,
        explanation:
          "'a good receptionist chooses the right one for each guest' — cùng thực đơn, nhưng câu chuyện đi theo nhu cầu của khách.",
      },
    ],
  ),
  game: [
    game(
      "I only have thirty minutes before my airport transfer.",
      "Then I recommend the foot soak, sir. It is short and refreshing.",
      "Then I recommend the foot soak, sir. It is short and refreshed.",
      "Then let me tell you the full story of our signature ritual, sir, because it is our most famous treatment.",
      undefined,
      "Câu thứ hai dùng sai tính từ: 'refreshed' tả cảm giác của người, còn liệu trình thì 'refreshing'. Câu thứ ba kể chuyện dài về một nghi thức dài cho người chỉ có ba mươi phút — câu chuyện phải hợp với thời gian của khách.",
    ),
    game(
      "I have high blood pressure, but I really want the herbal bath.",
      "I am sorry, sir. With high blood pressure, I cannot offer the herbal bath, but I can suggest a warm foot soak.",
      "I am sorry, sir. With high blood pressure, I cannot offering the herbal bath.",
      "A short bath should be fine, sir. Just come out if you start to feel dizzy.",
      undefined,
      "Câu thứ hai sai dạng: sau 'cannot' là động từ nguyên mẫu 'offer'. Câu thứ ba tự quyết là 'chắc không sao' — nhiệt là chống chỉ định với huyết áp cao, nhân viên không tự bỏ qua. Câu đúng từ chối rõ ràng, rồi gợi ý ngâm chân nước ấm thay thế.",
    ),
  ],
});

// ── Lesson 4 — A true story, not a promise ─────────────────────────────
const t4a = "I cannot promise a cure, sir, but many guests find the warm stones very relaxing.";
const t4b =
  "The main benefit is the warmth, which relaxes your back, and many guests sleep well afterwards.";

const lesson4 = L(31, 4, "A True Story, Not a Promise", "Kể thật, không hứa quá", {
  vocabulary: [
    c("Benefit", "The main benefit of the hot stones is the deep warmth.", [
      "/ˈbenɪfɪt/",
      "Lợi ích",
      "➕",
    ]),
    c("Cure", "A massage is not a cure, so we never promise one.", [
      "/kjʊə/",
      "Sự chữa khỏi bệnh; chữa khỏi",
      "💊",
    ]),
    c("Delighted", "I am delighted you enjoyed the signature ritual.", [
      "/dɪˈlaɪtɪd/",
      "Rất vui, rất hài lòng",
      "😊",
    ]),
    c("Honest", "To be honest, the shorter massage suits a busy day better.", [
      "/ˈɒnɪst/",
      "Thật lòng, trung thực",
      "🤝",
    ]),
  ],
  grammar: [
    g(
      "Yes, massage fix your back.",
      "I cannot promise a cure, but many guests find the massage very relaxing.",
      "Không hứa chữa khỏi. Nối vế từ chối và vế lợi ích thật bằng ', but'. 'many guests' số nhiều → 'find', không thêm -s.",
      "I cannot promise a cure, but many guests finds the massage very relaxing.",
    ),
    g(
      "Very happy you like.",
      "I am delighted you enjoyed the signature ritual, madam.",
      "Cảm xúc của người nói dùng đuôi -ed: 'I am delighted'. Sau 'delighted' nối thẳng một mệnh đề: 'you enjoyed…'.",
      "I am delighting you enjoyed the signature ritual, madam.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "Will the hot stone massage cure my back pain?",
        t4a,
        "Không hứa 'cure'. Từ chối lời hứa trước, rồi nói lợi ích thật bằng ', but'.",
      ),
      alsoAccept: [
        "I am sorry, sir, I cannot promise a cure, but many guests find the warm stones very relaxing.",
      ],
    },
    sp(
      "Then what is the real benefit?",
      t4b,
      "Nêu MỘT lợi ích chính ('benefit'), rồi thêm điều khách khác thường cảm thấy sau liệu trình.",
      undefined,
      undefined,
      t4a,
    ),
    sp(
      "My back pain is quite bad, actually. Is that a problem?",
      "Thank you for telling me, sir. Please write it on the health declaration form, and the therapist will read it first.",
      "Đau nặng là thông tin sức khoẻ: không đoán, mời khách ghi vào phiếu khai sức khoẻ để kỹ thuật viên đọc trước.",
      undefined,
      undefined,
      t4b,
    ),
    {
      ...sp(
        "That was wonderful. I feel like a new person.",
        "I am delighted you enjoyed it, madam. Shall I book your next visit before you leave?",
        "Đón lời khen bằng 'delighted', rồi mời đặt lần sau — một câu hỏi, không ép.",
      ),
      alsoAccept: [
        "I am delighted you enjoyed it, madam. May I book your next visit before you leave?",
      ],
    },
    sp(
      "Be honest. Is the long ritual worth it on a busy day?",
      "To be honest, madam, it suits a free afternoon best. On a busy day, the foot soak is a better choice.",
      "Khách xin lời thật: 'To be honest' rồi khuyên điều có lợi cho khách, kể cả khi đó là liệu trình rẻ hơn.",
    ),
    {
      ...sp(
        "My friend says this face cream will cure my eczema. Is that true?",
        "I am sorry, madam, I cannot promise that. We can do a patch test first, and a doctor can advise you.",
        "Bệnh da là chuyện của bác sĩ. Không hứa, đề nghị thử trên da trước, và nhắc khách hỏi bác sĩ.",
      ),
      alsoAccept: [
        "I am sorry, madam, I cannot promise that. A doctor can advise you, and we can do a patch test first.",
      ],
    },
  ],
  reading: read(
    `Mr Fischer has stiff shoulders after a long flight, and he reads about the hot stone massage on the spa menu. At the desk, he asks Nam a direct question: will the massage cure his back pain? Nam wants to make the sale, but he also wants to be honest. He says he cannot promise a cure, because a massage is not a medical treatment. Then he explains the real benefit: the warm stones relax the back, and many guests sleep well afterwards. Mr Fischer mentions that the pain is quite bad. Nam asks him to write it on the health declaration form, so the therapist can read it before she starts. The therapist reads the form, chooses light pressure and stays away from the painful area. After the massage, Mr Fischer says he feels much better, and he thanks Nam for the honest answer. Nam says he is delighted, and he books the guest's next visit for Friday. Later, Nam's manager reads the guest's comment card: "The staff told me the truth, so I trust their advice."`,
    [
      {
        q: "Vì sao Nam không hứa massage sẽ chữa khỏi đau lưng?",
        options: [
          "Vì Nam muốn bán một liệu trình đắt hơn",
          "Vì massage không phải là điều trị y khoa",
          "Vì quản lý cấm nhân viên nói về lợi ích của liệu trình",
        ],
        correct: 1,
        explanation:
          "'He says he cannot promise a cure, because a massage is not a medical treatment.'",
      },
      {
        q: "Nam làm gì khi khách nói cơn đau khá nặng?",
        options: [
          "Đổi ngay sang một liệu trình ngắn hơn",
          "Gọi y tá đến kiểm tra lưng cho khách ngay",
          "Nhờ khách ghi vào phiếu khai sức khoẻ",
        ],
        correct: 2,
        explanation:
          "'Nam asks him to write it on the health declaration form, so the therapist can read it before she starts.'",
      },
      {
        q: "Phiếu góp ý của khách nói gì?",
        options: [
          "Liệu trình hơi đắt nhưng vẫn rất xứng đáng",
          "Nhân viên nói thật nên khách tin họ",
          "Khách muốn được giảm giá cho lần sau",
        ],
        correct: 1,
        explanation:
          "'The staff told me the truth, so I trust their advice' — kể thật, không hứa quá, là cách giữ khách lâu dài.",
      },
    ],
  ),
  game: [
    game(
      "Will this massage cure my headaches?",
      "I cannot promise that, madam, but many guests find it very relaxing.",
      "I cannot promise that, madam, but many guests find it very relaxed.",
      "Yes, madam. Our massage cures headaches, back pain and stress after just one session.",
      undefined,
      "Câu thứ hai dùng sai tính từ: liệu trình thì 'relaxing', người mới 'relaxed'. Câu thứ ba hứa chữa bệnh — spa không chữa bệnh, và một lời hứa sai sự thật dễ thành khiếu nại. Câu đúng từ chối lời hứa và nói lợi ích thật.",
    ),
    game(
      "That facial was wonderful. Thank you so much.",
      "I am delighted you enjoyed it, madam. Thank you for coming.",
      "I am delighting you enjoyed it, madam. Thank you for coming.",
      "You are welcome, madam. Please write us a five-star review online before you go.",
      undefined,
      "Câu thứ hai sai dạng: cảm xúc của người nói là 'delighted', không phải 'delighting'. Câu thứ ba đúng ngữ pháp nhưng đòi khách viết đánh giá ngay lúc khách đang cảm ơn — biến khoảnh khắc thành giao dịch. Câu đúng đón lời khen và cảm ơn khách.",
    ),
  ],
});

export const week: AuthoredWeek = {
  title: { en: "Telling the Spa's Story", vi: "Kể chuyện về liệu trình spa" },
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: kể câu chuyện về nghi thức đặc trưng và nguyên liệu của spa bằng câu ghép (', and then…', ', so…', ', because…') và tính từ cảm xúc (soothing, refreshing, memorable), chọn chuyện hợp với từng khách, không hứa chữa khỏi bệnh — và khi khách mang thai, huyết áp cao hay dị ứng hạt thì hỏi quản lý hoặc đổi liệu trình.",
};
