// ============================================================
// SPA & WELLNESS — PHASE 3 (weeks 23-30), written for the department.
//
// The frame-built weeks read the Spa bank by slot index, and a frame knows
// a part of speech, never a meaning. So a refund demand was answered with "I
// cannot add ten free minutes myself", a question about a service price with
// a no-show fee, "The cancellation deadline takes about ten minutes", "The
// sensitive area is complete for today", and the day's incidents were "all
// recorded in the locker key count". Week 23 was a separate hand-written week
// whose turns ran 20-25 words. The checkpoint's must-be-right turn was
// whatever matched "allerg" — a note that "has not been finished yet".
//
// The learner is a spa receptionist or therapist. What that job owns, and what
// it routes, is the same in every lesson below:
//
//  · A therapist EXPLAINS treatments and recommends from the menu, after the
//    consultation. The health questions come first — allergy, pregnancy,
//    blood pressure, an operation, the skin — and a declared contraindication
//    is never treated through: no hot stone or sauna with high blood pressure,
//    no massage after an operation without a doctor's note, and pregnancy
//    goes to the manager before anything starts. A therapist never diagnoses:
//    "I cannot say" and the hotel nurse, not a guess.
//  · Pain, a burning skin, dizziness: the treatment STOPS, the skin is cleaned
//    with cool water, the guest is taken out of the heat and never left alone,
//    and the supervisor or the hotel nurse is called.
//  · Charges are explained by the reason ("because the room was kept for
//    you") and billed by the spa desk. Free minutes, upgrades, refunds and a
//    removed fee belong to the spa manager — said plainly, with who calls and
//    when. Safety and treatment questions go to the spa supervisor.
//  · A therapist's number or working hours are not given out; a guest who
//    crosses a line hears it once, and then the treatment stops.
//  · An apology is for what the guest met, never a verdict on whose fault it
//    was before anybody has checked.
//  · Week 29 is talk between colleagues and to the supervisor, and is
//    labelled so; each log holds its own thing.
//
// Turns marked `risk` are those hard cases; the checkpoint's must-be-right
// draw comes from them. Cards keep the Spa bank entries (kit.ts looks them
// up), because Phase 4 recycles most of them; the week-23 cards bring the
// glosses their own reviewed week carried.
// ============================================================
import type { LessonContent } from "../week-content";
import { game, g, read, sp } from "../phase0";
import { cardsFor, lessonsFor, risk } from "./kit";

const c = cardsFor("SW");
const L = lessonsFor("SW");

// ── Week 23 — The consultation first, then a recommendation ────────────
function week23(): LessonContent[] {
  const t1a = "First, we do a short consultation, madam. It takes about five minutes.";
  const t1b =
    "We ask about allergies and any medical condition. Then we do a contraindication check.";
  const t1c = "Thank you, madam. I cannot start until my manager checks.";
  const t2a = "I recommend the hot stone massage, sir. It is deeper than the traditional one.";
  const t2b = "Thank you, sir. Then I cannot offer the hot stone or the sauna.";
  const t2c =
    "I recommend a gentle massage with light pressure. My manager will check your form first.";
  const t3a =
    "I recommend our four-session package, madam. It is cheaper than four single massages.";
  const t3b = "Four massages, and the herbal tea is complimentary. The package lasts three months.";
  const t3c = "Of course, madam. I will book one massage for today.";
  const t4a =
    "I am glad you enjoyed it, madam. I recommend our aloe cream to moisturize your skin.";
  const t4b = "No, madam. The cream is lighter than the oil, and it has no smell.";
  const t4c = "Of course, madam. Thank you for your feedback, and enjoy your evening.";
  return [
    L(23, 1, "The Consultation Comes First", "Tư vấn sức khỏe trước tiên", {
      vocabulary: [
        c("Consultation", "Every first visit starts with a short consultation.", [
          "/ˌkɒnsəlˈteɪʃən/",
          "Sự tư vấn, buổi tham vấn",
          "📋",
        ]),
        c("Allergy", "Do you have an allergy to any oil or cream?", ["/ˈælədʒi/", "Dị ứng", "🤧"]),
        c("Condition", "Please tell us about any medical condition before the massage.", [
          "/kənˈdɪʃən/",
          "Tình trạng (sức khỏe)",
          "🩺",
        ]),
        c(
          "Contraindication check",
          "The contraindication check shows which treatments are not suitable for you.",
          ["/ˌkɒntrəˌɪndɪˈkeɪʃn tʃek/", "Kiểm tra chống chỉ định trước liệu trình", "⚠️"],
        ),
      ],
      grammar: [
        g(
          "Massage first, form later.",
          "We always do the consultation before the massage, madam.",
          "Tư vấn sức khỏe luôn đi TRƯỚC liệu trình. 'We' đi với 'do', không phải 'does'; 'always' đứng trước động từ.",
          "We always does the consultation before the massage, madam.",
        ),
        g(
          "Nut allergy? This oil.",
          "For a nut allergy, I recommend the unscented oil, madam.",
          "Gợi ý bằng 'I recommend + the + món' — không chèn 'you' sau 'recommend'. Gợi ý đi SAU điều khách vừa khai.",
          "For a nut allergy, I recommend you the unscented oil, madam.",
        ),
      ],
      speaking: [
        sp(
          "This is my first spa visit. What happens before the massage?",
          t1a,
          "Khách mới: nói bước đầu tiên là buổi tư vấn, và nó mất bao lâu.",
        ),
        sp(
          "What do you need to know?",
          t1b,
          "Kể hai việc theo thứ tự: hỏi dị ứng và bệnh lý, rồi kiểm tra chống chỉ định.",
          undefined,
          undefined,
          t1a,
        ),
        risk(
          sp(
            "I am four months pregnant. Is the massage still all right?",
            t1c,
            "Khách mang thai: bạn KHÔNG tự quyết là được hay không. Chưa bắt đầu cho tới khi quản lý kiểm tra.",
            undefined,
            ["start", "manager"],
            t1b,
          ),
        ),
        sp(
          "I am allergic to nuts. Is the almond oil a problem?",
          "Yes, madam. The almond oil has nuts, so I recommend the unscented oil.",
          "Nghe dị ứng rồi mới gợi ý: nói lý do (dầu hạnh nhân có hạt) và món thay thế.",
        ),
      ],
      reading: read(
        `Ms Weber books a hot stone massage. Before it, Hoa does a short consultation. Ms Weber says she is allergic to nuts, so Hoa recommends the unscented oil. The almond oil has nuts in it. Then Ms Weber says she is four months pregnant. Hoa does not start the massage. She asks her manager first, because the hot stone massage is not for pregnant guests.`,
        [
          {
            q: "Vì sao Hoa gợi ý dầu không mùi?",
            options: [
              "Vì dầu không mùi rẻ hơn dầu hạnh nhân",
              "Vì dầu hạnh nhân có hạt, mà khách dị ứng hạt",
              "Vì khách nói mình thích mùi nhẹ hơn mùi oải hương",
            ],
            correct: 1,
            explanation:
              "'allergic to nuts' và 'The almond oil has nuts in it' — gợi ý đi theo điều khách vừa khai trong buổi tư vấn.",
          },
          {
            q: "Khi khách nói đang mang thai, Hoa làm gì?",
            options: [
              "Chưa bắt đầu, hỏi quản lý trước",
              "Đổi sang massage đá nóng với lực thật nhẹ",
              "Bắt đầu ngay nhưng làm ngắn hơn mọi khi",
            ],
            correct: 0,
            explanation:
              "'Hoa does not start the massage. She asks her manager first' — chống chỉ định không phải việc kỹ thuật viên tự quyết.",
          },
        ],
      ),
      game: [
        game(
          "Can we skip the form today? I am in a hurry.",
          "I understand, madam. The consultation is short, and we need it first.",
          "No form, no massage. You write.",
          "Of course, madam. Just tell the therapist during the massage.",
          undefined,
          "Câu cuối bỏ qua bước tư vấn — dị ứng và chống chỉ định phải được hỏi TRƯỚC khi bắt đầu. Câu đúng giữ bước tư vấn và nói nó ngắn.",
        ),
      ],
    }),

    L(23, 2, "Comparing Two Treatments", "So sánh hai liệu trình", {
      vocabulary: [
        c("Recommend", "I recommend the herbal steam for tired muscles.", [
          "/ˌrekəˈmend/",
          "Giới thiệu, đề xuất",
          "🛍️",
        ]),
        c("Hot stone", "The hot stone massage is warmer than our traditional massage.", [
          "/hɒt stəʊn/",
          "Đá nóng",
          "🪨",
        ]),
        c("Herbal steam", "The herbal steam is gentler than the sauna.", [
          "/ˈhɜːbəl stiːm/",
          "Xông hơi thảo dược",
          "🌿",
        ]),
        c("Circulation", "A foot massage helps the circulation in your legs.", [
          "/ˌsɜːkjəˈleɪʃən/",
          "Sự tuần hoàn (máu)",
          "💓",
        ]),
        c("Pressure", "Would you like light or firm pressure today?", [
          "/ˈpreʃə/",
          "Lực ấn, áp lực (khi massage)",
          "✋",
        ]),
      ],
      grammar: [
        g(
          "Hot stone better. Take.",
          "I recommend the hot stone massage, sir. It is deeper than the traditional one.",
          "Tính từ ngắn so sánh hơn: thêm -er + than. deep → deeper than. Không dùng 'more deep'.",
          "I recommend the hot stone massage, sir. It is more deep than the traditional one.",
        ),
        g(
          "Steam soft, sauna hard.",
          "The herbal steam is gentler than the sauna, madam.",
          "gentle → gentler than. Thiếu -r là chưa so sánh.",
          "The herbal steam is gentle than the sauna, madam.",
        ),
      ],
      speaking: [
        sp(
          "My shoulders are very stiff. Which massage is better for me?",
          t2a,
          "Gợi ý MỘT liệu trình và so sánh bằng -er + than.",
        ),
        risk(
          sp(
            "Good. I should say that I have high blood pressure.",
            t2b,
            "Huyết áp cao: KHÔNG đá nóng, KHÔNG xông hơi khô. Nói rõ cả hai, không tranh luận.",
            undefined,
            ["offer", "hot", "stone", "sauna"],
            t2a,
          ),
        ),
        sp(
          "Then what do you recommend for my shoulders?",
          t2c,
          "Gợi ý lại trong giới hạn an toàn, và nói quản lý xem phiếu sức khỏe trước.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "Is the herbal steam the same as the sauna?",
          "No, madam. The herbal steam is gentler than the sauna, and it smells of lemongrass.",
          "Trả lời câu so sánh bằng một câu so sánh, thêm một chi tiết khách cảm nhận được.",
        ),
        sp(
          "My legs feel heavy after the long flight.",
          "I recommend the foot massage, madam. It is good for your circulation.",
          "Nhu cầu → một gợi ý → một lợi ích.",
        ),
      ],
      reading: read(
        `Mr Lund has stiff shoulders and asks about the hot stone massage. Tuan explains that it is deeper than the traditional massage. Then Mr Lund says he has high blood pressure. Tuan does not offer the hot stone or the sauna. He recommends a gentle massage with light pressure, and his manager checks the health form first.`,
        [
          {
            q: "Vì sao Tuấn không mời khách dùng đá nóng và xông hơi khô?",
            options: [
              "Vì phòng đá nóng hôm đó đã kín lịch",
              "Vì đá nóng đắt hơn massage truyền thống",
              "Vì khách vừa nói mình bị huyết áp cao",
            ],
            correct: 2,
            explanation:
              "'Mr Lund says he has high blood pressure. Tuan does not offer the hot stone or the sauna' — nhiệt là chống chỉ định với huyết áp cao.",
          },
          {
            q: "Ai xem phiếu sức khỏe trước khi bắt đầu?",
            options: [
              "Khách tự đọc lại phiếu của mình",
              "Quản lý của Tuấn",
              "Kỹ thuật viên của ca tối hôm đó",
            ],
            correct: 1,
            explanation:
              "'his manager checks the health form first' — gợi ý của kỹ thuật viên vẫn đi qua bước kiểm tra.",
          },
        ],
      ),
      game: [
        game(
          "Which is easier for me, the sauna or the herbal steam? I get hot quickly.",
          "The herbal steam is gentler, madam. It is not as hot as the sauna.",
          "Steam more gentle than sauna, okay.",
          "They are both very nice, madam, so please just choose the one you like more today.",
          undefined,
          "Câu cuối không giúp khách chọn, dù khách vừa nói mình dễ bị nóng. Câu đúng so sánh rõ MỘT điểm khách quan tâm: độ nóng.",
        ),
      ],
    }),

    L(23, 3, "Packages Without Pushing", "Gợi ý gói mà không ép khách", {
      vocabulary: [
        c("Package", "Our four-session package is cheaper than four single massages.", [
          "/ˈpækɪdʒ/",
          "Gói dịch vụ",
          "🎁",
        ]),
        c("Combo", "The combo has a massage and a facial in one visit.", [
          "/ˈkɒmbəʊ/",
          "Gói kết hợp",
          "🧖",
        ]),
        c("Complimentary", "Herbal tea is complimentary after every treatment.", [
          "/ˌkɒmplɪˈmentəri/",
          "Miễn phí (đi kèm)",
          "🍵",
        ]),
        c("Draping technique", "Our draping technique keeps a towel over you during the massage.", [
          "/ˈdreɪpɪŋ tekˈniːk/",
          "Kỹ thuật phủ khăn giữ kín đáo cho khách",
          "🩹",
        ]),
      ],
      grammar: [
        g(
          "Buy package, cheap.",
          "The package is cheaper than four single sessions, madam.",
          "cheap → cheaper than. Nói lợi ích bằng so sánh, không ép mua.",
          "The package is cheap than four single sessions, madam.",
        ),
        g(
          "Tea free.",
          "The herbal tea is complimentary, madam. There is no charge.",
          "'The herbal tea' là danh từ không đếm được → 'is'. 'Complimentary' = đi kèm, không tính tiền.",
          "The herbal tea are complimentary, madam. There is no charge.",
        ),
      ],
      speaking: [
        sp(
          "We are staying for two weeks. I would like a massage every few days.",
          t3a,
          "Khách nói nhu cầu dài ngày — lúc đó gói mới là gợi ý đúng. Nêu một lợi ích so sánh.",
        ),
        sp(
          "What is in the package?",
          t3b,
          "Nói đủ: số buổi, món đi kèm, thời hạn dùng.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Thank you, but I will just book one for today.",
          t3c,
          "Khách từ chối gói: đồng ý ngay, làm đúng điều khách muốn. Không gợi ý lần hai.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "Will I be covered during the massage? I feel a bit shy.",
          "Yes, madam. Our draping technique keeps a towel over you all the time.",
          "Trấn an bằng sự thật về quy trình: kỹ thuật phủ khăn.",
        ),
        sp(
          "My husband would like to come with me next time.",
          "Then I recommend the couple's combo, madam. It is better value than two single bookings.",
          "Gợi ý gói đôi chỉ khi khách nhắc tới người đi cùng.",
        ),
      ],
      reading: read(
        `Mrs Lopez is staying for two weeks and wants a massage every few days. Thu recommends the four-session package, because it is cheaper than four single massages. Mrs Lopez says she only wants one massage today. Thu does not push. She books one massage and says the package lasts three months, in case Mrs Lopez changes her mind.`,
        [
          {
            q: "Vì sao Thu gợi ý gói bốn buổi?",
            options: [
              "Vì khách sạn yêu cầu bán gói cho mọi khách",
              "Vì gói có thêm một buổi massage miễn phí",
              "Vì gói rẻ hơn bốn buổi lẻ, mà khách ở hai tuần",
            ],
            correct: 2,
            explanation:
              "'staying for two weeks' và 'cheaper than four single massages' — gợi ý đi theo nhu cầu khách vừa nói.",
          },
          {
            q: "Khi khách chỉ muốn một buổi, Thu làm gì?",
            options: [
              "Đặt đúng một buổi, không ép thêm",
              "Giải thích lại giá gói để khách đổi ý",
              "Hẹn quản lý gọi điện để chào gói sau",
            ],
            correct: 0,
            explanation:
              "'Thu does not push. She books one massage' — gợi ý một lần là phục vụ, ép mãi là làm khách khó chịu.",
          },
        ],
      ),
      game: [
        game(
          "Do I have to buy the package to get the herbal tea?",
          "No, madam. The herbal tea is complimentary with every treatment.",
          "Tea free, package no need.",
          "Yes, madam. The tea is only for package guests.",
          undefined,
          "Câu cuối nói sai sự thật để bán gói. Câu đúng nói rõ trà đi kèm mọi liệu trình — khách tự quyết có mua gói hay không.",
        ),
      ],
    }),

    L(23, 4, "After the Treatment", "Sau liệu trình", {
      vocabulary: [
        c("Feedback", "May I ask for your feedback on today's massage?", [
          "/ˈfiːdbæk/",
          "Phản hồi, góp ý",
          "💬",
        ]),
        c("Essential oil", "This essential oil has lavender in it.", [
          "/ɪˈsenʃəl ɔɪl/",
          "Tinh dầu",
          "🧴",
        ]),
        c("Moisturize", "This cream will moisturize your skin after the steam.", [
          "/ˈmɔɪstʃəraɪz/",
          "Dưỡng ẩm",
          "💧",
        ]),
      ],
      grammar: [
        g(
          "How was? Good?",
          "May I ask for your feedback on the massage, madam?",
          "'May I + động từ nguyên mẫu' để xin ý kiến lịch sự. Sau 'may' không thêm -ing.",
          "May I asking for your feedback on the massage, madam?",
        ),
        g(
          "Buy this cream.",
          "This cream is lighter than the body oil, and it will moisturize your skin.",
          "So sánh hơn để giới thiệu (lighter than), rồi một lợi ích. Sau 'will' động từ ở dạng gốc.",
          "This cream is lighter than the body oil, and it will moisturizes your skin.",
        ),
      ],
      speaking: [
        sp(
          "That was wonderful. My skin feels a bit dry, though.",
          t4a,
          "Khách tự nói nhu cầu (da khô) — lúc đó mới gợi ý sản phẩm.",
        ),
        sp(
          "Is it the same as the oil you used?",
          t4b,
          "So sánh hai sản phẩm bằng -er + than, nói một điểm khác.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "No, thank you. I do not need anything today.",
          t4c,
          "Khách từ chối: cảm ơn, chúc khách, dừng giới thiệu.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "The massage was good, but the music was a bit loud.",
          "Thank you for your feedback, madam. I will tell my manager about the music.",
          "Góp ý của khách: cảm ơn và nói bạn chuyển cho ai.",
        ),
        sp(
          "Can I buy the essential oil you used today?",
          "Of course, sir. This essential oil has lavender in it, and it helps you relax.",
          "Nói thành phần chính của tinh dầu trước khi bán.",
        ),
      ],
      reading: read(
        `After her massage, Ms Chen says her skin feels dry. Lan recommends the aloe cream, which is lighter than the body oil. Ms Chen says no, thank you. Lan accepts at once and asks for her feedback. Ms Chen says the music was a bit loud, so Lan tells her manager the same day.`,
        [
          {
            q: "Lan làm gì khi khách từ chối kem dưỡng?",
            options: [
              "Giới thiệu thêm một loại kem rẻ hơn",
              "Chấp nhận ngay và hỏi ý kiến của khách",
              "Đưa mẫu thử miễn phí để khách mang về nhà dùng",
            ],
            correct: 1,
            explanation:
              "'Lan accepts at once and asks for her feedback' — khách nói không thì dừng bán, chuyển sang lắng nghe.",
          },
          {
            q: "Lan làm gì với góp ý về tiếng nhạc?",
            options: [
              "Tự tắt nhạc ở mọi phòng trị liệu",
              "Ghi nhớ để lần sau tự điều chỉnh âm lượng",
              "Báo quản lý ngay trong ngày hôm đó",
            ],
            correct: 2,
            explanation:
              "'Lan tells her manager the same day' — góp ý được chuyển tới người có thể sửa cho cả spa.",
          },
        ],
      ),
      game: [
        game(
          "Thank you, but I do not want to buy anything today.",
          "Of course, madam. Thank you for coming, and enjoy your evening.",
          "Okay. No buy. Bye.",
          "Are you sure, madam? This cream is much better than the one you use at home.",
          undefined,
          "Câu cuối ép khách sau khi khách đã từ chối. Câu đúng chấp nhận ngay và chào khách tử tế.",
        ),
      ],
    }),
  ];
}

// ── Week 24 — Have to + because: a rule with its real reason ──────────
function week24(): LessonContent[] {
  const t1a = "We have to charge a no-show fee because the room was kept for you.";
  const t1b =
    "I am sorry, sir. The cancellation window is four hours, and it is on your booking card.";
  const t1c = "I am sorry, I cannot change the fee. My manager will call you this afternoon.";
  const t2a =
    "Because some treatments use heat, madam. The therapist has to know your health first.";
  const t2b = "Thank you, madam. I cannot start the massage without a doctor's note.";
  const t2c = "I understand, madam. We have this rule because your safety comes first.";
  const t3a = "I am sorry, sir. Guests have to wear swimwear in the pool.";
  const t3b = "The spa shop sells swimwear, sir, and it is open until eight.";
  const t3c = "I understand, sir. You can still use the sauna with a towel.";
  const t4a =
    "I am sorry, sir. Because of our late arrival policy, the massage has to end at four.";
  const t4b = "The next guest is booked at four, sir, so we have to finish on time.";
  const t4c = "Of course, sir. There is a session extension fee for thirty extra minutes.";
  return [
    L(24, 1, "There Is a Charge", "Có một khoản phí", {
      vocabulary: [
        c("Charge", "There is a charge for a late cancellation."),
        c("No-show fee", "There is a no-show fee when a guest misses the booking."),
        c(
          "Cancellation window",
          "The cancellation window closes four hours before your treatment.",
        ),
        c(
          "Booking notice period",
          "For a group of four or more, the booking notice period is one day.",
        ),
      ],
      grammar: [
        g(
          "You no come, you pay.",
          "We have to charge a no-show fee because the room was kept for you.",
          "'have to + động từ nguyên mẫu' = việc bắt buộc; 'because' + LÝ DO THẬT. 'Vì đó là quy định' chưa phải là lý do.",
          "We have to charging a no-show fee because the room was kept for you.",
        ),
        g(
          "Cancel late, money.",
          "There is a charge because the cancellation window closes four hours before.",
          "'because' + một mệnh đề (chủ ngữ + động từ). 'because of' chỉ đi với danh từ.",
          "There is a charge because of the cancellation window closes four hours before.",
        ),
      ],
      speaking: [
        sp(
          "Why is there a no-show fee on my bill?",
          t1a,
          "Nêu lý do thật bằng 'because': phòng và kỹ thuật viên đã được giữ cho khách.",
        ),
        sp(
          "Nobody told me about that.",
          t1b,
          "Không cãi khách. Xin lỗi, rồi nói quy định và chỗ khách đọc được nó.",
          undefined,
          undefined,
          t1a,
        ),
        risk(
          sp(
            "Can you just take it off my bill?",
            t1c,
            "Bỏ phí là quyết định về tiền: bạn KHÔNG tự bỏ. Nói rõ quản lý gọi lại và lúc nào.",
            undefined,
            ["change", "fee", "manager", "call"],
            t1b,
          ),
        ),
        sp(
          "Can I book massages for six friends this evening?",
          "I am sorry, madam. For a group of six, the booking notice period is one day.",
          "Báo quy định kèm con số cụ thể, rồi để khách chọn ngày khác.",
        ),
        sp(
          "I want to cancel my massage at two. It is noon now.",
          "There is a late cancellation charge, madam, because the window is four hours.",
          "Báo phí trước khi khách hủy, kèm lý do. Không để khách tự phát hiện trên hóa đơn.",
        ),
      ],
      reading: read(
        `Mr Brandt missed his massage yesterday, and there is a no-show fee on his bill. Nam explains: "We have to charge the fee because the room was kept for you." Mr Brandt says nobody told him. Nam does not argue. He cannot change the fee himself, so his manager calls Mr Brandt that afternoon.`,
        [
          {
            q: "Nam giải thích lý do của phí không đến là gì?",
            options: [
              "Khách sạn luôn tính phí cho mọi lịch hẹn",
              "Phòng trị liệu đã được giữ cho khách",
              "Khách đã hủy lịch quá sát giờ hai lần",
            ],
            correct: 1,
            explanation:
              "'because the room was kept for you' — lý do thật, khách hiểu được, không phải 'vì đó là quy định'.",
          },
          {
            q: "Ai xem xét khoản phí sau đó?",
            options: [
              "Quản lý của Nam, gọi cho khách buổi chiều",
              "Nam tự bỏ phí khỏi hóa đơn của khách",
              "Quầy lễ tân khách sạn, khi khách trả phòng hôm sau",
            ],
            correct: 0,
            explanation:
              "'He cannot change the fee himself, so his manager calls' — nhân viên giải thích, quản lý quyết về tiền.",
          },
        ],
      ),
      game: [
        game(
          "I cancelled two hours before. Why do I still have to pay?",
          "Because the cancellation window is four hours, madam. There is a late charge.",
          "Because rule. Two hour too late.",
          "Do not worry, madam. I can take the charge off your bill myself this time.",
          undefined,
          "Câu cuối tự bỏ phí — đó là quyết định của quản lý. Câu đúng nêu lý do thật: thời hạn hủy là bốn giờ.",
        ),
      ],
    }),

    L(24, 2, "Because — the Real Reason", "Nêu lý do thật bằng 'because'", {
      vocabulary: [
        c("Because", "We ask about your health because some treatments use heat."),
        c(
          "Health declaration form",
          "Every guest signs the health declaration form before the first treatment.",
        ),
        c(
          "Medical clearance rule",
          "After an operation, our medical clearance rule asks for a doctor's note.",
        ),
        c("Doctor's note", "Please bring a doctor's note after an operation.", [
          "/ˈdɒktəz nəʊt/",
          "Giấy xác nhận của bác sĩ",
          "📝",
        ]),
      ],
      grammar: [
        g(
          "Fill form. Rule.",
          "You have to fill in the health declaration form because some treatments use heat.",
          "'have to' + động từ nguyên mẫu (fill), không thêm -ing. Lý do sau 'because' phải là lý do thật.",
          "You have to filling in the health declaration form because some treatments use heat.",
        ),
        g(
          "Operation? No massage.",
          "I am sorry, madam. After an operation, we have to see a doctor's note first.",
          "'we have to see' — sau 'have to' là động từ nguyên mẫu, không chia -s.",
          "I am sorry, madam. After an operation, we have to sees a doctor's note first.",
        ),
      ],
      speaking: [
        sp(
          "Why do I have to fill in a health form for a massage?",
          t2a,
          "Khách hỏi vì sao: trả lời bằng 'because' + lý do thật, rồi nói kỹ thuật viên phải biết gì.",
        ),
        risk(
          sp(
            "I had a knee operation three weeks ago.",
            t2b,
            "Sau phẫu thuật: KHÔNG bắt đầu khi chưa có giấy bác sĩ. Đó là quy định xác nhận y tế, không phải ý của bạn.",
            undefined,
            ["start", "massage", "doctor's", "note"],
            t2a,
          ),
        ),
        sp(
          "But it was only a small operation!",
          t2c,
          "Công nhận cảm xúc, nêu lý do của quy định — sự an toàn của khách. Không nhượng bộ.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "Who reads my health declaration form?",
          "Your therapist reads it before the treatment, madam, and my manager checks any medical condition.",
          "Nói rõ ai đọc phiếu và ai xem các bệnh lý.",
        ),
      ],
      reading: read(
        `Mrs Novak fills in the health declaration form. She writes that she had a knee operation three weeks ago. Linh does not start the massage. She explains the medical clearance rule: after an operation, the spa has to see a doctor's note first. Massage near a new wound can be dangerous. Mrs Novak brings the note the next day.`,
        [
          {
            q: "Vì sao Linh chưa bắt đầu massage?",
            options: [
              "Vì khách chưa có giấy xác nhận của bác sĩ",
              "Vì khách chưa trả tiền cho liệu trình đó",
              "Vì phòng trị liệu lúc đó chưa được chuẩn bị xong",
            ],
            correct: 0,
            explanation:
              "'after an operation, the spa has to see a doctor's note first' — quy định xác nhận y tế, có lý do rõ ràng.",
          },
          {
            q: "Linh nêu lý do gì cho quy định này?",
            options: [
              "Khách sạn không muốn mất thời gian của kỹ thuật viên",
              "Bác sĩ của khách yêu cầu khách sạn như vậy",
              "Massage gần vết mổ mới có thể gây nguy hiểm",
            ],
            correct: 2,
            explanation:
              "'Massage near a new wound can be dangerous' — lý do thật về an toàn của khách, không phải 'vì đó là quy định'.",
          },
        ],
      ),
      game: [
        game(
          "My operation was last month, but I feel fine now. Can we start?",
          "I am glad you feel better, sir. We have to see a doctor's note first.",
          "Operation, no. Doctor paper.",
          "If you feel fine, sir, I am sure it is no problem. We can start now and be careful.",
          undefined,
          "Câu cuối tự quyết là 'không sao' — kỹ thuật viên không chẩn đoán và không bỏ qua quy định. Câu đúng giữ quy định xác nhận y tế.",
        ),
      ],
    }),

    L(24, 3, "A Rule Without Blame", "Nói quy định mà không trách khách", {
      vocabulary: [
        c("Policy", "Our spa policy is printed on the back of the menu."),
        c("Swimwear rule", "Our swimwear rule is for the pool and the steam room."),
        c("Silence rule", "The relaxation area has a silence rule, so we speak softly."),
        c("Minimum age rule", "Our minimum age rule for the steam room is sixteen."),
      ],
      grammar: [
        g(
          "No shorts. Change.",
          "Guests have to wear swimwear in the pool because of our swimwear rule.",
          "'Guests' số nhiều → 'have to', không phải 'has to'. 'because of' + danh từ (our swimwear rule).",
          "Guests has to wear swimwear in the pool because of our swimwear rule.",
        ),
        g(
          "Quiet! Rule!",
          "I am sorry, madam. The relaxation area has a silence rule because guests are resting.",
          "'The relaxation area' là một nơi → 'has'. Nói lý do, không quát khách.",
          "I am sorry, madam. The relaxation area have a silence rule because guests are resting.",
        ),
      ],
      speaking: [
        sp(
          "I forgot my swimsuit. Can I swim in my shorts?",
          t3a,
          "Nói quy định nhẹ nhàng — báo thông tin, không trách khách quên.",
        ),
        sp(
          "Where can I get some?",
          t3b,
          "Đưa giải pháp cụ thể: ở đâu, mở đến mấy giờ.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "That is a bit expensive for one swim.",
          t3c,
          "Khách không muốn mua: không ép, đưa một lựa chọn khác trong quy định.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "Can my twelve-year-old daughter use the steam room with me?",
          "I am sorry, madam. Our minimum age rule for the steam room is sixteen.",
          "Quy định tuổi tối thiểu: nói con số, không cần tranh luận.",
        ),
        sp(
          "Why is everybody so quiet in here?",
          "This is the relaxation area, sir. It has a silence rule because guests are resting.",
          "Giải thích quy định bằng lý do, giọng nhỏ.",
        ),
      ],
      reading: read(
        `Mr Dale wants to swim in his shorts. Vy explains the swimwear rule politely: guests have to wear swimwear in the pool. She tells him the spa shop sells swimwear. Later, a mother asks if her twelve-year-old daughter can use the steam room. Vy explains the minimum age rule: sixteen, because the steam room is very hot for children.`,
        [
          {
            q: "Vy nói gì với khách quên đồ bơi?",
            options: [
              "Khách có thể bơi một lần, không ai để ý",
              "Khách phải mặc đồ bơi; cửa hàng spa có bán",
              "Khách nên quay về phòng và đổi ngày khác",
            ],
            correct: 1,
            explanation:
              "'guests have to wear swimwear in the pool' và 'the spa shop sells swimwear' — quy định đi kèm một giải pháp.",
          },
          {
            q: "Vì sao trẻ mười hai tuổi chưa được vào phòng xông hơi ướt?",
            options: [
              "Vì phòng xông hơi chỉ dành cho khách đặt gói",
              "Vì hôm đó phòng xông hơi đang được bảo trì",
              "Vì phòng xông hơi rất nóng đối với trẻ em",
            ],
            correct: 2,
            explanation:
              "'sixteen, because the steam room is very hot for children' — quy định tuổi có lý do an toàn.",
          },
        ],
      ),
      game: [
        game(
          "Can I make a quick phone call here in the relaxation area?",
          "I am sorry, sir. This area has a silence rule. The lobby is just outside.",
          "No phone. Silence. Go out.",
          "Of course, sir, but please be quick.",
          undefined,
          "Câu cuối cho phép phá quy định giữ yên lặng. Câu đúng nói quy định và chỉ chỗ khách gọi điện được.",
        ),
      ],
    }),

    L(24, 4, "Explaining the Policy", "Giải thích quy định", {
      vocabulary: [
        c("Late arrival policy", "Our late arrival policy means the treatment still ends on time."),
        c("Session extension fee", "There is a session extension fee for thirty extra minutes."),
        c("Locker deposit", "The locker deposit comes back when you return the key."),
        c("Pool towel charge", "There is a pool towel charge if a towel leaves the spa."),
      ],
      grammar: [
        g(
          "You late. Short massage.",
          "Because of our late arrival policy, your massage has to finish at four, sir.",
          "'your massage' là số ít → 'has to'. 'Because of' + danh từ đứng đầu câu.",
          "Because of our late arrival policy, your massage have to finish at four, sir.",
        ),
        g(
          "Key back, money back.",
          "You will get the locker deposit back when you return the key.",
          "Sau 'when' (nói về tương lai) dùng hiện tại: 'when you return', không dùng 'will'.",
          "You will get the locker deposit back when you will return the key.",
        ),
      ],
      speaking: [
        sp(
          "I am twenty minutes late. Do I still get my full hour?",
          t4a,
          "Nói quy định + giờ kết thúc. Không trách khách đến muộn.",
        ),
        sp(
          "Can you not just finish later?",
          t4b,
          "Lý do thật bằng 'so': có khách tiếp theo lúc bốn giờ.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "Fine. Next time, can I book a longer massage?",
          t4c,
          "Khách muốn thêm thời gian lần sau: báo rõ có phí kéo dài buổi.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "Why did you take a deposit for the locker?",
          "We take a locker deposit because keys go missing, madam. It comes back when you return the key.",
          "Lý do + khi nào khách nhận lại tiền cọc.",
        ),
        sp(
          "I would like to take a pool towel to the beach.",
          "I am sorry, madam. There is a pool towel charge if a towel leaves the spa.",
          "Báo phí trước, nhẹ nhàng, để khách tự chọn.",
        ),
      ],
      reading: read(
        `Mr Kato arrives twenty minutes late for his massage at three. Hung explains the late arrival policy: the massage has to end at four, because the next guest is booked. Mr Kato is not happy, but he understands the reason. For next time, Hung tells him about the session extension fee for a longer massage.`,
        [
          {
            q: "Vì sao massage của khách vẫn phải kết thúc lúc bốn giờ?",
            options: [
              "Vì có khách tiếp theo đã đặt lúc bốn giờ",
              "Vì kỹ thuật viên của khách hết ca lúc bốn giờ",
              "Vì khách đã yêu cầu kết thúc sớm hơn",
            ],
            correct: 0,
            explanation:
              "'because the next guest is booked' — quy định khách đến muộn có lý do thật, nói được với khách.",
          },
          {
            q: "Hùng nói gì với khách về lần sau?",
            options: [
              "Lần sau khách được tặng thêm ba mươi phút",
              "Có phí kéo dài buổi nếu khách muốn lâu hơn",
              "Khách nên đến sớm mười lăm phút để được ưu tiên",
            ],
            correct: 1,
            explanation:
              "'the session extension fee for a longer massage' — thêm thời gian là dịch vụ có phí, không phải quà tặng.",
          },
        ],
      ),
      game: [
        game(
          "Why is there a towel charge on my bill? I only took it to my room.",
          "There is a pool towel charge when a towel leaves the spa, madam.",
          "Towel go out, you pay.",
          "I am sorry, madam. You must have lost it, so you have to pay for the towel.",
          undefined,
          "Câu cuối đoán và quy lỗi cho khách. Câu đúng chỉ nêu quy định — khách hiểu vì sao có phí.",
        ),
      ],
    }),
  ];
}

// ── Week 25 — A promise with a number in it ─────────────────────────────
function week25(): LessonContent[] {
  const t1a = "Welcome, madam. I will prepare the treatment room within ten minutes.";
  const t1b = "Of course. I will bring you some herbal tea straight away.";
  const t1c = "We are going to heat the herbal compress now. It needs fifteen minutes.";
  const t2a = "Congratulations, sir. We are going to reserve the couple's suite for you at six.";
  const t2b = "Of course. I will confirm your therapist by noon and call your room.";
  const t2c = "Yes, sir. We will set up the foot bath by a quarter to six.";
  const t3a = "Of course, madam. I will call you at the pool by two o'clock.";
  const t3b = "Yes, madam. I will update the treatment schedule and call you within five minutes.";
  const t3c = "I will send the health form to your room by six this evening.";
  const t4a = "I will stop the facial now, madam, and clean your skin with cool water.";
  const t4b = "I cannot say, madam. My supervisor will be here within two minutes.";
  const t4c = "Of course, madam. I will stay with you until she arrives.";
  return [
    L(25, 1, "Within Ten Minutes", "Trong vòng mười phút", {
      vocabulary: [
        c("Within", "I will prepare your room within ten minutes."),
        c("Straight away", "I will bring you a glass of water straight away."),
        c("Prepare the treatment room", "I will prepare the treatment room before you arrive."),
        c(
          "Heat the herbal compress",
          "We heat the herbal compress for fifteen minutes before the massage.",
        ),
      ],
      grammar: [
        g(
          "Room ready soon.",
          "I will prepare the treatment room within ten minutes, madam.",
          "Lời hứa có mốc cụ thể: 'within + số phút'. 'Soon' không phải là lời hứa. Sau 'will' động từ ở dạng gốc.",
          "I will preparing the treatment room within ten minutes, madam.",
        ),
        g(
          "Water? Wait.",
          "I will bring you a glass of water straight away, sir.",
          "'straight away' = ngay lập tức, đứng cuối câu. 'will bring', không phải 'will brings'.",
          "I will brings you a glass of water straight away, sir.",
        ),
      ],
      speaking: [
        sp(
          "We are here early for our massage. Is the room ready?",
          t1a,
          "Lời hứa phải có con số: 'within ten minutes'. Đừng nói 'soon'.",
        ),
        sp(
          "That is fine. Can we have some tea while we wait?",
          t1b,
          "Việc nhỏ, làm được ngay thì làm ngay — không cần hẹn giờ.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Is the herbal compress ready too?",
          t1c,
          "Kế hoạch đã sắp xếp: 'going to' + thời gian cần thiết.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "The shower in the changing room is cold.",
          "I am sorry, sir. I will ask a colleague to check it within ten minutes.",
          "Xin lỗi + ai làm + mốc giờ.",
        ),
      ],
      reading: read(
        `Mr and Mrs Sato arrive early for their massage. Quynh promises to prepare the treatment room within ten minutes, and she brings them herbal tea straight away. The herbal compress needs fifteen minutes to heat, so Quynh tells them the exact start time. At a quarter past three, the room and the compress are both ready.`,
        [
          {
            q: "Quỳnh hứa chuẩn bị phòng trị liệu trong bao lâu?",
            options: ["Trong vòng mười lăm phút", "Ngay lập tức", "Trong vòng mười phút"],
            correct: 2,
            explanation:
              "'prepare the treatment room within ten minutes' — lời hứa có con số cụ thể. Mười lăm phút là thời gian làm nóng túi chườm.",
          },
          {
            q: "Vì sao Quỳnh báo cho khách giờ bắt đầu chính xác?",
            options: [
              "Vì túi chườm thảo dược cần mười lăm phút để làm nóng",
              "Vì khách muốn đi ăn trưa trước khi bắt đầu massage",
              "Vì phòng trị liệu chỉ trống sau ba giờ mười lăm",
            ],
            correct: 0,
            explanation:
              "'The herbal compress needs fifteen minutes to heat, so…' — lời hứa dựa trên thời gian thật của công việc.",
          },
        ],
      ),
      game: [
        game(
          "How long until our treatment room is ready?",
          "Within ten minutes, madam. I will prepare it now.",
          "Room is ready soon soon, madam, you wait here and I go to make it now.",
          "As soon as possible, madam. We are very busy this afternoon, I am afraid.",
          undefined,
          "'As soon as possible' không phải lời hứa: khách không biết phải chờ đến khi nào. Câu đúng có con số: 'within ten minutes'.",
        ),
      ],
    }),

    L(25, 2, "By Six O'clock", "Trước sáu giờ", {
      vocabulary: [
        c("Going to", "We are going to reserve the couple's suite for six o'clock."),
        c("Set up the foot bath", "I will set up the foot bath before your massage."),
        c("Reserve the couple's suite", "I will reserve the couple's suite for your anniversary."),
        c("Confirm your therapist", "I will confirm your therapist by noon."),
      ],
      grammar: [
        g(
          "Suite okay, six.",
          "We are going to reserve the couple's suite for six o'clock, sir.",
          "'be going to' cho kế hoạch đã sắp xếp — không bỏ 'are'.",
          "We going to reserve the couple's suite for six o'clock, sir.",
        ),
        g(
          "Therapist later I tell.",
          "I will confirm your therapist by noon and call your room.",
          "Hai việc trong một lời hứa nối bằng 'and': cả hai đều ở dạng gốc sau 'will'. 'by noon' = không muộn hơn trưa.",
          "I will confirm your therapist by noon and calling your room.",
        ),
      ],
      speaking: [
        sp(
          "It is our anniversary today. Can we have a massage together tonight?",
          t2a,
          "Kế hoạch đã chốt: 'going to' + giờ cụ thể.",
        ),
        sp(
          "My wife would like a female therapist.",
          t2b,
          "Hứa có mốc (by noon) và nói cách bạn báo lại.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Could we have a foot bath before the massage?",
          t2c,
          "Mốc của việc phụ phải trước mốc của việc chính.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "Is there a therapist free this afternoon?",
          "Yes, madam. I am going to book you with Hoa at four o'clock.",
          "'going to' cho việc bạn đã quyết định sắp xếp.",
        ),
      ],
      reading: read(
        `Mr Okafor calls the spa at ten. It is his wedding anniversary, and he wants a couple's massage tonight. Dung reserves the couple's suite for six o'clock. His wife would like a female therapist, so Dung confirms the therapist by noon and calls the room. The foot bath is ready at a quarter to six.`,
        [
          {
            q: "Dũng hứa xác nhận kỹ thuật viên lúc nào?",
            options: ["Trước sáu giờ tối", "Trước buổi trưa", "Ngay trong cuộc gọi"],
            correct: 1,
            explanation:
              "'confirms the therapist by noon' — 'by noon' = không muộn hơn mười hai giờ trưa.",
          },
          {
            q: "Vì sao chậu ngâm chân sẵn sàng lúc sáu giờ kém mười lăm?",
            options: [
              "Vì ngâm chân diễn ra trước buổi massage lúc sáu giờ",
              "Vì vợ khách muốn ngâm chân sau bữa tối",
              "Vì phòng trị liệu đôi chỉ mở cửa sau sáu giờ",
            ],
            correct: 0,
            explanation:
              "Phòng đôi đặt lúc 'six o'clock'; ngâm chân là bước trước — mốc của việc phụ đi trước mốc của việc chính.",
          },
        ],
      ),
      game: [
        game(
          "Can you tell us which therapist we will have tonight?",
          "I will confirm your therapist by noon and call your room, sir.",
          "Therapist later. I tell you.",
          "I am not sure yet, sir. Just come down at six and you will see who it is.",
          undefined,
          "Câu cuối không hứa gì và để khách tự chờ. Câu đúng có mốc (by noon) và cách báo lại (call your room).",
        ),
      ],
    }),

    L(25, 3, "Keeping the Guest Informed", "Báo cho khách tiến độ", {
      vocabulary: [
        c("Call you at the pool", "I will call you at the pool when your therapist is ready."),
        c("Update the treatment schedule", "I will update the treatment schedule after your call."),
        c("Send the health form", "We send the health form to your room the night before."),
        c("Refill the oil bottles", "I refill the oil bottles before the first guest arrives."),
      ],
      grammar: [
        g(
          "Wait, I call.",
          "I will call you at the pool by two o'clock, madam.",
          "'will call' — sau 'will' không thêm -s. 'by two o'clock' = không muộn hơn hai giờ.",
          "I will calls you at the pool by two o'clock, madam.",
        ),
        g(
          "Form room.",
          "We will send the health form to your room by six this evening.",
          "Hứa gửi gì, gửi đâu, trước mấy giờ. Sau 'will' dùng 'send', không dùng 'sent'.",
          "We will sent the health form to your room by six this evening.",
        ),
      ],
      speaking: [
        sp(
          "I would like to swim while I wait for my massage.",
          t3a,
          "Hứa bạn sẽ tìm khách ở đâu, trước mấy giờ.",
        ),
        sp(
          "Will you tell me if the time changes?",
          t3b,
          "Hai việc: cập nhật lịch và gọi khách — có con số.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Thank you. What about my health form for tomorrow?",
          t3c,
          "Lời hứa thứ ba vẫn có mốc giờ rõ ràng.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "The lavender oil bottle in room two is empty.",
          "Thanks. I will refill the oil bottles within ten minutes.",
          "Nói với đồng nghiệp: ngắn, có mốc, không xưng hô sir/madam.",
          "colleague",
        ),
      ],
      reading: read(
        `Ms Rivera wants to swim before her massage at two. Khoa promises to call her at the pool by two o'clock. At half past one, the therapist is running late, so Khoa updates the treatment schedule and calls Ms Rivera at once. She is happy to swim a little longer. Khoa also sends tomorrow's health form to her room.`,
        [
          {
            q: "Khoa làm gì khi kỹ thuật viên bị trễ?",
            options: [
              "Đợi khách tự quay lại quầy hỏi",
              "Cập nhật lịch trị liệu và gọi ngay cho khách",
              "Đổi sang một kỹ thuật viên khác mà không báo khách",
            ],
            correct: 1,
            explanation:
              "'updates the treatment schedule and calls Ms Rivera at once' — báo trước khi khách phải đi hỏi.",
          },
          {
            q: "Khoa gửi gì lên phòng khách?",
            options: [
              "Phiếu sức khỏe cho ngày mai",
              "Hóa đơn của buổi massage hôm nay",
              "Thực đơn trị liệu của tuần sau",
            ],
            correct: 0,
            explanation:
              "'sends tomorrow's health form to her room' — việc nhỏ đã hứa cũng được làm.",
          },
        ],
      ),
      game: [
        game(
          "Will somebody tell me when my therapist is ready? I will be swimming.",
          "Of course, madam. I will call you at the pool by two o'clock.",
          "Therapist ready, I tell, okay.",
          "Please come back to the spa desk and ask us now and then, madam. It is easier for us.",
          undefined,
          "Câu cuối đẩy việc theo dõi sang khách. Câu đúng nhận việc báo tin, nói rõ ở đâu và trước mấy giờ.",
        ),
      ],
    }),

    L(25, 4, "When Something Goes Wrong", "Khi có chuyện bất thường", {
      vocabulary: [
        c("Spa supervisors", "The spa supervisors are on duty all day."),
        c("Book your next visit", "Before you leave, I can book your next visit."),
        c("Check the steam room", "We check the steam room every hour."),
        c("Lay out fresh robes", "I will lay out fresh robes in the changing room."),
      ],
      grammar: [
        g(
          "Sorry late. Busy.",
          "I am very sorry for the wait. I will lay out fresh robes within five minutes.",
          "Xin lỗi + mốc MỚI cho ĐÚNG việc đã hứa. Sau 'will' là động từ nguyên mẫu, không thêm -ing.",
          "I am very sorry for the wait. I will laying out fresh robes within five minutes.",
        ),
        g(
          "Boss come.",
          "My supervisor is going to be here within two minutes, madam.",
          "'is going to be' — không bỏ 'is'. Có con số thì khách biết phải chờ bao lâu.",
          "My supervisor going to be here within two minutes, madam.",
        ),
      ],
      speaking: [
        risk(
          sp(
            "My face is burning after the mask!",
            t4a,
            "Da nóng rát: DỪNG ngay, làm sạch bằng nước mát. An toàn trước, giải thích sau.",
            undefined,
            ["facial", "clean", "skin", "cool", "water"],
          ),
        ),
        sp(
          "Is it an allergy? Should I see a doctor?",
          t4b,
          "Bạn KHÔNG chẩn đoán: 'I cannot say'. Hứa người có trách nhiệm tới, kèm con số.",
          undefined,
          ["supervisor", "within", "minutes"],
          t4a,
        ),
        sp(
          "Please stay here with me.",
          t4c,
          "Không để khách một mình khi có sự cố.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "You said ten minutes for the robes. It has been twenty.",
          "I am very sorry, madam. I will lay out fresh robes within five minutes.",
          "Trễ hẹn: xin lỗi, giữ ĐÚNG việc đã hứa, đưa mốc mới ngắn hơn.",
        ),
        sp(
          "The steam room feels much hotter than yesterday.",
          "Please do not use it now, sir. I will check the steam room straight away.",
          "Nghi có vấn đề về nhiệt: mời khách ra trước, kiểm tra ngay.",
        ),
        sp(
          "Can I book my next visit before I go?",
          "Of course, sir. I can book your next visit now, on any day you like.",
          "Nhận việc và hỏi ngày khách muốn.",
        ),
      ],
      reading: read(
        `During a facial, Mrs Ito says her face is burning. Ngoc stops at once and cleans her skin with cool water. Mrs Ito asks if it is an allergy. Ngoc does not guess. She says her supervisor will be there within two minutes, and she stays with Mrs Ito until the supervisor arrives.`,
        [
          {
            q: "Ngọc làm gì ĐẦU TIÊN khi khách nói mặt bị rát?",
            options: [
              "Hỏi khách đã dùng loại kem gì ở nhà",
              "Dừng lại và làm sạch da bằng nước mát",
              "Gọi giám sát rồi tiếp tục làm cho xong",
            ],
            correct: 1,
            explanation:
              "'Ngoc stops at once and cleans her skin with cool water' — dừng liệu trình là việc đầu tiên.",
          },
          {
            q: "Vì sao Ngọc không trả lời có phải dị ứng không?",
            options: [
              "Vì kỹ thuật viên không chẩn đoán bệnh",
              "Vì Ngọc không nghe rõ câu hỏi của khách",
              "Vì giám sát đã dặn không nói chuyện với khách",
            ],
            correct: 0,
            explanation:
              "'Ngoc does not guess' — chẩn đoán không phải việc của kỹ thuật viên; giám sát và y tá mới xem xét.",
          },
        ],
      ),
      game: [
        game(
          "This mask stings a lot. Is that normal?",
          "I will stop now, madam, and clean it off with cool water.",
          "It is normal, madam, you wait five minute more and then it is stop burning.",
          "A little stinging is normal with this mask, madam. Try to relax, and it will stop soon.",
          undefined,
          "Câu cuối tự kết luận 'bình thường' và tiếp tục — kỹ thuật viên không chẩn đoán. Câu đúng dừng ngay và làm sạch da.",
        ),
      ],
    }),
  ];
}

// ── Week 26 — One request, one owner ────────────────────────────────────
function week26(): LessonContent[] {
  const t1a = "Let me check with the gym instructors for you, sir.";
  const t1b = "The gym plans personal training, sir. I will transfer your call to them now.";
  const t1c = "Of course. I will tell the gym instructors that you have to finish by nine.";
  const t2a = "I am coming now, madam. I will help him out of the sauna.";
  const t2b = "I will take him to the cool area and call the hotel nurse now.";
  const t2c = "Yes, madam, a little cool water. The nurse will be here within five minutes.";
  const t3a =
    "Let me check with the nail technicians, madam. I will call you back within ten minutes.";
  const t3b = "Yes, madam. I have asked the nail technicians, and they are free at four.";
  const t3c = "Then I will ask the beauty therapists to call you before five.";
  const t4a = "I am sorry, madam. I have asked the spa linen staff to bring fresh robes now.";
  const t4b =
    "Yes, madam. The spa linen staff have brought fresh robes, and I checked them myself.";
  const t4c = "I am sorry, madam. I will tell my supervisor about it today.";
  return [
    L(26, 1, "Let Me Check With…", "Để tôi hỏi bộ phận…", {
      vocabulary: [
        c("Colleague", "My colleague at the gym will help you."),
        c("Transfer", "I will transfer your call to the gym."),
        c("Gym instructors", "The gym instructors plan personal training."),
      ],
      grammar: [
        g(
          "Not spa. Ask gym.",
          "Let me check with the gym instructors for you, sir.",
          "'Let me check with + bộ phận' — nhận việc thay khách, không đẩy khách đi. Sau 'let me' là động từ nguyên mẫu.",
          "Let me checking with the gym instructors for you, sir.",
        ),
        g(
          "Call gym yourself.",
          "The gym handles personal training. I will transfer your call now.",
          "Nói rõ ai phụ trách rồi TỰ chuyển máy. 'The gym' là một bộ phận → 'handles'.",
          "The gym handle personal training. I will transfer your call now.",
        ),
      ],
      speaking: [
        sp(
          "Can I book a personal trainer for tomorrow morning?",
          t1a,
          "Việc của phòng tập: nhận lời, tự hỏi giúp khách.",
        ),
        sp(
          "Can you not book it here at the spa desk?",
          t1b,
          "Nói rõ ai phụ trách và bạn chuyển máy ngay — một việc, một người làm.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Fine. Please tell them I start work at nine.",
          t1c,
          "Chuyển đúng ràng buộc của khách cho người làm việc.",
          undefined,
          undefined,
          t1b,
        ),
        risk(
          sp(
            "Hoa was wonderful. Can I have her phone number?",
            "I am sorry, I cannot give you her number. I can book your next visit with her.",
            "Số điện thoại của nhân viên là riêng tư: KHÔNG đưa. Đưa cách đúng — đặt lịch qua spa.",
            undefined,
            ["number", "book", "next", "visit"],
          ),
        ),
        sp(
          "Is there a colleague who speaks Japanese?",
          "Let me check with my colleague at the front desk, madam. I will call you back within ten minutes.",
          "'Let me check with' + người cụ thể + mốc gọi lại.",
        ),
      ],
      reading: read(
        `Mr Silva wants a personal trainer for tomorrow morning. Minh does not tell him to call the gym himself. He says, "Let me check with the gym instructors," and transfers the call. Later Mr Silva asks for Hoa's phone number, because he liked her massage. Minh does not give it. He books Mr Silva's next visit with Hoa instead.`,
        [
          {
            q: "Minh xử lý yêu cầu huấn luyện viên cá nhân thế nào?",
            options: [
              "Bảo khách tự gọi xuống phòng tập",
              "Hỏi phòng tập rồi chuyển máy cho khách",
              "Tự hứa một huấn luyện viên lúc bảy giờ sáng",
            ],
            correct: 1,
            explanation:
              "'Let me check with the gym instructors' và 'transfers the call' — nhận việc thay khách, rồi chuyển đúng người phụ trách.",
          },
          {
            q: "Vì sao Minh không đưa số điện thoại của Hoa?",
            options: [
              "Vì Minh không biết số điện thoại của Hoa",
              "Vì Hoa đã nghỉ việc ở spa từ tuần trước",
              "Vì số của nhân viên là thông tin riêng tư",
            ],
            correct: 2,
            explanation:
              "'Minh does not give it. He books Mr Silva's next visit with Hoa' — riêng tư của đồng nghiệp được giữ, khách vẫn được phục vụ.",
          },
        ],
      ),
      game: [
        game(
          "Can you give me the gym's number? I will call them myself.",
          "Let me transfer your call to the gym now, sir.",
          "Gym number is in the book, sir, you call them yourself, I am not do gym.",
          "Of course, sir. The gym is on the second floor, so you can just walk up and ask.",
          undefined,
          "Câu cuối đẩy khách tự đi hỏi. Câu đúng nhận việc và chuyển máy ngay cho khách.",
        ),
      ],
    }),

    L(26, 2, "I'll Ask Them To…", "Tôi sẽ nhờ họ…", {
      vocabulary: [
        c("Arrange", "I will arrange a quiet room for you."),
        c("Sauna attendants", "The sauna attendants check the heat every hour."),
        c("Pool attendants", "The pool attendants bring towels to the sun loungers."),
        c("Hotel nurses", "The hotel nurses come to the spa when a guest feels unwell."),
      ],
      grammar: [
        g(
          "Nurse come.",
          "I will ask the hotel nurse to come to the sauna now.",
          "'ask + người + to + động từ': giao việc rõ ai làm gì. Không bỏ 'to'.",
          "I will ask the hotel nurse come to the sauna now.",
        ),
        g(
          "Sauna hot. Somebody fix.",
          "I will ask the sauna attendants to check the heat, madam.",
          "Sau 'ask' là thẳng người được nhờ — không có 'to' trước người đó.",
          "I will ask to the sauna attendants to check the heat, madam.",
        ),
      ],
      speaking: [
        sp(
          "Come quickly! My husband feels dizzy in the sauna.",
          t2a,
          "Đi ngay, và đưa khách RA KHỎI chỗ nóng trước tiên.",
        ),
        risk(
          sp(
            "He is very hot, and his face is red.",
            t2b,
            "Chỗ mát + gọi y tá ngay. Không để khách một mình, không tự chẩn đoán.",
            undefined,
            ["take", "cool", "area", "call", "hotel", "nurse"],
            t2a,
          ),
        ),
        sp(
          "Can I give him some water?",
          t2c,
          "Một chút nước mát là được; nói rõ y tá tới trong bao lâu.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "Is the sauna meant to be this hot? I can hardly breathe in there.",
          "Thank you, sir. I will ask the sauna attendants to check the heat now.",
          "Một việc, đúng người làm: nhân viên phòng xông hơi.",
        ),
        sp(
          "Could someone bring towels to our sun loungers?",
          "Of course, madam. I will ask the pool attendants to bring towels within ten minutes.",
          "'ask + người + to + động từ' + mốc giờ.",
        ),
        sp(
          "I need a quiet room to rest after my massage.",
          "Of course, madam. I will arrange a quiet room for you now.",
          "'arrange' = sắp xếp. Nhận việc và làm ngay.",
        ),
      ],
      reading: read(
        `Mrs Berg runs to the spa desk: her husband feels dizzy in the sauna. Tuan goes at once and helps him out of the heat. He takes Mr Berg to the cool area and calls the hotel nurse. He gives him a little cool water and stays with him. The nurse arrives within five minutes.`,
        [
          {
            q: "Tuấn làm gì ĐẦU TIÊN?",
            options: [
              "Đưa khách ra khỏi phòng xông hơi khô",
              "Hỏi khách đã ở trong phòng bao lâu",
              "Gọi điện cho quản lý spa để xin ý kiến",
            ],
            correct: 0,
            explanation:
              "'helps him out of the heat' — đưa khách ra khỏi chỗ nóng là việc đầu tiên, trước mọi câu hỏi.",
          },
          {
            q: "Trong lúc chờ y tá, Tuấn làm gì?",
            options: [
              "Quay lại quầy để trả lời điện thoại",
              "Cho khách uống thuốc hạ sốt của spa",
              "Cho khách chút nước mát và ở lại cùng khách",
            ],
            correct: 2,
            explanation:
              "'gives him a little cool water and stays with him' — không cho thuốc, không bỏ khách một mình.",
          },
        ],
      ),
      game: [
        game(
          "I feel a bit faint. I think I stayed in the steam room too long.",
          "Please come and sit in the cool area, sir. I am calling the hotel nurse.",
          "You sit. Drink. Okay soon.",
          "That happens sometimes, sir. Go back to your room and rest, and you will feel better soon.",
          undefined,
          "Câu cuối để khách đang choáng tự đi về phòng một mình. Câu đúng đưa khách tới chỗ mát và gọi y tá.",
        ),
      ],
    }),

    L(26, 3, "Following Up", "Theo dõi việc với bộ phận khác", {
      vocabulary: [
        c("Spa therapists", "Our spa therapists start work at nine."),
        c("Nail technicians", "The nail technicians are free at four this afternoon."),
        c("Beauty therapists", "The beauty therapists do facials and make-up."),
        c("Wellness consultants", "The wellness consultants plan food and exercise programmes."),
      ],
      grammar: [
        g(
          "I tell already.",
          "I have asked the nail technicians, and they are free at four.",
          "Hiện tại hoàn thành 'have asked' báo việc ĐÃ làm, kèm kết quả.",
          "I have ask the nail technicians, and they are free at four.",
        ),
        g(
          "Facial? Other team.",
          "I will ask the beauty therapists to call you before noon, madam.",
          "'ask + người + to + động từ nguyên mẫu' — không dùng -ing.",
          "I will ask the beauty therapists calling you before noon, madam.",
        ),
      ],
      speaking: [
        sp(
          "My daughter wants her nails done before the wedding dinner.",
          t3a,
          "Một việc, một người làm, một mốc gọi lại.",
        ),
        sp(
          "Has anyone answered you?",
          t3b,
          "Báo việc ĐÃ làm (have asked) + kết quả.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Four is perfect. She also needs make-up for the dinner.",
          t3c,
          "Việc thứ hai, người làm khác — giao rõ cho đúng tổ.",
          undefined,
          undefined,
          t3b,
        ),
        risk(
          sp(
            "A little boy is in the pool alone. I cannot see his parents.",
            "Please stay at the pool with him. I am calling the lifeguard now.",
            "Trẻ một mình dưới nước: có người ở cạnh NGAY, gọi cứu hộ. Tìm bố mẹ là việc sau.",
            "colleague",
            ["pool", "calling", "lifeguard"],
          ),
        ),
        sp(
          "I would like some advice about food and exercise.",
          "Let me check with our wellness consultants, sir. They plan food and exercise programmes.",
          "Đúng chuyên môn, đúng người: chuyên viên tư vấn sức khỏe.",
        ),
      ],
      reading: read(
        `A guest's daughter needs her nails done before a wedding dinner. Thao checks with the nail technicians and calls back within ten minutes: they are free at four. The daughter also needs make-up, so Thao asks the beauty therapists to call before five. Each request has one owner, and the guest always knows who is calling.`,
        [
          {
            q: "Thảo gọi lại cho khách sau bao lâu?",
            options: ["Trước năm giờ chiều hôm đó", "Lúc bốn giờ chiều", "Trong vòng mười phút"],
            correct: 2,
            explanation:
              "'calls back within ten minutes' — lời hứa gọi lại có con số, và được giữ.",
          },
          {
            q: "Ai lo phần trang điểm cho con gái khách?",
            options: [
              "Các kỹ thuật viên làm móng",
              "Các kỹ thuật viên chăm sóc sắc đẹp",
              "Thảo tự làm để kịp giờ ăn tối",
            ],
            correct: 1,
            explanation:
              "'asks the beauty therapists to call before five' — mỗi yêu cầu có một người phụ trách.",
          },
        ],
      ),
      game: [
        game(
          "Did you find somebody for my facial this afternoon?",
          "Yes, madam. I have asked the beauty therapists, and they are free at three.",
          "Yes. I ask already, okay.",
          "Not yet, madam. Maybe ask them yourself later.",
          undefined,
          "Câu cuối trả việc lại cho khách. Câu đúng báo việc đã làm (have asked) và kết quả cụ thể.",
        ),
      ],
    }),

    L(26, 4, "Closing the Loop", "Khép vòng xử lý", {
      vocabulary: [
        c("Yoga teachers", "The yoga teachers run a class at seven every morning."),
        c("Spa product suppliers", "The spa product suppliers deliver oils every Monday."),
        c("Spa linen staff", "The spa linen staff bring clean robes and towels."),
      ],
      grammar: [
        g(
          "Done.",
          "The spa linen staff have brought fresh robes, and I checked them myself.",
          "Báo kết quả = ai đã làm gì (have brought) + bạn đã tự kiểm tra. 'bring' → 'brought'.",
          "The spa linen staff have bring fresh robes, and I checked them myself.",
        ),
        g(
          "Oil coming Monday maybe.",
          "Our spa product suppliers deliver on Monday, madam.",
          "'suppliers' số nhiều → 'deliver', không thêm -s.",
          "Our spa product suppliers delivers on Monday, madam.",
        ),
      ],
      speaking: [
        sp(
          "There were no clean robes in the changing room this morning.",
          t4a,
          "Xin lỗi + đã nhờ đúng người (have asked) + việc gì.",
        ),
        sp(
          "Are the robes there now?",
          t4b,
          "Khép vòng: ai đã làm, và bạn đã tự kiểm tra.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "This happened yesterday too.",
          t4c,
          "Lỗi lặp lại: báo lên giám sát, không chỉ sửa xong là thôi.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "Do you sell the lavender oil you used today?",
          "It is out of stock, madam. Our spa product suppliers deliver on Monday.",
          "Nói thật là hết hàng và khi nào có lại.",
        ),
        sp(
          "Is there a yoga class tomorrow morning?",
          "Let me check with the yoga teachers, madam. I will call your room within ten minutes.",
          "'Let me check with' + mốc gọi lại.",
        ),
      ],
      reading: read(
        `Mrs Grant finds no clean robes in the changing room, for the second day. Lan asks the spa linen staff to bring fresh robes. She does not just say it is done: she goes to the changing room and checks the robes herself. Because it happened twice, Lan also tells her supervisor about it that day.`,
        [
          {
            q: "Lan làm gì trước khi báo khách là đã xong?",
            options: [
              "Hỏi nhân viên đồ vải rồi báo khách ngay",
              "Tự xuống phòng thay đồ kiểm tra áo choàng",
              "Ghi vào sổ ca rồi chuyển sang việc khác",
            ],
            correct: 1,
            explanation:
              "'checks the robes herself' — khép vòng nghĩa là tự kiểm tra rồi mới báo xong.",
          },
          {
            q: "Vì sao Lan báo chuyện này với giám sát?",
            options: [
              "Vì khách đòi được giảm giá dịch vụ",
              "Vì nhân viên đồ vải làm việc quá chậm",
              "Vì chuyện thiếu áo choàng đã lặp lại hai lần",
            ],
            correct: 2,
            explanation: "'Because it happened twice' — lỗi lặp lại cần người có quyền sửa từ gốc.",
          },
        ],
      ),
      game: [
        game(
          "Are the clean robes in the changing room now?",
          "Yes, madam. The linen staff brought them, and I checked them myself.",
          "Robe there. Okay now.",
          "I think so, madam. The linen staff told me they finished about an hour ago.",
          undefined,
          "Câu cuối chỉ chuyển lời, chưa ai kiểm lại. Câu đúng nói ai đã mang tới và bạn đã tự kiểm tra.",
        ),
      ],
    }),
  ];
}

// ── Week 27 — Receiving a complaint ─────────────────────────────────────
function week27(): LessonContent[] {
  const t1a = "I apologise for the long waiting time, madam. Let me check where your therapist is.";
  const t1b = "Thank you for telling me, madam. I am very sorry you had to wait twice.";
  const t1c = "I understand. Your therapist is coming now, and you will finish before seven.";
  const t2a = "I am sorry your treatment felt short, madam. I will check the times now.";
  const t2b = "I am sorry, madam. I am checking the treatment schedule with my supervisor now.";
  const t2c = "Then my supervisor will call you today, madam. She decides what we can offer.";
  const t3a = "I am very sorry, madam. When did you make the booking?";
  const t3b = "Thank you, madam. I will check the wrong treatment booking with the spa desk now.";
  const t3c = "Let me check with the beauty therapists, madam. I will tell you within ten minutes.";
  const t4a = "I am stopping the massage now, madam. I will clean the oil off with cool water.";
  const t4b = "I cannot say, madam. The hotel nurse will look at your skin now.";
  const t4c = "Of course, madam. I will stay here with you until the nurse comes.";
  return [
    L(27, 1, "Listen First", "Lắng nghe trước", {
      vocabulary: [
        c("Concern", "Thank you for telling me about your concern."),
        c("Apologise", "I apologise for the long wait, madam."),
        c("Late therapist", "I am sorry about the late therapist this morning."),
        c("Long waiting time", "I am very sorry about the long waiting time."),
      ],
      grammar: [
        g(
          "Not my fault. Therapist late.",
          "I apologise for the long waiting time, madam. Your therapist is coming now.",
          "Xin lỗi về điều khách gặp + việc đang làm (is coming). Không đổ cho đồng nghiệp.",
          "I apologise for the long waiting time, madam. Your therapist is come now.",
        ),
        g(
          "Wait, I know.",
          "Thank you for telling me about your concern, sir.",
          "Cảm ơn khách đã nói — để khách nói hết. Sau 'for' động từ thêm -ing.",
          "Thank you for tell me about your concern, sir.",
        ),
      ],
      speaking: [
        sp(
          "I have waited twenty-five minutes for my massage!",
          t1a,
          "Xin lỗi đúng sự việc (chờ lâu), rồi làm ngay một việc cụ thể.",
        ),
        sp(
          "This is the second time this week.",
          t1b,
          "Cảm ơn khách đã nói, xin lỗi về đúng điều khách gặp: chờ hai lần.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "I have a dinner at seven.",
          t1c,
          "Nghe ràng buộc của khách và hứa theo đó.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "My therapist came fifteen minutes late today.",
          "I am very sorry about the late therapist, sir. I will tell my supervisor today.",
          "Xin lỗi, không viện cớ, báo lên người có trách nhiệm.",
        ),
      ],
      reading: read(
        `Mrs Ali has waited twenty-five minutes for her massage, and it is the second time this week. Vy listens without stopping her. Then she apologises for the long waiting time and checks where the therapist is. Mrs Ali has a dinner at seven, so Vy makes sure the massage will finish before seven.`,
        [
          {
            q: "Vy làm gì đầu tiên khi khách phàn nàn?",
            options: [
              "Giải thích vì sao kỹ thuật viên bị trễ",
              "Nghe khách nói hết, không ngắt lời",
              "Mời khách đổi sang một ngày khác",
            ],
            correct: 1,
            explanation:
              "'Vy listens without stopping her' — bước đầu của tiếp nhận phàn nàn là lắng nghe trọn vẹn.",
          },
          {
            q: "Vì sao Vy chú ý giờ kết thúc buổi massage?",
            options: [
              "Vì khách có hẹn ăn tối lúc bảy giờ",
              "Vì spa đóng cửa lúc bảy giờ tối",
              "Vì kỹ thuật viên hết ca lúc bảy giờ",
            ],
            correct: 0,
            explanation:
              "'Mrs Ali has a dinner at seven, so…' — lời hứa đi theo ràng buộc của khách.",
          },
        ],
      ),
      game: [
        game(
          "I booked for three o'clock, and nobody has come for me!",
          "I apologise for the wait, sir. Let me check where your therapist is.",
          "Not my fault. Therapist late.",
          "Our therapists are very busy today, sir. Everybody has to wait a little this afternoon.",
          undefined,
          "Câu cuối viện cớ và coi việc chờ là bình thường. Câu đúng xin lỗi về điều khách gặp và làm ngay một việc.",
        ),
      ],
    }),

    L(27, 2, "Sorry Is Not a Verdict", "Xin lỗi chưa phải là nhận lỗi", {
      vocabulary: [
        c("Disappointed", "I understand you are disappointed, madam."),
        c("Short treatment", "I am sorry about the short treatment, sir."),
        c("Strong oil smell", "I am sorry about the strong oil smell in the room."),
        c("Loud spa music", "I will report the loud spa music to my supervisor."),
      ],
      grammar: [
        g(
          "Our mistake. Therapist bad.",
          "I am sorry your treatment felt short, madam. I will check the times now.",
          "Xin lỗi về điều khách cảm thấy. Chưa kiểm tra thì chưa nói lỗi của ai. 'felt' là quá khứ của 'feel'.",
          "I am sorry your treatment feel short, madam. I will check the times now.",
        ),
        g(
          "You disappointed? Okay.",
          "I understand you are disappointed, sir. I will report the loud spa music today.",
          "'disappointed' = người thấy thất vọng; 'disappointing' = thứ gây thất vọng.",
          "I understand you are disappointing, sir. I will report the loud spa music today.",
        ),
      ],
      speaking: [
        sp(
          "My massage was only forty minutes. I paid for sixty!",
          t2a,
          "Xin lỗi về trải nghiệm + kiểm tra ngay. KHÔNG nói 'It was our mistake' khi chưa ai kiểm tra.",
        ),
        sp(
          "So you agree it was your mistake?",
          t2b,
          "Không nhận lỗi, không chối lỗi: đang kiểm tra cùng giám sát.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "And if it really was short?",
          t2c,
          "Bù đắp là quyết định của giám sát. Nói ai gọi lại và khi nào.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "The oil smell in the room was too strong for me.",
          "I am sorry about the strong oil smell, sir. I will note it for your next visit.",
          "Xin lỗi về điều khách gặp + ghi lại cho lần sau.",
        ),
        sp(
          "The spa music was so loud that I could not relax.",
          "I understand you are disappointed, madam. I will report the loud spa music today.",
          "Công nhận cảm xúc, báo đúng việc lên trên.",
        ),
      ],
      reading: read(
        `Mrs Grant says her massage was only forty minutes, not sixty. Duc says, "I am sorry your treatment felt short." He does not say whose mistake it was, because nobody has checked. He checks the treatment schedule with his supervisor. The massage started late, so the supervisor calls Mrs Grant that day.`,
        [
          {
            q: "Vì sao Đức không nói 'It was our mistake'?",
            options: [
              "Vì khách sạn cấm nhân viên xin lỗi khách",
              "Vì Đức nghĩ khách nhớ nhầm thời gian",
              "Vì lúc đó chưa ai kiểm tra chuyện gì xảy ra",
            ],
            correct: 2,
            explanation:
              "'because nobody has checked' — xin lỗi về trải nghiệm thì luôn đúng; kết luận lỗi phải chờ kiểm tra.",
          },
          {
            q: "Ai gọi cho khách sau khi kiểm tra?",
            options: [
              "Giám sát của Đức",
              "Chính Đức, ngay tối hôm đó",
              "Kỹ thuật viên đã làm massage",
            ],
            correct: 0,
            explanation:
              "'the supervisor calls Mrs Grant that day' — bù đắp thế nào là việc của giám sát.",
          },
        ],
      ),
      game: [
        game(
          "This was the shortest massage of my life. Why did your therapist stop early?",
          "I am sorry your massage felt short, madam. I will check the times now.",
          "Not short. Sixty minute.",
          "It was our mistake, madam. She is often late.",
          undefined,
          "Câu cuối kết luận lỗi và nói xấu đồng nghiệp trước mặt khách. Câu đúng xin lỗi về điều khách gặp và đi kiểm tra.",
        ),
      ],
    }),

    L(27, 3, "Getting the Facts", "Hỏi cho rõ sự việc", {
      vocabulary: [
        c("Dirty changing room", "I am sorry about the dirty changing room, sir."),
        c("Cold pool water", "I will report the cold pool water to engineering."),
        c("Wrong treatment booking", "We found a wrong treatment booking for this afternoon."),
        c("Cold treatment room", "I am sorry about the cold treatment room."),
      ],
      grammar: [
        g(
          "When?",
          "When did you notice the dirty changing room, sir?",
          "Hỏi điều khách CHƯA nói. Sau 'did' động từ ở dạng gốc: notice.",
          "When did you noticed the dirty changing room, sir?",
        ),
        g(
          "Booking wrong. Not me.",
          "What treatment did you book, madam? I will check the booking now.",
          "Hỏi để biết sự việc, không phải để đổ lỗi. 'did you book', không phải 'did you booked'.",
          "What treatment did you booked, madam? I will check the booking now.",
        ),
      ],
      speaking: [
        sp(
          "I booked a facial, but they gave me a body scrub!",
          t3a,
          "Xin lỗi, rồi hỏi điều khách CHƯA nói: đặt lịch lúc nào.",
        ),
        sp(
          "Yesterday afternoon, by phone.",
          t3b,
          "Cảm ơn thông tin, nói bạn kiểm tra với ai.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Can I still have the facial today?",
          t3c,
          "Việc của tổ chăm sóc sắc đẹp: hỏi họ, hứa báo lại có con số.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "The pool water is very cold today.",
          "I am sorry, sir. Is it the indoor pool or the outdoor pool?",
          "Hỏi một chi tiết để báo đúng chỗ.",
        ),
        sp(
          "The changing room floor was dirty this morning.",
          "I am sorry about the dirty changing room, madam. Which changing room was it?",
          "Xin lỗi + hỏi chỗ cụ thể để người dọn tìm đúng.",
        ),
        sp(
          "My treatment room was cold the whole time.",
          "I am sorry about the cold treatment room, madam. Which room were you in?",
          "Hỏi số phòng để kiểm tra đúng máy sưởi.",
        ),
      ],
      reading: read(
        `Ms Tan booked a facial, but she was given a body scrub. Khanh apologises and asks when she made the booking. She says she called yesterday afternoon. Khanh checks with the spa desk and finds the wrong treatment booking on the schedule. Then she asks the beauty therapists if they can still do the facial today.`,
        [
          {
            q: "Vì sao Khánh hỏi khách đặt lịch lúc nào?",
            options: [
              "Để biết có phải khách tự đặt nhầm không",
              "Để tìm đúng lịch hẹn và kiểm tra lỗi",
              "Để tính thêm phí cho buổi tẩy tế bào chết",
            ],
            correct: 1,
            explanation:
              "Khánh hỏi để tìm sự việc, rồi 'finds the wrong treatment booking on the schedule' — hỏi để kiểm tra, không để đổ lỗi.",
          },
          {
            q: "Sau khi tìm ra lỗi, Khánh làm gì?",
            options: [
              "Hỏi tổ chăm sóc sắc đẹp làm facial hôm nay",
              "Tự làm facial cho khách ngay lúc đó",
              "Mời khách quay lại vào tuần sau",
            ],
            correct: 0,
            explanation:
              "'asks the beauty therapists if they can still do the facial today' — đúng việc, đúng tổ.",
          },
        ],
      ),
      game: [
        game(
          "The water in the pool was freezing this morning!",
          "I am sorry, madam. Which pool were you in, the indoor or the outdoor one?",
          "Water cold? Which?",
          "Could you tell me if the pool water was cold this morning, madam?",
          undefined,
          "Câu cuối hỏi lại điều khách VỪA nói. Câu đúng hỏi điều khách chưa nói: hồ nào, để báo đúng chỗ.",
        ),
      ],
    }),

    L(27, 4, "Staying Calm — Safety First", "Giữ bình tĩnh — an toàn trước", {
      vocabulary: [
        c("Skin irritation", "Please tell me at once if you feel any skin irritation."),
        c("Strong hand pressure", "Please tell me if the strong hand pressure hurts."),
        c("Broken sauna heater", "The broken sauna heater is closed until engineering checks it."),
      ],
      grammar: [
        g(
          "Pain? Normal.",
          "Please tell me if the pressure is too strong, madam.",
          "'the pressure' là số ít → 'is'. Mời khách nói ra, đừng đoán.",
          "Please tell me if the pressure are too strong, madam.",
        ),
        g(
          "Red skin, okay.",
          "I am stopping the treatment because your skin is red, madam.",
          "Mô tả vấn đề bằng điều nhìn thấy (skin is red). 'am stopping' — cần -ing sau 'am'.",
          "I am stop the treatment because your skin is red, madam.",
        ),
      ],
      speaking: [
        risk(
          sp(
            "My arms are itching and red where you put the oil.",
            t4a,
            "Kích ứng da: DỪNG ngay, làm sạch dầu bằng nước mát. Không làm tiếp cho xong buổi.",
            undefined,
            ["massage", "clean", "oil", "cool", "water"],
          ),
        ),
        risk(
          sp(
            "Is it serious? What is wrong with my skin?",
            t4b,
            "Bạn KHÔNG chẩn đoán: 'I cannot say'. Người có chuyên môn xem da cho khách.",
            undefined,
            ["hotel", "nurse", "skin"],
            t4a,
          ),
        ),
        sp(
          "Please do not leave me alone.",
          t4c,
          "Ở lại với khách cho tới khi y tá tới.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "Your hands are too strong. It really hurts!",
          "I am very sorry about the strong hand pressure, sir. I will make it lighter now.",
          "Khách đau: xin lỗi và đổi ngay, không giải thích 'massage sâu là phải đau'.",
        ),
        sp(
          "The sauna is cold today. What is going on?",
          "I am sorry, sir. The sauna heater is broken, and the sauna is closed until five.",
          "Mô tả vấn đề thật ngắn + điều đó có nghĩa gì với khách.",
        ),
      ],
      reading: read(
        `During a massage, Mrs Lee says her arms are itching and red. Son stops at once and cleans the oil off with cool water. Mrs Lee asks what is wrong with her skin. Son does not guess: he says he cannot say, and he calls the hotel nurse. He stays with Mrs Lee until the nurse comes.`,
        [
          {
            q: "Sơn làm gì ngay khi khách nói tay bị ngứa và đỏ?",
            options: [
              "Làm tiếp cho xong rồi mới hỏi khách",
              "Đổi sang một loại dầu khác rồi làm tiếp",
              "Dừng lại và làm sạch dầu bằng nước mát",
            ],
            correct: 2,
            explanation:
              "'Son stops at once and cleans the oil off with cool water' — dừng là việc đầu tiên; đổi dầu rồi làm tiếp là bỏ qua phản ứng da.",
          },
          {
            q: "Vì sao Sơn nói 'I cannot say'?",
            options: [
              "Vì kỹ thuật viên không chẩn đoán bệnh",
              "Vì Sơn không hiểu câu hỏi của khách",
              "Vì Sơn sợ khách đòi tiền bồi thường",
            ],
            correct: 0,
            explanation:
              "'Son does not guess' — chẩn đoán là việc của y tá; kỹ thuật viên dừng, làm sạch, gọi người có chuyên môn.",
          },
        ],
      ),
      game: [
        game(
          "My neck is getting red. Should I worry?",
          "I am stopping now, madam. The hotel nurse will look at it.",
          "Red skin is normal for oil, madam, no worry, we finish massage first okay.",
          "Do not worry, madam. It is only a small allergy, so we can finish the massage first.",
          undefined,
          "Câu cuối tự chẩn đoán 'dị ứng nhẹ' và làm tiếp — hai lỗi một lúc. Câu đúng dừng ngay và để y tá xem.",
        ),
      ],
    }),
  ];
}

// ── Week 28 — If you like, I can… (and what is not yours to give) ───────
function week28(): LessonContent[] {
  const t1a = "I am sorry, madam. If you like, I can turn up the heating.";
  const t1b = "Then if you like, I can bring a warm blanket now.";
  const t1c = "Of course, madam. If you prefer, I will use a lighter pressure.";
  const t2a = "I am sorry, sir. I can lower the music volume, or we can change the treatment room.";
  const t2b = "Either option is fine, sir. The garden room is quieter, and it is empty now.";
  const t2c = "Of course, sir. I will change the treatment room now and bring your things.";
  const t3a = "I am sorry, madam. If you like, we can change the oil blend to an unscented one.";
  const t3b = "If it does not get better, I will stop and call my supervisor.";
  const t3c = "Of course, madam. I will ask my manager if you can reschedule at no charge.";
  const t4a = "I am very sorry about the late start, madam. I will report it today.";
  const t4b = "I am sorry, I cannot add ten free minutes. My manager will call you this afternoon.";
  const t4c = "If you like, I can book your next visit now, at a time that suits you.";
  return [
    L(28, 1, "If You Like, I Can…", "Nếu quý khách muốn, tôi có thể…", {
      vocabulary: [
        c("Prefer", "If you prefer, we can start ten minutes later."),
        c("Turn up the heating", "If you feel cold, I can turn up the heating."),
        c("Bring a warm blanket", "If you like, I can bring a warm blanket."),
        c("Use a lighter pressure", "If it hurts, I will use a lighter pressure."),
      ],
      grammar: [
        g(
          "Cold? Heating.",
          "If you like, I can turn up the heating, madam.",
          "'If you like, I can…' — đề nghị nhưng để khách quyết. Sau 'can' không có 'to'.",
          "If you like, I can to turn up the heating, madam.",
        ),
        g(
          "Pressure too much? Okay.",
          "If the pressure hurts, I will use a lighter pressure.",
          "Câu điều kiện loại 1: mệnh đề 'If' dùng hiện tại (hurts), 'will' chỉ ở mệnh đề chính.",
          "If the pressure will hurt, I will use a lighter pressure.",
        ),
      ],
      speaking: [
        sp(
          "This room is a bit cold for me.",
          t1a,
          "Khung của tuần: If you like, I can + việc trong quyền của bạn.",
        ),
        sp(
          "It will take a while to warm up, though.",
          t1b,
          "Thêm một lựa chọn ngay lúc này, vẫn để khách quyết.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Yes, please. Also, the pressure is a little strong.",
          t1c,
          "Đổi lực ngay — việc của bạn, không cần xin phép ai.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "Can you massage my back harder, please?",
          "Of course, sir. If it hurts at any time, please tell me straight away.",
          "Đồng ý, và mời khách nói ngay nếu đau.",
        ),
      ],
      reading: read(
        `Ms Kowalski feels cold on the massage bed. Hien says, "If you like, I can turn up the heating." The room needs time to warm up, so Hien also brings a warm blanket. Later Ms Kowalski says the pressure is a little strong. Hien does not argue. She uses a lighter pressure at once.`,
        [
          {
            q: "Vì sao Hiền mang thêm chăn ấm?",
            options: [
              "Vì máy sưởi trong phòng bị hỏng",
              "Vì phòng cần thời gian mới ấm lên",
              "Vì khách yêu cầu hai cái chăn",
            ],
            correct: 1,
            explanation:
              "'The room needs time to warm up, so Hien also brings a warm blanket' — giải pháp thứ hai cho lúc chờ.",
          },
          {
            q: "Khi khách nói lực hơi mạnh, Hiền làm gì?",
            options: [
              "Giảm lực ngay, không tranh luận",
              "Giải thích massage sâu thì phải mạnh",
              "Hỏi giám sát trước khi đổi lực",
            ],
            correct: 0,
            explanation:
              "'Hien does not argue. She uses a lighter pressure at once' — đổi lực là việc trong quyền của kỹ thuật viên.",
          },
        ],
      ),
      game: [
        game(
          "I am freezing on this massage bed.",
          "I am sorry, madam. If you like, I can bring a warm blanket.",
          "Room is cold? You wait, I go find blanket for you, maybe ten minute.",
          "The room is at the normal temperature, madam. Most guests feel warm after a few minutes.",
          undefined,
          "Câu cuối nói khách 'sai' vì người khác thấy ấm. Câu đúng xin lỗi và đưa một giải pháp khách có thể chọn.",
        ),
      ],
    }),

    L(28, 2, "Two Options — and Who Decides", "Hai lựa chọn — và ai quyết", {
      vocabulary: [
        c("Option", "There are two options for your treatment room."),
        c("Either", "Either option is fine with us, sir."),
        c("Change the treatment room", "If the room is noisy, we can change the treatment room."),
        c("Lower the music volume", "I can lower the music volume for you."),
      ],
      grammar: [
        g(
          "Two way. Choose.",
          "You can choose either option, madam: a quieter room or softer music.",
          "'either option' = một trong hai lựa chọn; 'either' đi với danh từ số ít.",
          "You can choose either options, madam: a quieter room or softer music.",
        ),
        g(
          "Music loud? Okay.",
          "If the music is too loud, I can lower the music volume.",
          "Mệnh đề 'If' dùng hiện tại (is), không dùng 'will be'.",
          "If the music will be too loud, I can lower the music volume.",
        ),
      ],
      speaking: [
        sp(
          "The music is too loud, and I can hear people outside.",
          t2a,
          "Hai lựa chọn, cả hai trong quyền của bạn.",
        ),
        sp(
          "Which option is better?",
          t2b,
          "Giúp khách chọn bằng một lý do cụ thể.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Then the garden room, please.",
          t2c,
          "Chốt lựa chọn của khách và làm ngay.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "I prefer silence. Could you turn the music off?",
          "Of course, madam. If you prefer, I can turn the music off completely.",
          "'If you prefer' — nhắc lại mong muốn của khách bằng câu điều kiện.",
        ),
      ],
      reading: read(
        `Mr Haas can hear people outside his treatment room, and the music is loud. Phong gives him two options: lower the music volume, or change the treatment room. Mr Haas asks which is better. Phong says either option is fine, but the garden room is quieter. Mr Haas chooses it, and Phong moves his things.`,
        [
          {
            q: "Phong đưa ra những lựa chọn nào?",
            options: [
              "Giảm âm lượng nhạc, hoặc đổi phòng trị liệu",
              "Giảm giá buổi massage, hoặc tặng thêm giờ miễn phí",
              "Đợi tới chiều, hoặc đổi sang ngày mai",
            ],
            correct: 0,
            explanation:
              "'lower the music volume, or change the treatment room' — cả hai đều trong quyền của nhân viên spa.",
          },
          {
            q: "Vì sao khách chọn phòng trong vườn?",
            options: [
              "Vì phòng đó rộng hơn phòng cũ",
              "Vì phòng đó có nhạc hay hơn",
              "Vì Phong nói phòng đó yên tĩnh hơn",
            ],
            correct: 2,
            explanation:
              "'either option is fine, but the garden room is quieter' — giúp khách chọn bằng một lý do cụ thể.",
          },
        ],
      ),
      game: [
        game(
          "Can you move me to the VIP suite? It is much quieter.",
          "I am sorry, sir. I cannot offer a free upgrade, but the garden room is quiet.",
          "VIP no. Garden okay.",
          "Of course, sir. The VIP suite is empty now, so I will move you there at no extra charge.",
          undefined,
          "Câu cuối tự tặng nâng hạng miễn phí — đó là quyết định của quản lý. Câu đúng nói rõ điều không làm được và đưa lựa chọn trong quyền.",
        ),
      ],
    }),

    L(28, 3, "If It Happens Again", "Nếu chuyện lặp lại", {
      vocabulary: [
        c("Change the oil blend", "If the smell is too strong, we can change the oil blend."),
        c("Change your therapist", "If you prefer, I can change your therapist next time."),
        c("Reschedule at no charge", "If you call before noon, you can reschedule at no charge."),
        c("Extend the session", "If the next hour is free, we can extend the session."),
      ],
      grammar: [
        g(
          "Smell bad again, tell me.",
          "If the smell comes back, please tell me. We can change the oil blend.",
          "'If the smell comes back' — hiện tại sau 'If', kể cả khi nói về tương lai.",
          "If the smell will come back, please tell me. We can change the oil blend.",
        ),
        g(
          "Next time different person.",
          "If you prefer, I can change your therapist for your next visit.",
          "Sau 'can' là động từ nguyên mẫu (change), không thêm -ing.",
          "If you prefer, I can changing your therapist for your next visit.",
        ),
      ],
      speaking: [
        sp(
          "The oil smells too strong. It gives me a headache.",
          t3a,
          "Đề nghị trong quyền: đổi loại dầu. Không nói 'dầu này ai cũng thích'.",
        ),
        sp(
          "And if I still have a headache after that?",
          t3b,
          "Nếu chuyện lặp lại thì sao — nói trước bạn sẽ làm gì: dừng và gọi giám sát.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Thank you. I think I would like to come back another day.",
          t3c,
          "Dời lịch miễn phí sau sự cố là quyết định về tiền, của quản lý — bạn hỏi, không tự hứa.",
          undefined,
          undefined,
          t3b,
        ),
        risk(
          sp(
            "Come on, nobody will know. Massage under the towel.",
            "No, sir. If you ask again, I will stop the treatment and leave.",
            "Yêu cầu vượt giới hạn: từ chối MỘT lần, bình tĩnh. Hỏi lần nữa là dừng liệu trình và rời phòng.",
            undefined,
            ["again", "treatment"],
          ),
        ),
        sp(
          "Next time I would like a different therapist.",
          "Of course, madam. If you prefer, I can change your therapist for your next visit.",
          "Không hỏi vặn lý do. Đề nghị có điều kiện.",
        ),
        sp(
          "Can we make my massage longer today?",
          "If the next hour is free, I can extend the session. There is an extension fee.",
          "Đề nghị có điều kiện + báo luôn có phí.",
        ),
      ],
      reading: read(
        `During a massage, a guest asks Thu to massage under the towel. Thu says no, calmly: "If you ask again, I will stop the treatment and leave." The guest asks again. Thu stops, leaves the room and tells her supervisor at once. The supervisor speaks to the guest. Nobody asks Thu to go back in.`,
        [
          {
            q: "Lần đầu khách yêu cầu, Thu làm gì?",
            options: [
              "Rời phòng ngay mà không nói gì",
              "Từ chối bình tĩnh và nói điều sẽ xảy ra",
              "Làm tiếp và giả vờ không nghe thấy",
            ],
            correct: 1,
            explanation:
              "'Thu says no, calmly: If you ask again, I will stop…' — câu điều kiện đặt giới hạn rõ ràng.",
          },
          {
            q: "Khi khách hỏi lần nữa, Thu làm gì?",
            options: [
              "Dừng, rời phòng và báo giám sát ngay",
              "Nhắc lại lời từ chối thêm một lần nữa",
              "Gọi đồng nghiệp vào làm tiếp thay mình",
            ],
            correct: 0,
            explanation:
              "'Thu stops, leaves the room and tells her supervisor at once' — giữ đúng lời đã nói; giám sát xử lý tiếp.",
          },
        ],
      ),
      game: [
        game(
          "What if the new oil is still too strong for me?",
          "If it is still too strong, please tell me, and I will stop.",
          "If it is still strong for you, you say me and I am change it again.",
          "It will be perfect this time, madam. I promise you will not smell it at all.",
          undefined,
          "Câu cuối hứa điều bạn không chắc được. Câu đúng nói trước bạn sẽ làm gì nếu vấn đề còn.",
        ),
      ],
    }),

    L(28, 4, "When You Must Say No", "Khi phải từ chối", {
      vocabulary: [
        c("Offer a free upgrade", "Only the spa manager can offer a free upgrade."),
        c("Add ten free minutes", "I cannot add ten free minutes myself."),
        c("Refund the extra charge", "Only the spa manager can refund the extra charge."),
      ],
      grammar: [
        g(
          "Free? No.",
          "I am sorry, I cannot add ten free minutes. I will ask my manager.",
          "Thời gian miễn phí là quyết định về tiền: bạn không tự hứa. Sau 'cannot' là động từ nguyên mẫu.",
          "I am sorry, I cannot adding ten free minutes. I will ask my manager.",
        ),
        g(
          "No refund.",
          "If my manager approves it, the spa desk will refund the extra charge.",
          "Câu điều kiện: hiện tại sau 'If' (approves), 'will' ở mệnh đề chính.",
          "If my manager will approve it, the spa desk will refund the extra charge.",
        ),
      ],
      speaking: [
        sp(
          "My massage started fifteen minutes late, but it still ended at four.",
          t4a,
          "Xin lỗi về điều khách gặp (bắt đầu trễ) và báo lên.",
        ),
        risk(
          sp(
            "Then add ten free minutes to my next massage.",
            t4b,
            "Phút miễn phí: bạn KHÔNG tự hứa. Nói rõ quản lý gọi lại và lúc nào.",
            undefined,
            ["add", "free", "minutes", "manager", "call"],
            t4a,
          ),
        ),
        sp(
          "So what can you do for me right now?",
          t4c,
          "Ngay sau lời từ chối, đưa việc trong quyền của bạn.",
          undefined,
          undefined,
          t4b,
        ),
        risk(
          sp(
            "I did not ask for the hot stones. I want that extra charge back.",
            "I am sorry, I cannot refund the extra charge. My manager will call you today.",
            "Hoàn tiền: quyết định của quản lý. Không hứa, không cãi, nói ai gọi lại.",
            undefined,
            ["refund", "extra", "charge", "manager", "call"],
          ),
        ),
        sp(
          "We waited so long. Give us a free upgrade to the VIP suite.",
          "I am sorry, I cannot offer a free upgrade. I will ask my manager now.",
          "Nâng hạng miễn phí: chuyển quản lý ngay, không tự hứa.",
        ),
      ],
      reading: read(
        `Mr Wong's massage started fifteen minutes late. He asks Hien to add ten free minutes to his next massage. Hien cannot add free minutes herself, so she says her manager will call him that afternoon. Then she offers what she can do: she books his next visit at a time that suits him. The manager calls at three.`,
        [
          {
            q: "Ai quyết định chuyện tặng thêm phút miễn phí?",
            options: [
              "Hiền, vì Hiền là người tiếp khách",
              "Kỹ thuật viên đã làm massage trễ",
              "Quản lý, người gọi lại cho khách",
            ],
            correct: 2,
            explanation:
              "'Hien cannot add free minutes herself, so she says her manager will call' — thời gian miễn phí là quyết định về tiền.",
          },
          {
            q: "Hiền làm được gì cho khách ngay lúc đó?",
            options: [
              "Đặt lịch lần sau vào giờ khách muốn",
              "Tặng khách một chai tinh dầu mang về",
              "Giảm giá một nửa cho buổi massage",
            ],
            correct: 0,
            explanation:
              "'she books his next visit at a time that suits him' — đặt lịch là việc trong quyền; quà và giảm giá thì không.",
          },
        ],
      ),
      game: [
        game(
          "Just give me a discount, and we will forget about it.",
          "I am sorry, I cannot give a discount. My manager will call you today.",
          "Discount no. Not possible.",
          "Of course, sir. I will take twenty percent off myself.",
          undefined,
          "Câu cuối tự giảm giá — vượt quyền. Câu đúng không hứa, không đóng cửa: người có quyền sẽ gọi lại.",
        ),
      ],
    }),
  ];
}

// ── Week 29 — Handover and report: colleagues and the supervisor ────────
function week29(): LessonContent[] {
  const t1a = "I updated the treatment schedule at two. Treatment room three is closed.";
  const t1b = "The air conditioner is broken. Engineering is coming at five to fix it.";
  const t1c = "Please check the therapist roster first. Hoa is sick, so Lan is taking her guests.";
  const t2a = "She was sitting in the steam room when she suddenly felt dizzy.";
  const t2b = "I helped her out, gave her water and called the hotel nurse.";
  const t2c = "Yes. The nurse checked her, and I wrote it in the shift report.";
  const t3a = "Yes. The linen order has not arrived yet, so robes are low.";
  const t3b = "Yes. Please read the guest allergy note for room two before the massage.";
  const t3c = "The guest is allergic to nuts, so please use the unscented oil only.";
  const t4a = "The guest was touching my arm. I asked him to stop, and then I left the room.";
  const t4b = "I wrote it in the shift report, with the time and the room.";
  const t4c = "Yes, thank you. I am ready for my next guest.";
  return [
    L(29, 1, "Handing Over the Shift", "Bàn giao ca", {
      vocabulary: [
        c("Shift", "My shift ends at three o'clock."),
        c("Update", "I updated the treatment schedule at two."),
        c("Treatment schedule", "The treatment schedule shows every booking today."),
        c("Therapist roster", "The therapist roster shows who works tomorrow."),
      ],
      grammar: [
        g(
          "Many booking today.",
          "I updated the treatment schedule at two. Room three is closed.",
          "Bàn giao: việc ĐÃ làm (quá khứ đơn: updated) + việc còn mở (hiện tại).",
          "I update the treatment schedule at two. Room three is closed.",
        ),
        g(
          "Roster there.",
          "Please check the therapist roster before you start your shift.",
          "Sau 'before' dùng hiện tại (start), không dùng 'will'.",
          "Please check the therapist roster before you will start your shift.",
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
          "Why is room three closed?",
          t1b,
          "Vấn đề + ai xử lý + mấy giờ.",
          "colleague",
          undefined,
          t1a,
        ),
        sp(
          "Okay. What should I check first?",
          t1c,
          "Thứ tự ưu tiên rõ ràng, và ai đang làm thay ai.",
          "colleague",
          undefined,
          t1b,
        ),
        sp(
          "Is the therapist roster for tomorrow ready?",
          "Yes. I updated the therapist roster, and every shift has two therapists.",
          "Báo cấp trên: đã làm gì + kết quả.",
          "manager",
        ),
      ],
      reading: read(
        `At three, Thu hands over to Nam. "I updated the treatment schedule at two. Treatment room three is closed, because the air conditioner is broken. Engineering is coming at five." Hoa is sick, so Lan is taking her guests, and Thu tells Nam to check the therapist roster first. Nam does not have to guess anything.`,
        [
          {
            q: "Vì sao phòng trị liệu số ba đóng cửa?",
            options: [
              "Vì máy lạnh hỏng, kỹ thuật tới lúc năm giờ",
              "Vì Hoa bị ốm nên không ai làm phòng đó",
              "Vì phòng đó chưa có trong lịch trị liệu",
            ],
            correct: 0,
            explanation:
              "'closed, because the air conditioner is broken. Engineering is coming at five' — vấn đề, người xử lý, mốc giờ.",
          },
          {
            q: "Vì sao Nam phải xem bảng phân ca trước?",
            options: [
              "Vì Nam là người mới, chưa biết ai làm ca nào",
              "Vì Lan đang nhận khách thay cho Hoa bị ốm",
              "Vì lịch của ngày mai chưa được in ra",
            ],
            correct: 1,
            explanation:
              "'Hoa is sick, so Lan is taking her guests' — bảng phân ca đã đổi, ca sau phải biết trước.",
          },
        ],
      ),
      game: [
        game(
          "Before you leave, is there anything new?",
          "Yes. I updated the treatment schedule, and room three is closed.",
          "Many thing. You look schedule.",
          "Nothing new, really. Everything is normal on the spa floor today. Have a good shift!",
          "colleague",
          "Câu cuối bỏ sót phòng đang đóng — ca sau sẽ xếp khách vào đó. Câu đúng nói việc đã làm và việc còn mở.",
        ),
      ],
    }),

    L(29, 2, "I Was Doing… When…", "Tôi đang làm… thì…", {
      vocabulary: [
        c("Suddenly", "The sauna heater suddenly stopped at ten."),
        c("Sauna maintenance log", "Every sauna repair goes in the sauna maintenance log."),
        c("Treatment room checklist", "I finished the treatment room checklist at nine."),
        c("Pool water log", "We write every water test in the pool water log."),
      ],
      grammar: [
        g(
          "I check sauna, heater stop.",
          "I was checking the sauna when the heater suddenly stopped.",
          "Quá khứ tiếp diễn 'was checking' cho việc đang làm; quá khứ đơn 'stopped' cho việc chen vào.",
          "I was check the sauna when the heater suddenly stopped.",
        ),
        g(
          "I write already.",
          "I wrote the time in the sauna maintenance log.",
          "Quá khứ đơn của 'write' là 'wrote' (bất quy tắc).",
          "I written the time in the sauna maintenance log.",
        ),
      ],
      speaking: [
        sp(
          "What happened with Mrs Kim in the steam room?",
          t2a,
          "Báo cáo sự cố: khách đang làm gì (was + -ing) khi chuyện xảy ra.",
          "manager",
        ),
        risk(
          sp(
            "What did you do then?",
            t2b,
            "Các bước an toàn theo đúng thứ tự: đưa ra khỏi chỗ nóng, cho nước, gọi y tá.",
            "manager",
            ["helped", "out", "water", "called", "hotel", "nurse"],
            t2a,
          ),
        ),
        sp(
          "Is she all right now?",
          t2c,
          "Khép lại: ai đã kiểm tra, và bạn đã ghi ở đâu.",
          "manager",
          undefined,
          t2b,
        ),
        sp(
          "Why is the sauna closed?",
          "I was checking the sauna when the heater suddenly stopped. It is in the sauna maintenance log.",
          "Sự cố thiết bị ghi vào sổ bảo trì phòng xông hơi.",
          "colleague",
        ),
        sp(
          "Did anyone test the pool water this morning?",
          "Yes. I tested it at eight and wrote it in the pool water log.",
          "Việc đã làm + giờ + ghi ở đúng sổ.",
          "manager",
        ),
        sp(
          "Is room two ready for the next guest?",
          "Yes. I finished the treatment room checklist for room two at ten.",
          "Trả lời bằng bằng chứng: bảng kiểm đã xong lúc mấy giờ.",
          "colleague",
        ),
      ],
      reading: read(
        `Mrs Kim was sitting in the steam room when she suddenly felt dizzy. Quang was checking the towels nearby. He helped her out at once, gave her water and called the hotel nurse. He stayed with her until the nurse arrived. Then he wrote everything in the shift report, with the times, for his supervisor.`,
        [
          {
            q: "Quang đang làm gì khi khách bị choáng?",
            options: [
              "Đang kiểm khăn ở gần đó",
              "Đang dọn phòng xông hơi khô",
              "Đang bàn giao ca cho đồng nghiệp",
            ],
            correct: 0,
            explanation:
              "'Quang was checking the towels nearby' — quá khứ tiếp diễn kể việc đang làm thì sự việc xảy ra.",
          },
          {
            q: "Quang ghi lại sự việc ở đâu?",
            options: [
              "Trong sổ bảo trì phòng xông hơi",
              "Trong bảng kiểm phòng trị liệu",
              "Trong báo cáo ca, có ghi giờ",
            ],
            correct: 2,
            explanation:
              "'wrote everything in the shift report, with the times' — sự cố của khách ghi vào báo cáo ca, không ghi vào sổ thiết bị.",
          },
        ],
      ),
      game: [
        game(
          "What were you doing when the sauna heater stopped?",
          "I was checking the sauna when it suddenly stopped.",
          "I check sauna, it stop.",
          "I was not there. Maybe somebody else broke it.",
          "manager",
          "Câu cuối đoán và đổ cho người khác. Câu đúng kể việc đang làm (was checking) khi sự việc xảy ra.",
        ),
      ],
    }),

    L(29, 3, "Open Items", "Những việc còn mở", {
      vocabulary: [
        c("Yet", "The linen order has not arrived yet."),
        c("Guest allergy note", "Read the guest allergy note before every treatment."),
        c("Linen order", "The linen order comes at six every morning."),
        c("Product stock list", "Lavender oil is low on the product stock list."),
      ],
      grammar: [
        g(
          "Linen not come.",
          "The linen order has not arrived yet. I called the laundry at four.",
          "Hiện tại hoàn thành 'has not arrived yet' — việc chưa xong tính tới lúc này. Quá khứ phân từ cần -ed.",
          "The linen order has not arrive yet. I called the laundry at four.",
        ),
        g(
          "Oil low.",
          "I have checked the product stock list, and lavender oil is low.",
          "'have checked' — hiện tại hoàn thành: have + quá khứ phân từ.",
          "I have check the product stock list, and lavender oil is low.",
        ),
      ],
      speaking: [
        sp(
          "Is anything still open from your shift?",
          t3a,
          "Việc còn mở: has not … yet + hệ quả cho ca sau.",
          "colleague",
        ),
        risk(
          sp(
            "Anything I should know about the guests?",
            t3b,
            "Dị ứng của khách là việc phải bàn giao TRƯỚC liệu trình, không để ca sau tự đọc thấy.",
            "colleague",
            ["guest", "allergy", "note", "room", "massage"],
            t3a,
          ),
        ),
        sp(
          "What does the note say?",
          t3c,
          "Nói rõ dị ứng gì và phải làm gì khác đi.",
          "colleague",
          undefined,
          t3b,
        ),
        sp(
          "Did you check the product stock list today?",
          "Yes. Lavender oil is low, so I have ordered more from the suppliers.",
          "Đã kiểm gì + kết quả + đã làm gì.",
          "manager",
        ),
      ],
      reading: read(
        `Before her break, Thuy writes the open items for the evening team. The linen order has not arrived yet, so robes are low. The guest in room two is allergic to nuts, and Thuy tells the next therapist to read the guest allergy note before the massage. Lavender oil is low, so she has ordered more.`,
        [
          {
            q: "Thủy dặn kỹ thuật viên ca sau làm gì trước buổi massage phòng hai?",
            options: [
              "Đọc ghi chú dị ứng của khách",
              "Đếm lại số áo choàng còn trong tủ",
              "Hỏi khách đã ăn trưa hay chưa",
            ],
            correct: 0,
            explanation:
              "'read the guest allergy note before the massage' — dị ứng hạt là việc an toàn phải bàn giao rõ.",
          },
          {
            q: "Vì sao áo choàng đang thiếu?",
            options: [
              "Vì khách mang áo choàng về phòng",
              "Vì đơn đồ vải chưa được giao tới",
              "Vì tổ giặt là nghỉ làm vào chiều nay",
            ],
            correct: 1,
            explanation:
              "'The linen order has not arrived yet, so robes are low' — việc còn mở + hệ quả.",
          },
        ],
      ),
      game: [
        game(
          "Can I use the almond oil for the guest in room two?",
          "No. Read the guest allergy note first. She is allergic to nuts.",
          "Almond no. Nut. Note.",
          "Yes, of course. The almond oil is our best oil, and all the guests like it very much.",
          "colleague",
          "Câu cuối trả lời theo thói quen mà không xem ghi chú dị ứng. Câu đúng chỉ đúng chỗ đọc và nói rõ vì sao.",
        ),
      ],
    }),

    L(29, 4, "The Right Log for the Right Thing", "Đúng sổ cho đúng việc", {
      vocabulary: [
        c("Towel count", "The towel count was forty at the end of the shift."),
        c("Walk-in list", "Write a guest without a booking on the walk-in list."),
        c("Next day booking list", "Print the next day booking list before you go home."),
        c("Locker key count", "The locker key count shows if a key is missing."),
      ],
      grammar: [
        g(
          "Key gone.",
          "The locker key count was one short, so I told my supervisor.",
          "'The locker key count' là một con số → 'was', không phải 'were'.",
          "The locker key count were one short, so I told my supervisor.",
        ),
        g(
          "Guest no booking, I remember.",
          "I wrote the walk-in guest on the walk-in list at three.",
          "Việc đã làm trong ca kể bằng quá khứ đơn: wrote.",
          "I write the walk-in guest on the walk-in list at three.",
        ),
      ],
      speaking: [
        sp(
          "Why did you stop the massage in room four?",
          t4a,
          "Báo cáo sự việc như nó đã xảy ra: khách đang làm gì, bạn đã làm gì. Không thêm ý kiến.",
          "manager",
        ),
        sp(
          "Where did you write it down?",
          t4b,
          "Sự việc trong ca ghi vào báo cáo ca, có giờ và phòng.",
          "manager",
          undefined,
          t4a,
        ),
        sp("Thank you. Are you all right?", t4c, "Trả lời ngắn, thật.", "manager", undefined, t4b),
        sp(
          "Where do I write the guest who just walked in?",
          "On the walk-in list, please. The locker key count is only for keys.",
          "Đúng sổ cho đúng việc: khách không hẹn ghi vào danh sách khách vãng lai.",
          "colleague",
        ),
        sp(
          "Is the next day booking list ready?",
          "Yes, I printed the next day booking list at five. It is on the desk.",
          "Việc đã làm + giờ + ở đâu.",
          "colleague",
        ),
        sp(
          "What was the towel count tonight?",
          "The towel count was forty. Five towels went to the laundry at six.",
          "Con số + chỗ còn lại của số khăn.",
          "manager",
        ),
      ],
      reading: read(
        `At the end of her shift, Hanh uses four records. She writes the walk-in guests on the walk-in list. She prints the next day booking list. She checks the locker key count: one key is missing, so she tells her supervisor. A guest problem from the afternoon goes in the shift report, not in the key count.`,
        [
          {
            q: "Hạnh làm gì khi số chìa khóa tủ thiếu một chiếc?",
            options: [
              "Báo cho giám sát của mình",
              "Ghi vào danh sách khách vãng lai",
              "Đợi tới sáng mai rồi đếm lại",
            ],
            correct: 0,
            explanation:
              "'one key is missing, so she tells her supervisor' — chìa khóa thiếu là việc an ninh, báo ngay.",
          },
          {
            q: "Sự việc với khách buổi chiều được ghi ở đâu?",
            options: [
              "Trong số chìa khóa tủ đồ",
              "Trong danh sách đặt lịch ngày mai",
              "Trong báo cáo ca",
            ],
            correct: 2,
            explanation:
              "'goes in the shift report, not in the key count' — mỗi sổ giữ đúng một loại việc.",
          },
        ],
      ),
      game: [
        game(
          "Can I write today's problems in the locker key count?",
          "No. Problems go in the shift report. The key count is for keys.",
          "Yes. Any book, okay.",
          "Yes, any book is fine, as long as you write everything down somewhere before you go.",
          "colleague",
          "Câu cuối cho ghi lẫn sổ — ca sau sẽ không tìm thấy. Câu đúng: sự việc vào báo cáo ca, số chìa khóa chỉ để đếm chìa khóa.",
        ),
      ],
    }),
  ];
}

// ── Week 30 — Checkpoint: putting it together ───────────────────────────
function week30(): LessonContent[] {
  const t1a =
    "I recommend the ninety-minute session, madam. It is more relaxing than the shorter one.";
  const t1b =
    "Your massage oil choice is lavender or lemongrass. Lemongrass is fresher than lavender.";
  const t1c =
    "Your treatment start time is three o'clock. The room will be ready within ten minutes.";
  const t2a =
    "Because the cancellation deadline was noon yesterday, madam. It is on your booking card.";
  const t2b =
    "I understand, madam. I cannot change the charge, but my manager will call you today.";
  const t2c = "Of course, madam. I will note the therapist gender for your next booking.";
  const t3a = "I am very sorry, sir. I will stop and check your health form answers.";
  const t3b = "I am sorry, sir. I will avoid your knee and tell my supervisor today.";
  const t3c = "Yes, sir. If you like, I can continue on your back and shoulders.";
  const t4a = "I am sorry, I cannot tell you that, sir. I can book your next massage with her.";
  const t4b = "Of course, sir. Your next appointment date is Friday at ten, with Hoa.";
  const t4c = "Yes, sir. I will call your room the day before.";
  return [
    L(30, 1, "Recommend and Promise", "Gợi ý và cam kết", {
      vocabulary: [
        c("Review", "Please review the guest allergy note before you start."),
        c("Session length", "The session length is sixty or ninety minutes."),
        c("Massage oil choice", "Your massage oil choice is lavender or lemongrass."),
        c("Treatment start time", "Your treatment start time is on your booking card."),
      ],
      grammar: [
        g(
          "Ninety good.",
          "I recommend the ninety-minute session, madam. It is more relaxing than sixty.",
          "Tuần 23: 'I recommend' + so sánh. Tính từ dài dùng 'more + tính từ + than'.",
          "I recommend the ninety-minute session, madam. It is more relax than sixty.",
        ),
        g(
          "Start three.",
          "We are going to start at three, and the room will be ready by then.",
          "Tuần 25: 'be going to' + động từ nguyên mẫu (start), không thêm -ing.",
          "We are going to starting at three, and the room will be ready by then.",
        ),
      ],
      speaking: [
        sp(
          "I have ninety minutes free this afternoon. What do you recommend?",
          t1a,
          "Tuần 23: gợi ý theo đúng thời gian khách có, kèm một so sánh.",
        ),
        sp(
          "Lovely. Which oil would you use?",
          t1b,
          "Đưa hai lựa chọn và một so sánh để khách chọn.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Lavender, please. When can we start?",
          t1c,
          "Tuần 25: giờ cụ thể + lời hứa có con số.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "What should I do before my first guest?",
          "Please review the guest allergy note, and check the session length on the schedule.",
          "Nói với đồng nghiệp: hai việc, theo thứ tự.",
          "colleague",
        ),
      ],
      reading: read(
        `Ms Park has ninety minutes free. Vy recommends the ninety-minute session, because it is more relaxing than the shorter one. Ms Park chooses lavender as her massage oil choice. Vy tells her the treatment start time, three o'clock, and prepares the room within ten minutes. Before the massage, Vy reviews the guest allergy note.`,
        [
          {
            q: "Vì sao Vy gợi ý buổi chín mươi phút?",
            options: [
              "Vì đó là buổi đắt nhất trong thực đơn",
              "Vì khách có đúng chín mươi phút rảnh",
              "Vì buổi sáu mươi phút đã kín lịch",
            ],
            correct: 1,
            explanation:
              "'Ms Park has ninety minutes free' — gợi ý đi theo thời gian của khách, không theo giá.",
          },
          {
            q: "Vy làm gì ngay trước buổi massage?",
            options: [
              "Đọc lại ghi chú dị ứng của khách",
              "Hỏi khách chọn loại tinh dầu nào hôm nay",
              "Báo giá buổi massage cho khách",
            ],
            correct: 0,
            explanation:
              "'Before the massage, Vy reviews the guest allergy note' — bước an toàn đi trước liệu trình.",
          },
        ],
      ),
      game: [
        game(
          "I only have one hour today. Is the ninety-minute one better?",
          "Then I recommend the sixty-minute session, madam. It fits your time.",
          "Ninety better. You take.",
          "The ninety-minute one is always better, madam. You can be a little late for your next plan.",
          undefined,
          "Câu cuối bán buổi dài hơn bất chấp thời gian của khách. Câu đúng gợi ý theo đúng nhu cầu khách vừa nói.",
        ),
      ],
    }),

    L(30, 2, "Explain and Coordinate", "Giải thích và điều phối", {
      vocabulary: [
        c("Cancellation deadline", "The cancellation deadline is noon the day before."),
        c("Upgrade price", "The upgrade price for the hot stone massage is on the menu."),
        c("Therapist gender", "You can choose your therapist gender when you book."),
        c("Locker number", "Your locker number is on your key."),
      ],
      grammar: [
        g(
          "Pay because late.",
          "There is a charge because the cancellation deadline was noon yesterday.",
          "Tuần 24: 'because' + mệnh đề có chủ ngữ và động từ; 'because of' chỉ đi với danh từ.",
          "There is a charge because of the cancellation deadline was noon yesterday.",
        ),
        g(
          "Male? Female? I don't know.",
          "I will ask the spa desk to confirm the therapist gender by noon.",
          "Tuần 26: 'ask + người + to + động từ' — không bỏ 'to'.",
          "I will ask the spa desk confirm the therapist gender by noon.",
        ),
      ],
      speaking: [
        sp(
          "I cancelled at six this morning. Why is there a charge?",
          t2a,
          "Tuần 24: lý do thật + chỗ khách đọc được quy định.",
        ),
        sp(
          "That is not fair. Take it off now.",
          t2b,
          "Công nhận cảm xúc; bỏ phí là việc của quản lý — nói ai gọi lại.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Fine. And next time I want a female therapist.",
          t2c,
          "Ghi lại mong muốn của khách cho lần đặt sau.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "How much more is the hot stone upgrade?",
          "The upgrade price is on the spa menu, sir. Let me show you.",
          "Chỉ đúng bảng giá — không đọc giá theo trí nhớ.",
        ),
        sp(
          "I forgot my locker number.",
          "Your locker number is on your key, sir.",
          "Câu ngắn, đúng thông tin.",
        ),
      ],
      reading: read(
        `Mrs Diaz cancels her massage at six in the morning. Khoa explains the charge: the cancellation deadline was noon the day before. Mrs Diaz says it is not fair. Khoa cannot change the charge, so his manager calls her that day. She also wants a female therapist next time, and Khoa notes the therapist gender on her booking.`,
        [
          {
            q: "Vì sao khách bị tính phí?",
            options: [
              "Vì khách hủy sau hạn chót trưa hôm trước",
              "Vì khách không đến buổi hẹn lúc sáu giờ sáng",
              "Vì khách muốn đổi sang kỹ thuật viên nữ",
            ],
            correct: 0,
            explanation:
              "'the cancellation deadline was noon the day before' — hạn chót đã qua lúc khách hủy.",
          },
          {
            q: "Khoa làm gì với yêu cầu bỏ phí?",
            options: [
              "Tự bỏ phí vì khách là khách quen",
              "Giải thích lại cho tới khi khách đồng ý",
              "Để quản lý gọi cho khách trong ngày",
            ],
            correct: 2,
            explanation:
              "'Khoa cannot change the charge, so his manager calls her that day' — giải thích là việc của Khoa, quyết về tiền là của quản lý.",
          },
        ],
      ),
      game: [
        game(
          "The man at the pool said the upgrade is free today.",
          "Let me check the upgrade price with the spa desk, sir.",
          "Upgrade is free maybe, sir, if my colleague say yes then okay for you.",
          "If my colleague said so, it must be right, sir. I will give you the upgrade for free.",
          undefined,
          "Câu cuối tặng miễn phí dựa trên lời kể — vượt quyền. Câu đúng kiểm tra giá với quầy spa trước.",
        ),
      ],
    }),

    L(30, 3, "Apologise and Solve", "Xin lỗi và giải quyết", {
      vocabulary: [
        c("Pressure preference", "Your pressure preference is light, so I will be gentle."),
        c("Sensitive area", "Please tell me about any sensitive area I should avoid."),
        c("Health form answers", "I read your health form answers before we start."),
      ],
      grammar: [
        g(
          "Our mistake.",
          "I am sorry it hurt, madam. Your pressure preference is light, and I will follow it.",
          "Tuần 27: xin lỗi về điều khách gặp + việc bạn làm ngay. Sau 'will' không thêm -s.",
          "I am sorry it hurt, madam. Your pressure preference is light, and I will follows it.",
        ),
        g(
          "Avoid knee? Okay.",
          "If you have a sensitive area, I will avoid it, sir.",
          "Tuần 28: mệnh đề 'If' dùng hiện tại (have), không dùng 'will have'.",
          "If you will have a sensitive area, I will avoid it, sir.",
        ),
      ],
      speaking: [
        risk(
          sp(
            "Ouch! That is my bad knee.",
            t3a,
            "Khách đau: DỪNG trước, rồi xem lại phiếu sức khỏe. Không làm tiếp cho xong buổi.",
            undefined,
            ["health", "form", "answers"],
          ),
        ),
        sp(
          "It is on the form. Did nobody read it?",
          t3b,
          "Không đổ lỗi, không chối: tránh vùng đau và báo giám sát.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Can I still finish the massage?",
          t3c,
          "Tuần 28: đề nghị có điều kiện, trong giới hạn an toàn.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "I like very light pressure, please.",
          "Thank you, madam. I will note your pressure preference for your next visit.",
          "Ghi lại sở thích để lần sau không phải hỏi lại.",
        ),
        sp(
          "Is there anything you need to know before we start?",
          "Yes, madam. Please tell me about any sensitive area I should avoid.",
          "Hỏi vùng cần tránh TRƯỚC khi bắt đầu.",
        ),
      ],
      reading: read(
        `During a massage, Mr Reyes says, "Ouch! That is my bad knee." Duc stops at once and checks the health form answers. The knee is on the form, under areas to avoid. Duc apologises, avoids the knee for the rest of the massage and tells his supervisor the same day. He does not blame the colleague who read the form.`,
        [
          {
            q: "Đức làm gì ngay khi khách kêu đau?",
            options: [
              "Hỏi khách bị đau đầu gối từ bao giờ",
              "Dừng lại và xem lại phiếu sức khỏe",
              "Làm nhẹ tay hơn rồi tiếp tục làm",
            ],
            correct: 1,
            explanation:
              "'Duc stops at once and checks the health form answers' — dừng trước, rồi mới tìm nguyên nhân.",
          },
          {
            q: "Đức làm gì sau đó?",
            options: [
              "Tránh đầu gối và báo giám sát trong ngày",
              "Nói với khách đồng nghiệp đã đọc sót phiếu",
              "Kết thúc buổi massage và mời khách về",
            ],
            correct: 0,
            explanation:
              "'avoids the knee… and tells his supervisor' — sửa ngay cho khách, báo lên để sửa quy trình; không đổ cho đồng nghiệp.",
          },
        ],
      ),
      game: [
        game(
          "That really hurt my shoulder.",
          "I am very sorry, madam. I will stop and use a lighter pressure.",
          "Shoulder hurt? Normal.",
          "That is normal for a deep massage, madam. It means the massage is working well.",
          undefined,
          "Câu cuối coi cơn đau là bình thường và làm tiếp. Câu đúng xin lỗi, dừng và đổi lực ngay.",
        ),
      ],
    }),

    L(30, 4, "End of Phase Three", "Kết thúc giai đoạn ba", {
      vocabulary: [
        c("Confident", "I feel confident with difficult guests now."),
        c("Pool opening hours", "The pool opening hours are from seven to nine."),
        c("Next appointment date", "Your next appointment date is on your booking card."),
      ],
      grammar: [
        g(
          "Guest dizzy, I help.",
          "The guest was sitting in the sauna when she felt dizzy.",
          "Tuần 29: was + -ing cho việc đang diễn ra; quá khứ đơn cho việc chen vào.",
          "The guest was sit in the sauna when she felt dizzy.",
        ),
        g(
          "Pool open.",
          "The pool opening hours are from seven to nine, madam.",
          "'hours' số nhiều → 'are', không phải 'is'.",
          "The pool opening hours is from seven to nine, madam.",
        ),
      ],
      speaking: [
        sp(
          "What time does Hoa finish work? I want to take her to dinner.",
          t4a,
          "Giờ làm của đồng nghiệp là riêng tư. Không nói, và đưa cách đúng: đặt lịch.",
        ),
        sp(
          "Then book me with her on Friday morning.",
          t4b,
          "Xác nhận đủ: ngày, giờ, người làm.",
          undefined,
          undefined,
          t4a,
        ),
        sp(
          "Will someone remind me?",
          t4c,
          "Hứa nhắc lịch, có thời điểm cụ thể.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "Is the pool open after dinner?",
          "The pool opening hours are from seven to nine, madam, so it closes at nine.",
          "Thông tin chính xác + điều đó có nghĩa gì với khách.",
        ),
        sp(
          "Do you feel confident on busy days now?",
          "Yes. I feel confident, and I still ask my supervisor when I am not sure.",
          "Tự tin nhưng biết giới hạn của mình — câu chốt giai đoạn ba.",
          "manager",
        ),
      ],
      reading: read(
        `On a busy Friday, Vy feels confident. A guest asks what time Hoa finishes work, because he wants to take her to dinner. Vy does not tell him. She books his next appointment date with Hoa instead. Later, a guest feels dizzy in the sauna. Vy helps her out, gives her water and calls the hotel nurse.`,
        [
          {
            q: "Vì sao Vy không nói giờ tan ca của Hoa?",
            options: [
              "Vì Vy không biết lịch làm của Hoa",
              "Vì Hoa đã xin nghỉ vào chiều hôm đó",
              "Vì giờ làm của đồng nghiệp là riêng tư",
            ],
            correct: 2,
            explanation:
              "'Vy does not tell him. She books his next appointment date with Hoa instead' — giữ riêng tư, vẫn phục vụ khách đúng cách.",
          },
          {
            q: "Khi khách bị choáng trong phòng xông hơi, Vy làm gì?",
            options: [
              "Đưa khách ra, cho uống nước, gọi y tá",
              "Mời khách ngồi nghỉ trong phòng xông hơi",
              "Gọi điện cho người nhà của khách tới đón",
            ],
            correct: 0,
            explanation:
              "'Vy helps her out, gives her water and calls the hotel nurse' — ra khỏi chỗ nóng trước, rồi người có chuyên môn.",
          },
        ],
      ),
      game: [
        game(
          "A guest wants to know what time Lan finishes work today.",
          "We do not give that out. We can book him a massage with Lan.",
          "Lan finish six. He wait.",
          "She finishes at six, so he can wait for her at the staff door after her shift.",
          "colleague",
          "Câu cuối đưa giờ làm và chỗ chờ của đồng nghiệp cho người lạ. Câu đúng giữ riêng tư và đưa cách đặt lịch.",
        ),
      ],
    }),
  ];
}

/** Spa & Wellness's Phase 3, week by week. */
export const SW_P3: Record<number, LessonContent[]> = {
  23: week23(),
  24: week24(),
  25: week25(),
  26: week26(),
  27: week27(),
  28: week28(),
  29: week29(),
  30: week30(),
};
