// GR week 34 — special occasions and surprises.
//
// Rewritten from scratch after the first blind round of the reopened
// Phase 4 (7ed3254). The old week was a generation behind the rest: one
// spoken turn a lesson, helpTips in English, American spelling, and three
// lines that broke rules the weeks around it teach — "are you newlyweds,
// perhaps?" guessed a relationship from a bouquet (the advice week forbids
// asking about who a guest arrived with), a game key swapped the cake flavour
// and told the guest afterwards (the advice week says the decision is the
// guest's), and a model promised "five minutes" on the kitchen's behalf while
// its own reading said ten. Now:
//  · an occasion is asked about through the STAY ("Is Saturday a special
//    occasion?"), never guessed from the person, and it goes on the file only
//    with a yes;
//  · a surprise belongs to the guest who planned it, and is coordinated on a
//    run sheet: one line per team, each with a timing; room access only once
//    the room is empty, at the time the guest gave;
//  · the kitchen is asked about allergies before a cake is ordered;
//  · the formal wish is taught as a set phrase ("On behalf of everyone at the
//    hotel, warmest congratulations on…", "Many happy returns");
//  · when it goes wrong, replacing what failed is yours, a different choice is
//    the guest's, the only time you promise is your own, and anything on top
//    is the manager's (a gift) or the Duty Manager's (money off the bill).
import type { GameRound, SpeakingItem } from "../../week-content";
import { g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("GR");
const L = lessonsFor("GR");

/** A turn with the other wordings the course accepts for it. */
const also = (s: SpeakingItem, ...alsoAccept: string[]): SpeakingItem => ({ ...s, alsoAccept });

type Kind = "answer" | "form" | "register";
/** One arcade round, options in the order written: `form` is broken English,
 *  `register` is correct English that is wrong for the job. */
const round = (
  prompt: string,
  options: [string, Kind][],
  explanation: string,
  speakerRole?: GameRound["speakerRole"],
): GameRound => ({
  prompt,
  ...(speakerRole ? { speakerRole } : {}),
  options: options.map(([text, kind]) => ({ text, correct: kind === "answer", kind })),
  explanation,
});

// ── Lesson 1 — noticing the occasion ───────────────────────────────────────
const t1a = "With pleasure, sir. May I ask if Saturday is a special occasion?";
const t1b =
  "What a lovely milestone, sir. Would you like to keep it a surprise, so I speak only to you?";
const t1c = "Of course, sir. Before I order it, does anyone at the table have an allergy?";

// ── Lesson 2 — one surprise, four teams ────────────────────────────────────
const t2a =
  "As soon as they leave for dinner, please. I will coordinate the timing on the run sheet.";
const t2b =
  "White is fine, thank you. Please go in only once the room is empty, and tell me when you finish.";
const t2c =
  "The housekeeping supervisor has room access for the set-up, and I will check the room before they return.";
const t2d =
  "Then stop, leave the room quietly, and call me at once. I will keep the guests busy in the lounge.";

// ── Lesson 3 — words for the moment ────────────────────────────────────────
const t3a =
  "It is, madam. On behalf of everyone at the hotel, warmest congratulations on your anniversary.";
const t3b =
  "It is our pleasure, madam. We hope it makes this evening as memorable as the day itself.";
const t3c = "With pleasure, madam, on your own phone. Shall I take one by the window as well?";

// ── Lesson 4 — when the surprise goes wrong ────────────────────────────────
const t4a =
  "I am so sorry about the mix-up, sir. I am asking the pastry chef for a replacement now.";
const t4b = "I will come back to you before dessert, sir, with an answer from the pastry chef.";
const t4c = "Of course, sir. I will be discreet, and I will reprint the card myself.";

const lessons = [
  L(34, 1, "Noticing the Occasion", "Nhận ra dịp đặc biệt — hỏi về kỳ nghỉ", {
    vocabulary: [
      c("Occasion", "May I ask if Saturday is a special occasion, madam?", [
        "/əˈkeɪʒn/",
        "dịp (lễ, kỷ niệm)",
        "🎉",
      ]),
      c("Celebrating", "Are you celebrating anything special during your stay, sir?", [
        "/ˈselɪbreɪtɪŋ/",
        "đang ăn mừng, kỷ niệm",
        "🥂",
      ]),
      c("Milestone", "A fortieth birthday is a lovely milestone, madam.", [
        "/ˈmaɪlstəʊn/",
        "cột mốc đáng nhớ trong đời",
        "🏁",
      ]),
      c("Keep it a surprise", "Would you like to keep it a surprise, sir?", [
        "/kiːp ɪt ə səˈpraɪz/",
        "giữ bí mật để tạo bất ngờ",
        "🤫",
      ]),
    ],
    grammar: [
      g(
        "Is this your honeymoon?",
        "Are you celebrating anything special during your stay, madam?",
        "Hỏi về KỲ NGHỈ, không đoán về con người: đừng suy ra 'trăng mật' từ một bó hoa. Hiện tại tiếp diễn: 'Are you celebrating', không phải 'Are you celebrate'.",
        "Are you celebrate anything special during your stay, madam?",
      ),
      g(
        "I will tell your husband about the cake.",
        "Would you like to keep it a surprise, madam? Then I will speak only to you.",
        "Bất ngờ là của người lên kế hoạch — hỏi họ có muốn giữ bí mật không, và chỉ liên lạc với chính họ. 'Would you like TO + động từ nguyên mẫu'.",
        "Would you like keep it a surprise, madam? Then I will speak only to you.",
      ),
    ],
    speaking: [
      also(
        sp(
          "Could you help us with a nice table for Saturday evening?",
          t1a,
          "Hỏi về DỊP của buổi tối, không hỏi về con người: 'a special occasion'. Đặt bàn vẫn là việc của concierge — câu hỏi này giúp bạn gợi ý đúng.",
          undefined,
          ["special"],
        ),
        "Of course, sir. May I ask if Saturday is a special occasion?",
      ),
      sp(
        "Actually, it is my wife's fortieth. But please keep it quiet.",
        t1b,
        "Chúc mừng bằng một tính từ cảm xúc ('lovely milestone'), rồi hỏi có giữ bí mật không: 'keep it a surprise'. Từ giờ chỉ liên lạc với chính người lên kế hoạch.",
        undefined,
        undefined,
        t1a,
      ),
      risk(
        also(
          sp(
            "Yes, please. Something small — a cake, perhaps.",
            t1c,
            "Hỏi dị ứng TRƯỚC khi đặt bánh, cho mọi người ở bàn — rồi viết phiếu cho bếp bánh. Đừng hứa bánh 'an toàn tuyệt đối'.",
            undefined,
            ["table", "allergy"],
            t1b,
          ),
          "Of course, sir. Before I order it, does anybody at the table have an allergy?",
          "Of course, sir. Before I order the cake, does anyone at the table have an allergy?",
          "Of course, sir. Before I order it, does anyone at the table have any allergies?",
          "Of course, sir. Before I order it, may I ask about allergies at the table? I will write an allergy slip for the pastry chef.",
        ),
      ),
      sp(
        "The couple in 812 have a big bouquet. Shall I send up a honeymoon cake?",
        "Not from a bouquet. Ask if they are celebrating anything during their stay, and plan based on that.",
        "ĐỒNG NGHIỆP hỏi. Một bó hoa không cho bạn biết hai người là ai của nhau. Hỏi về kỳ nghỉ — 'celebrating anything' — rồi lên kế hoạch 'based on that': dựa trên câu trả lời.",
        "colleague",
      ),
      also(
        sp(
          "How did you know it was our anniversary?",
          "You mentioned it on your last stay, madam, and you were happy for us to keep it on file.",
          "Khách ngạc nhiên vì được nhớ: nói thật bạn biết từ ĐÂU — từ chính lời khách, có xin phép. Đừng để khách nghĩ khách sạn tự dò ra.",
        ),
        "You told us on your last stay, madam, and you were happy for us to keep it on file.",
      ),
      also(
        sp(
          "We are celebrating our tenth anniversary tonight!",
          "Congratulations to you both, madam! May I arrange something tailor-made to make the evening special?",
          "Chúc mừng trước, hỏi sau. 'May I arrange' là một câu HỎI — khách chọn, 'tailor-made' theo đúng ý khách; đừng tự gửi quà lên phòng.",
        ),
        "Congratulations to you both, madam! Is there anything we can arrange to make the evening special?",
      ),
    ],
    reading: read(
      `NOTICING THE OCCASION
Most occasions arrive quietly: a cake asked for at dinner, a table for "something special", a guest who mentions a date. Your job is to notice, and then to ask about the stay, never about the person.
"Is Saturday a special occasion, madam?" asks about the stay. "Is this your honeymoon?" guesses who somebody is, and a wrong guess can spoil the trip it was meant to celebrate.
When a guest tells you, celebrate with them: "What a lovely milestone!" Then ask one more question: "Would you like to keep it a surprise?" A surprise belongs to the guest who planned it. Speak only to that guest about it.
Before anything is ordered from the kitchen, ask about allergies for everyone at the table, and write an allergy slip for the pastry chef.
An occasion goes on the guest file only if the guest says yes. A guest who is surprised that you remembered should hear how you knew: "You mentioned it on your last stay."`,
      [
        {
          q: "Câu nào hỏi về KỲ NGHỈ chứ không đoán về con người?",
          options: [
            "'Is this your honeymoon?'",
            "'Is Saturday a special occasion, madam?'",
            "'Are you two here for your honeymoon, perhaps?'",
          ],
          correct: 1,
          explanation: `Bài đọc: "Is Saturday a special occasion, madam?" là câu hỏi về kỳ nghỉ; đoán trăng mật là đoán về con người.`,
        },
        {
          q: "Khách muốn giữ bí mật bữa tối bất ngờ cho vợ. Bạn liên lạc với ai?",
          options: [
            "Chỉ với vị khách đã lên kế hoạch, vì bất ngờ thuộc về chính người đó",
            "Với cả hai vợ chồng, để không ai bị bất ngờ quá",
            "Với bất kỳ ai nghe máy ở phòng",
          ],
          correct: 0,
          explanation: `Bài đọc: "A surprise belongs to the guest who planned it. Speak only to that guest about it."`,
        },
        {
          q: "Trước khi đặt bánh với bếp, phải làm gì?",
          options: [
            "Báo giá bánh cho khách",
            "Ghi ngay dịp kỷ niệm vào hồ sơ khách để ca sau biết",
            "Hỏi về dị ứng của mọi người ở bàn, rồi viết phiếu dị ứng cho bếp bánh",
          ],
          correct: 2,
          explanation: `Bài đọc: "Before anything is ordered from the kitchen, ask about allergies for everyone at the table"`,
        },
      ],
    ),
    game: [
      round(
        "We are here for our honeymoon, actually!",
        [
          [
            "I thought so, madam — I noticed the bouquet at check-in. Shall I send up our honeymoon cake?",
            "register",
          ],
          [
            "Congratulations to you both, madam! Is there anything we can arrange for you?",
            "answer",
          ],
          [
            "I thought so, madam — I notice the bouquet at check-in. Shall I send up our honeymoon cake?",
            "form",
          ],
        ],
        "Câu này thú nhận đã đoán từ bó hoa, rồi còn tự gửi bánh lên — vừa đoán về con người vừa chốt hộ khách. Câu sai ngữ pháp cũng đoán rồi chốt hộ y như thế, lại sai thì: việc đã xảy ra lúc nhận phòng phải là 'I noticed', không phải 'I notice'. Đáp án chúc mừng rồi hỏi khách muốn gì.",
      ),
      round(
        "A couple just checked in with a big bouquet. Shall I write 'honeymoon' on their file?",
        [
          [
            "No. Ask about their stay, and write only what they tell us, in their own words.",
            "answer",
          ],
          ["Yes — a bouquet like that almost always means a honeymoon.", "register"],
          ["No. Ask about their stay, and write only what they tells us.", "form"],
        ],
        "Câu này ghi một phỏng đoán về con người vào hồ sơ — hồ sơ chỉ ghi điều khách nói và cho phép. Câu sai ngữ pháp dùng 'they tells'; với 'they' động từ không thêm -s. Đáp án: hỏi về kỳ nghỉ, chỉ ghi lời khách.",
        "colleague",
      ),
    ],
  }),

  L(34, 2, "One Surprise, Four Teams", "Một bất ngờ, bốn bộ phận phối hợp", {
    vocabulary: [
      c("Coordinate", "I will coordinate the kitchen and housekeeping for the set-up, madam.", [
        "/kəʊˈɔːdɪneɪt/",
        "phối hợp các bộ phận",
        "🧩",
      ]),
      c("Run sheet", "Every team reads the same run sheet for the surprise.", [
        "/rʌn ʃiːt/",
        "bảng phân việc theo giờ",
        "📋",
      ]),
      c("Room access", "Room access for the set-up is only once the room is empty.", [
        "/ruːm ˈækses/",
        "quyền vào phòng",
        "🔑",
      ]),
      c("Timing", "Each line of the run sheet has its own timing.", [
        "/ˈtaɪmɪŋ/",
        "thời điểm, mốc giờ",
        "⏰",
      ]),
    ],
    grammar: [
      g(
        "Send a cake to room 812.",
        "Could you please arrange for a cake to be sent to room 812 by seven?",
        "Nhờ bộ phận khác bằng câu hỏi lịch sự và bị động 'to be sent' (be + V3), và luôn kèm một mốc giờ để ghi vào run sheet.",
        "Could you please arrange for a cake to be send to room 812 by seven?",
      ),
      g(
        "Housekeeping will do the petals when the guests are out.",
        "We will coordinate with housekeeping, so the petals go in while the guests are at dinner.",
        "Câu ghép: 'so' nói mục đích, 'while' nói hai việc cùng lúc. Chủ ngữ số nhiều 'the guests' đi với 'are'. Chỉ vào phòng khi phòng đã trống.",
        "We will coordinate with housekeeping, so the petals go in while the guests is at dinner.",
      ),
    ],
    speaking: [
      sp(
        "Pastry here. The anniversary cake for 812 — when do you need it in the restaurant?",
        t2a,
        "ĐỒNG NGHIỆP hỏi. Trả lời bằng MỘT quyết định và MỘT mốc, rồi ghi lên 'the run sheet' để mọi tổ đọc cùng một trang.",
        "colleague",
      ),
      sp(
        "Housekeeping. We only have white petals, no red ones. Is that all right?",
        t2b,
        "ĐỒNG NGHIỆP hỏi. Quyết ngay một việc nhỏ trong phần của bạn ('White is fine'), rồi nhắc luật vào phòng: chỉ khi phòng trống, và báo lại khi xong.",
        "colleague",
      ),
      sp(
        "Understood. Who opens the room for us?",
        t2c,
        "ĐỒNG NGHIỆP hỏi. Quyền vào phòng thuộc giám sát buồng phòng — 'room access' — còn bạn kiểm phòng trước khi khách quay về.",
        "colleague",
        undefined,
        t2b,
      ),
      sp(
        "And if the guests come back early while we are still inside?",
        t2d,
        "ĐỒNG NGHIỆP hỏi. Một việc cho tổ buồng phòng, một việc cho bạn: họ dừng và ra ngay, bạn giữ khách ở lounge. Đừng để khách bước vào một căn phòng đang dở.",
        "colleague",
        undefined,
        t2c,
      ),
      also(
        sp(
          "My wife will be out until seven. When will your team go in?",
          "Only while she is out, sir, and only once. I will call you when the room is ready.",
          "Hứa GIỜ CỦA BẠN, không hứa giờ của buồng phòng: 'I will call you when the room is ready'. Vào phòng một lần, khi phòng trống.",
        ),
        "Only while she is out, sir, and only once. I will call you as soon as the room is ready.",
      ),
      sp(
        "Can we just go in now? They are asleep, but there is no sign on the door.",
        "No. We go in only when the room is empty, at the time the guest gave us.",
        "ĐỒNG NGHIỆP hỏi. Không có biển 'xin đừng làm phiền' không có nghĩa là được vào. Khách đang ở trong thì không ai vào, kể cả để làm bất ngờ.",
        "colleague",
      ),
      also(
        sp(
          "Restaurant here. Should the cake come out with the dessert, or before it?",
          "With the dessert, please, once the main course is cleared. I will add the timing to the run sheet.",
          "ĐỒNG NGHIỆP hỏi. Một quyết định, một mốc, và ghi lên run sheet — 'the timing' là thứ mọi tổ cần nhất.",
          "colleague",
        ),
        "With the dessert, please, once the main course is cleared. I will put the timing on the run sheet.",
      ),
    ],
    reading: read(
      `ONE SURPRISE, FOUR TEAMS
A surprise set-up looks like one gift. Behind it there are four teams: the pastry kitchen, housekeeping, the restaurant, and you. Your job is to coordinate them, not to do their work.
Start a run sheet: one page, one line per team, each line with a timing. Pastry sends the cake to the restaurant as the guests sit down. Housekeeping puts in the petals once the room is empty. The restaurant brings the candles after the main course. Everybody reads the same page.
Room access is the line that goes wrong most often. Nobody enters while the guests are inside, and nobody guesses when they will leave. Ask the guest who planned it: "What time will you both be out, sir?" Housekeeping goes in once, after that time, and you check the room before the guests return.
When a team asks you something, answer with a decision and a time. "White petals are fine; please finish before seven" is an answer. "Whatever you think" is not.
Never promise the guest a time that belongs to another team. Promise your own: "I will call you when the room is ready."`,
      [
        {
          q: "Run sheet là gì?",
          options: [
            "Hoá đơn tổng của bữa tiệc bất ngờ, gửi cho khách ký",
            "Một trang, mỗi bộ phận một dòng kèm thời điểm",
            "Danh sách khách mời của bữa tối",
          ],
          correct: 1,
          explanation: `Bài đọc: "Start a run sheet: one page, one line per team, each line with a timing."`,
        },
        {
          q: "Buồng phòng vào phòng trang trí khi nào?",
          options: [
            "Một lần, sau giờ khách cho biết sẽ ra ngoài — rồi bạn kiểm phòng trước khi khách về",
            "Khi khách đang ngủ trong phòng và chưa treo biển DND",
            "Bất cứ lúc nào tổ đã có chìa khoá",
          ],
          correct: 0,
          explanation: `Bài đọc: "Nobody enters while the guests are inside, and nobody guesses when they will leave." Rồi: "Housekeeping goes in once, after that time, and you check the room before the guests return."`,
        },
        {
          q: "Bạn được hứa với khách mốc giờ nào?",
          options: [
            "Giờ bếp làm xong bánh",
            "Giờ buồng phòng trang trí xong, theo lời tổ trưởng",
            "Giờ của chính bạn: khi nào bạn gọi lại",
          ],
          correct: 2,
          explanation: `Bài đọc: "Never promise the guest a time that belongs to another team."`,
        },
      ],
    ),
    game: [
      round(
        "Housekeeping. The guests are still in the room. Shall we knock and do the petals now?",
        [
          ["Yes, knock and go in quickly — it will only take ten minutes.", "register"],
          ["No. Wait until they leave for dinner, and I will call you then.", "answer"],
          ["No. Wait until they will leave for dinner, and I will call you then.", "form"],
        ],
        "Câu này cho vào phòng khi khách đang ở trong — vừa lộ bất ngờ vừa xâm phạm riêng tư. Câu sai ngữ pháp dùng 'until they will leave'; sau 'until' dùng thì hiện tại: 'until they leave'. Đáp án chờ phòng trống và hẹn giờ gọi.",
        "colleague",
      ),
      round(
        "What time will the cake be ready? I want to tell my wife's sister.",
        [
          ["I will call you as soon as the pastry chef confirms, sir.", "answer"],
          ["It will be ready at seven exactly, sir — you can tell her that.", "register"],
          ["I will call you as soon as the pastry chef confirm, sir.", "form"],
        ],
        "Câu này hứa giờ thay bếp — giờ đó không phải của bạn. Câu sai ngữ pháp dùng 'the pastry chef confirm'; chủ ngữ số ít nên phải là 'confirms'. Đáp án hứa giờ của chính bạn: gọi lại khi bếp xác nhận.",
      ),
    ],
  }),
  L(34, 3, "Words for the Moment", "Lời chúc trang trọng cho khoảnh khắc", {
    vocabulary: [
      c("On behalf of", "On behalf of everyone at the hotel, happy anniversary, madam.", [
        "/ɒn bɪˈhɑːf ɒv/",
        "thay mặt cho",
        "🤵",
      ]),
      c(
        "Warmest congratulations",
        "Warmest congratulations on your wedding, sir, from all of us.",
        ["/ˈwɔːmɪst kənˌɡrætʃuˈleɪʃnz/", "lời chúc mừng nồng nhiệt nhất", "💐"],
      ),
      c("Many happy returns", "Many happy returns, madam, and a wonderful evening.", [
        "/ˈmeni ˈhæpi rɪˈtɜːnz/",
        "chúc mừng sinh nhật (lời chúc truyền thống)",
        "🎂",
      ]),
      c("Heartfelt", "Please accept our heartfelt wishes for the day, sir.", [
        "/ˈhɑːtfelt/",
        "chân thành từ đáy lòng",
        "💗",
      ]),
    ],
    grammar: [
      g(
        "Happy anniversary. Enjoy.",
        "On behalf of everyone at the hotel, warmest congratulations on your anniversary.",
        "'On behalf of + người/tổ chức' nâng lời chúc thành nghi thức. Chúc mừng VỀ một dịp là 'congratulations ON', không phải 'for'.",
        "On behalf of everyone at the hotel, warmest congratulations for your anniversary.",
      ),
      g(
        "Happy birthday, sir. Here is your cake.",
        "May I wish you many happy returns, sir, and a wonderful evening?",
        "Lời chúc trang trọng mở bằng 'May I wish you…?' — sau 'may' là động từ nguyên mẫu. 'Many happy returns' là câu chúc sinh nhật truyền thống của người Anh.",
        "May I wishing you many happy returns, sir, and a wonderful evening?",
      ),
    ],
    speaking: [
      also(
        sp(
          "Oh my goodness, is this all for us?",
          t3a,
          "MỘT câu chúc trang trọng đã chuẩn bị sẵn, nói xong thì lùi lại: 'On behalf of' cả khách sạn. Chúc mừng VỀ một dịp là 'congratulations on'.",
        ),
        "It is, madam. On behalf of everyone here, warmest congratulations on your anniversary.",
      ),
      sp(
        "You really did not have to do all this.",
        t3b,
        "Khách khiêm tốn — nhận lời cảm ơn nhẹ nhàng: 'It is our pleasure'. Rồi một lời chúc ngắn với tính từ cảm xúc đã học (memorable).",
        undefined,
        undefined,
        t3a,
      ),
      also(
        sp(
          "Could you take a photo of us with the cake?",
          t3c,
          "Chụp bằng máy của khách — ảnh lưu vào hồ sơ khách sạn thì cần phiếu đồng ý. Rồi gợi ý thêm một góc đẹp, và để khách tự nhiên.",
          undefined,
          undefined,
          t3b,
        ),
        "With pleasure, madam, on your own phone. Would you like one by the window as well?",
      ),
      sp(
        "It is actually my birthday today.",
        "Many happy returns, sir! May I wish you a wonderful day, on behalf of the whole team?",
        "'Many happy returns' là câu chúc sinh nhật truyền thống. 'May I wish you' mở một lời chúc trang trọng — sau 'may' là động từ nguyên mẫu.",
      ),
      sp(
        "What should I write on the card for the anniversary couple?",
        "Their names exactly as the booking spells them, and one heartfelt line from the hotel.",
        "ĐỒNG NGHIỆP hỏi. Tên viết sai trên thiệp là lỗi khách nhớ lâu nhất — lấy đúng chữ trên booking. Một câu 'heartfelt', không cần dài.",
        "colleague",
      ),
      risk(
        also(
          sp(
            "It is my birthday. Surely that deserves champagne on the house?",
            "Many happy returns, sir! A bottle on the house is my manager's to give, so let me check with her.",
            "Chúc mừng trước, rồi nói thật quà có giá trị tiền là của ai: 'my manager's to give'. Đừng hứa, cũng đừng từ chối thay quản lý.",
            undefined,
            ["manager's"],
          ),
          "Many happy returns, sir! Let me check with my manager, as a bottle on the house is hers to give.",
          "Happy birthday, sir! A bottle on the house is my manager's to give, so let me check with her now.",
          "Many happy returns, sir! A bottle on the house is my manager's decision, so let me check with her.",
        ),
      ),
    ],
    reading: read(
      `WORDS FOR THE MOMENT
When the guest first sees the cake, there is very little time. Have one formal sentence ready, say it, and then step back.
"On behalf of everyone at the hotel, warmest congratulations on your anniversary." It is longer than "Happy anniversary", and that is the point: it tells the guest the whole house is wishing them well, not only you.
For a birthday, "Many happy returns" is the traditional British wish. "May I wish you a wonderful evening?" closes almost any celebration.
Say the guest's name only as the booking spells it, and check it twice on the card. A misspelt name on a card is the mistake guests remember longest.
Keep it heartfelt and short. Two sentences, then offer one small thing — a photograph on the guest's own phone — and leave them to it.
If the guest asks for something more, like champagne on the house, that is a gift with a price. A gift with a price is your manager's to give, whoever is asking.`,
      [
        {
          q: "Vì sao nói 'On behalf of everyone at the hotel' thay vì chỉ 'Happy anniversary'?",
          options: [
            "Vì nó cho khách thấy cả khách sạn đang chúc mừng, không chỉ riêng bạn",
            "Vì câu ngắn nghe thiếu tôn trọng khách",
            "Vì quy định của khách sạn bắt buộc mọi nhân viên phải nói",
          ],
          correct: 0,
          explanation: `Bài đọc: "it tells the guest the whole house is wishing them well, not only you."`,
        },
        {
          q: "Lỗi nào trên thiệp chúc mừng khách nhớ lâu nhất?",
          options: [
            "Thiệp quá ngắn, chỉ có một dòng chúc",
            "Thiệp in trên giấy không đúng màu",
            "Tên khách bị viết sai",
          ],
          correct: 2,
          explanation: `Bài đọc: "A misspelt name on a card is the mistake guests remember longest."`,
        },
        {
          q: "Khách xin một chai sâm-panh miễn phí nhân dịp sinh nhật. Đó là gì?",
          options: [
            "Một phần của lời chúc mừng, nên đồng ý ngay cho khách vui",
            "Một món quà có giá — quản lý quyết",
            "Việc của nhà hàng tự quyết",
          ],
          correct: 1,
          explanation: `Bài đọc: "A gift with a price is your manager's to give"`,
        },
      ],
    ),
    game: [
      round(
        "Oh, this is too much! Thank you so much.",
        [
          ["No problem at all, madam. Enjoy the cake.", "register"],
          [
            "It is our pleasure, madam. On behalf of everyone here, warmest congratulations.",
            "answer",
          ],
          ["It is our pleasure, madam. On behalf everyone here, warmest congratulations.", "form"],
        ],
        "Câu này đúng ngữ pháp nhưng quá suồng sã cho một khoảnh khắc trang trọng — 'no problem' biến lời chúc thành một việc vặt. Câu sai ngữ pháp thiếu 'of': phải là 'on behalf OF everyone'. Đáp án dùng câu chúc trang trọng.",
      ),
      round(
        "Shall I write 'Happy Birthday Mr Tom' on the cake? That is what his wife calls him.",
        [
          ["Yes — if his wife calls him that, he will love it.", "register"],
          ["Yes — if his wife call him that, he will love it.", "form"],
          ["Use the name exactly as the booking spells it, and check it twice.", "answer"],
        ],
        "Câu này lấy tên gọi thân mật để in lên bánh — tên sai hay quá thân là lỗi khách nhớ lâu nhất. Câu sai ngữ pháp cũng in tên gọi thân mật y như thế, lại thiếu -s: 'his wife' số ít nên phải là 'calls'. Đáp án in đúng tên trên booking và kiểm hai lần.",
        "colleague",
      ),
    ],
  }),

  L(34, 4, "When the Surprise Goes Wrong", "Khi bất ngờ gặp sự cố", {
    vocabulary: [
      c("Mix-up", "I am so sorry about the mix-up with your cake, madam.", [
        "/ˈmɪks ʌp/",
        "sự nhầm lẫn",
        "🔀",
      ]),
      c("Replacement", "The pastry chef is preparing a replacement now, sir.", [
        "/rɪˈpleɪsmənt/",
        "thứ thay thế (đúng như đã đặt)",
        "🔁",
      ]),
      c("Discreet", "I will be discreet, sir. Your wife will not hear about it from us.", [
        "/dɪˈskriːt/",
        "kín đáo, tế nhị",
        "🤐",
      ]),
      c("Put it right", "Let me put it right before dessert, madam.", [
        "/pʊt ɪt raɪt/",
        "sửa cho đúng, khắc phục",
        "🛠️",
      ]),
    ],
    grammar: [
      g(
        "We made a mistake with your cake.",
        "I am so sorry about the mix-up, madam. I have asked the pastry chef for a replacement.",
        "Xin lỗi về SỰ VIỆC ('the mix-up'), rồi nói việc ĐÃ làm bằng hiện tại hoàn thành: 'I have asked' (have + V3). Thay đúng thứ bị hỏng là việc của bạn.",
        "I am so sorry about the mix-up, madam. I have ask the pastry chef for a replacement.",
      ),
      g(
        "Five minutes, the kitchen is fast.",
        "I am asking the kitchen now, madam, and I will come back to you by eight.",
        "Đừng hứa giờ thay bếp. Hứa giờ của CHÍNH BẠN. 'By eight' = trước hoặc đúng tám giờ; 'until eight' là kéo dài tới tám giờ — nghĩa khác hẳn.",
        "I am asking the kitchen now, madam, and I will come back to you until eight.",
      ),
    ],
    speaking: [
      also(
        sp(
          "This is not the cake we ordered, and my wife's name is spelled wrong on the card.",
          t4a,
          "Xin lỗi về SỰ VIỆC ('the mix-up'), rồi nói việc đang làm. Thay đúng thứ bị hỏng là việc của bạn — không cần chờ ai duyệt. Chữ replacement /rɪˈpleɪsmənt/ — trọng âm âm tiết hai.",
          undefined,
          ["pastry", "chef"],
        ),
        "I am so sorry about the mix-up, sir. I am asking the pastry chef for a replacement right now.",
      ),
      sp(
        "How long will that take? Dinner is almost over.",
        t4b,
        "Đừng hứa giờ thay bếp. Hứa giờ của CHÍNH BẠN: 'I will come back to you' + một mốc.",
        undefined,
        ["back"],
        t4a,
      ),
      sp(
        "And please do not make a fuss in front of my wife.",
        t4c,
        "Người lên kế hoạch không muốn người kia biết có sự cố: 'discreet' — nói nhỏ, xa bàn ăn. In lại thiệp là việc của bạn, tự làm luôn.",
        undefined,
        ["reprint"],
        t4b,
      ),
      sp(
        "The pastry chef says the new cake needs forty minutes. Shall I tell the guest five?",
        "No. Tell the guest what the chef said, and when you will come back to him.",
        "ĐỒNG NGHIỆP hỏi. Khách được hứa năm phút sẽ phải chờ thêm ba mươi lăm phút — mỗi phút là một lời hứa thất bại. Nói đúng điều bếp nói, và hứa giờ của mình.",
        "colleague",
      ),
      also(
        sp(
          "The room was not ready when we came back from dinner. It spoiled the surprise.",
          "I am sorry that happened, sir. I will put it right with my manager and come back within the hour.",
          "Xin lỗi về sự việc bằng đúng câu đã học, rồi 'put it right' — kèm một mốc giờ của chính bạn.",
          undefined,
          ["back", "within", "hour"],
        ),
        "I am sorry that happened, sir. I will put it right with my manager and come back to you within the hour.",
      ),
      risk(
        also(
          sp(
            "Your mistake spoiled our whole evening. I expect the dinner to be free.",
            "I am sorry that happened, madam. A free dinner is my Duty Manager's to decide, and I am asking her now.",
            "Bữa tối ĐÃ ăn mà xin miễn tiền là chuyện tiền trên hoá đơn — việc của Duty Manager. Thay đúng thứ bị hỏng là của bạn; mọi thứ thêm vào là của người khác. Đừng hứa, đừng nêu con số.",
            undefined,
            ["free", "dinner", "duty", "decide"],
          ),
          "I am sorry that happened, madam. A free dinner is for my Duty Manager to decide, and I am asking her now.",
          "I am sorry that happened, madam. A free dinner is my Duty Manager's decision, and I am asking her now.",
          "I am so sorry that happened, madam. My Duty Manager decides on a free dinner, and I am asking her now.",
        ),
      ),
    ],
    reading: read(
      `WHEN THE SURPRISE GOES WRONG
Sooner or later one surprise goes wrong: the wrong cake, a misspelt name, petals in the wrong room. The recovery is quick if you know what is yours.
Replacing the thing that failed is yours, and you ask nobody. A wrong cake goes back to the pastry chef for a replacement; a wrong card you reprint yourself. That is not compensation. It is the thing that should have happened.
But a different thing is the guest's choice. If the kitchen cannot make what was ordered, ask the guest before anything else goes out.
Apologise for the mix-up, not with a verdict. Never promise a time for the kitchen: a guest told five minutes will wait thirty-five minutes too long. Promise your own time: "I will come back to you before dessert, sir."
Be discreet. The guest who planned the surprise may not want anybody else to know. Speak to the planner quietly, away from the table.
Anything on top of the replacement is not yours. A bottle on the house is your manager's to give, and money off the bill is the Duty Manager's to decide.`,
      [
        {
          q: "Bánh giao nhầm. Đổi lại bánh đúng có phải xin ai duyệt không?",
          options: [
            "Có — phải xin Duty Manager trước",
            "Không — thay đúng thứ bị hỏng là việc của bạn",
            "Có — phải hỏi lại khách xem họ có muốn đổi bánh hay không",
          ],
          correct: 1,
          explanation: `Bài đọc: "Replacing the thing that failed is yours, and you ask nobody."`,
        },
        {
          q: "Bếp không làm được đúng loại bánh khách đặt. Bạn làm gì?",
          options: [
            "Hỏi khách trước khi gửi bất cứ thứ gì khác",
            "Gửi ngay loại bánh khác cho nhanh, rồi báo khách sau bữa ăn",
            "Huỷ luôn bánh và xin lỗi khách",
          ],
          correct: 0,
          explanation: `Bài đọc: "If the kitchen cannot make what was ordered, ask the guest before anything else goes out."`,
        },
        {
          q: "Khách đòi miễn tiền cả bữa tối. Ai quyết?",
          options: [
            "Bạn, vì lỗi thuộc về bên bạn",
            "Bếp trưởng",
            "Duty Manager — miễn hay bớt tiền trên hoá đơn là việc của họ",
          ],
          correct: 2,
          explanation: `Bài đọc: "money off the bill is the Duty Manager's to decide."`,
        },
      ],
    ),
    game: [
      round(
        "Your card says 'Mrs Hoa'. My wife's name is Hoai!",
        [
          [
            "It is very close, sir. Shall we just leave it — your wife may not even notice it?",
            "register",
          ],
          ["I am so sorry about the mix-up, sir. I will reprint the card myself now.", "answer"],
          [
            "It is very close, sir. Shall we just leave it — your wife may not even notices it?",
            "form",
          ],
        ],
        "Câu này bắt khách nhận một tấm thiệp sai tên — tên viết sai là lỗi khách nhớ lâu nhất, và in lại thiệp là việc của bạn, không phải một ân huệ. Câu sai ngữ pháp cũng bảo khách để nguyên y như thế, lại dùng 'may not even notices'; sau 'may' là động từ nguyên mẫu: 'notice'. Đáp án xin lỗi về sự nhầm lẫn và tự in lại ngay.",
      ),
      round(
        "The kitchen has no more chocolate cake. Shall I send vanilla and tell the guest after?",
        [
          ["No. Ask the guest first — the choice is theirs, not ours.", "answer"],
          ["Yes — send the vanilla now, and explain it to him afterwards.", "register"],
          ["No. Ask the guest first — the choice is their, not ours.", "form"],
        ],
        "Câu này chốt hộ khách một món khác — thay ĐÚNG thứ đã đặt là việc của bạn, còn đổi sang thứ khác thì phải hỏi khách. Câu sai ngữ pháp dùng 'the choice is their'; đại từ sở hữu đứng một mình là 'theirs'. Đáp án hỏi khách trước.",
        "colleague",
      ),
    ],
  }),
];

export const week: AuthoredWeek = {
  title: { en: "Special Occasions and Surprises", vi: "Dịp đặc biệt & bất ngờ cho khách" },
  canDo:
    "Nói được: hỏi về dịp đặc biệt của kỳ nghỉ mà không đoán về con người; phối hợp bếp bánh, buồng phòng và nhà hàng bằng một run sheet có mốc giờ; chúc mừng trang trọng ('On behalf of everyone at the hotel…'); và sửa một bất ngờ bị lỗi mà không hứa giờ thay bếp hay tự tặng quà.",
  lessons,
};
