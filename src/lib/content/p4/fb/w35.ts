// FB week 35 — Negotiating (hand-authored Phase 4, see ../kit.ts).
//
// Light negotiation, with guests and inside the team: "However, what if we…?"
// and "in exchange for…". The floor never moves a price and never gives away
// money — a discount, a waived corkage fee or a drink on the house is the
// supervisor's or the manager's, asked for "on your behalf". What the floor
// CAN trade is what costs the house little and the guest a lot: the day, the
// sitting, a shorter menu, the room, a table at the bar after the kitchen
// closes — and, inside the team, a section, one quick dish after last orders,
// a set-up order that lets a table finish its coffee.
//
// Kept from the earlier week because the floor managers rated it: the price
// that stays while the variables move, corkage quoted before the cork moves,
// the regular thanked with attention, not a percentage. Fixed: no "set four
// courses", no request "put to" a manager, no "the stoves are down".
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

// ── Lesson 1 — trade, don't drop ─────────────────────────────────────────────
const t1a =
  "I understand, madam. What if we served the shorter set menu? The room and the service stay the same.";
const t1b = "In exchange for a confirmed booking today, I can ask my manager about welcome drinks.";
const t1c = "Then I will come back to you today with another option, madam.";

const lesson1 = L(35, 1, "Trade, Don't Drop", "Đổi, đừng bớt", {
  vocabulary: [
    c("In exchange for", "In exchange for an earlier start, I can ask about welcome drinks.", [
      "/ɪn ɪksˈtʃeɪndʒ fə/",
      "Để đổi lấy",
      "🔄",
    ]),
    c("What if", "What if we seat you at seven instead of eight?", [
      "/wɒt ɪf/",
      "Còn nếu… thì sao — mở một phương án mới",
      "💡",
    ]),
    c("However", "The price stays the same. However, the weekday menu is lighter on the bill.", [
      "/haʊˈevə/",
      "Tuy nhiên — bước ngoặt lịch sự trong câu",
      "↔️",
    ]),
    c("Meet in the middle", "Let us meet in the middle on the time, sir.", [
      "/miːt ɪn ðə ˈmɪdl/",
      "Gặp nhau ở giữa — mỗi bên nhường một phần",
      "⚖️",
    ]),
  ],
  grammar: [
    g(
      "No discount. This is the price.",
      "The price stays the same, sir. However, what if we looked at Tuesday instead?",
      "Giữ giá + 'However' + 'what if we…' — lời từ chối lập tức mở sang một phương án khác. 'The price' số ít nên 'stays'.",
      "The price stay the same, sir. However, what if we looked at Tuesday instead?",
    ),
    g(
      "You want cheap? Go somewhere cheap.",
      "What if we served four courses instead of five, madam? The room and the service stay the same.",
      "Đổi BIẾN SỐ thay vì đổi GIÁ: số món, ngày, giờ. Hai chủ ngữ nối bằng 'and' là số nhiều nên dùng 'stay', không thêm -s.",
      "What if we served four courses instead of five, madam? The room and the service stays the same.",
    ),
  ],
  speaking: [
    also(
      sp(
        "There are twelve of us, and honestly, your set menu is above our budget.",
        t1a,
        "Khung của tuần (What if we…): đổi thực đơn, không đổi giá. Câu sau nói rõ điều KHÔNG đổi để khách yên tâm.",
      ),
      [
        "I understand, madam. What if we served the shorter set menu? The room and the service would stay the same.",
      ],
    ),
    also(
      sp(
        "That helps. But can you add something for us? It is a big group.",
        t1b,
        "'In exchange for' nói rõ khách đưa gì (đặt chắc hôm nay) và nhà hàng có thể xem xét gì. Bạn xin quản lý, không tự hứa.",
        undefined,
        ["manager"],
        t1a,
      ),
      [
        "In exchange for a confirmed booking today, I can ask my manager about some welcome drinks.",
      ],
    ),
    sp(
      "And if your manager says no?",
      t1c,
      "Không hứa kết quả thay quản lý; hứa việc của mình — 'come back to you' với một phương án khác.",
      undefined,
      undefined,
      t1b,
    ),
    risk(
      also(
        sp(
          "Your competitor down the street quoted us twenty percent less for the same party.",
          "I cannot change the price, sir. However, I can ask my manager on your behalf.",
          "Giá không phải quyền của bạn: một câu nói rõ, rồi 'However' + việc bạn làm được. Không chê nhà hàng khác.",
          undefined,
          ["price", "manager"],
        ),
        [
          "I am not able to change the price, sir. However, I can ask my manager on your behalf.",
          "I cannot change the price, sir. However, I can ask my manager about it on your behalf.",
        ],
      ),
    ),
    sp(
      "Could we meet in the middle? Ten percent off, and we book today.",
      "I would like to meet in the middle, madam. However, discounts are my manager's decision, so may I ask her now?",
      "Đồng ý tinh thần ('meet in the middle'), nhưng phần trăm là quyền của quản lý — 'However' chuyển sang đúng người quyết.",
    ),
    sp(
      "The group wants welcome drinks. What are they offering in exchange?",
      "They will confirm the set menu today, in exchange for welcome drinks. Could you approve that?",
      "Báo cáo lên cấp trên: không sir/madam. Nói đủ hai phía của cuộc trao đổi, rồi xin quyết định.",
      "manager",
    ),
  ],
  reading: read(
    `NEGOTIATION AT A RESTAURANT — WHAT MOVES AND WHAT DOES NOT
The menu price does not move at the table. Group rates live with the manager, not with the floor.
What can move: the day of the week, the sitting time, the number of courses, and the room. The house can also add a welcome, but that needs your manager's yes.
Every "no" travels with a "what if". For example: "The terrace has a minimum spend on Saturdays. However, what if we held Sunday for you instead?"
Trade value for value, and name both sides aloud. The guest gives an earlier sitting, a weekday or a confirmed menu. The house gives the private room or welcome drinks. "In exchange for a confirmed booking today, I can ask my manager about welcome drinks."
Within your own authority, trade freely. Above it, say "I will ask my manager on your behalf" as an offer, not an escape. Then come back to the guest with an answer.
Never run down another restaurant's price. Talk about what this room gives, not what theirs lacks.
Write every agreed trade on the booking. A trade that lives only in a conversation dies at the next shift change.`,
    [
      {
        q: "Trong đàm phán ở nhà hàng, thứ gì KHÔNG dịch chuyển tại bàn?",
        options: [
          "Ngày và giờ ngồi của bàn tiệc",
          "Số món trong thực đơn của khách",
          "Giá niêm yết của thực đơn",
        ],
        correct: 2,
        explanation:
          "'The menu price does not move at the table. Group rates live with the manager, not with the floor.'",
      },
      {
        q: "Mỗi lời từ chối nên đi cùng điều gì?",
        options: [
          "Một phương án 'what if'",
          "Một lời xin lỗi thật dài và chân thành",
          "Một lời giải thích chi tiết về chính sách giá",
        ],
        correct: 0,
        explanation:
          "'Every no travels with a what if.' Lời từ chối mở ngay sang một phương án khác.",
      },
      {
        q: "Vì sao phải ghi mọi thoả thuận vào phiếu đặt chỗ?",
        options: [
          "Để quản lý tính thêm phí cho mỗi lần thay đổi",
          "Thoả thuận chỉ nói miệng sẽ mất khi đổi ca",
          "Vì khách thường quên những gì mình đã đồng ý",
        ],
        correct: 1,
        explanation: "'A trade that lives only in a conversation dies at the next shift change.'",
      },
    ],
  ),
  game: [
    round(
      "Nobody told us about a minimum spend for this room. We are not paying it.",
      "You are right to ask, sir. Let me bring my supervisor and the booking slip.",
      "You are right to ask, sir. Let me bringing my supervisor and the booking slip.",
      "Then I will take the difference off tonight, sir — it was our mistake not to mention it.",
      "'Let me bringing' sai: sau 'let me' là động từ nguyên mẫu. Câu tự bỏ phần chênh lệch đúng tiếng Anh nhưng là quyết định về tiền của giám sát, và còn nhận lỗi trước khi xem phiếu. Đáp án mời đúng người, kèm bằng chứng.",
      1,
    ),
    round(
      "Can we have the private room on Saturday for the weekday price?",
      "The Saturday price stays, madam. However, what if we looked at Thursday instead?",
      "The Saturday price stay, madam. However, what if we looked at Thursday instead?",
      "Saturday is our busiest night, madam, so the private room is not really for budget groups.",
      "'The Saturday price stay' thiếu -s ('stays'). Câu 'not really for budget groups' đúng ngữ pháp nhưng xúc phạm khách vì chuyện tiền. Đáp án giữ giá và đổi biến số: ngày.",
      0,
    ),
  ],
});

// ── Lesson 2 — the corkage conversation ──────────────────────────────────────
const t2a =
  "What a lovely bottle to open, madam. There is a corkage fee per bottle, and we will serve it beautifully.";
const t2b =
  "The fee covers the glasses and the service, madam. However, if you also order from our cellar, I can ask my supervisor about it.";
const t2c =
  "I cannot waive it, madam, but I will ask my supervisor now, before the cork comes out.";

const lesson2 = L(35, 2, "The Corkage Conversation", "Câu chuyện phí khui rượu", {
  vocabulary: [
    c("Waive", "Only the supervisor can waive the corkage fee.", [
      "/weɪv/",
      "Miễn (một khoản phí)",
      "✋",
    ]),
    c("Per bottle", "Corkage is charged per bottle, not per guest.", [
      "/pə ˈbɒtl/",
      "Tính trên mỗi chai",
      "🔢",
    ]),
    c("Cellar", "May I show you what our cellar has from the same region?", [
      "/ˈselə/",
      "Hầm rượu của nhà hàng",
      "🗄️",
    ]),
    c("Decant", "Shall we decant your bottle before the first course?", [
      "/dɪˈkænt/",
      "Chuyển rượu sang bình cho rượu thở",
      "🫗",
    ]),
  ],
  grammar: [
    g(
      "Outside wine not allowed. Hotel rule.",
      "Of course you may bring it, madam. There is a corkage fee per bottle, and we serve it as our own.",
      "Nói CÓ trước, điều kiện sau. 'There is a corkage fee' — một khoản phí, số ít, nên dùng 'is'.",
      "Of course you may bring it, madam. There are a corkage fee per bottle, and we serve it as our own.",
    ),
    g(
      "Why bring wine? Our wine not good enough?",
      "A bottle from your wedding year, how lovely, sir. Shall we decant it before the first course?",
      "Chai rượu khách mang theo thường có một câu chuyện — khen câu chuyện, rồi phục vụ chuẩn như rượu nhà. Sau 'Shall we' là động từ nguyên mẫu.",
      "A bottle from your wedding year, how lovely, sir. Shall we decanting it before the first course?",
    ),
  ],
  speaking: [
    also(
      sp(
        "We brought a bottle from the year we got married. Is that allowed?",
        t2a,
        "Khen câu chuyện của chai rượu trước, rồi nói phí bằng giọng dịch vụ: 'corkage fee per bottle'. Báo phí TRƯỚC khi mở nút.",
        undefined,
        ["corkage", "fee"],
      ),
      [
        "What a lovely bottle to open, madam. There is a corkage fee per bottle, and we will serve it with care.",
      ],
    ),
    sp(
      "Corkage? Seriously? At these prices you should open it for free.",
      t2b,
      "Giải thích phí bằng những thứ khách nhìn thấy (ly, phục vụ), rồi 'However' mở một cuộc đổi: gọi thêm rượu hầm, bạn hỏi giám sát.",
      undefined,
      ["cellar", "supervisor"],
      t2a,
    ),
    risk(
      also(
        sp(
          "So you might waive it? Just say yes.",
          t2c,
          "Miễn phí là quyền của giám sát: bạn không nói 'yes'. Hứa việc của mình — hỏi ngay, trước khi mở nút chai.",
          undefined,
          ["supervisor"],
          t2b,
        ),
        [
          "I am not able to waive it, madam, but I will ask my supervisor now, before the cork comes out.",
          "I cannot waive it, madam, but I will ask my supervisor before the cork comes out.",
        ],
      ),
    ),
    also(
      sp(
        "Should we open our red now? It is quite old.",
        "Shall we decant it first, sir? An older wine often needs a little air before the first glass.",
        "Gợi ý bằng một câu hỏi với 'decant', rồi một lý do ngắn. Không bình luận về chất lượng chai rượu của khách.",
      ),
      ["Shall we decant it first, sir? An older wine often needs some air before the first glass."],
    ),
    sp(
      "We have three bottles with us. How much is corkage for all of them?",
      "Corkage is charged per bottle, madam, so I will show you the fee for three on the wine list.",
      "Nói cách tính ('per bottle'), rồi chỉ trên danh sách — không đọc to con số trước bàn.",
    ),
    sp(
      "Your wine list is expensive. Why should we buy from your cellar?",
      "Our cellar has wines you will not find in the shops, sir, and our sommelier can match one to your dinner.",
      "Bán bằng giá trị, không bằng áp lực: điều đặc biệt của 'cellar', và một người giúp khách chọn.",
    ),
  ],
  reading: read(
    `OUTSIDE BOTTLES — THE HOUSE POSITION
In this restaurant, yes is the first word: a guest's own bottle is welcome. The corkage fee is charged per bottle and quoted before the cork moves, never after.
Say what the fee buys: proper glasses, ice or decanting, service through the meal, and the cellar's care if the bottle must wait. A named service is easier to accept than a bare number.
When a guest asks for the fee to be waived, the floor does not waive. That trade belongs to the supervisor. It usually travels with something in exchange, such as a bottle from our cellar ordered beside the guest's own.
Never taste, judge or comment on the guest's bottle beyond service questions. If it turns out corked or tired, tell the host quietly and offer the cellar. The bad news belongs to the wine, not to their choice.
An older red may need decanting. Ask first: "Shall we decant it before the first course?"
Whether outside bottles are welcome at all, the fee, the limit per table, and what may be traded are one restaurant's answers. Ask your own manager for yours.`,
    [
      {
        q: "Phí corkage được báo cho khách vào lúc nào?",
        options: [
          "Sau khi bữa ăn đã kết thúc",
          "Trước khi mở nút chai",
          "Chỉ khi khách tự hỏi tới phí",
        ],
        correct: 1,
        explanation:
          "'quoted before the cork moves, never after' — khách không bị bất ngờ ở hoá đơn.",
      },
      {
        q: "Ai có quyền miễn phí corkage, và thường thế nào?",
        options: [
          "Giám sát, thường kèm một điều kiện trao đổi",
          "Người phục vụ, nếu khách là khách quen của quán",
          "Không ai cả, vì khoản phí này không bao giờ được miễn",
        ],
        correct: 0,
        explanation:
          "'the floor does not waive. That trade belongs to the supervisor. It usually travels with something in exchange.'",
      },
      {
        q: "Chai rượu của khách bị hỏng mùi, người phục vụ làm gì?",
        options: [
          "Nói to cho cả bàn biết để khách không uống phải",
          "Mở luôn một chai của nhà hàng và tính vào hoá đơn",
          "Báo nhỏ với chủ bàn và mời chọn rượu của hầm",
        ],
        correct: 2,
        explanation:
          "'tell the host quietly and offer the cellar. The bad news belongs to the wine, not to their choice.'",
      },
    ],
  ),
  game: [
    round(
      "We are regulars here. Surely you can skip the corkage fee for us tonight?",
      "That is my supervisor's decision, sir. Shall I ask her while the bottle chills?",
      "That is my supervisor decision, sir. Shall I ask her while the bottle chill?",
      "For regulars, of course, sir — I will quietly leave it off the bill tonight.",
      "'my supervisor decision… the bottle chill' sai: cần sở hữu cách 'supervisor's' và 'chills' có -s. Câu 'I will quietly leave it off the bill' đúng tiếng Anh nhưng tự miễn phí — quyền của giám sát, và 'quietly' biến nó thành bí mật với chính nhà hàng. Đáp án hỏi đúng người.",
      2,
    ),
    round(
      "How much do you charge to open our wine? We have two bottles.",
      "Corkage is charged per bottle, madam. May I show you the fee on the list?",
      "Corkage is charge per bottle, madam. May I show you the fee on the list?",
      "It depends on how expensive your bottles are, madam. Let me have a look at them first.",
      "'is charge' sai: bị động cần quá khứ phân từ 'charged'. Câu 'It depends on how expensive your bottles are' đúng ngữ pháp nhưng sai sự thật (phí tính theo chai) và soi giá chai của khách. Đáp án nói cách tính và chỉ trên danh sách.",
      1,
    ),
  ],
});

// ── Lesson 3 — last orders and the table that stays ──────────────────────────
const t3a =
  "The table is yours, sir. The kitchen will wind down soon, so may I bring anything else first?";
const t3b = "Let me ask the pastry team now, sir, and I will come back to you in a moment.";
const t3c =
  "You can carry on at the bar, sir, because it stays open later. Shall I keep a table for a nightcap?";

const lesson3 = L(
  35,
  3,
  "Last Orders and the Table That Stays",
  "Giờ gọi món cuối và bàn khách nán lại",
  {
    vocabulary: [
      c("Wind down", "The kitchen starts to wind down after ten.", [
        "/waɪnd daʊn/",
        "Thu dần về cuối buổi",
        "🌙",
      ]),
      c("Linger", "Guests may linger over coffee after the kitchen closes.", [
        "/ˈlɪŋɡə/",
        "Nán lại thong thả",
        "🕯️",
      ]),
      c("Nightcap", "May I offer you a nightcap at the bar, madam?", [
        "/ˈnaɪtkæp/",
        "Ly cuối ngày trước khi về",
        "🍸",
      ]),
      c("Carry on", "The evening can carry on at the bar after the dining room closes.", [
        "/ˈkæri ɒn/",
        "Tiếp tục",
        "➡️",
      ]),
    ],
    grammar: [
      g(
        "Kitchen closed. You must order now or never.",
        "The kitchen takes its last orders in ten minutes, sir. May I bring anything before it closes?",
        "Thời hạn nêu MỘT lần, kèm một lời mời. 'The kitchen' số ít nên 'takes'.",
        "The kitchen take its last orders in ten minutes, sir. May I bring anything before it closes?",
      ),
      g(
        "We are closing. Please pay and go home.",
        "Please take your time, madam. However, the bar carries on later, if you would like a nightcap.",
        "Không đuổi khách: mở một cánh cửa khác bằng 'However'. Khách rời bàn nhưng buổi tối vẫn tiếp tục. 'The bar' số ít nên 'carries'.",
        "Please take your time, madam. However, the bar carry on later, if you would like a nightcap.",
      ),
    ],
    speaking: [
      also(
        sp(
          "I know you are closing, but we are in the middle of a birthday here.",
          t3a,
          "Hai sự thật trong một lượt: bàn vẫn là của khách, bếp sắp nghỉ ('wind down'). Vế sau là lời mời, không phải tối hậu thư.",
        ),
        [
          "The table is yours, sir. The kitchen will wind down soon, so may I bring you anything else first?",
        ],
      ),
      sp(
        "One more dessert each, then. Can the kitchen still do it?",
        t3b,
        "Không hứa thay bếp bánh: hỏi trước, rồi 'come back to you'. Khách thấy bạn đang lo việc cho họ.",
        undefined,
        undefined,
        t3a,
      ),
      also(
        sp(
          "Thank you. And after dessert, where can we carry on?",
          t3c,
          "Chuyển buổi tối sang quầy bar ('carry on at the bar'), không đẩy khách ra cửa. Lời mời kết thúc bằng câu hỏi.",
          undefined,
          undefined,
          t3b,
        ),
        [
          "You can carry on at the bar, sir, as it stays open later. Shall I keep a table for a nightcap?",
        ],
      ),
      also(
        sp(
          "We are closing the kitchen. Table five wants two more mains, and the answer is no.",
          "What if table five takes one quick dish, in exchange for this being their very last order?",
          "Thương lượng nội bộ với bếp: không sir/madam. Khung What if + in exchange for: đề nghị một việc nhỏ, đổi lại một cam kết rõ.",
          "colleague",
        ),
        [
          "What if table five has one quick dish, in exchange for this being their very last order?",
        ],
      ),
      sp(
        "Are you trying to get rid of us? The waiters keep circling our table.",
        "Not at all, madam. Please linger as long as you like. May I bring more coffee while you talk?",
        "Trấn an ngay ('Not at all'), mời khách 'linger', rồi một việc phục vụ cụ thể. Không giải thích chuyện dọn phòng.",
      ),
      sp(
        "Table nine is still here, and breakfast set-up starts soon.",
        "What if we set up the other side of the room first? They are finishing coffee, and I will tell you when they move.",
        "Nói với quản lý: không sir/madam. Đề nghị một cách làm không vội khách; việc mời khách rời bàn là quyết định của quản lý.",
        "manager",
      ),
    ],
    reading: read(
      `CLOSING TIME — MOVING THE EVENING, NOT THE GUEST
Last orders are offered once, at the table, quietly, with an offer attached: "The kitchen takes its last orders in ten minutes. May I bring anything else?" They are never called across the room.
After the kitchen winds down, coffee, tea and the pastry counter carry on, and the bar stays open later than the dining room. A guest in the middle of a celebration is offered the bridge, not the door: "You can carry on at the bar. Shall I keep a table for a nightcap?"
The bill is never brought unasked to hurry a table. Lights stay up, music stays on, and chairs stay down while any guest is seated. Packing the room away around a guest says "please leave", and nobody on the team may say that.
Sometimes the kitchen is closing and a table wants more. Negotiate, do not argue: "What if they take one quick dish, in exchange for this being their last order?"
If one table really blocks tomorrow's set-up, the supervisor decides and the supervisor speaks. The floor never hurries a guest on its own. Hours differ by season and by hotel, so learn your own room's clock in your first week.`,
      [
        {
          q: "Lượt gọi món cuối được thông báo như thế nào?",
          options: [
            "Nhiều lần để chắc chắn mọi khách đều nghe thấy",
            "Một lần, tại bàn, kèm một lời mời",
            "Qua loa chung của phòng ăn cho nhanh gọn",
          ],
          correct: 1,
          explanation:
            "'Last orders are offered once, at the table, quietly, with an offer attached… never called across the room.'",
        },
        {
          q: "Điều gì bị cấm khi khách vẫn còn ngồi tại bàn?",
          options: [
            "Xếp ghế, tắt nhạc, dọn phòng quanh khách",
            "Mời khách chuyển sang quầy bar để tiếp tục",
            "Mang thêm cà phê và tráng miệng cho khách",
          ],
          correct: 0,
          explanation:
            "'Lights stay up, music stays on, and chairs stay down while any guest is seated. Packing the room away around a guest says please leave.'",
        },
        {
          q: "Một bàn ngồi lâu làm chậm việc set-up sáng mai. Ai quyết?",
          options: [
            "Người phục vụ bàn đó tự mời khách về",
            "Bếp trưởng, vì bếp cần dọn dẹp sớm",
            "Giám sát quyết và giám sát nói với khách",
          ],
          correct: 2,
          explanation:
            "'the supervisor decides and the supervisor speaks. The floor never hurries a guest on its own.'",
        },
      ],
    ),
    game: [
      round(
        "Are you closing? Should we ask for the bill now?",
        "Please take your time, sir. The bill comes only when you ask for it.",
        "Please take your time, sir. The bill come only when you ask for it.",
        "Yes, sir, that would be very helpful, because the team would like to go home soon.",
        "'The bill come' thiếu -s ('comes'). Câu 'the team would like to go home soon' đúng tiếng Anh nhưng đẩy khách đi vì tiện cho nhân viên. Đáp án: hoá đơn chỉ tới khi khách gọi.",
        0,
      ),
      round(
        "Last orders were ten minutes ago. Tell table six the kitchen is closed.",
        "What if they have one quick dish, in exchange for this being their last order?",
        "What if they has one quick dish, in exchange of this being their last order?",
        "Then you tell them yourself, because I am not going to be the one who says no.",
        "'they has… in exchange of' sai: 'they have', và cụm cố định là 'in exchange for'. Câu 'you tell them yourself' đúng ngữ pháp nhưng đẩy việc và gây căng thẳng trong ca. Đáp án thương lượng một giải pháp hai bên cùng chấp nhận.",
        2,
        "colleague",
      ),
    ],
  },
);

// ── Lesson 4 — the regular, and trading inside the team ─────────────────────
const t4a =
  "Your loyalty is worth more than that to us, sir. A discount is my manager's decision, so I will ask her on your behalf.";
const t4b =
  "Tonight you have your usual table, sir, and I will ask the chef to say hello — a small gesture of thanks.";
const t4c = "I will give her your request tonight, sir, and ask her to come back to you tomorrow.";

const lesson4 = L(
  35,
  4,
  "The Regular, and Trading Inside the Team",
  "Khách quen, và trao đổi trong nhóm",
  {
    vocabulary: [
      c("Regular", "Mr. Costa is a regular, so he likes his usual table.", [
        "/ˈreɡjələ/",
        "Khách quen",
        "🙋",
      ]),
      c("Loyalty", "Loyalty earns attention, not a percentage.", [
        "/ˈlɔɪəlti/",
        "Sự gắn bó của khách quen",
        "🤍",
      ]),
      c("Gesture", "A small gesture from the kitchen says more than a discount.", [
        "/ˈdʒestʃə/",
        "Một cử chỉ thiện chí nhỏ",
        "🌼",
      ]),
      c("Trade", "What if we trade sections tonight?", [
        "/treɪd/",
        "Đổi cho nhau — mỗi bên nhường một thứ",
        "🔃",
      ]),
      c("Section", "Tonight my section is the terrace.", [
        "/ˈsekʃn/",
        "Khu vực bàn được phân công phục vụ",
        "🗺️",
      ]),
    ],
    grammar: [
      g(
        "Discount? No. Manager decide, not me.",
        "That is my manager's decision, sir, but I can ask her tonight on your behalf.",
        "Sở hữu cách 'my manager's decision' chỉ đúng người có quyền; bạn làm người chuyển lời ('on your behalf'). Sau 'can' là động từ nguyên mẫu.",
        "That is my manager's decision, sir, but I can asking her tonight on your behalf.",
      ),
      g(
        "You come often but you also eat a lot, sir.",
        "Your visits mean a lot to us, sir. Loyalty here earns the best table and the chef's hello.",
        "Nhà hàng trả ơn khách quen bằng sự chăm chút, không bằng phần trăm. 'Your visits' số nhiều nên 'mean', không thêm -s.",
        "Your visits means a lot to us, sir. Loyalty here earns the best table and the chef's hello.",
      ),
    ],
    speaking: [
      also(
        sp(
          "Fourth time this month. That has to be worth ten percent off, no?",
          t4a,
          "Vế đầu nâng giá trị của khách ('loyalty'), vế sau chỉ đúng người có quyền và bạn chuyển lời. Đọc với nụ cười — đây là lời khen, không phải né tránh.",
          undefined,
          ["manager"],
        ),
        [
          "Your loyalty is worth more than that to us, sir. A discount is my manager's decision, so I will ask her for you.",
        ],
      ),
      sp(
        "And until then? Nothing for a regular?",
        t4b,
        "Đáp ơn bằng điều sảnh tự làm được: bàn quen, lời chào của bếp — một 'gesture' nhỏ. Không thêm món miễn phí.",
        undefined,
        undefined,
        t4a,
      ),
      also(
        sp(
          "That is kind. And will your manager really call me?",
          t4c,
          "Không hứa thay quản lý; hứa việc của mình — chuyển yêu cầu tối nay và nhờ quản lý 'come back to you'.",
          undefined,
          undefined,
          t4b,
        ),
        ["I will pass your request to her tonight, sir, and ask her to come back to you tomorrow."],
      ),
      risk(
        also(
          sp(
            "The place around the corner gives regulars a free drink on every visit.",
            "A drink on the house needs approval from my manager, sir, so may I ask her for you?",
            "So sánh với quán khác không cần phản bác. Món tặng là quyết định về tiền — cần 'approval', bạn xin đi hỏi.",
            undefined,
            ["house", "approval", "manager"],
          ),
          [
            "A drink on the house needs approval from my manager, sir. May I ask her for you?",
            "A drink on the house needs approval from my manager, sir, so shall I ask her for you?",
          ],
        ),
      ),
      also(
        sp(
          "Mr. Costa always asks for you, but tonight he is sitting in my area.",
          "What if we trade sections tonight? You take my terrace, and in exchange I serve your regular.",
          "Thương lượng với đồng nghiệp: không sir/madam. Khung What if we trade + in exchange: đổi công bằng, không nhờ vả một chiều.",
          "colleague",
        ),
        [
          "What if we trade sections tonight? You take the terrace, and in exchange I serve your regular.",
        ],
      ),
      sp(
        "Who is covering the terrace tonight? It was yours on the plan.",
        "My colleague has the terrace section, after our trade. I am serving our regular inside, if that is all right.",
        "Báo cáo lên quản lý: không sir/madam. Nói rõ ai làm gì sau khi đổi, và xin quản lý đồng ý — đổi khu vực vẫn cần cấp trên biết.",
        "manager",
      ),
    ],
    reading: read(
      `THE REGULAR AND THE PRICE — AND THE TEAM BEHIND THEM
A regular is a guest who chose us twice, and then again. The thank-you is service before it is money. It is the remembered table, the preference card read before the shift, and the chef who comes out to say hello.
What the floor gives a regular: attention, memory, and the better table when there is one to give. What the floor never gives: a price. A standing discount, a birthday percentage or a free drink is the manager's, in writing, on the guest's profile.
When a regular asks directly, name the right person and carry the request the same night. Say: "I will ask my manager on your behalf, and ask her to come back to you." The regular hears an honest next step, not a wall.
Regulars often ask for one server. Teams can trade to make that happen. "What if we trade sections tonight? You take my terrace, and in exchange I serve your regular." Then tell the supervisor before service, because the floor plan is the supervisor's.
Here is a warning from every long bar in this business. When a regular says the hotel owes them a favour, the person who promised it has often left. Write things down.`,
      [
        {
          q: "Sảnh nhà hàng trả ơn khách quen bằng gì?",
          options: [
            "Phần trăm giảm giá cố định ghi trong hồ sơ khách",
            "Đồ uống miễn phí mỗi lần khách ghé nhà hàng",
            "Sự chăm chút — bàn quen, trí nhớ, lời chào từ bếp",
          ],
          correct: 2,
          explanation:
            "'The thank-you is service before it is money… What the floor never gives: a price.'",
        },
        {
          q: "Hai nhân viên đổi khu vực phục vụ để khách quen có người quen phục vụ. Phải làm gì nữa?",
          options: [
            "Báo giám sát trước giờ phục vụ",
            "Không cần làm gì vì đổi trong nhóm là chuyện riêng",
            "Ghi vào hồ sơ khách quen để lần sau tự đổi",
          ],
          correct: 0,
          explanation:
            "'Then tell the supervisor before service, because the floor plan is the supervisor's.'",
        },
        {
          q: "Vì sao phải ghi lại mọi điều đã hứa với khách quen?",
          options: [
            "Để tính thêm phí cho các yêu cầu đặc biệt",
            "Người hứa có thể đã nghỉ việc",
            "Vì khách quen thường nhớ sai những gì được hứa",
          ],
          correct: 1,
          explanation:
            "'When a regular says the hotel owes them a favour, the person who promised it has often left. Write things down.'",
        },
      ],
    ),
    game: [
      round(
        "We have spent a fortune here this year. One free bottle of wine is all I am asking.",
        "You are the guest every room wants, sir. The bottle is my manager's decision, so I will ask her tonight.",
        "You are the guest every room wants, sir. The bottle is my manager decision, so I will asking her tonight.",
        "One bottle, sir, but please keep it between us, or every table here will want the same.",
        "'my manager decision… I will asking' sai: cần 'manager's' và sau 'will' là động từ nguyên mẫu. Câu 'keep it between us' đúng ngữ pháp nhưng tặng thứ không thuộc quyền mình và biến nó thành bí mật. Đáp án cảm ơn khách và chuyển yêu cầu đúng người.",
        0,
      ),
      round(
        "Can you take my break at eight? I will take yours at nine.",
        "What if we trade at half past eight instead? The terrace is busiest at eight.",
        "What if we trades at half past eight instead? The terrace is busiest at eight.",
        "No, eight is not good for me, and you should have asked the supervisor anyway.",
        "'we trades' sai: chủ ngữ 'we' không thêm -s. Câu 'you should have asked the supervisor anyway' đúng tiếng Anh nhưng từ chối cụt và trách đồng nghiệp. Đáp án mở một phương án ở giữa bằng 'What if'.",
        1,
        "colleague",
      ),
    ],
  },
);

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: thương lượng nhẹ với khách và đồng nghiệp bằng 'However, what if we…?' và 'in exchange for…' — đổi ngày, giờ, thực đơn, khu vực, không đổi giá; báo phí corkage trước khi mở chai; và chuyển mọi yêu cầu giảm giá, miễn phí hay món tặng tới đúng người có quyền ('I will ask my manager on your behalf').",
};
