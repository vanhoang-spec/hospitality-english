// GR week 36 — evacuation and urgent incidents (the Guest Relations
// exception: the crisis block is three weeks here — 36 evacuation, 37
// medical, 38 storms — see docs/curriculum-level-matrix.md, Phase 4).
//
// Rewritten after the first blind round of the reopened Phase 4 (7ed3254).
// What the round kept, because the Guest Relations Manager on the panel
// praised it: the list only this desk has (guests off site, people in the
// building who are not on the room list), every number with a source, two
// questions for a smoke report and then security, nobody's whereabouts
// confirmed or guessed — not even to a wife — and the all-clear coming from
// the fire officer through the Duty Manager, never from the bell. What it
// changed:
//  · one page of reading per lesson (the old ones ran to 741-762 words),
//    six spoken turns per lesson with a three-turn chain, every game round
//    explained, and no reading quotes another week;
//  · the matrix language — an urgent instruction is one action and one
//    time — is on the cards, and "Please stay calm" is taught as the wrong
//    answer;
//  · the turns a learner must get right (smoke, a husband upstairs, a
//    passport, a mother who cannot manage the stairs) are marked `risk`, so
//    the checkpoint's must-be-right slot can draw them;
//  · a journalist gets the same line as in the complaints week: "That is not
//    mine to handle", and the Duty Manager.
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

// ── Lesson 1 — the people only you can find ────────────────────────────────
const t1a =
  "The boat tour is off site and accounted for. I counted them onto the boat this morning.";
const t1b = "No. I counted them myself, and I wrote the number down when they left.";
const t1c =
  "Yes, the visitors in the lounge are my priority. They are not on the room list, and I am bringing them out.";

// ── Lesson 2 — a lobby that wants answers ──────────────────────────────────
const t2a = "I do not know that yet, madam. Please move to the garden with me.";
const t2b =
  "Nobody has told me that, madam, so I will not say it. Please keep walking to the garden.";
const t2c = "I will speak again at ten past, madam, whatever I know by then.";

// ── Lesson 3 — instructions people follow ──────────────────────────────────
const t3a = "Please do not go back up, sir. Leave it and come with me to the assembly point.";
const t3b = "Nobody goes back in until we are told, sir, and that includes me.";
const t3c = "To the assembly point in the garden, sir. Please use the stairs.";

// ── Lesson 4 — standing down ───────────────────────────────────────────────
const t4a =
  "Not yet, madam. The fire officer gives the all-clear, and I am asking my Duty Manager now.";
const t4b = "I understand, madam. When the all-clear comes, you will hear it from me first.";
const t4c = "Of course, madam. Please sit here with me until the all-clear comes.";

const lessons = [
  L(36, 1, "The People Only You Can Find", "Những người chỉ bạn biết đang ở đâu", {
    vocabulary: [
      c("Off site", "The boat tour is off site until four, sir.", [
        "/ˌɒf ˈsaɪt/",
        "đang ở ngoài khuôn viên khách sạn",
        "🚤",
      ]),
      c("Accounted for", "Everyone on the boat tour is accounted for, sir.", [
        "/əˈkaʊntɪd fɔː/",
        "đã xác định được đang ở đâu",
        "✔️",
      ]),
      c("Not on the room list", "Visitors in the lounge are not on the room list, sir.", [
        "/nɒt ɒn ðə ruːm lɪst/",
        "không có trong danh sách phòng (khách vãng lai, người đến thăm)",
        "📋",
      ]),
      c("Whereabouts", "Whereabouts on the fourth floor did you see it, madam?", [
        "/ˌweərəˈbaʊts/",
        "chỗ nào, vị trí cụ thể ở đâu",
        "📍",
      ]),
      c("I counted them", "I counted them onto the bus myself, sir, and wrote it down.", [
        "/aɪ ˈkaʊntɪd ðem/",
        "tôi đã tự đếm từng người",
        "🔢",
      ]),
    ],
    grammar: [
      g(
        "I think about nine of them went out this morning.",
        "Nine guests are on the boat tour, sir. I counted them onto the boat.",
        "Khi có báo động, mỗi con số phải có NGUỒN. 'I think' và 'about' biến một dữ kiện thành phỏng đoán, và đội ứng phó sẽ đi tìm theo con số bịa đó. Nói con số bạn đã ĐẾM. Việc đã làm dùng quá khứ: 'counted' — đuôi -ed đọc /ɪd/ vì đứng sau âm /t/.",
        "Nine guests are on the boat tour, sir. I count them onto the boat.",
      ),
      g(
        "Smoke? Are you quite sure, madam?",
        "Which floor, sir, and whereabouts on it? I am calling security now.",
        "Hỏi đúng HAI dữ kiện — tầng nào, chỗ nào trên tầng — rồi dừng. Đừng hỏi khách có chắc không: kiểm tra là việc của bảo vệ, chuyển tin là việc của bạn. 'I am calling' (hiện tại tiếp diễn) cho khách biết việc ĐANG diễn ra — đừng bỏ 'am'.",
        "Which floor, sir, and whereabouts on it? I calling security now.",
      ),
    ],
    speaking: [
      sp(
        "Duty Manager. The alarm is real. Where are your guests?",
        t1a,
        "Nói với Duty Manager thì không cần sir. Lễ tân đếm phòng; bạn đếm những người BẠN đã xếp đi nơi khác. Đoàn đi thuyền đang 'off site', và nói luôn bạn biết bằng cách nào: 'I counted them'. Chữ accounted /əˈkaʊntɪd/ — trọng âm ở âm tiết hai.",
        "manager",
      ),
      sp(
        "Nine on the boat. Is that a guess?",
        t1b,
        "Câu hỏi này là để kiểm NGUỒN của con số. Trả lời No, rồi nói bạn đã tự đếm — 'I counted them' — và đã ghi lại lúc nào. Quá khứ của write là wrote /rəʊt/; đừng nói writed.",
        "manager",
        ["counted", "number"],
        t1a,
      ),
      also(
        sp(
          "Good. Is there anyone in the building who is not on the room list?",
          t1c,
          "Khách vãng lai trong lounge không có số phòng, nên danh sách phòng không bao giờ tìm ra họ — chỉ danh sách của bạn tìm được. Nói họ trước: 'my priority'. Rồi nói việc bạn đang làm ngay lúc này.",
          "manager",
          ["lounge", "bringing"],
          t1b,
        ),
        "Yes, the visitors in the lounge are my priority. They are not on the room list, and I am bringing them out now.",
      ),
      risk(
        also(
          sp(
            "There is smoke coming out of a window upstairs — I saw it from the garden!",
            "Which floor, madam, and whereabouts on it? I am calling security now.",
            "Hỏi HAI dữ kiện rồi dừng: tầng nào, và 'whereabouts on it'. Đừng tự đi xem, đừng hỏi câu thứ ba — chuyển tin trong mười giây đáng giá hơn chuyển tin kỹ sau hai phút. 'Whereabouts' /ˌweərəˈbaʊts/ — trọng âm rơi vào âm tiết cuối.",
            undefined,
            ["floor", "whereabouts", "calling", "security"],
          ),
          "Which floor, madam, and whereabouts on that floor? I am calling security now.",
          "Thank you, madam. Which floor, and whereabouts on it? I am calling security now.",
        ),
      ),
      risk(
        also(
          sp(
            "My husband went back up to our room ten minutes ago. Is he still up there?",
            "I cannot confirm that from here, madam. May I have his name and your room number for my Duty Manager?",
            "Đừng đoán theo cả hai phía: 'chắc ông ấy xuống rồi' có thể khiến đội cứu hoả thôi tìm. Bạn không xác nhận ai đang ở trong toà nhà — 'I cannot confirm' — nhưng bạn chuyển ngay cái tên và số phòng cho người giữ danh sách đầy đủ.",
            undefined,
            ["confirm", "name", "room", "number", "duty", "manager"],
          ),
          "I am not able to confirm that from here, madam. May I have his name and your room number for my Duty Manager?",
          "I cannot confirm that from here, madam, but may I have his name and your room number for my Duty Manager?",
        ),
      ),
      sp(
        "I have the room list printout here. Shall I read the names out in the garden?",
        "No. Give it to the Duty Manager, and read nothing out in front of guests.",
        "ĐỒNG NGHIỆP hỏi, nên không có sir hay madam. Danh sách phòng đọc to ở khu tập kết là lộ thông tin của mọi vị khách cùng lúc. Danh sách đi tới Duty Manager và đội chữa cháy — không đi qua loa của ai.",
        "colleague",
      ),
    ],
    reading: read(
      `THE PEOPLE ONLY YOU CAN FIND
When the alarm is real, three desks count at once, and each one counts something different. The front office counts rooms. Housekeeping walks the floors. You count the people you placed somewhere else.
Some of them are off site: the boat tour, the airport car, the cooking class in town. Tell the Duty Manager they are accounted for, and say how you know. "I counted them onto the boat this morning" is a fact. "About nine, I think" sends a team looking for a number you invented.
Others are inside the building but not on the room list. They are visitors in the lounge, a wedding lunch, a day guest in the spa. The room list cannot find them, so say them first.
A guest who reports smoke gets two questions: which floor, and whereabouts on it. Then you call security. Do not go to look, and do not ask a third question.
A guest who asks whether her husband is still upstairs does not get a guess either way. Take his name and her room number to the Duty Manager. He and the fire team hold the full list, and nobody reads it aloud in the garden.`,
      [
        {
          q: "Đoàn khách đi thuyền đang ở ngoài khách sạn. Bạn báo Duty Manager thế nào?",
          options: [
            "Ước chừng số người cho nhanh, rồi hẹn kiểm lại sau khi hết báo động",
            "Nói họ ở ngoài khuôn viên, và nói bạn biết bằng cách nào",
            "Để lễ tân báo, vì lễ tân có danh sách phòng",
          ],
          correct: 1,
          explanation: `Bài đọc: "Tell the Duty Manager they are accounted for, and say how you know." Con số đoán làm đội ứng phó đi tìm một con số bịa.`,
        },
        {
          q: "Ai là người KHÔNG có trong danh sách phòng?",
          options: [
            "Khách vãng lai trong lounge và khách dự tiệc cưới",
            "Khách lưu trú đang ngủ trên phòng của mình",
            "Đoàn khách lưu trú đang đi thuyền ngoài vịnh cả buổi sáng",
          ],
          correct: 0,
          explanation: `Bài đọc: "They are visitors in the lounge, a wedding lunch, a day guest in the spa. The room list cannot find them, so say them first."`,
        },
        {
          q: "Khách hỏi chồng mình có còn ở trên lầu không. Bạn làm gì?",
          options: [
            "Trấn an rằng ông ấy chắc đã xuống bằng lối khác",
            "Tự lên tận phòng xem giúp khách rồi quay xuống báo lại",
            "Xin tên ông ấy và số phòng, đưa cho Duty Manager",
          ],
          correct: 2,
          explanation: `Bài đọc: "does not get a guess either way. Take his name and her room number to the Duty Manager."`,
        },
      ],
    ),
    game: [
      round(
        "Duty Manager. How many are out on the boat?",
        [
          [
            "Around nine or ten, I would say — it looked like a big group this morning.",
            "register",
          ],
          ["Nine. I counted them onto the boat, and I wrote it down.", "answer"],
          ["Nine. I counted them onto the boat, and I writed it down.", "form"],
        ],
        "Câu này đoán 'khoảng chín, mười' — đội ứng phó sẽ đi tìm một con số không ai đếm. Câu sai ngữ pháp dùng 'writed'; quá khứ của 'write' là 'wrote'. Đáp án nói con số đã đếm và nguồn của nó.",
        "manager",
      ),
      round(
        "My husband went up for his phone. Is he still in the building?",
        [
          ["I cannot confirm that, madam. May I have his name for my Duty Manager?", "answer"],
          ["He came down a minute ago, madam — I am sure I saw him by the pool.", "register"],
          ["I cannot confirm that, madam. May I having his name for my Duty Manager?", "form"],
        ],
        "Câu này đoán là đã thấy ông ấy — một câu đoán có thể làm đội chữa cháy thôi tìm một người còn ở trên lầu. Câu sai ngữ pháp dùng 'May I having'; sau 'may' là động từ nguyên mẫu: 'May I have'. Đáp án không đoán, và đưa cái tên cho người giữ danh sách đầy đủ.",
      ),
    ],
  }),

  L(36, 2, "A Lobby That Wants Answers", "Một sảnh đông đang đòi câu trả lời", {
    vocabulary: [
      c("I do not know that yet", "I do not know that yet, madam, and I will not guess.", [
        "/aɪ duː nɒt nəʊ ðæt jet/",
        "tôi chưa biết điều đó",
        "❔",
      ]),
      c("I will speak again at", "I will speak again at ten past, sir.", [
        "/aɪ wɪl spiːk əˈɡen æt/",
        "tôi sẽ thông báo lại vào lúc…",
        "📢",
      ]),
      c("Please move to", "Please move to the garden, madam, and wait for me there.", [
        "/pliːz muːv tuː/",
        "xin mời di chuyển tới…",
        "➡️",
      ]),
      c("Nobody has told me that", "Nobody has told me that, sir, so I will not say it.", [
        "/ˈnəʊbədi hæz təʊld miː ðæt/",
        "chưa ai báo với tôi điều đó",
        "🤐",
      ]),
    ],
    grammar: [
      g(
        "Please stay calm, everyone. There is nothing to worry about.",
        "Please move to the garden. I will speak again at ten past.",
        "'Please stay calm' bảo người ta CẢM THẤY một điều — không ai làm theo được. Cho đám đông một VIỆC để làm và một MỐC GIỜ bạn quay lại. Đừng nói 'nothing to worry about': bạn chưa biết. Sau 'will' là động từ nguyên mẫu: 'will speak', không phải 'will speaking'.",
        "Please move to the garden. I will speaking again at ten past.",
      ),
      g(
        "It is only a false alarm — the kitchen sets it off all the time.",
        "I do not know that yet, sir, and I will not guess.",
        "Một câu 'chỉ là báo giả' làm người ta ngồi lại; nếu không phải báo giả, bạn vừa lấy mất của họ những phút quan trọng nhất. Nói thẳng là chưa biết. 'Know' là động từ thường: phủ định là 'do not know', không phải 'am not know'.",
        "I am not know that yet, sir, and I will not guess.",
      ),
    ],
    speaking: [
      sp(
        "What is going on? Is it a real fire?",
        t2a,
        "Hai vế, đúng thứ tự: điều bạn CHƯA biết, rồi việc khách cần làm. Dừng ở câu chưa biết thì đám đông sẽ tự điền vào chỗ trống. 'Please move to' + tên chỗ: 'the garden'.",
        undefined,
        ["garden"],
      ),
      sp(
        "Somebody said the kitchen is on fire. Is that true?",
        t2b,
        "Đừng cãi tin đồn bằng 'That is not true' — bạn cũng không biết nó sai. 'Nobody has told me that' nói về điều BẠN được báo, rồi kéo khách về việc phải làm. Chữ told /təʊld/ — âm /əʊ/ như ô-u.",
        undefined,
        ["keep", "garden"],
        t2a,
      ),
      also(
        sp(
          "It is nearly ten o'clock. How long are we going to stand out here?",
          t2c,
          "Mốc giờ là phần giữ đám đông lại, và đó là giờ CỦA BẠN: bạn không hứa sẽ có tin, bạn hứa sẽ quay lại dù có tin hay chưa. 'I will speak again at' + giờ.",
          undefined,
          ["past"],
          t2b,
        ),
        "I will speak again at ten past, madam, whatever I know by that time.",
      ),
      sp(
        "Just tell them it is a false alarm. They will move faster.",
        "Not until the Duty Manager says so. I will give them the garden and a time.",
        "ĐỒNG NGHIỆP nói, nên không có sir hay madam. Chỉ Duty Manager mới nói được đó là báo giả. Việc của bạn là một chỗ để đi và một mốc giờ.",
        "colleague",
      ),
      also(
        sp(
          "We have a flight at six. Somebody must know how long this will take!",
          "Since you mentioned your flight, sir, I am writing it down for my Duty Manager now.",
          "Đừng đoán thời gian, kể cả để khách yên tâm về chuyến bay. Mở bằng lời khách — 'Since you mentioned' — rồi làm một việc thật: ghi lại và chuyển cho người quyết định.",
          undefined,
          ["since", "mentioned", "writing", "duty", "manager"],
        ),
        "Since you mentioned your flight, sir, I am writing it down now for my Duty Manager.",
      ),
      sp(
        "My little boy is frightened. Can we wait in our car on the drive instead?",
        "I am sorry, madam, the drive must stay clear for the fire engines. Please stay with me in the garden.",
        "Xe đậu trên lối vào chặn đường của xe cứu hoả. Nói lý do bằng một câu, rồi đưa khách một chỗ khác ngay. Đừng nói 'there is nothing to worry about' để dỗ đứa trẻ.",
        undefined,
        ["clear", "garden"],
      ),
    ],
    reading: read(
      `A LOBBY THAT WANTS ANSWERS
A crowd is not calmed by being told to be calm. "Please stay calm" asks people to feel something, and nobody can do that on request. What calms a crowd is a thing to do and a time to expect you back.
So say three things, in this order: what you do not know, where they should go, and when you will speak again. "I do not know that yet. Please move to the garden. I will speak again at ten past."
The time is the part that works. A promise with no time on it leaves people standing where they are, asking again in ninety seconds. Make it your own time. You are not promising news by then; you are promising to come back.
Now the harder half: what you may not say. You may not say why, or how long. You may not say it is safe, and you may not say it is nothing. "It is only a false alarm" sits people back down, and the house will be asked afterwards who said it.
Rumours arrive as questions: "Somebody said the kitchen is on fire." Do not argue with them. Say "Nobody has told me that," and bring the guest back to the garden.`,
      [
        {
          q: "Vì sao 'Please stay calm' không có tác dụng?",
          options: [
            "Vì câu đó quá ngắn, khách nước ngoài thường không nghe kịp giữa lúc chuông kêu",
            "Vì nó bảo người ta cảm thấy một điều, mà không ai làm theo được",
            "Vì nó thiếu tên của bộ phận đang xử lý sự cố",
          ],
          correct: 1,
          explanation: `Bài đọc: "'Please stay calm' asks people to feel something, and nobody can do that on request." Cho một việc để làm và một mốc giờ.`,
        },
        {
          q: "Mốc giờ bạn đưa ra là lời hứa về điều gì?",
          options: [
            "Rằng chính bạn sẽ quay lại nói tiếp",
            "Rằng lúc đó chắc chắn sẽ có tin mới từ Duty Manager",
            "Rằng sự cố sẽ xong trước lúc đó, theo lời bảo vệ",
          ],
          correct: 0,
          explanation: `Bài đọc: "You are not promising news by then; you are promising to come back."`,
        },
        {
          q: "Khách hỏi 'nghe nói cháy bếp phải không?'. Bạn đáp thế nào?",
          options: [
            "'That is not true' — phủ nhận ngay để tin đồn dừng lại ở đó",
            "Không đáp gì, để tin đồn tự tắt",
            "'Nobody has told me that', rồi đưa khách về khu vườn",
          ],
          correct: 2,
          explanation: `Bài đọc: "Do not argue with them. Say 'Nobody has told me that,' and bring the guest back to the garden."`,
        },
      ],
    ),
    game: [
      round(
        "How long is this going to take? We have a dinner booked at eight.",
        [
          [
            "It should not be long, sir — these things are usually over in a few minutes.",
            "register",
          ],
          ["I do not know that yet, sir. I will speak again on ten past.", "form"],
          ["I do not know that yet, sir. I will speak again at ten past.", "answer"],
        ],
        "Câu này đoán thời gian — nếu sai, cả sảnh thôi tin mọi câu sau của bạn. Câu sai ngữ pháp dùng 'on ten past'; giờ đồng hồ đi với 'at'. Đáp án nói thật là chưa biết và đưa một mốc giờ của chính bạn.",
      ),
      round(
        "Tell them it is a false alarm, so the lobby clears faster.",
        [
          ["Not until the Duty Manager says so. They get the garden and a time from me.", "answer"],
          ["Good idea — they will move much faster once they hear it is nothing.", "register"],
          ["Not until the Duty Manager say so. They get the garden and a time from me.", "form"],
        ],
        "Câu này nói một điều chưa ai xác nhận — nếu không phải báo giả, khách sạn sẽ bị hỏi ai đã nói câu đó. Câu sai ngữ pháp dùng 'the Duty Manager say'; chủ ngữ số ít thì động từ thêm -s: 'says'. Đáp án chờ Duty Manager, và cho khách một chỗ cùng một mốc giờ.",
        "colleague",
      ),
    ],
  }),

  L(36, 3, "Instructions People Follow", "Câu lệnh khẩn mà khách làm theo", {
    vocabulary: [
      c("Use the stairs", "Because of the alarm, please use the stairs, not the lift.", [
        "/juːz ðə steəz/",
        "xin đi cầu thang bộ",
        "🪜",
      ]),
      c("Leave it and come with me", "Leave it and come with me, sir. Nobody goes back in.", [
        "/liːv ɪt ənd kʌm wɪð miː/",
        "cứ để đó và đi cùng tôi",
        "🚶",
      ]),
      c("The assembly point", "The assembly point for a fire is the garden, madam.", [
        "/ði əˈsembli pɔɪnt/",
        "điểm tập kết khi sơ tán",
        "🚩",
      ]),
      c(
        "Cannot manage the stairs",
        "If a guest cannot manage the stairs, the fire team needs the room number.",
        ["/ˈkænɒt ˈmænɪdʒ ðə steəz/", "không tự đi cầu thang được", "♿"],
      ),
      c("The fire team", "Only the fire team goes back into the building.", [
        "/ðə ˈfaɪə tiːm/",
        "đội chữa cháy (lực lượng PCCC)",
        "🚒",
      ]),
    ],
    grammar: [
      g(
        "Would you like to make your way to the stairs, madam?",
        "Because of the alarm, please use the stairs, madam, not the lift.",
        "Lệnh khẩn phải NGẮN, chỉ MỘT hành động, và lý do đứng TRƯỚC. 'Would you like…' là lời mời — mà lời mời thì từ chối được. 'Because of' + danh từ ('because of the alarm'); 'because' đứng một mình thì phải theo sau là cả một mệnh đề.",
        "Because the alarm, please use the stairs, madam, not the lift.",
      ),
      g(
        "You cannot go back up there. It is against the rules.",
        "Please do not go back up, sir. Leave it and come with me.",
        "Một lệnh cấm không kèm phương án thì khách tự tìm phương án — và phương án của họ là chạy lên cầu thang. Cấm, rồi đưa ngay việc thay thế trong cùng một hơi. Sau 'do not' là động từ nguyên mẫu: 'do not go', không phải 'do not going'.",
        "Please do not going back up, sir. Leave it and come with me.",
      ),
    ],
    speaking: [
      risk(
        also(
          sp(
            "I just need two minutes to run up for my passport.",
            t3a,
            "Đây là câu bạn sẽ phải nói thật, và khách sẽ đi qua bạn nếu bạn ngập ngừng. Cấm, rồi đưa phương án trong cùng một hơi: 'Leave it and come with me'. Đừng giải thích quy định — không ai đứng nghe quy định khi chuông đang kêu.",
            undefined,
            ["up", "back", "leave", "come", "assembly", "point"],
          ),
          "Please do not go back up for it, sir. Leave it and come with me to the assembly point.",
          "Please do not go back up, sir. Leave it there and come with me to the assembly point.",
        ),
      ),
      sp(
        "But my passport and all my money are up there!",
        t3b,
        "Không ai quay vào cho tới khi có lệnh — kể cả bạn, nên đừng hứa sẽ lên lấy hộ. 'Nobody goes back in' là luật cho mọi người, nói ra thì khách thấy đó không phải chuyện riêng của họ.",
        undefined,
        ["nobody", "back"],
        t3a,
      ),
      also(
        sp(
          "All right. Where exactly are we going?",
          t3c,
          "Nói TÊN CHỖ THẬT kèm cụm 'the assembly point' — khách ít tiếng Anh vẫn nghe ra một khu vườn. Rồi một lệnh duy nhất: 'Please use the stairs'. Chữ stairs /steəz/ — không bật âm r.",
          undefined,
          ["assembly", "point", "garden", "stairs"],
          t3b,
        ),
        "To the assembly point in the garden, sir. Please use the stairs to get there.",
      ),
      risk(
        also(
          sp(
            "My mother is on the sixth floor, and she cannot walk down all those stairs.",
            "May I have her room number, madam? I am telling the fire team she cannot manage the stairs.",
            "Người không tự đi cầu thang được là việc của đội chữa cháy, không phải của bạn: đừng bảo khách đưa mẹ vào thang máy, đừng tự lên đón. Xin số phòng, rồi chuyển đúng câu 'cannot manage the stairs' cho 'the fire team'. Đừng hứa sẽ có người lên ngay.",
            undefined,
            ["room", "number", "telling", "fire", "team", "manage", "stairs"],
          ),
          "May I have her room number, please, madam? I am telling the fire team she cannot manage the stairs.",
          "Her room number, please, madam. I am telling the fire team that she cannot manage the stairs.",
        ),
      ),
      sp(
        "The fire panel keeps beeping. Shall I press reset so the guests can hear us?",
        "No. Nobody touches the panel except security and the fire team.",
        "ĐỒNG NGHIỆP hỏi. Tắt hay khởi động lại tủ báo cháy có thể xoá đúng thông tin đội chữa cháy cần — chỉ bảo vệ và 'the fire team' được chạm vào.",
        "colleague",
        ["security", "fire", "team"],
      ),
      sp(
        "There is a lady in the lounge who will not stand up. What now?",
        "Ask her twice, calmly. Then tell the Duty Manager where she is, and come out yourself.",
        "ĐỒNG NGHIỆP hỏi. Không cãi, không kéo tay một người đã nói không. Hỏi hai lần, báo Duty Manager vị trí của bà ấy, rồi ra ngoài — cãi nhau thì trong toà nhà còn hai người thay vì một.",
        "colleague",
        ["duty", "manager"],
      ),
    ],
    reading: read(
      `INSTRUCTIONS PEOPLE FOLLOW
An instruction people follow is short, has one action in it, and puts the reason first. "Because of the alarm, please use the stairs." That is one thing to do, and everything else can wait.
Polite English for a quiet afternoon is the wrong English here. "Would you like to make your way to the stairs?" is an offer, and an offer can be declined. Being brief is not being rude: say please, say it once, and say the action.
A prohibition on its own does not work either. Tell a guest not to go back, and he will find his own way back up. So every "do not" carries an "instead": "Leave it and come with me." Nobody goes back in, and that includes you.
Name the place, not only the term. "The assembly point" is a phrase from a plan on a wall; "the garden" is somewhere a guest can picture.
Two guests are not yours to move alone. A guest who will not stand up: ask twice, calmly, then tell the Duty Manager where she is and come out. A guest who cannot manage the stairs: take the room number to the fire team. Never send them to a lift, and never promise that somebody is on the way.
And nobody touches the fire panel except security and the fire team.`,
      [
        {
          q: "Một câu lệnh khẩn được cấu tạo thế nào?",
          options: [
            "Lời xin lỗi trước, rồi giải thích quy định cho khách hiểu vì sao",
            "Tên bộ phận ra lệnh trước, rồi hành động và thời hạn",
            "Lý do trước, rồi một hành động",
          ],
          correct: 2,
          explanation: `Bài đọc: "An instruction people follow is short, has one action in it, and puts the reason first."`,
        },
        {
          q: "Khách nói mẹ mình không tự đi cầu thang được. Bạn làm gì?",
          options: [
            "Bảo khách đưa mẹ vào thang máy, vì thang máy nhanh hơn cầu thang",
            "Lấy số phòng, chuyển cho đội chữa cháy",
            "Tự lên phòng đưa bà xuống, nhờ đồng nghiệp trông quầy",
          ],
          correct: 1,
          explanation: `Bài đọc: "A guest who cannot manage the stairs: take the room number to the fire team. Never send them to a lift."`,
        },
        {
          q: "Tủ báo cháy kêu liên tục. Ai được chạm vào nó?",
          options: [
            "Bảo vệ và đội chữa cháy",
            "Nhân viên nào đứng gần tủ nhất lúc đó, để khách nghe được thông báo",
            "Lễ tân, vì lễ tân giữ danh sách phòng",
          ],
          correct: 0,
          explanation: `Bài đọc: "And nobody touches the fire panel except security and the fire team."`,
        },
      ],
    ),
    game: [
      round(
        "I will just take the lift up for my laptop. Two minutes!",
        [
          ["Of course, madam, but please be quick — the lifts may stop soon.", "register"],
          ["Please do not go back up, madam. Leave it and come with me.", "answer"],
          ["Please do not go back up, madam. Leave it and coming with me.", "form"],
        ],
        "Câu này cho khách quay lên, lại bằng thang máy — sai cả hai luật sơ tán. Câu sai ngữ pháp dùng 'and coming'; hai mệnh lệnh nối bằng 'and' phải cùng dạng: 'leave… and come'. Đáp án cấm rồi đưa ngay việc thay thế.",
      ),
      round(
        "The panel is still beeping. Shall I switch it off so we can hear?",
        [
          ["Yes — the alarm has done its job, and the guests are already outside.", "register"],
          ["No. Leaving the panel to security and the fire team.", "form"],
          ["No. Leave the panel to security and the fire team.", "answer"],
        ],
        "Câu này cho tắt tủ báo cháy — có thể xoá đúng thông tin đội chữa cháy cần. Câu sai ngữ pháp dùng 'Leaving' ở chỗ cần một mệnh lệnh: 'Leave the panel…'. Đáp án để tủ cho bảo vệ và đội chữa cháy.",
        "colleague",
      ),
    ],
  }),

  L(36, 4, "Standing Down", "Kết thúc sự cố — lệnh vào lại và biên bản", {
    vocabulary: [
      c("The all-clear", "The fire officer gives the all-clear, not the bell.", [
        "/ði ˌɔːl ˈklɪə/",
        "lệnh báo an toàn, cho phép vào lại toà nhà",
        "🟢",
      ]),
      c("The fire officer", "The fire officer gives the all-clear to my Duty Manager.", [
        "/ðə ˈfaɪə ˈɒfɪsə/",
        "cán bộ chỉ huy chữa cháy",
        "👨‍🚒",
      ]),
      c("Back inside", "I am counting the boat tour back inside now.", [
        "/bæk ɪnˈsaɪd/",
        "trở vào bên trong",
        "🚪",
      ]),
      c("Incident report", "An evacuation goes on an incident report, not in the complaint log.", [
        "/ˈɪnsɪdənt rɪˈpɔːt/",
        "biên bản sự cố",
        "📝",
      ]),
    ],
    grammar: [
      g(
        "The bell has stopped, so you can all go back up now.",
        "The fire officer gives the all-clear, madam, and my Duty Manager brings it to us.",
        "Chuông tắt KHÔNG phải lệnh vào lại. Lệnh đó do cán bộ chữa cháy đưa ra và Duty Manager mang tới quầy — không phải bạn, kể cả khi bạn thấy mọi thứ đã xong. Chủ ngữ số ít 'the fire officer' thì động từ thêm -s: 'gives'.",
        "The fire officer give the all-clear, madam, and my Duty Manager brings it to us.",
      ),
      g(
        "The lady in the lounge was very rude to all of us.",
        "The lady in the lounge would not stand up until I asked her twice.",
        "Biên bản sự cố ghi VIỆC ĐÃ XẢY RA và giờ giấc — không ghi nhận xét về con người, không đoán nguyên nhân. Sau 'would not' là động từ nguyên mẫu: 'would not stand', không phải 'would not stood'.",
        "The lady in the lounge would not stood up until I asked her twice.",
      ),
    ],
    speaking: [
      sp(
        "The bell has stopped. Can we go back up to our room now?",
        t4a,
        "Chuông tắt là thứ khách nghe được, nên đừng chặn bằng một chữ No trơn. Nói AI cho phép vào lại — 'The fire officer gives the all-clear' — và nói bạn đang hỏi ngay bây giờ.",
        undefined,
        ["gives", "asking", "duty", "manager"],
      ),
      sp(
        "We have been standing out here for forty minutes. This is ridiculous.",
        t4b,
        "Đừng hứa một giờ thay cán bộ chữa cháy. Hứa điều của chính bạn: khi có 'the all-clear', khách nghe từ bạn trước tiên.",
        undefined,
        ["understand", "first"],
        t4a,
      ),
      also(
        sp(
          "Thank you. Can I at least sit down somewhere while we wait?",
          t4c,
          "Một việc nhỏ làm ngay — một chỗ ngồi, có bạn ở cạnh — giúp khách hơn mọi lời giải thích. Vẫn giữ mốc là 'the all-clear', không phải một giờ đoán.",
          undefined,
          ["sit"],
          t4b,
        ),
        "Of course, madam. Please sit here with me until the all-clear comes through.",
      ),
      sp(
        "Duty Manager. The fire officer has given the all-clear. What is yours now?",
        "The boat tour. I am counting them back inside against the names I wrote this morning.",
        "Nói với Duty Manager thì không cần sir. Danh sách của bạn chưa xong khi chuông tắt: đếm đúng những người bạn đã báo ra — 'back inside' — vì một con số đi ra mà không quay về chính là lý do người ta phải đếm.",
        "manager",
        ["tour", "names"],
      ),
      sp(
        "Shall I put the whole evening in the complaint log so it is on record?",
        "No. It goes on an incident report, and I am writing it before the end of my shift.",
        "ĐỒNG NGHIỆP hỏi. Khiếu nại vào complaint log; một việc ĐÃ XẢY RA vào 'incident report'. Viết trong chính ca của bạn — ca sau không nhìn thấy những gì bạn đã thấy.",
        "colleague",
        ["writing", "shift"],
      ),
      also(
        sp(
          "I am from the local paper. What exactly happened here tonight?",
          "That is not mine to handle, sir. I am bringing my Duty Manager to you now.",
          "Một câu rồi dừng: không tên bạn, không ý kiến, không kể lại, và cũng không phải câu no comment. Nói đúng câu đã học — 'not mine to handle' — rồi mời Duty Manager tới.",
          undefined,
          ["handle", "bringing", "duty", "manager"],
        ),
        "I am sorry, sir, that is not mine to handle. I am bringing my Duty Manager to you now.",
      ),
    ],
    reading: read(
      `STANDING DOWN
The bell stopping is not the all-clear. It is only the bell stopping. The fire officer gives the all-clear, and the Duty Manager brings it to you. It never comes from the bell, and never from you, even if you can see that it is over.
Guests will want to go in anyway, because a garden is dull and their room is upstairs. Do not block them with a flat no. Tell them who gives the all-clear, and tell them you are asking now.
When the word comes, go back to your own list. The boat tour is still on the boat, and nobody has told them anything. Count your people back inside against the names you wrote down. A number that goes out and does not come back in is the reason anybody counted.
Then the paper. An evacuation is a thing that happened, so it goes on an incident report, not in the complaint log. Write what happened and when, in your own shift. Do not write why, and do not write what anybody was like.
An hour later, somebody may arrive with a phone or a microphone. Say "That is not mine to handle," bring the Duty Manager, and say nothing else.`,
      [
        {
          q: "Chuông báo cháy đã tắt. Điều đó có nghĩa là gì?",
          options: [
            "Khách được lên phòng, vì toà nhà chắc chắn đã được kiểm tra xong",
            "Chỉ là chuông đã tắt — lệnh vào lại do cán bộ chữa cháy đưa ra",
            "Bảo vệ đã xác nhận tầng có khói không còn nguy hiểm",
          ],
          correct: 1,
          explanation: `Bài đọc: "The bell stopping is not the all-clear. It is only the bell stopping. The fire officer gives the all-clear."`,
        },
        {
          q: "Cuộc sơ tán được ghi vào đâu?",
          options: [
            "Complaint log, vì có khách phàn nàn phải đứng chờ lâu ngoài vườn",
            "Cả hai quyển, để ca sau mở quyển nào cũng thấy",
            "Incident report, viết ngay trong ca của bạn",
          ],
          correct: 2,
          explanation: `Bài đọc: "An evacuation is a thing that happened, so it goes on an incident report, not in the complaint log. Write what happened and when, in your own shift."`,
        },
        {
          q: "Một người cầm micro hỏi chuyện tối qua. Bạn nói gì?",
          options: [
            "'That is not mine to handle', rồi mời Duty Manager",
            "'No comment', rồi quay đi chỗ khác thật nhanh",
            "Kể đúng những gì chính mắt mình đã thấy trong lúc sơ tán",
          ],
          correct: 0,
          explanation: `Bài đọc: "Say 'That is not mine to handle,' bring the Duty Manager, and say nothing else."`,
        },
      ],
    ),
    game: [
      round(
        "The bell has stopped and people are drifting back in. Shall we let them?",
        [
          ["Not yet. The bell is not the all-clear, and the fire officer has not give it.", "form"],
          ["Yes — the bell has stopped, so the building must be clear by now.", "register"],
          [
            "Not yet. The bell is not the all-clear, and the fire officer has not given it.",
            "answer",
          ],
        ],
        "Câu này coi chuông tắt là lệnh vào lại — lệnh đó chỉ cán bộ chữa cháy mới đưa ra. Câu sai ngữ pháp dùng 'has not give'; sau 'has' là quá khứ phân từ: 'has not given'. Đáp án giữ khách lại và nói ai cho phép vào.",
        "colleague",
      ),
      round(
        "I wrote that the lady in the lounge was rude. Is that all right for the report?",
        [
          ["Write what she did: she would not stand up until you asked twice.", "answer"],
          ["Yes — the next shift should know she is a difficult guest.", "register"],
          ["Write what she did: she would not stood up until you asked twice.", "form"],
        ],
        "Câu này giữ một nhận xét về con người trong biên bản — người đọc sau sẽ mang theo thái độ đó. Câu sai ngữ pháp dùng 'would not stood'; sau 'would not' là động từ nguyên mẫu: 'stand'. Đáp án ghi việc đã xảy ra.",
        "colleague",
      ),
    ],
  }),
];

export const week: AuthoredWeek = {
  title: { en: "Evacuation and Urgent Incidents", vi: "Sơ tán và sự cố khẩn" },
  canDo:
    "Nói được: báo Duty Manager những khách đang ở ngoài và những người không có trong danh sách phòng, mỗi con số có nguồn; hỏi đúng hai dữ kiện khi khách báo khói rồi gọi bảo vệ; ra lệnh khẩn ngắn — một việc, một mốc giờ — thay vì 'Please stay calm'; giữ khách không quay lại lấy đồ; và chờ lệnh vào lại của cán bộ chữa cháy qua Duty Manager.",
  lessons,
};
