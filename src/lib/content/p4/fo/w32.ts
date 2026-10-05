// FO week 32 — personalised advice from what the guest said (see ../kit.ts).
//
//  · Advice starts from the guest's own words: "Since you mentioned…",
//    "Based on…". One suggestion, one reason, and the guest chooses.
//  · The desk ACTS on a preference within the stay, and ASKS before it writes
//    one down. A preference the guest did not agree to is a note about a
//    person, not a preference.
//  · An allergy the guest mentions is acted on at once (housekeeping, in
//    writing); the desk promises its own call, never another team's time.
//  · A past upgrade is not a preference: only the Duty Manager decides it
//    again. The desk never says where another guest is staying.
//  · A recorded preference that cannot be met is said at the desk, with the
//    next best and the right room held for the next night.
import { game, g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("FO");
const L = lessonsFor("FO");

const t1a =
  "I am sorry, madam. Since you mentioned it, may I move you to the courtyard side tonight?";
const t1b =
  "Then I will choose a high floor away from the street, madam, so it is peaceful at night.";
const t1c = "Shall I note that you are a light sleeper for your next stay, madam?";

const t2a =
  "Based on your flight time, sir, may I book a wake-up call and a breakfast box for you?";
const t2b =
  "Of course, sir. I will book the airport car tonight and confirm the time with you before you go up.";
const t2c =
  "Just one thing, sir: the morning traffic can be heavy, so an early start is the safe choice.";

const t3a =
  "Not at all, madam. Your preferences are on file: a high floor and a firm pillow, as before.";
const t3b = "Of course, madam. Is there anything different you would like this time?";
const t3c =
  "I will check that for you now, madam. Late check-out is subject to availability, and I will confirm it by this evening.";

const t4a =
  "I am sorry, madam. The courtyard side is fully occupied tonight, but the next best is a high floor with double glazing.";
const t4b =
  "I have held your usual room for tomorrow, madam, and I will ask a bellman to move your bags.";
const t4c =
  "Of course, madam. May I mark the courtyard side as a standing request on your profile?";

export const week: AuthoredWeek = {
  canDo:
    "Nói được: tư vấn theo đúng điều khách đã nói ('Based on…', 'Since you mentioned…'), hỏi khách trước khi ghi một sở thích, và khi không đáp ứng được thì báo ngay ở quầy kèm phương án tốt nhất còn lại.",
  lessons: [
    L(32, 1, "Since You Mentioned…", "Vì quý khách đã nhắc tới…", {
      vocabulary: [
        c("Light sleeper", "She is a light sleeper, so a room away from the street is best.", [
          "/laɪt ˈsliːpə/",
          "Người ngủ không sâu, dễ thức giấc",
          "😴",
        ]),
        c("Mention", "Guests often mention a preference only once, so listen the first time.", [
          "/ˈmenʃn/",
          "Nhắc tới, kể ra",
          "💬",
        ]),
        c("In passing", "The guest said it in passing, but it still matters.", [
          "/ɪn ˈpɑːsɪŋ/",
          "Nói lướt qua",
          "🗨️",
        ]),
        c("Act on", "Hearing a preference is not enough; we act on it the same day.", [
          "/ækt ɒn/",
          "Làm ngay theo điều đã nghe",
          "⚡",
        ]),
        c("Firm pillow", "May I send up a firm pillow tonight?", [
          "/fɜːm ˈpɪləʊ/",
          "Gối cứng",
          "🛏️",
        ]),
      ],
      grammar: [
        g(
          "You said you sleep badly, so I moved you.",
          "Since you mentioned you are a light sleeper, madam, I have moved you to the courtyard side.",
          "'Since you mentioned…' nhắc lại đúng lời khách, không diễn giải thành điều tiêu cực hơn. 'mentioned' là quá khứ: khách đã nói rồi. Hiện tại hoàn thành 'I have moved' báo việc đã xong.",
          "Since you mention you are a light sleeper, madam, I have moved you to the courtyard side.",
        ),
        g(
          "I will write it in your file.",
          "Shall I note that for your next stay, sir?",
          "Hỏi trước khi ghi: sở thích khách chưa đồng ý ghi thì chưa phải sở thích. Sau 'Shall I' là động từ nguyên thể.",
          "Shall I noting that for your next stay, sir?",
        ),
      ],
      speaking: [
        sp(
          "The traffic was quite loud last night, but never mind.",
          t1a,
          "Khách bảo 'không sao' không có nghĩa là bỏ qua. Xin lỗi, rồi dùng 'Since you mentioned it' để cho khách thấy mình đã nghe.",
        ),
        sp(
          "That would be lovely. I am a light sleeper.",
          t1b,
          "Làm theo đúng điều khách vừa nói: chọn phòng tầng cao, xa phố, rồi nói lợi ích bằng 'so'.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Thank you. Will you remember that next time?",
          t1c,
          "Đây là lúc HỎI trước khi ghi. Một câu hỏi bắt đầu bằng 'Shall I note' — khách đồng ý thì mới thành sở thích.",
          undefined,
          undefined,
          t1b,
        ),
        risk({
          ...sp(
            "Oh, and I am allergic to feathers, by the way.",
            "Thank you, sir. I will ask housekeeping to change your pillows now.",
            "Câu phải đúng của tuần: dị ứng thì làm NGAY, giao đúng bộ phận buồng phòng. Không hứa 'hoàn toàn không có lông vũ', không hứa giờ thay buồng phòng.",
            undefined,
            ["housekeeping", "pillows"],
          ),
          alsoAccept: [
            "Thank you, sir. I will ask housekeeping to change the pillows now.",
            "Of course, sir. I will ask housekeeping to change your pillows straight away.",
            "Thank you, sir. I am asking housekeeping to change your pillows now.",
          ],
        }),
        sp(
          "I go running every morning, if that matters.",
          "Since you mentioned running, sir, the river path starts just behind the hotel, and it is quiet early in the morning.",
          "Biến một câu nói lướt thành một lời khuyên riêng: mở bằng 'Since you mentioned running', rồi một thông tin dùng được ngay.",
        ),
        sp(
          "Mrs Bauer said in passing that her pillow was too soft. Should I write it down?",
          "She said it in passing, so act on it today: send up a firm pillow, then ask her before you note it.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Thứ tự: làm trước ('act on it'), hỏi khách sau, rồi mới ghi.",
          "colleague",
        ),
        {
          ...sp(
            "The pillows were a bit soft, but it is not a big problem.",
            "Let me send up a firm pillow now, sir. Shall I note it for your next stay as well?",
            "Làm ngay trong kỳ ở, rồi hỏi trước khi ghi cho lần sau. Không tự ghi khi khách chưa đồng ý.",
          ),
          alsoAccept: [
            "Let me send you a firm pillow now, sir. Shall I note it for your next stay as well?",
            "I will send up a firm pillow now, sir. Shall I note it for your next stay too?",
          ],
        },
      ],
      reading: read(
        `PREFERENCE CAPTURE — FRONT DESK STANDARD
A preference is anything the guest says about how they want to stay, even in passing, even with a smile.
Hear it anywhere: small talk at check-in, a complaint softened with "never mind", a request to housekeeping.
Act on it within the stay if you can, not at the next booking. A firm pillow tonight is worth more than a perfect note.
Then ask before you write: "Shall I note that for your next stay?"
A preference the guest did not say yes to is not a preference. It is a note about a person.
Write it the same shift, in the guest's own words.
Never note health, age or family details the guest did not choose to tell you.
An allergy is different. Act on it at once, and tell housekeeping in writing.`,
        [
          {
            q: "Trước khi ghi một sở thích vào hồ sơ, lễ tân phải làm gì?",
            options: [
              "Hỏi khách có muốn ghi lại cho lần sau không",
              "Ghi ngay để ca sau biết, rồi báo khách sau",
              "Chờ tới khi khách nhắc lại lần thứ hai cho thật chắc chắn",
            ],
            correct: 0,
            explanation:
              'Chuẩn ghi "ask before you write" và "A preference the guest did not say yes to is not a preference."',
          },
          {
            q: "Khách vừa nói một sở thích. Nên làm gì trước tiên?",
            options: [
              "Chỉ ghi lại để dùng cho lần đặt phòng sau của khách",
              "Làm ngay trong kỳ ở nếu có thể, như mang gối cứng lên đêm nay",
              "Báo quản lý để quyết định có làm hay không",
            ],
            correct: 1,
            explanation:
              'Chuẩn ghi "Act on it within the stay if you can, not at the next booking" và "A firm pillow tonight is worth more than a perfect note."',
          },
        ],
      ),
      game: [
        game(
          "I mentioned yesterday that I start work very early.",
          "Since you mentioned it, sir, may I book you a wake-up call and a breakfast box?",
          "Since you mention it, sir, may I book you a wake-up call and a breakfast box?",
          "We do not serve breakfast that early, sir, but you can buy coffee at the station.",
          undefined,
          "'Since you mention it' sai thì: khách đã nói từ hôm qua nên phải là 'mentioned'. Câu 'buy coffee at the station' đúng tiếng Anh nhưng đẩy khách đi tự lo — quầy có thể đặt báo thức và hộp ăn sáng.",
        ),
        game(
          "I always sleep badly in hotels. It is not your fault.",
          "Since you mentioned it, madam, may I put you on a high floor, away from the lift?",
          "I am so sorry to hear that, madam. Most of our guest find our beds very comfortable indeed.",
          "I am so sorry to hear that, madam. Most of our guests find our beds very comfortable indeed.",
          undefined,
          "Hai câu 'Most of our guests find our beds very comfortable' đều lịch sự nhưng không làm gì cho khách — khách vừa trao cho bạn một sở thích để hành động. Câu 'Most of our guest' còn thiếu -s số nhiều: 'guests'.",
        ),
      ],
    }),

    L(32, 2, "Based on What You Told Me", "Tư vấn dựa trên điều khách đã nói", {
      vocabulary: [
        c("Based on", "Based on your flight time, I suggest an early wake-up call.", [
          "/beɪst ɒn/",
          "Dựa trên",
          "🧭",
        ]),
        c("Early start", "You have an early start, so may I book a wake-up call?", [
          "/ˈɜːli stɑːt/",
          "Phải đi từ rất sớm",
          "🌅",
        ]),
        c("Breakfast box", "The kitchen can prepare a breakfast box the night before.", [
          "/ˈbrekfəst bɒks/",
          "Hộp ăn sáng mang theo",
          "🥐",
        ]),
        c("Away from the lift", "A room away from the lift is quieter at night.", [
          "/əˈweɪ frəm ðə lɪft/",
          "Xa thang máy",
          "🚪",
        ]),
      ],
      grammar: [
        g(
          "You must leave at five.",
          "Based on your flight time, sir, I would suggest leaving the hotel by five.",
          "'Based on…' nêu căn cứ trước, rồi 'I would suggest + V-ing'. Lời khuyên, không phải mệnh lệnh: khách vẫn là người quyết.",
          "Based on your flight time, sir, I would suggest to leave the hotel by five.",
        ),
        g(
          "This room is good for you.",
          "Based on what you told me, madam, a room away from the lift would suit you best.",
          "'Based on what you told me' cho khách thấy lời khuyên là của riêng họ. 'told' là quá khứ: khách đã nói xong.",
          "Based on what you tell me, madam, a room away from the lift would suit you best.",
        ),
      ],
      speaking: [
        {
          ...sp(
            "We fly at seven tomorrow morning, so we have an early start.",
            t2a,
            "Mở bằng căn cứ 'Based on' cộng giờ bay của khách, rồi đề nghị hai việc quầy làm được ngay.",
          ),
          alsoAccept: [
            "Based on your flight time, sir, shall I book a wake-up call and a breakfast box for you?",
            "Based on your flight time, sir, may I book you a wake-up call and a breakfast box?",
          ],
        },
        sp(
          "Yes, please. And a taxi to the airport?",
          t2b,
          "Hứa việc của CHÍNH quầy (đặt xe, xác nhận giờ) và nói rõ khi nào xác nhận.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Is there anything else we should know?",
          t2c,
          "Một lời khuyên, một lý do: giao thông buổi sáng. Nối bằng 'so' để thấy vì sao 'an early start' là đúng.",
          undefined,
          undefined,
          t2b,
        ),
        {
          ...sp(
            "I have calls with London every night. Which room is best?",
            "Since you have calls at night, sir, I suggest a room away from the lift, on a high floor.",
            "Lời khuyên đi theo nhu cầu khách vừa nói: gọi điện ban đêm thì cần yên tĩnh, nên 'away from the lift'.",
          ),
          alsoAccept: [
            "Since you have calls at night, sir, I would suggest a room away from the lift, on a high floor.",
            "Since you make calls at night, sir, I suggest a room away from the lift, on a high floor.",
          ],
        },
        sp(
          "We are travelling with our baby, and we have a big pram.",
          "Based on what you told me, madam, a room near the lift would be easier with the pram.",
          "Cá nhân hoá là lời khuyên ĐỔI theo khách: có xe đẩy thì gần thang máy mới tiện. 'would be' — gợi ý nhẹ, không ra lệnh.",
        ),
        sp(
          "Mr Okafor asked me for a restaurant tonight. What do you know about him?",
          "He has an early start tomorrow, so suggest somewhere close, and ask him before you book anything.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Chuyển đúng một thông tin có ích ('an early start') và nhắc hỏi khách trước.",
          "colleague",
        ),
        {
          ...sp(
            "We like walking. What do you suggest for this afternoon?",
            "Based on what you like, madam, I would suggest the river path. It is flat and shady all afternoon.",
            "'Based on' cộng điều khách thích, rồi MỘT gợi ý, kèm lý do khách cần nghe: bằng phẳng, có bóng mát.",
          ),
          alsoAccept: [
            "Based on what you like, madam, I suggest the river path. It is flat and shady all afternoon.",
          ],
        },
      ],
      reading: read(
        `PERSONAL ADVICE — DESK GUIDE
Advice starts from what the guest told you, not from what we want to sell.
Say where the advice comes from: "Based on your flight time…" or "Since you mentioned the baby…".
One suggestion, one reason. Then let the guest choose.
Early flights: for an international flight, leave the hotel three hours before take-off; for a domestic one, two.
The drive to the airport takes forty to seventy minutes, depending on traffic.
Offer a wake-up call and a breakfast box the night before. The kitchen needs the order by ten in the evening.
Never promise another team's time. Say "I will ask the kitchen and call you back" instead.
A baby, a pram or a wheelchair: a room NEAR the lift.
Night calls or a light sleeper: a room AWAY from the lift.`,
        [
          {
            q: "Khách có em bé và xe đẩy thì nên gợi ý phòng ở đâu?",
            options: [
              "Gần thang máy",
              "Xa thang máy, ở tầng cao cho thật yên tĩnh",
              "Tầng thấp nhất, gần nhà hàng để tiện ăn sáng",
            ],
            correct: 0,
            explanation:
              'Hướng dẫn ghi "A baby, a pram or a wheelchair: a room NEAR the lift." — cá nhân hoá nghĩa là lời khuyên đổi theo khách.',
          },
          {
            q: "Khách muốn hộp ăn sáng thật sớm. Lễ tân nói gì?",
            options: [
              "Hứa chắc là bếp sẽ chuẩn bị kịp đúng giờ khách cần",
              "Nói sẽ hỏi bếp rồi gọi lại cho khách",
              "Khuyên khách mua đồ ăn ở sân bay cho chắc",
            ],
            correct: 1,
            explanation:
              'Hướng dẫn ghi "Never promise another team\'s time" và dặn nói "I will ask the kitchen and call you back".',
          },
        ],
      ),
      game: [
        game(
          "My meeting downtown is at nine. When should I leave?",
          "Based on the morning traffic, sir, I would suggest leaving by half past eight.",
          "Whenever you like, sir. The driver know the city very well and will find the best way.",
          "Whenever you like, sir. The driver knows the city very well and will find the best way.",
          undefined,
          "Hai câu 'Whenever you like' đều lịch sự nhưng bỏ mặc khách — khách hỏi lời khuyên, và quầy biết giao thông buổi sáng. Câu 'The driver know' còn thiếu -s: 'the driver' số ít đi với 'knows'.",
        ),
        game(
          "I need a quiet room. I make calls to New York at night.",
          "Since you have calls at night, madam, I suggest a room away from the lift.",
          "Since you have calls at night, madam, I suggest a room away of the lift.",
          "All our rooms are quiet, madam, so any room will be perfectly fine for your calls.",
          undefined,
          "'away of' sai giới từ: phải là 'away from'. Câu 'any room will be perfectly fine' nghe tự tin nhưng bỏ qua điều khách vừa nói — không phải lời tư vấn.",
        ),
      ],
    }),

    L(32, 3, "The Guest Who Should Not Have to Repeat", "Khách quen không phải nói lại", {
      vocabulary: [
        c("On file", "Your usual preferences are on file, sir.", [
          "/ɒn faɪl/",
          "Đã lưu trong hồ sơ",
          "🗂️",
        ]),
        c("As before", "High floor and a firm pillow, as before?", [
          "/æz bɪˈfɔː/",
          "Như lần trước",
          "🔁",
        ]),
        c("Anything different", "Is there anything different you would like this time?", [
          "/ˈeniθɪŋ ˈdɪfrənt/",
          "Có gì muốn khác đi không",
          "❓",
        ]),
        c("Returning guest", "A returning guest should never have to explain twice.", [
          "/rɪˈtɜːnɪŋ ɡest/",
          "Khách quay lại",
          "🔄",
        ]),
      ],
      grammar: [
        g(
          "Do you want a high floor? Do you want a firm pillow?",
          "High floor and a firm pillow, as before, madam? Or anything different this time?",
          "Gộp mọi sở thích đã lưu vào MỘT câu xác nhận, rồi mở một cửa để khách đổi ý. 'different' là tính từ đứng sau 'anything'.",
          "High floor and a firm pillow, as before, madam? Or anything differently this time?",
        ),
        g(
          "You have stayed here before, right?",
          "Welcome back, sir. Your preferences are on file, and your room is ready.",
          "Đừng hỏi điều hệ thống đã biết. Chủ ngữ số nhiều 'your preferences' đi với 'are'.",
          "Welcome back, sir. Your preferences is on file, and your room is ready.",
        ),
      ],
      speaking: [
        {
          ...sp(
            "I stayed here in March. I hope I do not have to explain everything again.",
            t3a,
            "Đọc liền các sở thích đã lưu thành một chuỗi, kết bằng 'as before'. Sự trôi chảy là bằng chứng mình đã nhớ.",
          ),
          alsoAccept: [
            "Not at all, madam. Your preferences are on file: a high floor and a firm pillow.",
            "Not at all, madam. We have your preferences on file: a high floor and a firm pillow, as before.",
          ],
        },
        sp(
          "Wonderful. You remembered.",
          t3b,
          "Xác nhận xong thì mở một cửa: 'anything different'. Khách quen cũng có lúc thay đổi.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Actually, yes. I would like a late check-out on Sunday.",
          t3c,
          "Trả phòng muộn tuỳ phòng trống: kiểm tra ngay, nói rõ điều kiện, và hẹn mốc mình sẽ xác nhận.",
          undefined,
          undefined,
          t3b,
        ),
        risk({
          ...sp(
            "Last time you upgraded me for free. Same again, I hope?",
            "I cannot offer a free upgrade, sir, but I can ask my Duty Manager for you.",
            "Câu phải đúng của tuần: lần nâng hạng trước là quyết định của quản lý đêm đó, không phải sở thích trong hồ sơ. Quầy không hứa, chỉ hỏi.",
            undefined,
            ["offer", "free", "upgrade", "duty", "manager"],
          ),
          alsoAccept: [
            "I am not able to offer a free upgrade, sir, but I can ask my Duty Manager for you.",
            "I cannot offer a free upgrade, sir. May I ask my Duty Manager for you?",
            "I cannot promise a free upgrade, sir, but I can ask my Duty Manager.",
          ],
        }),
        sp(
          "Do you still have my usual room, with the big window?",
          "It is ready for you, sir, as before, and your firm pillow is already there.",
          "Khách quen hỏi phòng quen: trả lời có, kèm MỘT chi tiết cho thấy hồ sơ đã được đọc.",
        ),
        sp(
          "A returning guest is at the desk. Should I ask her all her preferences again?",
          "No. Read her profile first, then confirm them in one sentence and ask if anything is different.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Ba bước ngắn: đọc hồ sơ, xác nhận một câu, hỏi có gì khác.",
          "colleague",
        ),
        {
          ...sp(
            "I do not need the extra bed this time. My son is not with me.",
            "Thank you, madam. I will update your profile, so the extra bed is not in your room this time.",
            "Khách báo thay đổi: cảm ơn, cập nhật hồ sơ ngay, và nói kết quả khách sẽ thấy.",
          ),
          alsoAccept: [
            "Thank you, madam. I will update your profile now, so there is no extra bed in your room this time.",
          ],
        },
      ],
      reading: read(
        `RETURNING GUEST — DESK PROCEDURE
Before arrival: read the profile, and set the room to the recorded preferences before the guest reaches the desk.
At the desk: confirm all preferences in ONE sentence, then ask whether anything is different. Never run through them as a list of questions.
A past upgrade is not a preference. It was a decision someone made that night, and only the Duty Manager can make it again.
If a recorded preference cannot be met tonight, say so at the desk, before the guest goes up.
When the guest tells you something has changed, update the profile at once, while the guest is still in front of you.
After departure: add anything new.
A profile that has not changed in three stays is usually a profile nobody is reading.`,
        [
          {
            q: "Ở quầy, xác nhận sở thích của khách quen thế nào?",
            options: [
              "Hỏi lần lượt từng sở thích thành một danh sách câu hỏi",
              "Gộp trong một câu, rồi hỏi có gì cần khác không",
              "Chỉ nhắc tới khi khách tự nêu ra trước",
            ],
            correct: 1,
            explanation:
              'Quy trình ghi "confirm all preferences in ONE sentence, then ask whether anything is different".',
          },
          {
            q: "Khách quen muốn được nâng hạng miễn phí như lần trước. Ai quyết?",
            options: [
              "Lễ tân, vì đó là sở thích trong hồ sơ",
              "Lễ tân trực ca đêm đã quyết lần trước",
              "Chỉ Duty Manager, vì nâng hạng cũ không phải là sở thích",
            ],
            correct: 2,
            explanation:
              'Quy trình ghi "A past upgrade is not a preference" và "only the Duty Manager can make it again".',
          },
        ],
      ),
      game: [
        game(
          "Last time someone wrote down my preferences. Did that go anywhere?",
          "It did, madam. Your room is on a high floor, with a firm pillow, just as you asked last time.",
          "It did, madam. Your room are on a high floor, with a firm pillow, as before.",
          "We keep all guest notes in the system, madam, so they should be there somewhere.",
          undefined,
          "'Your room are' sai: chủ ngữ số ít đi với 'is'. Câu 'they should be there somewhere' đúng tiếng Anh nhưng cho khách thấy chưa ai đọc hồ sơ — đúng điều khách đang lo.",
        ),
        game(
          "Welcome back? How do you know I have been here before?",
          "Your previous stays are on file, sir. Is there anything different you would like this time?",
          "Your previous stays is on file, sir. Is there anything different you would like this time?",
          "I never forget a face, sir. I remember everyone who stays with us.",
          undefined,
          "'stays is' sai: 'stays' số nhiều đi với 'are'. Câu 'I never forget a face' nghe thân thiện nhưng không đúng sự thật và làm khách ngại — nói thật là hồ sơ, rồi hỏi khách muốn gì.",
        ),
      ],
    }),

    L(32, 4, "When the Preference Cannot Be Met", "Khi không đáp ứng được sở thích đã lưu", {
      vocabulary: [
        c("Fully occupied", "The courtyard side is fully occupied tonight.", [
          "/ˈfʊli ˈɒkjupaɪd/",
          "Đã kín hết phòng",
          "🈵",
        ]),
        c("Next best", "The next best is a high floor with double glazing.", [
          "/nekst best/",
          "Lựa chọn tốt nhất còn lại",
          "🥈",
        ]),
        c("Double glazing", "Every room in the new wing has double glazing.", [
          "/ˈdʌbl ˈɡleɪzɪŋ/",
          "Cửa kính hai lớp",
          "🪟",
        ]),
        c("Standing request", "A firm pillow is now a standing request on her profile.", [
          "/ˈstændɪŋ rɪˈkwest/",
          "Yêu cầu cố định cho mọi lần ở",
          "📌",
        ]),
      ],
      grammar: [
        g(
          "No quiet room tonight. Sorry.",
          "The courtyard side is fully occupied tonight, madam. The next best is a high floor with double glazing.",
          "'The next best' = phương án tốt nhất còn lại: sau lời từ chối, trao ngay một danh từ cụ thể để khách bám vào. 'occupied' là phân từ hai, có -ed.",
          "The courtyard side is fully occupy tonight, madam. The next best is a high floor with double glazing.",
        ),
        g(
          "You have to accept it for tonight.",
          "May I move you to your usual side tomorrow, sir? I have held it under your name.",
          "Nói 'held under your name', không nói 'blocked' — đó là từ nội bộ. Hiện tại hoàn thành 'have held': việc đã làm xong.",
          "May I move you to your usual side tomorrow, sir? I have hold it under your name.",
        ),
      ],
      speaking: [
        sp(
          "So the quiet room I always get is not available. That is disappointing.",
          t4a,
          "Xin lỗi, nói thẳng điều không có ('fully occupied'), rồi trao ngay 'the next best' kèm lý do nó gần đúng ý khách.",
        ),
        {
          ...sp(
            "And tomorrow? I am here for three nights.",
            t4b,
            "Cam kết cho đêm mai bằng hiện tại hoàn thành 'have held', và hứa việc của chính quầy: gọi nhân viên hành lý.",
            undefined,
            undefined,
            t4a,
          ),
          alsoAccept: [
            "I have held your usual room for tomorrow, madam, and a bellman will move your bags.",
          ],
        },
        sp(
          "Fine. Please make sure this does not happen again.",
          t4c,
          "Không hứa 'không bao giờ nữa'. Đề nghị một việc cụ thể: ghi 'standing request' — và hỏi khách trước.",
          undefined,
          undefined,
          t4b,
        ),
        risk({
          ...sp(
            "My business partner Mr Tan is staying here too. Put me on his floor.",
            "I am sorry, sir, I cannot tell you where another guest is staying.",
            "Câu phải đúng của tuần: không nói khách khác ở đâu, kể cả với người nói là quen. Không xác nhận, không gợi ý tầng.",
            undefined,
            ["guest", "staying"],
          ),
          alsoAccept: [
            "I am sorry, sir, I am not able to tell you where another guest is staying.",
            "I am afraid I cannot tell you where another guest is staying, sir.",
            "I am sorry, sir, I cannot say where another guest is staying.",
          ],
        }),
        {
          ...sp(
            "The new room is fine, but I can hear the lift.",
            "I am sorry, sir. Tomorrow I can move you to a room away from the lift, and I will hold it under your name now.",
            "Một phương án cho đêm mai, rồi giữ phòng ngay bây giờ: 'hold it under your name'.",
          ),
          alsoAccept: [
            "I am sorry, sir. Tomorrow I can move you to a room away from the lift, and I will hold it for you now.",
          ],
        },
        sp(
          "I wrote 'fussy guest, wants quiet' on her profile. Is that all right?",
          "No. Write what she asked for, in her own words: courtyard side, high floor. Never write an opinion.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Hồ sơ ghi điều khách yêu cầu, không ghi nhận xét về khách.",
          "colleague",
        ),
        sp(
          "Mrs Kato's courtyard room has failed three stays in a row. What happened?",
          "Each time, the side was fully occupied. I have made it a standing request, and I can show you the log.",
          "Báo cáo lên cấp trên: không gọi sir hay madam, nói sự việc, việc đã làm, và bằng chứng có sẵn.",
          "manager",
        ),
      ],
      reading: read(
        `WHEN A RECORDED PREFERENCE FAILS — DESK RULE
1. Tell the guest at the desk, before they go up. Never let them find out in the room.
2. Offer the next best, and say WHY it is near: double glazing, a top floor, away from the lift.
3. Hold the right room for the next night, and say that you have done so. Say "held"; "blocked" is an internal word.
4. Log the failure. Three failures for one guest is a Duty Manager conversation, not a desk one.
5. Do not explain occupancy to the guest. It is our problem to solve, not theirs to understand.
NOTES THE NEXT SHIFT CAN USE: what, how many and when, in the guest's own words.
"Firm pillow x2, placed before arrival" is usable. "Fussy guest" is not.
Mark a standing request only when the guest has confirmed it twice. Never write an opinion about a guest.`,
        [
          {
            q: "Vì sao phải báo cho khách ngay tại quầy?",
            options: [
              "Để khách không tự phát hiện ra khi đã lên phòng",
              "Vì hệ thống bắt buộc ghi nhận trước khi giao chìa khoá cho khách",
              "Để ca sau đỡ phải giải thích lại",
            ],
            correct: 0,
            explanation:
              'Quy tắc ghi "Tell the guest at the desk, before they go up. Never let them find out in the room."',
          },
          {
            q: "Ghi chú nào ca sau dùng được?",
            options: [
              "Fussy guest — để ca sau biết mà cẩn thận",
              "Firm pillow x2, placed before arrival",
              "Likes it quiet — ghi ngắn cho dễ đọc",
            ],
            correct: 1,
            explanation:
              'Quy tắc ghi "Firm pillow x2, placed before arrival" is usable — trả lời được cái gì, bao nhiêu, khi nào; còn "Fussy guest" is not, vì đó là nhận xét.',
          },
          {
            q: "Ba lần không đáp ứng được cho cùng một khách thì sao?",
            options: [
              "Thành việc của Duty Manager, không còn là việc của quầy",
              "Xoá sở thích đó khỏi hồ sơ",
              "Đề nghị khách một khoản hoàn tiền nhỏ",
            ],
            correct: 0,
            explanation:
              'Quy tắc ghi "Three failures for one guest is a Duty Manager conversation, not a desk one."',
          },
        ],
      ),
      game: [
        game(
          "I book here for that one quiet room. Now you tell me I cannot have it?",
          "Not tonight, madam, and I am sorry. I have held it for tomorrow, and the next best is ready now.",
          "Not tonight, madam, and I am sorry. I have hold it for tomorrow, and the next best is ready now.",
          "We are fully occupied tonight, madam. There is nothing I can do about it.",
          undefined,
          "'I have hold' sai: sau 'have' là phân từ hai 'held'. Câu 'There is nothing I can do' đúng tiếng Anh nhưng đóng cửa — quy tắc bắt đưa phương án gần nhất và giữ phòng cho đêm sau.",
        ),
        game(
          "Your colleague promised me the courtyard room last time. Where is it?",
          "I am sorry, sir. The courtyard side is fully occupied tonight, but I have held it for tomorrow.",
          "My colleague should not have promise that, sir. It was not his decision.",
          "My colleague should not have promised that, sir. It was not his decision.",
          undefined,
          "Hai câu đổ cho đồng nghiệp đều làm khách mất niềm tin vào cả quầy — xin lỗi cho khách sạn, rồi đưa giải pháp. Câu 'should not have promise' còn sai: sau 'should not have' là phân từ hai 'promised'.",
        ),
      ],
    }),
  ],
};
