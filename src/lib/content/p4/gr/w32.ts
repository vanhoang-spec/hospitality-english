// GR week 32 — advice built on what the guest said.
//
// Rewritten after the first blind round of the reopened Phase 4 (7ed3254).
// The Guest Relations Manager on the panel praised this week's rules and
// they stay: advice has three sources (what the guest said, the file kept
// with permission, what the house knows about tomorrow) and never a fourth
// (what you noticed — age, money, body, religion, who they came with); one
// suggestion, then the decision goes back to the guest; a preference goes on
// the file only with a yes and in the guest's own words; an allergy is a
// safety record, written on a slip for the chef at once, and consent decides
// only whether it stays on the file. What changed: one page of reading per
// lesson, five to seven turns per lesson with a chain, every game round
// explained, the matrix language ("Since you mentioned…", "Based on that…")
// on the cards, and a caller asking whether a regular is back gets the same
// answer every caller gets.
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

// ── Lesson 1 — where the advice comes from ─────────────────────────────────
const t1a =
  "May I ask one thing first, madam? Would you like something lively or something low-key?";
const t1b =
  "Since you mentioned the long flight, I would take tea in the peaceful library, madam. Would that suit you?";
const t1c = "Wonderful, madam. I will ask the lounge team to keep you a quiet table there.";

// ── Lesson 2 — what goes on the file ───────────────────────────────────────
const t2a =
  "Thank you, madam. I am writing an allergy slip for the chef now, and I will come back to confirm.";
const t2b = "Only with your permission, madam. Shall I put it on your file for future stays?";
const t2c = "Of course, madam. I will write it in your own words, and read it back to you.";

// ── Lesson 3 — the guest who came back ─────────────────────────────────────
const t3a =
  "Welcome back, madam, and we are delighted to see you again. Has anything changed since your last stay?";
const t3b = "Of course, madam. I will ask the front office for your usual room type.";
const t3c =
  "Thank you, madam. Shall I put that down, and ask the front office to add him to the booking?";

// ── Lesson 4 — the empty file ──────────────────────────────────────────────
const t4a = "As this is your first stay, madam, may I ask one question? Beach or town?";
const t4b =
  "Since you mentioned old buildings, madam, I would start with our own courtyard, and then the old quarter.";
const t4c =
  "I would rather find out than guess, madam. Somebody will know, and I will have it by this evening.";

const lessons = [
  L(32, 1, "Where the Advice Comes From", "Gợi ý mọc ra từ lời khách", {
    vocabulary: [
      c("Since you mentioned", "Since you mentioned the market, sir, I would go early tomorrow.", [
        "/sɪns juː ˈmenʃnd/",
        "vì quý khách có nhắc tới",
        "💬",
      ]),
      c("Based on that", "Based on that, madam, I would keep tomorrow morning free.", [
        "/beɪst ɒn ðæt/",
        "dựa trên điều đó",
        "🧭",
      ]),
      c("Tailor-made", "I can draft a tailor-made itinerary for your three days, sir.", [
        "/ˈteɪlə meɪd/",
        "thiết kế riêng cho từng vị khách",
        "🧵",
      ]),
      c("Would that suit you", "There is a quiet table at seven. Would that suit you, madam?", [
        "/wʊd ðæt suːt juː/",
        "như vậy có hợp với quý khách không",
        "🤝",
      ]),
      c("Low-key", "The garden bar is low-key in the evening, sir.", [
        "/ləʊ kiː/",
        "nhẹ nhàng, không ồn ào phô trương",
        "🌿",
      ]),
    ],
    grammar: [
      g(
        "You look tired. You should go to the spa.",
        "Since you mentioned a long flight, madam, I would keep tomorrow morning free.",
        "Gợi ý phải mọc ra từ điều KHÁCH ĐÃ NÓI, không phải từ điều bạn nhìn thấy ở khách. 'Since you mentioned' + danh từ — KHÔNG có 'about' sau 'mentioned'.",
        "Since you mentioned about a long flight, madam, I would keep tomorrow morning free.",
      ),
      g(
        "I have booked you on the seven o'clock boat.",
        "Based on that, I would take the early boat, sir. Would that suit you?",
        "Đưa MỘT gợi ý với 'I would…' rồi trả quyền quyết định lại: 'Would that suit you?'. Sau 'would' là động từ nguyên mẫu, không có 'to'.",
        "Based on that, I would to take the early boat, sir. Would that suit you?",
      ),
    ],
    speaking: [
      sp(
        "We have one free afternoon. What would you do?",
        t1a,
        "Khách chưa nói gì về mình, nên đừng đoán — xin MỘT câu hỏi có hai lựa chọn. 'Low-key' /ləʊ kiː/ — trọng âm rơi vào 'key'.",
      ),
      also(
        sp(
          "Low-key, please. We are both tired after the long flight.",
          t1b,
          "Mở bằng chính lời khách: 'Since you mentioned' + điều khách vừa nói. Rồi MỘT gợi ý với 'I would', rồi trả quyền quyết định: 'Would that suit you?'. Chữ mentioned /ˈmenʃnd/ — đuôi -ed đọc /d/.",
          undefined,
          undefined,
          t1a,
        ),
        "Since you mentioned the long flight, madam, I would take tea in the peaceful library. Would that suit you?",
      ),
      sp(
        "Yes, that would be perfect.",
        t1c,
        "Khách đã chọn — giờ mới là việc của bạn: nhờ đúng tổ giữ chỗ. Bạn không hứa thay tổ lounge một giờ cụ thể.",
        undefined,
        undefined,
        t1b,
      ),
      also(
        sp(
          "We love markets. Any ideas for tomorrow?",
          "Since you mentioned markets, sir, I would go tomorrow morning, because it is market day.",
          "Một dữ kiện khách đã cho, một gợi ý, một lý do — rồi dừng. Đừng liệt kê ba chỗ: khách hỏi ý của bạn, không xin một thực đơn.",
        ),
        "Since you mentioned markets, sir, I would go tomorrow morning. It is market day.",
      ),
      sp(
        "The lady in 604 looks like she would enjoy the spa. Shall I offer it?",
        "Not from looking at her. Ask what she has planned, and build on her answer.",
        "ĐỒNG NGHIỆP hỏi. Điều bạn NHÌN THẤY ở khách không phải là một gợi ý — đó là phỏng đoán, dù nói lịch sự. Hỏi về kỳ nghỉ, rồi dựa vào câu trả lời.",
        "colleague",
      ),
      also(
        sp(
          "Could you plan the whole day for us? Something special.",
          "Of course, madam. Based on what you told me, I will draft a tailor-made itinerary by this evening.",
          "Mở bằng 'Based on' + lời khách, để khách thấy kế hoạch là của riêng họ: 'tailor-made'. Bạn SOẠN lịch trình; đặt chỗ vẫn là việc của concierge. Và gắn một mốc giờ.",
        ),
        "Of course, madam. Based on what you have told me, I will draft a tailor-made itinerary by this evening.",
      ),
    ],
    reading: read(
      `WHERE THE ADVICE COMES FROM
Every desk in the house gives advice. Guest Relations has time, and time is how you learn what nobody wrote down.
Advice has three sources. What the guest told you. What is on the guest preference file, put there with permission. And what the house knows about tomorrow: the market day, the tide, the road that closes at five.
There is a fourth source, and it gets people into trouble: what you noticed about the guest. Their age, their money, their body, their religion, who they came with. That is not advice. It is a guess, however politely you say it.
So open with their own words: "Since you mentioned the long flight…" The guest hears that you listened, and you never have to guess.
Then give one suggestion, not a list. A guest who asks what you would do wants an answer, not a menu. Say "Based on that, I would…", and give the decision back: "Would that suit you?"
Booking it is not yours. The concierge desk books the boat, the table and the car; you walk the guest over.`,
      [
        {
          q: "Gợi ý được phép mọc ra từ những nguồn nào?",
          options: [
            "Lời khách, hồ sơ có xin phép, và chuyện của ngày mai",
            "Điều bạn quan sát được về tuổi tác và người đi cùng khách",
            "Kinh nghiệm của bạn với những vị khách trông giống họ",
          ],
          correct: 0,
          explanation: `Bài đọc: "Advice has three sources." Nguồn thứ tư — điều bạn nhìn thấy ở khách — chỉ là phỏng đoán, dù nói lịch sự đến đâu.`,
        },
        {
          q: "Khách hỏi 'anh/chị sẽ làm gì?'. Trả lời thế nào?",
          options: [
            "Đưa ba lựa chọn để khách tự so sánh",
            "Một gợi ý, rồi trả quyền quyết định cho khách",
            "Hỏi lại khách thích kiểu gì, rồi đưa một danh sách dài",
          ],
          correct: 1,
          explanation: `Bài đọc: "A guest who asks what you would do wants an answer, not a menu."`,
        },
        {
          q: "Khách đồng ý đi thuyền chiều mai. Ai đặt chỗ?",
          options: [
            "The concierge desk — bạn dẫn khách tới",
            "Bạn tự gọi hãng thuyền đặt luôn, cho khách đỡ phải chờ",
            "Khách tự gọi cho hãng thuyền",
          ],
          correct: 0,
          explanation: `Bài đọc: "The concierge desk books the boat, the table and the car; you walk the guest over."`,
        },
      ],
    ),
    game: [
      round(
        "We love local food. Any advice for tomorrow?",
        [
          ["Since you mentioned local food, sir, I would go to the morning market.", "answer"],
          ["Most guests of your age prefer the museum, sir, so I would start there.", "register"],
          ["Since you mentioned about local food, sir, I would go to the morning market.", "form"],
        ],
        "Câu này gợi ý dựa vào tuổi của khách — điều bạn nhìn thấy, không phải điều khách nói. Câu sai ngữ pháp thừa 'about': 'mentioned' không đi với 'about'. Đáp án dựa vào chính lời khách.",
      ),
      round(
        "The couple in 905 look like honeymooners. Shall I send up the romance package?",
        [
          [
            "Yes, send it up now — couples of their age are almost always on honeymoon.",
            "register",
          ],
          ["Not from what you saw. Ask about their plans, and build on the answer.", "answer"],
          ["Not from what you saw. Ask about their plans, and building on the answer.", "form"],
        ],
        "Câu này đoán quan hệ và tuổi của khách — những điều không bao giờ là câu hỏi, cũng không bao giờ là ghi chú. Câu sai ngữ pháp dùng 'and building on'; hai mệnh lệnh song song phải cùng dạng: 'ask… and build on…'. Đáp án: hỏi về kỳ nghỉ, rồi dựa vào câu trả lời.",
        "colleague",
      ),
    ],
  }),

  L(32, 2, "What Goes on the File", "Cái gì được ghi vào hồ sơ", {
    vocabulary: [
      c(
        "Only with your permission",
        "Your preferences go on the file only with your permission, madam.",
        ["/ˈəʊnli wɪð jɔː pəˈmɪʃn/", "chỉ khi được quý khách cho phép", "✅"],
      ),
      c("In your own words", "I will write it in your own words, sir.", [
        "/ɪn jɔːr əʊn wɜːdz/",
        "đúng theo lời của quý khách",
        "✍️",
      ]),
      c("Leave it blank", "If you would rather not say why, we leave it blank.", [
        "/liːv ɪt blæŋk/",
        "để trống, không ghi",
        "⬜",
      ]),
      c("Allergy slip", "I am writing an allergy slip for the chef now, madam.", [
        "/ˈælədʒi slɪp/",
        "phiếu báo dị ứng gửi bếp",
        "🧾",
      ]),
      c("Shall I put that down", "Black coffee at six — shall I put that down, sir?", [
        "/ʃæl aɪ pʊt ðæt daʊn/",
        "tôi ghi điều đó lại nhé",
        "📝",
      ]),
    ],
    grammar: [
      g(
        "I will note that you are diabetic.",
        "May I put that on your file in your own words, madam? It goes there only with your permission.",
        "Thông tin sức khoẻ chỉ vào hồ sơ khi khách đồng ý — hỏi trước, rồi mới ghi, và ghi đúng chữ khách dùng, đừng đổi thành chẩn đoán. Riêng dị ứng thì báo bếp NGAY, không cần hỏi ai. 'Words' luôn ở số nhiều trong cụm này.",
        "May I put that on your file in your own word, madam? It goes there only with your permission.",
      ),
      g(
        "I will write that she is difficult.",
        "I will write what she asked for, and how many times.",
        "Hồ sơ ghi VIỆC ĐÃ XẢY RA, không ghi nhận xét về con người. 'Khó tính' thì không kiểm được, và nó định sẵn thái độ cho người đọc lần sau. Việc đã xảy ra thì dùng quá khứ: 'asked'.",
        "I will write what she ask for, and how many times.",
      ),
    ],
    speaking: [
      risk(
        also(
          sp(
            "I cannot eat shellfish. It is quite serious.",
            t2a,
            "Dị ứng là hồ sơ AN TOÀN, không phải sở thích: không phải xin phép ai, viết 'allergy slip' và đưa tận tay bếp trưởng ngay. Đừng đổi 'quite serious' thành tên một căn bệnh — bạn chép lại, không chẩn đoán.",
            undefined,
            ["chef", "back", "confirm"],
          ),
          "Thank you for telling me, madam. I am writing an allergy slip for the chef now, and I will come back to confirm.",
          "Thank you, madam. I will write an allergy slip for the chef now, and I will come back to confirm.",
        ),
      ),
      sp(
        "Thank you. Do you keep that sort of thing on file?",
        t2b,
        "Phần LƯU vào hồ sơ cho lần sau mới cần khách đồng ý — và đó là câu hỏi riêng, hỏi SAU khi bếp đã có phiếu. 'Only with your permission' cho khách thấy hồ sơ là của khách.",
        undefined,
        undefined,
        t2a,
      ),
      sp(
        "Yes, please. And say that it is serious.",
        t2c,
        "Ghi đúng chữ khách dùng — 'in your own words' — rồi đọc lại cho khách nghe. Chép lại, không chẩn đoán.",
        undefined,
        undefined,
        t2b,
      ),
      sp(
        "Room 1204 asked me not to write down why she wants a quiet floor.",
        "Leave it blank. Write that she asked for a quiet floor, and nothing about the reason.",
        "ĐỒNG NGHIỆP hỏi. Khách có quyền cho một yêu cầu mà không cho lý do — ca sau chỉ cần biết PHẢI LÀM GÌ. 'Leave it blank' /liːv ɪt blæŋk/ — đuôi /ŋk/ nghe rõ.",
        "colleague",
      ),
      also(
        sp(
          "Black coffee, no sugar, and I am up at six every morning.",
          "Shall I put that down for your stay, sir? I will ask the lounge team about six.",
          "Khách vừa cho hai sở thích. XIN PHÉP trước khi ghi: 'Shall I put that down'. Và đừng hứa thay lounge một giờ mở cửa — bạn hỏi họ giúp khách.",
        ),
        "Thank you, sir. Shall I put that down? I will ask the lounge team about six.",
      ),
      risk(
        also(
          sp(
            "Can I see what you have on file about me?",
            "Of course I will pass that on, madam. My Duty Manager will come to you about it today.",
            "Xem hồ sơ và xoá một dòng đều là việc của Duty Manager — đừng xoay màn hình về phía khách, đừng tự hứa gửi bản sao. Nói 'pass that on', rồi nói AI sẽ tới và KHI NÀO.",
            undefined,
            ["duty", "manager", "today"],
          ),
          "Of course, madam. I will pass that to my Duty Manager, and she will come to you about it today.",
          "Certainly, madam. I am passing that to my Duty Manager now, and she will come to you today.",
        ),
      ),
    ],
    reading: read(
      `WHAT GOES ON THE FILE
The guest preference file is not yours. It belongs to the guest; we keep it, and people they will never meet read it.
Three things belong on it: a preference the guest stated, a request and what was promised back, and an occasion the guest told you about. Ask first — "Shall I put that down?" — and write it in their own words.
Three things never belong on it. An opinion about the guest. A guess about their health, money or religion. And anything about who they arrived with.
An allergy is different. It is a safety record, not a preference, and nobody has to be asked first. Write it on an allergy slip and put the slip into the chef's hand. Then go back and tell the guest the kitchen has it. Consent decides only whether it stays on the file after they leave.
If a guest would rather not say why, leave it blank. A blank is the guest's answer, and the file works without it.
A guest may ask to see the file, or to take a line out. Both go to the Duty Manager the same minute. Never turn the screen towards a guest.`,
      [
        {
          q: "Khách nói 'tôi không ăn được hải sản, khá nghiêm trọng'. Việc đầu tiên là gì?",
          options: [
            "Xin phép khách trước, rồi mới báo bếp",
            "Viết phiếu dị ứng, đưa tận tay bếp trưởng ngay",
            "Ghi 'khách dị ứng nặng' vào hồ sơ cho ca sau đọc",
          ],
          correct: 1,
          explanation: `Bài đọc: "An allergy is different. It is a safety record, not a preference, and nobody has to be asked first."`,
        },
        {
          q: "Khách không muốn nói lý do xin tầng yên tĩnh. Hồ sơ ghi gì?",
          options: [
            "Ghi yêu cầu, để trống phần lý do",
            "Không ghi gì, vì thiếu lý do thì hồ sơ vô dụng",
            "Ghi phỏng đoán của mình để ca sau hiểu hoàn cảnh",
          ],
          correct: 0,
          explanation: `Bài đọc: "If a guest would rather not say why, leave it blank. A blank is the guest's answer, and the file works without it."`,
        },
        {
          q: "Khách xin xem hồ sơ của mình. Bạn làm gì?",
          options: [
            "Xoay màn hình cho khách tự xem",
            "Hứa in một bản sao gửi lên phòng tối nay",
            "Báo Duty Manager ngay trong phút đó",
          ],
          correct: 2,
          explanation: `Bài đọc: "Both go to the Duty Manager the same minute. Never turn the screen towards a guest."`,
        },
      ],
    ),
    game: [
      round(
        "Shall I write 'very demanding guest' so the evening shift is ready?",
        [
          ["Write it in the internal notes instead — no guest will ever read those.", "register"],
          ["Write what the guest asked for and how much times — that is the fact.", "form"],
          ["Write what the guest asked for and how many times — that is the fact.", "answer"],
        ],
        "Câu này vẫn ghi một nhận xét về con người — ghi chú nội bộ cũng là hồ sơ, và người đọc sau sẽ mang thái độ đó. Câu sai ngữ pháp dùng 'how much times'; 'times' đếm được nên phải là 'how many times'. Đáp án ghi việc đã xảy ra.",
        "colleague",
      ),
      round(
        "Could you take a photo of us here, and keep it on our file?",
        [
          ["Of course, madam. I will keep a copy on your file for your next visit.", "register"],
          [
            "With pleasure, madam, on your own phone. For our file, I would need a signed consent form.",
            "answer",
          ],
          [
            "With pleasure, madam, on your own phone. For our file, I would need a sign consent form.",
            "form",
          ],
        ],
        "Câu này lưu ảnh khách vào hồ sơ mà không có giấy đồng ý — ảnh cần phiếu đồng ý có chữ ký. Câu sai ngữ pháp dùng 'a sign consent form'; phải là 'a signed consent form'. Đáp án chụp bằng máy của khách, và nói rõ điều kiện để lưu.",
      ),
    ],
  }),
  L(32, 3, "The Guest Who Came Back", "Vị khách quay lại", {
    vocabulary: [
      c("Has anything changed", "Welcome back, sir. Has anything changed since your last stay?", [
        "/hæz ˈeniθɪŋ tʃeɪndʒd/",
        "có gì thay đổi không",
        "🔄",
      ]),
      c("Your usual", "Your usual table, madam, or somewhere different tonight?", [
        "/jɔː ˈjuːʒuəl/",
        "như mọi lần của quý khách",
        "🪑",
      ]),
      c("Still the same", "Is everything still the same, sir, or shall I change anything?", [
        "/stɪl ðə seɪm/",
        "vẫn như cũ",
        "🟰",
      ]),
      c("Returning guest", "A returning guest is still asked, not assumed, madam.", [
        "/rɪˈtɜːnɪŋ ɡest/",
        "khách quay lại lưu trú",
        "🔁",
      ]),
    ],
    grammar: [
      g(
        "Same as last time?",
        "Welcome back, sir. Has anything changed since your last stay?",
        "'Same as last time?' bắt khách nhớ hộ bạn. Chào, rồi hỏi mở. Thì hiện tại hoàn thành: 'has + V3' — 'has anything changed', không phải 'has anything change'.",
        "Welcome back, sir. Has anything change since your last stay?",
      ),
      g(
        "I have given you your usual table.",
        "Your usual table, madam, or would you like a different one tonight?",
        "Thứ khách dùng lần trước là một LỜI MỜI, không phải một quyết định — người ta thay đổi. Đưa lựa chọn cũ ra rồi mở một lối khác bằng 'or'. 'Tonight' đứng một mình, không có 'in' phía trước.",
        "Your usual table, madam, or would you like a different one in tonight?",
      ),
    ],
    speaking: [
      also(
        sp(
          "It is good to be back. Third time now.",
          t3a,
          "Chào mừng, rồi hỏi mở: 'Has anything changed'. Đừng đọc lại sở thích trong hồ sơ — nghe thì hay, nhưng nó khoá khách vào lựa chọn cũ. Đuôi -ed của delighted: người cảm thấy.",
        ),
        "Welcome back, madam. We are delighted to see you again. Has anything changed since your last stay?",
      ),
      sp(
        "Nothing much. The same room type, if you can.",
        t3b,
        "Loại phòng do lễ tân xếp — bạn XIN họ, không tự hứa một số phòng. 'Your usual' — đúng cái khách quen dùng.",
        undefined,
        undefined,
        t3a,
      ),
      sp(
        "And my husband is joining me on Friday.",
        t3c,
        "Thêm một người là thêm một điều phải hỏi: xin phép ghi lại — 'Shall I put that down' — rồi nhờ lễ tân thêm tên vào booking. Đừng tự sửa booking.",
        undefined,
        undefined,
        t3b,
      ),
      sp(
        "Mr Pham is back next week. Shall I set everything up as before?",
        "For a returning guest, set up the room, not the evening. The table he chooses himself.",
        "ĐỒNG NGHIỆP hỏi. Thứ không tốn tiền và đổi lại được — gối, tầng — thì dựng sẵn. Thứ có ngày, có giá, hay có người thứ hai thì để khách tự nói, kể cả với 'a returning guest'.",
        "colleague",
      ),
      also(
        sp(
          "I assume my details are still on your system?",
          "They are, sir. Is everything still the same, or shall I change anything?",
          "Xác nhận là có, rồi trả quyền lại cho khách: 'still the same'. Đừng đọc lại cả danh sách sở thích.",
        ),
        "They are, sir. Is it all still the same, or shall I change anything?",
      ),
      sp(
        "Mrs Lee's file says anniversary in May, but it is August. Shall I order the cake?",
        "Not from the file alone. Check the booking first: the same dates, and the same companion.",
        "ĐỒNG NGHIỆP hỏi. Một dòng hồ sơ từ tháng Năm là một câu hỏi vào tháng Tám. Kiểm hai thứ trên booking — ngày ở và tên người đi cùng — trước khi đặt bánh.",
        "colleague",
      ),
      risk(
        also(
          sp(
            "Is Mr Pham back with you this week? I am an old friend of his.",
            "I cannot confirm who is staying with us, sir, but I can take a message.",
            "Khách quen vẫn là khách riêng tư. Đừng nói 'He is not back yet' — câu đó cũng là xác nhận. Nói 'I cannot confirm', rồi nhận lời nhắn: lời nhắn không xác nhận ai đang ở đây.",
            undefined,
            ["confirm", "message"],
          ),
          "I am sorry, sir, I cannot confirm who is staying with us. May I take a message?",
          "I am not able to confirm who is staying with us, sir, but I can take a message.",
        ),
      ),
    ],
    reading: read(
      `THE GUEST WHO CAME BACK
A returning guest is the easiest guest to get wrong, because you already have an answer and you stop asking the question.
The file says corner table, firm pillow, black coffee at seven. That was true in March. Now it is a question, not an instruction. People change between stays: they come for work instead of a holiday, or with somebody new, or they stop drinking coffee.
So split the file in two. Anything free and easy to undo — the pillow, the floor, the coffee — you prepare before they arrive. Then you offer it back: "Is everything still the same, sir?"
Anything with a date, a price or a second person in it, you ask about every time: the table, the tour, the anniversary dinner. Check the dates and the names on the booking, not on the file.
Open with one question, not a display of memory. "Welcome back, sir. Has anything changed since your last stay?" does more than any list of remembered details.
And a returning guest is still a private guest. A caller who asks whether he is back hears what every caller hears: "I cannot confirm who is staying with us."`,
      [
        {
          q: "Hồ sơ ghi gối cứng từ lần trước. Làm gì?",
          options: [
            "Bỏ qua, vì hồ sơ cũ không còn đúng",
            "Hỏi Duty Manager xem có nên dùng không",
            "Chuẩn bị sẵn, rồi hỏi lại khách",
          ],
          correct: 2,
          explanation: `Bài đọc: "Anything free and easy to undo — the pillow, the floor, the coffee — you prepare before they arrive." Rồi hỏi lại khách ngay câu đầu.`,
        },
        {
          q: "Hồ sơ ghi kỷ niệm ngày cưới vào tháng Năm, nay là tháng Tám. Kiểm tra ở đâu?",
          options: [
            "Trên hồ sơ sở thích của khách",
            "Trên booking: ngày ở và tên người đi cùng",
            "Hỏi người đi cùng khách khi họ vừa tới quầy cho chắc",
          ],
          correct: 1,
          explanation: `Bài đọc: "Check the dates and the names on the booking, not on the file."`,
        },
        {
          q: "Một người gọi tới hỏi vị khách quen đã quay lại chưa. Trả lời thế nào?",
          options: [
            "'I cannot confirm who is staying with us'",
            "Nói là đã quay lại, vì đó là khách quen",
            "Hỏi tên người gọi rồi nối máy thẳng lên phòng khách",
          ],
          correct: 0,
          explanation: `Bài đọc: "A caller who asks whether he is back hears what every caller hears" — không xác nhận, rồi nhận lời nhắn.`,
        },
      ],
    ),
    game: [
      round(
        "Do you remember how I like my room?",
        [
          [
            "Of course, sir — corner table, firm pillow and black coffee at seven. All set.",
            "register",
          ],
          ["We do, sir. Is everything still the same, or shall I change anything?", "answer"],
          ["We do, sir. Is everything still the same, or shall I changing anything?", "form"],
        ],
        "Câu này đọc lại sở thích như một màn trình diễn và chốt hộ khách — khách không còn đường nào ngoài gật. Câu sai ngữ pháp dùng 'shall I changing'; sau 'shall' là động từ nguyên mẫu: 'shall I change'. Đáp án xác nhận là nhớ, rồi hỏi lại.",
      ),
      round(
        "A returning guest's file says 'roses in the room'. Shall I put them in before she arrives?",
        [
          ["Ask her first. Flowers cost money, and her plans may have changed.", "answer"],
          ["Yes. The file is there so that we never have to ask twice.", "register"],
          ["Ask her first. Flowers costs money, and her plans may has changed.", "form"],
        ],
        "Câu này coi hồ sơ là mệnh lệnh — thứ có giá tiền thì phải hỏi lại mỗi lần. Câu sai ngữ pháp chia sai hai động từ: 'flowers costs' phải là 'cost', 'may has' phải là 'may have'. Đáp án hỏi khách trước.",
        "colleague",
      ),
    ],
  }),

  L(32, 4, "The Empty File", "Hồ sơ còn trống", {
    vocabulary: [
      c(
        "As this is your first stay",
        "As this is your first stay, madam, may I ask you one thing?",
        ["/æz ðɪs ɪz jɔː fɜːst steɪ/", "vì đây là lần đầu quý khách ở với chúng tôi", "🆕"],
      ),
      c("One question", "May I ask one question before you go up, sir?", [
        "/wʌn ˈkwestʃən/",
        "một câu hỏi thôi",
        "❓",
      ]),
      c("Somebody will know", "Somebody will know, madam, and I will have it for you by six.", [
        "/ˈsʌmbədi wɪl nəʊ/",
        "sẽ có người biết",
        "🙋",
      ]),
    ],
    grammar: [
      g(
        "Everyone enjoys the beach club.",
        "As this is your first stay with us, madam, may I ask one question?",
        "Chưa biết gì thì đừng lấy 'khách nào cũng thích' ra lấp. 'As this is…' (vì đây là…) mở câu bằng lý do; rồi xin MỘT câu hỏi — 'one question', danh từ số ít sau 'one'.",
        "As this is your first stay with us, madam, may I ask one questions?",
      ),
      g(
        "I do not know that one.",
        "Somebody will know, sir, and I will have the answer by this evening.",
        "'Somebody will know' mà không có giờ chỉ là một lời an ủi; thêm một mốc giờ thì thành lời hứa khách kiểm được. Sau 'will' là động từ nguyên mẫu: 'will know', không phải 'will knows'.",
        "Somebody will knows, sir, and I will have the answer by this evening.",
      ),
    ],
    speaking: [
      sp(
        "It is our first time here. What do people usually do?",
        t4a,
        "Khách mới thì hồ sơ trống — nói thẳng điều đó bằng 'As this is your first stay', rồi xin MỘT câu hỏi có hai lựa chọn. Chữ question /ˈkwestʃən/ — âm /tʃ/ ở giữa.",
      ),
      also(
        sp(
          "Town, definitely. We love old buildings.",
          t4b,
          "Câu trả lời của khách chính là nguyên liệu: 'Since you mentioned' + lời khách, rồi MỘT gợi ý bắt đầu từ chính khách sạn.",
          undefined,
          undefined,
          t4a,
        ),
        "Since you mentioned old buildings, madam, I would start with our courtyard, and then the old quarter.",
      ),
      sp(
        "Is the old quarter open on Mondays?",
        t4c,
        "Bạn không chắc: 'I would rather find out' — rồi nói ai biết và KHI NÀO: 'Somebody will know' kèm một mốc giờ.",
        undefined,
        ["rather", "find", "out"],
        t4b,
      ),
      sp(
        "The couple in 908 told me a lot at breakfast. Shall I write it up after my shift?",
        "Only the part they said we could keep. Write that now, before you leave the lounge.",
        "ĐỒNG NGHIỆP hỏi. Ghi cuối ca là ghi lại một bản đã mờ — tên sai, giờ sai. Ghi ngay, và chỉ ghi phần khách cho phép giữ lại.",
        "colleague",
      ),
      also(
        sp(
          "We are not sure what we like yet. Can you just choose for us?",
          "Of course, madam. One question first: would you rather rest or explore?",
          "Khách nhờ bạn chọn hộ — vẫn đừng đoán. 'One question' có hai lựa chọn, rồi mới gợi ý.",
        ),
        "Of course, madam. May I ask one question first? Would you rather rest or explore?",
      ),
      sp(
        "I do not know if the ferry runs on Mondays. What do I tell the guest?",
        "Say somebody will know, and give an hour you can keep.",
        "ĐỒNG NGHIỆP hỏi. 'Somebody will know' chỉ thành lời hứa khi đi kèm một mốc giờ bạn giữ được.",
        "colleague",
      ),
    ],
    reading: read(
      `THE EMPTY FILE
A new guest arrives with nothing on file, and that is not a problem. It is the most honest half hour you will have with them.
Do not read them an empty page. Say "As this is your first stay with us…", and then ask one question. One. "Beach or town?" takes two seconds and gives you enough to work with all week.
Five questions is an interview. A guest who has just come off a flight will answer politely and remember none of it fondly.
When you do not know something, say who will: "Somebody will know." But it needs an hour, or it is only a kind sentence. "By this evening" is an hour; "soon" is not.
Write things down while you remember them. At the end of a shift the names blur, the times move, and the thing a guest said quietly is the first thing to go. Update the file before you leave the lounge, and write only what the guest agreed you could keep.`,
      [
        {
          q: "Khách lần đầu, hồ sơ trống. Nên hỏi bao nhiêu câu?",
          options: [
            "Năm câu để dựng hồ sơ đầy đủ",
            "Một câu, có sẵn hai lựa chọn",
            "Không hỏi gì, để khách tự nói ra",
          ],
          correct: 1,
          explanation: `Bài đọc: "Five questions is an interview." Một câu có hai lựa chọn chỉ mất hai giây.`,
        },
        {
          q: "'Somebody will know' cần thêm gì mới thành lời hứa?",
          options: ["Một cái tên của đồng nghiệp", "Một lời xin lỗi thật lòng", "Một mốc giờ"],
          correct: 2,
          explanation: `Bài đọc: "But it needs an hour, or it is only a kind sentence."`,
        },
        {
          q: "Vì sao phải ghi ngay chứ không để cuối ca?",
          options: [
            "Vì cuối ca tên, giờ và lời khách nói khẽ sẽ rơi mất",
            "Vì hệ thống tự khoá hồ sơ ngay sau giờ làm việc của ca",
            "Vì quản lý kiểm tra hồ sơ cuối mỗi ca",
          ],
          correct: 0,
          explanation: `Bài đọc: "At the end of a shift the names blur, the times move, and the thing a guest said quietly is the first thing to go."`,
        },
      ],
    ),
    game: [
      round(
        "We have never been to Vietnam before. Where do we start?",
        [
          [
            "Most first-time guests do the city tour, sir, so I will book that one for you.",
            "register",
          ],
          ["May I ask one question first, sir — would you like to resting or to explore?", "form"],
          ["May I ask one question first, sir — would you like to rest or to explore?", "answer"],
        ],
        "Câu này gán khách vào 'khách lần đầu nào cũng…' rồi còn tự đặt tour — vừa đoán vừa chốt hộ. Câu sai ngữ pháp dùng 'to resting'; sau 'would you like to' là động từ nguyên mẫu: 'to rest'. Đáp án xin một câu hỏi trước.",
      ),
      round(
        "Can I just tell the guest the ferry usually runs on Mondays?",
        [
          ["Yes — it usually does, and the timetable hardly ever changes.", "register"],
          ["Only if you know. If not, say somebody will know, and give an hour.", "answer"],
          ["Only if you know. If not, say somebody will knows, and give an hour.", "form"],
        ],
        "Câu này nói 'thường thì có' — một phỏng đoán đội lốt dữ kiện; khách lỡ chuyến thì lỗi là của khách sạn. Câu sai ngữ pháp: sau 'will' là 'know', không phải 'knows'. Đáp án: chỉ nói điều mình biết, còn lại thì hẹn giờ.",
        "colleague",
      ),
    ],
  }),
];

export const week: AuthoredWeek = {
  title: {
    en: "Advice Built on What the Guest Said",
    vi: "Tư vấn cá nhân hoá — dựa trên lời khách",
  },
  canDo:
    "Nói được: đưa một gợi ý dựa trên chính lời khách ('Since you mentioned…', 'Based on that…') rồi trả quyền quyết định lại cho khách; xin phép trước khi ghi sở thích vào hồ sơ; báo dị ứng cho bếp ngay bằng phiếu; mở lời đúng với khách quay lại lẫn khách lần đầu; và không xác nhận với người gọi rằng một vị khách đang ở đây.",
  lessons,
};
