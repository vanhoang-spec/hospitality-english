// FO week 34 — special occasions and surprises, across departments (see ../kit.ts).
//
//  · Ask once, with a way out ("a celebration, or a quiet few days?"), and
//    ask WHO KNOWS before anything is arranged. "Nothing special" is noted
//    nowhere and never raised again.
//  · The desk may give a handwritten card on its own. Anything with a price
//    is quoted first — food and drink prices are before service and tax, so the TOTAL is said —
//    and anything free of charge is the Duty Manager's to give.
//  · Allergies are asked before any cake, fruit, chocolate or flowers. No
//    candles in rooms: LED candles instead. A one-day item is never promised
//    for the same evening.
//  · Every step goes to a NAMED person in each team, with a trigger, and the
//    desk chases it up itself.
//  · Formal wishes are said quietly, "On behalf of…". When the surprise goes
//    wrong the desk owns the mistake, moves the moment, and asks the Duty
//    Manager to remove the charge — it does not remove it, or offer money.
import { game, g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("FO");
const L = lessonsFor("FO");

const t1a =
  "Congratulations to you both, madam. May I help to make the occasion special this evening?";
const t1b =
  "Then we will keep it quiet, madam. Nobody at the desk will mention it in front of him.";
const t1c =
  "A handwritten card from the hotel tonight, madam, and I can show you the cake menu with prices.";

const t2a =
  "Quite a lot, madam. The pastry chef can make a small cake at short notice, and I can add a handwritten card.";
const t2b = "Of course, madam. Before I call the pastry chef, is anyone allergic to anything?";
const t2c =
  "Not quite, madam. That price is before service charge and tax, so let me quote the total.";

const t3a =
  "It will, sir. Housekeeping sets the room when you leave for dinner, and I will chase up the pastry chef myself.";
const t3b =
  "The pastry chef keeps it cold until you leave the restaurant, sir. That is the trigger for bringing it up.";
const t3c = "It is a pleasure, sir. On behalf of all of us, I hope you have a wonderful evening.";

const t4a =
  "That is our mistake, sir, and I am very sorry. We spoiled the moment, and I would like to make it right.";
const t4b =
  "May I move the cake to tomorrow night, sir, so there is still a moment she does not expect?";
const t4c =
  "I will tell the whole team in writing, sir, and I will check it myself before she comes down.";

export const week: AuthoredWeek = {
  canDo:
    "Nói được: hỏi khéo xem chuyến đi có phải dịp đặc biệt và ai đã biết, hỏi dị ứng và báo giá trước khi đặt bánh, bàn giao cho đúng người có tên ở từng bộ phận, chúc mừng trang trọng, và nhận lỗi khi điều bất ngờ hỏng.",
  lessons: [
    L(34, 1, "Finding Out Without Prying", "Biết được mà không tọc mạch", {
      vocabulary: [
        c("Celebration", "Is this trip a celebration, or a quiet few days away?", [
          "/ˌselɪˈbreɪʃn/",
          "Dịp ăn mừng",
          "🎉",
        ]),
        c("Occasion", "If it is a special occasion, the desk can help.", [
          "/əˈkeɪʒn/",
          "Dịp đặc biệt",
          "🎊",
        ]),
        c("Keep it quiet", "We will keep it quiet until the moment, sir.", [
          "/kiːp ɪt ˈkwaɪət/",
          "Giữ kín, không nói ra",
          "🤫",
        ]),
        c("In on it", "Is your wife in on it, or is it a surprise?", [
          "/ɪn ɒn ɪt/",
          "Biết trước chuyện bất ngờ",
          "🙊",
        ]),
      ],
      grammar: [
        g(
          "Why are you here? Honeymoon?",
          "Is this trip a celebration, madam, or a quiet few days away?",
          "Cho khách hai lối trả lời, một lối là 'không có gì đặc biệt'. 'celebration' là danh từ, đứng sau 'a'.",
          "Is this trip a celebrate, madam, or a quiet few days away?",
        ),
        g(
          "Does she know about the cake?",
          "May I ask, sir — is she in on it, or is it a surprise?",
          "Hỏi ai đã biết TRƯỚC khi sắp xếp: một lời chúc sai chỗ phá hỏng cả điều bất ngờ. Sau 'May I' là động từ nguyên thể.",
          "May I asking, sir — is she in on it, or is it a surprise?",
        ),
      ],
      speaking: [
        {
          ...sp(
            "It is our thirtieth anniversary, actually. We came here on our honeymoon.",
            t1a,
            "Chúc mừng cả hai người trước, rồi hỏi xin phép giúp — chưa hứa gì, chưa đặt gì.",
          ),
          alsoAccept: [
            "Congratulations to you both, madam. May I help make the occasion special this evening?",
            "Congratulations to you both, madam. Could I help to make the occasion special this evening?",
          ],
        },
        sp(
          "That is kind. My husband does not know I told you.",
          t1b,
          "Người tổ chức đã nói ai chưa biết: hứa giữ kín bằng 'keep it quiet', và nói rõ cả quầy sẽ không nhắc tới.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Lovely. What could you arrange?",
          t1c,
          "Một thứ quầy tự làm được (thiệp viết tay), và một thứ có giá — đưa thực đơn có giá, không hứa miễn phí.",
          undefined,
          undefined,
          t1b,
        ),
        {
          ...sp(
            "We are just here to rest. Nothing special.",
            "Of course, sir. Then I hope you have a very peaceful few days with us.",
            "Khách nói không có dịp gì: nhận lời ngay, chúc nhẹ, và không hỏi lại lần nào nữa.",
          ),
          alsoAccept: ["Of course, sir. I hope you have a very peaceful few days with us."],
        },
        risk({
          ...sp(
            "It is our honeymoon. The hotel gives a free cake, yes?",
            "I cannot offer it free of charge, madam, but I will ask my Duty Manager now.",
            "Câu phải đúng của tuần: món có giá trị tiền mà miễn phí là quyền của Duty Manager. Quầy hỏi, không hứa.",
            undefined,
            ["offer", "free", "charge", "duty", "manager"],
          ),
          alsoAccept: [
            "I am not able to offer it free of charge, madam, but I will ask my Duty Manager now.",
            "I cannot offer a cake free of charge, madam. May I ask my Duty Manager?",
            "I cannot offer it free of charge, madam, but I will ask the manager on duty now.",
          ],
        }),
        sp(
          "The couple in the lobby have flowers and a gift box. Should I congratulate them?",
          "Not yet. Ask once if it is a celebration, and find out who is in on it first.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Hai bước trước khi chúc: hỏi một lần, rồi hỏi ai đã biết.",
          "colleague",
        ),
        sp(
          "It is my mother's seventieth birthday. I want it to be a surprise.",
          "How lovely, sir. Shall we keep it quiet until dinner, so the moment is hers?",
          "Hỏi lại kế hoạch bằng 'Shall we' — khách tổ chức là người quyết thời điểm.",
        ),
      ],
      reading: read(
        `SPOTTING AN OCCASION — FRONT DESK
Ask once, at check-in, with a way out: "Is this trip a celebration, or a quiet few days away?"
Signs worth noticing: flowers or a gift box in the luggage, a cake ordered to the room, a booking note that says "quiet table".
Before you arrange anything, ask WHO KNOWS. A surprise announced by a receptionist is not a surprise any more.
Never assume the relationship. "Congratulations to you both" works for a couple, a mother and daughter, or two colleagues.
If the guest says it is nothing special, write NOTHING in the profile and never raise it again.
The desk may offer a handwritten card on its own.
Anything that has a price, such as a cake or wine, is quoted first. Giving it free is the Duty Manager's decision.`,
        [
          {
            q: "Vì sao phải hỏi ai đã biết trước khi sắp xếp?",
            options: [
              "Vì bếp cần biết đúng tên người nhận để viết lên bánh cho chính xác",
              "Vì điều bất ngờ bị lễ tân nói ra thì không còn là bất ngờ",
              "Vì chính sách yêu cầu hai chữ ký",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "A surprise announced by a receptionist is not a surprise any more."',
          },
          {
            q: "Khách nói chuyến đi không có dịp gì đặc biệt thì làm gì?",
            options: [
              "Không ghi gì vào hồ sơ, và không nhắc lại",
              "Ghi chú là khách đã từ chối, rồi hỏi lại vào hôm sau",
              "Vẫn chuẩn bị một món quà nhỏ bất ngờ trong phòng",
            ],
            correct: 0,
            explanation: 'Tài liệu ghi "write NOTHING in the profile and never raise it again".',
          },
          {
            q: "Lễ tân tự đề nghị được món gì mà không cần hỏi ai?",
            options: [
              "Một chiếc bánh kem nhỏ từ bếp bánh",
              "Một tấm thiệp viết tay",
              "Một chai rượu vang",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "The desk may offer a handwritten card on its own" — món có giá thì báo giá trước, còn tặng miễn phí do Duty Manager quyết.',
          },
        ],
      ),
      game: [
        game(
          "It is my wife's birthday tomorrow, but please do not tell her I said so.",
          "Of course, sir. We will keep it quiet, and nobody will mention it at the desk.",
          "Of course, sir. We will keep it quietly, and nobody will mention it at the desk.",
          "Wonderful, sir! We will greet her with a birthday cake the moment she arrives.",
          undefined,
          "'keep it quiet' giữ tính từ 'quiet', không dùng trạng từ 'quietly'. Câu chào đón bằng bánh ngay khi tới đúng tiếng Anh nhưng phá đúng điều khách vừa xin giữ kín.",
        ),
        game(
          "Why do you ask if this trip is special?",
          "Only so we can help if it is a celebration, madam. If not, I will not ask again.",
          "Only so we can help if it is a celebration, madam. If not, I will not asking again.",
          "We ask every couple, madam. Most of our guests are here on their honeymoon.",
          undefined,
          "Sau 'will not' là động từ nguyên thể 'ask'. Câu 'Most of our guests are here on their honeymoon' đúng ngữ pháp nhưng đoán quan hệ của khách — đúng điều tài liệu cấm.",
        ),
      ],
    }),

    L(
      34,
      2,
      "What the Desk Can Arrange — and What It Costs",
      "Quầy sắp xếp được gì, và giá bao nhiêu",
      {
        vocabulary: [
          c("Handwritten card", "A handwritten card costs nothing and is remembered longest."),
          c("At short notice", "The pastry chef can make a small cake at short notice.", [
            "/ət ʃɔːt ˈnəʊtɪs/",
            "Gấp, chỉ được báo trước rất ít",
            "⏰",
          ]),
          c("Lead time", "Balloons and a photographer need a day's lead time.", [
            "/liːd taɪm/",
            "Thời gian cần báo trước",
            "⏳",
          ]),
          c("Allergic", "Is anyone allergic to nuts, chocolate or flowers?", [
            "/əˈlɜːdʒɪk/",
            "Bị dị ứng",
            "⚠️",
          ]),
          c("Quote the total", "Quote the total, with service charge and tax, before you order.", [
            "/kwəʊt ðə ˈtəʊtl/",
            "Báo tổng số tiền",
            "🧮",
          ]),
        ],
        grammar: [
          g(
            "Too late, you should have told us before.",
            "The pastry chef can still make a small cake at short notice, sir. Shall I ask?",
            "Không trách khách báo muộn. Nói cái gì còn kịp ('at short notice'). Sau 'can' là động từ nguyên thể, không thêm -s.",
            "The pastry chef can still makes a small cake at short notice, sir. Shall I ask?",
          ),
          g(
            "Cake is six hundred thousand.",
            "That price is before service charge and tax, madam, so let me quote the total.",
            "Giá đồ ăn uống thường chưa gồm phí phục vụ và thuế. Báo TỔNG SỐ khách sẽ thấy trên hoá đơn. Sau 'let me' là động từ nguyên thể.",
            "That price is before service charge and tax, madam, so let me quoting the total.",
          ),
        ],
        speaking: [
          {
            ...sp(
              "We only decided to celebrate an hour ago. Is anything still possible?",
              t2a,
              "'Quite a lot' mở bằng sự rộng rãi, rồi đúng hai việc làm kịp: bánh nhỏ 'at short notice', thiệp viết tay.",
            ),
            alsoAccept: [
              "Quite a lot, madam. The pastry chef can make a small cake at short notice, and I can add a handwritten card too.",
            ],
          },
          risk({
            ...sp(
              "A chocolate cake would be perfect.",
              t2b,
              "Câu phải đúng của tuần: hỏi dị ứng TRƯỚC khi gọi bếp bánh — bánh, sô-cô-la, hoa quả đều có thể gây dị ứng.",
              undefined,
              ["before", "pastry", "chef", "allergic"],
              t2a,
            ),
            alsoAccept: [
              "Of course, madam. Before I call the pastry chef, may I ask if anyone is allergic to anything?",
              "Certainly, madam. Before I call the pastry chef, is anyone allergic to anything?",
              "Of course, madam. Is anyone allergic to anything, before I call the pastry chef?",
            ],
          }),
          sp(
            "No allergies. The menu says six hundred thousand. Is that the total?",
            t2c,
            "Khách đã nói giá trên thực đơn. Nói ngay là giá chưa gồm phí và thuế, rồi 'quote the total' — để hoá đơn không làm khách bất ngờ.",
            undefined,
            undefined,
            t2b,
          ),
          {
            ...sp(
              "Could you do balloons and a photographer for tonight?",
              "Those need a day's lead time, madam. Tonight I can arrange a cake and a handwritten card instead.",
              "Không hứa món cần báo trước một ngày. Nói 'lead time', rồi đưa thứ làm được tối nay bằng 'instead'.",
            ),
            alsoAccept: [
              "Those need a day's lead time, madam. Tonight I can arrange a cake and a handwritten card.",
            ],
          },
          sp(
            "Can we light candles in the room for the surprise?",
            "I am sorry, madam, candles are not allowed in the rooms, but the pastry chef can send LED candles.",
            "Từ chối điều không an toàn (báo khói), rồi đưa ngay phương án thay thế để điều bất ngờ vẫn còn.",
          ),
          sp(
            "The honeymoon couple want rose petals on the bed tonight. Can housekeeping do it?",
            "Yes, but I will check allergies with them first. Please set it while they are at dinner.",
            "Nói với đồng nghiệp buồng phòng, không gọi sir hay madam: hỏi dị ứng trước, rồi nói thời điểm làm.",
            "colleague",
          ),
        ],
        reading: read(
          `WHAT THE DESK CAN ARRANGE — SAME DAY
Within 2 hours, no approval needed: a handwritten card, an early turn-down while the guests are at dinner, a quiet table by the window.
Within 4 hours, kitchen confirmation needed: a small cake for six to eight people, or sparkling wine on ice.
Needs a day's lead time: balloons, a photographer, room decoration, a photo cake, or a cake for a special diet.
Never promise a one-day item for the same evening. A cake that arrives the next morning is worse than no cake.
Food and drink prices are before service charge and tax. Quote the TOTAL the guest will see, BEFORE you arrange it.
Giving any of these free is the Duty Manager's decision, not the desk's.
Ask about allergies before ANY of it: cake, fruit, chocolate, flowers or scent.
No candles in guest rooms. The smoke detector does not know it is a birthday, so offer LED candles.`,
          [
            {
              q: "Món nào cần báo trước một ngày?",
              options: [
                "Một tấm thiệp viết tay",
                "Bóng bay và thợ chụp ảnh",
                "Một bàn yên tĩnh cạnh cửa sổ nhà hàng",
              ],
              correct: 1,
              explanation:
                'Tài liệu ghi "Needs a day\'s lead time: balloons, a photographer" — không bao giờ hứa cho ngay tối nay.',
            },
            {
              q: "Trước khi đặt bánh hay hoa, phải hỏi khách điều gì?",
              options: [
                "Khách có bị dị ứng gì không",
                "Khách muốn thanh toán bằng thẻ hay tiền mặt",
                "Khách sẽ ở thêm bao nhiêu đêm nữa",
              ],
              correct: 0,
              explanation:
                'Tài liệu ghi "Ask about allergies before ANY of it: cake, fruit, chocolate, flowers or scent."',
            },
            {
              q: "Giá trên thực đơn đồ ăn uống thường là giá thế nào?",
              options: [
                "Chưa gồm phí phục vụ và thuế",
                "Đã gồm mọi khoản phí phục vụ và thuế",
                "Giá dành riêng cho hai người",
              ],
              correct: 0,
              explanation:
                'Tài liệu ghi "Food and drink prices are before service charge and tax" — nên phải báo tổng số khách sẽ thấy.',
            },
          ],
        ),
        game: [
          game(
            "Could you do a photo cake with our wedding picture tonight?",
            "That needs a day's lead time, sir. Tonight I can arrange a small cake and a handwritten card.",
            "That need a day's lead time, sir. Tonight I can arrange a small cake and a handwritten card.",
            "I will try my best, sir, and I am sure the kitchen can manage it somehow.",
            undefined,
            "'That need' thiếu -s: chủ ngữ số ít đi với 'needs'. Câu 'I will try my best' nghe nhiệt tình nhưng hứa món cần báo trước một ngày — bánh tới sáng hôm sau còn tệ hơn không có bánh.",
          ),
          game(
            "Just put the cake on our bill. How much will that be?",
            "That price is before tax and service, madam, so let me quote the total before I order.",
            "That price is before tax and service, madam, so let me quoting the total before I order.",
            "Please do not worry about the price, madam. You will see it all on the bill at check-out.",
            undefined,
            "Sau 'let me' là động từ nguyên thể 'quote'. Câu 'You will see it all on the bill at check-out' lịch sự nhưng để khách bất ngờ với tổng tiền — giá phải nói TRƯỚC khi đặt.",
          ),
        ],
      },
    ),

    L(34, 3, "One Occasion, Four Teams", "Một dịp, bốn bộ phận", {
      vocabulary: [
        c("Named person", "Every step has a named person, not just a department.", [
          "/neɪmd ˈpɜːsn/",
          "Người phụ trách có tên cụ thể",
          "👤",
        ]),
        c("Trigger", "The trigger is the guests leaving for dinner.", [
          "/ˈtrɪɡə/",
          "Dấu hiệu bắt đầu việc",
          "🔔",
        ]),
        c("Chase up", "I will chase up the pastry chef before dinner.", [
          "/tʃeɪs ʌp/",
          "Gọi đôn đốc, hỏi lại",
          "📲",
        ]),
        c("Pastry chef", "The pastry chef needs 4 hours for a cake.", [
          "/ˈpeɪstri ʃef/",
          "Đầu bếp làm bánh",
          "🧁",
        ]),
      ],
      grammar: [
        g(
          "Housekeeping will do it sometime this evening.",
          "Housekeeping sets the room when the guests leave for dinner, madam.",
          "Lịch cố định dùng hiện tại đơn ở cả hai vế, không có 'will' sau 'when'. 'Housekeeping' là chủ ngữ số ít nên 'sets' có -s. Bàn giao cần một dấu hiệu bắt đầu, không phải một khoảng giờ.",
          "Housekeeping set the room when the guests leave for dinner, madam.",
        ),
        g(
          "I told the kitchen already.",
          "The pastry chef has it, and I will chase it up before dinner myself.",
          "Giao cho một người có tên, rồi tự mình đôn đốc ('chase it up'). 'Đã báo bếp rồi' không phải là bàn giao. Sau 'will' là động từ nguyên thể.",
          "The pastry chef has it, and I will chasing it up before dinner myself.",
        ),
      ],
      speaking: [
        {
          ...sp(
            "So it will definitely be ready when we come back up?",
            t3a,
            "Trả lời bằng cơ chế, không bằng chữ 'chắc chắn': ai làm, khi nào (khi khách đi ăn tối), và ai đôn đốc (chính mình).",
          ),
          alsoAccept: [
            "It will, sir. Housekeeping sets the room when you go to dinner, and I will chase up the pastry chef myself.",
          ],
        },
        sp(
          "And the cake? We do not want it to melt.",
          t3b,
          "Nói người giữ bánh và dấu hiệu mang bánh lên ('trigger'). Hiện tại đơn cho một lịch đã định.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "You have thought of everything. Thank you.",
          t3c,
          "Lời chúc trang trọng: 'On behalf of' cộng người mình đại diện, rồi chúc khách một buổi tối thật đẹp.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "Pastry here. The cake for tonight — who is it for, and when does it go up?",
          "It is for a birthday in the courtyard suite, with no nuts. It goes up when the guests leave the restaurant.",
          "Nói với đồng nghiệp bếp bánh, không gọi sir hay madam: cho ai, điều cần tránh (hạt), và dấu hiệu mang lên.",
          "colleague",
        ),
        sp(
          "The anniversary in the old wing — is everything handed over?",
          "Yes. Each step has a named person and a trigger, and I will chase up the kitchen before dinner.",
          "Báo cáo lên cấp trên, không gọi sir hay madam: bàn giao xong khi mỗi bước có người có tên và dấu hiệu bắt đầu.",
          "manager",
        ),
        {
          ...sp(
            "Who should I call if something is missing?",
            "Please call the desk and ask for me, madam. I will also follow up with you after dinner.",
            "Cho khách một người cụ thể để gọi — chính mình — và tự liên hệ lại sau bữa tối.",
          ),
          alsoAccept: [
            "Please call the desk and ask for me, madam. I will follow up with you after dinner too.",
          ],
        },
      ],
      reading: read(
        `OCCASION HANDOVER SLIP — ONE PER ARRANGEMENT
The slip lists the room, the guest's name and the occasion.
It gives the hour the room will be empty, and what was promised, word for word.
It says who already knows, any allergies, and who pays, and whether the price was stated.
Each line carries three things: the task, a NAMED person, and a trigger.
Cake for six, no nuts — Chef Nam, pastry — ready by 19:00 and kept cold.
Petals and card — Chi, housekeeping — trigger: the guests leave for dinner.
Card written and signed — Duy, front desk — before 18:00.
Chase-up call to the pastry team — Duy, front desk — at 18:00.
A slip with "Housekeeping" and no name is not a handover. It is a hope. Departments do not remember things; people do.
The desk keeps the slip until the guest confirms it happened.`,
        [
          {
            q: "Mỗi dòng bàn giao phải có ba thứ gì?",
            options: [
              "Đầu việc, người có tên, và dấu hiệu bắt đầu",
              "Đầu việc, mức giá, và số phòng của khách",
              "Bộ phận phụ trách, khung giờ, và người quản lý trực",
            ],
            correct: 0,
            explanation:
              'Phiếu ghi "Each line carries three things: the task, a NAMED person, and a trigger."',
          },
          {
            q: "Vì sao ghi 'Housekeeping' mà không ghi tên người là chưa đủ?",
            options: [
              "Vì bộ phận không nhớ việc, chỉ con người nhớ",
              "Vì buồng phòng là bộ phận bận nhất trong ca",
              "Vì hệ thống cần mã số nhân viên để lưu lại phiếu",
            ],
            correct: 0,
            explanation: 'Phiếu ghi "It is a hope. Departments do not remember things; people do."',
          },
        ],
      ),
      game: [
        game(
          "Last time we asked for something like this, nobody actually did it.",
          "I understand, madam. This time each step has a named person, and I will chase it up myself.",
          "I understand, madam. This time each step has a name person, and I will chase it up myself.",
          "That will not happen this time, madam, I promise you. Everyone knows about it.",
          undefined,
          "'a name person' sai: phân từ hai làm tính từ phải là 'a named person'. Câu 'I promise you. Everyone knows about it.' chỉ là lời hứa — khách cần thấy cơ chế: người có tên và người đôn đốc.",
        ),
        game(
          "Have you told the kitchen about the cake?",
          "Yes, sir. The pastry chef has it, and I will chase it up before you go to dinner.",
          "Yes, sir. The pastry chef has it, and I will chase it up before you will go to dinner.",
          "I think so, sir. Someone from the kitchen should have it on their list somewhere.",
          undefined,
          "Sau 'before' (chỉ thời gian) dùng hiện tại đơn, không dùng 'will'. Câu 'Someone… should have it' đúng tiếng Anh nhưng không có ai chịu trách nhiệm — đó là hy vọng, không phải bàn giao.",
        ),
      ],
    }),

    L(
      34,
      4,
      "Formal Wishes — and When It Goes Wrong",
      "Lời chúc trang trọng, và khi điều bất ngờ hỏng",
      {
        vocabulary: [
          c("On behalf of", "On behalf of everyone at the hotel, happy anniversary.", [
            "/ɒn bɪˈhɑːf əv/",
            "Thay mặt cho",
            "🎖️",
          ]),
          c("Spoil", "One greeting at the desk can spoil the whole surprise.", [
            "/spɔɪl/",
            "Làm hỏng",
            "💔",
          ]),
          c("Own the mistake", "Own the mistake before the guest has to describe it.", [
            "/əʊn ðə mɪˈsteɪk/",
            "Nhận lỗi về mình",
            "🙇",
          ]),
          c("Make it right", "Let me make it right tonight rather than tomorrow.", [
            "/meɪk ɪt raɪt/",
            "Sửa cho đúng, bù đắp lại",
            "🔧",
          ]),
        ],
        grammar: [
          g(
            "Happy birthday!!",
            "On behalf of everyone at the hotel, madam, we wish you a very happy birthday.",
            "Lời chúc trang trọng: 'On behalf of' + người mình đại diện, rồi 'we wish you…'. 'we' đi với 'wish', không thêm -es. Nói nhỏ với khách, không chúc vọng qua sảnh.",
            "On behalf of everyone at the hotel, madam, we wishes you a very happy birthday.",
          ),
          g(
            "The kitchen forgot. Nothing I can do now.",
            "The cake did not reach your room, and that is our mistake, sir. May I bring it up now?",
            "Quá khứ đơn phủ định 'did not + động từ nguyên thể' cho việc KHÔNG xảy ra. Nhận lỗi bằng 'our mistake', không đổ cho bếp, rồi đề xuất ngay.",
            "The cake did not reached your room, and that is our mistake, sir. May I bring it up now?",
          ),
        ],
        speaking: [
          {
            ...sp(
              "The receptionist congratulated her at check-in. It was supposed to be a surprise.",
              t4a,
              "Nhận lỗi trọn vẹn ('our mistake'), gọi đúng điều đã mất ('spoiled the moment'), rồi nói muốn sửa ('make it right').",
            ),
            alsoAccept: [
              "That is our mistake, sir, and I am very sorry. We spoiled the moment, and I want to make it right.",
            ],
          },
          sp(
            "How? She knows now.",
            t4b,
            "Cứu điều còn cứu được: dời bánh sang tối mai để vẫn còn một khoảnh khắc bất ngờ. Hỏi, không tự quyết.",
            undefined,
            undefined,
            t4a,
          ),
          sp(
            "All right. And please make sure nobody says anything else.",
            t4c,
            "Báo cả nhóm 'in writing' — lời dặn miệng là thứ vừa hỏng — và tự kiểm tra lại.",
            undefined,
            undefined,
            t4b,
          ),
          risk({
            ...sp(
              "Please take the cake off our bill. The evening was ruined.",
              "I am sorry, sir. I will ask my Duty Manager to remove the charge now.",
              "Câu phải đúng của tuần: gỡ phí là quyền của Duty Manager. Không cãi ở quầy, không tự gỡ, không đề nghị tiền — hỏi ngay.",
              undefined,
              ["duty", "manager", "remove", "charge"],
            ),
            alsoAccept: [
              "I am so sorry, sir. I will ask my Duty Manager to remove the charge now.",
              "I am sorry, sir. I will ask the manager on duty to remove the charge now.",
              "I am sorry, sir. May I ask my Duty Manager to remove the charge now?",
            ],
          }),
          {
            ...sp(
              "We are celebrating our engagement tonight!",
              "Congratulations on your engagement, madam. On behalf of the hotel, we wish you both every happiness.",
              "Lời chúc trang trọng hai câu: chúc mừng đúng dịp của khách, rồi 'On behalf of' + khách sạn và lời chúc.",
            ),
            alsoAccept: [
              "Congratulations on your engagement, madam. On behalf of the hotel, we wish you every happiness.",
            ],
          },
          sp(
            "The card had the wrong name on it. Her name is Mai, not Mai Anh.",
            "I am sorry, madam, that is our mistake. I will write a fresh card now rather than send a corrected one.",
            "Nhận lỗi, rồi viết thiệp mới thay vì gửi lên một tấm sửa tay.",
          ),
          sp(
            "What went wrong with the surprise in the old wing?",
            "A greeting at check-in spoiled it. I have moved the cake to tomorrow, and I will look into how it happened.",
            "Báo cáo lên cấp trên, không gọi sir hay madam: điều đã hỏng, việc đã làm, và việc sẽ tìm hiểu.",
            "manager",
          ),
        ],
        reading: read(
          `WHEN AN OCCASION FAILS — FRONT DESK
The three failures, in the order they happen most often:
1. The surprise is spoiled: someone congratulates the guest who was not meant to know. Apologise to the ORGANISER privately, and offer to move the moment to another evening.
2. The item never arrives. Own the mistake before the guest describes it. Bring it now if the evening is still going, or move it to tomorrow.
3. The wrong occasion, or the wrong name on the card. Remove it at once and write a fresh card. Never send up a corrected one.
A charge for an occasion we got wrong is not argued at the desk. Ask the Duty Manager to remove it, and tell the guest you have asked.
Do not offer money. The guest lost a moment, not an amount.
Formal wishes, "On behalf of everyone at the hotel…", are said quietly to the guest, never across the lobby.`,
          [
            {
              q: "Khi điều bất ngờ bị lộ, phải xin lỗi ai và ở đâu?",
              options: [
                "Người tổ chức, một cách kín đáo",
                "Cả hai vị khách, ngay tại quầy lễ tân cho rõ ràng",
                "Người được nhận bất ngờ, trong bữa tối",
              ],
              correct: 0,
              explanation:
                'Tài liệu ghi "Apologise to the ORGANISER privately, and offer to move the moment to another evening."',
            },
            {
              q: "Khách đòi bỏ khoản phí của một dịp bị hỏng. Lễ tân làm gì?",
              options: [
                "Tự gỡ phí ngay để khách vui lòng",
                "Nhờ Duty Manager gỡ, rồi báo khách",
                "Giải thích rằng khách đã đồng ý giá từ trước",
              ],
              correct: 1,
              explanation:
                'Tài liệu ghi "Ask the Duty Manager to remove it, and tell the guest you have asked."',
            },
          ],
        ),
        game: [
          game(
            "The cake never came. We waited all evening.",
            "That is our mistake, madam, and I am sorry. May I bring it up now, with a fresh card?",
            "That is our mistake, madam, and I am sorry. May I bringing it up now, with a fresh card?",
            "The kitchen was very busy tonight, madam. It happens sometimes on a Saturday.",
            undefined,
            "Sau 'May I' là động từ nguyên thể 'bring'. Câu 'The kitchen was very busy' đúng tiếng Anh nhưng đổ lỗi cho bếp — tài liệu dặn nhận lỗi trước khi khách phải kể.",
          ),
          game(
            "It is our silver wedding anniversary today.",
            "Congratulations, sir. On behalf of everyone at the hotel, we wish you both a wonderful evening.",
            "Congratulations, sir. On behalf of everyone at the hotel, we wishes you both a wonderful evening.",
            "Oh, nice one, sir! Have fun tonight, the two of you, and enjoy the party!",
            undefined,
            "'we wishes' sai: 'we' đi với 'wish'. Câu 'Oh, nice one… Have fun' đúng tiếng Anh nhưng quá suồng sã cho một dịp trang trọng ở khách sạn 5 sao.",
          ),
        ],
      },
    ),
  ],
};
