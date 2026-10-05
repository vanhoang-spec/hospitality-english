// HK week 35 — Negotiating, lightly (see ../kit.ts).
//
// What the floor can move is the HOUR, the order of the rooms and who does
// them; what it never moves is the standard, the safety checks, the record
// and the door. Every "no" travels with a "however… what if…?", and "in
// exchange for" is mostly said inside the team — with a guest it sounds like
// bargaining. The door rule is the one the whole phase uses: a guest who ASKS
// for the door to be closed hears the rule and an offer to come back; a guest
// who presses, or crosses the line in words or hands, sees the attendant step
// outside and the supervisor come. Money keeps its owners: a waiver is the
// Duty Manager's, a billing error the front desk's, and an envelope is
// refused and reported.
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

// ── Lesson 1 — the hour the guest wants ───────────────────────────────────
const t1a =
  "I am so sorry, madam. I can fit you in for an afternoon clean after one o'clock, if that suits you.";
const t1b = "Then what if I came at half past twelve, madam, just as you go out?";
const t1c =
  "Yes, madam. I will put half past twelve on your guest profile today, so the whole team knows.";

// ── Lesson 2 — more than the standard ─────────────────────────────────────
const t2a =
  "Fresh towels twice a day are no problem, madam. However, I will ask my supervisor about a second bed service.";
const t2b =
  "A second bed service changes the plan for the whole floor, madam, so I will put it forward to my supervisor today.";
const t2c =
  "I will ask for her approval today, madam, and come back to you before six, whatever the answer is.";

const lesson1 = L(35, 1, "The Hour the Guest Wants", "Khung giờ khách muốn", {
  vocabulary: [
    c("Service window", "I write the guest's service window on the profile the same day.", [
      "/ˈsɜːvɪs ˌwɪndəʊ/",
      "Khung giờ dọn phòng đã hẹn — từ dùng trong tổ",
      "🪟",
    ]),
    c("Fit you in", "I can fit you in after one, madam, if that suits you.", [
      "/ˌfɪt juː ˈɪn/",
      "Xếp được khách vào lịch làm việc",
      "🧩",
    ]),
    c("However", "However, after two days someone must look in for safety.", [
      "/haʊˈevə/",
      "Tuy nhiên — bước ngoặt lịch sự giữa hai vế",
      "↔️",
    ]),
    c("Every other day", "Some long-stay guests choose service every other day.", [
      "/ˈevri ˌʌðə ˈdeɪ/",
      "Cách một ngày một lần",
      "📅",
    ]),
    c("Step outside", "If a guest crosses the line, I step outside and call my supervisor.", [
      "/ˌstep aʊtˈsaɪd/",
      "Bước ra ngoài, rời khỏi phòng khách ngay",
      "🚶",
    ]),
  ],
  grammar: [
    g(
      "We clean nine to four. Your time is not possible.",
      "Five o'clock is after my shift, sir. However, what if I came at half past three?",
      "Khung đàm phán của tuần: giữ giới hạn + 'However' + 'what if + quá khứ đơn' (came) — nghe mềm và giả định. Không dùng động từ -ing sau 'what if I'.",
      "Five o'clock is after my shift, sir. However, what if I coming at half past three?",
    ),
    g(
      "No! I cannot close door. Not allowed.",
      "I am sorry, madam, the door stays open while I work. May I come back at four instead?",
      "Khách HỎI khép cửa: nêu luật một câu, rồi đề nghị quay lại sau. Chủ ngữ số ít 'the door' cần 'stays'. Luật cửa mở bảo vệ chính bạn, và không đổi vì bất kỳ thoả thuận giờ giấc nào.",
      "I am sorry, madam, the door stay open while I work. May I come back at four instead?",
    ),
  ],
  speaking: [
    sp(
      "I sleep until noon, and every day someone knocks at nine.",
      t1a,
      "Xin lỗi một câu, rồi đổi được GIỜ — thứ buồng phòng thật sự đổi được. 'Fit you in' đọc nối /ˌfɪt juː ˈɪn/.",
    ),
    sp(
      "One is too late. I go out at half past twelve.",
      t1b,
      "'what if I came' — quá khứ đơn sau 'what if' làm lời đề nghị mềm hơn. Đưa một giờ khớp với lịch của khách.",
      undefined,
      undefined,
      t1a,
    ),
    sp(
      "That works. Will you remember tomorrow?",
      t1c,
      "Ghi vào hồ sơ khách ngay hôm nay — lịch nằm trong đầu một người sẽ mất vào ngày người đó nghỉ. Với khách thì nói GIỜ, không nói từ nghề 'service window'.",
      undefined,
      undefined,
      t1b,
    ),
    {
      ...sp(
        "Just do not clean at all this week. We will manage on our own.",
        "For today, of course, madam. However, after two days someone must look in for safety. What if I came every other day?",
        "Nhận lời cho HÔM NAY, rồi 'However' + ràng buộc an toàn hai ngày, rồi 'what if' + một phương án. Đây là quy trình khách được biết, không phải hạn mức nội bộ.",
      ),
      alsoAccept: [
        "For today, of course, madam. However, after two days someone must look in for safety. What if I came every second day?",
        "Of course, madam, for today. However, after two days someone must look in for safety. What if I came every other day?",
      ],
    },
    risk({
      ...sp(
        "Come here a moment. You are a pretty one, aren't you?",
        "I will step outside now, sir.",
        "Khách vượt ranh giới bằng lời hay bằng tay: một câu, rồi đi. Không xin phép, không giải thích, và không nói trước trong phòng là sẽ gọi ai. Ra hành lang rồi mới gọi giám sát. 'Step outside' — nhấn ở 'side'.",
      ),
      alsoAccept: [
        "I am stepping outside now, sir.",
        "I am going to step outside now, sir.",
        "I am stepping out now, sir.",
      ],
    }),
    sp(
      "Floor supervisor here. You called me. What happened?",
      "I have come out of the room. The guest said something to me, and I am not going back in.",
      "Báo cấp trên bằng ba sự thật, không bằng cảm xúc: đã ra khỏi phòng, chuyện gì, và không vào lại. Ai vào lại là việc của giám sát. Không kính ngữ.",
      "manager",
    ),
    sp(
      "1203 wants service at five, but my shift ends at four. What should I offer?",
      "Offer four, or ask the supervisor about a late clean at five, and write the service window on the profile.",
      "Đồng nghiệp hỏi: dùng từ nghề, không kính ngữ. Không hứa giờ thay ca khác — hỏi giám sát trước.",
      "colleague",
    ),
  ],
  reading: read(
    `WHAT MOVES AND WHAT DOES NOT
WHAT MOVES: the hour, the order of the floor, which attendant comes, and whether a guest skips a day. A morning clean can become an afternoon clean or a late clean.
WHAT NEVER MOVES: the standard of the clean, the safety checks, and what goes on the record. The wet floor sign and the balcony door are checked on every visit. A shorter visit is a smaller job done fully, not a lighter one.
Every no travels with a what-if: "Five is after my shift. However, what if I came at four?" Then write the agreed time on the guest profile the same day.
A room may skip a day at the guest's request. It may not skip two: after two days with no entry, your supervisor arranges a check.
A Do Not Disturb sign still up after three, with no answer on the phone, goes to your supervisor. Your supervisor and Security do that welfare check together, never you alone.
ONE RULE NEVER MOVES FOR YOU. While a guest is in the room, the door stays open and the cleaning trolley stays across it.
A guest who simply asks you to close the door hears the rule and an offer to come back later. A guest who presses you, or crosses the line with words or hands, is not yours to handle. Step outside, and call your supervisor from the corridor.`,
    [
      {
        q: "Khách xin không dọn phòng cả tuần thì sao?",
        options: [
          "Đồng ý không dọn cả tuần, vì đó là quyền của khách khi ở",
          "Đồng ý cho hôm nay; quá hai ngày phải có người vào kiểm tra",
          "Từ chối, vì ngày nào phòng cũng phải được dọn đầy đủ như nhau",
        ],
        correct: 1,
        explanation:
          "'A room may skip a day… It may not skip two: after two days with no entry, your supervisor arranges a check' — giờ đổi được, kiểm tra an toàn thì không.",
      },
      {
        q: "Khách chỉ nhờ khép cửa trong lúc dọn thì làm gì?",
        options: [
          "Nêu luật cửa mở rồi đề nghị quay lại sau",
          "Khép cửa lại vì khách đã lịch sự nhờ",
          "Bước ra ngoài ngay và gọi giám sát lên phòng",
        ],
        correct: 0,
        explanation:
          "'A guest who simply asks… hears the rule and an offer to come back later' — bước ra và gọi giám sát là cho khách ép hoặc vượt ranh giới.",
      },
      {
        q: "Biển Do Not Disturb vẫn treo sau ba giờ và không ai nghe máy thì ai vào kiểm tra?",
        options: [
          "Nhân viên buồng phòng vào một mình cho nhanh",
          "Không ai vào cho tới khi khách tự gọi xuống",
          "Giám sát tầng cùng với bộ phận an ninh",
        ],
        correct: 2,
        explanation:
          "'Your supervisor and Security do that welfare check together, never you alone' — một mình mở cửa phòng như vậy là rủi ro cho cả khách lẫn bạn.",
      },
    ],
  ),
  game: [
    round(
      0,
      "Could you do just ten minutes now? I have a call at half past.",
      "Ten minutes now, madam. However, what if I came back at four for the rest of the room?",
      "Ten minutes now, madam. However, what if I coming back at four for the rest of the room?",
      "Ten minutes is not really enough for a room, madam, so I will come back this afternoon instead.",
      "Phương án 'not really enough… come back this afternoon' từ chối thẳng mà không đưa khách lựa chọn nào. Phương án 'what if I coming' sai: sau 'what if I' là quá khứ đơn (came) hoặc hiện tại đơn, không phải -ing. Câu đúng nhận phần làm được ngay và đề nghị phần còn lại.",
    ),
    round(
      2,
      "Just shut the door while you do the bathroom. I am trying to sleep.",
      "I am sorry, madam, I keep the door open while I work. May I come back when you are awake?",
      "I am sorry, madam, I keeps the door open while I work. May I come back later?",
      "I am stepping outside now, madam, and I am calling my supervisor to your room.",
      "Phương án 'stepping outside… calling my supervisor' dùng cách xử lý dành cho khách ép hoặc vượt ranh giới, trong khi khách chỉ nhờ — khách đang ngủ sẽ thấy bị đối xử như người có lỗi. Phương án 'I keeps' sai chia động từ: 'I' không thêm -s. Câu đúng nêu luật rồi đề nghị quay lại.",
    ),
  ],
});

const lesson2 = L(35, 2, "More Than the Standard", "Nhiều hơn tiêu chuẩn", {
  vocabulary: [
    c("What if", "What if I came at four instead, madam?", [
      "/ˈwɒt ɪf/",
      "Còn nếu… thì sao — mở một phương án khác",
      "💡",
    ]),
    c("Put it forward", "I will put it forward to my supervisor today, madam.", [
      "/ˌpʊt ɪt ˈfɔːwəd/",
      "Trình lên cấp trên xem xét",
      "📤",
    ]),
    c("Bed service", "A second bed service in a day is my supervisor's decision.", [
      "/ˈbed ˌsɜːvɪs/",
      "Lượt dọn và trải lại giường trong ngày",
      "🛌",
    ]),
    c("Allowance", "Soap, shampoo and two bottles of water are in the daily allowance.", [
      "/əˈlaʊəns/",
      "Định mức đồ dùng được cấp mỗi ngày",
      "🧮",
    ]),
    c("Approval", "A second bed service needs my supervisor's approval before I promise it.", [
      "/əˈpruːvl/",
      "Sự chấp thuận của cấp trên",
      "✅",
    ]),
  ],
  grammar: [
    g(
      "One robe per person. That is the rule, madam.",
      "I will bring a second robe now, madam. However, for the third, I will ask my supervisor today.",
      "Tách rõ CÁI TỰ LÀM ĐƯỢC và CÁI PHẢI TRÌNH LÊN, nối bằng 'However'. Sau 'will' là động từ nguyên mẫu: will ask. Không nói con số hạn mức — khách sẽ xin đúng bằng con số đó.",
      "I will bring a second robe now, madam. However, for the third, I will asking my supervisor today.",
    ),
    g(
      "Extra things cost money. Ask the front desk about it.",
      "An extra bed is arranged by the front desk, sir. Shall I ask them to call your room?",
      "Bị động 'is arranged by' chỉ đúng bộ phận lo việc đó; giữ đuôi -ed. Rồi bạn vẫn giữ việc trong tay: 'Shall I ask them to call your room?'",
      "An extra bed is arrange by the front desk, sir. Shall I ask them to call your room?",
    ),
  ],
  speaking: [
    sp(
      "We would like the bed made twice a day, and fresh towels each time.",
      t2a,
      "Cho ngay cái mình được cho (khăn), rồi 'However' + cái phải hỏi (lượt dọn giường thứ hai). Không nói như thể lượt dọn đó là của bạn.",
    ),
    sp(
      "Why do you need to ask? It is only a bed.",
      t2b,
      "Nói lý do thật, ngắn, rồi việc bạn làm: 'put it forward' /ˌpʊt ɪt ˈfɔːwəd/ — trình lên trong ngày.",
      undefined,
      undefined,
      t2a,
    ),
    {
      ...sp(
        "All right. When will I know?",
        t2c,
        "Hứa một mốc bạn tự giữ được, và quay lại dù câu trả lời là có hay không.",
        undefined,
        undefined,
        t2b,
      ),
      alsoAccept: [
        "I will ask for her approval today, madam, and come back to you before six, whatever the answer may be.",
      ],
    },
    sp(
      "Could we have a second bathrobe, and a third for my mother when she visits?",
      "I can bring a second robe now, madam. For the third, what if I put it forward and called you this afternoon?",
      "Cho ngay cái thứ hai; với cái thứ ba thì 'what if I put it forward' rồi 'called you' — hai động từ quá khứ sau 'what if'.",
    ),
    {
      ...sp(
        "We are staying a month. Can we have the full amenity set replaced every day?",
        "Soap and shampoo come every day, madam, as part of the daily allowance. For the full set, I will ask and come back to you today.",
        "Nói thẳng cái phòng vốn có mỗi ngày ('allowance'), rồi phần vượt định mức thì hỏi và hẹn quay lại. Không đọc con số định mức nội bộ.",
      ),
      alsoAccept: [
        "Soap and shampoo come every day, madam, as part of the daily allowance. For the full set, I will ask my supervisor and come back to you today.",
      ],
    },
    {
      ...sp(
        "Can you bring an extra bed for our son tonight?",
        "An extra bed is arranged by the front desk, sir. Shall I ask them to call your room now?",
        "Giường phụ có tính phí và do quầy lễ tân sắp xếp. Chỉ đúng bộ phận, rồi bạn vẫn giữ việc: nhờ quầy gọi lên phòng.",
      ),
      alsoAccept: [
        "The front desk arranges an extra bed, sir. Shall I ask them to call your room now?",
      ],
    },
    sp(
      "1204 wants a third robe and the cleaning charge removed. What do I tell them?",
      "Give two robes, and for the third, put it forward. The charge is for the Duty Manager, not for us.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Bàn giao theo tầng thẩm quyền: cái tự cho, cái trình lên, và cái không thuộc tầng.",
      "colleague",
    ),
  ],
  reading: read(
    `WHAT THE FLOOR MAY GIVE — AND WHAT IT MUST PASS UP
THE ATTENDANT GIVES FREELY: extra towels, extra water, more tea and coffee, extra hangers, extra blankets, and a second robe. A foam pillow in place of a feather pillow is yours to give too.
Soap, shampoo and the small amenities come every day, as the daily allowance. What the room includes every day, you may state plainly.
THE SUPERVISOR DECIDES: a second bed service in a day, and amenities beyond the daily allowance on a long stay. Put the request forward the same day, and come back to the guest with a time.
THE FRONT DESK ARRANGES: an extra bed, a cot, and any move to another room. You ask on the guest's behalf; you do not allocate.
Never say a limit of your own. "I will put it forward and come back to you before six" is a promise you can keep. "My limit is three robes" invites a guest to ask for exactly three.
Extra bedding asked for "a visitor" is a supervisor matter as well as a service one. Give what your tier allows, then tell your supervisor the same hour.
Giving generously inside your own tier is the cheapest guest satisfaction a hotel can buy.`,
    [
      {
        q: "Khách xin dọn giường lần thứ hai trong ngày thì ai quyết?",
        options: [
          "Nhân viên buồng phòng, vì đó là việc trên tầng",
          "Quầy lễ tân, vì có thể tính thêm phí",
          "Giám sát tầng, sau khi nhân viên trình lên",
        ],
        correct: 2,
        explanation:
          "'THE SUPERVISOR DECIDES: a second bed service in a day' — bạn trình lên trong ngày và quay lại với khách kèm một mốc giờ.",
      },
      {
        q: "Vì sao không nói hạn mức của mình cho khách?",
        options: [
          "Vì khách sẽ xin đúng bằng con số hạn mức vừa nghe",
          "Vì hạn mức đổi theo từng mùa cao điểm trong năm",
          "Vì chỉ quản lý mới được biết hạn mức của nhân viên",
        ],
        correct: 0,
        explanation:
          "'My limit is three robes invites a guest to ask for exactly three' — nói quy trình và thời gian, không nói con số.",
      },
    ],
  ),
  game: [
    round(
      1,
      "Can we have extra coffee capsules and two more bottles of water?",
      "Of course, madam. Those are part of the daily allowance, and I will bring them now.",
      "Of course, madam. Those are part of the daily allowance, and I will brings them now.",
      "I will have to ask my supervisor first, madam, as extras like that are not usually free.",
      "Phương án 'ask my supervisor first' đẩy lên trên một việc bạn được tự làm — khách phải chờ vì một gói cà phê. Phương án 'will brings' sai: sau 'will' là động từ nguyên mẫu. Câu đúng cho ngay trong định mức của mình.",
    ),
    round(
      0,
      "Could we have the bed made again this afternoon? We are taking a nap.",
      "I will put it forward to my supervisor today, madam, and come back to you before three.",
      "I will put it forward to my supervisor, madam, and coming back before three.",
      "Of course, madam — a second bed service is something I can approve myself.",
      "Phương án 'I can approve myself' tự nhận một quyền của giám sát. Phương án 'and coming back' sai: hai động từ sau 'will' nối bằng 'and' đều ở dạng nguyên mẫu (will put… and come). Câu đúng trình lên và hẹn giờ quay lại.",
    ),
  ],
});

// ── Lesson 3 — negotiating with your own team ─────────────────────────────
const t3a =
  "I can take your rush room now, in exchange for your help with my two stayovers after lunch.";
const t3b = "Yes, we check with her before we swap, so the room status board stays right.";
const t3c = "Then 805 goes first, and your rush room comes straight after it.";

// ── Lesson 4 — when the guest wants it waived ─────────────────────────────
const t4a =
  "I cannot waive that charge, madam. I will ask the Duty Manager now and come back to you before six.";
const t4b =
  "Only the front desk and the Duty Manager can change your folio, madam. I will bring you their answer myself.";
const t4c =
  "You will have it today, madam. If I have no answer by six, I will still come back and tell you.";

const lesson3 = L(35, 3, "Negotiating With Your Own Team", "Thương lượng trong tổ", {
  vocabulary: [
    c("In exchange for", "I will take your rush room, in exchange for your help after lunch.", [
      "/ɪn ɪksˈtʃeɪndʒ fə/",
      "Để đổi lấy — dùng khi trao đổi việc trong tổ",
      "🔁",
    ]),
    c("Swap", "We can swap two rooms, but the supervisor must know first.", [
      "/swɒp/",
      "Đổi cho nhau",
      "🔀",
    ]),
    c("Short-staffed", "We are short-staffed today, so every attendant takes one more room.", [
      "/ˌʃɔːt ˈstɑːft/",
      "Thiếu người trong ca",
      "👥",
    ]),
    c("Rush room", "A rush room is cleaned first, because a guest is waiting for it.", [
      "/ˈrʌʃ ˌruːm/",
      "Phòng cần làm gấp vì khách sắp nhận",
      "🏃",
    ]),
  ],
  grammar: [
    g(
      "You do my rooms. I am tired.",
      "What if you took my two stayovers, in exchange for my help with your rush room?",
      "Đề nghị trao đổi trong tổ: 'What if + quá khứ đơn…, in exchange FOR…'. Người Việt hay nói 'in exchange of' — sai giới từ.",
      "What if you took my two stayovers, in exchange of my help with your rush room?",
    ),
    g(
      "Ms Lan, too many rooms. I cannot.",
      "We are short-staffed today, Ms Lan. However, I can take two extra rooms before three.",
      "Nói sự thật về ca ('short-staffed' — có đuôi -ed), rồi 'However' + phần mình nhận được, có mốc giờ. Với cấp trên: gọi tên, không kính ngữ.",
      "We are short-staff today, Ms Lan. However, I can take two extra rooms before three.",
    ),
  ],
  speaking: [
    sp(
      "Hoa here. I have three checkouts and a rush room on the eighth floor. Can you help?",
      t3a,
      "Đồng nghiệp: không kính ngữ. Trao đổi công bằng bằng 'in exchange for' — đề nghị rõ việc mình nhận và việc mình cần lại.",
      "colleague",
    ),
    sp(
      "Deal. Should we tell Ms Lan?",
      t3b,
      "Đổi phòng trong tổ thì giám sát phải biết TRƯỚC — bảng trạng thái phòng phải đúng. 'Swap' /swɒp/ — một âm tiết.",
      "colleague",
      undefined,
      t3a,
    ),
    sp(
      "Fine. And the VIP in 805 arrives at two.",
      t3c,
      "Khách sắp tới trước, phòng gấp ngay sau. Câu ghép hai vế với 'and', nói thứ tự rõ ràng.",
      "colleague",
      undefined,
      t3b,
    ),
    {
      ...sp(
        "Ms Lan here. We are short today. Can you take two extra rooms?",
        "Yes, Ms Lan. What if I took the two rooms, in exchange for someone else doing my turndown list tonight?",
        "Với cấp trên: nhận việc trước ('Yes'), rồi đề nghị đổi bằng 'What if I took' và 'in exchange for'. Gọi tên, không nói 'madam'.",
        "manager",
      ),
      alsoAccept: [
        "Yes, Ms Lan. What if I took the two rooms, and someone else did my turndown list tonight in exchange?",
      ],
    },
    sp(
      "Ms Lan here. Why are 1102 and 1104 still not done?",
      "We are short-staffed on this floor, Ms Lan. However, both will be ready by three, and I will call you then.",
      "Báo cấp trên: một lý do thật, rồi 'However' + mốc giờ mình giữ được. Không đổ cho đồng nghiệp.",
      "manager",
    ),
    risk({
      ...sp(
        "Can you lend me your master key? Mine is at the office.",
        "No, my key never leaves me. Please sign for one in the master key log.",
        "Chìa tổng không bao giờ rời người giữ nó, kể cả với đồng nghiệp thân. Từ chối một câu, rồi chỉ đúng đường: ký nhận chìa trong sổ chìa tổng. Không kính ngữ.",
        "colleague",
      ),
      alsoAccept: [
        "No, my key never leaves me. Please sign for your own key in the master key log.",
        "I am sorry, my key never leaves me. Please sign for one in the master key log.",
      ],
    }),
    sp(
      "The linen room is short of king sheets. Can I take two from your trolley?",
      "Yes, take two now. What if you gave me two back when the linen delivery comes?",
      "Đồng nghiệp: trao đổi nhỏ, công bằng, không kính ngữ. 'What if you gave' — quá khứ đơn sau 'what if'.",
      "colleague",
    ),
  ],
  reading: read(
    `NEGOTIATING ON YOUR OWN FLOOR
Most negotiation in housekeeping happens between colleagues, not with guests. A fair trade keeps the floor moving: "I will take your rush room, in exchange for your help with my stayovers."
Every swap is told to the supervisor before it happens, and you report back when it is done. The room status board must show who is in which room, or the next call goes to the wrong person.
When the floor is short-staffed, the order is simple. Rooms with a guest arriving go first, rush rooms next, then checkouts, then stayovers.
Negotiate the time and the order, never the standard. "I will do it quickly" is not a trade; it is a room done badly.
With your supervisor, say yes to the work first, and then ask for what you need: "What if someone else did my turndown list tonight?"
A few things are never traded. Your master key never leaves you, not even for a friend; a colleague signs for their own key in the master key log. The door rule and the safety checks are never part of a deal either.
Linen borrowed from your trolley is given back, and you say so out loud, so nobody counts it twice.`,
    [
      {
        q: "Đồng nghiệp mượn chìa tổng vì chìa của mình để ở văn phòng thì sao?",
        options: [
          "Cho mượn trong vài phút rồi đứng chờ ở cửa để lấy lại ngay",
          "Không cho mượn; đồng nghiệp ký nhận chìa trong sổ",
          "Tự mở cửa giúp đồng nghiệp rồi vẫn giữ lại chìa tổng của mình",
        ],
        correct: 1,
        explanation:
          "'Your master key never leaves you, not even for a friend; a colleague signs for their own key in the master key log' — chìa tổng mất dấu là rủi ro an ninh của cả tầng.",
      },
      {
        q: "Khi ca thiếu người, phòng nào làm trước?",
        options: [
          "Phòng có khách sắp tới nhận",
          "Phòng khách đang ở lại thêm ngày",
          "Phòng trả sớm nhất trong buổi sáng",
        ],
        correct: 0,
        explanation:
          "'Rooms with a guest arriving go first, rush rooms next, then checkouts, then stayovers' — thứ tự đi theo người đang chờ.",
      },
      {
        q: "Điều gì KHÔNG bao giờ được đem ra trao đổi?",
        options: [
          "Giờ dọn phòng và thứ tự các phòng trên tầng trong ngày hôm đó",
          "Người nào trong tổ sẽ làm phòng nào trong buổi chiều hôm đó",
          "Tiêu chuẩn dọn, luật cửa và các bước kiểm an toàn",
        ],
        correct: 2,
        explanation:
          "'Negotiate the time and the order, never the standard… The door rule and the safety checks are never part of a deal' — đổi giờ thì được, đổi tiêu chuẩn thì không.",
      },
    ],
  ),
  game: [
    round(
      2,
      "Can you cover my last two rooms? I want to leave early today.",
      "I can, if Ms Lan agrees first. Shall we ask her together?",
      "I can, if Ms Lan agree first. Shall we ask her together?",
      "Sure, just go. Nobody checks the room status board after three anyway.",
      "Phương án 'Nobody checks the board' đổi việc sau lưng giám sát — bảng trạng thái sai thì cuộc gọi tiếp theo đến nhầm người. Phương án 'if Ms Lan agree' sai chia động từ: chủ ngữ số ít cần 'agrees'. Câu đúng nhận lời có điều kiện và đưa giám sát vào.",
      "colleague",
    ),
    round(
      1,
      "Ms Lan here. Can you take 1208 as well? We are short today.",
      "Yes, Ms Lan. What if 1210 went to the late team, in exchange for me taking 1208?",
      "Yes, Ms Lan. What if 1210 go to the late team, in exchange for me taking 1208?",
      "Of course, madam, I will do anything you need today, whatever happens to my other rooms.",
      "Phương án 'Of course, madam… whatever happens' gọi cấp trên là 'madam' như gọi khách, và nhận việc mà bỏ mặc các phòng còn lại. Phương án 'What if 1210 go' sai: sau 'what if' dùng quá khứ đơn (went). Câu đúng nhận việc và đề nghị một trao đổi rõ ràng.",
      "manager",
    ),
  ],
});

const lesson4 = L(35, 4, "When the Guest Wants It Waived", "Khi khách xin miễn khoản phí", {
  vocabulary: [
    c("Waive", "Only the Duty Manager can waive a charge that is correct.", [
      "/weɪv/",
      "Miễn một khoản phí",
      "🙅",
    ]),
    c("Folio", "A charge on the folio is changed by the front desk, never by the floor.", [
      "/ˈfəʊliəʊ/",
      "Hoá đơn phòng đang mở của khách",
      "📑",
    ]),
    c("Minibar check", "The minibar check is done at the same time every day.", [
      "/ˈmɪnibɑː ˌtʃek/",
      "Lượt kiểm minibar để ghi đồ đã dùng",
      "🧃",
    ]),
    c("Restock list", "Write the time on the restock list for every room.", [
      "/ˈriːstɒk ˌlɪst/",
      "Bảng ghi món cần bù vào minibar",
      "🗒️",
    ]),
  ],
  grammar: [
    g(
      "I cannot touch the bill. Not my job at all.",
      "The Duty Manager decides on that charge, madam, and I will come back to you before six.",
      "Nói đúng CHỦ của quyết định, rồi bạn thành người đưa tin có thời hạn. Chủ ngữ số ít 'the Duty Manager' cần 'decides'.",
      "The Duty Manager decide on that charge, madam, and I will come back to you before six.",
    ),
    g(
      "The minibar was empty. Somebody in your room drank it.",
      "I record what I find at the minibar check, madam, and the front desk looks at the bill.",
      "Buồng phòng GHI NHẬN, lễ tân TÍNH TIỀN. Chủ ngữ 'I' không thêm -s: I record.",
      "I records what I find at the minibar check, madam, and the front desk looks at the bill.",
    ),
  ],
  speaking: [
    risk({
      ...sp(
        "There is a cleaning charge on my bill. Take it off. I am not paying that.",
        t4a,
        "Miễn một khoản phí ĐÚNG là việc của Duty Manager. Không bênh khách sạn, không đồng tình với khách: nói ai quyết, đi hỏi NGAY, và hẹn một mốc thật.",
      ),
      alsoAccept: [
        "I am not able to waive that charge, madam. I will ask the Duty Manager now and come back to you before six.",
        "I cannot waive that charge, madam, but I will ask the Duty Manager now and come back to you before six.",
        "I cannot waive that charge, madam. I will ask the manager on duty now and come back to you before six.",
      ],
    }),
    sp(
      "Can't you just do it? Nobody downstairs will check.",
      t4b,
      "Không nhận, cũng không giảng đạo đức: nói ai được sửa hoá đơn ('folio'), rồi một việc của bạn — tự mang câu trả lời lên.",
      undefined,
      undefined,
      t4a,
    ),
    sp(
      "Fine. But I want an answer today.",
      t4c,
      "Hứa quay lại kể cả khi chưa có câu trả lời — mốc giờ bị lỡ im lặng biến một khiếu nại thành hai.",
      undefined,
      undefined,
      t4b,
    ),
    risk({
      ...sp(
        "Look, here is something for you. Just make the charge disappear.",
        "I cannot take that, sir, and I cannot change the charge. I am calling the Duty Manager now.",
        "Hai lời từ chối trong một hơi: không nhận tiền, không đụng vào hoá đơn. Rồi gọi người có quyền NGAY. Hết lượt thì báo giám sát — lời mời gian lận hoá đơn phải được ghi nhận.",
      ),
      alsoAccept: [
        "I am sorry, sir, I cannot take that, and I cannot change the charge. I am calling the Duty Manager now.",
        "I am not able to take that, sir, and I cannot change the charge. I am calling the Duty Manager now.",
        "I cannot take that, sir, and I cannot change the charge. I am calling the manager on duty now.",
      ],
    }),
    {
      ...sp(
        "Two beers on my bill. We never touched the minibar, not once.",
        "I record what I find at the minibar check, sir, with the time. Shall I ask the front desk to call you?",
        "Không nói khách sai, không nói khách sạn sai — bạn không biết bên nào. Nói việc của mình (ghi nhận, có giờ), rồi chuyển cho quầy.",
      ),
      alsoAccept: [
        "I record what I find at the minibar check, sir, with the time. May I ask the front desk to call you?",
      ],
    },
    sp(
      "1105 says they never opened the minibar. What did you write?",
      "Two beers at twenty past ten, on the restock list, and nothing else. The desk decides the rest.",
      "Đồng nghiệp hỏi: đọc đúng dòng đã ghi, không kính ngữ, không bình luận về khách.",
      "colleague",
    ),
    {
      ...sp(
        "Do you think that charge is fair? Honestly, between us.",
        "The Duty Manager decides that, madam, and I will bring you the answer before six.",
        "Không bao giờ nói khoản phí công bằng hay không công bằng — cả hai câu đều sẽ bị trích lại. Nói ai quyết và một mốc giờ.",
      ),
      alsoAccept: [
        "The Duty Manager decides that, madam, and I will bring you the answer myself before six.",
      ],
    },
  ],
  reading: read(
    `WHEN A GUEST ASKS FOR A CHARGE TO GO AWAY
Housekeeping does not waive a charge, does not change the folio, and does not argue. It carries the request quickly and honestly.
Two different things look alike. A charge recorded in error is the front desk's to correct. A correct charge that a guest wants removed is the Duty Manager's to waive.
Say the process and the time, never a number: "The Duty Manager decides that, and I will come back to you before six." A guest who hears a name and an hour stops pushing.
Never say a charge is fair, and never say it is unfair. You do not know, and both sentences will be quoted back to you.
A good record settles more disputes than any conversation. Do the minibar check at the same time every day, and write the hour on the restock list: "two waters, one beer, 10:20".
If a guest offers you money to make a charge disappear, refuse once, plainly, and call the Duty Manager. It is not a tip to declare; it is an offer to report, so tell your supervisor before the end of your shift.
One number you may read aloud is a price printed on a list the guest can also see.`,
    [
      {
        q: "Khoản phí bị ghi nhầm thì ai sửa?",
        options: [
          "Quầy lễ tân",
          "Nhân viên buồng phòng đã ghi khoản đó",
          "Giám sát tầng, theo bảng bồi thường",
        ],
        correct: 0,
        explanation:
          "'A charge recorded in error is the front desk's to correct' — còn khoản phí đúng mà khách muốn bỏ thì là việc của Duty Manager.",
      },
      {
        q: "Khách đưa tiền để 'xoá' khoản phí thì làm gì?",
        options: [
          "Nhận tạm rồi mang xuống đưa cho Duty Manager xử lý sau",
          "Từ chối một lần, gọi Duty Manager, báo giám sát",
          "Cười cho qua chuyện, vì có thể khách chỉ đang nói đùa",
        ],
        correct: 1,
        explanation:
          "'refuse once, plainly, and call the Duty Manager. Tell your supervisor before the end of your shift' — một lời mời gian lận hoá đơn phải được ghi nhận, không phải một câu đùa.",
      },
    ],
  ),
  game: [
    round(
      0,
      "Just take the charge off yourself. Nobody downstairs is going to check.",
      "Nothing on your folio is changed on the floor, madam. I will take it to the Duty Manager and come back within the hour.",
      "Nothing on your folio is change on the floor, madam. I will take it to the Duty Manager and come back within the hour.",
      "You are right that nobody downstairs would check, madam, but I would still rather not risk that myself.",
      "Phương án 'nobody would check… rather not risk' ngầm nói rằng không ai kiểm thì sẽ làm — đúng điều khách vừa gợi ý. Phương án 'is change' thiếu đuôi bị động: is changed. Câu đúng nói luật và đưa lên đúng người, có mốc giờ.",
    ),
    round(
      2,
      "Your colleague charged us for a towel we never took. Fix it, or I will speak to the manager.",
      "The front desk can take it off if it was our error, madam. Shall I ask them to call you?",
      "The front desk can takes it off if it was our error, madam. Shall I ask them to call you?",
      "I will take it off the bill for you myself, madam, as I can see it was a mistake on our side.",
      "Phương án 'take it off the bill… myself' vừa tự sửa hoá đơn vừa kết luận lỗi khi chưa ai kiểm. Phương án 'can takes' sai: sau 'can' là động từ nguyên mẫu. Câu đúng nói ai sửa được và giữ việc trong tay mình.",
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: thương lượng nhẹ — đổi giờ chứ không đổi tiêu chuẩn ('However… what if I came…?'), trao đổi việc với đồng nghiệp và giám sát ('in exchange for…'), trình lên điều vượt định mức kèm một mốc giờ; bước ra ngoài khi khách vượt ranh giới; không cho mượn chìa tổng; và từ chối tiền, chuyển yêu cầu miễn phí cho Duty Manager.",
};
