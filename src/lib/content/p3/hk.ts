// ============================================================
// HOUSEKEEPING — PHASE 3 (weeks 23-30), written for the department.
//
// Round 1 of the blind audit (ac24e13) scored the frame-built HK weeks at
// 6.28 (Academic Director) and 4.33 (Executive Housekeeper). What the
// Executive Housekeeper could not accept was the room attendant being taught
// to own decisions the floor does not own: "We have to apply the smoking
// penalty", "the missing towel charge applies here", "It was our mistake"
// before anyone had looked, "We can move you to another room". So:
//
//  · HK EXPLAINS a charge; the front desk bills it and a supervisor checks
//    first. HK never adds, removes or waives one.
//  · Room moves belong to the front desk; refunds and anything free belong
//    to a manager. The attendant passes the request on and says who decides.
//  · An apology is for what the guest experienced, not a verdict on whose
//    fault it was.
//  · The hard cases a floor actually meets are here: a door asked to be
//    opened with no key, the Do Not Disturb sign, a wet floor and a fall, a
//    ring found after checkout and the log a witness signs, a guest who says
//    the cleaner took something. Those turns are marked `risk`: they are the
//    pool the checkpoint's must-be-right draw comes from.
//  · Week 29 is talk between colleagues and to a supervisor, and is labelled
//    so; the lost-item log is for lost items, the shift log for the shift.
//
// Cards keep the reviewed HK bank entries (kit.ts looks them up), because
// Phase 4 recycles seventeen of them.
// ============================================================
import type { LessonContent } from "../week-content";
import { game, g, read, sp } from "../phase0";
import { cardsFor, lessonsFor, risk } from "./kit";

const c = cardsFor("HK");
const L = lessonsFor("HK");

// ── Week 23 — Recommending from the pillow menu ─────────────────────────
function week23(): LessonContent[] {
  const t1a = "I recommend the memory foam topper, madam. It is softer than the mattress.";
  const t1b = "It is free from our pillow menu. I can put it on your bed this afternoon.";
  const t1c = "Then I also recommend the duvet upgrade, madam. It is warmer than the blanket.";
  const t2a = "The blackout curtains keep the room darker. I recommend closing them at turndown.";
  const t2b = "It is our evening turndown, madam. We prepare the bed and close the curtains.";
  const t2c = "Yes, madam. It is easier than doing it yourself, and we finish by seven.";
  const t3a = "For your baby, I recommend the baby bath set, madam. It is very gentle.";
  const t3b = "Of course, madam. Do you have an allergy?";
  const t3c =
    "Then I recommend the anti-allergy bedding, madam. I will note the allergy for your room.";
  const t4a = "Of course, madam. The standard pillowcase is also very good.";
  const t4b = "Then I recommend the plush towel set, madam. The towels are thicker and softer.";
  const t4c = "Of course. I will bring two fresh standard towels this afternoon.";
  return [
    L(23, 1, "From the Pillow Menu", "Gợi ý từ thực đơn gối", {
      vocabulary: [
        c("Recommend", "I recommend the memory foam topper for a bad back."),
        c("Instead", "Would you like a firmer pillow instead?"),
        c("Memory foam topper", "The memory foam topper makes a hard bed softer."),
        c("Duvet upgrade", "The duvet upgrade is warmer than the standard blanket."),
        c("Premium toiletries", "The front desk adds a small charge for the premium toiletries."),
      ],
      grammar: [
        g(
          "You take this one.",
          "I recommend the memory foam topper, madam. It is softer.",
          "Gợi ý bằng 'I recommend + the + món', rồi nêu MỘT lý do ngắn. Khách vẫn là người quyết định.",
          "I recommend you the memory foam topper, madam. It is softer.",
        ),
        g(
          "This one good, you want?",
          "Would you like a firmer pillow instead, sir?",
          "'Would you like…?' là lời mời. 'Instead' đứng cuối câu khi đưa phương án thay thế.",
          "Do you like a firmer pillow instead, sir?",
        ),
      ],
      speaking: [
        sp(
          "My back hurts. The bed is too hard for me.",
          t1a,
          "Nghe ra lý do (đau lưng) rồi mới gợi ý, và nói MỘT lợi ích: 'softer than the mattress'.",
        ),
        sp(
          "Is it free, or do I have to pay for it?",
          t1b,
          "Nói rõ món nào miễn phí. Món có phí thì quầy lễ tân tính, không phải bạn.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Great. I also feel cold at night.",
          t1c,
          "Nhu cầu thứ hai — gợi ý thêm một món, vẫn kèm một lý do so sánh.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "I would like something nicer in the bathroom.",
          "I recommend our premium toiletries, sir. The front desk will add a small charge.",
          "Gợi ý món có phí thì báo luôn ai tính phí: lễ tân, không phải bạn.",
        ),
        sp(
          "Actually, I do not like soft beds at all.",
          "Of course, sir. Would you like a firmer pillow instead?",
          "Khách không thích gợi ý đầu — đưa phương án thay thế bằng 'instead', không tranh luận.",
        ),
      ],
      reading: read(
        `Room 612 tells Hoa that the bed is too hard. Hoa listens first, then says: "I recommend the memory foam topper, madam. It is softer than the mattress." The guest also feels cold at night, so Hoa recommends the duvet upgrade. Both are free from the pillow menu. The premium toiletries are different: the front desk adds a small charge to the bill.`,
        [
          {
            q: "Vì sao Hoa gợi ý tấm đệm cao su non?",
            options: [
              "Vì khách nói giường cứng và bị đau lưng",
              "Vì đó là món đắt nhất trong thực đơn gối",
              "Vì trưởng bộ phận yêu cầu bán món đó",
            ],
            correct: 0,
            explanation:
              "'The bed is too hard' — gợi ý đi SAU nhu cầu khách vừa nói. Gợi ý không gắn với nhu cầu chỉ là chào hàng.",
          },
          {
            q: "Ai thêm khoản phí của bộ đồ dùng phòng tắm cao cấp?",
            options: [
              "Quầy lễ tân thêm vào hóa đơn của khách",
              "Hoa tự ghi khoản phí vào sổ theo dõi của tầng mình",
              "Khách đưa tiền mặt cho nhân viên buồng",
            ],
            correct: 0,
            explanation:
              "'the front desk adds a small charge' — buồng phòng gợi ý, lễ tân lập hóa đơn. Nhân viên buồng không tự thu tiền.",
          },
        ],
      ),
      game: [
        game(
          "My back hurts on this bed. What can you do?",
          "I recommend the memory foam topper, madam. It is softer.",
          "You take topper, it more soft.",
          "Most guests get used to our beds after one night here, madam.",
          undefined,
          "Câu cuối đúng ngữ pháp nhưng gạt nhu cầu của khách đi. Câu đúng gợi ý MỘT món cụ thể và nêu lợi ích của nó.",
        ),
      ],
    }),

    L(23, 2, "Comparing Two Options", "So sánh hai lựa chọn", {
      vocabulary: [
        c("Quieter", "The air purifier is quieter than the old desk fan."),
        c("Air purifier", "The air purifier cleans the air while you sleep."),
        c("Blackout curtains", "The blackout curtains keep the room dark in the morning."),
        c("Evening turndown", "The evening turndown is at seven o'clock."),
      ],
      grammar: [
        g(
          "This machine more quiet.",
          "The air purifier is quieter than the old fan, madam.",
          "Tính từ ngắn so sánh hơn: thêm -er + than. quiet → quieter than. Không dùng 'more quiet'.",
          "The air purifier is more quieter than the old fan, madam.",
        ),
        g(
          "Curtain dark, you sleep good.",
          "The blackout curtains keep the room darker in the morning.",
          "'Curtains' là số nhiều nên động từ không thêm -s: keep. So sánh hơn: dark → darker.",
          "The blackout curtains keeps the room darker in the morning.",
        ),
      ],
      speaking: [
        sp(
          "The room is so bright at six in the morning.",
          t2a,
          "Nêu lợi ích bằng so sánh hơn (darker), rồi gợi ý một việc cụ thể.",
        ),
        sp(
          "What is turndown, exactly?",
          t2b,
          "Khách hỏi lại — giải thích bằng hai việc cụ thể, không dùng thuật ngữ nội bộ.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Is that better than doing it myself?",
          t2c,
          "'easier than' — trả lời câu so sánh bằng một câu so sánh, kèm mốc giờ.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "The air feels dusty, and the desk fan is noisy.",
          "The air purifier is quieter than the fan, sir. It also cleans the air.",
          "So sánh đúng MỘT điểm khách đang khó chịu: tiếng ồn.",
        ),
      ],
      reading: read(
        `Mr Haas is a light sleeper. Mai explains two options. "The blackout curtains keep the room darker. The evening turndown is easier than doing it yourself — we finish by seven." For the noise, she offers the air purifier, which is quieter than the old desk fan. Mr Haas chooses both.`,
        [
          {
            q: "Mai nói gì về rèm chắn sáng?",
            options: [
              "Rèm giữ cho căn phòng tối hơn vào buổi sáng",
              "Rèm được thay mới mỗi ngày trước bảy giờ tối",
              "Rèm chỉ dùng được khi khách đặt dịch vụ tối",
            ],
            correct: 0,
            explanation:
              "'keep the room darker' — darker là so sánh hơn của dark, nói đúng lợi ích khách cần.",
          },
          {
            q: "Máy lọc không khí được so sánh với cái gì?",
            options: [
              "Với chiếc quạt bàn cũ trong phòng khách",
              "Với máy điều hòa của phòng bên cạnh",
              "Với chiếc máy hút bụi của tổ buồng phòng",
            ],
            correct: 0,
            explanation:
              "'quieter than the old desk fan' — câu so sánh luôn nói rõ được so với cái gì, sau 'than'.",
          },
        ],
      ),
      game: [
        game(
          "Which is better for a light sleeper, the fan or the air purifier?",
          "The air purifier is quieter than the fan, madam.",
          "Air purifier more quiet than fan.",
          "Both are the same, madam, so it does not really matter.",
          undefined,
          "Câu cuối không giúp khách chọn. Câu đúng so sánh rõ MỘT điểm khách quan tâm: 'quieter than the fan'.",
        ),
      ],
    }),

    L(23, 3, "Reading the Guest", "Đọc nhu cầu của khách", {
      vocabulary: [
        c("Baby bath set", "The baby bath set has a small tub and soft towels."),
        c("Anti-allergy bedding", "We use anti-allergy bedding for guests with allergies."),
        c("Pillow spray", "The pillow spray has lavender in it."),
      ],
      grammar: [
        g(
          "Baby? Take this.",
          "For your baby, I recommend the baby bath set, madam.",
          "Mở đầu bằng 'For your baby,' cho thấy gợi ý đi theo đúng người sẽ dùng.",
          "For your baby, I recommend for you the baby bath set, madam.",
        ),
        g(
          "You allergy? Use this.",
          "Do you have an allergy? We have anti-allergy bedding, sir.",
          "Hỏi trước rồi mới gợi ý. 'an allergy' — danh từ số ít bắt đầu bằng nguyên âm cần 'an'.",
          "Do you have allergy? We have anti-allergy bedding, sir.",
        ),
      ],
      speaking: [
        sp(
          "We are travelling with our baby. She is ten months old.",
          t3a,
          "Nghe ra người dùng (em bé) rồi gợi ý đúng món cho em bé.",
        ),
        risk(
          sp(
            "Can we also have the pillow spray? It smells lovely.",
            t3b,
            "Món có hương liệu: HỎI DỊ ỨNG trước khi dùng. Đừng đoán thay khách.",
            undefined,
            ["allergy"],
            t3a,
          ),
        ),
        sp(
          "Yes, my husband is allergic to dust.",
          t3c,
          "Đã biết dị ứng thì gợi ý món phù hợp và ghi lại cho phòng để ca sau biết.",
          undefined,
          undefined,
          t3b,
        ),
      ],
      reading: read(
        `A family checks in with a ten-month-old baby. Lan recommends the baby bath set. When the mother asks for the pillow spray, Lan first asks about allergies, because the spray has lavender. The father is allergic to dust, so Lan recommends the anti-allergy bedding and notes the allergy for the room.`,
        [
          {
            q: "Vì sao Lan hỏi về dị ứng trước khi đưa xịt thơm gối?",
            options: [
              "Vì xịt có tinh dầu oải hương, có thể gây dị ứng",
              "Vì xịt thơm gối là món khách phải trả thêm tiền",
              "Vì chỉ phòng có trẻ nhỏ mới được dùng xịt thơm",
            ],
            correct: 0,
            explanation:
              "'because the spray has lavender' — món có hương liệu thì hỏi dị ứng trước, không làm rồi mới hỏi.",
          },
          {
            q: "Lan làm gì sau khi biết người chồng dị ứng bụi?",
            options: [
              "Gợi ý bộ chăn ga chống dị ứng và ghi chú cho phòng",
              "Mang thêm xịt thơm gối để át đi mùi bụi trong phòng",
              "Khuyên gia đình đổi sang một khách sạn khác cho chắc",
            ],
            correct: 0,
            explanation:
              "'recommends the anti-allergy bedding and notes the allergy' — giải pháp đúng nhu cầu, và ghi lại để ca sau không quên.",
          },
        ],
      ),
      game: [
        game(
          "Can I have some of that lovely pillow spray?",
          "Of course. It has lavender in it. Do you have any allergies?",
          "Yes, you take spray, very nice smell.",
          "Sure, madam. I will spray it on all the pillows and the sheets now.",
          undefined,
          "Câu cuối làm ngay mà không hỏi. Với món có hương liệu: nói thành phần, hỏi dị ứng, rồi mới dùng.",
        ),
      ],
    }),

    L(23, 4, "When the Guest Says No", "Khi khách từ chối", {
      vocabulary: [
        c("Silk pillowcase", "The silk pillowcase is soft on hair and skin."),
        c("Plush towel set", "The plush towel set is thicker than our standard towels."),
        c("Bath salt set", "I can note the bath salt set for your next visit."),
      ],
      grammar: [
        g(
          "No? Okay bye.",
          "Of course, madam. The standard pillowcase is also very good.",
          "Khách từ chối vẫn được phục vụ tử tế — chấp nhận ngay và khen lựa chọn của khách.",
          "Of course, madam. The standard pillowcase is also very well.",
        ),
        g(
          "You want next time maybe.",
          "I can note the bath salt set for your next visit, sir.",
          "Gợi ý cho lần sau giữ quan hệ mà không ép. 'your next visit' — tính từ sở hữu 'your'.",
          "I can note the bath salt set for you next visit, sir.",
        ),
      ],
      speaking: [
        sp(
          "Thank you, but I do not need the silk pillowcase.",
          t4a,
          "Câu quan trọng nhất tuần: lời từ chối được đón nhận nhẹ nhàng, không tiếc nuối.",
        ),
        sp(
          "Maybe something for the bathroom, then?",
          t4b,
          "Khách tự mở lời — mới gợi ý thêm, và chỉ một món.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "No, thank you. The normal towels are fine.",
          t4c,
          "Khách từ chối lần hai: dừng gợi ý, làm đúng điều khách muốn.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "We leave tomorrow, so not this time.",
          "No problem, sir. I can note the bath salt set for your next visit.",
          "Không ép — để dành gợi ý cho lần sau.",
        ),
      ],
      reading: read(
        `Ms Lindqvist says no to the silk pillowcase. Thu smiles: "Of course, madam. The standard pillowcase is also very good." Thu offers the plush towel set once. When the guest says no again, Thu simply brings fresh standard towels. She does not ask a third time.`,
        [
          {
            q: "Thu phản ứng thế nào khi khách từ chối vỏ gối lụa?",
            options: [
              "Vui vẻ chấp nhận và khen lựa chọn của khách",
              "Giải thích lại lợi ích để khách đổi ý lần nữa",
              "Im lặng rồi đi sang dọn một căn phòng khác",
            ],
            correct: 0,
            explanation:
              "'The standard pillowcase is also very good' — chấp nhận và khẳng định lựa chọn của khách là đúng.",
          },
          {
            q: "Sau lời từ chối đầu tiên, Thu gợi ý thêm bao nhiêu lần?",
            options: [
              "Một lần, rồi làm đúng điều khách muốn",
              "Ba lần, vì khách có thể đổi ý phút cuối",
              "Không lần nào, vì gợi ý là việc của lễ tân",
            ],
            correct: 0,
            explanation:
              "'She does not ask a third time' — gợi ý một lần là phục vụ, gợi ý mãi là ép khách.",
          },
        ],
      ),
      game: [
        game(
          "Thank you, but we will keep the standard towels.",
          "Of course, sir. The standard towels are also very good.",
          "Okay. You no want. Fine.",
          "Are you sure, sir? The plush set is much better.",
          undefined,
          "Câu cuối ép khách sau khi khách đã từ chối. Câu đúng chấp nhận ngay và khen lựa chọn của khách.",
        ),
      ],
    }),
  ];
}

// ── Week 24 — Explaining a charge you do not decide ─────────────────────
function week24(): LessonContent[] {
  const t1a = "Of course. There is a rollaway bed charge for that, madam.";
  const t1b = "I am sorry. The front desk can explain the price before we bring it.";
  const t1c = "Thank you, madam. I will bring it up after the front desk confirms.";
  const t2a = "We have to check the minibar every morning because the bill must be correct.";
  const t2b = "I understand. I will ask my supervisor to check the minibar count with you.";
  const t2c = "I am sorry, I cannot change the bill. The front desk can check it.";
  const t3a = "I am sorry, madam. I only reported what I counted this morning.";
  const t3b = "Not at all, madam. My supervisor will check the room before any charge.";
  const t3c = "The front desk will call you this afternoon, madam.";
  const t4a = "Our lost property rule is simple, sir. The front desk returns all items.";
  const t4b = "I am sorry, I cannot do that. The front desk will check it with you.";
  return [
    L(24, 1, "There Is a Charge", "Có một khoản phí", {
      vocabulary: [
        c("Charge", "There is a small charge for an extra bed."),
        c("Front desk", "The front desk explains the price and adds the charge."),
        c("Policy", "Our policy is on the card in your wardrobe."),
        c("Rollaway bed charge", "There is a rollaway bed charge for each night."),
        c("Laundry price list", "The laundry price list is in the wardrobe."),
      ],
      grammar: [
        g(
          "Bed extra, you pay.",
          "There is a rollaway bed charge for that, madam.",
          "'There is a … charge for that' báo phí nhẹ nhàng — báo thông tin, không ra lệnh trả tiền.",
          "There has a rollaway bed charge for that, madam.",
        ),
        g(
          "Laundry not free.",
          "The prices are on the laundry price list in your wardrobe.",
          "Chỉ cho khách chỗ xem giá viết sẵn. 'The prices' số nhiều đi với 'are'.",
          "The prices is on the laundry price list in your wardrobe.",
        ),
      ],
      speaking: [
        sp(
          "Can you bring an extra bed for my son?",
          t1a,
          "Đồng ý trước ('Of course'), rồi báo có phí. Không để khách tự phát hiện trên hóa đơn.",
        ),
        sp(
          "Nobody told me about that.",
          t1b,
          "Xin lỗi, rồi để lễ tân giải thích giá. Buồng phòng không báo giá thay lễ tân.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Fine. Please bring it tonight.",
          t1c,
          "Hứa làm, nhưng chỉ sau khi lễ tân xác nhận — vì khoản phí đi vào hóa đơn.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "How much is it to wash a shirt?",
          "The prices are on the laundry price list in your wardrobe, sir.",
          "Chỉ đúng chỗ có bảng giá; đừng đọc giá theo trí nhớ.",
        ),
      ],
      reading: read(
        `Mrs Park asks for an extra bed. Tuan says: "There is a rollaway bed charge for that, madam." She says nobody told her. Tuan does not argue about the price — the front desk explains it and adds the charge. Tuan brings the bed up after the front desk confirms.`,
        [
          {
            q: "Ai giải thích giá và thêm phí giường phụ?",
            options: [
              "Quầy lễ tân giải thích giá và thêm khoản phí",
              "Tuấn tự báo giá rồi ghi khoản phí vào sổ theo dõi của tầng",
              "Khách tự tính theo bảng giá dán trong tủ đồ",
            ],
            correct: 0,
            explanation:
              "'the front desk explains it and adds the charge' — buồng phòng báo có phí, lễ tân giải thích và lập hóa đơn.",
          },
          {
            q: "Khi khách nói 'chưa ai báo', Tuấn làm gì?",
            options: [
              "Không tranh luận, để lễ tân giải thích trước",
              "Khẳng định khách đã được báo lúc nhận phòng",
              "Bỏ qua khoản phí cho khách khỏi phiền lòng",
            ],
            correct: 0,
            explanation:
              "Tranh luận về giá hay tự bỏ phí đều vượt việc của buồng phòng. Chuyển đúng người có quyền.",
          },
        ],
      ),
      game: [
        game(
          "Is the extra bed free?",
          "There is a rollaway bed charge for that, madam.",
          "Not free. You pay bed.",
          "Do not worry, madam, I will not tell anyone about it.",
          undefined,
          "Câu cuối hứa giấu khoản phí — nhân viên buồng không có quyền bỏ phí. Câu đúng báo nhẹ nhàng là có phí.",
        ),
      ],
    }),

    L(24, 2, "Because — Giving the Real Reason", "Nêu lý do thật bằng 'because'", {
      vocabulary: [
        c("Because", "We check the minibar because the bill must be correct."),
        c("Minibar charge", "The minibar charge comes from the morning count."),
        c("Deep cleaning fee", "There is a deep cleaning fee after smoking in the room."),
        c("Smoking penalty", "The duty manager decides on any smoking penalty."),
      ],
      grammar: [
        g(
          "Rule is rule.",
          "We have to check the minibar every morning because the bill must be correct.",
          "'have to' + động từ nguyên mẫu = việc bắt buộc phải làm; 'because' + LÝ DO THẬT. 'Vì đó là quy định' không phải là lý do.",
          "We have to checking the minibar every morning because the bill must be correct.",
        ),
        g(
          "You smoke, you pay.",
          "I cannot decide a smoking penalty, sir. My supervisor checks the room first.",
          "Nhân viên buồng không tự kết luận phạt. Báo lại, người có thẩm quyền kiểm tra.",
          "I cannot to decide a smoking penalty, sir. My supervisor checks the room first.",
        ),
      ],
      speaking: [
        sp(
          "Why is there a minibar charge on my bill?",
          t2a,
          "Nêu lý do thật bằng 'because' — hóa đơn phải chính xác — không nói 'it is policy'.",
        ),
        sp(
          "But I did not drink anything.",
          t2b,
          "Không cãi khách. Nhờ người có trách nhiệm kiểm lại cùng khách.",
          undefined,
          undefined,
          t2a,
        ),
        risk(
          sp(
            "Can you just remove it for me?",
            t2c,
            "Câu thẩm quyền của tuần: bạn KHÔNG sửa hóa đơn. Nói rõ ai kiểm tra lại.",
            undefined,
            ["change", "bill", "front", "desk"],
            t2b,
          ),
        ),
        sp(
          "Why do you charge a deep cleaning fee for smoking?",
          "Because smoke stays in the curtains and carpet, sir. It takes a full day to clean.",
          "Lý do cụ thể khách hiểu được: khói bám vào rèm và thảm.",
        ),
      ],
      reading: read(
        `Mr Cole questions a minibar charge. Linh explains: "We have to check the minibar every morning because the bill must be correct." Mr Cole says the minibar was not used. Linh does not remove the charge herself. She asks her supervisor to check the count with the guest, and the front desk reviews the bill.`,
        [
          {
            q: "Vì sao tổ buồng kiểm minibar mỗi sáng?",
            options: [
              "Để hóa đơn của khách luôn được chính xác",
              "Để bán thêm đồ uống cho khách mỗi ngày",
              "Để xem nhân viên có tự lấy đồ trong phòng",
            ],
            correct: 0,
            explanation:
              "'because the bill must be correct' — đó là lý do thật, nói được với khách.",
          },
          {
            q: "Linh xử lý thế nào khi khách nói mình không uống gì?",
            options: [
              "Nhờ giám sát kiểm lại, lễ tân xem lại hóa đơn",
              "Tự xóa khoản phí khỏi hóa đơn để khách được vui lòng",
              "Nói với khách rằng phép đếm không bao giờ sai",
            ],
            correct: 0,
            explanation:
              "'does not remove the charge herself' — xoá phí là quyết định về tiền, thuộc lễ tân và quản lý.",
          },
        ],
      ),
      game: [
        game(
          "Why do I have to pay a deep cleaning fee?",
          "Because smoke stays in the curtains and carpet, sir.",
          "Because rule. You smoke.",
          "Because the hotel likes to add extra fees to every bill, sir.",
          undefined,
          "Câu cuối nói xấu chính khách sạn. Câu đúng nêu lý do thật, cụ thể: khói bám vào rèm và thảm.",
        ),
      ],
    }),

    L(24, 3, "Saying No Without Blaming", "Từ chối mà không quy lỗi", {
      vocabulary: [
        c(
          "Missing towel charge",
          "Before any missing towel charge, my supervisor checks the room.",
        ),
        c("Lost key card fee", "There is a lost key card fee for a new card."),
        c("Pet cleaning fee", "The pet cleaning fee is in our pet policy."),
      ],
      grammar: [
        g(
          "No. You pay.",
          "I am afraid I cannot remove the lost key card fee, madam.",
          "'I am afraid I cannot…' từ chối lịch sự. Không nói 'No' trơn.",
          "I am afraid I cannot removing the lost key card fee, madam.",
        ),
        g(
          "Towel missing, you pay.",
          "I counted two towels missing. My supervisor will check before any charge.",
          "Nói điều bạn THẤY (sự thật), để người có quyền quyết định phí. 'two towels' số nhiều.",
          "I counted two towel missing. My supervisor will check before any charge.",
        ),
      ],
      speaking: [
        sp(
          "Why is there a missing towel charge? I did not take anything!",
          t3a,
          "Bạn chỉ báo số đã đếm — không kết luận, không buộc tội.",
        ),
        risk(
          sp(
            "So you think I am lying?",
            t3b,
            "Không bao giờ buộc tội khách. Có kiểm tra trước, rồi mới có phí — và không phải bạn quyết.",
            undefined,
            ["supervisor", "check", "room", "before", "charge"],
            t3a,
          ),
        ),
        sp(
          "Fine. When will I know?",
          t3c,
          "Kết thúc bằng mốc giờ và ai sẽ báo.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "I lost my key card. Do I have to pay?",
          "There is a lost key card fee, sir. The front desk can explain it.",
          "Báo có phí, chuyển phần giá cho lễ tân.",
        ),
        sp(
          "My dog stayed one night. Why the pet cleaning fee?",
          "Because we deep clean the room after every pet, sir. It is in our pet policy.",
          "Lý do cụ thể + chỉ nơi khách đọc được quy định.",
        ),
      ],
      reading: read(
        `Two towels are missing from Room 708 at checkout. Ngoc counts again and reports it. When the guest is upset, Ngoc says: "I only reported what I counted. My supervisor will check before any charge." The supervisor finds the towels in the wardrobe, and there is no charge.`,
        [
          {
            q: "Ngọc làm gì khi thấy thiếu khăn?",
            options: [
              "Đếm lại rồi báo cáo, không tự quyết khoản phí",
              "Tự cộng phí mất khăn vào hóa đơn của phòng",
              "Hỏi thẳng khách đã mang khăn đi những đâu",
            ],
            correct: 0,
            explanation:
              "'counts again and reports it' — đếm lại cho chắc, báo cáo, để người có quyền kiểm tra.",
          },
          {
            q: "Kết quả cuối cùng là gì?",
            options: [
              "Khăn nằm trong tủ quần áo nên không có phí",
              "Khách vẫn phải trả phí cho cả hai chiếc khăn bị thiếu",
              "Ngọc bị nhắc nhở vì đã đếm sai số khăn",
            ],
            correct: 0,
            explanation:
              "Kiểm tra trước khi tính phí là lý do của quy trình: lần này chính phép kiểm tra cứu cả khách lẫn khách sạn.",
          },
        ],
      ),
      game: [
        game(
          "Are you saying I stole your towels?",
          "Not at all, madam. My supervisor will check before any charge.",
          "Yes. Two towel missing, you pay.",
          "I am sure you took them home by mistake, madam. It happens a lot.",
          undefined,
          "Câu cuối vẫn là buộc tội, chỉ nói mềm hơn. Câu đúng không kết luận gì: có kiểm tra rồi mới có phí.",
        ),
      ],
    }),

    L(24, 4, "Confirming the Rule", "Xác nhận quy định", {
      vocabulary: [
        c("Damaged linen charge", "A damaged linen charge needs a photo and a supervisor check."),
        c("Stain removal fee", "The stain removal fee is on the laundry price list."),
        c("Lost property rule", "Our lost property rule says the front desk returns items."),
        c("Late checkout fee", "There is a late checkout fee after twelve o'clock."),
      ],
      grammar: [
        g(
          "You understand?",
          "Shall I go through the stain removal fee again, madam?",
          "Hỏi khách có muốn nghe lại không bằng 'Shall I go through… again?' — đừng hỏi 'You understand?'.",
          "Shall I go through again the stain removal fee, madam?",
        ),
        g(
          "Late checkout money.",
          "There is a late checkout fee after twelve. The front desk can confirm it.",
          "Báo phí kèm mốc giờ, và người xác nhận. Sau 'can' động từ giữ nguyên dạng gốc.",
          "There is a late checkout fee after twelve. The front desk can confirms it.",
        ),
      ],
      speaking: [
        sp(
          "I left my watch here yesterday. Can I go and look for it?",
          t4a,
          "Nói quy định trước, ngắn gọn: lễ tân là nơi trả đồ.",
        ),
        risk(
          sp(
            "But you are right here. Just give it to me.",
            t4b,
            "Đồ thất lạc chỉ trả qua lễ tân, có kiểm tra giấy tờ. Không tự đưa, dù khách đứng ngay đó.",
            undefined,
            ["front", "desk", "check"],
            t4a,
          ),
        ),
        sp(
          "Sorry, could you go through that charge again?",
          "Of course. Shall I go through the stain removal fee again, madam?",
          "Mời khách nghe lại, đừng hỏi khách có hiểu không.",
        ),
        sp(
          "Why is there a damaged linen charge?",
          "Because the sheet was torn, madam. My supervisor can show you the photo.",
          "Lý do + bằng chứng. Phí hư hỏng luôn có ảnh và người kiểm tra.",
        ),
        sp(
          "Can I stay in the room until three?",
          "There is a late checkout fee after twelve, sir. The front desk can confirm it.",
          "Không tự hứa trả phòng muộn — lễ tân xác nhận.",
        ),
      ],
      reading: read(
        `Mr Diaz comes back for his watch. Hien knows the lost property rule: only the front desk gives items back, after it checks the guest's ID. So Hien does not open the store room herself. She walks Mr Diaz to the front desk, and the front desk returns the watch.`,
        [
          {
            q: "Theo quy định đồ thất lạc, ai trả đồ cho khách?",
            options: [
              "Quầy lễ tân, sau khi kiểm tra giấy tờ",
              "Nhân viên buồng đã nhặt được món đồ",
              "Bất kỳ ai đang giữ chìa khóa kho đồ",
            ],
            correct: 0,
            explanation:
              "'only the front desk gives items back, after it checks the guest's ID' — một đầu mối, có kiểm tra.",
          },
          {
            q: "Vì sao Hiền không tự mở kho đưa đồng hồ?",
            options: [
              "Vì đồ phải trả qua lễ tân có kiểm tra",
              "Vì kho đồ thất lạc đang được sơn lại",
              "Vì khách chưa trả phí giặt là hôm trước",
            ],
            correct: 0,
            explanation:
              "Đưa nhầm đồ cho người không phải chủ là mất đồ của khách. Quy trình qua lễ tân là để chặn chuyện đó.",
          },
        ],
      ),
      game: [
        game(
          "That is my watch on the shelf. Just give it to me, please.",
          "I am sorry, I cannot give items out myself. The front desk will check your ID.",
          "Okay. You watch, you take.",
          "Of course, sir. It must be yours. Here you are.",
          undefined,
          "Câu cuối đoán thay vì kiểm tra — nếu đoán sai là mất đồ của khách khác. Câu đúng chuyển qua lễ tân kiểm tra giấy tờ.",
        ),
      ],
    }),
  ];
}

// ── Week 25 — Promising a time, and keeping it ──────────────────────────
function week25(): LessonContent[] {
  const t1a = "Of course. I will deliver the extra pillows within ten minutes, madam.";
  const t1b = "Then I will bring them up now, madam, before you leave.";
  const t1c = "You are welcome. I will knock once and say 'Housekeeping'.";
  const t2a = "We are going to service your room by three o'clock, madam.";
  const t2b = "No problem. Please hang the Do Not Disturb sign, and we will not knock.";
  const t2c = "Then we will knock once and wait. We will not go in if you say later.";
  const t3a = "We collect your laundry at ten, and we return it by six, sir.";
  const t3b = "Then I will ask the laundry team to return your ironed shirt by four.";
  const t3c = "Of course. If there is a delay, I will call you before three.";
  const t4a = "I am very sorry, sir. I will restock the minibar within five minutes.";
  const t4b = "You are right, sir. I am bringing the items myself now.";
  const t4c = "We will turn down your bed at seven, as you asked.";
  return [
    L(25, 1, "Within Ten Minutes", "Cam kết trong bao lâu", {
      vocabulary: [
        c("Within", "I will be there within ten minutes."),
        c("Straight away", "I will replace the bath mat straight away."),
        c("Deliver the extra pillows", "I will deliver the extra pillows within ten minutes."),
        c("Replace the bath mat", "I will replace the bath mat after your shower."),
      ],
      grammar: [
        g(
          "Pillow coming soon.",
          "I will deliver the extra pillows within ten minutes, madam.",
          "Cam kết có mốc cụ thể: 'within + số phút'. 'Soon' không phải là lời hứa.",
          "I will delivering the extra pillows within ten minutes, madam.",
        ),
        g(
          "Mat change now.",
          "I will replace the bath mat straight away, sir.",
          "'straight away' = ngay lập tức, đứng cuối câu, sau tân ngữ.",
          "I will replace straight away the bath mat, sir.",
        ),
      ],
      speaking: [
        sp(
          "Could we have two extra pillows, please?",
          t1a,
          "Lời hứa có mốc: 'within ten minutes'. Đừng nói 'soon'.",
        ),
        sp(
          "Ten minutes? I am going out very soon.",
          t1b,
          "Khách có ràng buộc — rút ngắn mốc theo khách, đừng bảo vệ mốc cũ.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Thank you. I will wait.",
          t1c,
          "Khép lại bằng cách bạn sẽ vào phòng: gõ một lần và xưng 'Housekeeping'.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "The bath mat is wet and dirty.",
          "I am sorry, madam. I will replace the bath mat straight away.",
          "Việc nhỏ khách đang cần: xin lỗi rồi thay ngay, không cần hẹn giờ.",
        ),
      ],
      reading: read(
        `Room 512 asks for extra pillows. Phuong promises them within ten minutes. The guest is going out very soon, so Phuong brings them up at once, before she leaves. A promise with a real time is easier to keep — and easier for the guest to check.`,
        [
          {
            q: "Vì sao Phương mang gối lên sớm hơn mốc đã hứa?",
            options: [
              "Vì khách nói sắp ra ngoài rất sớm",
              "Vì tổ trưởng yêu cầu cả tầng làm nhanh hơn",
              "Vì gối dự trữ để ngay ở phòng bên cạnh",
            ],
            correct: 0,
            explanation:
              "'The guest is going out very soon' — mốc hứa đi theo thời gian của khách.",
          },
          {
            q: "Bài đọc nói gì về một lời hứa có mốc thời gian?",
            options: [
              "Dễ giữ hơn, và khách dễ kiểm tra hơn",
              "Nên hứa thật sớm dù chưa chắc làm kịp",
              "Không nên hứa giờ cụ thể để tránh phàn nàn",
            ],
            correct: 0,
            explanation:
              "'easier to keep — and easier for the guest to check' — mốc cụ thể làm lời hứa có trách nhiệm.",
          },
        ],
      ),
      game: [
        game(
          "How long until the extra pillows come?",
          "I will deliver them within ten minutes, madam.",
          "Pillow coming, soon soon.",
          "As soon as possible, madam — we are very busy today.",
          undefined,
          "'As soon as possible' không phải lời hứa: khách không biết chờ đến khi nào. Câu đúng có mốc: 'within ten minutes'.",
        ),
      ],
    }),

    L(25, 2, "By Three O'clock — and the Sign on the Door", "Trước ba giờ — và tấm biển trên cửa", {
      vocabulary: [
        c("Going to", "We are going to service your room by three o'clock."),
        c("Service your room", "We will not service your room while the sign is on."),
        c("Vacuum the carpet again", "I will vacuum the carpet again by two o'clock."),
        c("Change the shower curtain", "I will change the shower curtain before you come back."),
      ],
      grammar: [
        g(
          "I clean room later.",
          "We are going to service your room by three o'clock, madam.",
          "'be going to' cho kế hoạch đã sắp xếp; 'by three o'clock' = không muộn hơn ba giờ.",
          "We going to service your room by three o'clock, madam.",
        ),
        g(
          "Curtain dirty, I change.",
          "I will change the shower curtain before you come back, sir.",
          "Hứa theo mốc của khách: 'before you come back'. Sau 'before' dùng hiện tại, không dùng 'will'.",
          "I will change the shower curtain before you will come back, sir.",
        ),
      ],
      speaking: [
        sp("When will you clean my room today?", t2a, "Kế hoạch có sẵn: 'going to' + mốc giờ."),
        sp(
          "I might sleep until two.",
          t2b,
          "Quyền riêng tư của khách đi trước lịch dọn: biển Không làm phiền là để tôn trọng.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "And if I forget the sign?",
          t2c,
          "Gõ một lần, chờ, và KHÔNG vào nếu khách bảo để sau.",
          undefined,
          undefined,
          t2b,
        ),
        risk(
          sp(
            "The guest in 604 asked for service, but the DND sign is still on.",
            "Then we will not knock. I will call the room and ask the guest.",
            "Biển còn treo thì không gõ cửa, dù khách đã gọi dọn. Gọi điện vào phòng hỏi trước.",
            "colleague",
            ["knock", "call", "room", "guest"],
          ),
        ),
        sp(
          "The carpet is still dusty after cleaning.",
          "I am sorry. I will vacuum the carpet again by two o'clock, madam.",
          "Xin lỗi + làm lại + mốc giờ.",
        ),
      ],
      reading: read(
        `The plan for Room 604 is service by three o'clock. At one, the Do Not Disturb sign is still on, even though the guest asked for service this morning. Dung does not go in. She calls the guest from the floor phone, and the guest asks for service at four instead.`,
        [
          {
            q: "Vì sao Dung không vào phòng 604?",
            options: [
              "Biển Không làm phiền vẫn đang treo trên cửa",
              "Khách đã trả phòng từ sáng sớm hôm nay",
              "Phòng đang chờ tổ kỹ thuật tới kiểm tra máy lạnh",
            ],
            correct: 0,
            explanation:
              "'the Do Not Disturb sign is still on' — biển còn treo thì không vào, dù đã có yêu cầu dọn từ sáng.",
          },
          {
            q: "Dung làm gì thay vì vào phòng?",
            options: [
              "Gọi cho khách bằng điện thoại ở tầng",
              "Gõ cửa liên tục cho đến khi khách mở",
              "Bỏ qua phòng đó và không dọn hôm nay",
            ],
            correct: 0,
            explanation:
              "'calls the guest from the floor phone' — hỏi khách, để khách chọn giờ dọn mới.",
          },
        ],
      ),
      game: [
        game(
          "604 asked for service, but the DND sign is on. Should I go in?",
          "No. Call the guest from the floor phone first.",
          "Yes go in, guest want clean.",
          "Yes, just go in quietly so you do not wake them.",
          "colleague",
          "Câu cuối nghe chu đáo nhưng là vào phòng khi biển còn treo. Câu đúng: không vào, gọi khách hỏi trước.",
        ),
      ],
    }),

    L(25, 3, "Keeping the Guest Informed", "Báo cho khách biết tiến độ", {
      vocabulary: [
        c("Collect your laundry", "We collect your laundry at ten o'clock."),
        c("Return your ironed shirt", "We will return your ironed shirt by four."),
        c("Bring fresh towels up", "I will bring fresh towels up within ten minutes."),
        c("Empty the rubbish bins", "I will empty the rubbish bins within five minutes."),
      ],
      grammar: [
        g(
          "Shirt ready, I call.",
          "I will return your ironed shirt by six and call you first.",
          "Hai việc trong một lời hứa nối bằng 'and': cả hai cùng sau 'will', đều ở dạng gốc.",
          "I will return your ironed shirt by six and calling you first.",
        ),
        g(
          "Wait. I tell later.",
          "I do not know yet, but I will call you back within fifteen minutes.",
          "Chưa biết thì nói thật — nhưng vẫn hứa thời điểm gọi lại. 'call you back': tân ngữ đứng giữa.",
          "I do not know yet, but I will call back you within fifteen minutes.",
        ),
      ],
      speaking: [
        sp("When will my laundry come back?", t3a, "Hai mốc giờ: lấy đi và trả về."),
        sp(
          "I need my shirt for a dinner at five.",
          t3b,
          "Khách có mốc riêng — xin tổ giặt làm theo mốc của khách.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Can you tell me if there is a problem?",
          t3c,
          "Hứa báo trước nếu trễ, kèm mốc. Khách không phải tự đi hỏi.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "Could you bring fresh towels up? We just came back from the beach.",
          "Of course, madam. I will bring fresh towels up within ten minutes.",
          "Đồng ý + mốc giờ.",
        ),
        sp(
          "The rubbish bins in our room are full.",
          "I am sorry, sir. I will empty the rubbish bins within five minutes.",
          "Xin lỗi + mốc giờ ngắn cho việc nhỏ.",
        ),
      ],
      reading: read(
        `Mr Tan needs his shirt for a dinner at five, but the normal return time is six. Hai asks the laundry team to return it by four, and promises to call before three if there is a delay. At two, the laundry team confirms, and Hai calls Mr Tan to say the shirt is on time.`,
        [
          {
            q: "Vì sao Hải nhờ tổ giặt trả áo trước bốn giờ?",
            options: [
              "Vì khách cần áo cho bữa tối lúc năm giờ",
              "Vì tổ giặt luôn làm xong trước bốn giờ",
              "Vì khách sẽ trả phòng vào đầu giờ chiều hôm đó",
            ],
            correct: 0,
            explanation:
              "'needs his shirt for a dinner at five' — mốc của khách quyết định mốc của lời hứa.",
          },
          {
            q: "Hải đã hứa gọi cho khách trong trường hợp nào?",
            options: [
              "Trước ba giờ, nếu có chậm trễ",
              "Sau sáu giờ, khi áo đã được trả",
              "Chỉ khi khách gọi xuống để hỏi",
            ],
            correct: 0,
            explanation:
              "'promises to call before three if there is a delay' — báo trước khi khách phải đi hỏi.",
          },
        ],
      ),
      game: [
        game(
          "Can you tell me when my shirt is ready?",
          "Of course. I will call you when it comes back, before four.",
          "Shirt ready, I tell you, okay.",
          "Please call the laundry team yourself, sir. It is much faster that way.",
          undefined,
          "Câu cuối đẩy việc sang khách. Câu đúng nhận việc báo tin, kèm mốc giờ.",
        ),
      ],
    }),

    L(25, 4, "When You Cannot Keep the Promise", "Khi không giữ được lời hứa", {
      vocabulary: [
        c("Restock the minibar", "I will restock the minibar within five minutes."),
        c("Turn down your bed", "We will turn down your bed at seven o'clock."),
        c("Send a room attendant", "I will send a room attendant within ten minutes."),
      ],
      grammar: [
        g(
          "Sorry late. Busy.",
          "I am very sorry for the delay. I will restock the minibar within five minutes.",
          "Xin lỗi + mốc MỚI cho ĐÚNG việc đã hứa, không đổi sang việc khác. Sau 'will' động từ ở dạng gốc.",
          "I am very sorry for the delay. I will restocking the minibar within five minutes.",
        ),
        g(
          "No staff now.",
          "I will send a room attendant to you within ten minutes, madam.",
          "Đưa người cụ thể và mốc giờ, đừng nói 'không có người'.",
          "I will send to you a room attendant within ten minutes, madam.",
        ),
      ],
      speaking: [
        sp(
          "You said ten minutes for the minibar. It has been thirty.",
          t4a,
          "Xin lỗi, giữ ĐÚNG việc khách chờ, đưa mốc mới ngắn hơn.",
        ),
        sp(
          "That is what you said before.",
          t4b,
          "Công nhận khách đúng, rồi tự làm — đừng hứa thêm một lần nữa.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "Fine. And the turndown tonight?",
          t4c,
          "Nhắc lại đúng mốc khách đã yêu cầu.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "Nobody came to turn down my bed.",
          "I am sorry, madam. I will send a room attendant within ten minutes.",
          "Xin lỗi + người + mốc giờ.",
        ),
      ],
      reading: read(
        `Room 309 asked for minibar items thirty minutes ago. The promise was ten minutes. Kien apologises, keeps the same task and gives a new time: five minutes. He does not offer a different service instead. Then he brings the items himself.`,
        [
          {
            q: "Kiên làm gì khi trễ hẹn?",
            options: [
              "Xin lỗi, giữ đúng việc và đưa mốc mới",
              "Xin lỗi rồi đề nghị chỉnh giường thay thế",
              "Giải thích rằng hôm nay tầng quá đông",
            ],
            correct: 0,
            explanation:
              "'keeps the same task and gives a new time' — khách chờ minibar thì giải pháp là minibar, không phải việc khác.",
          },
          {
            q: "Mốc thời gian mới Kiên đưa ra là bao lâu?",
            options: ["Năm phút", "Mười phút", "Ba mươi phút"],
            correct: 0,
            explanation: "'a new time: five minutes' — mốc mới ngắn hơn mốc đã lỡ.",
          },
        ],
      ),
      game: [
        game(
          "You said ten minutes. It has been thirty.",
          "I am very sorry, sir. I will restock the minibar within five minutes.",
          "Sorry. Busy, many room today.",
          "I will turn down your bed instead, sir.",
          undefined,
          "Câu cuối đổi sang một việc khách không yêu cầu. Câu đúng giữ đúng việc khách đang chờ và đưa mốc mới.",
        ),
      ],
    }),
  ];
}

// ── Week 26 — One request, one owner ────────────────────────────────────
function week26(): LessonContent[] {
  const t1a = "I am sorry, sir. Let me check with the engineering team for you.";
  const t1b = "I am not trained for that, sir. I will call them now and tell you the time.";
  const t1c = "I will tell the engineering team about your call at six, sir.";
  const t2a = "I am sorry. I will ask the minibar attendant to restock it within an hour.";
  const t2b = "The minibar attendant counts every item, sir. That keeps your bill correct.";
  const t2c = "Of course. I will arrange it before six and call you.";
  const t3a = "I am very sorry, madam. I will call the pest control team now.";
  const t3b = "Yes, madam. I have informed them, and they are coming at eight.";
  const t3c = "I understand, madam. I will ask the front desk about another room for you.";
  const t4a = "Yes, sir. The engineering team has fixed it, and I checked it myself.";
  const t4b = "I am very sorry, sir. I will tell the duty manager about your night.";
  return [
    L(26, 1, "Let Me Check With…", "Để tôi hỏi bộ phận…", {
      vocabulary: [
        c("Colleague", "My colleague at the front desk will help you."),
        c("Transfer", "I will transfer your call to the front desk."),
        c("Engineering team", "The engineering team fixes the air conditioning."),
        c("Security", "Security comes when a guest does not feel safe.", [
          "/sɪˈkjʊərəti/",
          "Bộ phận an ninh",
          "🛡️",
        ]),
      ],
      grammar: [
        g(
          "Not my job.",
          "Let me check with the engineering team for you, sir.",
          "'Let me check with + bộ phận' — nhận việc thay khách, không đẩy khách đi.",
          "Let me checking with the engineering team for you, sir.",
        ),
        g(
          "Go reception.",
          "The front desk handles key cards. I will call them for you now.",
          "Nói rõ ai phụ trách rồi TỰ gọi giúp khách. 'The front desk' là một bộ phận: 'handles'.",
          "The front desk handle key cards. I will call them for you now.",
        ),
      ],
      speaking: [
        sp(
          "The air conditioner is making a loud noise.",
          t1a,
          "Việc của kỹ thuật — nhận lời, tự liên hệ, không bảo khách tự gọi.",
        ),
        sp(
          "Can you not fix it yourself?",
          t1b,
          "Không làm việc ngoài chuyên môn. Nói thật, và hứa báo lại giờ cụ thể.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Please hurry. I have a phone call at six.",
          t1c,
          "Chuyển đúng ràng buộc của khách cho bộ phận làm việc.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "My key card stopped working.",
          "The front desk handles key cards, madam. I will call them for you now.",
          "Nói rõ bộ phận phụ trách rồi gọi giúp.",
        ),
        risk(
          sp(
            "I left my key inside. Please open room 714 for me.",
            "I am sorry, I cannot open the door. The front desk will check who you are.",
            "Không mở cửa cho người chưa được xác minh — kể cả khi họ nói đúng số phòng.",
            undefined,
            ["open", "door", "front", "desk", "check"],
          ),
        ),
        sp(
          "Is this housekeeping? I have a question about my bill.",
          "Yes, madam. I will transfer your call to the front desk.",
          "Hóa đơn là việc của lễ tân — chuyển máy, đừng đoán.",
        ),
        risk(
          sp(
            "A man keeps knocking on my door, and I do not know him.",
            "I am calling security now, madam. Please do not open your door.",
            "Khách thấy không an toàn: gọi an ninh ngay, dặn khách không mở cửa. Không tự ra đối mặt.",
            undefined,
            ["calling", "security", "open", "door"],
          ),
        ),
      ],
      reading: read(
        `A man in the corridor says: "I left my key inside 714. Just open it." Thao does not open the door. She says: "I am sorry, I cannot open the door. The front desk will check your ID first." She calls the front desk. They check his ID and give him a new key card.`,
        [
          {
            q: "Vì sao Thảo không mở cửa phòng 714?",
            options: [
              "Chưa xác minh được người đó là khách của phòng",
              "Phòng 714 đang được tổ kỹ thuật sửa chữa",
              "Thảo không mang theo chìa khóa tổng ca đó",
            ],
            correct: 0,
            explanation:
              "Biết số phòng chưa chứng minh là khách của phòng. Mở cửa cho người lạ là rủi ro mất đồ và an toàn.",
          },
          {
            q: "Ai kiểm tra giấy tờ và cấp thẻ phòng mới?",
            options: [
              "Quầy lễ tân, sau khi kiểm tra giấy tờ",
              "Thảo, sau khi hỏi tên và số điện thoại",
              "Trưởng bộ phận buồng phòng của ca đó",
            ],
            correct: 0,
            explanation:
              "'They check his ID and give him a new key card' — một đầu mối, có xác minh.",
          },
        ],
      ),
      game: [
        game(
          "I left my key inside. Just open the door for me, please.",
          "I am sorry, I cannot open the door. The front desk will check your ID first.",
          "Okay. You room, I open.",
          "Of course, sir. You look like the guest from this room.",
          undefined,
          "Câu cuối mở cửa vì 'trông giống' — không phải xác minh. Câu đúng chuyển sang lễ tân kiểm tra giấy tờ.",
        ),
      ],
    }),

    L(26, 2, "I'll Ask Them To…", "Tôi sẽ nhờ họ…", {
      vocabulary: [
        c("Arrange", "I will arrange the restock before six."),
        c("Minibar attendant", "The minibar attendant counts and restocks every minibar."),
        c("Turndown attendant", "The turndown attendant comes in the evening."),
        c("Executive housekeeper", "The executive housekeeper leads the housekeeping team."),
        c("Laundry team", "The laundry team collects guest laundry at ten."),
      ],
      grammar: [
        g(
          "Minibar man come.",
          "I will ask the minibar attendant to restock it this afternoon.",
          "'ask + người + to + động từ': giao việc rõ ai làm gì.",
          "I will ask the minibar attendant restock it this afternoon.",
        ),
        g(
          "Boss come see.",
          "I will ask the executive housekeeper to call you before five, madam.",
          "Chuyển lên cấp trên kèm mốc giờ gọi lại. Không có 'to' sau 'ask'.",
          "I will ask to the executive housekeeper to call you before five, madam.",
        ),
      ],
      speaking: [
        sp("The minibar is almost empty.", t2a, "Một việc, một người làm, một mốc giờ."),
        sp(
          "Can you not just do it now?",
          t2b,
          "Giải thích vì sao đúng người làm: để hóa đơn đúng.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "All right. Before six, please.",
          t2c,
          "'arrange' = sắp xếp. Chốt mốc và hứa gọi lại.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "Could someone turn down the bed later, at ten?",
          "Of course. I will ask the turndown attendant to come at ten, madam.",
          "'ask + người + to + động từ' + mốc giờ khách chọn.",
        ),
        sp(
          "I want to speak to someone senior about the cleaning.",
          "Of course, madam. I will ask the executive housekeeper to call you before five.",
          "Chuyển lên cấp trên ngay, không giữ khách lại.",
        ),
        sp(
          "My suit needs cleaning for a meeting tomorrow.",
          "I will ask the laundry team to collect it at ten, sir.",
          "Một việc, đúng tổ làm, một mốc giờ.",
        ),
      ],
      reading: read(
        `Mr Ruiz says his minibar is almost empty. Quynh does not restock it from her trolley. She asks the minibar attendant to restock it within an hour, because the attendant counts every item for the bill. Mr Ruiz wants it before six, so Quynh arranges that and calls him back.`,
        [
          {
            q: "Vì sao Quỳnh không tự lấy đồ trên xe đẩy bổ sung minibar?",
            options: [
              "Vì nhân viên minibar phải đếm từng món cho hóa đơn",
              "Vì xe đẩy của Quỳnh hôm đó đã hết sạch đồ uống",
              "Vì khách chưa trả tiền minibar của hôm trước",
            ],
            correct: 0,
            explanation:
              "'the attendant counts every item for the bill' — đúng người làm thì hóa đơn mới đúng.",
          },
          {
            q: "Quỳnh làm gì sau khi khách xin trước sáu giờ?",
            options: [
              "Sắp xếp theo mốc đó và gọi lại cho khách",
              "Báo khách rằng một tiếng là nhanh nhất",
              "Chuyển khách sang gọi cho lễ tân hỏi tiếp",
            ],
            correct: 0,
            explanation: "'arranges that and calls him back' — chốt mốc theo khách, rồi khép vòng.",
          },
        ],
      ),
      game: [
        game(
          "The minibar is almost empty. Can someone help?",
          "I will ask the minibar attendant to restock it within an hour, sir.",
          "Minibar empty. Someone come, maybe.",
          "Please call the minibar team yourself, sir. Their number is on the phone.",
          undefined,
          "Câu cuối đẩy việc sang khách. Câu đúng nói rõ ai làm và trong bao lâu.",
        ),
      ],
    }),

    L(26, 3, "Following Up Internally", "Theo dõi việc trong nội bộ", {
      vocabulary: [
        c("Pest control team", "The pest control team is coming at eight."),
        c("Night cleaner", "The night cleaner checks the corridors at midnight."),
        c("Linen store keeper", "The linen store keeper is here until eleven."),
      ],
      grammar: [
        g(
          "I tell already.",
          "I have informed the pest control team, and they are coming at eight.",
          "Hiện tại hoàn thành 'have informed' báo việc ĐÃ làm, kèm bước tiếp theo.",
          "I have inform the pest control team, and they are coming at eight.",
        ),
        g(
          "Night man do.",
          "The night cleaner will check the corridor again at midnight.",
          "Nói rõ ai làm và lúc nào. Sau 'will' động từ ở dạng gốc.",
          "The night cleaner will checks the corridor again at midnight.",
        ),
      ],
      speaking: [
        sp(
          "I saw a cockroach in the bathroom!",
          t3a,
          "Xin lỗi và gọi đúng đội ngay — không hứa 'không sao đâu'.",
        ),
        sp(
          "Has anyone actually done anything?",
          t3b,
          "Báo việc đã làm (have informed) + giờ đội tới.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "I do not want to sleep in this room tonight.",
          t3c,
          "Đổi phòng do lễ tân quyết — bạn chuyển lời đề nghị, không tự hứa.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "Can I have two extra blankets? It is quite late.",
          "The linen store keeper is here until eleven, sir. I will bring them within ten minutes.",
          "Biết ai đang trực để hứa đúng.",
        ),
        sp(
          "The corridor outside my room is dirty.",
          "I am sorry, madam. The night cleaner will clean it within twenty minutes.",
          "Ca đêm có người phụ trách — nói đúng người và mốc giờ.",
        ),
      ],
      reading: read(
        `At ten at night, Mrs Bell sees a cockroach in her bathroom. Vinh apologises and calls the pest control team. When she asks if anything has been done, he says: "I have informed them, and they are coming at eight." She does not want to stay in the room, so Vinh asks the front desk about another room.`,
        [
          {
            q: "Vinh trả lời gì khi khách hỏi đã có ai làm gì chưa?",
            options: [
              "Đã báo đội diệt côn trùng, tám giờ họ tới",
              "Chưa ai làm gì vì lúc đó đã quá giờ hành chính",
              "Tự Vinh sẽ xử lý con gián ngay bây giờ",
            ],
            correct: 0,
            explanation:
              "'I have informed them, and they are coming at eight' — việc đã làm + bước tiếp theo.",
          },
          {
            q: "Ai quyết định cho khách sang phòng khác?",
            options: [
              "Quầy lễ tân, sau khi Vinh chuyển lời đề nghị",
              "Vinh, vì Vinh là người phát hiện sự việc",
              "Đội diệt côn trùng, sau khi kiểm tra xong",
            ],
            correct: 0,
            explanation:
              "'asks the front desk about another room' — đổi phòng là quyết định của lễ tân.",
          },
        ],
      ),
      game: [
        game(
          "Has anyone done anything about the cockroach?",
          "Yes, madam. I have informed the pest control team, and they are coming at eight.",
          "Yes. I tell already, okay.",
          "Not yet, madam, but it is only one cockroach.",
          undefined,
          "Câu cuối xem nhẹ chuyện của khách. Câu đúng báo việc đã làm và giờ đội tới.",
        ),
      ],
    }),

    L(26, 4, "Closing the Loop", "Khép vòng xử lý", {
      vocabulary: [
        c("Duty manager", "I will tell the duty manager about the noise."),
        c("Room inspector", "The room inspector checks every VIP room."),
        c("Uniform room staff", "The uniform room staff give out clean uniforms."),
      ],
      grammar: [
        g(
          "Finished.",
          "The engineering team has fixed the air conditioner, and I checked it myself.",
          "Báo kết quả = ai đã làm gì (hiện tại hoàn thành) + bạn đã tự kiểm tra.",
          "The engineering team has fix the air conditioner, and I checked it myself.",
        ),
        g(
          "Room okay now.",
          "The room inspector has checked the room, and it is ready, sir.",
          "'The room inspector' là một người: 'has checked'.",
          "The room inspector have checked the room, and it is ready, sir.",
        ),
      ],
      speaking: [
        sp("So is the air conditioner fixed now?", t4a, "Kết quả + bằng chứng bạn đã tự kiểm."),
        sp(
          "It was very loud last night. I could not sleep.",
          t4b,
          "Việc đã sửa nhưng khách đã mất một đêm — báo lên quản lý trực.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "My uniform has coffee on it, and my shift starts in ten minutes.",
          "The uniform room staff can give you a clean one now. Go before your shift.",
          "Nói với đồng nghiệp: ngắn, rõ đi đâu.",
          "colleague",
        ),
        sp(
          "Is room 302 ready for the VIP guest?",
          "Yes. The room inspector has checked it, and it is ready, sir.",
          "Báo cấp trên: kết quả + ai đã kiểm tra.",
          "manager",
        ),
      ],
      reading: read(
        `The air conditioner in Room 418 was loud all night. In the morning, the engineering team fixed it. Ha did not just tell the guest it was done: she switched it on and checked it herself. The guest said he could not sleep, so Ha told the duty manager about his night.`,
        [
          {
            q: "Hà làm gì trước khi báo khách là đã sửa xong?",
            options: [
              "Tự bật máy lên kiểm tra lại",
              "Hỏi tổ kỹ thuật rồi báo ngay",
              "Ghi vào sổ rồi đi phòng khác",
            ],
            correct: 0,
            explanation: "'checked it herself' — khép vòng nghĩa là tự kiểm rồi mới báo xong.",
          },
          {
            q: "Vì sao Hà báo chuyện này với quản lý trực?",
            options: [
              "Vì khách đã mất ngủ cả đêm",
              "Vì máy lạnh có thể hỏng lại",
              "Vì tổ kỹ thuật làm việc chậm",
            ],
            correct: 0,
            explanation:
              "'he could not sleep' — việc đã sửa, nhưng trải nghiệm của khách cần người có quyền xem xét.",
          },
        ],
      ),
      game: [
        game(
          "Is the air conditioner working again now?",
          "Yes, sir. The engineering team has fixed it, and I checked it myself.",
          "Fix already. Okay now.",
          "I think so, sir. The engineers told me they were finished an hour ago.",
          undefined,
          "Câu cuối chỉ chuyển lời — chưa ai kiểm lại. Câu đúng nói ai đã sửa và bạn đã tự kiểm tra.",
        ),
      ],
    }),
  ];
}

// ── Week 27 — Receiving a complaint ─────────────────────────────────────
function week27(): LessonContent[] {
  const t1a = "I am very sorry about the unmade bed, madam. I will make it now.";
  const t1b = "Thank you for telling me. I will replace the stained towel too.";
  const t1c = "I apologise, madam. I will report it to my supervisor today.";
  const t2a = "I am sorry you found hair in the bathtub, madam. I will clean it now.";
  const t2b = "I will clean the bathroom again and ask my supervisor to inspect it.";
  const t2c = "I understand you are disappointed, madam. Thank you for your patience.";
  const t3a = "I am sorry. When did you first notice the dirty carpet, sir?";
  const t3b = "Thank you. I will clean it now and tell my supervisor about it.";
  const t4a = "Please be careful, madam. I will bring a wet floor sign now.";
  const t4b = "Please do not help her up. I am calling the duty manager and first aid.";
  const t4c = "Yes, madam. I will stay with you until they arrive.";
  return [
    L(27, 1, "Listen First", "Lắng nghe trước", {
      vocabulary: [
        c("Concern", "Thank you for telling me about your concern."),
        c("Apologise", "I apologise for the delay, madam."),
        c("Unmade bed", "I am very sorry about the unmade bed."),
        c("Stained towel", "I will replace the stained towel now."),
      ],
      grammar: [
        g(
          "Not my fault.",
          "I am very sorry about the unmade bed, sir. I will make it now.",
          "Xin lỗi về sự việc + hành động ngay. Không đổ lỗi cho ca trước hay đồng nghiệp.",
          "I am very sorry about the unmade bed, sir. I will made it now.",
        ),
        g(
          "Stop, I know.",
          "Thank you for telling me about your concern, madam.",
          "Cảm ơn khách đã nói — để khách nói hết rồi mới làm. Sau 'for' động từ thêm -ing.",
          "Thank you for tell me about your concern, madam.",
        ),
      ],
      speaking: [
        sp(
          "It is three o'clock and my bed is still unmade!",
          t1a,
          "Lắng nghe hết, xin lỗi đúng sự việc, rồi làm ngay.",
        ),
        sp(
          "And the towel in the bathroom has a stain.",
          t1b,
          "Cảm ơn khách đã báo thêm, xử lý luôn việc thứ hai.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "I have already told two of your staff.",
          t1c,
          "Khách đã báo nhiều lần — đưa lên cấp trên, đừng hứa suông lần ba.",
          undefined,
          undefined,
          t1b,
        ),
      ],
      reading: read(
        `At three o'clock, Mrs Ito finds her bed still unmade and a stained towel in the bathroom. She has already told two staff. Trang listens without stopping her, apologises, makes the bed and replaces the towel. Then she reports the complaint to her supervisor, because the guest asked twice.`,
        [
          {
            q: "Trang làm gì đầu tiên khi khách phàn nàn?",
            options: [
              "Nghe khách nói hết, không ngắt lời",
              "Giải thích cho khách vì sao ca trước bị trễ",
              "Hỏi khách đã báo với những ai rồi",
            ],
            correct: 0,
            explanation:
              "'listens without stopping her' — bước đầu của tiếp nhận phàn nàn là lắng nghe trọn vẹn.",
          },
          {
            q: "Vì sao Trang báo chuyện này với giám sát?",
            options: [
              "Vì khách đã báo hai lần mà chưa ai làm",
              "Vì Trang không có khăn sạch trên xe đẩy",
              "Vì khách đòi được giảm giá tiền phòng",
            ],
            correct: 0,
            explanation:
              "'because the guest asked twice' — lỗi lặp lại là việc của cấp trên, không chỉ sửa xong là hết.",
          },
        ],
      ),
      game: [
        game(
          "I have already told two of your staff about this!",
          "I apologise, madam. I will report it to my supervisor today.",
          "Not my shift. Other staff.",
          "That is strange, madam. My colleagues did not tell me anything about it.",
          undefined,
          "Câu cuối biến lời phàn nàn thành chuyện nội bộ. Câu đúng xin lỗi và đưa lên người có trách nhiệm.",
        ),
      ],
    }),

    L(27, 2, "Sorry Is Not a Verdict", "Xin lỗi chưa phải là nhận lỗi", {
      vocabulary: [
        c("Disappointed", "I understand you are disappointed, madam."),
        c("Hair in the bathtub", "I am sorry you found hair in the bathtub."),
        c("Damp smell", "I will report the damp smell to engineering."),
        c("Noisy vacuum cleaner", "The noisy vacuum cleaner woke the guest at eight."),
      ],
      grammar: [
        g(
          "Our mistake.",
          "I am sorry you found hair in the bathtub, madam. I will clean it now.",
          "Xin lỗi về điều khách gặp phải. Chưa kiểm tra thì chưa kết luận lỗi của ai.",
          "I am sorry you find hair in the bathtub, madam. I will clean it now.",
        ),
        g(
          "You disappointed? Sorry.",
          "I understand you are disappointed, sir. Let me fix the damp smell today.",
          "'disappointed' = người cảm thấy thất vọng; 'disappointing' = thứ gây thất vọng.",
          "I understand you are disappointing, sir. Let me fix the damp smell today.",
        ),
      ],
      speaking: [
        sp(
          "There is hair in the bathtub. I paid a lot for this room.",
          t2a,
          "Xin lỗi về trải nghiệm + làm ngay. KHÔNG nói 'It was our mistake' khi chưa ai kiểm tra.",
        ),
        sp(
          "So what are you going to do about it?",
          t2b,
          "Kế hoạch cụ thể: làm lại và nhờ giám sát kiểm tra.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "I am really disappointed.",
          t2c,
          "Công nhận cảm xúc, cảm ơn sự kiên nhẫn. Không tranh luận.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "The room has a damp smell.",
          "I am sorry about the damp smell, sir. I will report it to engineering now.",
          "Mùi ẩm có thể do kỹ thuật — báo đúng bộ phận.",
        ),
        sp(
          "Your noisy vacuum cleaner woke me up at eight!",
          "I apologise, madam. I will ask my supervisor to change the vacuuming time.",
          "Lịch hút bụi hành lang do giám sát sắp xếp — bạn đề nghị, không tự đổi lịch.",
        ),
      ],
      reading: read(
        `Mrs Grant finds hair in the bathtub. Duc says: "I am sorry you found hair in the bathtub, madam." He does not say whose mistake it was, because nobody has checked yet. He cleans the bathroom again and asks his supervisor to inspect it. The supervisor finds that the bath was not checked after cleaning.`,
        [
          {
            q: "Vì sao Đức không nói 'It was our mistake'?",
            options: [
              "Vì lúc đó chưa ai kiểm tra nguyên nhân",
              "Vì khách sạn cấm nhân viên xin lỗi khách",
              "Vì Đức nghĩ chính khách để tóc lại",
            ],
            correct: 0,
            explanation:
              "'because nobody has checked yet' — xin lỗi về trải nghiệm thì luôn đúng; kết luận lỗi phải chờ kiểm tra.",
          },
          {
            q: "Giám sát phát hiện ra điều gì?",
            options: [
              "Bồn tắm không được kiểm lại sau khi dọn",
              "Tóc là của vị khách ở phòng bên cạnh",
              "Ống thoát nước của bồn tắm bị tắc",
            ],
            correct: 0,
            explanation:
              "Kiểm tra cho ra nguyên nhân thật — đó là thứ giúp sửa quy trình, không phải lời nhận lỗi vội.",
          },
        ],
      ),
      game: [
        game(
          "There is hair in my bathtub. This is disgusting.",
          "I am sorry you found hair in the bathtub, madam. I will clean it now.",
          "Hair? Not me. I clean good.",
          "It was our mistake, madam. The cleaner was lazy.",
          undefined,
          "Câu cuối kết luận lỗi và đổ cho đồng nghiệp trước mặt khách. Câu đúng xin lỗi về điều khách gặp và làm ngay.",
        ),
      ],
    }),

    L(27, 3, "Getting the Facts", "Hỏi cho rõ sự việc", {
      vocabulary: [
        c("Dirty carpet", "When did you first notice the dirty carpet?"),
        c("Late cleaning", "I am sorry about the late cleaning yesterday."),
        c("Empty shampoo bottle", "I will replace the empty shampoo bottle now."),
      ],
      grammar: [
        g(
          "When?",
          "When did you first notice the dirty carpet, sir?",
          "Hỏi điều khách CHƯA nói. Sau 'did' động từ ở dạng gốc: notice.",
          "When did you first noticed the dirty carpet, sir?",
        ),
        g(
          "Shampoo finish. Okay.",
          "I am sorry the shampoo bottle was empty. I will bring a new one now.",
          "'the shampoo bottle' là một chai: 'was', không phải 'were'.",
          "I am sorry the shampoo bottle were empty. I will bring a new one now.",
        ),
      ],
      speaking: [
        sp(
          "The carpet near the window is dirty.",
          t3a,
          "Hỏi thời điểm khách CHƯA nói — để biết ca nào bỏ sót.",
        ),
        sp(
          "This morning, right after the cleaning.",
          t3b,
          "Cảm ơn, làm ngay, và báo giám sát — vì lỗi xảy ra sau ca dọn.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "My room was cleaned at five in the afternoon. That is too late.",
          "I am sorry about the late cleaning, madam. What time suits you tomorrow?",
          "Xin lỗi + hỏi khách giờ mong muốn, để không lặp lại.",
        ),
        sp(
          "The shampoo bottle in the shower is empty.",
          "I am sorry, sir. I will bring a new shampoo bottle within five minutes.",
          "Việc nhỏ — xin lỗi, mốc giờ ngắn.",
        ),
      ],
      reading: read(
        `Mr Ali says the carpet near the window is dirty. Khanh asks: "When did you first notice the dirty carpet, sir?" He says: "This morning, right after the cleaning." That fact matters: the stain was missed by the morning shift. Khanh cleans it and tells her supervisor, who checks that shift's rooms.`,
        [
          {
            q: "Vì sao câu trả lời 'ngay sau khi dọn' lại quan trọng?",
            options: [
              "Nó cho biết ca dọn buổi sáng đã bỏ sót",
              "Nó cho biết khách đã làm bẩn tấm thảm",
              "Nó cho biết tấm thảm cần được thay hẳn bằng tấm mới",
            ],
            correct: 0,
            explanation:
              "'the stain was missed by the morning shift' — hỏi đúng câu thì tìm ra chỗ cần sửa trong quy trình.",
          },
          {
            q: "Giám sát làm gì sau khi được báo?",
            options: [
              "Kiểm tra các phòng của ca sáng đó",
              "Gọi điện xin lỗi khách thay cho Khánh",
              "Cho khách đổi sang phòng ở tầng khác",
            ],
            correct: 0,
            explanation:
              "'checks that shift's rooms' — một lỗi phát hiện được có thể không phải lỗi duy nhất.",
          },
        ],
      ),
      game: [
        game(
          "The carpet is dirty. It started last night and nobody helped.",
          "I am sorry, madam. Which part of the carpet is dirty?",
          "When start? Tell me.",
          "Could you tell me when the problem with the carpet started, madam?",
          undefined,
          "Câu cuối hỏi lại điều khách VỪA nói ('last night'). Câu đúng hỏi điều khách chưa nói: chỗ nào bẩn.",
        ),
      ],
    }),

    L(27, 4, "Staying Calm — Safety First", "Giữ bình tĩnh — an toàn trước", {
      vocabulary: [
        c("Blocked shower drain", "The blocked shower drain made the floor wet."),
        c("First aid", "I am calling the duty manager and first aid.", [
          "/ˌfɜːst ˈeɪd/",
          "Sơ cứu",
          "🩹",
        ]),
        c("Broken hairdryer", "I will bring a new hairdryer for the broken one."),
        c("Early morning knocking", "I am sorry about the early morning knocking."),
      ],
      grammar: [
        g(
          "Calm down.",
          "I understand, sir. I will stay until the drain is fixed.",
          "Không bảo khách 'bình tĩnh'. Sau 'until' dùng hiện tại: 'is fixed', không dùng 'will'.",
          "I understand, sir. I will stay until the drain will be fixed.",
        ),
        g(
          "Drain blocked, careful you.",
          "The floor is wet because the shower drain is blocked. Please be careful.",
          "Cảnh báo an toàn trước, rồi mới xử lý. 'is blocked' — bị động, cần -ed.",
          "The floor is wet because the shower drain is block. Please be careful.",
        ),
      ],
      speaking: [
        risk(
          sp(
            "The shower drain is blocked and the bathroom floor is all wet.",
            t4a,
            "AN TOÀN TRƯỚC: cảnh báo, đặt biển sàn ướt, rồi mới gọi sửa.",
            undefined,
            ["careful", "wet", "floor", "sign"],
          ),
        ),
        risk(
          sp(
            "Too late. My mother slipped and hurt her arm.",
            t4b,
            "Có người bị thương: không di chuyển người đó, gọi quản lý trực và sơ cứu NGAY.",
            undefined,
            ["help", "up", "calling", "duty", "manager", "first", "aid"],
            t4a,
          ),
        ),
        sp(
          "Will someone come quickly?",
          t4c,
          "Ở lại với khách cho tới khi người có chuyên môn tới.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "Someone knocked at seven this morning. I was asleep!",
          "I am very sorry about the early morning knocking, sir. I will note your preferred time.",
          "Xin lỗi + ghi lại giờ khách muốn để ca sau biết.",
        ),
        sp(
          "The hairdryer does not work.",
          "I am sorry about the broken hairdryer, madam. I will bring a new one within ten minutes.",
          "Xin lỗi + thay thế + mốc giờ.",
        ),
      ],
      reading: read(
        `In Room 220 the shower drain is blocked and the bathroom floor is wet. Before anything else, Son puts the wet floor sign out and warns the guest. The guest's mother has already slipped. Son does not move her. He calls the duty manager and first aid, and stays with the family until they arrive.`,
        [
          {
            q: "Sơn làm gì TRƯỚC khi gọi sửa ống thoát nước?",
            options: [
              "Đặt biển sàn ướt và cảnh báo khách",
              "Lau khô sàn rồi mới gọi tổ kỹ thuật",
              "Hỏi khách đã dùng vòi sen bao lâu",
            ],
            correct: 0,
            explanation:
              "'Before anything else, Son puts the wet floor sign out' — an toàn trước, sửa sau.",
          },
          {
            q: "Vì sao Sơn không đỡ người mẹ đứng dậy?",
            options: [
              "Vì người bị ngã không nên bị di chuyển",
              "Vì Sơn đang bận đặt biển cảnh báo",
              "Vì quy định cấm chạm vào khách nữ",
            ],
            correct: 0,
            explanation:
              "'Son does not move her' — di chuyển người bị thương có thể làm nặng thêm. Gọi sơ cứu và quản lý trực.",
          },
        ],
      ),
      game: [
        game(
          "My mother slipped on the wet floor and hurt her arm!",
          "Please do not move her. I am calling the duty manager and first aid now.",
          "Oh no. You stand up, okay?",
          "Let me help her up and take her to the bed, madam.",
          undefined,
          "Câu cuối nghe tận tình nhưng di chuyển người bị thương. Câu đúng giữ nguyên tư thế và gọi người có chuyên môn ngay.",
        ),
      ],
    }),
  ];
}

// ── Week 28 — Offering a solution you are allowed to offer ──────────────
function week28(): LessonContent[] {
  const t1a = "I am sorry, madam. If you like, I can re-clean the bathroom now.";
  const t1b = "Then if you prefer, I will come back in one hour.";
  const t1c = "Thank you. I will also bring a replacement towel then.";
  const t2a = "I am sorry. We can deep clean the carpet now, or after six.";
  const t2b = "I understand. If you prefer, I will ask the front desk about another room.";
  const t2c = "I am sorry, I cannot move you. The front desk will call you in five minutes.";
  const t3a = "I am sorry, sir. I will air out the room for one hour now.";
  const t3b = "If it smells again, please call me. I will tell my supervisor straight away.";
  const t4a = "I am sorry, I cannot offer a refund. My manager will call you this afternoon.";
  const t4b = "If you like, we can clean while you are out, and use a quieter vacuum.";
  const t4c = "Thank you, sir. We will finish your room before nine.";
  return [
    L(28, 1, "If You Like, I Can…", "Nếu quý khách muốn, tôi có thể…", {
      vocabulary: [
        c("Prefer", "If you prefer, I will come back in one hour."),
        c("Re-clean the bathroom", "If you like, I can re-clean the bathroom now."),
        c("Change the bed sheets", "I can change the bed sheets within twenty minutes."),
        c("Bring a replacement towel", "I will bring a replacement towel with me."),
      ],
      grammar: [
        g(
          "I clean again.",
          "If you like, I can re-clean the bathroom now, madam.",
          "Câu điều kiện lịch sự 'If you like, I can…' — đề nghị nhưng để khách quyết. Sau 'can' không có 'to'.",
          "If you like, I can to re-clean the bathroom now, madam.",
        ),
        g(
          "Sheet change, okay?",
          "If you prefer, I will change the bed sheets after lunch.",
          "Mệnh đề 'If' dùng hiện tại; 'will' chỉ ở mệnh đề chính.",
          "If you will prefer, I will change the bed sheets after lunch.",
        ),
      ],
      speaking: [
        sp(
          "The bathroom still is not clean.",
          t1a,
          "Khung vàng tuần này: If you like, I can + việc bạn làm được.",
        ),
        sp(
          "Now? I am about to take a shower.",
          t1b,
          "Khách không tiện — đưa lựa chọn thời gian, vẫn bằng 'If you prefer'.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Yes, one hour is fine.",
          t1c,
          "Chốt lại và thêm một việc nhỏ khách sẽ cần.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "The bed sheets smell of smoke.",
          "I am sorry. If you like, I can change the bed sheets within twenty minutes.",
          "Xin lỗi + đề nghị có điều kiện + mốc giờ.",
        ),
      ],
      reading: read(
        `Ms Rossi says the bathroom is still not clean. Mai offers: "If you like, I can re-clean the bathroom now." Ms Rossi is about to shower, so Mai says: "If you prefer, I will come back in one hour." She comes back on time, re-cleans the bathroom and brings a replacement towel.`,
        [
          {
            q: "Vì sao Mai không dọn lại phòng tắm ngay lúc đó?",
            options: [
              "Vì khách sắp tắm, nên khách chọn để sau",
              "Vì Mai phải xin phép giám sát trước",
              "Vì xe đẩy của Mai lúc đó không còn khăn sạch nào",
            ],
            correct: 0,
            explanation:
              "'If you prefer, I will come back in one hour' — đề nghị có điều kiện để khách chọn thời điểm.",
          },
          {
            q: "Mai mang thêm gì khi quay lại?",
            options: ["Một chiếc khăn thay thế", "Một bộ ga giường mới", "Một chai dầu gội mới"],
            correct: 0,
            explanation: "'brings a replacement towel' — nghĩ trước thứ khách sẽ cần sau khi tắm.",
          },
        ],
      ),
      game: [
        game(
          "Look at this bathroom. It is still not clean.",
          "I am sorry, madam. If you like, I can re-clean it now.",
          "I clean again, you wait.",
          "It was cleaned this morning, madam. It looks fine to me.",
          undefined,
          "Câu cuối phủ nhận điều khách thấy. Câu đúng xin lỗi và đề nghị một giải pháp khách có thể chọn.",
        ),
      ],
    }),

    L(28, 2, "Two Choices — and Who Decides", "Hai lựa chọn — và ai quyết", {
      vocabulary: [
        c("Option", "There are two options for the carpet."),
        c("Either", "Either option is fine, madam."),
        c("Deep clean the carpet", "We can deep clean the carpet after six."),
        c("Move you to another room", "Only the front desk can move you to another room."),
      ],
      grammar: [
        g(
          "Two way. Choose.",
          "You can choose either option, madam: now or after six.",
          "'either option' = một trong hai lựa chọn; 'either' đi với danh từ số ít.",
          "You can choose either options, madam: now or after six.",
        ),
        g(
          "I move you new room.",
          "If you prefer, I will ask the front desk to move you to another room.",
          "Chuyển phòng do lễ tân quyết: 'ask + the front desk + to + động từ'.",
          "If you prefer, I will ask the front desk moving you to another room.",
        ),
      ],
      speaking: [
        sp(
          "The carpet smells of wine. What can you do?",
          t2a,
          "Hai lựa chọn trong quyền của buồng phòng, kèm thời điểm.",
        ),
        sp(
          "I do not want to stay with this smell at all.",
          t2b,
          "Khách muốn đổi phòng — chuyển đề nghị cho lễ tân, không tự hứa.",
          undefined,
          undefined,
          t2a,
        ),
        risk(
          sp(
            "Can you not just move me yourself?",
            t2c,
            "Câu thẩm quyền: đổi phòng là quyết định của lễ tân. Nói rõ ai gọi lại.",
            undefined,
            ["move", "front", "desk", "call"],
            t2b,
          ),
        ),
        sp(
          "Which is better for me, now or after six?",
          "Either option works, madam. After six, you will be out at dinner.",
          "Giúp khách chọn bằng một lý do cụ thể.",
        ),
      ],
      reading: read(
        `Room 507's carpet smells of wine. Hung offers two options: a deep clean now, or after six. The guest does not want to stay with the smell, so Hung asks the front desk to move her to another room. When she asks him to move her himself, he explains that the front desk decides room moves.`,
        [
          {
            q: "Hưng đưa ra những lựa chọn nào về tấm thảm?",
            options: [
              "Giặt sâu ngay bây giờ, hoặc sau sáu giờ",
              "Thay thảm mới, hoặc cho khách giảm giá",
              "Xịt thơm phòng, hoặc mở cửa sổ cả ngày",
            ],
            correct: 0,
            explanation:
              "'a deep clean now, or after six' — hai lựa chọn đều trong quyền của buồng phòng.",
          },
          {
            q: "Ai quyết định cho khách đổi phòng?",
            options: ["Quầy lễ tân", "Hưng, người đang xử lý", "Tổ giặt thảm của khách sạn"],
            correct: 0,
            explanation:
              "'the front desk decides room moves' — buồng phòng chuyển lời, lễ tân quyết.",
          },
        ],
      ),
      game: [
        game(
          "Just move me to another room yourself, please.",
          "I am sorry, I cannot decide room moves. The front desk will call you shortly.",
          "Okay. You go room 509. Free.",
          "Of course, madam. Room 509 is empty right now, so I will take you there myself.",
          undefined,
          "Câu cuối tự quyết đổi phòng — việc của lễ tân. Câu đúng nói rõ ai quyết và hẹn gọi lại.",
        ),
      ],
    }),

    L(28, 3, "Checking It Worked", "Kiểm tra giải pháp có hiệu quả", {
      vocabulary: [
        c("Air out the room", "I will air out the room for one hour."),
        c("Rewash the towels tonight", "If you like, we will rewash the towels tonight."),
        c("Replace the toiletries", "I can replace the toiletries with an unscented set."),
      ],
      grammar: [
        g(
          "Smell okay now?",
          "If the smell comes back, please call me. I will air out the room.",
          "Mệnh đề 'If' dùng hiện tại ('comes back'), không dùng 'will come'.",
          "If the smell will come back, please call me. I will air out the room.",
        ),
        g(
          "Towel bad, wash again.",
          "If the towels still smell, we will rewash the towels tonight.",
          "'the towels' số nhiều: 'smell', không 'smells'.",
          "If the towels still smells, we will rewash the towels tonight.",
        ),
      ],
      speaking: [
        sp("The room still smells of paint.", t3a, "Giải pháp + thời lượng cụ thể."),
        sp(
          "And if it smells again tonight?",
          t3b,
          "Hẹn khách gọi nếu tái diễn, và nói bạn sẽ báo ai.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "The towels smell strange.",
          "I am sorry, madam. If you like, we will rewash the towels tonight.",
          "Đề nghị có điều kiện + mốc.",
        ),
        sp(
          "The shampoo smells too strong for me.",
          "Of course. I can replace the toiletries with our unscented set, madam.",
          "Thay bằng bộ không mùi — giải pháp đúng vấn đề của khách.",
        ),
      ],
      reading: read(
        `Room 315 smells of paint after a repair. Lam airs out the room for one hour. He does not just leave: he tells the guest to call him if it smells again, and that he will tell his supervisor at once. At ten the guest calls, so the supervisor offers the front desk's help with another room.`,
        [
          {
            q: "Lâm hẹn gì với khách sau khi làm thoáng phòng?",
            options: [
              "Khách gọi lại nếu mùi quay lại",
              "Sáng mai Lâm sẽ tự quay lại kiểm",
              "Khách tự mở cửa sổ khi còn mùi",
            ],
            correct: 0,
            explanation:
              "'call him if it smells again' — kiểm tra giải pháp bằng cách để khách báo lại.",
          },
          {
            q: "Khi mùi quay lại, ai đề nghị giúp khách đổi phòng?",
            options: [
              "Giám sát, qua quầy lễ tân",
              "Lâm, vì Lâm biết phòng nào trống",
              "Khách tự xuống lễ tân yêu cầu",
            ],
            correct: 0,
            explanation:
              "'the supervisor offers the front desk's help' — giải pháp lớn hơn đi lên đúng người có quyền.",
          },
        ],
      ),
      game: [
        game(
          "And if the smell comes back tonight?",
          "If it smells again, please call me. I will tell my supervisor straight away.",
          "If smell come, you call.",
          "It will not come back, sir. I promise.",
          undefined,
          "Câu cuối hứa điều bạn không chắc. Câu đúng đưa cách xử lý nếu vấn đề quay lại.",
        ),
      ],
    }),

    L(28, 4, "When You Must Say No", "Khi phải từ chối", {
      vocabulary: [
        c("Clean while you are out", "If you like, we can clean while you are out."),
        c("Use a quieter vacuum", "We can use a quieter vacuum on your floor."),
        c("Wash it free of charge", "I cannot wash it free of charge myself."),
        c("Remove the stain for you", "I will remove the stain for you this afternoon."),
        c("Refund", "I cannot offer a refund. My manager will call you.", [
          "/ˈriːfʌnd/",
          "Hoàn tiền",
          "💸",
        ]),
      ],
      grammar: [
        g(
          "Free? No.",
          "I cannot offer to wash it free of charge. I will ask my supervisor.",
          "Miễn phí là quyết định về tiền: bạn không tự hứa, chuyển người có quyền. 'offer + to + động từ'.",
          "I cannot offer wash it free of charge. I will ask my supervisor.",
        ),
        g(
          "I cannot. Bye.",
          "If you like, we can clean while you are out at breakfast.",
          "Không được việc này thì đưa phương án trong quyền của mình. Sau 'while' dùng hiện tại.",
          "If you like, we can clean while you will be out at breakfast.",
        ),
      ],
      speaking: [
        risk(
          sp(
            "Your vacuum woke me up. I want a full refund, nothing less.",
            t4a,
            "Hoàn tiền: bạn KHÔNG tự hứa. Nói rõ quản lý sẽ gọi lại, và khi nào. Đây là câu thẩm quyền của tuần.",
            undefined,
            ["offer", "refund", "manager", "call"],
          ),
        ),
        sp(
          "Then what can you do right now?",
          t4b,
          "Ngay sau lời từ chối, đưa giải pháp trong quyền của buồng phòng.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "Fine. I will be at breakfast until nine.",
          t4c,
          "Chốt theo mốc của khách.",
          undefined,
          undefined,
          t4b,
        ),
        risk(
          sp(
            "There is coffee on my dress. Can you wash it free of charge?",
            "I cannot offer to wash it free of charge, madam. I will ask my supervisor.",
            "Miễn phí giặt là quyết định về tiền — chuyển giám sát, không tự hứa.",
            undefined,
            ["offer", "wash", "free", "charge", "supervisor"],
          ),
        ),
        sp(
          "There is a stain on the sofa.",
          "I will remove the stain for you this afternoon, madam.",
          "Việc trong quyền — hứa luôn kèm mốc.",
        ),
      ],
      reading: read(
        `Mr Wong was woken by a vacuum at seven and asks for a full refund. Tien says she cannot approve a refund herself, but her manager can review it. Then she offers what she can do: clean while he is out at breakfast, with a quieter vacuum. He agrees, and the manager calls him that afternoon.`,
        [
          {
            q: "Tiên trả lời thế nào về yêu cầu hoàn tiền?",
            options: [
              "Không tự duyệt được, quản lý sẽ xem xét",
              "Đồng ý hoàn một nửa tiền phòng đêm đó",
              "Nói rằng khách sạn không bao giờ hoàn tiền",
            ],
            correct: 0,
            explanation:
              "'cannot approve a refund herself, but her manager can review it' — không hứa, không đóng cửa.",
          },
          {
            q: "Tiên đưa ra giải pháp nào trong quyền của mình?",
            options: [
              "Dọn khi khách đi ăn sáng, dùng máy êm hơn",
              "Tặng khách một bữa tối miễn phí ở nhà hàng",
              "Đổi khách sang một phòng hạng cao hơn",
            ],
            correct: 0,
            explanation:
              "Bữa tối và nâng hạng đều là quyết định về tiền. Giờ dọn và loại máy là việc buồng phòng tự quyết được.",
          },
        ],
      ),
      game: [
        game(
          "I want a full refund, nothing less.",
          "I am sorry, sir. I cannot approve a refund myself, but my manager can review it.",
          "No refund. Not possible.",
          "Of course, sir. I will tell the front desk to refund you now.",
          undefined,
          "Câu cuối tự hứa hoàn tiền — vượt quyền. Câu đúng không hứa, không từ chối thẳng: chuyển người có quyền xem xét.",
        ),
      ],
    }),
  ];
}

// ── Week 29 — Handover between colleagues and up to a supervisor ────────
function week29(): LessonContent[] {
  const t1a = "I updated the room status board at two, and Room 410 is out of order.";
  const t1b = "The toilet is leaking. Engineering is coming at six to fix it.";
  const t1c = "Please check the out-of-order list first, then the rooms on six.";
  const t2a = "I was cleaning room 508 when my master key suddenly stopped working.";
  const t2b = "I stopped, locked my trolley, and wrote it in the master key log.";
  const t2c = "Yes, madam. I returned it to the office, and I have a new key now.";
  const t3a = "Yes, the turndown list has not been finished yet — six rooms are left.";
  const t3b = "Two rooms are on the late checkout list, 304 and 517, until two.";
  const t3c = "I have checked the amenity stock sheet. Shampoo is low, so I ordered more.";
  const t4a = "Yes, madam. I found a gold ring in 712 after checkout.";
  const t4b = "I noted it in the lost item log and took it to my supervisor.";
  const t4c = "No. My colleague Lan was with me, and she signed the log too.";
  return [
    L(29, 1, "Handing Over the Shift", "Bàn giao ca", {
      vocabulary: [
        c("Shift", "My shift ends at three o'clock."),
        c("Update", "I updated the room status board at two."),
        c("Room status board", "The room status board shows which rooms are ready."),
        c("Out-of-order list", "Room 410 is on the out-of-order list."),
      ],
      grammar: [
        g(
          "Many thing today.",
          "I updated the room status board at two. Room 410 is out of order.",
          "Bàn giao: việc ĐÃ làm (quá khứ đơn) + việc còn mở (hiện tại).",
          "I update the room status board at two. Room 410 is out of order.",
        ),
        g(
          "List there.",
          "Please check the out-of-order list before you start your shift.",
          "Sau 'before' dùng hiện tại, không dùng 'will'.",
          "Please check the out-of-order list before you will start your shift.",
        ),
      ],
      speaking: [
        sp(
          "Anything I should know before you go?",
          t1a,
          "Nói với đồng nghiệp ca sau: việc đã làm + việc còn mở.",
          "colleague",
        ),
        sp(
          "What is wrong with 410?",
          t1b,
          "Nêu vấn đề + ai đang xử lý + giờ.",
          "colleague",
          undefined,
          t1a,
        ),
        sp(
          "Okay. What should I check first?",
          t1c,
          "Thứ tự ưu tiên rõ ràng cho ca sau.",
          "colleague",
          undefined,
          t1b,
        ),
      ],
      reading: read(
        `At three, Hoa hands over to Binh. "I updated the room status board at two, and Room 410 is out of order. The toilet is leaking, and engineering is coming at six." She tells him to check the out-of-order list first. Binh does not have to guess anything: the board and the list say it all.`,
        [
          {
            q: "Phòng 410 có vấn đề gì?",
            options: [
              "Bồn cầu bị rò nước, chờ kỹ thuật",
              "Khách phòng 410 chưa chịu trả phòng",
              "Phòng 410 chưa có trong bảng trạng thái",
            ],
            correct: 0,
            explanation:
              "'The toilet is leaking, and engineering is coming at six' — vấn đề, người xử lý, mốc giờ.",
          },
          {
            q: "Vì sao Bình không phải đoán gì khi nhận ca?",
            options: [
              "Vì bảng và danh sách đã ghi đủ thông tin",
              "Vì Bình đã làm ở tầng đó cả tuần rồi",
              "Vì Hoa ở lại làm thêm cùng Bình đến tận tối",
            ],
            correct: 0,
            explanation:
              "'the board and the list say it all' — bàn giao tốt là bàn giao viết ra được.",
          },
        ],
      ),
      game: [
        game(
          "Before you leave, what do I need to know?",
          "I updated the room status board at two, and Room 410 is out of order.",
          "Many thing. You look board.",
          "Not really, everything is fine on this floor today. Have a good shift!",
          "colleague",
          "Câu cuối bỏ sót phòng đang hỏng — ca sau sẽ xếp khách vào đó. Câu đúng nêu việc đã làm và việc còn mở.",
        ),
      ],
    }),

    L(29, 2, "I Was Doing… When…", "Tôi đang làm… thì…", {
      vocabulary: [
        c("Suddenly", "My master key suddenly stopped working."),
        c("Shift log book", "I wrote everything in the shift log book."),
        c("Master key log", "Every master key goes in the master key log."),
        c("Discrepancy report", "A discrepancy report shows a room with the wrong status."),
      ],
      grammar: [
        g(
          "I clean, guest call.",
          "I was cleaning room 508 when the guest called.",
          "Quá khứ tiếp diễn 'was cleaning' cho việc đang làm; quá khứ đơn 'called' cho việc chen vào.",
          "I was clean room 508 when the guest called.",
        ),
        g(
          "I write already.",
          "I wrote the time in the master key log, madam.",
          "Quá khứ đơn của 'write' là 'wrote' (bất quy tắc).",
          "I written the time in the master key log, madam.",
        ),
      ],
      speaking: [
        sp(
          "What were you doing when the key problem happened?",
          t2a,
          "Báo cáo sự cố với giám sát: đang làm gì (was + -ing) khi chuyện xảy ra.",
          "manager",
        ),
        sp(
          "And what did you do next?",
          t2b,
          "Các bước đã làm theo đúng thứ tự, quá khứ đơn.",
          "manager",
          undefined,
          t2a,
        ),
        sp(
          "Good. Is the key safe now?",
          t2c,
          "Khép lại: chìa khóa đang ở đâu, ai giữ.",
          "manager",
          undefined,
          t2b,
        ),
        sp(
          "Room 612 shows 'vacant' on the board, but there are bags inside.",
          "Then we write a discrepancy report and call the front desk now.",
          "Phòng lệch trạng thái: báo cáo lệch + gọi lễ tân. Không tự xếp đồ của khách.",
          "colleague",
        ),
        sp(
          "Where did you write what happened during the shift?",
          "I wrote everything in the shift log book, with the times.",
          "Sự việc trong ca ghi vào sổ ca — không ghi vào sổ đồ thất lạc.",
          "manager",
        ),
      ],
      reading: read(
        `Nhung was cleaning room 508 when her master key suddenly stopped working. She stopped, locked her trolley, and wrote the time in the master key log. Then she returned the key to the office. Security checked it and gave her a new one. Her supervisor read the log and had the whole story.`,
        [
          {
            q: "Nhung đang làm gì khi chìa khóa tổng bị hỏng?",
            options: ["Đang dọn phòng 508", "Đang đẩy xe về kho", "Đang bàn giao ca chiều"],
            correct: 0,
            explanation:
              "'was cleaning room 508 when…' — quá khứ tiếp diễn kể việc đang làm thì sự việc xảy ra.",
          },
          {
            q: "Vì sao Nhung khóa xe đẩy trước khi đi?",
            options: [
              "Để không ai lấy được đồ trên xe",
              "Để giám sát biết xe đã hết đồ",
              "Để kỹ thuật tới kiểm tra xe đẩy",
            ],
            correct: 0,
            explanation:
              "Xe đẩy có chìa khóa và đồ của khách sạn — khóa lại trước khi rời đi là quy tắc an ninh.",
          },
        ],
      ),
      game: [
        game(
          "What did you do when your master key stopped working?",
          "I stopped, locked my trolley, and wrote it in the master key log.",
          "Key broke. I go office.",
          "I asked a guest in the corridor to let me into the next room, madam.",
          "manager",
          "Câu cuối nhờ khách mở cửa — sai quy trình an ninh. Câu đúng kể đủ các bước, quá khứ đơn, theo thứ tự.",
        ),
      ],
    }),

    L(29, 3, "Open Items", "Những việc còn mở", {
      vocabulary: [
        c("Yet", "The turndown list has not been finished yet."),
        c("Turndown list", "Six rooms are left on the turndown list."),
        c("Late checkout list", "Room 304 is on the late checkout list."),
        c("Amenity stock sheet", "I checked the amenity stock sheet before my break."),
      ],
      grammar: [
        g(
          "Not finish.",
          "The turndown list has not been finished yet. Six rooms are left.",
          "Hiện tại hoàn thành bị động: 'has not been finished yet' — việc chưa xong tính tới lúc này. Quá khứ phân từ cần -ed: finished.",
          "The turndown list has not been finish yet. Six rooms are left.",
        ),
        g(
          "Stock low.",
          "I have checked the amenity stock sheet, and shampoo is low.",
          "'have checked' — hiện tại hoàn thành: have + quá khứ phân từ.",
          "I have check the amenity stock sheet, and shampoo is low.",
        ),
      ],
      speaking: [
        sp(
          "Is there anything still open?",
          t3a,
          "Việc còn mở: has not been … yet + số lượng.",
          "colleague",
        ),
        sp(
          "Any late checkouts?",
          t3b,
          "Số phòng + mốc giờ — đủ để ca sau xếp lịch.",
          "colleague",
          undefined,
          t3a,
        ),
        sp("And supplies?", t3c, "Đã kiểm gì + kết quả + đã làm gì.", "colleague", undefined, t3b),
      ],
      reading: read(
        `Before her break, Thuy writes the open items for the evening team. The turndown list has not been finished yet: six rooms are left. Rooms 304 and 517 are on the late checkout list until two. She has checked the amenity stock sheet, and shampoo is low, so she has ordered more.`,
        [
          {
            q: "Còn bao nhiêu phòng chưa chỉnh giường tối?",
            options: ["Sáu phòng", "Hai phòng", "Năm phòng"],
            correct: 0,
            explanation: "'six rooms are left' — số việc còn mở phải cụ thể.",
          },
          {
            q: "Thủy làm gì khi thấy dầu gội sắp hết?",
            options: [
              "Đặt thêm, rồi ghi lại cho ca sau",
              "Lấy tạm dầu gội ở tầng bên dưới",
              "Báo khách dùng tiết kiệm hơn",
            ],
            correct: 0,
            explanation: "'so she has ordered more' — phát hiện + xử lý + báo lại.",
          },
        ],
      ),
      game: [
        game(
          "Is there anything still open on the floor?",
          "Yes, the turndown list has not been finished yet — six rooms are left.",
          "Turndown not finish. Six.",
          "No, I think we are done for today.",
          "colleague",
          "Câu cuối khẳng định khi chưa chắc — ca sau sẽ bỏ sót sáu phòng. Câu đúng nêu rõ việc còn mở.",
        ),
      ],
    }),

    L(29, 4, "The Right Log for the Right Thing", "Đúng sổ cho đúng việc", {
      vocabulary: [
        c("Lost item log", "A found ring goes in the lost item log."),
        c("Pending guest request", "The pending guest request is in the shift log book."),
        c("Trolley stock check", "I did the trolley stock check at five."),
      ],
      grammar: [
        g(
          "I remember, no write.",
          "I wrote the pending guest request in the shift log book.",
          "Việc đã làm trong ca kể bằng quá khứ đơn: wrote. Yêu cầu chưa xong ghi vào sổ ca để ca sau làm tiếp.",
          "I write the pending guest request in the shift log book.",
        ),
        g(
          "Found ring, I keep.",
          "I found a ring in 712, and I logged it in the lost item log.",
          "Đồ thất lạc: tìm thấy → ghi sổ đồ thất lạc ngay. 'log it in the log'.",
          "I found a ring in 712, and I logged it on the lost item log.",
        ),
      ],
      speaking: [
        sp(
          "Did you find anything in the checkout rooms?",
          t4a,
          "Báo cáo đồ tìm thấy: món gì, phòng nào, khi nào.",
          "manager",
        ),
        risk(
          sp(
            "What did you do with it?",
            t4b,
            "Đồ thất lạc: ghi sổ + giao giám sát. Không giữ lại, không tự trả cho khách.",
            "manager",
            ["noted", "lost", "item", "log", "took", "supervisor"],
            t4a,
          ),
        ),
        sp(
          "Did anyone else see it?",
          t4c,
          "Có người làm chứng và cùng ký sổ — chuỗi giao nhận rõ ràng.",
          "manager",
          undefined,
          t4b,
        ),
        sp(
          "Where can I see the guest requests from today?",
          "The pending guest requests are in the shift log book, on page two.",
          "Yêu cầu của khách ở sổ ca — sổ đồ thất lạc chỉ dành cho đồ thất lạc.",
          "colleague",
        ),
        sp(
          "Is my trolley ready for tomorrow?",
          "Yes, I did the trolley stock check at five. It is full.",
          "Việc đã làm + giờ + kết quả.",
          "colleague",
        ),
      ],
      reading: read(
        `After checkout, Hai finds a gold ring in Room 712. His colleague Lan is with him. Hai logs the ring in the lost item log, with the room, the time and where he found it, and Lan signs the log too. Then he gives the ring to his supervisor. Nobody keeps it on a trolley.`,
        [
          {
            q: "Hải ghi những gì vào sổ đồ thất lạc?",
            options: [
              "Phòng, giờ, và chỗ tìm thấy chiếc nhẫn",
              "Tên khách và số điện thoại liên lạc của khách",
              "Giá trị ước tính của chiếc nhẫn vàng",
            ],
            correct: 0,
            explanation:
              "'with the room, the time and where he found it' — đủ thông tin để trả đúng chủ.",
          },
          {
            q: "Vì sao Lan cũng ký vào sổ?",
            options: [
              "Để có người làm chứng việc giao nhận",
              "Để Lan được ghi công vào hồ sơ",
              "Vì Hải không biết viết tiếng Anh",
            ],
            correct: 0,
            explanation: "Đồ quý tìm thấy cần người làm chứng — bảo vệ cả khách lẫn nhân viên.",
          },
        ],
      ),
      game: [
        game(
          "Where is the ring from 712 now?",
          "It is in the lost item log, and my supervisor has it.",
          "Ring with me. I keep.",
          "It is on my trolley. I will give it back if the guest calls.",
          "manager",
          "Câu cuối giữ đồ quý trên xe đẩy — không ai làm chứng, dễ thất lạc. Câu đúng: đã ghi sổ, giám sát đang giữ.",
        ),
      ],
    }),
  ];
}

// ── Week 30 — Checkpoint: putting it together ───────────────────────────
function week30(): LessonContent[] {
  const t1a = "Our pillow choice has a firmer one, madam. I will bring it within ten minutes.";
  const t1b = "Of course. I will change your turndown time to nine o'clock.";
  const t2a = "Because it includes linen and setup, madam. The front desk can explain the price.";
  const t2b = "The linen delivery time is seven, so the bed will be ready by eight.";
  const t3a = "I am very sorry, madam. If you like, I can clean it now.";
  const t3b = "Our cleaning schedule was not updated. I will tell my supervisor today.";
  const t3c = "I will note your times, so it will not happen again.";
  const t4a = "I understand, sir. I am calling security and the duty manager now.";
  const t4b = "I am sorry, I cannot do that. Security will be here within five minutes.";
  return [
    L(30, 1, "Offer and Promise", "Gợi ý và cam kết", {
      vocabulary: [
        c("Review", "Please review the room assignment sheet before you start."),
        c("Room assignment sheet", "Your rooms are on the room assignment sheet."),
        c("Pillow choice", "Our pillow choice has a firmer pillow."),
        c("Turndown time", "I will change your turndown time to nine o'clock."),
      ],
      grammar: [
        g(
          "Pillow, I bring.",
          "I will bring a firmer pillow within ten minutes, madam.",
          "Tuần 25: lời hứa có mốc cụ thể.",
          "I will bringing a firmer pillow within ten minutes, madam.",
        ),
        g(
          "Turndown nine.",
          "We are going to change your turndown time to nine o'clock.",
          "Tuần 25: 'be going to' cho kế hoạch đã sắp xếp — cần 'are'.",
          "We going to change your turndown time to nine o'clock.",
        ),
      ],
      speaking: [
        sp(
          "My neck hurts. Is there a better pillow?",
          t1a,
          "Kết hợp tuần 23 và 25: gợi ý + cam kết thời gian.",
        ),
        sp(
          "And can you come at nine instead of seven?",
          t1b,
          "Điều chỉnh theo khách, nhắc lại mốc mới.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Which rooms are mine today?",
          "Your rooms are on the room assignment sheet. Please review it before you start.",
          "Nói với đồng nghiệp mới: chỉ đúng chỗ tra, nhắc xem trước.",
          "colleague",
        ),
      ],
      reading: read(
        `Ms Kim's neck hurts. Ngan offers a firmer pillow from the pillow choice and brings it within ten minutes. Ms Kim also asks for turndown at nine instead of seven. Ngan changes the turndown time and writes it on the room assignment sheet for the evening team.`,
        [
          {
            q: "Ngân mang gối mới lên trong bao lâu?",
            options: ["Trong vòng mười phút", "Trước chín giờ tối", "Ngay sau giờ ăn trưa"],
            correct: 0,
            explanation: "'brings it within ten minutes' — lời hứa có mốc, và được giữ.",
          },
          {
            q: "Vì sao Ngân ghi giờ chỉnh giường mới lên bảng phân công?",
            options: [
              "Để ca tối biết đổi giờ theo khách",
              "Để giám sát tính thêm phí cho khách",
              "Để khách tự kiểm tra lại giờ tối",
            ],
            correct: 0,
            explanation: "Thay đổi không được ghi lại là thay đổi ca sau không biết.",
          },
        ],
      ),
      game: [
        game(
          "My neck hurts. Do you have a better pillow?",
          "Our pillow choice has a firmer one, madam. I will bring it within ten minutes.",
          "Pillow yes, I bring later.",
          "All our pillows are the same, madam, I am afraid.",
          undefined,
          "Câu cuối không giúp gì. Câu đúng gợi ý đúng nhu cầu và hứa có mốc thời gian.",
        ),
      ],
    }),

    L(30, 2, "Explain and Coordinate", "Giải thích và điều phối", {
      vocabulary: [
        c("Extra bed request", "The extra bed request goes to the front desk first."),
        c("Linen delivery time", "The linen delivery time is seven o'clock."),
        c("Cleaning standard", "Every room must meet our cleaning standard."),
      ],
      grammar: [
        g(
          "Pay because rule.",
          "There is a charge because it includes linen and setup, madam.",
          "Tuần 24: 'because' + lý do thật.",
          "There is a charge because of it includes linen and setup, madam.",
        ),
        g(
          "Not ready.",
          "The bathroom is not at our cleaning standard yet. I will re-clean it now.",
          "Tuần 29 và 28: 'not … yet' + giải pháp trong quyền.",
          "The bathroom is not at our cleaning standard yet. I will re-cleaning it now.",
        ),
      ],
      speaking: [
        sp("Why do I have to pay for the extra bed?", t2a, "Lý do thật + người giải thích giá."),
        sp(
          "Fine. When will it come?",
          t2b,
          "Mốc của bộ phận khác quyết định mốc của bạn.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Is room 205 at our cleaning standard?",
          "Not yet, madam. I will re-clean the bathroom and ask the inspector to check.",
          "Báo cấp trên thật: chưa đạt + bước tiếp theo.",
          "manager",
        ),
      ],
      reading: read(
        `Mr Lee asks why the extra bed has a charge. Phong explains: because it includes linen and setup, and the front desk can explain the price. The linen delivery time is seven, so Phong promises the bed by eight. Before the guest returns, the room inspector checks the room against the cleaning standard.`,
        [
          {
            q: "Vì sao Phong hứa giường xong trước tám giờ?",
            options: [
              "Vì khăn ga sạch được giao lúc bảy giờ",
              "Vì khách sẽ về phòng lúc tám giờ",
              "Vì lễ tân chỉ xác nhận sau tám giờ",
            ],
            correct: 0,
            explanation:
              "'The linen delivery time is seven, so…' — lời hứa dựa trên giờ thật của bộ phận khác.",
          },
          {
            q: "Ai kiểm tra phòng theo tiêu chuẩn trước khi khách về?",
            options: ["Nhân viên kiểm tra phòng", "Chính vị khách đó", "Nhân viên quầy lễ tân"],
            correct: 0,
            explanation: "'the room inspector checks the room against the cleaning standard'.",
          },
        ],
      ),
      game: [
        game(
          "Why is there a charge for the extra bed?",
          "Because it includes linen and setup, madam. The front desk can explain the price.",
          "Because rule. Bed not free.",
          "I do not know, madam. I just bring the beds.",
          undefined,
          "Câu cuối không trả lời và tự hạ mình. Câu đúng nêu lý do thật và chỉ đúng người giải thích giá.",
        ),
      ],
    }),

    L(30, 3, "Apologise and Solve", "Xin lỗi và giải quyết", {
      vocabulary: [
        c("Cleaning schedule", "Our cleaning schedule was not updated."),
        c("Do-not-disturb request", "I will note your do-not-disturb request times."),
        c("Room inspection result", "The room inspection result for 512 is good."),
      ],
      grammar: [
        g(
          "Not my fault.",
          "I am very sorry, madam. If you like, I can clean it now.",
          "Tuần 27 và 28: xin lỗi + đề nghị có điều kiện.",
          "I am very sorry, madam. If you like, I can cleaning it now.",
        ),
        g(
          "Schedule wrong.",
          "Our cleaning schedule was not updated. I will tell my supervisor today.",
          "Nói sự thật về nguyên nhân, không đổ lỗi cho người cụ thể.",
          "Our cleaning schedule were not updated. I will tell my supervisor today.",
        ),
      ],
      speaking: [
        sp(
          "I took the sign off at noon, but nobody cleaned my room.",
          t3a,
          "Xin lỗi + giải pháp ngay.",
        ),
        sp(
          "Why did nobody notice?",
          t3b,
          "Nguyên nhân thật + báo lên — không đổ cho đồng nghiệp.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Will it happen again tomorrow?",
          t3c,
          "Một bước cụ thể để không lặp lại.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "What was the room inspection result for 512?",
          "It passed, madam, but the bathroom fan is noisy. Engineering is checking it.",
          "Báo kết quả + điều còn tồn tại + ai đang xử lý.",
          "manager",
        ),
      ],
      reading: read(
        `Mrs Silva removed her Do Not Disturb sign at noon, but her room was not cleaned. Oanh apologises and offers to clean it now. The reason was simple: the cleaning schedule was not updated after the sign came off. Oanh tells her supervisor and notes the guest's do-not-disturb request times.`,
        [
          {
            q: "Nguyên nhân phòng không được dọn là gì?",
            options: [
              "Lịch dọn chưa cập nhật khi khách gỡ biển",
              "Nhân viên ca chiều hôm đó không đi làm như lịch",
              "Khách không gọi xuống yêu cầu dọn phòng",
            ],
            correct: 0,
            explanation:
              "'the cleaning schedule was not updated after the sign came off' — lỗi quy trình, không đổ cho người.",
          },
          {
            q: "Oanh làm gì để chuyện không lặp lại?",
            options: [
              "Báo giám sát, ghi lại giờ khách muốn yên tĩnh",
              "Treo tấm biển 'Hãy dọn phòng' lên cửa phòng của khách",
              "Dặn khách gọi lễ tân mỗi khi gỡ biển",
            ],
            correct: 0,
            explanation:
              "Báo lên + ghi lại thói quen của khách — sửa từ gốc, không bắt khách làm thêm việc.",
          },
        ],
      ),
      game: [
        game(
          "This has happened twice now. Nobody cleaned my room!",
          "I am very sorry, madam. If you like, I can clean it now.",
          "Not me. Other staff.",
          "Did you leave the Do Not Disturb sign on your door again, madam?",
          undefined,
          "Câu cuối hỏi vặn lại khách. Câu đúng xin lỗi và đưa giải pháp ngay.",
        ),
      ],
    }),

    L(30, 4, "End of Phase Three", "Kết thúc giai đoạn ba", {
      vocabulary: [
        c("Confident", "I feel confident on a busy shift now."),
        c("Guest laundry order", "Your guest laundry order went at ten."),
        c("Damage charge amount", "The front desk decides the damage charge amount."),
        c("Checkout room priority", "Follow the checkout room priority for early arrivals."),
      ],
      grammar: [
        g(
          "Charge, I write.",
          "I took photos and reported it. The front desk decides the damage charge amount.",
          "Tuần 24: buồng phòng báo cáo có bằng chứng; số tiền do lễ tân quyết.",
          "I took photos and reported it. The front desk decide the damage charge amount.",
        ),
        g(
          "Laundry gone.",
          "Your guest laundry order went at ten, and it comes back by six.",
          "Quá khứ đơn 'went' cho việc đã làm; hiện tại 'comes back' cho lịch cố định.",
          "Your guest laundry order goed at ten, and it comes back by six.",
        ),
      ],
      speaking: [
        risk(
          sp(
            "My laptop is missing, and your cleaner was in my room!",
            t4a,
            "Bị tố mất đồ: không tranh cãi, không tự xử. Gọi an ninh và quản lý trực ngay.",
            undefined,
            ["calling", "security", "duty", "manager"],
          ),
        ),
        risk(
          sp(
            "Search the cleaner's trolley right now!",
            t4b,
            "Không tự lục soát — an ninh làm, có quản lý chứng kiến.",
            undefined,
            ["security", "within"],
            t4a,
          ),
        ),
        sp(
          "Room 806 has a broken lamp. What about the damage charge amount?",
          "I took photos and reported it. The front desk decides the damage charge amount.",
          "Bằng chứng + báo cáo; tiền do lễ tân quyết.",
          "manager",
        ),
        sp(
          "Which rooms do we do first after checkout?",
          "We follow the checkout room priority: rooms with early arrivals come first.",
          "Ưu tiên theo khách sắp đến.",
          "colleague",
        ),
        sp(
          "Did my guest laundry order go out today?",
          "Yes, sir. Your guest laundry order went at ten, and it comes back by six.",
          "Đã làm gì + lịch trả.",
        ),
        sp(
          "Do you feel confident on busy shifts now?",
          "Yes. I feel confident, and I still ask my supervisor when I am unsure.",
          "Tự tin nhưng biết giới hạn của mình — câu chốt giai đoạn ba.",
          "manager",
        ),
      ],
      reading: read(
        `A guest shouts that his laptop is missing and the room attendant was in his room. Vy does not argue and does not search anything herself. She calls security and the duty manager at once. Security arrives within five minutes. The laptop is found in the room safe, where the guest had locked it.`,
        [
          {
            q: "Vy làm gì khi khách tố nhân viên lấy máy tính?",
            options: [
              "Gọi an ninh và quản lý trực ngay",
              "Tự lục xe đẩy cho khách xem",
              "Khẳng định nhân viên không lấy gì",
            ],
            correct: 0,
            explanation:
              "'calls security and the duty manager at once' — không tranh cãi, không tự xử lý.",
          },
          {
            q: "Cuối cùng chiếc máy tính ở đâu?",
            options: [
              "Trong két sắt của phòng",
              "Trên xe đẩy của buồng phòng",
              "Ở quầy lễ tân tầng trệt",
            ],
            correct: 0,
            explanation:
              "Lời tố cáo chưa chắc đúng — đó là lý do cần an ninh và quản lý, không phải tranh cãi.",
          },
        ],
      ),
      game: [
        game(
          "My laptop is gone. Your cleaner took it!",
          "I understand, sir. I am calling security and the duty manager now.",
          "No! We not take. Look again.",
          "Of course, sir. I will search her trolley and her bag for you right now.",
          undefined,
          "Câu cuối tự lục soát — việc của an ninh, có quản lý chứng kiến. Câu đúng giữ bình tĩnh và gọi đúng người ngay.",
        ),
      ],
    }),
  ];
}

/** Housekeeping's Phase 3, week by week. */
export const HK_P3: Record<number, LessonContent[]> = {
  23: week23(),
  24: week24(),
  25: week25(),
  26: week26(),
  27: week27(),
  28: week28(),
  29: week29(),
  30: week30(),
};
