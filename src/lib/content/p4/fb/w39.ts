// FB week 39 — Rehearsal, with two new rules (hand-authored Phase 4, see
// ../kit.ts).
//
// The matrix gives week 39 two rules no earlier week teaches, each with a full
// lesson, and two lessons of cross-situation rehearsal:
//
//  1. ORDER OF PRIORITY. Safety first, money second, comfort third — and
//     "danger first" is three actions, not a place in a queue: call the first
//     aider, Security or 115 first; tell the manager on duty; stay with the
//     guest in danger (week 36's call, clear, stay; week 33's doctor first).
//     Everything else is parked with a person, a place and a time.
//  2. THE LAST FIFTEEN MINUTES. A request that arrives in the last fifteen
//     minutes of a shift is not opened: it is written down and handed over by
//     name to the next shift, who takes it from the first minute. The one
//     exception joins the two rules: danger never waits for the next shift.
//
// The old week had the priority rule but not the fifteen-minute one, and its
// handover game taught the opposite ("I will stay the ten minutes myself").
// Lessons 3 and 4 re-present earlier headwords — the remake, the docket, the
// supervisor's approval, the waived corkage, the signal and plan B, the
// guaranteed number, the nightcap — and run them in the order rule 1 gives.
import type { GameRound, SpeakingItem } from "../../week-content";
import { g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("FB");
const L = lessonsFor("FB");
/** The turn plus the other wordings the course accepts for it. */
const also = (s: SpeakingItem, alts: string[]): SpeakingItem => ({ ...s, alsoAccept: alts });
/** One arcade round: the right answer at index `at`, the broken-English option
 *  (`form`) and the correct-English-wrong-job option (`register`) around it. */
function round(
  prompt: string,
  right: string,
  form: string,
  register: string,
  explanation: string,
  at: 0 | 1 | 2,
  speakerRole?: GameRound["speakerRole"],
): GameRound {
  const options: GameRound["options"] = [
    { text: form, correct: false, kind: "form" },
    { text: register, correct: false, kind: "register" },
  ];
  options.splice(at, 0, { text: right, correct: true, kind: "answer" });
  return { ...(speakerRole ? { speakerRole } : {}), prompt, options, explanation };
}

// ── Lesson 1 — danger first ──────────────────────────────────────────────────
const t1a =
  "Your mother first, madam. I am calling the first aider now, and my colleague will speak to the driver.";
const t1b =
  "I hear you, madam. My colleague is speaking to the driver, and I am staying here with your mother.";
const t1c =
  "The bill can wait, madam. My manager is on the way, and your bill will be ready when you are.";

const lesson1 = L(39, 1, "Danger First", "Nguy hiểm trước", {
  vocabulary: [
    c("Priority", "When two things happen at once, the guest in danger is the priority.", [
      "/praɪˈɒrəti/",
      "Việc được ưu tiên, thứ tự ưu tiên",
      "🥇",
    ]),
    c("Danger first", "Danger first means you call for help before anything else.", [
      "/ˈdeɪndʒə fɜːst/",
      "Nguy hiểm trước — người gặp nguy được lo trước mọi việc",
      "🆘",
    ]),
    c("Park", "Park the bill question with a colleague until the first aider has been.", [
      "/pɑːk/",
      "Tạm gác một việc, kèm người giữ và mốc giờ",
      "🅿️",
    ]),
    c("Call for backup", "With two problems at once, call for backup straight away.", [
      "/kɔːl fə ˈbækʌp/",
      "Gọi thêm người hỗ trợ",
      "📣",
    ]),
  ],
  grammar: [
    g(
      "Wait, wait! One problem only, please!",
      "Two things, sir, and I have both: the first aider is coming, and then I will fix the bill.",
      "Gọi tên CẢ HAI việc rồi xếp thứ tự — 'and I have both' trấn an khách rằng không việc nào bị quên. Chủ ngữ 'I' đi với 'have'.",
      "Two things, sir, and I has both: the first aider is coming, and then I will fix the bill.",
    ),
    g(
      "The cake must wait. Allergy more important. Obviously.",
      "The allergy comes first, madam. My colleague is keeping your cake in the pantry until we are ready.",
      "Giải thích thứ tự bằng hành động: việc một bạn lo, việc hai có người giữ. 'The allergy' số ít nên 'comes' có -s.",
      "The allergy come first, madam. My colleague is keeping your cake in the pantry until we are ready.",
    ),
  ],
  speaking: [
    risk(
      also(
        sp(
          "My mother has fallen near the buffet, and our taxi is waiting outside!",
          t1a,
          "Nguy hiểm trước nghĩa là LÀM: gọi người sơ cứu ngay. Việc thứ hai (xe đang chờ) được giao cho một người cụ thể — không bị bỏ rơi.",
          undefined,
          ["first"],
        ),
        [
          "Your mother first, madam. I am calling the first aider now, and my colleague will talk to the driver.",
          "Your mother comes first, madam. I am calling the first aider now, and my colleague will speak to the driver.",
        ],
      ),
    ),
    also(
      sp(
        "But the taxi! We have a flight at nine!",
        t1b,
        "Ghi nhận nỗi lo ('I hear you'), báo việc thứ hai đang có người lo, rồi việc thứ ba của sảnh: ở lại bên người gặp nạn.",
        undefined,
        undefined,
        t1a,
      ),
      [
        "I hear you, madam. My colleague is talking to the driver, and I am staying here with your mother.",
      ],
    ),
    also(
      sp(
        "Should I go and pay the bill while we wait?",
        t1c,
        "Tiền đứng sau an toàn: hoá đơn đợi được. Quản lý đang tới; hoá đơn sẵn sàng khi khách sẵn sàng — không thúc ai.",
        undefined,
        undefined,
        t1b,
      ),
      [
        "The bill can wait, madam. My manager is on the way, and your bill will be ready whenever you are.",
      ],
    ),
    sp(
      "Table two wants their bill, table five's soup is cold, and a guest has cut her hand. Where do I start?",
      "Danger first: the cut hand, so call the first aider. Then the bill, then the soup — and call for backup now.",
      "Nói với đồng nghiệp: không sir/madam. Thứ tự cố định: an toàn, tiền, thoải mái. 'Danger first' là một hành động — gọi người — không chỉ là một vị trí trong hàng.",
      "colleague",
    ),
    sp(
      "I have the allergy table and the birthday cake at the same time. What do I do?",
      "Allergy first. Park the cake with one colleague in the pantry, and give the host a new time.",
      "Một việc 'park' đúng cách có ba thứ: một người giữ, một chỗ, một mốc giờ. Không có người giữ là việc bị bỏ rơi.",
      "colleague",
    ),
    also(
      sp(
        "Why is nobody looking at our table? We have been waiting for ten minutes!",
        "I am sorry, sir — a guest needs help, and that is our priority. I will be with you in five minutes.",
        "Bàn khác nghe một câu thật: có khách cần giúp, đó là việc ưu tiên. Không kể tình trạng của khách kia. Rồi một mốc giờ của chính bạn.",
      ),
      [
        "I am sorry, sir — a guest needs help, and that is our priority. I will be with you in a few minutes.",
      ],
    ),
  ],
  reading: read(
    `TWO PROBLEMS AT ONCE — DANGER FIRST
Some evenings stack their problems: a fall near the buffet, a wrong bill, a cold soup, a cake due at nine. The order never changes. Safety first, money second, comfort third.
Danger first is not a place in a queue. It is three actions. Call the first aider, Security or 115 first. Then tell the manager on duty. And stay with the guest in danger until help arrives.
Everything else is parked, never dropped. A parked problem has three things: a person, a place and a time. "The cake waits in the pantry, with my colleague, until the first aider has been."
Name both problems to the guests: "Two things, and I have both." A guest who hears the list stops repeating it.
Call for backup at two problems, not at five. The strongest person on the floor is the one who asks for a second pair of hands while both hands still work.
Other tables hear one honest sentence: a guest needs help, and you will be back in five minutes. Never describe another guest's condition.`,
    [
      {
        q: "Thứ tự ưu tiên khi nhiều việc tới cùng lúc là gì?",
        options: [
          "Khách quen trước, khách mới sau",
          "An toàn, rồi tiền, rồi sự thoải mái",
          "Việc dễ trước để giảm nhanh số việc",
        ],
        correct: 1,
        explanation:
          "'Safety first, money second, comfort third.' Thứ tự này không bao giờ đổi, dù bàn nào đang to tiếng nhất.",
      },
      {
        q: "'Nguy hiểm trước' nghĩa là làm gì?",
        options: [
          "Gọi người cứu, báo quản lý, ở lại",
          "Hỏi kỹ khách gặp nạn xem đã có chuyện gì xảy ra",
          "Đưa khách gặp nạn ra khỏi phòng ăn thật nhanh",
        ],
        correct: 0,
        explanation:
          "'Call the first aider, Security or 115 first. Then tell the manager on duty. And stay with the guest in danger until help arrives.'",
      },
      {
        q: "Một việc được 'park' đúng cách cần có gì?",
        options: [
          "Một lời xin lỗi thật dài và một món quà nhỏ",
          "Một chữ ký của quản lý trực",
          "Một người giữ, một chỗ, một mốc giờ",
        ],
        correct: 2,
        explanation:
          "'A parked problem has three things: a person, a place and a time.' Thiếu người giữ thì việc đó bị bỏ rơi, không phải tạm gác.",
      },
    ],
  ),
  game: [
    round(
      "Table six says their fish smells off, and table nine's birthday cake is due now. I am on my own here.",
      "Take the fish off the table first, and call for backup — someone else carries the cake.",
      "Take the fish off the table first, and calls for backup — someone else carry the cake.",
      "The birthday cannot wait, so the cake goes first — the fish complaint can keep until later.",
      "'and calls… someone else carry' sai: hai mệnh lệnh nối 'and' đều nguyên mẫu (take… and call), và 'someone' số ít cần 'carries'. Câu cho bánh đi trước đúng ngữ pháp nhưng đảo thứ tự: món cá có thể làm khách ốm là chuyện an toàn. Đáp án làm việc an toàn trước và gọi người hỗ trợ.",
      1,
      "colleague",
    ),
    round(
      "Why is the whole team running to that table? Our main course is late!",
      "A guest needs help, sir, so that comes first. I will be back with you in five minutes.",
      "A guest need help, sir, so that come first. I will be back with you in five minutes.",
      "The lady over there is having an allergic reaction, sir, so I am afraid you must wait.",
      "'A guest need… that come' thiếu -s ở cả hai động từ. Câu kể khách kia bị dị ứng đúng tiếng Anh nhưng tiết lộ chuyện sức khoẻ của người khác và bảo khách phải chờ. Đáp án nói thật, kín đáo, kèm một mốc giờ.",
      0,
    ),
  ],
});

// ── Lesson 2 — the last fifteen minutes ─────────────────────────────────────
const t2a =
  "With pleasure, madam. My colleague on the next shift will arrange it, and I am writing the details down for her now.";
const t2b =
  "I finish in fifteen minutes, madam, and your cake deserves someone who can see it through.";
const t2c =
  "Let me introduce her now, madam. She has every detail, and she will confirm the cake with you tonight.";

const lesson2 = L(39, 2, "The Last Fifteen Minutes", "Mười lăm phút cuối ca", {
  vocabulary: [
    c("Last fifteen minutes", "In the last fifteen minutes of a shift, nobody opens a new task.", [
      "/lɑːst ˌfɪfˈtiːn ˈmɪnɪts/",
      "Mười lăm phút cuối của ca làm",
      "⏱️",
    ]),
    c("New task", "A new task that arrives late goes to the next shift.", [
      "/njuː tɑːsk/",
      "Một việc mới phải mở ra và theo tới cùng",
      "🆕",
    ]),
    c("Hand over", "Hand over the request by name, not by a note on the counter.", [
      "/hænd ˈəʊvə/",
      "Bàn giao việc cho người khác",
      "🤝",
    ]),
    c("Next shift", "The next shift takes the request from its first minute.", [
      "/nekst ʃɪft/",
      "Ca làm kế tiếp",
      "🔄",
    ]),
  ],
  grammar: [
    g(
      "I go home soon. Somebody else will find it.",
      "I finish in fifteen minutes, sir, so I am handing your request to my colleague by name.",
      "Mười lăm phút cuối ca không mở việc mới: ghi lại và trao tận tay một người có tên. Hiện tại tiếp diễn: am handing.",
      "I finish in fifteen minutes, sir, so I am hand your request to my colleague by name.",
    ),
    g(
      "OK, OK, I start it now, maybe I finish.",
      "If a request arrives in my last fifteen minutes, I write it down and hand it over.",
      "Câu điều kiện nói một luật cố định: If + hiện tại đơn, mệnh đề chính hiện tại đơn. Chủ ngữ 'I' không thêm -s.",
      "If a request arrives in my last fifteen minutes, I writes it down and hand it over.",
    ),
  ],
  speaking: [
    also(
      sp(
        "Could you arrange a birthday cake for our table tomorrow evening?",
        t2a,
        "Nhận lời vui vẻ, rồi nói thật ai sẽ làm: đồng nghiệp ở 'next shift'. Việc của bạn bây giờ là ghi đủ chi tiết.",
      ),
      [
        "With pleasure, madam. My colleague on the next shift will arrange it, and I am writing down the details for her now.",
      ],
    ),
    sp(
      "Why not you? You are the one I asked.",
      t2b,
      "Lý do thật, nói nhẹ: bạn sắp hết giờ, và chiếc bánh cần một người theo tới cùng. Không xin lỗi vì một quy trình đúng.",
      undefined,
      undefined,
      t2a,
    ),
    also(
      sp(
        "All right. Who is she, then?",
        t2c,
        "Bàn giao có tên là giới thiệu tận mặt: khách nhìn thấy người nhận việc. Vế sau là lời hứa của đồng nghiệp, có mốc tối nay.",
        undefined,
        undefined,
        t2b,
      ),
      [
        "Let me introduce her now, madam. She has every detail, and she will confirm the cake with you this evening.",
      ],
    ),
    sp(
      "I have just started. What did the guest at table three ask you for?",
      "A birthday cake for tomorrow evening. Everything is on the slip, and the guest knows you have it.",
      "Nói với đồng nghiệp ca sau: không sir/madam. Một câu nói việc gì, một câu nói việc đã ở đâu và khách đã biết ai lo.",
      "colleague",
    ),
    sp(
      "It is ten to ten. Table eight wants a cocktail tasting. Will you start it?",
      "Not a new task in my last fifteen minutes. I will hand over the request by name to the next shift.",
      "Trả lời quản lý: không sir/madam. Nói luật một câu ('new task', 'last fifteen minutes'), rồi việc bạn làm: 'hand over' có tên.",
      "manager",
    ),
    risk(
      also(
        sp(
          "A guest has just fainted at table four, and you finish in five minutes. Shall I wait for the next team?",
          "No — danger never waits. I am calling the first aider now, and I will stay until she arrives.",
          "Luật mười lăm phút KHÔNG áp dụng cho nguy hiểm: gọi người sơ cứu ngay và ở lại. Bàn giao để sau.",
          "colleague",
          ["first"],
        ),
        [
          "No — danger never waits. I am calling the first aider now, and I will stay until she comes.",
          "Danger never waits. I am calling the first aider now, and I will stay until she arrives.",
        ],
      ),
    ),
  ],
  reading: read(
    `THE LAST FIFTEEN MINUTES — NO NEW TASKS
A task started in the last fifteen minutes of a shift is a task that leaves the building half done. So the floor has one rule for that time: no new tasks.
When a guest asks for something new in your last fifteen minutes, do three things. Write it down on the slip. Hand it over by name to one colleague on the next shift. Then introduce that colleague to the guest, so the guest knows who has it.
The colleague takes it from the first minute of their shift, not from the end of yours. "I will just stay ten more minutes" sounds kind, but it hides the task from the team and from the manager.
Finish what is already open: close your tables, pass on your open promises, and tell your manager what you handed over.
One thing never waits for the next shift: danger. If a guest falls or chokes at ten to ten, danger first still comes first. You call, you clear, you stay, and the handover comes after.`,
    [
      {
        q: "Trong mười lăm phút cuối ca, gặp một yêu cầu mới thì làm gì?",
        options: [
          "Tự làm ngay cho nhanh rồi mới ra về",
          "Ghi lại và bàn giao có tên",
          "Nhờ khách quay lại hỏi vào ngày hôm sau",
        ],
        correct: 1,
        explanation:
          "'Write it down on the slip. Hand it over by name to one colleague on the next shift. Then introduce that colleague to the guest.'",
      },
      {
        q: "Vì sao 'ở lại thêm mười phút' không phải cách tốt?",
        options: [
          "Nó giấu việc khỏi cả nhóm và quản lý",
          "Vì khách sạn không trả tiền làm thêm giờ cho nhân viên",
          "Vì đồng nghiệp ca sau sẽ thấy phật ý",
        ],
        correct: 0,
        explanation:
          "'I will just stay ten more minutes sounds kind, but it hides the task from the team and from the manager.'",
      },
      {
        q: "Việc gì không bao giờ chờ tới ca sau?",
        options: [
          "Một bàn muốn đặt bánh sinh nhật",
          "Một vị khách hỏi lại về hoá đơn",
          "Một tình huống nguy hiểm",
        ],
        correct: 2,
        explanation:
          "'One thing never waits for the next shift: danger… You call, you clear, you stay, and the handover comes after.'",
      },
    ],
  ),
  game: [
    round(
      "I know you are finishing soon, but could you arrange flowers for our table tomorrow?",
      "Of course, madam. I will hand over your request by name, and my colleague will confirm it tonight.",
      "Of course, madam. I will hand over your request by name, and my colleague will confirms it tonight.",
      "Of course, madam — I will stay late and do it myself, so you do not have to wait.",
      "'will confirms' sai: sau 'will' là động từ nguyên mẫu. Câu ở lại làm muộn nghe tử tế nhưng mở một việc mới trong mười lăm phút cuối ca và giấu việc khỏi cả nhóm. Đáp án bàn giao có tên, có mốc.",
      2,
    ),
    round(
      "You promised table twelve a photo with the chef, and you finish very soon.",
      "Then I hand it over to you by name now: table twelve, the photo, after dessert.",
      "Then I hands it over to you by name now: table twelve, the photo, after dessert.",
      "I will stay the extra ten minutes myself — it is quicker than explaining it to you.",
      "'I hands' sai: chủ ngữ 'I' không thêm -s. Câu tự ở lại thêm mười phút đúng ngữ pháp nhưng trái luật cuối ca — việc dang dở phải được trao cho một người có tên. Đáp án bàn giao đủ ba ý: bàn nào, việc gì, khi nào.",
      0,
      "colleague",
    ),
  ],
});

// ── Lesson 3 — rehearsal: the busy hour ─────────────────────────────────────
const t3a =
  "I am so sorry, sir. Since you have a show, shall I ask the kitchen for the quickest remake, or a different dish?";
const t3b =
  "The remake is on its way, sir. Taking it off the bill needs my supervisor's approval, so let me ask her now.";
const t3c =
  "Let me check the docket now, sir. If it is our error, it comes off, and I will reprint the bill.";

const lesson3 = L(39, 3, "Rehearsal: The Busy Hour", "Tổng duyệt: giờ cao điểm", {
  vocabulary: [
    c("Remake", "The quickest remake still needs an honest time from the kitchen."),
    c("Docket", "Check the docket before anyone argues about the bill."),
    c("Approval", "A dish off the bill waits for the supervisor's approval."),
    c("Waive", "Only the supervisor may waive the corkage for a regular."),
  ],
  grammar: [
    g(
      "Steak late, bill wrong, cake later. Too many problems!",
      "Three things, sir, and I have all of them: the remake, the docket and the cake.",
      "Tổng duyệt luật đầu tuần: gọi tên mọi việc, xếp thứ tự, nói 'I have all of them'. Số nhiều 'three things' có -s.",
      "Three thing, sir, and I have all of them: the remake, the docket and the cake.",
    ),
    g(
      "You are regular, so OK, no corkage tonight.",
      "My supervisor decides on corkage, sir, and she will be with you before we open the bottle.",
      "Khách quen không đổi luật tiền: miễn phí khui rượu là quyền của giám sát. 'My supervisor' số ít nên 'decides' có -s.",
      "My supervisor decide on corkage, sir, and she will be with you before we open the bottle.",
    ),
  ],
  speaking: [
    also(
      sp(
        "This steak is overcooked, and we are in a hurry — we have a show at nine.",
        t3a,
        "Không đoán giờ thay bếp. Nhắc lại hoàn cảnh khách ('Since you have a show'), rồi hai lựa chọn: 'remake' nhanh nhất, hoặc món khác.",
      ),
      [
        "I am so sorry, sir. Since you have a show, shall I ask the kitchen for the quickest remake or a different dish?",
      ],
    ),
    also(
      sp(
        "The quickest, please. And take the steak off the bill.",
        t3b,
        "Tách việc của bạn (món đang làm lại) khỏi việc cần duyệt (hoá đơn cần 'approval' của giám sát). Hỏi ngay, không hứa trước.",
        undefined,
        undefined,
        t3a,
      ),
      [
        "The remake is on its way, sir. Taking it off the bill needs approval from my supervisor, so let me ask her now.",
      ],
    ),
    also(
      sp(
        "And while you are here — we never ordered this second bottle.",
        t3c,
        "Kiểm tra trước, cam kết sau: đối chiếu 'docket', nếu là lỗi của nhà hàng thì bỏ ra và in lại hoá đơn sạch.",
        undefined,
        undefined,
        t3b,
      ),
      [
        "Let me check the docket now, sir. If it is our error, it comes off, and I will print a new bill.",
      ],
    ),
    risk(
      also(
        sp(
          "My daughter is allergic to nuts. Is the birthday cake safe for her?",
          "Thank you for telling me, madam. I will ask the chef to check the cake before we serve it.",
          "Không tự hứa 'an toàn'. Cảm ơn khách đã nói, rồi đưa câu hỏi về đúng người: bếp kiểm tra bánh TRƯỚC khi mang ra.",
          undefined,
          ["chef"],
        ),
        [
          "Thank you for telling me, madam. I will ask the chef to check the cake before we bring it out.",
          "Thank you for telling me, madam. I will ask the chef to check the cake before it is served.",
        ],
      ),
    ),
    risk(
      also(
        sp(
          "We are regulars here. Can you skip the corkage on our wine tonight?",
          "My supervisor decides that, sir, and I will ask her before we open the bottle.",
          "Khách quen không đổi luật tiền. Nói đúng người quyết, và mốc của chính bạn: hỏi trước khi mở chai — phí luôn được báo trước.",
          undefined,
          ["supervisor"],
        ),
        [
          "My supervisor decides that, sir, and I will ask her before we open your bottle.",
          "That is my supervisor's decision, sir, and I will ask her before we open the bottle.",
        ],
      ),
    ),
    sp(
      "Table four wants the corkage waived and a free dessert. What can I promise them?",
      "Nothing yet. Only the supervisor can waive the corkage or approve a dessert, so bring her to the table.",
      "Nói với đồng nghiệp: không sir/madam. Hai yêu cầu, một người có quyền: 'waive' và duyệt món tặng đều là việc của giám sát.",
      "colleague",
    ),
  ],
  reading: read(
    `THE BUSY HOUR — THE RULES STILL HOLD
Eight o'clock on a Friday. At table five, a steak comes back overcooked, and the host has a show at nine. At table seven, the bill shows a bottle they did not order. At table two, a birthday cake is waiting, and a child has a nut allergy.
The server on that section does not panic. She names the three problems to herself and puts them in order.
Safety first: the allergy. She thanks the host for telling her, asks the chef to check the cake, and writes the allergy on the docket.
Money second: the bottle. She checks the docket, finds the error, and asks her supervisor to sign the correction before the bill is reprinted.
Comfort third: the steak. She offers the quickest remake or a different dish, and asks the kitchen for an honest time.
When table seven also asks her to waive the corkage, she says neither yes nor no. That is her supervisor's decision, and her supervisor is already on the way.
Nothing she does is new. The skill is doing old things in the right order.`,
    [
      {
        q: "Người phục vụ xử lý ba việc theo thứ tự nào?",
        options: ["Dị ứng, hoá đơn, món bò", "Món bò, hoá đơn, dị ứng", "Hoá đơn, dị ứng, món bò"],
        correct: 0,
        explanation:
          "'Safety first: the allergy… Money second: the bottle… Comfort third: the steak.' Thứ tự an toàn — tiền — thoải mái.",
      },
      {
        q: "Chai rượu bị tính nhầm được xử lý thế nào?",
        options: [
          "Tự gạch bỏ chai rượu trên hoá đơn cũ cho khách",
          "Kiểm tra docket, nhờ giám sát ký sửa",
          "Đợi khách về rồi mới sửa lại trong máy",
        ],
        correct: 1,
        explanation:
          "'She checks the docket, finds the error, and asks her supervisor to sign the correction before the bill is reprinted.'",
      },
      {
        q: "Khách xin miễn phí khui rượu, cô trả lời thế nào?",
        options: [
          "Đồng ý ngay vì khách đang không vui",
          "Từ chối ngay vì đó là luật chung của cả nhà hàng",
          "Không nói có hay không; giám sát quyết",
        ],
        correct: 2,
        explanation:
          "'she says neither yes nor no. That is her supervisor's decision, and her supervisor is already on the way.'",
      },
    ],
  ),
  game: [
    round(
      "The steak was wrong, the bill was wrong — just take thirty percent off and we will forget it.",
      "I am sorry, sir. A discount needs my supervisor's approval, and she is on her way now.",
      "I am sorry, sir. A discount need my supervisor's approval, and she is on her way now.",
      "Thirty percent is fair, sir — I will take it off myself before I print the bill.",
      "'A discount need' thiếu -s: chủ ngữ số ít cần 'needs'. Câu tự bớt ba mươi phần trăm đúng ngữ pháp nhưng là quyết định về tiền vượt quyền người phục vụ. Đáp án xin lỗi và đưa đúng người tới.",
      1,
    ),
    round(
      "Table two asked if the birthday cake has nuts. I am sure it does not — shall I tell them?",
      "Do not guess. Ask the chef to check the cake before it goes out.",
      "Do not guessing. Ask the chef to check the cake before it go out.",
      "Yes, tell them it is safe — the pastry team never uses nuts in birthday cakes.",
      "'Do not guessing… it go out' sai: sau 'Do not' là nguyên mẫu, và 'it' cần 'goes'. Câu bảo khách bánh an toàn đúng tiếng Anh nhưng là lời hứa từ trí nhớ về dị ứng. Đáp án đưa câu hỏi về bếp.",
      2,
      "colleague",
    ),
  ],
});

// ── Lesson 4 — rehearsal: the party and the last order ──────────────────────
const t4a =
  "I will ask the kitchen now, madam. If they can, your friends are welcome, charged per head on top of your guaranteed number.";
const t4b =
  "It waits out of sight until your signal, madam. Just catch my eye whenever you are ready.";
const t4c =
  "Then plan B: a plated dessert with candles, and I will tell you quietly, away from the table.";

const lesson4 = L(
  39,
  4,
  "Rehearsal: The Party and the Last Order",
  "Tổng duyệt: bữa tiệc và lượt gọi món cuối",
  {
    vocabulary: [
      c("Guaranteed number", "Extra guests are charged on top of the guaranteed number."),
      c("Signal", "The cake moves only when the host gives the signal."),
      c("Plan B", "If the cake breaks, plan B is told to the host alone."),
      c("Nightcap", "A sober table may end the evening with a nightcap at the bar."),
    ],
    grammar: [
      g(
        "More friends? No. Booking was sixty.",
        "Your friends are welcome if the kitchen can cook for them, madam, and they are charged per head.",
        "Điều kiện trước khi hứa: 'if the kitchen can'. Sau 'can' là động từ nguyên mẫu: cook.",
        "Your friends are welcome if the kitchen can cooks for them, madam, and they are charged per head.",
      ),
      g(
        "Cake broken. Sorry. Nothing we can do.",
        "The cake is not ready, so plan B is a plated dessert with candles — I will tell the host quietly.",
        "Tin xấu luôn đi kèm phương án B trong cùng một hơi, và chỉ chủ tiệc nghe. 'plan B' số ít nên dùng 'is'.",
        "The cake is not ready, so plan B are a plated dessert with candles — I will tell the host quietly.",
      ),
    ],
    speaking: [
      also(
        sp(
          "Four more friends have just arrived. Can they join our dinner?",
          t4a,
          "Không hứa chỗ trước khi hỏi bếp. Điều kiện ('If they can') và cách tính tiền ('per head', ngoài 'guaranteed number') nói ngay từ đầu.",
        ),
        [
          "I will ask the kitchen now, madam. If they can, your friends are welcome, charged per head on top of the guaranteed number.",
        ],
      ),
      also(
        sp(
          "And the cake? We have not given you the signal yet.",
          t4b,
          "Chủ tiệc giữ khoảnh khắc, nhà hàng lo phần thực hiện: bánh chờ khuất tầm mắt tới khi có 'signal'.",
          undefined,
          undefined,
          t4a,
        ),
        ["It waits out of sight until your signal, madam. Just catch my eye when you are ready."],
      ),
      also(
        sp(
          "What if the cake is not ready in time?",
          t4c,
          "Phương án B nói trước, rõ ràng: món tráng miệng bày đĩa có nến, và tin xấu chỉ báo riêng cho chủ tiệc.",
          undefined,
          undefined,
          t4b,
        ),
        [
          "Then plan B: a plated dessert with candles, and I will tell you quietly, away from your table.",
        ],
      ),
      sp(
        "Last orders already? We would like one more round of drinks.",
        "The kitchen has closed, sir, but drinks are still served. Would you like a nightcap while you finish?",
        "Bếp đóng nhưng buổi tối chưa hết: mời một ly cuối bằng câu hỏi. Chỉ mời khi bàn còn tỉnh táo — bàn quá chén thì nước và đồ ăn.",
      ),
      sp(
        "Could you organise a cake for my wife's breakfast tomorrow?",
        "With pleasure, sir. I finish in a few minutes, so I will hand over your request to my colleague by name.",
        "Luật cuối ca trong một tình huống thật: không mở việc mới, bàn giao có tên. Khách vẫn nghe một lời nhận việc ấm áp.",
      ),
      sp(
        "The private room has sixty-four guests now, but they guaranteed sixty. What do I tell the bar?",
        "Charge the extra guests per head, and write all sixty-four on the event order before I go.",
        "Nói với đồng nghiệp: không sir/madam. Con số do đồng nghiệp nêu: tính theo đầu người, và ghi lên phiếu sự kiện trước khi hết ca.",
        "colleague",
      ),
    ],
    reading: read(
      `THE PARTY AND THE LAST ORDER
Half past nine in the private dining room. The host guaranteed sixty guests, and sixty-four are now at the tables. The cake waits in the pantry for the host's signal. At the bar, a table of regulars asks for one more round, and the bar server finishes in fifteen minutes.
The team handles it with four rules. Extra guests are seated only if the kitchen can, and each one is charged per head on top of the guaranteed number. The new number goes on the event order before anyone forgets it.
The cake does not move until the host gives the signal. If it breaks, plan B is a plated dessert with candles, told to the host alone.
The kitchen has closed, but drinks are still served at the bar. A sober table may have a nightcap; a table that has had one too many gets water and food.
The bar server does not open a new task in her last fifteen minutes. She hands over the regulars by name, and the next shift takes them from the first minute.`,
      [
        {
          q: "Bốn khách đến thêm được xử lý thế nào?",
          options: [
            "Bếp làm được thì xếp, tính theo đầu người",
            "Từ chối vì bữa tiệc đã chốt sáu mươi khách",
            "Xếp chỗ miễn phí vì chủ tiệc là khách quen",
          ],
          correct: 0,
          explanation:
            "'Extra guests are seated only if the kitchen can, and each one is charged per head on top of the guaranteed number.'",
        },
        {
          q: "Khi nào bánh được mang ra?",
          options: [
            "Đúng giờ ghi trên phiếu đặt tiệc",
            "Khi chủ tiệc ra tín hiệu",
            "Khi bếp bánh vừa làm xong bánh",
          ],
          correct: 1,
          explanation:
            "'The cake does not move until the host gives the signal.' Chủ tiệc giữ khoảnh khắc, nhà hàng lo phần thực hiện.",
        },
        {
          q: "Người phục vụ quầy bar sắp hết ca làm gì với bàn khách quen?",
          options: [
            "Ở lại thêm cho tới khi bàn đó ra về",
            "Mở thêm một lượt đồ uống rồi mới về",
            "Bàn giao có tên cho ca sau",
          ],
          correct: 2,
          explanation:
            "'does not open a new task in her last fifteen minutes. She hands over the regulars by name.'",
        },
      ],
    ),
    game: [
      round(
        "We guaranteed sixty, and sixty-four came. Surely the extra four are on the house?",
        "Extra guests are charged per head, sir. May I ask my manager to speak with you?",
        "Extra guests are charge per head, sir. May I ask my manager to speak with you?",
        "Of course, sir — four is a small number, so we will not count them tonight.",
        "'are charge' sai: bị động cần quá khứ phân từ 'charged'. Câu bỏ qua bốn khách đúng ngữ pháp nhưng tự miễn phí — quyền của quản lý, không phải của sảnh. Đáp án nói đúng điều khoản và mời người có quyền.",
        0,
      ),
      round(
        "The cake has fallen in the pantry, and the host is about to give the signal!",
        "Plan B: a plated dessert with candles. I will tell the host quietly, away from the table.",
        "Plan B: a plated dessert with candles. I will telling the host quietly, away from the table.",
        "Bring it out anyway — the guests will laugh, and the photos will be fun.",
        "'I will telling' sai: sau 'will' là nguyên mẫu (tell). Câu mang bánh vỡ ra đúng ngữ pháp nhưng làm hỏng khoảnh khắc của chủ tiệc. Đáp án đưa phương án B, báo riêng chủ tiệc.",
        2,
        "colleague",
      ),
    ],
  },
);

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: xếp thứ tự khi nhiều việc tới cùng lúc — an toàn, rồi tiền, rồi sự thoải mái; 'nguy hiểm trước' là gọi người sơ cứu, báo quản lý, ở lại bên khách, mọi việc khác có người giữ và mốc giờ; và trong mười lăm phút cuối ca không mở việc mới mà ghi lại, bàn giao có tên cho ca sau — trừ khi có nguy hiểm.",
  title: {
    en: "Rehearsal: Priorities and the Last Fifteen Minutes",
    vi: "Tổng duyệt: thứ tự ưu tiên và mười lăm phút cuối ca",
  },
};
