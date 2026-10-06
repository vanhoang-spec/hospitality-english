// GR week 40 — review and checkpoint week: one full shift at the desk.
//
// Rewritten after the first blind round of the reopened Phase 4 (7ed3254).
// The old week talked about the course ("Forty weeks ago…", "what I got
// wrong in my first month"), described the checkpoint wrongly ("Four of the
// twenty are heard"), and taught a medical script the medical week
// contradicted. Now:
//  · no new rule and no word about the course or the test: four lessons that
//    follow one Guest Relations officer, Hoa, through a Saturday shift —
//    the afternoon, a complaint before dinner, the evening that goes wrong,
//    and the last fifteen minutes;
//  · every card re-presents a headword from weeks 31-39 in a new sentence
//    (the kit finds the gloss of the week that taught it);
//  · every turn uses the rule the earlier week taught, unchanged: the
//    medical script ("Is he breathing?"), the stairs, the next update,
//    danger first, money and gifts to the manager or the Duty Manager, the
//    allergy slip every time, nobody's stay confirmed, nothing new opened at
//    the end of a shift.
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

// ── Lesson 1 — Saturday afternoon ──────────────────────────────────────────
const t1a =
  "Of course, madam. Shall we keep it a surprise, so that I can be discreet and speak only to you?";
const t1b =
  "Before I order it, may I ask about allergies at the table? I will write an allergy slip for the pastry chef.";
const t1c = "Only with your permission, madam. Shall I put his birthday on your file?";

// ── Lesson 2 — a complaint before dinner ───────────────────────────────────
const t2a = "I am sorry that happened, sir, on such a special occasion. Please take me through it.";
const t2b = "Do you remember who took it, sir? I am writing it all down.";
const t2c =
  "I am asking the restaurant now, sir, as the table is theirs to give. Let me check with my manager about the dinner.";
const t2d =
  "I am asking, not promising, sir. What I can do meanwhile is find you a quiet seat in the lounge.";

// ── Lesson 3 — the evening goes wrong ──────────────────────────────────────
const t3a =
  "Please stay indoors, away from the windows, madam. The next update is within the hour, at the lounge desk.";
const t3b =
  "I do not know that yet, madam. If there is a power cut, you will find a torch in your wardrobe.";
const t3c =
  "As a precaution, please use the stairs tonight, madam. The generator keeps the stair lights on.";

// ── Lesson 4 — before you go home ──────────────────────────────────────────
const t4a =
  "Thank you for telling us, madam. I am writing it down and handing it over by name now.";
const t4b = "Yes, madam. I am writing down what you want, in your own words, for my colleague.";
const t4c = "That is my Duty Manager's decision, madam, and I am taking it to her before I leave.";

const lessons = [
  L(40, 1, "Saturday Afternoon", "Chiều thứ Bảy ở quầy", {
    vocabulary: [
      c("As far as I know", "As far as I know, the painting in the lobby is original."),
      c("Since you mentioned", "Since you mentioned the long drive, I would keep tonight quiet."),
      c("Only with your permission", "His birthday goes on the file only with your permission."),
      c("Keep it a surprise", "She would like to keep it a surprise, so call her mobile."),
      c("Allergy slip", "One allergy slip goes to the pastry chef before the cake."),
    ],
    grammar: [
      g(
        "Built by a French family, I think, a long time ago.",
        "As far as I know, the fountain is original, sir, but I would rather check.",
        "Ngoài vài dữ kiện chắc chắn thì mở bằng 'As far as I know', rồi đi tra — đừng bịa một năm hay một cái tên. Sau 'would rather' là động từ nguyên mẫu KHÔNG có 'to': 'would rather check'.",
        "As far as I know, the fountain is original, sir, but I would rather to check.",
      ),
      g(
        "You look tired, sir, so you should go to the spa.",
        "Since you mentioned the long drive, sir, would a quiet table at seven suit you?",
        "Gợi ý mọc ra từ điều khách ĐÃ NÓI, không phải từ điều bạn thấy ở khách. 'Since you mentioned' + danh từ — không có 'about' sau 'mentioned'.",
        "Since you mentioned about the long drive, sir, would a quiet table at seven suit you?",
      ),
    ],
    speaking: [
      also(
        sp(
          "It is my husband's birthday tomorrow. Can you help me plan something?",
          t1a,
          "Bất ngờ là của người lên kế hoạch: hỏi có giữ bí mật không — 'keep it a surprise' — rồi hứa 'discreet': từ đó chỉ liên lạc với chính người này.",
          undefined,
          ["keep", "surprise", "speak"],
        ),
        "Of course, madam. Shall we keep it a surprise, so that I speak only to you?",
      ),
      risk(
        also(
          sp(
            "Yes, please. A small cake at dinner, I think.",
            t1b,
            "Trước khi đặt bánh: hỏi dị ứng của mọi người ở bàn, rồi 'an allergy slip' tới tay bếp bánh. Đây là việc an toàn, không phải phép lịch sự.",
            undefined,
            ["order", "ask", "allergies", "table", "write", "allergy", "slip", "pastry", "chef"],
            t1a,
          ),
          "Before I order it, may I ask about allergies at the table? I will write an allergy slip for the pastry chef now.",
          "Before I order the cake, may I ask about allergies at the table? I will write an allergy slip for the pastry chef.",
          "Before I order it, does anyone at the table have any allergies? I will write an allergy slip for the pastry chef.",
          "Before I order it, does anyone at the table have an allergy? I will write an allergy slip for the pastry chef.",
          "Of course, madam. Before I order it, does anyone at the table have an allergy?",
        ),
      ),
      sp(
        "He cannot eat nuts. And can you remember his birthday for next year?",
        t1c,
        "Dị ứng đã vào phiếu cho bếp. Còn phần LƯU cho năm sau cần khách đồng ý: 'Only with your permission' — và bạn hỏi về ngày sinh nhật, không hỏi thêm về sức khoẻ.",
        undefined,
        ["permission", "birthday", "file"],
        t1b,
      ),
      also(
        sp(
          "Is that painting in the lobby an original?",
          "As far as I know, it is original, sir, but I would rather check the history folder than guess.",
          "Bạn không chắc: 'As far as I know' cho người nghe biết phần nào bạn chắc, rồi câu đã học — 'I would rather check' — tra 'the history folder' thay cho một câu đoán.",
          undefined,
          ["far", "know", "rather"],
        ),
        "As far as I know, it is original, sir, but I would rather find out than guess.",
        "As far as I know, it is, sir, but I would rather find out than guess.",
      ),
      also(
        sp(
          "We drove six hours today. Any ideas for a quiet evening?",
          "Since you mentioned the long drive, madam, I would keep it low-key, with dinner in the garden. Would that suit you?",
          "Mở bằng chính lời khách — 'Since you mentioned' — rồi MỘT gợi ý với 'I would' ('low-key': nhẹ nhàng, yên tĩnh), và trả quyền quyết định: 'Would that suit you?'.",
          undefined,
          ["since", "mentioned", "dinner", "garden", "suit"],
        ),
        "Since you mentioned the long drive, madam, I would take dinner in the garden. Would that suit you?",
        "Since you mentioned the long drive, madam, I would have dinner in the garden. Would that suit you?",
      ),
      sp(
        "It is our first time here. What should we not miss tonight?",
        "As this is your first stay, madam, I would not miss our signature lantern lighting. It is best seen at dusk.",
        "Khách lần đầu thì hồ sơ trống — nói thẳng điều đó bằng 'As this is your first stay', rồi MỘT gợi ý: 'our signature' — trải nghiệm đặc trưng — kèm một mốc: 'best seen at dusk'.",
        undefined,
        ["this", "first", "stay", "signature"],
      ),
      also(
        sp(
          "We are back for the third time! The same as always, please.",
          "Welcome back, madam. Is everything still the same, or has anything changed since your last stay?",
          "Khách quay lại nói 'như mọi lần' — vẫn hỏi một câu trước khi làm theo hồ sơ: 'still the same', hay 'has anything changed'. Hồ sơ cũ có thể đã sai.",
        ),
        "Welcome back, madam. Is it all still the same, or has anything changed since your last stay?",
      ),
      risk(
        also(
          sp(
            "This is Mr Tan's office. Is he staying with you this weekend?",
            "I am afraid I cannot confirm who is staying here, madam, but I can take a message.",
            "Người gọi tự giới thiệu là văn phòng của khách vẫn chỉ là một người gọi. Không xác nhận, không phủ nhận — 'I cannot confirm' — rồi nhận lời nhắn: lời nhắn không xác nhận ai đang ở đây.",
            undefined,
            ["confirm", "staying", "take", "message"],
          ),
          "I am sorry, I cannot confirm who is staying here, madam, but I can take a message.",
          "I am afraid I am not able to confirm who is staying here, madam, but I can take a message.",
          "I cannot confirm who is staying with us, madam, but I can take a message.",
          "I am afraid I cannot confirm who is staying here, madam. Would you like to leave a message?",
        ),
      ),
    ],
    reading: read(
      `SATURDAY AFTERNOON
Hoa starts at two. By half past, a guest is standing under the painting in the lobby, asking whether it is original. Hoa knows the three facts of the house, and the painting is not one of them. "As far as I know, it is original, sir, but I would rather check the history folder than guess." The folder has the answer, and she brings it to him before four.
At three, a couple who have driven six hours ask for ideas. Hoa does not look at them and guess. She uses what they said: "Since you mentioned the long drive, I would keep it low-key, with dinner in the garden." They say yes, and the concierge desk books the table.
At four, Mrs Hall asks for help with her husband's birthday. Hoa asks one question first: "Shall we keep it a surprise?" Then, before she orders a cake, she asks about allergies at the table. Mr Hall cannot eat nuts, so an allergy slip goes into the pastry chef's hand at once.
At five, a caller says she is from Mr Tan's office and asks if Mr Tan is staying. Hoa cannot confirm who is staying, so she offers to take a message.`,
      [
        {
          q: "Khách hỏi bức tranh có phải bản gốc không, và Hoa không chắc. Hoa làm gì?",
          options: [
            "Nói là bản gốc, vì khách sạn cũ thường có tranh cũ",
            "Mở bằng 'As far as I know', rồi đi tra trong the history folder",
            "Nói rằng mình không biết, và để khách tự tìm hiểu thêm trên mạng",
          ],
          correct: 1,
          explanation: `Bài đọc: "'As far as I know, it is original, sir, but I would rather check the history folder than guess.' The folder has the answer."`,
        },
        {
          q: "Trước khi đặt bánh sinh nhật, Hoa làm gì?",
          options: [
            "Hỏi về dị ứng của mọi người ở bàn",
            "Báo giá chiếc bánh cho khách trước để khách quyết định có đặt hay không",
            "Ghi ngày sinh nhật vào hồ sơ của khách",
          ],
          correct: 0,
          explanation: `Bài đọc: "before she orders a cake, she asks about allergies at the table… an allergy slip goes into the pastry chef's hand at once."`,
        },
        {
          q: "Người gọi nói là văn phòng của ông Tan. Hoa trả lời thế nào?",
          options: [
            "Xác nhận ông Tan đang ở, vì đó là văn phòng của chính ông",
            "Nối máy thẳng lên phòng ông Tan cho nhanh",
            "Không xác nhận ai đang ở, và nhận lời nhắn",
          ],
          correct: 2,
          explanation: `Bài đọc: "Hoa cannot confirm who is staying, so she offers to take a message."`,
        },
      ],
    ),
    game: [
      round(
        "Mrs Hall wants a chocolate birthday cake. Shall I just order it now?",
        [
          ["Not before we ask about allergies at the table and write the slip.", "answer"],
          ["Order it now — hardly anybody is allergic to chocolate anyway.", "register"],
          ["Not before we ask about allergies at the table and writing the slip.", "form"],
        ],
        "Câu này tự đoán là bánh an toàn — dị ứng thì phải hỏi, không bao giờ đoán thay khách. Câu sai ngữ pháp dùng 'and writing'; hai động từ nối bằng 'and' sau 'we' phải cùng dạng: 'ask… and write'. Đáp án: hỏi dị ứng của mọi người ở bàn và viết phiếu cho bếp, rồi mới đặt bánh.",
        "colleague",
      ),
      round(
        "This is his company calling. Has Mr Binh checked out yet, or is he still with you?",
        [
          [
            "He is still with us until Sunday, sir — shall I put you through to his room?",
            "register",
          ],
          ["I cannot confirm that, sir, but I can take a message for him.", "answer"],
          ["He is still with us until Sunday, sir — shall I put you through his room?", "form"],
        ],
        "Câu này xác nhận khách đang ở, lộ cả ngày đi, rồi còn đề nghị nối máy — lộ thông tin với một người chỉ tự xưng. Câu sai ngữ pháp cũng lộ thông tin y như thế, lại thiếu 'to': 'put you through TO his room'. Đáp án không xác nhận, và nhận lời nhắn.",
      ),
    ],
  }),

  L(40, 2, "A Complaint Before Dinner", "Một khiếu nại trước giờ ăn tối", {
    vocabulary: [
      c("Take me through it", "Please take me through it from the start, sir."),
      c("I am sorry that happened", "I am sorry that happened on your anniversary, madam."),
      c("Let me check with my manager", "A free dinner? Let me check with my manager first."),
      c("The part I cannot move", "The room charge is the part I cannot move tonight."),
    ],
    grammar: [
      g(
        "What is your problem exactly?",
        "Please take me through it from the start, sir, and I will write everything down.",
        "Mời khách kể từ đầu thay vì bắt khách tóm tắt lúc đang giận — rồi ghi lại. Sau 'will' là động từ nguyên mẫu: 'will write', không phải 'will writing'.",
        "Please take me through it from the start, sir, and I will writing everything down.",
      ),
      g(
        "Fine, I give you everything you want.",
        "The table I can ask for; however, the room charge is the part I cannot move.",
        "Vế làm được đặt trước, rồi 'however', rồi đúng một vế không dời. Sau 'cannot' là động từ nguyên mẫu KHÔNG có 'to': 'the part I cannot move', không phải 'cannot to move'.",
        "The table I can ask for; however, the room charge is the part I cannot to move.",
      ),
    ],
    speaking: [
      sp(
        "Your restaurant lost our booking for tonight, and it is our anniversary.",
        t2a,
        "Bước một và hai: xin lỗi về SỰ VIỆC — 'I am sorry that happened', lại đúng vào 'a special occasion' — không nhận lỗi, không đổ cho ai; rồi mời khách kể từ đầu: 'take me through it'.",
        undefined,
        ["sorry", "happened", "special", "take", "through"],
      ),
      sp(
        "We booked on Monday, by phone. Now they say there is no record at all.",
        t2b,
        "Khách đã cho ba dữ kiện: hứa gì, khi nào, thực tế ra sao. Còn thiếu AI — hỏi đúng câu đó, rồi cho khách thấy bạn đang ghi: 'writing it all down'.",
        undefined,
        ["remember", "writing", "down"],
        t2a,
      ),
      also(
        sp(
          "A young man, I think. Look, we want a table tonight, and dinner on the house.",
          t2c,
          "Tách hai việc: cái bàn là của nhà hàng — 'theirs to give', bạn đang xin; bữa tối miễn phí là của quản lý — 'Let me check with my manager'. Không hứa phần nào.",
          undefined,
          ["asking", "restaurant", "table", "check", "manager", "dinner"],
          t2b,
        ),
        "I am asking the restaurant for a table now, sir, and let me check with my manager about the dinner.",
        "I am asking the restaurant for a table now, sir. Let me check with my manager about the dinner.",
      ),
      sp(
        "So that is a yes to both? We are starving.",
        t2d,
        "Khách muốn nghe chữ 'có'. Nói thật: 'I am asking, not promising'. Rồi một việc bạn làm được NGAY trong lúc chờ: 'What I can do meanwhile'.",
        undefined,
        undefined,
        t2c,
      ),
      risk(
        also(
          sp(
            "If dinner is not free, then take tonight's room charge off our bill.",
            "The room charge is the part I cannot move, sir. My Duty Manager decides that, today.",
            "Tiền trên hoá đơn là của Duty Manager — với bạn, đó là 'the part I cannot move'. Nói rõ ai quyết và khi nào, không nêu con số, không hứa.",
            undefined,
            ["room", "charge", "part", "move", "duty", "manager", "decides", "today"],
          ),
          "I am afraid the room charge is the part I cannot move, sir. My Duty Manager decides that, today.",
          "The room charge is the part I cannot move, sir. My Duty Manager will decide that today.",
          "The room charge is the part I cannot move, sir. That is my Duty Manager's decision, today.",
        ),
      ),
      also(
        sp(
          "He keeps asking which of us lost the booking. Shall I tell him it was the new boy?",
          "Not a name, not a team. Tell him how we will put it right.",
          "ĐỒNG NGHIỆP hỏi. 'Not a name, not a team' trước mặt khách — nguyên nhân là việc của sổ khiếu nại. Khách cần nghe việc đang được sửa: 'put it right'.",
          "colleague",
          ["right", "name"],
        ),
        "No. Tell him what we are putting right, and leave the name out of it.",
      ),
      sp(
        "Will we get any of this in writing, or just your word again?",
        "In writing, sir, before you go up to dinner: a copy for you and one on the file.",
        "Khách đã bị lỡ hẹn một lần thì không nhận lời hứa miệng lần hai. Đưa thứ khách cầm được: 'In writing', 'a copy for you'.",
        undefined,
        ["writing", "copy", "file"],
      ),
      also(
        sp(
          "We have a table now. So is that the end of it?",
          "I will close the case once you agree it is right, sir. I will check with you after dinner.",
          "Hồ sơ khiếu nại đóng khi KHÁCH nói đã ổn — 'once you agree' — không phải khi có bàn. Hẹn một lần hỏi lại của chính bạn.",
          undefined,
          ["right", "check", "dinner"],
        ),
        "Only when you tell me it is right, sir. I will check with you after dinner.",
        "Only when you tell me it is right, sir. I will check with you after your dinner.",
      ),
      sp(
        "Thank you. It has turned into a lovely anniversary after all.",
        "I am delighted, sir. On behalf of everyone at the hotel, warmest congratulations on your anniversary.",
        "Khép lại bằng lời chúc trang trọng đã học: 'On behalf of' cả khách sạn, rồi 'warmest congratulations' — không kèm quà hay lời hứa nào.",
      ),
    ],
    reading: read(
      `A COMPLAINT BEFORE DINNER
At half past six, Mr and Mrs Hall come back to the desk. The restaurant has no record of their table, and tonight is their anniversary.
Hoa does not ask what the problem is. She says, "I am sorry that happened, sir," and asks them to take her through it. She writes while they talk: a table for eight, booked by phone on Monday, and now no record. Only one fact is missing, so she asks who took the booking.
Mr Hall wants two things: a table tonight, and dinner on the house. Hoa separates them. The table is the restaurant's to give, so she asks the restaurant at once. The free dinner is her manager's to give, so she does not promise it. When Mr Hall asks for the room charge to come off instead, she says it is the part she cannot move. Money off the bill is the Duty Manager's.
A colleague wants to tell Mr Hall which waiter lost the booking. Hoa says no. No name and no team goes to a guest as the cause.
Before the Halls go up, they have it in writing, with a copy for them. The case stays open until they say it is right.`,
      [
        {
          q: "Hoa hỏi thêm dữ kiện nào sau khi nghe khách kể?",
          options: [
            "Ai là người đã nhận đặt bàn",
            "Số tiền khách muốn được bồi thường cho buổi tối",
            "Khách đã đặt bàn ở nhà hàng này bao nhiêu lần",
          ],
          correct: 0,
          explanation: `Bài đọc: "Only one fact is missing, so she asks who took the booking."`,
        },
        {
          q: "Khách đòi trừ tiền phòng đêm nay. Ai quyết định?",
          options: [
            "Nhà hàng, vì nhà hàng làm mất bàn",
            "Hoa, nếu khách đã chờ quá lâu ở quầy",
            "Duty Manager — Hoa nói đó là phần mình không dời được",
          ],
          correct: 2,
          explanation: `Bài đọc: "she says it is the part she cannot move. Money off the bill is the Duty Manager's."`,
        },
        {
          q: "Một đồng nghiệp muốn nói cho khách biết người phục vụ nào làm mất bàn. Hoa làm gì?",
          options: [
            "Đồng ý, vì khách có quyền được biết ai trong nhà hàng đã làm sai",
            "Không cho — không nêu tên người hay bộ phận trước mặt khách",
            "Để chính người phục vụ đó ra tận quầy xin lỗi khách cho rõ ràng",
          ],
          correct: 1,
          explanation: `Bài đọc: "No name and no team goes to a guest as the cause."`,
        },
      ],
    ),
    game: [
      round(
        "Just admit the restaurant got it wrong and give us dinner free.",
        [
          ["You are right, sir — it was our fault, so dinner is on us.", "register"],
          ["I am sorry that happened, sir. Let me check with my manager about dinner.", "answer"],
          ["You are right, sir — it were our fault, so dinner is on us.", "form"],
        ],
        "Câu này vừa nhận lỗi thay cả khách sạn, vừa tự tặng bữa tối — hai quyết định không phải của bạn. Câu sai ngữ pháp cũng nhận lỗi và tặng bữa y như thế, lại dùng 'it were'; với 'it', quá khứ của 'be' là 'was'. Đáp án xin lỗi về sự việc và hỏi đúng người quyết.",
      ),
      round(
        "He has his table now and he is smiling. Shall I close the case?",
        [
          ["Yes — he is smiling, so the problem is clearly solved.", "register"],
          ["Not yet. Close it when he tell us it is right.", "form"],
          ["Not yet. Close it when he tells us it is right.", "answer"],
        ],
        "Câu này đoán là xong vì khách đang cười — chỉ khách mới đóng được hồ sơ. Câu sai ngữ pháp dùng 'he tell'; chủ ngữ 'he' thì 'tells'. Đáp án chờ khách nói đã ổn.",
        "colleague",
      ),
    ],
  }),

  L(40, 3, "The Evening Goes Wrong", "Buổi tối có sự cố", {
    vocabulary: [
      c("Is he breathing", "Is he breathing, madam? That decides who I call first."),
      c("Stay on the line", "Please stay on the line while my colleague dials."),
      c("Use the stairs", "If the power goes, please use the stairs, sir."),
      c("The next update", "The next update on the storm is at the lounge desk."),
      c("Danger first", "Danger first, even with four guests at the desk."),
    ],
    grammar: [
      g(
        "Calm down, madam, everything will be fine.",
        "Is he breathing, madam? I am staying on the line while my colleague calls.",
        "Một câu hỏi trước, vì câu trả lời quyết định gọi số nào — và đừng hứa 'sẽ ổn thôi'. Chủ ngữ số ít 'my colleague' thì động từ thêm -s: 'calls'.",
        "Is he breathing, madam? I am staying on the line while my colleague call.",
      ),
      g(
        "Take the lift, sir, it is faster with all your bags.",
        "Because of the alarm, please use the stairs, sir, and leave your bags.",
        "Lệnh khẩn: lý do trước, một hành động, và một việc thay thế — không thang máy, không quay lại lấy đồ. Hai mệnh lệnh nối bằng 'and' cùng dạng nguyên mẫu: 'use… and leave'.",
        "Because of the alarm, please use the stairs, sir, and leaving your bags.",
      ),
    ],
    speaking: [
      also(
        sp(
          "The storm warning is on the television. What happens now?",
          t3a,
          "Một việc và một mốc giờ: 'stay indoors', 'away from the windows', rồi 'The next update' — khi nào, ở đâu. Không đoán cơn bão, không nói an toàn.",
          undefined,
          ["stay", "indoors", "next", "update", "within", "hour", "lounge", "desk"],
        ),
        "Please stay indoors tonight, madam. The next update is within the hour, at the lounge desk downstairs.",
        "Please stay indoors tonight, madam. The next update is within the hour, at the lounge desk.",
      ),
      sp(
        "The lights just flickered. Is the power going to go?",
        t3b,
        "Bạn không biết — nói đúng như vậy bằng câu đã học. Rồi thứ khách sẽ cần nếu mất điện: 'a torch in your wardrobe'.",
        undefined,
        ["yet", "torch"],
        t3a,
      ),
      also(
        sp(
          "And if it goes, can we still take the lift down for dinner?",
          t3c,
          "Khi điện chưa ổn thì không đi thang máy: 'As a precaution', 'use the stairs'. Một lệnh, một lý do — 'the generator' giữ đèn cầu thang sáng.",
          undefined,
          ["stairs", "generator"],
          t3b,
        ),
        "Please use the stairs if the power goes, madam. The stair lights stay on.",
      ),
      risk(
        also(
          sp(
            "Please! My father has collapsed in the bathroom, and he is not moving!",
            "Is he breathing, madam? Please stay on the line, and do not move him.",
            "Đúng kịch bản y tế: MỘT câu hỏi trước — 'Is he breathing' — rồi giữ người nhà trên máy và không di chuyển ông ấy. Không thở, không tỉnh hoặc không chắc thì xe cấp cứu; còn thở và đã tỉnh thì sơ cứu và Duty Manager.",
            undefined,
            ["breathing", "stay", "line", "move"],
          ),
          "Is he breathing, madam? Please stay on the line with me, and do not move him.",
          "Is he breathing, madam? Please stay on the line and do not move him.",
          "Is he breathing, madam? Please do not move him, and stay on the line.",
          "I am calling an ambulance now, madam. Please stay on the line, and do not move him.",
        ),
      ),
      risk(
        also(
          sp(
            "Two guests are waiting, and a man in the bar says he can smell smoke. Which first?",
            "Danger first: ask him where, then call security, and the Duty Manager after.",
            "ĐỒNG NGHIỆP hỏi. Hai khách đang chờ không đổi được thứ tự: 'Danger first'. Mùi khói thì hỏi chỗ, rồi bảo vệ trước, Duty Manager sau.",
            "colleague",
            ["danger", "first", "ask", "call", "security", "duty", "manager", "after"],
          ),
          "Danger first: ask him where, then call security and the Duty Manager after.",
          "Danger first. Ask him where, then call security, and the Duty Manager after that.",
          "Danger first: ask him whereabouts, then call security, and the Duty Manager after.",
          "Danger first: ask him where it is, then call security, and the Duty Manager after.",
        ),
      ),
      also(
        sp(
          "The alarm is ringing! Shall I run back up for my handbag?",
          "Leave it and come with me to the assembly point, madam. Please use the stairs.",
          "Cấm quay lại, rồi đưa việc thay thế ngay trong cùng một hơi: 'Leave it and come with me', tới 'the assembly point'. Không ai quay vào toà nhà cho tới khi có lệnh — kể cả bạn.",
          undefined,
          ["leave", "come", "stairs"],
        ),
        "Leave it, madam, and come with me. Please use the stairs.",
      ),
      sp(
        "Our boat trip is tomorrow morning. Will it still go in this storm?",
        "If it is postponed, madam, the storm programme offers the first clear day or a rain check.",
        "Đừng đoán thời tiết, cũng đừng quyết thay công ty tàu. Nói đúng điều chương trình ngày bão in sẵn: 'the first clear day' hoặc 'a rain check'.",
      ),
    ],
    reading: read(
      `THE EVENING GOES WRONG
At eight, a weather warning comes on the television, and the lobby fills with questions. Hoa gives every guest the same three parts: what has happened, what it means for them, and the next update. "Please stay indoors, away from the windows. The next update is within the hour, at the lounge desk." She does not say it is safe, and she does not guess when it will end.
At twenty past eight, the lights flicker. Hoa does not know if the power will go. She tells guests where the torch is, and she sends them to the stairs, not the lift.
At half past, the desk telephone rings. A woman's father has collapsed in their bathroom. Hoa asks one question first: "Is he breathing?" The woman is not sure, so Hoa treats it as not breathing. Her colleague dials 115 while Hoa keeps the woman on the line and asks her not to move him.
Two guests are still waiting at the desk when a man from the bar says he can smell smoke. Danger first. Hoa asks where, calls security, and then the Duty Manager. The two guests wait, and nobody complains.`,
      [
        {
          q: "Khách hỏi khi có cảnh báo bão. Hoa nói với mọi khách điều gì?",
          options: [
            "Rằng khách sạn được xây để chịu bão lớn, nên khách cứ yên tâm đi ngủ",
            "Rằng bão sẽ tan trước sáng mai, theo dự báo trên tivi",
            "Chuyện đã xảy ra, ý nghĩa với khách, và lần cập nhật tới",
          ],
          correct: 2,
          explanation: `Bài đọc: "Hoa gives every guest the same three parts: what has happened, what it means for them, and the next update."`,
        },
        {
          q: "Người nhà không chắc ông ấy còn thở. Hoa làm gì?",
          options: [
            "Coi như không thở: đồng nghiệp gọi 115, Hoa giữ người nhà trên máy",
            "Gửi Duty Manager lên phòng xem trước rồi mới gọi",
            "Bảo người nhà đỡ ông ấy dậy cho dễ thở",
          ],
          correct: 0,
          explanation: `Bài đọc: "The woman is not sure, so Hoa treats it as not breathing. Her colleague dials 115 while Hoa keeps the woman on the line."`,
        },
        {
          q: "Hai khách đang chờ thì có người báo mùi khói ở quầy bar. Hoa làm gì trước?",
          options: [
            "Làm xong cho hai khách đang chờ, rồi mới gọi bảo vệ",
            "Hỏi chỗ, gọi bảo vệ, rồi Duty Manager",
            "Tự đi xuống quầy bar xem có khói thật không đã",
          ],
          correct: 1,
          explanation: `Bài đọc: "Danger first. Hoa asks where, calls security, and then the Duty Manager."`,
        },
      ],
    ),
    game: [
      round(
        "My husband slipped in the bath and hit his head. He is talking, and he says he is fine.",
        [
          [
            "Please keep him lying still, sir. I am calling first aid and the Duty Manager.",
            "answer",
          ],
          ["If he is talking, sir, a good night's sleep is probably all he needs.", "register"],
          ["Please keep him lying still, sir. I calling first aid and the Duty Manager.", "form"],
        ],
        "Câu này tự chẩn đoán — 'ngủ một giấc là khỏi' — trong khi khách vừa bị đập đầu; đánh giá là việc của người có chuyên môn. Câu sai ngữ pháp thiếu 'am': hiện tại tiếp diễn phải là 'I am calling'. Đáp án: khách tỉnh và nói chuyện được thì gọi sơ cứu và Duty Manager, và giữ khách nằm yên.",
      ),
      round(
        "Is it safe to take the lift? The lights keep flickering.",
        [
          ["It should be fine, madam — the lifts are checked every month.", "register"],
          ["Please use the stair tonight, madam, until the power is steady again.", "form"],
          ["Please use the stairs tonight, madam, until the power is steady again.", "answer"],
        ],
        "Câu này hứa thang máy an toàn khi điện đang chập chờn. Câu sai ngữ pháp dùng 'the stair'; đi cầu thang là 'the stairs'. Đáp án cho khách một việc an toàn để làm.",
      ),
    ],
  }),

  L(40, 4, "Before You Go Home", "Trước khi hết ca", {
    vocabulary: [
      c("I cannot connect you", "I am afraid I cannot connect you, but I can take a message."),
      c("Not mine to handle", "Questions from a magazine are not mine to handle."),
      c("Hand it over by name", "Before six, hand it over by name to the evening shift."),
      c("Stopped asking", "The guest who has stopped asking is the one to call tonight."),
    ],
    grammar: [
      g(
        "Sorry, she does not want to talk to you.",
        "I am afraid I cannot connect you, sir. May I take a message?",
        "'Cô ấy không muốn nói chuyện' là đã xác nhận cô ấy đang ở đây. 'I cannot connect you' đúng trong mọi trường hợp. Sau 'cannot' là động từ nguyên mẫu: 'connect', không phải 'connecting'.",
        "I am afraid I cannot connecting you, sir. May I take a message?",
      ),
      g(
        "I told the night shift everything before I left.",
        "I handed every open case over by name, and wrote what each guest expects next.",
        "'Tôi đã nói với ca sau' không phải bàn giao. Bàn giao cần TÊN người nhận và điều mỗi khách đang chờ. Hai động từ quá khứ song song: 'handed… and wrote', không phải 'and write'.",
        "I handed every open case over by name, and write what each guest expects next.",
      ),
    ],
    speaking: [
      sp(
        "Before you go, there is something wrong with my bill.",
        t4a,
        "Cuối ca: không từ chối, không tự mở việc. Cảm ơn khách bằng câu đã học — 'Thank you for telling us' — rồi nói việc bạn làm: ghi lại và bàn giao đích danh.",
        undefined,
        ["telling", "writing", "handing", "name"],
      ),
      sp(
        "Will the next person know exactly what I want?",
        t4b,
        "Khách sợ phải kể lại từ đầu. Bạn ghi đúng điều khách muốn, bằng chính lời khách — 'in your own words' — cho người nhận ca.",
        undefined,
        ["own", "words"],
        t4a,
      ),
      also(
        sp(
          "And who decides whether the charge comes off?",
          t4c,
          "Tiền trên hoá đơn là của Duty Manager — nói rõ quyết định của ai. Rồi một việc của CHÍNH BẠN trước khi về: đưa việc này tới tay bà ấy.",
          undefined,
          ["duty", "manager's", "leave"],
          t4b,
        ),
        "That is my Duty Manager's decision, madam. I am taking it to her before I leave.",
      ),
      also(
        sp(
          "My shift ends at six, and the guest in the lounge is still waiting for the Duty Manager.",
          "Hand it over by name in the last fifteen minutes. A note on the desk belongs to nobody.",
          "ĐỒNG NGHIỆP hỏi. Một việc không gắn tên người nhận là việc không ai làm. Bàn giao cho đúng một người trong 'the last fifteen minutes' của ca.",
          "colleague",
          ["hand", "name", "note", "desk"],
        ),
        "Hand it over by name before six. A note on the desk belongs to nobody.",
      ),
      also(
        sp(
          "It is ten to six, and a guest wants his room changed tonight. Shall I start it?",
          "Nothing new after quarter to. Write down what the guest expects next, and hand it over by name.",
          "ĐỒNG NGHIỆP hỏi. Luật cuối ca: không mở việc mới. Nhưng ghi đúng điều khách đang chờ — 'what the guest expects next' — rồi bàn giao đích danh.",
          "colleague",
        ),
        "Nothing new after quarter to. Write it down, and hand it over by name.",
      ),
      sp(
        "Duty Manager. Anything on Mr Hall before you go?",
        "Mr Hall has stopped asking about the lost booking. He expects a call tonight, after dinner.",
        "Báo lên cấp trên thì không cần sir. Một dòng bàn giao đủ bốn thứ: khách nào (Mr Hall), tình trạng ('stopped asking'), điều khách chờ (một cuộc gọi) và giờ ('after dinner'). Khách thôi hỏi không phải là hết bận tâm.",
        "manager",
        ["booking", "stopped", "asking", "call"],
      ),
      risk(
        also(
          sp(
            "I write for a travel magazine. What happened with the ambulance last night?",
            "That is not mine to handle, madam, and I cannot talk about another guest. My Duty Manager is coming.",
            "Hai luật trong một câu: nhà báo là việc của Duty Manager — 'not mine to handle' — và chuyện của khách khác không bao giờ được kể. Rồi dừng: không tên bạn, không ý kiến.",
            undefined,
            ["handle", "talk", "guest", "duty", "manager", "coming"],
          ),
          "I am sorry, that is not mine to handle, madam, and I cannot talk about another guest. My Duty Manager is coming.",
          "That is not mine to handle, madam, and I cannot talk about another guest. My Duty Manager is coming now.",
          "That is not mine to handle, madam, and I cannot talk about another guest. I am bringing my Duty Manager to you now.",
          "I am sorry, madam, I cannot talk about another guest, and that is not mine to handle. My Duty Manager is coming.",
        ),
      ),
      risk(
        also(
          sp(
            "I am her brother. Please just put me through to her room.",
            "I cannot connect you, sir, but I can take your name and a message.",
            "Người xưng là người nhà vẫn là một người gọi. 'I cannot connect you' đúng trong mọi trường hợp và không xác nhận ai đang ở đây; nhận tên và lời nhắn.",
            undefined,
            ["connect", "take", "name", "message"],
          ),
          "I am afraid I cannot connect you, sir, but I can take your name and a message.",
          "I cannot connect you, sir. May I take your name and a message?",
          "I am afraid I cannot connect you, sir. May I take a message for her?",
          "I cannot connect you, sir. Would you like to leave a message?",
          "I cannot connect you, sir, but I can take a message.",
        ),
      ),
    ],
    reading: read(
      `BEFORE YOU GO HOME
At ten to six, Mrs Lee comes to the desk with a question about her bill. Hoa's shift ends at six. She does not refuse, and she does not open a new case she cannot finish. She writes it down in Mrs Lee's own words, and she hands it over by name to Tuan, who takes the desk at six. Money off a bill is the Duty Manager's, so Hoa takes the note to her before she leaves.
At five to six, a woman says she writes for a travel magazine and asks about the ambulance last night. Hoa says it is not hers to handle, says nothing about another guest, and asks the Duty Manager to come.
A minute later, a caller says he is Ms Tran's brother and asks to be put through. Hoa cannot connect him, so she takes his name and a message.
Then she goes through what is still open with Tuan. The line she says out loud is Mr Hall's: the guest with the lost booking has stopped asking. A guest who has stopped asking has not stopped minding, so Tuan will call him tonight.`,
      [
        {
          q: "Mười phút trước khi hết ca, khách hỏi về hoá đơn. Hoa làm gì?",
          options: [
            "Ghi lại bằng lời của khách và bàn giao đích danh cho Tuan",
            "Mở hồ sơ mới rồi để sổ lại cho ca sau tự đọc và tự gọi lại cho khách",
            "Hẹn khách sáng mai quay lại gặp ca sáng để giải quyết lại từ đầu",
          ],
          correct: 0,
          explanation: `Bài đọc: "She writes it down in Mrs Lee's own words, and she hands it over by name to Tuan."`,
        },
        {
          q: "Người viết cho tạp chí hỏi về xe cấp cứu tối qua. Hoa làm gì?",
          options: [
            "Kể ngắn gọn chuyện đã xảy ra cho khỏi bị viết sai",
            "Trả lời 'no comment' rồi quay đi",
            "Nói đó không phải việc của mình, không kể gì về khách khác, rồi mời Duty Manager",
          ],
          correct: 2,
          explanation: `Bài đọc: "Hoa says it is not hers to handle, says nothing about another guest, and asks the Duty Manager to come."`,
        },
        {
          q: "Vì sao Hoa nói to dòng 'khách đã thôi hỏi' khi bàn giao?",
          options: [
            "Vì thôi hỏi nghĩa là khách đã chấp nhận, nên ca sau có thể đóng hồ sơ",
            "Vì khách thôi hỏi không có nghĩa là đã hết bận tâm, nên Tuan sẽ gọi lại tối nay",
            "Vì Duty Manager yêu cầu đọc to mọi dòng trong sổ",
          ],
          correct: 1,
          explanation: `Bài đọc: "A guest who has stopped asking has not stopped minding, so Tuan will call him tonight."`,
        },
      ],
    ),
    game: [
      round(
        "I am her husband. Is she in her room or not?",
        [
          [
            "She went out about an hour ago, sir, but she should be back in time for dinner.",
            "register",
          ],
          ["I cannot connect you, sir, but I can take a message for her.", "answer"],
          ["She go out about an hour ago, sir, but she should be back in time for dinner.", "form"],
        ],
        "Câu này nói khách đã ra ngoài và giờ về — vừa xác nhận khách ở đây, vừa lộ lịch của khách. Câu sai ngữ pháp cũng lộ lịch của khách y như thế, lại sai thì: việc một tiếng trước phải là 'she went out', không phải 'she go out'. Đáp án không xác nhận gì, và nhận lời nhắn.",
      ),
      round(
        "I am off at six. Can I just leave the bill question in the book?",
        [
          ["Hand it over by name. A note in the book belongs to nobody.", "answer"],
          ["Yes — the evening shift reads the book, so somebody will find it.", "register"],
          ["Hand it over by name. A note in the book belong to nobody.", "form"],
        ],
        "Câu này giao việc cho một quyển sổ — 'sẽ có người thấy' không phải bàn giao. Câu sai ngữ pháp dùng 'a note… belong'; chủ ngữ số ít thì 'belongs'. Đáp án bàn giao cho đúng một người.",
        "colleague",
      ),
    ],
  }),
];

export const week: AuthoredWeek = {
  title: { en: "A Full Shift at the Desk", vi: "Trọn một ca ở quầy Quan hệ khách hàng" },
  canDo:
    "Nói được: xử lý trọn một ca làm việc — kể về khách sạn và gợi ý dựa trên lời khách, lo một bất ngờ có hỏi dị ứng, giải quyết một khiếu nại đủ bốn bước mà không hứa thay ai, giữ đúng kịch bản khi có người ngã quỵ, mất điện hay báo cháy, không xác nhận ai đang ở khách sạn, và bàn giao đích danh trước khi hết ca.",
  lessons,
};
