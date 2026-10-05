// SW week 35 — Light negotiation, with guests and inside the team ("What if
// we…?", "in exchange for…", "however"). Hand-authored Phase 4, see ../kit.ts.
//
// The spa desk negotiates with what it owns: times, rooms, the order of a
// group, how long a booking is held. It never negotiates with money — a
// discount, a waived fee or an exception is the manager's, said plainly, and
// the safety rules are not on the table at all ("however" holds the line on
// the sauna after alcohol). Inside the team the same is true one level up: a
// shift swap or a day off is agreed between colleagues "in exchange for"
// something, and then it goes to the supervisor for approval before the
// roster changes.
import type { AuthoredWeek } from "../kit";
import { cardsFor, lessonsFor, risk } from "../kit";
import { game, g, read, sp } from "../../phase0";

const c = cardsFor("SW");
const L = lessonsFor("SW");

// ── Lesson 1 — What if we…? ────────────────────────────────────────────
const t1a =
  "I am sorry, madam, the couple's suite is fully booked at six. Are you flexible on the time?";
const t1b = "What if we start earlier in the afternoon instead? The couple's suite is free then.";
const t1c = "Then what if we book two rooms side by side at six, as an alternative?";

const lesson1 = L(35, 1, "What If We…?", "Đề xuất phương án khác", {
  vocabulary: [
    c("Fully booked", "I am sorry, the couple's suite is fully booked on Saturday.", [
      "/ˌfʊli ˈbʊkt/",
      "Đã kín chỗ",
      "📕",
    ]),
    c("Alternative", "As an alternative, we can book two rooms side by side.", [
      "/ɔːlˈtɜːnətɪv/",
      "Phương án khác, lựa chọn thay thế",
      "🔀",
    ]),
    c("Flexible", "If you are flexible on the time, we have a room at four.", [
      "/ˈfleksəbl/",
      "Linh hoạt",
      "🤸",
    ]),
    c(
      "Compromise",
      "As a compromise, we can book two rooms now and call you if the suite is free.",
      ["/ˈkɒmprəmaɪz/", "Phương án dung hoà, sự thoả hiệp", "🪢"],
    ),
    c("Discount", "A discount is always the manager's decision.", [
      "/ˈdɪskaʊnt/",
      "Sự giảm giá",
      "🏷️",
    ]),
  ],
  grammar: [
    g(
      "No suite. Earlier, okay?",
      "What if we start earlier in the afternoon instead?",
      "'What if we + động từ nguyên mẫu…?' mở ra một phương án mà không ép khách. Không dùng V-ing sau 'we'.",
      "What if we starting earlier in the afternoon instead?",
    ),
    g(
      "Suite full. Sorry.",
      "I am sorry, the couple's suite is fully booked at six.",
      "'fully booked' là tính từ dạng phân từ hai — luôn có -ed: 'booked'.",
      "I am sorry, the couple's suite is fully book at six.",
    ),
  ],
  speaking: [
    sp(
      "We want the couple's suite at six on Saturday. It is our anniversary.",
      t1a,
      "Nói thật là kín chỗ, rồi mở đường thương lượng bằng một câu hỏi: khách có linh hoạt về giờ không.",
    ),
    {
      ...sp(
        "A little. What can you offer?",
        t1b,
        "Đề xuất một phương án về GIỜ — thứ lễ tân được quyết — bằng câu hỏi What if we…? và từ 'instead'.",
        undefined,
        undefined,
        t1a,
      ),
      alsoAccept: [
        "What if we start earlier in the afternoon instead? The couple's suite is free in the afternoon.",
      ],
    },
    sp(
      "That is too early. We have a tour until five.",
      t1c,
      "Khách từ chối phương án một: đưa phương án hai về PHÒNG, giữ đúng giờ khách muốn.",
      undefined,
      undefined,
      t1b,
    ),
    risk({
      ...sp(
        "Fine, but we would like a discount for the trouble.",
        "I am sorry, madam. I cannot offer a discount, but I will ask my manager.",
        "Giảm giá là quyết định của quản lý. Không thương lượng bằng tiền — nói rõ, rồi hỏi quản lý.",
        undefined,
        ["offer", "discount", "ask", "manager"],
      ),
      alsoAccept: [
        "I am sorry, madam. I cannot offer a discount myself, but I will ask my manager.",
        "I am sorry, madam. I am not able to offer a discount, but I will ask my manager.",
      ],
    }),
    {
      ...sp(
        "Can we find a compromise? I really want the couple's suite.",
        "As a compromise, we can book two rooms now and call you if the suite becomes free.",
        "Phương án dung hoà: giữ chắc một lựa chọn, và hứa một việc bạn làm được — gọi lại nếu phòng đôi trống.",
      ),
      alsoAccept: [
        "As a compromise, we can book two rooms now and call you if the couple's suite becomes free.",
      ],
    },
    sp(
      "The guests from Saturday are unhappy about the suite. What did you offer?",
      "I offered two rooms side by side, and I asked Housekeeping to decorate them for the anniversary.",
      "Báo cáo cho quản lý — không dùng sir hay madam: phương án đã đưa, và việc đã nhờ bộ phận khác.",
      "manager",
    ),
  ],
  reading: read(
    `Mr and Mrs Smith want the couple's suite at six on Saturday for their anniversary, but it is fully booked. Ha does not simply say no. She asks if they are flexible on the time. Then she offers a first idea: what if they start earlier in the afternoon instead? The couple have a tour until five, so that does not work. Ha offers an alternative: two rooms side by side at six. Mrs Smith still wants the suite, so Ha suggests a compromise. She books the two rooms now, and she promises to call if the suite becomes free. Then Mr Smith asks for a discount for the trouble. Ha does not agree and does not argue. She says she cannot offer a discount, and she asks her manager. The manager says the price stays the same. Ha asks Housekeeping to decorate the two rooms for the anniversary, and the Smiths leave happy.`,
    [
      {
        q: "Phương án đầu tiên Hà đưa ra là gì?",
        options: [
          "Giảm giá cho phòng đôi",
          "Hai phòng cạnh nhau lúc sáu giờ",
          "Bắt đầu sớm hơn vào buổi chiều",
        ],
        correct: 2,
        explanation:
          "'Then she offers a first idea: what if they start earlier in the afternoon instead?'",
      },
      {
        q: "Phương án dung hoà của Hà là gì?",
        options: [
          "Chuyển lịch của khách khác để nhường phòng đôi",
          "Đặt hai phòng, gọi lại nếu phòng đôi trống",
          "Cho khách chờ ở quầy tới khi có phòng",
        ],
        correct: 1,
        explanation:
          "'She books the two rooms now, and she promises to call if the suite becomes free.'",
      },
      {
        q: "Ai trả lời yêu cầu giảm giá của ông Smith?",
        options: ["Hà, sau khi tính lại giá", "Quản lý của Hà", "Bộ phận buồng phòng"],
        correct: 1,
        explanation:
          "'She says she cannot offer a discount, and she asks her manager. The manager says the price stays the same…'",
      },
    ],
  ),
  game: [
    game(
      "The couple's suite is full? That is a disaster.",
      "I am sorry, madam. What if we book two rooms side by side as an alternative?",
      "I am sorry, madam. What if we booking two rooms side by side as an alternative?",
      "Sorry, madam, there is nothing I can do. It is fully booked, so please try another day.",
      undefined,
      "Câu thứ hai sai dạng: sau 'What if we' là động từ nguyên mẫu 'book'. Câu thứ ba đúng ngữ pháp nhưng đóng cửa thương lượng khi bạn vẫn còn phương án. Câu đúng mở ra một lựa chọn khác.",
    ),
    game(
      "Give me a discount, and I will take the other room.",
      "I am sorry, madam. I cannot offer a discount, but I will ask my manager and come back to you.",
      "I am sorry, madam. I cannot offering a discount, but I will ask my manager.",
      "It is a deal, madam. I will take twenty percent off if you take the other room now.",
      undefined,
      "Câu thứ hai sai dạng: sau 'cannot' là 'offer'. Câu thứ ba thương lượng bằng tiền — giảm giá không phải việc của lễ tân. Câu đúng nói rõ giới hạn và hỏi quản lý.",
    ),
  ],
});

// ── Lesson 2 — In exchange for… ────────────────────────────────────────
const t2a =
  "Please congratulate her from me! I can work your Sunday shift in exchange for your Saturday morning, if the supervisor agrees.";
const t2b = "Yes. A swap needs the supervisor's approval, so let us ask her together today.";

const lesson2 = L(35, 2, "In Exchange For…", "Đổi ca, đổi việc với đồng nghiệp", {
  vocabulary: [
    c("In exchange for", "I can take your early shift in exchange for your late one.", [
      "/ɪn ɪksˈtʃeɪndʒ fə/",
      "Để đổi lấy",
      "↔️",
    ]),
    c("Swap", "Lan and Nam want to swap shifts on Sunday.", [
      "/swɒp/",
      "Đổi cho nhau (ca, lịch, phòng)",
      "🔃",
    ]),
    c("Day off", "Hoa has a day off on Friday.", ["/ˌdeɪ ˈɒf/", "Ngày nghỉ", "🏖️"]),
    c("Approval", "Every change to the roster needs the supervisor's approval.", [
      "/əˈpruːvl/",
      "Sự phê duyệt của cấp trên",
      "🖊️",
    ]),
  ],
  grammar: [
    g(
      "I work your Sunday, you work my Saturday.",
      "I can work your Sunday shift in exchange for your Saturday morning.",
      "'in exchange for + danh từ' = để đổi lấy. Giới từ là 'for', không phải 'of'.",
      "I can work your Sunday shift in exchange of your Saturday morning.",
    ),
    g(
      "Change shift, ask supervisor.",
      "A shift swap needs the supervisor's approval.",
      "'A shift swap' là chủ ngữ số ít → 'needs', có -s.",
      "A shift swap need the supervisor's approval.",
    ),
  ],
  speaking: [
    sp(
      "Can you work my Sunday shift? My sister is getting married.",
      t2a,
      "Nói với đồng nghiệp — không dùng sir hay madam. Đồng ý có điều kiện: 'in exchange for', và cấp trên còn phải đồng ý.",
      "colleague",
    ),
    sp(
      "Great. Do we need to ask anyone?",
      t2b,
      "Đổi ca giữa hai người vẫn cần giám sát duyệt. Đề nghị cùng đi hỏi.",
      "colleague",
      undefined,
      t2a,
    ),
    {
      ...sp(
        "What if she says no?",
        "Then the roster stays the same, and we can ask Hoa if she is free.",
        "Giám sát không duyệt thì lịch giữ nguyên — không tự đổi. Đưa một phương án khác.",
        "colleague",
        undefined,
        t2b,
      ),
      alsoAccept: ["Then the roster stays the same, and we can ask Hoa if she is free that day."],
    },
    sp(
      "My treatment room is being cleaned. Can I use yours at three?",
      "Yes, of course. However, please finish by four, because my next guest starts then.",
      "Đồng ý, rồi nêu một điều kiện bằng 'However'.",
      "colleague",
    ),
    {
      ...sp(
        "Who is covering Lan's Saturday?",
        "Nam is, in exchange for her Sunday shift. Can you give your approval today?",
        "Báo cáo cho giám sát: ai làm thay, đổi lấy gì — rồi xin phê duyệt.",
        "manager",
      ),
      alsoAccept: ["Nam is, in exchange for her Sunday shift. Could you give your approval today?"],
    },
    sp(
      "I need a day off on Friday. Can you take my two o'clock?",
      "I can take your two o'clock, but the day off needs the supervisor's approval first.",
      "Giúp đồng nghiệp phần việc của bạn; phần ngày nghỉ là việc giám sát duyệt.",
      "colleague",
    ),
  ],
  reading: read(
    `Lan's sister is getting married on Sunday, but Lan is on the roster for the Sunday shift. She asks Nam to help. Nam says congratulations, and he offers a swap: he can work her Sunday shift in exchange for her Saturday morning. Lan agrees at once. Then Nam says something important. A swap between two therapists still needs the supervisor's approval, because the supervisor must know who is in the spa each day. They go to the supervisor together that afternoon. She checks the bookings for both days, and she gives her approval. Only then does Nam change the roster. On the same day, Hoa asks Nam to take her two o'clock guest on Friday, because she wants a day off. Nam can take the guest. However, he reminds Hoa that her day off needs the supervisor's approval first. Hoa sends the supervisor a message straight away.`,
    [
      {
        q: "Nam đề nghị đổi ca theo điều kiện nào?",
        options: [
          "Lan trả cho Nam tiền làm thêm giờ hôm đó",
          "Làm Chủ nhật, đổi lấy sáng thứ Bảy",
          "Lan nghỉ cả tuần sau đám cưới",
        ],
        correct: 1,
        explanation: "'he can work her Sunday shift in exchange for her Saturday morning'.",
      },
      {
        q: "Vì sao việc đổi ca cần giám sát duyệt?",
        options: [
          "Vì giám sát phải biết ai có mặt",
          "Vì giám sát trả lương làm thêm giờ",
          "Vì Lan còn đang trong thời gian thử việc",
        ],
        correct: 0,
        explanation: "'because the supervisor must know who is in the spa each day'.",
      },
      {
        q: "Nam sửa bảng phân ca khi nào?",
        options: [
          "Ngay khi Lan đồng ý đổi",
          "Sáng thứ Bảy, trước giờ làm",
          "Sau khi giám sát đã duyệt",
        ],
        correct: 2,
        explanation: "'she gives her approval. Only then does Nam change the roster.'",
      },
    ],
  ),
  game: [
    game(
      "Can you take my Sunday shift? I will owe you one.",
      "Yes, in exchange for your Saturday morning, if the supervisor agrees.",
      "Yes, in exchange of your Saturday morning, if the supervisor agrees.",
      "Sure, no problem at all. Let us just swap the shifts, and we do not need to tell anyone.",
      "colleague",
      "Câu thứ hai sai giới từ: 'in exchange for', không phải 'of'. Câu thứ ba thân thiện nhưng đổi ca mà không báo giám sát — lịch trên giấy sai, và không ai biết ai đang có mặt. Câu đúng đổi có điều kiện và chờ giám sát duyệt.",
    ),
    game(
      "I need Friday off. Can you just mark it on the roster for me?",
      "A day off needs the supervisor's approval first, so let us ask her.",
      "A day off need the supervisor's approval first, so let us ask her.",
      "Sure, I will change the roster for you right now, and I am sure nobody will notice.",
      "colleague",
      "Câu thứ hai sai hoà hợp: 'A day off' số ít → 'needs'. Câu thứ ba giúp bạn nhưng tự sửa bảng phân ca — việc đó cần giám sát duyệt. Câu đúng đưa yêu cầu lên đúng người.",
    ),
  ],
});

// ── Lesson 3 — However: holding the line ───────────────────────────────
const t3a = "I am sorry, sir. I cannot waive the fee; however, I will ask my manager today.";
const t3b = "Our cancellation window is four hours, sir, because the therapist was kept for you.";

const lesson3 = L(35, 3, "However: Holding the Line", "'However' — giữ vững nguyên tắc", {
  vocabulary: [
    c("However", "The suite is full; however, we have two rooms side by side.", [
      "/haʊˈevə/",
      "Tuy nhiên",
      "↩️",
    ]),
    c("Peak time", "Seven in the evening is our peak time.", [
      "/ˈpiːk taɪm/",
      "Giờ cao điểm",
      "⏰",
    ]),
    c("Waive", "Only the manager can waive a cancellation fee.", [
      "/weɪv/",
      "Miễn, bỏ qua (một khoản phí)",
      "✋",
    ]),
    c("Exception", "An exception to the rule is the manager's decision.", [
      "/ɪkˈsepʃn/",
      "Ngoại lệ",
      "❗",
    ]),
  ],
  grammar: [
    g(
      "Seven busy, but later free.",
      "Seven is our peak time; however, we have a free room later in the evening.",
      "'however' nối hai câu đối lập: dấu chấm phẩy trước, dấu phẩy sau ('; however,'). Không viết 'peak time, however we…' — đó là lỗi nối câu bằng dấu phẩy. Chủ ngữ 'we' → 'have'.",
      "Seven is our peak time; however, we has a free room later in the evening.",
    ),
    g(
      "Rule is rule. No.",
      "Only my manager can make an exception, sir.",
      "Sau 'can' là động từ nguyên mẫu: 'can make', không thêm -s. Nói rõ ai có quyền, bằng giọng phục vụ.",
      "Only my manager can makes an exception, sir.",
    ),
  ],
  speaking: [
    risk({
      ...sp(
        "I cancelled two hours before my massage. Please waive the fee.",
        t3a,
        "Miễn phí là quyết định của quản lý. Từ chối phần không thuộc quyền bạn, rồi '; however,' nói việc bạn sẽ làm.",
        undefined,
        ["waive", "fee", "however", "ask", "manager"],
      ),
      alsoAccept: [
        "I am sorry, sir. I cannot waive the fee. However, I will ask my manager today.",
        "I am sorry, sir, I cannot waive the fee; however, I will ask my manager today.",
      ],
    }),
    sp(
      "Why not? It is only a small fee.",
      t3b,
      "Giải thích quy định bằng lý do thật, đúng như đã học: bốn tiếng, vì kỹ thuật viên đã được giữ cho khách.",
      undefined,
      undefined,
      t3a,
    ),
    {
      ...sp(
        "Fine. Then can I book again for tomorrow at no charge?",
        "I will ask my manager about both, sir, and I will call your room before six.",
        "Đổi lịch miễn phí sau hạn hủy cũng là việc của quản lý: gộp hai câu hỏi, hẹn giờ gọi lại.",
        undefined,
        undefined,
        t3b,
      ),
      alsoAccept: [
        "I will ask my manager about both, sir, and I will call you in your room before six.",
      ],
    },
    {
      ...sp(
        "Can I have a hot stone massage at seven tonight? It is my only free time.",
        "Seven is our peak time, madam; however, we have a free room later in the evening.",
        "Nói thật về giờ cao điểm, rồi '; however,' đưa một lựa chọn có thật.",
      ),
      alsoAccept: [
        "Seven is our peak time, madam. However, we have a free room later in the evening.",
      ],
    },
    sp(
      "I know the rule, but can you make an exception for me? I am a regular guest.",
      "Thank you for coming back to us, sir. However, only my manager can make an exception, and I will ask her.",
      "Cảm ơn khách quen trước, rồi 'However' nói rõ ai có quyền — không đổi luật vì khách quen.",
    ),
    risk({
      ...sp(
        "I had wine at lunch, but I want the sauna. Just this once?",
        "I am sorry, madam. We cannot let you use the sauna after alcohol; however, you can rest in the quiet corner.",
        "Luật an toàn không thương lượng, kể cả 'chỉ một lần'. 'We cannot let you use' từ chối rõ mà vẫn lịch sự, rồi '; however,' đưa một chỗ nghỉ thay thế.",
        undefined,
        ["use", "sauna", "alcohol", "however", "rest", "quiet", "corner"],
      ),
      alsoAccept: [
        "I am sorry, madam. We cannot let you use the sauna after alcohol. However, you can rest in the quiet corner.",
        "I am sorry, madam. After alcohol, we cannot let you use the sauna; however, you can rest in the quiet corner.",
      ],
    }),
  ],
  reading: read(
    `On a busy Saturday, Thanh hears the word "please" many times, and he says "however" almost as often. A guest cancelled his massage two hours before, and he asks Thanh to waive the fee. Thanh explains that the cancellation window is four hours, because the therapist was kept for the guest. He cannot waive the fee; however, he promises to ask his manager and call the guest before six. Later, a regular guest asks for an exception to the same rule. Thanh thanks her for coming back. However, he says only the manager can make an exception. In the evening, a guest wants a hot stone massage at seven, which is the spa's peak time. Thanh offers a free room later in the evening instead. Then a guest who had wine at lunch asks for the sauna, "just this once". This time there is nothing to negotiate. Thanh says no, kindly and clearly, and he offers the quiet corner instead.`,
    [
      {
        q: "Vì sao Thanh không tự miễn phí hủy cho khách?",
        options: [
          "Vì miễn phí là việc quản lý quyết",
          "Vì khách hủy quá trễ, sau cả giờ hẹn",
          "Vì khách không phải là khách quen",
        ],
        correct: 0,
        explanation:
          "'He cannot waive the fee; however, he promises to ask his manager' — lễ tân giữ luật, quản lý quyết ngoại lệ.",
      },
      {
        q: "Với khách muốn massage đá nóng lúc bảy giờ, Thanh làm gì?",
        options: [
          "Xếp khách vào giờ cao điểm dù đã kín chỗ",
          "Đưa phòng trống muộn hơn trong buổi tối",
          "Hỏi quản lý về một ngoại lệ",
        ],
        correct: 1,
        explanation:
          "'a guest wants a hot stone massage at seven, which is the spa's peak time. Thanh offers a free room later in the evening instead.'",
      },
      {
        q: "Vì sao chuyện phòng xông hơi 'không có gì để thương lượng'?",
        options: [
          "Vì phòng xông hơi đã kín chỗ",
          "Vì khách không trả phí phòng xông hơi",
          "Vì đó là luật an toàn",
        ],
        correct: 2,
        explanation:
          "'a guest who had wine at lunch asks for the sauna… This time there is nothing to negotiate.' — luật an toàn không đổi lấy gì cả.",
      },
    ],
  ),
  game: [
    game(
      "I cancelled late, but please waive the fee for me.",
      "I am sorry, sir. I cannot waive the fee; however, I will ask my manager today and come back to you.",
      "I am sorry, sir. I cannot waives the fee; however, I will ask my manager today.",
      "No problem at all, sir. I will just delete the fee from your bill this time, as a favour.",
      undefined,
      "Câu thứ hai sai dạng: sau 'cannot' là 'waive', không thêm -s. Câu thứ ba chiều khách nhưng tự xoá một khoản phí — việc của quản lý. Câu đúng giữ luật và nói việc bạn sẽ làm.",
    ),
    game(
      "I had two beers at lunch. Can I use the sauna now?",
      "I am sorry, sir. We cannot let you use the sauna after alcohol; however, you can rest in the quiet corner.",
      "I am sorry, sir. We cannot let you to use the sauna after alcohol; however, you can rest in the quiet corner.",
      "Just a short visit then, sir. Drink some water first, and come out if you feel dizzy.",
      undefined,
      "Câu thứ hai thừa 'to': sau 'let you' là động từ nguyên mẫu không 'to' ('let you use'). Câu thứ ba thương lượng một luật an toàn — rượu và nhiệt có thể làm khách ngất. Câu đúng từ chối rõ và đưa chỗ nghỉ thay thế.",
    ),
  ],
});

// ── Lesson 4 — Agreeing and confirming ─────────────────────────────────
const t4a =
  "That is a lovely way to celebrate, madam. What if we split the group into two times, at two and at four?";
const t4b =
  "Yes, madam. I can hold the rooms until noon tomorrow, and that is the deadline for your answer.";

const lesson4 = L(35, 4, "Agreeing and Confirming", "Chốt thoả thuận", {
  vocabulary: [
    c("Agreement", "We have an agreement on the times for the group.", [
      "/əˈɡriːmənt/",
      "Sự thoả thuận",
      "📝",
    ]),
    c("Hold", "I can hold the rooms until noon tomorrow.", [
      "/həʊld/",
      "Giữ (chỗ, phòng) trong một thời gian",
      "📌",
    ]),
    c("Deadline", "The deadline for the names is Thursday at five.", [
      "/ˈdedlaɪn/",
      "Hạn chót",
      "🕛",
    ]),
    c("Group booking", "A group booking of twelve needs one day's notice.", [
      "/ˌɡruːp ˈbʊkɪŋ/",
      "Đặt chỗ theo nhóm",
      "👥",
    ]),
    c("Split", "We can split the group into two times.", ["/splɪt/", "Chia ra, tách ra", "✂️"]),
  ],
  grammar: [
    g(
      "Rooms I keep until tomorrow.",
      "I can hold the rooms until noon tomorrow, madam.",
      "'until' = giữ liên tục TỚI mốc đó. 'by' chỉ hạn chót để làm xong một việc — không dùng với 'hold'.",
      "I can hold the rooms by noon tomorrow, madam.",
    ),
    g(
      "Twelve people, two groups, okay?",
      "What if we split the group into two times?",
      "'What if we + động từ nguyên mẫu': 'split', không thêm -s. 'split… into…' = chia thành.",
      "What if we splits the group into two times?",
    ),
  ],
  speaking: [
    sp(
      "We are twelve friends celebrating a wedding, and we all want massages at two on Friday.",
      t4a,
      "Chúc khách một câu, rồi đề xuất chia nhóm ('split') bằng câu hỏi What if we…? — đặt cả nhóm lớn cùng một giờ là không thực tế.",
    ),
    sp(
      "Hmm. Can you hold the rooms while I ask the group?",
      t4b,
      "Giữ chỗ có hạn: nói rõ giữ tới khi nào ('until'), và đó là hạn chót ('deadline').",
      undefined,
      undefined,
      t4a,
    ),
    {
      ...sp(
        "Good. Then we have an agreement.",
        "Thank you, madam. I will send the agreement by email, so everyone has the same times.",
        "Chốt thoả thuận bằng văn bản: gửi email để cả nhóm cùng một lịch.",
        undefined,
        undefined,
        t4b,
      ),
      alsoAccept: [
        "Thank you, madam. I will email you the agreement, so everyone has the same times.",
      ],
    },
    risk({
      ...sp(
        "For twelve people, we expect a group discount of twenty percent.",
        "Thank you, madam. I cannot offer a group discount, but I will ask my manager today.",
        "Giảm giá cho nhóm là quyết định của quản lý, và không nói con số nào thay quản lý.",
        undefined,
        ["offer", "group", "discount", "ask", "manager"],
      ),
      alsoAccept: [
        "Thank you, madam. I am not able to offer a group discount, but I will ask my manager today.",
        "Thank you, madam. I cannot offer a group discount myself, but I will ask my manager today.",
      ],
    }),
    sp(
      "A group booking of twelve wants all the massages at the same time. Can we do it?",
      "Not all at once. However, we can split the group into two times.",
      "Nói với đồng nghiệp — không dùng sir hay madam. Nói thật giới hạn, rồi 'However' đưa giải pháp.",
      "colleague",
    ),
    sp(
      "Did the group agree to the new times?",
      "Yes. The group booking is agreed, and they will confirm the names before the deadline.",
      "Báo cáo cho quản lý: đã chốt, và việc còn lại có hạn chót.",
      "manager",
    ),
  ],
  reading: read(
    `Ms Lopez calls the spa on Tuesday. She is organising a day for twelve friends before a wedding, and they all want massages at two on Friday. Trang knows the spa cannot give twelve massages at the same time. She congratulates Ms Lopez, and then she makes a suggestion: what if they split the group into two times, at two and at four? Ms Lopez likes the idea, but she must ask her friends. Trang offers to hold the rooms until noon on Wednesday, and she explains that this is the deadline for an answer. Ms Lopez also asks for a group discount. Trang says she cannot offer one, but she will ask her manager the same day. On Wednesday morning, Ms Lopez calls back and says yes to the two times. The manager offers complimentary herbal tea for the group, but no discount. Trang sends the agreement by email, so all twelve friends have the same times.`,
    [
      {
        q: "Trang đề xuất gì cho nhóm mười hai người?",
        options: [
          "Đổi tất cả sang sáng thứ Bảy cùng giờ",
          "Chỉ đặt cho sáu người",
          "Chia nhóm thành hai khung giờ",
        ],
        correct: 2,
        explanation: "'what if they split the group into two times, at two and at four?'",
      },
      {
        q: "Hạn chót để khách trả lời là khi nào?",
        options: ["Hai giờ chiều thứ Sáu", "Trưa thứ Tư", "Sáng thứ Ba"],
        correct: 1,
        explanation:
          "'Trang offers to hold the rooms until noon on Wednesday, and she explains that this is the deadline for an answer.'",
      },
      {
        q: "Kết quả của yêu cầu giảm giá là gì?",
        options: [
          "Trang giảm giá cho nhóm ngay",
          "Khách được giảm hai mươi phần trăm",
          "Quản lý tặng trà, không giảm giá",
        ],
        correct: 2,
        explanation:
          "'The manager offers complimentary herbal tea for the group, but no discount.' — lễ tân hỏi, quản lý quyết.",
      },
    ],
  ),
  game: [
    game(
      "Can you keep the rooms for us until we decide?",
      "Yes, madam. I can hold the rooms until noon tomorrow.",
      "Yes, madam. I can holding the rooms until noon tomorrow.",
      "Of course, madam. Take as long as you like; we will keep them for you all week.",
      undefined,
      "Câu thứ hai sai dạng: sau 'can' là 'hold'. Câu thứ ba hào phóng nhưng giữ phòng không có hạn — khách khác mất chỗ, và spa không biết khi nào nhóm trả lời. Câu đúng giữ phòng kèm hạn chót.",
    ),
    game(
      "We want a twenty percent group discount.",
      "Thank you, madam. I cannot offer a group discount, but I will ask my manager today.",
      "Thank you, madam. I cannot offer a group discount, but I will asking my manager today.",
      "Of course, madam. Twenty percent is fine for a group of twelve, and I will put it in writing now.",
      undefined,
      "Câu thứ hai sai dạng: sau 'will' là 'ask'. Câu thứ ba đồng ý một con số giảm giá và còn hứa ghi thành văn bản — lễ tân không có quyền đó. Câu đúng nói rõ giới hạn và hỏi quản lý.",
    ),
  ],
});

export const week: AuthoredWeek = {
  title: { en: "Light Negotiation", vi: "Đàm phán nhẹ với khách và đồng nghiệp" },
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: thương lượng bằng những gì lễ tân được quyết — giờ, phòng, cách chia nhóm, thời gian giữ chỗ ('What if we…?', 'As an alternative…', 'I can hold… until…'); đổi ca với đồng nghiệp 'in exchange for…' rồi xin giám sát duyệt; giữ nguyên tắc bằng '; however,' — không thương lượng giảm giá, miễn phí hay ngoại lệ (việc của quản lý), và không bao giờ thương lượng luật an toàn.",
};
