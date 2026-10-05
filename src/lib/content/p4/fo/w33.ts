// FO week 33 — disputes and compensation, the full LAST (see ../kit.ts).
//
// Listen, Apologise, Solve, Thank — and the Solve step is where the desk's
// authority ends:
//  · Listen to the end, no interruption, the claim in the guest's words.
//    A "double charge" is often a card hold from check-in: say so only after
//    looking, and never as if the guest made a mistake.
//  · Apologise for the experience, not for an amount, and blame no one.
//  · Solve: the desk EXPLAINS the policy ("Our policy allows … up to …") and
//    never changes it. A waiver, a refund or an exception is asked for —
//    "Let me check with my supervisor" — never promised. A charge posted in
//    error is reversed at once, once the approver is named on the folio.
//    Internal approval limits are never read to a guest.
//  · Injury, theft and lost valuables are never settled at the desk: first
//    aid and the Duty Manager, stay with the guest, no talk of compensation.
//  · A card refund is quoted at its SLOWEST (up to thirty working days).
//  · Thank the guest, and leave them with a bill, a confirmation in writing
//    and a case number.
import { game, g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("FO");
const L = lessonsFor("FO");

const t1a =
  "I am sorry you have had to mention it again, sir. Please tell me exactly what you see.";
const t1b =
  "Thank you, sir. Let me look into it now. Sometimes a card hold looks like a second charge.";
const t1c =
  "Not at all, sir. Based on what you told me, I will check where each payment came from.";

const t2a =
  "I am sorry, madam. Our policy allows free cancellation up to six in the evening, so a fee applies after that.";
const t2b =
  "I understand, madam, and I am sorry. I cannot make an exception myself, but let me check with my supervisor now.";
const t2c = "I will call you back within the hour, madam, whatever the answer is.";

const t3a =
  "Then it may have been posted in error, madam, and I am sorry. Let me check with my supervisor now.";
const t3b = "Yes, madam. My supervisor has approved it, and the minibar charge is off your bill.";
const t3c = "Of course, madam. Here is a new itemised bill, so you can check every line.";

const t4a =
  "Up to thirty working days, sir, because it depends on your bank. I am sorry if you were told three.";
const t4b =
  "I will follow up with you myself next week either way, sir, and your case number is on this slip.";
const t4c =
  "Of course, sir. You will have it in writing tonight, and it is on record, so any colleague can see it.";

export const week: AuthoredWeek = {
  canDo:
    "Nói được: xử lý một khiếu nại về tiền đủ bốn bước LAST — nghe hết, xin lỗi về trải nghiệm, giải thích chính sách ('Our policy allows… up to…') rồi xin ý cấp trên ('Let me check with my supervisor'), và cảm ơn khách — không tự hứa hoàn tiền hay miễn phí.",
  lessons: [
    L(33, 1, "Listen First", "Nghe hết trước đã", {
      vocabulary: [
        c("Claim", "Write the guest's claim down in their own words.", [
          "/kleɪm/",
          "Điều khách khiếu nại, khẳng định",
          "📝",
        ]),
        c("Interrupt", "Never interrupt a guest who is still explaining.", [
          "/ˌɪntəˈrʌpt/",
          "Ngắt lời",
          "✋",
        ]),
        c("Look into", "I will look into it now and come back to you.", [
          "/lʊk ˈɪntuː/",
          "Xem xét, tìm hiểu kỹ",
          "🔍",
        ]),
        c("Card hold", "Sometimes a card hold looks like a second charge.", [
          "/kɑːd həʊld/",
          "Khoản tạm giữ trên thẻ",
          "💳",
        ]),
      ],
      grammar: [
        g(
          "Wait, wait — that is not what happened.",
          "Please go on, sir. I would rather hear all of it before I say anything.",
          "Không ngắt lời khách đang khiếu nại. 'I would rather + động từ nguyên thể': chọn nghe hết trước.",
          "Please go on, sir. I would rather hearing all of it before I say anything.",
        ),
        g(
          "Our system never makes mistakes.",
          "Let me look into it now, madam. Sometimes a card hold looks like a second charge.",
          "'Let me + động từ nguyên thể' nhận việc ngay. Không bảo vệ hệ thống; nêu một khả năng có thật mà không đổ cho khách.",
          "Let me looking into it now, madam. Sometimes a card hold looks like a second charge.",
        ),
      ],
      speaking: [
        {
          ...sp(
            "I have been charged twice for the same night. This is the third time I have raised it.",
            t1a,
            "Bước 1–2 của LAST: xin lỗi vì khách phải nhắc lại (điều khách tức nhất), rồi mời khách nói tiếp. Số tiền tính sau.",
          ),
          alsoAccept: [
            "I am sorry you have had to mention it again, sir. Please tell me what you see.",
            "I am so sorry you have had to mention it again, sir. Please tell me exactly what you see.",
          ],
        },
        sp(
          "Two payments of four million, one on Monday and one on Tuesday.",
          t1b,
          "Cảm ơn, nhận việc bằng 'Let me look into it', rồi nêu một khả năng thật — khoản tạm giữ trên thẻ — mà không nói khách nhầm.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "So you are saying I am wrong?",
          t1c,
          "Không tranh luận. 'Not at all', rồi 'Based on' cộng lời khách vừa kể cho khách thấy lời họ là căn cứ để kiểm tra.",
          undefined,
          undefined,
          t1b,
        ),
        {
          ...sp(
            "And nobody answered my three emails!",
            "I am sorry nobody answered, madam. That should not have happened, and I will reply to you myself today.",
            "Xin lỗi về trải nghiệm, không đổ cho ca khác. 'should not have happened' nhận đúng điều sai mà không kể lý do.",
          ),
          alsoAccept: [
            "I am sorry nobody answered, madam. That should not have happened, and I will reply myself today.",
          ],
        },
        sp(
          "The guest at the desk is shouting about his bill. Should I stop him and explain?",
          "No. Let him finish, and do not interrupt. Write his claim down, then look into it.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Thứ tự LAST: nghe hết, không ngắt lời, ghi lại, rồi mới kiểm tra.",
          "colleague",
        ),
        {
          ...sp(
            "Before you check anything, I want you to listen.",
            "Of course, madam. I will not interrupt. Please tell me everything, and I will write it down.",
            "Hứa đúng điều khách xin: không ngắt lời. Rồi một việc cụ thể cho thấy mình nghe thật: ghi lại.",
          ),
          alsoAccept: [
            "Of course, madam. I will not interrupt you. Please tell me everything, and I will write it down.",
          ],
        },
        sp(
          "What did the guest in the lobby complain about?",
          "A double charge on his card. One payment may be a card hold, and I am looking into it now.",
          "Báo cáo lên cấp trên: không gọi sir hay madam, nói sự việc, khả năng, và việc mình đang làm.",
          "manager",
        ),
      ],
      reading: read(
        `COMPLAINT INTAKE — FRONT DESK
1. Listen to the end. Do not interrupt, and do not check the system while the guest is speaking.
2. Write the claim in the guest's own words. Read it back before you act.
3. Apologise for the EXPERIENCE first, not for the amount. "I am sorry you had to raise it three times" lands. "I am sorry about the 400,000" does not.
4. Never say the system is correct. Never blame another shift, or the guest's bank.
5. Then look into it. A "double charge" is often a card hold from check-in that the bank has not released yet.
Check the folio before you say so, and never say it as if the guest made a mistake.
A guest who feels heard will accept a slower answer.`,
        [
          {
            q: "Trong lúc khách đang nói, lễ tân KHÔNG được làm gì?",
            options: [
              "Ghi lại những gì khách đang trình bày",
              "Ngắt lời khách, hoặc tra hệ thống trước khi khách nói hết",
              "Nhìn thẳng vào khách khi lắng nghe",
            ],
            correct: 1,
            explanation:
              'Bước 1 ghi "Listen to the end. Do not interrupt, and do not check the system while the guest is speaking."',
          },
          {
            q: "Khách báo bị trừ tiền hai lần. Một khả năng thường gặp là gì?",
            options: [
              "Khách tự nhớ nhầm số tiền mình đã trả",
              "Khoản tạm giữ trên thẻ lúc nhận phòng chưa được giải phóng",
              "Ngân hàng của khách tính sai phí đổi ngoại tệ hai lần liên tiếp trong ngày",
            ],
            correct: 1,
            explanation:
              'Bước 5 ghi "is often a card hold from check-in that the bank has not released yet" — nhưng chỉ nói ra SAU khi đã kiểm tra.',
          },
        ],
      ),
      game: [
        game(
          "Are you saying I am making this up?",
          "Not at all, madam. Your claim is clear — I only need a moment to look into it.",
          "Not at all, madam. Your claim is clear — I only need a moment to looking into it.",
          "I am only checking what the system says, madam. It is usually right.",
          undefined,
          "Sau 'to' là động từ nguyên thể: 'to look into'. Câu 'It is usually right' đúng tiếng Anh nhưng bênh hệ thống trước mặt khách — đúng điều bước 4 cấm.",
        ),
        game(
          "I have not finished! Let me speak!",
          "I am sorry, sir. Please go on — I will not interrupt again.",
          "I understand, sir, but there is queue behind you, so please make it quick.",
          "I understand, sir, but there is a queue behind you, so please make it quick.",
          undefined,
          "Hai câu giục khách vì hàng chờ đều ngắt lời khách lần nữa — khách đang khiếu nại cần được nói hết. Câu 'there is queue' còn thiếu mạo từ: 'there is a queue'.",
        ),
      ],
    }),

    L(33, 2, "What the Policy Allows", "Chính sách cho phép tới đâu", {
      vocabulary: [
        c("Policy allows", "Our policy allows late check-out until two, subject to availability.", [
          "/ˈpɒləsi əˈlaʊz/",
          "Chính sách cho phép",
          "📜",
        ]),
        c("Up to", "Our policy allows free cancellation up to six in the evening.", [
          "/ʌp tuː/",
          "Tối đa, cho tới (một mức, một mốc)",
          "⬆️",
        ]),
        c(
          "Check with my supervisor",
          "Let me check with my supervisor before I promise anything.",
          ["/tʃek wɪð maɪ ˈsuːpəvaɪzə/", "Hỏi ý kiến cấp trên của tôi", "🙋"],
        ),
        c("Exception", "Only the Duty Manager can make an exception.", [
          "/ɪkˈsepʃn/",
          "Ngoại lệ",
          "✳️",
        ]),
      ],
      grammar: [
        g(
          "No. Cancellation after six, you pay.",
          "Our policy allows free cancellation up to six in the evening, madam, so a fee applies tonight.",
          "Nói luật bằng điều khách ĐƯỢC hưởng trước ('allows… up to…'), rồi mới tới phí. 'policy' số ít nên 'allows' có -s.",
          "Our policy allow free cancellation up to six in the evening, madam, so a fee applies tonight.",
        ),
        g(
          "I cannot do anything. Rules are rules.",
          "I cannot make an exception myself, sir, but let me check with my supervisor now.",
          "Nói rõ điều ngoài quyền mình ('make an exception'), rồi một việc làm ngay. Sau 'let me' là động từ nguyên thể.",
          "I cannot make an exception myself, sir, but let me checking with my supervisor now.",
        ),
      ],
      speaking: [
        {
          ...sp(
            "Your website says free cancellation up to six. We cancelled at nine. Is that really a full night?",
            t2a,
            "Bước Solve bắt đầu bằng chính sách: 'Our policy allows' rồi 'up to' cộng một mốc — điều khách được hưởng trước, phí sau.",
          ),
          alsoAccept: [
            "I am sorry, madam. Our policy allows free cancellation up to six in the evening, so the fee applies after that.",
            "I am sorry, madam. Our policy allows free cancellation up to six, so a fee applies after that.",
          ],
        },
        sp(
          "But our flight was cancelled! It was not our fault.",
          t2b,
          "Công nhận lý do của khách, rồi nói rõ ngoại lệ không phải quyền mình, và 'let me check with my supervisor'.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "How long will that take?",
          t2c,
          "Hứa việc của chính mình — gọi lại — kèm một mốc, và gọi lại cả khi câu trả lời là không.",
          undefined,
          undefined,
          t2b,
        ),
        risk({
          ...sp(
            "Your colleague said late check-out was free. Now there is a fee on my bill.",
            "I am sorry, sir. I cannot waive the fee, but I will check with my supervisor now.",
            "Câu phải đúng của tuần: miễn phí là quyền của cấp trên. Không trách đồng nghiệp, không tự gỡ phí — xin ý cấp trên ngay.",
            undefined,
            ["waive", "fee", "supervisor"],
          ),
          alsoAccept: [
            "I am sorry, sir. I am not able to waive the fee, but I will check with my supervisor now.",
            "I am sorry, sir. I cannot waive the fee, but let me check with my supervisor now.",
            "I am sorry, sir. I cannot remove the fee myself, but I will check with my supervisor now.",
          ],
        }),
        {
          ...sp(
            "Can we keep the room until two, or even four?",
            "Our policy allows late check-out up to two, sir, with a small fee. After two, we can store your bags downstairs.",
            "'policy allows' rồi 'up to' cộng mốc giờ, thêm điều kiện (phí nhỏ), rồi một phương án cho phần còn lại: giữ hành lý.",
          ),
          alsoAccept: [
            "Our policy allows late check-out up to two, sir, with a small fee. After that, we can store your bags downstairs.",
          ],
        },
        sp(
          "The guest says the fee is unfair. Can I just take it off?",
          "No. Only the Duty Manager can make an exception. Tell her you are checking with your supervisor.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Nhắc đúng người có quyền, và câu để nói với khách.",
          "colleague",
        ),
      ],
      reading: read(
        `EXPLAINING A POLICY IN A DISPUTE — FRONT DESK
Say what the policy ALLOWS first, then where it stops. "Our policy allows free cancellation up to six in the evening" is heard as a service.
"You cancelled late, so you pay" is heard as a fight.
Know these by heart. They are one hotel's, so check yours.
Free cancellation up to 18:00 on the day of arrival.
Late check-out up to 14:00, subject to availability, with a small fee.
Luggage stored for up to seven days.
The desk explains the policy. It does not change it. A waiver, a refund or an exception is the Duty Manager's decision.
Say "Let me check with my supervisor". Never say "Rules are rules".
Give a time for your answer, and call back even when the answer is no.
Never read our internal approval limits to a guest.`,
        [
          {
            q: "Khi giải thích chính sách, nên nói điều gì trước?",
            options: [
              "Mức phí khách sẽ phải trả",
              "Điều chính sách cho phép khách",
              "Lý do vì sao khách sạn phải đặt ra quy định đó từ trước",
            ],
            correct: 1,
            explanation: 'Tài liệu ghi "Say what the policy ALLOWS first, then where it stops."',
          },
          {
            q: "Ai quyết định miễn phí huỷ phòng cho khách?",
            options: [
              "Lễ tân đang trực",
              "Duty Manager — quầy chỉ giải thích chính sách",
              "Bộ phận đặt phòng",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "A waiver, a refund or an exception is the Duty Manager\'s decision" — quầy giải thích, không thay đổi chính sách.',
          },
          {
            q: "Theo tài liệu, hành lý được giữ tối đa bao lâu?",
            options: ["Ba ngày", "Bảy ngày", "Một tháng"],
            correct: 1,
            explanation: 'Tài liệu ghi "Luggage stored for up to seven days."',
          },
        ],
      ),
      game: [
        game(
          "So I lose a whole night because I cancelled three hours late?",
          "I am sorry, sir. Our policy allows free cancellation up to six, but let me check with my supervisor.",
          "Rules are rules, sir. Every guest pay the same fee after six.",
          "Rules are rules, sir. Every guest pays the same fee after six.",
          undefined,
          "Hai câu 'Rules are rules' đều là đúng câu tài liệu cấm — nó biến một lời giải thích thành một cuộc cãi. Câu 'Every guest pay' còn thiếu -s: 'every guest' số ít đi với 'pays'.",
        ),
        game(
          "The receptionist yesterday said she would waive it. Will you?",
          "I cannot waive it myself, madam, but I will check with my supervisor and call you within the hour.",
          "I cannot waive it myself, madam, but I will checking with my supervisor and call you within the hour.",
          "If my colleague said she would, madam, then of course I will take it off your bill for you right now.",
          undefined,
          "Sau 'will' là động từ nguyên thể 'check'. Câu 'I will take it off your bill' lịch sự nhưng vượt quyền: miễn phí là quyết định của Duty Manager, kể cả khi một đồng nghiệp đã lỡ hứa.",
        ),
      ],
    }),

    L(33, 3, "The Charge the Guest Never Made", "Khoản phí khách không hề dùng", {
      vocabulary: [
        c("Posted in error", "The minibar charge was posted in error.", [
          "/ˈpəʊstɪd ɪn ˈerə/",
          "Bị ghi nhầm vào hoá đơn",
          "❌",
        ]),
        c("Itemised", "May I print an itemised bill for you?", [
          "/ˈaɪtəmaɪzd/",
          "Có kê chi tiết từng khoản",
          "🧾",
        ]),
        c("Authorise", "Only the Duty Manager can authorise a refund.", [
          "/ˈɔːθəraɪz/",
          "Phê duyệt, cho phép",
          "✍️",
        ]),
        c("Escalate", "I will escalate it to the Duty Manager now.", [
          "/ˈeskəleɪt/",
          "Chuyển lên cấp trên",
          "⏫",
        ]),
      ],
      grammar: [
        g(
          "Somebody in your room drank it.",
          "It looks as though it was posted in error, madam. Let me check with my supervisor and remove it.",
          "Bị động quá khứ 'was posted in error' nói về lỗi mà không quy cho ai. Không bao giờ ám chỉ người đi cùng đã dùng.",
          "It looks as though it was post in error, madam. Let me check with my supervisor and remove it.",
        ),
        g(
          "That is too much money. Not my problem.",
          "That is above what I can authorise, sir, so I will escalate it to the Duty Manager now.",
          "Vượt quyền thì nói QUY TRÌNH, không nói con số hạn mức. Sau 'will' là động từ nguyên thể: 'will escalate'.",
          "That is above what I can authorise, sir, so I will escalating it to the Duty Manager now.",
        ),
      ],
      speaking: [
        {
          ...sp(
            "We never opened the minibar. Not once in four nights.",
            t3a,
            "Xin lỗi, nói lỗi bằng bị động 'posted in error', rồi xin duyệt ngay: 'Let me check with my supervisor'. Chưa hứa gỡ khi chưa có người duyệt.",
          ),
          alsoAccept: [
            "Then it may have been posted in error, madam, and I am sorry. I will check with my supervisor now.",
          ],
        },
        sp(
          "Thank you. Is it done?",
          t3b,
          "Hiện tại hoàn thành 'has approved' rồi kết quả: khoản phí đã ra khỏi hoá đơn. Nói người duyệt, không nói hạn mức.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Can I see the bill before I sign?",
          t3c,
          "Đưa hoá đơn kê lại ('itemised') để khách tự kiểm từng dòng — minh bạch rẻ hơn tranh luận.",
          undefined,
          undefined,
          t3b,
        ),
        risk({
          ...sp(
            "I want the whole first night refunded to my card. The room was not ready.",
            "I cannot authorise a refund, sir, but I will ask my Duty Manager now.",
            "Câu phải đúng của tuần: hoàn tiền vào thẻ luôn là việc Duty Manager duyệt. Nói điều mình không làm, rồi việc mình làm ngay.",
            undefined,
            ["authorise", "refund", "duty", "manager"],
          ),
          alsoAccept: [
            "I am not able to authorise a refund, sir, but I will ask my Duty Manager now.",
            "I cannot authorise a refund, sir. I will escalate it to my Duty Manager now.",
            "I cannot authorise a refund, sir, but I will ask the manager on duty now.",
          ],
        }),
        {
          ...sp(
            "So do you think my children drank it?",
            "Not at all, sir. It was posted in error, and I would never suggest that.",
            "Phủ nhận ngay và rõ. Không ám chỉ người đi cùng, trẻ em hay khách ở trước.",
          ),
          alsoAccept: ["Not at all, sir. It was posted in error, and I would never say that."],
        },
        sp(
          "Three minibar disputes on the fifth floor this week. What do you make of it?",
          "It looks like a stock problem, not three dishonest guests. I have escalated it to housekeeping with the room numbers.",
          "Báo cáo lên cấp trên, không gọi sir hay madam. Báo mẫu lặp lại, không báo về khách.",
          "manager",
        ),
      ],
      reading: read(
        `FRONT DESK APPROVAL TIERS — WHO SAYS YES
The tiers below are ONE hotel's numbers. Ask your Front Office Manager for yours.
Under 500,000 VND: your Shift Leader approves by phone, and you post the correction.
500,000 to 2,000,000 VND: the Duty Manager approves.
Above 2,000,000 VND, and any refund to a card: the Duty Manager signs.
Never at the desk, at any amount: injury, theft or lost valuables. Escalate them to the Duty Manager at once.
Write the approving name on the folio before you tell the guest it is done.
A disputed minibar charge in the first tier is reversed FIRST and checked afterwards. The guest is not held while we check.
Never suggest that a companion or a child used it. Say "posted in error".
Tell the guest the process and the time, never the number. A guest who learns the limit asks for the amount just below it.`,
        [
          {
            q: "Khoản minibar 200.000 đồng bị tranh chấp. Ai duyệt?",
            options: [
              "Lễ tân tự quyết, không cần hỏi ai",
              "Trưởng ca duyệt qua điện thoại",
              "Phải chờ Duty Manager ký giấy",
            ],
            correct: 1,
            explanation:
              'Bậc đầu ghi "Under 500,000 VND: your Shift Leader approves by phone, and you post the correction."',
          },
          {
            q: "Khách báo bị thương trong phòng tắm và đòi bồi thường. Lễ tân làm gì?",
            options: [
              "Xử lý tại quầy nếu số tiền nhỏ",
              "Chuyển ngay cho Duty Manager, dù số tiền lớn hay nhỏ",
              "Hướng dẫn khách gửi email cho kế toán",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "Never at the desk, at any amount: injury, theft or lost valuables."',
          },
          {
            q: "Vì sao không nói con số hạn mức cho khách?",
            options: [
              "Vì khách sẽ xin đúng mức ngay dưới hạn mức",
              "Vì đó là bí mật kinh doanh của cả tập đoàn khách sạn",
              "Vì con số thay đổi mỗi tháng",
            ],
            correct: 0,
            explanation:
              'Tài liệu ghi "A guest who learns the limit asks for the amount just below it."',
          },
        ],
      ),
      game: [
        game(
          "So you think one of my children drank a two-hundred-thousand-dong beer?",
          "Not at all, sir, and I am sorry. It was posted in error, and my supervisor is removing it now.",
          "Not at all, sir. It was posting in error, and my supervisor is removing it now.",
          "I am only telling you what the system recorded, sir. You could ask your children.",
          undefined,
          "Bị động cần phân từ hai: 'was posted', không phải 'was posting'. Câu 'You could ask your children' đúng ngữ pháp nhưng ám chỉ trẻ em đã dùng — tài liệu cấm đúng điều này.",
        ),
        game(
          "Just take the whole night off my bill and we can forget it.",
          "That is above what I can authorise, madam, so I will escalate it to the Duty Manager now.",
          "That is above what I can authorise, madam, so I will escalating it to the Duty Manager now.",
          "Of course, madam. I will take the night off now, and we can forget it.",
          undefined,
          "Sau 'will' là 'escalate', không phải 'escalating'. Câu 'I will take the night off now' nghe chiều khách nhưng vượt quyền — cả một đêm phòng là việc Duty Manager quyết.",
        ),
      ],
    }),

    L(33, 4, "Closing It in Writing — and Saying Thank You", "Chốt bằng văn bản và cảm ơn khách", {
      vocabulary: [
        c("In writing", "May I confirm that in writing for you?", [
          "/ɪn ˈraɪtɪŋ/",
          "Bằng văn bản",
          "✉️",
        ]),
        c("Case number", "Your case number is on the slip, madam.", [
          "/keɪs ˈnʌmbə/",
          "Mã hồ sơ",
          "🔢",
        ]),
        c("Working days", "A card refund can take up to thirty working days.", [
          "/ˈwɜːkɪŋ deɪz/",
          "Ngày làm việc",
          "📆",
        ]),
        c("On record", "Your complaint is on record, so any colleague can see it.", [
          "/ɒn ˈrekɔːd/",
          "Đã được ghi nhận chính thức",
          "🗃️",
        ]),
        c("Follow up", "I will follow up with you next week either way.", [
          "/ˈfɒləʊ ʌp/",
          "Liên hệ lại, theo dõi tiếp",
          "📞",
        ]),
      ],
      grammar: [
        g(
          "The money will come back sometime.",
          "A card refund can take up to thirty working days, madam, and I will follow up next week either way.",
          "Nói mốc CHẬM NHẤT, không nói mốc nhanh nhất: hứa nhanh rồi trả chậm là tạo khiếu nại thứ hai. 'days' số nhiều sau 'thirty'.",
          "A card refund can take up to thirty working day, madam, and I will follow up next week either way.",
        ),
        g(
          "You can trust me, I will remember.",
          "May I confirm it in writing, sir? Your case number is on the slip.",
          "Tranh chấp tiền thì chốt bằng văn bản: bảo vệ cả khách lẫn mình. Sau 'May I' là động từ nguyên thể.",
          "May I confirming it in writing, sir? Your case number is on the slip.",
        ),
      ],
      speaking: [
        sp(
          "Your colleague said three days. My bank says up to thirty working days. Which is it?",
          t4a,
          "Nói mốc chậm nhất và lý do (ngân hàng của khách). Xin lỗi vì khách được báo sai, không trách đồng nghiệp.",
        ),
        {
          ...sp(
            "Thirty days! And if it still does not appear?",
            t4b,
            "Tự mình chủ động liên hệ lại ('follow up'), không bắt khách phải đuổi theo. Mã hồ sơ đã có sẵn trên phiếu.",
            undefined,
            undefined,
            t4a,
          ),
          alsoAccept: [
            "I will follow up with you myself next week either way, sir, and the case number is on this slip.",
          ],
        },
        sp(
          "Can I have that in writing, please?",
          t4c,
          "Hai lời bảo đảm: 'in writing' cho khách, 'on record' cho cả khách sạn — đồng nghiệp nào cũng thấy.",
          undefined,
          undefined,
          t4b,
        ),
        {
          ...sp(
            "Well, thank you for sorting it out.",
            "Thank you for telling us, madam. It helps us put it right, and I am sorry it happened.",
            "Bước cuối của LAST là cảm ơn: khách phàn nàn đã chỉ cho mình chỗ cần sửa.",
          ),
          alsoAccept: [
            "Thank you for telling us, madam. It helps us to put it right, and I am sorry it happened.",
          ],
        },
        risk({
          ...sp(
            "I slipped in your bathroom this morning. I want compensation.",
            "I am sorry, sir. I am calling first aid and the Duty Manager now, and I will stay with you.",
            "Câu phải đúng của tuần: thương tích không bàn bồi thường ở quầy, không nhận lỗi. Gọi sơ cứu và Duty Manager, ở lại với khách.",
            undefined,
            ["calling", "first", "aid", "duty", "manager", "stay"],
          ),
          alsoAccept: [
            "I am so sorry, sir. I am calling first aid and the Duty Manager now, and I will stay with you.",
            "I am sorry, sir. I will call first aid and the Duty Manager now, and I will stay with you.",
            "I am sorry, sir. I am calling first aid and the manager on duty now, and I will stay with you.",
          ],
        }),
        sp(
          "The guest wants something in writing about the double charge. What do I put?",
          "What was reversed, the amount and the date, plus the case number. Put a copy on file, with no opinion.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Văn bản chỉ ghi sự việc, không ghi nhận xét về khách.",
          "colleague",
        ),
      ],
      reading: read(
        `CLOSING A DISPUTE — WHAT THE GUEST LEAVES WITH
Every settled dispute ends with THREE things before the guest walks away.
1. A clean itemised bill, printed after the correction. If a VAT e-invoice was already issued, call Accounting the same shift for an adjustment invoice.
Tell the guest when that invoice will reach their email.
2. A written confirmation: what was reversed, the amount and the date.
3. A case number, read aloud and written on the slip.
Refund timing: say the SLOWEST case, never the fastest. Cash at the desk is the same day.
A card refund usually takes seven to fifteen working days. A card issued abroad can take up to thirty, because it depends on the guest's own bank.
Set your own follow-up before the guest asks for one.
Then close with thanks. The guest who complained has shown you what to fix.
A guest chased by the hotel tells a different story from a guest who had to chase the hotel.`,
        [
          {
            q: "Khách rời quầy phải cầm theo ba thứ gì?",
            options: [
              "Hoá đơn kê lại, xác nhận bằng văn bản, mã hồ sơ",
              "Biên lai, danh thiếp của quầy và một phiếu ưu đãi cho lần sau",
              "Thư xin lỗi, tiền hoàn và một đêm miễn phí",
            ],
            correct: 0,
            explanation:
              'Tài liệu liệt kê "A clean itemised bill", "A written confirmation" và "A case number, read aloud and written on the slip".',
          },
          {
            q: "Hoàn tiền vào thẻ phát hành ở nước ngoài có thể mất tối đa bao lâu?",
            options: [
              "Ngay trong ngày, giống tiền mặt tại quầy",
              "Đúng ba ngày làm việc với mọi loại thẻ",
              "Tối đa ba mươi ngày làm việc, vì tuỳ ngân hàng của khách",
            ],
            correct: 2,
            explanation:
              'Tài liệu ghi "A card issued abroad can take up to thirty" — vì tuỳ ngân hàng của khách, nên luôn nói mốc chậm nhất.',
          },
          {
            q: "Vì sao kết thúc bằng lời cảm ơn?",
            options: [
              "Vì khách phàn nàn đã chỉ cho mình chỗ cần sửa",
              "Vì quy định bắt buộc phải nói câu đó",
              "Vì khách sẽ chấm điểm cao hơn trên mạng nếu được cảm ơn",
            ],
            correct: 0,
            explanation: 'Tài liệu ghi "The guest who complained has shown you what to fix."',
          },
        ],
      ),
      game: [
        game(
          "I have heard promises like this before, and nothing happened.",
          "Then let me put it in writing, sir. Your case number is on the slip, and I will follow up next week.",
          "I understand, sir, but this time it really will be done properly, I promise you. You can trusting me completely.",
          "I understand, sir, but this time it really will be done properly, I promise you. You can trust me completely.",
          undefined,
          "Hai câu 'I promise you… trust me' đều chỉ là thêm một lời hứa — khách cần văn bản và mã hồ sơ. Câu 'You can trusting me' còn sai: sau 'can' là động từ nguyên thể 'trust'.",
        ),
        game(
          "How fast will the refund reach my card? I need the money.",
          "It can take up to thirty working days, madam, because it depends on your bank.",
          "It can take up to thirty working day, madam, because it depends on your bank.",
          "Usually within three days, madam, so you will have it by the weekend.",
          undefined,
          "'thirty working day' thiếu -s số nhiều. Câu 'within three days' nghe dễ chịu nhưng là mốc nhanh nhất — nếu tiền về chậm, khách sẽ khiếu nại lần hai.",
        ),
      ],
    }),
  ],
};
