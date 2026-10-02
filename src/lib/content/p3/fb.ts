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
//  · A waiter may apologise and replace within service standards: a new
//    dish, a fresh one, a reheat, a different drink, a faulty bottle opened
//    again. A waiter may NOT change a bill, give a discount, take off a
//    charge, offer anything free or approve a refund. That is the restaurant
//    manager's, said plainly: "I cannot remove it from the bill. I will ask
//    my manager to come."
//  · An apology is for what the guest met. Nobody says "It was our mistake"
//    or blames the kitchen before anyone has checked; a guest who says a dish
//    made them sick gets the manager, and the plate goes to the manager, not
//    the bin.
//  · Safety turns first: a reaction or choking at the table, hot soup on a
//    guest, a child alone at the hot buffet station — help and the manager
//    are called before anything else, and nobody treats the guest. The
//    must-say line names who comes: "I am calling first aid and the
//    manager". F&B had no card for "aid" in 40 weeks; it gets one in week
//    27, where the restaurant first has to say it.
//  · Week 29 is talk between servers and to the outlet supervisor (table
//    status, open items, tonight's allergy notes), and is labelled so.
//
// The turns that carry those decisions are marked `risk`: they are the pool
// the checkpoint's must-be-right draw comes from. Cards keep the reviewed F&B
// bank entries (kit.ts looks them up), because Phase 4 recycles them.
// ============================================================
import type { LessonContent } from "../week-content";
import { game, g, read, sp } from "../phase0";
import { cardsFor, lessonsFor, risk } from "./kit";

const c = cardsFor("FB");
const L = lessonsFor("FB");

// ── Week 23 — Recommending a dish, a table, a drink ─────────────────────
function week23(): LessonContent[] {
  const t1a = "I recommend the tasting menu, madam. It has five small courses from our chef.";
  const t1b = "Not at all. The courses are small, so it is lighter than it sounds.";
  const t1c = "I recommend the wine pairing, madam. You get one small glass with each course.";
  const t2a = "I recommend the sunset view table, sir. It is more romantic than the main room.";
  const t2b = "It is quieter than inside, sir. There are only six tables on the terrace.";
  const t2c = "Of course. I will ask the host to keep it for you at eight o'clock.";
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
              "Khuyên ông thử một ly vang nhỏ",
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
          "You eat tasting menu, very good.",
          "Everything on our menu is good, madam, so you can choose anything you like.",
          undefined,
          "Câu cuối nghe lịch sự nhưng không giúp khách chọn. Câu đúng gợi ý MỘT món cụ thể và nói vì sao.",
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
          "Giữ bàn là việc của người đón khách. Bạn nhờ đúng người, kèm giờ.",
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
          "Terrace more quiet, you go.",
          "Both places are very nice, madam, so it is really up to you.",
          undefined,
          "Câu cuối không giúp khách chọn. Câu đúng so sánh rõ MỘT điểm khách hỏi — yên tĩnh — rồi gợi ý.",
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
          sp(
            "Lovely. My husband has a nut allergy, though.",
            t3b,
            "Câu an toàn của tuần: bạn KHÔNG tự nói món nào không có hạt. Hỏi bếp trước khi khách gọi món.",
            undefined,
            ["check", "chef", "before", "order"],
            t3a,
          ),
        ),
        sp(
          "Will that take long?",
          t3c,
          "Hứa quay lại trước khi khách chọn món — khách không phải gọi bạn.",
          undefined,
          undefined,
          t3b,
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
              "Bếp trưởng của nhà hàng",
              "Người mẹ, vì bà đã ăn món này",
              "Lan, vì Lan đã thuộc thực đơn",
            ],
            correct: 0,
            explanation:
              "'The chef confirms that the platter has no nuts' — rồi Lan mới ghi dị ứng vào phiếu gọi món.",
          },
        ],
      ),
      game: [
        game(
          "My wife is allergic to nuts. Can she have the cheese board?",
          "I will check with the chef before you order, sir.",
          "Yes, no nut inside, okay, I think it is safe for him, sir, you can eat.",
          "Yes, sir, I am sure it is safe. Nobody has had a problem with it.",
          undefined,
          "Câu cuối hứa thay bếp — nhân viên không tự khẳng định món không có chất gây dị ứng. Câu đúng hỏi bếp trước khi khách gọi món.",
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
          "We will not have sparkling wine tonight, thank you.",
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
              "Mời khách thử thêm một món nữa",
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
          "Okay. You no want. Fine.",
          "Are you sure, madam? Our cocktail is better.",
          undefined,
          "Câu cuối ép khách sau khi khách đã từ chối. Câu đúng chấp nhận ngay và khen lựa chọn của khách.",
        ),
      ],
    }),
  ];
}

// ── Week 24 — A charge, a rule, and the real reason for it ──────────────
function week24(): LessonContent[] {
  const t1a = "Of course, sir. There is a corkage fee for each bottle.";
  const t1b = "Because we open it, serve it and give you our glasses, sir.";
  const t1c = "It is on the drinks menu, sir. I will show you now.";
  const t2a = "Of course, madam. The private dining room has a minimum spend of five million dong.";
  const t2b = "Because the room is kept only for your group that evening, madam.";
  const t2c = "We have to take a group deposit because the kitchen buys food for your group.";
  const t3a = "I am sorry, madam. We have to follow the outside food rule because of food safety.";
  const t3b = "I understand, madam. I will ask my manager about the cake now.";
  const t3c = "Of course. I will come back to you in five minutes, madam.";
  const t4a = "Do you have ID with you, sir? We have to check it for alcohol.";
  const t4b = "I am sorry, sir. I cannot serve alcohol without ID.";
  const t4c = "I understand, sir. Would you like a soft drink or a fresh juice instead?";
  return [
    L(24, 1, "There Is a Charge", "Có một khoản phí", {
      vocabulary: [
        c("Charge", "There is no charge for tap water in our restaurant."),
        c("Corkage fee", "There is a corkage fee for each bottle you bring."),
        c("Service charge", "The service charge is on every bill in the restaurant."),
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
          "It is our service charge, madam. It is on every bill in the restaurant.",
          "Giải thích ngắn: khoản phí gì, áp dụng cho ai.",
        ),
        sp(
          "We do not want to pay the corkage fee. Please take it off.",
          "I am sorry, I cannot change the bill. My manager can review it with you.",
          "Bạn không sửa hóa đơn. Nói rõ ai xem xét — quản lý — và mời quản lý tới.",
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
              "Mời quản lý tới gặp khách",
              "Tự xóa phí khỏi hóa đơn cho khách",
              "Nói rằng phí này không bao giờ được bỏ",
            ],
            correct: 0,
            explanation:
              "'Quang does not change the bill himself. He asks his manager to come.' — bỏ phí là quyết định của quản lý.",
          },
        ],
      ),
      game: [
        game(
          "Can I bring my own wine to dinner tonight?",
          "Of course, sir. There is a corkage fee for each bottle.",
          "Yes. You pay money for bottle.",
          "Yes, sir, and do not worry. I will not put any fee on your bill.",
          undefined,
          "Câu cuối tự hứa bỏ phí — nhân viên không có quyền đó. Câu đúng đồng ý và báo trước là có phí.",
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
          "There is a cancellation fee because the kitchen have already ordered the food.",
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
          "Because rule. You pay.",
          "Because the hotel needs the money first, madam.",
          undefined,
          "Câu cuối nêu một lý do làm khách thấy bị nghi ngờ. Câu đúng nói lý do thật: bếp mua nguyên liệu trước cho nhóm.",
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
          "I am sorry, sir. We hold tables for fifteen minutes, but I will check what is free.",
          "Nói quy định giữ bàn, rồi tự đi kiểm tra bàn trống — không bỏ mặc khách.",
        ),
      ],
      reading: read(
        `At a quarter to eleven, Mr Chen asks Hoa for a pizza. Hoa explains that the last order time was half past ten, because the chefs clean the kitchen after that. Then she offers the bar menu, which is open until midnight. Mr Chen orders two sandwiches from the bar and thanks her.`,
        [
          {
            q: "Vì sao Hoa không nhận món pizza?",
            options: [
              "Vì đã qua giờ nhận gọi món cuối của bếp",
              "Vì nhà hàng đã hết bột làm bánh pizza",
              "Vì ông Chen chưa đặt bàn từ trước",
            ],
            correct: 0,
            explanation:
              "'the last order time was half past ten, because the chefs clean the kitchen after that' — quy định kèm lý do.",
          },
          {
            q: "Hoa đưa ra giải pháp nào cho khách?",
            options: [
              "Hỏi bếp làm thêm một chiếc pizza",
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
          "Kitchen close. Too late now.",
          "It is not my fault, sir. The chefs always want to go home early.",
          undefined,
          "Câu cuối đổ lỗi cho đồng nghiệp trước mặt khách. Câu đúng nói quy định một cách lịch sự.",
        ),
      ],
    }),

    L(24, 4, "Checking the Age", "Kiểm tra tuổi", {
      vocabulary: [
        c("Alcohol age rule", "Under the alcohol age rule, we serve alcohol only from eighteen."),
        c("No-show charge", "There is a no-show charge if a group does not come."),
        c("Cover charge", "The cover charge pays for the live music tonight."),
      ],
      grammar: [
        g(
          "You young. No beer.",
          "We have to check ID because of the alcohol age rule, sir.",
          "'have to' + động từ nguyên mẫu: thiếu 'to' là sai. Lý do là quy định của pháp luật, không phải ý riêng của bạn.",
          "We have check ID because of the alcohol age rule, sir.",
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
          sp(
            "Two beers, please. Large ones.",
            t4a,
            "Khách trông chưa đủ 18 tuổi: hỏi giấy tờ TRƯỚC khi rót. Câu hỏi lịch sự, kèm lý do.",
            undefined,
            ["id", "check", "alcohol"],
          ),
        ),
        risk(
          sp(
            "I am nineteen. I just do not have it with me.",
            t4b,
            "Không có giấy tờ thì không phục vụ đồ uống có cồn — dù khách nói đủ tuổi.",
            undefined,
            ["serve", "alcohol", "without", "id"],
            t4a,
          ),
        ),
        sp(
          "Come on, it is just one beer.",
          t4c,
          "Không tranh cãi, không giảng giải lại: đưa ngay đồ uống thay thế.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "Why is there a cover charge tonight?",
          "Because we have live music tonight, madam. The cover charge is for the band.",
          "Lý do thật bằng 'because', rồi nói khoản phí trả cho gì.",
        ),
        sp(
          "We booked a table for twelve, but nobody came. Do we pay anything?",
          "There is a no-show charge, sir. The reservations team will explain it to you.",
          "Báo có phí, chuyển chi tiết cho bộ phận đặt bàn.",
        ),
      ],
      reading: read(
        `Two young men order beers at the pool bar. Khoa asks: "Do you have ID with you?" One of them has no ID. Khoa says politely that he cannot serve alcohol without ID, and he offers a soft drink instead. He explains the alcohol age rule as the law, not as his own opinion.`,
        [
          {
            q: "Khoa làm gì TRƯỚC khi rót bia?",
            options: [
              "Hỏi xem khách có mang giấy tờ không",
              "Hỏi khách muốn ly lớn hay ly nhỏ",
              "Hỏi khách ở phòng số mấy để tính tiền",
            ],
            correct: 0,
            explanation:
              "'Khoa asks: Do you have ID with you?' — với khách trông còn trẻ, kiểm tra trước khi phục vụ.",
          },
          {
            q: "Với người không có giấy tờ, Khoa làm gì?",
            options: [
              "Rót cho một ly nhỏ vì đi cùng bạn",
              "Mời một đồ uống không cồn thay thế",
              "Mời người đó rời khỏi quầy bar",
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
          "No ID, no beer for you, sir, you go back to room and bring passport.",
          "You look old enough to me, sir, so just this one time is fine.",
          undefined,
          "Câu cuối phục vụ theo cảm giác — đúng là điều quy định tuổi cấm. Câu đúng từ chối lịch sự khi không có giấy tờ.",
        ),
      ],
    }),
  ];
}

// ── Week 25 — Promising a time, and keeping it ──────────────────────────
function week25(): LessonContent[] {
  const t1a = "Of course, sir. I will bring your starter within ten minutes.";
  const t1b = "We will serve your main course by eight o'clock, sir.";
  const t1c = "Of course. I will bring more bread straight away, sir.";
  const t2a = "Not yet, madam. We are going to set it up by six o'clock.";
  const t2b = "Of course. I will chill the wine for twenty minutes before you arrive.";
  const t2c = "Please call me by five o'clock, madam. Then we can add chairs.";
  const t3a = "I will check with the kitchen and call you back within ten minutes.";
  const t3b = "I am sorry, sir. I cannot confirm it before the chef checks.";
  const t3c = "Thank you, sir. If the chef says yes, I will send the order now.";
  const t4a = "I am very sorry, sir. Your main course will be here within five minutes.";
  const t4b = "You are right, sir. I will go to the kitchen and bring it myself.";
  const t4c = "I am sorry, sir. I will open a new bottle for you.";
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
          "Lời hứa phải có con số, không nói 'soon'.",
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
          "The soup will be on your table within ten minutes, madam.",
          "Trả lời câu 'bao lâu' bằng một con số.",
        ),
      ],
      reading: read(
        `Mr and Mrs Patel have a show at nine. Tuan promises their starter within ten minutes and the main course by eight o'clock. He tells the kitchen about the show at once. The starter comes in eight minutes, and the main course is on the table at a quarter to eight.`,
        [
          {
            q: "Tuấn hứa món chính trước mấy giờ?",
            options: ["Trước chín giờ", "Trước bảy giờ rưỡi", "Trước tám giờ"],
            correct: 2,
            explanation: "'the main course by eight o'clock' — 'by' = không muộn hơn mốc đó.",
          },
          {
            q: "Vì sao Tuấn báo cho bếp ngay?",
            options: [
              "Vì khách có buổi diễn lúc chín giờ",
              "Vì bếp đang thiếu người trong tối hôm đó",
              "Vì khách gọi món đắt nhất thực đơn",
            ],
            correct: 0,
            explanation:
              "'He tells the kitchen about the show at once' — mốc của khách phải tới được người nấu.",
          },
        ],
      ),
      game: [
        game(
          "How long will the starters take?",
          "I will bring your starters within ten minutes, madam.",
          "Food coming, soon soon.",
          "As soon as possible, madam. The kitchen is very busy tonight.",
          undefined,
          "'As soon as possible' không phải lời hứa: khách không biết chờ tới khi nào. Câu đúng có số: 'within ten minutes'.",
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
        c("Chill the wine", "I will chill the wine for twenty minutes before dinner."),
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
          "Wine cold soon.",
          "I will chill the wine for twenty minutes before you arrive.",
          "Sau 'before' dùng hiện tại ('you arrive'), không dùng 'will'.",
          "I will chill the wine for twenty minutes before you will arrive.",
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
          "Hứa việc cụ thể kèm thời lượng và mốc của khách.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "What if two more friends come?",
          t2c,
          "Cho khách một mốc rõ để báo thêm người.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "We would like dessert, but the table is a mess.",
          "Of course, sir. We are going to reset your table first.",
          "Nói kế hoạch trước khi làm, để khách biết chuyện gì sắp diễn ra.",
        ),
      ],
      reading: read(
        `Mrs Kowalski has booked the private room for seven. At four, Ngoc tells her: "We are going to set it up by six o'clock." Mrs Kowalski is bringing two bottles of white wine, so Ngoc promises to chill the wine for twenty minutes before the guests arrive. At six, the room is ready.`,
        [
          {
            q: "Ngọc hứa chuẩn bị xong phòng lúc nào?",
            options: ["Trước sáu giờ", "Đúng bốn giờ chiều", "Sau bảy giờ tối"],
            correct: 0,
            explanation:
              "'We are going to set it up by six o'clock' — một kế hoạch có mốc, và được giữ đúng.",
          },
          {
            q: "Ngọc làm gì với rượu của bà Kowalski?",
            options: [
              "Mở rượu ngay khi bà vừa tới",
              "Ướp lạnh rượu trước khi khách tới",
              "Gửi rượu xuống quầy bar giữ hộ",
            ],
            correct: 1,
            explanation:
              "'chill the wine for twenty minutes before the guests arrive' — việc cụ thể, có thời lượng.",
          },
        ],
      ),
      game: [
        game(
          "When will our private room be ready?",
          "We are going to set it up by six o'clock, madam.",
          "Room is ready later maybe, madam, we do it when you come, no problem.",
          "Do not worry, madam. It will be ready when you arrive tonight.",
          undefined,
          "Câu cuối nghe yên tâm nhưng không có mốc giờ. Câu đúng nói kế hoạch và giờ cụ thể.",
        ),
      ],
    }),

    L(25, 3, "Room Service — An Allergy Order", "Phục vụ phòng — món cho khách dị ứng", {
      vocabulary: [
        c("Check with the kitchen", "I will check with the kitchen and call you back."),
        c(
          "Prepare a nut-free dish",
          "The chef decides if the kitchen can prepare a nut-free dish.",
        ),
        c(
          "Send the order now",
          "I will send the order now, and it will arrive within thirty minutes.",
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
          sp(
            "This is Room 512. My son has a nut allergy. Can he have the pasta?",
            t3a,
            "Gọi món phòng có dị ứng: KHÔNG tự trả lời 'được'. Hỏi bếp, hứa gọi lại có mốc giờ.",
            undefined,
            ["check", "kitchen", "call", "back", "within"],
          ),
        ),
        risk(
          sp(
            "Can you not just say yes now?",
            t3b,
            "Khách giục vẫn không hứa thay bếp. Chỉ bếp xác nhận được món không có hạt.",
            undefined,
            ["confirm", "before", "chef", "checks"],
            t3a,
          ),
        ),
        sp(
          "Okay. I will wait for your call.",
          t3c,
          "Nói rõ điều kiện: bếp đồng ý thì mới chuyển phiếu.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "Two club sandwiches to Room 305, please.",
          "Thank you, sir. I will send the order now, and it will arrive within thirty minutes.",
          "Nhận món + mốc giờ giao.",
        ),
        sp(
          "We ordered forty minutes ago. Where is our food?",
          "I am very sorry, madam. I will ask the kitchen to speed up your order.",
          "Xin lỗi, rồi nhờ đúng nơi làm nhanh hơn.",
        ),
      ],
      reading: read(
        `Mr Novak calls room service from Room 512. His son has a nut allergy and wants the pasta. Phuong does not say yes at once. She checks with the kitchen and calls back within ten minutes: the chef can prepare a nut-free dish. Only then does Phuong send the order.`,
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
              "'the chef can prepare a nut-free dish. Only then does Phuong send the order' — bếp xác nhận trước, chuyển phiếu sau.",
          },
        ],
      ),
      game: [
        game(
          "My daughter cannot eat nuts. Is the chicken curry safe for her?",
          "I will check with the kitchen and call you back within ten minutes.",
          "Curry no nut, I think. Okay.",
          "Yes, madam. It is a mild dish, so it does not have any nuts in it.",
          undefined,
          "Câu cuối đoán thành phần — món cay nhẹ vẫn có thể có hạt. Câu đúng hỏi bếp và hứa gọi lại có mốc giờ.",
        ),
      ],
    }),

    L(25, 4, "When the Promise Slips", "Khi lời hứa bị trễ", {
      vocabulary: [
        c("Hold the dessert", "I will hold the dessert until your husband comes back."),
        c("Open a new bottle", "This wine tastes wrong, so I will open a new bottle."),
        c("Top up your water", "I will top up your water when I pass your table."),
      ],
      grammar: [
        g(
          "Sorry late. Busy.",
          "I am very sorry for the delay. Your main course will be here within five minutes.",
          "Xin lỗi + mốc MỚI cho ĐÚNG việc đã hứa. 'the delay' cần 'the'.",
          "I am very sorry for delay. Your main course will be here within five minutes.",
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
          "Xin lỗi, giữ ĐÚNG việc khách đang chờ, đưa mốc mới ngắn hơn.",
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
          "Chai rượu có vấn đề: thay chai là việc trong tiêu chuẩn phục vụ.",
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
      ],
      reading: read(
        `Table nine waited half an hour for their main course. Son apologises and gives a new time: five minutes. Then he goes to the kitchen and brings it himself. He does not offer a free drink instead, because only the manager can offer anything free. The main course arrives in four minutes.`,
        [
          {
            q: "Sơn làm gì sau khi xin lỗi?",
            options: [
              "Đưa mốc mới rồi tự xuống bếp mang món lên",
              "Mời bàn chín một ly đồ uống miễn phí",
              "Giải thích rằng bếp tối nay quá đông khách",
            ],
            correct: 0,
            explanation:
              "'gives a new time: five minutes. Then he goes to the kitchen' — giữ đúng việc khách đang chờ.",
          },
          {
            q: "Vì sao Sơn không mời đồ uống miễn phí?",
            options: [
              "Vì quầy bar đã đóng cửa lúc đó",
              "Vì chỉ quản lý mới được mời thứ gì miễn phí",
              "Vì khách không thích uống rượu",
            ],
            correct: 1,
            explanation:
              "'only the manager can offer anything free' — đồ miễn phí là quyết định về tiền.",
          },
        ],
      ),
      game: [
        game(
          "We have been waiting forty minutes for our mains!",
          "I am very sorry, sir. They will be here within five minutes.",
          "Sorry, kitchen busy, wait more.",
          "I am sorry, sir. Can I offer you a free dessert to say sorry?",
          undefined,
          "Câu cuối tự mời món miễn phí — việc của quản lý — và đổi sang việc khác. Câu đúng giữ đúng việc khách chờ và đưa mốc mới.",
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
  const t2c = "I will ask my manager about that, sir. She will tell you before dinner.";
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
        c("Sommelier", "Our sommelier can recommend a wine for your steak."),
        c("Colleague", "My colleague at the bar will bring your drinks."),
        c("Transfer", "I will transfer your call to the reservations team."),
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
          sp(
            "Is the lamb curry halal?",
            t1a,
            "Bạn không biết chắc thì KHÔNG đoán. Nói thật và hỏi bếp trưởng.",
            undefined,
            ["check", "head", "chef"],
          ),
        ),
        sp(
          "Please be careful. We only eat halal food.",
          t1b,
          "Nói rõ ai xác nhận và khi nào: bếp trưởng, trước khi khách gọi món.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Thank you. We will look at the menu.",
          t1c,
          "Để khách thong thả, kèm mốc giờ bạn quay lại.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "Which wine goes well with the aged steak?",
          "Let me ask our sommelier, madam. She knows the wine list best.",
          "Việc của chuyên viên rượu vang — mời đúng người.",
        ),
        sp(
          "A guest on the phone wants to book a table for Saturday.",
          "Please transfer the call to the reservations team.",
          "Nói với đồng nghiệp: ngắn, rõ chuyển cho ai.",
          "colleague",
        ),
      ],
      reading: read(
        `Mr Ahmed asks Duc if the lamb curry is halal. Duc is not sure, so he does not guess. He says: "I will check with the head chef." The head chef confirms that the lamb is halal, but the sauce has wine in it. Duc tells Mr Ahmed, and he chooses the grilled chicken instead.`,
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
        ],
      ),
      game: [
        game(
          "Is there any pork in the dumplings?",
          "I am not sure, madam. I will check with the head chef.",
          "Pork? Maybe no pork, madam, I think the dumpling is chicken, you can eat.",
          "No, madam, I do not think so. Our dumplings are usually chicken.",
          undefined,
          "Câu cuối đoán thành phần — 'usually' không phải câu trả lời cho khách không ăn thịt heo. Câu đúng nói thật và hỏi bếp trưởng.",
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
        sp(
          "Is the cake free?",
          t2c,
          "Miễn phí là quyết định về tiền: bạn không tự trả lời. Nói ai trả lời và khi nào.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "This cocktail is much too sweet for me.",
          "I am sorry, madam. I will ask the bar team to make it less sweet.",
          "Đúng người làm lại: tổ pha chế.",
        ),
        sp(
          "Who sets up the room for our conference lunch?",
          "The banquet team sets it up, sir. I will ask them to call you today.",
          "Nói rõ bộ phận phụ trách, rồi nhờ họ liên hệ khách.",
        ),
      ],
      reading: read(
        `Mr Silva tells Thao that tomorrow is his wife's birthday. Thao asks the pastry section to make a small cake with her name on it, and arranges it for eight o'clock. Mr Silva asks if the cake is free. Thao does not decide that herself. She asks her manager, and the manager speaks to Mr Silva before dinner.`,
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
        ],
      ),
      game: [
        game(
          "Could someone make my cocktail a bit less strong?",
          "Of course, madam. I will ask the bar team to make a new one.",
          "Cocktail strong, okay, someone come.",
          "Please tell the bartender yourself, madam. He is just over there at the bar.",
          undefined,
          "Câu cuối đẩy việc sang khách. Câu đúng nhận yêu cầu và giao cho đúng tổ làm.",
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
        sp(
          "I want a discount for all this trouble.",
          "I am sorry, I cannot decide that. I will ask the restaurant manager to speak with you.",
          "Giảm giá là của quản lý nhà hàng. Bạn chuyển lời, không hứa.",
        ),
      ],
      reading: read(
        `Mr Harris booked a table for six, but his booking is not in the book. Hieu apologises and checks with the reservations team. When Mr Harris asks if anything has been done, Hieu says: "I have called them, and they are checking your email now." The host seats the family, and five minutes later the booking is found.`,
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
            q: "Ai xếp chỗ cho gia đình ông Harris?",
            options: ["Người đón khách", "Bộ phận đặt bàn", "Bếp trưởng của nhà hàng"],
            correct: 0,
            explanation:
              "'The host seats the family' — mỗi việc có người phụ trách, và khách không phải đứng chờ.",
          },
        ],
      ),
      game: [
        game(
          "Has anyone checked my booking yet?",
          "Yes, sir. I have called the reservations team, and they are checking it now.",
          "Yes. I call already. Wait.",
          "Not yet, sir. They are always very slow on Friday nights, I am afraid.",
          undefined,
          "Câu cuối than phiền đồng nghiệp trước mặt khách và không làm gì. Câu đúng báo việc đã làm và việc đang làm.",
        ),
      ],
    }),

    L(26, 4, "Closing the Loop at the Bar", "Khép vòng xử lý ở quầy bar", {
      vocabulary: [
        c("Bar manager", "The bar manager decides when a guest has had enough."),
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
          sp(
            "Another whisky! Make it a double!",
            t4a,
            "Khách đã uống quá nhiều: KHÔNG rót thêm. Từ chối ngắn, lịch sự, không tranh cãi.",
            undefined,
            ["serve", "alcohol"],
          ),
        ),
        sp(
          "Are you saying I am drunk?",
          t4b,
          "Không gọi khách là say. Mời nước hoặc cà phê.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "I want to speak to your manager!",
          t4c,
          "Đồng ý ngay và gọi quản lý quầy bar — người quyết trong ca này.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "This glass has lipstick on it.",
          "I am sorry, madam. I will bring a clean glass and tell the stewarding team.",
          "Thay ngay, rồi báo đúng tổ để lỗi không lặp lại.",
        ),
        sp(
          "Table five is still waiting for their main courses.",
          "I will ask the food runner to bring them now.",
          "Nói với đồng nghiệp: một việc, một người làm.",
          "colleague",
        ),
      ],
      reading: read(
        `At the pool bar, a guest asks Nam for another double whisky. He is speaking very loudly and cannot stand well. Nam says: "I am sorry, sir. I cannot serve you more alcohol." He offers water or a coffee and calls the bar manager. The bar manager talks to the guest, and his friends walk him to his room.`,
        [
          {
            q: "Nam trả lời thế nào khi khách đòi thêm rượu?",
            options: [
              "Rót thêm một ly nhỏ cho khách vui",
              "Nói khách đã say và mời khách về phòng",
              "Từ chối lịch sự, mời nước hoặc cà phê",
            ],
            correct: 2,
            explanation:
              "'I cannot serve you more alcohol' + 'He offers water or a coffee' — từ chối mà không gọi khách là say.",
          },
          {
            q: "Ai nói chuyện với vị khách sau đó?",
            options: ["Một nhân viên an ninh của khách sạn", "Quản lý quầy bar", "Nam, một mình"],
            correct: 1,
            explanation:
              "'The bar manager talks to the guest' — chuyện quyết định với khách đã uống nhiều là của quản lý quầy.",
          },
        ],
      ),
      game: [
        game(
          "Just one more beer. I am fine, I promise!",
          "I am sorry, sir. May I bring you some water or a coffee?",
          "No more. You drunk.",
          "Okay, sir, but this is your last one tonight. Please drink it slowly.",
          undefined,
          "Câu cuối vẫn rót thêm cho khách đã uống quá nhiều. Câu đúng từ chối nhẹ nhàng và mời nước hoặc cà phê.",
        ),
      ],
    }),
  ];
}

// ── Week 27 — Receiving a complaint ─────────────────────────────────────
function week27(): LessonContent[] {
  const t1a = "I am very sorry about the cold food and the wait, sir. I will bring a hot soup now.";
  const t1b = "I apologise, sir. I will tell the restaurant manager about the slow service.";
  const t1c = "I understand, sir. Your main course will be on your table by eight o'clock.";
  const t2a = "I am very sorry, sir. I am calling the manager now.";
  const t2b = "I will take the plate to the manager, sir. She has to check it.";
  const t2c = "I do not know, sir. The manager will look into it with the chef.";
  const t3a = "I am sorry, sir. Which bottle is on the bill twice?";
  const t3b = "I am sorry, sir. I will call the manager to check the bill now.";
  const t3c = "She will be at your table within five minutes, sir.";
  const t4a = "I am calling first aid and the manager now, madam.";
  const t4b = "Does he have his own allergy medicine with him, madam?";
  const t4c = "Please help him use it now, madam. First aid is on the way.";
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
          "Lỗi lặp lại thì báo quản lý nhà hàng, không hứa suông lần nữa.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "I do not want to wait like that for the main course.",
          t1c,
          "Công nhận cảm xúc, rồi đưa một mốc giờ cụ thể.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "We have waited twenty minutes for the bill.",
          "I apologise for the slow service, madam. Here is your bill.",
          "Xin lỗi đúng điều khách gặp, rồi giải quyết ngay.",
        ),
        sp(
          "I am worried the food here is too spicy for my mother.",
          "Thank you for telling me about your concern, madam. I will ask the chef about it.",
          "Cảm ơn khách đã nói điều lo lắng, rồi hỏi đúng người biết món ăn.",
        ),
      ],
      reading: read(
        `Mr Brown's soup arrives cold after forty minutes. Ngoc listens without stopping him. She apologises for the cold food and the wait, and brings a hot soup. Because it is the second problem that evening, Ngoc tells the restaurant manager about the slow service. She does not blame the kitchen.`,
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
        ],
      ),
      game: [
        game(
          "We have waited so long, and now the food is cold.",
          "I apologise for the slow service, sir. I will bring hot food now.",
          "Kitchen slow, not me.",
          "I am sorry, sir. The kitchen is very slow tonight because the chef is new.",
          undefined,
          "Câu cuối đổ lỗi cho bếp trước mặt khách. Câu đúng xin lỗi về điều khách gặp và làm ngay.",
        ),
      ],
    }),

    L(27, 2, "Sorry Is Not a Verdict", "Xin lỗi chưa phải là nhận lỗi", {
      vocabulary: [
        c("Disappointed", "I understand you are disappointed, madam."),
        c("Overcooked steak", "I am sorry about the overcooked steak, sir."),
        c("Wrong order", "I am sorry you received the wrong order."),
        c("Missing dish", "I will ask the kitchen about the missing dish."),
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
          sp(
            "My wife feels sick after eating this fish.",
            t2a,
            "Khách nói bị mệt sau khi ăn: xin lỗi và gọi quản lý NGAY. Không đoán nguyên nhân.",
            undefined,
            ["calling", "manager"],
          ),
        ),
        risk(
          sp(
            "Take this fish away. I do not want to see it.",
            t2b,
            "Không vứt món ăn: mang đĩa tới quản lý để kiểm tra.",
            undefined,
            ["take", "plate", "manager", "check"],
            t2a,
          ),
        ),
        sp(
          "Was it bad fish? Is it the kitchen's fault?",
          t2c,
          "Không nhận lỗi, không đổ cho bếp. Chưa ai kiểm tra thì chưa có kết luận.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "I asked for medium, and this steak is overcooked.",
          "I am sorry about the overcooked steak, sir. The chef will cook a new one in ten minutes.",
          "Xin lỗi về điều khách gặp + giải pháp + mốc giờ.",
        ),
        sp(
          "This is not what I ordered. I asked for the fish.",
          "I am sorry about the wrong order, madam. Your fish will be here in ten minutes.",
          "Không giải thích ai ghi nhầm — xin lỗi và đưa mốc giờ.",
        ),
        sp(
          "I am really disappointed with dinner tonight.",
          "I understand you are disappointed, madam. Thank you for telling me.",
          "Công nhận cảm xúc. Không tranh luận.",
        ),
      ],
      reading: read(
        `At table four, Mrs Novak feels sick after eating the fish. Duc apologises to her husband and calls the manager at once. He does not say the fish was bad, and he does not blame the kitchen. He takes the plate to the manager, so she can check it. The manager then speaks with the family and asks the kitchen what was in the dish.`,
        [
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
            q: "Điều nào Đức KHÔNG nói với khách?",
            options: [
              "Rằng cá bị hỏng và lỗi là của bếp",
              "Lời xin lỗi về chuyện vợ ông bị mệt",
              "Rằng anh đang gọi quản lý tới",
            ],
            correct: 0,
            explanation:
              "'He does not say the fish was bad, and he does not blame the kitchen' — chưa kiểm tra thì chưa kết luận.",
          },
        ],
      ),
      game: [
        game(
          "Everyone at my table has eaten, but my dish never came.",
          "I am sorry about the missing dish, madam. I will check with the kitchen now.",
          "Your food? Maybe later.",
          "It was our mistake, madam. The kitchen forgot your order again tonight.",
          undefined,
          "Câu cuối nhận lỗi và đổ cho bếp khi chưa ai kiểm tra. Câu đúng xin lỗi về điều khách gặp và đi kiểm tra.",
        ),
      ],
    }),

    L(27, 3, "Getting the Facts", "Hỏi cho rõ sự việc", {
      vocabulary: [
        c("Billing mistake", "A billing mistake is checked by the manager, not by the waiter."),
        c("Salty soup", "I will tell the chef about the salty soup."),
        c("Warm beer", "A warm beer goes back to the bar for a cold one."),
        c("Small portion", "The guest says the small portion is not enough for the price."),
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
          "Hỏi điều khách chưa nói: chai nào bị tính hai lần.",
        ),
        sp(
          "The red one. Just take it off.",
          t3b,
          "Bạn không tự sửa hóa đơn. Gọi quản lý kiểm tra cùng khách.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "How long will this take?",
          t3c,
          "Mốc giờ cụ thể cho người sẽ tới.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "The soup is far too salty.",
          "I am sorry about the salty soup, madam. Would you like a new one or a different dish?",
          "Xin lỗi + để khách chọn cách xử lý.",
        ),
        sp(
          "This beer is warm.",
          "I am sorry about the warm beer, sir. I will bring a cold one from the bar.",
          "Việc nhỏ: xin lỗi và thay ngay.",
        ),
        sp(
          "The portion is very small for the price.",
          "I am sorry, madam. Which dish do you mean?",
          "Hỏi cho rõ món nào trước khi làm gì.",
        ),
      ],
      reading: read(
        `Mr Okafor finds two bottles of red wine on his bill, but his table had one. Hai asks which bottle is on the bill twice. He does not change the bill himself. He calls the manager, who checks the order with the cashier. The second bottle was from another table, and the manager corrects the bill.`,
        [
          {
            q: "Hải hỏi khách điều gì?",
            options: [
              "Chai nào bị tính hai lần",
              "Khách muốn trả bằng thẻ hay tiền mặt",
              "Khách đã uống mấy ly rượu",
            ],
            correct: 0,
            explanation:
              "'Hai asks which bottle is on the bill twice' — hỏi đúng sự việc trước khi chuyển cho người có quyền.",
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
        ],
      ),
      game: [
        game(
          "I think you charged us for a dessert we never had.",
          "I am sorry, sir. I will call the manager to check the bill now.",
          "Bill correct. You eat dessert.",
          "Do not worry, sir. I will take the dessert off the bill myself right now.",
          undefined,
          "Câu cuối tự sửa hóa đơn — việc của quản lý. Câu đúng xin lỗi và gọi người có quyền kiểm tra.",
        ),
      ],
    }),

    L(27, 4, "Staying Calm — Safety First", "Giữ bình tĩnh — an toàn trước", {
      vocabulary: [
        c("Lost reservation", "A lost reservation goes straight to the restaurant manager."),
        c("Noisy table", "I am sorry about the noisy table next to you."),
        c("Dirty glass", "A dirty glass or a chipped glass goes back at once."),
        c("First aid", "I am calling first aid and the manager now.", [
          "/ˌfɜːst ˈeɪd/",
          "Sơ cứu",
          "🩹",
        ]),
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
          sp(
            "Help! My husband ate a prawn, and he cannot breathe!",
            t4a,
            "Phản ứng dị ứng tại bàn: gọi sơ cứu và quản lý NGAY, trước mọi việc khác. Bạn không tự chữa cho khách.",
            undefined,
            ["calling", "first", "aid", "manager"],
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
          sp(
            "Ouch! The hot soup went all over my arm!",
            "I am very sorry, sir. I am calling first aid and bringing cold water now.",
            "Bỏng do súp nóng: xin lỗi, gọi sơ cứu, mang nước lạnh. Không tranh luận lỗi của ai.",
            undefined,
            ["calling", "first", "aid", "bringing", "cold", "water"],
          ),
        ),
        sp(
          "You lost my booking! This hotel is a joke!",
          "I understand, sir, and I am sorry about the lost reservation. The manager is coming now.",
          "Không cãi lại khách. Công nhận, xin lỗi, gọi người có quyền giải quyết.",
        ),
      ],
      reading: read(
        `At table seven, Mr Chen eats a prawn and suddenly cannot breathe well. His wife shouts for help. Thu does not try to treat him. She calls first aid and the manager at once, and asks if he has his own allergy medicine. First aid arrives in two minutes. Thu stays with the family until then.`,
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
        ],
      ),
      game: [
        game(
          "The table next to us is so loud that we cannot talk.",
          "I am sorry about the noisy table, madam. I will ask the manager to help.",
          "Loud table, not my problem.",
          "I will go and tell them to be quiet right now, madam. They are very rude.",
          undefined,
          "Câu cuối phán xét khách khác và tự đi đối đầu. Câu đúng xin lỗi và mời quản lý xử lý.",
        ),
      ],
    }),
  ];
}

// ── Week 28 — Offering what a waiter may offer ──────────────────────────
function week28(): LessonContent[] {
  const t1a = "I am sorry, sir. If you like, I can replace the dish.";
  const t1b = "Then if you prefer, the kitchen can reheat your main course in five minutes.";
  const t1c = "Of course, sir. I will bring it back to you within five minutes.";
  const t2a = "I am very sorry, sir. You have two options: a new steak or a different dish.";
  const t2b =
    "A different dish is quicker, sir. The kitchen can cook a new steak in fifteen minutes.";
  const t2c = "Of course, sir. I will ask the host to move you to another table.";
  const t3a = "It will be ready by half past seven, sir. If it is late, we can cancel the order.";
  const t3b = "If it happens again, please tell me at once. I will tell the manager.";
  const t4a = "I am sorry, I cannot remove it from the bill. I will ask my manager to come.";
  const t4b = "I am sorry, madam, I cannot offer a free dessert. My manager is coming now.";
  const t4c = "If you like, I can clear the table and top up your water, madam.";
  return [
    L(28, 1, "If You Like, I Can…", "Nếu quý khách muốn, tôi có thể…", {
      vocabulary: [
        c("Replace the dish", "If you like, I can replace the dish with the grilled fish."),
        c("Prefer", "If you prefer, I can bring a different dish."),
        c("Bring a fresh one", "If the bread is hard, I will bring a fresh one."),
        c("Reheat your main course", "The kitchen can reheat your main course in five minutes."),
      ],
      grammar: [
        g(
          "I change food.",
          "If you like, I can replace the dish, madam.",
          "Câu điều kiện lịch sự 'If you like, I can…' — đề nghị nhưng để khách quyết. Sau 'can' không có 'to'.",
          "If you like, I can to replace the dish, madam.",
        ),
        g(
          "Cold? Hot again.",
          "If you prefer, the kitchen will reheat your main course.",
          "Mệnh đề 'If' dùng hiện tại ('you prefer'); 'will' chỉ ở mệnh đề chính.",
          "If you will prefer, the kitchen will reheat your main course.",
        ),
      ],
      speaking: [
        sp(
          "My pasta is cold.",
          t1a,
          "Khung của tuần: If you like, I can + việc bạn được phép làm.",
        ),
        sp(
          "I do not want to wait for a new one.",
          t1b,
          "Khách không muốn chờ — đưa lựa chọn khác, vẫn bằng 'If you prefer'.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Fine, please do that.",
          t1c,
          "Chốt lại bằng một lời hứa có mốc giờ.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "This bread is very hard.",
          "I am sorry, madam. If you like, I will bring a fresh one.",
          "Xin lỗi + đề nghị có điều kiện. Thay món là việc trong quyền của bạn.",
        ),
      ],
      reading: read(
        `Mrs Tanaka's pasta is cold. Hoa apologises and says: "If you like, I can replace the dish." Mrs Tanaka does not want to wait, so Hoa offers to have the main course reheated instead. The kitchen reheats it, and Hoa brings it back within five minutes. She does not offer anything free.`,
        [
          {
            q: "Vì sao Hoa không đổi món mới?",
            options: [
              "Vì bếp đã hết mì ống",
              "Vì khách không muốn chờ món mới",
              "Vì quản lý không cho đổi món",
            ],
            correct: 1,
            explanation:
              "'Mrs Tanaka does not want to wait, so Hoa offers to have the main course reheated' — đề nghị theo điều khách chọn.",
          },
          {
            q: "Điều nào Hoa KHÔNG làm?",
            options: [
              "Xin lỗi khách về món nguội",
              "Mang món ra lại trong năm phút",
              "Mời khách một món miễn phí",
            ],
            correct: 2,
            explanation:
              "'She does not offer anything free' — hâm nóng hay đổi món là quyền của bạn, đồ miễn phí thì không.",
          },
        ],
      ),
      game: [
        game(
          "This curry is only warm, not hot.",
          "I am sorry, madam. If you like, I can replace the dish.",
          "Okay, I take, make hot.",
          "It is fine to eat, madam. It is often warm.",
          undefined,
          "Câu cuối phủ nhận điều khách cảm thấy. Câu đúng xin lỗi và đưa giải pháp để khách chọn.",
        ),
      ],
    }),

    L(28, 2, "Two Options — and Who Decides", "Hai lựa chọn — và ai quyết", {
      vocabulary: [
        c("Option", "There are two options for your steak tonight."),
        c("Either", "Either option is fine with the kitchen."),
        c("Cook a new steak", "The kitchen can cook a new steak in fifteen minutes."),
        c("Move you to another table", "I can ask the host to move you to another table."),
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
          "Hai lựa chọn đều trong quyền của bạn: món mới hoặc món khác.",
        ),
        sp(
          "Which one is quicker?",
          t2b,
          "Giúp khách chọn bằng một thông tin thật: thời gian.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "A new steak, please. And can we sit away from the door?",
          t2c,
          "Đổi bàn: bạn nhờ người đón khách, không tự hứa bàn nào.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "The fish or the steak? I cannot choose.",
          "Either option is fine, madam. The fish is lighter, and the steak is more filling.",
          "'Either option' = lựa chọn nào cũng được, rồi nói khác nhau ở đâu.",
        ),
      ],
      reading: read(
        `Mr Weber's steak comes back overcooked a second time. Khoa gives him two options: a new steak in fifteen minutes, or a different dish now. Mr Weber chooses the steak and asks to sit away from the door. Khoa asks the host, and the host moves them to a table by the window.`,
        [
          {
            q: "Khoa đưa ra hai lựa chọn nào?",
            options: [
              "Một phần bò mới, hoặc một món khác",
              "Bỏ món khỏi hóa đơn, hoặc tặng món tráng miệng",
              "Ăn tạm phần bò cũ, hoặc chờ đến tối mai",
            ],
            correct: 0,
            explanation:
              "'a new steak in fifteen minutes, or a different dish now' — cả hai đều trong quyền của người phục vụ.",
          },
          {
            q: "Ai chuyển chỗ cho ông Weber?",
            options: ["Bếp trưởng", "Quản lý nhà hàng", "Người đón khách"],
            correct: 2,
            explanation:
              "'Khoa asks the host, and the host moves them' — xếp bàn là việc của người đón khách.",
          },
        ],
      ),
      game: [
        game(
          "What can you do about this steak?",
          "You have two options, sir: a new steak or a different dish.",
          "New steak or other, you choose.",
          "Nothing, I am afraid, sir. The chef always cooks the steak this way.",
          undefined,
          "Câu cuối khép mọi lối ra cho khách. Câu đúng đưa hai lựa chọn trong quyền của bạn.",
        ),
      ],
    }),

    L(28, 3, "If It Happens Again", "Nếu chuyện lặp lại", {
      vocabulary: [
        c("Cancel the order", "If the food is late, we can cancel the order."),
        c("Bring a different drink", "If you do not like it, I will bring a different drink."),
        c("Wrap it to take away", "If you cannot finish it, I can wrap it to take away."),
      ],
      grammar: [
        g(
          "Not like? Change.",
          "If you do not like it, I will bring a different drink, madam.",
          "Câu điều kiện loại 1: If + hiện tại, will + động từ. Thiếu 'will' là sai.",
          "If you do not like it, I bring a different drink, madam.",
        ),
        g(
          "Late? Cancel.",
          "If the food is late, we can cancel the order, sir.",
          "Mệnh đề 'If' dùng hiện tại: 'is late', không dùng 'will be late'.",
          "If the food will be late, we can cancel the order, sir.",
        ),
      ],
      speaking: [
        sp(
          "We have to leave at eight. Will the food be ready?",
          t3a,
          "Hứa mốc giờ, và nói trước phương án nếu trễ.",
        ),
        sp(
          "And if this happens again tomorrow night?",
          t3b,
          "Câu điều kiện về lần sau: hẹn khách báo ngay, và nói rõ bạn sẽ báo cho ai.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "This cocktail is too strong for me.",
          "I am sorry, madam. If you like, I will bring a different drink.",
          "Đổi đồ uống khách không hợp là việc trong quyền của bạn.",
        ),
        sp(
          "I cannot finish this. It is too much.",
          "Of course, madam. If you like, I can wrap it to take away.",
          "Đề nghị nhỏ, đúng lúc, để khách chọn.",
        ),
        risk(
          sp(
            "There is a little boy alone at the hot buffet station.",
            "Please move him away from the hot station. I am calling the manager now.",
            "Trẻ một mình cạnh quầy nóng: đưa em ra xa trước, gọi quản lý ngay. Nói với đồng nghiệp: ngắn và rõ.",
            "colleague",
            ["move", "away", "hot", "station", "calling", "manager"],
          ),
        ),
      ],
      reading: read(
        `Mr and Mrs Lim must leave for the airport at eight. Phuong promises the food by half past seven and says: "If it is late, we can cancel the order." The food arrives at twenty past seven. Mrs Lim cannot finish her noodles, so Phuong wraps them to take away.`,
        [
          {
            q: "Phương nói trước điều gì sẽ xảy ra nếu món bị trễ?",
            options: [
              "Khách được giảm nửa giá món đó",
              "Nhà hàng sẽ mang món ra sân bay",
              "Có thể hủy món đã gọi",
            ],
            correct: 2,
            explanation:
              "'If it is late, we can cancel the order' — câu điều kiện cho khách biết trước phương án.",
          },
          {
            q: "Món ăn được mang ra lúc mấy giờ?",
            options: ["Bảy giờ hai mươi", "Đúng bảy giờ rưỡi tối", "Gần tám giờ tối"],
            correct: 0,
            explanation: "'The food arrives at twenty past seven' — trước mốc bảy giờ rưỡi đã hứa.",
          },
        ],
      ),
      game: [
        game(
          "What if the food is late again next time?",
          "If it happens again, please tell me at once, sir. I will tell the manager.",
          "If late, you tell.",
          "It will never happen again, sir. I can promise you that myself.",
          undefined,
          "Câu cuối hứa điều bạn không kiểm soát được. Câu đúng nói cách xử lý nếu chuyện lặp lại.",
        ),
      ],
    }),

    L(28, 4, "When You Must Say No", "Khi phải từ chối", {
      vocabulary: [
        c("Remove it from the bill", "Only the manager can remove it from the bill."),
        c("Ask my manager to come", "I will ask my manager to come to your table."),
        c("Offer a free dessert", "I cannot offer a free dessert, but my manager can decide."),
        c("Take off the service charge", "Only the manager can take off the service charge."),
      ],
      grammar: [
        g(
          "Free? No.",
          "I am sorry, I cannot remove it from the bill.",
          "Bạn không sửa hóa đơn. Sau 'cannot' động từ ở dạng gốc, không có 'to'.",
          "I am sorry, I cannot to remove it from the bill.",
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
          sp(
            "The steak was terrible. Take it off the bill.",
            t4a,
            "Câu thẩm quyền của tuần: bạn KHÔNG bỏ món khỏi hóa đơn. Mời quản lý tới — ngay.",
            undefined,
            ["remove", "bill", "ask", "manager", "come"],
          ),
        ),
        sp(
          "Then give us a free dessert at least.",
          t4b,
          "Đồ miễn phí cũng là quyết định của quản lý. Từ chối ngắn, không tranh luận.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "Fine. What can you do while we wait?",
          t4c,
          "Sau lời từ chối, đưa ngay việc bạn được làm.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "The service was slow. Take off the service charge.",
          "I am sorry, I cannot take off the service charge. My manager can review it with you.",
          "Phí phục vụ cũng là tiền — chuyển quản lý xem xét.",
        ),
      ],
      reading: read(
        `Mrs Brown says her steak was terrible and asks Quang to take it off the bill. Quang apologises, but he does not remove it from the bill himself. He says: "I will ask my manager to come." When she asks for a free dessert, he explains that he cannot offer one. The manager arrives within five minutes and talks with Mrs Brown.`,
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
            q: "Vì sao Quang không mời món tráng miệng miễn phí?",
            options: [
              "Vì món tráng miệng hôm đó đã hết",
              "Vì khách đã gọi món tráng miệng rồi",
              "Vì đồ miễn phí không thuộc quyền của Quang",
            ],
            correct: 2,
            explanation:
              "'he explains that he cannot offer one' — mời miễn phí là quyết định của quản lý.",
          },
        ],
      ),
      game: [
        game(
          "Just remove the wine from the bill, and we will be happy.",
          "I am sorry, I cannot remove it. I will ask my manager to come.",
          "Okay. No pay wine. Free.",
          "Of course, madam. I will remove it myself, and nobody will notice.",
          undefined,
          "Câu cuối tự sửa hóa đơn và giấu cấp trên — vượt quyền. Câu đúng không hứa, chuyển ngay cho quản lý.",
        ),
      ],
    }),
  ];
}

// ── Week 29 — Handover between servers and up to the supervisor ─────────
function week29(): LessonContent[] {
  const t1a = "I updated the table plan at two. We have forty covers tonight.";
  const t1b = "Yes. Table twelve has a nut allergy, and the chef has the allergy note.";
  const t1c =
    "The Lim family is coming at seven for a birthday. Their cake is in the pastry fridge.";
  const t2a = "I was serving the soup when a guest suddenly started coughing badly.";
  const t2b = "I called first aid and the manager, and I did not move the guest.";
  const t2c = "First aid came in two minutes, and the guest is resting now.";
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
        c("Update", "I updated the table plan at two."),
        c("Table plan", "The table plan shows every booking for tonight."),
        c("Allergy note", "Table twelve has an allergy note for nuts."),
      ],
      grammar: [
        g(
          "Many thing tonight.",
          "I updated the table plan at two. We have forty covers tonight.",
          "Bàn giao: việc ĐÃ làm (quá khứ đơn 'updated') + tình hình hiện tại ('have').",
          "I update the table plan at two. We have forty covers tonight.",
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
          "What do I need to know for tonight?",
          t1a,
          "Nói với đồng nghiệp ca sau: việc đã làm + con số của tối nay.",
          "colleague",
        ),
        risk(
          sp(
            "Any allergies in tonight's bookings?",
            t1b,
            "Câu an toàn của bàn giao: bàn nào, dị ứng gì, và bếp đã có ghi chú chưa.",
            "colleague",
            ["table", "nut", "allergy", "chef", "note"],
            t1a,
          ),
        ),
        sp(
          "Good. Anything else?",
          t1c,
          "Khách đặc biệt tối nay: ai, mấy giờ, đồ đã chuẩn bị ở đâu.",
          "colleague",
          undefined,
          t1b,
        ),
        sp(
          "When does your shift finish today?",
          "My shift finishes at three, and Duc takes the terrace after me.",
          "Ca của bạn hết lúc nào, và ai nhận khu của bạn.",
          "colleague",
        ),
      ],
      reading: read(
        `At three o'clock, Lan hands over to Khoa. She updated the table plan at two: there are forty covers tonight. Table twelve has a nut allergy, and the chef already has the allergy note. The Lim family is coming at seven for a birthday. Khoa reads the allergy note twice, because an allergy cannot wait for a question.`,
        [
          {
            q: "Bàn nào có ghi chú dị ứng?",
            options: ["Bàn bảy", "Bàn mười hai", "Bàn bốn mươi"],
            correct: 1,
            explanation:
              "'Table twelve has a nut allergy, and the chef already has the allergy note' — bàn, loại dị ứng, và bếp đã biết.",
          },
          {
            q: "Vì sao Khoa đọc ghi chú dị ứng hai lần?",
            options: [
              "Vì Lan viết chữ khó đọc",
              "Vì quản lý yêu cầu ký tên vào sổ",
              "Vì chuyện dị ứng không được phép sai",
            ],
            correct: 2,
            explanation:
              "'because an allergy cannot wait for a question' — tới giờ phục vụ mới hỏi lại là đã muộn.",
          },
        ],
      ),
      game: [
        game(
          "Before you go, is there anything special tonight?",
          "Yes. Table twelve has a nut allergy, and the chef has the note.",
          "Nut table twelve. Okay.",
          "Nothing special, I think. You can read the book later if you have time.",
          "colleague",
          "Câu cuối bỏ sót một ghi chú dị ứng — ca sau sẽ phục vụ mà không biết. Câu đúng nói bàn, dị ứng gì, và bếp đã có ghi chú.",
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
          sp(
            "What did you do next?",
            t2b,
            "Các bước đã làm: gọi sơ cứu và quản lý, và không di chuyển khách.",
            "manager",
            ["called", "first", "aid", "manager", "move", "guest"],
            t2a,
          ),
        ),
        sp(
          "Is the guest all right now?",
          t2c,
          "Khép lại: ai đã tới, sau bao lâu, khách giờ ra sao.",
          "manager",
          undefined,
          t2b,
        ),
        sp(
          "Did anything break during service tonight?",
          "Two glasses broke at the bar. I wrote them in the breakage report.",
          "Sự việc + đã ghi vào đúng sổ.",
          "manager",
        ),
        sp(
          "Mr Ito is at table four tonight. Anything I should know?",
          "Yes. The special guest note says he does not eat beef.",
          "Đọc đúng ghi chú cho đồng nghiệp trước khi họ phục vụ.",
          "colleague",
        ),
      ],
      reading: read(
        `Nam was serving the soup at table six when a guest suddenly started coughing badly. Nam called first aid and the manager, and he did not move the guest. First aid came in two minutes. After service, Nam wrote what happened for the manager, with the times. His report helped the manager speak to the family the next day.`,
        [
          {
            q: "Nam đang làm gì khi khách bị ho sặc?",
            options: ["Đang dọn bàn", "Đang viết báo cáo cuối ca", "Đang phục vụ món súp"],
            correct: 2,
            explanation:
              "'Nam was serving the soup… when a guest suddenly started coughing' — quá khứ tiếp diễn kể việc đang làm.",
          },
          {
            q: "Sau ca làm, Nam làm gì?",
            options: [
              "Viết lại sự việc, có ghi giờ",
              "Gọi điện hỏi thăm vị khách hôm sau",
              "Báo bếp đổi công thức món súp",
            ],
            correct: 0,
            explanation:
              "'Nam wrote what happened for the manager, with the times' — một sự cố cần được ghi lại rõ ràng.",
          },
        ],
      ),
      game: [
        game(
          "Tell me what you did when the guest started coughing.",
          "I called first aid and the manager, and I stayed at the table.",
          "He cough. I run.",
          "I hit him hard on the back many times until he was okay.",
          "manager",
          "Câu cuối tự làm sơ cứu khi không được đào tạo. Câu đúng gọi sơ cứu và quản lý, và ở lại với khách.",
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
          "Did you finish the station checklist?",
          "Not yet. I will finish it before six o'clock.",
          "Nói thật việc chưa xong, kèm mốc.",
          "colleague",
        ),
      ],
      reading: read(
        `Before her break, Vy writes the open items for the evening team. The bar count has not been finished yet. The sea bass is on the sold-out list, so the waiters must tell their tables before they order. She has updated the wine stock list: two bottles of the house red are left.`,
        [
          {
            q: "Việc nào chưa xong khi Vy nghỉ giải lao?",
            options: ["Kiểm kê quầy bar", "Cập nhật bảng kê rượu vang", "Đặt thêm cá"],
            correct: 0,
            explanation:
              "'The bar count has not been finished yet' — việc còn mở được nói rõ cho ca sau.",
          },
          {
            q: "Phục vụ cần làm gì với món cá vược?",
            options: [
              "Giảm giá món cá cho khách",
              "Báo khách trước khi khách gọi món",
              "Gợi ý món cá cho mọi bàn",
            ],
            correct: 1,
            explanation:
              "'the waiters must tell their tables before they order' — khách không phải gọi xong mới biết món đã hết.",
          },
        ],
      ),
      game: [
        game(
          "Is the bar count done?",
          "Not yet. It has not been finished, and I left a note.",
          "Bar count is no finish yet, I am too busy, you can do it for me tonight.",
          "Yes, I think it is all fine. Do not worry about it tonight.",
          "colleague",
          "Câu cuối khẳng định khi chưa chắc — ca sau sẽ bỏ sót. Câu đúng nói thật việc còn mở và đã để lại ghi chú.",
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
          "New bookings go in the reservation book, not the handover book.",
          "Chỉ đúng sổ cho đồng nghiệp.",
          "colleague",
        ),
      ],
      reading: read(
        `At six, Quang checks the fridge temperature log. The bar fridge is at nine degrees, which is too warm. He tells the chef, and they move the food to another fridge. Then he writes it in the log and in the handover book, so the next shift knows. Engineering checks the bar fridge the next morning.`,
        [
          {
            q: "Quang làm gì khi thấy tủ lạnh quầy bar quá ấm?",
            options: [
              "Để nguyên đồ ăn, chờ sáng mai sửa",
              "Báo bếp và chuyển đồ ăn sang tủ khác",
              "Tự mở tủ ra để sửa máy",
            ],
            correct: 1,
            explanation:
              "'He tells the chef, and they move the food to another fridge' — an toàn thực phẩm không chờ được tới sáng.",
          },
          {
            q: "Vì sao Quang ghi vào cả sổ bàn giao?",
            options: [
              "Để ca sau biết chuyện tủ lạnh",
              "Để quản lý tính tiền sửa chữa",
              "Vì cuốn sổ nhiệt độ đã hết trang giấy",
            ],
            correct: 0,
            explanation: "'so the next shift knows' — sổ nhiệt độ cho tủ, sổ bàn giao cho người.",
          },
        ],
      ),
      game: [
        game(
          "Why is the food from the bar fridge in the kitchen now?",
          "The bar fridge was at nine degrees, so we moved the food.",
          "Fridge hot. I move.",
          "It was a little warm, but only one night.",
          "manager",
          "Câu cuối xem nhẹ nhiệt độ tủ lạnh — đó là rủi ro an toàn thực phẩm. Câu đúng báo con số và việc đã làm.",
        ),
      ],
    }),
  ];
}

// ── Week 30 — Checkpoint: putting it together ───────────────────────────
function week30(): LessonContent[] {
  const t1a = "For a special occasion like that, I recommend the tasting menu, madam.";
  const t1b = "Of course. We are going to bring the cake at nine, after the main course.";
  const t1c = "I will take your wine order after you choose the food, madam.";
  const t2a = "Because we keep the room only for your group that night, sir.";
  const t2b = "Could you send the final headcount by Thursday, sir? The kitchen orders on Friday.";
  const t2c = "Yes, sir. I will ask the banquet team to change the table layout.";
  const t3a = "I am very sorry, madam. The private room setup will be finished by half past seven.";
  const t3b =
    "I understand, madam. If you like, I can serve your drinks in the bar while you wait.";
  const t3c = "I will ask my manager about that, madam. She is coming to see you now.";
  return [
    L(30, 1, "Recommend and Promise", "Gợi ý và cam kết", {
      vocabulary: [
        c("Special occasion", "Is this dinner for a special occasion, madam?"),
        c("Menu choice", "Please send us your menu choice by Thursday."),
        c("Cake delivery time", "The cake delivery time is nine o'clock, after the main course."),
        c("Wine order", "I will take your wine order after you choose the food."),
      ],
      grammar: [
        g(
          "This menu good for party.",
          "For a special occasion, I recommend the tasting menu, madam.",
          "Tuần 23: 'I recommend + the + món', không chen 'you' vào giữa.",
          "For a special occasion, I recommend you the tasting menu, madam.",
        ),
        g(
          "Cake nine, ok.",
          "We are going to bring the cake at nine, after the main course.",
          "Tuần 25: 'be going to + động từ dạng gốc' cho kế hoạch đã định.",
          "We are going to bringing the cake at nine, after the main course.",
        ),
      ],
      speaking: [
        sp(
          "It is our parents' fortieth anniversary next week. What do you suggest?",
          t1a,
          "Tuần 23: gợi ý theo đúng dịp của khách.",
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
          "And the wine?",
          t1c,
          "Thứ tự hợp lý: chọn món trước, chọn rượu sau.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "My father cannot eat gluten. Can he have the tasting menu?",
          "I will check your dietary request with the chef before you order, madam.",
          "Tuần 23 và 26: không tự trả lời về thành phần — hỏi bếp trước khi khách gọi món.",
        ),
        sp(
          "When do you need our menu choice?",
          "Please send your menu choice by Thursday, madam. The kitchen orders on Friday.",
          "Mốc + lý do thật của mốc đó.",
        ),
      ],
      reading: read(
        `Mrs Lee is planning her parents' fortieth anniversary. Hieu asks if it is a special occasion and recommends the tasting menu. He promises the cake at nine, after the main course, and writes the cake delivery time on the order. Mrs Lee's father cannot eat gluten, so Hieu checks the dietary request with the chef.`,
        [
          {
            q: "Hiếu hứa mang bánh ra lúc nào?",
            options: [
              "Lúc chín giờ, sau món chính",
              "Ngay khi khách vừa tới nhà hàng",
              "Trước món khai vị của bữa tiệc",
            ],
            correct: 0,
            explanation:
              "'He promises the cake at nine, after the main course' — lời hứa có mốc, và được ghi lại.",
          },
          {
            q: "Hiếu làm gì với chuyện bố của bà Lee không ăn được gluten?",
            options: [
              "Tự chọn món khác cho ông",
              "Hỏi bếp về yêu cầu ăn kiêng",
              "Khuyên ông ăn ít đi một chút",
            ],
            correct: 1,
            explanation:
              "'Hieu checks the dietary request with the chef' — thành phần món ăn là câu trả lời của bếp.",
          },
        ],
      ),
      game: [
        game(
          "We are celebrating our wedding anniversary. Any ideas?",
          "How wonderful, sir. For a special occasion, I recommend the tasting menu.",
          "Anniversary? Eat tasting menu.",
          "Everything here is special, sir. You can order whatever you like tonight.",
          undefined,
          "Câu cuối không gợi ý gì cụ thể. Câu đúng vui cùng khách và gợi ý theo dịp của khách.",
        ),
      ],
    }),

    L(30, 2, "Explain and Coordinate", "Giải thích và điều phối", {
      vocabulary: [
        c("Deposit payment", "Your deposit payment keeps the room for your group."),
        c("Final headcount", "Please send the final headcount by Thursday."),
        c("Table layout", "The banquet team will change the table layout to one long table."),
        c("Set menu price", "The set menu price is per person, with soft drinks."),
      ],
      grammar: [
        g(
          "Pay first, rule.",
          "We have to take a deposit payment because the room is kept for you.",
          "Tuần 24: 'because' + mệnh đề; 'because of' chỉ đi với danh từ.",
          "We have to take a deposit payment because of the room is kept for you.",
        ),
        g(
          "Number people, tell me.",
          "Could you send the final headcount by Thursday, sir?",
          "'by Thursday' = không muộn hơn thứ Năm. 'until' là kéo dài tới lúc đó — sai nghĩa ở đây.",
          "Could you send the final headcount until Thursday, sir?",
        ),
      ],
      speaking: [
        sp(
          "Why do you need a deposit payment for the private room?",
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
        sp(
          "Can we have one long table for everyone?",
          t2c,
          "Tuần 26: một yêu cầu, một bộ phận làm.",
          undefined,
          undefined,
          t2b,
        ),
        risk(
          sp(
            "Can you give us ten percent off the set menu price?",
            "I am sorry, I cannot change the price. The restaurant manager will call you today.",
            "Giảm giá là của quản lý nhà hàng. Từ chối rõ, nói ai gọi lại và khi nào.",
            undefined,
            ["change", "price", "restaurant", "manager", "call", "today"],
          ),
        ),
      ],
      reading: read(
        `Mr Patel books the private room for a team dinner. Vy explains the deposit payment: the room is kept only for his group. She asks for the final headcount by Thursday, and she asks the banquet team for one long table. When Mr Patel asks for ten percent off the set menu price, Vy says the restaurant manager will call him today.`,
        [
          {
            q: "Vy nhờ ai sắp xếp một bàn dài?",
            options: ["Bếp trưởng", "Bộ phận đặt bàn của nhà hàng", "Tổ tiệc của khách sạn"],
            correct: 2,
            explanation:
              "'she asks the banquet team for one long table' — một yêu cầu, đúng một bộ phận làm.",
          },
          {
            q: "Ai trả lời ông Patel về việc giảm giá?",
            options: [
              "Quản lý nhà hàng, gọi trong ngày",
              "Vy, ngay tại bàn khi khách vừa hỏi",
              "Thu ngân, khi in hóa đơn cuối buổi",
            ],
            correct: 0,
            explanation:
              "'the restaurant manager will call him today' — giảm giá là quyết định của quản lý.",
          },
        ],
      ),
      game: [
        game(
          "Could you knock ten percent off the price for our group?",
          "I am sorry, I cannot change the price. The restaurant manager will call you today.",
          "Discount? Okay, cheap for you.",
          "Of course, sir. For a big group like yours, I can give you ten percent off myself.",
          undefined,
          "Câu cuối tự giảm giá — vượt quyền. Câu đúng từ chối lịch sự và nói rõ ai gọi lại.",
        ),
      ],
    }),

    L(30, 3, "Apologise and Solve", "Xin lỗi và giải quyết", {
      vocabulary: [
        c("Private room setup", "The private room setup takes about two hours."),
        c("Dietary request", "Please tell us any dietary request before the dinner."),
        c("Final bill", "The final bill comes after the last drink."),
      ],
      grammar: [
        g(
          "Room not ready, sorry.",
          "I am very sorry the room is late. It will be ready by half past seven.",
          "Tuần 25 và 27: xin lỗi + mốc mới. 'will be ready' — không được bỏ 'be'.",
          "I am very sorry the room is late. It will ready by half past seven.",
        ),
        g(
          "Bill wrong? Not me.",
          "If there is a mistake on the final bill, the manager will check it.",
          "Tuần 28: mệnh đề 'If' dùng hiện tại ('there is'), không dùng 'will'.",
          "If there will be a mistake on the final bill, the manager will check it.",
        ),
      ],
      speaking: [
        sp(
          "We arrived at seven, and the room is still not ready!",
          t3a,
          "Tuần 27: xin lỗi về điều khách gặp + mốc giờ mới.",
        ),
        sp(
          "This is a special night for us.",
          t3b,
          "Tuần 28: đề nghị một việc trong quyền của bạn, để khách chọn.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Will we have to pay for those drinks?",
          t3c,
          "Miễn phí hay không là quyết định của quản lý — bạn không hứa.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "I think there is a mistake on the final bill.",
          "I am sorry, sir. The manager will check the final bill with you now.",
          "Bạn không tự sửa hóa đơn: quản lý kiểm tra cùng khách.",
        ),
      ],
      reading: read(
        `Mrs Kim's group arrives at seven, but the private room setup is not finished. Thu apologises and promises it by half past seven. While they wait, she offers to serve their drinks in the bar. Mrs Kim asks if the drinks will be free. Thu does not promise anything. She asks her manager, who comes to speak with Mrs Kim.`,
        [
          {
            q: "Thu đưa ra giải pháp gì trong lúc khách chờ?",
            options: [
              "Mời khách về phòng nghỉ trước",
              "Phục vụ đồ uống ở quầy bar",
              "Cho khách ngồi tạm ở sảnh",
            ],
            correct: 1,
            explanation:
              "'she offers to serve their drinks in the bar' — giải pháp trong quyền của người phục vụ.",
          },
          {
            q: "Khi khách hỏi đồ uống có miễn phí không, Thu làm gì?",
            options: ["Hứa miễn phí luôn", "Nói rằng khách phải trả hết", "Không hứa, hỏi quản lý"],
            correct: 2,
            explanation:
              "'Thu does not promise anything. She asks her manager' — đồ miễn phí là việc của quản lý.",
          },
        ],
      ),
      game: [
        game(
          "Our room was not ready, so the drinks are free, right?",
          "I will ask my manager about that, madam. She is coming to see you now.",
          "Free? Yes, maybe.",
          "Yes, madam. All your drinks are free.",
          undefined,
          "Câu cuối tự hứa miễn phí — việc của quản lý. Câu đúng không hứa và mời quản lý tới ngay.",
        ),
      ],
    }),

    L(30, 4, "End of Phase Three", "Kết thúc giai đoạn ba", {
      vocabulary: [
        c("Review", "Before service, we review the bookings for tonight."),
        c("Confident", "I feel confident with difficult guests now."),
        c("Reservation time", "The reservation time for the Lee party is eight o'clock."),
      ],
      grammar: [
        g(
          "I know everything now.",
          "I feel more confident now, and I still ask my manager when I am not sure.",
          "Tự tin nhưng biết giới hạn. 'ask my manager' — không có 'to' sau 'ask'.",
          "I feel more confident now, and I still ask to my manager when I am not sure.",
        ),
        g(
          "Time eight.",
          "Can we review the reservation time for the Lee party?",
          "Sau 'Can we' động từ ở dạng gốc: 'review', không thêm -ing.",
          "Can we reviewing the reservation time for the Lee party?",
        ),
      ],
      speaking: [
        sp(
          "How do you feel about busy nights now?",
          "I feel confident, and I still ask the manager when I am not sure.",
          "Câu chốt giai đoạn ba: tự tin, và vẫn hỏi đúng người.",
          "manager",
        ),
        sp(
          "Can you confirm our reservation time for tomorrow?",
          "Of course, sir. Your reservation time is eight o'clock, for twelve guests.",
          "Xác nhận đủ: giờ + số khách.",
        ),
        sp(
          "A guest at table three is very drunk and wants more wine.",
          "Please do not serve him more alcohol. I will call the bar manager.",
          "Tuần 26: không rót thêm, gọi quản lý quầy bar. Nói với đồng nghiệp: ngắn, rõ.",
          "colleague",
        ),
        sp(
          "Let us review tonight. What was the hardest moment?",
          "A guest wanted a discount. I did not promise it, and I called you.",
          "Ôn lại với quản lý: chuyện gì, bạn đã làm gì, theo đúng thẩm quyền.",
          "manager",
        ),
      ],
      reading: read(
        `After eight weeks, Hieu reviews his notes with his manager. He feels more confident now. He recommends dishes, explains each charge with its real reason, and promises only times he can keep. When a guest asks for a discount, a free dish or an allergy answer, he still asks the right person. That is not a weakness; it is the job.`,
        [
          {
            q: "Hiếu vẫn hỏi người khác trong những trường hợp nào?",
            options: [
              "Khi khách hỏi giờ mở cửa nhà hàng",
              "Khi khách muốn xem thực đơn rượu",
              "Khi khách hỏi giảm giá, món miễn phí hay chuyện dị ứng",
            ],
            correct: 2,
            explanation:
              "'a discount, a free dish or an allergy answer, he still asks the right person' — những việc không thuộc quyền của người phục vụ.",
          },
          {
            q: "Bài đọc nói gì về việc hỏi đúng người?",
            options: [
              "Đó là một phần của công việc",
              "Đó là dấu hiệu chưa đủ tự tin",
              "Chỉ nhân viên mới cần làm vậy",
            ],
            correct: 0,
            explanation:
              "'That is not a weakness; it is the job' — biết giới hạn là một kỹ năng nghề.",
          },
        ],
      ),
      game: [
        game(
          "Do you still need help from me on busy nights?",
          "Yes. I feel confident, but I still ask you when I am not sure.",
          "No. I know all now.",
          "No, not really. I can decide most things myself now, even the discounts.",
          "manager",
          "Câu cuối tự nhận quyền giảm giá — không phải quyền của người phục vụ. Câu đúng tự tin và vẫn biết khi nào phải hỏi.",
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
