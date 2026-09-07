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
import { DEPT_REVIEW } from "./phase2-dept-review";
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
const lo = (w: P2Word) =>
  w.word
    .split(" ")
    .map((t) => (/^[A-Z]{2,}$/.test(t) ? t : t.toLowerCase()))
    .join(" ");

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
const wt = (w: P2Word) => (w.art === "" || /^\w+'s\b/i.test(w.word) ? lo(w) : `the ${lo(w)}`);
/** `wt` at the START of a sentence. Forty-three Phase 2 sentences opened in
 *  lower case because the frame pasted "the …" straight after a full stop:
 *  "No, madam. the welcome drink is free for our guests." The same slip is in
 *  the vocabulary cards, the grammar pairs and the reading passages. */
const Wt = (w: P2Word) => {
  const t = wt(w);
  return t.charAt(0).toUpperCase() + t.slice(1);
};

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
          `First I ${lo(a1)}, then I will ${lo(a2)}.`,
        ),
        g(
          `Finish that, I do next thing.`,
          `After that, I move to the next step.`,
          "Cụm nối là 'After that,' có dấu phẩy, rồi mới đến mệnh đề chính.",
          `After that, I move to next step.`,
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
          `After that, I ${lo(a3)}.`,
          "Nối bước thứ ba bằng 'After that,' — giữ câu ngắn, đừng gộp ba bước vào một câu.",
        ),
        sp(
          "Which step comes first here?",
          `First we ${lo(a1)}, then we continue.`,
          "Nói trình tự bằng first … then …, hai vế cùng thì.",
          "colleague",
        ),
        sp(
          "And the step after that?",
          `After that, I ${lo(a2)}.`,
          "Cụm nối 'After that,' có dấu phẩy rồi mới tới mệnh đề.",
          "colleague",
        ),
        sp(
          "How does it start?",
          `First we ${lo(a1)}, then we continue.`,
          "Bước đầu tiên phải nói được thành lời trước khi làm.",
        ),
        sp(
          "What is step two?",
          `After that, I ${lo(a2)}.`,
          "Nối bước bằng After that để người nghe theo kịp.",
          "colleague",
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
          "The order does not matter, madam. Any way at all is fine.",
          undefined,
          "Câu này đúng ngữ pháp và phủ nhận đúng thứ tuần này dạy: quy trình có thứ tự, và thứ tự là lý do nó tồn tại.",
        ),
      ],
    }),

    lesson(lx, 15, 2, "Polite Instructions", "Hướng dẫn khách lịch sự", {
      vocabulary: [
        v("Step", "/step/", "Bước trong quy trình", "The next step is simple.", "🪜"),
        bw(a4, `Now we ${lo(a4)}.`),
        bw(a5, `I will ${lo(a5)} in a moment.`),
      ],
      grammar: [
        g(
          `You wait, I ${lo(a4)}.`,
          `Please wait a moment while I ${lo(a4)}.`,
          "Câu hai mệnh đề nối bằng 'while'. Đây là bước tiến của A2 so với câu đơn ở A1.",
          `Please wait a moment while I will ${lo(a4)}.`,
        ),
        g(
          `Come here, sign this.`,
          `Could you come this way, please?`,
          "Mệnh lệnh trần trụi nghe thô. Dùng 'Could you … please?' để mời khách làm gì đó.",
          `Could you to come this way, please?`,
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
          `Not at all, sir. I will ${lo(a5)} now.`,
          "Trấn an khách rồi nói việc mình sẽ làm.",
        ),
        sp(
          "Is the next part complicated?",
          `The next step is simple.`,
          "Trấn an bằng một câu ngắn, đủ chủ ngữ và động từ.",
        ),
        sp(
          "Will you do that yourself?",
          `I will ${lo(a5)} in a moment.`,
          "Hứa việc mình làm: WILL + động từ nguyên thể, kèm mốc 'in a moment'.",
        ),
        sp(
          "What are you doing now?",
          `Now we ${lo(a4)}, madam.`,
          "Nói việc đang làm, khách sẽ không nghĩ mình bị bỏ quên.",
        ),
        sp(
          "And right after this?",
          `I will ${lo(a5)} in a moment.`,
          "Will cho việc sắp làm ngay sau đây.",
        ),
      ],
      reading: read(
        `A guest is unsure what to do. ${lx.staff} says: "Please wait a moment while I ${lo(a4)}. After that, I will ${lo(a5)}." The guest relaxes.`,
        [
          {
            q: "Nhân viên đề nghị khách làm gì?",
            options: ["Chờ một lát", "Tự làm lấy", "Quay lại sau"],
            correct: 0,
            explanation: `"Please wait a moment" — đề nghị khách chờ.`,
          },
          {
            q: "'while' trong câu có tác dụng gì?",
            options: [
              "Nối hai việc xảy ra cùng lúc",
              "Chỉ nguyên nhân của sự việc",
              "Chỉ sự đối lập hai vế",
            ],
            correct: 0,
            explanation: "'while' = trong lúc, nối hai hành động diễn ra đồng thời.",
          },
        ],
      ),
      game: [
        game(
          "Do I need to do anything myself?",
          `No need, madam. I will ${lo(a5)} now.`,
          `You no need, madam.`,
          `Yes, madam. Please do it yourself.`,
          undefined,
          "Câu này đúng ngữ pháp nhưng đẩy việc của mình sang cho khách.",
        ),
      ],
    }),

    lesson(lx, 15, 3, "Keeping the Order Right", "Giữ đúng thứ tự các bước", {
      vocabulary: [
        bw(a6, `We always ${lo(a6)} with care.`),
        bw(a7, `Do not forget to ${lo(a7)}.`),
        bw(a8, `We always ${lo(a8)}.`),
      ],
      grammar: [
        g(
          `Order of step important.`,
          `The order of the steps is important.`,
          "Danh từ trừu tượng cần mạo từ 'the' và cụm bổ nghĩa: THE ORDER OF THE STEPS.",
          `The order of the steps are important.`,
        ),
        g(
          `I forget ${lo(a7)} sometimes.`,
          `I sometimes forget to ${lo(a7)}.`,
          "Trạng từ tần suất đứng trước động từ; sau 'forget' dùng 'to + động từ'.",
          `I forget sometimes to ${lo(a7)}.`,
        ),
      ],
      speaking: [
        sp(
          "Why does the order matter?",
          `If we change the order, we make mistakes.`,
          "Câu điều kiện đơn giản — hai mệnh đề, đúng tầm A2.",
        ),
        sp(
          "Which part needs the most care?",
          // Ô a6 là CỤM ĐỘNG TỪ ở 4/6 bộ phận ("show the room", "check the
          // comfort"), nên khung "The ___ always comes last" đẻ ra
          // "The show the room always comes last" — không phải tiếng Anh.
          // Khung nay đặt nó vào đúng vị trí động từ.
          `We always ${lo(a6)} with care, madam.`,
          "Dùng 'always' để nhấn rằng đây là quy tắc cố định; trạng từ đứng trước động từ chính.",
        ),
        sp(
          "Is there anything you must not skip?",
          `Do not forget to ${lo(a7)}.`,
          "Nhắc việc bắt buộc: 'Do not forget to + động từ'.",
          "colleague",
        ),
        sp(
          "What do you check at the end?",
          `We always ${lo(a8)}.`,
          "Trạng từ tần suất always đứng trước động từ chính.",
          "colleague",
        ),
        sp(
          "Which part do you never rush?",
          `We always ${lo(a6)} with care.`,
          "Always đứng trước động từ chính.",
        ),
        sp(
          "Is that always the order?",
          `We always ${lo(a8)}.`,
          "Quy trình chuẩn nói ở thì hiện tại đơn.",
        ),
      ],
      reading: read(
        `The supervisor reminds the team: "The order of the steps is important. If we change the order, we make mistakes. We always ${lo(a6)} with care."`,
        [
          {
            q: "Điều gì xảy ra nếu đổi thứ tự các bước?",
            options: ["Dễ mắc lỗi", "Làm việc nhanh hơn", "Không sao cả, vẫn ổn"],
            correct: 0,
            explanation: `"If we change the order, we make mistakes."`,
          },
          {
            q: "Bước nào luôn phải làm thật cẩn thận?",
            options: [a6.definition, a7.definition, a8.definition],
            correct: 0,
            explanation: `"We always ${lo(a6)} with care."`,
          },
        ],
      ),
      game: [
        game(
          "Can I skip one step to save time?",
          "I am afraid not. Each step is important.",
          "Yes skip is faster.",
          "Of course, madam. Skip it.",
          undefined,
          "Câu này lịch sự và sai: bỏ một bước là bỏ đúng cái bước mà lần sau sẽ thiếu.",
        ),
      ],
    }),

    lesson(lx, 15, 4, "Explaining the Whole Routine", "Trình bày trọn quy trình", {
      vocabulary: [bw(a9, `Our ${lo(a9)} has four steps.`), bw(a10, `${Wt(a10)} needs attention.`)],
      grammar: [
        g(
          `Our ${lo(a9)} have four step.`,
          `Our ${lo(a9)} has four steps.`,
          "Danh từ số ít đi với 'has'; 'step' số nhiều phải thêm -s.",
          `Our ${lo(a9)} have four steps.`,
        ),
        g(
          `That is all my work.`,
          `That is the whole routine, sir.`,
          "Dùng 'the whole routine' để chốt phần trình bày, nghe chuyên nghiệp hơn.",
          `That is whole routine, sir.`,
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
        sp(
          "How many steps are there?",
          `Our ${lo(a9)} has four steps.`,
          "Chủ ngữ số ít thì động từ có -s: has. Danh từ đếm được số nhiều: stepS.",
        ),
        sp(
          "Is anything still open?",
          `${Wt(a10)} needs attention.`,
          "Báo việc còn dở bằng một câu đủ, đừng nói trống không.",
          "colleague",
        ),
        sp(
          "Anything I tend to forget?",
          `Do not forget to ${lo(a7)}.`,
          "Nhắc việc bằng câu mệnh lệnh phủ định, ngắn và rõ.",
          "colleague",
        ),
        sp(
          "Could you run me through it?",
          `First we ${lo(a1)}, then we continue.`,
          "Kể lại quy trình từ đầu là cách tự kiểm tra mình nhớ đủ.",
          "colleague",
        ),
      ],
      reading: read(
        `A new colleague asks for the full picture. ${lx.staff} answers: "Our ${lo(a9)} has four simple steps. ${Wt(a10)} needs attention at every step. That is the whole routine." The whole routine takes about ten minutes.`,
        [
          {
            q: "Quy trình gồm mấy bước?",
            options: ["Bốn", "Hai", "Sáu"],
            correct: 0,
            explanation: `"has four simple steps".`,
          },
          {
            q: "Cả quy trình mất khoảng bao lâu?",
            options: ["Khoảng mười phút", "Khoảng một giờ đồng hồ", "Cả buổi sáng"],
            correct: 0,
            explanation: '"The whole routine takes about ten minutes."',
          },
        ],
      ),
      game: [
        game(
          "How complicated is the process?",
          `It is simple, sir. Our ${lo(a9)} has four steps.`,
          `Not complicate, madam. Four step only for you.`,
          "It is quite difficult, madam. Most guests find it confusing.",
          undefined,
          "Câu này đúng ngữ pháp nhưng dạy khách sợ chính quy trình của khách sạn.",
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
  const [pa1, pa2, pa3, pa4, pa5, pa6, pa7, pa8, pa9] = lx.bank.steps;
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
          "'Would you like…?' là mẫu mời chuẩn mực; 'You want…?' nghe như tra hỏi thẳng vào mặt khách.",
          `Would you like to ${wa(o1)}, sir?`,
        ),
        g(
          `I give you ${lo(o2)}.`,
          `May I offer you ${wa(o2)}?`,
          "Xin phép mời dùng 'May I offer you…?' — lịch sự hơn 'I give you'. Danh từ đếm được vẫn cần A/AN đứng trước.",
          `May I to offer you ${wa(o2)}?`,
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
          `Certainly. I will check and confirm right away.`,
          "Nhận lời rồi cam kết hành động ngay.",
        ),
        sp(
          "Could I have one more?",
          `Would you like an extra one?`,
          "Mời thêm bằng câu hỏi đủ chủ ngữ và động từ; hỏi trống không nghe như ra lệnh.",
        ),
        sp(
          "Is there anything else you can add?",
          `We also have ${wa(o2)}.`,
          "Giới thiệu thêm lựa chọn: We also have + mạo từ + món.",
        ),
        sp(
          "Remind me how you start?",
          `We ${lo(pa1)} at the very start.`,
          "Ôn tuần 15: trình tự các bước.",
          "colleague",
        ),
        sp(
          "What happens after that?",
          `I will ${lo(pa5)} in a moment.`,
          "Ôn tuần 15: will cho việc sắp làm ngay.",
        ),
        sp(
          "How many steps in total?",
          `Our ${lo(pa9)} has four steps.`,
          "Ôn tuần 15: gọi tên cả quy trình rồi mới kể từng bước.",
        ),
        sp(
          "Do I need to fill this in?",
          "The document must be accurate, madam.",
          "Nói rõ vì sao phải đúng, khách sẽ khai cẩn thận hơn.",
        ),
      ],
      reading: read(
        `${lx.staff} sees a chance to help. "Would you like ${wa(o1)}, madam? We also have ${wa(o2)}." The guest smiles and says: "Yes, please." The guest chooses the first one.`,
        [
          {
            q: "Nhân viên mời khách dùng gì trước?",
            options: [o1.definition, o2.definition, "Không mời gì"],
            correct: 0,
            explanation: `"Would you like ${wa(o1)}?" là lời mời đầu tiên.`,
          },
          {
            q: "Khách chọn thứ nào?",
            options: ["Thứ được mời đầu tiên", "Thứ được mời thứ hai", "Khách chưa chọn gì cả"],
            correct: 0,
            explanation: '"The guest chooses the first one."',
          },
        ],
      ),
      game: [
        game(
          "Is there anything you recommend?",
          `Would you like ${wa(o1)}, sir?`,
          `You want ${lo(o1)}, madam, or no want it?`,
          "I do not know, madam. Please choose by yourself.",
          undefined,
          "Câu này đúng ngữ pháp và bỏ mặc khách — khách hỏi chính vì muốn được gợi ý.",
        ),
      ],
    }),

    lesson(lx, 16, 2, "Explaining What Is Included", "Giải thích những gì đã bao gồm", {
      vocabulary: [
        bw(o3, `${Wt(o3)} is very popular.`),
        bw(o8, `${Wt(o8)} is free for our guests.`),
        bw(o10, `The price includes ${lo(o10)}.`),
      ],
      grammar: [
        g(
          `This no money.`,
          `${Wt(o8)} is free for you, madam.`,
          "Nói miễn phí cần câu đủ: THE + danh từ + IS FREE. Không nói 'no money'.",
          `${Wt(o8)} is free of you, madam.`,
        ),
        g(
          `Price include ${lo(o10)}.`,
          `The price includes ${lo(o10)}, sir.`,
          "Chủ ngữ số ít 'the price' đi với 'includes' có -s.",
          `The price is includes ${lo(o10)}, sir.`,
        ),
      ],
      speaking: [
        sp(
          "Is there an extra charge for that?",
          `No, madam. ${Wt(o8)} is free for our guests.`,
          "Trả lời rõ ràng về phí ngay từ đầu — tránh hiểu lầm khi thanh toán.",
        ),
        sp(
          "What exactly does it include?",
          `The price includes ${lo(o10)}, sir.`,
          "Liệt kê tối đa hai thứ trong một câu; nhiều hơn thì tách câu.",
        ),
        sp(
          "Which one do most guests take?",
          `${Wt(o3)} is very popular.`,
          "Gợi ý bằng cái nhiều người chọn — dễ nghe hơn là ép khách.",
        ),
        sp(
          "What exactly is in the price?",
          `The price includes ${lo(o10)}.`,
          "Chủ ngữ số ít: the price includeS.",
        ),
        sp(
          "What comes after that?",
          `Then we ${lo(pa2)}, and we continue.`,
          "Ôn tuần 15: nối bước bằng then.",
          "colleague",
        ),
        sp(
          "And what do you always do with care?",
          `We always ${lo(pa6)} with care.`,
          "Ôn tuần 15: always đứng trước động từ chính.",
        ),
        sp(
          "Is there anything more?",
          "May I offer you an extra choice?",
          "Mời thêm bằng câu hỏi, khách vẫn là người quyết.",
        ),
      ],
      reading: read(
        `A guest worries about the cost. ${lx.staff} explains: "${Wt(o8)} is free for our guests, sir. The price also includes ${lo(o10)}." The guest is pleased. Nothing is added to the bill.`,
        [
          {
            q: "Khách có phải trả thêm tiền không?",
            options: ["Không, đã miễn phí", "Có, khách phải trả thêm", "Chưa rõ, phải hỏi lại"],
            correct: 0,
            explanation: `"${Wt(o8)} is free for our guests" — miễn phí.`,
          },
          {
            q: "Hoá đơn có bị cộng thêm gì không?",
            options: ["Không cộng thêm gì", "Cộng thêm mười phần trăm", "Cộng thêm phí phục vụ"],
            correct: 0,
            explanation: '"Nothing is added to the bill."',
          },
        ],
      ),
      game: [
        game(
          "Will this cost me anything extra?",
          `Not at all, sir. ${Wt(o8)} is free.`,
          "This no money, madam. All free, no charge you.",
          "I am not sure, madam. Please ask at the front desk about it.",
          undefined,
          "Câu này đúng ngữ pháp nhưng đẩy một câu hỏi về tiền sang bộ phận khác; khách sẽ phải hỏi hai lần.",
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
          `We do not have that, but we could to offer ${wa(o4)}.`,
        ),
        g(
          `Maybe you take ${lo(o5)}.`,
          `Perhaps you would prefer ${wa(o5)}?`,
          "'Perhaps you would prefer…?' là cách gợi ý nhã nhặn, không áp đặt. Giữ mạo từ A/AN trước danh từ đếm được.",
          `Perhaps you would prefer to ${wa(o5)}?`,
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
        sp(
          "Do I have to take that part?",
          `That part is ${lo(o9)}.`,
          "Nói rõ bắt buộc hay không ngay từ đầu — mơ hồ về phí là nguồn phàn nàn lớn nhất.",
        ),
        sp(
          "What else could you arrange?",
          `We could arrange ${wa(o4)} instead.`,
          "'Could' làm lời đề nghị nhẹ đi; 'instead' đặt cuối câu.",
        ),
        sp(
          "What is the third step?",
          `The third step is to ${lo(pa3)}.`,
          "Ôn tuần 15: gọi tên bước bằng số thứ tự — the third step.",
          "colleague",
        ),
        sp(
          "Anything people usually miss?",
          `Do not forget to ${lo(pa7)}.`,
          "Ôn tuần 15: nhắc việc bằng câu mệnh lệnh phủ định.",
          "colleague",
        ),
        sp(
          "Sorry, I did not catch that.",
          "I am sorry, madam. Could you say that once more?",
          "Nhận phần khó nghe về mình, đừng đổ cho khách.",
        ),
      ],
      reading: read(
        `The first choice is not available. ${lx.staff} says: "We do not have that today, but we could offer ${wa(o4)}. Perhaps you would prefer ${wa(o5)}?"`,
        [
          {
            q: "Nhân viên đề nghị mấy phương án thay thế?",
            options: ["Hai", "Một", "Không có phương án nào"],
            correct: 0,
            explanation: `"but we could offer" và "Perhaps you would prefer" — hai lời mời.`,
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
          `No have, madam. Other thing?`,
          "There is nothing at all.",
          undefined,
          "Câu này lịch sự nhưng đóng cửa: từ chối mà không kèm phương án là bỏ khách lại giữa chừng.",
        ),
      ],
    }),

    lesson(lx, 16, 4, "Closing the Offer", "Chốt lời mời", {
      vocabulary: [bw(o6, `Shall I arrange ${wa(o6)}?`), bw(o7, `${Wt(o7)} is ready for you.`)],
      grammar: [
        g(
          `I do it now ok?`,
          `Shall I arrange that for you now?`,
          "'Shall I…?' là mẫu xin phép hành động, rất hay dùng khi chốt dịch vụ.",
          `Shall I to arrange that for you now?`,
        ),
        g(
          `You happy this?`,
          `Would that be suitable for you?`,
          "Câu hỏi xác nhận trang trọng: 'Would that be suitable?'",
          `Would that be suitable to you?`,
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
          `Certainly. ${Wt(o7)} will be ready shortly.`,
          "Xác nhận lại kèm mốc thời gian để khách yên tâm.",
        ),
        sp(
          "What do you never skip?",
          `I always ${lo(pa4)} without fail.`,
          "Ôn tuần 15: trạng từ tần suất trước động từ chính.",
          "colleague",
        ),
        sp(
          "Is it the same every time?",
          `We always ${lo(pa8)}.`,
          "Ôn tuần 15: quy trình chuẩn thì nói ở thì hiện tại đơn.",
        ),
        sp(
          "Why is that so strict?",
          "I am afraid you must, madam. It is a safety rule.",
          "Viện dẫn an toàn thì lời từ chối không còn là ý riêng của bạn.",
        ),
      ],
      reading: read(
        `The guest agrees. ${lx.staff} confirms: "Shall I arrange ${wa(o6)} for you now?" The guest nods. "Certainly. ${Wt(o7)} will be ready shortly, madam." It will be ready in fifteen minutes.`,
        [
          {
            q: "Câu 'Shall I…?' dùng để làm gì?",
            options: [
              "Xin phép làm việc gì đó",
              "Từ chối yêu cầu của khách",
              "Hỏi giá của dịch vụ đó",
            ],
            correct: 0,
            explanation: "'Shall I…?' là mẫu xin phép hành động thay cho khách.",
          },
          {
            q: "Bao lâu nữa thì xong?",
            options: ["Mười lăm phút", "Năm phút", "Hơn một tiếng rưỡi"],
            correct: 0,
            explanation: '"It will be ready in fifteen minutes."',
          },
        ],
      ),
      game: [
        game(
          "Yes please, that would be lovely.",
          "Certainly, madam. I will arrange it now.",
          "I do it now ok?",
          "Thank you, madam. Someone will arrange it at some point today.",
          undefined,
          "Câu này đúng ngữ pháp nhưng không nói ai làm và làm lúc nào — khách không biết mình đang chờ gì.",
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
  const [qo1, qo2, qo3, qo4, po1, po2, po3, po4, qo9, qo10] = lx.bank.offers;
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
          `Could I to have your ${lo(d1)}, please?`,
        ),
        g(
          `What your ${lo(d2)}?`,
          `May I ask about your ${lo(d2)}, madam?`,
          "Câu hỏi cần trợ động từ. 'May I ask…' mềm hơn hỏi trống không.",
          `May I asking about your ${lo(d2)}, madam?`,
        ),
      ],
      speaking: [
        sp(
          "Sure, what do you need from me?",
          `Could I have your ${lo(d1)}, please?`,
          "Khung vàng tuần này. Thay bất kỳ thông tin nào bộ phận bạn cần hỏi.",
        ),
        sp(
          "Here is my health form.",
          `Thank you. And may I ask about your ${lo(d2)}?`,
          "Cảm ơn trước rồi mới hỏi tiếp — nhịp hỏi thông tin dễ chịu hơn nhiều.",
        ),
        sp(
          "Does it matter if it is not exact?",
          `The information must be accurate.`,
          "'Must' cho quy định của khách sạn — sai một chữ có thể hỏng cả đơn.",
        ),
        sp(
          "Sorry, could you repeat that?",
          `Of course. Let me say it clearly.`,
          "Đề nghị lịch sự mở bằng Please + động từ nguyên thể.",
          "colleague",
        ),
        sp(
          "Is there anything you can add?",
          `We also have ${wa(po1)}.`,
          "Ôn tuần 16: mời thêm bằng We also have.",
        ),
        sp(
          "Is there something for me?",
          `Would you like ${wa(qo1)}?`,
          "Ôn tuần 16: mời bằng câu hỏi, đừng khẳng định thay khách.",
        ),
      ],
      reading: read(
        `${lx.staff} needs some information. "Could I have your ${lo(d1)}, please? Thank you. And may I ask about your ${lo(d2)}?" The guest answers politely. The guest answers both questions.`,
        [
          {
            q: "Nhân viên hỏi thông tin đầu tiên là gì?",
            options: [d1.definition, d2.definition, "Số phòng"],
            correct: 0,
            explanation: `"Could I have your ${lo(d1)}?" là câu hỏi đầu tiên.`,
          },
          {
            q: "Khách trả lời mấy câu hỏi?",
            options: ["Cả hai câu", "Chỉ câu đầu", "Không câu nào"],
            correct: 0,
            explanation: '"The guest answers both questions."',
          },
        ],
      ),
      game: [
        game(
          "What information do you need?",
          `Could I have your ${lo(d1)}, please?`,
          `Give me your ${lo(d1)} now.`,
          `I need your ${lo(d1)}, madam, and I need it quickly please.`,
          undefined,
          "Câu này đúng ngữ pháp nhưng là một mệnh lệnh; xin thông tin của khách thì phải hỏi, không đòi.",
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
          "Câu xác nhận đầy đủ 'So that is correct, madam?' — không hỏi cụt 'Correct or no?'.",
          `So that is correctly, madam?`,
        ),
        g(
          `I say wrong you tell me.`,
          `Please correct me if I am wrong.`,
          "Câu điều kiện hai mệnh đề, đúng tầm A2: mệnh lệnh lịch sự + 'if'.",
          `Please correct me if I am wrongly.`,
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
        sp(
          "Is there anything else to check?",
          `Let me check the ${lo(d7)}.`,
          "'Let me + động từ' xin phép làm giúp khách.",
        ),
        sp(
          "So everything is settled?",
          `The ${lo(d9)} is confirmed.`,
          "Câu bị động đơn giản: is + phân từ hai.",
        ),
        sp(
          "What else could you offer?",
          `We could arrange ${wa(po2)} instead.`,
          "Ôn tuần 16: could làm lời đề nghị nhẹ đi.",
        ),
        sp(
          "What else is there?",
          `We also have ${wa(qo2)}.`,
          "Ôn tuần 16: giới thiệu thêm bằng We also have.",
        ),
        sp(
          "Is that part included?",
          `That part is ${lo(qo9)}.`,
          "Ôn tuần 16: nói rõ phần nào đã gồm trong giá.",
        ),
      ],
      reading: read(
        `${lx.staff} repeats the information carefully. "Let me read that back to you. Please correct me if I am wrong." The guest confirms that the ${lo(d9)} is right. One word was wrong, and the guest corrects it.`,
        [
          {
            q: "Nhân viên mời khách làm gì khi đọc lại?",
            options: [
              "Sửa lại nếu có chỗ sai",
              "Ký ngay vào tờ phiếu gọi món",
              "Chờ thêm khoảng mười lăm phút",
            ],
            correct: 0,
            explanation: '"Please correct me if I am wrong."',
          },
          {
            q: "Có bao nhiêu chỗ ghi sai?",
            options: ["Một từ", "Ba từ", "Không có chỗ nào sai"],
            correct: 0,
            explanation: '"One word was wrong, and the guest corrects it."',
          },
        ],
      ),
      game: [
        game(
          "Did you get all of that?",
          "Let me read that back to you, sir.",
          "Correct or no, madam?",
          "No need to check again, madam. I am sure it is right.",
          undefined,
          "Câu này đúng ngữ pháp và bỏ mất bước đọc lại — bước duy nhất bắt được lỗi trước khi nó thành sự cố.",
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
          `Could you spell that slow, please?`,
        ),
        g(
          `I check two time.`,
          `Let me double-check that for you.`,
          "'Let me double-check' là cách nói chuyên nghiệp khi cần kiểm tra lại.",
          `Let me to double-check that for you.`,
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
        sp(
          "Why do you need all this?",
          `The ${lo(d8)} is important.`,
          "Giải thích lý do trước khi xin thêm thông tin.",
        ),
        sp(
          "And what else do you need?",
          `And your ${lo(d5)}, please?`,
          "Nối câu hỏi tiếp bằng And + danh từ + please.",
        ),
        sp(
          "Do many guests take that?",
          `${Wt(po3)} is very popular.`,
          "Ôn tuần 16: gợi ý bằng cái nhiều người chọn.",
        ),
        sp(
          "What do most people take?",
          `${Wt(qo3)} is very popular.`,
          "Ôn tuần 16: gợi ý bằng cái nhiều khách chọn.",
        ),
        sp(
          "What do you need from me?",
          `Could I have your ${lo(d3)}?`,
          "Xin từng mẩu thông tin một, đừng hỏi dồn.",
        ),
      ],
      reading: read(
        `The name is difficult. ${lx.staff} asks: "Could you spell that slowly, please?" Then: "Thank you. Let me read the ${lo(d8)} back to you." Nothing is wrong. The name has six letters.`,
        [
          {
            q: "Sau khi đọc lại, có chỗ nào sai không?",
            options: ["Không có chỗ nào sai", "Sai một chữ", "Sai cả tên"],
            correct: 0,
            explanation: '"Nothing is wrong."',
          },
          {
            q: "Tên khách có mấy chữ cái?",
            options: ["Sáu", "Năm", "Tám"],
            correct: 0,
            explanation: '"The name has six letters."',
          },
        ],
      ),
      game: [
        game(
          "My surname is quite unusual.",
          "Could you spell it slowly, please?",
          "Spell please slow, madam. I no hear name.",
          "Do not worry, madam. I will just write what I heard.",
          undefined,
          "Câu này lịch sự và sai: đoán tên khách là cách nhanh nhất để hỏng cả hồ sơ đặt phòng.",
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
          `I am write your ${lo(d4)} down now.`,
        ),
        g(
          `All finish, thank you.`,
          `That is everything, thank you very much.`,
          "Câu chốt đầy đủ: 'That is everything' thay cho 'All finish'.",
          `That is everything, thank you very many.`,
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
        sp(
          "Will you remember all that?",
          `I will note the ${lo(d10)} for you.`,
          "Ghi lại giúp khách, không bắt khách nhắc lại lần thứ hai.",
        ),
        sp(
          "Anything else from me?",
          `Could I have your ${lo(d4)}?`,
          "Xin thông tin bằng câu hỏi lịch sự, không dùng mệnh lệnh trần.",
        ),
        sp(
          "Could I add something to that?",
          `Would you like ${wa(po4)}, madam?`,
          "Ôn tuần 16: mời thêm bằng câu hỏi lịch sự.",
        ),
        sp(
          "Could we change that?",
          `We could arrange ${wa(qo4)} instead.`,
          "Ôn tuần 16: could làm lời đề nghị nhẹ đi.",
        ),
        sp(
          "What does the price cover?",
          `The price includes ${lo(qo10)}.`,
          "Ôn tuần 16: includes để liệt kê thứ đã tính vào giá.",
        ),
      ],
      reading: read(
        `The last detail is needed. ${lx.staff} says: "Just your ${lo(d4)}, and that is everything." The guest gives it. "Thank you. I am writing it down now." This is the last question on the form.`,
        [
          {
            q: "Nhân viên làm gì ngay sau khi khách trả lời?",
            options: ["Ghi lại ngay", "Đi hỏi bếp", "Đọc lại thực đơn"],
            correct: 0,
            explanation: '"I am writing it down now."',
          },
          {
            q: "Đây là câu hỏi thứ mấy của tờ khai?",
            options: ["Câu cuối cùng", "Câu đầu tiên của tờ khai", "Câu hỏi ở giữa tờ khai"],
            correct: 0,
            explanation: '"This is the last question on the form."',
          },
        ],
      ),
      game: [
        game(
          "Is that all you need?",
          "That is everything, madam. Thank you.",
          "All finish, madam, thank you. No more question.",
          "Maybe, madam. I will call you again if I need more.",
          undefined,
          "Câu này đúng ngữ pháp nhưng để ngỏ; gom hết câu hỏi vào một lần là phép lịch sự với thời gian của khách.",
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
  const [qd1, qd2, qd3, qd4, pd1, pd2, pd3, pd4, qd9, qd10] = lx.bank.details;
  // Ôn xa: nhóm của tuần 15, cách ba tuần.
  const [, ra2, , , , ra6, , ra8] = lx.bank.steps;
  const [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10] = lx.bank.paperwork;
  return [
    lesson(lx, 18, 1, "I Am Preparing It Now", "Đang xử lý giấy tờ", {
      vocabulary: [
        v("Issue", "/ˈɪʃuː/", "Sự cố, vấn đề", "I will report the issue now.", "⚠️"),
        v("Document", "/ˈdɒkjumənt/", "Chứng từ, tài liệu", "The document is ready.", "📄"),
        bw(p1, `I am preparing your ${lo(p1)}.`),
        bw(p9, `Your request is ${lo(p9)}.`),
      ],
      grammar: [
        g(
          `I prepare your ${lo(p1)} now.`,
          `I am preparing your ${lo(p1)} now.`,
          "Việc đang làm ngay lúc này: am/is/are + V-ing, không dùng hiện tại đơn.",
          `I am prepare your ${lo(p1)} now.`,
        ),
        g(
          `Wait, system slow.`,
          // Slot 8 is a REQUEST status ("in progress", "on hold",
          // "confirmed", "with the team"), so predicating it of the system
          // gave "The system is confirmed." / "The system is with the team."
          // The vocab card one lesson up already frames it correctly.
          `One moment, please. Your request is ${lo(p9)}.`,
          "Giải thích lý do chờ bằng câu đủ — khách chờ có lý do thì kiên nhẫn hơn.",
          `One moment, please. Your request is being ${lo(p9)}.`,
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
        sp(
          "When will the card be made?",
          `We issue the card today.`,
          "Hiện tại đơn cho việc theo quy trình; chủ ngữ we thì động từ giữ nguyên.",
        ),
        sp(
          "Is the paper ready yet?",
          `The document is ready.`,
          "Câu trạng thái ngắn, đủ chủ ngữ và động từ to be.",
        ),
        sp(
          "What do you need from me first?",
          `Could I have your ${lo(pd1)}, please?`,
          "Ôn tuần 17: xin thông tin bằng câu hỏi lịch sự.",
        ),
        sp(
          "Where do we start?",
          `Could I have your ${lo(qd1)}?`,
          "Ôn tuần 17: xin thông tin bằng Could I have.",
        ),
        sp(
          "What comes after that?",
          `Could I have your ${lo(qd3)}?`,
          "Ôn tuần 17: hỏi tiếp một mẩu nữa, vẫn giữ giọng xin phép.",
        ),
        sp(
          "Remind me how the process goes?",
          `First I ${lo(ra2)}, then I continue.`,
          "Ôn tuần 15: nối hai bước bằng then, mỗi câu một bước.",
        ),
        sp(
          "Will you write that down?",
          "I will note it clearly on the document.",
          "Nói ra là mình đang ghi, khách yên tâm thông tin không rơi.",
        ),
        sp(
          "Could you make an exception for me?",
          "I cannot decide that, madam. May I ask my manager?",
          "Câu quan trọng nhất của cả phase: nói thẳng mình không được quyết, rồi xin phép đi hỏi.",
        ),
      ],
      reading: read(
        `The guest waits at the desk. ${lx.staff} says: "Just a moment, sir. I am preparing your ${lo(p1)}. Your request is ${lo(p9)} now." The guest waits calmly. It will take two more minutes.`,
        [
          {
            q: "Nhân viên đang làm gì?",
            options: [
              `Chuẩn bị ${p1.definition.toLowerCase()}`,
              "Đi nghỉ ở phòng nhân viên",
              "Gọi điện cho quản lý ca",
            ],
            correct: 0,
            explanation: `"I am preparing your ${lo(p1)}."`,
          },
          {
            q: "Còn phải chờ bao lâu nữa?",
            options: ["Hai phút", "Hai giờ", "Bài đọc không nói"],
            correct: 0,
            explanation: '"It will take two more minutes."',
          },
        ],
      ),
      game: [
        game(
          "Why is it taking so long?",
          `I am preparing your ${lo(p1)} now, sir.`,
          "Wait, madam, system slow.",
          "The system is very slow today, madam, and I cannot help.",
          undefined,
          "Câu này đúng ngữ pháp nhưng đổ lỗi cho hệ thống; khách chỉ cần biết bạn đang làm gì lúc này.",
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
          `You need sign here, please.`,
        ),
        g(
          `This ${lo(p3)} right?`,
          `Is the ${lo(p3)} correct, madam?`,
          "Câu hỏi Yes/No bắt đầu bằng 'Is', kèm mạo từ 'the'.",
          `Is the ${lo(p3)} correctly, madam?`,
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
        sp(
          "Where do I write it?",
          `Please ${lo(p10)} on this line.`,
          "Chỉ chỗ ký bằng Please + động từ + on this line.",
        ),
        sp(
          "Did I fill it in right?",
          `Is the ${lo(p3)} correct?`,
          "Hỏi xác nhận lại trước khi chốt — sửa lúc này rẻ hơn sửa sau.",
        ),
        sp(
          "Anything else about me?",
          `May I ask about your ${lo(pd2)}?`,
          "Ôn tuần 17: hỏi thông tin tế nhị bằng May I ask about.",
        ),
        sp(
          "Go ahead, ask me.",
          `May I ask about your ${lo(qd2)}?`,
          "Ôn tuần 17: May I ask about cho thông tin tế nhị.",
        ),
        sp(
          "Could I have one more?",
          "Of course. May I offer you an extra one?",
          "Nhận lời trước, rồi mới hỏi chi tiết.",
        ),
        sp(
          "What do you need from me now?",
          `May I have your ${lo(p2)}?`,
          "Xin đúng một thứ mỗi lần, khách khỏi rối.",
        ),
      ],
      reading: read(
        `${lx.staff} hands over the form. "You need to sign here, please. Is the ${lo(p3)} correct?" The guest checks and signs the paper. The guest signs at the bottom of the page.`,
        [
          {
            q: "Khách cần làm gì với tờ giấy?",
            options: ["Ký tên", "Xé bỏ", "Mang về"],
            correct: 0,
            explanation: `"You need to sign here, please."`,
          },
          {
            q: "Khách ký ở chỗ nào trên tờ giấy?",
            options: ["Cuối trang", "Đầu trang", "Bên lề trái"],
            correct: 0,
            explanation: '"The guest signs at the bottom of the page."',
          },
        ],
      ),
      game: [
        game(
          "Do I have to fill in everything?",
          "Only this part, madam. You need to sign here.",
          "You sign here only.",
          "Yes, madam. Please complete every single line on both pages.",
          undefined,
          "Câu này đúng ngữ pháp nhưng bắt khách làm nhiều hơn mức cần; chỉ đúng ô phải điền cũng là một phần của dịch vụ.",
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
        bw(p8, `You can ${lo(p8)} whenever you are ready.`),
      ],
      grammar: [
        g(
          `Plus ten percent more.`,
          `A ten percent ${lo(p5)} is added.`,
          "Câu bị động đơn giản: A … IS ADDED. Nói rõ khoản phí, tránh mơ hồ về tiền.",
          `A ten percent ${lo(p5)} is add.`,
        ),
        g(
          `You pay how?`,
          `How would you like to pay, sir?`,
          "Hỏi hình thức thanh toán chuẩn mực: 'How would you like to pay?'",
          `How would you like to paying, sir?`,
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
        sp(
          "Is there anything added?",
          `${wa(p5).charAt(0).toUpperCase()}${wa(p5).slice(1)} is added to your bill.`,
          "Nói rõ khoản phí ngay, đừng để khách phát hiện lúc thanh toán.",
        ),
        sp(
          "Can I do that now or later?",
          `You can ${lo(p8)} whenever you like.`,
          "'You can + động từ' cho phép một cách nhẹ nhàng.",
        ),
        sp(
          "Do you need more details?",
          `Could I have your ${lo(pd3)}?`,
          "Ôn tuần 17: mỗi lần hỏi một mẩu thông tin.",
        ),
        sp(
          "So it is all agreed?",
          `The ${lo(qd9)} is confirmed.`,
          "Ôn tuần 17: chốt lại bằng một câu ngắn.",
        ),
        sp(
          "And the last thing?",
          `Could I have your ${lo(qd4)}?`,
          "Ôn tuần 17: gom câu hỏi cuối vào một lần cho gọn.",
        ),
        sp(
          "What do you do before anything else?",
          `I always ${lo(ra6)} first, madam.`,
          "Ôn tuần 15: always đứng trước động từ chính.",
        ),
        sp(
          "I did not hear you.",
          "I am sorry, sir. Let me say that again slowly.",
          "Người nói lại là bạn, không phải khách.",
        ),
      ],
      reading: read(
        `The guest asks about an extra line on the bill. ${lx.staff} explains: "A ten percent ${lo(p5)} is added, sir. You can ${lo(p8)} whenever you are ready." The extra line is ten percent of the total.`,
        [
          {
            q: "Khoản thêm trên hóa đơn là gì?",
            options: [p5.definition, "Tiền phòng một đêm", "Tiền phạt trả muộn"],
            correct: 0,
            explanation: `"A ten percent ${lo(p5)} is added."`,
          },
          {
            q: "Khoản thêm bằng bao nhiêu phần trăm?",
            options: ["Mười phần trăm", "Năm phần trăm", "Hai mươi phần trăm"],
            correct: 0,
            explanation: '"The extra line is ten percent of the total."',
          },
        ],
      ),
      game: [
        game(
          "What is this charge on my bill?",
          `That is the ${lo(p5)}, sir. Ten percent.`,
          "Plus ten percent, madam.",
          "I am not sure, madam.",
          undefined,
          "Câu này đúng ngữ pháp nhưng bỏ khách lại với một khoản tiền không ai giải thích.",
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
          `We keep one copy and you keeps one.`,
        ),
        g(
          `Paper for you here.`,
          `Here is your ${lo(p7)}, madam.`,
          "Trao giấy tờ cho khách nói 'Here is your…' kèm cử chỉ hai tay.",
          `Here are your ${lo(p7)}, madam.`,
        ),
      ],
      speaking: [
        sp(
          "Is there a slip for this?",
          `Of course. Here is your ${lo(p7)}, sir.`,
          "Luôn chủ động đưa bản sao cho khách, đừng đợi họ hỏi.",
        ),
        sp(
          "And you keep the original?",
          `Yes. We keep one copy and you keep one.`,
          "Giải thích rõ ai giữ bản nào để khách không lo lắng về giấy tờ.",
        ),
        sp(
          "Is that everything you need?",
          `And your ${lo(pd4)}, please?`,
          "Ôn tuần 17: nối câu hỏi tiếp bằng And.",
        ),
        sp(
          "Will you remember that?",
          `I will note the ${lo(qd10)} for you.`,
          "Ôn tuần 17: ghi lại là một cam kết, nói ra cho khách yên tâm.",
        ),
        sp(
          "And then what happens?",
          `Next I ${lo(ra8)}, madam.`,
          "Ôn tuần 15: gọi tên bước tiếp theo bằng Next.",
        ),
        sp(
          "Do I have to do that?",
          "Yes, madam. That is a safety rule here.",
          "Trả lời thẳng rồi nêu nguồn của quy định.",
        ),
      ],
      reading: read(
        `The paperwork is finished. ${lx.staff} says: "Here is your ${lo(p7)}, madam. We keep one copy and you keep one. The ${lo(p4)} is on file." There are two copies of the paper.`,
        [
          {
            q: "Khách nhận được gì?",
            options: [p7.definition, "Không nhận gì", "Toàn bộ hồ sơ"],
            correct: 0,
            explanation: `"Here is your ${lo(p7)}."`,
          },
          {
            q: "Tờ giấy có mấy bản?",
            options: ["Hai bản", "Một bản", "Ba bản"],
            correct: 0,
            explanation: '"There are two copies of the paper."',
          },
        ],
      ),
      game: [
        game(
          "Should I keep this paper?",
          `Yes, madam. That is your ${lo(p7)}.`,
          "I keep one, you keep.",
          "You can throw it away, madam. We keep a copy here anyway.",
          undefined,
          "Câu này đúng ngữ pháp và sai: tờ giấy đó là bằng chứng của khách, không phải bản lưu của khách sạn.",
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
  const [pp1, pp2, pp3, pp4, , pp6, pp7, pp8, pp9, pp10] = lx.bank.paperwork;
  // Ôn xa: nhóm của tuần 16, cách ba tuần.
  const [, ro2, , ro4, , ro6] = lx.bank.offers;
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
          `You must wearing it, sir.`,
        ),
        g(
          `No allowed here.`,
          `I am afraid that is not allowed here.`,
          "Báo điều cấm cần mở đầu bằng 'I am afraid' để giảm cảm giác bị mắng.",
          `I am afraid that is not allow here.`,
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
        sp(
          "Are there rules about that?",
          `Please respect the ${lo(r1)}.`,
          "Nhắc nội quy bằng Please, không bằng mệnh lệnh trần.",
        ),
        sp(
          "Is that a hotel rule?",
          `This is a hotel ${lo(r10)}.`,
          "Nêu nguồn của quy định để khách dễ chấp nhận hơn.",
        ),
        sp(
          "What are you getting ready?",
          `Your ${lo(pp1)} is almost ready.`,
          "Ôn tuần 18: hiện tại tiếp diễn cho việc đang làm.",
        ),
        sp(
          "How should I settle this?",
          `Which ${lo(pp6)} would you prefer?`,
          "Ôn tuần 18: hỏi cách thanh toán bằng Which.",
        ),
        sp(
          "Can you just let me do it?",
          "I cannot decide that alone. I will call my supervisor.",
          "Không quyết một mình việc vượt quyền — đó là cách tự bảo vệ mình.",
        ),
      ],
      reading: read(
        `A guest asks about a restriction. ${lx.staff} answers: "I am afraid that is not allowed, madam. It is a hotel ${lo(r10)}, for everyone's safety." The rule is the same for every guest.`,
        [
          {
            q: "Nhân viên mở đầu lời từ chối bằng cụm nào?",
            options: ["I am afraid", "No allowed", "You cannot"],
            correct: 0,
            explanation: "'I am afraid' làm lời từ chối mềm đi đáng kể.",
          },
          {
            q: "Quy định áp dụng cho ai?",
            options: ["Mọi khách", "Chỉ khách mới đến", "Chỉ khách ở dài ngày"],
            correct: 0,
            explanation: '"The rule is the same for every guest."',
          },
        ],
      ),
      game: [
        game(
          "Is it okay if I do this here?",
          "I am afraid that is not allowed, sir.",
          "No allowed here, madam.",
          "Yes of course, madam. Nobody at all will mind today.",
          undefined,
          "Câu này lịch sự và sai: cho phép một việc bị cấm là đẩy hậu quả sang ca sau dọn.",
        ),
      ],
    }),

    lesson(lx, 19, 2, "Safety Warnings", "Cảnh báo an toàn", {
      vocabulary: [
        bw(r4, `The ${lo(r4)} is over there.`),
        bw(r5, `Please do not touch the ${lo(r5)}, madam.`),
        bw(r9, `May I remind you of the ${lo(r9)}?`),
      ],
      grammar: [
        g(
          `Careful! Danger there!`,
          `Please be careful. That area is not safe.`,
          "Cảnh báo lịch sự: 'Please be careful' rồi mới nói lý do, giọng bình tĩnh.",
          `Please be careful. That area is not safely.`,
        ),
        g(
          `I remind you the rule.`,
          `May I remind you of the ${lo(r9)}?`,
          "Sau 'remind' cần giới từ 'of': remind you OF the rule.",
          `May I remind you the ${lo(r9)}?`,
        ),
      ],
      speaking: [
        sp(
          "What is that over there?",
          `That is the ${lo(r4)}, madam. Please do not touch it.`,
          "Chỉ rõ vị trí thiết bị an toàn cho khách — nhiều khách không để ý.",
        ),
        sp(
          "I did not know about that.",
          `May I remind you of the ${lo(r9)}, madam?`,
          "Nhắc quy định bằng câu xin phép, không bằng giọng dạy dỗ.",
        ),
        sp(
          "Where should I look?",
          `The ${lo(r4)} is over there.`,
          "Chỉ chỗ bằng một mốc khách nhìn thấy được.",
        ),
        sp(
          "Can I touch this?",
          `Please do not touch the ${lo(r5)}, madam.`,
          "Cấm bằng 'Do not + động từ', rồi giải thích lý do ngay sau.",
        ),
        sp(
          "What do you need me to give you?",
          `Could I see your ${lo(pp2)}, please?`,
          "Ôn tuần 18: xin giấy tờ của khách.",
        ),
        sp(
          "Do I keep anything?",
          `Here is your ${lo(pp7)}.`,
          "Ôn tuần 18: trao giấy tờ kèm một câu ngắn.",
        ),
        sp(
          "Where do I write my name?",
          `Please ${lo(pp10)} on this line.`,
          "Ôn tuần 18: chỉ chỗ ký bằng một câu mệnh lệnh lịch sự.",
        ),
      ],
      reading: read(
        `${lx.staff} points to the equipment. "That is the ${lo(r4)}, sir. Please do not touch the ${lo(r5)}." The guest thanks ${lx.staff} for the warning. The guest steps back and says thank you.`,
        [
          {
            q: "Khách được dặn không chạm vào gì?",
            options: [r5.definition, r4.definition, "Cửa ra vào"],
            correct: 0,
            explanation: `"Please do not touch the ${lo(r5)}."`,
          },
          {
            q: "Khách phản ứng thế nào sau lời cảnh báo?",
            options: ["Lùi lại và cảm ơn", "Vẫn chạm vào", "Bỏ đi ngay"],
            correct: 0,
            explanation: '"The guest steps back and says thank you."',
          },
        ],
      ),
      game: [
        game(
          "Can I have a look at that equipment?",
          "Please do not touch it, sir. It is for emergencies.",
          "Careful, madam! Danger there, no touch that!",
          "Of course, madam. Please take a closer look at it.",
          undefined,
          "Câu này lịch sự và nguy hiểm: thiết bị khẩn cấp bị xê dịch thì lúc cần sẽ không nằm đúng chỗ.",
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
          `Smoking is only allow outside, sir.`,
        ),
        g(
          `Rule say two person only.`,
          `The rule says two people only.`,
          "'says' có -s; 'person' số nhiều là 'people'.",
          `The rule say two people only.`,
        ),
      ],
      speaking: [
        sp(
          "Where can I smoke?",
          `The ${lo(r3)} is outside, near the garden.`,
          "Chỉ nơi được phép thay vì chỉ nói nơi bị cấm — hữu ích hơn cho khách.",
        ),
        sp(
          "Is there any way around that?",
          `I am afraid our ${lo(r2)} does not allow that.`,
          "Viện dẫn quy định thay vì ý kiến cá nhân, khách sẽ không tranh luận với bạn.",
        ),
        sp(
          "What is your policy here?",
          `Our ${lo(r2)} is simple.`,
          "Mở đầu bằng câu ngắn rồi mới vào chi tiết.",
        ),
        sp(
          "Which one should I use?",
          `Please use the ${lo(r7)}.`,
          "Chỉ đúng thứ khách nên dùng: Please use the + danh từ.",
        ),
        sp(
          "Did I write it correctly?",
          `Let me check the ${lo(pp3)} again.`,
          "Ôn tuần 18: hỏi xác nhận trước khi chốt.",
        ),
        sp(
          "Is there anything extra you offer?",
          `Would you like ${wa(ro2)}, madam?`,
          "Ôn tuần 16: mời thêm dịch vụ bằng Would you like.",
        ),
        sp(
          "When may I do that?",
          `You can ${lo(pp8)} whenever you are ready.`,
          "Ôn tuần 18: can để nói khách được phép.",
        ),
      ],
      reading: read(
        `A guest asks about the rules. ${lx.staff} explains: "The ${lo(r3)} is outside, near the garden. Our ${lo(r2)} does not allow that, madam." It is five minutes from the lobby.`,
        [
          {
            q: "Khu vực hút thuốc ở đâu?",
            options: ["Bên ngoài, gần vườn", "Trong phòng của khách", "Ở sảnh chính khách sạn"],
            correct: 0,
            explanation: `"The ${lo(r3)} is outside, near the garden."`,
          },
          {
            q: "Chỗ đó cách sảnh bao xa?",
            options: ["Năm phút", "Ngay cạnh sảnh", "Bài đọc không nói"],
            correct: 0,
            explanation: '"It is five minutes from the lobby."',
          },
        ],
      ),
      game: [
        game(
          "Am I allowed to smoke in the room?",
          `I am afraid not. The ${lo(r3)} is outside.`,
          `Smoking only outside, madam. Room no smoking.`,
          "Yes, madam. Just open the window and it will be fine.",
          undefined,
          "Câu này đúng ngữ pháp và sai: mở cửa sổ không đổi được quy định phòng cháy, và tiền phạt sẽ về hoá đơn của khách.",
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
          `Please keep your ${lo(r6)} in safety box.`,
        ),
        g(
          `If fire, you run outside.`,
          `If there is a fire, please use the exit.`,
          "Câu điều kiện đầy đủ: 'If there is a fire,' + lời hướng dẫn lịch sự.",
          `If there is a fire, please to use the exit.`,
        ),
      ],
      speaking: [
        sp(
          "Where should I keep this?",
          `Please keep your ${lo(r6)} in the safety box.`,
          "Chủ động nhắc khách cất đồ giá trị — phòng ngừa tốt hơn xử lý mất mát.",
        ),
        sp(
          "What do I do in an emergency?",
          `If there is a fire, please use the exit.`,
          "Hướng dẫn khẩn cấp phải ngắn, rõ, dễ nhớ.",
        ),
        sp(
          "Where can I put this?",
          `Please keep your ${lo(r6)} safe.`,
          "Nhắc giữ đồ giá trị — nói trước còn hơn xử lý mất mát sau.",
        ),
        sp(
          "Could you make an exception?",
          `That is ${lo(r8)}, I am afraid.`,
          "Từ chối kèm 'I am afraid' để giữ thể diện cho khách.",
        ),
        sp(
          "Is anything kept on record?",
          `The ${lo(pp4)} is on file.`,
          "Ôn tuần 18: nói rõ thứ gì được lưu lại.",
        ),
        sp(
          "What else could I add to that?",
          `We also have ${wa(ro4)}.`,
          "Ôn tuần 16: giới thiệu thêm lựa chọn bằng We also have.",
        ),
        sp(
          "Is my request done?",
          `Your request is ${lo(pp9)}.`,
          "Ôn tuần 18: báo trạng thái bằng một tính từ.",
        ),
        sp(
          "Anything on offer today?",
          `${Wt(ro6)} is available today, sir.`,
          "Ôn tuần 16: báo dịch vụ có sẵn bằng is available.",
        ),
        sp(
          "The guest wants me to break the rule.",
          "Do not decide alone. Call the supervisor first.",
          "Nhắc đồng nghiệp bằng hai câu ngắn, trước khi họ lỡ tay.",
          "colleague",
        ),
      ],
      reading: read(
        `${lx.staff} gives safety advice. "Please keep your ${lo(r6)} in the safety box. If there is a fire, please use the exit near the stairs." The exit is near the stairs, not the lift.`,
        [
          {
            q: "Khách nên cất đồ giá trị ở đâu?",
            options: ["Trong két an toàn", "Trên bàn trong phòng", "Trong va li của khách"],
            correct: 0,
            explanation: `"Please keep your ${lo(r6)} in the safety box."`,
          },
          {
            q: "Lối thoát hiểm ở gần cái gì?",
            options: ["Cầu thang bộ", "Thang máy", "Quầy lễ tân"],
            correct: 0,
            explanation: '"The exit is near the stairs, not the lift."',
          },
        ],
      ),
      game: [
        game(
          "Is my laptop safe in the room?",
          "Please use the safety box, sir. It is safer.",
          "Put in box please.",
          "Your room is completely safe, madam. Nothing has ever happened.",
          undefined,
          "Câu này lịch sự và là một lời bảo đảm mà bạn không có quyền đưa ra.",
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
  const [pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8, pr9, pr10] = lx.bank.rules;
  // Ôn xa: tuần 17 cách ba tuần, tuần 15 cách năm tuần.
  const [rd1, , rd3, , , , , rd8] = lx.bank.details;
  const [sa1, , , , , sa6] = lx.bank.steps;
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
          `Would you prefer to the ${lo(c1)} or the ${lo(c2)}?`,
        ),
        g(
          `Two is good same.`,
          `Both are excellent choices, madam.`,
          "'Both are…' dùng cho hai thứ; động từ chia số nhiều 'are'.",
          `Both is excellent choices, madam.`,
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
          "Khen cả hai lựa chọn để khách không thấy mình vừa chọn sai.",
        ),
        sp(
          "Are there rules about that?",
          `We keep to the ${lo(pr1)} here too.`,
          "Ôn tuần 19: viện dẫn quy định của khách sạn, không phải ý mình.",
        ),
        sp(
          "Can I move this?",
          `Please do not touch the ${lo(pr5)}, madam.`,
          "Ôn tuần 19: cấm bằng câu mệnh lệnh phủ định, ngắn và rõ.",
        ),
        sp(
          "I did not know about that.",
          `May I remind you of the ${lo(pr9)}?`,
          "Ôn tuần 19: nhắc quy định bằng câu hỏi, không bằng lời trách.",
        ),
        sp(
          "What do you need from me?",
          `Could I have your ${lo(rd1)}, please?`,
          "Ôn tuần 17: xin thông tin bằng Could I have.",
        ),
        sp(
          "Is this the right form?",
          "Yes, madam. Please check every detail is accurate.",
          "Mời khách tự soát một lượt trước khi ký.",
        ),
      ],
      reading: read(
        `The guest hesitates. ${lx.staff} helps: "Would you prefer ${wt(c1)} or ${wt(c2)}, madam? Both are excellent choices." The guest picks one quickly. The guest takes only a moment to decide.`,
        [
          {
            q: "Nhân viên đánh giá hai lựa chọn thế nào?",
            options: ["Cả hai đều rất tốt", "Một cái tốt hơn hẳn", "Không nói gì về chúng"],
            correct: 0,
            explanation: '"Both are excellent choices."',
          },
          {
            q: "Khách quyết định trong bao lâu?",
            options: [
              "Chỉ một khoảnh khắc",
              "Sau khoảng hai mươi phút",
              "Phải đợi đến tận hôm sau",
            ],
            correct: 0,
            explanation: '"The guest takes only a moment to decide."',
          },
        ],
      ),
      game: [
        game(
          "Which one should I take?",
          `Would you prefer the ${lo(c1)} or the ${lo(c2)}?`,
          `You like ${lo(c1)} or ${lo(c2)} more, madam?`,
          `Take the ${lo(c1)}, madam. That is the one I would take.`,
          undefined,
          "Câu này đúng ngữ pháp nhưng quyết thay khách; việc của bạn là đưa hai lựa chọn thật rõ.",
        ),
      ],
    }),

    lesson(lx, 20, 2, "Making a Recommendation", "Đưa ra lời khuyên", {
      vocabulary: [
        bw(c10, `${Wt(c10)} is very popular.`),
        bw(c8, `The ${lo(c8)} is a good match.`),
        // Slot 9 holds a CONSIDERATION a guest weighs (skin type, water
        // saving, personal opinion), not a weather-dependent thing — "The
        // personal opinion depends on the weather." made no sense in four of
        // six departments.
        bw(c9, `${Wt(c9)} is worth considering.`),
      ],
      grammar: [
        g(
          `I think good this one.`,
          `I would suggest this one, sir.`,
          "'I would suggest…' là mẫu khuyên chuẩn mực, nhã nhặn hơn 'I think good'.",
          `I would suggesting this one, sir.`,
        ),
        g(
          `Because is popular.`,
          `Because it is very popular with our guests.`,
          "Mệnh đề 'because' cần chủ ngữ: because IT IS popular.",
          `Because it is very popular with our guest.`,
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
        sp(
          "Which is the popular one?",
          `${Wt(c10)} is very popular.`,
          "Gợi ý bằng cái nhiều người chọn.",
        ),
        sp(
          "Would that suit me?",
          `The ${lo(c8)} is a good match.`,
          "Lời khuyên phải kèm lý do, đừng chỉ nói tốt.",
        ),
        sp(
          "What is the policy here?",
          `We follow the ${lo(pr2)} closely.`,
          "Ôn tuần 19: mở đầu ngắn rồi mới vào chi tiết.",
        ),
        sp(
          "Where should I leave this?",
          `Please keep your ${lo(pr6)} safe.`,
          "Ôn tuần 19: nhắc giữ đồ mà không doạ khách.",
        ),
        sp(
          "Ask me anything you need.",
          `May I ask about your ${lo(rd3)}?`,
          "Ôn tuần 17: hỏi thông tin tế nhị bằng May I ask about.",
        ),
        sp(
          "Is there another idea?",
          `${Wt(c9)} is worth considering.`,
          "Đưa thêm một hướng thay vì lặp lại hướng cũ.",
        ),
        sp(
          "What other choice is there?",
          "I can offer you one more choice, sir.",
          "Đưa thêm đúng một lựa chọn, đừng liệt kê cả danh sách.",
        ),
      ],
      reading: read(
        // `It would ${lo(c8)} nicely` put a NOUN slot where the frame's own
        // verb goes — "It would environment nicely.", "It would relaxing
        // option nicely." The sentence the author meant is two lines up in
        // the same lesson, at the second sp(): "It would suit you very
        // nicely." Also "suggest THE {c10}": the bare version read as
        // "I would suggest guest decision".
        `The guest wants advice. ${lx.staff} says: "I would suggest the ${lo(c10)}, because it is very popular with our guests. It would suit you nicely." Most guests choose the same one.`,
        [
          {
            q: "Nhân viên nêu lý do gợi ý là gì?",
            options: [
              "Vì rất được khách ưa chuộng",
              "Vì đó là chỗ rẻ nhất",
              "Vì chỉ còn mỗi chỗ đó",
            ],
            correct: 0,
            explanation: '"because it is very popular with our guests"',
          },
          {
            q: "Phần lớn khách chọn thế nào?",
            options: ["Cùng một thứ", "Mỗi người một khác", "Bài đọc không nói"],
            correct: 0,
            explanation: '"Most guests choose the same one."',
          },
        ],
      ),
      game: [
        game(
          "Which do most people choose?",
          `Most guests choose the ${lo(c10)}, madam.`,
          "I think good this one.",
          "I really do not know, madam. Nobody has ever asked me that.",
          undefined,
          "Câu này đúng ngữ pháp nhưng bỏ lỡ đúng câu hỏi dễ trả lời nhất trong cả ca của bạn.",
        ),
      ],
    }),

    lesson(lx, 20, 3, "Respecting the Guest's Choice", "Tôn trọng quyết định của khách", {
      vocabulary: [
        bw(c3, `${Wt(c3)} is available too.`),
        bw(c4, `We also have the ${lo(c4)}.`),
        bw(c7, `The ${lo(c7)} is fine, sir.`),
      ],
      grammar: [
        g(
          `Yes, that good choice also.`,
          `Of course, that is a good choice too.`,
          "Câu cần đủ động từ 'is' và mạo từ 'a': that IS A good choice. 'Too' đứng cuối câu.",
          `Of course, that is good choice too.`,
        ),
        g(
          `Up to you all same.`,
          `Either one, sir. Whichever you prefer.`,
          "'Whichever you prefer' là cách nói 'tùy anh/chị' lịch sự và trang trọng.",
          `Either one, sir. Whichever you prefers.`,
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
        sp(
          "Is there another one?",
          `${Wt(c3)} is available too.`,
          "'Available too' mở thêm lựa chọn mà không ép.",
        ),
        sp(
          "What else do you have?",
          `We also have the ${lo(c4)}.`,
          "Giới thiệu thêm lựa chọn bằng We also have.",
        ),
        sp(
          "Where is that area?",
          `You will find the ${lo(pr3)} outside.`,
          "Ôn tuần 19: chỉ chỗ bằng một mốc nhìn thấy được.",
        ),
        sp(
          "Which one should I use?",
          `Please use the ${lo(pr7)}.`,
          "Ôn tuần 19: chỉ lối bằng Please use.",
        ),
        sp(
          "Will you remember all that?",
          `I will note the ${lo(rd8)} for you.`,
          "Ôn tuần 17: ghi lại là một cam kết, nói ra cho khách yên tâm.",
        ),
        sp(
          "Would that be all right?",
          `The ${lo(c7)} is fine, sir.`,
          "Nói rõ lựa chọn của khách là ổn, khách sẽ thôi phân vân.",
        ),
        sp(
          "Could you repeat that?",
          "Of course, sir. I will speak more clearly.",
          "Hứa nói rõ hơn thì lịch sự hơn là xin khách nói to lên.",
        ),
        sp(
          "Who can change this for me?",
          "My manager can, sir. I will ask my manager to come.",
          "Nói rõ ai có quyền, rồi đi mời người đó tới.",
        ),
      ],
      reading: read(
        `The guest chooses differently. ${lx.staff} answers warmly: "Of course, that is a good choice too, sir. Whichever you prefer." The guest feels comfortable. The staff member does not argue.`,
        [
          {
            q: "Khách cảm thấy thế nào sau câu trả lời?",
            options: ["Thoải mái", "Bị ép buộc", "Khó xử"],
            correct: 0,
            explanation: '"The guest feels comfortable."',
          },
          {
            q: "Nhân viên có tranh luận lại không?",
            options: ["Không tranh luận", "Có, một chút", "Có, tranh luận khá lâu"],
            correct: 0,
            explanation: '"The staff member does not argue."',
          },
        ],
      ),
      game: [
        game(
          "I think I prefer the other option.",
          "Of course, madam. That is a good choice too.",
          "No, that not good.",
          "Are you quite sure, madam?",
          undefined,
          "Câu này đúng ngữ pháp nhưng ép khách nghĩ lại; đổi ý là quyền của khách.",
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
          `So you would like the ${lo(c5)}, correctly?`,
        ),
        g(
          `Ok I do now.`,
          `Very good. I will arrange that now.`,
          "'Very good' + cam kết hành động là cách chốt chuyên nghiệp.",
          `Very good. I will arranging that now.`,
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
        sp(
          "Where should I look for it?",
          `The ${lo(pr4)} is on your right.`,
          "Ôn tuần 19: chỉ chỗ bằng The … is over there.",
        ),
        sp(
          "Could you make an exception?",
          `That is ${lo(pr8)}, I am afraid.`,
          "Ôn tuần 19: từ chối kèm I am afraid cho nhẹ.",
        ),
        sp(
          "How does your shift start?",
          `First I ${lo(sa1)}, then I continue.`,
          "Ôn tuần 15 — cách năm tuần: trình tự các bước.",
        ),
        sp(
          "Please go ahead with it.",
          `We will arrange the ${lo(c6)} then.`,
          "Chốt xong thì nói ngay mình sẽ làm gì.",
        ),
        sp(
          "Is that your own rule?",
          `This is a hotel ${lo(pr10)}.`,
          "Ôn tuần 19: viện dẫn khách sạn để khách không tranh luận với bạn.",
        ),
        sp(
          "What comes first for you?",
          `I always ${lo(sa6)} first, madam.`,
          "Ôn tuần 15 — cách năm tuần: always đứng trước động từ chính.",
        ),
        sp(
          "Why must I do that?",
          "Every guest must do that, madam. It is our safety rule.",
          "Nói rõ quy định áp dụng cho mọi khách, không riêng ai.",
        ),
        sp(
          "Anything you could not handle?",
          "One request. I am passing it to you now.",
          "Báo lên đúng lúc còn gỡ được, không đợi hết ca.",
          "manager",
        ),
      ],
      reading: read(
        `The decision is made. ${lx.staff} confirms: "So you would like ${wt(c5)}, correct?" The guest agrees. "Very good, sir. I will arrange that now." The work starts straight away.`,
        [
          {
            q: "Khách phản ứng thế nào khi được chốt lại?",
            options: ["Đồng ý", "Đổi sang thứ khác", "Không trả lời"],
            correct: 0,
            explanation: '"The guest agrees."',
          },
          {
            q: "Việc được bắt đầu khi nào?",
            options: ["Ngay lập tức", "Sáng hôm sau", "Cuối ca"],
            correct: 0,
            explanation: '"The work starts straight away."',
          },
        ],
      ),
      game: [
        game(
          "Yes, that is my final choice.",
          "Very good, madam. I will arrange it now.",
          "So you take this one?",
          "Noted, madam. Someone will look at it later on today.",
          undefined,
          "Câu này đúng ngữ pháp nhưng không nói ai làm và khi nào; chốt xong thì làm ngay.",
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
  const [pc1, pc2, pc3, pc4, pc5, pc6, pc7, pc8, pc9, pc10] = lx.bank.choices;
  // Ôn xa: tuần 18 cách ba tuần, tuần 16 cách năm tuần.
  const [rp1, rp2, , , , , rp7] = lx.bank.paperwork;
  const [, , ro3, , , , ro7] = lx.bank.offers;
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
          `I did ${lo(e1)} it yesterday, sir.`,
          `I ${lo(e1)} it yesterday, sir.`,
          "Động từ đã ở dạng quá khứ rồi thì không thêm 'did' phía trước — chỉ dùng một dấu hiệu quá khứ.",
          `I have ${lo(e1)} it yesterday, sir.`,
        ),
        g(
          `Yesterday I do it.`,
          `I did it yesterday.`,
          "Động từ phải chia quá khứ: do → DID. Đây là lỗi phổ biến nhất của người Việt.",
          `I was did it yesterday.`,
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
        sp(
          "What did you finish, and when?",
          `I ${lo(e1)} it ${lo(e5)}, and it is done now.`,
          "Quá khứ đơn: động từ chia quá khứ, mốc thời gian đặt cuối câu.",
          "colleague",
        ),
        sp(
          "How many were there?",
          `We had twelve ${lo(e6)} today, and all went well.`,
          "Số nhiều đếm được đi với had; con số đọc thành chữ.",
          "colleague",
        ),
        sp(
          "Which one would you suggest?",
          `Many guests choose the ${lo(pc1)}, and they are happy.`,
          "Ôn tuần 20: đưa lựa chọn bằng câu hỏi, không quyết thay khách.",
        ),
        sp(
          "Yes, that one please.",
          `So you would like the ${lo(pc5)}?`,
          "Ôn tuần 20: nhắc lại lựa chọn để xác nhận.",
        ),
        sp(
          "How was it earlier?",
          `${e5.word} was very busy.`,
          "Nêu bối cảnh trước, người nghe mới hiểu con số phía sau.",
          "colleague",
        ),
      ],
      reading: read(
        `The supervisor asks about the work. ${lx.staff} answers: "I ${lo(e1)} it this morning, about two hours ago. ${e5.word} was very busy." That was two hours before the supervisor asked.`,
        [
          {
            q: "Việc đó được làm khi nào?",
            options: ["Sáng nay", "Ngày mai", "Tuần trước"],
            correct: 0,
            explanation: `"I ${lo(e1)} it this morning."`,
          },
          {
            q: "Việc xong trước lúc cấp trên hỏi bao lâu?",
            options: ["Hai tiếng", "Hai ngày", "Mười phút"],
            correct: 0,
            explanation: '"That was two hours before the supervisor asked."',
          },
        ],
      ),
      game: [
        game(
          "Was that task completed?",
          `Yes, madam. I ${lo(e1)} it this morning.`,
          `Yesterday I do, madam. All finish already.`,
          "I believe so, madam, but I would have to check first.",
          undefined,
          "Câu này đúng ngữ pháp nhưng mơ hồ về chính việc mình đã làm.",
        ),
      ],
    }),

    lesson(lx, 21, 2, "Reporting Numbers", "Báo cáo số liệu", {
      vocabulary: [
        bw(e6, `We had twelve ${lo(e6)} today, and all went well.`),
        bw(e2, `The guest ${lo(e2)} at noon.`),
        bw(e10, `I ${lo(e10)} everything in the log.`),
      ],
      grammar: [
        g(
          `Today have twelve.`,
          `We had twelve ${lo(e6)} today, and all went well.`,
          "Quá khứ của 'have' là 'had'; câu cần chủ ngữ 'We'.",
          `We have twelve ${lo(e6)} today, and all went well.`,
        ),
        g(
          `I note all already.`,
          `I ${lo(e10)} everything in the log, so nothing is forgotten.`,
          "Động từ quá khứ + tân ngữ 'everything' + cụm chỉ nơi ghi: in the log.",
          `I am ${lo(e10)} everything in the log.`,
        ),
      ],
      speaking: [
        sp(
          "How many did we have today?",
          `We had twelve ${lo(e6)} today, and all went well.`,
          "Báo số liệu phải chính xác — đoán bừa làm hỏng cả báo cáo ca.",
          "colleague",
        ),
        sp(
          "Did you record all of that?",
          `Yes, I ${lo(e10)} everything in the log.`,
          "Ghi chép đầy đủ là nền tảng của bàn giao ca tốt.",
          "colleague",
        ),
        sp(
          "And the other one?",
          `The ${lo(pc2)} is another option, if you prefer that.`,
          "Ôn tuần 20: mở lựa chọn thứ hai bằng is another option.",
        ),
        sp(
          "Could you set that up?",
          `We will arrange the ${lo(pc6)} then.`,
          "Ôn tuần 20: chốt bằng will và một việc cụ thể.",
        ),
        sp(
          "What else could I look at?",
          `${Wt(pc9)} is worth considering.`,
          "Ôn tuần 20: mở thêm một hướng mà không ép khách.",
        ),
        sp(
          "Do you need a document from me?",
          `Could I see your ${lo(rp1)}, please?`,
          "Ôn tuần 18: xin giấy tờ của khách bằng Could I see.",
        ),
        sp(
          "Any problems today?",
          `Everything was ${lo(e9)}, and I noted it in the log.`,
          "Một câu trạng thái gọn cho cả ca, rồi mới nói ngoại lệ.",
          "colleague",
        ),
      ],
      reading: read(
        `At the end of the shift, ${lx.staff} reports: "We had twelve ${lo(e6)} today. The last guest ${lo(e2)} at noon. I ${lo(e10)} everything down." Nobody arrived after noon.`,
        [
          {
            q: "Hôm nay có bao nhiêu lượt?",
            options: ["Mười hai", "Hai", "Hai mươi"],
            correct: 0,
            explanation: `"We had twelve ${lo(e6)} today."`,
          },
          {
            q: "Sau buổi trưa còn ai đến nữa không?",
            options: ["Không còn ai", "Còn hai người", "Còn rất nhiều"],
            correct: 0,
            explanation: '"Nobody arrived after noon."',
          },
        ],
      ),
      game: [
        game(
          "What were the numbers today?",
          `We had twelve ${lo(e6)} today, and all went well.`,
          "Today have twelve only.",
          "Quite a lot today, and it felt like a very busy shift.",
          "manager",
          "Câu này đúng ngữ pháp nhưng không có con số; báo cáo ca sống bằng con số, không bằng cảm giác.",
        ),
      ],
    }),

    lesson(lx, 21, 3, "Reporting a Problem", "Báo cáo sự cố đã xảy ra", {
      vocabulary: [
        bw(e3, `One booking was ${lo(e3)}.`),
        bw(e7, `It ${lo(e7)} than usual, because we were very busy.`),
        bw(e8, `I ${lo(e8)} the broken one.`),
      ],
      grammar: [
        g(
          `Problem happen, I fix.`,
          `There was a problem, but I fixed it.`,
          "Hai mệnh đề quá khứ nối bằng 'but': THERE WAS … BUT I FIXED IT.",
          `There was a problem, but I fix it.`,
        ),
        g(
          `It take long time.`,
          `It ${lo(e7)} than usual, sir.`,
          "So sánh hơn: động từ chia quá khứ + 'than usual' — dài hơn thường lệ.",
          `It ${lo(e7)} that usual, sir.`,
        ),
      ],
      speaking: [
        sp(
          "Did everything go smoothly?",
          `There was one problem, but I fixed it.`,
          "Báo cáo trung thực: nêu vấn đề VÀ cách đã xử lý trong cùng một câu.",
          "manager",
        ),
        sp(
          "Why did it take so long?",
          `It ${lo(e7)} than usual, because we were busy.`,
          "Giải thích bằng 'because' — nêu nguyên nhân khách quan, không đổ lỗi.",
          "manager",
        ),
        sp(
          "Is there anything else available?",
          `We can also offer the ${lo(pc3)}, if that suits you.`,
          "Ôn tuần 20: mở thêm lựa chọn mà không ép.",
        ),
        sp(
          "Would that be acceptable?",
          `${Wt(pc7)} is fine, sir.`,
          "Ôn tuần 20: xác nhận lựa chọn của khách là ổn.",
        ),
        sp(
          "Is there anything for me to keep?",
          `Here is your ${lo(rp7)}, madam.`,
          "Ôn tuần 18: trao giấy tờ kèm một câu ngắn.",
        ),
        sp(
          "Was it slower today?",
          `It ${lo(e7)} than usual, because we were very busy.`,
          "So sánh hơn kèm than — cách nói ca bận mà không than phiền.",
          "colleague",
        ),
      ],
      reading: read(
        `${lx.staff} gives an honest report: "There was one problem this morning, but I fixed it. It ${lo(e7)} than usual, because we were very busy."`,
        [
          {
            q: "Có mấy sự cố trong ca sáng?",
            options: ["Một", "Ba", "Không có sự cố nào"],
            correct: 0,
            explanation: '"There was one problem this morning"',
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
          "Problem happen, I fix. No more problem now.",
          "Nothing at all worth mentioning to you this evening.",
          "manager",
          "Câu này đúng ngữ pháp và giấu một sự cố; ca sau sẽ gặp lại nó mà không biết gì.",
        ),
      ],
    }),

    lesson(lx, 21, 4, "Handing Over the Shift", "Bàn giao ca", {
      vocabulary: [bw(e4, `I ${lo(e4)} the supervisor.`), bw(e9, `Everything was ${lo(e9)}.`)],
      grammar: [
        g(
          `I tell supervisor already.`,
          `I ${lo(e4)} the supervisor this afternoon, and it is noted.`,
          "Dùng động từ quá khứ chuẩn thay cho 'tell already' theo lối tiếng Việt.",
          `I ${lo(e4)} to the supervisor this afternoon, and it is noted.`,
        ),
        g(
          `Next shift do rest.`,
          `The next shift will finish the rest.`,
          "Việc tương lai dùng 'will'; chủ ngữ cần mạo từ 'The next shift'.",
          `The next shift will finished the rest.`,
        ),
      ],
      speaking: [
        sp(
          "Anything I should know before I start?",
          `I ${lo(e4)} the supervisor, and the issue is closed.`,
          "Bàn giao phải nêu rõ việc còn dở — người ca sau không đọc được suy nghĩ của bạn.",
          "colleague",
        ),
        sp(
          "Thanks, is everything else done?",
          `Yes, everything else was ${lo(e9)}.`,
          "Chốt rõ phần đã xong để ca sau biết chính xác phải làm gì.",
          "colleague",
        ),
        sp(
          "What do you have besides that?",
          `The ${lo(pc4)} is ready if you like it.`,
          "Ôn tuần 20: giới thiệu thêm lựa chọn.",
        ),
        sp(
          "What is still missing?",
          `May I have your ${lo(rp2)}?`,
          "Ôn tuần 18: xin đúng một mẩu thông tin trên giấy tờ.",
        ),
        sp(
          "Which suits me best?",
          `${Wt(pc8)} is a good match.`,
          "Ôn tuần 20: khuyên bằng một câu khẳng định ngắn.",
        ),
        sp(
          "Could I add something to that?",
          `Would you like ${wa(ro3)}, sir?`,
          "Ôn tuần 16 — cách năm tuần: mời thêm bằng Would you like.",
        ),
        sp(
          "Which do most guests take?",
          `${Wt(pc10)} is very popular.`,
          "Ôn tuần 20: dựa vào số đông để khách dễ quyết.",
        ),
        sp(
          "Is there anything new today?",
          `We also have ${wa(ro7)} today.`,
          "Ôn tuần 16 — cách năm tuần: giới thiệu thêm bằng We also have.",
        ),
        sp(
          "What about the broken one?",
          `I ${lo(e8)} the broken one, because it was not safe.`,
          "Nói việc đã xử lý, đừng chỉ nói việc đã phát hiện.",
          "colleague",
        ),
      ],
      reading: read(
        `The shift ends. ${lx.staff} tells the next colleague: "I ${lo(e4)} the supervisor about one issue. Everything else was ${lo(e9)}. The next shift will finish the rest."`,
        [
          {
            q: "Nhân viên đã báo việc đó cho ai?",
            options: ["Cấp trên trực ca", "Người khách vừa rời đi", "Chưa báo cho ai"],
            correct: 0,
            explanation: '"the supervisor about one issue"',
          },
          {
            q: "Câu 'The next shift will finish the rest' nói về thời gian nào?",
            options: ["Thì tương lai đơn", "Thì quá khứ đơn", "Thì hiện tại tiếp diễn"],
            correct: 0,
            explanation: "'will + động từ' diễn tả việc sắp làm.",
          },
        ],
      ),
      game: [
        game(
          "Is there anything left for me?",
          "Just one item. Everything else is done.",
          "Next shift do rest.",
          "I cannot remember exactly, so have a look through the log book.",
          "colleague",
          "Câu này đúng ngữ pháp nhưng đẩy việc tra cứu sang người vừa vào ca.",
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
  const [pe1, pe2, pe3, pe4, pe5, pe6, pe7, pe8, pe9, pe10] = lx.bank.reports;
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
          `First I ${lo(a1)}. Would you like to ${wa(o1)}?`,
        ),
        g(
          `Service today good.`,
          `The service was ${lo(w1)} today.`,
          "Câu quá khứ đủ chủ ngữ và động từ 'was'.",
          `The service were ${lo(w1)} today.`,
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
        sp(
          "How was the service today?",
          `The service was ${lo(w1)} today.`,
          "Quá khứ của to be: was. Tính từ đứng sau.",
          "colleague",
        ),
        sp(
          "Did everything finish in time?",
          `Everything finished ${lo(w2)}, and the report is signed.`,
          "Quá khứ đơn cho việc đã xong, kèm cụm trạng ngữ thời gian.",
          "colleague",
        ),
        sp(
          "What did you finish this morning?",
          `I already ${lo(pe1)} it this morning, before the shift began.`,
          "Ôn tuần 21: quá khứ đơn, mốc thời gian cuối câu.",
          "colleague",
        ),
        sp(
          "How was it out there?",
          `${pe5.word} was very busy.`,
          "Ôn tuần 21: nêu bối cảnh trước khi vào chi tiết.",
          "colleague",
        ),
        sp(
          "Was there any trouble?",
          `Everything was ${lo(pe9)}.`,
          "Ôn tuần 21: một câu trạng thái gọn cho cả ca làm.",
          "colleague",
        ),
        sp(
          "Is my form correct?",
          "One moment, madam. I will check the document.",
          "Xin một nhịp rồi kiểm, đừng trả lời khi chưa nhìn.",
        ),
        sp(
          "Is that how it always goes?",
          "Yes, madam. This is our standard.",
          "Gọi tên chuẩn nghề, khách hiểu đây không phải ngẫu hứng.",
        ),
      ],
      reading: read(
        `${lx.staff} combines the steps naturally. "First I ${lo(a1)}. Would you like ${wa(o1)}, madam? Everything will be ready ${lo(w2)}." The guest agrees to both.`,
        [
          {
            q: "Nhân viên hứa gì về thời gian?",
            options: [`Mọi thứ xong ${lo(w2)}`, "Sẽ trễ một chút", "Không hứa gì về giờ"],
            correct: 0,
            explanation: `"Everything will be ready ${lo(w2)}."`,
          },
          {
            q: "Khách đồng ý với mấy đề nghị?",
            options: ["Cả hai", "Chỉ một", "Không đề nghị nào"],
            correct: 0,
            explanation: '"The guest agrees to both."',
          },
        ],
      ),
      game: [
        game(
          "How do we start this process?",
          `First I ${lo(a1)}, sir. Then we continue.`,
          `I ${lo(a1)}, after next thing, madam, then finish.`,
          "It does not matter where we start, madam, honestly.",
          undefined,
          "Câu này đúng ngữ pháp nhưng phủ nhận trình tự, thứ đang là nội dung chính của tuần này.",
        ),
      ],
    }),

    lesson(lx, 22, 2, "Details, Paperwork & Payment", "Ghép hỏi thông tin với giấy tờ", {
      vocabulary: [
        v("Complete", "/kəmˈpliːt/", "Hoàn tất", "The form is complete.", "✅"),
        bw(w3, `I noted the ${lo(w3)} in the log.`),
        bw(w5, `The ${lo(w5)} was positive.`),
        bw(w9, `The ${lo(w9)} was noted today.`),
      ],
      grammar: [
        g(
          `Give me name, sign here.`,
          `Could I have your name? Then please sign here.`,
          "Ôn tuần 17 và 18: xin thông tin lịch sự rồi mới hướng dẫn ký.",
          `Could I have your name? Then please to sign here.`,
        ),
        g(
          `I prepare paper now.`,
          `I am preparing the paperwork now, and it is nearly ready.`,
          "Ôn tuần 18: việc đang làm dùng hiện tại tiếp diễn.",
          `I am preparing paperwork now.`,
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
        sp(
          "And what happened after that?",
          `The guest ${lo(pe2)} after that.`,
          "Ôn tuần 21: chủ ngữ là khách, động từ ở quá khứ đơn.",
          "colleague",
        ),
        sp(
          "How many were there?",
          `We had twelve ${lo(pe6)} today.`,
          "Ôn tuần 21: had là quá khứ của have.",
          "colleague",
        ),
        sp(
          "Did you write anything down?",
          `I noted the ${lo(w3)} in the log, so nothing is lost.`,
          "Ghi vào sổ ca là việc bắt buộc, không phải tuỳ hứng.",
          "colleague",
        ),
        sp(
          "How did the guest react?",
          `The ${lo(w5)} was positive.`,
          "Báo cả phản hồi tốt, không chỉ báo sự cố.",
          "colleague",
        ),
        sp(
          "Anything for the record?",
          `The ${lo(w9)} was noted today.`,
          "Thứ đã ghi thì nói rõ là đã ghi.",
          "colleague",
        ),
        sp(
          "Anything else for me?",
          "May I offer you an extra service, sir?",
          "Một câu hỏi mở cuối cuộc trò chuyện thường đổi lấy một lời cảm ơn.",
        ),
        sp(
          "Is the paperwork done?",
          "Yes. The form is complete.",
          "Báo trạng thái xong bằng một câu ngắn.",
        ),
      ],
      reading: read(
        `${lx.staff} handles the formalities. "Could I have your name, please? Then please sign here. I am preparing the paperwork now, sir." The name comes first, the signature second.`,
        [
          {
            q: "Nhân viên đang làm gì lúc nói câu cuối?",
            options: [
              "Đang chuẩn bị giấy tờ",
              "Đang gọi điện thoại cho quản lý",
              "Đang rời khỏi quầy",
            ],
            correct: 0,
            explanation: '"I am preparing"',
          },
          {
            q: "Thứ tự đúng là gì?",
            options: ["Tên trước, chữ ký sau", "Chữ ký trước, tên sau", "Cả hai cùng lúc"],
            correct: 0,
            explanation: '"The name comes first, the signature second."',
          },
        ],
      ),
      game: [
        game(
          "What is the next step for me?",
          "Please sign here, madam. Then we are finished.",
          "Give me name, sign here.",
          "Nothing else for you, madam.",
          undefined,
          "Câu này đúng ngữ pháp và bỏ mất chữ ký; thiếu chữ ký thì cả tờ giấy không có giá trị.",
        ),
      ],
    }),

    lesson(lx, 22, 3, "Rules & Choices Together", "Ghép nội quy với tư vấn lựa chọn", {
      vocabulary: [
        v("Overall", "/ˌəʊvərˈɔːl/", "Nhìn chung", "Overall, the day went well.", "🌐"),
        bw(w4, `We can always ${lo(w4)}, if you would like that.`),
        bw(w6, `The whole shift was ${lo(w6)}.`),
        bw(w10, `The last thing is the ${lo(w10)}, and then I finish.`),
      ],
      grammar: [
        g(
          `Cannot do that, choose other.`,
          `I am afraid that is not allowed. Would you prefer another option?`,
          "Ôn tuần 19 và 20: từ chối mềm rồi mở ngay lựa chọn khác.",
          `I am afraid that is not allowed. Would you prefer other option?`,
        ),
        g(
          `Team do well yesterday.`,
          `The whole shift was ${lo(w6)}.`,
          "Ôn tuần 21: quá khứ của to be — was đi với chủ ngữ số ít.",
          `The whole shift were ${lo(w6)}.`,
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
        sp(
          "Did anyone deal with it?",
          `Yes, that was ${lo(pe3)} yesterday, and I noted it.`,
          "Ôn tuần 21: thể bị động cho việc đã xong, kèm mốc yesterday.",
          "colleague",
        ),
        sp(
          "Did it take longer?",
          `It ${lo(pe7)} than usual, because we were short-staffed.`,
          "Ôn tuần 21: so sánh hơn kèm than.",
          "colleague",
        ),
        sp(
          "Could anything be better?",
          `We can always ${lo(w4)}, if you would like that.`,
          "Nhận việc còn cải thiện được mà không đổ lỗi cho ai.",
          "colleague",
        ),
        sp(
          "How was the team today?",
          `The whole shift was ${lo(w6)}.`,
          "Khen cả ca làm, không khen riêng một người.",
          "colleague",
        ),
        sp(
          "There is a small problem.",
          "I am sorry, sir. I will fix the issue now.",
          "Nhận việc bằng một câu ngắn, rồi mới đi xử lý.",
        ),
        sp(
          "How did the day go?",
          "Overall, the day went well.",
          "Mở đầu báo cáo bằng một câu tổng, rồi mới vào chi tiết.",
          "colleague",
        ),
        sp(
          "What is left to do?",
          `The last thing is the ${lo(w10)}, and then I finish.`,
          "Việc cuối ca phải được gọi tên, nếu không nó sẽ bị bỏ.",
          "colleague",
        ),
      ],
      reading: read(
        `A guest requests something against the rules. ${lx.staff} answers: "I am afraid that is not allowed, sir. Would you prefer another option? We could arrange something quieter."`,
        [
          {
            q: "Phương án nhân viên đưa thêm là gì?",
            options: [
              "Một chỗ yên tĩnh hơn",
              "Giảm giá phòng cho khách ngay",
              "Gọi bảo vệ tới ngay lập tức",
            ],
            correct: 0,
            explanation: '"We could arrange something quieter."',
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
          "Cannot do that, madam. Choose other thing please.",
          "Yes, madam. That is simply not something that we do.",
          undefined,
          "Câu này đúng ngữ pháp nhưng dừng lại ở lời từ chối; từ chối không kèm phương án là từ chối hai lần.",
        ),
      ],
    }),

    lesson(lx, 22, 4, "Full Shift Report", "Báo cáo trọn ca làm", {
      vocabulary: [
        bw(w7, `Let me tell you about the ${lo(w7)}.`),
        bw(w8, `Let me ${lo(w8)} the day.`),
      ],
      grammar: [
        g(
          `Today all good, no problem.`,
          `Today went well, because the team finished ahead of time.`,
          "Ôn tuần 21: 'went' là quá khứ của 'go'; nêu lý do bằng 'because' rồi mới tới mệnh đề.",
          `Today went well, because the team finish ahead of time.`,
        ),
        g(
          `I say again short.`,
          `Let me ${lo(w8)} briefly.`,
          '"Let me + động từ + briefly" là cách mở đầu phần tóm tắt chuyên nghiệp.',
          `Let me to ${lo(w8)} briefly.`,
        ),
      ],
      speaking: [
        sp(
          "How was your shift overall?",
          `Today went well, because the team finished ahead of time.`,
          "Câu tổng kết ca chuẩn — ngắn, tích cực, trung thực.",
          "manager",
        ),
        sp(
          "Anything for the next team?",
          `Let me ${lo(w8)}. I will tell you about the ${lo(w7)}.`,
          "Tóm tắt rồi bàn giao mốc thời gian cụ thể cho ca sau.",
          "colleague",
        ),
        sp(
          "Was the team told?",
          `Yes, I ${lo(pe4)} the whole team before the shift ended.`,
          "Ôn tuần 21: báo lại cấp trên bằng câu quá khứ đủ.",
          "colleague",
        ),
        sp(
          "What did you do about it?",
          `I ${lo(pe8)} the broken one, and it works now.`,
          "Ôn tuần 21: quá khứ đơn cho việc đã xong.",
          "colleague",
        ),
        sp(
          "Did you keep a record?",
          `I ${lo(pe10)} everything in the log, so the next shift knows.`,
          "Ôn tuần 21: ghi chép là phần bắt buộc của bàn giao.",
          "colleague",
        ),
        sp(
          "Why is that necessary?",
          "It is a safety rule, madam. Everyone must follow it.",
          "Đặt lý do trước, yêu cầu sau — khách nghe dễ chịu hơn.",
        ),
      ],
      reading: read(
        `At the end of week, ${lx.staff} reports to the manager: "Today went well, because the team finished ahead of time. Let me ${lo(w8)} briefly. I will tell you about the ${lo(w7)}." The whole report takes less than a minute.`,
        [
          {
            q: "Ca làm hôm nay thế nào?",
            options: ["Suôn sẻ, không sự cố", "Rất nhiều vấn đề xảy ra", "Chưa kết thúc ca trực"],
            correct: 0,
            explanation: `"Today went well, because the team finished ahead of time."`,
          },
          {
            q: "Báo cáo mất bao lâu?",
            options: ["Chưa tới một phút", "Khoảng nửa giờ đồng hồ", "Gần như cả buổi chiều nay"],
            correct: 0,
            explanation: '"The whole report takes less than a minute."',
          },
        ],
      ),
      game: [
        game(
          "Give me a quick summary please.",
          "Today went well, because the team finished ahead of time.",
          "Today all good, no problem.",
          "It was fine, and I would rather not go into the details now.",
          "manager",
          "Câu này đúng ngữ pháp nhưng từ chối báo cáo; cấp trên hỏi là để biết, không phải để nghe cảm nhận.",
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
  // Đi qua đúng cùng một đường mà buildWeek đi: một bài riêng theo bộ phận
  // có thể mang bộ headword khác bài khung, và lịch ôn phải đọc cái học viên
  // THẬT SỰ gặp, không phải cái spine định dạy.
  const lessons = override
    ? override.lessons
    : WEEK_META[week].build(lx).map((l) => DEPT_LESSONS[l.lessonId]?.(lx) ?? l);
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

/** Bài riêng theo bộ phận, thay bài khung cùng lessonId.
 *
 *  Khung chung của Phase 2 đã khác nhau 81-87% về TỪ NGỮ, nhưng tình huống thì
 *  vẫn là một: mức riêng ấy đo từ vựng, không đo nghề. Thứ khung không diễn
 *  được là RANH GIỚI THẨM QUYỀN — cái gì nhân viên quyết được, cái gì phải hỏi.
 *  Ở Phase 1, hai mươi bốn bài riêng là thứ nâng điểm luồng quản lý bộ phận
 *  nhiều hơn mọi thay đổi khác.
 *
 *  Bài riêng PHẢI giữ đúng bộ headword của bài khung nó thay, vì ngân sách thẻ
 *  và danh sách ôn của cả phase đếm theo đó. */
const DEPT_LESSONS: Record<string, (lx: Ctx) => LessonContent> = {
  // Câu hỏi về dị ứng là câu duy nhất trong tuần này mà trả lời sai có thể đưa
  // khách vào bệnh viện. Bài khung dạy đánh vần tên; bộ phận nhà hàng cần
  // đúng một phản xạ: KHÔNG trả lời từ trí nhớ, đi hỏi bếp.
  FB_17_3: (lx) => {
    const [, , d3, , d5, , , d8] = lx.bank.details;
    return lesson(lx, 17, 3, "Never Answer From Memory", "Không bao giờ trả lời từ trí nhớ", {
      vocabulary: [
        bw(d3, `Could I have your ${lo(d3)}?`),
        bw(d5, `And your ${lo(d5)}, please?`),
        bw(d8, `The ${lo(d8)} is important.`),
      ],
      grammar: [
        g(
          "No nuts inside, I think.",
          "I will check with the kitchen for you.",
          "Không đoán về nguyên liệu. Chủ ngữ + WILL + động từ nguyên thể, và nói rõ mình đi hỏi ai.",
          "I will check with the kitchen for you, I think.",
        ),
        g(
          "You have allergy?",
          "Do you have any allergies, madam?",
          "Câu hỏi cần trợ động từ 'do', và 'any' đứng trước danh từ số nhiều.",
          "Do you have any allergy, madam?",
        ),
      ],
      speaking: [
        sp(
          "Is there anything I should tell you?",
          `Yes, madam. Could I have your ${lo(d3)}?`,
          "Hỏi chủ động trước khi khách phải tự nói — đó là chuẩn 5 sao và cũng là an toàn.",
        ),
        sp(
          "I cannot eat peanuts at all.",
          `Thank you. And your ${lo(d5)}, please?`,
          "Nghe xong thì hỏi tiếp cho đủ, đừng dừng ở món khách vừa nêu.",
        ),
        sp(
          "Are there nuts in this dish?",
          "One moment, madam. I will check with the kitchen.",
          "Câu quan trọng nhất tuần này. Công thức đổi theo ca bếp, nên trí nhớ của bạn không phải là nguồn tin.",
        ),
        sp(
          "Can you just tell me quickly?",
          "I am sorry. Only the kitchen can confirm that.",
          "Từ chối đoán, và nói rõ ai mới xác nhận được. Nhanh mà sai thì hậu quả không sửa được.",
        ),
        sp(
          "Why do you write everything down?",
          `The ${lo(d8)} is important.`,
          "Ghi lại là để bếp đọc đúng, không phải để làm cho có.",
        ),
        sp(
          "What did the kitchen say?",
          "The chef says this dish has no nuts.",
          "Báo lại nguyên văn lời bếp, không thêm bớt. Nói rõ nguồn tin là ai.",
          "colleague",
        ),
      ],
      reading: read(
        `A guest asks about nuts in a dish. ${lx.staff} does not answer from memory and says: "One moment, madam. I will check with the kitchen." The chef checks the recipe for today and answers. Only then does ${lx.staff} tell the guest. The recipe changes with the kitchen shift, so the answer from yesterday is not the answer for today.`,
        [
          {
            q: "Vì sao không tự trả lời câu hỏi về dị ứng?",
            options: [
              "Công thức đổi theo ca bếp, trả lời sai có thể gây nguy hiểm",
              "Vì nhân viên phục vụ không được nói chuyện về món ăn",
              "Vì bếp cấm nhắc tới nguyên liệu của bất kỳ món nào",
            ],
            correct: 0,
            explanation:
              "Bài đọc nói rõ: công thức đổi theo ca. Câu trả lời đúng của hôm qua có thể sai hôm nay.",
          },
          {
            q: "Nhân viên nói gì với khách trước khi đi hỏi?",
            options: [
              "One moment, madam. I will check with the kitchen.",
              "I think there are no nuts in it, madam.",
              "The kitchen is very busy right now, madam.",
            ],
            correct: 0,
            explanation: "Xin khách một nhịp chờ, rồi nói rõ mình đi hỏi ai.",
          },
        ],
      ),
      game: [
        game(
          "Does this cake have any nuts?",
          "One moment, madam. I will check with the kitchen.",
          "No nuts have, madam.",
          "I think it is fine, madam.",
          undefined,
          "Câu này đúng ngữ pháp và là câu nguy hiểm nhất trong bài: 'I think' về dị ứng là một lời đoán, và người chịu hậu quả không phải bạn.",
        ),
        game(
          "I told the other waiter about my allergy.",
          "Thank you. Could I have your allergy detail again?",
          "Ok, he tell kitchen already.",
          "Then the kitchen already knows, madam.",
          undefined,
          "Không bao giờ giả định thông tin đã tới bếp. Hỏi lại mất mười giây; không hỏi lại thì không sửa được.",
        ),
      ],
    });
  },

  // Kho hoá chất là khu vực nội bộ, và "do not mix" là một CHỈ DẪN AN TOÀN chứ
  // không phải tên một vật — bài khung nhét nó vào ô danh từ và cho ra
  // "The do not mix is over there."
  HK_19_2: (lx) => {
    const [, , , r4, r5, , , , r9] = lx.bank.rules;
    return lesson(lx, 19, 2, "The Store Room Is Not for Guests", "Kho đồ là khu vực nội bộ", {
      vocabulary: [
        bw(r4, `The ${lo(r4)} is at the door, madam.`),
        bw(r5, `Please do not touch the ${lo(r5)}, madam.`),
        bw(r9, `May I remind you of the ${lo(r9)}?`),
      ],
      grammar: [
        g(
          "You no go inside.",
          "I am afraid guests may not go inside.",
          "Từ chối bằng 'I am afraid' rồi mới nêu quy định; 'may not' lịch sự hơn 'cannot'.",
          "I am afraid guests may not to go inside.",
        ),
        g(
          "Chemical mix danger.",
          "Please do not mix the cleaning liquids.",
          "Cấm bằng 'Please do not + động từ' — vẫn là mệnh lệnh nhưng có lễ độ.",
          "Please do not mixing the cleaning liquids.",
        ),
      ],
      speaking: [
        sp(
          "Can I get a towel from that room?",
          "I am afraid guests may not go inside.",
          "Kho có hoá chất và đồ vải sạch. Nếu khách trượt ngã hay chạm phải thứ gì trong đó, người mở cửa là bạn.",
        ),
        sp(
          "But I only need one towel.",
          "Of course. I will bring one to your room now.",
          "Từ chối lối vào, không từ chối yêu cầu. Khách vẫn phải có khăn.",
        ),
        sp(
          "Why can nobody go in there?",
          "Two cleaning liquids together make a dangerous gas.",
          "Nêu lý do thật: hoá chất pha lẫn sinh khí độc. Có lý do thì khách dễ chấp nhận hơn.",
        ),
        sp(
          "Can I move this box myself?",
          `Please do not touch the ${lo(r5)}, madam.`,
          "Vật nặng là việc của bộ phận, không phải của khách — và cũng không phải của một người.",
        ),
        sp(
          "I found this in the corridor.",
          `Thank you. May I remind you of the ${lo(r9)}?`,
          "Đồ nhặt được phải vào sổ thất lạc. Nhận rồi cảm ơn, rồi nhắc quy định.",
        ),
        sp(
          "Where do I put the chemicals?",
          // Không đọc ô rules ở đây: rules[3] của buồng phòng chính là chỉ dẫn
          // "Do not mix", nên khung cho ra "in the do not mix". Bài riêng chỉ
          // dùng cho một bộ phận nên viết thẳng là đúng và an toàn hơn.
          "Please leave them in the store room.",
          "Nói với đồng nghiệp thì bỏ kính ngữ, nhưng vẫn nói rõ chỗ.",
          "colleague",
        ),
      ],
      reading: read(
        `A guest walks towards the store room. ${lx.staff} steps in front of the door politely and says: "I am afraid guests may not go inside. I will bring one to your room now." The room holds cleaning liquids and clean linen. Two liquids mixed together make a dangerous gas, so only trained staff open that door. ${lx.staff} brings the towel two minutes later.`,
        [
          {
            q: "Vì sao khách không được vào kho?",
            options: [
              "Kho có hoá chất, hai loại pha lẫn sinh khí độc",
              "Vì kho quá nhỏ, không đủ chỗ cho hai người đứng",
              "Vì khách vào rồi sẽ không tìm được đường ra",
            ],
            correct: 0,
            explanation: "Bài đọc nêu đích danh lý do: hoá chất pha lẫn thì nguy hiểm.",
          },
          {
            q: "Nhân viên làm gì thay vì cho khách vào?",
            options: [
              "Mang khăn tới tận phòng cho khách",
              "Bảo khách xuống hỏi quầy lễ tân",
              "Mở cửa và đi cùng khách vào trong",
            ],
            correct: 0,
            explanation:
              "Từ chối lối vào nhưng không từ chối yêu cầu — khách vẫn có khăn sau hai phút.",
          },
        ],
      ),
      game: [
        game(
          "Just let me grab it, I am in a hurry.",
          "I am afraid guests may not go inside.",
          "Ok you go quick.",
          "Of course, madam. Please go in.",
          undefined,
          "Câu này lịch sự và làm khách vui trong ba giây. Nhưng bạn vừa mở một cánh cửa mà quy định phòng cháy và hoá chất đều cấm, và người ký vào biên bản sẽ là bạn.",
        ),
      ],
    });
  },

  // Nâng hạng phòng là một quyết định doanh thu. Bài khung dạy nhân viên lễ tân
  // MỜI thẳng, trong khi ở khách sạn thật đó là việc của quản lý ca.
  FO_16_1: (lx) => {
    const [o1, o2] = lx.bank.offers;
    return lesson(
      lx,
      16,
      1,
      "An Upgrade Is Not Mine to Give",
      "Nâng hạng không phải quyền của tôi",
      {
        vocabulary: [
          v("Offer", "/ˈɒfə/", "Đề nghị, mời", "May I offer you a drink?", "🎁"),
          v("Extra", "/ˈekstrə/", "Thêm, phụ trội", "Would you like an extra one?", "➕"),
          bw(o1, `I will ask about ${wa(o1)} for you.`),
          bw(o2, `We also have ${wa(o2)}.`),
        ],
        grammar: [
          g(
            "I give you upgrade free.",
            `I will ask about ${wa(o1)} for you.`,
            "Không hứa thứ mình không được quyết. Chủ ngữ + WILL ASK ABOUT — hứa việc mình làm được.",
            `I will ask about ${wa(o1)} for you, free.`,
          ),
          g(
            "You want higher floor?",
            `Would you like ${wa(o2)}, madam?`,
            "Mời bằng câu hỏi đủ chủ ngữ và động từ; hỏi trống không nghe như ra lệnh.",
            `Would you like to ${wa(o2)}, madam?`,
          ),
        ],
        speaking: [
          sp(
            "Could I have a free upgrade?",
            `I will ask about ${wa(o1)} for you.`,
            "Nâng hạng là quyết định doanh thu, quản lý ca duyệt. Hứa hỏi thì giữ được; hứa cho thì không.",
          ),
          sp(
            "So can I have it or not?",
            "My manager decides that, madam. I will call now.",
            "Nói thẳng ai quyết, rồi nói ngay việc mình làm. Vòng vo còn tệ hơn một lời từ chối.",
          ),
          sp(
            "Is there anything you can do?",
            `Yes, madam. We also have ${wa(o2)}.`,
            "Thứ trong quyền mình thì mời ngay — tầng cao hơn không tốn tiền của khách sạn.",
          ),
          sp(
            "Could I have one more towel?",
            "Would you like an extra one?",
            "Đồ dùng nhỏ thì nhận lời ngay. Ranh giới là tiền, không phải là mọi yêu cầu.",
          ),
          sp(
            "Anything to drink while I wait?",
            "May I offer you a drink?",
            "Khách phải chờ thì mời một thứ trong quyền mình — nhịp chờ ngắn đi rất nhiều.",
          ),
          sp(
            "What did the manager say?",
            `The duty manager approved ${wa(o1)}.`,
            "Báo lại kết quả kèm chức danh đã duyệt, để ca sau đọc sổ là hiểu.",
            "colleague",
          ),
        ],
        reading: read(
          `A guest asks for a free upgrade at the desk. ${lx.staff} does not say yes and does not say no, but says: "I will ask about an upgrade for you. My manager decides that, madam." Then ${lx.staff} offers a higher floor, which costs the hotel nothing, and a drink while the guest waits. The duty manager comes in four minutes with the answer. The guest waited with something in her hand.`,
          [
            {
              q: "Vì sao nhân viên không tự quyết việc nâng hạng?",
              options: [
                "Đó là quyết định doanh thu, quản lý ca mới duyệt",
                "Vì nhân viên không biết còn phòng trống hay không",
                "Vì quy định cấm nhân viên nói chuyện về giá phòng",
              ],
              correct: 0,
              explanation:
                "Hứa một thứ có tính tiền mà mình không được quyết là đẩy việc rút lời hứa cho người khác.",
            },
            {
              q: "Nhân viên mời gì trong lúc khách chờ?",
              options: [
                "Một tầng cao hơn và một đồ uống",
                "Một phòng hạng cao hơn miễn phí",
                "Không mời gì, chỉ bảo khách ngồi đợi",
              ],
              correct: 0,
              explanation:
                "Thứ trong quyền mình thì mời ngay; chờ mà có thứ trong tay thì ngắn hơn hẳn.",
            },
          ],
        ),
        game: [
          game(
            "The website said I might get an upgrade.",
            "I will ask about an upgrade for you, madam.",
            "Website say so, I give you.",
            "Of course, madam. I will upgrade you now.",
            undefined,
            "Câu này lịch sự và sai. Bạn vừa hứa một hạng phòng có tính tiền; người phải rút lời hứa lại là quản lý ca, trước mặt chính vị khách đó.",
          ),
        ],
      },
    );
  },
  // Ở spa, câu hỏi trước buổi trị liệu không phải thủ tục giấy tờ: chấn
  // thương mới, thai kỳ, thuốc đang uống đều là thứ khiến liệu trình phải
  // ĐỔI hoặc DỪNG. Bài khung dạy đánh vần tên khách — đúng cho lễ tân,
  // nhưng ở đây kỹ thuật viên cần biết mình được quyết tới đâu.
  SW_17_3: (lx) => {
    const [, , d3, , d5, , , d8] = lx.bank.details;
    return lesson(
      lx,
      17,
      3,
      "Some Answers Stop the Treatment",
      "Có câu trả lời buộc phải dừng lại",
      {
        vocabulary: [
          bw(d3, `Your ${lo(d3)} tells me what to avoid.`),
          bw(d5, `The ${lo(d5)} changes the oil we use.`),
          bw(d8, `Your ${lo(d8)} matters more than the plan.`),
        ],
        grammar: [
          g(
            "You are pregnant? Ok, we start.",
            "I will ask my manager before we start.",
            "Chủ ngữ + WILL + động từ nguyên thể. Mệnh đề 'before' đi sau, và động từ trong đó ở thì hiện tại.",
            "I will ask my manager before we will start.",
          ),
          g(
            "Where you have injury?",
            "Where exactly is the injury, madam?",
            "Câu hỏi WH cần đảo động từ 'to be' lên trước chủ ngữ, không giữ trật tự như câu kể.",
            "Where exactly the injury is, madam?",
          ),
        ],
        speaking: [
          sp(
            "Do you really need all of this?",
            `Yes, madam. Your ${lo(d3)} tells me what to avoid.`,
            "Nói rõ tờ phiếu dùng để làm gì thì khách trả lời thật hơn hẳn.",
          ),
          sp(
            "I hurt my shoulder last week.",
            "Thank you. I will ask my manager before we start.",
            "Câu quan trọng nhất bài này. Chấn thương mới không phải thứ kỹ thuật viên tự quyết.",
          ),
          sp(
            "I am four months pregnant.",
            "Thank you for telling me. I cannot start until I ask.",
            "Nói thẳng là chưa bắt đầu được, và lý do là đi hỏi — không phải từ chối khách.",
          ),
          sp(
            "My skin burns with strong oil.",
            `I understand. The ${lo(d5)} changes the oil we use.`,
            "Thông tin khách vừa cho phải dẫn tới một thay đổi cụ thể, nếu không thì hỏi làm gì.",
          ),
          sp(
            "This is a little too strong.",
            `Of course. Your ${lo(d8)} matters more than the plan.`,
            "Khách có quyền đổi ý giữa chừng. Đừng bảo vệ liệu trình đã ghi trên phiếu.",
          ),
          sp(
            "Anything on her form I should know?",
            "Yes. She has a shoulder injury.",
            "Bàn giao thì nói đúng cái đã đọc được, không thêm suy đoán của mình.",
            "colleague",
          ),
          sp(
            "Can we go ahead with the deep tissue?",
            "My manager says light pressure only today.",
            "Trích lại quyết định của quản lý để cả hai người cùng làm đúng một việc.",
            "colleague",
          ),
        ],
        reading: read(
          `Before a treatment, ${lx.staff} asks about injury, medicine and pregnancy. A guest says she is pregnant. ${lx.staff} does not say yes and does not say no: "I will ask my manager before we start." The manager chooses a lighter treatment, and the guest is happy. A therapist never makes this decision alone.`,
          [
            {
              q: "Khi khách báo đang mang thai, kỹ thuật viên làm gì?",
              options: [
                "Hỏi quản lý trước khi bắt đầu",
                "Từ chối khách và mời khách về",
                "Vẫn làm liệu trình nhưng nhẹ tay hơn",
              ],
              correct: 0,
              explanation:
                "Bài đọc nói rõ: không gật, không lắc, đi hỏi. Quản lý mới là người chọn liệu trình thay thế.",
            },
            {
              q: "Vì sao kỹ thuật viên không tự quyết?",
              options: [
                "Đây là quyết định an toàn, không phải sở thích của khách",
                "Vì kỹ thuật viên không được phép nói chuyện với khách",
                "Vì quản lý muốn tự tay kiểm tra mọi tờ phiếu",
              ],
              correct: 0,
              explanation:
                "Sở thích thì khách chọn. An toàn thì người có thẩm quyền chọn — đó là ranh giới của bài này.",
            },
          ],
        ),
        game: [
          game(
            "I take medicine for my heart.",
            "Thank you. I will ask my manager before we start.",
            "Ok, no problem, we start now.",
            "That is fine, madam. Heart medicine is not a problem.",
            undefined,
            "Câu này lịch sự và nguy hiểm nhất: bạn vừa xác nhận một điều thuộc chuyên môn y tế mà mình không có.",
          ),
          game(
            "Can you press much harder on my back?",
            "Of course, madam. Please tell me at once if it hurts.",
            "Yes, I press very strong for you.",
            "Certainly, madam. I will press as hard as you like.",
            undefined,
            "Câu này nghe rất chiều khách, và nó bỏ mất quyền dừng tay của chính bạn.",
          ),
        ],
      },
    );
  },

  // Concierge giới thiệu thứ nằm NGOÀI khách sạn: bàn ăn, tour, xe. Bài
  // khung dạy khuyên kèm lý do — đúng, nhưng thiếu ranh giới khiến lời
  // khuyên hoá lời hứa: khách nghe xong là tưởng đã có bàn, tới nơi mới
  // biết chưa ai gọi. Bài này tách GỢI Ý khỏi ĐẶT CHỖ.
  GR_20_2: (lx) => {
    const [, , , , , , , c8, c9, c10] = lx.bank.choices;
    return lesson(lx, 20, 2, "A Suggestion Is Not a Booking", "Gợi ý không phải là đã đặt chỗ", {
      vocabulary: [
        bw(c8, `The ${lo(c8)} is quiet in the evening.`),
        bw(c9, `I have a ${lo(c9)} for you.`),
        bw(c10, `That would be a ${lo(c10)}, madam.`),
      ],
      grammar: [
        g(
          "I book table for you now.",
          "Shall I call the restaurant for you?",
          "'Shall I…?' là mẫu xin phép làm giúp: bạn đề nghị, khách vẫn là người quyết.",
          "Shall I to call the restaurant for you?",
        ),
        g(
          "Sure, they have table for you.",
          "I will call and confirm the table.",
          "Đừng khẳng định thay nhà hàng. Chủ ngữ + WILL, rồi hai động từ nối bằng 'and'.",
          "I will call and confirming the table.",
        ),
      ],
      speaking: [
        sp(
          "We would like somewhere calm tonight.",
          `The ${lo(c8)} is quiet in the evening.`,
          "Khuyên thì phải kèm một lý do cụ thể, nếu không khách chẳng có gì để cân nhắc.",
        ),
        sp(
          "Could you book it for me?",
          "Of course. Shall I call the restaurant now?",
          "Đề nghị làm giúp, đừng tự làm rồi báo sau. Khách vẫn là người quyết.",
        ),
        sp(
          "So the table is ready for us?",
          "Not yet, madam. I will call and confirm.",
          "Câu quan trọng nhất bài này: chưa gọi thì chưa có bàn, nói thẳng ra.",
        ),
        sp(
          "What if they are full tonight?",
          `Then I have a ${lo(c9)} for you.`,
          "Có phương án hai trước khi khách kịp lo — đó là khác biệt của một concierge.",
        ),
        sp(
          "Is that place good for a birthday?",
          `Yes, madam. That would be a ${lo(c10)}.`,
          "Khớp gợi ý với dịp của khách thì lời khuyên mới có sức nặng.",
        ),
        sp(
          "Did the guest ask for a table?",
          "Yes. I am calling the restaurant now.",
          "Bàn giao ngắn: việc đang tới đâu, không kể lại cả câu chuyện.",
          "colleague",
        ),
        sp(
          "What do I tell them at the door?",
          "Tell them the table is not confirmed.",
          "Đồng nghiệp ở cửa cần trạng thái thật, không phải trạng thái mình mong muốn.",
          "colleague",
        ),
      ],
      reading: read(
        `A guest asks about dinner. ${lx.staff} suggests a restaurant and gives a reason. Then the guest asks for a table. ${lx.staff} does not promise one: "Not yet, madam. I will call and confirm." The restaurant is full tonight, so ${lx.staff} offers a second one, and the guest agrees. Nothing is promised before the phone call.`,
        [
          {
            q: "Khách hỏi bàn đã có chưa, câu trả lời đúng là gì?",
            options: [
              "Not yet, madam. I will call and confirm.",
              "Yes, madam. The table is ready for you.",
              "I book already for you, madam.",
            ],
            correct: 0,
            explanation:
              "Chưa gọi thì chưa có bàn. Nói đúng trạng thái hiện tại, rồi nói mình sắp làm gì.",
          },
          {
            q: "Vì sao không hứa trước khi gọi điện?",
            options: [
              "Nhà hàng có thể hết bàn, lời hứa sẽ vỡ ngay tại chỗ",
              "Vì khách sạn cấm nhân viên gọi điện ra bên ngoài",
              "Vì gọi điện làm mất thời gian chờ của khách",
            ],
            correct: 0,
            explanation:
              "Bàn nằm ở nhà hàng khác, không nằm trong tay bạn. Bên mất mặt khi vỡ hẹn lại là khách sạn.",
          },
        ],
      ),
      game: [
        game(
          "My friend said you could get us a table.",
          "I will call them now and confirm, madam.",
          "Yes yes, no problem, table have.",
          "Of course, madam. Your table is booked already.",
          undefined,
          "Câu này lịch sự và sai. Khách sẽ tới nhà hàng, không có bàn, và bên sai hẹn là khách sạn.",
        ),
        game(
          "Is the tour price the same as last year?",
          "I will check the price and call you back.",
          "Same same, madam, no change.",
          "Yes, madam. The price is exactly the same.",
          undefined,
          "Giá tour do đối tác đặt, không phải khách sạn. Đoán đúng chín lần rồi sai một lần là đủ mất khách.",
        ),
      ],
    });
  },
  // Cả năm quản lý bộ phận đều nói cùng một câu: khoá dạy nửa ca đầu rất tốt
  // và không dạy gì cho nửa sau. Lễ tân là ca nặng nhất — grep cả tám tuần
  // không có một chữ "check-out" nào, trong khi phase vẫn dạy hoá đơn, phí
  // phục vụ, biên lai và mã số thuế. Bài này đặt chúng vào đúng chỗ chúng
  // được dùng.
  FO_18_4: (lx) => {
    const [, , , p4, , , p7] = lx.bank.paperwork;
    return lesson(lx, 18, 4, "Check-out, Line by Line", "Trả phòng, từng dòng một", {
      vocabulary: [
        bw(p7, `Here is your ${lo(p7)}, madam.`),
        bw(p4, `The ${lo(p4)} is on file, sir.`),
      ],
      grammar: [
        g(
          "Room finish. You pay now.",
          "May I check the minibar before you leave, sir?",
          "Xin phép bằng 'May I' rồi mới nêu việc; mệnh đề 'before' đi sau, động từ ở hiện tại.",
          "May I check the minibar before you will leave, sir?",
        ),
        g(
          "Bill have one more money.",
          "There is one more charge, madam. Shall I explain it?",
          "'There is' dùng cho một thứ số ít; 'Shall I…?' là lời đề nghị làm giúp.",
          "There is one more charge, madam. Shall I explaining it?",
        ),
      ],
      speaking: [
        sp(
          "We are checking out now.",
          "Good morning, madam. May I have your room number?",
          "Hỏi số phòng trước; mọi thứ còn lại tra theo nó.",
        ),
        sp(
          "Is that everything?",
          "One moment. I will check the minibar with Housekeeping.",
          "Không chốt hoá đơn trước khi buồng phòng xác nhận.",
        ),
        sp(
          "What is this line here?",
          "That is the service charge, sir. Ten percent.",
          "Gọi đúng tên khoản phí và đúng con số, đừng nói chung chung.",
        ),
        sp(
          "Could I have a receipt?",
          `Here is your ${lo(p7)}, madam.`,
          "Trao giấy kèm một câu, đừng đẩy im lặng qua quầy.",
        ),
        sp(
          "We need an invoice for our company.",
          `The ${lo(p4)} is on file, sir.`,
          "Hoá đơn công ty tra theo mã số thuế đã lưu, không hỏi lại khách.",
        ),
        sp(
          "Is 512 clear to check out?",
          "Yes. Housekeeping says the minibar is clear.",
          "Bàn giao là xác nhận, không phải phỏng đoán.",
          "colleague",
        ),
        sp(
          "Our taxi is waiting outside.",
          "Of course, madam. I will be quick.",
          "Khách đang vội thì nói rõ mình sẽ nhanh.",
        ),
      ],
      reading: read(
        `A guest is leaving. ${lx.staff} asks for the room number, then calls Housekeeping about the minibar. One line on the folio is the service charge, ten percent of the room. ${lx.staff} explains it before the guest asks. The printed receipt is given by hand. The whole check-out takes four minutes.`,
        [
          {
            q: "Nhân viên gọi cho bộ phận nào trước khi chốt hoá đơn?",
            options: ["Buồng phòng", "Nhà hàng", "Kỹ thuật"],
            correct: 0,
            explanation: `"calls Housekeeping about the minibar"`,
          },
          {
            q: "Cả lượt trả phòng mất bao lâu?",
            options: ["Bốn phút", "Mười phút", "Nửa giờ"],
            correct: 0,
            explanation: `"The whole check-out takes four minutes."`,
          },
        ],
      ),
      game: [
        game(
          "Can you just take the payment now?",
          "One moment, sir. I will check the minibar first.",
          "Yes yes, pay now, madam, minibar later I check.",
          "Of course, sir. The minibar is surely empty anyway.",
          undefined,
          "Câu này lịch sự và sai: đoán minibar trống là cách khách sạn mất tiền, và cách khách bị gọi lại sau khi đã ra sân bay.",
        ),
        game(
          "This charge was not on the website.",
          "That is the service charge, madam. Ten percent on every bill.",
          "Website no say, but hotel take ten percent always.",
          "I am not sure, madam. The system adds it by itself.",
          undefined,
          "Câu này đúng ngữ pháp và đẩy trách nhiệm cho phần mềm; khoản phí nào cũng phải có một người giải thích được.",
        ),
      ],
    });
  },

  // 217 lượt nói của lễ tân, không một lượt nào dạy từ chối tiết lộ số phòng.
  // Đây là phép thử an ninh phổ biến nhất ở quầy, và trả lời sai một lần là
  // một sự cố, không phải một lỗi tiếng Anh. Bài giữ nguyên ba headword của ô
  // và dùng chính chúng để dạy ranh giới: cái gì ai hỏi cũng nói được, và cái
  // gì thì không.
  FO_19_3: (lx) => {
    const [, r2, r3, , , , r7] = lx.bank.rules;
    return lesson(lx, 19, 3, "A Room Number Is Not Mine to Give", "Số phòng thì không nói", {
      vocabulary: [
        bw(r2, `Our ${lo(r2)} is simple.`),
        bw(r3, `The ${lo(r3)} is outside.`),
        bw(r7, `Please use the ${lo(r7)}.`),
      ],
      grammar: [
        g(
          "He is in room eight-one-two.",
          "I am afraid I cannot give a room number, sir.",
          "Từ chối mở đầu bằng 'I am afraid', rồi nêu đúng việc mình không được làm.",
          "I am afraid I cannot to give a room number, sir.",
        ),
        g(
          "You go up, no problem.",
          "May I call the room for you instead?",
          "'May I…?' xin phép làm giúp; 'instead' mở lối khác ngay sau lời từ chối.",
          "May I calling the room for you instead?",
        ),
      ],
      speaking: [
        sp(
          "Which room is Mr Tanaka in?",
          "I am afraid I cannot give a room number, sir.",
          "Câu quan trọng nhất bài này. Không có ngoại lệ cho ai cả.",
        ),
        sp(
          "But I am his brother.",
          "I understand, sir. May I call the room for you?",
          "Từ chối rồi mở ngay một lối khác — khách vẫn gặp được người cần gặp.",
        ),
        sp(
          "Just tell me if he is staying here.",
          "I am sorry. I cannot confirm that, sir.",
          "Xác nhận một vị khách đang ở đây cũng là tiết lộ.",
        ),
        sp(
          "Then where can I wait?",
          `Our ${lo(r2)} is simple. Please wait in the lobby.`,
          "Nêu quy định rồi chỉ chỗ, khách sẽ không thấy mình bị đuổi.",
        ),
        sp(
          "Can I smoke while I wait?",
          `The ${lo(r3)} is outside, near the garden.`,
          "Thứ này thì ai hỏi cũng nói được — đó là điểm của bài.",
        ),
        sp(
          "And if the alarm goes off?",
          `Please use the ${lo(r7)}, sir.`,
          "Chỉ dẫn an toàn không bao giờ là thông tin cần giữ kín.",
        ),
        sp(
          "Someone is asking for 812.",
          "Please do not confirm it. Call the room first.",
          "Nhắc đồng nghiệp bằng một câu ngắn, trước khi họ lỡ miệng.",
          "colleague",
        ),
      ],
      reading: read(
        `A visitor comes to the desk and asks for a guest by name. ${lx.staff} does not say the room number and does not say whether the guest is in the hotel. ${lx.staff} offers to call the room instead. The visitor waits in the lobby. Anyone may be told where the smoking area is; nobody may be told a room number.`,
        [
          {
            q: "Nhân viên đề nghị làm gì thay vì cho số phòng?",
            options: ["Gọi lên phòng", "Dẫn khách lên tận nơi", "Nhắn tin cho khách"],
            correct: 0,
            explanation: `"offers to call the room instead"`,
          },
          {
            q: "Điều gì ai hỏi cũng nói được?",
            options: ["Khu vực hút thuốc ở đâu", "Số phòng của khách", "Khách có ở đây hay không"],
            correct: 0,
            explanation: `"Anyone may be told where the smoking area is"`,
          },
        ],
      ),
      game: [
        game(
          "Is Mr Tanaka staying here?",
          "I am sorry, sir. I cannot confirm that.",
          "He stay here yes, room eight-one-two, sir.",
          "Yes, sir, he is here. Shall I take you up?",
          undefined,
          "Câu này lịch sự và là một sự cố an ninh: xác nhận một vị khách đang ở đây cũng đã là tiết lộ.",
        ),
        game(
          "I only need his room number, please.",
          "I am afraid I cannot give that, sir. May I call?",
          "Cannot give number, sir. Is rule of hotel here.",
          "Of course, sir. Just this once, it is eight-one-two.",
          undefined,
          "Câu này lịch sự và sai: 'chỉ lần này thôi' là câu mở đầu của gần như mọi sự cố an ninh.",
        ),
      ],
    });
  },

  // Ô paperwork của buồng phòng giữ khái niệm của lễ tân, nên khung dạy nhân
  // viên buồng phòng hỏi khách trả tiền thế nào. Trong khi đó việc họ làm mỗi
  // ngày — báo hỏng — không xuất hiện một lần nào trong tám tuần: maintenance
  // 0, leak 0, out of order 0. Bài này thay cả bộ headword.
  HK_18_3: (lx) =>
    lesson(lx, 18, 3, "Reporting a Fault", "Báo hỏng cho kỹ thuật", {
      vocabulary: [
        v(
          "Maintenance request",
          "/ˈmeɪntənəns rɪˈkwest/",
          "Phiếu báo hỏng",
          "I will put in a maintenance request.",
          "🔧",
        ),
        v(
          "Room blocked",
          "/ruːm blɒkt/",
          "Phòng bị khoá lại, không nhận khách",
          "The system shows room blocked tonight.",
          "⛔",
        ),
        v("Leaking", "/ˈliːkɪŋ/", "Bị rò rỉ", "The tap is leaking in the bathroom.", "💧"),
      ],
      grammar: [
        g(
          "Tap broken, I tell you.",
          "The tap is leaking in room 1408.",
          "Việc đang xảy ra ngay lúc này: is + động từ đuôi -ing.",
          "The tap leaking in room 1408.",
        ),
        g(
          "I write paper for fix.",
          "I will put in a maintenance request.",
          "'Put in' là cụm động từ — rơi mất 'in' là mất nghĩa nộp phiếu.",
          "I will put a maintenance request.",
        ),
      ],
      speaking: [
        sp(
          "What is wrong in 1408?",
          "The tap is leaking in the bathroom.",
          "Nói rõ cái gì hỏng và hỏng ở đâu, chỉ trong một câu.",
          "colleague",
        ),
        sp(
          "Who else knows about it?",
          "Nobody yet. I will put in a maintenance request.",
          "Báo hỏng là một tờ phiếu, không phải một câu nói miệng.",
          "colleague",
        ),
        sp(
          "Can the guest still use the room?",
          "No. Room 1408 is blocked tonight.",
          "Trạng thái phòng phải được gọi tên, nếu không lễ tân sẽ bán nó.",
          "colleague",
        ),
        sp(
          "The shower is not working.",
          "I am sorry, madam. I will report it now.",
          "Nhận việc ngay bằng một câu ngắn, rồi mới đi làm.",
        ),
        sp(
          "When will someone come?",
          "Maintenance comes within thirty minutes, madam.",
          "Cho một mốc thời gian có thật, đừng nói sớm thôi.",
        ),
        sp(
          "Why is 1408 not on the list?",
          "It is blocked. The tap is leaking.",
          "Báo lên cấp trên thì nêu trạng thái trước, lý do sau.",
          "manager",
        ),
        sp(
          "Can I move to another room?",
          "I will ask the front desk for you, madam.",
          "Đổi phòng không phải quyền của buồng phòng — hứa đi hỏi, đừng hứa đổi.",
        ),
      ],
      reading: read(
        `A room attendant finds water on the bathroom floor of room 1408. The tap is leaking. The attendant does not try to fix it. The attendant puts in a maintenance request and tells the floor supervisor. The room is blocked until maintenance comes. Maintenance answers within thirty minutes.`,
        [
          {
            q: "Nhân viên buồng phòng làm gì khi thấy vòi nước rò?",
            options: ["Báo hỏng và báo giám sát", "Tự sửa lấy", "Đợi ca sau xử lý"],
            correct: 0,
            explanation: `"puts in a maintenance request and tells the floor supervisor"`,
          },
          {
            q: "Kỹ thuật đến trong bao lâu?",
            options: ["Trong ba mươi phút", "Trong hai tiếng", "Sáng hôm sau"],
            correct: 0,
            explanation: `"Maintenance answers within thirty minutes."`,
          },
        ],
      ),
      game: [
        game(
          "There is water all over the bathroom floor.",
          "I am sorry, madam. I will report it right now.",
          "Water there, madam. I clean, no problem for you.",
          "I will wipe it up, madam. It happens quite often.",
          undefined,
          "Câu này đúng ngữ pháp và giấu sự cố: lau khô một vũng nước không sửa được cái vòi, và ca sau sẽ gặp lại đúng nó.",
        ),
        game(
          "Shall I just tighten the tap myself?",
          "No. Put in a maintenance request and mark the room.",
          "You no touch, is job of maintenance man only.",
          "Yes, go ahead. It is only a small job anyway.",
          "colleague",
          "Câu này nghe hợp lý và sai thẩm quyền: đường nước không nằm trong phần việc của buồng phòng, và một mối nối vặn hỏng là một trần nhà ướt ở tầng dưới.",
        ),
      ],
    }),

  // Khung cho ra "Here is your lost property, sir." — trao đồ khách bỏ quên
  // ngay tại cửa phòng như trao một tờ hoá đơn. Trưởng buồng phòng gọi đó là
  // một biên bản chờ sẵn. Đây là SOP thật.
  HK_18_4: (lx) =>
    lesson(lx, 18, 4, "Lost and Found", "Đồ khách bỏ quên", {
      vocabulary: [
        v(
          "Lost property",
          "/lɒst ˈprɒpəti/",
          "Đồ khách bỏ quên",
          "The watch goes to lost property.",
          "🔎",
        ),
        v(
          "Log the item",
          "/lɒɡ ði ˈaɪtəm/",
          "Ghi vào sổ",
          "Please log the item with the room number.",
          "📓",
        ),
      ],
      grammar: [
        g(
          "Watch in room, I keep here.",
          "There is a watch in 1204. I will log the item.",
          "'There is' cho một thứ số ít, rồi WILL cho việc mình sắp làm.",
          "There is a watch in 1204. I will logging the item.",
        ),
        g(
          "You take it now yes?",
          "I am afraid I cannot give it here, madam.",
          "Từ chối bằng 'I am afraid' và nêu rõ chỗ nào không được làm.",
          "I am afraid I cannot giving it here, madam.",
        ),
      ],
      speaking: [
        sp(
          "Anything left in 1204?",
          "There is a watch on the desk.",
          "Báo đúng món và đúng chỗ tìm thấy.",
          "colleague",
        ),
        sp(
          "What do I do with it?",
          "Log the item and take it to the office.",
          "Hai bước, đúng thứ tự: ghi sổ trước, mang đi sau.",
          "colleague",
        ),
        sp(
          "I left my watch in 1204.",
          "One moment, madam. I will check lost property.",
          "Không xác nhận đã tìm thấy trước khi văn phòng tra sổ.",
        ),
        sp(
          "Could you just bring it to me?",
          "I am afraid I cannot give it here, madam.",
          "Trao đồ tại cửa phòng là chỗ mọi vụ mất đồ bắt đầu.",
        ),
        sp(
          "Why not? It is mine.",
          "The office checks your name first, madam.",
          "Nêu bước còn thiếu, không nêu sự nghi ngờ.",
        ),
        sp(
          "Is the watch logged?",
          "Yes. It is in the office with the guest name.",
          "Trả lời cấp trên bằng trạng thái và vị trí.",
          "manager",
        ),
        sp(
          "Where is the office?",
          "On the ground floor, madam. I will show you.",
          "Chỉ đường xong thì đi cùng, đừng để khách tự tìm.",
        ),
      ],
      reading: read(
        `A room attendant finds a watch on the desk in room 1204. The attendant does not leave it and does not give it to anyone at the door. The item is written in the lost property book with the room number and the date. Then it goes to the housekeeping office. A guest who claims it gives their name first.`,
        [
          {
            q: "Đồ nhặt được ghi vào sổ kèm những gì?",
            options: ["Số phòng và ngày", "Tên nhân viên nhặt được", "Giá trị món đồ"],
            correct: 0,
            explanation: `"with the room number and the date"`,
          },
          {
            q: "Khách nhận lại đồ phải làm gì trước?",
            options: ["Cho biết tên", "Trả một khoản phí", "Ký ngay tại cửa phòng"],
            correct: 0,
            explanation: `"A guest who claims it gives their name first."`,
          },
        ],
      ),
      game: [
        game(
          "I think I left my watch in that room.",
          "One moment, madam. I will check lost property.",
          "Watch here, madam, I give you now, no problem.",
          "Of course, madam. Here it is, I found it today.",
          undefined,
          "Câu này lịch sự và là một biên bản: trao đồ tại cửa mà không đối chiếu tên là lúc khách sạn không giải trình được nếu người thật đến nhận sau.",
        ),
        game(
          "Nobody will miss this old umbrella.",
          "Log the item anyway. Everything goes to the office.",
          "Small thing only, no need write in book.",
          "You are probably right. Just leave it in the trolley.",
          "colleague",
          "Câu này nghe có lý và sai quy trình: giá trị món đồ không phải điều bạn được quyền đánh giá.",
        ),
      ],
    }),

  // Hoá đơn nhà hàng Việt Nam có 5% phí phục vụ cộng 10% VAT. Khoá dạy đúng
  // một nửa cấu trúc phí, và trưởng bộ phận gọi phần thiếu là nguồn tranh cãi
  // hàng tuần. Bài này giữ nguyên ba headword của ô và dạy trọn tờ hoá đơn,
  // kèm ranh giới: giảm giá không phải quyền của người phục vụ.
  FB_18_3: (lx) => {
    const [, , , , p5, p6, , p8] = lx.bank.paperwork;
    return lesson(lx, 18, 3, "The Bill, Line by Line", "Hoá đơn, từng dòng một", {
      vocabulary: [
        bw(p5, `The ${lo(p5)} is ten percent.`),
        bw(p6, `Which ${lo(p6)} would you prefer?`),
        bw(p8, `You can ${lo(p8)} at the table.`),
      ],
      grammar: [
        g(
          "Bill have tax and service.",
          "The bill includes ten percent VAT and five percent service.",
          "Hai khoản nối bằng 'and'; con số phần trăm đứng trước danh từ.",
          "The bill include ten percent VAT and five percent service.",
        ),
        g(
          "You pay how, cash or card?",
          `Which ${lo(p6)} would you prefer, madam?`,
          "Câu hỏi lựa chọn mở đầu bằng 'Which' + danh từ, không hỏi trống.",
          `Which ${lo(p6)} would you prefer it, madam?`,
        ),
      ],
      speaking: [
        sp(
          "Could we have the bill?",
          "Of course, madam. I will bring it now.",
          "Nhận việc rồi làm ngay; hoá đơn để khách chờ là ấn tượng cuối bữa.",
        ),
        sp(
          "What are these two extra lines?",
          `The ${lo(p5)} is ten percent, and service is five.`,
          "Đọc từng dòng cho khách, đừng chỉ nói tổng.",
        ),
        sp(
          "Can we split it in two?",
          "Certainly, sir. I will make two separate bills.",
          "Tách hoá đơn là việc thường ngày, nhận lời ngay.",
        ),
        sp(
          "How would you like us to pay?",
          `Which ${lo(p6)} would you prefer, madam?`,
          "Hỏi cách thanh toán bằng một câu lựa chọn.",
        ),
        sp(
          "By card, please.",
          `Of course. You can ${lo(p8)} at the table.`,
          "Nói rõ khách không phải đi đâu cả.",
        ),
        sp(
          "Table six wants the bill.",
          "I am printing it now. Two bills, not one.",
          "Bàn giao kèm chi tiết khác thường, để người kia khỏi in lại.",
          "colleague",
        ),
        sp(
          "Is service included in that?",
          "Yes, madam. Five percent is already on the bill.",
          "Trả lời thẳng có hay không, rồi mới nêu con số.",
        ),
      ],
      reading: read(
        `A guest at table six asks for the bill. ${lx.staff} brings it and explains the two extra lines: ten percent VAT and five percent service. The guest asks to split the bill, so ${lx.staff} prints two. The guest pays by card at the table. Nothing is added after the guest sees the total.`,
        [
          {
            q: "Hai dòng thêm trên hoá đơn là gì?",
            options: ["Thuế VAT và phí phục vụ", "Tiền tip và thuế", "Phí phục vụ và tiền phòng"],
            correct: 0,
            explanation: `"ten percent VAT and five percent service"`,
          },
          {
            q: "Khách thanh toán ở đâu?",
            options: ["Ngay tại bàn", "Ở quầy thu ngân", "Ở quầy lễ tân"],
            correct: 0,
            explanation: `"The guest pays by card at the table."`,
          },
        ],
      ),
      game: [
        game(
          "What is this five percent line?",
          "That is the service charge, madam. It is on every bill.",
          "Five percent is service, madam, everybody pay this one.",
          "I am not sure, madam. The kitchen adds that line.",
          undefined,
          "Câu này đúng ngữ pháp và sai người: phí phục vụ do nhà hàng tính chứ không phải bếp, và khoản tiền nào cũng phải có người giải thích được.",
        ),
        game(
          "Could you give us a small discount?",
          "I will ask my manager, madam. I cannot decide that.",
          "No discount, madam, price is price for everybody here.",
          "Of course, madam. I can take ten percent off for you.",
          undefined,
          "Câu này lịch sự và vượt quyền: giảm giá là quyết định của quản lý ca, và người phải rút lời hứa lại là quản lý, trước mặt chính vị khách đó.",
        ),
      ],
    });
  },
  // Tám tuần dạy spa mà không có một câu nào về hướng dẫn cởi đồ, khăn phủ và
  // gõ cửa. Trưởng bộ phận gọi đó là thao tác đầu tiên của mọi buổi trị liệu
  // và là chỗ phát sinh gần như toàn bộ khiếu nại nhạy cảm của ngành. Bài này
  // thay bộ headword của ô, vì hai thẻ cũ là biên lai và tên kỹ thuật viên.
  SW_18_4: (lx) =>
    lesson(
      lx,
      18,
      4,
      "Before We Begin: What You Wear",
      "Trước buổi trị liệu: áo choàng & khăn phủ",
      {
        vocabulary: [
          v(
            "Treatment robe",
            "/ˈtriːtmənt rəʊb/",
            "Áo choàng trị liệu",
            "Your treatment robe is on the hook.",
            "🥼",
          ),
          v(
            "Towel cover",
            "/ˈtaʊəl ˈkʌvə/",
            "Khăn phủ người",
            "A towel cover stays on at all times.",
            "🛏️",
          ),
        ],
        grammar: [
          g(
            "You take off all clothes.",
            "Please undress to your comfort level, madam.",
            "Mệnh lệnh lịch sự mở đầu bằng 'Please'; phần sau trả quyền quyết định cho khách.",
            "Please undress to your comfortable level, madam.",
          ),
          g(
            "I come in now ok?",
            "I will knock before I come in, madam.",
            "WILL cho việc sắp làm; mệnh đề 'before' đi sau và động từ trong đó ở hiện tại.",
            "I will knock before I will come in, madam.",
          ),
        ],
        speaking: [
          sp(
            "Do I take everything off?",
            "Please undress to your comfort level, madam.",
            "Câu quan trọng nhất bài này. Mức nào là do khách quyết, không phải do bạn.",
          ),
          sp(
            "Where do I put my clothes?",
            "Your treatment robe is on the hook, madam.",
            "Chỉ đúng chỗ, khách sẽ không phải hỏi lại khi bạn đã ra ngoài.",
          ),
          sp(
            "Will I be covered?",
            "Yes, madam. A towel cover stays on at all times.",
            "Trả lời thẳng rồi nói rõ suốt buổi, không chỉ lúc đầu.",
          ),
          sp(
            "How will I know you are coming in?",
            "I will knock before I come in, madam.",
            "Gõ cửa là lời hứa; nói ra thành lời thì khách yên tâm cởi đồ.",
          ),
          sp(
            "I am twenty minutes late, sorry.",
            "That is all right, madam. We finish at four.",
            "Nhận lời xin lỗi rồi nêu ngay mốc kết thúc thật.",
          ),
          sp(
            "Can we add the time at the end?",
            "I am sorry. The next guest starts at four.",
            "Kéo dài buổi này là lấy thời gian của vị khách kế tiếp.",
          ),
          sp(
            "Is room two ready?",
            "Yes. Robe out, towel cover ready.",
            "Bàn giao phòng bằng danh sách ngắn, đủ món.",
            "colleague",
          ),
        ],
        reading: read(
          `Before a treatment, ${lx.staff} shows the guest the changing room. The guest undresses to their own comfort level. A towel cover stays on the whole time, and only the area being worked on is open. ${lx.staff} knocks and waits before coming back in. A guest who arrives late still finishes at the booked end time.`,
          [
            {
              q: "Khách cởi đồ tới mức nào?",
              options: ["Tới mức khách thấy thoải mái", "Cởi hết", "Giữ nguyên quần áo"],
              correct: 0,
              explanation: `"The guest undresses to their own comfort level."`,
            },
            {
              q: "Khách đến muộn thì buổi trị liệu kết thúc lúc nào?",
              options: [
                "Đúng giờ đã đặt",
                "Muộn thêm đúng số phút đến trễ",
                "Khi nào xong thì thôi",
              ],
              correct: 0,
              explanation: `"A guest who arrives late still finishes at the booked end time."`,
            },
          ],
        ),
        game: [
          game(
            "Should I take everything off?",
            "Please undress to your comfort level, madam.",
            "You take off all, madam, is normal for massage.",
            "Yes, madam. Everything off, that is how we do it.",
            undefined,
            "Câu này đúng ngữ pháp và là chỗ phát sinh gần như mọi khiếu nại nhạy cảm của ngành: quyết định ấy thuộc về khách, không thuộc về bạn.",
          ),
          game(
            "I am late. Can we still do the full hour?",
            "I am sorry, madam. The next guest starts at four.",
            "No time, madam, next people come, you late already.",
            "Of course, madam. We will just run over a little.",
            undefined,
            "Câu này lịch sự và sai: kéo dài buổi này là lấy mất giờ của vị khách kế tiếp, và người phải xin lỗi họ là đồng nghiệp của bạn.",
          ),
        ],
      },
    ),

  // Sự cố được báo cáo nhiều nhất trong spa resort không có một chữ nào trong
  // tám tuần. Bài giữ nguyên bốn headword của ô — hai mức lực là phương tiện —
  // và dạy đúng một phản xạ: dừng tay, ra ngoài, gọi quản lý.
  SW_20_1: (lx) => {
    const [c1, c2] = lx.bank.choices;
    return lesson(lx, 20, 1, "A Request You Must Not Take", "Yêu cầu không được nhận", {
      vocabulary: [
        v("Prefer", "/prɪˈfɜː/", "Thích hơn", "Would you prefer tea or coffee?", "❤️"),
        v("Choice", "/tʃɔɪs/", "Sự lựa chọn", "Both are good choices.", "🔀"),
        bw(c1, `Would you prefer the ${lo(c1)}?`),
        bw(c2, `Or perhaps the ${lo(c2)}?`),
      ],
      grammar: [
        g(
          "No, I not do that.",
          "I am not able to do that, madam.",
          "'I am not able to' nghe nhã hơn 'I cannot' khi từ chối một yêu cầu của khách.",
          "I am not able do that, madam.",
        ),
        g(
          "Stop now, I go out.",
          "I need to stop here. Please excuse me a moment.",
          "Hai câu ngắn: nêu việc mình làm, rồi xin phép rời phòng.",
          "I need stop here. Please excuse me a moment.",
        ),
      ],
      speaking: [
        sp(
          "How hard will you press?",
          `Would you prefer the ${lo(c1)} or the ${lo(c2)}?`,
          "Đưa hai mức rõ ràng ngay từ đầu, khách sẽ dễ nói khi muốn đổi.",
        ),
        sp(
          "Both sound fine to me.",
          "Both are good choices, madam. We can change any time.",
          "Nói rõ đổi được giữa chừng — đó là lời mời khách lên tiếng.",
        ),
        sp(
          "Could you work higher up, please?",
          "I am not able to do that, madam.",
          "Câu quan trọng nhất bài này. Ngắn, không giải thích dài, không xin lỗi nhiều lần.",
        ),
        sp(
          "Just a little higher, it is fine.",
          "I am sorry. I need to stop here.",
          "Lần thứ hai thì không thương lượng nữa: dừng tay.",
        ),
        sp(
          "What is happening in room two?",
          "A request I cannot take. I am stopping now.",
          "Báo cấp trên bằng một câu, không kể chi tiết ở hành lang.",
          "manager",
        ),
        sp(
          "Do I tell the guest anything?",
          "Say the manager will come. Do not argue.",
          "Đồng nghiệp cần đúng hai việc: nói gì, và không làm gì.",
          "colleague",
        ),
        sp(
          "Tell me if it is too much.",
          "Of course, madam. Say stop at any time.",
          "Trao lại cho khách quyền dừng, bằng đúng một từ dễ nói.",
        ),
      ],
      reading: read(
        `A guest asks for something outside the treatment. ${lx.staff} does not argue and does not explain for a long time. ${lx.staff} says only that it is not possible, stops the treatment and steps out. The manager comes to the room. A therapist never decides alone what to allow.`,
        [
          {
            q: "Kỹ thuật viên làm gì ngay sau lời từ chối?",
            options: [
              "Dừng buổi trị liệu và ra ngoài",
              "Tranh luận với khách",
              "Tiếp tục nhưng nhẹ tay hơn",
            ],
            correct: 0,
            explanation: `"stops the treatment and steps out"`,
          },
          {
            q: "Ai tới phòng sau đó?",
            options: ["Quản lý", "Lễ tân", "Nhân viên cứu hộ"],
            correct: 0,
            explanation: `"The manager comes to the room."`,
          },
        ],
      ),
      game: [
        game(
          "Could you press a little higher up?",
          "I am not able to do that, madam.",
          "No, no higher, madam, is not my job here.",
          "Of course, madam. Just this once, no problem.",
          undefined,
          "Câu này lịch sự và là chỗ mọi sự cố spa bắt đầu: 'chỉ lần này thôi' bỏ đi một ranh giới mà bạn không có quyền bỏ.",
        ),
        game(
          "Come on, nobody will know.",
          "I need to stop here. Please excuse me a moment.",
          "I go now, madam, you wait, manager come talk.",
          "Please do not worry, madam. I will not tell anyone.",
          undefined,
          "Câu này đúng ngữ pháp và biến bạn thành người cùng giữ bí mật. Việc đúng là dừng tay và gọi quản lý.",
        ),
      ],
    });
  },

  // 217 lượt nói của guest relations, không lượt nào dạy từ chối tiết lộ số
  // phòng — trong khi đây là quầy được hỏi câu đó nhiều nhất. Bài giữ nguyên
  // ba headword của ô và dùng chúng để vẽ ranh giới: cái gì nói được với bất
  // kỳ ai, và cái gì thì không.
  GR_19_3: (lx) => {
    const [, r2, r3, , , , r7] = lx.bank.rules;
    return lesson(lx, 19, 3, "A Room Number Is Not Mine to Give", "Số phòng thì không nói", {
      vocabulary: [
        bw(r2, `Our ${lo(r2)} is simple.`),
        bw(r3, `The ${lo(r3)} is outside.`),
        bw(r7, `Please use the ${lo(r7)}.`),
      ],
      grammar: [
        g(
          "She is in room seven-oh-four.",
          "I am afraid I cannot give a room number, madam.",
          "Từ chối mở đầu bằng 'I am afraid', rồi nêu đúng việc mình không được làm.",
          "I am afraid I cannot to give a room number, madam.",
        ),
        g(
          "You leave flower here ok.",
          "May I take the flowers to the room for you?",
          "'May I…?' xin phép làm giúp — khách vẫn đạt được việc của họ.",
          "May I taking the flowers to the room for you?",
        ),
      ],
      speaking: [
        sp(
          "Which room is Mrs Chen in?",
          "I am afraid I cannot give a room number, madam.",
          "Câu quan trọng nhất bài này. Không có ngoại lệ cho ai cả.",
        ),
        sp(
          "I have flowers for her.",
          "May I take the flowers to the room for you?",
          "Từ chối rồi mở ngay một lối khác: hoa vẫn tới nơi.",
        ),
        sp(
          "Is she even staying here?",
          "I am sorry. I cannot confirm that, madam.",
          "Trả lời có hay không đều là tiết lộ. Không trả lời cả hai.",
        ),
        sp(
          "Where should I wait then?",
          `The ${lo(r3)} is outside. Please wait there, madam.`,
          "Chỉ chỗ ngồi tử tế, khách sẽ không thấy mình bị đuổi.",
        ),
        sp(
          "Can she come down to meet me?",
          `Our ${lo(r2)} is simple. I will call the room.`,
          "Viện dẫn quy định rồi làm ngay việc mình được làm.",
        ),
        sp(
          "Where do the cars come in?",
          `Please use the ${lo(r7)}, madam.`,
          "Chỉ đường thì ai hỏi cũng nói được — đó là điểm của bài.",
        ),
        sp(
          "A courier is asking for 704.",
          "Take the parcel. Do not give the number.",
          "Nhắc đồng nghiệp bằng hai câu ngắn, trước khi họ lỡ miệng.",
          "colleague",
        ),
      ],
      reading: read(
        `A courier comes with flowers for a guest. ${lx.staff} does not give the room number and does not say whether the guest is in the hotel. ${lx.staff} takes the flowers and delivers them. The courier waits in the garden lounge. A card with the sender's name goes up with the flowers.`,
        [
          {
            q: "Nhân viên làm gì với bó hoa?",
            options: [
              "Tự mang lên phòng",
              "Đưa số phòng cho người giao",
              "Để lại ở quầy cho khách xuống lấy",
            ],
            correct: 0,
            explanation: `"takes the flowers and delivers them"`,
          },
          {
            q: "Cái gì được gửi lên cùng bó hoa?",
            options: ["Tấm thiệp có tên người gửi", "Hoá đơn", "Số điện thoại người giao"],
            correct: 0,
            explanation: `"A card with the sender's name goes up with the flowers."`,
          },
        ],
      ),
      game: [
        game(
          "Which room do I deliver these to?",
          "I will take them up, sir. May I have your name?",
          "Room seven-oh-four, sir, you go up by lift.",
          "Of course, sir. It is room seven-oh-four, top floor.",
          undefined,
          "Câu này lịch sự và là một sự cố an ninh: người giao hàng không cần số phòng, họ chỉ cần bó hoa tới đúng nơi.",
        ),
        game(
          "Is Mrs Chen checked in yet?",
          "I am sorry, madam. I cannot confirm that.",
          "She here already, madam, come this morning early.",
          "She is, madam. Would you like me to ring her?",
          undefined,
          "Câu này lịch sự và vẫn tiết lộ: trả lời có hay không cũng đều là thông tin về một vị khách.",
        ),
      ],
    });
  },

  // Concierge có đúng một câu về xe trong tám tuần, và đó là câu thực đơn:
  // "The private car is available too." Không giờ đón, không điểm đón, không
  // tên tài xế, không thời gian di chuyển. Bài này thay bộ headword của ô.
  GR_18_2: (lx) =>
    lesson(lx, 18, 2, "The Car at Six-Thirty", "Xe đón lúc sáu rưỡi", {
      vocabulary: [
        v("Pick-up time", "/ˈpɪk ʌp taɪm/", "Giờ đón", "Your pick-up time is six-thirty.", "🕡"),
        v("Driver's name", "/ˈdraɪvəz neɪm/", "Tên tài xế", "The driver's name is Mr Hung.", "🧑‍✈️"),
        v(
          "Journey time",
          "/ˈdʒɜːni taɪm/",
          "Thời gian di chuyển",
          "The journey time is forty minutes.",
          "🛣️",
        ),
      ],
      grammar: [
        g(
          "Car come six-thirty ok.",
          "Your car will be here at six-thirty, sir.",
          "WILL + BE cho một cái hẹn; mốc giờ đứng sau 'at'.",
          "Your car will here at six-thirty, sir.",
        ),
        g(
          "Driver name Hung, no problem.",
          "The driver's name is Mr Hung, madam.",
          "Sở hữu cách: driver'S name. Tên riêng đi kèm 'Mr'.",
          "The driver name is Mr Hung, madam.",
        ),
      ],
      speaking: [
        sp(
          "Could you book a car to the airport?",
          "Of course, sir. What time is your flight?",
          "Hỏi giờ bay trước, mọi mốc còn lại tính ngược từ đó.",
        ),
        sp(
          "It leaves at nine.",
          "Your pick-up time is six-thirty, then.",
          "Đưa một con số, đừng nói sớm sớm một chút.",
        ),
        sp(
          "Who will be driving?",
          "The driver's name is Mr Hung, madam.",
          "Có tên là có người chịu trách nhiệm; khách yên tâm hơn hẳn.",
        ),
        sp(
          "How long does it take?",
          "The journey time is forty minutes, sir.",
          "Nói thời gian di chuyển, để khách tự kiểm được mốc đón.",
        ),
        sp(
          "Is it confirmed?",
          "Not yet, madam. I will call the company now.",
          "Chưa gọi thì chưa có xe — nói thẳng, đừng để khách tưởng xong.",
        ),
        sp(
          "Any cars for the morning?",
          "One at six-thirty. Airport, two guests.",
          "Bàn giao bằng giờ, nơi đến và số khách.",
          "colleague",
        ),
        sp(
          "Where will the car wait?",
          "At the main entrance, sir. I will walk you out.",
          "Chỉ chỗ rồi đi cùng — đó là phần việc của concierge.",
        ),
      ],
      reading: read(
        `A guest asks for a car to the airport. ${lx.staff} asks for the flight time first, then works backwards: the journey takes forty minutes, so the pick-up time is six-thirty. ${lx.staff} calls the car company and only then tells the guest it is confirmed. The driver's name goes on the guest's card.`,
        [
          {
            q: "Nhân viên hỏi điều gì trước tiên?",
            options: ["Giờ bay", "Loại xe", "Số kiện hành lý"],
            correct: 0,
            explanation: `"asks for the flight time first"`,
          },
          {
            q: "Đi ra sân bay mất bao lâu?",
            options: ["Bốn mươi phút", "Hai mươi phút", "Một tiếng rưỡi"],
            correct: 0,
            explanation: `"the journey takes forty minutes"`,
          },
        ],
      ),
      game: [
        game(
          "Can you have a car ready for six?",
          "I will call the company and confirm, madam.",
          "Six o'clock car have, madam, no problem for you.",
          "Of course, madam. Your car will be here at six.",
          undefined,
          "Câu này lịch sự và sai: chưa gọi thì chưa có xe, và người đứng chờ ở sảnh lúc sáu giờ là khách.",
        ),
        game(
          "Is the driver reliable?",
          "Mr Hung drives for us every week, madam.",
          "Driver good, madam, no worry, he drive long time.",
          "I am not sure, madam. The company sends anyone.",
          undefined,
          "Câu này đúng ngữ pháp và bỏ khách lại với nỗi lo; concierge tồn tại để bảo đảm phần mình biết chắc.",
        ),
      ],
    }),

  // Tình huống số một của mọi nhà hàng — khách chê món — không có một lượt nói
  // nào trong tám tuần, và giao tiếp với bếp chỉ có đúng một lượt. Bài này
  // thay bộ headword của ô, vì hai thẻ cũ là túi xách và két an toàn.
  FB_19_4: (lx) =>
    lesson(lx, 19, 4, "When the Guest Is Not Happy", "Khi khách không hài lòng", {
      vocabulary: [
        v(
          "Bring another one",
          "/brɪŋ əˈnʌðə wʌn/",
          "Mang món khác ra",
          "Would you like me to bring another one?",
          "🍽️",
        ),
        v(
          "Take it back",
          "/teɪk ɪt ˈbæk/",
          "Mang trả lại bếp",
          "I will take it back to the kitchen.",
          "↩️",
        ),
      ],
      grammar: [
        g(
          "Food no good? I take.",
          "I am very sorry, madam. I will take it back.",
          "Xin lỗi trước, rồi mới nói mình sẽ làm gì.",
          "I am very sorry, madam. I will taking it back.",
        ),
        g(
          "You want new one or no?",
          "Would you like me to bring another one?",
          "'Would you like me to' + động từ nguyên thể là mẫu đề nghị làm giúp.",
          "Would you like me bring another one?",
        ),
      ],
      speaking: [
        sp(
          "This beef is overcooked.",
          "I am very sorry, madam. I will take it back.",
          "Không giải thích, không bào chữa. Xin lỗi rồi mang đĩa đi.",
        ),
        sp(
          "I waited thirty minutes for this.",
          "I am sorry, sir. I will speak to the kitchen now.",
          "Nhận phần chậm về nhà hàng, đừng kể khách nghe bếp đang bận.",
        ),
        sp(
          "Can I have something else?",
          "Of course. Would you like me to bring another one?",
          "Đồng ý ngay, rồi mới hỏi khách muốn gì.",
        ),
        sp(
          "What is wrong at table six?",
          "The beef is overcooked. Please cook a new one.",
          "Nói với bếp bằng sự việc, không bằng lời trách.",
          "colleague",
        ),
        sp(
          "Should I go to the table?",
          "Yes. Table six is not happy with the beef.",
          "Gọi quản lý sớm hơn là muộn; khách chờ càng lâu càng khó gỡ.",
          "manager",
        ),
        sp(
          "How long will the new one take?",
          "About ten minutes, madam. I will bring bread now.",
          "Cho một mốc, và cho khách thứ gì đó trong lúc chờ.",
        ),
        sp(
          "We do not want to pay for that.",
          "I will ask my manager, sir. I cannot decide that.",
          "Bỏ một món khỏi hoá đơn là quyết định của quản lý ca.",
        ),
      ],
      reading: read(
        `A guest at table six says the beef is overcooked. ${lx.staff} apologises, takes the plate back and tells the chef at once. The chef cooks a new one. ${lx.staff} brings bread to the table while the guest waits. The manager comes to the table before the bill is written.`,
        [
          {
            q: "Nhân viên làm gì ngay sau lời xin lỗi?",
            options: [
              "Mang đĩa về bếp và báo bếp trưởng",
              "Ghi vào sổ góp ý",
              "Gọi quản lý trước đã",
            ],
            correct: 0,
            explanation: `"takes the plate back and tells the chef at once"`,
          },
          {
            q: "Trong lúc chờ món mới, khách được mời gì?",
            options: ["Bánh mì", "Nước ngọt", "Món tráng miệng"],
            correct: 0,
            explanation: `"brings bread to the table while the guest waits"`,
          },
        ],
      ),
      game: [
        game(
          "This is cold. We have been waiting ages.",
          "I am very sorry, sir. I will take it back now.",
          "Sorry sir, kitchen very busy today, many people here.",
          "I understand, sir. The kitchen is short of staff tonight.",
          undefined,
          "Câu này đúng ngữ pháp và đổ lỗi cho bếp ngay trước mặt khách; khách không cần biết bếp thiếu người, khách cần một đĩa nóng.",
        ),
        game(
          "We are not paying for that dish.",
          "I will ask my manager, sir. I cannot decide that.",
          "No pay is not possible, sir, food already cook.",
          "Of course, sir. I will take it off the bill.",
          undefined,
          "Câu này lịch sự và vượt quyền: bỏ một món khỏi hoá đơn là quyết định của quản lý ca, không phải của người phục vụ.",
        ),
      ],
    }),
};

/** Spread a department's own review turns across the week's four lessons.
 *  Applied after the headword lock so they are never counted as this week's
 *  targets — they exist to put an EARLIER week's words back in the mouth. */
function withDeptReview(lessons: LessonContent[], code: string, week: number): LessonContent[] {
  const extra = DEPT_REVIEW[`${code}-${week}`];
  if (!extra) return lessons;
  return lessons.map((lesson, i) => ({
    ...lesson,
    speaking: [...lesson.speaking, ...extra.filter((_, j) => j % lessons.length === i)],
  }));
}

function buildWeek(
  lx: Ctx,
  week: number,
  priorWords: string[],
  overrides: Record<string, WeekContent>,
): WeekContent {
  const meta = WEEK_META[week];
  const review = reviewWordsFor(lx, week, priorWords, overrides);
  return {
    departmentId: lx.code,
    weekNumber: week,
    weekTitleEn: meta.en,
    weekTitleVi: meta.vi,
    // Same lock Phase 0 and Phase 1 use. Without it a target passes with its
    // own headword deleted — measured at 48.4% (P2), 13.7% (P3), 36.7% (P4).
    // Bài riêng thay bài khung cùng lessonId, nên tuần vẫn đủ bốn bài đúng thứ
    // tự và mọi id ở hạ nguồn — tiến độ, khoá ôn, deep link — vẫn hợp lệ.
    lessons: withDeptReview(
      lockWeekHeadwords(
        meta.build(lx).map((l) => DEPT_LESSONS[l.lessonId]?.(lx) ?? l),
        review,
      ),
      lx.code,
      week,
    ),
    reviewWords: review,
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
