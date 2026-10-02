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
//    call you." The desk promises what it controls (who calls), never
//    another department's time. A wrong posting is corrected by a supervisor
//    after it is checked.
//  · Facts the desk quotes are the hotel's real ones: prices include VAT and
//    service charge; a move to a better room type costs the rate difference;
//    a guest is registered because the law asks it, not "because it is our
//    rule"; a room's ready time is what housekeeping says, passed on as theirs.
//  · Privacy: no room number is said out loud, given to anyone, or used to
//    confirm that somebody is staying; visitors wait in the lobby. A key card
//    is made only after a passport check. A card that fails is said quietly,
//    in the course's words from week 17 ("it did not go through"), with no
//    guess about why — "declined" is a word for colleagues.
//  · Safety goes to the people trained for it: the security officer for a
//    stranger trying doors, a guest shouting at the desk or a theft from a
//    safe; first aid and the duty manager for a guest who is unwell; the
//    emergency exit and never the lift when the alarm rings.
//  · An apology is for what the guest met, not a verdict on whose fault it
//    was. A promise carries a number: "within twenty minutes", "by eleven".
//  · The desk works with other teams in their own words: weeks 23-28 call
//    housekeeping, reservations, the bell desk, security, engineering and the
//    operator, and week 29 is talk between receptionists and up to the duty
//    manager. Every such turn is labelled colleague or manager.
//
// The turns marked `risk` are the hard cases above; the checkpoint's
// must-be-right draw comes from them, and each carries the other correct
// ways of saying it (`alsoAccept`) — first the wording weeks 1-22 taught.
// Cards keep the reviewed FO bank entries (kit.ts looks them up) because
// Phase 4 recycles them; the group week 26 lives here in short turns.
// ============================================================
import type { LessonContent } from "../week-content";
import { game, g, read, sp } from "../phase0";
import { cardsFor, lessonsFor, risk } from "./kit";

const c = cardsFor("FO");
const L = lessonsFor("FO");

// ── Week 23 — Recommending a room at the published price ────────────────
function week23(): LessonContent[] {
  const t1a = "I recommend the sea-view room, madam. It has a balcony and a lovely view.";
  const t1b = "It is forty dollars more per night, madam, with tax and service charge.";
  const t1c =
    "Then I recommend the deluxe room instead, madam. It is cheaper, and it is very quiet.";
  const t2a = "I recommend the junior suite, sir. It has a sitting area for your meetings.";
  const t2b = "The executive suite is bigger, sir, but it is also more expensive.";
  const t2c = "For small meetings, I recommend the junior suite. It is cheaper and big enough.";
  const t3a = "For your family, I recommend the family room, sir. It has two big beds.";
  const t3b = "The poolside room is closer to the pool, sir, but it is noisier in the day.";
  const t3c = "Then I recommend the family room on a higher floor, sir. It is quieter at night.";
  const t4a =
    "Of course, sir. The garden-view room is very comfortable, and it is much cheaper than the penthouse suite.";
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
          "Báo giá chênh lệch theo giá niêm yết, bằng con số, và nói rõ đã gồm thuế và phí phục vụ.",
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
          "Hi Nam. The sea-view room on the seventh floor is clean now.",
          "Thank you, Lan. I will give the sea-view room to Mr and Mrs Bauer.",
          "Nói với đồng nghiệp buồng phòng: cảm ơn, rồi báo phòng sẽ giao cho ai.",
          "colleague",
        ),
      ],
      reading: read(
        `Mr and Mrs Bauer arrive for their wedding anniversary. Nam recommends the sea-view room: "It has a balcony and a lovely view." Mrs Bauer asks about the price. Nam says it is forty dollars more per night, with tax and service charge. That is more than they want to spend, so Nam recommends the deluxe room instead. They choose it.`,
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
          "I recommend you the sea-view room, madam. It has lovely view.",
          "All our rooms are the same, madam, so you can take any room you like.",
          undefined,
          "Câu cuối không giúp khách chọn gì cả. Câu đúng gợi ý MỘT hạng phòng cụ thể và nêu một lý do.",
        ),
        game(
          "I will work in my room for two weeks. What do you suggest?",
          "I recommend the deluxe room, sir. It has a bigger desk than the standard room.",
          "I recommend the deluxe room, sir. It has a more big desk than the standard room.",
          "Any room is fine for work, sir.",
          undefined,
          "Câu cuối gạt nhu cầu của khách đi. Câu đúng gợi ý một hạng phòng và so sánh đúng điều khách cần: chỗ làm việc.",
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
              "Vì phía đường phố đang được sửa chữa",
              "Vì phía vườn rẻ hơn",
              "Vì phía vườn yên tĩnh hơn phía đường phố",
            ],
            correct: 2,
            explanation:
              "'wants a quiet room… the garden side, which is quieter than the street side' — lý do nằm ở nhu cầu của khách.",
          },
        ],
      ),
      game: [
        game(
          "Which is quieter, the street side or the garden side?",
          "The garden side is quieter, madam. It faces the garden.",
          "The garden side is more quiet, madam. It faces the garden.",
          "Both sides are fine, madam.",
          undefined,
          "Câu cuối né câu hỏi so sánh. Câu đúng trả lời đúng điều khách hỏi: phía nào yên tĩnh hơn.",
        ),
        game(
          "Is the executive suite worth the extra money?",
          "It is bigger than the junior suite, sir, but it is also more expensive.",
          "It is more bigger than the junior suite, sir, but it is also more expensive.",
          "Yes, sir, it is always worth it. Everybody who stays there loves it.",
          undefined,
          "Câu cuối chỉ chào hàng, không giúp khách so sánh. Câu đúng nói thật cả hai mặt: lớn hơn nhưng đắt hơn.",
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
          "The poolside room is more close to the pool, sir, but it is noisier.",
          "Yes, of course, sir. The children can swim there alone any time they like.",
          undefined,
          "Câu cuối hứa điều không an toàn (trẻ bơi một mình) và không so sánh gì. Câu đúng nêu cả lợi lẫn bất lợi để khách chọn.",
        ),
        game(
          "I love taking photos of the city at night.",
          "I recommend the top-floor room, madam. It has the best view of the city.",
          "I recommend the top-floor room, madam. It has the better view of the city.",
          "The city is quite far, madam.",
          undefined,
          "Câu cuối không giúp khách gì. Câu đúng nghe ra sở thích của khách và gợi ý đúng phòng.",
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
          "Khách chê đắt: chấp nhận, gợi ý phòng khác và so sánh giá. Không tự hạ giá.",
        ),
        risk({
          ...sp(
            "I stay here every month. Can you give me the penthouse at the same price?",
            t4b,
            "Câu thẩm quyền của tuần: lễ tân KHÔNG tự nâng hạng miễn phí. Từ chối lịch sự và nói ai quyết.",
            undefined,
            ["offer", "free", "upgrade", "manager"],
            t4a,
          ),
          alsoAccept: [
            "I am sorry, sir. I cannot offer a free upgrade, but I can ask my manager.",
            "I am sorry, I am not able to offer a free upgrade. I can ask the manager.",
            "I am afraid I cannot give you a free upgrade, sir. I will ask my manager.",
          ],
        }),
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
        `Mr Lindgren stays at the hotel every month. He likes the penthouse suite, but the price is too high for him. He asks Khoa for it at the same price. Khoa says politely that he cannot offer a free upgrade, but he can ask his manager. Mr Lindgren takes the garden-view room, and the manager calls him before six.`,
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
              "Phòng penthouse với giá phòng thường",
              "Phòng hướng vườn",
              "Chuyển sang một khách sạn khác",
            ],
            correct: 1,
            explanation:
              "'Mr Lindgren takes the garden-view room' — khách vẫn được phục vụ tốt dù không được nâng hạng miễn phí.",
          },
        ],
      ),
      game: [
        game(
          "I am a regular guest. Upgrade me to the suite for free.",
          "I am sorry, sir. I cannot offer a free upgrade, but I can ask my manager.",
          "I am sorry, sir. I cannot offering a free upgrade, but I can ask my manager.",
          "Of course, sir. You are a regular guest, so I will upgrade you now.",
          undefined,
          "Câu cuối tự cho nâng hạng miễn phí — vượt quyền lễ tân. Câu đúng từ chối lịch sự và chuyển cho quản lý.",
        ),
        game(
          "My mother uses a wheelchair. Which room is best for her?",
          "I recommend the accessible room, madam. It has a wide door.",
          "I recommend the accessible room, madam. It have a wide door.",
          "All our rooms have a lift nearby, madam, so any room will be fine for her.",
          undefined,
          "Câu cuối đoán thay cho khách. Câu đúng gợi ý đúng phòng cho người dùng xe lăn và nêu lý do.",
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
  const t3a =
    "The cancellation fee is one night, sir. The booking was cancelled on the day of arrival.";
  const t3b = "I am sorry, I cannot remove the charge. My manager can review it.";
  const t3c = "I will ask my manager to call you, sir. May I have your phone number?";
  const t4a =
    "Yes, sir. We need her passport too, because the law asks us to register every guest.";
  const t4b = "The guest registration rule is the law in Vietnam, sir, not a hotel rule.";
  const t4c = "Thank you, sir. Your key cards will be ready when you come back.";
  const v1 = "I am sorry, madam. Visitors have to wait in the lobby, for the safety of our guests.";
  const v2 = "May I have your friend's name, madam? I will call the room for you.";
  const v3 = "Thank you, madam. Please take a seat while I call.";
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
          "Of course, sir. There is a small charge: the rollaway bed fee is for each night.",
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
            options: ["Bằng giá một đêm phòng", "Miễn phí cho khách quen", "Một nửa giá phòng"],
            correct: 2,
            explanation:
              "'The fee is half the room price, and it is in the hotel policy' — lễ tân nêu đúng mức phí trong chính sách, không tự đặt ra.",
          },
        ],
      ),
      game: [
        game(
          "Can I stay in my room until three tomorrow?",
          "I can check, sir. There is a late check-out fee after twelve.",
          "I can check, sir. There are a late check-out fee after twelve.",
          "Of course, sir. Stay as long as you like.",
          undefined,
          "Câu cuối hứa trả phòng muộn miễn phí mà chưa kiểm tra phòng — vượt quyền và có thể sai. Câu đúng kiểm tra trước và báo có phí.",
        ),
        game(
          "Can my son sleep on an extra bed in our room?",
          "Of course, madam. There is a rollaway bed fee for each night.",
          "Of course, madam. There is a rollaway bed fee for each nights.",
          "Of course, madam. It is free because he is a child, so do not worry about it.",
          undefined,
          "Câu cuối tự cho miễn phí — lễ tân không bỏ phí. Câu đúng đồng ý và báo có phí theo chính sách.",
        ),
      ],
    }),

    L(24, 2, "Because — the Real Reason", "Nêu lý do thật bằng 'because'", {
      vocabulary: [
        c("Because", "There is a fee because we have to prepare the room again."),
        c("VAT", "The room price includes VAT and service charge.", [
          "/viː eɪ tiː/",
          "Thuế giá trị gia tăng",
          "🧾",
        ]),
        c("Minibar charge", "The minibar charge comes from the morning check."),
        c("No-show charge", "A no-show charge is for a booking when the guest does not arrive."),
      ],
      grammar: [
        g(
          "Rule is rule.",
          "We have to charge VAT because it is the law in Vietnam.",
          "'have to' + lý do THẬT sau 'because'. 'Vì đó là quy định' không phải là lý do.",
          "We have to charge VAT because of it is the law in Vietnam.",
        ),
        g(
          "You no come, you pay.",
          "There is a no-show charge because the room was ready for you.",
          "Giải thích phí bằng sự việc khách hiểu được, không trách khách. 'the room' số ít → 'was'.",
          "There is a no-show charge because the room were ready for you.",
        ),
      ],
      speaking: [
        risk({
          ...sp(
            "Why did you take money from my card when I checked in?",
            t2a,
            "Câu phải đúng của tuần: đó là tiền ĐẶT CỌC cho chi phí phát sinh, không phải tiền phòng.",
            undefined,
            ["deposit", "incidental", "charges"],
          ),
          alsoAccept: [
            "No, madam. It is a deposit for incidental charges.",
            "The deposit is for any incidental charges, madam.",
            "This deposit covers any incidental charges, madam.",
          ],
        }),
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
          "What is this extra tax on my bill?",
          "That is VAT, sir. We have to charge it because it is the law in Vietnam.",
          "Lý do thật: thuế theo luật, khách sạn thu hộ nhà nước.",
        ),
        sp(
          "I did not take anything from the minibar.",
          "The minibar charge comes from the morning check, madam. I will ask housekeeping to check it again.",
          "Không cãi, không tự xóa phí: nói phí từ đâu ra, rồi nhờ đúng bộ phận kiểm lại.",
        ),
        sp(
          "Housekeeping, this is Lan.",
          "Hi Lan, it is Nam at the front desk. Can you check the minibar in Room 512 again?",
          "Gọi nội bộ: xưng tên, bộ phận, rồi MỘT việc cụ thể kèm số phòng.",
          "colleague",
        ),
        sp(
          "We did not come last night, so why is there a no-show charge?",
          "There is a no-show charge because the room was ready for you all night, sir.",
          "Giải thích bằng sự việc, không trách khách.",
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
              "Ngay khi khách hỏi lại lễ tân",
              "Sau đúng một tháng",
              "Khi khách trả phòng, ngân hàng có thể mất vài ngày",
            ],
            correct: 2,
            explanation:
              "'the hotel releases it at check-out, and her bank may take a few days' — nói thật cả phần không thuộc khách sạn.",
          },
        ],
      ),
      game: [
        game(
          "There is a hold on my card. Did you charge me already?",
          "No, madam. It is a deposit for incidental charges.",
          "No, madam. It is a deposit for incidental charge.",
          "Yes, madam. We charge everything at check-in, so please do not worry.",
          undefined,
          "Câu cuối giải thích sai bản chất khoản tạm giữ — khách sẽ nghĩ đã bị thu tiền. Câu đúng nói rõ: đây là tiền đặt cọc cho chi phí phát sinh.",
        ),
        game(
          "Why do I pay more than the room price on the website?",
          "That is VAT, sir. We have to charge it because it is the law.",
          "That is VAT, sir. We have to charge it because it the law.",
          "It is a small hotel tax, sir.",
          undefined,
          "Câu cuối gọi sai tên khoản thuế và không nêu lý do. Câu đúng gọi đúng VAT và nêu lý do thật: luật.",
        ),
      ],
    }),

    L(24, 3, "Saying No Politely", "Từ chối lịch sự", {
      vocabulary: [
        c("Cancellation fee", "The cancellation fee is one night's room price."),
        c("Remove the charge", "I cannot remove the charge, but my manager can review it."),
        c("Rate difference", "You only pay the rate difference for the sea-view room.", [
          "/reɪt ˈdɪfrəns/",
          "Tiền chênh lệch giá phòng",
          "↕️",
        ]),
        c(
          "Early check-in fee",
          "There is an early check-in fee if you arrive before ten o'clock.",
          ["/ˈɜːli ˈtʃek ɪn fiː/", "Phí nhận phòng sớm", "🌅"],
        ),
      ],
      grammar: [
        g(
          "No. You pay.",
          "I am afraid I cannot remove the charge, madam. My manager can review it.",
          "'I am afraid I cannot…' từ chối lịch sự, rồi nói ai có quyền xem lại.",
          "I am afraid I cannot removing the charge, madam. My manager can review it.",
        ),
        g(
          "Early, you pay more.",
          "There is an early check-in fee because we have to prepare the room early.",
          "Giải thích phí bằng 'because' + việc thật khách sạn phải làm.",
          "There is an early check-in fee because we have to preparing the room early.",
        ),
      ],
      speaking: [
        sp(
          "I cancelled my second room this morning. Why is there a cancellation fee?",
          t3a,
          "Nêu mức phí và sự việc (hủy trong ngày đến) — không trách khách.",
        ),
        risk({
          ...sp(
            "That is not fair. Please remove the charge.",
            t3b,
            "Câu thẩm quyền: lễ tân KHÔNG tự bỏ phí. Từ chối lịch sự, nói rõ ai xem lại.",
            undefined,
            ["remove", "charge", "manager", "review"],
            t3a,
          ),
          alsoAccept: [
            "I am afraid I cannot remove the charge, sir. My manager can review it.",
            "I am sorry, I cannot remove the cancellation fee. The manager can review it.",
          ],
        }),
        sp(
          "So who decides, and when will I hear?",
          t3c,
          "Nói việc mình làm được (nhờ quản lý gọi), không hứa giờ thay quản lý.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "I lost my key card. Do I have to pay for a new one?",
          "No, sir, but may I see your passport first? Then I will make a new card.",
          "Mất thẻ phòng: kiểm tra hộ chiếu trước khi làm thẻ mới.",
        ),
        sp(
          "We want to change to a sea-view room. Is there a fee?",
          "You only pay the rate difference, madam: forty dollars more per night.",
          "Đổi sang hạng cao hơn: khách trả tiền chênh lệch giá, nói bằng con số.",
        ),
        sp(
          "Our flight lands at six in the morning. Can we check in then?",
          "Yes, if a room is ready, sir. There is an early check-in fee before ten o'clock.",
          "Báo điều kiện (phòng phải sẵn sàng) và phí, không hứa chắc.",
        ),
      ],
      reading: read(
        `Mr Silva cancels his second room on the day of arrival, and the cancellation fee is one night. He asks Hoa to remove the charge. Hoa cannot remove it herself, so she says: "My manager can review it." She asks the manager to call Mr Silva, and the manager explains the cancellation policy to him.`,
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
              "'Hoa cannot remove it herself… My manager can review it' — bỏ phí là quyết định về tiền, thuộc quản lý.",
          },
        ],
      ),
      game: [
        game(
          "Just take the cancellation fee off my bill, please.",
          "I am sorry, I cannot remove the charge. My manager can review it.",
          "I am sorry, I cannot removing the charge. My manager can review it.",
          "Of course, sir. I will take it off right now, and nobody needs to know.",
          undefined,
          "Câu cuối tự xóa phí và giấu chuyện đó — vượt quyền lễ tân. Câu đúng từ chối lịch sự và chuyển cho quản lý xem xét.",
        ),
        game(
          "I lost my key card. Can you make me a new one now?",
          "Of course, sir. May I see your passport first?",
          "Of course, sir. May I see you passport first?",
          "Of course, sir. Which room are you in? I will make it straight away.",
          undefined,
          "Câu cuối làm thẻ chỉ vì khách nói số phòng — ai cũng nói được số phòng. Câu đúng kiểm tra hộ chiếu trước.",
        ),
      ],
    }),

    L(24, 4, "Confirming the Rule", "Xác nhận quy định", {
      vocabulary: [
        c("No-smoking penalty", "Our policy has a no-smoking penalty for every room."),
        c("Guest registration rule", "The guest registration rule is the law in Vietnam."),
        c("Damage charge", "The duty manager checks the photos before any damage charge."),
      ],
      grammar: [
        g(
          "Passport. Give me.",
          "We have to register every guest because the law asks us to.",
          "'have to' + 'because' + lý do thật: luật yêu cầu đăng ký mọi khách, không chỉ người đặt.",
          "We have to register every guests because the law asks us to.",
        ),
        g(
          "You break, you pay.",
          "Housekeeping found a broken lamp. The manager will show you the photos first.",
          "Nói sự việc người khác đã thấy, không buộc tội. Phí hư hỏng luôn có ảnh và người có quyền kiểm tra.",
          "Housekeeping found a broken lamp. The manager will showing you the photos first.",
        ),
      ],
      speaking: [
        sp(
          "My wife is still in the car. Do you need her passport too?",
          t4a,
          "Xác nhận và nêu lý do thật: luật yêu cầu đăng ký MỌI khách trong phòng.",
        ),
        sp(
          "Why? Our booking is in my name.",
          t4b,
          "Không tranh luận: đây là luật, không phải quy định riêng của khách sạn.",
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
          "Housekeeping reported a broken lamp, madam. The manager will explain the damage charge.",
          "Sự việc + người có quyền giải thích. Không nói 'bạn làm vỡ'.",
        ),
        risk({
          ...sp(
            "I am visiting my friend in room 708. I will just go up.",
            v1,
            "Câu phải đúng: khách vãng lai không lên phòng. Mời chờ ở sảnh và nêu lý do an toàn.",
            undefined,
            ["visitors", "wait", "lobby", "safety", "guests"],
          ),
          alsoAccept: [
            "I am sorry, madam. Please wait in the lobby, for the safety of our guests.",
            "I am sorry, madam. Our visitor policy is simple. Please wait in the lobby.",
          ],
        }),
        sp(
          "But he is waiting for me upstairs!",
          v2,
          "Không xác nhận gì về khách; hỏi tên rồi tự gọi lên phòng.",
          undefined,
          undefined,
          v1,
        ),
        sp(
          "His name is Mr Lee.",
          v3,
          "Mời ngồi chờ trong lúc gọi — không nói số phòng, không cho lên.",
          undefined,
          undefined,
          v2,
        ),
      ],
      reading: read(
        `A couple checks in, but only Mr Wilson shows his passport. Quang explains that the law asks hotels to register every guest, so Mrs Wilson's passport is needed too. Mr Wilson goes back to the car for it. Quang does not argue about the rule. He prepares the key cards while he waits.`,
        [
          {
            q: "Vì sao Quang cần giấy tờ của bà Wilson?",
            options: [
              "Vì phòng đặt dưới tên bà Wilson",
              "Vì luật yêu cầu đăng ký mọi khách",
              "Vì bà Wilson muốn trả bằng thẻ của bà",
            ],
            correct: 1,
            explanation:
              "'the law asks hotels to register every guest' — lý do thật là luật, không phải 'quy định khách sạn'.",
          },
          {
            q: "Quang làm gì trong lúc chờ?",
            options: [
              "Tranh luận với khách về quy định",
              "Chuẩn bị thẻ phòng",
              "Gọi quản lý trực ra quầy",
            ],
            correct: 1,
            explanation:
              "'He prepares the key cards while he waits' — không tranh luận, dùng thời gian chờ cho việc có ích.",
          },
        ],
      ),
      game: [
        game(
          "Do you really need to see my husband's passport too?",
          "Yes, madam. The law asks us to register every guest in the room.",
          "Yes, madam. The law ask us to register every guest in the room.",
          "No, madam. One passport is enough.",
          undefined,
          "Câu cuối bỏ qua luật đăng ký lưu trú. Câu đúng xác nhận và nêu lý do thật: luật yêu cầu đăng ký mọi khách.",
        ),
        game(
          "My friend is in room 708. Can I just go up?",
          "I am sorry, madam. Visitors have to wait in the lobby, for the safety of our guests.",
          "I am sorry, madam. Visitors has to wait in the lobby, for the safety of our guests.",
          "Of course, madam. The lift is on your left.",
          undefined,
          "Câu cuối cho người lạ lên phòng chỉ vì họ nói số phòng. Câu đúng mời chờ ở sảnh và nêu lý do an toàn.",
        ),
      ],
    }),
  ];
}

// ── Week 25 — A promise with a number in it ─────────────────────────────
function week25(): LessonContent[] {
  const t1a = "I am sorry, madam. Housekeeping says your room will be ready within twenty minutes.";
  const t1b = "I understand. I will check with housekeeping straight away, madam.";
  const t1c =
    "Please take a seat in the lobby, madam. Would you like a welcome drink while you wait?";
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
    "Then the bellman will take you to your room, sir. You can show him your passport there.";
  const k3 = "The bellman will be here in two minutes, sir. Then I will reprogram your key card.";
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
          "Phòng chưa xong: xin lỗi, rồi báo mốc mà BUỒNG PHÒNG đưa ra — có con số, không tự hứa.",
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
          "Chỉ chỗ ngồi chờ và mời đồ uống chào mừng — việc lễ tân được làm khi khách phải chờ.",
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
          "Let me check with housekeeping, madam. They can prepare your room on a higher floor.",
          "Chưa chắc thì hỏi đúng bộ phận, và hẹn giờ trả lời bằng con số.",
        ),
        sp(
          "Can we wait for a sea-view room instead?",
          "Yes, madam. A sea-view room will be ready by one o'clock, and I will call you then.",
          "Ôn tuần 23: hạng phòng khách muốn + mốc giờ cụ thể.",
          undefined,
          ["sea", "view"],
        ),
      ],
      reading: read(
        `Mr and Mrs Grant land early, and their room is not ready. Housekeeping says twenty minutes, so Mai tells them that. They are very tired, so she checks with housekeeping straight away and offers them a seat and a welcome drink in the lobby. Eighteen minutes later, she calls them over: the room is ready.`,
        [
          {
            q: "Mai báo khách phòng sẵn sàng trong bao lâu?",
            options: [
              "Ngay lập tức, không phải chờ",
              "Hai mươi phút, theo buồng phòng",
              "Trước mười hai giờ trưa hôm đó",
            ],
            correct: 1,
            explanation:
              "'Housekeeping says twenty minutes, so Mai tells them that' — lễ tân báo mốc của bộ phận làm việc, không tự đặt ra.",
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
              "'she checks with housekeeping straight away and offers them a seat' — làm ngay việc của mình, không hứa điều chưa chắc.",
          },
        ],
      ),
      game: [
        game(
          "How long until our room is ready?",
          "Housekeeping says it will be ready within twenty minutes, madam.",
          "Housekeeping says it will ready within twenty minutes, madam.",
          "As soon as possible, madam.",
          undefined,
          "'As soon as possible' không phải lời hứa: khách không biết chờ đến bao giờ. Câu đúng báo mốc của buồng phòng bằng con số.",
        ),
        game(
          "The light in our bathroom is broken.",
          "I am sorry, sir. I will call engineering straight away.",
          "I am sorry, sir. I will calling engineering straight away.",
          "Please use the light near the bed tonight, sir. Someone can look at it tomorrow.",
          undefined,
          "Câu cuối để khách chịu đựng đến mai. Câu đúng xin lỗi và gọi đúng bộ phận ngay.",
        ),
      ],
    }),

    L(25, 2, "By Three O'clock", "Trước ba giờ", {
      vocabulary: [
        c("Going to", "We are going to send your bags up by three o'clock."),
        c("Send a bellman up", "I will send a bellman up for your bags in ten minutes."),
        c("Hold your luggage", "We can hold your luggage until your room is ready."),
        c("Update your booking", "I will update your booking by five o'clock today.", [
          "/ʌpˈdeɪt jɔː ˈbʊkɪŋ/",
          "Cập nhật lại đặt phòng",
          "📝",
        ]),
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
          "Bell desk, Tuan speaking.",
          "Hi Tuan, it is Nam. Please send a bellman up to Room 512 within ten minutes.",
          "Gọi nội bộ: MỘT việc, đúng phòng, và đúng mốc giờ mình vừa hứa với khách.",
          "colleague",
        ),
        sp(
          "We are staying two more nights. Can you change the dates?",
          "Let me check availability first, madam. Then I will update your booking by five o'clock.",
          "Kiểm tra phòng trống TRƯỚC, rồi mới hứa cập nhật — kèm mốc giờ.",
        ),
        sp(
          "We are going to leave at three tomorrow. What will that cost?",
          "The late check-out fee is half the room price, sir. I will confirm it by eleven.",
          "Ôn tuần 24: phí trả phòng muộn theo chính sách, rồi hứa giờ xác nhận.",
          undefined,
          ["late", "check", "out", "fee"],
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
              "Vì gia đình muốn trả phòng sớm",
              "Vì phòng của gia đình chưa sẵn sàng",
              "Vì xe đưa đón đến trễ",
            ],
            correct: 1,
            explanation:
              "'their room is not ready' — lễ tân đưa ngay việc mình làm được để khách không phải chờ.",
          },
        ],
      ),
      game: [
        game(
          "We are going out. Will our bags go up before we come back?",
          "Yes, madam. We are going to send them up by three o'clock.",
          "Yes, madam. We going to send them up by three o'clock.",
          "I hope so, madam.",
          undefined,
          "Câu cuối không cho khách một mốc nào. Câu đúng dùng 'going to' + mốc giờ cụ thể.",
        ),
        game(
          "Can we stay two more nights here?",
          "Let me check availability first, madam. Then I will update your booking.",
          "Let me check availability first, madam. Then I will updating your booking.",
          "Of course, madam. I will change it now, no problem at all.",
          undefined,
          "Câu cuối hứa trước khi biết còn phòng hay không. Câu đúng kiểm tra phòng trống rồi mới cập nhật.",
        ),
      ],
    }),

    L(25, 3, "Keeping the Guest Informed", "Báo tin cho khách", {
      vocabulary: [
        c("Confirm your late check-out", "I will confirm your late check-out by eleven o'clock."),
        c("Book your airport transfer", "I can book your airport transfer for six o'clock."),
        c("Arrange a taxi", "I will arrange a taxi for you in ten minutes."),
        c("Express check-out", "With express check-out, you leave your key card in the box.", [
          "/ɪkˈspres ˈtʃek aʊt/",
          "Trả phòng nhanh",
          "🏃",
        ]),
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
          "Our taxi is at five tomorrow morning. Must we stop at the desk?",
          "No, sir. With express check-out, I will email your invoice by nine o'clock.",
          "Trả phòng nhanh: nói khách không cần làm gì, và khi nào nhận hóa đơn.",
        ),
        sp(
          "Please call me when you know about the late check-out.",
          "Of course, madam. I will call your room by eleven o'clock with the answer.",
          "Khách đang chờ tin: hứa giờ báo, và báo ĐÚNG tin khách đang chờ.",
        ),
        sp(
          "Can we move to the junior suite tomorrow?",
          "Yes, sir. You only pay the rate difference, and I will confirm the room by ten.",
          "Ôn tuần 24: tiền chênh lệch giá, rồi hứa giờ xác nhận.",
          undefined,
          ["rate", "difference"],
        ),
      ],
      reading: read(
        `Ms Rossi asks to check out at four. Thanh cannot confirm it yet, because it depends on tomorrow's arrivals. He promises to confirm the late check-out by eleven o'clock. Her flight is at nine at night, so Thanh also books her airport transfer for six. At half past ten, he calls her room: four o'clock is confirmed.`,
        [
          {
            q: "Vì sao Thanh chưa xác nhận được trả phòng lúc bốn giờ?",
            options: [
              "Vì quản lý không cho phép",
              "Vì khách chưa trả tiền đặt cọc",
              "Vì còn tùy vào lượng khách đến ngày mai",
            ],
            correct: 2,
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
          "Yes, madam. I will call to your room by eleven o'clock.",
          "Please ask again later, madam.",
          undefined,
          "Câu cuối đẩy việc hỏi lại sang khách. Câu đúng nhận việc báo tin, kèm mốc giờ.",
        ),
        game(
          "We leave very early tomorrow. Do we have to come to the desk?",
          "No, sir. With express check-out, I will email your invoice by nine.",
          "No, sir. With express check-out, I will email you invoice by nine.",
          "Yes, sir. Every guest has to stop at the desk and sign the bill before leaving.",
          undefined,
          "Câu cuối bỏ qua dịch vụ trả phòng nhanh mà khách được dùng. Câu đúng nói rõ khách không phải chờ và khi nào nhận hóa đơn.",
        ),
      ],
    }),

    L(25, 4, "When You Cannot Keep the Promise", "Khi không giữ được lời hứa", {
      vocabulary: [
        c("Check the room status", "I will check the room status on the system now."),
        c("Deliver your message", "I will deliver your message to your colleague before six."),
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
        risk({
          ...sp(
            "My key card does not work. I am in room 508. Just make me a new one.",
            k1,
            "Câu phải đúng của tuần: KHÔNG làm thẻ khi chưa kiểm tra hộ chiếu, dù khách nói đúng số phòng.",
            undefined,
            ["check", "passport", "first"],
          ),
          alsoAccept: [
            "Of course, sir. May I see your passport first?",
            "May I see your passport first, sir?",
            "Of course, sir. I will check your passport first.",
          ],
        }),
        risk({
          ...sp(
            "My passport is in the room. I am in a hurry.",
            k2,
            "Vẫn không làm thẻ khi chưa thấy giấy tờ: nhân viên hành lý đưa khách lên, khách cho xem hộ chiếu ở phòng.",
            undefined,
            ["bellman", "take", "room", "show", "passport"],
            k1,
          ),
          alsoAccept: [
            "Then a bellman will go with you to the room, sir. You can show him your passport there.",
            "Then the bellman will take you up, sir. Please show him your passport in the room.",
          ],
        }),
        sp(
          "Fine. When can the bellman come?",
          k3,
          "Hứa có con số, rồi nói bước tiếp theo.",
          undefined,
          undefined,
          k2,
        ),
        sp(
          "Can you give this message to my colleague? She is staying here too.",
          "Of course, madam. May I have your colleague's name, so I can deliver your message?",
          "Nhận lời nhắn theo TÊN khách, không theo số phòng — và không nói to số phòng.",
        ),
        sp(
          "The airport car is twenty minutes late. My flight is soon!",
          "I am very sorry, sir. A taxi can be here within ten minutes instead.",
          "Ôn tuần 23: đưa phương án thay thế bằng 'instead', kèm mốc giờ.",
          undefined,
          ["taxi", "instead"],
        ),
      ],
      reading: read(
        `Mrs Kato was told twenty minutes for her room, but forty minutes pass. Son apologises and checks the room status straight away. He gives her a new time for the same room: ten minutes. Then he brings the key cards to her in the lobby himself. He does not offer her a different service instead.`,
        [
          {
            q: "Sơn làm gì khi trễ hẹn?",
            options: [
              "Mời khách ăn trưa miễn phí",
              "Nói buồng phòng thiếu người",
              "Xin lỗi và đưa mốc mới cho đúng việc đó",
            ],
            correct: 2,
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
          "I am very sorry, madam. Your room will be ready within ten minute.",
          "I am so sorry, madam. Would you like to look at a different room type instead?",
          undefined,
          "Câu cuối đổi sang việc khác thay vì giữ đúng việc khách đang chờ. Câu đúng xin lỗi và đưa mốc mới cho đúng căn phòng đó.",
        ),
        game(
          "I am in room 508. I lost my key. Please make a new one.",
          "Of course, sir. May I check your passport first?",
          "Of course, sir. May I checking your passport first?",
          "Of course, sir. Here is your new key for that room.",
          undefined,
          "Câu cuối làm thẻ chỉ vì khách nói số phòng. Câu đúng kiểm tra hộ chiếu trước.",
        ),
      ],
    }),
  ];
}

// ── Week 26 — A group arrives: one request, one owner ───────────────────
function week26(): LessonContent[] {
  const t1a =
    "Thank you, madam. There is a small discrepancy: our booking shows twenty-four rooms.";
  const t1b =
    "Let me check with reservations now. You are our point of contact, so I will update you.";
  const t1c =
    "Your group can start checking in now, madam. I will sort out the last room with reservations.";
  const p1 = "I am sorry, I cannot tell you room numbers. I can take a message, sir.";
  const p2 = "I am sorry, sir. For the safety of our guests, I cannot tell you that.";
  const p3 = "Of course, sir. I will write your message down now.";
  const t2a = "Of course, madam. We have prepared an express check-in for your group.";
  const t2b = "I will ask the bellmen to take the bags to each room within thirty minutes.";
  const t2c = "Please put a luggage tag on each bag, madam. I will coordinate with the bell desk.";
  const t3a = "Yes, you can swap rooms, sir. Let me check with housekeeping first.";
  const t3b = "Of course, sir. I can split the bill, so each of you pays for your own room.";
  const t3c = "I will reprogram both key cards and adjust the rooming list, sir.";
  const s1 = "Thank you, madam. I will ask security to check that floor now.";
  const s2 = "Please wait in your room, madam. The security officer will call you.";
  const s3 = "He will be on your floor within five minutes, madam.";
  const t4a =
    "Of course, madam. I have a short announcement: group breakfast starts at seven o'clock.";
  const t4b = "The shuttle bus departure time is eight o'clock, from the main lobby.";
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
          "Không nói danh sách của khách sai. Nêu điều mình thấy bằng một từ trung tính.",
        ),
        sp(
          "Will that take long? Everyone is very tired.",
          t1b,
          "'Let me check with' đúng bộ phận, và nói ai là người mình sẽ báo lại.",
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
        sp(
          "Reservations, Mai speaking.",
          "Hi Mai, it is Nam at the desk. Can you check the Sunrise rooming list with me?",
          "Gọi nội bộ: xưng tên, bộ phận, rồi MỘT việc cụ thể.",
          "colleague",
        ),
        sp(
          "When will the last room be ready?",
          "Housekeeping says it will be ready within thirty minutes, madam.",
          "Ôn tuần 25: báo mốc của bộ phận làm việc bằng 'within' + con số.",
          undefined,
          ["within"],
        ),
        risk({
          ...sp(
            "I am a friend of Mr Kim from the Sunrise group. What is his room number?",
            p1,
            "Quyền riêng tư: KHÔNG cho số phòng của khách, dù người hỏi biết tên và tên đoàn. Đề nghị nhận lời nhắn.",
            undefined,
            ["room", "numbers", "take", "message"],
          ),
          alsoAccept: [
            "I am afraid I cannot give a room number, sir. I can take a message.",
            "I am sorry, I cannot tell you his room number. I can take a message, sir.",
            "I am sorry, sir, I cannot give out room numbers. I can take a message.",
          ],
        }),
        risk({
          ...sp(
            "Can you at least tell me if he is staying here?",
            p2,
            "Cũng không xác nhận khách có ở khách sạn hay không — nói lý do an toàn, không nói 'có' hay 'không'.",
            undefined,
            ["safety", "guests"],
            p1,
          ),
          alsoAccept: [
            "I am sorry, sir. For the privacy and safety of our guests, I cannot tell you that.",
            "I am afraid I cannot tell you that, sir, for the safety of our guests.",
          ],
        }),
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
        `Ms Hanh, the tour leader, gives Quan the rooming list for the Sunrise group: twenty-five rooms. The hotel booking shows twenty-four. Quan does not say the list is wrong. He says: "There is a small discrepancy. Let me check with reservations." Ms Hanh is the point of contact, so he promises to update her. The group starts checking in at once. Soon after, reservations finds the last room under a different date, and Quan tells Ms Hanh the good news.`,
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
            q: "Phòng còn thiếu nằm ở đâu?",
            options: [
              "Trong đặt phòng, nhưng ghi sai ngày",
              "Ở một khách sạn khác của cùng công ty",
              "Trong danh sách của trưởng đoàn",
            ],
            correct: 0,
            explanation:
              "'reservations finds the last room under a different date' — lỗi nằm ở ngày, không phải ở danh sách của khách.",
          },
          {
            q: "Vì sao Quân cho cả đoàn nhận phòng trước khi tìm xong phòng còn thiếu?",
            options: [
              "Vì trưởng đoàn đòi nhận phòng ngay",
              "Để cả đoàn không phải chờ chỉ vì một phòng",
              "Vì phòng thứ hai mươi lăm đã sẵn sàng từ sáng",
            ],
            correct: 1,
            explanation:
              "Suy luận: hai mươi bốn phòng đã khớp, nên làm phần đã khớp trước; phòng còn lại do bộ phận đặt phòng kiểm tra.",
          },
        ],
      ),
      game: [
        game(
          "Your system says twenty-four rooms? Our list says twenty-five!",
          "There is a small discrepancy, madam. Let me check with reservations.",
          "There is a small discrepancy, madam. Let me checking with reservations.",
          "Our system is always right, madam, so your travel agent's list must be wrong.",
          undefined,
          "Câu cuối đổ lỗi cho khách trước khi kiểm tra. Câu đúng nêu vấn đề trung tính và nói ai sẽ kiểm tra.",
        ),
        game(
          "Which room is Mr Kim from the Sunrise group in?",
          "I am sorry, I cannot tell you room numbers. I can take a message, sir.",
          "I am sorry, I cannot telling you room numbers. I can take a message, sir.",
          "He is on the fifth floor, sir, near the lift.",
          undefined,
          "Câu cuối cho người lạ biết khách ở đâu. Câu đúng giữ quyền riêng tư và đề nghị nhận lời nhắn.",
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
          "Bell desk, Tuan here.",
          "Hi Tuan, the Sunrise group has fifty bags. Can you take them up within thirty minutes?",
          "Gọi nội bộ: con số cụ thể + MỘT việc + mốc giờ.",
          "colleague",
        ),
        sp(
          "My name is not on any key packet.",
          "Let me check with your tour leader, sir. Your key packet may have your company name.",
          "Hỏi đúng đầu mối của đoàn, không đoán tên.",
        ),
        sp(
          "Some of us want to go to the beach before the rooms are ready.",
          "Of course. We can hold your luggage until your rooms are ready.",
          "Ôn tuần 25: việc lễ tân làm được ngay — giữ hành lý.",
          undefined,
          ["hold", "luggage"],
        ),
      ],
      reading: read(
        `The Sunrise group arrives at two, with a meeting at half past two. The day before, Lan prepared an express check-in: a key packet with each guest's name. When the coach arrives at the hotel, she gives each guest a luggage tag. Then she calls the bell desk and asks the bellmen to take the bags up within thirty minutes. By twenty past two, everyone is in the meeting room, and the bags are on their way.`,
        [
          {
            q: "Lan chuẩn bị gì trước khi đoàn đến?",
            options: [
              "Bộ thẻ phòng có tên từng khách",
              "Phòng họp lúc hai rưỡi",
              "Bữa trưa nhẹ cho cả đoàn trong phòng họp",
            ],
            correct: 0,
            explanation:
              "'Lan prepared an express check-in: a key packet with each guest's name' — chuẩn bị trước để đoàn không phải xếp hàng.",
          },
          {
            q: "Lan nhờ ai đưa hành lý lên phòng?",
            options: ["Trưởng đoàn", "Nhân viên hành lý", "Chính các khách trong đoàn"],
            correct: 1,
            explanation:
              "'asks the bellmen to take the bags up within thirty minutes' — giao việc cho đúng người, kèm mốc giờ.",
          },
          {
            q: "Thứ tự công việc của Lan là gì?",
            options: [
              "Gọi tổ hành lý trước, rồi chuẩn bị thẻ phòng, rồi phát thẻ hành lý",
              "Phát thẻ hành lý, rồi chuẩn bị thẻ phòng, rồi gọi tổ hành lý",
              "Chuẩn bị thẻ phòng, rồi phát thẻ hành lý, rồi gọi tổ hành lý",
            ],
            correct: 2,
            explanation:
              "'The day before… When the coach arrives… Then she calls the bell desk' — chuẩn bị từ hôm trước, phát thẻ khi đoàn đến, rồi mới giao việc cho tổ hành lý.",
          },
        ],
      ),
      game: [
        game(
          "We have fifty bags. Who takes them up to the rooms?",
          "I will ask the bellmen to take them up within thirty minutes, madam.",
          "I will ask the bellmen take them up within thirty minutes, madam.",
          "Your guests can take their own bags up in the lift, madam. It is much quicker.",
          undefined,
          "Câu cuối đẩy việc sang khách. Câu đúng nói rõ ai làm và trong bao lâu.",
        ),
        game(
          "Where are the room keys for our group?",
          "Each key packet is ready, sir, with the guest's name on it.",
          "Each key packet are ready, sir, with the guest's name on it.",
          "Please wait here, sir. I will make the keys one by one now.",
          undefined,
          "Câu cuối bỏ qua việc đã chuẩn bị sẵn, bắt cả đoàn chờ. Câu đúng chỉ ra bộ thẻ đã có tên từng khách.",
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
          "Đồng ý điều trong quyền mình, nhưng hỏi đúng bộ phận trước: hai phòng phải sẵn sàng.",
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
        sp(
          "My company pays for the room. Can my minibar go on a separate bill?",
          "Yes, sir. I can split the bill, and the minibar charge goes on your own bill.",
          "Ôn tuần 24: tên khoản phí, và nó đi vào hóa đơn nào.",
          undefined,
          ["minibar", "charge"],
        ),
        risk({
          ...sp(
            "A man is walking along our floor and trying the doors.",
            s1,
            "Người lạ thử cửa phòng: lễ tân KHÔNG tự lên xem. Giao ngay cho an ninh.",
            undefined,
            ["security", "floor"],
          ),
          alsoAccept: [
            "I will ask the security officer to check your floor now, madam.",
            "Thank you, madam. I am calling the security officer now.",
            "Thank you, madam. I will ask the security officer to check that floor now.",
          ],
        }),
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
        sp(
          "Security, this is Hung.",
          "Hi Hung, it is Nam at the desk. A guest on five reports a man trying the doors.",
          "Gọi nội bộ: ai gọi, ở đâu, chuyện gì — ngắn, đủ để an ninh đi ngay.",
          "colleague",
        ),
      ],
      reading: read(
        `At eleven at night, a guest calls Bao: a man is walking along the fifth floor and trying the doors. Bao does not go up himself. He tells the guest to wait in her room, and he asks the security officer to check that floor. Within five minutes the officer is there. The man was looking for his own room, but he had the wrong floor. Bao writes the call in the log for the next shift.`,
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
              "'he asks the security officer to check that floor' — một việc an ninh, giao đúng người có chuyên môn.",
          },
          {
            q: "Cuối cùng người đàn ông đó là ai?",
            options: [
              "Một kỹ thuật viên đang đi kiểm tra các ổ khóa",
              "Một vị khách đi nhầm tầng",
              "Một người giao đồ ăn",
            ],
            correct: 1,
            explanation:
              "'looking for his own room, but he had the wrong floor' — lần này không có gì nguy hiểm.",
          },
          {
            q: "Vì sao Bảo vẫn gọi an ninh dù cuối cùng không có gì nguy hiểm?",
            options: [
              "Vì lúc khách gọi, chưa ai biết người đó là ai",
              "Vì an ninh vẫn phải đi kiểm tra mọi tầng mỗi đêm",
              "Vì khách đòi gặp quản lý",
            ],
            correct: 0,
            explanation:
              "Suy luận: lễ tân không thể biết trước người đó vô hại hay không — nên giao cho an ninh, và ghi vào sổ.",
          },
        ],
      ),
      game: [
        game(
          "There is a strange man on my floor. Can you come up and see?",
          "I will ask the security officer to check your floor now, madam.",
          "I will ask the security officer to checking your floor now, madam.",
          "Do not worry, madam. He is probably a guest.",
          undefined,
          "Câu cuối đoán thay vì kiểm tra — có thể bỏ qua một mối nguy thật. Câu đúng giao việc cho an ninh ngay.",
        ),
        game(
          "Can my colleague and I pay for our rooms separately?",
          "Of course, sir. I can split the bill for you.",
          "Of course, sir. I can splits the bill for you.",
          "No, sir. A group always has one bill for everyone, I am afraid.",
          undefined,
          "Câu cuối từ chối một việc lễ tân làm được. Câu đúng đồng ý tách hóa đơn.",
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
          "Mở đầu thông báo cho cả đoàn, rồi nêu giờ bằng con số.",
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
        sp(
          "Operator, this is Thu.",
          "Hi Thu. Please call every Sunrise room at six-thirty tomorrow morning.",
          "Gọi nội bộ: MỘT việc, đúng nhóm phòng, đúng giờ.",
          "colleague",
        ),
        sp(
          "Two of our guests have to leave before the shuttle bus.",
          "I can arrange a taxi for them at seven o'clock, madam.",
          "Ôn tuần 25: việc lễ tân làm được, kèm giờ.",
          undefined,
          ["taxi"],
        ),
        risk({
          ...sp(
            "I cannot find my passport anywhere! I fly home tomorrow.",
            q1,
            "Mất hộ chiếu: xin lỗi, hỏi buồng phòng, và báo quản lý trực NGAY. Lễ tân không tự giải quyết.",
            undefined,
            ["housekeeping", "tell", "duty", "manager"],
          ),
          alsoAccept: [
            "I am very sorry, sir. I will check with housekeeping and call the duty manager now.",
            "I am sorry, sir. I will tell the duty manager now and check with housekeeping.",
          ],
        }),
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
        `Mr Becker cannot find his passport anywhere, and he flies home early tomorrow. First, Nga checks with housekeeping. The passport is not in the room or the restaurant, so she tells the duty manager straight away. The duty manager helps Mr Becker with the police report and calls his embassy. Nga gives him a copy of the passport scan from check-in. In the evening, she writes everything in the log, so the night team knows the story.`,
        [
          {
            q: "Nga làm gì đầu tiên?",
            options: [
              "Tự gọi điện cho đại sứ quán của khách ngay lập tức",
              "Hỏi buồng phòng",
              "Khuyên khách đổi vé máy bay",
            ],
            correct: 1,
            explanation:
              "'First, Nga checks with housekeeping' — tìm ở đúng chỗ trước, rồi mới báo người có quyền.",
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
          {
            q: "Vì sao Nga ghi mọi việc vào sổ buổi tối?",
            options: [
              "Để ca đêm biết chuyện nếu khách hỏi lại",
              "Vì quản lý trực không nhớ được",
              "Để tính phí cho khách",
            ],
            correct: 0,
            explanation:
              "Suy luận: 'so the night team knows the story' — việc chưa xong phải được bàn giao, khách không phải kể lại từ đầu.",
          },
        ],
      ),
      game: [
        game(
          "What time does the bus leave tomorrow, and from where?",
          "The shuttle bus departure time is eight o'clock, from the main lobby.",
          "The shuttle bus departure time are eight o'clock, from the main lobby.",
          "Around eight, I think. Ask the driver.",
          undefined,
          "Câu cuối không chắc chắn và đẩy việc sang khách. Câu đúng nêu rõ giờ khởi hành và điểm đón.",
        ),
        game(
          "I lost my passport, and I fly home tomorrow!",
          "I am very sorry, sir. I will check with housekeeping and tell the duty manager now.",
          "I am very sorry, sir. I will checking with housekeeping and tell the duty manager now.",
          "Please go to your embassy, sir. Hotels cannot help with passports.",
          undefined,
          "Câu cuối đẩy khách đi một mình. Câu đúng tìm ở đúng chỗ và báo ngay người có quyền giúp.",
        ),
      ],
    }),
  ];
}

// ── Week 27 — Receiving a complaint ─────────────────────────────────────
function week27(): LessonContent[] {
  const t1a = "I apologise for the long wait, madam. Two hours is far too long.";
  const t1b = "I am sorry nobody updated you, madam. Let me check your room right now.";
  const t1c = "I understand, madam. Housekeeping says your room will be ready in ten minutes.";
  const t1d =
    "I will check it myself and bring your keys, madam. I apologise for the inconvenience.";
  const t2a = "I am sorry, sir. Let me check the double charge with my supervisor now.";
  const t2b =
    "I cannot change the bill myself, sir. If it is a mistake, my supervisor will correct it.";
  const t2c = "I understand you are disappointed, sir. I will bring you the new bill myself.";
  const t3a = "I am very sorry, sir. Is it the air conditioner, or something outside?";
  const t3b =
    "Thank you, sir. I will ask engineering to check the air-conditioning noise within fifteen minutes.";
  const t3c = "I am sorry about your night, sir. I will tell the duty manager this morning.";
  const t4a = "Please bring him to this seat, madam. I am calling first aid now.";
  const t4b = "The duty manager is coming now, madam. She will help you decide.";
  const t4c = "Of course, madam. I will stay with you until they arrive.";
  const o1 = "I am very sorry, madam. I am calling the duty manager now.";
  const o2 = "The duty manager will look after you tonight, madam. Please take a seat.";
  return [
    L(27, 1, "Listen First", "Lắng nghe trước", {
      vocabulary: [
        c("Concern", "Thank you for telling me about your concern, madam."),
        c("Apologise", "I apologise for the long wait, sir."),
        c("Inconvenience", "I apologise for the inconvenience, madam.", [
          "/ˌɪnkənˈviːniəns/",
          "Sự bất tiện, phiền toái",
          "😣",
        ]),
        c("Noisy corridor", "Security checks the noisy corridor at night."),
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
          "Công nhận cảm xúc, rồi báo mốc của buồng phòng bằng con số — không tự hứa.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "Ten minutes. Will it really be ready this time?",
          t1d,
          "Không hứa thêm lần nữa: tự kiểm tra, tự mang chìa khóa, và xin lỗi về sự bất tiện.",
          undefined,
          undefined,
          t1c,
        ),
        sp(
          "The corridor was very noisy last night. People were shouting at two in the morning.",
          "Thank you for telling me, sir. I will ask security to check the noisy corridor tonight.",
          "Cảm ơn khách đã báo, rồi nói ai sẽ xử lý và khi nào.",
        ),
        sp(
          "I have something to tell you, but you will not like it.",
          "Of course, madam. Please tell me your concern.",
          "Mời khách nói hết — chưa giải thích, chưa bào chữa.",
        ),
        sp(
          "There is a minibar charge, but we never opened the minibar!",
          "I understand, sir. I will ask housekeeping to check the minibar charge again.",
          "Ôn tuần 24: không cãi, không tự xóa phí — nhờ đúng bộ phận kiểm lại.",
          undefined,
          ["minibar", "charge"],
        ),
      ],
      reading: read(
        `The Moreau family arrived at two, but at four their room is still not ready. Nobody has called them. Hieu listens without stopping them. He apologises for the long wait and says he is sorry nobody updated them. He does not blame housekeeping. He checks the room, and housekeeping says ten more minutes. Hieu passes that on, offers the family a seat, and brings the keys himself when the room is ready. Later, Hieu tells his supervisor about the delay.`,
        [
          {
            q: "Hiếu làm gì đầu tiên?",
            options: [
              "Giải thích lý do chậm",
              "Lắng nghe, không ngắt lời khách",
              "Gọi quản lý trực xuống ngay",
            ],
            correct: 1,
            explanation:
              "'Hieu listens without stopping them' — bước đầu của tiếp nhận phàn nàn là nghe hết.",
          },
          {
            q: "Hiếu xin lỗi về điều gì?",
            options: [
              "Về việc bộ phận buồng phòng làm việc quá chậm hôm đó",
              "Về thời tiết xấu",
              "Về việc chờ lâu và không ai báo",
            ],
            correct: 2,
            explanation:
              "'apologises for the long wait and… nobody updated them' — xin lỗi đúng hai điều khách gặp, không đổ cho bộ phận nào.",
          },
          {
            q: "Vì sao Hiếu không đổ lỗi cho buồng phòng?",
            options: [
              "Vì buồng phòng không có lỗi gì",
              "Vì đổ lỗi không giúp khách, và chưa ai kiểm tra lỗi do đâu",
              "Vì quản lý cấm nhắc tên bộ phận khác",
            ],
            correct: 1,
            explanation:
              "Suy luận: 'He does not blame housekeeping' — khách cần phòng, không cần biết lỗi của ai; nguyên nhân để kiểm tra sau.",
          },
        ],
      ),
      game: [
        game(
          "We have been waiting for two hours. Two hours!",
          "I apologise for the long wait, madam. I will check your room now.",
          "I apologise for the long wait, madam. I will checking your room now.",
          "Housekeeping is very slow today, madam. It is really their fault, not ours.",
          undefined,
          "Câu cuối đổ lỗi cho đồng nghiệp trước mặt khách. Câu đúng xin lỗi về điều khách gặp và làm ngay.",
        ),
        game(
          "I need to tell you about a problem with my room.",
          "Of course, sir. Please tell me your concern.",
          "Of course, sir. Please tell me you concern.",
          "Sorry, sir, I am busy now. Please write it on a card for the manager.",
          undefined,
          "Câu cuối gạt khách đi. Câu đúng mời khách nói hết ngay.",
        ),
      ],
    }),

    L(27, 2, "A Real Apology", "Lời xin lỗi thật", {
      vocabulary: [
        c("Disappointed", "I understand you are disappointed, sir."),
        c("Double charge", "I can see a double charge for your dinner on the bill."),
        c("Wrong room rate", "If it is a wrong room rate, my supervisor will correct it."),
        c("Long check-in queue", "There was a long check-in queue at two o'clock."),
      ],
      grammar: [
        g(
          "Our mistake.",
          "I am sorry you had to wait in a long check-in queue, madam.",
          "Xin lỗi về điều khách ĐÃ gặp ('you had to wait'). Chưa ai kiểm tra thì không nói 'It was our mistake'.",
          "I am sorry you had to waiting in a long check-in queue, madam.",
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
          "Lễ tân không tự sửa hóa đơn: nói rõ điều kiện và ai sửa.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "I am really disappointed with this hotel.",
          t2c,
          "Công nhận cảm xúc, rồi hứa một việc mình tự làm. Không tranh luận.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "The room rate on my bill is higher than my booking.",
          "Let me check your booking now, madam. If it is a wrong room rate, my supervisor will correct it.",
          "Kiểm tra trước, không thừa nhận sai trước khi xem. Nói rõ ai sửa nếu đúng là sai.",
        ),
        sp(
          "Why was the check-in queue so long? I waited forty minutes.",
          "Two groups arrived together, so there was a long check-in queue. I am sorry you waited, sir.",
          "Nêu lý do thật, không đổ lỗi cho ai, rồi xin lỗi về điều khách gặp.",
        ),
        sp(
          "My booking has the wrong dates on it.",
          "I am sorry, madam. I will update your booking now and email you.",
          "Ôn tuần 25: việc lễ tân làm được ngay, kèm cách khách nhận xác nhận.",
          undefined,
          ["update", "booking"],
        ),
      ],
      reading: read(
        `Mr Jensen finds his dinner from Friday twice on his bill. Tam apologises and checks the double charge with her supervisor. She does not say "It was our mistake" yet, because nobody has checked how it happened. She cannot change the bill herself. The supervisor finds that the restaurant sent the dinner twice, and corrects the bill. Tam brings the new bill to Mr Jensen's room and thanks him for his patience. Mr Jensen says it was handled well.`,
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
              "Bộ phận nhà hàng của khách sạn",
              "Giám sát của Tâm",
            ],
            correct: 2,
            explanation:
              "'The supervisor… corrects the bill' — sửa hóa đơn là việc của giám sát, lễ tân chuyển đúng người.",
          },
          {
            q: "Thứ tự đúng của các việc là gì?",
            options: [
              "Tâm xin lỗi, giám sát kiểm tra, rồi hóa đơn được sửa",
              "Hóa đơn được sửa, rồi Tâm xin lỗi, rồi giám sát kiểm tra",
              "Giám sát sửa hóa đơn trước khi khách biết",
            ],
            correct: 0,
            explanation:
              "'Tam apologises and checks… The supervisor finds… and corrects' — xin lỗi ngay, kiểm tra, rồi người có quyền mới sửa.",
          },
        ],
      ),
      game: [
        game(
          "You charged my dinner twice. How did that happen?",
          "I am sorry, sir. Let me check the double charge now.",
          "I am sorry, sir. Let me checking the double charge now.",
          "It was our mistake, sir. The cashier is new.",
          undefined,
          "Câu cuối kết luận lỗi và đổ cho đồng nghiệp khi chưa ai kiểm tra. Câu đúng xin lỗi về điều khách gặp và kiểm tra ngay.",
        ),
        game(
          "My bill says a higher rate than my booking!",
          "Let me check your booking now, madam.",
          "Let me check you booking now, madam.",
          "The system is never wrong, madam, so the bill is correct as it is.",
          undefined,
          "Câu cuối khẳng định khi chưa kiểm tra. Câu đúng kiểm tra đặt phòng trước rồi mới nói.",
        ),
      ],
    }),

    L(27, 3, "Getting the Facts", "Hỏi cho rõ sự việc", {
      vocabulary: [
        c("Missing luggage", "The bell desk is looking for your missing luggage."),
        c("Air-conditioning noise", "Engineering will check the air-conditioning noise."),
        c("Key card failure", "Room 512 has a key card failure at the door."),
        c("Dirty bathroom", "Room 308 reports a dirty bathroom."),
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
          "Let me check with the bell desk about your missing luggage. When did you last see it?",
          "Hỏi đúng bộ phận, rồi hỏi điều khách chưa nói để bắt đầu tìm.",
        ),
        sp(
          "My bag had our group's luggage tag on it.",
          "Thank you, madam. I will ask the bell desk to look for that luggage tag.",
          "Ôn tuần 26: chi tiết giúp tìm đồ, giao đúng bộ phận.",
          undefined,
          ["luggage", "tag"],
        ),
        sp(
          "My key card does not open the door again.",
          "I am sorry, sir. Was it at your room door or in the lift?",
          "Hỏi một câu lựa chọn để biết đúng chỗ hỏng.",
        ),
        sp(
          "Engineering, Hai speaking.",
          "Hi Hai, it is Nam at the desk. Room 512 has a key card failure at the door.",
          "Gọi nội bộ: số phòng + đúng sự cố, ngắn gọn.",
          "colleague",
        ),
        sp(
          "Housekeeping, Lan here.",
          "Hi Lan, Room 308 reports a dirty bathroom. Can someone go up now?",
          "Chuyển đúng lời khách cho đúng bộ phận, kèm một việc cụ thể.",
          "colleague",
        ),
      ],
      reading: read(
        `Mr Diaz says there is a loud noise in his room, and that it started last night. Vy does not ask when it started, because he has already said that. She asks what he has not said: "Is it the air conditioner, or something outside?" It is the air conditioner. Vy calls engineering, and they arrive within fifteen minutes. She also tells the duty manager, because Mr Diaz could not sleep. The engineers fix it before lunch.`,
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
          {
            q: "Vì sao Vy vẫn báo quản lý trực dù kỹ thuật đã đến?",
            options: [
              "Vì khách đã mất một đêm ngủ",
              "Vì kỹ thuật làm việc chậm",
              "Vì máy lạnh phải thay mới hoàn toàn",
            ],
            correct: 0,
            explanation:
              "Suy luận: 'because Mr Diaz could not sleep' — máy sửa xong, nhưng trải nghiệm của khách cần người có quyền xem xét.",
          },
        ],
      ),
      game: [
        game(
          "My bag did not come with me from the airport.",
          "I am sorry, madam. When did you last see your bag?",
          "I am sorry, madam. When did you last saw your bag?",
          "That is the airline's problem, madam, so please call them yourself.",
          undefined,
          "Câu cuối đẩy khách đi. Câu đúng xin lỗi và hỏi điều khách chưa nói, để bắt đầu tìm.",
        ),
        game(
          "There is a strange noise in my room.",
          "I am sorry, sir. Is it the air conditioner, or something outside?",
          "I am sorry, sir. Are it the air conditioner, or something outside?",
          "All our rooms are quiet, sir.",
          undefined,
          "Câu cuối phủ nhận điều khách nghe thấy. Câu đúng hỏi điều khách chưa nói để gọi đúng bộ phận.",
        ),
      ],
    }),

    L(27, 4, "Staying Calm", "Giữ bình tĩnh", {
      vocabulary: [
        c("Missed wake-up call", "I will report the missed wake-up call to my supervisor.", [
          "/mɪst ˈweɪk ʌp kɔːl/",
          "Cuộc gọi báo thức bị bỏ lỡ",
          "⏰",
        ]),
        c("Weak wifi signal", "Room 715 has a weak wifi signal."),
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
        risk({
          ...sp(
            "My husband feels very dizzy. He needs to sit down.",
            t4a,
            "Câu phải đúng của tuần: mời ngồi và gọi sơ cứu NGAY. Lễ tân không đoán bệnh, không tự đưa khách đi.",
            undefined,
            ["seat", "calling", "first", "aid"],
          ),
          alsoAccept: [
            "Please help him to a seat, madam. I am calling first aid now.",
            "Please bring him to this chair, madam. I am calling first aid now.",
            "Please let him take a seat here, madam. I will call first aid now.",
          ],
        }),
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
        risk({
          ...sp(
            "You have no room for me? I booked this two months ago!",
            o1,
            "Hết phòng dù khách đã đặt: xin lỗi và gọi quản lý trực ngay. Lễ tân không tự hứa phòng.",
            undefined,
            ["calling", "duty", "manager"],
          ),
          alsoAccept: [
            "I am very sorry, madam. I will call the duty manager now.",
            "I am so sorry, madam. I am calling the manager on duty now.",
          ],
        }),
        sp(
          "What happens to me tonight?",
          o2,
          "Không hứa thay quản lý: nói ai sẽ lo cho khách, và mời ngồi.",
          undefined,
          undefined,
          o1,
        ),
        sp(
          "Duty manager speaking.",
          "This is Nam at the desk. We have an overbooking mix-up: Mrs Lee has no room tonight.",
          "Báo cấp trên: ai gọi, chuyện gì, khách nào — ngắn và đủ.",
          "manager",
        ),
        risk({
          ...sp(
            "Nobody in this hotel listens to me! I will break something!",
            "I will help you, sir. I am calling the security officer now.",
            "Khách say, to tiếng, đe dọa: không cãi, không đối mặt một mình. Gọi an ninh ngay.",
            undefined,
            ["help", "calling", "security", "officer"],
          ),
          alsoAccept: [
            "I want to help you, sir. I am calling the security officer now.",
            "I will help you, sir. I am calling the duty manager now.",
          ],
        }),
        sp(
          "Nobody called me this morning! I missed my tour bus.",
          "I will report the missed wake-up call, sir, and call your tour company now.",
          "Không đổ lỗi, không chỉ 'kiểm tra danh sách': báo lên, và gọi ngay công ty tour để giúp khách.",
        ),
        sp(
          "The wifi in my room keeps stopping.",
          "I am sorry, madam. I will ask our IT team to check it within twenty minutes.",
          "Xin lỗi + đúng bộ phận + mốc giờ.",
        ),
        sp(
          "IT desk, Minh speaking.",
          "Hi Minh, Room 715 has a weak wifi signal. Can you check it within twenty minutes?",
          "Gọi nội bộ: số phòng + sự cố + mốc giờ đã hứa với khách.",
          "colleague",
        ),
      ],
      reading: read(
        `In the lobby, an older guest suddenly feels dizzy, and his wife asks for help at the desk. Ngoc does not take him to the hospital herself, and she does not guess what is wrong. She asks him to take a seat, calls first aid and the duty manager, and stays with the couple the whole time. First aid arrives in two minutes. Then the duty manager speaks with the family about a doctor. Ngoc writes the time of each call in the log.`,
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
              "'stays with the couple the whole time' — người bệnh và người nhà không bị bỏ lại trong lúc chờ.",
          },
          {
            q: "Ai nói với gia đình về việc gặp bác sĩ?",
            options: [
              "Ngọc, vì Ngọc thấy khách trước",
              "Quản lý trực, sau khi sơ cứu đến",
              "Nhân viên sơ cứu, trước khi Ngọc gọi",
            ],
            correct: 1,
            explanation:
              "'First aid arrives… Then the duty manager speaks with the family about a doctor' — lễ tân không quyết thay; người có quyền nói sau khi sơ cứu đến.",
          },
        ],
      ),
      game: [
        game(
          "My husband is not well. He is very pale.",
          "Please help him to a seat, madam. I am calling first aid now.",
          "Please help him to a seat, madam. I am call first aid now.",
          "I think he is just tired, madam. Maybe some water and a rest will help.",
          undefined,
          "Câu cuối tự đoán bệnh — lễ tân không chẩn đoán. Câu đúng mời ngồi và gọi người có chuyên môn ngay.",
        ),
        game(
          "What do you mean, you have no room for me tonight?",
          "I am very sorry, madam. I am calling the duty manager now.",
          "I am very sorry, madam. I calling the duty manager now.",
          "Sorry, madam, we are full tonight. Maybe try the hotel next door.",
          undefined,
          "Câu cuối đẩy khách đi khi lỗi đặt phòng chưa được xử lý. Câu đúng xin lỗi và gọi ngay người có quyền.",
        ),
      ],
    }),
  ];
}

// ── Week 28 — If you like, I can…: what the desk may offer ──────────────
function week28(): LessonContent[] {
  const t1a = "I am sorry, madam. If you like, I can arrange a room move for you.";
  const t1b = "There are two options, madam: the tenth floor or the garden side.";
  const t1c = "Either option is quiet, madam. If you prefer a view, I recommend the tenth floor.";
  const t1d =
    "The bellman can move your bags at six o'clock, madam. Your new key will be ready then.";
  const t2a =
    "I can arrange late check-out until two, subject to availability. There is a small fee, madam.";
  const t2b = "Then we can store your bags downstairs until your taxi comes, madam.";
  const t2c = "Of course, madam. I will send a bellman up at two o'clock.";
  const t3a = "I am sorry, I cannot offer a refund. My manager will call you.";
  const t3b = "If you like, I can arrange a room move to a quieter floor today.";
  const t3c =
    "I am sorry, I cannot offer a free breakfast. Only the duty manager can offer a goodwill gesture.";
  const t4a = "If it happens again, please call me. I will send engineering to the room.";
  const t4b = "Then I will block a quieter room for you for tomorrow night, sir.";
  const t4c = "Of course, sir. I can show you the room at five o'clock.";
  const f1 = "Please take the emergency exit now, madam. Do not take the lift.";
  const f2 = "No, madam. Please leave your bags and go to the exit now.";
  const f3 = "Please go to the car park in front of the hotel. Our staff will meet you there.";
  return [
    L(28, 1, "If You Like, I Can…", "Nếu quý khách muốn, tôi có thể…", {
      vocabulary: [
        c("Prefer", "If you prefer, I can move you to a higher floor."),
        c("Option", "There are two options for your room tonight."),
        c("Either", "Either option is available tonight, sir."),
        c("Room move", "A room move to the same room type has no charge.", [
          "/ruːm muːv/",
          "Việc chuyển phòng",
          "🚚",
        ]),
      ],
      grammar: [
        g(
          "I move you, okay?",
          "If you like, I can arrange a room move for you, madam.",
          "'If you like, I can…' — đề nghị điều lễ tân được làm, để khách quyết. Sau 'can' là động từ gốc.",
          "If you like, I can arranging a room move for you, madam.",
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
          "Xin lỗi, rồi đề nghị điều lễ tân làm được: chuyển sang phòng cùng hạng.",
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
          "'Either' khi cả hai đều hợp; khách chưa nói thích gì nên mới dùng 'If you prefer'.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "The tenth floor, then. When can I move?",
          t1d,
          "Khách đã chọn rồi: không nói 'If you like' nữa, chỉ chốt giờ và việc tiếp theo.",
          undefined,
          undefined,
          t1c,
        ),
        sp(
          "My room smells of smoke from the last guest.",
          "I am sorry, sir. I can arrange a room move to the same room type now.",
          "Xin lỗi về điều khách gặp, rồi đề nghị điều trong quyền của lễ tân.",
        ),
        sp(
          "I had to pack all my things again to move.",
          "I apologise for the inconvenience, madam. The bellman will carry everything for you.",
          "Ôn tuần 27: xin lỗi về sự bất tiện, rồi một việc cụ thể giúp khách.",
          undefined,
          ["inconvenience"],
        ),
      ],
      reading: read(
        `Ms Fischer hears music from the bar every night after eleven. Kim listens, then offers what the desk can offer: "If you like, I can arrange a room move for you." There are two options: the tenth floor or the garden side. Either option is quiet, but Ms Fischer prefers a view, so Kim recommends the tenth floor. The bellman moves her bags at six, and Kim gives her the new key at the desk herself.`,
        [
          {
            q: "Kim đưa ra những lựa chọn nào?",
            options: [
              "Giảm giá hoặc bữa sáng miễn phí",
              "Tầng mười hoặc phía vườn",
              "Phòng suite hoặc phòng gia đình",
            ],
            correct: 1,
            explanation:
              "'the tenth floor or the garden side' — cả hai đều là phòng cùng hạng, việc lễ tân được làm.",
          },
          {
            q: "Vì sao Kim gợi ý tầng mười?",
            options: [
              "Vì phòng ở tầng mười rẻ hơn phía vườn",
              "Vì quán bar ở tầng mười đóng cửa sớm",
              "Vì khách thích có tầm nhìn",
            ],
            correct: 2,
            explanation:
              "'Ms Fischer prefers a view, so Kim recommends the tenth floor' — gợi ý theo điều khách thích.",
          },
          {
            q: "Vì sao Kim đề nghị đổi phòng mà không đề nghị giảm giá?",
            options: [
              "Vì đổi phòng cùng hạng là việc lễ tân được làm",
              "Vì khách không thích được giảm giá",
              "Vì quán bar sẽ đóng cửa vào tuần sau",
            ],
            correct: 0,
            explanation:
              "Suy luận: 'offers what the desk can offer' — giảm giá là quyết định của quản lý; chuyển sang phòng cùng hạng thì lễ tân tự làm được.",
          },
        ],
      ),
      game: [
        game(
          "The bar music keeps me awake. What can you do?",
          "I am sorry, madam. If you like, I can arrange a room move for you.",
          "I am sorry, madam. If you like, I can arranges a room move for you.",
          "I am sorry, madam. The bar is open until midnight, so there is nothing we can do.",
          undefined,
          "Câu cuối nói đúng sự thật nhưng không đưa giải pháp nào. Câu đúng đề nghị điều lễ tân làm được và để khách quyết.",
        ),
        game(
          "Which is better, the tenth floor or the garden side?",
          "Either option is quiet, sir. The tenth floor has a better view.",
          "Either options is quiet, sir. The tenth floor has a better view.",
          "I do not know, sir. You can go up and look at both rooms yourself.",
          undefined,
          "Câu cuối đẩy việc chọn sang khách. Câu đúng so sánh giúp khách bằng một điểm cụ thể.",
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
        c("Subject to availability", "Late check-out is subject to availability.", [
          "/ˈsʌbdʒɪkt tə əˌveɪləˈbɪləti/",
          "Tùy tình trạng phòng trống",
          "📊",
        ]),
      ],
      grammar: [
        g(
          "Bags here, okay.",
          "If you like, we can store your bags downstairs until your taxi comes.",
          "Mệnh đề 'until' dùng hiện tại; 'taxi' số ít → 'comes'.",
          "If you like, we can store your bags downstairs until your taxi come.",
        ),
        g(
          "Stay more? Okay.",
          "If the room is available, I can extend your stay one night.",
          "Câu điều kiện loại 1: 'If + hiện tại, … can + động từ gốc'. 'the room' số ít → 'is'.",
          "If the room are available, I can extend your stay one night.",
        ),
      ],
      speaking: [
        sp(
          "Our flight is at eleven at night. What can we do after check-out?",
          t2a,
          "Đề nghị điều lễ tân được làm, nói rõ điều kiện (còn phòng) và phí.",
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
          "Can we stay one more night? We love it here.",
          "Let me check if the room is available, sir. If it is, I can extend your stay one night.",
          "Kiểm tra phòng trống TRƯỚC; lời hứa đi sau điều kiện thật.",
        ),
        sp(
          "Can you also get us a car to the airport?",
          "Of course. I will book your airport transfer for nine o'clock.",
          "Ôn tuần 25: khách đã nói muốn gì thì làm luôn, không nói 'If you like'.",
          undefined,
          ["airport", "transfer"],
        ),
      ],
      reading: read(
        `The Clarks' flight is at eleven at night. Ha offers what the desk can offer. Late check-out is subject to availability, so she checks first, and then arranges it until two, with a small fee. After two, the hotel can store their bags downstairs until their taxi comes in the evening. Ha also books their airport transfer for nine. She does not promise them the room for the whole evening, because that is not hers to give.`,
        [
          {
            q: "Hà đề nghị gì cho khách?",
            options: [
              "Giữ phòng miễn phí đến tối",
              "Gọi hãng bay đổi sang một chuyến bay sớm hơn",
              "Trả phòng muộn đến hai giờ, có phí nhỏ",
            ],
            correct: 2,
            explanation:
              "'arranges it until two, with a small fee' — điều lễ tân được làm, nói rõ có phí.",
          },
          {
            q: "Hà làm gì TRƯỚC khi sắp xếp trả phòng muộn?",
            options: [
              "Kiểm tra còn phòng trống hay không",
              "Gọi xe ra sân bay cho khách",
              "Hỏi quản lý trực có đồng ý không",
            ],
            correct: 0,
            explanation:
              "'subject to availability, so she checks first' — trả phòng muộn tùy phòng trống, nên kiểm tra rồi mới sắp xếp.",
          },
          {
            q: "Vì sao Hà không hứa giữ phòng cho khách cả buổi tối?",
            options: [
              "Vì khách không muốn ở lại phòng",
              "Vì đó không phải điều lễ tân được tự cho",
              "Vì xe ra sân bay đến lúc hai giờ",
            ],
            correct: 1,
            explanation:
              "'that is not hers to give' — giữ phòng cả buổi tối miễn phí là quyết định vượt quyền lễ tân.",
          },
        ],
      ),
      game: [
        game(
          "Our flight is late at night. Can we keep the room all day for free?",
          "I can arrange late check-out until two, sir. There is a small fee.",
          "I can arrange late check-out until two, sir. There is small fee.",
          "Of course, sir. You are our guests, so stay in the room as long as you like.",
          undefined,
          "Câu cuối tự cho giữ phòng miễn phí cả ngày — vượt quyền. Câu đúng đưa điều lễ tân được làm: trả phòng muộn, có phí.",
        ),
        game(
          "Can we keep our bags here after we check out?",
          "Of course, madam. We can store your bags downstairs until your taxi comes.",
          "Of course, madam. We can store your bags downstairs until your taxi come.",
          "Sorry, madam. After check-out, all bags have to leave the hotel.",
          undefined,
          "Câu cuối từ chối một việc lễ tân làm được. Câu đúng đồng ý giữ hành lý đến khi xe tới.",
        ),
      ],
    }),

    L(28, 3, "When You Must Say No", "Khi phải từ chối", {
      vocabulary: [
        c("Waive the late fee", "Only the duty manager can waive the late fee."),
        c("Complimentary upgrade", "Only a manager can give a complimentary upgrade.", [
          "/ˌkɒmplɪˈmentri ˈʌpɡreɪd/",
          "Nâng hạng phòng miễn phí",
          "🎁",
        ]),
        c("Goodwill gesture", "Only the duty manager can offer a goodwill gesture.", [
          "/ˌɡʊdˈwɪl ˈdʒestʃə/",
          "Ưu đãi bù đắp thiện chí",
          "💝",
        ]),
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
          "If your booking show a lower rate, my supervisor will correct it.",
        ),
      ],
      speaking: [
        risk({
          ...sp(
            "The noise ruined my night. I want a refund for it.",
            t3a,
            "Câu thẩm quyền của tuần: lễ tân KHÔNG tự hứa hoàn tiền. Nói rõ ai sẽ gọi lại.",
            undefined,
            ["offer", "refund", "manager"],
          ),
          alsoAccept: [
            "I am sorry, I cannot offer a refund. The manager will call you.",
            "I am afraid I cannot give a refund, sir. My manager will call you.",
            "I am sorry, I cannot offer a refund. The duty manager will call you.",
          ],
        }),
        sp(
          "Then what can you do for me right now?",
          t3b,
          "Ngay sau lời từ chối, đưa giải pháp trong quyền của lễ tân.",
          undefined,
          undefined,
          t3a,
        ),
        risk({
          ...sp(
            "Fine. And breakfast tomorrow should be free.",
            t3c,
            "Đồ miễn phí không phải quyền của lễ tân: từ chối lịch sự và nói ai có quyền.",
            undefined,
            ["offer", "free", "breakfast", "duty", "manager", "goodwill", "gesture"],
            t3b,
          ),
          alsoAccept: [
            "I am sorry, I cannot offer a free breakfast. I will ask the duty manager.",
            "I am afraid I cannot offer a free breakfast, sir. I will ask my manager.",
          ],
        }),
        risk({
          ...sp(
            "I checked out at two. Please waive the late fee for me.",
            "I am sorry, I cannot waive the late fee. I will ask the duty manager.",
            "Bỏ phí là quyết định về tiền: lễ tân không tự bỏ, chuyển quản lý trực.",
            undefined,
            ["waive", "late", "fee", "duty", "manager"],
          ),
          alsoAccept: [
            "I am sorry, I cannot waive the late fee myself. I will ask the duty manager.",
            "I am afraid I cannot waive the late fee, sir. I will ask the duty manager.",
          ],
        }),
        sp(
          "My friend got a free upgrade last time. Can I have one too?",
          "I am sorry, I cannot give a complimentary upgrade myself. I can ask my manager.",
          "Từ chối điều không thuộc quyền mình, rồi chuyển đúng người.",
        ),
        sp(
          "My booking says ninety dollars, but the bill says one hundred and ten.",
          "Let me check your booking now, sir. If it shows ninety dollars, my supervisor will correct the room rate.",
          "Kiểm tra trước, không nghi ngờ khách: điều kiện thật trước, người sửa sau.",
        ),
        sp(
          "There is a double charge for my laundry.",
          "Let me check the double charge with my supervisor, madam. If it is a mistake, she will correct it.",
          "Ôn tuần 27: kiểm tra trước, điều kiện thật, đúng người sửa.",
          undefined,
          ["double", "charge"],
        ),
      ],
      reading: read(
        `Mr Ward checked out at two and asks Thuy to waive the late fee. Thuy cannot waive it herself, so she asks the duty manager. Mr Ward also says his booking shows a lower rate. Thuy checks the booking on the screen, and it does, so her supervisor corrects the room rate. The duty manager decides about the late fee and offers a goodwill gesture: a free coffee on his next visit. Mr Ward leaves happy with that.`,
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
          {
            q: "Ai đưa ra món quà cà phê miễn phí?",
            options: [
              "Quản lý trực, sau khi xem xét",
              "Thủy, để khách vui lòng",
              "Giám sát, cùng lúc sửa giá phòng",
            ],
            correct: 0,
            explanation:
              "'The duty manager… offers a goodwill gesture' — ưu đãi bù đắp là quyền của quản lý, không phải của lễ tân.",
          },
        ],
      ),
      game: [
        game(
          "I want my money back for last night.",
          "I am sorry, I cannot offer a refund. My manager will call you.",
          "I am sorry, I cannot offer a refund. My manager will calls you.",
          "Of course, sir. I am so sorry about that. I will refund last night to your card right now.",
          undefined,
          "Câu cuối tự hứa hoàn tiền — vượt quyền lễ tân. Câu đúng không hứa, không đóng cửa: nói rõ ai gọi lại.",
        ),
        game(
          "I left at two. Can you just forget the late fee?",
          "I am sorry, I cannot waive the late fee. I will ask the duty manager.",
          "I am sorry, I cannot waive the late fee. I will asking the duty manager.",
          "No problem, sir. Two hours is not much, so I will not charge you.",
          undefined,
          "Câu cuối tự bỏ phí — vượt quyền. Câu đúng từ chối lịch sự và chuyển người có quyền.",
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
          "'If it happens again…' — mệnh đề 'If' ở hiện tại; 'the noise' số ít → 'starts'.",
          "If the noise start again, please call me. I will send engineering to the room.",
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
          "Engineering, this is Hai.",
          "Hi Hai, if Room 715 calls about the noise again, please go up at once.",
          "Gọi nội bộ bằng câu điều kiện: nếu chuyện lặp lại thì ai làm gì.",
          "colleague",
        ),
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
          "Khách đã hỏi rõ: đồng ý và hẹn giờ, không nói 'If you like'.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "What do we do if there is a fire at night?",
          "If the fire alarm rings, please take the emergency exit, not the lift.",
          "Thông tin an toàn khi nhận phòng: một câu điều kiện, một hành động.",
        ),
        risk({
          ...sp(
            "The fire alarm is ringing on my floor. What should I do?",
            f1,
            "Câu phải đúng của tuần: lối thoát hiểm, KHÔNG đi thang máy. Không đoán là chuông thử.",
            undefined,
            ["take", "emergency", "exit", "lift"],
          ),
          alsoAccept: [
            "Please use the emergency exit now, madam. Do not use the lift.",
            "Please take the emergency stairs now, madam. Do not take the lift.",
            "No, madam. Please take the emergency exit, not the lift.",
          ],
        }),
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
        sp(
          "My wifi was slow again last night.",
          "If the weak wifi signal comes back, please call me. I will send our IT team.",
          "Ôn tuần 27: câu điều kiện cho sự cố lặp lại, và đúng bộ phận.",
          undefined,
          ["weak", "wifi", "signal"],
        ),
      ],
      reading: read(
        `At ten at night, the fire alarm rings on the sixth floor. Tuan answers a worried call from Room 612. He does not say it is probably a test. He says: "Please take the emergency exit now, madam. Do not take the lift." He tells her to leave her bags and go to the car park. Then he calls the duty manager and stays at the desk with the guest list, ready for the fire brigade.`,
        [
          {
            q: "Tuấn hướng dẫn khách đi bằng đường nào?",
            options: [
              "Thang máy, vì nhanh hơn",
              "Lối thoát hiểm, không đi thang máy",
              "Ở yên trong phòng",
            ],
            correct: 1,
            explanation:
              "'Please take the emergency exit now… Do not take the lift' — khi có báo cháy, thang máy không an toàn.",
          },
          {
            q: "Vì sao Tuấn không nói đó có thể chỉ là chuông thử?",
            options: [
              "Vì quản lý trực cấm nhân viên lễ tân nói chuyện điện thoại lúc đó",
              "Vì khách không hiểu tiếng Anh",
              "Vì chưa ai biết chắc, an toàn đi trước",
            ],
            correct: 2,
            explanation:
              "'He does not say it is probably a test' — lễ tân không đoán; chuông kêu thì làm theo quy trình thoát hiểm.",
          },
          {
            q: "Sau cuộc gọi với khách, Tuấn làm gì?",
            options: [
              "Gọi quản lý trực và giữ danh sách khách ở quầy",
              "Lên tầng sáu xem có cháy thật không",
              "Đi ra bãi xe trước để đón khách",
            ],
            correct: 0,
            explanation:
              "'Then he calls the duty manager and stays at the desk with the guest list' — lễ tân giữ danh sách để biết ai đã ra ngoài.",
          },
        ],
      ),
      game: [
        game(
          "The alarm is ringing. Can we take the lift down?",
          "No, madam. Please take the emergency exit, not the lift.",
          "No, madam. Please taking the emergency exit, not the lift.",
          "Yes, madam, take the lift. It is only a test.",
          undefined,
          "Câu cuối vừa cho đi thang máy vừa đoán là chuông thử. Câu đúng nói rõ một việc: đi lối thoát hiểm.",
        ),
        game(
          "What if the air conditioner is loud again tonight?",
          "If it happens again, please call me. I will send engineering to the room.",
          "If it happen again, please call me. I will send engineering to the room.",
          "It will not happen again, sir. I promise.",
          undefined,
          "Câu cuối hứa điều bạn không chắc. Câu đúng đưa cách xử lý nếu vấn đề quay lại.",
        ),
      ],
    }),
  ];
}

// ── Week 29 — Handover between receptionists, and up to the duty manager ─
function week29(): LessonContent[] {
  const t1a = "Two VIP guests arrive on your shift tonight. I updated the arrival list at two.";
  const t1b = "Mr and Mrs Sato arrive at eight o'clock. The general manager will greet them.";
  const t1c = "The room status report shows six rooms not ready. Please check them at five.";
  const t1d =
    "Three rooms on the departure list have late check-out until six. I will update the list before I go.";
  const t2a = "Yes. I was checking the arrival list when a visitor asked for a room number.";
  const t2b = "I did not tell him the number. I noted it in the log.";
  const t2c = "It was Mrs Sato. She is on the special attention list.";
  const t3a = "The occupancy figure is not final yet. The night auditor is checking it.";
  const t3b = "I have counted the cash float, and it is correct.";
  const t3c = "I have not checked the key inventory yet. Please count it before midnight.";
  const t4a = "I wrote them on the wake-up call list, and I checked them twice.";
  const t4b =
    "Room 410 is on the out-of-order room list. Engineering was fixing the shower at ten.";
  const t4c = "Everything else is in the handover log, with the times.";
  const cf = "I reported it to the night manager, and I noted it in the log.";
  return [
    L(29, 1, "Handing Over the Shift", "Bàn giao ca", {
      vocabulary: [
        c("Shift", "My shift ends at three o'clock."),
        c("Update", "I will update the arrival list before I go."),
        c("Arrival list", "Two VIP guests are on today's arrival list."),
        c("Departure list", "I checked the departure list at two."),
        c("Room status report", "The room status report shows six rooms not ready."),
      ],
      grammar: [
        g(
          "Many thing today.",
          "I updated the arrival list at two. Two VIP guests arrive tonight.",
          "Bàn giao: việc ĐÃ làm (quá khứ đơn 'updated') + việc sắp tới (hiện tại).",
          "I updated the arrival list at two. Two VIP guests arrives tonight.",
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
          "And the departures?",
          t1d,
          "Khép lượt bàn giao: số phòng, mốc giờ, và việc mình còn làm trước khi về.",
          "colleague",
          undefined,
          t1c,
        ),
        sp(
          "Is the shift handover done?",
          "Yes. I was updating the arrival list when Hoa arrived, so I gave her a full update.",
          "Báo cấp trên bằng quá khứ tiếp diễn: đang làm gì khi đồng nghiệp đến.",
          "manager",
        ),
        sp(
          "Did anything change on the arrival list?",
          "Yes. Mr Brown had a room move to the tenth floor this afternoon.",
          "Ôn tuần 28: việc đã đổi trong ca, nói rõ để ca sau không gửi khách về phòng cũ.",
          "colleague",
          ["room", "move"],
        ),
      ],
      reading: read(
        `At three, Nam hands over to Hoa. He was updating the arrival list when she arrived, so he gives her a short update. Two VIP guests arrive on her shift tonight, and the general manager will greet them at eight. The room status report shows six rooms not ready, so Hoa will check them at five. Three rooms on the departure list have late check-out until six. Nam writes all this in the handover log.`,
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
            q: "Nam đang làm gì khi Hòa đến?",
            options: [
              "Cập nhật danh sách khách đến",
              "Đón hai khách VIP ở sảnh",
              "Gọi cho tổng giám đốc",
            ],
            correct: 0,
            explanation:
              "'He was updating the arrival list when she arrived' — quá khứ tiếp diễn kể việc đang làm khi việc khác xảy ra.",
          },
          {
            q: "Vì sao Nam vẫn ghi mọi việc vào sổ bàn giao dù đã nói với Hòa?",
            options: [
              "Vì Hòa không hiểu tiếng Anh",
              "Để ca sau và quản lý đọc lại được, kèm giờ",
              "Vì tổng giám đốc yêu cầu như vậy",
            ],
            correct: 1,
            explanation:
              "Suy luận: lời nói dễ quên — sổ bàn giao giữ lại việc, giờ và người làm cho mọi ca sau.",
          },
        ],
      ),
      game: [
        game(
          "I am taking over now. What is the most urgent thing?",
          "Two VIP guests arrive at eight. The general manager will greet them.",
          "Two VIP guests arrives at eight. The general manager will greet them.",
          "Nothing much, really. It was a quiet day, so just relax and enjoy the shift.",
          "colleague",
          "Câu cuối bỏ sót khách VIP — ca sau sẽ không chuẩn bị. Câu đúng nêu việc quan trọng nhất, kèm giờ.",
        ),
        game(
          "Did you give Hoa the handover?",
          "Yes. I gave her a full update at three.",
          "Yes. I gived her a full update at three.",
          "She can read the system herself, so I did not need to.",
          "manager",
          "Câu cuối bỏ bàn giao — ca sau phải tự đoán. Câu đúng báo đã bàn giao, lúc nào.",
        ),
      ],
    }),

    L(29, 2, "I Was Doing… When…", "Tôi đang làm… thì…", {
      vocabulary: [
        c("Suddenly", "The key card machine suddenly stopped working."),
        c("Pending request", "There is one pending request from Room 418."),
        c("Special attention list", "Mrs Sato is on the special attention list."),
        c("Night audit", "The night audit checks every bill after midnight.", [
          "/naɪt ˈɔːdɪt/",
          "Kiểm toán đêm",
          "🌙",
        ]),
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
        risk({
          ...sp(
            "What did you tell him?",
            t2b,
            "Câu phải đúng của tuần: KHÔNG cho số phòng, và đã ghi sự việc vào sổ.",
            "manager",
            ["number", "noted", "log"],
            t2a,
          ),
          alsoAccept: [
            "I did not give him the room number. I noted it in the log.",
            "I did not tell him the room number, and I noted it in the log.",
            "No. I did not tell him the number. I noted it in the log.",
          ],
        }),
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
          "Then I will call housekeeping now and note it for the night audit.",
          "Phòng lệch trạng thái: gọi buồng phòng và ghi cho kiểm toán đêm. Không tự xếp khách vào.",
          "colleague",
        ),
        sp(
          "What were you doing when the man started shouting?",
          "I was checking a guest in when he started shouting, so I called the security officer.",
          "Ôn tuần 26: quá khứ tiếp diễn + đã gọi đúng người.",
          "manager",
          ["security", "officer"],
        ),
      ],
      reading: read(
        `At midnight, Khanh was checking the arrival list when a visitor asked politely for Mrs Sato's room number. Khanh did not tell him. Mrs Sato is on the special attention list, so Khanh noted the visit in the log and called the duty manager straight away. Later, the key card machine suddenly stopped while Khanh was making keys. In the morning, Khanh reported both things to the front office manager. Khanh also wrote down the time of each event.`,
        [
          {
            q: "Khánh đang làm gì khi người lạ hỏi số phòng?",
            options: [
              "Kiểm tra danh sách khách đến",
              "Làm thẻ phòng",
              "Bàn giao ca cho đồng nghiệp ca sau",
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
          {
            q: "Việc nào xảy ra SAU khi người lạ hỏi số phòng?",
            options: [
              "Khánh đang kiểm tra danh sách khách đến",
              "Máy làm thẻ đột nhiên dừng",
              "Bà Sato được đưa vào danh sách cần lưu ý",
            ],
            correct: 1,
            explanation:
              "'Later, the key card machine suddenly stopped' — 'Later' cho biết thứ tự; bà Sato đã có trong danh sách từ trước.",
          },
        ],
      ),
      game: [
        game(
          "What were you doing when the visitor came in?",
          "I was checking the arrival list at the desk.",
          "I was check the arrival list at the desk.",
          "I gave him the room number because he said he was her brother.",
          "manager",
          "Câu cuối tiết lộ số phòng — sai quyền riêng tư dù người kia nói gì. Câu đúng kể bằng quá khứ tiếp diễn việc đang làm.",
        ),
        game(
          "Did you give the visitor Mrs Sato's room number?",
          "No. I did not tell him the number. I noted it in the log.",
          "No. I did not told him the number. I noted it in the log.",
          "Only the floor, not the room. He seemed nice.",
          "manager",
          "Câu cuối vẫn để lộ thông tin của khách. Câu đúng: không nói gì, và đã ghi sổ.",
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
          "Has the night audit finished?",
          "Not yet. The night auditor was still checking the occupancy figure at midnight.",
          "Báo cấp trên đúng tình trạng, bằng quá khứ tiếp diễn — không đoán con số.",
          "manager",
        ),
        sp(
          "Did the duty manager speak to Mr Ward about the late fee?",
          "Yes. He offered Mr Ward a goodwill gesture, and I noted it in the log.",
          "Ôn tuần 28: ai đã quyết, quyết gì, và đã ghi lại.",
          "manager",
          ["goodwill", "gesture"],
        ),
      ],
      reading: read(
        `Before the night shift, Mai writes the open items. The occupancy figure is not final yet, because the night auditor is still checking it. She has counted the cash float, and it is correct. She has not checked the key inventory yet, so she asks Duy to count it before midnight. Duy finds two key cards missing and writes it in the handover log for the morning team. The morning supervisor checks the cards first thing.`,
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
          {
            q: "Vì sao Duy ghi việc thiếu thẻ vào sổ bàn giao?",
            options: [
              "Để ca sáng biết và xử lý tiếp",
              "Vì Mai yêu cầu phạt người làm mất",
              "Vì thẻ phòng đã được tìm thấy",
            ],
            correct: 0,
            explanation:
              "Suy luận: 'for the morning team' — việc chưa giải quyết xong phải được bàn giao, không để mất giữa hai ca.",
          },
        ],
      ),
      game: [
        game(
          "Is the occupancy figure ready for the morning report?",
          "Not yet. The night auditor is checking it now.",
          "Not yet. The night auditor is check it now.",
          "Yes, about ninety percent, I think.",
          "manager",
          "Câu cuối báo một con số đoán — cấp trên sẽ dùng số sai. Câu đúng nói thật là chưa xong và ai đang làm.",
        ),
        game(
          "Did you count the cash float?",
          "Yes, I have counted it, and it is correct.",
          "Yes, I have count it, and it is correct.",
          "No, but it is always correct, so you do not need to count it.",
          "colleague",
          "Câu cuối bỏ qua một việc bắt buộc của ca. Câu đúng báo đã đếm và kết quả.",
        ),
      ],
    }),

    L(29, 4, "The Right Log for the Right Thing", "Đúng sổ cho đúng việc", {
      vocabulary: [
        c("Wake-up call list", "Room 305 is on the wake-up call list for six o'clock."),
        c("Handover log", "Everything else goes in the handover log, with the times.", [
          "/ˈhændəʊvə lɒɡ/",
          "Sổ bàn giao ca",
          "📓",
        ]),
        c("Out-of-order room list", "Room 410 is on the out-of-order room list."),
      ],
      grammar: [
        g(
          "I remember, no write.",
          "I wrote the wake-up calls on the wake-up call list.",
          "Việc đã làm trong ca kể bằng quá khứ đơn: write → wrote (bất quy tắc).",
          "I writed the wake-up calls on the wake-up call list.",
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
          "Phòng hỏng: đúng danh sách + ai đang sửa lúc mình kiểm tra.",
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
        risk({
          ...sp(
            "The cash float was short this morning. What did you do?",
            cf,
            "Tiền quỹ thiếu: báo đúng người và ghi sổ ngay. Không tự bù, không đoán ai lấy.",
            "manager",
            ["reported", "night", "manager", "noted", "log"],
          ),
          alsoAccept: [
            "I reported it to the duty manager, and I noted it in the log.",
            "I told the night manager straight away, and I noted it in the log.",
          ],
        }),
        sp(
          "When does the Sunrise group arrive?",
          "The handover log says ten o'clock. Their key packets are ready.",
          "Ôn tuần 26: chỉ đúng nơi ghi thông tin, kèm việc đã chuẩn bị.",
          "colleague",
          ["key", "packets"],
        ),
        sp(
          "Did anyone ask for an early wake-up call?",
          "Yes, Room 305 at six o'clock. It is on the wake-up call list.",
          "Số phòng + giờ + đã ghi ở đâu.",
          "colleague",
        ),
      ],
      reading: read(
        `At the end of her shift, Thao puts each item in the right place. The wake-up calls go on the wake-up call list. Room 410 goes on the out-of-order room list, because engineering was still fixing the shower. The Sunrise group's arrival time goes in the handover log, and so does everything else, with the times. The next team does not have to ask her anything the next morning. Her supervisor reads the whole log in a few minutes.`,
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
              "'so does everything else, with the times' — mỗi việc đúng một chỗ, ca sau mới tìm được.",
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
          {
            q: "Vì sao ca sau không phải hỏi Thảo điều gì?",
            options: [
              "Vì mỗi việc đã nằm đúng danh sách hoặc sổ, kèm giờ",
              "Vì ca sau đã làm cùng Thảo cả ngày",
              "Vì đêm đó không có việc gì xảy ra",
            ],
            correct: 0,
            explanation:
              "Suy luận: ghi đúng chỗ, có giờ, thì ca sau đọc là đủ — bàn giao tốt là bàn giao viết ra được.",
          },
        ],
      ),
      game: [
        game(
          "Where should I write the wake-up call for Room 512?",
          "On the wake-up call list. The night team checks it.",
          "On the wake-up call list. The night team check it.",
          "Just write it on a sticky note.",
          "colleague",
          "Câu cuối dễ làm mất yêu cầu của khách. Câu đúng chỉ đúng danh sách mà ca đêm sẽ đọc.",
        ),
        game(
          "The cash float was short. Who did you tell?",
          "I reported it to the night manager, and I noted it in the log.",
          "I reporting it to the night manager, and I noted it in the log.",
          "Nobody yet. I put the money back from my own pocket.",
          "manager",
          "Câu cuối tự bù tiền và giấu sự việc — sai quy trình tiền quỹ. Câu đúng báo đúng người và ghi sổ.",
        ),
      ],
    }),
  ];
}

// ── Week 30 — Checkpoint: putting weeks 23-29 together ──────────────────
function week30(): LessonContent[] {
  const t1a =
    "I recommend the executive suite, madam. It is bigger, and the rate per night includes breakfast.";
  const t1b = "It is thirty dollars more per night, madam, with tax and service charge.";
  const t1c =
    "Housekeeping says it will be ready within fifteen minutes. Your room number is on the key card holder.";
  const t2a = "It is the late check-out fee, sir, because housekeeping has to prepare the room.";
  const t2b =
    "Your pick-up time is six o'clock, sir. I will ask the driver to wait at the main door.";
  const t2c =
    "The kitchen can prepare a packed breakfast for your group. Group breakfast starts at seven.";
  const t3a = "I am sorry, sir, the card did not go through. Do you have another card?";
  const t3b = "I am sorry, I do not know the reason, sir. Your bank can tell you.";
  const t3c = "Of course, sir. Which payment method would you like: cash or another card?";
  const t4a = "I am sorry, madam. For his safety, I cannot tell you that.";
  const t4b = "I understand, madam. If he is staying with us, I can take a message for him.";
  const t4c = "Thank you, madam. Please take a seat while you wait.";
  const w1 = "I am very sorry, sir. I am calling the security officer and the duty manager now.";
  const w2 = "Please do not touch the in-room safe until security arrives, sir.";
  const w3 = "I am sorry, I cannot promise that, sir. The duty manager will speak with you.";
  return [
    L(30, 1, "Recommend and Promise", "Gợi ý và cam kết", {
      vocabulary: [
        c("Folio", "Each guest in the group has a separate folio.", [
          "/ˈfəʊliəʊ/",
          "Tài khoản hóa đơn của khách",
          "📂",
        ]),
        c("Confident", "I feel confident at the desk on a busy night now."),
        c("Room number", "We never say a guest's room number out loud at the desk."),
        c("Rate per night", "The rate per night includes breakfast for two."),
      ],
      grammar: [
        g(
          "Big room good.",
          "I recommend the executive suite, sir. It is bigger than the deluxe room.",
          "Tuần 23: 'I recommend' + so sánh hơn. big → bigger, không nói 'more bigger'.",
          "I recommend the executive suite, sir. It is more bigger than the deluxe room.",
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
          undefined,
          ["executive", "suite"],
        ),
        sp(
          "How much more is it per night?",
          t1b,
          "Báo giá chênh lệch theo giá niêm yết, bằng con số, gồm thuế và phí phục vụ.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "All right, we will take it. Is it ready now?",
          t1c,
          "Tuần 25: báo mốc của buồng phòng bằng con số. Không đọc to số phòng — chỉ vào bao thẻ.",
          undefined,
          undefined,
          t1b,
        ),
        risk({
          ...sp(
            "I am Mr Brown in 604. I lost my key. Give me a new one, please.",
            "Of course, sir. I will check your passport, then reprogram your key card.",
            "Câu phải đúng: kiểm tra hộ chiếu TRƯỚC, rồi mới làm lại thẻ — dù khách nói đúng tên và số phòng.",
            undefined,
            ["check", "passport", "reprogram", "key", "card"],
          ),
          alsoAccept: [
            "Of course, sir. May I see your passport first? Then I will reprogram your key card.",
            "Of course, sir. I will check your passport first, then reprogram your key card.",
          ],
        }),
        sp(
          "Can my company pay for the room, and I pay for my drinks?",
          "Of course, sir. I can split the bill into two folios.",
          "Ôn tuần 26: tách hóa đơn — hai tài khoản riêng.",
          undefined,
          ["split", "bill"],
        ),
        sp(
          "My mother uses a wheelchair. Is there a room for her?",
          "Yes, madam, the accessible room has a wide door. I will confirm it within ten minutes.",
          "Ôn tuần 23 và 25: đúng hạng phòng + mốc giờ xác nhận.",
          undefined,
          ["accessible", "within"],
        ),
        sp(
          "Can we have the sea-view room tomorrow night?",
          "It is subject to availability, madam. I will confirm it by ten o'clock.",
          "Ôn tuần 28: điều kiện thật trước, mốc báo tin sau.",
          undefined,
          ["subject", "availability"],
        ),
        sp(
          "Do you feel ready for busy shifts now?",
          "Yes. I feel confident, and I still ask my manager when I am not sure.",
          "Tự tin nhưng biết giới hạn của mình — câu chốt giai đoạn ba.",
          "manager",
        ),
      ],
      reading: read(
        `Mr and Mrs Lopez want something bigger than their booking. Hai recommends the executive suite: it is bigger, and the rate per night includes breakfast. It is thirty dollars more per night, with tax and service charge. They take it. Housekeeping says the room will be ready within fifteen minutes, and Hai passes that on. He does not say the room number out loud. He points to the key card holder instead. The couple wait in the lobby with a welcome drink.`,
        [
          {
            q: "Phòng executive suite đắt hơn bao nhiêu mỗi đêm?",
            options: ["Ba mươi đô la", "Mười lăm đô la mỗi đêm", "Bốn mươi đô la"],
            correct: 0,
            explanation:
              "'thirty dollars more per night, with tax and service charge' — giá chênh lệch nói bằng con số, gồm cả thuế và phí.",
          },
          {
            q: "Vì sao Hải không đọc to số phòng?",
            options: [
              "Vì Hải chưa biết khách sẽ ở phòng số mấy",
              "Vì khách đã biết rồi",
              "Để người khác không nghe được",
            ],
            correct: 2,
            explanation:
              "'He does not say the room number out loud' — ở quầy luôn có người khác đứng gần.",
          },
          {
            q: "Vì sao Hải nói mốc mười lăm phút là của buồng phòng?",
            options: [
              "Vì buồng phòng mới biết khi nào phòng xong",
              "Vì Hải không muốn nói chuyện quá lâu với khách ở quầy",
              "Vì khách hỏi tên nhân viên buồng phòng",
            ],
            correct: 0,
            explanation:
              "Suy luận: 'Housekeeping says… and Hai passes that on' — lễ tân báo mốc của bộ phận làm việc, không tự hứa thay.",
          },
        ],
      ),
      game: [
        game(
          "Can you tell me my room number again? I forgot.",
          "Of course, madam. It is written here on your key card holder.",
          "Of course, madam. It is write here on your key card holder.",
          "Of course, madam. You are in room 512, on the fifth floor, next to the lift.",
          undefined,
          "Câu cuối đọc to số phòng ở quầy — người lạ có thể nghe được. Câu đúng chỉ vào chỗ ghi số phòng.",
        ),
        game(
          "I am Mr Brown. I lost my key. Give me a new one.",
          "Of course, sir. I will check your passport, then reprogram your key card.",
          "Of course, sir. I will check your passport, then reprograms your key card.",
          "Of course, Mr Brown. Here is a new key. Have a nice evening.",
          undefined,
          "Câu cuối làm thẻ chỉ vì khách nói tên. Câu đúng kiểm tra hộ chiếu trước.",
        ),
      ],
    }),

    L(30, 2, "Explain and Coordinate", "Giải thích và điều phối", {
      vocabulary: [
        c("Late check-out time", "Your late check-out time is two o'clock."),
        c("Pick-up time", "Your pick-up time for the airport is six o'clock."),
        c("Number of nights", "Please check the number of nights on your booking."),
        c("Packed breakfast", "The kitchen can prepare a packed breakfast for an early flight.", [
          "/pækt ˈbrekfəst/",
          "Bữa sáng đóng hộp mang đi",
          "🥡",
        ]),
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
          "Tuần 24: tên khoản phí + lý do thật sau 'because'.",
          undefined,
          ["late", "check", "out", "fee"],
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
          "Đưa điều lễ tân sắp xếp được, và giờ của bữa sáng đoàn.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "What time do we have to leave the room?",
          "Your late check-out time is two o'clock, sir. I will confirm your late check-out in writing.",
          "Ôn tuần 25: giờ đã thỏa thuận + xác nhận bằng văn bản.",
          undefined,
          ["confirm"],
        ),
        sp(
          "My booking says three nights, but I am staying four.",
          "Let me check the number of nights with reservations, sir. Then I will update your booking.",
          "Tuần 26: hỏi đúng bộ phận trước, rồi hứa việc tiếp theo.",
        ),
        sp(
          "When does the shuttle bus to the city centre leave?",
          "The shuttle bus departure time is ten o'clock, sir, from the main lobby.",
          "Ôn tuần 26: giờ khởi hành + điểm đón.",
          undefined,
          ["shuttle", "departure"],
        ),
        sp(
          "Our flight is at nine at night. What about our bags after two?",
          "We can store your bags downstairs until your pick-up time, sir.",
          "Ôn tuần 28: việc lễ tân làm được ngay.",
          undefined,
          ["store", "downstairs"],
        ),
        sp(
          "The Sunrise tour leader is on the phone for you.",
          "Thank you. I will check the rooming list with the tour leader now.",
          "Ôn tuần 26: đúng đầu mối, đúng giấy tờ.",
          "colleague",
          ["rooming", "list"],
        ),
        sp(
          "Bell desk here. The Okoro group has thirty bags.",
          "Thank you, Tuan. Let me coordinate with you: the pick-up time is six o'clock.",
          "Ôn tuần 26: phối hợp với tổ hành lý theo đúng giờ xe đón.",
          "colleague",
          ["coordinate"],
        ),
      ],
      reading: read(
        `Mr Okoro's group checks out tomorrow, and their flight is at nine at night. Sang explains the late check-out time: two o'clock, with a fee, because housekeeping has to prepare the rooms. After two, the hotel can store their bags downstairs. The pick-up time is six o'clock, so Sang coordinates with the bell desk and the driver. The kitchen will also prepare a packed breakfast for two guests who leave early. Mr Okoro thanks Sang for the clear plan.`,
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
              "'because housekeeping has to prepare the rooms' — lý do thật, không phải 'vì quy định'.",
          },
          {
            q: "Vì sao Sang phối hợp với cả tổ hành lý và tài xế?",
            options: [
              "Vì hành lý phải xuống đúng lúc xe đến",
              "Vì tài xế mới không biết đường ra sân bay",
              "Vì đoàn muốn đổi giờ bay",
            ],
            correct: 0,
            explanation:
              "Suy luận: hành lý đang giữ ở tầng dưới phải ra xe đúng giờ đón — hai bộ phận cần cùng một mốc.",
          },
        ],
      ),
      game: [
        game(
          "We leave tomorrow. Who will drive us to the airport?",
          "I will ask the airport driver to be here at six o'clock, sir.",
          "I will ask the airport driver be here at six o'clock, sir.",
          "Please find a taxi outside, sir.",
          undefined,
          "Câu cuối đẩy việc sang khách. Câu đúng nói rõ ai làm và mấy giờ.",
        ),
        game(
          "We leave at four in the morning. Can we have breakfast?",
          "The kitchen can prepare a packed breakfast for you, sir.",
          "The kitchen can prepares a packed breakfast for you, sir.",
          "Sorry, sir. Breakfast starts at seven, so you will have to miss it.",
          undefined,
          "Câu cuối bỏ qua điều lễ tân sắp xếp được. Câu đúng đưa giải pháp: bữa sáng mang đi.",
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
          "I am sorry, the card did not go through. Do you have another card?",
          "Thẻ không thanh toán được: nói 'did not go through', nói nhỏ, không đoán lý do. Sau 'did not' là động từ gốc.",
          "I am sorry, the card did not went through. Do you have another card?",
        ),
        g(
          "Sign.",
          "Please review your final balance, and sign here if it is correct.",
          "Mời khách xem lại trước khi ký. Hai mệnh lệnh lịch sự nối bằng 'and', đều ở dạng gốc.",
          "Please review your final balance, and signs here if it is correct.",
        ),
      ],
      speaking: [
        risk({
          ...sp(
            "Here is my card for the final balance.",
            t3a,
            "Câu phải đúng: nói NHỎ 'did not go through' (không nói 'declined'), không đoán lý do, hỏi thẻ khác.",
            undefined,
            ["card", "another"],
          ),
          alsoAccept: [
            "The card did not go through, sir. Do you have another one?",
            "It did not go through, sir. May I try the other terminal?",
            "I am sorry, sir, the payment did not go through. Do you have another card?",
          ],
        }),
        sp(
          "Why? There is money on it!",
          t3b,
          "Lễ tân không biết và không đoán lý do — chỉ ngân hàng biết.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Fine. Can I pay another way?",
          t3c,
          "Đưa lựa chọn thanh toán, không bình luận gì thêm về thẻ.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "We are a group, but we want to pay separately.",
          "Of course. Each guest can pay individually, with a separate folio.",
          "Việc lễ tân làm được: đồng ý ngay.",
        ),
        sp(
          "You put my friend's dinner on my bill!",
          "Let me check the bill with you now, madam. If it is not your dinner, my supervisor will remove the charge.",
          "Ôn tuần 24: kiểm tra trước, điều kiện thật, đúng người bỏ phí.",
          undefined,
          ["remove", "charge"],
        ),
        sp(
          "Where do I sign?",
          "Please review the final balance first, madam. Then sign here: we need the guest signature.",
          "Mời xem lại trước khi ký, và nói vì sao cần chữ ký.",
        ),
        sp(
          "I am disappointed. Our bathroom was not clean when we arrived.",
          "I understand you are disappointed, madam. I will report the dirty bathroom to housekeeping now.",
          "Ôn tuần 27: công nhận cảm xúc, rồi báo đúng bộ phận.",
          undefined,
          ["disappointed"],
        ),
        sp(
          "Our flight was late. Can you waive the late fee?",
          "I am sorry, I cannot waive the late fee myself. I will ask the duty manager.",
          "Ôn tuần 28: không tự bỏ phí, chuyển đúng người.",
          undefined,
          ["waive"],
        ),
        sp(
          "The street was noisy all night. I could not sleep.",
          "I am sorry, sir. I will block a quieter room for you for tonight.",
          "Ôn tuần 28: giải pháp trong quyền lễ tân, kèm mốc.",
          undefined,
          ["block", "quieter"],
        ),
      ],
      reading: read(
        `At check-out, Mr Grey's card does not go through. Tien says it quietly: "I am sorry, sir, the card did not go through. Do you have another card?" She does not guess why. When he asks, she says that his bank can tell him. He chooses another payment method: cash. He reviews the final balance, pays, and signs the bill. Nobody else in the queue hears anything. Later, Tien tells her supervisor that the card was declined.`,
        [
          {
            q: "Tiên làm gì khi thẻ không thanh toán được?",
            options: [
              "Nói to, rõ ràng để khách và người xung quanh đều nghe",
              "Đoán thẻ hết tiền",
              "Nói nhỏ, hỏi khách có thẻ khác không",
            ],
            correct: 2,
            explanation: "'Tien says it quietly' — chuyện thanh toán là chuyện riêng của khách.",
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
          {
            q: "Vì sao Tiên nói 'did not go through' chứ không nói 'declined'?",
            options: [
              "Vì 'declined' nghe như lỗi của khách, và người khác có thể nghe",
              "Vì máy không hiện chữ 'declined'",
              "Vì khách không hiểu chữ 'declined'",
            ],
            correct: 0,
            explanation:
              "Suy luận: 'Nobody else in the queue hears anything' — câu trung tính giữ thể diện cho khách; 'declined' chỉ dùng khi báo đồng nghiệp.",
          },
        ],
      ),
      game: [
        game(
          "Your machine says my card does not work. Why not?",
          "I am sorry, sir. Your bank can tell you the reason.",
          "I am sorry, sir. Your bank can tells you the reason.",
          "Maybe there is no money on it, sir. That happens a lot with travellers.",
          undefined,
          "Câu cuối đoán lý do — vừa có thể sai vừa làm khách xấu hổ. Câu đúng kín đáo và chỉ đúng nơi biết lý do.",
        ),
        game(
          "The machine just beeped twice. Is my card okay?",
          "I am sorry, sir, the card did not go through. Do you have another card?",
          "I am sorry, sir, the card did not went through. Do you have another card?",
          "Your card is declined, sir. Do you have any money in the bank?",
          undefined,
          "Câu cuối nói 'declined' trước mặt người khác và hỏi chuyện tiền của khách. Câu đúng nói nhỏ, trung tính, và hỏi thẻ khác.",
        ),
      ],
    }),

    L(30, 4, "End of Phase Three", "Kết thúc giai đoạn ba", {
      vocabulary: [
        c("Room preference", "Your room preference is a high floor away from the lift."),
        c("Luggage count", "The luggage count for your group is fifty bags."),
        c("Flight time", "What is your flight time, sir?"),
        c("In-room safe", "Please keep your passport in the in-room safe.", [
          "/ɪn ruːm seɪf/",
          "Két sắt trong phòng",
          "🔐",
        ]),
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
        risk({
          ...sp(
            "I am Mr Tan's wife. Which room is he in?",
            t4a,
            "Câu phải đúng: không cho số phòng, không xác nhận khách có ở đây — dù người hỏi nói là người nhà.",
            undefined,
            ["safety"],
          ),
          alsoAccept: [
            "I am afraid I cannot tell you that, madam, for the safety of our guests.",
            "I am sorry, madam. I cannot tell you that, but I can take a message.",
            "I am afraid I cannot give a room number, madam.",
          ],
        }),
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
        risk({
          ...sp(
            "My watch is gone from the safe in my room!",
            w1,
            "Khách báo mất đồ trong két: xin lỗi, gọi an ninh và quản lý trực NGAY. Không hỏi vặn, không hứa bồi thường.",
            undefined,
            ["calling", "security", "officer", "duty", "manager"],
          ),
          alsoAccept: [
            "I am very sorry, sir. I am calling the duty manager and the security officer now.",
            "I am so sorry, sir. I will call the security officer and the duty manager now.",
          ],
        }),
        sp(
          "Should I look for it again?",
          w2,
          "Giữ nguyên hiện trường cho an ninh — không tự lục tìm.",
          undefined,
          undefined,
          w1,
        ),
        sp(
          "Will the hotel pay for my watch?",
          w3,
          "Bồi thường không phải quyền của lễ tân: không hứa, nói ai sẽ nói chuyện với khách.",
          undefined,
          undefined,
          w2,
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
          "Can you book a car to the airport for me?",
          "Of course, sir. What is your flight time?",
          "Hỏi điều cần biết trước khi hứa giờ xe đón.",
        ),
        sp(
          "What do I do if there is an alarm tonight?",
          "If the fire alarm rings, take the emergency exit and meet us in the car park.",
          "Ôn tuần 28: câu điều kiện an toàn, một hành động rõ ràng.",
          undefined,
          ["fire", "alarm"],
        ),
        sp(
          "Did you write down the guest's watch problem?",
          "Yes. It is in the handover log, with the times.",
          "Ôn tuần 29: sự việc nằm đúng sổ, có giờ.",
          "manager",
          ["handover", "log"],
        ),
        sp(
          "Mr Tan asked us not to give his room number to anyone.",
          "Then I will put Mr Tan on the special attention list now.",
          "Ôn tuần 29: yêu cầu riêng tư của khách đi vào đúng danh sách.",
          "colleague",
          ["special", "attention", "list"],
        ),
      ],
      reading: read(
        `A woman at the desk says she is Mr Tan's wife and asks for his room number. Phong does not give it, and he does not say whether Mr Tan is staying. He says: "If he is staying with us, I can take a message for him." Mr Tan is on the special attention list, so Phong also tells the duty manager. Later, Mr Tan comes down and meets her in the lobby himself. Phong writes the visit in the handover log.`,
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
          {
            q: "Vì sao Phong báo cả quản lý trực?",
            options: [
              "Vì ông Tan có trong danh sách cần lưu ý đặc biệt",
              "Vì người phụ nữ đòi gặp quản lý",
              "Vì Phong không được nói chuyện với khách vãng lai",
            ],
            correct: 0,
            explanation:
              "Suy luận: 'Mr Tan is on the special attention list, so Phong also tells the duty manager' — khách có yêu cầu riêng thì báo người có quyền.",
          },
        ],
      ),
      game: [
        game(
          "I am his wife. Just tell me which room he is in.",
          "I am sorry, madam. I cannot tell you that, but I can take a message.",
          "I am sorry, madam. I cannot telling you that, but I can take a message.",
          "Of course, madam, you are his wife. He is in room 508, so please go straight up.",
          undefined,
          "Câu cuối tin lời người lạ và đưa số phòng — sai quyền riêng tư. Câu đúng từ chối lịch sự và đề nghị nhận lời nhắn.",
        ),
        game(
          "Someone took my watch from the safe in my room!",
          "I am very sorry, sir. I am calling the security officer and the duty manager now.",
          "I am very sorry, sir. I am call the security officer and the duty manager now.",
          "Are you sure, sir? Maybe you put it in your bag. Please look again.",
          undefined,
          "Câu cuối nghi ngờ khách. Câu đúng xin lỗi và gọi ngay những người có quyền xử lý.",
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

/** What the learner can SAY at the end of each week. */
export const FO_P3_CAN_DO: Record<number, string> = {
  23: "Gợi ý hạng phòng theo nhu cầu, so sánh hai hạng phòng, báo chênh lệch giá theo giá niêm yết, và lịch sự từ chối nâng hạng miễn phí.",
  24: "Giải thích phí, thuế VAT, tiền đặt cọc và quy định đăng ký lưu trú bằng 'have to' + lý do thật; từ chối bỏ phí và chuyển quản lý xem xét.",
  25: "Hứa có con số ('within twenty minutes', 'by three o'clock'), báo lại mốc của bộ phận khác, xin lỗi và đưa mốc mới khi trễ; kiểm tra hộ chiếu trước khi làm thẻ phòng.",
  26: "Điều phối đoàn khách với đặt phòng, tổ hành lý, an ninh và tổng đài ('Let me check with…', 'I will ask … to …'); giữ kín số phòng; báo mất hộ chiếu cho đúng người.",
  27: "Nghe hết lời phàn nàn, xin lỗi về điều khách gặp mà không nhận lỗi trước khi kiểm tra, hỏi điều khách chưa nói; với khách mệt, hết phòng hay khách to tiếng thì gọi đúng người.",
  28: "Đề nghị điều lễ tân được làm bằng 'If you like, I can…' (đổi phòng cùng hạng, trả phòng muộn có phí, giữ hành lý); từ chối hoàn tiền, bỏ phí, đồ miễn phí; hướng dẫn thoát hiểm khi chuông báo cháy kêu.",
  29: "Bàn giao ca và báo cáo cấp trên bằng quá khứ tiếp diễn: khách VIP, việc còn mở, tiền quỹ, người lạ hỏi số phòng — ghi đúng sổ, đúng danh sách.",
  30: "Kết hợp tuần 23–29: gợi ý và báo giá, giải thích phí, hứa có mốc, điều phối, xử lý thẻ không thanh toán được, mất đồ trong két và người lạ hỏi số phòng.",
};
