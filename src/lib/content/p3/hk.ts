// ============================================================
// HOUSEKEEPING — PHASE 3 (weeks 23-30), written for the department.
//
// Round 1 found the frame-built HK weeks teaching the room attendant to own
// decisions the floor does not own: "We have to apply the smoking penalty",
// "It was our mistake" before anyone had looked, "We can move you to
// another room". Round 2 (e3d0805) found the next layer: the must-be-right
// slot refused the course's own game keys for the same situation, three
// must-be-right turns promised another department's clock ("Security will be
// here within five minutes"), week 25 said "knock once" against the week-15
// SOP (knock twice, announce, wait), two weeks named two different people
// as the one who decides a damage charge, floor jargon was said to guests
// ("Your guest laundry order went at ten"), and five hard cases a floor
// meets every month were missing. So, one rule per decision, everywhere:
//
//  · The ROOM ATTENDANT says what they saw or counted, offers what is theirs
//    to offer (re-clean, replace, bring, a time they control), and passes
//    everything else on — naming who decides, never promising for them.
//  · The FLOOR SUPERVISOR checks a room before any charge, inspects a
//    re-clean, takes found items and the reports of the shift, approves a
//    free re-wash, and takes a guest's complaint about the room or the
//    cleaning. A guest who asks for someone senior, or who was not called
//    back, gets the executive housekeeper.
//  · The FRONT DESK explains prices, puts charges on the bill and checks the
//    bill, moves guests between rooms, checks ID, issues key cards and gives
//    lost property back.
//  · The DUTY MANAGER decides money: a damage charge amount, a smoking
//    penalty, a refund. Minibar items are the minibar attendant's, laundry
//    the laundry team's, bags the bell desk's.
//  · SECURITY comes for safety and for accusations: a stranger at a door, a
//    lost master key, a search, a guest who harasses staff, and — with the
//    supervisor — the welfare check when a Do Not Disturb sign stays on past
//    three and nobody answers the phone.
//  · An apology is for what the guest met, not a verdict on whose fault it
//    was. Week 29 is talk between colleagues and up to a supervisor, and is
//    labelled so; the lost item log is for found items, the shift log book
//    for the shift.
//
// The hard cases are marked `risk` (the checkpoint's must-be-right pool):
// every content word is locked and taught by that week, and each carries
// `alsoAccept` — the wording the course taught for the same move, and the
// correct answers the round-2 reviewers were refused. A game key or reading
// quote for the same situation is the model or one of those paraphrases.
//
// Cards keep every headword Phase 4 recycles; transparent phrase cards
// ("Use a quieter vacuum", "Return your ironed shirt") gave way to words of
// the trade (spill kit, welfare check, stayover, dehumidifier, pick-up), and
// two cards weeks 1-22 already taught (Colleague, Prefer) gave way too.
//
// Round 3 (a166936) counted 57 of 104 week-23-29 headwords that no later
// week said again. Every later week now says the dead words of the weeks
// before it, and week 30 — the checkpoint — teaches no new word: its cards
// re-present sixteen of them, each said twice that week.
// ============================================================
import type { LessonContent } from "../week-content";
import { game, g, read, sp } from "../phase0";
import { cardsFor, lessonsFor, risk } from "./kit";

const c = cardsFor("HK");
const L = lessonsFor("HK");

// ── Week 23 — Recommending from the pillow menu ─────────────────────────
function week23(): LessonContent[] {
  const t1a = "I recommend the memory foam topper, madam. It is softer than the mattress.";
  const t1b = "There is no charge, madam. I can put it on your bed this afternoon.";
  const t1c = "Then I also recommend a down duvet, madam. It is warmer than the blanket.";
  const t2a = "I recommend our soft earplugs, sir. The room is much quieter with them.";
  const t2b = "Then I also recommend an eye mask. It keeps the light out better than the curtain.";
  const t2c = "Of course. I will bring both to your room before seven o'clock.";
  const t3a = "For your baby, I recommend our baby bath set, madam. It is smaller and safer.";
  const t3b = "Of course, madam. Do you have an allergy?";
  const t3c = "Then the pillow spray is fine. I also recommend our anti-allergy bedding, madam.";
  const t4a = "Of course, madam. The standard pillowcase is also very good.";
  const t4b = "Then I recommend the plush towel set, madam. The towels are thicker and softer.";
  const t4c = "Of course. I will bring two fresh standard towels this afternoon.";
  return [
    L(23, 1, "From the Pillow Menu", "Gợi ý từ thực đơn gối", {
      vocabulary: [
        c("Recommend", "I recommend the memory foam topper for a bad back."),
        c("Instead", "Would you like a firmer pillow instead?"),
        c("Memory foam topper", "The memory foam topper makes a hard bed softer."),
        c("Down duvet", "A down duvet is warmer than the standard blanket.", [
          "/daʊn ˈdjuːveɪ/",
          "Chăn lông vũ",
          "🪶",
        ]),
        c("Premium toiletries", "The front desk adds a small charge for the premium toiletries."),
        c("Pillow choice", "I will note your pillow choice for the evening team."),
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
          "Nghe ra lý do (đau lưng) rồi mới gợi ý, và nói MỘT lợi ích bằng so sánh hơn.",
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
          "I recommend our premium toiletries, sir. The front desk adds a small charge.",
          "Gợi ý món có phí thì báo luôn ai tính phí: lễ tân, không phải bạn.",
        ),
        sp(
          "Is it a big charge?",
          "No, sir, it is small. The front desk can tell you the exact price.",
          "Trả lời điều bạn chắc chắn; con số cụ thể để lễ tân nói.",
          undefined,
          undefined,
          "I recommend our premium toiletries, sir. The front desk adds a small charge.",
        ),
        sp(
          "This pillow is much too soft for me.",
          "I am sorry, sir. Would you like a firmer pillow instead?",
          "Khách chê gối quá mềm — đưa phương án thay thế, không tranh luận.",
        ),
        sp(
          "Can I have a memory foam topper and a firmer pillow?",
          "Of course, madam. I will note your pillow choice and bring both this afternoon.",
          "Khách chọn cả hai — xác nhận và hứa thời điểm bạn tự giữ được.",
        ),
        sp(
          "Is a down duvet heavier than this blanket?",
          "No, sir. The down duvet is lighter than the blanket, and it is warmer.",
          "Trả lời câu so sánh bằng hai so sánh hơn: nhẹ hơn và ấm hơn.",
        ),
      ],
      reading: read(
        `Room 612 tells Hoa that the bed is too hard and her back hurts. Hoa listens first, then says: "I recommend the memory foam topper, madam. It is softer than the mattress." The guest also feels cold at night, so Hoa recommends a down duvet. Both come free from the pillow menu. The premium toiletries are different: the front desk adds a small charge to the bill. Hoa says so before the guest chooses.`,
        [
          {
            q: "Vì sao Hoa gợi ý tấm đệm cao su non?",
            options: [
              "Vì khách nói bị lạnh vào ban đêm",
              "Vì khách nói giường cứng và bị đau lưng",
              "Vì đệm cao su non là món không tính thêm phí",
            ],
            correct: 1,
            explanation:
              "'the bed is too hard and her back hurts' — gợi ý đi SAU nhu cầu khách vừa nói. Gợi ý không gắn với nhu cầu chỉ là chào hàng.",
          },
          {
            q: "Ai thêm khoản phí của bộ đồ dùng phòng tắm cao cấp?",
            options: [
              "Hoa tự ghi khoản phí vào sổ của tầng",
              "Khách trả tiền mặt cho nhân viên buồng",
              "Quầy lễ tân thêm vào hóa đơn",
            ],
            correct: 2,
            explanation:
              "'the front desk adds a small charge to the bill' — buồng phòng gợi ý, lễ tân lập hóa đơn. Nhân viên buồng không tự thu tiền.",
          },
          {
            q: "Vì sao Hoa nói về khoản phí TRƯỚC khi khách chọn?",
            options: [
              "Để khách không bất ngờ khi xem hóa đơn",
              "Vì khách đã hỏi giá của bộ đồ cao cấp",
              "Vì khoản phí đã có sẵn trên hóa đơn của khách",
            ],
            correct: 0,
            explanation:
              "'Hoa says so before the guest chooses' — biết trước có phí thì khách tự quyết, không bị bất ngờ trên hóa đơn.",
          },
        ],
      ),
      game: [
        game(
          "My back hurts on this bed. What can you do?",
          "I recommend the memory foam topper, madam. It is softer.",
          "I recommend the memory foam topper, madam. It is more softer.",
          "Most guests get used to our beds after one night here, madam.",
          undefined,
          "Câu cuối đúng ngữ pháp nhưng gạt nhu cầu của khách đi. Câu đúng gợi ý MỘT món cụ thể và nêu lợi ích của nó.",
        ),
        game(
          "I feel cold at night. Is there anything warmer?",
          "I recommend a down duvet, sir. It is warmer than the blanket.",
          "I recommend a down duvet, sir. It is warmer then the blanket.",
          "The blankets are the same in every room, sir, I am afraid.",
          undefined,
          "Câu cuối nói đúng một sự thật nhưng bỏ khách lạnh cả đêm. Câu đúng gợi ý một món trong thực đơn gối và so sánh rõ: warmer than.",
        ),
      ],
    }),

    L(23, 2, "Comparing Two Options", "So sánh hai lựa chọn", {
      vocabulary: [
        c("Quieter", "The air purifier is quieter than the old desk fan."),
        c("Air purifier", "The air purifier cleans the air while you sleep."),
        c("Eye mask", "An eye mask keeps the morning light out.", [
          "/ˈaɪ mɑːsk/",
          "Miếng bịt mắt khi ngủ",
          "😴",
        ]),
        c("Earplugs", "Soft earplugs help a light sleeper on a noisy street.", [
          "/ˈɪəplʌɡz/",
          "Nút bịt tai",
          "🦻",
        ]),
      ],
      grammar: [
        g(
          "This machine more quiet.",
          "The air purifier is quieter than the old fan, madam.",
          "Tính từ ngắn so sánh hơn: thêm -er + than. quiet → quieter than. Không dùng 'more quiet'.",
          "The air purifier is more quieter than the old fan, madam.",
        ),
        g(
          "Mask good, you sleep good.",
          "An eye mask is easier than closing all the curtains, sir.",
          "Tính từ tận cùng -y: easy → easier than. So sánh luôn đi với 'than', không phải 'then'.",
          "An eye mask is easier then closing all the curtains, sir.",
        ),
      ],
      speaking: [
        sp(
          "I am a light sleeper, and the street is very noisy.",
          t2a,
          "Gợi ý đúng vấn đề khách nêu (tiếng ồn) và nói lợi ích bằng so sánh hơn.",
        ),
        sp(
          "And the light? It is bright at six in the morning.",
          t2b,
          "Vấn đề thứ hai, món thứ hai — so sánh với thứ khách đang có trong phòng.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Good. Can you bring them tonight?",
          t2c,
          "Chốt bằng một mốc giờ bạn tự giữ được.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "The air feels dusty, and the desk fan is noisy.",
          "The air purifier is quieter than the fan, sir. It also cleans the air.",
          "So sánh đúng MỘT điểm khách đang khó chịu: tiếng ồn.",
        ),
        sp(
          "Is the air purifier bigger than the fan?",
          "No, madam. It is smaller than the fan, and it is much quieter.",
          "Trả lời câu hỏi so sánh bằng so sánh, rồi thêm lợi ích chính.",
        ),
        sp(
          "The day curtain lets in a lot of light.",
          "Our blackout curtain is thicker than the day curtain, madam. I will close it for you.",
          "Rèm chắn sáng đã học ở tuần 20 — so sánh dày hơn, rồi tự làm giúp khách.",
        ),
      ],
      reading: read(
        `Mr Haas is a light sleeper, and the room faces a busy street. Mai recommends soft earplugs: "The room is much quieter with them." For the morning light, she offers an eye mask, which keeps the light out better than the curtain. She also shows the air purifier, quieter than the old desk fan. Mr Haas takes the earplugs and the mask. Mr Haas says no to the purifier, and Mai does not ask again.`,
        [
          {
            q: "Mai so sánh miếng bịt mắt với cái gì?",
            options: ["Với chiếc quạt bàn cũ", "Với tấm rèm cửa", "Với máy lọc không khí"],
            correct: 1,
            explanation:
              "'keeps the light out better than the curtain' — câu so sánh luôn nói rõ được so với cái gì, sau 'than'.",
          },
          {
            q: "Vì sao Mai gợi ý nút bịt tai?",
            options: [
              "Vì phòng nhìn ra một con phố đông",
              "Vì khách bị dị ứng với bụi",
              "Vì máy lọc không khí trong phòng đang bị hỏng",
            ],
            correct: 0,
            explanation:
              "'the room faces a busy street' — món gợi ý đi theo đúng vấn đề của khách: tiếng ồn.",
          },
          {
            q: "Bài đọc cho thấy điều gì về cách Mai gợi ý?",
            options: [
              "Mỗi gợi ý đi theo một vấn đề khách nêu",
              "Mai gợi ý cả ba món cho mỗi vấn đề",
              "Mai chờ khách hỏi rồi mới nói về máy lọc không khí",
            ],
            correct: 0,
            explanation:
              "Tiếng ồn → nút bịt tai, ánh sáng → bịt mắt; và 'Mai does not ask again' khi khách từ chối. Gợi ý là phục vụ, không phải ép mua.",
          },
        ],
      ),
      game: [
        game(
          "Which is better for a light sleeper, the fan or the air purifier?",
          "The air purifier is quieter than the fan, madam.",
          "The air purifier is quiet than the fan, madam.",
          "Both are the same, madam, so it does not matter.",
          undefined,
          "Câu cuối không giúp khách chọn. Câu đúng so sánh rõ MỘT điểm khách quan tâm: quieter than the fan.",
        ),
        game(
          "The light wakes me up every morning.",
          "I recommend an eye mask, sir. It keeps the light out.",
          "I recommend an eye mask, sir. It keep the light out.",
          "Sunrise is very early here, sir. Many guests wake up early.",
          undefined,
          "Câu cuối giải thích vì sao khách thức giấc nhưng không giúp gì. Câu đúng gợi ý một món cụ thể cho đúng vấn đề.",
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
        risk({
          ...sp(
            "Can we also have the pillow spray? It smells lovely.",
            t3b,
            "Món có hương liệu: HỎI DỊ ỨNG trước khi dùng. Đừng đoán thay khách.",
            undefined,
            ["allergy", "allergies"],
            t3a,
          ),
          alsoAccept: [
            "Of course, madam. Do you have any allergies?",
            "Are you allergic to anything?",
            "It has lavender in it, madam. Does anyone have an allergy?",
          ],
        }),
        sp(
          "No allergy to lavender, but my husband is allergic to dust.",
          t3c,
          "Trả lời cả hai việc: xịt thơm dùng được, và gợi ý món hợp với dị ứng bụi.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "Is the anti-allergy bedding softer than the normal bedding?",
          "It is just as soft, madam, and it is better for a dust allergy.",
          "So sánh bằng (just as soft) rồi so sánh hơn (better for) — hai cấu trúc trong một câu.",
        ),
        sp(
          "Does the pillow spray have a strong smell?",
          "It is lighter than most perfumes, madam. It smells of lavender.",
          "Mô tả bằng so sánh hơn, rồi nói đúng thành phần để khách tự quyết.",
        ),
        sp(
          "Our baby wakes up at night. Do you have a cot?",
          "Yes, madam. A baby cot is free, and it is safer than a big bed.",
          "Thẻ cũ tuần 16 — nói rõ miễn phí, và một lý do so sánh.",
        ),
      ],
      reading: read(
        `A family checks in with a ten-month-old baby. Lan recommends the baby bath set, which is smaller and safer than the big bath. When the mother asks for the pillow spray, Lan first asks about allergies, because the spray has lavender. Lavender is fine, but the father is allergic to dust. So Lan brings the spray, recommends the anti-allergy bedding and notes the allergy for the room.`,
        [
          {
            q: "Vì sao Lan hỏi về dị ứng trước khi đưa xịt thơm gối?",
            options: [
              "Vì xịt thơm gối là món khách phải trả thêm tiền",
              "Vì xịt có tinh dầu oải hương",
              "Vì em bé mới mười tháng tuổi",
            ],
            correct: 1,
            explanation:
              "'because the spray has lavender' — món có hương liệu thì hỏi dị ứng trước, không làm rồi mới hỏi.",
          },
          {
            q: "Lan làm gì sau khi biết người cha dị ứng bụi?",
            options: [
              "Không mang xịt thơm lên vì người cha bị dị ứng",
              "Mang thêm xịt thơm để át đi mùi bụi",
              "Gợi ý chăn ga chống dị ứng, ghi chú cho phòng",
            ],
            correct: 2,
            explanation:
              "'recommends the anti-allergy bedding and notes the allergy for the room' — giải pháp đúng nhu cầu, và ghi lại.",
          },
          {
            q: "Vì sao Lan ghi chú dị ứng cho phòng?",
            options: [
              "Để ca sau biết, không mang nhầm đồ lên",
              "Để lễ tân tính thêm phí chăn ga",
              "Để khách nhớ không dùng xịt thơm gối nữa",
            ],
            correct: 0,
            explanation:
              "'notes the allergy for the room' — ca sau không nghe cuộc nói chuyện này; tờ ghi chú là thứ duy nhất nhắc họ.",
          },
        ],
      ),
      game: [
        game(
          "Can I have some of that lovely pillow spray?",
          "Of course, madam. Do you have an allergy?",
          "Of course, madam. Are you have an allergy?",
          "Sure, madam. I will spray it on all the pillows and the sheets now.",
          undefined,
          "Câu cuối làm ngay mà không hỏi. Với món có hương liệu: hỏi dị ứng trước, rồi mới dùng.",
        ),
        game(
          "My husband is allergic to dust. What can you do?",
          "I recommend our anti-allergy bedding, madam. I will note it for the room.",
          "I recommend our anti-allergy bedding, madam. I will notes it for the room.",
          "Dust is everywhere in this city, madam, so it is hard to avoid.",
          undefined,
          "Câu cuối đúng nhưng vô ích. Câu đúng đưa giải pháp cụ thể và ghi lại cho phòng để ca sau biết.",
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
          "What is special about the silk pillowcase?",
          "The silk pillowcase is softer on your hair, madam. It is also cooler at night.",
          "Hai lợi ích, hai so sánh hơn. Nói lợi ích, không nói giá trị món hàng.",
        ),
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
        sp(
          "Is the bath salt set free?",
          "No, sir. The front desk adds a small charge for the bath salt set.",
          "Món có phí: nói thật ngay, và nói ai tính phí.",
        ),
        sp(
          "Are the plush towels bigger than these?",
          "Yes, sir. The plush towels are bigger and thicker than our standard towels.",
          "Hai tính từ so sánh nối bằng 'and', chung một 'than'.",
        ),
      ],
      reading: read(
        `Ms Lindqvist says no to the silk pillowcase. Thu smiles: "Of course, madam. The standard pillowcase is also very good." Later the guest asks about the bathroom, so Thu offers the plush towel set once. The guest says no again. Thu simply brings fresh standard towels and does not ask a third time. At checkout she notes the bath salt set for the guest's next visit.`,
        [
          {
            q: "Thu phản ứng thế nào khi khách từ chối vỏ gối lụa?",
            options: [
              "Giải thích lại lợi ích để khách đổi ý thêm lần nữa",
              "Vui vẻ chấp nhận và khen lựa chọn của khách",
              "Im lặng rồi đi sang dọn phòng khác",
            ],
            correct: 1,
            explanation:
              "'The standard pillowcase is also very good' — chấp nhận và khẳng định lựa chọn của khách là đúng.",
          },
          {
            q: "Sau lời từ chối đầu tiên, Thu gợi ý thêm mấy lần?",
            options: ["Ba lần", "Không lần nào", "Một lần"],
            correct: 2,
            explanation:
              "'offers the plush towel set once' và 'does not ask a third time' — gợi ý một lần là phục vụ, gợi ý mãi là ép khách.",
          },
          {
            q: "Vì sao Thu ghi bộ muối tắm cho lần sau?",
            options: [
              "Để gợi ý mà không ép khách lúc này",
              "Để tính phí bộ muối tắm vào hóa đơn",
              "Vì kho của khách sạn đã hết muối tắm",
            ],
            correct: 0,
            explanation:
              "'notes the bath salt set for the guest's next visit' — khách đã từ chối hai lần; ghi lại cho lần sau giữ được ý tốt mà không ép.",
          },
        ],
      ),
      game: [
        game(
          "Thank you, but we will keep the standard towels.",
          "Of course, sir. The standard towels are also very good.",
          "Of course, sir. The standard towels is also very good.",
          "Are you sure, sir? The plush set is much better.",
          undefined,
          "Câu cuối ép khách sau khi khách đã từ chối. Câu đúng chấp nhận ngay và khen lựa chọn của khách.",
        ),
        game(
          "Do you have anything special for the bath?",
          "I recommend our bath salt set, madam. It is more relaxing than bath foam.",
          "I recommend our bath salt set, madam. It is more relaxing then bath foam.",
          "Most guests only take a shower here, madam, so we do not keep much for the bath.",
          undefined,
          "Câu cuối trả lời thay khách. Khách đã hỏi thì gợi ý một món cụ thể, kèm một lý do so sánh.",
        ),
      ],
    }),
  ];
}

// ── Week 24 — Explaining a charge you do not decide ─────────────────────
function week24(): LessonContent[] {
  const t1a = "Of course. There is a rollaway bed charge for that, madam.";
  const t1b = "I am sorry. The front desk can explain the price before we bring it.";
  const t1c = "Thank you, madam. I will bring it up after the front desk confirms it.";
  const t2a =
    "We have to check the minibar every morning because the minibar charge must be correct.";
  const t2b = "I understand. I will ask my supervisor to check the minibar count with you.";
  const t2c = "I am sorry, I cannot change the bill. The front desk can check it.";
  const t3a = "I am sorry, madam. I only reported the towels I counted this morning.";
  const t3b = "Not at all, madam. My supervisor will check the room before any charge.";
  const t3c = "I will call you after my supervisor checks the room, madam.";
  const t4a = "I understand, sir. Under our lost property rule, the front desk returns all items.";
  const t4b = "I am sorry, I cannot do that. The front desk will check your ID.";
  const t4c = "It is on the ground floor, sir. I will take you there now.";
  const smoke = "I cannot decide that, sir. The duty manager decides on any smoking penalty.";
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
          "Đồng ý trước, rồi báo có phí. Không để khách tự phát hiện trên hóa đơn.",
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
          "Hứa làm, nhưng sau khi lễ tân xác nhận — vì khoản phí đi vào hóa đơn.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "How much is it to wash a shirt?",
          "The prices are on the laundry price list in your wardrobe, sir.",
          "Chỉ đúng chỗ có bảng giá; đừng đọc giá theo trí nhớ.",
        ),
        sp(
          "Where can I read the hotel rules?",
          "Our policy is on the card in your wardrobe, madam. The front desk can explain it.",
          "Chỉ chỗ đọc quy định, và người giải thích được.",
        ),
        sp(
          "Do you charge for the bath things for my baby?",
          "No, madam. The baby bath set is free, but the bath salt set has a charge.",
          "Phân biệt rõ món miễn phí và món có phí trong cùng một câu — hai món của tuần 23.",
        ),
        sp(
          "Is the extra bed charge for one night or every night?",
          "It is for every night, madam. The front desk can confirm the price.",
          "Trả lời điều chắc chắn; con số cụ thể để lễ tân xác nhận.",
        ),
      ],
      reading: read(
        `Mrs Park asks Tuan for an extra bed for her son. Tuan says: "Of course. There is a rollaway bed charge for that, madam." She says nobody told her. Tuan does not argue about the price, because the front desk explains it and adds the charge. He asks the front desk to call her. When the front desk confirms, Tuan brings the bed up the same evening.`,
        [
          {
            q: "Ai giải thích giá và thêm phí giường phụ?",
            options: [
              "Tuấn tự báo giá rồi ghi vào sổ của tầng",
              "Quầy lễ tân",
              "Khách tự tính theo bảng giá trong tủ",
            ],
            correct: 1,
            explanation:
              "'the front desk explains it and adds the charge' — buồng phòng báo có phí, lễ tân giải thích và lập hóa đơn.",
          },
          {
            q: "Khi khách nói chưa ai báo về khoản phí, Tuấn làm gì?",
            options: [
              "Khẳng định khách đã được báo lúc nhận phòng",
              "Bỏ qua khoản phí cho khách vui lòng",
              "Không tranh luận, nhờ lễ tân gọi cho khách",
            ],
            correct: 2,
            explanation:
              "'Tuan does not argue… He asks the front desk to call her' — tranh luận về giá hay tự bỏ phí đều vượt việc của buồng phòng.",
          },
          {
            q: "Tuấn mang giường lên vào lúc nào?",
            options: [
              "Sau khi lễ tân xác nhận",
              "Ngay khi khách vừa hỏi",
              "Sáng hôm sau, trước giờ ăn sáng",
            ],
            correct: 0,
            explanation:
              "'When the front desk confirms, Tuan brings the bed up' — thứ tự đúng: báo phí, lễ tân xác nhận, rồi mới mang lên.",
          },
        ],
      ),
      game: [
        game(
          "Is the extra bed free?",
          "There is a rollaway bed charge for that, madam.",
          "There is rollaway bed charge for that, madam.",
          "Do not worry, madam, I will not tell anyone about it.",
          undefined,
          "Câu cuối hứa giấu khoản phí — nhân viên buồng không có quyền bỏ phí. Câu đúng báo nhẹ nhàng là có phí.",
        ),
        game(
          "How much does it cost to iron a dress?",
          "The prices are on the laundry price list in your wardrobe, madam.",
          "The prices is on the laundry price list in your wardrobe, madam.",
          "It is about ten dollars, madam, but I am not sure. Maybe a little more.",
          undefined,
          "Câu cuối đoán giá — khách sẽ thấy con số khác trên hóa đơn. Câu đúng chỉ đúng chỗ có bảng giá viết sẵn.",
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
          "The duty manager decides on any smoking penalty, sir.",
          "Nhân viên buồng không tự kết luận phạt. 'decide on' + khoản tiền; chủ ngữ số ít nên 'decides'.",
          "The duty manager decide on any smoking penalty, sir.",
        ),
      ],
      speaking: [
        sp(
          "Why is there a minibar charge on my bill?",
          t2a,
          "Nêu lý do thật bằng because — hóa đơn phải chính xác — không nói kiểu 'vì đó là quy định'.",
        ),
        sp(
          "But I did not drink anything.",
          t2b,
          "Không cãi khách. Nhờ người có trách nhiệm kiểm lại cùng khách.",
          undefined,
          undefined,
          t2a,
        ),
        risk({
          ...sp(
            "Can you just remove it for me?",
            t2c,
            "Câu thẩm quyền của tuần: bạn KHÔNG sửa hóa đơn. Nói rõ ai kiểm tra lại.",
            undefined,
            ["change", "bill", "front", "desk", "check"],
            t2b,
          ),
          alsoAccept: [
            "I am sorry, I cannot remove the charge. The front desk can check the bill.",
            "The front desk can check the bill, sir. I cannot change it myself.",
          ],
        }),
        sp(
          "Why do the premium toiletries cost extra?",
          "Because the premium toiletries come from a spa brand, madam. The front desk adds the charge.",
          "Món của tuần 23 + because: lý do thật, và ai tính phí.",
        ),
        sp(
          "What is this deep cleaning fee for?",
          "There is a deep cleaning fee because smoke stays in the curtains and carpet, sir.",
          "Lý do cụ thể khách hiểu được: khói bám vào rèm và thảm.",
        ),
        risk({
          ...sp(
            "Are you going to fine me for smoking in the room?",
            smoke,
            "Tiền phạt không phải việc của buồng phòng. Nói rõ ai quyết, không đoán số tiền.",
            undefined,
            ["decide", "decides", "duty", "manager", "smoking", "penalty"],
          ),
          alsoAccept: [
            "I cannot decide that, sir. May I ask the duty manager?",
            "I am sorry, I cannot decide that. The duty manager decides on any smoking penalty.",
            "I cannot decide that, sir. I will ask the duty manager.",
          ],
        }),
      ],
      reading: read(
        `Mr Cole questions a minibar charge. Linh explains: "We have to check the minibar every morning because the minibar charge must be correct." Mr Cole says the minibar was not used. Linh does not remove the charge herself. She asks her supervisor to check the count with Mr Cole, and the front desk checks the bill. The count was wrong, so the front desk removes the charge.`,
        [
          {
            q: "Vì sao tổ buồng kiểm minibar mỗi sáng?",
            options: [
              "Để bán thêm đồ uống cho khách",
              "Để phí minibar luôn chính xác",
              "Vì khách yêu cầu kiểm minibar mỗi ngày",
            ],
            correct: 1,
            explanation:
              "'because the minibar charge must be correct' — đó là lý do thật, nói được với khách.",
          },
          {
            q: "Cuối cùng ai bỏ khoản phí khỏi hóa đơn?",
            options: ["Linh", "Giám sát của Linh", "Quầy lễ tân"],
            correct: 2,
            explanation:
              "'the front desk removes the charge' — giám sát kiểm số đếm, lễ tân sửa hóa đơn. Linh không tự xoá phí.",
          },
          {
            q: "Vì sao Linh không tự bỏ phí dù khách nói không uống gì?",
            options: [
              "Vì lúc đó chưa ai kiểm lại số đếm",
              "Vì Linh nghĩ là khách nói dối",
              "Vì Linh đã thấy một chai nước bị mở",
            ],
            correct: 0,
            explanation:
              "Linh không kết luận ai đúng: 'asks her supervisor to check the count'. Kết quả cho thấy chính số đếm sai.",
          },
        ],
      ),
      game: [
        game(
          "Why do I have to pay a deep cleaning fee?",
          "Because smoke stays in the curtains and carpet, sir.",
          "Because smoke stay in the curtains and carpet, sir.",
          "Because the hotel likes to add extra fees to every bill, sir.",
          undefined,
          "Câu cuối nói xấu chính khách sạn. Câu đúng nêu lý do thật, cụ thể: khói bám vào rèm và thảm.",
        ),
        game(
          "So will you charge me a penalty for smoking?",
          smoke,
          "I cannot decide that, sir. The duty manager decide on any smoking penalty.",
          "Yes, sir. It is two hundred dollars, and I will add it today.",
          undefined,
          "Câu cuối tự quyết tiền phạt và đoán số tiền — việc của quản lý trực. Câu đúng nói rõ ai quyết.",
        ),
      ],
    }),

    L(24, 3, "Saying No Without Blaming", "Từ chối mà không quy lỗi", {
      vocabulary: [
        c(
          "Missing towel charge",
          "Before any missing towel charge, my supervisor checks the room.",
        ),
        c("Decide on", "The duty manager will decide on the charge.", [
          "/dɪˈsaɪd ɒn/",
          "Quyết định (về một khoản, một việc)",
          "⚖️",
        ]),
        c("Duty manager", "The duty manager decides on any penalty."),
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
          "Why did you report missing towels? I did not take anything!",
          t3a,
          "Bạn chỉ báo số đã đếm — không kết luận, không buộc tội.",
        ),
        risk({
          ...sp(
            "So you think I am lying?",
            t3b,
            "Không bao giờ buộc tội khách. Có kiểm tra trước, rồi mới có phí — và không phải bạn quyết.",
            undefined,
            ["supervisor", "check", "room", "before", "charge"],
            t3a,
          ),
          alsoAccept: [
            "No, madam. My supervisor will check the room before any charge.",
            "Not at all, madam. There is no charge before my supervisor checks the room.",
          ],
        }),
        sp(
          "Fine. When will I know?",
          t3c,
          "Hứa điều bạn tự làm được: gọi lại cho khách sau khi kiểm tra.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "Will you add the missing towel charge to my bill?",
          "I do not decide on the missing towel charge, madam. My supervisor checks the room first.",
          "Nói rõ bạn không quyết, và bước kiểm tra đi trước mọi khoản phí.",
        ),
        sp(
          "I lost my key card. Do I have to pay?",
          "There is a lost key card fee, sir. The front desk can explain it.",
          "Báo có phí, chuyển phần giá cho lễ tân.",
        ),
        sp(
          "Why do you have to count the towels at checkout?",
          "We have to count them because the next guest needs a full set, madam.",
          "have to + because + lý do thật, nói về khách sau chứ không về việc tính phí.",
        ),
        sp(
          "My dog stayed one night. Why is there a cleaning fee?",
          "Because we have to deep clean the room after every pet, sir.",
          "Lý do cụ thể: phòng phải làm sạch sâu sau mỗi lần có thú cưng.",
        ),
      ],
      reading: read(
        `Two towels are missing from Room 708 at checkout. Ngoc counts again and reports it. The guest is upset and asks if Ngoc thinks she is lying. Ngoc says: "Not at all, madam. My supervisor will check the room before any charge." The supervisor finds the towels in the wardrobe, and there is no charge. Ngoc calls the guest with the result before she leaves the hotel.`,
        [
          {
            q: "Ngọc làm gì khi thấy thiếu khăn?",
            options: [
              "Đếm lại rồi báo cáo",
              "Tự cộng phí mất khăn vào hóa đơn của phòng",
              "Hỏi thẳng khách đã mang khăn đi đâu",
            ],
            correct: 0,
            explanation:
              "'Ngoc counts again and reports it' — đếm lại cho chắc, báo cáo, để người có quyền kiểm tra.",
          },
          {
            q: "Kết quả cuối cùng là gì?",
            options: [
              "Khách trả phí cho cả hai chiếc khăn",
              "Khăn nằm trong tủ quần áo, không có phí",
              "Ngọc bị nhắc nhở vì đã đếm sai số khăn",
            ],
            correct: 1,
            explanation:
              "'The supervisor finds the towels in the wardrobe, and there is no charge.'",
          },
          {
            q: "Câu chuyện cho thấy vì sao phải kiểm tra TRƯỚC khi tính phí?",
            options: [
              "Vì giám sát phải ký vào mọi hóa đơn",
              "Vì khách đã ký nhận đủ khăn lúc nhận phòng",
              "Vì đồ có thể chỉ bị để nhầm chỗ",
            ],
            correct: 2,
            explanation:
              "Khăn 'in the wardrobe' — không mất, chỉ để nhầm chỗ. Tính phí trước khi kiểm là buộc tội oan khách.",
          },
        ],
      ),
      game: [
        game(
          "Are you saying I stole your towels?",
          "Not at all, madam. My supervisor will check the room before any charge.",
          "Not at all, madam. My supervisor will checks the room before any charge.",
          "I am sure you took them home by mistake, madam. It happens a lot.",
          undefined,
          "Câu cuối vẫn là buộc tội, chỉ nói mềm hơn. Câu đúng không kết luận gì: có kiểm tra rồi mới có phí.",
        ),
        game(
          "Do I have to pay for the key card I lost?",
          "There is a lost key card fee, sir. The front desk can explain it.",
          "There is a lost key card fee, sir. The front desk can explains it.",
          "No, sir. I will make you a new card myself, for free.",
          undefined,
          "Câu cuối tự hứa miễn phí và tự làm thẻ — cả hai là việc của lễ tân. Câu đúng báo có phí và chỉ đúng người giải thích.",
        ),
      ],
    }),

    L(24, 4, "Confirming the Rule", "Xác nhận quy định", {
      vocabulary: [
        c("Damaged linen charge", "A damaged linen charge needs a photo and a supervisor check."),
        c("Lost property rule", "Our lost property rule says the front desk returns items."),
        c("Late checkout fee", "There is a late checkout fee after twelve o'clock."),
        c("ID check", "The front desk does an ID check before it returns an item.", [
          "/ˌaɪ ˈdiː tʃek/",
          "Kiểm tra giấy tờ tùy thân",
          "🪪",
        ]),
      ],
      grammar: [
        g(
          "You understand?",
          "Would you like me to go through the late checkout fee again, madam?",
          "Mời khách nghe lại bằng 'Would you like me to…?' — đừng hỏi 'You understand?'.",
          "Would you like me go through the late checkout fee again, madam?",
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
          "Nói quy định trước, ngắn gọn và tử tế: lễ tân là nơi trả đồ.",
        ),
        risk({
          ...sp(
            "But you are right here. Just give it to me.",
            t4b,
            "Đồ thất lạc chỉ trả qua lễ tân, có kiểm tra giấy tờ. Không tự đưa, dù khách đứng ngay đó.",
            undefined,
            ["front", "desk", "check", "ID"],
            t4a,
          ),
          alsoAccept: [
            "I am sorry, I cannot give it to you. The front desk will check your ID.",
            "I cannot give it to you myself, sir. The front desk will check your ID.",
          ],
        }),
        sp(
          "Fine. Where is the front desk?",
          t4c,
          "Khép lại bằng một việc bạn tự làm được: dẫn khách tới đúng chỗ.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "Why is there a damaged linen charge on my bill?",
          "The damaged linen charge is for a torn sheet, madam. My supervisor has a photo.",
          "Lý do + bằng chứng. Phí hư hỏng luôn có ảnh và người kiểm tra.",
        ),
        sp(
          "Can I stay in the room until three?",
          "There is a late checkout fee after twelve, sir. The front desk can confirm it.",
          "Không tự hứa trả phòng muộn — lễ tân xác nhận.",
        ),
        sp(
          "Can I leave my bags in the room after twelve?",
          "There is a late checkout fee after twelve, sir. The bell desk can keep your bags.",
          "Báo phí, rồi chỉ một lựa chọn khác của bộ phận khác — không tự hứa giữ phòng.",
        ),
        sp(
          "Can I take the silk pillowcase home with me?",
          "The silk pillowcase stays in the room, sir. The front desk can tell you the price.",
          "Món của tuần 23: nói rõ quy định, và ai báo giá — không tự bán, không tự cho.",
        ),
        sp(
          "Why does the front desk need my passport for a lost item?",
          "The ID check keeps your things safe, madam. Nobody else can take them.",
          "Giải thích lý do thật của bước kiểm tra giấy tờ: bảo vệ đồ của chính khách.",
        ),
      ],
      reading: read(
        `Mr Diaz comes back for his watch the day after checkout. Hien knows the lost property rule: only the front desk gives items back, after an ID check. Mr Diaz asks her to just give it to him. Hien says: "I am sorry, I cannot do that. The front desk will check your ID." She walks Mr Diaz to the front desk, and the front desk returns the watch.`,
        [
          {
            q: "Theo quy định, ai trả đồ thất lạc cho khách?",
            options: [
              "Nhân viên buồng đã nhặt được món đồ",
              "Quầy lễ tân, sau khi kiểm tra giấy tờ",
              "Giám sát buồng phòng của ca đó",
            ],
            correct: 1,
            explanation:
              "'only the front desk gives items back, after an ID check' — một đầu mối, có kiểm tra.",
          },
          {
            q: "Hiền làm gì ngay sau khi từ chối?",
            options: [
              "Đưa khách xuống quầy lễ tân",
              "Hẹn khách quay lại vào hôm sau",
              "Gọi điện báo cho bộ phận an ninh",
            ],
            correct: 0,
            explanation:
              "'She walks Mr Diaz to the front desk' — từ chối việc không được làm, rồi làm ngay việc mình làm được.",
          },
          {
            q: "Vì sao quy định cần kiểm tra giấy tờ?",
            options: [
              "Để lễ tân biết khách đã trả phòng chưa",
              "Để lễ tân biết khách ở lại bao lâu",
              "Để không trả nhầm đồ cho người khác",
            ],
            correct: 2,
            explanation:
              "Đưa nhầm đồ cho người không phải chủ là mất đồ của khách. 'after an ID check' là để chặn chuyện đó.",
          },
        ],
      ),
      game: [
        game(
          "That is my watch on the shelf. Just give it to me, please.",
          "I am sorry, I cannot give it to you. The front desk will check your ID.",
          "I am sorry, I cannot give it to you. The front desk will checking your ID.",
          "Of course, sir. It must be yours. Here you are.",
          undefined,
          "Câu cuối đoán thay vì kiểm tra — nếu đoán sai là mất đồ của khách khác. Câu đúng chuyển qua lễ tân kiểm tra giấy tờ.",
        ),
        game(
          "Can I check out at three without paying more?",
          "There is a late checkout fee after twelve, madam. The front desk can confirm it.",
          "There is a late checkout fee after twelve, madam. The front desk can confirms it.",
          "Yes, madam. Housekeeping can wait for you, so three o'clock is no problem at all today.",
          undefined,
          "Câu cuối tự cho trả phòng muộn miễn phí — quyết định của lễ tân. Câu đúng báo phí và chỉ người xác nhận.",
        ),
      ],
    }),
  ];
}

// ── Week 25 — Promising a time, and keeping it ──────────────────────────
function week25(): LessonContent[] {
  const t1a = "Of course. I will bring two extra pillows within ten minutes, madam.";
  const t1b = "Then I will bring them up straight away, madam, before you leave.";
  const t1c = "You are welcome, madam. I will knock twice and announce housekeeping.";
  const t2a = "We are going to service your room by three o'clock, madam.";
  const t2b = "No problem. Please hang the Do Not Disturb sign, and we will not knock.";
  const t2c = "Then we will knock twice and wait. If you say no, we will come back later.";
  const dnd = "Then we will not knock. I will call the room and ask the guest.";
  const t3a = "Laundry pick-up is at ten, sir, and we return it by six.";
  const t3b = "If you like, we can do pressing only, sir. It is much faster than washing.";
  const t3c = "Of course. If there is a delay, I will call you before three.";
  const t4a = "I am very sorry, sir. I am on my way, and I will be there within five minutes.";
  const t4b = "You are right, sir. I am bringing the cot myself now.";
  const t4c = "Your turndown time is seven o'clock, sir, the same as every evening.";
  return [
    L(25, 1, "Within Ten Minutes", "Cam kết trong bao lâu", {
      vocabulary: [
        c("Within", "I will be there within ten minutes."),
        c("Straight away", "I will replace the bath mat straight away."),
        c("Bath mat", "The bath mat stops you slipping after a shower.", [
          "/ˈbɑːθ mæt/",
          "Thảm chân phòng tắm",
          "🛁",
        ]),
        c("Ironing board", "I will bring an iron and an ironing board.", [
          "/ˈaɪənɪŋ bɔːd/",
          "Cầu là (bàn để ủi quần áo)",
          "👔",
        ]),
      ],
      grammar: [
        g(
          "Pillow coming soon.",
          "I will bring two extra pillows within ten minutes, madam.",
          "Cam kết có mốc cụ thể: within + số phút. 'Soon' không phải là lời hứa.",
          "I will bringing two extra pillows within ten minutes, madam.",
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
          "Lời hứa có mốc: trong vòng bao nhiêu phút. Đừng nói kiểu 'lát nữa'.",
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
          "Thank you. I will wait in the room.",
          t1c,
          "Đúng quy trình tuần 15: gõ hai lần, xưng Housekeeping, rồi chờ.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "The bath mat is wet and dirty.",
          "I am sorry, madam. I will replace the bath mat straight away.",
          "Việc nhỏ khách đang cần: xin lỗi rồi thay ngay.",
        ),
        sp(
          "Can I have an iron? I have a meeting at nine.",
          "Of course, sir. I will bring an iron and an ironing board within ten minutes.",
          "Mang đủ bộ (bàn là và cầu là) và hứa có mốc.",
        ),
        sp(
          "Can I also have a down duvet? The air conditioning feels cold.",
          "Of course, madam. I will bring a down duvet within ten minutes.",
          "Món của tuần 23, lời hứa của tuần 25: đồng ý + món + mốc giờ.",
          undefined,
          ["down", "duvet"],
        ),
      ],
      reading: read(
        `Room 512 asks for two extra pillows. Phuong promises them within ten minutes. The guest is going out very soon, so Phuong brings them up at once, before the guest leaves. At the door she knocks twice, says "Housekeeping" and waits. Later the guest asks for an ironing board, and Phuong brings it within ten minutes too. A promise with a real time is easier to keep, and easier for the guest to check.`,
        [
          {
            q: "Vì sao Phương mang gối lên sớm hơn mốc đã hứa?",
            options: [
              "Vì tổ trưởng yêu cầu cả tầng làm nhanh hơn",
              "Vì gối dự trữ để ngay ở phòng bên cạnh",
              "Vì khách nói sắp ra ngoài",
            ],
            correct: 2,
            explanation:
              "'The guest is going out very soon' — mốc hứa đi theo thời gian của khách.",
          },
          {
            q: "Ở cửa phòng, Phương làm gì?",
            options: [
              "Gõ hai lần, xưng Housekeeping rồi chờ",
              "Gõ một lần rồi mở cửa đi vào luôn",
              "Để gối ngoài cửa rồi gọi điện báo khách",
            ],
            correct: 0,
            explanation:
              "'she knocks twice, says \"Housekeeping\" and waits' — đúng quy trình vào phòng đã học ở tuần 15.",
          },
          {
            q: "Bài đọc nói gì về một lời hứa có mốc thời gian?",
            options: [
              "Không nên hứa giờ cụ thể để tránh bị phàn nàn",
              "Dễ giữ hơn, và khách dễ kiểm tra hơn",
              "Nên hứa thật sớm dù chưa chắc làm kịp",
            ],
            correct: 1,
            explanation:
              "'easier to keep, and easier for the guest to check' — mốc cụ thể làm lời hứa có trách nhiệm.",
          },
        ],
      ),
      game: [
        game(
          "How long until the extra pillows come?",
          "I will bring them within ten minutes, madam.",
          "I will to bring them within ten minutes, madam.",
          "As soon as possible, madam — we are very busy today.",
          undefined,
          "'As soon as possible' không phải lời hứa: khách không biết chờ đến khi nào. Câu đúng có mốc: within ten minutes.",
        ),
        game(
          "My shirt is creased, and I have a meeting soon.",
          "Of course, sir. I will bring an ironing board within ten minutes.",
          "Of course, sir. I will bring ironing board within ten minutes.",
          "There is a dry cleaner on the next street, sir.",
          undefined,
          "Câu cuối đẩy khách ra ngoài khách sạn. Câu đúng nhận việc và hứa có mốc giờ.",
        ),
      ],
    }),

    L(25, 2, "By Three O'clock — and the Sign on the Door", "Trước ba giờ — và tấm biển trên cửa", {
      vocabulary: [
        c("Going to", "We are going to service your room by three o'clock."),
        c("Make-up room", "Hang the make-up room sign when you want cleaning.", [
          "/ˈmeɪk ʌp ruːm/",
          "Biển yêu cầu dọn phòng",
          "🧹",
        ]),
        c("Shower curtain", "I will change the shower curtain before you come back.", [
          "/ˈʃaʊə ˌkɜːtn/",
          "Rèm phòng tắm",
          "🚿",
        ]),
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
        sp("When will you clean my room today?", t2a, "Kế hoạch có sẵn: going to + mốc giờ."),
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
          "Gõ hai lần, chờ, và quay lại sau nếu khách chưa muốn dọn.",
          undefined,
          undefined,
          t2b,
        ),
        risk({
          ...sp(
            "The guest in 604 asked for service, but the DND sign is still on.",
            dnd,
            "Biển còn treo thì không gõ cửa, dù khách đã gọi dọn. Gọi điện vào phòng hỏi trước.",
            "colleague",
            ["knock", "call", "room", "ask", "guest"],
          ),
          alsoAccept: [
            "Then we do not knock. I will call the guest on the phone first.",
            "Then we do not knock. I will call the room and ask the guest.",
          ],
        }),
        sp(
          "I am going out now. How do I ask for cleaning?",
          "Please hang the make-up room sign, madam. We are going to clean by two o'clock.",
          "Chỉ đúng tấm biển, rồi hứa một mốc giờ.",
        ),
        sp(
          "Can I keep the Do Not Disturb sign on all day tomorrow?",
          "Of course, madam. Our policy is to call you at three if the sign is still on.",
          "Thẻ tuần 24: nói quy định bằng một mốc giờ cụ thể — không vào phòng, chỉ gọi hỏi.",
          undefined,
          ["policy"],
        ),
        sp(
          "The shower curtain has black spots on it.",
          "I am sorry, sir. I will change the shower curtain before you come back.",
          "Xin lỗi + làm ngay, theo mốc của khách.",
        ),
        sp(
          "My husband has a dust allergy. When can you change the bedding?",
          "We are going to put on anti-allergy bedding and bring an air purifier by two.",
          "Món của tuần 23, kế hoạch của tuần 25: going to + món + mốc giờ.",
          undefined,
          ["anti-allergy", "bedding", "air", "purifier"],
        ),
      ],
      reading: read(
        `The plan for Room 604 is service by three o'clock. At one, the Do Not Disturb sign is still on, even though the guest asked for service this morning. Dung does not knock. She calls the room from the floor phone and asks the guest. The guest asks for service at four instead, so Dung changes the plan and tells her supervisor.`,
        [
          {
            q: "Vì sao Dung không gõ cửa phòng 604?",
            options: [
              "Biển Không làm phiền vẫn đang treo trên cửa",
              "Khách đã trả phòng từ sáng sớm hôm nay",
              "Phòng đang chờ tổ kỹ thuật tới kiểm tra máy lạnh",
            ],
            correct: 0,
            explanation:
              "'the Do Not Disturb sign is still on' — biển còn treo thì không gõ, dù đã có yêu cầu dọn từ sáng.",
          },
          {
            q: "Dung làm gì thay vì gõ cửa?",
            options: [
              "Gõ cửa liên tục cho đến khi khách ra mở cửa",
              "Gọi vào phòng bằng điện thoại ở tầng",
              "Bỏ qua phòng đó và không dọn hôm nay",
            ],
            correct: 1,
            explanation:
              "'She calls the room from the floor phone and asks the guest' — hỏi khách, để khách chọn giờ dọn mới.",
          },
          {
            q: "Sau khi khách hẹn bốn giờ, Dung làm gì tiếp?",
            options: [
              "Vào dọn phòng ngay vì khách đã thức",
              "Chờ đến ngày mai mới dọn phòng",
              "Đổi kế hoạch và báo cho giám sát",
            ],
            correct: 2,
            explanation:
              "'Dung changes the plan and tells her supervisor' — kế hoạch đổi thì người phân công phải biết.",
          },
        ],
      ),
      game: [
        game(
          "604 asked for service, but the DND sign is on. Should I knock?",
          "Then we do not knock. I will call the guest on the phone first.",
          "Then we do not knock. I will calling the guest on the phone first.",
          "Yes, just knock quietly so you do not wake them.",
          "colleague",
          "Câu cuối nghe chu đáo nhưng là gõ cửa khi biển còn treo. Câu đúng: không gõ, gọi điện hỏi khách trước.",
        ),
        game(
          "I am going out. How can I get my room cleaned?",
          "Please hang the make-up room sign, madam.",
          "Please hanging the make-up room sign, madam.",
          "Just leave your door open, madam, and we will come in.",
          undefined,
          "Câu cuối bảo khách để cửa mở — mất an toàn cho đồ của khách. Câu đúng chỉ đúng tấm biển yêu cầu dọn phòng.",
        ),
      ],
    }),

    L(25, 3, "Keeping the Guest Informed", "Báo cho khách biết tiến độ", {
      vocabulary: [
        c("Pick-up", "Laundry pick-up is at ten o'clock.", [
          "/ˈpɪk ʌp/",
          "Giờ đến lấy đồ (giặt)",
          "🧺",
        ]),
        c("Pressing", "Pressing only is faster than washing.", [
          "/ˈpresɪŋ/",
          "Dịch vụ là (ủi) quần áo",
          "♨️",
        ]),
        c("Same-day laundry", "Same-day laundry comes back by six.", [
          "/ˌseɪm deɪ ˈlɔːndri/",
          "Giặt trả trong ngày",
          "👕",
        ]),
      ],
      grammar: [
        g(
          "Shirt ready, I call.",
          "I will return your shirt by six and call you first.",
          "Hai việc trong một lời hứa nối bằng 'and': cả hai cùng sau 'will', đều ở dạng gốc.",
          "I will return your shirt by six and calling you first.",
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
          "Khách có mốc riêng — gợi ý dịch vụ nhanh hơn và để khách chọn, không tự đổi dịch vụ.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Yes, please. Can you tell me if there is a problem?",
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
        sp(
          "Is same-day laundry possible? I leave tomorrow morning.",
          "Yes, sir. Same-day laundry is back by six if we pick it up by ten.",
          "Mốc đi kèm điều kiện: trả trước sáu giờ nếu lấy trước mười giờ.",
        ),
        sp(
          "My shirt came back with a burn mark. Who pays for it?",
          "I am very sorry, sir. I will report it, and the duty manager will decide on it.",
          "Đồ giặt bị hỏng: xin lỗi, báo cáo, người quyết là quản lý trực — không tự hứa đền.",
          undefined,
          ["report", "duty", "manager", "decide"],
        ),
        sp(
          "How much is pressing for a suit?",
          "The price is on the laundry price list in your wardrobe, sir.",
          "Thẻ tuần 24: chỉ đúng bảng giá, không đọc giá theo trí nhớ.",
          undefined,
          ["laundry", "price", "list"],
        ),
      ],
      reading: read(
        `Mr Tan needs his shirt for a dinner at five, but laundry usually comes back at six. Hai offers pressing only, which is much faster, and Mr Tan agrees. He promises to call Mr Tan before three if there is a delay. At two, the laundry team confirms the time. Hai calls Mr Tan to say the shirt is on time, and he brings it up at four.`,
        [
          {
            q: "Vì sao Hải gợi ý chỉ là áo?",
            options: [
              "Vì tổ giặt hôm đó không giặt áo sơ mi",
              "Vì khách cần áo cho bữa tối lúc năm giờ",
              "Vì khách không muốn trả tiền giặt",
            ],
            correct: 1,
            explanation:
              "'needs his shirt for a dinner at five' — mốc của khách quyết định chọn dịch vụ nào.",
          },
          {
            q: "Hải đã hứa gọi cho khách trong trường hợp nào?",
            options: [
              "Sau sáu giờ, khi áo đã được trả",
              "Chỉ khi khách gọi xuống để hỏi",
              "Trước ba giờ, nếu có chậm trễ",
            ],
            correct: 2,
            explanation:
              "'promises to call Mr Tan before three if there is a delay' — báo trước khi khách phải đi hỏi.",
          },
          {
            q: "Việc gì xảy ra lúc hai giờ?",
            options: [
              "Tổ giặt xác nhận giờ, Hải gọi báo khách",
              "Hải mang áo lên phòng cho khách",
              "Khách gọi xuống hỏi về chiếc áo",
            ],
            correct: 0,
            explanation:
              "'At two, the laundry team confirms the time. Hai calls Mr Tan' — có xác nhận rồi mới báo khách là kịp.",
          },
        ],
      ),
      game: [
        game(
          "Can you tell me when my shirt is ready?",
          "Of course. I will call you when it comes back, before four.",
          "Of course. I will call you when it come back, before four.",
          "Please call the laundry team yourself, sir. It is faster.",
          undefined,
          "Câu cuối đẩy việc sang khách. Câu đúng nhận việc báo tin, kèm mốc giờ.",
        ),
        game(
          "What time do you collect laundry?",
          "Laundry pick-up is at ten, madam, and we return it by six.",
          "Laundry pick-up is at ten, madam, and we returns it by six.",
          "Any time, madam. Just leave the bag outside your door all day.",
          undefined,
          "Câu cuối không cho khách một mốc nào, và đồ để ngoài cửa cả ngày dễ thất lạc. Câu đúng nêu hai mốc: lấy và trả.",
        ),
      ],
    }),

    L(25, 4, "When You Cannot Keep the Promise", "Khi không giữ được lời hứa", {
      vocabulary: [
        c("On my way", "I am on my way to your room now.", [
          "/ɒn maɪ ˈweɪ/",
          "Đang trên đường tới",
          "🏃",
        ]),
        c("Turndown time", "Your turndown time is seven o'clock."),
        c("Kettle", "The kettle in your room boils water for tea.", [
          "/ˈketl/",
          "Ấm đun nước",
          "🫖",
        ]),
        c("Spare", "I will bring a spare kettle from the store room.", [
          "/speə/",
          "Dự phòng, để thay",
          "🔁",
        ]),
        c("Ice bucket", "I will bring an ice bucket for your drinks.", [
          "/ˈaɪs ˌbʌkɪt/",
          "Xô đá",
          "🧊",
        ]),
      ],
      grammar: [
        g(
          "Sorry late. Busy.",
          "I am very sorry for the delay. I will be there within five minutes.",
          "Xin lỗi + mốc MỚI cho ĐÚNG việc đã hứa. Sau 'will' động từ ở dạng gốc: be.",
          "I am very sorry for the delay. I will being there within five minutes.",
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
          "You said ten minutes for the baby cot. It has been thirty.",
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
          "Nhắc lại đúng giờ chỉnh giường thường lệ, để khách yên tâm.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "Nobody came to turn down my bed.",
          "I am sorry, madam. I will send a room attendant within ten minutes.",
          "Xin lỗi + người + mốc giờ.",
        ),
        sp(
          "The kettle is not working.",
          "I am sorry, madam. I will bring a spare kettle within ten minutes.",
          "Đồ hỏng: mang đồ dự phòng, không hứa sửa thay kỹ thuật.",
        ),
        sp(
          "Can you bring some tea bags too?",
          "Of course, madam. I will bring tea bags with the spare kettle.",
          "Gộp hai việc vào một lần mang lên — cùng mốc giờ đã hứa.",
          undefined,
          undefined,
          "I am sorry, madam. I will bring a spare kettle within ten minutes.",
        ),
        sp(
          "Can I have some ice for my drinks?",
          "Of course, sir. I will bring an ice bucket within five minutes.",
          "Yêu cầu nhỏ, mốc ngắn.",
        ),
        sp(
          "The plush towels and the pillow spray did not come. You promised them by noon.",
          "I am very sorry, madam. I will bring your plush towel set and pillow spray within ten minutes.",
          "Món của tuần 23: xin lỗi + đúng món đã hứa + mốc mới.",
          undefined,
          ["plush", "towel", "set", "pillow", "spray"],
        ),
      ],
      reading: read(
        `Room 309 asked for a baby cot thirty minutes ago, and the promise was ten minutes. Kien apologises, keeps the same task and gives a new time: five minutes. He does not offer a different service instead. Then he brings the cot himself. That evening he checks that the turndown starts at seven, as usual, so the guest does not wait again.`,
        [
          {
            q: "Kiên làm gì khi trễ hẹn?",
            options: [
              "Xin lỗi rồi đề nghị chỉnh giường thay thế",
              "Giải thích rằng hôm nay tầng quá đông",
              "Xin lỗi, giữ đúng việc và đưa mốc mới",
            ],
            correct: 2,
            explanation:
              "'keeps the same task and gives a new time' — khách chờ nôi em bé thì giải pháp là nôi em bé, không phải việc khác.",
          },
          {
            q: "Mốc thời gian mới Kiên đưa ra là bao lâu?",
            options: ["Năm phút", "Mười phút", "Ba mươi phút"],
            correct: 0,
            explanation: "'a new time: five minutes' — mốc mới ngắn hơn mốc đã lỡ.",
          },
          {
            q: "Vì sao tối đó Kiên kiểm tra lại giờ chỉnh giường?",
            options: [
              "Vì giám sát yêu cầu đổi giờ chỉnh giường",
              "Để khách không phải chờ thêm lần nữa",
              "Vì khách muốn chỉnh giường sớm hơn",
            ],
            correct: 1,
            explanation:
              "'so the guest does not wait again' — sau một lần trễ hẹn, việc tiếp theo phải đúng giờ.",
          },
        ],
      ),
      game: [
        game(
          "You promised the baby cot thirty minutes ago!",
          "I am very sorry, sir. I am on my way, and I will be there within five minutes.",
          "I am very sorry, sir. I am on my way, and I will be there in within five minutes.",
          "I am very sorry, sir. I will turn down your bed now instead, and the cot can wait.",
          undefined,
          "Câu cuối đổi sang một việc khách không yêu cầu. Câu đúng giữ đúng việc khách đang chờ và đưa mốc mới.",
        ),
        game(
          "The kettle in my room is broken.",
          "I am sorry, madam. I will bring a spare kettle within ten minutes.",
          "I am sorry, madam. I will bring spare kettle within ten minutes.",
          "Kettles often break here, madam. Maybe try it again later.",
          undefined,
          "Câu cuối đổ cho chiếc ấm và để khách tự xoay xở. Câu đúng mang đồ dự phòng, kèm mốc giờ.",
        ),
      ],
    }),
  ];
}

// ── Week 26 — One request, one owner ────────────────────────────────────
function week26(): LessonContent[] {
  const t1a = "I am sorry, sir. Let me check with the engineering team for you.";
  const t1b =
    "The engineering team can fix it safely, sir. I will call them and tell you the time.";
  const t1c = "I will tell the engineering team about your call at six, sir.";
  const door = "I am sorry, I cannot open the door. The front desk will check your ID.";
  const knock = "I am calling security now, madam. Please do not open your door.";
  const t2a = "I am sorry. I will ask the minibar attendant to restock it within an hour.";
  const t2b = "I can bring free water now, sir. The minibar attendant will restock the rest.";
  const t2c = "Of course. I will arrange it before six and call you.";
  const t3a = "I am very sorry, madam. I will call the pest control team now.";
  const t3b = "Yes, madam. I have informed them, and they are coming at eight.";
  const t3c = "I understand, madam. I will ask the front desk about another room for you.";
  const welfare = "I will ask the supervisor and security to do a welfare check now.";
  const t4a = "Yes, sir. The engineering team has fixed it, and I checked it myself.";
  const t4b = "I am very sorry, sir. I will tell the duty manager about your night.";
  const t4c = "I will follow up with engineering today, sir, and check the room again at six.";
  return [
    L(26, 1, "Let Me Check With…", "Để tôi hỏi bộ phận…", {
      vocabulary: [
        c("Transfer", "I will transfer your call to the front desk."),
        c("Engineering team", "The engineering team fixes the air conditioning."),
        c("Security", "Security comes when a guest does not feel safe.", [
          "/sɪˈkjʊərəti/",
          "Bộ phận an ninh",
          "🛡️",
        ]),
        c("Housekeeping coordinator", "The housekeeping coordinator takes guest calls.", [
          "/ˈhaʊskiːpɪŋ kəʊˈɔːdɪneɪtə/",
          "Điều phối viên buồng phòng",
          "☎️",
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
          "Nói lý do tích cực (sửa an toàn), rồi hứa việc bạn tự làm được: gọi và báo giờ.",
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
        risk({
          ...sp(
            "I left my key inside. Please open room 714 for me.",
            door,
            "Không mở cửa cho người chưa được xác minh — kể cả khi họ nói đúng số phòng.",
            undefined,
            ["open", "door", "front", "desk", "check", "ID"],
          ),
          alsoAccept: [
            "I am sorry, I cannot open the door. Please go to the front desk with your ID.",
            "I am sorry, I cannot do that. The front desk will check your ID.",
            "I am sorry, sir. I cannot open the door. Please ask the front desk.",
          ],
        }),
        sp(
          "Is this housekeeping? I have a question about my bill.",
          "Yes, madam. I will transfer your call to the front desk.",
          "Hóa đơn là việc của lễ tân — chuyển máy, đừng đoán.",
        ),
        risk({
          ...sp(
            "A man keeps knocking on my door, and I do not know him.",
            knock,
            "Khách thấy không an toàn: gọi an ninh ngay, dặn khách không mở cửa. Không tự ra đối mặt.",
            undefined,
            ["calling", "security", "open", "door"],
          ),
          alsoAccept: [
            "Please do not open the door, madam. I am calling security now.",
            "Please keep your door closed, madam. I am calling security now.",
          ],
        }),
        sp(
          "Who takes housekeeping calls at night?",
          "The housekeeping coordinator takes them, madam. Just press five on your phone.",
          "Chỉ đúng người nhận việc và cách gọi.",
        ),
        sp(
          "Can I smoke on the balcony?",
          "I am sorry, sir. Our policy is no smoking, and the duty manager decides any smoking penalty.",
          "Thẻ tuần 24: quy định + người quyết khoản phạt. Bạn không đoán số tiền.",
          undefined,
          ["policy", "smoking", "duty", "manager", "penalty"],
        ),
        sp(
          "Will I pay a late checkout fee if I stay until two?",
          "Let me check with the front desk about the late checkout fee, madam.",
          "Thẻ tuần 24 + Let me check with: phí do lễ tân xác nhận, bạn không đoán.",
          undefined,
          ["late", "checkout", "fee"],
        ),
        sp(
          "Can you bring the rollaway bed up now?",
          "I will ask the front desk to confirm the rollaway bed charge first, madam.",
          "Thẻ tuần 24 + cấu trúc tuần này: ask + bộ phận + to + việc.",
          undefined,
          ["rollaway", "bed", "charge"],
        ),
      ],
      reading: read(
        `A man in the corridor says: "I left my key inside 714. Just open it." Thao does not open the door. She says: "I am sorry, I cannot open the door. The front desk will check your ID." She calls the front desk and waits with the man. The front desk checks the man's ID and gives a new key card. Later, a guest calls about a stranger knocking, and Thao calls security at once.`,
        [
          {
            q: "Vì sao Thảo không mở cửa phòng 714?",
            options: [
              "Thảo không mang chìa khóa tổng ca đó",
              "Chưa xác minh được người đó là khách của phòng",
              "Phòng 714 đang được tổ kỹ thuật sửa ống nước phòng tắm",
            ],
            correct: 1,
            explanation:
              "Biết số phòng chưa chứng minh là khách của phòng. Mở cửa cho người lạ là rủi ro mất đồ và an toàn.",
          },
          {
            q: "Ai kiểm tra giấy tờ và cấp thẻ phòng mới?",
            options: [
              "Quầy lễ tân",
              "Thảo, sau khi hỏi tên và số điện thoại",
              "Trưởng bộ phận buồng phòng của ca đó",
            ],
            correct: 0,
            explanation:
              "'The front desk checks the man's ID and gives a new key card' — một đầu mối, có xác minh.",
          },
          {
            q: "Hai việc Thảo làm trong bài giống nhau ở điểm nào?",
            options: [
              "Thảo tự xử lý cho xong để khách khỏi chờ",
              "Thảo hỏi ý kiến khách trước khi làm",
              "Thảo chuyển việc an toàn cho đúng người",
            ],
            correct: 2,
            explanation:
              "Cửa phòng → lễ tân kiểm tra giấy tờ; người lạ gõ cửa → 'calls security at once'. Không tự xử việc an toàn.",
          },
        ],
      ),
      game: [
        game(
          "I left my key inside. Just open the door for me, please.",
          door,
          "I am sorry, I cannot open the door. The front desk will checks your ID.",
          "Of course, sir. You look like the guest from this room.",
          undefined,
          "Câu cuối mở cửa vì 'trông giống' — không phải xác minh. Câu đúng chuyển sang lễ tân kiểm tra giấy tờ.",
        ),
        game(
          "Someone is knocking and shouting outside my door!",
          "Please do not open the door, madam. I am calling security now.",
          "Please do not opening the door, madam. I am calling security now.",
          "I will go and ask him to stop, madam. He is probably just tired.",
          undefined,
          "Câu cuối tự ra đối mặt với người lạ — nguy hiểm cho cả bạn lẫn khách. Câu đúng giữ khách trong phòng và gọi an ninh.",
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
          "I will ask the executive housekeeper to call you, madam.",
          "Chuyển lên cấp trên. Sau 'ask' là người, không chen 'to' vào giữa.",
          "I will ask to the executive housekeeper to call you, madam.",
        ),
      ],
      speaking: [
        sp("The minibar is almost empty.", t2a, "Một việc, một người làm, một mốc giờ."),
        sp(
          "Can you not just do it now?",
          t2b,
          "Làm ngay phần trong quyền của bạn (nước miễn phí), phần còn lại đúng người làm.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "All right. Before six, please.",
          t2c,
          "Chốt mốc của khách và hứa gọi lại.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "Could someone turn down the bed later, at ten?",
          "Of course. I will ask the turndown attendant to come at ten, madam.",
          "ask + người + to + động từ + mốc giờ khách chọn.",
        ),
        sp(
          "I want to speak to someone senior about the cleaning.",
          "Of course, madam. I will ask the executive housekeeper to call you.",
          "Chuyển lên cấp trên ngay, không giữ khách lại, không hứa giờ thay người khác.",
        ),
        sp(
          "My suit needs cleaning for a meeting tomorrow.",
          "I will ask the laundry team to collect it at ten, sir.",
          "Một việc, đúng tổ làm, đúng giờ lấy đồ.",
        ),
        sp(
          "Can it be ready by six tomorrow?",
          "I will ask the laundry team about pressing, sir, and call you before noon.",
          "Không hứa thay tổ giặt; hứa việc bạn tự làm: hỏi và gọi lại có mốc.",
          undefined,
          undefined,
          "I will ask the laundry team to collect it at ten, sir.",
        ),
        sp(
          "I think the missing towel charge on my bill is wrong.",
          "I will ask my supervisor to check the missing towel charge with you, madam.",
          "Thẻ tuần 24 + ask … to: giám sát kiểm lại, bạn không tự xoá phí.",
          undefined,
          ["supervisor", "missing", "towel", "charge"],
        ),
        sp(
          "Can my dress come back today?",
          "Yes, madam. I will ask the laundry team for same-day laundry.",
          "Thẻ tuần 25 trong câu nhờ việc của tuần 26.",
          undefined,
          ["same-day", "laundry"],
        ),
      ],
      reading: read(
        `Mr Ruiz says the minibar is almost empty. Quynh does not restock it from her trolley, because the minibar attendant counts every item for the bill. She brings two free bottles of water at once. Then she asks the minibar attendant to restock the rest within an hour. Mr Ruiz wants it before six, so Quynh arranges that. At five, the attendant finishes, and Quynh calls Mr Ruiz. Quynh also notes the request for the evening team, so nobody asks Mr Ruiz again.`,
        [
          {
            q: "Vì sao Quỳnh không tự lấy đồ trên xe đẩy bổ sung minibar?",
            options: [
              "Vì xe đẩy của Quỳnh hôm đó đã hết đồ uống",
              "Vì khách chưa trả tiền minibar hôm trước",
              "Vì nhân viên minibar đếm từng món cho hóa đơn",
            ],
            correct: 2,
            explanation:
              "'the minibar attendant counts every item for the bill' — đúng người làm thì hóa đơn mới đúng.",
          },
          {
            q: "Quỳnh mang gì lên ngay cho khách?",
            options: [
              "Hai chai nước miễn phí",
              "Một khay đồ uống trong minibar",
              "Bảng giá minibar mới",
            ],
            correct: 0,
            explanation:
              "'She brings two free bottles of water at once' — làm ngay phần trong quyền của mình trong lúc chờ.",
          },
          {
            q: "Lúc năm giờ, việc gì xảy ra?",
            options: [
              "Khách gọi xuống phàn nàn lần nữa",
              "Nhân viên minibar làm xong, Quỳnh gọi báo khách",
              "Quỳnh tự bổ sung minibar vì đã quá giờ hẹn với khách",
            ],
            correct: 1,
            explanation:
              "'At five, the attendant finishes, and Quynh calls Mr Ruiz' — xong trước mốc sáu giờ của khách, rồi khép vòng.",
          },
        ],
      ),
      game: [
        game(
          "The minibar is almost empty. Can someone help?",
          "I will ask the minibar attendant to restock it within an hour, sir.",
          "I will ask the minibar attendant restock it within an hour, sir.",
          "Please call the minibar team yourself, sir. Their number is on the phone.",
          undefined,
          "Câu cuối đẩy việc sang khách. Câu đúng nói rõ ai làm và trong bao lâu.",
        ),
        game(
          "I want someone senior to hear about the cleaning.",
          "Of course, madam. I will ask the executive housekeeper to call you.",
          "Of course, madam. I will ask the executive housekeeper call you.",
          "Everyone is busy today, madam. You can tell me.",
          undefined,
          "Câu cuối giữ khách lại khi khách đã xin gặp cấp trên. Câu đúng chuyển lên đúng người.",
        ),
      ],
    }),

    L(26, 3, "Following Up Internally", "Theo dõi việc trong nội bộ", {
      vocabulary: [
        c("Pest control team", "The pest control team is coming at eight."),
        c("Night cleaner", "The night cleaner checks the corridors at midnight."),
        c("Welfare check", "If nobody answers, security does a welfare check.", [
          "/ˈwelfeə tʃek/",
          "Kiểm tra an toàn của khách trong phòng",
          "🩺",
        ]),
      ],
      grammar: [
        g(
          "I tell already.",
          "I have informed the pest control team, and they are coming at eight.",
          "'have informed' báo việc ĐÃ làm, kèm bước tiếp theo.",
          "I have inform the pest control team, and they are coming at eight.",
        ),
        g(
          "Night man do.",
          "I will ask the night cleaner to check the corridor tonight.",
          "'ask + người + to + động từ' — một việc, một người làm.",
          "I will ask the night cleaner checking the corridor tonight.",
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
        risk({
          ...sp(
            "I do not want to sleep in this room tonight.",
            t3c,
            "Đổi phòng do lễ tân quyết — bạn chuyển lời đề nghị, không tự hứa.",
            undefined,
            ["ask", "front", "desk", "another", "room"],
            t3b,
          ),
          alsoAccept: [
            "I cannot move you myself, madam. I will ask the front desk about another room.",
            "I will ask the front desk about another room for you, madam.",
          ],
        }),
        risk({
          ...sp(
            "It is after three. 604 still has the DND sign, and nobody answers the phone.",
            welfare,
            "Biển còn treo quá giờ và không ai nghe máy: không vào một mình. Giám sát và an ninh cùng kiểm tra.",
            "colleague",
            ["ask", "supervisor", "security", "welfare", "check"],
          ),
          alsoAccept: [
            "We will not go in. I will call the supervisor and security for a welfare check.",
            "We will not go in alone. I will call the supervisor and security for a welfare check.",
            "I will call the supervisor and security for a welfare check.",
          ],
        }),
        sp(
          "The corridor outside my room is dirty.",
          "I am sorry, madam. I will ask the night cleaner to clean it tonight.",
          "Ca đêm có người phụ trách — nhờ đúng người, không hứa giờ thay họ.",
        ),
        sp(
          "My bag is at lost property. Can you bring it up?",
          "Under our lost property rule, the front desk returns it after an ID check.",
          "Thẻ tuần 24: một đầu mối trả đồ, có kiểm tra giấy tờ.",
          undefined,
          ["lost", "property", "rule", "front", "desk", "ID", "check"],
        ),
        sp(
          "Nobody brought the ice bucket I asked for.",
          "I am very sorry, madam. I am on my way with the ice bucket now.",
          "Thẻ tuần 25: xin lỗi và nói rõ bạn đang mang tới.",
          undefined,
          ["way", "ice", "bucket"],
        ),
        sp(
          "The spare kettle is not working either.",
          "I am very sorry, sir. I will bring another spare kettle now and report both to engineering.",
          "Thẻ tuần 25: mang ngay ấm khác cho khách, rồi báo kỹ thuật cả hai chiếc hỏng.",
          undefined,
          ["spare", "kettle"],
        ),
      ],
      reading: read(
        `At ten at night, Mrs Bell sees a cockroach in her bathroom. Vinh apologises and calls the pest control team. When she asks if anything has been done, Vinh says: "I have informed them, and they are coming at eight." Mrs Bell does not want to stay in the room. So Vinh asks the front desk about another room, and the front desk moves her to the next floor. Vinh also notes the room number for the pest control team.`,
        [
          {
            q: "Vinh trả lời gì khi khách hỏi đã có ai làm gì chưa?",
            options: [
              "Chưa ai làm gì vì đã quá giờ hành chính",
              "Đã báo đội diệt côn trùng, tám giờ họ tới",
              "Vinh sẽ tự xử lý con gián ngay bây giờ",
            ],
            correct: 1,
            explanation:
              "'I have informed them, and they are coming at eight' — việc đã làm + bước tiếp theo.",
          },
          {
            q: "Ai chuyển khách sang phòng ở tầng khác?",
            options: [
              "Vinh, vì Vinh là người phát hiện",
              "Đội diệt côn trùng, sau khi kiểm tra",
              "Quầy lễ tân",
            ],
            correct: 2,
            explanation:
              "'the front desk moves her to the next floor' — đổi phòng là quyết định của lễ tân.",
          },
          {
            q: "Vì sao Vinh hỏi lễ tân thay vì tự đưa khách sang phòng trống?",
            options: [
              "Vì đổi phòng là việc lễ tân quyết",
              "Vì Vinh không biết phòng nào còn trống",
              "Vì khách muốn nói chuyện với lễ tân",
            ],
            correct: 0,
            explanation:
              "'Vinh asks the front desk about another room' — buồng phòng chuyển lời, lễ tân quyết và làm thủ tục.",
          },
        ],
      ),
      game: [
        game(
          "Has anyone done anything about the cockroach?",
          "Yes, madam. I have informed the pest control team, and they are coming at eight.",
          "Yes, madam. I have informed to the pest control team, and they are coming at eight.",
          "Not yet, madam, but it is only one cockroach, and they are very common in this city.",
          undefined,
          "Câu cuối xem nhẹ chuyện của khách. Câu đúng báo việc đã làm và giờ đội tới.",
        ),
        game(
          "Room 604 has had the DND sign on all day. Nobody answers the phone.",
          "I will call the supervisor and security for a welfare check.",
          "I will call the supervisor and security for welfare check.",
          "Then let us open the door and look inside quickly.",
          "colleague",
          "Câu cuối vào phòng mà không có giám sát và an ninh. Câu đúng gọi đúng người để kiểm tra an toàn cùng nhau.",
        ),
      ],
    }),

    L(26, 4, "Closing the Loop", "Khép vòng xử lý", {
      vocabulary: [
        c("Room inspector", "The room inspector checks every VIP room."),
        c("Follow up", "I will follow up with engineering this afternoon.", [
          "/ˌfɒləʊ ˈʌp/",
          "Theo dõi tiếp (cho đến khi xong)",
          "🔂",
        ]),
        c("Uniform room staff", "The uniform room staff give out clean uniforms."),
        c("Room inspection result", "The room inspection result for 302 is good."),
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
          "Will anyone check that it stays quiet?",
          t4c,
          "Khép vòng bằng việc bạn tự làm: theo dõi với kỹ thuật và tự kiểm lại, có giờ.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "My uniform has coffee on it, and my shift starts in ten minutes.",
          "The uniform room staff can give you a clean one now. Go before your shift.",
          "Nói với đồng nghiệp: ngắn, rõ đi đâu.",
          "colleague",
        ),
        sp(
          "Is room 302 ready for the VIP guest?",
          "Yes. The room inspection result is good, and the room is ready.",
          "Báo cấp trên: kết quả + ai đã kiểm tra.",
          "manager",
        ),
        sp(
          "Did 512 get the ironing board it asked for?",
          "Yes. I took the ironing board up at nine, and I noted it.",
          "Thẻ tuần 25 trong một câu báo cáo: việc đã làm + giờ.",
          "manager",
          ["ironing", "board"],
        ),
        sp(
          "Who decides the charge for the torn sheet in 708?",
          "The duty manager will decide on the damaged linen charge. I took photos of the sheet.",
          "Thẻ tuần 24: bạn báo cáo có bằng chứng, người quyết là quản lý trực.",
          "manager",
          ["duty", "manager", "decide", "damaged", "linen", "charge"],
        ),
        sp(
          "Did you change the shower curtain in 410?",
          "Yes. I changed the shower curtain, and the room inspector checked it.",
          "Thẻ tuần 25 trong một câu báo cáo: việc đã làm + ai đã kiểm.",
          "manager",
          ["shower", "curtain"],
        ),
      ],
      reading: read(
        `The air conditioner in Room 418 was loud all night. In the morning, the engineering team fixed it. Ha did not just tell the guest it was done: she switched it on and checked it herself. The guest said the night was very bad, so Ha told the duty manager. Then Ha followed up with engineering, and at six she checked the room again. The guest was glad that someone came back, and Ha wrote the result in the shift log.`,
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
              "Vì máy lạnh có thể hỏng lại",
              "Vì khách đã có một đêm rất tệ",
              "Vì tổ kỹ thuật làm việc chậm",
            ],
            correct: 1,
            explanation:
              "'the night was very bad' — việc đã sửa, nhưng trải nghiệm của khách cần người có quyền xem xét.",
          },
          {
            q: "Việc cuối cùng Hà làm là gì?",
            options: [
              "Báo khách là máy đã được sửa",
              "Gọi quản lý trực lần thứ hai",
              "Kiểm tra lại phòng lúc sáu giờ",
            ],
            correct: 2,
            explanation:
              "'at six she checked the room again' — theo dõi tiếp cho đến khi chắc chắn việc đã xong hẳn.",
          },
        ],
      ),
      game: [
        game(
          "Is the air conditioner working again now?",
          "Yes, sir. The engineering team has fixed it, and I checked it myself.",
          "Yes, sir. The engineering team has fixed it, and I check it myself.",
          "I think so, sir. The engineers told me they finished an hour ago.",
          undefined,
          "Câu cuối chỉ chuyển lời — chưa ai kiểm lại. Câu đúng nói ai đã sửa và bạn đã tự kiểm tra.",
        ),
        game(
          "Is 302 ready for the VIP arrival?",
          "Yes. The room inspector has checked it, and it is ready.",
          "Yes. The room inspector have checked it, and it is ready.",
          "I think so. I cleaned it fast, so nobody has checked it.",
          "manager",
          "Câu cuối báo 'chắc là xong' khi chưa ai kiểm — phòng VIP không được đoán. Câu đúng nói rõ ai đã kiểm tra.",
        ),
      ],
    }),
  ];
}

// ── Week 27 — Receiving a complaint ─────────────────────────────────────
function week27(): LessonContent[] {
  const t1a = "I am very sorry, madam. I will make your bed now.";
  const t1b = "Thank you for telling me. I will replace that towel too.";
  const t1c = "I apologise for the inconvenience, madam. I will report it to my supervisor today.";
  const t1d = "Of course, madam. I will ask my supervisor to take your complaint now.";
  const t2a = "I am sorry you found hair in the bathtub, madam. I will re-clean it now.";
  const t2b = "I am going to clean the whole bathroom again and ask my supervisor to check it.";
  const t2c = "I understand you are disappointed, madam. Thank you for your patience.";
  const t3a = "I am sorry. When did you first notice it, sir?";
  const t3b = "Thank you. I will clean it now and tell my supervisor about it.";
  const t3c = "I will ask my supervisor to check them, sir. Your carpet comes first.";
  const t4a = "Please be careful, madam. I will bring a wet floor sign now.";
  const t4b = "Please do not help her up. I am calling the duty manager and first aid.";
  const t4c = "Yes, madam. I will stay with you until they arrive.";
  const spill = "Take the spill kit first. I will tell the supervisor.";
  return [
    L(27, 1, "Listen First", "Lắng nghe trước", {
      vocabulary: [
        c("Concern", "Thank you for telling me about your concern."),
        c("Apologise", "I apologise for the delay, madam."),
        c("Inconvenience", "I apologise for the inconvenience, sir.", [
          "/ˌɪnkənˈviːniəns/",
          "Sự bất tiện",
          "😣",
        ]),
        c("Complaint", "My supervisor will take your complaint.", [
          "/kəmˈpleɪnt/",
          "Lời phàn nàn, khiếu nại",
          "📝",
        ]),
      ],
      grammar: [
        g(
          "Not my fault.",
          "I am very sorry, madam. I will make your bed now.",
          "Xin lỗi về điều khách gặp + hành động ngay. Không đổ lỗi cho ca trước hay đồng nghiệp.",
          "I am very sorry, madam. I will made your bed now.",
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
          "It is three o'clock and my bed is still not made!",
          t1a,
          "Lắng nghe hết, xin lỗi về điều khách gặp, rồi làm ngay.",
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
          "Khách đã báo nhiều lần — xin lỗi về sự bất tiện và đưa lên cấp trên, đừng hứa suông lần ba.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "I want to make a complaint.",
          t1d,
          "Khách muốn khiếu nại: không can, không giữ lại — mời đúng người nhận.",
          undefined,
          undefined,
          t1c,
        ),
        sp(
          "I have a concern about the cleaning in my room.",
          "Thank you for telling me about your concern, madam. What did you find?",
          "Mời khách nói tiếp bằng một câu hỏi mở. Lắng nghe trước khi xử lý.",
        ),
        sp(
          "There is a deep cleaning fee on my bill, but I did not smoke!",
          "I apologise for the inconvenience, sir. I will ask the front desk to check the deep cleaning fee.",
          "Thẻ tuần 24 trong lời xin lỗi: không tranh luận, chuyển đúng người kiểm hóa đơn.",
          undefined,
          ["deep", "cleaning", "fee"],
        ),
        sp(
          "Can I speak to the duty manager about this?",
          "Of course, madam. I will transfer your call to the duty manager now.",
          "Thẻ tuần 26: khách xin gặp đúng người thì chuyển máy ngay, không giữ khách lại.",
          undefined,
          ["transfer"],
        ),
        sp(
          "Nobody has called me back about my complaint.",
          "I apologise, madam. I will ask the executive housekeeper to call you today.",
          "Thẻ tuần 26: lời hứa gọi lại không được giữ thì đưa lên cấp cao hơn.",
          undefined,
          ["executive", "housekeeper"],
        ),
      ],
      reading: read(
        `At three o'clock, Mrs Ito finds her bed still not made and a stained towel in the bathroom. She has already told two staff. Trang listens without stopping her. Then she apologises for the inconvenience, makes the bed and replaces the towel. Trang does not say whose shift it was. Mrs Ito wants to make a complaint, so Trang asks her supervisor to take it. The supervisor calls Mrs Ito within the hour and thanks her.`,
        [
          {
            q: "Trang làm gì đầu tiên khi khách phàn nàn?",
            options: [
              "Giải thích vì sao ca trước bị trễ",
              "Nghe khách nói hết, không ngắt lời",
              "Hỏi khách đã báo với những ai",
            ],
            correct: 1,
            explanation:
              "'Trang listens without stopping her' — bước đầu của tiếp nhận phàn nàn là lắng nghe trọn vẹn.",
          },
          {
            q: "Vì sao Trang mời giám sát tới?",
            options: [
              "Vì Trang không có khăn sạch trên xe đẩy",
              "Vì khách đòi được giảm giá tiền phòng",
              "Vì khách muốn khiếu nại chính thức",
            ],
            correct: 2,
            explanation:
              "'Mrs Ito wants to make a complaint, so Trang asks her supervisor to take it' — khiếu nại đi đúng người nhận.",
          },
          {
            q: "Vì sao Trang không nói đó là ca của ai?",
            options: [
              "Vì đổ lỗi cho đồng nghiệp không giúp gì khách",
              "Vì Trang không biết ca nào đã làm phòng đó hôm nay",
              "Vì khách đã biết tên người dọn phòng",
            ],
            correct: 0,
            explanation:
              "'Trang does not say whose shift it was' — khách cần giường được làm và lời xin lỗi, không cần biết lỗi của ai.",
          },
        ],
      ),
      game: [
        game(
          "I have already told two of your staff about this!",
          "I apologise for the inconvenience, madam. I will report it to my supervisor today.",
          "I apologise for the inconvenience, madam. I will reports it to my supervisor today.",
          "That is strange, madam. Nobody told me anything.",
          undefined,
          "Câu cuối biến lời phàn nàn thành chuyện nội bộ. Câu đúng xin lỗi và đưa lên người có trách nhiệm.",
        ),
        game(
          "Excuse me, can I tell you about a problem in my room?",
          "Of course, madam. Please tell me what happened.",
          "Of course, madam. Please tell me what happen.",
          "Sorry, madam, I am very busy now. Please call the front desk.",
          undefined,
          "Câu cuối đẩy khách đi đúng lúc khách cần được nghe. Câu đúng mời khách nói trước.",
        ),
      ],
    }),

    L(27, 2, "Sorry Is Not a Verdict", "Xin lỗi chưa phải là nhận lỗi", {
      vocabulary: [
        c("Disappointed", "I understand you are disappointed, madam."),
        c("Damp smell", "I will report the damp smell to engineering."),
        c("Mould", "There is mould on the bathroom ceiling.", ["/məʊld/", "Nấm mốc", "🦠"]),
        c("Re-clean", "I will re-clean the bathroom now.", [
          "/ˌriːˈkliːn/",
          "Dọn lại, làm sạch lại",
          "🧽",
        ]),
      ],
      grammar: [
        g(
          "Our mistake.",
          "I am sorry you found hair in the bathtub, madam. I will re-clean it now.",
          "Xin lỗi về điều khách gặp phải. Chưa kiểm tra thì chưa kết luận lỗi của ai.",
          "I am sorry you finded hair in the bathtub, madam. I will re-clean it now.",
        ),
        g(
          "You disappointed? Sorry.",
          "I understand you are disappointed, sir. I will report the damp smell today.",
          "'disappointed' = người cảm thấy thất vọng; 'disappointing' = thứ gây thất vọng.",
          "I understand you are disappointing, sir. I will report the damp smell today.",
        ),
      ],
      speaking: [
        sp(
          "There is hair in the bathtub. I paid a lot for this room.",
          t2a,
          "Xin lỗi về trải nghiệm + làm ngay. KHÔNG nói kiểu 'lỗi của chúng tôi' khi chưa ai kiểm tra.",
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
          "I am sorry, sir. I will report the damp smell to engineering now.",
          "Mùi ẩm có thể do kỹ thuật — báo đúng bộ phận.",
        ),
        sp(
          "There is black mould on the bathroom ceiling.",
          "I am sorry, madam. I will report the mould to engineering straight away.",
          "Nấm mốc là việc của kỹ thuật — báo ngay, không tự lau cho qua.",
        ),
        sp(
          "Your noisy vacuum woke me up at eight!",
          "I apologise, madam. I will ask my supervisor to change the vacuuming time.",
          "Lịch hút bụi do giám sát sắp xếp — bạn đề nghị, không tự đổi lịch.",
        ),
        sp(
          "How do I know the bathroom is really clean now?",
          "The room inspector will check it after I re-clean it, madam.",
          "Thẻ tuần 26: có người kiểm tra độc lập, không phải lời hứa suông của bạn.",
          undefined,
          ["room", "inspector"],
        ),
      ],
      reading: read(
        `Mrs Grant finds hair in the bathtub. Duc says: "I am sorry you found hair in the bathtub, madam." He does not say whose mistake it was, because nobody has checked yet. Mrs Grant is still disappointed, and Duc thanks her for her patience. Duc re-cleans the bathroom, and his supervisor inspects it. The supervisor finds that the bath was not checked after cleaning. Now every bath on the floor gets a final check before the guest arrives.`,
        [
          {
            q: "Vì sao Đức không nói 'It was our mistake'?",
            options: [
              "Vì Đức đã biết đó là lỗi của ca sáng",
              "Vì khách không hỏi đó là lỗi của ai",
              "Vì lúc đó chưa ai kiểm tra nguyên nhân",
            ],
            correct: 2,
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
              "'the bath was not checked after cleaning' — kiểm tra cho ra nguyên nhân thật.",
          },
          {
            q: "Sau chuyện này, điều gì thay đổi trên tầng?",
            options: [
              "Khách được giảm giá khi thấy tóc",
              "Mọi bồn tắm được kiểm tra lần cuối",
              "Đức phải dọn lại mọi phòng tắm",
            ],
            correct: 1,
            explanation:
              "'Now every bath on the floor gets a final check' — tìm đúng nguyên nhân thì sửa được quy trình, không chỉ một phòng.",
          },
        ],
      ),
      game: [
        game(
          "There is hair in my bathtub. This is disgusting.",
          "I am sorry you found hair in the bathtub, madam. I will re-clean it now.",
          "I am sorry you finded hair in the bathtub, madam. I will re-clean it now.",
          "It was our mistake, madam. The cleaner was lazy.",
          undefined,
          "Câu cuối kết luận lỗi và đổ cho đồng nghiệp trước mặt khách. Câu đúng xin lỗi về điều khách gặp và làm ngay.",
        ),
        game(
          "There is black mould on the shower ceiling!",
          "I am sorry, madam. I will report the mould to engineering straight away.",
          "I am sorry, madam. I will reported the mould to engineering straight away.",
          "That is normal in our hot weather, madam. Just open the window.",
          undefined,
          "Câu cuối coi nấm mốc là chuyện bình thường và để khách tự lo. Câu đúng xin lỗi và báo ngay cho kỹ thuật.",
        ),
      ],
    }),

    L(27, 3, "Getting the Facts", "Hỏi cho rõ sự việc", {
      vocabulary: [
        c("Notice", "When did you first notice the stain?", [
          "/ˈnəʊtɪs/",
          "Nhận thấy, để ý thấy",
          "👀",
        ]),
        c("Shampoo dispenser", "The shampoo dispenser is on the shower wall.", [
          "/ʃæmˈpuː dɪˌspensə/",
          "Bình đựng dầu gội gắn tường",
          "🧴",
        ]),
        c("Cobweb", "There is a cobweb above the wardrobe.", ["/ˈkɒbweb/", "Mạng nhện", "🕸️"]),
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
          "I am sorry the shampoo dispenser was empty. I will refill it now.",
          "'the shampoo dispenser' là một vật: 'was', không phải 'were'.",
          "I am sorry the shampoo dispenser were empty. I will refill it now.",
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
          "Will you check the other rooms too?",
          t3c,
          "Việc kiểm các phòng khác là của giám sát; việc của bạn là phòng khách đang ở.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "My room was cleaned at five in the afternoon. That is too late.",
          "I am sorry, madam. What time suits you tomorrow?",
          "Xin lỗi + hỏi khách giờ mong muốn, để không lặp lại.",
        ),
        sp(
          "After eleven, please. I sleep late.",
          "Of course, madam. I will arrange your cleaning for eleven o'clock.",
          "Ghi lại đúng giờ khách chọn để ca sau làm đúng.",
          undefined,
          undefined,
          "I am sorry, madam. What time suits you tomorrow?",
        ),
        sp(
          "The minibar charge on my bill is wrong.",
          "I am sorry, sir. Which item in the minibar charge is wrong?",
          "Thẻ tuần 24: hỏi điều khách chưa nói — món nào sai — trước khi chuyển lễ tân.",
          undefined,
          ["minibar", "charge"],
        ),
        sp(
          "The shampoo dispenser in the shower is empty.",
          "I am sorry, sir. I will refill the shampoo dispenser within five minutes.",
          "Việc nhỏ — xin lỗi, mốc giờ ngắn.",
        ),
        sp(
          "There is a cobweb above the wardrobe.",
          "Thank you for telling me, madam. I will take the cobweb down now.",
          "Cảm ơn khách đã chỉ ra, rồi làm ngay.",
        ),
        sp(
          "I hung the make-up room sign at nine, but nobody came.",
          "I am sorry, madam. I will clean your room now and ask why the make-up room sign was missed.",
          "Thẻ tuần 25: xin lỗi, làm ngay, và tìm hiểu vì sao tấm biển bị bỏ sót.",
          undefined,
          ["make-up", "room", "sign"],
        ),
      ],
      reading: read(
        `Mr Ali says the carpet near the window is dirty. Khanh asks: "When did you first notice it, sir?" Mr Ali says: "This morning, right after the cleaning." That fact matters, because it shows the morning shift missed the stain. Khanh cleans it and tells her supervisor. The supervisor checks the other rooms from that shift and finds two more stains. Khanh thanks Mr Ali for the details. Then the supervisor shares the result with the morning team.`,
        [
          {
            q: "Vì sao câu trả lời 'ngay sau khi dọn' lại quan trọng?",
            options: [
              "Nó cho biết khách đã làm bẩn tấm thảm",
              "Nó cho biết ca dọn buổi sáng đã bỏ sót",
              "Nó cho biết cần thay hẳn tấm thảm mới",
            ],
            correct: 1,
            explanation:
              "'it shows the morning shift missed the stain' — hỏi đúng câu thì tìm ra chỗ cần sửa trong quy trình.",
          },
          {
            q: "Giám sát làm gì sau khi được báo?",
            options: [
              "Kiểm tra các phòng khác của ca sáng đó",
              "Gọi điện xin lỗi khách thay cho Khánh",
              "Cho khách đổi sang phòng ở tầng khác",
            ],
            correct: 0,
            explanation:
              "'checks the other rooms from that shift and finds two more stains' — một lỗi phát hiện được có thể không phải lỗi duy nhất.",
          },
          {
            q: "Nếu Khánh không hỏi thời điểm, điều gì có thể xảy ra?",
            options: [
              "Khách sẽ được đổi sang phòng khác",
              "Khánh sẽ phải dọn lại cả tầng trong buổi chiều hôm đó",
              "Hai vết bẩn ở phòng khác có thể không ai thấy",
            ],
            correct: 2,
            explanation:
              "Câu hỏi 'When did you first notice it' dẫn tới việc kiểm ca sáng — và 'finds two more stains'.",
          },
        ],
      ),
      game: [
        game(
          "The carpet is dirty. It started last night and nobody helped.",
          "I am sorry, madam. Which part of the carpet is dirty?",
          "I am sorry, madam. Which part of the carpet are dirty?",
          "Could you tell me when the problem with the carpet started, madam?",
          undefined,
          "Câu cuối hỏi lại điều khách VỪA nói (tối qua). Câu đúng hỏi điều khách chưa nói: chỗ nào bẩn.",
        ),
        game(
          "There is no shampoo in the shower.",
          "I am sorry, sir. I will refill the shampoo dispenser within five minutes.",
          "I am sorry, sir. I will refills the shampoo dispenser within five minutes.",
          "Guests often use a lot of shampoo here, sir, so it runs out quickly every day.",
          undefined,
          "Câu cuối ngầm trách khách dùng nhiều. Câu đúng xin lỗi và làm ngay, có mốc giờ.",
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
        c("Body fluid", "Use the spill kit for any body fluid.", [
          "/ˌbɒdi ˈfluːɪd/",
          "Dịch cơ thể (máu, chất nôn…)",
          "🩸",
        ]),
        c("Spill kit", "The spill kit is in the linen room.", [
          "/ˈspɪl kɪt/",
          "Bộ dụng cụ xử lý chất bẩn tràn đổ",
          "🧰",
        ]),
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
        risk({
          ...sp(
            "The shower drain is blocked and the bathroom floor is all wet.",
            t4a,
            "AN TOÀN TRƯỚC: cảnh báo, đặt biển sàn ướt, rồi mới gọi sửa.",
            undefined,
            ["careful", "wet", "floor", "sign"],
          ),
          alsoAccept: [
            "Please be careful, madam, the floor is wet. I will put out a wet floor sign now.",
            "I will bring a wet floor sign now, madam. Please be careful.",
            "Careful, madam, the floor is wet. I will put the wet floor sign out now.",
          ],
        }),
        risk({
          ...sp(
            "Too late. My mother slipped and hurt her arm.",
            t4b,
            "Có người bị thương: không di chuyển người đó, gọi quản lý trực và sơ cứu NGAY.",
            undefined,
            ["help", "up", "calling", "duty", "manager", "first", "aid"],
            t4a,
          ),
          alsoAccept: [
            "Please do not move her. I am calling the duty manager and first aid now.",
            "I am calling first aid and the duty manager. Please do not move her.",
          ],
        }),
        sp(
          "Will someone come quickly?",
          t4c,
          "Ở lại với khách cho tới khi người có chuyên môn tới.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "The water is not going down in the shower.",
          "It is a blocked shower drain, sir. I will ask the engineering team to clear it now.",
          "Gọi đúng tên sự cố, rồi chuyển đúng bộ phận.",
        ),
        risk({
          ...sp(
            "There is blood on the sheets in 305.",
            spill,
            "Dịch cơ thể: lấy bộ xử lý tràn đổ (có găng tay bên trong) TRƯỚC, rồi báo giám sát. Không dùng tay trần.",
            "colleague",
            ["take", "spill", "kit", "first", "tell", "supervisor"],
          ),
          alsoAccept: ["Take the spill kit first and wear the gloves. I will tell the supervisor."],
        }),
        sp(
          "What is the spill kit for?",
          "It is for any body fluid, like blood. Always wear the gloves inside it.",
          "Nói rõ công dụng: bộ xử lý tràn đổ dùng cho dịch cơ thể, luôn đeo găng có sẵn trong bộ.",
          "colleague",
        ),
        sp(
          "It is late, and the corridor floor outside my room is wet.",
          "Please be careful, madam. I will ask the night cleaner to dry it now.",
          "Thẻ tuần 26: cảnh báo trước, rồi nhờ đúng người của ca đêm.",
          undefined,
          ["night", "cleaner"],
        ),
        sp(
          "The hairdryer does not work.",
          "I am sorry, madam. I will bring a new hairdryer within ten minutes.",
          "Xin lỗi + thay thế + mốc giờ.",
        ),
        sp(
          "The bath mat is soaking wet. I nearly slipped.",
          "Please be careful, madam. I will replace the bath mat straight away.",
          "Thẻ tuần 25 trong một lời cảnh báo an toàn.",
          undefined,
          ["bath", "mat"],
        ),
      ],
      reading: read(
        `In Room 220 the shower drain is blocked and the bathroom floor is wet. Before anything else, Son puts the wet floor sign out and warns the guest. But the guest's mother has already slipped. Son does not move her. He calls the duty manager and first aid, and stays with the family until they arrive. The duty manager writes an incident report with Son. Later, Son tells engineering about the blocked shower drain, and they clear it.`,
        [
          {
            q: "Sơn làm gì TRƯỚC tiên?",
            options: [
              "Lau khô sàn rồi mới gọi tổ kỹ thuật",
              "Đặt biển sàn ướt và cảnh báo khách",
              "Hỏi khách đã dùng vòi sen bao lâu",
            ],
            correct: 1,
            explanation:
              "'Before anything else, Son puts the wet floor sign out' — an toàn trước, sửa sau.",
          },
          {
            q: "Vì sao Sơn không đỡ người mẹ đứng dậy?",
            options: [
              "Vì di chuyển có thể làm nặng thêm",
              "Vì Sơn đang bận đặt biển cảnh báo ngoài cửa",
              "Vì người mẹ nói không muốn ai đỡ mình dậy",
            ],
            correct: 0,
            explanation:
              "'Son does not move her' — di chuyển người bị thương có thể làm nặng thêm. Gọi sơ cứu và quản lý trực.",
          },
          {
            q: "Việc cuối cùng trong bài là gì?",
            options: [
              "Quản lý trực xin lỗi gia đình khách",
              "Sơn đổi phòng cho gia đình khách",
              "Sơn báo kỹ thuật về cống thoát nước bị tắc",
            ],
            correct: 2,
            explanation:
              "'Later, Son tells engineering about the blocked shower drain' — người an toàn trước, sửa chữa sau.",
          },
        ],
      ),
      game: [
        game(
          "My mother slipped on the wet floor and hurt her arm!",
          t4b,
          "Please do not helping her up. I am calling the duty manager and first aid.",
          "Let me help her up and take her to the bed, madam.",
          undefined,
          "Câu cuối nghe tận tình nhưng di chuyển người bị thương. Câu đúng giữ nguyên tư thế và gọi người có chuyên môn ngay.",
        ),
        game(
          "Room 412 has vomit on the carpet. Can you help me?",
          spill,
          "Take the spill kit first. I will tells the supervisor.",
          "Sure. I will clean it with my normal cloth. It is faster.",
          "colleague",
          "Câu cuối dùng giẻ thường cho dịch cơ thể — nguy hiểm cho bạn và cho phòng sau. Câu đúng: bộ xử lý tràn đổ (có găng tay) trước, rồi báo giám sát.",
        ),
      ],
    }),
  ];
}

// ── Week 28 — Offering a solution you are allowed to offer ──────────────
function week28(): LessonContent[] {
  const t1a = "I am sorry, madam. If you like, I can re-clean the bathroom now.";
  const t1b = "Then I will come back in one hour, after your shower.";
  const t1c = "Thank you, madam. I will also bring a replacement towel.";
  const t1d = "If it happens again, please call me. My supervisor will check it too.";
  const t2a = "I am sorry, madam. I can spot clean it now, or deep clean it after six.";
  const t2b = "I understand. I will ask the front desk if they can move you to another room.";
  const t2c = "I am sorry, I cannot move you. The front desk will call you about another room.";
  const t3a = "I am sorry, sir. I will air out the room now and check back in one hour.";
  const t3b = "If it smells again, please call me. I will tell my supervisor straight away.";
  const t3c = "Then my supervisor can ask the front desk about another room for you.";
  const t4a = "I am sorry, I cannot offer a refund. I will ask the duty manager to call you.";
  const t4b = "If you like, we can clean while you are out, with a quieter vacuum.";
  const t4c = "Thank you, sir. We will finish your room before nine.";
  const free = "I cannot offer it free of charge, madam. I will ask my supervisor.";
  const harass = "That is inappropriate, sir. I am going now, and I will tell my supervisor.";
  return [
    L(28, 1, "If You Like, I Can…", "Nếu quý khách muốn, tôi có thể…", {
      vocabulary: [
        c("Replacement", "I will bring a replacement towel with me.", [
          "/rɪˈpleɪsmənt/",
          "Đồ thay thế",
          "🔄",
        ]),
        c("Dehumidifier", "A dehumidifier makes a damp room drier.", [
          "/ˌdiːhjuːˈmɪdɪfaɪə/",
          "Máy hút ẩm",
          "💧",
        ]),
        c("Air out", "I will air out the room for one hour.", [
          "/ˌeər ˈaʊt/",
          "Làm thoáng khí (mở cho gió lùa)",
          "🌬️",
        ]),
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
          "The bathroom is still not clean.",
          t1a,
          "Khung của tuần: If you like, I can + việc bạn làm được.",
        ),
        sp(
          "Now? I am about to take a shower.",
          t1b,
          "Khách đã nói điều mình muốn — làm theo, không hỏi lại kiểu 'nếu quý khách muốn'.",
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
          "And if it is still not clean after that?",
          t1d,
          "Câu điều kiện thứ hai của tuần: If it happens again + việc khách làm + người kiểm tra.",
          undefined,
          undefined,
          t1c,
        ),
        sp(
          "The shampoo dispenser is empty again.",
          "I am sorry, madam. If you like, I can refill the shampoo dispenser now.",
          "Thẻ tuần 27 trong lời đề nghị có điều kiện.",
          undefined,
          ["shampoo", "dispenser"],
        ),
        sp(
          "There is a cobweb in the corner again.",
          "Sorry, madam, I will take it down now. If you notice another cobweb, please call me.",
          "Thẻ tuần 27 + câu điều kiện: làm ngay, rồi hẹn khách báo nếu còn.",
          undefined,
          ["notice", "cobweb"],
        ),
        sp(
          "The bed sheets smell of smoke.",
          "I am sorry. If you like, I can change the bed sheets within twenty minutes.",
          "Xin lỗi + đề nghị có điều kiện + mốc giờ.",
        ),
        sp(
          "The room feels very damp.",
          "If you like, I can bring a dehumidifier, sir. It makes the air drier.",
          "Đề nghị một món trong quyền của buồng phòng, kèm lợi ích so sánh.",
        ),
        sp(
          "Is it noisy?",
          "It is quieter than the air conditioner, sir. You can sleep with it on.",
          "Thẻ tuần 23: trả lời bằng so sánh hơn.",
          undefined,
          undefined,
          "If you like, I can bring a dehumidifier, sir. It makes the air drier.",
        ),
        sp(
          "It smells of cigarettes in here.",
          "I am sorry, sir. If you like, I can air out the room for one hour.",
          "Đề nghị có điều kiện + thời lượng cụ thể.",
        ),
      ],
      reading: read(
        `Ms Rossi says the bathroom is still not clean. Mai offers: "If you like, I can re-clean the bathroom now." Ms Rossi is about to shower, so Mai comes back one hour later. She re-cleans the bathroom and brings a replacement towel. The room also feels damp, so Mai brings a dehumidifier. Mai tells Ms Rossi: "If it happens again, please call me." That evening the supervisor inspects the bathroom, and it passes the check.`,
        [
          {
            q: "Vì sao Mai không dọn lại phòng tắm ngay lúc đó?",
            options: [
              "Vì Mai phải xin phép giám sát trước",
              "Vì xe đẩy của Mai không còn khăn sạch",
              "Vì khách sắp tắm",
            ],
            correct: 2,
            explanation:
              "'Ms Rossi is about to shower, so Mai comes back one hour later' — giờ làm theo khách.",
          },
          {
            q: "Mai mang thêm những gì?",
            options: [
              "Khăn thay thế và máy hút ẩm",
              "Ga giường mới và dầu gội mới",
              "Bộ đồ dùng không mùi và quạt",
            ],
            correct: 0,
            explanation:
              "'brings a replacement towel' và 'brings a dehumidifier' — nghĩ trước thứ khách sẽ cần.",
          },
          {
            q: "Câu 'If it happens again, please call me' cho khách biết điều gì?",
            options: [
              "Lỗi này chắc chắn sẽ không lặp lại",
              "Khách có một người cụ thể để gọi nếu còn lỗi",
              "Khách sẽ được giảm giá phòng nếu lỗi còn lặp lại",
            ],
            correct: 1,
            explanation:
              "Mai không hứa điều mình không chắc; Mai cho khách một bước cụ thể nếu vấn đề quay lại.",
          },
        ],
      ),
      game: [
        game(
          "Look at this bathroom. It is still not clean.",
          "I am sorry, madam. If you like, I can re-clean it now.",
          "I am sorry, madam. If you like, I can re-cleaning it now.",
          "It was cleaned this morning, madam. It looks fine to me.",
          undefined,
          "Câu cuối phủ nhận điều khách thấy. Câu đúng xin lỗi và đề nghị một giải pháp khách có thể chọn.",
        ),
        game(
          "Everything in this room feels wet and sticky.",
          "If you like, I can bring a dehumidifier, sir. It makes the air drier.",
          "If you like, I can bringing a dehumidifier, sir. It makes the air drier.",
          "That is just the weather in this city, sir. Everyone feels it in the rainy season.",
          undefined,
          "Câu cuối nói đúng nhưng bỏ mặc khách. Câu đúng đề nghị một món trong quyền của bạn, kèm lợi ích.",
        ),
      ],
    }),

    L(28, 2, "Two Choices — and Who Decides", "Hai lựa chọn — và ai quyết", {
      vocabulary: [
        c("Option", "There are two options for the carpet."),
        c("Either", "Either option is fine, madam."),
        c("Spot clean", "I can spot clean the stain now.", [
          "/ˈspɒt kliːn/",
          "Làm sạch tại chỗ (một vết)",
          "🎯",
        ]),
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
          "I will ask the front desk if they can move you to another room.",
          "Đổi phòng do lễ tân quyết: hỏi lễ tân 'if they can…', không tự hứa.",
          "I will ask the front desk if they can moving you to another room.",
        ),
      ],
      speaking: [
        sp(
          "The carpet smells of wine. What can you do?",
          t2a,
          "Hai lựa chọn trong quyền của buồng phòng, kèm thời điểm hợp lý.",
        ),
        sp(
          "I do not want to stay with this smell at all.",
          t2b,
          "Khách muốn đổi phòng — chuyển đề nghị cho lễ tân, không tự hứa.",
          undefined,
          undefined,
          t2a,
        ),
        risk({
          ...sp(
            "Can you not just move me yourself?",
            t2c,
            "Câu thẩm quyền: đổi phòng là quyết định của lễ tân. Nói rõ ai gọi lại, không hứa giờ thay họ.",
            undefined,
            ["move", "front", "desk", "call", "another", "room"],
            t2b,
          ),
          alsoAccept: [
            "I am sorry, I cannot move you myself. The front desk will call you soon.",
            "I cannot decide room moves, madam. The front desk will call you about another room.",
          ],
        }),
        sp(
          "Which is better for me, now or after six?",
          "Either option is fine, madam. If you go out for dinner, after six is easier.",
          "Giúp khách chọn bằng một lý do cụ thể.",
        ),
        sp(
          "What if the shower drain blocks again?",
          "If you have a blocked shower drain again, please call me straight away.",
          "Thẻ tuần 27 trong câu điều kiện If … again.",
          undefined,
          ["blocked", "shower", "drain"],
        ),
        sp(
          "What if the mould comes back after the repair?",
          "If the mould comes back, please call me, and I will report it at once.",
          "Thẻ tuần 27 trong câu điều kiện của tuần 28.",
          undefined,
          ["mould"],
        ),
        sp(
          "There is a small mark on the sofa too.",
          "If you like, I can spot clean the sofa as well, madam.",
          "Đề nghị có điều kiện, cùng một việc trong quyền của bạn.",
        ),
        sp(
          "Can I choose when you clean?",
          "Of course. You can choose either option: before ten or after two.",
          "Đưa hai lựa chọn rõ ràng để khách quyết.",
        ),
      ],
      reading: read(
        `Room 507's carpet smells of wine. Hung offers two options: a spot clean now, or a deep clean after six, when the guest is out. The guest does not want to stay with the smell, so Hung asks the front desk if they can move her to another room. When she asks him to move her himself, Hung explains that the front desk decides room moves. The front desk calls her ten minutes later with another room.`,
        [
          {
            q: "Hưng đưa ra những lựa chọn nào về tấm thảm?",
            options: [
              "Làm sạch vết ngay, hoặc giặt sâu sau sáu giờ",
              "Thay thảm mới, hoặc cho khách giảm giá",
              "Xịt thơm phòng, hoặc mở cửa sổ cả ngày",
            ],
            correct: 0,
            explanation:
              "'a spot clean now, or a deep clean after six' — hai lựa chọn đều trong quyền của buồng phòng.",
          },
          {
            q: "Ai quyết định cho khách đổi phòng?",
            options: ["Hưng, người đang xử lý", "Quầy lễ tân", "Tổ giặt thảm của khách sạn"],
            correct: 1,
            explanation:
              "'the front desk decides room moves' — buồng phòng chuyển lời, lễ tân quyết.",
          },
          {
            q: "Vì sao giặt sâu để sau sáu giờ?",
            options: [
              "Vì máy giặt thảm chỉ chạy buổi tối",
              "Vì lễ tân yêu cầu như vậy",
              "Vì lúc đó khách ra ngoài, phòng trống",
            ],
            correct: 2,
            explanation:
              "'after six, when the guest is out' — việc ồn và lâu thì làm khi khách không ở trong phòng.",
          },
        ],
      ),
      game: [
        game(
          "Just move me to another room yourself, please.",
          "I cannot decide room moves, madam. The front desk will call you about another room.",
          "I cannot decide room moves, madam. The front desk will calls you about another room.",
          "Of course, madam. Room 509 is empty right now, so I will take you there.",
          undefined,
          "Câu cuối tự quyết đổi phòng — việc của lễ tân. Câu đúng nói rõ ai quyết và ai sẽ gọi lại.",
        ),
        game(
          "When can you clean the stain on the carpet?",
          "I can spot clean it now, madam, or deep clean it after six.",
          "I can spot cleaning it now, madam, or deep clean it after six.",
          "Stains like that never come out, madam, I am afraid.",
          undefined,
          "Câu cuối bỏ cuộc trước khi thử. Câu đúng đưa hai lựa chọn trong quyền của bạn để khách chọn.",
        ),
      ],
    }),

    L(28, 3, "Checking It Worked", "Kiểm tra giải pháp có hiệu quả", {
      vocabulary: [
        c("Unscented", "I can bring an unscented set of toiletries.", [
          "/ʌnˈsentɪd/",
          "Không mùi, không hương liệu",
          "🚫",
        ]),
        c("Rewash", "If you like, we will rewash the towels tonight.", [
          "/ˌriːˈwɒʃ/",
          "Giặt lại",
          "🌀",
        ]),
        c("Check back", "I will check back in one hour.", [
          "/ˌtʃek ˈbæk/",
          "Quay lại kiểm tra",
          "↩️",
        ]),
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
          "If the towels still smell, we will rewash them tonight.",
          "'the towels' số nhiều: 'smell', không 'smells'.",
          "If the towels still smells, we will rewash them tonight.",
        ),
      ],
      speaking: [
        sp(
          "The room still smells of paint.",
          t3a,
          "Giải pháp + thời điểm bạn tự quay lại kiểm tra.",
        ),
        sp(
          "And if it smells again tonight?",
          t3b,
          "Hẹn khách gọi nếu tái diễn, và nói bạn sẽ báo ai.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "And then what happens?",
          t3c,
          "Bước lớn hơn đi qua đúng người: giám sát hỏi lễ tân, không phải bạn tự hứa phòng.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "The towels smell strange.",
          "I am sorry, madam. If you like, we will rewash the towels tonight.",
          "Đề nghị có điều kiện + mốc.",
        ),
        sp(
          "The shampoo smells too strong for me.",
          "Of course. If you like, I can bring an unscented set instead, madam.",
          "Thay bằng bộ không mùi — giải pháp đúng vấn đề của khách.",
        ),
        sp(
          "Is the unscented set free?",
          "Yes, madam. There is no charge for the unscented set.",
          "Nói rõ miễn phí khi đúng là miễn phí — khách không phải đoán.",
          undefined,
          undefined,
          "Of course. If you like, I can bring an unscented set instead, madam.",
        ),
        sp(
          "Do you have unscented soap as well?",
          "Yes, sir. If you like, I will bring unscented soap with your towels.",
          "Đề nghị có điều kiện + món trong quyền của buồng phòng.",
        ),
        sp(
          "I have one more concern about the room.",
          "Thank you for telling me about your concern, sir. If you like, I can check it now.",
          "Thẻ tuần 27: cảm ơn và mời khách nói, rồi đề nghị việc trong quyền của bạn.",
          undefined,
          ["concern"],
        ),
        sp(
          "Can the pillow spray come with the turndown?",
          "If you like, I will ask the turndown attendant to bring it at seven.",
          "Thẻ tuần 26 trong lời đề nghị có điều kiện: một việc, đúng người làm.",
          undefined,
          ["turndown", "attendant"],
        ),
        sp(
          "Did anyone fix the noisy fan?",
          "Engineering fixed it this morning, sir. If it is noisy again, I will follow up.",
          "Thẻ tuần 26: báo việc đã xong, và hứa theo dõi tiếp nếu vấn đề quay lại.",
          undefined,
          ["follow"],
        ),
      ],
      reading: read(
        `Room 315 smells of paint after a repair. Lam airs out the room for one hour and promises to check back. Lam also brings an unscented set of toiletries. He does not just leave: he tells the guest to call him if it smells again. At ten the guest calls, so Lam tells his supervisor at once. The supervisor asks the front desk about another room, and the guest moves that night. Lam writes it all in the shift log.`,
        [
          {
            q: "Lâm hứa gì sau khi làm thoáng phòng?",
            options: [
              "Sáng mai sẽ tự quay lại và sơn lại bức tường cho khách",
              "Quay lại kiểm tra, và khách gọi nếu còn mùi",
              "Khách tự mở cửa sổ khi còn mùi",
            ],
            correct: 1,
            explanation:
              "'promises to check back' và 'tells the guest to call him if it smells again' — kiểm tra giải pháp bằng hai cách.",
          },
          {
            q: "Ai hỏi lễ tân về phòng khác cho khách?",
            options: [
              "Giám sát của Lâm",
              "Lâm, vì Lâm biết phòng nào trống",
              "Khách tự xuống lễ tân yêu cầu",
            ],
            correct: 0,
            explanation:
              "'The supervisor asks the front desk about another room' — giải pháp lớn hơn đi lên đúng người có quyền.",
          },
          {
            q: "Lúc mười giờ, chuyện gì xảy ra?",
            options: [
              "Lâm quay lại kiểm tra lần thứ hai",
              "Tổ kỹ thuật sơn lại bức tường",
              "Khách gọi vì mùi sơn quay lại",
            ],
            correct: 2,
            explanation:
              "'At ten the guest calls, so Lam tells his supervisor at once' — lời hẹn gọi lại nếu còn mùi đã có tác dụng.",
          },
        ],
      ),
      game: [
        game(
          "And if the smell comes back tonight?",
          "If it smells again, please call me. I will tell my supervisor straight away.",
          "If it will smell again, please call me. I will tell my supervisor straight away.",
          "It will not come back, sir. I promise you, because we cleaned everything very well.",
          undefined,
          "Câu cuối hứa điều bạn không chắc. Câu đúng đưa cách xử lý nếu vấn đề quay lại.",
        ),
        game(
          "These toiletries smell too strong for my skin.",
          "If you like, I can bring an unscented set, madam.",
          "If you like, I can brings an unscented set, madam.",
          "Many guests love that smell, madam. You will get used to it.",
          undefined,
          "Câu cuối bắt khách quen dần với thứ làm khách khó chịu. Câu đúng đề nghị một phương án khác trong quyền của bạn.",
        ),
      ],
    }),

    L(28, 4, "When You Must Say No", "Khi phải từ chối", {
      vocabulary: [
        c("Refund", "I cannot offer a refund. The duty manager decides.", [
          "/ˈriːfʌnd/",
          "Hoàn tiền",
          "💸",
        ]),
        c("Free of charge", "Only my supervisor can make a wash free of charge.", [
          "/ˌfriː əv ˈtʃɑːdʒ/",
          "Miễn phí",
          "🆓",
        ]),
        c("Inappropriate", "That is inappropriate, sir. I am going now.", [
          "/ˌɪnəˈprəʊpriət/",
          "Không đúng mực, không phù hợp",
          "⛔",
        ]),
        c("Quiet hours", "We do not vacuum during quiet hours.", [
          "/ˈkwaɪət ˌaʊəz/",
          "Giờ yên tĩnh",
          "🌙",
        ]),
        c("Damage charge amount", "The duty manager decides the damage charge amount."),
      ],
      grammar: [
        g(
          "Free? No.",
          "I cannot offer it free of charge. I will ask my supervisor.",
          "Miễn phí là quyết định của cấp trên: bạn không tự hứa, chuyển người có quyền.",
          "I cannot offering it free of charge. I will ask my supervisor.",
        ),
        g(
          "I cannot. Bye.",
          "If you like, we can clean while you are out at breakfast.",
          "Không được việc này thì đưa phương án trong quyền của mình. Sau 'while' dùng hiện tại.",
          "If you like, we can clean while you will be out at breakfast.",
        ),
      ],
      speaking: [
        risk({
          ...sp(
            "Your vacuum woke me up. I want a full refund, nothing less.",
            t4a,
            "Hoàn tiền: bạn KHÔNG tự hứa. Nói rõ ai sẽ xem xét — không hứa giờ thay người khác.",
            undefined,
            ["offer", "refund", "ask", "duty", "manager", "call"],
          ),
          alsoAccept: [
            "I am sorry, I cannot offer a refund myself. I will ask the duty manager to call you.",
            "I cannot approve a refund, sir. I will ask the duty manager to call you.",
          ],
        }),
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
        risk({
          ...sp(
            "There is coffee on my dress. Can you wash it free of charge?",
            free,
            "Miễn phí là quyết định của cấp trên — chuyển giám sát, không tự hứa.",
            undefined,
            ["offer", "free", "charge", "ask", "supervisor"],
          ),
          alsoAccept: [
            "I am sorry, I cannot wash it free of charge. I will ask my supervisor.",
            "I cannot offer it free of charge, madam. I will ask the duty manager.",
          ],
        }),
        risk({
          ...sp(
            "Close the door and stay for a drink with me.",
            harass,
            "Khách có lời mời không đúng mực: từ chối rõ, rời phòng ngay, báo giám sát. Không đóng cửa.",
            undefined,
            ["inappropriate", "going", "tell", "supervisor"],
          ),
          alsoAccept: [
            "No, sir, that is inappropriate. I am going now, and I will tell my supervisor.",
            "I am going now, sir. That is inappropriate, and I will tell my supervisor.",
          ],
        }),
        sp(
          "Someone vacuumed outside my room at seven this morning!",
          "I am very sorry, madam. I will tell my supervisor about the noise today.",
          "Xin lỗi về điều khách gặp, báo giám sát — chưa kiểm tra thì chưa kết luận ai sai.",
        ),
        sp(
          "When do you vacuum the corridor?",
          "We do not vacuum during quiet hours, sir, so we start after eight.",
          "Nói quy định giờ yên tĩnh bằng một mốc giờ cụ thể.",
        ),
        sp(
          "Will you charge me for the cup I broke?",
          "The duty manager decides the damage charge amount, sir. I will report the cup today.",
          "Từ chối quyết thay: nói ai quyết số tiền, và việc bạn tự làm — báo cáo.",
        ),
        sp(
          "I want to make a complaint about the noise.",
          "Of course, sir. I will ask my supervisor to take your complaint.",
          "Thẻ tuần 27: khiếu nại đi đúng người nhận — không giữ lại, không tự hứa gì.",
          undefined,
          ["complaint"],
        ),
      ],
      reading: read(
        `Mr Wong was woken by a vacuum at seven, during quiet hours, and he asks for a full refund. Long says he cannot offer a refund, but he will ask the duty manager to call Mr Wong. Then Long offers what he can do: clean while Mr Wong is out at breakfast, with a quieter vacuum. Long does not argue about the noise. Mr Wong agrees, and the duty manager calls that afternoon. The room is ready before nine.`,
        [
          {
            q: "Long trả lời thế nào về yêu cầu hoàn tiền?",
            options: [
              "Đồng ý hoàn một nửa tiền phòng đêm đó",
              "Nói rằng khách sạn không bao giờ hoàn tiền cho khách",
              "Không tự hứa được, sẽ nhờ quản lý trực gọi lại",
            ],
            correct: 2,
            explanation:
              "'he cannot offer a refund, but he will ask the duty manager to call' — không hứa, không đóng cửa.",
          },
          {
            q: "Long đưa ra giải pháp nào trong quyền của mình?",
            options: [
              "Dọn khi khách đi ăn sáng, dùng máy êm hơn",
              "Tặng khách một bữa tối miễn phí ở nhà hàng",
              "Đổi khách sang một phòng hạng cao hơn",
            ],
            correct: 0,
            explanation:
              "Bữa tối và nâng hạng đều là quyết định về tiền. Giờ dọn và loại máy là việc buồng phòng tự quyết được.",
          },
          {
            q: "Vì sao chi tiết 'during quiet hours' quan trọng với quản lý trực?",
            options: [
              "Vì nó cho biết khách đã ngủ quá giờ hôm đó",
              "Vì khách sạn đã làm sai giờ yên tĩnh",
              "Vì nó cho biết máy hút bụi bị hỏng",
            ],
            correct: 1,
            explanation:
              "Hút bụi lúc bảy giờ là trong giờ yên tĩnh — một sự việc cụ thể giúp quản lý trực quyết định cho đúng.",
          },
        ],
      ),
      game: [
        game(
          "I want a full refund, nothing less.",
          t4a,
          "I am sorry, I cannot offer a refund. I will ask the duty manager calling you.",
          "Of course, sir. I will tell the front desk to refund you now.",
          undefined,
          "Câu cuối tự hứa hoàn tiền — vượt quyền. Câu đúng không hứa, không từ chối thẳng: chuyển người có quyền xem xét.",
        ),
        game(
          "Come in and close the door. Nobody will know.",
          "No, sir, that is inappropriate. I am going now, and I will tell my supervisor.",
          "No, sir, that is inappropriate. I am going now, and I will tells my supervisor.",
          "Of course, sir. I will close the door and clean very quickly.",
          undefined,
          "Câu cuối đóng cửa ở lại với một vị khách đang có lời mời không đúng mực — mất an toàn. Câu đúng từ chối, rời đi, báo giám sát.",
        ),
      ],
    }),
  ];
}

// ── Week 29 — Handover between colleagues and up to a supervisor ────────
function week29(): LessonContent[] {
  const t1a = "I updated the room status board at two, and Room 410 is out of order.";
  const t1b = "The toilet is leaking. Engineering is coming at six to fix it.";
  const t1c = "Please check the out-of-order list first, then the stayovers on six.";
  const t2a = "I was cleaning room 508 when I noticed my master key was missing.";
  const t2b = "I reported it to security first, and then I noted it in the master key log.";
  const t2c = "Yes. I was checking the last room when security arrived.";
  const t2d = "Security has cancelled the old key, and I have a new key now.";
  const t3a = "Yes, the turndown list has not been finished yet. Six rooms are left.";
  const t3b = "Two rooms are on the late checkout list, 304 and 517, until two.";
  const t3c = "I have checked the amenity stock sheet. Shampoo is low, so I ordered more.";
  const t4a = "Yes, madam. I found a gold ring in 712 after checkout.";
  const t4b = "I noted it in the lost item log and took it to my supervisor.";
  const t4c = "Yes. My colleague Lan was with me, and she signed the log too.";
  const cash = "No, do not move the valuables. Call the supervisor and note it in the log.";
  return [
    L(29, 1, "Handing Over the Shift", "Bàn giao ca", {
      vocabulary: [
        c("Room status board", "The room status board shows which rooms are ready."),
        c("Out-of-order list", "Room 410 is on the out-of-order list."),
        c("Stayover", "Room 615 is a stayover, so we clean it and change the linen on request.", [
          "/ˈsteɪəʊvə/",
          "Phòng khách ở tiếp (chưa trả phòng)",
          "🛏️",
        ]),
        c("Occupied", "The room is occupied until Friday.", [
          "/ˈɒkjupaɪd/",
          "Đang có khách ở",
          "🧳",
        ]),
      ],
      grammar: [
        g(
          "Many thing today.",
          "I updated the room status board at two. Room 410 is out of order.",
          "Bàn giao: việc ĐÃ làm (quá khứ đơn) + việc còn mở (hiện tại).",
          "I have updated the room status board at two. Room 410 is out of order.",
        ),
        g(
          "I clean, guest come back.",
          "I was cleaning 512 when the guest came back.",
          "Quá khứ tiếp diễn 'was cleaning' cho việc đang làm; quá khứ đơn 'came back' cho việc chen vào.",
          "I was clean 512 when the guest came back.",
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
        sp(
          "Why is 512 still not done?",
          "I was cleaning it when the guest came back and asked me to come later.",
          "Quá khứ tiếp diễn kể việc đang làm thì bị cắt ngang.",
          "colleague",
        ),
        sp(
          "Does 410 still smell of paint?",
          "A little. I will air out the room again and check back in one hour.",
          "Thẻ tuần 28 trong câu bàn giao với đồng nghiệp.",
          "colleague",
          ["air", "out", "check", "back"],
        ),
        sp(
          "Is 615 a checkout or a stayover?",
          "It is a stayover. The room is occupied until Friday.",
          "Trả lời đúng trạng thái phòng — ca sau dựa vào đó để xếp việc.",
          "colleague",
        ),
        sp(
          "Then what do we do in 615 today?",
          "We clean it fully, and we change the sheets if the guest asks.",
          "Phòng khách ở tiếp vẫn dọn đầy đủ; ga giường thay khi khách yêu cầu.",
          "colleague",
          undefined,
          "It is a stayover. The room is occupied until Friday.",
        ),
        sp(
          "Why did 615 get a late clean today?",
          "The guest was sleeping when I knocked, so I came back at two.",
          "Quá khứ tiếp diễn cho việc đang diễn ra khi bạn tới — báo bằng sự việc, không phàn nàn về khách.",
          "manager",
        ),
        sp(
          "Did 307 get anything extra today?",
          "Yes. I gave them a dehumidifier and a replacement towel, because the room felt damp.",
          "Thẻ tuần 28 trong một câu bàn giao: việc đã làm + lý do.",
          "colleague",
          ["dehumidifier", "replacement"],
        ),
      ],
      reading: read(
        `At three, Hoa hands over to Binh. "I updated the room status board at two, and Room 410 is out of order." The toilet is leaking, and engineering is coming at six. Hoa tells Binh to check the out-of-order list first, then the stayovers on the sixth floor. She also says 512 is not done: she was cleaning it when the guest came back. Binh does not have to guess anything. Binh starts with the out-of-order list.`,
        [
          {
            q: "Phòng 410 có vấn đề gì?",
            options: [
              "Bồn cầu bị rò nước, chờ kỹ thuật",
              "Khách phòng 410 chưa chịu trả phòng",
              "Phòng 410 chưa có trên bảng trạng thái",
            ],
            correct: 0,
            explanation:
              "'The toilet is leaking, and engineering is coming at six' — vấn đề, người xử lý, mốc giờ.",
          },
          {
            q: "Vì sao phòng 512 chưa dọn xong?",
            options: [
              "Vì Hoa hết khăn sạch trên xe đẩy",
              "Vì phòng 512 đang chờ kỹ thuật",
              "Vì khách quay về khi Hoa đang dọn",
            ],
            correct: 2,
            explanation:
              "'she was cleaning it when the guest came back' — quá khứ tiếp diễn kể việc đang làm thì bị cắt ngang.",
          },
          {
            q: "Vì sao Bình không phải đoán gì khi nhận ca?",
            options: [
              "Vì Bình đã làm ở tầng đó cả tuần",
              "Vì Hoa nói rõ việc đã làm và việc còn mở",
              "Vì Hoa ở lại làm thêm cùng Bình đến hết ca tối",
            ],
            correct: 1,
            explanation:
              "Bảng trạng thái đã cập nhật, phòng hỏng, thứ tự ưu tiên, phòng dở dang — bàn giao tốt là không để ca sau phải đoán.",
          },
        ],
      ),
      game: [
        game(
          "Before you leave, what do I need to know?",
          t1a,
          "I have updated the room status board at two, and Room 410 is out of order.",
          "Nothing much. Everything is fine on this floor today.",
          "colleague",
          "Câu cuối bỏ sót phòng đang hỏng — ca sau sẽ xếp khách vào đó. Câu đúng nêu việc đã làm và việc còn mở.",
        ),
        game(
          "Why did you not finish 512?",
          "I was cleaning it when the guest came back and asked me to come later.",
          "I was clean it when the guest came back and asked me to come later.",
          "I did not have time, so the next shift can do it.",
          "colleague",
          "Câu cuối đẩy việc cho ca sau mà không nói lý do. Câu đúng kể rõ chuyện gì đã cắt ngang việc đang làm.",
        ),
      ],
    }),

    L(29, 2, "I Was Doing… When…", "Tôi đang làm… thì…", {
      vocabulary: [
        c("Suddenly", "The toilet suddenly started leaking."),
        c("Shift log book", "I wrote everything in the shift log book."),
        c("Master key log", "Every master key goes in the master key log."),
        c("Discrepancy report", "A discrepancy report shows a room with the wrong status."),
      ],
      grammar: [
        g(
          "I clean, key lost.",
          "I was cleaning room 508 when I noticed my key was missing.",
          "Quá khứ tiếp diễn cho việc đang làm; quá khứ đơn 'noticed' cho việc chen vào.",
          "I was cleaning room 508 when I notice my key was missing.",
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
          "What were you doing when you lost your master key?",
          t2a,
          "Báo cáo sự cố với cấp trên: đang làm gì (was + -ing) khi chuyện xảy ra.",
          "manager",
        ),
        risk({
          ...sp(
            "What did you do next?",
            t2b,
            "Mất chìa khóa tổng là việc an ninh: báo an ninh NGAY và ghi sổ chìa khóa. Không tự đi tìm cả buổi.",
            "manager",
            ["reported", "security", "first", "noted", "master", "key", "log"],
            t2a,
          ),
          alsoAccept: [
            "First I reported it to security, and then I noted it in the master key log.",
            "I reported it to security first, and then I wrote it in the master key log.",
            "I reported it to security first and noted it in the master key log.",
          ],
        }),
        sp(
          "Did you check the rooms you cleaned?",
          t2c,
          "Quá khứ tiếp diễn: đang làm gì thì an ninh tới.",
          "manager",
          undefined,
          t2b,
        ),
        sp(
          "Good. What happens now?",
          t2d,
          "Khép lại: bên nào đang xử lý, bạn đang dùng chìa nào.",
          "manager",
          undefined,
          t2c,
        ),
        sp(
          "What happened in 220 this morning?",
          "The guest was getting out of the shower when she slipped. I called first aid.",
          "Quá khứ tiếp diễn + thẻ tuần 27: việc đang diễn ra, việc chen vào, việc bạn đã làm.",
          "manager",
          ["first", "aid"],
        ),
        sp(
          "Where did you get a new uniform today?",
          "The uniform room staff gave me one. I was cleaning 508 when my shirt tore.",
          "Thẻ tuần 26 + quá khứ tiếp diễn.",
          "manager",
          ["uniform", "room", "staff"],
        ),
        sp(
          "What happened to the guest's glasses in 610?",
          "I was dusting the desk when they fell and broke. I reported it to my supervisor at once.",
          "Nhân viên làm hỏng đồ của khách: kể đúng sự việc bằng quá khứ tiếp diễn, báo ngay — không tự hứa đền.",
          "manager",
        ),
        sp(
          "Where did you write what happened during the shift?",
          "I wrote everything in the shift log book, with the times.",
          "Sự việc trong ca ghi vào sổ ca — không ghi vào sổ đồ thất lạc.",
          "manager",
        ),
        sp(
          "Room 612 shows vacant on the board, but there are bags inside.",
          "Then we write a discrepancy report and call the front desk now.",
          "Phòng lệch trạng thái: báo cáo lệch + gọi lễ tân. Không tự xếp đồ của khách.",
          "colleague",
        ),
        sp(
          "Tell me about the leak in 410.",
          "I was cleaning the bathroom when the toilet suddenly started leaking.",
          "Quá khứ tiếp diễn + suddenly cho việc bất ngờ chen vào.",
          "manager",
        ),
      ],
      reading: read(
        `Nhung was cleaning room 508 when she noticed her master key was missing. Nhung did not try to find the key alone first. She reported it to security straight away and noted the time in the master key log. Then she checked her trolley and every room she had cleaned. Security cancelled the lost key in the system that afternoon and gave Nhung a new one. Her supervisor read the log and had the whole story.`,
        [
          {
            q: "Nhung đang làm gì khi phát hiện mất chìa khóa tổng?",
            options: ["Đang đẩy xe về kho", "Đang dọn phòng 508", "Đang bàn giao ca chiều"],
            correct: 1,
            explanation:
              "'was cleaning room 508 when she noticed…' — quá khứ tiếp diễn kể việc đang làm thì sự việc xảy ra.",
          },
          {
            q: "Vì sao Nhung báo an ninh ngay mà không tự tìm trước?",
            options: [
              "Vì an ninh sẽ tìm nhanh hơn Nhung",
              "Vì an ninh là bộ phận giữ sổ theo dõi chìa khóa tổng",
              "Vì chìa khóa tổng mở được mọi phòng trên tầng",
            ],
            correct: 2,
            explanation:
              "Mất chìa khóa tổng là rủi ro cho cả tầng — vì vậy an ninh huỷ chìa đó trên hệ thống ngay buổi chiều.",
          },
          {
            q: "Sau khi báo an ninh, Nhung làm gì?",
            options: [
              "Kiểm tra xe đẩy và các phòng đã dọn",
              "Ghi thời gian vào sổ ca làm",
              "Mượn chìa khóa của đồng nghiệp để làm tiếp",
            ],
            correct: 0,
            explanation:
              "'Then she checked her trolley and every room she had cleaned' — báo trước, tìm sau.",
          },
        ],
      ),
      game: [
        game(
          "Your master key is missing? What did you do?",
          t2b,
          "I reporting it to security first, and then I noted it in the master key log.",
          "I looked for it for two hours first, so I did not bother anyone.",
          "manager",
          "Câu cuối giữ im lặng hai tiếng trong khi chìa khóa tổng có thể mở mọi phòng. Câu đúng: báo an ninh ngay và ghi sổ.",
        ),
        game(
          "Why is 410 on the out-of-order list?",
          "I was cleaning the bathroom when the toilet suddenly started leaking.",
          "I was clean the bathroom when the toilet suddenly started leaking.",
          "I do not know. Maybe the guest broke it.",
          "manager",
          "Câu cuối đoán và đổ cho khách. Câu đúng kể đúng điều bạn thấy, bằng quá khứ tiếp diễn.",
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
          "Hiện tại hoàn thành bị động: 'has not been finished yet' — việc chưa xong tính tới lúc này. Quá khứ phân từ cần -ed.",
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
        sp(
          "Can I mix these two cleaners? It is faster.",
          "No. We never mix two chemicals, because the gas is dangerous.",
          "Ôn an toàn hoá chất (tuần 19) với đồng nghiệp: từ chối rõ + lý do thật.",
          "colleague",
        ),
        sp(
          "Why is the turndown list not finished?",
          "We were helping in 610 when two more requests came in.",
          "Báo cấp trên lý do thật, bằng quá khứ tiếp diễn — không đổ cho ai.",
          "manager",
        ),
        sp(
          "Is the spill kit ready for tonight?",
          "Not yet. I was refilling the spill kit for body fluid when you called.",
          "Thẻ tuần 27 + quá khứ tiếp diễn.",
          "colleague",
          ["spill", "kit", "body", "fluid"],
        ),
        sp(
          "Is 304 still on the late checkout list?",
          "Yes, until two. I was checking the list when the front desk called.",
          "Trả lời + quá khứ tiếp diễn kể việc đang làm khi có cuộc gọi.",
          "colleague",
        ),
        sp(
          "Did the laundry come back for 806?",
          "Not yet. The pick-up was late, so it comes back by eight.",
          "Chưa xong thì nói chưa, kèm lý do và mốc mới.",
          "colleague",
        ),
      ],
      reading: read(
        `Before her break, Thuy writes the open items for the evening team. The turndown list has not been finished yet, because she was helping in Room 610 when more requests came in. Six rooms are left. Rooms 304 and 517 are on the late checkout list until two. Thuy has checked the amenity stock sheet, and shampoo is low, so she has ordered more. The evening team starts with the six turndowns, and nobody has to ask Thuy later.`,
        [
          {
            q: "Còn bao nhiêu phòng chưa chỉnh giường tối?",
            options: ["Hai phòng", "Mười phòng", "Sáu phòng"],
            correct: 2,
            explanation: "'Six rooms are left' — số việc còn mở phải cụ thể.",
          },
          {
            q: "Vì sao danh sách chỉnh giường chưa xong?",
            options: [
              "Vì Thủy đang giúp phòng 610 thì có thêm yêu cầu",
              "Vì kho đã hết dầu gội",
              "Vì hai phòng trả muộn nên cả lịch chiều bị lùi lại",
            ],
            correct: 0,
            explanation:
              "'she was helping in Room 610 when more requests came in' — lý do thật, kể bằng quá khứ tiếp diễn.",
          },
          {
            q: "Ca tối làm gì đầu tiên, và vì sao?",
            options: [
              "Đặt thêm dầu gội, vì kho sắp hết",
              "Chỉnh sáu phòng còn lại, vì đó là việc còn mở",
              "Dọn hai phòng trả muộn, vì khách đã đi",
            ],
            correct: 1,
            explanation:
              "Dầu gội đã được đặt, hai phòng còn ở tới hai giờ — việc còn mở là 'the six turndowns'.",
          },
        ],
      ),
      game: [
        game(
          "Is there anything still open on the floor?",
          t3a,
          "Yes, the turndown list has not been finish yet. Six rooms are left.",
          "No, I think we are all done for today. You can relax and go home early.",
          "colleague",
          "Câu cuối khẳng định khi chưa chắc — ca sau sẽ bỏ sót sáu phòng. Câu đúng nêu rõ việc còn mở.",
        ),
        game(
          "Are we low on anything?",
          t3c,
          "I have checked the amenity stock sheet. Shampoo is low, so I have order more.",
          "I did not look at the sheet today, but I think we are probably fine for tonight.",
          "colleague",
          "Câu cuối đoán thay vì kiểm. Câu đúng nói đã kiểm gì, thấy gì, và đã làm gì.",
        ),
      ],
    }),

    L(29, 4, "The Right Log for the Right Thing", "Đúng sổ cho đúng việc", {
      vocabulary: [
        c("Lost item log", "A found ring goes in the lost item log."),
        c("Pending guest request", "The pending guest request is in the shift log book."),
        c("Valuables", "Do not move a guest's valuables. Call the supervisor.", [
          "/ˈvæljuəblz/",
          "Đồ có giá trị (tiền, trang sức…)",
          "💎",
        ]),
      ],
      grammar: [
        g(
          "I remember, no write.",
          "I wrote the pending guest request in the shift log book.",
          "Việc đã làm trong ca kể bằng quá khứ đơn: wrote. Yêu cầu chưa xong ghi vào sổ ca để ca sau làm tiếp.",
          "I writed the pending guest request in the shift log book.",
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
        risk({
          ...sp(
            "What did you do with it?",
            t4b,
            "Đồ thất lạc: ghi sổ + giao giám sát. Không giữ lại, không tự trả cho khách.",
            "manager",
            ["noted", "lost", "item", "log", "took", "supervisor"],
            t4a,
          ),
          alsoAccept: [
            "I wrote it in the lost item log and took it to my supervisor.",
            "I wrote it in the lost item log and gave it to my supervisor.",
            "I logged it in the lost item log and gave it to my supervisor.",
            "I logged the item as lost property and took it to my supervisor.",
          ],
        }),
        sp(
          "Did anyone else see it?",
          t4c,
          "Có người làm chứng và cùng ký sổ — chuỗi giao nhận rõ ràng.",
          "manager",
          undefined,
          t4b,
        ),
        sp(
          "Where exactly was the ring?",
          "It was under the bed. I was vacuuming when I saw it.",
          "Quá khứ tiếp diễn cho việc đang làm khi tìm thấy đồ.",
          "manager",
        ),
        risk({
          ...sp(
            "There is cash and a watch on the desk in 710. Should I put them in the drawer?",
            cash,
            "Đồ giá trị để ngoài trong phòng có khách: không động vào, báo giám sát, ghi sổ.",
            "colleague",
            ["move", "valuables", "call", "supervisor", "note", "log"],
          ),
          alsoAccept: [
            "Do not move the valuables. Call the supervisor and note it in the log.",
            "Call the supervisor and note it in the log. Do not move the valuables.",
          ],
        }),
        sp(
          "Should I charge 509 for the unscented set?",
          "No, the unscented set is free of charge.",
          "Thẻ tuần 28: trả lời đồng nghiệp ngắn, đúng.",
          "colleague",
          ["unscented", "free", "charge"],
        ),
        sp(
          "Where can I see the guest requests from today?",
          "The pending guest requests are in the shift log book, on page two.",
          "Yêu cầu của khách ở sổ ca — sổ đồ thất lạc chỉ dành cho đồ thất lạc.",
          "colleague",
        ),
        sp(
          "Why did you leave 610 so quickly?",
          "I was cleaning 610 when the guest said something inappropriate, so I left.",
          "Thẻ tuần 28 trong báo cáo sự việc: kể bằng quá khứ tiếp diễn, rõ và ngắn.",
          "manager",
          ["inappropriate"],
        ),
      ],
      reading: read(
        `After checkout, Hai finds a gold ring under the bed in Room 712. His colleague Lan is with him. Hai logs the ring in the lost item log, with the room, the time and where he found it, and Lan signs the log too. Then he gives the ring to his supervisor. Later, Hai sees cash on a desk in an occupied room. He does not touch it, and he calls his supervisor. The supervisor thanks Hai for both reports.`,
        [
          {
            q: "Hải ghi những gì vào sổ đồ thất lạc?",
            options: [
              "Phòng, giờ, và chỗ tìm thấy chiếc nhẫn",
              "Tên và số điện thoại của khách",
              "Giá trị ước tính của chiếc nhẫn",
            ],
            correct: 0,
            explanation:
              "'with the room, the time and where he found it' — đủ thông tin để trả đúng chủ.",
          },
          {
            q: "Vì sao Lan cũng ký vào sổ?",
            options: [
              "Vì Lan là người tìm thấy chiếc nhẫn",
              "Để có người làm chứng việc giao nhận",
              "Vì Lan sẽ mang chiếc nhẫn xuống quầy lễ tân",
            ],
            correct: 1,
            explanation: "Đồ quý tìm thấy cần người làm chứng — bảo vệ cả khách lẫn nhân viên.",
          },
          {
            q: "Vì sao tiền trong phòng có khách KHÔNG vào sổ đồ thất lạc?",
            options: [
              "Vì tiền mặt không cần ghi lại",
              "Vì khách sẽ tự tìm thấy tiền",
              "Vì khách vẫn đang ở phòng đó",
            ],
            correct: 2,
            explanation:
              "'an occupied room' — đồ của khách đang ở không phải đồ bỏ quên. Không động vào, báo giám sát.",
          },
        ],
      ),
      game: [
        game(
          "Where is the ring from 712 now?",
          "I logged it in the lost item log and gave it to my supervisor.",
          "I logged it on the lost item log and gave it to my supervisor.",
          "It is on my trolley. I will give it back if the guest calls.",
          "manager",
          "Câu cuối giữ đồ quý trên xe đẩy — không ai làm chứng, dễ thất lạc. Câu đúng: đã ghi sổ, đã giao giám sát.",
        ),
        game(
          "702 has money all over the desk. Shall I tidy it into the drawer?",
          "Do not move the valuables. Call the supervisor and note it in the log.",
          "Do not move the valuables. Call the supervisor and noting it in the log.",
          "Yes, put it in the drawer so it is safe from other staff.",
          "colleague",
          "Câu cuối nghe chu đáo nhưng là động vào tiền của khách. Câu đúng: không động vào, báo giám sát, ghi sổ.",
        ),
      ],
    }),
  ];
}

// ── Week 30 — Checkpoint: putting it together ───────────────────────────
// The checkpoint teaches no new word. Its sixteen cards bring back headwords
// of weeks 23-29 that no later lesson said again (round 3 counted 57 of 104),
// with the card they were first taught on, and each is said at least twice
// this week.
function week30(): LessonContent[] {
  const t1a = "I recommend a memory foam topper, madam. I will bring one within ten minutes.";
  const t1b = "Of course. I will change your turndown time to nine o'clock.";
  const t1c = "Yes, madam. I will put it on the turndown list now.";
  const t2a = "There is a late checkout fee because the next guest needs the room, madam.";
  const t2b = "I will ask the front desk to check the late checkout fee with you.";
  const t2c = "Yes, madam. I will put your room on the late checkout list until two.";
  const t3a = "I am very sorry, madam. If you like, I can clean it now.";
  const t3b = "Our cleaning list was not updated. I will tell my supervisor today.";
  const t3c = "I will note your times, and I will check your room myself at noon tomorrow.";
  const t4a = "I understand, sir. I am calling security and the duty manager now.";
  const t4b = "I am sorry, I cannot do that. Security will check it with the duty manager.";
  const t4c = "Please wait here with me, sir. Security is on the way.";
  const damage = "I cannot decide on that, sir. The duty manager decides the damage charge amount.";
  const dnd = "We will not go in. I will call the supervisor and security for a welfare check.";
  const ill = "I am calling first aid and the duty manager now, madam.";
  return [
    L(30, 1, "Offer and Promise", "Gợi ý và cam kết", {
      vocabulary: [
        c("Memory foam topper", "The memory foam topper makes a hard bed softer."),
        c("Eye mask", "An eye mask keeps the morning light out.", [
          "/ˈaɪ mɑːsk/",
          "Miếng bịt mắt khi ngủ",
          "😴",
        ]),
        c("Turndown list", "The new time goes on the turndown list."),
        c("Room status board", "The room status board shows which rooms are ready."),
      ],
      grammar: [
        g(
          "Pillow, I bring.",
          "I will bring a memory foam topper within ten minutes, madam.",
          "Tuần 25: lời hứa có mốc cụ thể.",
          "I will bringing a memory foam topper within ten minutes, madam.",
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
          "My neck hurts, and the bed is too hard.",
          t1a,
          "Tuần 23 và 25: gợi ý đúng nhu cầu + cam kết có mốc.",
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
          "Will the evening team know?",
          t1c,
          "Tuần 29: thay đổi ghi đúng danh sách để ca tối biết.",
          undefined,
          ["turndown", "list"],
          t1b,
        ),
        sp(
          "The street light keeps me awake.",
          "I recommend an eye mask, sir. It keeps the light out better than the curtain.",
          "Tuần 23: món đúng vấn đề, lợi ích bằng so sánh hơn.",
          undefined,
          ["eye", "mask"],
        ),
        sp(
          "It is noisy too. Do you have earplugs?",
          "Yes, madam. I will bring soft earplugs with the eye mask.",
          "Tuần 23: mang đủ hai món trong một lần.",
          undefined,
          ["earplugs", "eye", "mask"],
        ),
        sp(
          "What did 905 ask for?",
          "A memory foam topper and an eye mask. I noted her pillow choice too.",
          "Bàn giao với đồng nghiệp: món khách chọn + đã ghi lại.",
          "colleague",
          ["memory", "foam", "topper", "eye", "mask"],
        ),
        sp(
          "What should I check first this evening?",
          "Please check the turndown list first, then the room status board.",
          "Tuần 29: thứ tự rõ ràng cho ca tối.",
          "colleague",
          ["turndown", "list", "room", "status", "board"],
        ),
        sp(
          "Is 905 a checkout today?",
          "No, 905 is a stayover until Friday. I noted it on the turndown list.",
          "Tuần 29: trạng thái phòng đúng tên gọi, và đã ghi ở đâu.",
          "colleague",
          ["stayover", "turndown", "list"],
        ),
        sp(
          "Is 905 ready on the board?",
          "Not yet. I will mark it on the room status board when I finish.",
          "Chưa xong thì nói chưa, kèm việc bạn sẽ làm.",
          "colleague",
          ["room", "status", "board"],
        ),
        sp(
          "Who do I call for an ironing board tonight?",
          "Please call the housekeeping coordinator, sir. We bring it within ten minutes.",
          "Tuần 25 và 26: đúng người nhận việc + mốc giờ.",
          undefined,
          ["housekeeping", "coordinator"],
        ),
      ],
      reading: read(
        `Ms Kim's neck hurts and the bed is too hard, so Ngan recommends a memory foam topper. She brings it within ten minutes, with an eye mask for the street light. Ms Kim also asks for turndown at nine instead of seven. Ngan puts the new time on the turndown list and writes the pillow choice in the shift log book. That evening, the turndown attendant reads the list and comes at nine. Nobody asks Ms Kim twice.`,
        [
          {
            q: "Ngân mang những gì lên phòng?",
            options: [
              "Một chăn lông vũ và nút bịt tai cho tiếng ồn",
              "Tấm đệm cao su non và miếng bịt mắt",
              "Cầu là và xô đá cho khách",
            ],
            correct: 1,
            explanation:
              "'recommends a memory foam topper… with an eye mask for the street light' — hai món cho đúng hai vấn đề của khách.",
          },
          {
            q: "Ngân ghi giờ chỉnh giường mới vào đâu?",
            options: [
              "Vào danh sách chỉnh giường tối",
              "Vào bảng trạng thái các phòng ở văn phòng",
              "Vào sổ đồ thất lạc của tầng",
            ],
            correct: 0,
            explanation:
              "'puts the new time on the turndown list' — giờ chỉnh giường ở danh sách chỉnh giường; món khách chọn ở sổ ca.",
          },
          {
            q: "Chi tiết nào cho thấy việc ghi lại đã có tác dụng?",
            options: [
              "Ngân mang đồ lên trong vòng mười phút",
              "Khách gọi xuống để nhắc lại giờ",
              "Nhân viên ca tối đến đúng chín giờ",
            ],
            correct: 2,
            explanation:
              "'the turndown attendant reads the list and comes at nine' — người ca tối không nghe khách nói, nhưng vẫn làm đúng.",
          },
        ],
      ),
      game: [
        game(
          "Do you have something for the street light at night?",
          "I recommend an eye mask, sir. It keeps the light out better than the curtain.",
          "I recommend an eye mask, sir. It keep the light out better than the curtain.",
          "The street light goes off at midnight, sir, so most guests do not mind it at all.",
          undefined,
          "Câu cuối giải thích thay vì giúp. Câu đúng gợi ý một món cụ thể, kèm lợi ích so sánh.",
        ),
        game(
          "What do I check first when the evening shift starts?",
          "Please check the turndown list first, then the room status board.",
          "Please checks the turndown list first, then the room status board.",
          "Just start with any room. The board does not matter much.",
          "colleague",
          "Câu cuối để ca tối làm mò. Câu đúng chỉ đúng hai chỗ phải xem, theo thứ tự.",
        ),
      ],
    }),

    L(30, 2, "Explain and Coordinate", "Giải thích và điều phối", {
      vocabulary: [
        c("Laundry team", "The laundry team collects guest laundry at ten."),
        c("Pest control team", "The pest control team is coming at three."),
        c("Late checkout list", "Room 304 is on the late checkout list."),
        c("Out-of-order list", "Room 410 is on the out-of-order list."),
      ],
      grammar: [
        g(
          "Pay because rule.",
          "There is a late checkout fee because we have to prepare the room.",
          "Tuần 24: because + lý do thật.",
          "There is a late checkout fee because of we have to prepare the room.",
        ),
        g(
          "Laundry man check.",
          "I will ask the laundry team to check your shirt today.",
          "Tuần 26: ask + người + to + động từ.",
          "I will ask the laundry team check your shirt today.",
        ),
      ],
      speaking: [
        sp("Why do I have to pay a late checkout fee?", t2a, "Tuần 24: lý do thật, bằng because."),
        sp(
          "Can the front desk remove it for me?",
          t2b,
          "Tuần 26: một việc, đúng người kiểm — bạn không tự bỏ phí.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Fine. Will you clean my room after two?",
          t2c,
          "Tuần 29: ghi đúng danh sách để cả ca biết.",
          undefined,
          ["late", "checkout", "list"],
          t2b,
        ),
        sp(
          "Why is 304 not cleaned yet?",
          "It is on the late checkout list. The guest suddenly asked to stay until two.",
          "Tuần 29: trạng thái + lý do, có từ chỉ việc bất ngờ.",
          "colleague",
          ["late", "checkout", "list", "suddenly"],
        ),
        sp(
          "My shirt came back from the laundry with a hole!",
          "I am very sorry, sir. I will ask the laundry team to check it today.",
          "Đồ giặt bị hỏng: xin lỗi, chuyển đúng tổ kiểm — không tự hứa đền.",
          undefined,
          ["laundry", "team"],
        ),
        sp(
          "Did the laundry for 517 go out?",
          "Yes. The laundry team took it at ten, and it comes back by six.",
          "Báo đồng nghiệp: đã làm gì + lịch trả.",
          "colleague",
          ["laundry", "team"],
        ),
        sp(
          "I saw ants near the minibar.",
          "I am sorry, madam. I will ask the pest control team to come today.",
          "Tuần 26: xin lỗi + đúng đội.",
          undefined,
          ["pest", "control", "team"],
        ),
        sp(
          "Is 410 still on the out-of-order list?",
          "Yes. It stays on the out-of-order list until the pest control team finishes.",
          "Báo cấp trên: trạng thái + đang chờ ai.",
          "manager",
          ["out-of-order", "list", "pest", "control", "team"],
        ),
        sp(
          "Can I give 412 to the next guest?",
          "No, 412 is on the out-of-order list. The toilet is leaking.",
          "Phòng hỏng không được giao — nói rõ danh sách và lý do.",
          "colleague",
          ["out-of-order", "list"],
        ),
        sp(
          "Why is there a minibar charge? I only had water.",
          "The minibar attendant counted it this morning, sir. The front desk can check the bill.",
          "Tuần 24 và 26: nói ai đếm, ai kiểm hóa đơn — không tự sửa.",
          undefined,
          ["minibar", "attendant", "front", "desk"],
        ),
      ],
      reading: read(
        `Mr Lee asks why there is a late checkout fee. Phong explains that the room must be ready for the next guest, and he asks the front desk to check the fee with Mr Lee. Phong puts Room 304 on the late checkout list until two. Then a guest reports ants, so Phong asks the pest control team to come. Room 410 stays on the out-of-order list until they finish. Phong also tells the evening team.`,
        [
          {
            q: "Vì sao có phí trả phòng muộn?",
            options: [
              "Vì phòng phải sẵn sàng cho khách sau",
              "Vì khách đã dùng đồ trong minibar",
              "Vì đội diệt côn trùng phải tới kiểm tra",
            ],
            correct: 0,
            explanation:
              "'the room must be ready for the next guest' — lý do thật, không phải 'vì đó là quy định'.",
          },
          {
            q: "Ai kiểm tra khoản phí với khách?",
            options: ["Phong", "Đội diệt côn trùng", "Quầy lễ tân"],
            correct: 2,
            explanation:
              "'he asks the front desk to check the fee with Mr Lee' — phí là việc của lễ tân.",
          },
          {
            q: "Vì sao phòng 410 vẫn trong danh sách phòng hỏng?",
            options: [
              "Vì khách phòng 410 trả phòng muộn",
              "Vì đội diệt côn trùng chưa làm xong",
              "Vì Phong quên cập nhật danh sách cho ca tối",
            ],
            correct: 1,
            explanation:
              "'stays on the out-of-order list until they finish' — phòng chỉ ra khỏi danh sách khi đội đã làm xong.",
          },
        ],
      ),
      game: [
        game(
          "Why is there a late checkout fee on my bill?",
          t2a,
          "There is a late checkout fee because the next guest need the room, madam.",
          "I do not know, sir. The front desk likes to add fees.",
          undefined,
          "Câu cuối không trả lời và nói xấu bộ phận khác. Câu đúng nêu lý do thật.",
        ),
        game(
          "There are ants on my desk!",
          "I am sorry, madam. I will ask the pest control team to come today.",
          "I am sorry, madam. I will ask the pest control team come today.",
          "Ants are very common in this city, madam. Just keep your food closed.",
          undefined,
          "Câu cuối coi chuyện của khách là bình thường và bắt khách tự lo. Câu đúng xin lỗi và gọi đúng đội.",
        ),
      ],
    }),

    L(30, 3, "Apologise and Solve", "Xin lỗi và giải quyết", {
      vocabulary: [
        c("Damp smell", "I will report the damp smell to engineering."),
        c("Spot clean", "I can spot clean the stain now.", [
          "/ˈspɒt kliːn/",
          "Làm sạch tại chỗ (một vết)",
          "🎯",
        ]),
        c("Rewash", "If you like, we will rewash the towels tonight.", [
          "/ˌriːˈwɒʃ/",
          "Giặt lại",
          "🌀",
        ]),
        c("Quiet hours", "We do not vacuum during quiet hours.", [
          "/ˈkwaɪət ˌaʊəz/",
          "Giờ yên tĩnh",
          "🌙",
        ]),
      ],
      grammar: [
        g(
          "Not my fault.",
          "I am very sorry, madam. If you like, I can clean it now.",
          "Tuần 27 và 28: xin lỗi + đề nghị có điều kiện.",
          "I am very sorry, madam. If you like, I can cleaning it now.",
        ),
        g(
          "Carpet dirty, clean.",
          "If you like, I can spot clean the carpet before you come back.",
          "Tuần 28: If you like, I can + việc của bạn; sau 'before' dùng hiện tại.",
          "If you like, I can spot clean the carpet before you will come back.",
        ),
      ],
      speaking: [
        sp(
          "I took the sign off at noon, but nobody cleaned my room.",
          t3a,
          "Xin lỗi về điều khách gặp, rồi giải pháp ngay.",
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
          "Không hứa điều bạn không chắc; hứa việc bạn tự làm được, có giờ.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "The room has a damp smell again.",
          "I am sorry, sir. If you like, I can air out the room and report the damp smell.",
          "Tuần 27 và 28: xin lỗi + việc trong quyền + báo đúng bộ phận.",
          undefined,
          ["damp", "smell"],
        ),
        sp(
          "What is wrong in 512?",
          "There is a damp smell from a small leak. Engineering is fixing it today.",
          "Báo cấp trên: vấn đề + ai đang xử lý.",
          "manager",
          ["damp", "smell"],
        ),
        sp(
          "There is wine on the carpet.",
          "I am sorry, madam. If you like, I can spot clean it now.",
          "Tuần 28: đề nghị có điều kiện, việc của bạn.",
          undefined,
          ["spot", "clean"],
        ),
        sp(
          "The towels smell of smoke.",
          "I am sorry, sir. If you like, we will rewash the towels tonight.",
          "Tuần 28: đề nghị có điều kiện + mốc.",
          undefined,
          ["rewash"],
        ),
        sp(
          "The towels in 305 smell bad, and the sofa has a mark.",
          "Then rewash the towels and spot clean the sofa before three.",
          "Nói với đồng nghiệp: hai việc, một mốc giờ.",
          "colleague",
          ["rewash", "spot", "clean"],
        ),
        sp(
          "When are your quiet hours?",
          "Our quiet hours are from ten at night to eight in the morning, madam.",
          "Tuần 28: nói quy định bằng mốc giờ cụ thể.",
          undefined,
          ["quiet", "hours"],
        ),
        sp(
          "Can I vacuum the corridor now? It is half past seven.",
          "No, not yet. Quiet hours end at eight, so please wait.",
          "Nhắc đồng nghiệp quy định giờ yên tĩnh, kèm mốc.",
          "colleague",
          ["quiet", "hours"],
        ),
        sp(
          "The smell is still there. I cannot sleep here.",
          "I understand you are disappointed, madam. I will ask the front desk if they can move you to another room.",
          "Tuần 27 và 28: công nhận cảm xúc, đổi phòng chuyển lễ tân — không tự hứa.",
          undefined,
          ["front", "desk", "move", "another", "room"],
        ),
        sp(
          "This is the second time nobody came!",
          "I apologise for the inconvenience, madam. You can choose either option: now or after two.",
          "Tuần 27 và 28: xin lỗi về sự bất tiện + hai lựa chọn.",
          undefined,
          ["inconvenience", "either", "option"],
        ),
        sp(
          "What was the room inspection result for 512?",
          "The room inspection result was good, madam. Only the bathroom fan is noisy.",
          "Báo cấp trên: kết quả + điều còn tồn tại.",
          "manager",
        ),
        sp(
          "The guest in 808 is unhappy about the cleaning time.",
          "I noted it as a pending guest request in the shift log book.",
          "Tuần 29: đúng sổ cho đúng việc.",
          "colleague",
          ["pending", "guest", "request", "shift", "log", "book"],
        ),
      ],
      reading: read(
        `Mrs Silva removed her Do Not Disturb sign at noon, but her room was not cleaned. Oanh apologises and offers to clean it now. The cleaning list was not updated after the sign came off, so Oanh tells her supervisor. Mrs Silva also mentions a damp smell and a wine mark on the carpet. Oanh airs out the room, reports the damp smell and spot cleans the carpet. The next day, Oanh checks the room herself at noon.`,
        [
          {
            q: "Vì sao phòng không được dọn?",
            options: [
              "Mrs Silva treo lại biển Không làm phiền lúc trưa",
              "Danh sách dọn phòng chưa được cập nhật",
              "Oanh đang bận xử lý vết rượu vang",
            ],
            correct: 1,
            explanation:
              "'The cleaning list was not updated after the sign came off' — lỗi quy trình, không đổ cho người.",
          },
          {
            q: "Oanh làm gì với mùi ẩm?",
            options: [
              "Làm thoáng phòng và báo mùi ẩm",
              "Giặt lại toàn bộ khăn trong phòng",
              "Làm sạch vết rượu trên thảm",
            ],
            correct: 0,
            explanation:
              "'airs out the room, reports the damp smell' — việc trong quyền của buồng phòng, rồi báo đúng bộ phận. Vết rượu là chuyện khác: 'spot cleans the carpet'.",
          },
          {
            q: "Ngày hôm sau Oanh làm gì?",
            options: [
              "Báo lại giám sát về danh sách dọn phòng hôm trước",
              "Giặt sâu tấm thảm sau sáu giờ",
              "Tự kiểm tra phòng lúc mười hai giờ trưa",
            ],
            correct: 2,
            explanation:
              "'The next day, Oanh checks the room herself at noon' — giữ đúng lời hứa mình tự làm được.",
          },
        ],
      ),
      game: [
        game(
          "My room was not cleaned again today!",
          t3a,
          "I am very sorry, madam. If you like, I can cleans it now.",
          "Did you leave the Do Not Disturb sign on your door again, madam?",
          undefined,
          "Câu cuối hỏi vặn lại khách. Câu đúng xin lỗi và đưa giải pháp ngay.",
        ),
        game(
          "Can I start vacuuming the corridor? It is seven.",
          "No, not yet. Quiet hours end at eight, so please wait.",
          "No, not yet. Quiet hours ends at eight, so please wait.",
          "Yes, go ahead. Most guests are awake by seven anyway.",
          "colleague",
          "Câu cuối phá giờ yên tĩnh — khách sẽ bị đánh thức. Câu đúng nhắc quy định kèm mốc giờ.",
        ),
      ],
    }),

    L(30, 4, "End of Phase Three", "Kết thúc giai đoạn ba", {
      vocabulary: [
        c("Valuables", "Do not move a guest's valuables. Call the supervisor.", [
          "/ˈvæljuəblz/",
          "Đồ có giá trị (tiền, trang sức…)",
          "💎",
        ]),
        c("Master key log", "Every master key goes in the master key log."),
        c("Discrepancy report", "A discrepancy report shows a room with the wrong status."),
        c("Occupied", "The room is occupied until Friday.", [
          "/ˈɒkjupaɪd/",
          "Đang có khách ở",
          "🧳",
        ]),
      ],
      grammar: [
        g(
          "Charge, I write.",
          "I took photos and reported it. The duty manager decides the damage charge amount.",
          "Tuần 24 và 28: buồng phòng báo cáo có bằng chứng; số tiền do quản lý trực quyết.",
          "I took photos and reported it. The duty manager decide the damage charge amount.",
        ),
        g(
          "Jewellery, I keep safe.",
          "We do not move valuables. I will call the supervisor now.",
          "Đồ giá trị của khách: không động vào, gọi giám sát. Sau 'do not' động từ ở dạng gốc.",
          "We do not moving valuables. I will call the supervisor now.",
        ),
      ],
      speaking: [
        risk({
          ...sp(
            "My laptop is missing, and your cleaner was in my room!",
            t4a,
            "Bị tố mất đồ: không tranh cãi, không tự xử. Gọi an ninh và quản lý trực ngay.",
            undefined,
            ["calling", "security", "duty", "manager"],
          ),
          alsoAccept: [
            "I am sorry, sir. I am calling security and the duty manager now.",
            "I am calling the duty manager and security now, sir.",
          ],
        }),
        risk({
          ...sp(
            "Search the cleaner's trolley right now!",
            t4b,
            "Không tự lục soát — an ninh làm, có quản lý chứng kiến. Không hứa giờ thay an ninh.",
            undefined,
            ["security", "check", "duty", "manager"],
            t4a,
          ),
          alsoAccept: [
            "I am sorry, I cannot search it. Security will check it with the duty manager.",
            "I cannot do that, sir. Security and the duty manager will check it.",
          ],
        }),
        sp(
          "So what do I do now?",
          t4c,
          "Ở lại với khách, nói rõ ai đang tới.",
          undefined,
          undefined,
          t4b,
        ),
        risk({
          ...sp(
            "How much will you charge me for the broken lamp?",
            damage,
            "Số tiền hư hỏng do quản lý trực quyết — bạn chỉ báo cáo, không đoán giá.",
            undefined,
            ["decide", "decides", "duty", "manager", "damage", "charge", "amount"],
          ),
          alsoAccept: [
            "The duty manager decides the damage charge amount, sir. I cannot decide that.",
            "I cannot decide that, sir. I will ask the duty manager.",
            "I cannot decide that, sir. May I ask the duty manager?",
          ],
        }),
        risk({
          ...sp(
            "The DND sign on 1105 has been on since yesterday.",
            dnd,
            "Biển treo quá lâu: không vào một mình. Giám sát và an ninh kiểm tra an toàn.",
            "colleague",
            ["go", "call", "supervisor", "security", "welfare", "check"],
          ),
          alsoAccept: [
            "We will not go in alone. I will call the supervisor and security for a welfare check.",
            "I will ask the supervisor and security to do a welfare check now.",
            "I will call the supervisor and security for a welfare check.",
          ],
        }),
        risk({
          ...sp(
            "My husband feels very ill and dizzy.",
            ill,
            "Khách ốm trong phòng: gọi sơ cứu và quản lý trực ngay, không tự cho thuốc.",
            undefined,
            ["calling", "first", "aid", "duty", "manager"],
          ),
          alsoAccept: [
            "I will call first aid and the duty manager now, madam.",
            "Please stay with him, madam. I am calling first aid and the duty manager.",
          ],
        }),
        sp(
          "Room 1203 has jewellery on the bed. Should I put it in the safe?",
          "No, we do not move valuables. I will call the supervisor now.",
          "Đồ giá trị trong phòng có khách: không động vào, gọi giám sát.",
          "colleague",
          ["move", "valuables", "supervisor"],
        ),
        sp(
          "What did you do with the cash in 702?",
          "I did not move the valuables, and the supervisor checked them with me.",
          "Báo cấp trên: việc không làm + ai đã kiểm cùng.",
          "manager",
          ["move", "valuables", "supervisor"],
        ),
        sp(
          "I cannot find my master key!",
          "Report it to security now, and note it in the master key log.",
          "Tuần 29: chìa khóa tổng mất là việc an ninh — báo trước, ghi sổ sau.",
          "colleague",
          ["security", "note", "master", "key", "log"],
        ),
        sp(
          "Where do you sign for the master key?",
          "In the master key log, with my name and the time.",
          "Đúng sổ cho đúng việc.",
          "manager",
          ["master", "key", "log"],
        ),
        sp(
          "Room 612 shows occupied, but nobody is in it.",
          "Then 612 may not be occupied. We write a discrepancy report for the front desk.",
          "Tuần 29: phòng lệch trạng thái — báo cáo lệch cho lễ tân.",
          "colleague",
          ["occupied", "discrepancy", "report"],
        ),
        sp(
          "Why did you write a discrepancy report for 714?",
          "I wrote a discrepancy report because 714 was occupied, not vacant.",
          "Báo cấp trên lý do thật, bằng because.",
          "manager",
          ["discrepancy", "report", "occupied"],
        ),
        sp(
          "Do we have enough shampoo for tonight?",
          "Yes. I checked the amenity stock sheet at four.",
          "Tuần 29: đã kiểm gì + giờ.",
          "manager",
          ["amenity", "stock", "sheet"],
        ),
        sp(
          "I want a refund for last night. The noise was terrible.",
          "I cannot offer a refund, madam, but the duty manager can review it today.",
          "Tuần 28: không tự hứa hoàn tiền, nói rõ ai xem xét.",
          undefined,
          ["offer", "refund", "duty", "manager"],
        ),
        sp(
          "A guest left a watch in 905. What do I do?",
          "Note it in the lost item log and take it to the supervisor.",
          "Tuần 29: đồ khách bỏ quên vào đúng sổ, giao đúng người.",
          "colleague",
          ["lost", "item", "log"],
        ),
        sp(
          "Why does the front desk need my passport for my ring?",
          "The ID check keeps your ring safe, madam. It is our lost property rule.",
          "Tuần 24: lý do thật của bước kiểm tra giấy tờ.",
          undefined,
          ["ID", "check", "lost", "property", "rule"],
        ),
      ],
      reading: read(
        `A guest shouts that a laptop is missing and that the room attendant was in the room. Vy does not argue and does not search anything herself. She calls security and the duty manager at once, and waits with the guest. Security and the duty manager check the room together. The laptop is in the room safe, where the guest had locked it. Vy did not move any valuables, and she writes what happened in the shift log book.`,
        [
          {
            q: "Vy làm gì khi khách tố nhân viên lấy máy tính?",
            options: [
              "Tự lục xe đẩy cho khách xem",
              "Gọi an ninh và quản lý trực ngay",
              "Ghi vào sổ ca trước rồi mới gọi an ninh",
            ],
            correct: 1,
            explanation:
              "'calls security and the duty manager at once' — không tranh cãi, không tự xử lý; ghi sổ là việc sau cùng.",
          },
          {
            q: "Cuối cùng chiếc máy tính ở đâu?",
            options: [
              "Trong két sắt của phòng",
              "Trên xe đẩy của nhân viên",
              "Ở quầy đồ thất lạc của lễ tân",
            ],
            correct: 0,
            explanation: "'The laptop is in the room safe, where the guest had locked it.'",
          },
          {
            q: "Vì sao Vy không tranh cãi với khách?",
            options: [
              "Vì quản lý trực đã có mặt trong phòng",
              "Vì Vy biết máy tính ở trong két",
              "Vì lời tố chưa chắc đúng",
            ],
            correct: 2,
            explanation:
              "Máy tính nằm trong két — lời tố sai, nhưng lúc đầu không ai biết. Tranh cãi không tìm ra sự thật; an ninh và quản lý trực kiểm tra thì có.",
          },
        ],
      ),
      game: [
        game(
          "My laptop is gone. Your cleaner took it!",
          t4a,
          "I understand, sir. I am call security and the duty manager now.",
          "Of course, sir. I will search her trolley and her bag for you right now.",
          undefined,
          "Câu cuối tự lục soát — việc của an ninh, có quản lý chứng kiến. Câu đúng giữ bình tĩnh và gọi đúng người ngay.",
        ),
        game(
          "What will the damage charge be for this broken lamp?",
          "The duty manager decides the damage charge amount, sir. I cannot decide that.",
          "The duty manager decide the damage charge amount, sir. I cannot decide that.",
          "About fifty dollars, sir. I will put it on your bill now.",
          undefined,
          "Câu cuối đoán giá và tự ghi hóa đơn — việc của quản lý trực và lễ tân. Câu đúng nói rõ ai quyết.",
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

/** What a room attendant can SAY after each Phase 3 week — shown on the week
 *  hub and in the handbook (see `WeekContent.canDoVi`). */
export const HK_P3_CAN_DO: Record<number, string> = {
  23: "Gợi ý món trong thực đơn gối đúng nhu cầu khách, so sánh hai lựa chọn (êm hơn, ấm hơn, yên tĩnh hơn), hỏi dị ứng trước món có hương liệu, và vui vẻ chấp nhận khi khách từ chối.",
  24: "Giải thích một khoản phí bằng 'have to' và 'because' với lý do thật, nói rõ ai tính phí và ai quyết (lễ tân, giám sát, quản lý trực), và từ chối tự xoá phí hay tự trả đồ thất lạc.",
  25: "Hứa có mốc cụ thể (trong vòng mười phút, trước ba giờ), tôn trọng biển Không làm phiền, báo trước nếu có thể trễ, và khi trễ hẹn thì xin lỗi và đưa mốc mới cho đúng việc khách đang chờ.",
  26: "Chuyển mỗi yêu cầu cho đúng một bộ phận ('Let me check with…', 'I'll ask … to …'), từ chối mở cửa khi chưa xác minh, gọi an ninh khi khách không an toàn hay khi phòng treo biển quá lâu, và báo lại khi việc đã xong.",
  27: "Tiếp nhận phàn nàn: lắng nghe, xin lỗi về điều khách gặp mà không nhận lỗi vội, hỏi thêm sự việc, và xử lý an toàn trước tiên khi sàn ướt, có người ngã hay có dịch cơ thể.",
  28: "Đề nghị giải pháp trong quyền của mình bằng 'If you like, I can…', đưa hai lựa chọn, và từ chối rõ ràng việc vượt quyền (đổi phòng, hoàn tiền, miễn phí) hay một lời mời không đúng mực.",
  29: "Bàn giao ca và báo cáo sự việc với đồng nghiệp, cấp trên bằng quá khứ tiếp diễn: phòng hỏng, việc còn mở, mất chìa khóa tổng, đồ tìm thấy và đồ giá trị để ngoài.",
  30: "Ôn cả giai đoạn trong một ca: gợi ý và hứa có mốc, giải thích phí và người quyết, xin lỗi và giải quyết, bàn giao bằng đúng danh sách, đúng sổ, và gọi đúng người khi bị tố mất đồ, khi khách ốm hay khi biển Không làm phiền treo quá lâu.",
};
