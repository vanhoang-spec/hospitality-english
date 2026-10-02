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
// Cards keep the reviewed GR bank entries (kit.ts looks them up), because
// Phase 4 recycles them; the four words week 27 brought in that the course
// already teaches earlier (Colleague, Prefer, Complimentary, Anniversary)
// are not taught a second time.
// ============================================================
import type { LessonContent } from "../week-content";
import { game, g, read, sp } from "../phase0";
import { cardsFor, lessonsFor, risk } from "./kit";

const c = cardsFor("GR");
const L = lessonsFor("GR");

// ── Week 23 — Recommending, and comparing two options ──────────────────
function week23(): LessonContent[] {
  const t1a = "I recommend the club floor room, madam. It is much quieter than your floor.";
  const t1b = "The suite is bigger, but the club floor room is quieter and costs less.";
  const t1c = "I am sorry, I cannot change the price. The front office will call you.";
  const t2a = "I recommend our airport transfer, sir. It is easier than a taxi at night.";
  const t2b = "The limousine is more comfortable, but the standard car is cheaper.";
  const t2c = "Of course, sir. The driver will meet you at nine with a name card.";
  const t3a = "Congratulations, madam! For your anniversary, I recommend our anniversary set-up.";
  const t3b = "It is bigger than the welcome amenity: flowers, a cake and a card.";
  const t3c =
    "I am sorry, I cannot offer a free spa credit. It comes with the anniversary package.";
  const t4a =
    "Lounge breakfast and the evening cocktail hour are privileges of your club floor room.";
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
        sp(
          "Our floor is noisy at night. Which room would you recommend for the rest of our stay?",
          t1a,
          "Khách hỏi gợi ý: nêu MỘT lựa chọn cụ thể và một lý do so sánh.",
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
          sp(
            "Can you give me the club floor room at my current price?",
            t1c,
            "Giá và nâng hạng do lễ tân quyết. Không tự đổi giá — nói rõ ai sẽ gọi lại.",
            undefined,
            ["price", "front", "office"],
            t1b,
          ),
        ),
        sp(
          "I am here for two weeks of meetings. Which room is best?",
          "I recommend the executive suite, sir. It is bigger, and it has a work desk.",
          "Nhu cầu của khách (làm việc dài ngày) quyết định gợi ý, kèm một lợi ích.",
        ),
      ],
      reading: read(
        `Mrs Becker's room is next to the lift, and she asks Khanh for a quieter one. Khanh listens first. Then she recommends the club floor room: it is quieter, and it costs less than the executive suite. Mrs Becker asks for it at her current price. Khanh does not change the price herself. The front office calls Mrs Becker ten minutes later.`,
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
              "'it is quieter, and it costs less than the executive suite' — gợi ý đi theo nhu cầu của khách (ngủ yên), không theo giá.",
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
          "Club room better, you take.",
          "The suite is the most expensive, madam, so it is the best one for every guest.",
          undefined,
          "Câu cuối chọn hộ khách theo giá, không theo nhu cầu. Câu đúng gợi ý theo điều khách cần (yên tĩnh).",
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
          "Gợi ý kèm một lý do so sánh: dễ hơn đi taxi lúc tối muộn.",
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
      ],
      reading: read(
        `Mr Okafor and his wife land at nine tonight. Minh compares two options for them. The limousine pick-up is more comfortable, but the standard car is cheaper. Both are easier than a taxi at night. Mr Okafor chooses the standard car. Minh tells him the driver will meet them at nine with a name card.`,
        [
          {
            q: "Minh so sánh hai lựa chọn nào cho khách?",
            options: [
              "Taxi sân bay và xe buýt của thành phố",
              "Xe limousine và xe tiêu chuẩn của khách sạn",
              "Xe tiêu chuẩn và taxi gọi qua ứng dụng",
            ],
            correct: 1,
            explanation:
              "'The limousine pick-up is more comfortable, but the standard car is cheaper' — so sánh hai dịch vụ của chính khách sạn.",
          },
          {
            q: "Khách nhận ra tài xế bằng cách nào?",
            options: [
              "Tài xế gọi điện cho khách",
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
          "Limousine more comfort, more good.",
          "Of course the limousine, sir. All our important guests take it.",
          undefined,
          "Câu cuối ép khách chọn món đắt bằng một lý do không liên quan đến khách. Câu đúng so sánh trung thực và để khách chọn.",
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
          "So sánh bằng 'bigger than', rồi kể ngắn những gì có trong đó.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Lovely. Can you add a free spa credit too?",
          t3c,
          "Phiếu spa có giá trị tiền: bạn không tự tặng. Nói nó nằm trong gói nào và ai báo giá.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "My father is eighty and needs help with everything.",
          "Then I recommend the executive suite with butler service, sir. The butler helps all day.",
          "Nghe ra người cần giúp (người cha), rồi gợi ý đúng dịch vụ cho người đó.",
        ),
      ],
      reading: read(
        `Ms Laurent tells Thao that Friday is her tenth wedding anniversary. Thao says congratulations, then recommends the anniversary set-up: flowers, a cake and a card. It is bigger than the welcome amenity. Ms Laurent asks for a free spa credit too. Thao explains that the spa credit comes with the anniversary package, and the front office explains the price.`,
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
              "Vì phiếu spa thuộc một gói có giá, lễ tân báo giá",
              "Vì khách chưa phải là hội viên của khách sạn",
            ],
            correct: 1,
            explanation:
              "'the spa credit comes with the anniversary package, and the front office explains the price' — món có giá trị tiền không phải để GRO tự tặng.",
          },
        ],
      ),
      game: [
        game(
          "It is my husband's birthday tomorrow.",
          "How lovely, madam! I recommend a cake and a card in your room.",
          "Birthday? Okay, cake you buy.",
          "That is nice, madam. There is a good bakery across the street from the hotel.",
          undefined,
          "Câu cuối đẩy khách ra ngoài khách sạn. Câu đúng chúc mừng và gợi ý một điều cụ thể khách sạn làm được.",
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
        ],
        reading: read(
          `Mr Novak is new to the club floor. Bao explains that lounge breakfast and the evening cocktail hour are privileges of his room. Mr Novak does not drink, so Bao mentions the tea and coffee in the lounge. Mr Novak also likes the main restaurant better for breakfast. Bao agrees at once and does not suggest anything a third time.`,
          [
            {
              q: "Bảo làm gì khi khách nói không uống rượu?",
              options: [
                "Nhắc đến trà và cà phê trong phòng chờ",
                "Khuyên khách thử một ly cocktail nhẹ",
                "Bỏ qua và không nói gì thêm về phòng chờ",
              ],
              correct: 0,
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
            "Okay. You go lobby.",
            "Are you sure, sir? Private check-in is much quicker, and all our VIPs use it.",
            undefined,
            "Câu cuối ép khách sau khi khách đã từ chối. Câu đúng chấp nhận ngay và để khách đi theo cách khách chọn.",
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
  const t1b = "I am sorry, sir. The front office can explain the fee before you decide.";
  const t1c = "I am sorry, I cannot change your bill. The front office can check it with you.";
  const t2a = "The suite has a two-night minimum at weekends, because demand is very high.";
  const t2b = "I cannot change it, madam. On weekdays, you can book the suite for one night.";
  const t2c = "Wonderful. The front office will confirm Wednesday for you this afternoon.";
  const t3a = "I am sorry, sir. Points end after two years without a stay.";
  const t3b = "Thank you, sir. I will ask the loyalty office to check that stay.";
  const t3c =
    "I cannot change your points myself, sir. The loyalty office will answer you by Friday.";
  const t4a = "I am sorry, I cannot confirm who is staying with us.";
  const t4b = "Room numbers are confidential, sir, for the safety of our guests.";
  const t4c = "Of course, sir. May I have your name and phone number for the message?";
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
          "Xin lỗi, không tranh luận. Lễ tân giải thích phí, không phải bạn.",
          undefined,
          undefined,
          t1a,
        ),
        risk(
          sp(
            "Can you just not charge me this time?",
            t1c,
            "Bạn không sửa hóa đơn. Nói rõ ai kiểm tra lại cùng khách.",
            undefined,
            ["bill", "front", "office"],
            t1b,
          ),
        ),
        sp(
          "Can I come to the lounge in shorts this evening?",
          "In the evening, the lounge dress code asks for long trousers, sir. Shorts are fine in the morning.",
          "Nói quy định và đưa luôn điều khách CÓ THỂ làm.",
        ),
      ],
      reading: read(
        `Mr Sato brings two business partners to the lounge. Ngoc explains the guest limit: two people per room, so there is a lounge access fee for the third person. Mr Sato asks her to forget the fee this time. Ngoc does not change the bill herself. The front office explains the fee, and Mr Sato pays it.`,
        [
          {
            q: "Vì sao có phí vào phòng chờ trong tình huống này?",
            options: [
              "Vì khách đi cùng là người ngoài khách sạn",
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
              "Không tự sửa hóa đơn, để lễ tân giải thích",
              "Bỏ phí lần này để giữ lòng khách quen",
              "Khuyên khách để một đối tác ngồi ở sảnh",
            ],
            correct: 0,
            explanation:
              "'Ngoc does not change the bill herself' — bỏ hay giữ một khoản phí là quyết định về tiền, không thuộc GRO.",
          },
        ],
      ),
      game: [
        game(
          "Can I wear my swimsuit in the lounge?",
          "I am sorry, madam. The lounge dress code asks for day clothes.",
          "No swim clothes. Go change.",
          "Of course, madam. Nobody will say anything if you sit in the corner.",
          undefined,
          "Câu cuối tự bẻ quy định cho khách — khách khác sẽ thấy và hỏi. Câu đúng nói quy định nhẹ nhàng.",
        ),
      ],
    }),

    L(24, 2, "Because — the Real Reason", "Nêu lý do thật bằng 'because'", {
      vocabulary: [
        c("Because", "We check the guest list because the lounge is for club guests."),
        c("Policy", "Our club policy is on the card in your room."),
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
          "Why is there no free breakfast on this stay?",
          "Free breakfast has one benefit condition, madam: you have to stay two nights.",
          "Chỉ đúng điều kiện còn thiếu, không đổ lỗi cho khách.",
        ),
      ],
      reading: read(
        `Mrs Patel wants the suite for one Saturday night. Duc explains the two-night minimum at weekends and the real reason: demand is very high. Mrs Patel asks if it is just policy. Duc does not argue, and he does not change the rule. He offers what is possible: one weekday night. Mrs Patel books Wednesday.`,
        [
          {
            q: "Đức nêu lý do gì cho quy định ở tối thiểu hai đêm?",
            options: [
              "Vì đó là quy định của khách sạn",
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
          "Because rule. Two night.",
          "Because the manager likes it that way, madam. I do not really know why.",
          undefined,
          "Câu cuối không nêu lý do và làm khách sạn mất uy tín. Câu đúng nêu lý do thật: cuối tuần khách đặt rất đông.",
        ),
      ],
    }),

    L(24, 3, "Loyalty Rules", "Quy định hội viên", {
      vocabulary: [
        c("Points expiry rule", "Under the points expiry rule, points end after two years."),
        c("Tier renewal rule", "The tier renewal rule asks for twenty nights a year."),
        c("Membership tier rule", "The membership tier rule gives Gold members lounge breakfast."),
        c("Benefit transfer rule", "The benefit transfer rule says benefits stay with the member."),
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
        sp(
          "Can you just put the points back for me now?",
          t3c,
          "Điểm thưởng do bộ phận hội viên quyết. Hứa mốc trả lời, không hứa kết quả.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "Can my son use my Gold benefits when he stays alone?",
          "I am sorry, madam. Under the benefit transfer rule, benefits stay with the member.",
          "Từ chối nhẹ nhàng, nói rõ quy định nào.",
        ),
        sp(
          "How do I keep my Gold card next year?",
          "You have to stay twenty nights a year, sir. That is our tier renewal rule.",
          "Nói điều khách phải làm trước, tên quy định sau.",
        ),
      ],
      reading: read(
        `Mr Jensen's eight thousand points are gone. Tuan explains the points expiry rule: points end after two years without a stay. Mr Jensen says he stayed at a sister hotel last year. Tuan cannot change points himself, so he asks the loyalty office to check. On Friday, the loyalty office finds the stay and returns the points.`,
        [
          {
            q: "Vì sao điểm của ông Jensen bị mất?",
            options: [
              "Vì hai năm liền không có lượt lưu trú",
              "Vì ông đã đổi điểm lấy một đêm miễn phí",
              "Vì hệ thống của khách sạn bị lỗi tháng trước",
            ],
            correct: 0,
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
          "Points finish. Too long.",
          "The system sometimes deletes points, sir. It happens to everyone here.",
          undefined,
          "Câu cuối đổ cho hệ thống và làm khách mất lòng tin. Câu đúng nêu đúng quy định hết hạn điểm.",
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
          sp(
            "Hello, is Mr Ahmed staying at your hotel? I am his friend.",
            t4a,
            "Không nói có, không nói không. Câu này giữ an toàn cho khách.",
            undefined,
            ["confirm", "staying"],
          ),
        ),
        risk(
          sp(
            "But it is urgent. Just give me his room number.",
            t4b,
            "Dù gấp, số phòng vẫn là thông tin bảo mật. Nêu lý do: sự an toàn của khách.",
            undefined,
            ["room", "numbers", "confidential", "safety", "guests"],
            t4a,
          ),
        ),
        sp(
          "Then can you give him a message from me?",
          t4c,
          "Nhận lời nhắn mà vẫn không xác nhận khách có ở đây hay không.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "Why do I have to sign this form at check-in?",
          "We have to ask first, madam, because we keep your preferences on file.",
          "Lý do thật: khách sạn lưu sở thích của khách, nên phải hỏi trước.",
        ),
      ],
      reading: read(
        `A caller asks Hoa if Mr Ahmed is staying at the hotel. Hoa does not say yes, and she does not say no. She explains that room numbers are confidential, for the safety of guests. The caller says it is urgent. Hoa still confirms nothing. She takes the caller's name and number for a message.`,
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
            q: "Hoa giúp người gọi bằng cách nào?",
            options: [
              "Ghi tên và số điện thoại cho lời nhắn",
              "Cho số phòng vì người gọi nói là việc gấp",
              "Hẹn người gọi tới sảnh để gặp khách",
            ],
            correct: 0,
            explanation:
              "'She takes the caller's name and number for a message' — vẫn giúp được mà không lộ thông tin của khách.",
          },
        ],
      ),
      game: [
        game(
          "I am his wife. Just tell me which room he is in.",
          "I am sorry, madam. Room numbers are confidential.",
          "Room 1205. Go up.",
          "Of course, madam. If you are his wife, he is in room 1205 on the twelfth floor.",
          undefined,
          "Câu cuối tin lời người lạ và cho số phòng — không ai kiểm chứng được người đó là vợ khách. Câu đúng giữ bảo mật, lịch sự.",
        ),
      ],
    }),
  ];
}

// ── Week 25 — Promising a time you can keep ────────────────────────────
function week25(): LessonContent[] {
  const t1a = "I understand it is urgent, sir. I will call the taxi company straight away.";
  const t1b = "I will call you back personally within ten minutes, sir.";
  const t1c = "Of course, sir. I will call your room in ten minutes, with or without news.";
  const t2a = "Housekeeping is going to finish your room by three o'clock, madam.";
  const t2b = "You are welcome in the lounge, madam. I will reserve your lounge table now.";
  const t2c = "Yes, madam. I am going to escort you to your room at three.";
  const t3a = "Of course, sir. I will follow up with the kitchen and send you a message by five.";
  const t3b = "Then I will send you the menu choices by five, sir, and you can choose.";
  const t3c = "Thank you, sir. I will tell the chef now and note it in your profile.";
  const t4a = "I cannot confirm the upgrade myself, sir. The front office will call you by three.";
  const t4b = "I understand, sir. I will speak to the duty manager now.";
  const t4c = "I will come to the lounge with an answer in fifteen minutes, sir.";
  return [
    L(25, 1, "Within Ten Minutes", "Cam kết trong bao lâu", {
      vocabulary: [
        c("Within", "I will call you back within ten minutes."),
        c("Straight away", "I will call the taxi company straight away."),
        c("Call you back personally", "I will call you back personally within ten minutes."),
        c("Urgent", "This is urgent, so I will start on it straight away.", [
          "/ˈɜːdʒənt/",
          "Khẩn cấp",
          "⏰",
        ]),
      ],
      grammar: [
        g(
          "I call later.",
          "I will call you back personally within ten minutes, madam.",
          "Cam kết có mốc: 'within + số phút'. 'Later' hay 'soon' không phải lời hứa.",
          "I will call you back personal within ten minutes, madam.",
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
        sp(
          "My umbrella broke. Can I borrow one?",
          "Of course, madam. I will ask the bell desk to bring one straight away.",
          "Việc nhỏ khách cần ngay: nhận lời, làm ngay.",
        ),
        sp(
          "Could you find out if my restaurant booking for tonight is confirmed?",
          "Of course, madam. I will call you back within ten minutes.",
          "Hứa mốc gọi lại, không đoán kết quả.",
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
          "Car? Later I tell.",
          "I am sure it is booked, sir. Our concierge never forgets a car.",
          undefined,
          "Câu cuối đoán thay vì kiểm tra. Câu đúng nhận việc và hứa một mốc gọi lại cụ thể.",
        ),
      ],
    }),

    L(25, 2, "Going To — and By Three O'clock", "Kế hoạch — và mốc ba giờ", {
      vocabulary: [
        c("Going to", "We are going to prepare your room by three o'clock."),
        c("Check with the lounge", "I will check with the lounge and call you by two."),
        c("Reserve your lounge table", "I will reserve your lounge table for seven o'clock."),
        c("Escort you to your room", "I am going to escort you to your room at three."),
      ],
      grammar: [
        g(
          "Room later.",
          "Your room is going to be ready by three o'clock, madam.",
          "'be going to' cho kế hoạch đã sắp xếp; 'by three o'clock' = không muộn hơn ba giờ.",
          "Your room going to be ready by three o'clock, madam.",
        ),
        g(
          "Table seven, okay.",
          "I will reserve your lounge table for seven o'clock, sir.",
          "Sau 'will' là động từ nguyên mẫu. Giờ hẹn dùng 'for + giờ'.",
          "I will reserved your lounge table for seven o'clock, sir.",
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
          "Is the lounge free for a quiet meeting at four?",
          "I will check with the lounge and call you back by two, sir.",
          "Chưa biết thì hứa mốc gọi lại, không hứa thay phòng chờ.",
        ),
      ],
      reading: read(
        `The Moreau family arrives at eleven, but their suite is going to be ready by three o'clock. Vy reserves their lounge table so they can rest. At two, she checks with housekeeping, and the suite is on time. At three, Vy escorts the family to their room, as she promised.`,
        [
          {
            q: "Vy làm gì cho gia đình trong lúc chờ phòng?",
            options: [
              "Giữ một bàn trong phòng chờ cho gia đình",
              "Đổi cho gia đình một phòng khác đã sẵn sàng",
              "Mời gia đình đi dạo phố đến ba giờ chiều",
            ],
            correct: 0,
            explanation:
              "'Vy reserves their lounge table so they can rest' — đưa khách một việc làm được ngay trong lúc chờ.",
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
          "Room ready maybe later.",
          "Soon, sir. Our housekeeping team is always very fast in the afternoon.",
          undefined,
          "'Soon' không phải lời hứa: khách không biết chờ đến khi nào. Câu đúng có mốc: 'by three o'clock'.",
        ),
      ],
    }),

    L(25, 3, "Keeping the Guest Informed", "Báo cho khách biết tiến độ", {
      vocabulary: [
        c("Send you a message", "I will send you a message by five o'clock."),
        c("Follow up with the kitchen", "I will follow up with the kitchen about your dinner."),
        c("Note it in your profile", "With your consent, I will note it in your profile."),
        c("Update your guest file", "I am going to update your guest file today."),
      ],
      grammar: [
        g(
          "Kitchen, I ask.",
          "I will follow up with the kitchen and send you a message by five.",
          "Hai việc nối bằng 'and', cùng sau 'will', đều ở dạng gốc.",
          "I will follow up with the kitchen and sending you a message by five.",
        ),
        g(
          "I write it.",
          "I will note it in your profile, so we remember next time.",
          "'so' nối kết quả: ghi lại để lần sau nhớ. 'we' đi với động từ không thêm -s.",
          "I will note it in your profile, so we remembers next time.",
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
          "Thông tin mới: báo bếp ngay, và ghi lại cho lần sau.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "My home address has changed since my last stay.",
          "Thank you, madam. I am going to update your guest file today.",
          "Kế hoạch đã định: 'going to' + mốc hôm nay.",
        ),
      ],
      reading: read(
        `Mr Silva says his wife eats no meat, but she eats fish. Quan follows up with the kitchen and promises a message by five. At half past four, the chef sends two choices, and Quan sends Mr Silva a message. Mrs Silva signed the consent form at check-in, so Quan notes the fish in her profile.`,
        [
          {
            q: "Quân hứa báo cho khách lúc nào?",
            options: ["Trước năm giờ chiều", "Trước bữa sáng mai", "Ngay khi khách gọi"],
            correct: 0,
            explanation:
              "'promises a message by five' — và Quân gửi lúc bốn rưỡi, trước mốc đã hứa.",
          },
          {
            q: "Vì sao Quân được ghi món cá vào hồ sơ của bà Silva?",
            options: [
              "Vì bếp yêu cầu ghi lại mọi món ăn của khách",
              "Vì bà Silva đã ký phiếu đồng ý khi nhận phòng",
              "Vì ông Silva là hội viên hạng Vàng",
            ],
            correct: 1,
            explanation:
              "'Mrs Silva signed the consent form at check-in, so Quan notes the fish' — chỉ lưu sở thích khi khách đã đồng ý.",
          },
        ],
      ),
      game: [
        game(
          "Will somebody tell me what the kitchen says?",
          "Yes, madam. I will send you a message by five.",
          "Kitchen say, I tell, maybe.",
          "Please call the kitchen yourself, madam. Their number is on the room menu.",
          undefined,
          "Câu cuối đẩy việc sang khách. Câu đúng nhận việc báo tin, kèm mốc giờ.",
        ),
      ],
    }),

    L(25, 4, "Not Yours to Promise", "Khi lời hứa không thuộc về bạn", {
      vocabulary: [
        c("Confirm the upgrade", "Only the front office can confirm the upgrade."),
        c("Speak to the duty manager", "I will speak to the duty manager before six."),
        c("Arrange the transfer myself", "When a car is late, I arrange the transfer myself."),
        c("Bring your welcome gift", "I will bring your welcome gift to your room myself."),
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
          sp(
            "A receptionist said I might get an upgrade. Is it done?",
            t4a,
            "Nâng hạng do lễ tân xác nhận. Không tự hứa — nói ai gọi lại và lúc mấy giờ.",
            undefined,
            ["confirm", "upgrade", "myself", "front", "office"],
          ),
        ),
        sp(
          "Three is too late. I have a meeting at half past two.",
          t4b,
          "Mốc của khách sớm hơn: chuyển lên quản lý trực ngay, không tự hứa kết quả.",
          undefined,
          undefined,
          t4a,
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
          "I am very sorry, madam. I will arrange the transfer myself and call you in ten minutes.",
          "Xin lỗi, nhận việc về mình, kèm mốc gọi lại.",
        ),
        sp(
          "Is my welcome gift coming? You said four o'clock.",
          "I am very sorry, sir. I will bring your welcome gift myself within ten minutes.",
          "Trễ hẹn: xin lỗi, giữ ĐÚNG việc khách chờ, đưa mốc mới.",
        ),
      ],
      reading: read(
        `Mr Tanaka says a receptionist told him he might get an upgrade. Phuc cannot confirm the upgrade himself, so he says the front office will call by three. Mr Tanaka has a meeting at half past two. Phuc speaks to the duty manager at once, and the front office calls Mr Tanaka at two.`,
        [
          {
            q: "Vì sao Phúc không xác nhận việc nâng hạng?",
            options: [
              "Vì đó là việc lễ tân xác nhận",
              "Vì khách sạn đã hết phòng hạng cao",
              "Vì khách chưa đủ hạng hội viên",
            ],
            correct: 0,
            explanation:
              "'Phuc cannot confirm the upgrade himself' — nâng hạng là quyết định của lễ tân; GRO nói rõ ai gọi lại và khi nào.",
          },
          {
            q: "Phúc làm gì khi mốc ba giờ quá muộn với khách?",
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
          "The front office will confirm it by three, sir.",
          "Yes upgrade, no problem.",
          "Yes, sir, it is confirmed. I will tell the front office about it later.",
          undefined,
          "Câu cuối tự xác nhận việc của lễ tân — nếu lễ tân không có phòng, khách bị hứa suông. Câu đúng nói ai xác nhận và lúc nào.",
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
  const t1c = "Enjoy the pool, sir. I will leave a message on your room phone.";
  const t2a = "Of course, sir. I will ask the pastry chef to make it for eight o'clock.";
  const t2b = "Thank you, sir. I will note the allergy for the pastry chef now.";
  const t2c = "I will ask the executive chef to call you before six, sir.";
  const t3a = "I am so sorry, madam. I will ask the flower team to change them by noon.";
  const t3b = "Yes, madam. I have asked the flower team, and they are coming at noon.";
  const t3c = "I will also ask the housekeeping supervisor to send two pillows at noon.";
  const t4a = "Thank you, madam. I will stay with him and call security now.";
  const t4b = "Please do not take him away, madam. Security and the duty manager are on their way.";
  const t4c = "Thank you, madam. Security will check first, and then he can go to her.";
  return [
    L(26, 1, "Let Me Check With…", "Để tôi hỏi bộ phận…", {
      vocabulary: [
        c("Transfer", "I will transfer your call to the loyalty office."),
        c("Concierge desk", "The concierge desk books tours and show tickets."),
        c("Reservations team", "The reservations team can change your dates."),
        c("Loyalty office", "The loyalty office checks your points."),
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
        sp(
          "I want to stay two more nights. Can you change my booking?",
          t1a,
          "Việc của bộ phận đặt phòng: nhận lời, tự liên hệ, không bảo khách tự gọi.",
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
          "Nói rõ bộ phận phụ trách rồi tự chuyển máy.",
        ),
        sp(
          "Can you book us a cooking class for Saturday?",
          "Let me check with the concierge desk, sir. They book all our tours and classes.",
          "Một việc, đúng bàn phụ trách.",
        ),
        sp(
          "Who will meet us at the airport tomorrow?",
          "Our airport representative will meet you at arrivals with your name on a card.",
          "Nói đúng người đón và cách nhận ra nhau.",
        ),
      ],
      reading: read(
        `Mr Haddad wants two more nights. Lan does not change the booking herself. She checks with the reservations team, because they can see which rooms are available, and promises to call back within ten minutes. Mr Haddad goes to the pool, so Lan leaves a message on his room phone: the two nights are confirmed.`,
        [
          {
            q: "Vì sao Lan hỏi bộ phận đặt phòng?",
            options: [
              "Vì bộ phận đó thấy được phòng còn trống",
              "Vì khách yêu cầu nói chuyện với quản lý",
              "Vì máy tính ở quầy của Lan bị hỏng",
            ],
            correct: 0,
            explanation:
              "'because they can see which rooms are available' — đúng người làm thì câu trả lời mới đúng.",
          },
          {
            q: "Lan báo tin cho khách bằng cách nào?",
            options: [
              "Ra hồ bơi tìm khách để nói",
              "Để lời nhắn ở điện thoại trong phòng",
              "Nhờ nhân viên hồ bơi báo giúp",
            ],
            correct: 1,
            explanation:
              "'Lan leaves a message on his room phone' — khách đi vắng thì báo theo cách đã hẹn.",
          },
        ],
      ),
      game: [
        game(
          "I need two tickets for the water puppet show tonight.",
          "Let me check with the concierge desk for you, madam.",
          "Tickets? Concierge. Go there.",
          "I think that show is always full, madam. Maybe try another night.",
          undefined,
          "Câu cuối đoán và từ chối thay bộ phận khác. Câu đúng nhận việc và hỏi đúng bàn phụ trách.",
        ),
      ],
    }),

    L(26, 2, "I'll Ask Them To…", "Tôi sẽ nhờ họ…", {
      vocabulary: [
        c("Arrange", "I will arrange a birthday cake for eight o'clock."),
        c("Executive chef", "The executive chef plans the dinner menu."),
        c("Pastry chef", "The pastry chef makes our birthday cakes."),
        c("Allergy", "Please tell me about any allergy before we order the cake.", [
          "/ˈælədʒi/",
          "Dị ứng",
          "⚠️",
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
          sp(
            "She cannot eat nuts. It is a serious allergy.",
            t2b,
            "Dị ứng là chuyện an toàn: ghi lại và báo đúng người làm bánh ngay.",
            undefined,
            ["note", "allergy", "pastry", "chef"],
            t2a,
          ),
        ),
        sp(
          "Can the chef promise the cake is safe for her?",
          t2c,
          "Bạn không hứa thay bếp. Để bếp trưởng tự gọi giải thích, kèm mốc giờ.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "We would like a special dinner on the terrace tomorrow.",
          "I will ask the executive chef to plan a menu, madam, and call you by noon.",
          "Giao việc cho đúng người (bếp trưởng), rồi hứa mốc gọi lại.",
        ),
      ],
      reading: read(
        `Mr Rossi asks Tuan for a birthday cake for his wife at eight. Then he says she cannot eat nuts. Tuan notes the allergy for the pastry chef at once. Mr Rossi asks if the chef can promise the cake is safe. Tuan does not promise it himself. He asks the executive chef to call Mr Rossi before six.`,
        [
          {
            q: "Tuấn làm gì ngay khi biết khách bị dị ứng hạt?",
            options: [
              "Hủy đơn bánh để tránh rủi ro cho khách",
              "Khuyên khách đặt bánh ở tiệm bên ngoài",
              "Ghi lại dị ứng và báo thợ làm bánh",
            ],
            correct: 2,
            explanation:
              "'Tuan notes the allergy for the pastry chef at once' — thông tin an toàn đi tới đúng người làm, ngay lúc đó.",
          },
          {
            q: "Vì sao Tuấn không tự hứa bánh an toàn?",
            options: [
              "Vì chỉ bếp mới biết bánh làm thế nào",
              "Vì bánh chưa được đặt cọc trước",
              "Vì khách không tin lời nhân viên",
            ],
            correct: 0,
            explanation:
              "'He asks the executive chef to call Mr Rossi' — người làm món mới hứa được về món đó.",
          },
        ],
      ),
      game: [
        game(
          "My son has a nut allergy. Is the birthday cake all right for him?",
          "Thank you for telling me, madam. I will check with the pastry chef now.",
          "Cake no nuts, okay, eat.",
          "Of course, madam. All of our cakes are always safe for children.",
          undefined,
          "Câu cuối hứa điều bạn không biết chắc — về dị ứng, đó là rủi ro thật. Câu đúng hỏi lại đúng người làm bánh.",
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
          undefined,
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
          "Let me check with the lounge team, madam. They serve light food until ten.",
          "Hỏi đúng tổ đang phục vụ, rồi báo giờ.",
        ),
      ],
      reading: read(
        `Ms Clarke's anniversary flowers are old. Nam asks the flower team to change them by noon, and he tells Ms Clarke they are coming. She also needs two more pillows, so Nam asks the housekeeping supervisor. At noon, Nam checks the room himself: fresh flowers and two pillows. Then he calls Ms Clarke.`,
        [
          {
            q: "Nam nhờ ai mang thêm gối?",
            options: [
              "Tổ cắm hoa, khi họ lên thay hoa",
              "Tổ hành lý, cùng lúc mang túi lên",
              "Giám sát buồng phòng",
            ],
            correct: 2,
            explanation:
              "'Nam asks the housekeeping supervisor' — mỗi việc giao đúng tổ phụ trách việc đó.",
          },
          {
            q: "Nam làm gì lúc mười hai giờ?",
            options: ["Tự lên phòng kiểm tra", "Gọi tổ hoa hỏi lại", "Chờ khách gọi xuống báo"],
            correct: 0,
            explanation:
              "'At noon, Nam checks the room himself' — khép vòng là tự kiểm rồi mới báo khách.",
          },
        ],
      ),
      game: [
        game(
          "My mother needs a wheelchair at the lobby door.",
          "Of course, madam. I will ask the bell desk to bring one now.",
          "Wheelchair, wait. Somebody bring.",
          "We do not have one, madam. Maybe the pharmacy in the street has one.",
          undefined,
          "Câu cuối đẩy khách ra ngoài mà chưa hỏi bộ phận nào. Câu đúng giao việc cho đúng bàn và làm ngay.",
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
          sp(
            "There is a little boy alone near the lobby door. He is crying.",
            t4a,
            "Trẻ đi lạc: bạn Ở LẠI với em và gọi an ninh ngay.",
            undefined,
            ["stay", "security"],
          ),
        ),
        sp(
          "Should I take him to the police station myself?",
          t4b,
          "Không đưa em bé đi đâu. Giữ em tại chỗ — an ninh và quản lý trực đang tới.",
          undefined,
          ["take", "away", "security", "duty", "manager", "way"],
          t4a,
        ),
        sp(
          "His mother is here! She is running to us.",
          t4c,
          "Trả trẻ chỉ sau khi an ninh kiểm tra — kể cả khi trông rõ là mẹ em.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "My father uses a wheelchair. Can someone help him to the car?",
          "Of course, sir. I will ask the bell desk to give him assistance now.",
          "Một việc, đúng bàn, làm ngay.",
        ),
      ],
      reading: read(
        `A guest tells Thao that a little boy is alone near the lobby door. Thao stays with the boy and calls security. The guest wants to take the boy to the police, but Thao keeps him in the lobby. The duty manager arrives. When the mother comes, security checks first. Then the boy goes to her.`,
        [
          {
            q: "Thảo làm gì đầu tiên?",
            options: [
              "Ở lại với em bé và gọi an ninh",
              "Đưa em bé đi tìm mẹ quanh khách sạn",
              "Nhờ vị khách đưa em tới đồn cảnh sát",
            ],
            correct: 0,
            explanation:
              "'Thao stays with the boy and calls security' — giữ em tại chỗ, gọi đúng người, không tự đi tìm.",
          },
          {
            q: "Vì sao an ninh kiểm tra trước khi trả em bé cho người mẹ?",
            options: [
              "Vì người mẹ chưa trả tiền phòng",
              "Để chắc người nhận đúng là mẹ của em",
              "Vì quản lý trực muốn hỏi chuyện em bé",
            ],
            correct: 1,
            explanation:
              "'security checks first. Then the boy goes to her' — trao trẻ cho người chưa kiểm tra là rủi ro thật.",
          },
        ],
      ),
      game: [
        game(
          "A small girl is crying by the lift. I think she is lost.",
          "Thank you, sir. I will stay with her and call security now.",
          "Girl lost? Wait, mother come.",
          "Do not worry, sir. I will walk her around the hotel and find her parents.",
          undefined,
          "Câu cuối nghe tận tình nhưng đưa em bé đi khỏi chỗ cha mẹ sẽ quay lại tìm. Câu đúng ở lại với em và gọi an ninh.",
        ),
      ],
    }),
  ];
}

// ── Week 27 — Receiving a complaint: the problem, then the apology ──────
function week27(): LessonContent[] {
  const t1a =
    "I am very sorry that your name was wrong on the card, sir. I will print a new one now.";
  const t1b = "I am sorry nobody answered your request, sir. You should not have to ask twice.";
  const t1c = "I am sorry for that broken promise, sir. I will call you myself by five.";
  const t2a = "I am so sorry, madam. A forgotten birthday is a real disappointment for a family.";
  const t2b = "I am checking that now, madam. I will tell you what happened by six.";
  const t2c =
    "You are right, madam. I will report it to my manager today, so it does not happen again.";
  const t3a = "I am very sorry about the long wait, madam. What time did you arrive?";
  const t3b = "Thank you, that helps. I will report it to the front office manager today.";
  const t3c = "The front office manager will call you before noon tomorrow, madam.";
  const t4a = "I am calling first aid and the duty manager now. I will stay with you both.";
  const t4b = "Please wait for first aid, madam. They are on their way.";
  const t4c = "Thank you, madam. I will tell first aid about the nuts when they arrive.";
  return [
    L(27, 1, "Listen First, Then Apologise", "Nghe hết, rồi xin lỗi", {
      vocabulary: [
        c("Wrong name on the card", "Wrong name on the card is the first thing a VIP notices."),
        c("Ignored request", "An ignored request hurts more than a slow answer."),
        c("Broken promise", "A call that never comes is a broken promise for the guest."),
        c("Personalized", "A personalized welcome uses the guest's own name.", [
          "/ˈpɜːsənəlaɪzd/",
          "Được cá nhân hóa",
          "✨",
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
          "Xin lỗi đúng sự việc khách gặp, rồi sửa ngay.",
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
          "I understand, sir. Every welcome here should feel personalized, and yours did not.",
          "Công nhận cảm nhận của khách, không tranh luận.",
        ),
      ],
      reading: read(
        `Mr Lee's welcome card says Mr Leigh, his request for a quiet room got no answer, and a promised call never came. Khanh listens to all three problems without stopping him. She apologises for each one, prints a new card, and calls Mr Lee herself at five. She does not blame the colleague who forgot the call.`,
        [
          {
            q: "Khánh làm gì trước tiên?",
            options: [
              "Giải thích ai đã in sai tên khách",
              "Nghe khách kể hết cả ba vấn đề",
              "Đưa khách tấm thiệp mới ngay",
            ],
            correct: 1,
            explanation:
              "'listens to all three problems without stopping him' — nghe hết rồi mới xin lỗi và xử lý.",
          },
          {
            q: "Khánh nói gì về người đồng nghiệp quên gọi lại?",
            options: [
              "Không đổ lỗi cho người đồng nghiệp đó",
              "Nói tên người đó để khách biết ai sai",
              "Hứa sẽ báo quản lý phạt người đó",
            ],
            correct: 0,
            explanation:
              "'She does not blame the colleague who forgot the call' — trước mặt khách, việc của bạn là sửa, không phải tìm người có lỗi.",
          },
        ],
      ),
      game: [
        game(
          "My name is spelled wrong on the welcome card.",
          "I am very sorry, madam. I will print a new card now.",
          "Name wrong? No problem, small.",
          "That is the system's fault, madam. Someone at reservations typed it wrong.",
          undefined,
          "Câu cuối đổ lỗi cho hệ thống và đồng nghiệp trước mặt khách. Câu đúng xin lỗi và sửa ngay.",
        ),
      ],
    }),

    L(27, 2, "Sorry Is Not a Verdict", "Xin lỗi chưa phải là nhận lỗi", {
      vocabulary: [
        c("Forgotten birthday", "A forgotten birthday is a big disappointment for a family."),
        c("Late amenity delivery", "I am sorry about the late amenity delivery last night."),
        c("Lost preference note", "A lost preference note meant feather pillows again."),
        c("Preference", "Your preference for foam pillows is in your profile.", [
          "/ˈprefrəns/",
          "Sở thích, sự ưu tiên",
          "📝",
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
          "Công nhận khách đúng, báo lên quản lý để sửa từ gốc.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "The fruit basket came at eleven at night!",
          "I am sorry about the late amenity delivery, sir. I will find out what happened.",
          "Xin lỗi đúng sự việc, hứa tìm hiểu — không đoán nguyên nhân.",
        ),
        sp(
          "I asked for foam pillows again, and they are feather again.",
          "I am sorry your preference was missed again, sir. I will ask housekeeping to change them now.",
          "Lỗi lặp lại: xin lỗi cho cả lần này, rồi giao đúng tổ sửa ngay.",
        ),
      ],
      reading: read(
        `Mrs Okoye's daughter had a birthday yesterday, and nothing arrived. Thu apologises for what the family met. She does not say whose mistake it was, because nobody has checked yet. By six, Thu finds the cause: a preference note was lost between two shifts. She tells Mrs Okoye and reports it to her manager.`,
        [
          {
            q: "Vì sao Thu không nói ngay đó là lỗi của ai?",
            options: [
              "Vì khách sạn cấm nhân viên xin lỗi khách",
              "Vì Thu nghĩ khách quên báo ngày sinh nhật",
              "Vì lúc đó chưa ai kiểm tra nguyên nhân",
            ],
            correct: 2,
            explanation:
              "'because nobody has checked yet' — xin lỗi về điều khách gặp thì luôn đúng; kết luận lỗi phải chờ kiểm tra.",
          },
          {
            q: "Nguyên nhân thật là gì?",
            options: [
              "Ghi chú sở thích bị thất lạc giữa hai ca",
              "Bếp làm sai bánh sinh nhật của bé",
              "Khách đổi phòng mà không báo trước",
            ],
            correct: 0,
            explanation:
              "'a preference note was lost between two shifts' — lỗi quy trình, và chính quy trình là thứ quản lý cần sửa.",
          },
        ],
      ),
      game: [
        game(
          "Whose fault was it that my fruit basket came so late?",
          "I am finding out now, sir. I am sorry it was late.",
          "Not my fault. Kitchen fault.",
          "It was our mistake, sir. The new boy at the bell desk forgot all about it.",
          undefined,
          "Câu cuối kết luận lỗi khi chưa ai kiểm tra và nêu tên đồng nghiệp. Câu đúng xin lỗi và nói bạn đang tìm hiểu.",
        ),
      ],
    }),

    L(27, 3, "Getting the Facts", "Hỏi cho rõ sự việc", {
      vocabulary: [
        c("Long wait at check-in", "There was a long wait at check-in at three o'clock."),
        c("Crowded lounge", "A crowded lounge at six is common on Fridays."),
        c("Wrong points balance", "The loyalty office corrects a wrong points balance."),
        c("Replenish", "I will ask the lounge team to replenish the food.", [
          "/rɪˈplenɪʃ/",
          "Bổ sung thêm (đồ ăn/uống)",
          "🔄",
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
          "Lounge full, wait.",
          "I am sorry the lounge is so crowded tonight. I will find you a table.",
          "Xin lỗi về điều khách thấy, rồi làm ngay một việc. Sau 'will' động từ ở dạng gốc.",
          "I am sorry the lounge is so crowded tonight. I will found you a table.",
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
          "My points balance is wrong. It should be twelve thousand.",
          "I am sorry, sir. Which stay is missing from your balance?",
          "Hỏi một sự việc cụ thể trước khi chuyển cho bộ phận hội viên.",
        ),
        sp(
          "There is no food left in the lounge, and it is only half past six.",
          "I am sorry, madam. I will ask the lounge team to replenish the food now.",
          "Xin lỗi, giao đúng tổ, làm ngay.",
        ),
      ],
      reading: read(
        `Mrs Grant says she waited forty minutes at check-in. Bao apologises, then asks one question: what time did she arrive? About three, she says, and only one person was at the desk. That fact matters. Bao reports it to the front office manager, who now puts a second person at the desk at three.`,
        [
          {
            q: "Bảo hỏi khách điều gì?",
            options: ["Khách đến quầy lúc mấy giờ", "Khách đặt phòng qua đâu", "Khách ở mấy đêm"],
            correct: 0,
            explanation:
              "'asks one question: what time did she arrive?' — hỏi điều khách chưa nói, để tìm ra chỗ cần sửa.",
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
          "I am sorry, sir. I will find you a table now.",
          "Lounge full. Come later.",
          "Everyone comes at six, sir. You should come at five next time, when it is quiet.",
          undefined,
          "Câu cuối biến vấn đề thành lỗi của khách. Câu đúng xin lỗi và giải quyết ngay.",
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
          c("Refreshments", "Refreshments are served in the lounge all afternoon.", [
            "/rɪˈfreʃmənts/",
            "Đồ ăn nhẹ, thức uống giải khát",
            "🍰",
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
            sp(
              "My friend ate a canapé, and now she cannot breathe well!",
              t4a,
              "Gọi sơ cứu và quản lý trực NGAY, rồi ở lại. Không hỏi han dài.",
              undefined,
              ["calling", "first", "aid", "duty", "manager", "stay"],
            ),
          ),
          sp(
            "Should we give her some water?",
            t4b,
            "Bạn không quyết việc y tế. Chờ người sơ cứu — họ đang tới.",
            undefined,
            ["wait", "first", "aid", "way"],
            t4a,
          ),
          sp(
            "She has an allergy to nuts, I think.",
            t4c,
            "Thông tin quan trọng: chuyển cho người sơ cứu khi họ tới.",
            undefined,
            undefined,
            t4b,
          ),
          risk(
            sp(
              "A guest at the cocktail hour is drunk and shouting at the bar staff.",
              "Please call security and the duty manager now.",
              "Khách say gây rối: không tự ra đối đầu. Gọi an ninh và quản lý trực.",
              "colleague",
              ["security", "duty", "manager"],
            ),
          ),
          sp(
            "What refreshments are there in the lounge this afternoon?",
            "Refreshments are tea, coffee and small cakes until five, madam.",
            "Trả lời đủ món và giờ kết thúc.",
          ),
        ],
        reading: read(
          `During the cocktail hour, a guest's friend eats a canapé and cannot breathe well. Duc calls first aid and the duty manager at once, and he stays with them. The guest wants to give her friend water, but Duc asks her to wait for first aid. When first aid arrives, Duc tells them about the nuts.`,
          [
            {
              q: "Đức làm gì đầu tiên?",
              options: [
                "Gọi sơ cứu và quản lý trực",
                "Hỏi khách đã ăn món gì",
                "Đưa khách một cốc nước",
              ],
              correct: 0,
              explanation:
                "'Duc calls first aid and the duty manager at once' — với người khó thở, gọi người có chuyên môn là việc đầu tiên.",
            },
            {
              q: "Vì sao Đức nhờ khách chờ sơ cứu thay vì cho uống nước?",
              options: [
                "Vì nước trong phòng chờ đã hết",
                "Vì việc y tế để người sơ cứu quyết",
                "Vì quản lý trực chưa cho phép",
              ],
              correct: 1,
              explanation:
                "'Duc asks her to wait for first aid' — nhân viên không tự xử lý y tế; người có chuyên môn quyết định.",
            },
          ],
        ),
        game: [
          game(
            "A man at the bar is shouting and pushing the chairs over.",
            "Please call security and the duty manager now.",
            "Man crazy. I go there.",
            "I will go over and tell him to leave the hotel right now.",
            "colleague",
            "Câu cuối tự ra đối đầu một mình với người đang say — nguy hiểm cho bạn và khách khác. Câu đúng gọi an ninh và quản lý trực.",
          ),
        ],
      },
    ),
  ];
}

// ── Week 28 — "If you like, I can…": what is yours to offer ─────────────
function week28(): LessonContent[] {
  const t1a = "I am very sorry, madam. If you like, I can reprint the welcome card now.";
  const t1b = "Of course. If you prefer, I will put the new card in your room tonight.";
  const t1c = "Then the new card will be in your room by seven, madam.";
  const t2a = "I am sorry, sir. If you prefer, I will ask the front office about a quieter room.";
  const t2b = "I cannot move you to a suite myself, sir. I will ask the front office now.";
  const t2c = "Of course, sir. If you prefer, I can bring the manager to you now.";
  const t3a = "I am so sorry, madam. The flower team can finish it while you are at dinner.";
  const t3b = "If it is not ready by nine, please call me, and I will come up myself.";
  const t3c = "I understand, madam. I will ask my manager about a gesture for your anniversary.";
  const t4a =
    "I cannot offer a free night myself, sir. The duty manager will speak with you today.";
  const t4b = "If you like, I can check the availability of a quiet table for dinner tonight.";
  const t4c = "I cannot cancel the extra charge myself, sir. The duty manager will check it today.";
  return [
    L(28, 1, "If You Like, I Can…", "Nếu quý khách muốn, tôi có thể…", {
      vocabulary: [
        c("Reprint the welcome card", "If you like, I can reprint the welcome card now."),
        c("Option", "There are two options for the new card."),
        c("Either", "Either option is fine with us, madam."),
        c("Offer lounge access", "Only my manager can offer lounge access as a gesture."),
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
          "You can choose either option, sir: tonight or tomorrow morning.",
          "'either option' = một trong hai lựa chọn; 'either' đi với danh từ số ít.",
          "You can choose either options, sir: tonight or tomorrow morning.",
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
          "Khách không tiện — đưa lựa chọn thứ hai, vẫn để khách quyết.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Yes, tonight is better for us.",
          t1c,
          "Chốt lựa chọn của khách bằng một mốc giờ.",
          undefined,
          undefined,
          t1b,
        ),
        risk(
          sp(
            "After all this, can I at least use the club lounge for free?",
            "I cannot offer lounge access myself, madam. I will ask my manager today.",
            "Phòng chờ miễn phí là món có giá trị tiền: chỉ quản lý quyết. Bạn hỏi giúp, không tự hứa.",
            undefined,
            ["offer", "lounge", "access", "myself", "manager", "today"],
          ),
        ),
      ],
      reading: read(
        `The welcome card in Ms Novak's room still has the wrong name. Ngoc apologises and offers to reprint it now. Ms Novak is going out, so Ngoc gives a second option: the new card in the room by seven. Later, Ms Novak asks for free lounge access. Ngoc cannot offer that herself, so she asks her manager.`,
        [
          {
            q: "Ngọc đưa ra hai lựa chọn nào về tấm thiệp?",
            options: [
              "In lại ngay, hoặc để vào phòng trước bảy giờ",
              "In lại thiệp, hoặc tặng khách phòng chờ",
              "Gửi thiệp qua email, hoặc gọi điện xin lỗi khách",
            ],
            correct: 0,
            explanation:
              "'offers to reprint it now… a second option: the new card in the room by seven' — cả hai đều trong quyền của GRO.",
          },
          {
            q: "Vì sao Ngọc không tự mời khách dùng phòng chờ miễn phí?",
            options: [
              "Vì phòng chờ tối đó đã kín chỗ cho hội viên",
              "Vì đó là món có giá trị, quản lý quyết",
              "Vì khách không ở phòng tầng câu lạc bộ của khách sạn",
            ],
            correct: 1,
            explanation:
              "'Ngoc cannot offer that herself, so she asks her manager' — món có giá trị tiền đi qua người có quyền.",
          },
        ],
      ),
      game: [
        game(
          "Should we take the new card now or tonight?",
          "Either option is fine, madam. Which is easier for you?",
          "Now. Now better.",
          "Tonight, madam, because we are very busy at the desk right now.",
          undefined,
          "Câu cuối chọn theo sự tiện của nhân viên, không theo khách. Câu đúng để khách chọn.",
        ),
      ],
    }),

    L(28, 2, "Two Choices — and Who Decides", "Hai lựa chọn — và ai quyết", {
      vocabulary: [
        c("Move you to a suite", "The front office decides if we can move you to a suite."),
        c("Arrange a room upgrade", "Only the front office can arrange a room upgrade."),
        c(
          "Extend your late check-out",
          "The front office can extend your late check-out if rooms allow.",
        ),
        c("Bring the manager to you", "If you prefer, I can bring the manager to you now."),
      ],
      grammar: [
        g(
          "I move you suite.",
          "If you prefer, I will ask the front office to move you to a suite.",
          "Đổi hay nâng phòng do lễ tân quyết: 'ask + the front office + to + động từ'.",
          "If you prefer, I will ask the front office moving you to a suite.",
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
          "Đề nghị có điều kiện, và nói rõ ai quyết chuyện phòng.",
        ),
        risk(
          sp(
            "Just move me to a suite yourself. You can do that.",
            t2b,
            "Đổi phòng là quyết định của lễ tân. Từ chối gọn, rồi chuyển ngay.",
            undefined,
            ["move", "suite", "myself", "front", "office"],
            t2a,
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
          "Can I keep my room until four tomorrow afternoon?",
          "If the front office agrees, they can extend your late check-out, madam. I will ask them now.",
          "Trả phòng muộn do lễ tân quyết: nói điều kiện, rồi hỏi giúp.",
        ),
        sp(
          "It is our anniversary. Could you upgrade us?",
          "If you like, I can ask the front office to arrange a room upgrade, madam.",
          "Đề nghị hỏi giúp, không hứa kết quả.",
        ),
      ],
      reading: read(
        `Mr Ito cannot sleep because of the bar noise. Tien offers to ask the front office about a quieter room. Mr Ito tells her to move him to a suite herself. Tien explains that the front office decides room moves, and she calls them at once. When Mr Ito asks for the manager, she brings the manager to him.`,
        [
          {
            q: "Tiên đề nghị gì đầu tiên?",
            options: [
              "Tự chuyển khách sang phòng hạng sang ngay",
              "Hỏi lễ tân về một phòng yên tĩnh hơn",
              "Xin quầy bar tắt nhạc sớm hơn",
            ],
            correct: 1,
            explanation:
              "'offers to ask the front office about a quieter room' — đề nghị trong quyền của GRO: hỏi giúp, không tự đổi phòng.",
          },
          {
            q: "Ai quyết định đổi phòng?",
            options: ["Vị khách tự chọn", "Tiên, người đang xử lý", "Bộ phận lễ tân"],
            correct: 2,
            explanation: "'the front office decides room moves' — GRO chuyển lời, lễ tân quyết.",
          },
        ],
      ),
      game: [
        game(
          "You can see the suite is empty. Just put me in it.",
          "I am sorry, madam. I will ask the front office about it now.",
          "Okay, suite free, you go.",
          "Of course, madam. The suite is empty tonight, so I will give you the key myself.",
          undefined,
          "Câu cuối tự quyết đổi phòng — việc của lễ tân. Câu đúng chuyển ngay cho đúng người quyết.",
        ),
      ],
    }),

    L(28, 3, "Checking It Worked", "Kiểm tra giải pháp có hiệu quả", {
      vocabulary: [
        c("Deliver the amenity now", "The room is ready, so I will deliver the amenity now."),
        c("Repeat the set-up tomorrow", "If my manager agrees, we can repeat the set-up tomorrow."),
        c("Send a written apology", "My manager will send a written apology before you leave."),
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
          "If my manager agrees, we will repeat the set-up tomorrow.",
          "Việc có giá trị (làm lại trang trí) đi qua quản lý. 'my manager' số ít: 'agrees'.",
          "If my manager agree, we will repeat the set-up tomorrow.",
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
          "Một cử chỉ bù đắp có giá trị: hỏi quản lý, không tự hứa.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "Will anyone contact us after we go home?",
          "Yes, sir. Our post-stay follow-up will come by email within two days.",
          "Nói đúng cách liên hệ và mốc thời gian.",
        ),
        sp(
          "I want an apology from the hotel in writing.",
          "Of course, madam. I will ask my manager to send a written apology today.",
          "Thư xin lỗi do quản lý ký — bạn chuyển lời, kèm mốc.",
        ),
      ],
      reading: read(
        `Ms Dubois's anniversary set-up was not in the room. Lan apologises and asks the flower team to finish it during dinner. She asks Ms Dubois to call her if it is not ready by nine. At nine, Lan checks the room herself. The next morning, her manager agrees to repeat the set-up and sends a written apology.`,
        [
          {
            q: "Lan làm gì lúc chín giờ?",
            options: [
              "Gọi tổ cắm hoa hỏi đã xong chưa",
              "Chờ khách gọi xuống nếu có vấn đề",
              "Tự lên phòng kiểm tra",
            ],
            correct: 2,
            explanation:
              "'At nine, Lan checks the room herself' — kiểm tra giải pháp bằng mắt mình, không chờ khách phàn nàn lần nữa.",
          },
          {
            q: "Ai đồng ý làm lại phần trang trí?",
            options: ["Quản lý của Lan", "Tổ cắm hoa", "Chính Lan"],
            correct: 0,
            explanation:
              "'her manager agrees to repeat the set-up' — bù đắp có giá trị là quyết định của quản lý.",
          },
        ],
      ),
      game: [
        game(
          "What if the flowers are wrong again tomorrow?",
          "If anything is wrong, please call me, madam. I will come up myself.",
          "If wrong, you call.",
          "That will not happen again, madam. I can promise you that.",
          undefined,
          "Câu cuối hứa điều bạn không chắc. Câu đúng nói rõ khách làm gì và bạn làm gì nếu vấn đề quay lại.",
        ),
      ],
    }),

    L(28, 4, "When You Must Say No", "Khi phải từ chối", {
      vocabulary: [
        c("Cancel the extra charge", "Only the duty manager can cancel the extra charge."),
        c("Add the missing points", "The loyalty office will add the missing points this week."),
        c("Arrange a private dinner", "If the beach is free, we can arrange a private dinner."),
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
          sp(
            "This stay has been terrible. I expect a free night, at least.",
            t4a,
            "Đêm miễn phí là quyết định về tiền: không hứa, không từ chối thẳng — chuyển quản lý trực, kèm mốc.",
            undefined,
            ["offer", "free", "night", "myself", "duty", "manager", "today"],
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
        sp(
          "And the extra charge for the late car? I want it gone.",
          t4c,
          "Hủy phí cũng là quyết định về tiền: chuyển quản lý trực, nói khi nào có câu trả lời.",
          undefined,
          ["cancel", "extra", "charge", "myself", "duty", "manager", "today"],
          t4b,
        ),
        sp(
          "My points from last week are still missing.",
          "I will ask the loyalty office to check, sir. If they find the stay, they will add the missing points.",
          "Hứa việc bạn làm (hỏi), không hứa kết quả của bộ phận khác.",
        ),
        sp(
          "Can you arrange a private dinner on the beach for us?",
          "If the beach is free, I can arrange a private dinner, madam. I will check the availability now.",
          "Điều kiện thật trước, việc bạn làm ngay sau.",
        ),
      ],
      reading: read(
        `Mr Fischer says his stay was terrible and asks for a free night. Hai does not promise one. He says the duty manager will speak with Mr Fischer today. Then Hai offers what he can: a quiet table for dinner. Mr Fischer also wants the late-car charge cancelled. Hai cannot cancel it himself, so the duty manager checks it that afternoon.`,
        [
          {
            q: "Hải trả lời thế nào về đêm miễn phí?",
            options: [
              "Đồng ý tặng một đêm cho khách vui",
              "Không hứa, quản lý trực sẽ nói chuyện",
              "Nói khách sạn không bao giờ tặng đêm",
            ],
            correct: 1,
            explanation:
              "'Hai does not promise one. He says the duty manager will speak with Mr Fischer today' — không hứa, cũng không đóng cửa.",
          },
          {
            q: "Hải đưa ra việc gì trong quyền của mình?",
            options: [
              "Một bàn yên tĩnh cho bữa tối",
              "Hủy luôn khoản phí xe đón trễ",
              "Chuyển khách lên phòng hạng sang",
            ],
            correct: 0,
            explanation:
              "'Hai offers what he can: a quiet table for dinner' — hủy phí và nâng hạng là quyết định về tiền, của quản lý và lễ tân.",
          },
        ],
      ),
      game: [
        game(
          "Just cancel the charge. You work here, don't you?",
          "I cannot cancel it myself, sir. The duty manager will check it today.",
          "Okay, charge gone. No pay.",
          "Of course, sir. I will tell the front office to take it off right now.",
          undefined,
          "Câu cuối tự hứa hủy phí — vượt quyền. Câu đúng nói rõ ai quyết và khi nào.",
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
  const t3a = "Yes, two amenities have not been delivered yet. They go up at five.";
  const t3b = "Two, on the birthday calendar. The pastry chef has both cake orders.";
  const t3c = "Mrs Patel is first, but nothing is confirmed. Please do not tell her yet.";
  const t4a = "Yes, madam. She signed the consent form at check-in.";
  const t4b = "I added foam pillows and green tea to the guest preference file.";
  const t4c = "Her post-stay follow-up. I left a follow-up note for the morning team.";
  return [
    L(29, 1, "Handing Over the Shift", "Bàn giao ca", {
      vocabulary: [
        c("Shift", "My shift ends at three o'clock."),
        c("Update", "I updated the VIP arrival list at two."),
        c("VIP arrival list", "There are four names on the VIP arrival list tonight."),
        c("Departure schedule", "The departure schedule shows two early departures tomorrow."),
      ],
      grammar: [
        g(
          "Many thing.",
          "I updated the VIP arrival list at two. Mr Sato arrives at six.",
          "Bàn giao: việc ĐÃ làm (quá khứ đơn) + lịch sắp tới (hiện tại đơn).",
          "I update the VIP arrival list at two. Mr Sato arrives at six.",
        ),
        g(
          "Read list.",
          "Please check the departure schedule before you start your shift.",
          "Sau 'before' dùng hiện tại; 'you' không thêm -s.",
          "Please check the departure schedule before you starts your shift.",
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
          sp(
            "A man on the phone wants Mr Sato's arrival time. Can I tell him?",
            "No, guest arrival times are confidential. Please take a message for him.",
            "Giờ đến của khách là thông tin bảo mật — kể cả khi đồng nghiệp hỏi giúp người ngoài.",
            "colleague",
            ["guest", "arrival", "times", "confidential", "message"],
          ),
        ),
        sp(
          "How many guests are on the VIP arrival list tonight?",
          "Four guests, madam. Mr Sato is first, at six.",
          "Báo cấp trên: con số trước, người quan trọng nhất sau.",
          "manager",
        ),
      ],
      reading: read(
        `At three, Hoa hands over to Nam. She updated the VIP arrival list at two: Mr Sato arrives at six. The housekeeping supervisor checked his room at three. Two early departures are on the departure schedule. A caller asked for Mr Sato's arrival time, and Hoa only took a message.`,
        [
          {
            q: "Vì sao Hoa chỉ nhận lời nhắn khi người gọi hỏi giờ đến của ông Sato?",
            options: [
              "Vì giờ đến của khách là thông tin bảo mật",
              "Vì Hoa không biết ông Sato đến lúc mấy giờ",
              "Vì người gọi không nói rõ tên của mình",
            ],
            correct: 0,
            explanation:
              "'Hoa only took a message' — giờ đến của khách VIP không nói với người ngoài, kể cả qua điện thoại.",
          },
          {
            q: "Phòng của ông Sato được kiểm tra lúc mấy giờ?",
            options: ["Hai giờ", "Lúc sáu giờ", "Lúc ba giờ"],
            correct: 2,
            explanation:
              "'The housekeeping supervisor checked his room at three' — hai giờ là lúc cập nhật danh sách, sáu giờ là lúc khách đến.",
          },
        ],
      ),
      game: [
        game(
          "Before you leave, is there anything on the VIP list?",
          "Yes, Mr Sato arrives at six. I updated the list at two.",
          "VIP many. You look.",
          "Nothing special, I think. You can read the list later tonight.",
          "colleague",
          "Câu cuối bỏ sót khách VIP sắp đến — ca sau sẽ không kịp đón. Câu đúng nêu việc đã làm và việc sắp tới.",
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
          "Các bước đã làm, đúng thứ tự, quá khứ đơn.",
          "manager",
          undefined,
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
          "Mr Lee is angry about his card again. Where do I write that?",
          "Write it in the complaint log, and add it to his open recovery case.",
          "Phàn nàn vào sổ phàn nàn; vụ việc đang mở thì ghi tiếp vào đúng hồ sơ đó.",
          "colleague",
        ),
        sp(
          "Is the recovery case for Mr Lee closed now?",
          "Not yet, madam. It stays open until Mr Lee is happy with it.",
          "Vụ việc chỉ đóng khi khách hài lòng, không phải khi bạn làm xong.",
          "manager",
        ),
      ],
      reading: read(
        `At the cocktail hour, Vy was serving coffee when a guest suddenly felt dizzy. Vy called first aid and the duty manager and stayed with the guest. After first aid left, she wrote everything in the shift handover book, with the times. The next morning, her manager read it and called the guest.`,
        [
          {
            q: "Vy đang làm gì khi khách thấy chóng mặt?",
            options: ["Đang rót cà phê", "Đang bàn giao ca", "Đang in thiệp mới"],
            correct: 0,
            explanation:
              "'Vy was serving coffee when a guest suddenly felt dizzy' — quá khứ tiếp diễn kể việc đang làm thì sự việc xảy ra.",
          },
          {
            q: "Vì sao Vy ghi cả giờ vào sổ bàn giao?",
            options: [
              "Để quản lý tính giờ làm thêm cho Vy",
              "Để người đọc biết rõ việc gì xảy ra lúc nào",
              "Vì khách yêu cầu được xem sổ bàn giao",
            ],
            correct: 1,
            explanation:
              "'wrote everything in the shift handover book, with the times' — quản lý đọc và gọi lại khách mà không phải đoán.",
          },
        ],
      ),
      game: [
        game(
          "What were you doing when Mr Lee came back to the desk?",
          "I was printing his new card, madam.",
          "I print card. He come.",
          "Nothing much, madam. I was just checking my phone for a minute.",
          "manager",
          "Câu cuối thật thà nhưng kể một việc không nên làm khi trực quầy. Câu đúng dùng quá khứ tiếp diễn kể đúng việc đang làm.",
        ),
      ],
    }),

    L(29, 3, "Open Items", "Những việc còn mở", {
      vocabulary: [
        c("Yet", "The fruit basket for 1206 has not gone up yet."),
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
        sp(
          "And the upgrade waiting list?",
          t3c,
          "Đang chờ chưa phải là đã xác nhận — dặn ca sau đừng hứa với khách.",
          "colleague",
          undefined,
          t3b,
        ),
        sp(
          "Has Mrs Patel's upgrade been confirmed?",
          "No, madam. The front office will tell us by four.",
          "Báo cấp trên đúng tình trạng, kèm ai trả lời và lúc nào.",
          "manager",
        ),
      ],
      reading: read(
        `Before her break, Thu writes the open items for Quan. Two amenities have not been delivered yet; they go up at five. The birthday calendar shows two birthdays tomorrow, and the pastry chef has both orders. Mrs Patel is first on the upgrade waiting list, but nothing is confirmed, so nobody should tell her yet.`,
        [
          {
            q: "Vì sao chưa ai được báo bà Patel về việc nâng hạng?",
            options: [
              "Vì bà Patel sắp trả phòng",
              "Vì quản lý đang nghỉ phép",
              "Vì việc nâng hạng chưa được xác nhận",
            ],
            correct: 2,
            explanation:
              "'nothing is confirmed, so nobody should tell her yet' — báo khách khi chưa xác nhận là hứa suông.",
          },
          {
            q: "Ai đang lo hai chiếc bánh sinh nhật?",
            options: ["Tổ buồng phòng", "Thợ làm bánh", "Chính Thu"],
            correct: 1,
            explanation:
              "'the pastry chef has both orders' — bàn giao nói rõ việc đang nằm ở tay ai.",
          },
        ],
      ),
      game: [
        game(
          "Can I tell Mrs Patel that her upgrade is ready?",
          "Not yet. She is only on the waiting list.",
          "Yes upgrade, tell her.",
          "Yes, tell her now. The front office will probably say yes anyway.",
          "colleague",
          "Câu cuối hứa thay lễ tân dựa trên phỏng đoán. Câu đúng phân biệt rõ đang chờ với đã xác nhận.",
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
          "I left a follow-up note for the morning team about room 1206.",
          "Quá khứ của 'leave' là 'left' (bất quy tắc).",
          "I leaved a follow-up note for the morning team about room 1206.",
        ),
      ],
      speaking: [
        sp(
          "Did Mrs Ford agree to keep her preferences on file?",
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
          "Việc còn mở + bạn đã để lại ghi chú cho ai.",
          "manager",
          undefined,
          t4b,
        ),
        sp(
          "Who is working in the lounge tonight?",
          "Check the lounge duty roster. Tuan and Ngoc are there until ten.",
          "Chỉ đúng chỗ tra, rồi trả lời luôn.",
          "colleague",
        ),
        sp(
          "Is everything ready for the anniversary in 1508?",
          "Yes, I checked the set-up checklist at four: flowers, cake and card.",
          "Đã kiểm gì, lúc nào, kết quả.",
          "colleague",
        ),
      ],
      reading: read(
        `Mrs Ford signed the consent form at check-in, so Lan added her foam pillows and green tea to the guest preference file. Her post-stay follow-up is still open, so Lan left a follow-up note for the morning team. She wrote no guest details on the lounge duty roster, because the roster hangs on the staff wall.`,
        [
          {
            q: "Vì sao Lan được ghi sở thích của bà Ford vào hồ sơ?",
            options: [
              "Vì bà Ford đã ký phiếu đồng ý",
              "Vì bà Ford là khách quen lâu năm",
              "Vì quản lý yêu cầu ghi mọi sở thích",
            ],
            correct: 0,
            explanation:
              "'Mrs Ford signed the consent form at check-in, so Lan added…' — có đồng ý mới lưu.",
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
          "Tea? I remember. No write.",
          "On the lounge duty roster, madam, so every colleague can see it easily.",
          "manager",
          "Câu cuối để thông tin khách ở nơi ai cũng đọc được. Câu đúng: đúng hồ sơ, có sự đồng ý của khách.",
        ),
      ],
    }),
  ];
}

// ── Week 30 — Checkpoint: putting it together ───────────────────────────
function week30(): LessonContent[] {
  const t1a = "I am sorry, madam. I recommend a firmer pillow from our pillow menu.";
  const t1b = "Of course. I will ask housekeeping to bring it within twenty minutes, madam.";
  const t1c =
    "I will pass your upgrade request to the front office, madam. They will call you by four.";
  const t2a = "I am sorry, sir. Guest arrival times are confidential.";
  const t2b = "I cannot confirm who is staying with us, sir.";
  const t2c = "You are welcome in the lobby, sir. I will let the duty manager know you are here.";
  const t3a = "I am very sorry, sir. I will check the guest name spelling with you now.";
  const t3b =
    "You are right, sir. I will print the new card myself and bring it within ten minutes.";
  const t3c = "I understand, sir. I will ask my manager to call you today.";
  const t4a = "Do not move her. I am calling first aid and the duty manager now.";
  const t4b = "Please ask him to wait for first aid. I will stay with them.";
  const t4c = "I will write the incident in the shift handover book now, with the times.";
  return [
    L(30, 1, "Recommend and Promise", "Gợi ý và cam kết", {
      vocabulary: [
        c("Review", "Please review the VIP arrival list before every shift."),
        c("Pillow menu", "Our pillow menu has a firmer pillow for a bad neck."),
        c("Upgrade request", "I passed your upgrade request to the front office."),
        c("Lounge booking", "Your lounge booking is for seven o'clock."),
      ],
      grammar: [
        g(
          "Pillow, I bring.",
          "I recommend a firmer pillow from our pillow menu, madam.",
          "Tuần 23: gợi ý + so sánh hơn. firm → firmer, không dùng 'more' với tính từ ngắn.",
          "I recommend a more firmer pillow from our pillow menu, madam.",
        ),
        g(
          "Upgrade, okay.",
          "I am going to pass your upgrade request to the front office now.",
          "Tuần 25–26: 'be going to' cần 'am'; chuyển yêu cầu cho đúng người quyết.",
          "I going to pass your upgrade request to the front office now.",
        ),
      ],
      speaking: [
        sp(
          "I slept badly. The pillow is too soft for me.",
          t1a,
          "Tuần 23: xin lỗi về điều khách gặp, gợi ý một món cụ thể.",
        ),
        sp(
          "Can I have it before my nap at two?",
          t1b,
          "Tuần 25: lời hứa có mốc bằng số phút, và đúng người mang lên.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Can you also upgrade our room for tomorrow?",
          t1c,
          "Tuần 26: chuyển đúng người quyết, kèm mốc gọi lại — không tự hứa nâng hạng.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "Can you book the lounge for me and my business partner at seven?",
          "Yes, sir. Your lounge booking is for two people at seven o'clock.",
          "Nhắc lại đủ: bao nhiêu người, mấy giờ.",
        ),
        sp(
          "I am new here. What should I read before my first shift?",
          "Please review the VIP arrival list and the open recovery cases before you start.",
          "Nói với đồng nghiệp mới: chỉ đúng chỗ cần đọc trước ca.",
          "colleague",
        ),
      ],
      reading: read(
        `Mrs Ward slept badly because her pillow was too soft. Ngan recommends a firmer pillow from the pillow menu and asks housekeeping to bring it within twenty minutes. Mrs Ward also asks for an upgrade. Ngan does not promise it. She passes the upgrade request to the front office, and they call Mrs Ward at four.`,
        [
          {
            q: "Ngân làm gì với yêu cầu nâng hạng?",
            options: [
              "Tự xác nhận nâng hạng cho khách",
              "Chuyển yêu cầu cho lễ tân",
              "Nói khách sạn đã hết phòng",
            ],
            correct: 1,
            explanation:
              "'She passes the upgrade request to the front office' — GRO không hứa nâng hạng; lễ tân quyết và gọi lại.",
          },
          {
            q: "Gối mới được mang lên trong bao lâu?",
            options: ["Trước bốn giờ chiều", "Ngay sáng hôm sau", "Trong vòng hai mươi phút"],
            correct: 2,
            explanation:
              "'bring it within twenty minutes' — lời hứa có mốc bằng số. Bốn giờ là lúc lễ tân gọi về việc nâng hạng.",
          },
        ],
      ),
      game: [
        game(
          "My neck is stiff. Do you have anything better than this pillow?",
          "Our pillow menu has a firmer one, madam. Shall I send it up?",
          "Pillow yes, I bring later.",
          "All our pillows are the same, madam, I am afraid. You will get used to it.",
          undefined,
          "Câu cuối không giúp gì và bắt khách chịu đựng. Câu đúng gợi ý đúng nhu cầu và hỏi khách có muốn không.",
        ),
      ],
    }),

    L(30, 2, "Explain, and Keep Guests Private", "Giải thích, và giữ bảo mật cho khách", {
      vocabulary: [
        c("Arrival time", "A guest's arrival time is never given to callers."),
        c("Transfer time", "Your transfer time is half past five tomorrow morning."),
        c("Tier level", "Your tier level decides your lounge benefits."),
        c("Cake message", "The pastry chef writes the cake message in chocolate."),
      ],
      grammar: [
        g(
          "Car early because.",
          "Your transfer time is half past five, because the airport road is busy.",
          "Tuần 24: 'because' + mệnh đề nêu lý do thật; 'because of' chỉ đi với danh từ.",
          "Your transfer time is half past five, because of the airport road is busy.",
        ),
        g(
          "Cake? Write what?",
          "Could you spell the cake message for me, please?",
          "Sau 'Could you' là động từ nguyên mẫu. Đánh vần lại để thợ bánh viết đúng.",
          "Could you spelling the cake message for me, please?",
        ),
      ],
      speaking: [
        risk(
          sp(
            "I am a reporter. What time does the minister arrive today?",
            t2a,
            "Giờ đến của khách là thông tin bảo mật — với bất kỳ người ngoài nào.",
            undefined,
            ["guest", "arrival", "times", "confidential"],
          ),
        ),
        sp(
          "Just tell me if he is staying here, then.",
          t2b,
          "Không nói có, không nói không. Câu này bảo vệ khách.",
          undefined,
          ["confirm", "staying"],
          t2a,
        ),
        sp(
          "Then I will wait in your lobby all day.",
          t2c,
          "Sảnh là nơi công cộng — lịch sự, nhưng báo quản lý trực có người lạ đang chờ khách VIP.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "Why is my car at half past five? My flight is at nine.",
          "Your transfer time is half past five, madam, because the airport road is busy.",
          "Tuần 24: lý do thật, khách hiểu được.",
        ),
        sp(
          "Why can I not have dinner in the lounge?",
          "Your tier level includes breakfast and evening drinks, sir, but not dinner.",
          "Nói điều khách CÓ trước, điều không có sau.",
        ),
        sp(
          "Please write Happy Birthday, Anna on the cake for tonight.",
          "Of course, madam. I will give the cake message to the pastry chef now.",
          "Tuần 26: một việc, đúng người làm, làm ngay.",
        ),
      ],
      reading: read(
        `A man says he is a reporter and asks Duc when the minister arrives. Duc says guest arrival times are confidential. The man asks if the minister is staying at the hotel. Duc does not confirm anything. The man decides to wait in the lobby, so Duc tells the duty manager.`,
        [
          {
            q: "Đức trả lời thế nào về giờ đến của vị bộ trưởng?",
            options: [
              "Nói đó là thông tin bảo mật",
              "Nói vị bộ trưởng đến buổi chiều",
              "Hẹn phóng viên gọi lại vào ngày mai",
            ],
            correct: 0,
            explanation:
              "'Duc says guest arrival times are confidential' — không nói giờ, không nói có hay không.",
          },
          {
            q: "Vì sao Đức báo quản lý trực?",
            options: [
              "Vì phóng viên đòi gặp quản lý để phỏng vấn",
              "Vì người lạ đang chờ khách VIP ở sảnh",
              "Vì Đức lỡ nói giờ đến cho người lạ",
            ],
            correct: 1,
            explanation:
              "'The man decides to wait in the lobby, so Duc tells the duty manager' — an toàn của khách VIP là việc quản lý trực phải biết.",
          },
        ],
      ),
      game: [
        game(
          "Which room is the minister in? I have a gift for him.",
          "I am sorry, sir. The front office can take the gift for our guests.",
          "Room 1801. Go up.",
          "He is in the suite on the top floor, sir. The lift is on your left.",
          undefined,
          "Câu cuối cho người lạ biết khách ở đâu. Câu đúng giữ bảo mật mà vẫn nhận giúp món quà qua lễ tân.",
        ),
      ],
    }),

    L(30, 3, "Apologise and Solve", "Xin lỗi và giải quyết", {
      vocabulary: [
        c("Guest name spelling", "Please check the guest name spelling before you print a card."),
        c("Apology letter", "My manager will sign the apology letter today."),
        c("Recovery plan", "Our recovery plan for Mr Lee has three steps."),
        c("Guest satisfaction score", "The guest satisfaction score went up this week.", [
          "/ɡest ˌsætɪsˈfækʃn skɔː/",
          "Điểm hài lòng của khách",
          "📊",
        ]),
      ],
      grammar: [
        g(
          "Sorry. Name again.",
          "I am very sorry your name was spelled wrong again, sir.",
          "Tuần 27: xin lỗi đúng điều khách gặp. Bị động: 'was spelled', cần -ed.",
          "I am very sorry your name was spell wrong again, sir.",
        ),
        g(
          "Manager write letter.",
          "If you like, my manager will send you an apology letter today.",
          "Tuần 28: đề nghị có điều kiện; thư xin lỗi do quản lý gửi. Sau 'will' là động từ nguyên mẫu.",
          "If you like, my manager will sends you an apology letter today.",
        ),
      ],
      speaking: [
        sp(
          "You spelled my name wrong again on the new card!",
          t3a,
          "Tuần 27: xin lỗi, rồi kiểm tra cùng khách thay vì đoán lại.",
        ),
        sp(
          "It is L-E-E. Three letters. How hard is that?",
          t3b,
          "Công nhận khách đúng, nhận việc về mình, mốc bằng số phút.",
          undefined,
          undefined,
          t3a,
        ),
        risk(
          sp(
            "And I want more than a new card this time.",
            t3c,
            "Bù đắp có giá trị là quyết định của quản lý. Không tự hứa quà — hẹn quản lý gọi.",
            undefined,
            ["understand", "manager", "today"],
            t3b,
          ),
        ),
        sp(
          "What is the recovery plan for Mr Lee?",
          "A new card today, an apology letter from you, and a note in his file.",
          "Báo cấp trên: ba bước, ngắn gọn.",
          "manager",
        ),
        sp(
          "How was our guest satisfaction score this week?",
          "It went up, madam, but two comments were about long waits at check-in.",
          "Báo cấp trên: kết quả, rồi điều còn cần sửa.",
          "manager",
        ),
      ],
      reading: read(
        `Mr Lee's name is spelled wrong for the second time. Phuong apologises, checks the guest name spelling with him, and brings a new card within ten minutes. Mr Lee wants more than a card. Phuong does not promise a gift herself. Her manager calls Mr Lee that day and sends an apology letter.`,
        [
          {
            q: "Phương làm gì trước khi in lại thiệp?",
            options: [
              "Kiểm tra cách viết tên cùng khách",
              "Hỏi đồng nghiệp ai in sai lần trước",
              "Xin quản lý cho phép in lại thiệp",
            ],
            correct: 0,
            explanation:
              "'checks the guest name spelling with him' — lần thứ hai thì kiểm tra cùng khách, không đoán nữa.",
          },
          {
            q: "Ai quyết định bù đắp thêm cho khách?",
            options: ["Phương, ngay tại quầy", "Chính vị khách", "Quản lý của Phương"],
            correct: 2,
            explanation:
              "'Phuong does not promise a gift herself. Her manager calls Mr Lee' — món có giá trị đi qua quản lý.",
          },
        ],
      ),
      game: [
        game(
          "Is a new card all I get for this?",
          "I understand, sir. My manager will call you today.",
          "Card is enough. Okay?",
          "Of course not, sir. I will give you a free dinner tonight for all the trouble.",
          undefined,
          "Câu cuối tự hứa một món có giá trị tiền — vượt quyền GRO. Câu đúng chuyển quản lý, kèm mốc.",
        ),
      ],
    }),

    L(30, 4, "End of Phase Three", "Kết thúc giai đoạn ba", {
      vocabulary: [
        c("Confident", "I feel confident with VIP guests now."),
        c("Room preference", "His room preference is a high floor away from the lift."),
        c("Anniversary date", "We keep the anniversary date only with the guest's consent."),
        c("Benefit list", "The benefit list for Gold members is on the lounge card."),
      ],
      grammar: [
        g(
          "Know everything now.",
          "I feel confident now, and I still ask my manager when I am unsure.",
          "'feel + tính từ': confident (tính từ), không phải confidence (danh từ).",
          "I feel confidence now, and I still ask my manager when I am unsure.",
        ),
        g(
          "Floor high, he like.",
          "His room preference is a high floor, away from the lift.",
          "'His room preference' số ít đi với 'is'.",
          "His room preference are a high floor, away from the lift.",
        ),
      ],
      speaking: [
        risk(
          sp(
            "A guest fell on the lobby steps, and her arm hurts.",
            t4a,
            "Người bị ngã: không di chuyển, gọi sơ cứu và quản lý trực NGAY.",
            "colleague",
            ["move", "calling", "first", "aid", "duty", "manager"],
          ),
        ),
        sp(
          "Her husband wants to drive her to the hospital himself.",
          t4b,
          "Việc y tế để người sơ cứu quyết. Bạn ở lại với gia đình.",
          "colleague",
          undefined,
          t4a,
        ),
        sp(
          "First aid is here now. What next?",
          t4c,
          "Tuần 29: ghi sự việc vào sổ bàn giao, có giờ.",
          "colleague",
          undefined,
          t4b,
        ),
        sp(
          "Do you feel confident with VIP guests now?",
          "Yes, madam. I feel confident, and I still ask you when a decision is not mine.",
          "Tự tin nhưng biết giới hạn của mình — câu chốt giai đoạn ba.",
          "manager",
        ),
        sp(
          "Do you remember our anniversary date?",
          "Yes, madam. It is the fourteenth of May, and it is in your file with your consent.",
          "Nhớ ngày của khách — và nói rõ thông tin được lưu khi khách đồng ý.",
        ),
        sp(
          "Which of my benefits can my wife use too?",
          "Your benefit list is on the lounge card, sir. Your wife can use the lounge with you.",
          "Chỉ chỗ khách tự xem, rồi trả lời đúng điều khách hỏi.",
        ),
      ],
      reading: read(
        `A guest falls on the lobby steps and hurts her arm. Kim Anh tells her colleague not to move the guest, and she calls first aid and the duty manager. The guest's husband wants to drive her to hospital, but Kim Anh asks him to wait. When first aid arrives, she writes the incident in the shift handover book.`,
        [
          {
            q: "Vì sao Kim Anh dặn đồng nghiệp không di chuyển khách?",
            options: [
              "Vì sảnh đang đông khách đi lại",
              "Vì quản lý trực chưa cho phép",
              "Vì người bị ngã có thể bị thương nặng hơn",
            ],
            correct: 2,
            explanation:
              "'tells her colleague not to move the guest' — di chuyển người bị thương có thể làm nặng thêm; người sơ cứu quyết.",
          },
          {
            q: "Kim Anh làm gì sau khi người sơ cứu tới?",
            options: [
              "Ghi sự việc vào sổ bàn giao ca",
              "Tự lái xe đưa khách đi bệnh viện",
              "Gọi điện cho người nhà của khách",
            ],
            correct: 0,
            explanation:
              "'she writes the incident in the shift handover book' — ca sau và quản lý biết chính xác chuyện gì đã xảy ra.",
          },
        ],
      ),
      game: [
        game(
          "A lady slipped by the pool door. Should we help her stand up?",
          "No, do not move her. I am calling first aid now.",
          "Yes, up, up. Quick.",
          "Yes, let us help her to a chair, so she is more comfortable.",
          "colleague",
          "Câu cuối nghe tử tế nhưng di chuyển người vừa ngã. Câu đúng giữ nguyên tư thế và gọi sơ cứu ngay.",
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
