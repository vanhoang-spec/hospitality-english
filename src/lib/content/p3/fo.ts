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
  const t1b = "It is one million dong more per night, madam, with tax and service charge.";
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
          "Hi Nam. The sea-view room for Mr and Mrs Bauer is clean now.",
          "Thank you, Lan. I will give the sea-view room to Mr and Mrs Bauer.",
          "Nói với đồng nghiệp buồng phòng: cảm ơn, rồi báo phòng sẽ giao cho ai.",
          "colleague",
        ),
      ],
      reading: read(
        `Mr and Mrs Bauer arrive for their wedding anniversary. Nam recommends the sea-view room: "It has a balcony and a lovely view." Mrs Bauer asks about the price. Nam says it is one million dong more per night, with tax and service charge. That is more than they want to spend, so Nam recommends the deluxe room instead. They choose it.`,
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
              "Tự giảm một triệu đồng cho khách vì đây là dịp đặc biệt",
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
          "I recommend you the sea-view room, madam. It has a lovely view.",
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
              "Đắt hơn phòng gia đình một triệu đồng mỗi đêm",
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
          "Please ask. I will be in my room until six.",
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
  const t1c = "It is half the room price until six o'clock, madam. That is our hotel policy.";
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
        sp(
          "Is one family room cheaper than two deluxe rooms?",
          "Yes, madam. One family room is cheaper than two deluxe rooms.",
          "Ôn tuần 23: so sánh hai hạng phòng bằng 'cheaper than'.",
          undefined,
          ["family", "deluxe"],
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
            "It is only a deposit for incidental charges, madam.",
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
          "Why does my bill show VAT? I paid the room price.",
          "The room price includes VAT, sir. The bill shows it because the law asks us to.",
          "VAT đã nằm trong giá phòng; hóa đơn ghi riêng vì luật yêu cầu — một câu chuyện nhất quán với lời báo giá.",
        ),
        sp(
          "I am in Room 512, and I did not take anything from the minibar.",
          "The minibar charge comes from the morning check, madam. I will ask housekeeping to check it again.",
          "Không cãi, không tự xóa phí: nói phí từ đâu ra, rồi nhờ đúng bộ phận kiểm lại.",
        ),
        sp(
          "Housekeeping, this is Lan.",
          "Hi Lan, it is Nam at the desk. Can you check the minibar in Room 512 again?",
          "Gọi nội bộ: xưng tên, bộ phận, rồi MỘT việc cụ thể kèm số phòng (Room 512) để buồng phòng đi đúng chỗ.",
          "colleague",
          ["minibar", "room"],
        ),
        sp(
          "We did not come last night, so why is there a no-show charge?",
          "There is a no-show charge because the room was ready for you all night, sir.",
          "Giải thích bằng sự việc, không trách khách.",
        ),
        sp(
          "Are the top-floor rooms more expensive?",
          "Yes, sir. The top-floor room and the balcony room have a higher rate.",
          "Ôn tuần 23: nói đúng tên hạng phòng và so sánh giá, không bịa con số.",
          undefined,
          ["top", "balcony"],
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
          "Is VAT extra, or is it in the room price?",
          "It is in the room price, sir. The bill only shows it separately.",
          "It is in the room price, sir. The bill only show it separately.",
          "It is extra, sir. Every hotel adds it at the end.",
          undefined,
          "Câu cuối nói sai: giá phòng đã gồm VAT và phí phục vụ. Câu đúng nói VAT nằm trong giá, hóa đơn chỉ ghi riêng.",
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
          "You only pay the rate difference, madam: one million dong more per night.",
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
          "I understand, sir. My manager will review the no-smoking penalty with you.",
          "Không buộc tội, không tự bỏ phí: người có quyền sẽ xem lại cùng khách.",
        ),
        sp(
          "Why is there a damage charge on my bill?",
          "Housekeeping reported a broken lamp, madam. The manager will explain the damage charge.",
          "Sự việc + người có quyền giải thích. Không nói 'bạn làm vỡ'.",
        ),
        sp(
          "Does the club floor room include breakfast?",
          "Yes, madam. The club floor room includes breakfast, but the garden-view room does not.",
          "Ôn tuần 23: so sánh hai hạng phòng bằng một điểm cụ thể.",
          undefined,
          ["club", "garden"],
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
  const t2b =
    "Yes, madam. We are going to send your bags up by three o'clock, when your room is ready.";
  const t2c = "Then your room and your bags will be ready when you come back, madam.";
  const t3a =
    "It depends on tomorrow's arrivals, madam. I will confirm your late check-out by eleven o'clock.";
  const t3b = "Then we can hold your luggage until your flight, madam.";
  const t3c = "Of course. I will book your airport transfer for six o'clock and confirm it today.";
  const t4a = "I am very sorry, madam. I will check the room status straight away.";
  const t4b = "Housekeeping says it will be ready within ten minutes, madam.";
  const t4c = "Yes, madam. I will bring your key cards to you in the lobby myself.";
  const k1 = "Of course, sir. May I check your passport first?";
  const k2 =
    "Then the duty manager will open the room with you, sir. Please show your passport there.";
  const k3 =
    "The duty manager is coming now, sir. When she sees your passport, I will reprogram your key card.";
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
          "Let me check the room status, madam. I can give you a room on a higher floor.",
          "Chọn tầng là việc của lễ tân, không phải của buồng phòng: xem tình trạng phòng, rồi nói điều mình làm được.",
        ),
        sp(
          "We are travelling with our baby. Can we have a cot in the room?",
          "Of course, madam. I will ask housekeeping to prepare your room with a baby cot.",
          "Việc lễ tân nhận được: nhờ buồng phòng chuẩn bị phòng — nói rõ bộ phận nào làm, không tự hứa giờ thay họ.",
          undefined,
          ["prepare", "room"],
        ),
        sp(
          "Can we wait for a poolside room instead?",
          "A poolside room is one million dong more per night, madam. Housekeeping says it can be ready by one.",
          "Ôn tuần 23: hạng phòng khách muốn + chênh lệch giá + mốc mà buồng phòng đưa ra.",
          undefined,
          ["poolside"],
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
          "Kế hoạch đã sắp xếp: 'going to' + mốc giờ cụ thể — hành lý lên đúng lúc phòng xong, không sớm hơn.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Good. We will be back around five.",
          t2c,
          "Chốt lại theo giờ của khách, nhắc cả phòng lẫn hành lý.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "This is Room 304. Can someone help me with these heavy bags?",
          "Of course, sir. I will send a bellman up within ten minutes.",
          "Đồng ý + người làm + mốc giờ.",
        ),
        sp(
          "Bell desk, Tuan speaking.",
          "Hi Tuan, it is Nam. Please send a bellman up to Room 304 within ten minutes.",
          "Gọi nội bộ: MỘT việc, đúng phòng (Room 304), và đúng mốc giờ mình vừa hứa với khách.",
          "colleague",
          ["bellman", "room"],
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
        sp(
          "We arrive at seven tomorrow morning with our son.",
          "Thank you, madam. There is an early check-in fee before ten, and a rollaway bed fee for each night.",
          "Ôn tuần 24: cảm ơn và gọi khách trước, rồi báo trước hai khoản phí khách sẽ gặp, đúng mốc giờ của chính sách.",
          undefined,
          ["early", "rollaway"],
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
          "Our flight is at nine at night. Can you book us a car for six?",
          t3c,
          "Một việc, một mốc giờ, và nói khi nào xác nhận.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "I need a taxi to the old town in ten minutes, please.",
          "Of course, sir. I will arrange a taxi for you in ten minutes.",
          "Đồng ý + mốc giờ.",
        ),
        sp(
          "Our taxi is at five tomorrow. Can I get the invoice by email by nine?",
          "Yes, sir. With express check-out, I will email your invoice by nine o'clock.",
          "Trả phòng nhanh: nói khách không cần làm gì, và khi nào nhận hóa đơn.",
        ),
        sp(
          "Please call me when you know about the late check-out.",
          "Of course, madam. I will call your room by eleven o'clock with the answer.",
          "Khách đang chờ tin: hứa giờ báo, và báo ĐÚNG tin khách đang chờ.",
        ),
        sp(
          "Can we move to the junior suite tomorrow?",
          "Let me check if a junior suite is available, sir. You would only pay the rate difference.",
          "Ôn tuần 23–24: kiểm tra phòng trống trước, rồi mới báo tiền chênh lệch giá.",
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
            "Of course, sir. May I have your passport first?",
            "Of course, sir. I will check your passport, then make you a new key card.",
            "Of course, sir. I will check your passport, then make you another key card.",
          ],
        }),
        risk({
          ...sp(
            "My passport is in the room. I am in a hurry.",
            k2,
            "Vẫn không làm thẻ khi chưa thấy giấy tờ, và không để nhân viên hành lý mở phòng cho người chưa xác minh: quản lý trực mở phòng cùng khách, khách cho xem hộ chiếu ở đó.",
            undefined,
            ["duty", "manager", "open", "room", "show", "passport"],
            k1,
          ),
          alsoAccept: [
            "Then the duty manager will go up and open the room with you, sir. You can show your passport there.",
            "Then the security officer will open the room with you, sir. Please show your passport there.",
          ],
        }),
        sp(
          "Fine. What happens after that?",
          k3,
          "Nói rõ thứ tự: quản lý trực đến, thấy hộ chiếu, rồi lễ tân mới làm lại thẻ.",
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
          "You promised us the penthouse suite tonight, but it is still not ready!",
          "I am very sorry, madam. I will check the penthouse suite with housekeeping straight away.",
          "Ôn tuần 23: xin lỗi, giữ đúng việc khách đang chờ, và hỏi đúng bộ phận ngay.",
          undefined,
          ["penthouse", "suite"],
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
  const t3a =
    "Let me check with housekeeping first, sir. If both rooms are ready, you can swap rooms.";
  const t3b = "Of course, sir. I can split the bill, so each of you pays for your own room.";
  const t3c = "I will reprogram both key cards and adjust the rooming list, sir.";
  const s1 = "Thank you, madam. I will ask security to check that floor now.";
  const s2 = "Please wait in your room, madam. The security officer will call you.";
  const s3 = "He is on his way now, madam. I will call you when he is there.";
  const t4a =
    "Of course, madam. I have a short announcement: group breakfast starts at seven o'clock.";
  const t4b = "The shuttle bus departure time is eight o'clock, from the main lobby.";
  const t4c = "I will ask the operator to call each room at six-thirty, madam.";
  const q1 = "I am very sorry, sir. I will check with housekeeping and tell the duty manager now.";
  const q2 =
    "The duty manager will explain the next steps, sir: the police report and your embassy.";
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
        sp(
          "Some of our guests arrive after midnight. Will you keep their rooms?",
          "Yes, madam. Their rooms are guaranteed, so we will hold them for a late arrival.",
          "Ôn tuần 24: phòng có bảo lãnh nghĩa là khách sạn GIỮ phòng cho khách đến muộn, không hủy.",
          undefined,
          ["hold", "late"],
        ),
        sp(
          "And if someone does not come at all?",
          "Then there is a no-show charge for that room, madam.",
          "Ôn tuần 24: mặt kia của bảo lãnh — phòng được giữ cả đêm, nên khách không đến thì vẫn bị phí không đến.",
          undefined,
          ["show", "charge"],
        ),
        sp(
          "Do you need every guest's passport, even for one night?",
          "Yes, madam. The guest registration rule is the law, so we need every passport.",
          "Ôn tuần 24: lý do thật là luật, không phải quy định riêng của khách sạn.",
          undefined,
          ["registration", "rule"],
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
            "I am sorry, sir. For his safety, I cannot tell you that.",
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
        sp(
          "Hello, this is Mr Kim's office. Has he checked in yet?",
          "I am sorry, sir, I cannot give out guest information on the phone. I can take a message.",
          "Người gọi điện tự xưng là văn phòng của khách: vẫn KHÔNG xác nhận khách đã nhận phòng hay chưa. Đề nghị nhận lời nhắn.",
          undefined,
          ["take", "message"],
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
        sp(
          "One guest broke a lamp in her room last night.",
          "Is she all right, madam? The manager will check the lamp before any damage charge.",
          "Ôn tuần 24: hỏi khách có bị thương không TRƯỚC, rồi mới nói tới phí: không buộc tội, có kiểm tra rồi mới có phí, và người có quyền quyết.",
          undefined,
          ["damage", "charge"],
        ),
        sp(
          "Is VAT included in our group price?",
          "Yes, madam. The group price includes VAT and service charge.",
          "Ôn tuần 24: một câu chuyện nhất quán — giá đã gồm VAT và phí phục vụ.",
          undefined,
          ["vat"],
        ),
        sp(
          "Some of our guests smoke. Is that a problem?",
          "Smoking is only allowed outside, madam. Our policy has a no-smoking penalty for the rooms.",
          "Ôn tuần 24: nói quy định và hệ quả trước khi có chuyện.",
          undefined,
          ["smoking", "penalty", "policy"],
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
          "Hỏi đúng bộ phận TRƯỚC, rồi mới cho phép — kèm điều kiện thật: cả hai phòng phải sẵn sàng.",
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
        sp(
          "Our director wants a better room than the group.",
          "I recommend the club floor room for her, madam. It includes breakfast in the lounge.",
          "Ôn tuần 23: gợi ý một hạng phòng và nêu một lợi ích cụ thể.",
          undefined,
          ["club", "floor"],
        ),
        risk({
          ...sp(
            "I am on the fifth floor. A man is walking along the corridor and trying the doors.",
            s1,
            "Người lạ thử cửa phòng: lễ tân KHÔNG tự lên xem. Giao ngay cho an ninh.",
            undefined,
            ["security", "floor"],
          ),
          alsoAccept: [
            "I will ask the security officer to check your floor now, madam.",
            "Thank you, madam. I am calling the security officer now.",
            "Thank you, madam. I will ask the security officer to check that floor now.",
            "Thank you, madam. I will ask security to check your floor now.",
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
          "Không hứa giờ thay an ninh: nói việc đang xảy ra, và mình sẽ gọi lại.",
          undefined,
          undefined,
          s2,
        ),
        sp(
          "Security, this is Hung.",
          "Hi Hung, it is Nam at the desk. A guest reports a man trying the doors on the fifth floor.",
          "Gọi nội bộ: ai gọi, ở đâu (đúng tầng: the fifth floor), chuyện gì — ngắn, đủ để an ninh đi ngay.",
          "colleague",
          ["floor", "doors"],
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
          "Operator, this is Thu. What time are the calls?",
          "Hi Thu. Please call every Sunrise room at six-thirty tomorrow morning.",
          "Gọi nội bộ: MỘT việc, đúng nhóm phòng, đúng giờ.",
          "colleague",
        ),
        sp(
          "Two of our guests have to leave at seven, before the shuttle bus.",
          "I can arrange a taxi for them at seven o'clock, madam.",
          "Ôn tuần 25: việc lễ tân làm được, đúng giờ khách cần.",
          undefined,
          ["taxi"],
        ),
        sp(
          "One of our guests is not coming today. Do we pay for her room?",
          "Let me check the cancellation fee in your group contract, madam.",
          "Ôn tuần 24: phí hủy của đoàn nằm trong hợp đồng đoàn, không theo giá khách lẻ — kiểm tra trước, không tự nêu con số.",
          undefined,
          ["cancellation", "fee"],
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
          "Nói việc quản lý trực phụ trách, không hứa kết quả thay họ.",
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
  const t3b = "Thank you, sir. I will ask engineering to check the air-conditioning noise now.";
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
        sp(
          "My message for my wife never reached her!",
          "I apologise, sir. I will deliver your message to her straight away.",
          "Ôn tuần 25: xin lỗi, rồi làm ngay đúng việc bị lỡ.",
          undefined,
          ["deliver", "message"],
        ),
        sp(
          "Is the room for my parents ready too?",
          "Housekeeping is going to prepare their room next, madam. I will tell you when it is ready.",
          "Ôn tuần 25: 'going to' cho việc bộ phận khác đã lên lịch — báo lại, không tự hứa giờ. Phòng của bố mẹ khách nên là their room.",
          undefined,
          ["going", "prepare"],
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
          "I am sorry you waited, sir. Two groups arrived together, so there was a long check-in queue.",
          "Xin lỗi về điều khách gặp TRƯỚC, rồi mới nêu lý do thật, không đổ lỗi cho ai.",
        ),
        sp(
          "My friend and I shared the room. Can we pay separately?",
          "Of course, sir. I can split the bill for you now.",
          "Ôn tuần 26: tách hóa đơn là việc lễ tân làm được — đồng ý ngay.",
          undefined,
          ["split", "bill"],
        ),
        sp(
          "My booking has the wrong dates on it.",
          "I am sorry, madam. Let me check availability for your dates, and then I will update your booking.",
          "Ôn tuần 25: kiểm tra phòng trống cho đúng ngày trước, rồi mới cập nhật đặt phòng.",
          undefined,
          ["update", "booking"],
        ),
        sp(
          "Is my new room ready now?",
          "Let me check the room status for you now, madam.",
          "Ôn tuần 25: kiểm tra trên hệ thống trước khi trả lời.",
          undefined,
          ["status"],
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
          "After a night like this, I want to leave early tomorrow without waiting.",
          "Of course, sir. With express check-out, you can leave your key in the box.",
          "Ôn tuần 25: dịch vụ lễ tân làm được để khách không phải chờ.",
          undefined,
          ["express"],
        ),
        sp(
          "I am in Room 715, and my key card does not open the door again.",
          "I am sorry, sir. Was it at your room door or in the lift?",
          "Hỏi một câu lựa chọn để biết đúng chỗ hỏng.",
        ),
        sp(
          "Engineering, Hai speaking.",
          "Hi Hai, it is Nam at the desk. Room 715 has a key card failure at the door.",
          "Gọi nội bộ: ai gọi + đúng phòng (Room 715) + đúng sự cố, ngắn gọn.",
          "colleague",
          ["room", "door"],
        ),
        sp(
          "Housekeeping, Lan here.",
          "Hi Lan, the guest in Room 306 reports a dirty bathroom. Can someone go up now?",
          "Chuyển đúng lời khách cho đúng bộ phận, kèm số phòng (Room 306) và một việc cụ thể.",
          "colleague",
          ["room", "bathroom"],
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
          "This is Nam at the desk. We have an overbooking mix-up: a guest with a booking has no room.",
          "Báo cấp trên: ai gọi, chuyện gì — ngắn và đủ.",
          "manager",
        ),
        risk({
          ...sp(
            "I had a few drinks, so what? Give me my key, or I will break something!",
            "I understand, sir. I am calling the duty manager now.",
            "Khách say, to tiếng, đe dọa: không cãi, không đưa chìa khóa, không đối mặt một mình. Gọi quản lý trực (hoặc an ninh) ngay.",
            undefined,
            ["calling", "duty", "manager"],
          ),
          alsoAccept: [
            "I will help you, sir. I am calling the security officer now.",
            "I want to help you, sir. I am calling the security officer now.",
            "I understand, sir. I am calling security now.",
          ],
        }),
        sp(
          "Nobody called me this morning! I missed my tour bus.",
          "I am very sorry, sir. I will report the missed wake-up call and call your tour company now.",
          "Khách mất cả chuyến tour vì lỗi của khách sạn: xin lỗi TRƯỚC. Rồi không đổ lỗi, không chỉ 'kiểm tra danh sách': báo lên, và gọi ngay công ty tour để giúp khách.",
        ),
        sp(
          "This is Room 609. The wifi in my room keeps stopping.",
          "I am sorry, madam. I will ask our IT team now and call you with their time.",
          "Không tự hứa giờ thay bộ phận khác: hỏi IT trước, rồi báo lại mốc của họ.",
        ),
        sp(
          "IT desk, Minh speaking.",
          "Hi Minh, the guest in Room 609 reports a weak wifi signal. When can you check it?",
          "Gọi nội bộ: đúng phòng (Room 609) + sự cố + hỏi mốc giờ của bộ phận đó, để báo lại cho khách.",
          "colleague",
          ["room", "wifi"],
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
  const t1a =
    "I am sorry the music disturbs you, madam. If you like, I can arrange a room move for you.";
  const t1b = "There are two options, madam: the tenth floor or the garden side.";
  const t1c = "Either option is quiet, madam. If you prefer a view, I recommend the tenth floor.";
  const t1d =
    "The bellman can move your bags at six o'clock, madam. Your new key will be ready then.";
  const t2a =
    "I can arrange late check-out until two, subject to availability. There is a small fee, madam.";
  const t2b = "Then we can store your bags downstairs until your taxi comes, madam.";
  const t2c = "Of course, madam. I will send a bellman up at two o'clock.";
  const t3a =
    "I am sorry about your night, sir, but I cannot offer a refund. My manager will call you.";
  const t3b = "If you like, I can arrange a room move to a quieter floor today.";
  const t3c =
    "I am sorry, sir, I cannot offer a free breakfast. Only the duty manager can offer a goodwill gesture.";
  const t4a = "If it happens again, please call me. I will send engineering to the room.";
  const t4b = "Then I will block a quieter room for you for tomorrow night, sir.";
  const t4c = "Of course, sir. I can show you the room at five o'clock.";
  const f1 = "Please take the emergency exit now, madam. Do not take the lift.";
  const f2 = "No, madam. Please leave your bags and go to the exit now.";
  const f3 = "Please go to the car park in front of the hotel. Our staff will meet you there.";
  return [
    L(28, 1, "If You Like, I Can…", "Nếu quý khách muốn, tôi có thể…", {
      vocabulary: [
        c("Disturb", "I am sorry the noise disturbs you, sir.", ["/dɪˈstɜːb/", "Làm phiền", "🔇"]),
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
          "Xin lỗi đúng điều làm phiền khách (disturbs — chủ ngữ số ít thêm -s), rồi đề nghị điều lễ tân làm được: chuyển sang phòng cùng hạng.",
          undefined,
          ["disturbs", "room", "move"],
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
        sp(
          "My colleague booked separately. Can we be on the same floor?",
          "If there is a room near hers, I can adjust your booking.",
          "Ôn tuần 26: câu điều kiện + việc lễ tân làm được.",
          undefined,
          ["adjust"],
        ),
        sp(
          "My father uses a wheelchair, and our room has a step into the bathroom.",
          "I am sorry, sir. If an accessible room is available, I can move you there today.",
          "Ôn tuần 23: gọi đúng tên hạng phòng khách cần, và lời hứa đi sau điều kiện thật (còn phòng).",
          undefined,
          ["accessible", "room"],
        ),
        sp(
          "We are moving to the tenth floor. Can the new room have a baby cot?",
          "Of course, madam. I will ask housekeeping to prepare your room with a baby cot before you move.",
          "Ôn tuần 25: việc lễ tân nhận được, giao đúng bộ phận làm — không tự hứa giờ thay buồng phòng.",
          undefined,
          ["prepare", "room"],
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
          "Extend your stay by one night",
          "If the room is available, I can extend your stay by one night.",
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
          "If the room is available, I can extend your stay by one night.",
          "Câu điều kiện loại 1: 'If + hiện tại, … can + động từ gốc'. 'the room' số ít → 'is'.",
          "If the room are available, I can extend your stay by one night.",
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
          "Let me check if the room is available, sir. If it is, I can extend your stay by one night.",
          "Kiểm tra phòng trống TRƯỚC; lời hứa đi sau điều kiện thật.",
        ),
        sp(
          "Can you also get us a car to the airport?",
          "Of course. I will book your airport transfer for nine o'clock.",
          "Ôn tuần 25: khách đã nói muốn gì thì làm luôn, không nói 'If you like'.",
          undefined,
          ["airport", "transfer"],
        ),
        sp(
          "My colleagues and I arrive late tonight. Is there a quick way to check in?",
          "If you send the names now, we can prepare an express check-in for your group.",
          "Ôn tuần 26: câu điều kiện + dịch vụ dành cho đoàn.",
          undefined,
          ["express"],
        ),
        sp(
          "We need to know tonight. Can we check out late tomorrow?",
          "Let me check availability, madam. I will confirm your late check-out tonight.",
          "Ôn tuần 25: kiểm tra phòng trống trước, rồi hứa xác nhận đúng mốc khách cần.",
          undefined,
          ["confirm", "late"],
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
          "I can arranges late check-out until two, sir. There is a small fee.",
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
            "I am sorry, I cannot offer a refund. My manager will call you.",
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
            "I am sorry, sir, I cannot give you a free breakfast. I will ask the duty manager.",
          ],
        }),
        risk({
          ...sp(
            "I checked out at two. Please waive the late fee for me.",
            "I am sorry, sir, I cannot waive the late fee. I will ask the duty manager.",
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
          "I am sorry, madam, I cannot give a complimentary upgrade myself. I can ask my manager.",
          "Từ chối điều không thuộc quyền mình, rồi chuyển đúng người.",
        ),
        sp(
          "My booking says two million dong, but the bill says more.",
          "Let me check your booking now, sir. If it shows two million dong, my supervisor will correct the room rate.",
          "Kiểm tra trước, không nghi ngờ khách: điều kiện thật trước, người sửa sau.",
        ),
        sp(
          "There is a double charge for my laundry.",
          "Let me check the double charge with my supervisor, madam. If it is a mistake, she will remove the charge.",
          "Ôn tuần 24 và 27: kiểm tra trước, điều kiện thật, và người có quyền xóa phí là giám sát — không phải lễ tân.",
          undefined,
          ["double", "charge", "remove"],
        ),
        sp(
          "My bill and my booking show different dates.",
          "Let me check the discrepancy with reservations, madam. If it is wrong, my supervisor will correct it.",
          "Ôn tuần 26: gọi đúng tên vấn đề, hỏi đúng bộ phận, đúng người sửa.",
          undefined,
          ["discrepancy"],
        ),
        sp(
          "Please put my lunch on Room 508. My friend is staying there.",
          "I am sorry, sir. Only the guest in that room can sign for it.",
          "Người khác xin ghi nợ vào phòng của khách: KHÔNG nhận. Chỉ khách ở phòng đó mới được ký — từ chối lịch sự, không nói thêm gì về phòng đó.",
          undefined,
          ["guest", "sign"],
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
          "This is Room 815. Engineering fixed the air conditioner, but what if it is noisy again?",
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
          "Engineering, this is Hai.",
          "Hi Hai, if Room 815 calls about the air conditioner again, please go up at once.",
          "Gọi nội bộ bằng câu điều kiện: nếu chuyện lặp lại thì ai làm gì — kèm đúng số phòng (Room 815).",
          "colleague",
          ["room", "again"],
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
            "Please take the emergency exit now, madam. Do not take the elevator.",
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
          "I am very sorry, sir. If the weak wifi signal comes back, please call me, and I will send IT.",
          "Ôn tuần 27: sự cố lặp lại lần hai — xin lỗi TRƯỚC, rồi câu điều kiện và đúng bộ phận.",
          undefined,
          ["weak", "wifi", "signal"],
        ),
        sp(
          "If there is a fire alarm, who tells my group?",
          "If there is an alarm, we make an announcement, and you are our point of contact.",
          "Ôn tuần 26: câu điều kiện an toàn cho đoàn — ai thông báo, ai là đầu mối.",
          undefined,
          ["announcement", "point", "contact"],
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
  const t2a =
    "Yes. I was checking the arrival list when a visitor asked for Mrs Sato's room number.";
  const t2b = "I did not tell him the number. I noted it in the log.";
  const t2c = "It was Mrs Sato. She is on the special attention list.";
  const t3a = "The occupancy figure is not final yet. The night auditor is checking it.";
  const t3b = "I have counted the cash float, and it is correct.";
  const t3c = "I have not checked the key inventory yet. Please count it before midnight.";
  const t4a = "I wrote them on the wake-up call list, and I checked them twice.";
  const t4b =
    "Room 410 is on the out-of-order room list. Engineering was fixing the shower when I left.";
  const t4c = "Everything else is in the handover log, with the times.";
  const cf = "I reported it to the night manager, and I noted it in the log.";
  return [
    L(29, 1, "Handing Over the Shift", "Bàn giao ca", {
      vocabulary: [
        c("Shift", "My shift ends at three o'clock."),
        c("VIP guest", "The general manager will greet our VIP guests at eight.", [
          "/ˌviː aɪ ˈpiː ɡest/",
          "Khách VIP, khách quan trọng",
          "⭐",
        ]),
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
          "Did anything change for Mr Brown today?",
          "Yes. Mr Brown had a room move to the tenth floor this afternoon.",
          "Ôn tuần 28: việc đã đổi trong ca, nói rõ để ca sau không gửi khách về phòng cũ.",
          "colleague",
          ["room", "move"],
        ),
        sp(
          "Anything new from the Sunrise group?",
          "Yes. Two guests are going to swap rooms tomorrow, so please coordinate with housekeeping.",
          "Ôn tuần 25–26: việc đã lên kế hoạch, nói bằng 'going to', rồi việc ca sau cần phối hợp với buồng phòng.",
          "colleague",
          ["going", "swap", "coordinate"],
        ),
        sp(
          "Any complaints today?",
          "Two guests reported a noisy corridor, and one guest had a key card failure.",
          "Ôn tuần 27: báo lại phàn nàn bằng đúng tên sự việc.",
          "colleague",
          ["noisy", "corridor", "failure"],
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
          "Is anything still waiting for Room 418?",
          "There is one pending request: an extra pillow. I asked housekeeping this morning.",
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
        sp(
          "What were you doing when the overbooking mix-up started?",
          "I was checking the arrival list when I saw the overbooking mix-up.",
          "Ôn tuần 27: quá khứ tiếp diễn + đúng tên sự việc.",
          "manager",
          ["overbooking"],
        ),
        sp(
          "Was anyone hurt on your shift?",
          "Yes. A guest was feeling dizzy in the lobby, so I called first aid.",
          "Ôn tuần 27: quá khứ tiếp diễn + việc mình đã làm.",
          "manager",
          ["first", "aid"],
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
          "Not yet. The night auditor is still checking the occupancy figure.",
          "Báo cấp trên đúng tình trạng hiện tại — không đoán con số.",
          "manager",
        ),
        sp(
          "Did the duty manager speak to Mr Ward about the late fee?",
          "Yes. He offered Mr Ward a goodwill gesture, and I noted it in the log.",
          "Ôn tuần 28: ai đã quyết, quyết gì, và đã ghi lại.",
          "manager",
          ["goodwill", "gesture"],
        ),
        sp(
          "Did anything go wrong this morning?",
          "Yes. One guest had a missed wake-up call, so I called his tour company.",
          "Ôn tuần 27: báo sự cố và việc đã làm để giúp khách.",
          "manager",
          ["missed", "wake"],
        ),
        sp(
          "What happened with Mr Ward's bill?",
          "He had a wrong room rate, and my supervisor corrected it before he left.",
          "Ôn tuần 27: báo đúng tên vấn đề và ai đã sửa.",
          "manager",
          ["wrong", "rate"],
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
          "Yes, I have counting it, and it is correct.",
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
          "And Room 410 on the fourth floor?",
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
          "Is the Sunrise arrival time written down?",
          "Yes, it is in the handover log. Their key packets are ready.",
          "Ôn tuần 26: chỉ đúng nơi ghi thông tin, kèm việc đã chuẩn bị.",
          "colleague",
          ["key", "packets"],
        ),
        sp(
          "Any open issues for the bell desk?",
          "One guest has missing luggage. The bell desk was checking the airport list this morning.",
          "Ôn tuần 27: việc còn mở + ai đang làm.",
          "colleague",
          ["missing", "luggage"],
        ),
        sp(
          "Is engineering still busy?",
          "Yes. They were fixing an air-conditioning noise when I left.",
          "Ôn tuần 27: quá khứ tiếp diễn cho việc còn dở khi mình rời ca.",
          "colleague",
          ["air", "conditioning", "noise"],
        ),
        sp(
          "Did Room 305 ask for an early wake-up call?",
          "Yes. It is on the wake-up call list, with the time.",
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

// ── Week 30 — Checkpoint: revising weeks 23-29 ──────────────────────────
// The checkpoint week teaches no new words. Its cards re-present headwords
// of weeks 23-29 (same word, same gloss), each said at least twice here, so
// the words a learner met once are produced again before the test.
function week30(): LessonContent[] {
  const a1 = "I recommend the executive suite, madam. It is bigger than the deluxe room.";
  const a2 = "If you prefer, the sea-view room is another option. It is cheaper.";
  const a3 = "Of course, madam. Housekeeping says it will be ready within fifteen minutes.";
  const d1 =
    "I can arrange late check-out until two, sir, subject to availability. There is a late check-out fee.";
  const d2 = "We can store your bags downstairs until six o'clock, sir.";
  const d3 = "I will ask the bell desk to bring your bags to the car at six.";
  const h1 = "I am sorry, sir, the card did not go through. Do you have another card?";
  const h2 = "I am sorry, I do not know the reason, sir. Your bank can tell you.";
  const h3 = "Either is fine, sir. I can take cash or another card.";
  const t4a = "I am sorry, madam. For his safety, I cannot tell you that.";
  const t4b = "I understand, madam. If he is staying with us, I can take a message for him.";
  const t4c = "Thank you, madam. Please take a seat while you wait.";
  const w1 = "I am very sorry, sir. I am calling security and the duty manager now.";
  const w2 = "Please do not touch the in-room safe until security arrives, sir.";
  const w3 = "I am sorry, I cannot promise that, sir. The duty manager will speak with you.";
  return [
    L(30, 1, "Recommend and Promise", "Gợi ý và cam kết", {
      vocabulary: [
        c("Confident", "I feel confident at the desk on a busy night now."),
        c("Disturb", "I am sorry the noise disturbs you, sir.", ["/dɪˈstɜːb/", "Làm phiền", "🔇"]),
        c("Option", "There are two options for your room tonight."),
        c("Complimentary upgrade", "Only a manager can give a complimentary upgrade.", [
          "/ˌkɒmplɪˈmentri ˈʌpɡreɪd/",
          "Nâng hạng phòng miễn phí",
          "🎁",
        ]),
      ],
      grammar: [
        g(
          "Big room good.",
          "I recommend the executive suite, sir. It is bigger than the deluxe room.",
          "Tuần 23: 'I recommend' + so sánh hơn. big → bigger, không nói 'more bigger'.",
          "I recommend the executive suite, sir. It is more bigger than the deluxe room.",
        ),
        g(
          "Want other? Take this.",
          "If you prefer, the sea-view room is another option, madam.",
          "Tuần 28: 'If you prefer' khi khách chưa nói mình muốn gì. 'you' → 'prefer', không thêm -s.",
          "If you prefers, the sea-view room is another option, madam.",
        ),
      ],
      speaking: [
        sp(
          "We would like something bigger than our booking.",
          a1,
          "Tuần 23: gợi ý một hạng phòng + một lý do so sánh.",
          undefined,
          ["executive", "suite"],
        ),
        sp(
          "That is more than we want to spend. Is there another option?",
          a2,
          "Tuần 28: khách chưa chọn — đưa một lựa chọn khác bằng 'If you prefer', kèm lý do.",
          undefined,
          undefined,
          a1,
        ),
        sp(
          "Yes, the sea-view room, please. Is it ready?",
          a3,
          "Tuần 25: báo mốc của buồng phòng bằng con số — không tự hứa.",
          undefined,
          undefined,
          a2,
        ),
        risk({
          ...sp(
            "I am Mr Brown in 604. I lost my key. Give me a new one, please.",
            "Of course, sir. I will check your passport, then make you another key card.",
            "Câu phải đúng: kiểm tra hộ chiếu TRƯỚC, rồi mới làm thẻ — dù khách nói đúng tên và số phòng. Thẻ đã MẤT thì làm thẻ khác (make you another key card); thẻ hỏng mới là reprogram.",
            undefined,
            ["check", "passport", "another", "key", "card"],
          ),
          alsoAccept: [
            "Of course, sir. I will check your passport, then make you a new key card.",
            "Of course, sir. May I see your passport first? Then I will make you a new key card.",
            "Of course, sir. May I check your passport first?",
            "Of course, sir. May I see your passport first?",
            "Of course, sir. May I have your passport first?",
          ],
        }),
        sp(
          "My key card stopped working. I kept it next to my phone.",
          "May I see your passport, sir? Then I will reprogram your key card.",
          "Tuần 25: thẻ HỎNG (không mất) thì reprogram — nhưng vẫn xem hộ chiếu trước.",
          undefined,
          ["passport", "reprogram", "key", "card"],
        ),
        sp(
          "The people next door are very loud tonight.",
          "I am sorry they disturb you, madam. I will ask security to speak to them now.",
          "Tuần 28: xin lỗi đúng điều làm phiền khách, rồi giao đúng người — lễ tân không tự lên nói chuyện.",
          undefined,
          ["disturb", "security"],
        ),
        sp(
          "I am a club member. Do I get a complimentary upgrade?",
          "I cannot promise a complimentary upgrade, sir. I can ask my manager for you.",
          "Tuần 23 và 28: không tự hứa nâng hạng — chuyển đúng người.",
          undefined,
          ["complimentary", "upgrade"],
        ),
        sp(
          "My friend got a complimentary upgrade here last month.",
          "Only a manager can give a complimentary upgrade, madam. I can ask for you.",
          "Nói ai có quyền, rồi đề nghị việc mình làm được.",
        ),
        sp(
          "For a long stay, which is the better option: the deluxe room or the junior suite?",
          "For a long stay, the junior suite is the better option. It has a desk.",
          "Tuần 23: chọn giúp khách bằng một lý do cụ thể.",
          undefined,
          ["option"],
        ),
        sp(
          "The traffic noise from the sea-view room disturbs us. Is there a quieter one?",
          "I am sorry the noise disturbs you, sir. I recommend a garden-view room instead.",
          "Tuần 23 và 28: xin lỗi đúng điều làm phiền khách, rồi đưa phương án thay thế bằng 'instead'.",
          undefined,
          ["disturbs", "garden", "instead"],
        ),
        sp(
          "Do you have rooms with one big bed?",
          "Yes, sir. If you prefer one big bed, I recommend the deluxe room.",
          "Khách chưa nói thích gì — 'If you prefer' + gợi ý một hạng phòng.",
          undefined,
          ["prefer"],
        ),
        sp(
          "Do you feel ready for busy shifts now?",
          "Yes. I feel confident, and I still ask you when I am not sure.",
          "Nói với cấp trên: tự tin nhưng biết giới hạn — hỏi chính người đang hỏi mình.",
          "manager",
        ),
        sp(
          "Can you take the desk alone tonight?",
          "Yes, I feel confident. I will call the duty manager if I need help.",
          "Nói với đồng nghiệp: tự tin, và biết gọi ai khi cần.",
          "colleague",
        ),
      ],
      reading: read(
        `Mr and Mrs Lopez want something bigger than their booking. Hai recommends the executive suite: it is bigger than the deluxe room. It costs more than they want to spend, so Hai offers another option: the sea-view room, which is cheaper. They prefer that. Housekeeping says the room will be ready within fifteen minutes, and Hai passes that on. He does not say the room number out loud. He points to the key card holder instead.`,
        [
          {
            q: "Hải gợi ý phòng nào đầu tiên?",
            options: ["Phòng hướng vườn", "Phòng executive suite", "Phòng hướng biển, rẻ hơn"],
            correct: 1,
            explanation:
              "'Hai recommends the executive suite: it is bigger than the deluxe room' — gợi ý đầu tiên đi theo điều khách muốn: phòng lớn hơn.",
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
          "Of course, sir. I will check your passport, then make you a new key card.",
          "Of course, sir. I will check your passport, then make you a new key cards.",
          "Of course, Mr Brown. Here is a new key. Have a nice evening.",
          undefined,
          "Câu cuối làm thẻ chỉ vì khách nói tên. Câu đúng kiểm tra hộ chiếu trước, rồi làm thẻ mới cho thẻ đã mất.",
        ),
      ],
    }),

    L(30, 2, "Explain and Coordinate", "Giải thích và điều phối", {
      vocabulary: [
        c("Arrange late check-out", "If you like, I can arrange late check-out until two o'clock."),
        c(
          "Extend your stay by one night",
          "If the room is available, I can extend your stay by one night.",
        ),
        c("Arrival list", "Two VIP guests are on today's arrival list."),
        c("Departure list", "I checked the departure list at two."),
      ],
      grammar: [
        g(
          "Late? Okay, pay.",
          "I can arrange late check-out until two, subject to availability.",
          "Tuần 28: việc lễ tân được làm, kèm điều kiện thật. Sau 'can' là động từ gốc.",
          "I can arranges late check-out until two, subject to availability.",
        ),
        g(
          "Stay more? Okay.",
          "If a room is available, I can extend your stay by one night.",
          "Câu điều kiện loại 1: 'If + hiện tại, … can + động từ gốc'. 'a room' số ít → 'is'.",
          "If a room are available, I can extend your stay by one night.",
        ),
      ],
      speaking: [
        sp(
          "Our flight is at nine at night. Can we keep the room until two?",
          d1,
          "Tuần 24 và 28: việc lễ tân được làm, điều kiện thật, và tên khoản phí.",
          undefined,
          ["arrange", "late", "check", "out"],
        ),
        sp(
          "Fine. Our car comes at six. And our bags after two?",
          d2,
          "Tuần 28: giữ hành lý đến đúng giờ khách đã nói.",
          undefined,
          undefined,
          d1,
        ),
        sp(
          "Thank you. Who brings the bags to the car?",
          d3,
          "Tuần 26: giao một việc cho đúng tổ, đúng giờ.",
          undefined,
          undefined,
          d2,
        ),
        sp(
          "We love it here. Can we extend our stay?",
          "Let me check availability first, madam. Then I can extend your stay by one night.",
          "Kiểm tra phòng trống TRƯỚC, rồi mới hứa.",
          undefined,
          ["extend", "stay"],
        ),
        sp(
          "Our flight moved to Friday. Can we stay one more night?",
          "If a room is available, I can extend your stay by one night, sir.",
          "Tuần 28: câu điều kiện — lời hứa đi sau điều kiện thật.",
        ),
        sp(
          "Can we leave at one tomorrow instead of twelve?",
          "Let me check, madam. If it is possible, I will arrange late check-out until one.",
          "Không hứa ngay: kiểm tra, rồi mới sắp xếp.",
        ),
        sp(
          "Is Mr Okoro on the arrival list or the departure list?",
          "He is on the departure list today, and his brother is on the arrival list.",
          "Tuần 29: đọc đúng danh sách trước khi trả lời đồng nghiệp.",
          "colleague",
          ["departure", "arrival"],
        ),
        sp(
          "Are there any late check-outs today?",
          "Yes, two rooms on the departure list. I will update the arrival list after they leave.",
          "Tuần 29: bàn giao bằng con số cụ thể, không nói chung chung 'some', rồi việc mình sẽ làm tiếp.",
          "colleague",
          ["departure", "arrival"],
        ),
        sp(
          "Anyone special on the arrival list tonight?",
          "Yes, two VIP guests. The general manager will greet them.",
          "Tuần 29: khách quan trọng trên danh sách khách đến, và ai sẽ đón.",
          "colleague",
          ["vip", "guests"],
        ),
        sp(
          "The Sunrise tour leader is on the phone for you.",
          "Thank you. I will check the rooming list with the tour leader now.",
          "Tuần 26: đúng đầu mối, đúng giấy tờ.",
          "colleague",
          ["rooming", "list"],
        ),
        sp(
          "Can group breakfast start earlier tomorrow, at six?",
          "Let me check with the restaurant first, madam. Then I will confirm group breakfast at six.",
          "Tuần 26: giờ ăn sáng của đoàn là việc của nhà hàng — hỏi trước, rồi mới xác nhận.",
          undefined,
          ["group", "breakfast", "restaurant"],
        ),
        sp(
          "Why was the lobby so full at two?",
          "There was a long check-in queue because two groups arrived together.",
          "Tuần 27: báo cấp trên lý do thật, không đổ lỗi cho ai.",
          "manager",
          ["long", "queue"],
        ),
        sp(
          "When does the shuttle bus to the city centre leave?",
          "The shuttle bus departure time is ten o'clock, sir, from the main lobby.",
          "Tuần 26: giờ khởi hành + điểm đón.",
          undefined,
          ["shuttle", "departure"],
        ),
      ],
      reading: read(
        `Mr Okoro's group checks out tomorrow, and their flight is at nine at night. Sang arranges late check-out until two, subject to availability, with a late check-out fee. After two, the hotel stores their bags downstairs. The car comes at six, so Sang asks the bell desk to bring the bags to the car then. Two guests love the hotel, so Sang checks availability first and extends their stay by one night. Mr Okoro thanks Sang for the clear plan.`,
        [
          {
            q: "Xe đón khách lúc mấy giờ?",
            options: ["Hai giờ chiều", "Chín giờ tối", "Sáu giờ"],
            correct: 2,
            explanation: "'The car comes at six' — sớm hơn giờ bay để kịp làm thủ tục.",
          },
          {
            q: "Sang làm gì TRƯỚC khi cho hai khách ở thêm một đêm?",
            options: [
              "Hỏi giá vé máy bay mới cho hai khách",
              "Kiểm tra phòng trống",
              "Gọi tổ hành lý mang đồ xuống",
            ],
            correct: 1,
            explanation:
              "'Sang checks availability first and extends their stay' — kiểm tra rồi mới hứa.",
          },
          {
            q: "Vì sao Sang nhờ tổ hành lý mang đồ ra xe lúc sáu giờ?",
            options: [
              "Vì hành lý đang giữ ở tầng dưới, và xe đến lúc sáu giờ",
              "Vì khách không muốn tự mang hành lý",
              "Vì tổ hành lý chỉ làm việc sau sáu giờ",
            ],
            correct: 0,
            explanation:
              "Suy luận: hành lý đã được giữ từ hai giờ — phải ra xe đúng giờ xe đến, nên giao việc cho đúng tổ, đúng mốc.",
          },
        ],
      ),
      game: [
        game(
          "We leave tomorrow. Who will take our bags to the car?",
          "I will ask the bell desk to bring your bags to the car, sir.",
          "I will ask the bell desk bring your bags to the car, sir.",
          "Please carry them yourself, sir.",
          undefined,
          "Câu cuối đẩy việc sang khách. Câu đúng giao việc cho đúng tổ.",
        ),
        game(
          "Is it possible to stay with you until Saturday?",
          "If a room is available, I can extend your stay by one night.",
          "If a room is available, I can extending your stay by one night.",
          "Of course, sir. Stay as long as you like.",
          undefined,
          "Câu cuối hứa trước khi biết còn phòng hay không. Câu đúng đặt điều kiện thật trước lời hứa.",
        ),
      ],
    }),

    L(30, 3, "Apologise and Solve", "Xin lỗi và giải quyết", {
      vocabulary: [
        c(
          "Correct the room rate",
          "If your booking shows a lower rate, my supervisor will correct the room rate.",
        ),
        c(
          "Send engineering to the room",
          "If the noise starts again, I will send engineering to the room.",
        ),
        c("Pending request", "There is one pending request from Room 418."),
        c("Either", "Either option is available tonight, sir."),
      ],
      grammar: [
        g(
          "Card no good.",
          "I am sorry, the card did not go through. Do you have another card?",
          "Thẻ không thanh toán được: nói 'did not go through', nói nhỏ, không đoán lý do. Sau 'did not' là động từ gốc.",
          "I am sorry, the card did not went through. Do you have another card?",
        ),
        g(
          "Rate wrong? I fix.",
          "If it is wrong, my supervisor will correct the room rate.",
          "Câu điều kiện: kiểm tra trước, đúng người sửa. Sau 'will' là động từ gốc.",
          "If it is wrong, my supervisor will corrects the room rate.",
        ),
      ],
      speaking: [
        risk({
          ...sp(
            "The machine beeped twice. Is there a problem with my card?",
            h1,
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
          h2,
          "Lễ tân không biết và không đoán lý do — chỉ ngân hàng biết.",
          undefined,
          undefined,
          h1,
        ),
        sp(
          "Fine. Can I pay in cash, or with my other card?",
          h3,
          "Hai cách đều được: 'Either is fine'. Không bình luận gì thêm về thẻ cũ.",
          undefined,
          undefined,
          h2,
        ),
        sp(
          "My bill shows a higher rate than my booking.",
          "Let me check your booking, madam. If it is wrong, my supervisor will correct the room rate.",
          "Tuần 28: kiểm tra trước, không nhận sai trước khi xem; đúng người sửa.",
          undefined,
          ["correct", "rate"],
        ),
        sp(
          "Did you sort out Mr Grey's bill?",
          "I checked the booking, so my supervisor can correct the room rate now.",
          "Báo cấp trên: việc mình đã làm, và ai làm bước tiếp theo.",
          "manager",
        ),
        sp(
          "The air conditioner is noisy again!",
          "I am sorry, sir. I will send engineering to the room straight away.",
          "Tuần 28: sự cố lặp lại — gọi đúng bộ phận ngay.",
          undefined,
          ["engineering"],
        ),
        sp(
          "The water in the shower is cold this morning.",
          "I am sorry, madam. If you like, I can send engineering to the room now.",
          "Khách chưa nói muốn gì — đề nghị bằng 'If you like, I can'.",
        ),
        sp(
          "Is anything still open for Room 418?",
          "Yes, one pending request: an extra pillow. Housekeeping has not brought it yet.",
          "Tuần 29: việc còn mở + chưa xong (not … yet).",
          "colleague",
          ["pending", "request"],
        ),
        sp(
          "Did Room 305 get the iron?",
          "Not yet. It is still a pending request, so I will call housekeeping again.",
          "Nói thật việc chưa xong, và việc mình làm tiếp.",
          "colleague",
        ),
        sp(
          "Tonight or tomorrow, when can we change rooms?",
          "Either time is fine, madam. I will arrange a room move for you.",
          "Tuần 28: 'Either' khi cả hai đều được, rồi nhận việc.",
          undefined,
          ["either"],
        ),
        sp(
          "The street was noisy all night. I could not sleep.",
          "I am sorry you could not sleep, sir. I will block a quieter room for you tonight.",
          "Công nhận đêm mất ngủ của khách, rồi giải pháp trong quyền lễ tân.",
          undefined,
          ["block", "quieter"],
        ),
        sp(
          "Our flight was late. Can you waive the late fee?",
          "I am sorry, sir, I cannot waive the late fee myself. I will ask the duty manager.",
          "Tuần 28: không tự bỏ phí, chuyển đúng người.",
          undefined,
          ["waive"],
        ),
        sp(
          "I am disappointed. Our bathroom was not clean when we arrived.",
          "I am very sorry you are disappointed, madam. I will report the dirty bathroom to housekeeping now.",
          "Tuần 27: lỗi của khách sạn — xin lỗi TRƯỚC và công nhận cảm xúc, rồi báo đúng bộ phận.",
          undefined,
          ["disappointed"],
        ),
        sp(
          "Can I talk to you about a problem with my bill?",
          "Of course, madam. Please tell me your concern, and I will check it now.",
          "Tuần 27: mời khách nói hết trước khi giải thích.",
          undefined,
          ["concern"],
        ),
      ],
      reading: read(
        `At check-out, Mr Grey's card does not go through. Tien says it quietly: "I am sorry, sir, the card did not go through. Do you have another card?" She does not guess why. When he asks, she says that his bank can tell him. Either cash or another card is fine, and he pays in cash. Nobody else in the queue hears anything. Later, Tien tells her supervisor that the card was declined. Mr Grey thanks her for being discreet.`,
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
            q: "Vì sao Tiên nói 'did not go through' với khách, nhưng nói 'declined' với giám sát?",
            options: [
              "Vì 'declined' nghe như lỗi của khách; với đồng nghiệp thì nói đúng tên",
              "Vì máy không hiện chữ 'declined'",
              "Vì khách không hiểu chữ 'declined'",
            ],
            correct: 0,
            explanation:
              "Suy luận: với khách, câu trung tính giữ thể diện; 'declined' là từ để báo đồng nghiệp, như khoá đã dạy từ tuần 17.",
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
          "The screen shows red. Is something wrong with my card?",
          h1,
          "I am sorry, sir, the card did not went through. Do you have another card?",
          "Your card is declined, sir. Do you have any money in the bank?",
          undefined,
          "Câu cuối nói 'declined' trước mặt người khác và hỏi chuyện tiền của khách. Câu đúng nói nhỏ, trung tính, và hỏi thẻ khác.",
        ),
      ],
    }),

    L(30, 4, "End of Phase Three", "Kết thúc giai đoạn ba", {
      vocabulary: [
        c("Shift", "My shift ends at three o'clock."),
        c("Night audit", "The night audit checks every bill after midnight.", [
          "/naɪt ˈɔːdɪt/",
          "Kiểm toán đêm",
          "🌙",
        ]),
        c("Wake-up call list", "Room 305 is on the wake-up call list for six o'clock."),
        c("Room status report", "The room status report shows which rooms are ready."),
      ],
      grammar: [
        g(
          "Audit midnight.",
          "On your shift, the night audit starts at midnight.",
          "Bàn giao: lịch cố định nói bằng hiện tại đơn; 'the night audit' số ít → 'starts'.",
          "On your shift, the night audit start at midnight.",
        ),
        g(
          "Report two broken.",
          "The room status report shows two rooms out of order.",
          "'The room status report' là một bản báo cáo → 'shows'.",
          "The room status report show two rooms out of order.",
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
            "I am sorry, I cannot tell you room numbers. I can take a message, madam.",
            "I am sorry, madam, I cannot give out room numbers. I can take a message.",
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
            ["calling", "security", "duty", "manager"],
          ),
          alsoAccept: [
            "I am very sorry, sir. I am calling the duty manager and the security officer now.",
            "I am so sorry, sir. I will call the security officer and the duty manager now.",
            "I am very sorry, sir. I am calling the security officer and the duty manager now.",
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
          "What do I need to know for my shift?",
          "On your shift, the night audit starts at midnight. The wake-up call list is ready.",
          "Tuần 29: bàn giao việc cố định của ca và danh sách đã chuẩn bị.",
          "colleague",
          ["shift", "audit", "wake"],
        ),
        sp(
          "Is everything ready for the night audit?",
          "The room status report is ready. The cash float has not been counted yet.",
          "Tuần 29: việc đã xong + việc chưa xong — quỹ tiền mặt CHƯA ai đếm, nên dùng hiện tại hoàn thành bị động (has not been … yet).",
          "manager",
          ["status", "report", "float"],
        ),
        sp(
          "Any problems on your shift?",
          "Yes. On my shift, the key card machine suddenly stopped, so please call engineering.",
          "Tuần 29: 'suddenly' cho sự cố, rồi việc ca sau cần làm: máy hỏng thì gọi kỹ thuật.",
          "colleague",
          ["suddenly", "engineering"],
        ),
        sp(
          "Is the key inventory done?",
          "Not yet. I will check the key inventory before midnight.",
          "Tuần 29: nói thật việc chưa xong (Not yet), rồi mốc mình tự làm.",
          "colleague",
          ["key", "inventory"],
        ),
        sp(
          "Where are the early wake-up calls for tomorrow?",
          "They are on the wake-up call list, with the times.",
          "Tuần 29: đúng danh sách, đúng chỗ.",
          "colleague",
        ),
        sp(
          "What does the room status report show?",
          "The room status report shows two rooms on the out-of-order room list.",
          "Tuần 29: đọc báo cáo và nói đúng danh sách.",
          "manager",
          ["status", "order"],
        ),
        sp(
          "Is the occupancy figure final?",
          "Not yet. The night audit will finish the occupancy figure after midnight.",
          "Tuần 29: chưa xong — ai làm và khi nào, không đoán con số.",
          "manager",
          ["occupancy", "figure"],
        ),
        sp(
          "What do I do if there is an alarm tonight?",
          "If the fire alarm rings, please take the emergency exit, not the lift.",
          "Tuần 28: câu điều kiện an toàn — lối thoát hiểm, không đi thang máy.",
          undefined,
          ["fire", "alarm"],
        ),
        sp(
          "Did you write down the guest's watch problem?",
          "Yes. It is in the handover log, with the times.",
          "Tuần 29: sự việc nằm đúng sổ, có giờ.",
          "manager",
          ["handover", "log"],
        ),
        sp(
          "Mr Tan asked us not to give his room number to anyone.",
          "Then I will put Mr Tan on the special attention list now.",
          "Tuần 29: yêu cầu riêng tư của khách đi vào đúng danh sách.",
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
          w1,
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
