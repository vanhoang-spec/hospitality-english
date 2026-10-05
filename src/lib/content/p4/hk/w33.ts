// HK week 33 — Disputes & Compensation, in the four LAST steps (see ../kit.ts).
//
// Rewritten whole. The old week promised a guest "I'll personally make sure
// this is resolved" and "I'd like to make it right", read an internal
// compensation table aloud, and sold a regular wash as back "well before
// tomorrow morning" — lines the later weeks then had to take back. One rule
// now, every lesson:
//
//  · LISTEN — the laundry is counted and inspected WITH the guest before it
//    leaves the room, and every stain goes on the laundry list they sign.
//  · APOLOGISE — for what the guest met, never for a cause nobody has looked
//    at yet ("I cannot say why yet"). The item is photographed and kept.
//  · SOLVE — what the floor owns is the photograph, the report and a time it
//    keeps. The amount is the supervisor's; above her limit, the Duty
//    Manager's. The only figure the floor may point to is the one printed on
//    the laundry list the guest signed ("Our policy allows up to…").
//  · THANK — the guest is thanked for telling us, told what happens next and
//    when, and never offered a goodwill gesture the floor does not own.
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

// ── Lesson 1 — listen first: taking the laundry in ────────────────────────
const t1a = "Of course, sir. May I inspect each garment with you first? It only takes a moment.";
const t1b = "Any stain or damage, sir, so we both know the condition before it is laundered.";
const t1c =
  "Thank you, sir. I will note the stain on your laundry list, and you can sign next to it.";

// ── Lesson 2 — apologise for what the guest met ───────────────────────────
const t2a = "I am so sorry, madam. That is not how it should come back to you.";
const t2b =
  "I cannot say why yet, madam. I will photograph it now and take it to my supervisor today.";
const t2c =
  "I will take it to my supervisor now, madam, and come back to you before six with her answer.";

const lesson1 = L(33, 1, "Listen First: Taking the Laundry In", "Lắng nghe trước: nhận đồ giặt", {
  vocabulary: [
    c("Inspect", "I inspect each item with the guest before it leaves the room.", [
      "/ɪnˈspekt/",
      "Kiểm tra kỹ từng món, cùng với khách",
      "🔍",
    ]),
    c("Garment", "Every garment is counted, and its condition goes on the list.", [
      "/ˈɡɑːmənt/",
      "Món quần áo — từ dùng trên phiếu giặt",
      "👔",
    ]),
    c("Stain", "A stain that was already there is noted before the laundry takes it.", [
      "/steɪn/",
      "Vết bẩn, vết ố",
      "🟤",
    ]),
    c("Express service", "Express service brings a garment back the same day.", [
      "/ɪkˈspres ˌsɜːvɪs/",
      "Dịch vụ giặt nhanh, trả trong ngày",
      "⚡",
    ]),
    c("Surcharge", "The express surcharge is printed on the laundry list the guest signs.", [
      "/ˈsɜːtʃɑːdʒ/",
      "Phụ phí — khoản cộng thêm vào giá thường",
      "➕",
    ]),
  ],
  grammar: [
    g(
      "Count your clothes.",
      "Shall we count the items together, sir, before I take them?",
      "'Shall we + động từ nguyên mẫu' mời khách CÙNG làm — đếm chung là bước lắng nghe đầu tiên, và nó chặn trước một nửa số tranh chấp. Không thêm -ing sau 'shall we'.",
      "Shall we counting the items together, sir, before I take them?",
    ),
    g(
      "You have a stain here. Not our problem.",
      "There is a small stain on this collar, madam, so I will note it on your laundry list.",
      "'There is' + danh từ số ít (a small stain); 'there are' + số nhiều. Nêu điều nhìn thấy, rồi 'so' + việc bạn làm — không đổ lỗi.",
      "There are a small stain on this collar, madam, so I will note it on your laundry list.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "Here is my laundry. I am in a hurry, so just take it.",
        t1a,
        "Không bỏ bước kiểm cùng khách, kể cả khi khách vội: xin phép bằng câu hỏi 'May I inspect', rồi một câu cho thấy chỉ mất một chút. 'Garment' /ˈɡɑːmənt/.",
      ),
      alsoAccept: [
        "Of course, sir. Could I inspect each garment with you first? It only takes a moment.",
      ],
    },
    sp(
      "Fine. What are you looking for?",
      t1b,
      "Nói đúng hai thứ bạn tìm, rồi 'so' + lý do có lợi cho CẢ HAI bên. 'Stain' /steɪn/ — một âm tiết.",
      undefined,
      undefined,
      t1a,
    ),
    sp(
      "There is a small stain on that collar. It was there already.",
      t1c,
      "Cảm ơn khách đã nói trước, ghi vết ố vào phiếu và mời khách ký bên cạnh — phiếu có chữ ký là bằng chứng của cả hai.",
      undefined,
      undefined,
      t1b,
    ),
    sp(
      "I need this suit back by tonight. What are my options?",
      "Our express service brings it back the same day, sir, and the surcharge is printed on your laundry list.",
      "Con số duy nhất được nói là con số in trên phiếu khách cầm — ở đây bạn chỉ vào phiếu, không đọc thuộc lòng. 'Surcharge' /ˈsɜːtʃɑːdʒ/.",
    ),
    {
      ...sp(
        "Can I have my dress back by tomorrow morning without paying for express?",
        "Yes, madam. If it goes with this morning's collection, it comes back this evening at the regular price.",
        "Câu điều kiện với 'if' — hứa có điều kiện, theo đúng giờ in trên phiếu. Không hứa vô điều kiện.",
      ),
      alsoAccept: [
        "Yes, madam. If it goes with this morning's collection, it will come back this evening at the regular price.",
      ],
    },
    sp(
      "1508 wants his shirts by six, but the express list is closed. What do I tell him?",
      "Tell him the honest time from the list, and ask the laundry team before you promise anything else.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Không hứa giờ thay bộ phận giặt là — hỏi họ trước.",
      "colleague",
    ),
  ],
  reading: read(
    `THE LAUNDRY LIST — WHERE MOST DISPUTES ARE STOPPED
Most laundry complaints are decided at the door, before anything is washed. So the first step of handling a dispute is to listen, and you start listening at collection.
Count every garment with the guest, and inspect each one in the light. Look for stains, loose buttons, small holes and colours that are already fading.
Write what you see on the laundry list, and ask the guest to sign next to it. A stain that is on the list before washing is never a dispute afterwards.
If the guest is in a hurry, say that it only takes a moment, and do it anyway. A count you skip is a count nobody can prove later.
The times are printed on the list. In this hotel, a regular pick-up by ten in the morning comes back the same evening. Express service comes back within four hours, with a surcharge. Pressing alone, without washing, is on the laundry price list too.
Read the printed time to the guest; never invent a faster one. If a guest needs something the list cannot do, ask the laundry team before you promise anything.
The details above are one hotel's. Ask your Executive Housekeeper for your own laundry list.`,
    [
      {
        q: "Vì sao phải đếm và kiểm đồ cùng khách ngay khi nhận?",
        options: [
          "Vì đội giặt là không bao giờ nhận một túi đồ chưa có danh sách đi kèm",
          "Vì vết ố đã ghi trên phiếu thì sau này không thành tranh chấp",
          "Vì khách thường quên mình đã gửi bao nhiêu món đồ",
        ],
        correct: 1,
        explanation:
          "'A stain that is on the list before washing is never a dispute afterwards' — lắng nghe bắt đầu từ lúc nhận đồ, không phải lúc khách phàn nàn.",
      },
      {
        q: "Khách vội và bảo cứ lấy đồ đi, không cần kiểm thì sao?",
        options: [
          "Vẫn kiểm cùng khách, vì lượt đếm bỏ qua thì sau này không ai chứng minh được",
          "Lấy đồ đi rồi kiểm sau ở phòng giặt cho nhanh",
          "Nhờ khách tự viết danh sách để mình mang đồ đi trước",
        ],
        correct: 0,
        explanation:
          "'say that it only takes a moment, and do it anyway. A count you skip is a count nobody can prove later' — bước kiểm bảo vệ cả khách lẫn bạn.",
      },
      {
        q: "Khách cần đồ sớm hơn giờ in trên phiếu thì làm gì?",
        options: [
          "Hứa một giờ sớm hơn để khách vui lòng, rồi tự đem đồ xuống phòng giặt",
          "Hỏi đội giặt là trước khi hứa bất cứ điều gì",
          "Nói với khách rằng việc đó là không thể",
        ],
        correct: 1,
        explanation:
          "'never invent a faster one… ask the laundry team before you promise anything' — không hứa giờ thay bộ phận khác.",
      },
    ],
  ),
  game: [
    round(
      2,
      "I am late for a meeting. Can you just take the bag without checking?",
      "I understand, sir. A quick check together protects you as well as us.",
      "I understand, sir. A quick check together protect you as well as us.",
      "Of course, sir — I will take your word for it and count the items later in the laundry room.",
      "Phương án 'count the items later' bỏ đúng bước bảo vệ cả hai bên — đếm một mình thì không ai chứng minh được gì. Phương án 'A quick check… protect' sai chia động từ: chủ ngữ số ít cần 'protects'. Câu đúng giữ bước kiểm và nói vì sao nó có lợi cho khách.",
    ),
    round(
      0,
      "What does express actually cost? I do not want a surprise on my bill.",
      "The surcharge is printed on the laundry list, madam, so you can see it before you sign.",
      "It is only small amount, madam, so please do not worry about it at all.",
      "It is only a small amount, madam, so please do not worry about it at all.",
      "Phương án 'only a small amount' đoán giá và gạt câu hỏi của khách — đúng cách tạo ra một bất ngờ trên hoá đơn. Phương án 'only small amount' gạt câu hỏi y như vậy, lại thiếu mạo từ: danh từ số ít đếm được cần 'a' (a small amount). Câu đúng chỉ vào con số in sẵn trên phiếu khách sẽ ký.",
    ),
  ],
});

const lesson2 = L(33, 2, "Apologise for What the Guest Met", "Xin lỗi về điều khách gặp phải", {
  vocabulary: [
    c("Shrunk", "The sweater has shrunk, and it no longer fits the guest.", [
      "/ʃrʌŋk/",
      "Bị co rút sau khi giặt",
      "📉",
    ]),
    c("Faded", "The colour has faded, so the scarf looks older than it is.", [
      "/ˈfeɪdɪd/",
      "Bị phai màu",
      "🎨",
    ]),
    c("Missing button", "A missing button goes on the report before the shirt goes anywhere.", [
      "/ˌmɪsɪŋ ˈbʌtn/",
      "Cúc áo bị mất",
      "🔘",
    ]),
    c("Photograph", "I photograph the damage on the department device before I take the item.", [
      "/ˈfəʊtəɡrɑːf/",
      "Chụp ảnh làm bằng chứng",
      "📷",
    ]),
  ],
  grammar: [
    g(
      "It's not our fault.",
      "I am so sorry this has happened, madam, and I will find out what went wrong.",
      "Xin lỗi về điều khách GẶP PHẢI, không kết luận lỗi của ai. Hiện tại hoàn thành: has + phân từ hai — has happened, không phải has happen.",
      "I am so sorry this has happen, madam, and I will find out what went wrong.",
    ),
    g(
      "This always happens with wool.",
      "I am sorry it came back like this, sir. May I photograph it before I take it?",
      "Việc đã xảy ra thì dùng quá khứ đơn: came back. Sau lời xin lỗi là một việc cụ thể bạn làm ngay — chụp ảnh trước khi mang đi.",
      "I am sorry it come back like this, sir. May I photograph it before I take it?",
    ),
  ],
  speaking: [
    sp(
      "Look at this sweater. It has shrunk to half its size!",
      t2a,
      "Bước xin lỗi: xin lỗi về TRẢI NGHIỆM của khách — 'That is not how it should come back' — mà không nói nguyên nhân. Để khách nói hết, không ngắt lời.",
    ),
    risk({
      ...sp(
        "Did your laundry do this? Just admit it.",
        t2b,
        "Không nhận lỗi, không chối lỗi: chưa ai xem thì chưa ai biết. Nói điều chắc chắn — chưa thể nói vì sao — rồi hai việc của bạn: chụp ảnh và mang lên giám sát.",
        undefined,
        undefined,
        t2a,
      ),
      alsoAccept: [
        "I am not able to say why yet, madam. I will photograph it now and take it to my supervisor today.",
        "I cannot say why yet, madam, but I will photograph it now and take it to my supervisor today.",
      ],
    }),
    sp(
      "And then what? I want this sorted out today.",
      t2c,
      "Hứa điều bạn tự giữ được: mang lên ngay và quay lại trước một mốc giờ. Không hứa thay giám sát.",
      undefined,
      undefined,
      t2b,
    ),
    sp(
      "My white shirt came back with a button missing.",
      "I am sorry, sir. I will note the missing button on my room report and photograph the shirt before it goes anywhere.",
      "Xin lỗi một câu, rồi hai việc: ghi lại ('missing button') và chụp ảnh. 'Photograph' /ˈfəʊtəɡrɑːf/ — nhấn âm tiết đầu.",
    ),
    sp(
      "The colour of my silk scarf has faded. It was a gift from my mother.",
      "I am so sorry it has faded, madam, especially as it was a gift. I will take it to my supervisor today.",
      "Nhắc lại đúng điều khách vừa nói ('it was a gift') để khách biết mình được lắng nghe. 'Faded' /ˈfeɪdɪd/ — đuôi -ded là một âm tiết.",
    ),
    {
      ...sp(
        "Ms Lan here. What happened with the sweater from 1406?",
        "It has shrunk badly, Ms Lan. I have the photographs, and I promised the guest an answer before six.",
        "Báo cấp trên: gọi tên một lần, không kính ngữ. Ba sự việc: món đồ ra sao, bằng chứng có chưa, và bạn đã hứa khách điều gì.",
        "manager",
      ),
      alsoAccept: [
        "It has shrunk badly, Ms Lan. I took photographs, and I promised the guest an answer before six.",
      ],
    },
  ],
  reading: read(
    `WHEN SOMETHING COMES BACK WRONG — LISTEN, THEN APOLOGISE
A guest holding a shrunken sweater wants to be heard before anything else. Let them finish, and do not explain while they are still talking.
Then apologise for what the guest met: "I am so sorry. That is not how it should come back to you." That sentence is true whatever the cause turns out to be.
Never apologise for a cause nobody has looked at. "Our laundry ruined it" is a verdict, and so is "It was the label." If the guest asks whose fault it is, say you cannot say why yet.
Before the item goes anywhere, photograph it on the department device: the damage, the label and the laundry tag. Then take the item to your supervisor yourself.
A missing button, a faded colour and a garment that has shrunk are all handled the same way. You listen, apologise, photograph and report.
Finally, give the guest one time you will keep, such as "before six". If you have no answer by then, go back anyway and say so.`,
    [
      {
        q: "Khách hỏi 'có phải do bộ phận giặt là không?' thì trả lời thế nào?",
        options: [
          "Nhận lỗi ngay để khách bớt giận",
          "Nói rằng chưa thể biết vì sao, rồi chụp ảnh và báo lên",
          "Giải thích rằng lỗi có thể nằm ở nhãn hướng dẫn giặt của món đồ",
        ],
        correct: 1,
        explanation:
          "'Never apologise for a cause nobody has looked at… say you cannot say why yet' — nhận lỗi hay đổ cho nhãn mác đều là kết luận khi chưa ai kiểm tra.",
      },
      {
        q: "Việc gì phải làm TRƯỚC khi mang món đồ đi?",
        options: [
          "Hỏi khách giá trị của món đồ",
          "Gửi lại đồ cho bộ phận giặt là xử lý",
          "Chụp vết hỏng, nhãn mác và thẻ giặt",
        ],
        correct: 2,
        explanation:
          "'Before the item goes anywhere, photograph it… the damage, the label and the laundry tag' — ảnh là bằng chứng cho mọi quyết định sau đó.",
      },
      {
        q: "Đến mốc giờ đã hứa mà chưa có câu trả lời thì sao?",
        options: [
          "Vẫn quay lại gặp khách đúng mốc giờ và nói thật là chưa có câu trả lời",
          "Chờ đến khi có câu trả lời đầy đủ rồi mới quay lại gặp khách",
          "Nhờ đồng nghiệp ca sau gọi cho khách giúp",
        ],
        correct: 0,
        explanation:
          "'If you have no answer by then, go back anyway and say so' — một mốc giờ bị lỡ im lặng biến một khiếu nại thành hai.",
      },
    ],
  ),
  game: [
    round(
      1,
      "My favourite sweater has shrunk. It does not even fit me now!",
      "I am so sorry, madam. May I photograph it now and take it to my supervisor today?",
      "Wool often do that, madam, especially when the care label inside was not clear enough.",
      "Wool often does that, madam, especially when the care label inside was not clear enough.",
      "Phương án 'Wool often does that' đổ lỗi cho món đồ và cho khách ngay khi khách đang buồn — chưa ai xem xét gì cả. Phương án 'Wool often do that' cũng đổ lỗi như vậy, lại sai chia động từ: 'wool' là danh từ không đếm được, đi với 'does'. Câu đúng xin lỗi về trải nghiệm rồi làm hai việc cụ thể.",
    ),
    round(
      0,
      "Is your laundry going to admit this was their mistake?",
      "I cannot say why it happened yet, sir, but I will report it today and come back to you.",
      "Yes, sir — I am sure it was our mistake, and the hotel will pays for a new one.",
      "Yes, sir — I am sure it was our mistake, and the hotel will pay for a new one.",
      "Phương án 'it was our mistake… will pay' vừa nhận lỗi khi chưa ai kiểm, vừa hứa tiền thay cấp trên. Phương án 'will pays' cũng nhận lỗi và hứa tiền như vậy, lại sai: sau 'will' là động từ nguyên mẫu, không thêm -s (will pay). Câu đúng không kết luận, chỉ hứa việc của mình và một lần quay lại.",
    ),
  ],
});

// ── Lesson 3 — solve what is yours, pass up what is not ──────────────────
const t3a = "I am sorry, sir, I cannot decide the amount. Let me check with my supervisor now.";
const t3b =
  "Our policy allows up to the limit printed on your laundry list, sir. My supervisor will explain the liability to you.";
const t3c =
  "I understand, sir. I will tell my supervisor exactly that, and I will come back to you before six.";

// ── Lesson 4 — thank the guest and close ──────────────────────────────────
const t4a = "Thank you for telling me, madam. I am grateful you gave us the chance to look at it.";
const t4b =
  "Yes, madam. I will ask my supervisor to send you the answer in writing, and I will tell you when to expect it.";
const t4c =
  "Then I will ask the Duty Manager to see you, madam. Thank you again for your patience.";

const lesson3 = L(
  33,
  3,
  "Solve What Is Yours, Pass Up the Rest",
  "Giải quyết phần của mình, chuyển phần còn lại",
  {
    vocabulary: [
      c("Limit", "The limit for a laundry claim is printed on the list the guest signs.", [
        "/ˈlɪmɪt/",
        "Giới hạn, mức tối đa",
        "📏",
      ]),
      c("Liability", "The hotel's liability for laundry is printed on the list the guest signs.", [
        "/ˌlaɪəˈbɪləti/",
        "Trách nhiệm bồi thường của khách sạn",
        "⚖️",
      ]),
      c("Compensation", "Compensation is my supervisor's decision, never mine.", [
        "/ˌkɒmpenˈseɪʃn/",
        "Khoản bồi thường cho khách",
        "💵",
      ]),
      c("Check with", "Let me check with my supervisor before I give you an answer.", [
        "/ˈtʃek wɪð/",
        "Hỏi ý kiến cấp trên trước khi trả lời khách",
        "🙋",
      ]),
      c(
        "Reimburse",
        "We never reimburse anything on the floor; the supervisor decides the compensation.",
        ["/ˌriːɪmˈbɜːs/", "Hoàn trả tiền cho khách", "💳"],
      ),
    ],
    grammar: [
      g(
        "We can only give you this much. Take it or leave it.",
        "Our policy allows up to the amount on your laundry list, madam. Let me check with my supervisor.",
        "'Policy' là chủ ngữ số ít nên 'allows' (thêm -s). Chỉ nói giới hạn IN SẴN trên phiếu khách đã ký, rồi chuyển phần quyết cho người có quyền: 'Let me check with my supervisor'.",
        "Our policy allow up to the amount on your laundry list, madam. Let me check with my supervisor.",
      ),
      g(
        "Fine, fine — I give you the money now.",
        "I am not able to promise any amount, sir, but let me check with my supervisor now.",
        "'be able to + động từ nguyên mẫu': able to promise. Lời hứa vượt quyền mà bị rút lại sẽ sinh ra khiếu nại thứ hai, tệ hơn khiếu nại đầu.",
        "I am not able to promising any amount, sir, but let me check with my supervisor now.",
      ),
    ],
    speaking: [
      risk({
        ...sp(
          "This shirt cost me two million dong. What will you pay me for it?",
          t3a,
          "Số tiền không phải của bạn quyết. Nói thật một câu, rồi 'Let me check with my supervisor' — và đi hỏi NGAY. Không đoán con số, không đọc bảng nội bộ.",
        ),
        alsoAccept: [
          "I am sorry, sir, I am not able to decide the amount. Let me check with my supervisor now.",
          "I cannot decide the amount, sir. Let me check with my supervisor now.",
          "I am sorry, sir, I cannot decide the amount. I am checking with my supervisor now.",
        ],
      }),
      sp(
        "There must be a rule. What does your policy allow?",
        t3b,
        "Mẫu của tuần: 'Our policy allows up to' — nhưng chỉ chỉ vào giới hạn IN SẴN trên phiếu khách đã ký, không tự nói một con số. 'Liability' /ˌlaɪəˈbɪləti/ — nhấn âm tiết thứ ba.",
        undefined,
        undefined,
        t3a,
      ),
      sp(
        "That is not enough for a two-million shirt.",
        t3c,
        "Không cãi, không hứa thêm: chuyển đúng lời khách lên trên ('exactly that') và hẹn một mốc bạn tự giữ.",
        undefined,
        undefined,
        t3b,
      ),
      {
        ...sp(
          "Can you at least wash it again for free?",
          "Let me check with my supervisor, madam. Only she can allow a free rewash, and I will come back within the hour.",
          "Giặt lại miễn phí là quyền của giám sát, không phải của bạn. Nói ai quyết, rồi một mốc bạn tự giữ.",
        ),
        alsoAccept: [
          "Let me check with my supervisor, madam. Only she can allow a free rewash, and I will come back to you within the hour.",
        ],
      },
      {
        ...sp(
          "The lady at the front desk said housekeeping would pay for everything.",
          "I am sorry for the confusion, madam. I cannot confirm that myself, so let me check with my supervisor now.",
          "Không cãi lời đồng nghiệp trước mặt khách, cũng không nhận thay. 'Confirm' /kənˈfɜːm/ — nhấn âm tiết sau.",
        ),
        alsoAccept: [
          "I am sorry for the confusion, madam. I am not able to confirm that myself, so let me check with my supervisor now.",
        ],
      },
      sp(
        "Your guest in 1406 wants cash for her sweater. Can we just reimburse the laundry fee?",
        "No, we never reimburse anything on the floor. My supervisor decides the compensation, and the Duty Manager signs above her limit.",
        "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Hạn mức nội bộ chỉ nói trong tổ, không bao giờ nói với khách.",
        "colleague",
      ),
    ],
    reading: read(
      `WHAT THE FLOOR CAN SOLVE, AND WHAT IT PASSES UP
The floor solves what it owns: the photograph, the report, and a time it keeps. Every charge and every amount belongs to someone else.
Your supervisor decides compensation for laundry, using the hotel's guide. Above her limit, the Duty Manager signs. You have no limit of your own, so you never name one.
There is one figure you may point to. The laundry list the guest signed prints the hotel's liability. You may say, "Our policy allows up to the limit printed on your list."
A figure from an internal guide is never yours to read aloud. A guest who hears "usually four hundred thousand" will ask for exactly that, from everybody, for days.
Never promise to "make it right". You cannot know what "right" will be, and the person who decides may say something different.
The sentence that solves most disputes is short: "Let me check with my supervisor." Then add a time, go, and come back by that time.
If a colleague has already promised something, do not argue in front of the guest. Say you cannot confirm it yourself, and take it upstairs.`,
      [
        {
          q: "Con số nào nhân viên buồng được phép nói với khách?",
          options: [
            "Mức bồi thường thường thấy trong bảng nội bộ",
            "Giới hạn in sẵn trên phiếu giặt khách đã ký",
            "Hạn mức mà giám sát tầng được tự duyệt",
          ],
          correct: 1,
          explanation:
            "'There is one figure you may point to. The laundry list the guest signed prints the hotel's liability' — con số trong bảng nội bộ không bao giờ đọc cho khách.",
        },
        {
          q: "Vì sao không được hứa 'make it right'?",
          options: [
            "Vì mình không biết 'right' sẽ là gì, và người có quyền quyết có thể quyết khác đi",
            "Vì câu đó nghe quá thân mật với khách nước ngoài",
            "Vì khách sạn không bao giờ bồi thường đồ giặt",
          ],
          correct: 0,
          explanation:
            "'You cannot know what right will be, and the person who decides may say something different' — lời hứa bị rút lại sinh ra khiếu nại thứ hai.",
        },
      ],
    ),
    game: [
      round(
        2,
        "Just tell me the number. How much will you give me?",
        "I am sorry, madam, I cannot say an amount. Let me check with my supervisor and come back before six.",
        "I am sorry, madam, I cannot say an amount. Let me checking with my supervisor and come back before six.",
        "Normally it is about four hundred thousand, madam, but I will ask my supervisor to confirm it.",
        "Phương án 'about four hundred thousand' đọc một con số nội bộ — khách sẽ đòi đúng con số đó, và người duyệt có thể không đồng ý. Phương án 'Let me checking' sai: sau 'let me' là động từ nguyên mẫu. Câu đúng nói thật, chuyển lên, và hẹn giờ.",
      ),
      round(
        1,
        "The man at reception said housekeeping would refund the whole cleaning bill.",
        "Let me check with my supervisor, sir. I cannot confirm a refund myself, but I will come back within the hour.",
        "Let me check with my supervisor, sir. I cannot confirms a refund myself, but I will come back within the hour.",
        "If reception said so, sir, then I am sure it is fine — I will take it off the bill for you now.",
        "Phương án 'take it off the bill' tự sửa hoá đơn dựa trên lời kể lại — việc không bao giờ thuộc tầng. Phương án 'cannot confirms' sai: sau 'cannot' là động từ nguyên mẫu. Câu đúng không cãi đồng nghiệp, không nhận thay, và hẹn giờ.",
      ),
    ],
  },
);

const lesson4 = L(33, 4, "Thank the Guest and Close", "Cảm ơn khách và khép lại", {
  vocabulary: [
    c("Grateful", "I am grateful when a guest tells me, because then I can do something.", [
      "/ˈɡreɪtfl/",
      "Biết ơn",
      "🙏",
    ]),
    c("In writing", "The answer goes to the guest in writing, so nothing is lost.", [
      "/ɪn ˈraɪtɪŋ/",
      "Bằng văn bản",
      "🖋️",
    ]),
    c("Goodwill gesture", "A goodwill gesture is the Duty Manager's to offer, never the floor's.", [
      "/ˌɡʊdwɪl ˈdʒestʃə/",
      "Món quà thiện chí — chỉ quản lý được đưa ra",
      "🎀",
    ]),
  ],
  grammar: [
    g(
      "OK. Bye.",
      "Thank you for telling me, madam. It helps us more than you know.",
      "Bước cảm ơn: cảm ơn khách đã NÓI RA — khách im lặng mới là mất khách. Sau giới từ 'for' là động từ đuôi -ing: for telling.",
      "Thank you for tell me, madam. It helps us more than you know.",
    ),
    g(
      "Manager will call you. Maybe tomorrow.",
      "I will ask my supervisor to write to you, madam, and I will tell you when to expect it.",
      "'ask + người + TO + động từ': ask my supervisor to write. Không hứa giờ thay người khác — hứa việc của mình: báo khách khi nào có.",
      "I will ask my supervisor write to you, madam, and I will tell you when to expect it.",
    ),
  ],
  speaking: [
    sp(
      "I am still not happy, but thank you for listening.",
      t4a,
      "Cảm ơn khách đã nói ra, kèm một tính từ cảm xúc thật: 'grateful' /ˈɡreɪtfl/ — hai âm tiết.",
    ),
    {
      ...sp(
        "Will someone write to me about this?",
        t4b,
        "Trả lời 'Yes' rồi nói rõ ai viết ('in writing') và việc của bạn: báo khách khi nào có. Không tự đặt giờ thay giám sát.",
        undefined,
        undefined,
        t4a,
      ),
      alsoAccept: [
        "Yes, madam. I will ask my supervisor to send it in writing, and I will tell you when to expect it.",
      ],
    },
    {
      ...sp(
        "And if I am not happy with her answer?",
        t4c,
        "Mở lối lên tiếp theo: Duty Manager. Khép lại bằng một lời cảm ơn, không phải lời giải thích.",
        undefined,
        undefined,
        t4b,
      ),
      alsoAccept: [
        "Then I will ask the manager on duty to see you, madam. Thank you again for your patience.",
      ],
    },
    risk({
      ...sp(
        "I am going to write about this online unless you give me a free night.",
        "I am sorry, sir, I cannot give a free night. I am calling the Duty Manager for you now.",
        "Đêm miễn phí là quyền của Duty Manager. Không mặc cả, không xin khách đừng viết đánh giá: nói thật một câu và gọi người có quyền NGAY.",
      ),
      alsoAccept: [
        "I am sorry, sir, I am not able to give a free night. I am calling the Duty Manager for you now.",
        "I cannot give a free night, sir, but I am calling the Duty Manager for you now.",
        "I am sorry, sir, I cannot give a free night. I am calling the manager on duty for you now.",
      ],
    }),
    sp(
      "Should I offer her a goodwill gesture? She is very upset.",
      "No, a goodwill gesture is the Duty Manager's to offer. We keep our report factual and pass it up.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Tầng không tự đưa khoản thiện chí — đưa rồi bị cấp trên bác thì khách bị từ chối hai lần.",
      "colleague",
    ),
    sp(
      "Ms Lan here. The guest from 1406 thanked you. How did you close it?",
      "I thanked her for telling me, Ms Lan, and told her the answer would come in writing.",
      "Báo cấp trên: gọi tên một lần, không kính ngữ. Câu tường thuật lùi thì: 'would come', không phải 'will come'.",
      "manager",
    ),
  ],
  reading: read(
    `THANK, CLOSE, AND WRITE IT DOWN
The last step of a dispute is the one most often forgotten: thank the guest. A guest who complains is giving you a chance that a silent guest never does.
Say it simply: "Thank you for telling me." Do not add "but" and an explanation, because it cancels the thanks.
Then say what happens next, and when you will be back. If the answer will come in writing, say who will write, and tell the guest when to expect it once you know.
Some guests ask for more than the floor can give: a free night, a refund, or money in cash. Say plainly that it is not yours to give, and call the Duty Manager now.
Never offer a goodwill gesture yourself, however upset the guest is. If your offer is refused above you, the guest has been told no twice.
A guest may say they will write a review online. That is their right, so never ask them not to.
Before your shift ends, write the dispute on your report in factual words: times, items, photographs and what you promised.`,
    [
      {
        q: "Vì sao không nói 'but…' ngay sau lời cảm ơn?",
        options: [
          "Vì chữ 'but' làm mất đi lời cảm ơn vừa nói",
          "Vì khách không hiểu được câu dài",
          "Vì chỉ quản lý mới được giải thích nguyên nhân sự việc cho khách",
        ],
        correct: 0,
        explanation:
          "'Do not add but and an explanation, because it cancels the thanks' — lời cảm ơn kèm 'nhưng' nghe như đang cãi.",
      },
      {
        q: "Khách dọa viết đánh giá xấu trên mạng thì sao?",
        options: [
          "Xin khách đừng viết, và hứa gửi một món quà nhỏ",
          "Đó là quyền của khách, nên không bao giờ xin khách đừng viết",
          "Báo khách rằng đánh giá đó sẽ bị khách sạn xoá",
        ],
        correct: 1,
        explanation:
          "'That is their right, so never ask them not to' — việc của bạn là xử lý sự việc và gọi đúng người, không phải thương lượng chuyện đánh giá.",
      },
      {
        q: "Cuối ca ghi gì vào báo cáo?",
        options: [
          "Cảm nhận của mình về thái độ của khách",
          "Lời khuyên cho ca sau về cách nói với khách này",
          "Giờ, món đồ, ảnh chụp và điều mình đã hứa",
        ],
        correct: 2,
        explanation:
          "'write the dispute on your report in factual words: times, items, photographs and what you promised' — sự việc, không phải ý kiến.",
      },
    ],
  ),
  game: [
    round(
      0,
      "Thank you for listening. It is still a ruined shirt, though.",
      "I understand, sir, and thank you for telling me. My supervisor will write to you about the next step.",
      "I am sure we can making it right for you, sir, so please do not worry about it any more.",
      "I am sure we can make it right for you, sir, so please do not worry about it any more.",
      "Phương án 'we can make it right' là lời hứa không ai trên tầng giữ được — người quyết có thể quyết khác. Phương án 'we can making it right' hứa y như vậy, lại sai: sau 'can' là động từ nguyên mẫu (can make). Câu đúng cảm ơn và nói bước tiếp theo.",
    ),
    round(
      2,
      "Ms Lan here. The guest in 1406 wants a free night for her sweater. What did you tell her?",
      "That I could not give a free night, Ms Lan, and that I was calling the Duty Manager for her.",
      "That I could not give a free night, Ms Lan, and that I were calling the Duty Manager for her.",
      "I told her you would probably agree, madam, because she is a regular guest here.",
      "Phương án 'you would probably agree, madam' vừa hứa thay cấp trên, vừa gọi cấp trên là 'madam' như gọi khách. Phương án 'I were calling' sai: chủ ngữ 'I' đi với 'was'. Câu đúng tường thuật đúng việc đã làm, lùi thì, gọi tên cấp trên.",
      "manager",
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: xử lý một tranh chấp đồ giặt đủ bốn bước — lắng nghe và kiểm đồ cùng khách, xin lỗi về điều khách gặp mà không kết luận lỗi, chỉ nói giới hạn in trên phiếu giặt ('Our policy allows up to…') rồi 'Let me check with my supervisor', và cảm ơn khách kèm một mốc giờ mình giữ được.",
};
