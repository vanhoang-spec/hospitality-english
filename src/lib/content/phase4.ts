// ============================================================
// PHASE 4 — B1.1 (weeks 31-40) · docs/curriculum-level-matrix.md
//
// The last phase, and the only one where the learner has to hold a
// position rather than follow a procedure. Phase 3 ended at "offer a
// remedy"; Phase 4 starts where the guest does not accept the remedy.
//
// What changes from A2+ to B1.1, pedagogically:
//  · Sentence cap rises 16 -> 22 words, and 3 clauses are now allowed,
//    so concession structures fit: "Although X, we can Y, provided Z."
//  · Speaking becomes open role-play — the learner improvises inside a
//    frame instead of reciting one.
//  · New structures land in sequence: emotive adjectives for
//    storytelling (31), "Based on…" for personalised advice (32),
//    "Policy allows… up to…" for compensation (33), formal good wishes
//    (34), "What if we… in exchange for…" and "however" for
//    negotiation (35), imperative + reassurance for crisis (36),
//    contract conditionals (37), and pitch structure (38).
//  · Week 39 is an unscripted rehearsal across all of them; week 40 is
//    the final assessment and carries the course-closing weektest.
//
// FIVE SLOTS ARE NOT GENERATED HERE. FB-31, HK-33, GR-34, BO-37 and
// BO-38 are hand-authored weeks already sitting in this range.
// week-content.ts spreads them AFTER this builder so they win; the
// spine output for those keys is discarded, and reviewWordsFor() reads
// through the same overrides so recycling never schedules a word the
// spine taught but the learner never saw.
// ============================================================

import type { LessonContent, WeekContent } from "./week-content";
import { LEXICONS, game, g, read, sp, v, type P0Lexicon } from "./phase0";
import { P4_BANKS, type P4Bank, type P4Word } from "./phase4-lexicon";

type Ctx = P0Lexicon & { bank: P4Bank };

function lesson(
  lx: Ctx,
  week: number,
  order: number,
  titleEn: string,
  titleVi: string,
  parts: Omit<LessonContent, "lessonId" | "lessonOrder" | "titleEn" | "titleVi">,
): LessonContent {
  return { lessonId: `${lx.code}_${week}_${order}`, lessonOrder: order, titleEn, titleVi, ...parts };
}

function bw(w: P4Word, context: string) {
  return v(w.word, w.phonetic, w.definition, context, w.icon);
}
const lo = (w: P4Word) => w.word.toLowerCase();

// ============================================================
// WEEK 31 — Telling the Story
// FRAMES · "The {story} is what makes this place special."
//        · "Let me tell you about the {story}."
// ============================================================
function week31(lx: Ctx): LessonContent[] {
  const [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14] = lx.bank.story;
  return [
    lesson(lx, 31, 1, "What Makes This Place Special", "Điều làm nên nét riêng", {
      vocabulary: [
        v("Special", "/ˈspeʃl/", "Đặc biệt", "This place is truly special.", "✨"),
        v("Proud", "/praʊd/", "Tự hào", "We are very proud of it.", "🏅"),
        bw(s1, `The ${lo(s1)} is what makes this place special.`),
        bw(s2, `Let me tell you about the ${lo(s2)}.`),
        bw(s3, `Guests often remember the ${lo(s3)} most.`),
        bw(s4, `We are very proud of the ${lo(s4)}.`),
      ],
      grammar: [
        g(`This place good, you like.`, `The ${lo(s1)} is what makes this place special, madam.`, "Cấu trúc nhấn mạnh 'What makes … is …' — cách kể chuyện chuyên nghiệp, thay cho câu khen chung chung."),
        g(`I tell you thing now.`, `Let me tell you about the ${lo(s2)}, if you have a moment.`, "Mở đầu câu chuyện bằng 'Let me tell you about…' và xin phép nhẹ bằng 'if you have a moment'."),
      ],
      speaking: [
        sp("It looks lovely here. Is there a story behind it?", `Indeed, sir. The ${lo(s1)} is what makes this place special.`, "Khung vàng tuần này. Khách hỏi là cơ hội kể chuyện — đừng chỉ đáp 'thank you'."),
        sp("Really? Tell me more about that.", `Let me tell you about the ${lo(s2)}. Guests often remember the ${lo(s3)} most.`, "Lượt hai nối tiếp câu chuyện, thêm một chi tiết mà khách khác đã yêu thích."),
      ],
      reading: read(
        `Mr. Okonkwo asks why the property feels different. ${lx.staff} answers warmly: "The ${lo(s1)} is what makes this place special. Let me tell you about the ${lo(s2)}. Guests often remember the ${lo(s3)} most." Mr. Okonkwo listens for several minutes.`,
        [
          {
            q: "Nhân viên bắt đầu câu chuyện bằng cấu trúc nào?",
            options: ["What makes this place special is…", "This place is good.", "You will like it."],
            correct: 0,
            explanation: "Cấu trúc nhấn mạnh khiến câu chuyện có trọng tâm, thay vì lời khen chung chung.",
          },
          {
            q: "Vì sao nên nhắc 'guests often remember … most'?",
            options: ["Tạo bằng chứng xã hội, khách tin hơn", "Để khoe khách sạn đông khách", "Để kết thúc câu chuyện"],
            correct: 0,
            explanation: "Trải nghiệm của khách trước là bằng chứng thuyết phục hơn lời quảng cáo của nhân viên.",
          },
        ],
      ),
      game: [
        game(
          "This is a beautiful property. How long has it been here?",
          `Let me tell you about the ${lo(s4)}, sir. We are very proud of it.`,
          `Long time ago, I think.`,
          `I do not know the history.`,
        ),
      ],
    }),

    lesson(lx, 31, 2, "Words That Create Feeling", "Từ ngữ gợi cảm xúc", {
      vocabulary: [
        v("Remarkable", "/rɪˈmɑːkəbl/", "Đáng chú ý, ấn tượng", "It is a remarkable experience.", "🌟"),
        bw(s5, `The ${lo(s5)} is quite remarkable.`),
        bw(s6, `Many guests describe the ${lo(s6)} as unforgettable.`),
        bw(s7, `There is something calming about the ${lo(s7)}.`),
        bw(s8, `The ${lo(s8)} took many years to create.`),
      ],
      grammar: [
        g(`It is very very good.`, `The ${lo(s5)} is quite remarkable, madam.`, "Ở B1 dùng tính từ mạnh chính xác ('remarkable') thay vì lặp 'very'."),
        g(`People say nice.`, `Many guests describe the ${lo(s6)} as unforgettable.`, "Cấu trúc 'describe … as …' cho phép trích lại cảm nhận của khách khác một cách trang trọng."),
      ],
      speaking: [
        sp("What should we not miss while we are here?", `The ${lo(s5)} is quite remarkable, sir.`, "Chọn một điểm nhấn duy nhất. Liệt kê năm thứ khiến khách không nhớ thứ nào."),
        sp("That does sound interesting.", `Many guests describe the ${lo(s6)} as unforgettable, and it took many years to create.`, "Lượt hai dùng câu ghép hai mệnh đề — đúng tầm B1."),
      ],
      reading: read(
        `${lx.staff} avoids empty praise. Instead of "very nice", he says: "The ${lo(s5)} is quite remarkable. Many guests describe the ${lo(s6)} as unforgettable. There is something calming about the ${lo(s7)}." Mrs. Halvorsen writes it down.`,
        [
          {
            q: "Nhân viên tránh cách nói nào?",
            options: ["Khen chung chung như 'very nice'", "Dùng tính từ mạnh", "Trích cảm nhận của khách khác"],
            correct: 0,
            explanation: "'avoids empty praise' — lời khen rỗng không tạo được hình ảnh trong đầu khách.",
          },
          {
            q: "'describe … as unforgettable' có tác dụng gì?",
            options: ["Trích cảm nhận của khách khác một cách trang trọng", "Ra lệnh cho khách", "Xin lỗi khách"],
            correct: 0,
            explanation: "Đây là cấu trúc kể lại đánh giá của người khác — nghe khách quan hơn tự khen.",
          },
        ],
      ),
      game: [
        game(
          "Is it worth staying an extra day to see it?",
          `Many guests describe the ${lo(s6)} as unforgettable, madam.`,
          `It is very very nice, yes.`,
          `Maybe yes, maybe no.`,
        ),
      ],
    }),

    lesson(lx, 31, 3, "Reading the Room", "Kể đúng người, đúng lúc", {
      vocabulary: [
        bw(s9, `For a first visit, I always mention the ${lo(s9)}.`),
        bw(s10, `Business guests appreciate the ${lo(s10)}.`),
        bw(s11, `Families usually enjoy the ${lo(s11)} most.`),
        bw(s12, `The ${lo(s12)} suits guests who prefer quiet.`),
      ],
      grammar: [
        g(`Everyone like this thing.`, `Business guests particularly appreciate the ${lo(s10)}.`, "Kể chuyện phải nhắm đúng đối tượng. 'Particularly' làm câu có trọng tâm."),
        g(`You quiet person, this good.`, `The ${lo(s12)} suits guests who prefer quiet.`, "Mệnh đề quan hệ 'who prefer quiet' — cấu trúc ba mệnh đề, đúng trần B1.1."),
      ],
      speaking: [
        sp("We are here for work, not for sightseeing.", `In that case, business guests particularly appreciate the ${lo(s10)}.`, "Nghe ra mục đích chuyến đi rồi mới chọn câu chuyện phù hợp."),
        sp("We would rather avoid crowds if possible.", `Then the ${lo(s12)} suits guests who prefer quiet, sir.`, "Đổi hoàn toàn nội dung kể khi nhu cầu khách đổi — đó là điều phân biệt B1 với học thuộc lòng."),
      ],
      reading: read(
        `Two guests arrive an hour apart. To the business traveller ${lx.staff} says: "Business guests particularly appreciate the ${lo(s10)}." To the family he says: "Families usually enjoy the ${lo(s11)} most." Same property, two different stories.`,
        [
          {
            q: "Vì sao nhân viên kể hai câu chuyện khác nhau?",
            options: ["Vì hai khách có nhu cầu khác nhau", "Vì anh ta quên mất câu chuyện cũ", "Vì khách sạn có hai khu"],
            correct: 0,
            explanation: "'Same property, two different stories' — cùng một nơi, nhưng kể theo điều khách quan tâm.",
          },
          {
            q: "'who prefer quiet' là loại mệnh đề gì?",
            options: ["Mệnh đề quan hệ bổ nghĩa cho danh từ", "Mệnh đề chỉ thời gian", "Mệnh đề chỉ nguyên nhân"],
            correct: 0,
            explanation: "Mệnh đề quan hệ giúp mô tả chính xác nhóm khách nào phù hợp.",
          },
        ],
      ),
      game: [
        game(
          "We are travelling with our two young children.",
          `Then families usually enjoy the ${lo(s11)} most, madam.`,
          `Children are welcome here.`,
          `Everyone likes everything here.`,
        ),
      ],
    }),

    lesson(lx, 31, 4, "Ending the Story Well", "Kết thúc câu chuyện", {
      vocabulary: [
        bw(s13, `I hope you will experience the ${lo(s13)} yourself.`),
        bw(s14, `Do ask me anything about the ${lo(s14)}.`),
      ],
      grammar: [
        g(`Okay, story finish.`, `I hope you will experience the ${lo(s13)} yourself, madam.`, "Kết câu chuyện bằng lời mời trải nghiệm, không kết cụt lủn."),
        g(`Question you ask me.`, `Do ask me anything about the ${lo(s14)} during your stay.`, "'Do ask me…' là lời mời nhấn mạnh, lịch sự và thân thiện hơn 'you can ask'."),
      ],
      speaking: [
        sp("Thank you, that was fascinating.", `I hope you will experience the ${lo(s13)} yourself, sir. Do ask me anything during your stay.`, "Câu kết mở cánh cửa cho lần trò chuyện sau — khách sẽ quay lại tìm bạn."),
      ],
      reading: read(
        `${lx.staff} never ends abruptly. He closes with: "I hope you will experience the ${lo(s13)} yourself. Do ask me anything about the ${lo(s14)} during your stay." Mr. Bianchi comes back to him twice more that week.`,
        [
          {
            q: "Vì sao khách quay lại tìm nhân viên này?",
            options: ["Vì anh ấy mở lời sẵn sàng trả lời thêm", "Vì anh ấy nói nhiều nhất", "Vì anh ấy tặng quà"],
            correct: 0,
            explanation: "Lời mời cuối câu chuyện biến một lần trò chuyện thành một mối quan hệ trong suốt kỳ nghỉ.",
          },
          {
            q: "'Do ask me…' khác 'You can ask me…' thế nào?",
            options: ["Nhấn mạnh lời mời, nghe nồng hậu hơn", "Là câu mệnh lệnh gắt", "Là câu hỏi"],
            correct: 0,
            explanation: "Trợ động từ 'do' đứng trước động từ mệnh lệnh dùng để nhấn mạnh thiện chí.",
          },
        ],
      ),
      game: [
        game(
          "Thank you for explaining all of that to us.",
          `I hope you will experience the ${lo(s13)} yourself, madam.`,
          `Okay. That is the end.`,
          `You are welcome. Goodbye now.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 32 — Personalised Advice
// FRAMES · "Based on your {preference}, I would suggest the quiet wing."
//        · "May I note your {preference} in the system?"
// ============================================================
function week32(lx: Ctx): LessonContent[] {
  const [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14] = lx.bank.preferences;
  return [
    lesson(lx, 32, 1, "Based on What You Told Me", "Tư vấn dựa trên thông tin khách", {
      vocabulary: [
        v("Based on", "/beɪst ɒn/", "Dựa trên", "Based on your needs, I suggest this.", "🧭"),
        v("Suggest", "/səˈdʒest/", "Đề xuất", "May I suggest another option?", "💡"),
        bw(p1, `Based on your ${lo(p1)}, I would suggest a quieter option.`),
        bw(p2, `May I note your ${lo(p2)} in the system?`),
        bw(p3, `I remember your ${lo(p3)} from last time.`),
        bw(p4, `Your ${lo(p4)} is already recorded, madam.`),
      ],
      grammar: [
        g(`You want this so take that.`, `Based on your ${lo(p1)}, I would suggest a quieter option.`, "'Based on…' mở đầu lời tư vấn cho thấy bạn đã lắng nghe, không áp đặt."),
        g(`I write your thing.`, `May I note your ${lo(p2)} in the system, sir?`, "Xin phép trước khi ghi thông tin khách — vừa lịch sự vừa đúng quy định bảo mật."),
      ],
      speaking: [
        sp("I am a very light sleeper, unfortunately.", `Based on your ${lo(p1)}, I would suggest a quieter option, sir.`, "Khung vàng tuần này. Nhắc lại điều khách vừa nói rồi mới đề xuất."),
        sp("That would be helpful, thank you.", `May I note your ${lo(p2)} in the system, so we remember next time?`, "Lượt hai: xin phép lưu hồ sơ và nói rõ lợi ích cho khách."),
      ],
      reading: read(
        `Ms. Aliyeva mentions a preference in passing. ${lx.staff} catches it: "Based on your ${lo(p1)}, I would suggest a quieter option. May I note your ${lo(p2)} in the system?" On her next stay, nobody has to ask again.`,
        [
          {
            q: "Vì sao lần sau không ai phải hỏi lại khách?",
            options: ["Vì thông tin đã được ghi vào hồ sơ", "Vì khách tự nhắc lại", "Vì khách ở cùng phòng cũ"],
            correct: 0,
            explanation: "Ghi lại sở thích là cách biến một lần phục vụ tốt thành dịch vụ cá nhân hoá lâu dài.",
          },
          {
            q: "Vì sao phải xin phép trước khi ghi?",
            options: ["Tôn trọng quyền riêng tư của khách", "Vì máy tính yêu cầu", "Vì quản lý bắt buộc"],
            correct: 0,
            explanation: "Thông tin cá nhân chỉ được lưu khi khách đồng ý — vừa lịch sự vừa đúng quy định.",
          },
        ],
      ),
      game: [
        game(
          "I do not sleep well if there is any noise at all.",
          `Based on your ${lo(p1)}, I would suggest a quieter option, madam.`,
          `Every room is quiet here.`,
          `You should sleep earlier then.`,
        ),
      ],
    }),

    lesson(lx, 32, 2, "Remembering Returning Guests", "Nhớ khách quen", {
      vocabulary: [
        v("Usual", "/ˈjuːʒuəl/", "Như thường lệ", "Would you like your usual table?", "🔁"),
        bw(p5, `I have arranged your ${lo(p5)} as usual.`),
        bw(p6, `Would you like the same ${lo(p6)} as last time?`),
        bw(p7, `We kept a note of your ${lo(p7)}.`),
        bw(p8, `Your ${lo(p8)} has not changed, I hope?`),
      ],
      grammar: [
        g(`Same like before, yes?`, `Would you like the same ${lo(p6)} as last time, sir?`, "So sánh với lần trước bằng 'the same … as last time' — chuẩn và tự nhiên."),
        g(`Still same you?`, `Your ${lo(p8)} has not changed, I hope?`, "Câu hỏi đuôi nhẹ nhàng 'I hope?' để xác nhận mà không nghe như thẩm vấn."),
      ],
      speaking: [
        sp("You remember me? I was here in March.", `Of course, sir. I have arranged your ${lo(p5)} as usual.`, "Nhớ khách là món quà lớn nhất trong ngành. Nói ra bằng hành động cụ thể, không chỉ 'I remember you'."),
        sp("That is impressive. Thank you.", `We kept a note of your ${lo(p7)}. Your ${lo(p8)} has not changed, I hope?`, "Lượt hai xác nhận lại — sở thích có thể đổi, đừng cho là đương nhiên."),
      ],
      reading: read(
        `A returning guest is greeted by name. ${lx.staff} says: "I have arranged your ${lo(p5)} as usual. We kept a note of your ${lo(p7)}." He then checks: "Your ${lo(p8)} has not changed, I hope?" The guest is delighted, and corrects one small detail.`,
        [
          {
            q: "Vì sao nhân viên vẫn hỏi lại dù đã có hồ sơ?",
            options: ["Vì sở thích khách có thể đã thay đổi", "Vì hồ sơ bị mất", "Vì anh ta không tin hồ sơ"],
            correct: 0,
            explanation: "Khách đã sửa một chi tiết — hỏi lại giúp hồ sơ luôn đúng thay vì phục vụ theo thông tin cũ.",
          },
          {
            q: "Cấu trúc nào dùng để so sánh với lần trước?",
            options: ["the same … as last time", "more than before", "as soon as possible"],
            correct: 0,
            explanation: "'The same … as …' là cấu trúc so sánh bằng, dùng khi nhắc lại lựa chọn cũ của khách.",
          },
        ],
      ),
      game: [
        game(
          "I stayed with you last spring, if you have my details.",
          `Would you like the same ${lo(p6)} as last time, sir?`,
          `I do not remember you.`,
          `Please tell me everything again.`,
        ),
      ],
    }),

    lesson(lx, 32, 3, "When You Do Not Know Yet", "Khi chưa biết sở thích khách", {
      vocabulary: [
        bw(p9, `May I ask about your ${lo(p9)}?`),
        bw(p10, `Some guests care about the ${lo(p10)}, others do not.`),
        bw(p11, `Do you have any preference regarding the ${lo(p11)}?`),
        bw(p12, `I will adjust the ${lo(p12)} to suit you.`),
      ],
      grammar: [
        g(`Tell me what you like.`, `Do you have any preference regarding the ${lo(p11)}, madam?`, "'Do you have any preference regarding…?' là câu hỏi mở, lịch sự, đúng tầm B1."),
        g(`Some people like some no.`, `Some guests care about the ${lo(p10)}, others do not.`, "Cấu trúc 'some…, others…' để nêu hai nhóm mà không áp đặt khách thuộc nhóm nào."),
      ],
      speaking: [
        sp("This is our first time here.", `Welcome, madam. Do you have any preference regarding the ${lo(p11)}?`, "Khách mới thì hỏi, đừng đoán. Hỏi đúng câu quan trọng nhất trước."),
      ],
      reading: read(
        `With a first-time guest, ${lx.staff} asks rather than assumes: "May I ask about your ${lo(p9)}? Some guests care about the ${lo(p10)}, others do not. I will adjust the ${lo(p12)} to suit you." Nothing is guessed.`,
        [
          {
            q: "Với khách mới, nhân viên làm gì?",
            options: ["Hỏi thay vì đoán", "Đoán theo quốc tịch", "Không hỏi gì cả"],
            correct: 0,
            explanation: "'asks rather than assumes' — đoán sai sở thích còn tệ hơn không biết.",
          },
          {
            q: "'Some guests…, others do not' dùng để làm gì?",
            options: ["Cho khách thấy cả hai lựa chọn đều bình thường", "Chê khách khó tính", "So sánh khách với nhau"],
            correct: 0,
            explanation: "Cách nói này giúp khách thoải mái nói ra sở thích thật mà không ngại.",
          },
        ],
      ),
      game: [
        game(
          "We have never stayed at this kind of property before.",
          `Do you have any preference regarding the ${lo(p11)}, sir?`,
          `Everybody wants the same thing.`,
          `You will find out later.`,
        ),
      ],
    }),

    lesson(lx, 32, 4, "Advice They Did Not Expect", "Gợi ý vượt mong đợi", {
      vocabulary: [
        bw(p13, `Since you mentioned your ${lo(p13)}, I arranged something.`),
        bw(p14, `I thought of your ${lo(p14)} and made a small change.`),
      ],
      grammar: [
        g(`You say before so I do.`, `Since you mentioned your ${lo(p13)}, I arranged something for you.`, "'Since you mentioned…' nối lại điều khách nói trước đó — bằng chứng bạn thực sự lắng nghe."),
        g(`I change little thing.`, `I thought of your ${lo(p14)} and made a small change to your booking.`, "Câu ghép hai mệnh đề, nói rõ bạn đã nghĩ gì và làm gì."),
      ],
      speaking: [
        sp("Oh — I did not ask for this. Why is it here?", `Since you mentioned your ${lo(p13)}, I arranged something for you, madam.`, "Đây là đỉnh cao của dịch vụ cá nhân hoá: làm trước khi khách kịp yêu cầu."),
      ],
      reading: read(
        `Mrs. Lindgren finds something waiting in her room that she never requested. ${lx.staff} explains: "Since you mentioned your ${lo(p13)}, I arranged something for you. I thought of your ${lo(p14)} and made a small change." She tells three friends about it.`,
        [
          {
            q: "Điều gì khiến khách kể lại cho bạn bè?",
            options: ["Được phục vụ điều mình chưa kịp yêu cầu", "Được giảm giá phòng", "Được đổi phòng rộng hơn"],
            correct: 0,
            explanation: "Dịch vụ vượt mong đợi bắt đầu từ việc nhớ một câu khách nói lướt qua.",
          },
          {
            q: "'Since you mentioned…' có tác dụng gì?",
            options: ["Cho khách biết bạn đã thực sự lắng nghe", "Nhắc khách đã đòi hỏi", "Xin lỗi khách"],
            correct: 0,
            explanation: "Nối lại lời khách đã nói là cách chứng minh sự chú ý, không phải khoe công.",
          },
        ],
      ),
      game: [
        game(
          "I did not order this. Is there a mistake?",
          `Since you mentioned your ${lo(p13)}, I arranged it for you, sir.`,
          `Someone put it there, not me.`,
          `Please pay for it at check-out.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 33 — Disputes & Compensation (full LAST)
// FRAMES · "I am very sorry about the {dispute}."
//        · "Our policy allows compensation for the {dispute}."
// ============================================================
function week33(lx: Ctx): LessonContent[] {
  const [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14] = lx.bank.disputes;
  return [
    lesson(lx, 33, 1, "Taking the Claim Seriously", "Tiếp nhận khiếu nại", {
      vocabulary: [
        v("Claim", "/kleɪm/", "Khiếu nại, yêu cầu bồi thường", "I will record your claim now.", "📋"),
        v("Compensation", "/ˌkɒmpenˈseɪʃn/", "Bồi thường", "We will discuss compensation.", "💷"),
        bw(d1, `I am very sorry about the ${lo(d1)}.`),
        bw(d2, `Could you describe the ${lo(d2)} in detail?`),
        bw(d3, `I will record the ${lo(d3)} exactly as you say it.`),
        bw(d4, `The ${lo(d4)} should never have happened.`),
      ],
      grammar: [
        g(`Okay I hear you, calm please.`, `I am very sorry about the ${lo(d1)}. Could you describe it in detail?`, "Xin lỗi trước, lấy thông tin sau. Không bao giờ bảo khách bình tĩnh."),
        g(`I write what I think.`, `I will record the ${lo(d3)} exactly as you say it, sir.`, "Ghi đúng lời khách, không diễn giải lại theo ý mình — đây là nguyên tắc xử lý khiếu nại."),
      ],
      speaking: [
        sp("This has ruined our entire trip.", `I am very sorry about the ${lo(d1)}, madam. The ${lo(d4)} should never have happened.`, "Khung vàng tuần này. Thừa nhận chuẩn mực đã bị vi phạm, đừng giảm nhẹ mức độ."),
        sp("So what happens now?", `I will record the ${lo(d3)} exactly as you say it, then bring it to my supervisor.`, "Nói rõ hai bước tiếp theo — khách cần thấy quy trình, không chỉ lời xin lỗi."),
      ],
      reading: read(
        `Mr. Halvorsen makes a serious claim. ${lx.staff} does not argue: "I am very sorry about the ${lo(d1)}. Could you describe the ${lo(d2)} in detail? I will record it exactly as you say it." He writes down the guest's own words.`,
        [
          {
            q: "Vì sao ghi đúng nguyên văn lời khách?",
            options: ["Để không làm sai lệch nội dung khiếu nại", "Để tiết kiệm thời gian", "Để khách ký tên"],
            correct: 0,
            explanation: "Diễn giải lại theo ý mình dễ làm mất chi tiết quan trọng và khiến khách thấy không được tôn trọng.",
          },
          {
            q: "Nhân viên phản ứng thế nào với khiếu nại nặng?",
            options: ["Không tranh cãi, xin lỗi và ghi nhận", "Giải thích lý do ngay", "Yêu cầu khách bình tĩnh"],
            correct: 0,
            explanation: "'does not argue' — tranh cãi ở bước tiếp nhận sẽ đóng lại mọi khả năng hoà giải.",
          },
        ],
      ),
      game: [
        game(
          "Something of mine was damaged during my stay.",
          `I am very sorry, sir. Could you describe the ${lo(d2)} in detail?`,
          `Are you sure it was us?`,
          `That is not possible here.`,
        ),
      ],
    }),

    lesson(lx, 33, 2, "What the Policy Allows", "Chính sách cho phép đến đâu", {
      vocabulary: [
        v("Allow", "/əˈlaʊ/", "Cho phép", "Our policy allows a refund.", "✅"),
        bw(d5, `Our policy allows compensation for the ${lo(d5)}.`),
        bw(d6, `We can cover the ${lo(d6)} up to a certain limit.`),
        bw(d7, `The ${lo(d7)} is assessed case by case.`),
        bw(d8, `I must check the ${lo(d8)} with my supervisor first.`),
      ],
      grammar: [
        g(`We pay you some money maybe.`, `Our policy allows compensation for the ${lo(d5)}, up to a certain limit.`, "Ngữ pháp trọng tâm tuần 33: 'Policy allows … up to …'. Nói rõ giới hạn ngay từ đầu."),
        g(`I ask boss then tell you.`, `I must check the ${lo(d8)} with my supervisor first, and I will come back within the hour.`, "Xin ý kiến cấp trên phải kèm mốc thời gian, nếu không khách sẽ chờ trong lo lắng."),
      ],
      speaking: [
        sp("I expect you to pay for the full value.", `Our policy allows compensation for the ${lo(d5)}, up to a certain limit, sir.`, "Nói giới hạn ngay. Hứa mơ hồ rồi rút lại sau còn tệ hơn từ chối thẳng."),
        sp("And who decides that limit?", `The ${lo(d7)} is assessed case by case. I must check with my supervisor first.`, "Minh bạch về người quyết định giúp khách không quy trách nhiệm cho cá nhân bạn."),
      ],
      reading: read(
        `${lx.staff} is honest about the ceiling: "Our policy allows compensation for the ${lo(d5)}, up to a certain limit. The ${lo(d7)} is assessed case by case. I must check the ${lo(d8)} with my supervisor first." Mr. Reyes accepts the process.`,
        [
          {
            q: "Nhân viên nói gì về mức bồi thường?",
            options: ["Có giới hạn và xét theo từng trường hợp", "Bồi thường toàn bộ giá trị", "Không bồi thường gì"],
            correct: 0,
            explanation: "'up to a certain limit' và 'case by case' — nói thật ngay từ đầu để không phải rút lời sau.",
          },
          {
            q: "Vì sao khách chấp nhận quy trình?",
            options: ["Vì được nói rõ ràng và trung thực", "Vì sợ nhân viên", "Vì không còn lựa chọn"],
            correct: 0,
            explanation: "Sự minh bạch về giới hạn tạo lòng tin nhanh hơn một lời hứa hào phóng nhưng mơ hồ.",
          },
        ],
      ),
      game: [
        game(
          "How much are you actually going to pay me?",
          `Our policy allows compensation up to a certain limit, madam.`,
          `We will pay everything you ask.`,
          `We never pay for these things.`,
        ),
      ],
    }),

    lesson(lx, 33, 3, "Negotiating the Settlement", "Thương lượng mức đền bù", {
      vocabulary: [
        bw(d9, `Would a partial refund for the ${lo(d9)} be acceptable?`),
        bw(d10, `We could offer a credit instead of cash for the ${lo(d10)}.`),
        bw(d11, `I understand the ${lo(d11)} means more than money to you.`),
        bw(d12, `Let us find a fair outcome for the ${lo(d12)}.`),
      ],
      grammar: [
        g(`You take this money, finish.`, `Would a partial refund for the ${lo(d9)} be acceptable, sir?`, "Đề nghị bằng câu hỏi 'Would … be acceptable?' — khách vẫn giữ quyền quyết định."),
        g(`Money no, we give voucher.`, `We could offer a credit instead of cash for the ${lo(d10)}, if you prefer.`, "Đưa phương án thay thế kèm 'if you prefer' để khách không thấy bị ép."),
      ],
      speaking: [
        sp("A refund does not undo what happened.", `I understand the ${lo(d11)} means more than money to you, madam.`, "Thừa nhận giá trị phi vật chất trước khi bàn tiền — nhiều khiếu nại thực chất là về sự tôn trọng."),
        sp("At least you understand that.", `Let us find a fair outcome for the ${lo(d12)} together.`, "'Together' đổi cuộc đối thoại từ đối đầu sang cùng giải quyết."),
      ],
      reading: read(
        `The guest says money is not the point. ${lx.staff} answers: "I understand the ${lo(d11)} means more than money to you. Let us find a fair outcome for the ${lo(d12)} together." Only then does he mention the refund.`,
        [
          {
            q: "Nhân viên nói về tiền vào lúc nào?",
            options: ["Sau khi thừa nhận cảm xúc của khách", "Ngay câu đầu tiên", "Không nói tới tiền"],
            correct: 0,
            explanation: "'Only then does he mention the refund' — đề nghị tiền quá sớm khiến khách thấy bị mua chuộc.",
          },
          {
            q: "Từ 'together' có tác dụng gì?",
            options: ["Chuyển từ đối đầu sang cùng giải quyết", "Nhấn mạnh lỗi của khách", "Kết thúc cuộc nói chuyện"],
            correct: 0,
            explanation: "Ngôn ngữ hợp tác làm giảm căng thẳng nhanh hơn mọi lời xin lỗi lặp lại.",
          },
        ],
      ),
      game: [
        game(
          "No amount of money will fix this, you know.",
          `I understand the ${lo(d11)} means more than money to you, sir.`,
          `Money always fixes problems.`,
          `Then we can do nothing for you.`,
        ),
      ],
    }),

    lesson(lx, 33, 4, "Closing in Writing", "Chốt bằng văn bản", {
      vocabulary: [
        bw(d13, `I will confirm the ${lo(d13)} in writing today.`),
        bw(d14, `A copy of the ${lo(d14)} will be sent to your email.`),
      ],
      grammar: [
        g(`I tell you, is enough.`, `I will confirm the ${lo(d13)} in writing today, madam.`, "Thoả thuận bồi thường phải có văn bản. Lời nói miệng dễ dẫn tới tranh cãi lần hai."),
        g(`Email I send maybe.`, `A copy of the ${lo(d14)} will be sent to your email before you leave.`, "Câu bị động 'will be sent' phù hợp khi nói về quy trình, kèm mốc thời gian cụ thể."),
      ],
      speaking: [
        sp("How do I know you will actually do this?", `I will confirm the ${lo(d13)} in writing today, and a copy will be sent to your email.`, "Văn bản là câu trả lời duy nhất cho câu hỏi này. Đừng chỉ hứa thêm lần nữa."),
      ],
      reading: read(
        `Before Mr. Sørensen leaves, ${lx.staff} says: "I will confirm the ${lo(d13)} in writing today. A copy of the ${lo(d14)} will be sent to your email before you leave." The claim never has to be reopened.`,
        [
          {
            q: "Vì sao khiếu nại không bị mở lại?",
            options: ["Vì thoả thuận đã được ghi thành văn bản", "Vì khách quên mất", "Vì nhân viên đã đổi ca"],
            correct: 0,
            explanation: "Văn bản chấm dứt tranh cãi về việc ai đã hứa điều gì.",
          },
          {
            q: "'will be sent' là dạng gì?",
            options: ["Bị động, phù hợp khi nói về quy trình", "Câu hỏi", "Quá khứ đơn"],
            correct: 0,
            explanation: "Bị động nhấn mạnh việc sẽ được thực hiện, không phụ thuộc vào một cá nhân cụ thể.",
          },
        ],
      ),
      game: [
        game(
          "I have heard promises from your staff before.",
          `I will confirm the ${lo(d13)} in writing today, sir.`,
          `You must trust me this time.`,
          `I cannot put anything in writing.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 34 — Special Occasions
// FRAMES · "We have prepared the {occasion} for you."
//        · "The {occasion} will be ready before you return."
// ============================================================
function week34(lx: Ctx): LessonContent[] {
  const [o1, o2, o3, o4, o5, o6, o7, o8, o9, o10, o11, o12, o13, o14] = lx.bank.occasions;
  return [
    lesson(lx, 34, 1, "Discovering the Occasion", "Phát hiện dịp đặc biệt", {
      vocabulary: [
        v("Celebrate", "/ˈselɪbreɪt/", "Kỷ niệm, ăn mừng", "Are you celebrating something?", "🎉"),
        v("Occasion", "/əˈkeɪʒn/", "Dịp đặc biệt", "It is a very special occasion.", "📅"),
        bw(o1, `May I ask if you are planning the ${lo(o1)}?`),
        bw(o2, `We could arrange the ${lo(o2)} quietly.`),
        bw(o3, `The ${lo(o3)} is one of our most requested.`),
        bw(o4, `Nothing about the ${lo(o4)} will be obvious.`),
      ],
      grammar: [
        g(`You celebrate something?`, `May I ask if you are planning the ${lo(o1)}, sir?`, "Câu hỏi gián tiếp 'May I ask if…' tế nhị hơn khi chạm vào chuyện riêng của khách."),
        g(`Nobody know, secret.`, `Nothing about the ${lo(o4)} will be obvious to your partner.`, "Trấn an về tính bí mật bằng câu khẳng định rõ ràng, không nói lấp lửng."),
      ],
      speaking: [
        sp("We are here for a rather important reason.", `May I ask if you are planning the ${lo(o1)}, madam?`, "Khung vàng tuần này. Hỏi tế nhị — khách sẽ tự kể nếu thấy được tôn trọng."),
        sp("Yes, but please do not make a fuss.", `Of course. We could arrange the ${lo(o2)} quietly, and nothing will be obvious.`, "Khách muốn kín đáo thì phải cam kết kín đáo — đừng biến niềm vui của họ thành màn trình diễn."),
      ],
      reading: read(
        `${lx.staff} notices a detail on the booking and asks carefully: "May I ask if you are planning the ${lo(o1)}?" The guest confirms but asks for discretion. "We could arrange the ${lo(o2)} quietly. Nothing about the ${lo(o4)} will be obvious."`,
        [
          {
            q: "Khách yêu cầu điều gì?",
            options: ["Làm kín đáo, không phô trương", "Làm thật hoành tráng", "Không làm gì cả"],
            correct: 0,
            explanation: "'asks for discretion' — không phải khách nào cũng muốn được chú ý.",
          },
          {
            q: "'May I ask if…' dùng khi nào?",
            options: ["Khi hỏi chuyện riêng tư của khách", "Khi ra lệnh", "Khi từ chối"],
            correct: 0,
            explanation: "Câu hỏi gián tiếp giảm cảm giác tò mò, cho khách quyền không trả lời.",
          },
        ],
      ),
      game: [
        game(
          "It is our thirtieth anniversary this week.",
          `Congratulations! May I arrange the ${lo(o3)} for you?`,
          `Thirty years is a long time.`,
          `We do not do anything for that.`,
        ),
      ],
    }),

    lesson(lx, 34, 2, "Coordinating Across Teams", "Phối hợp nhiều bộ phận", {
      vocabulary: [
        bw(o5, `The ${lo(o5)} needs three departments to work together.`),
        bw(o6, `I have confirmed the timing of the ${lo(o6)}.`),
        bw(o7, `The ${lo(o7)} will be ready before you return.`),
        bw(o8, `Everyone involved knows about the ${lo(o8)}.`),
      ],
      grammar: [
        g(`Many people help this.`, `The ${lo(o5)} needs three departments to work together.`, "Nói rõ quy mô phối hợp cho thấy sự chuẩn bị nghiêm túc."),
        g(`Before you come back is ready.`, `The ${lo(o7)} will be ready before you return from dinner.`, "Mệnh đề thời gian 'before you return from dinner' cụ thể hoá lời hứa."),
      ],
      speaking: [
        sp("Will it be ready while we are at dinner?", `Yes, madam. The ${lo(o7)} will be ready before you return.`, "Trả lời dứt khoát 'yes' rồi mới nhắc lại mốc thời gian."),
        sp("And nobody will forget?", `Everyone involved knows about the ${lo(o8)}, and I have confirmed the timing myself.`, "Thêm 'myself' để khách biết có một người chịu trách nhiệm cuối cùng."),
      ],
      reading: read(
        `Behind the scenes, ${lx.staff} coordinates: "The ${lo(o5)} needs three departments to work together. I have confirmed the timing of the ${lo(o6)}. Everyone involved knows about the ${lo(o8)}." Nothing is left to chance.`,
        [
          {
            q: "Ai chịu trách nhiệm xác nhận thời gian?",
            options: ["Chính nhân viên tự xác nhận", "Bộ phận bếp", "Khách tự lo"],
            correct: 0,
            explanation: "'I have confirmed … myself' — điều phối nhiều bộ phận cần một người chốt cuối.",
          },
          {
            q: "'Nothing is left to chance' nghĩa là gì?",
            options: ["Không có gì phó mặc may rủi", "Không ai làm gì", "Mọi thứ đều ngẫu nhiên"],
            correct: 0,
            explanation: "Một bất ngờ đẹp là kết quả của chuẩn bị kỹ, không phải của may mắn.",
          },
        ],
      ),
      game: [
        game(
          "There are a lot of moving parts here. Will it really work?",
          `Everyone involved knows about the ${lo(o8)}, sir. I confirmed it myself.`,
          `I hope so, we will see.`,
          `It is not my responsibility.`,
        ),
      ],
    }),

    lesson(lx, 34, 3, "The Words at the Moment", "Lời chúc đúng khoảnh khắc", {
      vocabulary: [
        bw(o9, `On behalf of the whole team, congratulations on the ${lo(o9)}.`),
        bw(o10, `We wish you many more years like the ${lo(o10)}.`),
        bw(o11, `The ${lo(o11)} comes with our warmest wishes.`),
        bw(o12, `It is our honour to be part of the ${lo(o12)}.`),
      ],
      grammar: [
        g(`Happy day to you.`, `On behalf of the whole team, congratulations on the ${lo(o9)}.`, "'On behalf of…' là công thức chúc mừng trang trọng chuẩn ngành."),
        g(`We happy you here.`, `It is our honour to be part of the ${lo(o12)}, madam.`, "'It is our honour to…' — mức trang trọng cao nhất, dành cho khoảnh khắc quan trọng."),
      ],
      speaking: [
        sp("Thank you — this is more than we expected.", `On behalf of the whole team, congratulations on the ${lo(o9)}, sir.`, "Học thuộc câu này. Khoảnh khắc trao lời chúc không có chỗ cho sự ngập ngừng."),
        sp("You have made this evening perfect.", `It is our honour to be part of the ${lo(o12)}. We wish you many more years to come.`, "Lượt hai dùng lời chúc hướng tới tương lai — kết đẹp một khoảnh khắc."),
      ],
      reading: read(
        `At the right moment ${lx.staff} steps forward: "On behalf of the whole team, congratulations on the ${lo(o9)}. It is our honour to be part of the ${lo(o12)}." Then he steps back and leaves the couple alone.`,
        [
          {
            q: "Nhân viên làm gì sau khi chúc mừng?",
            options: ["Lùi lại để khách riêng tư", "Ở lại trò chuyện", "Chụp ảnh cùng khách"],
            correct: 0,
            explanation: "'steps back and leaves the couple alone' — biết lúc nào nên rút lui cũng là một kỹ năng phục vụ.",
          },
          {
            q: "'On behalf of the whole team' nghĩa là gì?",
            options: ["Thay mặt toàn thể đội ngũ", "Chỉ riêng cá nhân tôi", "Theo lệnh của quản lý"],
            correct: 0,
            explanation: "Chúc mừng thay mặt tập thể khiến lời chúc có trọng lượng hơn.",
          },
        ],
      ),
      game: [
        game(
          "We will remember this evening for a very long time.",
          `It is our honour to be part of the ${lo(o12)}, madam.`,
          `Yes, it was quite good.`,
          `Please write a review for us.`,
        ),
      ],
    }),

    lesson(lx, 34, 4, "When the Surprise Goes Wrong", "Khi bất ngờ bị hỏng", {
      vocabulary: [
        bw(o13, `The ${lo(o13)} did not arrive as planned.`),
        bw(o14, `We are replacing the ${lo(o14)} right now.`),
      ],
      grammar: [
        g(`Problem happen, sorry.`, `I am so sorry — the ${lo(o13)} did not arrive as planned.`, "Sự cố trong dịp đặc biệt cần lời xin lỗi mạnh hơn thường lệ: 'I am so sorry'."),
        g(`We do again fast.`, `We are replacing the ${lo(o14)} right now, and it will be ready in ten minutes.`, "Hiện tại tiếp diễn cho việc đang làm + mốc thời gian cho việc sẽ xong."),
      ],
      speaking: [
        sp("This was supposed to be perfect. What happened?", `I am so sorry, madam. The ${lo(o13)} did not arrive as planned, but we are replacing it right now.`, "Thừa nhận ngay, rồi chuyển sang hành động đang diễn ra. Đừng giải thích dài dòng trong khoảnh khắc này."),
      ],
      reading: read(
        `The set-up fails at the worst moment. ${lx.staff} does not hide: "I am so sorry — the ${lo(o13)} did not arrive as planned. We are replacing the ${lo(o14)} right now." Ten minutes later the evening is saved.`,
        [
          {
            q: "Nhân viên xử lý thế nào?",
            options: ["Thừa nhận ngay và sửa lập tức", "Giấu khách", "Đổ lỗi cho bộ phận khác"],
            correct: 0,
            explanation: "'does not hide' — trong dịp đặc biệt, giấu lỗi khiến khách mất niềm tin gấp đôi.",
          },
          {
            q: "Vì sao buổi tối vẫn được cứu?",
            options: ["Vì phản ứng nhanh và trung thực", "Vì khách không để ý", "Vì có quà bù"],
            correct: 0,
            explanation: "Tốc độ sửa lỗi quyết định việc khách nhớ sự cố hay nhớ cách bạn xử lý nó.",
          },
        ],
      ),
      game: [
        game(
          "This is not what we arranged at all.",
          `I am so sorry, sir. We are replacing the ${lo(o14)} right now.`,
          `The kitchen made a mistake, not me.`,
          `It looks fine to me, madam.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 35 — Negotiating
// FRAMES · "What if we {tradeoff} instead?"
//        · "I can {tradeoff} in exchange for a longer stay."
// ============================================================
function week35(lx: Ctx): LessonContent[] {
  const [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14] = lx.bank.tradeoffs;
  return [
    lesson(lx, 35, 1, "What If We…?", "Đề xuất phương án khác", {
      vocabulary: [
        v("Instead", "/ɪnˈsted/", "Thay vào đó", "What if we do this instead?", "🔄"),
        v("Agree", "/əˈɡriː/", "Đồng ý", "I hope we can agree on this.", "🤝"),
        bw(t1, `What if we ${lo(t1)} instead?`),
        bw(t2, `I could ${lo(t2)} if that helps.`),
        bw(t3, `We might be able to ${lo(t3)} for you.`),
        bw(t4, `Would it help if we ${lo(t4)}?`),
      ],
      grammar: [
        g(`No. Other way only.`, `What if we ${lo(t1)} instead, sir?`, "Ngữ pháp trọng tâm tuần 35: 'What if we…?' mở ra thương lượng thay vì đóng cửa."),
        g(`Maybe we can do that thing.`, `We might be able to ${lo(t3)} for you, madam.`, "'Might be able to' giữ khoảng an toàn khi chưa chắc chắn — đừng hứa chắc rồi rút lại."),
      ],
      speaking: [
        sp("Your price is simply too high for us.", `I understand. What if we ${lo(t1)} instead?`, "Khung vàng tuần này. Không hạ giá ngay — đổi cấu trúc đề nghị trước."),
        sp("That is a little better, but still not enough.", `Would it help if we ${lo(t4)} as well?`, "Nhượng bộ từng bước nhỏ, mỗi bước một lần. Nhượng hết một lúc là mất hết dư địa."),
      ],
      reading: read(
        `The client pushes back on price. ${lx.staff} does not simply discount: "What if we ${lo(t1)} instead? We might be able to ${lo(t3)} for you." The value changes shape without the price collapsing.`,
        [
          {
            q: "Nhân viên phản ứng thế nào khi khách chê giá cao?",
            options: ["Đổi cấu trúc đề nghị thay vì giảm giá ngay", "Giảm giá ngay lập tức", "Từ chối thương lượng"],
            correct: 0,
            explanation: "'does not simply discount' — giảm giá là công cụ cuối cùng, không phải phản xạ đầu tiên.",
          },
          {
            q: "'What if we…?' có tác dụng gì?",
            options: ["Mở ra thương lượng", "Kết thúc đàm phán", "Từ chối khách"],
            correct: 0,
            explanation: "Câu hỏi giả định mời đối phương cùng tìm phương án, thay vì buộc họ chấp nhận hoặc bỏ đi.",
          },
        ],
      ),
      game: [
        game(
          "That figure is well above our budget.",
          `I understand. What if we ${lo(t2)} instead, sir?`,
          `Then we cannot help you.`,
          `Fine, I will halve the price.`,
        ),
      ],
    }),

    lesson(lx, 35, 2, "In Exchange For…", "Đổi lại điều kiện", {
      vocabulary: [
        v("In exchange for", "/ɪn ɪksˈtʃeɪndʒ fɔː/", "Đổi lại", "In exchange for a longer stay.", "⚖️"),
        bw(t5, `I can ${lo(t5)} in exchange for a longer stay.`),
        bw(t6, `We will ${lo(t6)} if you can confirm today.`),
        bw(t7, `I am able to ${lo(t7)} for a group of twenty.`),
        bw(t8, `We could ${lo(t8)} provided the dates stay fixed.`),
      ],
      grammar: [
        g(`I give you, you give me.`, `I can ${lo(t5)} in exchange for a longer stay, madam.`, "Nhượng bộ luôn phải có điều kiện đổi lại. Cho không sẽ bị đòi thêm."),
        g(`You confirm today then okay.`, `We will ${lo(t6)} if you can confirm today.`, "Câu điều kiện loại 1 dùng trong đàm phán: điều kiện rõ, lợi ích rõ."),
      ],
      speaking: [
        sp("Can you do better on that rate?", `I can ${lo(t5)} in exchange for a longer stay, sir.`, "Mỗi lần cho đi một thứ, hãy xin lại một thứ. Đó là nguyên tắc đàm phán cơ bản."),
        sp("We could possibly extend by two nights.", `In that case, we could ${lo(t8)} provided the dates stay fixed.`, "Ghi nhận nhượng bộ của đối phương rồi mới đưa nhượng bộ tiếp theo của mình."),
      ],
      reading: read(
        `${lx.staff} never gives without receiving: "I can ${lo(t5)} in exchange for a longer stay. We will ${lo(t6)} if you can confirm today." The client extends by two nights, and both sides gain.`,
        [
          {
            q: "Nguyên tắc đàm phán ở đây là gì?",
            options: ["Cho đi thì phải nhận lại", "Cho đi tất cả để giữ khách", "Không bao giờ nhượng bộ"],
            correct: 0,
            explanation: "'never gives without receiving' — nhượng bộ vô điều kiện làm mất giá trị của chính đề nghị đó.",
          },
          {
            q: "Kết quả cuối cùng thế nào?",
            options: ["Cả hai bên cùng có lợi", "Chỉ khách có lợi", "Không ai có lợi"],
            correct: 0,
            explanation: "'both sides gain' — đàm phán tốt không phải là thắng đối phương.",
          },
        ],
      ),
      game: [
        game(
          "We might be able to book two more nights.",
          `In that case, I can ${lo(t7)} for you, madam.`,
          `That does not change anything.`,
          `Book first, then we talk.`,
        ),
      ],
    }),

    lesson(lx, 35, 3, "However — Holding Your Position", "Giữ lập trường bằng 'however'", {
      vocabulary: [
        v("However", "/haʊˈevə/", "Tuy nhiên", "However, there is one condition.", "↩️"),
        bw(t9, `I would like to ${lo(t9)}; however, I need approval first.`),
        bw(t10, `We can ${lo(t10)}, however the dates cannot change.`),
        bw(t11, `Although the budget is tight, we could ${lo(t11)}.`),
        bw(t12, `We are unable to ${lo(t12)} at this rate.`),
      ],
      grammar: [
        g(`Yes but no, difficult.`, `We can ${lo(t10)}; however, the dates cannot change.`, "'However' nối hai mệnh đề đối lập trang trọng hơn 'but' — đúng văn phong đàm phán."),
        g(`Money small but we try.`, `Although the budget is tight, we could ${lo(t11)}.`, "Mệnh đề nhượng bộ 'Although…' đứng đầu câu — cấu trúc ba mệnh đề của B1.1."),
      ],
      speaking: [
        sp("So can you confirm all of that today?", `We can ${lo(t10)}; however, the dates cannot change, sir.`, "Đồng ý phần lớn nhưng giữ vững một điều kiện cốt lõi. Đó là bản lĩnh đàm phán."),
        sp("That condition is difficult for us.", `Although the budget is tight, we could ${lo(t11)} to help you.`, "Lượt hai đưa nhượng bộ nhỏ để giữ thoả thuận, không phá vỡ điều kiện cốt lõi."),
      ],
      reading: read(
        `${lx.staff} concedes on some points but not all: "We can ${lo(t10)}, however the dates cannot change. Although the budget is tight, we could ${lo(t11)}. We are unable to ${lo(t12)} at this rate." The client respects the clarity.`,
        [
          {
            q: "Nhân viên có nhượng bộ mọi điều kiện không?",
            options: ["Không, giữ lại điều kiện cốt lõi", "Có, nhượng bộ hết", "Không nhượng bộ gì"],
            correct: 0,
            explanation: "'concedes on some points but not all' — nhượng bộ có chọn lọc mới giữ được giá trị thoả thuận.",
          },
          {
            q: "'However' khác 'but' thế nào?",
            options: ["Trang trọng hơn, hợp văn phong đàm phán", "Nghĩa hoàn toàn khác", "Chỉ dùng trong câu hỏi"],
            correct: 0,
            explanation: "'However' thường đứng sau dấu chấm phẩy hoặc đầu câu, tạo nhịp trang trọng.",
          },
        ],
      ),
      game: [
        game(
          "Can you agree to everything we have asked for?",
          `We can ${lo(t10)}; however, the dates cannot change.`,
          `Yes, everything, no problem.`,
          `No to all of it, sorry.`,
        ),
      ],
    }),

    lesson(lx, 35, 4, "Closing the Deal", "Chốt thoả thuận", {
      vocabulary: [
        bw(t13, `Shall we ${lo(t13)} and confirm it in writing?`),
        bw(t14, `Once you agree, I will ${lo(t14)} immediately.`),
      ],
      grammar: [
        g(`Okay finish, we do.`, `Shall we ${lo(t13)} and confirm it in writing, sir?`, "'Shall we…?' mời chốt thoả thuận một cách nhã nhặn, cùng phía với khách."),
        g(`You say yes I do fast.`, `Once you agree, I will ${lo(t14)} immediately.`, "Mệnh đề thời gian 'Once you agree' làm rõ điều gì kích hoạt hành động của bạn."),
      ],
      speaking: [
        sp("I think we have found something workable.", `Excellent. Shall we ${lo(t13)} and confirm it in writing?`, "Chốt ngay khi đối phương tỏ ý đồng thuận. Chần chừ là mất thoả thuận."),
      ],
      reading: read(
        `Agreement is close. ${lx.staff} moves to close: "Shall we ${lo(t13)} and confirm it in writing? Once you agree, I will ${lo(t14)} immediately." The contract is signed the same afternoon.`,
        [
          {
            q: "Nhân viên làm gì khi thấy hai bên gần đồng thuận?",
            options: ["Chủ động đề nghị chốt bằng văn bản", "Chờ khách chủ động", "Đề nghị thêm điều kiện mới"],
            correct: 0,
            explanation: "Thoả thuận miệng không được chốt kịp thường nguội đi và phải đàm phán lại từ đầu.",
          },
          {
            q: "'Shall we…?' tạo cảm giác gì?",
            options: ["Cùng phía, cùng quyết định", "Ép buộc", "Nghi ngờ"],
            correct: 0,
            explanation: "Chủ ngữ 'we' đặt hai bên vào cùng một phía ở khoảnh khắc chốt.",
          },
        ],
      ),
      game: [
        game(
          "Yes, I think that arrangement works for us.",
          `Excellent. Shall we ${lo(t13)} and confirm it in writing?`,
          `Good. I will wait for your call.`,
          `Are you really sure about that?`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 36 — Handling a Crisis
// FRAMES · "There is a {emergency} on the third floor."
//        · "Please stay calm — we are handling the {emergency}."
// ============================================================
function week36(lx: Ctx): LessonContent[] {
  const [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14] = lx.bank.emergencies;
  return [
    lesson(lx, 36, 1, "Reporting It Clearly", "Báo cáo sự cố rõ ràng", {
      vocabulary: [
        v("Immediately", "/ɪˈmiːdiətli/", "Ngay lập tức", "Please come immediately.", "🚨"),
        v("Situation", "/ˌsɪtʃuˈeɪʃn/", "Tình huống", "The situation is under control.", "📍"),
        bw(e1, `There is a ${lo(e1)} on the third floor.`),
        bw(e2, `We have a ${lo(e2)} near the main entrance.`),
        bw(e3, `The ${lo(e3)} started about five minutes ago.`),
        bw(e4, `Nobody has been hurt by the ${lo(e4)}.`),
      ],
      grammar: [
        g(`Problem! Come quick!`, `There is a ${lo(e1)} on the third floor. Please come immediately.`, "Báo sự cố phải có: chuyện gì, ở đâu, cần gì. Kêu 'problem' không giúp ai cả."),
        g(`Long time before start.`, `The ${lo(e3)} started about five minutes ago.`, "Mốc thời gian giúp người ứng cứu đánh giá mức độ nghiêm trọng."),
      ],
      speaking: [
        sp("Control room. What is the situation?", `There is a ${lo(e1)} on the third floor. It started about five minutes ago.`, "Khung vàng tuần này. Ba thông tin trong hai câu ngắn: gì, ở đâu, từ bao giờ."),
        sp("Is anyone injured?", `No. Nobody has been hurt by the ${lo(e4)}.`, "Câu hỏi về người bị thương phải được trả lời trước tiên và dứt khoát."),
      ],
      reading: read(
        `${lx.staff} calls it in without panic: "There is a ${lo(e1)} on the third floor. The ${lo(e3)} started about five minutes ago. Nobody has been hurt by the ${lo(e4)}." The response team knows exactly what to bring.`,
        [
          {
            q: "Vì sao đội ứng cứu biết cần mang gì?",
            options: ["Vì báo cáo nêu rõ sự việc, vị trí, thời điểm", "Vì họ đoán được", "Vì đã có sẵn kế hoạch"],
            correct: 0,
            explanation: "Báo cáo mơ hồ khiến đội ứng cứu đến tay không và mất thêm thời gian quay lại.",
          },
          {
            q: "Thông tin nào phải trả lời trước tiên?",
            options: ["Có ai bị thương không", "Thiệt hại tài sản", "Ai chịu trách nhiệm"],
            correct: 0,
            explanation: "An toàn con người luôn là câu hỏi đầu tiên trong mọi sự cố.",
          },
        ],
      ),
      game: [
        game(
          "Reception, this is security. What exactly is happening?",
          `We have a ${lo(e2)} near the main entrance, and it started five minutes ago.`,
          `Something bad is happening here.`,
          `I am not sure what it is.`,
        ),
      ],
    }),

    lesson(lx, 36, 2, "Calming the Guests", "Trấn an khách", {
      vocabulary: [
        v("Calm", "/kɑːm/", "Bình tĩnh", "Please stay calm, everyone.", "🧘"),
        bw(e5, `Please stay calm — we are handling the ${lo(e5)}.`),
        bw(e6, `The ${lo(e6)} is under control now.`),
        bw(e7, `There is no danger from the ${lo(e7)}.`),
        bw(e8, `Our team is trained for the ${lo(e8)}.`),
      ],
      grammar: [
        g(`Do not worry, no problem.`, `Please stay calm — we are handling the ${lo(e5)}.`, "Trấn an phải kèm thông tin thật. 'No problem' khi rõ ràng đang có vấn đề sẽ phản tác dụng."),
        g(`We know how do this.`, `Our team is trained for the ${lo(e8)}, madam.`, "Nhắc tới việc được huấn luyện giúp khách tin vào năng lực xử lý."),
      ],
      speaking: [
        sp("What is going on? Should we be worried?", `Please stay calm — we are handling the ${lo(e5)}. There is no danger.`, "Khách hoảng thì giọng bạn phải chậm và thấp. Nội dung quan trọng, nhưng giọng quan trọng hơn."),
        sp("Are you sure it is safe to stay here?", `Yes, madam. The ${lo(e6)} is under control, and our team is trained for it.`, "Trả lời 'yes' rõ ràng rồi mới đưa hai lý do. Do dự ở đây sẽ khiến khách hoảng hơn."),
      ],
      reading: read(
        `Guests gather in the lobby, worried. ${lx.staff} speaks slowly and clearly: "Please stay calm — we are handling the ${lo(e5)}. The ${lo(e6)} is under control now. There is no danger from the ${lo(e7)}." The lobby settles.`,
        [
          {
            q: "Nhân viên nói với giọng thế nào?",
            options: ["Chậm và rõ ràng", "Nhanh và lớn", "Thì thầm"],
            correct: 0,
            explanation: "'speaks slowly and clearly' — giọng của nhân viên quyết định nhiệt độ của cả sảnh.",
          },
          {
            q: "Vì sao không nên nói 'no problem'?",
            options: ["Vì rõ ràng đang có vấn đề, nói vậy mất tin cậy", "Vì quá dài", "Vì khách không hiểu"],
            correct: 0,
            explanation: "Phủ nhận điều khách đang nhìn thấy sẽ phá huỷ lòng tin ngay lập tức.",
          },
        ],
      ),
      game: [
        game(
          "Everyone is panicking. Is it safe to stay in the building?",
          `Please stay calm — the ${lo(e6)} is under control now.`,
          `I do not know, maybe run outside.`,
          `There is no problem at all here.`,
        ),
      ],
    }),

    lesson(lx, 36, 3, "Giving Clear Instructions", "Hướng dẫn dứt khoát", {
      vocabulary: [
        bw(e9, `Because of the ${lo(e9)}, please use the stairs.`),
        bw(e10, `Do not return to your room until the ${lo(e10)} is cleared.`),
        bw(e11, `Follow me to the assembly point, away from the ${lo(e11)}.`),
        bw(e12, `Leave your belongings — the ${lo(e12)} comes first.`),
      ],
      grammar: [
        g(`Stairs, go, quick!`, `Because of the ${lo(e9)}, please use the stairs, not the lift.`, "Trong khủng hoảng, mệnh lệnh vẫn cần 'please' và cần nêu lý do ngắn gọn."),
        g(`No come back room.`, `Do not return to your room until the ${lo(e10)} is cleared.`, "Cấm đoán phải kèm điều kiện gỡ bỏ ('until…'), nếu không khách sẽ tự ý quay lại."),
      ],
      speaking: [
        sp("Can I just run up and get my laptop?", `I am sorry, no. Leave your belongings — safety comes first, sir.`, "Từ chối dứt khoát khi liên quan tới an toàn. Đây là lúc duy nhất không thương lượng."),
      ],
      reading: read(
        `${lx.staff} gives instructions that leave no room for doubt: "Because of the ${lo(e9)}, please use the stairs. Do not return to your room until the ${lo(e10)} is cleared. Follow me to the assembly point." Everyone moves together.`,
        [
          {
            q: "Vì sao hướng dẫn nêu cả lý do?",
            options: ["Người ta tuân thủ tốt hơn khi hiểu lý do", "Để câu dài hơn", "Để thể hiện kiến thức"],
            correct: 0,
            explanation: "'Because of…' ngắn gọn giúp khách hợp tác thay vì dừng lại hỏi tại sao.",
          },
          {
            q: "Khi khách muốn quay lại lấy đồ, phải làm gì?",
            options: ["Từ chối dứt khoát vì an toàn là trên hết", "Cho phép nếu nhanh", "Hỏi ý kiến quản lý"],
            correct: 0,
            explanation: "An toàn tính mạng là điều duy nhất trong ngành dịch vụ không bao giờ đem ra thương lượng.",
          },
        ],
      ),
      game: [
        game(
          "I need two minutes to go back for my passport.",
          `I am sorry, no. Leave your belongings — safety comes first.`,
          `Okay, but be very quick.`,
          `Do what you think is best.`,
        ),
      ],
    }),

    lesson(lx, 36, 4, "After It Is Over", "Sau khi sự cố kết thúc", {
      vocabulary: [
        bw(e13, `The ${lo(e13)} has been fully resolved.`),
        bw(e14, `I have written a full report on the ${lo(e14)}.`),
      ],
      grammar: [
        g(`Finish already, all okay.`, `The ${lo(e13)} has been fully resolved, and you may return to your rooms.`, "Thông báo kết thúc sự cố phải rõ ràng và kèm hành động khách được phép làm."),
        g(`I write paper about it.`, `I have written a full report on the ${lo(e14)}.`, "Hiện tại hoàn thành cho việc vừa hoàn tất và còn giá trị hiện tại."),
      ],
      speaking: [
        sp("Is it finally over? Can we go back up?", `Yes, sir. The ${lo(e13)} has been fully resolved, and you may return to your rooms.`, "Câu thông báo kết thúc nên được nói với cùng sự bình tĩnh như lúc bắt đầu."),
      ],
      reading: read(
        `An hour later ${lx.staff} announces: "The ${lo(e13)} has been fully resolved. You may return to your rooms." Afterwards he adds to his colleague: "I have written a full report on the ${lo(e14)}." The next shift starts fully informed.`,
        [
          {
            q: "Nhân viên làm gì sau khi sự cố kết thúc?",
            options: ["Viết báo cáo đầy đủ", "Về nhà ngay", "Không làm gì thêm"],
            correct: 0,
            explanation: "Báo cáo sau sự cố là cách khách sạn học được từ sự việc và bảo vệ chính mình về pháp lý.",
          },
          {
            q: "Vì sao ca sau 'fully informed'?",
            options: ["Vì đã có báo cáo bàn giao", "Vì họ đã ở đó", "Vì khách kể lại"],
            correct: 0,
            explanation: "Sự cố chưa kết thúc khi ngọn lửa tắt — nó kết thúc khi thông tin được bàn giao đầy đủ.",
          },
        ],
      ),
      game: [
        game(
          "Is everything finally back to normal now?",
          `Yes, madam. The ${lo(e13)} has been fully resolved.`,
          `I think so, probably.`,
          `Nobody has told me anything.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 37 — Contract Terms
// FRAMES · "The {term} is valid for twelve months."
//        · "Could we review the {term} together?"
// ============================================================
function week37(lx: Ctx): LessonContent[] {
  const [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14] = lx.bank.terms;
  return [
    lesson(lx, 37, 1, "Reading the Agreement", "Đọc hiểu điều khoản", {
      vocabulary: [
        v("Valid", "/ˈvælɪd/", "Có hiệu lực", "The agreement is valid until December.", "📄"),
        v("Clause", "/klɔːz/", "Điều khoản", "Please read this clause carefully.", "§"),
        bw(c1, `The ${lo(c1)} is valid for twelve months.`),
        bw(c2, `Could we review the ${lo(c2)} together?`),
        bw(c3, `The ${lo(c3)} appears on page two.`),
        bw(c4, `Please read the ${lo(c4)} before signing.`),
      ],
      grammar: [
        g(`One year good this paper.`, `The ${lo(c1)} is valid for twelve months.`, "Nói thời hạn hiệu lực bằng 'is valid for…' — chuẩn văn bản thương mại."),
        g(`We look paper together?`, `Could we review the ${lo(c2)} together, before you sign?`, "'Review … together' đặt hai bên vào thế hợp tác khi đọc hợp đồng."),
      ],
      speaking: [
        sp("Could you walk me through the main points?", `Of course. Could we review the ${lo(c2)} together?`, "Khung vàng tuần này. Cùng đọc hợp đồng là cách xây niềm tin thương mại."),
        sp("Where exactly is that written?", `The ${lo(c3)} appears on page two, sir.`, "Chỉ đúng vị trí trong văn bản — trả lời chung chung khiến đối tác nghi ngờ."),
      ],
      reading: read(
        `Before signing, ${lx.staff} slows the client down: "Could we review the ${lo(c2)} together? The ${lo(c3)} appears on page two. Please read the ${lo(c4)} before signing." No surprises appear later.`,
        [
          {
            q: "Vì sao nhân viên yêu cầu đọc kỹ trước khi ký?",
            options: ["Để tránh tranh chấp về sau", "Để kéo dài thời gian", "Vì luật bắt buộc"],
            correct: 0,
            explanation: "'No surprises appear later' — mười phút đọc kỹ tiết kiệm nhiều tháng tranh chấp.",
          },
          {
            q: "'is valid for twelve months' nghĩa là gì?",
            options: ["Có hiệu lực trong mười hai tháng", "Phải trả trong mười hai tháng", "Hết hạn sau một tháng"],
            correct: 0,
            explanation: "'Valid for + khoảng thời gian' chỉ thời hạn hiệu lực của văn bản.",
          },
        ],
      ),
      game: [
        game(
          "Could you explain the main terms before I sign anything?",
          `Certainly. Could we review the ${lo(c2)} together, madam?`,
          `Just sign, it is standard.`,
          `Read it yourself at home.`,
        ),
      ],
    }),

    lesson(lx, 37, 2, "Rates and Volumes", "Giá và sản lượng", {
      vocabulary: [
        bw(c5, `The ${lo(c5)} depends on your annual volume.`),
        bw(c6, `We review the ${lo(c6)} every six months.`),
        bw(c7, `The ${lo(c7)} applies to all bookings from January.`),
        bw(c8, `A higher ${lo(c8)} unlocks a better rate.`),
      ],
      grammar: [
        g(`More room, less price.`, `The ${lo(c5)} depends on your annual volume.`, "Nói cơ chế giá bằng 'depends on…' — minh bạch, không nghe như mặc cả tuỳ hứng."),
        g(`Six month we talk again.`, `We review the ${lo(c6)} every six months, madam.`, "Nêu chu kỳ rà soát cho đối tác thấy quan hệ là dài hạn, có thể điều chỉnh."),
      ],
      speaking: [
        sp("Why is our rate different from last year?", `The ${lo(c5)} depends on your annual volume, sir.`, "Giải thích cơ chế thay vì bào chữa. Đối tác doanh nghiệp hiểu ngôn ngữ cơ chế."),
        sp("So if we book more, we pay less per room?", `Exactly. A higher ${lo(c8)} unlocks a better rate.`, "Xác nhận ngắn gọn 'Exactly' rồi nhắc lại nguyên tắc — đối tác nhớ được và tự tính toán."),
      ],
      reading: read(
        `The client questions the pricing. ${lx.staff} explains the mechanism: "The ${lo(c5)} depends on your annual volume. A higher ${lo(c8)} unlocks a better rate. We review the ${lo(c6)} every six months." The client plans a larger commitment.`,
        [
          {
            q: "Vì sao đối tác quyết định cam kết lớn hơn?",
            options: ["Vì hiểu rõ cơ chế giá", "Vì bị ép", "Vì được tặng quà"],
            correct: 0,
            explanation: "Minh bạch cơ chế giúp đối tác tự tìm ra phương án có lợi cho cả hai.",
          },
          {
            q: "'depends on' dùng để làm gì?",
            options: ["Nêu yếu tố quyết định", "Từ chối", "Xin lỗi"],
            correct: 0,
            explanation: "Giải thích cơ chế nghe khách quan hơn là bào chữa cho một con số.",
          },
        ],
      ),
      game: [
        game(
          "Why has our rate changed since last year?",
          `The ${lo(c5)} depends on your annual volume, sir.`,
          `Prices always go up.`,
          `I did not decide that.`,
        ),
      ],
    }),

    lesson(lx, 37, 3, "Deadlines and Cancellation", "Thời hạn và huỷ hợp đồng", {
      vocabulary: [
        bw(c9, `The ${lo(c9)} must be respected by both sides.`),
        bw(c10, `If you cancel after the ${lo(c10)}, a charge applies.`),
        bw(c11, `The ${lo(c11)} protects you as well as us.`),
        bw(c12, `We can extend the ${lo(c12)} by one week.`),
      ],
      grammar: [
        g(`You cancel late, you pay.`, `If you cancel after the ${lo(c10)}, a charge applies.`, "Câu điều kiện nêu hậu quả một cách trung tính, không nghe như đe doạ."),
        g(`This rule protect us.`, `The ${lo(c11)} protects you as well as us, sir.`, "Nhấn mạnh điều khoản bảo vệ cả hai bên — cách trình bày khiến đối tác dễ chấp nhận."),
      ],
      speaking: [
        sp("This cancellation clause seems very strict.", `The ${lo(c11)} protects you as well as us, madam.`, "Đừng bào chữa cho điều khoản. Hãy chỉ ra nó bảo vệ đối tác ở điểm nào."),
        sp("We may need a little more time to decide.", `We can extend the ${lo(c12)} by one week, if that helps.`, "Nhượng bộ nhỏ về thời hạn thường cứu được cả thoả thuận."),
      ],
      reading: read(
        `The client objects to a strict clause. ${lx.staff} reframes it: "The ${lo(c11)} protects you as well as us. If you cancel after the ${lo(c10)}, a charge applies — but we can extend the ${lo(c12)} by one week." The objection disappears.`,
        [
          {
            q: "Nhân viên xử lý phản đối thế nào?",
            options: ["Chỉ ra điều khoản cũng bảo vệ đối tác", "Bỏ điều khoản đi", "Nói đó là quy định cứng"],
            correct: 0,
            explanation: "'reframes it' — đổi góc nhìn hiệu quả hơn bảo vệ điều khoản một cách cứng nhắc.",
          },
          {
            q: "Nhượng bộ nào được đưa ra?",
            options: ["Gia hạn thêm một tuần", "Bỏ toàn bộ phí huỷ", "Giảm giá phòng"],
            correct: 0,
            explanation: "Một nhượng bộ nhỏ đúng chỗ có sức nặng hơn một nhượng bộ lớn sai chỗ.",
          },
        ],
      ),
      game: [
        game(
          "Your cancellation terms are far too strict for us.",
          `The ${lo(c11)} protects you as well as us, sir.`,
          `Then do not sign the contract.`,
          `I agree, they are unfair.`,
        ),
      ],
    }),

    lesson(lx, 37, 4, "Signing and Renewal", "Ký kết và gia hạn", {
      vocabulary: [
        bw(c13, `Both parties sign the ${lo(c13)} today.`),
        bw(c14, `The ${lo(c14)} can be discussed next November.`),
      ],
      grammar: [
        g(`You sign here now.`, `Both parties sign the ${lo(c13)} today, and each keeps a copy.`, "'Both parties' là ngôn ngữ hợp đồng chuẩn — hai bên bình đẳng, không ai ban ơn ai."),
        g(`Next year talk again maybe.`, `The ${lo(c14)} can be discussed next November.`, "Hẹn thời điểm gia hạn cụ thể giữ quan hệ tiếp diễn thay vì để hợp đồng lặng lẽ hết hạn."),
      ],
      speaking: [
        sp("And what happens when this agreement ends?", `The ${lo(c14)} can be discussed next November, madam.`, "Nói về gia hạn ngay lúc ký cho thấy bạn nghĩ tới quan hệ dài hạn."),
      ],
      reading: read(
        `At signing ${lx.staff} says: "Both parties sign the ${lo(c13)} today, and each keeps a copy. The ${lo(c14)} can be discussed next November." The relationship is set up to continue.`,
        [
          {
            q: "Vì sao nhắc tới gia hạn ngay lúc ký?",
            options: ["Để quan hệ tiếp diễn, không lặng lẽ hết hạn", "Để ký thêm giấy tờ", "Vì luật yêu cầu"],
            correct: 0,
            explanation: "Nhiều hợp đồng mất đi không phải vì mâu thuẫn mà vì không ai chủ động nhắc gia hạn.",
          },
          {
            q: "'Both parties' nghĩa là gì?",
            options: ["Cả hai bên", "Chỉ bên khách sạn", "Bên thứ ba"],
            correct: 0,
            explanation: "Đây là cách diễn đạt chuẩn trong hợp đồng, thể hiện vị thế bình đẳng.",
          },
        ],
      ),
      game: [
        game(
          "What happens when this contract comes to an end?",
          `The ${lo(c14)} can be discussed next November, sir.`,
          `Then it is finished forever.`,
          `I have not thought about that.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 38 — Presenting a Proposal
// FRAMES · "The {proposal} is included in this offer."
//        · "I have attached the {proposal} for your review."
// ============================================================
function week38(lx: Ctx): LessonContent[] {
  const [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14] = lx.bank.proposal;
  return [
    lesson(lx, 38, 1, "Opening the Pitch", "Mở đầu bài trình bày", {
      vocabulary: [
        v("Propose", "/prəˈpəʊz/", "Đề xuất", "May I propose a solution?", "📊"),
        v("Overview", "/ˈəʊvəvjuː/", "Tổng quan", "Here is a short overview.", "🗒️"),
        bw(r1, `The ${lo(r1)} is included in this offer.`),
        bw(r2, `I have attached the ${lo(r2)} for your review.`),
        bw(r3, `Let me begin with the ${lo(r3)}.`),
        bw(r4, `The ${lo(r4)} answers your main question.`),
      ],
      grammar: [
        g(`I show you paper now.`, `Let me begin with the ${lo(r3)}, and then I will take your questions.`, "Nêu cấu trúc bài trình bày trước khi vào chi tiết — người nghe theo dõi dễ hơn."),
        g(`Paper I send you already.`, `I have attached the ${lo(r2)} for your review, madam.`, "Hiện tại hoàn thành cho việc vừa gửi và đang chờ phản hồi."),
      ],
      speaking: [
        sp("We only have fifteen minutes, I am afraid.", `Understood. Let me begin with the ${lo(r3)}, sir.`, "Khung vàng tuần này. Thời gian ít thì vào thẳng phần quan trọng nhất."),
        sp("Go ahead, we are listening.", `The ${lo(r4)} answers your main question, and the ${lo(r1)} is included in this offer.`, "Trả lời câu hỏi lớn nhất của khách hàng trước, chi tiết để sau."),
      ],
      reading: read(
        `With only fifteen minutes, ${lx.staff} does not waste any: "Let me begin with the ${lo(r3)}. The ${lo(r4)} answers your main question. I have attached the ${lo(r2)} for your review." The client asks to see more.`,
        [
          {
            q: "Khi chỉ có ít thời gian, nên làm gì?",
            options: ["Vào thẳng phần quan trọng nhất", "Giới thiệu dài về khách sạn", "Xin thêm thời gian"],
            correct: 0,
            explanation: "'does not waste any' — mở đầu dài dòng là cách nhanh nhất để mất một cơ hội bán hàng.",
          },
          {
            q: "Vì sao nêu cấu trúc trước khi vào chi tiết?",
            options: ["Người nghe dễ theo dõi hơn", "Cho đủ thời gian", "Để trông chuyên nghiệp"],
            correct: 0,
            explanation: "Biết trước sẽ nghe gì giúp người nghe tập trung vào nội dung thay vì đoán hướng đi.",
          },
        ],
      ),
      game: [
        game(
          "We have a very tight schedule today, unfortunately.",
          `Understood. Let me begin with the ${lo(r3)}, madam.`,
          `This will take about an hour.`,
          `Then we should meet another day.`,
        ),
      ],
    }),

    lesson(lx, 38, 2, "Showing the Numbers", "Trình bày con số", {
      vocabulary: [
        bw(r5, `The ${lo(r5)} shows exactly where the money goes.`),
        bw(r6, `Each item in the ${lo(r6)} can be adjusted.`),
        bw(r7, `The ${lo(r7)} compares three options for you.`),
        bw(r8, `There are no hidden costs in the ${lo(r8)}.`),
      ],
      grammar: [
        g(`Money here, look.`, `The ${lo(r5)} shows exactly where the money goes.`, "Nói về chi phí bằng ngôn ngữ minh bạch — 'exactly where the money goes' xây niềm tin."),
        g(`No secret money.`, `There are no hidden costs in the ${lo(r8)}, sir.`, "Khẳng định không có chi phí ẩn là điều mọi khách hàng doanh nghiệp muốn nghe."),
      ],
      speaking: [
        sp("Are there any extra costs we should know about?", `There are no hidden costs in the ${lo(r8)}, madam.`, "Trả lời dứt khoát về tiền. Do dự ở câu này làm hỏng cả bài trình bày."),
        sp("Some of these items are not necessary for us.", `Each item in the ${lo(r6)} can be adjusted to suit you.`, "Bảng giá linh hoạt giữ được cuộc đàm phán; bảng giá cứng nhắc kết thúc nó."),
      ],
      reading: read(
        `${lx.staff} puts the numbers on the table: "The ${lo(r5)} shows exactly where the money goes. There are no hidden costs in the ${lo(r8)}. Each item in the ${lo(r6)} can be adjusted." The client starts editing rather than refusing.`,
        [
          {
            q: "Vì sao khách hàng bắt đầu chỉnh sửa thay vì từ chối?",
            options: ["Vì bảng giá được nói là có thể điều chỉnh", "Vì giá quá rẻ", "Vì bị thuyết phục"],
            correct: 0,
            explanation: "'starts editing rather than refusing' — cho phép điều chỉnh biến lời từ chối thành cuộc thương lượng.",
          },
          {
            q: "'no hidden costs' quan trọng vì sao?",
            options: ["Xây niềm tin về minh bạch chi phí", "Làm giá rẻ hơn", "Rút ngắn hợp đồng"],
            correct: 0,
            explanation: "Chi phí phát sinh bất ngờ là lý do phổ biến nhất khiến khách hàng doanh nghiệp không quay lại.",
          },
        ],
      ),
      game: [
        game(
          "Will there be any extra charges on top of this?",
          `There are no hidden costs in the ${lo(r8)}, sir.`,
          `Probably some, we will see.`,
          `You will find out at the end.`,
        ),
      ],
    }),

    lesson(lx, 38, 3, "Answering Hard Questions", "Trả lời câu hỏi khó", {
      vocabulary: [
        bw(r9, `That is a fair question about the ${lo(r9)}.`),
        bw(r10, `I do not have that figure, but the ${lo(r10)} is accurate.`),
        bw(r11, `The ${lo(r11)} was prepared by our finance team.`),
        bw(r12, `May I come back to you on the ${lo(r12)} tomorrow?`),
      ],
      grammar: [
        g(`Difficult question, next please.`, `That is a fair question about the ${lo(r9)}, madam.`, "Thừa nhận câu hỏi khó là hay — đối tác thấy được tôn trọng và bạn có thời gian nghĩ."),
        g(`I not know. Sorry.`, `I do not have that figure, but may I come back to you on the ${lo(r12)} tomorrow?`, "Không biết thì nói không biết, kèm cam kết trả lời sau. Đoán bừa là mất hợp đồng."),
      ],
      speaking: [
        sp("How does this compare with your competitor's rate?", `That is a fair question about the ${lo(r9)}, sir.`, "Đừng nói xấu đối thủ. Ghi nhận câu hỏi rồi trả lời bằng giá trị của chính mình."),
        sp("You do not seem to have the exact number.", `I do not have that figure, but may I come back to you on it tomorrow?`, "Trung thực về giới hạn hiểu biết xây niềm tin nhanh hơn một con số bịa ra."),
      ],
      reading: read(
        `Asked something he cannot answer, ${lx.staff} does not bluff: "That is a fair question about the ${lo(r9)}. I do not have that figure, but the ${lo(r10)} is accurate. May I come back to you on the ${lo(r12)} tomorrow?" He calls back the next morning.`,
        [
          {
            q: "Nhân viên làm gì khi không biết câu trả lời?",
            options: ["Thừa nhận và hẹn trả lời sau", "Đoán một con số", "Đổi chủ đề"],
            correct: 0,
            explanation: "'does not bluff' — một con số sai làm hỏng độ tin cậy của toàn bộ bản đề xuất.",
          },
          {
            q: "Khi được hỏi so sánh với đối thủ, nên làm gì?",
            options: ["Ghi nhận câu hỏi, nói về giá trị của mình", "Nói xấu đối thủ", "Từ chối trả lời"],
            correct: 0,
            explanation: "Nói xấu đối thủ khiến khách hàng nghi ngờ chính bạn.",
          },
        ],
      ),
      game: [
        game(
          "How does your offer compare with the hotel across the road?",
          `That is a fair question about the ${lo(r9)}, madam.`,
          `Their service is very poor.`,
          `I cannot discuss that at all.`,
        ),
      ],
    }),

    lesson(lx, 38, 4, "Asking for the Decision", "Đề nghị chốt quyết định", {
      vocabulary: [
        bw(r13, `When could you give us a decision on the ${lo(r13)}?`),
        bw(r14, `I will hold the ${lo(r14)} until Friday.`),
      ],
      grammar: [
        g(`You tell me when you want.`, `When could you give us a decision on the ${lo(r13)}?`, "Hỏi thẳng về mốc quyết định. Bài trình bày không có câu này thường không đi đến đâu."),
        g(`I keep for you some days.`, `I will hold the ${lo(r14)} until Friday, madam.`, "Đặt hạn giữ chỗ tạo lý do để đối tác quyết định sớm, mà không gây áp lực thô."),
      ],
      speaking: [
        sp("We will need to discuss this internally.", `Of course. When could you give us a decision on the ${lo(r13)}?`, "Câu quan trọng nhất của cả bài trình bày. Không hỏi thì đề xuất sẽ nằm im trong hộp thư."),
      ],
      reading: read(
        `${lx.staff} does not end vaguely: "When could you give us a decision on the ${lo(r13)}? I will hold the ${lo(r14)} until Friday." The client replies on Thursday.`,
        [
          {
            q: "Vì sao phải hỏi về mốc quyết định?",
            options: ["Nếu không, đề xuất dễ bị bỏ quên", "Để gây áp lực", "Vì quy trình bắt buộc"],
            correct: 0,
            explanation: "'does not end vaguely' — một bài trình bày hay mà không có bước tiếp theo là công sức bỏ phí.",
          },
          {
            q: "'I will hold … until Friday' có tác dụng gì?",
            options: ["Tạo lý do quyết định sớm mà không thô", "Doạ khách", "Kết thúc quan hệ"],
            correct: 0,
            explanation: "Hạn giữ chỗ là áp lực lịch sự và hợp lý trong bán hàng.",
          },
        ],
      ),
      game: [
        game(
          "We will need to talk about this as a team first.",
          `Of course. When could you give us a decision, sir?`,
          `Please decide right now.`,
          `Take as long as you like.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 39 — Open Role-play
// Recombines the seven functions of weeks 31-38 with no new bank
// vocabulary: the learner improvises inside frames already learned.
// ============================================================
function week39(lx: Ctx): LessonContent[] {
  const s1 = lx.bank.story[0];
  const s2 = lx.bank.story[1];
  const p1 = lx.bank.preferences[0];
  const p2 = lx.bank.preferences[1];
  const d1 = lx.bank.disputes[0];
  const d2 = lx.bank.disputes[1];
  const t1 = lx.bank.tradeoffs[0];
  const t2 = lx.bank.tradeoffs[1];
  const e1 = lx.bank.emergencies[0];
  const e2 = lx.bank.emergencies[1];
  const r1 = lx.bank.proposal[0];
  const r2 = lx.bank.proposal[1];
  const o1 = lx.bank.occasions[0];
  const o2 = lx.bank.occasions[1];
  const c1 = lx.bank.terms[0];
  const c2 = lx.bank.terms[1];
  return [
    lesson(lx, 39, 1, "From Welcome to Upsell", "Từ đón khách tới gợi ý nâng cấp", {
      vocabulary: [
        v("Confident", "/ˈkɒnfɪdənt/", "Tự tin", "I feel confident with guests now.", "💪"),
        v("Improvise", "/ˈɪmprəvaɪz/", "Ứng biến", "Sometimes you must improvise.", "🎭"),
        bw(s1, `Start with the ${lo(s1)}, then listen.`),
        bw(s2, `Some guests prefer the ${lo(s2)} instead.`),
        bw(p1, `Ask about the ${lo(p1)} before you suggest anything.`),
        bw(p2, `Note the ${lo(p2)} while it is still fresh in your mind.`),
      ],
      grammar: [
        g(`I say all my sentences fast.`, `Based on your ${lo(p1)}, I would suggest something quieter, sir.`, "Ứng biến không phải nói nhanh — mà là chọn đúng khung câu cho đúng tình huống."),
        g(`This place nice, you buy?`, `The ${lo(s1)} is what makes this place special, and I can arrange it today.`, "Ghép kể chuyện (tuần 31) với cam kết hành động — hai chức năng trong một lượt nói."),
      ],
      speaking: [
        sp("Good evening. This is our first time here.", `Welcome, madam. The ${lo(s1)} is what makes this place special.`, "Vào vai tự nhiên. Khách chưa hỏi gì thì bạn mở chuyện bằng điều đáng tự hào nhất."),
        sp("That sounds nice. We are quite tired though.", `Of course. Based on your ${lo(p1)}, I would suggest something quieter.`, "Đổi hướng ngay khi khách phát tín hiệu mệt — đó là lắng nghe thật."),
      ],
      reading: read(
        `In the rehearsal, ${lx.staff} plays a full arrival: story first, then a question about the ${lo(p1)}, then one suggestion. His trainer notes: "He listened before he sold." No script was used.`,
        [
          {
            q: "Điều gì được người huấn luyện ghi nhận?",
            options: ["Anh ấy lắng nghe trước khi gợi ý", "Anh ấy nói rất nhanh", "Anh ấy thuộc lòng kịch bản"],
            correct: 0,
            explanation: "'He listened before he sold' — trình tự này phân biệt tư vấn với chào hàng.",
          },
          {
            q: "Ứng biến nghĩa là gì trong ngữ cảnh này?",
            options: ["Chọn đúng khung câu cho đúng tình huống", "Nói không cần suy nghĩ", "Bỏ qua quy trình"],
            correct: 0,
            explanation: "Ứng biến tốt dựa trên các khung câu đã thuộc, không phải trên sự tuỳ hứng.",
          },
        ],
      ),
      game: [
        game(
          "Good evening. We have just arrived and we are exhausted.",
          `Welcome, sir. Based on your ${lo(p1)}, I would suggest something quieter.`,
          `Let me tell you our whole history first.`,
          `You should sleep now then.`,
        ),
      ],
    }),

    lesson(lx, 39, 2, "From Complaint to Settlement", "Từ phàn nàn tới đền bù", {
      vocabulary: [
        bw(d1, `Acknowledge the ${lo(d1)} before anything else.`),
        bw(d2, `Do not minimise the ${lo(d2)}, even if it seems small.`),
        bw(t1, `Only then offer to ${lo(t1)}.`),
        bw(t2, `You could also ${lo(t2)} if that helps.`),
      ],
      grammar: [
        g(`Sorry. Here money. Bye.`, `I am very sorry about the ${lo(d1)}. What if we ${lo(t1)} instead?`, "Thứ tự đúng: thừa nhận trước (tuần 33), đề nghị sau (tuần 35). Đảo lại là mua chuộc."),
        g(`Policy say no more.`, `Our policy allows compensation, however I can ${lo(t1)} in addition.`, "'However' nối giới hạn chính sách với nhượng bộ bổ sung — cấu trúc đàm phán của tuần 35."),
      ],
      speaking: [
        sp("This is the third problem since we arrived.", `I am very sorry about the ${lo(d1)}, sir. Let me put this right.`, "Bài kiểm tra: xin lỗi cụ thể rồi cam kết hành động, tất cả trong một lượt nói."),
        sp("Sorry is not going to fix it, is it?", `You are right. What if we ${lo(t1)} instead?`, "Đồng ý với khách rồi chuyển sang phương án — không phòng thủ."),
      ],
      reading: read(
        `The rehearsal escalates: a complaint becomes a claim. ${lx.staff} moves through it in order — acknowledge the ${lo(d1)}, state what policy allows, then offer to ${lo(t1)}. His trainer stops the exercise and says nothing needs changing.`,
        [
          {
            q: "Thứ tự xử lý đúng là gì?",
            options: ["Thừa nhận → nêu chính sách → đề nghị phương án", "Đề nghị tiền → xin lỗi", "Nêu chính sách → từ chối"],
            correct: 0,
            explanation: "Đề nghị bồi thường trước khi thừa nhận sẽ bị hiểu là mua sự im lặng.",
          },
          {
            q: "Khi khách nói 'xin lỗi không giải quyết được', nên làm gì?",
            options: ["Đồng ý rồi chuyển sang phương án", "Xin lỗi thêm lần nữa", "Giải thích lý do"],
            correct: 0,
            explanation: "Đồng ý với khách tháo bỏ thế đối đầu nhanh hơn mọi lời biện minh.",
          },
        ],
      ),
      game: [
        game(
          "Apologies do not really help us at this point.",
          `You are right. What if we ${lo(t1)} instead, madam?`,
          `I can only say sorry again.`,
          `Then there is nothing more to discuss.`,
        ),
      ],
    }),

    lesson(lx, 39, 3, "Under Pressure", "Dưới áp lực", {
      vocabulary: [
        bw(e1, `Report the ${lo(e1)} before you reassure anyone.`),
        bw(e2, `Never guess the cause of the ${lo(e2)}.`),
        bw(o1, `Even during the ${lo(o1)}, stay calm.`),
        bw(o2, `The ${lo(o2)} can wait a few minutes if needed.`),
      ],
      grammar: [
        g(`Problem everywhere, help!`, `There is a ${lo(e1)} on the third floor. Please come immediately.`, "Dưới áp lực, câu càng phải ngắn và rõ. Đây là khung câu của tuần 36."),
        g(`Guest angry, party broken, I stop.`, `Please stay calm — we are handling it, and the ${lo(o1)} will still go ahead.`, "Xử lý hai việc cùng lúc: trấn an sự cố và giữ lời hứa về dịp đặc biệt."),
      ],
      speaking: [
        sp("There is smoke in the corridor and our guests are panicking!", `There is a ${lo(e1)} on the third floor. Please stay calm and follow me.`, "Bài kiểm tra khó nhất: báo cáo và trấn an trong cùng một hơi thở."),
      ],
      reading: read(
        `The trainer stacks two crises at once. ${lx.staff} reports the ${lo(e1)} first, then reassures the guests, then confirms the ${lo(o1)} will still go ahead. Order under pressure is what the exercise tests.`,
        [
          {
            q: "Bài tập này kiểm tra điều gì?",
            options: ["Giữ được trình tự khi chịu áp lực", "Nói to hơn", "Làm nhanh hơn"],
            correct: 0,
            explanation: "'Order under pressure' — dưới áp lực, người ta mất trình tự trước khi mất từ vựng.",
          },
          {
            q: "Việc nào làm trước?",
            options: ["Báo cáo sự cố", "Trấn an khách", "Xin lỗi"],
            correct: 0,
            explanation: "Báo cáo trước để đội ứng cứu bắt đầu di chuyển trong lúc bạn trấn an khách.",
          },
        ],
      ),
      game: [
        game(
          "There is smoke in the corridor and everyone is shouting!",
          `There is a ${lo(e1)} on the third floor. Please follow me now.`,
          `Do not worry, it is nothing at all.`,
          `Let me find someone who knows.`,
        ),
      ],
    }),

    lesson(lx, 39, 4, "The Commercial Conversation", "Cuộc trò chuyện thương mại", {
      vocabulary: [
        bw(r1, `Open with the ${lo(r1)}, not with small talk.`),
        bw(r2, `Keep the ${lo(r2)} for the questions at the end.`),
        bw(c1, `Be ready to explain the ${lo(c1)}.`),
        bw(c2, `Do not skip past the ${lo(c2)}.`),
      ],
      grammar: [
        g(`We talk weather first, then business.`, `Let me begin with the ${lo(r1)}, and then I will take your questions.`, "Với khách hàng doanh nghiệp, tôn trọng thời gian là hình thức lịch sự cao nhất."),
        g(`Contract thing difficult, later.`, `The ${lo(c1)} is valid for twelve months; however, we review it every six months.`, "Ghép điều khoản hợp đồng (tuần 37) với 'however' của đàm phán (tuần 35)."),
      ],
      speaking: [
        sp("We have fifteen minutes. What have you got for us?", `Let me begin with the ${lo(r1)}, sir.`, "Bài kiểm tra cuối: vào thẳng vấn đề, không mở đầu xã giao."),
      ],
      reading: read(
        `The final rehearsal is commercial. ${lx.staff} opens with the ${lo(r1)}, explains the ${lo(c1)}, answers two hard questions and asks for a decision date. The trainer signs him off as ready.`,
        [
          {
            q: "Bài trình bày kết thúc bằng gì?",
            options: ["Hỏi mốc quyết định", "Lời cảm ơn dài", "Câu chuyện về khách sạn"],
            correct: 0,
            explanation: "Hỏi mốc quyết định là bước biến một bài trình bày thành một cơ hội thật.",
          },
          {
            q: "Vì sao không mở đầu bằng xã giao?",
            options: ["Vì tôn trọng thời gian của khách hàng", "Vì không biết nói gì", "Vì quy định cấm"],
            correct: 0,
            explanation: "Với khách hàng doanh nghiệp, đi thẳng vào việc chính là biểu hiện của sự chuyên nghiệp.",
          },
        ],
      ),
      game: [
        game(
          "We have fifteen minutes before our next meeting.",
          `Understood. Let me begin with the ${lo(r1)}, madam.`,
          `First, let me tell you about our history.`,
          `Fifteen minutes is not enough time.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 40 — Final Assessment
// Closes the forty-week programme. Carries the course-wide weektest.
// ============================================================
function week40(lx: Ctx): LessonContent[] {
  const [w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14] = lx.bank.wrapUp;
  return [
    lesson(lx, 40, 1, "Everything You Can Now Do", "Những gì bạn đã làm được", {
      vocabulary: [
        v("Achieve", "/əˈtʃiːv/", "Đạt được", "You have achieved a great deal.", "🏆"),
        v("Progress", "/ˈprəʊɡres/", "Sự tiến bộ", "Your progress is clear.", "📈"),
        bw(w1, `I can handle the ${lo(w1)} on my own now.`),
        bw(w2, `The ${lo(w2)} no longer worries me.`),
        bw(w3, `I know who to call about the ${lo(w3)}.`),
        bw(w4, `I can explain the ${lo(w4)} to any guest.`),
      ],
      grammar: [
        g(`Before I scared, now okay.`, `I used to feel nervous, but I can handle the ${lo(w1)} on my own now.`, "'Used to' cho thói quen trong quá khứ, đối lập với hiện tại — cách nói về tiến bộ."),
        g(`I know call people.`, `I know who to call about the ${lo(w3)}, madam.`, "'Know who to call' — cấu trúc mệnh đề rút gọn, gọn gàng và tự nhiên."),
      ],
      speaking: [
        sp("How do you feel about your English at work now?", `I used to feel nervous, but I can handle the ${lo(w1)} on my own now.`, "Câu tự đánh giá của cả khoá học. Nói về tiến bộ bằng bằng chứng cụ thể, không bằng cảm tính."),
        sp("Give me one example of that.", `I can explain the ${lo(w4)} to any guest, and I know who to call about the ${lo(w3)}.`, "Lượt hai đưa ví dụ cụ thể — đây là điều nhà tuyển dụng và quản lý muốn nghe."),
      ],
      reading: read(
        `At the final review ${lx.staff} says: "I used to feel nervous, but I can handle the ${lo(w1)} on my own now. The ${lo(w2)} no longer worries me. I can explain the ${lo(w4)} to any guest." His supervisor agrees with every point.`,
        [
          {
            q: "Nhân viên nói về tiến bộ bằng cách nào?",
            options: ["Nêu việc cụ thể mình làm được", "Nói mình giỏi hơn", "So sánh với đồng nghiệp"],
            correct: 0,
            explanation: "Ví dụ cụ thể thuyết phục hơn mọi lời tự nhận xét chung chung.",
          },
          {
            q: "'I used to feel nervous' nghĩa là gì?",
            options: ["Trước đây tôi từng lo lắng", "Bây giờ tôi lo lắng", "Tôi sẽ lo lắng"],
            correct: 0,
            explanation: "'Used to + V' chỉ trạng thái trong quá khứ nay không còn nữa.",
          },
        ],
      ),
      game: [
        game(
          "Do you feel your English has improved this year?",
          `Yes. I used to feel nervous, but I can handle the ${lo(w1)} on my own now.`,
          `Maybe a little bit, I think.`,
          `My English was always fine.`,
        ),
      ],
    }),

    lesson(lx, 40, 2, "The Hardest Situations", "Những tình huống khó nhất", {
      vocabulary: [
        bw(w5, `Even the ${lo(w5)} can be handled calmly.`),
        bw(w6, `The ${lo(w6)} taught me the most.`),
        bw(w7, `I still prepare carefully for the ${lo(w7)}.`),
        bw(w8, `Nothing about the ${lo(w8)} surprises me now.`),
      ],
      grammar: [
        g(`Hard thing I can do also.`, `Even the ${lo(w5)} can be handled calmly, sir.`, "'Even…' nhấn mạnh cả tình huống khó nhất cũng nằm trong khả năng."),
        g(`I learn much from that.`, `The ${lo(w6)} taught me the most during this year.`, "Câu có tân ngữ kép 'taught me the most' — cách nói về bài học rút ra."),
      ],
      speaking: [
        sp("Which situation was the most difficult for you?", `The ${lo(w6)} taught me the most, madam.`, "Nói về khó khăn như bài học, không như lời than phiền."),
        sp("And would you handle it differently today?", `Yes. Even the ${lo(w5)} can be handled calmly now.`, "Trả lời cho thấy sự trưởng thành nghề nghiệp, không chỉ tiến bộ ngôn ngữ."),
      ],
      reading: read(
        `Asked about difficulty, ${lx.staff} does not complain: "The ${lo(w6)} taught me the most. Even the ${lo(w5)} can be handled calmly. I still prepare carefully for the ${lo(w7)}." He is honest about what still takes effort.`,
        [
          {
            q: "Nhân viên nói về khó khăn theo cách nào?",
            options: ["Như bài học rút ra được", "Như lời than phiền", "Như lỗi của người khác"],
            correct: 0,
            explanation: "'does not complain' — cách nói về khó khăn phản ánh mức độ trưởng thành nghề nghiệp.",
          },
          {
            q: "Anh ấy có nói mình đã hoàn hảo không?",
            options: ["Không, vẫn có việc cần chuẩn bị kỹ", "Có, mọi thứ đều dễ", "Không nhắc tới"],
            correct: 0,
            explanation: "'still prepare carefully' — trung thực về giới hạn là dấu hiệu của người thật sự giỏi nghề.",
          },
        ],
      ),
      game: [
        game(
          "Which part of the job did you find most difficult?",
          `The ${lo(w6)} taught me the most, sir.`,
          `Nothing was difficult for me.`,
          `Everything was too difficult.`,
        ),
      ],
    }),

    lesson(lx, 40, 3, "Helping the Next Person", "Truyền lại cho người sau", {
      vocabulary: [
        bw(w9, `I can show a new colleague the ${lo(w9)}.`),
        bw(w10, `The ${lo(w10)} is the first thing I would teach.`),
        bw(w11, `I always explain the ${lo(w11)} slowly at first.`),
        bw(w12, `Understanding the ${lo(w12)} takes practice.`),
      ],
      grammar: [
        g(`New people I teach them.`, `I can show a new colleague the ${lo(w9)}, if you like.`, "Đề nghị hướng dẫn người mới bằng câu điều kiện lịch sự — bước đầu của vai trò quản lý."),
        g(`Slow I say for them.`, `I always explain the ${lo(w11)} slowly at first.`, "Trạng từ tần suất 'always' đứng trước động từ thường."),
      ],
      speaking: [
        sp("Would you be willing to train the new staff?", `Yes, of course. I can show a new colleague the ${lo(w9)}.`, "Nhận lời hướng dẫn người mới là bước chuyển từ nhân viên sang người dẫn dắt."),
      ],
      reading: read(
        `${lx.staff} is asked to mentor: "I can show a new colleague the ${lo(w9)}. The ${lo(w10)} is the first thing I would teach. Understanding the ${lo(w12)} takes practice." A year ago he was the new colleague.`,
        [
          {
            q: "Một năm trước nhân viên này là ai?",
            options: ["Chính là người mới cần được hướng dẫn", "Quản lý bộ phận", "Khách của khách sạn"],
            correct: 0,
            explanation: "'A year ago he was the new colleague' — vòng học nghề khép lại khi bạn dạy được người khác.",
          },
          {
            q: "Anh ấy sẽ dạy điều gì đầu tiên?",
            options: [w10.definition, w9.definition, w12.definition],
            correct: 0,
            explanation: `"The ${lo(w10)} is the first thing I would teach."`,
          },
        ],
      ),
      game: [
        game(
          "Could you help train someone who starts next week?",
          `Yes, of course. I can show them the ${lo(w9)}, madam.`,
          `I am too busy for that.`,
          `Let someone else do it.`,
        ),
      ],
    }),

    lesson(lx, 40, 4, "Forty Weeks Complete", "Hoàn thành bốn mươi tuần", {
      vocabulary: [
        bw(w13, `The ${lo(w13)} is part of my daily work now.`),
        bw(w14, `I am ready for the ${lo(w14)}.`),
      ],
      grammar: [
        g(`I finish study, good.`, `The ${lo(w13)} is part of my daily work now, and I am ready for the ${lo(w14)}.`, "Câu tổng kết ghép hai mệnh đề: hiện tại đã thành thạo, tương lai đã sẵn sàng."),
        g(`Maybe I ready.`, `I am ready for the ${lo(w14)}, sir.`, "Nói về năng lực của mình một cách dứt khoát, không rào đón — đây là câu cuối của khoá học."),
      ],
      speaking: [
        sp("You have finished the whole programme. How do you feel?", `The ${lo(w13)} is part of my daily work now, and I am ready for the ${lo(w14)}.`, "Câu cuối cùng của bốn mươi tuần. Nói chậm, rõ, và tự tin."),
      ],
      reading: read(
        `On the last day ${lx.staff} looks back over forty weeks: from spelling his own name in week one to negotiating a contract in week thirty-seven. "The ${lo(w13)} is part of my daily work now. I am ready for the ${lo(w14)}."`,
        [
          {
            q: "Tuần đầu tiên nhân viên học gì?",
            options: ["Đánh vần tên của chính mình", "Đàm phán hợp đồng", "Xử lý khủng hoảng"],
            correct: 0,
            explanation: "'from spelling his own name in week one' — hành trình bắt đầu từ những điều cơ bản nhất.",
          },
          {
            q: "Câu kết cho thấy điều gì?",
            options: ["Sẵn sàng cho bước tiếp theo trong nghề", "Muốn nghỉ việc", "Muốn học lại từ đầu"],
            correct: 0,
            explanation: "Kết thúc khoá học không phải là đích đến mà là điểm khởi đầu của giai đoạn nghề nghiệp mới.",
          },
        ],
      ),
      game: [
        game(
          "After forty weeks, are you ready for more responsibility?",
          `Yes. I am ready for the ${lo(w14)}, madam.`,
          `I need to study forty more weeks.`,
          `Responsibility is not for me.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// Assembly
// ============================================================

const WEEK_META: Record<number, { en: string; vi: string; build: (lx: Ctx) => LessonContent[] }> = {
  31: { en: "Telling the Story", vi: "Kể chuyện sản phẩm & dịch vụ", build: week31 },
  32: { en: "Personalised Advice", vi: "Tư vấn cá nhân hoá", build: week32 },
  33: { en: "Disputes & Compensation", vi: "Tranh chấp & bồi thường", build: week33 },
  34: { en: "Special Occasions", vi: "Sự kiện & dịp đặc biệt", build: week34 },
  35: { en: "Negotiating", vi: "Đàm phán", build: week35 },
  36: { en: "Handling a Crisis", vi: "Xử lý khủng hoảng", build: week36 },
  37: { en: "Contract Terms", vi: "Điều khoản hợp đồng", build: week37 },
  38: { en: "Presenting a Proposal", vi: "Trình bày đề xuất", build: week38 },
  39: { en: "Open Role-play", vi: "Tổng duyệt role-play", build: week39 },
  40: { en: "Final Assessment", vi: "Đánh giá cuối khoá", build: week40 },
};

/** Headwords a department ACTUALLY meets in a week. Five slots in this
 *  range are served by hand-authored payloads instead of the spine, so
 *  recycling must read those, or it schedules words never taught. */
function headwordsOf(lx: Ctx, week: number, overrides: Record<string, WeekContent>): string[] {
  const override = overrides[`${lx.code}-${week}`];
  const lessons = override ? override.lessons : WEEK_META[week].build(lx);
  return lessons.flatMap((l) => l.vocabulary.map((item) => item.word));
}

/**
 * Same expanding-interval scheme as Phase 3, one level deeper: the long
 * pool is now everything the department met in Phases 0-3, walked across
 * weeks 31-39 so nothing earlier is left unretrieved. Week 40 sweeps
 * Phase 4 itself.
 *
 * Phase 4 requires 40% of a week's vocabulary in review (the matrix
 * quota), the highest of any phase — so each slice is wider again.
 */
function reviewWordsFor(
  lx: Ctx,
  week: number,
  priorWords: string[],
  overrides: Record<string, WeekContent>,
): string[] {
  if (week === 40) {
    const all: string[] = [];
    for (let w = 31; w <= 39; w++) all.push(...headwordsOf(lx, w, overrides));
    return Array.from(new Set(all));
  }

  const out: string[] = [];

  const oneBack = week - 1;
  if (oneBack >= 31) out.push(...headwordsOf(lx, oneBack, overrides).slice(0, 6));

  const threeBack = week - 3;
  if (threeBack >= 31) out.push(...headwordsOf(lx, threeBack, overrides).slice(0, 5));

  const slots = 9; // weeks 31..39
  const size = Math.ceil(priorWords.length / slots);
  const start = (week - 31) * size;
  out.push(...priorWords.slice(start, start + size));

  return Array.from(new Set(out));
}

function buildWeek(
  lx: Ctx,
  week: number,
  priorWords: string[],
  overrides: Record<string, WeekContent>,
): WeekContent {
  const meta = WEEK_META[week];
  return {
    departmentId: lx.code,
    weekNumber: week,
    weekTitleEn: meta.en,
    weekTitleVi: meta.vi,
    lessons: meta.build(lx),
    reviewWords: reviewWordsFor(lx, week, priorWords, overrides),
  };
}

/**
 * Phase 4 weeks (6 departments × weeks 31-40). Five of these keys are
 * overridden downstream by the hand-authored FB-31, HK-33, GR-34, BO-37
 * and BO-38 payloads — see the note at the top of this file.
 */
export function buildPhase4(
  priorWordsByDep: Record<string, string[]>,
  /** The hand-authored weeks that replace spine slots in this range. */
  overrides: Record<string, WeekContent> = {},
): Record<string, WeekContent> {
  const out: Record<string, WeekContent> = {};
  for (const [code, base] of Object.entries(LEXICONS)) {
    const lx: Ctx = { ...base, bank: P4_BANKS[code] };
    const prior = priorWordsByDep[code] ?? [];
    for (let w = 31; w <= 40; w++) out[`${code}-${w}`] = buildWeek(lx, w, prior, overrides);
  }
  return out;
}
