// GR week 33 — disputes and compensation, the four steps in order.
//
// Rewritten after the first blind round of the reopened Phase 4 (7ed3254).
// The week is now one complaint taken through LAST, a lesson a step:
// Listen (four facts: what was promised, by whom, when, what happened
// instead), Apologise (for the event, never a verdict, never a colleague
// named), Solve (whose decision it is), Thank (and close it in writing).
// What the round kept: restoring what the booking already gave is not
// compensation; a gesture the guest was not owed is the manager's to give,
// proposed and never promised; money is the Duty Manager's; tier and points
// are the loyalty office's; an allegation against a colleague, an injury or
// a journalist is not a complaint at all. What it removed: the reading that
// quoted sentences earlier weeks never taught, and every reference to week
// numbers. The matrix's "Policy allows… up to…" is taught on printed policy
// a guest can read (the laundry list), never on an internal limit — those
// stay with the learner's manager.
import type { GameRound, SpeakingItem } from "../../week-content";
import { g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("GR");
const L = lessonsFor("GR");

/** A turn with the other wordings the course accepts for it. */
const also = (s: SpeakingItem, ...alsoAccept: string[]): SpeakingItem => ({ ...s, alsoAccept });

type Kind = "answer" | "form" | "register";
/** One arcade round, options in the order written: `form` is broken English,
 *  `register` is correct English that is wrong for the job. */
const round = (
  prompt: string,
  options: [string, Kind][],
  explanation: string,
  speakerRole?: GameRound["speakerRole"],
): GameRound => ({
  prompt,
  ...(speakerRole ? { speakerRole } : {}),
  options: options.map(([text, kind]) => ({ text, correct: kind === "answer", kind })),
  explanation,
});

// ── Lesson 1 — listen: four things ─────────────────────────────────────────
const t1a =
  "I am sorry, madam. Please take me through it from the beginning, and I will write it all down.";
const t1b = "Thank you, madam. One question: who promised it, and when?";
const t1c =
  "Thank you, madam. I have all four things in your own words — may I read them back to you?";

// ── Lesson 2 — apologise for what happened ─────────────────────────────────
const t2a = "I am sorry that happened, madam. That must have been very disappointing for you both.";
const t2b = "I only know what I saw, madam, and I would rather not guess about anyone.";
const t2c = "I am asking my manager now, madam, and I will come back to you within the hour.";

// ── Lesson 3 — solve: whose decision it is ─────────────────────────────────
const t3a = "I am very sorry that happened, sir. May I see the shirt and the laundry slip?";
const t3b =
  "Yes, sir, our policy allows up to ten times the cleaning charge. My Duty Manager decides the amount.";
const t3c =
  "I cannot promise a figure, sir. Let me check with my Duty Manager, and I will come back to you this evening.";

// ── Lesson 4 — thank, and close it in writing ──────────────────────────────
const t4a =
  "You will have it in writing before you go up, madam: a copy for you, and one on the file.";
const t4b = "Thank you for telling us, madam. Without you, we would never have known.";
const t4c = "Not until you tell me it is right, madam. I will only close the case when you say so.";

const lessons = [
  L(33, 1, "Listen First: Four Things", "Bước một — lắng nghe đủ bốn dữ kiện", {
    vocabulary: [
      c("Take me through it", "Please take me through it from the beginning, madam.", [
        "/teɪk miː θruː ɪt/",
        "xin kể lại cho tôi nghe từng bước",
        "👂",
      ]),
      c(
        "Four things",
        "Four things, every time: what was promised, by whom, when, and what happened instead.",
        ["/fɔː θɪŋz/", "bốn dữ kiện của một khiếu nại", "4️⃣"],
      ),
      c("What happened instead", "And what happened instead, sir?", [
        "/wɒt ˈhæpənd ɪnˈsted/",
        "thực tế đã xảy ra thế nào",
        "↩️",
      ]),
      c("Write it all down", "I will write it all down while you talk, madam.", [
        "/raɪt ɪt ɔːl daʊn/",
        "ghi lại toàn bộ",
        "🖊️",
      ]),
    ],
    grammar: [
      g(
        "What is the problem?",
        "Please take me through it from the beginning, madam.",
        "'What is the problem?' bắt khách tóm tắt hộ bạn, mà khách đang giận thì tóm tắt bằng cảm xúc. Mời khách kể từ đầu. Cụm cố định: 'take me THROUGH it' — 'through' (xuyên suốt), đừng nhầm với 'though'.",
        "Please take me though it from the beginning, madam.",
      ),
      g(
        "I am sure there was a misunderstanding.",
        "What happened instead, sir? I will write it all down before I say anything.",
        "Đừng gọi tên nguyên nhân khi chưa có dữ kiện. Hỏi vế THỰC TẾ, ghi lại, rồi mới nói. Khi 'what' là chủ ngữ của câu hỏi, động từ chia quá khứ ngay sau nó: 'What happened?'. Tiếng Việt không chia thì nên người Việt hay quên đuôi -ed: 'What happen?' là sai.",
        "What happen instead, sir? I will write it all down before I say anything.",
      ),
    ],
    speaking: [
      also(
        sp(
          "This is the third time. Nobody in this hotel does what they say.",
          t1a,
          "Bước một là LẮNG NGHE. Đừng cãi lại câu khái quát, cũng đừng nhận nó — mời khách kể từ đầu: 'take me through it'. Cây bút là thứ hạ nhiệt nhanh nhất: 'write it all down'.",
        ),
        "I am sorry, madam. Please take me through it from the beginning. I will write it all down.",
      ),
      also(
        sp(
          "I was promised lounge access until ten, and it closed at eight.",
          t1b,
          "Khách vừa cho hai dữ kiện: hứa gì, và thực tế ra sao. Còn thiếu hai: AI hứa, và KHI NÀO. Gói cả hai vào 'one question', không hỏi thêm.",
          undefined,
          ["question"],
          t1a,
        ),
        "Thank you, madam. May I ask who promised it, and when?",
      ),
      sp(
        "The man at reception, on Tuesday when I checked in.",
        t1c,
        "Đủ 'four things' rồi thì đọc lại cho khách nghe — khách thấy mình được nghe, và hai bên có cùng một bộ dữ kiện. Chưa đề nghị gì ở bước này.",
        undefined,
        undefined,
        t1b,
      ),
      sp(
        "Room 1102 is furious about the lounge. Where do I start?",
        "Four things before anything else: what was promised, by whom, when, and what happened instead.",
        "ĐỒNG NGHIỆP hỏi. Đừng bắt đầu bằng việc nghĩ xem cho khách cái gì — bắt đầu bằng 'four things'. Không có chúng thì mọi lời đề nghị đều là đoán.",
        "colleague",
      ),
      also(
        sp(
          "What is the point? You will just say sorry and do nothing.",
          "I understand, sir. I am writing it all down in your own words, and I will come back to you myself.",
          "Khách nói thẳng là không tin lời nói nữa. Đừng hứa thêm — cho khách THẤY bạn đang làm: 'writing it all down', đúng 'in your own words' của khách.",
        ),
        "I understand, sir. I am writing it all down in your own words, and I will come back to you personally.",
      ),
      sp(
        "Your colleague promised me a free dinner yesterday. Did he not tell you?",
        "Thank you for telling me, sir. May I ask his name, and what exactly he said?",
        "Đừng xác nhận và cũng đừng phủ nhận lời hứa bạn chưa thấy. Hỏi tiếp bốn dữ kiện — ai, và chính xác đã nói gì — rồi ghi lại.",
      ),
    ],
    reading: read(
      `LISTEN FIRST: FOUR THINGS
A complaint at this desk has four steps, in this order: listen, apologise, solve, thank. This page is the first step, and it is the one people skip.
Guest Relations hears the complaints that are not about a thing. Housekeeping hears about a stain; you hear about a promise. There is nothing to photograph, only a sentence somebody said.
So collect four things, every time: what was promised, who promised it, when, and what happened instead. Ask in that order, and write while the guest talks. "Please take me through it from the beginning" slows an angry guest down better than any apology.
Do not offer anything before you have the four things. An offer made too early is a guess, and a wrong guess makes the complaint bigger.
Do not name a cause either. "There must have been a misunderstanding" is a verdict, and nobody has checked anything yet.
When you have all four, read them back: "You were promised the lounge until ten, madam, by reception, on Tuesday, and it closed at eight." The guest hears that you listened, and you both have the same facts.`,
      [
        {
          q: "Bốn bước xử lý khiếu nại đi theo thứ tự nào?",
          options: [
            "Xin lỗi, lắng nghe, giải quyết, cảm ơn",
            "Lắng nghe, xin lỗi, giải quyết, cảm ơn",
            "Giải quyết trước, rồi xin lỗi, cảm ơn và lắng nghe",
          ],
          correct: 1,
          explanation: `Bài đọc: "A complaint at this desk has four steps, in this order: listen, apologise, solve, thank."`,
        },
        {
          q: "Bốn dữ kiện cần thu thập là gì?",
          options: [
            "Hứa gì, ai hứa, khi nào, thực tế ra sao",
            "Phòng, giờ, tên khách và số tiền khách đòi",
            "Ai sai, sai ở đâu, thiệt hại bao nhiêu",
          ],
          correct: 0,
          explanation: `Bài đọc: "what was promised, who promised it, when, and what happened instead."`,
        },
        {
          q: "Vì sao không đưa ra đề nghị trước khi có đủ bốn dữ kiện?",
          options: [
            "Vì quản lý phải duyệt trước mọi lời đề nghị",
            "Vì khách sẽ đòi thêm nữa nếu thấy mình đề nghị quá sớm",
            "Vì đề nghị đưa ra quá sớm chỉ là đoán, mà đoán sai thì khiếu nại to thêm",
          ],
          correct: 2,
          explanation: `Bài đọc: "An offer made too early is a guess, and a wrong guess makes the complaint bigger."`,
        },
      ],
    ),
    game: [
      round(
        "Your colleague told me the lounge was open until ten. It closed at eight.",
        [
          [
            "I am very sorry, madam. Let me arrange something to make up for it right away.",
            "register",
          ],
          ["I am sorry, madam. May I ask when you were told, and by whom?", "answer"],
          [
            "I am very sorry, madam. Let me arrange something to makes up for it right away.",
            "form",
          ],
        ],
        "Câu này đề nghị bù đắp trước khi có đủ bốn dữ kiện — một lời đề nghị đoán mò. Câu sai ngữ pháp cũng vội đề nghị bù đắp y như thế, lại dùng 'to makes'; sau 'to' là động từ nguyên mẫu: 'to make up for it'. Đáp án hỏi tiếp hai dữ kiện còn thiếu: khi nào, và ai.",
      ),
      round(
        "Shall I offer 1102 a spa voucher to calm him down first?",
        [
          ["Yes — offer it now, and get the details from him afterwards.", "register"],
          ["Not yet. Get the four things first — an offer before that is a guess.", "answer"],
          ["Yes — offer it now, and gets the details from him afterwards.", "form"],
        ],
        "Câu này đề nghị quà trước khi nghe — mà phiếu spa cũng không phải thứ bạn tự đưa. Câu sai ngữ pháp cũng đưa quà trước y như thế, lại dùng 'and gets'; hai mệnh lệnh song song phải cùng dạng nguyên mẫu: 'offer… and get…'. Đáp án: lắng nghe đủ bốn dữ kiện trước.",
        "colleague",
      ),
    ],
  }),

  L(33, 2, "Sorry for What Happened", "Bước hai — xin lỗi về sự việc", {
    vocabulary: [
      c(
        "I am sorry that happened",
        "I am sorry that happened, sir, and I am looking into it now.",
        ["/aɪ æm ˈsɒri ðæt ˈhæpənd/", "tôi rất tiếc về việc đã xảy ra", "🙏"],
      ),
      c("Disappointing", "That must have been very disappointing, madam.", [
        "/ˌdɪsəˈpɔɪntɪŋ/",
        "đáng thất vọng",
        "😞",
      ]),
      c(
        "I only know what I saw",
        "I only know what I saw, sir, and I will not guess at the rest.",
        ["/aɪ ˈəʊnli nəʊ wɒt aɪ sɔː/", "tôi chỉ biết những gì tôi thấy", "👁️"],
      ),
      c("Not mine to handle", "That is not mine to handle, madam. My Duty Manager is coming.", [
        "/nɒt maɪn tuː ˈhændl/",
        "không thuộc phần tôi được xử lý",
        "🛑",
      ]),
    ],
    grammar: [
      g(
        "Sorry, that was our mistake.",
        "I am sorry that happened, madam, and I am looking into it now.",
        "Xin lỗi về SỰ VIỆC thì luôn đúng; nhận một LỖI khi chưa ai kiểm tra thì không phải việc của bạn. Việc đã xảy ra dùng quá khứ: 'that happened', có -ed.",
        "I am sorry that happen, madam, and I am looking into it now.",
      ),
      g(
        "The reception team must have forgotten to pass it on.",
        "I only know what I saw, sir, and I would rather not guess.",
        "Đừng đổ cho bộ phận khác trước mặt khách — kể cả khi bạn đoán đúng. Nói ranh giới của chính mình. Quá khứ của 'see' là 'saw'; 'seen' chỉ đi sau 'have/has'.",
        "I only know what I seen, sir, and I would rather not guess.",
      ),
    ],
    speaking: [
      also(
        sp(
          "We booked the lounge for our anniversary drinks, and nobody knew anything about it.",
          t2a,
          "Bước hai là XIN LỖI về sự việc: 'I am sorry that happened'. Thêm một vế cảm xúc nếu nó đúng: 'very disappointing'. Đừng nói 'that was our mistake' — đó là một phán quyết.",
        ),
        "I am sorry that happened, madam. That must have been very disappointing for you.",
      ),
      sp(
        "Who was responsible? I want a name.",
        t2b,
        "Khách đòi một CÁI TÊN. Đừng cho, và đừng đổ cho bộ phận nào — nói ranh giới của chính mình: 'I only know what I saw'.",
        undefined,
        undefined,
        t2a,
      ),
      also(
        sp(
          "So what happens now?",
          t2c,
          "Chuyển sang bước ba: nói AI đang được hỏi, và KHI NÀO bạn quay lại. Một mốc giờ là lời hứa khách kiểm được.",
          undefined,
          ["manager", "back", "within", "hour"],
          t2b,
        ),
        "I am taking it to my manager now, madam, and I will come back to you within the hour.",
      ),
      sp(
        "Should I tell him the kitchen never got the slip?",
        "No. Tell him what we are putting right, and keep the kitchen out of it.",
        "ĐỒNG NGHIỆP hỏi. Nguyên nhân bên trong là việc của sổ khiếu nại, không phải việc của khách. Khách cần một lời xin lỗi và một việc đang được sửa — không cần tên bộ phận.",
        "colleague",
      ),
      risk(
        also(
          sp(
            "Your night man went through my bag. I want him out here now.",
            "I am sorry, sir, but that is not mine to handle. I am asking my Duty Manager to come to you now.",
            "Một lời tố cáo nhân viên KHÔNG phải khiếu nại — bốn bước không áp dụng. Mở bằng 'I am sorry' để ghi nhận điều khách vừa nói, nhưng đừng gọi người bị nêu tên ra quầy, đừng cãi, đừng bào chữa. Nói 'not mine to handle', rồi mời Duty Manager tới.",
            undefined,
            ["duty", "manager"],
          ),
          "That is not mine to handle, sir. My Duty Manager is coming to you now.",
          "I am sorry, sir, that is not mine to handle. I am calling my Duty Manager to come to you now.",
          "That is not mine to handle, sir. I am asking my Duty Manager to come to you now.",
          "I am sorry, sir. I am asking my Duty Manager to come to you now.",
          "I am sorry, sir. That is for my Duty Manager, and I am asking her to come to you now.",
        ),
      ),
      risk(
        also(
          sp(
            "I slipped on your wet floor this morning. Who is going to pay for my doctor?",
            "Are you hurt now, madam, and do you need a doctor? I am calling my Duty Manager now.",
            "Sức khoẻ trước tiên: hỏi khách có đau không, có cần bác sĩ không. Đừng bàn ai trả tiền, đừng nhận lỗi, đừng hứa gì — chuyện đó là của Duty Manager.",
            undefined,
            ["duty", "manager"],
          ),
          "Are you hurt, madam? Do you need a doctor? I am calling my Duty Manager now.",
          "Are you hurt now, madam, and do you need a doctor? My Duty Manager is coming to you now.",
          "Let me call the doctor on call first, madam. The bill is my Duty Manager's to decide.",
        ),
      ),
    ],
    reading: read(
      `SORRY FOR WHAT HAPPENED
There are two apologies, and they are not the same sentence.
"I am sorry that happened" is about the event. It is always true, it costs nothing, and you may say it before you know a single fact. Add a feeling if it is true: "That must have been very disappointing."
"That was our mistake" is a verdict. It decides who was wrong before anybody has looked, and it is not yours to decide.
When a guest asks who was to blame, the answer is your own limit: "I only know what I saw." Not a name, not a department, not a guess. Never name another team as the cause in front of a guest. The cause belongs in the complaint log, where a manager can look at it properly.
Some things that arrive at this desk are not complaints at all, and the four steps do not apply. Three examples: a guest who accuses a member of staff, a guest who was hurt, a journalist with a recorder. For each, say "That is not mine to handle, sir," and bring the Duty Manager to the guest. If anybody is hurt, ask about that first.`,
      [
        {
          q: "Vì sao không nói 'that was our mistake' khi khách vừa phàn nàn?",
          options: [
            "Vì đó là một phán quyết, khi chưa ai kiểm tra gì",
            "Vì khách nghe chữ mistake sẽ đòi bồi thường nhiều hơn hẳn",
            "Vì chỉ giám đốc mới được nói câu đó",
          ],
          correct: 0,
          explanation: `Bài đọc: "It decides who was wrong before anybody has looked, and it is not yours to decide."`,
        },
        {
          q: "Khách hỏi ai là người làm sai. Bạn trả lời thế nào?",
          options: [
            "Nói tên bộ phận, vì khách có quyền được biết",
            "Nói đó là lỗi của hệ thống đặt phòng",
            "'I only know what I saw'",
          ],
          correct: 2,
          explanation: `Bài đọc: "When a guest asks who was to blame, the answer is your own limit"`,
        },
        {
          q: "Khách nói một nhân viên đã lục túi của mình. Đây là gì?",
          options: [
            "Một khiếu nại thông thường — làm đủ bốn bước như mọi khi",
            "Không phải khiếu nại, bốn bước không áp dụng — mời Duty Manager tới gặp khách",
            "Chuyện riêng của nhân viên đó, để họ tự giải thích",
          ],
          correct: 1,
          explanation: `Bài đọc: "Some things that arrive at this desk are not complaints at all, and the four steps do not apply."`,
        },
      ],
    ),
    game: [
      round(
        "Just admit the hotel got it wrong. That is all I want to hear.",
        [
          ["You are right, madam, we got it wrong, and I am very sorry for that.", "register"],
          ["I am sorry that happened, madam, and I am putting it right today.", "answer"],
          ["I am sorry that happen, madam, and I am putting it right today.", "form"],
        ],
        "Câu này nhận lỗi thay cả khách sạn khi chưa ai kiểm tra — một phán quyết không phải của bạn. Câu sai ngữ pháp dùng 'that happen'; việc đã xảy ra phải là 'that happened'. Đáp án xin lỗi về sự việc, rồi nói việc đang sửa.",
      ),
      round(
        "He keeps asking which of us took the booking. What do I say?",
        [
          ["Say you only know what you saw, and move on to what is being put right.", "answer"],
          ["Tell him it was the evening shift — it is true, and he will drop it.", "register"],
          ["Say you only know what you seen, and move on to what is being put right.", "form"],
        ],
        "Câu này đổ cho ca tối trước mặt khách — một khiếu nại thành hai, mà không sửa được gì. Câu sai ngữ pháp dùng 'what you seen'; phải là 'what you saw'. Đáp án nói ranh giới của mình rồi chuyển sang việc đang sửa.",
        "colleague",
      ),
    ],
  }),
  L(33, 3, "Solve: Whose Decision Is It?", "Bước ba — giải quyết: quyết định của ai", {
    vocabulary: [
      c("Policy allows", "Our policy allows up to ten times the cleaning charge, sir.", [
        "/ˈpɒləsi əˈlaʊz/",
        "chính sách (in sẵn) cho phép",
        "📜",
      ]),
      c("Already yours", "The lounge was already yours for these nights, madam.", [
        "/ɔːlˈredi jɔːz/",
        "vốn đã là quyền của quý khách",
        "🔙",
      ]),
      c("My manager's to give", "A spa credit is my manager's to give, sir.", [
        "/maɪ ˈmænɪdʒəz tuː ɡɪv/",
        "do quản lý của tôi quyết định tặng hay không",
        "🎁",
      ]),
      c("The loyalty office decides", "Tier and points — the loyalty office decides, madam.", [
        "/ðə ˈlɔɪəlti ˈɒfɪs dɪˈsaɪdz/",
        "bộ phận khách hàng thân thiết quyết định",
        "💳",
      ]),
      c(
        "Let me check with my manager",
        "Let me check with my manager, madam, and I will come back within the hour.",
        ["/let miː tʃek wɪð maɪ ˈmænɪdʒə/", "để tôi hỏi ý kiến quản lý", "📞"],
      ),
    ],
    grammar: [
      g(
        "I will give you the lounge back as compensation.",
        "The lounge was already yours, sir, so I am putting it back now.",
        "Trả lại thứ khách VỐN ĐÃ có quyền không phải là bồi thường — đó là việc lẽ ra đã phải làm. Đại từ sở hữu đứng một mình là 'yours' (của quý khách), không phải 'your'.",
        "The lounge was already your, sir, so I am putting it back now.",
      ),
      g(
        "No problem, we can give you a free dinner.",
        "Let me check with my manager, madam. A dinner is my manager's to give.",
        "Thứ khách chưa có quyền hưởng — bữa tối, phiếu spa, nâng hạng — là của quản lý. Bạn ĐỀ XUẤT, không hứa. 'Let me + động từ nguyên mẫu', không có 'to'.",
        "Let me to check with my manager, madam. A dinner is my manager's to give.",
      ),
    ],
    speaking: [
      sp(
        "My silk shirt came back from your laundry ruined.",
        t3a,
        "Vẫn là bước một và hai trước: xin lỗi về sự việc, rồi XEM tận mắt — chiếc áo và phiếu giặt là hai dữ kiện. Chưa nói đến tiền.",
      ),
      sp(
        "Here. And your laundry list says up to ten times the cleaning charge.",
        t3b,
        "Đây là chính sách IN SẴN mà khách đọc được, nên bạn được nhắc lại: 'policy allows up to'. Nhưng số tiền cụ thể là của Duty Manager — đừng hứa mức cao nhất.",
        undefined,
        ["charge", "decides"],
        t3a,
      ),
      risk(
        also(
          sp(
            "So you will pay me the full ten times?",
            t3c,
            "Khách muốn một con số. Đừng nói số nào, kể cả mức tối đa trong chính sách. 'Let me check with my' + người quyết định, rồi một mốc giờ.",
            undefined,
            ["promise", "duty", "manager", "back", "evening"],
            t3b,
          ),
          "I am not able to promise a figure, sir. Let me check with my Duty Manager, and I will come back to you this evening.",
          "I cannot promise a figure, sir. I will check with my Duty Manager and come back to you this evening.",
          "I cannot promise an amount, sir. Let me check with my Duty Manager, and I will come back to you this evening.",
          "I cannot promise a figure, sir. My Duty Manager decides the amount, and I will come back to you this evening.",
        ),
      ),
      sp(
        "So what are you going to do about the lounge?",
        "Your booking has the lounge for these nights, sir, so it was already yours. I am telling the lounge team now.",
        "Nhìn BOOKING trước: lounge ghi trong booking cho những đêm này thì trả lại ngay — 'already yours' — và báo tổ lounge. Lounge có vì hạng thẻ thì không phải của bạn.",
      ),
      risk(
        also(
          sp(
            "The least you can do is give us dinner tonight.",
            "Let me check with my manager, madam. A dinner is my manager's to give, and I will come back within the hour.",
            "Bữa tối khách chưa có quyền hưởng: bạn ĐỀ XUẤT với quản lý, không hứa. Nói rõ quyết định của ai — 'my manager's to give' — và khi nào bạn quay lại.",
            undefined,
            ["dinner", "back", "within", "hour"],
          ),
          "A dinner is my manager's to give, madam. Let me check with her, and I will come back within the hour.",
          "Let me check with my manager, madam. A dinner is my manager's to give. I will come back within the hour.",
          "Let me check with my manager, madam. A dinner is my manager's decision, and I will come back within the hour.",
          "Let me check with my manager, madam. Dinner is my manager's to give, and I will come back to you within the hour.",
        ),
      ),
      sp(
        "He wants his points back as well. Can I just log that as agreed?",
        "Log it as requested, not as agreed. The loyalty office decides that one.",
        "ĐỒNG NGHIỆP hỏi. Ghi 'đã đồng ý' là hứa thay một bộ phận khác. Hạng thẻ và điểm: 'the loyalty office decides'.",
        "colleague",
      ),
    ],
    reading: read(
      `SOLVE: WHOSE IS IT?
Step three is solving, and most of solving is knowing whose decision it is. Say it out loud: "That is my manager's to give" is better than a long silence, and far better than a yes you cannot keep.
Yours now: putting back what the guest already had. Lounge access written into the booking for these nights was already theirs. Give it back at once, tell the lounge team, and do not call it compensation.
Your manager's: anything the guest was not entitled to before today — a dinner, a spa credit, an upgrade. You propose it; you never promise it. Say "Let me check with my manager," and give an hour.
The Duty Manager's: any money — a refund, a line off the bill, a payment for damage. Some of this is printed policy, and printed policy you may quote. The laundry list says the hotel pays up to ten times the cleaning charge. So you may say: "Our policy allows up to ten times the cleaning charge." The amount is still the Duty Manager's.
The loyalty office decides tier and points, on every day of the year.
What you never quote is an internal limit — what this desk or the front office may give without asking. Ask your manager for those figures in your first week, and keep them to yourself.`,
      [
        {
          q: "Khách mất quyền vào lounge đã ghi trong booking. Trả lại thì gọi là gì?",
          options: [
            "Phần bồi thường đầu tiên cho khách",
            "Quyết định của quản lý, nên phải xin phép trước khi trả",
            "Việc lẽ ra phải làm — không gọi là bồi thường",
          ],
          correct: 2,
          explanation: `Bài đọc: "Give it back at once, tell the lounge team, and do not call it compensation."`,
        },
        {
          q: "Khách hỏi về chiếc áo lụa bị hỏng. Bạn được phép nói điều gì?",
          options: [
            "Chính sách in sẵn: tối đa mười lần phí giặt",
            "Hạn mức nội bộ mà quầy này được tự duyệt không cần hỏi",
            "Số tiền chắc chắn khách sẽ nhận được",
          ],
          correct: 0,
          explanation: `Bài đọc: "Some of this is printed policy, and printed policy you may quote." Con số cuối cùng vẫn do Duty Manager quyết.`,
        },
        {
          q: "Khách đòi khôi phục điểm thưởng. Ai quyết?",
          options: [
            "Duty Manager",
            "The loyalty office — họ quyết hạng thẻ và điểm, ngày nào cũng vậy",
            "Bạn, nếu khách là khách quen",
          ],
          correct: 1,
          explanation: `Bài đọc: "The loyalty office decides tier and points, on every day of the year."`,
        },
      ],
    ),
    game: [
      round(
        "After all this, we expect a free night.",
        [
          [
            "Of course, sir. After everything that has happened to you, the night is on us.",
            "register",
          ],
          ["Let me check with my manager, sir. A free night is not mine to give.", "answer"],
          ["Of course, sir. After everything that has happen to you, the night is on us.", "form"],
        ],
        "Câu này tự tặng một đêm miễn phí — quà có giá trị tiền không phải của bạn. Câu sai ngữ pháp cũng tự tặng y như thế, lại dùng 'has happen'; thì hiện tại hoàn thành là 'has + V3': 'has happened'. Đáp án nói thật đó là quyết định của ai.",
      ),
      round(
        "He wants his tier restored. Can I just tell him it is done?",
        [
          ["No. The loyalty office decides. Log it as requested, not as agreed.", "answer"],
          ["Yes — he is a regular, and they almost always agree.", "register"],
          ["Yes — he is a regular, and they almost always agrees.", "form"],
        ],
        "Câu này hứa thay bộ phận khách hàng thân thiết — một lời hứa không giữ được là khiếu nại thứ hai. Câu sai ngữ pháp cũng hứa thay y như thế, lại chia sai động từ: 'they' đi với 'agree', không phải 'agrees'. Đáp án ghi là 'yêu cầu', không phải 'đã đồng ý'.",
        "colleague",
      ),
    ],
  }),

  L(33, 4, "Thank, and Close It in Writing", "Bước bốn — cảm ơn, và chốt bằng giấy", {
    vocabulary: [
      c("Thank you for telling us", "Thank you for telling us, sir. It helps us put it right.", [
        "/θæŋk juː fɔː ˈtelɪŋ ʌs/",
        "cảm ơn quý khách đã cho chúng tôi biết",
        "💐",
      ]),
      c("In writing", "You will have it in writing before you leave the desk, madam.", [
        "/ɪn ˈraɪtɪŋ/",
        "bằng văn bản",
        "📄",
      ]),
      c("A copy for you", "A copy for you, sir, and one on the file.", [
        "/ə ˈkɒpi fɔː juː/",
        "một bản để quý khách giữ",
        "📑",
      ]),
      c("Close the case", "I will not close the case until you tell me it is right, madam.", [
        "/kləʊz ðə keɪs/",
        "đóng hồ sơ khiếu nại",
        "🗂️",
      ]),
    ],
    grammar: [
      g(
        "I will remember to sort it out.",
        "You will have it in writing before you go up, madam.",
        "Trí nhớ không phải một cam kết. Điều đã thoả thuận phải ra GIẤY trước khi khách rời quầy. Cụm cố định: 'IN writing', không phải 'on writing'.",
        "You will have it on writing before you go up, madam.",
      ),
      g(
        "OK, it is finished now.",
        "Thank you for telling us, sir. The case stays open until you tell me it is right.",
        "Bước cuối là CẢM ƠN — khách đã nói với mình thay vì viết lên mạng. Và hồ sơ chỉ đóng khi KHÁCH nói đã ổn. Sau 'thank you for' là V-ing: 'for telling'.",
        "Thank you for tell us, sir. The case stays open until you tell me it is right.",
      ),
    ],
    speaking: [
      also(
        sp(
          "And how do I know any of this will actually happen?",
          t4a,
          "Khách nói thẳng là không tin lời nói nữa. Đừng hứa thêm bằng lời — đưa ra thứ khách cầm được: 'in writing', và 'a copy for you'.",
        ),
        "You will have it in writing before you go up, madam — a copy for you and one on the file.",
      ),
      sp(
        "Fine. I suppose that is something.",
        t4b,
        "Bước bốn: CẢM ƠN, và cảm ơn thật lòng — khách đã nói với mình thay vì viết lên mạng. Câu điều kiện 'we would never have known' nói lý do.",
        undefined,
        undefined,
        t4a,
      ),
      also(
        sp(
          "So is that the end of it?",
          t4c,
          "Hồ sơ đóng khi KHÁCH nói đã ổn, không phải khi bạn nghĩ là xong: 'close the case when you say so'.",
          undefined,
          undefined,
          t4b,
        ),
        "Not until you tell me it is right, madam. I will close the case only when you say so.",
      ),
      sp(
        "The cake was replaced and the guest seemed pleased. Shall I log it as closed?",
        "Not yet. Ask her if it is right, and close the case only when she says so.",
        "ĐỒNG NGHIỆP hỏi. Trông có vẻ hài lòng chưa phải là đã nói. Hỏi khách, rồi mới đóng hồ sơ.",
        "colleague",
      ),
      sp(
        "My shift ends at six, and the guest is still waiting for the Duty Manager.",
        "Hand it over to one person, by name, before six. A note on the desk is not a handover.",
        "ĐỒNG NGHIỆP hỏi. Một việc không có tên người nhận là việc không ai làm. Bàn giao cho MỘT người, nói tên, trước khi hết ca.",
        "colleague",
      ),
      also(
        sp(
          "Will you remember all of this next time we stay?",
          "Only with your permission, madam. May I put a note on your file for your next stay?",
          "Phần lưu cho lần sau vẫn cần khách đồng ý: 'Only with your permission'. Ghi điều khách muốn lần sau, không ghi cả câu chuyện khiếu nại.",
        ),
        "Only with your permission, madam. Shall I put a note on your file for your next stay?",
      ),
    ],
    reading: read(
      `THANK, AND CLOSE IT PROPERLY
The last step is the one guests remember: thank them. A guest who complained told us instead of telling the internet, and that is a favour. "Thank you for telling us, madam" is not a formula; it is true.
Then make it real. Everything agreed goes in writing before the guest leaves the desk. A guest who has been let down once will not accept a second promise made only out loud. Write what was agreed, who agreed it, and when it will happen.
Make two copies, one for the file and one for the guest. "A copy for you, madam" is the sentence that ends the argument.
No cause, no department, no colleague's name and no figure goes on that paper. A figure goes on a line the Duty Manager signs.
If your shift ends first, hand it over to one person, by name. A note left on the desk belongs to nobody.
The case stays open until the guest says it is right. You may think it is finished; only the guest can close the case. Then follow up once, after it is done, and put a follow-up note in the file.`,
      [
        {
          q: "Bước cuối cùng của bốn bước là gì?",
          options: [
            "Cảm ơn khách đã nói với mình",
            "Hứa sẽ không bao giờ để chuyện này lặp lại",
            "Tặng khách một món quà nhỏ thay lời xin lỗi",
          ],
          correct: 0,
          explanation: `Bài đọc: "The last step is the one guests remember: thank them."`,
        },
        {
          q: "Tờ thoả thuận KHÔNG được ghi điều gì?",
          options: [
            "Điều đã thoả thuận và mốc thời gian thực hiện",
            "Nguyên nhân, tên bộ phận hay đồng nghiệp, và bất kỳ con số nào",
            "Tên người đã đồng ý",
          ],
          correct: 1,
          explanation: `Bài đọc: "No cause, no department, no colleague's name and no figure goes on that paper."`,
        },
        {
          q: "Khi nào được đóng hồ sơ khiếu nại?",
          options: [
            "Khi việc đã xong và quản lý đã ký",
            "Khi hết ca, để ca sau khỏi phải lo",
            "Khi chính khách nói rằng đã ổn",
          ],
          correct: 2,
          explanation: `Bài đọc: "The case stays open until the guest says it is right."`,
        },
      ],
    ),
    game: [
      round(
        "You will email me the details later, will you? Like last time?",
        [
          ["Not by email, madam. I will write it now, and you will have a copy.", "answer"],
          ["Of course, madam. I will email you tonight when I am back at my desk.", "register"],
          ["Not by email, madam. I will write it now, and you will has a copy.", "form"],
        ],
        "Câu này lại là một lời hứa miệng — đúng thứ khách vừa nói đã thất bại 'lần trước'. Câu sai ngữ pháp dùng 'you will has'; sau 'will' là 'have'. Đáp án viết ngay và đưa bản sao cho khách.",
      ),
      round(
        "He signed the paper. Can I close the case now?",
        [
          ["Yes — a signature means he has accepted everything we offered.", "register"],
          ["Not yet. Close the case when he will tell us it is right.", "form"],
          ["Not yet. Close the case when he tells us it is right.", "answer"],
        ],
        "Câu này coi chữ ký là xong — nhưng chỉ khách mới đóng được hồ sơ. Câu sai ngữ pháp dùng 'when he will tell'; sau 'when' (mệnh đề thời gian) dùng thì hiện tại: 'when he tells'. Đáp án chờ khách nói đã ổn.",
        "colleague",
      ),
    ],
  }),
];

export const week: AuthoredWeek = {
  title: { en: "Disputes and Compensation: Four Steps", vi: "Tranh chấp & bồi thường — bốn bước" },
  canDo:
    "Nói được: xử lý một khiếu nại đủ bốn bước — lắng nghe đủ bốn dữ kiện, xin lỗi về sự việc mà không nhận lỗi hay đổ cho ai, nói rõ quyết định thuộc về ai ('Let me check with my manager', 'Our policy allows… up to…'), rồi cảm ơn khách và chốt bằng giấy; và nhận ra khi nào một chuyện không phải khiếu nại mà là việc của Duty Manager.",
  lessons,
};
