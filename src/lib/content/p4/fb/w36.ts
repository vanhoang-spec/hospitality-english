// FB week 36 — Handling a Crisis (hand-authored Phase 4, see ../kit.ts).
//
// Four crises on a restaurant floor, each answered in the shape the matrix
// gives the week: ONE thing to do and ONE time ("The first aider is coming
// now — one minute."), never an empty "please calm down", never a promise
// nobody on the floor can keep.
//
//  · A guest who chokes: call the trained first aider by name, clear a space,
//    stay with the companions. A colleague calls 115; the manager is told.
//  · An allergic reaction: stop the service of that dish, call, keep the
//    plate, the docket and the sauce, and say "I hear you" — the week-33 rule
//    for every illness claim holds here too: no admitting, no denying, no
//    money at the table.
//  · The alarm, the storm on the terrace, the lights going out: every alarm
//    is real, the stairs and never the lift, nobody goes back for a bag, the
//    fire panel is Security's, and a guest who cannot use the stairs waits
//    with a colleague while the firefighters are told exactly where.
//  · One too many: water and something to eat, never a promise of the bar
//    afterwards; the next drink is the supervisor's decision.
//
// Kept from the earlier week because the floor managers rated it: call, clear,
// stay; the plate, the docket and the sauce kept together; Security walking
// an in-house guest to the room. Fixed: no "You did, sir" (it confirms the
// guest's account), no "the bar after that", no "the room is closed and
// locked" during an evacuation, and no first aider's name the guest never
// gave.
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

// ── Lesson 1 — the guest who cannot breathe ──────────────────────────────────
const t1a = "The first aider is coming now, madam — one minute. I am clearing a space around him.";
const t1b = "I am not trained for this, madam, but she is. I will stay right here with you.";
const t1c = "My colleague is calling 115 now, madam, and my manager is on the way.";

const lesson1 = L(36, 1, "The Guest Who Cannot Breathe", "Vị khách bị hóc nghẹn", {
  vocabulary: [
    c("Choke", "If a guest starts to choke, call the first aider by name.", [
      "/tʃəʊk/",
      "Bị hóc, nghẹn thức ăn",
      "😮",
    ]),
    c("First aider", "Every shift list shows who the first aider is tonight.", [
      "/ˌfɜːst ˈeɪdə/",
      "Nhân viên đã được huấn luyện sơ cứu trong ca",
      "⛑️",
    ]),
    c("Clear a space", "Clear a space around the guest: chairs back, trolley away.", [
      "/klɪə ə speɪs/",
      "Dọn trống một khoảng quanh khách gặp nạn",
      "↔️",
    ]),
    c("Trained", "Only a trained colleague gives first aid to a guest.", [
      "/treɪnd/",
      "Đã được huấn luyện (làm một việc chuyên môn)",
      "🎓",
    ]),
  ],
  grammar: [
    g(
      "Somebody do something! Quick, quick!",
      "Help is coming now, sir — one minute. Please move your chairs back for us.",
      "Hướng dẫn khẩn = MỘT việc + MỘT mốc giờ: 'is coming now — one minute', rồi một việc khách làm được ngay. Hiện tại tiếp diễn (is + V-ing) cho việc đang diễn ra lúc nói.",
      "Help is come now, sir — one minute. Please move your chairs back for us.",
    ),
    g(
      "I saw this on TV. Let me try pressing his stomach!",
      "I am not trained for that, sir. Our first aider is, and she is two tables away.",
      "Kỹ thuật sơ cứu thuộc về người ĐƯỢC HUẤN LUYỆN. Bị động 'am trained' cần quá khứ phân từ có -ed. Câu sau nói người đó ở đâu — thông tin khách cần nhất lúc này.",
      "I am not train for that, sir. Our first aider is, and she is two tables away.",
    ),
  ],
  speaking: [
    also(
      sp(
        "He is choking — he cannot breathe! Do something!",
        t1a,
        "Một việc + một mốc giờ: 'first aider' đang tới, một phút. Câu sau là việc chính bạn đang làm. Không nói câu trấn an rỗng kiểu bảo khách bình tĩnh.",
      ),
      ["The first aider is coming now, madam — one minute. I am clearing a space for her."],
    ),
    also(
      sp(
        "One minute? Can you not help him yourself?",
        t1b,
        "Nói thật mình KHÔNG được huấn luyện ('not trained'), người kia thì có. Vế sau là việc thứ ba của sảnh: ở lại bên người nhà khách.",
        undefined,
        undefined,
        t1a,
      ),
      ["I am not trained for this, madam, but she is. I will stay here with you."],
    ),
    risk(
      also(
        sp(
          "Should I call an ambulance? I do not know the number here.",
          t1c,
          "Khách không cần tự gọi: đồng nghiệp đang gọi 115, và quản lý đang tới. Đọc rõ từng số: one — one — five.",
          undefined,
          ["colleague", "manager"],
          t1b,
        ),
        [
          "My colleague is calling 115 now, madam, and my manager is coming.",
          "My colleague is calling 115 now, madam, and the manager on duty is on the way.",
        ],
      ),
    ),
    also(
      sp(
        "Is he going to be all right? Should we leave?",
        "Please stay at your table, sir. The first aider is with him, and I will come back to you shortly.",
        "Bàn bên cạnh: một việc khách làm (ngồi yên tại bàn) và một lời hứa của chính bạn. Không đoán tình trạng của người gặp nạn, không hứa 'sẽ ổn thôi'.",
      ),
      [
        "Please stay at your table, sir. The first aider is with him, and I will come back to you soon.",
      ],
    ),
    sp(
      "A man at table eight is choking! What do I do?",
      "Call the first aider by name, then clear a space. Do not try anything you are not trained for.",
      "Nói với đồng nghiệp: không sir/madam. Hai mệnh lệnh ngắn theo thứ tự, rồi một câu cấm — kỹ thuật sơ cứu không dành cho người chưa học.",
      "colleague",
    ),
    sp(
      "What happened at table eight tonight?",
      "A guest started to choke on his steak. The first aider came at once, and I wrote down the times.",
      "Báo cáo lên quản lý: không sir/madam. Quá khứ đơn cho sự việc đã xong (came, wrote). Chỉ ghi sự việc và giờ, không đoán nguyên nhân.",
      "manager",
    ),
  ],
  reading: read(
    `A GUEST WHO CANNOT BREATHE — CALL, CLEAR, STAY
When a guest chokes, the floor has three verbs, in this order.
Call. Send for the trained first aider by name, not "somebody". Every shift list shows who is trained tonight. A colleague calls 115, and the manager on duty is told at once.
Clear. Chairs back, a path from the door, the trolley out of the way. Space is the one treatment an untrained person can give.
Stay. Stay with the guest's companions and give them one thing and one time: "The first aider is coming now — one minute." Never say "Calm down" or "He will be fine". Nobody on the floor can promise that.
What the floor does not do: try a technique it has not been trained in, give water, or move the guest.
Neighbouring tables get one sentence too: please stay at your table, and I will come back to you.
Afterwards, write down what happened, when, and who came, before the end of the shift. Facts only, never a guess about the cause.
Who is trained, where the first-aid kit is, and who calls 115 are your own hotel's answers. Ask your manager this week.`,
    [
      {
        q: "Ba động từ của người phục vụ khi khách bị hóc là gì?",
        options: [
          "Gọi người, dọn chỗ, ở lại",
          "Vỗ lưng khách, cho uống nước ấm, dìu khách ra ngoài",
          "Hỏi chuyện người nhà, ghi chép, chờ quản lý tới quyết",
        ],
        correct: 0,
        explanation:
          "'Call… Clear… Stay' — gọi người sơ cứu bằng tên, dọn khoảng trống, ở lại bên người nhà khách. Cho uống nước và di chuyển khách là những việc bài đọc cấm.",
      },
      {
        q: "Câu trấn an người nhà khách theo bài có hình dạng nào?",
        options: [
          "Một lời khuyên khách hãy cố gắng bình tĩnh lại",
          "Một việc và một mốc giờ",
          "Một lời hứa rằng mọi chuyện rồi sẽ ổn cả thôi",
        ],
        correct: 1,
        explanation:
          "'give them one thing and one time: The first aider is coming now — one minute.' Bài cấm 'Calm down' và 'He will be fine' vì sảnh không hứa được điều đó.",
      },
      {
        q: "Nhân viên chưa được huấn luyện sơ cứu KHÔNG được làm gì?",
        options: [
          "Gọi đúng tên người sơ cứu trong ca tối nay",
          "Dọn ghế và xe đẩy ra khỏi lối đi quanh khách",
          "Thử một kỹ thuật chưa học",
        ],
        correct: 2,
        explanation:
          "'What the floor does not do: try a technique it has not been trained in, give water, or move the guest.' Gọi người và dọn chỗ chính là việc của sảnh.",
      },
    ],
  ),
  game: [
    round(
      "My husband is choking — why are you just standing there?",
      "The first aider is coming now, madam. I am clearing a space for her.",
      "The first aider is come now, madam. I am clear a space for her.",
      "Let me try pressing on his stomach, madam — I once saw how it is done on television.",
      "'is come… I am clear' sai: hiện tại tiếp diễn cần V-ing (coming, clearing). Câu tự làm sơ cứu theo TV đúng tiếng Anh nhưng là kỹ thuật người phục vụ chưa được học — có thể làm khách nguy hơn. Đáp án gọi đúng người và dọn chỗ cho người đó.",
      1,
    ),
    round(
      "The man at table eight is breathing again. Shall I bring him a glass of water?",
      "Not yet — the first aider decides that. Please stay with him and write down when it happened.",
      "Not yet — the first aider decide that. Please write down when it happen.",
      "Yes, and a free dessert as well, so the whole table forgets about it quickly.",
      "'the first aider decide… it happen' sai: chủ ngữ số ít cần 'decides', và chuyện đã xảy ra dùng quá khứ 'happened'. Câu tặng tráng miệng đúng ngữ pháp nhưng cho nước khi người sơ cứu chưa cho phép và hứa quà vượt quyền. Đáp án để người được huấn luyện quyết, ở lại với khách và ghi lại giờ.",
      0,
      "colleague",
    ),
  ],
});

// ── Lesson 2 — the allergy that gets through ────────────────────────────────
const t2a =
  "I hear you, sir. The first aider is coming now — one minute — and the chef is checking the dish.";
const t2b =
  "Does she carry her medication, sir? Please help her take it. My colleague is calling 115 now.";
const t2c =
  "Her health comes first, sir, and we take it seriously. My manager is coming now, and you can tell him everything.";

const lesson2 = L(36, 2, "The Allergy That Gets Through", "Ca dị ứng lọt qua", {
  vocabulary: [
    c("Reaction", "Treat every allergic reaction as an emergency.", [
      "/riˈækʃn/",
      "Phản ứng của cơ thể (khi bị dị ứng)",
      "⚠️",
    ]),
    c("Swelling", "Swelling of the lips or face can grow fast.", [
      "/ˈswelɪŋ/",
      "Chỗ sưng phù (môi, mặt, cổ họng)",
      "🫧",
    ]),
    c("Medication", "Many guests with a serious allergy carry their own medication.", [
      "/ˌmedɪˈkeɪʃn/",
      "Thuốc khách mang theo bên người",
      "💊",
    ]),
    c("Stop the service", "Stop the service of that dish until the chef clears it.", [
      "/stɒp ðə ˈsɜːvɪs/",
      "Ngừng phục vụ một món cho mọi bàn",
      "⛔",
    ]),
    c("Keep the plate", "Keep the plate exactly as it is — the doctor may need it.", [
      "/kiːp ðə pleɪt/",
      "Giữ nguyên đĩa thức ăn, không dọn, không đổ",
      "🍽️",
    ]),
  ],
  grammar: [
    g(
      "Are you sure it is the food? Maybe it is stress.",
      "We treat every reaction as an emergency, madam. The first aider is coming, and the plate stays with us.",
      "Không tranh cãi nguyên nhân: xử lý trước, tìm hiểu sau. 'The plate' số ít nên 'stays' có -s. Giữ đĩa là quy trình, không phải lời nhận lỗi.",
      "We treat every reaction as an emergency, madam. The first aider is coming, and the plate stay with us.",
    ),
    g(
      "The kitchen says there are no peanuts. Impossible.",
      "I hear you, madam. The chef is checking the dish again right now.",
      "'I hear you' ghi nhận lời khách mà không xác nhận cũng không phủ nhận. Việc đang làm ngay lúc nói dùng hiện tại tiếp diễn: is checking.",
      "I hear you, madam. The chef is check the dish again right now.",
    ),
  ],
  speaking: [
    sp(
      "Her lips are swelling — we told you no peanuts, twice!",
      t2a,
      "'I hear you' — ghi nhận khách, không nói khách đúng, không cãi. Rồi một việc + một mốc giờ, và việc của bếp đang diễn ra.",
    ),
    risk(
      also(
        sp(
          "It is getting worse — her whole face is swelling now!",
          t2b,
          "Thuốc của khách thì khách hoặc người nhà dùng; bạn không tự cho thuốc. Hỏi 'medication', rồi nói việc đồng nghiệp đang làm.",
          undefined,
          undefined,
          t2a,
        ),
        [
          "Does she carry her medication, sir? Please help her use it. My colleague is calling 115 now.",
          "Does she have her medication with her, sir? Please help her take it. My colleague is calling 115 now.",
        ],
      ),
    ),
    also(
      sp(
        "Who made this mistake? I want a name, right now!",
        t2c,
        "Không nhận lỗi, không chối, không nêu tên ai: sức khoẻ trước, quản lý tới sau. Vế cuối trao cho khách một việc — kể hết với quản lý.",
        undefined,
        undefined,
        t2b,
      ),
      [
        "Her health comes first, sir, and we take it seriously. The manager on duty is coming now, and you can tell him everything.",
        "Her health comes first, sir, and we take it seriously. The Duty Manager is coming now, and you can tell him everything.",
      ],
    ),
    risk(
      also(
        sp(
          "The lady at table four is reacting to the satay. Shall I clear her plate away?",
          "No — keep the plate, the docket and the sauce. The doctor may need all three.",
          "Nói với đồng nghiệp: không sir/madam. 'keep the plate' cùng docket và chai sốt — bác sĩ quyết điều gì quan trọng, việc của sảnh là không vứt gì đi.",
          "colleague",
          ["docket"],
        ),
        [
          "No — keep the plate, the docket and the sauce together. The doctor may need all three.",
          "Please keep the plate, the docket and the sauce. The doctor may need all three.",
        ],
      ),
    ),
    sp(
      "Table two has just ordered the same satay. Shall I send it out?",
      "Stop the service of the satay until the chef clears it.",
      "Một mệnh lệnh, một điều kiện: 'stop the service' cho tới khi bếp trưởng cho phép. Sau 'until' dùng hiện tại đơn: clears.",
      "colleague",
    ),
    sp(
      "I am the first aider. What did she eat, and when did it start?",
      "It is all on the docket: the satay, the time she ate it, and when the swelling started.",
      "Trả lời người sơ cứu bằng sự thật đã ghi, không đoán. Liệt kê ba ý sau dấu hai chấm; quá khứ đơn cho việc đã xảy ra: ate, started.",
      "colleague",
      ["docket"],
    ),
  ],
  reading: read(
    `A REACTION IN THE DINING ROOM — STOP, CALL, KEEP, SPEAK
An allergic reaction can grow in minutes, so the floor works in four steps.
Stop. Stop the service of that dish at once. No more plates of it leave the pass until the chef clears it.
Call. Call the first aider and the manager on duty, and a colleague calls 115. Treat it as an emergency, even when the guest says it is nothing.
Keep. Keep the plate, the docket and the sauce together, untouched. The doctor decides what matters; your job is that nothing is thrown away.
Speak. If the kitchen may have made a mistake, the chef hears it in seconds and the doctor hears it in full.
Many guests with a serious allergy carry their own medication. Ask "Does she carry her medication?" and let the guest or a companion use it. Never give any medicine yourself.
At the table, say "I hear you". Do not admit a mistake, do not deny one, and do not talk about money. The manager on duty takes it from there.`,
    [
      {
        q: "Khách có phản ứng dị ứng, món ăn đó được xử lý thế nào?",
        options: [
          "Mang cả đĩa vào bếp đổ đi ngay cho an toàn",
          "Ngừng phục vụ món đó tới khi bếp trưởng cho phép",
          "Đổi ngay sang một món khác để khách ăn tiếp",
        ],
        correct: 1,
        explanation:
          "'Stop the service of that dish at once. No more plates of it leave the pass until the chef clears it.' Đĩa của khách thì giữ lại, không đổ đi.",
      },
      {
        q: "Ba thứ phải giữ nguyên, không được vứt là gì?",
        options: [
          "Đĩa, docket và sốt",
          "Hoá đơn, thực đơn và khăn ăn của khách",
          "Ly nước, dao nĩa và ghế khách đã ngồi",
        ],
        correct: 0,
        explanation:
          "'Keep the plate, the docket and the sauce together, untouched. The doctor decides what matters.'",
      },
      {
        q: "Tại bàn, người phục vụ nói thế nào?",
        options: [
          "Xin lỗi vì bếp đã làm sai và hứa sẽ hoàn lại tiền bữa ăn",
          "Khẳng định với khách rằng món này không hề có đậu phộng",
          "Ghi nhận lời khách, không nhận, không chối",
        ],
        correct: 2,
        explanation:
          "'say I hear you. Do not admit a mistake, do not deny one, and do not talk about money.' Chuyện tiền và nguyên nhân là của quản lý trực.",
      },
    ],
  ),
  game: [
    round(
      "She is allergic to shellfish, and she says the soup tastes strange. What is in it?",
      "I will not answer from memory, sir. The chef is checking now — how does she feel?",
      "I will not answering from memory, sir. The chef is check now — how does she feel?",
      "Nothing with shellfish, sir — our soups are all made with vegetables, so please do not worry.",
      "'will not answering… is check' sai dạng động từ: sau 'will not' là nguyên mẫu (answer), hiện tại tiếp diễn cần 'checking'. Câu khẳng định súp không có hải sản đúng tiếng Anh nhưng là lời hứa an toàn từ trí nhớ — đúng điều sảnh không được làm. Đáp án để bếp kiểm tra và hỏi ngay tình trạng khách.",
      2,
    ),
    round(
      "The satay guest is with the first aider now. Shall I throw her plate away?",
      "No — the plate stays exactly as it is, with the docket. The doctor may need it.",
      "No — the plate stay exactly as it is, with the docket.",
      "Yes, quickly, before somebody at the next table takes a photo of it.",
      "'the plate stay' thiếu -s: 'the plate' số ít nên 'stays'. Câu vứt đĩa đúng ngữ pháp nhưng làm mất thứ bác sĩ có thể cần, và nghe như che giấu. Đáp án giữ nguyên đĩa cùng docket cho bác sĩ.",
      0,
      "colleague",
    ),
  ],
});

// ── Lesson 3 — when the whole room must move ─────────────────────────────────
const t3a =
  "We treat every alarm as real, sir. Please leave everything and walk with me to the stairs.";
const t3b = "Please do not go back, sir. Nobody goes back in until the fire team says it is safe.";
const t3c = "Not the lift, sir. We take the stairs, and I will walk with you both.";

const lesson3 = L(36, 3, "When the Whole Room Must Move", "Khi cả phòng ăn phải di chuyển", {
  vocabulary: [
    c("Alarm", "When the alarm sounds, the calmest voice leads the room.", [
      "/əˈlɑːm/",
      "Chuông báo động, báo cháy",
      "🚨",
    ]),
    c("Assembly point", "Learn where the assembly point is before your first shift.", [
      "/əˈsembli pɔɪnt/",
      "Điểm tập kết khi sơ tán",
      "📍",
    ]),
    c("Stairs", "In an evacuation, everyone takes the stairs, never the lift.", [
      "/steəz/",
      "Cầu thang bộ",
      "🪜",
    ]),
    c("Leave everything", "Please leave everything — bags and coats can wait.", [
      "/liːv ˈevriθɪŋ/",
      "Để lại mọi đồ đạc, không mang theo",
      "🎒",
    ]),
  ],
  grammar: [
    g(
      "Fire! Fire! Everybody run!",
      "The alarm is sounding, everyone. Please leave everything and walk with me to the stairs.",
      "Mệnh lệnh ngắn + 'with me': người dẫn đi CÙNG khách, không đứng chỉ tay. Không bao giờ hô chạy — đám đông chạy là đám đông ngã. Hiện tại tiếp diễn: is sounding.",
      "The alarm is sound, everyone. Please leave everything and walk with me to the stairs.",
    ),
    g(
      "You must pay the bill before you leave!",
      "The bills can wait, madam. Please walk to the stairs with me now.",
      "Trong sơ tán không thu tiền: hoá đơn đợi được, con người thì không. Sau 'can' là động từ nguyên mẫu: can wait.",
      "The bills can waits, madam. Please walk to the stairs with me now.",
    ),
  ],
  speaking: [
    also(
      sp(
        "Is this just a drill? Our food has only just arrived.",
        t3a,
        "Không tranh luận diễn tập hay thật: mọi 'alarm' đều là thật. Rồi hai việc, một câu: 'leave everything' và đi cùng bạn tới 'stairs'.",
      ),
      [
        "Every alarm is treated as real, sir. Please leave everything and walk with me to the stairs.",
      ],
    ),
    sp(
      "But my laptop is still at the table! I will run back for it.",
      t3b,
      "Không ai quay lại lấy đồ — kể cả bạn. Không hứa đồ đạc an toàn; chỉ nói khi nào được quay lại: khi đội cứu hoả cho phép.",
      undefined,
      undefined,
      t3a,
    ),
    risk(
      also(
        sp(
          "My father walks very slowly. Can we take the lift instead?",
          t3c,
          "Sơ tán thì đi cầu thang bộ, không đi thang máy — nói ngắn, rồi việc bạn làm: đi cùng hai cha con. Nhấn 'stairs'.",
          undefined,
          ["lift"],
          t3b,
        ),
        [
          "Not the lift, sir. We take the stairs, and I will walk with you.",
          "Not the lift, sir. We use the stairs, and I will walk with you both.",
        ],
      ),
    ),
    risk(
      also(
        sp(
          "I use a wheelchair. How do I get down?",
          "My colleague will wait with you by the door, madam. The firefighters will know where you are.",
          "Khách không đi cầu thang được: một đồng nghiệp ở lại cùng khách, và đội cứu hoả được báo chính xác vị trí. Không tự hứa khách sẽ an toàn.",
          undefined,
          ["colleague"],
        ),
        [
          "My colleague will wait with you by the door, madam, and the firefighters will know where you are.",
          "My colleague will stay with you by the door, madam. The firefighters will know where you are.",
        ],
      ),
    ),
    also(
      sp(
        "This wind is blowing everything off our table!",
        "Please come inside with me now, sir. Your new table will be ready in two minutes.",
        "Bão trên sân hiên cũng theo một khung: một việc (vào trong cùng bạn) + một mốc giờ (bàn mới sẵn sàng). Nói chậm, rõ.",
      ),
      [
        "Please come inside with me now, sir. Your new table will be ready in a minute.",
        "Please come inside with me now, sir. Your new table will be ready in five minutes.",
      ],
    ),
    also(
      sp(
        "The lights have gone out in the dining room. What do I tell my tables?",
        "Tell each table one thing: engineering is on it, and you will be back in five minutes.",
        "Nói với đồng nghiệp: không sir/madam. Mất điện cũng một khung: một việc + một mốc giờ do chính mình giữ được. Không hứa giờ có điện thay bộ phận kỹ thuật.",
        "colleague",
      ),
      [
        "Tell each table one thing: engineering is working on it, and you will be back in five minutes.",
      ],
    ),
    sp(
      "We are all outside now. Are your tables here?",
      "I counted my tables at the assembly point, and every guest is here.",
      "Báo cáo lên quản lý: không sir/madam. Đếm khách của chính khu vực mình ở 'assembly point', rồi báo bằng quá khứ đơn: counted.",
      "manager",
    ),
  ],
  reading: read(
    `WHEN THE WHOLE ROOM MUST MOVE
Some evenings the whole room has to move: a fire alarm, a storm on the terrace, the lights going out. Every instruction has the same shape: one thing to do, and one time.
When the alarm sounds, every alarm is real. Short words, warm voice: "Please leave everything and walk with me." Walk, never run. Take the stairs, never the lift.
No bills are collected and no coats are fetched. Nobody goes back in for a bag or a phone until the fire team says so.
A guest who cannot use the stairs waits by the stair door with a colleague. Tell the firefighters exactly where that guest is. Do not promise that everything will be fine.
Never touch, silence or reset the fire panel. Security deals with it; the floor moves the guests.
At the assembly point, count your own tables and tell your manager who is there.
A storm or a power cut is smaller, but the shape does not change. "Please come inside with me now. Your new table will be ready in two minutes."`,
    [
      {
        q: "Mọi hướng dẫn khẩn trong bài có chung hình dạng nào?",
        options: [
          "Một lời xin lỗi kèm một lời giải thích lý do",
          "Một việc cần làm và một mốc giờ",
          "Một mệnh lệnh nói thật to cho cả phòng nghe",
        ],
        correct: 1,
        explanation:
          "'Every instruction has the same shape: one thing to do, and one time.' Cả chuông báo cháy, bão và mất điện đều theo khung này.",
      },
      {
        q: "Khách không đi cầu thang được thì xử lý thế nào?",
        options: [
          "Chờ ở cửa cầu thang với đồng nghiệp",
          "Đưa khách xuống bằng thang máy cho nhanh hơn",
          "Để khách ngồi lại bàn và hứa sẽ quay lại đón sau",
        ],
        correct: 0,
        explanation:
          "'waits by the stair door with a colleague. Tell the firefighters exactly where that guest is.' Không đi thang máy, và không tự hứa mọi việc sẽ ổn.",
      },
      {
        q: "Ai xử lý tủ báo cháy khi chuông kêu?",
        options: [
          "Người phục vụ đứng gần tủ báo cháy nhất",
          "Bếp trưởng, vì bếp là nơi có nhiều lửa nhất",
          "Bộ phận an ninh",
        ],
        correct: 2,
        explanation:
          "'Never touch, silence or reset the fire panel. Security deals with it; the floor moves the guests.'",
      },
    ],
  ),
  game: [
    round(
      "This is ridiculous — we are in the middle of our anniversary dinner!",
      "I am sorry, sir. Please leave everything and walk with me to the stairs now.",
      "I am sorry, sir. Please leaving everything and walk with me to the stairs now.",
      "You may stay at the table, sir, if you sign a note saying it is your own choice.",
      "'Please leaving' sai: sau 'Please' là động từ nguyên mẫu (leave). Câu cho khách ở lại nếu ký giấy đúng tiếng Anh nhưng không ai được ở lại khi chuông kêu — mọi chuông báo đều là thật. Đáp án xin lỗi một câu rồi dẫn khách đi.",
      0,
    ),
    round(
      "The fire panel keeps beeping, and it is so loud. Shall I just switch it off?",
      "Do not touch it — Security deals with the panel. We move the guests.",
      "Do not touching it — Security deal with the panel. We move the guests.",
      "Yes, switch it off, and then the guests will stop worrying and finish their dinner.",
      "'Do not touching… Security deal' sai: sau 'Do not' là nguyên mẫu, và 'Security' số ít cần 'deals'. Câu tắt tủ báo cháy đúng ngữ pháp nhưng là điều cấm tuyệt đối — tủ báo cháy thuộc về an ninh. Đáp án giao đúng việc cho đúng người.",
      1,
      "colleague",
    ),
  ],
});

// ── Lesson 4 — one too many ──────────────────────────────────────────────────
const t4a = "Water and something to eat first, sir — I will bring them now.";
const t4b = "My supervisor decides that, sir, and she is coming to the table now.";
const t4c = "I am only slowing the pace, sir. The water is here, and the food is on its way.";

const lesson4 = L(36, 4, "One Too Many", "Khi khách đã quá chén", {
  vocabulary: [
    c("One too many", "The gentleman at the bar has had one too many.", [
      "/wʌn tuː ˈmeni/",
      "Uống quá chén, đã ngà ngà say",
      "🥴",
    ]),
    c("Slow the pace", "Slow the pace early: water between drinks, food on the table.", [
      "/sləʊ ðə peɪs/",
      "Giảm nhịp phục vụ đồ uống",
      "🐌",
    ]),
    c("Refuse service", "Only the supervisor can refuse service to a guest.", [
      "/rɪˈfjuːz ˈsɜːvɪs/",
      "Từ chối phục vụ thêm rượu (quyền của giám sát)",
      "🚫",
    ]),
    c("Get home safely", "Our last job tonight is to help every guest get home safely.", [
      "/ɡet həʊm ˈseɪfli/",
      "Về tới nhà an toàn",
      "🏠",
    ]),
  ],
  grammar: [
    g(
      "You are drunk. No more wine. Finished.",
      "Let me bring some water and something to eat first, sir. They are on their way.",
      "Không bao giờ nói chữ say trước bàn khách. Giảm nhịp bằng nước và đồ ăn, và không hứa ly tiếp theo. Sau 'Let me' là động từ nguyên mẫu: bring.",
      "Let me bringing some water and something to eat first, sir. They are on their way.",
    ),
    g(
      "Hotel rule. I cannot serve you. Read the sign.",
      "That decision is my supervisor's, sir, and she is on her way to the table.",
      "Từ chối phục vụ rượu là quyết định của giám sát, không phải của người phục vụ. Sở hữu cách đứng cuối câu: my supervisor's (có 's).",
      "That decision is my supervisor, sir, and she is on her way to the table.",
    ),
  ],
  speaking: [
    also(
      sp(
        "One more bottle! We are celebrating — do not be boring.",
        t4a,
        "Không nói không, không phán xét, không hứa quầy bar sau đó: nước và đồ ăn trước, và bạn mang tới ngay.",
      ),
      ["Water and something to eat first, sir — I will bring them right now."],
    ),
    risk(
      also(
        sp(
          "I do not want water. I want the wine!",
          t4b,
          "Ly tiếp theo là quyết định của giám sát: nói rõ một câu, rồi người có quyền đang tới. Không tự từ chối, không tự rót.",
          undefined,
          ["supervisor"],
          t4a,
        ),
        [
          "That is my supervisor's decision, sir, and she is coming to the table now.",
          "My supervisor decides that, sir, and she is on her way to the table now.",
        ],
      ),
    ),
    also(
      sp(
        "Are you saying I have had too much?",
        t4c,
        "Không gọi tên tình trạng của khách. Nói việc bạn làm ('slowing the pace'), rồi hai thứ khách đang nhận: nước và đồ ăn.",
        undefined,
        undefined,
        t4b,
      ),
      ["I am only slowing the pace, sir. The water is here, and the food is coming."],
    ),
    sp(
      "I am so sorry about him. Could you take us back to our room?",
      "Of course, madam. Security will walk with you both to your room now.",
      "Khách lưu trú quá chén được an ninh đưa về phòng — không bao giờ một nhân viên đi một mình với khách. Không bình luận gì thêm về khách.",
    ),
    risk(
      also(
        sp(
          "I am fine to drive. Where are my car keys?",
          "May I call a taxi for you instead, sir? We want you to get home safely.",
          "Không tranh cãi khách có lái được không: đưa lựa chọn khác bằng câu hỏi lịch sự, rồi lý do. An ninh sẽ đứng cùng bạn nếu khách vẫn đòi chìa khoá.",
        ),
        [
          "May I call you a taxi instead, sir? We want you to get home safely.",
          "May I book a taxi for you instead, sir? We want you to get home safely.",
        ],
      ),
    ),
    sp(
      "Table nine wants another round, and they are getting very loud. Shall I just pour?",
      "Slow the pace: water and food first. If they have had one too many, only the supervisor can refuse service.",
      "Nói với đồng nghiệp: không sir/madam. Người phục vụ giảm nhịp ('slow the pace'); giám sát mới là người 'refuse service'.",
      "colleague",
    ),
  ],
  reading: read(
    `A GUEST PAST THEIR LIMIT — CARE, NOT JUDGEMENT
The signs come before the trouble: the loud order, the third "one more", the glass knocked over. Slow the pace early, with water between drinks and food on the table.
A refusal never names a state. "Water and something to eat first" works better than "You have had enough", and it promises nothing about the bar later.
If the guest insists, the decision moves up. The floor slows the pace; the supervisor decides the next drink and is the one who may refuse service. One voice refusing keeps the rest of the table friendly.
An in-house guest goes to the room with Security, never alone with one member of staff. An outside guest is offered a taxi. A guest reaching for car keys is where Security joins you, because everyone must get home safely.
The next morning, there are no jokes, with colleagues or with the guest. If the guest apologises at breakfast, the answer is: "We were glad to look after you."
Your own hotel's serving rules, such as ages, hours and limits, come from your manager. Ask before your first bar shift.`,
    [
      {
        q: "Lời từ chối thêm rượu đúng chuẩn có đặc điểm gì?",
        options: [
          "Nói thẳng cho khách biết khách đã uống quá nhiều",
          "Hứa với khách sẽ phục vụ tiếp ở quầy bar sau đó",
          "Không gọi tên tình trạng của khách",
        ],
        correct: 2,
        explanation:
          "'A refusal never names a state… and it promises nothing about the bar later.' Nước và đồ ăn trước, không phán xét, không hứa ly sau.",
      },
      {
        q: "Ai quyết định ly tiếp theo khi khách cứ đòi?",
        options: [
          "Giám sát",
          "Người phục vụ đang lo bàn đó tối nay",
          "Người pha chế đứng ở quầy bar gần nhất",
        ],
        correct: 0,
        explanation:
          "'The floor slows the pace; the supervisor decides the next drink and is the one who may refuse service.'",
      },
      {
        q: "Khách lưu trú quá chén được đưa về phòng thế nào?",
        options: [
          "Một nhân viên phục vụ khoẻ mạnh dìu khách lên phòng",
          "Cùng nhân viên an ninh",
          "Gọi taxi đưa khách đi một vòng cho tỉnh rồi quay về",
        ],
        correct: 1,
        explanation:
          "'An in-house guest goes to the room with Security, never alone with one member of staff.' Taxi là cho khách bên ngoài về nhà.",
      },
    ],
  ),
  game: [
    round(
      "Do not tell me what I have had. Bring the whisky, or I will complain to your manager.",
      "Then let me bring my supervisor to you, sir. She decides the next drink.",
      "Then let me brings my supervisor to you, sir. She decide the next drink.",
      "Complain if you like, sir — the rule is the rule, and it protects everybody here.",
      "'let me brings… She decide' sai: sau 'let me' là nguyên mẫu (bring), và 'She' cần 'decides'. Câu 'Complain if you like… the rule is the rule' đúng ngữ pháp nhưng thách thức khách và đẩy căng thẳng lên. Đáp án đưa đúng người có quyền tới.",
      0,
    ),
    round(
      "We are celebrating! One last bottle, and then we will go to the bar.",
      "Water and something to eat first, madam — they are on their way now.",
      "Water and something to eat first, madam — they is on their way now.",
      "Of course, madam — one last bottle here, and the bar will look after you later.",
      "'they is' sai: 'they' đi với 'are'. Câu 'one last bottle… the bar will look after you later' đúng tiếng Anh nhưng rót thêm cho khách đã quá chén và hứa cả quầy bar sau đó. Đáp án giảm nhịp mà không hứa gì về rượu.",
      1,
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: hướng dẫn khẩn theo khung 'một việc + một mốc giờ' khi khách bị hóc (gọi người sơ cứu, dọn chỗ, ở lại), khi khách bị phản ứng dị ứng (dừng món, gọi người, giữ đĩa, docket và sốt), khi chuông báo cháy, bão hay mất điện (đi cầu thang bộ, để lại đồ, báo vị trí khách không đi được), và khi khách quá chén (nước và đồ ăn, giám sát quyết) — không hứa điều không giữ được, không nhận, không chối.",
};
