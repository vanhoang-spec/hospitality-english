// HK week 32 — Personalised Advice (see ../kit.ts).
//
// Advice is built on what the guest SAID ("Since you mentioned…", "Based on
// what you told me…") or on what the ROOM shows — never on a guess about the
// person. Health is never guessed and never promised: a reaction is reported
// the same shift. And discretion has two hard edges the floor must get right
// every time: a guest who says money is missing gets the supervisor at once,
// in the affirmative ("I am calling my supervisor now" — never "May I?"), and
// a valuable is left exactly where it is.
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

// ── Lesson 1 — what the room tells you ────────────────────────────────────
const t1a =
  "Based on that, madam, I will leave it on the bed from tonight, so you do not have to look for it.";
const t1b =
  "Since you mentioned the cold, madam, shall I set the thermostat a little warmer before you come back?";
const t1c =
  "Of course, madam. I will set it only a little warmer, and the thermostat by the door is always yours to change.";

// ── Lesson 2 — asking instead of guessing ─────────────────────────────────
const t2a =
  "Since you mentioned it, madam, I can use only our fragrance-free products in this room. Would that suit you?";
const t2b =
  "Then I will ask the linen store for foam pillows and anti-allergy bedding, madam, and bring them before tonight.";
const t2c =
  "I am sorry, madam, I cannot promise that. If he has any reaction, please call us and we will get help.";

const lesson1 = L(32, 1, "What the Room Tells You", "Căn phòng nói gì với bạn", {
  vocabulary: [
    c("Based on", "Based on what you said about the pillows, I left one firm and one soft.", [
      "/ˈbeɪst ɒn/",
      "Dựa trên điều khách đã nói, hoặc điều căn phòng cho thấy",
      "🧭",
    ]),
    c(
      "Thermostat",
      "I leave the thermostat where the guest set it, unless they ask me to change it.",
      ["/ˈθɜːməstæt/", "Bộ điều chỉnh nhiệt độ phòng", "🌡️"],
    ),
    c("Untouched", "The second pillow is untouched every morning, so the guest only needs one.", [
      "/ʌnˈtʌtʃt/",
      "Còn nguyên, chưa ai dùng đến",
      "📦",
    ]),
    c("Set aside", "I set aside the pillow you did not use, and it is in the wardrobe.", [
      "/ˌset əˈsaɪd/",
      "Để riêng sang một bên, cất gọn",
      "📥",
    ]),
  ],
  grammar: [
    g(
      "You only use one pillow, so I put the other one away.",
      "Based on what you said about the pillows, madam, may I leave one firm and one soft?",
      "'Based on + điều khách đã nói' mở một đề nghị cá nhân hoá. Luôn là 'based' (có -ed): based on. Quan sát biến thành ĐỀ NGHỊ có câu hỏi, không thành nhận xét về con người.",
      "Base on what you said about the pillows, madam, may I leave one firm and one soft?",
    ),
    g(
      "The room is always too cold. Why you set like that?",
      "Since you mentioned the cold, sir, shall I set the thermostat a little warmer each morning?",
      "'Since you mentioned…' = vì khách đã nhắc tới. Động từ ở quá khứ: mentioned — khách đã nói trước đó. Chỉ dùng cho điều khách TỰ nói, không cho điều bạn đoán.",
      "Since you mention the cold, sir, shall I set the thermostat a little warmer each morning?",
    ),
  ],
  speaking: [
    sp(
      "We have been using the extra blanket from the wardrobe every night.",
      t1a,
      "Mở bằng 'Based on that' — dựa đúng vào điều khách vừa nói — rồi nói việc bạn làm và lợi ích cho khách, nối bằng 'so'.",
    ),
    {
      ...sp(
        "Thank you. And it is always freezing when we come back from the beach.",
        t1b,
        "'Since you mentioned' + điều khách nói + câu hỏi đề nghị. 'Thermostat' bắt đầu bằng /θ/: đầu lưỡi chạm răng cửa trên rồi thổi hơi, không đọc thành /t/.",
        undefined,
        undefined,
        t1a,
      ),
      alsoAccept: [
        "Since you mentioned the cold, madam, should I set the thermostat a little warmer before you come back?",
      ],
    },
    sp(
      "Yes, please. But not too warm. My husband hates the heat.",
      t1c,
      "Hai người, hai ý muốn: làm vừa phải, và nhắc rằng khách luôn tự chỉnh được. 'Yours to change' — trả quyền về cho khách.",
      undefined,
      undefined,
      t1b,
    ),
    {
      ...sp(
        "How did you know I wanted the window open? I never told anyone.",
        "The window was open every morning, sir, so I left it that way. Shall I keep it open for you?",
        "Nói điều CĂN PHÒNG cho thấy (cửa sổ mở mỗi sáng), không nói điều bạn suy ra về con người. Kết bằng câu hỏi để khách quyết.",
      ),
      alsoAccept: [
        "The window was open every morning, sir, so I left it that way. Would you like me to keep it open?",
      ],
    },
    {
      ...sp(
        "Where did the second pillow go? It was here yesterday.",
        "It was untouched every morning, madam, so I set aside the pillow in the wardrobe. Shall I bring it back?",
        "Ba bước: điều thấy được ('untouched'), việc đã làm ('set aside'), và một câu hỏi để trả lại quyền chọn.",
      ),
      alsoAccept: [
        "It was untouched every morning, madam, so I set aside the pillow in the wardrobe. Would you like it back?",
      ],
    },
    sp(
      "1407 never uses the second pillow. Shall I take it off the bed?",
      "Yes, set aside the pillow in the wardrobe, but leave the thermostat where the guest set it.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Trả đồ về chỗ thì làm lặng lẽ; còn đổi cách khách đã chỉnh phòng thì phải hỏi khách trước.",
      "colleague",
    ),
  ],
  reading: read(
    `READING A ROOM — THE QUIET HALF OF THE JOB
Every morning a room tells its story. One pillow was slept on, one towel was never opened, and the thermostat was moved at midnight.
Know which half is silent. Putting something back where it belongs is done in silence, so an untouched pillow is set aside in the wardrobe.
Changing how the room is set for the rest of the stay is asked first. The blanket pulled out at midnight stays on the bed, but you ask before you make it a rule.
Never act on anything that is about a person rather than a preference. A guest who sleeps badly or a couple in separate beds is not your business.
A preference is served in silence, but a safety matter is reported. Smoking in a non-smoking room, a candle, cooking, or somebody staying who is not on the booking goes to your supervisor the same hour.
Say what you will DO, never what the room told you about the person. "Shall I keep the window open?" is service; "I saw you slept on one side" is not.
Use "Based on…" or "Since you mentioned…" only for what the guest really said.`,
    [
      {
        q: "Việc nào nhân viên làm lặng lẽ, không cần hỏi?",
        options: [
          "Cất chiếc gối không dùng tới vào tủ quần áo",
          "Để chăn thêm trên giường cho cả kỳ lưu trú",
          "Đổi loại gối để thử xem khách thích loại nào hơn",
        ],
        correct: 0,
        explanation:
          "'Putting something back where it belongs is done in silence' — trả đồ về chỗ thì làm lặng lẽ. Còn đổi cách bày phòng cho những ngày sau thì 'is asked first'.",
      },
      {
        q: "Thấy khách hút thuốc trong phòng không hút thuốc thì sao?",
        options: [
          "Coi là ý thích của khách và mở cửa sổ cho thoáng",
          "Hỏi khách có cần gạt tàn không, rồi ghi vào hồ sơ",
          "Báo giám sát tầng ngay trong giờ đó, vì đây là chuyện an toàn chứ không phải ý thích",
        ],
        correct: 2,
        explanation:
          "'a safety matter is reported… goes to your supervisor the same hour' — im lặng là phục vụ, nhưng không bao giờ là một quyết định an toàn.",
      },
      {
        q: "Câu nào đạt chuẩn khi nói với khách?",
        options: [
          "'Tôi để ý là tối qua anh chị ngủ không ngon'",
          "'Anh chị có muốn tôi để cửa sổ mở không ạ?'",
          "'Hình như anh chị không hợp với điều hoà phòng này'",
        ],
        correct: 1,
        explanation:
          "'Say what you will DO, never what the room told you about the person' — một đề nghị về việc làm, không phải một nhận xét về con người.",
      },
    ],
  ),
  game: [
    round(
      1,
      "How did you know I like the curtains half open? Did someone tell you?",
      "The curtains were half open each morning, sir, so I left them that way. Shall I keep doing that?",
      "The front desk pass us notes on every guest, sir, so we usually know these little things.",
      "The front desk passes us notes on every guest, sir, so we usually know these little things.",
      "Phương án 'The front desk passes us notes' vừa sai sự thật vừa làm khách thấy bị theo dõi. Phương án 'The front desk pass us notes' cũng làm khách thấy bị theo dõi như vậy, lại sai chia động từ: chủ ngữ số ít 'the front desk' cần 'passes'. Câu đúng nói điều căn phòng cho thấy rồi hỏi khách.",
    ),
    round(
      0,
      "I always sleep badly in hotels, to be honest.",
      "Since you mentioned it, madam, may I bring you our pillow menu this afternoon?",
      "Since you mention it, madam, may I bring you our pillow menu this afternoon?",
      "I noticed the bed was very messy every morning, madam, so I thought you were not sleeping well.",
      "Phương án 'the bed was very messy… not sleeping well' nhận xét về con người từ dấu vết trong phòng — điều không bao giờ nói ra. Phương án 'Since you mention it' sai thì: khách đã nói rồi nên dùng quá khứ 'mentioned'. Câu đúng dựa vào lời khách và đưa một đề nghị cụ thể.",
    ),
  ],
});

const lesson2 = L(32, 2, "Asking Instead of Guessing", "Hỏi thay vì đoán", {
  vocabulary: [
    c(
      "Since you mentioned",
      "Since you mentioned your skin, may I use the fragrance-free cleaner in here?",
      ["/ˌsɪns juː ˈmenʃnd/", "Vì khách đã nhắc tới — mở lời tư vấn dựa trên lời khách", "💬"],
    ),
    c("Fragrance-free", "We keep a fragrance-free cleaner for guests with sensitive skin.", [
      "/ˌfreɪɡrəns ˈfriː/",
      "Không chứa hương liệu",
      "🧴",
    ]),
    c("Reaction", "A reaction to something of ours goes to the Duty Manager the same shift.", [
      "/riˈækʃn/",
      "Phản ứng của cơ thể — ngứa, nổi mẩn, khó thở",
      "🤧",
    ]),
    c("Linen store", "The linen store keeps foam pillows, and I can bring one up today.", [
      "/ˈlɪnɪn ˌstɔː/",
      "Kho đồ vải của bộ phận buồng",
      "🗄️",
    ]),
    c("Promise", "We never promise that a room is safe for an allergy.", [
      "/ˈprɒmɪs/",
      "Hứa, cam đoan — chỉ hứa điều nằm trong tay mình",
      "🤞",
    ]),
  ],
  grammar: [
    g(
      "Everybody likes this spray. I use it in all rooms.",
      "Would a fragrance-free clean suit you better, madam, or shall I keep our signature scent?",
      "Câu hỏi lựa chọn với 'or' để khách chọn mà không phải giải thích lý do — quan trọng với da và mùi hương. Sau 'would' là động từ nguyên mẫu: would… suit, không thêm -s.",
      "Would a fragrance-free clean suits you better, madam, or shall I keep our signature scent?",
    ),
    g(
      "I think you have allergy, so I change everything.",
      "Since you mentioned dust, madam, may I ask the linen store for anti-allergy bedding tonight?",
      "Không đoán chuyện sức khoẻ. Dẫn đúng điều khách đã nói ('since you mentioned dust') rồi xin phép. Sau 'may I' là động từ nguyên mẫu: may I ask.",
      "Since you mentioned dust, madam, may I asking the linen store for anti-allergy bedding tonight?",
    ),
  ],
  speaking: [
    sp(
      "My son gets a rash from some hotel soaps. What do you use in here?",
      t2a,
      "Khách đã tự nói về con mình, nên 'Since you mentioned it' là đúng chỗ. Đưa một phương án rồi kết bằng một câu hỏi — khách là người quyết.",
    ),
    {
      ...sp(
        "Yes, please. And the sheets? He reacts to feathers too.",
        t2b,
        "Việc của tầng là lấy đồ từ kho vải và mang lên — nói rõ hai món và một mốc bạn tự giữ được. 'Linen store' — /ˈlɪnɪn/ hai âm tiết ngắn.",
        undefined,
        undefined,
        t2a,
      ),
      alsoAccept: [
        "Then I will ask the linen store for foam pillows and anti-allergy bedding, madam, and bring them up before tonight.",
      ],
    },
    risk({
      ...sp(
        "Thank you. Can you promise he will not react to anything in this room?",
        t2c,
        "Dị ứng: không bao giờ hứa an toàn tuyệt đối. Nói thật là không hứa được, rồi nói khách làm gì nếu có phản ứng — gọi ngay, và khách sạn lo phần trợ giúp.",
        undefined,
        undefined,
        t2b,
      ),
      alsoAccept: [
        "I am sorry, madam, I am not able to promise that. If he has any reaction, please call us and we will get help.",
        "I cannot promise that, madam. If he has any reaction, please call us and we will get help.",
        "I am sorry, madam, I cannot promise that, but if he has any reaction, please call us and we will get help.",
        "I am afraid I cannot promise that, madam. Please call us if he has any reaction, and we will get help.",
      ],
    }),
    {
      ...sp(
        "Is that the same spray you use in every room? It sets my son off.",
        "I am sorry, sir. From today this room will be scent-free, and I will tell my supervisor about his reaction.",
        "Phản ứng với đồ của khách sạn không chỉ là một ý thích: đổi ngay trong ngày VÀ báo giám sát để báo tiếp lên trên. 'Reaction' /riˈækʃn/ — nhấn âm tiết giữa.",
      ),
      alsoAccept: [
        "I am so sorry, sir. This room will be scent-free from today, and I will tell my supervisor about his reaction.",
      ],
    },
    sp(
      "I am a light sleeper, and feather pillows make me sneeze. What would you suggest?",
      "Since you mentioned feathers, sir, I suggest a firm foam pillow. I can bring one from the linen store this afternoon.",
      "Gợi ý gắn với đúng điều khách nói (lông vũ), rồi một mốc bạn tự giữ được. 'Suggest' /səˈdʒest/ — nhấn âm tiết sau.",
    ),
    sp(
      "The guest in 1702 says she is allergic to feathers. Is a note on her room enough?",
      "No, it goes on her guest profile, and we use foam pillows only until she checks out.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Dị ứng đi theo NGƯỜI (hồ sơ khách), không theo số phòng.",
      "colleague",
    ),
  ],
  reading: read(
    `WHEN TO ASK — THREE MOMENTS WORTH ONE QUESTION
Smell and skin: cleaning products, room scent and detergent. Ask once, mark the profile, and use the fragrance-free line and unscented soap for that room until the guest leaves. Anti-allergy bedding is laundered without fragrance too.
Sleep: pillow type, blanket weight and mattress topper. Offer the pillow menu by name, because most houses keep three or four, and they can be changed the same evening.
Timing: when the room should be serviced. Ask on the first morning, not the third, and offer a time window rather than a promise of a minute.
What you never ask about: health, religion, who is staying in the room, or why the guest is upset. Preferences are ours to ask; people are not.
"Since you mentioned…" is the right way in only when the guest has said it first.
One thing you never merely note. A guest who reports a headache, a rash or any reaction to something of ours is a Duty Manager matter the same shift. If a guest is struggling to breathe, call the operator from the room phone at once.
Never promise that a room is safe for an allergy. You can promise what you will use and what you will not use, and nothing more.
Ask your Executive Housekeeper what your hotel keeps: anti-allergy bedding, a fragrance-free cleaning line, or neither.`,
    [
      {
        q: "Khách báo bị nổi mẩn vì đồ dùng của khách sạn thì sao?",
        options: [
          "Ghi vào hồ sơ như một ý thích về mùi hương",
          "Đổi sản phẩm rồi theo dõi thêm vài ngày",
          "Báo lên Duty Manager ngay trong ca đó, vì việc này không bao giờ chỉ ghi lại là xong",
        ],
        correct: 2,
        explanation:
          "'any reaction to something of ours is a Duty Manager matter the same shift' — đó là chuyện sức khoẻ, không phải một ý thích để ghi lại.",
      },
      {
        q: "Nhân viên được hứa điều gì với khách bị dị ứng?",
        options: [
          "Hứa sẽ dùng và không dùng sản phẩm nào",
          "Hứa căn phòng an toàn tuyệt đối cho người dị ứng",
          "Hứa đã kiểm tra từng món đồ trong phòng từ trước",
        ],
        correct: 0,
        explanation:
          "'Never promise that a room is safe for an allergy. You can promise what you will use and what you will not use' — chỉ hứa điều nằm trong tay mình.",
      },
    ],
  ),
  game: [
    round(
      2,
      "My skin reacts to almost everything. I am nervous about hotel sheets, honestly.",
      "Since you mentioned it, madam, I will use only fragrance-free products and ask the linen store for anti-allergy bedding.",
      "Since you mentioned it, madam, I will using only fragrance-free products and ask the linen store for anti-allergy bedding.",
      "Everything here is washed at a very high temperature, madam, so there is really nothing to worry about.",
      "Phương án 'nothing to worry about' hứa an toàn thay cho làn da của khách — điều không ai hứa được. Phương án 'will using' sai: sau 'will' là động từ nguyên mẫu (will use). Câu đúng dựa vào lời khách và nói hai việc cụ thể.",
    ),
    round(
      0,
      "Is the spray you use in here safe for small children?",
      "I cannot promise that for every child, sir, so I will air out the room and keep it scent-free from today.",
      "Of course, sir — it is completely natural, so it perfectly safe for children and babies.",
      "Of course, sir — it is completely natural, so it is perfectly safe for children and babies.",
      "Phương án 'it is perfectly safe for children' là lời hứa an toàn tuyệt đối — đúng điều không được nói. Phương án 'so it perfectly safe' hứa y như vậy, lại thiếu động từ 'is' trước tính từ (it is perfectly safe). Câu đúng nói thật là không hứa được, rồi làm điều chắc chắn.",
    ),
  ],
});

// ── Lesson 3 — what you see and never mention ─────────────────────────────
const t3a = "I understand, madam. I am calling my supervisor to your room now.";
const t3b = "Not at all, madam. I will open the trolley as soon as my supervisor is here.";
const t3c =
  "Of course, madam. My supervisor will write it down and follow up with you, and my room report shows everything I moved.";

// ── Lesson 4 — writing it down for tomorrow ───────────────────────────────
const t4a =
  "I am sorry for the inconvenience, madam. From tomorrow your room will be done after eleven, and I will put it on your guest profile.";
const t4b =
  "No, madam. Your preferences carry over to your next stay, so you will not have to say it again.";
const t4c = "Only what helps us serve you, madam: service times, and what you tell us yourself.";

const lesson3 = L(
  32,
  3,
  "What You See and Never Mention",
  "Điều bạn thấy và không bao giờ nhắc tới",
  {
    vocabulary: [
      c("Discretion", "Discretion is half of this job: what you see in a room stays in the room.", [
        "/dɪˈskreʃn/",
        "Sự kín đáo, ý tứ",
        "🤫",
      ]),
      c(
        "Medication",
        "Medication on the bedside table is never moved, not even to wipe the table.",
        ["/ˌmedɪˈkeɪʃn/", "Thuốc men của khách", "💊"],
      ),
      c("Leave it as found", "When in doubt, leave it as found and write it on your room report.", [
        "/ˌliːv ɪt əz ˈfaʊnd/",
        "Để nguyên như lúc mình thấy — không xê dịch đồ của khách",
        "🖐️",
      ]),
      c(
        "Declare",
        "If the house lets you accept a tip, you declare it to your supervisor the same day.",
        ["/dɪˈkleə/", "Khai báo với cấp trên — một khoản tiền, một món quà", "📝"],
      ),
      c("Room report", "Everything I moved today is on my room report, with the time.", [
        "/ˈruːm rɪˌpɔːt/",
        "Báo cáo phòng — ghi việc đã làm và món đã xê dịch",
        "📋",
      ]),
    ],
    grammar: [
      g(
        "I moved your papers to clean. They are in the drawer now.",
        "I cleaned around your papers, sir, and nothing on the desk has been moved.",
        "Hiện tại hoàn thành bị động: has been + phân từ hai (has been moved). Câu này chỉ bảo vệ bạn khi nó ĐÚNG — có xê dịch món nào thì nói đúng món đó và chỉ vào báo cáo phòng.",
        "I cleaned around your papers, sir, and nothing on the desk has been move.",
      ),
      g(
        "You take many medicines, madam. Are you sick?",
        "Is there anything in the room you would rather I did not touch, madam?",
        "Không bao giờ bình luận về đồ cá nhân. Thay vào đó là MỘT câu hỏi trung tính, hỏi một lần cho cả kỳ lưu trú. Sau 'would rather + chủ ngữ' động từ lùi về quá khứ: I did not touch.",
        "Is there anything in the room you would rather I do not touch, madam?",
      ),
    ],
    speaking: [
      risk({
        ...sp(
          "You were the only person in my room today, and my money is gone.",
          t3a,
          "Khách nói mất tiền thì bạn không đứng một mình trong cuộc nói chuyện đó. Không chối, không xin phép khách để gọi người — nói thẳng việc bạn ĐANG làm: gọi giám sát lên phòng.",
        ),
        alsoAccept: [
          "I understand, madam. I am asking my supervisor to come to your room now.",
          "I am sorry, madam. I am calling my supervisor to your room now.",
          "I understand, madam. I am calling my supervisor now.",
          "I understand, madam. I am calling my supervisor now, and she will come to your room.",
          "I am sorry, madam. My supervisor is coming to your room now.",
          "I am sorry, madam. I am calling my supervisor to your room now, and everything I moved is on my room report.",
        ],
      }),
      sp(
        "Are you saying I am lying? Just open your trolley and show me.",
        t3b,
        "Không tranh luận ai đúng ai sai. Xe đẩy chỉ mở khi có giám sát chứng kiến — để bảo vệ cả khách lẫn bạn.",
        undefined,
        undefined,
        t3a,
      ),
      sp(
        "Fine. But I want all of this written down.",
        t3c,
        "Hai vế: giám sát ghi biên bản cùng khách, và báo cáo phòng của bạn đã ghi sẵn mọi món bạn xê dịch. 'Room report' — nói liền hai từ.",
        undefined,
        undefined,
        t3b,
      ),
      {
        ...sp(
          "Here, take this. You have looked after us beautifully all week.",
          "You are very kind, madam, and I am delighted. I will declare it to my supervisor, as the hotel asks us to.",
          "Nhận lời cảm ơn cho ấm, rồi THÔNG BÁO việc khai báo — không xin phép khách. Đây là mẫu cho nơi cho nhận rồi khai báo; nơi không cho nhận thì từ chối nhẹ nhàng. Phong bì dán kín hay khoản lớn: hỏi giám sát TRƯỚC khi nhận.",
        ),
        alsoAccept: [
          "Thank you, madam, you are very kind. I will declare it to my supervisor, as the hotel asks us to.",
        ],
      },
      risk({
        ...sp(
          "I think I dropped my ring by the bath. Could you pick it up and put it in the safe?",
          "I can see it by the bath, madam, but I cannot take your jewellery. May I show you where it is?",
          "Đồ giá trị: không cầm, không cất hộ, không di chuyển — kể cả khi khách nhờ và khách đang đứng đó. Chỉ chỗ cho khách tự lấy. 'Jewellery' viết kiểu Anh, đọc /ˈdʒuːəlri/.",
        ),
        alsoAccept: [
          "I am sorry, madam, I cannot take your jewellery. I can see it by the bath — may I show you where it is?",
          "I can see it by the bath, madam, but I am not able to take your jewellery. May I show you where it is?",
          "I am sorry, madam, I am not allowed to take your jewellery. May I show you where it is by the bath?",
          "I am sorry, madam, I cannot take your jewellery, but it is by the bath. May I show you where it is?",
          "I am sorry, madam, I cannot take your valuables. I can see it by the bath. May I show you where it is?",
        ],
      }),
      sp(
        "Do you people gossip about what you see in the rooms?",
        "Never, madam. Discretion is part of my job, and I am proud of it: nothing about your belongings leaves this room.",
        "Trả lời ngắn, chắc, có một tính từ cảm xúc ('proud'). 'Discretion' /dɪˈskreʃn/ — nhấn âm tiết giữa. Không kể ví dụ về phòng khác để chứng minh.",
      ),
      sp(
        "There is medication all over the desk in 1208. Can I put it in a drawer?",
        "No, leave it as found. Clean around the medication, and note it on your room report.",
        "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Thuốc của khách không bao giờ bị xê dịch, kể cả để lau bàn.",
        "colleague",
      ),
    ],
    reading: read(
      `PRIVACY IN A ROOM YOU MUST ENTER
You will see everything: medication, documents, money and letters. None of it is conversation, with a guest or with a colleague, because discretion is half of this job.
Clean around a guest's belongings. Never lift a bag to vacuum under it, never gather papers into a pile, and never move medication to wipe a table.
Money and valuables stay exactly where they are, and you never tidy them into a drawer "for safety". On a camera, a helpful hand looks the same as a dishonest one.
A ring on the floor is the same: leave it, and call your supervisor before anyone touches it. If the guest is there, show them where it is.
Tips are where houses differ, so learn yours before your first floor. Some houses ask you to accept a tip and declare it; some ask you to decline politely.
A sealed envelope, or any large sum, goes to your supervisor before you accept it.
The moment a guest makes a complaint that something is missing, you stop being alone in that conversation. Answer honestly, and call your supervisor to the room at once.
Never open your trolley or a bag to prove anything until your supervisor is there. Everything you moved should already be on your room report.`,
      [
        {
          q: "Khách nói bị mất tiền thì phản xạ đầu tiên là gì?",
          options: [
            "Mở xe đẩy cho khách xem ngay để chứng minh mình trong sạch",
            "Gọi giám sát lên phòng, không nói chuyện một mình",
            "Mời khách xuống quầy lễ tân trình báo rồi chờ kết quả",
          ],
          correct: 1,
          explanation:
            "'you stop being alone in that conversation… call your supervisor to the room at once' — và xe đẩy chỉ mở khi giám sát đã có mặt.",
        },
        {
          q: "Thấy tiền mặt trên bàn làm việc của khách thì làm gì?",
          options: [
            "Để nguyên tại chỗ và dọn xung quanh, vì trên camera bàn tay giúp đỡ trông như kẻ gian",
            "Cất vào ngăn kéo cho an toàn rồi báo khách sau",
            "Bỏ vào két sắt trong phòng và ghi lại giờ đã cất",
          ],
          correct: 0,
          explanation:
            "'Money and valuables stay exactly where they are' — trên camera, bàn tay muốn giúp trông y hệt bàn tay gian.",
        },
        {
          q: "Khách đưa một phong bì dán kín làm quà thì sao?",
          options: [
            "Nhận luôn rồi khai báo vào cuối ca",
            "Từ chối thẳng vì phong bì nào cũng là hối lộ",
            "Hỏi giám sát trước khi nhận",
          ],
          correct: 2,
          explanation:
            "'A sealed envelope, or any large sum, goes to your supervisor before you accept it' — không biết bên trong có gì thì không tự quyết.",
        },
      ],
    ),
    game: [
      round(
        2,
        "My wife's ring was on the shelf yesterday, and now it is on the desk. Who moved it?",
        "I did not move it, sir, and valuables are left as found. I am calling my supervisor to check it with you.",
        "It may have been the night cleaner, sir — several of us goes into this room every day, so it is hard to say.",
        "It may have been the night cleaner, sir — several of us go into this room every day, so it is hard to say.",
        "Phương án 'the night cleaner… several of us go' đoán và đổ cho đồng nghiệp — đúng điều làm một vụ khiếu nại thành hai. Phương án 'several of us goes' cũng đổ cho đồng nghiệp như vậy, lại sai chia động từ: 'several of us' là số nhiều, cần 'go'. Câu đúng nói điều mình chắc, nêu luật đồ giá trị, rồi gọi giám sát.",
      ),
      round(
        1,
        "I left some money on the pillow this morning. Did you see it when you cleaned?",
        "I saw it, madam, and left it where it was. The room safe is in the wardrobe if you would rather lock it away.",
        "I saw it, madam, and leave it where it was. The room safe is in the wardrobe if you would rather lock it away.",
        "I put it safely in the drawer for you, madam, so that it could not possibly go missing today.",
        "Phương án 'put it safely in the drawer' tự di chuyển tiền của khách — việc mà trên camera trông giống hệt lấy đồ. Phương án 'and leave it' sai thì: việc đã xảy ra sáng nay nên dùng quá khứ 'left'. Câu đúng để nguyên và chỉ két sắt cho khách tự cất.",
      ),
    ],
  },
);

const lesson4 = L(32, 4, "Writing It Down for Tomorrow", "Ghi lại cho ngày mai", {
  vocabulary: [
    c(
      "Guest profile",
      "A guest profile follows the person to their next stay, so it holds three lines, not three pages.",
      ["/ˈɡest ˌprəʊfaɪl/", "Hồ sơ theo NGƯỜI — đi cùng khách sang lần lưu trú sau", "🗂️"],
    ),
    c("Factual", "Keep every note factual, never personal.", [
      "/ˈfæktʃuəl/",
      "Chỉ nêu sự việc, không nêu ý kiến",
      "📐",
    ]),
    c("Carry over", "Preferences carry over to the guest's next stay.", [
      "/ˌkæri ˈəʊvə/",
      "Chuyển tiếp sang ca hoặc lần lưu trú sau",
      "↪️",
    ]),
    c("Wording", "The wording of a note matters as much as the fact.", [
      "/ˈwɜːdɪŋ/",
      "Cách chọn chữ khi ghi chép",
      "✍️",
    ]),
  ],
  grammar: [
    g(
      "Room 612 never lets us in. Impossible people.",
      "Mr Pham asks for service after eleven, and it is on his guest profile for his next stay.",
      "Ghi SỰ VIỆC, không ghi PHÁN XÉT — và ghi theo NGƯỜI, không theo số phòng, vì tuần sau phòng đó là của khách khác. Chủ ngữ số ít 'Mr Pham' nên động từ thêm -s: asks.",
      "Mr Pham ask for service after eleven, and it is on his guest profile for his next stay.",
    ),
    g(
      "It is written in your file, madam. We have a note about you.",
      "Your cleaning time is set for eleven from tomorrow, madam, so you will not have to say it again.",
      "Nói VIỆC BẠN ĐÃ LÀM, không nói việc bạn đã ghi về khách. Sau 'have to' là động từ nguyên mẫu: have to say.",
      "Your cleaning time is set for eleven from tomorrow, madam, so you will not have to said it again.",
    ),
  ],
  speaking: [
    sp(
      "Last year somebody remembered we like the room done after eleven. Nobody has this year.",
      t4a,
      "Xin lỗi một lần, rồi hai việc: làm đúng giờ khách vừa nói, và ghi vào hồ sơ khách để khách khỏi nhắc lần nữa. 'Guest profile' /ˈprəʊfaɪl/.",
    ),
    {
      ...sp(
        "Will I have to tell you again next time we come?",
        t4b,
        "'Carry over' đọc nối /ˌkæri ˈəʊvə/, nhấn vào 'o'. Câu ghép với 'so': điều hệ thống làm → điều khách khỏi phải làm.",
        undefined,
        undefined,
        t4a,
      ),
      alsoAccept: [
        "No, madam. Your preferences carry over to your next stay, so you will not need to say it again.",
      ],
    },
    {
      ...sp(
        "Good. And what else do you write about us?",
        t4c,
        "Riêng tư: chỉ ghi điều giúp phục vụ và điều khách tự nói. Trả lời ngắn, không vòng vo, không chối là không ghi gì.",
        undefined,
        undefined,
        t4b,
      ),
      alsoAccept: [
        "Only what helps us serve you, madam — service times, and anything you tell us yourself.",
      ],
    },
    sp(
      "What do I write for 1508? The guest is always difficult about cleaning times.",
      "Keep the wording factual: write the service time she asked for, and nothing about her mood.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Ba câu kiểm một dòng ghi: có phải sự việc không, mai còn dùng được không, khách đọc có tổn thương không.",
      "colleague",
    ),
    sp(
      "I told the morning attendant about the carpet spray. Do I have to explain again?",
      "You do not, madam. It is on your guest profile, and no spray goes on your carpet again.",
      "Đây là lúc 'it is on your guest profile' chính là lời trấn an khách cần, vì khách tự hỏi có phải nhắc lại không.",
    ),
    sp(
      "Ms Lan here. Why does 1203 have 'allergic to feathers' on the room profile?",
      "It belongs on the guest profile, Ms Lan. I will move it today, because it travels with the person.",
      "Cấp trên hỏi: gọi tên một lần, không nói 'madam'. Dị ứng đi theo người — để ở hồ sơ phòng thì khách tuần sau thừa hưởng một dòng vô nghĩa.",
      "manager",
    ),
  ],
  reading: read(
    `THE GUEST PROFILE — THREE LINES, WRITTEN WELL
There are two files, not one. The guest profile follows the person between stays: pillow, allergies in the guest's own words, service time, and whether turndown is wanted.
The room profile stays with the room: no carpet spray here, this bathroom holds damp so the dehumidifier runs, this balcony door sticks.
Put a person's preference on a room, and the next guest inherits it. That helps nobody, and with an allergy it is dangerous.
What stays out: opinions about the guest, guesses about health, anything about visitors, and anything you would not read aloud to the guest's face.
Health details go on a profile only with the guest's agreement, so ask first and then write.
Test the wording three ways. Is it factual? Is it useful tomorrow? Could the guest read it without being hurt? If a line fails any of the three, rewrite it.
Good, on the guest profile: "service after 11:00; Do Not Disturb most mornings". Poor, anywhere: "never lets us in".
Preferences carry over between stays. Ask your Executive Housekeeper who types them in, and who may read them.`,
    [
      {
        q: "Dị ứng của khách được ghi vào đâu?",
        options: [
          "Vào hồ sơ phòng, để ai vào phòng đó cũng biết",
          "Vào hồ sơ khách, theo đúng lời khách nói, vì hồ sơ này theo khách sang lần ở sau",
          "Vào sổ giao ca, để ca sau đọc trong ngày",
        ],
        correct: 1,
        explanation:
          "'The guest profile follows the person… allergies in the guest's own words' — ghi vào hồ sơ phòng thì khách tuần sau thừa hưởng một dòng vô nghĩa.",
      },
      {
        q: "Ba câu kiểm một dòng ghi chú là gì?",
        options: [
          "Có đúng sự việc, mai còn dùng được, khách đọc có tổn thương không",
          "Chính tả đã đúng chưa, câu đã đủ ngắn chưa, và ai là người ký vào dòng đó",
          "Ai đã viết dòng này, viết lúc mấy giờ, và ca nào sẽ là ca đọc lại nó",
        ],
        correct: 0,
        explanation:
          "'Is it factual? Is it useful tomorrow? Could the guest read it without being hurt?' — hồ sơ có thể được đọc to trong buổi họp khiếu nại, hoặc đưa cho chính khách xem.",
      },
    ],
  ),
  game: [
    round(
      0,
      "Every attendant this week has sprayed that carpet. I have asked three times.",
      "I am sorry, madam. It goes on your guest profile now, and I will tell my supervisor you had to ask three times.",
      "I am sorry, madam. It go on your guest profile now, and I will tell my supervisor you had to ask three times.",
      "We already have a note about you, madam, so somebody on the floor has simply not read it properly.",
      "Phương án 'a note about you… not read it' vừa nói với khách là có ghi chép về khách, vừa đổ cho đồng nghiệp. Phương án 'It go' sai chia động từ: chủ ngữ 'it' cần 'goes'. Câu đúng xin lỗi, sửa hồ sơ, và báo lên.",
    ),
    round(
      2,
      "Do you keep notes about guests? I would rather not be in a file somewhere.",
      "Only service times and what you tell us yourself, madam. Shall I ask my supervisor to explain it to you?",
      "We writes down whatever we notice in every room, madam, so that the next team always knows what to expect.",
      "We write down whatever we notice in every room, madam, so that the next team always knows what to expect.",
      "Phương án 'We write down whatever we notice' đúng là điều khách đang lo — và sai luật ghi chép. Phương án 'We writes down' cũng nói ghi lại mọi thứ, lại sai chia động từ: chủ ngữ 'we' không thêm -s. Câu đúng nói rõ ghi những gì, rồi đưa người có thẩm quyền giải thích.",
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: tư vấn dựa trên điều khách đã nói ('Since you mentioned…', 'Based on…') hoặc điều căn phòng cho thấy, không đoán về con người hay sức khoẻ; không hứa an toàn cho người dị ứng; gọi giám sát ngay khi khách nói mất đồ; để nguyên đồ giá trị; và ghi hồ sơ khách bằng câu đúng sự việc.",
};
