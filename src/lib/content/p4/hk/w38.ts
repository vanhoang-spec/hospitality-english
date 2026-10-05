// HK week 38 — Presenting a Plan (see ../kit.ts).
//
// The shared Phase 4 title is a sales pitch; a room attendant presents plans,
// not quotations, so the matrix gives Housekeeping its own week 38: a short
// plan put to a guest or to the supervisor — a long-stay cleaning plan, a
// set-up for an occasion, a change on the floor, a room arranged for a guest
// who has told us what she needs. The language is a three-part pitch:
//
//   1. WHAT — "I propose…", "First of all…, then…, finally…"
//   2. WHY — built on what the guest SAID or what the room SHOWS
//            ("Since you mentioned…", "It is a pattern: three mornings…")
//   3. WHAT I NEED — a yes, a time, an approval ("May I go ahead?")
//
// Rewritten whole. The old week taught a supervisor's job — compensation
// files, depreciation, insurance ceilings — to an attendant who never signs
// any of them. Every plan here stays inside the floor's own tier, as the
// earlier weeks drew it: a second bed service is the supervisor's, an extra
// bed or a room move the front desk's, a price the desk's, a safety promise
// nobody's. The floor proposes, and it writes the plan on the guest profile
// once it is agreed.
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

// ── Lesson 1 — a cleaning plan for a long stay ────────────────────────────
const t1a =
  "I propose a plan in three parts, sir: service after two, light service on weekdays, and a Saturday deep clean.";
const t1b =
  "Since you mentioned your night shifts, sir, two o'clock means nobody knocks while you are asleep.";
const t1c =
  "Only a yes, sir. Then it goes on your guest profile today, so every attendant follows it.";

// ── Lesson 2 — a set-up plan for the desk ─────────────────────────────────
const t2a =
  "First of all, petals on the bed and along the bath, then towel art and two LED candles.";
const t2b =
  "The timing is thirty minutes once the room is empty, so I need your cue when they leave.";
const t2c =
  "Finally, please check their profile for allergies before the petals go in. I will report back when it is ready.";

const lesson1 = L(
  38,
  1,
  "A Cleaning Plan for a Long Stay",
  "Kế hoạch dọn phòng cho khách ở dài ngày",
  {
    vocabulary: [
      c("Propose", "I propose one plan, with times and days, and the guest decides.", [
        "/prəˈpəʊz/",
        "Đề xuất một phương án để người khác quyết",
        "🗂️",
      ]),
      c("Three parts", "A plan in three parts says what, why, and what I need.", [
        "/ˌθriː ˈpɑːts/",
        "Ba phần — cái gì, vì sao, và mình cần gì",
        "3️⃣",
      ]),
      c("On weekdays", "On weekdays the guest has light service, and Saturday is the deep clean.", [
        "/ɒn ˈwiːkdeɪz/",
        "Vào các ngày trong tuần, từ thứ Hai tới thứ Sáu",
        "🗓️",
      ]),
      c("Go ahead", "Once my supervisor says go ahead, the plan goes on the guest profile.", [
        "/ˌɡəʊ əˈhed/",
        "Cứ làm đi — lời đồng ý cho một kế hoạch",
        "🟢",
      ]),
    ],
    grammar: [
      g(
        "My plan: I come after two. OK?",
        "I propose we come after two, sir, so nobody knocks while you are asleep.",
        "Phần một của kế hoạch: 'I propose (that) we + động từ nguyên mẫu' — một việc cụ thể, có giờ. Sau 'propose we' không thêm -ing.",
        "I propose we coming after two, sir, so nobody knocks while you are asleep.",
      ),
      g(
        "Bed twice a day? OK, no problem, I do it.",
        "A second bed service needs my supervisor's approval, sir, so I will put it forward today.",
        "Kế hoạch chỉ chứa điều tầng tự cho được; phần còn lại thì trình lên. Chủ ngữ số ít 'a second bed service' cần 'needs'.",
        "A second bed service need my supervisor's approval, sir, so I will put it forward today.",
      ),
    ],
    speaking: [
      {
        ...sp(
          "You mentioned a plan for our month here. What is it?",
          t1a,
          "Phần một — CÁI GÌ: một câu, có giờ và có ngày. 'Propose' /prəˈpəʊz/ — âm /z/ cuối rung. Đếm ba ý trên đầu ngón tay khi nói.",
        ),
        alsoAccept: [
          "I would propose a plan in three parts, sir: service after two, light service on weekdays, and a Saturday deep clean.",
        ],
      },
      sp(
        "Why after two, exactly?",
        t1b,
        "Phần hai — VÌ SAO: dựa đúng vào điều khách đã kể. 'Since you mentioned' chỉ dùng cho điều khách TỰ nói ra.",
        undefined,
        undefined,
        t1a,
      ),
      {
        ...sp(
          "That sounds right. What do you need from me?",
          t1c,
          "Phần ba — MÌNH CẦN GÌ: một cái gật đầu. Rồi một việc bạn làm ngay hôm nay để kế hoạch không nằm trong đầu một người. 'Guest profile' /ˈprəʊfaɪl/.",
          undefined,
          undefined,
          t1b,
        ),
        alsoAccept: [
          "Just a yes, sir. Then it goes on your guest profile today, so every attendant follows it.",
        ],
      },
      {
        ...sp(
          "Can the plan include the bed made twice a day?",
          "I can put it forward to my supervisor today, sir, and come back to you before six.",
          "Lượt dọn giường thứ hai là quyền của giám sát, nên không nằm trong kế hoạch của bạn cho tới khi được duyệt. 'Put it forward' — đọc nối ba từ.",
        ),
        alsoAccept: [
          "I will put it forward to my supervisor today, sir, and come back to you before six.",
        ],
      },
      sp(
        "Ms Lan here. Tell me your plan for 1508 in one minute.",
        "Three parts, Ms Lan: service after two, light service on weekdays, and a Saturday deep clean. May I go ahead?",
        "Báo cấp trên: gọi tên một lần, không kính ngữ. Đọc lại đúng ba phần, rồi kết bằng câu hỏi xin quyết định. 'Go ahead' — nhấn ở 'head'.",
        "manager",
      ),
      sp(
        "Why does 1508 get service after two? It breaks my order for the floor.",
        "It is his service window, agreed with Ms Lan and on his profile. I can take 1508 myself if it helps you.",
        "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Nói lý do bằng việc đã được duyệt, không kể chuyện riêng của khách, rồi đề nghị đỡ việc.",
        "colleague",
      ),
    ],
    reading: read(
      `A PLAN A GUEST CAN SAY YES TO
A plan is easier to agree to when it has three parts and fits in one breath.
First, what you propose: one sentence, with times and days. "Service after two, light service on weekdays, and a deep clean on Saturday."
Second, the reason, built on what the guest said. "Since you mentioned your night shifts" is a reason. A guess about the guest is not.
Third, what you need: a yes, a time, or an approval. End with a question, such as "May I go ahead?", so the guest decides.
Keep the plan inside what the floor can give. A second bed service needs your supervisor's approval, and an extra bed is arranged by the front desk. Put those forward; do not put them in the plan.
Once the guest agrees, write the plan on the guest profile the same day. The next attendant then follows it without asking again.
Tell your supervisor before the plan starts, especially if it changes the order of the floor.
A plan nobody wrote down is a promise made by one person, and it ends on that person's day off.`,
      [
        {
          q: "Phần thứ ba của một kế hoạch là gì?",
          options: [
            "Lý do, dựa trên điều khách đã nói ra",
            "Điều mình cần: một cái gật đầu, một mốc giờ, hay một sự chấp thuận",
            "Danh sách đầy đủ mọi dịch vụ mà khách sạn đang có để khách tự chọn",
          ],
          correct: 1,
          explanation:
            "'Third, what you need: a yes, a time, or an approval. End with a question' — kết bằng câu hỏi để người kia quyết.",
        },
        {
          q: "Khách muốn đưa việc dọn giường hai lần một ngày vào kế hoạch thì sao?",
          options: [
            "Ghi luôn vào kế hoạch, vì khách ở lâu và đã chủ động xin việc đó",
            "Trình giám sát; chưa đưa vào kế hoạch khi chưa được duyệt",
            "Từ chối, vì kế hoạch đã chốt từ hôm trước",
          ],
          correct: 1,
          explanation:
            "'A second bed service needs your supervisor's approval… Put those forward; do not put them in the plan' — kế hoạch chỉ chứa điều tầng tự cho được.",
        },
      ],
    ),
    game: [
      round(
        2,
        "Why should I agree to a plan? Just clean whenever you can.",
        "Then I propose one thing only, sir: your room after two every day, so nobody wakes you.",
        "Then I propose one thing only, sir: your room after two every day, so nobody wake you.",
        "The plan is simply our standard, sir, so I am afraid every long-stay guest has to follow it as it is.",
        "Phương án 'every long-stay guest has to follow it' biến một đề xuất thành một mệnh lệnh — kế hoạch là để khách chọn. Phương án 'nobody wake' sai: 'nobody' là chủ ngữ số ít, cần 'wakes'. Câu đúng thu gọn đề xuất còn một ý và giữ lý do.",
      ),
      round(
        0,
        "Ms Lan here. Your plan for 1508 — what do you need from me?",
        "Only your approval, Ms Lan. Then I will put it on the guest profile today.",
        "Only your approval, Ms Lan. Then I will puts it on the guest profile today.",
        "Nothing at all, madam — I have already told the guest that it is agreed and settled.",
        "Phương án 'already told the guest that it is agreed' hứa trước khi cấp trên duyệt, và gọi cấp trên là 'madam' như gọi khách. Phương án 'will puts' sai: sau 'will' là động từ nguyên mẫu. Câu đúng xin đúng một thứ và nói việc mình làm tiếp.",
        "manager",
      ),
    ],
  },
);

const lesson2 = L(38, 2, "A Set-Up Plan for the Desk", "Trình bày phương án dựng phòng", {
  vocabulary: [
    c("First of all", "First of all, say what goes into the room, and only then say when.", [
      "/ˌfɜːst əv ˈɔːl/",
      "Trước hết — mở phần một của kế hoạch",
      "1️⃣",
    ]),
    c("Timing", "The timing of a set-up starts when the room is empty, not when dinner starts.", [
      "/ˈtaɪmɪŋ/",
      "Thời gian biểu — bao lâu và bắt đầu lúc nào",
      "⏱️",
    ]),
    c("Finally", "Finally, say what you need, and stop talking.", [
      "/ˈfaɪnəli/",
      "Cuối cùng — mở phần cuối của kế hoạch",
      "🏁",
    ]),
    c("Alternative", "If balloons are too late, offer an alternative that is ready tonight.", [
      "/ɔːlˈtɜːnətɪv/",
      "Phương án thay thế",
      "🔄",
    ]),
  ],
  grammar: [
    g(
      "Everything at once — I just do it fast.",
      "First of all the petals, then the towel art, and finally the candles by the bath.",
      "Kể theo thứ tự bằng 'First of all… then… finally'. 'Finally' là trạng từ, có đuôi -ly; 'final' là tính từ, không đứng mở một vế câu như vậy.",
      "First of all the petals, then the towel art, and final the candles by the bath.",
    ),
    g(
      "Thirty minutes. Tell me when.",
      "The timing is thirty minutes once the room is empty, so I need your cue.",
      "Sau 'once' (khi, một khi) nói về tương lai, động từ ở HIỆN TẠI ĐƠN: once the room is empty — không dùng 'will be'.",
      "The timing is thirty minutes once the room will be empty, so I need your cue.",
    ),
  ],
  speaking: [
    sp(
      "Guest Relations here. What can the floor do for the anniversary in 906?",
      t2a,
      "Guest Relations là đồng nghiệp: không kính ngữ. Phần một: kể đồ trang trí theo thứ tự — 'First of all', rồi 'then'. Không nói giá: giá là việc của quầy.",
      "colleague",
    ),
    sp(
      "And the timing? They go to dinner at seven.",
      t2b,
      "Phần hai: thời gian tính từ lúc phòng TRỐNG, không phải giờ ăn tối. 'Timing' /ˈtaɪmɪŋ/. Chữ cue là từ nghề, chỉ dùng với quầy, không dùng với khách.",
      "colleague",
      undefined,
      t2a,
    ),
    {
      ...sp(
        "Fine. Is there anything else you need from us?",
        t2c,
        "Phần ba mở bằng 'Finally': điều quầy phải làm cho bạn (kiểm dị ứng), rồi điều bạn hứa lại — báo lại người gửi phiếu khi phòng xong. 'Finally' /ˈfaɪnəli/ — ba âm tiết.",
        "colleague",
        undefined,
        t2b,
      ),
      alsoAccept: [
        "Finally, please check their profile for allergies before the petals go in. I will report back once it is ready.",
      ],
    },
    {
      ...sp(
        "I want to surprise my wife tomorrow. What could the room look like?",
        "May I suggest petals on the bed and towel art, sir? The front desk will take the details and the price.",
        "Gợi ý đúng thứ tầng làm được, rồi chuyển đơn và giá cho quầy lễ tân. Tầng không nhận đơn có tính tiền.",
      ),
      alsoAccept: [
        "Could I suggest petals on the bed and towel art, sir? The front desk will take the details and the price.",
      ],
    },
    sp(
      "Balloons would be fun as well. Can you add some tonight?",
      "As an alternative tonight, sir, towel art takes fifteen minutes, because balloons need a full day's lead time.",
      "Không nói 'không' rồi dừng: đưa 'alternative' trước, lý do sau. Thời gian chuẩn bị là luật tầng đã có: bóng bay cần cả ngày.",
    ),
    sp(
      "Ms Lan here. The 906 set-up — talk me through it.",
      "First of all petals and towel art, then the LED candles. Finally, could you check the room before six?",
      "Báo cấp trên: gọi tên một lần, không kính ngữ. Ba phần ngắn, và phần cuối là điều bạn cần ở giám sát — một lần kiểm phòng có giờ.",
      "manager",
    ),
  ],
  reading: read(
    `PRESENTING A SET-UP — WHAT, WHEN, AND WHAT YOU NEED
The desk or Guest Relations takes the order and the price. Your part is the room, and your plan for it should take less than a minute to say.
First of all, what goes into the room, in the order you will place it: petals, towel art, LED candles. Name only what may go into a room. Real flames and helium never appear in a plan.
Then the timing. Count from the moment the room is empty, never from the dinner booking. Petals and towel art take fifteen minutes; flowers and balloons need a full day.
Finally, what you need from the desk: the cue when the guests leave. You also need an allergy check on the profile before petals or fruit go in.
If something on the request cannot be done in time, offer an alternative in the same breath. "Balloons need a full day, so towel art tonight" is a plan; "no balloons" is not.
Never give a price, and never repeat a delivery time the desk promised. When the room is ready, report back to whoever sent the slip.
Every hotel keeps its own set-up list. Ask your Floor Supervisor for yours.`,
    [
      {
        q: "Thời gian dựng phòng được tính từ lúc nào?",
        options: [
          "Từ giờ khách đặt bàn ăn tối ở nhà hàng",
          "Từ lúc quầy lễ tân nhận đơn và báo giá cho khách",
          "Từ lúc phòng không còn ai",
        ],
        correct: 2,
        explanation:
          "'Count from the moment the room is empty, never from the dinner booking' — dựng phòng chỉ bắt đầu khi phòng trống.",
      },
      {
        q: "Khách xin bóng bay cho tối nay thì trình bày thế nào?",
        options: [
          "Nói không làm được bóng bay, rồi dừng ở đó",
          "Đưa ngay một phương án thay thế kịp tối nay, kèm lý do",
          "Nhận lời, rồi tự ra ngoài phố tìm mua bóng bay cho kịp tối nay",
        ],
        correct: 1,
        explanation:
          "'offer an alternative in the same breath' — bóng bay cần cả ngày, nên đề xuất thứ làm kịp tối nay, như khăn gấp hình thú.",
      },
    ],
  ),
  game: [
    round(
      0,
      "Guest Relations. Can the floor do flowers for 906 by tonight?",
      "Flowers need a full day's lead time. As an alternative, towel art and petals are fine by six.",
      "Flowers need a full day's lead time. As an alternative, towel art and petals is fine by six.",
      "Of course — I will take some flowers from the lobby display myself and have them in the room by six.",
      "Phương án 'take some flowers from the lobby display' tự lấy đồ của khu vực khác và hứa điều không kịp đặt. Phương án 'towel art and petals is' sai: hai chủ ngữ nối bằng 'and' cần 'are'. Câu đúng nói lead time thật và đưa phương án thay thế.",
      "colleague",
    ),
    round(
      1,
      "So what exactly will the room look like when we come back?",
      "First of all, petals on the bed, then towel art, and finally two LED candles by the bath.",
      "First of all, petals on the bed, then towel art, and finally two LED candle by the bath.",
      "It will be the most romantic room in the whole hotel, sir — better than anything you have seen.",
      "Phương án 'the most romantic room… better than anything' là lời khen không kiểm chứng được, thay cho câu trả lời khách hỏi. Phương án 'two LED candle' thiếu -s số nhiều. Câu đúng kể ba phần theo thứ tự.",
    ),
  ],
});

// ── Lesson 3 — proposing a change to the supervisor ──────────────────────
const t3a =
  "Yes, Ms Lan. It has smelt damp three mornings in a row, so it is a pattern, not a one-off.";
const t3b =
  "My suggestion is a one-day trial: the dehumidifier runs all day, and the room stays off sale.";
const t3c =
  "Your approval before two, Ms Lan. I will report back tomorrow morning with the result.";

// ── Lesson 4 — a room plan for a guest who asked ─────────────────────────
const t4a =
  "Since you mentioned her knee, sir, may I propose a small plan for her room before she arrives?";
const t4b = "A shower chair and a non-slip mat in the bathroom, and a night light by the bed.";
const t4c =
  "I cannot promise that, sir, but everything she needs will be within reach before she arrives.";

const lesson3 = L(38, 3, "Proposing a Change Upwards", "Đề xuất một thay đổi với giám sát", {
  vocabulary: [
    c("Pattern", "Once is a complaint, but three mornings in a row is a pattern.", [
      "/ˈpætn/",
      "Điều lặp lại thành quy luật",
      "🔁",
    ]),
    c("Suggestion", "A suggestion to your supervisor names one change and one day.", [
      "/səˈdʒestʃən/",
      "Lời đề nghị",
      "💡",
    ]),
    c("Trial", "A one-day trial shows whether the change works before anyone commits to it.", [
      "/ˈtraɪəl/",
      "Làm thử trong một thời gian ngắn",
      "🧪",
    ]),
    c("Off sale", "A room that is off sale is not given to any guest until it is checked again.", [
      "/ˌɒf ˈseɪl/",
      "Tạm ngưng bán phòng",
      "⛔",
    ]),
  ],
  grammar: [
    g(
      "1408 smells. Always. Do something.",
      "1408 has smelt damp three mornings in a row, Ms Lan, so it is a pattern.",
      "Phần một với cấp trên là SỰ VIỆC có con số, không phải cảm giác. Hiện tại hoàn thành: has + phân từ hai — 'smelt' là dạng Anh-Anh của smell.",
      "1408 has smell damp three mornings in a row, Ms Lan, so it is a pattern.",
    ),
    g(
      "Give me the dehumidifier, or the guest will complain.",
      "My suggestion is a one-day trial, and the room stays off sale until tomorrow.",
      "Phần hai là ĐỀ NGHỊ, không phải yêu sách hay lời doạ. Chủ ngữ số ít 'the room' cần 'stays'.",
      "My suggestion is a one-day trial, and the room stay off sale until tomorrow.",
    ),
  ],
  speaking: [
    sp(
      "Ms Lan here. You wanted two minutes about 1408?",
      t3a,
      "Báo cấp trên: gọi tên một lần, không kính ngữ. Phần một là sự việc có con số. 'Pattern' /ˈpætn/ — âm cuối nhẹ, gần như không có nguyên âm.",
      "manager",
    ),
    {
      ...sp(
        "So what is your suggestion?",
        t3b,
        "Phần hai: MỘT thay đổi, MỘT thời hạn. 'Off sale' — quyết định ngưng bán là của giám sát, nên ở đây nó là đề nghị. 'Trial' /ˈtraɪəl/.",
        "manager",
        undefined,
        t3a,
      ),
      alsoAccept: [
        "My suggestion is a one-day trial: the dehumidifier runs all day, and the room is off sale.",
      ],
    },
    sp(
      "And what do you need from me?",
      t3c,
      "Phần ba: điều cần ở cấp trên, có mốc giờ — rồi lời hứa của chính mình. 'Approval' /əˈpruːvl/.",
      "manager",
      undefined,
      t3b,
    ),
    risk({
      ...sp(
        "This room smells damp. Can you not just spray something nice?",
        "I am sorry, madam. I am reporting the damp smell now, and may I ask the front desk about another room?",
        "Mùi ẩm được BÁO, không xịt che. Đổi phòng là việc của quầy lễ tân: bạn xin giúp khách, không tự xếp phòng. Chữ damp đọc /dæmp/, âm /p/ cuối nhẹ.",
      ),
      alsoAccept: [
        "I am sorry, madam. I am reporting the damp smell now. Shall I ask the front desk about another room?",
        "I am so sorry, madam. I am reporting the damp smell now, and may I ask the front desk about another room?",
      ],
    }),
    sp(
      "1408 smells damp again. Just spray it — it is quicker.",
      "No, a damp smell is reported, not sprayed. I have put it forward to Ms Lan as a trial.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Một luật, rồi việc đã làm. 'Put it forward' — trình lên cấp trên.",
      "colleague",
    ),
    sp(
      "Ms Lan here. The trial in 1408 is over. What did you find?",
      "The smell came back by the evening, Ms Lan, so I suggest we ask Engineering to check the pipes.",
      "Báo kết quả bằng sự việc, rồi đề nghị bước tiếp theo — người kiểm đường ống là Kỹ thuật, không phải bạn. Sau 'suggest we' là động từ nguyên mẫu.",
      "manager",
    ),
  ],
  reading: read(
    `PROPOSING A CHANGE UPWARDS — FACT, SUGGESTION, REQUEST
Your supervisor has two minutes, so a proposal to her has the same three parts as a plan for a guest, said faster.
The fact comes first, with a number in it. "It has smelt damp three mornings in a row" is a fact. "It always smells" is a feeling, and it starts an argument.
Then the suggestion: one change, and how long it lasts. A one-day trial is easier to approve than a new rule, because nobody has to commit to it.
Then what you need: an approval, and the time you need it by. Add your own promise at the end, such as when you will report back.
Some changes are not yours to suggest at all. A room goes off sale, a guest moves room, or a pipe is opened only on someone else's decision. You put those forward; you do not start them.
A damp smell is never covered with spray. It is reported, because spray hides the problem from the next guest and from Engineering.
After the trial, report the result even if the change did not work. A result that failed still saves the next person a day.`,
    [
      {
        q: "Câu nào là SỰ VIỆC, nên dùng để mở lời với giám sát?",
        options: [
          "'Phòng đó lúc nào cũng hôi, chị ạ'",
          "'Ba sáng liền phòng đó có mùi ẩm'",
          "'Khách nào vào phòng đó cũng sẽ phàn nàn thôi'",
        ],
        correct: 1,
        explanation:
          "'The fact comes first, with a number in it… It always smells is a feeling, and it starts an argument' — con số làm cấp trên quyết nhanh hơn.",
      },
      {
        q: "Vì sao nên đề nghị làm thử một ngày thay vì một quy định mới?",
        options: [
          "Vì không ai phải cam kết lâu dài, nên dễ được duyệt hơn",
          "Vì quy định mới chỉ có tổng giám đốc mới ban hành được",
          "Vì làm thử một ngày thì không cần báo cho giám sát biết",
        ],
        correct: 0,
        explanation:
          "'A one-day trial is easier to approve than a new rule, because nobody has to commit to it' — và kết quả vẫn phải báo lại, dù thử không thành.",
      },
      {
        q: "Khách thấy phòng có mùi ẩm thì xử lý thế nào?",
        options: [
          "Xịt mùi hương riêng của khách sạn cho thơm phòng trước khi khách về",
          "Báo lên, và xin quầy lễ tân xem phòng khác cho khách",
          "Tự đổi cho khách sang một phòng trống cùng tầng",
        ],
        correct: 1,
        explanation:
          "'A damp smell is never covered with spray. It is reported' — và đổi phòng là quyết định của người khác: bạn xin, không tự xếp.",
      },
    ],
  ),
  game: [
    round(
      1,
      "Ms Lan here. Why should I take 1408 off sale on a busy day?",
      "Because it is a pattern, Ms Lan: three mornings in a row. One day off sale costs less than three complaints.",
      "Because it is a pattern, Ms Lan: three mornings in a row. One day off sale cost less than three complaints.",
      "Because the guest in there was very rude to me, madam, and I would rather not clean it again this week.",
      "Phương án 'the guest… was very rude to me' lấy cảm xúc cá nhân làm lý do, và gọi cấp trên là 'madam'. Phương án 'One day… cost' sai: chủ ngữ số ít cần 'costs'. Câu đúng đưa sự việc có con số và cái giá của việc không làm.",
      "manager",
    ),
    round(
      2,
      "Do you not have a spray that simply covers the smell?",
      "We report a damp smell, madam, rather than cover it. May I ask the front desk about another room?",
      "We reports a damp smell, madam, rather than cover it. May I ask the front desk about another room?",
      "Of course, madam — our signature scent covers almost anything, so I will spray the room twice today.",
      "Phương án 'our signature scent covers almost anything' che giấu vấn đề với cả khách sau lẫn bộ phận Kỹ thuật. Phương án 'We reports' sai: 'we' không thêm -s. Câu đúng nêu luật và xin quầy giúp khách.",
    ),
  ],
});

const lesson4 = L(
  38,
  4,
  "A Room Plan for a Guest Who Asked",
  "Kế hoạch bố trí phòng theo lời khách",
  {
    vocabulary: [
      c(
        "Shower chair",
        "A shower chair comes from the housekeeping store and goes in before arrival.",
        ["/ˈʃaʊə ˌtʃeə/", "Ghế ngồi tắm", "🪑"],
      ),
      c("Non-slip mat", "A non-slip mat goes in the shower and another one beside the bath.", [
        "/ˌnɒn ˈslɪp ˌmæt/",
        "Thảm chống trơn",
        "🧩",
      ]),
      c("Night light", "A night light by the bed helps a guest who gets up in the dark.", [
        "/ˈnaɪt ˌlaɪt/",
        "Đèn ngủ nhỏ để sáng suốt đêm",
        "🌙",
      ]),
      c("Within reach", "Put the phone and the water within reach of the bed.", [
        "/wɪˌðɪn ˈriːtʃ/",
        "Trong tầm tay với",
        "🤲",
      ]),
      c(
        "Accessible room",
        "An accessible room is allocated by the front desk, never by the floor.",
        ["/əkˈsesəbl ˌruːm/", "Phòng dành cho khách đi lại khó khăn", "♿"],
      ),
    ],
    grammar: [
      g(
        "Old lady, bad knee. I put chair in shower.",
        "Since you mentioned her knee, sir, may I put a shower chair in the bathroom?",
        "Chỉ đề xuất dựa trên điều khách đã nói, rồi xin phép. Sau 'may I' là động từ nguyên mẫu: may I put.",
        "Since you mentioned her knee, sir, may I putting a shower chair in the bathroom?",
      ),
      g(
        "She will never fall now. One hundred percent.",
        "Everything she needs will be within reach, sir, before she arrives.",
        "Hứa điều mình làm được, không hứa an toàn tuyệt đối. Sau 'before' nói về tương lai, động từ ở HIỆN TẠI ĐƠN: before she arrives.",
        "Everything she needs will be within reach, sir, before she will arrive.",
      ),
    ],
    speaking: [
      sp(
        "My mother is joining us tomorrow. She has a bad knee and gets up at night.",
        t4a,
        "Khách TỰ nói về sức khoẻ của mẹ, nên 'Since you mentioned' là đúng chỗ. Xin phép trình bày trước khi kể kế hoạch. Không hỏi thêm về bệnh.",
      ),
      sp(
        "Please do. What would it be?",
        t4b,
        "Kể ba món, theo từng chỗ trong phòng. 'Non-slip mat' /ˌnɒn ˈslɪp/ — nhấn ở 'slip'. 'Night light' — hai âm /t/ cuối nhẹ.",
        undefined,
        undefined,
        t4a,
      ),
      risk({
        ...sp(
          "Perfect. And can you make the bathroom completely safe for her?",
          t4c,
          "Không ai hứa được an toàn tuyệt đối, cũng như với dị ứng. Nói thật một câu, rồi điều bạn giữ được, có mốc: mọi thứ trong tầm tay trước khi bà tới.",
          undefined,
          undefined,
          t4b,
        ),
        alsoAccept: [
          "I am not able to promise that, sir, but everything she needs will be within reach before she arrives.",
          "I cannot promise that, sir. Everything she needs will be within reach before she arrives.",
        ],
      }),
      {
        ...sp(
          "Would an accessible room be better for her, do you think?",
          "It might be, sir. May I ask the front desk about an accessible room? Room moves are arranged by them.",
          "Phòng cho người đi lại khó khăn do quầy lễ tân xếp. Bạn hỏi giúp khách, không tự hứa. 'Accessible' /əkˈsesəbl/ — nhấn âm tiết hai.",
        ),
        alsoAccept: [
          "It might be, sir. Shall I ask the front desk about an accessible room? Room moves are arranged by them.",
        ],
      },
      sp(
        "Linen store. You asked for a shower chair for 1102. When do you need it?",
        "Before two, please, with a non-slip mat. The guest arrives at three.",
        "Kho đồ vải là đồng nghiệp: không kính ngữ. Một mốc giờ, một món kèm theo, và lý do của mốc giờ đó.",
        "colleague",
      ),
      sp(
        "Ms Lan here. Talk me through the plan for 1102.",
        "A shower chair, a night light, and her things within reach, Ms Lan. Could you check the room before three?",
        "Báo cấp trên: gọi tên một lần, không kính ngữ. Ba phần ngắn, rồi điều bạn cần ở giám sát — một lần kiểm phòng có giờ.",
        "manager",
      ),
    ],
    reading: read(
      `A ROOM PLAN BUILT ON WHAT THE GUEST SAID
Sometimes a guest tells you about a need before arrival: a mother with a bad knee, a child who wakes at night. That is the moment for a room plan.
Build it only on what the guest said. "Since you mentioned her knee" is the right way in. Never ask about an illness, an age or a medicine.
Propose the plan in one breath, room by room. A shower chair and a non-slip mat in the bathroom, a night light by the bed, and the phone and water within reach.
Everything on that list comes from the housekeeping store, so it is yours to offer. Ask the linen store early, with a time, because the chairs are few.
Some things are not yours. An accessible room, a move or a connecting door is arranged by the front desk; ask them on the guest's behalf. A grab rail fixed to a wall is Engineering's.
Never promise that a bathroom is completely safe. Promise what you will put in it, and by when.
Before the guest arrives, ask your supervisor to check the room. Then write the plan on the guest profile, so it is there for the next stay.`,
      [
        {
          q: "Kế hoạch bố trí phòng được xây trên điều gì?",
          options: [
            "Điều mình đoán về tuổi và sức khoẻ của khách",
            "Điều chính khách đã nói ra trước khi tới",
            "Những món đồ mà kho buồng phòng đang còn dư nhiều nhất",
          ],
          correct: 1,
          explanation:
            "'Build it only on what the guest said… Never ask about an illness, an age or a medicine' — tư vấn dựa trên lời khách, không dựa trên phỏng đoán.",
        },
        {
          q: "Khách hỏi có thể đổi sang phòng cho người đi lại khó khăn không. Ai sắp xếp?",
          options: [
            "Quầy lễ tân; nhân viên tầng hỏi giúp khách",
            "Nhân viên tầng tự đổi nếu thấy còn phòng trống",
            "Bộ phận Kỹ thuật, vì đó là phòng có lắp tay vịn",
          ],
          correct: 0,
          explanation:
            "'An accessible room, a move or a connecting door is arranged by the front desk; ask them on the guest's behalf.'",
        },
      ],
    ),
    game: [
      round(
        2,
        "Can you promise my mother will not fall in that bathroom?",
        "I cannot promise that, madam, but a shower chair and a non-slip mat will be there before she arrives.",
        "I cannot promise that, madam, but a shower chair and a non-slip mat will be there before she will arrive.",
        "Of course, madam — with our new mats, nobody has ever fallen in one of our bathrooms.",
        "Phương án 'nobody has ever fallen' là lời trấn an không kiểm chứng được — đúng điều không ai trên tầng được hứa. Phương án 'before she will arrive' sai: sau 'before' nói về tương lai dùng hiện tại đơn. Câu đúng nói thật rồi hứa điều mình làm được.",
      ),
      round(
        0,
        "Ms Lan here. Did you tell the guest in 1102 that his mother gets an accessible room?",
        "No, Ms Lan. I said I would ask the front desk, and they are calling him now.",
        "No, Ms Lan. I said I would asked the front desk, and they are calling him now.",
        "Yes, madam — I promised him the best accessible room, because his mother has a bad knee.",
        "Phương án 'I promised her the best accessible room' tự xếp phòng thay quầy lễ tân và gọi cấp trên là 'madam'. Phương án 'would asked' sai: sau 'would' là động từ nguyên mẫu. Câu đúng tường thuật đúng việc đã làm.",
        "manager",
      ),
    ],
  },
);

export const week: AuthoredWeek = {
  title: { en: "Presenting a Plan", vi: "Trình bày một kế hoạch" },
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: trình bày một kế hoạch ngắn ba phần — cái gì ('I propose…', 'First of all… finally…'), vì sao (dựa trên điều khách đã nói hoặc sự việc có con số) và mình cần gì ('May I go ahead?') — cho khách ở dài ngày, cho quầy khi dựng phòng dịp đặc biệt, cho giám sát khi đề nghị làm thử, và cho khách cần bố trí phòng; giữ mọi đề xuất trong thẩm quyền của tầng.",
};
