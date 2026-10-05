// HK week 40 — One Shift, Every Skill (see ../kit.ts).
//
// The review-and-test week teaches no new rule. It follows one attendant
// through one shift on the ninth floor — the morning rooms, a dispute at
// midday, the afternoon's surprises, the last minutes before three — and
// every turn is a real moment of that shift calling on a skill an earlier
// week taught: a preference served from what the guest said, laundry counted
// before it leaves, a suitcase damaged in the corridor, a guest down in the
// bathroom, a set-up on a cue, a trade with a colleague, a ring found after
// checkout, an envelope refused, a key signed in.
//
// Nothing here talks about a course or a test, and the readings are scenes
// from the shift, not a summary. The cards re-present headwords from weeks
// 31-39, each with a new sentence from this shift (the kit brings back the
// original gloss). The old week's suitcase reply had no apology in it; here
// the guest hears "I am so sorry" before anything else, and the decision on
// a guest's property that is not laundry is the Duty Manager's from the
// start, as the phase has always said.
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

// ── Lesson 1 — the morning rooms ──────────────────────────────────────────
const t1a =
  "I am sorry, madam. Based on what you said, your room will be scent-free from this morning.";
const t1b = "It goes on your guest profile now, madam, so nobody sprays anything in here again.";
const t1c = "Of course, madam. It is before the cut-off time, so they will be back this evening.";

// ── Lesson 2 — midday: when something goes wrong ─────────────────────────
const t2a = "I am so sorry, sir. May I photograph it now, before anything is moved?";
const t2b = "I cannot decide that, sir. I am calling the Duty Manager to you now.";
const t2c =
  "I will ask the Duty Manager to put her answer in writing, sir, and I am grateful you told me at once.";

const lesson1 = L(40, 1, "The Morning Rooms", "Những phòng buổi sáng", {
  vocabulary: [
    c("Based on", "Based on what the guest said at the door, the room is scent-free today."),
    c("Scent-free", "A scent-free room gets no spray at all, not even a little."),
    c(
      "Guest profile",
      "The first thing on the floor each morning is the guest profile, not the trolley.",
    ),
    c("Inspect", "I inspect the shirts with the guest at the door, before the bag is closed."),
    c("Cut-off time", "Laundry handed over before the cut-off time comes back the same evening."),
  ],
  grammar: [
    g(
      "Housekeeping! Open the door!",
      "Good morning, housekeeping. May I service your room now, or would later suit you?",
      "Chào, xưng bộ phận, rồi hỏi bằng hai lựa chọn để khách quyết giờ. Sau 'may I' là động từ nguyên mẫu: may I service.",
      "Good morning, housekeeping. May I servicing your room now, or would later suit you?",
    ),
    g(
      "Iron? Downstairs. I am busy.",
      "I will bring an iron and a board within ten minutes, madam.",
      "Một món đồ, một mốc giờ bạn tự giữ. Sau số lớn hơn một, danh từ đếm được có -s: ten minutes.",
      "I will bring an iron and a board within ten minute, madam.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "Good morning. Before you start — the room smelt of perfume last night.",
        t1a,
        "Xin lỗi một câu, rồi đổi ngay trong ngày, dựa đúng vào điều khách vừa nói. 'Based on' /ˈbeɪst ɒn/ — giữ âm /t/ của -ed.",
      ),
      alsoAccept: [
        "I am so sorry, madam. Based on what you said, your room will be scent-free from this morning.",
      ],
    },
    sp(
      "Will the next attendant know, or will I have to say it all again?",
      t1b,
      "Hồ sơ khách đi theo người, nên khách không phải nhắc lần hai. 'Guest profile' /ˈprəʊfaɪl/ — nhấn âm tiết đầu.",
      undefined,
      undefined,
      t1a,
    ),
    sp(
      "Thank you. Oh, and my husband has two shirts for the laundry.",
      t1c,
      "Trước giờ chót thì nói luôn giờ trả. 'Cut-off time' — nhấn ở chữ cut. Rồi vẫn kiểm đồ cùng khách trước khi mang đi.",
      undefined,
      undefined,
      t1b,
    ),
    {
      ...sp(
        "Just take the bag. I have no time to count shirts this morning.",
        "May I inspect them with you first, sir? It takes one minute, and it protects you as well.",
        "Không bỏ bước kiểm cùng khách, kể cả khi khách vội. 'Inspect' /ɪnˈspekt/ — nhấn âm tiết hai.",
      ),
      alsoAccept: [
        "Could I inspect them with you first, sir? It takes one minute, and it protects you as well.",
      ],
    },
    sp(
      "The guest in 1104 wants her room after two from now on. Where do I note it?",
      "On her guest profile, as her service window, so the late shift sees it as well.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Khung giờ của khách nằm ở hồ sơ khách, không nằm trong đầu một người.",
      "colleague",
    ),
    risk({
      ...sp(
        "Leave the safe open while you clean. I need my passport in a minute.",
        "I would rather clean when the safe is closed, sir. May I come back in ten minutes?",
        "Két mở thì không làm phòng xung quanh nó, kể cả khi khách tin bạn. Đề nghị quay lại, có mốc giờ. Đồ giá trị không qua tay bạn.",
      ),
      alsoAccept: [
        "I would prefer to clean when the safe is closed, sir. May I come back in ten minutes?",
        "I would rather clean when the safe is closed, sir. Could I come back in ten minutes?",
      ],
    }),
  ],
  reading: read(
    `SEVEN O'CLOCK ON THE NINTH FLOOR
Linh starts her shift with the guest profiles, not the trolley. Two lines matter today: 1104 wants service after two, and 1108 has a feather allergy.
At 905 she knocks twice and announces herself. The guest opens the door and says the room smelt of perfume last night. Linh apologises once, marks the room scent-free on the guest profile, and uses no spray at all.
At 907 a guest holds out a laundry bag and says he has no time to count. Linh counts the shirts with him anyway, notes a small stain on one collar, and asks him to sign the list. It is twenty to ten, before the cut-off time, so the shirts come back the same evening.
At 912 the safe stands open and the guest asks her to clean around it. Linh does not. She offers to come back in ten minutes, once the safe is closed, and writes the time on her room report.
By ten, four rooms are done and nothing on the profiles has been missed. None of it was fast; all of it was written down.`,
    [
      {
        q: "Khách phòng 905 nói phòng có mùi nước hoa. Linh làm gì?",
        options: [
          "Xin lỗi, ghi phòng không mùi vào hồ sơ khách, và không xịt gì",
          "Xịt ít hơn mọi ngày, rồi chờ xem hôm sau khách còn phàn nàn nữa không",
          "Giải thích rằng đó là mùi hương riêng làm cho khách sạn mình",
        ],
        correct: 0,
        explanation:
          "'marks the room scent-free on the guest profile, and uses no spray at all' — đổi ngay trong ngày, và ghi để người sau không phải hỏi lại.",
      },
      {
        q: "Két sắt phòng 912 đang mở, khách bảo cứ dọn. Linh làm gì?",
        options: [
          "Dọn xung quanh két thật cẩn thận, không nhìn vào bên trong",
          "Tự đóng két lại cho khách rồi bắt đầu dọn phòng",
          "Đề nghị quay lại sau mười phút, khi két đã đóng",
        ],
        correct: 2,
        explanation:
          "'offers to come back in ten minutes, once the safe is closed' — đồ giá trị không qua tay nhân viên, và két không phải của nhân viên đóng.",
      },
    ],
  ),
  game: [
    round(
      1,
      "Can you clean around the safe? It is open, but I trust you completely.",
      "Thank you, sir, but may I come back once the safe is closed? It takes you five seconds.",
      "Thank you, sir, but may I coming back once the safe is closed? It takes you five seconds.",
      "Of course, sir — I will be very careful, and I will not even look inside it while I clean.",
      "Phương án 'I will be very careful' làm phòng bên cạnh một két mở — nếu có gì mất, không ai chứng minh được gì. Phương án 'may I coming' sai: sau 'may I' là động từ nguyên mẫu. Câu đúng cảm ơn lòng tin của khách và giữ luật.",
    ),
    round(
      0,
      "The lady in 905 says the room smelt of perfume. Should I just spray less?",
      "No, none at all. It goes on her profile as scent-free, from today.",
      "No, none at all. It go on her profile as scent-free, from today.",
      "Yes, just spray a little less — guests usually stop noticing it after the first night.",
      "Phương án 'spray a little less' bỏ qua đúng điều khách nói và coi nhẹ chuyện sức khoẻ. Phương án 'It go' sai chia động từ: chủ ngữ 'it' cần 'goes'. Câu đúng làm phòng không mùi và ghi vào hồ sơ.",
      "colleague",
    ),
  ],
});

const lesson2 = L(40, 2, "Midday: When Something Goes Wrong", "Giữa ca: khi có sự cố", {
  vocabulary: [
    c("Photograph", "I photograph a damaged case where it stands, before anyone moves it."),
    c("In writing", "The Duty Manager's answer reaches the guest in writing, with her name on it."),
    c(
      "Grateful",
      "I am grateful when a guest tells me straight away, because the facts are still fresh.",
    ),
    c("Folio", "Only the front desk corrects a mistake on a guest's folio."),
    c("Restock list", "The restock list shows the time of every minibar check."),
  ],
  grammar: [
    g(
      "Suitcase cracked? It was on the floor. Not my fault.",
      "I am so sorry about your suitcase, sir. May I photograph it now for the Duty Manager?",
      "Xin lỗi về điều khách gặp trước tiên, không cãi lỗi. Sau 'may I' là động từ nguyên mẫu: may I photograph.",
      "I am so sorry about your suitcase, sir. May I photographing it now for the Duty Manager?",
    ),
    g(
      "Smoking? OK, I say nothing. Our secret.",
      "I am sorry, sir, but smoking in this room is something I must report today.",
      "Không giữ bí mật hộ khách điều phải báo. Sau động từ khuyết thiếu 'must' là động từ nguyên mẫu: must report.",
      "I am sorry, sir, but smoking in this room is something I must reporting today.",
    ),
  ],
  speaking: [
    sp(
      "Your trolley has just cracked my suitcase. Look at this!",
      t2a,
      "Lời xin lỗi đi TRƯỚC mọi thứ khác. Rồi một việc bạn làm ngay: chụp ảnh tại chỗ, trước khi ai di chuyển chiếc vali. 'Photograph' — nhấn âm tiết đầu.",
    ),
    risk({
      ...sp(
        "I want it replaced today. Who is paying for this?",
        t2b,
        "Đồ của khách không phải đồ giặt là việc của Duty Manager ngay từ đầu. Không hứa, không tranh luận: nói thật một câu và gọi người có quyền NGAY.",
        undefined,
        undefined,
        t2a,
      ),
      alsoAccept: [
        "I am not able to decide that, sir. I am calling the Duty Manager to you now.",
        "I cannot decide that, sir. I am calling the manager on duty to you now.",
      ],
    }),
    sp(
      "And will I get that in writing?",
      t2c,
      "Không hứa thay Duty Manager một con số hay một giờ; hứa việc của mình là xin câu trả lời bằng văn bản. Rồi một lời cảm ơn: 'grateful' /ˈɡreɪtfl/.",
      undefined,
      undefined,
      t2b,
    ),
    sp(
      "1205 says the minibar charge is wrong. Can you take it off?",
      "No. The front desk corrects the folio, and I am taking my restock list to them now.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Tầng ghi nhận, quầy sửa hoá đơn. 'Folio' /ˈfəʊliəʊ/ — ba âm tiết.",
      "colleague",
    ),
    risk({
      ...sp(
        "Please do not tell anyone I smoked in here, all right?",
        "I am sorry, sir, I cannot promise that. Smoking in this room is reported to my supervisor today.",
        "Không giữ bí mật hộ khách điều phải báo, cũng không doạ phạt tiền — khoản phạt là việc của người khác. Nói thật một câu, nhẹ nhàng.",
      ),
      alsoAccept: [
        "I am sorry, sir, I am not able to promise that. Smoking in this room is reported to my supervisor today.",
        "I am afraid I cannot promise that, sir. Smoking in this room is reported to my supervisor today.",
      ],
    }),
    sp(
      "Ms Lan here. What happened with the suitcase in 1408?",
      "My trolley touched it in the corridor, Ms Lan. I have the photographs, and the Duty Manager is with the guest.",
      "Báo cấp trên bằng sự việc, kể cả khi đó là xe đẩy của chính mình — nói thẳng, ngay trong ca. Gọi tên một lần, không kính ngữ.",
      "manager",
    ),
  ],
  reading: read(
    `TWELVE O'CLOCK, AND A CRACKED SUITCASE
At noon Linh turns her trolley in the corridor, and its corner catches a suitcase standing outside 1408. The guest comes out as the case tips over, and a long crack runs down its side.
Linh's first words are an apology: "I am so sorry, sir." Her second are a request to photograph the case where it stands, before anybody moves it.
The guest wants it replaced today and asks who is paying. A guest's property that is not laundry is the Duty Manager's to decide, from the very first dong, so Linh promises nothing. She calls the Duty Manager to the corridor and stays with the guest until the manager arrives.
When her supervisor asks what happened, Linh does not soften it. "My trolley touched it in the corridor." She says it plainly, the same hour, and writes it on her room report with the time and the photographs.
Later the guest in 1203 asks her to keep his cigarettes a secret. She does not argue and she does not threaten. She tells him gently that it will be reported, and then she reports it to her supervisor.
A mistake reported at once is a mistake. One that somebody else finds is a different story.`,
    [
      {
        q: "Xe đẩy làm nứt vali của khách. Câu đầu tiên Linh nói là gì?",
        options: [
          "Một lời xin lỗi",
          "Rằng vali đã đặt sai chỗ, giữa hành lang",
          "Rằng khách sạn sẽ mua cho khách một chiếc vali mới",
        ],
        correct: 0,
        explanation:
          "'Linh's first words are an apology' — rồi mới tới việc chụp ảnh tại chỗ. Không cãi lỗi, không hứa tiền.",
      },
      {
        q: "Ai quyết chuyện bồi thường chiếc vali?",
        options: [
          "Giám sát tầng, nếu số tiền còn dưới hạn mức của chị ấy",
          "Duty Manager, ngay từ đầu, vì vali không phải đồ giặt là",
          "Chính nhân viên đã làm nứt vali, vì người đó biết rõ nhất",
        ],
        correct: 1,
        explanation:
          "'A guest's property that is not laundry is the Duty Manager's to decide, from the very first dong' — nên Linh không hứa gì và gọi Duty Manager.",
      },
      {
        q: "Vì sao Linh nói thẳng với giám sát rằng xe đẩy của mình làm nứt vali?",
        options: [
          "Vì sai sót báo ngay trong ca vẫn chỉ là một sai sót",
          "Vì đằng nào khách cũng sẽ kể lại với giám sát",
          "Vì camera hành lang đã ghi lại toàn bộ sự việc từ trước",
        ],
        correct: 0,
        explanation:
          "'A mistake reported at once is a mistake. One that somebody else finds is a different story' — báo thẳng, cùng giờ, có ảnh và có ghi chép.",
      },
    ],
  ),
  game: [
    round(
      2,
      "Your trolley cracked my case. You will pay for it, won't you?",
      "I am so sorry about your case, sir. I cannot decide that, but I am calling the Duty Manager to you now.",
      "I am so sorry, sir. I cannot decides that, but I am calling the Duty Manager to you now.",
      "Of course, sir — it was clearly our trolley, so the hotel will buy you a new one today.",
      "Phương án 'the hotel will buy you a new one' hứa tiền thay Duty Manager. Phương án 'cannot decides' sai: sau 'cannot' là động từ nguyên mẫu. Câu đúng xin lỗi trước, rồi gọi đúng người quyết.",
    ),
    round(
      1,
      "Ms Lan here. Did you tell the guest in 1408 that we will replace his case?",
      "No, Ms Lan. I apologised, took photographs of the case and called the Duty Manager to him.",
      "No, Ms Lan. I apologised, take photographs and called the Duty Manager.",
      "Yes, madam — he was very angry, so I promised him a new one to calm him down.",
      "Phương án 'I promised him a new one' hứa thay Duty Manager và gọi cấp trên là 'madam'. Phương án 'take photographs' sai thì: ba việc đã xảy ra đều ở quá khứ (took). Câu đúng tường thuật đúng ba việc đã làm.",
      "manager",
    ),
  ],
});

// ── Lesson 3 — the afternoon ──────────────────────────────────────────────
const t3a =
  "Please do not lift him, madam. I am calling our first aider now, and I am staying with you.";
const t3b =
  "The first aider is on her way, madam — two minutes. May I bring a towel to keep him warm?";
const t3c =
  "I cannot say why yet, madam. I will ask the Duty Manager to speak with you once he has been seen.";

// ── Lesson 4 — the end of the shift ───────────────────────────────────────
const t4a = "1207 has had no entry for two days in a row, Ms Lan, and nobody answers the phone.";
const t4b =
  "A gold ring under the bed in 1210, after checkout. It is sealed, signed by two of us, and logged.";
const t4c =
  "One thing face to face: the guest in 1115 made me uneasy, so I did not go back in alone.";

const lesson3 = L(40, 3, "The Afternoon", "Buổi chiều", {
  vocabulary: [
    c(
      "First aider",
      "When a guest falls, the first aider is the first call, before anyone lifts anything.",
    ),
    c("As long as", "Petals can be ready by six, as long as the room is empty by half past five."),
    c("Cue", "The desk gives me the cue the moment the couple leave the lobby."),
    c("What if", "What if I took your checkout now and you took my turndown list tonight?"),
  ],
  grammar: [
    g(
      "I lift you up, sir. One, two, three!",
      "I am not allowed to lift you, sir, so please stay still until the first aider comes.",
      "Khách ngã mà còn tỉnh: không nâng, không đỡ dậy. Bị động 'am not allowed' — giữ đuôi -ed. Một việc cho khách làm và một mốc: tới khi người sơ cứu tới.",
      "I am not allow to lift you, sir, so please stay still until the first aider comes.",
    ),
    g(
      "Petals by six? Sure, no matter what.",
      "Yes, as long as the room is empty by half past five.",
      "Nhận lời có điều kiện: 'as long as' + hiện tại đơn, không dùng 'will' trong vế điều kiện. Dựng phòng chỉ bắt đầu khi phòng trống.",
      "Yes, as long as the room will be empty by half past five.",
    ),
  ],
  speaking: [
    sp(
      "My husband slipped in the shower. He is awake, but he cannot get up.",
      t3a,
      "Khách ngã: không nâng, gọi người sơ cứu, ở lại — nói đúng ba việc đó, theo thứ tự. 'First aider' /ˌfɜːst ˈeɪdə/.",
    ),
    sp(
      "He is in a lot of pain. When will someone come?",
      t3b,
      "Một việc và một mốc giờ: người sơ cứu đang tới, hai phút. Rồi một việc nhỏ bạn làm được ngay: một chiếc khăn cho ấm.",
      undefined,
      undefined,
      t3a,
    ),
    risk({
      ...sp(
        "Was it the wet floor? Is the hotel going to pay for this?",
        t3c,
        "Thương tích: không nhận lỗi, không bàn bồi thường tại chỗ. Nói điều chắc chắn — chưa thể nói vì sao — rồi ai sẽ nói chuyện với khách, và khi nào.",
        undefined,
        undefined,
        t3b,
      ),
      alsoAccept: [
        "I am not able to say why yet, madam. I will ask the Duty Manager to speak with you once he has been seen.",
        "I cannot say why yet, madam. I will ask the manager on duty to speak with you once he has been seen.",
      ],
    }),
    {
      ...sp(
        "Guest Relations. Can 906 have petals and towel art by six?",
        "Yes, as long as the room is empty by half past five. Please give me the cue when they leave.",
        "Guest Relations là đồng nghiệp: không kính ngữ. Nhận lời có điều kiện, rồi xin đúng một thứ: tín hiệu khi khách rời phòng. 'Cue' /kjuː/.",
        "colleague",
      ),
      alsoAccept: [
        "Yes, as long as the room is empty by half past five. Please give me the cue as they leave.",
      ],
    },
    sp(
      "Hoa here. We are short-staffed on eight. Can you take one of my checkouts?",
      "What if I took 812 now, in exchange for your help with my turndown list tonight?",
      "Đồng nghiệp: không kính ngữ. Đề nghị trao đổi trong tổ — 'What if I took' (quá khứ đơn sau 'what if'). Nhớ báo giám sát trước khi đổi.",
      "colleague",
    ),
    {
      ...sp(
        "We are staying another two weeks. Could our sheets be changed every day?",
        "Of course, madam, and there is no charge. It goes on your guest profile today.",
        "Ga thay mỗi ngày theo yêu cầu là dịch vụ có sẵn, không tính phí. Ghi vào hồ sơ khách để ai trên tầng cũng làm đúng.",
      ),
      alsoAccept: [
        "Certainly, madam, and there is no charge. It goes on your guest profile today.",
      ],
    },
  ],
  reading: read(
    `HALF PAST THREE ON THE NINTH FLOOR
A scream from 1102 stops Linh in the corridor. A guest has slipped in the shower; he is awake, but he cannot stand.
Linh does not lift the guest, and she does not let his wife try. She calls the first aider from the room phone, room number first, and then she stays. "The first aider is on her way, madam — two minutes." She brings a towel to keep him warm. She gives him nothing to drink.
The wife asks whether the wet floor caused it and whether the hotel will pay. Linh says she cannot say why yet, and that she will ask the Duty Manager to speak with her once her husband has been seen. She admits nothing and promises nothing.
At four, Guest Relations calls about petals and towel art for 906 by six. Linh agrees, as long as the room is empty by half past five, and asks for the cue.
At half past four, Hoa is short-staffed on eight. Linh offers to take one checkout in exchange for help with her turndown list, and both of them tell Ms Lan before they swap.
Every one of those moments ended in the same place: the room report, with the time.`,
    [
      {
        q: "Khách ngã trong phòng tắm, còn tỉnh nhưng không đứng dậy được. Linh làm gì?",
        options: [
          "Cùng vợ khách đỡ khách ngồi dậy, rồi cho uống chút nước",
          "Không nâng khách, gọi người sơ cứu, và ở lại với khách",
          "Chạy đi tìm người sơ cứu, vì phòng tắm không có điện thoại",
        ],
        correct: 1,
        explanation:
          "'Linh does not lift him… She calls the first aider from the room phone… and then she stays' — không nâng, gọi, ở lại.",
      },
      {
        q: "Vợ khách hỏi có phải do sàn ướt, và khách sạn có đền không. Linh trả lời thế nào?",
        options: [
          "Nhận ngay là do sàn ướt, và hứa với vợ khách rằng khách sạn sẽ chịu mọi chi phí",
          "Nói khách tự trượt ngã, nên khách sạn không có lỗi gì",
          "Chưa thể nói vì sao; sẽ mời Duty Manager nói chuyện sau khi khách được khám",
        ],
        correct: 2,
        explanation:
          "'She admits nothing and promises nothing' — thương tích không bàn lỗi, không bàn bồi thường tại chỗ.",
      },
    ],
  ),
  game: [
    round(
      0,
      "Help me lift him onto the bed, quickly!",
      "Please leave him where he is, madam. The first aider is two minutes away, and I am staying.",
      "Please leave him where he is, madam. The first aider are two minutes away, and I am staying.",
      "Of course, madam — you take his legs and I will take his arms, and we lift together on three.",
      "Phương án 'we lift together' nâng một người vừa ngã khi chưa ai biết họ bị thương ở đâu. Phương án 'The first aider are' sai: chủ ngữ số ít đi với 'is'. Câu đúng giữ khách yên tại chỗ và cho một mốc giờ.",
    ),
    round(
      2,
      "Hoa here. Can you take two of my rooms? I am short today.",
      "What if I took one now, in exchange for your help with my turndown list tonight?",
      "What if I took one now, in exchange of your help with my turndown list tonight?",
      "Sure — I will skip the bathrooms in my own rooms, and then I can do all of yours as well.",
      "Phương án 'skip the bathrooms in my own rooms' đổi tiêu chuẩn lấy thời gian — điều không bao giờ đem ra trao đổi. Phương án 'in exchange of' sai giới từ: in exchange FOR. Câu đúng đề nghị một trao đổi công bằng.",
      "colleague",
    ),
  ],
});

const lesson4 = L(40, 4, "The End of the Shift", "Cuối ca", {
  vocabulary: [
    c(
      "In a row",
      "A sign that has been up two days in a row goes to my supervisor before I leave.",
    ),
    c("Hand over", "Before three I hand over every open request to the late shift."),
    c("By name", "I give the late shift each room by name, with the time the guest asked."),
    c("Signed in", "My master key is signed in at the desk before I take off my uniform."),
  ],
  grammar: [
    g(
      "Ring under the bed, guest gone. I keep it safe in my pocket.",
      "I am handing the ring in now, Ms Lan, sealed and signed by two of us.",
      "Đồ tìm thấy sau khi khách trả phòng: nộp ngay trong ca, niêm phong, hai chữ ký. Hai phân từ hai nối nhau: sealed and signed.",
      "I am handing the ring in now, Ms Lan, seal and signed by two of us.",
    ),
    g(
      "Broken lamp, but the guest gave me money. Forget it.",
      "I could not take the money, Ms Lan, and the broken lamp is on my room report.",
      "Từ chối tiền và vẫn báo hư hỏng. Sau 'could not' là động từ nguyên mẫu: could not take — không chia quá khứ lần hai.",
      "I could not took the money, Ms Lan, and the broken lamp is on my room report.",
    ),
  ],
  speaking: [
    sp(
      "Ms Lan here. Anything I need to know before you go?",
      t4a,
      "Báo cấp trên: việc nguy cơ nhất nói trước. Hai ngày liền không ai vào là chuyện an toàn, không phải chuyện dọn phòng. 'In a row' — đọc liền.",
      "manager",
    ),
    sp(
      "Right, I will take Security up. What else?",
      t4b,
      "Đồ giá trị tìm thấy: một câu sự việc, rồi ba bước đã làm — niêm phong, hai chữ ký, vào sổ. Không đếm, không giữ một mình.",
      "manager",
      undefined,
      t4a,
    ),
    sp(
      "Good. And the last thing?",
      t4c,
      "Điều không ghi vào sổ tầng thì nói TRỰC TIẾP với giám sát. Không vào lại một mình — ai vào phòng đó là việc giám sát quyết.",
      "manager",
      undefined,
      t4b,
    ),
    {
      ...sp(
        "Could you bring us more towels and do the bathroom before you go?",
        "I am bringing fresh towels now, madam, and I will hand over the bathroom by name to the late shift.",
        "Mười lăm phút cuối: việc khách đang chờ và làm trong một phút thì làm (khăn); việc mới thì bàn giao đích danh. 'Hand over' — nhấn ở 'over'.",
      ),
      alsoAccept: [
        "I am bringing you fresh towels now, madam, and I will hand over the bathroom by name to the late shift.",
      ],
    },
    risk({
      ...sp(
        "Take this, for you. And please do not mention the broken lamp.",
        "I cannot take that, sir, and the lamp has to be reported. I am calling my supervisor now.",
        "Hai lời từ chối trong một hơi: không nhận tiền, không giấu hư hỏng. Rồi gọi giám sát ngay — lời đề nghị đó cũng phải được báo.",
      ),
      alsoAccept: [
        "I am sorry, sir, I cannot take that, and the lamp has to be reported. I am calling my supervisor now.",
        "I am not able to take that, sir, and the lamp has to be reported. I am calling my supervisor now.",
      ],
    }),
    sp(
      "Mai here. Is the master key for nine still with you?",
      "No, it is signed in at the desk, with my name and the time.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Chìa tổng không bao giờ trao tay ngoài sổ. 'Signed in' — chữ g câm.",
      "colleague",
    ),
  ],
  reading: read(
    `TEN TO THREE
At twenty to three Linh opens no new room. The last fifteen minutes are for closing what is open.
The guest in 1105 wants more towels and the bathroom done. Linh brings the towels at once, because that takes a minute. The bathroom she writes down and hands over by name: "Mai, 1105, bathroom, asked at ten to three."
In 1210, after checkout, she finds a gold ring under the bed. She does not pocket it, even for a minute. Her supervisor comes, the ring is sealed, two people sign, and it goes into the log.
A guest offers her money to forget a broken lamp. She refuses once, plainly, and reports both the lamp and the offer.
Room 1207 has had its sign up for two days in a row, and nobody answers the phone. That goes to Ms Lan, who takes Security up with her. Linh does not open that door alone.
Last, one thing that is not for the floor log: the guest in 1115 made her uneasy. She says it to Ms Lan face to face.
Then the trolley is restocked, the master key is signed in, and Linh goes home on time.`,
    [
      {
        q: "Khách phòng 1105 xin khăn và nhờ dọn phòng tắm lúc gần hết ca. Linh làm gì?",
        options: [
          "Mang khăn ngay, còn phòng tắm thì ghi lại và bàn giao đích danh",
          "Dọn thật nhanh phòng tắm trước cho khách, rồi mới quay lại mang khăn lên sau",
          "Từ chối cả hai việc, vì đã tới mười lăm phút cuối ca",
        ],
        correct: 0,
        explanation:
          "'Linh brings the towels at once, because that takes a minute. The bathroom she writes down and hands over by name' — không mở việc mới, nhưng không bỏ khách chờ.",
      },
      {
        q: "Nhẫn vàng tìm thấy dưới giường sau khi khách trả phòng thì xử lý thế nào?",
        options: [
          "Cho vào túi áo mình cho an toàn, cuối ca mới mang xuống văn phòng",
          "Gọi giám sát, niêm phong, hai người ký, rồi ghi vào sổ",
          "Để nguyên dưới giường cho ca sau tự phát hiện",
        ],
        correct: 1,
        explanation:
          "'the ring is sealed, two people sign, and it goes into the log' — đồ giá trị không bao giờ ở trong tay một người.",
      },
      {
        q: "Điều gì Linh nói trực tiếp với giám sát mà không ghi vào sổ tầng?",
        options: [
          "Danh sách các phòng đã dọn xong trong ca",
          "Chuyện chìa khoá tổng đã ký nộp lúc ba giờ",
          "Một vị khách khiến mình thấy bất an",
        ],
        correct: 2,
        explanation:
          "'one thing that is not for the floor log… She says it to Ms Lan face to face' — sổ tầng ai cũng đọc được.",
      },
    ],
  ),
  game: [
    round(
      1,
      "Here is something for you. Just forget about the broken lamp, please.",
      "I cannot take that, sir, and the lamp has to be reported. I am calling my supervisor now.",
      "I cannot take that, sir, and the lamp have to be reported. I am calling my supervisor now.",
      "Thank you, sir — it is only a small lamp, so I will write it down as an accident.",
      "Phương án 'I will write it down as an accident' nhận tiền để sửa biên bản — đúng điều không bao giờ làm. Phương án 'the lamp have' sai: chủ ngữ số ít cần 'has'. Câu đúng từ chối, vẫn báo, và gọi giám sát.",
    ),
    round(
      2,
      "Mai here. What is waiting for me on nine?",
      "1105 wants the bathroom done, and 1207 is with Ms Lan and Security. Both are in the log.",
      "1105 want the bathroom done, and 1207 is with Ms Lan and Security. Both are in the log.",
      "Nothing much, really — just finish whatever looks unfinished when you walk past the rooms later.",
      "Phương án 'finish whatever looks unfinished' bàn giao không đích danh, không phòng, không giờ — việc như vậy không thuộc về ai. Phương án '1105 want' sai: chủ ngữ số ít cần 'wants'. Câu đúng nêu từng phòng, từng việc, và chỉ chỗ đã ghi.",
      "colleague",
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: làm trọn một ca buồng phòng bằng tiếng Anh — phục vụ theo điều khách đã nói và ghi hồ sơ khách, kiểm đồ giặt cùng khách, xin lỗi và chụp ảnh khi đồ của khách bị hỏng mà không hứa tiền, giữ khách ngã tại chỗ và gọi sơ cứu, nhận việc dựng phòng có điều kiện, trao đổi việc với đồng nghiệp, từ chối tiền và vẫn báo hư hỏng, và đóng ca bằng bàn giao đích danh.",
};
