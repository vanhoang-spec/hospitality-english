// HK week 36 — Crisis on the Floor: medical, technical, weather (see ../kit.ts).
//
// Rewritten whole. The old week was right about the procedures and buried
// them in readings of 1,300–1,700 words; a learner met CPR, needles, gas and
// storms as pages, not as sentences. Now each procedure is a short reading
// (under 300 words) and the sentences it needs are drilled as turns.
//
// One language move runs through every lesson: an urgent instruction is ONE
// action plus ONE time ("The first aider will be here in two minutes"). The
// house rules hold exactly as the rest of the phase states them:
//
//  · Medical: call, then act, then stay. Never "Please stay calm", never "He
//    will be fine" — a person in fear gets an action and a time instead.
//    A guest breathing but not waking goes into the recovery position; a
//    guest not breathing gets chest compressions and the AED.
//  · Sharps and blood: the box goes to the needle; a needle injury is seen
//    in THIS shift. A needle beside foil or a burnt spoon is a supervisor's
//    room, not a cleaning job.
//  · Fire: a burning smell closes the door, a gas smell leaves it as it was.
//    Stairs, never the lift; nobody goes back. A guest who cannot walk is
//    never promised safety — Security gets the room number on the phone.
//  · Storm: balconies first, Engineering owns the power, the room below a
//    leak is checked first, and nobody promises the weather or a flight.
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

// ── Lesson 1 — a guest who will not wake ──────────────────────────────────
const t1a =
  "I am calling our first aider now, madam. He is breathing, so I am putting him in the recovery position.";
const t1b =
  "I cannot say, madam. The first aider will be here in two minutes, and I am staying with you.";
const t1c =
  "Please give him nothing to drink, madam. Nothing goes in his mouth until the first aider has seen him.";

// ── Lesson 2 — sharps, blood and broken glass ─────────────────────────────
const t2a =
  "This is a needle injury, in 610. I have washed it under running water, and I am going to the nurse now.";
const t2b = "No. A needle injury is seen by a nurse in this shift, not after lunch.";
const t2c = "Room 610, the time, what pricked me, and your name as the person I told.";

const lesson1 = L(36, 1, "A Guest Who Will Not Wake", "Khách không tỉnh", {
  vocabulary: [
    c("Unresponsive", "A guest who is unresponsive is an emergency, not a sleeping guest.", [
      "/ˌʌnrɪˈspɒnsɪv/",
      "Không phản ứng — gọi, lay đều không tỉnh",
      "🚨",
    ]),
    c("First aider", "Every floor knows the name of its first aider before the shift starts.", [
      "/ˌfɜːst ˈeɪdə/",
      "Người đã được huấn luyện sơ cứu của khách sạn",
      "⛑️",
    ]),
    c(
      "Recovery position",
      "The recovery position is for a guest who is breathing but will not wake.",
      ["/rɪˈkʌvəri pəˌzɪʃn/", "Tư thế nằm nghiêng an toàn — đầu, vai, hông xoay cùng lúc", "🛌"],
    ),
    c("AED", "An AED tells you out loud what to do, and it decides whether to shock.", [
      "/ˌeɪ iː ˈdiː/",
      "Máy sốc tim tự động — người chưa học cũng dùng được",
      "⚡",
    ]),
    c(
      "Chest compressions",
      "Chest compressions are hard and fast, in the centre of the chest, on the floor.",
      ["/ˌtʃest kəmˈpreʃnz/", "Ép tim — ấn mạnh, nhanh vào giữa ngực khi khách ngừng thở", "🫀"],
    ),
  ],
  grammar: [
    g(
      "I found a man on the floor! Somebody come quickly!",
      "Room 1204: a guest is unresponsive, and he is breathing. Please send the first aider.",
      "Gọi đường nội bộ: số phòng TRƯỚC, rồi một câu tình trạng, rồi khách có thở hay không. Hiện tại tiếp diễn cần 'is' + động từ -ing: he is breathing — người Việt hay bỏ 'is'.",
      "Room 1204: a guest is unresponsive, and he breathing. Please send the first aider.",
    ),
    g(
      "Please calm down, madam. He will be fine.",
      "The first aider will be here in two minutes, madam, and I am staying with you.",
      "Trấn an bằng MỘT việc và MỘT mốc giờ, không bằng một lời hứa không ai giữ được. Sau số lớn hơn một, danh từ đếm được phải có -s: two minutes.",
      "The first aider will be here in two minute, madam, and I am staying with you.",
    ),
  ],
  speaking: [
    sp(
      "My husband collapsed by the bed. He is breathing, but he will not wake up!",
      t1a,
      "Gọi trước, rồi mới làm, và nói việc bạn ĐANG làm. Khách còn thở mà không tỉnh thì đặt nằm nghiêng — 'recovery position': đầu, vai và hông xoay cùng một lúc.",
    ),
    risk({
      ...sp(
        "Is he going to be all right? Please, tell me the truth.",
        t1b,
        "Không ai trên tầng biết khách sẽ ra sao, nên không hứa. Trấn an bằng một việc và một mốc giờ: người sơ cứu tới trong hai phút, và bạn ở lại. 'First aider' /ˌfɜːst ˈeɪdə/.",
        undefined,
        undefined,
        t1a,
      ),
      alsoAccept: [
        "I am not able to say, madam. The first aider will be here in two minutes, and I am staying with you.",
        "I cannot tell you that, madam. The first aider will be here in two minutes, and I am staying with you.",
        "I cannot say, madam. The first aider will be here in two minutes, and I am staying here with you.",
      ],
    }),
    sp(
      "Should I give him some water? His lips are so dry.",
      t1c,
      "Không nước, không thuốc, không đỡ ngồi dậy — kể cả khi người nhà xin. Một câu dừng, rồi một mốc: cho tới khi người sơ cứu đã xem.",
      undefined,
      undefined,
      t1b,
    ),
    {
      ...sp(
        "Operator. Housekeeping on the line — go ahead.",
        "Room 1204: a guest is unresponsive, but he is breathing. Please send the first aider and the Duty Manager.",
        "Tổng đài là đồng nghiệp: không kính ngữ. Số phòng trước, rồi tình trạng, rồi người cần gọi. 'Unresponsive' /ˌʌnrɪˈspɒnsɪv/ — nhấn âm tiết thứ ba.",
        "colleague",
      ),
      alsoAccept: [
        "Room 1204: a guest is unresponsive, but he is breathing. Please send the first aider and the manager on duty.",
      ],
    },
    risk({
      ...sp(
        "I have brought the AED from the lobby. What do I do with it?",
        "Switch the AED on and do exactly what it says. I am doing chest compressions until it is ready.",
        "Đồng nghiệp chạy tới: không kính ngữ. Máy tự quyết có sốc hay không — việc của người cầm máy là bật lên và làm theo lời máy. 'AED' đọc từng chữ cái.",
        "colleague",
      ),
      alsoAccept: [
        "Switch the AED on and do exactly what it tells you. I am doing chest compressions until it is ready.",
        "Turn the AED on and do exactly what it says. I am doing chest compressions until it is ready.",
      ],
    }),
    sp(
      "He has stopped breathing and he is lying on the bed. Why are you pulling him off?",
      "Chest compressions only work on something hard, sir, so I am sliding him onto the floor first.",
      "Ép tim chỉ có tác dụng trên mặt cứng, nên kéo khách xuống sàn trước, một động tác. Nói lý do trong một câu rồi làm. 'Chest compressions' — /kəmˈpreʃnz/, nhấn âm tiết hai.",
    ),
  ],
  reading: read(
    `A GUEST WHO WILL NOT WAKE — CALL, ACT, STAY
Look from the doorway first. Water on the floor, a loose cable or a smell of gas means you do not go in; you call from the corridor.
Call before you do anything else. On an inside line, say the room number first, then one sentence, then whether the guest is breathing.
For example: "Room 1204: a guest is unresponsive, and he is breathing."
Ask for the first aider and the Duty Manager. If nobody answers within thirty seconds, call the operator. A guest who is not breathing does not wait for an inside line: 115 comes first, with the hotel name and street before anything else.
A guest who is breathing but will not wake goes into the recovery position. Turn the head, shoulders and hips together, so the throat stays clear.
A guest who is not breathing needs chest compressions now. Slide him onto the floor first, then push hard and fast until somebody takes over. If an AED arrives, switch it on and do what it says.
Stay. Do not leave to fetch anyone, because that is what the phone is for. Give no water and no medicine, and do not sit the guest up.
Reassure with one action and one time: "The first aider will be here in two minutes." Never say "He will be fine" or "Please stay calm". Nobody on the floor can promise either.
Afterwards, write what you saw and what you did, with the times. Never write what you think was wrong with the guest.
Who is trained on your floor, and where the nearest AED is kept, differ by hotel. Ask your Floor Supervisor this week.`,
    [
      {
        q: "Gọi đường nội bộ báo một vị khách không tỉnh thì nói gì TRƯỚC?",
        options: [
          "Tình trạng của khách, để người nghe biết ngay mức độ khẩn cấp",
          "Số phòng, rồi một câu tình trạng, rồi khách có thở hay không",
          "Tên mình và tên bộ phận mình, để người nghe biết ai đang gọi tới",
        ],
        correct: 1,
        explanation:
          "'say the room number first, then one sentence, then whether the guest is breathing' — số phòng nói trước thì đường dây có rè, người nghe vẫn biết đi đâu.",
      },
      {
        q: "Khách còn thở nhưng gọi, lay đều không tỉnh thì làm gì?",
        options: [
          "Đặt khách nằm nghiêng, đầu, vai và hông xoay cùng lúc",
          "Đỡ khách ngồi dậy, dựa lưng vào thành giường cho dễ thở hơn",
          "Cho khách uống một ngụm nước nhỏ để khách tỉnh lại",
        ],
        correct: 0,
        explanation:
          "'goes into the recovery position. Turn the head, shoulders and hips together' — đỡ ngồi dậy và cho uống nước đều nằm trong danh sách KHÔNG làm.",
      },
      {
        q: "Câu trấn an nào đúng chuẩn của khách sạn?",
        options: [
          "'Chị cứ bình tĩnh, anh ấy sẽ ổn thôi'",
          "'Đừng lo, chuyện này thường không có gì nghiêm trọng đâu'",
          "'Người sơ cứu sẽ tới trong hai phút'",
        ],
        correct: 2,
        explanation:
          "'Reassure with one action and one time' — hai câu kia hứa điều không ai trên tầng biết. Một việc và một mốc giờ là điều bạn nói được mà vẫn đúng.",
      },
    ],
  ),
  game: [
    round(
      1,
      "Should I sit him up against the bed? He looks so uncomfortable lying there.",
      "Please leave him on his side, madam. The first aider will be here in two minutes.",
      "Please leave him on his side, madam. The first aider will be here in two minute.",
      "Yes, let us sit him up together, madam — I am sure he will breathe more easily that way.",
      "Phương án 'let us sit him up… I am sure' làm đúng điều cấm (đỡ ngồi dậy) và hứa thay cho sức khoẻ của khách. Phương án 'two minute' thiếu -s số nhiều sau số đếm. Câu đúng giữ tư thế nằm nghiêng và cho khách một mốc giờ.",
    ),
    round(
      0,
      "Duty Manager here. What have you got in 1204?",
      "A guest is unresponsive but breathing, and he is on his side. The first aider is with him now.",
      "A guest unresponsive but breathing, and he is on his side. The first aider is with him now.",
      "There is a man on the floor up here, and I think it may be his heart, but I cannot be sure of it.",
      "Phương án 'I think it may be his heart' đoán bệnh thay cho người có chuyên môn và không nói khách có thở hay không — điều người nghe cần nhất. Phương án 'A guest unresponsive' thiếu động từ 'is'. Câu đúng báo tình trạng, tư thế và ai đang ở cạnh khách.",
      "manager",
    ),
  ],
});

const lesson2 = L(36, 2, "Sharps, Blood and Broken Glass", "Kim tiêm, máu và mảnh vỡ", {
  vocabulary: [
    c("Sharps box", "A needle goes into the sharps box, never into a bin bag.", [
      "/ˈʃɑːps ˌbɒks/",
      "Hộp cứng đựng kim tiêm và vật sắc nhọn",
      "🧰",
    ]),
    c("Tongs", "Lift a needle with tongs, sharp end down, one at a time.", [
      "/tɒŋz/",
      "Cái kẹp gắp — thứ duy nhất được chạm vào kim tiêm",
      "🥢",
    ]),
    c(
      "Needle injury",
      "A needle injury is seen by a nurse in the same shift, never the next day.",
      ["/ˈniːdl ˌɪndʒəri/", "Bị kim tiêm đâm vào tay", "💉"],
    ),
    c("Biohazard bag", "Linen with blood on it is sealed in a biohazard bag inside the room.", [
      "/ˈbaɪəʊˌhæzəd ˌbæɡ/",
      "Túi niêm phong đồ dính máu hoặc dịch cơ thể",
      "☣️",
    ]),
  ],
  grammar: [
    g(
      "Needle in the bin. I took it out with my hand.",
      "There is a needle in the bin in 610, and I have not touched the bag.",
      "Báo một mối nguy bằng hai vế: thấy gì ở đâu, và mình CHƯA làm gì — vế sau mới là vế người nghe cần. Hiện tại hoàn thành phủ định: have not + phân từ hai (touched).",
      "There is a needle in the bin in 610, and I have not touch the bag.",
    ),
    g(
      "Blood on sheet. I put in the normal laundry.",
      "The sheets are sealed in a biohazard bag, and the bag is labelled.",
      "Bị động 'are + phân từ hai' cho một quy trình: are sealed, is labelled. Người Việt hay bỏ đuôi -ed. Đồ dính máu không bao giờ đi chung với đồ giặt thường.",
      "The sheets are seal in a biohazard bag, and the bag is labelled.",
    ),
  ],
  speaking: [
    sp(
      "Housekeeping desk. You sound out of breath — what has happened?",
      t2a,
      "Chấn thương của chính bạn, nói bằng tiếng Anh khi tay đang run. Ba ý: chuyện gì, đã rửa chưa, đang đi đâu. 'Needle injury' — /ˈniːdl/, âm /iː/ dài.",
      "colleague",
    ),
    risk({
      ...sp(
        "Are you sure? You could finish your section and go after lunch.",
        t2b,
        "Thuốc chặn nhiễm trùng có tác dụng tính bằng giờ, không phải bằng ngày. Từ chối một câu, nêu luật một câu. Đồng nghiệp: không kính ngữ.",
        "colleague",
        undefined,
        t2a,
      ),
      alsoAccept: [
        "No. A needle injury is seen by a nurse in this shift, not later.",
        "No, I cannot wait. A needle injury is seen by a nurse in this shift, not after lunch.",
      ],
    }),
    sp(
      "All right. What do you want me to put in the log?",
      t2c,
      "Bốn thứ của một biên bản: phòng, giờ, vật gì, và đã báo cho ai. Chấn thương không ai ghi lại thì như chưa từng xảy ra.",
      "colleague",
      undefined,
      t2b,
    ),
    {
      ...sp(
        "There is a razor blade loose in the bin. Can you just empty it?",
        "I will not lift that bag by hand, sir. The blade goes into a sharps box, and I am fetching tongs now.",
        "Lưỡi dao trong túi rác xuyên qua nilon như xuyên qua giấy. Mang hộp tới chỗ vật sắc, gắp bằng kẹp. 'Sharps box' — /ʃɑːps/, âm /ʃ/ như chữ s nặng.",
      ),
      alsoAccept: [
        "I am not lifting that bag by hand, sir. The blade goes into a sharps box, and I am fetching tongs now.",
      ],
    },
    sp(
      "There is blood on the sheets in 712. Shall I put them in the linen bag?",
      "No, seal them in a biohazard bag inside the room, and label it before it goes anywhere.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Niêm phong NGAY TRONG PHÒNG, dán nhãn, rồi mới ra hành lang. 'Biohazard' /ˈbaɪəʊˌhæzəd/.",
      "colleague",
    ),
    {
      ...sp(
        "My son is diabetic. Where should he put his used needles?",
        "May I bring you a sharps box this afternoon, madam? Then nothing sharp goes into the bin.",
        "Khách tự nói chuyện sức khoẻ thì đáp đúng việc của tầng: một vật dụng và một mốc giờ. Không bình luận, không hỏi thêm về bệnh.",
      ),
      alsoAccept: [
        "Shall I bring you a sharps box this afternoon, madam? Then nothing sharp goes into the bin.",
      ],
    },
    sp(
      "There is a needle next to some foil and a burnt spoon in 815. What now?",
      "Touch nothing and come out. Call the supervisor from the corridor, and keep the door shut.",
      "Kim tiêm cạnh giấy bạc, thìa cháy hay bột: phòng đó không còn là việc dọn dẹp. Thứ bạn dọn là thứ cảnh sát không còn thấy. Đồng nghiệp: không kính ngữ.",
      "colleague",
    ),
  ],
  reading: read(
    `WHAT YOU NEVER PICK UP BY HAND
A needle, a lancet, a razor blade or a broken ampoule goes into the sharps box. Nothing sharp goes into a bin bag, a pocket or the trolley.
Bring the box to the needle; never carry the needle to the box. Lift it with tongs, sharp end down, one at a time. A glove does not stop a needle.
A needle beside foil, a burnt spoon or a powder is different. Touch nothing, leave the room, and call your supervisor from the corridor. That room is no longer a cleaning job.
Never press down on a bin bag or carry it against your leg. Hold it away from you, by the neck. Most needle injuries happen to the person who empties the bin.
If a needle pricks you, wash it under running water and let it bleed gently. Do not squeeze it. Tell your supervisor the same minute, in these words: "This is a needle injury." A nurse or a doctor sees you in this shift, not tomorrow.
Before you leave the floor, write the room, the time, what pricked you and the name of the person you told.
Broken glass is swept with a brush and pan into a rigid box labelled GLASS. Never put it in a bin bag, because the next hands on that bag are a colleague's.
Blood on linen is sealed inside the room in a biohazard bag and labelled. It never travels loose on a trolley.
Which box, which bag and which nurse your hotel uses are questions for your Executive Housekeeper. Ask in your first week.`,
    [
      {
        q: "Thấy kim tiêm nằm cạnh giấy bạc và một chiếc thìa cháy thì làm gì?",
        options: [
          "Gắp kim bằng kẹp vào hộp vật sắc, rồi dọn tiếp như thường",
          "Không chạm vào gì, ra khỏi phòng, gọi giám sát từ hành lang",
          "Bỏ cả túi rác vào túi niêm phong rồi mang xuống văn phòng tầng",
        ],
        correct: 1,
        explanation:
          "'A needle beside foil, a burnt spoon or a powder is different. Touch nothing, leave the room' — thứ bạn dọn đi là thứ cảnh sát không còn nhìn thấy.",
      },
      {
        q: "Bị kim đâm vào tay, việc ĐẦU TIÊN là gì?",
        options: [
          "Rửa ngay dưới vòi nước chảy, để vết thương chảy máu nhẹ",
          "Bóp mạnh cho máu ra hết rồi dán băng cá nhân lại",
          "Làm nốt phòng đang dở rồi cuối ca mới báo cho giám sát tầng biết",
        ],
        correct: 0,
        explanation:
          "'wash it under running water and let it bleed gently. Do not squeeze it' — rồi báo giám sát ngay, và được y tá khám trong chính ca đó.",
      },
      {
        q: "Mảnh thuỷ tinh vỡ được bỏ vào đâu?",
        options: [
          "Túi rác của phòng, buộc chặt miệng trước khi mang đi",
          "Ngăn dưới của xe đẩy, để riêng khỏi khăn bẩn",
          "Hộp cứng có ghi chữ GLASS",
        ],
        correct: 2,
        explanation:
          "'swept… into a rigid box labelled GLASS. Never put it in a bin bag' — người cầm túi rác tiếp theo là một đồng nghiệp.",
      },
    ],
  ),
  game: [
    round(
      2,
      "I dropped a glass by the bath. Can you just vacuum it up later?",
      "Please keep your shoes on, madam. I am sweeping it into a rigid box now, not into a bag.",
      "Please keep your shoes on, madam. I am sweep it into a rigid box now, not into a bag.",
      "Of course, madam — I will run the vacuum over it later, when I come back to do the room.",
      "Phương án 'run the vacuum over it later' để mảnh vỡ nằm đó trong phòng có khách đi chân trần, và máy hút không gom hết thuỷ tinh. Phương án 'I am sweep' thiếu đuôi -ing của hiện tại tiếp diễn. Câu đúng giữ khách an toàn trước, rồi làm ngay.",
    ),
    round(
      0,
      "I got a tiny needle prick, but it is nothing. I will finish my rooms first.",
      "Please stop and wash it under running water now, and tell the supervisor it is a needle injury.",
      "Wash it under running water now, and tell the supervisor it are a needle injury.",
      "Finish your rooms first, then write it in the log before you go home tonight.",
      "Phương án 'Finish your rooms first' để thuốc phòng nhiễm trùng mất đúng những giờ nó còn tác dụng. Phương án 'it are' sai: chủ ngữ 'it' đi với 'is'. Câu đúng: rửa ngay, báo ngay, gọi đúng tên chấn thương.",
      "colleague",
    ),
  ],
});

// ── Lesson 3 — the alarm and the smell ────────────────────────────────────
const t3a =
  "Please stay in your room with the door closed, madam. I am telephoning Security now, and I will be back here in one minute.";
const t3b =
  "I cannot promise that, madam. I am giving Security your room number, and the fire team moves guests who cannot walk.";
const t3c =
  "Keep the door closed and put a wet towel along the gap, madam. I will stay outside this door.";

// ── Lesson 4 — the storm shift ────────────────────────────────────────────
const t4a =
  "It is a power cut on this floor, madam. I have a torch, and I am telling Engineering now.";
const t4b =
  "I cannot say how long, madam. I will check with Engineering and come back to you in ten minutes.";
const t4c =
  "Please use the stairs until the power is back, madam. My torch can light the way down for you.";

const lesson3 = L(36, 3, "The Alarm and the Smell", "Chuông báo cháy và mùi lạ", {
  vocabulary: [
    c("Fire door", "A fire door only works when it is shut, so it is never wedged open.", [
      "/ˈfaɪə ˌdɔː/",
      "Cửa chống cháy — chỉ có tác dụng khi đóng",
      "🚪",
    ]),
    c("Stairwell", "In an alarm everyone uses the stairwell, and nobody uses the lift.", [
      "/ˈsteəwel/",
      "Lồng cầu thang thoát hiểm",
      "🪜",
    ]),
    c("Assembly point", "Know your assembly point before your first shift, and say it aloud.", [
      "/əˈsembli ˌpɔɪnt/",
      "Điểm tập kết khi sơ tán",
      "📍",
    ]),
    c("Gas smell", "A gas smell means no switch, no phone and no radio on that floor.", [
      "/ˈɡæs ˌsmel/",
      "Mùi gas — loại mùi duy nhất KHÔNG đóng cửa lại",
      "🧯",
    ]),
    c("Burning smell", "A burning smell means everyone out and the door closed behind you.", [
      "/ˈbɜːnɪŋ ˌsmel/",
      "Mùi khét, mùi cháy",
      "🔥",
    ]),
  ],
  grammar: [
    g(
      "Fire! Go, go! Take the lift!",
      "Please leave by the stairs, madam — the lifts stop when the alarm sounds.",
      "Hướng dẫn khẩn: một việc ('leave by the stairs') + một lý do ngắn. Chủ ngữ số nhiều 'the lifts' đi với động từ không -s: stop.",
      "Please leave by the stairs, madam — the lifts stops when the alarm sounds.",
    ),
    g(
      "Gas smell? I open the window for you.",
      "Please touch nothing, sir, and walk out with me now.",
      "Hai mệnh lệnh nối bằng 'and' cùng ở dạng nguyên mẫu: touch… and walk. Với mùi gas, một tay nắm cửa sổ hay một công tắc cũng có thể tạo tia lửa.",
      "Please touch nothing, sir, and walking out with me now.",
    ),
  ],
  speaking: [
    sp(
      "I use a wheelchair, and the lifts have stopped. I cannot do eleven floors.",
      t3a,
      "Khách không đi cầu thang được thì KHÔNG vào lồng cầu thang — đó là lối thoát của mọi tầng phía trên. Một việc bạn đang làm và một mốc giờ bạn tự giữ: quay lại sau một phút.",
    ),
    risk({
      ...sp(
        "Will someone come for me? You have to promise me.",
        t3b,
        "Không hứa an toàn — bạn không biết đám cháy ở tầng nào. Nói việc bạn ĐANG làm, và ai là người đưa khách xuống. Số phòng đi qua điện thoại tầng, không qua bộ đàm.",
        undefined,
        undefined,
        t3a,
      ),
      alsoAccept: [
        "I am not able to promise that, madam. I am giving Security your room number, and the fire team moves guests who cannot walk.",
        "I cannot promise that, madam, but I am giving Security your room number, and the fire team moves guests who cannot walk.",
      ],
    }),
    sp(
      "And what should I do while I wait here?",
      t3c,
      "Hai việc cụ thể cho khách tự làm: cửa đóng, khăn ướt chèn khe. Rồi việc của bạn: đứng ngoài cửa cho tới khi An ninh hoặc đội cứu hoả tới.",
      undefined,
      undefined,
      t3b,
    ),
    sp(
      "Security. The panel shows your floor. What can you smell up there?",
      "A burning smell outside 1104, not a gas smell. The fire door is closed, and the corridor is clear.",
      "An ninh là đồng nghiệp: không kính ngữ. Gọi ĐÚNG tên mùi — hai mùi dẫn tới hai đội khác nhau — rồi báo việc mình đã làm. 'Burning smell' /ˈbɜːnɪŋ/.",
      "colleague",
    ),
    risk({
      ...sp(
        "Something smells like gas in here. Shall I open the window?",
        "Please step outside with me now, sir. Do not touch the window or the lights.",
        "Mùi gas: không cửa sổ, không công tắc, không điện thoại trong phòng — một tia lửa là đủ. 'Step outside' rồi mới gọi, từ lồng cầu thang. Cửa phòng để nguyên như lúc thấy.",
      ),
      alsoAccept: [
        "Please step outside with me now, sir. Please do not touch the window or the lights.",
        "Please come out with me now, sir. Do not touch the window or the lights.",
      ],
    }),
    sp(
      "The alarm is ringing! Hold the lift for me, please!",
      "The lifts stop in an alarm, madam. The stairwell is on your left, and I can walk down with you.",
      "Nói sự thật về thang máy, rồi chỉ đường và đề nghị đi cùng. 'Stairwell' /ˈsteəwel/ — không có âm r.",
    ),
    {
      ...sp(
        "My laptop is still in the room. Give me two minutes to get it.",
        "Nobody goes back in, sir. Please come with me to the assembly point now.",
        "Không ai quay lại lấy đồ, kể cả nhân viên. Một câu luật, một câu mời đi cùng. 'Assembly point' /əˈsembli/ — nhấn âm tiết hai.",
      ),
      alsoAccept: ["Nobody goes back inside, sir. Please come with me to the assembly point now."],
    },
  ],
  reading: read(
    `TWO SMELLS AND ONE ALARM
Before an alarm there is often a smell. Report it before you look for the cause; finding the cause is Engineering's work.
A burning smell: get everyone out of the room and close the door behind you. It is a fire door, and it only works shut. Then call the operator from the corridor with the room number and the word "burning".
A gas smell is the other way round. Get everyone out and leave the door exactly as you found it. Touch no switch, no light, no telephone and no radio on that floor, because each one can make a spark. Call from the stairwell, and nobody goes back in until Engineering says so.
When the alarm sounds, you are a guide, not a searcher. Knock, call "Housekeeping — please leave by the stairs", and move on. The lifts stop, and nobody goes back for a bag or a phone. Never reset or silence the fire panel.
A guest who cannot manage the stairs does not wait in the stairwell. It is the escape route for every floor above. If your corridor is clear, the guest stays in the room with the door closed and a wet towel along the gap.
Give Security three things: the floor, "cannot walk", and the state of the corridor. The room number goes on the floor phone, never on the radio.
Never promise that guest a rescue time. Promise what you are doing, and stay at that door until Security or the fire team reaches you.
At the assembly point, hand the floor keys to Security or the Duty Manager, and say whom you gave them to.`,
    [
      {
        q: "Ngửi thấy mùi khét ở một phòng thì cửa phòng xử lý thế nào?",
        options: [
          "Để nguyên như lúc mình thấy, không chạm vào",
          "Đóng lại sau lưng khi mọi người đã ra",
          "Mở toang ra cho khói thoát ra hành lang",
        ],
        correct: 1,
        explanation:
          "'A burning smell: get everyone out… and close the door behind you. It is a fire door, and it only works shut' — để nguyên cửa là luật của mùi GAS, không phải mùi khét.",
      },
      {
        q: "Ngửi thấy mùi gas thì gọi điện từ đâu?",
        options: [
          "Từ điện thoại ngay trong phòng đó, vì đó là cách gọi nhanh nhất",
          "Từ lồng cầu thang, không dùng thứ gì trên tầng đó",
          "Từ bộ đàm, để cả tầng cùng nghe và cùng ra ngoài",
        ],
        correct: 1,
        explanation:
          "'Touch no switch, no light, no telephone and no radio on that floor… Call from the stairwell' — điện thoại và bộ đàm đều có thể tạo tia lửa.",
      },
      {
        q: "Khách ngồi xe lăn, hành lang tầng mình không có khói. Khách chờ ở đâu?",
        options: [
          "Trong phòng, cửa đóng, khăn ướt chèn khe cửa",
          "Ở chiếu nghỉ cầu thang, chờ đội cứu hoả lên đón",
          "Trong thang máy, vì khách không đi cầu thang bộ được",
        ],
        correct: 0,
        explanation:
          "'does not wait in the stairwell. It is the escape route for every floor above… stays in the room with the door closed' — và bạn đứng ngoài cửa đó.",
      },
    ],
  ),
  game: [
    round(
      1,
      "Is this a real fire, or just another drill? I am in the bath.",
      "We treat every alarm as real, sir. Please leave by the stairwell on your left now.",
      "We treats every alarm as real, sir. Please leave by the stairwell on your left now.",
      "It is almost certainly a drill, sir — they test it most months, so please take your time.",
      "Phương án 'almost certainly a drill… take your time' đoán thay cho tủ báo cháy và giữ khách lại trong phòng. Phương án 'We treats' sai chia động từ: chủ ngữ 'we' không thêm -s. Câu đúng coi mọi chuông là thật và chỉ đường thoát.",
    ),
    round(
      2,
      "Duty Manager here. Is anyone still up on eleven?",
      "One guest who cannot walk is in 1104, with the door closed. Here are the floor keys.",
      "One guest who cannot walk are in 1104, with the door closed. Here are the floor keys.",
      "I think everybody got out, but I did not have time to knock on every door, so I came down.",
      "Phương án 'I think everybody got out' báo một điều mình không biết, và giấu đúng thông tin đội cứu hoả cần. Phương án 'One guest… are' sai: chủ ngữ số ít đi với 'is'. Câu đúng nói ai còn ở đâu, trong tình trạng nào, rồi giao chìa tầng.",
      "manager",
    ),
  ],
});

const lesson4 = L(36, 4, "The Storm Shift", "Ca trực ngày bão", {
  vocabulary: [
    c("Typhoon", "Before a typhoon, every balcony is cleared and every balcony door is latched.", [
      "/taɪˈfuːn/",
      "Bão lớn",
      "🌀",
    ]),
    c(
      "Burst pipe",
      "A burst pipe belongs to Engineering, but the room below it is yours to check.",
      ["/ˌbɜːst ˈpaɪp/", "Ống nước bị vỡ", "🚰"],
    ),
    c("Power cut", "In a power cut, guests use the stairs and nobody waits for the lift.", [
      "/ˈpaʊə ˌkʌt/",
      "Mất điện",
      "🔌",
    ]),
    c("Torch", "Check the torch on your trolley at the start of every shift.", [
      "/tɔːtʃ/",
      "Đèn pin",
      "🔦",
    ]),
  ],
  grammar: [
    g(
      "Storm coming. Maybe your balcony door breaks tonight.",
      "May I bring your balcony chairs inside, sir? A typhoon is expected this evening.",
      "Hỏi xin làm một việc cụ thể, rồi nêu lý do bằng bị động 'is expected' — giữ đuôi -ed. Không doạ khách bằng điều có thể xảy ra.",
      "May I bring your balcony chairs inside, sir? A typhoon is expect this evening.",
    ),
    g(
      "Water everywhere in 704. Not my job — call Engineering.",
      "There is a burst pipe above 704, and I am checking the room below it now.",
      "'There is' + danh từ số ít (a burst pipe). Báo theo hướng nước chảy: nguồn trước, rồi việc của mình — phòng bên dưới.",
      "There are a burst pipe above 704, and I am checking the room below it now.",
    ),
  ],
  speaking: [
    sp(
      "The lights have all gone out. What is happening?",
      t4a,
      "Nói đúng sự việc, rồi hai điều bạn giữ được: có đèn pin, và đang báo Kỹ thuật. Không hứa 'sắp có điện lại'. 'Torch' /tɔːtʃ/ — âm /tʃ/ cuối.",
    ),
    {
      ...sp(
        "How long will it last? I have a video call at eight.",
        t4b,
        "Không hứa giờ thay bộ phận Kỹ thuật. Hứa việc của mình: hỏi họ, và quay lại sau một mốc giờ. 'Check with' — nối liền hai từ.",
        undefined,
        undefined,
        t4a,
      ),
      alsoAccept: [
        "I am not able to say how long, madam. I will check with Engineering and come back to you in ten minutes.",
      ],
    },
    sp(
      "Thank you. Can I use the lift in the meantime?",
      t4c,
      "Mất điện thì đi cầu thang, rồi một đề nghị nhỏ bạn làm được ngay: soi đường bằng đèn pin.",
      undefined,
      undefined,
      t4b,
    ),
    sp(
      "Engineering. What have you got on seven?",
      "A burst pipe above 704, and water is coming through the ceiling of 604. I am checking 604 now.",
      "Kỹ thuật là đồng nghiệp: không kính ngữ. Báo theo hướng nước chảy — nguồn trước, hậu quả sau — rồi việc của mình. 'Burst pipe' /ˌbɜːst ˈpaɪp/.",
      "colleague",
    ),
    {
      ...sp(
        "It is only a plastic chair. Can it not stay out on the balcony?",
        "In a typhoon it can go through a window below, sir. May I bring it inside now?",
        "Một lý do an toàn ngắn, rồi xin phép làm ngay. 'Typhoon' /taɪˈfuːn/ — nhấn âm tiết hai.",
      ),
      alsoAccept: [
        "In a typhoon it can go through a window below, sir. Shall I bring it inside now?",
      ],
    },
    risk({
      ...sp(
        "The window has just cracked! My passport is on the desk!",
        "Please come out to the corridor with me now, sir. Nobody goes back in until Engineering says so.",
        "Kính vỡ khi khách còn trong phòng: khách ra trước, đóng cửa, không ai quay lại lấy đồ — kể cả hộ chiếu. Đồ giá trị bạn cũng không tự đi lấy.",
      ),
      alsoAccept: [
        "Please come out to the corridor with me now, sir. Nobody goes back inside until Engineering says so.",
        "Please come out to the corridor with me, sir. Nobody goes back in until Engineering says so.",
      ],
    }),
    {
      ...sp(
        "Water is coming in under the door, and our bags are on the floor!",
        "May I lift your bags onto the bed now, madam? I will photograph them first, so you know where everything was.",
        "Di chuyển đồ của khách lên cao, trước mặt khách, là việc của bạn. Chụp ảnh trước bằng máy của bộ phận. 'Photograph' /ˈfəʊtəɡrɑːf/.",
      ),
      alsoAccept: [
        "Shall I lift your bags onto the bed now, madam? I will photograph them first, so you know where everything was.",
      ],
    },
  ],
  reading: read(
    `THE STORM SHIFT — BEFORE THE WIND, AND DURING IT
Balconies come first, on every floor: chairs, tables, plant pots and drying racks. In a typhoon, a plastic chair is something that goes through a window below.
Clear the balconies before the alert level your hotel names, never after the wind is up. Never work on a balcony alone, and never with the balcony door shut behind you.
Then the doors and curtains. Balcony doors are latched, not just closed. Curtains are drawn, because glass that breaks into a curtain stays in the curtain.
Every trolley carries a torch, checked at the start of the shift. In a power cut, you are the light on your floor, and guests use the stairs.
Water belongs to Engineering, and so does power. Never touch a switch, a socket or a plug in a wet room. A burst pipe is reported first, and then you check the room below it.
Before you leave a wet floor for one second, the wet floor sign goes down.
Moving a guest's bags away from water is yours to do, in front of the guest. If the guest is out, ask for a second person on the same call. Photograph the bags first, and write down what was moved and where.
If glass breaks while a guest is inside, get the guest into the corridor first and close the door. Nobody goes back in for a bag.
Never promise anything about the weather, the airport or the roads. That belongs to the front desk and the Duty Manager, and it changes every hour.`,
    [
      {
        q: "Trước khi bão tới, việc đầu tiên trên tầng là gì?",
        options: [
          "Dọn bàn ghế ngoài ban công vào trong",
          "Kiểm tra lại đèn pin trên xe đẩy của từng người trong tổ",
          "Kê toàn bộ hành lý của khách lên mặt giường cho khỏi ướt",
        ],
        correct: 0,
        explanation:
          "'Balconies come first, on every floor' — một chiếc ghế nhựa trong bão là thứ bay xuyên qua cửa kính tầng dưới.",
      },
      {
        q: "Ống nước vỡ phía trên phòng 704. Sau khi báo Kỹ thuật, kiểm tra phòng nào?",
        options: ["Phòng bên cạnh 704", "Phòng ngay bên dưới", "Phòng ở tầng trên cùng"],
        correct: 1,
        explanation:
          "'A burst pipe is reported first, and then you check the room below it' — nước chảy xuống, và phòng bên dưới thường có khách mà không ai báo.",
      },
      {
        q: "Kính cửa sổ vỡ khi khách đang ở trong phòng thì sao?",
        options: [
          "Lấy hộ chiếu trên bàn cho khách rồi mới cùng ra ngoài",
          "Kéo rèm che kín lại rồi để khách tự quyết có ra ngoài hay không",
          "Đưa khách ra hành lang, đóng cửa, không ai quay lại lấy đồ",
        ],
        correct: 2,
        explanation:
          "'get the guest into the corridor first and close the door. Nobody goes back in for a bag' — kể cả hộ chiếu, và kể cả bạn.",
      },
    ],
  ),
  game: [
    round(
      0,
      "Water is running down the wall. Can you unplug the lamp and mop it up?",
      "Please step away from that wall with me, madam. I am calling Engineering, and nobody touches the sockets.",
      "Please step away from that wall with me, madam. I am calling Engineering, and nobody touch the sockets.",
      "Of course, madam — I will unplug the lamp by the wall first, and then I will mop up as much water as I can reach.",
      "Phương án 'unplug the lamp… mop up' chạm vào điện trong một căn phòng ướt — điện là việc của Kỹ thuật. Phương án 'nobody touch' sai: 'nobody' là chủ ngữ số ít, cần 'touches'. Câu đúng đưa khách tránh xa trước rồi gọi đúng đội.",
    ),
    round(
      1,
      "Will the airport close tomorrow? What have you heard?",
      "I could not say, sir. May I ask the front desk to call your room with any news?",
      "I could not say, sir. May I asking the front desk to call your room with any news?",
      "It usually closes in a storm like this, sir, so I would expect your flight to be cancelled.",
      "Phương án 'I would expect your flight to be cancelled' đoán thay cho sân bay — khách có thể đổi cả kế hoạch vì một câu đoán. Phương án 'May I asking' sai: sau 'may I' là động từ nguyên mẫu. Câu đúng không đoán và chuyển cho quầy lễ tân.",
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: xử lý một ca khẩn trên tầng bằng câu 'một việc + một mốc giờ' — gọi sơ cứu và báo số phòng trước, đặt khách thở mà không tỉnh nằm nghiêng, ép tim và bật AED khi khách ngừng thở; xử lý kim tiêm, máu, mảnh vỡ và báo chấn thương kim đâm ngay trong ca; phân biệt mùi khét với mùi gas khi có chuông báo cháy; giữ an toàn ngày bão và mất điện — không hứa an toàn, không đoán thời tiết.",
};
