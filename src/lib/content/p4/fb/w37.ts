// FB week 37 — Banquet and Event Terms (hand-authored Phase 4, see ../kit.ts).
//
// The matrix gives week 37 to "conditional terms: rates and deadlines", and
// for a restaurant those terms are the private party's: the provisional
// booking, the deposit and the balance, the guaranteed number and its cut-off
// date, cancellation, the minimum spend of the private dining room, corkage on
// the host's own wine, and a special menu such as halal. The old week taught
// children's menus and halal service instead; halal stays, as one of the
// terms of an event.
//
// One set of house terms, the same in every lesson: a provisional booking
// holds the date for a week; a thirty percent deposit confirms it; the
// balance is paid on the evening; the guaranteed number is due three days
// before and is what the host pays for; cancellation needs written notice —
// more than thirty days before, the deposit is refunded in full, within
// thirty days it is non-refundable; refunds are quoted at their LATEST date;
// the private room has a minimum spend of fifteen million dong on Friday and
// Saturday, and any shortfall is charged as room hire.
//
// The floor explains the terms; it never changes them. A waived deposit, a
// lower minimum spend or a deposit moved to a new date is the manager's
// decision, asked for on the host's behalf and answered in writing — the
// week-35 rule ("the menu price does not move at the table") one step on.
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

// ── Lesson 1 — holding the date: deposit and balance ────────────────────────
const t1a = "Certainly, madam. I can hold the date for a week as a provisional booking.";
const t1b =
  "The thirty percent deposit confirms it, madam, and the balance is paid on the evening of the dinner.";
const t1c =
  "If there is no deposit by then, we release the date, madam. I will call you the day before.";

const lesson1 = L(37, 1, "Holding the Date", "Giữ ngày cho bữa tiệc", {
  vocabulary: [
    c("Provisional booking", "A provisional booking holds the room while the host decides.", [
      "/prəˈvɪʒənl ˈbʊkɪŋ/",
      "Đặt chỗ tạm — giữ ngày, chưa đặt cọc",
      "📝",
    ]),
    c("Hold the date", "We can hold the date for a week, free of charge.", [
      "/həʊld ðə deɪt/",
      "Giữ ngày cho khách trong một thời hạn",
      "📆",
    ]),
    c("Balance", "The balance is paid on the evening of the party.", [
      "/ˈbæləns/",
      "Phần tiền còn lại sau khoản cọc",
      "⚖️",
    ]),
    c("Release the date", "If no deposit arrives, we release the date for other guests.", [
      "/rɪˈliːs ðə deɪt/",
      "Trả lại ngày đã giữ cho người khác đặt",
      "🔓",
    ]),
    c("In writing", "Every term goes to the host in writing.", [
      "/ɪn ˈraɪtɪŋ/",
      "Bằng văn bản (email, hợp đồng)",
      "✍️",
    ]),
  ],
  grammar: [
    g(
      "No deposit, no room. That is the rule.",
      "As soon as the deposit arrives, madam, the date is confirmed for you.",
      "Điều kiện + kết quả: 'As soon as' + hiện tại đơn. 'the deposit' số ít nên 'arrives' có -s. Nói điều khách nhận được, không nói như đe doạ.",
      "As soon as the deposit arrive, madam, the date is confirmed for you.",
    ),
    g(
      "You pay thirty percent now, the rest later, OK?",
      "The deposit is thirty percent, sir, and the balance is paid on the evening of the dinner.",
      "Bị động 'is paid' nói điều khoản chung cho mọi khách, không ra lệnh cho riêng ai. Sau 'is' là quá khứ phân từ: paid.",
      "The deposit is thirty percent, sir, and the balance is pay on the evening of the dinner.",
    ),
  ],
  speaking: [
    also(
      sp(
        "We would like your private room on the twentieth. Can you hold it for a week while we decide?",
        t1a,
        "Khách hỏi một tuần thì nhắc lại đúng một tuần. Gọi tên loại đặt chỗ: 'provisional booking' — giữ ngày, chưa cần cọc.",
      ),
      ["Certainly, madam. I can hold the date for one week as a provisional booking."],
    ),
    also(
      sp(
        "And what makes it definite? Your email mentions a thirty percent deposit.",
        t1b,
        "Con số do khách nêu thì được nhắc lại. Hai điều khoản trong một câu: cọc xác nhận ngày, phần còn lại ('balance') trả vào tối tiệc.",
        undefined,
        undefined,
        t1a,
      ),
      [
        "The thirty percent deposit confirms it, madam, and the balance is paid on the evening of the party.",
      ],
    ),
    also(
      sp(
        "What happens if we have not decided by the end of the week?",
        t1c,
        "Câu điều kiện nói hậu quả thật ('release the date'), rồi một việc tử tế của chính bạn: gọi nhắc khách trước một ngày.",
        undefined,
        undefined,
        t1b,
      ),
      [
        "If there is no deposit by then, we release the date, madam. I will call you the day before it ends.",
      ],
    ),
    also(
      sp(
        "Could you skip the deposit? We are a big company, and we always pay.",
        "The deposit is part of our terms, sir. For different terms, I can ask my manager and reply in writing.",
        "Không tự bỏ điều khoản, không nghi ngờ khách. Nói điều khoản là của nhà hàng, rồi việc bạn làm được: hỏi quản lý, trả lời 'in writing'.",
      ),
      [
        "The deposit is part of our terms, sir. For different terms, I can ask my manager and answer you in writing.",
      ],
    ),
    sp(
      "Do we pay the balance before the dinner or after it?",
      "The balance is paid on the evening, madam, together with any drinks you add on the night.",
      "Trả lời đúng câu hỏi trước hay sau: vào tối tiệc. Vế sau báo trước điều khách sẽ thấy trên hoá đơn — không để khách bất ngờ.",
    ),
    sp(
      "Is the company dinner on the twentieth confirmed yet?",
      "Not yet. It is still a provisional booking, and the host has our terms in writing.",
      "Báo cáo lên quản lý: không sir/madam. Trạng thái thật ('provisional booking') và bằng chứng đã gửi điều khoản.",
      "manager",
    ),
  ],
  reading: read(
    `HOLDING A DATE FOR A PRIVATE PARTY — THE HOUSE TERMS
A host who asks for the private dining room usually needs a few days to decide. We can help with that.
A provisional booking holds the date for a week, free of charge. Write the end date on the booking, and tell the host the same day.
A deposit of thirty percent of the estimated total confirms the booking. From that day the date is the host's, and the kitchen can start to plan.
The balance is paid on the evening, with the final bill. Drinks added on the night go on the same bill.
If no deposit has arrived by the end of the week, we release the date, but never in silence. Call the host the day before and say so kindly.
Every term goes to the host in writing. A booking without written terms is a conversation, not a booking.
If a host asks for different terms, such as no deposit, the answer belongs to the manager. Ask on the host's behalf, and reply in writing.`,
    [
      {
        q: "Một provisional booking giữ ngày trong bao lâu?",
        options: [
          "Một tuần, miễn phí, có ghi ngày hết hạn",
          "Ba ngày, có thu một khoản phí giữ chỗ",
          "Tới khi có khách khác hỏi đặt cùng ngày đó",
        ],
        correct: 0,
        explanation:
          "'A provisional booking holds the date for a week, free of charge.' Ngày hết hạn được ghi lên phiếu và báo khách ngay.",
      },
      {
        q: "Điều gì xác nhận chắc chắn bữa tiệc?",
        options: [
          "Một cuộc gọi lại của chủ tiệc trong tuần",
          "Khoản cọc ba mươi phần trăm của tổng chi phí ước tính",
          "Chữ ký của bếp trưởng lên thực đơn tiệc",
        ],
        correct: 1,
        explanation:
          "'A deposit of thirty percent of the estimated total confirms the booking.' Phần còn lại (balance) trả vào tối tiệc.",
      },
      {
        q: "Khách xin không phải đặt cọc thì người nhận đặt tiệc làm gì?",
        options: [
          "Tự đồng ý vì khách là một công ty lớn và uy tín",
          "Từ chối ngay vì điều khoản không bao giờ thay đổi",
          "Hỏi quản lý thay khách, trả lời bằng văn bản",
        ],
        correct: 2,
        explanation:
          "'the answer belongs to the manager. Ask on the host's behalf, and reply in writing.' Không tự đổi điều khoản, cũng không đóng cửa với khách.",
      },
    ],
  ),
  game: [
    round(
      "Can you keep the room for us without a deposit? We just need a few days.",
      "Certainly, madam — a provisional booking holds the date for a week, free of charge.",
      "Certainly, madam — a provisional booking hold the date for a week, free of charge.",
      "Only if you pay something today, madam — otherwise another company may take it from you.",
      "'a provisional booking hold' thiếu -s: chủ ngữ số ít cần 'holds'. Câu đòi trả tiền ngay kẻo mất phòng đúng ngữ pháp nhưng gây áp lực và sai điều khoản — đặt chỗ tạm được giữ miễn phí một tuần. Đáp án nói đúng điều khoản, bằng giọng phục vụ.",
      2,
    ),
    round(
      "The company dinner still has no deposit, and the week is over. What happened?",
      "I called the host yesterday, and I released the date this morning, in writing, as the terms say.",
      "Nothing yet. I gave the date to another party this morning without tell them.",
      "Nothing yet. I gave the date to another party this morning without telling them.",
      "'without tell them' sai: sau giới từ 'without' là V-ing (telling). Cả câu đó lẫn câu đúng ngữ pháp 'I gave the date to another party… without telling them' đều trái điều khoản — không bao giờ trả ngày trong im lặng. Đáp án báo đúng hai việc đã làm, có văn bản.",
      0,
      "manager",
    ),
  ],
});

// ── Lesson 2 — the guaranteed number ─────────────────────────────────────────
const t2a =
  "Then sixty can be your estimate, sir. The guaranteed number comes later, by the cut-off date.";
const t2b =
  "Yes, sir — three days before the dinner. We charge for that number, even if fewer guests come.";
const t2c = "We will seat extra guests if the kitchen can, sir, and they are charged per head.";

const lesson2 = L(37, 2, "The Guaranteed Number", "Số khách đảm bảo", {
  vocabulary: [
    c("Guaranteed number", "The host pays for the guaranteed number, even if fewer guests come.", [
      "/ˌɡærənˈtiːd ˈnʌmbə/",
      "Số khách đảm bảo — số chủ tiệc cam kết trả tiền",
      "🔢",
    ]),
    c("Cut-off date", "The cut-off date for the final number is three days before the event.", [
      "/ˈkʌt ɒf deɪt/",
      "Hạn chốt — ngày cuối cùng được thay đổi",
      "⏳",
    ]),
    c("Per head", "The set menu is priced per head, not per table.", [
      "/pə hed/",
      "Tính theo đầu người",
      "👤",
    ]),
    c("Extra guests", "Extra guests are seated only if the kitchen can cook for them.", [
      "/ˈekstrə ɡests/",
      "Khách đến thêm ngoài số đã chốt",
      "➕",
    ]),
  ],
  grammar: [
    g(
      "Give final number. If less people come, you still pay.",
      "If fewer guests come, sir, we still charge for the guaranteed number.",
      "Câu điều kiện loại 1: If + hiện tại đơn. 'guests' số nhiều nên 'come' không thêm -s. Dùng 'fewer' cho danh từ đếm được.",
      "If fewer guests comes, sir, we still charge for the guaranteed number.",
    ),
    g(
      "Deadline three days. After that, cannot change.",
      "The cut-off date is three days before the dinner, madam. After that, the number is fixed.",
      "Hạn chốt nói bằng 'before' + mốc; kết quả nói bằng bị động 'is fixed' (quá khứ phân từ có -ed).",
      "The cut-off date is three days before the dinner, madam. After that, the number is fix.",
    ),
  ],
  speaking: [
    also(
      sp(
        "We are expecting about sixty people, but some of them may not come.",
        t2a,
        "Con số do khách nêu thì nhắc lại. Phân biệt hai con số: ước tính hôm nay và 'guaranteed number' chốt sau, trước 'cut-off date'.",
      ),
      [
        "Then sixty can be your estimate, sir. The guaranteed number comes later, before the cut-off date.",
      ],
    ),
    also(
      sp(
        "And when is the cut-off date? The contract says three days before.",
        t2b,
        "Xác nhận đúng con số trong hợp đồng khách vừa đọc, rồi điều kiện quan trọng nhất: trả theo số đảm bảo, kể cả khi ít khách hơn.",
        undefined,
        undefined,
        t2a,
      ),
      [
        "Yes, sir — three days before the dinner. We charge for that number, even if fewer guests arrive.",
      ],
    ),
    also(
      sp(
        "And if more people turn up on the night?",
        t2c,
        "Không hứa chỗ cho khách đến thêm: 'if the kitchen can'. Vế sau nói cách tính tiền — 'per head'.",
        undefined,
        undefined,
        t2b,
      ),
      ["We will seat extra guests if the kitchen can, sir, and each one is charged per head."],
    ),
    risk(
      also(
        sp(
          "We guaranteed sixty, but five people cancelled this morning. Can we pay for fifty-five?",
          "The guaranteed number stays at sixty, madam. However, I can ask my manager on your behalf.",
          "Hạn chốt đã qua thì số đảm bảo giữ nguyên — nói rõ một câu. 'However' mở việc bạn làm được: hỏi quản lý thay khách. Không tự bớt.",
          undefined,
          ["manager"],
        ),
        [
          "The guaranteed number stays at sixty, madam. However, I can ask my manager about it on your behalf.",
          "The guaranteed number is still sixty, madam. However, I can ask my manager on your behalf.",
        ],
      ),
    ),
    sp(
      "The Tran party guaranteed sixty. How many places do I set tonight?",
      "Set sixty places, and keep a few extra ready in case extra guests arrive.",
      "Nói với đồng nghiệp: không sir/madam. Bày đúng số đảm bảo, chuẩn bị sẵn vài chỗ — không hứa gì với khách đến thêm.",
      "colleague",
    ),
    sp(
      "Is the price per head the same for the children?",
      "The children's menu has its own price per head, madam. I will put both prices in writing.",
      "Trả lời đúng câu hỏi bằng 'price per head', rồi việc của bạn: mọi con số gửi khách bằng văn bản.",
    ),
  ],
  reading: read(
    `THE GUARANTEED NUMBER — WHY THE KITCHEN NEEDS IT
A party of sixty does not appear from nowhere. The kitchen orders fish, meat and flowers days before the dinner, so it needs one number it can trust.
That number is the guaranteed number. The host gives an estimate at the booking, and the guaranteed number later, by the cut-off date: three days before the dinner.
From the cut-off date, the guaranteed number is what the host pays for, even if fewer guests come. Say this early and kindly, not on the night.
If extra guests arrive, the team seats them if the kitchen can. Each one is charged per head, at the same menu price. Children have their own menu and their own price per head.
A host who misses the cut-off date, or asks to pay for fewer guests, is asking for a decision about money. That decision is the manager's. Offer to ask on the host's behalf, and never promise the answer yourself.
Write the guaranteed number on the booking, with the day the host gave it.`,
    [
      {
        q: "Vì sao bếp cần một con số khách đảm bảo?",
        options: [
          "Để tính trước tiền boa cho nhân viên phục vụ",
          "Vì bếp đặt cá và thịt nhiều ngày trước tiệc",
          "Để sắp xếp chỗ đỗ xe cho khách tới dự tiệc",
        ],
        correct: 1,
        explanation:
          "'The kitchen orders fish, meat and flowers days before the dinner, so it needs one number it can trust.'",
      },
      {
        q: "Sau hạn chốt, chủ tiệc trả tiền theo con số nào?",
        options: [
          "Số khách thực tế có mặt vào tối hôm đó",
          "Số khách ước tính lúc mới bắt đầu đặt chỗ",
          "Số khách đảm bảo",
        ],
        correct: 2,
        explanation:
          "'From the cut-off date, the guaranteed number is what the host pays for, even if fewer guests come.'",
      },
      {
        q: "Chủ tiệc xin trả cho ít khách hơn số đảm bảo. Ai quyết định?",
        options: [
          "Quản lý; người nhận đặt tiệc chỉ hỏi giúp chủ tiệc",
          "Người nhận đặt tiệc, nếu đó là khách quen",
          "Bếp trưởng, vì bếp đã chuẩn bị nguyên liệu",
        ],
        correct: 0,
        explanation:
          "'is asking for a decision about money. That decision is the manager's. Offer to ask on the host's behalf, and never promise the answer yourself.'",
      },
    ],
  ),
  game: [
    round(
      "We guaranteed sixty, but five cannot come now. We only want to pay for fifty-five.",
      "I understand, sir. That is my manager's decision, so may I ask her for you?",
      "Of course, sir — just pay for fifty-five, and I will changing the number in the system myself.",
      "Of course, sir — just pay for fifty-five, and I will change the number in the system myself.",
      "'I will changing' sai: sau 'will' là nguyên mẫu (change). Cả câu đó lẫn câu đúng tiếng Anh 'just pay for fifty-five…' đều tự đổi số trong hệ thống — quyết định về tiền của quản lý. Đáp án thông cảm và chuyển đúng người.",
      1,
    ),
    round(
      "Three extra guests have just arrived for the sixty party. What do I do?",
      "Ask the kitchen first. If they can, we seat them and charge per head.",
      "Ask the kitchen first. If they can, we seats them and charge per head.",
      "Tell them the room is full. The guaranteed number was sixty, and that is final.",
      "'we seats' sai: chủ ngữ 'we' không thêm -s. Câu báo phòng đã đầy đúng ngữ pháp nhưng từ chối khách mà chưa hỏi bếp, giọng cứng. Đáp án theo đúng điều khoản: bếp làm được thì xếp chỗ, tính theo đầu người.",
      0,
      "colleague",
    ),
  ],
});

// ── Lesson 3 — if the party is cancelled ─────────────────────────────────────
const t3a = "No, madam. With two months to go, the deposit is refunded in full.";
const t3b =
  "We need written notice, madam — an email is fine — and I will confirm the day we received it.";
const t3c =
  "Fourteen days is the latest, madam. The refund may reach your card sooner, but never later.";
const t3d =
  "I am sorry, madam. With two weeks to go, the deposit is non-refundable, but what if we move the date?";
const t3e = "My manager decides that, madam. I will ask her today and confirm in writing.";

const lesson3 = L(37, 3, "If the Party Is Cancelled", "Khi bữa tiệc bị huỷ", {
  vocabulary: [
    c("Non-refundable", "Within thirty days of the event, the deposit is non-refundable.", [
      "/ˌnɒn rɪˈfʌndəbl/",
      "Không được hoàn lại",
      "🚫",
    ]),
    c("Written notice", "A cancellation needs written notice, and an email is enough.", [
      "/ˈrɪtn ˈnəʊtɪs/",
      "Thông báo bằng văn bản",
      "📧",
    ]),
    c("Refunded in full", "More than thirty days before, the deposit is refunded in full.", [
      "/rɪˈfʌndɪd ɪn fʊl/",
      "Được hoàn lại toàn bộ",
      "💯",
    ]),
    c("Move the date", "Sometimes it is kinder to move the date than to cancel.", [
      "/muːv ðə deɪt/",
      "Dời ngày tổ chức sang ngày khác",
      "🔁",
    ]),
  ],
  grammar: [
    g(
      "You cancel, you lose your money. Rule.",
      "If you cancel more than thirty days before, madam, the deposit is refunded in full.",
      "Điều khoản huỷ nói bằng câu điều kiện, và nói điều khách ĐƯỢC trước: bị động 'is refunded' cần quá khứ phân từ có -ed.",
      "If you cancel more than thirty days before, madam, the deposit is refund in full.",
    ),
    g(
      "Phone is not OK. Send email.",
      "We need written notice to cancel, sir, so an email to me is perfect.",
      "Nói yêu cầu bằng 'We need', không ra lệnh 'Send', rồi đưa cho khách cách dễ nhất. Chủ ngữ 'We' không thêm -s.",
      "We needs written notice to cancel, sir, so an email to me is perfect.",
    ),
  ],
  speaking: [
    also(
      sp(
        "We may need to cancel. The dinner is still two months away — do we lose the deposit?",
        t3a,
        "Khách nói còn hai tháng thì nhắc lại đúng mốc đó. Tin tốt nói thẳng và trước: 'refunded in full'.",
      ),
      ["No, madam. With two months to go, your deposit is refunded in full."],
    ),
    also(
      sp(
        "And how do we cancel? Is a phone call enough?",
        t3b,
        "Cuộc gọi được đón nhận, nhưng điều khoản cần 'written notice'. Vế cuối là việc của bạn: xác nhận ngày đã nhận email.",
        undefined,
        undefined,
        t3a,
      ),
      [
        "We need written notice, madam — an email is fine — and I will confirm the date we received it.",
      ],
    ),
    also(
      sp(
        "Your email says refunds take up to fourteen days. Is that the earliest or the latest?",
        t3c,
        "Luật hoàn tiền thẻ: luôn nói mốc CHẬM NHẤT. Con số do khách đọc nên được nhắc lại; tiền có thể về sớm hơn, không bao giờ muộn hơn.",
        undefined,
        undefined,
        t3b,
      ),
      [
        "Fourteen days is the latest, madam. The refund may reach your card earlier, but never later.",
      ],
    ),
    also(
      sp(
        "The dinner is in two weeks, but our chairman is ill. Surely you can refund the deposit?",
        t3d,
        "Một câu cảm thông, một câu điều khoản ('non-refundable'), và một lối ra bằng khung What if…? — dời ngày thay vì huỷ.",
      ),
      [
        "I am sorry, madam. With two weeks to go, the deposit is non-refundable, but what if we move the date instead?",
      ],
    ),
    risk(
      also(
        sp(
          "Move it? And would the deposit move with it?",
          t3e,
          "Chuyển khoản cọc sang ngày mới là quyết định về tiền của quản lý. Bạn hứa đúng việc của mình: hỏi hôm nay, trả lời 'in writing'.",
          undefined,
          ["manager"],
          t3d,
        ),
        [
          "My manager decides that, madam. I will ask her today and confirm it in writing.",
          "That is for my manager to decide, madam. I will ask her today and confirm in writing.",
        ],
      ),
    ),
    sp(
      "A host has just emailed to cancel her dinner. What do I do with the email?",
      "Reply today to confirm we received it, and pass it on to the manager with the contract.",
      "Nói với đồng nghiệp: không sir/madam. Hai việc theo thứ tự: trả lời khách trong ngày, rồi 'pass it on' cho quản lý kèm hợp đồng.",
      "colleague",
    ),
  ],
  reading: read(
    `WHEN A PARTY IS CANCELLED
Plans change, and a good cancellation policy is written for the day they do.
A cancellation needs written notice, and an email is enough. A phone call is welcome, but the date on the email is the date that counts. Reply the same day, so the host knows it arrived.
More than thirty days before the event, the deposit is refunded in full. Within thirty days, the deposit is non-refundable, because the room has been held and the kitchen has started to plan.
A refund goes back to the card that paid it. Always give the latest date, never the earliest: "fourteen days at the latest". A refund that arrives early is good news; one that arrives late is a complaint.
A host close to the event often has a better choice than losing the deposit. What if they move the date instead? Whether the deposit can move with it is the manager's decision, so ask on the host's behalf.
Never promise a refund the terms do not give. Sympathy is free; money is the manager's.`,
    [
      {
        q: "Huỷ tiệc thế nào thì được tính là hợp lệ?",
        options: [
          "Gọi điện cho nhà hàng là đủ, không cần gì thêm",
          "Gửi thông báo bằng văn bản; email là được",
          "Nhắn tin cho người phục vụ quen của nhà hàng",
        ],
        correct: 1,
        explanation:
          "'A cancellation needs written notice, and an email is enough… the date on the email is the date that counts.'",
      },
      {
        q: "Khi báo thời gian hoàn tiền về thẻ, nói mốc nào?",
        options: [
          "Mốc chậm nhất: 'muộn nhất mười bốn ngày'",
          "Mốc sớm nhất có thể, cho khách yên lòng",
          "Không nói mốc nào để tránh bị khách bắt lỗi",
        ],
        correct: 0,
        explanation:
          "'Always give the latest date, never the earliest… A refund that arrives early is good news; one that arrives late is a complaint.'",
      },
      {
        q: "Khách sắp tới ngày tiệc muốn huỷ thì nên gợi ý gì?",
        options: [
          "Hứa hoàn lại một nửa khoản cọc cho khách",
          "Khuyên khách vẫn giữ tiệc dù vắng nhiều người",
          "Dời ngày, và hỏi quản lý khoản cọc có được dời theo không",
        ],
        correct: 2,
        explanation:
          "'What if they move the date instead? Whether the deposit can move with it is the manager's decision.' Không hứa hoàn tiền ngoài điều khoản.",
      },
    ],
  ),
  game: [
    round(
      "Can I just cancel over the phone with you now?",
      "Of course you can tell me now, madam. We also need written notice — an email is enough, and I will confirm it.",
      "Of course you can tell me now, madam. We also needs written notice — an email is enough.",
      "No, madam. Phone calls do not count here, so please hang up and write to us instead.",
      "'We also needs' sai: chủ ngữ 'We' không thêm -s. Câu bảo khách cúp máy đúng ngữ pháp nhưng lạnh lùng — cuộc gọi vẫn được đón nhận, chỉ cần thêm văn bản. Đáp án nhận lời khách và nói điều khoản nhẹ nhàng.",
      0,
    ),
    round(
      "The Le family asked when their refund will arrive. What did you tell them?",
      "Fourteen days at the latest, and I said it may come sooner.",
      "Tomorrow morning. I wanted them to feel better, so I promise the earliest date.",
      "Tomorrow morning. I wanted them to feel better, so I promised the earliest date.",
      "'I promise' sai thì: việc đã làm dùng quá khứ 'promised'. Cả câu đó lẫn câu đúng tiếng Anh 'Tomorrow morning… I promised the earliest date' đều hứa mốc sớm nhất — tiền về muộn là khiếu nại mới. Đáp án nói mốc chậm nhất.",
      2,
      "manager",
    ),
  ],
});

// ── Lesson 4 — minimum spend, corkage and the special menu ──────────────────
const t4a =
  "Then the shortfall is charged as room hire, madam, so the total stays at fifteen million.";
const t4b =
  "At least that, madam. However, we can plan the menu and wine so it all goes on your table.";
const t4c =
  "You are welcome to, madam. Corkage is charged per bottle, and I will write it on the event order.";

const lesson4 = L(
  37,
  4,
  "Minimum Spend, Corkage and the Special Menu",
  "Mức chi tối thiểu, phí khui rượu và thực đơn riêng",
  {
    vocabulary: [
      c("Shortfall", "If the bill is below the minimum spend, the shortfall is charged.", [
        "/ˈʃɔːtfɔːl/",
        "Phần còn thiếu so với mức chi tối thiểu",
        "📉",
      ]),
      c("Room hire", "The shortfall is charged as room hire on the final bill.", [
        "/ruːm ˈhaɪə/",
        "Phí thuê phòng",
        "🏛️",
      ]),
      c("Event order", "Every department works from the same event order.", [
        "/ɪˈvent ˈɔːdə/",
        "Phiếu sự kiện — ghi mọi chi tiết đã chốt của bữa tiệc",
        "📄",
      ]),
      c("Halal menu", "The halal menu is ordered by the cut-off date.", [
        "/həˈlɑːl ˈmenjuː/",
        "Thực đơn halal (theo chuẩn của người Hồi giáo)",
        "🌙",
      ]),
    ],
    grammar: [
      g(
        "You spend under fifteen million, you pay the difference. Simple.",
        "If the bill comes under fifteen million, madam, the shortfall is charged as room hire.",
        "Điều kiện về tiền: If + hiện tại đơn ('the bill comes', có -s), rồi gọi đúng tên khoản: shortfall, room hire. Không nói 'you pay' như ra lệnh.",
        "If the bill come under fifteen million, madam, the shortfall is charged as room hire.",
      ),
      g(
        "Halal? OK OK, no pork, no problem.",
        "The chef will confirm the halal menu in writing, sir, and it goes on the event order.",
        "Không tự hứa 'no problem' cho yêu cầu tôn giáo hay ăn kiêng: bếp trưởng xác nhận bằng văn bản. Sau 'will' là động từ nguyên mẫu: confirm.",
        "The chef will confirms the halal menu in writing, sir, and it goes on the event order.",
      ),
    ],
    speaking: [
      also(
        sp(
          "Your private room has a minimum spend of fifteen million. What if we spend less?",
          t4a,
          "Con số do khách nêu thì nhắc lại. Gọi đúng tên hai khoản: 'shortfall' (phần thiếu) và 'room hire' (phí phòng) — nói từ buổi gặp đầu, không để tới hoá đơn.",
        ),
        [
          "Then the shortfall is charged as room hire, madam, so the total is still fifteen million.",
        ],
      ),
      also(
        sp(
          "So we pay fifteen million either way?",
          t4b,
          "Xác nhận ngắn, rồi 'However' biến điều khoản thành lời tư vấn: dồn tiền vào món và rượu thay vì phí phòng.",
          undefined,
          undefined,
          t4a,
        ),
        [
          "At least that, madam. However, we can plan the menu and the wine so it all goes on your table.",
        ],
      ),
      also(
        sp(
          "We would like to bring our own wine. Is that part of the deal?",
          t4c,
          "Nói CÓ trước, điều kiện sau: phí tính theo từng chai, và mọi thứ ghi lên 'event order' trước tối tiệc.",
          undefined,
          undefined,
          t4b,
        ),
        [
          "You are welcome to, madam. Corkage is charged per bottle, and I will put it on the event order.",
        ],
      ),
      risk(
        also(
          sp(
            "Six of our guests eat halal. Can the kitchen do a halal menu for them?",
            "Yes, sir. Please order the halal menu by the cut-off date, and the chef will confirm each dish in writing.",
            "Không tự nói món nào đạt halal: khách đặt trước hạn chốt, bếp trưởng xác nhận TỪNG món bằng văn bản.",
            undefined,
            ["chef"],
          ),
          [
            "Yes, sir. Please order the halal menu by the cut-off date, and the chef will confirm every dish in writing.",
            "Of course, sir. Please order the halal menu by the cut-off date, and the chef will confirm each dish in writing.",
          ],
        ),
      ),
      risk(
        also(
          sp(
            "Can you lower the minimum spend? It is only a small party.",
            "The minimum spend is set by my manager, sir. May I ask her on your behalf?",
            "Mức chi tối thiểu không phải quyền của bạn: nói ai đặt ra nó, rồi xin phép hỏi thay khách. Không tự giảm, không hứa.",
            undefined,
            ["manager"],
          ),
          [
            "The minimum spend is set by my manager, sir. Shall I ask her on your behalf?",
            "My manager sets the minimum spend, sir. May I ask her on your behalf?",
          ],
        ),
      ),
      sp(
        "What goes on the event order for the party on Saturday?",
        "Everything the host agreed: the guaranteed number, the halal menu, the wine and the room hire.",
        "Nói với đồng nghiệp: không sir/madam. Phiếu sự kiện là nơi mọi bộ phận đọc cùng một sự thật — liệt kê đủ những gì chủ tiệc đã đồng ý, nối bằng dấu phẩy và 'and'.",
        "colleague",
      ),
    ],
    reading: read(
      `THE PRIVATE DINING ROOM — WHAT THE HOST AGREES TO
The private dining room has a minimum spend of fifteen million dong on Friday and Saturday evenings. It is not a fee. It is what the room must earn on a busy night.
If food and drinks come to less, the shortfall is charged as room hire. Say this at the first meeting, never for the first time on the bill. Better still, plan the menu and the wine with the host, so the money goes on the table.
A host may bring their own wine. Corkage is charged per bottle and written on the event order before the night.
Special menus, such as a halal menu or a vegetarian table, are ordered by the cut-off date. The chef confirms each dish in writing. Nobody on the floor promises from memory that a dish is halal or safe.
The event order holds everything the host agreed: the guaranteed number, the menu, the wine, the room hire and the deposit. Every department works from it.
A lower minimum spend or a waived fee is the manager's decision. Ask on the host's behalf, and write down the answer.`,
      [
        {
          q: "Tổng chi tiêu thấp hơn mức chi tối thiểu thì sao?",
          options: [
            "Phần còn thiếu được tính là phí thuê phòng",
            "Nhà hàng bỏ qua vì khách đã đặt cọc trước",
            "Khách phải gọi thêm món cho đủ ngay tại bàn",
          ],
          correct: 0,
          explanation:
            "'If food and drinks come to less, the shortfall is charged as room hire. Say this at the first meeting.'",
        },
        {
          q: "Thực đơn halal của bữa tiệc được xác nhận thế nào?",
          options: [
            "Người phục vụ nhớ những món nào không có thịt heo",
            "Khách tự kiểm tra danh sách nguyên liệu từng món",
            "Đặt trước hạn chốt; bếp trưởng xác nhận từng món bằng văn bản",
          ],
          correct: 2,
          explanation:
            "'The chef confirms each dish in writing. Nobody on the floor promises from memory that a dish is halal or safe.'",
        },
        {
          q: "Event order dùng để làm gì?",
          options: [
            "Để quản lý tính lương cho nhân viên phục vụ tiệc",
            "Ghi mọi điều chủ tiệc đã đồng ý",
            "Để in thực đơn đặt trên từng bàn tiệc",
          ],
          correct: 1,
          explanation:
            "'The event order holds everything the host agreed… Every department works from it.'",
        },
      ],
    ),
    game: [
      round(
        "Fifteen million minimum? Can you not just drop it for us this once?",
        "The minimum spend is my manager's to change, sir. Shall I ask her for you right now?",
        "The minimum spend is my manager to change, sir. Shall I asking her for you?",
        "For you, sir, yes. I will drop it quietly, and nobody else needs to know.",
        "'my manager to change… Shall I asking' sai: cần sở hữu cách 'manager's', và sau 'Shall I' là nguyên mẫu (ask). Câu bỏ mức chi tối thiểu 'quietly' đúng ngữ pháp nhưng vượt quyền và biến nó thành bí mật với chính nhà hàng. Đáp án hỏi đúng người.",
        1,
      ),
      round(
        "The host wants halal for six guests. Shall I just tell her the beef dishes are fine?",
        "No — the chef confirms each dish in writing, on the event order.",
        "No — the chef confirm each dish in writing, on the event order.",
        "Yes, beef is always halal here, so there is no need to bother the chef with it.",
        "'the chef confirm' thiếu -s: 'the chef' số ít nên 'confirms'. Câu khẳng định thịt bò luôn đạt halal đúng tiếng Anh nhưng là lời hứa từ trí nhớ về một yêu cầu tôn giáo. Đáp án để bếp trưởng xác nhận bằng văn bản.",
        0,
        "colleague",
      ),
    ],
  },
);

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: giải thích điều khoản tiệc và sự kiện bằng câu điều kiện, tỷ lệ và thời hạn — giữ ngày tạm, cọc ba mươi phần trăm và phần còn lại, số khách đảm bảo và hạn chốt, huỷ bằng văn bản và mốc hoàn tiền chậm nhất, mức chi tối thiểu, phí khui rượu, thực đơn halal — và chuyển mọi yêu cầu đổi điều khoản tới quản lý, trả lời bằng văn bản.",
  title: { en: "Banquet and Event Terms", vi: "Điều khoản tiệc và sự kiện" },
};
