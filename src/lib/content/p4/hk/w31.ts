// HK week 31 — Telling the Story (see ../kit.ts).
//
// The room attendant tells the short, true story of what is in the room — the
// hand-woven runner, the hotel's own scent, the refillable bottles, the
// evening ritual — in sentences of two or three clauses joined by and / but /
// so, with the feeling words the story needs (proud, delighted, thrilled).
// Two rules from the house run through it: a guest's scent complaint is met
// the same day (a scent-free room), and an attendant never takes a guest's
// valuables into their own hands — the safe is shown, not filled.
import type { GameRound } from "../../week-content";
import { g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("HK");
const L = lessonsFor("HK");

/** One arcade round: the right answer at `at`, one broken-English option
 *  (`form`) and one well-formed option that is wrong for the job
 *  (`register`), with the reason each wrong one is wrong. */
const round = (
  at: 0 | 1 | 2,
  prompt: string,
  answer: string,
  form: string,
  register: string,
  explanation: string,
  role?: GameRound["speakerRole"],
): GameRound => {
  const options: GameRound["options"] = [
    { text: form, correct: false, kind: "form" },
    { text: register, correct: false, kind: "register" },
  ];
  options.splice(at, 0, { text: answer, correct: true, kind: "answer" });
  return { ...(role ? { speakerRole: role } : {}), prompt, options, explanation };
};

// ── Lesson 1 — the linen and the scent ────────────────────────────────────
const t1a =
  "Yes, it is, madam. It is hand-woven in a weaving village near here, and we are very proud of it.";
const t1b =
  "Families in the village weave it by hand, madam, so no two pieces are exactly the same.";
const t1c = "I am not sure of her name, madam, but I can find out and leave a note in your room.";

// ── Lesson 2 — the eco programme, told kindly ─────────────────────────────
const t2a =
  "Not at all, madam. Our eco programme changes them every second day, but I am delighted to change them daily.";
const t2b = "It is free of charge, madam, and I will note it so the morning team knows.";
const t2c =
  "Then leave the ones you want to keep on the towel rail, madam, and the rest will be laundered.";

const lesson1 = L(31, 1, "The Linen Has a Story", "Tấm vải cũng có câu chuyện", {
  vocabulary: [
    c("Hand-woven", "The runner on your bed is hand-woven, and no two are the same.", [
      "/ˌhænd ˈwəʊvən/",
      "Dệt thủ công, dệt bằng tay",
      "🧵",
    ]),
    c(
      "Weaving village",
      "Our runners come from a weaving village, and the same families have made them for years.",
      ["/ˈwiːvɪŋ ˌvɪlɪdʒ/", "Làng dệt truyền thống", "🏘️"],
    ),
    c(
      "Signature scent",
      "Our signature scent was made for this hotel, and we use it in every corridor.",
      ["/ˈsɪɡnətʃə ˌsent/", "Mùi hương riêng của khách sạn", "🌿"],
    ),
    c("Proud", "We are proud of the runners, because a local family weaves them.", [
      "/praʊd/",
      "Tự hào",
      "🏅",
    ]),
    c("Scent-free", "A guest who finds the scent too strong can have a scent-free room today.", [
      "/ˌsent ˈfriː/",
      "Không có mùi hương — phòng không xịt thơm",
      "🚫",
    ]),
  ],
  grammar: [
    g(
      "This cloth hotel buy. Very nice, you like?",
      "This runner is hand-woven, madam, and it comes from a weaving village near here.",
      "Câu ghép hai vế nối bằng 'and': vế một nói vật là gì, vế hai nói nó từ đâu tới. Chủ ngữ 'it' số ít nên động từ thêm -s: it comes. Hai vế là đủ — người phục vụ phòng không cần bài thuyết minh dài.",
      "This runner is hand-woven, madam, and it come from a weaving village near here.",
    ),
    g(
      "Name? I don't know. I only clean the room.",
      "I am not sure of the weaver's name, sir, but I can find out for you.",
      "'but' nối hai vế trái chiều: điều bạn chưa biết + việc bạn sẽ làm. Sau 'can' luôn là động từ nguyên mẫu: can find out — không chia quá khứ, không thêm -ing.",
      "I am not sure of the weaver's name, sir, but I can found out for you.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "This cloth at the end of the bed is beautiful. Is it local?",
        t1a,
        "Khách hỏi có/không thì trả lời 'Yes, it is' trước, rồi kể bằng câu ghép: vật được làm thế nào + cảm xúc của khách sạn ('proud'). 'Hand-woven' đọc /ˌhænd ˈwəʊvən/, âm /w/ tròn môi.",
      ),
      alsoAccept: [
        "It is, madam. It is hand-woven in a weaving village near here, and we are very proud of it.",
        "Yes, madam. It is hand-woven in a weaving village near here, and we are proud of it.",
      ],
    },
    sp(
      "How lovely. So who actually makes it?",
      t1b,
      "'so' nối nguyên nhân với kết quả: làm bằng tay, nên mỗi tấm một khác. Nhấn nhẹ 'by hand'.",
      undefined,
      undefined,
      t1a,
    ),
    {
      ...sp(
        "I would love to thank the weaver. What is her name?",
        t1c,
        "Không biết thì nói thật, rồi nối bằng 'but' sang việc bạn tự làm được: tìm hiểu và để lại ghi chú. Không đoán một cái tên.",
        undefined,
        undefined,
        t1b,
      ),
      alsoAccept: [
        "I am not sure of her name, madam, but I will find out and leave a note in your room.",
      ],
    },
    sp(
      "Everything in this room smells wonderful. What is it?",
      "That is our signature scent, sir. It was made for this hotel, and we use it in every corridor.",
      "Hai vế: mùi được làm riêng + dùng ở đâu. 'Scent' đọc /sent/, chữ c câm. Thay bằng câu chuyện mùi hương của khách sạn bạn.",
    ),
    risk({
      ...sp(
        "Is that a perfume? Strong scents give me a headache.",
        "I am sorry, sir. It is our room scent, so from today your room will be scent-free.",
        "Mùi hương làm khách khó chịu là chuyện sức khoẻ, dù nhỏ: xin lỗi, nói đó là mùi gì, rồi đổi ngay trong ngày. Không cãi rằng mùi rất nhẹ. 'Scent-free' nhấn ở 'free'.",
      ),
      alsoAccept: [
        "I am so sorry, sir. It is our room scent, so I will make your room scent-free from today.",
        "I am sorry, sir. That is our room scent, and from today your room will be scent-free.",
      ],
    }),
    sp(
      "A guest asked me who weaves our runners. What do I tell her?",
      "Tell her they are hand-woven in a weaving village near here, and that we are proud of them.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Chuyển đúng hai vế của câu chuyện — làm ở đâu, và khách sạn tự hào.",
      "colleague",
    ),
  ],
  reading: read(
    `THE ROOM STORY CARD — HOUSEKEEPING
Sooner or later, every attendant is asked about the room. Three short stories are worth knowing, and each one fits in two sentences.
The runner at the end of the bed is hand-woven in a weaving village near the hotel. The same families have made it for generations, so no two pieces are the same.
The scent in the corridors is our signature scent, and it was made for this hotel. A guest who finds it too strong can have a scent-free room the same day, so ask once and note it. A scent never covers a damp smell: a damp smell is reported, not sprayed.
The bottles in the bathroom are refillable, and we top them up every morning before a guest has to ask.
Tell each story with feeling, but keep it true. "We are proud of it" is honest; "the best in the country" is something nobody can check.
If you do not know an answer, say so and offer to find out. Then really find out, and leave the answer in a note, because a guest remembers the attendant who came back.
These details are one hotel's. Ask your Executive Housekeeper for yours, and learn them before your first floor.`,
    [
      {
        q: "Khách thấy mùi hương trong phòng quá nồng thì nhân viên làm gì?",
        options: [
          "Xịt ít hơn vào hôm sau, rồi xem khách còn phàn nàn nữa hay không",
          "Hỏi một lần, ghi lại, và để phòng không mùi ngay trong ngày",
          "Giải thích rằng mùi này được làm riêng cho chính khách sạn mình",
        ],
        correct: 1,
        explanation:
          "Bài viết: 'can have a scent-free room the same day, so ask once and note it'. Mùi làm khách khó chịu thì đổi ngay trong ngày — không thử dần, và không bênh mùi của khách sạn.",
      },
      {
        q: "Vì sao không nên nói 'the best in the country'?",
        options: [
          "Vì không ai kiểm chứng được, còn 'chúng tôi tự hào' thì vẫn là lời thật",
          "Vì khách nước ngoài không thích nghe khen",
          "Vì chỉ quản lý mới được nói về giải thưởng",
        ],
        correct: 0,
        explanation:
          "'keep it true… something nobody can check' — kể có cảm xúc ('proud') nhưng chỉ nói điều đúng và kiểm chứng được.",
      },
      {
        q: "Không biết câu trả lời thì làm gì?",
        options: [
          "Mời khách xuống quầy lễ tân vì buồng phòng không phụ trách việc này",
          "Nói thật, hẹn tìm hiểu, rồi để câu trả lời trong ghi chú",
          "Đoán một câu nghe hợp lý để khách khỏi thất vọng lúc đó",
        ],
        correct: 1,
        explanation:
          "'say so and offer to find out… leave the answer in a note' — khách nhớ người đã quay lại với câu trả lời, không nhớ người đoán bừa hay đẩy khách đi nơi khác.",
      },
    ],
  ),
  game: [
    round(
      2,
      "Do you know who made this runner? It looks handmade.",
      "It is hand-woven in a village near here, sir, but I can find out the family's name and leave you a note.",
      "A lady called Mrs Hoa make every one herself, sir, I believe — she is very famous here.",
      "A lady called Mrs Hoa makes every one herself, sir, I believe — she is very famous here.",
      "Phương án 'Mrs Hoa makes every one' đoán một cái tên và thêm lời khen không kiểm chứng — khách sẽ kể lại, và sai thì khách sạn mất uy tín. Phương án 'Mrs Hoa make every one' đoán bừa y như vậy, lại sai chia động từ: chủ ngữ số ít 'a lady' cần 'makes'. Câu đúng nói điều chắc chắn rồi hẹn tìm hiểu.",
    ),
    round(
      0,
      "My wife is sensitive to perfume. Do you spray anything in the rooms?",
      "Only our light signature scent, sir, but I can keep your room scent-free from today.",
      "It is a very gentle scent, sir, and no guest has ever have a problem with it, so she will be fine.",
      "It is a very gentle scent, sir, and no guest has ever had a problem with it, so she will be fine.",
      "Phương án 'no guest has ever had a problem' hứa thay cho sức khoẻ của khách — điều không ai trên tầng hứa được — và gạt đi điều khách vừa nói. Phương án 'has ever have' cũng hứa thay như vậy, lại sai thì hoàn thành: sau 'has' là quá khứ phân từ (has had). Câu đúng nói thật rồi đưa lựa chọn.",
    ),
  ],
});

const lesson2 = L(
  31,
  2,
  "The Eco Programme, Told Kindly",
  "Chương trình xanh — kể mà không lên lớp",
  {
    vocabulary: [
      c(
        "Eco programme",
        "Our eco programme changes the sheets every second day, but only if the guest is happy with it.",
        ["/ˈiːkəʊ ˌprəʊɡræm/", "Chương trình tiết kiệm tài nguyên của khách sạn", "🌱"],
      ),
      c(
        "Laundered",
        "Any towel on the floor is laundered, so nothing comes back to you unwashed.",
        ["/ˈlɔːndəd/", "Đã được giặt là chuyên nghiệp", "🧺"],
      ),
      c(
        "Towel rail",
        "A towel on the towel rail stays with you, and one on the floor goes to the wash.",
        ["/ˈtaʊəl ˌreɪl/", "Thanh treo khăn trong phòng tắm", "🛁"],
      ),
      c("Delighted", "We are delighted when a guest asks about the linen.", [
        "/dɪˈlaɪtɪd/",
        "Rất vui, hân hoan",
        "😊",
      ]),
    ],
    grammar: [
      g(
        "Hotel rule now. Sheet change two days one time. Save the planet.",
        "We change the sheets every second day, madam, but we change them whenever you ask.",
        "'every second day' nghĩa là cách một ngày; sau 'every' danh từ luôn số ít: every second day. Vế sau 'but… whenever you ask' giữ quyền chọn cho khách — chương trình xanh nào cũng phải để khách được xin.",
        "We change the sheets every second days, madam, but we change them whenever you ask.",
      ),
      g(
        "You use too many towels. Very bad for environment.",
        "A towel on the towel rail stays with you, sir, and one on the floor is laundered.",
        "Bị động 'is + phân từ hai' cho một quy trình: is laundered. Người Việt hay bỏ đuôi -ed. Dạy KÝ HIỆU (thanh treo = giữ, sàn = giặt) thay vì dạy đạo đức cho khách.",
        "A towel on the towel rail stays with you, sir, and one on the floor is launder.",
      ),
    ],
    speaking: [
      {
        ...sp(
          "We are here for ten nights. Do we have to keep the same sheets all week?",
          t2a,
          "Trả lời 'Not at all' trước, rồi câu ghép với 'but': luật chung + điều khách được chọn. 'Delighted' đọc /dɪˈlaɪtɪd/ — đuôi -ted thành một âm tiết riêng.",
        ),
        alsoAccept: [
          "No, madam. Our eco programme changes them every second day, but I am delighted to change them daily.",
        ],
      },
      sp(
        "Daily, please. Is there an extra charge for that?",
        t2b,
        "Đồ vải hằng ngày theo yêu cầu là dịch vụ có sẵn — nói thẳng là không tính phí, rồi nói bạn sẽ ghi lại để khách khỏi nhắc lần hai.",
        undefined,
        undefined,
        t2a,
      ),
      sp(
        "Thank you. And the towels? I hate waste, honestly.",
        t2c,
        "Dạy ký hiệu, không dạy đạo đức: thanh treo là giữ, còn lại đem giặt. 'Towel rail' — /ˈtaʊəl/ hai âm tiết.",
        undefined,
        undefined,
        t2b,
      ),
      {
        ...sp(
          "Do they actually wash these towels, or does the card just save the hotel money?",
          "Anything on the floor is laundered, sir, and that never changes. The card only tells us which towels to keep.",
          "Nói sự thật trước, giải thích sau, không lên lớp về môi trường. 'Laundered' /ˈlɔːndəd/: trọng âm âm tiết đầu, đuôi -ed đọc /d/ nhẹ.",
        ),
        alsoAccept: [
          "Everything on the floor is laundered, sir, and that never changes. The card only tells us which towels to keep.",
        ],
      },
      sp(
        "Why are the shampoo bottles so big? Do you throw them away?",
        "No, sir. They are refillable, so we top them up every morning and nothing is wasted.",
        "Câu ghép với 'so': lý do (chai châm lại được) → kết quả (không lãng phí). Kể ngắn rồi dừng.",
      ),
      sp(
        "The guest in 1503 says our towel card is a trick to save money. What did you tell her?",
        "I told her the truth: anything on the floor is laundered, and the card only keeps the towels she wants.",
        "Kể lại cho đồng nghiệp bằng quá khứ ('I told her'), không kính ngữ. Câu trả lời cho khách giữ nguyên hai vế: sự thật + ý nghĩa tấm thẻ.",
        "colleague",
      ),
    ],
    reading: read(
      `THE TOWEL CARD — WHAT IT REALLY MEANS
On the towel rail, a towel stays with the guest. On the floor or in the basket, it goes to the laundry.
One thing overrides the card: anything marked or soiled is laundered, wherever it is hanging.
Under the eco programme, sheets are changed every second day, on departure, and whenever a guest asks. There is no charge for that, and there is no raised eyebrow either.
Some guests test us with one question: "Do you really wash them?" The honest answer is short, and it is always the same.
Never teach the environment to a guest. They booked a room, not a lesson, so tell the story only when they ask for it.
When they do ask, the true story is short. Our laundry team counted the clean, unused towels going into the wash each morning, and they asked us to stop.
If a guest asks for daily linen, write it on the guest's profile the same day, so the next attendant does not ask again.
How often your own hotel changes linen is your Executive Housekeeper's answer, so ask before your first floor.`,
      [
        {
          q: "Khăn treo trên thanh nhưng có vết bẩn thì xử lý thế nào?",
          options: [
            "Để lại, vì khách đã treo khăn lên thanh",
            "Hỏi khách trước rồi mới mang chiếc khăn đi giặt",
            "Mang đi giặt, vì đồ có vết bẩn được giặt dù đang treo ở đâu",
          ],
          correct: 2,
          explanation:
            "'anything marked or soiled is laundered, wherever it is hanging' — vết bẩn thắng tấm thẻ. Thẻ chỉ áp dụng cho khăn sạch.",
        },
        {
          q: "Khách xin thay ga mỗi ngày thì nhân viên làm gì?",
          options: [
            "Đồng ý, rồi giải thích lợi ích môi trường cho khách",
            "Đồng ý, miễn phí, và ghi vào hồ sơ khách trong ngày để người sau khỏi hỏi lại",
            "Đồng ý nhưng báo trước rằng việc này sẽ tính thêm phí",
          ],
          correct: 1,
          explanation:
            "'whenever a guest asks. There is no charge… write it on the guest's profile the same day' — chương trình xanh luôn để khách chọn, và không biến lựa chọn thành bài giảng.",
        },
        {
          q: "Khi nào thì kể câu chuyện về chương trình xanh?",
          options: [
            "Khi khách hỏi vì sao khách sạn làm vậy",
            "Mỗi lần vào dọn phòng, để khách hiểu thêm về môi trường",
            "Khi khách xin thay khăn quá nhiều lần",
          ],
          correct: 0,
          explanation:
            "'tell the story only when they ask for it' — khách đặt phòng, không đặt một bài học. Kể khi được hỏi, và kể ngắn.",
        },
      ],
    ),
    game: [
      round(
        1,
        "I hung the towels up like the card said, and you changed them anyway. Why?",
        "I am sorry, madam. One had a mark on it, and a marked towel is always laundered.",
        "I am sorry, madam. One had a mark on it, and a marked towel is always launder.",
        "The night team changes every towel anyway, madam, so the card does not really matter here.",
        "Phương án 'the card does not really matter' đổ cho ca khác và nói chính chương trình của khách sạn là vô nghĩa. Phương án 'is always launder' thiếu đuôi -ed của bị động (is laundered). Câu đúng xin lỗi rồi nói lý do thật, ngắn.",
      ),
      round(
        2,
        "So if I keep my towels on the rail, I never get fresh ones?",
        "Not at all, sir. You get fresh ones whenever you ask — the towel rail only tells us which to keep.",
        "That is right, sir — under eco programme, fresh towels come only every third day.",
        "That is right, sir — under the eco programme, fresh towels come only every third day.",
        "Phương án 'under the eco programme… only every third day' bịa ra một luật cắt giảm dịch vụ — chương trình xanh nào cũng phải để khách được xin. Phương án 'under eco programme' bịa y như vậy, lại thiếu mạo từ: chương trình cụ thể của khách sạn cần 'the' (under the eco programme). Câu đúng giữ quyền chọn cho khách.",
      ),
    ],
  },
);

// ── Lesson 3 — what the guest may take home ───────────────────────────────
const t3a = "Of course, madam. They are yours to keep, and I am delighted that you like them.";
const t3b = "The robe belongs to the room, madam, but our boutique sells the same one downstairs.";
const t3c = "I am not sure of the price, madam, so I will ask the boutique to call your room.";

// ── Lesson 4 — the evening ritual ─────────────────────────────────────────
const t4a =
  "That was our evening ritual, sir. We fold back the bed, switch on the bedside light and change the water.";
const t4b =
  "I am sorry, sir. I am calling my supervisor now, and we will check the room report with you.";
const t4c =
  "Of course, sir. There will be no evening service for the rest of your stay, and I will tell the turndown team myself.";

const lesson3 = L(31, 3, "Can I Take These Home?", "Khi khách muốn mang đồ về", {
  vocabulary: [
    c(
      "Artisan",
      "An artisan in the old town makes our tea sets, and each one is a little different.",
      ["/ˌɑːtɪˈzæn/", "Nghệ nhân thủ công", "🧑‍🎨"],
    ),
    c("Boutique", "The boutique downstairs sells the robe, and it keeps the price list.", [
      "/buːˈtiːk/",
      "Cửa hàng nhỏ trong khách sạn",
      "🛍️",
    ]),
    c("Yours to keep", "The slippers are yours to keep, madam, so please take them home.", [
      "/ˌjɔːz tə ˈkiːp/",
      "Là quà — khách được giữ lại",
      "🤲",
    ]),
    c("Thrilled", "The little girl was thrilled with her new tea set.", [
      "/θrɪld/",
      "Vui sướng, phấn khởi",
      "🤩",
    ]),
  ],
  grammar: [
    g(
      "That is hotel property. Leave it.",
      "The robe belongs to the room, madam, but the boutique sells the same one.",
      "Đừng nói 'không' rồi dừng: nêu ranh giới + 'but' + lối đi tiếp. 'The robe' số ít nên động từ thêm -s: belongs. Câu khách quan này nghe nhẹ hơn hẳn 'you cannot take it'.",
      "The robe belong to the room, madam, but the boutique sells the same one.",
    ),
    g(
      "Slipper free. You take.",
      "The slippers are yours to keep, sir, and I am delighted that you like them.",
      "Tính từ cảm xúc đuôi -ed tả cảm xúc của NGƯỜI (I am delighted); đuôi -ing tả thứ gây ra cảm xúc (a delightful gift, an exciting day). 'Yours to keep' là cách tặng lịch sự, không cần chữ 'free'.",
      "The slippers are yours to keep, sir, and I am delighting that you like them.",
    ),
  ],
  speaking: [
    sp(
      "These slippers are so comfortable. Can I take a pair home?",
      t3a,
      "'Yours to keep' — ba từ ngắn, nhấn ở 'keep'. Thêm một vế cảm xúc với 'and': khách khen là một món quà, đáp lại cho ấm.",
    ),
    {
      ...sp(
        "And the bathrobe? It is the nicest one I have ever worn.",
        t3b,
        "Ranh giới + 'but' + lối đi tiếp. 'Belongs' đọc nối /bɪˈlɒŋz/ — giữ âm /z/ cuối. Khách khen áo là khen khách sạn, không phải định lấy đồ.",
        undefined,
        undefined,
        t3a,
      ),
      alsoAccept: [
        "The robe stays with the room, madam, but our boutique sells the same one downstairs.",
      ],
    },
    {
      ...sp(
        "Lovely. How much is it?",
        t3c,
        "Không đoán giá. 'so' nối lý do (chưa chắc giá) với việc bạn làm (nhờ cửa hàng gọi lên phòng) — việc vẫn nằm trong tay bạn.",
        undefined,
        undefined,
        t3b,
      ),
      alsoAccept: [
        "I am not sure of the price, madam, but I can ask the boutique to call your room.",
      ],
    },
    sp(
      "My daughter loves this little tea set. Who made it?",
      "An artisan in the old town made it, sir, and the boutique downstairs sells the same set.",
      "Câu ghép hai vế: ai làm + mua ở đâu. 'Artisan' /ˌɑːtɪˈzæn/ — trọng âm rơi vào âm tiết cuối.",
    ),
    sp(
      "I would like to buy one for her birthday. She would love it.",
      "What a lovely present, sir. The boutique has the same set, and I am sure she will be thrilled.",
      "Tính từ cảm xúc cho người nhận quà: 'thrilled' /θrɪld/ — đầu lưỡi giữa hai hàm răng cho âm /θ/, không đọc thành /t/.",
    ),
    {
      ...sp(
        "1210 has just checked out, and the robe is not in the room.",
        "I will report it to the housekeeping office now, because the guest may still be at the front desk.",
        "Báo ngay, vì khách có thể còn ở quầy. Tính phí hay không là việc của Duty Manager — bạn không tự gọi cho khách, và không tự kết luận.",
        "colleague",
      ),
      alsoAccept: [
        "I am reporting it to the housekeeping office now, because the guest may still be at the front desk.",
      ],
    },
  ],
  reading: read(
    `WHAT LEAVES THE ROOM WITH THE GUEST — AND WHAT STAYS
Yours to keep: the slippers, the sewing kit, the small amenities, the pen and the notepad.
Stays with the room: the robe, the towels, the hairdryer, the umbrella, the art and the bed runner. The bathroom bottles are refillable, so they stay too.
Sold downstairs: the robe, the room scent, and the tea set made by an artisan in the old town. The boutique keeps the price list, so never guess a price.
A guest who asks to take the robe is paying a compliment, not stealing. Answer the compliment first, and then show the way: "It belongs to the room, but the boutique sells the same one."
If an item is missing after a departure, report it to the housekeeping office at once. The guest may still be at the front desk.
What happens next is the Duty Manager's decision. It is never a conversation you start with a guest, in the room or on the phone.
Something a guest has left behind is different: it goes into the lost item log the same shift.
Every hotel draws these lines differently. Ask your Executive Housekeeper for your own list in your first days on the floor.`,
    [
      {
        q: "Món nào khách được mang về?",
        options: [
          "Áo choàng tắm và chiếc ô trong tủ",
          "Dép đi trong phòng và bộ kim chỉ",
          "Máy sấy tóc và chai dầu gội lớn",
        ],
        correct: 1,
        explanation:
          "'Yours to keep: the slippers, the sewing kit…' — áo choàng, ô và máy sấy ở lại phòng; chai dầu gội là loại châm lại được nên cũng ở lại.",
      },
      {
        q: "Phát hiện thiếu áo choàng sau khi khách trả phòng thì làm gì?",
        options: [
          "Gọi thẳng cho khách theo số trong hồ sơ để nhắc khách trả lại",
          "Báo văn phòng buồng phòng ngay, vì khách có thể còn ở quầy",
          "Ghi vào sổ cuối ca rồi để giám sát tầng xử lý vào hôm sau",
        ],
        correct: 1,
        explanation:
          "'report it to the housekeeping office at once, because the guest may still be at the front desk' — và việc tiếp theo là của Duty Manager, không phải cuộc gọi do bạn bắt đầu.",
      },
    ],
  ),
  game: [
    round(
      0,
      "Any chance we could buy one of these tea sets? They are lovely.",
      "Yes, sir. An artisan in the old town makes them, and the boutique downstairs sells the set.",
      "Yes, sir. An artisan in the old town make them, and the boutique downstairs sells the set.",
      "Please take this one with you, sir, and I will bring another set up for the room this afternoon.",
      "Phương án 'Please take this one' tự cho đi tài sản của phòng — việc không thuộc quyền nhân viên buồng, và khách sau sẽ thiếu đồ. Phương án 'An artisan… make them' sai chia động từ: chủ ngữ số ít 'an artisan' cần 'makes'. Câu đúng kể ngắn xuất xứ rồi chỉ lối mua.",
    ),
    round(
      1,
      "Is the bottled water free, or does it go on the bill like the minibar?",
      "The water is complimentary, madam, but for the minibar I will bring you the price list.",
      "Everything in this room are free, madam, so please enjoy anything you like from the fridge.",
      "Everything in this room is free, madam, so please enjoy anything you like from the fridge.",
      "Phương án 'Everything in this room is free' đoán giá thay khách sạn — minibar có tính tiền, và khách sẽ thấy trên hoá đơn. Phương án 'Everything… are free' đoán giá y như vậy, lại sai chia động từ: 'everything' đi với động từ số ít (is). Câu đúng chỉ nói điều chắc chắn, phần còn lại đưa bảng giá.",
    ),
  ],
});

const lesson4 = L(31, 4, "The Evening Ritual", "Nghi thức buổi tối", {
  vocabulary: [
    c("Ritual", "The evening ritual takes five minutes, and it ends with the bedside light on.", [
      "/ˈrɪtʃuəl/",
      "Nghi thức — việc làm theo cùng một cách mỗi tối",
      "🕯️",
    ]),
    c("Fold back", "We fold back one corner of the bed, so the guest finds it open in the dark.", [
      "/ˌfəʊld ˈbæk/",
      "Gấp mở một góc chăn cho khách lên giường",
      "🛏️",
    ]),
    c("Bedside light", "The bedside light stays on, and everything else in the room is dark.", [
      "/ˈbedsaɪd ˌlaɪt/",
      "Đèn ngủ đầu giường",
      "💡",
    ]),
    c("Decline", "Many guests decline the evening service, and that is fine.", [
      "/dɪˈklaɪn/",
      "Từ chối một dịch vụ",
      "✋",
    ]),
    c("Room safe", "The room safe is the guest's to use, and we never put anything in it.", [
      "/ˈruːm ˌseɪf/",
      "Két sắt trong phòng của khách",
      "🔐",
    ]),
  ],
  grammar: [
    g(
      "Turndown is standard. We come at seven, every night.",
      "We fold back the bed between six and eight, sir, unless you would rather we did not.",
      "Mệnh đề 'unless you would rather…' trao quyền từ chối ngay trong lời giới thiệu. Sau 'would rather + chủ ngữ', động từ lùi về quá khứ dù đang nói về hiện tại: we did not, không phải we do not.",
      "We fold back the bed between six and eight, sir, unless you would rather we do not.",
    ),
    g(
      "Why you don't want it? It is a free service.",
      "Of course, madam. I will mark the room as no turndown for the whole stay.",
      "Khách từ chối thì nhận ngay và ghi cho cả kỳ lưu trú; hỏi 'vì sao' biến lời từ chối thành tranh luận. Sau 'will' là động từ nguyên mẫu: will mark.",
      "Of course, madam. I will marked the room as no turndown for the whole stay.",
    ),
  ],
  speaking: [
    sp(
      "Someone came into our room while we were at dinner. What was that?",
      t4a,
      "Khách hỏi vì đang lo. Nói đó là việc gì, rồi kể ba việc cụ thể trong một câu: 'fold back', 'bedside light', nước uống. 'Ritual' /ˈrɪtʃuəl/ — ba âm tiết.",
    ),
    {
      ...sp(
        "But my papers on the desk are not where I left them.",
        t4b,
        "Khách nói đồ bị xê dịch thì bạn không đứng một mình trong cuộc nói chuyện đó: gọi giám sát ngay, cùng xem báo cáo phòng. Không chối, không giải thích dài.",
        undefined,
        undefined,
        t4a,
      ),
      alsoAccept: [
        "I am sorry, sir. I am asking my supervisor to come now, and we will check the room report with you.",
      ],
    },
    sp(
      "All right. And from now on, please, nobody in the room after six.",
      t4c,
      "Nhận lời ngay, ghi cho cả kỳ lưu trú, và nói ai sẽ được báo. 'Myself' cuối câu là lời cam kết cá nhân.",
      undefined,
      undefined,
      t4b,
    ),
    {
      ...sp(
        "Do we have to have the evening service? We often go to bed early.",
        "Not at all, madam. Many guests decline it, so I will mark your room as no turndown.",
        "'Decline' /dɪˈklaɪn/ — nhấn âm tiết sau. Câu ghép với 'so': nhiều khách cũng vậy → bạn ghi lại ngay.",
      ),
      alsoAccept: ["No, madam. Many guests decline it, so I will mark your room as no turndown."],
    },
    risk({
      ...sp(
        "Could you put my passport and this cash in the room safe for me?",
        "I am sorry, sir, I cannot take your valuables. The room safe is in the wardrobe, and I can show you how it works.",
        "Đồ giá trị của khách: không cầm, không cất hộ, không di chuyển — kể cả khi khách nhờ. Từ chối việc cầm đồ, rồi chỉ cách dùng két. 'Valuables' /ˈvæljuəblz/.",
      ),
      alsoAccept: [
        "I am sorry, sir, I cannot take your valuables, but I can show you how the room safe works.",
        "I am afraid I cannot take your valuables, sir. I can show you how the room safe works.",
      ],
    }),
    sp(
      "1105 is a stayover, and they declined turndown last night. Do I skip it tonight as well?",
      "Yes, skip it. They declined it for the whole stay, and it is on the turndown list.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Lời từ chối của khách có hiệu lực cả kỳ lưu trú, và nằm trên danh sách turndown.",
      "colleague",
    ),
  ],
  reading: read(
    `THE EVENING SERVICE — WHAT WE DO, AND WHAT WE NEVER DO
Knock and announce in the evening as you do in the morning: two knocks, wait, then a second round. "Good evening — housekeeping, turndown service."
Between six and eight, the attendant folds back one corner of the bed and closes the curtains. The bedside light goes on, the slippers go by the bed, and the water is refreshed.
What we never do in the evening: move a guest's belongings, open a suitcase, or tidy papers into a pile. Money, a passport or jewellery is left exactly where it is.
If a guest asks you to put valuables in the room safe, show them how the safe works, but never take the items yourself.
If an occupied room shows Do Not Disturb, the service does not happen. After six, nothing is slipped under the door, because the paper and the corridor light can wake a sleeping guest. Put the room on the turndown list instead.
The ritual is older than this hotel. Hotels once turned the bed down so a guest could find it open in the dark, and guests still remember it.
A guest may decline the ritual for one night or for the whole stay. Mark it once, and make sure the next team reads it.
Your own hotel's hours may differ, so ask your Floor Supervisor.`,
    [
      {
        q: "Khách nhờ cất hộ chiếu và tiền vào két thì làm gì?",
        options: [
          "Cất giúp ngay, rồi ghi lại giờ cất vào báo cáo phòng",
          "Chỉ cho khách cách dùng két, nhưng không tự tay cầm hộ chiếu hay tiền của khách",
          "Gọi giám sát tầng lên để cất hộ thay cho mình",
        ],
        correct: 1,
        explanation:
          "'show them how the safe works, but never take the items yourself' — đồ giá trị của khách không qua tay nhân viên buồng, kể cả khi khách nhờ.",
      },
      {
        q: "Buổi tối, phòng treo biển Do Not Disturb thì sao?",
        options: [
          "Vẫn luồn một tờ ghi chú xuống khe cửa, giống hệt như buổi sáng",
          "Không phục vụ, không luồn giấy, ghi vào danh sách turndown",
          "Gõ cửa thật nhẹ một lần để hỏi xem khách có cần gì thêm không",
        ],
        correct: 1,
        explanation:
          "'the service does not happen… nothing is slipped under the door… Put the room on the turndown list instead' — giấy và ánh đèn hành lang có thể đánh thức khách.",
      },
      {
        q: "Buổi tối, nhân viên KHÔNG được làm gì?",
        options: [
          "Bật đèn ngủ đầu giường và kéo rèm cửa sổ lại",
          "Xếp gọn giấy tờ của khách thành một chồng",
          "Thay nước uống và đặt đôi dép cạnh giường ngủ",
        ],
        correct: 1,
        explanation:
          "'What we never do in the evening: … tidy papers into a pile' — giúp xếp gọn trông giống hệt lục đồ, và khách mất dấu giấy tờ của mình.",
      },
    ],
  ),
  game: [
    round(
      2,
      "What exactly happens in our room while we are out at dinner?",
      "We fold back the bed, close the curtains and switch on the bedside light, madam — about five minutes.",
      "We fold back the bed, close the curtains and switch on the bedside light, madam — about five minute.",
      "We tidy the whole room again, madam, and put your papers and other things away neatly for you.",
      "Phương án 'put your papers… away' làm đúng điều buổi tối không bao giờ làm: di chuyển đồ của khách. Phương án 'five minute' thiếu -s số nhiều sau số đếm (five minutes). Câu đúng kể ba việc cụ thể và thời gian.",
    ),
    round(
      0,
      "Please, no one in our room in the evenings. Our baby is asleep by seven.",
      "Of course, sir — no turndown for the rest of your stay, and I will tell the evening team myself.",
      "Of course, sir — no turndown for the rest of your stay, and I will telling the evening team myself.",
      "No problem, sir — we will just come a little earlier instead, before the baby goes to sleep.",
      "Phương án 'come a little earlier instead' gạt lời từ chối của khách để giữ lịch của mình. Phương án 'will telling' sai: sau 'will' là động từ nguyên mẫu (will tell). Câu đúng nhận ngay và nói ai sẽ được báo.",
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: kể ngắn, đúng sự thật câu chuyện của đồ vải, mùi hương và đồ dùng trong phòng bằng câu ghép hai–ba vế có tính từ cảm xúc; nói món nào khách được giữ, món nào ở lại phòng; nhận ngay lời từ chối dịch vụ buổi tối; và từ chối cất hộ đồ giá trị mà vẫn chỉ khách cách dùng két.",
};
