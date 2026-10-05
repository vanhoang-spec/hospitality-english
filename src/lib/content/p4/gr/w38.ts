// GR week 38 — storms and disrupted plans (the Guest Relations exception:
// see docs/curriculum-level-matrix.md, Phase 4 — 36 evacuation, 37 medical,
// 38 storms).
//
// Rewritten after the first blind round of the reopened Phase 4 (7ed3254).
// The old week promised what the weeks around it forbid: "The hotel is built
// for this" (the evacuation week says you may not say it is safe), "We
// expect it to pass by Friday" (a forecast), "The airline will rebook you at
// no extra cost" (a promise for a third party), "I will refund it in full
// today" and "the cooking class as our guest" (money and a gift the desk does
// not own). Now:
//  · the matrix's three-part structure, for the one thing every guest asks:
//    what has happened, what it means for you, and the next update — with
//    "within the hour" as the hour you own, never a forecast;
//  · the printed storm programme may be read aloud (printed policy, as in the
//    complaints week): the first clear day, a rain check, or a refund; the
//    concierge desk does the booking and the refund, and anything on top is
//    the manager's to give;
//  · a stranded guest's room and rate are the front office's, the flight is
//    the airline's only;
//  · on the storm night: what happened, what still works, the stairs and not
//    the lift, and a storm keeps people in — the opposite of a fire.
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

// ── Lesson 1 — the warning and the next update ─────────────────────────────
const t1a =
  "A weather warning has been issued, madam, so please stay indoors, away from the windows.";
const t1b = "I cannot promise that, madam. The next update is within the hour, at the lounge desk.";
const t1c =
  "Please stay indoors until then. The lounge and the restaurant are open as normal, madam.";

// ── Lesson 2 — plans the storm took away ───────────────────────────────────
const t2a =
  "I am sorry, sir, it has been postponed. The storm programme offers the first clear day, or a rain check.";
const t2b =
  "Then a rain check or a refund, sir. The concierge desk does both, and I will walk you over.";
const t2c =
  "Anything extra is my manager's to give, sir. Let me check with her while the concierge desk does the refund.";

// ── Lesson 3 — stranded ────────────────────────────────────────────────────
const t3a = "I am sorry, madam. I am asking the front office to extend your stay now.";
const t3b = "The front office will confirm the rate, madam. I would rather find out than guess.";
const t3c = "Only the airline can change that, madam. May I help you call them from here?";

// ── Lesson 4 — the storm night ─────────────────────────────────────────────
const t4a = "It is a power cut from the storm, madam. There is a torch in your wardrobe.";
const t4b =
  "I do not know that yet, madam. The generator keeps the corridors lit, and I will call you within the hour.";
const t4c =
  "Please use the stairs tonight, madam, not the lift. The stair lights are on the generator.";

const lessons = [
  L(38, 1, "The Warning and the Next Update", "Cảnh báo bão và lần cập nhật tiếp theo", {
    vocabulary: [
      c("Weather warning", "A weather warning has been issued for tonight, sir.", [
        "/ˈweðə ˈwɔːnɪŋ/",
        "cảnh báo thời tiết (của cơ quan chức năng)",
        "⛈️",
      ]),
      c("As a precaution", "The beach is closed as a precaution, madam.", [
        "/æz ə prɪˈkɔːʃn/",
        "để phòng ngừa",
        "🚧",
      ]),
      c("Stay indoors", "Please stay indoors until the next update, sir.", [
        "/steɪ ˌɪnˈdɔːz/",
        "ở trong nhà",
        "🏠",
      ]),
      c("Away from the windows", "Please wait away from the windows, madam.", [
        "/əˈweɪ frəm ðə ˈwɪndəʊz/",
        "tránh xa cửa kính",
        "🪟",
      ]),
      c("The next update", "The next update is within the hour, at the lounge desk.", [
        "/ðə nekst ˈʌpdeɪt/",
        "lần cập nhật tiếp theo",
        "🕘",
      ]),
    ],
    grammar: [
      g(
        "Big storm coming tonight. Stay inside.",
        "A weather warning has been issued for tonight, so the pool is closed as a precaution.",
        "Bị động 'has been issued' cho khách thấy thông tin đến từ cơ quan chức năng, không phải ý kiến của khách sạn. Hiện tại hoàn thành bị động: has been + quá khứ phân từ — 'issued', không phải 'issue'.",
        "A weather warning has been issue for tonight, so the pool is closed as a precaution.",
      ),
      g(
        "Do not worry, madam. The hotel is built for this.",
        "Please stay indoors, madam, away from the windows. The next update is within the hour.",
        "Không ai ở quầy hứa được một toà nhà an toàn trước cơn bão. Thay lời hứa bằng một việc để làm và một mốc giờ của chính bạn. 'Indoors' là trạng từ, có -s ở cuối: 'stay indoors', không phải 'stay indoor'.",
        "Please stay indoor, madam, away from the windows. The next update is within the hour.",
      ),
    ],
    speaking: [
      also(
        sp(
          "Is this storm dangerous? Should we be worried?",
          t1a,
          "Phần một và phần hai của một lần cập nhật: chuyện gì đã xảy ra — 'A weather warning has been issued' — rồi điều đó nghĩa là gì với khách: 'stay indoors', 'away from the windows'. Không có chữ safe trong câu.",
          undefined,
          ["weather", "warning", "stay", "indoors", "windows"],
        ),
        "A weather warning has been issued, madam. Please stay indoors, away from the windows.",
      ),
      risk(
        also(
          sp(
            "But is the hotel safe? Can you promise us that?",
            t1b,
            "Câu hỏi này ép bạn hứa — đừng hứa. 'I cannot promise that' là câu thật, rồi phần ba: 'The next update' — khi nào, ở đâu. Mốc giờ là của bạn, không phải dự báo thời tiết.",
            undefined,
            ["promise", "next", "update", "within", "hour", "lounge", "desk"],
            t1a,
          ),
          "I am not able to promise that, madam. The next update is within the hour, at the lounge desk.",
          "I cannot promise that, madam, but the next update is within the hour, at the lounge desk.",
        ),
      ),
      sp(
        "All right. What should we do until then?",
        t1c,
        "Khách hỏi phải làm gì — cho một việc ('stay indoors') và những chỗ vẫn mở bình thường. Người có chỗ để đi thì bớt hỏi lại.",
        undefined,
        ["stay", "indoors", "lounge", "restaurant", "open"],
        t1b,
      ),
      also(
        sp(
          "Why is the beach closed? It is only a bit of wind.",
          "A weather warning has been issued, sir, so the beach is closed as a precaution.",
          "Nói lý do đến từ đâu — cảnh báo của cơ quan chức năng — rồi nói đó là 'a precaution'. Đừng cãi về cơn gió, và đừng đoán khi nào bãi biển mở lại.",
          undefined,
          ["weather", "warning", "beach", "closed", "precaution"],
        ),
        "A weather warning has been issued, sir. The beach is closed as a precaution.",
      ),
      sp(
        "The radio says it will be over by Friday. Shall I tell the guests that?",
        "No. We only say what the warning says, and when the next update is.",
        "ĐỒNG NGHIỆP hỏi. Dự báo của đài không phải thông báo của khách sạn. Bạn chỉ nói điều cảnh báo nói, và 'the next update'.",
        "colleague",
        ["warning", "next", "update"],
      ),
      sp(
        "Duty Manager. What are guests asking at the lounge desk?",
        "Mostly whether it is safe. I am giving them the warning, what is open, and the next update.",
        "Báo lên cấp trên thì không cần sir: khách hỏi gì nhiều nhất, và bạn đang trả lời bằng ba phần nào. Báo đúng câu hỏi của khách giúp Duty Manager viết thông báo sau.",
        "manager",
        ["warning", "open", "next", "update"],
      ),
    ],
    reading: read(
      `THE WARNING AND THE NEXT UPDATE
A storm does not arrive like a fire. It is announced a day ahead, and the guests have a whole day to ask you about it. Most of them ask one question: is it safe?
You cannot answer that, and you must not try. "The hotel is built for this" and "It will pass by Friday" are promises nobody at this desk can keep. The warning comes from the authorities, not from you.
So give every guest the same three parts. First, what has happened: "A weather warning has been issued." Second, what it means for them: what is closed as a precaution, what is open, and where to be. "Please stay indoors, away from the windows." Third, the next update: when it is, and where. "The next update is within the hour, at the lounge desk."
The third part is the one that works. A guest who knows when the next update is stops asking every ten minutes.
Read from the notice the Duty Manager gives you. Do not add to it, and do not guess the weather from the radio. In a storm, saying less is the kind thing to do.`,
      [
        {
          q: "Khách hỏi 'khách sạn có an toàn không?'. Vì sao không được nói 'The hotel is built for this'?",
          options: [
            "Vì đó là lời hứa không ai ở quầy giữ được",
            "Vì câu đó nghe quá tự tin, khách nước ngoài sẽ không tin lời nhân viên",
            "Vì chỉ giám đốc khách sạn mới được phép nói câu đó",
          ],
          correct: 0,
          explanation: `Bài đọc: "'The hotel is built for this' and 'It will pass by Friday' are promises nobody at this desk can keep."`,
        },
        {
          q: "Ba phần của một lần cập nhật cho khách là gì?",
          options: [
            "Nguyên nhân cơn bão, giờ bão tan theo dự báo của đài, và lời xin lỗi của khách sạn",
            "Chuyện gì đã xảy ra, nghĩa là gì với khách, và lần cập nhật tới",
            "Tên bộ phận phụ trách, số điện thoại, và giờ đóng cửa",
          ],
          correct: 1,
          explanation: `Bài đọc: "First, what has happened… Second, what it means for them… Third, the next update: when it is, and where."`,
        },
        {
          q: "Thông tin về thời tiết bạn nói với khách lấy từ đâu?",
          options: [
            "Từ đài phát thanh, vì đài cập nhật nhanh nhất",
            "Từ kinh nghiệm của những mùa bão những năm trước ở khách sạn",
            "Từ thông báo Duty Manager đưa — không thêm, không đoán",
          ],
          correct: 2,
          explanation: `Bài đọc: "Read from the notice the Duty Manager gives you. Do not add to it, and do not guess the weather from the radio."`,
        },
      ],
    ),
    game: [
      round(
        "Is it safe to stay here tonight? Just tell me honestly.",
        [
          [
            "Absolutely, madam — the hotel is built for storms like this one, so please just relax.",
            "register",
          ],
          ["I cannot promise that, madam. Please stay indoors, away from the windows.", "answer"],
          [
            "Absolutely, madam — the hotel is build for storms like this one, so please just relax.",
            "form",
          ],
        ],
        "Câu này hứa toà nhà an toàn — lời hứa không ai ở quầy giữ được. Câu sai ngữ pháp cũng hứa an toàn y như thế, lại dùng 'is build'; bị động là 'is built' (be + quá khứ phân từ). Đáp án không hứa, và cho khách một việc để làm.",
      ),
      round(
        "The radio says it will all be over by Friday. Shall I tell the guests?",
        [
          ["No. Give them the warning and the next update, and nothing from the radio.", "answer"],
          ["Yes — it will calm everyone down, and the radio is usually right.", "register"],
          ["No. Gives them the warning and the next update, and nothing from the radio.", "form"],
        ],
        "Câu này biến dự báo của đài thành lời của khách sạn — nếu bão kéo dài, khách sạn đã hứa sai. Câu sai ngữ pháp dùng 'Gives' ở đầu một câu mệnh lệnh; mệnh lệnh dùng động từ nguyên mẫu: 'Give'. Đáp án chỉ nói cảnh báo và lần cập nhật tới.",
        "colleague",
      ),
    ],
  }),

  L(38, 2, "Plans the Storm Took Away", "Kế hoạch bị cơn bão lấy mất", {
    vocabulary: [
      c("Postponed", "Tomorrow's boat trip has been postponed because of the storm.", [
        "/pəˈspəʊnd/",
        "bị hoãn lại",
        "⏸️",
      ]),
      c("Rain check", "May I offer you a rain check for your next stay, madam?", [
        "/ˈreɪn tʃek/",
        "phiếu hẹn dùng lại dịch vụ vào dịp khác",
        "🎟️",
      ]),
      c("The first clear day", "The trip can move to the first clear day, sir.", [
        "/ðə fɜːst klɪə deɪ/",
        "ngày đầu tiên trời quang",
        "🌤️",
      ]),
      c(
        "The storm programme",
        "The storm programme is printed, and it is the same for every guest.",
        ["/ðə stɔːm ˈprəʊɡræm/", "chương trình in sẵn cho ngày bão", "📋"],
      ),
      c("Refund", "The concierge desk does the refund under the storm programme.", [
        "/ˈriːfʌnd/",
        "khoản hoàn tiền",
        "💵",
      ]),
    ],
    grammar: [
      g(
        "Tour cancelled. The weather is not our fault.",
        "I am sorry, sir. Tomorrow's boat trip has been postponed because of the storm.",
        "Xin lỗi về SỰ VIỆC, rồi báo tin bằng bị động — 'has been postponed' — vì không ai trong khách sạn chọn hoãn chuyến đi. Has been + quá khứ phân từ: 'postponed', không phải 'postpone'.",
        "I am sorry, sir. Tomorrow's boat trip has been postpone because of the storm.",
      ),
      g(
        "You can have a refund or nothing.",
        "Would you prefer the first clear day, sir, or a rain check?",
        "Trả quyền chọn cho khách bằng hai lựa chọn cụ thể: 'Would you prefer A, or B?'. 'A rain check' là danh từ đếm được số ít — có 'a' thì không thêm -s.",
        "Would you prefer the first clear day, sir, or a rain checks?",
      ),
    ],
    speaking: [
      sp(
        "This was our only day for the boat trip. Now what?",
        t2a,
        "Tin xấu một câu — 'it has been postponed' — rồi đọc đúng chương trình in sẵn: hai lựa chọn đầu, nói cùng nhau để khách nghe thấy một sự lựa chọn chứ không phải một danh sách. 'Postponed' /pəˈspəʊnd/ — trọng âm âm tiết hai.",
        undefined,
        ["postponed", "storm", "programme", "first", "clear", "rain", "check"],
      ),
      sp(
        "We leave on Friday morning, so the first clear day is no use to us.",
        t2b,
        "Khách về trước ngày quang thì còn hai lựa chọn: 'a rain check or a refund'. Cả hai do quầy concierge làm — bạn dẫn khách sang, không tự trả tiền ở quầy mình.",
        undefined,
        ["rain", "check", "refund", "concierge", "desk"],
        t2a,
      ),
      also(
        sp(
          "A refund, then. And maybe something for the children instead?",
          t2c,
          "Thứ nằm NGOÀI chương trình — một món quà, một lớp học miễn phí — là của quản lý: 'my manager's to give'. Bạn xin, không hứa, và việc hoàn tiền vẫn đi đúng đường của nó.",
          undefined,
          ["manager's", "give", "check", "concierge", "desk", "refund"],
          t2b,
        ),
        "Anything extra is my manager's to give, sir. Let me check with her while the concierge desk does your refund.",
      ),
      risk(
        also(
          sp(
            "Just give me my money back now, in cash, here at your desk.",
            "The concierge desk does the refund, madam, as the storm programme says. I can take you to them now.",
            "Tiền không đi qua quầy của bạn, kể cả khi khách đòi ngay. Nói ai làm — 'the concierge desk does the refund' — đúng như 'the storm programme' in sẵn, rồi dẫn khách sang.",
            undefined,
            ["concierge", "desk", "refund", "storm", "programme", "says", "take"],
          ),
          "The concierge desk does the refund, madam, as the storm programme says. I can take you over to them now.",
          "The concierge desk does the refund, madam, just as the storm programme says. I can take you to them now.",
        ),
      ),
      sp(
        "The cooking class has empty places. Shall I give it free to the family who lost their boat trip?",
        "Only if the manager agrees. A free class is hers to give, not ours.",
        "ĐỒNG NGHIỆP hỏi. Một lớp học miễn phí là quà có giá tiền — của quản lý, dù lớp còn trống chỗ. Đề xuất với quản lý, đừng tự cho.",
        "colleague",
        ["manager", "give"],
      ),
      also(
        sp(
          "Can the boat company not just go out this afternoon instead?",
          "That is the boat company's decision, madam. I will ask the concierge desk and come back within the hour.",
          "Giờ chạy tàu là của công ty tàu, không phải của bạn — đừng đoán. Nói ai quyết, rồi một mốc giờ của chính bạn: 'within the hour'.",
          undefined,
          ["concierge", "desk", "back", "within", "hour"],
        ),
        "That is the boat company's decision, madam. I will ask the concierge desk and come back to you within the hour.",
      ),
    ],
    reading: read(
      `PLANS THE STORM TOOK AWAY
Every booked trip in a storm becomes a disappointed guest, and most of them find you before they find the concierge desk. Start with the news, in one sentence: "I am sorry, sir. It has been postponed."
Then the storm programme. It is printed, it is the same for every guest, and you may read it aloud. It offers three choices, in this order: the first clear day, a rain check for another stay, or a refund.
The choice is the guest's. Give the first two together, so the guest hears a choice and not a list. If the guest leaves before the first clear day, say so: a rain check or a refund.
The concierge desk books the new date and does the refund. The refund in the programme is already approved; a refund outside it is the Duty Manager's. You walk the guest over, and you never take money back at your own desk.
Some guests ask for something on top: a free class, a dinner, a gift for the children. That is not in the programme, so it is not yours to give. "That is my manager's to give. Let me check with her." Never promise it to calm a guest down.
Do not promise the weather either. "The boat will surely go on Saturday" is a forecast, and forecasts are not yours.`,
      [
        {
          q: "Chương trình ngày bão đưa ra những lựa chọn nào, theo thứ tự nào?",
          options: [
            "Hoàn tiền trước, rồi phiếu hẹn, rồi ngày quang đầu tiên nếu khách vẫn còn ở lại",
            "Ngày quang đầu tiên, phiếu hẹn dùng lại, rồi hoàn tiền",
            "Chỉ hoàn tiền, vì không ai đoán được thời tiết",
          ],
          correct: 1,
          explanation: `Bài đọc: "It offers three choices, in this order: the first clear day, a rain check for another stay, or a refund."`,
        },
        {
          q: "Ai làm việc hoàn tiền cho chuyến đi bị hoãn?",
          options: [
            "Bạn, ngay tại quầy, trả bằng tiền mặt cho nhanh",
            "Duty Manager, sau khi nghe khách trình bày",
            "Quầy concierge — hoàn tiền trong chương trình đã được duyệt sẵn, bạn dẫn khách sang",
          ],
          correct: 2,
          explanation: `Bài đọc: "The concierge desk books the new date and does the refund. The refund in the programme is already approved… You walk the guest over, and you never take money back at your own desk."`,
        },
        {
          q: "Khách xin thêm một lớp học nấu ăn miễn phí cho bọn trẻ. Đó là gì?",
          options: [
            "Ngoài chương trình — quản lý quyết",
            "Một phần của chương trình ngày bão, nên bạn đồng ý ngay cho khách vui",
            "Việc của bếp, vì lớp học do bếp phụ trách",
          ],
          correct: 0,
          explanation: `Bài đọc: "That is not in the programme, so it is not yours to give. 'That is my manager's to give.'"`,
        },
      ],
    ),
    game: [
      round(
        "We fly home on Friday. What good is a new date to us?",
        [
          [
            "Then I will refund it myself right now, sir, and add a free dinner for you both.",
            "register",
          ],
          ["Then a rain check or a refund, sir. The concierge desk handle both.", "form"],
          ["Then a rain check or a refund, sir. The concierge desk handles both.", "answer"],
        ],
        "Câu này tự hoàn tiền tại quầy và còn tặng thêm bữa tối — tiền và quà đều không phải của bạn. Câu sai ngữ pháp dùng 'the concierge desk handle'; chủ ngữ số ít thì động từ thêm -s: 'handles'. Đáp án đọc đúng chương trình và chỉ đúng nơi làm.",
      ),
      round(
        "The family's boat trip is off. Shall I send them dinner on the house tonight?",
        [
          ["Yes — they have had a bad day, so a free dinner is the least we can do.", "register"],
          ["Ask the manager first. A dinner on the house is hers to give.", "answer"],
          ["Yes — they has had a bad day, so a free dinner is the least we can do.", "form"],
        ],
        "Câu này tự tặng một bữa tối miễn phí để bù — quà có giá tiền là của quản lý, dù khách đáng thương đến đâu. Câu sai ngữ pháp cũng tự tặng y như thế, lại dùng 'they has'; 'they' đi với 'have'. Đáp án hỏi quản lý trước.",
        "colleague",
      ),
    ],
  }),

  L(38, 3, "Stranded", "Khách bị kẹt lại vì bão", {
    vocabulary: [
      c("Stranded", "Two families are stranded until the airport opens again.", [
        "/ˈstrændɪd/",
        "bị kẹt lại, không đi được",
        "🧳",
      ]),
      c("Only the airline", "Only the airline can change your flight, madam.", [
        "/ˈəʊnli ði ˈeəlaɪn/",
        "chỉ hãng bay mới (đổi được vé)",
        "✈️",
      ]),
      c("Extend your stay", "I am asking the front office to extend your stay, sir.", [
        "/ɪkˈstend jɔː steɪ/",
        "gia hạn thời gian lưu trú",
        "🛏️",
      ]),
      c(
        "Confirming your dates",
        "The front office can write a letter confirming your dates, madam.",
        ["/kənˈfɜːmɪŋ jɔː deɪts/", "xác nhận ngày lưu trú của quý khách", "📅"],
      ),
    ],
    grammar: [
      g(
        "No problem, the airline will rebook you for free.",
        "Only the airline can change your flight, madam. May I help you call them?",
        "Đừng hứa thay hãng bay — đổi vé và ai trả tiền là việc của họ. Việc của bạn là giúp khách liên lạc. Sau 'can' là động từ nguyên mẫu: 'can change', không phải 'can changes'.",
        "Only the airline can changes your flight, madam. May I help you call them?",
      ),
      g(
        "Same price, I extend you now.",
        "I am asking the front office to extend your stay, sir, and they will confirm the rate.",
        "Phòng trống và giá phòng là của front office — bạn XIN, rồi nói ai sẽ xác nhận giá. Cấu trúc 'ask somebody TO + động từ': 'asking the front office to extend', không phải 'for extend'.",
        "I am asking the front office for extend your stay, sir, and they will confirm the rate.",
      ),
    ],
    speaking: [
      also(
        sp(
          "Our flight is cancelled and the airport is closed. We have nowhere to sleep tonight!",
          t3a,
          "Nỗi lo lớn nhất là chỗ ngủ, nên trả lời nó trước. Gia hạn phòng là việc của front office — bạn nói việc bạn ĐANG làm: 'asking the front office to extend your stay'.",
          undefined,
          ["asking", "front", "office", "extend", "stay"],
        ),
        "I am so sorry, madam. I am asking the front office to extend your stay right now.",
      ),
      sp(
        "And at the same price, I hope?",
        t3b,
        "Giá do front office xác nhận. Bạn chưa biết thì nói đúng câu đã học — 'I would rather find out than guess' — vì một giá bạn đoán sẽ thành một giá bạn đã hứa.",
        undefined,
        ["front", "office", "confirm", "rather", "find", "out"],
        t3a,
      ),
      risk(
        also(
          sp(
            "And our flight home? Can you change it for us?",
            t3c,
            "Vé là của hãng bay — 'Only the airline' mới đổi được, và chỉ họ mới nói được ai trả tiền những đêm ở thêm. Đừng hứa thay họ; giúp khách gọi.",
            undefined,
            ["airline", "change", "help", "call"],
            t3b,
          ),
          "Only the airline can change that, madam. May I help you call them now?",
          "I am afraid only the airline can change that, madam. May I help you call them from here?",
        ),
      ),
      sp(
        "Our insurance company wants proof that we were stuck here because of the storm.",
        "I will ask the front office for a letter confirming your dates, sir, and bring it to you.",
        "Thư xác nhận do front office viết; bạn xin giúp khách và mang tới tận tay. Cụm 'confirming your dates' đứng ngay sau 'a letter' — một mệnh đề rút gọn.",
        undefined,
        ["front", "office", "letter", "confirming", "dates"],
      ),
      sp(
        "Shall I tell the stranded families the airline will pay for their extra nights?",
        "Not unless the airline says so. Tell them only what the front office confirms.",
        "ĐỒNG NGHIỆP hỏi. Ai trả tiền những đêm ở thêm là chuyện của hãng bay, và giá là của front office. Không ai ở quầy được hứa thay hai bên đó.",
        "colleague",
        ["airline", "front", "office", "confirms"],
      ),
      sp(
        "Duty Manager. Where are we with the stranded guests?",
        "I have every stranded guest on one sheet, with their rooms and flights, for the front office.",
        "Báo lên cấp trên thì không cần sir. Một danh sách duy nhất cho front office và Duty Manager — để không vị khách nào phải kể lại chuyện của mình hai lần.",
        "manager",
        ["stranded", "sheet", "front", "office"],
      ),
    ],
    reading: read(
      `STRANDED
When the airport closes, guests who should be leaving are suddenly staying. They arrive at your desk with three worries, and they usually say all three at once: a bed tonight, the price, and the flight home.
Take them in that order. The bed comes first, because it is the one that frightens people. Extending a stay is the front office's job: they know which rooms are free and at what rate. So say what you are doing: "I am asking the front office to extend your stay now."
Then the price. You may not know it, and you must not guess it. "The front office will confirm the rate." A rate you guessed becomes a rate you promised.
Then the flight. Only the airline can change it, and only the airline can say who pays for the extra nights. Help the guest reach them, and do not promise anything for them.
Insurers often ask for proof. The front office can write a letter confirming the guest's dates and the reason for the stay. Ask for it the same day.
Keep one sheet of every stranded guest for the front office and the Duty Manager. Nobody should have to tell their story twice.`,
      [
        {
          q: "Khách bị kẹt có ba nỗi lo. Bạn xử lý theo thứ tự nào?",
          options: [
            "Chuyến bay, giá phòng, rồi chỗ ngủ",
            "Chỗ ngủ trước, vì đó là điều làm khách sợ nhất; rồi giá phòng, rồi chuyến bay",
            "Giá phòng trước tiên, vì khách nào cũng hỏi về tiền nhiều nhất",
          ],
          correct: 1,
          explanation: `Bài đọc: "The bed comes first, because it is the one that frightens people… Then the price… Then the flight."`,
        },
        {
          q: "Ai xác nhận giá cho những đêm khách ở thêm?",
          options: [
            "Front office — họ biết phòng nào còn trống, và trống với giá nào",
            "Hãng bay, vì chuyến bay bị huỷ là việc của hãng",
            "Bạn, dựa theo giá khách đã đặt lần đầu",
          ],
          correct: 0,
          explanation: `Bài đọc: front office "know which rooms are free and at what rate", nên "'The front office will confirm the rate.' A rate you guessed becomes a rate you promised."`,
        },
        {
          q: "Công ty bảo hiểm của khách cần giấy tờ chứng minh. Bạn làm gì?",
          options: [
            "Tự viết một lá thư xác nhận và ký bằng tên của chính mình",
            "Bảo khách tự đi xin hãng bay",
            "Nhờ front office viết thư xác nhận ngày ở",
          ],
          correct: 2,
          explanation: `Bài đọc: "The front office can write a letter confirming the guest's dates and the reason for the stay."`,
        },
      ],
    ),
    game: [
      round(
        "The airline will pay for our extra nights, won't they?",
        [
          ["I am afraid only the airline can say that, madam. May I help you call them?", "answer"],
          ["Of course, madam — that is what airlines always do in a storm.", "register"],
          ["Only the airline can says that, madam. May I help you call them?", "form"],
        ],
        "Câu này hứa thay hãng bay — một lời hứa về tiền của bên thứ ba. Câu sai ngữ pháp dùng 'can says'; sau 'can' là động từ nguyên mẫu. Đáp án nói đúng ai trả lời được, và giúp khách liên lạc.",
      ),
      round(
        "A stranded guest wants the same rate for two more nights. Can I just say yes?",
        [
          ["Yes — it is not his fault, so the same rate is only fair.", "register"],
          ["Yes — it is not his fault, so same rate is only fair.", "form"],
          ["No, the front office confirms the rate. Ask them, and come back to him.", "answer"],
        ],
        "Câu này tự hứa giá — giá phòng là của front office, dù lý do nghe công bằng. Câu sai ngữ pháp cũng tự hứa giá y như thế, lại thiếu mạo từ: phải là 'so THE same rate'. Đáp án hỏi đúng người rồi quay lại với khách.",
        "colleague",
      ),
    ],
  }),

  L(38, 4, "The Storm Night", "Đêm bão — mất điện và thang máy", {
    vocabulary: [
      c("Power cut", "It is a power cut from the storm, sir.", ["/ˈpaʊə kʌt/", "mất điện", "🔌"]),
      c("Generator", "The generator keeps the corridors and the stair lights on.", [
        "/ˈdʒenəreɪtə/",
        "máy phát điện",
        "⚡",
      ]),
      c("Torch", "There is a torch in the wardrobe of every room, madam.", [
        "/tɔːtʃ/",
        "đèn pin",
        "🔦",
      ]),
      c("Worried about", "I understand you are worried about the windows, madam.", [
        "/ˈwʌrid əˈbaʊt/",
        "lo lắng về",
        "😟",
      ]),
    ],
    grammar: [
      g(
        "Power is out. Use your phone light.",
        "There is a torch in your wardrobe, madam, and the generator keeps the corridors lit.",
        "Nói thứ CÒN hoạt động ngay sau thứ đã hỏng — người ở trong bóng tối cần biết mình có gì trong tay. Chủ ngữ số ít 'the generator' thì động từ thêm -s: 'keeps'.",
        "There is a torch in your wardrobe, madam, and the generator keep the corridors lit.",
      ),
      g(
        "Do not worry, the power will be back in ten minutes.",
        "I do not know when the power will be back, sir, so I will call you within the hour.",
        "Đừng đoán giờ có điện thay bộ phận kỹ thuật. Câu hỏi gián tiếp giữ trật tự câu kể: 'when the power will be back', không đảo thành 'when will the power be back'.",
        "I do not know when will the power be back, sir, so I will call you within the hour.",
      ),
    ],
    speaking: [
      also(
        sp(
          "The lights have just gone out! What is happening?",
          t4a,
          "Phần một: chuyện gì đã xảy ra — 'a power cut from the storm'. Rồi ngay thứ khách có trong tay: 'a torch in your wardrobe'. Chữ torch /tɔːtʃ/ — không bật âm r.",
          undefined,
          ["power", "cut", "storm", "torch"],
        ),
        "It is a power cut from the storm, madam. There is a torch in your wardrobe for you.",
      ),
      sp(
        "Found it. When will the power come back on?",
        t4b,
        "Bạn không biết, và kỹ thuật có khi cũng chưa biết — nói đúng câu đã học: 'I do not know that yet'. Rồi thứ còn chạy ('the generator') và một mốc giờ của chính bạn.",
        undefined,
        ["yet", "generator", "call", "within", "hour"],
        t4a,
      ),
      sp(
        "My husband wants to take the lift down to the restaurant.",
        t4c,
        "Khi điện chưa ổn thì không đi thang máy. Một lệnh, một lý do: 'use the stairs', vì đèn cầu thang chạy bằng máy phát.",
        undefined,
        ["stairs", "lift", "generator"],
        t4b,
      ),
      risk(
        also(
          sp(
            "Hello? The lift has stopped between floors, and the light has gone off!",
            "Please stay on the line, sir. I am calling security to you now.",
            "Giữ khách trên máy bằng đúng câu đã học — 'stay on the line' — và gọi bảo vệ. Đừng tự đi mở cửa thang máy, và đừng hứa mấy phút nữa sẽ ra được.",
            undefined,
            ["stay", "line", "calling", "security"],
          ),
          "Please stay on the line with me, sir. I am calling security to you now.",
          "Please stay on the line, sir. I am calling security for you right now.",
        ),
      ),
      also(
        sp(
          "I am worried about the windows. They are shaking in the wind.",
          "I understand you are worried about the windows, madam. Please wait in the corridor, away from them.",
          "Khách lo là đúng — đừng nói nothing to worry about. Nhắc lại đúng nỗi lo bằng 'worried about', rồi một việc để làm: chờ ở hành lang, tránh xa cửa kính.",
          undefined,
          ["worried", "windows"],
        ),
        "I understand you are worried about the windows, madam. Please wait in the corridor, away from the windows.",
      ),
      sp(
        "Guests in the lounge keep asking when the power will be back on.",
        "Say we do not know yet, and give them the time of the next update.",
        "ĐỒNG NGHIỆP hỏi. Cùng một khuôn cho mọi khách: không đoán giờ, và đưa một mốc cập nhật. Câu chuyển lời 'Say we do not know yet' không có sir hay madam.",
        "colleague",
        ["yet", "next", "update"],
      ),
    ],
    reading: read(
      `THE STORM NIGHT
On a storm night the power may go, and every telephone at your desk will ring at once. The guest in the dark wants three things: to know what happened, to know what still works, and to hear a person.
Say what happened in one sentence: "It is a power cut from the storm." Then say what still works. In this house the generator keeps the corridors and the stair lights on, and there is a torch in every wardrobe. Ask your manager what your own generator covers.
Do not say when the power will be back. You do not know, and the engineers may not know either. Give the time of the next update instead.
Keep guests off the lifts until the power is steady, and send them to the stairs. If a lift stops with a guest inside, keep them on the line and call security. Do not try to open the doors yourself.
A guest who is worried about the windows is right to be. Ask her to wait away from them, in the corridor, and tell engineering the room.
A storm keeps people in, not out. If the Duty Manager gathers guests, it is in the ballroom, never in the garden.`,
      [
        {
          q: "Khách hỏi bao giờ có điện lại. Bạn nói gì?",
          options: [
            "'Mười phút nữa thôi', để khách yên tâm chờ trong phòng",
            "Không đoán — nói giờ của lần cập nhật tới",
            "Bảo khách gọi thẳng cho bộ phận kỹ thuật",
          ],
          correct: 1,
          explanation: `Bài đọc: "Do not say when the power will be back… Give the time of the next update instead."`,
        },
        {
          q: "Thang máy dừng giữa hai tầng, có khách bên trong. Bạn làm gì?",
          options: [
            "Giữ khách trên máy và gọi bảo vệ; cửa thang máy để bảo vệ mở",
            "Chạy lên tự cạy cửa thang máy cho khách ra",
            "Hẹn khách chờ, rồi nghe các cuộc gọi khác",
          ],
          correct: 0,
          explanation: `Bài đọc: "If a lift stops with a guest inside, keep them on the line and call security. Do not try to open the doors yourself."`,
        },
        {
          q: "Trong bão, nếu Duty Manager cho tập trung khách thì ở đâu?",
          options: [
            "Ngoài vườn, giống như khi có chuông báo cháy",
            "Ở bãi xe, cho gần lối ra nhất",
            "Trong phòng tiệc",
          ],
          correct: 2,
          explanation: `Bài đọc: "A storm keeps people in, not out. If the Duty Manager gathers guests, it is in the ballroom, never in the garden."`,
        },
      ],
    ),
    game: [
      round(
        "When is the power coming back? I need to charge my phone.",
        [
          [
            "In ten minutes or so, sir — a power cut never lasts very long in this part of town.",
            "register",
          ],
          ["I do not know that yet, sir. The next update is within the hour.", "answer"],
          [
            "In ten minutes or so, sir — a power cut never last very long in this part of town.",
            "form",
          ],
        ],
        "Câu này đoán giờ có điện — nếu sai, khách sẽ gọi lại mỗi mười phút. Câu sai ngữ pháp cũng đoán giờ y như thế, lại thiếu -s: 'a power cut' số ít nên phải là 'lasts'. Đáp án nói thật và đưa mốc cập nhật.",
      ),
      round(
        "The lift seems to be working again. Can we take it down to dinner?",
        [
          ["Please use the stair tonight, madam, until the power is steady.", "form"],
          ["Please use the stairs tonight, madam, until the power is steady.", "answer"],
          ["Of course, madam — if it is moving again, it must be fine now.", "register"],
        ],
        "Câu này cho đi thang máy khi điện chưa ổn — nếu mất điện lần nữa, khách bị kẹt giữa hai tầng. Câu sai ngữ pháp dùng 'the stair'; đi cầu thang là 'the stairs', số nhiều. Đáp án giữ khách ở cầu thang cho tới khi điện ổn định.",
      ),
    ],
  }),
];

export const week: AuthoredWeek = {
  title: { en: "Storms and Disrupted Plans", vi: "Bão và lịch trình bị gián đoạn" },
  canDo:
    "Nói được: cập nhật cho khách theo ba phần — chuyện gì đã xảy ra, điều đó nghĩa là gì với khách, và lần cập nhật tới — mà không hứa 'an toàn' hay đoán thời tiết; đọc đúng chương trình ngày bão (ngày quang đầu tiên, phiếu hẹn, hoàn tiền) và đưa khách sang quầy concierge; nhờ front office gia hạn phòng cho khách bị kẹt, để hãng bay nói chuyện vé; và hướng dẫn khách khi mất điện: đèn pin, cầu thang thay thang máy, tránh xa cửa kính.",
  lessons,
};
