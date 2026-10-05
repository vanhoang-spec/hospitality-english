// HK week 39 — Rehearsal, and two new rules (see ../kit.ts).
//
// Two lessons teach the rules no earlier week has, each as a full lesson
// (cards, grammar, turns, game, reading):
//
//  1. PRIORITY when several things arrive at once. "Danger first" is an
//     action, not a place in a queue: first aid, the operator or 115 is
//     called first, the Duty Manager after, and the attendant stays with the
//     guest. Then the room a guest is waiting for (arrival, rush room), then
//     checkouts, then stayovers. The guest in front of you is ANSWERED first;
//     the radio gets "Stand by" and never a room number joined to a fact
//     about a guest. The loudest room is never done first.
//  2. THE LAST FIFTEEN MINUTES open no new job. A request that arrives then
//     is written down and handed over BY NAME to the late shift; the trolley,
//     the key, the log and the one face-to-face matter close the shift.
//     Danger never waits for three o'clock.
//
// The two lessons between them rehearse the phase across situations, with
// the cards re-presented from the weeks that taught them. The door rule is
// the phase's ONE rule: a guest who asks hears the rule and an offer to come
// back; a guest who presses sees the attendant step outside. Nobody opens a
// room for a person at the door. Money missing brings the supervisor now.
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

// ── Lesson 1 — priority: danger first, and what that means ────────────────
const t1a = "Stand by. I am on a first-aid call, and I will phone you in five minutes.";
const t1b =
  "Not yet. First aid comes first, then the Duty Manager, and I am staying with the guest.";
const t1c =
  "905 can wait ten minutes. If I am not free by then, please send a second pair of hands.";

// ── Lesson 2 — when two rules meet ────────────────────────────────────────
const t2a =
  "I am sorry, madam, the door stays open while I work. However, I can come back after lunch.";
const t2b = "I will step outside now, madam. I can come back after lunch.";
const t2c = "Thank you, madam. I will knock at two, and the door will be open as always.";

const lesson1 = L(
  39,
  1,
  "Danger First — and What That Means",
  "Nguy hiểm trước — nghĩa là làm gì",
  {
    vocabulary: [
      c("Priority", "A guest who has fallen is the priority, and every room can wait.", [
        "/praɪˈɒrəti/",
        "Việc được ưu tiên làm trước",
        "🥇",
      ]),
      c("Comes first", "First aid comes first, and the Duty Manager comes after the call.", [
        "/ˌkʌmz ˈfɜːst/",
        "Được làm trước tiên",
        "⬆️",
      ]),
      c("Can wait", "A stayover can wait ten minutes; a guest on the floor cannot.", [
        "/kən ˈweɪt/",
        "Có thể chờ — chưa cần làm ngay",
        "⏸️",
      ]),
      c("Stand by", "Stand by takes two seconds, and it tells the caller you heard.", [
        "/ˌstænd ˈbaɪ/",
        "Chờ chút — trả lời bộ đàm khi đang bận",
        "📻",
      ]),
      c(
        "Second pair of hands",
        "Three rooms behind is the moment to ask the desk for a second pair of hands.",
        ["/ˈsekənd ˈpeər əv ˈhændz/", "Thêm một người phụ", "🙌"],
      ),
    ],
    grammar: [
      g(
        "Towels? Wait. I am busy with other thing.",
        "First aid comes first, madam, and your towels are next, in ten minutes.",
        "Nói THỨ TỰ, không nói 'bận'. Chủ ngữ số ít 'first aid' đi với động từ thêm -s: comes first. Rồi một mốc giờ cho người đang chờ.",
        "First aid come first, madam, and your towels are next, in ten minutes.",
      ),
      g(
        "Your room later. I don't know when.",
        "Two rooms are ahead of yours, sir, and I will knock when I start it.",
        "Nói sự thật về CHÍNH phòng của khách, không kể chuyện phòng bên cạnh. Chủ ngữ số nhiều 'two rooms' đi với 'are'.",
        "Two rooms is ahead of yours, sir, and I will knock when I start it.",
      ),
    ],
    speaking: [
      sp(
        "Housekeeping desk for nine. Can you take a rush room in 905?",
        t1a,
        "Bộ đàm được trả lời ngay, bằng 'Stand by' — hai giây. Nhưng bộ đàm không bao giờ mang số phòng gắn với tình trạng của khách: chi tiết đi qua điện thoại tầng.",
        "colleague",
      ),
      risk({
        ...sp(
          "Understood. Is the Duty Manager with you yet?",
          t1b,
          "Nguy hiểm trước nghĩa là MỘT VIỆC: gọi sơ cứu trước, Duty Manager sau, và ở lại với khách. 'Comes first' — nhấn ở 'first'.",
          "colleague",
          undefined,
          t1a,
        ),
        alsoAccept: [
          "Not yet. First aid comes first, then the manager on duty, and I am staying with the guest.",
          "Not yet. First aid comes first, then the Duty Manager, and I am staying here with the guest.",
        ],
      }),
      sp(
        "Then who takes 905? The guest arrives at two.",
        t1c,
        "Phòng chờ được thì nói rõ chờ bao lâu, rồi xin người phụ trước khi trễ — người tới phụ mất mười phút mới lên tầng.",
        "colleague",
        undefined,
        t1b,
      ),
      {
        ...sp(
          "I have asked three times! Do my room first, right now!",
          "I am sorry you have waited, sir. Two rooms are ahead of yours, and I will knock when I start it.",
          "Xin lỗi vì khách đã phải CHỜ, không xin lỗi vì thứ tự. Không làm phòng ồn nhất trước — giám sát quyết ai được lên trước, không phải tiếng to.",
        ),
        alsoAccept: [
          "I am so sorry you have waited, sir. Two rooms are ahead of yours, and I will knock when I start it.",
        ],
      },
      sp(
        "Ms Lan here. Why is 905 not done? The guest is in the lobby.",
        "A guest fell on nine, Ms Lan, so he was my priority. 905 is my next room, in ten minutes.",
        "Báo cấp trên: gọi tên một lần, không kính ngữ. Lý do bằng một sự việc, rồi một mốc giờ. 'Priority' /praɪˈɒrəti/ — nhấn âm tiết hai.",
        "manager",
      ),
      risk({
        ...sp(
          "There is smoke coming from under the door next to mine!",
          "Please go to the stairs now, madam. I am calling the operator, and then I am knocking on that door.",
          "Nguy hiểm trước: đưa khách ra cầu thang, gọi tổng đài từ hành lang, rồi mới gõ cửa phòng có khói. Không mở cửa phòng đó.",
        ),
        alsoAccept: [
          "Please go to the stairs now, madam. I am calling the operator, and then I will knock on that door.",
          "Please go to the stairs now, madam. I am phoning the operator, and then I am knocking on that door.",
        ],
      }),
    ],
    reading: read(
      `WHEN EVERYTHING ARRIVES AT ONCE — THE ORDER
Three things want you at once, and the order is not first come, first served.
Danger comes first, and danger means a call, not a place in a queue. A guest who has fallen, a smell of burning, a needle in your hand: call first aid, the operator or 115 first. The Duty Manager comes after that call, and you stay with the guest.
Next comes the room a guest is waiting for: an arrival, then a rush room. Then checkouts, and then stayovers.
A guest standing in front of you is answered first: answered, not served. "Two rooms are ahead of yours, and I will knock when I start it." The truth about her own room is hers; the room next door is not.
The radio is answered too, with two words: "Stand by." It never carries a room number joined to a fact about a guest. Those go on the floor phone.
Never do the loudest room first, or the floor learns that shouting works. If a guest is pushing, tell your supervisor; she decides who moves up the list.
When three rooms are waiting and none is started, ask the desk for a second pair of hands. Help takes ten minutes to reach your floor.
Write down every room you did out of turn, and why.`,
      [
        {
          q: "'Nguy hiểm trước' nghĩa là làm gì?",
          options: [
            "Gọi sơ cứu, tổng đài hoặc 115 trước, Duty Manager sau, và ở lại với khách",
            "Báo Duty Manager trước, để quản lý quyết định việc gọi sơ cứu",
            "Làm cho xong phòng đang dở rồi mới xử lý",
          ],
          correct: 0,
          explanation:
            "'danger means a call, not a place in a queue… call first aid, the operator or 115 first. The Duty Manager comes after that call, and you stay with the guest.'",
        },
        {
          q: "Khách đứng trước mặt hỏi về phòng của mình thì làm gì?",
          options: [
            "Dọn phòng khách ngay để khách thôi phàn nàn",
            "Trả lời ngay: còn mấy phòng trước, và sẽ gõ cửa khi bắt đầu",
            "Giải thích vì sao phòng bên cạnh được làm trước",
          ],
          correct: 1,
          explanation:
            "'answered first: answered, not served… The truth about her own room is hers; the room next door is not.'",
        },
        {
          q: "Ba phòng cùng chờ mà chưa bắt đầu phòng nào thì làm gì?",
          options: [
            "Gọi bàn buồng phòng xin thêm người",
            "Bỏ qua các phòng khách đang ở",
            "Làm phòng của vị khách to tiếng nhất trước",
          ],
          correct: 0,
          explanation:
            "'ask the desk for a second pair of hands. Help takes ten minutes to reach your floor' — gọi lúc chậm ba phòng, đừng đợi tới sáu.",
        },
      ],
    ),
    game: [
      round(
        2,
        "Housekeeping desk. Can you take an iron up to 1210 now?",
        "Stand by, please. I am staying with a guest until first aid gets here, and I will ring you back.",
        "Not now — the lady in 1207 slip in the bath and is bleeding badly, so I am still with her.",
        "Not now — the lady in 1207 slipped in the bath and is bleeding badly, so I am still with her.",
        "Phương án 'the lady in 1207 slipped… is bleeding' đọc số phòng kèm tình trạng của khách lên bộ đàm — cả tầng nghe thấy. Phương án 'the lady in 1207 slip' cũng đọc số phòng như vậy, lại sai thì: việc đã xảy ra phải dùng quá khứ (slipped). Câu đúng trả lời ngay bằng 'Stand by', không lộ chi tiết, ở lại với khách và hẹn gọi lại.",
        "colleague",
      ),
      round(
        1,
        "Everyone else's room was done this morning. Why is mine always last?",
        "I am sorry you have waited, madam. Yours is next, and I will knock when I start it.",
        "The other rooms were all checkout, madam, and the lady next door is a VIP, so she came first.",
        "The other rooms were all checkouts, madam, and the lady next door is a VIP, so she came first.",
        "Phương án 'the lady next door is a VIP' kể chuyện của khách khác — điều không bao giờ nói ra. Phương án 'were all checkout' cũng kể chuyện phòng bên như vậy, lại thiếu số nhiều: 'the other rooms were all' cần 'checkouts'. Câu đúng xin lỗi vì khách phải chờ và nói sự thật về chính phòng của khách.",
      ),
    ],
  },
);

const lesson2 = L(39, 2, "When Two Rules Meet", "Khi hai quy tắc gặp nhau", {
  vocabulary: [
    c(
      "Step outside",
      "If a guest presses after hearing the rule, I step outside and call from the corridor.",
    ),
    c("However", "The door stays open; however, I can always come back at a better time."),
    c("Room safe", "If the room safe is open, the guest closes it before I start."),
    c("Room report", "Anything a guest asks me to move goes on my room report, with the time."),
  ],
  grammar: [
    g(
      "You know her name, so OK, I open it for you.",
      "I am sorry, sir, I cannot open a room. The front desk will check your name.",
      "Không mở phòng cho người đứng ở cửa, dù người đó biết tên khách. Sau 'cannot' là động từ nguyên mẫu: cannot open — không chia quá khứ.",
      "I am sorry, sir, I cannot opened a room. The front desk will check your name.",
    ),
    g(
      "Your safe is open. Not my problem.",
      "Could you close the room safe first, sir? Then I can start straight away.",
      "Mời chính chủ làm một việc năm giây, rồi nói lợi ích. Sau 'could you' là động từ nguyên mẫu: could you close.",
      "Could you closing the room safe first, sir? Then I can start straight away.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "Could you close the door while you work? The corridor is so noisy.",
        t2a,
        "Khách HỎI khép cửa: nêu luật một câu, rồi 'However' + đề nghị quay lại sau. Không khép cửa, cũng không bỏ đi ngay.",
      ),
      alsoAccept: [
        "I am sorry, madam, the door stays open while I work. However, I could come back after lunch.",
      ],
    },
    risk({
      ...sp(
        "Oh, come on. Nobody will know if you close it.",
        t2b,
        "Khách ÉP sau khi đã nghe luật: một câu, rồi bước ra. Không tranh luận, không nói trong phòng là sẽ gọi ai — ra hành lang rồi mới gọi giám sát. 'Step outside' — nhấn ở 'side'.",
        undefined,
        undefined,
        t2a,
      ),
      alsoAccept: [
        "I am stepping outside now, madam. I can come back after lunch.",
        "I will step outside now, madam. I could come back after lunch.",
      ],
    }),
    sp(
      "All right. Come back after lunch, then.",
      t2c,
      "Cảm ơn, hẹn một mốc giờ cụ thể, và nhắc nhẹ rằng luật cửa không đổi — nói một lần, không giảng.",
      undefined,
      undefined,
      t2b,
    ),
    {
      ...sp(
        "Just move those papers off the desk so you can wipe it properly.",
        "Of course, sir. Would you lift them for me, and I will wipe underneath?",
        "Giấy tờ của khách không bị gom thành chồng. Chính chủ đang đứng đó thì mời khách tự nhấc. Khách vẫn bảo bạn làm thì ghi vào báo cáo phòng.",
      ),
      alsoAccept: ["Of course, sir. Could you lift them for me, and I will wipe underneath?"],
    },
    {
      ...sp(
        "I left the safe open. Go ahead and clean — do not worry about it.",
        "Could you close the room safe first, sir? Then I can start the room straight away.",
        "Két mở thì không làm phòng xung quanh nó. Mời khách tự đóng: năm giây là hết chuyện. 'Room safe' — nói liền hai từ.",
      ),
      alsoAccept: [
        "Would you close the room safe first, sir? Then I can start the room straight away.",
      ],
    },
    risk({
      ...sp(
        "I am in 1206 and I have left my key inside. Can you open it for me?",
        "I am sorry, sir, I cannot open a room for you. The front desk will check your name and give you a key.",
        "Không mở phòng cho người đứng ở cửa, kể cả khi người đó nói đúng số phòng hay tên khách. Quầy lễ tân kiểm giấy tờ rồi cấp chìa.",
      ),
      alsoAccept: [
        "I am afraid I cannot open a room for you, sir. The front desk will check your name and give you a key.",
        "I am sorry, sir, I am not able to open a room for you. The front desk will check your name and give you a key.",
      ],
    }),
    risk({
      ...sp(
        "My cash was on the table this morning, and now it is gone.",
        "I am sorry, sir. I am calling my supervisor to your room now, and everything I moved is on my room report.",
        "Khách nói mất tiền: không chối, không xin phép khách — nói việc bạn ĐANG làm. 'Room report' là chỗ ghi mọi món bạn đã xê dịch.",
      ),
      alsoAccept: [
        "I am sorry, sir. I am asking my supervisor to come to your room now, and everything I moved is on my room report.",
        "I understand, sir. I am calling my supervisor to your room now, and everything I moved is on my room report.",
      ],
    }),
  ],
  reading: read(
    `WHEN TWO RULES MEET IN ONE MINUTE
Some guests ask for something one rule allows and another does not. When two rules meet, neither bends. The one that keeps somebody safe wins, and the rest goes up to your supervisor.
The door is one rule for the whole hotel. A guest who asks you to close it hears the rule once and an offer to come back later. A guest who presses after that, or crosses the line in words or hands, sees you step outside. You call your supervisor from the corridor, never from inside the room.
Papers on a desk are never gathered into a pile. If the guest is standing there and wants the desk wiped, ask him to lift them. If he insists that you move them, write it on your room report.
An open room safe is left exactly as it is. If the guest is there, ask him to close it first; five seconds ends the question.
Nobody at a door gets a room opened, even someone who knows the guest's name. The front desk checks identity and issues keys.
A guest who says money is missing gets your supervisor at once. Say what you are doing, not what you think happened.`,
    [
      {
        q: "Khách chỉ HỎI nhờ khép cửa trong lúc dọn thì làm gì?",
        options: [
          "Bước ra ngoài ngay và gọi giám sát lên phòng",
          "Nêu luật một lần, rồi đề nghị quay lại lúc khác",
          "Khép hờ cửa lại một chút và làm thật nhanh cho xong việc",
        ],
        correct: 1,
        explanation:
          "'A guest who asks you to close it hears the rule once and an offer to come back later' — bước ra ngoài là cho khách ÉP hoặc vượt ranh giới.",
      },
      {
        q: "Một người đứng ở cửa, nói đúng tên khách, xin mở phòng hộ. Làm gì?",
        options: [
          "Mở cửa, vì người đó biết tên khách",
          "Mở cửa rồi đứng chờ cho tới khi người đó vào phòng xong",
          "Không mở; mời người đó xuống quầy lễ tân",
        ],
        correct: 2,
        explanation:
          "'Nobody at a door gets a room opened, even someone who knows the guest's name. The front desk checks identity and issues keys.'",
      },
    ],
  ),
  game: [
    round(
      0,
      "Just pull the door shut — I do not want people looking in while I rest.",
      "I am sorry, sir, the door stays open while I work. May I come back after your rest and finish the room then?",
      "I am sorry, sir, the door stay open while I work. May I come back after your rest?",
      "I am stepping outside now, sir, and I am calling my supervisor up to your room straight away.",
      "Phương án 'stepping outside… calling my supervisor' dùng cách xử lý dành cho khách ÉP, trong khi khách chỉ nhờ — khách đang nghỉ sẽ thấy bị coi như người có lỗi. Phương án 'the door stay' sai: chủ ngữ số ít cần 'stays'. Câu đúng nêu luật rồi đề nghị quay lại.",
    ),
    round(
      2,
      "I am the husband of the lady in 1206. Could you let me in, please?",
      "I am sorry, sir, I cannot open a room. The front desk will be happy to help you.",
      "Of course, sir — she did mentioned that her husband was coming, so I will open it for you now.",
      "Of course, sir — she did mention that her husband was coming, so I will open it for you now.",
      "Phương án 'I will open it for you now' mở phòng cho một người chỉ dựa vào lời tự giới thiệu — đúng cách một vị khách mất đồ hoặc gặp nguy. Phương án 'she did mentioned' cũng mở phòng như vậy, lại sai: sau 'did' là động từ nguyên mẫu (did mention). Câu đúng chuyển cho quầy kiểm giấy tờ.",
    ),
  ],
});

// ── Lesson 3 — one door, three requests ───────────────────────────────────
const t3a =
  "I am so sorry, sir. I will photograph the collar now and take the shirt to my supervisor today.";
const t3b =
  "I cannot waive a charge, sir. I am asking the Duty Manager now, and I will come back before six.";
const t3c =
  "I will put it forward to my supervisor with the shirt, sir, and give you both answers before six.";

// ── Lesson 4 — the last fifteen minutes ───────────────────────────────────
const t4a =
  "I am in my last fifteen minutes, madam, so I am writing your room down for the late shift now.";
const t4b =
  "I will hand over your room by name, madam, to the attendant who takes this floor at three.";
const t4c =
  "Then please call the housekeeping desk, madam. Your room is on the handover note, with the time you asked.";

const lesson3 = L(39, 3, "One Door, Three Requests", "Một cửa phòng, ba yêu cầu", {
  vocabulary: [
    c("Photograph", "I photograph a damaged shirt before it leaves the guest's room."),
    c("Waive", "Only the Duty Manager can waive a correct charge, whoever is asking."),
    c("In exchange for", "I can take your last room, in exchange for your help tomorrow."),
    c(
      "On behalf of",
      "On behalf of the floor team, I congratulate a couple who tell us their news.",
    ),
  ],
  grammar: [
    g(
      "Envelope? Thank you, I take it.",
      "You are very kind, madam. May I ask my supervisor before I accept it?",
      "Phong bì dán kín: cảm ơn cho ấm, rồi hỏi giám sát TRƯỚC khi nhận. Sau 'before I' là động từ chia ở hiện tại đơn: before I accept — không thêm -ing.",
      "You are very kind, madam. May I ask my supervisor before I accepting it?",
    ),
    g(
      "OK, go home, I do your rooms.",
      "I will take your rooms, as long as Ms Lan agrees first.",
      "Nhận việc của đồng nghiệp có điều kiện: giám sát phải biết trước. Chủ ngữ số ít 'Ms Lan' cần 'agrees'.",
      "I will take your rooms, as long as Ms Lan agree first.",
    ),
  ],
  speaking: [
    {
      ...sp(
        "My white shirt came back with a grey mark on the collar.",
        t3a,
        "Phần của tầng làm NGAY: xin lỗi về điều khách gặp, chụp ảnh, mang lên giám sát. Không đoán lỗi của ai. 'Photograph' /ˈfəʊtəɡrɑːf/.",
      ),
      alsoAccept: [
        "I am so sorry, sir. I will photograph the collar now and take the shirt to my supervisor this morning.",
      ],
    },
    risk({
      ...sp(
        "I expect the laundry charge to be taken off, of course.",
        t3b,
        "Miễn phí là của Duty Manager. Nói thật một câu, đi hỏi NGAY, và hẹn một mốc giờ. 'Waive' /weɪv/ — một âm tiết.",
        undefined,
        undefined,
        t3a,
      ),
      alsoAccept: [
        "I am not able to waive a charge, sir. I am asking the Duty Manager now, and I will come back before six.",
        "I cannot waive a charge, sir. I am asking the manager on duty now, and I will come back before six.",
      ],
    }),
    sp(
      "And while you are here, could the bed be made again this afternoon?",
      t3c,
      "Lượt dọn giường thứ hai là của giám sát: trình lên cùng lúc với chiếc áo, và quay lại MỘT lần với cả hai câu trả lời.",
      undefined,
      undefined,
      t3b,
    ),
    {
      ...sp(
        "Hoa here. Can you take my last two rooms? I have a class at four.",
        "Yes, as long as Ms Lan agrees first, in exchange for your help with my turndown list tomorrow.",
        "Đồng nghiệp: không kính ngữ. Trao đổi công bằng bằng 'in exchange for' — chỉ dùng trong tổ, không dùng với khách — và giám sát biết trước.",
        "colleague",
      ),
      alsoAccept: [
        "Yes, if Ms Lan agrees first, in exchange for your help with my turndown list tomorrow.",
      ],
    },
    sp(
      "We got married yesterday, and this is our first morning here!",
      "On behalf of the housekeeping team, congratulations, madam. May I do your room later, so you are not disturbed?",
      "Khách đã tự nói ra dịp gì, nên mới chúc — một câu trang trọng, rồi một đề nghị nhỏ. 'On behalf of' /ɒn bɪˈhɑːf əv/.",
    ),
    risk({
      ...sp(
        "Here is a little envelope for you. Thank you for this week.",
        "You are very kind, madam. May I ask my supervisor before I accept it?",
        "Phong bì dán kín: không nhận trước, không từ chối phũ. Cảm ơn, rồi xin hỏi giám sát — đó là cách khách sạn yêu cầu.",
      ),
      alsoAccept: [
        "Thank you, madam, you are very kind. May I ask my supervisor before I accept it?",
        "You are very kind, madam. Could I ask my supervisor before I accept it?",
      ],
    }),
  ],
  reading: read(
    `ONE DOOR, THREE REQUESTS
A guest at the door often brings several requests at once: a stained shirt, a charge, a bed made again. Sort them by owner before you answer.
What the floor owns, you do now: an apology for what the guest met, a photograph of the shirt, fresh towels, a second robe.
What your supervisor owns, you put forward: a second bed service, a laundry claim, anything beyond the daily allowance.
What the Duty Manager owns, you never decide: a charge waived, a free night, money of any kind. Say plainly that it is not yours, and ask now.
What the front desk owns, you ask for on the guest's behalf: a room move, an extra bed, a key.
Then go back to the guest once, with every answer and one time. Three visits with half an answer each feel like three refusals.
A guest who offers you an envelope gets a warm thank-you and a question: may you ask your supervisor first? A sealed envelope is never accepted before that.
With colleagues, a fair trade keeps the floor moving, but your supervisor hears about every swap before it happens.`,
    [
      {
        q: "Khách xin xoá khoản phí giặt là thì ai quyết?",
        options: [
          "Duty Manager",
          "Nhân viên buồng phòng đã nhận đồ",
          "Giám sát tầng, theo bảng nội bộ",
        ],
        correct: 0,
        explanation:
          "'What the Duty Manager owns, you never decide: a charge waived, a free night, money of any kind' — nói rõ không thuộc quyền mình, và hỏi ngay.",
      },
      {
        q: "Vì sao nên quay lại gặp khách MỘT lần với đủ các câu trả lời?",
        options: [
          "Vì ba lần ghé với nửa câu trả lời nghe như ba lời từ chối",
          "Vì khách không thích bị gõ cửa nhiều lần trong ngày",
          "Vì giám sát tầng chỉ cho phép mỗi nhân viên ghé phòng khách một lần trong ca",
        ],
        correct: 0,
        explanation:
          "'Three visits with half an answer each feel like three refusals' — gom các câu trả lời lại và hẹn một mốc giờ.",
      },
      {
        q: "Khách đưa một phong bì dán kín thì làm gì?",
        options: [
          "Nhận luôn rồi khai báo vào cuối ca",
          "Cảm ơn thật ấm, và xin hỏi giám sát trước khi nhận phong bì",
          "Từ chối thẳng, vì phong bì nào cũng là hối lộ",
        ],
        correct: 1,
        explanation:
          "'A sealed envelope is never accepted before that' — cảm ơn cho ấm, rồi hỏi giám sát trước.",
      },
    ],
  ),
  game: [
    round(
      1,
      "My silk dress came back ruined, so I expect tonight's room for free.",
      "I am so sorry, madam. A free night is not mine to give, so I am asking the Duty Manager now.",
      "Of course, madam — after ruin your dress, the least we can do is give you tonight completely free.",
      "Of course, madam — after ruining your dress, the least we can do is give you tonight completely free.",
      "Phương án 'after ruining your dress… tonight completely free' vừa cho một đêm miễn phí thay Duty Manager, vừa nhận lỗi khi chưa ai kiểm. Phương án 'after ruin your dress' cũng hứa như vậy, lại sai: sau giới từ 'after' động từ phải thêm -ing (after ruining). Câu đúng xin lỗi, nói rõ việc này không thuộc quyền mình, và hỏi Duty Manager ngay.",
    ),
    round(
      0,
      "Hoa here. Just take my rooms — there is no need to tell Ms Lan.",
      "I will, once Ms Lan knows. The board has to show who is in which room.",
      "I will, once Ms Lan know. The board has to show who is in which room.",
      "Fine — nobody ever looks at the room status board after three anyway, so just go now.",
      "Phương án 'nobody ever looks at the room status board' đổi việc sau lưng giám sát — bảng sai thì cuộc gọi tiếp theo đến nhầm người. Phương án 'Ms Lan know' sai: chủ ngữ số ít cần 'knows'. Câu đúng nhận việc có điều kiện.",
      "colleague",
    ),
  ],
});

const lesson4 = L(39, 4, "The Last Fifteen Minutes", "Mười lăm phút cuối ca", {
  vocabulary: [
    c(
      "Last fifteen minutes",
      "The last fifteen minutes of a shift open no new room, whatever the request.",
      ["/ˌlɑːst ˌfɪfˈtiːn ˈmɪnɪts/", "Mười lăm phút cuối ca — không mở việc mới", "⏳"],
    ),
    c("Hand over", "I hand over every open request by name, never to the shift in general.", [
      "/ˌhænd ˈəʊvə/",
      "Bàn giao việc cho người khác",
      "🤝",
    ]),
    c("By name", "A request handed over by name belongs to someone; the rest belongs to nobody.", [
      "/baɪ ˈneɪm/",
      "Đích danh — nói rõ giao cho ai",
      "🏷️",
    ]),
    c("Late shift", "The late shift starts at three, and it reads my log before anything else.", [
      "/ˈleɪt ˌʃɪft/",
      "Ca chiều, ca nối sau ca sáng",
      "🌆",
    ]),
    c("Signed in", "The master key is signed in with my name and the time before I leave.", [
      "/ˌsaɪnd ˈɪn/",
      "Đã ký nộp lại",
      "🔑",
    ]),
  ],
  grammar: [
    g(
      "I will just start 812 quickly.",
      "812 is better left for the late shift, Ms Lan, and I have written why.",
      "'is better left' = để nguyên thì tốt hơn — bị động, cần phân từ hai 'left', không phải 'leave'. Một phòng dở dang tệ hơn một phòng chưa ai động vào.",
      "812 is better leave for the late shift, Ms Lan, and I have written why.",
    ),
    g(
      "Somebody will do your room. Maybe.",
      "I will hand over your room by name, madam, before I leave at three.",
      "Sau 'before' nói về tương lai, động từ ở HIỆN TẠI ĐƠN: before I leave. Hứa việc của mình (bàn giao đích danh), không hứa giờ thay ca sau.",
      "I will hand over your room by name, madam, before I will leave at three.",
    ),
  ],
  speaking: [
    sp(
      "Could you do my room now? I am going out for an hour.",
      t4a,
      "Không mở phòng mới trong mười lăm phút cuối: ca sau nhận một phòng dở dang còn tệ hơn. Nói việc bạn ĐANG làm cho khách: ghi lại và bàn giao.",
    ),
    {
      ...sp(
        "Will someone actually come, or will I be forgotten?",
        t4b,
        "Bàn giao đích danh — 'by name' — thì yêu cầu mới thuộc về một người. Nói giờ người sau nhận tầng, không hứa giờ họ tới phòng này. 'Hand over' — nhấn ở 'over'.",
        undefined,
        undefined,
        t4a,
      ),
      alsoAccept: [
        "I will hand over your room by name, madam, to the attendant who takes over this floor at three.",
      ],
    },
    sp(
      "And if nobody comes?",
      t4c,
      "Cho khách một việc khách tự làm được và một bằng chứng việc đã được ghi: tên trong sổ bàn giao, kèm giờ khách xin.",
      undefined,
      undefined,
      t4b,
    ),
    sp(
      "Housekeeping desk. It is five to three. Are you clear?",
      "Nobody is waiting, the trolley is restocked, and the master key is signed in.",
      "Bàn buồng phòng là đồng nghiệp: không kính ngữ. Ba việc đóng ca, nói gọn. 'Signed in' /ˌsaɪnd ˈɪn/ — chữ g câm.",
      "colleague",
    ),
    sp(
      "Ms Lan here. Ten minutes left. Can you start 812 before you go?",
      "Ten minutes is not enough for 812, Ms Lan. May I leave it for the late shift and write why?",
      "Với cấp trên: gọi tên một lần, không kính ngữ. Nói thật về thời gian, rồi xin phép bằng một câu hỏi. 'Late shift' — nói liền hai từ.",
      "manager",
    ),
    sp(
      "Mai here, on the late shift. What do I pick up from you?",
      "1205 wants a clean after four, and 1210 is waiting for a cot from the front desk. Both are in the log.",
      "Đồng nghiệp nhận ca: không kính ngữ. Phòng CÒN việc nói trước, mỗi phòng một việc và một mốc, rồi chỉ chỗ đã ghi.",
      "colleague",
    ),
    risk({
      ...sp(
        "Water is dripping from my ceiling, and it is getting worse!",
        "I am calling Engineering now, madam, and I am staying here until they arrive.",
        "Mười lăm phút cuối không áp cho nguy hiểm: nước dột, mùi khét, khách ngã — xử lý ngay, và ở lại tới khi có người tiếp, dù đã quá giờ.",
      ),
      alsoAccept: [
        "I am phoning Engineering now, madam, and I am staying here until they arrive.",
        "I am calling Engineering now, madam, and I will stay here until they arrive.",
      ],
    }),
  ],
  reading: read(
    `THE LAST FIFTEEN MINUTES
Open a room at ten to three, and the late shift inherits it half-stripped: the bed bare and the guest's things moved. That is worse than a room nobody touched.
So the last fifteen minutes open no new job. A request that arrives now is written down and handed over by name. "Mai, 1205 wants a clean after four" belongs to someone; "the late shift will do it" belongs to nobody.
The fifteen minutes are for five things. Deliver what a guest is still waiting for, or hand it over by name. Strip and restock the trolley. Sign the keys in, with your name and the time. Write the log. Then tell your supervisor, face to face, the one thing that is not for the log.
That one thing might be a guest who made you uneasy. The floor log is read by everyone, so it does not go there.
Danger never waits for three o'clock. A leak, a smell of burning or a guest who has fallen is handled now, and you stay until somebody takes over.
Then go. A shift that ends late every day is a floor that is short of a person, and that is a conversation for your supervisor.`,
    [
      {
        q: "Còn mười phút là hết ca, khách nhờ dọn phòng. Làm gì?",
        options: [
          "Làm thật nhanh một lượt cho xong, để khách khỏi phải chờ tới ca sau",
          "Ghi lại và bàn giao đích danh cho người ca sau",
          "Bắt đầu dọn, ca sau làm nốt",
        ],
        correct: 1,
        explanation:
          "'the last fifteen minutes open no new job. A request that arrives now is written down and handed over by name.'",
      },
      {
        q: "Vì sao phải bàn giao 'đích danh'?",
        options: [
          "Vì việc giao cho 'ca sau' chung chung thì không thuộc về ai",
          "Vì giám sát cần biết người nào trong tổ hay để việc lại cho ca sau",
          "Vì khách muốn biết tên nhân viên ca sau",
        ],
        correct: 0,
        explanation:
          "'Mai, 1205 wants a clean after four belongs to someone; the late shift will do it belongs to nobody.'",
      },
      {
        q: "Trần phòng dột nước lúc 14 giờ 55, ca hết lúc 15 giờ. Làm gì?",
        options: [
          "Ghi vào sổ bàn giao cho ca sau xử lý, vì đã hết giờ mở việc mới",
          "Gọi Kỹ thuật ngay và ở lại tới khi có người tiếp, vì nguy hiểm không chờ hết ca",
          "Dặn khách tự gọi lễ tân rồi xuống đúng giờ",
        ],
        correct: 1,
        explanation:
          "'Danger never waits for three o'clock… handled now, and you stay until somebody takes over' — luật mười lăm phút không áp cho nguy hiểm.",
      },
    ],
  ),
  game: [
    round(
      0,
      "Ms Lan here. Who has the master key for nine?",
      "Nobody, Ms Lan. It was signed in at three, with my name and the time.",
      "Nobody, Ms Lan. It was sign in at three, with my name and the time.",
      "I gave it to the late shift attendant on my way down, madam, so she has it now.",
      "Phương án 'I gave it to the late shift attendant' trao chìa tổng ngoài sổ — và gọi cấp trên là 'madam'. Phương án 'was sign in' thiếu đuôi -ed của bị động. Câu đúng nói chìa đã ký nộp, có tên và giờ.",
      "manager",
    ),
    round(
      2,
      "It is ten to three. Could you quickly do my bathroom before you go?",
      "I am writing it down for the late shift now, sir, and I will hand it over by name.",
      "I am writing it down for the late shift now, sir, and I will hands it over by name.",
      "Of course, sir — I will rush through it in five minutes so that you do not have to wait.",
      "Phương án 'rush through it in five minutes' mở việc mới lúc cuối ca và làm ẩu một phòng tắm. Phương án 'will hands' sai: sau 'will' là động từ nguyên mẫu. Câu đúng ghi lại và bàn giao đích danh.",
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: xếp thứ tự khi nhiều việc tới cùng lúc — nguy hiểm trước nghĩa là gọi sơ cứu, tổng đài hoặc 115 trước, Duty Manager sau và ở lại với khách; trả lời bộ đàm bằng 'Stand by'; giữ một luật cửa và không mở phòng cho người đứng ở cửa; tách nhiều yêu cầu của một vị khách theo đúng người quyết; và trong mười lăm phút cuối ca không mở việc mới, ghi lại và bàn giao đích danh cho ca sau.",
};
