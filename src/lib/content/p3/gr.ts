// ============================================================
// GUEST RELATIONS — PHASE 3 (weeks 23-30), written for the department.
//
// The frame-built weeks taught a Guest Relations Officer to answer the
// wrong question with the right grammar: "Why do I have to pay this?" was
// answered with "We have to apply the consent form", a guest asking for a
// full refund was told "I cannot move you to a suite myself", a check-out
// extension and a room upgrade were promised with no one's approval, a
// reading explanation printed its own template source, and the checkpoint
// had no turn at all that a learner was required to get right. Week 27 was a
// hand-authored lounge week whose turns ran to thirty words and four
// sentences in one breath. So:
//
//  · The GRO RECOMMENDS and EXPLAINS. Prices, upgrades, room moves and
//    late check-out are the front office's; points are the loyalty
//    office's; a menu or a cake is the chef's. The GRO passes the request
//    on and says who decides and when they will call.
//  · Anything of money's worth — a free night, a refund, a free dinner, an
//    upgrade, a spa credit, lounge access as a gesture, a cancelled charge
//    — is the duty manager's. The GRO says "I cannot offer that myself"
//    and "I will ask my manager", never "it is done".
//  · Privacy is part of the job: the GRO never confirms that someone is
//    staying, never gives a room number, an arrival time or a schedule to
//    a caller or a visitor, and takes a message instead. Preferences go on
//    file only with the guest's consent.
//  · An apology is for what the guest met. "It was our mistake" waits
//    until somebody has checked, and no colleague is named as the cause.
//  · The hard cases a lobby and a lounge actually meet are here: a caller
//    or a reporter asking where a guest is, a child alone by the lobby door,
//    a guest who cannot breathe after a canapé, a drunk guest at the
//    cocktail hour, an allergy on a cake order, a guest demanding a free
//    night. Those turns are marked `risk`: they are the pool the
//    checkpoint's must-be-right draw comes from.
//  · Week 29 is talk between GROs and to the Guest Relations manager, and
//    every turn is labelled so.
//
// What the second reading of these weeks added:
//  · Privacy carries weight in the must-be-right pool. A learner who leaked
//    guest details on every privacy turn still passed the spoken half most
//    of the time, because few reserved turns were about privacy and the
//    decision turns INSIDE risk chains were not marked. Every turn that
//    refuses, routes or keeps someone safe inside such a chain is now
//    `risk`, and week 25 adds a secretary asking for a guest's flight time.
//    Taking a message never confirms that the guest is staying.
//  · Every risk turn lists the other correct ways of saying it
//    (`alsoAccept`), and a game key for the same situation is one of them.
//  · Every card is said in its own week, and from week 25 every lesson
//    says words from earlier weeks again. Cards a GRO already met before
//    week 23 (Policy, Preference, Refreshments, Option, Shift) and
//    category labels ("Ignored request", "Wrong points balance") gave way
//    to words of the trade: discretion, itinerary, inconvenience,
//    valuables, lost and found, escalate, goodwill gesture.
//  · The course spells British: apologise, personalised.
//  · Every card of weeks 23-28 is said again in a later week before the
//    checkpoint, mostly in the "Ôn tuần" turns of weeks 26-29, and each week
//    says one phase-2 word again (afternoon tea, lounge hours, wake-up time…).
//  · In half the game rounds the broken-English option is a broken copy of
//    the wrong-for-the-job reply, not of the key, so the near-identical pair
//    is not always where the answer is.
//  · Nothing is promised "never again", nothing a guest has not agreed to is
//    filed, and no model reply leans on a card before the week that
//    teaches it (the courtesy call, the bell desk, the guest preference file).
//
// Cards keep the reviewed GR bank entries (kit.ts looks them up), because
// Phase 4 recycles them; words the course already teaches earlier
// (Colleague, Prefer, Complimentary, Anniversary) are not taught again.
// ============================================================
import type { LessonContent, SpeakingItem } from "../week-content";
import { game, g, read, sp } from "../phase0";
import { cardsFor, lessonsFor, risk } from "./kit";

const c = cardsFor("GR");
const L = lessonsFor("GR");

/** A turn with the other wordings the course accepts for it. */
const also = (s: SpeakingItem, ...alsoAccept: string[]): SpeakingItem => ({ ...s, alsoAccept });

// ── Week 23 — Recommending, and comparing two options ──────────────────
function week23(): LessonContent[] {
  const t1a =
    "I am sorry about the noise, madam. I recommend the club floor room, which is much quieter.";
  const t1b = "The suite is bigger, but the club floor room is quieter and costs less.";
  const t1c = "I am sorry, I cannot change the price. The front office will call you.";
  const t2a =
    "Would you like our airport transfer instead, sir? It is easier than a taxi at night.";
  const t2b = "The limousine pick-up is more comfortable, but the standard car is cheaper.";
  const t2c = "Of course, sir. The driver will meet you at nine with a name card.";
  const t3a = "Congratulations, madam! For your anniversary, I recommend our anniversary set-up.";
  const t3b = "It is bigger than the welcome amenity: flowers, a cake and a card.";
  const t3c =
    "I am sorry, I cannot offer a free spa credit. The front office can tell you the price.";
  const t4a = "Lounge breakfast and the evening cocktail hour are privileges of your room.";
  const t4b = "Of course, sir. The lounge also serves tea and coffee in the evening.";
  const t4c = "No problem, sir. The main restaurant is also very good.";
  return [
    L(23, 1, "I Recommend…", "Gợi ý cho khách", {
      vocabulary: [
        c("Recommend", "I recommend the club floor room for a quiet stay."),
        c("Club floor room", "A club floor room is quieter than a room near the lift."),
        c("Executive suite", "The executive suite is bigger than the club floor room."),
        c("Front office", "The front office confirms the price of every upgrade."),
      ],
      grammar: [
        g(
          "Take club room, it good.",
          "I recommend the club floor room, madam. It is quieter.",
          "Gợi ý bằng 'I recommend + the + món', rồi nêu MỘT lý do ngắn. Khách vẫn là người quyết định.",
          "I recommend you the club floor room, madam. It is quieter.",
        ),
        g(
          "Suite big. Club room small.",
          "The executive suite is bigger than the club floor room.",
          "Tính từ ngắn so sánh hơn: big → bigger (gấp đôi phụ âm cuối) + than.",
          "The executive suite is big than the club floor room.",
        ),
      ],
      speaking: [
        also(
          sp(
            "Our room is next to the lift, and it is very noisy at night.",
            t1a,
            "Khách phàn nàn: xin lỗi TRƯỚC, rồi mới gợi ý một lựa chọn và lý do.",
          ),
          "I am sorry about the noise, madam. I would recommend the club floor room, which is much quieter.",
        ),
        sp(
          "Is it better than the executive suite?",
          t1b,
          "Trả lời câu so sánh bằng câu so sánh: mỗi lựa chọn hơn ở một điểm.",
          undefined,
          undefined,
          t1a,
        ),
        risk(
          also(
            sp(
              "Can you give me the club floor room at my current price?",
              t1c,
              "Giá và nâng hạng do lễ tân quyết. Không tự đổi giá — nói rõ ai sẽ gọi lại.",
              undefined,
              ["price", "front", "office"],
              t1b,
            ),
            "I cannot change the price, madam. The front office will call you.",
            "I am sorry, I cannot change the price myself. The front office will call you about it.",
            "I cannot change the price, but the front office will call you.",
          ),
        ),
        sp(
          "I am here for two weeks of meetings. Which room is best?",
          "I recommend the executive suite, sir. It is bigger, and it has a work desk.",
          "Nhu cầu của khách (làm việc dài ngày) quyết định gợi ý, kèm một lợi ích.",
        ),
        sp(
          "Is the executive suite worth the price for one night?",
          "For one night, I recommend the club floor room, madam. The front office can tell you both prices.",
          "Gợi ý trung thực theo nhu cầu; giá do lễ tân báo.",
        ),
        sp(
          "Which room is better for my mother? She uses a wheelchair.",
          "An accessible room is easier for her, sir. I will ask the front office to check one.",
          "Phòng cho người đi xe lăn do lễ tân kiểm tra và xếp — bạn gợi ý và nhờ đúng người.",
        ),
      ],
      reading: read(
        `Mrs Becker's room is next to the lift, and she asks Khanh for a quieter one. Khanh apologises for the noise first. Then she recommends the club floor room: it is quieter, and it costs less than the executive suite. Mrs Becker asks for it at her current price. Khanh does not change the price herself. The front office calls Mrs Becker ten minutes later.`,
        [
          {
            q: "Vì sao Khánh gợi ý phòng tầng câu lạc bộ thay vì phòng hạng sang?",
            options: [
              "Vì đó là loại phòng đắt nhất khách sạn đang có",
              "Vì yên tĩnh hơn và rẻ hơn phòng hạng sang",
              "Vì phòng hạng sang đã được khách khác đặt hết",
            ],
            correct: 1,
            explanation:
              "'it is quieter, and it costs less than the executive suite' — gợi ý theo đúng điều khách cần (yên tĩnh), và nói thật cả về giá.",
          },
          {
            q: "Ai quyết định giá khi khách xin giữ giá cũ?",
            options: [
              "Khánh, vì Khánh là người gợi ý",
              "Bộ phận buồng phòng của tầng đó",
              "Lễ tân, qua cuộc gọi cho khách",
            ],
            correct: 2,
            explanation:
              "'Khanh does not change the price herself. The front office calls' — GRO gợi ý, lễ tân báo giá và xác nhận.",
          },
        ],
      ),
      game: [
        game(
          "Which is better for us, the club floor room or the suite?",
          "For a quiet stay, I recommend the club floor room, madam.",
          "For a quiet stay, I recommend you the club floor room, madam.",
          "I recommend the suite, madam, and I can give you the club floor price for it.",
          undefined,
          "Câu cuối nghe hào phóng nhưng tự quyết giá — việc của lễ tân. Câu đúng gợi ý theo điều khách cần (yên tĩnh).",
        ),
        game(
          "Can I have the club floor room at my old price?",
          "I am sorry, I cannot change the price. The front office will call you.",
          "For you, madam, the old price are fine.",
          "For you, madam, the old price is fine.",
          undefined,
          "Câu cuối tự quyết giá — việc của lễ tân. Câu đúng từ chối nhẹ nhàng và nói ai sẽ gọi lại.",
        ),
      ],
    }),

    L(23, 2, "Comparing Two Options", "So sánh hai lựa chọn", {
      vocabulary: [
        c("Quieter", "The library is quieter than the lobby in the evening."),
        c("Instead", "Would you like our airport transfer instead of a taxi?"),
        c("Airport transfer", "The airport transfer takes about forty minutes."),
        c("Limousine pick-up", "The limousine pick-up is more comfortable than a standard car."),
      ],
      grammar: [
        g(
          "Limousine more good.",
          "The limousine pick-up is more comfortable than a taxi, sir.",
          "Tính từ dài (comfortable) so sánh bằng 'more + tính từ + than'. Không thêm -er.",
          "The limousine pick-up is most comfortable than a taxi, sir.",
        ),
        g(
          "Taxi no. Take hotel car.",
          "Would you like our airport transfer instead, madam?",
          "'Would you like…?' là lời mời. 'Instead' đứng cuối câu khi đưa phương án thay thế.",
          "Do you like our airport transfer instead, madam?",
        ),
      ],
      speaking: [
        sp(
          "We land at nine tonight. Should we just take a taxi?",
          t2a,
          "Mời bằng câu hỏi, rồi nêu một lý do so sánh: dễ hơn đi taxi lúc tối muộn.",
        ),
        sp(
          "Is the limousine pick-up much better?",
          t2b,
          "So sánh trung thực cả hai phía: xe nào thoải mái hơn, xe nào rẻ hơn.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Then we will take the standard car, please.",
          t2c,
          "Khép lại bằng điều khách cần biết khi tới nơi: giờ đón và cách nhận ra tài xế.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "The lobby is so loud. Is there somewhere calmer to wait?",
          "The library is quieter than the lobby, madam. It is on the first floor.",
          "So sánh đúng điểm khách khó chịu (ồn), rồi chỉ chỗ.",
        ),
        sp(
          "Is the airport transfer faster than the train?",
          "The train is faster at rush hour, sir, but the transfer is easier with bags.",
          "So sánh trung thực: mỗi bên hơn ở một điểm.",
        ),
        sp(
          "Is the limousine pick-up quieter than the normal car?",
          "Yes, madam. The limousine pick-up is quieter, and the seats are more comfortable.",
          "Trả lời câu so sánh bằng hai so sánh ngắn.",
        ),
      ],
      reading: read(
        `Mr Okafor and his wife land at nine tonight. Minh compares two options for them. The limousine pick-up is more comfortable, but the standard car is cheaper. Both are easier than a taxi at night. Mr Okafor chooses the standard car. Minh tells him the driver will meet them at nine with a name card.`,
        [
          {
            q: "Minh so sánh hai lựa chọn nào cho khách?",
            options: [
              "Taxi sân bay và xe buýt của thành phố",
              "Xe limousine và xe tiêu chuẩn",
              "Xe tiêu chuẩn và taxi gọi qua ứng dụng",
            ],
            correct: 1,
            explanation:
              "'The limousine pick-up is more comfortable, but the standard car is cheaper' — so sánh hai dịch vụ của chính khách sạn.",
          },
          {
            q: "Khách nhận ra tài xế bằng cách nào?",
            options: [
              "Tài xế gọi điện cho khách khi tới nơi",
              "Khách ra quầy thông tin",
              "Tài xế cầm biển tên khách",
            ],
            correct: 2,
            explanation:
              "'the driver will meet them at nine with a name card' — báo trước cách nhận ra nhau giúp khách yên tâm khi hạ cánh.",
          },
        ],
      ),
      game: [
        game(
          "Is the limousine worth it, or is the normal car fine?",
          "The limousine is more comfortable, sir, but the normal car is also good.",
          "I will booking the limousine for you now, sir, and add it to your bill.",
          "I will book the limousine for you now, sir, and add it to your bill.",
          undefined,
          "Câu cuối đặt dịch vụ có phí khi khách chưa chọn. Câu đúng so sánh trung thực và để khách chọn.",
        ),
        game(
          "My flight lands at midnight. How do I get to the hotel?",
          "I recommend our airport transfer, madam. The driver will wait for you.",
          "I recommend our airport transfer, madam. The driver will waiting for you.",
          "Any taxi outside the airport is fine, madam. They all know us.",
          undefined,
          "Câu cuối bỏ mặc khách lúc nửa đêm ở sân bay. Câu đúng gợi ý dịch vụ an toàn của khách sạn và nói ai đón.",
        ),
      ],
    }),

    L(23, 3, "Reading the Guest", "Đọc nhu cầu của khách", {
      vocabulary: [
        c("Anniversary set-up", "The anniversary set-up has flowers, a cake and a card."),
        c("Welcome amenity", "Your welcome amenity is a fruit basket and a card."),
        c("Spa credit", "The anniversary package includes a spa credit for two."),
        c("Butler service", "Butler service comes with the executive suite."),
      ],
      grammar: [
        g(
          "Why you come here?",
          "Are you celebrating something special on this trip, madam?",
          "Hỏi trước rồi mới gợi ý. Thì hiện tại tiếp diễn: are + V-ing.",
          "Are you celebrate something special on this trip, madam?",
        ),
        g(
          "Anniversary? Take this.",
          "For your anniversary, I recommend the anniversary set-up with flowers.",
          "Mở đầu bằng 'For your anniversary,' cho thấy gợi ý đi theo đúng dịp của khách.",
          "For you anniversary, I recommend the anniversary set-up with flowers.",
        ),
      ],
      speaking: [
        sp(
          "It is our tenth wedding anniversary on Friday.",
          t3a,
          "Chúc mừng trước, rồi mới gợi ý — gợi ý đi theo dịp của khách.",
        ),
        sp(
          "What is in it? Is it better than the welcome amenity?",
          t3b,
          "So sánh bằng bigger than, rồi kể ngắn những gì có trong đó.",
          undefined,
          undefined,
          t3a,
        ),
        risk(
          also(
            sp(
              "Lovely. Can you add a free spa credit too?",
              t3c,
              "Phiếu spa có giá trị tiền: bạn không tự tặng. Giá do lễ tân báo.",
              undefined,
              ["offer", "free", "spa", "credit", "front", "office", "price"],
              t3b,
            ),
            "I cannot offer a free spa credit, madam. The front office can tell you the price.",
            "I am sorry, I cannot give you a free spa credit. The front office can tell you the price.",
          ),
        ),
        sp(
          "My father is eighty and needs help with everything.",
          "Then I recommend the executive suite with butler service, sir.",
          "Nghe ra người cần giúp (người cha), rồi gợi ý đúng dịch vụ cho người đó.",
        ),
        sp(
          "We have a baby with us. Is the club floor room big enough?",
          "The executive suite is bigger, madam. I will ask housekeeping to bring a baby cot.",
          "So sánh đúng điều khách lo (chỗ cho em bé); nôi do buồng phòng mang lên.",
        ),
        sp(
          "We are on our honeymoon. What do you recommend?",
          "Congratulations, sir! I recommend the executive suite with butler service, for privacy.",
          "Chúc mừng trước, gợi ý sau, kèm một lợi ích hợp với dịp của khách.",
        ),
      ],
      reading: read(
        `Ms Laurent tells Thao that Friday is her tenth wedding anniversary. Thao says congratulations, then recommends the anniversary set-up: flowers, a cake and a card. It is bigger than the welcome amenity. Ms Laurent asks for a free spa credit too. Thao cannot offer one, so she explains that the front office can tell her the price.`,
        [
          {
            q: "Thảo làm gì trước khi gợi ý bộ trang trí?",
            options: [
              "Chúc mừng ngày kỷ niệm của khách",
              "Báo giá bộ trang trí cho khách",
              "Hỏi khách đã đặt gói nào chưa",
            ],
            correct: 0,
            explanation:
              "'Thao says congratulations, then recommends' — đón nhận niềm vui của khách trước, gợi ý sau.",
          },
          {
            q: "Vì sao Thảo không tặng phiếu spa miễn phí?",
            options: [
              "Vì spa đã kín lịch suốt cả ngày thứ Sáu",
              "Vì món có giá trị tiền không do Thảo quyết",
              "Vì khách chưa phải là hội viên của khách sạn",
            ],
            correct: 1,
            explanation:
              "'Thao cannot offer one' — phiếu spa có giá trị tiền; GRO chỉ nói ai báo giá.",
          },
        ],
      ),
      game: [
        game(
          "It is my husband's birthday tomorrow.",
          "How lovely, madam! I recommend a cake and a card in your room.",
          "That is nice, madam. There is a very good bakery across of the street.",
          "That is nice, madam. There is a very good bakery across the street.",
          undefined,
          "Câu cuối đẩy khách ra ngoài khách sạn. Câu đúng chúc mừng và gợi ý một điều cụ thể khách sạn làm được.",
        ),
        game(
          "Could you put a free spa credit in our package?",
          "I am sorry, I cannot offer a free spa credit. The front office can tell you the price.",
          "I am sorry, I cannot offer free spa credit. The front office can tell you the price.",
          "Of course, madam. It is your anniversary, so it is free.",
          undefined,
          "Câu cuối tự tặng một món có giá trị tiền. Câu đúng từ chối nhẹ nhàng và nói ai báo giá.",
        ),
      ],
    }),

    L(
      23,
      4,
      "Club Privileges — and When the Guest Says No",
      "Đặc quyền club — và khi khách từ chối",
      {
        vocabulary: [
          c("Privilege", "Lounge breakfast is a privilege of the club floor.", [
            "/ˈprɪvəlɪdʒ/",
            "Đặc quyền",
            "🎁",
          ]),
          c("Private check-in", "Private check-in is quicker than the lobby desk."),
          c("Lounge breakfast", "Lounge breakfast is quieter than the main restaurant."),
          c("Evening cocktail hour", "The evening cocktail hour starts at six."),
        ],
        grammar: [
          g(
            "No? Okay.",
            "Of course, sir. The main restaurant is also very good.",
            "Khách từ chối vẫn được phục vụ tử tế — chấp nhận ngay và khen lựa chọn của khách.",
            "Of course, sir. The main restaurant are also very good.",
          ),
          g(
            "Breakfast lounge better, go there.",
            "Lounge breakfast is quieter than the main restaurant, madam.",
            "quiet → quieter than. So sánh đúng một điểm khách quan tâm.",
            "Lounge breakfast is quiet than the main restaurant, madam.",
          ),
        ],
        speaking: [
          sp(
            "What does the club floor give me, exactly?",
            t4a,
            "Kể quyền lợi ngắn gọn, đúng hai món chính.",
          ),
          sp(
            "I do not drink, so the cocktail hour is not for me.",
            t4b,
            "Khách từ chối một món: không tiếc nuối, đưa một lựa chọn khác phù hợp.",
            undefined,
            undefined,
            t4a,
          ),
          sp(
            "I also like breakfast in the main restaurant better.",
            t4c,
            "Khách từ chối lần hai: dừng gợi ý, khen lựa chọn của khách.",
            undefined,
            undefined,
            t4b,
          ),
          sp(
            "Can I check in quietly? I have had a very long flight.",
            "Of course, madam. Private check-in upstairs is quicker and quieter than the lobby.",
            "Nghe ra điều khách cần (nhanh, yên tĩnh) và gợi ý đúng dịch vụ đó.",
          ),
          sp(
            "Is lounge breakfast better than the main restaurant?",
            "Lounge breakfast is quieter, sir, but the main restaurant has more choice.",
            "So sánh trung thực để khách tự chọn.",
          ),
          sp(
            "Is private check-in really better than the lobby desk?",
            "Private check-in is quieter, madam, but the lobby desk is also quick today.",
            "So sánh trung thực, không ép khách chọn dịch vụ cao hơn.",
          ),
          sp(
            "Is there anything in the lounge before the cocktail hour?",
            "Yes, madam. Afternoon tea is served in the lounge from three o'clock.",
            "Nhắc lại một quyền lợi đã học từ trước (afternoon tea) và nói rõ giờ.",
          ),
        ],
        reading: read(
          `Mr Novak is new to the club floor. Bao explains that lounge breakfast and the evening cocktail hour are privileges of his room. Mr Novak does not drink, so Bao mentions the tea and coffee in the lounge. Mr Novak also likes the main restaurant better for breakfast. Bao agrees at once and does not suggest anything a third time.`,
          [
            {
              q: "Bảo làm gì khi khách nói không uống rượu?",
              options: [
                "Khuyên khách thử một ly cocktail nhẹ",
                "Nhắc đến trà và cà phê trong phòng chờ",
                "Bỏ qua và không nói gì thêm về phòng chờ",
              ],
              correct: 1,
              explanation:
                "'Bao mentions the tea and coffee in the lounge' — khách từ chối một món thì đưa một lựa chọn hợp với khách.",
            },
            {
              q: "Sau lời từ chối thứ hai, Bảo làm gì?",
              options: [
                "Gợi ý thêm bữa sáng tại phòng",
                "Giải thích lại lợi ích của phòng chờ",
                "Đồng ý ngay, không gợi ý thêm",
              ],
              correct: 2,
              explanation:
                "'Bao agrees at once and does not suggest anything a third time' — gợi ý quá hai lần là ép khách.",
            },
          ],
        ),
        game: [
          game(
            "No thank you, I do not need private check-in.",
            "Of course, sir. The lobby desk will look after you.",
            "Of course, sir. The lobby desk will looks after you.",
            "Are you sure, sir? Private check-in is much quicker, and all our VIPs use it.",
            undefined,
            "Câu cuối ép khách sau khi khách đã từ chối. Câu đúng chấp nhận ngay và để khách đi theo cách khách chọn.",
          ),
          game(
            "Is the cocktail hour part of my room?",
            "Yes, sir. It is a privilege of your club floor room.",
            "Yes, sir, and you can bring all you friends with you for free.",
            "Yes, sir, and you can bring all your friends with you for free.",
            undefined,
            "Câu cuối hứa điều sai quy định — khách thêm người phải trả phí vào phòng chờ. Câu đúng nói đúng quyền lợi của phòng.",
          ),
        ],
      },
    ),
  ];
}

// ── Week 24 — Explaining a rule: "have to" and the real "because" ──────
function week24(): LessonContent[] {
  const t1a =
    "You are welcome to bring them, sir. There is a lounge access fee for the third person.";
  const t1b =
    "I am sorry nobody told you, sir. The fee covers drinks and food for each extra guest.";
  const t1c = "I am sorry, I cannot change your bill. The front office can check it with you.";
  const t2a = "The suite has a two-night minimum at weekends, because demand is very high.";
  const t2b =
    "That is our policy, madam, and I cannot change it. On weekdays, one night is possible.";
  const t2c = "Wonderful. The front office will confirm Wednesday for you this afternoon.";
  const t3a =
    "I am sorry, sir. Under the points expiry rule, points end after two years without a stay.";
  const t3b = "Thank you, sir. I will ask the loyalty office to check that stay.";
  const t3c = "I cannot change your points, sir. The loyalty office will check them for you.";
  const t4a = "I am sorry, I cannot confirm who is staying with us.";
  const t4b = "I am sorry, sir. Room numbers are confidential.";
  const t4c = "I can take a message, sir. If the guest is staying with us, we will tell them.";
  return [
    L(24, 1, "There Is a Fee", "Có một khoản phí", {
      vocabulary: [
        c("Charge", "There is a charge for a third guest in the lounge."),
        c("Lounge access fee", "The lounge access fee goes on your room bill."),
        c("Guest limit", "The guest limit in the lounge is two people per room."),
        c("Lounge dress code", "The lounge dress code asks for long trousers after six."),
      ],
      grammar: [
        g(
          "Third person pay.",
          "There is a lounge access fee for the third person, sir.",
          "'There is a … fee for …' báo phí nhẹ nhàng — báo thông tin, không ra lệnh trả tiền.",
          "There are a lounge access fee for the third person, sir.",
        ),
        g(
          "Friends write name there.",
          "Your guests have to sign in at the lounge desk, madam.",
          "'have to' + động từ nguyên mẫu = việc bắt buộc. Sau 'have to' không thêm -ing.",
          "Your guests have to signing in at the lounge desk, madam.",
        ),
      ],
      speaking: [
        sp(
          "Two business partners will join me in the lounge this evening.",
          t1a,
          "Đồng ý trước, rồi báo phí ngay — đừng để khách tự phát hiện trên hóa đơn.",
        ),
        sp(
          "Nobody told me about a fee when I booked.",
          t1b,
          "Xin lỗi, không tranh luận, rồi tự giải thích khoản phí phòng chờ bằng một lý do thật.",
          undefined,
          undefined,
          t1a,
        ),
        risk(
          also(
            sp(
              "Can you just not charge me this time?",
              t1c,
              "Bạn không sửa hóa đơn. Nói rõ ai kiểm tra lại cùng khách.",
              undefined,
              ["bill", "front", "office"],
              t1b,
            ),
            "I cannot change your bill, sir. The front office can check it with you.",
            "I am sorry, I cannot change your bill myself. The front office will check it with you.",
          ),
        ),
        sp(
          "Is there a charge for my friend in the lounge?",
          "There is no charge for one guest, madam. The guest limit is two people per room.",
          "Nói rõ có phí hay không, kèm con số giới hạn.",
        ),
        sp(
          "Can I bring my son to the lounge? He is twelve.",
          "Of course, madam. Two people per room is our guest limit, so there is no charge.",
          "Nói rõ có phí hay không, và vì sao.",
        ),
        sp(
          "When can I use the lounge?",
          "Our lounge hours are from seven in the morning to ten at night, sir. The evening cocktail hour starts at six.",
          "Nhắc lại giờ mở cửa (lounge hours, đã học) và một mốc giờ khách hay hỏi.",
        ),
        sp(
          "Can I come to the lounge in shorts this evening?",
          "In the evening, the lounge dress code asks for long trousers, sir. Shorts are fine in the morning.",
          "Nói quy định và đưa luôn điều khách CÓ THỂ làm.",
        ),
        sp(
          "Can you prepare our anniversary set-up in the lounge?",
          "I am sorry, madam. The anniversary set-up is in your room, because the lounge is shared.",
          "Ôn tuần 23: nói đúng tên dịch vụ, và lý do thật bằng because.",
          undefined,
          ["anniversary"],
        ),
      ],
      reading: read(
        `Mr Sato brings two business partners to the lounge. Ngoc explains the guest limit: two people per room, so there is a lounge access fee for the third person. Mr Sato asks her to forget the fee this time. Ngoc does not change the bill herself. Ngoc explains what the fee covers, and Mr Sato pays it.`,
        [
          {
            q: "Vì sao có phí vào phòng chờ trong tình huống này?",
            options: [
              "Vì khách đi cùng là người ngoài, không có phòng ở khách sạn",
              "Vì người thứ ba vượt giới hạn hai người mỗi phòng",
              "Vì khách tới sau giờ phục vụ buổi tối",
            ],
            correct: 1,
            explanation:
              "'two people per room, so there is a lounge access fee for the third person' — phí đến từ giới hạn số khách, nói được với khách.",
          },
          {
            q: "Ngọc làm gì khi khách xin bỏ qua khoản phí?",
            options: [
              "Bỏ phí lần này để giữ lòng khách quen",
              "Khuyên khách để một đối tác ngồi chờ ở ngoài sảnh",
              "Không tự sửa hóa đơn, chỉ giải thích khoản phí",
            ],
            correct: 2,
            explanation:
              "'Ngoc does not change the bill herself' — bỏ hay giữ một khoản phí là quyết định về tiền, không thuộc GRO.",
          },
        ],
      ),
      game: [
        game(
          "Can I wear my swimsuit in the lounge?",
          "I am sorry, madam. The lounge dress code asks for day clothes.",
          "Of course, madam. Nobody will says anything if you sit in the corner.",
          "Of course, madam. Nobody will say anything if you sit in the corner.",
          undefined,
          "Câu cuối tự bẻ quy định cho khách — khách khác sẽ thấy và hỏi. Câu đúng nói quy định nhẹ nhàng.",
        ),
        game(
          "Please take the lounge fee off my bill.",
          "I am sorry, I cannot change your bill. The front office can check it with you.",
          "No problem, sir. I will tell the lounge forget it.",
          "No problem, sir. I will tell the lounge to forget it.",
          undefined,
          "Câu cuối tự xóa một khoản phí — quyết định về tiền không thuộc GRO. Câu đúng chuyển lễ tân kiểm tra cùng khách.",
        ),
      ],
    }),

    L(24, 2, "Because — the Real Reason", "Nêu lý do thật bằng 'because'", {
      vocabulary: [
        c("Because", "We check the guest list because the lounge is for club guests."),
        c("Two-night minimum", "The suite has a two-night minimum at weekends."),
        c("Blackout period", "Points upgrades are closed in the blackout period at New Year."),
        c("Benefit condition", "One benefit condition is a stay of two nights."),
      ],
      grammar: [
        g(
          "Rule is rule.",
          "You have to stay two nights because demand is very high at weekends.",
          "'have to' + động từ nguyên mẫu = điều bắt buộc; 'because' + LÝ DO THẬT. 'Vì đó là quy định' không phải là lý do.",
          "You have stay two nights because demand is very high at weekends.",
        ),
        g(
          "New Year no upgrade.",
          "I am afraid points upgrades are closed during the blackout period.",
          "'I am afraid…' làm mềm tin xấu; 'during + khoảng thời gian'.",
          "I am afraid points upgrades is closed during the blackout period.",
        ),
      ],
      speaking: [
        sp(
          "Why can I not book the suite for just one night?",
          t2a,
          "Nêu lý do thật bằng because — cuối tuần khách đặt rất đông. Nói vì đó là quy định thì chưa phải lý do.",
        ),
        sp(
          "Is that just your policy, or can you change it?",
          t2b,
          "Không đổi được thì nói thẳng, rồi đưa ngay điều khách CÓ THỂ làm.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Fine. Then I will come on Wednesday instead.",
          t2c,
          "Khép lại bằng ai xác nhận và khi nào.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "Why can I not use my points at New Year?",
          "New Year is in the blackout period, sir, because the hotel is full every year.",
          "Lý do thật, khách hiểu được: khách sạn kín phòng.",
        ),
        sp(
          "Why is the lounge closed on Monday morning?",
          "Because we clean it every Monday, sir. It opens again at eleven.",
          "Lý do thật + giờ mở lại.",
        ),
        sp(
          "Why is there no free breakfast on this stay?",
          "Free breakfast has one benefit condition, madam: you have to stay two nights.",
          "Chỉ đúng điều kiện còn thiếu, không đổ lỗi cho khách.",
        ),
        sp(
          "Why is the executive suite so much more expensive?",
          "Because butler service is included, madam, and the suite is much bigger.",
          "Ôn tuần 23: lý do thật là dịch vụ đi kèm phòng.",
          undefined,
          ["butler", "service"],
        ),
      ],
      reading: read(
        `Mrs Patel wants the suite for one Saturday night. Duc explains the two-night minimum at weekends and the real reason: demand is very high. Mrs Patel asks if it is just policy. Duc does not argue, and he does not change the rule. He offers what is possible: one weekday night. Mrs Patel books Wednesday.`,
        [
          {
            q: "Đức nêu lý do gì cho quy định ở tối thiểu hai đêm?",
            options: [
              "Vì đó là quy định chung của khách sạn",
              "Vì cuối tuần khách đặt rất đông",
              "Vì phòng hạng sang cần dọn lâu",
            ],
            correct: 1,
            explanation:
              "'the real reason: demand is very high' — 'vì là quy định' không phải lý do; lý do thật là nhu cầu cuối tuần.",
          },
          {
            q: "Đức đề nghị gì cho khách?",
            options: [
              "Đổi sang một khách sạn khác cùng tập đoàn",
              "Xin quản lý bỏ quy định cho riêng khách",
              "Một đêm vào ngày thường trong tuần",
            ],
            correct: 2,
            explanation:
              "'He offers what is possible: one weekday night' — không đổi được luật thì đưa lựa chọn khách dùng được.",
          },
        ],
      ),
      game: [
        game(
          "Why do I have to stay two nights for the suite?",
          "Because demand is very high at weekends, madam.",
          "Because demand are very high at weekends, madam.",
          "Because the manager likes it that way, madam. I do not really know why.",
          undefined,
          "Câu cuối không nêu lý do và làm khách sạn mất uy tín. Câu đúng nêu lý do thật: cuối tuần khách đặt rất đông.",
        ),
        game(
          "Why are points upgrades closed over New Year?",
          "Because the hotel is full every New Year, sir.",
          "Because hotel is full every New Year, sir.",
          "Because of New Year, sir, but I can still book it with your points for you.",
          undefined,
          "Câu cuối hứa vượt quy định giai đoạn ngưng ưu đãi. Câu đúng nêu lý do thật bằng because.",
        ),
      ],
    }),

    L(24, 3, "Loyalty Rules", "Quy định hội viên", {
      vocabulary: [
        c("Points expiry rule", "Under the points expiry rule, points end after two years."),
        c("Loyalty office", "The loyalty office checks your points."),
        c("Tier renewal rule", "The tier renewal rule asks for twenty nights a year."),
        c("Membership tier rule", "The membership tier rule gives Gold members lounge breakfast."),
      ],
      grammar: [
        g(
          "Points finish. Gone.",
          "Your points ended in May because you had no stay for two years.",
          "'because' + mệnh đề (chủ ngữ + động từ); 'because of' + danh từ.",
          "Your points ended in May because of you had no stay for two years.",
        ),
        g(
          "You silver now.",
          "You have to stay twenty nights a year to keep Gold, madam.",
          "'have to' + V; 'to keep' chỉ mục đích.",
          "You have to stay twenty nights a year for keep Gold, madam.",
        ),
      ],
      speaking: [
        sp(
          "My points are gone! I had eight thousand points.",
          t3a,
          "Xin lỗi về điều khách gặp, rồi nói đúng quy định bằng lời đơn giản.",
        ),
        sp(
          "But I stayed at your sister hotel last year!",
          t3b,
          "Khách đưa thông tin mới: cảm ơn, rồi chuyển đúng bộ phận kiểm tra.",
          undefined,
          undefined,
          t3a,
        ),
        risk(
          also(
            sp(
              "Can you just put the points back for me now?",
              t3c,
              "Điểm thưởng do bộ phận hội viên quyết. Bạn không tự cộng điểm.",
              undefined,
              ["points", "loyalty", "office"],
              t3b,
            ),
            "I am sorry, I cannot change your points. The loyalty office will check them.",
            "The loyalty office will check your points, sir. I cannot change them myself.",
          ),
        ),
        sp(
          "How do I keep my Gold card next year?",
          "You have to stay twenty nights a year, sir. That is our tier renewal rule.",
          "Nói điều khách phải làm trước, tên quy định sau.",
        ),
        sp(
          "What happens if I stay only fifteen nights this year?",
          "You have to stay twenty nights to keep Gold, sir, because of the tier renewal rule.",
          "'have to' cho điều kiện bắt buộc; 'because of' + danh từ.",
        ),
        sp(
          "Why does my wife not get lounge breakfast on her own card?",
          "The membership tier rule gives lounge breakfast to Gold members, sir.",
          "Nói đúng quy định nào, không tranh luận.",
        ),
        sp(
          "What does my Gold tier give me, exactly?",
          "The membership tier rule gives you a spa credit each stay, sir. It is a Gold privilege.",
          "Ôn tuần 23: nói đúng quy định và gọi đúng tên quyền lợi.",
          undefined,
          ["spa", "credit", "privilege"],
        ),
      ],
      reading: read(
        `Mr Jensen's eight thousand points are gone. Tuan explains the points expiry rule: points end after two years without a stay. Mr Jensen says he stayed at a sister hotel last year. Tuan cannot change points himself, so he asks the loyalty office to check. On Friday, the loyalty office finds the stay and returns the points.`,
        [
          {
            q: "Vì sao điểm của ông Jensen bị mất?",
            options: [
              "Vì ông đã đổi điểm lấy một đêm miễn phí",
              "Vì hai năm liền không có lượt lưu trú",
              "Vì hệ thống của khách sạn bị lỗi tháng trước",
            ],
            correct: 1,
            explanation:
              "'points end after two years without a stay' — quy định hết hạn điểm, nói bằng lời khách hiểu.",
          },
          {
            q: "Ai trả lại điểm cho ông Jensen?",
            options: [
              "Tuấn, ngay khi khách đưa thông tin",
              "Quầy lễ tân, khi khách trả phòng",
              "Bộ phận hội viên, sau khi kiểm tra",
            ],
            correct: 2,
            explanation:
              "'the loyalty office finds the stay and returns the points' — GRO chuyển yêu cầu, bộ phận hội viên kiểm tra và quyết.",
          },
        ],
      ),
      game: [
        game(
          "Why did all my points disappear?",
          "Points end after two years without a stay, sir.",
          "Points ends after two years without a stay, sir.",
          "The system sometimes deletes points, sir. It happens to everyone here.",
          undefined,
          "Câu cuối đổ cho hệ thống và làm khách mất lòng tin. Câu đúng nêu đúng quy định hết hạn điểm.",
        ),
        game(
          "Just put my eight thousand points back, please.",
          "I cannot change your points, sir. The loyalty office will check them for you.",
          "Of course, sir. I add eight thousand points back right now.",
          "Of course, sir. I will add the eight thousand points back to your account right now.",
          undefined,
          "Câu cuối tự cộng điểm — việc của bộ phận hội viên. Câu đúng từ chối và chuyển đúng người kiểm tra.",
        ),
      ],
    }),

    L(24, 4, "Privacy Is a Rule Too", "Bảo mật cũng là một quy định", {
      vocabulary: [
        c("Guest privacy rule", "Our guest privacy rule protects every guest's details."),
        c("Confidential", "Room numbers are confidential, even for family.", [
          "/ˌkɒnfɪˈdenʃl/",
          "Bảo mật, riêng tư",
          "🔒",
        ]),
        c("Consent form", "We ask you to sign a consent form before we keep your preferences."),
        c("Send you a message", "I will send you a message when your visitor arrives."),
      ],
      grammar: [
        g(
          "He in 1205. Go up.",
          "I am sorry, I cannot confirm who is staying with us.",
          "Không xác nhận ai đang ở khách sạn — với bất kỳ ai hỏi, kể cả người nói là người nhà.",
          "I am sorry, I cannot confirm who are staying with us.",
        ),
        g(
          "Sign here. Must.",
          "We have to ask you to sign a consent form, because we keep your preferences.",
          "'have to ask you to + V'. Nêu lý do thật: khách sạn lưu sở thích của khách.",
          "We have to ask you sign a consent form, because we keep your preferences.",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "Hello, is Mr Ahmed staying at your hotel? I am his friend.",
              t4a,
              "Không nói có, không nói không. Câu này giữ an toàn cho khách.",
              undefined,
              ["confirm", "staying"],
            ),
            "I am sorry, sir. I cannot confirm who is staying with us.",
            "I cannot confirm who is staying at the hotel, sir.",
            "I am sorry, I cannot confirm if he is staying with us.",
            "I cannot confirm whether he is staying here, sir.",
            "I am afraid I cannot give out any information about our guests.",
          ),
        ),
        risk(
          also(
            sp(
              "But it is urgent. Just give me his room number.",
              t4b,
              "Dù gấp, số phòng vẫn là thông tin bảo mật.",
              undefined,
              ["room", "numbers", "confidential"],
              t4a,
            ),
            "Room numbers are confidential, sir.",
            "I am sorry, room numbers are confidential, even when it is urgent.",
            "I am sorry, sir. I cannot give out room numbers. They are confidential.",
          ),
        ),
        risk(
          also(
            sp(
              "Then can you give him a message from me?",
              t4c,
              "Nhận lời nhắn mà KHÔNG xác nhận khách có ở đây: nói 'nếu khách đang lưu trú'.",
              undefined,
              ["take", "message", "guest", "staying", "tell"],
              t4b,
            ),
            "I can take a message, sir. If the guest is staying here, we will tell them.",
            "If the guest is staying with us, we will tell them. I can take a message, sir.",
            "I can take a message, sir. If he is staying with us, we will tell him.",
          ),
        ),
        risk(
          also(
            sp(
              "Why can you not tell me if my friend is here?",
              "I am sorry, madam. Because of our guest privacy rule, that is confidential.",
              "Không xác nhận khách lưu trú, kể cả với bạn của khách — nêu đúng quy định.",
              undefined,
              ["because", "guest", "privacy", "rule", "confidential"],
            ),
            "That is confidential because of our guest privacy rule, madam.",
            "I am sorry, that is confidential, madam, because of our guest privacy rule.",
          ),
        ),
        sp(
          "Why do I have to sign this form at check-in?",
          "The consent form asks your permission, madam, because we keep your preferences on file.",
          "Lý do thật: khách sạn lưu sở thích của khách, nên phải hỏi trước.",
        ),
        sp(
          "A friend is visiting me at four. Can you tell me when she arrives?",
          "Of course, madam. I will send you a message when your visitor arrives.",
          "Khách tự nhờ báo về khách của mình: nhận việc, nói cách bạn báo.",
        ),
        sp(
          "Why did you not tell my friend that I was here?",
          "Our guest privacy rule protects you, madam. I tell visitors only when you ask me to.",
          "Giải thích quy định bảo mật như một điều bảo vệ chính khách.",
        ),
        sp(
          "The lady at the desk was so kind. Can I have her phone number?",
          "I am sorry, sir. I cannot give out staff phone numbers, but I will pass on your thanks.",
          "Số điện thoại của nhân viên cũng là thông tin riêng — từ chối nhẹ, rồi chuyển lời cảm ơn.",
        ),
        sp(
          "Please do not tell anyone that I am staying here.",
          "Of course, madam. We will not confirm your stay to anyone who asks.",
          "Khách xin ẩn danh: nhận lời rõ ràng, không giải thích dài.",
        ),
      ],
      reading: read(
        `A caller asks Hoa if Mr Ahmed is staying at the hotel. Hoa does not say yes, and she does not say no. She explains that room numbers are confidential. The caller says it is urgent. Hoa still confirms nothing. She offers to take a message and says it will reach the guest if he is staying there.`,
        [
          {
            q: "Hoa trả lời thế nào khi người gọi hỏi ông Ahmed có ở khách sạn không?",
            options: [
              "Nói ông Ahmed đã trả phòng hôm qua",
              "Nối máy thẳng lên phòng ông Ahmed",
              "Không xác nhận có hay không",
            ],
            correct: 2,
            explanation:
              "'Hoa does not say yes, and she does not say no' — nói 'không' cũng là cho người lạ biết một điều về khách.",
          },
          {
            q: "Vì sao Hoa nói lời nhắn sẽ tới 'nếu khách đang lưu trú'?",
            options: [
              "Để nhận lời nhắn mà không lộ khách có ở đây",
              "Vì Hoa không chắc ông Ahmed có điện thoại trong phòng",
              "Vì người gọi chưa cho biết tên của mình",
            ],
            correct: 0,
            explanation:
              "'it will reach the guest if he is staying there' — nhận lời nhắn giúp người gọi mà vẫn không xác nhận gì.",
          },
        ],
      ),
      game: [
        game(
          "I am his wife. Just tell me which room he is in.",
          "I am sorry, madam. Room numbers are confidential.",
          "If you are his wife, madam, he in 1205.",
          "If you are his wife, madam, he is in 1205.",
          undefined,
          "Câu cuối tin lời người lạ và cho số phòng — không ai kiểm chứng được người đó là vợ khách. Câu đúng giữ bảo mật, lịch sự.",
        ),
        game(
          "Is Mr Ahmed in the hotel right now? Yes or no?",
          "I am sorry, I cannot confirm who is staying with us.",
          "I am sorry, I cannot confirm who are staying with us.",
          "He went out an hour ago, sir, but he will be back for dinner.",
          undefined,
          "Câu cuối tiết lộ lịch đi lại của khách cho người lạ. Câu đúng không xác nhận gì.",
        ),
      ],
    }),
  ];
}

// ── Week 25 — Promising a time you can keep ────────────────────────────
function week25(): LessonContent[] {
  const t1a = "I understand it is urgent, sir. I will call the taxi company straight away.";
  const t1b = "I will call you back within ten minutes, sir.";
  const t1c = "Of course, sir. I will call your room in ten minutes, with or without news.";
  const s1a = "I am sorry, madam. Guest details are confidential.";
  const s1b = "I understand it is urgent, madam. I can take a message for the guest.";
  const s1c = "Of course, madam. If he is staying with us, he will get your message straight away.";
  const t2a = "Housekeeping is going to finish your room by three o'clock, madam.";
  const t2b = "You are welcome in the lounge, madam. I will reserve a table for you now.";
  const t2c = "Yes, madam. I am going to escort you to your room at three.";
  const t3a = "Of course, sir. I will ask the executive chef and call you back by five.";
  const t3b = "Then I will bring you the menu choices by five, sir, and you can choose.";
  const t3c = "Thank you, sir. I will tell the chef about her dietary requirement now.";
  const t3d = "With your consent, I will note it in your guest file, sir.";
  const t4a = "I cannot confirm the upgrade myself, sir. The front office will call you.";
  const t4b = "I understand, sir. I will speak to the duty manager now.";
  const t4c = "I will come to the lounge with an answer in fifteen minutes, sir.";
  return [
    L(
      25,
      1,
      "Within Ten Minutes — and What You Do Not Say",
      "Cam kết có mốc — và điều không được nói",
      {
        vocabulary: [
          c("Within", "I will call you back within ten minutes."),
          c("Straight away", "I will call the taxi company straight away."),
          c("Urgent", "This is urgent, so I will start on it straight away.", [
            "/ˈɜːdʒənt/",
            "Khẩn cấp",
            "⏰",
          ]),
          c("Discretion", "We treat every guest's stay with discretion.", [
            "/dɪˈskreʃn/",
            "Sự kín đáo, tế nhị",
            "🤐",
          ]),
        ],
        grammar: [
          g(
            "I call later.",
            "I will call you back within ten minutes, madam.",
            "Cam kết có mốc: 'within + số phút'. 'Later' hay 'soon' không phải lời hứa.",
            "I will calling you back within ten minutes, madam.",
          ),
          g(
            "Urgent? Wait.",
            "I understand it is urgent, sir. I will start on it straight away.",
            "Công nhận việc gấp của khách, rồi hành động ngay. 'straight away' đứng cuối câu.",
            "I understand it urgent, sir. I will start on it straight away.",
          ),
        ],
        speaking: [
          sp(
            "I left my passport in the taxi! It was a green taxi.",
            t1a,
            "Công nhận việc gấp, rồi nói việc bạn làm ngay.",
          ),
          sp(
            "When will I know something?",
            t1b,
            "Lời hứa có mốc bằng số phút. Hẹn lát nữa thì khách không biết chờ đến khi nào.",
            undefined,
            undefined,
            t1a,
          ),
          sp(
            "Thank you. I will wait in my room, then.",
            t1c,
            "Giữ đúng mốc đã hứa — gọi cả khi chưa có tin.",
            undefined,
            undefined,
            t1b,
          ),
          risk(
            also(
              sp(
                "I am Mr Kim's secretary. What time is his flight tomorrow?",
                s1a,
                "Lịch bay, số phòng, giờ đi của khách đều là thông tin bảo mật — kể cả với thư ký.",
                undefined,
                ["guest", "details", "confidential"],
              ),
              "I am sorry, guest details are confidential, madam.",
              "I am sorry, madam. I cannot give out guest details. They are confidential.",
              "I am sorry, madam. I cannot give out guest details.",
            ),
          ),
          risk(
            also(
              sp(
                "But it is urgent. I have to book his car.",
                s1b,
                "Việc gấp không mở được thông tin của khách. Giúp bằng cách nhận lời nhắn.",
                undefined,
                ["understand", "urgent", "take", "message", "guest"],
                s1a,
              ),
              "I understand it is urgent. I can take a message for the guest, madam.",
              "I can take a message for the guest, madam. I understand it is urgent.",
            ),
          ),
          sp(
            "Fine. Please ask him to call me at once.",
            s1c,
            "Không hứa khách sẽ gọi lại, không xác nhận khách ở đây — chỉ hứa lời nhắn tới khách nếu khách đang lưu trú.",
            undefined,
            undefined,
            s1b,
          ),
          sp(
            "Will anyone else hear about my visit to the hotel?",
            "No, madam. Because of our guest privacy rule, we treat every stay with discretion.",
            "Ôn tuần 24: trấn an bằng đúng quy định bảo mật, một câu chắc chắn.",
            undefined,
            ["guest", "privacy", "rule", "discretion"],
          ),
        ],
        reading: read(
          `Mr Kim left his passport in a green taxi. Khoa says: "I understand it is urgent." He calls the taxi company straight away and promises to call Mr Kim back within ten minutes. At ten minutes, there is no news. Khoa calls Mr Kim anyway, as he promised. He calls again when the driver brings the passport.`,
          [
            {
              q: "Khoa hứa gọi lại cho khách trong bao lâu?",
              options: [
                "Ngay khi tài xế trả lời điện thoại",
                "Trong vòng mười phút",
                "Trước khi khách ra sân bay",
              ],
              correct: 1,
              explanation:
                "'promises to call Mr Kim back within ten minutes' — lời hứa có mốc bằng số, khách biết chờ đến khi nào.",
            },
            {
              q: "Vì sao Khoa vẫn gọi cho khách khi chưa có tin?",
              options: [
                "Vì khách đã gọi xuống quầy hai lần",
                "Vì lễ tân nhắc Khoa phải gọi",
                "Vì Khoa đã hứa gọi đúng mốc đó",
              ],
              correct: 2,
              explanation:
                "'Khoa calls Mr Kim anyway, as he promised' — giữ đúng mốc đã hứa, kể cả khi chỉ báo 'chưa có tin'.",
            },
          ],
        ),
        game: [
          game(
            "Can you check that my airport car is booked for tomorrow?",
            "Of course, sir. I will call you back within ten minutes.",
            "Of course, sir. I will calling you back within ten minutes.",
            "I am sure it is booked, sir. Our concierge never forgets a car.",
            undefined,
            "Câu cuối đoán thay vì kiểm tra. Câu đúng nhận việc và hứa một mốc gọi lại cụ thể.",
          ),
          game(
            "I am his assistant. Which flight is Mr Kim on?",
            "I am sorry, madam. Guest details are confidential.",
            "He on the morning flight, madam, at seven.",
            "He is on the morning flight, madam, at seven.",
            undefined,
            "Câu cuối nói lịch bay của khách cho một người chưa ai kiểm chứng. Câu đúng giữ bảo mật, lịch sự.",
          ),
        ],
      },
    ),

    L(25, 2, "Going To — and By Three O'clock", "Kế hoạch — và mốc ba giờ", {
      vocabulary: [
        c("Going to", "We are going to prepare your room by three o'clock."),
        c("Reserve", "I will reserve a table in the lounge for you.", [
          "/rɪˈzɜːv/",
          "Đặt giữ chỗ",
          "📌",
        ]),
        c("Itinerary", "Your itinerary for tomorrow is going to be ready by six.", [
          "/aɪˈtɪnərəri/",
          "Lịch trình chi tiết của khách",
          "🗺️",
        ]),
        c("Escort", "I am going to escort you to your room at three.", [
          "/ɪˈskɔːt/",
          "Đưa, dẫn khách đi",
          "🚶",
        ]),
      ],
      grammar: [
        g(
          "Room later.",
          "Your room is going to be ready by three o'clock, madam.",
          "'be going to' cho kế hoạch đã sắp xếp; 'by three o'clock' = không muộn hơn ba giờ.",
          "Your room going to be ready by three o'clock, madam.",
        ),
        g(
          "Plan tomorrow, later.",
          "Your itinerary for tomorrow is going to be ready by six, sir.",
          "'is going to be ready' — kế hoạch có mốc. Thiếu 'be' là sai.",
          "Your itinerary for tomorrow is going to ready by six, sir.",
        ),
      ],
      speaking: [
        sp(
          "We arrived early. When can we go to our room?",
          t2a,
          "Kế hoạch có sẵn: 'going to' + mốc giờ — và nói đúng ai đang làm phòng.",
        ),
        sp(
          "Three? What can we do until then?",
          t2b,
          "Đưa một việc khách làm được ngay trong lúc chờ.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Lovely. Will you come and get us?",
          t2c,
          "Nhắc lại đúng mốc giờ đã nói, không đổi số.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "Is the lounge available for a quiet meeting at four?",
          "I will check with the lounge and call you back by two, sir.",
          "Chưa biết thì hứa mốc gọi lại, không hứa thay phòng chờ.",
        ),
        sp(
          "We have an early tour tomorrow. Can you wake us up?",
          "Of course, madam. What wake-up time would you like?",
          "Hỏi lại đúng thông tin cần (wake-up time, đã học) trước khi nhận lời.",
        ),
        sp(
          "Can I see the plan for tomorrow before dinner?",
          "Of course, sir. Your itinerary for tomorrow is going to be ready by six.",
          "Kế hoạch đã định: 'going to' + mốc giờ.",
        ),
        sp(
          "Is there a dress rule for the cocktail hour tonight?",
          "Yes, madam. The lounge dress code is long trousers after six.",
          "Ôn tuần 24: nói đúng tên quy định và nội dung của nó.",
          undefined,
          ["lounge", "dress", "code"],
        ),
        sp(
          "Can we check in somewhere quiet when we arrive tomorrow?",
          "Yes, madam. Your private check-in is going to be in the executive suite.",
          "Ôn tuần 23: kế hoạch có sẵn ('going to'), gọi đúng tên dịch vụ.",
          undefined,
          ["private", "executive", "suite"],
        ),
      ],
      reading: read(
        `The Moreau family arrives at eleven, but their suite is going to be ready by three o'clock. Vy finds them a table in the lounge so they can rest. At two, she checks with housekeeping, and the suite is on time. At three, Vy escorts the family to their room, as she promised.`,
        [
          {
            q: "Vy làm gì cho gia đình trong lúc chờ phòng?",
            options: [
              "Đổi cho gia đình một phòng khác đã sẵn sàng",
              "Mời gia đình đi dạo phố đến ba giờ chiều",
              "Tìm cho gia đình một bàn trong phòng chờ",
            ],
            correct: 2,
            explanation:
              "'Vy finds them a table in the lounge so they can rest' — đưa khách một việc làm được ngay trong lúc chờ.",
          },
          {
            q: "Vì sao Vy kiểm tra với tổ buồng lúc hai giờ?",
            options: [
              "Vì khách gọi xuống hỏi đã xong chưa",
              "Để chắc phòng xong đúng mốc ba giờ",
              "Vì tổ buồng báo phòng có sự cố",
            ],
            correct: 1,
            explanation:
              "'At two, she checks with housekeeping, and the suite is on time' — kiểm tra trước mốc để giữ được lời hứa.",
          },
        ],
      ),
      game: [
        game(
          "Roughly what time can I have my room?",
          "Your room is going to be ready by three o'clock, sir.",
          "Soon, sir. Housekeeping team always very fast.",
          "Soon, sir. Our housekeeping team is always very fast in the afternoon.",
          undefined,
          "'Soon' không phải lời hứa: khách không biết chờ đến khi nào. Câu đúng có mốc: 'by three o'clock'.",
        ),
        game(
          "Will someone take us up when the room is ready?",
          "Yes, madam. I am going to escort you to your room.",
          "Yes, madam. I going to escort you to your room.",
          "The lift is on your left, madam. The room is easy to find.",
          undefined,
          "Câu cuối để khách VIP tự tìm phòng. Câu đúng nói rõ bạn sẽ đưa khách lên.",
        ),
      ],
    }),

    L(25, 3, "Keeping the Guest Informed", "Báo cho khách biết tiến độ", {
      vocabulary: [
        c("Executive chef", "The executive chef plans the dinner menu."),
        c("Allergy", "Please tell me about any allergy before dinner.", [
          "/ˈælədʒi/",
          "Dị ứng",
          "⚠️",
        ]),
        c("Dietary requirement", "Please tell us about any dietary requirement before dinner.", [
          "/ˈdaɪətəri rɪˈkwaɪəmənt/",
          "Yêu cầu về chế độ ăn",
          "🥗",
        ]),
        c("Shellfish", "The guest in 1204 cannot eat shellfish.", [
          "/ˈʃelfɪʃ/",
          "Hải sản có vỏ (tôm, cua, sò)",
          "🦐",
        ]),
      ],
      grammar: [
        g(
          "Kitchen, I ask.",
          "I will ask the executive chef and call you back by five.",
          "Hai việc nối bằng 'and', cùng sau 'will', đều ở dạng gốc.",
          "I will ask the executive chef and calling you back by five.",
        ),
        g(
          "I write it.",
          "With your consent, I will note it in your guest file, so we remember next time.",
          "Hỏi ý khách trước khi lưu. 'we' đi với động từ không thêm -s.",
          "With your consent, I will note it in your guest file, so we remembers next time.",
        ),
      ],
      speaking: [
        sp(
          "My wife eats no meat. Can the kitchen make something special tonight?",
          t3a,
          "Hai việc trong một lời hứa, kèm một mốc giờ.",
        ),
        sp(
          "What if the chef cannot do it?",
          t3b,
          "Có phương án dự phòng, vẫn giữ đúng mốc năm giờ.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Thank you. She eats fish, by the way.",
          t3c,
          "Thông tin mới: báo bếp ngay, gọi đúng tên — yêu cầu về chế độ ăn.",
          undefined,
          undefined,
          t3b,
        ),
        risk(
          also(
            sp(
              "Can you remember that for our next stay?",
              t3d,
              "Ôn tuần 24: chỉ lưu sở thích khi khách đồng ý — hỏi trước, ghi sau.",
              undefined,
              ["consent", "note", "guest", "file"],
              t3c,
            ),
            "With your consent, sir, I will note it in your guest file.",
            "I will note it in your guest file, sir, with your consent.",
          ),
        ),
        sp(
          "Will anyone check on us after we move in?",
          "Yes, madam. I am going to call your room at five o'clock.",
          "Kế hoạch có sẵn: 'going to' + mốc giờ.",
        ),
        sp(
          "My son cannot eat gluten. Who should I tell?",
          "Please tell me, madam. I will give his dietary requirement to the kitchen now.",
          "Nhận thông tin, chuyển đúng bếp, kèm mốc.",
        ),
        risk(
          also(
            sp(
              "Can you tell the kitchen I am allergic to shellfish?",
              "Thank you, sir. I will tell the chef about your shellfish allergy now.",
              "Dị ứng là chuyện an toàn: cảm ơn khách, báo bếp ngay — không tự hứa món ăn an toàn thay bếp.",
              undefined,
              ["tell", "chef", "shellfish", "allergy"],
            ),
            "Thank you, sir. I will tell the executive chef about your shellfish allergy now.",
            "I will tell the chef about your shellfish allergy straight away, sir.",
            "Thank you, sir. I will inform the chef about your shellfish allergy now.",
          ),
        ),
      ],
      reading: read(
        `Mr Silva says his wife eats no meat, but she eats fish. Quan asks the executive chef and promises to call back by five. At half past four, the chef sends two choices, and Quan calls Mr Silva. Mrs Silva agrees, so Quan notes her dietary requirement in her guest file.`,
        [
          {
            q: "Quân hứa báo cho khách lúc nào?",
            options: ["Trước năm giờ chiều", "Trước bữa sáng mai", "Ngay khi khách gọi"],
            correct: 0,
            explanation:
              "'promises to call back by five' — và Quân gọi lúc bốn rưỡi, trước mốc đã hứa.",
          },
          {
            q: "Vì sao Quân được ghi chế độ ăn vào hồ sơ của bà Silva?",
            options: [
              "Vì bếp yêu cầu ghi lại mọi món ăn của khách",
              "Vì bà Silva đồng ý cho lưu thông tin đó",
              "Vì ông Silva là hội viên hạng Vàng",
            ],
            correct: 1,
            explanation:
              "'Mrs Silva agrees, so Quan notes her dietary requirement' — chỉ lưu khi khách đã đồng ý.",
          },
        ],
      ),
      game: [
        game(
          "Will somebody tell me what the kitchen says?",
          "Yes, madam. I will call you back personally by five.",
          "Please calling the kitchen yourself, madam. Their number is on the room menu.",
          "Please call the kitchen yourself, madam. Their number is on the room menu.",
          undefined,
          "Câu cuối đẩy việc sang khách. Câu đúng nhận việc báo tin, kèm mốc giờ.",
        ),
        game(
          "Please remember that I do not eat pork.",
          "With your consent, I will note it in your guest file, sir.",
          "With your consent, I will notes it in your guest file, sir.",
          "Of course, sir. I will put it on the staff board.",
          undefined,
          "Câu cuối dán thông tin của khách ở nơi ai cũng đọc được. Câu đúng hỏi ý khách và lưu đúng hồ sơ.",
        ),
      ],
    }),

    L(25, 4, "Not Yours to Promise", "Khi lời hứa không thuộc về bạn", {
      vocabulary: [
        c("Upgrade", "Only the front office can confirm an upgrade.", [
          "/ˈʌpɡreɪd/",
          "Nâng hạng (phòng)",
          "⬆️",
        ]),
        c("Speak to the duty manager", "I will speak to the duty manager before six."),
        c("Arrange the transfer myself", "When a car is late, I arrange the transfer myself."),
        c("Delay", "I am very sorry for the delay, madam.", ["/dɪˈleɪ/", "Sự chậm trễ", "⏳"]),
      ],
      grammar: [
        g(
          "Upgrade okay, sure.",
          "The front office will confirm the upgrade by three o'clock, madam.",
          "Lời hứa có mốc, nhưng đúng người hứa: lễ tân xác nhận nâng hạng, không phải bạn.",
          "The front office will confirms the upgrade by three o'clock, madam.",
        ),
        g(
          "Late car. Sorry.",
          "I am very sorry for the delay. I will arrange the transfer myself.",
          "Trễ hẹn: xin lỗi + nhận việc về mình ('myself'). Sau 'will' là động từ nguyên mẫu.",
          "I am very sorry for the delay. I will arranging the transfer myself.",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "A receptionist said I might get an upgrade. Is it done?",
              t4a,
              "Nâng hạng do lễ tân xác nhận. Không tự hứa — nói ai sẽ gọi lại.",
              undefined,
              ["confirm", "upgrade", "myself", "front", "office"],
            ),
            "I am sorry, I cannot confirm the upgrade myself. The front office will call you.",
            "The front office will call you, sir. I cannot confirm the upgrade myself.",
          ),
        ),
        risk(
          also(
            sp(
              "When? I have a meeting at half past two.",
              t4b,
              "Mốc của khách sớm hơn: chuyển lên quản lý trực ngay, không tự hứa kết quả.",
              undefined,
              ["understand", "speak", "duty", "manager"],
              t4a,
            ),
            "I understand, sir. I will speak to the duty manager straight away.",
            "I will speak to the duty manager now, sir.",
          ),
        ),
        sp(
          "Thank you. I will be in the lounge.",
          t4c,
          "Hứa một câu trả lời có mốc giờ — không hứa kết quả nâng hạng.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "My car to the airport did not come!",
          "I am very sorry for the delay, madam. I will arrange the transfer myself now.",
          "Xin lỗi, nhận việc về mình, kèm mốc gọi lại.",
        ),
        sp(
          "Is my welcome gift coming? You said four o'clock.",
          "I am very sorry, sir. I will bring your welcome gift myself within ten minutes.",
          "Trễ hẹn: xin lỗi, giữ ĐÚNG việc khách chờ, đưa mốc mới.",
        ),
        sp(
          "Can someone carry my shopping up to the room?",
          "Of course, madam. Someone is going to bring it up within ten minutes.",
          "Kế hoạch ngay: 'going to' + một mốc giờ khách chờ được.",
        ),
        sp(
          "Can I book the suite for just this Saturday night?",
          "There is a two-night minimum at weekends, sir. I am going to check a weekday.",
          "Ôn tuần 24: nói đúng quy định, rồi việc bạn sắp làm cho khách.",
          undefined,
          ["minimum"],
        ),
      ],
      reading: read(
        `Mr Tanaka says a receptionist told him he might get an upgrade. Phuc cannot confirm the upgrade himself, so he says the front office will call. Mr Tanaka has a meeting at half past two. Phuc speaks to the duty manager at once, and the front office calls Mr Tanaka at two.`,
        [
          {
            q: "Vì sao Phúc không xác nhận việc nâng hạng?",
            options: [
              "Vì khách sạn đã hết phòng hạng cao",
              "Vì đó là việc lễ tân xác nhận",
              "Vì khách chưa đủ hạng hội viên",
            ],
            correct: 1,
            explanation:
              "'Phuc cannot confirm the upgrade himself' — nâng hạng là quyết định của lễ tân; GRO nói rõ ai gọi lại.",
          },
          {
            q: "Phúc làm gì khi khách có cuộc họp sớm?",
            options: [
              "Tự xác nhận nâng hạng cho khách kịp họp",
              "Báo quản lý trực ngay lúc đó",
              "Khuyên khách dời cuộc họp sang chiều",
            ],
            correct: 1,
            explanation:
              "'Phuc speaks to the duty manager at once' — mốc của khách sớm hơn thì đưa lên người có quyền, không tự hứa.",
          },
        ],
      ),
      game: [
        game(
          "So is my upgrade confirmed or not?",
          "I cannot confirm the upgrade myself, sir. The front office will call you.",
          "Yes, sir, it confirmed. I will telling the front office later.",
          "Yes, sir, it is confirmed. I will tell the front office later.",
          undefined,
          "Câu cuối tự xác nhận việc của lễ tân — nếu lễ tân không có phòng, khách bị hứa suông. Câu đúng nói ai xác nhận.",
        ),
        game(
          "My car to the airport is late again!",
          "I am very sorry, madam. I will arrange the transfer myself.",
          "I am very sorry, madam. I will arranging the transfer myself.",
          "The traffic is very bad today, madam. The car will come when it can.",
          undefined,
          "Câu cuối đổ cho giao thông và bỏ mặc khách. Câu đúng xin lỗi và nhận việc về mình.",
        ),
      ],
    }),
  ];
}

// ── Week 26 — One request, one owner ───────────────────────────────────
function week26(): LessonContent[] {
  const t1a = "Let me check with the reservations team for you, sir.";
  const t1b =
    "The reservations team can see which rooms are available, sir. I will call you back within ten minutes.";
  const t1c = "Enjoy the pool, sir. I am going to leave a message on your room phone.";
  const t2a = "Of course, sir. I will arrange it with the pastry chef for eight o'clock.";
  const t2b = "Thank you, sir. I will note the allergy for the pastry chef now.";
  const t2c =
    "I will ask the executive chef to call you, sir. The chef will check the ingredients.";
  const t3a = "I am so sorry, madam. I will ask the flower team to change them by noon.";
  const t3b = "Yes, madam. I have asked the flower team, and they are coming at noon.";
  const t3c = "I will also ask the housekeeping supervisor to send two pillows at noon.";
  const t4a = "Thank you, madam. I will stay with him and call security now.";
  const t4b = "Please do not take him away, madam. Security and the duty manager are on their way.";
  const t4c = "Security will check first, madam, and then he can go to her.";
  return [
    L(26, 1, "Let Me Check With…", "Để tôi hỏi bộ phận…", {
      vocabulary: [
        c("Transfer", "I will transfer your call to the loyalty office."),
        c("Concierge desk", "The concierge desk books tours and show tickets."),
        c("Reservations team", "The reservations team can change your dates."),
        c("Airport representative", "Our airport representative meets you at arrivals."),
      ],
      grammar: [
        g(
          "Not my job.",
          "Let me check with the reservations team for you, madam.",
          "'Let me check with + bộ phận' — nhận việc thay khách, không đẩy khách đi.",
          "Let me check to the reservations team for you, madam.",
        ),
        g(
          "Call loyalty yourself.",
          "The loyalty office handles points. I will transfer your call now.",
          "Bộ phận là chủ ngữ số ít: 'handles'. Rồi TỰ chuyển máy giúp khách.",
          "The loyalty office handle points. I will transfer your call now.",
        ),
      ],
      speaking: [
        also(
          sp(
            "I want to stay two more nights. Can you change my booking?",
            t1a,
            "Việc của bộ phận đặt phòng: nhận lời, tự liên hệ, không bảo khách tự gọi.",
          ),
          "Let me check with our reservations team, sir.",
        ),
        sp(
          "Why can you not change it here at your desk?",
          t1b,
          "Nói vì sao đúng người làm, rồi hứa mốc gọi lại.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Fine. I am going to the pool now.",
          t1c,
          "Khách đi vắng: nói rõ bạn sẽ báo tin bằng cách nào.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "Is this the right number for my points question?",
          "The loyalty office handles points, madam. I will transfer your call now.",
          "Ôn tuần 24: nói đúng bộ phận phụ trách rồi tự chuyển máy.",
          undefined,
          ["loyalty", "office"],
        ),
        sp(
          "Can you book us a cooking class for Saturday?",
          "Let me check with the concierge desk about the cooking class, sir.",
          "Một việc, đúng bàn phụ trách — và nhắc lại đúng việc khách cần (cooking class, đã học).",
        ),
        sp(
          "Who can book our car to the airport on Friday?",
          "The concierge desk can arrange your airport transfer, madam. Let me check a time with them.",
          "Ôn tuần 23: gọi đúng tên dịch vụ, và đúng bàn sắp xếp.",
          undefined,
          ["airport", "transfer"],
        ),
        sp(
          "Can I use my points for the suite at New Year?",
          "New Year is in the blackout period, sir. Let me check with the reservations team for other dates.",
          "Ôn tuần 24: nói đúng quy định, rồi nhận việc tìm ngày khác.",
          undefined,
          ["blackout", "period"],
        ),
        sp(
          "We land late tomorrow. Is anyone from the hotel at the airport?",
          "Yes, sir. Our airport representative waits at arrivals and helps with your bags.",
          "Nói đúng người của khách sạn ở sân bay và người đó làm gì.",
        ),
        sp(
          "Will my points end if I do not stay this year?",
          "Under the points expiry rule, they end after two years, madam. Let me check with the loyalty office.",
          "Ôn tuần 24: nói đúng quy định, rồi hỏi đúng bộ phận.",
          undefined,
          ["points", "expiry", "rule"],
        ),
      ],
      reading: read(
        `Mr Haddad wants two more nights. Lan does not change the booking herself. She checks with the reservations team, because they can see which rooms are available, and promises to call back within ten minutes. Mr Haddad goes to the pool. Seven minutes later, the reservations team confirms the two nights. Lan cannot reach Mr Haddad at the pool, so she leaves a message on his room phone and tells the pool attendant too. Mr Haddad hears the news before he leaves the pool.`,
        [
          {
            q: "Vì sao Lan hỏi bộ phận đặt phòng?",
            options: [
              "Vì khách yêu cầu được nói chuyện với quản lý trực",
              "Vì bộ phận đó thấy được phòng còn trống",
              "Vì máy tính ở quầy của Lan bị hỏng",
            ],
            correct: 1,
            explanation:
              "'because they can see which rooms are available' — đúng người làm thì câu trả lời mới đúng.",
          },
          {
            q: "Việc nào xảy ra SAU KHI bộ phận đặt phòng xác nhận?",
            options: [
              "Lan hứa gọi lại cho khách trong vòng mười phút",
              "Khách xin ở thêm hai đêm",
              "Lan để lời nhắn ở điện thoại phòng",
            ],
            correct: 2,
            explanation:
              "Thứ tự trong bài: khách xin → Lan hứa gọi lại → bộ phận đặt phòng xác nhận → Lan để lời nhắn và báo nhân viên hồ bơi.",
          },
          {
            q: "Vì sao Lan báo thêm cho nhân viên hồ bơi?",
            options: [
              "Để khách biết tin sớm dù không về phòng",
              "Vì nhân viên hồ bơi phải xác nhận đặt phòng",
              "Vì khách không cho Lan gọi vào phòng",
            ],
            correct: 0,
            explanation:
              "Khách đang ở hồ bơi, không nghe điện thoại phòng — báo hai đường để lời hứa 'mười phút' thật sự đến được khách.",
          },
        ],
      ),
      game: [
        game(
          "I need two tickets for the water puppet show tonight.",
          "Let me check with the concierge desk for you, madam.",
          "Show always full, madam. Try another night.",
          "I think that show is always full, madam. Maybe try another night.",
          undefined,
          "Câu cuối đoán và từ chối thay bộ phận khác. Câu đúng nhận việc và hỏi đúng bàn phụ trách.",
        ),
        game(
          "Who meets me when I land tomorrow?",
          "Our airport representative will meet you at arrivals, sir.",
          "Our airport representative will meets you at arrivals, sir.",
          "Just take any taxi at the airport, sir. It is easier than waiting.",
          undefined,
          "Câu cuối bỏ dịch vụ đón đã sắp xếp. Câu đúng nói đúng người đón và ở đâu.",
        ),
      ],
    }),

    L(26, 2, "I'll Ask Them To…", "Tôi sẽ nhờ họ…", {
      vocabulary: [
        c("Arrange", "I will arrange a birthday cake for eight o'clock."),
        c("Pastry chef", "The pastry chef makes our birthday cakes."),
        c("Ingredients", "The chef checks the ingredients of every cake.", [
          "/ɪnˈɡriːdiənts/",
          "Nguyên liệu, thành phần",
          "🧂",
        ]),
      ],
      grammar: [
        g(
          "Chef make cake.",
          "I will ask the pastry chef to make a birthday cake for tonight.",
          "'ask + người + to + động từ': giao việc rõ ai làm gì.",
          "I will ask the pastry chef make a birthday cake for tonight.",
        ),
        g(
          "Allergy? What?",
          "Does anyone in your party have an allergy, madam?",
          "Hỏi TRƯỚC khi đặt món. Sau 'Does' động từ giữ dạng gốc: have.",
          "Does anyone in your party has an allergy, madam?",
        ),
      ],
      speaking: [
        sp(
          "Can you arrange a birthday cake for my wife tonight?",
          t2a,
          "Một việc, một người làm, một mốc giờ.",
        ),
        risk(
          also(
            sp(
              "She cannot eat nuts. It is a serious allergy.",
              t2b,
              "Dị ứng là chuyện an toàn: ghi lại và báo đúng người làm bánh ngay.",
              undefined,
              ["note", "allergy", "pastry", "chef"],
              t2a,
            ),
            "Thank you for telling me, sir. I will note the allergy for the pastry chef now.",
            "I will note the allergy for the pastry chef straight away, sir.",
          ),
        ),
        risk(
          also(
            sp(
              "Can the chef promise the cake is safe for her?",
              t2c,
              "Bạn không hứa thay bếp. Bếp trưởng gọi lại và kiểm tra nguyên liệu.",
              undefined,
              ["ask", "executive", "chef", "call", "check", "ingredients"],
              t2b,
            ),
            "The chef will check the ingredients, sir. I will ask the executive chef to call you.",
            "I will ask the executive chef to call you and check the ingredients, sir.",
          ),
        ),
        sp(
          "We would like a special dinner on the terrace tomorrow.",
          "I will ask the executive chef to plan a menu, madam, and call you by noon.",
          "Giao việc cho đúng người (bếp trưởng), rồi hứa mốc gọi lại.",
        ),
        sp(
          "Can the pastry chef make a cake with no sugar?",
          "I will ask the pastry chef, sir, and call you back by six.",
          "Hỏi đúng người làm bánh, hứa mốc gọi lại — không tự hứa.",
        ),
        sp(
          "I cannot eat shellfish. Is the set menu all right for me?",
          "Thank you for telling me, madam. I will ask the executive chef to check every dish for shellfish.",
          "Ôn tuần 25: không tự hứa món an toàn — nhờ bếp trưởng kiểm tra.",
          undefined,
          ["shellfish"],
        ),
        sp(
          "Does the chef know about my vegetarian diet?",
          "Yes, madam. Your dietary requirement is with the executive chef now.",
          "Ôn tuần 25: gọi đúng tên thông tin và nói nó đang ở tay ai.",
          undefined,
          ["dietary", "requirement"],
        ),
        sp(
          "My mother walks slowly. Can someone take her to the restaurant?",
          "Of course, madam. I will ask the bell desk to escort her.",
          "Ôn tuần 25: đúng người đưa khách đi, làm ngay.",
          undefined,
          ["escort"],
        ),
      ],
      reading: read(
        `Mr Rossi asks Tuan for a birthday cake for his wife at eight. Then he says she cannot eat nuts. Tuan notes the allergy for the pastry chef at once, before anything else. Mr Rossi asks if the chef can promise the cake is safe. Tuan does not promise it himself. He asks the executive chef to call Mr Rossi, and the chef explains how the kitchen checks the ingredients. Mrs Rossi thanks Tuan for taking the allergy seriously.`,
        [
          {
            q: "Tuấn làm gì ngay khi biết khách bị dị ứng hạt?",
            options: [
              "Hủy đơn bánh để tránh rủi ro cho khách",
              "Ghi lại dị ứng và báo thợ làm bánh",
              "Khuyên khách đặt bánh ở tiệm bên ngoài",
            ],
            correct: 1,
            explanation:
              "'Tuan notes the allergy for the pastry chef at once' — thông tin an toàn đi tới đúng người làm, ngay lúc đó.",
          },
          {
            q: "Vì sao Tuấn không tự hứa bánh an toàn?",
            options: [
              "Vì bánh chưa được đặt cọc trước",
              "Vì khách không tin lời nhân viên",
              "Vì chỉ bếp mới biết bánh làm thế nào",
            ],
            correct: 2,
            explanation:
              "'He asks the executive chef to call Mr Rossi' — người làm món mới hứa được về món đó.",
          },
          {
            q: "Nếu Tuấn chờ bếp trưởng gọi rồi mới báo dị ứng, điều gì có thể xảy ra?",
            options: [
              "Thợ bánh có thể đã làm bánh có hạt",
              "Khách sẽ phải trả thêm tiền bánh",
              "Bếp trưởng sẽ không gọi cho khách",
            ],
            correct: 0,
            explanation:
              "'at once, before anything else' — thông tin dị ứng phải tới người làm bánh trước khi bánh được làm.",
          },
        ],
      ),
      game: [
        game(
          "My son has a nut allergy. Is the birthday cake all right for him?",
          "Thank you, madam. I will note the allergy for the pastry chef now.",
          "Of course, madam. All of our cake are always safe for children.",
          "Of course, madam. All of our cakes are always safe for children.",
          undefined,
          "Câu cuối hứa điều bạn không biết chắc — về dị ứng, đó là rủi ro thật. Câu đúng ghi lại và báo đúng người làm bánh.",
        ),
        game(
          "Can you promise me the cake has no nuts in it?",
          "I will ask the executive chef to call you, madam. The chef will check the ingredients.",
          "I will ask executive chef to call you, madam. The chef will check the ingredients.",
          "Yes, madam, I promise. Our cakes never have nuts.",
          undefined,
          "Câu cuối hứa thay bếp về một chuyện an toàn. Câu đúng để bếp trưởng gọi và kiểm tra.",
        ),
      ],
    }),

    L(26, 3, "Following Up With Other Teams", "Theo dõi việc với bộ phận khác", {
      vocabulary: [
        c("Flower team", "The flower team will change the flowers by noon."),
        c(
          "Housekeeping supervisor",
          "The housekeeping supervisor checks VIP rooms before arrival.",
        ),
        c("Lounge team", "The lounge team prepares the evening cocktail hour."),
        c("Bell desk", "The bell desk will bring your bags up within ten minutes."),
        c("Courtesy call", "I am going to make a courtesy call at five o'clock.", [
          "/ˈkɜːtəsi kɔːl/",
          "Cuộc gọi hỏi thăm khách",
          "☎️",
        ]),
      ],
      grammar: [
        g(
          "I tell already.",
          "I have asked the flower team, and they are coming at noon.",
          "Hiện tại hoàn thành 'have asked' báo việc ĐÃ làm, kèm bước tiếp theo.",
          "I have ask the flower team, and they are coming at noon.",
        ),
        g(
          "Bags come later.",
          "The bell desk will bring your bags up within ten minutes, madam.",
          "Nói rõ ai làm và trong bao lâu. Sau 'will' động từ ở dạng gốc.",
          "The bell desk will brings your bags up within ten minutes, madam.",
        ),
      ],
      speaking: [
        sp(
          "The flowers in our room are old, and it is our anniversary.",
          t3a,
          "Xin lỗi, rồi giao đúng việc cho đúng tổ, kèm mốc giờ.",
        ),
        sp(
          "Has anyone actually called them yet?",
          t3b,
          "Báo việc ĐÃ làm (have asked) và giờ tổ tới.",
          undefined,
          ["asked"],
          t3a,
        ),
        sp(
          "Good. The bed also needs two more pillows.",
          t3c,
          "Việc thứ hai, người làm thứ hai — cùng một mốc giờ.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "Where are our bags? We arrived twenty minutes ago.",
          "I am sorry, sir. The bell desk will bring your bags up within ten minutes.",
          "Xin lỗi + ai làm + trong bao lâu.",
        ),
        sp(
          "Is there still food in the lounge? We missed dinner.",
          "The lounge team serves light food until ten, madam. I will tell them you are coming.",
          "Trả lời chắc chắn, rồi báo trước cho tổ đang phục vụ.",
        ),
        sp(
          "My sister wants to join me in the lounge. Is that all right?",
          "Of course, madam. She is within the guest limit, so there is no lounge access fee.",
          "Ôn tuần 24: nói đúng giới hạn khách và vì sao không có phí.",
          undefined,
          ["guest", "limit", "lounge", "access", "fee"],
        ),
        sp(
          "Can you add a room decoration for our anniversary?",
          "Of course, madam. I will ask the flower team about a room decoration today.",
          "Nhắc lại đúng việc khách xin (room decoration, đã học) và giao đúng tổ.",
        ),
        sp(
          "Can you keep a lounge table for us at six?",
          "I will ask the lounge team to reserve a table for six o'clock, madam.",
          "Ôn tuần 25: một việc, đúng tổ, đúng giờ khách cần.",
          undefined,
          ["reserve"],
        ),
        sp(
          "Will anyone check that everything is all right this evening?",
          "Yes, madam. I will make a courtesy call at six, with your itinerary for tomorrow.",
          "Ôn tuần 25: cuộc gọi hỏi thăm có mốc giờ, mang theo đúng thông tin khách cần.",
          undefined,
          ["itinerary"],
        ),
      ],
      reading: read(
        `Ms Clarke's anniversary flowers are old. Nam asks the flower team to change them by noon, and he tells Ms Clarke they are coming. She also needs two more pillows, so Nam asks the housekeeping supervisor. Two teams now have one deadline. At noon, Nam does not wait for a phone call. He checks the room himself: fresh flowers and two pillows. Then he calls Ms Clarke to say everything is ready. She says it finally feels like an anniversary.`,
        [
          {
            q: "Nam nhờ ai mang thêm gối?",
            options: [
              "Tổ cắm hoa, khi họ lên thay hoa",
              "Giám sát buồng phòng",
              "Tổ hành lý, cùng lúc mang túi lên",
            ],
            correct: 1,
            explanation:
              "'Nam asks the housekeeping supervisor' — mỗi việc giao đúng tổ phụ trách việc đó.",
          },
          {
            q: "Nam làm gì lúc mười hai giờ?",
            options: ["Gọi tổ hoa hỏi lại", "Chờ khách gọi xuống báo", "Tự lên phòng kiểm tra"],
            correct: 2,
            explanation: "'He checks the room himself' — khép vòng là tự kiểm rồi mới báo khách.",
          },
          {
            q: "Vì sao Nam gọi cho khách SAU KHI tự kiểm tra phòng?",
            options: [
              "Để chỉ báo 'xong' khi chính mắt đã thấy",
              "Vì khách dặn chỉ gọi sau mười hai giờ",
              "Vì tổ cắm hoa không có số của khách",
            ],
            correct: 0,
            explanation:
              "'He checks the room himself… Then he calls Ms Clarke' — hai tổ làm việc, nhưng người hứa với khách là Nam, nên Nam kiểm rồi mới báo.",
          },
        ],
      ),
      game: [
        game(
          "My mother needs a wheelchair at the lobby door.",
          "Of course, madam. I will ask the bell desk to bring one now.",
          "Of course, madam. I will ask the bell desk bring one now.",
          "We do not have one, madam. Maybe the pharmacy in the street has one.",
          undefined,
          "Câu cuối đẩy khách ra ngoài mà chưa hỏi bộ phận nào. Câu đúng giao việc cho đúng bàn và làm ngay.",
        ),
        game(
          "Did anyone call the flower team about our room?",
          "Yes, madam. I have asked them, and they are coming at noon.",
          "I think so, madam. Somebody usually call them.",
          "I think so, madam. Somebody usually calls them.",
          undefined,
          "Câu cuối đoán thay vì biết chắc. Câu đúng báo việc đã làm và giờ tổ tới.",
        ),
      ],
    }),

    L(26, 4, "A Child Alone — Safety First", "Một em bé đi lạc — an toàn trước", {
      vocabulary: [
        c("Call security", "Call security at once when a child is alone.", [
          "/kɔːl sɪˈkjʊərəti/",
          "Gọi bộ phận an ninh",
          "🛡️",
        ]),
        c("Duty manager", "The duty manager is in charge of the hotel tonight."),
        c("Unattended", "A child must never be left unattended in the lobby.", [
          "/ˌʌnəˈtendɪd/",
          "Không có người trông",
          "🚸",
        ]),
        c("Assistance", "Please call me if you need any assistance.", [
          "/əˈsɪstəns/",
          "Sự hỗ trợ, giúp đỡ",
          "🤝",
        ]),
      ],
      grammar: [
        g(
          "Boy lost. Not my job.",
          "I will stay with him, and I will ask security to help.",
          "Hai việc, hai động từ sau 'will' — đều ở dạng gốc. Người ở lại là bạn.",
          "I will stays with him, and I will ask security to help.",
        ),
        g(
          "What? Speak again.",
          "Could you describe the boy, please? What is he wearing?",
          "Hỏi để mô tả cho an ninh: câu hỏi đảo trợ động từ lên trước — 'What is he wearing?'.",
          "Could you describe the boy, please? What he is wearing?",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "There is a little boy alone near the lobby door. He is crying.",
              t4a,
              "Trẻ đi lạc: bạn Ở LẠI với em và gọi an ninh ngay.",
              undefined,
              ["stay", "security"],
            ),
            "Thank you, madam. I will call security now and stay with him.",
            "I will stay with the boy and call security now, madam.",
          ),
        ),
        risk(
          also(
            sp(
              "Should I take him to the police station myself?",
              t4b,
              "Không đưa em bé đi đâu. Giữ em tại chỗ — an ninh và quản lý trực đang tới.",
              undefined,
              ["take", "away", "security", "duty", "manager", "way"],
              t4a,
            ),
            "Please do not take him away, madam. Security and the duty manager are coming now.",
            "Please keep him here, madam. Security and the duty manager are on their way.",
          ),
        ),
        risk(
          also(
            sp(
              "His mother is here! She is running to us.",
              t4c,
              "Trả trẻ chỉ sau khi an ninh kiểm tra — kể cả khi trông rõ là mẹ em.",
              undefined,
              ["security", "check", "first"],
              t4b,
            ),
            "Security will check first, madam. Then he can go to his mother.",
            "Thank you, madam. Security will check first, and then he can go to her.",
          ),
        ),
        sp(
          "Can I leave the boy at the desk while I look for his parents?",
          "No, please do not leave him unattended. Stay with him until security comes.",
          "Trẻ đi lạc không bao giờ bị bỏ một mình — người ở lại là bạn.",
          "colleague",
          ["unattended", "stay", "security"],
        ),
        sp(
          "The fire alarm is ringing! Can I go back to my room for my laptop?",
          "Please leave it, sir. Follow me down the stairs now, and do not use the lift.",
          "Báo cháy: khách không quay lại lấy đồ, không đi thang máy — bạn dẫn khách xuống bằng cầu thang.",
        ),
        sp(
          "I cannot find my husband, and he does not have a phone.",
          "I am sorry, madam. I will ask security to help us look, and I will stay with you.",
          "Khách lo lắng: ở lại với khách, nhờ đúng bộ phận giúp tìm.",
        ),
        sp(
          "I am his business partner. I will just go up to his room.",
          "I am sorry, sir. Visitors wait here in the lobby, and I can take a message.",
          "Người lạ đòi lên phòng: không cho lên, không xác nhận khách ở đâu — mời chờ và nhận lời nhắn.",
        ),
        sp(
          "My mother is very weak, and it is urgent. Can somebody help her upstairs?",
          "I understand it is urgent, madam. I will ask the bell desk to give her assistance now.",
          "Ôn tuần 25: công nhận việc gấp, rồi nói ai giúp ngay.",
          undefined,
          ["urgent"],
        ),
        risk(
          also(
            sp(
              "A man says he is Mr Kim's friend and wants his room number.",
              "No. Room numbers are confidential, so please take a message instead.",
              "Ôn tuần 24: với đồng nghiệp cũng vậy — số phòng là thông tin bảo mật.",
              "colleague",
              ["room", "numbers", "confidential", "message", "instead"],
            ),
            "No, room numbers are confidential. Please take a message instead.",
            "Please take a message instead. Room numbers are confidential.",
          ),
        ),
      ],
      reading: read(
        `A guest tells Thao that a little boy is alone near the lobby door. Thao stays with the boy and calls security. The guest wants to take the boy to the police, but Thao keeps him in the lobby. The duty manager arrives and asks Thao to describe the boy. Five minutes later, a woman runs in and says she is his mother. Security checks first. Then the boy goes to her. Later, Thao writes down what happened for the duty manager.`,
        [
          {
            q: "Thảo làm gì đầu tiên?",
            options: [
              "Đưa em bé đi tìm mẹ quanh khách sạn",
              "Nhờ vị khách đưa em tới đồn cảnh sát",
              "Ở lại với em bé và gọi an ninh",
            ],
            correct: 2,
            explanation:
              "'Thao stays with the boy and calls security' — giữ em tại chỗ, gọi đúng người, không tự đi tìm.",
          },
          {
            q: "Vì sao an ninh kiểm tra trước khi trả em bé cho người mẹ?",
            options: [
              "Để chắc người nhận đúng là mẹ của em",
              "Vì người mẹ chưa trả tiền phòng",
              "Vì quản lý trực muốn hỏi chuyện em bé",
            ],
            correct: 0,
            explanation:
              "'Security checks first. Then the boy goes to her' — trao trẻ cho người chưa kiểm tra là rủi ro thật.",
          },
          {
            q: "Vì sao giữ em bé ở sảnh lại giúp người mẹ tìm được con nhanh?",
            options: [
              "Vì sảnh có nhiều nhân viên trông trẻ",
              "Vì mẹ em sẽ quay lại đúng chỗ đã lạc con",
              "Vì đồn cảnh sát ở rất xa khách sạn",
            ],
            correct: 1,
            explanation:
              "Người mẹ chạy vào sảnh năm phút sau — nếu em bé đã bị đưa đi, hai mẹ con sẽ lạc nhau lâu hơn.",
          },
        ],
      ),
      game: [
        game(
          "A small girl is crying by the lift. I think she is lost.",
          "Thank you, sir. I will stay with her and call security now.",
          "Do not worry, sir. I will walking her around to find them.",
          "Do not worry, sir. I will walk her around to find them.",
          undefined,
          "Câu cuối nghe tận tình nhưng đưa em bé đi khỏi chỗ cha mẹ sẽ quay lại tìm. Câu đúng ở lại với em và gọi an ninh.",
        ),
        game(
          "That lady says she is the girl's mother. Can she take her now?",
          "Security will check first, madam, and then she can go to her.",
          "Security will checks first, madam, and then she can go to her.",
          "Of course, madam. The girl is smiling, so it must be her mother.",
          undefined,
          "Câu cuối trao trẻ dựa trên cảm giác. Câu đúng để an ninh kiểm tra trước.",
        ),
      ],
    }),
  ];
}

// ── Week 27 — Receiving a complaint: the problem, then the apology ──────
function week27(): LessonContent[] {
  const t1a = "I am so sorry for the spelling mistake, Mr Lee. I will print a new card now.";
  const t1b = "I am sorry nobody answered your request, sir. You should not have to ask twice.";
  const t1c = "I am sorry about that broken promise, sir. I will call you myself by five.";
  const t1d =
    "I understand, sir. Every welcome here should feel personalised, and I am sorry for the inconvenience.";
  const t2a = "I am so sorry, madam. A forgotten birthday is a real disappointment for a family.";
  const t2b = "I am checking that now, madam. I will tell you what happened by six.";
  const t2c = "You are right, madam. My manager and I will make a recovery plan today.";
  const t3a = "I am very sorry about the long wait at check-in, madam. What time did you arrive?";
  const t3b = "Thank you, that helps. I will report it to the front office manager today.";
  const t3c = "I will ask the front office manager to call you, madam.";
  const v1 = "I am very sorry, sir. When did you last see the watch?";
  const v2 = "I understand, sir. I am calling security and the duty manager now.";
  const t4a = "I am calling first aid and the duty manager now. I will stay with you both.";
  const t4b = "Please wait for first aid, madam. They are on their way.";
  const t4c = "I will tell first aid now, madam. Does she have her own medicine?";
  return [
    L(27, 1, "Listen First, Then Apologise", "Nghe hết, rồi xin lỗi", {
      vocabulary: [
        c("Spelling mistake", "There is a spelling mistake in the name on this card.", [
          "/ˈspelɪŋ mɪˈsteɪk/",
          "Lỗi chính tả",
          "✏️",
        ]),
        c("Broken promise", "A call that never comes is a broken promise for the guest."),
        c("Personalised", "A personalised welcome uses the guest's own name.", [
          "/ˈpɜːsənəlaɪzd/",
          "Được cá nhân hóa",
          "✨",
        ]),
        c("Inconvenience", "I am sorry for the inconvenience, madam.", [
          "/ˌɪnkənˈviːniəns/",
          "Sự bất tiện, phiền hà",
          "😣",
        ]),
      ],
      grammar: [
        g(
          "Name wrong? Small thing.",
          "I am very sorry that your name was wrong on the card, sir.",
          "Xin lỗi đúng điều khách gặp: 'I am sorry that + mệnh đề'. 'your name' số ít đi với 'was'.",
          "I am very sorry that your name were wrong on the card, sir.",
        ),
        g(
          "I know, I know.",
          "Thank you for telling me. Could you tell me what happened?",
          "Cảm ơn khách đã nói, mời khách kể hết trước khi giải thích. Sau 'for' động từ thêm -ing.",
          "Thank you for tell me. Could you tell me what happened?",
        ),
      ],
      speaking: [
        sp(
          "Your welcome card says Mr Leigh. My name is Lee!",
          t1a,
          "Xin lỗi đúng sự việc khách gặp, gọi đúng tên khách, rồi sửa ngay.",
        ),
        sp(
          "And yesterday I asked for a quiet room. Nobody answered me.",
          t1b,
          "Lời phàn nàn thứ hai: xin lỗi riêng cho nó, không gộp chung.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Your colleague promised to call me back. The call never came.",
          t1c,
          "Không đổ cho đồng nghiệp. Nhận cuộc gọi về mình, kèm mốc giờ.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "This does not feel like a five-star welcome at all.",
          t1d,
          "Công nhận cảm nhận của khách, xin lỗi cho cả sự phiền hà — không tranh luận.",
          undefined,
          undefined,
          t1c,
        ),
        sp(
          "I asked for a window table, but you gave me one by the kitchen door.",
          "I am sorry, madam. I will ask the restaurant for a window table now.",
          "Xin lỗi đúng điều khách gặp, rồi nhắc lại đúng điều khách đã xin (window table, đã học).",
        ),
        sp(
          "The guests next door are shouting, and it is after midnight.",
          "I am so sorry, madam. I will ask security to speak to them now.",
          "Phàn nàn về khách khác: xin lỗi, không tự sang phòng bên — nhờ an ninh xử lý ngay.",
        ),
        sp(
          "I want everyone in this lobby to hear how bad this is!",
          "I understand, sir. Shall we talk in the lounge, where it is quieter?",
          "Khách giận giữa sảnh: mời sang chỗ yên tĩnh để nói chuyện, không tranh luận trước mặt người khác.",
        ),
        sp(
          "If you do not fix this, I will write a bad review tonight.",
          "I understand, sir. I want to fix it now, so I will escalate it to the duty manager.",
          "Khách dọa đánh giá xấu: không van nài, không hứa bù — xử lý ngay và chuyển lên.",
        ),
        sp(
          "My dinner booking was lost. I am so angry!",
          "I am very sorry, sir. I will ask the concierge desk to book it again now.",
          "Ôn tuần 26: xin lỗi, rồi giao đúng bàn đặt chỗ — làm ngay.",
          undefined,
          ["concierge", "desk"],
        ),
        risk(
          also(
            sp(
              "I need this sorted out today. Who can decide?",
              "I will escalate it to the duty manager now, sir.",
              "Ôn tuần 26: chuyển lên đúng người có quyền quyết, ngay.",
              undefined,
              ["escalate", "duty", "manager"],
            ),
            "I will escalate it to the duty manager straight away, sir.",
            "The duty manager can decide, sir. I will escalate it now.",
          ),
        ),
      ],
      reading: read(
        `Mr Lee's welcome card says Mr Leigh, his request for a quiet room got no answer, and a promised call never came. He starts to shout in the lobby. Khanh invites him to the lounge, where it is quieter, and listens to all three problems without stopping him. She apologises for each one and prints a new card. She calls Mr Lee herself at five, as she promised. She does not blame the colleague who forgot the call.`,
        [
          {
            q: "Khánh làm gì khi khách bắt đầu to tiếng ở sảnh?",
            options: [
              "Mời khách sang phòng chờ yên tĩnh hơn",
              "Nhờ an ninh đưa khách ra khỏi sảnh",
              "Giải thích ngay ai đã in sai tên",
            ],
            correct: 0,
            explanation:
              "'Khanh invites him to the lounge, where it is quieter' — chuyển cuộc nói chuyện ra khỏi sảnh, không tranh luận trước mặt khách khác.",
          },
          {
            q: "Khánh nói gì về người đồng nghiệp quên gọi lại?",
            options: [
              "Nói tên người đó để khách biết ai sai",
              "Không đổ lỗi cho người đồng nghiệp đó",
              "Hứa sẽ báo quản lý phạt người đó",
            ],
            correct: 1,
            explanation:
              "'She does not blame the colleague who forgot the call' — trước mặt khách, việc của bạn là sửa, không phải tìm người có lỗi.",
          },
          {
            q: "Vì sao cuộc gọi lúc năm giờ của Khánh quan trọng?",
            options: [
              "Vì năm giờ là lúc ca của Khánh kết thúc",
              "Vì khách muốn đổi phòng trước năm giờ",
              "Vì nó sửa đúng lời hứa đã bị thất hứa",
            ],
            correct: 2,
            explanation:
              "Khách giận vì 'a promised call never came' — Khánh gọi đúng giờ đã hứa, nên lời hứa lần này được giữ.",
          },
        ],
      ),
      game: [
        game(
          "My name is spelled wrong on the welcome card.",
          "I am so sorry, madam. I will print a new card now.",
          "That is the system fault, madam. Someone at reservations type it wrong.",
          "That is the system's fault, madam. Someone at reservations typed it wrong.",
          undefined,
          "Câu cuối đổ lỗi cho hệ thống và đồng nghiệp trước mặt khách. Câu đúng xin lỗi và sửa ngay.",
        ),
        game(
          "Nobody called me back, and they promised!",
          "I apologise, sir. I will call you myself by five.",
          "I apologise, sir. I will calls you myself by five.",
          "That is strange, sir. My colleague always calls back, so maybe you missed it.",
          undefined,
          "Câu cuối nghi ngờ khách và bênh đồng nghiệp. Câu đúng xin lỗi và nhận cuộc gọi về mình, kèm mốc giờ.",
        ),
      ],
    }),

    L(27, 2, "Sorry Is Not a Verdict", "Xin lỗi chưa phải là nhận lỗi", {
      vocabulary: [
        c("Forgotten birthday", "A forgotten birthday is a big disappointment for a family."),
        c("Late amenity delivery", "A late amenity delivery is not our standard."),
        c("Recovery plan", "My manager and I will make a recovery plan today."),
        c("Escalate", "I will escalate your complaint to the duty manager.", [
          "/ˈeskəleɪt/",
          "Chuyển lên cấp cao hơn",
          "⬆️",
        ]),
      ],
      grammar: [
        g(
          "Our mistake. Sorry.",
          "I am so sorry the birthday cake did not arrive, madam. I will find out why.",
          "Xin lỗi về điều khách gặp. Chưa kiểm tra thì không nói 'It was our mistake' — hứa tìm hiểu. Sau 'did not' động từ ở dạng gốc.",
          "I am so sorry the birthday cake did not arrived, madam. I will find out why.",
        ),
        g(
          "Pillow? Not my fault.",
          "I am sorry that we did not have your foam pillows ready, sir.",
          "Xin lỗi mà không đổ lỗi cho ai. Sau 'did not' là 'have', không phải 'had'.",
          "I am sorry that we did not had your foam pillows ready, sir.",
        ),
      ],
      speaking: [
        sp(
          "Yesterday was my daughter's birthday, and nothing happened. You knew!",
          t2a,
          "Xin lỗi về điều gia đình gặp — chưa nói lỗi của ai.",
        ),
        sp(
          "Was it your mistake or the kitchen's?",
          t2b,
          "Chưa kiểm tra thì chưa kết luận. Hứa mốc giờ báo lại.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Fine. But it must not happen again.",
          t2c,
          "Công nhận khách đúng, chuyển lên quản lý để sửa từ gốc.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "The fruit basket came at eleven at night!",
          "I am sorry, sir. A late amenity delivery is not our standard, and I will find out why.",
          "Xin lỗi, nói rõ đó không phải chuẩn của khách sạn, hứa tìm hiểu — không đoán nguyên nhân.",
        ),
        sp(
          "The man at the front desk was very rude to me this morning.",
          "I am very sorry to hear that, madam. I will escalate it to the front office manager today.",
          "Phàn nàn về thái độ nhân viên: xin lỗi, không bênh, không nêu tên — chuyển lên quản lý.",
        ),
        sp(
          "Our limousine pick-up is twenty minutes late, and our flight is at six!",
          "I am so sorry for the delay with your limousine pick-up, madam. I will arrange the transfer myself.",
          "Ôn tuần 23–25: xin lỗi về sự chậm trễ, nhận việc về mình — không đổ cho hãng xe.",
          undefined,
          ["delay", "limousine", "arrange", "transfer", "myself"],
        ),
        sp(
          "The kitchen forgot my vegetarian meal again.",
          "I am so sorry, madam. I will speak to the executive chef now.",
          "Ôn tuần 25: lỗi lặp lại thì nói với người phụ trách bếp, ngay.",
          undefined,
          ["executive", "chef"],
        ),
        sp(
          "Can the pastry chef make the birthday cake again tonight?",
          "I will ask the pastry chef now, madam, and call you back within ten minutes.",
          "Ôn tuần 25–26: đúng người làm bánh, mốc gọi lại bằng số phút.",
          undefined,
          ["pastry", "chef"],
        ),
      ],
      reading: read(
        `Mrs Okoye's daughter had a birthday yesterday, and nothing arrived. Thu apologises for what the family met. She does not say whose mistake it was, because nobody has checked yet. She promises an answer by six. By five, Thu finds the cause: a preference note was lost between two shifts. She tells Mrs Okoye, asks the pastry chef for a cake that evening, and escalates the lost note to her manager. Mrs Okoye thanks her for being honest.`,
        [
          {
            q: "Vì sao Thu không nói ngay đó là lỗi của ai?",
            options: [
              "Vì lúc đó chưa ai kiểm tra nguyên nhân",
              "Vì khách sạn cấm nhân viên xin lỗi khách",
              "Vì Thu nghĩ khách quên báo ngày sinh nhật",
            ],
            correct: 0,
            explanation:
              "'because nobody has checked yet' — xin lỗi về điều khách gặp thì luôn đúng; kết luận lỗi phải chờ kiểm tra.",
          },
          {
            q: "Thu báo nguyên nhân cho khách lúc nào so với lời hứa?",
            options: [
              "Đúng sáu giờ, như đã hứa",
              "Sớm hơn mốc sáu giờ đã hứa",
              "Sáng hôm sau, khi gặp quản lý",
            ],
            correct: 1,
            explanation:
              "'She promises an answer by six. By five, Thu finds the cause' — tìm ra lúc năm giờ, trước mốc đã hứa.",
          },
          {
            q: "Vì sao Thu chuyển chuyện ghi chú bị thất lạc lên quản lý?",
            options: [
              "Để quản lý gọi điện xin lỗi thay Thu",
              "Để khách được hoàn tiền phòng đêm qua",
              "Vì lỗi giữa hai ca là lỗi quy trình cần sửa",
            ],
            correct: 2,
            explanation:
              "'a preference note was lost between two shifts' — đó là lỗ hổng bàn giao; người sửa được quy trình là quản lý.",
          },
        ],
      ),
      game: [
        game(
          "Whose fault was it that my fruit basket came so late?",
          "I am finding out now, sir. I am sorry it was late.",
          "Our mistake, sir. New boy at bell desk forget it.",
          "It was our mistake, sir. The new boy at the bell desk forgot all about it.",
          undefined,
          "Câu cuối kết luận lỗi khi chưa ai kiểm tra và nêu tên đồng nghiệp. Câu đúng xin lỗi và nói bạn đang tìm hiểu.",
        ),
        game(
          "Your receptionist was rude to me this morning.",
          "I am very sorry, madam. I will escalate it today.",
          "I am very sorry, madam. I will escalating it today.",
          "He is usually very nice, madam. Maybe he was just tired.",
          undefined,
          "Câu cuối bênh đồng nghiệp và gạt lời khách. Câu đúng xin lỗi và chuyển lên người có quyền.",
        ),
      ],
    }),

    L(27, 3, "Getting the Facts", "Hỏi cho rõ sự việc", {
      vocabulary: [
        c("Long wait at check-in", "There was a long wait at check-in at three o'clock."),
        c("Crowded lounge", "It is a crowded lounge at six on Fridays."),
        c("Valuables", "Please keep your valuables in the room safe.", [
          "/ˈvæljuəblz/",
          "Đồ có giá trị",
          "💍",
        ]),
        c("Lost and found", "Lost and found keeps items for three months.", [
          "/ˌlɒst ən ˈfaʊnd/",
          "Bộ phận giữ đồ thất lạc",
          "📦",
        ]),
      ],
      grammar: [
        g(
          "When?",
          "What time did you arrive at the desk, madam?",
          "Hỏi điều khách CHƯA nói. Sau 'did' động từ ở dạng gốc: arrive.",
          "What time did you arrived at the desk, madam?",
        ),
        g(
          "Watch gone? Look again.",
          "When did you last see your watch, sir?",
          "Hỏi sự việc, không kết luận. 'last' đứng trước động từ chính.",
          "When did you last saw your watch, sir?",
        ),
      ],
      speaking: [
        sp(
          "I waited forty minutes at check-in yesterday!",
          t3a,
          "Xin lỗi, rồi hỏi MỘT điều khách chưa nói: giờ tới quầy.",
        ),
        sp(
          "About three o'clock. Only one person was at the desk.",
          t3b,
          "Cảm ơn thông tin, báo đúng người sửa được.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "So what happens now?",
          t3c,
          "Nói ai sẽ liên lạc và lúc nào.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "My gold watch is not in my room. I think someone took it!",
          v1,
          "Đồ có giá trị bị mất: không phủ nhận, không kết luận — hỏi sự việc trước.",
        ),
        risk(
          also(
            sp(
              "This morning, on the desk. Your cleaner was in the room!",
              v2,
              "Khách nghi nhân viên lấy đồ: không cãi, không tự lục soát. Gọi an ninh và quản lý trực.",
              undefined,
              ["understand", "calling", "security", "duty", "manager"],
              v1,
            ),
            "I understand, sir. I will call security and the duty manager now.",
            "I am calling security and the duty manager now, sir. I understand.",
          ),
        ),
        sp(
          "It is so busy tonight. There are no seats in the lounge.",
          "I am sorry about the crowded lounge, sir. I recommend the library, which is quieter.",
          "Xin lỗi đúng điều khách thấy, rồi gợi ý một chỗ có thật — không hứa một cái bàn chưa chắc có.",
        ),
        sp(
          "I left my sunglasses in the lounge yesterday.",
          "Let me check with lost and found, madam. What colour are they?",
          "Hỏi một chi tiết để tìm đúng món, rồi hỏi đúng bộ phận.",
        ),
        sp(
          "Can I leave my suitcase here in the lobby after check-out?",
          "The bell desk can keep it for you, sir. Please do not leave it unattended.",
          "Ôn tuần 26: đúng bàn giữ hành lý, và không để túi không người trông.",
          undefined,
          ["bell", "desk", "unattended"],
        ),
        sp(
          "Where should I keep my jewellery tonight?",
          "Please keep your valuables in the room safe, madam.",
          "Gọi đúng tên đồ có giá trị và chỉ chỗ an toàn — trước khi có chuyện.",
        ),
      ],
      reading: read(
        `Mrs Grant says she waited forty minutes at check-in. Bao apologises, then asks one question: what time did she arrive? About three, she says, and only one person was at the desk. That fact matters, because three o'clock is the busiest hour. Bao reports it to the front office manager the same day. The manager now puts a second person at the desk at three, and calls Mrs Grant the next morning. Mrs Grant says she will stay again.`,
        [
          {
            q: "Bảo hỏi khách điều gì?",
            options: ["Khách ở mấy đêm", "Khách đến quầy lúc mấy giờ", "Khách đặt phòng qua đâu"],
            correct: 1,
            explanation:
              "'asks one question: what time did she arrive?' — hỏi điều khách chưa nói, để tìm ra chỗ cần sửa.",
          },
          {
            q: "Vì sao giờ khách đến lại quan trọng?",
            options: [
              "Vì giờ đông nhất mà chỉ có một người trực",
              "Vì khách đến sớm hơn giờ nhận phòng của khách sạn",
              "Vì quản lý chỉ làm việc sau ba giờ",
            ],
            correct: 0,
            explanation:
              "'three o'clock is the busiest hour' và chỉ có một người ở quầy — sự việc cụ thể chỉ ra đúng chỗ cần sửa.",
          },
          {
            q: "Quản lý lễ tân làm gì sau khi được báo?",
            options: [
              "Gọi điện xin lỗi khách thay cho Bảo",
              "Tặng khách một đêm miễn phí",
              "Thêm một người ở quầy lúc ba giờ",
            ],
            correct: 2,
            explanation:
              "'puts a second person at the desk at three' — một sự việc cụ thể giúp sửa quy trình, không chỉ xoa dịu một khách.",
          },
        ],
      ),
      game: [
        game(
          "The lounge is so crowded that I cannot find a seat.",
          "I am sorry, sir. The library is quieter tonight, if you like.",
          "I am sorry, sir. The library is more quieter tonight, if you like.",
          "Everyone comes at six, sir. You should come at five next time, when it is quiet.",
          undefined,
          "Câu cuối biến vấn đề thành lỗi của khách. Câu đúng xin lỗi và giải quyết ngay.",
        ),
        game(
          "My watch is gone, and the cleaner was in my room!",
          "I understand, sir. I am calling security and the duty manager now.",
          "I understand, sir. I calling security and the duty manager now.",
          "Our cleaners never take anything, sir. Please look in your bags again.",
          undefined,
          "Câu cuối cãi khách và bênh nhân viên khi chưa ai kiểm tra. Câu đúng gọi an ninh và quản lý trực.",
        ),
      ],
    }),

    L(
      27,
      4,
      "When It Is Not a Complaint — Safety First",
      "Khi không còn là phàn nàn — an toàn trước",
      {
        vocabulary: [
          c("First aid", "I am calling first aid and the duty manager now.", [
            "/ˌfɜːst ˈeɪd/",
            "Sơ cứu",
            "🩹",
          ]),
          c("Canapés", "The canapés at the cocktail hour have a card with the ingredients.", [
            "/ˈkænəpeɪz/",
            "Món khai vị nhỏ",
            "🍢",
          ]),
          c("Disruptive", "A disruptive guest is a job for security.", [
            "/dɪsˈrʌptɪv/",
            "Gây rối",
            "📢",
          ]),
          c("Replenish", "I will ask the lounge team to replenish the canapés.", [
            "/rɪˈplenɪʃ/",
            "Bổ sung thêm (đồ ăn/uống)",
            "🔄",
          ]),
        ],
        grammar: [
          g(
            "Calm down.",
            "Please sit here, madam. I am calling first aid now.",
            "Có người không khỏe: mời ngồi, gọi sơ cứu NGAY. Không bảo khách 'calm down'. Hiện tại tiếp diễn cần 'am'.",
            "Please sit here, madam. I calling first aid now.",
          ),
          g(
            "Food okay. No problem.",
            "These canapés have nuts in them, sir. Please read the card first.",
            "'These canapés' số nhiều đi với 'have'. Báo thành phần trước khi khách ăn.",
            "These canapés has nuts in them, sir. Please read the card first.",
          ),
        ],
        speaking: [
          risk(
            also(
              sp(
                "My friend ate a canapé, and now she cannot breathe well!",
                t4a,
                "Gọi sơ cứu và quản lý trực NGAY, rồi ở lại. Không hỏi han dài.",
                undefined,
                ["calling", "first", "aid", "duty", "manager", "stay"],
              ),
              "I am calling first aid and the duty manager now. I will stay with her.",
              "I will stay with you both. I am calling first aid and the duty manager now.",
              "I am calling an ambulance and the duty manager now. I will stay with you both.",
            ),
          ),
          risk(
            also(
              sp(
                "Should we give her some water?",
                t4b,
                "Bạn không quyết việc y tế. Chờ người sơ cứu — họ đang tới.",
                undefined,
                ["wait", "first", "aid", "way"],
                t4a,
              ),
              "Please wait for first aid, madam. First aid is on the way.",
              "First aid is on its way, madam. Please wait for them.",
              "Please do not give her anything, madam. First aid is on the way.",
            ),
          ),
          sp(
            "She has an allergy to nuts, I think.",
            t4c,
            "Báo ngay cho người sơ cứu, và hỏi khách có thuốc riêng không — bạn không tự cho thuốc.",
            undefined,
            undefined,
            t4b,
          ),
          risk(
            also(
              sp(
                "A guest at the cocktail hour is drunk and shouting at the bar staff.",
                "He is disruptive, so please call security and the duty manager now.",
                "Khách say gây rối: không tự ra đối đầu. Gọi an ninh và quản lý trực.",
                "colleague",
                ["disruptive", "security", "duty", "manager"],
              ),
              "Please call security and the duty manager now. He is disruptive.",
              "He is disruptive. Please call security and the duty manager straight away.",
            ),
          ),
          sp(
            "The canapé tray is empty again.",
            "I am sorry, madam. I will ask the lounge team to replenish it now.",
            "Ôn tuần 26: giao đúng tổ phòng chờ, làm ngay.",
            undefined,
            ["lounge", "team"],
          ),
          sp(
            "Are there nuts in these canapés?",
            "The card next to each tray lists the ingredients, madam. Some canapés have nuts.",
            "Trả lời thật, chỉ chỗ có thông tin thành phần.",
          ),
          sp(
            "My husband has a high fever, and he cannot get out of bed.",
            "I am calling first aid and the duty manager now, madam. Please stay with him.",
            "Khách ốm trong phòng: gọi sơ cứu và quản lý trực ngay — bạn không tự đoán bệnh, không tự cho thuốc.",
          ),
          sp(
            "Please tell me when there is a seat in the lounge.",
            "Of course, sir. I will send you a message when a table is ready.",
            "Ôn tuần 24: hứa đúng cách bạn báo tin, không bắt khách đứng chờ.",
            undefined,
            ["send", "message"],
          ),
        ],
        reading: read(
          `During the cocktail hour, a guest's friend eats a canapé and cannot breathe well. Duc calls first aid and the duty manager at once, and he stays with them. The guest wants to give her friend water, but Duc asks her to wait for first aid. Then the guest remembers a nut allergy. Duc phones first aid again straight away with that fact, and asks if the friend has her own medicine. The friend is breathing well again when first aid leaves.`,
          [
            {
              q: "Đức làm gì đầu tiên?",
              options: [
                "Hỏi khách vừa ăn món gì trong phòng chờ",
                "Gọi sơ cứu và quản lý trực",
                "Đưa khách một cốc nước",
              ],
              correct: 1,
              explanation:
                "'Duc calls first aid and the duty manager at once' — với người khó thở, gọi người có chuyên môn là việc đầu tiên.",
            },
            {
              q: "Vì sao Đức gọi lại cho người sơ cứu ngay, không chờ họ tới?",
              options: [
                "Để họ biết về dị ứng hạt trước khi tới",
                "Để hỏi họ còn bao lâu nữa thì tới",
                "Vì quản lý trực yêu cầu gọi lại",
              ],
              correct: 0,
              explanation:
                "'Duc phones first aid again straight away with that fact' — người sơ cứu cần biết nguyên nhân càng sớm càng tốt.",
            },
            {
              q: "Vì sao Đức hỏi về thuốc riêng của khách mà không tự đưa thuốc?",
              options: [
                "Vì khách sạn không có tủ thuốc cho khách",
                "Vì khách đã từ chối mọi loại thuốc",
                "Vì nhân viên không quyết việc y tế",
              ],
              correct: 2,
              explanation:
                "'asks if the friend has her own medicine' — chuẩn bị cho người sơ cứu, không tự cho thuốc.",
            },
          ],
        ),
        game: [
          game(
            "A man at the bar is shouting and pushing the chairs over.",
            "He is disruptive, so please call security and the duty manager now.",
            "I will going over and tell him to leave the hotel right now.",
            "I will go over and tell him to leave the hotel right now.",
            "colleague",
            "Câu cuối tự ra đối đầu một mình với người đang say — nguy hiểm cho bạn và khách khác. Câu đúng gọi an ninh và quản lý trực.",
          ),
          game(
            "A lady in the lounge says her throat is closing!",
            "I am calling first aid and the duty manager now. I will stay with her.",
            "Let me get her glass of water, and then I call someone.",
            "Let me get her a glass of water, and then I will call someone.",
            undefined,
            "Câu cuối tự xử lý y tế và để chậm cuộc gọi. Câu đúng gọi sơ cứu và quản lý trực ngay, rồi ở lại.",
          ),
        ],
      },
    ),
  ];
}

// ── Week 28 — "If you like, I can…": what is yours to offer ─────────────
function week28(): LessonContent[] {
  const t1a =
    "I am very sorry about the spelling mistake, madam. If you like, I can reprint the welcome card now.";
  const t1b = "Of course, madam. The new card will be in your room by seven tonight.";
  const t1c = "If you come back after seven, the card will already be on your desk.";
  const t2a = "I am sorry, sir. I will ask the front office about a quieter room now.";
  const t2b = "I cannot move you myself, sir. A room move is for the front office.";
  const t2c = "Of course, sir. I will bring the manager to you now.";
  const t2d = "My manager will explain the next step to you, sir.";
  const t3a = "I am so sorry, madam. The flower team can finish it while you are at dinner.";
  const t3b = "If it is not ready by nine, please call me, and I will come up myself.";
  const t3c =
    "I understand, madam, and I am sorry for the inconvenience. I will speak to the duty manager today.";
  const t4a =
    "I am very sorry about your stay, sir. I cannot offer a free night, but the duty manager will speak with you.";
  const t4b = "If you like, I can check the availability of a quiet table for dinner tonight.";
  const t4c = "I cannot cancel the extra charge myself, sir. The duty manager will check it.";
  const t4d =
    "I will ask the loyalty office to check, sir. If they find the stay, they will add the missing points.";
  return [
    L(28, 1, "If You Like, I Can…", "Nếu quý khách muốn, tôi có thể…", {
      vocabulary: [
        c("Reprint", "If you like, I can reprint the welcome card now.", [
          "/ˌriːˈprɪnt/",
          "In lại",
          "🖨️",
        ]),
        c("Alternative", "The library is a quiet alternative to the lounge.", [
          "/ɔːlˈtɜːnətɪv/",
          "Phương án thay thế",
          "🔀",
        ]),
        c("Either", "Either table is fine with us, madam."),
        c("Approve", "My manager has to approve lounge access as a gesture.", [
          "/əˈpruːv/",
          "Phê duyệt, chấp thuận",
          "✅",
        ]),
      ],
      grammar: [
        g(
          "I print again.",
          "If you like, I can reprint the welcome card now, madam.",
          "Câu điều kiện lịch sự 'If you like, I can…' — đề nghị việc trong quyền của bạn, để khách quyết. Mệnh đề 'If' dùng hiện tại.",
          "If you will like, I can reprint the welcome card now, madam.",
        ),
        g(
          "Two way, choose.",
          "Either table is fine, sir. The terrace is quieter tonight.",
          "'either' + danh từ số ít: either table, either option.",
          "Either tables is fine, sir. The terrace is quieter tonight.",
        ),
      ],
      speaking: [
        sp(
          "The card in our room still has the wrong name on it.",
          t1a,
          "Xin lỗi, rồi đề nghị một việc bạn tự làm được — câu điều kiện để khách quyết.",
        ),
        sp(
          "We are going out now. Can it wait until tonight?",
          t1b,
          "Khách đã chọn tối nay: làm theo, không hỏi lại — chốt bằng mốc giờ.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "What if we come back late?",
          t1c,
          "Câu điều kiện: If + hiện tại, mệnh đề chính dùng will.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "What if the name is wrong again?",
          "If the name is wrong again, I will print a personalised card myself, madam.",
          "Ôn tuần 27: câu điều kiện — nếu lặp lại, bạn tự làm một tấm thiệp đúng tên khách.",
          undefined,
          ["personalised"],
        ),
        sp(
          "The lounge is full. Where else can we have a quiet drink?",
          "I am sorry about the crowded lounge, madam. If you like, the library is a quiet alternative.",
          "Ôn tuần 27: xin lỗi đúng điều khách gặp, rồi đưa một phương án thay thế trong quyền của bạn.",
        ),
        sp(
          "Is breakfast free on this one-night stay?",
          "If you stay two nights, madam, breakfast is free. That is the benefit condition.",
          "Ôn tuần 24: câu điều kiện nói đúng điều kiện ưu đãi, không tự tặng.",
          undefined,
          ["benefit", "condition"],
        ),
        sp(
          "Is there anything nice to do this evening?",
          "If you like, I can ask the concierge desk about a sunset cruise, sir.",
          "Đề nghị có điều kiện, nhắc lại một dịch vụ đã học (sunset cruise) và đúng bàn đặt.",
        ),
        sp(
          "Can we sit inside or on the terrace?",
          "Either is fine, sir. The terrace is quieter tonight.",
          "Để khách chọn, kèm một thông tin giúp khách chọn.",
        ),
        risk(
          also(
            sp(
              "After all this, can I at least use the club lounge for free?",
              "I am sorry about all this, madam. My manager has to approve lounge access, and I will ask today.",
              "Đồng cảm trước. Phòng chờ miễn phí là món có giá trị tiền: quản lý duyệt, bạn hỏi giúp.",
              undefined,
              ["manager", "approve", "lounge", "access", "today"],
            ),
            "I am sorry about all this, madam. I cannot offer lounge access myself, but I will ask my manager today.",
            "My manager has to approve lounge access, madam. I will ask today.",
          ),
        ),
      ],
      reading: read(
        `The welcome card in Ms Novak's room still has the wrong name. Ngoc apologises and offers to reprint it now. Ms Novak is going out, so Ngoc follows her choice: the new card will be in the room by seven. Later, Ms Novak asks for free lounge access after all the trouble. Ngoc cannot offer that herself, so she asks her manager, who calls Ms Novak before dinner. Ms Novak says she is happy with the new card and the call.`,
        [
          {
            q: "Vì sao tấm thiệp mới được để vào phòng lúc bảy giờ?",
            options: [
              "Vì máy in chỉ chạy được buổi tối",
              "Vì khách đi ra ngoài và chọn buổi tối",
              "Vì quản lý muốn tự mang thiệp lên",
            ],
            correct: 1,
            explanation:
              "'Ms Novak is going out, so Ngoc follows her choice' — đề nghị có điều kiện, khách chọn, nhân viên làm theo.",
          },
          {
            q: "Vì sao Ngọc không tự mời khách dùng phòng chờ miễn phí?",
            options: [
              "Vì đó là món có giá trị, quản lý quyết",
              "Vì phòng chờ tối đó đã kín chỗ cho hội viên",
              "Vì khách không ở phòng tầng câu lạc bộ của khách sạn",
            ],
            correct: 0,
            explanation:
              "'Ngoc cannot offer that herself, so she asks her manager' — món có giá trị tiền đi qua người có quyền.",
          },
          {
            q: "Việc nào xảy ra CUỐI CÙNG trong bài?",
            options: ["Ngọc in lại tấm thiệp", "Khách xin dùng phòng chờ", "Quản lý gọi cho khách"],
            correct: 2,
            explanation:
              "Thứ tự: thiệp sai → Ngọc đề nghị in lại → khách xin phòng chờ → Ngọc hỏi quản lý → quản lý gọi khách trước bữa tối.",
          },
        ],
      ),
      game: [
        game(
          "Should we take the new card now or tonight?",
          "Either is fine, madam. Which is easier for you?",
          "Tonight, madam, because we are very busy in the desk right now.",
          "Tonight, madam, because we are very busy at the desk right now.",
          undefined,
          "Câu cuối chọn theo sự tiện của nhân viên, không theo khách. Câu đúng để khách chọn.",
        ),
        game(
          "Can I use the club lounge for free, after all this trouble?",
          "My manager has to approve lounge access, madam. I will ask today.",
          "My manager have to approve lounge access, madam. I will ask today.",
          "Of course, madam. Just tell the lounge team that I said yes.",
          undefined,
          "Câu cuối tự tặng một món có giá trị tiền. Câu đúng nói rõ bạn không tự quyết, và hỏi quản lý giúp.",
        ),
      ],
    }),

    L(28, 2, "Two Choices — and Who Decides", "Hai lựa chọn — và ai quyết", {
      vocabulary: [
        c("Room move", "The front office decides every room move.", [
          "/ruːm muːv/",
          "Việc đổi phòng",
          "🔁",
        ]),
        c("Depend on", "Late check-out depends on availability.", [
          "/dɪˈpend ɒn/",
          "Tùy thuộc vào",
          "⚖️",
        ]),
        c("Extend", "The front office can extend your late check-out if rooms allow.", [
          "/ɪkˈstend/",
          "Kéo dài, gia hạn",
          "➕",
        ]),
        c("Bring the manager to you", "If you prefer, I can bring the manager to you now."),
      ],
      grammar: [
        g(
          "I move you suite.",
          "If there is a suite, the front office will move you to it.",
          "Câu điều kiện loại 1: If + hiện tại, will + V. Người đổi phòng là lễ tân.",
          "If there will be a suite, the front office will move you to it.",
        ),
        g(
          "Manager busy.",
          "If you prefer, I can bring the manager to you now, sir.",
          "Mệnh đề 'If you prefer' dùng hiện tại; 'you' không thêm -s.",
          "If you prefers, I can bring the manager to you now, sir.",
        ),
      ],
      speaking: [
        sp(
          "The noise from the bar is terrible. I want a better room.",
          t2a,
          "Khách đã nói rõ điều muốn: xin lỗi và làm ngay, không hỏi 'nếu quý khách muốn'.",
        ),
        risk(
          also(
            sp(
              "Just move me to a suite yourself. You can do that.",
              t2b,
              "Đổi phòng là quyết định của lễ tân. Từ chối gọn, nói ai quyết.",
              undefined,
              ["move", "myself", "room", "front", "office"],
              t2a,
            ),
            "A room move is for the front office, sir. I cannot move you to a suite myself.",
            "I am sorry, I cannot move you myself. A room move is for the front office.",
          ),
        ),
        sp(
          "Then I want to speak to your manager.",
          t2c,
          "Khách muốn gặp cấp trên: đồng ý ngay, không giữ khách lại.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "And if your manager says no?",
          t2d,
          "Không hứa kết quả thay cấp trên — để quản lý tự nói bước tiếp theo.",
          undefined,
          undefined,
          t2c,
        ),
        risk(
          also(
            sp(
              "Can I keep my room until four tomorrow afternoon?",
              "I will ask the front office now, madam. Late check-out depends on availability.",
              "Trả phòng muộn do lễ tân quyết và tùy phòng trống: bạn hỏi giúp, không để khách nghe như đã đồng ý.",
              undefined,
              ["ask", "front", "office", "late", "depends", "availability"],
            ),
            "Late check-out depends on availability, madam. I will ask the front office now.",
            "I will check with the front office now, madam. Late check-out depends on availability.",
          ),
        ),
        sp(
          "It is our anniversary. Could you upgrade us?",
          "I can ask the front office to arrange a room upgrade, madam. They will call you with the price.",
          "Hứa việc bạn làm (hỏi); nâng hạng có giá, lễ tân báo giá.",
        ),
        sp(
          "Can we stay one more night in this room?",
          "If the room is available, the reservations team can extend your stay, madam.",
          "Câu điều kiện: điều kiện thật trước, người quyết sau.",
          undefined,
          ["extend"],
        ),
        sp(
          "My sunglasses are still missing from yesterday.",
          "If lost and found has them, I will bring them to your room tonight, madam.",
          "Ôn tuần 27: câu điều kiện — hứa đúng việc của bạn nếu đồ được tìm thấy.",
          undefined,
          ["lost", "found"],
        ),
      ],
      reading: read(
        `Mr Ito cannot sleep because of the bar noise. Tien apologises and asks the front office about a quieter room at once. Mr Ito tells her to move him to a suite herself. Tien explains that room moves are for the front office. When Mr Ito asks for the manager, she brings the manager to him. The manager finds a quiet room on the twelfth floor, and the front office moves Mr Ito that night.`,
        [
          {
            q: "Tiên làm gì đầu tiên?",
            options: [
              "Tự chuyển khách sang phòng hạng sang ngay",
              "Xin quầy bar tắt nhạc sớm hơn",
              "Xin lỗi và hỏi lễ tân về phòng yên tĩnh hơn",
            ],
            correct: 2,
            explanation:
              "'Tien apologises and asks the front office about a quieter room at once' — khách đã nói rõ điều muốn, nên làm ngay.",
          },
          {
            q: "Ai chuyển phòng cho ông Ito?",
            options: ["Bộ phận lễ tân", "Tiên, người đang xử lý", "Vị khách tự chọn"],
            correct: 0,
            explanation:
              "'the front office moves Mr Ito that night' — GRO chuyển lời, lễ tân quyết và làm.",
          },
          {
            q: "Vì sao Tiên đưa quản lý tới ngay khi khách đòi?",
            options: [
              "Vì quản lý mới là người được ngủ ở phòng hạng sang",
              "Vì khách có quyền gặp cấp trên, và giữ khách lại chỉ làm khách giận thêm",
              "Vì Tiên muốn hết ca sớm",
            ],
            correct: 1,
            explanation:
              "'she brings the manager to him' — khách muốn gặp cấp trên thì đưa tới ngay, không giữ lại.",
          },
        ],
      ),
      game: [
        game(
          "You can see the suite is empty. Just put me in it.",
          "I cannot move you myself, madam. A room move is for the front office.",
          "Of course, madam. I will gives you the suite key.",
          "Of course, madam. I will give you the suite key.",
          undefined,
          "Câu cuối tự quyết đổi phòng — việc của lễ tân. Câu đúng từ chối gọn và nói ai quyết.",
        ),
        game(
          "I need my room until four tomorrow. Can you do that?",
          "I will ask the front office now, sir. Late check-out depends on availability.",
          "I will ask the front office now, sir. Late check-out depend on availability.",
          "Yes, sir, no problem. Stay as long as you like tomorrow.",
          undefined,
          "Câu cuối hứa thay lễ tân. Câu đúng nói điều kiện và ai quyết.",
        ),
      ],
    }),

    L(28, 3, "Checking It Worked", "Kiểm tra giải pháp có hiệu quả", {
      vocabulary: [
        c("Deliver", "The room is ready, so I will deliver the amenity now.", [
          "/dɪˈlɪvə/",
          "Mang đến, giao",
          "🚚",
        ]),
        c("Redo", "If my manager agrees, we can redo the set-up tomorrow.", [
          "/ˌriːˈduː/",
          "Làm lại",
          "🔂",
        ]),
        c("Apology letter", "My manager will send an apology letter before you leave."),
        c("Post-stay follow-up", "Our post-stay follow-up comes by email after you leave.", [
          "/pəʊst steɪ ˈfɒləʊ ʌp/",
          "Liên hệ hỏi thăm sau khi khách rời khách sạn",
          "✉️",
        ]),
      ],
      grammar: [
        g(
          "If problem, call.",
          "If anything is wrong again, please call me directly.",
          "Mệnh đề 'If' dùng hiện tại ('is'), không dùng 'will be'.",
          "If anything will be wrong again, please call me directly.",
        ),
        g(
          "Set-up again tomorrow.",
          "If my manager agrees, we will redo the set-up tomorrow.",
          "Việc có giá trị (làm lại trang trí) đi qua quản lý. 'my manager' số ít: 'agrees'.",
          "If my manager agree, we will redo the set-up tomorrow.",
        ),
      ],
      speaking: [
        sp(
          "The anniversary set-up was not in our room when we came back.",
          t3a,
          "Xin lỗi, rồi đưa giải pháp không làm phiền khách thêm.",
        ),
        sp(
          "And if it is not ready when we come back?",
          t3b,
          "Câu điều kiện: nếu vấn đề còn, khách gọi ai và bạn làm gì.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "It was meant for last night, though.",
          t3c,
          "Ôn tuần 27: xin lỗi cho cả sự phiền hà. Bù đắp là việc của quản lý — không tự hứa trước.",
          undefined,
          ["inconvenience"],
          t3b,
        ),
        sp(
          "Will you tell us when the set-up is ready?",
          "Yes, madam. I will make a courtesy call as soon as I check the room.",
          "Ôn tuần 26: cuộc gọi hỏi thăm sau khi chính bạn đã kiểm tra.",
          undefined,
          ["courtesy", "call", "check"],
        ),
        sp(
          "Our welcome fruit is still not in the room.",
          "I am sorry, sir. The room is ready, so I will deliver the amenity now.",
          "Xin lỗi, và làm ngay việc trong quyền của bạn.",
        ),
        sp(
          "Can you do the anniversary set-up again tomorrow night?",
          "If my manager agrees, we can redo the set-up tomorrow. I will ask today.",
          "Làm lại có giá trị tiền: điều kiện là quản lý đồng ý — hứa việc bạn làm (hỏi hôm nay).",
        ),
        sp(
          "I want an apology from the hotel in writing.",
          "Of course, madam. I will ask my manager to send an apology letter today.",
          "Thư xin lỗi do quản lý ký — bạn chuyển lời, kèm mốc.",
        ),
        sp(
          "Will anyone contact us after we go home?",
          "Yes, sir. Our post-stay follow-up will come by email within two days.",
          "Nói đúng cách liên hệ và mốc thời gian.",
        ),
      ],
      reading: read(
        `Ms Dubois's anniversary set-up was not in the room. Lan apologises and asks the flower team to finish it during dinner. She asks Ms Dubois to call her if it is not ready by nine. At nine, Lan checks the room herself, and it is ready. Ms Dubois says the set-up was meant for last night. Lan does not promise anything extra. The next morning, her manager agrees to redo the set-up and sends a written apology.`,
        [
          {
            q: "Lan làm gì lúc chín giờ?",
            options: [
              "Gọi tổ cắm hoa hỏi đã xong chưa",
              "Tự lên phòng kiểm tra",
              "Chờ khách gọi xuống nếu có vấn đề",
            ],
            correct: 1,
            explanation:
              "'At nine, Lan checks the room herself' — kiểm tra giải pháp bằng mắt mình, không chờ khách phàn nàn lần nữa.",
          },
          {
            q: "Ai đồng ý làm lại phần trang trí?",
            options: ["Tổ cắm hoa", "Chính Lan", "Quản lý của Lan"],
            correct: 2,
            explanation:
              "'her manager agrees to redo the set-up' — bù đắp có giá trị là quyết định của quản lý.",
          },
          {
            q: "Vì sao Lan không hứa thêm gì khi khách nói về đêm hôm trước?",
            options: [
              "Vì bù đắp thêm là việc quản lý quyết",
              "Vì Lan nghĩ khách không có lý",
              "Vì tổ cắm hoa đã làm xong việc",
            ],
            correct: 0,
            explanation:
              "'Lan does not promise anything extra' — hứa trước khi quản lý duyệt là hứa điều không phải của mình.",
          },
        ],
      ),
      game: [
        game(
          "What if the flowers are wrong again tomorrow?",
          "If anything is wrong, please call me, madam. I will come up myself.",
          "If anything will be wrong, please call me, madam. I will come up myself.",
          "That will not happen again, madam. I can promise you that.",
          undefined,
          "Câu cuối hứa điều bạn không chắc. Câu đúng nói rõ khách làm gì và bạn làm gì nếu vấn đề quay lại.",
        ),
        game(
          "Can you do the whole set-up again tomorrow, for free?",
          "If my manager agrees, we can redo the set-up tomorrow, madam.",
          "Of course, madam. I will booking it for tomorrow at no cost.",
          "Of course, madam. I will book it for tomorrow at no cost.",
          undefined,
          "Câu cuối tự tặng một món có giá trị tiền. Câu đúng nói rõ điều kiện: quản lý đồng ý.",
        ),
      ],
    }),

    L(28, 4, "When You Must Say No", "Khi phải từ chối", {
      vocabulary: [
        c("Cancel", "Only the duty manager can cancel the extra charge.", [
          "/ˈkænsl/",
          "Hủy, xóa bỏ",
          "❌",
        ]),
        c("Missing", "The loyalty office will add the missing points this week.", [
          "/ˈmɪsɪŋ/",
          "Bị thiếu, bị mất",
          "❓",
        ]),
        c("Private dinner", "If the beach is available, we can arrange a private dinner.", [
          "/ˈpraɪvət ˈdɪnə/",
          "Bữa tối riêng",
          "🕯️",
        ]),
        c("Availability", "I will check the availability of the terrace tonight.", [
          "/əˌveɪləˈbɪləti/",
          "Tình trạng còn trống",
          "📆",
        ]),
      ],
      grammar: [
        g(
          "Free? No.",
          "I cannot offer a free dinner myself, madam. I will ask my manager.",
          "Miễn phí là quyết định về tiền: không tự hứa, chuyển người có quyền. Sau 'cannot' là động từ nguyên mẫu.",
          "I cannot offering a free dinner myself, madam. I will ask my manager.",
        ),
        g(
          "Points later maybe.",
          "If the loyalty office finds your stay, they will add the missing points.",
          "Câu điều kiện loại 1: If + hiện tại, will + V. 'the loyalty office' số ít: 'finds'.",
          "If the loyalty office find your stay, they will add the missing points.",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "This stay has been terrible. I expect a free night, at least.",
              t4a,
              "Đồng cảm trước. Đêm miễn phí là quyết định về tiền: không hứa, không từ chối thẳng — chuyển quản lý trực.",
              undefined,
              ["offer", "free", "night", "duty", "manager", "speak"],
            ),
            "I am very sorry about your stay, sir. I cannot offer a free night myself, but the duty manager will speak with you.",
            "I am very sorry about your stay, sir. The duty manager will speak with you, because I cannot offer a free night.",
          ),
        ),
        sp(
          "Then what can you do for me right now?",
          t4b,
          "Ngay sau lời từ chối, đưa một việc trong quyền của bạn.",
          undefined,
          undefined,
          t4a,
        ),
        risk(
          also(
            sp(
              "And the extra charge for the late car? I want it gone.",
              t4c,
              "Hủy phí cũng là quyết định về tiền: chuyển quản lý trực kiểm tra.",
              undefined,
              ["cancel", "extra", "charge", "myself", "duty", "manager", "check"],
              t4b,
            ),
            "I am sorry, I cannot cancel the extra charge myself. The duty manager will check it.",
            "The duty manager will check the extra charge, sir. I cannot cancel it myself.",
          ),
        ),
        sp(
          "And my points from last week are missing too.",
          t4d,
          "Hứa việc bạn làm (hỏi), không hứa kết quả của bộ phận khác.",
          undefined,
          undefined,
          t4c,
        ),
        sp(
          "Can you arrange a private dinner on the beach for us?",
          "If the beach is available, I can arrange a private dinner, madam. I will check now.",
          "Điều kiện thật trước, việc bạn làm ngay sau.",
        ),
        sp(
          "If I stay five more nights this year, do I keep my Gold card?",
          "If you reach twenty nights, sir, the tier renewal rule keeps you at Gold.",
          "Ôn tuần 24: câu điều kiện nói đúng quy định giữ hạng.",
          undefined,
          ["tier", "renewal", "rule"],
        ),
        sp(
          "My bag is missing from the airport car!",
          "I am so sorry, sir. If you like, I can call our airport representative now.",
          "Ôn tuần 26: xin lỗi, rồi đề nghị gọi đúng người của khách sạn ở sân bay.",
          undefined,
          ["airport", "representative"],
        ),
        sp(
          "If I go to the beach, where can I leave my passport and money?",
          "If you like, madam, you can keep your valuables in the room safe.",
          "Ôn tuần 27: gọi đúng tên đồ có giá trị, chỉ chỗ an toàn.",
          undefined,
          ["valuables"],
        ),
        sp(
          "If the lounge is crowded again tonight, where can we go?",
          "If the lounge is crowded again, I can reserve a table in the library, sir.",
          "Ôn tuần 25–27: câu điều kiện, gọi đúng tên tình huống, đưa phương án trong quyền của bạn.",
          undefined,
          ["crowded", "lounge", "reserve"],
        ),
      ],
      reading: read(
        `Mr Fischer says his stay was terrible and asks for a free night. Hai does not promise one. He says the duty manager will speak with Mr Fischer. Then Hai offers what he can: he checks the availability of a quiet table for dinner. Mr Fischer also wants the late-car charge cancelled. Hai cannot cancel it himself either, so the duty manager checks it that afternoon and calls Mr Fischer. Mr Fischer keeps the dinner table and calms down.`,
        [
          {
            q: "Hải trả lời thế nào về đêm miễn phí?",
            options: [
              "Đồng ý tặng một đêm cho khách vui",
              "Nói khách sạn không bao giờ tặng đêm miễn phí",
              "Không hứa, quản lý trực sẽ nói chuyện",
            ],
            correct: 2,
            explanation:
              "'Hai does not promise one. He says the duty manager will speak with Mr Fischer' — không hứa, cũng không đóng cửa.",
          },
          {
            q: "Hải đưa ra việc gì trong quyền của mình?",
            options: [
              "Hủy luôn khoản phí xe đón trễ",
              "Tìm một bàn yên tĩnh cho bữa tối",
              "Chuyển khách lên phòng hạng sang",
            ],
            correct: 1,
            explanation:
              "'he checks the availability of a quiet table for dinner' — hủy phí và nâng hạng là quyết định về tiền, của quản lý và lễ tân.",
          },
          {
            q: "Vì sao Hải đưa ra một việc ngay sau lời từ chối?",
            options: [
              "Để khách thấy mình vẫn được giúp, không chỉ bị từ chối",
              "Để khách quên chuyện đêm miễn phí",
              "Vì quản lý trực yêu cầu bán thêm bữa tối",
            ],
            correct: 0,
            explanation:
              "'Then Hai offers what he can' — từ chối điều không phải của mình, nhưng làm ngay điều của mình.",
          },
        ],
      ),
      game: [
        game(
          "Just cancel the charge. You work here, don't you?",
          "I cannot cancel the extra charge myself, sir. The duty manager will check it.",
          "Of course, sir. I will tell the front office take it off right now.",
          "Of course, sir. I will tell the front office to take it off right now.",
          undefined,
          "Câu cuối tự hứa hủy phí — vượt quyền. Câu đúng nói rõ ai kiểm tra.",
        ),
        game(
          "After a stay like this, I expect a free night.",
          "I am very sorry about your stay, sir. I cannot offer a free night, but the duty manager will speak with you.",
          "I am very sorry about your stay, sir. I cannot offer a free night, but the duty manager will speaks with you.",
          "You are right, sir. Your last night will be free.",
          undefined,
          "Câu cuối tự tặng một đêm — quyết định về tiền của quản lý. Câu đúng chuyển quản lý trực.",
        ),
      ],
    }),
  ];
}

// ── Week 29 — Handover between GROs, and reporting to the manager ───────
function week29(): LessonContent[] {
  const t1a = "I updated the VIP arrival list at two. Mr Sato arrives at six with his wife.";
  const t1b =
    "Yes, the housekeeping supervisor checked it at three. His welcome amenity is already in the room.";
  const t1c = "Two early departures are on the departure schedule. Their cars come at five.";
  const t2a = "I was serving coffee when a guest suddenly felt dizzy.";
  const t2b = "I called first aid and the duty manager, and I stayed with her.";
  const t2c = "I wrote it in the shift handover book, with the times.";
  const t2d = "Yes, it is an open recovery case until I call her tomorrow.";
  const t3a = "Yes, two amenities have not been delivered yet. They go up at five.";
  const t3b = "Two, on the birthday calendar. The pastry chef has both cake orders.";
  const t3c = "Mrs Patel is first, but it is not confirmed. Please do not tell her yet.";
  const t4a = "Yes, madam. She signed the consent form at check-in.";
  const t4b = "I added foam pillows and green tea to the guest preference file.";
  const t4c = "Her post-stay follow-up. I left a follow-up note for the morning team.";
  return [
    L(29, 1, "Handing Over the Shift", "Bàn giao ca", {
      vocabulary: [
        c("Update", "I updated the VIP arrival list at two."),
        c("VIP arrival list", "There are four names on the VIP arrival list tonight."),
        c("Departure schedule", "The departure schedule shows two early departures tomorrow."),
        c("Goodwill gesture", "A goodwill gesture needs the manager's approval.", [
          "/ˌɡʊdˈwɪl ˈdʒestʃə/",
          "Cử chỉ bù đắp thiện chí",
          "🎀",
        ]),
      ],
      grammar: [
        g(
          "Many thing.",
          "I updated the VIP arrival list at two. Mr Sato arrives at six.",
          "Bàn giao: việc ĐÃ làm (quá khứ đơn) + lịch sắp tới (hiện tại đơn).",
          "I update the VIP arrival list at two. Mr Sato arrives at six.",
        ),
        g(
          "Phone ring, I write list.",
          "I was updating the VIP arrival list when he called.",
          "Quá khứ tiếp diễn 'was updating' cho việc đang làm; quá khứ đơn 'called' cho việc chen vào.",
          "I was update the VIP arrival list when he called.",
        ),
      ],
      speaking: [
        sp(
          "I am here for the evening shift. What is new?",
          t1a,
          "Nói với đồng nghiệp ca sau: việc đã làm + khách sắp đến.",
          "colleague",
        ),
        sp(
          "Is his room ready for him?",
          t1b,
          "Ai đã kiểm tra, lúc nào, và còn gì trong phòng.",
          "colleague",
          undefined,
          t1a,
        ),
        sp(
          "Any departures I need to watch tomorrow?",
          t1c,
          "Số lượng + mốc giờ — đủ để ca sau chuẩn bị.",
          "colleague",
          undefined,
          t1b,
        ),
        risk(
          also(
            sp(
              "A man on the phone wants Mr Sato's arrival time. Can I tell him?",
              "No, guest arrival times are confidential. Please take a message for him.",
              "Giờ đến của khách là thông tin bảo mật — kể cả khi đồng nghiệp hỏi giúp người ngoài.",
              "colleague",
              ["guest", "arrival", "times", "confidential", "message"],
            ),
            "No. Guest arrival times are confidential, so please take a message for him.",
            "Please take a message for him. Guest arrival times are confidential.",
          ),
        ),
        sp(
          "What happened with the man who called about Mr Sato?",
          "I was updating the VIP arrival list when he called. I only took a message.",
          "Báo cấp trên: đang làm gì khi chuyện xảy ra (was + -ing), rồi việc đã làm.",
          "manager",
        ),
        risk(
          also(
            sp(
              "Mr Lee is still upset. Can I give him a free dinner as a goodwill gesture?",
              "No, please ask the manager first about any goodwill gesture.",
              "Với đồng nghiệp cũng vậy: món có giá trị tiền đi qua quản lý.",
              "colleague",
              ["ask", "manager", "first", "goodwill", "gesture"],
            ),
            "No. Please ask the manager first about a goodwill gesture.",
            "Please ask the manager first. Any goodwill gesture is her decision.",
          ),
        ),
        sp(
          "The canapé tray in the lounge is empty again.",
          "Please ask the lounge team to replenish the canapés now.",
          "Ôn tuần 27: giao đúng tổ, gọi đúng việc cần làm.",
          "colleague",
          ["replenish"],
        ),
        sp(
          "Is Mr Ito happy with his new room?",
          "Yes. The front office moved him to a club floor room last night.",
          "Ôn tuần 23: bàn giao việc đã xong bằng quá khứ đơn, gọi đúng tên loại phòng.",
          "colleague",
          ["club", "floor", "room"],
        ),
        sp(
          "Mr Sato's mother uses a wheelchair. Is anything arranged?",
          "Yes. The bell desk will give her assistance when they arrive at six.",
          "Ôn tuần 26: ai giúp, lúc nào — đủ để ca sau yên tâm.",
          "colleague",
          ["bell", "desk", "assistance"],
        ),
        sp(
          "Mrs Grant is back with us today. Anything I should know?",
          "She had a long wait at check-in last time. Please do a lobby check before she arrives.",
          "Ôn tuần 27: điều khách đã gặp lần trước, và việc ca sau làm (lobby check, đã học).",
          "colleague",
          ["long", "wait", "check-in"],
        ),
      ],
      reading: read(
        `At three, Hoa hands over to Nam. She updated the VIP arrival list at two: Mr Sato arrives at six with his wife. The housekeeping supervisor checked their room at three. Two early departures are on the departure schedule. Hoa was updating the list when a man called and asked for Mr Sato's arrival time. She did not give it. She only took a message, and she tells Nam to do the same. Nam signs the handover sheet before Hoa goes home.`,
        [
          {
            q: "Hoa làm gì khi có người gọi hỏi giờ đến của ông Sato?",
            options: [
              "Nói giờ đến vì người gọi biết tên khách",
              "Không cho giờ, chỉ nhận lời nhắn",
              "Nối máy cho tổ buồng phòng trả lời",
            ],
            correct: 1,
            explanation:
              "'She did not give it. She only took a message' — giờ đến của khách VIP không nói với người ngoài.",
          },
          {
            q: "Phòng của ông Sato được kiểm tra lúc mấy giờ?",
            options: ["Lúc hai giờ", "Lúc sáu giờ", "Lúc ba giờ"],
            correct: 2,
            explanation:
              "'The housekeeping supervisor checked their room at three' — hai giờ là lúc cập nhật danh sách, sáu giờ là lúc khách đến.",
          },
          {
            q: "Vì sao Hoa dặn Nam làm giống mình?",
            options: [
              "Vì người gọi có thể gọi lại trong ca của Nam",
              "Vì Nam chưa biết ông Sato là ai",
              "Vì ông Sato đã đổi giờ đến",
            ],
            correct: 0,
            explanation:
              "Bàn giao không chỉ là danh sách việc: rủi ro còn mở (người lạ hỏi về khách VIP) cũng phải được giao lại.",
          },
        ],
      ),
      game: [
        game(
          "Before you leave, is there anything on the VIP list?",
          "Yes, Mr Sato arrives at six. I updated the list at two.",
          "Yes, Mr Sato arrive at six. I updated the list at two.",
          "Nothing special, I think. You can read the list later tonight.",
          "colleague",
          "Câu cuối bỏ sót khách VIP sắp đến — ca sau sẽ không kịp đón. Câu đúng nêu việc đã làm và việc sắp tới.",
        ),
        game(
          "A caller wants Mr Sato's arrival time. Shall I tell him?",
          "No, guest arrival times are confidential. Please take a message for him.",
          "Yes, but only time, not room number.",
          "Yes, but only the time, not the room number.",
          "colleague",
          "Câu cuối nghĩ rằng chỉ số phòng mới là bí mật. Câu đúng: giờ đến cũng là thông tin bảo mật.",
        ),
      ],
    }),

    L(29, 2, "I Was Doing… When…", "Tôi đang làm… thì…", {
      vocabulary: [
        c("Suddenly", "The guest suddenly felt dizzy at the cocktail hour."),
        c("Shift handover book", "I wrote the incident in the shift handover book."),
        c("Complaint log", "Every complaint goes in the complaint log the same day."),
        c("Open recovery case", "Mr Lee's card is still an open recovery case."),
      ],
      grammar: [
        g(
          "I talk, guest fall.",
          "I was talking to Mrs Ford when she suddenly felt dizzy.",
          "Quá khứ tiếp diễn 'was talking' cho việc đang làm; quá khứ đơn 'felt' cho việc chen vào.",
          "I was talk to Mrs Ford when she suddenly felt dizzy.",
        ),
        g(
          "I write already.",
          "I wrote it in the shift handover book at seven, madam.",
          "Quá khứ của 'write' là 'wrote'. Ghi 'in' một cuốn sổ, không phải 'on'.",
          "I wrote it on the shift handover book at seven, madam.",
        ),
      ],
      speaking: [
        sp(
          "What happened in the lounge last night?",
          t2a,
          "Báo cáo sự việc: đang làm gì (was + -ing) khi chuyện xảy ra.",
          "manager",
        ),
        sp(
          "What did you do then?",
          t2b,
          "Ôn tuần 27: các bước đã làm, đúng thứ tự, quá khứ đơn.",
          "manager",
          ["first", "aid"],
          t2a,
        ),
        sp(
          "Where did you write it down?",
          t2c,
          "Sự việc trong ca ghi vào sổ bàn giao, có giờ.",
          "manager",
          undefined,
          t2b,
        ),
        sp(
          "Is anything still open on it?",
          t2d,
          "Vụ việc còn mở cho tới khi bạn gọi lại khách — nói rõ bước còn lại.",
          "manager",
          undefined,
          t2c,
        ),
        sp(
          "Mr Lee is angry about his card again. Where do I write that?",
          "Write it in the complaint log, and add it to his open recovery case.",
          "Phàn nàn vào sổ phàn nàn; vụ việc đang mở thì ghi tiếp vào đúng hồ sơ đó.",
          "colleague",
        ),
        sp(
          "What were you doing when Mr Lee came back to the desk?",
          "I was checking the reprint of his card when he came back, madam.",
          "Quá khứ tiếp diễn kể đúng việc đang làm lúc khách quay lại.",
          "manager",
        ),
        sp(
          "What happened at the bar last night?",
          "A guest was shouting at the staff. He was disruptive, so we called security.",
          "Ôn tuần 27: quá khứ tiếp diễn cho cảnh đang diễn ra, quá khứ đơn cho việc đã làm.",
          "manager",
          ["disruptive"],
        ),
        sp(
          "What was Mr Fischer asking for this morning?",
          "He was asking us to cancel a charge and add his missing points, madam.",
          "Ôn tuần 28: quá khứ tiếp diễn kể lại đúng hai yêu cầu của khách.",
          "manager",
          ["cancel", "missing", "points"],
        ),
        sp(
          "Why is room 1405 in the complaint log?",
          "There was a late amenity delivery last night, madam. I am going to escalate it today.",
          "Ôn tuần 27: gọi đúng tên sự việc, rồi bước bạn sắp làm.",
          "manager",
          ["late", "amenity", "delivery", "escalate"],
        ),
        sp(
          "What went wrong for Mrs Okoye's daughter?",
          "It was a forgotten birthday, madam. A preference note was lost between two shifts.",
          "Ôn tuần 27: gọi đúng tên sự việc, rồi nguyên nhân đã được kiểm tra.",
          "manager",
          ["forgotten", "birthday"],
        ),
        sp(
          "Mr Fischer is shouting at the desk. He wants a manager now.",
          "Please stay with him. I will bring the manager to you.",
          "Ôn tuần 28: đồng nghiệp ở lại với khách, bạn đưa quản lý tới — không giữ khách chờ.",
          "colleague",
          ["bring", "manager"],
        ),
        sp(
          "Why was Mr Lee so angry yesterday?",
          "He was waiting for a call back, madam. It was a broken promise.",
          "Ôn tuần 27: quá khứ tiếp diễn kể việc khách đang chờ, rồi gọi đúng tên sự việc.",
          "manager",
          ["waiting", "broken", "promise"],
        ),
      ],
      reading: read(
        `At the cocktail hour, Vy was serving coffee when a guest suddenly felt dizzy. Vy called first aid and the duty manager and stayed with the guest. First aid came in four minutes, and the guest was resting when her husband arrived. After first aid left, Vy wrote everything in the shift handover book, with the times. She also opened a recovery case. The next morning, her manager read the book and called the guest.`,
        [
          {
            q: "Vy đang làm gì khi khách thấy chóng mặt?",
            options: ["Đang bàn giao ca", "Đang rót cà phê", "Đang in thiệp mới"],
            correct: 1,
            explanation:
              "'Vy was serving coffee when a guest suddenly felt dizzy' — quá khứ tiếp diễn kể việc đang làm thì sự việc xảy ra.",
          },
          {
            q: "Việc nào Vy làm SAU KHI người sơ cứu rời đi?",
            options: [
              "Gọi quản lý trực tới phòng chờ ngay",
              "Ở lại với khách",
              "Ghi sự việc vào sổ bàn giao",
            ],
            correct: 2,
            explanation:
              "'After first aid left, Vy wrote everything in the shift handover book' — lo cho khách trước, ghi sổ sau.",
          },
          {
            q: "Vì sao quản lý gọi được cho khách ngay sáng hôm sau?",
            options: [
              "Vì sổ bàn giao đã ghi đủ việc và giờ",
              "Vì vị khách gọi xuống quầy trước",
              "Vì người sơ cứu báo cho quản lý",
            ],
            correct: 0,
            explanation:
              "'wrote everything… with the times… her manager read the book' — ghi chép đủ thì người sau làm tiếp được ngay.",
          },
        ],
      ),
      game: [
        game(
          "What were you doing when the guest felt dizzy?",
          "I was serving coffee in the lounge, madam.",
          "Nothing much, madam. I was just check my phone for a minute.",
          "Nothing much, madam. I was just checking my phone for a minute.",
          "manager",
          "Câu cuối thật thà nhưng kể một việc không nên làm khi trực. Câu đúng dùng quá khứ tiếp diễn kể đúng việc đang làm.",
        ),
        game(
          "Where do I write a guest's complaint?",
          "In the complaint log, the same day.",
          "In the complaint log, at the same day.",
          "Just remember it. Writing it down takes too much time.",
          "colleague",
          "Câu cuối để phàn nàn không có dấu vết — ca sau không biết để xử lý. Câu đúng: sổ phàn nàn, ngay trong ngày.",
        ),
      ],
    }),

    L(29, 3, "Open Items", "Những việc còn mở", {
      vocabulary: [
        c("Yet", "The fruit basket for 1206 has not gone up yet.", [
          "/jet/",
          "Chưa — đứng cuối câu phủ định hoặc câu hỏi",
          "⏳",
        ]),
        c("Amenity delivery list", "Two rooms are still on the amenity delivery list."),
        c("Birthday calendar", "The birthday calendar shows two birthdays tomorrow."),
        c("Upgrade waiting list", "Mrs Patel is first on the upgrade waiting list."),
      ],
      grammar: [
        g(
          "Not finish.",
          "Two amenities have not been delivered yet, but they will go up by five.",
          "Hiện tại hoàn thành bị động: 'have not been delivered yet'. Quá khứ phân từ cần -ed.",
          "Two amenities have not been deliver yet, but they will go up by five.",
        ),
        g(
          "Upgrade? Maybe.",
          "Mrs Patel is first on the upgrade waiting list, but nothing is confirmed.",
          "Bàn giao rõ: đang chờ khác với đã xác nhận. Một người: 'is'.",
          "Mrs Patel are first on the upgrade waiting list, but nothing is confirmed.",
        ),
      ],
      speaking: [
        sp(
          "Is anything still open on your list?",
          t3a,
          "Việc còn mở: hiện tại hoàn thành bị động + yet, kèm mốc giờ.",
          "colleague",
        ),
        sp(
          "Any birthdays tomorrow?",
          t3b,
          "Số lượng, nơi ghi, và ai đang lo.",
          "colleague",
          undefined,
          t3a,
        ),
        risk(
          also(
            sp(
              "And the upgrade waiting list?",
              t3c,
              "Đang chờ chưa phải là đã xác nhận — dặn ca sau đừng hứa với khách.",
              "colleague",
              ["first", "confirmed", "yet"],
              t3b,
            ),
            "Mrs Patel is first on the list, but it is not confirmed. Please do not tell her yet.",
            "Please do not tell her yet. Mrs Patel is first, but it is not confirmed.",
          ),
        ),
        sp(
          "Has Mrs Patel's upgrade been confirmed?",
          "Not yet, madam. She is still first on the upgrade waiting list.",
          "Báo cấp trên đúng tình trạng, kèm ai trả lời và lúc nào.",
          "manager",
        ),
        sp(
          "Room 1508 wants to stay until three tomorrow.",
          "Late check-out will depend on availability. Please ask the front office to extend it.",
          "Ôn tuần 28: điều kiện thật, đúng người quyết.",
          "colleague",
          ["depend", "availability", "extend"],
        ),
        sp(
          "Why is 1206 still on the amenity delivery list?",
          "I was checking the amenity delivery list when the florist called. The flowers come at six.",
          "Quá khứ tiếp diễn + lý do còn mở + mốc giờ.",
          "colleague",
        ),
        sp(
          "Did the front office approve the room move for the Dubois family?",
          "Not yet, madam. The front office has to approve the room move first.",
          "Ôn tuần 28: chưa duyệt thì nói chưa, và ai là người duyệt.",
          "manager",
          ["approve", "room", "move"],
        ),
        sp(
          "Room 1206 wants the terrace or the library tonight. Which is better?",
          "Either is fine. The library is a quiet alternative if the terrace is full.",
          "Ôn tuần 28: để khách chọn, kèm phương án thay thế.",
          "colleague",
          ["either", "alternative"],
        ),
      ],
      reading: read(
        `Before her break, Thu writes the open items for Quan. Two amenities have not been delivered yet; they go up at five. Thu was checking that list when the florist called about room 1206, so its flowers now come at six. The birthday calendar shows two birthdays tomorrow, and the pastry chef has both orders. Mrs Patel is first on the upgrade waiting list, but nothing is confirmed, so nobody should tell her yet. Quan reads every item before he starts.`,
        [
          {
            q: "Vì sao chưa ai được báo bà Patel về việc nâng hạng?",
            options: [
              "Vì bà Patel sắp trả phòng",
              "Vì việc nâng hạng chưa được xác nhận",
              "Vì quản lý đang nghỉ phép",
            ],
            correct: 1,
            explanation:
              "'nothing is confirmed, so nobody should tell her yet' — báo khách khi chưa xác nhận là hứa suông.",
          },
          {
            q: "Ai đang lo hai chiếc bánh sinh nhật?",
            options: ["Thợ làm bánh", "Tổ buồng phòng", "Chính Thu"],
            correct: 0,
            explanation:
              "'the pastry chef has both orders' — bàn giao nói rõ việc đang nằm ở tay ai.",
          },
          {
            q: "Vì sao hoa của phòng 1206 tới lúc sáu giờ thay vì năm giờ?",
            options: [
              "Vì khách phòng 1206 xin đổi giờ",
              "Vì Thu quên đặt hoa từ sáng",
              "Vì người bán hoa đã gọi báo đổi giờ",
            ],
            correct: 2,
            explanation:
              "'the florist called about room 1206, so its flowers now come at six' — lý do của việc còn mở phải được ghi lại.",
          },
        ],
      ),
      game: [
        game(
          "Can I tell Mrs Patel that her upgrade is ready?",
          "Mrs Patel is first on the list, but it is not confirmed. Please do not tell her yet.",
          "Mrs Patel is first on the list, but it is not confirm. Please do not tell her yet.",
          "Yes, tell her now. The front office will probably say yes.",
          "colleague",
          "Câu cuối hứa thay lễ tân dựa trên phỏng đoán. Câu đúng phân biệt rõ đang chờ với đã xác nhận.",
        ),
        game(
          "Are there any birthdays tomorrow?",
          "Two, on the birthday calendar.",
          "I not sure. We can asking the guests at breakfast.",
          "I am not sure. We can ask the guests at breakfast.",
          "colleague",
          "Câu cuối bỏ qua lịch sinh nhật đã có, để khách mất bất ngờ. Câu đúng tra đúng chỗ ghi.",
        ),
      ],
    }),

    L(29, 4, "The Right Note in the Right Place", "Đúng ghi chú, đúng chỗ", {
      vocabulary: [
        c("Guest preference file", "Her foam pillows are in the guest preference file."),
        c("Follow-up note", "I left a follow-up note for the morning team."),
        c("Set-up checklist", "The set-up checklist has flowers, a cake and a card."),
        c("Lounge duty roster", "The lounge duty roster shows who works tonight."),
      ],
      grammar: [
        g(
          "Pillow, remember.",
          "I added her pillow preference to the guest preference file, with her consent.",
          "'add something TO a file' — giới từ 'to'. Chỉ lưu khi khách đã đồng ý.",
          "I added her pillow preference at the guest preference file, with her consent.",
        ),
        g(
          "Note there.",
          "I was writing a follow-up note when Mrs Ford called down.",
          "Quá khứ tiếp diễn cho việc đang làm; 'called' — việc chen vào.",
          "I was write a follow-up note when Mrs Ford called down.",
        ),
      ],
      speaking: [
        sp(
          "Did Mrs Ford agree to keep her preferences in the guest preference file?",
          t4a,
          "Báo cấp trên: có sự đồng ý, ký lúc nào.",
          "manager",
        ),
        sp(
          "Good. What did you add to her file?",
          t4b,
          "Kể đúng những gì đã ghi — quá khứ đơn.",
          "manager",
          undefined,
          t4a,
        ),
        sp(
          "What is still open for the morning?",
          t4c,
          "Ôn tuần 28: việc còn mở + bạn đã để lại ghi chú cho ai.",
          "manager",
          ["post"],
          t4b,
        ),
        sp(
          "What were you doing when the Dubois family came back?",
          "I was checking the availability of a private dinner for them, madam.",
          "Ôn tuần 28: quá khứ tiếp diễn cho việc đang làm, gọi đúng tên dịch vụ.",
          "manager",
          ["availability", "private", "dinner"],
        ),
        sp(
          "Who is working in the lounge tonight?",
          "Check the lounge duty roster. Tuan and Ngoc are there until ten.",
          "Chỉ đúng chỗ tra, rồi trả lời luôn.",
          "colleague",
        ),
        sp(
          "Did the Dubois family get their apology letter?",
          "Yes, madam. I went up to deliver the apology letter at noon.",
          "Ôn tuần 28: việc đã làm, quá khứ đơn, kèm giờ.",
          "manager",
          ["deliver", "apology", "letter"],
        ),
        sp(
          "The guest in 1602 is a famous singer. What should I tell the team?",
          "Treat her stay with discretion. Write nothing about her on the lounge duty roster.",
          "Ôn tuần 25: sự kín đáo — và thông tin khách không nằm ở chỗ ai cũng đọc được.",
          "colleague",
          ["discretion"],
        ),
        sp(
          "Is everything ready for the anniversary in 1508?",
          "Yes, I checked the set-up checklist at four: flowers, cake and card.",
          "Đã kiểm gì, lúc nào, kết quả.",
          "colleague",
        ),
        sp(
          "Is anything planned for the Dubois family?",
          "Yes. Their recovery plan is to redo the set-up tomorrow at seven.",
          "Ôn tuần 27–28: kế hoạch bù đắp đã được duyệt, làm gì, lúc nào.",
          "colleague",
          ["recovery", "plan", "redo"],
        ),
      ],
      reading: read(
        `Mrs Ford signed the consent form at check-in, so Lan added her foam pillows and green tea to the guest preference file. Lan was writing a follow-up note when Mrs Ford called down about her tea, and Lan went up straight away. Her post-stay follow-up is still open, so the note is for the morning team. Lan wrote no guest details on the lounge duty roster, because the roster hangs on the staff wall. The guest preference file stays in the system.`,
        [
          {
            q: "Vì sao Lan được ghi sở thích của bà Ford vào hồ sơ?",
            options: [
              "Vì bà Ford là khách quen lâu năm",
              "Vì quản lý yêu cầu ghi mọi sở thích",
              "Vì bà Ford đã ký phiếu đồng ý",
            ],
            correct: 2,
            explanation:
              "'Mrs Ford signed the consent form at check-in, so Lan added…' — có đồng ý mới lưu.",
          },
          {
            q: "Lan đang làm gì khi bà Ford gọi xuống?",
            options: [
              "Viết ghi chú theo dõi",
              "Đọc lịch trực phòng chờ",
              "Mang trà lên phòng khách",
            ],
            correct: 0,
            explanation:
              "'Lan was writing a follow-up note when Mrs Ford called down' — quá khứ tiếp diễn cho việc đang làm.",
          },
          {
            q: "Vì sao Lan không ghi thông tin khách lên lịch trực phòng chờ?",
            options: [
              "Vì lịch trực đã kín chỗ ghi",
              "Vì lịch trực treo trên tường, ai cũng đọc được",
              "Vì đồng nghiệp ca sáng không đọc lịch trực",
            ],
            correct: 1,
            explanation:
              "'the roster hangs on the staff wall' — thông tin của khách chỉ nằm trong hồ sơ, không nằm ở chỗ ai cũng thấy.",
          },
        ],
      ),
      game: [
        game(
          "Where did you put Mrs Ford's tea preference?",
          "In the guest preference file, madam, with her consent.",
          "On the lounge duty roster, madam, so every colleague can sees it easily.",
          "On the lounge duty roster, madam, so every colleague can see it easily.",
          "manager",
          "Câu cuối để thông tin khách ở nơi ai cũng đọc được. Câu đúng: đúng hồ sơ, có sự đồng ý của khách.",
        ),
        game(
          "Who works in the lounge tonight?",
          "Tuan and Ngoc. It is on the lounge duty roster.",
          "Tuan and Ngoc. It is on lounge duty roster.",
          "I do not know. Everyone just comes in when they can.",
          "colleague",
          "Câu cuối không biết ai trực — khách VIP tới mà không ai đón. Câu đúng tra lịch trực và trả lời luôn.",
        ),
      ],
    }),
  ];
}

// ── Week 30 — Checkpoint: the phase's words, said again ─────────────────
// The checkpoint teaches nothing new. Its sixteen cards are words of weeks
// 23-29 that the phase had stopped saying, presented again with the gloss
// they were first taught with, and every one is said again below.
function week30(): LessonContent[] {
  const t1a =
    "I recommend the evening cocktail hour in the lounge, sir. It is quieter than the bar.";
  const t1b =
    "Thank you, sir. I will tell the chef about her shellfish allergy before the evening cocktail hour.";
  const t1c = "Yes, sir. I am going to make a courtesy call at eight.";
  const t2a = "I am sorry, sir. Guest arrival times are confidential.";
  const t2b = "I cannot confirm who is staying with us, sir.";
  const t2c = "You are welcome in the lobby, sir. I will let the duty manager know you are here.";
  const t3a = "I am very sorry for the spelling mistake, sir. I will reprint the card myself.";
  const t3c = "I understand, sir. I will escalate it to my manager today.";
  const t4a = "Do not move her. I am calling first aid and the duty manager now.";
  const t4b = "Please ask him to wait for first aid. I will stay with them.";
  const t4c =
    "I will tell the duty manager what I saw. Then I will write it in the shift handover book.";
  return [
    L(30, 1, "Recommend and Promise", "Gợi ý và cam kết", {
      vocabulary: [
        c("Evening cocktail hour", "The evening cocktail hour is quieter than the bar."),
        c("Shellfish", "Please tell the chef about any shellfish allergy.", [
          "/ˈʃelfɪʃ/",
          "Hải sản có vỏ (tôm, cua, sò)",
          "🦐",
        ]),
        c("Courtesy call", "Make a courtesy call within an hour of check-in.", [
          "/ˈkɜːtəsi kɔːl/",
          "Cuộc gọi hỏi thăm khách",
          "☎️",
        ]),
        c("Delay", "I am very sorry for the delay, madam.", ["/dɪˈleɪ/", "Sự chậm trễ", "⏳"]),
      ],
      grammar: [
        g(
          "Cocktail bar better.",
          "The evening cocktail hour is quieter than the bar, madam.",
          "Tuần 23: so sánh hơn với tính từ ngắn: quiet → quieter than. Không thêm 'more'.",
          "The evening cocktail hour is quiet than the bar, madam.",
        ),
        g(
          "Late, sorry, soon.",
          "I am very sorry for the delay. I am going to bring it within ten minutes.",
          "Tuần 25: 'be going to' cần 'am'; lời hứa có mốc bằng số phút.",
          "I am very sorry for the delay. I going to bring it within ten minutes.",
        ),
      ],
      speaking: [
        sp(
          "We want a quiet drink tonight. What do you recommend?",
          t1a,
          "Tuần 23: gợi ý + một lý do so sánh, gọi đúng tên dịch vụ.",
          undefined,
          ["recommend", "evening", "cocktail", "hour"],
        ),
        risk(
          also(
            sp(
              "My wife cannot eat shellfish. Are the snacks safe for her?",
              t1b,
              "Tuần 25–26: dị ứng là chuyện an toàn — báo bếp trước giờ phục vụ, không tự hứa món ăn an toàn.",
              undefined,
              ["tell", "chef", "shellfish", "allergy", "before", "evening", "cocktail", "hour"],
              t1a,
            ),
            "Thank you, sir. I will tell the kitchen about her shellfish allergy before the evening cocktail hour.",
            "Thank you, sir. I will tell the chef about your shellfish allergy before the evening cocktail hour.",
          ),
        ),
        sp(
          "Thank you. Will someone check on us later?",
          t1c,
          "Tuần 25–26: kế hoạch có sẵn ('going to') + cuộc gọi hỏi thăm có giờ.",
          undefined,
          ["courtesy"],
          t1b,
        ),
        sp(
          "Our airport car is forty minutes late!",
          "I am very sorry for the delay, madam. I will arrange an airport transfer myself now.",
          "Tuần 25: xin lỗi đúng sự việc, nhận việc về mình.",
          undefined,
          ["delay", "airport", "transfer"],
        ),
        sp(
          "The car is still not here, and my flight is at nine.",
          "I understand, madam. I will speak to the duty manager about the delay now.",
          "Tuần 25–26: trễ lần hai thì chuyển lên quản lý trực, ngay.",
          undefined,
          ["delay"],
        ),
        sp(
          "Do the canapés tonight have any shellfish?",
          "I will ask the executive chef to check the canapés for shellfish, madam.",
          "Tuần 26–27: không đoán thành phần — hỏi đúng người làm món.",
          undefined,
          ["shellfish"],
        ),
        sp(
          "We want a quieter room for our next visit.",
          "I recommend the club floor room, sir. It is quieter than a standard room.",
          "Tuần 23: gợi ý + so sánh hơn.",
          undefined,
          ["club", "floor", "room"],
        ),
        sp(
          "Next time, which car is best from the airport?",
          "The limousine pick-up is more comfortable, madam. Our airport representative meets every car.",
          "Tuần 23 và 26: so sánh, rồi nói ai đón khách.",
          undefined,
          ["limousine", "airport", "representative"],
        ),
        sp(
          "What do I do after a VIP checks in?",
          "Make a courtesy call within an hour. With the guest's consent, update the guest preference file.",
          "Tuần 26 và 29: nói với đồng nghiệp — hai việc, có mốc.",
          "colleague",
          ["courtesy", "update"],
        ),
      ],
      reading: read(
        `Mr Ward asks Ngan for somewhere quiet for a drink. Ngan recommends the evening cocktail hour, which is quieter than the bar. Mrs Ward cannot eat shellfish, so Ngan tells the chef before the cocktail hour starts. At eight, Ngan makes a courtesy call to check that everything is fine. The next morning, the Wards' airport car is late. Ngan apologises for the delay and arranges the transfer herself.`,
        [
          {
            q: "Vì sao Ngân báo bếp TRƯỚC giờ cocktail?",
            options: [
              "Vì khách muốn đặt bàn sớm",
              "Để bếp biết về dị ứng trước khi làm món",
              "Vì bếp đóng cửa sau tám giờ",
            ],
            correct: 1,
            explanation:
              "'Mrs Ward cannot eat shellfish, so Ngan tells the chef before the cocktail hour starts' — thông tin dị ứng phải tới bếp trước khi món được làm.",
          },
          {
            q: "Ngân làm gì lúc tám giờ?",
            options: [
              "Gọi điện hỏi thăm khách",
              "Mang đồ uống lên phòng khách",
              "Đặt xe ra sân bay cho khách",
            ],
            correct: 0,
            explanation:
              "'At eight, Ngan makes a courtesy call' — cuộc gọi hỏi thăm có giờ, như đã hứa.",
          },
          {
            q: "Việc nào xảy ra CUỐI CÙNG?",
            options: [
              "Ngân gợi ý giờ cocktail",
              "Ngân gọi điện hỏi thăm",
              "Ngân xin lỗi vì xe đến trễ",
            ],
            correct: 2,
            explanation:
              "Thứ tự: gợi ý → báo bếp → gọi hỏi thăm lúc tám giờ → sáng hôm sau xe trễ, Ngân xin lỗi và tự sắp xếp xe.",
          },
        ],
      ),
      game: [
        game(
          "Where can we have a quiet drink tonight?",
          "I recommend the evening cocktail hour, sir. It is quieter than the bar.",
          "I recommend the evening cocktail hour, sir. It is more quieter than the bar.",
          "The bar is our most popular place at night, sir. Everyone goes there.",
          undefined,
          "Câu cuối gợi ý theo độ đông khách, không theo điều khách cần (yên tĩnh). Câu đúng so sánh đúng điểm khách hỏi.",
        ),
        game(
          "Are the canapés safe for me? I cannot eat shellfish.",
          "Thank you, sir. I will tell the chef about your shellfish allergy before the evening cocktail hour.",
          "Thank you, sir. I will tell the chef about your shellfish allergy before evening cocktail hour.",
          "Yes, sir, they are all safe. Our chef never uses shellfish.",
          undefined,
          "Câu cuối hứa điều bạn không biết chắc — về dị ứng, đó là rủi ro thật. Câu đúng báo bếp trước giờ phục vụ.",
        ),
      ],
    }),

    L(30, 2, "Explain, and Keep Guests Private", "Giải thích, và giữ bảo mật cho khách", {
      vocabulary: [
        c("Blackout period", "Christmas is in the blackout period."),
        c("Membership tier rule", "The membership tier rule gives Gold members lounge breakfast."),
        c("Lounge access fee", "The lounge access fee starts with the third guest."),
        c("Guest preference file", "Her preferences are in the guest preference file."),
      ],
      grammar: [
        g(
          "Christmas no points.",
          "I am afraid Christmas is in the blackout period, madam.",
          "Tuần 24: 'I am afraid…' làm mềm tin xấu; 'in the blackout period'.",
          "I am afraid Christmas is on the blackout period, madam.",
        ),
        g(
          "Friend pay.",
          "There is a lounge access fee for the third guest, sir.",
          "Tuần 24: 'There is a … fee for …' — báo phí nhẹ nhàng, có lý do.",
          "There are a lounge access fee for the third guest, sir.",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "I am a reporter. What time does the minister arrive today?",
              t2a,
              "Giờ đến của khách là thông tin bảo mật — với bất kỳ người ngoài nào.",
              undefined,
              ["guest", "arrival", "times", "confidential"],
            ),
            "I am sorry, sir. I cannot give out arrival times. They are confidential.",
          ),
        ),
        risk(
          also(
            sp(
              "Just tell me if he is staying here, then.",
              t2b,
              "Không nói có, không nói không. Câu này bảo vệ khách.",
              undefined,
              ["confirm", "staying"],
              t2a,
            ),
            "I am sorry, sir. Because of our guest privacy rule, I cannot confirm who is staying with us.",
            "I am sorry, sir. I cannot confirm if he is staying here.",
          ),
        ),
        sp(
          "Then I will wait in your lobby all day.",
          t2c,
          "Sảnh là nơi công cộng — lịch sự, nhưng báo quản lý trực có người lạ đang chờ khách VIP.",
          undefined,
          ["duty", "manager"],
          t2b,
        ),
        sp(
          "Can I use my points for a suite over Christmas?",
          "I am sorry, madam. Christmas is in the blackout period, but another week is possible.",
          "Tuần 24: tin xấu nói nhẹ, rồi đưa ngay điều khách CÓ THỂ làm.",
          undefined,
          ["blackout", "period"],
        ),
        sp(
          "Why is there a blackout period at all?",
          "Because the hotel is full in the blackout period, sir. The rooms are kept for bookings then.",
          "Tuần 24: 'because' + lý do thật.",
          undefined,
          ["blackout", "period"],
        ),
        sp(
          "What does Gold give me, and what is the benefit condition?",
          "The membership tier rule gives you lounge breakfast, sir. The benefit condition is two nights.",
          "Tuần 24: gọi đúng tên quy định và điều kiện.",
          undefined,
          ["membership", "tier", "rule", "benefit", "condition"],
        ),
        sp(
          "My husband is not a member. Can he use my Gold benefits?",
          "Under the membership tier rule, he can use them with you, madam. There is no lounge access fee for him.",
          "Tuần 24: nói đúng quy định, và nói luôn chuyện phí.",
          undefined,
          ["membership", "tier", "rule"],
        ),
        sp(
          "Can my two colleagues join me in the lounge?",
          "One colleague is within the guest limit, sir. There is a lounge access fee for the second.",
          "Tuần 24: báo phí theo giới hạn số khách, trước khi khách vào.",
          undefined,
          ["lounge", "access", "fee"],
        ),
        sp(
          "What do you keep about me, and is it private?",
          "We keep your preferences in your guest preference file only with your consent, madam. We treat it with discretion.",
          "Tuần 24 và 29: có đồng ý mới lưu, và thông tin ấy được bảo mật.",
          undefined,
          ["consent", "guest", "preference", "file", "discretion"],
        ),
        sp(
          "How do I keep Gold next year?",
          "Under the tier renewal rule, you have to stay twenty nights a year, sir.",
          "Tuần 24: 'have to' + điều kiện, gọi đúng tên quy định.",
          undefined,
          ["tier", "renewal", "rule"],
        ),
      ],
      reading: read(
        `A minister arrives at the hotel today. Security brings his team in through the side entrance. A man says he is a reporter and asks Duc when the minister arrives. Duc says guest arrival times are confidential. The man asks if the minister is staying at the hotel. Duc does not confirm anything. The man decides to wait in the lobby, so Duc tells the duty manager, who tells security. The minister arrives an hour later, and nobody in the lobby knows.`,
        [
          {
            q: "Đức trả lời thế nào về giờ đến của vị bộ trưởng?",
            options: [
              "Nói vị bộ trưởng đến buổi chiều",
              "Hẹn phóng viên gọi lại vào ngày mai",
              "Nói đó là thông tin bảo mật",
            ],
            correct: 2,
            explanation:
              "'Duc says guest arrival times are confidential' — không nói giờ, không nói có hay không.",
          },
          {
            q: "Vì sao Đức báo quản lý trực?",
            options: [
              "Vì một người lạ đang chờ khách VIP ở sảnh",
              "Vì phóng viên đòi gặp quản lý để phỏng vấn",
              "Vì Đức lỡ nói giờ đến cho người lạ",
            ],
            correct: 0,
            explanation:
              "'The man decides to wait in the lobby, so Duc tells the duty manager' — an toàn của khách VIP là việc quản lý trực phải biết.",
          },
          {
            q: "Vì sao an ninh đưa đoàn của bộ trưởng vào bằng cửa bên?",
            options: [
              "Vì sảnh chính đang được sửa chữa",
              "Để người ngoài không biết giờ và lối vào của khách",
              "Vì cửa bên gần quầy lễ tân hơn",
            ],
            correct: 1,
            explanation:
              "Lối vào riêng và giờ đến bí mật đi cùng nhau — đó là lý do Đức không nói gì với người lạ.",
          },
        ],
      ),
      game: [
        game(
          "Is the minister staying here? I have a gift for him.",
          "I am sorry, sir. I cannot confirm if he is staying here.",
          "He in the suite on top floor, sir.",
          "He is in the suite on the top floor, sir. I can take the gift up for you.",
          undefined,
          "Câu cuối cho người lạ biết khách ở đâu và mang quà chưa kiểm tra lên phòng. Câu đúng không xác nhận gì.",
        ),
        game(
          "What time does the minister land? I want to take photos.",
          "I am sorry, sir. Guest arrival times are confidential.",
          "I am sorry, sir. Guest arrival times is confidential.",
          "He lands at ten, sir, but please do not tell anyone I said so.",
          undefined,
          "Câu cuối tiết lộ giờ đến của khách VIP cho người lạ. Câu đúng giữ bảo mật, lịch sự.",
        ),
      ],
    }),

    L(30, 3, "Apologise and Solve", "Xin lỗi và giải quyết", {
      vocabulary: [
        c("Forgotten birthday", "A forgotten birthday is a real disappointment."),
        c("Late amenity delivery", "A late amenity delivery is not our standard."),
        c("Long wait at check-in", "Two guests wrote about a long wait at check-in."),
        c("Reservations team", "The reservations team can correct your dates."),
      ],
      grammar: [
        g(
          "Sorry. Name again.",
          "I am very sorry your name was spelled wrong again, sir.",
          "Tuần 27: xin lỗi đúng điều khách gặp. Bị động: 'was spelled', cần -ed.",
          "I am very sorry your name was spell wrong again, sir.",
        ),
        g(
          "Birthday forget again.",
          "If you like, I will add your date to the birthday calendar now, madam.",
          "Tuần 28: đề nghị có điều kiện; sau 'will' là động từ nguyên mẫu.",
          "If you like, I will adds your date to the birthday calendar now, madam.",
        ),
      ],
      speaking: [
        sp(
          "You spelled my name wrong again on the new card!",
          t3a,
          "Tuần 27–28: xin lỗi đúng lỗi khách gặp, rồi tự in lại.",
          undefined,
          ["spelling", "mistake", "reprint"],
        ),
        risk(
          also(
            sp(
              "And I want more than a new card this time.",
              t3c,
              "Bù đắp có giá trị là quyết định của quản lý. Không tự hứa quà — chuyển lên.",
              undefined,
              ["understand", "escalate", "manager", "today"],
              t3a,
            ),
            "I understand, sir. My manager has to approve that, and I will ask today.",
          ),
        ),
        sp(
          "Last year you forgot my birthday, and this year too!",
          "I am so sorry about the forgotten birthday, madam. Would you like me to add your date to the birthday calendar?",
          "Tuần 27 và 29: xin lỗi đúng điều khách gặp, rồi HỎI khách trước khi ghi ngày sinh vào lịch.",
          undefined,
          ["forgotten", "birthday", "calendar"],
        ),
        sp(
          "My fruit basket came at midnight again.",
          "I am sorry about the late amenity delivery, sir. I will check the amenity delivery list now.",
          "Tuần 27 và 29: xin lỗi, gọi đúng tên sự việc, kiểm tra đúng danh sách — không hứa 'không bao giờ lặp lại'.",
          undefined,
          ["late", "amenity", "delivery"],
        ),
        sp(
          "Our anniversary set-up has no cake!",
          "I am so sorry, madam. I will check the set-up checklist and bring the cake up myself.",
          "Tuần 29: xin lỗi, kiểm tra đúng danh sách chuẩn bị, rồi tự làm phần còn thiếu.",
          undefined,
          ["set-up", "checklist"],
        ),
        sp(
          "What is the recovery plan for Mr Lee?",
          "The recovery plan is a new card today, and the reservations team will fix his booking.",
          "Báo cấp trên: các bước, ai làm bước nào.",
          "manager",
          ["recovery", "plan", "reservations", "team"],
        ),
        sp(
          "Where did you record Mr Lee's complaint?",
          "In the complaint log, madam. It is still an open recovery case.",
          "Tuần 29: đúng sổ, và nói rõ vụ việc còn mở.",
          "manager",
          ["complaint", "log", "open", "recovery", "case"],
        ),
        sp(
          "Did you promise Mr Lee anything extra?",
          "No, madam. A goodwill gesture is your decision, so I only said you would call.",
          "Tuần 29: món có giá trị là quyết định của quản lý — báo đúng điều mình đã nói với khách.",
          "manager",
          ["goodwill", "gesture"],
        ),
        sp(
          "How was our guest satisfaction score this week?",
          "It went up, madam. The comments were about a long wait at check-in and a forgotten birthday.",
          "Báo cấp trên: kết quả, rồi điều còn cần sửa.",
          "manager",
          ["long", "wait", "forgotten", "birthday"],
        ),
      ],
      reading: read(
        `Mr Lee's name is spelled wrong for the second time. Phuong apologises, reprints the card herself and checks the spelling with him letter by letter. The reservations team then corrects the name in his booking, so it cannot happen a third time. Mr Lee wants more than a card. Phuong does not promise a gift herself; she escalates it to her manager. The manager calls Mr Lee that day. Two days later, he says he is happy.`,
        [
          {
            q: "Phương làm gì trước khi đưa thiệp mới?",
            options: [
              "Kiểm tra cách viết tên cùng khách",
              "Hỏi đồng nghiệp ai in sai lần trước",
              "Xin quản lý cho phép in lại thiệp",
            ],
            correct: 0,
            explanation:
              "'checks the spelling with him letter by letter' — lần thứ hai thì kiểm tra cùng khách, không đoán nữa.",
          },
          {
            q: "Vì sao bộ phận đặt phòng sửa tên trong hồ sơ đặt phòng?",
            options: [
              "Để khách được nâng hạng phòng",
              "Để lỗi không lặp lại lần thứ ba",
              "Vì khách yêu cầu đổi ngày ở",
            ],
            correct: 1,
            explanation:
              "'so it cannot happen a third time' — sửa ở gốc (hồ sơ đặt phòng) chứ không chỉ in lại thiệp.",
          },
          {
            q: "Ai quyết định bù đắp thêm cho khách?",
            options: ["Phương, ngay tại quầy", "Chính vị khách", "Quản lý của Phương"],
            correct: 2,
            explanation:
              "'Phuong does not promise a gift herself; she escalates it to her manager' — món có giá trị đi qua quản lý.",
          },
        ],
      ),
      game: [
        game(
          "Is a new card all I get for this?",
          "I understand, sir. I will escalate it to my manager today.",
          "I understand, sir. I will escalating it to my manager today.",
          "Of course not, sir. I will put a bottle of wine in your room tonight.",
          undefined,
          "Câu cuối tự tặng một món có giá trị tiền — vượt quyền GRO. Câu đúng chuyển lên quản lý, kèm mốc.",
        ),
        game(
          "You forgot my birthday again this year!",
          "I am so sorry, madam. Would you like me to add your date to the birthday calendar?",
          "That was the night team, madam. They never checks the calendar.",
          "That was the night team, madam. They never check the calendar.",
          undefined,
          "Câu cuối đổ lỗi cho đồng nghiệp trước mặt khách. Câu đúng xin lỗi và sửa đúng chỗ ghi.",
        ),
      ],
    }),

    L(30, 4, "End of Phase Three", "Kết thúc giai đoạn ba", {
      vocabulary: [
        c("Unattended", "Never leave a child unattended in the lobby.", [
          "/ˌʌnəˈtendɪd/",
          "Không có người trông",
          "🚸",
        ]),
        c("Departure schedule", "Check the departure schedule before you start."),
        c("Upgrade waiting list", "Mrs Patel is first on the upgrade waiting list."),
        c("Follow-up note", "I left a follow-up note for the morning team."),
      ],
      grammar: [
        g(
          "I check list, guest fall.",
          "I was checking the departure schedule when she suddenly fell.",
          "Tuần 29: quá khứ tiếp diễn 'was checking' cho việc đang làm; 'fell' — việc chen vào.",
          "I was check the departure schedule when she suddenly fell.",
        ),
        g(
          "Upgrade? Maybe.",
          "Mrs Patel is first on the upgrade waiting list, but nothing is confirmed yet.",
          "Tuần 29: đang chờ khác với đã xác nhận. Một người: 'is'.",
          "Mrs Patel are first on the upgrade waiting list, but nothing is confirmed yet.",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "A guest fell on the lobby steps, and her arm hurts.",
              t4a,
              "Người bị ngã: không di chuyển, gọi sơ cứu và quản lý trực NGAY.",
              "colleague",
              ["move", "calling", "first", "aid", "duty", "manager"],
            ),
            "Please do not move her. First aid and the duty manager are on their way.",
          ),
        ),
        risk(
          also(
            sp(
              "Her husband wants to drive her to the hospital himself.",
              t4b,
              "Việc y tế để người sơ cứu quyết. Bạn ở lại với gia đình.",
              "colleague",
              ["ask", "wait", "first", "aid", "stay"],
              t4a,
            ),
            "Please ask him to wait for first aid. I will stay with the family.",
          ),
        ),
        sp(
          "First aid is here now. What next?",
          t4c,
          "Tuần 29: báo người có trách nhiệm điều mình thấy, rồi ghi vào sổ bàn giao.",
          "colleague",
          ["shift", "handover", "book"],
          t4b,
        ),
        sp(
          "Her little boy is crying beside her. What do I do?",
          "Please stay with him. A child must never be left unattended.",
          "Tuần 26: trẻ nhỏ không bao giờ bị bỏ một mình.",
          "colleague",
          ["unattended"],
        ),
        sp(
          "What should I read before my first shift?",
          "Please read the VIP arrival list and the lounge duty roster before you start.",
          "Tuần 29: nói với đồng nghiệp mới, chỉ đúng chỗ cần đọc trước ca.",
          "colleague",
          ["vip", "arrival", "list"],
        ),
        sp(
          "What were you doing when the guest fell?",
          "I was checking the departure schedule when she suddenly fell, madam.",
          "Tuần 29: quá khứ tiếp diễn cho việc đang làm, quá khứ đơn cho việc chen vào.",
          "manager",
          ["departure", "schedule", "suddenly"],
        ),
        sp(
          "Is anything still open for tonight?",
          "Mrs Patel is still on the upgrade waiting list. I left a follow-up note about it.",
          "Tuần 29: việc còn mở + bạn đã để lại ghi chú.",
          "colleague",
          ["waiting", "note"],
        ),
        sp(
          "Is my upgrade ready yet?",
          "Not yet, madam. The front office will call you as soon as it is confirmed.",
          "Tuần 29: đang chờ khác với đã xác nhận — không hứa thay lễ tân, không kể thứ tự trong danh sách chờ.",
          undefined,
          ["yet", "confirmed"],
        ),
        sp(
          "We are back for our anniversary on the fourteenth of May. Did you remember?",
          "Happy anniversary, madam! Let me check your guest preference file now.",
          "Mừng cùng khách trước, rồi xem đúng hồ sơ — không hứa điều mình chưa kiểm tra.",
        ),
      ],
      reading: read(
        `A guest falls on the lobby steps and hurts her arm. Kim Anh was checking the departure schedule when it happened. She tells her colleague not to move the guest, and she calls first aid and the duty manager. The guest's little boy is crying, so Kim Anh does not leave him unattended. The husband wants to drive to hospital, but Kim Anh asks him to wait for first aid. Afterwards, she writes a follow-up note for the morning team.`,
        [
          {
            q: "Kim Anh đang làm gì khi khách bị ngã?",
            options: [
              "Đang gọi điện cho người sơ cứu",
              "Đang dắt em bé đi tìm bố",
              "Đang kiểm tra lịch khách rời khách sạn",
            ],
            correct: 2,
            explanation:
              "'Kim Anh was checking the departure schedule when it happened' — quá khứ tiếp diễn cho việc đang làm.",
          },
          {
            q: "Vì sao Kim Anh không để em bé một mình?",
            options: [
              "Vì trẻ nhỏ không bao giờ được bỏ không người trông",
              "Vì em bé muốn đi theo mẹ lên xe",
              "Vì quản lý trực yêu cầu trông em",
            ],
            correct: 0,
            explanation:
              "'Kim Anh does not leave him unattended' — trong lúc người lớn bị thương, an toàn của trẻ vẫn là việc của bạn.",
          },
          {
            q: "Vì sao Kim Anh khuyên người chồng chờ thay vì tự lái xe đi?",
            options: [
              "Vì xe của khách sạn đang bận đưa khách khác ra sân bay",
              "Vì người sơ cứu mới biết có nên di chuyển bà hay không",
              "Vì người chồng chưa trả phòng",
            ],
            correct: 1,
            explanation:
              "'asks him to wait for first aid' — chuyện y tế để người có chuyên môn quyết, nhân viên ở lại cùng gia đình.",
          },
        ],
      ),
      game: [
        game(
          "A lady slipped by the pool door. Should we help her stand up?",
          "Do not move her. I am calling first aid and the duty manager now.",
          "Yes, let us helping her to a chair, so she is feeling more comfortable.",
          "Yes, let us help her to a chair, so she is more comfortable.",
          "colleague",
          "Câu cuối nghe tử tế nhưng di chuyển người vừa ngã. Câu đúng giữ nguyên tư thế và gọi sơ cứu ngay.",
        ),
        game(
          "Can I tell Mrs Patel that her upgrade is ready?",
          "Not yet. She is first on the upgrade waiting list, so please do not tell her.",
          "Yes, you tell her now. I am sure the front office will probably says yes for her.",
          "Yes, tell her now. The front office will probably say yes.",
          "colleague",
          "Câu cuối hứa thay lễ tân dựa trên phỏng đoán. Câu đúng phân biệt rõ đang chờ với đã xác nhận.",
        ),
      ],
    }),
  ];
}

/** Guest Relations' Phase 3, week by week. */
export const GR_P3: Record<number, LessonContent[]> = {
  23: week23(),
  24: week24(),
  25: week25(),
  26: week26(),
  27: week27(),
  28: week28(),
  29: week29(),
  30: week30(),
};

/** What a Guest Relations Officer can SAY after each week. */
export const GR_P3_CAN_DO: Record<number, string> = {
  23: "Gợi ý hạng phòng, xe đón và dịch vụ theo nhu cầu của khách, so sánh hai lựa chọn, và chấp nhận ngay khi khách từ chối — giá và nâng hạng để lễ tân báo.",
  24: "Giải thích phí phòng chờ, quy định hội viên và quy định bảo mật bằng lý do thật (have to … because …); không xác nhận khách lưu trú, nhận lời nhắn mà không lộ thông tin.",
  25: "Hứa có mốc bằng số (within ten minutes, by three o'clock, going to …), giữ đúng mốc đã hứa, và nói rõ việc nào không phải của mình để hứa — kể cả khi thư ký gọi hỏi lịch bay của khách.",
  26: "Giao một việc cho đúng một bộ phận (Let me check with … / I'll ask … to …), báo dị ứng cho bếp ngay, và ở lại với trẻ đi lạc trong lúc gọi an ninh và quản lý trực.",
  27: "Nghe hết lời phàn nàn, xin lỗi đúng điều khách gặp mà không nhận lỗi trước khi kiểm tra, hỏi cho rõ sự việc, chuyển lên cấp trên; gọi sơ cứu, an ninh khi không còn là phàn nàn.",
  28: "Đề nghị có điều kiện việc trong quyền của mình (If you like, I can …), từ chối đêm miễn phí, đổi phòng, hủy phí và chuyển đúng người quyết.",
  29: "Bàn giao ca và báo cáo cấp trên bằng quá khứ tiếp diễn (I was … when …): khách VIP, việc còn mở, sự cố trong ca, và đúng sổ cho đúng thông tin.",
  30: "Kết hợp cả giai đoạn: gợi ý và hứa có mốc, giữ bảo mật cho khách VIP, xin lỗi và chuyển lên quản lý, xử lý khách bị ngã — rồi bàn giao lại bằng lời.",
};
