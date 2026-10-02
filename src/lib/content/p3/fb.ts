// ============================================================
// FOOD & BEVERAGE — PHASE 3 (weeks 23-30), written for the department.
//
// The old weeks were one set of frames reading the F&B bank by slot index,
// and the frames knew a part of speech, never a meaning: a "for a family, I
// recommend …" slot printed "the aged steak"; a "for a long stay" slot
// printed "the seafood platter"; the refusal frame answered "Can you remove
// this charge?" with "the last order time applies here". Worse, the waiter
// was taught to own money: "I can remove it from the bill straight away",
// "We can take off the service charge if it happens again". The must-be-right
// oral turn was picked by substring, so it landed on "check with the kitchen
// within ten minutes" and on a handover line that says "allergy note", never
// on alcohol, a reaction at the table or a refund. Week 29 was labelled as a
// guest talking. So, for a waiter, bartender or room-service order taker:
//
//  · F&B RECOMMENDS and explains a dish only as far as the kitchen has
//    confirmed it. Whether a dish is free of nuts, gluten or shellfish, halal
//    or vegetarian is the chef's answer, never a guess: "I will check with
//    the chef before you order."
//  · Alcohol: no ID, no alcohol for a guest who looks under eighteen; no more
//    alcohol for a guest who has had too much — water or coffee instead, and
//    the bar manager is called. The guest is never called drunk.
//  · A waiter may apologise and replace within service standards: a dish made
//    again, a fresh one, a different drink; a wine that tastes wrong goes to
//    the sommelier. A dish a guest sent back is never simply reheated. A
//    waiter may NOT change a bill, give a discount, take off a charge, offer
//    anything complimentary or approve a refund. That is the restaurant
//    manager's, said plainly: "I cannot remove it from the bill, sir. I will
//    ask my manager to come."
//  · A time is promised for what the waiter controls ("I will be back within
//    five minutes"); a kitchen time is passed on as the kitchen's ("The
//    kitchen says fifteen minutes"). A new steak is fifteen minutes,
//    everywhere in the phase.
//  · An apology is for what the guest met. Nobody says "It was our mistake"
//    or blames the kitchen before anyone has checked; a guest who feels sick
//    is offered first aid, the manager comes, and the plate goes to the
//    manager, not the bin.
//  · Safety turns first: a reaction or choking at the table, hot soup on a
//    guest, a fall on a wet floor, a child alone at the hot buffet station —
//    first aid and the manager are called before anything else, and nobody
//    treats the guest.
//  · Week 29 is talk between servers and to the outlet supervisor (table
//    status, open items, tonight's allergy notes), and is labelled so. A
//    report to the manager says what the server did, not "I called you".
//
// The turns that carry those decisions are marked `risk`: they are the pool
// the checkpoint's must-be-right draw comes from, and each carries the other
// wordings the course accepts (`alsoAccept`): "my manager" for "the
// manager", the clause the other way round, the line weeks 1-22 taught for
// the same moment. Cards keep the reviewed F&B bank entries where Phase 4
// recycles them; a card whose word was already taught, or that only glued
// known words together, gave way to a word of the trade (legal drinking age,
// allergen, corked, medium rare, complimentary, walk-in…).
// ============================================================
import type { LessonContent, SpeakingItem } from "../week-content";
import { game, g, read, sp } from "../phase0";
import { cardsFor, lessonsFor, risk } from "./kit";

const c = cardsFor("FB");
const L = lessonsFor("FB");
/** The turn plus the other wordings the course accepts for it. */
const also = (s: SpeakingItem, alts: string[]): SpeakingItem => ({ ...s, alsoAccept: alts });

// ── Week 23 — Recommending a dish, a table, a drink ─────────────────────
function week23(): LessonContent[] {
  const t1a = "I recommend the tasting menu, madam. It has five small courses from our chef.";
  const t1b = "Not at all. The courses are small, so it is lighter than it sounds.";
  const t1c = "I recommend the wine pairing, madam. You get one small glass with each course.";
  const t2a = "I recommend the sunset view table, sir. It is more romantic than the main room.";
  const t2b = "It is quieter than inside, sir. There are only six tables on the terrace.";
  const t2c = "Of course, sir. I will book it with the host for eight o'clock.";
  const t3a = "For four people, I recommend the seafood platter, madam. It is good for sharing.";
  const t3b = "Thank you, madam. I will check with the chef before you order.";
  const t3c = "No, madam. I will come back with the answer before you choose.";
  const t4a = "I recommend our signature cocktail, madam. It is made with Vietnamese coffee.";
  const t4b = "Then I recommend the cocktail of the day instead. It is mango and lime.";
  const t4c = "Of course, madam. Would you like still or sparkling water?";
  return [
    L(23, 1, "I Recommend…", "Tôi xin gợi ý…", {
      vocabulary: [
        c("Recommend", "Tonight I recommend the tasting menu, madam."),
        c("Instead", "Would you like some fresh juice instead of wine?"),
        c("Tasting menu", "The tasting menu has five small courses from our chef."),
        c("Wine pairing", "The wine pairing gives you one small glass with each course."),
      ],
      grammar: [
        g(
          "You eat this one.",
          "I recommend the tasting menu tonight, madam.",
          "Gợi ý bằng 'I recommend + the + món'. Không chen 'you' vào giữa. Khách vẫn là người chọn.",
          "I recommend you the tasting menu tonight, madam.",
        ),
        g(
          "Wine also, you want?",
          "Would you like the wine pairing with it, sir?",
          "'Would you like…?' là lời mời lịch sự. 'Do you like…?' là hỏi sở thích, không phải lời mời.",
          "Do you like the wine pairing with it, sir?",
        ),
      ],
      speaking: [
        sp(
          "It is our first night here. What do you suggest?",
          t1a,
          "Gợi ý MỘT món cụ thể bằng 'I recommend', rồi nói một điều về món đó.",
        ),
        sp(
          "Five courses? Is that too much food for me?",
          t1b,
          "Trả lời đúng điều khách lo (nhiều quá), bằng một câu so sánh hơn.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "And what about wine?",
          t1c,
          "Gợi ý thêm một món đi kèm, vẫn bằng 'I recommend', và nói rõ khách nhận được gì.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "I do not drink alcohol, I am afraid.",
          "Of course, madam. I recommend our fresh juice instead.",
          "Khách không uống rượu: không thuyết phục, đưa ngay món thay thế bằng 'instead'.",
        ),
        sp(
          "We have a show at nine, so we do not have much time.",
          "Then I recommend one main course instead, sir. It is quicker.",
          "Gợi ý theo hoàn cảnh của khách (ít thời gian), không theo món đắt nhất.",
        ),
        risk(
          also(
            sp(
              "My wife is pregnant. Is the tasting menu all right for her?",
              "I will check with the chef before you order, sir.",
              "Khách mang thai: bạn không tự nói món nào ăn được. Hỏi bếp trước khi khách gọi món.",
              undefined,
              ["check", "chef", "before", "order"],
            ),
            ["Let me check with the chef before you order, sir."],
          ),
        ),
      ],
      reading: read(
        `Mr and Mrs Grant are in the restaurant for their first night. Thu listens before she recommends anything. They want to try local food, so she recommends the tasting menu: five small courses from the chef. Mr Grant does not drink alcohol, so Thu offers him fresh juice instead of the wine pairing. Mrs Grant takes the wine pairing.`,
        [
          {
            q: "Vì sao Thu gợi ý thực đơn nếm thử?",
            options: [
              "Vì đó là thực đơn đắt nhất của nhà hàng",
              "Vì khách muốn thử món địa phương",
              "Vì bếp trưởng dặn hôm nay phải bán thực đơn này",
            ],
            correct: 1,
            explanation:
              "'They want to try local food, so she recommends the tasting menu' — gợi ý đi SAU điều khách muốn.",
          },
          {
            q: "Thu làm gì khi ông Grant nói không uống rượu?",
            options: [
              "Khuyên ông thử một ly vang nhỏ cho vui",
              "Bỏ phần rượu vang của cả bàn",
              "Mời ông dùng nước trái cây tươi",
            ],
            correct: 2,
            explanation:
              "'Thu offers him fresh juice instead of the wine pairing' — tôn trọng lựa chọn của khách và đưa món thay thế.",
          },
        ],
      ),
      game: [
        game(
          "What would you suggest for a first visit?",
          "I recommend the tasting menu, madam. It has five small courses.",
          "I recommend you the tasting menu, madam. It has five small courses.",
          "Everything on our menu is good, madam, so you can choose anything you like.",
          undefined,
          "Câu cuối nghe lịch sự nhưng không giúp khách chọn. Câu đúng gợi ý MỘT món cụ thể và nói vì sao.",
        ),
        game(
          "My husband does not drink. What can he have with dinner?",
          "I recommend our fresh juice instead, madam.",
          "I am recommend our fresh juice instead, madam.",
          "One small glass of wine will not hurt him, madam.",
          undefined,
          "Câu cuối ép rượu lên người đã nói không uống. Câu đúng tôn trọng lựa chọn và gợi ý món thay thế.",
        ),
      ],
    }),

    L(23, 2, "Comparing Two Options", "So sánh hai lựa chọn", {
      vocabulary: [
        c("Quieter", "The private dining room is quieter than the main restaurant."),
        c("Private dining room", "The private dining room is good for a business dinner."),
        c("Chef's table", "At the chef's table, you can watch the cooks at work."),
        c("Sunset view table", "The sunset view table is on the terrace, by the river."),
      ],
      grammar: [
        g(
          "This room more quiet.",
          "The private dining room is quieter than the main restaurant.",
          "Tính từ ngắn so sánh hơn: thêm -er + than. quiet → quieter than. Không dùng 'more quiet'.",
          "The private dining room is more quieter than the main restaurant.",
        ),
        g(
          "Terrace table, better.",
          "The sunset view table is more romantic than the chef's table, sir.",
          "Tính từ dài so sánh hơn: more + tính từ + than. 'The sunset view table' là MỘT bàn nên dùng 'is'.",
          "The sunset view table are more romantic than the chef's table, sir.",
        ),
      ],
      speaking: [
        sp(
          "It is our anniversary tonight. Where should we sit?",
          t2a,
          "Gợi ý bàn theo dịp của khách, và so sánh bằng 'more + tính từ dài + than'.",
        ),
        sp(
          "Is it noisy out there?",
          t2b,
          "Trả lời câu hỏi về tiếng ồn bằng một câu so sánh, kèm một chi tiết thật.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Perfect. Can we have it at eight?",
          t2c,
          "Giữ bàn đi qua người đón khách. Nhắc lại giờ để khách yên tâm.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "I have a business dinner for ten people next week.",
          "I recommend the private dining room, sir. It is quieter than the main restaurant.",
          "Khách bàn công việc cần yên tĩnh — so sánh đúng điểm đó.",
        ),
        sp(
          "My son loves cooking. Can he watch the chefs?",
          "I recommend the chef's table, madam. You can watch the cooks at work.",
          "Gợi ý theo sở thích của người sẽ ngồi bàn, nói rõ lợi ích.",
        ),
      ],
      reading: read(
        `Mr and Mrs Okafor are celebrating their anniversary. Hai recommends the sunset view table, because it is quieter than the main room and more romantic. Later, a businessman asks Hai about a dinner for ten. Hai compares two options: the private dining room is quieter, but the chef's table is livelier. The guest chooses the private dining room.`,
        [
          {
            q: "Hai so sánh bàn ngắm hoàng hôn với chỗ nào?",
            options: [
              "Với phòng ăn chính của nhà hàng",
              "Với quầy bar bên cạnh hồ bơi",
              "Với phòng ăn riêng trên tầng hai",
            ],
            correct: 0,
            explanation:
              "'quieter than the main room and more romantic' — câu so sánh luôn nói rõ so với cái gì, sau 'than'.",
          },
          {
            q: "Vị khách doanh nhân chọn chỗ nào?",
            options: [
              "Bàn ăn ngay tại bếp, vì sôi động hơn",
              "Phòng ăn riêng, vì ở đó yên tĩnh hơn",
              "Bàn ngắm hoàng hôn trên sân hiên",
            ],
            correct: 1,
            explanation:
              "'The guest chooses the private dining room' — Hai so sánh hai lựa chọn, khách là người quyết định.",
          },
        ],
      ),
      game: [
        game(
          "Which is better for a quiet dinner, the terrace or inside?",
          "The terrace is quieter tonight, madam. I recommend it.",
          "The terrace is more quieter tonight, madam. I recommend it.",
          "Both places are very nice, madam, so it is really up to you.",
          undefined,
          "Câu cuối không giúp khách chọn. Câu đúng so sánh rõ MỘT điểm khách hỏi — yên tĩnh — rồi gợi ý.",
        ),
        game(
          "Is the chef's table good for a quiet business talk?",
          "The private dining room is quieter, sir. I recommend it for business.",
          "The private dining room is quieter, sir. I recommend it to business.",
          "Yes, sir. It is our most popular table.",
          undefined,
          "Câu cuối khen bàn nhưng bỏ qua điều khách cần (yên tĩnh để bàn công việc). Câu đúng so sánh đúng điểm đó và gợi ý chỗ hợp hơn.",
        ),
      ],
    }),

    L(23, 3, "Reading the Guest", "Đọc nhu cầu của khách", {
      vocabulary: [
        c("Seafood platter", "The seafood platter is good for sharing."),
        c("Aged steak", "Our aged steak is more tender than the standard steak."),
        c("Premium set menu", "The premium set menu has a starter, a main course and a dessert."),
        c("Cheese board", "The cheese board comes with bread and fresh fruit."),
      ],
      grammar: [
        g(
          "Many people? Take platter.",
          "For four people, I recommend the seafood platter, madam.",
          "Mở đầu bằng 'For four people,' cho thấy gợi ý theo đúng số khách. Không chen 'for you' vào sau 'recommend'.",
          "For four people, I recommend for you the seafood platter, madam.",
        ),
        g(
          "This steak soft, good.",
          "The aged steak is more tender than our standard steak, sir.",
          "'tender' so sánh hơn: more tender than. Sau 'than' là vật được so sánh.",
          "The aged steak is more tender that our standard steak, sir.",
        ),
      ],
      speaking: [
        sp(
          "There are four of us, and we all love seafood.",
          t3a,
          "Nghe ra số người và món khách thích, rồi gợi ý một món để chia nhau.",
        ),
        risk(
          also(
            sp(
              "Lovely. My husband has a nut allergy, though.",
              t3b,
              "Câu an toàn của tuần: bạn KHÔNG tự nói món nào không có hạt. Hỏi bếp trước khi khách gọi món.",
              undefined,
              ["check", "chef", "before", "order"],
              t3a,
            ),
            [
              "I will check with the chef before you order, madam.",
              "Let me check with the chef before you order, madam.",
            ],
          ),
        ),
        sp(
          "Will the chef's answer take long?",
          t3c,
          "Hứa quay lại trước khi khách chọn món — khách không phải gọi bạn.",
        ),
        sp(
          "Which steak is the best you have?",
          "I recommend the aged steak, sir. It is more tender than our standard steak.",
          "Gợi ý + một lý do so sánh mà khách hiểu được.",
        ),
        sp(
          "I am not very hungry tonight.",
          "I recommend the cheese board, madam. It is lighter than a main course.",
          "Khách ăn ít: gợi ý món nhẹ, so sánh bằng 'lighter than'.",
        ),
        sp(
          "We want something special, but not too expensive.",
          "I recommend the premium set menu, sir. It is cheaper than the tasting menu.",
          "So sánh giá bằng 'cheaper than' — nói thật, không ép khách món đắt hơn.",
        ),
      ],
      reading: read(
        `Lan serves a family of four who love seafood. She recommends the seafood platter, because it is good for sharing. Then the mother says that her husband has a nut allergy. Lan does not guess. She says: "I will check with the chef before you order." The chef confirms that the platter has no nuts, and Lan writes the allergy on the order.`,
        [
          {
            q: "Lan làm gì khi biết người chồng bị dị ứng hạt?",
            options: [
              "Đoán rằng món hải sản thì không có hạt",
              "Khuyên cả nhà đổi sang món bò bít tết",
              "Hỏi bếp trước khi khách gọi món",
            ],
            correct: 2,
            explanation:
              "'Lan does not guess… I will check with the chef before you order' — chỉ bếp mới xác nhận được thành phần món ăn.",
          },
          {
            q: "Ai xác nhận đĩa hải sản không có hạt?",
            options: [
              "Người mẹ, vì bà đã ăn món này",
              "Bếp trưởng của nhà hàng",
              "Lan, vì Lan đã thuộc thực đơn",
            ],
            correct: 1,
            explanation:
              "'The chef confirms that the platter has no nuts' — rồi Lan mới ghi dị ứng vào phiếu gọi món.",
          },
        ],
      ),
      game: [
        game(
          "My husband is allergic to nuts. Can he have the cheese board?",
          "I will check with the chef before you order, madam.",
          "I will checking with the chef before you order, madam.",
          "Yes, madam, I am sure it is safe. Nobody has had a problem with it.",
          undefined,
          "Câu cuối hứa thay bếp — nhân viên không tự khẳng định món không có chất gây dị ứng. Câu đúng hỏi bếp trước khi khách gọi món.",
        ),
        game(
          "Which is bigger, the seafood platter or the steak?",
          "The seafood platter is bigger, sir. It is good for sharing.",
          "The seafood platter is more bigger, sir. It is good for sharing.",
          "The steak is our best dish, sir.",
          undefined,
          "Câu cuối không trả lời điều khách hỏi. Câu đúng so sánh đúng điểm khách hỏi rồi nói lợi ích.",
        ),
      ],
    }),

    L(23, 4, "When the Guest Says No", "Khi khách từ chối", {
      vocabulary: [
        c("Signature cocktail", "Our signature cocktail is made with Vietnamese coffee."),
        c("Cocktail of the day", "The cocktail of the day is mango and lime."),
        c("Sparkling wine", "A glass of sparkling wine is nice for a celebration."),
      ],
      grammar: [
        g(
          "No? Okay.",
          "Of course, madam. Still water is a good choice too.",
          "Khách từ chối vẫn được phục vụ tử tế: chấp nhận ngay và khen lựa chọn của khách. 'a good choice' cần 'a'.",
          "Of course, madam. Still water is good choice too.",
        ),
        g(
          "Cocktail, you want? Cheap today.",
          "Would you like to try the cocktail of the day instead?",
          "'Would you like to + động từ' — có 'to' trước 'try'. 'Instead' đứng cuối câu khi đưa phương án khác.",
          "Would you like try the cocktail of the day instead?",
        ),
      ],
      speaking: [
        sp(
          "What is good at the bar tonight?",
          t4a,
          "Gợi ý món đặc trưng của quầy, kèm một chi tiết về món.",
        ),
        sp(
          "Hmm, I do not drink coffee at night.",
          t4b,
          "Khách từ chối lần một — gợi ý một món khác bằng 'instead', và chỉ một món.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "No, thank you. Just water, please.",
          t4c,
          "Khách từ chối lần hai: dừng gợi ý, làm đúng điều khách muốn.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "We just got engaged, and we want to celebrate!",
          "How wonderful, madam. Would you like a glass of sparkling wine each?",
          "Dịp vui: gợi ý đồ uống hợp dịp, bằng một lời mời lịch sự.",
        ),
        sp(
          "We will not have the sparkling wine tonight, thank you.",
          "Of course, sir. Would you like to see the wine list instead?",
          "Không tiếc nuối, không ép — mời khách xem lựa chọn khác.",
        ),
        sp(
          "No dessert for me, thanks.",
          "Of course, madam. I will bring your bill when you are ready.",
          "Chấp nhận ngay, rồi nói bước tiếp theo.",
        ),
      ],
      reading: read(
        `At the bar, Vy recommends the signature cocktail to Ms Costa. Ms Costa does not drink coffee at night, so Vy offers the cocktail of the day instead. Ms Costa says no again and asks for water. Vy smiles, asks "still or sparkling?" and brings it. She does not offer a third drink.`,
        [
          {
            q: "Sau lần từ chối đầu tiên, Vy gợi ý gì?",
            options: [
              "Một ly vang có ga",
              "Món đồ uống pha chế trong ngày",
              "Một ly cà phê không đường",
            ],
            correct: 1,
            explanation:
              "'Vy offers the cocktail of the day instead' — một gợi ý thay thế, không phải nhiều.",
          },
          {
            q: "Sau lần từ chối thứ hai, Vy làm gì?",
            options: [
              "Mời khách thử thêm một món đồ uống nữa",
              "Giải thích lại món đặc trưng",
              "Mang nước theo đúng ý của khách",
            ],
            correct: 2,
            explanation:
              "'She does not offer a third drink' — gợi ý một lần là phục vụ, gợi ý mãi là ép khách.",
          },
        ],
      ),
      game: [
        game(
          "Thank you, but I will just have a soft drink.",
          "Of course, madam. A soft drink is a good choice.",
          "Of course, madam. A soft drink are a good choice.",
          "Are you sure, madam? Our signature cocktail is much better than a soft drink.",
          undefined,
          "Câu cuối ép khách sau khi khách đã từ chối. Câu đúng chấp nhận ngay và khen lựa chọn của khách.",
        ),
        game(
          "It is our tenth anniversary tonight. What should we drink?",
          "I recommend the sparkling wine, sir. It is perfect for a celebration.",
          "I recommends the sparkling wine, sir. It is perfect for a celebration.",
          "Anything you like, sir.",
          undefined,
          "Câu cuối không gợi ý gì. Câu đúng gợi ý đồ uống hợp đúng dịp của khách và nói vì sao.",
        ),
      ],
    }),
  ];
}

// ── Week 24 — A charge, a rule, and the real reason for it ──────────────
function week24(): LessonContent[] {
  const t1a = "Of course, sir. There is a corkage fee for each bottle.";
  const t1b = "Because we open it, serve it and give you our glasses, sir.";
  const t1c = "The price is in our corkage policy on the drinks menu. I will show you now.";
  const t2a = "Of course, madam. The private dining room has a minimum spend of five million dong.";
  const t2b = "Because the room is kept only for your group that evening, madam.";
  const t2c = "We have to take a group deposit because the kitchen buys food for your group.";
  const t3a = "I am sorry, madam. We have to follow the outside food rule because of food safety.";
  const t3b = "I understand, madam. I will ask my manager about the cake now.";
  const t3c = "Of course. I will come back to you in five minutes, madam.";
  const t4a = "May I check your ID, sir? We check ID before we serve alcohol.";
  const t4b = "I am sorry, sir. I cannot serve alcohol without ID.";
  const t4c = "I understand, sir. Would you like a soft drink or a fresh juice instead?";
  return [
    L(24, 1, "There Is a Charge", "Có một khoản phí", {
      vocabulary: [
        c("Charge", "There is no charge for the filtered water on your table."),
        c("Corkage fee", "There is a corkage fee for each bottle you bring."),
        c("Service charge", "The service charge is printed on every menu in the restaurant."),
        c("Policy", "Our corkage policy is at the back of the drinks menu."),
      ],
      grammar: [
        g(
          "Your wine, you pay.",
          "There is a corkage fee for each bottle, sir.",
          "'There is a … fee' báo phí nhẹ nhàng — báo thông tin, không ra lệnh trả tiền. Một khoản phí: 'is'.",
          "There are a corkage fee for each bottle, sir.",
        ),
        g(
          "Must pay. Rule.",
          "We have to charge a corkage fee because we serve the wine for you.",
          "'have to' + động từ nguyên mẫu = việc bắt buộc; 'because' + LÝ DO THẬT, không phải 'vì là quy định'.",
          "We have to charging a corkage fee because we serve the wine for you.",
        ),
      ],
      speaking: [
        sp(
          "We brought our own bottle of wine. Is that all right?",
          t1a,
          "Đồng ý trước, rồi báo có phí — đừng để khách tự thấy trên hóa đơn.",
        ),
        sp(
          "Why do I have to pay to drink my own wine?",
          t1b,
          "Lý do thật, cụ thể: mở rượu, phục vụ, ly của nhà hàng.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Fine. How much is it?",
          t1c,
          "Chỉ chỗ có giá in sẵn, đừng đọc giá theo trí nhớ.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "What is this service charge on my bill?",
          "It is our service charge for table service, madam. It is printed on every menu.",
          "Nói khoản phí dùng cho việc gì và khách xem ở đâu — đừng đoán chính sách chia phí của khách sạn.",
        ),
        sp(
          "Do we pay for this water?",
          "No, madam. There is no charge for the filtered water.",
          "Nói rõ món nào không tính phí — khách yên tâm.",
        ),
        risk(
          also(
            sp(
              "We do not want to pay the corkage fee. Please take it off.",
              "I am sorry, sir, I cannot change the bill. My manager can review it with you.",
              "Bạn không sửa hóa đơn. Nói rõ ai xem xét — quản lý — và mời quản lý tới.",
              undefined,
              ["change", "bill", "manager", "review"],
            ),
            ["I am sorry, sir, I cannot change the bill. I will ask my manager to come."],
          ),
        ),
      ],
      reading: read(
        `Mr Weber brings two bottles of his own wine to dinner. Quang tells him there is a corkage fee for each bottle. Mr Weber asks why. Quang explains: "Because we open it, serve it and give you our glasses." At the end, Mr Weber asks Quang to take the fee off. Quang does not change the bill himself. He asks his manager to come.`,
        [
          {
            q: "Theo Quang, vì sao có phí mở rượu?",
            options: [
              "Vì khách sạn muốn khách gọi rượu của nhà hàng",
              "Vì nhân viên mở rượu, phục vụ và dùng ly của nhà hàng",
              "Vì rượu của khách rẻ hơn rượu trong thực đơn",
            ],
            correct: 1,
            explanation:
              "'Because we open it, serve it and give you our glasses' — lý do thật, khách hiểu được.",
          },
          {
            q: "Quang làm gì khi khách muốn bỏ phí?",
            options: [
              "Tự xóa phí khỏi hóa đơn cho khách",
              "Nói rằng phí này không bao giờ được bỏ",
              "Mời quản lý tới gặp khách",
            ],
            correct: 2,
            explanation:
              "'Quang does not change the bill himself. He asks his manager to come.' — bỏ phí là quyết định của quản lý.",
          },
        ],
      ),
      game: [
        game(
          "Can I bring my own wine to dinner tonight?",
          "Of course, sir. There is a corkage fee for each bottle.",
          "Of course, sir. There are a corkage fee for each bottle.",
          "Yes, sir, and do not worry. I will not put any fee on your bill.",
          undefined,
          "Câu cuối tự hứa bỏ phí — nhân viên không có quyền đó. Câu đúng đồng ý và báo trước là có phí.",
        ),
        game(
          "Why is there a service charge on my bill?",
          "It is our service charge for table service, madam. It is printed on every menu.",
          "It is our service charge for table service, madam. It are printed on every menu.",
          "The hotel adds it, madam, but I can take it off for you if you like.",
          undefined,
          "Câu cuối tự hứa bỏ phí — quyết định về tiền của quản lý. Câu đúng nói khoản phí dùng cho việc gì và in ở đâu.",
        ),
      ],
    }),

    L(24, 2, "Because — the Real Reason", "Nêu lý do thật bằng 'because'", {
      vocabulary: [
        c("Because", "We keep the room for you because your group booked it."),
        c("Minimum spend", "The private dining room has a minimum spend of five million dong."),
        c("Group deposit", "The group deposit holds the date for your party."),
        c(
          "Cancellation fee",
          "There is a cancellation fee because the kitchen has ordered the food.",
        ),
      ],
      grammar: [
        g(
          "Pay deposit. Rule.",
          "We have to take a group deposit because we buy the food early.",
          "'because' + mệnh đề (chủ ngữ + động từ). 'because of' chỉ đi với danh từ.",
          "We have to take a group deposit because of we buy the food early.",
        ),
        g(
          "Cancel, money gone.",
          "There is a cancellation fee because the kitchen has already ordered the food.",
          "'The kitchen' là một bộ phận: 'has ordered'. Hiện tại hoàn thành cho việc đã làm xong.",
          "There is a cancellation fee because the kitchen has already order the food.",
        ),
      ],
      speaking: [
        sp(
          "We want the private dining room for my mother's birthday.",
          t2a,
          "Đồng ý, rồi nói luôn điều kiện của phòng — mức chi tối thiểu.",
        ),
        sp(
          "Why is there a minimum spend?",
          t2b,
          "Lý do thật bằng 'because': phòng chỉ dành cho nhóm của khách.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "And why do you need a deposit?",
          t2c,
          "'have to' + 'because' — việc bắt buộc và lý do của nó trong cùng một câu.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "We have to cancel our dinner for twenty people tomorrow.",
          "I am sorry to hear that, sir. There is a cancellation fee, and our reservations team will explain it.",
          "Báo có phí, rồi chuyển phần chi tiết cho bộ phận đặt bàn.",
        ),
        sp(
          "Why is there a cancellation fee at all?",
          "Because the kitchen has already ordered the food for your group, sir.",
          "Lý do thật bằng 'because' + mệnh đề.",
        ),
      ],
      reading: read(
        `Mrs Lim wants the private dining room for her mother's birthday. Bao explains the minimum spend and the group deposit. "We have to take a deposit because the kitchen buys food for your group." Mrs Lim asks what happens if she cancels. Bao tells her there is a cancellation fee, and the reservations team sends the details by email.`,
        [
          {
            q: "Bảo giải thích vì sao phải đặt cọc cho đoàn?",
            options: [
              "Vì khách sạn cần thu tiền trước từ mọi khách",
              "Vì phòng ăn riêng đắt hơn phòng ăn chính",
              "Vì bếp mua nguyên liệu riêng cho nhóm khách",
            ],
            correct: 2,
            explanation:
              "'because the kitchen buys food for your group' — lý do thật, không phải 'vì quy định'.",
          },
          {
            q: "Ai gửi chi tiết về phí hủy cho bà Lim?",
            options: [
              "Bảo gửi tin nhắn cho bà ngay tối đó",
              "Bộ phận đặt bàn gửi qua email",
              "Bếp trưởng gọi điện cho bà",
            ],
            correct: 1,
            explanation:
              "'the reservations team sends the details by email' — chi tiết về tiền đi qua bộ phận phụ trách, bằng văn bản.",
          },
        ],
      ),
      game: [
        game(
          "Why do I have to pay a deposit for a group dinner?",
          "Because the kitchen buys the food for your group early, madam.",
          "Because of the kitchen buys the food for your group early, madam.",
          "Because it is our hotel rule, madam.",
          undefined,
          "Câu cuối chỉ nói 'vì là quy định' — không phải lý do. Câu đúng nói lý do thật: bếp mua nguyên liệu trước cho nhóm.",
        ),
        game(
          "Is there a minimum spend for the private dining room?",
          "Yes, sir. It is five million dong, because the room is kept for you.",
          "Yes, sir. It is five million dong, because the room is keep for you.",
          "Yes, sir, but I think the manager will not mind if you spend less.",
          undefined,
          "Câu cuối đoán thay quản lý về tiền. Câu đúng nói con số và lý do thật.",
        ),
      ],
    }),

    L(24, 3, "Rules With a Reason", "Quy định có lý do", {
      vocabulary: [
        c("Outside food rule", "Our outside food rule is there for food safety."),
        c("Last order time", "The last order time for the kitchen is half past ten."),
        c("Table time limit", "On Friday nights there is a table time limit of two hours."),
        c("Late arrival rule", "Under our late arrival rule, we hold a table for fifteen minutes."),
      ],
      grammar: [
        g(
          "Kitchen closed. Too late.",
          "I am sorry, the last order time was half past ten, sir.",
          "Báo giờ đã qua bằng quá khứ 'was'. Một mốc giờ là số ít: 'was', không phải 'were'.",
          "I am sorry, the last order time were half past ten, sir.",
        ),
        g(
          "No outside food!",
          "We have to follow the outside food rule because of food safety, madam.",
          "'because of' + danh từ (food safety). Thiếu 'of' là sai cấu trúc.",
          "We have to follow the outside food rule because food safety, madam.",
        ),
      ],
      speaking: [
        sp(
          "We brought a birthday cake from a shop in town.",
          t3a,
          "Nói quy định kèm lý do thật — an toàn thực phẩm — không nói 'không được' trơn.",
        ),
        sp(
          "But it is my daughter's birthday!",
          t3b,
          "Ngoại lệ không phải việc của bạn quyết. Hỏi quản lý, và làm ngay.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Thank you. Please be quick.",
          t3c,
          "Hứa quay lại có mốc thời gian cụ thể.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "Can we still order a pizza? It is a quarter to eleven.",
          "I am sorry, the last order time was half past ten. The bar menu is open until midnight.",
          "Từ chối có lý do + đưa ngay phương án còn mở.",
        ),
        sp(
          "Why do we have to leave the table at nine?",
          "Because the next guests booked it for nine, sir. There is a table time limit tonight.",
          "Lý do thật trước, tên quy định sau.",
        ),
        sp(
          "We are thirty minutes late. Is our table still there?",
          "Our late arrival rule holds tables for fifteen minutes, sir. I will check what is free.",
          "Nói quy định giữ bàn, rồi tự đi kiểm tra bàn trống — không bỏ mặc khách.",
        ),
      ],
      reading: read(
        `At a quarter to eleven, Mr Chen asks Hoa for a pizza. Hoa explains that the last order time was half past ten, because the chefs clean the kitchen after that. Then she offers the bar menu, which is open until midnight. Mr Chen orders two sandwiches from the bar and thanks her.`,
        [
          {
            q: "Vì sao Hoa không nhận món pizza?",
            options: [
              "Vì nhà hàng đã hết bột làm bánh pizza",
              "Vì đã qua giờ nhận gọi món cuối của bếp",
              "Vì ông Chen chưa đặt bàn từ trước",
            ],
            correct: 1,
            explanation:
              "'the last order time was half past ten, because the chefs clean the kitchen after that' — quy định kèm lý do.",
          },
          {
            q: "Hoa đưa ra giải pháp nào cho khách?",
            options: [
              "Hỏi bếp làm thêm một chiếc pizza nhỏ cho khách",
              "Mời khách quay lại vào tối mai",
              "Thực đơn quầy bar, mở tới nửa đêm",
            ],
            correct: 2,
            explanation:
              "'she offers the bar menu, which is open until midnight' — từ chối xong thì đưa ngay phương án còn mở.",
          },
        ],
      ),
      game: [
        game(
          "The kitchen is closed? It is only twenty to eleven!",
          "I am sorry, sir. The last order time was half past ten.",
          "I am sorry, sir. The last order time were half past ten.",
          "Let me ask the chef to make one more pizza for you, sir.",
          undefined,
          "Câu cuối nghe chu đáo nhưng tự phá giờ nhận món cuối mà bếp đã đóng. Câu đúng nói quy định một cách lịch sự.",
        ),
        game(
          "Can we eat our own sandwiches at the pool table?",
          "I am sorry, madam. Our outside food rule is there for food safety.",
          "I am sorry, madam. Our outside food rule are there for food safety.",
          "Of course, madam. I will bring you some plates for them.",
          undefined,
          "Câu cuối nghe tận tình nhưng phá quy định đồ ăn ngoài — ngoại lệ là việc của quản lý. Câu đúng nói quy định và lý do thật.",
        ),
      ],
    }),

    L(24, 4, "Checking the Age", "Kiểm tra tuổi", {
      vocabulary: [
        c("Legal drinking age", "The legal drinking age in Vietnam is eighteen.", [
          "/ˈliːɡl ˈdrɪŋkɪŋ eɪdʒ/",
          "Tuổi được phép uống rượu bia theo luật",
          "🔞",
        ]),
        c("Alcohol", "We serve alcohol only to guests with ID.", [
          "/ˈælkəhɒl/",
          "Rượu bia, đồ uống có cồn",
          "🍺",
        ]),
        c("No-show charge", "There is a no-show charge if a group does not come."),
        c("Cover charge", "The cover charge pays for the live music tonight."),
      ],
      grammar: [
        g(
          "You young. No beer.",
          "We have to check ID because of the legal drinking age, sir.",
          "'have to' + động từ nguyên mẫu: thiếu 'to' là sai. Lý do là luật, không phải ý riêng của bạn.",
          "We have check ID because of the legal drinking age, sir.",
        ),
        g(
          "Music, you pay extra.",
          "The cover charge is for the live music tonight, madam.",
          "'for' + danh từ để nói khoản phí trả cho cái gì.",
          "The cover charge is to the live music tonight, madam.",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "We just finished our school exams! Two beers, please.",
              t4a,
              "Khách vừa thi xong ở trường — có thể chưa đủ 18 tuổi: hỏi giấy tờ TRƯỚC khi rót. Câu hỏi lịch sự, kèm lý do.",
              undefined,
              ["check", "id", "before", "serve", "alcohol"],
            ),
            ["May I see some ID, sir? It is the law here."],
          ),
        ),
        risk(
          also(
            sp(
              "I am nineteen. I just do not have it with me.",
              t4b,
              "Không có giấy tờ thì không phục vụ đồ uống có cồn — dù khách nói đủ tuổi.",
              undefined,
              ["serve", "alcohol", "without", "id"],
              t4a,
            ),
            ["I am sorry, sir. I cannot serve you any alcohol without ID."],
          ),
        ),
        sp(
          "Come on, it is just one beer.",
          t4c,
          "Không tranh cãi, không giảng giải lại: đưa ngay đồ uống thay thế.",
        ),
        risk(
          also(
            sp(
              "Can my son have a small beer with us? He is sixteen.",
              "I am sorry, madam. The legal drinking age here is eighteen, so I cannot serve him.",
              "Cha mẹ cho phép cũng không đổi được luật. Từ chối lịch sự, nói tuổi theo luật.",
              undefined,
              ["legal", "drinking", "age", "serve"],
            ),
            ["I am sorry, madam, I cannot serve him alcohol. The legal drinking age is eighteen."],
          ),
        ),
        sp(
          "Why is there a cover charge tonight?",
          "Because we have live music tonight, madam. The cover charge is for the band.",
          "Lý do thật bằng 'because', rồi nói khoản phí trả cho gì.",
        ),
        sp(
          "Our group of twelve could not come last night. Do we have to pay?",
          "I am sorry, sir, there is a no-show charge. The reservations team will explain it.",
          "Báo có phí, chuyển chi tiết cho bộ phận đặt bàn.",
        ),
      ],
      reading: read(
        `Two young men order beers at the pool bar. They say they have just finished school. Khoa asks: "May I check your ID?" One of them has no ID. Khoa says politely that he cannot serve alcohol without ID, and he offers a soft drink instead. He explains the legal drinking age as the law, not as his own opinion.`,
        [
          {
            q: "Vì sao Khoa hỏi giấy tờ trước khi rót bia?",
            options: [
              "Vì khách nói vừa học xong ở trường",
              "Vì khách gọi hai ly bia cỡ lớn",
              "Vì quầy bar sắp đến giờ đóng cửa",
            ],
            correct: 0,
            explanation:
              "'They say they have just finished school' — dấu hiệu khách có thể chưa đủ 18 tuổi, nên kiểm tra trước khi phục vụ.",
          },
          {
            q: "Với người không có giấy tờ, Khoa làm gì?",
            options: [
              "Rót cho một ly nhỏ vì đi cùng bạn",
              "Mời một đồ uống không cồn thay thế",
              "Mời người đó rời khỏi quầy bar ngay lập tức",
            ],
            correct: 1,
            explanation:
              "'he cannot serve alcohol without ID, and he offers a soft drink instead' — từ chối rõ, vẫn phục vụ tử tế.",
          },
        ],
      ),
      game: [
        game(
          "I left my ID in the room. Can I still have a beer?",
          "I am sorry, sir. I cannot serve alcohol without ID.",
          "I am sorry, sir. I cannot serving alcohol without ID.",
          "You look old enough to me, sir, so just this one time is fine.",
          undefined,
          "Câu cuối phục vụ theo cảm giác — đúng là điều luật về tuổi cấm. Câu đúng từ chối lịch sự khi không có giấy tờ.",
        ),
        game(
          "My son is seventeen. He can have one beer with us, right?",
          "I am sorry, madam. The legal drinking age here is eighteen, so I cannot serve him.",
          "I am sorry, madam. The legal drinking age here are eighteen, so I cannot serve him.",
          "If you say so, madam. I will bring a small beer for him.",
          undefined,
          "Câu cuối phục vụ người chưa đủ tuổi vì cha mẹ đồng ý — luật không cho phép. Câu đúng nói tuổi theo luật, lịch sự.",
        ),
      ],
    }),
  ];
}

// ── Week 25 — Promising a time, and keeping it ──────────────────────────
function week25(): LessonContent[] {
  const t1a = "Of course, sir. I will tell the kitchen and bring your starter within ten minutes.";
  const t1b = "We will serve your main course by eight o'clock, sir.";
  const t1c = "Of course. I will bring more bread straight away, sir.";
  const t2a = "Not yet, madam. We are going to set up the private room by six o'clock.";
  const t2b =
    "Of course, madam. There is a corkage fee in our policy, and we will chill it on arrival.";
  const t2c = "Yes, madam. We are going to put it in an ice bucket at your table.";
  const t3a = "I will check with the kitchen and call you back within ten minutes.";
  const t3b = "I am sorry, sir. I cannot confirm it before the chef checks.";
  const t3c =
    "If the chef says yes, the kitchen will prepare a nut-free dish. Our kitchen does handle nuts, sir.";
  const t4a = "I am very sorry, sir. The kitchen says it will be here within five minutes.";
  const t4b = "You are right, sir. I will go to the kitchen and bring it myself.";
  const t4c = "I am sorry, sir. I will ask our sommelier to check if it is corked.";
  return [
    L(25, 1, "Within Ten Minutes", "Cam kết trong bao lâu", {
      vocabulary: [
        c("Within", "Your starter will be on the table within ten minutes."),
        c("Straight away", "I will bring more bread straight away."),
        c("Bring your starter", "I will bring your starter within ten minutes."),
        c("Serve your main course", "We will serve your main course after the starter."),
      ],
      grammar: [
        g(
          "Food coming soon.",
          "I will bring your starter within ten minutes, madam.",
          "Cam kết có mốc cụ thể: 'within + số phút'. 'Soon' không phải là lời hứa. Sau 'will' động từ ở dạng gốc.",
          "I will bringing your starter within ten minutes, madam.",
        ),
        g(
          "Main course later.",
          "We will serve your main course by eight o'clock, sir.",
          "'by eight o'clock' = không muộn hơn tám giờ. Sau 'will' không thêm 'to'.",
          "We will to serve your main course by eight o'clock, sir.",
        ),
      ],
      speaking: [
        sp(
          "We have a show at nine. Can we eat quickly?",
          t1a,
          "Báo bếp trước, rồi hứa phần việc của bạn bằng một con số. Không nói 'soon'.",
        ),
        sp(
          "And the main course?",
          t1b,
          "Mốc thứ hai theo giờ của khách: 'by' + giờ.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Good. Can we also have more bread?",
          t1c,
          "Việc nhỏ thì làm ngay, không cần hẹn giờ.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "How long is the wait for the soup?",
          "The kitchen says the soup will be ready within ten minutes, madam.",
          "Giờ của bếp thì nói rõ là bếp báo — bạn chỉ chuyển lời.",
        ),
        sp(
          "We booked the chef's table. When does it start?",
          "Your chef's table starts within ten minutes, sir. I will serve the first course myself.",
          "Ôn tuần 23: bàn đã đặt + mốc giờ bắt đầu.",
          undefined,
          ["chef's", "table"],
        ),
        sp(
          "Is there a quieter table for two? We can wait a little.",
          "A quieter table will be free within ten minutes, sir. I will call you from the bar.",
          "Ôn tuần 23: so sánh hơn + hứa có số, và nói bạn sẽ làm gì trong lúc khách chờ.",
          undefined,
          ["quieter"],
        ),
        sp(
          "Can we still order a dessert? It is twenty past ten.",
          "Yes, sir. The last order time is half past ten, so I will send it now.",
          "Ôn tuần 24: báo giờ nhận món cuối, rồi làm ngay.",
          undefined,
          ["last", "order", "time"],
        ),
      ],
      reading: read(
        `Mr and Mrs Patel have a show at nine. Tuan tells the kitchen at once, then promises their starter within ten minutes and the main course by eight o'clock. The starter comes in eight minutes, and the main course is on the table at a quarter to eight. Mr Patel thanks Tuan at the door.`,
        [
          {
            q: "Tuấn hứa món chính trước mấy giờ?",
            options: ["Trước chín giờ", "Trước bảy giờ rưỡi", "Trước tám giờ"],
            correct: 2,
            explanation: "'the main course by eight o'clock' — 'by' = không muộn hơn mốc đó.",
          },
          {
            q: "Tuấn làm gì TRƯỚC khi hứa giờ với khách?",
            options: [
              "Hỏi khách muốn ăn món gì trước",
              "Báo cho bếp về buổi diễn của khách",
              "Mời khách chuyển sang bàn gần cửa",
            ],
            correct: 1,
            explanation:
              "'Tuan tells the kitchen at once, then promises…' — mốc của khách phải tới được người nấu trước khi hứa.",
          },
        ],
      ),
      game: [
        game(
          "How long will the starters take?",
          "I will bring your starters within ten minutes, madam.",
          "I will bringing your starters within ten minutes, madam.",
          "As soon as possible, madam. The kitchen is very busy tonight.",
          undefined,
          "'As soon as possible' không phải lời hứa: khách không biết chờ tới khi nào. Câu đúng có số: 'within ten minutes'.",
        ),
        game(
          "We need the bill by half past eight. Is that possible?",
          "Of course, sir. I will bring your bill by half past eight.",
          "Of course, sir. I will brings your bill by half past eight.",
          "Maybe, sir. It depends on how busy we are.",
          undefined,
          "Câu cuối không hứa gì. Câu đúng nhận việc của mình và nói mốc giờ cụ thể.",
        ),
      ],
    }),

    L(25, 2, "Going To — By Six O'clock", "Kế hoạch đã định — trước sáu giờ", {
      vocabulary: [
        c("Going to", "We are going to set up your room by six o'clock."),
        c(
          "Set up the private room",
          "The banquet team will set up the private room this afternoon.",
        ),
        c("Ice bucket", "We will put your wine in an ice bucket at the table.", [
          "/aɪs ˈbʌkɪt/",
          "Xô đá ướp rượu",
          "🧊",
        ]),
        c("Reset your table", "We are going to reset your table for dessert."),
      ],
      grammar: [
        g(
          "Room ready later.",
          "We are going to set up the private room by six o'clock, madam.",
          "'be going to' cho kế hoạch đã sắp xếp — không được bỏ 'are'.",
          "We going to set up the private room by six o'clock, madam.",
        ),
        g(
          "Wine cold, okay.",
          "We will put your wine in an ice bucket when you arrive.",
          "Sau 'when' (chỉ thời gian tương lai) dùng hiện tại ('you arrive'), không dùng 'will'.",
          "We will put your wine in an ice bucket when you will arrive.",
        ),
      ],
      speaking: [
        sp(
          "Is the private room ready for our dinner at seven?",
          t2a,
          "Kế hoạch đã có: 'going to' + mốc giờ.",
        ),
        sp(
          "We are bringing our own white wine. Can you keep it cold?",
          t2b,
          "Ôn tuần 24: báo phí mở rượu TRƯỚC, rồi hứa việc của bạn — ướp lạnh khi khách tới.",
          undefined,
          ["corkage", "fee", "policy"],
          t2a,
        ),
        sp(
          "Will it be cold enough?",
          t2c,
          "Kế hoạch cụ thể, khách hình dung được.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "What if two more friends come?",
          "Please call the reservations team by five o'clock, madam. Then we can add chairs.",
          "Cho khách một mốc rõ và đúng nơi để báo thêm người.",
        ),
        sp(
          "How long can we stay in the private room?",
          "There is no table time limit in the private room, madam. It is yours all evening.",
          "Ôn tuần 24: tên quy định đã học, nói rõ áp dụng hay không.",
          undefined,
          ["table", "time", "limit"],
        ),
        sp(
          "We would like dessert, but the table is a mess.",
          "Of course, sir. We are going to reset your table first.",
          "Nói kế hoạch trước khi làm, để khách biết chuyện gì sắp diễn ra.",
        ),
        sp(
          "Do we still need to pay a group deposit for the room?",
          "Yes, madam. We are going to email the group deposit details by five o'clock.",
          "Ôn tuần 24: going to + việc + mốc giờ.",
          undefined,
          ["group", "deposit"],
        ),
      ],
      reading: read(
        `Mrs Kowalski has booked the private room for seven. At four, Ngoc tells her: "We are going to set it up by six o'clock." Mrs Kowalski is bringing two bottles of white wine. Ngoc explains the corkage fee and says the wine will go into an ice bucket when the guests arrive. At six, the room is ready.`,
        [
          {
            q: "Ngọc hứa chuẩn bị xong phòng lúc nào?",
            options: ["Đúng bốn giờ chiều", "Trước sáu giờ", "Sau bảy giờ tối"],
            correct: 1,
            explanation:
              "'We are going to set it up by six o'clock' — một kế hoạch có mốc, và được giữ đúng.",
          },
          {
            q: "Ngọc nói gì về rượu khách mang theo?",
            options: [
              "Rượu được ướp lạnh ngay từ buổi chiều",
              "Không thu phí mở rượu vì khách đã đặt phòng ăn riêng",
              "Có phí mở rượu, rượu vào xô đá khi khách tới",
            ],
            correct: 2,
            explanation:
              "'Ngoc explains the corkage fee and says the wine will go into an ice bucket when the guests arrive' — báo phí trước, phục vụ khi khách có mặt.",
          },
        ],
      ),
      game: [
        game(
          "When will our private room be ready?",
          "We are going to set it up by six o'clock, madam.",
          "We are going to sets it up by six o'clock, madam.",
          "Do not worry, madam. It will be ready when you arrive tonight.",
          undefined,
          "Câu cuối nghe yên tâm nhưng không có mốc giờ. Câu đúng nói kế hoạch và giờ cụ thể.",
        ),
        game(
          "We are bringing two bottles of our own wine tonight.",
          "Of course, madam. There is a corkage fee, and we will chill them on arrival.",
          "Of course, madam. There is a corkage fee, and we will chilling them on arrival.",
          "No problem, madam. Bring as many as you like.",
          undefined,
          "Câu cuối không báo phí — khách sẽ bất ngờ trên hóa đơn. Câu đúng báo phí trước và nói việc bạn sẽ làm.",
        ),
      ],
    }),

    L(25, 3, "Room Service — An Allergy Order", "Phục vụ phòng — món cho khách dị ứng", {
      vocabulary: [
        c("Check with the kitchen", "I will check with the kitchen and call you back."),
        c("Allergen", "Nuts and shellfish are common allergens.", [
          "/ˈælədʒən/",
          "Chất gây dị ứng",
          "⚠️",
        ]),
        c(
          "Prepare a nut-free dish",
          "The chef decides if we can prepare a nut-free dish; our kitchen still handles nuts.",
        ),
        c("Speed up your order", "I will ask the kitchen to speed up your order."),
      ],
      grammar: [
        g(
          "Nut-free? Maybe.",
          "I will ask the chef to prepare a nut-free dish, madam.",
          "'ask + người + to + động từ': giao đúng việc cho đúng người. Thiếu 'to' là sai.",
          "I will ask the chef prepare a nut-free dish, madam.",
        ),
        g(
          "Kitchen fast, okay.",
          "I will ask the kitchen to speed up your order, sir.",
          "'ask the kitchen to…' — sau 'ask' là người được nhờ, không có 'to' chen vào trước.",
          "I will ask to the kitchen to speed up your order, sir.",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "This is Room 1206. My son has a nut allergy. Can he have the pasta?",
              t3a,
              "Gọi món phòng có dị ứng: KHÔNG tự trả lời 'được'. Hỏi bếp, hứa gọi lại có mốc giờ.",
              undefined,
              ["check", "kitchen", "call", "back", "within"],
            ),
            ["Let me check with the kitchen. I will call you back within ten minutes."],
          ),
        ),
        risk(
          also(
            sp(
              "Can you not just say yes now?",
              t3b,
              "Khách giục vẫn không hứa thay bếp. Chỉ bếp xác nhận được món không có hạt.",
              undefined,
              ["confirm", "before", "chef", "checks"],
              t3a,
            ),
            ["I am sorry, sir. The chef has to check it before I can confirm."],
          ),
        ),
        sp(
          "What happens if the chef says the pasta is all right?",
          t3c,
          "Nói rõ điều kiện: bếp đồng ý thì mới làm món không hạt.",
        ),
        risk(
          also(
            sp(
              "Does the green curry have any allergens? I cannot eat shellfish.",
              "I will check the allergens with the chef before you order, madam.",
              "Câu hỏi về chất gây dị ứng: bạn không đọc thành phần theo trí nhớ. Hỏi bếp trước khi khách gọi món.",
              undefined,
              ["check", "allergens", "chef", "before", "order"],
            ),
            ["Let me check the allergens with the chef before you order, madam."],
          ),
        ),
        sp(
          "Can you send two signature cocktails and a seafood platter to Room 914?",
          "Of course, sir. Two signature cocktails and a seafood platter, within thirty minutes.",
          "Ôn tuần 23: nhắc lại đúng món, kèm mốc giờ giao.",
          undefined,
          ["signature", "cocktails", "seafood", "platter"],
        ),
        sp(
          "We ordered forty minutes ago. Where is our food?",
          "I am very sorry, madam. I will ask the kitchen to speed up your order.",
          "Xin lỗi, rồi nhờ đúng nơi làm nhanh hơn.",
        ),
        sp(
          "Can you send the premium set menu to my room tonight?",
          "Of course, sir. The premium set menu can be at your door within forty minutes.",
          "Ôn tuần 23: món đã học + mốc giờ giao.",
          undefined,
          ["premium", "set", "menu"],
        ),
      ],
      reading: read(
        `Mr Novak calls room service from Room 1206. His son has a nut allergy and wants the pasta. Phuong does not say yes at once. She checks with the kitchen and calls back within ten minutes: the chef can prepare a nut-free dish, but the kitchen does handle nuts. Phuong tells Mr Novak both things, and only then sends the order.`,
        [
          {
            q: "Vì sao Phương không nhận món ngay?",
            options: [
              "Vì bếp đã hết mì ống",
              "Vì con của khách bị dị ứng hạt",
              "Vì khách gọi quá giờ phục vụ phòng",
            ],
            correct: 1,
            explanation:
              "'His son has a nut allergy… Phuong does not say yes at once' — món cho người dị ứng phải được bếp xác nhận.",
          },
          {
            q: "Phương chuyển phiếu gọi món khi nào?",
            options: [
              "Ngay khi khách vừa gọi điện xuống",
              "Sau khi tự đọc lại thành phần trong thực đơn",
              "Sau khi bếp xác nhận làm được món không hạt",
            ],
            correct: 2,
            explanation:
              "'the chef can prepare a nut-free dish, but the kitchen does handle nuts… only then sends the order' — bếp xác nhận trước, nói cả cảnh báo nhiễm chéo, rồi mới chuyển phiếu.",
          },
        ],
      ),
      game: [
        game(
          "My daughter cannot eat nuts. Is the chicken curry safe for her?",
          "I will check with the kitchen and call you back within ten minutes.",
          "I will check with the kitchen and calling you back within ten minutes.",
          "Yes, madam. It is a mild dish, so it does not have any nuts in it.",
          undefined,
          "Câu cuối đoán thành phần — món cay nhẹ vẫn có thể có hạt. Câu đúng hỏi bếp và hứa gọi lại có mốc giờ.",
        ),
        game(
          "Are there any allergens in the prawn salad?",
          "I will check the allergens with the chef before you order, madam.",
          "I will check the allergens with the chef before you will order, madam.",
          "Only the prawns, madam. Everything else is fine.",
          undefined,
          "Câu cuối trả lời theo trí nhớ — nước sốt có thể có chất gây dị ứng khác. Câu đúng hỏi bếp trước khi khách gọi món.",
        ),
      ],
    }),

    L(25, 4, "When the Promise Slips", "Khi lời hứa bị trễ", {
      vocabulary: [
        c("Hold the dessert", "I will hold the dessert until your husband comes back."),
        c("Corked", "A corked wine smells like wet cardboard.", [
          "/kɔːkt/",
          "(Rượu vang) bị hỏng mùi do nút chai",
          "🍷",
        ]),
        c("Top up your water", "I will top up your water when I pass your table."),
        c("Sommelier", "Our sommelier checks any wine that tastes wrong."),
      ],
      grammar: [
        g(
          "Sorry late. Busy.",
          "I am very sorry for the delay. The kitchen says five more minutes.",
          "Xin lỗi + mốc MỚI mà bếp đã xác nhận. 'the delay' cần 'the'.",
          "I am very sorry for the delay. The kitchen saying five more minutes.",
        ),
        g(
          "Dessert wait.",
          "I will hold the dessert until your husband comes back, madam.",
          "Sau 'until' dùng hiện tại ('comes back'), không dùng 'will'.",
          "I will hold the dessert until your husband will come back, madam.",
        ),
      ],
      speaking: [
        sp(
          "You said ten minutes for the main course. It has been half an hour!",
          t4a,
          "Xin lỗi, hỏi bếp TRƯỚC, rồi mới đưa mốc mới — mốc của bếp, nói là của bếp.",
        ),
        sp(
          "That is what you said before.",
          t4b,
          "Công nhận khách đúng, rồi tự đi lấy — đừng hứa thêm lần nữa.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "And this red wine tastes strange.",
          t4c,
          "Khách nói rượu lạ: không tự kết luận, không cãi. Nhờ người chuyên về rượu kiểm tra.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "We want to wait for my husband before dessert.",
          "Of course, madam. I will hold the dessert until he comes back.",
          "Làm theo nhịp của khách.",
        ),
        sp(
          "Could we have more water, please?",
          "Of course, sir. I will top up your water straight away.",
          "Việc nhỏ: làm ngay.",
        ),
        sp(
          "Can we have the cheese board now, before the dessert?",
          "Of course, madam. I will bring you the cheese board now and hold the dessert.",
          "Ôn tuần 23: đổi thứ tự món theo ý khách, nói rõ món nào ra trước.",
          undefined,
          ["cheese", "board"],
        ),
        sp(
          "We will be thirty minutes late tonight.",
          "Our late arrival rule holds tables for fifteen minutes, sir. I will tell the host now.",
          "Ôn tuần 24: nói quy định thật, rồi việc bạn làm ngay.",
          undefined,
          ["late", "arrival", "rule"],
        ),
      ],
      reading: read(
        `Table nine waited half an hour for their main course. Son apologises and checks with the kitchen first. Then he gives the new time from the kitchen: five minutes. He goes to the kitchen and brings it himself. When the guest says the wine tastes strange, Son does not argue. He asks the sommelier to check if it is corked.`,
        [
          {
            q: "Sơn làm gì TRƯỚC khi đưa mốc giờ mới?",
            options: [
              "Mời khách một ly rượu miễn phí",
              "Giải thích rằng bếp tối nay quá đông",
              "Hỏi lại bếp để biết giờ thật",
            ],
            correct: 2,
            explanation:
              "'checks with the kitchen first. Then he gives the new time from the kitchen' — mốc mới phải là mốc bếp đã xác nhận.",
          },
          {
            q: "Khi khách nói rượu có vị lạ, Sơn làm gì?",
            options: [
              "Nhờ người chuyên về rượu kiểm tra",
              "Nói rằng loại vang này vốn có vị như vậy",
              "Mở ngay một chai mới cho khách",
            ],
            correct: 0,
            explanation:
              "'He asks the sommelier to check if it is corked' — rượu có lỗi hay không là chuyên viên rượu vang kiểm tra.",
          },
        ],
      ),
      game: [
        game(
          "We have been waiting forty minutes for our mains!",
          "I am very sorry, sir. The kitchen says five more minutes.",
          "I am very sorry, sir. The kitchen saying five more minutes.",
          "I am sorry, sir. Can I offer you a free dessert to say sorry?",
          undefined,
          "Câu cuối tự mời món miễn phí — việc của quản lý — và đổi sang việc khác. Câu đúng giữ đúng việc khách chờ và đưa mốc bếp đã xác nhận.",
        ),
        game(
          "This white wine smells like an old cork.",
          "I am sorry, madam. I will ask our sommelier to check if it is corked.",
          "I am sorry, madam. I will ask our sommelier to check if it corked.",
          "It is a natural wine, madam. It always smells like that.",
          undefined,
          "Câu cuối cãi lại khách mà chưa ai kiểm tra. Câu đúng xin lỗi và nhờ người chuyên về rượu kiểm tra.",
        ),
      ],
    }),
  ];
}

// ── Week 26 — One request, one owner ────────────────────────────────────
function week26(): LessonContent[] {
  const t1a = "I am not sure, sir. I will check with the head chef.";
  const t1b = "Of course, sir. The head chef will confirm it before you order.";
  const t1c = "Take your time, sir. I will be back within five minutes.";
  const t2a = "Of course, sir. I will ask the pastry section to make a small cake.";
  const t2b = "Yes, sir. I will arrange it with them before six o'clock.";
  const t2c = "I will ask my manager about that, sir, and she will tell you.";
  const t3a = "I am very sorry, sir. I will check with the reservations team now.";
  const t3b = "Yes, sir. I have called them, and they are checking your email now.";
  const t3c = "Of course. I will ask the host to seat you at table eight now.";
  const t4a = "I am sorry, sir. I cannot serve you more alcohol.";
  const t4b = "No, sir. May I bring you some water or a coffee?";
  const t4c = "Of course, sir. I will call the bar manager now.";
  return [
    L(26, 1, "Let Me Check With…", "Để tôi hỏi người phụ trách…", {
      vocabulary: [
        c("Head chef", "Only the head chef can confirm what is in a dish."),
        c("Transfer", "I will transfer your call to the reservations team."),
        c("Cashier", "The cashier prints the bill and takes the payment.", [
          "/kæˈʃɪə/",
          "Thu ngân",
          "🧾",
        ]),
      ],
      grammar: [
        g(
          "Not my job.",
          "Let me check with the head chef for you, sir.",
          "'Let me check with + người phụ trách' — nhận việc thay khách, không đẩy khách đi hỏi.",
          "Let me checking with the head chef for you, sir.",
        ),
        g(
          "Call reservations.",
          "I will transfer your call to the reservations team, madam.",
          "'transfer + cuộc gọi + to + bộ phận' — giới từ là 'to'.",
          "I will transfer your call for the reservations team, madam.",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "Is the lamb curry halal?",
              t1a,
              "Bạn không biết chắc thì KHÔNG đoán. Nói thật và hỏi bếp trưởng.",
              undefined,
              ["check", "head", "chef"],
            ),
            [
              "I am not sure, sir. I will ask the head chef.",
              "Let me check with the head chef for you, sir.",
            ],
          ),
        ),
        risk(
          also(
            sp(
              "Please be careful. We only eat halal food.",
              t1b,
              "Nói rõ ai xác nhận và khi nào: bếp trưởng, trước khi khách gọi món.",
              undefined,
              ["head", "chef", "confirm", "before", "order"],
              t1a,
            ),
            ["Of course, sir. I will ask the head chef to confirm it before you order."],
          ),
        ),
        sp(
          "Thank you. We will look at the menu.",
          t1c,
          "Để khách thong thả, kèm mốc giờ bạn quay lại.",
        ),
        sp(
          "Which wine goes well with the aged steak?",
          "For the aged steak, let me ask our sommelier, madam. She knows the wine list best.",
          "Ôn tuần 23: món đã học + mời đúng người: chuyên viên rượu vang.",
          undefined,
          ["aged", "steak"],
        ),
        sp(
          "Can someone help us choose the wine pairing for tonight?",
          "Of course, madam. I will ask our sommelier to help you with the wine pairing.",
          "Ôn tuần 23: món đã học + người phụ trách đúng việc.",
          undefined,
          ["wine", "pairing"],
        ),
        sp(
          "A guest on the phone wants to book a table for Saturday.",
          "Please transfer the call to the reservations team.",
          "Nói với đồng nghiệp: ngắn, rõ chuyển cho ai.",
          "colleague",
        ),
        sp(
          "The corkage fee on my bill looks wrong. Who can explain it?",
          "Our cashier can explain the corkage fee, sir. I will bring her to your table.",
          "Ôn tuần 24: khoản phí đã học + người giải thích đúng: thu ngân.",
          undefined,
          ["corkage", "fee"],
        ),
        sp(
          "Does the satay sauce have any allergens?",
          "I am not sure, madam. I will ask the head chef about the allergens.",
          "Ôn tuần 25: chất gây dị ứng là câu trả lời của bếp trưởng.",
          undefined,
          ["head", "chef", "allergens"],
        ),
      ],
      reading: read(
        `Mr Ahmed asks Duc if the lamb curry is halal. Duc is not sure, so he does not guess. He says: "I will check with the head chef." The head chef confirms that the lamb is halal, but the sauce has wine in it. Duc tells Mr Ahmed exactly that. Mr Ahmed asks about the grilled chicken instead, so Duc checks that with the head chef too. The chicken is halal, and Mr Ahmed orders it.`,
        [
          {
            q: "Vì sao Đức không trả lời ngay?",
            options: [
              "Vì Đức không chắc nên không đoán",
              "Vì bếp trưởng cấm nhân viên nói về món ăn",
              "Vì ông Ahmed chưa đọc thực đơn",
            ],
            correct: 0,
            explanation:
              "'Duc is not sure, so he does not guess' — đoán sai về halal là lỗi khách không thể bỏ qua.",
          },
          {
            q: "Bếp trưởng cho biết thêm điều gì?",
            options: ["Món cà ri đã hết", "Nước sốt có rượu vang", "Thịt cừu không phải halal"],
            correct: 1,
            explanation:
              "'the lamb is halal, but the sauce has wine in it' — chỉ bếp mới biết đủ thành phần, kể cả trong nước sốt.",
          },
          {
            q: "Vì sao ông Ahmed đổi sang món gà nướng?",
            options: [
              "Vì món gà rẻ hơn món cà ri",
              "Vì Đức khuyên ông nên ăn món gà",
              "Vì nước sốt cà ri có rượu vang",
            ],
            correct: 2,
            explanation:
              "Bài không nói thẳng lý do, nhưng ông chỉ ăn đồ halal và nước sốt có rượu vang — nên ông chọn món khác.",
          },
        ],
      ),
      game: [
        game(
          "Is there any pork in the dumplings?",
          "I am not sure, madam. I will check with the head chef.",
          "I am not sure, madam. I will checking with the head chef.",
          "No, madam, I do not think so. Our dumplings are usually chicken.",
          undefined,
          "Câu cuối đoán thành phần — 'usually' không phải câu trả lời cho khách không ăn thịt heo. Câu đúng nói thật và hỏi bếp trưởng.",
        ),
        game(
          "Can you put my call through to reservations?",
          "Of course, sir. I will transfer your call to the reservations team.",
          "Of course, sir. I will transfer your call for the reservations team.",
          "The reservations team is busy now, sir. Please call them again later.",
          undefined,
          "Câu cuối nghe có lý nhưng đẩy việc lại cho khách. Câu đúng nhận việc và chuyển máy đúng bộ phận.",
        ),
      ],
    }),

    L(26, 2, "I'll Ask Them To…", "Tôi sẽ nhờ họ…", {
      vocabulary: [
        c("Arrange", "I will arrange the birthday cake for eight o'clock."),
        c("Pastry section", "The pastry section makes all our cakes."),
        c("Bar team", "I will ask the bar team to make your cocktail less sweet."),
        c("Banquet team", "The banquet team sets up the ballroom for weddings."),
      ],
      grammar: [
        g(
          "Bar make again.",
          "I will ask the bar team to make it less sweet, madam.",
          "'ask + người + to + động từ': giao việc rõ ai làm gì. Thiếu 'to' là sai.",
          "I will ask the bar team make it less sweet, madam.",
        ),
        g(
          "Cake? Pastry do.",
          "I will ask the pastry section to write her name on the cake.",
          "Sau 'to' động từ ở dạng gốc: 'to write', không phải 'to writing'.",
          "I will ask the pastry section to writing her name on the cake.",
        ),
      ],
      speaking: [
        sp(
          "It is my wife's birthday tomorrow. Can you do something special?",
          t2a,
          "Một yêu cầu, một nơi làm: tổ bánh ngọt.",
        ),
        sp(
          "Can they write her name on it?",
          t2b,
          "'arrange' = sắp xếp. Chốt mốc giờ với bộ phận làm.",
          undefined,
          undefined,
          t2a,
        ),
        risk(
          also(
            sp(
              "Is the cake free?",
              t2c,
              "Miễn phí là quyết định về tiền: bạn không tự trả lời. Hỏi quản lý — người trả lời khách.",
              undefined,
              ["ask", "manager", "tell"],
            ),
            ["I am not sure, sir. I will ask my manager to tell you about the cake."],
          ),
        ),
        sp(
          "This cocktail is much too sweet for me.",
          "I am sorry, madam. I will ask the bar team to make it less sweet.",
          "Đúng người làm lại: tổ pha chế.",
        ),
        sp(
          "We want to bring our own cake to the conference lunch.",
          "Our outside food rule is the same for every room, sir. I will ask my manager about it.",
          "Ôn tuần 24: quy định đã học; ngoại lệ là việc của quản lý.",
          undefined,
          ["outside", "food", "rule"],
        ),
        sp(
          "Who will set up the private room for our party on Friday?",
          "The banquet team is going to set up the private room, madam.",
          "Ôn tuần 25: việc đã học + bộ phận làm việc đó.",
          undefined,
          ["private", "room"],
        ),
        sp(
          "Can the banquet team put flowers on the sunset view table?",
          "Of course, madam. There is a small charge, and I will put them on the sunset view table.",
          "Ôn tuần 23: tên bàn đã học; hoa có tính phí thì nói trước.",
          undefined,
          ["sunset", "view", "table"],
        ),
      ],
      reading: read(
        `Mr Silva tells Thao that tomorrow is his wife's birthday. Thao asks the pastry section to make a small cake with her name on it, and she arranges it for eight o'clock. Mr Silva asks if the cake is free. Thao does not decide that herself. She asks her manager, and the manager speaks to Mr Silva before dinner. At eight, the cake arrives with one candle, and the next table sings too. Mr Silva thanks Thao on his way out.`,
        [
          {
            q: "Thảo nhờ ai làm bánh sinh nhật?",
            options: ["Tổ pha chế", "Bếp trưởng của nhà hàng", "Tổ bánh ngọt"],
            correct: 2,
            explanation:
              "'Thao asks the pastry section to make a small cake' — một việc, đúng một nơi làm.",
          },
          {
            q: "Ai trả lời ông Silva về chuyện bánh có miễn phí không?",
            options: [
              "Quản lý của Thảo",
              "Thảo, ngay lúc khách hỏi",
              "Tổ bánh ngọt, khi mang bánh ra",
            ],
            correct: 0,
            explanation:
              "'Thao does not decide that herself. She asks her manager' — đồ miễn phí do quản lý quyết.",
          },
          {
            q: "Việc nào xảy ra SAU CÙNG?",
            options: [
              "Quản lý nói chuyện với ông Silva",
              "Bánh được mang ra lúc tám giờ",
              "Thảo nhờ tổ bánh ngọt làm bánh",
            ],
            correct: 1,
            explanation:
              "Thứ tự trong bài: nhờ làm bánh → khách hỏi giá → quản lý trả lời trước bữa tối → tám giờ bánh mới ra.",
          },
        ],
      ),
      game: [
        game(
          "Could someone make my cocktail a bit less strong?",
          "Of course, madam. I will ask the bar team to make a new one.",
          "Of course, madam. I will ask the bar team to making a new one.",
          "Of course, madam. I will add some water to it for you.",
          undefined,
          "Câu cuối tự sửa đồ uống thay vì nhờ tổ pha chế làm lại. Câu đúng giao cho đúng tổ làm.",
        ),
        game(
          "Can you arrange some flowers on our table for tonight?",
          "Of course, sir. There is a small charge, and I will arrange them before six.",
          "Of course, sir. There is a small charge, and I will arranging them before six.",
          "Of course, sir. Flowers are free for our hotel guests.",
          undefined,
          "Câu cuối tự hứa miễn phí — không phải quyền của bạn. Câu đúng nhận việc, báo trước có phí, hẹn giờ.",
        ),
      ],
    }),

    L(26, 3, "Following Up", "Theo dõi việc trong nội bộ", {
      vocabulary: [
        c("Reservations team", "The reservations team keeps every table booking."),
        c("Restaurant manager", "The restaurant manager decides on any discount."),
        c("Room service team", "The room service team takes food to the rooms."),
        c("Kitchen team", "I have told the kitchen team, and they are cooking it now."),
      ],
      grammar: [
        g(
          "I tell already.",
          "I have informed the kitchen team, and they are cooking it now.",
          "Hiện tại hoàn thành 'have informed' báo việc ĐÃ làm; hiện tại tiếp diễn 'are cooking' cho việc đang diễn ra.",
          "I have informed the kitchen team, and they cooking it now.",
        ),
        g(
          "Manager decide. Not me.",
          "The restaurant manager decides on discounts, sir. I will ask her to come.",
          "'The restaurant manager' là một người: 'decides' có -s.",
          "The restaurant manager decide on discounts, sir. I will ask her to come.",
        ),
      ],
      speaking: [
        sp(
          "I booked a table for six, and you cannot find it!",
          t3a,
          "Xin lỗi và nhận việc kiểm tra với đúng bộ phận.",
        ),
        sp(
          "Has anyone actually done anything yet?",
          t3b,
          "Báo việc ĐÃ làm (have called) + việc đang làm.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "We are hungry. Can we sit down while they check?",
          t3c,
          "Xếp chỗ là việc của người đón khách — bạn nhờ họ, kèm bàn cụ thể.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "This is not what I ordered from room service.",
          "I am sorry, madam. I will ask the room service team to bring the right dish.",
          "Đúng tổ sửa lỗi của tổ mình.",
        ),
        risk(
          also(
            sp(
              "I want a discount for all this trouble.",
              "I am sorry, sir, I cannot change the price. The manager will speak with you.",
              "Giảm giá là của quản lý nhà hàng. Bạn chuyển lời, không hứa.",
              undefined,
              ["change", "price", "manager", "speak"],
            ),
            ["I am sorry, sir, I cannot give a discount. The manager will speak with you."],
          ),
        ),
        sp(
          "Has anyone told the kitchen about my allergy?",
          "Yes, madam. The kitchen team has your note, and I told the restaurant manager too.",
          "Báo việc đã làm + ai đang giữ thông tin.",
        ),
        sp(
          "We have a flight at nine. Can the kitchen hurry?",
          "Of course, sir. I will ask the kitchen team to speed up your order.",
          "Ôn tuần 25: một việc, đúng người làm.",
          undefined,
          ["speed", "order"],
        ),
        sp(
          "We could not come on Friday. Why is there a no-show charge?",
          "The reservations team will explain the no-show charge, sir. I will check it with them now.",
          "Ôn tuần 24: khoản phí đã học + bộ phận giải thích.",
          undefined,
          ["show", "charge"],
        ),
      ],
      reading: read(
        `Mr Harris booked a table for six, but his booking is not in the book. Hieu apologises and checks with the reservations team. When Mr Harris asks if anything has been done, Hieu says: "I have called them, and they are checking your email now." Meanwhile, the host seats the family at table eight. Five minutes later the booking is found under his wife's name, and Hieu thanks Mr Harris for waiting. He also tells the reservations team, so the note is fixed.`,
        [
          {
            q: "Hiếu trả lời gì khi khách hỏi đã có ai làm gì chưa?",
            options: [
              "Chưa, vì bộ phận đặt bàn đang bận",
              "Đã gọi bộ phận đặt bàn, họ đang kiểm tra email",
              "Lỗi do khách đặt nhầm ngày",
            ],
            correct: 1,
            explanation:
              "'I have called them, and they are checking your email now' — việc đã làm + việc đang làm.",
          },
          {
            q: "Vì sao lúc đầu không tìm thấy đặt bàn?",
            options: [
              "Vì đặt bàn mang tên vợ ông Harris",
              "Vì bộ phận đặt bàn làm mất email",
              "Vì ông Harris đến sai nhà hàng",
            ],
            correct: 0,
            explanation:
              "'the booking is found under his wife's name' — không phải lỗi của ai, nên không cần đổ lỗi trước khi kiểm tra.",
          },
          {
            q: "Vì sao gia đình được xếp bàn trước khi tìm ra đặt bàn?",
            options: [
              "Vì người đón khách đã nhớ ra tên ông Harris",
              "Vì quản lý yêu cầu xếp bàn cho mọi khách",
              "Để khách không phải đứng chờ khi đang đói",
            ],
            correct: 2,
            explanation:
              "Bài không nói thẳng, nhưng khách đang chờ và đặt bàn chưa thấy — xếp bàn trước là chăm sóc khách trong lúc kiểm tra.",
          },
        ],
      ),
      game: [
        game(
          "Has anyone checked my booking yet?",
          "Yes, sir. I have called the reservations team, and they are checking it now.",
          "Yes, sir. I have call the reservations team, and they are checking it now.",
          "Not yet, sir. Maybe you booked it for another night?",
          undefined,
          "Câu cuối đổ ngược cho khách trước khi kiểm tra. Câu đúng báo việc đã làm và việc đang làm.",
        ),
        game(
          "This evening was a mess. I expect a discount.",
          "I am sorry, sir, I cannot change the price. The manager will speak with you.",
          "I am sorry, sir, I cannot changing the price. The manager will speak with you.",
          "Of course, sir. I will take twenty percent off your bill.",
          undefined,
          "Câu cuối tự giảm giá — quyết định của quản lý nhà hàng. Câu đúng xin lỗi và chuyển đúng người.",
        ),
      ],
    }),

    L(26, 4, "Closing the Loop at the Bar", "Khép vòng xử lý ở quầy bar", {
      vocabulary: [
        c("Bar manager", "The bar manager comes when we stop serving a guest."),
        c("Food runner", "The food runner brings the dishes from the kitchen."),
        c("Stewarding team", "The stewarding team washes the glasses and plates."),
      ],
      grammar: [
        g(
          "Drunk. No more.",
          "I am sorry, sir. I cannot serve you more alcohol.",
          "Từ chối rõ, lịch sự, không gọi khách là 'say'. Sau 'cannot' động từ ở dạng gốc, không có 'to'.",
          "I am sorry, sir. I cannot to serve you more alcohol.",
        ),
        g(
          "Glass dirty, not me.",
          "I have asked the stewarding team to check every glass, madam.",
          "'have asked' — hiện tại hoàn thành: have + quá khứ phân từ.",
          "I have ask the stewarding team to check every glass, madam.",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "Another whisky! Make it a double!",
              t4a,
              "Khách đã uống quá nhiều: KHÔNG rót thêm. Từ chối ngắn, lịch sự, không tranh cãi.",
              undefined,
              ["serve", "alcohol"],
            ),
            ["I am sorry, sir. I cannot serve you any more alcohol."],
          ),
        ),
        risk(
          also(
            sp(
              "Are you saying I am drunk?",
              t4b,
              "Không gọi khách là say. Mời nước hoặc cà phê.",
              undefined,
              ["bring", "water", "coffee"],
              t4a,
            ),
            ["No, sir. Would you like some water or a coffee?"],
          ),
        ),
        sp(
          "I want to speak to your manager!",
          t4c,
          "Đồng ý ngay và gọi quản lý quầy bar — người quyết trong ca này.",
        ),
        sp(
          "This glass has lipstick on it.",
          "I am sorry, madam. I will bring a clean glass and tell the stewarding team.",
          "Thay ngay, rồi báo đúng tổ để lỗi không lặp lại.",
        ),
        sp(
          "Table five is still waiting for their main courses.",
          "I will ask the food runner to bring them, and I will top up their water.",
          "Ôn tuần 25: nói với đồng nghiệp — một việc giao đi, một việc mình làm.",
          "colleague",
          ["top", "water"],
        ),
        sp(
          "What is the cocktail of the day?",
          "It is mango and lime, madam. The bar team makes the cocktail of the day fresh.",
          "Ôn tuần 23: món đã học + tổ làm món đó.",
          undefined,
          ["cocktail", "day"],
        ),
        sp(
          "Is there a cover charge at the pool bar tonight?",
          "Yes, sir, for the band. The bar team can tell you the cover charge.",
          "Ôn tuần 24: khoản phí đã học + người báo giá.",
          undefined,
          ["cover", "charge"],
        ),
        sp(
          "A young guest at the bar has no ID.",
          "Then we do not serve him alcohol. The legal drinking age here is eighteen.",
          "Ôn tuần 24: nói với đồng nghiệp — luật về tuổi, không có ngoại lệ.",
          "colleague",
          ["legal", "drinking", "age"],
        ),
      ],
      reading: read(
        `At the pool bar, a guest asks Nam for another double whisky. He is speaking very loudly and cannot stand well. Nam says: "I am sorry, sir. I cannot serve you more alcohol." He offers water or a coffee and calls the bar manager. He does not call the guest drunk, and he does not argue. The bar manager talks to the guest, and his friends walk him to his room. Nam writes the time in the bar log before he serves the next guest.`,
        [
          {
            q: "Nam trả lời thế nào khi khách đòi thêm rượu?",
            options: [
              "Rót thêm một ly nhỏ cho khách vui",
              "Từ chối lịch sự, mời nước hoặc cà phê",
              "Nói khách đã say và mời khách về phòng",
            ],
            correct: 1,
            explanation:
              "'I cannot serve you more alcohol' + 'He offers water or a coffee' — từ chối mà không gọi khách là say.",
          },
          {
            q: "Ai nói chuyện với vị khách sau đó?",
            options: ["Một nhân viên an ninh", "Nam, một mình", "Quản lý quầy bar"],
            correct: 2,
            explanation:
              "'The bar manager talks to the guest' — chuyện với khách đã uống nhiều là của quản lý quầy.",
          },
          {
            q: "Vì sao Nam không nói khách 'say' và không tranh cãi?",
            options: [
              "Để khách giữ thể diện và tình hình không căng thêm",
              "Vì Nam không chắc khách đã uống bao nhiêu ly rượu tối đó",
              "Vì quản lý quầy đã dặn không được nói chuyện",
            ],
            correct: 0,
            explanation:
              "Bài không nói thẳng, nhưng khách đang nói to và không đứng vững — gọi khách là say hay tranh cãi chỉ làm chuyện căng hơn.",
          },
        ],
      ),
      game: [
        game(
          "Just one more beer. I am fine, I promise!",
          "I am sorry, sir. I cannot serve you any more alcohol.",
          "I am sorry, sir. I cannot serving you any more alcohol.",
          "Okay, sir, but this is your last one tonight. Please drink it slowly.",
          undefined,
          "Câu cuối vẫn rót thêm cho khách đã uống quá nhiều. Câu đúng từ chối ngắn gọn, lịch sự.",
        ),
        game(
          "Table five is still waiting for their mains.",
          "I will ask the food runner to bring them now.",
          "I will ask the food runner bring them now.",
          "I will tell them it is coming soon.",
          "colleague",
          "Câu cuối chỉ hứa suông, không ai mang món ra. Câu đúng giao đúng người làm ngay.",
        ),
      ],
    }),
  ];
}

// ── Week 27 — Receiving a complaint ─────────────────────────────────────
function week27(): LessonContent[] {
  const t1a = "I am very sorry about the cold food and the wait, sir. I will bring a hot soup now.";
  const t1b = "I apologise, sir. I will tell the restaurant manager about the slow service.";
  const t1c = "I understand, sir. I will check with the kitchen and come back within two minutes.";
  const t2a = "I am very sorry, sir. Shall I call first aid for her now?";
  const t2b = "Of course, sir. I am calling the manager now.";
  const t2c = "I will take the plate to the manager, sir. She has to check it.";
  const t2d = "I cannot say yet, sir. The manager will look into it with the head chef.";
  const t3a = "I am sorry, sir. I will bring you an itemised bill, so we can check it together.";
  const t3b = "Thank you, sir. I will ask the manager to check it with the cashier now.";
  const t3c = "I will come back to you within five minutes, sir.";
  const t4a = "I am calling first aid and the manager now, madam.";
  const t4b = "Does he have his own allergy medicine with him, madam?";
  const t4c = "Please help him use it now, madam. The manager is calling an ambulance.";
  return [
    L(27, 1, "Listen First", "Lắng nghe trước", {
      vocabulary: [
        c("Concern", "Thank you for telling me about your concern, sir."),
        c("Apologise", "I apologise for the long wait, madam."),
        c("Cold food", "Cold food goes back to the kitchen at once."),
        c("Slow service", "I apologise for the slow service tonight."),
      ],
      grammar: [
        g(
          "Not my fault. Kitchen slow.",
          "I apologise for the slow service tonight, sir.",
          "'apologise for + điều khách gặp phải'. Không đổ lỗi cho bếp hay đồng nghiệp.",
          "I apologise the slow service tonight, sir.",
        ),
        g(
          "Okay okay, I know.",
          "Thank you for telling me about your concern, madam.",
          "Cảm ơn khách đã nói — để khách nói hết rồi mới làm. Sau 'for' động từ thêm -ing.",
          "Thank you for tell me about your concern, madam.",
        ),
      ],
      speaking: [
        sp(
          "My soup is cold, and we waited forty minutes for it.",
          t1a,
          "Lắng nghe hết, xin lỗi ĐÚNG hai điều khách gặp — món nguội và chờ lâu — rồi làm ngay.",
        ),
        sp(
          "This is the second problem tonight.",
          t1b,
          "Ôn tuần 26: lỗi lặp lại thì báo quản lý nhà hàng, không hứa suông lần nữa.",
          undefined,
          ["restaurant", "manager"],
          t1a,
        ),
        sp(
          "I do not want to wait like that for the main course.",
          t1c,
          "Giờ món chính là của bếp: hỏi bếp, rồi hứa phần việc của bạn — quay lại có mốc.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "All right. Thank you for listening.",
          "Thank you for your patience, sir. We will serve your main course next.",
          "Khép lại cuộc nói chuyện: cảm ơn sự kiên nhẫn của khách và hứa theo dõi tiếp.",
          undefined,
          undefined,
          t1c,
        ),
        sp(
          "We have waited half an hour for our starters.",
          "I apologise, madam. I will ask the food runner to bring your starter now.",
          "Ôn tuần 25–26: xin lỗi, rồi giao đúng người mang món ra.",
          undefined,
          ["food", "runner", "starter"],
        ),
        sp(
          "I am worried the food here is too spicy for my mother.",
          "Thank you for telling me about your concern, madam. I will ask the chef about it.",
          "Cảm ơn khách đã nói điều lo lắng, rồi hỏi đúng người biết món ăn.",
        ),
        sp(
          "Your bartender was rude to me at the pool bar.",
          "I am very sorry, sir. I will tell the bar manager about it now.",
          "Ôn tuần 26: xin lỗi, không bênh đồng nghiệp, báo đúng người quản lý quầy.",
          undefined,
          ["bar", "manager"],
        ),
      ],
      reading: read(
        `Mr Brown's soup arrives cold after forty minutes. Ngoc listens without stopping him. She apologises for the cold food and the wait, and she brings a hot soup. Because it is the second problem that evening, Ngoc tells the restaurant manager about the slow service. She does not blame the kitchen. The manager visits the table before the main course and thanks Mr Brown for his patience. Later, Mr Brown writes a kind review about the way his complaint was handled.`,
        [
          {
            q: "Ngọc làm gì trước tiên khi khách phàn nàn?",
            options: [
              "Giải thích vì sao bếp làm chậm",
              "Nghe khách nói hết, không ngắt lời",
              "Hỏi khách đã gọi món lúc mấy giờ",
            ],
            correct: 1,
            explanation:
              "'Ngoc listens without stopping him' — bước đầu của tiếp nhận phàn nàn là lắng nghe trọn vẹn.",
          },
          {
            q: "Vì sao Ngọc báo quản lý nhà hàng?",
            options: [
              "Vì khách đòi được giảm giá",
              "Vì Ngọc không mang được súp nóng",
              "Vì đó là vấn đề thứ hai trong buổi tối",
            ],
            correct: 2,
            explanation:
              "'Because it is the second problem that evening' — lỗi lặp lại là việc của cấp trên.",
          },
          {
            q: "Vì sao quản lý tới bàn TRƯỚC món chính?",
            options: [
              "Để kịp lấy lại lòng tin trước khi khách ăn tiếp",
              "Để giao món chính thay cho Ngọc vì Ngọc đang quá bận",
              "Để tính tiền món súp cho khách",
            ],
            correct: 0,
            explanation:
              "Bài không nói thẳng, nhưng hai lỗi liền nhau — quản lý tới trước món chính để khách thấy chuyện đã được xử lý.",
          },
        ],
      ),
      game: [
        game(
          "We have waited so long, and now the food is cold.",
          "I apologise for the slow service, sir. I will bring hot food now.",
          "I apologise the slow service, sir. I will bring hot food now.",
          "I am sorry, sir. If you like, I can take the soup off your bill.",
          undefined,
          "Câu cuối nghe chu đáo nhưng tự bỏ món khỏi hóa đơn — việc của quản lý. Câu đúng xin lỗi về điều khách gặp và làm ngay.",
        ),
        game(
          "Somebody should know how bad tonight was.",
          "Thank you for telling me, sir. I will tell the restaurant manager now.",
          "Thank you for tell me, sir. I will tell the restaurant manager now.",
          "Thank you, sir. I promise it will never happen again.",
          undefined,
          "Câu cuối hứa điều bạn không kiểm soát được. Câu đúng cảm ơn khách và báo người có trách nhiệm.",
        ),
      ],
    }),

    L(27, 2, "Sorry Is Not a Verdict", "Xin lỗi chưa phải là nhận lỗi", {
      vocabulary: [
        c("Disappointed", "I understand you are disappointed, madam."),
        c("Overcooked steak", "An overcooked steak goes back to the kitchen at once."),
        c("Wrong order", "If a guest gets the wrong order, I apologise and fix it."),
        c("Missing dish", "Table six has a missing dish, so I will check with the kitchen."),
      ],
      grammar: [
        g(
          "Our mistake, chef bad.",
          "I am sorry your steak is overcooked, sir. I will ask for a new one.",
          "Xin lỗi về điều khách gặp, không kết luận lỗi của ai. 'ask for + thứ cần xin' — thiếu 'for' là sai.",
          "I am sorry your steak is overcooked, sir. I will ask a new one.",
        ),
        g(
          "You disappointing? Sorry.",
          "I understand you are disappointed, madam.",
          "'disappointed' = người cảm thấy thất vọng; 'disappointing' = thứ gây thất vọng.",
          "I understand you are disappointing, madam.",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "My wife feels sick after eating this fish.",
              t2a,
              "Khách nói bị mệt sau khi ăn: hỏi ngay có cần sơ cứu không. Không đoán nguyên nhân.",
              undefined,
              ["call", "first", "aid"],
            ),
            [
              "I am very sorry, sir. Shall I call first aid for her?",
              "I am very sorry, sir. Shall I call first aid now?",
            ],
          ),
        ),
        sp(
          "No, she just needs some air. But I want to see the manager.",
          t2b,
          "Khách muốn gặp quản lý: đồng ý ngay, không giữ khách lại.",
          undefined,
          undefined,
          t2a,
        ),
        risk(
          also(
            sp(
              "Take this fish away. I do not want to see it.",
              t2c,
              "Không vứt món ăn: mang đĩa tới quản lý để kiểm tra.",
              undefined,
              ["take", "plate", "manager", "check"],
            ),
            [
              "I will take the plate to my manager, sir. She has to check it.",
              "I will take the plate to the manager, sir, so she can check it.",
            ],
          ),
        ),
        sp(
          "Was it bad fish? Is it the kitchen's fault?",
          t2d,
          "Ôn tuần 26: không nhận lỗi, không đổ cho bếp. Chưa ai kiểm tra thì chưa có kết luận.",
          undefined,
          ["head", "chef"],
        ),
        sp(
          "Any problems on your tables?",
          "Table four sent back an overcooked steak, and table six has a missing dish.",
          "Nói với bếp: bàn nào, món gì — ngắn, không trách ai.",
          "colleague",
        ),
        sp(
          "This is not what I ordered. I asked for the fish.",
          "I am so sorry, madam, that is the wrong order. I will check with the kitchen team now.",
          "Không giải thích ai ghi nhầm — xin lỗi và nhận việc sửa.",
        ),
        sp(
          "I am really disappointed with dinner tonight.",
          "I understand you are disappointed, madam. Thank you for telling me.",
          "Công nhận cảm xúc. Không tranh luận.",
        ),
      ],
      reading: read(
        `At table four, Mrs Novak feels sick after eating the fish. Duc first asks her husband if she needs first aid. She only needs some air, but Mr Novak wants the manager, so Duc calls her at once. He does not say the fish was bad, and he does not blame the kitchen. He takes the plate to the manager, so she can check it with the head chef. Later, the manager calls Mr Novak to ask how his wife is feeling.`,
        [
          {
            q: "Đức làm gì ĐẦU TIÊN?",
            options: [
              "Mang đĩa cá tới quản lý",
              "Hỏi khách có cần sơ cứu không",
              "Gọi bếp trưởng ra bàn",
            ],
            correct: 1,
            explanation:
              "'Duc first asks her husband if she needs first aid' — sức khỏe của khách trước, mọi việc khác sau.",
          },
          {
            q: "Đức làm gì với đĩa cá?",
            options: [
              "Đổ đi ngay để khách không phải nhìn thấy",
              "Mang trả bếp để làm một đĩa khác",
              "Mang tới quản lý để kiểm tra",
            ],
            correct: 2,
            explanation:
              "'He takes the plate to the manager, so she can check it' — món ăn là bằng chứng, không vứt đi.",
          },
          {
            q: "Vì sao Đức không nói cá bị hỏng?",
            options: [
              "Vì chưa ai kiểm tra nên chưa biết nguyên nhân",
              "Vì quản lý cấm nhân viên nói về món ăn",
              "Vì Đức nghĩ khách nói không đúng sự thật về món cá",
            ],
            correct: 0,
            explanation:
              "'He does not say the fish was bad' — đĩa cá còn đang chờ quản lý và bếp trưởng kiểm tra; nói trước là kết luận vội.",
          },
        ],
      ),
      game: [
        game(
          "Everyone at my table has eaten, but my dish never came.",
          "I am sorry, madam. I will check your dish with the kitchen now.",
          "I am sorry, madam. I will checking your dish with the kitchen now.",
          "It was our mistake, madam. The kitchen forgot your order again tonight.",
          undefined,
          "Câu cuối nhận lỗi và đổ cho bếp khi chưa ai kiểm tra. Câu đúng xin lỗi về điều khách gặp và đi kiểm tra.",
        ),
        game(
          "I think the prawns made my wife ill.",
          "I am very sorry, sir. Shall I call first aid for her now?",
          "I am very sorry, sir. Shall I calling first aid for her now?",
          "The prawns are always fresh here, sir. It must be something else.",
          undefined,
          "Câu cuối cãi lại và đoán nguyên nhân. Câu đúng lo cho khách trước: hỏi có cần sơ cứu không.",
        ),
      ],
    }),

    L(27, 3, "Getting the Facts", "Hỏi cho rõ sự việc", {
      vocabulary: [
        c("Billing mistake", "A billing mistake is checked by the manager, not by the waiter."),
        c("Itemised bill", "The itemised bill shows every dish and every drink.", [
          "/ˈaɪtəmaɪzd bɪl/",
          "Hóa đơn ghi chi tiết từng món",
          "🧾",
        ]),
        c("Salty soup", "A salty soup goes back to the kitchen with a note."),
        c("Warm beer", "A warm beer goes back to the bar for a cold one."),
      ],
      grammar: [
        g(
          "When? Tell me.",
          "Which dish was too salty, madam?",
          "Hỏi điều khách CHƯA nói. 'Which dish' là một món: 'was', không phải 'were'.",
          "Which dish were too salty, madam?",
        ),
        g(
          "Bill wrong? No.",
          "I will ask the manager to check the bill with you, sir.",
          "Sau 'to' động từ ở dạng gốc: 'to check'. Người kiểm hóa đơn là quản lý.",
          "I will ask the manager to checking the bill with you, sir.",
        ),
      ],
      speaking: [
        sp(
          "There are two bottles of wine on my bill. We only had one.",
          t3a,
          "Hỏi cho rõ bằng giấy tờ: hóa đơn chi tiết, xem cùng khách.",
        ),
        sp(
          "Here. This red wine is on it twice.",
          t3b,
          "Ôn tuần 26: bạn không tự sửa hóa đơn. Quản lý kiểm tra cùng thu ngân.",
          undefined,
          ["cashier"],
          t3a,
        ),
        sp(
          "How long will this take?",
          t3c,
          "Hứa phần việc của bạn — quay lại có mốc.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "What is happening at table nine?",
          "The guest thinks there is a billing mistake. Can you check the wine with the cashier?",
          "Báo quản lý: khách nghĩ gì (chưa phải kết luận) + việc cần quản lý làm.",
          "manager",
        ),
        sp(
          "Why did this soup come back?",
          "Table two sent back a salty soup. Can we have a new one, please?",
          "Nói với bếp: món gì, bàn nào, cần gì.",
          "colleague",
        ),
        sp(
          "This beer is warm.",
          "I am sorry, sir. I will change your warm beer for a cold one.",
          "Việc nhỏ: xin lỗi và thay ngay.",
        ),
        sp(
          "Why is there a minimum spend on our bill?",
          "The minimum spend is for the private dining room, sir. The cashier can show you.",
          "Ôn tuần 23–24: lý do của khoản tiền + đúng người giải thích.",
          undefined,
          ["minimum", "spend"],
        ),
        sp(
          "I want to ask about last night's bill.",
          "Of course, sir. I will transfer your call to the cashier now.",
          "Ôn tuần 26: đúng người giải thích hóa đơn — chuyển máy, đừng đoán.",
          undefined,
          ["transfer", "cashier"],
        ),
      ],
      reading: read(
        `Mr Okafor finds two bottles of red wine on his bill, but his table had one. Hai brings him an itemised bill, and they check it together. Hai does not change the bill himself. He asks the manager, who checks the order with the cashier. The second bottle was from another table, so the manager corrects the bill. Hai comes back within five minutes, as he promised. Mr Okafor thanks him, because nobody argued with him about the bill.`,
        [
          {
            q: "Hải mang gì tới cho khách?",
            options: [
              "Một ly vang để xin lỗi",
              "Thực đơn rượu vang",
              "Hóa đơn ghi chi tiết từng món",
            ],
            correct: 2,
            explanation:
              "'Hai brings him an itemised bill, and they check it together' — hỏi cho rõ bằng giấy tờ, cùng khách.",
          },
          {
            q: "Ai sửa hóa đơn?",
            options: [
              "Hải, ngay tại bàn của khách",
              "Quản lý, sau khi kiểm tra với thu ngân",
              "Thu ngân, theo lời của khách",
            ],
            correct: 1,
            explanation:
              "'the manager corrects the bill' — sửa hóa đơn là việc của quản lý, sau khi đã kiểm tra.",
          },
          {
            q: "Vì sao chai vang thứ hai có trên hóa đơn?",
            options: [
              "Vì nó là của một bàn khác bị ghi nhầm",
              "Vì khách đã quên rằng mình gọi thêm một chai nữa",
              "Vì Hải cố ý tính thêm",
            ],
            correct: 0,
            explanation:
              "'The second bottle was from another table' — kiểm tra rồi mới biết, nên không ai phải đoán hay đổ lỗi trước.",
          },
        ],
      ),
      game: [
        game(
          "I think you charged us for a dessert we never had.",
          "I am sorry, sir. I will ask the manager to check the bill now.",
          "I am sorry, sir. I will ask the manager to checking the bill now.",
          "Do not worry, sir. I will take the dessert off the bill myself right now.",
          undefined,
          "Câu cuối tự sửa hóa đơn — việc của quản lý. Câu đúng xin lỗi và mời người có quyền kiểm tra.",
        ),
        game(
          "Why is my beer not cold?",
          "I am sorry, sir. I will bring you a cold one from the bar.",
          "I am sorry, sir. I will brings you a cold one from the bar.",
          "Local beer is often served cool, not cold, sir.",
          undefined,
          "Câu cuối nghe có lý nhưng bác điều khách cảm thấy. Câu đúng xin lỗi và thay ngay.",
        ),
      ],
    }),

    L(27, 4, "Staying Calm — Safety First", "Giữ bình tĩnh — an toàn trước", {
      vocabulary: [
        c("First aid", "I am calling first aid and the manager now.", [
          "/ˌfɜːst ˈeɪd/",
          "Sơ cứu",
          "🩹",
        ]),
        c("Wet floor sign", "I put a wet floor sign by the spilled juice.", [
          "/wet flɔː saɪn/",
          "Biển báo sàn ướt",
          "⚠️",
        ]),
        c("Chipped glass", "A chipped glass is never served to a guest.", [
          "/tʃɪpt ɡlɑːs/",
          "Ly bị sứt mẻ",
          "🥂",
        ]),
        c("Lost reservation", "A lost reservation goes straight to the restaurant manager."),
      ],
      grammar: [
        g(
          "Calm down!",
          "I understand, sir. I will stay with you until the manager comes.",
          "Không bảo khách 'bình tĩnh'. Sau 'until' dùng hiện tại: 'comes', không dùng 'will'.",
          "I understand, sir. I will stay with you until the manager will come.",
        ),
        g(
          "Glass broken, no problem.",
          "Please do not drink from that glass, madam. It is chipped.",
          "Cảnh báo an toàn: 'Please do not + động từ'. Thiếu 'do' là sai.",
          "Please not drink from that glass, madam. It is chipped.",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "Help! My husband ate a prawn, and he cannot breathe!",
              t4a,
              "Phản ứng dị ứng tại bàn: gọi sơ cứu và quản lý NGAY, trước mọi việc khác. Bạn không tự chữa cho khách.",
              undefined,
              ["calling", "first", "aid", "manager"],
            ),
            [
              "I will call first aid and the manager now, madam.",
              "I am calling an ambulance and the manager now, madam.",
              "Please sit down, madam. I am calling our manager and first aid now.",
            ],
          ),
        ),
        sp(
          "What should I do? Please help us!",
          t4b,
          "Hỏi khách có mang thuốc dị ứng của chính mình không.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "Yes, it is in my bag.",
          t4c,
          "Thuốc của chính khách thì khách dùng. Bạn không đưa thuốc nào khác.",
          undefined,
          undefined,
          t4b,
        ),
        risk(
          also(
            sp(
              "Ouch! The hot soup went all over my arm!",
              "I am very sorry, sir. I am calling first aid and bringing cold water now.",
              "Bỏng do súp nóng: xin lỗi, gọi sơ cứu, mang nước lạnh. Không tranh luận lỗi của ai.",
              undefined,
              ["calling", "first", "aid", "bringing", "cold", "water"],
            ),
            ["I am very sorry, sir. I will call first aid and bring cold water now."],
          ),
        ),
        sp(
          "Careful! Someone spilled juice by the buffet.",
          "Thank you, madam. I am putting a wet floor sign there straight away.",
          "An toàn trước: biển báo sàn ướt, rồi mới lau.",
        ),
        sp(
          "My glass has a small crack at the top.",
          "I am sorry, madam, that is a chipped glass. I will bring a new one and tell the stewarding team.",
          "Ly sứt mẻ không bao giờ dùng tiếp — thay ngay.",
        ),
        sp(
          "Why is that man shouting at the door?",
          "It is a lost reservation. I have called the reservations team.",
          "Ôn tuần 26: báo quản lý ngắn gọn — chuyện gì, bạn đã gọi ai.",
          "manager",
          ["reservations", "team"],
        ),
      ],
      reading: read(
        `At table seven, Mr Chen eats a prawn and suddenly cannot breathe well. His wife shouts for help. Thu does not try to treat him. She calls first aid and the manager at once, and then she asks if he has his own allergy medicine. The manager calls 115 for an ambulance, and first aid arrives in two minutes. Thu stays with the family until then, and a colleague puts a wet floor sign by the spilled water. After service, the manager thanks Thu for staying calm.`,
        [
          {
            q: "Thu làm gì đầu tiên?",
            options: [
              "Cho ông Chen uống thật nhiều nước",
              "Gọi sơ cứu và quản lý ngay",
              "Hỏi bếp trong món có những gì",
            ],
            correct: 1,
            explanation:
              "'She calls first aid and the manager at once' — người có chuyên môn tới trước, mọi việc khác sau.",
          },
          {
            q: "Thu hỏi vợ ông Chen điều gì?",
            options: [
              "Ông có mang thuốc dị ứng của mình không",
              "Ông đã ăn tất cả bao nhiêu con tôm rồi",
              "Hai ông bà có muốn đổi sang món khác không",
            ],
            correct: 0,
            explanation:
              "'asks if he has his own allergy medicine' — thuốc của chính khách, không phải thuốc nhân viên tự đưa.",
          },
          {
            q: "Vì sao đồng nghiệp đặt biển báo sàn ướt?",
            options: [
              "Vì quản lý sắp tới kiểm tra toàn bộ khu vực nhà hàng",
              "Vì bàn số bảy cần được dọn ngay",
              "Để không ai trượt ngã khi người khác chạy tới",
            ],
            correct: 2,
            explanation:
              "Bài không nói thẳng, nhưng nước đã đổ và sơ cứu sắp chạy tới — một tai nạn thứ hai là điều phải chặn trước.",
          },
        ],
      ),
      game: [
        game(
          "Quick! My husband is having a reaction to the nuts!",
          "I am calling first aid and the manager now, madam.",
          "I am call first aid and the manager now, madam.",
          "Let me give him some water and a lemon, madam. That usually helps.",
          undefined,
          "Câu cuối tự chữa cho khách. Câu đúng gọi người có chuyên môn và quản lý ngay.",
        ),
        game(
          "There is a crack in my glass.",
          "I am sorry, madam. Please do not drink from it. I will bring a new one.",
          "I am sorry, madam. Please not drink from it. I will bring a new one.",
          "It is only a small crack, madam. It is still fine to use.",
          undefined,
          "Câu cuối để khách dùng ly sứt mẻ — nguy hiểm. Câu đúng cảnh báo và thay ngay.",
        ),
      ],
    }),
  ];
}

// ── Week 28 — Offering what a waiter may offer ──────────────────────────
function week28(): LessonContent[] {
  const t1a = "I am sorry, sir. If you like, I can replace the dish.";
  const t1b = "The kitchen says ten minutes, sir. I will bring it straight to you.";
  const t1c = "Of course, sir. If there is any delay, I will tell you at once.";
  const t2a = "I am very sorry, sir. I will tell the manager about the overcooked steak now.";
  const t2b = "You can choose either option, sir: a new steak or a different dish.";
  const t2c = "A different dish is quicker, sir. A new steak takes fifteen minutes.";
  const t2d = "Of course, sir. I will ask the host to move you to another table.";
  const t3a = "I am sorry, madam. If you like, I will bring a different drink.";
  const t3b = "Of course, madam. I will ask the bar team for a fresh juice now.";
  const t3c = "If you do not like it, please tell me. I will bring you the drinks menu.";
  const t4a = "I am sorry, madam, I cannot remove it from the bill. I will ask my manager to come.";
  const t4b = "I am sorry, madam, I cannot offer anything complimentary. My manager is coming now.";
  const t4c = "If you like, I can clear the table and top up your water, madam.";
  return [
    L(28, 1, "If You Like, I Can…", "Nếu quý khách muốn, tôi có thể…", {
      vocabulary: [
        c("Replace the dish", "If you like, I can replace the dish with the grilled fish."),
        c("Bring a fresh one", "If the bread is hard, I will bring a fresh one."),
        c("Medium rare", "A medium rare steak is pink in the middle.", [
          "/ˈmiːdiəm reə/",
          "Tái vừa (thịt bò chín tới, giữa còn hồng)",
          "🥩",
        ]),
        c("Cook a new steak", "The kitchen can cook a new steak in fifteen minutes."),
      ],
      grammar: [
        g(
          "I change food.",
          "If you like, I can replace the dish, madam.",
          "Câu điều kiện lịch sự 'If you like, I can…' — đề nghị nhưng để khách quyết. Sau 'can' không có 'to'.",
          "If you like, I can to replace the dish, madam.",
        ),
        g(
          "Steak again, wait.",
          "If you send it back, the kitchen will cook a new steak.",
          "Câu điều kiện loại 1: mệnh đề 'If' dùng hiện tại ('you send'); 'will' chỉ ở mệnh đề chính.",
          "If you will send it back, the kitchen will cook a new steak.",
        ),
      ],
      speaking: [
        sp(
          "My pasta is cold.",
          t1a,
          "Khung của tuần: If you like, I can + việc bạn được phép làm.",
        ),
        sp(
          "How long will a new one take?",
          t1b,
          "Giờ của bếp thì nói là bếp báo, rồi hứa phần việc của bạn.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Fine, please do that.",
          t1c,
          "Câu điều kiện về chuyện có thể xảy ra: nếu trễ, bạn báo ngay.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "This bread is very hard.",
          "I am sorry, madam. If you like, I will bring a fresh one.",
          "Xin lỗi + đề nghị có điều kiện. Thay món là việc trong quyền của bạn.",
        ),
        sp(
          "I like my steak pink in the middle.",
          "Of course, sir. I will ask the kitchen to cook it medium rare.",
          "Nói đúng tên mức chín với bếp.",
        ),
        sp(
          "This steak is not medium rare. It is well done.",
          "I am sorry, sir. If you like, the kitchen will cook a new steak in fifteen minutes.",
          "Đề nghị có điều kiện + thời gian làm lại đúng một con số cho cả khoá: mười lăm phút.",
        ),
        sp(
          "My soup is cold again.",
          "I apologise for the cold food, madam. I will replace the dish now.",
          "Ôn tuần 27: xin lỗi đúng điều khách gặp + việc bạn làm ngay.",
          undefined,
          ["cold", "food", "apologise"],
        ),
        sp(
          "This is not the soup I ordered from room service.",
          "I am sorry, madam, that is the wrong order. The room service team will replace the dish.",
          "Ôn tuần 26–27: tên vấn đề + đúng tổ sửa lỗi.",
          undefined,
          ["wrong", "order", "room", "service", "team"],
        ),
      ],
      reading: read(
        `Mrs Tanaka's pasta is cold. Hoa apologises and says: "If you like, I can replace the dish." Mrs Tanaka asks how long a new one will take. Hoa checks with the kitchen and tells her ten minutes. The kitchen makes a fresh pasta, and Hoa brings it herself. She does not just reheat the cold one, and she does not offer anything complimentary. Mrs Tanaka says the new pasta is very good, and Hoa tells the kitchen.`,
        [
          {
            q: "Hoa đề nghị gì đầu tiên?",
            options: [
              "Mời khách một món tráng miệng miễn phí",
              "Đổi món mới cho khách",
              "Hâm nóng lại đĩa mì cũ",
            ],
            correct: 1,
            explanation:
              "'If you like, I can replace the dish' — đề nghị có điều kiện, khách quyết.",
          },
          {
            q: "Hoa nói thời gian chờ là bao lâu, và ai cho biết?",
            options: [
              "Năm phút, do Hoa tự đoán",
              "Mười lăm phút, do quản lý báo",
              "Mười phút, sau khi hỏi bếp",
            ],
            correct: 2,
            explanation:
              "'Hoa checks with the kitchen and tells her ten minutes' — giờ của bếp, bếp xác nhận.",
          },
          {
            q: "Vì sao Hoa không chỉ hâm nóng đĩa mì cũ?",
            options: [
              "Vì món khách đã trả lại cần được làm mới",
              "Vì lò hâm nóng của bếp tối hôm đó đang bị hỏng",
              "Vì khách muốn đổi sang món khác",
            ],
            correct: 0,
            explanation:
              "Bài không nói thẳng, nhưng món đã trả lại thì làm mới, không hâm lại rồi mang ra — đó là tiêu chuẩn phục vụ.",
          },
        ],
      ),
      game: [
        game(
          "This curry is only warm, not hot.",
          "I am sorry, madam. If you like, I can replace the dish.",
          "I am sorry, madam. If you like, I can to replace the dish.",
          "It is fine to eat, madam. It is often warm.",
          undefined,
          "Câu cuối phủ nhận điều khách cảm thấy. Câu đúng xin lỗi và đưa giải pháp để khách chọn.",
        ),
        game(
          "I asked for medium rare, but this is well done.",
          "I am sorry, sir. The kitchen will cook a new steak in fifteen minutes.",
          "I am sorry, sir. The kitchen will cooking a new steak in fifteen minutes.",
          "It is only a little overdone, sir. Most guests like it this way.",
          undefined,
          "Câu cuối phủ nhận điều khách gọi. Câu đúng xin lỗi, làm lại, và nói đúng thời gian làm lại.",
        ),
      ],
    }),

    L(28, 2, "Two Options — and Who Decides", "Hai lựa chọn — và ai quyết", {
      vocabulary: [
        c("Either", "Either option is fine with the kitchen."),
        c("Move you to another table", "I can ask the host to move you to another table."),
        c("Cancel the order", "Only the kitchen can tell me if we can still cancel the order."),
        c("Vegan", "A vegan dish has no meat, fish, egg or milk.", [
          "/ˈviːɡən/",
          "Thuần chay (không thịt, cá, trứng, sữa)",
          "🌱",
        ]),
      ],
      grammar: [
        g(
          "Two way. Choose.",
          "There are two options, sir: a new steak or a different dish.",
          "'two options' số nhiều: 'There are', không phải 'There is'.",
          "There is two options, sir: a new steak or a different dish.",
        ),
        g(
          "I move you.",
          "If you prefer, I will ask the host to move you to another table.",
          "Xếp bàn là việc của người đón khách: 'ask + the host + to + động từ'.",
          "If you prefer, I will ask the host moving you to another table.",
        ),
      ],
      speaking: [
        sp(
          "My steak is overcooked again.",
          t2a,
          "Lỗi lặp lại lần hai: xin lỗi và báo quản lý NGAY, trước khi bàn chuyện món.",
        ),
        sp(
          "So what can you do about my dinner?",
          t2b,
          "Hai lựa chọn trong quyền của bạn, rồi để khách chọn.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Which one is quicker?",
          t2c,
          "Giúp khách chọn bằng thông tin thật: thời gian làm lại — mười lăm phút.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "A new steak, please. And can we sit away from the door?",
          t2d,
          "Đổi bàn: bạn nhờ người đón khách, không tự hứa bàn nào.",
          undefined,
          undefined,
          t2c,
        ),
        sp(
          "I am vegan. Which dishes can I eat?",
          "I will check with the chef which dishes are vegan, madam.",
          "Khách thuần chay: không đoán theo tên món — hỏi bếp.",
          undefined,
          ["check", "chef", "dishes", "vegan"],
        ),
        sp(
          "We have to leave now. Our food is not here yet.",
          "I am sorry, sir. I will ask the kitchen if we can still cancel the order.",
          "Hủy món tuỳ bếp đã nấu hay chưa — bạn hỏi, không tự hứa.",
        ),
        sp(
          "We are not ready for dessert yet.",
          "Of course, madam. I will hold the dessert until you are ready.",
          "Ôn tuần 25: làm theo nhịp của khách.",
          undefined,
          ["hold", "dessert"],
        ),
        sp(
          "My son cannot eat nuts. Can he still have a dessert?",
          "If you like, the chef can prepare a nut-free dish. Our kitchen does handle nuts, madam.",
          "Ôn tuần 25: đề nghị có điều kiện, và luôn nói cảnh báo nhiễm chéo.",
          undefined,
          ["prepare", "nut", "free", "dish"],
        ),
      ],
      reading: read(
        `Mr Weber's steak comes back overcooked a second time. Khoa apologises and tells the manager at once, because it has happened twice. Then he gives Mr Weber two options: a new steak in fifteen minutes, or a different dish now. Mr Weber chooses the steak and asks to sit away from the door. Khoa asks the host, who moves them to a table by the window. The manager visits before the new steak arrives. Mr Weber says he will come back next week.`,
        [
          {
            q: "Vì sao Khoa báo quản lý ngay?",
            options: [
              "Vì khách đòi gặp quản lý",
              "Vì món bò bị trả lại lần thứ hai",
              "Vì khách muốn đổi bàn",
            ],
            correct: 1,
            explanation:
              "'tells the manager at once, because it has happened twice' — lỗi lặp lại là việc của cấp trên.",
          },
          {
            q: "Ai chuyển chỗ cho ông Weber?",
            options: ["Bếp trưởng", "Quản lý nhà hàng", "Người đón khách"],
            correct: 2,
            explanation:
              "'Khoa asks the host, who moves them' — xếp bàn là việc của người đón khách.",
          },
          {
            q: "Việc nào xảy ra SAU CÙNG?",
            options: [
              "Quản lý tới bàn trước khi món bò mới ra",
              "Khoa đưa hai lựa chọn cho ông Weber và chờ ông chọn",
              "Ông Weber xin đổi chỗ xa cửa",
            ],
            correct: 0,
            explanation:
              "Thứ tự: báo quản lý → hai lựa chọn → khách chọn và xin đổi chỗ → đổi bàn → quản lý tới trước khi món mới ra.",
          },
        ],
      ),
      game: [
        game(
          "What can you do about this steak?",
          "You have two options, sir: a new steak or a different dish.",
          "You have two option, sir: a new steak or a different dish.",
          "Nothing, I am afraid, sir. The chef always cooks the steak this way.",
          undefined,
          "Câu cuối khép mọi lối ra cho khách. Câu đúng đưa hai lựa chọn trong quyền của bạn.",
        ),
        game(
          "I am vegan. Is the vegetable curry all right for me?",
          "I will check with the chef if it is vegan, madam.",
          "I will check with the chef if it vegan, madam.",
          "Yes, madam, it is only vegetables, so it must be vegan.",
          undefined,
          "Câu cuối đoán theo tên món — nước cốt hay nước mắm có thể không thuần chay. Câu đúng hỏi bếp.",
        ),
      ],
    }),

    L(28, 3, "If It Happens Again", "Nếu chuyện lặp lại", {
      vocabulary: [
        c("Bring a different drink", "If you do not like it, I will bring a different drink."),
        c("Wrap it to take away", "If you cannot finish it, I can wrap it to take away."),
        c("Card machine", "I will bring our card machine to your table.", [
          "/kɑːd məˈʃiːn/",
          "Máy quẹt thẻ",
          "💳",
        ]),
      ],
      grammar: [
        g(
          "Not like? Change.",
          "If you do not like it, I will bring a different drink, madam.",
          "Câu điều kiện loại 1: If + hiện tại, will + động từ. Thiếu 'will' là sai.",
          "If you do not like it, I bring a different drink, madam.",
        ),
        g(
          "Pay card? Okay.",
          "If you pay by card, I will bring our card machine to the table.",
          "Mệnh đề 'If' dùng hiện tại: 'you pay', không dùng 'will pay'.",
          "If you will pay by card, I will bring our card machine to the table.",
        ),
      ],
      speaking: [
        sp(
          "This cocktail is too strong for me.",
          t3a,
          "Đổi đồ uống khách không hợp là việc trong quyền của bạn.",
        ),
        sp(
          "Yes, please. Something without alcohol.",
          t3b,
          "Khách đã chọn — làm đúng điều khách muốn, không đề nghị thêm.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "And if I do not like that one?",
          t3c,
          "Câu điều kiện cho chuyện có thể xảy ra tiếp theo.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "I cannot finish this. It is too much.",
          "Of course, madam. If you like, I can wrap it to take away.",
          "Đề nghị nhỏ, đúng lúc, để khách chọn.",
        ),
        sp(
          "Can I pay by card here at the table?",
          "Of course, sir. I will bring our card machine to your table now.",
          "Thanh toán tại bàn: khách không phải đứng dậy.",
        ),
        sp(
          "Can we have dessert now? The table is still messy.",
          "Of course, madam. If you like, I will reset your table first.",
          "Ôn tuần 25: đề nghị có điều kiện cho việc nhỏ của bạn.",
          undefined,
          ["reset", "table"],
        ),
        sp(
          "One more whisky, then I will drive home.",
          "I am sorry, sir, I cannot serve you more alcohol. May I arrange a taxi?",
          "Ôn tuần 26: khách đã uống và định lái xe — không rót thêm, đề nghị gọi xe.",
          undefined,
          ["serve", "alcohol", "arrange"],
        ),
        risk(
          also(
            sp(
              "There is a little boy alone at the hot buffet station.",
              "Please move him away from the hot station. I am calling the manager now.",
              "Trẻ một mình cạnh quầy nóng: đưa em ra xa trước, gọi quản lý ngay. Nói với đồng nghiệp: ngắn và rõ.",
              "colleague",
              ["move", "away", "hot", "station", "calling", "manager"],
            ),
            [
              "Please move him away from the hot station. I am calling my manager now.",
              "I am calling the manager now. Please move him away from the hot station.",
            ],
          ),
        ),
      ],
      reading: read(
        `Ms Rossi finds her cocktail too strong, so Phuong offers a different drink. Ms Rossi chooses a fresh juice. Later, she cannot finish her noodles, and Phuong offers to wrap them to take away. At the end, Ms Rossi wants to pay by card. Phuong brings the card machine and an itemised bill to the table. Ms Rossi does not stand up once, and she leaves a kind note for the team. Phuong shows the note to her manager.`,
        [
          {
            q: "Bà Rossi chọn đồ uống nào thay cho ly cocktail?",
            options: ["Một ly nước trái cây tươi", "Một ly vang có ga", "Một ly cà phê"],
            correct: 0,
            explanation: "'Ms Rossi chooses a fresh juice' — bạn đề nghị, khách chọn.",
          },
          {
            q: "Phương mang gì ra bàn lúc khách thanh toán?",
            options: [
              "Thực đơn tráng miệng và một ly nước",
              "Máy quẹt thẻ và hóa đơn chi tiết",
              "Hộp mang về và túi giấy",
            ],
            correct: 1,
            explanation:
              "'Phuong brings the card machine and an itemised bill to the table' — thanh toán tại bàn.",
          },
          {
            q: "Vì sao bà Rossi không phải đứng dậy lần nào?",
            options: [
              "Vì nhà hàng đã tặng bà một món tráng miệng miễn phí cuối bữa",
              "Vì bà được giảm giá ly cocktail",
              "Vì máy quẹt thẻ và hóa đơn được mang ra tận bàn",
            ],
            correct: 2,
            explanation:
              "'Phuong brings the card machine and an itemised bill to the table' — mọi việc khách cần đều được mang tới bàn.",
          },
        ],
      ),
      game: [
        game(
          "What if the food is late again next time?",
          "If it happens again, please tell me at once, sir. I will tell the manager.",
          "If it will happen again, please tell me at once, sir. I will tell the manager.",
          "It will never happen again, sir. I can promise you that myself.",
          undefined,
          "Câu cuối hứa điều bạn không kiểm soát được. Câu đúng nói cách xử lý nếu chuyện lặp lại.",
        ),
        game(
          "Look, a small boy is alone by the hot soup station.",
          "Please move him away from the hot station. I am calling the manager now.",
          "Please move him away from the hot station. I am call the manager now.",
          "His parents must be nearby. He will be fine.",
          "colleague",
          "Câu cuối đoán và bỏ mặc một đứa trẻ cạnh nồi nóng. Câu đúng đưa em ra xa trước, gọi quản lý ngay.",
        ),
      ],
    }),

    L(28, 4, "When You Must Say No", "Khi phải từ chối", {
      vocabulary: [
        c("Remove it from the bill", "Only the manager can remove it from the bill."),
        c("Ask my manager to come", "I will ask my manager to come to your table."),
        c("Complimentary", "Anything complimentary is the manager's decision.", [
          "/ˌkɒmplɪˈmentri/",
          "Miễn phí (nhà hàng mời)",
          "🎁",
        ]),
        c("Take off the service charge", "Only the manager can take off the service charge.", [
          "/teɪk ɒf ðə ˈsɜːvɪs tʃɑːdʒ/",
          "Bỏ phí phục vụ khỏi hóa đơn",
          "💵",
        ]),
      ],
      grammar: [
        g(
          "Free? No.",
          "I am sorry, madam, I cannot remove it from the bill.",
          "Bạn không sửa hóa đơn. Sau 'cannot' động từ ở dạng gốc, không có 'to'.",
          "I am sorry, madam, I cannot to remove it from the bill.",
        ),
        g(
          "Manager busy.",
          "If you like, I will ask my manager to come to your table.",
          "'ask my manager to come' — có 'to' trước 'come'.",
          "If you like, I will ask my manager come to your table.",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "The steak was terrible. Take it off the bill.",
              t4a,
              "Câu thẩm quyền của tuần: bạn KHÔNG bỏ món khỏi hóa đơn. Mời quản lý tới — ngay.",
              undefined,
              ["remove", "bill", "ask", "manager", "come"],
            ),
            [
              "I am sorry, madam, I cannot remove it from the bill. I will ask the manager to come.",
              "I am sorry, madam, I cannot take it off the bill. I will ask my manager to come.",
            ],
          ),
        ),
        risk(
          also(
            sp(
              "Then give us a free dessert at least.",
              t4b,
              "Đồ miễn phí cũng là quyết định của quản lý. Từ chối ngắn, không tranh luận.",
              undefined,
              ["offer", "anything", "complimentary", "manager", "coming"],
              t4a,
            ),
            ["I am sorry, madam, I cannot offer a free dessert. My manager is coming now."],
          ),
        ),
        sp(
          "What can you do while we wait for your manager?",
          t4c,
          "Ôn tuần 25: sau lời từ chối, đưa ngay việc bạn được làm.",
          undefined,
          ["top", "water"],
        ),
        risk(
          also(
            sp(
              "The service was slow. Take off the service charge.",
              "I am sorry, sir, I cannot take off the service charge. My manager can review it with you.",
              "Phí phục vụ cũng là tiền — chuyển quản lý xem xét.",
              undefined,
              ["take", "service", "charge", "manager", "review"],
            ),
            [
              "I am sorry, sir, I cannot take off the service charge. I will ask my manager to come.",
            ],
          ),
        ),
        sp(
          "You spilled red wine on my dress!",
          "I am very sorry, madam, are you all right? I will ask my manager about the dry cleaning.",
          "Lo cho khách trước; tiền giặt là quyết định của quản lý — bạn không tự hứa.",
          undefined,
          ["ask", "manager"],
        ),
        sp(
          "I am so disappointed with this evening.",
          "I understand you are disappointed, sir. My manager is coming to speak with you.",
          "Ôn tuần 27: công nhận cảm xúc, rồi người có quyền tới.",
          undefined,
          ["disappointed"],
        ),
      ],
      reading: read(
        `Mrs Brown says her steak was terrible and asks Quang to take it off the bill. Quang apologises, but he does not remove it from the bill himself. He says: "I will ask my manager to come." When she asks for a free dessert, he explains that he cannot offer anything complimentary. While they wait, he clears the table and tops up the water. The manager arrives within five minutes and talks with Mrs Brown.`,
        [
          {
            q: "Quang làm gì khi khách đòi bỏ món khỏi hóa đơn?",
            options: [
              "Tự bỏ món đó vì khách không hài lòng",
              "Xin lỗi và mời quản lý tới bàn",
              "Nói món bò không có vấn đề",
            ],
            correct: 1,
            explanation:
              "'he does not remove it from the bill himself… I will ask my manager to come' — xin lỗi thì được, sửa hóa đơn thì không.",
          },
          {
            q: "Trong lúc chờ quản lý, Quang làm gì?",
            options: [
              "Mời khách một món tráng miệng",
              "Đứng chờ ở quầy thu ngân",
              "Dọn bàn và rót thêm nước",
            ],
            correct: 2,
            explanation:
              "'he clears the table and tops up the water' — vẫn phục vụ trong quyền của mình khi chờ quản lý.",
          },
          {
            q: "Vì sao Quang không mời món tráng miệng miễn phí?",
            options: [
              "Vì đồ miễn phí không thuộc quyền của Quang",
              "Vì món tráng miệng hôm đó đã hết từ đầu buổi tối",
              "Vì khách đã gọi món tráng miệng rồi",
            ],
            correct: 0,
            explanation:
              "'he cannot offer anything complimentary' — mời miễn phí là quyết định của quản lý.",
          },
        ],
      ),
      game: [
        game(
          "Just remove the wine from the bill, and we will be happy.",
          "I am sorry, madam, I cannot remove it from the bill. I will ask my manager to come.",
          "I am sorry, madam, I cannot to remove it from the bill. I will ask my manager to come.",
          "Of course, madam. I will remove it from the bill now.",
          undefined,
          "Câu cuối tự sửa hóa đơn và giấu cấp trên — vượt quyền. Câu đúng không hứa, chuyển ngay cho quản lý.",
        ),
        game(
          "Our dinner was late, so the coffee is free, right?",
          "I am sorry, sir, I cannot offer anything complimentary. My manager is coming now.",
          "I am sorry, sir, I cannot offering anything complimentary. My manager is coming now.",
          "Of course, sir. The coffee is on us tonight.",
          undefined,
          "Câu cuối tự hứa miễn phí — việc của quản lý. Câu đúng từ chối lịch sự và mời quản lý.",
        ),
      ],
    }),
  ];
}

// ── Week 29 — Handover between servers and up to the supervisor ─────────
function week29(): LessonContent[] {
  const t1a = "We were very busy. Six walk-ins came while I was setting up the terrace.";
  const t1b = "I am not sure. I will take the allergy note to the chef now.";
  const t1c =
    "The Lim family is coming at seven for a birthday. The pastry section has their cake.";
  const t2a = "I was serving the soup when a guest suddenly started coughing badly.";
  const t2b = "I called first aid, and I was with the guest all the time.";
  const t2c = "First aid came in two minutes, and the guest is resting now.";
  const t2d = "Yes. I was writing it in the handover book when you arrived.";
  const t3a = "Yes. The bar count has not been finished yet.";
  const t3b = "The sea bass is on the sold-out list. Please tell your tables before they order.";
  const t3c = "I have updated the wine stock list. Only two bottles of the house red are left.";
  const t4a = "Yes. At six, the bar fridge was at nine degrees.";
  const t4b = "I told the chef, and we moved the food to another fridge.";
  const t4c = "I wrote it in the fridge temperature log and in the handover book.";
  return [
    L(29, 1, "Handing Over the Shift", "Bàn giao ca", {
      vocabulary: [
        c("Shift", "My shift finishes at three o'clock."),
        c("Walk-in", "A walk-in is a guest who comes with no booking.", [
          "/ˈwɔːk ɪn/",
          "Khách vãng lai (không đặt bàn trước)",
          "🚶",
        ]),
        c("Table plan", "The table plan shows every booking for tonight."),
        c("Allergy note", "Table twelve has an allergy note for nuts."),
      ],
      grammar: [
        g(
          "I set table, people come.",
          "I was setting up the terrace when six walk-ins arrived.",
          "Quá khứ tiếp diễn 'was setting up' cho việc đang làm; quá khứ đơn 'arrived' cho việc chen vào.",
          "I was set up the terrace when six walk-ins arrived.",
        ),
        g(
          "Allergy table twelve.",
          "Please read the allergy note for table twelve before service.",
          "Nói với đồng nghiệp: một việc, một bàn, một mốc. Ghi chú 'for' bàn nào.",
          "Please read the allergy note of table twelve before service.",
        ),
      ],
      speaking: [
        sp(
          "How was lunch today?",
          t1a,
          "Kể lại ca trước: quá khứ tiếp diễn cho việc đang làm khi chuyện xảy ra.",
          "colleague",
        ),
        risk(
          also(
            sp(
              "Table twelve has a nut allergy tonight. Does the chef know?",
              t1b,
              "Câu an toàn của bàn giao: chưa chắc thì không nói 'có' — mang ngay ghi chú dị ứng tới bếp.",
              "colleague",
              ["take", "allergy", "note", "chef"],
            ),
            ["I will check now and take the allergy note to the chef."],
          ),
        ),
        sp(
          "Good. Anything else for tonight?",
          t1c,
          "Khách đặc biệt tối nay: ai, mấy giờ, đồ đã chuẩn bị ở đâu.",
          "colleague",
          undefined,
          t1a,
        ),
        sp(
          "When does your shift finish today?",
          "My shift finishes at three, and Duc takes the terrace after me.",
          "Ca của bạn hết lúc nào, và ai nhận khu của bạn.",
          "colleague",
        ),
        sp(
          "Did the Lim family call again?",
          "They called while I was updating the table plan. There will be ten of them now.",
          "Quá khứ tiếp diễn + thông tin mới cho ca sau.",
          "colleague",
        ),
        sp(
          "Any special diets in tonight's bookings?",
          "There is a vegan guest at table four. I told the chef about her concern.",
          "Ôn tuần 27–28: chế độ ăn đặc biệt + đã báo bếp.",
          "colleague",
          ["vegan", "concern"],
        ),
        sp(
          "Any complaints at lunch?",
          "One table complained about slow service while we were waiting for the kitchen.",
          "Ôn tuần 27: quá khứ tiếp diễn + tên vấn đề đã học.",
          "colleague",
          ["slow", "service"],
        ),
      ],
      reading: read(
        `At three o'clock, Lan hands over to Khoa. Lunch was busy: six walk-ins came while she was setting up the terrace. She updated the table plan at two, and there are forty covers tonight. Table twelve has a nut allergy, and the chef already has the allergy note. The Lim family is coming at seven for a birthday. Khoa reads the allergy note twice, then tells the kitchen team about the cake. The evening starts without a single question.`,
        [
          {
            q: "Bàn nào có ghi chú dị ứng?",
            options: ["Bàn bảy", "Bàn mười hai", "Bàn bốn mươi"],
            correct: 1,
            explanation:
              "'Table twelve has a nut allergy, and the chef already has the allergy note' — bàn, loại dị ứng, và bếp đã biết.",
          },
          {
            q: "Sáu khách vãng lai đến khi Lan đang làm gì?",
            options: [
              "Đang cập nhật sơ đồ xếp bàn",
              "Đang bàn giao cho Khoa",
              "Đang chuẩn bị khu sân hiên",
            ],
            correct: 2,
            explanation:
              "'six walk-ins came while she was setting up the terrace' — quá khứ tiếp diễn kể việc đang làm.",
          },
          {
            q: "Vì sao Khoa đọc ghi chú dị ứng hai lần?",
            options: [
              "Vì sai sót về dị ứng có thể gây nguy hiểm cho khách",
              "Vì Lan viết chữ khó đọc",
              "Vì quản lý yêu cầu mọi người ký tên vào sổ bàn giao ca",
            ],
            correct: 0,
            explanation:
              "Bài không nói thẳng, nhưng đây là thông tin duy nhất trong ca không được phép sai — nên Khoa đọc kỹ.",
          },
        ],
      ),
      game: [
        game(
          "Before you go, is there anything special tonight?",
          "Table twelve has a nut allergy, and I took the note to the chef.",
          "Table twelve has a nut allergy, and I taked the note to the chef.",
          "Nothing special, I think. You can read the book later if you have time.",
          "colleague",
          "Câu cuối bỏ sót một ghi chú dị ứng — ca sau sẽ phục vụ mà không biết. Câu đúng nói bàn nào và bếp đã có ghi chú.",
        ),
        game(
          "How was the lunch shift?",
          "Busy. Six walk-ins came while I was setting up the terrace.",
          "Busy. Six walk-ins came while I was set up the terrace.",
          "Fine, nothing to say. Have a good shift!",
          "colleague",
          "Câu cuối bỏ trống bàn giao. Câu đúng kể điều ca sau cần biết, bằng quá khứ tiếp diễn.",
        ),
      ],
    }),

    L(29, 2, "I Was Doing… When…", "Tôi đang làm… thì…", {
      vocabulary: [
        c("Suddenly", "The guest suddenly started coughing."),
        c("Breakage report", "I wrote the two broken glasses in the breakage report."),
        c("Station checklist", "I was finishing the station checklist when the guest called."),
        c("Special guest note", "The special guest note says Mr Ito does not eat beef."),
      ],
      grammar: [
        g(
          "I serve, he cough.",
          "I was serving table six when the guest suddenly started coughing.",
          "Quá khứ tiếp diễn 'was serving' cho việc đang làm; quá khứ đơn 'started' cho việc chen vào.",
          "I was serve table six when the guest suddenly started coughing.",
        ),
        g(
          "Glass broken, I throw.",
          "I wrote the two broken glasses in the breakage report.",
          "Quá khứ đơn của 'write' là 'wrote' (bất quy tắc).",
          "I written the two broken glasses in the breakage report.",
        ),
      ],
      speaking: [
        sp(
          "What happened at table six?",
          t2a,
          "Báo cáo với cấp trên: đang làm gì (was + -ing) khi chuyện xảy ra.",
          "manager",
        ),
        risk(
          also(
            sp(
              "What did you do next?",
              t2b,
              "Báo cáo việc BẠN đã làm: gọi sơ cứu, ở cạnh khách. Không kể 'tôi đã gọi anh/chị' với chính quản lý.",
              "manager",
              ["called", "first", "aid", "guest", "time"],
              t2a,
            ),
            ["I called first aid, and I stayed with the guest all the time."],
          ),
        ),
        sp(
          "Is the guest all right now?",
          t2c,
          "Khép lại: ai đã tới, sau bao lâu, khách giờ ra sao.",
          "manager",
          undefined,
        ),
        sp(
          "Did you write down what happened at table six?",
          t2d,
          "Quá khứ tiếp diễn: việc đang làm khi quản lý tới.",
          "manager",
          undefined,
        ),
        sp(
          "Did anything break during service tonight?",
          "Two glasses broke while I was clearing the bar. I wrote them in the breakage report.",
          "Sự việc (quá khứ tiếp diễn) + đã ghi vào đúng sổ.",
          "manager",
        ),
        sp(
          "What happened with table eight?",
          "They were leaving early, so I asked the kitchen to cancel the order.",
          "Ôn tuần 28: quá khứ tiếp diễn + việc đã nhờ bếp.",
          "manager",
          ["cancel", "order"],
        ),
        sp(
          "Mr Ito is at table four tonight. Anything I should know?",
          "Yes. The special guest note says he does not eat beef.",
          "Đọc đúng ghi chú cho đồng nghiệp trước khi họ phục vụ.",
          "colleague",
        ),
        sp(
          "Why is there a sign by the bar?",
          "I was cleaning up some ice, so I put a wet floor sign there.",
          "Ôn tuần 27: quá khứ tiếp diễn + việc an toàn đã làm.",
          "manager",
          ["wet", "floor", "sign"],
        ),
      ],
      reading: read(
        `Nam was serving the soup at table six when a guest suddenly started coughing badly. Nam called first aid, and he was with the guest all the time. First aid came in two minutes. After service, Nam was writing the report in the handover book when the manager arrived. She read it and thanked him, because it had the exact times. The next day, she used it to speak with the family. Nam feels calm, because he followed every step.`,
        [
          {
            q: "Nam đang làm gì khi khách bị ho sặc?",
            options: ["Đang dọn bàn", "Đang viết báo cáo cuối ca", "Đang phục vụ món súp"],
            correct: 2,
            explanation:
              "'Nam was serving the soup… when a guest suddenly started coughing' — quá khứ tiếp diễn kể việc đang làm.",
          },
          {
            q: "Quản lý tới khi Nam đang làm gì?",
            options: [
              "Khi Nam đang gọi sơ cứu",
              "Khi Nam đang viết báo cáo vào sổ bàn giao",
              "Khi Nam đang phục vụ bàn số sáu",
            ],
            correct: 1,
            explanation:
              "'Nam was writing the report in the handover book when the manager arrived' — việc đang làm + việc chen vào.",
          },
          {
            q: "Vì sao bản báo cáo của Nam có ích cho quản lý?",
            options: [
              "Vì nó ghi đủ giờ, nên quản lý trả lời gia đình được",
              "Vì nó ghi rõ tên món súp mà vị khách đã gọi tối hôm đó",
              "Vì nó giải thích lỗi của bếp",
            ],
            correct: 0,
            explanation:
              "'it had the exact times… she used it to speak with the family' — báo cáo có giờ giấc là thứ quản lý dùng được.",
          },
        ],
      ),
      game: [
        game(
          "Tell me what you did when the guest started coughing.",
          "I called first aid, and I was with the guest all the time.",
          "I call first aid, and I was with the guest all the time.",
          "I gave him some water and waited to see if he felt better.",
          "manager",
          "Câu cuối tự làm sơ cứu khi không được đào tạo. Câu đúng gọi sơ cứu và ở cạnh khách.",
        ),
        game(
          "What were you doing when the glasses broke?",
          "I was clearing the bar when two glasses fell.",
          "I was clear the bar when two glasses fell.",
          "I was clearing the bar when two glasses fell, so I threw them away.",
          "manager",
          "Câu cuối đúng ngữ pháp nhưng bỏ qua sổ báo cáo đồ vỡ. Câu đúng kể việc đang làm khi chuyện xảy ra.",
        ),
      ],
    }),

    L(29, 3, "Open Items", "Những việc còn mở", {
      vocabulary: [
        c("Yet", "The bar count has not been finished yet."),
        c("Bar count", "We do the bar count after the last order."),
        c("Wine stock list", "The wine stock list shows two bottles of the house red."),
        c("Sold-out list", "The sea bass is on the sold-out list tonight."),
      ],
      grammar: [
        g(
          "Count not finish.",
          "The bar count has not been finished yet.",
          "Hiện tại hoàn thành bị động: 'has not been finished yet' — việc chưa xong tính tới lúc này. Cần -ed.",
          "The bar count has not been finish yet.",
        ),
        g(
          "Fish finish.",
          "The sea bass is on the sold-out list tonight.",
          "Món nằm 'on' một danh sách — giới từ là 'on'.",
          "The sea bass is in the sold-out list tonight.",
        ),
      ],
      speaking: [
        sp(
          "Is anything still open from your shift?",
          t3a,
          "Việc còn mở: has not been … yet.",
          "colleague",
        ),
        sp(
          "Anything sold out tonight?",
          t3b,
          "Món đã hết + việc đồng nghiệp cần làm với khách.",
          "colleague",
          undefined,
          t3a,
        ),
        sp(
          "What about the wine?",
          t3c,
          "Đã cập nhật gì (have updated) + con số còn lại.",
          "colleague",
          undefined,
          t3b,
        ),
        sp(
          "Anything else before you go?",
          "Table nine was waiting for a missing dish when I left. Please check it.",
          "Quá khứ tiếp diễn: việc đang dở khi bạn rời sàn, và việc ca sau cần làm.",
          "colleague",
          undefined,
          t3c,
        ),
        sp(
          "Did you finish the station checklist?",
          "Not yet. I was doing the station checklist when the delivery came.",
          "Nói thật việc chưa xong, và vì sao — quá khứ tiếp diễn.",
          "colleague",
        ),
        sp(
          "The card machine is not working again.",
          "Please tell the cashier. I was using the card machine at seven, and it worked.",
          "Ôn tuần 28: đúng người xử lý + điều bạn biết.",
          "colleague",
          ["card", "machine"],
        ),
        sp(
          "Did table five like the new wine?",
          "Yes. The first bottle was corked, so the sommelier opened another one.",
          "Ôn tuần 25–26: kể lại việc đã xử lý, đúng người đã làm.",
          "colleague",
          ["corked", "sommelier"],
        ),
        sp(
          "Is the beer cold again?",
          "Not yet. Two guests had a warm beer while I was checking the fridge.",
          "Ôn tuần 27: quá khứ tiếp diễn + tên vấn đề đã học.",
          "colleague",
          ["warm", "beer"],
        ),
      ],
      reading: read(
        `Before her break, Vy writes the open items for the evening team. The bar count has not been finished yet, because she was helping with a large group. The sea bass is on the sold-out list, so the waiters must tell their tables before they order. She has updated the wine stock list: two bottles of the house red are left. She signs the handover book and shows it to Tam. Tam reads it and starts the bar count at once.`,
        [
          {
            q: "Việc nào chưa xong khi Vy nghỉ giải lao?",
            options: ["Cập nhật bảng kê rượu vang", "Kiểm kê quầy bar", "Ký sổ bàn giao"],
            correct: 1,
            explanation:
              "'The bar count has not been finished yet' — việc còn mở được nói rõ cho ca sau.",
          },
          {
            q: "Phục vụ cần làm gì với món cá vược?",
            options: [
              "Giảm giá món cá cho khách",
              "Gợi ý món cá cho mọi bàn",
              "Báo khách trước khi khách gọi món",
            ],
            correct: 2,
            explanation:
              "'the waiters must tell their tables before they order' — khách không phải gọi xong mới biết món đã hết.",
          },
          {
            q: "Vì sao việc kiểm kê quầy bar chưa xong?",
            options: [
              "Vì Vy đang giúp phục vụ một đoàn khách lớn",
              "Vì quầy bar đã hết sạch rượu vang đỏ từ đầu ca chiều",
              "Vì Tâm chưa tới nhận ca",
            ],
            correct: 0,
            explanation:
              "'because she was helping with a large group' — việc còn mở có lý do, và lý do cũng được ghi lại.",
          },
        ],
      ),
      game: [
        game(
          "Is the bar count done?",
          "Not yet. It has not been finished, and I left a note.",
          "Not yet. It has not been finish, and I left a note.",
          "Yes, I think it is all fine. Do not worry about it tonight.",
          "colleague",
          "Câu cuối khẳng định khi chưa chắc — ca sau sẽ bỏ sót. Câu đúng nói thật việc còn mở và đã để lại ghi chú.",
        ),
        game(
          "Can my table still order the sea bass?",
          "No, it is on the sold-out list. Please offer the snapper.",
          "No, it are on the sold-out list. Please offer the snapper.",
          "Maybe. Let the guest order it, and we will see what the kitchen says.",
          "colleague",
          "Câu cuối để khách gọi một món đã hết rồi mới báo. Câu đúng báo trước và đưa món thay thế.",
        ),
      ],
    }),

    L(29, 4, "The Right Book for the Right Thing", "Đúng sổ cho đúng việc", {
      vocabulary: [
        c("Fridge temperature log", "We fill in the fridge temperature log twice a day."),
        c("Handover book", "I wrote the open items in the handover book."),
        c("Covers report", "The covers report shows we served eighty guests."),
        c("Reservation book", "Every new booking goes in the reservation book."),
      ],
      grammar: [
        g(
          "Fridge hot, I see.",
          "The bar fridge was at nine degrees, so I told the chef.",
          "Báo con số đo được, rồi việc đã làm. 'The bar fridge' là một cái: 'was'.",
          "The bar fridge were at nine degrees, so I told the chef.",
        ),
        g(
          "Book, I write.",
          "I wrote the open items in the handover book.",
          "Viết 'in' một cuốn sổ — giới từ là 'in'.",
          "I wrote the open items on the handover book.",
        ),
      ],
      speaking: [
        sp(
          "Did you check the fridge temperature log?",
          t4a,
          "Báo cấp trên bằng con số và giờ đo.",
          "manager",
        ),
        sp(
          "What did you do about it?",
          t4b,
          "An toàn thực phẩm: báo bếp và chuyển đồ ăn sang tủ khác ngay, không để qua đêm.",
          "manager",
          ["told", "chef", "moved", "food", "fridge"],
          t4a,
        ),
        sp(
          "Good. Where did you write it?",
          t4c,
          "Đúng sổ cho đúng việc: sổ nhiệt độ cho tủ lạnh, sổ bàn giao cho ca sau.",
          "manager",
          undefined,
          t4b,
        ),
        sp(
          "How many guests did we serve tonight?",
          "The covers report says eighty covers, so it was a busy night.",
          "Con số + một nhận xét ngắn.",
          "manager",
        ),
        sp(
          "Where do I write a new booking?",
          "New bookings go in the reservation book, so we never get a lost reservation.",
          "Ôn tuần 27: đúng sổ cho đúng việc, và vì sao.",
          "colleague",
          ["lost", "reservation"],
        ),
        sp(
          "Who took the call about the Lee party?",
          "I did. I was writing in the reservation book when the reservations team called.",
          "Ôn tuần 26: quá khứ tiếp diễn + bộ phận đã gọi.",
          "manager",
          ["reservations", "team"],
        ),
        sp(
          "Anything from the cashier tonight?",
          "There was a billing mistake at table nine. The cashier has corrected it.",
          "Ôn tuần 27: sự việc + ai đã xử lý.",
          "manager",
          ["billing", "mistake"],
        ),
        sp(
          "Anything from the kitchen tonight?",
          "Table two sent back a salty soup, and the chef made a new one.",
          "Ôn tuần 27: báo cấp trên — món gì, bàn nào, ai đã xử lý.",
          "manager",
          ["salty", "soup"],
        ),
      ],
      reading: read(
        `At six, Quang checks the fridge temperature log. The bar fridge is at nine degrees, which is too warm. He tells the chef, and they move the food to another fridge. Then he writes it in the log and in the handover book, so the next shift knows. Engineering checks the bar fridge the next morning and finds a broken door seal. The food is safe because it was moved early. Quang feels proud of his small, careful check.`,
        [
          {
            q: "Quang làm gì khi thấy tủ lạnh quầy bar quá ấm?",
            options: [
              "Để nguyên đồ ăn, chờ sáng mai sửa",
              "Tự mở tủ ra để sửa máy",
              "Báo bếp và chuyển đồ ăn sang tủ khác",
            ],
            correct: 2,
            explanation:
              "'He tells the chef, and they move the food to another fridge' — an toàn thực phẩm không chờ được tới sáng.",
          },
          {
            q: "Vì sao Quang ghi vào cả sổ bàn giao?",
            options: [
              "Để quản lý tính tiền sửa chữa",
              "Để ca sau biết chuyện tủ lạnh",
              "Vì cuốn sổ nhiệt độ đã hết trang giấy",
            ],
            correct: 1,
            explanation: "'so the next shift knows' — sổ nhiệt độ cho tủ, sổ bàn giao cho người.",
          },
          {
            q: "Vì sao đồ ăn vẫn an toàn?",
            options: [
              "Vì được chuyển sang tủ khác từ sớm",
              "Vì kỹ thuật sửa tủ ngay trong đêm",
              "Vì chín độ vẫn là nhiệt độ an toàn",
            ],
            correct: 0,
            explanation:
              "'The food is safe because it was moved early' — phát hiện sớm và xử lý ngay mới giữ được đồ ăn.",
          },
        ],
      ),
      game: [
        game(
          "Why is the food from the bar fridge in the kitchen now?",
          "The bar fridge was at nine degrees, so we moved the food.",
          "The bar fridge were at nine degrees, so we moved the food.",
          "It was a little warm, but only one night.",
          "manager",
          "Câu cuối xem nhẹ nhiệt độ tủ lạnh — đó là rủi ro an toàn thực phẩm. Câu đúng báo con số và việc đã làm.",
        ),
        game(
          "Where did you write the new booking for Friday?",
          "In the reservation book, with the guest's phone number.",
          "I writed it in the reservation book, with the guest's phone number.",
          "In my notebook. I will copy it into the reservation book later.",
          "manager",
          "Câu cuối nghe cẩn thận nhưng đặt bàn chưa vào sổ — ca sau không ai biết. Câu đúng ghi đúng sổ ngay.",
        ),
      ],
    }),
  ];
}

// ── Week 30 — Checkpoint: putting it together ───────────────────────────
// The checkpoint adds no new trade words. Nine cards present again week 23-29
// words that no later lesson had said (the steak, the sold-out list, the
// refusals about the bill, the handover books), each said at least twice
// here; the other seven are the event words Phase 4 recycles (special
// occasion, final headcount, set menu price…), kept so its review finds them.
function week30(): LessonContent[] {
  const t1a = "For a special occasion like that, I recommend the tasting menu, madam.";
  const t1b = "Of course, madam. Our cake delivery time is nine o'clock, after the main course.";
  const t1d = "Of course, sir. I will ask the kitchen for medium rare.";
  const t1e = "I am sorry, sir. The kitchen will cook a new steak, medium rare this time.";
  const t2a = "Because the room is kept only for your group, sir. The deposit holds it.";
  const t2b =
    "Could you send the final headcount and table layout by Thursday, sir? The banquet team needs them.";
  return [
    L(30, 1, "Recommend and Promise", "Gợi ý và cam kết", {
      vocabulary: [
        c("Special occasion", "Is this dinner for a special occasion, madam?"),
        c("Cake delivery time", "The cake delivery time is nine o'clock, after the main course."),
        c("Wine order", "I will take your wine order after you choose the food."),
        c("Medium rare", "A medium rare steak is pink in the middle.", [
          "/ˈmiːdiəm reə/",
          "Tái vừa (thịt bò chín tới, giữa còn hồng)",
          "🥩",
        ]),
      ],
      grammar: [
        g(
          "Steak pink. Okay.",
          "I will ask the kitchen to cook it medium rare, sir.",
          "Tuần 26: 'ask + người + to + động từ' — thiếu 'to' là sai.",
          "I will ask the kitchen cook it medium rare, sir.",
        ),
        g(
          "Cake nine, ok.",
          "Our cake delivery time is nine o'clock, after the main course.",
          "Một mốc giờ là số ít: 'is', không phải 'are'.",
          "Our cake delivery time are nine o'clock, after the main course.",
        ),
      ],
      speaking: [
        sp(
          "It is our parents' fortieth anniversary next week. What do you suggest?",
          t1a,
          "Tuần 23: gợi ý theo đúng dịp của khách.",
          undefined,
          ["tasting", "menu"],
        ),
        sp(
          "Lovely. Can the cake come out at the end?",
          t1b,
          "Tuần 25: kế hoạch có mốc giờ cụ thể.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "My father cannot eat gluten. Will the kitchen know?",
          "Yes, madam. I will write it in the allergy note and the special guest note.",
          "Tuần 29: ghi đúng sổ để bếp và ca sau cùng biết.",
          undefined,
          ["allergy", "note", "special", "guest"],
        ),
        sp(
          "I like my steak pink in the middle.",
          t1d,
          "Tuần 28: nói đúng tên mức chín với bếp.",
          undefined,
          ["medium", "rare"],
        ),
        sp(
          "It came back well done.",
          t1e,
          "Tuần 27–28: xin lỗi, làm lại món, nhắc lại mức chín.",
          undefined,
          ["cook", "new", "steak", "medium", "rare"],
          t1d,
        ),
        sp(
          "This red wine is too heavy for me.",
          "I am sorry, madam. If you like, I will change your wine order and bring a different drink.",
          "Tuần 28: đổi đồ uống là việc trong quyền của bạn.",
          undefined,
          ["wine", "order", "bring", "different", "drink"],
        ),
      ],
      reading: read(
        `Mr Chen orders a steak, medium rare. It comes back well done, so Hieu apologises and asks the kitchen to cook a new steak. Mrs Chen wants the sea bass, but it is on the sold-out list, so Hieu recommends the snapper. Later, she finds her red wine too heavy, and Hieu offers to bring a different drink. He does not argue about the wine, and he does not promise anything free. The Chens thank him at the end of the night.`,
        [
          {
            q: "Hiếu làm gì khi món bò bị chín quá?",
            options: [
              "Giải thích rằng bò chín kỹ vẫn ngon",
              "Xin lỗi và nhờ bếp làm phần bò mới",
              "Bỏ món bò khỏi hóa đơn cho khách",
            ],
            correct: 1,
            explanation:
              "'Hieu apologises and asks the kitchen to cook a new steak' — làm lại món là việc trong quyền của bạn.",
          },
          {
            q: "Vì sao Hiếu gợi ý cá hồng?",
            options: [
              "Vì cá hồng rẻ hơn cá vược",
              "Vì bà Chen không thích cá vược",
              "Vì cá vược đã có trong danh sách món đã hết",
            ],
            correct: 2,
            explanation:
              "'it is on the sold-out list, so Hieu recommends the snapper' — báo món hết, đưa ngay món thay thế.",
          },
          {
            q: "Vì sao Hiếu không hứa gì miễn phí?",
            options: [
              "Vì đồ miễn phí là quyết định của quản lý",
              "Vì khách không đòi gì miễn phí",
              "Vì món bò mới đã đủ để xin lỗi",
            ],
            correct: 0,
            explanation:
              "Bài không nói thẳng, nhưng cả giai đoạn ba dạy: đổi món thì được, mời miễn phí là việc của quản lý.",
          },
        ],
      ),
      game: [
        game(
          "My steak is grey inside. I wanted it pink.",
          "I am sorry, sir. The kitchen will cook a new steak, medium rare this time.",
          "I am sorry, sir. The kitchen will cooks a new steak, medium rare this time.",
          "It is still a good steak, sir. Most guests prefer it like this.",
          undefined,
          "Câu cuối bảo khách chấp nhận món sai. Câu đúng xin lỗi, làm lại, nhắc đúng mức chín.",
        ),
        game(
          "This white wine is far too dry for me.",
          "I am sorry, madam. If you like, I will bring a different drink.",
          "I am sorry, madam. If you like, I will brings a different drink.",
          "It is our best wine, madam. Please give it a second chance.",
          undefined,
          "Câu cuối bảo khách cố uống thứ khách không thích. Câu đúng xin lỗi và đổi đồ uống — việc trong quyền của bạn.",
        ),
      ],
    }),

    L(30, 2, "Explain and Coordinate", "Giải thích và điều phối", {
      vocabulary: [
        c("Final headcount", "Please send the final headcount by Thursday."),
        c("Table layout", "The banquet team will change the table layout to one long table."),
        c("Set menu price", "The set menu price is per person, with soft drinks."),
        c("Take off the service charge", "Only the manager can take off the service charge.", [
          "/teɪk ɒf ðə ˈsɜːvɪs tʃɑːdʒ/",
          "Bỏ phí phục vụ khỏi hóa đơn",
          "💵",
        ]),
      ],
      grammar: [
        g(
          "Price, each person.",
          "The set menu price is per person, sir.",
          "'The set menu price' là một mức giá: 'is', không phải 'are'.",
          "The set menu price are per person, sir.",
        ),
        g(
          "Table, send me.",
          "Could you send the table layout by Thursday, sir?",
          "Sau 'Could you' động từ ở dạng gốc: 'send', không thêm -ing.",
          "Could you sending the table layout by Thursday, sir?",
        ),
      ],
      speaking: [
        sp(
          "Why do you need a deposit for the private room?",
          t2a,
          "Tuần 24: lý do thật bằng 'because'.",
        ),
        sp(
          "Fine. When do you need the final numbers?",
          t2b,
          "Mốc + lý do của mốc.",
          undefined,
          undefined,
          t2a,
        ),
        risk(
          also(
            sp(
              "Can you give us ten percent off the set menu price?",
              "I am sorry, sir, I cannot change the price. I will ask the manager to call you.",
              "Giảm giá là của quản lý. Từ chối rõ, và hứa điều bạn làm được: nhờ quản lý gọi lại.",
              undefined,
              ["change", "price", "ask", "manager", "call"],
            ),
            ["I am sorry, sir, I cannot change the price. The manager will speak with you."],
          ),
        ),
        risk(
          also(
            sp(
              "The service was slow tonight. Please take off the service charge.",
              "I am sorry, sir, I cannot take off the service charge. I will ask my manager to come.",
              "Tuần 28: phí phục vụ là tiền — bạn không bỏ. Mời quản lý tới.",
              undefined,
              ["take", "service", "charge", "ask", "manager", "come"],
            ),
            [
              "I am sorry, sir, I cannot take off the service charge. My manager can review it with you.",
            ],
          ),
        ),
        sp(
          "Is the coffee complimentary with the set menu?",
          "I am not sure, sir. I will ask my manager if it is complimentary.",
          "Tuần 28: không chắc thì không hứa — hỏi người có quyền.",
          undefined,
          ["ask", "manager", "complimentary"],
        ),
        sp(
          "How was lunch today?",
          "Busy. The covers report says sixty, and every booking was in the reservation book.",
          "Tuần 29: báo cấp trên bằng con số và đúng sổ.",
          "manager",
          ["covers", "report", "reservation", "book"],
        ),
        sp(
          "Where do I write the Lee party booking?",
          "Please write it in the reservation book, with the set menu price.",
          "Tuần 29: đúng sổ cho đúng việc.",
          "colleague",
          ["reservation", "book", "set", "menu", "price"],
        ),
        sp(
          "What happens if we cancel the dinner?",
          "There is a cancellation fee, sir, because the kitchen orders the food early.",
          "Tuần 24: phí + lý do thật.",
          undefined,
          ["cancellation", "fee"],
        ),
      ],
      reading: read(
        `Mr Patel books the private room for a team dinner. Vy explains the deposit and asks for the final numbers by Thursday. When he asks for ten percent off, she says she cannot change the price and asks the manager to call him. On the night, Mr Patel asks Vy to take off the service charge. She explains that she cannot, and her manager comes to the table. After service, Vy writes the numbers in the covers report.`,
        [
          {
            q: "Vy trả lời thế nào khi khách xin giảm mười phần trăm?",
            options: [
              "Đồng ý giảm vì đoàn khách đông",
              "Không đổi giá, nhờ quản lý gọi lại",
              "Hứa sẽ giảm vào lần đặt sau",
            ],
            correct: 1,
            explanation:
              "'she cannot change the price and asks the manager to call him' — giá là việc của quản lý.",
          },
          {
            q: "Khi khách đòi bỏ phí phục vụ, ai tới bàn?",
            options: ["Thu ngân của nhà hàng", "Đồng nghiệp ở quầy bar", "Quản lý của Vy"],
            correct: 2,
            explanation:
              "'She explains that she cannot, and her manager comes to the table' — từ chối rõ, rồi người có quyền tới.",
          },
          {
            q: "Việc nào Vy làm SAU CÙNG?",
            options: [
              "Ghi số khách vào báo cáo lượt khách",
              "Hỏi số khách chốt trước thứ Năm",
              "Giải thích tiền cọc phòng riêng",
            ],
            correct: 0,
            explanation:
              "Thứ tự: tiền cọc → số khách → giảm giá → phí phục vụ → sau ca mới ghi báo cáo lượt khách.",
          },
        ],
      ),
      game: [
        game(
          "Could you knock ten percent off the price for our group?",
          "I am sorry, sir, I cannot change the price. I will ask the manager to call you.",
          "I am sorry, sir, I cannot changing the price. I will ask the manager to call you.",
          "Of course, sir. I will put ten percent off on the bill for you.",
          undefined,
          "Câu cuối tự giảm giá — vượt quyền. Câu đúng từ chối lịch sự và chuyển đúng người.",
        ),
        game(
          "Is the coffee free with the set menu?",
          "I am not sure, sir. I will ask my manager if it is complimentary.",
          "I am not sure, sir. I will asking my manager if it is complimentary.",
          "Yes, sir. Coffee is always included.",
          undefined,
          "Câu cuối đoán chính sách giá. Câu đúng không hứa, hỏi người có quyền.",
        ),
      ],
    }),

    L(30, 3, "Apologise and Solve", "Xin lỗi và giải quyết", {
      vocabulary: [
        c("Remove it from the bill", "Only the manager can remove it from the bill."),
        c("Complimentary", "Anything complimentary is the manager's decision.", [
          "/ˌkɒmplɪˈmentri/",
          "Miễn phí (nhà hàng mời)",
          "🎁",
        ]),
        c("Sold-out list", "The sea bass is on the sold-out list tonight."),
        c("Chipped glass", "A chipped glass is never served to a guest.", [
          "/tʃɪpt ɡlɑːs/",
          "Ly bị sứt mẻ",
          "🥂",
        ]),
      ],
      grammar: [
        g(
          "Bill? I fix.",
          "I am sorry, I cannot remove it from the bill myself.",
          "Tuần 28: sau 'cannot' động từ ở dạng gốc, không thêm -ing.",
          "I am sorry, I cannot removing it from the bill myself.",
        ),
        g(
          "Glass broken, no problem.",
          "That glass is chipped, so I will replace it now.",
          "'chipped' (bị sứt) cần -ed. Cảnh báo trước, thay ngay.",
          "That glass is chip, so I will replace it now.",
        ),
      ],
      speaking: [
        risk(
          also(
            sp(
              "We waited an hour for our room. Are the drinks in the bar free?",
              "I am not sure if they are complimentary, madam. I will ask my manager to come.",
              "Miễn phí hay không là quyết định của quản lý — bạn không hứa, bạn mời quản lý tới.",
              undefined,
              ["complimentary", "ask", "manager", "come"],
            ),
            ["I will ask my manager about that, madam. She is coming to your table now."],
          ),
        ),
        risk(
          also(
            sp(
              "The fish was terrible. Take it off my bill.",
              "I am sorry, sir, I cannot remove it from the bill. My manager can review it with you.",
              "Tuần 28: bạn không sửa hóa đơn — quản lý xem xét.",
              undefined,
              ["remove", "bill", "manager", "review"],
            ),
            ["I am sorry, sir, I cannot remove it from the bill. I will ask my manager to come."],
          ),
        ),
        sp(
          "There is a hair in my soup!",
          "I am so sorry, madam. I will replace the dish and tell my manager now.",
          "Dị vật trong món: xin lỗi, thay món, báo quản lý — không tranh luận.",
          undefined,
          ["replace", "dish", "manager"],
        ),
        sp(
          "My glass has a small crack.",
          "I am sorry, sir, that is a chipped glass. I will replace it straight away.",
          "Tuần 27: ly sứt không bao giờ dùng tiếp — thay ngay.",
          undefined,
          ["chipped", "glass"],
        ),
        sp(
          "What did you tell table five about their bill?",
          "I said I cannot remove it from the bill or take off the service charge.",
          "Báo cấp trên đúng điều bạn đã nói với khách.",
          "manager",
          ["remove", "bill", "service", "charge"],
        ),
        sp(
          "Your machine says my card is declined.",
          "I am sorry, sir. Would you like to try another card, or pay in cash?",
          "Thẻ bị từ chối: nói nhỏ, lịch sự, đưa lựa chọn — không làm khách ngượng.",
        ),
        sp(
          "Is the sea bass still available tonight?",
          "I am sorry, madam, it is on the sold-out list. Would you like the snapper instead?",
          "Tuần 29: món đã hết + món thay thế.",
          undefined,
          ["sold", "list"],
        ),
        sp(
          "Table six wants the sea bass and a new steak.",
          "The sea bass is on the sold-out list, and the kitchen will cook a new steak.",
          "Nói với đồng nghiệp: món đã hết + việc bếp làm.",
          "colleague",
          ["sold", "list", "cook", "steak"],
        ),
      ],
      reading: read(
        `At table nine, Mrs Kim finds a hair in her soup. Thu apologises at once, replaces the dish and tells her manager. Then Mrs Kim notices a chipped glass, and Thu replaces it straight away. Mrs Kim asks Thu to take the soup off the bill. Thu explains that she cannot remove it from the bill herself, and she asks her manager to come. The manager speaks with Mrs Kim before dessert. Mrs Kim later thanks Thu for staying so calm.`,
        [
          {
            q: "Thu làm gì khi khách thấy sợi tóc trong súp?",
            options: [
              "Xin lỗi, thay món và báo quản lý",
              "Vớt sợi tóc ra rồi để khách ăn tiếp",
              "Hỏi khách có chắc đó là tóc không",
            ],
            correct: 0,
            explanation:
              "'Thu apologises at once, replaces the dish and tells her manager' — dị vật thì thay món và báo người có quyền.",
          },
          {
            q: "Thu trả lời gì khi khách muốn bỏ món súp khỏi hóa đơn?",
            options: [
              "Đồng ý bỏ ngay vì lỗi rõ ràng",
              "Nói không thể và để khách tự trả",
              "Không tự bỏ, mời quản lý tới",
            ],
            correct: 2,
            explanation:
              "'she cannot remove it from the bill herself, and she asks her manager to come' — sửa hóa đơn là việc của quản lý.",
          },
          {
            q: "Vì sao Thu thay ly ngay?",
            options: [
              "Vì khách muốn dùng ly to hơn",
              "Vì ly sứt có thể làm khách đứt tay, miệng",
              "Vì quản lý sắp tới bàn",
            ],
            correct: 1,
            explanation:
              "Bài không nói thẳng, nhưng ly sứt là rủi ro an toàn — không bao giờ để khách dùng tiếp.",
          },
        ],
      ),
      game: [
        game(
          "I found a hair in my pasta.",
          "I am so sorry, madam. I will replace the dish and tell my manager now.",
          "I am so sorry, madam. I will replacing the dish and tell my manager now.",
          "I am sorry, madam. I will take the hair out for you.",
          undefined,
          "Câu cuối chỉ vớt dị vật rồi để khách ăn tiếp. Câu đúng thay món và báo quản lý.",
        ),
        game(
          "Please take the soup off our bill.",
          "I am sorry, sir, I cannot remove it from the bill. My manager can review it with you.",
          "I am sorry, sir, I cannot to remove it from the bill. My manager can review it with you.",
          "Of course, sir. I will remove it from the bill now.",
          undefined,
          "Câu cuối tự sửa hóa đơn — việc của quản lý. Câu đúng từ chối lịch sự và chuyển đúng người.",
        ),
      ],
    }),

    L(30, 4, "End of Phase Three", "Kết thúc giai đoạn ba", {
      vocabulary: [
        c("Menu choice", "Please send us your menu choice by Thursday."),
        c("Handover book", "I wrote the open items in the handover book."),
        c("Fridge temperature log", "We fill in the fridge temperature log twice a day."),
        c("Bar count", "We do the bar count after the last order."),
      ],
      grammar: [
        g(
          "Count not finish.",
          "The bar count from my shift has not been finished yet.",
          "Tuần 29: hiện tại hoàn thành bị động — 'has not been finished', cần -ed.",
          "The bar count from my shift has not been finish yet.",
        ),
        g(
          "Fridge? I write.",
          "I was checking the fridge temperature log when the chef called.",
          "Tuần 29: quá khứ tiếp diễn 'was checking' cho việc đang làm.",
          "I was check the fridge temperature log when the chef called.",
        ),
      ],
      speaking: [
        sp(
          "How do you feel about busy nights now?",
          "I feel confident, and I still ask the manager when I am not sure.",
          "Câu chốt giai đoạn ba: tự tin, và vẫn hỏi đúng người.",
          "manager",
        ),
        risk(
          also(
            sp(
              "A guest at table three is very drunk and wants more wine.",
              "Please do not serve him more alcohol. I will call the manager.",
              "Tuần 26: không rót thêm, gọi quản lý. Nói với đồng nghiệp: ngắn, rõ.",
              "colleague",
              ["serve", "alcohol", "call", "manager"],
            ),
            ["Please stop serving him alcohol. I will call the manager now."],
          ),
        ),
        sp(
          "Before service, what should we check?",
          "The menu choice for the Lee party, the station checklist and the fridge temperature log.",
          "Tuần 29: trước giờ phục vụ, đọc đúng sổ.",
          "manager",
          ["menu", "choice", "station", "checklist", "fridge", "temperature", "log"],
        ),
        sp(
          "Anything open from your shift?",
          "The bar count from my shift has not been finished yet. It is in the handover book.",
          "Tuần 29: việc còn mở + đã ghi ở đâu.",
          "manager",
          ["bar", "count", "handover", "book"],
        ),
        sp(
          "What happened at the bar tonight?",
          "I was doing the bar count when the fridge suddenly stopped. It is in the fridge temperature log.",
          "Tuần 29: quá khứ tiếp diễn + đã ghi đúng sổ.",
          "manager",
          ["bar", "count", "fridge", "temperature", "log"],
        ),
        sp(
          "Where do I write the wine delivery?",
          "Please write it in the handover book and update the wine stock list.",
          "Tuần 29: đúng sổ cho đồng nghiệp.",
          "colleague",
          ["handover", "book", "wine", "stock", "list"],
        ),
        sp(
          "Did you finish the station checklist?",
          "Yes. I was finishing the station checklist when two walk-ins arrived, so I updated the table plan.",
          "Tuần 29: quá khứ tiếp diễn + việc chen vào.",
          "colleague",
          ["station", "checklist"],
        ),
        sp(
          "Can we look back at tonight? What went well?",
          "A guest disliked her wine, so I offered to bring a different drink.",
          "Nhìn lại ca với quản lý: chuyện gì, bạn đã làm gì trong quyền của mình.",
          "manager",
          ["bring", "different", "drink"],
        ),
        sp(
          "Anything else from table nine?",
          "A guest found a hair in her salad, so I replaced the dish. One chipped glass is in the breakage report.",
          "Báo cấp trên: sự việc + việc đã làm + sổ đã ghi.",
          "manager",
          ["chipped", "glass", "breakage", "report"],
        ),
      ],
      reading: read(
        `At the end of the evening, Hieu hands over to his manager. The bar count from his shift has not been finished yet, so he writes it in the handover book. He was checking the fridge temperature log when the bar fridge suddenly stopped, so he moved the food and told the chef. One chipped glass is in the breakage report. His manager reads the handover book and says he did the job well. Next month, Hieu will help to train two new waiters.`,
        [
          {
            q: "Việc nào chưa xong khi Hiếu hết ca?",
            options: ["Sổ nhiệt độ tủ lạnh", "Báo cáo đồ vỡ", "Kiểm kê quầy bar"],
            correct: 2,
            explanation:
              "'The bar count from his shift has not been finished yet' — việc còn mở được ghi vào sổ bàn giao.",
          },
          {
            q: "Tủ lạnh quầy bar hỏng khi Hiếu đang làm gì?",
            options: [
              "Đang kiểm tra sổ nhiệt độ tủ lạnh",
              "Đang bàn giao ca cho quản lý",
              "Đang dọn ly bị sứt",
            ],
            correct: 0,
            explanation:
              "'He was checking the fridge temperature log when the bar fridge suddenly stopped' — quá khứ tiếp diễn.",
          },
          {
            q: "Vì sao quản lý khen Hiếu?",
            options: [
              "Vì Hiếu làm thêm giờ để kiểm kê xong",
              "Vì mọi việc đều được ghi đúng sổ và xử lý kịp",
              "Vì Hiếu tự sửa được tủ lạnh",
            ],
            correct: 1,
            explanation:
              "Bài không nói thẳng, nhưng việc còn mở, tủ lạnh hỏng và ly sứt đều đã được ghi đúng sổ — ca sau không phải đoán.",
          },
        ],
      ),
      game: [
        game(
          "Do you still need help from me on busy nights?",
          "Yes. I feel confident, but I still ask you when I am not sure.",
          "Yes. I feel confidence, but I still ask you when I am not sure.",
          "No, not really. I can decide most things myself now, even the discounts.",
          "manager",
          "Câu cuối tự nhận quyền giảm giá — không phải quyền của người phục vụ. Câu đúng tự tin và vẫn biết khi nào phải hỏi.",
        ),
        game(
          "The man at table three wants another bottle, but he is very drunk.",
          "Please do not serve him more alcohol. I will call the manager.",
          "Please not serve him more alcohol. I will call the manager.",
          "Just one more small glass, then we can stop.",
          "colleague",
          "Câu cuối vẫn rót thêm cho khách đã uống quá nhiều. Câu đúng dừng phục vụ rượu và gọi quản lý.",
        ),
      ],
    }),
  ];
}

/** Food & Beverage's Phase 3, week by week. */
export const FB_P3: Record<number, LessonContent[]> = {
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
export const FB_P3_CAN_DO: Record<number, string> = {
  23: "Gợi ý món, bàn và đồ uống theo nhu cầu của khách, so sánh hai lựa chọn bằng so sánh hơn, hỏi bếp khi khách có dị ứng, và vui vẻ chấp nhận khi khách từ chối.",
  24: "Giải thích phí mở rượu, phí phục vụ, mức chi tối thiểu và tiền cọc bằng lý do thật ('because'); hỏi giấy tờ khi phục vụ rượu bia và từ chối khi khách chưa đủ tuổi.",
  25: "Hứa thời gian bằng con số (within, by), báo phí mở rượu khi khách mang rượu tới, hỏi bếp về chất gây dị ứng trước khi nhận món, và xin lỗi khi trễ bằng mốc bếp đã xác nhận.",
  26: "Chuyển đúng việc cho đúng người — bếp trưởng, chuyên viên rượu, thu ngân, tổ tiệc — và từ chối rót thêm rượu cho khách đã uống nhiều, mời nước hoặc cà phê.",
  27: "Tiếp nhận phàn nàn: lắng nghe, xin lỗi đúng điều khách gặp mà không nhận lỗi, hỏi cho rõ sự việc, gọi sơ cứu và quản lý khi khách gặp nạn.",
  28: "Đề nghị điều mình được làm (làm lại món, đổi đồ uống, gói mang về, thanh toán tại bàn) bằng câu điều kiện, và từ chối rõ ràng việc bỏ món khỏi hóa đơn hay mời miễn phí.",
  29: "Bàn giao ca và báo cáo sự cố với đồng nghiệp, quản lý bằng quá khứ tiếp diễn: ghi chú dị ứng, việc còn mở, ghi đúng sổ cho đúng việc.",
  30: "Kết hợp cả giai đoạn, không thêm từ mới: gợi ý cho dịp đặc biệt, giải thích phí và hạn chót, xin lỗi và thay món, từ chối giảm giá, bỏ phí hay bỏ món khỏi hoá đơn rồi mời quản lý, ngừng phục vụ rượu cho khách say — tự tin nhưng biết khi nào phải hỏi.",
};
