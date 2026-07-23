// ============================================================
// PHASE 3 — A2+ (weeks 23-30) · docs/curriculum-level-matrix.md
//
// Phase 2 taught the department to RUN a procedure. Phase 3 teaches it
// to act on its own initiative: recommend something better, explain why
// a charge exists, promise a time and hold to it, pull in another team,
// take a complaint on the chin, offer a conditional remedy, and hand the
// shift over cleanly.
//
// What changes from A2.1 to A2+, pedagogically:
//  · Sentence cap rises 12 -> 16 words; two clauses stay the ceiling.
//  · Speaking becomes a 3-turn exchange — the guest pushes back once,
//    and the learner has to hold the frame through the second turn.
//  · The first conditional arrives in week 28: the learner can finally
//    make an offer contingent on the guest's preference, which is the
//    whole of service recovery in one structure.
//  · Past continuous arrives in week 29 for shift handover ("I was
//    checking X when Y happened") — how incidents are actually reported.
//
// THREE SLOTS ARE NOT GENERATED HERE. SW-23, FO-26 and GR-27 are
// hand-authored weeks already sitting in this range. week-content.ts
// spreads them AFTER this builder so they win; the spine output for
// those keys is discarded, and reviewWordsFor() reads through the same
// overrides so recycling never schedules a word the spine taught but the
// learner never saw.
// ============================================================

import type { LessonContent, WeekContent } from "./week-content";
import { LEXICONS, game, g, read, sp, v, type P0Lexicon } from "./phase0";
import { P3_BANKS, type P3Bank, type P3Word } from "./phase3-lexicon";

type Ctx = P0Lexicon & { bank: P3Bank };

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

function bw(w: P3Word, context: string) {
  return v(w.word, w.phonetic, w.definition, context, w.icon);
}
/** Bank words sit mid-sentence far more often than they start one. */
const lo = (w: P3Word) => w.word.toLowerCase();

// ============================================================
// WEEK 23 — Recommending an Upgrade
// FRAMES · "I recommend the {upgrade}."
//        · "The {upgrade} is quieter than the standard one."
//        · "Would you like the {upgrade} instead?"
// ============================================================
function week23(lx: Ctx): LessonContent[] {
  const [u1, u2, u3, u4, u5, u6, u7, u8, u9, u10, u11, u12] = lx.bank.upgrades;
  return [
    lesson(lx, 23, 1, "I Recommend…", "Đưa ra gợi ý cho khách", {
      vocabulary: [
        v("Recommend", "/ˌrekəˈmend/", "Gợi ý, giới thiệu", "I recommend the quiet table.", "👍"),
        v("Instead", "/ɪnˈsted/", "Thay vào đó", "Would you like this one instead?", "🔄"),
        bw(u1, `I recommend the ${lo(u1)} for you.`),
        bw(u2, `The ${lo(u2)} is very popular this month.`),
        bw(u3, `Many guests choose the ${lo(u3)}.`),
      ],
      grammar: [
        g(`You take this one.`, `I recommend the ${lo(u1)}, sir.`, "Không ra lệnh cho khách. 'I recommend…' đưa ra gợi ý mà khách vẫn được quyền chọn."),
        g(`This one good, you want?`, `Would you like the ${lo(u2)} instead?`, "Câu mời chuẩn là 'Would you like…?'. 'Instead' đứng cuối câu khi đề xuất phương án thay thế."),
      ],
      speaking: [
        sp("What would you suggest for us?", `I recommend the ${lo(u1)}, madam.`, "Khung vàng tuần này. Thay bất kỳ lựa chọn nâng cấp nào của bộ phận bạn vào."),
        sp("Is that better than the normal one?", `Yes. Many guests choose the ${lo(u3)}.`, "Khách hỏi lại là dấu hiệu tốt — đưa bằng chứng xã hội, đừng chỉ nói 'yes'."),
      ],
      reading: read(
        `Mr. Okafor asks for advice. ${lx.staff} answers: "I recommend the ${lo(u1)}, sir. The ${lo(u2)} is very popular this month." Mr. Okafor thinks about it and asks the price.`,
        [
          {
            q: "Nhân viên gợi ý gì đầu tiên?",
            options: [u1.definition, u2.definition, u3.definition],
            correct: 0,
            explanation: `"I recommend the ${lo(u1)}" — đây là gợi ý đầu tiên.`,
          },
          {
            q: "Vì sao nhân viên nhắc 'very popular this month'?",
            options: ["Để khách yên tâm vì nhiều người đã chọn", "Để khách trả thêm tiền", "Để khách đi chỗ khác"],
            correct: 0,
            explanation: "Nhắc mức độ phổ biến là cách trấn an nhẹ nhàng, giúp khách tự tin khi quyết định.",
          },
        ],
      ),
      game: [
        game(
          "If you were me, which one would you choose?",
          `I recommend the ${lo(u3)}, madam.`,
          `You must take the ${lo(u3)}.`,
          `${u3.word} is the one.`,
        ),
      ],
    }),

    lesson(lx, 23, 2, "Comparing Two Options", "So sánh hai lựa chọn", {
      vocabulary: [
        v("Quieter", "/ˈkwaɪətə/", "Yên tĩnh hơn", "The corner room is quieter.", "🤫"),
        bw(u4, `The ${lo(u4)} is larger than the standard one.`),
        bw(u5, `The ${lo(u5)} costs a little more.`),
        bw(u6, `Our guests enjoy the ${lo(u6)}.`),
      ],
      grammar: [
        g(`This more good than that.`, `The ${lo(u4)} is better than the standard one.`, "So sánh hơn dùng 'better than', không dùng 'more good'. Đây là ngữ pháp mới của tuần."),
        g(`Price more but nice.`, `The ${lo(u5)} costs a little more, but it is worth it.`, "Câu hai mệnh đề nối bằng 'but'. 'A little more' làm mức giá nghe nhẹ đi."),
      ],
      speaking: [
        sp("What is the difference between them?", `The ${lo(u4)} is larger than the standard one.`, "So sánh một điểm khác biệt rõ ràng, đừng liệt kê năm điểm cùng lúc."),
        sp("Hmm, is it much more expensive?", `It costs a little more, but our guests really enjoy it.`, "Khách lo về giá — thừa nhận rồi chuyển ngay sang giá trị nhận được."),
      ],
      reading: read(
        `Mrs. Petrova is choosing between two options. ${lx.staff} explains: "The ${lo(u4)} is larger than the standard one. The ${lo(u5)} costs a little more, but our guests really enjoy the ${lo(u6)}."`,
        [
          {
            q: "Điểm khác biệt được nêu ra là gì?",
            options: ["Rộng hơn loại tiêu chuẩn", "Rẻ hơn loại tiêu chuẩn", "Gần thang máy hơn"],
            correct: 0,
            explanation: `"is larger than the standard one" — rộng hơn.`,
          },
          {
            q: "Nhân viên xử lý vấn đề giá cả thế nào?",
            options: ["Thừa nhận đắt hơn chút rồi nói về giá trị", "Nói là không đắt", "Không nhắc tới giá"],
            correct: 0,
            explanation: "'costs a little more, but…' — thừa nhận trước, sau đó nêu lợi ích. Đây là cách nói thuyết phục mà vẫn trung thực.",
          },
        ],
      ),
      game: [
        game(
          "That sounds quite expensive for just one night.",
          `It costs a little more, but it is much quieter.`,
          `Yes, it is expensive.`,
          `Money is not a problem here.`,
        ),
      ],
    }),

    lesson(lx, 23, 3, "Reading the Guest", "Đọc nhu cầu của khách", {
      vocabulary: [
        bw(u7, `The ${lo(u7)} suits a family very well.`),
        bw(u8, `For a long stay, I suggest the ${lo(u8)}.`),
        bw(u9, `The ${lo(u9)} is our quietest choice.`),
      ],
      grammar: [
        g(`Family? Take this.`, `For a family, I recommend the ${lo(u7)}.`, "Mở đầu bằng 'For a family,' cho thấy bạn gợi ý theo đúng nhu cầu của khách."),
        g(`You stay long, this better.`, `For a long stay, the ${lo(u8)} is more comfortable.`, "Gợi ý phải gắn với hoàn cảnh của khách thì mới thuyết phục."),
      ],
      speaking: [
        sp("We are travelling with two children.", `For a family, I recommend the ${lo(u7)}.`, "Nghe ra hoàn cảnh rồi mới gợi ý — đó là khác biệt giữa bán hàng và phục vụ."),
      ],
      reading: read(
        `A family of four arrives. ${lx.staff} listens first, then says: "For a family, I recommend the ${lo(u7)}. For a long stay, the ${lo(u8)} is more comfortable." The family chooses the ${lo(u7)}.`,
        [
          {
            q: "Nhân viên làm gì trước khi gợi ý?",
            options: ["Lắng nghe hoàn cảnh của khách", "Đọc bảng giá", "Gọi quản lý"],
            correct: 0,
            explanation: "'listens first' — nghe trước, gợi ý sau. Gợi ý không gắn với nhu cầu thì chỉ là chào hàng.",
          },
          {
            q: "Gia đình cuối cùng chọn gì?",
            options: [u7.definition, u8.definition, u9.definition],
            correct: 0,
            explanation: `"The family chooses the ${lo(u7)}."`,
          },
        ],
      ),
      game: [
        game(
          "We will be staying here for two weeks.",
          `For a long stay, I recommend the ${lo(u8)}.`,
          `Two weeks is a very long time.`,
          `We have many things here.`,
        ),
      ],
    }),

    lesson(lx, 23, 4, "When the Guest Says No", "Khi khách từ chối", {
      vocabulary: [
        bw(u10, `The ${lo(u10)} is also available today.`),
        bw(u11, `We can keep the ${lo(u11)} for next time.`),
        bw(u12, `The ${lo(u12)} is ready whenever you wish.`),
      ],
      grammar: [
        g(`No? Okay bye.`, `Of course, madam. The standard one is also excellent.`, "Khách từ chối vẫn phải được phục vụ tử tế. Không bao giờ để khách thấy mình vừa làm bạn thất vọng."),
        g(`Maybe you want next time.`, `We can keep the ${lo(u11)} for your next visit.`, "Gợi ý cho lần sau là cách giữ quan hệ mà không gây áp lực."),
      ],
      speaking: [
        sp("No thank you, the standard one is fine.", `Of course, sir. The standard one is also excellent.`, "Đây là câu quan trọng nhất tuần: từ chối phải được đón nhận nhẹ nhàng, không kèm nét mặt tiếc nuối."),
      ],
      reading: read(
        `Ms. Lindqvist declines the upgrade. ${lx.staff} smiles: "Of course, madam. The standard one is also excellent. We can keep the ${lo(u11)} for your next visit." She thanks him warmly.`,
        [
          {
            q: "Nhân viên phản ứng thế nào khi khách từ chối?",
            options: ["Vui vẻ chấp nhận và khen lựa chọn của khách", "Thuyết phục thêm lần nữa", "Im lặng bỏ đi"],
            correct: 0,
            explanation: "'Of course… is also excellent' — chấp nhận và khẳng định lựa chọn của khách là đúng đắn.",
          },
          {
            q: "Vì sao khách cảm ơn nồng nhiệt?",
            options: ["Vì không bị ép mua", "Vì được giảm giá", "Vì được nâng hạng miễn phí"],
            correct: 0,
            explanation: "Không bị ép là một trải nghiệm dịch vụ tốt. Ép khách được một lần thì mất khách nhiều lần.",
          },
        ],
      ),
      game: [
        game(
          "Thank you, but we will keep the standard one.",
          `Of course, sir. The standard one is also excellent.`,
          `Are you sure? It is really better.`,
          `Okay. Next guest, please.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 24 — Explaining Policy & Charges
// FRAMES · "There is a {policy} for that."
//        · "We have to apply the {policy} because it is hotel policy."
// ============================================================
function week24(lx: Ctx): LessonContent[] {
  const [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12] = lx.bank.policies;
  return [
    lesson(lx, 24, 1, "There Is a Charge", "Thông báo có khoản phí", {
      vocabulary: [
        v("Charge", "/tʃɑːdʒ/", "Khoản phí", "There is a small charge for that.", "💳"),
        v("Policy", "/ˈpɒləsi/", "Chính sách, quy định", "It is our hotel policy.", "📜"),
        bw(p1, `There is a ${lo(p1)} for that service.`),
        bw(p2, `The ${lo(p2)} appears on your final bill.`),
        bw(p3, `We explain the ${lo(p3)} before you confirm.`),
      ],
      grammar: [
        g(`You pay more money.`, `There is a small ${lo(p1)} for that, sir.`, "Nói phí bằng cấu trúc 'There is a…' nghe khách quan; 'you pay' nghe như đòi tiền."),
        g(`This is rule, no choice.`, `It is our hotel ${lo(p3).includes("policy") ? lo(p3) : "policy"}, madam.`, "Quy định thuộc về khách sạn, không phải ý muốn cá nhân bạn — nói 'our hotel policy' để không cá nhân hoá."),
      ],
      speaking: [
        sp("Is this service free of charge?", `There is a small ${lo(p1)} for that, sir.`, "Khung vàng tuần này. Nói phí sớm và rõ — khách ghét bất ngờ ở hoá đơn hơn là ghét phí."),
        sp("Nobody told me about that before.", `I am sorry. We explain the ${lo(p3)} before you confirm.`, "Xin lỗi trước, giải thích quy trình sau. Đừng phản bác khách ngay."),
      ],
      reading: read(
        `Mr. Haddad is surprised by an extra line on his bill. ${lx.staff} explains calmly: "There is a small ${lo(p1)} for that service, sir. The ${lo(p2)} appears on your final bill." Mr. Haddad understands.`,
        [
          {
            q: "Nhân viên giải thích khoản phí ở đâu hiện ra?",
            options: ["Trên hoá đơn cuối cùng", "Trên tờ rơi ở sảnh", "Trên website"],
            correct: 0,
            explanation: `"appears on your final bill" — trên hoá đơn cuối.`,
          },
          {
            q: "Thái độ của nhân viên khi khách ngạc nhiên là gì?",
            options: ["Bình tĩnh giải thích", "Tranh cãi với khách", "Gọi bảo vệ"],
            correct: 0,
            explanation: "'explains calmly' — bình tĩnh là điều kiện tiên quyết khi nói về tiền.",
          },
        ],
      ),
      game: [
        game(
          "Is that included, or do I pay extra?",
          `There is a small ${lo(p2)} for that, madam.`,
          `Of course you must pay.`,
          `I think maybe free, not sure.`,
        ),
      ],
    }),

    lesson(lx, 24, 2, "Because — Giving the Reason", "Nêu lý do bằng 'because'", {
      vocabulary: [
        v("Because", "/bɪˈkɒz/", "Bởi vì", "We ask for this because it is required.", "❓"),
        bw(p4, `We apply the ${lo(p4)} to every booking.`),
        bw(p5, `The ${lo(p5)} protects both sides.`),
        bw(p6, `I can show you the ${lo(p6)} in writing.`),
      ],
      grammar: [
        g(`Rule is rule.`, `We have to apply the ${lo(p4)} because it is hotel policy.`, "Ngữ pháp mới của tuần: 'have to' + 'because'. Nêu lý do luôn dễ chấp nhận hơn khẳng định suông."),
        g(`I show you paper.`, `I can show you the ${lo(p6)} in writing, madam.`, "Đề nghị đưa bằng chứng bằng văn bản là cách chốt tranh luận lịch sự nhất."),
      ],
      speaking: [
        sp("Why do I have to pay this?", `We have to apply the ${lo(p4)} because it is hotel policy.`, "Luôn kèm lý do. Câu không có 'because' nghe như bạn tự đặt ra khoản phí."),
        sp("I still think it is unfair.", `I understand, sir. I can show you the ${lo(p6)} in writing.`, "Lượt thứ hai: không tranh cãi, chuyển sang bằng chứng."),
      ],
      reading: read(
        `A guest questions a charge. ${lx.staff} answers: "We have to apply the ${lo(p4)} because it is hotel policy. The ${lo(p5)} protects both sides. I can show you the ${lo(p6)} in writing." The guest accepts.`,
        [
          {
            q: "Từ nào được dùng để nêu lý do?",
            options: ["Because", "But", "After"],
            correct: 0,
            explanation: "'because' nối mệnh đề chỉ nguyên nhân — đây là cấu trúc trọng tâm của tuần 24.",
          },
          {
            q: "Nhân viên đề nghị gì khi khách còn nghi ngờ?",
            options: ["Cho xem quy định bằng văn bản", "Giảm giá ngay", "Đổi chủ đề"],
            correct: 0,
            explanation: "'show you … in writing' — bằng chứng viết ra giấy chấm dứt tranh luận mà không ai mất mặt.",
          },
        ],
      ),
      game: [
        game(
          "Why am I being charged for this?",
          `We have to apply it because it is hotel policy.`,
          `Because I say so, sir.`,
          `I do not know the reason.`,
        ),
      ],
    }),

    lesson(lx, 24, 3, "Saying No Politely", "Từ chối lịch sự", {
      vocabulary: [
        bw(p7, `I am afraid the ${lo(p7)} applies here.`),
        bw(p8, `The ${lo(p8)} cannot be changed by me.`),
        bw(p9, `My manager can review the ${lo(p9)}.`),
      ],
      grammar: [
        g(`No, impossible.`, `I am afraid the ${lo(p7)} applies here, sir.`, "'I am afraid…' là cách mở đầu câu từ chối chuẩn mực trong ngành."),
        g(`I cannot do anything.`, `I cannot change it myself, but my manager can review it.`, "Đừng dừng ở lời từ chối. Luôn chỉ ra bước tiếp theo cho khách."),
      ],
      speaking: [
        sp("Can you remove this charge for me?", `I am afraid the ${lo(p7)} applies here, sir.`, "Từ chối rõ ràng nhưng mềm. Nói vòng vo khiến khách hy vọng rồi thất vọng nặng hơn."),
      ],
      reading: read(
        `Ms. Nakamura asks for a charge to be removed. ${lx.staff} replies: "I am afraid the ${lo(p7)} applies here. I cannot change the ${lo(p8)} myself, but my manager can review the ${lo(p9)}." She agrees to wait.`,
        [
          {
            q: "Cụm nào được dùng để mở đầu lời từ chối?",
            options: ["I am afraid…", "No way…", "You cannot…"],
            correct: 0,
            explanation: "'I am afraid…' báo hiệu tin không vui một cách lịch sự, chuẩn ngành khách sạn.",
          },
          {
            q: "Nhân viên chỉ cho khách bước tiếp theo nào?",
            options: ["Quản lý sẽ xem xét lại", "Khách tự gọi tổng đài", "Không có bước nào"],
            correct: 0,
            explanation: "'my manager can review' — luôn để lại một cánh cửa, khách sẽ chờ thay vì nổi giận.",
          },
        ],
      ),
      game: [
        game(
          "Please just take that fee off my bill.",
          `I am afraid I cannot, but my manager can review it.`,
          `No. That is final.`,
          `Try asking someone else.`,
        ),
      ],
    }),

    lesson(lx, 24, 4, "Confirming Understanding", "Xác nhận khách đã hiểu", {
      vocabulary: [
        bw(p10, `Shall I repeat the ${lo(p10)} for you?`),
        bw(p11, `The ${lo(p11)} is written on your copy.`),
        bw(p12, `Please keep the ${lo(p12)} for your record.`),
      ],
      grammar: [
        g(`You understand or no?`, `Shall I repeat the ${lo(p10)} for you?`, "Không hỏi khách có hiểu không — nghe như nghi ngờ họ. Hãy đề nghị nhắc lại."),
        g(`Keep this paper.`, `Please keep the ${lo(p12)} for your record, madam.`, "Thêm 'for your record' giải thích vì sao khách cần giữ giấy tờ đó."),
      ],
      speaking: [
        sp("Sorry, could you go through that again?", `Of course. Shall I repeat the ${lo(p10)} for you?`, "Khách hỏi lại là cơ hội, không phải phiền phức. Trả lời bằng 'Of course' trước tiên."),
      ],
      reading: read(
        `Before finishing, ${lx.staff} says: "Shall I repeat the ${lo(p10)} for you? The ${lo(p11)} is written on your copy. Please keep the ${lo(p12)} for your record." Mr. Rossi nods and files the paper.`,
        [
          {
            q: "Nhân viên đề nghị gì trước khi kết thúc?",
            options: ["Nhắc lại quy định cho khách", "Yêu cầu khách ký ngay", "Kết thúc luôn"],
            correct: 0,
            explanation: "'Shall I repeat…' — chủ động đề nghị nhắc lại là bước cuối của một lần giải thích tốt.",
          },
          {
            q: "Vì sao khách cần giữ giấy tờ?",
            options: ["Để làm bằng chứng lưu lại", "Để đưa cho nhân viên khác", "Để bỏ đi"],
            correct: 0,
            explanation: "'for your record' — giữ làm hồ sơ của khách.",
          },
        ],
      ),
      game: [
        game(
          "I am not sure I followed all of that.",
          `Shall I repeat the ${lo(p10)} for you?`,
          `Do you understand me?`,
          `That is all. Goodbye.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 25 — Promising a Time
// FRAMES · "I will {commitment} within ten minutes."
//        · "We are going to {commitment} before three o'clock."
// ============================================================
function week25(lx: Ctx): LessonContent[] {
  const [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12] = lx.bank.commitments;
  return [
    lesson(lx, 25, 1, "Within Ten Minutes", "Cam kết trong bao lâu", {
      vocabulary: [
        v("Within", "/wɪˈðɪn/", "Trong vòng (thời gian)", "I will be there within ten minutes.", "⏱️"),
        v("Straight away", "/streɪt əˈweɪ/", "Ngay lập tức", "I will do it straight away.", "⚡"),
        bw(c1, `I will ${lo(c1)} within ten minutes.`),
        bw(c2, `We will ${lo(c2)} straight away.`),
        bw(c3, `I can ${lo(c3)} for you now.`),
      ],
      grammar: [
        g(`I do it soon.`, `I will ${lo(c1)} within ten minutes, sir.`, "'Soon' là lời hứa rỗng. Con số cụ thể mới là cam kết — đây là trọng tâm tuần 25."),
        g(`Wait a bit ok.`, `Please give me ten minutes and I will ${lo(c2)}.`, "Xin một khoảng thời gian cụ thể, rồi nói rõ bạn sẽ làm gì trong khoảng đó."),
      ],
      speaking: [
        sp("How long will this take?", `I will ${lo(c1)} within ten minutes, madam.`, "Khung vàng tuần này. Luôn gắn con số vào lời hứa."),
        sp("Ten minutes? I have a meeting at four.", `Then I will ${lo(c2)} straight away, madam.`, "Khách có ràng buộc thời gian — rút ngắn cam kết ngay, đừng bảo vệ mốc cũ."),
      ],
      reading: read(
        `Mr. Tanaka is in a hurry. ${lx.staff} answers: "I will ${lo(c1)} within ten minutes, sir." Mr. Tanaka says he has a meeting soon. ${lx.staff} replies: "Then we will ${lo(c2)} straight away."`,
        [
          {
            q: "Cam kết đầu tiên của nhân viên là bao lâu?",
            options: ["Trong vòng mười phút", "Trong vòng một giờ", "Ngày mai"],
            correct: 0,
            explanation: "'within ten minutes' — mười phút.",
          },
          {
            q: "Nhân viên làm gì khi biết khách sắp có cuộc họp?",
            options: ["Rút ngắn thời gian, làm ngay", "Giữ nguyên mười phút", "Đề nghị khách quay lại sau"],
            correct: 0,
            explanation: "'straight away' — điều chỉnh cam kết theo hoàn cảnh của khách là dấu hiệu của dịch vụ chủ động.",
          },
        ],
      ),
      game: [
        game(
          "How long will I have to wait for this?",
          `I will ${lo(c3)} within ten minutes, sir.`,
          `Soon, maybe not long.`,
          `I cannot say how long.`,
        ),
      ],
    }),

    lesson(lx, 25, 2, "By Three O'clock", "Hẹn mốc giờ cụ thể", {
      vocabulary: [
        v("Going to", "/ˈɡəʊɪŋ tuː/", "Sắp, dự định sẽ", "We are going to finish before noon.", "📅"),
        bw(c4, `We are going to ${lo(c4)} before three o'clock.`),
        bw(c5, `I will ${lo(c5)} this afternoon.`),
        bw(c6, `The team will ${lo(c6)} tonight.`),
      ],
      grammar: [
        g(`Three o'clock finish.`, `We are going to ${lo(c4)} before three o'clock.`, "'Be going to' dùng cho kế hoạch đã định. 'Before + giờ' cho khách một mốc chắc chắn."),
        g(`Afternoon I do.`, `I will ${lo(c5)} this afternoon, madam.`, "Câu phải có chủ ngữ và trợ động từ 'will'. Nói cụt khiến lời hứa nghe không đáng tin."),
      ],
      speaking: [
        sp("Will it be ready before I go out?", `Yes. We are going to ${lo(c4)} before three o'clock.`, "Trả lời 'yes' rồi mới nêu mốc giờ — khách nghe được câu trả lời trước, chi tiết sau."),
        sp("Please make sure. I really need it today.", `I understand. I will ${lo(c5)} this afternoon myself.`, "Thêm 'myself' khi khách lo lắng: bạn nhận trách nhiệm cá nhân, không đẩy sang 'ai đó'."),
      ],
      reading: read(
        `Mrs. Alvarez needs something finished today. ${lx.staff} promises: "We are going to ${lo(c4)} before three o'clock. I will ${lo(c5)} this afternoon myself." She leaves the hotel feeling calm.`,
        [
          {
            q: "Mốc giờ nhân viên cam kết là gì?",
            options: ["Trước ba giờ", "Trước trưa", "Trước tối"],
            correct: 0,
            explanation: "'before three o'clock' — trước ba giờ chiều.",
          },
          {
            q: "Từ 'myself' trong câu có tác dụng gì?",
            options: ["Nhận trách nhiệm cá nhân", "Nói rằng không ai giúp", "Từ chối việc đó"],
            correct: 0,
            explanation: "'myself' cho khách biết có một người cụ thể chịu trách nhiệm, không phải một bộ phận vô danh.",
          },
        ],
      ),
      game: [
        game(
          "I really need this finished today, please.",
          `We are going to ${lo(c6)} before three o'clock.`,
          `Maybe today, maybe tomorrow.`,
          `Today is very busy for us.`,
        ),
      ],
    }),

    lesson(lx, 25, 3, "Keeping the Guest Informed", "Cập nhật tiến độ cho khách", {
      vocabulary: [
        bw(c7, `I will ${lo(c7)} and call you back.`),
        bw(c8, `We will ${lo(c8)} and let you know.`),
        bw(c9, `I will ${lo(c9)} before the end of my shift.`),
      ],
      grammar: [
        g(`I call you maybe.`, `I will ${lo(c7)} and call you back in five minutes.`, "Hai hành động nối bằng 'and' — vừa làm việc vừa hứa báo lại, đúng chuẩn A2+."),
        g(`You wait, I no answer yet.`, `I have no answer yet, but I will ${lo(c8)} and call you.`, "Chưa có câu trả lời vẫn phải liên lạc. Im lặng là điều khách sợ nhất."),
      ],
      speaking: [
        sp("Can you tell me as soon as you know?", `Of course. I will ${lo(c7)} and call you back.`, "Chủ động hứa báo lại — khách không phải đi hỏi lần thứ hai."),
      ],
      reading: read(
        `A guest is waiting for news. ${lx.staff} says: "I have no answer yet, but I will ${lo(c8)} and call you. I will ${lo(c9)} before the end of my shift." The guest thanks him for the update.`,
        [
          {
            q: "Nhân viên đã có câu trả lời chưa?",
            options: ["Chưa, nhưng hứa sẽ báo lại", "Rồi, đã trả lời xong", "Không quan tâm"],
            correct: 0,
            explanation: "'I do not have the answer yet, but…' — chưa có, nhưng vẫn chủ động liên lạc.",
          },
          {
            q: "Vì sao khách cảm ơn?",
            options: ["Vì được cập nhật dù chưa có kết quả", "Vì được giảm giá", "Vì việc đã xong"],
            correct: 0,
            explanation: "Được cập nhật là đủ để khách yên tâm chờ. Cập nhật là dịch vụ, không chỉ kết quả mới là dịch vụ.",
          },
        ],
      ),
      game: [
        game(
          "Do you have any news for me yet?",
          `I will ${lo(c8)} and let you know within the hour.`,
          `Nothing yet. Please wait.`,
          `Ask me again tomorrow.`,
        ),
      ],
    }),

    lesson(lx, 25, 4, "When You Cannot Keep the Promise", "Khi không giữ được lời hứa", {
      vocabulary: [
        bw(c10, `I am sorry, I could not ${lo(c10)} on time.`),
        bw(c11, `I will ${lo(c11)} immediately instead.`),
        bw(c12, `We will ${lo(c12)} to make it right.`),
      ],
      grammar: [
        g(`Not ready, sorry.`, `I am very sorry. I could not ${lo(c10)} on time.`, "Xin lỗi phải đi kèm việc nói rõ điều gì đã không xảy ra — khách cần biết chính xác mình đang chờ gì."),
        g(`I do something else for you.`, `I will ${lo(c11)} immediately instead, sir.`, "Trễ hẹn thì phải có hành động bù ngay. 'Instead' báo hiệu phương án thay thế."),
      ],
      speaking: [
        sp("You said ten minutes. It has been thirty.", `I am very sorry, sir. I will ${lo(c11)} immediately instead.`, "Không giải thích dài dòng khi đang trễ. Xin lỗi ngắn, hành động ngay — đó là điều khách muốn."),
      ],
      reading: read(
        `${lx.staff} is late with a promise. He goes to the guest first: "I am very sorry. I could not ${lo(c10)} on time. I will ${lo(c11)} immediately instead. We will ${lo(c12)} to make it right." The guest appreciates the honesty.`,
        [
          {
            q: "Nhân viên làm gì khi biết mình trễ hẹn?",
            options: ["Chủ động tìm khách để xin lỗi", "Đợi khách phàn nàn", "Tránh mặt khách"],
            correct: 0,
            explanation: "'goes to the guest first' — chủ động báo trước khi khách phải đi tìm bạn.",
          },
          {
            q: "Khách đánh giá cao điều gì?",
            options: ["Sự trung thực", "Sự im lặng", "Lời giải thích dài"],
            correct: 0,
            explanation: "'appreciates the honesty' — thừa nhận sớm giữ được lòng tin, che giấu thì mất hẳn.",
          },
        ],
      ),
      game: [
        game(
          "Is it ready? You said only ten minutes.",
          `I am sorry. I will ${lo(c12)} immediately instead.`,
          `It is not ready. I do not know when.`,
          `Please be patient, sir. We are very busy.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 26 — Working With Other Teams
// FRAMES · "Let me check with {partner}."
//        · "I will ask {partner} to help you."
// ============================================================
function week26(lx: Ctx): LessonContent[] {
  const [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12] = lx.bank.partners;
  return [
    lesson(lx, 26, 1, "Let Me Check With…", "Xin phép hỏi bộ phận khác", {
      vocabulary: [
        v("Colleague", "/ˈkɒliːɡ/", "Đồng nghiệp", "My colleague can help you.", "🤝"),
        v("Transfer", "/trænsˈfɜː/", "Chuyển (máy, việc)", "I will transfer your call now.", "📞"),
        bw(t1, `Let me check with the ${lo(t1)}.`),
        bw(t2, `I will speak to the ${lo(t2)} for you.`),
        bw(t3, `This part belongs to the ${lo(t3)}.`),
      ],
      grammar: [
        g(`Not my job.`, `Let me check with the ${lo(t1)} for you, sir.`, "Không bao giờ nói 'không phải việc của tôi'. Với khách, cả khách sạn là một."),
        g(`You go ask them.`, `I will speak to the ${lo(t2)} for you.`, "Đừng đẩy khách đi. Bạn cầm lấy việc rồi chuyển tiếp trong nội bộ."),
      ],
      speaking: [
        sp("Is this something you can handle?", `Let me check with the ${lo(t1)} for you, madam.`, "Khung vàng tuần này. Câu này giữ khách ở lại với bạn thay vì đẩy họ đi lòng vòng."),
        sp("How long will that take?", `Just a moment. This part belongs to the ${lo(t3)}.`, "Giải thích ai phụ trách giúp khách hiểu vì sao phải chờ."),
      ],
      reading: read(
        `A request arrives that belongs to another team. ${lx.staff} does not send the guest away. He says: "Let me check with the ${lo(t1)} for you. This part belongs to the ${lo(t3)}." He makes the call himself.`,
        [
          {
            q: "Nhân viên xử lý thế nào khi việc thuộc bộ phận khác?",
            options: ["Tự liên hệ giúp khách", "Bảo khách tự đi hỏi", "Từ chối"],
            correct: 0,
            explanation: "'He makes the call himself' — cầm lấy việc thay vì đẩy khách đi.",
          },
          {
            q: "Câu nào giữ khách ở lại thay vì đẩy đi?",
            options: ["Let me check with…", "Not my job", "Go and ask them"],
            correct: 0,
            explanation: "'Let me check with…' báo cho khách rằng bạn vẫn đang phụ trách việc này.",
          },
        ],
      ),
      game: [
        game(
          "Could you take care of this for me?",
          `Let me check with the ${lo(t2)} for you.`,
          `That is not my department.`,
          `Please go to the other desk.`,
        ),
      ],
    }),

    lesson(lx, 26, 2, "I'll Ask Them To…", "Nhờ bộ phận khác hỗ trợ", {
      vocabulary: [
        v("Arrange", "/əˈreɪndʒ/", "Sắp xếp", "I will arrange it for you.", "🗓️"),
        bw(t4, `I will ask the ${lo(t4)} to help you.`),
        bw(t5, `The ${lo(t5)} will come up shortly.`),
        bw(t6, `I have informed the ${lo(t6)} already.`),
      ],
      grammar: [
        g(`I tell them come.`, `I will ask the ${lo(t4)} to help you, sir.`, "Cấu trúc 'ask + người + to + động từ' là mẫu câu điều phối chuẩn của tuần này."),
        g(`Already I say them.`, `I have informed the ${lo(t6)} already, madam.`, "Trật tự đúng là chủ ngữ + đã báo + tân ngữ. 'Already' đứng cuối câu."),
      ],
      speaking: [
        sp("Could someone come and look at it?", `Certainly. I will ask the ${lo(t4)} to help you.`, "Nói rõ bạn sẽ nhờ ai — khách yên tâm hơn khi biết có người cụ thể được giao việc."),
        sp("When can they come?", `The ${lo(t5)} will come up shortly, madam.`, "Lượt hai: gắn thêm mốc thời gian, đừng để lời hứa treo lơ lửng."),
      ],
      reading: read(
        `Mr. Silva needs help from another team. ${lx.staff} replies: "I will ask the ${lo(t4)} to help you. The ${lo(t5)} will come up shortly." Ten minutes later he adds: "I have informed the ${lo(t6)} already."`,
        [
          {
            q: "Nhân viên hứa nhờ ai giúp khách?",
            options: [t4.definition, t5.definition, t6.definition],
            correct: 0,
            explanation: `"I will ask the ${lo(t4)} to help you."`,
          },
          {
            q: "Mười phút sau nhân viên làm gì?",
            options: ["Cập nhật lại cho khách", "Quên mất khách", "Đổi ca"],
            correct: 0,
            explanation: "Báo lại tiến độ sau khi chuyển việc là bước mà phần lớn nhân viên quên — và là điểm khác biệt của dịch vụ tốt.",
          },
        ],
      ),
      game: [
        game(
          "Is there anyone who can come and help?",
          `I will ask the ${lo(t5)} to help you right away.`,
          `Someone will come, I think.`,
          `They are busy, so please wait.`,
        ),
      ],
    }),

    lesson(lx, 26, 3, "Following Up Internally", "Theo dõi việc đã chuyển", {
      vocabulary: [
        bw(t7, `I will follow up with the ${lo(t7)}.`),
        bw(t8, `The ${lo(t8)} confirmed the request.`),
        bw(t9, `I passed the note to the ${lo(t9)}.`),
      ],
      grammar: [
        g(`I ask again them.`, `I will follow up with the ${lo(t7)} in ten minutes.`, "'Follow up with' là cụm chuẩn cho việc kiểm tra lại sau khi đã chuyển yêu cầu."),
        g(`Note I give already.`, `I passed the note to the ${lo(t9)} this morning.`, "Quá khứ đơn dùng để báo cáo việc đã làm — ôn lại ngữ pháp tuần 21."),
      ],
      speaking: [
        sp("Has anyone actually done anything?", `Yes, sir. I passed the note to the ${lo(t9)} and the ${lo(t8)} confirmed it.`, "Khách nghi ngờ thì đưa bằng chứng: ai nhận, ai xác nhận. Đừng chỉ nói 'we are working on it'."),
      ],
      reading: read(
        `A guest doubts that anything is happening. ${lx.staff} shows his log: "I passed the note to the ${lo(t9)} at nine o'clock. The ${lo(t8)} confirmed the request. I will follow up with the ${lo(t7)} now." The guest is reassured.`,
        [
          {
            q: "Nhân viên chứng minh bằng cách nào?",
            options: ["Cho khách xem sổ ghi việc", "Nói lớn tiếng hơn", "Hứa thêm lần nữa"],
            correct: 0,
            explanation: "'shows his log' — ghi chép cụ thể thuyết phục hơn mọi lời hứa.",
          },
          {
            q: "'Follow up with' nghĩa là gì?",
            options: ["Kiểm tra lại sau khi đã chuyển việc", "Bắt đầu lại từ đầu", "Huỷ yêu cầu"],
            correct: 0,
            explanation: "Theo dõi tiếp để đảm bảo việc không bị bỏ quên giữa hai bộ phận.",
          },
        ],
      ),
      game: [
        game(
          "Is anybody actually working on my request?",
          `I passed it to the ${lo(t9)} and the ${lo(t8)} confirmed it.`,
          `Someone is doing it, probably.`,
          `I already told you once, sir.`,
        ),
      ],
    }),

    lesson(lx, 26, 4, "Closing the Loop", "Khép lại yêu cầu", {
      vocabulary: [
        bw(t10, `The ${lo(t10)} finished the work.`),
        bw(t11, `I checked with the ${lo(t11)} before calling you.`),
        bw(t12, `The ${lo(t12)} will keep the record.`),
      ],
      grammar: [
        g(`Finish already, ok?`, `The ${lo(t10)} finished the work, madam.`, "Báo hoàn thành phải nêu rõ ai đã làm — khách cảm nhận được một hệ thống đang vận hành."),
        g(`Before call you I check.`, `I checked with the ${lo(t11)} before calling you.`, "Mệnh đề thời gian đứng sau: chủ ngữ + động từ + 'before' + V-ing."),
      ],
      speaking: [
        sp("So is everything sorted now?", `Yes, madam. The ${lo(t10)} finished, and I checked before calling you.`, "Câu kết chuẩn: xác nhận đã xong + cho biết bạn đã tự kiểm tra trước khi báo."),
      ],
      reading: read(
        `${lx.staff} calls Mrs. Chen back: "The ${lo(t10)} finished the work. I checked with the ${lo(t11)} before calling you. The ${lo(t12)} will keep the record." Mrs. Chen says this is the best service she has had.`,
        [
          {
            q: "Nhân viên làm gì trước khi gọi báo khách?",
            options: ["Tự kiểm tra lại kết quả", "Gọi ngay không kiểm tra", "Nhờ khách tự kiểm tra"],
            correct: 0,
            explanation: "'I checked … before calling you' — kiểm tra trước khi báo, để không phải xin lỗi lần hai.",
          },
          {
            q: "Vì sao khách khen dịch vụ?",
            options: ["Vì được báo lại đầy đủ và chính xác", "Vì được tặng quà", "Vì không phải trả tiền"],
            correct: 0,
            explanation: "Khép lại vòng yêu cầu — báo lại tận nơi — là thứ khách nhớ lâu nhất.",
          },
        ],
      ),
      game: [
        game(
          "Can you tell me if it is all done?",
          `The ${lo(t10)} finished, and I checked before calling you.`,
          `It is done. Anything else?`,
          `They said it is finished, I hope so.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 27 — Receiving a Complaint (LAST steps 1-2: Listen, Apologise)
// FRAMES · "I am very sorry about the {complaint}."
//        · "I understand your concern about the {complaint}."
// ============================================================
function week27(lx: Ctx): LessonContent[] {
  const [k1, k2, k3, k4, k5, k6, k7, k8, k9, k10, k11, k12] = lx.bank.complaints;
  return [
    lesson(lx, 27, 1, "Listen First", "Lắng nghe trước đã", {
      vocabulary: [
        v("Concern", "/kənˈsɜːn/", "Điều khách lo lắng", "I understand your concern.", "😟"),
        v("Apologise", "/əˈpɒlədʒaɪz/", "Xin lỗi", "I apologise for the delay.", "🙇"),
        bw(k1, `I am very sorry about the ${lo(k1)}.`),
        bw(k2, `Thank you for telling me about the ${lo(k2)}.`),
        bw(k3, `I understand your concern about the ${lo(k3)}.`),
      ],
      grammar: [
        g(`Okay okay, I know.`, `I am very sorry about the ${lo(k1)}, sir.`, "Cắt lời khách là lỗi nặng nhất khi tiếp nhận phàn nàn. Nghe hết rồi mới xin lỗi."),
        g(`Why you angry?`, `I understand your concern about the ${lo(k3)}.`, "Không bao giờ chất vấn cảm xúc của khách. Thừa nhận nó trước."),
      ],
      speaking: [
        sp("This is really not acceptable.", `I am very sorry about the ${lo(k1)}, sir.`, "Khung vàng tuần này. Xin lỗi về SỰ VIỆC cụ thể, không xin lỗi chung chung."),
        sp("I have already told two of your staff.", `Thank you for telling me about the ${lo(k2)}. I will handle it now.`, "Cảm ơn khách vì đã nói ra — họ đang cho bạn cơ hội sửa, thay vì lặng lẽ bỏ đi."),
      ],
      reading: read(
        `Mr. Dubois is upset. ${lx.staff} listens without interrupting, then says: "I am very sorry about the ${lo(k1)}, sir. Thank you for telling me about the ${lo(k2)}. I understand your concern." Mr. Dubois calms down.`,
        [
          {
            q: "Nhân viên làm gì đầu tiên?",
            options: ["Nghe hết không ngắt lời", "Giải thích ngay", "Gọi quản lý"],
            correct: 0,
            explanation: "'listens without interrupting' — bước L (Listen) trong quy trình LAST.",
          },
          {
            q: "Vì sao phải cảm ơn khi khách phàn nàn?",
            options: ["Vì khách cho ta cơ hội sửa sai", "Vì đó là thủ tục bắt buộc", "Vì khách sẽ trả thêm tiền"],
            correct: 0,
            explanation: "Khách phàn nàn là khách còn muốn quay lại. Khách im lặng mới là khách đã mất.",
          },
        ],
      ),
      game: [
        game(
          "I have been waiting all morning and nobody helped me!",
          `I am very sorry, sir. Please tell me what happened.`,
          `That is not our fault, sir.`,
          `Please calm down first, sir.`,
        ),
      ],
    }),

    lesson(lx, 27, 2, "A Real Apology", "Lời xin lỗi thật lòng", {
      vocabulary: [
        v("Disappointed", "/ˌdɪsəˈpɔɪntɪd/", "Thất vọng", "I am sorry you are disappointed.", "😞"),
        bw(k4, `The ${lo(k4)} should not have happened.`),
        bw(k5, `I am sorry you experienced the ${lo(k5)}.`),
        bw(k6, `The ${lo(k6)} was our mistake.`),
      ],
      grammar: [
        g(`Sorry for you.`, `I am sorry you experienced the ${lo(k5)}, madam.`, "'Sorry for you' nghe như thương hại. Xin lỗi về việc khách đã phải trải qua."),
        g(`Maybe someone wrong.`, `The ${lo(k6)} was our mistake, and I apologise.`, "Nhận lỗi bằng 'our mistake'. Đổ lỗi cho 'ai đó' khiến khách mất niềm tin vào cả khách sạn."),
      ],
      speaking: [
        sp("I paid a lot of money for this.", `I am sorry you experienced the ${lo(k5)}, madam. It was our mistake.`, "Nhận lỗi thẳng thắn. Vòng vo làm khách giận thêm."),
        sp("So what are you going to do about it?", `The ${lo(k4)} should not have happened. Let me fix it for you now.`, "Lượt hai: thừa nhận chuẩn mực bị vi phạm rồi chuyển sang hành động."),
      ],
      reading: read(
        `${lx.staff} does not blame anyone else. He says: "The ${lo(k6)} was our mistake, and I apologise. The ${lo(k4)} should not have happened." Ms. Weber notices he did not blame a colleague, and her anger fades.`,
        [
          {
            q: "Nhân viên nhận lỗi thế nào?",
            options: ["Nhận là lỗi của khách sạn", "Đổ cho đồng nghiệp", "Nói khách hiểu nhầm"],
            correct: 0,
            explanation: "'was our mistake' — nhận lỗi tập thể, không chỉ tay sang người khác.",
          },
          {
            q: "Điều gì khiến khách bớt giận?",
            options: ["Nhân viên không đổ lỗi cho ai", "Nhân viên nói to hơn", "Nhân viên im lặng"],
            correct: 0,
            explanation: "Khách nghe thấy sự đổ lỗi nội bộ sẽ mất niềm tin vào toàn bộ khách sạn.",
          },
        ],
      ),
      game: [
        game(
          "Which one of your staff made this mistake?",
          `It was our mistake, sir, and I apologise.`,
          `My colleague did it, not me.`,
          `The other shift is always careless.`,
        ),
      ],
    }),

    lesson(lx, 27, 3, "Getting the Facts", "Ghi nhận thông tin sự việc", {
      vocabulary: [
        bw(k7, `Could you tell me when the ${lo(k7)} started?`),
        bw(k8, `I will write down the ${lo(k8)}.`),
        bw(k9, `May I check the ${lo(k9)} myself?`),
      ],
      grammar: [
        g(`When happen?`, `Could you tell me when the ${lo(k7)} started?`, "Câu hỏi lấy thông tin vẫn phải lịch sự: 'Could you tell me when…?'"),
        g(`I write.`, `I will write down the ${lo(k8)} so nothing is missed.`, "Nói rõ mục đích ghi chép — khách thấy việc của mình được coi trọng."),
      ],
      speaking: [
        sp("It started last night and nobody helped.", `I am sorry. Could you tell me when the ${lo(k7)} started, madam?`, "Vừa xin lỗi vừa lấy thông tin. Đừng thẩm vấn khách như điều tra viên."),
      ],
      reading: read(
        `${lx.staff} takes out his notebook: "I will write down the ${lo(k8)} so nothing is missed. Could you tell me when the ${lo(k7)} started? May I check the ${lo(k9)} myself?" Mr. Ferreira feels taken seriously.`,
        [
          {
            q: "Vì sao nhân viên ghi chép?",
            options: ["Để không bỏ sót chi tiết nào", "Để kéo dài thời gian", "Vì quy định bắt buộc"],
            correct: 0,
            explanation: "'so nothing is missed' — ghi lại để xử lý đúng và đủ.",
          },
          {
            q: "Nhân viên đề nghị gì thêm?",
            options: ["Tự đi kiểm tra", "Để khách tự kiểm tra", "Bỏ qua việc kiểm tra"],
            correct: 0,
            explanation: "'May I check … myself' — tự mắt thấy để không xử lý dựa trên phỏng đoán.",
          },
        ],
      ),
      game: [
        game(
          "I want to report a problem with my room.",
          `Could you tell me when the ${lo(k7)} started?`,
          `When? Tell me now.`,
          `I do not need details.`,
        ),
      ],
    }),

    lesson(lx, 27, 4, "Staying Calm", "Giữ bình tĩnh", {
      vocabulary: [
        bw(k10, `The ${lo(k10)} is being checked right now.`),
        bw(k11, `I will stay with you until the ${lo(k11)} is solved.`),
        bw(k12, `Please let me know if the ${lo(k12)} happens again.`),
      ],
      grammar: [
        g(`You shout no use.`, `I understand, sir. I will stay with you until it is solved.`, "Khách to tiếng thì mình càng phải nhỏ nhẹ. Cam kết ở lại đến khi xong."),
        g(`Next time you tell me.`, `Please let me know if the ${lo(k12)} happens again.`, "Mở sẵn kênh liên lạc cho lần sau — khách sẽ tìm bạn thay vì viết đánh giá xấu."),
      ],
      speaking: [
        sp("I do not trust this hotel any more.", `I understand, sir. I will stay with you until the ${lo(k11)} is solved.`, "Cam kết đồng hành là câu mạnh nhất khi khách đã mất niềm tin."),
      ],
      reading: read(
        `The guest raises his voice. ${lx.staff} keeps his own voice low and says: "I understand. The ${lo(k10)} is being checked right now. I will stay with you until the ${lo(k11)} is solved." The guest lowers his voice too.`,
        [
          {
            q: "Nhân viên phản ứng thế nào khi khách to tiếng?",
            options: ["Giữ giọng nói nhỏ nhẹ", "Nói to hơn khách", "Bỏ đi"],
            correct: 0,
            explanation: "'keeps his own voice low' — giọng của bạn quyết định nhiệt độ của cuộc trò chuyện.",
          },
          {
            q: "Cam kết nào được đưa ra?",
            options: ["Ở lại cùng khách đến khi giải quyết xong", "Gọi bảo vệ", "Hẹn ngày mai"],
            correct: 0,
            explanation: "'stay with you until … is solved' — không bỏ khách lại giữa chừng.",
          },
        ],
      ),
      game: [
        game(
          "This is unacceptable! I want to speak to someone now!",
          `I understand, sir. I will stay with you until it is solved.`,
          `There is no need to shout, sir.`,
          `You must wait like everyone else.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 28 — Offering a Solution (first conditional)
// FRAMES · "If you like, I can {solution}."
//        · "If you prefer, we will {solution} instead."
// ============================================================
function week28(lx: Ctx): LessonContent[] {
  const [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12] = lx.bank.solutions;
  return [
    lesson(lx, 28, 1, "If You Like, I Can…", "Đề nghị giải pháp", {
      vocabulary: [
        v("Prefer", "/prɪˈfɜː/", "Thích hơn, muốn hơn", "If you prefer, we can do that.", "❤️"),
        v("Option", "/ˈɒpʃn/", "Lựa chọn", "You have two options, madam.", "🔀"),
        bw(s1, `If you like, I can ${lo(s1)}.`),
        bw(s2, `I can ${lo(s2)} straight away.`),
        bw(s3, `We could ${lo(s3)} for you today.`),
      ],
      grammar: [
        g(`I do this for you, ok?`, `If you like, I can ${lo(s1)}, sir.`, "Câu điều kiện loại 1 — ngữ pháp trọng tâm tuần 28. Đề nghị mà vẫn để khách quyết."),
        g(`You want I change?`, `If you prefer, we will ${lo(s2)} instead.`, "'If you prefer' + 'will' là cặp chuẩn để đưa phương án thay thế."),
      ],
      speaking: [
        sp("So how can you fix this?", `If you like, I can ${lo(s1)}, madam.`, "Khung vàng tuần này. Đề nghị cụ thể ngay, đừng hỏi khách muốn gì."),
        sp("Would that really solve it?", `Yes. And I can ${lo(s2)} straight away as well.`, "Lượt hai: khẳng định rồi cộng thêm một hành động nữa."),
      ],
      reading: read(
        `After apologising, ${lx.staff} offers a way out: "If you like, I can ${lo(s1)}. I can also ${lo(s2)} straight away." Mrs. Iqbal chooses the first option and the matter ends there.`,
        [
          {
            q: "Cấu trúc nào được dùng để đề nghị giải pháp?",
            options: ["If you like, I can…", "You must…", "Maybe someone can…"],
            correct: 0,
            explanation: "Câu điều kiện loại 1 — đề nghị rõ ràng nhưng vẫn tôn trọng quyền chọn của khách.",
          },
          {
            q: "Nhân viên đưa ra mấy phương án?",
            options: ["Hai", "Không có phương án nào", "Năm"],
            correct: 0,
            explanation: "Hai phương án là vừa đủ — nhiều quá khiến khách đang bực phải suy nghĩ thêm.",
          },
        ],
      ),
      game: [
        game(
          "So what are you going to do about it?",
          `If you like, I can ${lo(s3)} for you today.`,
          `I do not know what to do.`,
          `You should decide, not me.`,
        ),
      ],
    }),

    lesson(lx, 28, 2, "Two Choices", "Đưa hai phương án", {
      vocabulary: [
        v("Either", "/ˈaɪðə/", "Một trong hai", "Either option is possible.", "2️⃣"),
        bw(s4, `We can ${lo(s4)} or wait until tomorrow.`),
        bw(s5, `If you prefer, we will ${lo(s5)} instead.`),
        bw(s6, `I can ${lo(s6)} at no extra cost.`),
      ],
      grammar: [
        g(`This or this, choose.`, `We can ${lo(s4)}. If you prefer, we will ${lo(s5)} instead.`, "Hai phương án tách thành hai câu ngắn. Câu điều kiện loại 1 đứng riêng nghe rõ hơn."),
        g(`No money more.`, `I can ${lo(s6)} at no extra cost, madam.`, "'At no extra cost' là cụm quan trọng: khách cần nghe rõ mình không phải trả thêm."),
      ],
      speaking: [
        sp("What are my choices exactly?", `We can ${lo(s4)}. If you prefer, we will ${lo(s5)} instead.`, "Nói hai phương án song song để khách thấy mình được lựa chọn, không bị áp đặt."),
        sp("Will any of that cost me more?", `Not at all. I can ${lo(s6)} at no extra cost.`, "Trả lời dứt khoát về tiền. Do dự ở đây làm khách nghi ngờ toàn bộ đề nghị."),
      ],
      reading: read(
        `${lx.staff} lays out the choices: "We can ${lo(s4)}. If you prefer, we will ${lo(s5)} instead. I can ${lo(s6)} at no extra cost." Mr. Novak picks the second option and thanks him.`,
        [
          {
            q: "Nhân viên đưa ra bao nhiêu phương án?",
            options: ["Hai", "Một", "Bốn"],
            correct: 0,
            explanation: "Hai phương án rõ ràng — khách chọn nhanh và cảm thấy được tôn trọng.",
          },
          {
            q: "'At no extra cost' nghĩa là gì?",
            options: ["Không mất thêm phí", "Phải trả gấp đôi", "Trả sau cũng được"],
            correct: 0,
            explanation: "Khách cần được trấn an về tiền bạc một cách dứt khoát.",
          },
        ],
      ),
      game: [
        game(
          "Is there another way to solve this?",
          `If you prefer, we will ${lo(s5)} instead.`,
          `There is only one way, sorry.`,
          `You choose, I have no idea.`,
        ),
      ],
    }),

    lesson(lx, 28, 3, "Checking It Worked", "Kiểm tra kết quả", {
      vocabulary: [
        bw(s7, `I will ${lo(s7)} and check again later.`),
        bw(s8, `Shall I ${lo(s8)} while you wait?`),
        bw(s9, `We can ${lo(s9)} if it happens again.`),
      ],
      grammar: [
        g(`Finish. Bye.`, `I will ${lo(s7)} and check again later, sir.`, "Giải pháp chưa xong khi bạn rời đi — xong khi bạn quay lại kiểm tra."),
        g(`Again problem then what?`, `We can ${lo(s9)} if it happens again.`, "Chuẩn bị sẵn phương án cho lần sau giúp khách yên tâm ngủ ngon."),
      ],
      speaking: [
        sp("And if the same thing happens tonight?", `We can ${lo(s9)} if it happens again, madam.`, "Trả lời cho tình huống xấu nhất — đó là lúc khách thực sự tin bạn."),
      ],
      reading: read(
        `The problem is fixed, but ${lx.staff} does not disappear. He says: "I will ${lo(s7)} and check again later. We can ${lo(s9)} if it happens again." Ms. Bauer sleeps well that night.`,
        [
          {
            q: "Nhân viên làm gì sau khi đã xử lý xong?",
            options: ["Quay lại kiểm tra", "Rời đi luôn", "Đổi ca"],
            correct: 0,
            explanation: "'check again later' — kiểm tra lại là bước cuối cùng của việc giải quyết vấn đề.",
          },
          {
            q: "Vì sao khách ngủ ngon?",
            options: ["Vì đã có phương án cho tình huống xấu", "Vì được đổi phòng", "Vì được hoàn tiền"],
            correct: 0,
            explanation: "Biết trước sẽ làm gì nếu sự cố tái diễn khiến khách yên tâm hơn cả việc sự cố được sửa.",
          },
        ],
      ),
      game: [
        game(
          "Thank you, that seems to be working now.",
          `I will check again later to be sure.`,
          `It is fixed. Goodbye.`,
          `Please do not call me again.`,
        ),
      ],
    }),

    lesson(lx, 28, 4, "When You Must Say No", "Khi buộc phải từ chối", {
      vocabulary: [
        bw(s10, `I cannot ${lo(s10)}, but here is what I can do.`),
        bw(s11, `My manager can ${lo(s11)} if you wish.`),
        bw(s12, `We will ${lo(s12)} as a gesture of apology.`),
      ],
      grammar: [
        g(`Cannot. Nothing.`, `I cannot ${lo(s10)}, but I can offer something else, sir.`, "Từ chối luôn phải kèm phương án thay thế. 'No' đứng một mình là kết thúc quan hệ."),
        g(`Manager maybe do.`, `My manager can ${lo(s11)} if you wish, madam.`, "Chuyển cấp phải là một đề nghị chủ động, không phải cách để bạn thoát khỏi khách."),
      ],
      speaking: [
        sp("I want a full refund, nothing less.", `I cannot ${lo(s10)} myself. My manager can review that for you.`, "Không hứa điều ngoài thẩm quyền. Chỉ ra đúng người có quyền quyết định."),
      ],
      reading: read(
        `A guest demands more than ${lx.staff} can approve. He answers honestly: "I cannot ${lo(s10)} myself. My manager can review that for you. We will ${lo(s12)} as a gesture of apology." The guest accepts.`,
        [
          {
            q: "Nhân viên xử lý yêu cầu vượt thẩm quyền thế nào?",
            options: ["Nói thật và chuyển lên quản lý", "Hứa liều cho xong", "Từ chối rồi bỏ đi"],
            correct: 0,
            explanation: "Hứa điều mình không có quyền quyết định sẽ tạo ra một lời hứa bị bội tín ở bước sau.",
          },
          {
            q: "'As a gesture of apology' nghĩa là gì?",
            options: ["Như một cử chỉ xin lỗi", "Như một khoản phạt", "Như một quy định"],
            correct: 0,
            explanation: "Một cử chỉ nhỏ kèm lời xin lỗi có sức nặng hơn nhiều so với lời nói suông.",
          },
        ],
      ),
      game: [
        game(
          "I want a full refund for the whole stay.",
          `I cannot do that myself, but my manager can review it.`,
          `Yes, no problem, I will do it.`,
          `That is impossible. Goodbye.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 29 — Shift Handover
// FRAMES · "I updated the {handover} this morning."
//        · "The {handover} is ready for the next shift."
//        · "I was checking the {handover} when the guest called."
// ============================================================
function week29(lx: Ctx): LessonContent[] {
  const [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12] = lx.bank.handover;
  return [
    lesson(lx, 29, 1, "Handing Over the Shift", "Bàn giao ca", {
      vocabulary: [
        v("Shift", "/ʃɪft/", "Ca làm việc", "My shift ends at three o'clock.", "🕒"),
        v("Update", "/ʌpˈdeɪt/", "Cập nhật", "I updated the list this morning.", "🔄"),
        bw(h1, `I updated the ${lo(h1)} this morning.`),
        bw(h2, `The ${lo(h2)} is ready for the next shift.`),
        bw(h3, `Please check the ${lo(h3)} first.`),
      ],
      grammar: [
        g(`I update already.`, `I updated the ${lo(h1)} this morning.`, "Quá khứ đơn cho việc đã hoàn thành trong ca — ôn lại ngữ pháp tuần 21."),
        g(`Next people see this.`, `The ${lo(h2)} is ready for the next shift.`, "Bàn giao phải nói rõ thứ gì đã sẵn sàng cho ai."),
      ],
      speaking: [
        sp("Anything I should know before you go?", `I updated the ${lo(h1)} this morning. The ${lo(h2)} is ready.`, "Khung vàng tuần này. Bàn giao gọn: cái gì đã làm, cái gì đã sẵn sàng."),
        sp("What should I look at first?", `Please check the ${lo(h3)} first — there is one open request.`, "Chỉ rõ ưu tiên. Bàn giao mà không nói thứ tự thì người sau phải đoán."),
      ],
      reading: read(
        `${lx.staff} meets the evening colleague. He says: "I updated the ${lo(h1)} this morning. The ${lo(h2)} is ready for the next shift. Please check the ${lo(h3)} first." The handover takes two minutes.`,
        [
          {
            q: "Đồng nghiệp nên xem gì trước tiên?",
            options: [h3.definition, h1.definition, h2.definition],
            correct: 0,
            explanation: `"Please check the ${lo(h3)} first" — ưu tiên số một.`,
          },
          {
            q: "Vì sao bàn giao chỉ mất hai phút?",
            options: ["Vì thông tin đã được ghi và sắp xếp sẵn", "Vì không có gì để nói", "Vì nhân viên vội về"],
            correct: 0,
            explanation: "Ghi chép trong ca giúp bàn giao nhanh và không sót việc.",
          },
        ],
      ),
      game: [
        game(
          "I have just arrived. Anything I should know?",
          `I updated the ${lo(h1)} this morning.`,
          `Nothing happened. Good luck.`,
          `Ask someone else, I am leaving.`,
        ),
      ],
    }),

    lesson(lx, 29, 2, "I Was Doing… When…", "Kể lại sự việc đang xảy ra", {
      vocabulary: [
        v("Suddenly", "/ˈsʌdnli/", "Đột nhiên", "Suddenly the guest called.", "⚡"),
        bw(h4, `I was checking the ${lo(h4)} when the guest called.`),
        bw(h5, `We were preparing the ${lo(h5)} at that time.`),
        bw(h6, `The ${lo(h6)} was still open at noon.`),
      ],
      grammar: [
        g(`I check, then guest call.`, `I was checking the ${lo(h4)} when the guest called.`, "Ngữ pháp mới của tuần: quá khứ tiếp diễn + 'when' + quá khứ đơn. Dùng để kể sự cố xen ngang."),
        g(`That time we prepare.`, `We were preparing the ${lo(h5)} at that time.`, "'Were + V-ing' mô tả việc đang diễn ra tại một thời điểm trong quá khứ."),
      ],
      speaking: [
        sp("What were you doing when it happened?", `I was checking the ${lo(h4)} when the guest called.`, "Cấu trúc chuẩn để tường thuật sự cố — quản lý luôn hỏi câu này."),
        sp("And what did you do next?", `I stopped and went to the guest immediately.`, "Lượt hai chuyển sang quá khứ đơn cho hành động tiếp theo."),
      ],
      reading: read(
        `In the log ${lx.staff} writes: "I was checking the ${lo(h4)} when the guest called at 11:40. We were preparing the ${lo(h5)} at that time. The ${lo(h6)} was still open at noon." The manager finds the note clear.`,
        [
          {
            q: "Nhân viên đang làm gì khi khách gọi?",
            options: [h4.definition, h5.definition, h6.definition],
            correct: 0,
            explanation: `"I was checking the ${lo(h4)} when the guest called."`,
          },
          {
            q: "Cấu trúc 'was checking … when … called' dùng để làm gì?",
            options: ["Kể việc đang làm thì bị xen ngang", "Kể kế hoạch tương lai", "Kể thói quen hằng ngày"],
            correct: 0,
            explanation: "Quá khứ tiếp diễn nêu bối cảnh, quá khứ đơn nêu sự việc xen vào.",
          },
        ],
      ),
      game: [
        game(
          "What were you doing when the guest called?",
          `I was checking the ${lo(h4)} when the guest called.`,
          `I check the list and guest call me.`,
          `I do not remember anything.`,
        ),
      ],
    }),

    lesson(lx, 29, 3, "Open Items", "Việc còn dang dở", {
      vocabulary: [
        bw(h7, `The ${lo(h7)} is still not finished.`),
        bw(h8, `Please follow up on the ${lo(h8)} tonight.`),
        bw(h9, `I left a note about the ${lo(h9)}.`),
      ],
      grammar: [
        g(`Not finish yet that one.`, `The ${lo(h7)} is still not finished.`, "'Still not finished' nói rõ trạng thái dang dở, giúp ca sau biết phải tiếp tục."),
        g(`You do this tonight.`, `Please follow up on the ${lo(h8)} tonight.`, "Giao việc cho đồng nghiệp vẫn dùng 'Please' — bàn giao không phải ra lệnh."),
      ],
      speaking: [
        sp("Is there anything still open?", `Yes. The ${lo(h7)} is still not finished. Please follow up tonight.`, "Nói thẳng việc chưa xong. Giấu việc dang dở là cách nhanh nhất làm mất lòng tin đồng nghiệp."),
      ],
      reading: read(
        `${lx.staff} is honest about what is unfinished: "The ${lo(h7)} is still not finished. Please follow up on the ${lo(h8)} tonight. I left a note about the ${lo(h9)}." His colleague thanks him for being clear.`,
        [
          {
            q: "Nhân viên có giấu việc chưa xong không?",
            options: ["Không, nói rõ ra", "Có, để ca sau tự phát hiện", "Không nhắc tới"],
            correct: 0,
            explanation: "'is honest about what is unfinished' — trung thực khi bàn giao là điều kiện để cả đội tin nhau.",
          },
          {
            q: "Nhân viên để lại gì cho ca sau?",
            options: ["Một ghi chú", "Một món quà", "Không gì cả"],
            correct: 0,
            explanation: "'I left a note' — ghi chú viết ra giấy không bị quên như lời nói.",
          },
        ],
      ),
      game: [
        game(
          "Is everything finished before you go home?",
          `No, one task is open. I left a note about it.`,
          `Yes, everything is completely finished.`,
          `I am not sure. Please check it yourself.`,
        ),
      ],
    }),

    lesson(lx, 29, 4, "A Clear Written Log", "Ghi sổ rõ ràng", {
      vocabulary: [
        bw(h10, `I wrote the ${lo(h10)} in the book.`),
        bw(h11, `The ${lo(h11)} shows what happened today.`),
        bw(h12, `Everything is recorded in the ${lo(h12)}.`),
      ],
      grammar: [
        g(`Book I write.`, `I wrote the ${lo(h10)} in the book, sir.`, "Trật tự chuẩn: chủ ngữ + động từ + tân ngữ + nơi chốn."),
        g(`All inside there.`, `Everything is recorded in the ${lo(h12)}.`, "Câu bị động đơn giản 'is recorded' phù hợp khi báo cáo hệ thống ghi nhận."),
      ],
      speaking: [
        sp("Where can I see what happened today?", `Everything is recorded in the ${lo(h12)}, sir.`, "Chỉ đúng chỗ tra cứu — quản lý không phải hỏi lại ai nữa."),
      ],
      reading: read(
        `The duty manager asks for the day's record. ${lx.staff} replies: "I wrote the ${lo(h10)} in the book. The ${lo(h11)} shows what happened today. Everything is recorded in the ${lo(h12)}." Nothing has to be reconstructed from memory.`,
        [
          {
            q: "Vì sao không phải nhớ lại bằng trí nhớ?",
            options: ["Vì mọi việc đã được ghi lại", "Vì không có việc gì xảy ra", "Vì quản lý không hỏi"],
            correct: 0,
            explanation: "'Everything is recorded' — ghi lại ngay trong ca là cách duy nhất để thông tin không bị sai lệch.",
          },
          {
            q: "'Is recorded' là dạng câu gì?",
            options: ["Bị động", "Câu hỏi", "Mệnh lệnh"],
            correct: 0,
            explanation: "Bị động đơn giản dùng khi điều quan trọng là việc được ghi, không phải ai ghi.",
          },
        ],
      ),
      game: [
        game(
          "Where do you keep the record of today?",
          `Everything is recorded in the ${lo(h12)}, sir.`,
          `I remember most of it.`,
          `Nobody writes anything here.`,
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 30 — Checkpoint · Proactive Service
// Pulls the seven functions of weeks 23-29 back together.
// ============================================================
function week30(lx: Ctx): LessonContent[] {
  const [w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12] = lx.bank.wrapUp;
  const u1 = lx.bank.upgrades[0];
  const c1 = lx.bank.commitments[0];
  const t1 = lx.bank.partners[0];
  const s1 = lx.bank.solutions[0];
  return [
    lesson(lx, 30, 1, "Offer and Promise", "Ôn: gợi ý và cam kết", {
      vocabulary: [
        v("Review", "/rɪˈvjuː/", "Xem lại, ôn lại", "Let us review the main points.", "🔁"),
        v("Confident", "/ˈkɒnfɪdənt/", "Tự tin", "I feel confident with guests now.", "💪"),
        bw(w1, `Let me confirm the ${lo(w1)} with you.`),
        bw(w2, `The ${lo(w2)} is part of our service.`),
        bw(w3, `I will note the ${lo(w3)} for you.`),
      ],
      grammar: [
        g(`You take this and I do fast.`, `I recommend the ${lo(u1)}. I will ${lo(c1)} within ten minutes.`, "Ghép hai chức năng đã học: gợi ý (tuần 23) + cam kết thời gian (tuần 25)."),
        g(`Confirm what you want?`, `Let me confirm the ${lo(w1)} with you, madam.`, "Xác nhận lại trước khi hành động — thói quen của nhân viên chuyên nghiệp."),
      ],
      speaking: [
        sp("Could you suggest something and arrange it today?", `I recommend the ${lo(u1)}. I will ${lo(c1)} within ten minutes.`, "Bài kiểm tra tuần này: nối hai chức năng đã học trong một lượt nói."),
        sp("Perfect. Can you confirm the details?", `Of course. Let me confirm the ${lo(w1)} with you now.`, "Lượt hai khép lại bằng xác nhận."),
      ],
      reading: read(
        `A guest wants a suggestion and a fast result. ${lx.staff} answers: "I recommend the ${lo(u1)}. I will ${lo(c1)} within ten minutes. Let me confirm the ${lo(w1)} with you." Both things happen on time.`,
        [
          {
            q: "Nhân viên kết hợp hai kỹ năng nào?",
            options: ["Gợi ý và cam kết thời gian", "Từ chối và xin lỗi", "Ghi sổ và bàn giao"],
            correct: 0,
            explanation: "'I recommend…' (tuần 23) + 'I will … within ten minutes' (tuần 25).",
          },
          {
            q: "Bước cuối cùng là gì?",
            options: ["Xác nhận lại thông tin", "Rời đi ngay", "Gọi quản lý"],
            correct: 0,
            explanation: "'Let me confirm…' — xác nhận trước khi thực hiện tránh làm sai rồi phải làm lại.",
          },
        ],
      ),
      game: [
        game(
          "What do you suggest, and how soon can it be done?",
          `I recommend the ${lo(u1)}, and I will arrange it within ten minutes.`,
          `I recommend something, wait please.`,
          `Choose yourself and tell me later.`,
        ),
      ],
    }),

    lesson(lx, 30, 2, "Explain and Coordinate", "Ôn: giải thích và điều phối", {
      vocabulary: [
        bw(w4, `The ${lo(w4)} is explained in your folder.`),
        bw(w5, `I will pass the ${lo(w5)} to the right team.`),
        bw(w6, `The ${lo(w6)} takes about ten minutes.`),
      ],
      grammar: [
        g(`Rule like that, other people do.`, `We apply this because it is policy. I will check with the ${lo(t1)}.`, "Ghép giải thích quy định (tuần 24) với điều phối (tuần 26)."),
        g(`Ten minute that thing.`, `The ${lo(w6)} takes about ten minutes, sir.`, "'Takes about…' là cách nói thời lượng ước chừng, tự nhiên hơn con số cứng."),
      ],
      speaking: [
        sp("Why is this needed, and who does it?", `We apply this because it is policy. I will check with the ${lo(t1)}.`, "Một câu trả lời cho cả hai câu hỏi của khách — gọn và đầy đủ."),
      ],
      reading: read(
        `Mr. Adeyemi asks both why and who. ${lx.staff} answers in one breath: "We apply this because it is policy. I will check with the ${lo(t1)}. The ${lo(w6)} takes about ten minutes." He is satisfied.`,
        [
          {
            q: "Nhân viên trả lời mấy câu hỏi trong một câu?",
            options: ["Hai: vì sao và ai làm", "Một: chỉ vì sao", "Không câu nào"],
            correct: 0,
            explanation: "Câu hai mệnh đề nối bằng 'and' trả lời trọn vẹn cả hai thắc mắc.",
          },
          {
            q: "'Takes about ten minutes' nghĩa là gì?",
            options: ["Mất khoảng mười phút", "Đúng mười phút không hơn", "Không mất thời gian"],
            correct: 0,
            explanation: "'About' cho phép sai số — hứa ước chừng an toàn hơn hứa chính xác rồi trễ.",
          },
        ],
      ),
      game: [
        game(
          "Who takes care of this, and why is it required?",
          `We apply this because it is policy, and I will check with the team.`,
          `It is the rule. Ask someone else who does it.`,
          `I do not know why, and I do not know who.`,
        ),
      ],
    }),

    lesson(lx, 30, 3, "Apologise and Solve", "Ôn: xin lỗi và giải quyết", {
      vocabulary: [
        bw(w7, `I am sorry about the ${lo(w7)}.`),
        bw(w8, `The ${lo(w8)} will not happen again.`),
        bw(w9, `We keep the ${lo(w9)} for every guest.`),
      ],
      grammar: [
        g(`Sorry, and I fix maybe.`, `I am very sorry, and if you like, I can ${lo(s1)}.`, "Ghép xin lỗi (tuần 27) với đề nghị giải pháp có điều kiện (tuần 28)."),
        g(`Never again this.`, `The ${lo(w8)} will not happen again, madam.`, "Cam kết không tái diễn phải nói rõ ràng, nhưng chỉ hứa khi thật sự làm được."),
      ],
      speaking: [
        sp("This has happened twice now.", `I am very sorry, and if you like, I can ${lo(s1)}.`, "Bài kiểm tra: xin lỗi và đề nghị giải pháp trong cùng một lượt nói."),
      ],
      reading: read(
        `The same problem returns. ${lx.staff} does not repeat old excuses: "I am very sorry, and if you like, I can ${lo(s1)}. The ${lo(w8)} will not happen again." He then writes it in the log so the next shift knows.`,
        [
          {
            q: "Nhân viên làm gì sau khi hứa với khách?",
            options: ["Ghi vào sổ cho ca sau biết", "Quên đi", "Chỉ nói miệng"],
            correct: 0,
            explanation: "Ghi vào sổ (tuần 29) là cách duy nhất để lời hứa sống qua ca làm việc của bạn.",
          },
          {
            q: "Hai kỹ năng nào được ghép lại?",
            options: ["Xin lỗi và đề nghị giải pháp", "Gợi ý và bán hàng", "Bàn giao và nghỉ ca"],
            correct: 0,
            explanation: "'I am very sorry' (tuần 27) + 'if you like, I can…' (tuần 28).",
          },
        ],
      ),
      game: [
        game(
          "This is the second time this has happened.",
          `I am very sorry, and if you like, I can ${lo(s1)}.`,
          `Yes, it happens sometimes here.`,
          `I told you already it is fixed.`,
        ),
      ],
    }),

    lesson(lx, 30, 4, "End of Phase Three", "Kết thúc giai đoạn ba", {
      vocabulary: [
        bw(w10, `I checked the ${lo(w10)} before the end of my shift.`),
        bw(w11, `The ${lo(w11)} is complete for today.`),
        bw(w12, `I am ready for the ${lo(w12)}.`),
      ],
      grammar: [
        g(`Shift finish, all ok.`, `I checked the ${lo(w10)} before the end of my shift.`, "Câu bàn giao chuẩn của tuần 29, dùng lại ở tuần kiểm tra."),
        g(`I can do now these things.`, `I am ready for the ${lo(w12)}, and I feel confident.`, "Tự đánh giá bằng câu hai mệnh đề — chốt lại toàn bộ giai đoạn."),
      ],
      speaking: [
        sp("Do you feel ready for busier shifts now?", `Yes. I checked the ${lo(w10)} today, and I am ready for the ${lo(w12)}.`, "Câu cuối của giai đoạn ba: nói về năng lực của chính mình bằng hai mệnh đề."),
      ],
      reading: read(
        `At the end of the phase ${lx.staff} reviews his own week: "I checked the ${lo(w10)} before the end of my shift. The ${lo(w11)} is complete for today. I am ready for the ${lo(w12)}." His supervisor agrees.`,
        [
          {
            q: "Nhân viên tự đánh giá thế nào?",
            options: ["Đã sẵn sàng cho phần việc khó hơn", "Chưa làm được gì", "Muốn đổi bộ phận"],
            correct: 0,
            explanation: `"I am ready for the ${lo(w12)}" — tự tin dựa trên việc đã hoàn thành, không phải cảm tính.`,
          },
          {
            q: "Giai đoạn ba đã dạy những gì?",
            options: ["Gợi ý, giải thích, cam kết, điều phối, xin lỗi, giải pháp, bàn giao", "Chỉ chào hỏi", "Chỉ đếm số"],
            correct: 0,
            explanation: "Bảy chức năng của tuần 23–29 — toàn bộ kỹ năng dịch vụ chủ động.",
          },
        ],
      ),
      game: [
        game(
          "Do you feel ready to handle the evening shift?",
          `Yes. I checked everything today, and I am ready.`,
          `I think maybe not ready.`,
          `Ready for what, sir?`,
        ),
      ],
    }),
  ];
}

// ============================================================
// Assembly
// ============================================================

const WEEK_META: Record<number, { en: string; vi: string; build: (lx: Ctx) => LessonContent[] }> = {
  23: { en: "Recommending an Upgrade", vi: "Gợi ý nâng cấp dịch vụ", build: week23 },
  24: { en: "Policy & Charges", vi: "Giải thích chính sách & phí", build: week24 },
  25: { en: "Promising a Time", vi: "Cam kết thời gian", build: week25 },
  26: { en: "Working With Other Teams", vi: "Điều phối liên bộ phận", build: week26 },
  27: { en: "Receiving a Complaint", vi: "Tiếp nhận phàn nàn", build: week27 },
  28: { en: "Offering a Solution", vi: "Đề xuất giải pháp", build: week28 },
  29: { en: "Shift Handover", vi: "Bàn giao ca", build: week29 },
  30: { en: "Checkpoint — Proactive Service", vi: "Kiểm tra tổng hợp — Dịch vụ chủ động", build: week30 },
};

/** Headwords a department ACTUALLY meets in a week. Three slots in this
 *  range are served by hand-authored payloads instead of the spine, so
 *  recycling must read those, or it schedules words never taught. */
function headwordsOf(lx: Ctx, week: number, overrides: Record<string, WeekContent>): string[] {
  const override = overrides[`${lx.code}-${week}`];
  const lessons = override ? override.lessons : WEEK_META[week].build(lx);
  return lessons.flatMap((l) => l.vocabulary.map((item) => item.word));
}

/**
 * Same expanding-interval scheme as Phase 2, one level deeper: the long
 * pool is now everything the department met in Phases 0, 1 AND 2, walked
 * across weeks 23-29 so nothing earlier is left unretrieved. Week 30
 * sweeps Phase 3 itself.
 *
 * Phase 3 requires 35% of a week's vocabulary in review (the matrix
 * quota), up from 30% in Phase 2 — so each slice is one word wider.
 */
function reviewWordsFor(
  lx: Ctx,
  week: number,
  priorWords: string[],
  overrides: Record<string, WeekContent>,
): string[] {
  if (week === 30) {
    const all: string[] = [];
    for (let w = 23; w <= 29; w++) all.push(...headwordsOf(lx, w, overrides));
    return Array.from(new Set(all));
  }

  const out: string[] = [];

  const oneBack = week - 1;
  if (oneBack >= 23) out.push(...headwordsOf(lx, oneBack, overrides).slice(0, 5));

  const threeBack = week - 3;
  if (threeBack >= 23) out.push(...headwordsOf(lx, threeBack, overrides).slice(0, 4));

  const slots = 7; // weeks 23..29
  const size = Math.ceil(priorWords.length / slots);
  const start = (week - 23) * size;
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
 * Phase 3 weeks (6 departments × weeks 23-30). Three of these keys are
 * overridden downstream by the hand-authored SW-23, FO-26 and GR-27
 * payloads — see the note at the top of this file.
 */
/** Every headword Phase 3 teaches, in order, per department — the
 *  recycling pool Phase 4 draws its long-spacing slice from. Reads
 *  through the same overrides as the builder, so it reports what the
 *  learner actually met, not what the spine would have taught. */
export function phase3WordsByDep(overrides: Record<string, WeekContent> = {}): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const [code, base] of Object.entries(LEXICONS)) {
    const lx: Ctx = { ...base, bank: P3_BANKS[code] };
    out[code] = [];
    for (let w = 23; w <= 30; w++) out[code].push(...headwordsOf(lx, w, overrides));
  }
  return out;
}

export function buildPhase3(
  priorWordsByDep: Record<string, string[]>,
  /** The hand-authored weeks that replace spine slots in this range. */
  overrides: Record<string, WeekContent> = {},
): Record<string, WeekContent> {
  const out: Record<string, WeekContent> = {};
  for (const [code, base] of Object.entries(LEXICONS)) {
    const lx: Ctx = { ...base, bank: P3_BANKS[code] };
    const prior = priorWordsByDep[code] ?? [];
    for (let w = 23; w <= 30; w++) out[`${code}-${w}`] = buildWeek(lx, w, prior, overrides);
  }
  return out;
}
