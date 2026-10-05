// FB week 33 — Disputes & Compensation (hand-authored Phase 4, see ../kit.ts).
//
// Four steps for every complaint — Listen, Apologise, Solve, Thank — and the
// line between what the floor may put right and what it may not:
//
//  · The server decides a remake, a different dish, a fresh drink, keeping
//    the other plates warm. Nothing that changes the bill. "Our policy allows
//    a remake of any dish, up to the end of your meal" is a public promise and
//    may be said aloud; an internal limit never is.
//  · The floor supervisor decides anything on the bill (an item off, a
//    dessert on the house, the service charge) and signs it before the guest
//    is told: "Let me check with my supervisor."
//  · The Duty Manager decides every illness or injury, at any amount. A guest
//    who feels sick after eating is offered a doctor first; the floor writes
//    down what was eaten and when, never admits or denies the cause, and never
//    offers money or a free meal. The written reply (the week's writing task)
//    comes later, from the restaurant manager.
//
// Kept from the earlier week because the floor managers rated it: the three
// tiers, the bill checked against the dockets, the plate carried straight
// through and the kitchen told the fact, not the blame. Fixed: no complimentary
// tea in the server's tier, no names or minutes the guest never gave, and the
// turns that carry money and health are marked `risk`.
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

// ── Lesson 1 — the dish that comes back (LAST) ───────────────────────────────
const t1a = "Please tell me more, sir. What is wrong with the steak?";
const t1b =
  "I am so sorry, sir. I will send it back now, and the kitchen will remake it medium rare.";
const t1c =
  "I will check the time with the kitchen and come straight back, sir. Thank you for telling me.";

const lesson1 = L(33, 1, "The Dish That Comes Back", "Món ăn bị trả về", {
  vocabulary: [
    c("Send back", "A guest may send back any dish that is not right.", [
      "/send bæk/",
      "Trả món về bếp",
      "↩️",
    ]),
    c("Remake", "The kitchen will remake the dish, not repair it.", [
      "/ˌriːˈmeɪk/",
      "Làm lại món mới hoàn toàn",
      "🔁",
    ]),
    c("Fire", "Fire one more steak for table nine, please.", [
      "/ˈfaɪə/",
      "Lệnh cho bếp bắt đầu nấu một món — chỉ dùng nội bộ, không nói với khách",
      "🔥",
    ]),
    c(
      "Steak doneness",
      "Always confirm the steak doneness when you take the order — rare, medium or well done.",
    ),
  ],
  grammar: [
    g(
      "You ordered medium. This is medium.",
      "I am sorry it is not to your liking, sir. The kitchen will remake it now.",
      "Bước 2 và 3 của LAST: xin lỗi về trải nghiệm ('not to your liking'), rồi giải pháp ('will remake'). Sau 'will' là động từ nguyên mẫu. Tranh luận về độ chín là thua ngay cả khi bạn đúng.",
      "I am sorry it is not to your liking, sir. The kitchen will remakes it now.",
    ),
    g(
      "Nobody else complained about this dish tonight.",
      "Thank you for telling me, madam. May I bring you something else instead?",
      "Bước 4 của LAST — cảm ơn: 'Thank you for + V-ing' (telling). Khiếu nại là thông tin bếp cần; so sánh với bàn khác là câu cấm.",
      "Thank you for tell me, madam. May I bring you something else instead?",
    ),
  ],
  speaking: [
    also(
      sp(
        "Excuse me. This steak is not right.",
        t1a,
        "Bước 1 của LAST — lắng nghe: mời khách kể hết bằng một câu hỏi ngắn. Chưa giải thích, chưa xin lỗi vội.",
      ),
      ["Please tell me more, sir. What is wrong with your steak?"],
    ),
    also(
      sp(
        "I asked for medium rare, and it is well done all the way through.",
        t1b,
        "Bước 2 và 3: xin lỗi, rồi giải pháp có hai việc — 'send it back' và 'remake'. Nhắc lại đúng độ chín khách gọi.",
        undefined,
        undefined,
        t1a,
      ),
      ["I am so sorry, sir. I will send it back now, and the kitchen will remake it, medium rare."],
    ),
    also(
      sp(
        "Fine. How long will that take? My wife is already eating.",
        t1c,
        "Không đoán giờ thay bếp: hỏi bếp rồi quay lại ngay. Kết thúc bằng bước 4 — 'Thank you for telling me'.",
        undefined,
        undefined,
        t1b,
      ),
      [
        "I will check the time with the kitchen and come straight back, sir. Thank you for telling me about it.",
      ],
    ),
    sp(
      "What do you need for table nine?",
      "Please fire one medium rare steak for table nine. It is a remake.",
      "Nói với bếp ở quầy pass: 'fire' là lệnh nội bộ, không bao giờ nói với khách. Nói sự việc, không nói lời trách.",
      "colleague",
    ),
    sp(
      "How do I stop steaks from coming back?",
      "Confirm the steak doneness when you take the order, and write it on the docket.",
      "Nói với đồng nghiệp mới: phòng hơn chữa. Hai việc nối bằng ', and': xác nhận 'steak doneness', rồi ghi lên phiếu.",
      "colleague",
    ),
    also(
      sp(
        "This soup is barely warm. And do not tell me that is how it is served.",
        "I am sorry, madam. I will send back the soup now and bring you a hot one, or something else if you prefer.",
        "Đưa cả hai lối đi: làm lại món đó, hoặc đổi món khác. Không tranh luận về nhiệt độ.",
      ),
      [
        "I am sorry, madam. I will send back the soup and bring you a hot one, or something else if you prefer.",
      ],
    ),
  ],
  reading: read(
    `LISTEN, APOLOGISE, SOLVE, THANK
When a dish comes back, the floor follows four steps, in this order.
Listen. Let the guest finish, and ask one question if you need it: "What is wrong with it?" Do not explain the recipe while the guest is still talking.
Apologise for the experience, not for the recipe: "I am sorry it is not to your liking." You do not need to know whose mistake it was to be sorry the guest is unhappy.
Solve. Offer both roads every time: a remake of the same dish, or a different dish at the same course. Give an honest time, and check it with the kitchen first. A remade steak takes as long as the first one did. Ask whether to keep the other plates warm or serve them now.
Thank. "Thank you for telling me" turns a complaint into information the kitchen needs.
Then carry the plate straight through. It is never tasted, discussed or inspected in the dining room. Tell the kitchen the fact, "medium rare ordered, well done served", never the blame.
Prevention is cheaper than a remake. Confirm the steak doneness when you take the order, and write it on the docket.`,
    [
      {
        q: "Bốn bước xử lý khi món bị trả về theo thứ tự nào?",
        options: [
          "Lắng nghe – xin lỗi – giải quyết – cảm ơn",
          "Xin lỗi – giải thích công thức – giảm giá – cảm ơn",
          "Giải quyết – lắng nghe – báo cho bếp – xin lỗi",
        ],
        correct: 0,
        explanation:
          "'Listen… Apologise… Solve… Thank' — lắng nghe trước, và không giải thích công thức khi khách còn đang nói.",
      },
      {
        q: "Khi món bị trả về, khách được đưa những lựa chọn nào?",
        options: [
          "Chờ món được sửa lại, hoặc bỏ hẳn không dùng nữa",
          "Nhận tráng miệng miễn phí, hoặc phiếu giảm giá lần sau",
          "Làm lại món đó, hoặc đổi món khác cùng lượt",
        ],
        correct: 2,
        explanation:
          "'a remake of the same dish, or a different dish at the same course' — món được làm lại, không sửa; tặng miễn phí không phải quyền của người phục vụ.",
      },
      {
        q: "Người phục vụ nói gì với bếp về món bị trả?",
        options: [
          "Nhận xét rằng khách ở bàn đó là người rất khó tính",
          "Sự việc: gọi tái vừa, ra chín kỹ",
          "Lời trách: bếp nấu sai nên khách mới phàn nàn",
        ],
        correct: 1,
        explanation:
          "'Tell the kitchen the fact, medium rare ordered, well done served, never the blame.'",
      },
    ],
  ),
  game: [
    round(
      "There is a piece of glass in my salad. Glass! Look at it!",
      "Are you hurt, sir? I am so sorry. I will keep the plate for my manager, and he is coming now.",
      "Are you hurt, sir? I am so sorry. I keeping the plate for my manager, and he coming now.",
      "I am terribly sorry, sir — a fresh salad and a free dessert are coming right away.",
      "'I keeping… he coming' thiếu động từ 'am/is'. Câu tặng salad mới và tráng miệng miễn phí đúng tiếng Anh nhưng bỏ qua câu hỏi quan trọng nhất (khách có bị thương không), hứa quà vượt quyền và để mất chiếc đĩa cần giữ lại. Đáp án hỏi thương tích trước, giữ đĩa, gọi quản lý.",
      2,
    ),
    round(
      "Table two sent back the fish. Shall I just warm it up again?",
      "No — a dish that comes back is never reheated. Fire a fresh one.",
      "No — a dish that come back is never reheat. Fire a fresh one.",
      "Yes, but do it quickly, and do not tell the guest it is the same plate.",
      "'a dish that come back… never reheat' sai hai chỗ: 'comes' (số ít) và bị động 'is never reheated'. Câu 'Yes, but do it quickly…' đúng tiếng Anh nhưng hâm lại món khách đã trả và giấu khách — trái chuẩn dịch vụ. Đáp án: làm món mới.",
      1,
      "colleague",
    ),
  ],
});

// ── Lesson 2 — what the floor can put right ──────────────────────────────────
const t2a = "The bill needs approval from my supervisor, sir, so let me check with her now.";
const t2b =
  "I am sorry, sir, I cannot change the bill myself. The floor supervisor is on her way now.";
const t2c =
  "We will put right what went wrong, sir. The steak is being remade, and my supervisor will look at the bill with you.";

const lesson2 = L(33, 2, "What the Floor Can Put Right", "Quyền của người phục vụ sảnh", {
  vocabulary: [
    c("Floor supervisor", "Any change to a bill starts with the floor supervisor.", [
      "/flɔː ˈsuːpəvaɪzə/",
      "Giám sát ca ngoài sảnh nhà hàng",
      "🧑‍💼",
    ]),
    c("Approval", "Nothing changes on the bill without the supervisor's approval.", [
      "/əˈpruːvl/",
      "Sự duyệt, chấp thuận của cấp trên",
      "✅",
    ]),
    c("Put right", "Tell me what happened, and we will put it right.", [
      "/pʊt raɪt/",
      "Sửa cho đúng, khắc phục",
      "🔧",
    ]),
    c("Policy allows", "Our policy allows a remake of any dish, up to the end of the meal.", [
      "/ˈpɒləsi əˈlaʊz/",
      "Chính sách cho phép… — nói quyền lợi công khai của khách",
      "📜",
    ]),
    c("On the house", "My supervisor approved it, so the dessert is on the house tonight.", [
      "/ɒn ðə haʊs/",
      "Nhà hàng mời — miễn phí, chỉ khi giám sát đã duyệt",
      "🍰",
    ]),
  ],
  grammar: [
    g(
      "I can't touch the bill. Not my job.",
      "The remake is already on, sir. About the bill, let me check with my supervisor.",
      "Tách việc BẠN làm được (làm lại món — nói trước, đã xong) khỏi việc cần duyệt (hoá đơn — 'let me check with my supervisor'). Sau 'let me' là động từ nguyên mẫu.",
      "The remake is already on, sir. About the bill, let me checking with my supervisor.",
    ),
    g(
      "Fine, fine — the whole dinner is free, just calm down.",
      "That is above what I can decide, madam. My supervisor will come to you now.",
      "Đừng tặng thứ ngoài quyền mình: lời hứa quá quyền bị rút lại sẽ thành khiếu nại thứ hai. Sau 'can' là động từ nguyên mẫu: can decide.",
      "That is above what I can decides, madam. My supervisor will come to you now.",
    ),
  ],
  speaking: [
    risk(
      also(
        sp(
          "So the steak was wrong, and now you want me to pay full price for it?",
          t2a,
          "Tiền là việc của giám sát: nói rõ hoá đơn cần 'approval', và bạn đi hỏi ngay. Không tự hứa bớt, không cãi.",
          undefined,
          ["bill"],
        ),
        [
          "The bill needs approval from my supervisor, sir. Let me check with her now.",
          "Let me check with my supervisor now, sir — the bill needs her approval.",
        ],
      ),
    ),
    sp(
      "Can't you just take it off yourself? It is a small amount.",
      t2b,
      "Từ chối một câu, rồi nói ngay người có quyền đang tới. Khách nghe thấy tiến độ, không nghe thấy bức tường.",
      undefined,
      undefined,
      t2a,
    ),
    also(
      sp(
        "Fine. But I want this put right.",
        t2c,
        "Nhắc lại lời khách bằng 'put right', rồi hai việc: việc của bạn (món đang làm lại) và việc của giám sát (hoá đơn).",
        undefined,
        undefined,
        t2b,
      ),
      [
        "We will put right what went wrong, sir. The steak is being remade, and my supervisor will check the bill with you.",
      ],
    ),
    also(
      sp(
        "If the new one is still wrong, do I have to pay for another one?",
        "No, sir. Our policy allows a remake of any dish, up to the end of your meal.",
        "Khung của tuần (Our policy allows… up to…): quyền lợi công khai của khách thì được nói to, rõ ràng.",
      ),
      ["No, sir. Our policy allows a remake of any dish up to the end of your meal."],
    ),
    sp(
      "What happened at table nine?",
      "The steak came back well done, and the remake is on. The guest is asking about the bill.",
      "Báo cáo lên cấp trên: không sir/madam. Sự việc, việc đã làm, việc cần cấp trên quyết — ba ý, không kể lể.",
      "manager",
    ),
    sp(
      "Just bring me a free dessert and we will forget about it.",
      "I would love to help, madam. A dessert on the house needs my supervisor's approval, so may I ask her now?",
      "Món tặng là quyết định về tiền: nói nó cần 'approval', và xin phép đi hỏi. Không hứa trước khi được duyệt.",
    ),
  ],
  reading: read(
    `WHAT THE FLOOR MAY PUT RIGHT — THREE TIERS
The server decides: a remake or a different dish, a fresh drink, keeping the other plates warm. Nothing that changes the bill.
The floor supervisor decides: taking a dish off the bill, a dessert on the house, or waiving the service charge. That tier goes up to 500,000 VND on one bill. The approving name goes on the order slip before the guest is told.
The Duty Manager decides anything above that and any refund to a card. And always, at any amount: illness after eating, an injury in the restaurant, damage to a guest's clothes.
Tell the guest the process and the time, never the number. Say "Let me check with my supervisor — she is coming now", not "I can only give you so much". A guest who learns the limit orders just under it.
What every guest is entitled to can be said aloud. "Our policy allows a remake of any dish, up to the end of your meal" is a promise the whole restaurant keeps.
A promise above your tier, taken back later, becomes a second complaint, worse than the first. These tiers are one hotel's; ask your restaurant manager for yours in your first week.`,
    [
      {
        q: "Người phục vụ được tự quyết những gì?",
        options: [
          "Bớt một món khỏi hoá đơn nếu khách phàn nàn hợp lý",
          "Làm lại hoặc đổi món, giữ ấm các đĩa khác",
          "Mời cả bàn tráng miệng để thay cho lời xin lỗi",
        ],
        correct: 1,
        explanation:
          "'The server decides: a remake or a different dish, a fresh drink, keeping the other plates warm. Nothing that changes the bill.'",
      },
      {
        q: "Khách bị ốm sau bữa ăn thuộc quyền xử lý của ai?",
        options: [
          "Duty Manager, ở mọi mức tiền",
          "Giám sát sảnh, nếu thiệt hại dưới hạn mức cho phép",
          "Người phục vụ, nếu khách chỉ cần một lời xin lỗi",
        ],
        correct: 0,
        explanation:
          "'And always, at any amount: illness after eating, an injury in the restaurant…' — không có ngoại lệ.",
      },
      {
        q: "Vì sao không nói con số hạn mức cho khách?",
        options: [
          "Vì con số này thay đổi theo từng ca làm việc",
          "Vì khách sạn chưa công bố bảng giá mới cho năm nay",
          "Khách biết hạn mức sẽ đòi sát hạn mức",
        ],
        correct: 2,
        explanation:
          "'A guest who learns the limit orders just under it.' Nói quy trình và thời gian, không nói con số.",
      },
    ],
  ),
  game: [
    round(
      "Do not call anyone. Just take it off the bill yourself — it is a small amount.",
      "It takes one call, madam. My supervisor signs it, and she is coming now.",
      "It take one call, madam. My supervisor sign it, and she coming now.",
      "All right, madam, just this once — I will take it off before the bill is printed.",
      "'It take… My supervisor sign… she coming' sai ba chỗ chia động từ. Câu 'just this once — I will take it off' đúng tiếng Anh nhưng vượt quyền: mọi thay đổi trên hoá đơn cần tên người duyệt trước. Đáp án vẫn giúp khách, đúng quy trình.",
      1,
    ),
    round(
      "Table nine wants the steak for free. What did you promise them?",
      "Nothing on the bill, only the remake. I said you would come to the table.",
      "Nothing on the bill, only the remake. I say you will coming to the table.",
      "I told them the whole dinner is free tonight, so they are happy now.",
      "'I say you will coming' sai thì và dạng động từ (I said you would come). Câu 'I told them the whole dinner is free' đúng ngữ pháp nhưng là lời hứa vượt quyền — giám sát giờ phải rút lại, và khách có khiếu nại thứ hai. Đáp án báo đúng việc mình đã làm và việc để lại cho cấp trên.",
      2,
      "manager",
    ),
  ],
});

// ── Lesson 3 — the bill at the end of the night ──────────────────────────────
const t3a =
  "Of course, madam. I will be discreet, and we can check the bill against the dockets line by line.";
const t3b =
  "Let me check that docket now, madam. If the half bottle was charged in error, it comes off and I will reprint the bill.";
const t3c = "It was charged in error, madam, and I am sorry. The new bill is printing now.";

const lesson3 = L(33, 3, "The Bill at the End of the Night", "Hoá đơn cuối bữa", {
  vocabulary: [
    c("Line by line", "May I go through the bill with you line by line?", [
      "/laɪn baɪ laɪn/",
      "Rà từng dòng một",
      "📋",
    ]),
    c("Docket", "Every order has a docket we can check against the bill.", [
      "/ˈdɒkɪt/",
      "Phiếu gọi món chuyển cho bếp và quầy bar (captain order)",
      "🧾",
    ]),
    c("Charged in error", "The second coffee was charged in error, madam.", [
      "/tʃɑːdʒd ɪn ˈerə/",
      "Bị tính nhầm vào hoá đơn",
      "❌",
    ]),
    c("Split the bill", "Of course we can split the bill by seat or by amount.", [
      "/splɪt ðə bɪl/",
      "Tách hoá đơn — mỗi người trả phần của mình",
      "➗",
    ]),
  ],
  grammar: [
    g(
      "The computer added it, so it must be right.",
      "That line is the service charge, madam. May I go through the bill with you line by line?",
      "Gọi tên khoản phí, rồi mời rà cùng nhau 'line by line'. 'The computer' không phải một lời giải thích. Sau 'May I' là động từ nguyên mẫu.",
      "That line is the service charge, madam. May I going through the bill with you line by line?",
    ),
    g(
      "It says three beers here. You drank three beers.",
      "Let me check it against the dockets, sir. If it is our error, it comes off at once.",
      "Câu điều kiện 'If it is our error, it comes off' cam kết theo sự thật trên docket, không tranh cãi bằng trí nhớ. Chủ ngữ 'it' nên dùng 'comes'.",
      "Let me check it against the dockets, sir. If it is our error, it come off at once.",
    ),
  ],
  speaking: [
    also(
      sp(
        "This total cannot be right. We did not order all of this.",
        t3a,
        "Hạ giọng và đứng sát khách — chuyện tiền phải 'discreet'. Rồi mời rà cùng nhau, đối chiếu với 'dockets', không đối chiếu với trí nhớ.",
      ),
      [
        "Of course, madam. I will be discreet, and we can check the bill against the dockets, line by line.",
      ],
    ),
    sp(
      "There — a second half bottle of wine. We only had one.",
      t3b,
      "Kiểm tra trước, cam kết sau: món bị 'charged in error' thì được bỏ ra, rồi in lại hoá đơn sạch ('reprint').",
      undefined,
      undefined,
      t3a,
    ),
    also(
      sp(
        "So? Was it ours or not?",
        t3c,
        "Khi lỗi là của mình: nói thẳng 'charged in error', xin lỗi một lần, rồi việc đang làm. Không đổ cho máy.",
        undefined,
        undefined,
        t3b,
      ),
      ["It was charged in error, madam, and I am so sorry. The new bill is printing now."],
    ),
    also(
      sp(
        "We never ordered that second bottle. I am sure of it.",
        "May I show you the docket, sir? The second bottle is here, ordered after the main course.",
        "Khi khoản phí đúng: cho khách xem docket thật nhẹ nhàng. Không có giọng thắng cuộc — mục tiêu là giữ khách, không phải đúng.",
      ),
      [
        "May I show you the docket, sir? The second bottle is on it, ordered after the main course.",
      ],
    ),
    sp(
      "We are splitting it — she pays for hers, we pay for ours, on separate cards.",
      "Of course, sir. I will split the bill by seat and bring both bills in a moment.",
      "Tách hoá đơn là dịch vụ, không phải ân huệ: nhận lời ngay, nói cách tách ('by seat') và việc tiếp theo.",
    ),
    also(
      sp(
        "Can we pay on four different cards? There are four of us.",
        "Yes, madam. Our policy allows up to four cards on one bill, so I will split it now.",
        "Dùng lại khung của bài 2 (Our policy allows… up to…) cho một quyền lợi công khai. Con số do khách nêu, nên được nhắc lại.",
      ),
      ["Yes, madam. Our policy allows up to four cards on one bill, so I will split the bill now."],
    ),
  ],
  reading: read(
    `A QUESTION ABOUT THE BILL — TABLE PROCEDURE
Step close to the guest and lower your voice before any talk about the bill. A dispute across the room becomes every table's dinner story.
Check against the dockets, not against memory, yours or the guest's. The docket shows what was ordered, for which seat, and when.
If an item was charged in error, your supervisor signs the correction at once, and the bill is reprinted. The guest leaves with a clean bill, not a corrected one.
If the charge is right, show the docket gently: "The second bottle is here, ordered after the main course." Keep any triumph out of your voice. Being right is not the goal; keeping the guest is.
Splitting the bill is service, not a favour. Any table may split by seat or by amount. Confirm card or cash for each part before you print, so nobody waits twice.
Never guess, and never blame "the computer". A machine only prints what someone keyed in.`,
    [
      {
        q: "Trước khi trao đổi về hoá đơn, cần làm gì?",
        options: [
          "Mời khách ra quầy thu ngân để nói chuyện riêng",
          "Đứng sát khách và hạ giọng",
          "Đọc to từng dòng cho cả bàn cùng nghe rõ",
        ],
        correct: 1,
        explanation:
          "'Step close to the guest and lower your voice… A dispute across the room becomes every table's dinner story.'",
      },
      {
        q: "Đối chiếu hoá đơn dựa vào căn cứ nào?",
        options: [
          "Các docket",
          "Trí nhớ của người phục vụ phụ trách bàn đó",
          "Lời kể thành thật của khách ngồi tại bàn",
        ],
        correct: 0,
        explanation:
          "'Check against the dockets, not against memory, yours or the guest's.' Docket ghi món gì, cho ghế nào, lúc nào.",
      },
      {
        q: "Món bị tính nhầm thì xử lý thế nào?",
        options: [
          "Người phục vụ tự gạch tay trên hoá đơn cũ",
          "Đợi khách về rồi mới sửa lại trong hệ thống",
          "Giám sát ký sửa, in lại hoá đơn sạch",
        ],
        correct: 2,
        explanation:
          "'your supervisor signs the correction at once, and the bill is reprinted. The guest leaves with a clean bill, not a corrected one.'",
      },
    ],
  ),
  game: [
    round(
      "There is a bottle of wine on here that we never ordered. This is ridiculous.",
      "Let me check the docket now, sir. If it is our error, it comes off.",
      "Let me checking the docket now, sir. If it is our error, it come off.",
      "Somebody at your table may have ordered it, sir — perhaps while you were outside.",
      "'Let me checking… it come off' sai: sau 'let me' là động từ nguyên mẫu, và 'it comes'. Câu đoán người khác trong bàn đã gọi đúng ngữ pháp nhưng tranh cãi bằng phỏng đoán và đẩy lỗi sang khách. Đáp án kiểm tra docket trước.",
      2,
    ),
    round(
      "We are not paying this bill. The evening was a disaster from start to finish.",
      "I hear you, sir. My supervisor is coming now — please tell her everything.",
      "I hear you, sir. My supervisor coming now — please tell her everything.",
      "Then I will remove the service charge myself, sir — that seems the fairest ending.",
      "'My supervisor coming now' thiếu 'is'. Câu tự bỏ phí phục vụ đúng tiếng Anh nhưng là quyết định về tiền của giám sát, không phải của bạn. Đáp án lắng nghe và đưa đúng người có quyền tới.",
      0,
    ),
  ],
});

// ── Lesson 4 — the claim you must not settle ─────────────────────────────────
const t4a = "I am so sorry he is unwell, madam. May I call a doctor for him now?";
const t4b =
  "The manager on duty decides that, madam, and he is coming now. May I write down what happened?";
const t4c =
  "Thank you, madam. Since you mentioned the prawns, I will write them down with the time and the symptoms.";

const lesson4 = L(33, 4, "The Claim You Must Not Settle", "Khiếu nại bạn không được tự dàn xếp", {
  vocabulary: [
    c("Food poisoning claim", "A food poisoning claim always goes to the Duty Manager."),
    c("Symptoms", "Write down the symptoms in the guest's own words.", [
      "/ˈsɪmptəmz/",
      "Triệu chứng (khách tự kể)",
      "🤒",
    ]),
    c("Keep a sample", "Ask the chef which dishes the kitchen will keep a sample of.", [
      "/kiːp ə ˈsɑːmpl/",
      "Lưu mẫu món ăn để kiểm tra",
      "🧪",
    ]),
    c("Take it seriously", "We take it seriously the moment a guest feels unwell.", [
      "/teɪk ɪt ˈsɪəriəsli/",
      "Tiếp nhận một cách nghiêm túc",
      "🫡",
    ]),
  ],
  grammar: [
    g(
      "Our kitchen is very clean. It cannot be our food.",
      "I am sorry you are unwell, sir, and I am taking it seriously. My Duty Manager is coming now.",
      "Hiện tại tiếp diễn 'I am taking it seriously' — việc đang làm ngay lúc nói. Phủ nhận trước khi điều tra là câu đắt nhất một nhà hàng có thể nói.",
      "I am sorry you are unwell, sir, and I am take it seriously. My Duty Manager is coming now.",
    ),
    g(
      "Maybe it was the street food you ate this afternoon?",
      "I am not able to say what caused it, madam. May I call a doctor for you?",
      "Không chẩn đoán, không đổ cho bữa ăn nào: 'I am not able to say what caused it' (quá khứ, có -ed). Chuyển ngay sang một việc giúp được khách.",
      "I am not able to say what cause it, madam. May I call a doctor for you?",
    ),
  ],
  speaking: [
    risk(
      also(
        sp(
          "My husband has been sick all night, and the only thing he ate here was your seafood.",
          t4a,
          "Sức khoẻ trước: mời bác sĩ trước mọi việc khác. Không nhận, không chối nguyên nhân; quản lý trực được gọi ngay sau đó.",
        ),
        [
          "I am very sorry he is unwell, madam. May I call a doctor for him now?",
          "I am so sorry he is unwell, madam. Shall I call a doctor for him now?",
        ],
      ),
    ),
    also(
      sp(
        "I do not want a doctor. I want compensation, tonight.",
        t4b,
        "Bồi thường là quyết định của Duty Manager — nói rõ người đó đang tới. Việc bạn làm được ngay: ghi lại sự việc.",
        undefined,
        undefined,
        t4a,
      ),
      [
        "My Duty Manager decides that, madam, and he is coming now. May I write down what happened?",
        "That is for the manager on duty to decide, madam, and he is coming now. May I write down what happened?",
      ],
    ),
    also(
      sp(
        "Fine. Write it down. He ate the prawns at about eight.",
        t4c,
        "Khung tuần trước 'Since you mentioned' dùng lại ở đây: ghi đúng lời khách — món, giờ, 'symptoms'.",
        undefined,
        undefined,
        t4b,
      ),
      [
        "Thank you, madam. Since you mentioned the prawns, I will write them down with the symptoms and the time.",
      ],
    ),
    risk(
      also(
        sp(
          "Are you saying your food made me ill? Just admit it.",
          "I am not able to say what caused it, sir, but we take it seriously.",
          "Không nhận lỗi, không chối: bạn không thể nói điều gì đã 'caused it'. Vế sau cho khách thấy sự nghiêm túc ('take it seriously').",
        ),
        [
          "I am not able to say what caused it, sir, but we do take it seriously.",
          "I am not able to say what caused it, sir, but please know we take it seriously.",
        ],
      ),
    ),
    risk(
      also(
        sp(
          "A guest says our seafood made her sick. Should I offer her a free dinner?",
          "No offers on the floor. Write down what she ate, and call the manager on duty now.",
          "Nói với đồng nghiệp: không sir/madam. Một câu cấm, hai việc phải làm — ghi lại và gọi Duty Manager.",
          "colleague",
        ),
        [
          "No offers on the floor. Write down what she ate, and call the Duty Manager now.",
          "No offers on the floor. Call the manager on duty now, and write down what she ate.",
        ],
      ),
    ),
    sp(
      "What is this note about table twelve?",
      "It is a food poisoning claim. I wrote down the symptoms, and I asked the kitchen to keep a sample.",
      "Báo cáo lên cấp trên: gọi đúng tên sự việc ('food poisoning claim'), rồi những việc đã làm, bằng quá khứ đơn.",
      "manager",
    ),
  ],
  reading: read(
    `A GUEST REPORTS ILLNESS AFTER EATING — THE FLOOR'S PART
Do these things, in this order. Say you are sorry the guest is unwell; that is care, not blame. Offer medical help before anything else. Write down, in the guest's own words, what they ate, when they ate it, and when the symptoms began. Call the Duty Manager, the manager on duty, straight away.
Never, at any amount, admit the food caused it or deny it. Never name another meal as the cause. Never offer money, a free stay or a free dinner. A settlement offered on the floor is a fault admitted, and it is not yours to admit.
The kitchen keeps samples of what it serves. Which dishes, and for how long, is your own chef's answer. Your part is the guest's words on paper, with the time written on them.
Later, the restaurant manager replies to the guest, in person, by email or online, after the Duty Manager has handled the claim. That reply apologises for the experience and never names a cause.
However sure you are of tonight's kitchen, stay out of the argument. The guest needs a doctor and a decision-maker, and you can bring both.`,
    [
      {
        q: "Thứ tự đúng khi khách báo bị ốm sau bữa ăn là gì?",
        options: [
          "Kiểm tra lại với bếp, xin lỗi, rồi đề nghị một khoản bồi thường hợp lý",
          "Hỏi thăm, mời bác sĩ, ghi chép, báo Duty Manager",
          "Báo Duty Manager, đứng chờ chỉ đạo, rồi mới quay lại xin lỗi khách",
        ],
        correct: 1,
        explanation:
          "'Say you are sorry… Offer medical help before anything else. Write down… Call the Duty Manager straight away.'",
      },
      {
        q: "Vì sao người phục vụ không được đề nghị bồi thường?",
        options: [
          "Dàn xếp tại sảnh bị coi là nhận lỗi",
          "Vì mức bồi thường luôn do bếp trưởng quyết định",
          "Vì mọi khoản bồi thường phải chờ bảo hiểm duyệt trước",
        ],
        correct: 0,
        explanation:
          "'A settlement offered on the floor is a fault admitted, and it is not yours to admit.'",
      },
      {
        q: "Sau đó, ai trả lời khách, kể cả trả lời trên mạng?",
        options: [
          "Người phục vụ đã tiếp nhận khiếu nại tại bàn hôm đó",
          "Bếp trưởng, vì món ăn và mẫu lưu đều thuộc về bếp",
          "Quản lý nhà hàng, sau khi Duty Manager xử lý",
        ],
        correct: 2,
        explanation:
          "'the restaurant manager replies to the guest… after the Duty Manager has handled the claim. That reply apologises for the experience and never names a cause.'",
      },
    ],
  ),
  game: [
    round(
      "Your food made my wife sick. I want this dinner refunded right now.",
      "I am sorry she is unwell, sir. A doctor first, if she needs one — my Duty Manager is coming.",
      "I am sorry she is unwell, sir. A doctor first, if she need one — my Duty Manager coming.",
      "Of course, sir — the dinner is refunded, and we are so sorry about the food.",
      "'if she need… my Duty Manager coming' sai: 'she needs', và thiếu 'is'. Câu hoàn tiền ngay đúng tiếng Anh nhưng vừa nhận lỗi ('sorry about the food') vừa hứa tiền — cả hai đều không phải quyền của sảnh. Đáp án: sức khoẻ trước, người có quyền tới sau.",
      1,
    ),
    round(
      "Our kitchen passed its inspection this month. Can I tell the guest that?",
      "No. Do not argue about the cause — write down her words and call the Duty Manager.",
      "No. Do not arguing about the cause — write down her word and call the Duty Manager.",
      "Yes, tell her politely — it shows her it is very unlikely to be our food.",
      "'Do not arguing… her word' sai: sau 'do not' là động từ nguyên mẫu, và 'her words' số nhiều. Câu bảo nói chuyện kiểm định đúng ngữ pháp nhưng là chối nguyên nhân — sảnh không nhận cũng không chối. Đáp án: ghi lời khách, gọi Duty Manager.",
      0,
      "colleague",
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: xử lý khiếu nại theo bốn bước Listen – Apologise – Solve – Thank; nói rõ việc mình làm được ('Our policy allows…') và việc phải hỏi giám sát ('Let me check with my supervisor'); đối chiếu hoá đơn theo docket; và khi khách báo ốm sau bữa ăn thì mời bác sĩ, ghi lại, gọi Duty Manager — không nhận, không chối, không hứa tiền.",
};
