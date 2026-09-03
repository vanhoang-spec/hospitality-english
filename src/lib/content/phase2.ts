// ============================================================
// PHASE 2 — A2.1 (weeks 15-22) · docs/curriculum-level-matrix.md
//
// Phase 1 ran at ~70% department-specific with shared frames. Phase 2
// pushes to ~77%: from here only the language FUNCTION is shared — a
// service sequence, an offer, a rule, a past report — while the topic
// and every content word belong to the department.
//
// What changes from A1 to A2.1, pedagogically:
//  · Sentences may carry TWO clauses now (cap 12 words, was 8/one clause).
//  · Speaking becomes a two-turn exchange rather than a single reply.
//  · Past simple arrives in week 21 — the first time learners report on
//    work already done, which is what a shift handover actually needs.
//
// FOUR SLOTS ARE NOT GENERATED HERE. FB-15, HK-15, FO-17 and SW-19 are
// hand-authored weeks that already sit in this range, and they happen to
// match their slot's function well (week 15 = service sequence -> the
// buffet and room-service SOPs; week 19 = rules & safety -> pool safety).
// week-content.ts spreads those AFTER this builder so they win; the
// spine output for those four keys is simply discarded.
// ============================================================

import type { LessonContent, WeekContent } from "./week-content";
import { LEXICONS, game, g, read, sp, v, type P0Lexicon, lockWeekHeadwords } from "./phase0";
import { P2_BANKS, type P2Bank, type P2Word } from "./phase2-lexicon";

type Ctx = P0Lexicon & { bank: P2Bank };

function lesson(
  lx: Ctx,
  week: number,
  order: number,
  titleEn: string,
  titleVi: string,
  parts: Omit<LessonContent, "lessonId" | "lessonOrder" | "titleEn" | "titleVi">,
): LessonContent {
  return {
    lessonId: `${lx.code}_${week}_${order}`,
    lessonOrder: order,
    titleEn,
    titleVi,
    ...parts,
  };
}

function bw(w: P2Word, context: string) {
  return v(w.word, w.phonetic, w.definition, context, w.icon);
}
/** Mid-sentence form of a headword. Acronyms keep their case: "VAT" is how
 *  the word is said and written on a Vietnamese hotel bill, and lowercasing
 *  it shipped "A ten percent vat is added." */
const lo = (w: P2Word) => (/^[A-Z]{2,}$/.test(w.word) ? w.word : w.word.toLowerCase());

/** The headword with the determiner its slot requires — "an upgrade",
 *  "a higher floor", "turndown service". Frames that place a bank word in a
 *  countable noun position MUST use this, never bare `lo()`: dropping the
 *  article there teaches Vietnamese learners the exact L1 error they most
 *  need to unlearn. See the `art` note in phase2-lexicon.ts. */
const wa = (w: P2Word) => {
  const bare = lo(w);
  const art = w.art ?? (/^[aeiou]/i.test(bare) ? "an" : "a");
  return art === "" ? bare : `${art} ${bare}`;
};

/** The headword behind a definite article — except where the headword
 *  already opens with its own determiner ("today's special"), which would
 *  otherwise generate "the today's special". */
const wt = (w: P2Word) =>
  /^(today's|tonight's|tomorrow's)\b/i.test(w.word) ? lo(w) : `the ${lo(w)}`;

// ============================================================
// WEEK 15 — Standard Service Sequence
// FRAMES · "First I {step}, then I {step}."
//         · "After that, we {step}."
// ============================================================
function week15(lx: Ctx): LessonContent[] {
  const [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10] = lx.bank.steps;
  return [
    lesson(lx, 15, 1, "First, Then, After That", "Trình tự: đầu tiên, sau đó", {
      vocabulary: [
        v("First", "/fɜːst/", "Đầu tiên", "First I greet the guest.", "1️⃣"),
        v("Then", "/ðen/", "Sau đó", "Then I check the list.", "2️⃣"),
        bw(a1, `First we ${lo(a1)}, then we continue.`),
        bw(a2, `After that, I ${lo(a2)}.`),
      ],
      grammar: [
        g(
          `I ${lo(a1)} first, after I ${lo(a2)}.`,
          `First I ${lo(a1)}, then I ${lo(a2)}.`,
          "Trình tự chuẩn dùng 'First … then …'. Không dùng 'after' đứng một mình giữa câu.",
        ),
        g(
          `Finish that, I do next thing.`,
          `After that, I move to the next step.`,
          "Cụm nối là 'After that,' có dấu phẩy, rồi mới đến mệnh đề chính.",
        ),
      ],
      speaking: [
        sp(
          "Could you explain how it works?",
          `First I ${lo(a1)}, then I ${lo(a2)}.`,
          "Khung vàng tuần này. Thay hai bước bất kỳ của bộ phận bạn vào để tự luyện.",
        ),
        sp(
          "And what happens after that?",
          `After that, I ${lo(a3)} for the guest.`,
          "Nối bước thứ ba bằng 'After that,' — giữ câu ngắn, đừng gộp ba bước vào một câu.",
        ),
      ],
      reading: read(
        `${lx.staff} explains the routine to a new colleague. "First I ${lo(a1)}, then I ${lo(a2)}. After that, I ${lo(a3)}. We always ${lo(a8)}."`,
        [
          {
            q: "Bước thứ hai là gì?",
            options: [a2.definition, a1.definition, a3.definition],
            correct: 0,
            explanation: `"then I ${lo(a2)}" — bước thứ hai.`,
          },
          {
            q: "Từ nào dùng để nối bước thứ ba?",
            options: ["After that", "Because", "But"],
            correct: 0,
            explanation: "'After that,' là cụm nối trình tự, không phải từ chỉ nguyên nhân.",
          },
        ],
      ),
      game: [
        game(
          "Which step comes second in your routine?",
          `Then I ${lo(a2)}, sir.`,
          `After I ${lo(a2)} second.`,
          `Second ${lo(a2)} is.`,
        ),
      ],
    }),

    lesson(lx, 15, 2, "Polite Instructions", "Hướng dẫn khách lịch sự", {
      vocabulary: [
        v("Step", "/step/", "Bước trong quy trình", "The next step is simple.", "🪜"),
        bw(a4, `Now we ${lo(a4)} for you.`),
        bw(a5, `I will ${lo(a5)} in a moment.`),
      ],
      grammar: [
        g(
          `You wait, I ${lo(a4)}.`,
          `Please wait a moment while I ${lo(a4)}.`,
          "Câu hai mệnh đề nối bằng 'while'. Đây là bước tiến của A2 so với câu đơn ở A1.",
        ),
        g(
          `Come here, sign this.`,
          `Could you come this way, please?`,
          "Mệnh lệnh trần trụi nghe thô. Dùng 'Could you … please?' để mời khách làm gì đó.",
        ),
      ],
      speaking: [
        sp(
          "What should I do now?",
          `Please wait a moment while I ${lo(a4)}.`,
          "Vừa hướng dẫn vừa giải thích lý do — khách chờ mà không thấy khó chịu.",
        ),
        sp(
          "Is there anything I need to do?",
          `Not at all, sir. I will ${lo(a5)} for you.`,
          "Trấn an khách rồi nói việc mình sẽ làm.",
        ),
      ],
      reading: read(
        `A guest is unsure what to do. ${lx.staff} says: "Please wait a moment while I ${lo(a4)}. After that, I will ${lo(a5)} for you." The guest relaxes.`,
        [
          {
            q: "Nhân viên đề nghị khách làm gì?",
            options: ["Chờ một lát", "Tự làm lấy", "Quay lại sau"],
            correct: 0,
            explanation: `"Please wait a moment" — đề nghị khách chờ.`,
          },
          {
            q: "'while' trong câu có tác dụng gì?",
            options: ["Nối hai việc xảy ra cùng lúc", "Chỉ nguyên nhân", "Chỉ sự đối lập"],
            correct: 0,
            explanation: "'while' = trong lúc, nối hai hành động diễn ra đồng thời.",
          },
        ],
      ),
      game: [
        game(
          "Do I need to do anything myself?",
          `No need, madam. I will ${lo(a5)} for you.`,
          `You no need. I ${lo(a5)}.`,
          "You do yourself please.",
        ),
      ],
    }),

    lesson(lx, 15, 3, "Keeping the Order Right", "Giữ đúng thứ tự các bước", {
      vocabulary: [
        bw(a6, `The ${lo(a6)} comes last.`),
        bw(a7, `Do not forget to ${lo(a7)}.`),
        bw(a8, `We always ${lo(a8)}.`),
      ],
      grammar: [
        g(
          `Order is not important.`,
          `The order of the steps is important.`,
          "Danh từ trừu tượng cần mạo từ 'the' và cụm bổ nghĩa: THE ORDER OF THE STEPS.",
        ),
        g(
          `I forget ${lo(a7)} sometimes.`,
          `I sometimes forget to ${lo(a7)}.`,
          "Trạng từ tần suất đứng trước động từ; sau 'forget' dùng 'to + động từ'.",
        ),
      ],
      speaking: [
        sp(
          "Why does the order matter?",
          `If we change the order, we make mistakes.`,
          "Câu điều kiện đơn giản — hai mệnh đề, đúng tầm A2.",
        ),
        sp(
          "What is the last step?",
          `The ${lo(a6)} always comes last, madam.`,
          "Dùng 'always' để nhấn rằng đây là quy tắc cố định.",
        ),
      ],
      reading: read(
        `The supervisor reminds the team: "The order of the steps is important. If we change the order, we make mistakes. The ${lo(a6)} always comes last."`,
        [
          {
            q: "Điều gì xảy ra nếu đổi thứ tự các bước?",
            options: ["Dễ mắc lỗi", "Nhanh hơn", "Không sao cả"],
            correct: 0,
            explanation: `"If we change the order, we make mistakes."`,
          },
          {
            q: "Bước nào luôn đứng cuối?",
            options: [a6.definition, a7.definition, a8.definition],
            correct: 0,
            explanation: `"The ${lo(a6)} always comes last."`,
          },
        ],
      ),
      game: [
        game(
          "Can I skip one step to save time?",
          "I am afraid not. Each step is important.",
          "Yes, skip is faster.",
          "No skip, order important.",
        ),
      ],
    }),

    lesson(lx, 15, 4, "Explaining the Whole Routine", "Trình bày trọn quy trình", {
      vocabulary: [
        bw(a9, `Our ${lo(a9)} has four steps.`),
        bw(a10, `${a10.word} needs attention.`),
      ],
      grammar: [
        g(
          `Our ${lo(a9)} have four step.`,
          `Our ${lo(a9)} has four steps.`,
          "Danh từ số ít đi với 'has'; 'step' số nhiều phải thêm -s.",
        ),
        g(
          `That is all my work.`,
          `That is the whole routine, sir.`,
          "Dùng 'the whole routine' để chốt phần trình bày, nghe chuyên nghiệp hơn.",
        ),
      ],
      speaking: [
        sp(
          "Could you walk me through it?",
          `Of course. Our ${lo(a9)} has four simple steps.`,
          "Mở đầu bằng tổng quan số bước, rồi mới kể chi tiết — người nghe dễ theo.",
        ),
        sp(
          "Thank you, that is very clear.",
          `You are welcome. That is the whole routine.`,
          "Câu chốt gọn gàng sau khi trình bày xong.",
        ),
      ],
      reading: read(
        `A new colleague asks for the full picture. ${lx.staff} answers: "Our ${lo(a9)} has four simple steps. ${a10.word} needs attention at every stage. That is the whole routine."`,
        [
          {
            q: "Quy trình gồm mấy bước?",
            options: ["Bốn", "Hai", "Sáu"],
            correct: 0,
            explanation: `"has four simple steps".`,
          },
          {
            q: "Nên mở đầu phần trình bày bằng gì?",
            options: ["Tổng quan số bước", "Chi tiết bước cuối", "Lời xin lỗi"],
            correct: 0,
            explanation: "Nêu tổng quan trước giúp người nghe dễ theo dõi.",
          },
        ],
      ),
      game: [
        game(
          "How complicated is the process?",
          `It is simple, sir. Our ${lo(a9)} has four steps.`,
          `Not complicate. Four step only.`,
          "Very difficult for you.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 16 — Offers & Invitations
// FRAMES · "Would you like {offer}?"
//         · "May I offer you {offer}?"
// ============================================================
function week16(lx: Ctx): LessonContent[] {
  const [o1, o2, o3, o4, o5, o6, o7, o8, o9, o10] = lx.bank.offers;
  return [
    lesson(lx, 16, 1, "Would You Like…?", "Mời khách bằng 'Would you like…?'", {
      vocabulary: [
        v("Offer", "/ˈɒfə/", "Đề nghị, mời", "May I offer you a drink?", "🎁"),
        v("Extra", "/ˈekstrə/", "Thêm, phụ trội", "Would you like an extra one?", "➕"),
        bw(o1, `Would you like ${wa(o1)}?`),
        bw(o2, `We also have ${wa(o2)}.`),
      ],
      grammar: [
        g(
          `You want ${lo(o1)}?`,
          `Would you like ${wa(o1)}, sir?`,
          "'Would you like…?' là mẫu mời chuẩn mực. 'You want…?' nghe như tra hỏi. Lưu ý mạo từ A/AN trước danh từ đếm được — tiếng Việt không có mạo từ nên rất dễ quên.",
        ),
        g(
          `I give you ${lo(o2)}.`,
          `May I offer you ${wa(o2)}?`,
          "Xin phép mời dùng 'May I offer you…?' — lịch sự hơn 'I give you'. Danh từ đếm được vẫn cần A/AN đứng trước.",
        ),
      ],
      speaking: [
        sp(
          "What do you have available?",
          `Would you like ${wa(o1)}, madam?`,
          "Khung vàng tuần này — thay bất kỳ dịch vụ nào của bộ phận bạn vào, nhớ giữ mạo từ.",
        ),
        sp(
          "That sounds good, yes please.",
          `Certainly. I will arrange it right away.`,
          "Nhận lời rồi cam kết hành động ngay.",
        ),
      ],
      reading: read(
        `${lx.staff} sees a chance to help. "Would you like ${wa(o1)}, madam? We also have ${wa(o2)}." The guest smiles and says: "Yes, please."`,
        [
          {
            q: "Nhân viên mời khách dùng gì trước?",
            options: [o1.definition, o2.definition, "Không mời gì"],
            correct: 0,
            explanation: `"Would you like ${wa(o1)}?" là lời mời đầu tiên.`,
          },
          {
            q: "Mẫu câu nào lịch sự nhất khi mời?",
            options: ["Would you like…?", "You want…?", "Take this."],
            correct: 0,
            explanation: "'Would you like…?' là chuẩn mời trong ngành khách sạn.",
          },
        ],
      ),
      game: [
        game(
          "Is there anything you recommend?",
          `Would you like ${wa(o1)}, sir?`,
          `You want ${lo(o1)}?`,
          `I give ${lo(o1)} you.`,
        ),
      ],
    }),

    lesson(lx, 16, 2, "Explaining What Is Included", "Giải thích những gì đã bao gồm", {
      vocabulary: [
        bw(o3, `${wt(o3)} is very popular.`),
        bw(o8, `${wt(o8)} is free for our guests.`),
        bw(o10, `The price includes ${lo(o10)}.`),
      ],
      grammar: [
        g(
          `This no money.`,
          `${wt(o8)} is free for you, madam.`,
          "Nói miễn phí cần câu đủ: THE + danh từ + IS FREE. Không nói 'no money'.",
        ),
        g(
          `Price include breakfast.`,
          `The price includes breakfast, sir.`,
          "Chủ ngữ số ít 'the price' đi với 'includes' có -s.",
        ),
      ],
      speaking: [
        sp(
          "Is there an extra charge for that?",
          `No, madam. ${wt(o8)} is free for our guests.`,
          "Trả lời rõ ràng về phí ngay từ đầu — tránh hiểu lầm khi thanh toán.",
        ),
        sp(
          "What exactly does it include?",
          `The price includes ${lo(o10)} and service.`,
          "Liệt kê tối đa hai thứ trong một câu; nhiều hơn thì tách câu.",
        ),
      ],
      reading: read(
        `A guest worries about the cost. ${lx.staff} explains: "${wt(o8)} is free for our guests, sir. The price also includes ${lo(o10)}." The guest is pleased.`,
        [
          {
            q: "Khách có phải trả thêm tiền không?",
            options: ["Không, đã miễn phí", "Có, trả thêm", "Chưa rõ"],
            correct: 0,
            explanation: `"${wt(o8)} is free for our guests" — miễn phí.`,
          },
          {
            q: "Vì sao nên nói rõ về phí ngay từ đầu?",
            options: ["Tránh hiểu lầm khi thanh toán", "Để khách chờ lâu", "Để bán thêm"],
            correct: 0,
            explanation: "Minh bạch chi phí là nguyên tắc cơ bản của dịch vụ tốt.",
          },
        ],
      ),
      game: [
        game(
          "Will this cost me anything extra?",
          `Not at all, sir. ${wt(o8)} is free.`,
          "This no money for you.",
          "Maybe some money yes.",
        ),
      ],
    }),

    lesson(lx, 16, 3, "Offering an Alternative", "Đề xuất phương án thay thế", {
      vocabulary: [
        bw(o4, `We could arrange ${wa(o4)} instead.`),
        bw(o5, `We can also offer ${wa(o5)}.`),
        bw(o9, `That part is ${lo(o9)}.`),
      ],
      grammar: [
        g(
          `No have. Other thing?`,
          `We do not have that, but we could offer ${wa(o4)}.`,
          "Câu hai mệnh đề nối bằng 'but' — báo tin xấu rồi mở ngay lối khác.",
        ),
        g(
          `Maybe you take ${lo(o5)}.`,
          `Perhaps you would prefer ${wa(o5)}?`,
          "'Perhaps you would prefer…?' là cách gợi ý nhã nhặn, không áp đặt. Giữ mạo từ A/AN trước danh từ đếm được.",
        ),
      ],
      speaking: [
        sp(
          "Do you have that available today?",
          `Not today, but we could offer ${wa(o4)}.`,
          "Không có thì đừng dừng ở lời từ chối — luôn kèm một lựa chọn khác.",
        ),
        sp(
          "Hmm, what else could work?",
          `Perhaps you would prefer ${wa(o5)}, madam?`,
          "Dùng 'Perhaps' để gợi ý mà vẫn để khách toàn quyền quyết định.",
        ),
      ],
      reading: read(
        `The first choice is not available. ${lx.staff} says: "We do not have that today, but we could offer ${wa(o4)}. Perhaps you would prefer ${wa(o5)}?"`,
        [
          {
            q: "Khi thứ khách muốn không có, nên làm gì?",
            options: ["Đề xuất phương án thay thế", "Chỉ nói không có", "Im lặng"],
            correct: 0,
            explanation: "Luôn kèm lựa chọn khác để khách vẫn được phục vụ.",
          },
          {
            q: "Từ nối nào dùng để mở lối khác sau tin xấu?",
            options: ["but", "so", "because"],
            correct: 0,
            explanation: "'but' nối mệnh đề trái ngược: không có… nhưng chúng tôi có thể…",
          },
        ],
      ),
      game: [
        game(
          "So there is nothing you can do?",
          `We could offer ${wa(o4)} instead, sir.`,
          `No have. Other thing?`,
          "Nothing possible today.",
        ),
      ],
    }),

    lesson(lx, 16, 4, "Closing the Offer", "Chốt lời mời", {
      vocabulary: [bw(o6, `Shall I arrange ${wa(o6)}?`), bw(o7, `${wt(o7)} is ready for you.`)],
      grammar: [
        g(
          `I do it now ok?`,
          `Shall I arrange that for you now?`,
          "'Shall I…?' là mẫu xin phép hành động, rất hay dùng khi chốt dịch vụ.",
        ),
        g(
          `You happy this?`,
          `Would that be suitable for you?`,
          "Câu hỏi xác nhận trang trọng: 'Would that be suitable?'",
        ),
      ],
      speaking: [
        sp(
          "Yes, I think that would be nice.",
          `Shall I arrange ${wa(o6)} for you now?`,
          "Chốt bằng câu xin phép — khách chỉ cần gật đầu là xong.",
        ),
        sp(
          "Perfect, please go ahead.",
          `Certainly. ${wt(o7)} will be ready shortly.`,
          "Xác nhận lại kèm mốc thời gian để khách yên tâm.",
        ),
      ],
      reading: read(
        `The guest agrees. ${lx.staff} confirms: "Shall I arrange ${wa(o6)} for you now?" The guest nods. "Certainly. ${wt(o7)} will be ready shortly, madam."`,
        [
          {
            q: "Câu 'Shall I…?' dùng để làm gì?",
            options: ["Xin phép làm việc gì đó", "Từ chối khách", "Hỏi giá"],
            correct: 0,
            explanation: "'Shall I…?' là mẫu xin phép hành động thay cho khách.",
          },
          {
            q: "Sau khi khách đồng ý nên nói gì?",
            options: ["Xác nhận kèm mốc thời gian", "Không nói gì", "Hỏi lại từ đầu"],
            correct: 0,
            explanation: "Cho khách biết khi nào xong giúp họ yên tâm chờ.",
          },
        ],
      ),
      game: [
        game(
          "Yes please, that would be lovely.",
          "Certainly, madam. I will arrange it now.",
          "I do it now ok?",
          "You wait long time.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 17 — Asking For & Confirming Guest Details
// FRAMES · "Could I have your {detail}, please?"
//         · "So that is {detail}, correct?"
// ============================================================
function week17(lx: Ctx): LessonContent[] {
  const [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10] = lx.bank.details;
  return [
    lesson(lx, 17, 1, "Could I Have…?", "Xin thông tin bằng 'Could I have…?'", {
      vocabulary: [
        v("Accurate", "/ˈækjərət/", "Chuẩn xác", "The information must be accurate.", "🎯"),
        v("Clearly", "/ˈklɪəli/", "Rõ ràng", "Please say it clearly.", "🔊"),
        bw(d1, `Could I have your ${lo(d1)}?`),
        bw(d2, `May I ask about your ${lo(d2)}?`),
      ],
      grammar: [
        g(
          `Give me your ${lo(d1)}.`,
          `Could I have your ${lo(d1)}, please?`,
          "Xin thông tin của khách luôn dùng 'Could I have…, please?'.",
        ),
        g(
          `What your ${lo(d2)}?`,
          `May I ask about your ${lo(d2)}, madam?`,
          "Câu hỏi cần trợ động từ. 'May I ask…' mềm hơn hỏi trống không.",
        ),
      ],
      speaking: [
        sp(
          "Sure, what do you need from me?",
          `Could I have your ${lo(d1)}, please?`,
          "Khung vàng tuần này. Thay bất kỳ thông tin nào bộ phận bạn cần hỏi.",
        ),
        sp(
          "It is Robert Miller.",
          `Thank you. And may I ask your ${lo(d2)}?`,
          "Cảm ơn trước rồi mới hỏi tiếp — nhịp hỏi thông tin dễ chịu hơn nhiều.",
        ),
      ],
      reading: read(
        `${lx.staff} needs some information. "Could I have your ${lo(d1)}, please? Thank you. And may I ask your ${lo(d2)}?" The guest answers politely.`,
        [
          {
            q: "Nhân viên hỏi thông tin đầu tiên là gì?",
            options: [d1.definition, d2.definition, "Số phòng"],
            correct: 0,
            explanation: `"Could I have your ${lo(d1)}?" là câu hỏi đầu tiên.`,
          },
          {
            q: "Vì sao nên cảm ơn giữa các câu hỏi?",
            options: ["Nhịp hỏi dễ chịu hơn", "Cho đủ thời gian", "Không có lý do"],
            correct: 0,
            explanation: "Cảm ơn sau mỗi câu trả lời khiến khách không thấy như bị thẩm vấn.",
          },
        ],
      ),
      game: [
        game(
          "What information do you need?",
          `Could I have your ${lo(d1)}, please?`,
          `Give me your ${lo(d1)}.`,
          `What your ${lo(d1)}?`,
        ),
      ],
    }),

    lesson(lx, 17, 2, "Reading Information Back", "Đọc lại thông tin để xác nhận", {
      vocabulary: [
        bw(d6, `May I check your ${lo(d6)}, sir?`),
        bw(d7, `Let me check the ${lo(d7)}.`),
        bw(d9, `The ${lo(d9)} is confirmed.`),
      ],
      grammar: [
        g(
          `Correct or no?`,
          `So that is correct, madam?`,
          "Câu xác nhận chuẩn: 'So that is …, correct?' — không hỏi cụt 'Correct or no?'.",
        ),
        g(
          `I say wrong you tell me.`,
          `Please correct me if I am wrong.`,
          "Câu điều kiện hai mệnh đề, đúng tầm A2: mệnh lệnh lịch sự + 'if'.",
        ),
      ],
      speaking: [
        sp(
          "Yes, that is what I said.",
          `Thank you. Let me read that back to you.`,
          "Đọc lại thông tin là bước bắt buộc — sai một chữ có thể hỏng cả đơn.",
        ),
        sp(
          "Actually, the second part is wrong.",
          `I am sorry. Please correct me.`,
          "Sai thì xin lỗi ngắn và mời khách sửa, đừng thanh minh.",
        ),
      ],
      reading: read(
        `${lx.staff} repeats the information carefully. "Let me read that back to you. Please ${lo(d7)} if I am wrong." The guest confirms everything is ${lo(d9)}.`,
        [
          {
            q: "Vì sao phải đọc lại thông tin cho khách?",
            options: [
              "Sai một chữ có thể hỏng cả đơn",
              "Để kéo dài thời gian",
              "Vì quản lý yêu cầu",
            ],
            correct: 0,
            explanation: "Xác nhận lại là hàng rào cuối cùng chặn sai sót.",
          },
          {
            q: "Khi ghi sai, nên phản ứng thế nào?",
            options: [
              "Xin lỗi ngắn và mời khách sửa",
              "Giải thích dài dòng",
              "Bảo khách nói lại từ đầu",
            ],
            correct: 0,
            explanation: "Xin lỗi gọn rồi sửa ngay là cách chuyên nghiệp.",
          },
        ],
      ),
      game: [
        game(
          "Did you get all of that?",
          "Let me read that back to you, sir.",
          "Correct or no?",
          "I write already finish.",
        ),
      ],
    }),

    lesson(lx, 17, 3, "Spelling & Precision", "Đánh vần & độ chính xác", {
      vocabulary: [
        bw(d3, `Could I have your ${lo(d3)}?`),
        bw(d5, `And your ${lo(d5)}, please?`),
        bw(d8, `The ${lo(d8)} is important.`),
      ],
      grammar: [
        g(
          `Spell please slow.`,
          `Could you spell that slowly, please?`,
          "Trạng từ 'slowly' đứng sau động từ; câu đề nghị vẫn cần 'Could you … please?'.",
        ),
        g(
          `I check two time.`,
          `Let me double-check that for you.`,
          "'Let me double-check' là cách nói chuyên nghiệp khi cần kiểm tra lại.",
        ),
      ],
      speaking: [
        sp(
          "It is spelled N-G-U-Y-E-N.",
          `Thank you. Let me double-check that for you.`,
          "Nghe xong luôn kiểm tra lại — tên riêng là chỗ dễ sai nhất.",
        ),
        sp(
          "Could you repeat that back?",
          `Certainly. Could you spell it slowly, please?`,
          "Nhờ khách đánh vần chậm không hề bất lịch sự — sai tên mới bất lịch sự.",
        ),
      ],
      reading: read(
        `The name is difficult. ${lx.staff} asks: "Could you spell that slowly, please?" Then: "Thank you. Let me read the ${lo(d8)} back to you." Nothing is wrong.`,
        [
          {
            q: "Khi tên khách khó nghe, nên làm gì?",
            options: ["Nhờ khách đánh vần chậm", "Đoán rồi ghi đại", "Bỏ trống"],
            correct: 0,
            explanation: "Nhờ đánh vần là chuẩn mực; ghi sai tên mới là lỗi nặng.",
          },
          {
            q: "'Double-check' nghĩa là gì?",
            options: ["Kiểm tra lại lần nữa", "Ký hai lần", "Đếm hai lần"],
            correct: 0,
            explanation: "double-check = kiểm tra lại cho chắc.",
          },
        ],
      ),
      game: [
        game(
          "My surname is quite unusual.",
          "Could you spell it slowly, please?",
          "Spell please slow.",
          "No problem, I guess it.",
        ),
      ],
    }),

    lesson(lx, 17, 4, "Recording the Details", "Ghi lại thông tin", {
      vocabulary: [
        bw(d4, `Could I have your ${lo(d4)}?`),
        bw(d10, `I will note the ${lo(d10)} for you.`),
      ],
      grammar: [
        g(
          `I write your ${lo(d4)} now.`,
          `I am writing your ${lo(d4)} down now.`,
          "Việc đang làm ngay lúc nói dùng hiện tại tiếp diễn: I AM WRITING.",
        ),
        g(
          `All finish, thank you.`,
          `That is everything, thank you very much.`,
          "Câu chốt đầy đủ: 'That is everything' thay cho 'All finish'.",
        ),
      ],
      speaking: [
        sp(
          "Do you need anything else from me?",
          `Just your ${lo(d4)}, and that is everything.`,
          "Gom nốt thông tin còn thiếu vào một câu — đừng hỏi rời rạc nhiều lần.",
        ),
        sp(
          "Here you are.",
          `Thank you. I am writing it down now.`,
          "Nói ra việc mình đang làm giúp khách biết mình không bị bỏ quên.",
        ),
      ],
      reading: read(
        `The last detail is needed. ${lx.staff} says: "Just your ${lo(d4)}, and that is everything." The guest gives it. "Thank you. I am writing it down now."`,
        [
          {
            q: "Vì sao nên gom câu hỏi còn lại vào một lần?",
            options: [
              "Khách không phải trả lời rời rạc nhiều lần",
              "Để tiết kiệm giấy",
              "Không có lý do",
            ],
            correct: 0,
            explanation: "Hỏi gọn một lần thể hiện sự chuẩn bị và tôn trọng thời gian khách.",
          },
          {
            q: "Câu 'I am writing it down' dùng thì gì?",
            options: ["Hiện tại tiếp diễn", "Quá khứ đơn", "Tương lai"],
            correct: 0,
            explanation: "am/is/are + V-ing = việc đang diễn ra ngay lúc nói.",
          },
        ],
      ),
      game: [
        game(
          "Is that all you need?",
          "That is everything, madam. Thank you.",
          "All finish, thank you.",
          "Maybe more later I ask.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 18 — Paperwork & Payment
// FRAMES · "I am {verb}ing your {document} now."
//         · "You need to {verb} here."
// ============================================================
function week18(lx: Ctx): LessonContent[] {
  const [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10] = lx.bank.paperwork;
  return [
    lesson(lx, 18, 1, "I Am Preparing It Now", "Đang xử lý giấy tờ", {
      vocabulary: [
        v("Issue", "/ˈɪʃuː/", "Cấp, phát hành (giấy tờ)", "We issue the card today.", "📤"),
        v("Document", "/ˈdɒkjumənt/", "Chứng từ, tài liệu", "The document is ready.", "📄"),
        bw(p1, `I am preparing your ${lo(p1)}.`),
        bw(p9, `Your request is ${lo(p9)}.`),
      ],
      grammar: [
        g(
          `I prepare your ${lo(p1)} now.`,
          `I am preparing your ${lo(p1)} now.`,
          "Việc đang làm ngay lúc này: am/is/are + V-ing, không dùng hiện tại đơn.",
        ),
        g(
          `Wait, system slow.`,
          // Slot 8 is a REQUEST status ("in progress", "on hold",
          // "confirmed", "with the team"), so predicating it of the system
          // gave "The system is confirmed." / "The system is with the team."
          // The vocab card one lesson up already frames it correctly.
          `One moment, please. Your request is ${lo(p9)}.`,
          "Giải thích lý do chờ bằng câu đủ — khách chờ có lý do thì kiên nhẫn hơn.",
        ),
      ],
      speaking: [
        sp(
          "How long will the paperwork take?",
          `Just a moment. I am preparing your ${lo(p1)}.`,
          "Khung vàng: nói rõ mình ĐANG làm gì, khách sẽ không sốt ruột.",
        ),
        sp(
          "Is there a problem?",
          `No problem at all. Your request is ${lo(p9)}.`,
          "Trấn an trước, giải thích sau — đừng để khách tự đoán.",
        ),
      ],
      reading: read(
        `The guest waits at the desk. ${lx.staff} says: "Just a moment, sir. I am preparing your ${lo(p1)}. Your request is ${lo(p9)} now." The guest waits calmly.`,
        [
          {
            q: "Nhân viên đang làm gì?",
            options: [`Chuẩn bị ${p1.definition.toLowerCase()}`, "Đi nghỉ", "Gọi điện"],
            correct: 0,
            explanation: `"I am preparing your ${lo(p1)}."`,
          },
          {
            q: "Vì sao nên nói rõ mình đang làm gì?",
            options: [
              "Khách chờ có lý do sẽ kiên nhẫn hơn",
              "Để khoe việc",
              "Để kéo dài thời gian",
            ],
            correct: 0,
            explanation: "Im lặng khiến khách tưởng bị bỏ quên; nói ra tiến trình giúp họ yên tâm.",
          },
        ],
      ),
      game: [
        game(
          "Why is it taking so long?",
          `I am preparing your ${lo(p1)} now, sir.`,
          `Wait, system slow.`,
          "I do not know why.",
        ),
      ],
    }),

    lesson(lx, 18, 2, "You Need to Sign Here", "Hướng dẫn khách ký giấy tờ", {
      vocabulary: [
        bw(p10, `Please ${lo(p10)} on this line.`),
        bw(p2, `May I have your ${lo(p2)}?`),
        bw(p3, `Is the ${lo(p3)} correct?`),
      ],
      grammar: [
        g(
          `You sign here.`,
          `You need to sign here, please.`,
          "'need to + động từ' làm câu hướng dẫn nhẹ nhàng hơn mệnh lệnh trần.",
        ),
        g(
          `This ${lo(p3)} right?`,
          `Is the ${lo(p3)} correct, madam?`,
          "Câu hỏi Yes/No bắt đầu bằng 'Is', kèm mạo từ 'the'.",
        ),
      ],
      speaking: [
        sp(
          "Where exactly do I sign?",
          `You need to sign here, on this line.`,
          "Chỉ chính xác vị trí — vừa nói vừa chỉ bằng cả bàn tay.",
        ),
        sp(
          "Is my company name right?",
          `Let me check. Is the ${lo(p3)} correct?`,
          "Xác nhận lại thông tin trên giấy tờ trước khi khách ký.",
        ),
      ],
      reading: read(
        `${lx.staff} hands over the form. "You need to sign here, please. Is the ${lo(p3)} correct?" The guest checks and signs the paper.`,
        [
          {
            q: "Khách cần làm gì với tờ giấy?",
            options: ["Ký tên", "Xé bỏ", "Mang về"],
            correct: 0,
            explanation: `"You need to sign here, please."`,
          },
          {
            q: "'need to' làm câu trở nên thế nào?",
            options: ["Nhẹ nhàng hơn mệnh lệnh", "Gay gắt hơn", "Không đổi gì"],
            correct: 0,
            explanation: "'You need to sign' mềm hơn 'Sign here!' rất nhiều.",
          },
        ],
      ),
      game: [
        game(
          "Do I have to fill in everything?",
          "Only this part, madam. You need to sign here.",
          "You sign here.",
          "Yes, all page write.",
        ),
      ],
    }),

    lesson(lx, 18, 3, "Money & Charges", "Tiền bạc & các khoản phí", {
      vocabulary: [
        // The article has to follow the SOUND of whatever fills the slot —
        // hardcoding "A" gave "A arrangement fee is added." wa() is the
        // helper that already knows this; the "ten percent" variants below
        // keep their literal "A" because a number always follows it.
        bw(p5, `${wa(p5).charAt(0).toUpperCase()}${wa(p5).slice(1)} is added.`),
        bw(p6, `Which ${lo(p6)} would you prefer?`),
        bw(p8, `You can ${lo(p8)} now.`),
      ],
      grammar: [
        g(
          `Plus ten percent more.`,
          `A ten percent ${lo(p5)} is added.`,
          "Câu bị động đơn giản: A … IS ADDED. Nói rõ khoản phí, tránh mơ hồ về tiền.",
        ),
        g(
          `You pay how?`,
          `How would you like to pay, sir?`,
          "Hỏi hình thức thanh toán chuẩn mực: 'How would you like to pay?'",
        ),
      ],
      speaking: [
        sp(
          "What is this extra amount?",
          `A ten percent ${lo(p5)} is added, madam.`,
          "Nói về tiền phải rõ ràng, đủ câu — mơ hồ về phí là nguồn phàn nàn số một.",
        ),
        sp(
          "I will pay by card.",
          `Certainly. You can ${lo(p8)} at any time.`,
          "Xác nhận hình thức khách chọn rồi hướng dẫn bước tiếp.",
        ),
      ],
      reading: read(
        `The guest asks about an extra line on the bill. ${lx.staff} explains: "A ten percent ${lo(p5)} is added, sir. You can ${lo(p8)} whenever you are ready."`,
        [
          {
            q: "Khoản thêm trên hóa đơn là gì?",
            options: [p5.definition, "Tiền phòng", "Tiền phạt"],
            correct: 0,
            explanation: `"A ten percent ${lo(p5)} is added."`,
          },
          {
            q: "Vì sao phải nói rõ về các khoản phí?",
            options: [
              "Mơ hồ về phí là nguồn phàn nàn lớn nhất",
              "Để tính thêm tiền",
              "Không quan trọng",
            ],
            correct: 0,
            explanation: "Minh bạch tài chính là điều kiện tiên quyết của lòng tin.",
          },
        ],
      ),
      game: [
        game(
          "What is this charge on my bill?",
          `That is the ${lo(p5)}, sir. Ten percent.`,
          "Plus ten percent more.",
          "I am not sure sorry.",
        ),
      ],
    }),

    lesson(lx, 18, 4, "Copies & Records", "Bản sao & lưu hồ sơ", {
      vocabulary: [bw(p7, `Here is your ${lo(p7)}.`), bw(p4, `The ${lo(p4)} is on file.`)],
      grammar: [
        g(
          `I keep one, you keep one.`,
          `We keep one copy and you keep one.`,
          "Hai mệnh đề nối bằng 'and'. Cần chủ ngữ đầy đủ 'We' và 'you'.",
        ),
        g(
          `Paper for you here.`,
          `Here is your ${lo(p7)}, madam.`,
          "Trao giấy tờ cho khách nói 'Here is your…' kèm cử chỉ hai tay.",
        ),
      ],
      speaking: [
        sp(
          "Do I get a copy of this?",
          `Of course. Here is your ${lo(p7)}, sir.`,
          "Luôn chủ động đưa bản sao cho khách, đừng đợi họ hỏi.",
        ),
        sp(
          "And you keep the original?",
          `Yes. We keep one copy and you keep one.`,
          "Giải thích rõ ai giữ bản nào để khách không lo lắng về giấy tờ.",
        ),
      ],
      reading: read(
        `The paperwork is finished. ${lx.staff} says: "Here is your ${lo(p7)}, madam. We keep one copy and you keep one. The ${lo(p4)} is on file."`,
        [
          {
            q: "Khách nhận được gì?",
            options: [p7.definition, "Không nhận gì", "Toàn bộ hồ sơ"],
            correct: 0,
            explanation: `"Here is your ${lo(p7)}."`,
          },
          {
            q: "Nên chủ động đưa bản sao hay đợi khách hỏi?",
            options: ["Chủ động đưa", "Đợi khách hỏi", "Không cần đưa"],
            correct: 0,
            explanation: "Chủ động đưa bản sao thể hiện sự minh bạch và chuyên nghiệp.",
          },
        ],
      ),
      game: [
        game(
          "Should I keep this paper?",
          `Yes, madam. That is your ${lo(p7)}.`,
          "I keep one, you keep one.",
          "You can throw away.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 19 — Rules & Safety
// FRAMES · "You must {rule}."  · "Please do not {rule}."
// ============================================================
function week19(lx: Ctx): LessonContent[] {
  const [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10] = lx.bank.rules;
  return [
    lesson(lx, 19, 1, "You Must / You Must Not", "Bắt buộc & cấm: must / must not", {
      vocabulary: [
        v("Must", "/mʌst/", "Bắt buộc phải", "You must wear shoes.", "❗"),
        v("Safety", "/ˈseɪfti/", "Sự an toàn", "It is for your safety.", "🛡️"),
        bw(r1, `Please respect the ${lo(r1)}.`),
        bw(r10, `This is a hotel ${lo(r10)}.`),
      ],
      grammar: [
        g(
          `You must to wear it.`,
          `You must wear it, sir.`,
          "Sau 'must' là động từ nguyên mẫu KHÔNG có 'to': must WEAR, không phải 'must to wear'.",
        ),
        g(
          `No allowed here.`,
          `I am afraid that is not allowed here.`,
          "Báo điều cấm cần mở đầu bằng 'I am afraid' để giảm cảm giác bị mắng.",
        ),
      ],
      speaking: [
        sp(
          "Can I bring this inside?",
          `I am afraid that is not allowed, sir.`,
          "Khung vàng: 'I am afraid' + điều cấm. Từ chối mà không làm khách mất mặt.",
        ),
        sp(
          "Why is that a rule here?",
          `It is a hotel ${lo(r10)}, for everyone's safety.`,
          "Luôn kèm lý do — khách chấp nhận quy định dễ hơn nhiều khi hiểu vì sao.",
        ),
      ],
      reading: read(
        `A guest asks about a restriction. ${lx.staff} answers: "I am afraid that is not allowed, madam. It is a hotel ${lo(r10)}, for everyone's safety."`,
        [
          {
            q: "Nhân viên mở đầu lời từ chối bằng cụm nào?",
            options: ["I am afraid", "No allowed", "You cannot"],
            correct: 0,
            explanation: "'I am afraid' làm lời từ chối mềm đi đáng kể.",
          },
          {
            q: "Vì sao nên giải thích lý do của quy định?",
            options: [
              "Khách dễ chấp nhận hơn khi hiểu vì sao",
              "Để nói cho dài",
              "Vì luật bắt buộc",
            ],
            correct: 0,
            explanation: "Quy định có lý do nghe như bảo vệ, không phải như cấm đoán.",
          },
        ],
      ),
      game: [
        game(
          "Is it okay if I do this here?",
          "I am afraid that is not allowed, sir.",
          "No allowed here.",
          "Yes, no problem do it.",
        ),
      ],
    }),

    lesson(lx, 19, 2, "Safety Warnings", "Cảnh báo an toàn", {
      vocabulary: [
        bw(r4, `The ${lo(r4)} is over there.`),
        bw(r5, `Do not touch the ${lo(r5)}.`),
        bw(r9, `May I remind you of the ${lo(r9)}?`),
      ],
      grammar: [
        g(
          `Careful! Danger there!`,
          `Please be careful. That area is not safe.`,
          "Cảnh báo lịch sự: 'Please be careful' rồi mới nói lý do, giọng bình tĩnh.",
        ),
        g(
          `I remind you the rule.`,
          `May I remind you of the ${lo(r9)}?`,
          "Sau 'remind' cần giới từ 'of': remind you OF the rule.",
        ),
      ],
      speaking: [
        sp(
          "What is that alarm for?",
          `That is the ${lo(r4)}, madam. Please do not touch it.`,
          "Chỉ rõ vị trí thiết bị an toàn cho khách — nhiều khách không để ý.",
        ),
        sp(
          "I did not know about that.",
          `May I remind you of the ${lo(r9)}, madam?`,
          "Nhắc quy định bằng câu xin phép, không bằng giọng dạy dỗ.",
        ),
      ],
      reading: read(
        `${lx.staff} points to the equipment. "That is the ${lo(r4)}, sir. Please do not touch the ${lo(r5)}." The guest thanks ${lx.staff} for the warning.`,
        [
          {
            q: "Khách được dặn không chạm vào gì?",
            options: [r5.definition, r4.definition, "Cửa ra vào"],
            correct: 0,
            explanation: `"Please do not touch the ${lo(r5)}."`,
          },
          {
            q: "Giọng điệu khi cảnh báo nên thế nào?",
            options: ["Bình tĩnh, lịch sự", "To và gấp gáp", "Trách móc"],
            correct: 0,
            explanation: "Bình tĩnh giúp khách hợp tác; hoảng hốt làm khách sợ.",
          },
        ],
      ),
      game: [
        game(
          "Can I have a look at that equipment?",
          "Please do not touch it, sir. It is for emergencies.",
          "Careful! Danger there!",
          "Yes, you can touch.",
        ),
      ],
    }),

    lesson(lx, 19, 3, "House Rules for Guests", "Nội quy dành cho khách", {
      vocabulary: [
        bw(r2, `Our ${lo(r2)} is simple.`),
        bw(r3, `The ${lo(r3)} is outside.`),
        bw(r7, `Please use the ${lo(r7)}.`),
      ],
      grammar: [
        g(
          `Smoking only outside.`,
          `Smoking is only allowed outside, sir.`,
          "Câu bị động đủ chủ ngữ: Smoking IS ONLY ALLOWED outside.",
        ),
        g(
          `Rule say two person only.`,
          `The rule says two people only.`,
          "'says' có -s; 'person' số nhiều là 'people'.",
        ),
      ],
      speaking: [
        sp(
          "Where can I smoke?",
          `The ${lo(r3)} is outside, near the garden.`,
          "Chỉ nơi được phép thay vì chỉ nói nơi bị cấm — hữu ích hơn cho khách.",
        ),
        sp(
          "Can my friend come up too?",
          `I am afraid our ${lo(r2)} allows two guests only.`,
          "Viện dẫn quy định thay vì ý kiến cá nhân, khách sẽ không tranh luận với bạn.",
        ),
      ],
      reading: read(
        `A guest asks about the rules. ${lx.staff} explains: "The ${lo(r3)} is outside, near the garden. Our ${lo(r2)} allows two guests only, madam."`,
        [
          {
            q: "Khu vực hút thuốc ở đâu?",
            options: ["Bên ngoài, gần vườn", "Trong phòng", "Ở sảnh"],
            correct: 0,
            explanation: `"The ${lo(r3)} is outside, near the garden."`,
          },
          {
            q: "Nên chỉ nơi được phép hay chỉ nói nơi bị cấm?",
            options: ["Chỉ nơi được phép", "Chỉ nói nơi bị cấm", "Không nói gì"],
            correct: 0,
            explanation: "Cho khách giải pháp hữu ích hơn nhiều so với chỉ nói 'không được'.",
          },
        ],
      ),
      game: [
        game(
          "Am I allowed to smoke in the room?",
          `I am afraid not. The ${lo(r3)} is outside.`,
          "Smoking only outside.",
          "Yes, room is fine.",
        ),
      ],
    }),

    lesson(lx, 19, 4, "Valuables & Emergencies", "Đồ giá trị & tình huống khẩn", {
      vocabulary: [
        bw(r6, `Please keep your ${lo(r6)} safe.`),
        bw(r8, `That is ${lo(r8)}, I am afraid.`),
      ],
      grammar: [
        g(
          `Put money in box please.`,
          `Please keep your ${lo(r6)} in the safety box.`,
          "Câu đề nghị đủ mạo từ và tân ngữ: keep YOUR valuables in THE safety box.",
        ),
        g(
          `If fire, you run outside.`,
          `If there is a fire, please use the exit.`,
          "Câu điều kiện đầy đủ: 'If there is a fire,' + lời hướng dẫn lịch sự.",
        ),
      ],
      speaking: [
        sp(
          "Where should I keep my passport?",
          `Please keep your ${lo(r6)} in the safety box.`,
          "Chủ động nhắc khách cất đồ giá trị — phòng ngừa tốt hơn xử lý mất mát.",
        ),
        sp(
          "What do I do in an emergency?",
          `If there is a fire, please use the exit.`,
          "Hướng dẫn khẩn cấp phải ngắn, rõ, dễ nhớ.",
        ),
      ],
      reading: read(
        `${lx.staff} gives safety advice. "Please keep your ${lo(r6)} in the safety box. If there is a fire, please use the exit near the stairs."`,
        [
          {
            q: "Khách nên cất đồ giá trị ở đâu?",
            options: ["Trong két an toàn", "Trên bàn", "Trong va li"],
            correct: 0,
            explanation: `"Please keep your ${lo(r6)} in the safety box."`,
          },
          {
            q: "Hướng dẫn khẩn cấp nên như thế nào?",
            options: ["Ngắn, rõ, dễ nhớ", "Dài và chi tiết", "Không cần nói"],
            correct: 0,
            explanation: "Trong tình huống khẩn, câu dài không ai nhớ nổi.",
          },
        ],
      ),
      game: [
        game(
          "Is my laptop safe in the room?",
          "Please use the safety box, sir. It is safer.",
          "Put money in box please.",
          "Yes, room very safe.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 20 — Helping the Guest Choose
// FRAMES · "Would you prefer {A} or {B}?"
//         · "I would suggest {choice}, because…"
// ============================================================
function week20(lx: Ctx): LessonContent[] {
  const [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10] = lx.bank.choices;
  return [
    lesson(lx, 20, 1, "A or B?", "Đưa hai lựa chọn: A hay B?", {
      vocabulary: [
        v("Prefer", "/prɪˈfɜː/", "Thích hơn", "Would you prefer tea or coffee?", "❤️"),
        v("Choice", "/tʃɔɪs/", "Sự lựa chọn", "Both are good choices.", "🔀"),
        bw(c1, `Would you prefer the ${lo(c1)}?`),
        bw(c2, `Or perhaps the ${lo(c2)}?`),
      ],
      grammar: [
        g(
          `You like ${lo(c1)} or ${lo(c2)} more?`,
          `Would you prefer the ${lo(c1)} or the ${lo(c2)}?`,
          "Mẫu chuẩn để đưa hai lựa chọn: 'Would you prefer A or B?'",
        ),
        g(
          `Two is good same.`,
          `Both are excellent choices, madam.`,
          "'Both are…' dùng cho hai thứ; động từ chia số nhiều 'are'.",
        ),
      ],
      speaking: [
        sp(
          "I am not sure what to pick.",
          `Would you prefer the ${lo(c1)} or the ${lo(c2)}?`,
          "Khung vàng tuần này. Cho khách đúng HAI lựa chọn — nhiều hơn sẽ rối.",
        ),
        sp(
          "They both sound fine to me.",
          `Both are excellent choices, sir.`,
          "Khẳng định cả hai đều tốt để khách không sợ chọn sai.",
        ),
      ],
      reading: read(
        `The guest hesitates. ${lx.staff} helps: "Would you prefer ${lo(c1)} or ${lo(c2)}, madam? Both are excellent choices." The guest picks one quickly.`,
        [
          {
            q: "Nên đưa cho khách mấy lựa chọn?",
            options: ["Hai", "Năm", "Càng nhiều càng tốt"],
            correct: 0,
            explanation: "Hai lựa chọn giúp khách quyết nhanh; quá nhiều gây rối.",
          },
          {
            q: "'Both are' dùng cho mấy thứ?",
            options: ["Hai", "Một", "Ba trở lên"],
            correct: 0,
            explanation: "both = cả hai, luôn đi với động từ số nhiều.",
          },
        ],
      ),
      game: [
        game(
          "Which one should I take?",
          `Would you prefer the ${lo(c1)} or the ${lo(c2)}?`,
          `You like ${lo(c1)} or ${lo(c2)} more?`,
          "Any one is same.",
        ),
      ],
    }),

    lesson(lx, 20, 2, "Making a Recommendation", "Đưa ra lời khuyên", {
      vocabulary: [
        bw(c10, `The ${lo(c10)} is very popular.`),
        bw(c8, `The ${lo(c8)} is a good match.`),
        // Slot 9 holds a CONSIDERATION a guest weighs (skin type, water
        // saving, personal opinion), not a weather-dependent thing — "The
        // personal opinion depends on the weather." made no sense in four of
        // six departments.
        bw(c9, `The ${lo(c9)} is worth considering.`),
      ],
      grammar: [
        g(
          `I think good this one.`,
          `I would suggest this one, sir.`,
          "'I would suggest…' là mẫu khuyên chuẩn mực, nhã nhặn hơn 'I think good'.",
        ),
        g(
          `Because is popular.`,
          `Because it is very popular with our guests.`,
          "Mệnh đề 'because' cần chủ ngữ: because IT IS popular.",
        ),
      ],
      speaking: [
        sp(
          "What would you recommend?",
          `I would suggest the ${lo(c10)}, because it is popular.`,
          "Khuyên phải kèm lý do — lời khuyên không lý do nghe như bán hàng.",
        ),
        sp(
          "Why do you say that?",
          `It would suit you very nicely, madam.`,
          "Giải thích lợi ích cụ thể cho riêng vị khách đó.",
        ),
      ],
      reading: read(
        // `It would ${lo(c8)} nicely` put a NOUN slot where the frame's own
        // verb goes — "It would environment nicely.", "It would relaxing
        // option nicely." The sentence the author meant is two lines up in
        // the same lesson, at the second sp(): "It would suit you very
        // nicely." Also "suggest THE {c10}": the bare version read as
        // "I would suggest guest decision".
        `The guest wants advice. ${lx.staff} says: "I would suggest the ${lo(c10)}, because it is very popular with our guests. It would suit you nicely."`,
        [
          {
            q: "Lời khuyên nên kèm theo gì?",
            options: ["Lý do cụ thể", "Giá tiền", "Không cần gì"],
            correct: 0,
            explanation: "Lời khuyên có lý do mới đáng tin, nếu không sẽ giống chào hàng.",
          },
          {
            q: "Mẫu câu khuyên chuẩn mực là gì?",
            options: ["I would suggest…", "I think good…", "You take this."],
            correct: 0,
            explanation: "'I would suggest…' vừa chuyên nghiệp vừa không áp đặt.",
          },
        ],
      ),
      game: [
        game(
          "Which do most people choose?",
          `Most guests choose the ${lo(c10)}, madam.`,
          "I think good this one.",
          "I do not know really.",
        ),
      ],
    }),

    lesson(lx, 20, 3, "Respecting the Guest's Choice", "Tôn trọng quyết định của khách", {
      vocabulary: [
        bw(c3, `The ${lo(c3)} is available too.`),
        bw(c4, `We also have the ${lo(c4)}.`),
        bw(c7, `The ${lo(c7)} is fine, sir.`),
      ],
      grammar: [
        g(
          `No, that not good choice.`,
          `Of course, that is a good choice too.`,
          "Không bao giờ chê lựa chọn của khách. Khẳng định rồi mới bổ sung thông tin.",
        ),
        g(
          `Up to you all same.`,
          `Either one, sir. Whichever you prefer.`,
          "'Whichever you prefer' là cách nói 'tùy anh/chị' lịch sự và trang trọng.",
        ),
      ],
      speaking: [
        sp(
          "Actually I will take the other one.",
          `Of course, that is a good choice too.`,
          "Khách đổi ý thì ủng hộ ngay — đừng bảo vệ lời khuyên của mình.",
        ),
        sp(
          "Are you sure that is okay?",
          `Either one, madam. Whichever you prefer.`,
          "Trấn an để khách thoải mái với quyết định của họ.",
        ),
      ],
      reading: read(
        `The guest chooses differently. ${lx.staff} answers warmly: "Of course, that is a good choice too, sir. Whichever you prefer." The guest feels comfortable.`,
        [
          {
            q: "Khi khách không theo lời khuyên, nên làm gì?",
            options: ["Ủng hộ lựa chọn của khách", "Thuyết phục lại", "Tỏ ra thất vọng"],
            correct: 0,
            explanation: "Khách có quyền quyết định; bảo vệ lời khuyên của mình là sai lầm.",
          },
          {
            q: "'Whichever you prefer' nghĩa là gì?",
            options: ["Tùy anh/chị chọn", "Tôi chọn giúp", "Không có lựa chọn"],
            correct: 0,
            explanation: "Đây là cách nói 'tùy anh/chị' trang trọng.",
          },
        ],
      ),
      game: [
        game(
          "I think I prefer the other option.",
          "Of course, madam. That is a good choice too.",
          "No, that not good choice.",
          "Up to you all same.",
        ),
      ],
    }),

    lesson(lx, 20, 4, "Confirming the Decision", "Chốt lại lựa chọn", {
      vocabulary: [
        bw(c5, `So you would like the ${lo(c5)}?`),
        bw(c6, `We will arrange the ${lo(c6)} then.`),
      ],
      grammar: [
        g(
          `So you take this one right?`,
          `So you would like the ${lo(c5)}, correct?`,
          "Câu chốt trang trọng dùng 'would like' và kết bằng 'correct?'.",
        ),
        g(
          `Ok I do now.`,
          `Very good. I will arrange that now.`,
          "'Very good' + cam kết hành động là cách chốt chuyên nghiệp.",
        ),
      ],
      speaking: [
        sp(
          "Yes, let us go with that one.",
          `So you would like the ${lo(c5)}, correct?`,
          "Chốt lại một lần trước khi thực hiện — tránh làm sai rồi phải làm lại.",
        ),
        sp(
          "That is right, thank you.",
          `Very good. I will arrange that now.`,
          "Xác nhận xong là hành động ngay, đừng để khách phải nhắc.",
        ),
      ],
      reading: read(
        `The decision is made. ${lx.staff} confirms: "So you would like ${lo(c5)}, correct?" The guest agrees. "Very good, sir. I will arrange that now."`,
        [
          {
            q: "Vì sao phải chốt lại lựa chọn?",
            options: ["Tránh làm sai rồi phải làm lại", "Để nói thêm", "Vì quy định"],
            correct: 0,
            explanation: "Xác nhận một lần tiết kiệm rất nhiều thời gian sửa sai.",
          },
          {
            q: "Sau khi khách xác nhận nên làm gì?",
            options: ["Thực hiện ngay", "Hỏi thêm lần nữa", "Chờ khách nhắc"],
            correct: 0,
            explanation: "Xác nhận xong là hành động — đó là điều khách mong đợi.",
          },
        ],
      ),
      game: [
        game(
          "Yes, that is my final choice.",
          "Very good, madam. I will arrange it now.",
          "So you take this one right?",
          "Ok I do now.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 21 — Reporting Completed Work (Past Simple)
// FRAMES · "I {verb-ed} the {thing} this morning."
//         · "We {verb-ed} at {time}."
// ============================================================
function week21(lx: Ctx): LessonContent[] {
  const [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10] = lx.bank.reports;
  return [
    lesson(lx, 21, 1, "What I Did Today", "Kể việc đã làm hôm nay", {
      vocabulary: [
        v("Already", "/ɔːlˈredi/", "Đã (rồi)", "I already finished it.", "✅"),
        v("Ago", "/əˈɡəʊ/", "Cách đây", "Two hours ago.", "⏪"),
        bw(e1, `I ${lo(e1)} it this morning.`),
        bw(e5, `${e5.word} was very busy.`),
      ],
      grammar: [
        g(
          `I ${lo(e1)} it yesterday no.`,
          `I ${lo(e1)} it yesterday, sir.`,
          "Quá khứ đơn: động từ đã ở dạng quá khứ, không cần thêm gì. Bỏ 'no' thừa ở cuối.",
        ),
        g(
          `Yesterday I do it.`,
          `I did it yesterday.`,
          "Động từ phải chia quá khứ: do → DID. Đây là lỗi phổ biến nhất của người Việt.",
        ),
      ],
      speaking: [
        sp(
          "Has that been done yet?",
          `Yes, sir. I ${lo(e1)} it this morning.`,
          "Khung vàng tuần này. Động từ quá khứ + mốc thời gian cụ thể.",
        ),
        sp(
          "When exactly did you do it?",
          `About two hours ago, madam.`,
          "Cho mốc thời gian cụ thể — 'ago' đếm ngược từ hiện tại.",
        ),
      ],
      reading: read(
        `The supervisor asks about the work. ${lx.staff} answers: "I ${lo(e1)} it this morning, about two hours ago. ${e5.word} was very busy."`,
        [
          {
            q: "Việc đó được làm khi nào?",
            options: ["Sáng nay", "Ngày mai", "Tuần trước"],
            correct: 0,
            explanation: `"I ${lo(e1)} it this morning."`,
          },
          {
            q: "Lỗi 'Yesterday I do it' sai ở đâu?",
            options: ["Động từ chưa chia quá khứ", "Thiếu chủ ngữ", "Sai trật tự từ"],
            correct: 0,
            explanation: "Phải là 'I did it yesterday' — do chuyển thành did.",
          },
        ],
      ),
      game: [
        game(
          "Was that task completed?",
          `Yes, madam. I ${lo(e1)} it this morning.`,
          `Yesterday I do it.`,
          "Not yet maybe later.",
        ),
      ],
    }),

    lesson(lx, 21, 2, "Reporting Numbers", "Báo cáo số liệu", {
      vocabulary: [
        bw(e6, `We had twelve ${lo(e6)} today.`),
        bw(e2, `The guest ${lo(e2)} at noon.`),
        bw(e10, `I ${lo(e10)} everything down.`),
      ],
      grammar: [
        g(
          `Today have twelve.`,
          `We had twelve ${lo(e6)} today.`,
          "Quá khứ của 'have' là 'had'; câu cần chủ ngữ 'We'.",
        ),
        g(
          `I note all already.`,
          `I ${lo(e10)} everything down.`,
          "Động từ quá khứ + tân ngữ 'everything' + tiểu từ 'down'.",
        ),
      ],
      speaking: [
        sp(
          "How many did we have today?",
          `We had twelve ${lo(e6)}, sir.`,
          "Báo số liệu phải chính xác — đoán bừa làm hỏng cả báo cáo ca.",
        ),
        sp(
          "Did you record all of that?",
          `Yes, I ${lo(e10)} everything down.`,
          "Ghi chép đầy đủ là nền tảng của bàn giao ca tốt.",
        ),
      ],
      reading: read(
        `At the end of the shift, ${lx.staff} reports: "We had twelve ${lo(e6)} today. The last guest ${lo(e2)} at noon. I ${lo(e10)} everything down."`,
        [
          {
            q: "Hôm nay có bao nhiêu lượt?",
            options: ["Mười hai", "Hai", "Hai mươi"],
            correct: 0,
            explanation: `"We had twelve ${lo(e6)} today."`,
          },
          {
            q: "Quá khứ của 'have' là gì?",
            options: ["had", "haved", "has"],
            correct: 0,
            explanation: "have là động từ bất quy tắc: have → had.",
          },
        ],
      ),
      game: [
        game(
          "What were the numbers today?",
          `We had twelve ${lo(e6)}, madam.`,
          "Today have twelve.",
          "I did not count them.",
        ),
      ],
    }),

    lesson(lx, 21, 3, "Reporting a Problem", "Báo cáo sự cố đã xảy ra", {
      vocabulary: [
        bw(e3, `One booking was ${lo(e3)}.`),
        bw(e7, `It ${lo(e7)} than usual.`),
        bw(e8, `I ${lo(e8)} the broken one.`),
      ],
      grammar: [
        g(
          `Problem happen, I fix.`,
          `There was a problem, but I fixed it.`,
          "Hai mệnh đề quá khứ nối bằng 'but': THERE WAS … BUT I FIXED IT.",
        ),
        g(
          `It take long time.`,
          `It ${lo(e7)} than usual, sir.`,
          "Động từ 'take' ở quá khứ là 'took'; so sánh dùng 'than usual'.",
        ),
      ],
      speaking: [
        sp(
          "Did everything go smoothly?",
          `There was one problem, but I fixed it.`,
          "Báo cáo trung thực: nêu vấn đề VÀ cách đã xử lý trong cùng một câu.",
        ),
        sp(
          "Why did it take so long?",
          `It ${lo(e7)} than usual, because we were busy.`,
          "Giải thích bằng 'because' — nêu nguyên nhân khách quan, không đổ lỗi.",
        ),
      ],
      reading: read(
        `${lx.staff} gives an honest report: "There was one problem this morning, but I fixed it. It ${lo(e7)} than usual, because we were very busy."`,
        [
          {
            q: "Nhân viên báo cáo sự cố như thế nào?",
            options: ["Nêu vấn đề và cách đã xử lý", "Giấu đi", "Đổ lỗi cho người khác"],
            correct: 0,
            explanation: "Báo cáo trung thực kèm giải pháp là chuẩn mực chuyên nghiệp.",
          },
          {
            q: "Từ nối nào dùng để nêu nguyên nhân?",
            options: ["because", "but", "and"],
            correct: 0,
            explanation: "'because' dẫn vào mệnh đề chỉ nguyên nhân.",
          },
        ],
      ),
      game: [
        game(
          "Were there any issues on your shift?",
          "There was one, but I fixed it.",
          "Problem happen, I fix.",
          "No problem never happen.",
        ),
      ],
    }),

    lesson(lx, 21, 4, "Handing Over the Shift", "Bàn giao ca", {
      vocabulary: [bw(e4, `I ${lo(e4)} the supervisor.`), bw(e9, `Everything was ${lo(e9)}.`)],
      grammar: [
        g(
          `I tell supervisor already.`,
          `I ${lo(e4)} the supervisor this afternoon.`,
          "Dùng động từ quá khứ chuẩn thay cho 'tell already' theo lối tiếng Việt.",
        ),
        g(
          `Next shift do rest.`,
          `The next shift will finish the rest.`,
          "Việc tương lai dùng 'will'; chủ ngữ cần mạo từ 'The next shift'.",
        ),
      ],
      speaking: [
        sp(
          "Anything I should know before I start?",
          `I ${lo(e4)} the supervisor about one issue.`,
          "Bàn giao phải nêu rõ việc còn dở — người ca sau không đọc được suy nghĩ của bạn.",
        ),
        sp(
          "Thanks, is everything else done?",
          `Yes, everything else was ${lo(e9)}.`,
          "Chốt rõ phần đã xong để ca sau biết chính xác phải làm gì.",
        ),
      ],
      reading: read(
        `The shift ends. ${lx.staff} tells the next colleague: "I ${lo(e4)} the supervisor about one issue. Everything else was ${lo(e9)}. The next shift will finish the rest."`,
        [
          {
            q: "Bàn giao ca cần nêu rõ điều gì?",
            options: ["Việc còn dở dang", "Chuyện cá nhân", "Không cần nêu gì"],
            correct: 0,
            explanation: "Người ca sau cần biết chính xác việc gì chưa xong.",
          },
          {
            q: "Câu 'The next shift will finish the rest' nói về thời gian nào?",
            options: ["Tương lai", "Quá khứ", "Hiện tại"],
            correct: 0,
            explanation: "'will + động từ' diễn tả việc sắp làm.",
          },
        ],
      ),
      game: [
        game(
          "Is there anything left for me?",
          "Just one item, sir. Everything else is done.",
          "Next shift do rest.",
          "I do not remember now.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 22 — Checkpoint: Core SOP Service
// Chains weeks 15-21 into full service exchanges. New vocabulary is
// light and evaluative; the load is recall across the whole phase.
// ============================================================
function week22(lx: Ctx): LessonContent[] {
  const [w1, w2, w3, w4, w5, w6, w7, w8, w9, w10] = lx.bank.wrapUp;
  const [a1] = lx.bank.steps;
  const [o1] = lx.bank.offers;
  return [
    lesson(lx, 22, 1, "Sequence & Offer Together", "Ghép quy trình với lời mời", {
      vocabulary: [
        v("Standard", "/ˈstændəd/", "Tiêu chuẩn", "This is our standard.", "📏"),
        bw(w1, `The service was ${lo(w1)} today.`),
        bw(w2, `Everything finished ${lo(w2)}.`),
      ],
      grammar: [
        g(
          `I ${lo(a1)}, after you want ${lo(o1)}?`,
          `First I ${lo(a1)}. Would you like ${wa(o1)}?`,
          "Ôn tuần 15 và 16: tách thành hai câu ngắn thay vì gộp lộn xộn.",
        ),
        g(
          `Service today good.`,
          `The service was ${lo(w1)} today.`,
          "Câu quá khứ đủ chủ ngữ và động từ 'was'.",
        ),
      ],
      speaking: [
        sp(
          "What happens first here?",
          `First I ${lo(a1)}. Would you like ${wa(o1)}?`,
          "Ghép quy trình (tuần 15) với lời mời (tuần 16) — nhịp phục vụ thật là như vậy.",
        ),
        sp(
          "Yes please, that sounds good.",
          `Certainly. Everything will be ready ${lo(w2)}.`,
          "Nhận lời kèm cam kết thời gian.",
        ),
      ],
      reading: read(
        `${lx.staff} combines the steps naturally. "First I ${lo(a1)}. Would you like ${wa(o1)}, madam? Everything will be ready ${lo(w2)}."`,
        [
          {
            q: "Nhân viên ghép hai kỹ năng nào?",
            options: ["Trình tự và lời mời", "Xin lỗi và từ chối", "Hỏi giá và thanh toán"],
            correct: 0,
            explanation: "Câu đầu là trình tự (tuần 15), câu sau là lời mời (tuần 16).",
          },
          {
            q: "Vì sao nên tách thành hai câu ngắn?",
            options: ["Khách dễ nghe và dễ trả lời", "Cho đủ dài", "Không có lý do"],
            correct: 0,
            explanation: "Hai câu ngắn rõ ràng hơn một câu dài gộp nhiều ý.",
          },
        ],
      ),
      game: [
        game(
          "How do we start this process?",
          `First I ${lo(a1)}, sir. Then we continue.`,
          `I ${lo(a1)}, after next thing.`,
          "Start is not important.",
        ),
      ],
    }),

    lesson(lx, 22, 2, "Details, Paperwork & Payment", "Ghép hỏi thông tin với giấy tờ", {
      vocabulary: [
        v("Complete", "/kəmˈpliːt/", "Hoàn tất", "The form is complete.", "✅"),
        bw(w3, `We follow the hotel ${lo(w3)}.`),
        bw(w5, `The ${lo(w5)} was positive.`),
        bw(w9, `${w9.word} was noted today.`),
      ],
      grammar: [
        g(
          `Give me name, sign here.`,
          `Could I have your name? Then please sign here.`,
          "Ôn tuần 17 và 18: xin thông tin lịch sự rồi mới hướng dẫn ký.",
        ),
        g(
          `I prepare paper now.`,
          `I am preparing the paperwork now.`,
          "Ôn tuần 18: việc đang làm dùng hiện tại tiếp diễn.",
        ),
      ],
      speaking: [
        sp(
          "What do you need to complete this?",
          `Could I have your name? Then please sign here.`,
          "Chuỗi hai bước: xin thông tin rồi hướng dẫn — đúng nhịp làm thủ tục thật.",
        ),
        sp(
          "Here you are. Is that everything?",
          `Yes. I am preparing the paperwork now.`,
          "Xác nhận đủ thông tin rồi báo mình đang xử lý.",
        ),
      ],
      reading: read(
        `${lx.staff} handles the formalities. "Could I have your name, please? Then please sign here. I am preparing the paperwork now, sir."`,
        [
          {
            q: "Thứ tự đúng khi làm thủ tục là gì?",
            options: [
              "Xin thông tin rồi hướng dẫn ký",
              "Bắt ký trước rồi hỏi tên",
              "Không cần thứ tự",
            ],
            correct: 0,
            explanation: "Thu thập thông tin trước, hoàn tất giấy tờ sau.",
          },
          {
            q: "'I am preparing' diễn tả điều gì?",
            options: ["Việc đang làm ngay lúc này", "Việc đã xong", "Việc sẽ làm tuần sau"],
            correct: 0,
            explanation: "Hiện tại tiếp diễn = đang diễn ra ngay lúc nói.",
          },
        ],
      ),
      game: [
        game(
          "What is the next step for me?",
          "Please sign here, madam. Then we are finished.",
          "Give me name, sign here.",
          "Nothing more you do.",
        ),
      ],
    }),

    lesson(lx, 22, 3, "Rules & Choices Together", "Ghép nội quy với tư vấn lựa chọn", {
      vocabulary: [
        v("Overall", "/ˌəʊvərˈɔːl/", "Nhìn chung", "Overall, the day went well.", "🌐"),
        bw(w4, `We can always ${lo(w4)}.`),
        bw(w6, `That was ${lo(w6)} of the team.`),
        bw(w10, `${w10.word} at the end of the day.`),
      ],
      grammar: [
        g(
          `Cannot do that, choose other.`,
          `I am afraid that is not allowed. Would you prefer another option?`,
          "Ôn tuần 19 và 20: từ chối mềm rồi mở ngay lựa chọn khác.",
        ),
        g(
          `Team do well yesterday.`,
          `That was ${lo(w6)} of the team.`,
          "Ôn tuần 21: câu bị động quá khứ đơn giản.",
        ),
      ],
      speaking: [
        sp(
          "Can I do it this way instead?",
          `I am afraid not. Would you prefer another option?`,
          "Chuỗi vàng: từ chối lịch sự (tuần 19) + đưa lựa chọn (tuần 20). Không bao giờ dừng ở lời từ chối.",
        ),
        sp(
          "Yes, what else can you offer?",
          `We could arrange something quieter for you.`,
          "Đưa phương án cụ thể chứ không hỏi lại chung chung.",
        ),
      ],
      reading: read(
        `A guest requests something against the rules. ${lx.staff} answers: "I am afraid that is not allowed, sir. Would you prefer another option? We could arrange something quieter."`,
        [
          {
            q: "Sau khi từ chối, nhân viên làm gì?",
            options: ["Đưa ra lựa chọn khác", "Kết thúc câu chuyện", "Gọi bảo vệ"],
            correct: 0,
            explanation: "Từ chối luôn phải đi kèm một lối ra cho khách.",
          },
          {
            q: "Cụm nào làm lời từ chối mềm đi?",
            options: ["I am afraid", "You cannot", "No way"],
            correct: 0,
            explanation: "'I am afraid' là cụm giảm nhẹ chuẩn mực trong ngành.",
          },
        ],
      ),
      game: [
        game(
          "So you are saying no to me?",
          "I am afraid so, but I can offer another option.",
          "Cannot do that, choose other.",
          "Yes, no is no.",
        ),
      ],
    }),

    lesson(lx, 22, 4, "Full Shift Report", "Báo cáo trọn ca làm", {
      vocabulary: [bw(w7, `The ${lo(w7)} starts at two.`), bw(w8, `Let me ${lo(w8)} the day.`)],
      grammar: [
        g(
          `Today all good, no problem.`,
          `Today went well, with no problems.`,
          "Ôn tuần 21: 'went' là quá khứ của 'go'; cụm 'with no problems' gọn và chuẩn.",
        ),
        g(
          `I say again short.`,
          `Let me ${lo(w8)} briefly.`,
          "'Let me recap briefly' là cách mở đầu phần tóm tắt chuyên nghiệp.",
        ),
      ],
      speaking: [
        sp(
          "How was your shift overall?",
          `Today went well, with no problems.`,
          "Câu tổng kết ca chuẩn — ngắn, tích cực, trung thực.",
        ),
        sp(
          "Anything for the next team?",
          `Let me ${lo(w8)}. The ${lo(w7)} starts at two.`,
          "Tóm tắt rồi bàn giao mốc thời gian cụ thể cho ca sau.",
        ),
      ],
      reading: read(
        `At the end of week, ${lx.staff} reports to the manager: "Today went well, with no problems. Let me ${lo(w8)} briefly. The ${lo(w7)} starts at two o'clock."`,
        [
          {
            q: "Ca làm hôm nay thế nào?",
            options: ["Suôn sẻ, không sự cố", "Rất nhiều vấn đề", "Chưa kết thúc"],
            correct: 0,
            explanation: `"Today went well, with no problems."`,
          },
          {
            q: "Câu tổng kết ca nên như thế nào?",
            options: [
              "Ngắn, trung thực, có mốc bàn giao",
              "Dài và chi tiết mọi việc",
              "Không cần tổng kết",
            ],
            correct: 0,
            explanation: "Quản lý cần thông tin cô đọng và chính xác, không cần kể lể.",
          },
        ],
      ),
      game: [
        game(
          "Give me a quick summary please.",
          "Today went well, with no problems, madam.",
          "Today all good, no problem.",
          "Too long to explain now.",
        ),
      ],
    }),
  ];
}

// ------------------------------------------------------------
// Week assembly + graduated spaced recycling.
// ------------------------------------------------------------
const WEEK_META: Record<number, { en: string; vi: string; build: (lx: Ctx) => LessonContent[] }> = {
  15: { en: "Standard Service Sequence", vi: "Quy trình phục vụ chuẩn từng bước", build: week15 },
  16: { en: "Offers & Invitations", vi: "Đề nghị & mời khách", build: week16 },
  17: {
    en: "Guest Details & Confirmation",
    vi: "Xin phép & xác nhận thông tin khách",
    build: week17,
  },
  18: { en: "Paperwork & Payment", vi: "Giấy tờ & thanh toán", build: week18 },
  19: { en: "Rules & Safety", vi: "Nội quy & an toàn", build: week19 },
  20: { en: "Helping the Guest Choose", vi: "Tư vấn lựa chọn cho khách", build: week20 },
  21: { en: "Reporting Completed Work", vi: "Báo cáo công việc đã làm", build: week21 },
  22: {
    en: "Checkpoint — Core SOP Service",
    vi: "Kiểm tra tổng hợp — Nghiệp vụ chuẩn",
    build: week22,
  },
};

/** Headwords a department ACTUALLY meets in a week. Four slots in this
 *  range are served by hand-authored payloads instead of the spine, so
 *  recycling must read those, or it schedules words never taught. */
function headwordsOf(lx: Ctx, week: number, overrides: Record<string, WeekContent>): string[] {
  const override = overrides[`${lx.code}-${week}`];
  const lessons = override ? override.lessons : WEEK_META[week].build(lx);
  return lessons.flatMap((l) => l.vocabulary.map((item) => item.word));
}

/**
 * Same expanding-interval scheme as Phase 1, one level deeper: the long
 * pool is now everything the department met in Phases 0 AND 1, walked
 * across weeks 15-21 so nothing from the first fourteen weeks is left
 * unretrieved. Week 22 sweeps Phase 2 itself.
 */
function reviewWordsFor(
  lx: Ctx,
  week: number,
  priorWords: string[],
  overrides: Record<string, WeekContent>,
): string[] {
  if (week === 22) {
    const all: string[] = [];
    for (let w = 15; w <= 21; w++) all.push(...headwordsOf(lx, w, overrides));
    return Array.from(new Set(all));
  }

  const out: string[] = [];

  const oneBack = week - 1;
  if (oneBack >= 15) out.push(...headwordsOf(lx, oneBack, overrides).slice(0, 4));

  const threeBack = week - 3;
  if (threeBack >= 15) out.push(...headwordsOf(lx, threeBack, overrides).slice(0, 3));

  const slots = 7; // weeks 15..21
  const size = Math.ceil(priorWords.length / slots);
  const start = (week - 15) * size;
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
    // Same lock Phase 0 and Phase 1 use. Without it a target passes with its
    // own headword deleted — measured at 48.4% (P2), 13.7% (P3), 36.7% (P4).
    lessons: lockWeekHeadwords(meta.build(lx)),
    reviewWords: reviewWordsFor(lx, week, priorWords, overrides),
  };
}

/**
 * Phase 2 weeks (6 departments × weeks 15-22). Four of these keys are
 * overridden downstream by the hand-authored FB-15, HK-15, FO-17 and
 * SW-19 payloads — see the note at the top of this file.
 */
/** Every headword Phase 2 teaches, in order, per department — the
 *  recycling pool Phase 3 draws its long-spacing slice from. Reads
 *  through the same overrides as the builder, so it reports what the
 *  learner actually met, not what the spine would have taught. */
export function phase2WordsByDep(
  overrides: Record<string, WeekContent> = {},
): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const [code, base] of Object.entries(LEXICONS)) {
    const lx: Ctx = { ...base, bank: P2_BANKS[code] };
    out[code] = [];
    for (let w = 15; w <= 22; w++) out[code].push(...headwordsOf(lx, w, overrides));
  }
  return out;
}

export function buildPhase2(
  priorWordsByDep: Record<string, string[]>,
  /** The hand-authored weeks that replace spine slots in this range. */
  overrides: Record<string, WeekContent> = {},
): Record<string, WeekContent> {
  const out: Record<string, WeekContent> = {};
  for (const [code, base] of Object.entries(LEXICONS)) {
    const lx: Ctx = { ...base, bank: P2_BANKS[code] };
    const prior = priorWordsByDep[code] ?? [];
    for (let w = 15; w <= 22; w++) out[`${code}-${w}`] = buildWeek(lx, w, prior, overrides);
  }
  return out;
}
