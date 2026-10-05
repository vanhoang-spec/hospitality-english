// GR week 31 — telling the story of the house and of its services.
//
// Rewritten after the first blind round of the reopened Phase 4 (7ed3254).
// What the round kept: the story has a shape — three facts said plainly,
// "as far as I know" for everything beyond them, a story offered and never
// delivered unasked — and other guests are never part of it. What it
// changed:
//  · one short page of reading per lesson (the old ones ran to 741-986
//    words), five or six spoken turns per lesson with a three-turn chain,
//    and every game round says why each wrong bubble is wrong;
//  · no model answer makes the learner recite a year, a name or a figure the
//    guest did not say — the exam hides the model, and a remembered date is
//    a memory test, not a skill;
//  · the week's language is the matrix's: two- and three-clause sentences
//    and the feeling words that carry a story (proud of, fascinating,
//    delighted, peaceful, memorable), with -ed for the person and -ing for
//    the thing;
//  · a person who claims authority and asks for the guest list is met with
//    courtesy and the Duty Manager, called from the desk — never refused,
//    never answered.
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

// ── Lesson 1 — three facts, told with feeling ──────────────────────────────
const t1a = "Yes, madam, the staircase is original, and we are very proud of it.";
const t1b = "As far as I know, it is, madam, but I would like to check that for you.";
const t1c =
  "I am delighted you find it fascinating, madam. I will bring you the answer by this evening.";

// ── Lesson 2 — offered, not delivered ──────────────────────────────────────
const t2a = "Not always, madam. Would you like the short version, or shall I leave you to it?";
const t2b =
  "It was the family's dining room, madam, and it was restored with the original wood. Do stop me whenever you like.";
const t2c = "I am delighted you enjoyed it, madam, and I will leave you to it.";

// ── Lesson 3 — one place, one time ─────────────────────────────────────────
const t3a =
  "Our signature experience is the lantern lighting, madam, and the courtyard is best seen at dusk.";
const t3b = "It is very peaceful, madam, because most guests are still at dinner.";
const t3c = "The concierge desk books tables, madam, and I will walk you over to them now.";

// ── Lesson 4 — not part of the story ───────────────────────────────────────
const t4a = "Other guests are not part of the story, madam, but may I show you the history folder?";
const t4b = "No, madam. The guest privacy rule does not end at check-out.";
const t4c =
  "I would rather find out than guess, madam. The history folder will tell us, and I will bring it now.";
const t4d = "May I have your name and your friend's name, madam? I will telephone from the desk.";
const t4e = "Thank you, madam. Please take a seat while I telephone from the desk.";
const t4f = "I am afraid I cannot connect you, madam. May I take a message for her?";
const t4g =
  "Of course I will help you, sir. Let me call my Duty Manager for you from the desk now.";

const lessons = [
  L(31, 1, "Three Facts, Told with Feeling", "Ba dữ kiện, kể bằng cảm xúc", {
    vocabulary: [
      c("Proud of", "We are proud of the old staircase, madam, and guests often ask about it.", [
        "/praʊd ɒv/",
        "tự hào về",
        "🏅",
      ]),
      c("Original", "The floor tiles in the lobby are original, sir.", [
        "/əˈrɪdʒənl/",
        "nguyên bản, có từ thuở ban đầu",
        "🏛️",
      ]),
      c("Restored", "The staircase was restored by local craftsmen, and it looks new again.", [
        "/rɪˈstɔːd/",
        "đã được trùng tu, phục chế",
        "🛠️",
      ]),
      c("Fascinating", "Many guests find the old photographs in the library fascinating.", [
        "/ˈfæsɪneɪtɪŋ/",
        "cuốn hút, thú vị lạ thường",
        "✨",
      ]),
      c("As far as I know", "As far as I know, the painting is original, but I will check.", [
        "/æz fɑːr æz aɪ nəʊ/",
        "theo những gì tôi biết",
        "🤔",
      ]),
    ],
    grammar: [
      g(
        "Staircase old. We like it.",
        "The staircase is original, and we are very proud of it, madam.",
        "Câu ghép hai vế nối bằng 'and': vế đầu là DỮ KIỆN, vế sau là CẢM XÚC. 'Proud' luôn đi với 'of' — người Việt hay nói 'proud for' vì dịch từ 'tự hào vì'.",
        "The staircase is original, and we are very proud for it, madam.",
      ),
      g(
        "It is maybe two hundred years old, I think.",
        "As far as I know, the painting is original, sir, but I would like to check.",
        "Ba dữ kiện chắc chắn thì nói thẳng. Chi tiết NGOÀI ba dữ kiện thì mở bằng 'As far as I know', rồi hứa đi tra — đừng đoán một con số. 'Know' là động từ thường: không thêm 'am' trước nó — 'I know', không phải 'I am know'.",
        "As far as I am know, the painting is original, sir, but I would like to check.",
      ),
    ],
    speaking: [
      also(
        sp(
          "Is this staircase as old as the house?",
          t1a,
          "Dữ kiện chắc chắn thì nói thẳng — đừng thêm 'I think' phía trước. Câu ghép hai vế: dữ kiện, rồi 'and', rồi cảm xúc: 'we are very proud of it'. 'Original' /əˈrɪdʒənl/ — trọng âm ở âm tiết thứ hai.",
        ),
        "Yes, madam, it is original, and we are very proud of it.",
      ),
      also(
        sp(
          "And the painting at the top of the stairs — is that original too?",
          t1b,
          "Bức tranh nằm NGOÀI ba dữ kiện bạn chắc chắn, nên mở bằng 'As far as I know' rồi hứa đi tra. Đừng đoán thêm tên hoạ sĩ hay năm vẽ. 'Know' /nəʊ/ — chữ k câm.",
          undefined,
          undefined,
          t1a,
        ),
        "As far as I know it is original, madam, but I would like to check that for you.",
        "As far as I know, it is, madam, but I will check that for you.",
      ),
      sp(
        "Please do. I find the whole house fascinating.",
        t1c,
        "Khách vừa dùng 'fascinating' cho ngôi nhà (đuôi -ing: VẬT gây cảm xúc), còn người thấy vui là bạn: 'I am delighted' (đuôi -ed: NGƯỜI cảm thấy). Rồi đóng bằng MỘT mốc giờ: 'by this evening'.",
        undefined,
        undefined,
        t1b,
      ),
      also(
        sp(
          "The ceiling looks brand new. Was it restored?",
          "Yes, sir, it was restored, and the craftsmen kept the original pattern.",
          "Câu ghép hai vế nối bằng 'and': vế đầu trả lời câu hỏi, vế sau thêm một chi tiết làm khách thích thú. Bị động 'it was restored' — was + V3. 'Restored' /rɪˈstɔːd/ — đuôi -ed đọc /d/, không thêm âm tiết.",
        ),
        "It was restored, sir, and the craftsmen kept the original pattern.",
      ),
      sp(
        "A guest asked me how old the hotel is. Can I just say about a hundred years?",
        "Please do not guess. Say the year from the history folder, and say it plainly.",
        "ĐỒNG NGHIỆP hỏi, nên không có sir hay madam. Một con số phỏng chừng sẽ lan đi như sự thật. Năm khai trương nằm trong 'the history folder' — nói đúng năm đó, và nói thẳng.",
        "colleague",
      ),
      sp(
        "Which part of the hotel are you most proud of?",
        "I am most proud of the library, madam, and the old photographs there are fascinating.",
        "Khách hỏi cảm xúc của chính bạn: trả lời bằng 'proud of' + một nơi, rồi 'and' + một lý do. Tính từ đuôi -ing như 'fascinating' nói về VẬT gây ra cảm xúc.",
      ),
    ],
    reading: read(
      `THREE FACTS, TOLD WITH FEELING
Guest Relations spends more time with a guest than any other desk, so the story of the house falls to you.
Know three facts exactly: the year the hotel opened, what the building was before, and one thing that was restored. The facts in this course belong to one hotel. Ask your Guest Relations Manager for your own three in your first week.
Say the three facts plainly, and add one feeling in the same sentence: "The staircase is original, and we are very proud of it." The fact gives the guest something to remember, and the feeling tells them it matters to you.
Anything beyond the three facts begins with "as far as I know". It costs nothing, and it shows the guest which part you are sure of.
Never fill a gap with a guess. A wrong date travels: the guest repeats it at dinner, and soon the house has a fact that nobody can find. Check the history folder at the front desk, and come back with the answer.
One more thing: a feeling must be true. If you call a room fascinating, be ready to say why.`,
      [
        {
          q: "Khách hỏi năm khách sạn khai trương — một trong ba dữ kiện bạn biết chắc. Bạn nói thế nào?",
          options: [
            "Mở bằng 'as far as I know' cho khiêm tốn",
            "Nói thẳng con số, rồi thêm một vế cảm xúc",
            "Hẹn khách tra the history folder rồi báo lại sau",
          ],
          correct: 1,
          explanation: `Bài đọc: "Say the three facts plainly, and add one feeling in the same sentence." Rào đón một dữ kiện chắc chắn làm khách nghĩ nhân viên chưa được dạy.`,
        },
        {
          q: "Vì sao không được đoán một năm cho có?",
          options: [
            "Vì quản lý sẽ kiểm tra lại từng câu bạn nói với khách",
            "Vì khách nào cũng đã đọc sách hướng dẫn du lịch",
            "Vì khách kể lại năm sai trong bữa tối, rồi nó thành dữ kiện không ai tra ra được",
          ],
          correct: 2,
          explanation: `Bài đọc: "A wrong date travels: the guest repeats it at dinner, and soon the house has a fact that nobody can find."`,
        },
        {
          q: "Ba dữ kiện trong khoá học này là của khách sạn nào?",
          options: [
            "Của một khách sạn — hãy hỏi quản lý dữ kiện nhà mình",
            "Của khách sạn nơi bạn làm, nên cứ học thuộc là đủ dùng",
            "Của mọi khách sạn trong cùng một tập đoàn",
          ],
          correct: 0,
          explanation: `Bài đọc: "The facts in this course belong to one hotel. Ask your Guest Relations Manager for your own three in your first week."`,
        },
      ],
    ),
    game: [
      round(
        "Were these tiles in the lobby here when the hotel first opened?",
        [
          ["I think so, sir — maybe they are older than the house, more or less.", "register"],
          [
            "They were, sir — the tiles are original, and the whole team is proud of them.",
            "answer",
          ],
          ["I think so, sir — maybe they is older than the house, more or less.", "form"],
        ],
        "Câu này đoán bừa tuổi của gạch lát — một câu đoán sẽ được khách kể lại như sự thật. Câu sai ngữ pháp cũng đoán bừa y như thế, lại thêm lỗi 'they is'; chủ ngữ số nhiều phải đi với 'are'. Đáp án nói thẳng dữ kiện chắc chắn rồi thêm một vế cảm xúc.",
      ),
      round(
        "A guest asked who painted the picture by the lift. I have no idea. What do I tell her?",
        [
          ["Tell her you would like to check, and give her an hour.", "answer"],
          ["Say it is by a famous French artist — guests love that kind of story.", "register"],
          ["Tell her you would like to checking, and give her a hour.", "form"],
        ],
        "Câu này bịa ra một hoạ sĩ nổi tiếng — chuyện bịa lan đi và không ai tra lại được. Câu sai ngữ pháp có hai lỗi: 'would like to checking' phải là 'to check', và 'a hour' phải là 'an hour'. Đáp án: nói thật là sẽ tra, và hẹn một mốc giờ.",
        "colleague",
      ),
    ],
  }),

  L(31, 2, "Offered, Not Delivered", "Mời nghe, chứ không kể tràn", {
    vocabulary: [
      c("The short version", "Would you like the short version, sir? It is three sentences.", [
        "/ðə ʃɔːt ˈvɜːʃn/",
        "bản kể ngắn",
        "⏱️",
      ]),
      c("Do stop me", "Do stop me whenever you like, madam.", [
        "/duː stɒp miː/",
        "cứ ngắt lời tôi bất cứ lúc nào",
        "✋",
      ]),
      c("Leave you to it", "I will leave you to it, sir. I am at the desk if you need me.", [
        "/liːv juː tuː ɪt/",
        "để khách tự nhiên, không làm phiền",
        "🚪",
      ]),
      c("Delighted", "We are delighted that you enjoyed the courtyard, madam.", [
        "/dɪˈlaɪtɪd/",
        "rất vui mừng",
        "😊",
      ]),
    ],
    grammar: [
      g(
        "Let me tell you about the history of this hotel.",
        "Would you like the short version, madam, or shall I leave you to it?",
        "Đừng mở bằng lời tuyên bố sẽ kể. Hỏi khách muốn nghe bao nhiêu, và cho sẵn một lối ra lịch sự. Cụm cố định là 'leave you TO it' — giới từ 'to', không phải 'for'.",
        "Would you like the short version, madam, or shall I leave you for it?",
      ),
      g(
        "Happy? Library also very interest.",
        "I am delighted you enjoyed it, sir, and the library is just as fascinating.",
        "Tính từ cảm xúc: đuôi -ED nói NGƯỜI cảm thấy gì (I am delighted), đuôi -ING nói VẬT gây ra cảm giác (the library is fascinating). Người Việt hay đảo hai đuôi này.",
        "I am delighting you enjoyed it, sir, and the library is just as fascinating.",
      ),
    ],
    speaking: [
      also(
        sp(
          "It is a beautiful room. Has it always looked like this?",
          t2a,
          "Trả lời câu hỏi TRƯỚC, rồi mới hỏi khách muốn nghe bao nhiêu. Vế 'or shall I leave you to it' cho khách một lối ra lịch sự. 'Version' /ˈvɜːʃn/ — trọng âm âm tiết đầu.",
        ),
        "Not always, madam. Would you like the short version, or shall I leave you to your coffee?",
      ),
      sp(
        "The short version, please.",
        t2b,
        "Bản ngắn là ba câu: một dữ kiện, một chi tiết, và câu cuối trao cho khách nút dừng: 'Do stop me'. Chữ 'Do' ở đây nhấn mạnh lời mời, không phải trợ động từ của câu hỏi.",
        undefined,
        undefined,
        t2a,
      ),
      also(
        sp(
          "That is lovely. I think that is enough history for one morning!",
          t2c,
          "Khách vừa bấm nút dừng — dừng ngay, và vui vẻ: 'I am delighted' (đuôi -ed: người cảm thấy). Đừng kể thêm 'một chi tiết cuối cùng'.",
          undefined,
          undefined,
          t2b,
        ),
        "I am delighted you enjoyed it, madam. I will leave you to it.",
      ),
      sp(
        "The couple in the lounge look bored. Should I go and tell them about the building?",
        "Offer it, do not start it. Ask if they would like the short version, and let them say no.",
        "ĐỒNG NGHIỆP hỏi. Hai mệnh lệnh ngắn rồi một câu về thái độ. Vế 'let them say no' giúp khách từ chối dễ dàng. Chữ offer /ˈɒfə/ — trọng âm âm tiết đầu.",
        "colleague",
      ),
      also(
        sp(
          "Go on, this is fascinating. What happened next?",
          "There is a great deal more, sir, so do stop me whenever you like.",
          "Khách muốn nghe tiếp — kể tiếp, nhưng trao lại nút dừng trong cùng một câu, nối bằng 'so'. Đừng quay lại kể từ đầu.",
        ),
        "There is much more, sir, so do stop me whenever you like.",
      ),
      sp(
        "Sorry, I am in the middle of a chapter.",
        "Of course, sir. I will leave you to it, and I am at the desk if you need anything.",
        "Khách đang đọc sách là khách không chờ nghe chuyện. Dừng ngay, nói 'I will leave you to it', và cho khách biết bạn ở đâu.",
      ),
    ],
    reading: read(
      `OFFERED, NOT DELIVERED
A story that a guest did not ask for is still an interruption, however politely it starts. So you offer it: "Would you like the short version?" That is six words, and the guest decides.
The short version is three sentences. The full story takes about four minutes, and four minutes is long for a guest with a cold coffee.
Give the guest a way to stop you before they need it. "Do stop me whenever you like" means they never have to interrupt you.
While you talk, watch two things: whether the guest is still looking at you, and whether they are still asking questions. If both stop, the story is over.
A guest who is reading, eating or on the telephone is not waiting for a story. Say "I will leave you to it, sir," and go back to the desk. No is a complete answer, and a guest should only have to say it once.`,
      [
        {
          q: "Bản ngắn của câu chuyện dài bao nhiêu?",
          options: ["Khoảng bốn phút", "Ba câu", "Tuỳ khách hỏi tới đâu"],
          correct: 1,
          explanation: `Bài đọc: "The short version is three sentences." Bản đầy đủ mất khoảng bốn phút — quá dài với một tách cà phê đang nguội.`,
        },
        {
          q: "Vì sao nên nói 'do stop me' trước khi kể?",
          options: [
            "Để mình có cớ dừng lại khi bận việc khác",
            "Để khách có sẵn lối dừng từ trước, không bao giờ phải ngắt lời bạn",
            "Để khách biết trước rằng câu chuyện sẽ rất dài",
          ],
          correct: 1,
          explanation: `Bài đọc: "Do stop me whenever you like" — khách không bao giờ phải ngắt lời bạn, nên không ai phải ngại.`,
        },
        {
          q: "Khách đang đọc sách trong lounge. Bạn làm gì?",
          options: [
            "Kể bản ngắn thôi cho khách đỡ phiền",
            "Đợi khách đọc xong rồi mời khách nghe bản ngắn",
            "Nói 'I will leave you to it' rồi quay về quầy",
          ],
          correct: 2,
          explanation: `Bài đọc: "A guest who is reading, eating or on the telephone is not waiting for a story."`,
        },
      ],
    ),
    game: [
      round(
        "That is fascinating. Please go on.",
        [
          ["Of course, madam. Let me start again from the very beginning, then.", "register"],
          ["There is more, madam — do stop me whenever you like.", "answer"],
          ["Of course, madam. Let me starting again from the very beginning, then.", "form"],
        ],
        "Câu này kể lại từ đầu — kể tràn, và khách không có nút dừng. Câu sai ngữ pháp cũng kể lại từ đầu như thế, lại dùng 'Let me starting'; sau 'let me' là động từ nguyên mẫu: 'let me start'. Đáp án kể tiếp nhưng trao cho khách nút dừng.",
      ),
      round(
        "The gentleman in the corner waved me away. Did I do something wrong?",
        [
          ["No. Leave him to it, and ask the lounge team to serve him without chatting.", "answer"],
          ["Try again when his drink arrives — most guests warm up after a while.", "register"],
          ["No. Leave him for it, and ask the lounge team to serve him without chat.", "form"],
        ],
        "Câu này bảo hỏi lại lần nữa — khách chỉ nên phải nói không MỘT lần. Câu sai ngữ pháp có hai lỗi: 'leave him for it' phải là 'leave him to it', 'without chat' phải là 'without chatting'. Đáp án để khách yên và nhờ tổ lounge phục vụ bình thường.",
        "colleague",
      ),
    ],
  }),
  L(31, 3, "One Place, One Time", "Một chỗ, một lúc — kể về trải nghiệm đặc trưng", {
    vocabulary: [
      c("Signature", "Our signature experience is afternoon tea in the library.", [
        "/ˈsɪɡnətʃə/",
        "đặc trưng, mang dấu ấn riêng của khách sạn",
        "🖋️",
      ]),
      c("Best seen at", "The courtyard is best seen at dusk, when the lanterns are lit.", [
        "/best siːn æt/",
        "đẹp nhất khi ngắm vào lúc",
        "🌇",
      ]),
      c("Peaceful", "The garden is peaceful in the early morning, sir.", [
        "/ˈpiːsfl/",
        "yên bình",
        "🕊️",
      ]),
      c("Memorable", "The cooking class is short, but guests find it memorable.", [
        "/ˈmemərəbl/",
        "đáng nhớ",
        "📸",
      ]),
      c("Not open to guests", "The kitchen is not open to guests, madam, for safety.", [
        "/nɒt ˈəʊpən tuː ɡests/",
        "không mở cho khách vào",
        "🚫",
      ]),
    ],
    grammar: [
      g(
        "Lantern lighting good. Come.",
        "The courtyard is best seen at dusk, sir, when the lanterns are lit.",
        "Mệnh đề 'when' nối thêm vế thứ hai để vẽ một bức tranh: MỘT chỗ, MỘT lúc. Bị động 'are lit' (được thắp) = be + V3; 'light' là động từ nguyên mẫu, không đứng sau 'are' ở đây.",
        "The courtyard is best seen at dusk, sir, when the lanterns are light.",
      ),
      g(
        "The kitchen is staff only.",
        "The kitchen is not open to guests, madam, but I can ask the chef to come out.",
        "Mỗi lời từ chối đi kèm một cánh cửa khác trong cùng một câu, nối bằng 'but'. Cụm cố định là 'open TO guests', không phải 'open for guests'.",
        "The kitchen is not open for guests, madam, but I can ask the chef to come out.",
      ),
    ],
    speaking: [
      also(
        sp(
          "We only have one evening here. What should we not miss?",
          t3a,
          "Một chỗ và một lúc, không đọc danh sách. Câu ghép hai vế nối bằng 'and': trải nghiệm đặc trưng, rồi lúc đẹp nhất — 'best seen at' + thời điểm. 'Signature' /ˈsɪɡnətʃə/ — trọng âm âm tiết đầu.",
        ),
        "Our signature experience is the lantern lighting, madam. The courtyard is best seen at dusk.",
      ),
      sp(
        "That sounds lovely. Is it very busy?",
        t3b,
        "Trả lời bằng một tính từ cảm xúc rồi nói lý do. 'Peaceful' /ˈpiːsfl/ — hai âm tiết, đuôi -ful đọc nhẹ.",
        undefined,
        undefined,
        t3a,
      ),
      also(
        sp(
          "Wonderful. Can you book us a table nearby for afterwards?",
          t3c,
          "Bạn kể và gợi ý; đặt bàn là việc của 'the concierge desk'. Đừng nói 'I will book it' — dẫn khách tới tận quầy và giới thiệu.",
          undefined,
          ["concierge", "desk"],
          t3b,
        ),
        "The concierge desk books tables, madam. I will take you over to them now.",
      ),
      also(
        sp(
          "Can we see the kitchen? We are both chefs at home.",
          "The kitchen is not open to guests, sir, but I can ask the chef to come out and meet you.",
          "Mỗi lời từ chối đi kèm một cánh cửa khác trong cùng một câu, nối bằng 'but'. Bạn XIN bếp trưởng ra chào — đừng hẹn giờ thay ông ấy.",
        ),
        "The kitchen is not open to guests, sir, but I can ask the chef to come out.",
      ),
      sp(
        "Is the cooking class worth it? It is quite expensive.",
        "It is short, sir, but most guests find it memorable, because they cook side by side with the chef.",
        "Đừng bàn giá — nói giá trị: một tính từ cảm xúc như 'memorable', rồi một lý do cụ thể với 'because'.",
      ),
      sp(
        "A guest wants to see the ballroom, but a wedding is being set up. What do I say?",
        "It is not ours to open. Show the guest from the door, and ask the banquet team.",
        "ĐỒNG NGHIỆP hỏi. Phòng tiệc trống hôm nay thường là phòng đang dựng cho ngày mai, và chìa khoá do bộ phận tiệc giữ. Cho khách xem từ cửa là đủ.",
        "colleague",
      ),
    ],
    reading: read(
      `ONE PLACE, ONE TIME
A guest before dinner has fifteen minutes, not an afternoon. So give one place and one time, not a list of nine things.
Every house has a signature experience. Here it is the lantern lighting in the courtyard. It is best seen at dusk, when the staff light the lanterns one by one and the courtyard turns gold.
Tell it as a picture: what the guest will see, and how it will feel. Words like "peaceful" and "memorable" stay with a guest longer than any price.
Some places you may show, and some you may only describe. The lobby, the library and the garden are yours to show. The kitchen is not open to guests, so offer to ask the chef to come out instead. The ballroom is not yours to open, because the banquet team holds the keys.
And you describe; you do not book. A table, a boat or a city tour belongs to the concierge desk. Walk the guest over, and introduce them by name.`,
      [
        {
          q: "Khách chỉ có mười lăm phút trước bữa tối. Bạn gợi ý thế nào?",
          options: [
            "Một danh sách đầy đủ để khách tự chọn theo ý thích",
            "Một chỗ và một lúc, kể như một bức tranh",
            "Ba gợi ý xếp theo thứ tự giá từ thấp tới cao",
          ],
          correct: 1,
          explanation: `Bài đọc: "So give one place and one time, not a list of nine things."`,
        },
        {
          q: "Khách muốn xem phòng khiêu vũ. Ai giữ chìa khoá?",
          options: [
            "Bộ phận tiệc (the banquet team) — phòng khiêu vũ không phải của bạn mở",
            "Duty Manager, vì mọi khu vực chung là của ông ấy",
            "Guest Relations, vì phòng đang trống",
          ],
          correct: 0,
          explanation: `Bài đọc: "The ballroom is not yours to open, because the banquet team holds the keys."`,
        },
        {
          q: "Khách nhờ đặt bàn ăn tối sau buổi thắp đèn. Ai đặt?",
          options: [
            "Bạn tự đặt luôn cho nhanh, rồi báo lại cho khách sau",
            "Khách tự gọi điện tới nhà hàng",
            "The concierge desk",
          ],
          correct: 2,
          explanation: `Bài đọc: "A table, a boat or a city tour belongs to the concierge desk." Bạn dẫn khách tới quầy và giới thiệu.`,
        },
      ],
    ),
    game: [
      round(
        "What is special about this hotel in the evening?",
        [
          [
            "There is the spa, the bar, the pool, the library and the night market, madam.",
            "register",
          ],
          ["The lantern lighting, madam. The courtyard is best seen at dusk.", "answer"],
          ["The lantern lighting, madam. The courtyard is best seeing at dusk.", "form"],
        ],
        "Câu này đọc một danh sách — khách hỏi điều đặc biệt chứ không xin một thực đơn. Câu sai ngữ pháp dùng 'best seeing'; phải là 'best seen' (bị động). Đáp án cho khách một chỗ và một lúc.",
      ),
      round(
        "We are both chefs. Could we have a quick look in your kitchen?",
        [
          ["Of course, sir. Follow me — the chef will not mind a short visit.", "register"],
          ["Of course, sir. Follow me — the chef will not minds a short visit.", "form"],
          [
            "I am afraid it is not open to guests, sir, but I can ask the chef to come out.",
            "answer",
          ],
        ],
        "Câu này tự đưa khách vào bếp — khu vực không mở cho khách vì an toàn và vệ sinh. Câu sai ngữ pháp cũng dẫn khách vào bếp y như thế, lại dùng 'will not minds'; sau 'will not' là động từ nguyên mẫu: 'will not mind'. Đáp án từ chối rồi mở một cánh cửa khác.",
      ),
    ],
  }),

  L(31, 4, "Not Part of the Story", "Những chuyện không bao giờ được kể", {
    vocabulary: [
      c("Not part of the story", "Other guests are not part of the story, sir.", [
        "/nɒt pɑːt əv ðə ˈstɔːri/",
        "không thuộc câu chuyện được kể (chuyện của khách khác)",
        "🤐",
      ]),
      c("I would rather find out", "I would rather find out than guess, madam.", [
        "/aɪ wʊd ˈrɑːðə faɪnd aʊt/",
        "tôi muốn tra cho chắc hơn là đoán",
        "🔍",
      ]),
      c("The history folder", "The history folder at the front desk holds every date, sir.", [
        "/ðə ˈhɪstri ˈfəʊldə/",
        "tập hồ sơ lịch sử của khách sạn",
        "📂",
      ]),
      c("I cannot connect you", "I am afraid I cannot connect you, madam. May I take a message?", [
        "/aɪ ˈkænɒt kəˈnekt juː/",
        "tôi không thể nối máy cho quý khách",
        "📞",
      ]),
    ],
    grammar: [
      g(
        "Yes, a famous actor stayed in your room.",
        "Other guests are not part of the story, madam, but may I show you the history folder?",
        "Tên của khách khác KHÔNG BAO GIỜ là một phần câu chuyện — kể cả khách đã trả phòng từ lâu. Từ chối bằng một câu, rồi đưa khách một thứ khác: lịch sử của toà nhà. Nhớ mạo từ: 'part of THE story'.",
        "Other guests are not part of story, madam, but may I show you the history folder?",
      ),
      g(
        "It is probably from the French period.",
        "I would rather find out than guess, sir. I will have it for you by this evening.",
        "'Would rather + động từ nguyên mẫu + than': KHÔNG có 'to' sau 'would rather'. Nói thật là mình muốn tra, rồi gắn MỘT mốc giờ.",
        "I would rather to find out than guess, sir. I will have it for you by this evening.",
      ),
    ],
    speaking: [
      risk(
        also(
          sp(
            "Come on, you can tell me. Which famous people have stayed here?",
            t4a,
            "Một câu từ chối, rồi một món quà: lịch sử của toà nhà. Đừng nói 'I cannot say' — nghe như đang giấu một cái tên. 'Not part of the story' đúng cả với khách đã trả phòng từ lâu.",
          ),
          "Other guests are not part of the story, madam. May I show you the history folder instead?",
          "I am not able to talk about other guests, madam, but may I show you the history folder?",
        ),
      ),
      risk(
        also(
          sp(
            "Not even someone from years ago?",
            t4b,
            "Luật riêng tư không hết hạn khi khách trả phòng. Trả lời 'No' rồi gọi luật bằng đúng tên của nó: 'the guest privacy rule'. Đừng thêm 'sorry' hay giải thích dài.",
            undefined,
            ["guest", "privacy", "rule"],
            t4a,
          ),
          "Not even then, madam. The guest privacy rule does not end at check-out.",
          "No, madam. The guest privacy rule does not end when a guest checks out.",
        ),
      ),
      sp(
        "All right. Then tell me who built the house.",
        t4c,
        "Bạn không chắc, nên nói thật: 'I would rather find out'. Sau 'would rather' là động từ nguyên mẫu KHÔNG có 'to'. Rồi làm ngay một việc: mang the history folder tới.",
        undefined,
        undefined,
        t4b,
      ),
      also(
        sp(
          "My friend is in 1806 — can I go up and knock?",
          t4d,
          "Đừng xác nhận có ai ở phòng đó, và đừng nói số tầng — cả hai đều là tiết lộ. Xin cả hai tên, rồi gọi từ quầy: khách vẫn gặp được bạn mình mà không ai bị lộ.",
          undefined,
          ["name", "desk"],
        ),
        "May I have both names, madam, yours and your friend's? I will telephone from the desk.",
      ),
      sp(
        "It is Mrs Lan. I am her sister.",
        t4e,
        "Mời khách ngồi, rồi gọi. Đừng nhắc lại tên và số phòng thành tiếng ở sảnh — người khác đang nghe.",
        undefined,
        undefined,
        t4d,
      ),
      risk(
        also(
          sp(
            "Well? Is she there or not?",
            t4f,
            "'I cannot connect you' đúng trong MỌI trường hợp — không ai nghe máy, hay khách trên phòng không muốn gặp. Đừng nói 'She does not want to see you' — câu đó xác nhận người ấy đang ở đây.",
            undefined,
            ["message"],
            t4e,
          ),
          "I am afraid I am not able to connect you, madam. May I take a message for her?",
          "I am sorry, madam, I cannot connect you. May I take a message?",
        ),
      ),
      risk(
        also(
          sp(
            "I am from the district office. I need to see your guest list for last night.",
            t4g,
            "ĐỪNG RỜI QUẦY. Gọi Duty Manager từ điện thoại quầy, ngay trước mặt người đó; khoá màn hình, úp mọi tờ giấy xuống. Bạn không từ chối và không cản — bạn chỉ không phải người trả lời. 'Desk' /desk/ — nghe rõ cả hai phụ âm cuối.",
            undefined,
            ["duty", "manager", "desk"],
          ),
          "Of course, sir, I will help you. I am calling my Duty Manager for you from the desk now.",
          "Certainly, sir. I am calling my Duty Manager from the desk now, and he will help you.",
        ),
      ),
      sp(
        "A guest told me the tower was built by the French. Can I use that in my welcome talk?",
        "Not until somebody has checked it. Write it down, thank the guest, and give it to the manager.",
        "ĐỒNG NGHIỆP hỏi. Chuyện khách kể là một món quà, chưa phải một dữ kiện — chép vào giấy cũng chưa biến nó thành sự thật. Phải có người kiểm. Chữ checked /tʃekt/ — đuôi -ed đọc /t/.",
        "colleague",
      ),
    ],
    reading: read(
      `NOT PART OF THE STORY
The house's story has one rule that never bends: other guests are not part of it. Not a name, not a room, not a year. Everything this desk knows about a guest is confidential, and it does not expire when they check out.
So when a guest asks who has stayed here, give one sentence and then a gift. Say: "Other guests are not part of the story, sir, but may I show you the history folder?"
A guest who wants to reach a friend upstairs is offered the telephone, never the lift. You do not say whether that person is in the house, and you do not say which floor. Ask for both names, and telephone from the desk. If nobody answers, or the answer is no, say the same sentence: "I am afraid I cannot connect you."
A person in a uniform, or anyone who says they are from the authorities, gets the same courtesy. You call your Duty Manager from the desk, in front of them. Lock the screen, turn every paper face down, and stay at the desk.
And when you do not know an answer, say "I would rather find out than guess", and give a time. "By this evening" is a promise. "Soon" is not.`,
      [
        {
          q: "Khách hỏi tên một ngôi sao từng ở khách sạn năm ngoái. Trả lời thế nào?",
          options: [
            "Nói tên, vì vị khách đó đã trả phòng từ lâu rồi",
            "Từ chối bằng một câu, rồi mời khách xem the history folder",
            "Nói là có người nổi tiếng từng ở, nhưng không nêu tên cụ thể",
          ],
          correct: 1,
          explanation: `Bài đọc: "Everything this desk knows about a guest is confidential, and it does not expire when they check out."`,
        },
        {
          q: "Gọi lên phòng mà không ai nghe máy. Bạn nói gì với người đang đợi ở sảnh?",
          options: [
            "'I am afraid I cannot connect you'",
            "'There is nobody in that room at the moment'",
            "'She does not want to see anybody right now'",
          ],
          correct: 0,
          explanation: `Bài đọc: "If nobody answers, or the answer is no, say the same sentence" — câu đó đúng trong mọi trường hợp và không xác nhận ai đang ở đây.`,
        },
        {
          q: "Một người nói mình từ cơ quan chức năng, đòi xem danh sách khách. Làm gì?",
          options: [
            "Rời quầy để đi tìm Duty Manager cho nhanh, nhờ họ đứng đợi",
            "Gọi Duty Manager từ quầy, ngay trước mặt họ, rồi khoá màn hình và úp giấy xuống",
            "Cho xem danh sách, vì họ mặc đồng phục",
          ],
          correct: 1,
          explanation: `Bài đọc: "You call your Duty Manager from the desk, in front of them. Lock the screen, turn every paper face down, and stay at the desk." Rời quầy là để màn hình và giấy tờ không ai trông.`,
        },
      ],
    ),
    game: [
      round(
        "Come on — which suite did the film crew take last month?",
        [
          [
            "The film crew were on the top floor, madam, but I really should not say more.",
            "register",
          ],
          ["That is not part of the story, madam. May I help with anything else?", "answer"],
          ["That is not part of the story, madam. May I helping with anything else?", "form"],
        ],
        "Câu này vẫn lộ tầng của đoàn làm phim — lộ một nửa vẫn là lộ. Câu sai ngữ pháp dùng 'May I helping'; sau 'may' là động từ nguyên mẫu: 'May I help'. Đáp án từ chối gọn rồi mở lời giúp việc khác.",
      ),
      round(
        "Can I just say the tower is about a hundred years old? It roughly is.",
        [
          ["No. Say what the history folder says, and check the rest.", "answer"],
          [
            "Yes, roughly is fine — nobody ever checks the dates in a welcome talk anyway.",
            "register",
          ],
          ["Yes, roughly is fine — nobody ever check the dates in a welcome talk anyway.", "form"],
        ],
        "Câu này cho phép nói con số phỏng chừng — con số đoán sẽ lan đi như sự thật. Câu sai ngữ pháp cũng cho đoán y như thế, lại thiếu -s: 'nobody' đi với động từ số ít, nên phải là 'nobody ever checks'. Đáp án: nói đúng điều hồ sơ ghi, phần còn lại thì đi tra.",
        "colleague",
      ),
    ],
  }),
];

export const week: AuthoredWeek = {
  title: { en: "Telling the Story of the House", vi: "Kể chuyện về khách sạn và dịch vụ" },
  canDo:
    "Nói được: kể ngắn về khách sạn và một trải nghiệm đặc trưng bằng câu ghép hai, ba vế có tính từ cảm xúc; mời khách nghe bản ngắn thay vì kể tràn; nói thật khi chưa biết và hẹn giờ trả lời; không bao giờ đưa chuyện của khách khác vào câu chuyện.",
  lessons,
};
