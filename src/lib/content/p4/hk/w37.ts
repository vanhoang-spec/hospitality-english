// HK week 37 — Service Terms, With Conditions (see ../kit.ts).
//
// The shared Phase 4 title for this week is B2B negotiation; a room attendant
// never sells a contract, so the matrix gives Housekeeping its own week 37:
// the conditional terms of the floor's own services — the long-stay plan, the
// Do Not Disturb sign, lost property and laundry. The language is the week's:
// a condition (if / unless / as long as / once), a rate (per item, every
// second day) and a deadline (by ten, within four hours, for six months).
//
// Rewritten whole. The old week offered a guest a room move on the spot (a
// move is the front desk's: you ask, you do not allocate), sent an item by
// courier before the guest had described it, and sent an attendant back into
// a room still being aired after pest treatment. Every term here is the one
// the earlier weeks already taught:
//
//  · Sheets every second day, daily on request, no charge (the eco
//    programme). A room may skip a day, never two in a row.
//  · Do Not Disturb is respected and watched: still up at three, the room is
//    telephoned; no answer, the supervisor and Security look in together.
//  · Lost property: described first, identity checked, written permission
//    for anyone else; courier at the guest's cost; cash, passports and
//    medicine are never posted. The floor hands in and logs; the office
//    releases.
//  · Laundry: by ten, back the same evening; express within four hours with
//    the printed surcharge; the hotel's liability is the limit on the list.
import type { GameRound } from "../../week-content";
import { g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("HK");
const L = lessonsFor("HK");

/** One arcade round: the right answer at `at`, one broken-English option
 *  (`form`) and one well-formed option that is wrong for the job
 *  (`register`), with the reason each wrong one is wrong. */
const round = (
  at: 0 | 1 | 2,
  prompt: string,
  answer: string,
  form: string,
  register: string,
  explanation: string,
  role?: GameRound["speakerRole"],
): GameRound => {
  const options: GameRound["options"] = [
    { text: form, correct: false, kind: "form" },
    { text: register, correct: false, kind: "register" },
  ];
  options.splice(at, 0, { text: answer, correct: true, kind: "answer" });
  return { ...(role ? { speakerRole: role } : {}), prompt, options, explanation };
};

// ── Lesson 1 — the long-stay plan ─────────────────────────────────────────
const t1a =
  "Not every day, madam. A long-stay guest can choose light service on some days, as long as someone looks in every second day.";
const t1b =
  "Fresh towels, empty bins and fresh water, madam, but the sheets stay. It takes about ten minutes.";
const t1c =
  "Your sheets are changed every second day, madam, or daily if you ask, and there is no charge.";

// ── Lesson 2 — Do Not Disturb, with conditions ────────────────────────────
const t2a = "Not at all, sir. We respect the sign, and nobody comes in while it is up.";
const t2b =
  "If it is still up at three, we telephone the room. If nobody answers, my supervisor checks it with Security.";
const t2c =
  "It is for your safety and your privacy, sir. Nobody ever goes into a room alone in that case.";

const lesson1 = L(37, 1, "The Long-Stay Plan", "Lịch dọn cho khách ở dài ngày", {
  vocabulary: [
    c(
      "Long-stay guest",
      "A long-stay guest can choose a lighter plan, but never a week with nobody looking in.",
      ["/ˌlɒŋ ˈsteɪ ˈɡest/", "Khách lưu trú dài ngày — thường từ một tuần trở lên", "🧳"],
    ),
    c("Light service", "Light service is towels, bins and water, and it takes about ten minutes.", [
      "/ˈlaɪt ˌsɜːvɪs/",
      "Lượt dọn nhẹ — khăn, rác, nước uống, không thay ga",
      "🪶",
    ]),
    c("Deep clean", "A deep clean happens once a week, at a morning the guest chooses.", [
      "/ˌdiːp ˈkliːn/",
      "Lượt dọn kỹ toàn bộ phòng, khoảng một giờ",
      "🧽",
    ]),
    c("As long as", "A room may skip a day, as long as someone looks in the next day.", [
      "/əz ˈlɒŋ əz/",
      "Miễn là, với điều kiện là",
      "🔗",
    ]),
  ],
  grammar: [
    g(
      "Long stay, no cleaning every day. Hotel rule.",
      "You can have light service on some days, as long as someone looks in every second day.",
      "'as long as' + mệnh đề ở hiện tại đơn nêu ĐIỀU KIỆN của lời đồng ý. Chủ ngữ 'someone' số ít nên động từ thêm -s: someone looks.",
      "You can have light service on some days, as long as someone look in every second day.",
    ),
    g(
      "Deep clean? One hour. You go out.",
      "A deep clean takes about an hour, madam. Which morning would suit you?",
      "Nêu thời lượng bằng hiện tại đơn (a deep clean takes), rồi trả quyền chọn giờ cho khách bằng một câu hỏi. Chủ ngữ số ít cần 'takes'.",
      "A deep clean take about an hour, madam. Which morning would suit you?",
    ),
  ],
  speaking: [
    {
      ...sp(
        "We are here for a whole month. Does someone have to come in every single day?",
        t1a,
        "Đồng ý có điều kiện: phần khách được chọn, rồi 'as long as' + điều không đổi. 'Long-stay guest' /ˌlɒŋ ˈsteɪ ˈɡest/ — ba trọng âm đều nhau.",
      ),
      alsoAccept: [
        "No, madam. A long-stay guest can choose light service on some days, as long as someone looks in every second day.",
        "Not every day, madam. A long-stay guest can choose light service on some days, as long as someone looks in every other day.",
      ],
    },
    sp(
      "What is a light service, exactly?",
      t1b,
      "Kể đúng ba thứ có trong lượt dọn nhẹ, một thứ không có, và thời lượng. Không cần giải thích thêm.",
      undefined,
      undefined,
      t1a,
    ),
    {
      ...sp(
        "And the sheets? I do not want them left for a week.",
        t1c,
        "Cùng một luật với chương trình xanh: cách một ngày, hoặc mỗi ngày nếu khách xin, không tính phí. Bị động 'are changed' — giữ đuôi -ed.",
        undefined,
        undefined,
        t1b,
      ),
      alsoAccept: [
        "Your sheets are changed every other day, madam, or daily if you ask, and there is no charge.",
      ],
    },
    sp(
      "Could you do a proper deep clean once a week, at a time that suits us?",
      "Yes, madam. A deep clean is once a week and takes about an hour. Which morning would suit you?",
      "Một tần suất, một thời lượng, rồi một câu hỏi để khách chọn buổi. 'Deep clean' — nhấn ở 'clean'.",
    ),
    sp(
      "1508 is on light service today. What do I skip, and what do I do?",
      "Skip the sheets, but do the towels, the bins and the water, and put the visit on your room report.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Lượt dọn nhẹ vẫn là một lượt vào phòng, nên vẫn có một dòng trên báo cáo phòng.",
      "colleague",
    ),
    {
      ...sp(
        "We will be away in Hanoi for three nights. Must you still come in?",
        "We look in every second day while you are away, sir, but nothing of yours is moved.",
        "Điều kiện an toàn không đổi khi khách đi vắng: vẫn có người ghé phòng cách một ngày. Rồi một lời yên tâm bạn giữ được: đồ của khách để nguyên.",
      ),
      alsoAccept: [
        "We look in every other day while you are away, sir, but nothing of yours is moved.",
      ],
    },
  ],
  reading: read(
    `THE LONG-STAY PLAN — WHAT CHANGES AND WHAT DOES NOT
A guest staying a week or more may choose a lighter plan. The plan changes the visits, never the standard and never the safety checks.
Full service is the daily clean. Light service is fresh towels, empty bins and fresh water, and it takes about ten minutes.
Sheets are changed every second day, on departure, and daily whenever the guest asks. There is no charge either way.
A deep clean happens once a week and takes about an hour. The guest chooses the morning, and you write it on the guest profile the same day.
A room may skip a day at the guest's request, as long as someone looks in the next day. After two days with no entry, your supervisor arranges a check.
While a guest is away for a few nights, the room is still looked in on every second day. Nothing of the guest's is moved, and the visit goes on the room report.
Never promise a guest that nobody will enter for a week. That is the one condition the plan cannot drop.
The details above are one hotel's. Ask your Executive Housekeeper what your long-stay plan includes.`,
    [
      {
        q: "Khách ở dài ngày xin không ai vào dọn trong cả tuần thì sao?",
        options: [
          "Đồng ý không vào phòng cả tuần, vì đó là quyền của khách lưu trú dài",
          "Được bỏ vài ngày, miễn có người ghé kiểm tra cách một ngày",
          "Từ chối; phòng nào cũng phải dọn đầy đủ mỗi ngày",
        ],
        correct: 1,
        explanation:
          "'A room may skip a day… as long as someone looks in the next day… Never promise a guest that nobody will enter for a week' — lịch thì đổi được, kiểm tra an toàn thì không.",
      },
      {
        q: "Light service gồm những gì?",
        options: [
          "Khăn sạch, đổ rác và nước uống, không thay ga",
          "Thay toàn bộ ga gối, khăn và đồ dùng phòng tắm",
          "Chỉ gõ cửa hỏi khách có cần gì thêm không",
        ],
        correct: 0,
        explanation:
          "'Light service is fresh towels, empty bins and fresh water' — ga giường đi theo lịch riêng: cách một ngày, hoặc mỗi ngày nếu khách xin.",
      },
      {
        q: "Ga giường của khách ở dài ngày được thay thế nào?",
        options: [
          "Mỗi tuần một lần, cùng với lượt dọn kỹ",
          "Cách một ngày, hoặc mỗi ngày nếu khách xin, không tính phí",
          "Mỗi ngày một lần, và tính thêm phí giặt là cho phần vượt định mức",
        ],
        correct: 1,
        explanation:
          "'Sheets are changed every second day, on departure, and daily whenever the guest asks. There is no charge either way' — cùng luật với chương trình xanh.",
      },
    ],
  ),
  game: [
    round(
      1,
      "Can we skip cleaning for the whole week? We hate being disturbed.",
      "We can skip some days, madam, as long as someone looks in every second day.",
      "We can skip some days, madam, as long as someone look in every second day.",
      "Of course, madam — nobody will come in at all until you check out, whatever happens.",
      "Phương án 'nobody will come in at all until you check out' hứa đúng điều không ai được hứa — một căn phòng không ai vào quá hai ngày là rủi ro an toàn. Phương án 'someone look in' sai: chủ ngữ số ít cần 'looks'. Câu đúng đồng ý có điều kiện.",
    ),
    round(
      0,
      "1508 is a long-stay room on light service. Shall I change the sheets anyway?",
      "No, leave them. Light service means towels, bins and water. The sheets are done every second day.",
      "No, light service mean towels, bins and water. The sheets are done every second day.",
      "Yes, change everything every day — long-stay guests never notice the difference anyway.",
      "Phương án 'never notice the difference' coi nhẹ điều khách đã chọn và làm sai kế hoạch đã ghi. Phương án 'light service mean' sai: chủ ngữ số ít cần 'means'. Câu đúng nhắc lại đúng điều kiện của gói.",
      "colleague",
    ),
  ],
});

const lesson2 = L(
  37,
  2,
  "Do Not Disturb, With Conditions",
  "Biển Do Not Disturb và các điều kiện",
  {
    vocabulary: [
      c("Unless", "Nobody goes in while the sign is up, unless the guest calls us.", [
        "/ənˈles/",
        "Trừ khi",
        "🚧",
      ]),
      c("Look in", "If a room has had no entry for two days, my supervisor will look in.", [
        "/ˌlʊk ˈɪn/",
        "Ghé vào xem qua một căn phòng, vì an toàn",
        "👀",
      ]),
      c("Privacy", "A guest's privacy is respected, and so is the guest's safety.", [
        "/ˈprɪvəsi/",
        "Sự riêng tư",
        "🔏",
      ]),
      c("In a row", "Two days in a row with no entry means a check, sign or no sign.", [
        "/ɪn ə ˈrəʊ/",
        "Liên tiếp",
        "📆",
      ]),
    ],
    grammar: [
      g(
        "Sign on the door three days. We must go in now.",
        "If the sign is still up at three, we telephone the room first.",
        "Câu điều kiện cho một quy trình: If + hiện tại đơn, mệnh đề chính cũng hiện tại đơn. Chủ ngữ 'we' không thêm -s.",
        "If the sign is still up at three, we telephones the room first.",
      ),
      g(
        "Nobody come in. Unless emergency.",
        "Nobody comes in while the sign is up, unless you call us, sir.",
        "'Nobody' là chủ ngữ số ít: nobody comes. 'unless' = trừ khi — sau nó là một mệnh đề đủ chủ ngữ và động từ (unless you call us), không phải một danh từ trơ.",
        "Nobody come in while the sign is up, unless you call us, sir.",
      ),
    ],
    speaking: [
      sp(
        "We keep the sign on the door most of the day. Is that a problem?",
        t2a,
        "Trả lời 'Not at all' trước, rồi điều khách cần nghe: biển được tôn trọng. Điều kiện kiểm tra để dành cho câu sau, khi khách hỏi.",
      ),
      {
        ...sp(
          "Never? Even if it stays up for days?",
          t2b,
          "Hai câu điều kiện nối nhau, mỗi câu một mốc: ba giờ chiều thì gọi phòng; không ai nghe thì giám sát cùng An ninh. Không bao giờ là bạn một mình.",
          undefined,
          undefined,
          t2a,
        ),
        alsoAccept: [
          "If it is still up at three, we call the room. If nobody answers, my supervisor checks it with Security.",
        ],
      },
      sp(
        "Why Security? That sounds rather alarming.",
        t2c,
        "Nêu lý do bằng hai danh từ khách quý: an toàn và riêng tư. 'Privacy' /ˈprɪvəsi/ — nhấn âm tiết đầu.",
        undefined,
        undefined,
        t2b,
      ),
      risk({
        ...sp(
          "Please do not come in for the next three days. We want total privacy.",
          "Of course, sir, for today. However, after two days in a row, someone must look in for your safety.",
          "Đồng ý cho HÔM NAY, rồi 'However' + điều kiện an toàn không đổi. 'In a row' /ɪn ə ˈrəʊ/ — đọc liền ba từ.",
        ),
        alsoAccept: [
          "Of course, sir, for today. However, after two days in a row, somebody must look in for your safety.",
          "Certainly, sir, for today. However, after two days in a row, someone must look in for your safety.",
        ],
      }),
      {
        ...sp(
          "Ms Lan here. Why has 1207 had no service since Monday?",
          "The sign has been up two days in a row, Ms Lan, and nobody answers the phone. Could you arrange a check with Security?",
          "Báo cấp trên: gọi tên một lần, không kính ngữ. Hai sự việc có mốc, rồi một đề nghị — kiểm tra là việc của giám sát và An ninh, không phải của bạn.",
          "manager",
        ),
        alsoAccept: [
          "The sign has been up two days in a row, Ms Lan, and nobody answers the phone. Can you arrange a check with Security?",
        ],
      },
      sp(
        "1410 has the sign up, but the guest asked for towels. Can I go in quickly?",
        "No. Nobody goes in while the sign is up, unless the guest calls us. Ring the room instead.",
        "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. 'Unless' /ənˈles/ — nhấn âm tiết hai. Khách vẫn cần khăn thì gọi điện, không vào.",
        "colleague",
      ),
    ],
    reading: read(
      `THE SIGN ON THE DOOR — WHAT IT MEANS, AND FOR HOW LONG
While a Do Not Disturb sign is up, nobody comes in, unless the guest calls us. Nothing is slipped under the door after six in the evening.
The sign is respected, but it is watched. If it is still up at three in the afternoon, the room is telephoned. If nobody answers, your supervisor and Security look in together. You never do that check alone.
A room may go a day without service at the guest's request. After two days in a row with no entry, your supervisor arranges a check, sign or no sign.
Guests can ask for total privacy, and they should have it for the day. They cannot be promised a week with nobody entering.
A guest who keeps the sign up and still wants towels is called, not visited. Bring the towels when the door opens.
Write every room you could not enter on the room report, with the hour you last knocked. A clock nobody writes down does not survive a change of shift.
Most guests who use the sign are simply sleeping or working. The check exists for the few who are not, and it protects you as much as them.
Your own hotel's hours may differ from these. Ask your Floor Supervisor.`,
      [
        {
          q: "Biển DND vẫn treo lúc ba giờ chiều thì làm gì trước?",
          options: [
            "Gọi điện vào phòng",
            "Mở hé cửa nhìn vào thật nhanh",
            "Chờ tới sáng hôm sau rồi mới hỏi giám sát",
          ],
          correct: 0,
          explanation:
            "'If it is still up at three in the afternoon, the room is telephoned' — gọi điện trước, và chỉ khi không ai nghe máy mới tới bước kiểm tra.",
        },
        {
          q: "Gọi vào phòng mà không ai nghe máy thì ai vào kiểm tra?",
          options: [
            "Nhân viên phụ trách tầng, vào một mình cho nhanh",
            "Giám sát tầng cùng với An ninh",
            "Không ai cả, cho tới khi khách tự gọi xuống",
          ],
          correct: 1,
          explanation:
            "'your supervisor and Security look in together. You never do that check alone' — hai người bảo vệ cả khách lẫn nhân viên.",
        },
        {
          q: "Khách xin không ai vào phòng trong cả tuần thì sao?",
          options: [
            "Được cho hôm nay; quá hai ngày liền phải có người ghé",
            "Được, vì khách có quyền riêng tư tuyệt đối trong phòng của mình",
            "Không được; phòng phải dọn đủ mỗi ngày dù khách ở hay đi",
          ],
          correct: 0,
          explanation:
            "'they should have it for the day. They cannot be promised a week with nobody entering' — riêng tư cho hôm nay, an toàn cho cả tuần.",
        },
      ],
    ),
    game: [
      round(
        2,
        "Can you slip the fresh towels under the door tonight? Our sign is up.",
        "I am sorry, madam, nothing goes under a door at night. May I bring them when you take the sign down?",
        "Nothing goes under a door at night, madam. May I bringing them when you take the sign down?",
        "Of course, madam — I will open the door very quietly and leave them on the chair inside.",
        "Phương án 'open the door very quietly' vào một phòng đang treo biển — đúng điều không ai được làm. Phương án 'May I bringing' sai: sau 'may I' là động từ nguyên mẫu. Câu đúng giữ luật và hẹn một thời điểm khách tự chọn.",
      ),
      round(
        1,
        "Ms Lan here. 1207 has had the sign up since yesterday, and nobody answers. What do you suggest?",
        "Could you look in with Security, Ms Lan? I will wait in the corridor.",
        "Could you looks in with Security, Ms Lan? I will wait in the corridor.",
        "I will go in alone and check it quickly, Ms Lan, so that we do not have to bother Security.",
        "Phương án 'go in alone' làm đúng việc không bao giờ được làm một mình. Phương án 'Could you looks' sai: sau 'could you' là động từ nguyên mẫu. Câu đúng đưa việc kiểm tra về đúng hai người có thẩm quyền.",
        "manager",
      ),
    ],
  },
);

// ── Lesson 3 — lost property, with conditions ─────────────────────────────
const t3a =
  "I will check the lost item log for you now, madam. Could you describe the watch for me first?";
const t3b =
  "The office can send it by courier at your cost, madam, once they have your proof of identity.";
const t3c = "Valuables are kept for six months, madam, so there is plenty of time to arrange it.";

// ── Lesson 4 — laundry terms ──────────────────────────────────────────────
const t4a = "The cut-off time is ten, sir, so if it goes now, it comes back this evening.";
const t4b = "Pressing is charged per item, sir, and the price is printed on the laundry list.";
const t4c =
  "Anything marked dry clean only on the care label goes for dry cleaning, at its own price on the list.";

const lesson3 = L(37, 3, "Lost Property, With Conditions", "Đồ thất lạc và điều kiện trả lại", {
  vocabulary: [
    c("Describe", "A guest must describe an item before anybody hands it back.", [
      "/dɪˈskraɪb/",
      "Mô tả — khách tự nói món đồ trông thế nào",
      "🗣️",
    ]),
    c("Proof of identity", "The office checks proof of identity before an item leaves the log.", [
      "/ˈpruːf əv aɪˈdentəti/",
      "Giấy tờ tuỳ thân",
      "🪪",
    ]),
    c("Courier", "A courier can send an item home, at the guest's cost.", [
      "/ˈkʊriə/",
      "Dịch vụ chuyển phát",
      "📦",
    ]),
    c(
      "Written permission",
      "A friend who collects an item needs written permission from the guest.",
      ["/ˈrɪtn pəˈmɪʃn/", "Giấy cho phép bằng văn bản", "📝"],
    ),
    c(
      "Release",
      "We release an item only to the guest, or to someone the guest names in writing.",
      ["/rɪˈliːs/", "Giao trả món đồ cho người nhận", "🔓"],
    ),
  ],
  grammar: [
    g(
      "Prove it is yours.",
      "Could you describe it for me first, madam? Then the office can check it against the log.",
      "Xin khách mô tả bằng một câu hỏi lịch sự, rồi nói lý do bằng một việc. Sau 'could you' là động từ nguyên mẫu: could you describe.",
      "Could you describing it for me first, madam? Then the office can check it against the log.",
    ),
    g(
      "Your friend? No. Rules.",
      "We can release it only to the guest, sir, or to you with written permission from her.",
      "Nêu điều kiện thay vì nói 'không': chỉ trao cho ai, và trong trường hợp nào thì được. 'Written' là phân từ hai của 'write', dùng như tính từ: written permission.",
      "We can release it only to the guest, sir, or to you with write permission from her.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "I think I left my watch in room 508. We checked out this morning.",
        t3a,
        "Nhận việc ngay, rồi xin khách mô tả TRƯỚC — không đọc cho khách nghe trong sổ có gì. 'Describe' /dɪˈskraɪb/ — nhấn âm tiết hai.",
      ),
      alsoAccept: [
        "I will check the lost item log for you now, madam. Would you describe the watch for me first?",
      ],
    },
    sp(
      "It is gold, with a brown leather strap. Can you post it to me in Singapore?",
      t3b,
      "Một câu nói đủ ba điều: ai gửi (văn phòng, không phải bạn hứa), ai trả phí, và gửi khi nào — sau khi đã kiểm giấy tờ. 'Courier' /ˈkʊriə/ — hai âm tiết, không đọc thành 'cu-ri-ơ'.",
      undefined,
      undefined,
      t3a,
    ),
    sp(
      "And how long will you keep it, if I cannot arrange that this week?",
      t3c,
      "Một thời hạn rõ ràng làm khách yên tâm hơn mọi lời hứa. Bị động 'are kept' — giữ đuôi -ed.",
      undefined,
      undefined,
      t3b,
    ),
    risk({
      ...sp(
        "My friend stayed here last week and left her phone. I have come to collect it for her.",
        "We can release it only with written permission from your friend, madam. May I give you the form for her?",
        "Đồ của khách chỉ trao cho chính khách, hoặc người khách cho phép bằng văn bản. Từ chối bằng điều kiện, rồi đưa lối đi tiếp. 'Release' /rɪˈliːs/.",
      ),
      alsoAccept: [
        "We can only release it with written permission from your friend, madam. May I give you the form for her?",
        "I am afraid we can release it only with written permission from your friend, madam. May I give you the form for her?",
      ],
    }),
    risk({
      ...sp(
        "Just show me the box of sunglasses, and I will pick out mine.",
        "I am sorry, sir, I cannot show you the box. Could you describe yours, and I will check the log?",
        "Không bao giờ đưa kệ hay hộp đồ thất lạc cho khách tự chọn — đồ của người khác cũng nằm trong đó. Xin khách mô tả, rồi bạn tự kiểm sổ.",
      ),
      alsoAccept: [
        "I am sorry, sir, I am not able to show you the box. Could you describe yours, and I will check the log?",
        "I am afraid I cannot show you the box, sir. Could you describe yours, and I will check the log?",
      ],
    }),
    {
      ...sp(
        "I found some cash under the bed in 812 after checkout. What do I do with it?",
        "Leave it as found and call the supervisor. Cash goes into a sealed bag with two signatures.",
        "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Tiền không bao giờ đếm một mình — để nguyên, gọi giám sát, túi niêm phong và hai chữ ký.",
        "colleague",
      ),
      alsoAccept: [
        "Leave it as found and call your supervisor. Cash goes into a sealed bag with two signatures.",
      ],
    },
  ],
  reading: read(
    `LOST PROPERTY — HOW LONG, TO WHOM, AND HOW
Anything found in a room after a departure is handed in the same shift, however small. Nothing stays on a trolley overnight.
The log records the room, the date, the time, where the item was found and who found it.
Cash, jewellery, phones and passports go into a sealed bag signed by two people. Nobody counts cash alone.
Valuables are kept for six months and ordinary items for three. Food and opened toiletries are thrown away the same day.
An item is released only when the guest can describe it without help. Never show a guest the shelf or the box and ask which one is theirs.
The office also checks proof of identity before anything leaves. A friend, a driver or a family member needs written permission from the guest.
A guest who has already left can have an item sent by courier, at the guest's cost, once the description and the identity are checked. Cash, passports and medicine are never posted.
The attendant's part is short: hand it in, log it, and never promise a guest that it will be sent. That promise belongs to the office.
Your hotel's storage periods may differ. Ask your Executive Housekeeper.`,
    [
      {
        q: "Khách muốn nhận lại đồ để quên thì bước đầu tiên là gì?",
        options: [
          "Cho khách xem kệ đồ thất lạc để khách tự chọn",
          "Mời khách tự mô tả món đồ, không gợi ý",
          "Đưa ngay món đồ mà khách vừa chỉ tay vào",
        ],
        correct: 1,
        explanation:
          "'released only when the guest can describe it without help. Never show a guest the shelf or the box' — trên kệ còn có đồ của khách khác.",
      },
      {
        q: "Bạn của khách tới nhận hộ thì cần gì?",
        options: [
          "Giấy cho phép bằng văn bản của chính vị khách",
          "Chỉ cần mô tả đúng món đồ là đủ để nhận",
          "Số phòng, ngày trả phòng và tên đầy đủ của vị khách đó",
        ],
        correct: 0,
        explanation:
          "'A friend, a driver or a family member needs written permission from the guest' — mô tả đúng chưa chứng minh được ai là chủ.",
      },
      {
        q: "Món nào KHÔNG bao giờ được gửi qua chuyển phát?",
        options: [
          "Kính mát, sạc điện thoại và áo khoác mỏng",
          "Quần áo và sách",
          "Tiền mặt, hộ chiếu và thuốc",
        ],
        correct: 2,
        explanation:
          "'Cash, passports and medicine are never posted' — những thứ còn lại gửi được, khi khách đã mô tả và giấy tờ đã được kiểm.",
      },
    ],
  ),
  game: [
    round(
      0,
      "That is my bag, the black one on your shelf. Just hand it over, please.",
      "Of course, madam. Could you describe what is inside it first? Then we can release it.",
      "Of course, madam. Could you describe what is inside it first? Then we can released it.",
      "Here you are, madam — it must be yours, since you pointed straight at it on the shelf.",
      "Phương án 'it must be yours, since you pointed' trao đồ cho người chỉ tay — đúng cách đồ của khách này đến tay người khác. Phương án 'can released' sai: sau 'can' là động từ nguyên mẫu. Câu đúng giữ điều kiện mô tả trước.",
    ),
    round(
      2,
      "My medicine is in the bedside drawer. Can you post it to me in Seoul?",
      "I am afraid we never post medicine, madam. May I ask the office to call you about another way?",
      "I am afraid we never posts medicine, madam. May I ask the office to call you about another way?",
      "Of course, madam — I will post it to you this afternoon, and you can pay the courier later.",
      "Phương án 'I will post it… this afternoon' vừa gửi thuốc — thứ không bao giờ gửi — vừa hứa thay văn phòng. Phương án 'we never posts' sai: chủ ngữ 'we' không thêm -s. Câu đúng nêu điều kiện và chuyển cho đúng nơi.",
    ),
  ],
});

const lesson4 = L(37, 4, "Laundry Terms", "Điều kiện giặt là", {
  vocabulary: [
    c("Cut-off time", "The cut-off time for same-evening laundry is ten in the morning.", [
      "/ˈkʌt ɒf ˌtaɪm/",
      "Giờ chót nhận đồ để kịp trả trong ngày",
      "⏰",
    ]),
    c("Per item", "Pressing is charged per item, at the price printed on the list.", [
      "/pər ˈaɪtəm/",
      "Tính theo từng món",
      "🏷️",
    ]),
    c("Care label", "Read the care label before anything goes into the laundry bag.", [
      "/ˈkeə ˌleɪbl/",
      "Nhãn hướng dẫn giặt may trên quần áo",
      "🔖",
    ]),
    c("Dry cleaning", "A dress marked dry clean only goes for dry cleaning, at its own price.", [
      "/ˌdraɪ ˈkliːnɪŋ/",
      "Giặt khô",
      "👗",
    ]),
  ],
  grammar: [
    g(
      "After ten, too late. Tomorrow.",
      "If it goes after ten, it comes back tomorrow evening, or today by express.",
      "Câu điều kiện cho một quy định: If + hiện tại đơn (it goes), KHÔNG dùng 'will' trong vế 'if'. Nêu luôn lựa chọn thứ hai sau 'or'.",
      "If it will go after ten, it comes back tomorrow evening, or today by express.",
    ),
    g(
      "Pressing cost money. Each one.",
      "Pressing is charged per item, madam, and each price is on the list.",
      "Bị động 'is charged' nói về cách tính phí, không nói như thể bạn đòi tiền khách. Giữ đuôi -ed. Giá đọc từ phiếu, không đọc thuộc lòng.",
      "Pressing is charge per item, madam, and each price is on the list.",
    ),
  ],
  speaking: [
    sp(
      "If I give you this shirt now, when will I get it back?",
      t4a,
      "Điều kiện và mốc giờ trong một câu: giờ chót trước, rồi điều đó nghĩa là gì cho chiếc áo của khách. 'Cut-off time' — nhấn ở chữ cut.",
    ),
    {
      ...sp(
        "And if I only need it pressed, not washed?",
        t4b,
        "Một cách tính phí, rồi chỉ vào chỗ in giá — không đọc con số từ trí nhớ. 'Per item' /pər ˈaɪtəm/ — đọc nối.",
        undefined,
        undefined,
        t4a,
      ),
      alsoAccept: ["Pressing is charged per item, sir, and the price is on the laundry list."],
    },
    sp(
      "Good. Is there anything you will not take?",
      t4c,
      "Đọc nhãn trước khi nhận: 'care label' quyết định đồ đi giặt nước hay giặt khô. 'Dry cleaning' — nhấn ở 'clean'.",
      undefined,
      undefined,
      t4b,
    ),
    {
      ...sp(
        "It is half past ten. Can this dress still come back today?",
        "Only by express, madam: back within four hours, with the surcharge printed on the list.",
        "Quá giờ chót thì chỉ còn dịch vụ nhanh — nói thời hạn và chỉ vào phụ phí in sẵn. Không hứa giờ nào nhanh hơn phiếu in.",
      ),
      alsoAccept: [
        "Only by express, madam: it comes back within four hours, with the surcharge printed on the list.",
      ],
    },
    {
      ...sp(
        "This silk jacket was very expensive. If you ruin it, will you pay the full price?",
        "I cannot promise that, madam. The hotel covers up to the limit printed on this list, and we note its condition together first.",
        "Không hứa đền toàn bộ, cũng không đọc con số nào ngoài con số in trên phiếu khách sẽ ký. Rồi bước lắng nghe: kiểm và ghi tình trạng cùng khách.",
      ),
      alsoAccept: [
        "I am not able to promise that, madam. The hotel covers up to the limit printed on this list, and we note its condition together first.",
        "I cannot promise that, madam, but the hotel covers up to the limit printed on this list, and we note its condition together first.",
      ],
    },
    sp(
      "Laundry here. 906 wants a suit by six, but it came to us after the cut-off.",
      "Then I will offer express and show the guest the surcharge on the list. I will not promise six until you confirm.",
      "Đội giặt là là đồng nghiệp: không kính ngữ. Không hứa giờ thay bộ phận khác — hỏi họ trước, rồi mới nói với khách.",
      "colleague",
    ),
  ],
  reading: read(
    `THE LAUNDRY LIST — TIMES, PRICES AND CONDITIONS
Everything a guest needs to know about laundry is printed on the laundry list, so read it before you speak.
The cut-off time for a regular pick-up is ten in the morning. Anything collected by ten comes back the same evening. Anything collected later goes with the next morning's collection.
Express service comes back within four hours, with a surcharge printed on the list. After the cut-off time, express is the only way to have it back the same day.
Washing, pressing and dry cleaning are each charged per item, at the prices on the list. Never quote a price from memory.
Read the care label before anything goes into the bag. A label that says dry clean only goes for dry cleaning, at its own price.
Count and inspect every item with the guest, and note any stain on the list before the guest signs. The hotel's liability is the limit printed on that list, and nothing more is promised on the floor.
Never promise a time the list does not print. If a guest needs something faster, ask the laundry team before you say yes.
Your hotel's times and prices are its own. Ask your Executive Housekeeper for the current list.`,
    [
      {
        q: "Đồ giặt thường được nhận lúc 11 giờ sáng thì khi nào xong?",
        options: [
          "Ngay tối hôm đó, vẫn theo giá giặt thường in trên phiếu",
          "Tối hôm sau, trừ khi khách chọn dịch vụ nhanh",
          "Trong bốn giờ, không tính phụ phí",
        ],
        correct: 1,
        explanation:
          "'Anything collected later goes with the next morning's collection… After the cut-off time, express is the only way to have it back the same day.'",
      },
      {
        q: "Nhãn ghi 'dry clean only' thì xử lý thế nào?",
        options: [
          "Giặt nước nhẹ tay, theo giá giặt thường",
          "Gửi giặt khô, theo giá giặt khô trên phiếu",
          "Trả lại cho khách, vì bộ phận giặt là không nhận loại đồ này",
        ],
        correct: 1,
        explanation:
          "'A label that says dry clean only goes for dry cleaning, at its own price' — nhãn quyết định cách giặt, phiếu quyết định giá.",
      },
      {
        q: "Khách hỏi nếu làm hỏng thì khách sạn đền bao nhiêu. Tầng được nói gì?",
        options: [
          "Toàn bộ giá trị món đồ, theo hoá đơn của khách",
          "Giới hạn in sẵn trên phiếu giặt khách sẽ ký",
          "Mức nhân viên buồng phòng thấy là hợp lý",
        ],
        correct: 1,
        explanation:
          "'The hotel's liability is the limit printed on that list, and nothing more is promised on the floor' — số tiền cụ thể là việc của giám sát.",
      },
    ],
  ),
  game: [
    round(
      1,
      "Can you just guarantee it will not shrink? It is pure wool.",
      "I cannot promise that, madam, but I can note its condition with you and follow the care label.",
      "I cannot promise that, madam, but I can noting its condition with you and follow the care label.",
      "Do not worry, madam — our laundry never shrinks anything, so it will come back exactly the same.",
      "Phương án 'our laundry never shrinks anything' là lời hứa tuyệt đối không ai giữ được — và chính câu đó sẽ bị trích lại nếu áo co. Phương án 'can noting' sai: sau 'can' là động từ nguyên mẫu. Câu đúng nói thật và làm hai việc mình giữ được.",
    ),
    round(
      2,
      "It is eleven. Can my shirt still come back tonight at the normal price?",
      "After the cut-off time, only express can do that, sir, with the surcharge on the list.",
      "After the cut-off time, only express can does that, sir, with the surcharge on the list.",
      "Yes, sir — I will ask them to slip it in with this morning's batch, and nobody will notice.",
      "Phương án 'slip it in… nobody will notice' hứa sau lưng bộ phận giặt là, lách luật giờ chót. Phương án 'can does' sai: sau 'can' là động từ nguyên mẫu. Câu đúng nêu đúng điều kiện và chỉ vào phụ phí in sẵn.",
    ),
  ],
});

export const week: AuthoredWeek = {
  title: { en: "Service Terms, With Conditions", vi: "Điều khoản dịch vụ có điều kiện" },
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: nêu điều khoản dịch vụ của tầng bằng câu điều kiện, tần suất và thời hạn ('as long as…', 'unless…', 'If… by ten…') — lịch dọn cho khách ở dài ngày, biển Do Not Disturb và lượt kiểm tra an toàn, điều kiện trả đồ thất lạc (mô tả trước, giấy tờ, giấy cho phép), và giờ chót, giá theo món, giới hạn đền bù in trên phiếu giặt.",
};
