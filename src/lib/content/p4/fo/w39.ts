// FO week 39 — two new rules, then a rehearsal across the phase (see
// ../kit.ts).
//
//  · THE ORDER AT THE DESK: (1) someone in danger, (2) the guest in front of
//    you, (3) the phone, (4) email and messages. "Danger first" is an
//    action: call for help first — Security, the first aider or 115 — then
//    the Duty Manager, and somebody stays with the guest (a colleague keeps
//    the desk). The lift phone and an emergency call count as danger. A
//    guest at the desk comes before a ringing phone: answer within three
//    rings, ask "May I put you on hold for a moment?" and wait for the
//    answer; a guest who arrives during a call is served once the caller is
//    on hold. Nobody is left on hold for more than a minute.
//  · THE LAST FIFTEEN MINUTES: no new task is opened. A task is anything
//    that needs a follow-up; a quick answer is not a task. A new task is
//    written in the handover log (what, for whom, by when), handed over by
//    name and read back, and the guest is told who will do it and by when.
//    Danger is never handed over.
//  · The rehearsal lessons teach the words of their own situations (folio,
//    statement, business card, open item…), say the earlier weeks' words
//    again, and keep their rules exactly: a card hold is named only after the folio is
//    checked, any card refund needs the Duty Manager, the desk gives only
//    what is its own, a corporate rate needs proof, nothing is said about
//    another guest, Engineering decides whether a lift is used, and a
//    tentative hold lasts seven days.
import { game, g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("FO");
const L = lessonsFor("FO");

const t1a =
  "You are quite right, madam, and I am sorry. I am putting the caller on hold now, so you have my full attention.";
const t1b =
  "Of course, madam. I am booking it now, and I will confirm the time with you before I go back to the caller.";
const t1c =
  "Not at all, madam — the guest at the desk is always my first priority. Have a good flight.";

const t2a =
  "Of course, madam. I am writing it in the handover log now, and Huy on the night shift will book it.";
const t2b =
  "Yes, madam. I am handing it to Huy by name, and he will call you to confirm before eleven tonight.";
const t2c =
  "Then please call the desk. Your request is in the log with your name and the time, so any colleague can see it.";

export const week: AuthoredWeek = {
  title: {
    en: "First Things First, and the Last Fifteen Minutes",
    vi: "Việc gấp trước, và mười lăm phút cuối ca",
  },
  canDo:
    "Nói được: khi nhiều việc tới cùng lúc thì xếp đúng thứ tự — người gặp nguy (gọi cứu giúp trước, Duty Manager sau), khách trước mặt, điện thoại, rồi email; trong mười lăm phút cuối ca thì không mở việc mới mà ghi sổ, giao đích danh và báo khách ai sẽ làm; và xử lý một ca làm việc trộn mọi tình huống đã học.",
  lessons: [
    L(39, 1, "First Things First", "Việc gấp trước", {
      vocabulary: [
        c("Priority", "A guest in danger is always the first priority.", [
          "/praɪˈɒrəti/",
          "Việc ưu tiên",
          "🥇",
        ]),
        c("Someone in danger", "If someone in danger needs help, everything else waits.", [
          "/ˈsʌmwʌn ɪn ˈdeɪndʒə/",
          "Người đang gặp nguy hiểm",
          "🚩",
        ]),
        c("Put you on hold", "May I put you on hold for a moment, sir?", [
          "/pʊt juː ɒn həʊld/",
          "Bảo người gọi giữ máy chờ",
          "⏸️",
        ]),
        c("One at a time", "I will help you one at a time, in order.", [
          "/wʌn ət ə taɪm/",
          "Lần lượt từng người",
          "☝️",
        ]),
        c("Bear with me", "Please bear with me for one minute, madam.", [
          "/beə wɪð miː/",
          "Xin chờ tôi một chút",
          "🙏",
        ]),
      ],
      grammar: [
        g(
          "Wait. I am busy.",
          "I am with another guest, madam. Please bear with me for one minute.",
          "'be + with + người' nói đúng lý do mình chưa phục vụ được — khách chấp nhận một lý do, không chấp nhận 'I am busy'. Đừng bỏ 'am': người Việt hay nói 'I with…'.",
          "I with another guest, madam. Please bear with me for one minute.",
        ),
        g(
          "Hold on.",
          "May I put you on hold for a moment, sir? I will come straight back to you.",
          "Xin phép rồi mới giữ máy, và chờ người gọi đồng ý. Sau 'May I' là động từ nguyên thể 'put'.",
          "May I putting you on hold for a moment, sir? I will come straight back to you.",
        ),
      ],
      speaking: [
        sp(
          "Excuse me, I have been standing here while you are on the phone.",
          t1a,
          "Khách đứng trước quầy đi trước điện thoại. Nhận lỗi ngắn, nói việc mình đang làm (giữ máy người gọi), rồi dành trọn sự chú ý cho khách.",
        ),
        sp(
          "Thank you. I need a taxi to the airport in twenty minutes.",
          t1b,
          "Làm việc của khách trước mặt cho xong, rồi mới quay lại người gọi — và nói rõ thứ tự đó cho khách nghe.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Sorry, I took you away from your call.",
          t1c,
          "Không để khách áy náy. Một câu nói rõ thứ tự của quầy ('priority'), rồi một lời chúc ngắn.",
          undefined,
          undefined,
          t1b,
        ),
        risk({
          ...sp(
            "A guest has fallen by the pool, and three people are waiting at the desk. What first?",
            "Call the first aider now and stay with the guest. I will call the Duty Manager.",
            "Câu phải đúng của tuần: nguy hiểm trước nghĩa là GỌI CỨU GIÚP trước, Duty Manager sau, và có người ở lại với khách. Hàng chờ ở quầy đứng sau.",
            "colleague",
            ["first", "aider", "stay", "guest", "duty", "manager"],
          ),
          alsoAccept: [
            "Call the first aider now and stay with the guest. I am calling the Duty Manager.",
            "Call the first aider now, and stay with the guest. I will call the Duty Manager.",
            "Please call the first aider now and stay with the guest. I will call the Duty Manager.",
            "Stay with the guest and call the first aider now. I will call the Duty Manager.",
            "Call the first aider now and stay with the guest. Then I will call the Duty Manager.",
          ],
        }),
        {
          ...sp(
            "Hello, is that the front desk? I need to change my booking.",
            "Good evening, front desk. May I put you on hold for a moment, while I finish with a guest?",
            "Nghe máy trong ba hồi chuông, xin phép giữ máy ('put you on hold'), nói lý do ngắn — rồi CHỜ người gọi đồng ý.",
          ),
          alsoAccept: [
            "Good evening, front desk. May I put you on hold for one moment, while I finish with a guest?",
            "Good evening, front desk. Could I put you on hold for a moment, while I finish with a guest?",
          ],
        },
        {
          ...sp(
            "We were here first! Why is he being served before us?",
            "I am sorry, madam. Please bear with me — I am helping guests one at a time, and you are next.",
            "Không cãi chuyện ai tới trước. Xin khách chờ ('bear with me'), nói cách làm ('one at a time'), và cho khách biết mình đứng ở đâu.",
          ),
          alsoAccept: [
            "I am sorry, madam. Please bear with me — I am serving guests one at a time, and you are next.",
          ],
        },
        sp(
          "Why did you leave the desk with guests waiting?",
          "Someone in danger comes first. I saw a guest collapse in the lobby, so I called the first aider, then you.",
          "Báo cáo lên Duty Manager, không gọi sir hay madam: nói luật trước ('someone in danger'), rồi việc đã làm theo đúng thứ tự.",
          "manager",
        ),
        {
          ...sp(
            "The guest by the pool is not responding. Do I call the Duty Manager first?",
            "No. Call 115 for an ambulance first, then the Duty Manager. I will stay with the guest.",
            "Nói với đồng nghiệp, không gọi sir hay madam. Khách không phản ứng thì gọi 115 xin xe cấp cứu ('ambulance') TRƯỚC, Duty Manager sau — và luôn có người ở lại với khách.",
            "colleague",
          ),
          alsoAccept: [
            "No. First call 115 for an ambulance, then the Duty Manager. I will stay with the guest.",
          ],
        },
      ],
      reading: read(
        `WHEN EVERYTHING ARRIVES AT ONCE — THE ORDER AT THE DESK
1. Someone in danger. 2. The guest in front of you. 3. The phone. 4. Email and messages.
"Danger first" is an action, not a place in a queue. Call for help first: Security, the first aider or 115.
Then call the Duty Manager. The danger first, the manager second.
Someone stays with the guest in danger. If you must stay at the desk, send a colleague.
The lift phone and an emergency call count as danger. Answer them before anything else.
A guest standing at the desk comes before a ringing phone.
Answer the phone within three rings, and ask: "May I put you on hold for a moment?" Wait for the answer.
If a guest arrives while you are on a call, smile, finish your sentence, and put the caller on hold.
Never leave a caller on hold for more than a minute without coming back.
Email waits. Nobody is hurt by an email answered ten minutes later.
Serve people one at a time, and tell each one where they are in the order.`,
        [
          {
            q: "Một khách ngã ở hồ bơi trong lúc quầy đang đông. Lễ tân làm gì TRƯỚC?",
            options: [
              "Gọi Duty Manager để hỏi xem nên làm gì với vị khách bị ngã",
              "Làm xong cho khách đang đứng ở quầy, rồi mới gọi người giúp",
              "Gọi sơ cứu trước, cử một người ở lại với khách, rồi mới báo Duty Manager",
            ],
            correct: 2,
            explanation:
              'Tài liệu ghi "Call for help first: Security, the first aider or 115. Then call the Duty Manager." và "Someone stays with the guest in danger."',
          },
          {
            q: "Lễ tân đang nghe điện thoại thì một khách tới quầy. Làm gì?",
            options: [
              "Nói hết cuộc gọi rồi mới quay sang khách, vì người gọi tới trước",
              "Nói hết câu, xin người gọi giữ máy, rồi phục vụ khách",
              "Ra hiệu cho khách ngồi chờ ở sảnh cho tới khi xong cuộc gọi",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "smile, finish your sentence, and put the caller on hold." — khách đứng ở quầy đi trước điện thoại.',
          },
          {
            q: "Theo tài liệu, việc nào được xếp cuối cùng?",
            options: [
              "Thư điện tử và tin nhắn",
              "Điện thoại đang reo",
              "Khách đang đứng chờ ngay trước quầy lễ tân",
            ],
            correct: 0,
            explanation:
              'Tài liệu ghi "Email waits. Nobody is hurt by an email answered ten minutes later."',
          },
        ],
      ),
      game: [
        game(
          "I have been waiting here while you chat on the phone!",
          "I am sorry, sir. I am putting the caller on hold now, so you have my full attention.",
          "I am sorry, sir. I am put the caller on hold now, so you have my full attention.",
          "Please wait one more minute, sir. This caller was first, and it is only fair that I finish with him before you.",
          undefined,
          "Sau 'am' phải là V-ing 'putting'. Câu 'this caller was first' nghe công bằng nhưng ngược thứ tự của quầy: khách đứng trước mặt đi trước điện thoại.",
        ),
        game(
          "There is an email from a booker, a guest at the desk, and the phone is ringing. Which first?",
          "The guest at the desk. Ask the caller to hold, and answer the email after both.",
          "The email first. The booker may signs a big contract.",
          "The email first. The booker may sign a big contract.",
          "colleague",
          "Hai câu ưu tiên email vì hợp đồng lớn đều đảo thứ tự: người trước mặt, rồi điện thoại, email sau cùng. Câu 'may signs' còn sai: sau 'may' là động từ nguyên thể 'sign'.",
        ),
      ],
    }),

    L(39, 2, "The Last Fifteen Minutes of a Shift", "Mười lăm phút cuối ca", {
      vocabulary: [
        c("End of shift", "Near the end of shift, finish what you started.", [
          "/end əv ʃɪft/",
          "Cuối ca làm việc",
          "🕙",
        ]),
        c("New task", "In the last fifteen minutes, do not open a new task.", [
          "/njuː tɑːsk/",
          "Việc mới (cần theo dõi tiếp)",
          "🆕",
        ]),
        c("By name", "Hand the task over by name, not to the whole night shift.", [
          "/baɪ neɪm/",
          "Đích danh (cho một người có tên)",
          "🏷️",
        ]),
        c("Quick answer", "A quick answer is not a task, so just give it.", [
          "/kwɪk ˈɑːnsə/",
          "Câu trả lời nhanh (không cần theo dõi tiếp)",
          "💬",
        ]),
        c("Incoming shift", "The incoming shift reads the log before taking the first call.", [
          "/ˈɪnkʌmɪŋ ʃɪft/",
          "Ca vào, ca kế tiếp",
          "🔄",
        ]),
      ],
      grammar: [
        g(
          "My shift is finished. Ask somebody else.",
          "I will hand this to Huy by name, madam, and he will call you before eleven.",
          "Việc mới tới trong mười lăm phút cuối ca: không tự mở, nhưng không đẩy khách đi. Giao đích danh ('by name') và nói cho khách TÊN người sẽ làm, và khi nào. Sau 'will' là động từ nguyên thể.",
          "I will hand this to Huy by name, madam, and he will calls you before eleven.",
        ),
        g(
          "Someone from the night team will do it.",
          "It is in the handover log, sir, with your name and the time you asked.",
          "'Someone will do it' không phải bàn giao. Nói việc đã ghi ở đâu ('handover log') và ghi những gì. Đừng bỏ 'is' sau 'It'.",
          "It in the handover log, sir, with your name and the time you asked.",
        ),
      ],
      speaking: [
        sp(
          "Could you book me an airport car for five tomorrow morning?",
          t2a,
          "Gần hết ca thì không tự mở việc mới: ghi ngay vào sổ bàn giao ('handover log') và nói TÊN người sẽ làm — không bao giờ chỉ nói chung chung là một đồng nghiệp.",
          undefined,
          ["handover", "log"],
        ),
        sp(
          "Will he remember? I cannot miss this flight.",
          t2b,
          "Trấn an bằng cách làm, không bằng lời hứa suông: giao đích danh ('by name') cho một người có tên, và một mốc xác nhận cho khách.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "And if nobody calls?",
          t2c,
          "Cho khách một việc làm được nếu có trục trặc, và nói vì sao yêu cầu không thể bị quên: đã ghi, có tên, có giờ.",
          undefined,
          undefined,
          t2b,
        ),
        {
          ...sp(
            "I am sorry to bother you so late, but my husband suddenly feels very unwell.",
            "Please do not apologise, madam. I am calling our first aider now, and I will stay with you.",
            "Nguy hiểm không bao giờ được bàn giao, kể cả lúc sắp hết ca. Gọi cứu giúp ngay ('first aider') và ở lại với khách.",
            undefined,
            ["aider"],
          ),
          alsoAccept: [
            "Please do not apologise, madam. I am calling our first aider now, and I am staying with you.",
            "Please do not apologise, madam. I will call our first aider now, and I will stay with you.",
          ],
        },
        sp(
          "It is five to ten. A guest wants a refund for his minibar. Should I start it?",
          "No, it is a new task. Log it, hand it to a named person on the night shift, and tell the guest who will call.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Việc mới tới lúc cuối ca: ghi sổ, giao cho một người có tên ('a named person') — cả ca đêm không phải là một cái tên — rồi báo khách ai sẽ gọi. Không tự mở.",
          "colleague",
        ),
        sp(
          "Ten minutes left, and a guest wants to know when breakfast opens. Is that a new task?",
          "No, that is a quick answer, not a new task, so just tell the guest.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Câu trả lời nhanh ('quick answer') không phải việc mới — cứ trả lời ngay.",
          "colleague",
        ),
        sp(
          "I am taking over from you. Anything I should know?",
          "One new task, and it is yours by name. It is in the log for the incoming shift, so please read it back to me.",
          "Nói với đồng nghiệp ca sau, không gọi sir hay madam. Giao cho đúng một người, chỉ chỗ đã ghi, rồi xin đọc lại để chắc chắn.",
          "colleague",
        ),
        sp(
          "Why did you not book the car yourself before you left?",
          "It came near the end of shift, so I wrote it in the log and handed it over by name.",
          "Báo cáo lên cấp trên, không gọi sir hay madam: việc tới lúc nào, và mình đã làm đúng hai bước của luật cuối ca.",
          "manager",
        ),
      ],
      reading: read(
        `THE LAST FIFTEEN MINUTES OF A SHIFT
In the last fifteen minutes of your shift, do not open a new task.
A task is anything that needs a follow-up: a booking, a refund question, a complaint, a call back.
A quick answer is not a task. Directions, opening hours or the time of breakfast: just answer.
When a new task arrives, write it in the handover log at once: what, for whom, and by when.
Then hand it over by name. "The night shift" is not a name. Give it to one person, and ask them to read it back.
Tell the guest who will do it and by when. Never say "someone will call you".
Danger is never handed over. If someone is in danger at five to ten, you act, whatever the clock says.
A task you started earlier is yours to finish, or yours to hand over by name.
The incoming shift reads the log before taking the first call.`,
        [
          {
            q: "Mười phút trước khi hết ca, khách nhờ đặt xe sân bay cho sáng mai. Lễ tân làm gì?",
            options: [
              "Tự đặt xe ngay cho xong để khỏi làm phiền ca sau, rồi mới về",
              "Ghi sổ, giao đích danh cho ca sau, báo khách ai sẽ làm",
              "Nhờ khách gọi lại sau mười giờ để ca đêm tự xử lý",
            ],
            correct: 1,
            explanation:
              'Tài liệu dặn không mở việc mới trong mười lăm phút cuối, mà "write it in the handover log at once" và "hand it over by name".',
          },
          {
            q: "Câu nào KHÔNG phải là cách bàn giao đúng?",
            options: [
              "Giao cho một người có tên, rồi nhờ người đó đọc lại",
              "Ghi rõ việc gì, cho ai, hạn khi nào",
              "Nói với khách: sẽ có người gọi cho quý khách",
            ],
            correct: 2,
            explanation:
              'Tài liệu cấm nói "someone will call you" — khách phải biết ai sẽ làm và khi nào.',
          },
          {
            q: "Năm phút trước khi hết ca, có khách bị ngất ở sảnh. Lễ tân làm gì?",
            options: [
              "Ghi vào sổ và giao cho ca sau, vì đã cuối ca",
              "Hành động ngay, bất kể giờ nào — nguy hiểm không bao giờ được bàn giao",
              "Chờ ca sau tới rồi cùng xử lý cho chắc chắn",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "Danger is never handed over" và "you act, whatever the clock says" — luật cuối ca chỉ áp dụng cho việc mới, không áp dụng cho người gặp nguy.',
          },
        ],
      ),
      game: [
        game(
          "I know it is late, but I need to dispute a charge on my bill.",
          "Of course, sir. I am writing it in the log now, and Huy will look into it with you tonight.",
          "Of course, sir. I am write it in the log now, and Huy will look into it with you tonight.",
          "I am sorry, sir, my shift ends in ten minutes, so please come back tomorrow and ask whoever is on duty then.",
          undefined,
          "Sau 'am' phải là V-ing 'writing'. Câu bảo khách mai quay lại hỏi người trực lúc đó đúng tiếng Anh nhưng đẩy khách đi và không giao cho ai cả — luật cuối ca là giao đích danh, không phải từ chối.",
        ),
        game(
          "It is five to ten, and a guest asks where the pharmacy is. Do I hand that over too?",
          "No, that is an answer, not a new task. Just give the directions.",
          "Yes. Anything a guest asks in the last fifteen minutes go into the log for the night shift, even directions.",
          "Yes. Anything a guest asks in the last fifteen minutes goes into the log for the night shift, even directions.",
          "colleague",
          "Hai câu ghi cả việc chỉ đường vào sổ đều hiểu sai luật: một câu trả lời nhanh không phải việc mới — cứ trả lời. Câu 'Anything… go into' còn sai: 'anything' số ít đi với 'goes'.",
        ),
      ],
    }),

    L(39, 3, "Rehearsal: One Busy Hour", "Tổng duyệt: một giờ cao điểm", {
      vocabulary: [
        c("Folio", "Check the folio before you say anything about a charge.", [
          "/ˈfəʊliəʊ/",
          "Hoá đơn chi tiết của phòng trong hệ thống",
          "📒",
        ]),
        c("Second charge", "A card hold can look like a second charge on the guest's screen.", [
          "/ˈsekənd tʃɑːdʒ/",
          "Khoản thu thứ hai, bị trùng",
          "➕",
        ]),
        c("Statement", "The hold leaves the guest's bank statement when the bank releases it.", [
          "/ˈsteɪtmənt/",
          "Sao kê ngân hàng",
          "🏦",
        ]),
        c("Card refund", "Any card refund needs the Duty Manager's signature.", [
          "/kɑːd ˈriːfʌnd/",
          "Hoàn tiền vào thẻ",
          "💳",
        ]),
      ],
      grammar: [
        g(
          "That is not a charge, it is only a hold. Do not worry.",
          "I have checked the folio, sir, and one of them is a card hold from check-in, not a second charge.",
          "Chỉ gọi tên khoản tạm giữ SAU khi đã kiểm tra hoá đơn: hiện tại hoàn thành 'I have checked' cho thấy việc kiểm tra đã xong. Không nói 'đừng lo' thay cho kiểm tra.",
          "I have check the folio, sir, and one of them is a card hold from check-in, not a second charge.",
        ),
        g(
          "Stay longer and I give you a discount.",
          "In exchange for two more nights, madam, my Duty Manager may look at the rate.",
          "'In exchange for' + điều khách cho thêm; giá là việc của Duty Manager nên dùng 'may', không hứa. Sau 'may' là động từ nguyên thể.",
          "In exchange for two more nights, madam, my Duty Manager may looks at the rate.",
        ),
      ],
      speaking: [
        sp(
          "There are two charges on my card for one night. What is going on?",
          "I am sorry, sir. Let me look into it now, and please show me what you see.",
          "Bước đầu của khiếu nại tiền: xin lỗi về trải nghiệm, nhận việc ('look into'), mời khách cho xem — chưa kết luận gì.",
          undefined,
          ["look", "into"],
        ),
        sp(
          "Here. Two payments, the same amount, on the same day.",
          "Thank you, sir. I have checked, and one of them is a card hold from check-in, not a second charge.",
          "Chỉ gọi tên khoản tạm giữ ('card hold') SAU khi đã kiểm tra — 'I have checked' đi trước.",
          undefined,
          ["checked", "card", "hold"],
          "I am sorry, sir. Let me look into it now, and please show me what you see.",
        ),
        sp(
          "So when will the hold disappear?",
          "We release it at check-out, sir. After that, your bank decides when it leaves your statement.",
          "Nói phần của khách sạn (nhả khoản giữ lúc trả phòng) và phần của ngân hàng — không hứa ngày thay ngân hàng.",
          undefined,
          undefined,
          "Thank you, sir. I have checked, and one of them is a card hold from check-in, not a second charge.",
        ),
        {
          ...sp(
            "Last time I asked for a quiet room. Do you still have that?",
            "Yes, madam. It is a standing request on file, so your room tonight is on a high floor, away from the lift.",
            "Sở thích đã thành yêu cầu cố định trong hồ sơ ('standing request', 'on file') thì nói luôn kết quả khách sẽ thấy tối nay — không bắt khách nhắc lại.",
            undefined,
            ["file"],
          ),
          alsoAccept: [
            "Yes, madam. It is a standing request on file, so your room tonight is on a high floor and away from the lift.",
            "Yes, madam. It is on file, so your room tonight is on a high floor, away from the lift.",
          ],
        },
        {
          ...sp(
            "It is our wedding anniversary today. Could you do something small for us?",
            "Congratulations to you both, madam. To mark the occasion, a handwritten card from the desk will be in your room tonight.",
            "Chúc mừng trước, rồi thứ quầy tự cho được thì cho ngay để đánh dấu dịp đặc biệt ('occasion', 'handwritten card'); món có giá thì báo giá trước.",
            undefined,
            ["handwritten"],
          ),
          alsoAccept: [
            "Congratulations to you both, madam. To mark the occasion, there will be a handwritten card from the desk in your room tonight.",
            "Congratulations to you both, madam. A handwritten card from the desk will be in your room tonight.",
          ],
        },
        {
          ...sp(
            "If I stay two more nights, can you do a better rate?",
            "In exchange for two more nights, sir, my Duty Manager may look at the rate. Shall I ask now?",
            "'In exchange for' + điều khách cho thêm, rồi 'may' cho quyết định của Duty Manager. Hỏi khách trước khi đi hỏi.",
            undefined,
            ["exchange"],
          ),
          alsoAccept: [
            "In exchange for two more nights, sir, my Duty Manager may look at the rate. Shall I ask?",
          ],
        },
        {
          ...sp(
            "The guest with the double charge is getting louder. Should I just refund it?",
            "No. Do not interrupt him; write his claim down and check the folio. Any card refund needs the Duty Manager.",
            "Nói với đồng nghiệp, không gọi sir hay madam. Khách to tiếng thì làm đúng bước đầu của khiếu nại: không ngắt lời ('interrupt'), ghi lại điều khách nói ('claim'), kiểm tra hoá đơn; hoàn tiền vào thẻ thì luôn cần Duty Manager.",
            "colleague",
          ),
          alsoAccept: [
            "No. Let him finish, write his claim down and check the folio. Any card refund needs the Duty Manager.",
            "No, check the folio first. If it really is a second charge, any card refund needs the Duty Manager.",
          ],
        },
        {
          ...sp(
            "Is there really nothing you can do on the rate?",
            "I am not able to change the rate, sir. However, I can offer you a higher floor at no extra charge.",
            "Như Lan trong bài đọc: giá không phải của quầy, nhưng tầng cao hơn thì quầy tự cho được. 'However' mở câu thứ hai, và nói rõ 'at no extra charge'.",
            undefined,
            ["rate", "however", "higher", "floor", "extra", "charge"],
          ),
          alsoAccept: [
            "I cannot change the rate myself, sir. However, I can offer you a higher floor at no extra charge.",
            "I am not able to change the rate myself, sir. However, I can offer you a higher floor at no extra charge.",
            "I cannot change the rate myself, sir, but I can still offer you a higher floor at no extra charge.",
          ],
        },
      ],
      reading: read(
        `ONE BUSY HOUR AT THE DESK — 18:00 TO 19:00
At six, Lan has two guests at the desk and a phone ringing. She asks the caller to hold and serves the guests one at a time.
The first guest sees two payments for one night. Lan does not argue.
She checks the folio, finds a card hold from check-in, and explains it.
The second guest has stayed before. Her quiet room is on file, so Lan confirms it in one sentence and asks if anything is different.
At half past six, a couple mentions their anniversary. Lan offers a handwritten card, which the desk can give on its own.
They ask about a cake. Lan asks about allergies and quotes the total before she calls the pastry chef.
At seven, a guest asks for a better rate. Lan offers a higher floor, which is hers to give, and asks the Duty Manager about the rate.
She promises nothing that belongs to someone else.
Every request is in the log before the hour ends.`,
        [
          {
            q: "Khách thấy hai khoản tiền cho một đêm. Lan làm gì trước khi giải thích?",
            options: [
              "Hoàn ngay một khoản cho khách để khách bớt khó chịu",
              "Bảo khách tự hỏi ngân hàng của mình trước",
              "Kiểm tra hoá đơn, rồi mới nói đó là khoản tạm giữ",
            ],
            correct: 2,
            explanation:
              'Bài đọc ghi "She checks the folio, finds a card hold from check-in, and explains it." — chỉ nói sau khi đã kiểm tra.',
          },
          {
            q: "Vì sao Lan tự tặng thiệp viết tay mà không hỏi ai?",
            options: [
              "Vì đó là thứ quầy được tự cho",
              "Vì khách là khách quen của khách sạn từ lâu",
              "Vì Duty Manager đang bận với một khách khác",
            ],
            correct: 0,
            explanation:
              'Bài đọc ghi Lan "offers a handwritten card, which the desk can give on its own."',
          },
          {
            q: "Khách xin giá tốt hơn. Lan làm gì?",
            options: [
              "Giảm giá ngay vì khách hứa sẽ ở thêm hai đêm",
              "Cho tầng cao hơn, thứ Lan được tự cho, rồi hỏi Duty Manager về giá",
              "Từ chối và không nhắc gì tới giá nữa trong cả kỳ ở",
            ],
            correct: 1,
            explanation:
              'Bài đọc ghi "Lan offers a higher floor, which is hers to give, and asks the Duty Manager about the rate."',
          },
        ],
      ),
      game: [
        game(
          "Why is there a second payment on my card? I only stayed one night.",
          "Let me look into it now, madam. It may be a card hold from check-in, and I will check the folio first, so we know for certain.",
          "That is not a payment, madam, it is only a hold, so there is nothing to worry about and nothing for me to checking.",
          "That is not a payment, madam, it is only a hold, so there is nothing to worry about and nothing for me to check.",
          undefined,
          "Hai câu khẳng định ngay 'only a hold… nothing to check' đều kết luận trước khi kiểm tra — có khi đó là khoản thu thật bị trùng. Câu 'for me to checking' còn sai: sau 'to' là động từ nguyên thể 'check'.",
        ),
        game(
          "We are celebrating tonight. Can you send a cake up for us?",
          "Gladly, sir. Before I call the pastry chef, may I ask if anyone is allergic to anything?",
          "Gladly, sir. Before I call the pastry chef, may I asking if anyone is allergic to anything?",
          "Of course, sir, it will be in your room in ten minutes, and do not worry about the price, because it is a gift from us.",
          undefined,
          "Sau 'may I' là động từ nguyên thể 'ask'. Câu hứa bánh trong mười phút và tặng miễn phí đúng tiếng Anh nhưng sai ba điều: chưa hỏi dị ứng, hứa giờ thay bếp bánh, và tự cho món có giá — việc của Duty Manager.",
        ),
      ],
    }),

    L(39, 4, "Rehearsal: The Evening Shift", "Tổng duyệt: ca tối", {
      vocabulary: [
        c("Business card", "A business card is enough to confirm a corporate rate.", [
          "/ˈbɪznəs kɑːd/",
          "Danh thiếp",
          "📇",
        ]),
        c("Company ID", "A company ID works as well as a business card.", [
          "/ˈkʌmpəni ˌaɪ ˈdiː/",
          "Thẻ nhân viên của công ty",
          "🪪",
        ]),
        c("Another guest", "We never say anything about another guest, not even to a friend.", [
          "/əˈnʌðə ɡest/",
          "Một vị khách khác",
          "🔒",
        ]),
        c("Open item", "Every open item goes into the log with a named person beside it.", [
          "/ˈəʊpən ˈaɪtəm/",
          "Việc còn dở",
          "📂",
        ]),
      ],
      grammar: [
        g(
          "Your company? Show me something.",
          "May I see a business card or a company ID, sir, so I can confirm your corporate rate?",
          "Xin bằng chứng bằng một câu hỏi lịch sự và nói lý do ('so I can confirm…'). Sau 'can' là động từ nguyên thể, không thêm -s.",
          "May I see a business card or a company ID, sir, so I can confirms your corporate rate?",
        ),
        g(
          "He is in Room 512, I think.",
          "I am sorry, sir, I cannot tell you anything about another guest.",
          "Không bao giờ xác nhận khách khác có ở khách sạn, ở phòng nào hay đã về chưa — kể cả với người nói là quen. Sau 'cannot' là động từ nguyên thể.",
          "I am sorry, sir, I cannot told you anything about another guest.",
        ),
      ],
      speaking: [
        sp(
          "Good evening. I am with Lotus Pharma, and we have a corporate rate here.",
          "Welcome, sir. May I see a business card or a company ID, so I can confirm your corporate rate?",
          "Chào, rồi xin MỘT bằng chứng nhẹ nhàng kèm lý do ('so I can confirm'). Không hỏi gì thêm.",
          undefined,
          ["confirm"],
        ),
        sp(
          "Here is my card. Can my wife share the room on the same rate?",
          "Of course, sir. Your wife is welcome to share your room at the same corporate rate.",
          "Trả lời có, và nói rõ vẫn là giá doanh nghiệp — không tự thêm điều kiện mới.",
          undefined,
          undefined,
          "Welcome, sir. May I see a business card or a company ID, so I can confirm your corporate rate?",
        ),
        sp(
          "Good. And my colleague arrives tomorrow without a booking.",
          "I will check what we have for tomorrow, sir. Provided that the booking is made under your company's agreement, the corporate rate applies.",
          "Không hứa phòng trước khi kiểm tra; điều kiện của giá nói bằng 'Provided that' + một mệnh đề, đúng điều khoản doanh nghiệp.",
          undefined,
          undefined,
          "Of course, sir. Your wife is welcome to share your room at the same corporate rate.",
        ),
        risk({
          ...sp(
            "Is Mr Hale from the Lotus group back in his room yet?",
            "I am sorry, madam, I cannot tell you anything about another guest.",
            "Câu phải đúng của tuần: không xác nhận khách khác có ở khách sạn, ở phòng nào hay đã về chưa — kể cả với người nói là quen.",
            undefined,
            ["anything", "guest"],
          ),
          alsoAccept: [
            "I am sorry, madam, I am not able to tell you anything about another guest.",
            "I am afraid I cannot tell you anything about another guest, madam.",
            "I am sorry, madam, I cannot say anything about another guest.",
            "I am sorry, madam, I cannot tell you who is staying with us.",
            "I am afraid I cannot say who is staying with us, madam.",
            "I am sorry, madam, I cannot say who is staying with us, but you are welcome to leave a message.",
            "I am sorry, madam, I cannot say who is staying with us. May I take a message?",
          ],
        }),
        {
          ...sp(
            "Why is there a sign on the lift on the left?",
            "It is out of use tonight while Engineering checks it, madam, so please take the lift on the right.",
            "Nói tình trạng ('out of use'), ai đang lo (Kỹ thuật), và việc khách làm — không đoán khi nào sửa xong.",
            undefined,
            ["out", "use"],
          ),
          alsoAccept: [
            "It is out of use tonight while Engineering checks it, madam, so please use the lift on the right.",
          ],
        },
        {
          ...sp(
            "I think the man in the lobby chair is not well. He looks very grey.",
            "Thank you, sir. I am sending our first aider to him now, and I will stay with him.",
            "Nguy hiểm trước: gửi nhân viên sơ cứu ('first aider') ngay, ở lại với người đó, rồi mới báo Duty Manager.",
            undefined,
            ["aider"],
          ),
          alsoAccept: [
            "Thank you, sir. I am sending our first aider to him now, and I am staying with him.",
          ],
        },
        sp(
          "A booker called about the boardroom for next month. Can I promise it to them?",
          "Not yet. Offer a tentative hold for seven days, and send the proposal in writing today.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Giữ chỗ tạm có hạn bảy ngày, và bản đề xuất ('proposal') luôn gửi bằng văn bản.",
          "colleague",
        ),
        sp(
          "Anything I should know from your evening?",
          "There is one open item: a booker has a tentative hold on the boardroom. The left lift is also out of use until Engineering has checked it.",
          "Báo cáo lên Duty Manager, không gọi sir hay madam: việc còn dở ('open item') trước, rồi một điều cấp trên cần biết.",
          "manager",
        ),
      ],
      reading: read(
        `THE EVENING SHIFT — WHAT GOOD LOOKS LIKE
At seven, the left lift starts stopping between floors. Minh calls Engineering, who take it out of use for the night.
He tells every guest at the desk to use the lift on the right.
At eight, a guest checks in on a corporate rate. Minh asks for a business card, confirms the rate, and says nothing about other companies.
A visitor asks whether a colleague from the same group is in his room. Minh does not say yes or no about any guest.
He offers to take a message, without saying whether that guest is staying.
At nine, a guest in a lobby chair looks unwell. Minh sends the first aider at once, stays with the guest, and then calls the Duty Manager.
At half past nine, a booker calls about the boardroom. Minh offers a tentative hold for seven days and promises the quote in writing.
Before he leaves, every open item is in the log, with a named person beside it.`,
        [
          {
            q: "Một người hỏi đồng nghiệp cùng đoàn đã về phòng chưa. Minh làm gì?",
            options: [
              "Gọi lên phòng xem vị khách đó đã về hay chưa",
              "Không nói có hay không về bất kỳ khách nào",
              "Xác nhận vị khách có ở đây, nhưng không đọc số phòng",
            ],
            correct: 1,
            explanation:
              'Bài đọc ghi "Minh does not say yes or no about any guest." — xác nhận khách đang ở cũng đã là lộ thông tin.',
          },
          {
            q: "Ai quyết định thang máy bên trái ngừng sử dụng?",
            options: [
              "Khách tự chọn thang máy nào an toàn",
              "Lễ tân đang trực ở quầy trong ca tối",
              "Bộ phận Kỹ thuật, sau khi Minh gọi báo thang dừng giữa tầng",
            ],
            correct: 2,
            explanation:
              'Bài đọc ghi "Minh calls Engineering, who take it out of use for the night." — quầy báo, Kỹ thuật quyết.',
          },
          {
            q: "Trước khi hết ca, mỗi việc còn dở phải có gì?",
            options: [
              "Chữ ký xác nhận của Duty Manager",
              "Một lời hứa với khách là sẽ xong ngay trong đêm",
              "Một người có tên phụ trách, ghi trong sổ",
            ],
            correct: 2,
            explanation:
              'Bài đọc ghi "every open item is in the log, with a named person beside it."',
          },
        ],
      ),
      game: [
        game(
          "Can you just tell me if my friend Mr Hale has checked in?",
          "I am sorry, sir, I cannot say who is staying with us, but you are welcome to leave a message.",
          "I am sorry, sir, I cannot says who is staying with us, but you are welcome to leave a message.",
          "He checked in an hour ago, sir, but I am afraid I cannot give you his room number, for his own privacy.",
          undefined,
          "Sau 'cannot' là động từ nguyên thể 'say'. Câu không đọc số phòng nghe cẩn thận nhưng đã xác nhận vị khách đang ở — riêng điều đó đã là lộ thông tin.",
        ),
        game(
          "The booker wants the boardroom for next month. Should I just confirm it?",
          "Not yet. Offer the booker a tentative hold for seven days, and it becomes definite with the signed contract and the deposit.",
          "Not yet. Offers a tentative hold for seven days, and it becomes definite with the contract and the deposit.",
          "Yes, confirm it now. The booker sounded serious, and we can send the contract and ask for the deposit later.",
          "colleague",
          "Mệnh lệnh dùng động từ nguyên thể 'Offer'. Câu xác nhận ngay vì người đặt 'sounded serious' đúng tiếng Anh nhưng sai quy trình: chỉ hợp đồng đã ký và tiền cọc mới biến giữ chỗ tạm thành chính thức.",
        ),
      ],
    }),
  ],
};
