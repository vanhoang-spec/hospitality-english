// SW week 34 — Special occasions and surprises: finding the occasion,
// working with other teams, and the formal words at the moment. Hand-authored
// Phase 4, see ../kit.ts.
//
// A celebration changes nothing about the rules, and every lesson below
// meets one of them on the way: another team's time is asked for, not
// promised ("I will ask the kitchen and come back to you by five"); an
// allergy goes to the kitchen IN WRITING; champagne is served after the heat,
// never before it; a free bottle or a free cake is the manager's decision; a
// caller who wants a guest's room number for a surprise is not given it, and
// is not told whether the guest is staying; flowers mean asking about pollen
// first; and a surprise massage for a mother-to-be still waits for the
// manager. The wishes are formal and short, then the team steps back.
import type { AuthoredWeek } from "../kit";
import { cardsFor, lessonsFor, risk } from "../kit";
import { game, g, read, sp } from "../../phase0";

const c = cardsFor("SW");
const L = lessonsFor("SW");

// ── Lesson 1 — Finding out the occasion ────────────────────────────────
const t1a = "Of course, sir. May I ask if you are celebrating a special occasion?";
const t1b =
  "How wonderful, sir. Would you like some rose petals in the couple's suite for your anniversary?";

const lesson1 = L(34, 1, "Finding Out the Occasion", "Tìm hiểu dịp đặc biệt của khách", {
  vocabulary: [
    c("Occasion", "A birthday is a special occasion for many guests.", [
      "/əˈkeɪʒn/",
      "Dịp (đặc biệt)",
      "🎉",
    ]),
    c("Anniversary", "They are celebrating their tenth wedding anniversary.", [
      "/ˌænɪˈvɜːsəri/",
      "Ngày kỷ niệm (ngày cưới…)",
      "💍",
    ]),
    c("Honeymoon", "The couple are on their honeymoon in Vietnam.", [
      "/ˈhʌnimuːn/",
      "Tuần trăng mật",
      "🌙",
    ]),
    c("Celebrate", "Many families celebrate a birthday with a spa afternoon.", [
      "/ˈselɪbreɪt/",
      "Ăn mừng, kỷ niệm",
      "🥂",
    ]),
  ],
  grammar: [
    g(
      "You celebrate something?",
      "May I ask if you are celebrating a special occasion, madam?",
      "Câu hỏi gián tiếp 'May I ask if…' — sau 'if' giữ trật tự câu kể: 'you are celebrating', không đảo 'are you'. Tế nhị khi hỏi chuyện riêng.",
      "May I ask if are you celebrating a special occasion, madam?",
    ),
    g(
      "Your husband no like fuss? Okay.",
      "Of course, madam. We will keep the evening simple and discreet.",
      "Sau 'will' là động từ nguyên mẫu: 'will keep'. Khách đã nói không thích phô trương thì làm đúng như vậy.",
      "Of course, madam. We will keeping the evening simple and discreet.",
    ),
  ],
  speaking: [
    sp(
      "We would like a couple's massage on Saturday evening.",
      t1a,
      "Đặt lịch cho hai người: hỏi tế nhị bằng 'May I ask if' xem có dịp gì không — khách tự kể nếu muốn.",
    ),
    {
      ...sp(
        "Yes, it is our tenth wedding anniversary.",
        t1b,
        "Khách vừa kể dịp đặc biệt: mời một việc nhỏ, cụ thể, để khách quyết.",
        undefined,
        undefined,
        t1a,
      ),
      alsoAccept: [
        "How wonderful, sir. May we put some rose petals in the couple's suite for your anniversary?",
      ],
    },
    sp(
      "Yes, please, but keep it simple. My wife does not like a fuss.",
      "Of course, sir. We will keep it simple and discreet.",
      "Khách muốn kín đáo: hứa đúng điều đó, không thêm gì.",
      undefined,
      undefined,
      t1b,
    ),
    {
      ...sp(
        "We are on our honeymoon!",
        "Congratulations, madam! How can we make your honeymoon special at the spa?",
        "Chúc mừng ngắn, rồi hỏi khách muốn gì — chưa tự bày thêm.",
      ),
      alsoAccept: [
        "Congratulations, madam! How can we make your honeymoon special here at the spa?",
      ],
    },
    sp(
      "It is my mother's seventieth birthday next week.",
      "How lovely, madam. Would you like to celebrate with a spa afternoon for her and the family?",
      "Gợi ý một cách ăn mừng — một câu hỏi, khách quyết.",
    ),
    sp(
      "The couple in the suite at six are celebrating something. Do you know what?",
      "Yes, it is their anniversary, so please keep it discreet and put rose petals on the beds.",
      "Nói với đồng nghiệp — không dùng sir hay madam. Truyền đúng dịp, và đúng mong muốn kín đáo của khách.",
      "colleague",
    ),
  ],
  reading: read(
    `Mr Ortega calls the spa to book a couple's massage for Saturday evening. Minh takes the booking, and then he asks a careful question: may he ask if they are celebrating a special occasion? Mr Ortega laughs. It is their tenth wedding anniversary, but his wife does not like a fuss. Minh offers one small idea: rose petals in the couple's suite. Mr Ortega says yes, but only if it stays simple. Minh writes two notes on the booking: anniversary, and keep it discreet. On Saturday afternoon, he tells the two therapists about the note. Nobody sings, and nobody brings a big cake. When Mr and Mrs Ortega walk into the suite, they see the petals and two cups of warm ginger tea. Mrs Ortega smiles and holds her husband's hand. Later, on the comment card, she writes that the spa understood exactly what she wanted.`,
    [
      {
        q: "Minh tìm ra dịp đặc biệt của khách bằng cách nào?",
        options: [
          "Đọc ngày sinh trong hồ sơ của khách",
          "Hỏi tế nhị xem khách có dịp gì không",
          "Hỏi các kỹ thuật viên đã làm cho khách",
        ],
        correct: 1,
        explanation:
          "'he asks a careful question: may he ask if they are celebrating a special occasion?'",
      },
      {
        q: "Minh ghi chú gì vào lịch đặt?",
        options: [
          "Bánh kem lớn và nhạc chúc mừng lúc vào",
          "Giảm giá cho dịp kỷ niệm",
          "Kỷ niệm ngày cưới, và giữ kín đáo",
        ],
        correct: 2,
        explanation: "'Minh writes two notes on the booking: anniversary, and keep it discreet.'",
      },
      {
        q: "Vì sao không ai hát hay mang bánh lớn vào phòng?",
        options: [
          "Vì spa không có bánh vào buổi tối",
          "Vì vợ khách không thích phô trương",
          "Vì quản lý spa không cho phép làm vậy",
        ],
        correct: 1,
        explanation:
          "'his wife does not like a fuss' — dịch vụ cho dịp đặc biệt đi theo mong muốn của khách, không theo kịch bản của spa.",
      },
    ],
  ),
  game: [
    game(
      "We are here for something special this weekend.",
      "How lovely, madam. May I ask if you are celebrating a special occasion this weekend?",
      "Is it your birthday today, madam? May I ask how old are you this year?",
      "Is it your birthday today, madam? May I ask how old you are this year?",
      undefined,
      "Câu thứ hai sai trật tự: trong câu hỏi lồng sau 'May I ask', giữ trật tự câu kể 'how old you are'. Cả câu thứ hai lẫn câu thứ ba đều lịch sự về hình thức nhưng hỏi tuổi của khách — chuyện riêng khách không nói ra. Câu đúng hỏi mở, để khách tự kể.",
    ),
    game(
      "It is my wife's fiftieth birthday, but she does not want anyone to know.",
      "Certainly, sir. Nobody will mention her birthday, and the team will be discreet.",
      "Certainly, sir. Nobody will mentions her birthday, and the team will be discreet.",
      "How wonderful, sir! We will put a big birthday sign on the door of her treatment room.",
      undefined,
      "Câu thứ hai sai dạng: sau 'will' là động từ nguyên mẫu 'mention', không thêm -s. Câu thứ ba nhiệt tình nhưng làm đúng điều khách vừa nói là không muốn. Câu đúng hứa kín đáo như khách yêu cầu.",
    ),
  ],
});

// ── Lesson 2 — Working with other teams ────────────────────────────────
const t2a =
  "Of course, madam. I will coordinate the birthday cake with the kitchen, and I will come back to you by five.";
const t2b = "Thank you, madam. I will put the nut allergy in writing for the kitchen.";
const t2c = "I will ask my manager first, madam, and then I will call your room.";

const lesson2 = L(34, 2, "Working With Other Teams", "Phối hợp với các bộ phận khác", {
  vocabulary: [
    c("Coordinate", "I will coordinate with the kitchen for the cake.", [
      "/kəʊˈɔːdɪneɪt/",
      "Phối hợp",
      "🔗",
    ]),
    c("Rose petals", "Housekeeping will put rose petals on the bed.", [
      "/ˈrəʊz ˌpetlz/",
      "Cánh hoa hồng",
      "🌹",
    ]),
    c("Birthday cake", "The kitchen makes the birthday cake by six.", [
      "/ˈbɜːθdeɪ keɪk/",
      "Bánh sinh nhật",
      "🎂",
    ]),
    c("Housekeeping", "Housekeeping will decorate the room while the guests are at the spa.", [
      "/ˈhaʊskiːpɪŋ/",
      "Bộ phận buồng phòng",
      "🧹",
    ]),
    c("Decorate", "We can decorate the couple's suite with flowers.", [
      "/ˈdekəreɪt/",
      "Trang trí",
      "🎀",
    ]),
  ],
  grammar: [
    g(
      "Cake seven o'clock, no problem.",
      "I will ask the kitchen now and come back to you by five.",
      "Không hứa giờ thay bộ phận khác. 'I will ask… and come back to you by…' — hai động từ nguyên mẫu sau một 'will'.",
      "I will ask the kitchen now and coming back to you by five.",
    ),
    g(
      "Housekeeping make the room nice.",
      "I will ask Housekeeping to decorate the room before you return.",
      "'ask + người + to + động từ': 'ask Housekeeping to decorate'. Người Việt hay bỏ 'to'.",
      "I will ask Housekeeping decorate the room before you return.",
    ),
  ],
  speaking: [
    sp(
      "Can you put a birthday cake in our room after the massage?",
      t2a,
      "Việc của nhiều bộ phận: nói bạn sẽ phối hợp với ai, và khi nào bạn quay lại báo khách.",
    ),
    risk({
      ...sp(
        "Oh, and my husband is allergic to nuts.",
        t2b,
        "Dị ứng: ghi thành văn bản cho bếp, không truyền miệng, không hứa 'an toàn tuyệt đối'.",
        undefined,
        ["nut", "allergy", "writing"],
        t2a,
      ),
      alsoAccept: [
        "Thank you for telling me, madam. I will put the nut allergy in writing for the kitchen.",
        "Thank you, madam. I will put his nut allergy in writing for the kitchen.",
      ],
    }),
    {
      ...sp(
        "And can the cake be in our room at seven?",
        "I will ask the kitchen now and come back to you by five with their answer.",
        "Giờ giao bánh là của bếp: hỏi bếp, rồi quay lại báo khách — không tự hứa 'bảy giờ'.",
        undefined,
        undefined,
        t2b,
      ),
      alsoAccept: [
        "I will check with the kitchen now and come back to you by five with their answer.",
      ],
    },
    {
      ...sp(
        "Could Housekeeping decorate the room while we are at the spa?",
        "Yes, madam. I will ask Housekeeping to decorate the room, and I will confirm every detail with you.",
        "Nhờ đúng bộ phận ('ask Housekeeping to'), rồi hứa việc của bạn: xác nhận lại với khách.",
      ),
      alsoAccept: [
        "Yes, madam. I will ask Housekeeping to decorate the room, and I will check every detail with you.",
      ],
    },
    sp(
      "Housekeeping here. The couple's treatment ends at seven, right?",
      "Yes, at seven. Please have the rose petals ready before they come back.",
      "Nói với đồng nghiệp bộ phận khác — không dùng sir hay madam. Xác nhận giờ, rồi nói việc cần xong.",
      "colleague",
    ),
    risk({
      ...sp(
        "It is our honeymoon. Can you give us a free bottle of champagne?",
        t2c,
        "Quà có giá trị tiền là quyết định của quản lý. Hỏi quản lý trước, rồi gọi lại cho khách.",
        undefined,
        ["ask", "manager", "first", "call", "room"],
      ),
      alsoAccept: [
        "I will ask my manager first, madam, and then I will call you in your room.",
        "Let me ask my manager first, madam, and then I will call your room.",
      ],
    }),
    risk({
      ...sp(
        "And can we drink it in the couple's suite before the herbal bath?",
        "We will serve it after the herbal bath, madam, because alcohol before the heat is not safe.",
        "Rượu và nhiệt không đi cùng nhau — đúng luật phòng xông hơi đã học. Phục vụ SAU liệu trình nóng.",
        undefined,
        ["serve", "herbal", "bath", "alcohol", "heat"],
        t2c,
      ),
      alsoAccept: [
        "We will serve it after the herbal bath, madam, because alcohol before the heat is not safe for you.",
        "We can serve it after the herbal bath, madam, because alcohol before the heat is not safe.",
      ],
    }),
  ],
  reading: read(
    `Mrs Khan wants a surprise for her husband's birthday. After their afternoon massage, she would like a birthday cake in their room and some decoration. Ngoc at the spa desk cannot do this alone, so she coordinates with two teams. First, she calls the kitchen about the cake. Mrs Khan mentions that her husband is allergic to nuts, so Ngoc puts the allergy in writing on the kitchen order. She does not promise that the cake will be ready at seven. She asks the kitchen and comes back to Mrs Khan by five with their answer. Then she asks Housekeeping to decorate the room with rose petals while the couple are at the spa. Mrs Khan also asks for a free bottle of champagne before the herbal bath. Ngoc checks with her manager first. The manager agrees to a bottle as a gift, but the champagne is served after the treatment, because alcohol and heat are not safe together.`,
    [
      {
        q: "Ngọc báo dị ứng hạt cho bếp bằng cách nào?",
        options: [
          "Gọi điện và dặn đầu bếp thật kỹ nhiều lần",
          "Nhờ bà Khan tự nói với bếp",
          "Ghi dị ứng thành văn bản ngay trên phiếu đặt bánh gửi bếp",
        ],
        correct: 2,
        explanation:
          "'Ngoc puts the allergy in writing on the kitchen order' — dị ứng phải đến bếp bằng văn bản.",
      },
      {
        q: "Vì sao Ngọc không hứa bánh sẽ có lúc bảy giờ?",
        options: [
          "Vì giờ làm bánh là việc của bếp, nên Ngọc phải hỏi bếp trước",
          "Vì khách chưa trả tiền bánh sinh nhật",
          "Vì bếp đóng cửa lúc năm giờ chiều",
        ],
        correct: 0,
        explanation:
          "'She asks the kitchen and comes back to Mrs Khan by five with their answer' — không hứa giờ thay bộ phận khác.",
      },
      {
        q: "Ai quyết định tặng chai sâm panh, và nó được phục vụ khi nào?",
        options: [
          "Ngọc quyết, phục vụ trước khi ngâm bồn",
          "Quản lý quyết, phục vụ sau liệu trình",
          "Bếp quyết, phục vụ cùng bánh sinh nhật",
        ],
        correct: 1,
        explanation:
          "'The manager agrees to a bottle as a gift, but the champagne is served after the treatment, because alcohol and heat are not safe together.'",
      },
    ],
  ),
  game: [
    game(
      "Can Housekeeping put rose petals in our room before six?",
      "I will ask Housekeeping now, madam, and call you back by four.",
      "Yes, madam. The petals will definitely be there by six o'clock, I promises.",
      "Yes, madam. The petals will definitely be there by six o'clock, I promise.",
      undefined,
      "Câu thứ hai sai hoà hợp: chủ ngữ 'I' → 'promise', không thêm -s. Cả câu thứ hai lẫn câu thứ ba đều hứa giờ thay cho buồng phòng — nếu họ không kịp, lời hứa của bạn thành lời nói sai. Câu đúng hỏi buồng phòng và hẹn giờ gọi lại.",
    ),
    game(
      "Can we have a glass of wine in the steam room before our massage?",
      "We will serve the wine after the steam room, sir, because alcohol and heat are not safe together.",
      "We will serving the wine after the steam room, sir, because alcohol and heat are not safe together.",
      "Of course, sir. A glass of wine in the steam room is very relaxing.",
      undefined,
      "Câu thứ hai sai dạng: sau 'will' là động từ nguyên mẫu 'serve', không phải 'serving'. Câu thứ ba chiều khách nhưng cho rượu vào ngay trong nhiệt — không an toàn. Câu đúng giữ niềm vui của khách, chỉ đổi thời điểm.",
    ),
  ],
});

// ── Lesson 3 — The right words at the right moment ─────────────────────
const t3a =
  "Congratulations, madam! For a bride, we always do a patch test a few days before the facial.";
const t3b =
  "Even healthy skin can react to a new product, madam, and we want your wedding day to be perfect.";

const lesson3 = L(34, 3, "The Right Words at the Right Moment", "Lời chúc đúng lúc", {
  vocabulary: [
    c("Congratulate", "On behalf of the spa team, we congratulate you both.", [
      "/kənˈɡrætʃuleɪt/",
      "Chúc mừng (ai đó, một cách trang trọng)",
      "🎊",
    ]),
    c("On behalf of", "On behalf of the spa team, thank you for coming.", [
      "/ɒn bɪˈhɑːf əv/",
      "Thay mặt cho",
      "🤝",
    ]),
    c("Wishing you", "Wishing you both a very happy anniversary.", [
      "/ˈwɪʃɪŋ juː/",
      "Kính chúc quý khách…",
      "💐",
    ]),
    c("Bride", "The bride has a facial two days before the wedding.", ["/braɪd/", "Cô dâu", "👰"]),
  ],
  grammar: [
    g(
      "Wish you happy anniversary.",
      "Wishing you both a very happy anniversary, sir.",
      "Lời chúc trang trọng mở bằng 'Wishing you…' (hoặc 'We wish you…'). Mở câu bằng 'Wish you…' là lỗi dịch thẳng từ 'Chúc anh chị…'.",
      "Wish you both a very happy anniversary, sir.",
    ),
    g(
      "All team say congratulations.",
      "On behalf of the spa team, congratulations to you both.",
      "'On behalf of + người/nhóm' = thay mặt cho. Không bỏ 'of': 'on behalf the team' là sai.",
      "On behalf the spa team, congratulations to you both.",
    ),
  ],
  speaking: [
    sp(
      "I am getting married on Saturday, and I want perfect skin.",
      t3a,
      "Chúc mừng trước, rồi nói một bước an toàn: thử trên da vài ngày trước khi làm mặt.",
    ),
    sp(
      "Why? I have never had a problem with my skin.",
      t3b,
      "Giải thích lý do bằng điều khách quan tâm nhất: ngày cưới.",
      undefined,
      undefined,
      t3a,
    ),
    {
      ...sp(
        "That is very thoughtful. Thank you.",
        "On behalf of the spa team, we congratulate you, and we wish you a beautiful wedding day.",
        "Lời chúc trang trọng thay mặt cả đội spa: 'On behalf of'.",
        undefined,
        undefined,
        t3b,
      ),
      alsoAccept: [
        "On behalf of the spa team, we congratulate you, and we wish you a wonderful wedding day.",
      ],
    },
    {
      ...sp(
        "Thank you for a lovely evening.",
        "It was our pleasure, sir. Wishing you both a very happy anniversary.",
        "Khép lại bằng lời chúc ngắn và trang trọng, rồi để khách riêng tư.",
      ),
      alsoAccept: ["It was our pleasure, sir. We wish you both a very happy anniversary."],
    },
    sp(
      "My mother loved her birthday treatment.",
      "We are delighted, madam. Please give her our warmest wishes for her birthday.",
      "Đón lời khen bằng 'delighted', rồi gửi lời chúc tới người được kỷ niệm.",
    ),
    sp(
      "The honeymoon couple are leaving now. What will you say to them?",
      "I will thank them on behalf of the spa team and wish them a very happy marriage.",
      "Trả lời quản lý về lời bạn sẽ nói — câu tường thuật, không dùng sir hay madam với quản lý.",
      "manager",
    ),
  ],
  reading: read(
    `Ms Silva is getting married on Saturday, and she books a facial for Friday morning. When she calls on Monday, Diep says congratulations first. Then she explains a rule that every bride hears at the spa: a patch test a few days before the facial. Ms Silva is surprised, because she has never had a problem with her skin. Diep explains that even healthy skin can react to a new product, and nobody wants a red face in the wedding photos. Ms Silva comes in on Tuesday for the patch test, and her skin has no reaction. On Friday, the facial goes well. As Ms Silva leaves, Diep and the therapist walk her to the door. On behalf of the spa team, Diep congratulates her and wishes her a beautiful wedding day. Then they step back and let her go. A week later, a card arrives at the spa with a wedding photo and two words: thank you.`,
    [
      {
        q: "Vì sao cô dâu phải thử trên da vài ngày trước khi làm mặt?",
        options: [
          "Vì da cô ấy từng bị dị ứng trước đây",
          "Vì ngay cả da khoẻ vẫn có thể phản ứng với một sản phẩm mới",
          "Vì spa cần thời gian chuẩn bị sản phẩm",
        ],
        correct: 1,
        explanation:
          "'even healthy skin can react to a new product' — đó là lý do có bước thử trên da cho mọi cô dâu.",
      },
      {
        q: "Lời chúc của Điệp được nói khi nào?",
        options: [
          "Lúc khách gọi điện đặt lịch",
          "Giữa buổi chăm sóc da mặt",
          "Khi tiễn khách ra cửa",
        ],
        correct: 2,
        explanation:
          "'As Ms Silva leaves, Diep and the therapist walk her to the door. On behalf of the spa team, Diep congratulates her…'",
      },
      {
        q: "Sau lời chúc, nhân viên làm gì?",
        options: [
          "Lùi lại và để khách đi",
          "Mời khách đặt thêm liệu trình",
          "Xin chụp ảnh cùng cô dâu",
        ],
        correct: 0,
        explanation:
          "'Then they step back and let her go' — lời chúc trang trọng, ngắn, rồi để khách riêng tư.",
      },
    ],
  ),
  game: [
    game(
      "We are getting married tomorrow!",
      "On behalf of the spa team, congratulations to you both.",
      "On behalf the spa team, congratulations to you both.",
      "Really? You both look far too young to get married, if I may say so, madam.",
      undefined,
      "Câu thứ hai thiếu 'of': phải là 'On behalf of'. Câu thứ ba nghe như lời khen nhưng bàn về tuổi và vẻ ngoài của khách — không hợp lúc chúc mừng. Câu đúng chúc trang trọng thay mặt cả đội.",
    ),
    game(
      "Thank you for making our anniversary so special.",
      "It was our pleasure, sir. Wishing you both a very happy anniversary. We hope to see you again.",
      "No problem, sir. Please leaving us a good review on the hotel website.",
      "No problem, sir. Please leave us a good review on the hotel website.",
      undefined,
      "Câu thứ hai sai dạng: sau 'Please' là động từ nguyên mẫu 'leave', không phải 'leaving'. Cả câu thứ hai lẫn câu thứ ba đều biến lời cảm ơn của khách thành lời xin đánh giá. Câu đúng nhận lời cảm ơn và chúc trang trọng bằng 'Wishing you…'.",
    ),
  ],
});

// ── Lesson 4 — When a surprise needs care ──────────────────────────────
const t4a = "I am sorry, madam. I cannot tell you the room number of any guest.";
const t4b =
  "I understand, madam. You can leave a gift at reception, and we will pass it on if she is a guest.";

const lesson4 = L(34, 4, "When a Surprise Needs Care", "Khi điều bất ngờ cần cẩn trọng", {
  vocabulary: [
    c("Surprise", "Her husband booked the massage as a surprise.", [
      "/səˈpraɪz/",
      "Điều bất ngờ; làm ai bất ngờ",
      "🎁",
    ]),
    c("Discreet", "Please be discreet: the guest does not know about the surprise.", [
      "/dɪˈskriːt/",
      "Kín đáo, tế nhị",
      "🤫",
    ]),
    c("Pollen", "Some guests are allergic to the pollen in lilies.", [
      "/ˈpɒlən/",
      "Phấn hoa",
      "🌼",
    ]),
    c("Mother-to-be", "Before a massage for a mother-to-be, the manager checks the form.", [
      "/ˌmʌðə tə ˈbiː/",
      "Người mẹ đang mang thai",
      "🤰",
    ]),
  ],
  grammar: [
    g(
      "Room number? Sorry, secret.",
      "I am sorry, madam. I cannot tell you the room number of any guest.",
      "Riêng tư: không đọc số phòng, không xác nhận ai đang ở. Sau 'cannot' là động từ nguyên mẫu 'tell'.",
      "I am sorry, madam. I cannot telling you the room number of any guest.",
    ),
    g(
      "Your wife allergy flower?",
      "May I ask if your wife has any allergy to pollen, sir?",
      "Hỏi về dị ứng trước khi mang hoa vào phòng. Sau 'if' giữ trật tự câu kể: 'your wife has'; 'allergy to', không phải 'allergy with'.",
      "May I ask if your wife has any allergy with pollen, sir?",
    ),
  ],
  speaking: [
    risk({
      ...sp(
        "My friend is staying at your hotel. Can you tell me her room number? I want to surprise her.",
        t4a,
        "Không đọc số phòng, không xác nhận người đó có đang ở hay không — kể cả khi là quà bất ngờ.",
        undefined,
        ["tell", "room", "number", "guest"],
      ),
      alsoAccept: [
        "I am sorry, madam. I cannot give you the room number of any guest.",
        "I am sorry, madam, but I cannot tell you the room number of any guest.",
      ],
    }),
    {
      ...sp(
        "But it is a surprise for her birthday!",
        t4b,
        "Từ chối xong thì cho khách một cách khác: để quà ở lễ tân — vẫn không xác nhận người đó có ở đây.",
        undefined,
        undefined,
        t4a,
      ),
      alsoAccept: [
        "I understand, madam. You can leave a gift at reception, and we will give it to her if she is a guest.",
      ],
    },
    sp(
      "Can the gift be a spa voucher?",
      "Of course, madam. I can prepare a spa voucher, and you can leave it at reception with her name.",
      "Phiếu dịch vụ spa làm quà được — nhưng vẫn để ở lễ tân theo tên, không mang lên phòng.",
      undefined,
      undefined,
      t4b,
    ),
    risk({
      ...sp(
        "I want to fill the treatment room with lilies as a surprise for my wife.",
        "That is a lovely surprise, sir. May I ask if your wife has any allergy to pollen?",
        "Hoa trong phòng trị liệu: hỏi dị ứng phấn hoa TRƯỚC. Khen ý tưởng, rồi hỏi tế nhị bằng 'May I ask if'.",
        undefined,
        ["surprise", "ask", "allergy", "pollen"],
      ),
      alsoAccept: [
        "What a lovely surprise, sir. May I ask if your wife has any allergy to pollen?",
        "That is a lovely surprise, sir. May I ask if your wife has an allergy to pollen?",
      ],
    }),
    risk({
      ...sp(
        "I am pregnant, and my husband booked a surprise massage for me.",
        "Congratulations, madam. I will check with my manager first.",
        "Món quà bất ngờ không thay đổi luật: khách mang thai thì hỏi quản lý trước khi bắt đầu.",
        undefined,
        ["check", "manager", "first"],
      ),
      alsoAccept: [
        "Congratulations, madam. Let me check with my manager first.",
        "Congratulations, madam. I will ask my manager first.",
      ],
    }),
    sp(
      "Is the surprise massage for the guest in room five ready?",
      "Not yet. She is a mother-to-be, so the manager is checking her form first.",
      "Nói với đồng nghiệp — không dùng sir hay madam. Nêu lý do chưa sẵn sàng: quản lý đang xem phiếu.",
      "colleague",
    ),
    {
      ...sp(
        "Please do not tell my wife. It is a surprise.",
        "Of course, sir. We will be discreet, and she will not hear anything from us.",
        "Hứa kín đáo bằng 'discreet', rồi nói rõ điều đó nghĩa là gì.",
      ),
      alsoAccept: ["Of course, sir. We will be discreet, and she will hear nothing from us."],
    },
  ],
  reading: read(
    `On Wednesday morning, a woman calls the spa desk. She says her friend is staying at the hotel, and she wants the room number for a birthday surprise. Quan says he cannot give out the room number of any guest. He does not say whether the friend is staying or not. Instead, he suggests a spa voucher that the caller can leave at reception with her friend's name. In the afternoon, Mr Jensen comes to the desk with a plan. He wants to fill the treatment room with lilies as a surprise for his wife. Quan says it is a lovely idea, and then he asks if Mrs Jensen has any allergy to pollen. Mr Jensen is not sure, so they choose a few roses on the table instead. Mr Jensen also mentions that his wife is pregnant. Quan checks with his manager first, and the manager chooses a gentle massage for a mother-to-be. Quan promises to be discreet, and Mrs Jensen has no idea until she walks in.`,
    [
      {
        q: "Khi người gọi điện hỏi số phòng của bạn mình, Quân làm gì?",
        options: [
          "Không cho số phòng, cũng không nói người bạn có đang ở khách sạn hay không",
          "Cho số phòng vì đó là quà sinh nhật bất ngờ",
          "Hứa sẽ mang quà lên tận phòng",
        ],
        correct: 0,
        explanation:
          "'Quan says he cannot give out the room number of any guest. He does not say whether the friend is staying or not.'",
      },
      {
        q: "Vì sao cuối cùng phòng chỉ có vài bông hồng trên bàn?",
        options: [
          "Vì hoa ly đắt hơn hoa hồng rất nhiều",
          "Vì chưa rõ bà có dị ứng phấn hoa",
          "Vì spa không cho mang hoa vào phòng",
        ],
        correct: 1,
        explanation:
          "'he asks if Mrs Jensen has any allergy to pollen. Mr Jensen is not sure, so they choose a few roses…'",
      },
      {
        q: "Ai chọn liệu trình cho bà Jensen?",
        options: [
          "Ông Jensen, theo kế hoạch bất ngờ",
          "Quân, theo thực đơn của spa",
          "Quản lý, vì bà đang mang thai",
        ],
        correct: 2,
        explanation:
          "'Quan checks with his manager first, and the manager chooses a gentle massage for a mother-to-be.'",
      },
    ],
  ),
  game: [
    game(
      "Is Ms Tanaka staying with you? I want to send her flowers.",
      "I am sorry, sir. I cannot say who is staying with us, but you can leave flowers at reception.",
      "I am sorry, sir. I cannot saying who is staying with us, but you can leave flowers at reception.",
      "Yes, sir. She is in room five hundred, and she comes to the spa every morning.",
      undefined,
      "Câu thứ hai sai dạng: sau 'cannot' là động từ nguyên mẫu 'say'. Câu thứ ba thân thiện nhưng tiết lộ số phòng và thói quen của khách cho một người gọi điện — vi phạm quyền riêng tư và an toàn của khách. Câu đúng không xác nhận gì và cho một cách khác.",
    ),
    game(
      "My husband filled the room with lilies. Are they all right for the massage?",
      "They are beautiful, madam. May I ask if you have any allergy to pollen first?",
      "They are beautiful, madam, and flowers is natural, so they are fine for every guest.",
      "They are beautiful, madam, and flowers are natural, so they are fine for every guest.",
      undefined,
      "Câu thứ hai sai hoà hợp: 'flowers' số nhiều → 'are', không phải 'is'. Cả câu thứ hai lẫn câu thứ ba đều cho rằng tự nhiên là an toàn — phấn hoa là nguyên nhân dị ứng phổ biến. Câu đúng khen, rồi hỏi về dị ứng trước.",
    ),
  ],
});

export const week: AuthoredWeek = {
  title: { en: "Special Occasions", vi: "Dịp đặc biệt và bất ngờ cho khách" },
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: hỏi tế nhị 'May I ask if…' để biết dịp đặc biệt, phối hợp với bếp và buồng phòng mà không hứa giờ thay họ ('I will ask… and come back to you by…'), chúc trang trọng ('On behalf of the spa team…', 'Wishing you…') — và giữ luật khi làm bất ngờ: dị ứng ghi giấy cho bếp, rượu sau liệu trình nóng, quà miễn phí do quản lý quyết, không đọc số phòng, hỏi dị ứng phấn hoa, khách mang thai hỏi quản lý trước.",
};
