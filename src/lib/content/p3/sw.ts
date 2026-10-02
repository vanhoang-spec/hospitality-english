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
//    no sauna after alcohol, no massage after an operation without a doctor's
//    note, and pregnancy goes to the manager before anything starts. A nut
//    allergy means a NUT-FREE oil the therapist checks; "unscented" says
//    nothing about nuts (the commonest unscented carrier is sweet almond).
//  · A therapist never diagnoses: "I cannot say" and the hotel nurse, not a
//    guess. Pain, a burning skin, dizziness, a guest who can hardly breathe:
//    the treatment STOPS, the skin is cleaned with cool water, the guest is
//    brought out of the heat first and never left alone, and the hotel nurse
//    is called. What happened to a guest goes in the incident report; the
//    equipment goes in its own log.
//  · Charges are explained by the reason ("because the room was kept for
//    you") and billed by the spa desk. One cancellation policy: four hours
//    before the treatment. Free minutes, upgrades, refunds, a removed fee or a
//    free reschedule belong to the spa manager — said plainly, with who calls.
//    Safety and treatment questions go to the spa supervisor.
//  · A colleague's number or working hours are not given out, and a guest who
//    wants to take a therapist out is not booked with her: another therapist,
//    and the supervisor is told. A guest who crosses a line is stopped at the
//    FIRST request: the treatment stops, the therapist leaves the room and
//    calls the supervisor.
//  · An apology is for what the guest met, never a verdict on whose fault it
//    was before anybody has checked. When the guest has already said what they
//    want, the therapist does it — no "If you prefer…" after a preference.
//  · Week 29 is talk between colleagues and to the supervisor, and is
//    labelled so; each log holds its own thing.
//
// Turns marked `risk` are those hard cases; the checkpoint's must-be-right
// draw comes from them, and each carries the other wordings the course
// accepts (`alsoAccept`). Cards keep the Spa bank entries (kit.ts looks them
// up), because Phase 4 recycles most of them; the new cards (Nut-free, High
// blood pressure, Doctor's note, Alcohol, Valuables, Availability, Reminder,
// Delay, Incident report, Patch test) bring their own glosses.
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
  const t2a =
    "For stiff shoulders, I recommend the hot stone massage. It is warmer than the traditional one.";
  const t2b =
    "Thank you, sir. With high blood pressure, I cannot offer the hot stone or the sauna.";
  const t2c =
    "I recommend a gentle massage with light pressure. My manager will check your form first.";
  const t3a =
    "I recommend our four-session package, madam. It is cheaper than four single massages.";
  const t3b = "Four massages, and the herbal tea is complimentary. The package lasts three months.";
  const t3c = "Of course, madam. I will book one massage for today.";
  const t4a =
    "I am glad you enjoyed it, madam. I recommend our aloe cream to moisturise your skin.";
  const t4b = "No, madam. The cream is lighter than the oil, and it has no smell.";
  const t4c = "Of course, madam. Thank you for your feedback, and enjoy your evening.";
  const nutFree = "Yes, madam. Then we need a nut-free oil, and I will check it first.";
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
        c("Nut-free", "For a guest with a nut allergy, we use a nut-free oil.", [
          "/ˌnʌt ˈfriː/",
          "Không chứa hạt (lạc, hạnh nhân, óc chó…)",
          "🥜",
        ]),
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
          "For a nut allergy, I recommend a nut-free oil, madam.",
          "Gợi ý bằng 'I recommend + món' — không chèn 'you' sau 'recommend'. Dị ứng hạt cần dầu KHÔNG CHỨA HẠT; dầu 'không mùi' vẫn có thể làm từ hạnh nhân.",
          "For a nut allergy, I recommend you a nut-free oil, madam.",
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
        {
          ...sp(
            "I am four months pregnant. Is the massage still all right?",
            t1c,
            "Khách mang thai: bạn KHÔNG tự quyết là được hay không. Chưa bắt đầu cho tới khi quản lý kiểm tra.",
            undefined,
            ["start", "manager"],
            t1b,
          ),
          alsoAccept: [
            "Thank you for telling me. I cannot start until I ask my manager.",
            "Thank you, madam. I will ask my manager before we start.",
            "I cannot start until the manager checks, madam.",
          ],
        },
        risk({
          ...sp(
            "I am allergic to nuts. Is the almond oil a problem?",
            nutFree,
            "Dị ứng hạt: dầu hạnh nhân làm từ hạt. Kiểm tra dầu và chọn loại KHÔNG CHỨA HẠT — 'không mùi' chưa chắc đã không có hạt.",
            undefined,
            ["need", "nut", "free", "oil", "check"],
          ),
          alsoAccept: [
            "Yes, madam. I will check our oils and use a nut-free one.",
            "Thank you, madam. I will check our oils and use a nut-free oil.",
          ],
        }),
        sp(
          "Do you need to know about the medicine I take?",
          "Yes, sir. Please write it on the consultation form, and I will read it first.",
          "Thuốc khách đang dùng thuộc phần tư vấn — mời khách ghi lại, bạn đọc trước.",
        ),
        sp(
          "Do I have to take off my rings and my watch?",
          "Yes, please, madam. You can put them in your locker before the massage.",
          "Nhờ khách cất trang sức trước liệu trình, chỉ chỗ an toàn.",
        ),
        sp(
          "Is the consultation private?",
          "Yes, madam. Only your therapist and my manager read the consultation form.",
          "Thông tin sức khỏe là riêng tư: nói rõ ai được đọc.",
        ),
      ],
      reading: read(
        `Ms Weber books a hot stone massage. Before it, Hoa does a short consultation. Ms Weber says she is allergic to nuts. The almond oil has nuts in it, so Hoa checks the oils and chooses a nut-free one. Then Ms Weber says she is four months pregnant. Hoa does not start the massage. She asks her manager first. Hoa writes both answers on the consultation form, so the next therapist knows them too.`,
        [
          {
            q: "Vì sao Hoa không dùng dầu hạnh nhân?",
            options: [
              "Vì dầu hạnh nhân đắt hơn dầu thường",
              "Vì dầu hạnh nhân có hạt, mà khách dị ứng hạt",
              "Vì khách nói mình thích mùi nhẹ hơn mùi hạnh nhân",
            ],
            correct: 1,
            explanation:
              "'The almond oil has nuts in it, so Hoa checks the oils and chooses a nut-free one' — dị ứng hạt cần dầu không chứa hạt.",
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
          "I understand, madam. The form is short, and we need it first.",
          "I understand, madam. The form short, and we need it first.",
          "Of course, madam. Just tell the therapist during the massage.",
          undefined,
          "Câu cuối bỏ qua bước tư vấn — dị ứng và chống chỉ định phải được hỏi TRƯỚC khi bắt đầu. Câu đúng giữ bước tư vấn và nói nó ngắn.",
        ),
        game(
          "I have a nut allergy. Which oil will you use on me?",
          "Thank you, madam. I will check our oils and use a nut-free oil.",
          "Thank you, madam. I will check our oils and use a nut-free oils.",
          "Our unscented oil is very gentle, madam, so it is perfect for any allergy.",
          undefined,
          "Câu cuối nhầm 'không mùi' với 'không chứa hạt' — dầu không mùi vẫn có thể làm từ hạnh nhân. Câu đúng kiểm tra dầu và dùng loại không chứa hạt.",
        ),
      ],
    }),

    L(23, 2, "Comparing Two Treatments", "So sánh hai liệu trình", {
      vocabulary: [
        c("Recommend", "I recommend the foot massage for tired legs.", [
          "/ˌrekəˈmend/",
          "Giới thiệu, đề xuất",
          "🛍️",
        ]),
        c(
          "High blood pressure",
          "With high blood pressure, a guest cannot use the sauna or the hot stones.",
          ["/ˌhaɪ ˈblʌd ˌpreʃə/", "Huyết áp cao", "🩺"],
        ),
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
          "I recommend the hot stone massage, sir. It is warmer than the traditional one.",
          "Tính từ ngắn so sánh hơn: thêm -er + than. warm → warmer than. Không dùng 'more warm'.",
          "I recommend the hot stone massage, sir. It is more warm than the traditional one.",
        ),
        g(
          "Foot soft, stone hard.",
          "The foot massage is gentler than the hot stone, madam.",
          "gentle → gentler than. Thiếu -r là chưa so sánh.",
          "The foot massage is gentle than the hot stone, madam.",
        ),
      ],
      speaking: [
        sp(
          "My shoulders are very stiff. Which massage is better for me?",
          t2a,
          "Gợi ý MỘT liệu trình và so sánh bằng -er + than.",
        ),
        {
          ...sp(
            "Good. I should say that I have high blood pressure.",
            t2b,
            "Huyết áp cao: KHÔNG đá nóng, KHÔNG xông hơi khô. Nói rõ cả hai, không tranh luận.",
            undefined,
            ["offer", "hot", "stone", "sauna"],
            t2a,
          ),
          alsoAccept: [
            "Thank you, sir. I cannot offer the hot stone or the sauna with high blood pressure.",
            "I am sorry, sir. With high blood pressure, I cannot offer the sauna or the hot stone.",
          ],
        },
        sp(
          "Then what do you recommend for my shoulders?",
          t2c,
          "Gợi ý lại trong giới hạn an toàn, và nói quản lý xem phiếu sức khỏe trước.",
          undefined,
          undefined,
          t2b,
        ),
        risk({
          ...sp(
            "I am pregnant. Can I still have a hot stone massage?",
            "Thank you, madam. I will ask my manager before we start.",
            "Khách mang thai: bạn KHÔNG tự quyết. Chưa bắt đầu — hỏi quản lý trước.",
            undefined,
            ["ask", "manager", "start"],
          ),
          alsoAccept: [
            "Thank you, madam. I cannot start until my manager checks.",
            "Thank you for telling me. I will ask the manager before we start.",
          ],
        }),
        sp(
          "Is firm pressure better than light pressure?",
          "Not always, madam. Light pressure is gentler, and we can change it at any time.",
          "Trả lời câu so sánh bằng một câu so sánh; để khách chủ động.",
        ),
        sp(
          "My legs feel heavy after the long flight.",
          "I recommend the foot massage, madam. It is good for your circulation.",
          "Nhu cầu → một gợi ý → một lợi ích.",
        ),
        sp(
          "I am not sure what pressure I like.",
          "Then we can start with light pressure, sir, and I will ask you after five minutes.",
          "Bắt đầu nhẹ, rồi hỏi lại — khách quyết lực ấn.",
        ),
      ],
      reading: read(
        `Mr Lund has stiff shoulders and asks about the hot stone massage. Tuan explains that it is warmer than the traditional massage. Then Mr Lund says he has high blood pressure. Tuan does not offer the hot stone or the sauna. He recommends a gentle massage with light pressure, and his manager checks the health form first. Mr Lund enjoys the gentle massage, and he says his shoulders feel much better.`,
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
          "Which is easier for me, the sauna or the foot massage? I get hot quickly.",
          "The foot massage is gentler, madam. It is not as hot as the sauna.",
          "The foot massage is more gentler, madam. It is not as hot as the sauna.",
          "They are both very nice, madam, so please just choose the one you like best.",
          undefined,
          "Câu cuối không giúp khách chọn, dù khách vừa nói mình dễ bị nóng. Câu đúng so sánh rõ MỘT điểm khách quan tâm: độ nóng.",
        ),
        game(
          "I have high blood pressure, but I love the sauna. Is that all right?",
          "I am sorry, sir. With high blood pressure, I cannot offer the sauna or the hot stone.",
          "I am sorry, sir. With high blood pressure, I cannot offering the sauna or the hot stone.",
          "A short visit is fine, sir. Just come out if you feel dizzy.",
          undefined,
          "Câu cuối tự quyết là 'không sao' — nhiệt là chống chỉ định với huyết áp cao, và kỹ thuật viên không tự bỏ qua nó. Câu đúng từ chối rõ cả xông hơi lẫn đá nóng.",
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
        c(
          "Draping technique",
          "With our draping technique, only the area we massage is uncovered.",
          ["/ˈdreɪpɪŋ tekˈniːk/", "Kỹ thuật phủ khăn giữ kín đáo cho khách", "🩹"],
        ),
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
          "Yes, madam. With our draping technique, only the area we massage is uncovered.",
          "Trấn an bằng sự thật về quy trình: chỉ vùng đang làm mới mở khăn.",
        ),
        sp(
          "My husband would like to come with me next time.",
          "Then I recommend the couple's combo, madam. It is better value than two single bookings.",
          "Gợi ý gói đôi chỉ khi khách nhắc tới người đi cùng.",
        ),
        sp(
          "Is the combo cheaper than booking two treatments?",
          "Yes, sir. The combo is cheaper than two single treatments.",
          "Trả lời câu so sánh bằng một câu so sánh.",
        ),
        sp(
          "Does the combo come with anything to drink?",
          "Yes, sir. Herbal tea is complimentary with the combo.",
          "'Complimentary' = đi kèm, không tính thêm.",
        ),
      ],
      reading: read(
        `Mrs Lopez is staying for two weeks and wants a massage every few days. Thu recommends the four-session package, because it is cheaper than four single massages. Mrs Lopez says she only wants one massage today. Thu does not push. She books one massage and says the package lasts three months, in case Mrs Lopez changes her mind. Two days later, Mrs Lopez comes back and buys the package after all.`,
        [
          {
            q: "Vì sao Thu gợi ý gói bốn buổi?",
            options: [
              "Vì khách sạn yêu cầu bán gói cho mọi khách",
              "Vì gói có thêm một buổi massage miễn phí cho khách",
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
          "No, madam. The herbal tea are complimentary with every treatment.",
          "Yes, madam. Sorry, the herbal tea is only for guests who buy a package.",
          undefined,
          "Câu cuối nói sai sự thật để bán gói. Câu đúng nói rõ trà đi kèm mọi liệu trình — khách tự quyết có mua gói hay không.",
        ),
        game(
          "I am a bit shy. Do I have to take everything off?",
          "Only what you are comfortable with, madam. A towel covers you.",
          "Only what you are comfortable with, madam. A towel cover you.",
          "Yes, madam, everything, but do not worry. Our therapists see it every day.",
          undefined,
          "Câu cuối gạt sự ngại ngùng của khách đi. Câu đúng để khách quyết và nói rõ khăn phủ người khách.",
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
        c("Moisturise", "This cream will moisturise your skin after the steam.", [
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
          "This cream is lighter than the body oil, and it will moisturise your skin.",
          "So sánh hơn để giới thiệu (lighter than), rồi một lợi ích. Sau 'will' động từ ở dạng gốc.",
          "This cream is lighter than the body oil, and it will moisturises your skin.",
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
        sp(
          "Can I buy the cream you used on my face today?",
          "Of course, madam. It will moisturise your skin, and it has no smell.",
          "Bán khi khách hỏi: nói một lợi ích và một điều khách cần biết.",
        ),
        sp(
          "Which is better for my hands, the oil or the cream?",
          "The cream is lighter, madam, and it will moisturise your hands quickly.",
          "So sánh một điểm, kèm một lợi ích.",
        ),
      ],
      reading: read(
        `After her massage, Ms Chen says her skin feels dry. Lan recommends the aloe cream, which is lighter than the body oil. Ms Chen says no, thank you. Lan accepts at once and asks for her feedback. Ms Chen says the music was a bit loud, so Lan tells her manager the same day. Ms Chen thanks her and books another massage for Saturday. She says she will try the cream next time.`,
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
          "Of course, madam. Thank you for come, and enjoy your evening.",
          "Are you sure, madam? This cream is much better than the one you use at home.",
          undefined,
          "Câu cuối ép khách sau khi khách đã từ chối. Câu đúng chấp nhận ngay và chào khách tử tế.",
        ),
        game(
          "My shoulders still feel a little tight after the massage.",
          "Thank you for telling me, madam. I will note it for next time.",
          "Thank you for telling me, madam. I will notes it for next time.",
          "That is normal, madam. You should book a longer massage for tomorrow.",
          undefined,
          "Câu cuối biến góp ý thành dịp bán thêm. Câu đúng cảm ơn và ghi lại để lần sau làm tốt hơn.",
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
  const t1c = "I am sorry, I cannot change the fee. I will ask my manager to call you.";
  const t2a =
    "Because some treatments use heat, madam. The health declaration form tells your therapist about your health.";
  const t2b = "Thank you, madam. I cannot start the massage without a doctor's note.";
  const t2c =
    "I understand, madam. Our medical clearance rule is there because your safety comes first.";
  const t3a = "I am sorry, sir. You cannot use the sauna after alcohol.";
  const t3b = "Because alcohol and heat together can make you faint, sir.";
  const t3c = "You can rest in the relaxation area with some herbal tea, sir.";
  const t4a = "I am sorry, sir. The massage has to end at four, because the next guest is booked.";
  const t4b =
    "Our late arrival policy keeps the next guest's time, sir. It is on your booking card.";
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
        c("Booking notice period", "For a group, the booking notice period is one day."),
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
        {
          ...sp(
            "Can you just take it off my bill?",
            t1c,
            "Bỏ phí là quyết định về tiền: bạn KHÔNG tự bỏ. Nói rõ ai quyết và bạn làm gì tiếp.",
            undefined,
            ["change", "fee", "manager", "call"],
            t1b,
          ),
          alsoAccept: [
            "I am sorry, I cannot change the fee. I will ask the manager to call you.",
            "I cannot change the fee myself, sir, but I will ask my manager to call you.",
          ],
        },
        sp(
          "Can I book massages for six friends this evening?",
          "For a group, the booking notice period is one day. I can book you all for tomorrow.",
          "Báo quy định kèm con số, rồi đưa ngay một lựa chọn khác.",
        ),
        risk({
          ...sp(
            "I was busy, so please delete the no-show fee.",
            "I am sorry, I cannot change the no-show fee. I will ask my manager to call you.",
            "Bỏ phí là quyết định về tiền: bạn KHÔNG tự bỏ. Nói rõ ai quyết và bạn làm gì tiếp.",
            undefined,
            ["change", "no", "show", "fee", "manager", "call"],
          ),
          alsoAccept: [
            "I am sorry, I cannot change the fee. I will ask my manager to call you.",
            "I cannot change the no-show fee myself, sir, but I will ask the manager to call you.",
            "I understand, madam. I cannot change the charge, but I will ask my manager to call you.",
          ],
        }),
        sp(
          "I want to cancel my massage at two. It is noon now.",
          "There is a late cancellation charge, madam, because the window is four hours.",
          "Báo phí trước khi khách hủy, kèm lý do. Không để khách tự phát hiện trên hóa đơn.",
        ),
        sp(
          "Is there a charge if I move my booking to Friday?",
          "No, madam. There is no charge if you change it four hours before.",
          "Thông tin đúng cũng là phục vụ: nói rõ khi nào KHÔNG mất phí.",
        ),
      ],
      reading: read(
        `Mr Brandt missed his massage yesterday, and there is a no-show fee on his bill. Nam explains: "We have to charge the fee because the room was kept for you." Mr Brandt says nobody told him. Nam does not argue. He cannot change the fee himself, so he asks his manager to call Mr Brandt. Later that afternoon, the manager listens to Mr Brandt and makes the decision about the fee.`,
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
              "Quản lý của Nam, người gọi cho khách",
              "Nam tự bỏ phí khỏi hóa đơn của khách",
              "Quầy lễ tân khách sạn, khi khách trả phòng hôm sau",
            ],
            correct: 0,
            explanation:
              "'He cannot change the fee himself, so he asks his manager to call' — nhân viên giải thích, quản lý quyết về tiền.",
          },
        ],
      ),
      game: [
        game(
          "I cancelled two hours before. Why do I still have to pay?",
          "Because the cancellation window is four hours, madam.",
          "Because the cancellation window four hours, madam.",
          "Do not worry, madam. I can take the charge off your bill myself this time.",
          undefined,
          "Câu cuối tự bỏ phí — đó là quyết định của quản lý. Câu đúng nêu lý do thật: thời hạn hủy là bốn giờ.",
        ),
        game(
          "Please just delete the no-show fee. I was busy.",
          "I am sorry, I cannot change the fee. I will ask the manager to call you.",
          "I am sorry, I cannot changing the fee. I will ask the manager to call you.",
          "Of course, sir. Since you were busy, I will delete it for you this time.",
          undefined,
          "Câu cuối tự xóa phí — vượt quyền của nhân viên. Câu đúng nói rõ mình không đổi được phí và ai sẽ gọi lại.",
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
          "Why do you need my health form before a facial?",
          "Because we do a contraindication check before every treatment, madam.",
          "Ôn tuần 23: 'because' + bước kiểm tra chống chỉ định.",
          undefined,
          ["because", "contraindication", "check"],
        ),
        sp(
          "Why do I have to fill in a health form for a massage?",
          t2a,
          "Khách hỏi vì sao: trả lời bằng 'because' + lý do thật, rồi nói phiếu khai báo dùng để làm gì.",
        ),
        risk({
          ...sp(
            "I had a knee operation three weeks ago.",
            t2b,
            "Sau phẫu thuật: KHÔNG bắt đầu khi chưa có giấy bác sĩ. Đó là quy định xác nhận y tế, không phải ý của bạn.",
            undefined,
            ["start", "massage", "doctor's", "note"],
            t2a,
          ),
          alsoAccept: [
            "Thank you for telling me. I cannot start without a doctor's note.",
            "I am sorry, madam. I cannot start the massage before I see a doctor's note.",
          ],
        }),
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
        sp(
          "Why do you ask about the medicine I take?",
          "Because some medicines change how your skin reacts to oil, sir.",
          "'because' + lý do cụ thể khách hiểu được.",
        ),
        sp(
          "I had a small procedure on my face last week. Can I have a facial?",
          "Thank you, madam. After a procedure, we have to see a doctor's note first.",
          "Sau thủ thuật trên mặt: chưa làm facial khi chưa có giấy bác sĩ.",
        ),
        sp(
          "When can I come back after my operation?",
          "When you have a doctor's note, madam, we can book you straight away.",
          "Nói rõ điều kiện để quay lại — không chỉ nói 'không'.",
        ),
      ],
      reading: read(
        `Mrs Novak fills in the health declaration form. She writes that she had a knee operation three weeks ago. Linh does not start the massage. She explains the medical clearance rule: after an operation, the spa has to see a doctor's note first. Massage near a new wound can be dangerous. Mrs Novak brings the note the next day. The therapist reads it, and the massage starts later that afternoon.`,
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
          "Thank you for telling me. I cannot start without a doctor's note.",
          "Thank you for telling me. I cannot starting without a doctor's note.",
          "If you feel fine, sir, I am sure it is no problem. We can start now and be careful.",
          undefined,
          "Câu cuối tự quyết là 'không sao' — kỹ thuật viên không chẩn đoán và không bỏ qua quy định. Câu đúng giữ quy định xác nhận y tế.",
        ),
        game(
          "Why do I have to write my medicines on this form?",
          "Because some medicines change how your skin reacts, madam.",
          "Because some medicines changes how your skin reacts, madam.",
          "It is just our hotel policy, madam. Everybody has to do it, I am afraid.",
          undefined,
          "Câu cuối chỉ nói 'đó là quy định' — không phải lý do. Câu đúng nêu lý do thật bằng 'because'.",
        ),
      ],
    }),

    L(24, 3, "A Rule Without Blame", "Nói quy định mà không trách khách", {
      vocabulary: [
        c("Policy", "Our spa policy is printed on the back of the menu."),
        c("Alcohol", "Guests cannot use the sauna after alcohol.", [
          "/ˈælkəhɒl/",
          "Rượu bia, đồ uống có cồn",
          "🍷",
        ]),
        c("Silence rule", "The relaxation area has a silence rule, so we speak softly."),
        c("Minimum age rule", "Our minimum age rule for the steam room is sixteen."),
      ],
      grammar: [
        g(
          "No shorts. Change.",
          "Guests have to wear swimwear in the pool because it keeps the water clean.",
          "'Guests' số nhiều → 'have to', không phải 'has to'. Sau 'because' là lý do thật (giữ nước sạch), không phải 'vì quy định'.",
          "Guests has to wear swimwear in the pool because it keeps the water clean.",
        ),
        g(
          "Drink beer? No sauna!",
          "You cannot use the sauna today because you had alcohol at lunch, sir.",
          "'because' + mệnh đề có chủ ngữ và động từ (you had…). Nói lý do, không trách khách.",
          "You cannot use the sauna today because of you had alcohol at lunch, sir.",
        ),
      ],
      speaking: [
        {
          ...sp(
            "I had two beers at lunch. Can I use the sauna now?",
            t3a,
            "Rượu bia + nhiệt là nguy hiểm: KHÔNG cho vào phòng xông. Nói nhẹ nhàng, không trách khách.",
            undefined,
            ["sauna", "alcohol"],
          ),
          alsoAccept: [
            "I am sorry, sir. After alcohol, you cannot use the sauna.",
            "I am sorry, sir. You cannot go into the sauna after alcohol.",
          ],
        },
        sp(
          "Why not? I feel fine.",
          t3b,
          "Khách hỏi vì sao: trả lời bằng 'because' + lý do an toàn.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "So what can I do this afternoon?",
          t3c,
          "Đưa một lựa chọn an toàn, không chỉ dừng ở lời từ chối.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "I forgot my swimsuit. Can I swim in my shorts?",
          "I am sorry, sir. Guests have to wear swimwear in the pool.",
          "Nói quy định nhẹ nhàng — báo thông tin, không trách khách quên.",
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
        sp(
          "Can I bring my glass of wine into the relaxation area?",
          "I am sorry, madam. We have to keep alcohol out of the spa because of the heat.",
          "'have to' + 'because of' + danh từ: quy định và lý do.",
        ),
        sp(
          "Do I have to take off all my clothes for the massage?",
          "No, madam. We use a draping technique, because your comfort comes first.",
          "Ôn tuần 23: kỹ thuật phủ khăn — lý do là sự thoải mái của khách.",
          undefined,
          ["draping", "technique", "because"],
        ),
        sp(
          "Where can I read all these rules?",
          "Our spa policy is on the back of the menu, madam.",
          "Chỉ đúng chỗ khách tự đọc được quy định.",
        ),
      ],
      reading: read(
        `Mr Dale comes to the spa after lunch. He has had two beers, and he wants to use the sauna. Vy explains the rule politely: guests cannot use the sauna after alcohol, because heat and alcohol together can make people faint. She offers him the relaxation area and some herbal tea. Mr Dale books the sauna for the next morning. The next day, he enjoys the sauna, and he thanks Vy for her care.`,
        [
          {
            q: "Vì sao Vy không cho khách vào phòng xông hơi khô?",
            options: [
              "Vì phòng xông hơi đã kín lịch chiều hôm đó",
              "Vì khách vừa uống bia, mà nhiệt và rượu bia dễ gây ngất",
              "Vì khách chưa mặc đồ bơi đúng quy định của khu xông hơi",
            ],
            correct: 1,
            explanation:
              "'heat and alcohol together can make people faint' — quy định có lý do an toàn thật.",
          },
          {
            q: "Vy làm gì sau lời từ chối?",
            options: [
              "Mời khách nghỉ ở khu thư giãn với trà thảo mộc",
              "Gọi quản lý ra giải thích lại quy định cho khách",
              "Cho khách vào xông mười phút cho nhanh",
            ],
            correct: 0,
            explanation:
              "'She offers him the relaxation area and some herbal tea' — từ chối đi kèm một lựa chọn an toàn.",
          },
        ],
      ),
      game: [
        game(
          "Can I make a quick phone call here in the relaxation area?",
          "Sorry, sir, this area has a silence rule. The lobby is outside.",
          "Sorry, sir, this area have a silence rule. The lobby is outside.",
          "Of course, sir, but please speak quietly so you do not wake anybody.",
          undefined,
          "Câu cuối cho phép phá quy định giữ yên lặng. Câu đúng nói quy định và chỉ chỗ khách gọi điện được.",
        ),
        game(
          "I only had one glass of wine. The sauna is fine, right?",
          "I am sorry, sir. The sauna is not safe after alcohol.",
          "I am sorry, sir. The sauna not safe after alcohol.",
          "One glass is fine, sir. Just drink some water first and stay for ten minutes only.",
          undefined,
          "Câu cuối tự quyết 'một ly thì không sao' — rượu bia cộng nhiệt là rủi ro ngất. Câu đúng từ chối rõ ràng, nhẹ nhàng.",
        ),
      ],
    }),

    L(24, 4, "Explaining the Policy", "Giải thích quy định", {
      vocabulary: [
        c("Late arrival policy", "Our late arrival policy means the treatment still ends on time."),
        c("Session extension fee", "There is a session extension fee for thirty extra minutes."),
        c("Locker deposit", "The locker deposit comes back when you return the key."),
        c("Valuables", "Please lock your valuables in your locker.", [
          "/ˈvæljuəblz/",
          "Đồ có giá trị (ví, đồng hồ, trang sức)",
          "💍",
        ]),
      ],
      grammar: [
        g(
          "You late. Short massage.",
          "Your massage has to finish at four, sir, because the next guest is booked.",
          "'your massage' là số ít → 'has to'. Lý do thật là khách tiếp theo — không phải 'vì quy định'.",
          "Your massage have to finish at four, sir, because the next guest is booked.",
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
          "That is not fair. Why should I lose twenty minutes?",
          t4b,
          "Quy định nói được mục đích của nó (giữ giờ cho khách sau) và chỗ khách đọc được.",
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
          "Can I leave my watch and wallet at the spa desk?",
          "Please lock your valuables in your locker, sir, because the spa desk cannot keep them.",
          "Đồ có giá trị: chỉ chỗ an toàn và nói lý do — quầy spa không giữ đồ.",
        ),
        sp(
          "What happens if I lose my locker key?",
          "There is a charge for a new key, sir, and it comes from the locker deposit.",
          "Nói rõ phí và tiền cọc dùng để làm gì.",
        ),
        sp(
          "My skin feels dry after the sauna. Do you sell anything for it?",
          "Yes, sir. This cream will moisturise your skin, because the heat dries it.",
          "Ôn tuần 23: gợi ý sản phẩm theo nhu cầu, kèm lý do bằng 'because'.",
          undefined,
          ["moisturise", "because"],
        ),
        sp(
          "How much is it to add thirty minutes to my massage?",
          "The session extension fee is on the spa menu, madam. Let me show you.",
          "Chỉ đúng bảng giá — không đọc giá theo trí nhớ.",
        ),
      ],
      reading: read(
        `Mr Kato arrives twenty minutes late for his massage at three. Hung explains the late arrival policy: the massage has to end at four, because the next guest is booked. Mr Kato is not happy, but he understands the reason. For next time, Hung tells him about the session extension fee for a longer massage. Hung does not argue with him. He books a ninety-minute massage for Mr Kato on Friday.`,
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
          "Why do I have to leave my bag in a locker?",
          "Because the spa desk cannot keep valuables, madam.",
          "Because the spa desk cannot keeps valuables, madam.",
          "It is just a rule, madam. Everybody does it.",
          undefined,
          "Câu cuối không nêu lý do và làm khách thấy bị ép. Câu đúng nói lý do thật bằng 'because'.",
        ),
        game(
          "I was late, so please just finish my massage at half past four.",
          "I am sorry, sir. The next guest is booked, so we have to finish at four.",
          "I am sorry, sir. The next guest is booked, so we have to finishing at four.",
          "No problem, sir. The next guest can wait a little for you today.",
          undefined,
          "Câu cuối bắt khách sau phải chịu lỗi trễ của người khác. Câu đúng giữ giờ kết thúc và nói lý do.",
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
  const t2b = "Of course. I will check our availability and call your room by noon.";
  const t2c = "Yes, sir. We will set up the foot bath by a quarter to six.";
  const t3a = "Of course, madam. I will call you at the pool by two o'clock.";
  const t3b = "Yes, madam. I will update the treatment schedule and call you within five minutes.";
  const t3c = "Of course. I will send you a reminder by six this evening.";
  const t4a = "I will stop the facial now, madam, and clean your skin with cool water.";
  const t4b = "I am sorry, I cannot say, madam. I am calling the hotel nurse now.";
  const t4c = "Of course, madam. I will stay with you until the nurse comes.";
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
          "We are a group of eight. Can we all come tomorrow at ten?",
          "Yes, madam. That meets our booking notice period, so I will book you now.",
          "Ôn tuần 24: thời gian báo trước khi đặt cho nhóm — đủ thì đặt ngay.",
          undefined,
          ["booking", "notice", "period"],
        ),
        sp(
          "The shower in the changing room is cold.",
          "I am sorry, sir. I will ask a colleague to check it within ten minutes.",
          "Xin lỗi + ai làm + mốc giờ.",
        ),
        sp(
          "We are early. Can we do the consultation now?",
          "Of course, madam. We can do the consultation while I prepare the room.",
          "Ôn tuần 23: buổi tư vấn đi trước — tận dụng thời gian chờ.",
          undefined,
          ["consultation"],
        ),
        sp(
          "What will the herbal compress do for my back?",
          "It is warm, sir, and it helps the circulation in your back.",
          "Ôn tuần 23: nói một lợi ích cụ thể, không hứa chữa bệnh.",
          undefined,
          ["circulation"],
        ),
      ],
      reading: read(
        `Mr and Mrs Sato arrive early for their massage. Quynh promises to prepare the treatment room within ten minutes, and she brings them herbal tea straight away. The herbal compress needs fifteen minutes to heat, so Quynh tells them the exact start time. At a quarter past three, the room and the compress are both ready. After the massage, Mr Sato says they felt no rush at all, because every time was clear.`,
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
              "Vì khách muốn đi ăn trưa trước khi bắt đầu buổi massage",
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
          "Within ten minute, madam. I will prepare it now.",
          "As soon as possible, madam.",
          undefined,
          "'As soon as possible' không phải lời hứa: khách không biết phải chờ đến khi nào. Câu đúng có con số: 'within ten minutes'.",
        ),
        game(
          "Could we have some water while we wait?",
          "Of course, sir. I will bring it straight away.",
          "Of course, sir. I will brings it straight away.",
          "There is a water machine in the gym, sir. You can help yourself there.",
          undefined,
          "Câu cuối đẩy việc nhỏ sang khách. Câu đúng nhận việc và làm ngay.",
        ),
      ],
    }),

    L(25, 2, "By Six O'clock", "Trước sáu giờ", {
      vocabulary: [
        c("Going to", "We are going to reserve the couple's suite for six o'clock."),
        c("Set up the foot bath", "I will set up the foot bath before your massage."),
        c("Reserve the couple's suite", "I will reserve the couple's suite for your anniversary."),
        c("Availability", "Please check our availability before you promise a time.", [
          "/əˌveɪləˈbɪləti/",
          "Lịch trống (còn người, còn phòng)",
          "📅",
        ]),
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
          "Chưa chắc thì kiểm tra lịch trống trước, rồi hứa có mốc (by noon).",
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
          "Can I bring my own oil for the massage?",
          "I am sorry, madam. We have to use our own oils, because we check every bottle.",
          "Ôn tuần 24: 'have to' + 'because' — nêu lý do thật của quy định.",
          undefined,
          ["because"],
        ),
        sp(
          "I am twenty minutes late for my six o'clock massage.",
          "I am sorry, sir. Our late arrival policy means we are going to finish at seven.",
          "Ôn tuần 24: quy định khách đến muộn + 'going to' cho giờ kết thúc đã định.",
          undefined,
          ["late", "arrival", "policy", "going"],
        ),
        sp(
          "Is there a therapist free this afternoon?",
          "Yes, madam. We have availability at four o'clock with Hoa.",
          "Kiểm tra lịch trống rồi mới hứa giờ.",
        ),
        sp(
          "Is the herbal tea free with the couple's suite?",
          "Yes, sir. The herbal tea is complimentary, and we are going to serve it at six.",
          "Ôn tuần 23: 'complimentary' = đi kèm, không tính tiền.",
          undefined,
          ["complimentary"],
        ),
        sp(
          "I have high blood pressure. Is the foot bath very hot?",
          "Thank you for telling me, sir. We are going to make the foot bath warm, not hot.",
          "Ôn tuần 23: huyết áp cao thì tránh nhiệt cao — nói rõ bạn sẽ làm gì.",
          undefined,
          ["high", "blood", "pressure"],
        ),
      ],
      reading: read(
        `Mr Okafor calls the spa at ten. It is his wedding anniversary, and he wants a couple's massage tonight. Dung reserves the couple's suite for six o'clock. His wife would like a female therapist, so Dung checks the availability and calls the room by noon. The foot bath is ready at a quarter to six. Mr Okafor says it is the best evening of their holiday, and he books again for Sunday.`,
        [
          {
            q: "Dũng hứa gọi lại cho khách lúc nào?",
            options: ["Trước sáu giờ tối", "Trước buổi trưa", "Ngay trong cuộc gọi"],
            correct: 1,
            explanation: "'calls the room by noon' — 'by noon' = không muộn hơn mười hai giờ trưa.",
          },
          {
            q: "Vì sao chậu ngâm chân sẵn sàng lúc sáu giờ kém mười lăm?",
            options: [
              "Vì ngâm chân diễn ra trước buổi massage lúc sáu giờ",
              "Vì vợ khách muốn ngâm chân sau bữa tối",
              "Vì phòng trị liệu đôi chỉ mở cửa sau sáu giờ tối hôm đó",
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
          "I will confirm your therapist by noon and call you room, sir.",
          "I am not sure yet, sir. Just come down at six.",
          undefined,
          "Câu cuối không hứa gì và để khách tự chờ. Câu đúng có mốc (by noon) và cách báo lại (call your room).",
        ),
        game(
          "Do you have a free therapist at four today?",
          "Yes, madam. We have availability at four.",
          "Yes, madam. We has availability at four.",
          "Maybe, madam. Come down at four and we will see who is free then.",
          undefined,
          "Câu cuối bắt khách tự đến để thử vận may. Câu đúng đã kiểm tra lịch trống và nói giờ cụ thể.",
        ),
      ],
    }),

    L(25, 3, "Keeping the Guest Informed", "Báo cho khách tiến độ", {
      vocabulary: [
        c("Reminder", "We send a reminder the day before your treatment.", [
          "/rɪˈmaɪndə/",
          "Lời nhắc (lịch hẹn)",
          "🔔",
        ]),
        c(
          "Update the treatment schedule",
          "I will update the treatment schedule after your call.",
          ["/ʌpˈdeɪt ðə ˈtriːtmənt ˈʃedjuːl/", "Cập nhật lịch trị liệu", "📅"],
        ),
        c("Delay", "There is a short delay, so your massage starts at half past two.", [
          "/dɪˈleɪ/",
          "Sự chậm trễ",
          "⏳",
        ]),
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
          "We will send you a reminder by six this evening, sir.",
          "Hứa gửi gì, trước mấy giờ. Sau 'will' dùng 'send', không dùng 'sent'.",
          "We will sent you a reminder by six this evening, sir.",
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
          "Thank you. Can you remind me about tomorrow too?",
          t3c,
          "Lời hứa thứ ba vẫn có mốc giờ rõ ràng.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "My friend wants to take a phone call in the relaxation area.",
          "I am sorry, madam. The silence rule is for everyone, so I will show her the lobby.",
          "Ôn tuần 24: quy định giữ yên lặng + một lựa chọn khác cho khách.",
          undefined,
          ["silence", "rule", "show"],
        ),
        sp(
          "My therapist is not here yet. Is something wrong?",
          "There is a short delay, madam. Your therapist will start at a quarter past two.",
          "Nói thật là có chậm trễ, và đưa giờ mới cụ thể.",
        ),
        sp(
          "The guest in room four did not come. What should I do?",
          "Please update the treatment schedule. I will tell the spa desk about the no-show fee.",
          "Ôn tuần 24–25: cập nhật lịch, và để quầy spa xử lý phí không đến.",
          "colleague",
          ["update", "treatment", "schedule", "no", "show", "fee"],
        ),
        sp(
          "The lavender oil bottle in room two is empty.",
          "Thanks. I will refill the oil bottles within ten minutes.",
          "Nói với đồng nghiệp: ngắn, có mốc, không xưng hô sir/madam.",
          "colleague",
        ),
        sp(
          "If I cancel tomorrow morning, is that all right?",
          "Yes, madam, if it is inside the cancellation window. I will send a reminder tonight.",
          "Ôn tuần 24: thời hạn hủy bốn giờ — nhắc khách trước để khách khỏi mất phí.",
          undefined,
          ["cancellation", "window", "reminder"],
        ),
      ],
      reading: read(
        `Ms Rivera wants to swim before her massage at two. Khoa promises to call her at the pool by two o'clock. At half past one, there is a delay, so Khoa updates the treatment schedule and calls Ms Rivera at once. On the phone, Khoa gives her the new time: a quarter past two. She is happy to swim a little longer. Khoa also sends her a reminder for tomorrow's booking.`,
        [
          {
            q: "Khoa làm gì khi có chậm trễ?",
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
            q: "Khoa gửi gì cho khách?",
            options: [
              "Lời nhắc cho lịch hẹn ngày mai",
              "Hóa đơn của buổi massage hôm nay",
              "Thực đơn trị liệu của tuần sau",
            ],
            correct: 0,
            explanation:
              "'sends her a reminder for tomorrow's booking' — việc nhỏ đã hứa cũng được làm.",
          },
        ],
      ),
      game: [
        game(
          "Will somebody tell me when my therapist is ready? I will be swimming.",
          "Of course, madam. I will call you at the pool by two o'clock.",
          "Of course, madam. I will call you in the pool by two o'clock.",
          "Please come back to the spa desk and ask us now and then, madam. It is easier for us.",
          undefined,
          "Câu cuối đẩy việc theo dõi sang khách. Câu đúng nhận việc báo tin, nói rõ ở đâu và trước mấy giờ.",
        ),
        game(
          "My therapist is late again. What is happening?",
          "I am sorry, madam. There is a short delay. She will start at half past two.",
          "I am sorry, madam. There is a short delay. She will starts at half past two.",
          "She is busy, madam. Therapists are often late on Saturdays, so please be patient.",
          undefined,
          "Câu cuối coi việc trễ là chuyện thường và bắt khách chịu. Câu đúng xin lỗi, nói thật có chậm trễ, đưa giờ mới.",
        ),
      ],
    }),

    L(25, 4, "When Something Goes Wrong", "Khi có chuyện bất thường", {
      vocabulary: [
        c("Hotel nurses", "The hotel nurses come to the spa when a guest feels unwell."),
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
          "Nurse come.",
          "I am going to call the hotel nurse now, madam.",
          "'am going to' — không bỏ 'am'. Hứa việc bạn làm NGAY (now), không nói 'soon'; gọi người có chuyên môn, không tự chẩn đoán.",
          "I going to call the hotel nurse now, madam.",
        ),
      ],
      speaking: [
        risk({
          ...sp(
            "My face is burning after the mask!",
            t4a,
            "Da nóng rát: DỪNG ngay, làm sạch bằng nước mát. An toàn trước, giải thích sau.",
            undefined,
            ["facial", "clean", "skin", "cool", "water"],
          ),
          alsoAccept: [
            "I am sorry, madam. I will stop now and clean your skin with cool water.",
            "I will stop the facial and clean your skin with cool water now, madam.",
          ],
        }),
        {
          ...sp(
            "Is it an allergy? Should I see a doctor?",
            t4b,
            "Bạn KHÔNG chẩn đoán: 'I cannot say'. Gọi y tá của khách sạn ngay.",
            undefined,
            ["calling", "hotel", "nurse"],
            t4a,
          ),
          alsoAccept: [
            "I cannot say, madam. I will call the hotel nurse now.",
            "I am not sure, madam. I am calling the hotel nurse now.",
            "I am sorry, I do not know, madam. I am calling the hotel nurse now.",
          ],
        },
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
          "I had an operation last month. Can I book a massage for Friday?",
          "Yes, madam, once we see a doctor's note. That is our medical clearance rule.",
          "Ôn tuần 24: quy định xác nhận y tế — điều kiện trước khi đặt lịch.",
          undefined,
          ["doctor's", "note", "medical", "clearance", "rule"],
        ),
        sp(
          "The steam room feels much hotter than yesterday.",
          "Please do not use it now, sir. I will check the steam room straight away.",
          "Nghi có vấn đề về nhiệt: mời khách ra trước, kiểm tra ngay.",
        ),
        sp(
          "Here is my doctor's note. Can I book a massage now?",
          "Thank you, madam. With the doctor's note, I can book your next visit now.",
          "Ôn tuần 24: có giấy bác sĩ rồi mới đặt lịch massage sau phẫu thuật.",
          undefined,
          ["doctor's", "note"],
        ),
      ],
      reading: read(
        `During a facial, Mrs Ito says her face is burning. Ngoc stops at once and cleans her skin with cool water. Mrs Ito asks if it is an allergy. Ngoc does not guess. She calls the hotel nurse, and she stays with Mrs Ito until the nurse arrives. The nurse checks Mrs Ito's skin, and later Ngoc writes down exactly what happened and when. Then she tells her supervisor at once.`,
        [
          {
            q: "Ngọc làm gì ĐẦU TIÊN khi khách nói mặt bị rát?",
            options: [
              "Hỏi khách đã dùng loại kem gì ở nhà",
              "Dừng lại và làm sạch da bằng nước mát",
              "Gọi y tá rồi tiếp tục làm cho xong",
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
              "Vì quản lý đã dặn không nói chuyện với khách",
            ],
            correct: 0,
            explanation:
              "'Ngoc does not guess. She calls the hotel nurse' — chẩn đoán không phải việc của kỹ thuật viên.",
          },
        ],
      ),
      game: [
        game(
          "This mask stings a lot. Is that normal?",
          "I am sorry, madam. I will stop now and clean your skin with cool water.",
          "I am sorry, madam. I will stop now and cleaning your skin with cool water.",
          "A little stinging is normal with this mask, madam. Try to relax, and it will stop soon.",
          undefined,
          "Câu cuối tự kết luận 'bình thường' và tiếp tục — kỹ thuật viên không chẩn đoán. Câu đúng dừng ngay và làm sạch da.",
        ),
        game(
          "There are no robes in the changing room again!",
          "I am very sorry, madam. I will lay out fresh robes within five minutes.",
          "I am very sorry, madam. I will lay out fresh robe within five minutes.",
          "The linen team is late today, madam, so I am afraid it is not our fault.",
          undefined,
          "Câu cuối đổ lỗi cho bộ phận khác trước mặt khách. Câu đúng xin lỗi và hứa mốc giờ cho đúng việc khách cần.",
        ),
      ],
    }),
  ];
}

// ── Week 26 — One request, one owner ────────────────────────────────────
function week26(): LessonContent[] {
  const t1a = "Let me check with the gym instructors for you, sir.";
  const t1b =
    "My colleague at the gym books personal trainers, sir. I will transfer your call now.";
  const t1c = "Of course. I will tell the gym instructors that you have to finish by nine.";
  const t2a = "I am coming now, madam. I will help him out of the sauna.";
  const t2b = "I will take him to the cool area and call the hotel nurse now.";
  const t2c = "Yes, madam, a little cool water. The hotel nurse is on her way now.";
  const t3a =
    "Let me check with the nail technicians, madam. I will call you back within ten minutes.";
  const t3b = "Yes, madam. I have asked the nail technicians, and they are free at four.";
  const t3c = "Then I will ask the beauty therapists to call you before five.";
  const t4a = "I am sorry, madam. I have asked the spa linen staff to lay out fresh robes now.";
  const t4b =
    "Yes, madam. The spa linen staff have brought fresh robes, and I checked them myself.";
  const t4c = "I am sorry, madam. I will tell my supervisor about it today.";
  return [
    L(26, 1, "Let Me Check With…", "Để tôi hỏi bộ phận…", {
      vocabulary: [
        c("Colleague", "My colleague at the gym will help you."),
        c("Transfer", "I will transfer your call to the gym."),
        c("Gym instructors", "The gym instructors plan personal training."),
        c("Spa supervisors", "One of our spa supervisors is on duty all day."),
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
          "Hello, is that the spa? Can I book a personal trainer for tomorrow?",
          t1a,
          "Việc của phòng tập: nhận lời, tự hỏi giúp khách.",
        ),
        sp(
          "Can you not book it there at the spa desk?",
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
        risk({
          ...sp(
            "Hoa was wonderful. Can I have her phone number?",
            "I am sorry, I cannot give you her number. I can book your next visit with her.",
            "Số điện thoại của nhân viên là riêng tư: KHÔNG đưa. Đưa cách đúng — đặt lịch qua spa.",
            undefined,
            ["number", "book", "next", "visit"],
          ),
          alsoAccept: [
            "I am sorry, I cannot give you her phone number. I can book your next visit with her.",
            "I cannot give out her number, sir, but I can book your next visit with her.",
          ],
        }),
        sp(
          "Who decides the rules in the spa?",
          "The spa supervisors write our spa policy, madam. It is on the back of the menu.",
          "Ôn tuần 24: quy định của spa — ai viết, khách đọc ở đâu.",
          undefined,
          ["policy", "spa", "supervisors"],
        ),
        sp(
          "I would like to speak to someone senior about my bookings.",
          "Let me check with our spa supervisors, sir. One of them will call your room.",
          "'Let me check with' + đúng cấp có thẩm quyền.",
        ),
        sp(
          "My wife and I want a couple's massage on Saturday.",
          "Let me check our availability, sir. Then I will reserve the couple's suite for you.",
          "Ôn tuần 25: xem lịch trống trước, rồi mới giữ phòng.",
          undefined,
          ["availability", "reserve", "couple's", "suite"],
        ),
      ],
      reading: read(
        `Mr Silva calls the spa. He wants a personal trainer for tomorrow morning. Minh does not tell him to call the gym himself. He says, "Let me check with the gym instructors," and transfers the call. Mr Silva starts work at nine, so Minh tells the gym that too. Later, Mr Silva asks for Hoa's phone number, because he liked her massage. Minh does not give it. He books Mr Silva's next massage with Hoa at the spa desk.`,
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
            q: "Vì sao Minh báo cho phòng tập giờ khách bắt đầu làm việc?",
            options: [
              "Để buổi tập được xếp xong trước chín giờ",
              "Để phòng tập tính thêm phí cho buổi sáng sớm",
              "Để phòng tập gọi khách dậy đúng giờ",
            ],
            correct: 0,
            explanation:
              "'Mr Silva starts work at nine, so Minh tells the gym that too' — chuyển cả ràng buộc của khách, không chỉ chuyển máy.",
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
              "'Minh does not give it. He books Mr Silva's next massage with Hoa at the spa desk' — riêng tư của đồng nghiệp được giữ, khách vẫn đặt được lịch.",
          },
        ],
      ),
      game: [
        game(
          "Can you give me the gym's number? I will call them myself.",
          "Let me transfer your call to the gym now, sir.",
          "Let me transfers your call to the gym now, sir.",
          "Of course, sir. The gym is on the second floor, so you can just walk up and ask.",
          undefined,
          "Câu cuối đẩy khách tự đi hỏi. Câu đúng nhận việc và chuyển máy ngay cho khách.",
        ),
        game(
          "Hoa is the best. Could I have her mobile number, please?",
          "I cannot give out her number, sir, but I can book your next visit with her.",
          "I cannot give out her number, sir, but I can booking your next visit with her.",
          "Of course, sir. She will be very happy to hear from you. Let me write it down.",
          undefined,
          "Câu cuối đưa số riêng của đồng nghiệp cho khách — vi phạm riêng tư. Câu đúng từ chối và đưa cách đặt lịch qua spa.",
        ),
      ],
    }),

    L(26, 2, "I'll Ask Them To…", "Tôi sẽ nhờ họ…", {
      vocabulary: [
        c("Arrange", "I will arrange a quiet room for you."),
        c("Sauna attendants", "The sauna attendants check the heat every hour."),
        c("Pool attendants", "The pool attendants bring towels to the sun loungers."),
        c("Incident report", "When a guest feels unwell, we write an incident report.", [
          "/ˈɪnsɪdənt rɪˌpɔːt/",
          "Báo cáo sự cố",
          "📝",
        ]),
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
        {
          ...sp(
            "Come quickly! My husband feels dizzy in the sauna.",
            t2a,
            "Đi ngay, và đưa khách RA KHỎI chỗ nóng trước tiên.",
            undefined,
            ["help", "out", "sauna"],
          ),
          alsoAccept: [
            "I am coming, madam. I will help him out of the sauna now.",
            "I will come now and help him out of the sauna, madam.",
          ],
        },
        {
          ...sp(
            "He is very hot, and his face is red.",
            t2b,
            "Chỗ mát + gọi y tá ngay. Không để khách một mình, không tự chẩn đoán.",
            undefined,
            ["take", "cool", "area", "call", "hotel", "nurse"],
            t2a,
          ),
          alsoAccept: [
            "I will call the hotel nurse now and take him to the cool area.",
            "I will take him to the cool area now and call the hotel nurse.",
          ],
        },
        sp(
          "Can I give him some water?",
          t2c,
          "Một chút nước mát là được. Không hứa giờ thay y tá — chỉ nói y tá đang tới.",
          undefined,
          undefined,
          t2b,
        ),
        risk({
          ...sp(
            "Is the sauna meant to be this hot? I can hardly breathe in there.",
            "Please come out of the sauna now, sir. I am calling the hotel nurse.",
            "Khách khó thở: mời khách RA trước và gọi y tá ngay. Máy móc để sau.",
            undefined,
            ["out", "sauna", "calling", "hotel", "nurse"],
          ),
          alsoAccept: [
            "Please come out now, sir. I am calling the hotel nurse.",
            "Please come out of the sauna now, sir. I will call the hotel nurse.",
          ],
        }),
        risk({
          ...sp(
            "Quick! My friend feels faint in the steam room!",
            "I am coming now, madam. I will help her out and call the hotel nurse.",
            "Khách choáng trong phòng xông: tới ngay, đưa khách ra khỏi chỗ nóng, gọi y tá.",
            undefined,
            ["help", "out", "call", "hotel", "nurse"],
          ),
          alsoAccept: [
            "I am coming, madam. I will help her out and call the hotel nurse.",
            "I will come now, help her out and call the hotel nurse, madam.",
          ],
        }),
        sp(
          "Is the steam room all right to use now?",
          "Let me check the steam room first, madam. I will ask the sauna attendants to help.",
          "Ôn tuần 25: kiểm tra phòng xông trước khi mời khách vào.",
          undefined,
          ["check", "steam", "room", "sauna", "attendants"],
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
        sp(
          "Do we need to write anything about the guest in the sauna?",
          "Yes. I will write an incident report, and the sauna attendants will check the heat.",
          "Khách không khỏe trong spa là một sự cố — ghi báo cáo sự cố, có giờ.",
          "colleague",
        ),
      ],
      reading: read(
        `Mrs Berg runs to the spa desk: her husband suddenly feels dizzy in the sauna. Tuan goes at once and helps him out of the heat. He takes Mr Berg to the cool area and calls the hotel nurse. He gives him a little cool water and stays with him. The nurse arrives within five minutes. After the nurse leaves, Tuan writes an incident report with the times, and the sauna attendants check the heat.`,
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
              "Cho khách uống một viên thuốc hạ sốt của spa",
              "Cho khách chút nước mát và ở lại cùng khách",
            ],
            correct: 2,
            explanation:
              "'gives him a little cool water and stays with him' — không cho thuốc, không bỏ khách một mình.",
          },
          {
            q: "Việc nào Tuấn làm SAU CÙNG?",
            options: [
              "Đưa khách tới khu vực mát",
              "Viết báo cáo sự cố có ghi giờ",
              "Gọi y tá của khách sạn",
            ],
            correct: 1,
            explanation:
              "'After the nurse leaves, Tuan writes an incident report' — chăm sóc khách trước, giấy tờ sau.",
          },
        ],
      ),
      game: [
        game(
          "My wife is not well in the steam room. Please come!",
          "I am coming, sir. I will help her out and call the hotel nurse.",
          "I am coming, sir. I will helping her out and call the hotel nurse.",
          "Please bring her to the spa desk, sir, and I will call the hotel nurse from here.",
          undefined,
          "Câu cuối bắt người nhà tự đưa khách đang choáng đi. Câu đúng tới ngay, đưa khách ra khỏi chỗ nóng và gọi y tá.",
        ),
        game(
          "It is so hot in the sauna today that I feel sick.",
          "Please come out now, sir. I am calling the hotel nurse.",
          "Please come out now, sir. I calling the hotel nurse.",
          "The sauna is always hot, sir. Try the lower bench for a few minutes.",
          undefined,
          "Câu cuối để khách ở lại trong nhiệt khi khách đã thấy mệt. Câu đúng mời khách ra trước và gọi y tá.",
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
        risk({
          ...sp(
            "A little boy is in the pool alone. I cannot see his parents.",
            "Please stay at the pool with him. I am calling the lifeguard now.",
            "Trẻ một mình dưới nước: có người ở cạnh NGAY, gọi cứu hộ. Tìm bố mẹ là việc sau.",
            "colleague",
            ["pool", "calling", "lifeguard"],
          ),
          alsoAccept: [
            "Please stay with him at the pool. I am calling the lifeguard now.",
            "Stay with him at the pool, please. I will call the lifeguard now.",
          ],
        }),
        sp(
          "Can my son come into the steam room with me? He is ten.",
          "I am sorry, sir. The minimum age rule for the steam room is sixteen.",
          "Ôn tuần 24: quy định tuổi tối thiểu — nói con số, không tranh luận.",
          undefined,
          ["minimum", "age", "rule"],
        ),
        sp(
          "Can the herbal compress be ready before my massage at four?",
          "Yes, madam. I will ask our spa therapists to heat the herbal compress by half past three.",
          "Ôn tuần 25: giao việc cho đúng người, có mốc giờ.",
          undefined,
          ["spa", "therapists", "heat", "herbal", "compress"],
        ),
        sp(
          "Is there a therapist who speaks Japanese?",
          "Let me check with our spa therapists, madam. I will call you back within ten minutes.",
          "'Let me check with' + đúng người + mốc gọi lại.",
        ),
        sp(
          "I would like some advice about food and exercise.",
          "Let me check with our wellness consultants, sir. They plan food and exercise programmes.",
          "Đúng chuyên môn, đúng người: chuyên viên tư vấn sức khỏe.",
        ),
        sp(
          "Can you remind my daughter about her nail appointment?",
          "Of course, madam. I will send her a reminder by three o'clock.",
          "Ôn tuần 25: lời nhắc + mốc giờ.",
          undefined,
          ["reminder"],
        ),
      ],
      reading: read(
        `Mrs Ali calls the spa at noon. Her daughter needs her nails done before a wedding dinner. Thao checks with the nail technicians and calls back within ten minutes: they are free at four. The daughter also needs make-up, so Thao asks the beauty therapists to call before five. She sends the daughter a reminder at three. Each request has one owner, and Mrs Ali always knows who is calling and when. She never has to call the spa again.`,
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
          {
            q: "Vì sao khách không phải gọi hỏi lại lần nào?",
            options: [
              "Vì khách luôn biết ai sẽ gọi và lúc nào",
              "Vì Thảo hủy bớt một yêu cầu của khách",
              "Vì cửa hàng làm móng ở ngay cạnh phòng khách",
            ],
            correct: 0,
            explanation:
              "'the guest always knows who is calling and when' — mỗi việc có người làm và mốc giờ, nên khách không phải đi hỏi.",
          },
        ],
      ),
      game: [
        game(
          "Did you find somebody for my facial this afternoon?",
          "Yes, madam. I have asked the beauty therapists, and they are free at three.",
          "Yes, madam. I have ask the beauty therapists, and they are free at three.",
          "Not yet, madam. They are very busy today, so maybe you can ask them yourself later.",
          undefined,
          "Câu cuối trả việc lại cho khách. Câu đúng báo việc đã làm (have asked) và kết quả cụ thể.",
        ),
        game(
          "There is a small boy alone in the pool, and I cannot find his mother.",
          "Please stay at the pool with him. I am calling the lifeguard now.",
          "Please stays at the pool with him. I am calling the lifeguard now.",
          "I will go and look for his mother in the restaurant first.",
          "colleague",
          "Câu cuối bỏ đứa trẻ một mình dưới nước để đi tìm mẹ. Câu đúng: có người ở cạnh ngay, gọi cứu hộ.",
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
          "My locker key does not work, and I paid a deposit for it.",
          "I am sorry, madam. A colleague will open it now, and your locker deposit is safe.",
          "Ôn tuần 24: tiền cọc tủ đồ vẫn an toàn; nhờ đồng nghiệp mở tủ.",
          undefined,
          ["colleague", "locker", "deposit"],
        ),
        sp(
          "Do you sell the lavender oil you used today?",
          "It is out of stock, madam. Our spa product suppliers deliver on Monday.",
          "Nói thật là hết hàng và khi nào có lại.",
        ),
        sp(
          "Can you set up the foot bath for room five?",
          "Yes. I am going to set up the foot bath now, before the guests arrive.",
          "Ôn tuần 25: 'going to' cho việc đã định làm ngay.",
          "colleague",
          ["going", "set", "foot", "bath"],
        ),
        sp(
          "Is there a yoga class tomorrow morning?",
          "Let me check with the yoga teachers, madam. I will call your room within ten minutes.",
          "'Let me check with' + mốc gọi lại.",
        ),
        sp(
          "The four o'clock guest has just cancelled.",
          "Thanks. I will update the treatment schedule and tell the spa therapists.",
          "Ôn tuần 25: cập nhật lịch ngay, báo đúng người.",
          "colleague",
          ["update", "treatment", "schedule", "spa", "therapists"],
        ),
        sp(
          "The oil bottles in room three are almost empty.",
          "Thanks. I will refill the oil bottles before the next guest comes in.",
          "Ôn tuần 25: việc của mình thì tự làm, có mốc.",
          "colleague",
          ["refill", "oil", "bottles"],
        ),
      ],
      reading: read(
        `Mrs Grant finds no clean robes in the changing room, for the second day. Lan asks the spa linen staff to lay out fresh robes. She does not just say it is done: she goes to the changing room and checks the robes herself. Then she goes back to Mrs Grant. Because it happened twice, Lan also tells her supervisor about it that day. The supervisor speaks to the linen team, and the next morning the robes are there at seven.`,
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
              "Vì nhân viên đồ vải làm việc quá chậm trong hai ngày",
              "Vì chuyện thiếu áo choàng đã lặp lại hai lần",
            ],
            correct: 2,
            explanation: "'Because it happened twice' — lỗi lặp lại cần người có quyền sửa từ gốc.",
          },
          {
            q: "Bài đọc cho thấy điều gì về việc 'khép vòng'?",
            options: [
              "Khép vòng là sửa xong, kiểm tra, báo khách và báo lên",
              "Khép vòng là chuyển việc cho bộ phận khác là xong",
              "Khép vòng là chờ khách phàn nàn lần thứ ba",
            ],
            correct: 0,
            explanation:
              "Lan nhờ người làm, tự kiểm tra, quay lại báo khách, rồi báo giám sát — đủ bốn bước mới là xong việc.",
          },
        ],
      ),
      game: [
        game(
          "Are the clean robes in the changing room now?",
          "Yes, madam. The linen staff brought them, and I checked them myself.",
          "Yes, madam. The linen staff bringed them, and I checked them myself.",
          "I think so, madam. The linen staff told me they finished about an hour ago.",
          undefined,
          "Câu cuối chỉ chuyển lời, chưa ai kiểm lại. Câu đúng nói ai đã mang tới và bạn đã tự kiểm tra.",
        ),
        game(
          "Can you order the lavender oil for me before I leave on Sunday?",
          "Let me check with our suppliers, madam. I will call you by Friday.",
          "Let me check with our suppliers, madam. I call you by Friday.",
          "It will be here on Saturday, madam.",
          undefined,
          "Câu cuối hứa thay nhà cung cấp một mốc bạn không kiểm soát. Câu đúng hỏi đúng người và hứa điều bạn làm được: gọi lại.",
        ),
      ],
    }),
  ];
}

// ── Week 27 — Receiving a complaint ─────────────────────────────────────
function week27(): LessonContent[] {
  const t1a = "I apologise for the long waiting time, madam. Let me check where your therapist is.";
  const t1b =
    "Thank you for telling me about your concern, madam. I am very sorry you waited twice.";
  const t1c = "I understand. Your therapist is coming now, and you will finish before seven.";
  const t2a = "I am sorry your treatment felt short, madam. I will check the times now.";
  const t2b = "I am sorry, madam. I am checking the treatment schedule with my supervisor now.";
  const t2c = "Then my supervisor will call you today, madam. She decides what we can offer.";
  const t3a = "I am very sorry, madam. When did you make the booking?";
  const t3b = "Thank you, madam. I will check your booking with the spa desk now.";
  const t3c = "It was a wrong treatment booking, madam. I am very sorry for the mix-up.";
  const t3d =
    "Let me check the availability of the beauty therapists, madam. I will tell you within ten minutes.";
  const t4a = "I am stopping the massage now, madam. I will clean the oil off with cool water.";
  const t4b = "I am sorry, I cannot say, madam. The hotel nurse will look at your skin now.";
  const t4c = "Of course, madam. I will stay here with you until the nurse comes.";
  return [
    L(27, 1, "Listen First", "Lắng nghe trước", {
      vocabulary: [
        c("Concern", "Thank you for telling me about your concern."),
        c("Apologise", "I apologise for the long wait, madam."),
        c("Inconvenience", "I am very sorry for the inconvenience, madam.", [
          "/ˌɪnkənˈviːniəns/",
          "Sự phiền toái, bất tiện",
          "😣",
        ]),
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
          "Can I write down my complaint for the manager?",
          "Of course, madam. Your feedback helps us, and my manager reads every complaint.",
          "Ôn tuần 23: góp ý bằng văn bản — cảm ơn và nói ai đọc.",
          undefined,
          ["feedback"],
        ),
        sp(
          "My therapist came fifteen minutes late today.",
          "I am very sorry for the inconvenience, sir. I will tell my supervisor today.",
          "Xin lỗi, không viện cớ, báo lên người có trách nhiệm.",
        ),
        sp(
          "Why is the two o'clock guest still waiting?",
          "Her therapist is running late, so I am asking Lan to take the guest.",
          "Báo cấp trên: vấn đề + việc bạn đang làm để khách không phải chờ thêm.",
          "manager",
        ),
        sp(
          "I want to speak to someone senior right now.",
          "Of course, madam. I will ask one of our spa supervisors to come to you now.",
          "Ôn tuần 26: đưa lên đúng cấp, ngay.",
          undefined,
          ["spa", "supervisors"],
        ),
        sp(
          "I want to complain to the spa manager. Can you put me through?",
          "Of course, sir. I will transfer your call to the spa manager now.",
          "Ôn tuần 26: khách muốn gặp cấp trên — chuyển máy ngay, không giữ khách lại.",
          undefined,
          ["transfer"],
        ),
      ],
      reading: read(
        `Mrs Ahmed has waited twenty-five minutes for her massage, and it is the second time this week. Vy listens without stopping her. Then she apologises for the long waiting time and checks where the therapist is. The therapist is coming from another room, and she arrives two minutes later. Mrs Ahmed has a dinner at seven, so Vy makes sure the massage will finish before seven. After that, Vy tells her supervisor, because it happened twice.`,
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
              "'Mrs Ahmed has a dinner at seven, so…' — lời hứa đi theo ràng buộc của khách.",
          },
          {
            q: "Vì sao Vy báo chuyện này với giám sát?",
            options: [
              "Vì khách đòi được massage miễn phí",
              "Vì kỹ thuật viên đang ở phòng khác",
              "Vì khách đã phải chờ lần thứ hai",
            ],
            correct: 2,
            explanation:
              "'because it happened twice' — một lần là sự cố, hai lần là việc của người có thể sửa lịch.",
          },
        ],
      ),
      game: [
        game(
          "I booked for three o'clock, and nobody has come for me!",
          "I apologise for the wait, sir. Let me check where your therapist is.",
          "I apologises for the wait, sir. Let me check where your therapist is.",
          "Everybody has to wait a little this afternoon, sir.",
          undefined,
          "Câu cuối viện cớ và coi việc chờ là bình thường. Câu đúng xin lỗi về điều khách gặp và làm ngay một việc.",
        ),
        game(
          "This is the third time I have complained about this spa.",
          "Thank you for telling me, madam. I will tell my supervisor today.",
          "Thank you for tell me, madam. I will tell my supervisor today.",
          "That is strange, madam. Nobody told me about your other complaints before today.",
          undefined,
          "Câu cuối biến lời phàn nàn thành chuyện nội bộ. Câu đúng cảm ơn khách và đưa lên người có trách nhiệm.",
        ),
      ],
    }),

    L(27, 2, "Sorry Is Not a Verdict", "Xin lỗi chưa phải là nhận lỗi", {
      vocabulary: [
        c("Disappointed", "I understand you are disappointed, madam."),
        c("Short treatment", "If a guest reports a short treatment, check the schedule first."),
        c("Strong oil smell", "Open the window if there is a strong oil smell in the room."),
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
        {
          ...sp(
            "So you agree it was your mistake?",
            t2b,
            "Không nhận lỗi, không chối lỗi: đang kiểm tra cùng giám sát.",
            undefined,
            ["checking", "treatment", "schedule", "supervisor"],
            t2a,
          ),
          alsoAccept: [
            "I am sorry, madam. I am checking it with my supervisor now.",
            "I am sorry, madam. My supervisor and I are checking the treatment schedule now.",
          ],
        },
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
          "I am sorry the smell was so strong, sir. I will note it for your next visit.",
          "Xin lỗi về điều khách gặp + ghi lại cho lần sau.",
        ),
        sp(
          "The spa music was so loud that I could not relax.",
          "I understand you are disappointed, madam. I will report the loud spa music today.",
          "Công nhận cảm xúc, báo đúng việc lên trên.",
        ),
        sp(
          "Is room two ready for the next guest?",
          "Not yet. There is a strong oil smell, so I am opening the window now.",
          "Nói với đồng nghiệp: vấn đề + việc đang làm.",
          "colleague",
        ),
        sp(
          "What is the problem in room five?",
          "The guest says it was a short treatment, so I am checking the times now.",
          "Báo cấp trên lời khách nói — 'the guest says' — chưa kết luận.",
          "manager",
        ),
        sp(
          "There were no clean towels in my treatment room.",
          "I am sorry, madam. I will ask the spa linen staff to bring fresh towels now.",
          "Ôn tuần 26: xin lỗi + nhờ đúng tổ + làm ngay.",
          undefined,
          ["spa", "linen", "staff"],
        ),
        sp(
          "Why did my massage start so late today?",
          "There was a delay with the room before you, madam. I am sorry you waited.",
          "Ôn tuần 25: nói thật là có chậm trễ, và xin lỗi về việc khách phải chờ.",
          undefined,
          ["delay"],
        ),
      ],
      reading: read(
        `Mrs Green says her massage was only forty minutes, not sixty. Duc says, "I am sorry your treatment felt short." He does not say whose mistake it was, because nobody has checked. He checks the treatment schedule with his supervisor. The schedule shows that the massage started late because the room before was not ready. The supervisor calls Mrs Green that day and decides what the spa can offer her. Duc thanks Mrs Green for telling him.`,
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
            q: "Lịch trị liệu cho thấy điều gì?",
            options: [
              "Buổi massage bắt đầu trễ vì phòng trước chưa xong",
              "Kỹ thuật viên kết thúc sớm để kịp đi ăn trưa với bạn",
              "Khách đã đặt buổi bốn mươi phút từ trước",
            ],
            correct: 0,
            explanation:
              "'the massage started late because the room before was not ready' — kiểm tra cho ra nguyên nhân thật.",
          },
          {
            q: "Ai quyết định spa bù đắp gì cho khách?",
            options: [
              "Đức, vì Đức là người nhận phàn nàn",
              "Giám sát, người gọi cho khách trong ngày",
              "Kỹ thuật viên đã làm buổi massage",
            ],
            correct: 1,
            explanation:
              "'The supervisor calls Mrs Green that day and decides what the spa can offer' — bù đắp là quyết định của người có quyền.",
          },
        ],
      ),
      game: [
        game(
          "This was the shortest massage of my life. Why did your therapist stop early?",
          "I am sorry your massage felt short, madam. I will check the times now.",
          "I am sorry your massage feel short, madam. I will check the times now.",
          "It was our mistake, madam. That therapist is often late with her guests, I am afraid.",
          undefined,
          "Câu cuối kết luận lỗi và nói xấu đồng nghiệp trước mặt khách. Câu đúng xin lỗi về điều khách gặp và đi kiểm tra.",
        ),
        game(
          "Just admit it. Your therapist cut my massage short.",
          "I am sorry, madam. I am checking it with my supervisor now.",
          "I am sorry, madam. I am check it with my supervisor now.",
          "You are right, madam. She always finishes early, and I will speak to her about it.",
          undefined,
          "Câu cuối nhận lỗi thay đồng nghiệp khi chưa ai kiểm tra. Câu đúng xin lỗi và nói rõ đang kiểm tra cùng giám sát.",
        ),
      ],
    }),

    L(27, 3, "Getting the Facts", "Hỏi cho rõ sự việc", {
      vocabulary: [
        c("Dirty changing room", "Report a dirty changing room to the spa linen staff."),
        c("Complaint", "Every complaint goes in the shift report, with the time.", [
          "/kəmˈpleɪnt/",
          "Lời phàn nàn, khiếu nại",
          "🗣️",
        ]),
        c(
          "Wrong treatment booking",
          "Check the schedule before you call it a wrong treatment booking.",
        ),
        c("Sensitive area", "Please tell me about any sensitive area I should avoid."),
      ],
      grammar: [
        g(
          "When?",
          "When did you notice the problem in the changing room, sir?",
          "Hỏi điều khách CHƯA nói. Sau 'did' động từ ở dạng gốc: notice.",
          "When did you noticed the problem in the changing room, sir?",
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
          "Cảm ơn thông tin, nói bạn kiểm tra với ai. Chưa kết luận 'nhầm'.",
          undefined,
          undefined,
          t3a,
        ),
        sp(
          "Well? What did the spa desk find?",
          t3c,
          "Đã kiểm tra xong mới nói đó là đặt nhầm — và xin lỗi về điều khách gặp.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "Can I still have the facial today?",
          t3d,
          "Ôn tuần 25–26: xem lịch trống của đúng tổ, hứa báo lại có con số.",
          undefined,
          ["availability", "beauty", "therapists"],
          t3c,
        ),
        sp(
          "Can you check my booking for tomorrow?",
          "Of course, madam. Your booking is at ten, and I will send you a reminder tonight.",
          "Ôn tuần 25: giờ hẹn + lời nhắc.",
          undefined,
          ["reminder"],
        ),
        sp(
          "Can you arrange a manicure for me before I leave tomorrow?",
          "Of course, madam. I will arrange it with our nail technicians and call you back.",
          "Ôn tuần 26: 'arrange' + đúng tổ + gọi lại.",
          undefined,
          ["arrange", "nail", "technicians"],
        ),
        sp(
          "The pool water is very cold today.",
          "I am sorry, sir. I will report the cold pool water to engineering now.",
          "Báo đúng bộ phận xử lý.",
        ),
        sp(
          "Did any guest make a complaint this morning?",
          "One complaint was about a dirty changing room. The linen staff cleaned it at ten.",
          "Báo cấp trên: có phàn nàn gì + đã xử lý ra sao.",
          "manager",
          ["complaint", "dirty", "changing", "room"],
        ),
        sp(
          "The women's changing room is a mess. Can someone look at it?",
          "There is a dirty changing room upstairs. Can you ask the linen staff to clean it now?",
          "Nhờ đồng nghiệp: vấn đề + nhờ đúng người.",
          "colleague",
        ),
        sp(
          "I have a scar on my shoulder. Will you be careful there?",
          "Of course, sir. I will note it as a sensitive area and avoid it.",
          "Hỏi ra và ghi lại vùng cần tránh — đúng điều khách vừa nói.",
          undefined,
          ["sensitive", "area"],
        ),
        sp(
          "What did the guest in room four say?",
          "She said it was a cold treatment room, so I asked engineering to check the heating.",
          "Báo cấp trên: khách nói gì + bạn đã làm gì.",
          "manager",
        ),
      ],
      reading: read(
        `Ms Tan booked a facial, but she was given a body scrub. Khanh apologises and asks when she made the booking. Ms Tan says she called yesterday afternoon. Khanh checks the booking with the spa desk, and only then does she say it was a wrong treatment booking. Then she checks the availability of the beauty therapists. Ten minutes later, she tells Ms Tan that her facial can start at four. Ms Tan is happy to wait.`,
        [
          {
            q: "Vì sao Khánh hỏi khách đặt lịch lúc nào?",
            options: [
              "Để biết có phải khách tự đặt nhầm không",
              "Để tìm đúng lịch hẹn và kiểm tra",
              "Để tính thêm phí cho buổi tẩy tế bào chết",
            ],
            correct: 1,
            explanation:
              "Khánh hỏi để tìm đúng lịch hẹn, rồi 'checks the booking with the spa desk' — hỏi để kiểm tra, không để đổ lỗi.",
          },
          {
            q: "Khánh nói 'đặt nhầm' vào lúc nào?",
            options: [
              "Sau khi đã kiểm tra với quầy spa",
              "Ngay khi khách vừa phàn nàn",
              "Sau khi khách đã làm xong facial",
            ],
            correct: 0,
            explanation:
              "'only then does she say it was a wrong treatment booking' — kết luận sau khi kiểm tra, không trước.",
          },
          {
            q: "Thứ tự việc Khánh làm là gì?",
            options: [
              "Xem lịch trống → xin lỗi → kiểm tra lịch hẹn",
              "Kiểm tra lịch hẹn → xin lỗi → hỏi giờ đặt",
              "Xin lỗi → hỏi giờ đặt → kiểm tra → xem lịch trống",
            ],
            correct: 2,
            explanation:
              "'apologises and asks…', 'checks the booking…', 'Then she checks the availability' — xin lỗi, hỏi, kiểm tra, rồi mới tìm giải pháp.",
          },
        ],
      ),
      game: [
        game(
          "The water in the pool was freezing this morning!",
          "I am sorry, madam. Which pool were you in, the indoor or the outdoor one?",
          "I am sorry, madam. Which pool was you in, the indoor or the outdoor one?",
          "Could you tell me if the pool water was cold this morning, madam?",
          undefined,
          "Câu cuối hỏi lại điều khách VỪA nói. Câu đúng hỏi điều khách chưa nói: hồ nào, để báo đúng chỗ.",
        ),
        game(
          "Why did they give me the wrong treatment?",
          "I am sorry, madam. I will check your booking with the spa desk now.",
          "I am sorry, madam. I will checking your booking with the spa desk now.",
          "The spa desk made a mistake again, madam. They are always so careless with bookings.",
          undefined,
          "Câu cuối đổ lỗi cho đồng nghiệp trước khi kiểm tra. Câu đúng xin lỗi và đi kiểm tra.",
        ),
      ],
    }),

    L(27, 4, "Staying Calm — Safety First", "Giữ bình tĩnh — an toàn trước", {
      vocabulary: [
        c("Skin irritation", "Please tell me at once if you feel any skin irritation."),
        c("Rash", "We never massage over a rash.", ["/ræʃ/", "Phát ban, mẩn đỏ trên da", "🔴"]),
        c("Broken sauna heater", "We close the sauna when there is a broken sauna heater."),
        c("Patch test", "We do a patch test on the arm before a new facial.", [
          "/ˈpætʃ test/",
          "Thử sản phẩm trên một vùng da nhỏ",
          "🩹",
        ]),
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
        {
          ...sp(
            "My arms are itching and red where you put the oil.",
            t4a,
            "Kích ứng da: DỪNG ngay, làm sạch dầu bằng nước mát. Không làm tiếp cho xong buổi.",
            undefined,
            ["massage", "clean", "oil", "cool", "water"],
          ),
          alsoAccept: [
            "I will stop the massage now and clean the oil off with cool water, madam.",
            "I am stopping the massage, madam. I will clean the oil off with cool water now.",
          ],
        },
        risk({
          ...sp(
            "Is it serious? What is wrong with my skin?",
            t4b,
            "Bạn KHÔNG chẩn đoán: 'I cannot say'. Người có chuyên môn xem da cho khách.",
            undefined,
            ["hotel", "nurse", "skin"],
            t4a,
          ),
          alsoAccept: [
            "I am not sure, madam. The hotel nurse will look at your skin now.",
            "I am sorry, I cannot say, madam. I am calling the hotel nurse now.",
            "I cannot say, madam, but the hotel nurse will look at your skin now.",
          ],
        }),
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
          "I am very sorry, sir. I will make the pressure lighter now.",
          "Khách đau: xin lỗi và đổi ngay, không giải thích 'massage sâu là phải đau'.",
        ),
        sp(
          "The sauna is cold today. What is going on?",
          "I am sorry, sir. There is a broken sauna heater, so the sauna is closed until five.",
          "Mô tả vấn đề thật ngắn + điều đó có nghĩa gì với khách.",
        ),
        sp(
          "I have a small rash on my back from the sun. Can I still have a massage?",
          "Thank you, sir. We will avoid the rash, and I will check with my supervisor first.",
          "Phát ban: không massage lên vùng đó, và hỏi giám sát trước khi bắt đầu.",
          undefined,
          ["rash", "supervisor"],
        ),
        sp(
          "Can I still have a facial next time?",
          "Yes, madam. We will do a patch test on your arm first.",
          "Sau một lần kích ứng: thử trên vùng da nhỏ trước.",
        ),
        sp(
          "What happened with the guest in room two?",
          "She had a skin irritation, so I stopped and wrote an incident report.",
          "Ôn tuần 26: sự cố của khách ghi vào báo cáo sự cố.",
          "manager",
          ["incident", "report"],
        ),
        sp(
          "A guest wants help with a fitness plan. Who should she see?",
          "Our wellness consultants can help, and I will arrange a meeting for her today.",
          "Ôn tuần 26: đúng chuyên môn, đúng người.",
          "colleague",
          ["wellness", "consultants", "arrange"],
        ),
        sp(
          "Who do we call when a guest feels unwell in the spa?",
          "We call the hotel nurses, and we write an incident report afterwards.",
          "Ôn tuần 25–26: gọi đúng người, rồi ghi báo cáo sự cố.",
          "manager",
          ["hotel", "nurses", "incident", "report"],
        ),
        sp(
          "Why did the guest in room six complain?",
          "He felt the pressure was too strong, so I made it lighter at once.",
          "Báo cấp trên: khách cảm thấy gì + bạn đã làm gì.",
          "manager",
        ),
      ],
      reading: read(
        `During a massage, Mrs Lee says her arms are itching and red. Son stops at once and cleans the oil off with cool water. Mrs Lee asks what is wrong with her skin. Son does not guess: he says he cannot say, and he calls the hotel nurse. He stays with Mrs Lee until the nurse comes and checks her skin. Later he writes an incident report, and he notes that she needs a patch test next time.`,
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
              "Vì Sơn sợ khách sẽ đòi tiền bồi thường cho làn da",
            ],
            correct: 0,
            explanation:
              "'Son does not guess' — chẩn đoán là việc của y tá; kỹ thuật viên dừng, làm sạch, gọi người có chuyên môn.",
          },
          {
            q: "Vì sao lần sau khách cần thử trên vùng da nhỏ trước?",
            options: [
              "Vì spa muốn bán thêm một dịch vụ",
              "Vì da khách đã phản ứng với dầu lần này",
              "Vì y tá muốn khách quay lại khám",
            ],
            correct: 1,
            explanation:
              "Khách vừa bị kích ứng với dầu, nên Sơn ghi 'she needs a patch test next time' — thử trước để tránh lặp lại.",
          },
        ],
      ),
      game: [
        game(
          "My neck is getting red. Should I worry?",
          "I am stopping the massage, madam. I will clean the oil off with cool water now.",
          "I am stopping the massage, madam. I will cleaning the oil off with cool water now.",
          "Do not worry, madam. It is only a small allergy, so we can finish the massage first.",
          undefined,
          "Câu cuối tự chẩn đoán 'dị ứng nhẹ' và làm tiếp — hai lỗi một lúc. Câu đúng dừng ngay và làm sạch da.",
        ),
        game(
          "Is the sauna working today? It feels cold in there.",
          "I am sorry, sir. The heater is broken, so the sauna is closed until five.",
          "I am sorry, sir. The heater is broke, so the sauna is closed until five.",
          "It is fine, sir. Just wait inside for twenty minutes, and it will get warm again.",
          undefined,
          "Câu cuối để khách dùng phòng xông khi máy đang hỏng. Câu đúng mô tả ngắn vấn đề và nói phòng đóng tới mấy giờ.",
        ),
      ],
    }),
  ];
}

// ── Week 28 — If you like, I can… (and what is not yours to give) ───────
function week28(): LessonContent[] {
  const t1a = "I am sorry, madam. If you like, I can turn up the heating.";
  const t1b = "Then if you like, I can bring a warm blanket now.";
  const t1c = "Of course, madam. I will use a lighter pressure now.";
  const t2a = "I am sorry, sir. I can lower the music volume, or we can change the treatment room.";
  const t2b = "Either option is fine, sir. The garden room is quieter, and it is empty now.";
  const t2c = "Of course, sir. I will change the treatment room now and bring your things.";
  const t3a = "I am sorry, madam. If you like, we can change the oil blend to an unscented one.";
  const t3b = "If it does not get better, I will stop and call my supervisor.";
  const t3c = "Of course, madam. I will ask my manager if you can reschedule at no charge.";
  const t4a =
    "I understand you are disappointed, madam. I will report the late start to my manager now.";
  const t4b = "I am sorry, I cannot add ten free minutes. I will ask my manager to call you.";
  const t4c = "If you like, I can book your next visit now, at a time that suits you.";
  const t4d = "I will pass your message to her now, madam. She calls guests back the same day.";
  const stopNow = "No, sir. I am stopping the treatment now, and I will call my supervisor.";
  return [
    L(28, 1, "If You Like, I Can…", "Nếu quý khách muốn, tôi có thể…", {
      vocabulary: [
        c("Prefer", "If you prefer, we can start ten minutes later."),
        c("Turn up the heating", "If you feel cold, I can turn up the heating."),
        c("Thermostat", "If the room is cold, please turn up the thermostat.", [
          "/ˈθɜːməstæt/",
          "Bộ điều chỉnh nhiệt độ",
          "🌡️",
        ]),
        c("Use a lighter pressure", "If it hurts, I will use a lighter pressure."),
      ],
      grammar: [
        g(
          "Cold? Heating.",
          "If you like, I can turn up the heating, madam.",
          "'If you like, I can…' — đề nghị khi khách CHƯA nói muốn gì. Sau 'can' không có 'to'.",
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
          "Khách chưa nói muốn gì: đề nghị bằng câu điều kiện If you like, I can.",
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
          "Khách ĐÃ nói rõ muốn gì: làm ngay, đừng hỏi lại 'If you prefer'.",
          undefined,
          undefined,
          t1b,
        ),
        risk({
          ...sp(
            "Can I have a hot stone massage? I have high blood pressure.",
            "I am sorry, sir. With high blood pressure, I cannot offer the hot stone.",
            "Ôn tuần 23: huyết áp cao — KHÔNG đá nóng, dù khách xin. Không tranh luận.",
            undefined,
            ["high", "blood", "pressure", "offer", "hot", "stone"],
          ),
          alsoAccept: [
            "I am sorry, sir. I cannot offer the hot stone with high blood pressure.",
            "Thank you for telling me, sir. With high blood pressure, I cannot offer the hot stone.",
            "I am sorry, sir. With high blood pressure, I cannot offer the hot stone or the sauna.",
          ],
        }),
        sp(
          "The guest in room three says she is cold.",
          "Please turn up the thermostat and bring her a warm blanket.",
          "Nói với đồng nghiệp: hai việc, đúng thứ tự.",
          "colleague",
          ["thermostat", "warm", "blanket"],
        ),
        sp(
          "Can you massage my back harder, please?",
          "Of course, sir. If it hurts at any time, please tell me straight away.",
          "Đồng ý, và mời khách nói ngay nếu đau.",
        ),
        sp(
          "I am not sure what time is best for tomorrow.",
          "If you prefer, I can book you in the morning, when the spa is quieter.",
          "Khách còn phân vân: 'If you prefer' + một lý do để khách chọn.",
        ),
        sp(
          "Where can I get a sun lounger by the pool?",
          "Our pool attendants can help, sir. I will ask a colleague to take you there.",
          "Ôn tuần 26: đúng người phụ trách + đồng nghiệp đưa khách đi.",
          undefined,
          ["pool", "attendants", "colleague"],
        ),
        sp(
          "This new oil feels a bit strange on my skin.",
          "I will stop now, madam. If you like, we can do a patch test first.",
          "Ôn tuần 27: da thấy lạ thì dừng; thử trên vùng da nhỏ trước khi làm tiếp.",
          undefined,
          ["stop", "patch", "test"],
        ),
      ],
      reading: read(
        `Ms Kowalski feels cold on the massage bed. Hien says, "If you like, I can turn up the heating." The room needs time to warm up, so Hien also brings a warm blanket. Later Ms Kowalski says the pressure is a little strong. Hien does not ask again or argue. She uses a lighter pressure at once. At the end, Ms Kowalski says it was the most relaxing massage of her holiday. She books another one for Friday.`,
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
              "Giảm lực ngay, không hỏi lại",
              "Giải thích massage sâu thì phải mạnh",
              "Hỏi giám sát trước khi đổi lực",
            ],
            correct: 0,
            explanation:
              "'Hien does not ask again or argue. She uses a lighter pressure at once' — khách đã nói rõ thì làm ngay.",
          },
          {
            q: "Vì sao Hiền dùng 'If you like' ở đầu nhưng không dùng khi khách nói về lực?",
            options: [
              "Vì lúc đầu Hiền chưa biết khách có muốn tăng nhiệt",
              "Vì Hiền quên mẫu câu điều kiện",
              "Vì khách thích nghe câu ngắn hơn",
            ],
            correct: 0,
            explanation:
              "Lúc đầu khách chỉ nói 'cold' nên Hiền đề nghị; về lực, khách đã nói rõ, nên Hiền làm ngay.",
          },
        ],
      ),
      game: [
        game(
          "I am freezing on this massage bed.",
          "I am sorry, madam. If you like, I can bring a warm blanket.",
          "I am sorry, madam. If you like, I can bring a warm blankets.",
          "The room is at the normal temperature, madam. Most guests feel warm after a few minutes.",
          undefined,
          "Câu cuối nói khách 'sai' vì người khác thấy ấm. Câu đúng xin lỗi và đưa một giải pháp khách có thể chọn.",
        ),
        game(
          "This pressure is much too hard for me.",
          "I am sorry, sir. I will use a lighter pressure now.",
          "I am sorry, sir. I use a lighter pressure now.",
          "If you prefer, I can change it later, sir.",
          undefined,
          "Câu cuối hỏi lại điều khách vừa nói rõ, rồi còn làm tiếp lực cũ. Câu đúng đổi lực ngay.",
        ),
      ],
    }),

    L(28, 2, "Two Options — and Who Decides", "Hai lựa chọn — và ai quyết", {
      vocabulary: [
        c("Option", "There are two options for your treatment room."),
        c("Either", "Either option is fine with us, sir."),
        c("Change the treatment room", "If the room is noisy, we can change the treatment room."),
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
          "What do we do when a guest has a cold treatment room?",
          "If a guest has a cold treatment room, we change rooms at once.",
          "Ôn tuần 27 + câu điều kiện: quy trình nội bộ, nói ngắn.",
          "manager",
          ["cold", "treatment", "room", "change"],
        ),
        sp(
          "Is the couple's suite free tonight?",
          "Let me check our availability, madam. If it is free, I can reserve the couple's suite.",
          "Ôn tuần 25: xem lịch trống trước; câu điều kiện cho lời đề nghị.",
          undefined,
          ["availability", "reserve", "couple's", "suite"],
        ),
        sp(
          "I prefer silence. Could you turn the music off?",
          "Of course, madam. I will turn the music off now.",
          "Khách đã nói rõ: làm ngay, đừng hỏi lại 'If you prefer'.",
        ),
        sp(
          "The music in my room is too loud, but I like a little music.",
          "If the loud spa music bothers you, I can lower the music volume, madam.",
          "Ôn tuần 27: nói lại vấn đề của khách bằng câu điều kiện, rồi đề nghị.",
          undefined,
          ["loud", "spa", "music"],
        ),
        sp(
          "The music was too loud again today.",
          "I apologise, madam. If you like, I can lower the music volume now.",
          "Ôn tuần 27: xin lỗi + đề nghị có điều kiện.",
          undefined,
          ["apologise", "music"],
        ),
        sp(
          "My treatment room was cold again yesterday.",
          "I am sorry, madam. If it is cold today, I can change the treatment room.",
          "Đề nghị có điều kiện, trong quyền của bạn.",
        ),
      ],
      reading: read(
        `Mr Haas can hear people outside his treatment room, and the music is loud. Phong gives him two options: lower the music volume, or change the treatment room. Mr Haas asks which is better. Phong says either option is fine, but the garden room is quieter, and nobody is using it now. Mr Haas chooses it. Phong moves his things, and he tells the spa desk about the new room. The new room is warm and quiet.`,
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
          {
            q: "Vì sao Phong báo quầy spa về phòng mới?",
            options: [
              "Để quầy tính thêm phí đổi phòng",
              "Để lịch trị liệu ghi đúng phòng khách đang dùng",
              "Để quầy gọi điện xin lỗi khách thay cho Phong sau đó",
            ],
            correct: 1,
            explanation:
              "'he tells the spa desk about the new room' — đổi phòng xong phải báo, để đồng nghiệp không xếp khách khác vào.",
          },
        ],
      ),
      game: [
        game(
          "Can you move me to the VIP suite? It is much quieter.",
          "I am sorry, sir. I cannot offer a free upgrade, but the garden room is quiet.",
          "I am sorry, sir. I cannot offering a free upgrade, but the garden room is quiet.",
          "Of course, sir. The VIP suite is empty now, so I will move you there at no extra charge.",
          undefined,
          "Câu cuối tự tặng nâng hạng miễn phí — đó là quyết định của quản lý. Câu đúng nói rõ điều không làm được và đưa lựa chọn trong quyền.",
        ),
        game(
          "The music in here is far too loud for me.",
          "I am sorry, madam. I will lower the music volume now.",
          "I am sorry, madam. I will lowers the music volume now.",
          "Everybody else likes this music, madam.",
          undefined,
          "Câu cuối đặt ý thích của người khác lên trên khách đang nằm trước mặt. Câu đúng làm ngay điều khách vừa nói.",
        ),
      ],
    }),

    L(28, 3, "If It Happens Again", "Nếu chuyện lặp lại", {
      vocabulary: [
        c("Change the oil blend", "If the smell is too strong, we can change the oil blend."),
        c("Change your therapist", "If you prefer, I can change your therapist next time."),
        c("Therapist gender", "Ask about therapist gender when a guest books a massage."),
        c("Reschedule at no charge", "Only the manager can let you reschedule at no charge."),
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
          "Of course, madam. I will change your therapist for your next visit.",
          "Sau 'will' là động từ nguyên mẫu (change), không thêm -ing.",
          "Of course, madam. I will changing your therapist for your next visit.",
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
        risk({
          ...sp(
            "Come on, nobody will know. Massage under the towel.",
            stopNow,
            "Yêu cầu vượt giới hạn: DỪNG ngay từ lần đầu, rời phòng và gọi giám sát. Không cảnh cáo rồi làm tiếp.",
            undefined,
            ["treatment", "call", "supervisor"],
          ),
          alsoAccept: [
            "No, sir. I will stop the treatment now and call my supervisor.",
            "No, sir. I am stopping the massage now, and I will call my supervisor.",
          ],
        }),
        sp(
          "I have a concern about the oil you use on my face.",
          "Thank you for telling me about your concern, madam. If you like, I can show you the bottle.",
          "Ôn tuần 27: cảm ơn khách đã nói + đề nghị cụ thể.",
          undefined,
          ["concern", "show", "bottle"],
        ),
        sp(
          "Does the guest in room one want a man or a woman?",
          "She asked about therapist gender, so I booked Lan for her.",
          "Nói với đồng nghiệp: khách yêu cầu gì + bạn đã sắp xếp ai.",
          "colleague",
          ["therapist", "gender"],
        ),
        sp(
          "Next time I would like a different therapist.",
          "Of course, madam. I will change your therapist for your next visit.",
          "Khách đã nói rõ: đồng ý, không hỏi vặn lý do, đừng hỏi lại 'If you prefer'.",
        ),
        sp(
          "I waited a long time yesterday. Will it happen again?",
          "If there is a long waiting time again, I will call your room first.",
          "Ôn tuần 27 + câu điều kiện loại 1: nói trước bạn sẽ làm gì.",
          undefined,
          ["long", "waiting", "time", "call"],
        ),
        sp(
          "Can we make my massage longer today?",
          "If the next hour is free, I can extend the session. There is a session extension fee.",
          "Đề nghị có điều kiện + báo luôn có phí.",
        ),
        sp(
          "The guest in room one says the oil smell is too strong.",
          "Then please open the window. A strong oil smell can give guests a headache.",
          "Ôn tuần 27: nói với đồng nghiệp — việc cần làm + lý do.",
          "colleague",
          ["strong", "oil", "smell"],
        ),
      ],
      reading: read(
        `During a massage, a guest asks Thu to massage under the towel. Thu says no at once: "No, sir. I will stop the treatment now and call my supervisor." She does not give a second chance. She leaves the room and calls her supervisor. The supervisor speaks to the guest. Thu writes an incident report with the time, and nobody asks her to go back into that room. Later, the spa manager also calls the guest.`,
        [
          {
            q: "Thu làm gì ngay lần đầu khách yêu cầu?",
            options: [
              "Cảnh cáo khách rồi làm tiếp buổi massage",
              "Dừng liệu trình và gọi giám sát",
              "Giả vờ không nghe thấy và làm tiếp",
            ],
            correct: 1,
            explanation:
              "'Thu says no at once… She does not give a second chance' — yêu cầu vượt ranh giới thì dừng ngay từ lần đầu.",
          },
          {
            q: "Ai nói chuyện với khách sau đó?",
            options: [
              "Giám sát của Thu",
              "Chính Thu, khi quay lại phòng",
              "Một kỹ thuật viên khác làm tiếp",
            ],
            correct: 0,
            explanation:
              "'The supervisor speaks to the guest' — chuyện này thuộc về giám sát, không phải kỹ thuật viên.",
          },
          {
            q: "Vì sao Thu viết báo cáo sự cố có ghi giờ?",
            options: [
              "Để khách được hoàn tiền buổi massage",
              "Để Thu được nghỉ sớm hôm đó",
              "Để có hồ sơ rõ ràng về điều đã xảy ra",
            ],
            correct: 2,
            explanation:
              "'Thu writes an incident report with the time' — sự cố được ghi lại để giám sát và quản lý xử lý đúng.",
          },
        ],
      ),
      game: [
        game(
          "What if the new oil is still too strong for me?",
          "If it is still too strong, please tell me, and I will stop.",
          "If it is still too strong, please tell me, and I will stops.",
          "It will be perfect this time, madam. I promise you will not smell it at all.",
          undefined,
          "Câu cuối hứa điều bạn không chắc được. Câu đúng nói trước bạn sẽ làm gì nếu vấn đề còn.",
        ),
        game(
          "Relax. Just massage a little lower, under the towel.",
          "No, sir. I will stop the treatment now and call my supervisor.",
          "No, sir. I will stop the treatment now and calling my supervisor.",
          "I am sorry, sir, I cannot do that. If you ask again, I will stop the massage.",
          undefined,
          "Câu cuối chỉ cảnh cáo rồi làm tiếp — cho khách thêm một lần. Câu đúng dừng ngay từ lần đầu và gọi giám sát.",
        ),
      ],
    }),

    L(28, 4, "When You Must Say No", "Khi phải từ chối", {
      vocabulary: [
        c("Offer a free upgrade", "Only the spa manager can offer a free upgrade."),
        c("Add ten free minutes", "I cannot add ten free minutes myself."),
        c("Refund the extra charge", "Only the spa manager can refund the extra charge.", [
          "/rɪˈfʌnd ði ˈekstrə tʃɑːdʒ/",
          "Hoàn lại khoản phí thu thêm",
          "💰",
        ]),
        c("Goodwill gesture", "A goodwill gesture is always the manager's decision.", [
          "/ˌɡʊdwɪl ˈdʒestʃə/",
          "Món quà bù đắp thiện chí (do quản lý quyết)",
          "🎁",
        ]),
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
          "Ôn tuần 27: công nhận cảm xúc (disappointed) và báo lên.",
          undefined,
          ["disappointed"],
        ),
        {
          ...sp(
            "Then add ten free minutes to my next massage.",
            t4b,
            "Phút miễn phí: bạn KHÔNG tự hứa. Nói rõ ai quyết và bạn làm gì tiếp.",
            undefined,
            ["add", "free", "minutes", "manager", "call"],
            t4a,
          ),
          alsoAccept: [
            "I am sorry, I cannot add ten free minutes. I will ask the manager to call you.",
            "I cannot add free minutes myself, madam, but I will ask my manager to call you.",
          ],
        },
        sp(
          "So what can you do for me right now?",
          t4c,
          "Ngay sau lời từ chối, đưa việc trong quyền của bạn.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "Fine. And when will your manager call me?",
          t4d,
          "Hứa điều bạn làm được (chuyển lời ngay), nói quy định gọi lại của quản lý.",
          undefined,
          undefined,
          t4c,
        ),
        risk({
          ...sp(
            "I did not ask for the hot stones. I want that extra charge back.",
            "I am sorry, I cannot refund the extra charge. I will ask my manager to call you.",
            "Hoàn tiền: quyết định của quản lý. Không hứa, không cãi, nói ai gọi lại.",
            undefined,
            ["refund", "extra", "charge", "manager", "call"],
          ),
          alsoAccept: [
            "I am sorry, I cannot refund the extra charge. I will ask the manager to call you.",
            "I cannot refund the extra charge myself, madam, but I will ask my manager to call you.",
            "I understand, madam. I cannot change the charge, but I will ask my manager to call you.",
          ],
        }),
        sp(
          "My treatment was short again. I want my money back.",
          "I am sorry, madam. My manager checks every short treatment, and she will call you today.",
          "Ôn tuần 27: tiền là việc của quản lý — nói ai kiểm và ai gọi.",
          undefined,
          ["manager", "short", "treatment", "call"],
        ),
        sp(
          "Will the spa give me something for all this trouble?",
          "I am sorry for the inconvenience, madam. A goodwill gesture is my manager's decision.",
          "Ôn tuần 27: xin lỗi về sự phiền toái; quà bù đắp là việc của quản lý.",
          undefined,
          ["inconvenience", "goodwill", "gesture"],
        ),
        risk({
          ...sp(
            "We waited so long. Give us a free upgrade to the VIP suite.",
            "I am sorry, I cannot offer a free upgrade. I will ask my manager now.",
            "Nâng hạng miễn phí: bạn KHÔNG tự hứa — chuyển quản lý ngay.",
            undefined,
            ["offer", "free", "upgrade", "ask", "manager"],
          ),
          alsoAccept: [
            "I am sorry, I cannot offer a free upgrade. I will ask the manager now.",
            "I cannot offer a free upgrade myself, madam, but I will ask my manager now.",
          ],
        }),
      ],
      reading: read(
        `Mr Wong's massage started fifteen minutes late, and it still ended at four. He asks Hien to add ten free minutes to his next massage. Hien cannot add free minutes herself, so she passes his message to her manager. Then she offers what she can do: she books his next visit at a time that suits him. The manager calls Mr Wong that afternoon and offers him a longer massage on Friday. Mr Wong is happy with that.`,
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
              "'Hien cannot add free minutes herself, so she passes his message to her manager' — thời gian miễn phí là quyết định về tiền.",
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
          {
            q: "Kết quả cuối cùng cho khách là gì?",
            options: [
              "Hiền tự cộng thêm mười phút vào hóa đơn",
              "Quản lý gọi lại và đề nghị một buổi dài hơn",
              "Khách phải tự gọi cho quản lý vào thứ Sáu",
            ],
            correct: 1,
            explanation:
              "'The manager calls Mr Wong that afternoon and offers him a longer massage' — người có quyền quyết, và khách vẫn được chăm sóc.",
          },
        ],
      ),
      game: [
        game(
          "Just give me a discount, and we will forget about it.",
          "I am sorry, I cannot give a discount. I will ask my manager to call you.",
          "I am sorry, I cannot give a discount. I will ask my manager call you.",
          "Of course, sir. I will take twenty percent off your bill myself, and we can forget it.",
          undefined,
          "Câu cuối tự giảm giá — vượt quyền. Câu đúng không hứa, không đóng cửa: người có quyền sẽ gọi lại.",
        ),
        game(
          "Take the hot stone charge off my bill. I never wanted it.",
          "I am sorry, I cannot refund the extra charge. I will ask the manager to call you.",
          "I am sorry, I cannot refunding the extra charge. I will ask the manager to call you.",
          "No problem, madam. I will take it off now, and nobody will notice it.",
          undefined,
          "Câu cuối tự hoàn tiền và giấu việc đó — vượt quyền. Câu đúng nói rõ mình không tự hoàn được và ai sẽ gọi lại.",
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
  const t2b = "I helped her out, called the hotel nurse and gave her water.";
  const t2c = "Yes. The nurse checked her, and I wrote it in the incident report.";
  const t3a = "Yes. The linen order has not arrived yet, so robes are low.";
  const t3b = "Yes. Please read the guest allergy note for room two before the massage.";
  const t3c = "The guest is allergic to nuts, so please check the oil and use a nut-free one.";
  const t4a = "The guest was asking me to massage under the towel, so I stopped at once.";
  const t4b = "I left the room and called you straight away.";
  const t4c = "I wrote it in the incident report, with the time and the room.";
  const t4d = "I am okay, thank you. Please do not book that guest with me again.";
  return [
    L(29, 1, "Handing Over the Shift", "Bàn giao ca", {
      vocabulary: [
        c("Shift", "My shift ends at three o'clock."),
        c("Update", "Please update the therapist roster before you go home."),
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
          "Almost. I will update the therapist roster before I go, because Hoa is sick.",
          "Báo cấp trên: việc sẽ làm + lý do.",
          "manager",
        ),
        sp(
          "Why did room two start late this morning?",
          "We had a late therapist, so I was moving the guest to Lan when you called.",
          "Ôn tuần 27 + quá khứ tiếp diễn: báo cấp trên lý do và việc đang làm.",
          "manager",
          ["late", "therapist"],
        ),
        sp(
          "Any guest notes for tomorrow?",
          "Yes. Mrs Lim prefers lemongrass, so we have to change the oil blend for her.",
          "Ôn tuần 28: ghi chú sở thích của khách cho ca sau.",
          "colleague",
          ["prefers", "change", "oil", "blend"],
        ),
        sp(
          "When does your shift end today?",
          "My shift ends at three. I will do the handover with Nam at the spa desk.",
          "Bàn giao rõ người nhận ca.",
          "colleague",
        ),
        sp(
          "Why is room one empty at three?",
          "The guest asked us to change the treatment room, so I moved her to room four.",
          "Ôn tuần 28: báo cấp trên việc đã làm và vì sao.",
          "manager",
          ["change", "treatment", "room"],
        ),
        sp(
          "Did anybody ask about tomorrow's yoga class?",
          "I was talking to the yoga teachers when a guest called. The class is at seven.",
          "Ôn tuần 26 + quá khứ tiếp diễn: đang làm gì (was talking) khi việc khác xảy ra.",
          "manager",
          ["yoga", "teachers"],
        ),
      ],
      reading: read(
        `At three, Thu hands over to Nam. "I updated the treatment schedule at two. Treatment room three is closed, because the air conditioner is broken. Engineering is coming at five." Hoa is sick, so Lan is taking her guests, and Thu tells Nam to check the therapist roster first. Before she leaves, Thu updates the roster for tomorrow too. Nam does not have to guess anything, and no guest is sent to room three. The handover takes five minutes.`,
        [
          {
            q: "Vì sao phòng trị liệu số ba đóng cửa?",
            options: [
              "Vì máy lạnh hỏng, kỹ thuật tới lúc năm giờ",
              "Vì Hoa bị ốm nên không ai làm phòng đó",
              "Vì phòng đó chưa có trong lịch trị liệu của ngày hôm nay",
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
          {
            q: "Điều gì có thể xảy ra nếu Thu không bàn giao phòng số ba?",
            options: [
              "Kỹ thuật sẽ không đến sửa máy lạnh",
              "Lan sẽ không nhận khách của Hoa",
              "Ca sau có thể xếp khách vào phòng đang hỏng",
            ],
            correct: 2,
            explanation:
              "'no guest is sent to room three' — bàn giao tốt chặn trước việc ca sau xếp khách vào phòng đang hỏng.",
          },
        ],
      ),
      game: [
        game(
          "Before you leave, is there anything new?",
          "Yes. I updated the treatment schedule, and room three is closed.",
          "Yes. I update the treatment schedule, and room three is closed.",
          "Nothing new, really. Everything is normal on the spa floor today. Have a good shift!",
          "colleague",
          "Câu cuối bỏ sót phòng đang đóng — ca sau sẽ xếp khách vào đó. Câu đúng nói việc đã làm và việc còn mở.",
        ),
        game(
          "Who is taking Hoa's guests today?",
          "Lan is taking them. I updated the therapist roster at noon.",
          "Lan is take them. I updated the therapist roster at noon.",
          "I do not know yet. Maybe the guests can wait until Hoa comes back tomorrow.",
          "manager",
          "Câu cuối để khách tự chờ người đang ốm. Câu đúng nói ai nhận khách và bảng phân ca đã sửa.",
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
        {
          ...sp(
            "What did you do then?",
            t2b,
            "Các bước an toàn theo đúng thứ tự: đưa ra khỏi chỗ nóng, gọi y tá, rồi cho nước.",
            "manager",
            ["helped", "out", "water", "called", "hotel", "nurse"],
            t2a,
          ),
          alsoAccept: [
            "I helped her out of the steam room, called the hotel nurse and gave her water.",
            "I took her out, called the hotel nurse and gave her some water.",
          ],
        },
        sp(
          "Is she all right now?",
          t2c,
          "Khép lại: ai đã kiểm tra, và bạn đã ghi ở đâu — sự cố của khách vào báo cáo sự cố.",
          "manager",
          undefined,
          t2b,
        ),
        sp(
          "Why is the steam room closed this afternoon?",
          "I was checking the steam room when the heat got too high, so I closed it.",
          "Ôn tuần 25 + quá khứ tiếp diễn: đang làm gì khi phát hiện vấn đề.",
          "manager",
          ["checking", "steam", "room"],
        ),
        sp(
          "What happened with the guest in room six?",
          "She had a rash on her arm, so I stopped and wrote an incident report.",
          "Ôn tuần 27: phát ban → dừng, ghi báo cáo sự cố.",
          "manager",
          ["rash", "incident", "report"],
        ),
        sp(
          "Why is the sauna closed?",
          "I was checking the sauna when the heater suddenly stopped. It is in the sauna maintenance log.",
          "Sự cố thiết bị ghi vào sổ bảo trì phòng xông hơi.",
          "colleague",
        ),
        sp(
          "The guest in room two says it is cold again.",
          "I turned up the thermostat ten minutes ago. Please check it again now.",
          "Ôn tuần 28: việc đã làm + nhờ đồng nghiệp kiểm lại.",
          "colleague",
          ["thermostat"],
        ),
        sp(
          "Did anyone test the pool water this morning?",
          "Yes. I tested it at eight and wrote it in the pool water log.",
          "Việc đã làm + giờ + ghi ở đúng sổ.",
          "manager",
        ),
        sp(
          "Can I take my next guest into room two?",
          "Yes. I finished the treatment room checklist for room two at ten.",
          "Trả lời bằng bằng chứng: bảng kiểm đã xong lúc mấy giờ.",
          "colleague",
        ),
      ],
      reading: read(
        `Mrs Kim was sitting in the steam room when she suddenly felt dizzy. Quang was checking the towels nearby. He helped her out at once, called the hotel nurse and gave her water. He stayed with her until the nurse arrived. The nurse checked her, and Mrs Kim felt better. Then Quang wrote everything in the incident report, with the times, for his supervisor. The steam room problem went in the maintenance log. Nobody had to remember anything the next day.`,
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
            q: "Quang ghi chuyện của khách ở đâu?",
            options: [
              "Trong sổ bảo trì phòng xông hơi",
              "Trong bảng kiểm phòng trị liệu",
              "Trong báo cáo sự cố, có ghi giờ",
            ],
            correct: 2,
            explanation:
              "'wrote everything in the incident report, with the times' — chuyện của khách vào báo cáo sự cố; chuyện máy móc vào sổ bảo trì.",
          },
          {
            q: "Quang làm những việc theo thứ tự nào?",
            options: [
              "Gọi y tá → viết báo cáo → đưa khách ra",
              "Đưa khách ra → gọi y tá → cho nước → viết báo cáo",
              "Cho nước → viết báo cáo → gọi y tá",
            ],
            correct: 1,
            explanation:
              "'helped her out at once, called the hotel nurse and gave her water… Then Quang wrote' — đưa ra, gọi y tá, cho nước, rồi mới giấy tờ.",
          },
        ],
      ),
      game: [
        game(
          "What were you doing when the sauna heater stopped?",
          "I was checking the sauna when it suddenly stopped.",
          "I was check the sauna when it suddenly stopped.",
          "I was not there, so I really do not know. Maybe somebody else broke it.",
          "manager",
          "Câu cuối đoán và đổ cho người khác. Câu đúng kể việc đang làm (was checking) khi sự việc xảy ra.",
        ),
        game(
          "The guest in the steam room felt faint. What did you do?",
          "I took her out, called the hotel nurse and gave her some water.",
          "I take her out, called the hotel nurse and gave her some water.",
          "I gave her some water and told her to rest in the steam room for a while.",
          "manager",
          "Câu cuối để khách ở lại trong nhiệt. Câu đúng kể đủ: đưa ra, cho nước, gọi y tá.",
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
        risk({
          ...sp(
            "Anything I should know about the guests?",
            t3b,
            "Dị ứng của khách là việc phải bàn giao TRƯỚC liệu trình, không để ca sau tự đọc thấy.",
            "colleague",
            ["guest", "allergy", "note", "room", "massage"],
            t3a,
          ),
          alsoAccept: ["Yes. Please read the guest allergy note before the massage in room two."],
        }),
        sp(
          "What does the note say?",
          t3c,
          "Ôn tuần 23: dị ứng hạt → kiểm tra dầu và dùng loại không chứa hạt.",
          "colleague",
          ["nut", "free"],
          t3b,
        ),
        sp(
          "Are the oil bottles full for tomorrow?",
          "Not yet. I was refilling the oil bottles when the guest in room two called.",
          "Ôn tuần 25 + quá khứ tiếp diễn: việc đang làm dở và lý do.",
          "colleague",
          ["refilling", "oil", "bottles"],
        ),
        sp(
          "Any complaints from guests today?",
          "Yes, one complaint about a dirty changing room. I was cleaning it when you called.",
          "Ôn tuần 27 + quá khứ tiếp diễn: phàn nàn gì, bạn đang làm gì.",
          "manager",
          ["complaint", "dirty", "changing", "room"],
        ),
        sp(
          "Did you check the product stock list today?",
          "Yes. I checked the product stock list, and lavender oil is low.",
          "Đã kiểm gì + kết quả.",
          "manager",
        ),
        sp(
          "Any guest problems this afternoon?",
          "Yes. A guest in room five had a skin irritation, so I wrote an incident report.",
          "Ôn tuần 26–27: sự cố trên da của khách → báo cáo sự cố.",
          "manager",
          ["skin", "irritation", "incident", "report"],
        ),
      ],
      reading: read(
        `Before her break, Thuy writes the open items for the evening team. The linen order has not arrived yet, so robes are low. The guest in room two is allergic to nuts. Thuy tells the next therapist to read the guest allergy note before the massage, and to check the oil and use a nut-free one. Unscented oil can still come from almonds. Lavender oil is low on the product stock list, so she has ordered more. The evening team reads the list before the first guest.`,
        [
          {
            q: "Thủy dặn kỹ thuật viên ca sau làm gì trước buổi massage phòng hai?",
            options: [
              "Đọc ghi chú dị ứng và dùng dầu không chứa hạt",
              "Đếm lại số áo choàng còn trong tủ trước khi khách tới",
              "Hỏi khách đã ăn trưa hay chưa",
            ],
            correct: 0,
            explanation:
              "'read the guest allergy note… check the oil and use a nut-free one' — dị ứng hạt là việc an toàn phải bàn giao rõ.",
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
          {
            q: "Vì sao dầu 'không mùi' chưa chắc an toàn cho khách phòng hai?",
            options: [
              "Vì dầu không mùi đắt hơn dầu thường",
              "Vì khách phòng hai thích mùi oải hương",
              "Vì dầu không mùi vẫn có thể làm từ hạnh nhân",
            ],
            correct: 2,
            explanation:
              "Bài đọc dặn 'check the oil and use a nut-free one' — điều cần là KHÔNG CHỨA HẠT, không phải không mùi.",
          },
        ],
      ),
      game: [
        game(
          "Can I use the almond oil for the guest in room two?",
          "Please read the guest allergy note for room two before the massage.",
          "Please reads the guest allergy note for room two before the massage.",
          "Yes, of course. The almond oil is our best oil, and all the guests like it very much.",
          "colleague",
          "Câu cuối trả lời theo thói quen mà không xem ghi chú dị ứng. Câu đúng chỉ đúng chỗ phải đọc trước khi làm.",
        ),
        game(
          "Is the linen order here yet?",
          "Not yet. I called the laundry at four, and it comes at five.",
          "Not yet. I call the laundry at four, and it comes at five.",
          "I think so. Somebody probably put it in the store room already this afternoon.",
          "manager",
          "Câu cuối đoán thay vì nói điều đã kiểm. Câu đúng nói rõ chưa tới, đã làm gì và khi nào tới.",
        ),
      ],
    }),

    L(29, 4, "The Right Log for the Right Thing", "Đúng sổ cho đúng việc", {
      vocabulary: [
        c("Witness", "A colleague who saw it happen is a witness.", [
          "/ˈwɪtnəs/",
          "Người chứng kiến",
          "👀",
        ]),
        c("Walk-in list", "Write a guest without a booking on the walk-in list."),
        c("Next day booking list", "Print the next day booking list before you go home."),
        c("Handover", "Write every open item in the handover before you go.", [
          "/ˈhændəʊvə/",
          "Bàn giao ca",
          "🤝",
        ]),
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
          "Báo cáo sự việc như nó đã xảy ra (was asking), và việc bạn làm ngay.",
          "manager",
        ),
        sp(
          "What happened next?",
          t4b,
          "Các bước theo thứ tự, quá khứ đơn.",
          "manager",
          undefined,
          t4a,
        ),
        sp(
          "Where did you write it down?",
          t4c,
          "Chuyện xảy ra với khách ghi vào báo cáo sự cố, có giờ và phòng.",
          "manager",
          undefined,
          t4b,
        ),
        sp(
          "Thank you. Are you all right?",
          t4d,
          "Trả lời thật, và nói rõ điều bạn cần.",
          "manager",
          undefined,
          t4c,
        ),
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
          "Did the oil order come today?",
          "Yes. The spa product suppliers were delivering it when I came in at eight.",
          "Ôn tuần 26 + quá khứ tiếp diễn: việc đang diễn ra khi bạn tới.",
          "manager",
          ["spa", "product", "suppliers"],
        ),
        sp(
          "What went wrong with Ms Tan's facial?",
          "It was a wrong treatment booking, so I wrote it in the incident report.",
          "Ôn tuần 26–27: sự việc của khách vào báo cáo sự cố.",
          "manager",
          ["wrong", "treatment", "booking", "incident", "report"],
        ),
        sp(
          "Did anyone see the guest fall by the pool?",
          "Yes, Nam was a witness. He was cleaning the pool when it happened.",
          "Người chứng kiến + quá khứ tiếp diễn: ai thấy, họ đang làm gì.",
          "manager",
          ["witness"],
        ),
        sp(
          "Did the guest in room six get extra time?",
          "He asked me to extend the session, but the next hour was booked.",
          "Ôn tuần 28: kể lại yêu cầu và vì sao chưa làm được.",
          "manager",
          ["extend", "session"],
        ),
        sp(
          "A guest wanted something for her late start.",
          "I told her a goodwill gesture is your decision, and I wrote it in the handover.",
          "Ôn tuần 28: quà bù đắp là việc của quản lý; ghi vào bàn giao.",
          "manager",
          ["goodwill", "gesture", "handover"],
        ),
        sp(
          "Did anyone ask for money back today?",
          "A guest was asking me to refund the extra charge, so I called you.",
          "Ôn tuần 28 + quá khứ tiếp diễn: chuyện tiền chuyển cho quản lý.",
          "manager",
          ["refund", "extra", "charge"],
        ),
      ],
      reading: read(
        `At the end of her shift, Hanh uses four records. She writes the walk-in guests on the walk-in list. She prints the next day booking list. She checks the locker key count: one key is missing, so she tells her supervisor. A guest problem from the afternoon goes in the incident report, not in the key count. Each record has one job, so the next shift can find everything quickly. Hanh leaves at six, and nothing is lost.`,
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
              "Trong báo cáo sự cố",
            ],
            correct: 2,
            explanation:
              "'goes in the incident report, not in the key count' — mỗi sổ giữ đúng một loại việc.",
          },
          {
            q: "Vì sao mỗi sổ chỉ giữ một loại việc?",
            options: [
              "Để ca sau tìm đúng thông tin thật nhanh",
              "Để Hạnh không phải viết nhiều",
              "Để quản lý không đọc được sự cố",
            ],
            correct: 0,
            explanation:
              "'Each record has one job, so the next shift can find everything quickly' — ghi lẫn sổ là ca sau không tìm thấy.",
          },
        ],
      ),
      game: [
        game(
          "Can I write today's problems in the locker key count?",
          "No. Problems go in the incident report. The key count is for keys.",
          "No. Problems goes in the incident report. The key count is for keys.",
          "Yes, any book is fine for that.",
          "colleague",
          "Câu cuối cho ghi lẫn sổ — ca sau sẽ không tìm thấy. Câu đúng: sự việc vào báo cáo sự cố, số chìa khóa chỉ để đếm chìa khóa.",
        ),
        game(
          "Are you all right after what happened in room four?",
          "I am okay, thank you. Please do not book that guest with me again.",
          "I am okay, thank you. Please do not books that guest with me again.",
          "Yes, it was nothing. I can go back in now and finish his massage for him.",
          "manager",
          "Câu cuối quay lại phòng với vị khách đã vượt ranh giới. Câu đúng nói thật và đề nghị không xếp lại vị khách đó.",
        ),
      ],
    }),
  ];
}

// ── Week 30 — Checkpoint: putting it together ───────────────────────────
// The checkpoint week teaches no new word. Its cards re-present sixteen
// headwords of weeks 26-29 that had not been said again, and every one of
// them is said at least twice this week.
function week30(): LessonContent[] {
  const t1a =
    "I recommend the ninety-minute massage, madam. It is more relaxing than the shorter one.";
  const t1b = "There are two options, madam: lavender or lemongrass. Either option is lovely.";
  const t1c = "We can start at three o'clock. I will put it on the treatment schedule now.";
  const t2a = "Because the cancellation window is four hours, madam. It is on your booking card.";
  const t2b =
    "I understand, madam. I cannot change the charge, but I will ask my manager to call you.";
  const t2c = "I cannot promise that, madam. Only my manager can let you reschedule at no charge.";
  const t3a = "I will stop now, sir. Are you in pain?";
  const t3b = "I am calling the hotel nurse now, sir. I will stay with you.";
  const t3c = "I am sorry, sir. I will check your health form and tell my supervisor today.";
  const t4a = "I am sorry, sir. I cannot tell you when our staff finish work.";
  const t4b = "I am sorry, sir. I can book you on Friday at ten with another therapist.";
  const t4c = "I understand, sir. My supervisor will call you about it today.";
  return [
    L(30, 1, "Recommend and Promise", "Gợi ý và cam kết", {
      vocabulary: [
        c("Option", "There are two options for your massage oil."),
        c("Either", "Either option is fine for a first visit."),
        c("Change your therapist", "If you prefer, I can change your therapist next time."),
        c("Treatment schedule", "Every booking goes on the treatment schedule."),
      ],
      grammar: [
        g(
          "Ninety good.",
          "I recommend the ninety-minute massage, madam. It is more relaxing than sixty.",
          "Tuần 23: 'I recommend' + so sánh. Tính từ dài dùng 'more + tính từ + than'.",
          "I recommend the ninety-minute massage, madam. It is more relax than sixty.",
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
          "Tuần 28: hai lựa chọn, để khách chọn.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Lavender, please. When can we start?",
          t1c,
          "Tuần 25 + 29: giờ cụ thể, ghi ngay vào lịch trị liệu.",
          undefined,
          undefined,
          t1b,
        ),
        sp(
          "What should I do before my first guest?",
          "Please read the treatment schedule, and check the guest allergy note for room one.",
          "Nói với đồng nghiệp: hai việc, theo thứ tự.",
          "colleague",
          ["guest", "allergy", "note"],
        ),
        sp(
          "I did not like my therapist last time.",
          "I am sorry, madam. I will change your therapist for this visit.",
          "Tuần 28: khách đã nói rõ — làm ngay, không hỏi vặn.",
        ),
        sp(
          "Can I have a different therapist from now on?",
          "Of course, sir. I will change your therapist and update your guest notes.",
          "Tuần 28 + 29: đổi người và cập nhật ghi chú cho lần sau.",
        ),
        sp(
          "Is a massage or a facial better for tired skin?",
          "Either option is good, madam, but I recommend the facial for your skin.",
          "Tuần 23 + 28: so sánh hai lựa chọn rồi gợi ý một.",
          undefined,
          ["recommend"],
        ),
        sp(
          "Which option is cheaper, the package or single visits?",
          "The package is the cheaper option, madam, if you come four times.",
          "Tuần 23: so sánh hơn + điều kiện để gói có lợi.",
          undefined,
          ["package"],
        ),
        sp(
          "I have a nut allergy. Which oil will you use today?",
          "Thank you, madam. I will check the oil and use a nut-free one.",
          "Tuần 23: dị ứng hạt → kiểm tra dầu, dùng loại không chứa hạt.",
          undefined,
          ["check", "oil", "nut", "free"],
        ),
      ],
      reading: read(
        `Ms Park has ninety minutes free. Vy recommends the ninety-minute massage, because it is more relaxing than the shorter one. She gives Ms Park two options for the oil, lavender or lemongrass, and Ms Park chooses lavender. Vy puts the massage on the treatment schedule for three o'clock. Before the massage, Vy reads the guest allergy note. Ms Park is allergic to nuts, so Vy checks the oil and uses a nut-free one. After the massage, Ms Park books again for Sunday.`,
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
              "Đọc ghi chú dị ứng của khách",
              "Hỏi khách chọn loại tinh dầu nào hôm nay",
              "Báo giá buổi massage cho khách",
            ],
            correct: 0,
            explanation:
              "'Before the massage, Vy reads the guest allergy note' — bước an toàn đi trước liệu trình.",
          },
          {
            q: "Vì sao Vy phải kiểm tra loại dầu dù khách đã chọn oải hương?",
            options: [
              "Vì loại tinh dầu oải hương đã hết trong kho của spa",
              "Vì khách đổi ý vào phút cuối",
              "Vì khách dị ứng hạt, dầu nền phải không chứa hạt",
            ],
            correct: 2,
            explanation:
              "'Ms Park is allergic to nuts, so Vy checks the oil and uses a nut-free one' — mùi hương là lựa chọn, an toàn là bắt buộc.",
          },
        ],
      ),
      game: [
        game(
          "I only have one hour today. Is the ninety-minute one better?",
          "Then I recommend the sixty-minute massage, madam. It fits your time.",
          "Then I recommend the sixty-minute massage, madam. It fit your time.",
          "The ninety-minute one is always better, madam. You can be a little late for your next plan.",
          undefined,
          "Câu cuối bán buổi dài hơn bất chấp thời gian của khách. Câu đúng gợi ý theo đúng nhu cầu khách vừa nói.",
        ),
        game(
          "Which oil is best for me? I am allergic to nuts.",
          "Thank you, madam. I will check the oil and use a nut-free one.",
          "Thank you, madam. I will checks the oil and use a nut-free one.",
          "Our unscented oil is perfect for you, madam. It has no smell at all.",
          undefined,
          "Câu cuối nhầm 'không mùi' với 'không chứa hạt'. Câu đúng kiểm tra dầu và dùng loại không chứa hạt.",
        ),
      ],
    }),

    L(30, 2, "Explain and Coordinate", "Giải thích và điều phối", {
      vocabulary: [
        c("Reschedule at no charge", "Inside the window, you can reschedule at no charge."),
        c("Offer a free upgrade", "Only the spa manager can offer a free upgrade."),
        c("Add ten free minutes", "Only the spa manager can add ten free minutes."),
        c("Spa therapists", "Our spa therapists start work at nine."),
      ],
      grammar: [
        g(
          "Pay because late.",
          "There is a charge because you cancelled less than four hours before.",
          "Tuần 24: 'because' + mệnh đề có chủ ngữ và động từ; 'because of' chỉ đi với danh từ.",
          "There is a charge because of you cancelled less than four hours before.",
        ),
        g(
          "Therapist early, okay.",
          "I will ask the spa therapists to start ten minutes early for you, madam.",
          "Tuần 26: 'ask + người + to + động từ' — không bỏ 'to'.",
          "I will ask the spa therapists start ten minutes early for you, madam.",
        ),
      ],
      speaking: [
        sp(
          "I cancelled one hour before my massage. Why is there a charge?",
          t2a,
          "Tuần 24: lý do thật — một chính sách, một con số: bốn giờ.",
        ),
        sp(
          "That is not fair. Take it off now.",
          t2b,
          "Công nhận cảm xúc; bỏ phí là việc của quản lý — nói ai gọi lại.",
          undefined,
          ["charge", "manager"],
          t2a,
        ),
        sp(
          "Then can I at least reschedule at no charge?",
          t2c,
          "Dời lịch miễn phí sau hạn hủy là quyết định của quản lý — không tự hứa.",
          undefined,
          undefined,
          t2b,
        ),
        sp(
          "My massage started late. Can you add ten free minutes?",
          "I am sorry, madam. Only my manager can add ten free minutes, and I will ask her now.",
          "Tuần 28: phút miễn phí là việc của quản lý.",
        ),
        sp(
          "Can you give me a free upgrade to the couple's suite?",
          "I am sorry, sir. Only my manager can offer a free upgrade, and I will ask her.",
          "Tuần 28: nâng hạng miễn phí — chuyển quản lý.",
        ),
        sp(
          "A guest asked you for a free upgrade today. What did you say?",
          "I said I cannot offer a free upgrade myself, and I passed it to you.",
          "Báo cấp trên: kể lại lời từ chối và việc đã chuyển.",
          "manager",
        ),
        sp(
          "Did the late guest ask for extra time?",
          "Yes. She asked me to add ten free minutes, so I wrote it in the handover.",
          "Tuần 28 + 29: yêu cầu về tiền ghi vào bàn giao cho quản lý.",
          "manager",
          ["handover"],
        ),
        sp(
          "Can I move my booking to Saturday without paying?",
          "If you change it four hours before, you can reschedule at no charge, madam.",
          "Tuần 24 + 28: trong thời hạn thì dời lịch không mất phí — một chính sách.",
        ),
        sp(
          "Is there a therapist free at four today?",
          "Let me check with our spa therapists, sir. I will call your room within ten minutes.",
          "Tuần 26: hỏi đúng người, hứa gọi lại có con số.",
          undefined,
          ["within"],
        ),
        sp(
          "Room five needs a therapist at six.",
          "I will ask the spa therapists now and update the treatment schedule.",
          "Tuần 26 + 29: giao việc và cập nhật lịch.",
          "colleague",
          ["update", "treatment", "schedule"],
        ),
      ],
      reading: read(
        `Mrs Diaz cancels her massage one hour before it starts. Khoa explains the charge: the cancellation window is four hours, and it is on her booking card. Mrs Diaz says it is not fair, and she asks to reschedule at no charge. Khoa cannot change the charge or promise that, so he asks his manager to call her. The manager calls that day and moves the massage to Saturday. Nobody has to ask Mrs Diaz twice.`,
        [
          {
            q: "Vì sao khách bị tính phí?",
            options: [
              "Vì khách hủy khi chỉ còn một giờ, mà hạn hủy là bốn giờ",
              "Vì khách không đến buổi hẹn mà không báo trước cho spa",
              "Vì khách muốn đổi sang kỹ thuật viên nữ",
            ],
            correct: 0,
            explanation:
              "'the cancellation window is four hours' — khách hủy trước một giờ, đã qua thời hạn.",
          },
          {
            q: "Khoa làm gì với yêu cầu bỏ phí và dời lịch miễn phí?",
            options: [
              "Tự bỏ phí vì khách là khách quen",
              "Giải thích lại cho tới khi khách đồng ý",
              "Nhờ quản lý gọi cho khách",
            ],
            correct: 2,
            explanation:
              "'Khoa cannot change the charge or promise that, so he asks his manager to call her' — giải thích là việc của Khoa, quyết về tiền là của quản lý.",
          },
          {
            q: "Ai quyết định dời buổi massage sang thứ Bảy?",
            options: [
              "Chính Khoa, ngay tại quầy",
              "Quản lý, khi gọi cho khách",
              "Kỹ thuật viên phụ trách buổi massage",
            ],
            correct: 1,
            explanation:
              "'The manager calls that day and moves the massage to Saturday' — người có quyền quyết, khách vẫn được chăm sóc.",
          },
        ],
      ),
      game: [
        game(
          "The man at the pool said the upgrade is free today.",
          "Let me check the upgrade price with the spa desk, sir.",
          "Let me checks the upgrade price with the spa desk, sir.",
          "My colleague said so, so it is free, sir.",
          undefined,
          "Câu cuối tặng miễn phí dựa trên lời kể — vượt quyền. Câu đúng kiểm tra giá với quầy spa trước.",
        ),
        game(
          "I cancelled this morning. Can you just forget the charge?",
          "I understand, sir. I cannot change the charge, but I will ask my manager to call you.",
          "I understand, sir. I cannot changes the charge, but I will ask my manager to call you.",
          "Sure, sir. Just this once I will forget it, and nobody will check.",
          undefined,
          "Câu cuối tự bỏ phí — vượt quyền. Câu đúng công nhận cảm xúc và chuyển đúng người quyết.",
        ),
      ],
    }),

    L(30, 3, "Apologise and Solve", "Xin lỗi và giải quyết", {
      vocabulary: [
        c("Sauna attendants", "The sauna attendants check the heat every hour."),
        c("Suddenly", "The sauna heater suddenly stopped at ten."),
        c("Witness", "A colleague who saw it happen is a witness.", [
          "/ˈwɪtnəs/",
          "Người chứng kiến",
          "👀",
        ]),
        c("Pool water log", "We write every water test in the pool water log."),
      ],
      grammar: [
        g(
          "Guest dizzy, I help.",
          "The guest was sitting in the sauna when she suddenly felt dizzy.",
          "Tuần 29: was + -ing cho việc đang diễn ra; quá khứ đơn cho việc chen vào.",
          "The guest was sit in the sauna when she suddenly felt dizzy.",
        ),
        g(
          "Avoid knee? Okay.",
          "If you have an area to avoid, please tell me first, sir.",
          "Tuần 28: mệnh đề 'If' dùng hiện tại (have), không dùng 'will have'.",
          "If you will have an area to avoid, please tell me first, sir.",
        ),
      ],
      speaking: [
        risk({
          ...sp(
            "Ouch! That is my bad knee.",
            t3a,
            "Khách đau: DỪNG trước, rồi hỏi khách còn đau không. Không làm tiếp cho xong buổi.",
            undefined,
            ["stop", "pain"],
          ),
          alsoAccept: [
            "I am stopping now, sir. Are you in pain?",
            "I am very sorry, sir. I will stop now. Are you in pain?",
          ],
        }),
        sp(
          "Yes, it hurts quite a lot.",
          t3b,
          "Khách bị đau thật: gọi y tá ngay và ở lại với khách.",
          undefined,
          ["calling", "hotel", "nurse"],
          t3a,
        ),
        sp(
          "It is on my form. Did nobody read it?",
          t3c,
          "Không đổ lỗi, không chối: xem lại phiếu và báo giám sát.",
          undefined,
          undefined,
          t3b,
        ),
        sp(
          "What happened in the sauna this morning?",
          "The heater suddenly got very hot, so I asked the sauna attendants to close it.",
          "Tuần 29: kể sự cố — 'suddenly' + việc bạn đã làm.",
          "manager",
        ),
        sp(
          "Did anyone see the guest slip by the pool?",
          "Lan was a witness. She was checking the pool water log when it happened.",
          "Tuần 29: ai chứng kiến, người đó đang làm gì.",
          "manager",
        ),
        sp(
          "Who saw the guest in room two feel dizzy?",
          "I was the witness. She suddenly felt dizzy, so I helped her out.",
          "Tuần 29: tự nhận là người chứng kiến, kể ngắn theo thứ tự.",
          "manager",
        ),
        sp(
          "Is the pool water all right today?",
          "Yes. I tested it at nine, and it is in the pool water log.",
          "Tuần 29: việc đã làm + ghi ở đúng sổ.",
          "colleague",
        ),
        sp(
          "The sauna is too hot again.",
          "Then please ask the sauna attendants to check it, and close it until then.",
          "Tuần 26: nhờ đúng người, và đóng phòng cho an toàn.",
          "colleague",
        ),
        sp(
          "I like very light pressure, please.",
          "Thank you, madam. I will note it and use a lighter pressure today.",
          "Tuần 28: ghi lại sở thích và làm ngay.",
          undefined,
          ["lighter", "pressure"],
        ),
        sp(
          "It is a little cold in this room.",
          "I am sorry, madam. I will turn up the thermostat now.",
          "Tuần 28: khách đã nói rõ — làm ngay.",
          undefined,
          ["thermostat"],
        ),
      ],
      reading: read(
        `During a massage, Mr Reyes says, "Ouch! That is my bad knee." Duc stops at once and asks if he is in pain. Mr Reyes says it hurts quite a lot, so Duc calls the hotel nurse and stays with him. Later, Duc checks the health form. The knee is on the form, under areas to avoid, and Duc did not read that line before he started. He apologises and tells his supervisor the same day. Now he reads every answer first.`,
        [
          {
            q: "Đức làm gì ngay khi khách kêu đau?",
            options: [
              "Hỏi khách bị đau đầu gối từ bao giờ",
              "Dừng lại và hỏi khách có đau không",
              "Làm nhẹ tay hơn rồi tiếp tục làm",
            ],
            correct: 1,
            explanation:
              "'Duc stops at once and asks if he is in pain' — dừng trước, hỏi khách trước, rồi mới tìm nguyên nhân.",
          },
          {
            q: "Vì sao Đức gọi y tá?",
            options: [
              "Vì khách nói đầu gối đau khá nhiều",
              "Vì khách muốn được massage tiếp",
              "Vì phiếu sức khỏe bị viết sai",
            ],
            correct: 0,
            explanation:
              "'Mr Reyes says it hurts quite a lot, so Duc calls the hotel nurse' — đau thật thì người có chuyên môn xem.",
          },
          {
            q: "Thứ tự việc Đức làm là gì?",
            options: [
              "Xem phiếu → báo giám sát → dừng lại",
              "Gọi y tá → dừng lại → hỏi khách",
              "Dừng lại → hỏi khách → gọi y tá → xem phiếu → báo giám sát",
            ],
            correct: 2,
            explanation:
              "'stops… asks… calls the hotel nurse… Later, Duc checks the health form… tells his supervisor' — khách trước, giấy tờ sau.",
          },
        ],
      ),
      game: [
        game(
          "That really hurt my shoulder.",
          "I am stopping now, madam. Are you in pain?",
          "I am stop now, madam. Are you in pain?",
          "That is normal for a deep massage, madam. It means the massage is working well.",
          undefined,
          "Câu cuối coi cơn đau là bình thường và làm tiếp. Câu đúng dừng ngay và hỏi khách còn đau không.",
        ),
        game(
          "Can you avoid my lower back today? It is very sensitive.",
          "Of course, sir. I will avoid your lower back today.",
          "Of course, sir. I will avoids your lower back today.",
          "The lower back is the best part, sir. I will just be gentle there.",
          undefined,
          "Câu cuối vẫn làm vào vùng khách đã xin tránh. Câu đúng tôn trọng điều khách vừa nói.",
        ),
      ],
    }),

    L(30, 4, "End of Phase Three", "Kết thúc giai đoạn ba", {
      vocabulary: [
        c("Shift", "My shift ends at three o'clock."),
        c("Handover", "Write every open item in the handover before you go.", [
          "/ˈhændəʊvə/",
          "Bàn giao ca",
          "🤝",
        ]),
        c("Therapist roster", "The therapist roster shows who works tomorrow."),
        c("Linen order", "The linen order comes at six every morning."),
      ],
      grammar: [
        g(
          "Linen, I check, guest call.",
          "I was checking the linen order when the guest called.",
          "Tuần 29: was + -ing cho việc đang làm; quá khứ đơn 'called' cho việc chen vào.",
          "I was check the linen order when the guest called.",
        ),
        g(
          "Read handover. Start.",
          "Please read the handover before you start your shift.",
          "Sau 'before' dùng hiện tại (start), không dùng 'will'.",
          "Please read the handover before you will start your shift.",
        ),
      ],
      speaking: [
        risk({
          ...sp(
            "What time does Hoa finish work? I want to take her to dinner.",
            t4a,
            "Giờ làm của đồng nghiệp là riêng tư — KHÔNG nói, và không đặt lịch cho khách với chính người đó.",
            undefined,
            ["tell", "staff", "finish", "work"],
          ),
          alsoAccept: [
            "I am sorry, sir. I cannot tell you when Hoa finishes work.",
            "I am sorry, sir, I cannot share our staff's working hours.",
          ],
        }),
        sp(
          "Then book me with her on Friday morning.",
          t4b,
          "Đặt lịch với kỹ thuật viên KHÁC; giám sát sẽ nói chuyện với khách.",
          undefined,
          ["another", "therapist"],
          t4a,
        ),
        sp(
          "Why not with Hoa? She was great.",
          t4c,
          "Không giải thích thay giám sát, không tranh luận.",
          undefined,
          undefined,
          t4b,
        ),
        sp(
          "Anything I should know about tomorrow's bookings?",
          "Yes. Two guests asked about therapist gender, so I booked female therapists for them.",
          "Ôn tuần 28: báo cấp trên yêu cầu của khách và việc đã làm.",
          "manager",
          ["therapist", "gender"],
        ),
        sp(
          "Anything I should know about Hoa's guests?",
          "Yes. A guest asked when Hoa finishes work, so I wrote it in the handover.",
          "Báo cấp trên ngay: khách hỏi gì + bạn đã ghi ở đâu.",
          "manager",
        ),
        sp(
          "Is everything ready for the next shift?",
          "Yes. The therapist roster is done, and the linen order has arrived.",
          "Bàn giao: hai việc đã xong.",
          "manager",
        ),
        sp(
          "When does your shift start tomorrow?",
          "My shift starts at nine. I will read the handover first.",
          "Ca làm + việc đầu tiên khi nhận ca.",
          "colleague",
        ),
        sp(
          "Who is on the therapist roster for Sunday?",
          "Lan and Nam are on the therapist roster. I will update it if anyone is sick.",
          "Bảng phân ca: ai làm, và bạn làm gì nếu có thay đổi.",
          "colleague",
          ["update"],
        ),
        sp(
          "Has the linen order come yet?",
          "The linen order has not come yet. I will call the laundry before my shift ends.",
          "Việc còn mở: chưa xong (not yet) + việc bạn sẽ làm, có mốc.",
          "colleague",
        ),
        risk({
          ...sp(
            "I had some wine at lunch. Can I use the sauna now?",
            "I am sorry, madam. You cannot use the sauna after alcohol.",
            "Tuần 24: rượu bia + nhiệt là nguy hiểm — từ chối nhẹ nhàng, không trách khách.",
            undefined,
            ["sauna", "alcohol"],
          ),
          alsoAccept: [
            "I am sorry, madam. After alcohol, you cannot use the sauna.",
            "I am sorry, madam. You cannot go into the sauna after alcohol.",
            "I am sorry, sir. You cannot use the sauna after alcohol.",
            "I am sorry, sir. The sauna is not safe after alcohol.",
          ],
        }),
        sp(
          "Is the pool open after dinner?",
          "Yes, madam. The pool is open from seven in the morning to nine at night.",
          "Thông tin chính xác, đủ sáng và tối.",
        ),
        sp(
          "Is there anything you need to know before we start?",
          "Yes, madam. Please tell me about any sensitive area I should avoid.",
          "Ôn tuần 27: hỏi vùng cần tránh TRƯỚC khi bắt đầu.",
          undefined,
          ["sensitive", "area"],
        ),
        sp(
          "Is the sauna working again?",
          "Yes. Engineering fixed the broken sauna heater, and it is in the sauna maintenance log.",
          "Tuần 27 + 29: việc đã sửa + ghi ở đúng sổ.",
          "colleague",
          ["broken", "sauna", "heater", "maintenance", "log"],
        ),
        sp(
          "Did you print tomorrow's bookings?",
          "Yes. The next day booking list is on the desk, and the product stock list is done.",
          "Tuần 29: hai danh sách, mỗi thứ một chỗ.",
          "manager",
          ["next", "day", "booking", "list", "product", "stock"],
        ),
        sp(
          "Is room three ready for the next guest?",
          "Yes. I finished the treatment room checklist for room three at two.",
          "Tuần 29: trả lời bằng bằng chứng — bảng kiểm xong lúc mấy giờ.",
          "colleague",
          ["treatment", "room", "checklist"],
        ),
      ],
      reading: read(
        `On a busy Friday, Vy stays calm. A guest asks what time Hoa finishes work, because he wants to take her to dinner. Vy does not tell him, and she does not book him with Hoa. She books his massage with another therapist, tells her supervisor at once and writes it in the handover. The supervisor speaks to the guest. Later, a guest feels dizzy in the sauna. Vy helps her out, calls the hotel nurse and gives her water.`,
        [
          {
            q: "Vì sao Vy không đặt lịch cho khách với Hoa?",
            options: [
              "Vì Hoa đã kín lịch vào thứ Sáu",
              "Vì Vy không biết lịch làm của Hoa",
              "Vì khách muốn hẹn Hoa ra ngoài, không phải để massage",
            ],
            correct: 2,
            explanation:
              "'he wants to take her to dinner' — đó không còn là đặt lịch massage; Vy giữ an toàn cho đồng nghiệp và báo giám sát.",
          },
          {
            q: "Ai nói chuyện với vị khách đó sau cùng?",
            options: ["Giám sát của Vy", "Chính Hoa, tại quầy spa", "Một kỹ thuật viên khác"],
            correct: 0,
            explanation:
              "'tells her supervisor at once… The supervisor speaks to the guest' — chuyện này thuộc về giám sát.",
          },
          {
            q: "Khi khách bị choáng trong phòng xông hơi, Vy làm gì?",
            options: [
              "Mời khách ngồi nghỉ ngay trong phòng xông hơi",
              "Đưa khách ra, gọi y tá, rồi cho uống nước",
              "Gọi điện cho người nhà của khách tới đón",
            ],
            correct: 1,
            explanation:
              "'Vy helps her out, calls the hotel nurse and gives her water' — ra khỏi chỗ nóng, gọi người có chuyên môn, rồi chăm sóc.",
          },
        ],
      ),
      game: [
        game(
          "A guest wants to know what time Lan finishes work today.",
          "We do not give that out. I will tell our supervisor now.",
          "We not give that out. I will tell our supervisor now.",
          "She finishes at six, at the staff door.",
          "colleague",
          "Câu cuối đưa giờ làm và chỗ chờ của đồng nghiệp cho người lạ. Câu đúng giữ riêng tư và báo giám sát.",
        ),
        game(
          "When does your therapist Mai finish? I would like to meet her.",
          "I am sorry, sir. I cannot tell you when our staff finish work.",
          "I am sorry, sir. I cannot telling you when our staff finish work.",
          "She finishes at seven, sir, but please do not tell her that I told you.",
          undefined,
          "Câu cuối đưa giờ làm của đồng nghiệp cho khách muốn gặp riêng. Câu đúng từ chối rõ ràng, lịch sự.",
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

/** What the learner can SAY at the end of each week. */
export const SW_P3_CAN_DO: Record<number, string> = {
  23: "Hỏi sức khỏe trước liệu trình (dị ứng, thai kỳ, huyết áp), gợi ý một liệu trình hay gói phù hợp bằng câu so sánh, và vui vẻ nhận lời từ chối của khách.",
  24: "Giải thích phí và quy định của spa bằng 'have to' + 'because' (phí không đến, hạn hủy bốn giờ, rượu bia và phòng xông, giấy bác sĩ sau phẫu thuật), và chuyển việc bỏ phí cho quản lý.",
  25: "Hứa có con số ('within ten minutes', 'by six'), báo chậm trễ kèm giờ mới, và khi da khách bị rát thì dừng ngay, làm sạch bằng nước mát, gọi y tá.",
  26: "Chuyển một yêu cầu cho đúng người ('Let me check with…', 'I will ask … to …'), đưa khách choáng hay khó thở ra khỏi phòng xông rồi gọi y tá, và giữ riêng tư số điện thoại của đồng nghiệp.",
  27: "Nhận phàn nàn: lắng nghe, xin lỗi về điều khách gặp mà không nhận lỗi trước khi kiểm tra, hỏi cho rõ sự việc, và dừng liệu trình khi da khách bị kích ứng.",
  28: "Đề nghị giải pháp trong quyền bằng câu điều kiện ('If you like, I can…'), làm ngay khi khách đã nói rõ, từ chối phút miễn phí, nâng hạng, hoàn tiền và chuyển quản lý; dừng ngay khi khách vượt giới hạn.",
  29: "Bàn giao ca và báo cáo sự cố với đồng nghiệp, giám sát bằng quá khứ tiếp diễn ('She was sitting… when…'), và ghi đúng việc vào đúng sổ — sự cố của khách vào báo cáo sự cố.",
  30: "Kết hợp cả giai đoạn: gợi ý và hứa giờ, giải thích phí, xin lỗi và dừng khi khách đau, giữ riêng tư của đồng nghiệp và báo giám sát.",
};
