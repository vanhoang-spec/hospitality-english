// ============================================================
// FRONT OFFICE — PHASE 3 (weeks 23-30), written for the desk.
//
// The old weeks were frames filled from the bank by slot index, and the
// frames did not know what a receptionist is allowed to do. They taught
// "We can upgrade you free of charge" and "I can waive the late fee
// straight away" as the desk's own offers; "It was our mistake" before
// anyone had looked; an answer to a late promise that switched to a
// different job ("I will deliver your message immediately instead"); a
// passage that compared one room and praised another; and a "Could you tell
// me when it started?" to a guest who had just said when. The one turn the
// checkpoint required to be right was a rooming-list check, picked because
// it said "before we start". No turn was labelled as talk between
// colleagues, so the shift handover was printed as if a guest were asking,
// and one guest line was answered two different ways in two weeks.
//
// What a receptionist decides, and what goes to whom:
//
//  · The desk EXPLAINS rates, policies, charges and deposits, and gives the
//    real reason. It sells what it may sell: an available room type at the
//    published price, late check-out subject to availability and its fee, a
//    room move to the same type, a taxi, a wake-up call, luggage storage.
//  · It does NOT give free upgrades, waive or remove fees, change rates,
//    offer anything free or approve a refund. Those go to the duty manager
//    or the front office manager, said plainly: "I cannot … My manager will
//    call you this afternoon." A wrong posting is corrected by a supervisor.
//  · Privacy: no room number is said out loud, given to anyone, or used to
//    confirm that somebody is staying. A key card is made only after a
//    passport check. A declined card is said quietly, with no guess about why.
//  · Safety goes to the people trained for it: the security officer for a
//    stranger trying doors, first aid and the duty manager for a guest who
//    is unwell, the emergency exit and never the lift when the alarm rings.
//  · An apology is for what the guest met, not a verdict on whose fault it
//    was. A promise carries a number: "within twenty minutes", "by eleven".
//  · Week 29 is talk between receptionists and up to the duty manager, and
//    every turn of it is labelled so.
//
// The turns marked `risk` are the hard cases above; the checkpoint's
// must-be-right draw comes from them. Cards keep the reviewed FO bank
// entries (kit.ts looks them up) because Phase 4 recycles them; the
// hand-authored group week 26 now lives here, split to short turns.
// ============================================================
import type { LessonContent } from "../week-content";
import { game, g, read, sp } from "../phase0";
import { cardsFor, lessonsFor, risk } from "./kit";

const c = cardsFor("FO");
const L = lessonsFor("FO");

// ── Week 23 — Recommending a room at the published price ────────────────
function week23(): LessonContent[] {
  const t1a = "I recommend the sea-view room, madam. It has a balcony and a lovely view.";
  const t1b = "It is forty dollars more per night, madam. That is our published price.";
  const t1c =
    "Then I recommend the deluxe room instead, madam. It is cheaper, and it is very quiet.";
  const t2a = "I recommend the junior suite, sir. It has a sitting area for your meetings.";
  const t2b = "The executive suite is bigger, sir, but it is also more expensive.";
  const t2c = "For small meetings, I recommend the junior suite. It is cheaper and big enough.";
  const t3a = "For your family, I recommend the family room, sir. It has two big beds.";
  const t3b = "The poolside room is closer to the pool, sir, but it is noisier in the day.";
  const t3c = "Then I recommend the family room on a higher floor, sir. It is quieter at night.";
  const t4a = "Of course, sir. The garden-view room is also very comfortable, and it is cheaper.";
  const t4b = "I am sorry, I cannot offer a free upgrade, sir. I can ask my manager.";
  const t4c = "Of course, sir. I will ask my manager and call your room before six o'clock.";
  return [
    L(23, 1, "I Recommend…", "Gợi ý một hạng phòng", {
      vocabulary: [
        c("Recommend", "For your anniversary, I recommend the sea-view room."),
        c("Instead", "Would you like the deluxe room instead?"),
        c("Sea-view room", "The sea-view room has a balcony over the beach."),
        c("Deluxe room", "The deluxe room is bigger than the standard room."),
      ],
      grammar: [
        g(
          "You take sea view, okay?",
          "I recommend the sea-view room, madam. It has a lovely view.",
          "Gợi ý bằng 'I recommend + the + hạng phòng', rồi nêu MỘT lý do. Khách vẫn là người chọn.",
          "I recommend you the sea-view room, madam. It has a lovely view.",
        ),
        g(
          "Too expensive? Take cheap one.",
          "Would you like the deluxe room instead, madam?",
          "'Would you like…?' mời khách chọn; 'instead' đứng cuối câu khi đưa phương án thay thế. Gọi đúng tên hạng phòng, không nói 'cheap one'.",
          "Do you like the deluxe room instead, madam?",
        ),
      ],
      speaking: [
        sp(
          "It is our wedding anniversary. Which room do you recommend?",
          t1a,
          "Nghe ra dịp của khách rồi mới gợi ý, và chỉ nêu MỘT lý do cụ thể.",
        ),
        sp(
          "How much more is it than our room?",
          t1b,
          "Báo giá chênh lệch theo giá niêm yết, nói rõ con số. Lễ tân bán đúng giá, không tự giảm.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Hmm. That is more than we want to spend.",
          t1c,
          "Khách thấy đắt: đưa phương án rẻ hơn bằng 'instead', không ép, không tự giảm giá.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "I am here for two weeks. Which room is best for a long stay?",
          "I recommend the deluxe room, sir. It is bigger than the standard room, with a desk.",
          "Gợi ý theo nhu cầu (ở lâu, cần làm việc) và so sánh với phòng tiêu chuẩn.",
        ),
        sp(
          "I do not need a big room. It is just me.",
          "Of course, sir. The standard room is fine for one person, and it is cheaper.",
          "Khách không cần phòng lớn: tôn trọng lựa chọn, không cố bán phòng đắt hơn.",
        ),
      ],
      reading: read(
        `Mr and Mrs Bauer arrive for their wedding anniversary. Nam recommends the sea-view room: "It has a balcony and a lovely view." Mrs Bauer asks about the price. Nam says it is forty dollars more per night, at the published price. That is more than they want to spend, so Nam recommends the deluxe room instead. They choose it.`,
        [
          {
            q: "Vì sao Nam gợi ý phòng hướng biển?",
            options: [
              "Vì đó là phòng có giá rẻ nhất trong khách sạn",
              "Vì hai vợ chồng khách đến dịp kỷ niệm ngày cưới",
              "Vì quản lý yêu cầu bán phòng đó",
            ],
            correct: 1,
            explanation:
              "'arrive for their wedding anniversary' — gợi ý đi theo dịp của khách. Gợi ý không gắn với nhu cầu chỉ là chào hàng.",
          },
          {
            q: "Nam làm gì khi giá cao hơn mức khách muốn chi?",
            options: [
              "Tự giảm bốn mươi đô cho khách vì đây là dịp đặc biệt",
              "Khuyên khách quay lại dịp khác",
              "Gợi ý phòng deluxe thay thế, giá rẻ hơn",
            ],
            correct: 2,
            explanation:
              "'Nam recommends the deluxe room instead' — đưa lựa chọn khác theo giá niêm yết. Lễ tân không tự giảm giá.",
          },
        ],
      ),
      game: [
        game(
          "We are here for our anniversary. Any ideas for the room?",
          "I recommend the sea-view room, madam. It has a lovely view.",
          "You take sea view room. Very nice view, very big, you like it.",
          "All our rooms are the same, madam, so you can take any room you like.",
          undefined,
          "Câu cuối không giúp khách chọn gì cả. Câu đúng gợi ý MỘT hạng phòng cụ thể và nêu một lý do.",
        ),
      ],
    }),

    L(23, 2, "Comparing Two Rooms", "So sánh hai hạng phòng", {
      vocabulary: [
        c("Quieter", "The garden side is quieter than the street side."),
        c("Junior suite", "The junior suite has a sitting area for meetings."),
        c("Executive suite", "The executive suite is bigger than the junior suite."),
        c("Club floor room", "A club floor room includes breakfast in the club lounge."),
      ],
      grammar: [
        g(
          "Suite more big.",
          "The executive suite is bigger than the junior suite, sir.",
          "Tính từ ngắn: thêm -er + than. big → bigger (gấp đôi g). Không nói 'more big'.",
          "The executive suite is more bigger than the junior suite, sir.",
        ),
        g(
          "Garden side, more quiet.",
          "The garden side is quieter than the street side, madam.",
          "quiet → quieter than. Luôn nói rõ so với cái gì, sau 'than'.",
          "The garden side is quiet than the street side, madam.",
        ),
      ],
      speaking: [
        sp(
          "I have small meetings in my room every day.",
          t2a,
          "Gợi ý đúng thứ khách cần cho công việc: chỗ ngồi tiếp khách.",
        ),
        sp(
          "What about the executive suite?",
          t2b,
          "So sánh thật cả hai mặt: lớn hơn, nhưng cũng đắt hơn.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Which one is better value for me?",
          t2c,
          "Kết luận theo nhu cầu của khách, kèm một lý do so sánh.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "The street is very noisy at night. I am a light sleeper.",
          "I recommend a room on the garden side, madam. It is quieter than the street side.",
          "So sánh đúng MỘT điểm khách đang lo: tiếng ồn.",
        ),
        sp(
          "What is special about the club floor room?",
          "A club floor room includes breakfast in the club lounge, sir. It is quieter there too.",
          "Nói lợi ích cụ thể của hạng phòng, không khen chung chung.",
        ),
      ],
      reading: read(
        `Mr Okafor has meetings in his room every day. Thu compares two rooms for him. "The junior suite has a sitting area. The executive suite is bigger, but it is also more expensive." For small meetings, she recommends the junior suite. Mr Okafor also wants a quiet room, so Thu gives him a junior suite on the garden side, which is quieter than the street side.`,
        [
          {
            q: "Thu so sánh hai hạng phòng nào?",
            options: [
              "Deluxe và tiêu chuẩn",
              "Junior suite và executive suite",
              "Phòng tầng club và phòng gia đình",
            ],
            correct: 1,
            explanation:
              "'The junior suite… The executive suite is bigger' — một phép so sánh luôn giữ đúng hai thứ đang được so.",
          },
          {
            q: "Vì sao phòng của ông Okafor ở phía vườn?",
            options: [
              "Vì phía vườn yên tĩnh hơn phía đường phố",
              "Vì phía đường phố đang được sửa chữa",
              "Vì phía vườn rẻ hơn",
            ],
            correct: 0,
            explanation:
              "'wants a quiet room… the garden side, which is quieter than the street side' — lý do nằm ở nhu cầu của khách.",
          },
        ],
      ),
      game: [
        game(
          "Which is quieter, the street side or the garden side?",
          "The garden side is quieter, madam. It faces the garden.",
          "Garden side more quiet.",
          "Both sides are fine, madam.",
          undefined,
          "Câu cuối né câu hỏi so sánh. Câu đúng trả lời đúng điều khách hỏi: phía nào yên tĩnh hơn.",
        ),
      ],
    }),

    L(23, 3, "Reading the Guest", "Đọc nhu cầu của khách", {
      vocabulary: [
        c("Family room", "The family room has two big beds for parents and children."),
        c("Poolside room", "The poolside room is next to the swimming pool."),
        c("Top-floor room", "The top-floor room has the best view of the city."),
        c("Balcony room", "Our balcony room has a small table outside."),
      ],
      grammar: [
        g(
          "Kids? Take family.",
          "For your family, I recommend the family room, sir.",
          "Mở đầu bằng 'For your family,' — gợi ý theo đúng người sẽ ở.",
          "For you family, I recommend the family room, sir.",
        ),
        g(
          "Pool room noisy.",
          "The poolside room is noisier than the top-floor room in the day.",
          "noisy → noisier: đổi -y thành -ier rồi thêm 'than'.",
          "The poolside room is more noisy than the top-floor room in the day.",
        ),
      ],
      speaking: [
        sp(
          "We are travelling with two small children.",
          t3a,
          "Gợi ý theo đúng người sẽ ở, và nêu một lợi ích cụ thể.",
        ),
        sp(
          "The kids love swimming. What about the poolside room?",
          t3b,
          "So sánh cả hai mặt: gần hồ bơi hơn, nhưng ồn hơn.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Hmm. We want the children to sleep well.",
          t3c,
          "Nhu cầu thật là giấc ngủ: gợi ý lại theo nhu cầu đó, kèm so sánh.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "We want a room with a good view for photos.",
          "I recommend the top-floor room, madam. The view is better than from the lower floors.",
          "So sánh với tầng thấp để khách thấy rõ lợi ích.",
        ),
        sp(
          "I like to have my coffee outside in the morning.",
          "I recommend the balcony room, madam. It has a small table outside.",
          "Nghe ra thói quen của khách rồi gợi ý đúng phòng.",
        ),
      ],
      reading: read(
        `The Tran family arrives with two small children. Phuong recommends the family room: it has two big beds. The children love swimming, so the father asks about the poolside room. Phuong explains that it is closer to the pool, but noisier in the day. The family wants the children to sleep well, so they take the family room on a higher floor.`,
        [
          {
            q: "Phương nói gì về phòng cạnh hồ bơi?",
            options: [
              "Gần hồ bơi hơn nhưng ban ngày ồn hơn",
              "Có hai giường lớn",
              "Đắt hơn phòng gia đình bốn mươi đô mỗi đêm",
            ],
            correct: 0,
            explanation:
              "'closer to the pool, but noisier in the day' — so sánh đủ hai mặt để khách tự chọn.",
          },
          {
            q: "Cuối cùng gia đình chọn phòng nào?",
            options: [
              "Phòng cạnh hồ bơi ở tầng một",
              "Phòng gia đình ở tầng cao hơn",
              "Hai phòng tiêu chuẩn",
            ],
            correct: 1,
            explanation:
              "'they take the family room on a higher floor' — vì điều khách cần nhất là trẻ ngủ ngon.",
          },
        ],
      ),
      game: [
        game(
          "My kids want to be near the pool. Is that a good idea?",
          "The poolside room is closer to the pool, sir, but it is noisier.",
          "Pool room, near pool, noisy.",
          "Yes, of course, sir. The children can swim there alone any time they like.",
          undefined,
          "Câu cuối hứa điều không an toàn (trẻ bơi một mình) và không so sánh gì. Câu đúng nêu cả lợi lẫn bất lợi để khách chọn.",
        ),
      ],
    }),

    L(23, 4, "When the Guest Says No", "Khi khách từ chối", {
      vocabulary: [
        c("Accessible room", "The accessible room has a wide door and a walk-in shower."),
        c("Garden-view room", "The garden-view room is cheaper than the sea-view room."),
        c("Penthouse suite", "The penthouse suite is on the top floor, with a private terrace."),
      ],
      grammar: [
        g(
          "No? Okay.",
          "Of course, sir. The garden-view room is also very comfortable.",
          "Khách từ chối gợi ý: chấp nhận ngay và khen lựa chọn của khách. Không ép.",
          "Of course, sir. The garden-view room is also very comfortably.",
        ),
        g(
          "Free upgrade? No.",
          "I am sorry, I cannot offer a free upgrade. I can ask my manager.",
          "Nâng hạng miễn phí không phải quyền của lễ tân. Từ chối lịch sự và nói ai quyết. Sau 'can' là động từ gốc.",
          "I am sorry, I cannot offer a free upgrade. I can asking my manager.",
        ),
      ],
      speaking: [
        sp(
          "The penthouse suite looks amazing, but the price is too high for me.",
          t4a,
          "Khách chê đắt: chấp nhận, gợi ý phòng khác và khen phòng đó. Không tự hạ giá.",
        ),
        risk(
          sp(
            "I stay here every month. Can you not give me the penthouse for free?",
            t4b,
            "Câu thẩm quyền của tuần: lễ tân KHÔNG tự nâng hạng miễn phí. Từ chối lịch sự và nói ai quyết.",
            undefined,
            ["offer", "free", "upgrade", "manager"],
            t4a,
          ),
        ),
        sp(
          "Please ask. I can wait for an answer.",
          t4c,
          "Chuyển đúng người, kèm mốc giờ gọi lại. Không hứa trước kết quả.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "My father uses a wheelchair.",
          "I recommend the accessible room, madam. It has a wide door and a walk-in shower.",
          "Gợi ý theo nhu cầu đi lại của khách, nêu hai điểm cụ thể.",
        ),
        sp(
          "We do not need a view. Something simple is fine.",
          "I recommend the garden-view room, madam. It is simple and quiet.",
          "Khách muốn đơn giản: gợi ý đúng như vậy, không cố bán phòng đắt.",
        ),
      ],
      reading: read(
        `Mr Lindgren stays at the hotel every month. He likes the penthouse suite, but the price is too high for him. He asks Khoa for it free of charge. Khoa says politely that he cannot offer a free upgrade, but he can ask his manager. Mr Lindgren takes the garden-view room, and the manager calls him before six.`,
        [
          {
            q: "Vì sao Khoa không tự cho khách lên phòng penthouse?",
            options: [
              "Vì phòng penthouse tối đó đã có khách khác đặt trước rồi",
              "Vì nâng hạng miễn phí là việc quản lý quyết",
              "Vì khách còn nợ tiền phòng",
            ],
            correct: 1,
            explanation:
              "'he cannot offer a free upgrade, but he can ask his manager' — không hứa, không đóng cửa: chuyển đúng người có quyền.",
          },
          {
            q: "Cuối cùng khách chọn gì?",
            options: [
              "Phòng hướng vườn",
              "Phòng penthouse với giá phòng thường",
              "Chuyển sang một khách sạn khác",
            ],
            correct: 0,
            explanation:
              "'Mr Lindgren takes the garden-view room' — khách vẫn được phục vụ tốt dù không được nâng hạng miễn phí.",
          },
        ],
      ),
      game: [
        game(
          "I am a regular guest. Upgrade me to the suite for free.",
          "I am sorry, sir. I cannot offer a free upgrade, but I can ask my manager.",
          "Free upgrade no. Not possible.",
          "Of course, sir. You are one of our regular guests, so I will upgrade you right now.",
          undefined,
          "Câu cuối tự cho nâng hạng miễn phí — vượt quyền lễ tân. Câu đúng từ chối lịch sự và chuyển cho quản lý.",
        ),
      ],
    }),
  ];
}

// ── Week 24 — Explaining a charge: have to + because ────────────────────
function week24(): LessonContent[] {
  const t1a = "I can check, madam. There is a late check-out fee after twelve o'clock.";
  const t1b = "Because we have to prepare the room for the next guest, madam.";
  const t1c = "It is half the room price until six o'clock, madam. It is in our policy.";
  const t2a = "It is a deposit for incidental charges, madam.";
  const t2b = "We have to hold it because extras like the minibar go on your bill.";
  const t2c = "We release the deposit when you check out, madam. Your bank may take a few days.";
  const t3a = "Because it was cancelled on the day of arrival, sir. The fee is one night.";
  const t3b = "I am sorry, I cannot remove the charge. My manager can review it today.";
  const t3c = "My manager will call you before five o'clock, sir.";
  const t4a = "Yes, sir. We have to register every guest, so we need her passport too.";
  const t4b = "Because the guest registration rule is for every guest in the room, sir.";
  const t4c = "Thank you, sir. Your key cards will be ready when you come back.";
  return [
    L(24, 1, "There Is a Charge", "Có một khoản phí", {
      vocabulary: [
        c("Charge", "There is a small charge for a rollaway bed."),
        c("Policy", "Our late check-out policy is on the hotel website."),
        c("Late check-out fee", "There is a late check-out fee after twelve o'clock."),
        c("Rollaway bed fee", "The rollaway bed fee is for each night."),
      ],
      grammar: [
        g(
          "Bed extra, you pay.",
          "There is a rollaway bed fee for each night, sir.",
          "'There is a … fee for …' báo phí nhẹ nhàng — báo thông tin, không ra lệnh trả tiền.",
          "There is a rollaway bed fee for each nights, sir.",
        ),
        g(
          "Late, pay more.",
          "You have to check out by twelve, or there is a late check-out fee.",
          "'have to + động từ gốc' = điều bắt buộc theo quy định. Sau 'have to' không thêm -ing.",
          "You have to checking out by twelve, or there is a late check-out fee.",
        ),
      ],
      speaking: [
        sp(
          "Our flight is at nine at night. Can we keep the room until six?",
          t1a,
          "Không hứa ngay: nói sẽ kiểm tra, và báo trước là có phí.",
        ),
        sp(
          "Why do we have to pay for that?",
          t1b,
          "Lý do THẬT sau 'because' — phòng phải chuẩn bị cho khách sau. Không nói 'it is the rule'.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "I see. How much is it until six?",
          t1c,
          "Nêu mức phí đúng theo chính sách, kèm mốc giờ.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "Can you bring an extra bed for my daughter?",
          "Of course, sir. There is a rollaway bed fee for each night.",
          "Đồng ý trước, rồi báo có phí — đừng để khách tự phát hiện trên hóa đơn.",
        ),
        sp(
          "Where can I read your hotel rules?",
          "Our policy is on the hotel website and in your room folder, sir.",
          "Chỉ đúng chỗ khách đọc được quy định viết sẵn.",
        ),
      ],
      reading: read(
        `Mrs Ahmed's flight is at nine at night, and she asks to keep the room until six. Linh checks first. She explains the late check-out fee after twelve: "We have to prepare the room for the next guest." The fee is half the room price, and it is in the hotel policy. Mrs Ahmed agrees, and Linh notes six o'clock on the booking.`,
        [
          {
            q: "Vì sao có phí trả phòng muộn?",
            options: [
              "Vì Linh muốn khách trả phòng sớm hơn giờ máy bay của khách",
              "Vì phải chuẩn bị phòng cho khách tiếp theo",
              "Vì khách đặt qua công ty du lịch",
            ],
            correct: 1,
            explanation:
              "'We have to prepare the room for the next guest' — lý do thật, nói được với khách.",
          },
          {
            q: "Phí trả phòng muộn đến sáu giờ là bao nhiêu?",
            options: ["Một nửa giá phòng", "Bằng giá một đêm phòng", "Miễn phí cho khách quen"],
            correct: 0,
            explanation:
              "'The fee is half the room price, and it is in the hotel policy' — lễ tân nêu đúng mức phí trong chính sách, không tự đặt ra.",
          },
        ],
      ),
      game: [
        game(
          "Can I stay in my room until three tomorrow?",
          "I can check, sir. There is a late check-out fee after twelve.",
          "Late, you pay. Twelve finish.",
          "Of course, sir. Stay as long as you like.",
          undefined,
          "Câu cuối hứa trả phòng muộn miễn phí mà chưa kiểm tra phòng — vượt quyền và có thể sai. Câu đúng kiểm tra trước và báo có phí.",
        ),
      ],
    }),

    L(24, 2, "Because — the Real Reason", "Nêu lý do thật bằng 'because'", {
      vocabulary: [
        c("Because", "There is a fee because we have to prepare the room again."),
        c("City tax", "The city tax is a small charge for each night."),
        c("Minibar charge", "The minibar charge comes from the morning check."),
        c("No-show charge", "A no-show charge is for a booking when the guest does not arrive."),
      ],
      grammar: [
        g(
          "Rule is rule.",
          "We have to charge the city tax because the city collects it.",
          "'have to' + lý do THẬT sau 'because'. 'Vì đó là quy định' không phải là lý do.",
          "We have to charge the city tax because of the city collects it.",
        ),
        g(
          "You no come, you pay.",
          "There is a no-show charge because the room was ready for you.",
          "Giải thích phí bằng sự việc khách hiểu được, không trách khách. 'the room' số ít → 'was'.",
          "There is a no-show charge because the room were ready for you.",
        ),
      ],
      speaking: [
        risk(
          sp(
            "Why did you take money from my card when I checked in?",
            t2a,
            "Câu phải đúng của tuần: đó là tiền ĐẶT CỌC cho chi phí phát sinh, không phải tiền phòng.",
            undefined,
            ["deposit", "incidental", "charges"],
          ),
        ),
        sp(
          "Why do you need a deposit at all?",
          t2b,
          "'have to' + 'because' + lý do khách hiểu được: các khoản phát sinh đi vào hóa đơn.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "When do I get my money back?",
          t2c,
          "Nói rõ khi nào và ai làm: khách sạn hoàn khi trả phòng, ngân hàng có thể mất vài ngày.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "Why is there a city tax on my bill?",
          "We have to charge it because the city asks hotels for it every night, sir.",
          "Lý do thật: thuế của thành phố, khách sạn thu hộ.",
        ),
        sp(
          "I did not take anything from the minibar.",
          "I understand, madam. I will ask housekeeping to check the minibar again.",
          "Không cãi, không tự xóa phí: nhờ đúng bộ phận kiểm lại.",
        ),
        sp(
          "We did not come last night, so why is there a no-show charge?",
          "Because the room was ready for you all night, sir. It is in your booking.",
          "Giải thích bằng sự việc, chỉ ra nơi khách đã đồng ý điều kiện.",
        ),
      ],
      reading: read(
        `Ms Novak sees a hold on her card and asks Tuan about it. Tuan explains: "It is a deposit for incidental charges." She asks why the hotel needs it. "We have to hold it because extras like the minibar go on your bill." He tells her the hotel releases it at check-out, and her bank may take a few days.`,
        [
          {
            q: "Khoản tiền tạm giữ trên thẻ của bà Novak là gì?",
            options: [
              "Tiền phòng của cả kỳ nghỉ, thu trước khi khách vào ở",
              "Tiền đặt cọc cho các chi phí phát sinh",
              "Phí phạt nhận phòng sớm",
            ],
            correct: 1,
            explanation:
              "'It is a deposit for incidental charges' — giải thích đúng bản chất khoản tạm giữ để khách không nghĩ mình đã bị thu tiền.",
          },
          {
            q: "Khi nào khoản tạm giữ được giải phóng?",
            options: [
              "Khi khách trả phòng, ngân hàng có thể mất vài ngày",
              "Ngay khi khách hỏi lại lễ tân",
              "Sau đúng một tháng",
            ],
            correct: 0,
            explanation:
              "'the hotel releases it at check-out, and her bank may take a few days' — nói thật cả phần không thuộc khách sạn.",
          },
        ],
      ),
      game: [
        game(
          "There is a hold on my card. Did you charge me already?",
          "No, madam. It is a deposit for incidental charges.",
          "Money hold on card. It normal, no worry, we give back later.",
          "Yes, madam. We charge everything at check-in, so please do not worry.",
          undefined,
          "Câu cuối giải thích sai bản chất khoản tạm giữ — khách sẽ nghĩ đã bị thu tiền. Câu đúng nói rõ: đây là tiền đặt cọc cho chi phí phát sinh.",
        ),
      ],
    }),

    L(24, 3, "Saying No Politely", "Từ chối lịch sự", {
      vocabulary: [
        c("Cancellation fee", "The cancellation fee is one night's room price."),
        c("Remove the charge", "I cannot remove the charge, but my manager can review it."),
        c("Room-change fee", "A room-change fee is for a move the guest asks for."),
        c("Key replacement fee", "There is a key replacement fee for a lost key card."),
      ],
      grammar: [
        g(
          "No. You pay.",
          "I am afraid I cannot remove the charge, madam. My manager can review it.",
          "'I am afraid I cannot…' từ chối lịch sự, rồi nói ai có quyền xem lại.",
          "I am afraid I cannot removing the charge, madam. My manager can review it.",
        ),
        g(
          "Lost key, you pay money.",
          "There is a key replacement fee because we have to make a new card.",
          "Giải thích phí bằng 'because' + việc thật khách sạn phải làm.",
          "There is a key replacement fee because we have to making a new card.",
        ),
      ],
      speaking: [
        sp(
          "I cancelled my second room this morning. Why is there a cancellation fee?",
          t3a,
          "Nêu sự việc (hủy trong ngày đến) và mức phí — không trách khách.",
        ),
        risk(
          sp(
            "That is not fair. Please remove the charge.",
            t3b,
            "Câu thẩm quyền: lễ tân KHÔNG tự bỏ phí. Từ chối lịch sự, nói rõ ai xem lại và khi nào.",
            undefined,
            ["remove", "charge", "manager", "review", "today"],
            t3a,
          ),
        ),
        sp(
          "When will I hear from your manager?",
          t3c,
          "Khép lại bằng mốc giờ cụ thể và người sẽ gọi.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "I lost my key card. Do I have to pay for a new one?",
          "Yes, sir. There is a key replacement fee because we have to make a new card.",
          "Báo có phí kèm lý do thật.",
        ),
        sp(
          "We want to change to a sea-view room. Is there a fee?",
          "There is a room-change fee, madam, because housekeeping has to prepare a second room.",
          "Phí đổi phòng theo yêu cầu của khách: nêu phí và lý do.",
        ),
      ],
      reading: read(
        `Mr Silva cancels his second room on the day of arrival, and the cancellation fee is one night. He asks Hoa to remove the charge. Hoa cannot remove it herself, so she says: "My manager can review it today." The manager calls Mr Silva before five o'clock and explains the cancellation policy.`,
        [
          {
            q: "Vì sao có phí hủy phòng?",
            options: [
              "Vì phòng bị hủy ngay trong ngày khách đến",
              "Vì khách đặt qua website",
              "Vì khách đổi phòng",
            ],
            correct: 0,
            explanation:
              "'cancels his second room on the day of arrival' — phí đi theo thời điểm hủy trong chính sách.",
          },
          {
            q: "Hoa làm gì khi khách yêu cầu bỏ phí?",
            options: [
              "Tự xóa khoản phí ngay vì ông Silva là khách quen của khách sạn",
              "Nói không tự bỏ được, quản lý sẽ xem xét",
              "Bảo khách tự gọi cho công ty du lịch",
            ],
            correct: 1,
            explanation:
              "'Hoa cannot remove it herself… My manager can review it today' — bỏ phí là quyết định về tiền, thuộc quản lý.",
          },
        ],
      ),
      game: [
        game(
          "Just take the cancellation fee off my bill, please.",
          "I am sorry, I cannot remove the charge. My manager can review it.",
          "No remove. You cancel, you pay.",
          "Of course, sir. I will take it off right now, and nobody needs to know.",
          undefined,
          "Câu cuối tự xóa phí và giấu chuyện đó — vượt quyền lễ tân. Câu đúng từ chối lịch sự và chuyển cho quản lý xem xét.",
        ),
      ],
    }),

    L(24, 4, "Confirming the Rule", "Xác nhận quy định", {
      vocabulary: [
        c("No-smoking penalty", "Our policy has a no-smoking penalty for every room."),
        c("Guest registration rule", "The guest registration rule says we register every guest."),
        c("Damage charge", "The duty manager checks the photos before any damage charge."),
      ],
      grammar: [
        g(
          "Passport. Give me.",
          "We have to register every guest because of the guest registration rule.",
          "'have to' + 'because of' + danh từ. Mọi khách trong phòng đều phải đăng ký, không chỉ người đặt.",
          "We have to register every guests because of the guest registration rule.",
        ),
        g(
          "You break, you pay.",
          "Housekeeping found a broken lamp. The manager will show you the photos first.",
          "Nói sự việc người khác đã thấy, không buộc tội. Phí hư hỏng luôn có ảnh và người có quyền kiểm tra.",
          "Housekeeping find a broken lamp. The manager will show you the photos first.",
        ),
      ],
      speaking: [
        sp(
          "My wife is still in the car. Do you need her passport too?",
          t4a,
          "Xác nhận quy định và nói cần gì: hộ chiếu của MỌI khách trong phòng.",
        ),
        sp(
          "Why? Our booking is in my name.",
          t4b,
          "'because' + quy định đăng ký lưu trú. Không tranh luận, chỉ giải thích.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "Fine. I will bring her passport in a minute.",
          t4c,
          "Cảm ơn và cho khách biết mọi thứ sẽ sẵn sàng khi khách quay lại.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "Why is there a no-smoking penalty on my bill? I did not smoke!",
          "I understand, sir. My manager will review the no-smoking penalty with you today.",
          "Không buộc tội, không tự bỏ phí: người có quyền sẽ xem lại cùng khách.",
        ),
        sp(
          "Why is there a damage charge on my bill?",
          "Housekeeping found a broken lamp, madam. The manager will show you the photos first.",
          "Sự việc + bằng chứng + người có quyền. Không nói 'bạn làm vỡ'.",
        ),
      ],
      reading: read(
        `A couple checks in, but only Mr Wilson shows his passport. Quang explains that the guest registration rule covers every guest, so Mrs Wilson's passport is needed too. Mr Wilson goes back to the car for it. Quang does not argue about the rule. He prepares the key cards while he waits.`,
        [
          {
            q: "Vì sao Quang cần giấy tờ của bà Wilson?",
            options: [
              "Vì phòng đặt dưới tên bà Wilson",
              "Vì quy định đăng ký áp dụng cho mọi khách",
              "Vì bà Wilson muốn trả bằng thẻ của bà",
            ],
            correct: 1,
            explanation:
              "'the guest registration rule covers every guest' — mọi người ở trong phòng đều phải được đăng ký.",
          },
          {
            q: "Quang làm gì trong lúc chờ?",
            options: [
              "Chuẩn bị thẻ phòng",
              "Tranh luận với khách về quy định",
              "Gọi quản lý trực ra quầy",
            ],
            correct: 0,
            explanation:
              "'He prepares the key cards while he waits' — không tranh luận, dùng thời gian chờ cho việc có ích.",
          },
        ],
      ),
      game: [
        game(
          "Do you really need to see my husband's passport too?",
          "Yes, madam. We have to register every guest in the room.",
          "Yes. Passport. All people.",
          "No, madam. One passport is enough.",
          undefined,
          "Câu cuối bỏ qua quy định đăng ký lưu trú. Câu đúng xác nhận và nêu lý do: phải đăng ký mọi khách trong phòng.",
        ),
      ],
    }),
  ];
}

// ── Week 25 — A promise with a number in it ─────────────────────────────
function week25(): LessonContent[] {
  const t1a = "I am sorry, madam. Housekeeping will prepare your room within twenty minutes.";
  const t1b = "I understand. I will check with housekeeping straight away, madam.";
  const t1c = "Please take a seat in the lobby. I will call you within twenty minutes.";
  const t2a = "Of course, madam. We can hold your luggage until your room is ready.";
  const t2b = "Yes. We are going to send your bags up by three o'clock, madam.";
  const t2c = "Then your room and your bags will be ready by four, madam.";
  const t3a =
    "It depends on tomorrow's arrivals, madam. I will confirm your late check-out by eleven o'clock.";
  const t3b = "Then we can hold your luggage until your flight, madam.";
  const t3c = "Of course. I will book your airport transfer for six o'clock and confirm it today.";
  const t4a = "I am very sorry, madam. I will check the room status straight away.";
  const t4b = "Housekeeping is finishing it now, madam. It will be ready within ten minutes.";
  const t4c = "Yes, madam. I will bring your key cards to you in the lobby myself.";
  const k1 = "Of course, sir. May I check your passport first?";
  const k2 =
    "Then a bellman will go with you to the room, sir. You can show him your passport there.";
  const k3 = "He will be here within two minutes, sir. Then I will reprogram your key card.";
  return [
    L(25, 1, "Within Twenty Minutes", "Hứa trong vòng bao lâu", {
      vocabulary: [
        c("Within", "Your room will be ready within twenty minutes."),
        c("Straight away", "I will call housekeeping straight away."),
        c("Prepare your room", "Housekeeping will prepare your room within twenty minutes."),
        c("Check with housekeeping", "Let me check with housekeeping about your room."),
      ],
      grammar: [
        g(
          "Room soon.",
          "Your room will be ready within twenty minutes, madam.",
          "Lời hứa cần một con số: 'within + số phút'. 'Soon' không phải là lời hứa.",
          "Your room will ready within twenty minutes, madam.",
        ),
        g(
          "Wait, I ask.",
          "I will check with housekeeping straight away, sir.",
          "'straight away' đứng cuối câu. Sau 'will' là động từ nguyên mẫu.",
          "I will checking with housekeeping straight away, sir.",
        ),
      ],
      speaking: [
        sp(
          "We landed early. Can we go to our room now?",
          t1a,
          "Phòng chưa xong: xin lỗi, rồi hứa bằng một con số — 'within twenty minutes'.",
        ),
        sp(
          "Twenty minutes? We are very tired.",
          t1b,
          "Khách mệt: hỏi buồng phòng ngay lập tức, không bảo vệ mốc cũ.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Thank you. Where can we wait?",
          t1c,
          "Chỉ chỗ ngồi chờ và nhắc lại đúng mốc đã hứa.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "The bathroom light in my room is not working.",
          "I am sorry, sir. I will call engineering straight away.",
          "Việc nhỏ khách đang cần: xin lỗi rồi gọi đúng bộ phận ngay.",
        ),
        sp(
          "Is our room on a quiet floor? My husband sleeps badly.",
          "Let me check with housekeeping, madam. I will tell you within twenty minutes.",
          "Chưa chắc thì hỏi đúng bộ phận, và hẹn giờ trả lời bằng con số.",
        ),
      ],
      reading: read(
        `Mr and Mrs Grant land early, and their room is not ready. Mai promises it within twenty minutes. They are very tired, so she checks with housekeeping straight away and asks them to take a seat in the lobby. Eighteen minutes later, she calls them over: the room is ready.`,
        [
          {
            q: "Mai hứa phòng sẵn sàng trong bao lâu?",
            options: [
              "Ngay lập tức, không phải chờ",
              "Trong vòng hai mươi phút",
              "Trước mười hai giờ trưa hôm đó",
            ],
            correct: 1,
            explanation:
              "'Mai promises it within twenty minutes' — lời hứa có con số, và được giữ.",
          },
          {
            q: "Mai làm gì vì khách rất mệt?",
            options: [
              "Cho khách lên luôn một phòng khác dù phòng đó chưa dọn xong",
              "Hỏi buồng phòng ngay, mời khách ngồi chờ",
              "Hứa chắc phòng sẽ xong trong năm phút",
            ],
            correct: 1,
            explanation:
              "'she checks with housekeeping straight away and asks them to take a seat' — làm ngay việc của mình, không hứa điều chưa chắc.",
          },
        ],
      ),
      game: [
        game(
          "How long until our room is ready?",
          "Housekeeping will prepare it within twenty minutes, madam.",
          "Room soon, soon. Housekeeping very busy, you wait in lobby.",
          "As soon as possible, madam. We are very busy at the desk this morning.",
          undefined,
          "'As soon as possible' không phải lời hứa: khách không biết chờ đến bao giờ. Câu đúng có mốc: 'within twenty minutes'.",
        ),
      ],
    }),

    L(25, 2, "By Three O'clock", "Trước ba giờ", {
      vocabulary: [
        c("Going to", "We are going to send your bags up by three o'clock."),
        c("Send a bellman up", "I will send a bellman up for your bags in ten minutes."),
        c("Hold your luggage", "We can hold your luggage until your room is ready."),
        c("Update your booking", "I will update your booking by five o'clock today."),
      ],
      grammar: [
        g(
          "Bags later.",
          "We are going to send your bags up by three o'clock, sir.",
          "'be going to' cho kế hoạch đã sắp xếp; 'by three o'clock' = không muộn hơn ba giờ.",
          "We going to send your bags up by three o'clock, sir.",
        ),
        g(
          "I change booking.",
          "I will update your booking and email you by five o'clock.",
          "Hai việc cùng sau 'will', đều ở dạng gốc, nối bằng 'and'.",
          "I will update your booking and emailing you by five o'clock.",
        ),
      ],
      speaking: [
        sp(
          "Our room is not ready, but we want to go to the beach.",
          t2a,
          "Đưa việc lễ tân làm được ngay: giữ hành lý cho khách.",
        ),
        sp(
          "Will our bags be in the room when we come back?",
          t2b,
          "Kế hoạch đã sắp xếp: 'going to' + mốc giờ cụ thể.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Good. We will be back around four.",
          t2c,
          "Chốt lại theo giờ của khách, nhắc cả phòng lẫn hành lý.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "Can someone help me with these heavy bags?",
          "Of course, sir. I will send a bellman up within ten minutes.",
          "Đồng ý + người làm + mốc giờ.",
        ),
        sp(
          "We are staying two more nights. Can you change the dates?",
          "Of course, madam. I will update your booking by five o'clock and email you.",
          "Hứa có mốc và nói khách sẽ nhận xác nhận bằng cách nào.",
        ),
      ],
      reading: read(
        `The Lee family wants to go to the beach, but their room is not ready. Duc holds their luggage and says: "We are going to send your bags up by three o'clock." They plan to come back at four. At half past two, a bellman takes the bags up, and Duc writes a note on the booking.`,
        [
          {
            q: "Đức hứa đưa hành lý lên phòng trước mấy giờ?",
            options: ["Trước ba giờ", "Trước bốn giờ chiều", "Trước năm giờ chiều"],
            correct: 0,
            explanation:
              "'send your bags up by three o'clock' — 'by' nghĩa là không muộn hơn mốc đó.",
          },
          {
            q: "Vì sao Đức giữ hành lý cho gia đình Lee?",
            options: [
              "Vì phòng của gia đình chưa sẵn sàng",
              "Vì gia đình muốn trả phòng sớm",
              "Vì xe đưa đón đến trễ",
            ],
            correct: 0,
            explanation:
              "'their room is not ready' — lễ tân đưa ngay việc mình làm được để khách không phải chờ.",
          },
        ],
      ),
      game: [
        game(
          "We are going out. Will our bags go up before we come back?",
          "Yes, madam. We are going to send them up by three o'clock.",
          "Bags go up. Later.",
          "I hope so, madam, but I cannot really say when the bellman is free.",
          undefined,
          "Câu cuối không cho khách một mốc nào. Câu đúng dùng 'going to' + mốc giờ cụ thể.",
        ),
      ],
    }),

    L(25, 3, "Keeping the Guest Informed", "Báo tin cho khách", {
      vocabulary: [
        c("Confirm your late check-out", "I will confirm your late check-out by eleven o'clock."),
        c("Book your airport transfer", "I can book your airport transfer for six o'clock."),
        c("Arrange a taxi", "I will arrange a taxi for you in ten minutes."),
        c("Print your invoice", "I will print your invoice before you check out."),
      ],
      grammar: [
        g(
          "I tell you later.",
          "I will confirm your late check-out by eleven o'clock, madam.",
          "Chưa chắc thì đừng hứa kết quả — hứa THỜI ĐIỂM báo tin. Sau 'will' là động từ gốc.",
          "I will confirms your late check-out by eleven o'clock, madam.",
        ),
        g(
          "Wait. I not know.",
          "I cannot confirm it now, but I will call you back by eleven o'clock.",
          "Nói thật là chưa biết, nhưng vẫn hứa giờ gọi lại. 'call you back': tân ngữ đứng giữa.",
          "I cannot confirm it now, but I will call back you by eleven o'clock.",
        ),
      ],
      speaking: [
        sp(
          "Can we check out at four tomorrow?",
          t3a,
          "Trả phòng muộn tùy phòng trống: không hứa ngay, hứa giờ báo tin.",
        ),
        sp(
          "And if you cannot give us four o'clock?",
          t3b,
          "Có sẵn phương án khác trong quyền của lễ tân.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Our flight is at nine at night. Can you book us a car?",
          t3c,
          "Một việc, một mốc giờ, và nói khi nào xác nhận.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "I need a taxi to the old town, please.",
          "Of course, sir. I will arrange a taxi for you in ten minutes.",
          "Đồng ý + mốc giờ.",
        ),
        sp(
          "Could I have my bill ready before I leave?",
          "Of course, madam. I will print your invoice before you check out.",
          "Hứa theo mốc của khách: 'before you check out'.",
        ),
        sp(
          "Please call me when you know about the late check-out.",
          "Of course, madam. I will call your room by eleven o'clock with the answer.",
          "Khách đang chờ tin: hứa giờ báo, và báo ĐÚNG tin khách đang chờ.",
        ),
      ],
      reading: read(
        `Ms Rossi asks to check out at four. Thanh cannot confirm it yet, because it depends on tomorrow's arrivals. He promises to confirm the late check-out by eleven o'clock. Her flight is at nine at night, so Thanh also books her airport transfer for six. At half past ten, he calls her room: four o'clock is confirmed.`,
        [
          {
            q: "Vì sao Thanh chưa xác nhận được trả phòng lúc bốn giờ?",
            options: [
              "Vì còn tùy vào lượng khách đến ngày mai",
              "Vì quản lý không cho phép",
              "Vì khách chưa trả tiền đặt cọc",
            ],
            correct: 0,
            explanation:
              "'it depends on tomorrow's arrivals' — trả phòng muộn tùy phòng trống, nên hứa giờ báo tin chứ không hứa kết quả.",
          },
          {
            q: "Thanh đặt xe ra sân bay lúc mấy giờ?",
            options: ["Chín giờ tối", "Bốn giờ chiều", "Sáu giờ"],
            correct: 2,
            explanation:
              "'books her airport transfer for six' — đi sớm hơn giờ bay để kịp làm thủ tục.",
          },
        ],
      ),
      game: [
        game(
          "Will you tell me if the late check-out is possible?",
          "Yes, madam. I will call your room by eleven o'clock.",
          "Maybe. I tell you.",
          "Please ask again later, madam.",
          undefined,
          "Câu cuối đẩy việc hỏi lại sang khách. Câu đúng nhận việc báo tin, kèm mốc giờ.",
        ),
      ],
    }),

    L(25, 4, "When You Cannot Keep the Promise", "Khi không giữ được lời hứa", {
      vocabulary: [
        c("Check the room status", "I will check the room status on the system now."),
        c("Deliver your message", "I will deliver your message to his room before six."),
        c("Reprogram your key card", "I will reprogram your key card in two minutes."),
      ],
      grammar: [
        g(
          "Sorry, late. Busy.",
          "I am very sorry for the delay. Your room will be ready within ten minutes.",
          "Xin lỗi + mốc MỚI cho ĐÚNG việc khách đang chờ — không đổi sang việc khác.",
          "I am very sorry for the delay. Your room will being ready within ten minutes.",
        ),
        g(
          "Key no work? Give.",
          "I will check your passport, then reprogram your key card.",
          "Thẻ phòng chỉ làm lại sau khi kiểm tra hộ chiếu. Hai việc theo thứ tự, nối bằng 'then'.",
          "I will check your passport, then reprograms your key card.",
        ),
      ],
      speaking: [
        sp(
          "You said twenty minutes for our room. It has been forty.",
          t4a,
          "Xin lỗi và kiểm tra ngay ĐÚNG việc khách đang chờ.",
        ),
        sp(
          "Please. We have been waiting a long time.",
          t4b,
          "Mốc mới, ngắn hơn, cho đúng căn phòng đó.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "Ten more minutes. Are you sure this time?",
          t4c,
          "Đừng hứa thêm một lần nữa — tự làm, tận tay.",
          undefined,
          undefined,
          t4b,
        ),
        risk(
          sp(
            "My key card does not work. I am in room 508. Just make me a new one.",
            k1,
            "Câu phải đúng của tuần: KHÔNG làm thẻ khi chưa kiểm tra hộ chiếu, dù khách nói đúng số phòng.",
            undefined,
            ["check", "passport", "first"],
          ),
        ),
        sp(
          "My passport is in the room. I am in a hurry.",
          k2,
          "Không có giấy tờ thì vẫn không làm thẻ: nhân viên hành lý đi cùng, khách đưa giấy tờ ở phòng.",
          undefined,
          undefined,
          k1,
        ),
        sp(
          "Fine. When can the bellman come?",
          k3,
          "Hứa có con số, rồi nói bước tiếp theo.",
          undefined,
          undefined,
          k2,
        ),
        sp(
          "Can you give this message to my colleague in room 610?",
          "Of course, madam. I will deliver your message to room 610 before six o'clock.",
          "Nhận việc + mốc giờ cụ thể.",
        ),
      ],
      reading: read(
        `Mrs Kato was promised her room within twenty minutes, but forty minutes pass. Son apologises and checks the room status straight away. He gives her a new time for the same room: ten minutes. Then he brings the key cards to her in the lobby himself. He does not offer her a different service instead.`,
        [
          {
            q: "Sơn làm gì khi trễ hẹn?",
            options: [
              "Xin lỗi và đưa mốc mới cho đúng việc đó",
              "Mời khách ăn trưa miễn phí",
              "Nói buồng phòng thiếu người",
            ],
            correct: 0,
            explanation:
              "'He gives her a new time for the same room' — khách chờ phòng thì giải pháp là phòng, không phải một dịch vụ khác.",
          },
          {
            q: "Sơn đưa thẻ phòng cho khách ở đâu?",
            options: ["Ở quầy lễ tân", "Ở sảnh, tận tay khách", "Trong phòng, sau khi phòng xong"],
            correct: 1,
            explanation:
              "'he brings the key cards to her in the lobby himself' — lần này không hứa thêm, tự làm.",
          },
        ],
      ),
      game: [
        game(
          "You promised twenty minutes. It has been forty!",
          "I am very sorry, madam. Your room will be ready within ten minutes.",
          "Sorry. Busy today. Wait.",
          "I am so sorry, madam. Would you like a free drink at our bar instead, then?",
          undefined,
          "Câu cuối đổi sang một thứ khách không hỏi, và đồ miễn phí không phải quyền của lễ tân. Câu đúng giữ đúng việc khách đang chờ và đưa mốc mới.",
        ),
      ],
    }),
  ];
}

// ── Week 26 — A group arrives: one request, one owner ───────────────────
function week26(): LessonContent[] {
  const t1a =
    "Thank you, madam. Our booking shows twenty-four rooms, so let me check with reservations.";
  const t1b =
    "I will ask the reservations team to check it now. I will update you within ten minutes.";
  const t1c =
    "Your group can start checking in now, madam. I will sort out the last room with reservations.";
  const p1 = "I am sorry, I cannot tell you room numbers. I can take a message, sir.";
  const p2 = "I am sorry, sir. For the safety of our guests, I cannot tell you that.";
  const p3 = "Of course, sir. I will write your message down now.";
  const t2a = "Of course, madam. We have prepared an express check-in for your group.";
  const t2b = "I will ask the bellmen to take the bags to each room within thirty minutes.";
  const t2c = "Please put a luggage tag on each bag, madam. I will coordinate with the bell desk.";
  const t3a = "Let me check with housekeeping first, sir. Both rooms must be ready.";
  const t3b = "Of course, sir. I can split the bill, so each of you pays for your own room.";
  const t3c = "I will reprogram both key cards and adjust the rooming list, sir.";
  const s1 = "Thank you, madam. I will ask the security officer to check that floor now.";
  const s2 = "Please wait in your room, madam. The security officer will call you.";
  const s3 = "He will be on your floor within five minutes, madam.";
  const t4a = "Of course, madam. Please note that group breakfast starts at seven o'clock.";
  const t4b = "The departure time is eight o'clock, from the main lobby.";
  const t4c = "I will ask the operator to call each room at six-thirty, madam.";
  const q1 = "I am very sorry, sir. I will check with housekeeping and tell the duty manager now.";
  const q2 = "She will help you with the police report and your embassy, sir.";
  const q3 = "Yes, sir. We have a passport scan from your check-in.";
  return [
    L(26, 1, "Let Me Check With…", "Để tôi hỏi bộ phận…", {
      vocabulary: [
        c("Rooming list", "Let me check the rooming list with you, sir.", [
          "/ˈruːmɪŋ lɪst/",
          "Danh sách phân bổ phòng",
          "📋",
        ]),
        c("Tour leader", "The tour leader is our first contact for the whole group.", [
          "/tʊə ˈliːdə/",
          "Trưởng đoàn",
          "🧑‍💼",
        ]),
        c("Point of contact", "Ms Hanh is the point of contact for the Sunrise group.", [
          "/pɔɪnt əv ˈkɒntækt/",
          "Đầu mối liên hệ",
          "📞",
        ]),
        c("Discrepancy", "There is a discrepancy between your list and our booking.", [
          "/dɪˈskrepənsi/",
          "Sự sai lệch, không khớp",
          "⚠️",
        ]),
      ],
      grammar: [
        g(
          "List wrong.",
          "There is a small discrepancy. Let me check with reservations, madam.",
          "Nêu vấn đề trung tính ('a small discrepancy'), rồi 'Let me check with + bộ phận'. Không nói danh sách của khách sai.",
          "There is a small discrepancy. Let me checking with reservations, madam.",
        ),
        g(
          "Ask other people.",
          "I will ask the reservations team to call you within ten minutes.",
          "'ask + người + to + động từ': một việc, một người làm, một mốc giờ.",
          "I will ask the reservations team call you within ten minutes.",
        ),
      ],
      speaking: [
        sp(
          "Here is our rooming list. We have twenty-five rooms.",
          t1a,
          "Không nói danh sách của khách sai. Nêu điều mình thấy, rồi 'let me check with' đúng bộ phận.",
        ),
        sp(
          "Will that take long? Everyone is very tired.",
          t1b,
          "'ask + bộ phận + to + việc', rồi hứa giờ báo lại bằng con số.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "What do we do in the meantime?",
          t1c,
          "Không bắt cả đoàn chờ vì một phòng: làm phần đã khớp trước.",
          undefined,
          undefined,
          t1b,
        ),
        risk(
          sp(
            "I am a friend of Mr Kim from the Sunrise group. What is his room number?",
            p1,
            "Quyền riêng tư: KHÔNG cho số phòng của khách, dù người hỏi biết tên và tên đoàn. Đề nghị nhận lời nhắn.",
            undefined,
            ["room", "numbers", "take", "message"],
          ),
        ),
        risk(
          sp(
            "Can you at least tell me if he is staying here?",
            p2,
            "Cũng không xác nhận khách có ở khách sạn hay không — nói lý do an toàn, không nói 'có' hay 'không'.",
            undefined,
            ["safety", "guests"],
            p1,
          ),
        ),
        sp(
          "All right. Please tell him that Peter is waiting in the lobby.",
          p3,
          "Nhận lời nhắn, không hứa thêm điều gì về vị khách.",
          undefined,
          undefined,
          p2,
        ),
      ],
      reading: read(
        `Ms Hanh, the tour leader, gives Quan the rooming list: twenty-five rooms. The hotel booking shows twenty-four. Quan does not say the list is wrong. He says: "There is a small discrepancy. Let me check with reservations." The group starts checking in, and ten minutes later reservations confirms the last room.`,
        [
          {
            q: "Quân nói gì khi số phòng không khớp?",
            options: [
              "Cả đoàn phải đứng chờ ở sảnh",
              "Có chỗ chưa khớp, để tôi hỏi bộ phận đặt phòng",
              "Danh sách của trưởng đoàn chắc chắn bị sai",
            ],
            correct: 1,
            explanation:
              "'There is a small discrepancy. Let me check with reservations.' — nêu vấn đề trung tính, giao đúng bộ phận kiểm tra.",
          },
          {
            q: "Ai xác nhận căn phòng còn thiếu?",
            options: [
              "Trưởng đoàn của công ty du lịch",
              "Bộ phận đặt phòng",
              "Quản lý trực ca tối hôm đó",
            ],
            correct: 1,
            explanation:
              "'reservations confirms the last room' — một việc, một người chịu trách nhiệm.",
          },
        ],
      ),
      game: [
        game(
          "Your system says twenty-four rooms? Our list says twenty-five!",
          "There is a small discrepancy, madam. Let me check with reservations.",
          "Your list wrong. We have twenty-four.",
          "Our system is always right, madam, so your travel agent's list must be wrong.",
          undefined,
          "Câu cuối đổ lỗi cho khách trước khi kiểm tra. Câu đúng nêu vấn đề trung tính và nói ai sẽ kiểm tra.",
        ),
      ],
    }),

    L(26, 2, "I Will Ask the Bell Desk to…", "Tôi sẽ nhờ tổ hành lý…", {
      vocabulary: [
        c("Express check-in", "We have prepared an express check-in for your group.", [
          "/ɪkˈspres ˈtʃek ɪn/",
          "Thủ tục nhận phòng nhanh",
          "⚡",
        ]),
        c("Key packet", "Each key packet has the guest's name on it.", [
          "/kiː ˈpækɪt/",
          "Bộ thẻ phòng chuẩn bị sẵn",
          "🗝️",
        ]),
        c("Luggage tag", "Please put a luggage tag with your name on each bag.", [
          "/ˈlʌɡɪdʒ tæɡ/",
          "Thẻ hành lý",
          "🏷️",
        ]),
        c("Coordinate", "I will coordinate with the bell desk about your luggage.", [
          "/kəʊˈɔːdɪneɪt/",
          "Phối hợp, điều phối",
          "🤝",
        ]),
      ],
      grammar: [
        g(
          "Bags wait there.",
          "I will ask the bellmen to take your bags to the rooms.",
          "'ask + người + to + động từ': giao một việc cho đúng người.",
          "I will ask the bellmen taking your bags to the rooms.",
        ),
        g(
          "Key here, go.",
          "Your key packets are ready. Please check your name on each packet.",
          "'key packets' số nhiều → 'are'.",
          "Your key packets is ready. Please check your name on each packet.",
        ),
      ],
      speaking: [
        sp(
          "Our group has a meeting in twenty minutes. Can we skip the long check-in?",
          t2a,
          "Đã chuẩn bị sẵn: 'have prepared' báo việc làm xong trước khi đoàn đến.",
          undefined,
          ["prepared"],
        ),
        sp(
          "What about all our suitcases?",
          t2b,
          "'ask + người + to + việc' + mốc giờ: một việc, một tổ làm.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "How will they know which bag is whose?",
          t2c,
          "Việc của khách (gắn thẻ) và việc của mình (phối hợp với tổ hành lý), nói rõ từng việc.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "My name is not on any key packet.",
          "I am sorry, sir. Let me check with your tour leader and the rooming list.",
          "Hỏi đúng đầu mối của đoàn, không đoán tên.",
        ),
        sp(
          "One suitcase from our group is missing.",
          "I am sorry, madam. I will ask the bell desk to check the luggage room now.",
          "Một việc, đúng tổ, ngay bây giờ.",
        ),
      ],
      reading: read(
        `The Sunrise group arrives at two, with a meeting at half past two. Lan has prepared an express check-in: a key packet with each guest's name. She asks the bellmen to take the bags up within thirty minutes and gives each guest a luggage tag. By twenty past two, everyone is in the meeting room.`,
        [
          {
            q: "Lan chuẩn bị gì trước khi đoàn đến?",
            options: [
              "Bộ thẻ phòng có tên từng khách",
              "Phòng họp lúc hai rưỡi",
              "Bữa trưa nhẹ cho cả đoàn",
            ],
            correct: 0,
            explanation:
              "'a key packet with each guest's name' — chuẩn bị trước để đoàn không phải xếp hàng.",
          },
          {
            q: "Lan nhờ ai đưa hành lý lên phòng?",
            options: ["Trưởng đoàn", "Nhân viên hành lý", "Chính các khách trong đoàn"],
            correct: 1,
            explanation:
              "'She asks the bellmen to take the bags up' — giao việc cho đúng người, kèm mốc giờ.",
          },
        ],
      ),
      game: [
        game(
          "We have fifty bags. Who takes them up to the rooms?",
          "I will ask the bellmen to take them up within thirty minutes, madam.",
          "Bags, you carry. Lift there.",
          "Your guests can take their own bags up in the lift, madam. It is much quicker.",
          undefined,
          "Câu cuối đẩy việc sang khách. Câu đúng nói rõ ai làm và trong bao lâu.",
        ),
      ],
    }),

    L(26, 3, "One Request, One Owner", "Một việc, một người phụ trách", {
      vocabulary: [
        c("Swap rooms", "Two guests in the group would like to swap rooms.", [
          "/swɒp ruːmz/",
          "Đổi phòng cho nhau",
          "🔄",
        ]),
        c("Split the bill", "I can split the bill between your room and the company.", [
          "/splɪt ðə bɪl/",
          "Tách hóa đơn",
          "🧾",
        ]),
        c("Adjust", "I will adjust the rooming list after the swap.", [
          "/əˈdʒʌst/",
          "Điều chỉnh",
          "🛠️",
        ]),
        c("Security officer", "I will ask the security officer to check the fifth floor."),
      ],
      grammar: [
        g(
          "Change room? Okay, go.",
          "Let me check with housekeeping first. Then you can swap rooms.",
          "'Let me check with…' trước khi hứa: cả hai phòng phải sẵn sàng. Sau 'can' là động từ gốc.",
          "Let me check with housekeeping first. Then you can swapping rooms.",
        ),
        g(
          "Bad man? Not my job.",
          "I will ask the security officer to check that floor now.",
          "Người khả nghi: lễ tân không tự đi đối mặt. Giao đúng một người — an ninh.",
          "I will ask the security officer for check that floor now.",
        ),
      ],
      speaking: [
        sp(
          "My colleague and I would like to swap rooms. Is that possible?",
          t3a,
          "Hỏi đúng bộ phận trước khi hứa: hai phòng phải sẵn sàng.",
        ),
        sp(
          "Thank you. Can you also split the bill for us?",
          t3b,
          "Tách hóa đơn là việc lễ tân làm được: đồng ý và nói rõ mỗi người trả gì.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Will our key cards still work after the swap?",
          t3c,
          "Kể đủ các việc mình sẽ làm sau khi đổi phòng.",
          undefined,
          undefined,
          t3b,
        ),
        risk(
          sp(
            "A man is walking along our floor and trying the doors.",
            s1,
            "Người lạ thử cửa phòng: lễ tân KHÔNG tự lên xem. Giao ngay cho an ninh.",
            undefined,
            ["security", "officer", "floor"],
          ),
        ),
        sp(
          "Should I go out and talk to him?",
          s2,
          "Khuyên khách ở trong phòng, nói rõ ai sẽ gọi lại.",
          undefined,
          undefined,
          s1,
        ),
        sp(
          "Thank you. How soon can he get there?",
          s3,
          "Mốc giờ bằng con số cho khách đang lo.",
          undefined,
          undefined,
          s2,
        ),
      ],
      reading: read(
        `At eleven at night, a guest calls Bao: a man is walking along the fifth floor and trying the doors. Bao does not go up himself. He asks the security officer to check that floor, and he asks the guest to wait in her room. Within five minutes the officer is there. The man was looking for his own room.`,
        [
          {
            q: "Bảo làm gì khi khách báo có người lạ thử cửa?",
            options: [
              "Tự lên tầng năm hỏi người đó",
              "Nhờ nhân viên an ninh kiểm tra tầng đó",
              "Khuyên khách tự ra hành lang xem thử",
            ],
            correct: 1,
            explanation:
              "'He asks the security officer to check that floor' — một việc an ninh, giao đúng người có chuyên môn.",
          },
          {
            q: "Cuối cùng người đàn ông đó là ai?",
            options: [
              "Một kỹ thuật viên đang đi kiểm tra các ổ khóa",
              "Một vị khách đang tìm phòng mình",
              "Một người giao đồ ăn",
            ],
            correct: 1,
            explanation:
              "'The man was looking for his own room' — lần này không có gì nguy hiểm, nhưng lễ tân không thể biết trước điều đó.",
          },
        ],
      ),
      game: [
        game(
          "There is a strange man on my floor. Can you come up and see?",
          "I will ask the security officer to check your floor now, madam.",
          "Strange man? I go look.",
          "Do not worry, madam. He is probably a guest.",
          undefined,
          "Câu cuối đoán thay vì kiểm tra — có thể bỏ qua một mối nguy thật. Câu đúng giao việc cho an ninh ngay.",
        ),
      ],
    }),

    L(26, 4, "Closing the Loop", "Khép vòng việc đã nhận", {
      vocabulary: [
        c("Shuttle bus", "The shuttle bus leaves from the main lobby.", [
          "/ˈʃʌtl bʌs/",
          "Xe buýt đưa đón",
          "🚌",
        ]),
        c("Departure time", "The departure time for the shuttle bus is eight o'clock.", [
          "/dɪˈpɑːtʃə taɪm/",
          "Giờ khởi hành",
          "⏰",
        ]),
        c("Group breakfast", "Group breakfast is in the Lotus room from seven o'clock.", [
          "/ɡruːp ˈbrekfəst/",
          "Bữa sáng của đoàn",
          "🥐",
        ]),
        c("Announcement", "I have a short announcement for the whole group.", [
          "/əˈnaʊnsmənt/",
          "Thông báo",
          "📢",
        ]),
      ],
      grammar: [
        g(
          "Breakfast seven, bus eight.",
          "Please note that group breakfast starts at seven, and the bus leaves at eight.",
          "Thông báo cho đoàn: 'Please note that…' + hai mốc giờ rõ ràng. 'breakfast' số ít → 'starts'.",
          "Please note that group breakfast start at seven, and the bus leaves at eight.",
        ),
        g(
          "Passport lost? I find.",
          "I will check with housekeeping and tell the duty manager now.",
          "Mất hộ chiếu: hỏi đúng bộ phận, báo đúng người. Hai việc cùng sau 'will', đều ở dạng gốc.",
          "I will check with housekeeping and telling the duty manager now.",
        ),
      ],
      speaking: [
        sp(
          "Can you tell the group about tomorrow before they go up?",
          t4a,
          "Mở đầu thông báo cho cả đoàn bằng một cụm trang trọng, rồi nêu giờ bằng con số.",
        ),
        sp(
          "And the shuttle bus to the conference?",
          t4b,
          "Giờ khởi hành + điểm đón: hai thông tin, không thiếu cái nào.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "Some of them are always late in the morning.",
          t4c,
          "Giao một việc cho đúng người: tổng đài gọi báo thức từng phòng.",
          undefined,
          undefined,
          t4b,
        ),
        risk(
          sp(
            "I cannot find my passport anywhere! I fly home tomorrow.",
            q1,
            "Mất hộ chiếu: xin lỗi, hỏi buồng phòng, và báo quản lý trực NGAY. Lễ tân không tự giải quyết.",
            undefined,
            ["housekeeping", "tell", "duty", "manager"],
          ),
        ),
        sp(
          "What can the duty manager do?",
          q2,
          "Nói đúng việc quản lý trực sẽ giúp, không hứa thay họ.",
          undefined,
          undefined,
          q1,
        ),
        sp(
          "Do you have a copy of my passport?",
          q3,
          "Thông tin có thật của quầy: bản quét hộ chiếu lúc nhận phòng.",
          undefined,
          undefined,
          q2,
        ),
      ],
      reading: read(
        `Mr Becker cannot find his passport, and he flies home tomorrow. Nga checks with housekeeping and tells the duty manager. The passport is not in the room. The duty manager helps Mr Becker with the police report and calls his embassy. Nga gives him a copy of the passport scan from check-in.`,
        [
          {
            q: "Nga làm gì đầu tiên?",
            options: [
              "Tự gọi điện cho đại sứ quán của khách ngay lập tức",
              "Hỏi buồng phòng và báo quản lý trực",
              "Khuyên khách đổi vé máy bay",
            ],
            correct: 1,
            explanation:
              "'Nga checks with housekeeping and tells the duty manager' — tìm ở đúng chỗ trước, báo đúng người có quyền.",
          },
          {
            q: "Lễ tân đưa cho khách cái gì?",
            options: [
              "Một hộ chiếu tạm thời do khách sạn làm cho khách",
              "Bản sao từ ảnh quét hộ chiếu",
              "Giấy của cảnh sát",
            ],
            correct: 1,
            explanation:
              "'a copy of the passport scan from check-in' — lễ tân đưa thứ quầy thật sự có; giấy tờ khác là việc của cảnh sát và đại sứ quán.",
          },
        ],
      ),
      game: [
        game(
          "What time does the bus leave tomorrow, and from where?",
          "The departure time is eight o'clock, from the main lobby.",
          "Bus eight. Lobby. Not late.",
          "Around eight, I think. Ask the driver.",
          undefined,
          "Câu cuối không chắc chắn và đẩy việc sang khách. Câu đúng nêu rõ giờ khởi hành và điểm đón.",
        ),
      ],
    }),
  ];
}

// ── Week 27 — Receiving a complaint ─────────────────────────────────────
function week27(): LessonContent[] {
  const t1a = "I apologise for the room delay, madam. Two hours is far too long.";
  const t1b = "I am sorry nobody updated you, madam. Let me check your room right now.";
  const t1c =
    "I understand, madam. Your room will be ready in ten minutes, and I will bring your keys.";
  const t2a = "I am sorry about the double charge, sir. Let me check the bill now.";
  const t2b = "I am sorry, I cannot change the bill. My supervisor will correct it today.";
  const t2c = "I understand you are disappointed, sir. I will bring a corrected bill to your room.";
  const t3a = "I am very sorry, sir. Is it the air conditioner, or something outside?";
  const t3b = "Thank you, sir. I will send engineering to your room within fifteen minutes.";
  const t3c = "I am sorry about your night, sir. I will tell the duty manager this morning.";
  const t4a = "Please bring him to this seat, madam. I am calling first aid now.";
  const t4b = "The duty manager is coming now, madam. She will help you decide.";
  const t4c = "Of course, madam. I will stay with you until they arrive.";
  const o1 = "I am very sorry, madam. I am calling the duty manager now.";
  const o2 = "The duty manager will arrange a room for you at a partner hotel, madam.";
  return [
    L(27, 1, "Listen First", "Lắng nghe trước", {
      vocabulary: [
        c("Concern", "Thank you for telling me about your concern, madam."),
        c("Apologise", "I apologise for the room delay, sir."),
        c("Room delay", "I am very sorry about the room delay today."),
        c("Noisy corridor", "I am sorry about the noisy corridor last night."),
      ],
      grammar: [
        g(
          "Not my fault.",
          "I apologise for the long wait, sir. Your room is ready now.",
          "'apologise for + danh từ': xin lỗi về điều khách gặp. Không đổ lỗi cho bộ phận khác.",
          "I apologise for the long wait, sir. Your room are ready now.",
        ),
        g(
          "Stop, I know.",
          "Thank you for telling me, madam. I will write down every detail.",
          "Cảm ơn khách đã nói — để khách nói hết rồi mới làm. Sau 'for' động từ thêm -ing.",
          "Thank you for tell me, madam. I will write down every detail.",
        ),
      ],
      speaking: [
        sp(
          "We arrived at two, and our room is still not ready at four!",
          t1a,
          "Xin lỗi về đúng điều khách gặp, và nói lại điều đó để khách biết mình đã nghe.",
        ),
        sp(
          "And nobody told us anything.",
          t1b,
          "Xin lỗi tiếp về điều thứ hai khách vừa nói, rồi hành động ngay.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "This is the first day of our holiday.",
          t1c,
          "Công nhận cảm xúc, đưa mốc giờ có con số, và tự làm phần của mình.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "The corridor was very noisy last night. People were shouting at two in the morning.",
          "I am sorry about the noisy corridor, sir. I will tell security about it tonight.",
          "Xin lỗi về điều khách gặp và nói ai sẽ xử lý.",
        ),
        sp(
          "I have something to tell you, but you will not like it.",
          "Of course, madam. Please tell me your concern.",
          "Mời khách nói hết — chưa giải thích, chưa bào chữa.",
        ),
      ],
      reading: read(
        `The Moreau family arrived at two, but at four their room is still not ready. Nobody has called them. Hieu listens without stopping them. He apologises for the room delay and says he is sorry nobody updated them. Then he checks the room: it will be ready in ten minutes. He brings the keys himself.`,
        [
          {
            q: "Hiếu làm gì đầu tiên?",
            options: [
              "Giải thích lý do chậm",
              "Lắng nghe, không ngắt lời khách",
              "Gọi quản lý xuống ngay",
            ],
            correct: 1,
            explanation:
              "'Hieu listens without stopping them' — bước đầu của tiếp nhận phàn nàn là nghe hết.",
          },
          {
            q: "Hiếu xin lỗi về điều gì?",
            options: [
              "Về việc bộ phận buồng phòng làm việc quá chậm hôm đó",
              "Về phòng chậm và việc không ai báo",
              "Về thời tiết xấu",
            ],
            correct: 1,
            explanation:
              "'apologises for the room delay and… nobody updated them' — xin lỗi đúng hai điều khách gặp, không đổ cho bộ phận nào.",
          },
        ],
      ),
      game: [
        game(
          "We have been waiting for two hours. Two hours!",
          "I apologise for the room delay, madam. I will check your room now.",
          "Sorry. Not my fault. Housekeeping slow.",
          "Housekeeping is very slow today, madam. It is really their fault, not ours.",
          undefined,
          "Câu cuối đổ lỗi cho đồng nghiệp trước mặt khách. Câu đúng xin lỗi về điều khách gặp và làm ngay.",
        ),
      ],
    }),

    L(27, 2, "A Real Apology", "Lời xin lỗi thật", {
      vocabulary: [
        c("Disappointed", "I understand you are disappointed, sir."),
        c("Double charge", "I can see a double charge for your dinner on the bill."),
        c("Wrong room rate", "I am sorry about the wrong room rate on your bill."),
        c("Long check-in queue", "I am sorry about the long check-in queue this afternoon."),
      ],
      grammar: [
        g(
          "Our mistake.",
          "I am sorry you had to wait in a long check-in queue, madam.",
          "Xin lỗi về điều khách ĐÃ gặp ('you had to wait'). Chưa ai kiểm tra thì không nói 'It was our mistake'.",
          "I am sorry you have to wait in a long check-in queue, madam.",
        ),
        g(
          "You disappointed? Sorry.",
          "I understand you are disappointed, sir. I will check the bill now.",
          "'disappointed' = người cảm thấy thất vọng; 'disappointing' = thứ gây thất vọng.",
          "I understand you are disappointing, sir. I will check the bill now.",
        ),
      ],
      speaking: [
        sp(
          "I paid for dinner, but it is on my bill twice!",
          t2a,
          "Xin lỗi về điều khách thấy, rồi kiểm tra — chưa kết luận lỗi của ai.",
        ),
        sp(
          "Can you just take it off right now?",
          t2b,
          "Lễ tân không tự sửa hóa đơn: nói rõ ai sửa và khi nào.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "I am really disappointed with this hotel.",
          t2c,
          "Công nhận cảm xúc, rồi hứa một việc cụ thể. Không tranh luận.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "The room rate on my bill is higher than my booking.",
          "I am sorry about the wrong room rate, madam. Let me check your booking now.",
          "Xin lỗi về điều khách thấy, rồi kiểm tra đặt phòng trước khi nói gì thêm.",
        ),
        sp(
          "Why was the check-in queue so long? I waited forty minutes.",
          "I am sorry you had to wait in a long check-in queue, sir. Two groups arrived together.",
          "Xin lỗi về điều khách đã gặp, rồi nêu lý do thật — không đổ lỗi cho ai.",
        ),
      ],
      reading: read(
        `Mr Jensen finds his dinner twice on his bill. Tam apologises for the double charge and checks the bill. She does not say "It was our mistake" yet, because nobody has checked how it happened. She cannot change the bill herself, so her supervisor corrects it the same day. Tam brings the new bill to his room.`,
        [
          {
            q: "Vì sao Tâm chưa nói 'It was our mistake'?",
            options: [
              "Vì khách sạn cấm nhân viên lễ tân xin lỗi khách",
              "Vì chưa ai kiểm tra lỗi do đâu",
              "Vì Tâm nghĩ chính khách đã đọc nhầm hóa đơn",
            ],
            correct: 1,
            explanation:
              "'because nobody has checked how it happened' — xin lỗi về trải nghiệm thì luôn đúng; kết luận lỗi phải chờ kiểm tra.",
          },
          {
            q: "Ai sửa hóa đơn?",
            options: [
              "Chính Tâm, ngay tại quầy",
              "Giám sát của Tâm",
              "Bộ phận nhà hàng của khách sạn",
            ],
            correct: 1,
            explanation:
              "'her supervisor corrects it the same day' — sửa hóa đơn là việc của giám sát, lễ tân chuyển đúng người.",
          },
        ],
      ),
      game: [
        game(
          "You charged my dinner twice. How did that happen?",
          "I am sorry about the double charge, sir. Let me check it now.",
          "Not me. Restaurant mistake.",
          "It was our mistake, sir. The cashier is new.",
          undefined,
          "Câu cuối kết luận lỗi và đổ cho đồng nghiệp khi chưa ai kiểm tra. Câu đúng xin lỗi về điều khách gặp và kiểm tra ngay.",
        ),
      ],
    }),

    L(27, 3, "Getting the Facts", "Hỏi cho rõ sự việc", {
      vocabulary: [
        c("Missing luggage", "I am sorry about your missing luggage, madam."),
        c("Air-conditioning noise", "I will send engineering about the air-conditioning noise."),
        c("Key card failure", "I am sorry about the key card failure at your door."),
        c("Dirty bathroom", "I am sorry you found a dirty bathroom, sir."),
      ],
      grammar: [
        g(
          "When?",
          "When did you last see your bag, madam?",
          "Hỏi điều khách CHƯA nói. Sau 'did' động từ ở dạng gốc: see.",
          "When did you last saw your bag, madam?",
        ),
        g(
          "Noise where?",
          "Is the noise from the air conditioner or from the corridor, sir?",
          "Câu hỏi lựa chọn với 'or' giúp khách mô tả nhanh. 'the noise' số ít → 'Is'.",
          "Are the noise from the air conditioner or from the corridor, sir?",
        ),
      ],
      speaking: [
        sp(
          "There is a loud noise in my room. It started last night and nobody helped.",
          t3a,
          "Khách đã nói KHI NÀO — đừng hỏi lại. Hỏi điều khách chưa nói: tiếng ồn từ đâu.",
        ),
        sp(
          "It is the air conditioner. It makes a loud buzz.",
          t3b,
          "Cảm ơn khách đã mô tả, rồi giao đúng bộ phận kèm mốc giờ.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "I could not sleep at all.",
          t3c,
          "Máy sẽ được sửa, nhưng khách đã mất một đêm — báo lên quản lý trực.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "My suitcase did not arrive with the airport car.",
          "I am sorry about your missing luggage, madam. When did you last see it?",
          "Xin lỗi, rồi hỏi điều khách chưa nói để bắt đầu tìm.",
        ),
        sp(
          "My key card does not open the door again.",
          "I am sorry about the key card failure, sir. Was it at your room door or in the lift?",
          "Hỏi một câu lựa chọn để biết đúng chỗ hỏng.",
        ),
        sp(
          "The bathroom was dirty when we arrived.",
          "I am sorry you found a dirty bathroom, madam. I will ask housekeeping to clean it now.",
          "Xin lỗi về điều khách thấy, giao đúng bộ phận làm ngay.",
        ),
      ],
      reading: read(
        `Mr Diaz says there is a loud noise in his room, and that it started last night. Vy does not ask when it started — he has already said that. She asks what he has not said: "Is it the air conditioner, or something outside?" It is the air conditioner, so Vy sends engineering within fifteen minutes.`,
        [
          {
            q: "Vì sao Vy không hỏi tiếng ồn bắt đầu khi nào?",
            options: [
              "Vì kỹ thuật viên sẽ tự hỏi lại khách điều đó sau",
              "Vì khách đã nói: từ tối qua",
              "Vì giờ bắt đầu không quan trọng với lễ tân",
            ],
            correct: 1,
            explanation:
              "'he has already said that' — hỏi lại điều khách vừa nói cho thấy mình không nghe.",
          },
          {
            q: "Vy hỏi khách điều gì?",
            options: [
              "Khách đã gọi xuống quầy lễ tân mấy lần trong đêm qua",
              "Có muốn đổi phòng không",
              "Tiếng ồn do máy lạnh hay bên ngoài",
            ],
            correct: 2,
            explanation:
              "'Is it the air conditioner, or something outside?' — câu hỏi lựa chọn giúp biết gọi bộ phận nào.",
          },
        ],
      ),
      game: [
        game(
          "My bag did not come with me from the airport.",
          "I am sorry, madam. When did you last see your bag?",
          "Bag lost? Not hotel problem. Airport problem, you call airport.",
          "That is the airline's problem, madam, so please call them yourself.",
          undefined,
          "Câu cuối đẩy khách đi. Câu đúng xin lỗi và hỏi điều khách chưa nói, để bắt đầu tìm.",
        ),
      ],
    }),

    L(27, 4, "Staying Calm", "Giữ bình tĩnh", {
      vocabulary: [
        c("Wake-up call mistake", "I am sorry about the wake-up call mistake this morning."),
        c("Weak wifi signal", "I am sorry about the weak wifi signal in your room."),
        c("Overbooking mix-up", "The duty manager handles any overbooking mix-up."),
        c("First aid", "I am calling first aid and the duty manager now.", [
          "/ˌfɜːst ˈeɪd/",
          "Sơ cứu",
          "🩹",
        ]),
      ],
      grammar: [
        g(
          "Calm down, sir.",
          "Please take a seat, sir. I am calling first aid now.",
          "Không bảo khách 'bình tĩnh'. Mời ngồi và gọi người có chuyên môn ngay.",
          "Please take a seat, sir. I am call first aid now.",
        ),
        g(
          "No room. Sorry.",
          "I am very sorry, madam. The duty manager is coming to speak with you.",
          "Đặt phòng quá số lượng: lễ tân không tự giải quyết. Quản lý trực xử lý.",
          "I am very sorry, madam. The duty manager is come to speak with you.",
        ),
      ],
      speaking: [
        risk(
          sp(
            "My husband feels very dizzy. He needs to sit down.",
            t4a,
            "Câu phải đúng của tuần: mời ngồi và gọi sơ cứu NGAY. Lễ tân không đoán bệnh, không tự đưa khách đi.",
            undefined,
            ["seat", "calling", "first", "aid"],
          ),
        ),
        sp(
          "Should we take him to the hospital?",
          t4b,
          "Không quyết thay khách và không chẩn đoán: quản lý trực đang tới và cùng khách quyết.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "Thank you. Please stay with us.",
          t4c,
          "Ở lại với khách cho tới khi người có chuyên môn tới.",
          undefined,
          undefined,
          t4b,
        ),
        risk(
          sp(
            "You have no room for me? I booked this two months ago!",
            o1,
            "Hết phòng dù khách đã đặt: xin lỗi và gọi quản lý trực ngay. Lễ tân không tự hứa phòng.",
            undefined,
            ["calling", "duty", "manager"],
          ),
        ),
        sp(
          "What happens to me tonight?",
          o2,
          "Nói việc quản lý trực sẽ làm — khách sạn lo chỗ ở cho khách.",
          undefined,
          undefined,
          o1,
        ),
        sp(
          "Nobody called me this morning! I missed my tour bus.",
          "I am very sorry about the wake-up call mistake, sir. I will check the wake-up call list now.",
          "Xin lỗi về điều khách gặp, rồi kiểm tra — chưa nói lỗi của ai.",
        ),
        sp(
          "The wifi in my room keeps stopping.",
          "I am sorry about the weak wifi signal, madam. I will send engineering within twenty minutes.",
          "Xin lỗi + bộ phận + mốc giờ.",
        ),
      ],
      reading: read(
        `In the lobby, an older guest suddenly feels dizzy, and his wife asks for help. Ngoc does not take him to the hospital herself. She asks him to take a seat, calls first aid and the duty manager, and stays with the couple. First aid arrives in two minutes, and the duty manager speaks with the family.`,
        [
          {
            q: "Ngọc làm gì đầu tiên?",
            options: [
              "Tự đưa khách ra taxi đến bệnh viện gần nhất ngay lập tức",
              "Hỏi khách đã ăn trưa chưa",
              "Mời ngồi, gọi sơ cứu và quản lý trực",
            ],
            correct: 2,
            explanation:
              "'She asks him to take a seat, calls first aid and the duty manager' — giữ an toàn và gọi người có chuyên môn.",
          },
          {
            q: "Vì sao Ngọc ở lại với hai vợ chồng?",
            options: [
              "Vì quầy lễ tân lúc đó vắng",
              "Để khách không một mình đến khi có người tới",
              "Để tính phí dịch vụ sơ cứu cho khách",
            ],
            correct: 1,
            explanation:
              "'stays with the couple' — người bệnh và người nhà không bị bỏ lại trong lúc chờ.",
          },
        ],
      ),
      game: [
        game(
          "My husband is not well. He is very pale.",
          "Please help him to a seat, madam. I am calling first aid now.",
          "Not well? Go hospital.",
          "I think he is just tired, madam. Maybe some water and a rest will help.",
          undefined,
          "Câu cuối tự đoán bệnh — lễ tân không chẩn đoán. Câu đúng mời ngồi và gọi người có chuyên môn ngay.",
        ),
      ],
    }),
  ];
}

// ── Week 28 — If you like, I can…: what the desk may offer ──────────────
function week28(): LessonContent[] {
  const t1a = "I am sorry, madam. If you like, I can move you to another room.";
  const t1b = "There are two options, madam: the tenth floor or the garden side.";
  const t1c = "Either option is quiet, madam. If you prefer a view, I recommend the tenth floor.";
  const t2a = "If you like, I can arrange late check-out until two. There is a small fee.";
  const t2b = "Then we can store your bags downstairs until your taxi comes, madam.";
  const t2c = "Of course, madam. I will send a bellman up at two o'clock.";
  const t3a = "I am sorry, I cannot offer a refund. My manager will call you this afternoon.";
  const t3b = "If you like, I can move you to a quieter room today.";
  const t3c = "I am sorry, I cannot offer a free breakfast. I will ask my manager.";
  const t4a = "If it happens again, please call me. I will send engineering to the room.";
  const t4b = "Then I will block a quieter room for you for tomorrow night, sir.";
  const t4c = "Of course, sir. If you like, I can show you the room at five o'clock.";
  const f1 = "Please take the emergency exit now, madam. Do not take the lift.";
  const f2 = "No, madam. Please leave your bags and go to the exit now.";
  const f3 = "Please go to the car park in front of the hotel. Our staff will meet you there.";
  return [
    L(28, 1, "If You Like, I Can…", "Nếu quý khách muốn, tôi có thể…", {
      vocabulary: [
        c("Prefer", "If you prefer, I can move you to a higher floor."),
        c("Option", "There are two options for your room tonight."),
        c("Either", "Either option is available tonight, sir."),
        c("Move you to another room", "If you like, I can move you to another room on this floor."),
      ],
      grammar: [
        g(
          "I move you, okay?",
          "If you like, I can move you to another room, madam.",
          "'If you like, I can…' — đề nghị điều lễ tân được làm, để khách quyết. Sau 'can' là động từ gốc.",
          "If you like, I can moving you to another room, madam.",
        ),
        g(
          "Two way. Choose.",
          "You can choose either option, sir: tonight or tomorrow morning.",
          "'either' + danh từ số ít: một trong hai.",
          "You can choose either options, sir: tonight or tomorrow morning.",
        ),
      ],
      speaking: [
        sp(
          "The music from the bar comes into my room every night.",
          t1a,
          "Xin lỗi, rồi đề nghị điều lễ tân làm được: đổi sang phòng cùng hạng.",
        ),
        sp(
          "Is there a room far from the bar?",
          t1b,
          "Đưa hai lựa chọn cụ thể để khách quyết.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Which one do you recommend?",
          t1c,
          "'Either' khi cả hai đều hợp; rồi gợi ý theo điều khách thích ('If you prefer').",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "Can I move now, or do I have to wait?",
          "If you prefer, the bellman can move your bags at six o'clock.",
          "Đề nghị có điều kiện, kèm mốc giờ.",
        ),
        sp(
          "My room smells of smoke from the last guest.",
          "I am sorry, sir. If you like, I can move you to another room on this floor.",
          "Xin lỗi về điều khách gặp, rồi đề nghị điều trong quyền của lễ tân.",
        ),
      ],
      reading: read(
        `Ms Fischer hears music from the bar every night. Kim offers what the desk can offer: "If you like, I can move you to another room." There are two options, the tenth floor or the garden side. Ms Fischer prefers a view, so Kim recommends the tenth floor. The bellman moves her bags at six.`,
        [
          {
            q: "Kim đưa ra những lựa chọn nào?",
            options: [
              "Tầng mười hoặc phía vườn",
              "Giảm giá hoặc bữa sáng miễn phí",
              "Phòng suite hoặc phòng gia đình",
            ],
            correct: 0,
            explanation:
              "'the tenth floor or the garden side' — cả hai đều là phòng cùng hạng, việc lễ tân được làm.",
          },
          {
            q: "Vì sao Kim gợi ý tầng mười?",
            options: [
              "Vì phòng ở tầng mười rẻ hơn phía vườn",
              "Vì khách thích có tầm nhìn",
              "Vì quán bar ở tầng mười đóng cửa sớm",
            ],
            correct: 1,
            explanation:
              "'Ms Fischer prefers a view, so Kim recommends the tenth floor' — gợi ý theo điều khách thích.",
          },
        ],
      ),
      game: [
        game(
          "The bar music keeps me awake. What can you do?",
          "I am sorry, madam. If you like, I can move you to another room.",
          "Music loud? Bar open late every night. Sorry, no can do anything.",
          "I am sorry, madam. The bar is open until midnight, so there is nothing we can do.",
          undefined,
          "Câu cuối nói đúng sự thật nhưng không đưa giải pháp nào. Câu đúng đề nghị điều lễ tân làm được và để khách quyết.",
        ),
      ],
    }),

    L(28, 2, "What the Desk Can Offer", "Những gì lễ tân được đề nghị", {
      vocabulary: [
        c("Arrange late check-out", "If you like, I can arrange late check-out until two o'clock."),
        c(
          "Extend your stay one night",
          "If the room is available, I can extend your stay one night.",
        ),
        c("Store your bags downstairs", "We can store your bags downstairs until your flight."),
        c("Bring the key to you", "If you like, the bellman can bring the key to you."),
      ],
      grammar: [
        g(
          "Bags here, okay.",
          "If you like, we can store your bags downstairs until your taxi comes.",
          "Mệnh đề 'until' dùng hiện tại: 'comes', không dùng 'will come'.",
          "If you like, we can store your bags downstairs until your taxi will come.",
        ),
        g(
          "Stay more? Okay.",
          "If the room is available, I can extend your stay one night.",
          "Câu điều kiện loại 1: 'If + hiện tại, … can + động từ gốc'. Không dùng 'will' sau 'if'.",
          "If the room will be available, I can extend your stay one night.",
        ),
      ],
      speaking: [
        sp(
          "Our flight is at eleven at night. What can we do after check-out?",
          t2a,
          "Đề nghị điều lễ tân được làm, và báo luôn là có phí.",
        ),
        sp(
          "And after two?",
          t2b,
          "Thêm một lựa chọn trong quyền của lễ tân, có mốc của khách.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Thank you. Can someone carry the bags down for us?",
          t2c,
          "Một việc, một người làm, một mốc giờ.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "We will have lunch while we wait for the room.",
          "Of course, sir. If you like, the bellman can bring the key to you there.",
          "Đề nghị có điều kiện để khách không phải quay lại quầy.",
        ),
        sp(
          "Can we stay one more night? We love it here.",
          "If the room is available, I can extend your stay one night, sir. Let me check now.",
          "Điều kiện thật (phòng còn trống) đứng trước lời hứa.",
        ),
      ],
      reading: read(
        `The Clarks' flight is at eleven at night. Ha offers what the desk can offer. If they like, she can arrange late check-out until two, with a small fee. After two, the hotel can store their bags downstairs until their taxi comes. Ha does not promise them the room for the whole evening.`,
        [
          {
            q: "Hà đề nghị gì cho khách?",
            options: [
              "Giữ phòng miễn phí đến tối",
              "Gọi hãng bay đổi sang chuyến sớm hơn",
              "Trả phòng muộn đến hai giờ, có phí nhỏ",
            ],
            correct: 2,
            explanation:
              "'she can arrange late check-out until two, with a small fee' — điều lễ tân được làm, nói rõ có phí.",
          },
          {
            q: "Sau hai giờ, hành lý của khách ở đâu?",
            options: [
              "Trên chiếc taxi đã đặt sẵn từ trưa",
              "Ở phòng giữ đồ tầng dưới",
              "Vẫn trong phòng",
            ],
            correct: 1,
            explanation:
              "'the hotel can store their bags downstairs until their taxi comes' — giải pháp miễn phí mà lễ tân được đề nghị.",
          },
        ],
      ),
      game: [
        game(
          "Our flight is late at night. Can we keep the room all day for free?",
          "I can arrange late check-out until two, sir. There is a small fee.",
          "All day free? Okay, no problem.",
          "Of course, sir. You are our guests, so stay in the room as long as you like.",
          undefined,
          "Câu cuối tự cho giữ phòng miễn phí cả ngày — vượt quyền. Câu đúng đưa điều lễ tân được làm: trả phòng muộn, có phí.",
        ),
      ],
    }),

    L(28, 3, "When You Must Say No", "Khi phải từ chối", {
      vocabulary: [
        c("Waive the late fee", "Only the duty manager can waive the late fee."),
        c("Upgrade you free of charge", "I cannot upgrade you free of charge myself."),
        c("Offer a free breakfast", "Only a manager can offer a free breakfast."),
        c(
          "Correct the room rate",
          "If your booking shows a lower rate, my supervisor will correct the room rate.",
        ),
      ],
      grammar: [
        g(
          "Free? No.",
          "I cannot waive the late fee myself, sir. I will ask the duty manager.",
          "Bỏ phí là quyết định về tiền: lễ tân không tự hứa, chuyển đúng người. Sau 'will' là động từ gốc.",
          "I cannot waive the late fee myself, sir. I will asking the duty manager.",
        ),
        g(
          "Rate wrong? I change.",
          "If your booking shows a lower rate, my supervisor will correct it.",
          "Câu điều kiện loại 1: mệnh đề 'If' dùng hiện tại ('shows'). Sửa giá là việc của giám sát.",
          "If your booking will show a lower rate, my supervisor will correct it.",
        ),
      ],
      speaking: [
        risk(
          sp(
            "The noise ruined my night. I want a refund for it.",
            t3a,
            "Câu thẩm quyền của tuần: lễ tân KHÔNG tự hứa hoàn tiền. Nói rõ ai gọi lại và khi nào.",
            undefined,
            ["offer", "refund", "manager", "afternoon"],
          ),
        ),
        sp(
          "Then what can you do for me right now?",
          t3b,
          "Ngay sau lời từ chối, đưa giải pháp trong quyền của lễ tân.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Fine. And breakfast tomorrow should be free.",
          t3c,
          "Đồ miễn phí không phải quyền của lễ tân: từ chối lịch sự và chuyển quản lý.",
          undefined,
          undefined,
          t3b,
        ),
        risk(
          sp(
            "I checked out at two. Please waive the late fee for me.",
            "I am sorry, I cannot waive the late fee. I will ask the duty manager.",
            "Bỏ phí là quyết định về tiền: lễ tân không tự bỏ, chuyển quản lý trực.",
            undefined,
            ["waive", "late", "fee", "duty", "manager"],
          ),
        ),
        sp(
          "My friend got a free upgrade last time. Can you upgrade me free of charge?",
          "I am sorry, I cannot upgrade you free of charge. If you like, I can ask my manager.",
          "Từ chối điều không thuộc quyền mình, rồi đề nghị chuyển đúng người.",
        ),
        sp(
          "My booking says ninety dollars, but the bill says one hundred and ten.",
          "If your booking shows a lower rate, my supervisor will correct it today, sir.",
          "Điều kiện thật trước, người sửa sau. Lễ tân không tự đổi giá.",
        ),
      ],
      reading: read(
        `Mr Ward checked out at two and asks Thuy to waive the late fee. Thuy cannot waive it herself, so she asks the duty manager. Mr Ward also says his booking shows a lower rate. Thuy checks, and it does, so her supervisor corrects the room rate. The duty manager decides about the late fee.`,
        [
          {
            q: "Ai quyết định về phí trả phòng muộn?",
            options: ["Thủy, vì Thủy làm thủ tục trả phòng", "Quản lý trực", "Giám sát của Thủy"],
            correct: 1,
            explanation:
              "'The duty manager decides about the late fee' — bỏ phí là quyết định về tiền.",
          },
          {
            q: "Vì sao giám sát sửa giá phòng?",
            options: [
              "Vì khách đã trả phòng muộn hai tiếng hôm đó",
              "Vì khách nói lớn tiếng và đòi giảm giá",
              "Vì đặt phòng ghi giá thấp hơn",
            ],
            correct: 2,
            explanation:
              "'his booking shows a lower rate… so her supervisor corrects the room rate' — sửa vì có căn cứ, và đúng người sửa.",
          },
        ],
      ),
      game: [
        game(
          "I want my money back for last night.",
          "I am sorry, I cannot offer a refund. My manager will call you this afternoon.",
          "No money back. Rule.",
          "Of course, sir. I am so sorry about that. I will refund last night to your card right now.",
          undefined,
          "Câu cuối tự hứa hoàn tiền — vượt quyền lễ tân. Câu đúng không hứa, không đóng cửa: nói rõ ai gọi lại và khi nào.",
        ),
      ],
    }),

    L(28, 4, "If It Happens Again…", "Nếu chuyện lặp lại…", {
      vocabulary: [
        c(
          "Send engineering to the room",
          "If the noise starts again, I will send engineering to the room.",
        ),
        c("Block a quieter room", "I will block a quieter room for you for tomorrow night."),
        c("Fire alarm", "If you hear the fire alarm, please take the emergency exit.", [
          "/ˈfaɪər əˈlɑːm/",
          "Chuông báo cháy",
          "🚨",
        ]),
      ],
      grammar: [
        g(
          "Noise again, call.",
          "If the noise starts again, please call me. I will send engineering to the room.",
          "'If it happens again…' — mệnh đề 'If' ở hiện tại; mệnh đề chính dùng 'please' hoặc 'will'.",
          "If the noise will start again, please call me. I will send engineering to the room.",
        ),
        g(
          "Fire, run lift.",
          "If there is a fire alarm, please take the emergency exit, not the lift.",
          "Hướng dẫn an toàn: một câu rõ ràng — lối thoát hiểm, không đi thang máy. 'a fire alarm' số ít → 'is'.",
          "If there are a fire alarm, please take the emergency exit, not the lift.",
        ),
      ],
      speaking: [
        sp(
          "Engineering fixed the air conditioner, but what if it is noisy again?",
          t4a,
          "Câu điều kiện (If it happens again…) + việc cụ thể bạn sẽ làm.",
        ),
        sp(
          "I need to sleep well tomorrow. I have a big meeting.",
          t4b,
          "Giữ trước một phòng yên tĩnh hơn — việc lễ tân được làm.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "Can I see the quieter room before I move?",
          t4c,
          "Đề nghị có điều kiện, kèm mốc giờ.",
          undefined,
          undefined,
          t4b,
        ),
        risk(
          sp(
            "The fire alarm is ringing on my floor. What should I do?",
            f1,
            "Câu phải đúng của tuần: lối thoát hiểm, KHÔNG đi thang máy. Không đoán là chuông thử.",
            undefined,
            ["take", "emergency", "exit", "lift"],
          ),
        ),
        sp(
          "Should I take my suitcase with me?",
          f2,
          "Không mang hành lý — ra ngay.",
          undefined,
          undefined,
          f1,
        ),
        sp(
          "Where do we meet outside?",
          f3,
          "Nói rõ điểm tập trung và ai sẽ ở đó.",
          undefined,
          undefined,
          f2,
        ),
      ],
      reading: read(
        `At ten at night, the fire alarm rings on the sixth floor. Tuan answers a call from Room 612. He does not say it is probably a test. He says: "Please take the emergency exit now, madam. Do not take the lift." He tells her to leave her bags and to go to the car park.`,
        [
          {
            q: "Tuấn hướng dẫn khách đi bằng đường nào?",
            options: [
              "Lối thoát hiểm, không đi thang máy",
              "Thang máy, vì nhanh hơn",
              "Ở yên trong phòng",
            ],
            correct: 0,
            explanation:
              "'Please take the emergency exit now… Do not take the lift' — khi có báo cháy, thang máy không an toàn.",
          },
          {
            q: "Vì sao Tuấn không nói đó có thể chỉ là chuông thử?",
            options: [
              "Vì quản lý trực cấm nhân viên lễ tân nói chuyện điện thoại lúc đó",
              "Vì chưa ai biết chắc, an toàn đi trước",
              "Vì khách không hiểu tiếng Anh",
            ],
            correct: 1,
            explanation:
              "'He does not say it is probably a test' — lễ tân không đoán; chuông kêu thì làm theo quy trình thoát hiểm.",
          },
        ],
      ),
      game: [
        game(
          "The alarm is ringing. Can we take the lift down?",
          "No, madam. Please take the emergency exit, not the lift.",
          "Lift okay. Go fast.",
          "Yes, madam, take the lift. It is only a test.",
          undefined,
          "Câu cuối vừa cho đi thang máy vừa đoán là chuông thử. Câu đúng nói rõ một việc: đi lối thoát hiểm.",
        ),
      ],
    }),
  ];
}

// ── Week 29 — Handover between receptionists, and up to the duty manager ─
function week29(): LessonContent[] {
  const t1a = "Two VIP guests are on the arrival list tonight. I updated it at two.";
  const t1b = "Mr and Mrs Sato arrive at eight o'clock. The general manager will greet them.";
  const t1c = "The room status report shows six rooms not ready. Please check them at five.";
  const t2a = "Yes. I was checking the arrival list when a visitor asked for a room number.";
  const t2b = "I did not tell him the number. I noted it in the log.";
  const t2c = "It was Mrs Sato. She is on the special attention list.";
  const t3a = "The occupancy figure is not final yet. The night auditor is checking it.";
  const t3b = "I have counted the cash float, and it is correct.";
  const t3c = "I have not checked the key inventory yet. Please count it before midnight.";
  const t4a = "I wrote them on the wake-up call list, and I checked them twice.";
  const t4b = "Room 410 is on the out-of-order room list. Engineering is fixing the shower.";
  const t4c = "Everything is in the handover log, with the times.";
  return [
    L(29, 1, "Handing Over the Shift", "Bàn giao ca", {
      vocabulary: [
        c("Shift", "My shift ends at three o'clock."),
        c("Update", "Here is a quick update before you start."),
        c("Arrival list", "Two VIP guests are on today's arrival list."),
        c("Departure list", "I checked the departure list at two."),
        c("Room status report", "The room status report shows six rooms not ready."),
      ],
      grammar: [
        g(
          "Many thing today.",
          "I updated the arrival list at two. Two VIP guests arrive tonight.",
          "Bàn giao: việc ĐÃ làm (quá khứ đơn 'updated') + việc sắp tới (hiện tại).",
          "I update the arrival list at two. Two VIP guests arrive tonight.",
        ),
        g(
          "Rooms not ready.",
          "The room status report shows six rooms that are not ready.",
          "'The room status report' là một bản báo cáo → 'shows'. Nói con số cụ thể.",
          "The room status report show six rooms that are not ready.",
        ),
      ],
      speaking: [
        sp(
          "Hi Nam. What do I need to know for my shift?",
          t1a,
          "Nói với đồng nghiệp ca sau: việc quan trọng nhất trước, kèm việc đã làm.",
          "colleague",
        ),
        sp(
          "Who are they, and when do they arrive?",
          t1b,
          "Tên khách, giờ đến, và ai sẽ đón.",
          "colleague",
          undefined,
          t1a,
        ),
        sp(
          "Okay. What about the rooms?",
          t1c,
          "Con số cụ thể + việc ca sau cần làm + giờ.",
          "colleague",
          undefined,
          t1b,
        ),
        sp(
          "Are there any late check-outs today?",
          "Three rooms on the departure list have late check-out until six.",
          "Số phòng + mốc giờ — đủ để ca sau xếp việc.",
          "colleague",
        ),
        sp(
          "Is the shift handover done?",
          "Yes. I gave Hoa a full update at three, and she has the arrival list.",
          "Báo cấp trên ngắn gọn: đã bàn giao cho ai, lúc nào.",
          "manager",
        ),
      ],
      reading: read(
        `At three, Nam hands over to Hoa. He gives her a short update: two VIP guests are on tonight's arrival list, and the general manager will greet them at eight. The room status report shows six rooms not ready, so Hoa will check them at five. Three rooms on the departure list have late check-out until six.`,
        [
          {
            q: "Hòa cần làm gì lúc năm giờ?",
            options: [
              "Đón hai khách VIP",
              "Kiểm tra sáu phòng chưa sẵn sàng",
              "Làm thủ tục cho ba phòng",
            ],
            correct: 1,
            explanation:
              "'six rooms not ready, so Hoa will check them at five' — bàn giao tốt nói rõ việc, số lượng và giờ.",
          },
          {
            q: "Ai sẽ đón hai khách VIP?",
            options: ["Nam, trước khi hết ca", "Tổng giám đốc", "Hòa, ngay lúc năm giờ"],
            correct: 1,
            explanation: "'the general manager will greet them at eight' — ca sau biết ai làm gì.",
          },
        ],
      ),
      game: [
        game(
          "I am taking over now. What is the most urgent thing?",
          "Two VIP guests arrive at eight. The general manager will greet them.",
          "VIP come eight o'clock. General manager meet them. You no need do anything now.",
          "Nothing much, really. It was a quiet day, so just relax and enjoy the shift.",
          "colleague",
          "Câu cuối bỏ sót khách VIP — ca sau sẽ không chuẩn bị. Câu đúng nêu việc quan trọng nhất, kèm giờ.",
        ),
      ],
    }),

    L(29, 2, "I Was Doing… When…", "Tôi đang làm… thì…", {
      vocabulary: [
        c("Suddenly", "The key card machine suddenly stopped working."),
        c("Pending request", "There is one pending request from Room 418."),
        c("Special attention list", "Mrs Sato is on the special attention list."),
        c("Room discrepancy report", "The room discrepancy report shows Room 702 as vacant."),
      ],
      grammar: [
        g(
          "I check list, guest call.",
          "I was checking the arrival list when the guest called.",
          "Quá khứ tiếp diễn 'was checking' cho việc đang làm; quá khứ đơn 'called' cho việc chen vào.",
          "I was check the arrival list when the guest called.",
        ),
        g(
          "Machine stop.",
          "The key card machine suddenly stopped at ten.",
          "'suddenly' đứng trước động từ quá khứ. Quá khứ của 'stop' là 'stopped'.",
          "The key card machine suddenly stop at ten.",
        ),
      ],
      speaking: [
        sp(
          "Anything unusual on the night shift?",
          t2a,
          "Báo cáo sự việc lên quản lý trực: đang làm gì (was + -ing) khi chuyện xảy ra.",
          "manager",
        ),
        risk(
          sp(
            "What did you tell him?",
            t2b,
            "Câu phải đúng của tuần: KHÔNG cho số phòng, và đã ghi sự việc vào sổ.",
            "manager",
            ["number", "noted", "log"],
            t2a,
          ),
        ),
        sp(
          "Good. Which guest was it?",
          t2c,
          "Nói với cấp trên thì được nêu tên khách — và vì sao việc này quan trọng.",
          "manager",
          undefined,
          t2b,
        ),
        sp(
          "Is anything still waiting for me?",
          "There is one pending request: an extra pillow for Room 418. I asked housekeeping at nine.",
          "Việc còn mở + đã giao cho ai + lúc nào.",
          "colleague",
        ),
        sp(
          "Why did check-in stop at ten?",
          "The key card machine suddenly stopped. I was making keys for a family.",
          "Quá khứ tiếp diễn cho việc đang làm, quá khứ đơn cho việc xảy ra.",
          "manager",
        ),
        sp(
          "Room 702 says vacant on the system, but the bags are still inside.",
          "Then we write a room discrepancy report and call housekeeping now.",
          "Phòng lệch trạng thái: lập báo cáo lệch và gọi buồng phòng. Không tự xếp khách vào.",
          "colleague",
        ),
      ],
      reading: read(
        `At midnight, Khanh was checking the arrival list when a visitor asked for Mrs Sato's room number. Khanh did not tell him. Mrs Sato is on the special attention list, so Khanh noted the visit in the log and called the duty manager. In the morning, Khanh reported it to the front office manager.`,
        [
          {
            q: "Khánh đang làm gì khi người lạ hỏi số phòng?",
            options: [
              "Kiểm tra danh sách khách đến",
              "Làm thẻ phòng",
              "Bàn giao ca cho đồng nghiệp",
            ],
            correct: 0,
            explanation:
              "'Khanh was checking the arrival list when a visitor asked…' — quá khứ tiếp diễn kể việc đang làm khi sự việc xảy ra.",
          },
          {
            q: "Vì sao Khánh báo quản lý trực?",
            options: [
              "Vì người lạ to tiếng đòi gặp quản lý của khách sạn",
              "Vì máy làm thẻ bị hỏng",
              "Vì bà Sato thuộc danh sách cần lưu ý",
            ],
            correct: 2,
            explanation:
              "'Mrs Sato is on the special attention list, so Khanh… called the duty manager' — khách cần lưu ý đặc biệt thì báo ngay.",
          },
        ],
      ),
      game: [
        game(
          "What were you doing when the visitor came in?",
          "I was checking the arrival list at the desk.",
          "I check arrival list at desk, then visitor come and ask room.",
          "I gave him the room number because he said he was her brother.",
          "manager",
          "Câu cuối tiết lộ số phòng — sai quyền riêng tư dù người kia nói gì. Câu đúng kể bằng quá khứ tiếp diễn việc đang làm.",
        ),
      ],
    }),

    L(29, 3, "Open Items", "Những việc còn mở", {
      vocabulary: [
        c("Yet", "I have not counted the key inventory yet."),
        c("Occupancy figure", "The occupancy figure is not final until the night audit."),
        c("Cash float", "I counted the cash float at the start of my shift."),
        c("Key inventory", "Please count the key inventory before midnight."),
      ],
      grammar: [
        g(
          "Not finish.",
          "The occupancy figure is not final yet. The night auditor is checking it.",
          "'not … yet' = chưa, tính tới lúc này. 'yet' đứng cuối câu. 'is checking' — đang làm.",
          "The occupancy figure is not final yet. The night auditor is check it.",
        ),
        g(
          "Money ok.",
          "I have counted the cash float, and it is correct.",
          "Hiện tại hoàn thành 'have counted' báo việc đã làm xong, kết quả còn giá trị.",
          "I have count the cash float, and it is correct.",
        ),
      ],
      speaking: [
        sp(
          "Is anything still open from your shift?",
          t3a,
          "Việc còn mở: chưa xong (not … yet) + ai đang làm.",
          "colleague",
        ),
        sp(
          "What about the cash float?",
          t3b,
          "Việc đã làm xong: hiện tại hoàn thành + kết quả.",
          "colleague",
          undefined,
          t3a,
        ),
        sp(
          "And the key cards?",
          t3c,
          "Nói thật việc chưa làm, và giao lại rõ ràng kèm mốc giờ.",
          "colleague",
          undefined,
          t3b,
        ),
        sp(
          "Has the night auditor finished the report?",
          "Not yet. He is still checking the occupancy figure.",
          "Báo cấp trên đúng tình trạng, không đoán con số.",
          "manager",
        ),
      ],
      reading: read(
        `Before the night shift, Mai writes the open items. The occupancy figure is not final yet, because the night auditor is still checking it. She has counted the cash float, and it is correct. She has not checked the key inventory yet, so she asks Duy to count it before midnight.`,
        [
          {
            q: "Vì sao số liệu công suất phòng chưa chốt?",
            options: [
              "Vì Mai quên không làm trước khi hết ca chiều",
              "Vì kiểm toán đêm vẫn đang kiểm",
              "Vì đã kín phòng",
            ],
            correct: 1,
            explanation:
              "'because the night auditor is still checking it' — việc còn mở được ghi kèm lý do và người đang làm.",
          },
          {
            q: "Mai nhờ Duy làm gì?",
            options: [
              "Đếm lại toàn bộ tiền quỹ đầu ca một lần nữa",
              "Gọi điện cho kiểm toán đêm",
              "Đếm thẻ phòng trước nửa đêm",
            ],
            correct: 2,
            explanation:
              "'she asks Duy to count it before midnight' — việc chưa làm được giao lại rõ ràng, có mốc giờ.",
          },
        ],
      ),
      game: [
        game(
          "Is the occupancy figure ready for the morning report?",
          "Not yet. The night auditor is checking it now.",
          "Not finish. Later.",
          "Yes, about ninety percent, I think.",
          "manager",
          "Câu cuối báo một con số đoán — cấp trên sẽ dùng số sai. Câu đúng nói thật là chưa xong và ai đang làm.",
        ),
      ],
    }),

    L(29, 4, "The Right Log for the Right Thing", "Đúng sổ cho đúng việc", {
      vocabulary: [
        c("Wake-up call list", "Room 305 is on the wake-up call list for six o'clock."),
        c("Group arrival note", "The group arrival note says the Sunrise group arrives at ten."),
        c("Out-of-order room list", "Room 410 is on the out-of-order room list."),
      ],
      grammar: [
        g(
          "I remember, no write.",
          "I wrote the wake-up calls on the wake-up call list.",
          "Việc đã làm trong ca kể bằng quá khứ đơn: write → wrote.",
          "I write the wake-up calls on the wake-up call list.",
        ),
        g(
          "Room broken, list.",
          "Room 410 is out of order, so it is on the out-of-order room list.",
          "Phòng hỏng ghi vào danh sách phòng hỏng — không ghi chung vào mọi sổ. 'Room 410' số ít → 'is'.",
          "Room 410 are out of order, so it is on the out-of-order room list.",
        ),
      ],
      speaking: [
        sp(
          "Where did you write the wake-up calls for tomorrow?",
          t4a,
          "Báo cấp trên: đúng danh sách, và đã tự kiểm lại.",
          "manager",
        ),
        sp(
          "And the broken room on the fourth floor?",
          t4b,
          "Phòng hỏng: đúng danh sách + ai đang sửa.",
          "manager",
          undefined,
          t4a,
        ),
        sp(
          "Where can I see what happened on your shift?",
          t4c,
          "Mọi việc khác trong ca ghi vào sổ bàn giao, kèm giờ — không ghi vào danh sách phòng hỏng.",
          "manager",
          undefined,
          t4b,
        ),
        risk(
          sp(
            "The cash float was short this morning. What did you do?",
            "I reported it to the night manager, and I noted it in the log.",
            "Tiền quỹ thiếu: báo đúng người và ghi sổ ngay. Không tự bù, không đoán ai lấy.",
            "manager",
            ["reported", "night", "manager", "noted", "log"],
          ),
        ),
        sp(
          "When does the Sunrise group arrive?",
          "The group arrival note says ten o'clock. Their key packets are ready.",
          "Chỉ đúng nơi ghi thông tin, kèm việc đã chuẩn bị.",
          "colleague",
        ),
        sp(
          "Did anyone ask for an early wake-up call?",
          "Yes, Room 305 at six o'clock. It is on the wake-up call list.",
          "Số phòng + giờ + đã ghi ở đâu.",
          "colleague",
        ),
      ],
      reading: read(
        `At the end of her shift, Thao puts each item in the right place. The wake-up calls go on the wake-up call list. Room 410 goes on the out-of-order room list. The Sunrise group's time goes in the group arrival note. Everything else, with the times, goes in the handover log.`,
        [
          {
            q: "Những việc khác trong ca được ghi ở đâu?",
            options: [
              "Danh sách các phòng đang hỏng",
              "Danh sách gọi báo thức buổi sáng",
              "Sổ bàn giao ca, kèm giờ",
            ],
            correct: 2,
            explanation:
              "'Everything else, with the times, goes in the handover log' — mỗi việc đúng một chỗ, ca sau mới tìm được.",
          },
          {
            q: "Phòng 410 được ghi vào đâu?",
            options: [
              "Ghi chú về đoàn khách sắp đến",
              "Danh sách phòng hỏng",
              "Sổ đồ thất lạc của quầy lễ tân",
            ],
            correct: 1,
            explanation:
              "'Room 410 goes on the out-of-order room list' — để không ai xếp khách vào phòng đang hỏng.",
          },
        ],
      ),
      game: [
        game(
          "Where should I write the wake-up call for Room 512?",
          "On the wake-up call list. The night team checks it.",
          "Wake-up, paper. Anywhere.",
          "Just write it on a sticky note.",
          "colleague",
          "Câu cuối dễ làm mất yêu cầu của khách. Câu đúng chỉ đúng danh sách mà ca đêm sẽ đọc.",
        ),
      ],
    }),
  ];
}

// ── Week 30 — Checkpoint: putting weeks 23-29 together ──────────────────
function week30(): LessonContent[] {
  const t1a =
    "I recommend the junior suite, madam. It is bigger, and the rate per night includes breakfast.";
  const t1b = "It is thirty dollars more per night, madam, at our published rate.";
  const t1c =
    "It will be ready within fifteen minutes. Your room number is on the key card holder.";
  const t2a = "Because housekeeping has to prepare the room for the next guest, sir.";
  const t2b =
    "Your pick-up time is six o'clock, sir. I will ask the driver to wait at the main door.";
  const t2c = "The breakfast arrangement for your group is in the Lotus room from seven.";
  const t3a = "I am sorry, sir, this card was declined. Do you have another card?";
  const t3b = "I am sorry, I do not know the reason, sir. Your bank can tell you.";
  const t3c = "Of course, sir. Please review the final balance before you pay.";
  const t4a = "I am sorry, madam. For his safety, I cannot tell you that.";
  const t4b = "I understand, madam. If he is staying with us, I can take a message for him.";
  const t4c = "Thank you, madam. Please take a seat while you wait.";
  return [
    L(30, 1, "Recommend and Promise", "Gợi ý và cam kết", {
      vocabulary: [
        c("Review", "Please review the details before you sign."),
        c("Confident", "I feel confident at the desk on a busy night now."),
        c("Room number", "We never say a guest's room number out loud at the desk."),
        c("Rate per night", "The rate per night includes breakfast for two."),
      ],
      grammar: [
        g(
          "Big room good.",
          "I recommend the junior suite, sir. It is bigger than the deluxe room.",
          "Tuần 23: 'I recommend' + so sánh hơn. big → bigger, không nói 'more bigger'.",
          "I recommend the junior suite, sir. It is more bigger than the deluxe room.",
        ),
        g(
          "Room number 512!",
          "Your room number is on the key card holder, madam.",
          "Không đọc to số phòng ở quầy — người khác có thể nghe. Chỉ vào chỗ ghi số phòng.",
          "Your room number are on the key card holder, madam.",
        ),
      ],
      speaking: [
        sp(
          "We would like something bigger than our booking.",
          t1a,
          "Tuần 23: gợi ý một hạng phòng + một lý do so sánh.",
        ),
        sp(
          "How much more is it per night?",
          t1b,
          "Báo giá chênh lệch theo giá niêm yết, bằng con số.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "All right, we will take it. Is it ready now?",
          t1c,
          "Tuần 25: hứa có con số. Không đọc to số phòng — chỉ vào bao thẻ.",
          undefined,
          undefined,
          t1b,
        ),
        risk(
          sp(
            "I am Mr Brown in 604. I lost my key. Give me a new one, please.",
            "Of course, sir. I will check your passport, then reprogram your key card.",
            "Câu phải đúng: kiểm tra hộ chiếu TRƯỚC, rồi mới làm lại thẻ — dù khách nói đúng tên và số phòng.",
            undefined,
            ["check", "passport", "reprogram", "key", "card"],
          ),
        ),
        sp(
          "Do I need to sign anything for the suite?",
          "Yes, madam. Please review the new rate per night, then sign here.",
          "Mời khách xem lại trước khi ký — không giục khách ký ngay.",
        ),
      ],
      reading: read(
        `Mr and Mrs Lopez want something bigger than their booking. Hai recommends the junior suite: it is bigger, and the rate per night includes breakfast. It is thirty dollars more per night. They take it, and Hai promises the room within fifteen minutes. He does not say the room number out loud. He points to the key card holder.`,
        [
          {
            q: "Phòng junior suite đắt hơn bao nhiêu mỗi đêm?",
            options: ["Ba mươi đô la", "Mười lăm đô la mỗi đêm", "Bốn mươi đô la"],
            correct: 0,
            explanation:
              "'It is thirty dollars more per night' — giá chênh lệch nói bằng con số, theo giá niêm yết.",
          },
          {
            q: "Vì sao Hải không đọc to số phòng?",
            options: [
              "Vì Hải chưa biết khách sẽ ở phòng số mấy",
              "Để người khác không nghe được",
              "Vì khách đã biết rồi",
            ],
            correct: 1,
            explanation:
              "'He does not say the room number out loud' — ở quầy luôn có người khác đứng gần.",
          },
        ],
      ),
      game: [
        game(
          "Can you tell me my room number again? I forgot.",
          "Of course, madam. It is written here on your key card holder.",
          "Room five one two! Five one two!",
          "Of course, madam. You are in room 512, on the fifth floor, next to the lift.",
          undefined,
          "Câu cuối đọc to số phòng ở quầy — người lạ có thể nghe được. Câu đúng chỉ vào chỗ ghi số phòng.",
        ),
      ],
    }),

    L(30, 2, "Explain and Coordinate", "Giải thích và điều phối", {
      vocabulary: [
        c("Late check-out time", "Your late check-out time is two o'clock."),
        c("Pick-up time", "Your pick-up time for the airport is six o'clock."),
        c("Number of nights", "Please check the number of nights on your booking."),
        c(
          "Breakfast arrangement",
          "The breakfast arrangement for your group is in the Lotus room.",
        ),
      ],
      grammar: [
        g(
          "Late, pay.",
          "There is a fee because we have to prepare the room for the next guest.",
          "Tuần 24: 'have to' + 'because' + lý do thật.",
          "There is a fee because we has to prepare the room for the next guest.",
        ),
        g(
          "Driver, you call.",
          "I will ask the airport driver to be here at six o'clock.",
          "Tuần 26: 'ask + người + to + động từ'.",
          "I will ask the airport driver be here at six o'clock.",
        ),
      ],
      speaking: [
        sp(
          "Why is there a fee for keeping the room until two?",
          t2a,
          "Tuần 24: lý do thật sau 'because'.",
        ),
        sp(
          "Fine. Our flight is at nine. When does the car come?",
          t2b,
          "Tuần 25-26: mốc giờ + giao việc cho đúng người.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "And breakfast for my team tomorrow morning?",
          t2c,
          "Nơi và giờ, rõ ràng cho cả đoàn.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "My booking says three nights, but I am staying four.",
          "Let me check the number of nights with reservations, sir. I will update your booking.",
          "Tuần 26: hỏi đúng bộ phận trước, rồi hứa việc tiếp theo.",
        ),
      ],
      reading: read(
        `Mr Okoro's group checks out tomorrow, and their flight is at nine at night. Sang explains the late check-out time: two o'clock, with a fee, because housekeeping has to prepare the room. The pick-up time is six o'clock, and Sang asks the driver to wait at the main door. Breakfast is in the Lotus room from seven.`,
        [
          {
            q: "Xe đón khách lúc mấy giờ?",
            options: ["Hai giờ chiều", "Chín giờ tối", "Sáu giờ"],
            correct: 2,
            explanation: "'The pick-up time is six o'clock' — sớm hơn giờ bay để kịp làm thủ tục.",
          },
          {
            q: "Vì sao trả phòng lúc hai giờ có phí?",
            options: [
              "Vì đoàn đặt giá thấp",
              "Vì phải chuẩn bị phòng cho khách sau",
              "Vì xe ra sân bay đến muộn",
            ],
            correct: 1,
            explanation:
              "'because housekeeping has to prepare the room' — lý do thật, không phải 'vì quy định'.",
          },
        ],
      ),
      game: [
        game(
          "We leave tomorrow. Who will drive us to the airport?",
          "I will ask the airport driver to be here at six o'clock, sir.",
          "Driver come. Six.",
          "Please find a taxi outside, sir.",
          undefined,
          "Câu cuối đẩy việc sang khách. Câu đúng nói rõ ai làm và mấy giờ.",
        ),
      ],
    }),

    L(30, 3, "Apologise and Solve", "Xin lỗi và giải quyết", {
      vocabulary: [
        c("Payment method", "Which payment method would you like to use, madam?"),
        c("Final balance", "Your final balance is on the last page of the bill."),
        c("Guest signature", "We need the guest signature at the bottom of the bill."),
        c("Individually", "Each guest in the group can pay individually.", [
          "/ˌɪndɪˈvɪdʒuəli/",
          "Riêng lẻ, từng người một",
          "👤",
        ]),
      ],
      grammar: [
        g(
          "Card no good.",
          "I am sorry, this card was declined. Do you have another card?",
          "Thẻ bị từ chối: nói nhỏ, ngắn, không đoán lý do. 'was declined' — bị động, cần -ed.",
          "I am sorry, this card was decline. Do you have another card?",
        ),
        g(
          "Sign.",
          "Please review your final balance, and sign here if it is correct.",
          "Mời khách xem lại trước khi ký. Hai mệnh lệnh lịch sự nối bằng 'and', đều ở dạng gốc.",
          "Please review your final balance, and signs here if it is correct.",
        ),
      ],
      speaking: [
        risk(
          sp(
            "Here is my card for the final balance.",
            t3a,
            "Câu phải đúng: nói NHỎ, ngắn, không đoán lý do, và hỏi thẻ khác.",
            undefined,
            ["card", "declined"],
          ),
        ),
        sp(
          "Declined? That is impossible. Why?",
          t3b,
          "Lễ tân không biết và không đoán lý do — chỉ ngân hàng biết.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Fine. Can I pay in cash instead?",
          t3c,
          "Đồng ý, và mời khách xem lại số tiền trước khi trả.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "We are a group, but we want to pay separately.",
          "Of course. Each guest can pay individually at check-out.",
          "Việc lễ tân làm được: đồng ý ngay.",
        ),
        sp(
          "You put my friend's dinner on my bill!",
          "I am sorry about that, madam. Let me check the bill with you now.",
          "Tuần 27: xin lỗi về điều khách thấy, rồi kiểm tra cùng khách.",
        ),
        sp(
          "Where do I sign?",
          "Please sign at the bottom, madam. We need the guest signature for the bill.",
          "Chỉ đúng chỗ ký và nói vì sao cần chữ ký.",
        ),
      ],
      reading: read(
        `At check-out, Mr Grey's card is declined. Tien says it quietly: "I am sorry, sir, this card was declined. Do you have another card?" She does not guess why. When he asks, she says that his bank can tell him. He pays the final balance in cash, reviews the bill and signs it.`,
        [
          {
            q: "Tiên làm gì khi thẻ bị từ chối?",
            options: [
              "Nói to, rõ ràng để khách và người xung quanh đều nghe",
              "Đoán thẻ hết tiền",
              "Nói nhỏ, hỏi khách có thẻ khác không",
            ],
            correct: 2,
            explanation:
              "'Tien says it quietly' — chuyện thẻ bị từ chối là chuyện riêng của khách.",
          },
          {
            q: "Khi khách hỏi vì sao, Tiên trả lời thế nào?",
            options: [
              "Có lẽ thẻ của khách đã hết hạn từ tháng trước",
              "Ngân hàng của khách mới biết lý do",
              "Máy quẹt thẻ bị hỏng",
            ],
            correct: 1,
            explanation:
              "'She does not guess why… his bank can tell him' — không đoán, chỉ đúng nơi biết lý do.",
          },
        ],
      ),
      game: [
        game(
          "Your machine says my card does not work. Why not?",
          "I am sorry, sir. Your bank can tell you the reason.",
          "Card bad, I think no money in card. You try other card.",
          "Maybe there is no money on it, sir. That happens a lot with travellers.",
          undefined,
          "Câu cuối đoán lý do — vừa có thể sai vừa làm khách xấu hổ. Câu đúng kín đáo và chỉ đúng nơi biết lý do.",
        ),
      ],
    }),

    L(30, 4, "End of Phase Three", "Kết thúc giai đoạn ba", {
      vocabulary: [
        c("Room preference", "Your room preference is a high floor away from the lift."),
        c("Luggage count", "The luggage count for your group is fifty bags."),
        c("Flight time", "What is your flight time, sir?"),
        c("Pet fee", "There is a pet fee because we deep clean the room after every pet."),
      ],
      grammar: [
        g(
          "Bags many.",
          "The luggage count is fifty bags, and the bellmen have all of them.",
          "'The luggage count' là một con số → 'is'.",
          "The luggage count are fifty bags, and the bellmen have all of them.",
        ),
        g(
          "You flight when?",
          "What time is your flight, sir? I will book the airport transfer.",
          "Câu hỏi: 'What time + is + chủ ngữ?' — động từ đứng trước chủ ngữ.",
          "What time your flight is, sir? I will book the airport transfer.",
        ),
      ],
      speaking: [
        risk(
          sp(
            "I am Mr Tan's wife. Which room is he in?",
            t4a,
            "Câu phải đúng: không cho số phòng, không xác nhận khách có ở đây — dù người hỏi nói là người nhà.",
            undefined,
            ["safety"],
          ),
        ),
        sp(
          "But I am his wife!",
          t4b,
          "Tuần 28: câu điều kiện 'If he is staying with us' — giúp mà không xác nhận gì.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "Fine. Tell him that Anna is in the lobby.",
          t4c,
          "Nhận lời nhắn, mời ngồi chờ. Không nói thêm gì về vị khách.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "I like a high floor away from the lift.",
          "I have noted your room preference, sir: a high floor away from the lift.",
          "Nhắc lại đúng yêu cầu để khách biết mình đã ghi đúng.",
        ),
        sp(
          "Our group has fifty bags. Will they all go up?",
          "Yes, madam. The luggage count is fifty, and the bellmen will take them up by six.",
          "Con số đã kiểm + người làm + mốc giờ.",
        ),
        sp(
          "Why do I have to pay extra for my small dog?",
          "There is a pet fee because we deep clean the room after every pet, sir.",
          "Tuần 24: phí + lý do thật.",
        ),
        sp(
          "Can you book a car to the airport for me?",
          "Of course, sir. What is your flight time?",
          "Hỏi điều cần biết trước khi hứa giờ xe đón.",
        ),
        sp(
          "Do you feel ready for busy shifts now?",
          "Yes. I feel confident, and I still ask my manager when I am not sure.",
          "Tự tin nhưng biết giới hạn của mình — câu chốt giai đoạn ba.",
          "manager",
        ),
      ],
      reading: read(
        `A woman at the desk says she is Mr Tan's wife and asks for his room number. Phong does not give it, and he does not say whether Mr Tan is staying. He says: "If he is staying with us, I can take a message for him." Later, Mr Tan comes down and meets her in the lobby.`,
        [
          {
            q: "Vì sao Phong không cho số phòng?",
            options: [
              "Vì Phong không biết",
              "Vì người phụ nữ không mang theo hộ chiếu",
              "Để bảo vệ an toàn của khách",
            ],
            correct: 2,
            explanation:
              "'Phong does not give it' — số phòng và việc khách có ở đây hay không đều là thông tin riêng, kể cả với người nói là người nhà.",
          },
          {
            q: "Phong đề nghị gì?",
            options: [
              "Đưa bà ấy lên phòng",
              "Nhận lời nhắn nếu ông Tan ở đây",
              "Gọi cảnh sát đến kiểm tra",
            ],
            correct: 1,
            explanation:
              "'If he is staying with us, I can take a message for him' — giúp được mà không xác nhận điều gì.",
          },
        ],
      ),
      game: [
        game(
          "I am his wife. Just tell me which room he is in.",
          "I am sorry, madam. I cannot tell you that, but I can take a message.",
          "Wife? Okay, no problem. Room 508, fifth floor, near the lift, you go.",
          "Of course, madam, you are his wife. He is in room 508, so please go straight up.",
          undefined,
          "Câu cuối tin lời người lạ và đưa số phòng — sai quyền riêng tư. Câu đúng từ chối lịch sự và đề nghị nhận lời nhắn.",
        ),
      ],
    }),
  ];
}

/** Front Office's Phase 3, week by week. */
export const FO_P3: Record<number, LessonContent[]> = {
  23: week23(),
  24: week24(),
  25: week25(),
  26: week26(),
  27: week27(),
  28: week28(),
  29: week29(),
  30: week30(),
};
