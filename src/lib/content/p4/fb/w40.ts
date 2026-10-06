// FB week 40 — Final Assessment: one full shift (hand-authored Phase 4, see
// ../kit.ts).
//
// The week the matrix keeps for review and the final paper teaches no new
// rule. It walks one dinner shift from six o'clock to closing, and every turn
// mixes the functions of weeks 31-39 the way a real floor does: the returning
// guest and the allergy question in the same breath; a dish sent back, the
// bill checked line by line and a name on tomorrow's cake in the busy hour;
// a reaction, a loud table and the alarm at half past nine, run in the order
// "danger first"; and at closing, corkage per bottle, a provisional booking,
// and a request that arrives in someone's last fifteen minutes.
//
// Every card re-presents a headword of weeks 31-39 with a new context (the kit
// keeps its earlier gloss). Nothing in the week talks about the course, the
// test or what was learned: the old week spent five of eight turns there, and
// its reading was a farewell letter rather than a shift. Every rule here is
// the one an earlier week taught, worded the same way.
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

// ── Lesson 1 — opening the floor ─────────────────────────────────────────────
const t1a =
  "Welcome back, madam. It is all on your preference card from your last visit: the window table, and no coriander.";
const t1b =
  "Since you mentioned the sea bass, madam, the fish of the day may suit you. It is in season tonight.";
const t1c =
  "Thank you for telling me, madam. I will write down her shellfish allergy for the kitchen, and the chef will check every dish.";
const t1d =
  "Try our pho, madam. It is a heritage dish: the broth simmers overnight, and it is comforting after a long flight.";

const lesson1 = L(40, 1, "Opening the Floor", "Mở ca: những bàn đầu tiên", {
  vocabulary: [
    c(
      "Preference card",
      "Read the preference cards for tonight's bookings before the first guest arrives.",
    ),
    c(
      "Since you mentioned",
      "Since you mentioned the sea bass, may I suggest the fish of the day?",
    ),
    c("Shellfish", "A friend at table five cannot eat shellfish, so the chef checks every dish."),
    c("House wine", "The house wine in a half bottle suits a table of two."),
  ],
  grammar: [
    g(
      "Same as always, yes? I bring it.",
      "Welcome back, sir. Your preference card says green tea — shall I bring it again?",
      "Thẻ sở thích dùng như một câu hỏi, không như một quyết định. 'Your preference card' số ít nên 'says' có -s.",
      "Welcome back, sir. Your preference card say green tea — shall I bring it again?",
    ),
    g(
      "Fish OK for allergy, no problem.",
      "Thank you for telling me, madam. The chef will check every dish before you order.",
      "Câu chuẩn khi khách báo dị ứng: cảm ơn, rồi bếp kiểm tra TRƯỚC khi gọi món — không ai ở sảnh tự gọi món nào là an toàn. Sau 'for' là V-ing: telling.",
      "Thank you for tell me, madam. The chef will check every dish before you order.",
    ),
  ],
  speaking: [
    also(
      sp(
        "Good evening! We were here last month — the window table, and no coriander for me, remember?",
        t1a,
        "Khách tự nhắc chi tiết thì xác nhận đúng những chi tiết đó, kèm nguồn: 'preference card'. Không khoe hệ thống, không đoán thêm.",
      ),
      [
        "Welcome back, madam. It is all on your preference card from your last visit: the window table and no coriander.",
      ],
    ),
    also(
      sp(
        "Lovely. What would you suggest tonight? I loved the sea bass last time.",
        t1b,
        "Tư vấn đi từ lời khách ('Since you mentioned'), rồi một lý do ngắn và thật: 'in season'.",
        undefined,
        undefined,
        t1a,
      ),
      [
        "Since you mentioned the sea bass, madam, the fish of the day may suit you. It is in season this week.",
      ],
    ),
    risk(
      also(
        sp(
          "That sounds perfect. Oh — my friend here is allergic to shellfish.",
          t1c,
          "Cảm ơn khách đã nói, ghi lại dị ứng cho bếp ('write down her shellfish allergy'), và bếp trưởng kiểm tra từng món. Không tự hứa món nào an toàn.",
          undefined,
          ["kitchen", "chef"],
          t1b,
        ),
        [
          "Thank you for telling me, madam. I will write down her shellfish allergy for the kitchen, and the chef will check each dish.",
          "Thank you for telling me. I will write down her shellfish allergy for the kitchen, madam, and the chef will check every dish.",
          "Thank you for telling me, madam. I will note her shellfish allergy for the kitchen, and the chef will check every dish.",
          "Thank you for telling me, madam. I will tell the kitchen about her shellfish allergy, and the chef will check every dish.",
        ],
      ),
    ),
    also(
      sp(
        "There are two of us, and we are not wine experts. Something simple, please.",
        "Our house wine is a lovely dry white, sir, and a half bottle is just right for two.",
        "Gợi ý vang nhà tự tin, kèm một chữ tả vị ('dry'), không xin lỗi vì nó rẻ; 'half bottle' là lời tư vấn, không phải hạ cấp. Không đọc giá thành tiếng.",
      ),
      ["Our house wine is a lovely dry white, sir, and a half bottle is perfect for two."],
    ),
    sp(
      "What is the chef most proud of on the menu?",
      "Our signature dish, madam: lemongrass beef from a local farm, grilled over charcoal. The chef is very proud of it.",
      "Kể món bằng câu ghép: món gì, nguyên liệu từ đâu, nấu thế nào, rồi một tính từ cảm xúc. Một chi tiết thật đáng giá hơn mười lời khen.",
    ),
    sp(
      "Table three is a business dinner. Anything I should know before I go over?",
      "It is a business dinner, so be discreet: serve from the side, keep a slow dining pace, and wait for a pause.",
      "Nói với đồng nghiệp: không sir/madam. Ba việc cụ thể sau dấu hai chấm, nối bằng dấu phẩy và 'and'; 'dining pace' chậm cho bàn đang bàn công việc.",
      "colleague",
    ),
    also(
      sp(
        "We flew in from London today, and we are tired. Something local, but not heavy?",
        t1d,
        "Kể món bằng câu ghép: tên món, một chi tiết thật ('heritage dish', nước dùng ninh qua đêm — 'broth', 'simmers'), rồi lý do món hợp với khách đang mệt ('comforting').",
        undefined,
        ["heritage", "broth", "simmers", "comforting"],
      ),
      [
        "Try our pho, madam. It is a heritage dish: the broth simmers overnight, and it is comforting after a long journey.",
        "Then try our pho, madam. It is a heritage dish: the broth simmers overnight, and it is comforting after a long flight.",
      ],
    ),
    also(
      sp(
        "We would like to try something adventurous. What would you eat?",
        "If you feel adventurous, sir, try the fish in a clay pot. It is my personal favourite, rich and peppery.",
        "Tư vấn từ lời khách ('adventurous'), rồi một món thật kèm dấu ấn riêng ('my personal favourite') và một chi tiết vị.",
      ),
      [
        "If you are feeling adventurous, sir, try the fish in a clay pot. It is my personal favourite, rich and peppery.",
      ],
    ),
  ],
  reading: read(
    `SIX O'CLOCK — THE FIRST HOUR OF A DINNER SHIFT
Six o'clock. The section is set, and the preference cards for tonight's bookings are on the side station. Lan reads them before the first guest arrives.
A couple comes back from last month. She greets them by name once, at the door, and uses the card as a question: "Still no coriander?"
At the next table, a friend mentions a shellfish allergy. Lan thanks her, writes it on the order for the kitchen, and the chef checks every dish. Nobody on the floor calls a dish safe.
Two guests ask for something simple to drink. She suggests the house wine in a half bottle, without an apology and without reading a price aloud.
A business dinner sits by the window. She serves from the side and waits for a pause before she speaks.
When a guest asks about the lemongrass beef, she tells its story in one breath: grilled over charcoal, beef from a local farm, and a chef who is proud of it.
By seven, every table has been asked the same safety question before anything was chosen.`,
    [
      {
        q: "Lan dùng thẻ sở thích của khách quen thế nào?",
        options: [
          "Như một câu hỏi để khách xác nhận",
          "Như một quyết định, mang món ra luôn",
          "Đọc to cho cả bàn biết khách thích gì",
        ],
        correct: 0,
        explanation:
          "'uses the card as a question: Still no coriander?' Khẩu vị có thể đã đổi, nên thẻ là câu hỏi, không phải quyết định.",
      },
      {
        q: "Khách báo dị ứng hải sản có vỏ. Ai xác nhận món?",
        options: [
          "Lan, dựa vào trí nhớ về thực đơn",
          "Bếp trưởng, sau khi Lan ghi dị ứng cho bếp",
          "Khách tự chọn món trên thực đơn",
        ],
        correct: 1,
        explanation:
          "'writes it on the order for the kitchen, and the chef checks every dish. Nobody on the floor calls a dish safe.'",
      },
      {
        q: "Bàn ăn tối công việc được phục vụ thế nào?",
        options: [
          "Hỏi chuyện khách liên tục để tạo không khí vui vẻ",
          "Mang tất cả các món ra cùng một lúc",
          "Phục vụ từ bên cạnh, chờ khách ngừng nói",
        ],
        correct: 2,
        explanation: "'She serves from the side and waits for a pause before she speaks.'",
      },
    ],
  ),
  game: [
    round(
      "Surprise us! We will eat anything you choose.",
      "Happily, sir. First, does anyone at the table have an allergy?",
      "Happily, sir. First, do anyone at the table have an allergy?",
      "Then I will bring our most expensive dishes, sir — you will not be disappointed.",
      "'do anyone' sai: 'anyone' số ít nên dùng 'does'. Câu mang món đắt nhất đúng ngữ pháp nhưng bỏ câu hỏi dị ứng và tiêu tiền thay khách. Đáp án hỏi điều an toàn trước mọi lựa chọn.",
      1,
    ),
    round(
      "The couple at table two say their card is wrong — they love coriander now.",
      "Then update the card tonight — tastes change, and the card follows the guest.",
      "Tell them the card is correct — we write it down last time.",
      "Tell them the card is correct — we wrote it down last time.",
      "'we write it down last time' sai thì: chuyện lần trước dùng quá khứ 'wrote'. Cả câu đó lẫn câu đúng ngữ pháp 'Tell them the card is correct…' đều cãi khách và đặt tờ thẻ lên trên vị khách. Đáp án cập nhật thẻ theo khách.",
      0,
      "colleague",
    ),
  ],
});

// ── Lesson 2 — the busy hour ─────────────────────────────────────────────────
const t2a =
  "I am so sorry, madam. May I send back the curry for a milder one, or bring you something else?";
const t2b = "I am sorry, madam. I will bring the menu now, and check the bill with my supervisor.";
const t2c =
  "Certainly, madam — four ways is fine. I will split the bill by seat and bring four bills.";

const lesson2 = L(40, 2, "The Busy Hour", "Giờ cao điểm", {
  vocabulary: [
    c("Send back", "Send back any dish the guest is not happy with, and offer a choice."),
    c("Line by line", "Go through a disputed bill line by line against the docket."),
    c("Split the bill", "We can split the bill four ways, one card for each guest."),
    c("Name on the cake", "Every name on the cake is read back to the host, letter by letter."),
  ],
  grammar: [
    g(
      "Curry is spicy. Vietnamese food is spicy.",
      "I am sorry it is not to your liking, madam. Shall I send it back for a milder one?",
      "Xin lỗi về trải nghiệm, không tranh luận về món. Sau 'Shall I' là động từ nguyên mẫu: send.",
      "I am sorry it is not to your liking, madam. Shall I sends it back for a milder one?",
    ),
    g(
      "Bill correct. Computer printed it.",
      "May I go through the bill with you line by line, sir? The order slip shows every dish.",
      "Đối chiếu theo phiếu gọi món ('order slip' — với khách không nói 'docket'), không theo trí nhớ hay 'cái máy'. 'The order slip' số ít nên 'shows' có -s.",
      "May I go through the bill with you line by line, sir? The order slip show every dish.",
    ),
  ],
  speaking: [
    also(
      sp(
        "This curry is far too spicy. I really cannot eat it.",
        t2a,
        "Xin lỗi một câu, rồi hai lối đi: trả món về bếp ('send back') để làm món nhẹ cay hơn, hoặc đổi món khác. Không cãi về độ cay.",
      ),
      [
        "I am so sorry, madam. May I send back the curry for a milder one, or bring you something different?",
      ],
    ),
    risk(
      also(
        sp(
          "Something else, please. And I do not want to pay for that curry.",
          t2b,
          "Không mở bằng lời đồng ý — khách sẽ nghe thành khỏi trả tiền. Món mới là việc của bạn — làm ngay. Hoá đơn là việc của giám sát — bạn hỏi, không tự hứa bớt.",
          undefined,
          ["supervisor"],
          t2a,
        ),
        [
          "I am sorry, madam. I will bring the menu now and check the bill with my supervisor.",
          "I am so sorry, madam. I will bring you the menu now, and I will check the bill with my supervisor.",
          "I will bring the menu now, madam, and check the bill with my supervisor.",
        ],
      ),
    ),
    also(
      sp(
        "Fine. And can we split the bill four ways tonight?",
        t2c,
        "Tách hoá đơn là quyền lợi công khai (tối đa bốn thẻ), nên nhận lời ngay và nói cách làm: 'split the bill' theo ghế.",
        undefined,
        undefined,
        t2b,
      ),
      [
        "Certainly, madam — four ways is fine. I will split the bill by seat and bring the four bills.",
      ],
    ),
    also(
      sp(
        "This bill has three desserts on it. We only had two.",
        "Let me check the order slips line by line, sir. If a dessert was charged in error, it comes off.",
        "Đối chiếu 'line by line' bằng phiếu gọi món ('order slips') — không bằng trí nhớ của ai. Câu điều kiện cam kết theo sự thật: món 'charged in error' thì được bỏ ra.",
      ),
      [
        "Let me check the order slips line by line, sir. If a dessert was charged in error, it will come off.",
      ],
    ),
    sp(
      "It is my husband's fiftieth tomorrow. Can the cake say Happy Birthday, Minh?",
      "Fifty is a real milestone, madam. May I read the name on the cake back to you, letter by letter?",
      "Khách đã nói tuổi nên được nhắc lại như một cột mốc ('milestone'). Tên trên bánh luôn được đọc lại từng chữ cái — bánh viết sai tên rất khó sửa lúc chín giờ tối.",
    ),
    sp(
      "Table nine's curry came back, and they asked about the bill. What did you do?",
      "I sent the curry back for a different dish, and the bill is waiting for your approval.",
      "Báo cáo lên giám sát: không sir/madam. Quá khứ đơn cho việc bạn đã làm (sent), hiện tại tiếp diễn cho việc đang chờ cấp trên.",
      "manager",
    ),
  ],
  reading: read(
    `EIGHT O'CLOCK — THE BUSY HOUR
At eight, every table wants something at once. Table nine sends back a curry that is too spicy. Table four asks to split the bill four ways. Table six thinks a dessert on their bill was never ordered. And table two wants a name on tomorrow's birthday cake.
Each request has its own rule, and the rules do not change because the room is busy.
The curry is sent back at once, and the guest chooses: a milder one, or a different dish. Taking it off the bill is the supervisor's decision, so Lan asks before she promises.
Splitting the bill is service, not a favour. Up to four cards on one bill is a public policy, so she says yes at once.
The dessert is checked line by line against the docket, never against memory. If it is the restaurant's error, the supervisor signs the correction.
The name on the cake is read back, letter by letter, and written on the occasion slip.
Busy is not a reason to skip a step. It is the reason the steps exist.`,
    [
      {
        q: "Món cà ri bị trả về. Ai quyết định bỏ món khỏi hoá đơn?",
        options: [
          "Giám sát; Lan hỏi ý trước khi hứa",
          "Lan, vì cô là người nhận món trả về",
          "Bếp trưởng, vì món ăn là của bếp",
        ],
        correct: 0,
        explanation:
          "'Taking it off the bill is the supervisor's decision, so Lan asks before she promises.' Làm lại hay đổi món thì Lan tự quyết.",
      },
      {
        q: "Vì sao Lan đồng ý tách hoá đơn ngay?",
        options: [
          "Vì khách đang vội và đang không vui",
          "Vì tách tối đa bốn thẻ là quyền lợi công khai",
          "Vì giám sát đang bận ở một bàn khác",
        ],
        correct: 1,
        explanation:
          "'Splitting the bill is service, not a favour. Up to four cards on one bill is a public policy, so she says yes at once.'",
      },
      {
        q: "Món tráng miệng bị nghi tính nhầm được kiểm tra dựa vào đâu?",
        options: [
          "Trí nhớ của người phục vụ bàn đó",
          "Lời kể của các khách ngồi cùng bàn",
          "Docket, từng dòng một",
        ],
        correct: 2,
        explanation:
          "'The dessert is checked line by line against the docket, never against memory.'",
      },
    ],
  ),
  game: [
    round(
      "Just take the curry off the bill yourself. It is only a small amount.",
      "I would love to help, madam. My supervisor signs that, and she is coming to your table now.",
      "Fine, madam — I will leave the curry off the bill before my supervisor will see it.",
      "Fine, madam — I will leave the curry off the bill before my supervisor sees it.",
      "'before my supervisor will see' sai: mệnh đề thời gian sau 'before' dùng hiện tại đơn (before she sees), không dùng 'will'. Cả câu đó lẫn câu đúng tiếng Anh 'I will leave the curry off the bill before my supervisor sees it' đều tự bớt tiền và giấu cấp trên — việc của giám sát. Đáp án vẫn giúp khách, đúng quy trình.",
      2,
    ),
    round(
      "Can the cake just say Happy Birthday? Spelling his name is too much trouble.",
      "It is no trouble at all, sir. May I read the name back to you, letter by letter?",
      "It is no trouble at all, sir. May I reading the name back to you, letter by letter?",
      "Of course, sir — that is easier for the pastry team, and nobody reads the cake anyway.",
      "'May I reading' sai: sau 'May I' là động từ nguyên mẫu (read). Câu 'easier for the pastry team… nobody reads the cake' đúng ngữ pháp nhưng đặt sự tiện của bếp lên trên khoảnh khắc của khách. Đáp án làm đúng việc khó: đọc lại từng chữ.",
      1,
    ),
  ],
});

// ── Lesson 3 — when something goes wrong ─────────────────────────────────────
const t3a =
  "Your friend first, madam. The first aider is coming now, and the bill will wait with me.";
const t3b =
  "Please help her use her own medication, madam, if she has it. My colleague is calling 115 now.";
const t3c =
  "I am not able to say what caused the reaction, madam. We keep the plate for the doctor, and my manager is coming now.";

const lesson3 = L(40, 3, "When Something Goes Wrong", "Khi có sự cố", {
  vocabulary: [
    c("First aider", "Call the first aider by name the moment a guest is in danger."),
    c("Keep the plate", "Keep the plate and the sauce together until the doctor has seen them."),
    c("Danger first", "Danger first, then the bill, then everything else."),
    c("Slow the pace", "Slow the pace at a loud table with water and food."),
    c("Stairs", "When the alarm sounds, walk every guest to the stairs."),
  ],
  grammar: [
    g(
      "Calm down, calm down! He will be fine!",
      "The first aider is coming now, madam — one minute. Please let us clear a space.",
      "Không bao giờ bảo khách bình tĩnh hay hứa 'sẽ ổn'. Một việc + một mốc giờ. Sau 'let us' là động từ nguyên mẫu: clear.",
      "The first aider is coming now, madam — one minute. Please let us clearing a space.",
    ),
    g(
      "Fire alarm. Run! Take the lift, quick!",
      "Please leave everything and walk with me to the stairs, sir. We never take the lift.",
      "Sơ tán: cầu thang bộ, không thang máy, không mang đồ. Chủ ngữ 'We' không thêm -s: take.",
      "Please leave everything and walk with me to the stairs, sir. We never takes the lift.",
    ),
  ],
  speaking: [
    risk(
      also(
        sp(
          "My friend's face is swelling, and you still have not brought our bill!",
          t3a,
          "Nguy hiểm trước, tiền sau: người bạn trước, người sơ cứu đang tới, và hoá đơn có người giữ — chính bạn.",
          undefined,
          ["first"],
        ),
        [
          "Your friend first, madam. The first aider is coming now, and your bill will wait with me.",
          "Your friend comes first, madam. The first aider is coming now, and the bill will wait with me.",
          "Your friend first, madam. The first aider is on the way now, and the bill will wait with me.",
          "Your friend first, madam. I am calling the first aider now, and the bill can wait.",
          "Your friend first, madam. The first aider is coming now, and the bill can wait.",
        ],
      ),
    ),
    also(
      sp(
        "It is getting worse! Her lips are swelling too!",
        t3b,
        "Thuốc của khách thì khách hoặc người nhà dùng; bạn không tự cho thuốc. Câu sau là việc đang làm: đồng nghiệp gọi 115.",
        undefined,
        undefined,
        t3a,
      ),
      [
        "Please help her use her own medication, madam, if she has it. My colleague is calling 115 right now.",
      ],
    ),
    also(
      sp(
        "Was it the sauce? Who is responsible for this?",
        t3c,
        "Không nhận, không chối: chưa nói được điều gì gây ra phản ứng ('what caused the reaction'). Việc đang làm — giữ đĩa ('keep the plate') cho bác sĩ — và người có quyền đang tới.",
        undefined,
        undefined,
        t3b,
      ),
      [
        "I am not able to say what caused the reaction yet, madam. We keep the plate for the doctor, and my manager is coming now.",
        "I cannot say what caused the reaction, madam. We keep the plate for the doctor, and my manager is coming now.",
      ],
    ),
    sp(
      "Another bottle! It is my birthday — do not be boring!",
      "Happy birthday, sir! Water and something to eat first, and my supervisor decides the next bottle.",
      "Chúc mừng thật lòng, rồi giảm nhịp bằng nước và đồ ăn. Ly tiếp theo là quyết định của giám sát — không hứa quầy bar sau đó.",
    ),
    risk(
      also(
        sp(
          "The alarm is ringing. Can we take the lift? It is faster.",
          "Not the lift, sir — the stairs, please. Leave everything and walk with me.",
          "Sơ tán: không thang máy, không mang đồ, người dẫn đi cùng khách. Ba ý, câu ngắn, giọng đều.",
          undefined,
          ["lift"],
        ),
        [
          "Not the lift, sir — the stairs, please. Leave everything and come with me.",
          "Not the lift, sir. We take the stairs. Please leave everything and walk with me.",
          "Not the lift, sir — we take the stairs. Leave everything and walk with me.",
        ],
      ),
    ),
    sp(
      "Table nine is on their fourth bottle and getting loud, and table two needs their bill.",
      "Danger first: slow the pace at table nine and call the supervisor — only she can refuse service. Then table two's bill.",
      "Nói với đồng nghiệp: không sir/madam. Bàn quá chén là chuyện an toàn nên đi trước; hoá đơn đi sau. 'Slow the pace' là việc của sảnh; 'refuse service' là việc của giám sát.",
      "colleague",
    ),
    sp(
      "A man at the bar is choking! Should I try to help him myself?",
      "Only if you are trained. Call the first aider now, and clear a space around the guest.",
      "Nói với đồng nghiệp: không sir/madam. Chỉ người đã được huấn luyện ('trained') mới sơ cứu; việc của mọi người là gọi người sơ cứu và dọn chỗ ('clear a space').",
      "colleague",
    ),
  ],
  reading: read(
    `HALF PAST NINE — WHEN SOMETHING GOES WRONG
Half past nine, and three things happen within five minutes. A guest's face starts to swell at table four. A birthday table at the bar asks for a fifth bottle. Then the fire alarm sounds.
Danger first. Lan calls the first aider and asks a colleague to call 115. She asks whether the guest carries her medication, and she stays with her. The plate, the docket and the sauce are kept together for the doctor.
At the bar, a colleague slows the pace: water and food on the table, and the next bottle is the supervisor's decision.
When the alarm sounds, everything else stops. Every alarm is real. The team walks the guests to the stairs, never the lift, and nobody goes back for a bag. The first aider and a colleague stay with the guest from table four and tell the firefighters exactly where she is.
At the assembly point, Lan counts her tables. Only then does she think about the bills, and they can wait.`,
    [
      {
        q: "Việc đầu tiên Lan làm khi khách bàn bốn bị sưng mặt là gì?",
        options: [
          "Mang hoá đơn ra cho bàn khác trước",
          "Gọi người sơ cứu và nhờ gọi 115",
          "Hỏi bếp xem món nào có vấn đề",
        ],
        correct: 1,
        explanation:
          "'Danger first. Lan calls the first aider and asks a colleague to call 115… and she stays with her.'",
      },
      {
        q: "Khi chuông báo cháy kêu, khách bàn bốn được lo thế nào?",
        options: [
          "Có người ở lại; báo đội cứu hoả chỗ khách đang ở",
          "Được đưa xuống bằng thang máy cho nhanh",
          "Được để lại tại bàn và hứa quay lại đón",
        ],
        correct: 0,
        explanation:
          "'The first aider and a colleague stay with the guest from table four and tell the firefighters exactly where she is.'",
      },
      {
        q: "Bàn sinh nhật ở quầy bar đòi chai thứ năm thì sao?",
        options: [
          "Mang ngay vì đó là dịp vui của khách",
          "Từ chối thẳng và mời khách ra về",
          "Mời nước và đồ ăn; giám sát quyết",
        ],
        correct: 2,
        explanation:
          "'a colleague slows the pace: water and food on the table, and the next bottle is the supervisor's decision.'",
      },
    ],
  ),
  game: [
    round(
      "Is this alarm real? We have only just sat down.",
      "We treat every alarm as real, madam. Please leave everything and walk with me.",
      "Probably not, madam — it is usually drill on Fridays, so please finish your starter first.",
      "Probably not, madam — it is usually a drill on Fridays, so please finish your starter first.",
      "'usually drill' thiếu mạo từ: 'drill' là danh từ đếm được số ít nên cần 'a drill'. Cả câu đó lẫn câu đúng tiếng Anh 'Probably not… a drill on Fridays' đều giữ khách lại trong phòng khi chuông kêu. Đáp án: mọi chuông báo đều là thật.",
      0,
    ),
    round(
      "The guest at table four is reacting. Shall I clear her plate so it does not upset her?",
      "No — keep the plate, the docket and the sauce together for the doctor.",
      "Yes, clear it quick, and bring her a fresh plate of something else to eat instead.",
      "Yes, clear it quickly, and bring her a fresh plate of something else to eat instead.",
      "'clear it quick' sai: bổ nghĩa cho động từ cần trạng từ 'quickly'. Cả câu đó lẫn câu đúng ngữ pháp 'Yes, clear it quickly…' đều làm mất thứ bác sĩ có thể cần, và cho khách đang phản ứng ăn tiếp. Đáp án giữ nguyên ba thứ.",
      2,
      "colleague",
    ),
  ],
});

// ── Lesson 4 — closing the night ─────────────────────────────────────────────
const t4a =
  "There is a corkage fee per bottle, madam, and I will show you the fee on the list before we open it.";
const t4b = "My supervisor decides that, madam. Shall I ask her for you now?";
const t4c =
  "With pleasure, madam. I can hold the date for a week as a provisional booking and send you a proposal in writing.";

const lesson4 = L(40, 4, "Closing the Night", "Khép lại buổi tối", {
  vocabulary: [
    c("Per bottle", "Corkage is quoted per bottle before the cork moves."),
    c("Provisional booking", "A provisional booking holds the private room for a week."),
    c("Last fifteen minutes", "A request in your last fifteen minutes goes to the next shift."),
    c("Hand over", "Hand over every open promise before you leave the floor."),
  ],
  grammar: [
    g(
      "Corkage? You pay. Rule of hotel.",
      "There is a corkage fee per bottle, sir, and I will show it to you before we open the wine.",
      "Báo phí TRƯỚC khi mở nút chai. 'a corkage fee' số ít nên dùng 'There is'.",
      "There are a corkage fee per bottle, sir, and I will show it to you before we open the wine.",
    ),
    g(
      "I finish now. Ask the next person.",
      "I finish in fifteen minutes, madam, so my colleague will look after your request from now.",
      "Luật cuối ca: không mở việc mới, bàn giao cho một người có tên. Sau 'will' là động từ nguyên mẫu: look.",
      "I finish in fifteen minutes, madam, so my colleague will looks after your request from now.",
    ),
  ],
  speaking: [
    also(
      sp(
        "We brought our own wine tonight. Is there a charge for that?",
        t4a,
        "Nói phí theo cách tính ('per bottle') và chỉ trên danh sách — không đọc con số to trước bàn, và luôn trước khi mở chai.",
      ),
      [
        "There is a corkage fee per bottle, madam, and I will show you the fee on the list before we open the wine.",
      ],
    ),
    risk(
      also(
        sp(
          "We come here every month. Could you waive it for us?",
          t4b,
          "Miễn phí khui rượu là quyền của giám sát, kể cả với khách quen. Một câu nói rõ người quyết, một câu xin phép đi hỏi.",
          undefined,
          ["supervisor"],
          t4a,
        ),
        [
          "My supervisor decides that, madam. May I ask her for you now?",
          "That is my supervisor's decision, madam. Shall I ask her for you now?",
          "I cannot waive it, madam, but I will ask my supervisor now, before we open the bottle.",
          "My supervisor decides that, madam. May I ask her now?",
        ],
      ),
    ),
    also(
      sp(
        "While you are here — could we book your private room for a party next month?",
        t4c,
        "Điều khoản đặt tiệc, dùng đúng chữ: giữ ngày một tuần ('provisional booking'), đề xuất gửi bằng văn bản. Không hứa giá hay cọc từ trí nhớ.",
        undefined,
        undefined,
        t4b,
      ),
      [
        "With pleasure, madam. I can hold the date for a week as a provisional booking, and send you a proposal in writing.",
      ],
    ),
    also(
      sp(
        "Before you go, could you arrange a car to the airport at five tomorrow morning?",
        "I finish soon, sir, so I will hand over your request to my colleague. She will ask the concierge and come back to you.",
        "Việc mới tới lúc cuối ca: không mở, bàn giao có tên. Xe là việc của concierge — đồng nghiệp hỏi giúp và báo lại khách, không ai hứa giờ thay họ.",
      ),
      [
        "I finish soon, sir, so I will hand over your request to my colleague. She will ask the concierge and get back to you.",
      ],
    ),
    sp(
      "Are you closing? Should we leave now?",
      "Please linger as long as you like, madam. The kitchen has closed, but the table is still yours.",
      "Không đuổi khách: mời khách nán lại, bếp đóng nhưng bàn vẫn là của khách. Hoá đơn chỉ tới khi khách gọi.",
    ),
    sp(
      "It is quarter to eleven. Did you hand everything over?",
      "Yes. Every new task from my last fifteen minutes went to the next shift by name.",
      "Báo cáo lên quản lý: không sir/madam. Quá khứ đơn (went) cho việc đã xong; 'by name' là bằng chứng không lời hứa nào bị bỏ rơi.",
      "manager",
    ),
    sp(
      "Two Vietnamese coffees to finish, please — we are in no hurry tonight.",
      "Lovely, madam. Since you are in no hurry, the phin filter can drip slowly, and the aroma comes first.",
      "Nhắc lại lời khách ('Since you are in no hurry'), rồi kể ngắn về ly cà phê: 'phin filter' nhỏ giọt chậm, 'aroma' tới trước.",
    ),
    also(
      sp(
        "Tomorrow is our anniversary. Could there be flowers in our room when we come back from dinner?",
        "How lovely, sir. My colleague on the next shift will coordinate it with Housekeeping and the florist, and confirm it with you.",
        "Việc mới lúc cuối ca: nhận lời ấm áp, nhưng người làm là đồng nghiệp ca sau. Hoa trong phòng cần 'coordinate' với Housekeeping và 'florist' — không ai hứa giờ thay họ.",
      ),
      [
        "How lovely, sir. My colleague on the next shift will coordinate it with the florist and Housekeeping, and confirm it with you.",
      ],
    ),
  ],
  reading: read(
    `TEN O'CLOCK — CLOSING THE NIGHT
Ten o'clock. The kitchen has closed, but three tables are still at dinner, and nobody is hurried. The lights stay up, the music stays on, and the bill comes only when a guest asks for it.
A couple has brought their own wine. Lan quotes the corkage fee per bottle before the cork moves. When they ask her to waive it, she asks her supervisor, because that decision is not hers.
The same couple asks about a party next month. She offers a provisional booking for a week and promises the terms in writing. The price and the deposit come from the manager, not from her memory.
Earlier, at a quarter to ten, a guest asked for a car to the airport. It was Lan's last fifteen minutes, so she did not start it. She wrote it down and handed it over by name to a colleague on the next shift, who asked the concierge and came back to the guest.
Before she leaves, Lan tells her manager what she handed over and to whom. Nothing she promised tonight leaves the building in her head.`,
    [
      {
        q: "Khi nào khách được báo phí khui rượu?",
        options: [
          "Khi in hoá đơn vào cuối buổi tối",
          "Trước khi mở nút chai, tính theo từng chai",
          "Khi khách tự hỏi tới khoản phí đó",
        ],
        correct: 1,
        explanation:
          "'Lan quotes the corkage fee per bottle before the cork moves.' Khách không bị bất ngờ ở hoá đơn.",
      },
      {
        q: "Vì sao Lan không tự sắp xếp xe ra sân bay?",
        options: [
          "Vì đó là mười lăm phút cuối ca làm của cô",
          "Vì khách sạn không có dịch vụ xe ra sân bay",
          "Vì khách chưa trả trước tiền xe cho cô",
        ],
        correct: 0,
        explanation:
          "'It was Lan's last fifteen minutes, so she did not start it. She wrote it down and handed it over by name.'",
      },
      {
        q: "Trước khi về, Lan làm gì?",
        options: [
          "Ghi các lời hứa vào sổ tay riêng của mình",
          "Nhắn tin cho từng khách để chào tạm biệt",
          "Báo quản lý đã bàn giao gì, cho ai",
        ],
        correct: 2,
        explanation:
          "'Lan tells her manager what she handed over and to whom. Nothing she promised tonight leaves the building in her head.'",
      },
    ],
  ),
  game: [
    round(
      "You are closing, I suppose. Should we ask for the bill now?",
      "Not at all, sir. Please stay as long as you like — the bill comes when you ask.",
      "Not at all, sir. Please stay as long as you like — the bill come when you ask.",
      "Yes, sir, that would help — the team would like to finish early tonight.",
      "'the bill come' thiếu -s: 'the bill' số ít nên 'comes'. Câu 'the team would like to finish early' đúng ngữ pháp nhưng đẩy khách đi vì tiện cho nhân viên. Đáp án: bàn vẫn là của khách.",
      2,
    ),
    round(
      "A guest just asked me for a cake for tomorrow, and I finish very soon. Shall I just do it?",
      "No — write it down and hand it over to me by name. I will take it from now.",
      "No — write it down and hands it over to me by name. I will take it from now.",
      "Yes, do it quickly before you go — the next shift is always too busy anyway.",
      "'and hands' sai: hai mệnh lệnh nối 'and' đều nguyên mẫu (write… and hand). Câu bảo làm nhanh trước khi về đúng ngữ pháp nhưng mở việc mới trong mười lăm phút cuối ca. Đáp án ghi lại và bàn giao có tên.",
      0,
      "colleague",
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: xử lý trọn một ca tối bằng tiếng Anh — đón khách quen và hỏi dị ứng, tư vấn món và rượu, nhận món trả về và đối chiếu hoá đơn theo docket, lo một dịp đặc biệt, xử lý dị ứng, khách quá chén và chuông báo cháy theo thứ tự 'nguy hiểm trước', báo phí khui rượu, nhận đặt tiệc tạm, và bàn giao có tên mọi việc tới trong mười lăm phút cuối ca.",
};
