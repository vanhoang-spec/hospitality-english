// FO week 31 — telling the story of the hotel and the room (see ../kit.ts).
//
// What the desk may and may not do this week, kept the same as Phase 3:
//  · It tells ONE fact and ONE detail the guest can see, then stops. It never
//    guesses a fact it does not know — it offers the history folder.
//  · It sells a better room by what the guest will notice, offers to show it,
//    and quotes the price only when asked. A guest who says no is not asked
//    again. It never gives the better room at the old price: that is the
//    Duty Manager's decision.
//  · It says the thing the guest may not like (compact rooms, no bathtub,
//    building work) at the desk, before the guest goes up.
//  · It never says who is staying in the hotel, famous or not.
import { game, g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("FO");
const L = lessonsFor("FO");

const t1a = "It is a heritage building, madam, and the tiles you are standing on are original.";
const t1b =
  "It was a family home, madam, and the courtyard was their garden. The old tree is still there.";
const t1c =
  "Of course, madam. It is just through those doors, and it is very peaceful in the evening.";

const t2a =
  "The room upstairs overlooks the courtyard, sir, so it is peaceful at night, and it gets the morning light.";
const t2b =
  "Most guests feel it is worth the difference, sir. May I show you, so you can see for yourself?";
const t2c =
  "Of course, sir. Your own room is very comfortable, and the offer stays open if you change your mind.";

const t3a =
  "Of course, madam. Your keys are ready, and the lift is on your left, so you can settle in.";
const t3b =
  "Only one thing, madam. Breakfast is served in the courtyard, and it is lovely in the morning.";
const t3c =
  "It does, madam, and I can tell you another time, whenever it suits you. Have a peaceful night.";

const t4a =
  "I understand, madam, and I am sorry. The old-wing rooms are compact, but many guests find them charming.";
const t4b =
  "In all honesty, madam, a room in the new wing would suit you better. May I check if one is free?";
const t4c =
  "If it is the same category, there is no extra charge, madam. If not, I will tell you the difference first.";

export const week: AuthoredWeek = {
  canDo:
    "Nói được: kể ngắn câu chuyện của toà nhà và căn phòng bằng câu ghép hai–ba mệnh đề, mời khách tự xem phòng thay vì nói giá trước, và nói trước điều khách có thể không thích.",
  lessons: [
    L(31, 1, "The Story of the Building", "Câu chuyện của toà nhà", {
      vocabulary: [
        c("Heritage", "The old wing is a heritage building, so its windows cannot be changed.", [
          "/ˈherɪtɪdʒ/",
          "Di sản (công trình được bảo tồn)",
          "🏛️",
        ]),
        c("Restored", "The staircase was restored by hand, and it took a whole year.", [
          "/rɪˈstɔːd/",
          "Được phục dựng, trùng tu",
          "🛠️",
        ]),
        c("Original", "The floor tiles in the lobby are original.", [
          "/əˈrɪdʒənl/",
          "Nguyên bản, có từ ban đầu",
          "🧱",
        ]),
        c("Courtyard", "The courtyard was once the family garden.", [
          "/ˈkɔːtjɑːd/",
          "Sân trong",
          "🌳",
        ]),
      ],
      grammar: [
        g(
          "This building is old.",
          "This wing is a heritage building, sir, and the lobby tiles are original.",
          "'Old' nghe như xuống cấp. Nói loại công trình rồi chỉ MỘT chi tiết cụ thể, nối hai mệnh đề bằng 'and'. Chủ ngữ số nhiều 'the lobby tiles' đi với 'are'.",
          "This wing is a heritage building, sir, and the lobby tiles is original.",
        ),
        g(
          "They fixed it last year.",
          "The staircase was restored by hand, madam, and it took a whole year.",
          "Bị động quá khứ 'was + phân từ hai' (was restored) đặt trọng tâm vào công trình, không vào người sửa — đúng giọng kể di sản.",
          "The staircase was restore by hand, madam, and it took a whole year.",
        ),
      ],
      speaking: [
        {
          ...sp(
            "This lobby is beautiful. Is the building very old?",
            t1a,
            "Câu ghép hai mệnh đề: vế đầu nói loại công trình, vế sau chỉ một chi tiết khách đang nhìn thấy ngay dưới chân.",
          ),
          alsoAccept: [
            "It is a heritage building, madam, and the floor tiles here are original.",
            "This is a heritage building, madam, and the tiles under your feet are original.",
          ],
        },
        sp(
          "Really? What was it before it became a hotel?",
          t1b,
          "Quá khứ đơn 'was' cho cả hai vế. Kể một câu rồi thêm MỘT chi tiết còn thấy được hôm nay — đừng kể cả bài.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "How charming. Can we sit out there?",
          t1c,
          "Đồng ý trước, chỉ đường bằng một cụm ngắn, rồi thêm một tính từ cảm xúc: 'peaceful'.",
          undefined,
          undefined,
          t1b,
        ),
        {
          ...sp(
            "Was all this rebuilt, or is some of it really from the old house?",
            "The staircase was restored by hand, sir, and the floor tiles are original.",
            "Trả lời đúng câu hỏi 'cái nào cũ, cái nào mới' bằng hai vế: một vế bị động 'was restored', một vế 'are original'.",
          ),
          alsoAccept: [
            "The staircase was restored by hand, sir, and the tiles on the floor are original.",
            "The floor tiles are original, sir, and the staircase was restored by hand.",
          ],
        },
        {
          ...sp(
            "Somebody told us a famous general lived here. Is that true?",
            "I am not sure, sir, and I would rather not guess. May I bring you the history folder from the desk?",
            "Không biết thì nói không biết, và không đoán. Rồi trao cho khách một nguồn thật: tập tư liệu ở quầy.",
          ),
          alsoAccept: [
            "I do not know, sir, and I would rather not guess. May I bring you the history folder from the desk?",
            "I am not sure, sir, and I would prefer not to guess. Shall I bring you the history folder from the desk?",
          ],
        },
        sp(
          "A guest wants to know about the building. What do I tell her?",
          "Tell her it is a heritage building, and the staircase was restored by hand. Then offer her the history folder.",
          "Nói với đồng nghiệp: không gọi sir hay madam, câu mệnh lệnh ngắn, và chỉ hai sự thật đã có trên thẻ lịch sử.",
          "colleague",
        ),
      ],
      reading: read(
        `FRONT DESK — HOUSE HISTORY CARD
The facts below are one hotel's. Ask your Front Office Manager for your own, and write them over these.
1925: built as a family home. The courtyard was the family garden, and the old tree is still there.
1954: became a state guest house. Most of the original floor tiles survive in the lobby.
2019: opened as a hotel. The staircase was restored by hand over a whole year, from the original drawings.
How to tell it: one fact, then one detail the guest can see from where they stand. Then stop, and let the guest ask.
Join the two parts with "and" or "so". Two clauses are a story; six clauses are a lecture.
Never guess. A story you invent tonight is repeated in a review tomorrow.
If you do not know the answer, say so, and offer the history folder kept at the desk.`,
        [
          {
            q: "Theo thẻ, nên kể chuyện toà nhà cho khách theo cách nào?",
            options: [
              "Kể đủ cả ba mốc năm để khách thấy được bề dày lịch sử của toà nhà",
              "Một sự thật, một chi tiết khách đang thấy, rồi dừng",
              "Đưa khách tờ giới thiệu in sẵn thay cho lời kể",
            ],
            correct: 1,
            explanation:
              'Thẻ ghi "one fact, then one detail the guest can see from where they stand. Then stop" — khách nhớ được một chi tiết họ đang nhìn thấy, không nhớ một bài giảng.',
          },
          {
            q: "Khách hỏi điều bạn không biết thì phải làm gì?",
            options: [
              "Đoán câu trả lời nghe hợp lý nhất để khách khỏi phải chờ",
              "Nói là mình không biết, mời xem tập tư liệu",
              "Hẹn khách hỏi lại người ca sau, vì họ biết nhiều hơn",
            ],
            correct: 1,
            explanation:
              'Thẻ ghi "Never guess" và "say so, and offer the history folder kept at the desk" — chuyện bịa hôm nay sẽ thành một bài đánh giá ngày mai.',
          },
          {
            q: "Vì sao thẻ dặn ghi đè các mốc năm bằng mốc của khách sạn mình?",
            options: [
              "Vì đó là số liệu của một khách sạn khác",
              "Vì khách thường hỏi lại các mốc năm này vào ngày thứ hai",
              "Vì quản lý muốn kiểm tra trí nhớ của nhân viên mới",
            ],
            correct: 0,
            explanation:
              'Dòng đầu thẻ ghi "The facts below are one hotel\'s" — kể sai lịch sử của chính khách sạn mình còn tệ hơn không kể.',
          },
        ],
      ),
      game: [
        game(
          "Is this a real old building, or is it new and made to look old?",
          "It is a heritage building, sir, and the lobby tiles are original.",
          "It is a heritage building, sir, and the lobby tiles is original.",
          "It is old, sir. Please ask my manager about the details.",
          undefined,
          "'the lobby tiles is' sai: chủ ngữ số nhiều đi với 'are'. Câu đẩy sang quản lý thì đúng tiếng Anh nhưng sai việc: một câu hỏi về toà nhà là việc của quầy, và thẻ lịch sử ở quầy đã có câu trả lời.",
        ),
        game(
          "My guidebook says a famous poet wrote here. Which room was it?",
          "I would rather not guess, madam. The history folder at the desk may tell us.",
          "I would rather not to guess, madam. The history folder at the desk may tell us.",
          "It was probably the room on the top floor, madam. That is the nicest one.",
          undefined,
          "Sau 'would rather' là động từ nguyên thể KHÔNG có 'to'. Câu 'probably the room on the top floor' đúng ngữ pháp nhưng là một lời đoán — khách sẽ kể lại điều đó như sự thật.",
        ),
      ],
    }),

    L(31, 2, "Selling the Room by Its Story", "Bán phòng bằng câu chuyện, không bằng giá", {
      vocabulary: [
        c("Feature", "The best feature of that room is the morning light.", [
          "/ˈfiːtʃə/",
          "Điểm đặc trưng",
          "✨",
        ]),
        c("Overlook", "Rooms on this side overlook the courtyard.", [
          "/ˌəʊvəˈlʊk/",
          "Nhìn ra (từ trên cao)",
          "🪟",
        ]),
        c("Peaceful", "The courtyard side is peaceful at night.", ["/ˈpiːsfl/", "Yên bình", "🕊️"]),
        c("Worth the difference", "Most guests feel the suite is worth the difference.", [
          "/wɜːθ ðə ˈdɪfrəns/",
          "Đáng với khoản chênh lệch",
          "⚖️",
        ]),
        c("See for yourself", "May I show you the room, so you can see for yourself?", [
          "/siː fə jɔːˈself/",
          "Tự mình xem",
          "👀",
        ]),
      ],
      grammar: [
        g(
          "The suite is better. It costs more.",
          "The suite overlooks the courtyard, madam, so it is peaceful at night.",
          "Nâng hạng bằng một chi tiết khách cảm nhận được, không bằng chữ 'better'. 'so' nối chi tiết với cảm giác của khách. Chủ ngữ số ít 'the suite' → 'overlooks' có -s.",
          "The suite overlook the courtyard, madam, so it is peaceful at night.",
        ),
        g(
          "Do you want to pay more or not?",
          "May I show you the room first, sir? Then you can see for yourself.",
          "Mời xem trước, nói tiền sau. Sau 'May I' là động từ nguyên thể: 'May I show'.",
          "May I showing you the room first, sir? Then you can see for yourself.",
        ),
      ],
      speaking: [
        sp(
          "What is the difference between my room and the one upstairs?",
          t2a,
          "Ba mệnh đề nối bằng 'so' và 'and': một chi tiết (overlooks the courtyard), một cảm giác (peaceful), một điều khách thấy được (the morning light).",
        ),
        sp(
          "Your website says it is four hundred thousand more. Is it worth it?",
          t2b,
          "Khách đã tự nói giá — đừng cãi con số. Nói cảm nhận của khách khác, rồi mời khách tự xem: 'see for yourself'.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Hmm. I am not sure I want to spend more.",
          t2c,
          "Khách lưỡng lự thì dừng bán. Khen phòng khách đang có, và để ngỏ lời mời — không ép, không giảm giá.",
          undefined,
          undefined,
          t2b,
        ),
        {
          ...sp(
            "We just landed after fourteen hours. Is there a quieter room?",
            "There is, madam. The courtyard side is quieter than the street side, so you will sleep better tonight.",
            "Khách vừa xuống chuyến bay đêm: bán bằng sự YÊN TĨNH, không bằng cảnh đẹp. So sánh hơn 'quieter than' rồi nói lợi ích bằng 'so'.",
          ),
          alsoAccept: [
            "Yes, madam. The courtyard side is quieter than the street side, so you will sleep better tonight.",
            "There is, madam. The courtyard side is quieter than the street, so you will sleep better tonight.",
          ],
        },
        {
          ...sp(
            "I travel for work. Is the junior suite really better?",
            "The best feature of the junior suite is the desk by the window, sir, and it is peaceful for calls.",
            "Đừng trả lời bằng chữ 'better'. Gọi tên MỘT điểm đặc trưng gắn với nhu cầu khách vừa nói (công việc).",
          ),
          alsoAccept: [
            "Its best feature is the desk by the window, sir, and it is peaceful for calls.",
          ],
        },
        risk({
          ...sp(
            "It is our anniversary. Could you give us the courtyard suite at our price?",
            "I cannot change the rate, madam, but I can ask my Duty Manager now.",
            "Câu phải đúng của tuần: giữ phòng tốt hơn với giá cũ là quyết định của Duty Manager, không phải của quầy. Nói rõ điều mình không làm được, rồi điều mình làm ngay.",
            undefined,
            ["rate", "duty", "manager"],
          ),
          alsoAccept: [
            "I am not able to change the rate, madam, but I can ask my Duty Manager now.",
            "I cannot change the rate myself, madam. May I ask my Duty Manager?",
            "I cannot change the rate, madam, but I can ask the manager on duty now.",
          ],
        }),
      ],
      reading: read(
        `UPSELL GUIDE — FRONT DESK
Courtyard rooms, floors two to four: quiet at night, morning light, a view of the old tree. Plus 400,000 VND per night.
Street rooms: brighter in the afternoon, closer to the lift, and lively outside until late.
Method: name ONE thing the guest will notice, then offer to show the room. Never lead with the price.
Give the price only when the guest asks, and give the total, with tax and service charge.
Never offer the better room at the old price. That is a Duty Manager decision, so ask before you promise.
If the guest says no, note it and do not raise it again during the stay.
After 22:00, sell the courtyard room on the QUIET, never on the view. A guest off a late flight needs sleep more than a view.`,
        [
          {
            q: "Theo hướng dẫn, phải mở đầu lời mời nâng hạng bằng gì?",
            options: [
              "Mức chênh lệch giá giữa hai hạng phòng, để khách cân nhắc ngay từ đầu",
              "Một điều khách sẽ nhận thấy, rồi mời khách xem phòng",
              "Danh sách mọi ưu điểm của phòng, càng nhiều càng tốt",
            ],
            correct: 1,
            explanation:
              'Hướng dẫn ghi "name ONE thing the guest will notice, then offer to show the room. Never lead with the price."',
          },
          {
            q: "Khách xin phòng hướng sân trong với giá phòng cũ. Lễ tân làm gì?",
            options: [
              "Hỏi Duty Manager trước khi hứa bất cứ điều gì",
              "Đồng ý ngay, vì khách đến khách sạn đúng dịp kỷ niệm ngày cưới",
              "Từ chối thẳng và không nhắc tới phòng đó nữa",
            ],
            correct: 0,
            explanation:
              'Hướng dẫn ghi "Never offer the better room at the old price. That is a Duty Manager decision" — quầy hỏi, quản lý quyết.',
          },
        ],
      ),
      game: [
        game(
          "Why should I pay four hundred thousand more for a room of the same size?",
          "It overlooks the courtyard, sir, so it is peaceful at night. May I show you both?",
          "It overlook the courtyard, sir, so it is peaceful at night. May I show you both?",
          "It is simply our better category, sir, and nearly all of our regular guests choose it.",
          undefined,
          "'It overlook' thiếu -s với chủ ngữ số ít. Câu 'our better category… guests choose it' đúng tiếng Anh nhưng chỉ chào hàng: không nêu điều khách sẽ cảm nhận, và không mời khách tự xem.",
        ),
        game(
          "I am not paying more. Please stop selling to me.",
          "Of course, madam. Your room is very comfortable, and I will not offer it again during your stay.",
          "Of course, madam. Your room is very comfortable, and I will not offering it again.",
          "That is a shame, madam. Most guests say the courtyard room is worth the difference.",
          undefined,
          "Sau 'will not' là động từ nguyên thể 'offer'. Câu 'That is a shame… worth the difference' vẫn tiếp tục bán khi khách đã nói không — hướng dẫn dặn không nhắc lại trong cả kỳ ở.",
        ),
      ],
    }),

    L(31, 3, "Reading Whether They Want the Story", "Đọc xem khách có muốn nghe không", {
      vocabulary: [
        c("Keen", "Some guests are keen to hear the history of the house.", [
          "/kiːn/",
          "Hào hứng, muốn được nghe",
          "🙂",
        ]),
        c("Briefly", "May I tell you one thing about the building briefly?", [
          "/ˈbriːfli/",
          "Ngắn gọn",
          "⏱️",
        ]),
        c("Another time", "I can tell you the story another time, whenever it suits you.", [
          "/əˈnʌðə taɪm/",
          "Dịp khác",
          "📅",
        ]),
        c("Settle in", "Would you rather settle in first, madam?", [
          "/ˈsetl ɪn/",
          "Nghỉ ngơi, ổn định chỗ ở",
          "🛏️",
        ]),
      ],
      grammar: [
        g(
          "Let me tell you the whole history of this hotel.",
          "May I tell you one thing about the building briefly, sir, or would you rather settle in first?",
          "Xin phép và đưa sẵn lối thoát: 'or would you rather…?'. Sau 'May I' và sau 'would rather' đều là động từ nguyên thể.",
          "May I telling you one thing about the building briefly, sir, or would you rather settle in first?",
        ),
        g(
          "You are not interested, I see.",
          "Of course, madam. I can tell you the story another time, whenever it suits you.",
          "Không để lộ mình phật ý. 'whenever it suits you' trao quyền chọn lúc cho khách; 'it' số ít nên 'suits' có -s.",
          "Of course, madam. I can tell you the story another time, whenever it suit you.",
        ),
      ],
      speaking: [
        sp(
          "Sorry, we have been travelling all day. Can we just go to the room?",
          t3a,
          "Khách mệt: ba việc trong một câu — chìa khoá, lối đi, để khách nghỉ. Không kể chuyện gì cả.",
        ),
        sp(
          "Thank you. Is there anything we need to know tonight?",
          t3b,
          "Khách hỏi thì chỉ nói MỘT điều cần nhất, kèm một tính từ dễ chịu. 'Only one thing' báo trước là sẽ ngắn.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Lovely. My husband says this building has a story.",
          t3c,
          "Khách nhắc tới câu chuyện nhưng đang mệt: hẹn 'another time', để khách chọn lúc, rồi chúc ngủ ngon.",
          undefined,
          undefined,
          t3b,
        ),
        {
          ...sp(
            "We are here for a week. Is there anything special about this place?",
            "There is, sir. Briefly, it was a family home, and the courtyard you can see was their garden.",
            "Khách đã mở lời: vào chuyện bằng 'Briefly', kể một câu ghép, và chỉ vào thứ khách đang nhìn thấy.",
          ),
          alsoAccept: [
            "There is, sir. Briefly, it was a family home, and the courtyard was their garden.",
            "Yes, sir. Briefly, it was a family home, and this courtyard was their garden.",
          ],
        },
        sp(
          "The guest by the window keeps looking at the ceiling. Should I say something?",
          "Ask her briefly if she is keen to hear about the building. If she says no, stop there.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Hai câu ngắn: hỏi khách có muốn nghe không; khách không muốn thì dừng.",
          "colleague",
        ),
        {
          ...sp(
            "There is a queue behind me, but I would love to hear the history.",
            "Then may I tell you briefly once you have settled in, sir? I will come and find you in the lobby.",
            "Có hàng chờ thì không kể ở quầy. Hẹn lúc khách đã nghỉ ngơi xong ('settled in'), và nói rõ ai sẽ đi tìm ai.",
          ),
          alsoAccept: [
            "Then may I tell you briefly once you have settled in, sir? I will find you in the lobby.",
            "May I tell you briefly after you have settled in, sir? I will come and find you in the lobby.",
          ],
        },
      ],
      reading: read(
        `WHEN TO TELL THE STORY — DESK NOTE
Tell it when the guest asks, when the guest is looking around the lobby, or when the guest mentions old buildings or photography.
Do NOT tell it when the guest arrived on a night flight, when there is a queue, or when the guest is on the phone.
A tired child at the desk also means no story tonight.
One sentence first, always. If the guest asks a second question, continue. If not, stop.
Start with "Briefly," so the guest knows it will be short.
If there is a queue and the guest is keen, offer to find them later in the lobby. Never make the queue wait for a story.
A guest who says no today may say yes on day two. Note in the profile that the story was offered, and never offer it twice in one day.`,
        [
          {
            q: "Khi nào KHÔNG nên kể chuyện toà nhà?",
            options: [
              "Khi khách đang đứng ngắm trần nhà và nền gạch quanh sảnh lễ tân",
              "Khi khách nhắc tới chuyện chụp ảnh kiến trúc",
              "Khi khách vừa xuống chuyến bay đêm, hoặc có hàng chờ",
            ],
            correct: 2,
            explanation:
              'Ghi chú liệt kê "Do NOT tell it when the guest arrived on a night flight, when there is a queue" — hai lúc khách chỉ muốn đi.',
          },
          {
            q: "Có hàng chờ mà khách lại rất muốn nghe chuyện thì làm gì?",
            options: [
              "Hẹn tìm khách ở sảnh sau, không để hàng chờ phải đợi",
              "Kể thật nhanh ngay tại quầy, rồi mới phục vụ người tiếp theo trong hàng",
              "Xin lỗi khách vì quầy không có thời gian kể chuyện",
            ],
            correct: 0,
            explanation:
              'Ghi chú ghi "offer to find them later in the lobby. Never make the queue wait for a story."',
          },
        ],
      ),
      game: [
        game(
          "We are quite tired, actually.",
          "Then let me get you upstairs, madam. Your keys are ready, and the lift is on the left.",
          "Then let me getting you upstairs, madam. Your keys are ready, and the lift is on the left.",
          "It only takes two minutes, madam. Most guests really enjoy hearing about the building.",
          undefined,
          "Sau 'let me' là động từ nguyên thể 'get'. Câu 'It only takes two minutes' đúng tiếng Anh nhưng giữ một vị khách đã nói mình mệt ở lại quầy — đọc sai khách.",
        ),
        game(
          "My taxi leaves in five minutes. Is there time for the story?",
          "Not today, sir. May I tell you briefly when you come back this evening?",
          "Not today, sir. May I telling you briefly when you come back this evening?",
          "It is a long story, sir, but I can tell you the main parts very quickly now.",
          undefined,
          "Sau 'May I' là 'tell', không phải 'telling'. Câu kể vội 'the main parts very quickly' đúng ngữ pháp nhưng làm khách trễ xe — một câu chuyện không bao giờ đáng một chuyến xe lỡ.",
        ),
      ],
    }),

    L(31, 4, "The Story That Sets Expectations", "Kể để khách không bị bất ngờ", {
      vocabulary: [
        c("Compact", "Rooms in the old wing are compact but comfortable.", [
          "/kəmˈpækt/",
          "Nhỏ gọn",
          "📐",
        ]),
        c("In all honesty", "In all honesty, madam, the new wing suits a family better.", [
          "/ɪn ɔːl ˈɒnəsti/",
          "Thành thật mà nói",
          "🤝",
        ]),
        c("Charming", "The old wing is small but charming.", [
          "/ˈtʃɑːmɪŋ/",
          "Duyên dáng, có nét riêng",
          "🌸",
        ]),
        c("No surprises", "I am telling you now, so there are no surprises upstairs.", [
          "/nəʊ səˈpraɪzɪz/",
          "Không có gì bất ngờ",
          "✅",
        ]),
      ],
      grammar: [
        g(
          "The old rooms are small. Nothing I can do.",
          "The old-wing rooms are compact but charming, madam. I am telling you now, so there are no surprises.",
          "'Compact but charming' thay cho 'small': 'but' nối một hạn chế với một điểm cộng. Chủ ngữ số nhiều 'rooms' đi với 'are'.",
          "The old-wing rooms is compact but charming, madam. I am telling you now, so there are no surprises.",
        ),
        g(
          "You should have booked the new wing.",
          "In all honesty, sir, the new wing suits a family better. Shall I check if a room is free?",
          "Không trách lựa chọn của khách. 'In all honesty' rồi một đề nghị hành động. Chủ ngữ số ít 'the new wing' → 'suits'.",
          "In all honesty, sir, the new wing suit a family better. Shall I check if a room is free?",
        ),
      ],
      speaking: [
        sp(
          "The photos online made the room look much bigger than this.",
          t4a,
          "Đừng bảo vệ tấm ảnh. Công nhận, xin lỗi, rồi nói sự thật bằng hai tính từ: 'compact' và 'charming'.",
        ),
        sp(
          "Charming, yes, but we have two large suitcases.",
          t4b,
          "Khách đã nói lý do thật (hành lý). Mở bằng 'In all honesty', khuyên phòng hợp hơn, rồi hỏi để kiểm tra — chưa hứa.",
          undefined,
          undefined,
          t4a,
        ),
        {
          ...sp(
            "Yes, please. Will it cost more?",
            t4c,
            "Nói tiền TRƯỚC khi đổi phòng: cùng hạng thì không thêm phí; khác hạng thì báo chênh lệch trước.",
            undefined,
            undefined,
            t4b,
          ),
          alsoAccept: [
            "If it is the same category, there is no extra charge, madam. If it is not, I will tell you the difference first.",
          ],
        },
        {
          ...sp(
            "Is there anything about the old wing we should know before we go up?",
            "In all honesty, sir, the rooms are compact and there is no bathtub. I am telling you now, so there are no surprises.",
            "Nói điều khách có thể không thích NGAY ở quầy. Câu sau giải thích vì sao mình nói: 'no surprises'.",
          ),
          alsoAccept: [
            "In all honesty, sir, the rooms are compact and have no bathtub. I am telling you now, so there are no surprises.",
            "In all honesty, sir, the rooms are compact, with no bathtub. I am telling you now so there are no surprises.",
          ],
        },
        risk({
          ...sp(
            "Is anyone famous staying in the heritage suite tonight?",
            "I am sorry, sir, I cannot tell you who is staying with us.",
            "Câu phải đúng của tuần: không bao giờ nói ai đang ở khách sạn, dù khách hỏi vui. Không gợi ý, không nói 'maybe'.",
            undefined,
            ["staying"],
          ),
          alsoAccept: [
            "I am sorry, sir, I am not able to tell you who is staying with us.",
            "I am afraid I cannot tell you who is staying with us, sir.",
            "I am sorry, sir, I cannot say who is staying with us.",
          ],
        }),
        sp(
          "A family of four wants the old wing for the charm. Is that a good idea?",
          "In all honesty, no. The old-wing rooms are compact, so I recommend the new wing instead.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Trả lời thẳng rồi nêu lý do bằng 'so', và gợi ý thay thế bằng 'instead'.",
          "colleague",
        ),
      ],
      reading: read(
        `SETTING EXPECTATIONS AT CHECK-IN — FRONT DESK
Say these BEFORE the guest goes up, every time.
Old wing: rooms are compact, there is no bathtub, and the lift stops one floor below the top.
Courtyard rooms: the old tree is lit until 22:00, and some guests find it bright.
Street rooms: the street is lively until late, and loudest at the weekend. Do not promise an hour of quiet we cannot hold.
Fourth floor: building work until the end of the month, on weekdays only.
Say the limit first, then the charm. Compact but charming is honest; charming alone is a promise the room will break.
Guests often ask who has stayed in the heritage suite. We never say who is staying with us, tonight or any night.
A guest told at the desk asks a question. A guest who finds out upstairs makes a complaint.`,
        [
          {
            q: "Vì sao phải nói những điều này TRƯỚC khi khách lên phòng?",
            options: [
              "Vì quy định bắt khách phải ký xác nhận là đã được thông báo đầy đủ từ trước",
              "Khách được báo ở quầy sẽ hỏi; khách tự phát hiện sẽ khiếu nại",
              "Vì như vậy thủ tục trả phòng về sau sẽ nhanh hơn rất nhiều",
            ],
            correct: 1,
            explanation:
              'Tài liệu kết bằng "A guest told at the desk asks a question. A guest who finds out upstairs makes a complaint."',
          },
          {
            q: "Khách hỏi ai đang ở phòng suite di sản thì lễ tân trả lời thế nào?",
            options: [
              "Nói tên khách nếu đó là người nổi tiếng",
              "Gợi ý khéo để khách tự đoán ra",
              "Không bao giờ nói ai đang lưu trú",
            ],
            correct: 2,
            explanation:
              'Tài liệu ghi "We never say who is staying with us, tonight or any night." — người nổi tiếng cũng là khách.',
          },
        ],
      ),
      game: [
        game(
          "Nobody told us there would be drilling above our room all morning.",
          "We should have told you, madam, and I am sorry. May I move you to a room away from the work?",
          "We should have tell you, madam, and I am sorry. May I move you to a room away from the work?",
          "The work is on our website, madam, and it stops at four o'clock every day.",
          undefined,
          "Sau 'should have' là phân từ hai 'told'. Câu 'it is on our website' đúng tiếng Anh nhưng đổ lỗi cho khách vì không đọc — khách cần một lời xin lỗi và một phòng yên tĩnh.",
        ),
        game(
          "We booked the old wing for the charm. Will we be happy there?",
          "It is charming, sir, but compact. In all honesty, it suits two people with light luggage.",
          "It is charming, sir, but compact. In all honesty, it suit two people with light luggage.",
          "You will love it, sir. Every guest says it is the most charming part.",
          undefined,
          "'it suit' thiếu -s. Câu 'You will love it… every single guest' đúng ngữ pháp nhưng hứa thay căn phòng — hứa quá là cách chắc nhất để có một khiếu nại.",
        ),
      ],
    }),
  ],
};
