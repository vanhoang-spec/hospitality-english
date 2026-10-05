// GR week 37 — medical emergencies (the Guest Relations exception: see
// docs/curriculum-level-matrix.md, Phase 4 — 36 evacuation, 37 medical,
// 38 storms).
//
// Rewritten after the first blind round of the reopened Phase 4 (7ed3254).
// The round's blocker was this week: one emergency, two scripts. The old
// week sent help first ("I am sending help to your room right now… Is he
// conscious?") while the old week 40 screened first, and the exam graded
// both as right. There is now ONE script, taught here and used unchanged in
// weeks 39 and 40:
//   1. one question first — "Is he breathing?";
//   2. not breathing, or nobody is sure: an ambulance, 115, dialled by you or
//      by a colleague you name — the hotel's name and street first;
//   3. breathing: first aid and the Duty Manager on the inside line, the way
//      Phase 3 taught it ("I am calling first aid and the duty manager
//      now") — and first aid, not the desk, decides on the ambulance;
//   4. either way: stay on the line, do not move him, nothing to eat or
//      drink, the guest's own medicine kept ready for first aid, and comfort
//      that is one true thing happening — never "he is in good hands".
// Also gone: "you would pay nothing today" (what an insurer covers is the
// insurer's), and the next of kin written on the guest file (health is not
// on the guest file; the facts go on the incident report).
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

// ── Lesson 1 — one question first ──────────────────────────────────────────
const t1a = "Is he breathing, madam? Please stay on the line with me.";
const t1b =
  "Then I am calling an ambulance now, madam. Please do not move him, and stay on the line.";
const t1c = "First aid is on the way too, madam, and I am staying on the line until they knock.";

// ── Lesson 2 — until help arrives ──────────────────────────────────────────
const t2a = "I do not know that yet, sir. First aid is on the way, and I am staying here with you.";
const t2b = "Please give her nothing to eat or drink, sir, until first aid has seen her.";
const t2c = "That is for first aid to decide, sir. Please keep her own medicine ready for them.";

// ── Lesson 3 — the doctor, the clinic and the bill ─────────────────────────
const t3a = "Of course, madam. May I ask the doctor on call to see you in your room?";
const t3b =
  "Your insurer decides that, madam. Please ask the doctor for a medical report in English.";
const t3c =
  "Then I will call ahead so the clinic expects you, madam, and ask the concierge desk for a car.";

// ── Lesson 4 — afterwards ──────────────────────────────────────────────────
const t4a = "I am glad you are back, madam. Is there anything I can do for you tonight?";
const t4b = "Of course, madam. I will ask housekeeping not to knock until you call them.";
const t4c =
  "It is our pleasure, madam. May I check on you tomorrow afternoon, or would you rather call me?";

const lessons = [
  L(37, 1, "One Question First", "Một câu hỏi trước tiên", {
    vocabulary: [
      c("Collapsed", "A guest has collapsed in his room, and he is breathing.", [
        "/kəˈlæpst/",
        "ngã quỵ, gục xuống đột ngột",
        "🆘",
      ]),
      c("Is he breathing", "Is he breathing, madam? That tells me who to call.", [
        "/ɪz hiː ˈbriːðɪŋ/",
        "ông ấy còn thở không",
        "🫁",
      ]),
      c("Ambulance", "If he is not breathing, I am calling an ambulance now.", [
        "/ˈæmbjələns/",
        "xe cấp cứu (gọi 115)",
        "🚑",
      ]),
      c("Stay on the line", "Please stay on the line with me, madam.", [
        "/steɪ ɒn ðə laɪn/",
        "xin giữ máy, đừng cúp máy",
        "📞",
      ]),
      c("Our name and street", "On 115, say our name and street first, then the room number.", [
        "/ˈaʊə neɪm ənd striːt/",
        "tên khách sạn và tên đường (nói đầu tiên khi gọi 115)",
        "🏨",
      ]),
    ],
    grammar: [
      g(
        "What happened? Did he fall? Is he ill? What did he eat?",
        "Is he breathing, madam? I am staying on the line with you.",
        "MỘT câu hỏi trước tiên, vì câu trả lời quyết định gọi số nào. Bốn câu hỏi là bốn lần người nhà phải dừng lại nghĩ. 'Is he breathing' là hiện tại tiếp diễn (đang thở) — 'breath' là danh từ, không dùng làm động từ.",
        "Is he breath, madam? I am staying on the line with you.",
      ),
      g(
        "Maybe he not breathing, I call ambulance.",
        "If he is not breathing, or you are not sure, I will call an ambulance.",
        "Câu điều kiện: 'If + hiện tại' cho điều đang xảy ra, rồi 'will' cho việc bạn làm. Không chắc thì coi như KHÔNG THỞ. Tiếng Việt bỏ được chữ 'là', tiếng Anh thì không: 'he IS not breathing'.",
        "If he not breathing, or you are not sure, I will call an ambulance.",
      ),
    ],
    speaking: [
      also(
        sp(
          "Please help! My husband has collapsed in our room!",
          t1a,
          "MỘT câu hỏi trước — 'Is he breathing' — rồi giữ người nhà trên máy: 'stay on the line'. Đừng hứa có người tới khi chưa ai bấm số. Chữ breathing /ˈbriːðɪŋ/ — âm /ð/ hữu thanh, lưỡi giữa hai hàm răng, đừng thành /d/.",
          undefined,
          ["breathing", "stay", "line"],
        ),
        "Is he breathing, madam? Please stay on the line with me now.",
      ),
      risk(
        also(
          sp(
            "I... I do not know! I cannot tell!",
            t1b,
            "Không ai nói chắc được là còn thở thì COI NHƯ KHÔNG THỞ: gọi 'an ambulance' ngay. Rồi hai việc cho người nhà: 'do not move him', và 'stay on the line'. Chữ ambulance /ˈæmbjələns/ — trọng âm âm tiết đầu.",
            undefined,
            ["calling", "ambulance", "move", "stay", "line"],
            t1a,
          ),
          "Then I am calling an ambulance now, madam. Please do not move him, and please stay on the line.",
          "I am calling an ambulance now, madam. Please do not move him, and stay on the line with me.",
        ),
      ),
      sp(
        "All right. I am kneeling next to him. Please hurry.",
        t1c,
        "Trấn an bằng một việc THẬT đang xảy ra — 'on the way' — và một mốc bạn giữ được: bạn không cúp máy cho tới khi có người gõ cửa. Đừng nói he will be fine.",
        undefined,
        ["first", "aid", "way", "staying", "line"],
        t1b,
      ),
      risk(
        also(
          sp(
            "My wife fainted in the bathroom. She is breathing, but she will not wake up properly.",
            "I am calling first aid and the Duty Manager now, sir. Please do not move her.",
            "Khách CÒN THỞ: gọi sơ cứu và Duty Manager qua đường nội bộ, kèm số phòng — đúng câu đã học ở các tuần trước. Xe cấp cứu thì sơ cứu quyết, không phải bạn. Rồi một việc cho người nhà: 'do not move her'.",
            undefined,
            ["calling", "first", "aid", "duty", "manager", "move"],
          ),
          "I am calling first aid and the Duty Manager now, sir. Please do not move her at all.",
          "Thank you, sir. I am calling first aid and the Duty Manager now, and please do not move her.",
        ),
      ),
      sp(
        "I have the wife on the phone. She is not sure if he is breathing.",
        "Then dial 115 yourself: our name and street first, then the room number.",
        "ĐỒNG NGHIỆP hỏi. Không chắc là coi như không thở, nên 115 trước. Gọi tên người bấm số — ở đây là chính đồng nghiệp — để không ai tưởng người kia đã gọi. 115 không phải đường nội bộ: 'our name and street' đi trước số phòng.",
        "colleague",
        ["name", "street", "room", "number"],
      ),
      sp(
        "Duty Manager. You rang about 1108?",
        "A guest has collapsed in his room. He is breathing, and first aid is on the way.",
        "Báo lên cấp trên thì không cần sir: ba dữ kiện ngắn — chuyện gì, còn thở hay không, ai đang tới. 'Collapsed' /kəˈlæpst/ — đuôi -ed sau /p/ đọc thành /t/.",
        "manager",
        ["collapsed", "breathing", "first", "aid", "way"],
      ),
    ],
    reading: read(
      `ONE QUESTION FIRST
A guest who rings to say somebody has collapsed needs help fast, and the fastest help starts with one question: "Is he breathing?" The answer decides which number you call.
If he is not breathing, or nobody there is sure, treat it as not breathing. Call an ambulance first: dial 115 yourself, or name the colleague who will. 115 is not an inside line, so say the hotel's name and street first, then the room number.
If he is breathing, call first aid and the Duty Manager on the inside line, with the room number. First aid decides whether an ambulance is needed. You do not.
Either way, the person on the telephone stays with you. "Please stay on the line" keeps her talking, and it keeps you hearing what changes. Do not promise that help is coming before anybody has dialled.
Then give her two things she can do: stay with him, and do not move him.
Last, ask your own manager two questions now, not on the night. Which inside number reaches first aid? And who carries the first aid kit after midnight?`,
      [
        {
          q: "Khách báo chồng mình vừa ngã quỵ. Câu hỏi đầu tiên của bạn là gì?",
          options: [
            "Ông ấy bị làm sao, trước đó có bệnh gì không",
            "Ông ấy còn thở không",
            "Ông ấy có bảo hiểm du lịch không, để biết nên gọi nơi nào",
          ],
          correct: 1,
          explanation: `Bài đọc: "the fastest help starts with one question: 'Is he breathing?' The answer decides which number you call."`,
        },
        {
          q: "Người nhà không chắc khách còn thở hay không. Bạn làm gì?",
          options: [
            "Coi như không thở: gọi 115 trước",
            "Chờ đội sơ cứu lên xem rồi mới quyết định có gọi xe cấp cứu",
            "Gọi Duty Manager hỏi xem có cần gọi xe cấp cứu không",
          ],
          correct: 0,
          explanation: `Bài đọc: "If he is not breathing, or nobody there is sure, treat it as not breathing. Call an ambulance first."`,
        },
        {
          q: "Gọi 115, bạn nói điều gì trước tiên?",
          options: [
            "Số phòng của khách",
            "Tên bệnh mà mình đoán là khách đang mắc",
            "Tên khách sạn và tên đường",
          ],
          correct: 2,
          explanation: `Bài đọc: "115 is not an inside line, so say the hotel's name and street first, then the room number."`,
        },
      ],
    ),
    game: [
      round(
        "My husband has collapsed! Please, somebody help!",
        [
          ["Do not worry, madam, he will be fine. I am sending somebody up now.", "register"],
          ["Is he breathing, madam? Please stay on the line with me.", "answer"],
          ["Is he breath, madam? Please stay on the line with me.", "form"],
        ],
        "Câu này hứa 'he will be fine' — điều không ai biết — và hứa có người lên trước khi biết phải gọi số nào. Câu sai ngữ pháp dùng 'Is he breath'; 'breath' là danh từ, câu hỏi cần 'Is he breathing'. Đáp án hỏi một câu trước, và giữ người nhà trên máy.",
      ),
      round(
        "The wife says he is breathing but he will not wake up. Shall I dial 115?",
        [
          ["No need — if he is breathing, he probably just needs to sleep it off.", "register"],
          ["Call first aid and the Duty Manager now. First aid decide on the ambulance.", "form"],
          [
            "Call first aid and the Duty Manager now. First aid decides on the ambulance.",
            "answer",
          ],
        ],
        "Câu này tự chẩn đoán là 'ngủ một giấc là khỏi' — chuyện của người có chuyên môn, không phải của quầy. Câu sai ngữ pháp dùng 'First aid decide'; 'first aid' ở đây là một đội, chia số ít: 'decides'. Đáp án: còn thở thì gọi sơ cứu và Duty Manager, và để sơ cứu quyết chuyện xe cấp cứu.",
        "colleague",
      ),
    ],
  }),

  L(37, 2, "Until Help Arrives", "Ở lại cho tới khi có người tới", {
    vocabulary: [
      c("Do not move him", "Please do not move him, madam. First aid decides that.", [
        "/duː nɒt muːv hɪm/",
        "đừng di chuyển ông ấy",
        "✋",
      ]),
      c("Nothing to eat or drink", "Nothing to eat or drink until first aid has seen her, sir.", [
        "/ˈnʌθɪŋ tə iːt ɔː drɪŋk/",
        "không cho ăn uống gì",
        "🚫",
      ]),
      c("Her own medicine", "Please keep her own medicine ready for first aid, sir.", [
        "/hɜːr əʊn ˈmedsn/",
        "thuốc riêng của chính khách",
        "💊",
      ]),
      c("On the way", "First aid is on the way, madam, and I am staying with you.", [
        "/ɒn ðə weɪ/",
        "đang trên đường tới",
        "🏃",
      ]),
    ],
    grammar: [
      g(
        "Do not worry, sir. She is in very good hands.",
        "First aid is on the way, sir, and I am staying here with you.",
        "Đừng hứa về kết quả — 'good hands', 'nothing serious' là lời hứa về một cơ thể bạn không biết gì. Trấn an bằng một việc THẬT đang xảy ra. Hiện tại tiếp diễn cần đủ 'am': 'I am staying', không phải 'I staying'.",
        "First aid is on the way, sir, and I staying here with you.",
      ),
      g(
        "Give her some water, it will help her.",
        "Please give her nothing to eat or drink until first aid arrives.",
        "Không ăn, không uống cho tới khi sơ cứu đã xem — bác sĩ có thể cần dạ dày trống. Sau 'until' (mệnh đề thời gian) dùng thì hiện tại: 'until first aid arrives', không phải 'until first aid will arrive'.",
        "Please give her nothing to eat or drink until first aid will arrive.",
      ),
    ],
    speaking: [
      also(
        sp(
          "Is she going to be all right? Please tell me she will be all right.",
          t2a,
          "Bạn không biết, nên đừng hứa — nói thật bằng câu đã học: 'I do not know that yet'. Rồi một việc THẬT đang xảy ra ('on the way') và một điều bạn giữ được: bạn ở lại.",
          undefined,
          ["first", "aid", "way", "staying"],
        ),
        "I do not know that yet, sir. First aid is on the way, and I am staying here with you both.",
      ),
      sp(
        "She keeps asking for water. Can I give her some?",
        t2b,
        "Một lệnh cấm có lý do ngầm: không ăn uống cho tới khi sơ cứu đã xem. Nói một lần, rõ ràng — 'nothing to eat or drink'. Chữ until /ənˈtɪl/ — trọng âm âm tiết hai.",
        undefined,
        ["first", "aid", "seen"],
        t2a,
      ),
      sp(
        "She has her heart tablets in her bag. Should I give her one?",
        t2c,
        "Thuốc là của khách, và quyết định là của người có chuyên môn — không phải của bạn, cũng không phải lấy từ túi bạn. Nói ai quyết, rồi một việc người nhà làm được: giữ sẵn 'her own medicine'.",
        undefined,
        ["first", "aid", "decide", "keep", "ready"],
        t2b,
      ),
      risk(
        also(
          sp(
            "Should we lift him onto the bed? The floor is so hard.",
            "Please do not move him, sir. First aid decides that, and they are on the way.",
            "Người đang nằm trên sàn có thể bị thương ở chỗ không ai thấy. Cấm một lần, rõ ràng — 'do not move him' — rồi nói AI quyết và họ đang tới.",
            undefined,
            ["move", "first", "aid", "decides", "way"],
          ),
          "Please do not move him, sir. First aid decides that, and they are on the way now.",
          "Please do not move him at all, sir. First aid decides that, and they are on the way.",
        ),
      ),
      sp(
        "I am holding the lift. Can you run down and fetch the wheelchair?",
        "I am staying with her. Please ask the bell desk to bring it up.",
        "ĐỒNG NGHIỆP hỏi. Người đang ở cạnh khách thì KHÔNG rời đi lấy đồ — nhờ người khác mang tới. Nói việc của mình trước, rồi đề nghị cụ thể ai đi lấy.",
        "colleague",
        ["staying", "bell", "desk", "bring"],
      ),
      sp(
        "His daughter is crying in the corridor. Shall I tell her he is in good hands?",
        "No. Tell her first aid is with him, and stay beside her until somebody comes.",
        "ĐỒNG NGHIỆP hỏi. Đừng nói 'good hands': đó là lời hứa về kết quả, và không ai được hứa điều đó. Nói một điều đúng đang xảy ra, rồi ở lại cạnh người nhà.",
        "colleague",
        ["first", "aid"],
      ),
    ],
    reading: read(
      `UNTIL HELP ARRIVES
Once the call is made, the hardest part begins: the minutes before anybody arrives. Your job in those minutes is to stay. Never leave a guest to fetch something yourself. Send a colleague, or ask the bell desk.
Say two things early, and say them once. Do not move him: a person on the floor may be hurt in ways nobody can see. And nothing to eat or drink until first aid has seen him, because a doctor may need an empty stomach.
Medicine belongs to the guest. If she carries her own, ask her family to find it and keep it ready. Whether she takes it is for first aid to decide, not for you, and nothing ever comes from your own bag.
The family will ask you to promise it will be all right. You cannot, and you should not try. "He is in good hands" and "It is nothing serious" are promises about a body you know nothing about. Give them something true instead: one thing that is happening, and a time if someone has given you one. "First aid is on the way. They said three minutes."
Then stay beside them until that is true.`,
      [
        {
          q: "Bạn cần một chiếc xe lăn trong lúc đang ở cạnh khách. Bạn làm gì?",
          options: [
            "Chạy đi lấy thật nhanh, rồi quay lại ngay",
            "Nhờ đồng nghiệp hoặc bell desk mang tới",
            "Nhờ người nhà khách chạy đi lấy giúp cho nhanh hơn",
          ],
          correct: 1,
          explanation: `Bài đọc: "Never leave a guest to fetch something yourself. Send a colleague, or ask the bell desk."`,
        },
        {
          q: "Vì sao không cho khách ăn uống gì trong lúc chờ?",
          options: [
            "Vì bác sĩ có thể cần dạ dày trống",
            "Vì khách sạn không được phục vụ đồ ăn cho khách đang bị ốm",
            "Vì nước có thể làm khách tỉnh lại quá nhanh",
          ],
          correct: 0,
          explanation: `Bài đọc: "nothing to eat or drink until first aid has seen him, because a doctor may need an empty stomach."`,
        },
        {
          q: "Người nhà xin bạn nói 'sẽ không sao đâu'. Bạn nói gì?",
          options: [
            "'He is in good hands', để người nhà yên lòng chờ đội sơ cứu",
            "Không nói gì cả, vì nói gì lúc này cũng có thể sai",
            "Một việc đang xảy ra, và mốc giờ nếu có người đã cho",
          ],
          correct: 2,
          explanation: `Bài đọc: "Give them something true instead: one thing that is happening, and a time if someone has given you one."`,
        },
      ],
    ),
    game: [
      round(
        "Please tell me he is going to be all right.",
        [
          ["First aid is on the way, madam, and I am staying here with you.", "answer"],
          ["He is in very good hands, madam — it is surely nothing serious.", "register"],
          ["First aid is on the way, madam, and I staying here with you.", "form"],
        ],
        "Câu này hứa về kết quả ('good hands', 'nothing serious') — điều không ai ở quầy biết. Câu sai ngữ pháp thiếu 'am': phải là 'I am staying'. Đáp án nói một việc thật đang xảy ra, và bạn ở lại.",
      ),
      round(
        "His mouth is so dry. Should I give him some water?",
        [
          ["Yes, a little water should help him feel better, sir.", "register"],
          ["Please give him nothing to drink, sir, until first aid has seen him.", "answer"],
          ["Please give him nothing to drink, sir, until first aid have see him.", "form"],
        ],
        "Câu này cho uống nước — bác sĩ có thể cần dạ dày trống. Câu sai ngữ pháp dùng 'have see'; phải là 'has seen' (has + quá khứ phân từ). Đáp án nói rõ không ăn uống cho tới khi sơ cứu đã xem.",
      ),
    ],
  }),

  L(37, 3, "The Doctor, the Clinic and the Bill", "Bác sĩ, phòng khám và câu hỏi về tiền", {
    vocabulary: [
      c("The doctor on call", "The doctor on call can see you in your room, madam.", [
        "/ðə ˈdɒktər ɒn kɔːl/",
        "bác sĩ trực (khách sạn mời tới khi cần)",
        "🩺",
      ]),
      c("Your insurer", "Your insurer decides what they cover, sir.", [
        "/jɔːr ɪnˈʃʊərə/",
        "công ty bảo hiểm của quý khách",
        "🛡️",
      ]),
      c("Call ahead", "I will call ahead, so the clinic expects you.", [
        "/kɔːl əˈhed/",
        "gọi báo trước",
        "☎️",
      ]),
      c("Medical report", "Please ask the doctor for a medical report in English.", [
        "/ˈmedɪkl rɪˈpɔːt/",
        "giấy kết luận của bác sĩ",
        "📄",
      ]),
      c("Interpreter", "Let me ask my manager about an interpreter for the hospital.", [
        "/ɪnˈtɜːprɪtə/",
        "người phiên dịch",
        "🗣️",
      ]),
    ],
    grammar: [
      g(
        "Do not worry, your travel insurance will pay for everything.",
        "The clinic will confirm that with your insurer directly, sir.",
        "Đừng đoán bảo hiểm trả gì — đó là tiền của một công ty khác. Người trả lời được là phòng khám và công ty bảo hiểm. Sau 'will' là động từ nguyên mẫu: 'will confirm', không phải 'will confirms'.",
        "The clinic will confirms that with your insurer directly, sir.",
      ),
      g(
        "Go to the clinic. It is on the main road.",
        "May I call ahead, madam, so the clinic expects you?",
        "'Call ahead' biến một lời chỉ đường thành sự chăm sóc: phòng khám biết khách sắp tới. Chủ ngữ số ít 'the clinic' thì động từ thêm -s: 'expects'.",
        "May I call ahead, madam, so the clinic expect you?",
      ),
    ],
    speaking: [
      also(
        sp(
          "I have had a high fever since last night. Can I see a doctor here?",
          t3a,
          "Không phải ca nào cũng là cấp cứu: sốt cần một bác sĩ, không cần xe cấp cứu. Bạn XIN bác sĩ trực tới — 'May I ask the doctor on call' — chứ không hứa giờ thay bác sĩ.",
          undefined,
          ["doctor", "call", "room"],
        ),
        "Of course, madam. May I ask the doctor on call to come and see you in your room?",
      ),
      sp(
        "Yes, please. Will my travel insurance pay for it?",
        t3b,
        "Đừng đoán bảo hiểm trả gì. Nói ai quyết — 'Your insurer decides' — rồi một điều luôn đúng: xin 'a medical report in English', vì công ty bảo hiểm sẽ cần nó.",
        undefined,
        ["decides", "doctor", "medical", "report"],
        t3a,
      ),
      also(
        sp(
          "Thank you. And if I need to go to a clinic afterwards?",
          t3c,
          "Bác sĩ quyết có đi phòng khám hay không; bạn làm cho bước sau dễ dàng: 'call ahead', và xin quầy concierge một chiếc xe. Bạn hỏi xe giúp khách, không tự hứa xe.",
          undefined,
          ["call", "ahead", "concierge", "desk", "car"],
          t3b,
        ),
        "Then I will call ahead so the clinic expects you, madam, and I will ask the concierge desk for a car.",
      ),
      risk(
        also(
          sp(
            "I slipped by your pool. The hotel is paying for my doctor, I hope?",
            "Let me call the doctor on call first, sir. The bill is my Duty Manager's to decide.",
            "Sức khoẻ trước: gọi bác sĩ trực. Khách bị thương trong khách sạn thì không bàn tiền tại chỗ, không nhận lỗi, không hứa — chuyện hoá đơn là của Duty Manager. Nói rõ quyết định của ai, bằng giọng phục vụ.",
            undefined,
            ["call", "doctor", "bill", "duty", "manager's", "decide"],
          ),
          "Let me call the doctor on call first, sir. The bill is for my Duty Manager to decide.",
          "I am calling the doctor on call first, sir. The bill is my Duty Manager's to decide.",
        ),
      ),
      sp(
        "The lady in 604 wants paracetamol from our first aid box. Can I give her two?",
        "No, we never give medicine. I can ask the doctor on call to see her.",
        "ĐỒNG NGHIỆP hỏi. Quầy không chọn thuốc và không đưa thuốc, kể cả thuốc thường. Việc bạn làm được là mời 'the doctor on call'.",
        "colleague",
        ["medicine", "doctor", "call"],
      ),
      sp(
        "Nobody at the hospital speaks English. What am I going to do?",
        "May I call ahead for you, sir? Let me check with my manager about an interpreter.",
        "Hai việc trong tay bạn: 'call ahead' tới bệnh viện, và xin quản lý 'an interpreter' đi cùng. Bạn XIN, chưa hứa — đúng câu đã học: 'Let me check with my manager'.",
        undefined,
        ["call", "ahead", "check", "manager", "interpreter"],
      ),
    ],
    reading: read(
      `THE DOCTOR, THE CLINIC AND THE BILL
Not every medical call is an emergency. A guest with a fever, a bad stomach or a twisted ankle needs a doctor, not an ambulance. Here the desk calls the doctor on call, who visits the room. In this house that doctor comes from an outside clinic; ask your manager how it works in yours.
The guest decides whether to see a doctor. The doctor decides what happens next: rest in the room, a clinic, or a hospital. You decide neither.
What you do is make the next step easy. Call ahead, so the clinic expects the guest. Ask the concierge desk for a car. Ask your manager about an interpreter who can go along.
Then comes the question every guest asks: who pays? You do not know, and you must not guess. "You would pay nothing today" is a promise about another company's money. The doctor tells the guest the fee. The insurer decides what it covers. And if the guest was hurt on our property, the bill is the Duty Manager's to discuss.
One thing you can always say: "Please ask the doctor for a medical report in English." Most insurers ask for one.`,
      [
        {
          q: "Ai quyết định khách nghỉ tại phòng, đi phòng khám hay đi bệnh viện?",
          options: [
            "Bạn, vì chính bạn là người gọi bác sĩ tới phòng",
            "Bác sĩ",
            "Duty Manager, vì việc đó liên quan tới chi phí",
          ],
          correct: 1,
          explanation: `Bài đọc: "The doctor decides what happens next: rest in the room, a clinic, or a hospital. You decide neither."`,
        },
        {
          q: "Khách hỏi bảo hiểm có trả tiền khám không. Bạn trả lời thế nào?",
          options: [
            "'You would pay nothing today', để khách yên tâm đi khám",
            "Đoán theo loại bảo hiểm khách nước ngoài hay mua nhất",
            "Công ty bảo hiểm quyết — bạn không đoán",
          ],
          correct: 2,
          explanation: `Bài đọc: "You do not know, and you must not guess… The insurer decides what it covers."`,
        },
        {
          q: "Câu nào bạn LUÔN được nói với khách đi khám?",
          options: [
            "'Please ask the doctor for a medical report in English'",
            "'Your insurance will cover all of it, so please do not worry'",
            "'The hotel will pay, since you were hurt here'",
          ],
          correct: 0,
          explanation: `Bài đọc: "One thing you can always say: 'Please ask the doctor for a medical report in English.' Most insurers ask for one."`,
        },
      ],
    ),
    game: [
      round(
        "My travel insurance pays for everything, right? So I can go to any hospital?",
        [
          ["Your insurer decides what they cover, sir. I would rather not guess.", "answer"],
          ["Yes, sir — travel insurance almost always covers a visit like this one.", "register"],
          ["Your insurer decide what they cover, sir. I would rather not guess.", "form"],
        ],
        "Câu này đoán bảo hiểm sẽ trả — một lời hứa về tiền của công ty khác. Câu sai ngữ pháp dùng 'Your insurer decide'; chủ ngữ số ít thì động từ thêm -s: 'decides'. Đáp án nói ai quyết, và không đoán.",
      ),
      round(
        "A guest wants paracetamol from our first aid box. Shall I give her two?",
        [
          ["No. We never gives medicine, but I can ask the doctor on call to see her.", "form"],
          ["No. We never give medicine, but I can ask the doctor on call to see her.", "answer"],
          ["Yes, two is the normal dose for an adult, so it is quite safe.", "register"],
        ],
        "Câu này tự chọn thuốc và liều cho khách — việc của bác sĩ, không bao giờ của quầy. Câu sai ngữ pháp dùng 'We never gives'; với 'we' động từ không thêm -s. Đáp án từ chối và mời bác sĩ trực.",
        "colleague",
      ),
    ],
  }),

  L(37, 4, "Afterwards", "Sau sự cố — biên bản, hồ sơ và lời hỏi thăm", {
    vocabulary: [
      c("Facts only", "Facts only on the report: the time, what you saw, who you called.", [
        "/fækts ˈəʊnli/",
        "chỉ ghi sự việc",
        "🧾",
      ]),
      c("Not on the guest file", "His health is not on the guest file, sir.", [
        "/nɒt ɒn ðə ɡest faɪl/",
        "không ghi vào hồ sơ khách",
        "🗂️",
      ]),
      c(
        "I cannot talk about another guest",
        "I am sorry, sir, I cannot talk about another guest.",
        ["/aɪ ˈkænɒt tɔːk əˈbaʊt əˈnʌðə ɡest/", "tôi không thể nói về khách khác", "🤐"],
      ),
      c("Check on", "May I check on you tomorrow afternoon, madam?", [
        "/tʃek ɒn/",
        "ghé hỏi thăm (khi khách đồng ý)",
        "💬",
      ]),
    ],
    grammar: [
      g(
        "He had a heart attack because he drank too much at dinner.",
        "The guest collapsed at twenty to ten, and first aid arrived three minutes later.",
        "Biên bản sự cố chỉ ghi sự việc: giờ, việc đã thấy, ai đã được gọi. Không chẩn đoán, không đoán nguyên nhân. Việc đã xảy ra dùng quá khứ: 'arrived', không phải 'arrive'.",
        "The guest collapsed at twenty to ten, and first aid arrive three minutes later.",
      ),
      g(
        "I will write his heart problem on his file for next time.",
        "His health is not on the guest file, unless he asks us to keep something.",
        "Sức khoẻ không vào hồ sơ khách. Nếu chính khách muốn khách sạn nhớ một điều — phòng yên tĩnh, không gõ cửa buổi sáng — thì đó là sở thích, ghi khi khách đồng ý. Chủ ngữ 'he' thì 'asks', có -s.",
        "His health is not on the guest file, unless he ask us to keep something.",
      ),
    ],
    speaking: [
      sp(
        "We are back from the hospital. Honestly, we are exhausted.",
        t4a,
        "Sau bệnh viện, khách không cần lời hoa mỹ và không cần câu hỏi về bệnh. Một câu chào, một câu mời giúp — rồi để khách nói điều họ cần.",
        undefined,
      ),
      sp(
        "Just some quiet. Please do not let anyone knock in the morning.",
        t4b,
        "Bạn nhờ buồng phòng — 'I will ask housekeeping' — chứ không hứa thay họ. Câu phủ định với ask: ask somebody NOT to + động từ — chữ not đứng trước to.",
        undefined,
        ["housekeeping", "call"],
        t4a,
      ),
      also(
        sp(
          "Thank you. You have been very kind.",
          t4c,
          "Hỏi thăm là quan tâm — nhưng người vừa từ bệnh viện về có thể không muốn ai ghé. Xin phép trước: 'May I check on you', và cho khách lựa chọn tự gọi bạn.",
          undefined,
          ["check", "tomorrow", "call"],
          t4b,
        ),
        "It is our pleasure, madam. May I check on you tomorrow, or would you rather call me?",
      ),
      risk(
        also(
          sp(
            "What happened to the man next door last night? We saw the ambulance.",
            "I am sorry, sir, I cannot talk about another guest. Is there anything I can do for you?",
            "Khách khác đã thấy xe cấp cứu, và họ sẽ hỏi. Câu trả lời trọn vẹn là 'I cannot talk about another guest' — rồi một lời mời giúp. Đừng nói he is fine now, càng đừng nói ông ấy bị gì.",
            undefined,
            ["talk", "guest"],
          ),
          "I am afraid I cannot talk about another guest, sir. Is there anything I can do for you?",
          "I am sorry, sir, I am not able to talk about another guest. Is there anything I can do for you?",
        ),
      ),
      sp(
        "What do I write on the incident report? He looked drunk to me.",
        "Facts only: the time, what you saw and who you called. Not what he looked like.",
        "ĐỒNG NGHIỆP hỏi. Trông say là một phỏng đoán; không đứng vững được mới là sự việc. 'Facts only' — giờ, điều thấy, ai được gọi.",
        "colleague",
        ["saw", "called"],
      ),
      sp(
        "His wife told me about his heart problem. Shall I put it on his guest file?",
        "Not on the guest file. Facts only, and they go on the incident report.",
        "ĐỒNG NGHIỆP hỏi. Hồ sơ khách là thứ người khác sẽ đọc ở những lần lưu trú sau — sức khoẻ không thuộc về đó. Điều đã xảy ra thì vào 'incident report'.",
        "colleague",
        ["incident", "report"],
      ),
    ],
    reading: read(
      `AFTERWARDS
When the ambulance has gone, there is still work, and most of it is paper and silence.
Write the incident report in your own shift. Facts only: the time, the room, what you saw, what you did, and who you called. Do not write what you think was wrong with him, and do not write what he looked like. "He looked drunk" is a guess; "he could not stand" is a fact.
The guest file is a different piece of paper. Health does not go on it. If a guest later asks you to remember something, like a quiet room or no knock in the morning, that is a preference. It goes on with a yes, in the guest's own words.
Other guests saw the ambulance, and they will ask. "I cannot talk about another guest" is the whole answer, followed by an offer of help. Never "he is fine now", and never "it was his heart".
When the guest comes back, keep it short: a quiet room, and the morning knock stopped. Then ask before you check on them, because a person just home from hospital may want no visitors at all. "May I check on you tomorrow, or would you rather call me?"`,
      [
        {
          q: "Câu nào được viết vào biên bản sự cố?",
          options: [
            "'He looked drunk to me at dinner'",
            "'He could not stand'",
            "'It was probably his heart, the wife said'",
          ],
          correct: 1,
          explanation: `Bài đọc: "'He looked drunk' is a guess; 'he could not stand' is a fact."`,
        },
        {
          q: "Chuyện sức khoẻ của khách được ghi vào đâu?",
          options: [
            "Không ghi vào hồ sơ khách",
            "Hồ sơ khách, để lần sau phục vụ chu đáo hơn",
            "Sổ bàn giao ca, để mọi người cùng biết mà để ý",
          ],
          correct: 0,
          explanation: `Bài đọc: "The guest file is a different piece of paper. Health does not go on it."`,
        },
        {
          q: "Khách phòng bên hỏi chuyện xe cấp cứu tối qua. Bạn nói gì?",
          options: [
            "'He is fine now, sir', để khách yên tâm về ngủ tiếp",
            "Kể ngắn gọn ông ấy bị gì, vì khách đã thấy xe cấp cứu rồi",
            "'I cannot talk about another guest', rồi mời giúp",
          ],
          correct: 2,
          explanation: `Bài đọc: "'I cannot talk about another guest' is the whole answer, followed by an offer of help."`,
        },
      ],
    ),
    game: [
      round(
        "Was it a heart attack? The man next door, I mean.",
        [
          ["It was his heart, I think, sir, but he is fine now.", "register"],
          ["I cannot talk about another guest, sir. Can I help you with anything?", "answer"],
          ["I cannot talk about another guest, sir. Can I helping you with anything?", "form"],
        ],
        "Câu này kể bệnh của một vị khách khác — vừa lộ thông tin, vừa là một chẩn đoán không ai có quyền đưa ra. Câu sai ngữ pháp dùng 'Can I helping'; sau 'can' là động từ nguyên mẫu. Đáp án từ chối gọn rồi mời giúp.",
      ),
      round(
        "Shall I write 'drunk' on the report? He could hardly stand.",
        [
          ["Yes — the next shift should know he had been drinking.", "register"],
          ["Write that he can hardly stood. That is the fact.", "form"],
          ["Write that he could hardly stand. That is the fact.", "answer"],
        ],
        "Câu này ghi một phỏng đoán ('say rượu') vào biên bản — người đọc sau sẽ tin nó là sự thật. Câu sai ngữ pháp dùng 'can hardly stood'; sau 'can/could' là động từ nguyên mẫu: 'could hardly stand'. Đáp án ghi đúng điều đã thấy.",
        "colleague",
      ),
    ],
  }),
];

export const week: AuthoredWeek = {
  title: { en: "Medical Emergencies", vi: "Cấp cứu y tế — một kịch bản duy nhất" },
  canDo:
    "Nói được: hỏi một câu trước tiên ('Is he breathing?'); không thở hoặc không chắc thì gọi xe cấp cứu 115, nói tên và đường của khách sạn trước số phòng; còn thở thì gọi sơ cứu và Duty Manager; giữ người nhà trên máy, không di chuyển khách, không cho ăn uống, không hứa 'sẽ ổn thôi'; chuyển câu hỏi về bảo hiểm cho đúng người quyết; và viết biên bản sự cố chỉ ghi sự việc, không đưa chuyện sức khoẻ vào hồ sơ khách.",
  lessons,
};
