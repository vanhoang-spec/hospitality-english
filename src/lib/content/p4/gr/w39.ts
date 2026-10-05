// GR week 39 — the busy shift: two new rules, and two lessons that put the
// earlier weeks' situations side by side.
//
// Rewritten after the first blind round of the reopened Phase 4 (7ed3254).
// The round confirmed that this week already taught both rules the matrix
// asks for, and the ideas stay: (1) when several things arrive at once,
// danger comes first and "first" is an ACTION — an ambulance, security or
// first aid called now, the Duty Manager after, somebody staying with the
// guest — then the person in front of you, the telephone, the messages, and
// among the rest the soonest hour; (2) nothing new is opened in the last
// fifteen minutes of a shift: it is written down and handed over by name,
// and danger never waits for the clock. What changed:
//  · the collapse is the medical week's script word for word — "Is he
//    breathing?", not breathing or not sure: an ambulance; breathing: first
//    aid and the Duty Manager — so the two weeks can no longer disagree;
//  · one page of reading per lesson (the old ones ran to 741 words and
//    quoted week numbers), five to seven turns per lesson with a chain, and
//    every game round explained;
//  · the internal rule ("quarter to") is said to colleagues, never read out
//    to a guest: the guest hears what is being done and by whom.
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

// ── Lesson 1 — danger first ────────────────────────────────────────────────
const t1a = "May I take them in order, madam? The table first, because it has the soonest hour.";
const t1b = "I am coming back to that within the hour, madam, and to the tour after it.";
const t1c =
  "Tonight's table has the soonest hour, madam, so it comes first. The tour is still on my list.";

// ── Lesson 2 — the file says yes, the desk says no ─────────────────────────
const t2a =
  "The file says a corner table, madam. The table is theirs to give, and I am asking the restaurant now.";
const t2b = "I am asking, not promising, madam. I will come back to you within the half hour.";
const t2c = "What I can do meanwhile is keep you a quiet table in the lounge, madam.";

// ── Lesson 3 — the promise you cannot find ─────────────────────────────────
const t3a = "That is a promise I cannot find yet, sir. I would rather find out than guess.";
const t3b = "Who said it and when, sir? And was it written or spoken?";
const t3c = "Thank you, sir. I am writing it all down, and the upgrade is my manager's to give.";

// ── Lesson 4 — the last fifteen minutes ────────────────────────────────────
const t4a =
  "I am writing it down now, madam, and handing it to my colleague by name before I leave.";
const t4b = "No, madam. My colleague will have it all in writing, in your own words.";
const t4c = "A refund is my Duty Manager's to decide, madam, and she will have it before I leave.";

const lessons = [
  L(39, 1, "Danger First", "Nguy hiểm trước — và 'trước' nghĩa là làm gì", {
    vocabulary: [
      c("Danger first", "Danger first: a child alone by the pool comes before any queue.", [
        "/ˈdeɪndʒə fɜːst/",
        "người gặp nguy hiểm được lo trước tiên",
        "🚨",
      ]),
      c("May I take them in order", "Three requests at once? May I take them in order, madam?", [
        "/meɪ aɪ teɪk ðəm ɪn ˈɔːdə/",
        "tôi xin làm lần lượt từng việc",
        "🔢",
      ]),
      c("The soonest hour", "The request with the soonest hour goes first, sir.", [
        "/ðə ˈsuːnɪst ˈaʊə/",
        "mốc giờ sớm nhất (làm trước)",
        "⏳",
      ]),
      c("I am coming back to that", "I am coming back to that within the hour, sir.", [
        "/aɪ əm ˈkʌmɪŋ ˈbæk tə ðæt/",
        "tôi sẽ quay lại việc đó",
        "↩️",
      ]),
      c("Not the loudest", "Serve the order, not the loudest guest in the lobby.", [
        "/nɒt ðə ˈlaʊdɪst/",
        "không phải người to tiếng nhất (được phục vụ trước)",
        "🔇",
      ]),
    ],
    grammar: [
      g(
        "The tour first then, madam, since you said it first.",
        "May I take them in order, madam? The table at seven has the soonest hour.",
        "Ba việc cùng lúc thì thứ tự không phải ai nói trước: mốc giờ sớm nhất đi trước. Xin phép xếp thứ tự bằng 'May I take them in order?' — sau 'may I' là động từ nguyên mẫu.",
        "May I taking them in order, madam? The table at seven has the soonest hour.",
      ),
      g(
        "Wait a moment, sir, I have three guests in front of me.",
        "Danger first: I am calling security now, and I will come back to you, madam.",
        "Nguy hiểm trước nghĩa là một VIỆC làm ngay — gọi bảo vệ, sơ cứu hay xe cấp cứu trước, Duty Manager sau — chứ không phải một chỗ trong hàng. Thì hiện tại tiếp diễn cần đủ 'am': 'I am calling', không phải 'I am call'.",
        "Danger first: I am call security now, and I will come back to you, madam.",
      ),
    ],
    speaking: [
      sp(
        "I need a tour changed for tomorrow, a charge looked at, and a table for seven tonight.",
        t1a,
        "Ba việc trong một hơi là chuyện thường. Xin phép xếp thứ tự — 'May I take them in order' — rồi xếp theo MỐC GIỜ, không theo thứ tự khách kể: bàn tối nay có 'the soonest hour'. Chữ order /ˈɔːdə/ — không bật âm r cuối.",
        undefined,
        ["take", "order", "table", "soonest", "hour"],
      ),
      sp(
        "And the charge? It is wrong, and I am leaving tomorrow.",
        t1b,
        "Việc bạn gác lại phải được GỌI TÊN và có giờ — 'I am coming back to that' — nếu không, khách nghe ra là bị bỏ rơi. Mốc giờ là của chính bạn.",
        undefined,
        ["coming", "back", "within", "hour", "tour"],
        t1a,
      ),
      sp(
        "Could you not do the tour first? I mentioned it first.",
        t1c,
        "Khách nhắc trước không có nghĩa là làm trước. Nói lại lý do bằng đúng chữ của luật — 'the soonest hour' — và cho khách thấy tour vẫn còn trong danh sách của bạn.",
        undefined,
        ["table", "soonest", "hour", "tour", "list"],
        t1b,
      ),
      risk(
        also(
          sp(
            "A lady says her husband has collapsed in his room, and three guests are waiting at my desk.",
            "Danger first: ask her if he is breathing. If he is not, or she is not sure, call an ambulance.",
            "ĐỒNG NGHIỆP hỏi. Ba khách đang chờ không đổi được thứ tự: 'Danger first'. Rồi đúng kịch bản y tế đã học — một câu hỏi trước, không thở hoặc không chắc thì gọi xe cấp cứu. Còn thở thì sơ cứu và Duty Manager.",
            "colleague",
            ["danger", "first", "ask", "breathing", "call", "ambulance"],
          ),
          "Danger first: ask her if he is breathing. If he is not, or if she is not sure, call an ambulance.",
          "Danger first. Ask her if he is breathing, and if he is not, or she is not sure, call an ambulance.",
        ),
      ),
      risk(
        also(
          sp(
            "Excuse me — there is a little boy alone by the pool, and I cannot see his parents.",
            "Thank you, sir. I am going to him now, and I am calling security on the way.",
            "Trẻ em một mình bên nước: chính bạn đi tới chỗ đứa trẻ, gọi bảo vệ trong lúc đi, và ở lại với em — không ghi sổ trước, không để khách trông hộ.",
            undefined,
            ["going", "calling", "security", "way"],
          ),
          "Thank you, sir. I am going to him now, and I am calling security on my way.",
          "Thank you for telling me, sir. I am going to him now, and calling security on the way.",
        ),
      ),
      sp(
        "There is a smell of burning on the fourth floor, and the phone is ringing. Which first?",
        "The burning: which floor, then security first and the Duty Manager after. The phone can wait.",
        "ĐỒNG NGHIỆP hỏi. Mối nguy trong nhà đi trước mọi cuộc gọi: hỏi tầng, rồi bảo vệ trước, Duty Manager sau. Điện thoại chờ được; một hành lang có khói thì không.",
        "colleague",
        ["floor", "security", "first", "duty", "manager", "wait"],
      ),
      sp(
        "The gentleman at the back is shouting. Shall I serve him first to calm him down?",
        "Not the loudest. Serve the order, and tell him politely that he is next.",
        "ĐỒNG NGHIỆP hỏi. Phục vụ người to tiếng trước một lần là dạy cả sảnh rằng to tiếng thì được việc. Giữ thứ tự — 'Not the loudest' — và nói cho ông ấy biết ông ấy là người kế tiếp.",
        "colleague",
        ["loudest", "order", "next"],
      ),
    ],
    reading: read(
      `DANGER FIRST
Some evenings three things arrive together: a guest with three requests, a telephone, and somebody shouting at the back. Here is the order.
Anyone in danger comes first, and "first" means an action, not a place in the queue. A guest who has collapsed: ask if he is breathing, and if he is not, or nobody is sure, call an ambulance. A smell of burning: which floor, then security first and the Duty Manager after. A child alone by the pool: go to the child, and call security as you go. Then stay until somebody takes over.
After danger comes the person in front of you. Then the telephone, and after it the messages. A caller can be asked to hold, but a guest at the desk cannot be left standing unseen.
Among everything else, the soonest hour goes first. A table at seven tonight comes before a tour tomorrow, even when the tour was mentioned first.
Say the order out loud: "May I take them in order?" Name the one you are parking, and give it an hour: "I am coming back to that within the hour."
Never serve the loudest first. Do it once in a full lobby, and every guest learns that a raised voice moves the queue.`,
      [
        {
          q: "Khách báo có một bé trai một mình bên hồ bơi. 'Nguy hiểm trước' nghĩa là làm gì?",
          options: [
            "Tới chỗ đứa trẻ, và gọi bảo vệ trong lúc đi",
            "Ghi vào sổ trước, rồi báo Duty Manager khi rảnh tay",
            "Nhờ vị khách vừa báo trông đứa trẻ giúp trong lúc bạn đi tìm bố mẹ em",
          ],
          correct: 0,
          explanation: `Bài đọc: "A child alone by the pool: go to the child, and call security as you go. Then stay until somebody takes over."`,
        },
        {
          q: "Sau người gặp nguy hiểm, thứ tự tiếp theo là gì?",
          options: [
            "Điện thoại, rồi người đứng trước mặt, rồi tin nhắn",
            "Người đứng trước mặt, rồi điện thoại, rồi tin nhắn",
            "Người to tiếng nhất, để cả sảnh yên lại cho mọi người cùng được phục vụ",
          ],
          correct: 1,
          explanation: `Bài đọc: "After danger comes the person in front of you. Then the telephone, and after it the messages."`,
        },
        {
          q: "Bàn ăn bảy giờ tối nay và tour ngày mai — việc nào làm trước?",
          options: [
            "Tour, vì khách nhắc tới nó trước tiên",
            "Việc nào dễ hơn thì làm trước cho nhanh",
            "Bàn ăn, vì mốc giờ sớm hơn",
          ],
          correct: 2,
          explanation: `Bài đọc: "the soonest hour goes first. A table at seven tonight comes before a tour tomorrow, even when the tour was mentioned first."`,
        },
      ],
    ),
    game: [
      round(
        "I have been waiting longer than anyone here, and I am in a hurry.",
        [
          ["You have, madam, so let me take yours first, before anybody else.", "register"],
          ["You have, madam, and I am sorry. One guest before you, then you.", "answer"],
          ["You has, madam, and I am sorry. One guest before you, then you.", "form"],
        ],
        "Câu này đổi thứ tự vì khách sốt ruột — làm một lần là cả hàng học cách đòi. Câu sai ngữ pháp dùng 'You has'; với 'you' là 'have'. Đáp án ghi nhận khách, xin lỗi, rồi nói rõ khách là người kế tiếp.",
      ),
      round(
        "There is a smell of burning on the fourth floor, and two guests are waiting here.",
        [
          ["Finish the two guests first, then go up and have a look yourself.", "register"],
          ["Security first, then the Duty Manager. The guests can waiting a minute.", "form"],
          ["Security first, then the Duty Manager. The guests can wait a minute.", "answer"],
        ],
        "Câu này để mối nguy chờ sau hàng khách, rồi còn tự đi xem — kiểm tra là việc của bảo vệ. Câu sai ngữ pháp dùng 'can waiting'; sau 'can' là động từ nguyên mẫu. Đáp án: nguy hiểm trước, bảo vệ trước, Duty Manager sau.",
        "colleague",
      ),
    ],
  }),

  L(39, 2, "The File Says Yes, the Desk Says No", "Hồ sơ nói có, quầy khác nói không", {
    vocabulary: [
      c("The file says", "The file says a corner table, madam, and I am asking now.", [
        "/ðə faɪl sez/",
        "hồ sơ có ghi là",
        "🗃️",
      ]),
      c("Theirs to give", "The table is theirs to give — the restaurant's, sir.", [
        "/ðeəz tə ɡɪv/",
        "là quyền của họ (bộ phận khác) quyết định",
        "🤲",
      ]),
      c("I am asking, not promising", "I am asking, not promising, madam.", [
        "/aɪ əm ˈɑːskɪŋ nɒt ˈprɒmɪsɪŋ/",
        "tôi đang xin, chưa phải đang hứa",
        "🙋",
      ]),
      c("What I can do meanwhile", "What I can do meanwhile is keep you a seat in the lounge.", [
        "/wɒt aɪ kən duː ˈmiːnwaɪl/",
        "trong lúc chờ, việc tôi làm được là",
        "⏱️",
      ]),
    ],
    grammar: [
      g(
        "Your file says a corner table, madam, so I will make sure you get one.",
        "The file says a corner table, madam. It is the restaurant's to give, and I am asking them now.",
        "Hồ sơ ghi lại điều khách ĐÃ NÓI, không cấp cho khách một quyền. Đọc hồ sơ ra rồi hứa luôn là hứa thay một bộ phận khác. Chủ ngữ số ít 'the file' thì động từ thêm -s: 'says'.",
        "The file say a corner table, madam. It is the restaurant's to give, and I am asking them now.",
      ),
      g(
        "I am sure they will say yes, because you are a regular guest.",
        "I am asking, not promising, madam. What I can do meanwhile is keep you a seat in the lounge.",
        "Hai vế song song phải cùng dạng: 'asking, not promising' (cùng đuôi -ing). Câu chẻ 'What I can do meanwhile is…' đẩy phần LÀM ĐƯỢC lên đầu câu, để khách nghe nó trước phần phải chờ.",
        "I am asking, not promise, madam. What I can do meanwhile is keep you a seat in the lounge.",
      ),
    ],
    speaking: [
      sp(
        "We always have the corner table. It is in your system — I have seen it.",
        t2a,
        "Khách nói đúng là hồ sơ có ghi — đừng cãi phần đó: 'The file says'. Nhưng cái bàn là của nhà hàng: 'theirs to give'. Rồi nói việc bạn đang làm. Chữ theirs /ðeəz/ — âm /ð/ hữu thanh, đuôi /z/.",
        undefined,
        ["file", "says", "table", "theirs", "give", "restaurant"],
      ),
      also(
        sp(
          "So can you do it or not? It is a simple question.",
          t2b,
          "Câu có-hay-không là câu ép bạn hứa. Trả lời bằng đúng câu của tuần này — 'I am asking, not promising' — rồi một mốc giờ của chính bạn.",
          undefined,
          ["asking", "promising", "back", "within", "half", "hour"],
          t2a,
        ),
        "I am asking, not promising, madam. I will come back to you within half an hour.",
      ),
      sp(
        "And what am I supposed to do until then?",
        t2c,
        "Một lời xin không kèm gì thì thành một cuộc chờ, mà chờ nghe như từ chối. Câu chẻ 'What I can do meanwhile' đưa ngay một việc trong tay bạn.",
        undefined,
        ["meanwhile", "quiet", "table", "lounge"],
        t2b,
      ),
      also(
        sp(
          "My tier should give me lounge access. Just switch it on for me.",
          "I can ask the loyalty office today, sir; however, the lounge is theirs to give.",
          "Hạng thẻ và quyền vào lounge theo hạng là của loyalty office. Vế làm được trước, rồi 'however', rồi vế không dời — đúng bản lề đã học trong tuần đàm phán.",
          undefined,
          ["loyalty", "office", "however", "lounge", "theirs", "give"],
        ),
        "I can ask the loyalty office today, sir. However, the lounge is theirs to give.",
      ),
      risk(
        also(
          sp(
            "The file says I am allergic to nuts. You do not need to tell the kitchen again.",
            "Thank you, madam, but I am writing an allergy slip for the chef now, every time.",
            "Dị ứng không phải sở thích: phiếu tới tay bếp trưởng MỖI LẦN, kể cả khi hồ sơ đã có và khách nói bếp đã biết. Đây là dòng duy nhất trong hồ sơ không ai được bỏ qua.",
            undefined,
            ["writing", "allergy", "slip", "chef", "time"],
          ),
          "Thank you, madam, but I am writing an allergy slip for the chef now, as I do every time.",
          "Thank you, madam. I am still writing an allergy slip for the chef now, every time.",
        ),
      ),
      sp(
        "Just tell her yes, and we will sort the table out with the restaurant afterwards.",
        "It is the restaurant's to give, so I am asking first. She gets my answer within the half hour.",
        "ĐỒNG NGHIỆP nói. 'Cứ nói có rồi tính sau' là một lời hứa mang tên bạn mà thiếu chữ ký của người quyết. Xin trước, rồi hẹn khách một mốc giờ.",
        "colleague",
        ["give", "asking", "within", "half", "hour"],
      ),
    ],
    reading: read(
      `THE FILE SAYS YES, THE DESK SAYS NO
Some requests are allowed by one rule and refused by another, and both rules are right. The guest file says a corner table. The restaurant is full tonight. Neither is a mistake, and neither is yours to overrule.
The file is a record, not a right. It holds what the guest said yes to, in the guest's own words. It tells you what she likes. It does not hand you a table, a late check-out or the lounge.
So do not argue with the file, and do not read it out as a promise. "The file says a corner table" is true. "You always have the corner table" is somebody else's yes.
Name the owner instead. The table is the restaurant's, the room is the front office's, and tier and points are the loyalty office's. Then say two halves in one breath: what you are asking for, and what you can do meanwhile. A request with nothing attached is a wait, and a wait feels like a no.
One line on the file is never a preference: an allergy. It goes to the chef on a slip every time, even when the guest says the kitchen already knows.`,
      [
        {
          q: "Hồ sơ ghi 'bàn góc'. Điều đó nghĩa là gì?",
          options: [
            "Khách có quyền với cái bàn đó mỗi lần tới, kể cả khi nhà hàng đã kín chỗ",
            "Nhà hàng đã hứa giữ sẵn bàn đó cho khách",
            "Khách từng nói thích bàn đó — một ghi chép, không phải một quyền",
          ],
          correct: 2,
          explanation: `Bài đọc: "The file is a record, not a right… It tells you what she likes. It does not hand you a table."`,
        },
        {
          q: "Vì sao phải nói kèm 'What I can do meanwhile'?",
          options: [
            "Để khách quên đi yêu cầu ban đầu của mình và chọn một việc khác dễ làm hơn cho quầy",
            "Vì một lời xin không kèm gì thì thành chờ đợi, và chờ nghe như từ chối",
            "Vì quản lý yêu cầu mỗi lời từ chối phải kèm một món quà",
          ],
          correct: 1,
          explanation: `Bài đọc: "A request with nothing attached is a wait, and a wait feels like a no."`,
        },
        {
          q: "Khách nói bếp đã biết khách dị ứng hạt. Bạn làm gì?",
          options: [
            "Vẫn viết phiếu dị ứng cho bếp trưởng",
            "Tin lời khách, vì hồ sơ đã có ghi chú về dị ứng",
            "Hỏi lại khách xem có chắc là bếp đã biết không",
          ],
          correct: 0,
          explanation: `Bài đọc: "It goes to the chef on a slip every time, even when the guest says the kitchen already knows."`,
        },
      ],
    ),
    game: [
      round(
        "My file says late check-out every time. So it is mine, isn't it?",
        [
          [
            "Of course, sir — anything on your file is yours, so I will extend it myself now.",
            "register",
          ],
          ["The file says it, sir, but the front office gives it. I am asking them now.", "answer"],
          ["The file says it, sir, but the front office give it. I am asking them now.", "form"],
        ],
        "Câu này biến một dòng hồ sơ thành quyền, rồi tự gia hạn phòng — việc của front office. Câu sai ngữ pháp dùng 'the front office give'; chủ ngữ số ít thì 'gives'. Đáp án công nhận hồ sơ, nói ai quyết, và đi xin.",
      ),
      round(
        "Just tell her yes and we will sort the table out later.",
        [
          ["It is theirs to give. I am ask first.", "form"],
          ["It is theirs to give. I am asking first.", "answer"],
          [
            "Fine — she will calm down, and the restaurant can always move somebody later.",
            "register",
          ],
        ],
        "Câu này hứa trước thay nhà hàng — nếu nhà hàng nói không, quầy đã nói sai với khách. Câu sai ngữ pháp dùng 'I am ask'; phải là 'I am asking'. Đáp án nói đúng ai quyết, và xin trước khi trả lời khách.",
        "colleague",
      ),
    ],
  }),

  L(39, 3, "The Promise You Cannot Find", "Lời hứa không tìm thấy trong hồ sơ", {
    vocabulary: [
      c("A promise I cannot find", "That is a promise I cannot find yet, madam.", [
        "/ə ˈprɒmɪs aɪ ˈkænɒt faɪnd/",
        "một lời hứa tôi chưa tìm thấy trong hồ sơ",
        "🔎",
      ]),
      c("Who said it and when", "Who said it and when, sir? I still need those two.", [
        "/huː ˈsed ɪt ənd ˈwen/",
        "ai đã nói, và nói khi nào",
        "🗓️",
      ]),
      c("Written or spoken", "Was it written or spoken, madam?", [
        "/ˈrɪtn ɔː ˈspəʊkən/",
        "ghi trên giấy hay nói miệng",
        "✍️",
      ]),
      c("Not a name, not a team", "Not a name, not a team, and not a guess.", [
        "/nɒt ə neɪm nɒt ə tiːm/",
        "không nêu tên người, không nêu tên bộ phận",
        "🙊",
      ]),
    ],
    grammar: [
      g(
        "Nobody on my team would ever promise you that, madam.",
        "That is a promise I cannot find yet, madam. Who said it, and when?",
        "Không tìm thấy KHÔNG có nghĩa là không có. 'Không ai hứa thế' là một phán quyết khi chưa ai kiểm. Nói đúng sự thật, rồi xin hai dữ kiện còn thiếu. Sau 'cannot' là động từ nguyên mẫu: 'cannot find', không phải 'cannot found'.",
        "That is a promise I cannot found yet, madam. Who said it, and when?",
      ),
      g(
        "It must have been the front office again — they do this every week.",
        "Was it written or spoken, sir? Either way, I am asking my manager to look.",
        "Không nêu tên người, không nêu tên bộ phận. Câu hỏi hữu ích là ghi hay nói: ghi thì tra được, nói thì phải hỏi người trực hôm đó. Quá khứ phân từ của 'write' là 'written', không phải 'wrote'.",
        "Was it wrote or spoken, sir? Either way, I am asking my manager to look.",
      ),
    ],
    speaking: [
      sp(
        "We were promised a free upgrade when we booked. It was definitely said.",
        t3a,
        "Không chối, không xác nhận: 'a promise I cannot find' — chưa tìm thấy. Rồi câu đã học từ tuần kể chuyện: 'I would rather find out than guess'.",
        undefined,
        ["promise", "find", "rather", "out"],
      ),
      also(
        sp(
          "Well, find out then. What do you need from me?",
          t3b,
          "Khách đã cho hai trong bốn dữ kiện (hứa gì, thực tế ra sao). Xin nốt hai cái kia — 'Who said it and when' — và một câu chỉ đường: 'written or spoken'.",
          undefined,
          ["said", "written", "spoken"],
          t3a,
        ),
        "Who said it, sir, and when? And was it written or spoken?",
      ),
      sp(
        "On the phone, last Tuesday. A young woman at your desk.",
        t3c,
        "Ghi lại đủ — 'writing it all down' — trước khi đề nghị bất cứ gì. Nâng hạng vẫn là quyết định của quản lý: 'my manager's to give'.",
        undefined,
        ["writing", "down", "upgrade", "manager's", "give"],
        t3b,
      ),
      risk(
        also(
          sp(
            "Just give us the upgrade now. It would be easier for everyone.",
            "An upgrade is my manager's to give, sir. Let me check with her within the hour.",
            "Cho luôn thì nhanh tối nay, nhưng dạy khách rằng một lời hứa không ai tìm thấy đáng giá hơn lời hứa có ghi. Nói rõ quyết định của ai, rồi một mốc giờ.",
            undefined,
            ["upgrade", "manager's", "give", "check", "within", "hour"],
          ),
          "An upgrade is my manager's to give, sir. Let me check with her, and I will come back within the hour.",
          "I am afraid an upgrade is my manager's to give, sir. Let me check with her within the hour.",
        ),
      ),
      sp(
        "Shall I tell him it was probably Lan on the phone that night?",
        "Not a name, not a team. Tell him what we are doing, not who did it.",
        "ĐỒNG NGHIỆP hỏi. Nêu tên đồng nghiệp trước mặt khách biến một khiếu nại thành hai, mà lời hứa vẫn chưa tìm thấy. Nguyên nhân bên trong là việc của sổ khiếu nại.",
        "colleague",
        ["name", "team"],
      ),
      sp(
        "She says the spa was included. Shall I just give it to her? It is quicker.",
        "Not until we have the four things. The spa is my manager's to give.",
        "ĐỒNG NGHIỆP hỏi. Bốn dữ kiện vào complaint log trước, rồi mới tới đề nghị — và đề nghị là của quản lý. Nhanh tối nay thì đắt mọi tối sau.",
        "colleague",
        ["four", "things", "spa", "manager's", "give"],
      ),
      sp(
        "The gentleman at the desk is shouting at me, and he has hold of my sleeve.",
        "Ask him to let go, and step back. I am calling security and the Duty Manager now.",
        "ĐỒNG NGHIỆP hỏi. Khách quát tháo hay đặt tay lên người nhân viên thì không còn là khiếu nại — là việc của bảo vệ từ chữ đầu tiên, và của Duty Manager. Nói rõ chính bạn đang gọi.",
        "colleague",
        ["step", "back", "calling", "security", "duty", "manager"],
      ),
    ],
    reading: read(
      `THE PROMISE YOU CANNOT FIND
A guest quotes a promise. You look, and it is not there. That is the most common hard minute at this desk, and almost every wrong answer to it sounds reasonable.
"Nobody would have said that" is a verdict, and you were not on that shift. "It must have been a misunderstanding" is the same verdict, said more gently. "Let me just give it to you" is the expensive answer. It teaches the guest that a claim nobody can find is worth more than a written one.
What you say is what is true: "That is a promise I cannot find yet." Then ask for the facts you are missing: who said it and when. Ask one more question too: was it written or spoken? Written lives on the booking or the file. Spoken lives with one person on one shift.
Not a name, not a team, and not a guess. No colleague and no department goes to the guest as the cause.
Write the four things in the complaint log before anything is offered. An upgrade is still your manager's to give.
And a guest who shouts at a colleague, or takes hold of one, is no longer a complaint. That is security's from the first word, and the Duty Manager's.`,
      [
        {
          q: "Khách nhắc một lời hứa mà bạn không tìm thấy. Bạn nói gì?",
          options: [
            "'Nobody would have said that', vì hồ sơ không ghi",
            "'That is a promise I cannot find yet'",
            "'It must have been a misunderstanding', cho khách đỡ mất mặt trước người đi cùng",
          ],
          correct: 1,
          explanation: `Bài đọc: "What you say is what is true: 'That is a promise I cannot find yet.'" Hai câu kia đều là phán quyết.`,
        },
        {
          q: "Vì sao nên hỏi 'ghi trên giấy hay nói miệng'?",
          options: [
            "Vì lời nói miệng thì khách sạn không phải giữ, chỉ lời viết ra mới tính",
            "Vì chỉ lời hứa ghi trên giấy mới được vào complaint log",
            "Vì nó chỉ đường: ghi thì tra hồ sơ, nói thì hỏi người trực hôm đó",
          ],
          correct: 2,
          explanation: `Bài đọc: "Written lives on the booking or the file. Spoken lives with one person on one shift."`,
        },
        {
          q: "Một vị khách túm tay áo đồng nghiệp và quát tháo. Đây là việc của ai?",
          options: [
            "Bảo vệ và Duty Manager, ngay từ câu đầu",
            "Của bạn, theo đúng bốn bước xử lý một khiếu nại",
            "Của chính người bị túm tay áo, vì chuyện xảy ra với họ",
          ],
          correct: 0,
          explanation: `Bài đọc: "a guest who shouts at a colleague, or takes hold of one, is no longer a complaint. That is security's from the first word, and the Duty Manager's."`,
        },
      ],
    ),
    game: [
      round(
        "Your staff told us the spa was included. Are you calling us liars?",
        [
          [
            "Of course not, madam. I am sure my colleague simply made an honest mistake.",
            "register",
          ],
          ["Not at all, madam. I cannot find it yet — was it written or spoken?", "answer"],
          ["Not at all, madam. I cannot found it yet — was it written or spoken?", "form"],
        ],
        "Câu này đổ lỗi cho đồng nghiệp trước mặt khách — một phán quyết khi chưa ai kiểm, và một khiếu nại thành hai. Câu sai ngữ pháp dùng 'cannot found'; sau 'cannot' là động từ nguyên mẫu. Đáp án nói thật là chưa tìm thấy, rồi hỏi câu chỉ đường.",
      ),
      round(
        "Just give her the upgrade. It is easier than arguing with her.",
        [
          ["An upgrade is my manager's to give. Four things first, then I ask her.", "answer"],
          ["You are right — it is quicker, and I will tell the manager tomorrow.", "register"],
          ["An upgrade is my manager's to give. Four things first, then I asks her.", "form"],
        ],
        "Câu này cho quà trước rồi mới báo — vừa vượt quyền, vừa dạy khách rằng cứ đòi là được. Câu sai ngữ pháp dùng 'I asks'; với 'I' động từ không thêm -s. Đáp án ghi đủ bốn dữ kiện rồi mới hỏi quản lý.",
        "colleague",
      ),
    ],
  }),

  L(39, 4, "The Last Fifteen Minutes", "Mười lăm phút cuối ca — không mở việc mới", {
    vocabulary: [
      c(
        "Nothing new after quarter to",
        "Nothing new after quarter to: write it down and hand it over.",
        ["/ˈnʌθɪŋ njuː ˈɑːftə ˈkwɔːtə tuː/", "sau giờ kém mười lăm không mở việc mới", "🕠"],
      ),
      c(
        "The last fifteen minutes",
        "The last fifteen minutes are for the list of what is still open.",
        ["/ðə lɑːst ˌfɪfˈtiːn ˈmɪnɪts/", "mười lăm phút cuối ca", "⌛"],
      ),
      c("Hand it over by name", "Hand it over by name, not to the shift in general.", [
        "/hænd ɪt ˈəʊvə baɪ neɪm/",
        "bàn giao đích danh cho một người",
        "🤝",
      ]),
      c("What the guest expects next", "What the guest expects next is a call this evening.", [
        "/wɒt ðə ɡest ɪkˈspekts nekst/",
        "điều khách đang chờ tiếp theo",
        "👀",
      ]),
      c("Stopped asking", "She has stopped asking, and that is the one to watch.", [
        "/stɒpt ˈɑːskɪŋ/",
        "đã thôi hỏi (nhưng vẫn còn bận tâm)",
        "😶",
      ]),
    ],
    grammar: [
      g(
        "I will open a new file now, and the night shift will ring you about it.",
        "I am writing it down now, madam, and handing it to my colleague by name.",
        "Mười lăm phút cuối ca không mở việc mới: ghi lại, rồi bàn giao đích danh — không mở rồi bỏ đó cho ca sau. Hai động từ nối bằng 'and' phải cùng dạng: 'writing… and handing', không phải 'and hand'.",
        "I am writing it down now, madam, and hand it to my colleague by name.",
      ),
      g(
        "I told the evening shift about the lady in 1102.",
        "I handed 1102 over by name, and the guest expects a call by eight.",
        "'Tôi đã nói với ca tối' không phải bàn giao: việc không gắn tên người nhận là việc không ai làm. Bàn giao cần TÊN người nhận và điều KHÁCH ĐANG CHỜ. Chủ ngữ số ít 'the guest' thì 'expects'.",
        "I handed 1102 over by name, and the guest expect a call by eight.",
      ),
    ],
    speaking: [
      also(
        sp(
          "Before you go — could you look into a refund for last night's dinner?",
          t4a,
          "Cuối ca: không từ chối, cũng không tự mở việc. Nói với khách việc bạn LÀM — ghi lại và bàn giao đích danh. Luật kém mười lăm là luật nội bộ, không đọc ra cho khách nghe.",
          undefined,
          ["writing", "handing", "colleague", "name"],
        ),
        "I am writing it down now, madam, and handing it to my colleague by name before I go.",
      ),
      sp(
        "Will I have to explain everything again to somebody new?",
        t4b,
        "Khách sợ phải kể lại từ đầu. Hai cụm đã học trả lời nỗi sợ đó: 'in writing', và 'in your own words'.",
        undefined,
        ["colleague", "writing", "own", "words"],
        t4a,
      ),
      sp(
        "And who decides about the refund?",
        t4c,
        "Tiền là của Duty Manager: nói rõ quyết định của ai. Rồi một việc của CHÍNH BẠN trước khi về — đưa việc này tới Duty Manager.",
        undefined,
        ["refund", "duty", "manager's", "decide", "leave"],
        t4b,
      ),
      sp(
        "Duty Manager. Anything I should know before you go?",
        "The lady in the lounge has stopped asking. What the guest expects next is a call tonight.",
        "Báo lên cấp trên thì không cần sir. Bàn giao là kể việc CÒN MỞ, kèm điều khách đang chờ — và dòng 'stopped asking' là dòng quan trọng nhất: thôi hỏi không phải là hết bận tâm.",
        "manager",
        ["lounge", "stopped", "asking", "expects", "next", "call"],
      ),
      sp(
        "It is quarter to six, and a guest wants a complaint opened. Shall I start it?",
        "Nothing new after quarter to. Write it down, and hand it over by name.",
        "ĐỒNG NGHIỆP hỏi. Một hồ sơ mở lúc sáu giờ kém mười không có dữ kiện và không có giờ hẹn. Ghi lại bằng lời của khách, rồi bàn giao cho đúng một người.",
        "colleague",
        ["nothing", "quarter", "write", "hand", "name"],
      ),
      sp(
        "I always start something new at the end of my shift. Is that wrong?",
        "In the last fifteen minutes, write the open list instead, and start nothing new.",
        "ĐỒNG NGHIỆP mới hỏi. Mười lăm phút cuối là để viết danh sách việc còn mở: phòng, tình trạng, điều khách đang chờ, và giờ.",
        "colleague",
        ["last", "fifteen", "minutes", "open", "list"],
      ),
      risk(
        also(
          sp(
            "It is ten to six. A guest says her friend has fainted in the spa, but she is breathing. Shall I leave it for the next shift?",
            "Danger does not wait for quarter to: call first aid and the Duty Manager now.",
            "ĐỒNG NGHIỆP hỏi. Luật cuối ca không chạm tới nguy hiểm. Khách còn thở: đúng kịch bản y tế — sơ cứu và Duty Manager, ngay bây giờ, và ở lại với khách.",
            "colleague",
            ["danger", "wait", "quarter", "call", "first", "aid", "duty", "manager"],
          ),
          "Danger does not wait for quarter to. Call first aid and the Duty Manager now.",
          "No. Danger does not wait for quarter to: call first aid and the Duty Manager now.",
        ),
      ),
    ],
    reading: read(
      `THE LAST FIFTEEN MINUTES
The last fifteen minutes of a shift are not for opening anything.
A case opened at ten to six has no facts in it and no hour on it. The next shift inherits a name and a complaint with nothing behind it, and the guest explains it all again.
So when a guest brings you something new at that hour, you do not refuse it and you do not start it. You write it down, in the guest's own words, and you hand it over by name to the person who takes your desk. Tell the guest exactly that, and keep the clock to yourself.
Some things are not new work, and they never wait for the clock. Anyone hurt or unwell, a smell of burning, a child alone by the water: danger does not wait for quarter to.
What the last fifteen minutes are for is the list of what is still open. Each line needs four things: the room, what state it is in, what the guest expects next, and the hour.
Say the hardest line out loud: the guest who has stopped asking. She has not stopped minding, and she is the one who writes the review.
Quarter to is one house's line. Ask your manager where yours falls.`,
      [
        {
          q: "Khách đưa việc mới tới lúc 5 giờ 50, ca bạn hết lúc 6 giờ. Bạn làm gì?",
          options: [
            "Mở hồ sơ ngay và tự làm cho xong bằng được, dù phải ở lại thêm nửa tiếng",
            "Ghi lại bằng lời của khách, rồi bàn giao đích danh cho người ca sau",
            "Hẹn khách quay lại vào đầu ca sáng mai",
          ],
          correct: 1,
          explanation: `Bài đọc: "you do not refuse it and you do not start it. You write it down, in the guest's own words, and you hand it over by name."`,
        },
        {
          q: "Việc nào KHÔNG chờ qua giờ kém mười lăm?",
          options: [
            "Khách bị ngất, mùi khét, trẻ một mình bên hồ",
            "Khách hỏi về một khoản trên hoá đơn tối qua mà họ chưa hiểu rõ",
            "Khách muốn đổi bàn ăn tối mai sang một giờ sớm hơn",
          ],
          correct: 0,
          explanation: `Bài đọc: "Anyone hurt or unwell, a smell of burning, a child alone by the water: danger does not wait for quarter to."`,
        },
        {
          q: "Vì sao dòng 'khách đã thôi hỏi' lại quan trọng nhất khi bàn giao?",
          options: [
            "Vì thôi hỏi nghĩa là khách đã hài lòng với cách giải quyết của quầy",
            "Vì ca sau không cần gọi lại cho khách đó nữa",
            "Vì thôi hỏi không phải là hết bận tâm",
          ],
          correct: 2,
          explanation: `Bài đọc: "She has not stopped minding, and she is the one who writes the review."`,
        },
      ],
    ),
    game: [
      round(
        "I am off in ten minutes. Anything for the book?",
        [
          ["Nothing that cannot wait until the morning shift comes on.", "register"],
          ["Nothing new after quarter to. I hand it over by name.", "answer"],
          ["Nothing new after quarter to. I hands it over by name.", "form"],
        ],
        "Câu này đẩy mọi việc sang ca sáng — việc không gắn tên người nhận là việc không ai làm. Câu sai ngữ pháp dùng 'I hands'; với 'I' động từ không thêm -s. Đáp án: không mở việc mới, bàn giao đích danh.",
        "colleague",
      ),
      round(
        "Before you go — will somebody ring me about the cake tonight?",
        [
          ["Yes, madam — the evening shift will see it in the book sooner or later.", "register"],
          ["Yes, madam. I am hand it over by name, with what you expect next.", "form"],
          ["Yes, madam. I am handing it over by name, with what you expect next.", "answer"],
        ],
        "Câu này giao việc cho một quyển sổ — 'sớm hay muộn' không phải một lời hứa. Câu sai ngữ pháp dùng 'I am hand'; phải là 'I am handing'. Đáp án bàn giao đích danh, kèm điều khách đang chờ.",
      ),
    ],
  }),
];

export const week: AuthoredWeek = {
  title: {
    en: "Busy Shifts: What Comes First",
    vi: "Ca đông việc — việc gì trước, và mười lăm phút cuối ca",
  },
  canDo:
    "Nói được: xếp thứ tự khi nhiều việc tới cùng lúc — nguy hiểm trước, và 'trước' là một việc làm ngay (gọi xe cấp cứu, bảo vệ hay sơ cứu, rồi Duty Manager), sau đó người trước mặt, điện thoại, tin nhắn, mốc giờ sớm nhất; gọi tên việc đang gác lại kèm một mốc giờ; không hứa thay bộ phận khác khi hồ sơ nói có; xử lý lời hứa không tìm thấy mà không đổ cho ai; và trong mười lăm phút cuối ca không mở việc mới mà ghi lại, bàn giao đích danh.",
  lessons,
};
