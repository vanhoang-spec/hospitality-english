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

import type { LessonContent, SpeakingItem, WeekContent } from "./week-content";
import { LEXICONS, game, g, read, sp, v, type P0Lexicon, lockWeekHeadwords } from "./phase0";
import { DEPT_REVIEW } from "./phase2-dept-review";
import { bankFor, type P2Bank, type P2Word } from "./phase2-lexicon";

type Ctx = P0Lexicon & { bank: P2Bank };

/** Tiêu đề BÀI riêng cho một bộ phận, keyed theo lessonId.
 *
 *  `DEPT_WEEK_TITLES` phía dưới đã nhận ra đúng vấn đề này ở cấp TUẦN — buồng
 *  phòng làm giấy tờ và bàn giao, tiền bạc là việc của lễ tân — nhưng bỏ sót
 *  cấp BÀI, nên tuần 22 của buồng phòng vẫn mở một bài tên "…& Payment"
 *  trong khi chính khoá dạy "Housekeeping staff never take cash." Tiêu đề là
 *  thứ học viên đọc trước cả nội dung. */
const DEPT_LESSON_TITLES: Record<string, { en: string; vi: string }> = {
  HK_22_2: { en: "Details, Paperwork & Handover", vi: "Ghép hỏi thông tin với giấy tờ" },
};

function lesson(
  lx: Ctx,
  week: number,
  order: number,
  titleEn: string,
  titleVi: string,
  parts: Omit<LessonContent, "lessonId" | "lessonOrder" | "titleEn" | "titleVi">,
): LessonContent {
  const lessonId = `${lx.code}_${week}_${order}`;
  const title = DEPT_LESSON_TITLES[lessonId];
  return {
    lessonId,
    lessonOrder: order,
    titleEn: title?.en ?? titleEn,
    titleVi: title?.vi ?? titleVi,
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
        bw(a1, `First we ${lo(a1)}, then we ${lo(a2)}.`),
        // a2 là bước THỨ HAI, nhưng thẻ của nó lại mượn đúng cụm nối của bước
        // thứ ba ("After that,"), nên nó dạy sai chính liên từ mà bài này đặt
        // tên. Cụm "After that," thuộc về a3.
        bw(a2, `Then I ${lo(a2)}.`),
        // a3 là ô ngân hàng DUY NHẤT của tuần 15 không hề có thẻ ở bộ phận
        // nào: bài này đã bắt nói `After that, I ${a3}` ở phần nói VÀ ở bài
        // đọc, tuần 16 còn hỏi lại nó bằng "The third step is to …", và tuần
        // 18 dùng nó trong "First I …, then I …". Sáu bộ phận cùng thiếu một
        // thẻ cho bước thứ ba của chính quy trình mình.
        bw(a3, `After that, I ${lo(a3)}.`),
      ],
      grammar: [
        g(
          `I ${lo(a1)} first, after I ${lo(a2)}.`,
          `First I ${lo(a1)}, then I ${lo(a2)}.`,
          // Luật cũ bảo 'after' + mệnh đề là sai ngữ pháp. Không đúng: "after
          // I greet the guest" là câu hoàn toàn chuẩn. Lỗi thật nằm ở NGHĨA —
          // 'after' đẩy việc đó xuống sau, nên ghép với 'first' thì hai vế
          // chọi nhau và người nghe không biết bước nào trước.
          "'after' + mệnh đề vẫn đúng ngữ pháp, nhưng nó nói việc đó xảy ra SAU — ghép với 'first' là ngược trình tự. Nói 'First … then …'.",
          `First I ${lo(a1)}, then I will to ${lo(a2)}.`,
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
          "colleague",
        ),
        // Lượt THỨ HAI của một cặp, đặt `follows` TƯỜNG MINH. Câu hỏi mở bằng
        // tham chiếu ngược VÀ nhắc lại chính danh từ của lượt trước, nên nó chỉ
        // có nghĩa sau lượt ấy — đúng thứ lớp suy ra bằng regex ở
        // week-content.ts không bảo đảm được.
        sp(
          `And after you ${lo(a2)}?`,
          `After that, I ${lo(a3)}.`,
          "Nối bước thứ ba bằng 'After that,' — giữ câu ngắn, đừng gộp ba bước vào một câu.",
          "colleague",
          undefined,
          `First I ${lo(a1)}, then I ${lo(a2)}.`,
        ),
        sp(
          "Which step comes first here?",
          `First we ${lo(a1)}, then we ${lo(a2)}.`,
          "Nói trình tự bằng first … then …, hai vế cùng thì.",
          "colleague",
        ),
        sp(
          // Lượt ngay trên đã trả lời bằng bước BA. Ô này hỏi bước kế tiếp mà
          // vẫn trả lời bằng bước HAI, nên hai lượt liền nhau dạy sai thứ tự
          // quy trình ở đúng tuần đặt nền cho cả phase.
          "And the step after that?",
          `After that, I ${lo(a4)}.`,
          "Cụm nối 'After that,' có dấu phẩy rồi mới tới mệnh đề.",
          "colleague",
        ),
        sp(
          "How does it start?",
          `First we ${lo(a1)}, then we ${lo(a2)}.`,
          "Bước đầu tiên phải nói được thành lời trước khi làm.",
          "colleague",
        ),
        sp(
          "What is step two?",
          `After that, I ${lo(a2)}.`,
          "Nối bước bằng After that để người nghe theo kịp.",
          "colleague",
        ),
      ],
      reading: read(
        `${lx.staff} explains the routine to a new colleague. "First I ${lo(a1)}, then I ${lo(a2)}. After that, I ${lo(a3)}. We always ${lo(a8)}." On a busy day, a new colleague wants to skip a step. ${lx.staff} says no, because every step protects the guest. The new colleague writes the steps down.`,
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
        // Vòng thứ hai của bài, dựng trên thẻ THỨ BA của chính bài — không tốn
        // suất thẻ nào. Đáp án cố ý NGẮN nhất trong ba bong bóng: cổng
        // GAME_RANK_MAX đo hạng độ dài theo ký tự trên cả 40 tuần, nên mỗi vòng
        // mới phải được xếp hạng có chủ ý.
        game(
          "Which step is the third one?",
          `After that, I ${lo(a3)}.`,
          `After that, I will to ${lo(a3)}.`,
          "We do that step whenever there is time.",
          "colleague",
          "Câu này đúng ngữ pháp và bỏ mất thứ tự: bước ba là bước ba, không phải bước làm khi nào rảnh.",
        ),
      ],
    }),

    lesson(lx, 15, 2, "Polite Instructions", "Hướng dẫn khách lịch sự", {
      vocabulary: [
        v("Step", "/step/", "Bước trong quy trình", "The next step is simple.", "🪜"),
        bw(a4, `Next, we ${lo(a4)}.`),
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
        // "Is there anything I need to do?" rút về askedKey `need` — một từ nội
        // dung, dưới ngưỡng hai từ mà acceptedAnswers đòi, nên lượt này không
        // gom cụm được với bất kỳ câu nào cùng nghĩa. Thêm mốc "before we
        // start" cho key thành `before need start`.
        sp(
          "Is there anything I need to do before we start?",
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
          "What is the next step?",
          `Next, we ${lo(a4)}, madam.`,
          "Gọi tên bước kế tiếp để khách biết mình đang ở đâu trong quy trình.",
        ),
        sp(
          `And right after you ${lo(a4)}?`,
          `I will ${lo(a5)} in a moment.`,
          "Will cho việc sắp làm ngay sau đây.",
          undefined,
          undefined,
          `Next, we ${lo(a4)}, madam.`,
        ),
      ],
      reading: read(
        `A guest is unsure what to do. ${lx.staff} says: "Please wait a moment while I ${lo(a4)}. After that, I will ${lo(a5)}." The guest relaxes. ${lx.staff} comes back quickly and explains the next step in simple words. The guest does not have to ask again.`,
        [
          {
            q: "Nhân viên đề nghị khách làm gì?",
            options: ["Chờ một lát", "Tự làm lấy", "Quay lại sau"],
            correct: 0,
            explanation: `"Please wait a moment" — đề nghị khách chờ.`,
          },
          // Câu hỏi cũ ("điều gì làm việc chờ thấy ngắn hơn?") hỏi lại một câu
          // châm ngôn dán ở cuối bài: tìm đúng câu ấy là xong, không phải đọc.
          // Câu mới bắt ghép hai câu cách nhau trong bài, và lời giải thích
          // trích CẢ HAI — cổng READING_ANCHORED_MIN vẫn tính là có neo.
          {
            q: "Vì sao khách không phải hỏi lại lần nữa?",
            options: [
              "Vì nhân viên nói trước việc mình làm rồi quay lại giải thích bước kế tiếp",
              "Vì khách đã đọc toàn bộ quy trình trên tờ hướng dẫn đặt sẵn ở quầy lễ tân",
              "Vì nhân viên đề nghị khách chờ yên lặng và khách không được phép hỏi lại gì thêm",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "Please wait a moment while I ${lo(a4)}" và "explains the next step in simple words".`,
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
        // Vòng hai, dựng trên thẻ a4 của chính bài. Đáp án cố ý DÀI nhất ở
        // vòng này để cân lại vòng ngắn ở bài 1.
        game(
          "Why do I have to wait here?",
          `Please wait a moment while I ${lo(a4)}.`,
          `You wait, I ${lo(a4)} now.`,
          "Just a minute.",
          undefined,
          "Câu này đúng ngữ pháp nhưng trống không: khách không biết mình chờ để làm gì, nên một phút nghe như mười.",
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
          // nearMiss cũ là "I forget sometimes to …" — văn phong hơi vụng
          // nhưng ĐÚNG ngữ pháp, nên nó dạy học viên sợ một câu không sai.
          // Lỗi thật mà luật này chống là bỏ mất 'to' sau 'forget'.
          `I sometimes forget ${lo(a7)}.`,
        ),
      ],
      speaking: [
        sp(
          "Why does the order matter?",
          `If we change the order, we make mistakes.`,
          "Câu điều kiện đơn giản — hai mệnh đề, đúng tầm A2.",
        ),
        sp(
          "And which part of the order needs the most care?",
          // Ô a6 là CỤM ĐỘNG TỪ ở 4/6 bộ phận ("show the room", "check the
          // comfort"), nên khung "The ___ always comes last" đẻ ra
          // "The show the room always comes last" — không phải tiếng Anh.
          // Khung nay đặt nó vào đúng vị trí động từ.
          `We always ${lo(a6)} with care, madam.`,
          "Dùng 'always' để nhấn rằng đây là quy tắc cố định; trạng từ đứng trước động từ chính.",
          undefined,
          undefined,
          `If we change the order, we make mistakes.`,
        ),
        sp(
          "Is there anything you must not skip?",
          `Do not forget to ${lo(a7)}.`,
          "Nhắc việc bắt buộc: 'Do not forget to + động từ'.",
          "colleague",
        ),
        sp(
          "What do you always do last?",
          `We always ${lo(a8)}.`,
          "Trạng từ tần suất always đứng trước động từ chính.",
          "colleague",
        ),
        sp(
          "Which part do you never rush?",
          `We always ${lo(a6)} with care.`,
          "Always đứng trước động từ chính.",
          "colleague",
        ),
        sp(
          "Is that always the order?",
          `We always ${lo(a8)}.`,
          "Quy trình chuẩn nói ở thì hiện tại đơn.",
          "colleague",
        ),
      ],
      reading: read(
        `The supervisor reminds the team: "The order of the steps is important. If we change the order, we make mistakes. We always ${lo(a6)} with care." A new colleague asks why. The supervisor answers: "A guest can see a mistake, but a guest cannot see a good routine." Good work is quiet, and guests feel it.`,
        [
          {
            q: "Điều gì xảy ra nếu đổi thứ tự các bước?",
            options: ["Dễ mắc lỗi", "Làm việc nhanh hơn", "Không sao cả, vẫn ổn"],
            correct: 0,
            explanation: `"If we change the order, we make mistakes."`,
          },
          // Câu cũ chỉ cần dò một dòng ("We always … with care") rồi đối chiếu
          // nghĩa thẻ. Câu mới đòi ghép lời quản lý với câu kết của bài.
          {
            q: "Theo lời quản lý, vì sao một quy trình làm đúng thì khách không nhận ra?",
            options: [
              "Vì khách chỉ nhìn thấy lỗi, còn một quy trình trôi chảy thì không ai để ý",
              "Vì khách sạn không cho phép nhân viên nhận lời khen trực tiếp từ khách ở sảnh",
              "Vì nhân viên làm quá nhanh nên khách không kịp nhìn thấy từng bước một",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "a guest cannot see a good routine" và "Good work is quiet, and guests feel it".`,
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
        // Vòng hai, dựng trên thẻ a7 của chính bài. Đáp án xếp hạng GIỮA về độ
        // dài ký tự.
        game(
          "Which part do people forget most?",
          `Do not forget to ${lo(a7)}.`,
          `No forget ${lo(a7)}.`,
          "Everyone forgets something, and that is quite normal here.",
          "colleague",
          "Câu này đúng ngữ pháp nhưng biến việc quên thành chuyện thường; gọi đúng tên bước hay bị bỏ mới là cách chặn nó.",
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
          // A colleague's question, not a guest's: slot 9 is the department's
          // own name for its internal procedure ("Handover" at the front desk)
          // and no guest asks to be walked through a handover.
          "I am new here. Could you walk me through our routine?",
          // Ô steps 0-7 là TÁM bước, và chính tuần này dạy đủ tám ở cả sáu bộ
          // phận. "Four simple steps" nói sai số bước của chính quy trình
          // đang được kể — đồng nghiệp mới đếm theo là thiếu một nửa.
          `Of course. Our ${lo(a9)} has eight simple steps.`,
          "Mở đầu bằng tổng quan số bước, rồi mới kể chi tiết — người nghe dễ theo.",
          "colleague",
        ),
        sp(
          "Thank you, that is very clear.",
          `You are welcome. That is the whole routine.`,
          "Câu chốt gọn gàng sau khi trình bày xong.",
          "colleague",
        ),
        sp(
          "How many steps are there?",
          `Our ${lo(a9)} has eight steps.`,
          "Chủ ngữ số ít thì động từ có -s: has. Danh từ đếm được số nhiều: stepS.",
          "colleague",
        ),
        sp(
          "And after those eight steps — is anything still open?",
          `${Wt(a10)} needs attention.`,
          "Báo việc còn dở bằng một câu đủ, đừng nói trống không.",
          "colleague",
          undefined,
          `Our ${lo(a9)} has eight steps.`,
        ),
        sp(
          "Anything I tend to forget?",
          `Do not forget to ${lo(a7)}.`,
          "Nhắc việc bằng câu mệnh lệnh phủ định, ngắn và rõ.",
          "colleague",
        ),
        sp(
          "Could you run me through it?",
          `First we ${lo(a1)}, then we ${lo(a2)}.`,
          "Kể lại quy trình từ đầu là cách tự kiểm tra mình nhớ đủ.",
          "colleague",
        ),
      ],
      reading: read(
        // "The whole routine takes about ten minutes" in ra cho cả sáu bộ
        // phận, và ở spa quy trình ấy là một buổi trị liệu — không phải mười
        // phút. Mười phút là thời gian HỌC danh sách, và đó cũng đúng cảnh
        // của bài: một đồng nghiệp mới đang được dẫn qua quy trình.
        // Bỏ câu độn "learns the whole list in about ten minutes" — nó chỉ tồn
        // tại để đỡ một câu hỏi dò số, không mang nội dung nghiệp vụ nào. Câu
        // thay thế nói đúng lý do nghề của việc giữ nguyên trình tự.
        `A new colleague asks for the full picture. ${lx.staff} answers: "Our ${lo(a9)} has eight simple steps. ${Wt(a10)} needs attention at every step. That is the whole routine." Every new colleague follows the same eight steps in the same order. After one week, nobody needs the list. The steps stay the same on a busy day, because a busy day is when a skipped step costs the most.`,
        [
          {
            q: "Vì sao ngày đông khách vẫn giữ nguyên các bước?",
            options: [
              "Vì ngày đông khách chính là lúc một bước bị bỏ gây thiệt hại nhiều nhất",
              "Vì quản lý ca không có mặt ở sảnh để duyệt bất kỳ thay đổi nào trong ngày",
              "Vì khách quen đã biết trước các bước nên quy trình không thể rút ngắn được",
            ],
            correct: 0,
            explanation: `"a busy day is when a skipped step costs the most"`,
          },
          {
            q: "Vì sao sau một tuần không ai cần tới danh sách nữa?",
            options: [
              "Vì ai cũng đi đúng tám bước ấy theo đúng thứ tự, ngày nào cũng vậy",
              "Vì bản danh sách được dán sẵn lên tường nên không cần cầm theo bên mình",
              "Vì quản lý ca đọc lại danh sách cho cả nhóm vào đầu mỗi buổi sáng",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "Every new colleague follows the same eight steps in the same order" và "After one week, nobody needs the list".`,
          },
        ],
      ),
      game: [
        game(
          "I am new here. Is our routine complicated?",
          `It is simple. Our ${lo(a9)} has eight steps.`,
          `Not complicate. Eight step only.`,
          "It is quite difficult. Most new staff find it confusing.",
          "colleague",
          "Câu này đúng ngữ pháp nhưng làm đồng nghiệp mới sợ chính quy trình mình sắp làm.",
        ),
        // Vòng hai, dựng trên thẻ a10 của chính bài. Đáp án xếp hạng NGẮN nhất.
        game(
          "Is anything still waiting from this morning?",
          `${Wt(a10)} needs attention.`,
          `${Wt(a10)} need attention now.`,
          "Nothing is open, and I did not check the list.",
          "colleague",
          "Câu này đúng ngữ pháp và báo cáo một thứ chưa hề kiểm; ca sau nhận bàn giao sai là vì đúng những câu như vậy.",
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
          "Xin phép mời dùng 'May I offer you…?' — lịch sự hơn 'I give you'. Danh từ đếm được số ít cần A/AN đứng trước.",
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
          `Yes, ${wa(o1)} sounds good. Please go ahead.`,
          `Certainly. I will check and confirm right away.`,
          "Nhận lời rồi cam kết hành động ngay.",
          undefined,
          undefined,
          `Would you like ${wa(o1)}, madam?`,
        ),
        sp(
          // Was "Could I have one more?" — a guest who has already asked does
          // not need to be offered the thing they asked for.
          "This one is lovely, thank you.",
          `Would you like an extra one?`,
          "Mời thêm bằng câu hỏi đủ chủ ngữ và động từ; hỏi trống không nghe như ra lệnh.",
        ),
        // askedKey cũ là `add` — một từ nội dung. "to my booking" nâng key lên
        // `add booking`, và lượt ôn cùng nghĩa ở tuần 17 dùng ĐÚNG hai từ đó
        // bằng cách nói khác, nên hai lượt nhận đáp án của nhau.
        sp(
          "Is there anything else you can add to my booking?",
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
          "colleague",
        ),
        sp(
          "Do I need to fill this in?",
          "Yes, madam. Every detail must be accurate.",
          "Nói rõ vì sao phải đúng, khách sẽ khai cẩn thận hơn.",
        ),
      ],
      reading: read(
        // Câu chót cũ ("it arrives in ten minutes") chỉ tồn tại để đỡ một câu
        // hỏi dò số; bỏ đi, bài không mất gì về nghiệp vụ.
        `${lx.staff} sees a chance to help. "Would you like ${wa(o1)}, madam? We also have ${wa(o2)}." The guest smiles and says: "Yes, please." The guest chooses the first one. ${lx.staff} does not push the second one. The guest may still ask for it later, and ${lx.staff} notes the choice for the next shift.`,
        [
          {
            q: "Nhân viên mời khách dùng gì trước?",
            options: [o1.definition, o2.definition, "Không mời gì"],
            correct: 0,
            explanation: `"Would you like ${wa(o1)}?" là lời mời đầu tiên.`,
          },
          {
            q: "Vì sao nhân viên ghi lại lựa chọn của khách?",
            options: [
              "Vì khách vẫn có thể xin thứ còn lại sau, và ca sau cần biết khách đã chọn gì",
              "Vì quản lý yêu cầu ghi chép mọi câu nói của khách vào sổ trực ban mỗi ngày",
              "Vì khách sạn tính tiền theo số lần nhân viên mời khách trong suốt một buổi trực",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "The guest may still ask for it later" và "notes the choice for the next shift".`,
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
        // Vòng hai, dựng trên thẻ o2 của chính bài. Đáp án xếp hạng NGẮN nhất.
        game(
          "What else could you offer me today?",
          `We also have ${wa(o2)}.`,
          `We also have ${lo(o2)}, madam.`,
          "I am not sure what else we have, madam.",
          undefined,
          "Câu này đúng ngữ pháp nhưng để khách tự xoay; biết bộ phận mình còn gì để mời là phần việc của nhân viên.",
        ),
      ],
    }),

    lesson(lx, 16, 2, "Explaining What Is Included", "Giải thích những gì đã bao gồm", {
      vocabulary: [
        // Was "{o3} is very popular." — "The extra hanger is very popular."
        // praises a thing nobody chooses for its popularity. Asking for it is
        // what guests actually do, and it reads true for every slot 1-7 noun.
        bw(o3, `Many guests ask for ${wa(o3)}.`),
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
          `Is ${wt(o8)} extra?`,
          `No, sir. ${Wt(o8)} is free for our guests.`,
          "Trả lời rõ ràng về phí ngay từ đầu — tránh hiểu lầm khi thanh toán.",
        ),
        sp(
          `And besides ${wt(o8)}, what does the price include?`,
          `The price includes ${lo(o10)}, sir.`,
          "Liệt kê tối đa hai thứ trong một câu; nhiều hơn thì tách câu.",
          undefined,
          undefined,
          `No, sir. ${Wt(o8)} is free for our guests.`,
        ),
        sp(
          "Which one do most guests take?",
          `Many guests ask for ${wa(o3)}.`,
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
          "colleague",
        ),
        // askedKey cũ RỖNG (mọi từ đều là từ chức năng), nên lượt này không gom
        // cụm được với bất kỳ câu nào. "suggest today" cho nó hai từ nội dung.
        sp(
          "Is there anything more you could suggest today?",
          "May I offer you an extra choice?",
          "Mời thêm bằng câu hỏi, khách vẫn là người quyết.",
        ),
      ],
      reading: read(
        `A guest worries about the cost. ${lx.staff} explains: "${Wt(o8)} is free for our guests, sir. The price also includes ${lo(o10)}." The guest is pleased. The service charge stays on its own line. ${lx.staff} explains the cost before the guest asks, not after. A guest who knows the price early is rarely unhappy at the end.`,
        [
          {
            q: "Khách có phải trả thêm tiền không?",
            options: ["Không, đã miễn phí", "Có, khách phải trả thêm", "Chưa rõ, phải hỏi lại"],
            correct: 0,
            explanation: `"${Wt(o8)} is free for our guests" — miễn phí.`,
          },
          {
            q: "Vì sao nhân viên nói về giá trước khi khách kịp hỏi?",
            options: [
              "Vì khách biết giá sớm thì tới lúc thanh toán hiếm khi còn thấy khó chịu",
              "Vì quy định buộc nhân viên đọc bảng giá cho mọi khách ngay khi họ ngồi xuống",
              "Vì nói trước thì khách sẽ chọn thứ đắt hơn và bộ phận đạt doanh thu cao hơn",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "explains the cost before the guest asks, not after" và "A guest who knows the price early is rarely unhappy at the end".`,
          },
        ],
      ),
      game: [
        game(
          "Will this cost me anything extra?",
          `Not at all, sir. ${Wt(o8)} is free.`,
          "This no money, madam. All free, no charge you.",
          "Everything here is free, madam. No charge at all.",
          undefined,
          "Câu này hứa quá tay: chỉ phần vừa hỏi là miễn phí, không phải mọi thứ trong khách sạn.",
        ),
        // Vòng hai, dựng trên thẻ o10 của chính bài. Đáp án xếp hạng GIỮA.
        game(
          "Does the price cover everything?",
          `The price includes ${lo(o10)}, sir.`,
          `Price include ${lo(o10)}, sir.`,
          "I am not certain, sir. Please check the printed price list.",
          undefined,
          "Câu này đúng ngữ pháp nhưng đẩy khách đi đọc bảng giá; thứ đã tính trong giá là thứ nhân viên phải nói được thành lời.",
        ),
      ],
    }),

    lesson(lx, 16, 3, "Offering an Alternative", "Đề xuất phương án thay thế", {
      vocabulary: [
        bw(o4, `We could arrange ${wa(o4)} instead.`),
        bw(o5, `We can also offer ${wa(o5)}.`),
        // Thẻ từ đứng một mình, nên "That part is unlimited." không có tiền
        // ngữ: học viên đọc thẻ không biết "that part" là phần nào. Câu ví dụ
        // phải tự mang theo chỗ bấu víu của nó — ở đây là câu hỏi của khách.
        bw(o9, `You asked about that part, madam. It is ${lo(o9)}.`),
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
          `And apart from ${wt(o4)}, what else could work?`,
          `Perhaps you would prefer ${wa(o5)}, madam?`,
          "Dùng 'Perhaps' để gợi ý mà vẫn để khách toàn quyền quyết định.",
          undefined,
          undefined,
          `Not today, but we could offer ${wa(o4)}.`,
        ),
        sp(
          "Tell me about that part.",
          `That part is ${lo(o9)}.`,
          "Nói rõ tính chất của phần đó ngay từ đầu — mơ hồ về phí là nguồn phàn nàn lớn nhất.",
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
          "I am sorry, madam. Let me say that again slowly.",
          "Nhận phần khó nghe về mình, đừng đổ cho khách.",
        ),
      ],
      reading: read(
        // "After two minutes" là mốc độn duy nhất để đỡ một câu hỏi dò số. Thay
        // bằng việc nghề thật: ghi lựa chọn lên phiếu trước khi rời bàn.
        `The first choice is not available. ${lx.staff} says: "We do not have that today, but we could offer ${wa(o4)}. Perhaps you would prefer ${wa(o5)}?" The guest thinks for a moment. ${lx.staff} waits quietly and does not add a third idea, because a short list is easier to choose from. The guest chooses the second idea, and ${lx.staff} writes it down before leaving.`,
        [
          {
            q: "Nhân viên làm gì trong lúc khách suy nghĩ?",
            options: [
              "Chờ yên lặng, không thêm phương án thứ ba",
              "Nhắc lại cả hai phương án một lần nữa cho khách nghe",
              "Đề nghị thêm phương án thứ ba để khách dễ chọn hơn",
            ],
            correct: 0,
            explanation: '"waits quietly and does not add a third idea"',
          },
          {
            q: "Vì sao nhân viên chỉ đưa hai phương án chứ không nhiều hơn?",
            options: [
              "Vì danh sách ngắn thì dễ chọn, và khách đã chọn được ngay sau một nhịp nghĩ",
              "Vì bộ phận chỉ còn đúng hai thứ trong kho vào thời điểm khách hỏi hôm đó",
              "Vì quy định của khách sạn cấm nhân viên nêu quá hai lựa chọn cho cùng một khách",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "a short list is easier to choose from" và "The guest chooses the second idea".`,
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
        // Vòng hai, dựng trên thẻ o5 của chính bài. Đáp án xếp hạng DÀI nhất.
        game(
          "Then what would you suggest instead?",
          `Perhaps you would prefer ${wa(o5)}, madam?`,
          `Maybe you take ${lo(o5)}?`,
          `You must take ${wa(o5)} then, madam.`,
          undefined,
          // Kính ngữ ở CẢ hai phương án: nếu chỉ đáp án đúng mang "madam" thì
          // "bấm bong bóng lịch sự" thành một mẹo thắng mà không cần đọc
          // (cổng HONORIFIC_KEY_MAX của verify-content đếm đúng hình dạng này).
          "Câu này đúng ngữ pháp nhưng ra lệnh cho khách; 'Perhaps you would prefer…?' trả quyền chọn lại cho người trả tiền.",
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
          `Would that be suit for you?`,
        ),
      ],
      speaking: [
        // Lượt MỞ của bài. Câu cũ ("Yes, I think that would be nice.") mở bằng
        // một tham chiếu ngược không có lượt trước: khách đồng ý với thứ chưa
        // ai mời. Lượt ngay dưới mới là lượt đồng ý, và nó nối vào đây.
        sp(
          "Could you take care of that for me?",
          `Shall I arrange ${wa(o6)} for you now?`,
          "Chốt bằng câu xin phép — khách chỉ cần gật đầu là xong.",
        ),
        sp(
          `Yes, please go ahead with ${wt(o6)}.`,
          `Certainly. It will be ready shortly.`,
          "Xác nhận lại kèm mốc thời gian để khách yên tâm.",
          undefined,
          undefined,
          `Shall I arrange ${wa(o6)} for you now?`,
        ),
        // Slot 7 lost its only spoken line when the confirmation above stopped
        // naming it (it named the wrong offer). It gets one of its own.
        sp(
          "Is there anything else I could add before we finish?",
          `Would you like ${wa(o7)} as well?`,
          "Mời thêm một lựa chọn bằng as well ở cuối câu — gợi ý, không ép khách.",
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
          "colleague",
        ),
        sp(
          "Why is that so strict?",
          "It keeps every guest safe, madam. The rule is the same for all.",
          "Viện dẫn an toàn thì lời từ chối không còn là ý riêng của bạn.",
        ),
      ],
      reading: read(
        // Bài cũ có BA mốc số ("fifteen minutes", "the fifteen minutes",
        // "ten past four") và cả hai câu hỏi đều chỉ đòi dò một trong số đó.
        // Giữ đúng một mốc, và cho nó lý do nghề.
        `The guest agrees. ${lx.staff} confirms: "Shall I arrange ${wa(o6)} for you now?" The guest nods. "Certainly. It will be ready shortly, madam." ${lx.staff} writes the promised time on the order, because a promise nobody wrote down is a promise the next shift cannot keep. When the time comes, ${lx.staff} checks that everything is ready, so the guest never has to call.`,
        [
          {
            q: "Nhân viên ghi gì lên phiếu?",
            options: [
              "Mốc thời gian đã hứa với khách",
              "Tên và số điện thoại của khách",
              "Số phòng cùng chữ ký của khách",
            ],
            correct: 0,
            explanation: '"writes the promised time on the order"',
          },
          {
            q: "Vì sao khách không bao giờ phải gọi xuống hỏi?",
            options: [
              "Vì mốc hẹn được ghi lại, và tới giờ thì nhân viên tự kiểm tra trước",
              "Vì khách đã được phát một số máy nội bộ để gọi thẳng cho quản lý ca",
              "Vì khách sạn không nhận thêm cuộc gọi nào từ phòng sau khi lời mời đã chốt",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "writes the promised time on the order" và "checks that everything is ready, so the guest never has to call".`,
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
        // Vòng hai, dựng trên thẻ o7 của chính bài. Đáp án xếp hạng GIỮA.
        game(
          "Is my order complete now?",
          `${Wt(o7)} is ready for you, madam.`,
          `${Wt(o7)} ready now, madam.`,
          "Probably, madam. I have not actually checked it myself yet.",
          undefined,
          "Câu này đúng ngữ pháp nhưng xác nhận một thứ chưa ai kiểm; chốt lời mời là nói ra thứ đã thật sự sẵn sàng.",
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
          `And after my ${lo(d1)}, what else?`,
          `Thank you. And may I ask about your ${lo(d2)}?`,
          "Cảm ơn trước rồi mới hỏi tiếp — nhịp hỏi thông tin dễ chịu hơn nhiều.",
          undefined,
          undefined,
          `Could I have your ${lo(d1)}, please?`,
        ),
        sp(
          "Does it matter if it is not exact?",
          `The information must be accurate. A small mistake can spoil your stay.`,
          "'Must' cho quy định của khách sạn — sai một chữ có thể hỏng cả đơn.",
        ),
        sp(
          "Sorry, could you repeat that?",
          `Of course. Let me say it clearly.`,
          "Người nói lại là mình: Let me + động từ gốc, không bắt đồng nghiệp nhắc lại.",
          "colleague",
        ),
        // Cùng nghĩa với lượt tuần 16, nói bằng chữ khác nhưng CÙNG askedKey
        // (`add booking`), nên hai lượt nhận đáp án của nhau thay vì mỗi lượt
        // chỉ nhận đúng câu mẫu của mình.
        sp(
          "Could you add anything else to my booking?",
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
        `${lx.staff} needs some information. "Could I have your ${lo(d1)}, please? Thank you. And may I ask about your ${lo(d2)}?" The guest answers politely. The guest answers both questions. ${lx.staff} asks one question at a time, because two questions together can confuse a tired guest. Each answer goes on the form before the next question, so nothing has to be asked twice.`,
        [
          {
            q: "Nhân viên hỏi thông tin đầu tiên là gì?",
            options: [d1.definition, d2.definition, "Số phòng"],
            correct: 0,
            explanation: `"Could I have your ${lo(d1)}?" là câu hỏi đầu tiên.`,
          },
          {
            q: "Vì sao mỗi câu trả lời được ghi ngay trước khi hỏi câu tiếp theo?",
            options: [
              "Vì ghi ngay thì không phải hỏi lại khách lần thứ hai cùng một điều",
              "Vì mẫu khai bắt buộc phải điền theo đúng thứ tự dòng in sẵn trên giấy",
              "Vì khách chỉ được phép trả lời mỗi câu hỏi đúng một lần duy nhất",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "asks one question at a time" và "Each answer goes on the form before the next question, so nothing has to be asked twice".`,
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
        // Vòng hai, dựng trên thẻ d2 của chính bài. Đáp án xếp hạng DÀI nhất.
        game(
          "Anything else you must ask me?",
          `May I ask about your ${lo(d2)}, madam?`,
          `What your ${lo(d2)}?`,
          `Tell me your ${lo(d2)} now, madam.`,
          undefined,
          "Câu này đúng ngữ pháp nhưng ra lệnh; thông tin của khách thì phải xin, dù quầy có đông tới đâu.",
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
        // Lượt MỞ. Câu cũ ("Yes, that is what I said.") mở bài bằng một tham
        // chiếu ngược không có lượt trước — khách xác nhận một thứ chưa ai đọc.
        sp(
          "Could you check what I just gave you?",
          `Thank you. Let me read that back to you.`,
          "Đọc lại thông tin là bước bắt buộc — sai một chữ có thể hỏng cả đơn.",
        ),
        sp(
          "Actually, the part you read back is wrong.",
          `I am sorry. Please correct me.`,
          "Sai thì xin lỗi ngắn và mời khách sửa, đừng thanh minh.",
          undefined,
          undefined,
          `Thank you. Let me read that back to you.`,
        ),
        sp(
          // askedKey cũ `check` — một từ nội dung.
          "Is there anything else to check on the form?",
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
        `${lx.staff} repeats the information carefully. "Let me read that back to you. Please correct me if I am wrong." The ${lo(d9)} is almost right. One word was wrong, and the guest corrects it. ${lx.staff} thanks the guest and changes the record at once. Reading back takes one minute, but it can save a long problem later in the day.`,
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
            q: "Vì sao bước đọc lại đáng giá dù chỉ mất một phút?",
            options: [
              "Vì nó bắt được đúng một chữ sai, và chữ ấy sẽ thành sự cố vào cuối ngày",
              "Vì khách luôn muốn nghe lại toàn bộ đơn đặt trước khi rời khỏi quầy lễ tân",
              "Vì quy định buộc nhân viên đọc to mọi tờ phiếu cho quản lý ca cùng nghe",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "One word was wrong, and the guest corrects it" và "it can save a long problem later in the day".`,
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
        // Vòng hai, dựng trên thẻ d9 của chính bài. Đáp án xếp hạng NGẮN nhất.
        game(
          "Can I stop worrying about it now?",
          `The ${lo(d9)} is confirmed.`,
          `${Wt(d9)} confirm already, madam.`,
          "I think so, madam. Nobody has told me otherwise.",
          undefined,
          "Câu này đúng ngữ pháp nhưng xác nhận bằng sự im lặng của người khác; xác nhận là đã đọc lại và thấy đúng.",
        ),
      ],
    }),

    lesson(lx, 17, 3, "Spelling & Precision", "Đánh vần & độ chính xác", {
      vocabulary: [
        bw(d3, `Could I have your ${lo(d3)}?`),
        bw(d5, `And your ${lo(d5)}, please?`),
        bw(d8, `The ${lo(d8)} will help us prepare.`),
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
          "My name is hard to spell.",
          `Certainly. Could you spell it slowly, please?`,
          "Nhờ khách đánh vần chậm không hề bất lịch sự — sai tên mới bất lịch sự.",
        ),
        sp(
          "Why do you need all this?",
          `The ${lo(d8)} will help us prepare.`,
          "Giải thích lý do trước khi xin thêm thông tin.",
        ),
        sp(
          `And besides the ${lo(d8)}, what else do you need?`,
          `And your ${lo(d5)}, please?`,
          "Nối câu hỏi tiếp bằng And + danh từ + please.",
          undefined,
          undefined,
          `The ${lo(d8)} will help us prepare.`,
        ),
        sp(
          "Do many guests take that?",
          `Yes. Many guests ask for ${wa(po3)}.`,
          "Ôn tuần 16: gợi ý bằng cái nhiều người chọn.",
        ),
        sp(
          "What do most people take?",
          `Many guests ask for ${wa(qo3)}.`,
          "Ôn tuần 16: gợi ý bằng cái nhiều khách chọn.",
        ),
        sp(
          "What do you need from me?",
          `Could I have your ${lo(d3)}?`,
          "Xin từng mẩu thông tin một, đừng hỏi dồn.",
        ),
      ],
      reading: read(
        // "The name has six letters." và "spelled N-G-U-Y-E-N" là hai câu độn
        // dán vào để đỡ một câu hỏi đếm chữ cái. Bỏ cả hai.
        `The name is difficult. ${lx.staff} asks: "Could you spell that slowly, please?" Then: "Thank you. Let me read the ${lo(d8)} back to you." Nothing is wrong. ${lx.staff} asks for the spelling because many names sound alike. When a name is spelled slowly, it is written correctly the first time, and nobody has to call the guest back.`,
        [
          {
            q: "Sau khi đọc lại, có chỗ nào sai không?",
            options: ["Không có chỗ nào sai", "Sai một chữ", "Sai cả tên"],
            correct: 0,
            explanation: '"Nothing is wrong."',
          },
          {
            q: "Vì sao nhân viên xin khách đánh vần thay vì tự đoán?",
            options: [
              "Vì nhiều tên nghe giống nhau, và viết đúng ngay lần đầu thì khỏi phải gọi lại",
              "Vì khách sạn quy định mọi tên nước ngoài đều phải được đánh vần lại hai lần",
              "Vì nhân viên chưa được học cách phát âm những cái tên khó của khách nước ngoài",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "many names sound alike" và "it is written correctly the first time, and nobody has to call the guest back".`,
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
        // Vòng hai, dựng trên thẻ d8 của chính bài. Đáp án xếp hạng DÀI nhất.
        game(
          "Does it help you to know that?",
          `The ${lo(d8)} will help us prepare, madam.`,
          `${Wt(d8)} help us prepare.`,
          "It is just for our records, madam.",
          undefined,
          "Câu này đúng ngữ pháp nhưng gạt câu hỏi của khách sang một bên; nói ra lý do thì khách khai kỹ hơn hẳn.",
        ),
      ],
    }),

    lesson(lx, 17, 4, "Recording the Details", "Ghi lại thông tin", {
      vocabulary: [
        bw(d4, `Could I have your ${lo(d4)}?`),
        bw(d10, `I will add that to the ${lo(d10)}.`),
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
          "And what you are writing down — where does it go?",
          `I will add that to the ${lo(d10)}.`,
          "Ghi lại giúp khách, không bắt khách nhắc lại lần thứ hai.",
          undefined,
          undefined,
          `Thank you. I am writing it down now.`,
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
        `The last detail is needed. ${lx.staff} says: "Just your ${lo(d4)}, and that is everything." The guest gives it. "Thank you. I am writing it down now." This is the last question on the form. When the form is complete, ${lx.staff} checks every line again. The guest does not wait long, because the form asks only what the team really needs.`,
        [
          {
            q: "Nhân viên làm gì ngay sau khi khách trả lời?",
            options: ["Ghi lại ngay", "Đi hỏi bếp", "Đọc lại thực đơn"],
            correct: 0,
            explanation: '"I am writing it down now."',
          },
          {
            q: "Vì sao khách không phải ngồi chờ lâu?",
            options: [
              "Vì tờ khai chỉ hỏi đúng những gì bộ phận cần, không hỏi cho đủ giấy",
              "Vì nhân viên bỏ qua vài dòng trên tờ khai để khách được về phòng sớm",
              "Vì khách đã điền sẵn phần lớn tờ khai từ trước khi tới quầy lễ tân",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "This is the last question on the form" và "the form asks only what the team really needs".`,
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
        // Vòng hai, dựng trên thẻ d10 của chính bài. Đáp án xếp hạng NGẮN nhất.
        game(
          "Will I have to repeat this next time?",
          `I will add that to the ${lo(d10)}.`,
          `I will adding that to the ${lo(d10)}.`,
          "No need, madam. I will remember it myself.",
          undefined,
          "Câu này đúng ngữ pháp và thay hồ sơ bằng trí nhớ; ca sau không đọc được trí nhớ của bạn.",
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
  const [, ra2, ra3, , , ra6, , ra8] = lx.bank.steps;
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
          `One moment, please. Your request are ${lo(p9)}.`,
        ),
      ],
      speaking: [
        sp(
          "How long will the paperwork take?",
          `Just a moment. I am preparing your ${lo(p1)}.`,
          "Khung vàng: nói rõ mình ĐANG làm gì, khách sẽ không sốt ruột.",
        ),
        sp(
          `And while you prepare the ${lo(p1)}, how is my request?`,
          `Your request is ${lo(p9)}, madam.`,
          "Trả lời đúng trạng thái hiện tại; 'không có vấn đề gì' không phải là một câu trả lời.",
          undefined,
          undefined,
          `Just a moment. I am preparing your ${lo(p1)}.`,
        ),
        // Was "When will the card be made?" → "We issue the card today." —
        // rendered for all six departments, which put a member card in a
        // waiter's hands and an unnamed card in everyone else's. Every
        // department in this week genuinely produces a guest copy of its own
        // paperwork, so the copy is what the frame now promises.
        sp(
          "When will my copy be ready?",
          `Your copy will be ready in a moment.`,
          "Tương lai với will be ready: nói rõ bao giờ xong, không hứa chung chung.",
        ),
        sp(
          "Is the paper ready yet?",
          `The document is ready.`,
          "Câu trạng thái ngắn, đủ chủ ngữ và động từ to be.",
        ),
        // "Issue" is this lesson's first card, and no turn in any department
        // ever said it.
        sp(
          "Is something wrong with my form?",
          `There is a small issue, madam. I will check it now.`,
          "Báo có vấn đề bằng There is + a small issue, rồi nói ngay việc mình làm.",
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
          `First I ${lo(ra2)}, then I ${lo(ra3)}.`,
          "Ôn tuần 15: nối hai bước bằng then, mỗi câu một bước.",
          "colleague",
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
        // "The guest waits at the desk." in ra y hệt ở cả sáu bộ phận. Buồng
        // phòng và spa không có quầy để khách đứng chờ — buồng phòng trao đồ
        // ở CỬA PHÒNG. Câu mở bài không cần nói chỗ nào cả.
        // Ba mốc số độn ("two more minutes", "a meeting at eight", "twenty past
        // seven") chỉ để đỡ một câu hỏi dò số. Giữ nguyên lý do nghề, bỏ số.
        `The guest is waiting. ${lx.staff} says: "Just a moment, sir. I am preparing your ${lo(p1)}. Your request is ${lo(p9)} now." The guest waits calmly. ${lx.staff} tells the guest how long it will take, because waiting without a time feels longer. When the paper is ready, ${lx.staff} checks it once before handing it over.`,
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
            q: "Vì sao khách chờ mà vẫn bình tĩnh?",
            options: [
              "Vì nhân viên nói rõ mình đang làm gì và việc đó còn bao lâu nữa",
              "Vì khách đã quen phải chờ mỗi lần làm giấy tờ ở khách sạn này",
              "Vì nhân viên mời khách ngồi xuống và rót sẵn cho khách một ly nước mát",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "I am preparing your ${lo(p1)}" và "tells the guest how long it will take, because waiting without a time feels longer".`,
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
        // Vòng hai, dựng trên thẻ p9 của chính bài. Đáp án xếp hạng GIỮA.
        game(
          "Where does my request stand now?",
          `Your request is ${lo(p9)}, madam.`,
          `Your request ${lo(p9)} now.`,
          "There is no problem at all, madam. Please relax.",
          undefined,
          "Câu này đúng ngữ pháp nhưng trấn an thay vì trả lời; khách hỏi trạng thái thì phải nghe được trạng thái.",
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
          "And before I sign on that line — is everything right?",
          `Let me check. Is the ${lo(p3)} correct?`,
          "Xác nhận lại thông tin trên giấy tờ trước khi khách ký.",
          undefined,
          undefined,
          `You need to sign here, on this line.`,
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
          // Ô này hỏi ngược khách bằng chính tên ô ghi trên phiếu — với F&B
          // nó ra "May I ask about your ice preference?", một câu điền form
          // chứ không phải câu người phục vụ nói. Ghi lại thứ khách vừa dặn
          // mới là việc của tuần 17, và khung mới đúng cho cả sáu bộ phận.
          // Mẫu "May I ask about …" vẫn được giữ ở ô ngay bên dưới.
          "Please remember that for me.",
          `Let me add your ${lo(pd2)} to the file.`,
          "Ôn tuần 17: khách dặn gì thì ghi vào hồ sơ ngay, đừng bắt khách nhắc lại lần hai.",
        ),
        sp(
          "Go ahead, ask me.",
          `May I ask about your ${lo(qd2)}?`,
          "Ôn tuần 17: May I ask about cho thông tin tế nhị.",
        ),
        sp(
          "Could I have one more?",
          "Of course. I will bring you an extra one.",
          "Nhận lời trước, rồi nói rõ việc mình sẽ làm — khách đã xin thì đừng mời lại.",
        ),
        sp(
          "What do you need from me now?",
          `May I have your ${lo(p2)}?`,
          "Xin đúng một thứ mỗi lần, khách khỏi rối.",
        ),
      ],
      reading: read(
        `${lx.staff} hands over the form. "You need to sign here, please. Is the ${lo(p3)} correct?" The guest checks and signs the paper. Before the guest signs, ${lx.staff} checks the details on the form. When a detail is wrong, a signature does not make it right, so the check always comes first. The guest finds one mistake in the date and fixes it before signing.`,
        [
          {
            q: "Khách sửa lỗi gì trước khi ký?",
            options: ["Ngày tháng", "Tên khách", "Số tiền"],
            correct: 0,
            explanation: '"The guest finds one mistake in the date"',
          },
          {
            q: "Vì sao lỗi ngày tháng được phát hiện kịp?",
            options: [
              "Vì nhân viên soát lại từng dòng trước khi mời khách đặt bút ký",
              "Vì khách đọc kỹ toàn bộ tờ giấy trước khi bước tới quầy lễ tân",
              "Vì phần mềm tự báo lỗi ngày tháng ngay khi nhân viên nhập vào máy",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "Before the guest signs, ${lx.staff} checks the details on the form" và "The guest finds one mistake in the date".`,
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
        // Vòng hai, dựng trên thẻ p3 của chính bài. Đáp án xếp hạng GIỮA.
        game(
          "Shall I just sign it now?",
          `One moment, sir. Is the ${lo(p3)} correct?`,
          `This ${lo(p3)} right, sir?`,
          "Of course, sir. Sign at the bottom and we are done.",
          undefined,
          "Câu này đúng ngữ pháp và bỏ đúng bước bài này dạy: chữ ký không làm cho một dòng sai thành đúng.",
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
          `And besides the ${lo(p5)}, is there anything I can do?`,
          `Yes, madam. You can ${lo(p8)} at any time.`,
          "Chỉ cho khách việc họ tự làm được bằng You can + động từ.",
          undefined,
          undefined,
          `A ten percent ${lo(p5)} is added, madam.`,
        ),
        sp(
          // askedKey cũ `added` — một từ nội dung.
          "Is there anything added to my final bill?",
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
          "Is everything on the form confirmed?",
          `The ${lo(qd9)} is confirmed.`,
          "Ôn tuần 17: chốt lại bằng một câu ngắn.",
        ),
        sp(
          "What else do you need from me?",
          `Could I have your ${lo(qd4)}?`,
          "Ôn tuần 17: gom câu hỏi cuối vào một lần cho gọn.",
        ),
        sp(
          "What do you always do carefully?",
          `I always ${lo(ra6)} with care.`,
          "Ôn tuần 15: always đứng trước động từ chính.",
          "colleague",
        ),
        sp(
          "I did not hear you.",
          "I am sorry, sir. Let me say that again slowly.",
          "Người nói lại là bạn, không phải khách.",
        ),
      ],
      reading: read(
        `The guest asks about an extra line on the bill. ${lx.staff} explains: "A ten percent ${lo(p5)} is added, sir. You can ${lo(p8)} whenever you are ready." ${lx.staff} points to the line on the paper, because numbers are easier to see than to hear. The guest reads the total, nods, and has no more questions.`,
        [
          {
            q: "Khoản thêm trên hóa đơn là gì?",
            options: [p5.definition, "Tiền phòng một đêm", "Tiền phạt trả muộn"],
            correct: 0,
            explanation: `"A ten percent ${lo(p5)} is added."`,
          },
          {
            q: "Vì sao nhân viên chỉ tay vào dòng đó trên tờ giấy?",
            options: [
              "Vì con số nhìn thì dễ hiểu hơn nghe, nên khách đọc xong là hết thắc mắc",
              "Vì khách sạn bắt buộc nhân viên phải chỉ vào từng dòng của mọi hoá đơn",
              "Vì nhân viên chưa đọc được con số đó nên muốn chính khách tự đọc giúp mình",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "numbers are easier to see than to hear" và "The guest reads the total, nods, and has no more questions".`,
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
        // Vòng hai, dựng trên thẻ p6 của chính bài. Đáp án xếp hạng DÀI nhất.
        game(
          "How do you want me to pay?",
          `Which ${lo(p6)} would you prefer, sir?`,
          `You want which ${lo(p6)}?`,
          "Cash, sir. That is easier for us.",
          undefined,
          "Câu này đúng ngữ pháp nhưng chọn thay khách, và chọn theo cái tiện cho khách sạn.",
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
          `And the ${lo(p7)} — do you keep the original?`,
          `Yes. We keep one copy and you keep one.`,
          "Giải thích rõ ai giữ bản nào để khách không lo lắng về giấy tờ.",
          undefined,
          undefined,
          `Of course. Here is your ${lo(p7)}, sir.`,
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
          `Next I ${lo(ra8)}.`,
          "Ôn tuần 15: gọi tên bước tiếp theo bằng Next.",
          "colleague",
        ),
        sp(
          "Do I have to do that?",
          "Yes, madam. That is a safety rule here.",
          "Trả lời thẳng rồi nêu nguồn của quy định.",
        ),
      ],
      reading: read(
        `The paperwork is finished. ${lx.staff} says: "Here is your ${lo(p7)}, madam. We keep one copy and you keep one. The ${lo(p4)} is on file." ${lx.staff} puts the hotel copy in the file before the next guest comes. When a question comes up next month, the answer is already in the file. The hotel keeps its copy for five years.`,
        [
          {
            q: "Khách nhận được gì?",
            options: [p7.definition, "Không nhận gì", "Toàn bộ hồ sơ"],
            correct: 0,
            explanation: `"Here is your ${lo(p7)}."`,
          },
          {
            q: "Vì sao bản lưu được xếp vào hồ sơ ngay trước khi khách sau tới?",
            options: [
              "Vì tháng sau có ai hỏi lại thì câu trả lời đã nằm sẵn trong hồ sơ",
              "Vì khách sau sẽ nhìn thấy giấy tờ của khách trước nếu để trên mặt quầy",
              "Vì mỗi ca chỉ được phép mở tủ hồ sơ đúng một lần vào cuối buổi làm",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "puts the hotel copy in the file before the next guest comes" và "the answer is already in the file".`,
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
        // Vòng hai, dựng trên thẻ p4 của chính bài. Đáp án xếp hạng NGẮN nhất.
        game(
          "Will anyone still have this next month?",
          `The ${lo(p4)} is on file.`,
          `${Wt(p4)} on file already, madam.`,
          "I am not sure, madam. Ask at the desk next month.",
          undefined,
          "Câu này đúng ngữ pháp và đẩy khách đi hỏi người khác; hồ sơ lưu ở đâu là thứ người vừa trao giấy phải biết.",
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
          `I am sorry, sir, but you must wear it here.`,
          "Sau 'must' là động từ nguyên mẫu KHÔNG có 'to': must WEAR, không phải 'must to wear'.",
          `I am sorry, sir, but you must wearing it here.`,
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
        // The lesson is titled "You Must / You Must Not" and none of its
        // nine turns said "must". Two rules every department enforces.
        sp(
          "Can I smoke in here?",
          `I am sorry, sir. You must not smoke inside the hotel.`,
          "Must not + động từ gốc cho điều cấm tuyệt đối: must not SMOKE — không có to ở giữa.",
        ),
        sp(
          "Can my son stay here on his own?",
          `I am sorry, madam. Children must stay with an adult.`,
          "Must + động từ gốc cho điều bắt buộc: must STAY. Nói quy định, không trách khách.",
        ),
        sp(
          "And why must children stay with an adult?",
          `It is a hotel ${lo(r10)}, for everyone's safety.`,
          "Luôn kèm lý do — khách chấp nhận quy định dễ hơn nhiều khi hiểu vì sao.",
          undefined,
          undefined,
          `I am sorry, madam. Children must stay with an adult.`,
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
          "Ôn tuần 18: almost ready — báo gần xong kèm tên giấy tờ.",
        ),
        // Was "How should I settle this?" — slot 6 is a choice the guest
        // makes, and only some departments' choice is a way of paying.
        sp(
          "Can I choose how to do this?",
          `Of course. Which ${lo(pp6)} would you prefer?`,
          "Ôn tuần 18: trao lựa chọn cho khách bằng Which + danh từ + would you prefer.",
        ),
        sp(
          "Can you just let me do it?",
          "I cannot decide that alone. I will call my supervisor.",
          "Không quyết một mình việc vượt quyền — đó là cách tự bảo vệ mình.",
        ),
      ],
      reading: read(
        `A guest asks about a restriction. ${lx.staff} answers: "I am afraid that is not allowed, madam. It is a hotel ${lo(r10)}, for everyone's safety." The rule is the same for every guest. If the guest is unhappy, ${lx.staff} stays polite and explains the reason again. ${lx.staff} does not change the rule for one guest, so the rule stays fair for everybody. The guest asks again the next day, and the answer is the same.`,
        [
          {
            q: "Khách hỏi lại vào lúc nào?",
            options: ["Ngày hôm sau", "Ngay tối hôm đó", "Một tuần sau"],
            correct: 0,
            explanation: '"The guest asks again the next day"',
          },
          {
            q: "Vì sao câu trả lời hôm sau vẫn y như hôm trước?",
            options: [
              "Vì nội quy áp dụng như nhau với mọi khách, đổi cho một người là mất công bằng",
              "Vì hôm sau vẫn đúng nhân viên đó trực và không ai khác được phép trả lời",
              "Vì quản lý ca vẫn chưa kịp xem xét đề nghị mà khách đưa ra từ hôm trước đó",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "The rule is the same for every guest" và "does not change the rule for one guest, so the rule stays fair for everybody".`,
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
        // Vòng hai, dựng trên thẻ r1 của chính bài. Đáp án xếp hạng GIỮA.
        game(
          "What should I be careful about here?",
          `Please respect the ${lo(r1)}, madam.`,
          `You respect ${lo(r1)}.`,
          "Nothing special, madam. Just use your common sense.",
          undefined,
          "Câu này đúng ngữ pháp nhưng không gọi tên nội quy nào; khách không đoán được thứ chưa ai nói ra.",
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
          `That is the ${lo(r4)}, madam. Only staff may use it.`,
          "Nói rõ thiết bị nào chỉ nhân viên được dùng — đó mới là cảnh báo an toàn.",
        ),
        sp(
          `And the ${lo(r4)} — I did not know about that.`,
          `May I remind you of the ${lo(r9)}, madam?`,
          "Nhắc quy định bằng câu xin phép, không bằng giọng dạy dỗ.",
          undefined,
          undefined,
          `That is the ${lo(r4)}, madam. Only staff may use it.`,
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
          `May I have your ${lo(pp2)}, please?`,
          "Ôn tuần 18: xin giấy tờ của khách.",
        ),
        sp(
          "Do I keep anything?",
          `Here is your ${lo(pp7)}.`,
          "Ôn tuần 18: trao giấy tờ kèm một câu ngắn.",
        ),
        sp(
          "What do I do on this line?",
          `Please ${lo(pp10)} on this line.`,
          "Ôn tuần 18: chỉ chỗ ký bằng một câu mệnh lệnh lịch sự.",
        ),
      ],
      reading: read(
        // Câu cuối trước đây định vị cảnh này "near the lobby" ở CẢ SÁU bộ
        // phận, trong khi thiết bị của ô r4/r5 là bếp ga và bếp hâm nóng (nhà
        // hàng — tuần 15 đặt live station ở GIỮA phòng ăn), đá nóng (phòng trị
        // liệu) và tủ máy chủ (văn phòng). Bỏ chỗ, giữ giờ — câu hỏi thứ hai
        // của bài hỏi đúng cái giờ đó.
        // Mốc giờ độn cuối cùng của bài ("at about eight in the evening") tồn
        // tại đúng để đỡ một câu hỏi dò số; bỏ nốt.
        `${lx.staff} points to the equipment. "That is the ${lo(r4)}, sir. Please do not touch the ${lo(r5)}." The guest thanks ${lx.staff} for the warning. The guest steps back and says thank you. ${lx.staff} gives the warning calmly and does not shout. A calm warning is easier to follow, so most guests listen at once and nobody feels embarrassed. Afterwards, the supervisor thanks the staff member for the calm warning.`,
        [
          {
            q: "Khách được dặn không chạm vào gì?",
            options: [r5.definition, r4.definition, "Cửa ra vào"],
            correct: 0,
            explanation: `"Please do not touch the ${lo(r5)}."`,
          },
          {
            q: "Vì sao khách lùi lại ngay mà không thấy khó chịu?",
            options: [
              "Vì lời cảnh báo được nói bình tĩnh, nên khách nghe theo mà không mất mặt",
              "Vì khách vốn đã biết thiết bị đó nguy hiểm từ trước khi bước vào phòng",
              "Vì nhân viên nói thật to để mọi người xung quanh cùng nghe thấy lời nhắc ấy",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "gives the warning calmly and does not shout" và "most guests listen at once and nobody feels embarrassed".`,
          },
        ],
      ),
      game: [
        game(
          "Can I have a look at that equipment?",
          // Was "It is for emergencies." — true of a fire alarm, false of the
          // hot plate at a buffet, and this round renders for both.
          "Please do not touch it, sir. It is for staff only.",
          "Careful, madam! Danger there, no touch that!",
          "Of course, madam. Please take a closer look at it.",
          undefined,
          "Câu này lịch sự và sai: thiết bị của khách sạn không phải để khách xem thử — nói rõ chỉ nhân viên được dùng.",
        ),
        // Vòng hai, dựng trên thẻ r9 của chính bài. Đáp án xếp hạng DÀI nhất.
        game(
          "Is there a rule about this?",
          `May I remind you of the ${lo(r9)}, madam?`,
          `I remind you the ${lo(r9)}.`,
          "You should have read the sign, madam.",
          undefined,
          "Câu này đúng ngữ pháp nhưng đổ lỗi cho khách; nhắc quy định là xin phép nhắc, không phải chỉ ra cái sai của người trả tiền.",
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
          `And if I do not want to walk to the ${lo(r3)}?`,
          `I am afraid our ${lo(r2)} does not allow that.`,
          "Viện dẫn quy định thay vì ý kiến cá nhân, khách sẽ không tranh luận với bạn.",
          undefined,
          undefined,
          `The ${lo(r3)} is outside, near the garden.`,
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
          `When can I ${lo(pp8)}?`,
          `You can ${lo(pp8)} whenever you are ready.`,
          "Ôn tuần 18: can để nói khách được phép.",
        ),
      ],
      reading: read(
        `A guest asks about the rules. ${lx.staff} explains: "The ${lo(r3)} is outside, near the garden. Our ${lo(r2)} does not allow that, madam." ${lx.staff} gives the reason together with the rule, so the guest does not feel blamed. If the guest cannot find the place, ${lx.staff} draws a small map. The map shows the garden path on the left, past the fountain.`,
        [
          {
            q: "Khu vực hút thuốc ở đâu?",
            options: ["Bên ngoài, gần vườn", "Trong phòng của khách", "Ở sảnh chính khách sạn"],
            correct: 0,
            explanation: `"The ${lo(r3)} is outside, near the garden."`,
          },
          {
            q: "Ngoài việc nói quy định, nhân viên còn làm gì cho khách?",
            options: [
              "Nói kèm lý do, và vẽ một bản đồ nhỏ nếu khách chưa tìm ra chỗ",
              "Dẫn khách đi bộ ra tận nơi rồi mới quay lại quầy trực của mình",
              "Gọi điện cho bảo vệ ra đón khách ngay ở cửa sảnh chính khách sạn",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "gives the reason together with the rule" và "If the guest cannot find the place, ${lx.staff} draws a small map".`,
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
        // Vòng hai, dựng trên thẻ r7 của chính bài. Đáp án xếp hạng NGẮN nhất.
        game(
          "There are two of them here.",
          `Please use the ${lo(r7)}.`,
          `You use ${lo(r7)}, sir, please.`,
          "Either one is fine, sir. Whichever you prefer.",
          undefined,
          "Câu này đúng ngữ pháp nhưng trả câu hỏi lại cho khách; chỉ đúng MỘT thứ mới là chỉ đường.",
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
          "And if there is a fire, do I run back for the box?",
          `If there is a fire, please use the exit.`,
          "Hướng dẫn khẩn cấp phải ngắn, rõ, dễ nhớ.",
          undefined,
          undefined,
          `Please keep your ${lo(r6)} in the safety box.`,
        ),
        sp(
          "Where can I put this?",
          `Please keep your ${lo(r6)} safe.`,
          "Nhắc giữ đồ giá trị — nói trước còn hơn xử lý mất mát sau.",
        ),
        sp(
          "Could you make an exception?",
          `I am afraid that is ${lo(r8)}. May I ask my manager?`,
          "Từ chối kèm 'I am afraid', rồi mở lối lên quản lý — ngoại lệ không phải việc mình tự quyết.",
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
          "Ôn tuần 18: báo trạng thái bằng is + một từ chỉ tình trạng.",
        ),
        sp(
          "Anything on offer today?",
          `Would you like ${wa(ro6)} today, sir?`,
          "Ôn tuần 16: mời bằng Would you like, không khẳng định trước là còn.",
        ),
        sp(
          "The guest wants me to break the rule.",
          "Do not decide alone. Call the supervisor first.",
          "Nhắc đồng nghiệp bằng hai câu ngắn, trước khi họ lỡ tay.",
          "colleague",
        ),
      ],
      reading: read(
        `${lx.staff} gives safety advice. "Please keep your ${lo(r6)} in the safety box. If there is a fire, please use the exit near the stairs." The exit is near the stairs, not the lift. In a fire, a lift can stop between floors, so the stairs are safer. ${lx.staff} gives this advice when the guest arrives, not in the middle of the night. The safety box is inside the wardrobe, and only the guest knows its code.`,
        [
          {
            q: "Khách nên cất đồ giá trị ở đâu?",
            options: ["Trong két an toàn", "Trên bàn trong phòng", "Trong va li của khách"],
            correct: 0,
            explanation: `"Please keep your ${lo(r6)} in the safety box."`,
          },
          {
            q: "Vì sao lời dặn an toàn được nói ngay lúc khách nhận phòng?",
            options: [
              "Vì nửa đêm mới nghe hướng dẫn thì đã muộn, và thang máy còn có thể kẹt",
              "Vì khách chỉ được gặp nhân viên lễ tân đúng một lần trong cả kỳ nghỉ này",
              "Vì quy định buộc đọc bản nội quy phòng cháy trước khi trao chìa khoá phòng",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "a lift can stop between floors, so the stairs are safer" và "gives this advice when the guest arrives, not in the middle of the night".`,
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
        // Vòng hai, dựng trên thẻ r8 của chính bài. Đáp án xếp hạng DÀI nhất.
        game(
          "Surely you can make one exception?",
          `I am afraid that is ${lo(r8)}. May I ask my manager?`,
          `That is ${lo(r8)}, so no can do.`,
          "Just this once, madam. I will not tell anyone.",
          undefined,
          "Câu này đúng ngữ pháp và biến một quy định thành bí mật giữa hai người; ngoại lệ chỉ quản lý mới cho được.",
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
          `So the ${lo(c1)} and the ${lo(c2)} are both fine?`,
          `Both are excellent choices, sir.`,
          "Khen cả hai lựa chọn để khách không thấy mình vừa chọn sai.",
          undefined,
          undefined,
          `Would you prefer the ${lo(c1)} or the ${lo(c2)}?`,
        ),
        sp(
          "Are there rules about that?",
          `We keep to the ${lo(pr1)} here too.`,
          "Ôn tuần 19: viện dẫn quy định của khách sạn, không phải ý mình.",
        ),
        sp(
          `Can I use the ${lo(pr5)}?`,
          `Only staff may use the ${lo(pr5)}, madam.`,
          "Ôn tuần 19: nói rõ thiết bị nào chỉ nhân viên được dùng.",
        ),
        sp(
          "I did not know about that.",
          `May I remind you of the ${lo(pr9)}?`,
          "Ôn tuần 19: nhắc quy định bằng câu hỏi, không bằng lời trách.",
        ),
        sp(
          "What do you need from me?",
          // Câu này TỪNG in ra đúng từng chữ câu mẫu của tuần 17 (`17_1 sp[0]`).
          // buildOral lập chỉ mục chuỗi hội thoại theo CHUỖI TUYỆT ĐỐI và bản
          // đồ target→chỉ số lấy bản XUẤT HIỆN SAU CÙNG, nên lượt thứ hai của
          // cặp tuần 17 bị nối vào bản sao ở tuần 20 này — một chuỗi vắt qua ba
          // tuần. Thêm kính ngữ là đủ để hai câu tách nhau, và nhãn "Ôn tuần 17"
          // vẫn đúng vì khung 'Could I have' không đổi.
          `Could I have your ${lo(rd1)}, sir?`,
          "Ôn tuần 17: xin thông tin bằng Could I have.",
        ),
        sp(
          "Is this the right form?",
          "Yes, madam. Please check every detail is accurate.",
          "Mời khách tự soát một lượt trước khi ký.",
        ),
      ],
      reading: read(
        `The guest hesitates. ${lx.staff} helps: "Would you prefer ${wt(c1)} or ${wt(c2)}, madam? Both are excellent choices." The guest picks one quickly. If a guest cannot decide, ${lx.staff} describes each one again in one short sentence. ${lx.staff} does not choose for the guest, because the guest knows best what they like.`,
        [
          {
            q: "Nhân viên đánh giá hai lựa chọn thế nào?",
            options: ["Cả hai đều rất tốt", "Một cái tốt hơn hẳn", "Không nói gì về chúng"],
            correct: 0,
            explanation: '"Both are excellent choices."',
          },
          {
            q: "Nếu khách vẫn chưa quyết được thì nhân viên làm gì?",
            options: [
              "Tả lại từng thứ bằng một câu ngắn, nhưng vẫn không chọn thay khách",
              "Chọn giúp khách thứ mà nhiều người khác đã chọn trong tuần vừa rồi",
              "Đưa thêm vài lựa chọn nữa để khách có thật nhiều đường mà cân nhắc thêm",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "describes each one again in one short sentence" và "does not choose for the guest, because the guest knows best what they like".`,
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
        // Vòng hai, dựng trên thẻ c2 của chính bài. Đáp án xếp hạng GIỮA.
        game(
          "Is the other one any good?",
          `Or perhaps the ${lo(c2)}, madam?`,
          `Or maybe ${lo(c2)} more?`,
          "Both are the same, madam. It does not matter.",
          undefined,
          "Câu này đúng ngữ pháp nhưng xoá mất khác biệt giữa hai lựa chọn; khách hỏi chính vì chúng khác nhau.",
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
        // "X is worth considering." là giọng văn phòng, không phải giọng sàn
        // phục vụ — "Chef's choice is worth considering." nghe như một biên
        // bản họp. Gợi ý thật thì mở bằng lời xin phép, và tuần này đã dạy
        // "I would suggest…" ở ngay ô ngữ pháp bên trên.
        bw(c9, `May I suggest ${wt(c9)}?`),
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
          `Because is very popular with our guests.`,
        ),
      ],
      speaking: [
        sp(
          "What would you recommend?",
          `I would suggest the ${lo(c10)}, because it is popular.`,
          "Khuyên phải kèm lý do — lời khuyên không lý do nghe như bán hàng.",
        ),
        sp(
          `And why the ${lo(c10)} in particular?`,
          `Many of our guests enjoy it, madam.`,
          "Nêu lý do bằng trải nghiệm của khách khác, không khen chung chung.",
          undefined,
          undefined,
          `I would suggest the ${lo(c10)}, because it is popular.`,
        ),
        sp(
          "Which is the popular one?",
          `${Wt(c10)} is very popular.`,
          "Gợi ý bằng cái nhiều người chọn.",
        ),
        sp(
          "Would that suit me?",
          `The ${lo(c8)} is a good match.`,
          // Tip cũ đòi câu mẫu phải kèm lý do, còn câu mẫu thì không có lý do
          // nào — lý do là việc của lời khuyên ở ô đầu bài, chỗ này chỉ trả
          // lời đúng câu khách vừa hỏi.
          "Khách hỏi hợp hay không thì trả lời bằng một câu khẳng định ngắn.",
        ),
        sp(
          "What is the policy here?",
          `We follow the ${lo(pr2)} closely.`,
          "Ôn tuần 19: mở đầu ngắn rồi mới vào chi tiết.",
        ),
        sp(
          "Where should I leave this?",
          `Please keep your ${lo(pr6)} with you, madam.`,
          "Ôn tuần 19: nhắc giữ đồ mà không doạ khách.",
        ),
        sp(
          "Ask me anything you need.",
          `May I ask about your ${lo(rd3)}?`,
          "Ôn tuần 17: hỏi thông tin tế nhị bằng May I ask about.",
        ),
        sp(
          "Is there another idea?",
          `May I suggest ${wt(c9)}?`,
          "Đưa thêm một hướng bằng lời xin phép, thay vì lặp lại hướng cũ.",
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
        `The guest wants advice. ${lx.staff} says: "I would suggest the ${lo(c10)}, because it is very popular with our guests. It would suit you nicely." Most guests choose the same one. ${lx.staff} gives one clear reason, not five. If the guest asks for more details, ${lx.staff} answers honestly, even when the honest answer is not the popular one.`,
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
            q: "Nếu sự thật không ủng hộ thứ đang được ưa chuộng thì sao?",
            options: [
              "Nhân viên vẫn trả lời thật, dù câu trả lời không nghiêng về thứ đó",
              "Nhân viên vẫn giữ nguyên lời gợi ý ban đầu để khách khỏi phân vân",
              "Nhân viên đưa ra thêm vài lý do khác nữa cho tới khi khách thấy xuôi tai",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "gives one clear reason, not five" và "answers honestly, even when the honest answer is not the popular one".`,
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
        // Vòng hai, dựng trên thẻ c8 của chính bài. Đáp án xếp hạng NGẮN nhất.
        game(
          "I am not sure it fits what I need.",
          `The ${lo(c8)} is a good match.`,
          `The ${lo(c8)} is good match, madam.`,
          "Everything we have here would suit you, madam.",
          undefined,
          "Câu này đúng ngữ pháp nhưng hợp với tất cả nghĩa là không hợp với ai; lời khuyên phải trỏ đúng một thứ.",
        ),
      ],
    }),

    lesson(lx, 20, 3, "Respecting the Guest's Choice", "Tôn trọng quyết định của khách", {
      vocabulary: [
        bw(c3, `${Wt(c3)} is available too.`),
        bw(c4, `We also have ${wt(c4)}.`),
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
        // Thứ tự cũ mở bài bằng "Actually I will take the other one." — một
        // tham chiếu ngược không có lượt trước: chưa ai nói tới "cái kia".
        // Lượt mở lựa chọn thứ hai phải đứng TRƯỚC, và lượt đổi ý nối vào nó.
        sp(
          "Is there another one?",
          `${Wt(c3)} is available too.`,
          "'Available too' mở thêm lựa chọn mà không ép.",
        ),
        sp(
          "Actually I will take the other one.",
          `Of course, that is a good choice too.`,
          "Khách đổi ý thì ủng hộ ngay — đừng bảo vệ lời khuyên của mình.",
          undefined,
          undefined,
          `${Wt(c3)} is available too.`,
        ),
        sp(
          "Are you sure that is okay?",
          `Either one, madam. Whichever you prefer.`,
          "Trấn an để khách thoải mái với quyết định của họ.",
        ),
        sp(
          "What else do you have?",
          `We also have ${wt(c4)}.`,
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
          `I will note the ${lo(rd8)} in the system.`,
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
        // Hai câu độn cuối bài ("five minutes", "two days later") là chỗ bấu
        // víu duy nhất của CẢ HAI câu hỏi cũ — đúng hình dạng "bài dò số".
        `The guest chooses differently. ${lx.staff} answers warmly: "Of course, that is a good choice too, sir. Whichever you prefer." The guest feels comfortable. The staff member does not argue. ${lx.staff} writes down the new choice and changes the plan at once. The guest sees that the choice is respected, so the guest trusts the team and asks for help again later.`,
        [
          {
            q: "Nhân viên làm gì ngay khi khách đổi ý?",
            options: [
              "Ghi lại lựa chọn mới và sửa kế hoạch ngay lúc đó",
              "Giải thích lại vì sao lựa chọn ban đầu vốn tốt hơn hẳn",
              "Báo với quản lý ca rồi chờ quản lý duyệt cho đổi",
            ],
            correct: 0,
            explanation: '"writes down the new choice and changes the plan at once"',
          },
          {
            q: "Vì sao sau đó khách còn nhờ nhân viên giúp tiếp?",
            options: [
              "Vì khách thấy quyết định của mình được tôn trọng nên tin vào cả nhóm",
              "Vì khách không biết hỏi ai khác trong suốt thời gian lưu trú tại đây cả",
              "Vì nhân viên hứa sẽ giảm giá cho khách vào lần yêu cầu tiếp theo",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "The staff member does not argue" và "the guest trusts the team and asks for help again later".`,
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
        // Vòng hai, dựng trên thẻ c4 của chính bài. Đáp án xếp hạng NGẮN nhất.
        game(
          "Anything besides those two?",
          `We also have ${wt(c4)}.`,
          `We have also ${lo(c4)}, madam.`,
          "That is all, sir. You will have to pick one.",
          undefined,
          "Câu này đúng ngữ pháp nhưng đóng cửa; bài này dạy mở thêm lựa chọn, không dạy ép khách chọn trong hai.",
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
        // Câu mở cũ ("Yes, let us go with that one.") là tham chiếu ngược không
        // có lượt trước. Lượt mở giờ là lời đề nghị soát lại, và lượt đồng ý
        // nối vào nó bằng chính tên lựa chọn.
        sp(
          "Could you check that with me once more?",
          `So you would like the ${lo(c5)}, correct?`,
          "Chốt lại một lần trước khi thực hiện — tránh làm sai rồi phải làm lại.",
        ),
        sp(
          `Yes, let us go with the ${lo(c5)}.`,
          `Very good. I will arrange that now.`,
          "Xác nhận xong là hành động ngay, đừng để khách phải nhắc.",
          undefined,
          undefined,
          `So you would like the ${lo(c5)}, correct?`,
        ),
        sp(
          `Where is the ${lo(pr4)}?`,
          `The ${lo(pr4)} is on your right.`,
          "Ôn tuần 19: chỉ chỗ bằng The … is on your right.",
        ),
        sp(
          "Could you make an exception?",
          `I am afraid that is ${lo(pr8)}. May I ask my manager?`,
          "Ôn tuần 19: từ chối kèm I am afraid, rồi xin hỏi quản lý.",
        ),
        sp(
          "How does your shift start?",
          `First I ${lo(sa1)}, then I continue.`,
          "Ôn tuần 15 — cách năm tuần: trình tự các bước.",
          "colleague",
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
          "What needs the most care?",
          `I always ${lo(sa6)} with care.`,
          "Ôn tuần 15 — cách năm tuần: always đứng trước động từ chính.",
          "colleague",
        ),
        sp(
          "Why must I do that?",
          // Câu này là chuỗi CỨNG, in ra y hệt ở cả sáu bộ phận — và "safety
          // rule" trùng đúng ô rules[8] của spa, ô mà spa không có thẻ vì
          // tuần 19 của spa là bài viết tay. Không thể thay bằng ô ngân hàng:
          // "It is our last order time." (F&B) và "It is our cleaning hours."
          // (buồng phòng) đều không thành câu. Nói thẳng điều mà chính
          // helpTip đang dạy thì vừa đúng A2 vừa không mượn từ chưa dạy.
          "Every guest must do that, madam. It is the same for everyone.",
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
        `The decision is made. ${lx.staff} confirms: "So you would like ${wt(c5)}, correct?" The guest agrees. "Very good, sir. I will arrange that now." The work starts straight away. ${lx.staff} tells the team the choice at once, so nobody has to ask the guest again. If the guest changes their mind later, ${lx.staff} says it is no problem at all.`,
        [
          {
            q: "Vì sao không ai phải hỏi lại khách lần nữa?",
            options: [
              "Vì nhân viên báo lựa chọn cho cả nhóm ngay lúc đó",
              "Vì khách đã ký xác nhận vào phiếu trước khi rời quầy",
              "Vì mỗi khách chỉ được phép đổi ý đúng một lần duy nhất",
            ],
            correct: 0,
            explanation:
              '"tells the team the choice at once, so nobody has to ask the guest again"',
          },
          {
            q: "Nếu sau đó khách đổi ý thì nhân viên nói gì?",
            options: [
              "Nói rằng không có vấn đề gì, đúng như lúc khách vừa chốt xong",
              "Nói rằng lần này thì được, nhưng lần sau xin khách quyết sớm hơn",
              "Nói rằng phải hỏi quản lý ca trước khi sửa lại kế hoạch đã chốt",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "The work starts straight away" và "If the guest changes their mind later, ${lx.staff} says it is no problem at all".`,
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
        // Vòng hai, dựng trên thẻ c6 của chính bài. Đáp án xếp hạng GIỮA.
        game(
          "And who takes it from here?",
          `We will arrange the ${lo(c6)} then, madam.`,
          `We arrange the ${lo(c6)} then.`,
          "It should happen, madam. I will not be here tonight.",
          undefined,
          "Câu này đúng ngữ pháp và bỏ lời hứa lại cho ca sau mà không giao cho ai; chốt xong là nói rõ ai làm.",
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
          "And when exactly this morning?",
          `About two hours ago, sir.`,
          "Cho mốc thời gian cụ thể — 'ago' đếm ngược từ hiện tại.",
          undefined,
          undefined,
          `Yes, sir. I ${lo(e1)} it this morning.`,
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
          "Had là quá khứ của have, dùng cho mọi chủ ngữ; con số đọc thành chữ.",
          "colleague",
        ),
        sp(
          "Which one would you suggest?",
          `Many guests choose the ${lo(pc1)}, and they are happy.`,
          "Ôn tuần 20: gợi ý bằng lựa chọn nhiều khách chọn, rồi để khách tự quyết.",
        ),
        sp(
          "Yes, that one please.",
          // Was pc5: the confirmation named a different bank slot from the
          // suggestion one line up, so every department answered "Many
          // guests choose the light pressure" with "So you would like the
          // morning slot?"
          `So you would like the ${lo(pc1)}?`,
          "Ôn tuần 20: nhắc lại lựa chọn để xác nhận.",
        ),
        sp(
          "Was it busy before?",
          `${e5.word} was very busy.`,
          "Nêu bối cảnh trước, người nghe mới hiểu con số phía sau.",
          "colleague",
        ),
      ],
      reading: read(
        `The supervisor asks about the work. ${lx.staff} answers: "I ${lo(e1)} it this morning, about two hours ago. ${e5.word} was very busy." The supervisor asked because a guest was waiting for news. ${lx.staff} gave a clear time, so the supervisor answered the guest quickly and the guest stopped worrying.`,
        [
          {
            q: "Việc đó được làm khi nào?",
            options: ["Sáng nay", "Ngày mai", "Tuần trước"],
            correct: 0,
            explanation: `"I ${lo(e1)} it this morning."`,
          },
          {
            q: "Vì sao khách thôi lo lắng?",
            options: [
              "Vì nhân viên đưa một mốc giờ rõ, nên cấp trên trả lời khách được ngay",
              "Vì cấp trên tới tận nơi gặp khách và xin lỗi về việc khách phải chờ lâu",
              "Vì khách được mời một ly nước trong lúc chờ tin từ bộ phận nghiệp vụ",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "The supervisor asked because a guest was waiting for news" và "gave a clear time, so the supervisor answered the guest quickly".`,
          },
        ],
      ),
      game: [
        game(
          "Was that task completed?",
          `Yes, madam. I ${lo(e1)} it this morning.`,
          `Yesterday I do, madam. All finish already.`,
          "Of course, madam. Everything here is always done on time.",
          undefined,
          "Câu này lịch sự và là một lời bảo đảm chung chung; chưa kiểm thì đừng khẳng định.",
        ),
        // Vòng hai, dựng trên thẻ e5 của chính bài. Đáp án xếp hạng GIỮA.
        game(
          "What was the floor like earlier?",
          `${e5.word} was very busy.`,
          `${e5.word} very busy.`,
          "It was all right, more or less, I think.",
          "colleague",
          "Câu này đúng ngữ pháp nhưng không phải một báo cáo; người vào ca cần một câu chắc, không cần cảm nhận.",
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
          `And the twelve ${lo(e6)} — did you record them?`,
          `Yes, I ${lo(e10)} everything in the log.`,
          "Ghi chép đầy đủ là nền tảng của bàn giao ca tốt.",
          "colleague",
          undefined,
          `We had twelve ${lo(e6)} today, and all went well.`,
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
          `May I suggest ${wt(pc9)}?`,
          "Ôn tuần 20: mở thêm một hướng bằng lời xin phép, không ép khách.",
        ),
        sp(
          "Do you need a document from me?",
          `May I have your ${lo(rp2)}, please?`,
          "Ôn tuần 18: xin giấy tờ của khách bằng May I have.",
        ),
        sp(
          "Any problems today?",
          `Everything was ${lo(e9)}, and I noted it in the log.`,
          "Một câu trạng thái gọn cho cả ca, rồi mới nói ngoại lệ.",
          "colleague",
        ),
        // Three cards of this week — Already, slot 2 and slot 3 — were taught
        // and never said by anyone in the week that teaches them, in all six
        // departments.
        sp(
          "Is the report finished?",
          `Yes. I already finished it.`,
          "Already đứng trước động từ quá khứ: already FINISHED.",
          "colleague",
        ),
        sp(
          "What happened at noon?",
          `The last guest ${lo(e2)} at noon.`,
          "Quá khứ đơn cho việc đã xong ở một giờ cụ thể — at noon ở cuối câu.",
          "colleague",
        ),
        sp(
          "Was there any problem with the requests?",
          `Yes. One request was ${lo(e3)}.`,
          "Bị động quá khứ: was + phân từ hai — báo sự việc, không đổ lỗi cho ai.",
          "colleague",
        ),
      ],
      reading: read(
        // "Twelve was two more than the day before." là câu THỪA điển hình: nó
        // không nói gì về nghề và chỉ tồn tại để một câu hỏi có chỗ dò số.
        `At the end of the shift, ${lx.staff} reports: "We had twelve ${lo(e6)} today. The last guest ${lo(e2)} at noon. I ${lo(e10)} everything in the log." Nobody arrived after noon. After the report, the supervisor checked the log and found no gaps. The next shift started with a clear picture of the day, and ${lx.staff} went home on time.`,
        [
          {
            q: "Cấp trên tìm thấy gì khi soát lại sổ ca?",
            options: [
              "Không thiếu chỗ nào cả",
              "Thiếu mất con số của buổi chiều",
              "Thiếu tên của người khách cuối cùng",
            ],
            correct: 0,
            explanation: '"the supervisor checked the log and found no gaps"',
          },
          {
            q: "Vì sao ca sau nắm được tình hình ngay từ đầu?",
            options: [
              "Vì mọi việc đã được ghi vào sổ và cấp trên soát lại không thấy thiếu",
              "Vì ca trước ở lại thêm một tiếng để kể lại toàn bộ diễn biến trong ngày",
              "Vì cấp trên tự viết một bản tóm tắt riêng cho từng người của ca sau",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "I ${lo(e10)} everything in the log" và "The next shift started with a clear picture of the day".`,
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
        // Vòng hai, dựng trên thẻ e10 của chính bài. Đáp án xếp hạng NGẮN nhất.
        game(
          "Where is all of that written?",
          `I ${lo(e10)} everything in the log.`,
          `I am ${lo(e10)} everything in the log.`,
          "It is all in my head, and nothing is lost.",
          "colleague",
          "Câu này đúng ngữ pháp và để cả một ca làm nằm trong đầu một người; ca sau không đọc được cái đầu ấy.",
        ),
      ],
    }),

    lesson(lx, 21, 3, "Reporting a Problem", "Báo cáo sự cố đã xảy ra", {
      vocabulary: [
        // Slot 3 is the problem being reported, so the frame names something
        // every department handles. "One booking was ${lo(e3)}." rendered
        // "One booking was prepared." (F&B), "…was found." (Housekeeping) and
        // "…was delivered." (Guest Relations) — none of them a problem, none
        // of them about a booking.
        bw(e3, `One request was ${lo(e3)}.`),
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
          "So sánh hơn: động từ chia quá khứ + 'than usual' — muộn hơn thường lệ.",
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
          "And that problem — why did it take so long?",
          `It ${lo(e7)} than usual, because we were busy.`,
          "Giải thích bằng 'because' — nêu nguyên nhân khách quan, không đổ lỗi.",
          "manager",
          undefined,
          `There was one problem, but I fixed it.`,
        ),
        // askedKey cũ là `available` — một từ nội dung. "this evening" cho nó
        // hai từ và đồng thời tách lượt này khỏi bốn gợi ý gần giống nó.
        sp(
          "Is there anything else available this evening?",
          `We can also offer the ${lo(pc3)}, if that suits you.`,
          "Ôn tuần 20: mở thêm lựa chọn mà không ép.",
        ),
        sp(
          "Would that be acceptable?",
          `${Wt(pc7)} is fine, sir.`,
          "Ôn tuần 20: xác nhận lựa chọn của khách là ổn.",
        ),
        sp(
          // askedKey cũ `keep` — một từ nội dung.
          "Is there anything for me to keep afterwards?",
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
        `${lx.staff} gives an honest report: "There was one problem this morning, but I fixed it. It ${lo(e7)} than usual, because we were very busy." ${lx.staff} did not hide the problem and did not blame a colleague. The supervisor thanked ${lx.staff}, because an honest report helps the whole team. The team talked about it at the next meeting.`,
        [
          {
            q: "Nhân viên báo cáo sự cố thế nào?",
            options: [
              "Nói thẳng, không giấu và không đổ lỗi cho ai",
              "Nói rằng ca trước đã để lại sự cố này từ hôm qua",
              "Chỉ báo miệng cho đồng nghiệp chứ không báo cấp trên",
            ],
            correct: 0,
            explanation: '"did not hide the problem and did not blame a colleague"',
          },
          {
            q: "Vì sao cấp trên cảm ơn nhân viên?",
            options: [
              "Vì báo cáo trung thực giúp cả nhóm, và nhóm đã bàn lại việc đó",
              "Vì nhân viên đã tự xử lý xong mà không làm phiền tới cấp trên lần nào",
              "Vì nhân viên ở lại hết ca để chờ sự cố được khắc phục hoàn toàn",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "an honest report helps the whole team" và "The team talked about it at the next meeting".`,
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
        // Vòng hai, dựng trên thẻ e8 của chính bài. Đáp án xếp hạng DÀI nhất.
        game(
          "And the broken one — what now?",
          `I ${lo(e8)} the broken one, because it was not safe.`,
          `I ${lo(e8)} broken one already.`,
          "I left it there, and I told nobody about it.",
          "colleague",
          "Câu này đúng ngữ pháp và để lại một thứ hỏng cho người không biết; báo cáo là nói ra việc đã xử lý.",
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
          "And apart from that issue, is everything else done?",
          `Yes, everything else was ${lo(e9)}.`,
          "Chốt rõ phần đã xong để ca sau biết chính xác phải làm gì.",
          "colleague",
          undefined,
          `I ${lo(e4)} the supervisor, and the issue is closed.`,
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
        `The shift ends. ${lx.staff} tells the next colleague: "I ${lo(e4)} the supervisor about one issue. Everything else was ${lo(e9)}. The next shift will finish the rest." ${lx.staff} also wrote the issue in the log before leaving. The next colleague read it, asked one short question, and started work without any delay. Nothing was lost between the two shifts.`,
        [
          {
            q: "Nhân viên đã báo việc đó cho ai?",
            options: ["Cấp trên trực ca", "Người khách vừa rời đi", "Chưa báo cho ai"],
            correct: 0,
            explanation: '"the supervisor about one issue"',
          },
          {
            q: "Vì sao người ca sau bắt tay vào việc được ngay?",
            options: [
              "Vì sự cố đã được ghi vào sổ nên người đó chỉ cần hỏi thêm một câu",
              "Vì người ca sau đã có mặt từ sớm và theo dõi hết cả buổi làm trước",
              "Vì cấp trên đứng ở đó và giải thích lại toàn bộ diễn biến của ca trước",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "also wrote the issue in the log before leaving" và "read it, asked one short question, and started work without any delay".`,
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
        // Vòng hai, dựng trên thẻ e9 của chính bài. Đáp án xếp hạng NGẮN nhất.
        game(
          "How did the rest of it go?",
          `Everything was ${lo(e9)}.`,
          `Everything ${lo(e9)}, no problem happen.`,
          "Fine, I suppose. You will see for yourself soon.",
          "colleague",
          "Câu này đúng ngữ pháp và bắt người vào ca tự đi tìm hiểu; bàn giao là nói ra, không phải để lại đó.",
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
  // Slot 1, not slot 0: Front Office's slot 0 is an upgrade, which week 16
  // teaches is the duty manager's to give.
  const [, o1] = lx.bank.offers;
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
          // Nhãn cũ ghi "Ôn tuần 15 và 16". Vế "tuần 15" SAI ở F&B và buồng
          // phòng — tuần 15 của hai bộ phận đó là bài viết tay, không cấp thẻ
          // cho bước dịch vụ trong câu này, nên cổng ở week-content.ts gỡ vế ấy
          // lúc build và source còn lại một lời khai man. Vế "tuần 16" đúng ở
          // cả sáu.
          "Ôn tuần 16: tách thành hai câu ngắn — bước phục vụ một câu, lời mời một câu.",
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
          "What do you do first, and what do you offer?",
          `First I ${lo(a1)}. Then I offer ${wa(o1)}.`,
          // "(tuần 15)" nằm GIỮA câu, và regex của cổng chỉ neo ở ĐẦU chuỗi nên
          // không nhìn thấy nó — xem mục bàn giao. Bỏ số tuần, giữ nội dung.
          "Ghép bước phục vụ với lời mời — nhịp phục vụ thật là như vậy.",
          "colleague",
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
          "And the document — do you always check it?",
          "Yes, madam. This is our standard.",
          "Gọi tên chuẩn nghề, khách hiểu đây không phải ngẫu hứng.",
          undefined,
          undefined,
          "One moment, madam. I will check the document.",
        ),
      ],
      reading: read(
        `${lx.staff} combines the steps naturally. "First I ${lo(a1)}. Would you like ${wa(o1)}, madam? Everything will be ready ${lo(w2)}." The guest agrees to both. ${lx.staff} speaks slowly and checks each answer before moving on. The guest leaves with a clear plan and no questions. A good welcome follows the steps, but it sounds like a real conversation.`,
        [
          {
            q: "Nhân viên hứa gì về thời gian?",
            // Đáp án cũ dán nguyên tiếng Anh của ô ngân hàng vào giữa một
            // phương án tiếng Việt ("Mọi thứ xong without delay"), nên nó là
            // phương án DUY NHẤT có tiếng Anh ở cả sáu bộ phận — chọn đúng
            // không cần đọc bài. Dùng nghĩa tiếng Việt của chính thẻ đó.
            options: [
              `Mọi thứ xong ${w2.definition.toLowerCase()}`,
              "Sẽ trễ một chút",
              "Không hứa gì về giờ",
            ],
            correct: 0,
            explanation: `"Everything will be ready ${lo(w2)}."`,
          },
          {
            q: "Vì sao khách rời đi mà không còn câu hỏi nào?",
            options: [
              "Vì nhân viên nói chậm và soát lại từng câu trả lời trước khi đi tiếp",
              "Vì khách đã từng ở đây nhiều lần nên biết rõ mọi bước của quy trình",
              "Vì nhân viên nói quá nhanh nên khách không kịp hỏi thêm điều gì nữa cả",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "speaks slowly and checks each answer before moving on" và "The guest leaves with a clear plan and no questions".`,
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
        // Vòng hai, dựng trên thẻ w2 của chính bài. Đáp án xếp hạng GIỮA.
        game(
          "When will all of this be ready?",
          `Everything will be ready ${lo(w2)}, madam.`,
          `Everything ready ${lo(w2)}, madam.`,
          "I cannot say exactly, madam. Perhaps quite soon.",
          undefined,
          "Câu này đúng ngữ pháp nhưng không hứa mốc nào; 'quite soon' không phải một mốc khách chờ được.",
        ),
      ],
    }),

    lesson(lx, 22, 2, "Details, Paperwork & Payment", "Ghép hỏi thông tin với giấy tờ", {
      vocabulary: [
        v("Complete", "/kəmˈpliːt/", "Hoàn tất", "The form is complete.", "✅"),
        bw(w3, `I noted the ${lo(w3)} in the log.`),
        bw(w5, `The ${lo(w5)} was positive.`),
        bw(w9, `I checked the ${lo(w9)} before I left.`),
      ],
      grammar: [
        g(
          `Give me name, sign here.`,
          `Could I have your name? Then please sign here.`,
          // Nhãn cũ "Ôn tuần 17 và 18" SAI ở cả SÁU bộ phận: câu này không mang
          // thẻ nào của tuần 17 hay 18 ("name", "sign" không phải headword ở bộ
          // phận nào), nên cổng ở week-content.ts gỡ sạch nhãn lúc build và chỉ
          // source còn giữ lời khai man. Đây là `rule`, thứ buildPaper in ra làm
          // phần giải thích đáp án TRÊN đề thi.
          "Chuỗi hai bước: xin thông tin lịch sự trước, rồi mới hướng dẫn ký.",
          `Could I have your name? Then please to sign here.`,
        ),
        g(
          `I prepare paper now.`,
          `I am preparing the paperwork now, and it is nearly ready.`,
          // "Ôn tuần 18" SAI ở cả sáu: "paperwork" không phải headword tuần 18 của
          // bộ phận nào — các thẻ tuần 18 là tên từng loại giấy tờ.
          "Việc đang làm ngay lúc nói dùng hiện tại tiếp diễn.",
          // Was "I am preparing paperwork now." — correct English (paperwork
          // is uncountable and needs no article), marked wrong.
          `I am prepare the paperwork now, and it is nearly ready.`,
        ),
      ],
      speaking: [
        sp(
          "What do you need to complete this?",
          `Could I have your name? Then please sign here.`,
          "Chuỗi hai bước: xin thông tin rồi hướng dẫn — đúng nhịp làm thủ tục thật.",
        ),
        sp(
          "Here is my name. And the signature — is that everything?",
          `Yes. I am preparing the paperwork now.`,
          "Xác nhận đủ thông tin rồi báo mình đang xử lý.",
          undefined,
          undefined,
          `Could I have your name? Then please sign here.`,
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
          "Any good news today?",
          `The ${lo(w5)} was positive.`,
          "Báo cả phản hồi tốt, không chỉ báo sự cố.",
          "colleague",
        ),
        sp(
          "What did you check before you left?",
          `I checked the ${lo(w9)} before I left.`,
          "Quá khứ đơn checked và left: báo việc đã làm trước khi về.",
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
        `${lx.staff} handles the formalities. "Could I have your name, please? Then please sign here. I am preparing the paperwork now, sir." The name comes first, the signature second. ${lx.staff} asks for the name first, because the name goes on every page. When the guest has signed, ${lx.staff} checks each page, gives back the pen and says thank you. Nothing has to be signed twice.`,
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
            q: "Vì sao tên được hỏi trước chữ ký?",
            options: [
              "Vì tên phải có trên mọi trang, nên hỏi trước thì không phải ký lại",
              "Vì khách thường quên mất tên mình đã đăng ký khi đặt phòng lần đầu",
              "Vì chữ ký bắt buộc phải lấy sau cùng theo quy định của phòng kế toán",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "asks for the name first, because the name goes on every page" và "Nothing has to be signed twice".`,
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
        // Vòng hai, dựng trên thẻ w3 của chính bài. Đáp án xếp hạng DÀI nhất.
        game(
          "Will the next shift know about this?",
          `I noted the ${lo(w3)} in the log.`,
          `I note ${lo(w3)} in log.`,
          "They will find out, madam.",
          undefined,
          "Câu này đúng ngữ pháp và phó mặc cho may rủi; ca sau biết được là vì có người ghi vào sổ.",
        ),
      ],
    }),

    lesson(lx, 22, 3, "Rules & Choices Together", "Ghép nội quy với tư vấn lựa chọn", {
      vocabulary: [
        v("Overall", "/ˌəʊvərˈɔːl/", "Nhìn chung", "Overall, the day went well.", "🌐"),
        // Đuôi "if you would like that" là lời mời KHÁCH, nhưng cả thẻ này và
        // lượt nói dùng nó đều nằm trong một buổi rút kinh nghiệm với ĐỒNG
        // NGHIỆP ("Could anything be better?"). Mời đồng nghiệp chọn giúp là
        // sai vai ở cả sáu bộ phận.
        bw(w4, `We can always ${lo(w4)}, and I will note it down.`),
        bw(w6, `The whole shift was ${lo(w6)}.`),
        bw(w10, `The last thing is the ${lo(w10)}, and then I finish.`),
      ],
      grammar: [
        g(
          `Cannot do that, choose other.`,
          `I am afraid that is not allowed. Would you prefer another option?`,
          // Vế "tuần 19" SAI ở năm bộ phận (cổng thu nhãn xuống còn "Ôn tuần 20");
          // "another option" là chữ của tuần 20, còn tuần 19 không cấp thẻ nào
          // xuất hiện trong câu này.
          "Ôn tuần 20: từ chối mềm rồi mở ngay lựa chọn khác.",
          `I am afraid that is not allowed. Would you prefer other option?`,
        ),
        g(
          `Team do well yesterday.`,
          `The whole shift was ${lo(w6)}.`,
          // "Ôn tuần 21" SAI ở cả sáu: từ nội dung duy nhất của câu là thẻ của
          // chính TUẦN 22 (ô wrapUp), không phải của tuần 21.
          "Quá khứ của to be — was đi với chủ ngữ số ít.",
          `The whole shift were ${lo(w6)}.`,
        ),
      ],
      speaking: [
        sp(
          "Can I do it this way instead?",
          `I am afraid not. Would you prefer another option?`,
          // Hai vế "(tuần 19)"/"(tuần 20)" nằm GIỮA câu, và regex của cổng chỉ neo
          // ở ĐẦU chuỗi nên không kiểm được chúng — xem mục bàn giao.
          "Chuỗi vàng: từ chối lịch sự rồi đưa ngay một lựa chọn. Không bao giờ dừng ở lời từ chối.",
        ),
        sp(
          "Yes, another option then — what can you offer?",
          `We could arrange something quieter for you.`,
          "Đưa phương án cụ thể chứ không hỏi lại chung chung.",
          undefined,
          undefined,
          `I am afraid not. Would you prefer another option?`,
        ),
        sp(
          // Slot 3 is now the problem itself (cancelled, forgotten, missed),
          // so "Did anyone deal with it? — Yes, that was forgotten" would
          // answer yes with a failure.
          "What happened to that request?",
          `It was ${lo(pe3)} yesterday, and I noted it.`,
          "Ôn tuần 21: bị động quá khứ was + phân từ hai, kèm mốc yesterday.",
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
          `We can always ${lo(w4)}, and I will note it down.`,
          "Nhận việc còn cải thiện được mà không đổ lỗi cho ai — và đây là nói với đồng nghiệp, nên kết bằng việc mình sẽ làm, không phải lời mời khách chọn.",
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
          "I am sorry to hear that, sir. What is the issue?",
          "Xin lỗi rồi hỏi rõ vấn đề trước — chưa biết hỏng gì thì chưa hứa sửa.",
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
        `A guest requests something against the rules. ${lx.staff} answers: "I am afraid that is not allowed, sir. Would you prefer another option? We could arrange something quieter." ${lx.staff} does not argue about the rule. If the guest is still unhappy, ${lx.staff} offers to ask the manager, because the manager can explain the reason. Most guests accept the quieter option.`,
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
            q: "Nếu khách vẫn chưa hài lòng thì nhân viên làm gì?",
            options: [
              "Đề nghị đi hỏi quản lý, vì quản lý giải thích được lý do của quy định",
              "Nhắc lại quy định thêm một lần nữa cho tới khi khách chịu chấp nhận nó",
              "Tự linh động cho khách lần này rồi ghi vào sổ ca để báo lại sau",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "does not argue about the rule" và "offers to ask the manager, because the manager can explain the reason".`,
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
        // Vòng hai, dựng trên thẻ w10 của chính bài. Đáp án xếp hạng NGẮN nhất.
        game(
          "Anything still open at this hour?",
          `The last thing is the ${lo(w10)}.`,
          `Last thing the ${lo(w10)}, then finish.`,
          "Nothing much. I will leave it for the morning shift.",
          "colleague",
          "Câu này đúng ngữ pháp và đẩy việc cuối ca sang ca sáng; việc cuối phải được gọi tên trước khi rời chỗ.",
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
          // "Ôn tuần 21" SAI ở năm bộ phận: 'ahead of time' là thẻ của tuần 22.
          "'went' là quá khứ của 'go'; nêu lý do bằng 'because' rồi mới tới mệnh đề.",
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
          "What will you cover in the handover?",
          `Let me ${lo(w8)}. I will tell you about the ${lo(w7)}.`,
          "Tóm tắt rồi bàn giao mốc thời gian cụ thể cho ca sau.",
          "colleague",
        ),
        sp(
          "And before the handover — was the team told?",
          `Yes, I ${lo(pe4)} the whole team before the shift ended.`,
          "Ôn tuần 21: báo lại cấp trên bằng câu quá khứ đủ.",
          "colleague",
          undefined,
          `Let me ${lo(w8)}. I will tell you about the ${lo(w7)}.`,
        ),
        sp(
          "What did you do about it?",
          `I ${lo(pe8)} the broken one, and the guest is happy now.`,
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
          "It keeps everyone safe, madam. The rule is the same for all.",
          "Đặt lý do trước, yêu cầu sau — khách nghe dễ chịu hơn.",
        ),
      ],
      reading: read(
        `At the end of the day, ${lx.staff} reports to the manager: "Today went well, because the team finished ahead of time. Let me ${lo(w8)} briefly. I will tell you about the ${lo(w7)}." The manager asked one question about tomorrow. ${lx.staff} answered with a time and a name, and the report was finished.`,
        [
          {
            q: "Ca làm hôm nay thế nào?",
            options: ["Suôn sẻ, không sự cố", "Rất nhiều vấn đề xảy ra", "Chưa kết thúc ca trực"],
            correct: 0,
            explanation: `"Today went well, because the team finished ahead of time."`,
          },
          {
            q: "Nhân viên trả lời câu hỏi của quản lý bằng gì?",
            options: [
              "Bằng một mốc giờ và một cái tên, rồi báo cáo kết thúc",
              "Bằng một lời hứa sẽ kiểm tra lại và trả lời vào sáng hôm sau",
              "Bằng cách kể lại toàn bộ diễn biến của ca làm một lần nữa",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "The manager asked one question about tomorrow" và "answered with a time and a name, and the report was finished".`,
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
        // Vòng hai, dựng trên thẻ w7 của chính bài. Đáp án xếp hạng DÀI nhất.
        game(
          "What should I watch for next?",
          `Let me tell you about the ${lo(w7)}.`,
          `I tell you the ${lo(w7)} now.`,
          "Same as yesterday, honestly.",
          "colleague",
          "Câu này đúng ngữ pháp nhưng không bàn giao gì cả; 'giống hôm qua' là câu làm ca sau mất nguyên buổi để phát hiện chỗ khác.",
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

/** Tiêu đề tuần riêng cho một bộ phận, keyed `${DEP}-${week}`.
 *
 *  Tuần 18 của khung tên là "Paperwork & Payment", nhưng chính khoá dạy
 *  "Housekeeping staff never take cash." — buồng phòng làm giấy tờ và bàn
 *  giao, tiền bạc là việc của lễ tân. Một tiêu đề tuần nói ngược lại nội
 *  dung của chính nó là thứ học viên đọc trước cả bài học. */
const DEPT_WEEK_TITLES: Record<string, { en: string; vi: string }> = {
  "HK-18": { en: "Paperwork & Handover", vi: "Giấy tờ & bàn giao" },
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
        bw(d8, `The ${lo(d8)} will help us prepare.`),
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
          // askedKey cũ `tell` — một từ nội dung.
          "Is there anything I should tell you about my food?",
          `Yes, madam. Could I have your ${lo(d3)}?`,
          "Hỏi chủ động trước khi khách phải tự nói — đó là chuẩn 5 sao và cũng là an toàn.",
        ),
        sp(
          "I cannot eat peanuts at all.",
          `Thank you, madam. Is it an allergy? I will tell the chef.`,
          "Hỏi rõ dị ứng hay không thích, rồi báo bếp — không tự trả lời món nào an toàn.",
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
          `The ${lo(d8)} will help us prepare.`,
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
          // Đáp án ĐÚNG của vòng này viết "allergy detail" số ít trong khi
          // headword là "Allergy details" — phương án được chấm là đúng lại
          // là tiếng Anh lệch chuẩn. Lấy thẳng từ ô ngân hàng để không lệch
          // lại lần nữa.
          `Thank you. Could I have your ${lo(d5)} again?`,
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
          "It is a staff area, madam. It is for your safety.",
          "Nói lý do an toàn, không kể chi tiết hoá chất — kể ra chỉ làm khách hoảng.",
        ),
        sp(
          `Can I move the ${lo(r5)} myself?`,
          `Please do not touch the ${lo(r5)}, madam.`,
          "Vật nặng là việc của bộ phận, không phải của khách — và cũng không phải của một người.",
        ),
        sp(
          "When will you clean my room?",
          `May I remind you of the ${lo(r9)}? We clean from nine to four.`,
          "Nhắc khung giờ làm buồng kèm giờ cụ thể, để khách khỏi phải đoán.",
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
        // Vòng hai, dựng trên thẻ `Cleaning hours` của chính bài.
        game(
          "When can I have my room done?",
          "May I remind you of the cleaning hours, madam?",
          "I remind you the cleaning hours.",
          "Whenever you like, madam. Just call me.",
          undefined,
          "Câu này đúng ngữ pháp và hứa một khung giờ không thuộc quyền mình; giờ dọn phòng là lịch của bộ phận, không phải của một người.",
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
            // askedKey cũ RỖNG: mọi từ trong câu đều là từ chức năng.
            "Is there anything you can do about the upgrade?",
            `Yes, madam. We also have ${wa(o2)}.`,
            "Thứ trong quyền mình thì mời ngay — tầng cao hơn không tốn tiền của khách sạn.",
          ),
          sp(
            "Could I have one more towel?",
            "Of course, sir. I will send one up now.",
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
          `A guest asks for a free upgrade at the desk. ${lx.staff} does not say yes and does not say no, but says: "I will ask my manager about an upgrade for you, madam." Then ${lx.staff} offers a higher floor, which costs the hotel nothing, and a drink while the guest waits. The duty manager comes in four minutes with the answer. The guest waited with something in her hand.`,
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
            "I will ask my manager about an upgrade for you, madam.",
            "Website say so, I give you.",
            "Of course, madam. I will upgrade you now.",
            undefined,
            "Câu này lịch sự và sai. Bạn vừa hứa một hạng phòng có tính tiền; người phải rút lời hứa lại là quản lý ca, trước mặt chính vị khách đó.",
          ),
          // Vòng hai, dựng trên thẻ `Higher floor` — thứ lễ tân MỜI được ngay
          // vì nó không tốn tiền của khách sạn.
          game(
            "Is there anything you can give me?",
            "Yes, madam. We also have a higher floor.",
            "Yes, madam. We also have higher floor.",
            "I am afraid there is nothing at all, madam.",
            undefined,
            "Câu này đúng ngữ pháp và đóng cửa ngay; tầng cao hơn nằm trong quyền của quầy, nên mời được mà không phải hỏi ai.",
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
            "Thank you for telling me. I cannot start until I ask my manager.",
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
            // Đáp án cũ mở đầu bằng "Of course" — tức nhận lời ép lực mạnh
            // hơn NHIỀU, trong chính bài dạy rằng có câu trả lời buộc phải
            // dừng lại. Đáp án đúng chỉ nhận một nấc và giữ lại quyền dừng.
            "Can you press much harder on my back?",
            "A little deeper, madam. Please tell me if it hurts.",
            "Yes, I press very strong for you.",
            "Certainly, madam. I will press as hard as you like.",
            undefined,
            "Khách xin mạnh hơn nhiều; câu đúng chỉ nhận một nấc và giữ lại quyền dừng tay — bài này là bài chống chỉ định.",
          ),
        ],
      },
    );
  },

  // Tuần 20 nói về thứ nằm NGOÀI khách sạn: bàn ăn, tour, xe. Bài khung dạy
  // khuyên kèm lý do — đúng, nhưng thiếu ranh giới khiến lời khuyên hoá lời
  // hứa: khách nghe xong là tưởng đã có bàn, tới nơi mới biết chưa ai gọi.
  // Bài này tách GỢI Ý khỏi ĐẶT CHỖ — gợi ý là việc của Guest Relations, đặt
  // chỗ bên ngoài là việc của concierge (xem GR_16_3 và tuần 31).
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
          "Could you book a table for us?",
          "Of course. Shall I call the restaurant now?",
          "Đề nghị làm giúp, đừng tự làm rồi báo sau. Khách vẫn là người quyết.",
        ),
        sp(
          "So the table is ready for us?",
          "Not yet, madam. I will call and confirm.",
          "Câu quan trọng nhất bài này: chưa gọi thì chưa có bàn, nói thẳng ra.",
        ),
        sp(
          "And if we want something different tomorrow?",
          `Then I have a ${lo(c9)} for you.`,
          "Có phương án hai trước khi khách kịp lo — đó là khác biệt của một người làm Guest Relations.",
        ),
        sp(
          "Is there something fun for a birthday?",
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
          `Certainly, sir. May I confirm the company name and ${lo(p4)}?`,
          "Hoá đơn điện tử xuất sai phải làm lại — đọc lại tên công ty và mã số thuế cho khách xác nhận trước.",
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
        `A guest is leaving. ${lx.staff} asks for the room number, then calls Housekeeping about the minibar. One line on the folio is the service charge, ten percent of the room. ${lx.staff} explains it before the guest asks. The printed receipt is given by hand, because a folio the guest can read is a folio nobody disputes later.`,
        [
          {
            q: "Nhân viên gọi cho bộ phận nào trước khi chốt hoá đơn?",
            options: ["Buồng phòng", "Nhà hàng", "Kỹ thuật"],
            correct: 0,
            explanation: `"calls Housekeeping about the minibar"`,
          },
          {
            q: "Vì sao biên lai được trao tận tay khách?",
            options: [
              "Vì khách đọc được hoá đơn thì sau này không ai tranh cãi về nó nữa",
              "Vì quy định cấm gửi bất kỳ giấy tờ nào của khách qua đường thư điện tử",
              "Vì máy in ở quầy lễ tân không nối được với hệ thống của phòng kế toán",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "Nam explains it before the guest asks" và "a folio the guest can read is a folio nobody disputes later".`,
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
  HK_18_3: (lx) => {
    // Bài riêng thay bài khung PHẢI giữ bộ headword của bài nó thay — nếu
    // không, ô ngân hàng của tuần này mất thẻ trong khi tuần 19 và 21 vẫn đọc
    // nó theo chỉ số và bắt học viên NÓI. Hai ô dưới đây là hai ô bài khung
    // dạy ở vị trí này; chúng quay lại cạnh ba thẻ riêng của bài.
    const [, , , , , p6, , p8] = lx.bank.paperwork;
    return lesson(lx, 18, 3, "Reporting a Fault", "Báo hỏng cho kỹ thuật", {
      vocabulary: [
        v(
          "Maintenance request",
          "/ˈmeɪntənəns rɪˈkwest/",
          "Phiếu báo hỏng",
          "I will put in a maintenance request.",
          "🔧",
        ),
        v(
          "Blocked room",
          "/ˈblɒkt ruːm/",
          "Phòng bị khoá, không nhận khách",
          "1408 is a blocked room tonight.",
          "⛔",
        ),
        v("Leaking", "/ˈliːkɪŋ/", "Bị rò rỉ", "The tap is leaking in the bathroom.", "💧"),
        bw(p6, `Which ${lo(p6)} would you prefer?`),
        bw(p8, `You can ${lo(p8)} whenever you are ready.`),
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
          "It is reported, madam. Maintenance will call you with a time.",
          "Không hứa giờ thay bộ phận khác: nói việc mình đã làm, và ai sẽ báo giờ cho khách.",
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
        `A room attendant finds water on the bathroom floor of room 1408. The tap is leaking. The attendant does not try to fix it. The attendant puts in a maintenance request and tells the floor supervisor. The room is blocked until maintenance comes. Maintenance answers within thirty minutes, but only maintenance gives the guest a time.`,
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
            explanation: `"Maintenance answers within thirty minutes"`,
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
    });
  },

  // Khung cho ra "Here is your lost property, sir." — trao đồ khách bỏ quên
  // ngay tại cửa phòng như trao một tờ hoá đơn. Trưởng buồng phòng gọi đó là
  // một biên bản chờ sẵn. Đây là SOP thật.
  HK_18_4: (lx) => {
    // Giữ hai ô bài khung dạy ở vị trí này: tuần 18 và 19 nói "The ${p4} is on
    // file." còn tuần 21 trao tay "Here is your ${p7}, madam." — cả hai trước
    // nay không có thẻ nào ở buồng phòng.
    const [, , , p4, , , p7] = lx.bank.paperwork;
    return lesson(lx, 18, 4, "Lost and Found", "Đồ khách bỏ quên", {
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
        bw(p4, `The ${lo(p4)} is on file.`),
        bw(p7, `Here is your ${lo(p7)}, madam.`),
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
          "I am afraid I cannot hand it over here, madam.",
          "Từ chối bằng 'I am afraid' và nêu rõ chỗ nào không được làm.",
          "I am afraid I cannot handing it over here, madam.",
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
          "I am afraid I cannot hand it over here, madam.",
          "Trao đồ tại cửa phòng là chỗ mọi vụ mất đồ bắt đầu.",
        ),
        sp(
          "Why not? It is mine.",
          "The office checks your ID first, madam.",
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
        `A room attendant finds a watch on the desk in room 1204. The attendant does not leave it and does not give it to anyone at the door. The item is written in the lost property book with the room number and the date. Then it goes to the housekeeping office. A guest who claims it shows ID and describes the watch first.`,
        [
          {
            q: "Đồ nhặt được ghi vào sổ kèm những gì?",
            options: ["Số phòng và ngày", "Tên nhân viên nhặt được", "Giá trị món đồ"],
            correct: 0,
            explanation: `"with the room number and the date"`,
          },
          {
            q: "Khách nhận lại đồ phải làm gì trước?",
            options: [
              "Xuất trình giấy tờ và tả món đồ",
              "Trả một khoản phí",
              "Ký ngay tại cửa phòng",
            ],
            correct: 0,
            explanation: `"shows ID and describes the watch first"`,
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
    });
  },

  // Hoá đơn nhà hàng Việt Nam có 5% phí phục vụ cộng 10% VAT. Khoá dạy đúng
  // một nửa cấu trúc phí, và trưởng bộ phận gọi phần thiếu là nguồn tranh cãi
  // hàng tuần. Bài này giữ nguyên ba headword của ô và dạy trọn tờ hoá đơn,
  // kèm ranh giới: giảm giá không phải quyền của người phục vụ.
  // Bài khung hứa thay khách sạn. "The second helping is free for our guests."
  // và "The price includes free refills." là chính sách của TỪNG nhà hàng, chứ
  // không phải sự thật của ngành — học viên đọc thuộc hai câu ấy sẽ hứa sai ở
  // chỗ làm đầu tiên, và người phải rút lời hứa lại là quản lý. Bản này giữ
  // nguyên bộ headword (Side dish · Second helping · Free refills) và buộc mỗi
  // câu hoặc NÊU ĐIỀU KIỆN, hoặc chuyển lên quản lý.
  FB_16_2: (lx) => {
    const [, pa2, , , , pa6] = lx.bank.steps;
    const [, , o3, , , , , o8, , o10] = lx.bank.offers;
    return lesson(lx, 16, 2, "What Is Included, and Where", "Đã gồm những gì — và gồm ở đâu", {
      vocabulary: [
        bw(o3, `Many guests ask for ${wa(o3)}.`),
        bw(o8, `The ${lo(o8)} is free at the buffet, madam.`),
        bw(o10, `Coffee and tea come with ${lo(o10)} at breakfast, sir.`),
      ],
      grammar: [
        g(
          `This no money.`,
          `The ${lo(o8)} is free at the buffet, madam.`,
          "Nói miễn phí phải kèm nơi áp dụng: THE + danh từ + IS FREE + AT THE + chỗ đó.",
          `The ${lo(o8)} free at the buffet, madam.`,
        ),
        g(
          `Coffee have ${lo(o10)}.`,
          // Cặp ngay phía trên vừa dạy "miễn phí phải kèm nơi áp dụng", rồi
          // cặp này làm mẫu một lời hứa KHÔNG có phạm vi. Rót thêm miễn phí
          // là chính sách của từng bữa, từng nhà hàng; học viên đọc thuộc câu
          // trần sẽ hứa sai ở ca tối, và người rút lời hứa lại là quản lý.
          `Your coffee includes ${lo(o10)} at breakfast, sir.`,
          "Chủ ngữ số ít 'your coffee' đi với 'includes' có -s. Và lời hứa miễn phí luôn phải kèm phạm vi, đúng như cặp trên vừa dạy.",
          `Your coffee include ${lo(o10)} at breakfast, sir.`,
        ),
      ],
      speaking: [
        sp(
          `Is ${wt(o8)} extra?`,
          `No, madam. The ${lo(o8)} is free at the buffet.`,
          "Trả lời rõ về phí và nói luôn phạm vi: miễn phí ở quầy buffet không có nghĩa là miễn phí mọi nơi.",
        ),
        sp(
          "What exactly does it include?",
          `Your coffee includes ${lo(o10)} at breakfast, sir.`,
          "Gọi tên đúng thứ được rót thêm VÀ bữa nào được rót — đừng nói gọn thành cả hoá đơn.",
        ),
        sp(
          "Which one do most guests take?",
          `Many guests ask for ${wa(o3)}.`,
          "Gợi ý bằng cái nhiều người chọn — dễ nghe hơn là ép khách.",
        ),
        sp(
          "So everything comes with refills?",
          "I will ask my manager, madam. I cannot promise that.",
          "Khách hỏi rộng hơn điều mình biết chắc: nói thẳng mình không quyết được rồi đi hỏi quản lý.",
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
          "colleague",
        ),
        sp(
          // Bản DEPT_LESSONS của cùng họ gợi ý — cùng sửa để key đạt hai từ.
          "Is there anything more you could suggest today?",
          "May I offer you an extra choice?",
          "Mời thêm bằng câu hỏi, khách vẫn là người quyết.",
        ),
      ],
      reading: read(
        `A guest worries about the cost. ${lx.staff} explains: "The ${lo(o8)} is free at the buffet, sir. Your coffee includes ${lo(o10)} at breakfast." Then the guest asks about the evening menu. ${lx.staff} does not guess and goes to ask the manager. The service charge stays on its own line. A guest who knows the price early is rarely unhappy at the end.`,
        [
          {
            q: "Phần thứ hai được miễn phí ở đâu?",
            options: ["Ở quầy buffet", "Ở mọi nhà hàng của khách sạn", "Ở nhà hàng buổi tối"],
            correct: 0,
            explanation: `"The ${lo(o8)} is free at the buffet"`,
          },
          {
            q: "Khi chưa chắc về thực đơn buổi tối, nhân viên làm gì?",
            options: ["Đi hỏi quản lý", "Đoán rồi trả lời cho nhanh", "Nói là không biết rồi thôi"],
            correct: 0,
            explanation: '"goes to ask the manager"',
          },
        ],
      ),
      game: [
        game(
          "Will this cost me anything extra?",
          `Not at the buffet, sir. The ${lo(o8)} is free there.`,
          "This no money, madam. All free, no charge you.",
          "Everything here is free, madam. No charge at all.",
          undefined,
          "Câu này hứa quá tay: chỉ phần vừa hỏi, và chỉ ở quầy buffet, là miễn phí — không phải mọi thứ trong khách sạn.",
        ),
        // Vòng hai, dựng trên thẻ `Free refills` — và lời hứa có PHẠM VI.
        game(
          "Do I pay for each cup?",
          `Coffee and tea come with ${lo(o10)} at breakfast, sir.`,
          `Coffee ${lo(o10)} all day, sir.`,
          "Everything you drink here is free, sir.",
          undefined,
          "Câu này đúng ngữ pháp và hứa quá phạm vi; nói rõ thứ nào, ở đâu, vào bữa nào mới là lời hứa giữ được.",
        ),
      ],
    });
  },

  // Ice preference · Cooking level · Drink choice là TÊN Ô GHI trên phiếu bếp
  // và phiếu bar, không phải câu hỏi cho khách. Bài khung đem cả ba ra hỏi
  // thẳng ("May I check your ice preference, sir?") trong khi chính khoá đã
  // dạy câu đúng ở chỗ khác. Bản này giữ nguyên bộ headword và trả chúng về
  // đúng chỗ: lượt bàn giao bếp/bar.
  FB_17_2: (lx) => {
    const [, qo2, , , , po2, , , qo9] = lx.bank.offers;
    const [, , , , , d6, d7, , d9] = lx.bank.details;
    return lesson(lx, 17, 2, "Reading the Order Back", "Đọc lại phiếu gọi món", {
      vocabulary: [
        bw(d6, `The bar needs the ${lo(d6)} for table four.`),
        bw(d7, `The kitchen asks for the ${lo(d7)}.`),
        bw(d9, `I will pass the ${lo(d9)} to the bar.`),
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
          "Could you check what I just gave you?",
          `Thank you. Let me read that back to you.`,
          "Đọc lại thông tin là bước bắt buộc — sai một chữ có thể hỏng cả đơn.",
        ),
        sp(
          "Actually, the part you read back is wrong.",
          `I am sorry. Please correct me.`,
          "Sai thì xin lỗi ngắn và mời khách sửa, đừng thanh minh.",
          undefined,
          undefined,
          `Thank you. Let me read that back to you.`,
        ),
        sp(
          "I will have the beef, please.",
          "Certainly, madam. How would you like it cooked?",
          "Đây là câu hỏi thật với khách. Mức chín chỉ là ô ghi trên phiếu bếp, không đem ra hỏi.",
        ),
        sp(
          "Table six wants it medium.",
          `Noted. I will write the ${lo(d7)} on the order.`,
          "Nghe khách xong thì ghi vào đúng ô cho bếp đọc, không nhớ miệng.",
          "colleague",
        ),
        sp(
          "What should I tell the bar?",
          `The ${lo(d6)} for table four is no ice.`,
          "Bàn giao với quầy bar thì gọi tên ô ghi; với khách thì hỏi bình thường.",
          "colleague",
        ),
        sp(
          "What goes down to the bar now?",
          `I will pass the ${lo(d9)} to the bar now.`,
          "Đồ uống đi thẳng xuống bar — nói rõ mình chuyển cái gì, đừng để bar đoán.",
          "colleague",
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
          "Is the salad bar limited?",
          `No, madam. That part is ${lo(qo9)}.`,
          "Ôn tuần 16: nói rõ phần nào không giới hạn, và chỉ phần khách vừa hỏi.",
        ),
      ],
      reading: read(
        `${lx.staff} repeats the order carefully. "Let me read that back to you. Please correct me if I am wrong." The guest wanted the beef medium, not well done, and corrects it. ${lx.staff} writes the ${lo(d7)} on the slip, because the kitchen reads the slip. The ${lo(d9)} goes to the bar on the same slip. Reading back takes one minute and saves a long problem later.`,
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
            q: "Mức chín của món bò được ghi cho ai đọc?",
            options: ["Cho bếp", "Cho khách giữ", "Cho quầy thu ngân"],
            correct: 0,
            explanation: '"because the kitchen reads the slip"',
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
        // Vòng hai, dựng trên thẻ `Drink choice` của chính bài: ô ghi cho
        // quầy bar, nên đáp án phải nói mình CHUYỂN nó đi đâu.
        game(
          "Who gets the drinks part?",
          `I will pass the ${lo(d9)} to the bar now.`,
          `I pass ${lo(d9)} to bar now.`,
          "The bar will hear it from the kitchen, sir.",
          undefined,
          "Câu này đúng ngữ pháp và phó mặc cho bếp nhắn hộ; phiếu đồ uống đi thẳng xuống bar, và người chuyển là bạn.",
        ),
      ],
    });
  },

  // Cùng lý do với FB_17_2: "Could I have your meat preference?" là câu hỏi
  // kiểu điền form, và "The price includes free refills." lại hứa thay nhà
  // hàng một lần nữa. Bộ headword giữ nguyên (Meat preference · Final order).
  FB_17_4: (lx) => {
    const [, , , qo4, , , , po4, , qo10] = lx.bank.offers;
    const [, , , d4, , , , , , d10] = lx.bank.details;
    return lesson(lx, 17, 4, "Writing the Order Down", "Ghi phiếu gọi món", {
      vocabulary: [
        bw(d4, `The kitchen needs the ${lo(d4)} for table six.`),
        bw(d10, `I will add that to the ${lo(d10)}.`),
      ],
      grammar: [
        g(
          `I write it now.`,
          `I am writing your order down now.`,
          "Việc đang làm ngay lúc nói dùng hiện tại tiếp diễn: I AM WRITING.",
          `I am write your order down now.`,
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
          "Just one more thing, madam. Chicken or beef?",
          "Hỏi khách bằng hai lựa chọn thật; tên ô ghi là chuyện của phiếu bếp.",
        ),
        sp(
          "Beef, please.",
          `Thank you. I will write the ${lo(d4)} for the kitchen.`,
          "Khách nói món, mình ghi vào đúng ô — bếp đọc phiếu chứ không nghe bàn.",
        ),
        sp(
          "Here you are.",
          `Thank you. I am writing it down now.`,
          "Nói ra việc mình đang làm giúp khách biết mình không bị bỏ quên.",
        ),
        sp(
          "And what you are writing down — where does it go?",
          `I will add that to the ${lo(d10)}.`,
          "Ghi lại giúp khách, không bắt khách nhắc lại lần thứ hai.",
          undefined,
          undefined,
          `Thank you. I am writing it down now.`,
        ),
        sp(
          "What is missing for table six?",
          `Only the ${lo(d4)}. I will ask the guest now.`,
          "Thiếu ô nào thì gọi tên ô đó khi bàn giao với bếp.",
          "colleague",
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
          `Your coffee includes ${lo(qo10)} at breakfast, sir.`,
          "Ôn tuần 16: gọi tên đúng thứ được rót thêm VÀ bữa nào được rót, không hứa cả hoá đơn.",
        ),
      ],
      reading: read(
        `The last detail is needed. ${lx.staff} asks: "Chicken or beef, madam?" The guest chooses beef. "Thank you. I am writing it down now." The ${lo(d4)} goes on the slip for the kitchen. When the slip is complete, ${lx.staff} reads it back once. The guest does not wait long, because the slip asks only what the kitchen really needs. The order has four lines in total.`,
        [
          {
            q: "Nhân viên hỏi khách bằng câu nào?",
            options: [
              "Chicken or beef, madam?",
              "You take chicken or beef?",
              "Meat, madam? Which?",
            ],
            correct: 0,
            explanation: "Hỏi khách bằng hai lựa chọn cụ thể, thành câu đầy đủ.",
          },
          {
            q: "Loại thịt khách chọn được ghi ở đâu?",
            options: [
              "Trên phiếu gửi xuống bếp",
              "Trong trí nhớ của nhân viên",
              "Trên hoá đơn của khách",
            ],
            correct: 0,
            explanation: `"The ${lo(d4)} goes on the slip for the kitchen."`,
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
        // Vòng hai, dựng trên thẻ `Final order` của chính bài.
        game(
          "Will the kitchen see all of this?",
          `I will add that to the ${lo(d10)}.`,
          `I will adding that to the ${lo(d10)}.`,
          "No need, madam. I will remember it myself.",
          undefined,
          "Câu này đúng ngữ pháp và thay phiếu bếp bằng trí nhớ; bếp chỉ đọc được thứ có trên giấy.",
        ),
      ],
    });
  },

  // Cả mười ba thẻ từ của tuần sát hạch F&B là từ báo cáo nội bộ — không thẻ
  // nào nói được với khách, đúng tuần thi. Ba ô danh từ của ngân hàng đã đổi
  // sang Takeaway box · Wine list · Water refill; bài này là chỗ chúng được
  // nói RA VỚI KHÁCH, và cũng là chỗ thay câu mời trống nghĩa
  // "May I offer you an extra service, sir?".
  FB_22_2: (lx) => {
    const [, pe2, , , , pe6] = lx.bank.reports;
    const [, , w3, , w5, , , , w9] = lx.bank.wrapUp;
    return lesson(lx, 22, 2, "Paperwork & the Last Round", "Giấy tờ & vòng phục vụ cuối", {
      vocabulary: [
        v("Complete", "/kəmˈpliːt/", "Hoàn tất", "The form is complete.", "✅"),
        bw(w3, `May I pack this in a ${lo(w3)}, madam?`),
        bw(w5, `May I bring you the ${lo(w5)}, sir?`),
        bw(w9, `Would you like a ${lo(w9)}, madam?`),
      ],
      grammar: [
        g(
          `Give me name, sign here.`,
          `Could I have your name? Then please sign here.`,
          // Nhãn cũ "Ôn tuần 17 và 18" SAI ở cả SÁU bộ phận: câu này không mang
          // thẻ nào của tuần 17 hay 18 ("name", "sign" không phải headword ở bộ
          // phận nào), nên cổng ở week-content.ts gỡ sạch nhãn lúc build và chỉ
          // source còn giữ lời khai man. Đây là `rule`, thứ buildPaper in ra làm
          // phần giải thích đáp án TRÊN đề thi.
          "Chuỗi hai bước: xin thông tin lịch sự trước, rồi mới hướng dẫn ký.",
          `Could I have your name? Then please to sign here.`,
        ),
        g(
          `I prepare paper now.`,
          `I am preparing the paperwork now, and it is nearly ready.`,
          // "Ôn tuần 18" SAI ở cả sáu: "paperwork" không phải headword tuần 18 của
          // bộ phận nào — các thẻ tuần 18 là tên từng loại giấy tờ.
          "Việc đang làm ngay lúc nói dùng hiện tại tiếp diễn.",
          `I am prepare the paperwork now, and it is nearly ready.`,
        ),
      ],
      speaking: [
        sp(
          "What do you need to complete this?",
          `Could I have your name? Then please sign here.`,
          "Chuỗi hai bước: xin thông tin rồi hướng dẫn — đúng nhịp làm thủ tục thật.",
        ),
        sp(
          "Here is my name. And the signature — is that everything?",
          `Yes. I am preparing the paperwork now.`,
          "Xác nhận đủ thông tin rồi báo mình đang xử lý.",
          undefined,
          undefined,
          `Could I have your name? Then please sign here.`,
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
          "We cannot finish all this food.",
          `Of course, madam. May I pack it in a ${lo(w3)}?`,
          "Khách ăn không hết: mời gói mang về trước khi dọn đĩa đi.",
        ),
        sp(
          "What goes well with this dish?",
          `Certainly, sir. May I bring you the ${lo(w5)}?`,
          "Đưa danh mục cho khách chọn, đừng đọc thuộc từng chai.",
        ),
        sp(
          "My glass is empty.",
          `Would you like a ${lo(w9)}, madam?`,
          "Thấy ly cạn thì mời châm thêm ngay, không đợi khách phải gọi.",
        ),
        sp(
          "Anything else for me?",
          "Is there anything else I can arrange, sir?",
          "Câu hỏi mở cuối bữa phải nói rõ mình làm được gì, không mời chung chung.",
        ),
        sp(
          "Is the paperwork done?",
          "Yes. The form is complete.",
          "Báo trạng thái xong bằng một câu ngắn.",
        ),
      ],
      reading: read(
        `${lx.staff} handles the end of the meal. "Could I have your name, please? Then please sign here." The name comes first, the signature second. While the bill prints, ${lx.staff} offers a ${lo(w9)} and packs the rest in a ${lo(w3)}. The guest signs, and ${lx.staff} gives back the pen and says thank you. Nothing has to be signed twice. The form has three pages.`,
        [
          {
            q: "Thứ tự đúng là gì?",
            options: ["Tên trước, chữ ký sau", "Chữ ký trước, tên sau", "Cả hai cùng lúc"],
            correct: 0,
            explanation: '"The name comes first, the signature second."',
          },
          {
            q: "Trong lúc chờ in hoá đơn, nhân viên làm gì?",
            options: [
              "Mời châm thêm nước và gói phần ăn còn lại",
              "Đứng yên chờ khách ký xong",
              "Đi kiểm quỹ cuối ca",
            ],
            correct: 0,
            explanation: `"offers a ${lo(w9)} and packs the rest in a ${lo(w3)}"`,
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
        // Vòng hai, dựng trên thẻ `Wine list` của chính bài. Đáp án xếp hạng
        // GIỮA về độ dài ký tự.
        game(
          "What would go with this dish?",
          `May I bring you the ${lo(w5)}, sir?`,
          `I bring ${lo(w5)} for you, sir?`,
          "Anything red is fine with that, sir.",
          undefined,
          "Câu này đúng ngữ pháp và đoán thay khách; đưa danh sách ra là để khách chọn, không phải để bạn chọn hộ.",
        ),
      ],
    });
  },

  FB_18_3: (lx) => {
    const [, , , , p5, p6, , p8] = lx.bank.paperwork;
    return lesson(lx, 18, 3, "The Bill, Line by Line", "Hoá đơn, từng dòng một", {
      vocabulary: [
        // Con số cứng đã bị rút khỏi cả bài. Thuế suất dịch vụ ăn uống ở Việt
        // Nam đã có lúc là 8%, nên một khoá dạy "ten percent VAT" là dạy nhân
        // viên đọc thuộc một con số sẽ sai. Câu đúng nghề là chỉ vào dòng in
        // trên hoá đơn. Cùng lý do, tuần 18 và lượt ôn FB-22 nay nói CÙNG một
        // điều: VAT và phí phục vụ là hai dòng riêng trên hoá đơn.
        bw(p5, `The ${lo(p5)} is a separate line, madam.`),
        bw(p6, `Which ${lo(p6)} would you prefer?`),
        bw(p8, `You can ${lo(p8)} at the table.`),
      ],
      grammar: [
        g(
          "Bill have tax and service.",
          "The bill shows VAT and service on separate lines.",
          "Chủ ngữ số ít 'the bill' đi với 'shows'; hai khoản nối bằng 'and'.",
          "The bill show VAT and service on separate lines.",
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
          `${lo(p5)} and service, madam. Both rates are printed there.`,
          "Gọi tên hai dòng rồi chỉ vào tỷ lệ in trên hoá đơn — không đọc thuộc con số.",
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
          "Yes, madam. The service line is already on your bill.",
          "Trả lời thẳng có hay không, rồi chỉ vào dòng trên hoá đơn.",
        ),
      ],
      reading: read(
        `A guest at table six asks for the bill. ${lx.staff} brings it and explains the two extra lines: VAT and service. Both rates are printed on the bill, so nobody has to remember them. The guest asks to split the bill, so ${lx.staff} prints two. The guest pays by card at the table. Nothing is added after the guest sees the total.`,
        [
          {
            q: "Hai dòng thêm trên hoá đơn là gì?",
            options: ["Thuế VAT và phí phục vụ", "Tiền tip và thuế", "Phí phục vụ và tiền phòng"],
            correct: 0,
            explanation: `"the two extra lines: VAT and service"`,
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
          "What is this second line here?",
          "That is the service charge, madam. It is on every bill.",
          "Service charge, madam, everybody pay this one here.",
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
  // Khung chung trả lời "Is there anything I need to do?" bằng "Not at all,
  // sir. I will start the treatment now." — đúng cho lễ tân, cho Guest
  // Relations, cho hậu cần, và SAI trong phòng trị liệu. Khách spa có ba việc
  // phải làm trước: thay áo choàng, tắm tráng, ký phiếu. Chính tuần 18 của
  // spa dạy đủ ba việc ấy, nên tuần 15 đang dạy ngược tuần 18.
  //
  // Bài giữ nguyên ba headword của ô (Step · ô 3 · ô 4) và chỉ dùng từ spa ĐÃ
  // học trước tuần 15: robe và locker (tuần 2), shower và changing room
  // (tuần 8), locker key (tuần 14), health form (tuần 17 — nên ở đây gọi là
  // "form"). Nhân tiện lấp chỗ trống mà kiểm định đã nêu: cả 22 tuần không có
  // một câu nào về vệ sinh trị liệu.
  SW_15_2: (lx) => {
    const [, , , a4, a5] = lx.bank.steps;
    return lesson(lx, 15, 2, "Before We Start", "Trước khi bắt đầu: việc của khách", {
      vocabulary: [
        v("Step", "/step/", "Bước trong quy trình", "The next step is simple.", "🪜"),
        bw(a4, `Please wait a moment while I ${lo(a4)}.`),
        bw(a5, `I will ${lo(a5)} when you are ready.`),
      ],
      grammar: [
        g(
          `You wait, I ${lo(a4)}.`,
          `Please wait a moment while I ${lo(a4)}.`,
          "Câu hai mệnh đề nối bằng 'while'. Đây là bước tiến của A2 so với câu đơn ở A1.",
          `Please wait a moment while I will ${lo(a4)}.`,
        ),
        g(
          `Change clothes, then come.`,
          `Could you change into your robe, please?`,
          "Mệnh lệnh trần trụi nghe thô. Dùng 'Could you … please?' để mời khách làm gì đó.",
          `Could you to change into your robe, please?`,
        ),
      ],
      speaking: [
        sp(
          "What should I do now?",
          `Please wait a moment while I ${lo(a4)}.`,
          "Vừa hướng dẫn vừa giải thích lý do — khách chờ mà không thấy khó chịu.",
        ),
        sp(
          // Bản DEPT_LESSONS của cùng họ gợi ý — cùng mốc "before we start" như
          // bài khung, nên hai lượt nhận đáp án của nhau.
          "Is there anything I need to do before we start?",
          "Yes, sir. Please change into your robe and shower first.",
          "Câu quan trọng nhất bài này. Khách spa LUÔN có việc phải làm trước — nói thẳng ba việc, đừng trấn an cho qua.",
        ),
        sp(
          "Is the next part complicated?",
          `The next step is simple.`,
          "Trấn an bằng một câu ngắn, đủ chủ ngữ và động từ.",
        ),
        sp(
          "Do I shower before or after?",
          `Before, madam. Then I will ${lo(a5)}.`,
          "Tắm tráng trước là quy định vệ sinh, không phải tuỳ khách chọn.",
        ),
        sp(
          "Where do I leave my things?",
          "In the locker, madam. Here is your key.",
          "Ôn tuần 2 và 14: chỉ chỗ cất đồ rồi đưa chìa khoá ngay, khách không phải hỏi lại.",
        ),
        sp(
          "Is that everything before we begin?",
          "There is one form to sign, sir. Then we start.",
          "Phiếu khai sức khoẻ ký xong mới bắt đầu — nói rõ còn một việc, đừng để khách tưởng đã xong.",
        ),
        sp(
          "What is the next step?",
          `Next, we ${lo(a4)}, madam.`,
          "Gọi tên bước kế tiếp để khách biết mình đang ở đâu trong quy trình.",
        ),
      ],
      reading: read(
        `A guest arrives for a treatment. ${lx.staff} explains the three things the guest does first: change into the robe, shower, and sign the form. Then ${lx.staff} says: "Please wait a moment while I ${lo(a4)}." The guest showers and comes back. Nothing starts until the form is signed. A treatment that starts early is a treatment that starts wrong.`,
        [
          {
            q: "Khách phải làm mấy việc trước khi bắt đầu?",
            options: ["Ba việc", "Một việc", "Không việc nào"],
            correct: 0,
            explanation: `"the three things the guest does first"`,
          },
          {
            q: "Vì sao nhân viên chưa bắt đầu ngay khi khách quay lại?",
            options: ["Phiếu chưa được ký", "Phòng chưa dọn xong", "Khách chưa chọn tinh dầu"],
            correct: 0,
            explanation: `Khách đã tắm xong, nhưng "Nothing starts until the form is signed."`,
          },
        ],
      ),
      game: [
        game(
          "Do I need to do anything myself?",
          "Yes, madam. Please change and shower, then we begin.",
          "You no need do nothing, madam.",
          "Not at all, madam. Just lie down as you are.",
          undefined,
          "Câu này lịch sự và sai quy trình: chưa thay đồ, chưa tắm tráng thì buổi trị liệu không được bắt đầu — đó là quy định vệ sinh, không phải tuỳ khách.",
        ),
        // Vòng hai, dựng trên thẻ `Start the treatment` của chính bài.
        game(
          "Can we begin now?",
          "I will start the treatment when you are ready, madam.",
          "I will starting the treatment now, madam.",
          "Let us begin, madam. The shower can wait.",
          undefined,
          "Câu này đúng ngữ pháp và bỏ đúng bước bài vừa dạy: tắm tráng trước, rồi mới bắt đầu liệu trình.",
        ),
      ],
    });
  },

  SW_18_4: (lx) => {
    // Ô 6 là vật TRAO TAY khách; tuần 21 nói "Here is your ${p7}, madam." mà
    // trước nay spa không có thẻ nào cho nó, vì bài riêng này thay đúng bài
    // khung dạy ô đó.
    const [, , , , , , p7] = lx.bank.paperwork;
    return lesson(
      lx,
      18,
      4,
      "Before We Begin: What You Wear",
      "Trước buổi trị liệu: áo choàng & khăn phủ",
      {
        vocabulary: [
          bw(p7, `Here is your ${lo(p7)}, madam.`),
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
            "The next guest starts at four, madam. Shall I book longer next time?",
            "Không kéo dài buổi này, nhưng mở ngay một lối khác cho lần sau.",
          ),
          sp(
            "Is room two ready?",
            "Yes. The robe is out, and the towel cover is ready.",
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
    );
  },

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
          "Could you massage under the towel, please?",
          "I am not able to do that, madam.",
          "Câu quan trọng nhất bài này. Ngắn, không giải thích dài, không xin lỗi nhiều lần.",
        ),
        sp(
          "Just a little further, it is fine.",
          "I am sorry. I need to stop here.",
          "Lần thứ hai thì không thương lượng nữa: dừng tay.",
        ),
        sp(
          "What is happening in room two?",
          "The guest asked for something inappropriate. I am stopping now.",
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
          "Could you massage under the towel?",
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
        bw(r2, `Our ${lo(r2)} is strict.`),
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
          // Bài này dạy "I cannot confirm that" ở lượt sau, nhưng cả cụm cũ
          // đều kết thúc bằng "for the guest" — tức là đã TỰ XÁC NHẬN bà Chen
          // có ở đây, đúng điều vừa từ chối. Câu nhận hoa phải nói về CÁI QUẦY,
          // không về một vị khách.
          "May I keep the flowers here at the desk?",
          "'May I…?' xin phép làm giúp — hoa vẫn tới nơi mà không xác nhận có ai ở đây.",
          "May I keeping the flowers here at the desk?",
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
          "May I keep the flowers here at the desk?",
          "Từ chối rồi mở ngay một lối khác: hoa vẫn tới nơi, mà bạn không hề nhận là có vị khách đó.",
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
          `Our ${lo(r2)} is strict, madam. May I take a message?`,
          "Viện dẫn quy định rồi làm ngay việc mình được làm — nhận lời nhắn không cần xác nhận ai đang ở đây.",
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
        `A courier comes with flowers and a name on the card. ${lx.staff} does not give the room number and does not say whether that name is in the hotel. ${lx.staff} takes the flowers and keeps them at the desk. The courier waits in the garden lounge. A card with the sender's name stays with the flowers.`,
        [
          {
            q: "Nhân viên làm gì với bó hoa?",
            options: [
              "Giữ lại ở quầy",
              "Đưa số phòng cho người giao",
              "Mang thẳng lên phòng khách",
            ],
            correct: 0,
            explanation: `"takes the flowers and keeps them at the desk"`,
          },
          {
            q: "Cái gì được giữ cùng bó hoa?",
            options: ["Tấm thiệp có tên người gửi", "Hoá đơn", "Số điện thoại người giao"],
            correct: 0,
            explanation: `"A card with the sender's name stays with the flowers."`,
          },
        ],
      ),
      game: [
        game(
          "Which room do I deliver these to?",
          "I will keep them here at the desk, sir. May I have your name?",
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

  // Bài khung dạy Guest Relations nói "We could arrange a city tour instead."
  // — và tuần 31 của chính Guest Relations viết thẳng: "A city tour, a boat, a
  // restaurant: none of those is yours to arrange." Tuần 16 đến TRƯỚC, nên
  // thứ học viên học đầu tiên là thứ tuần 31 phải gỡ ra.
  //
  // Bài giữ nguyên ba headword của ô (City tour · Table reservation ·
  // Complimentary) và thêm đúng một thẻ — "Concierge" — vì không có nó
  // thì câu chuyển việc là một cụm chưa ai dạy. Cố ý là NGƯỜI chứ không phải
  // "Concierge desk": tuần 26 mới dạy cái quầy trong danh bạ bộ phận, và cổng
  // đếm headword đúc hai lần ở tuần 23-40 là một ratchet, không phải cảnh báo.
  // Ranh giới bài dạy: bàn TRONG khách sạn là việc của mình, tour NGOÀI thì
  // không — và "Shall I ask…?" là câu giữ đúng ranh giới ấy.
  GR_16_3: (lx) => {
    const [, , , o4, o5, , , , o9] = lx.bank.offers;
    const [, , s3, , , , s7] = lx.bank.steps;
    return lesson(lx, 16, 3, "An Alternative, and Whose It Is", "Đề xuất thay thế — việc của ai", {
      vocabulary: [
        v(
          "Concierge",
          "/ˈkɒnsieəʒ/",
          "Nhân viên phụ trách dịch vụ ngoài khách sạn",
          "The concierge books the tours, madam.",
          "🧭",
        ),
        bw(o4, `Shall I ask the concierge about ${wa(o4)}?`),
        bw(o5, `We can also offer ${wa(o5)}.`),
        bw(o9, `You asked about that part, madam. It is ${lo(o9)}.`),
      ],
      grammar: [
        g(
          `I book you ${wa(o4)}.`,
          `Shall I ask the concierge to book it?`,
          "'Shall I…?' là lời đề nghị làm giúp — và nó nói rõ bạn đi HỎI ai, chứ không tự hứa thay bộ phận khác.",
          `Shall I ask the concierge to booking it?`,
        ),
        g(
          `No have. Other thing?`,
          `We do not have that, but we can offer ${wa(o5)}.`,
          "Câu hai mệnh đề nối bằng 'but' — báo tin xấu rồi mở ngay lối khác.",
          `We do not have that, but we can to offer ${wa(o5)}.`,
        ),
      ],
      speaking: [
        sp(
          `Can you book me ${wa(o4)}?`,
          `Shall I ask the concierge to book it?`,
          "Câu quan trọng nhất bài này. Tour, thuyền, nhà hàng ngoài khách sạn không phải việc bạn đặt — bạn đưa khách tới đúng quầy.",
        ),
        sp(
          "Do you have that available today?",
          "Not today, madam. The concierge will know.",
          "Không biết thì chuyển đúng chỗ, đừng đoán hộ một bộ phận khác.",
        ),
        sp(
          "Hmm, what else could work?",
          `Perhaps you would prefer ${wa(o5)}, madam?`,
          "Bàn trong khách sạn thì bạn đặt được — gợi ý đúng thứ mình giữ được lời hứa.",
        ),
        sp(
          "Tell me about that part.",
          `That part is ${lo(o9)}.`,
          "Nói rõ tính chất của phần đó ngay từ đầu — mơ hồ về phí là nguồn phàn nàn lớn nhất.",
        ),
        sp(
          "How much is the tour?",
          "The concierge will give you the price, sir.",
          "Không báo giá thay bộ phận khác. Giá sai một lần là mất lòng tin cả kỳ nghỉ.",
        ),
        sp(
          "What is the third step?",
          `The third step is to ${lo(s3)}.`,
          "Ôn tuần 15: gọi tên bước bằng số thứ tự — the third step.",
          "colleague",
        ),
        sp(
          "Anything people usually miss?",
          `Do not forget to ${lo(s7)}.`,
          "Ôn tuần 15: nhắc việc bằng câu mệnh lệnh phủ định.",
          "colleague",
        ),
        sp(
          "Sorry, I did not catch that.",
          "I am sorry, madam. Let me say that again slowly.",
          "Nhận phần khó nghe về mình, đừng đổ cho khách.",
        ),
      ],
      reading: read(
        `A guest asks for ${wa(o4)}. ${lx.staff} does not promise it and does not give a price. "Shall I ask the concierge to book it?" The guest agrees. ${lx.staff} walks the guest over to the concierge. A table inside the hotel is our work; a tour outside it is not.`,
        [
          {
            q: "Nhân viên làm gì khi khách hỏi tour?",
            options: [
              "Hỏi quầy concierge giúp khách",
              "Tự đặt tour cho khách ngay",
              "Bảo khách tự đi mà hỏi",
            ],
            correct: 0,
            explanation: `"Shall I ask the concierge to book it?"`,
          },
          {
            q: "Theo bài đọc, việc nào mới là phần việc của nhân viên?",
            options: [
              "Đặt bàn trong khách sạn",
              "Đặt tour ngoài khách sạn",
              "Báo giá tour cho khách",
            ],
            correct: 0,
            explanation: `Nhân viên không hứa và không báo giá tour; "A table inside the hotel is our work; a tour outside it is not."`,
          },
        ],
      ),
      game: [
        game(
          "Can you book the tour for me now?",
          "Shall I ask the concierge to book it, sir?",
          "Yes yes, I book tour for you now.",
          "Of course, sir. I will book it for you myself.",
          undefined,
          "Câu này lịch sự và vượt quyền: tour, thuyền, nhà hàng ngoài khách sạn là việc của quầy concierge — hứa thay họ là hứa một chỗ mình không giữ được.",
        ),
        // Vòng hai, dựng trên thẻ `Table reservation` — phía BÊN TRONG của
        // chính ranh giới vòng một dạy: bàn trong khách sạn thì mình đặt được.
        game(
          "And somewhere to eat tonight?",
          `We can also offer ${wa(o5)}, madam.`,
          `We can also offer ${lo(o5)}.`,
          "The concierge desk handles all of that, madam.",
          undefined,
          "Câu này đúng ngữ pháp và đẩy đi quá tay: bàn TRONG khách sạn là việc của bạn, chỉ tour bên ngoài mới phải chuyển sang concierge.",
        ),
      ],
    });
  },

  // Bài khung tuần 17 đóng lại bằng một lượt ÔN tuần 16 dùng chung:
  // `We could arrange ${qo4} instead.` Với Guest Relations ô offers[3] là
  // `City tour`, nên câu ấy in ra "We could arrange a city tour instead." —
  // đúng việc mà tuần 31 của chính bộ phận này viết thẳng là KHÔNG phải của
  // mình: "A city tour, a boat, a restaurant: none of those is yours to
  // arrange." Năm bộ phận kia nhận đúng thứ họ tự sắp xếp được (phòng nối,
  // món tráng miệng, dịch vụ buổi tối…), nên ĐỘNG TỪ CHUNG giữ nguyên và chỉ
  // Guest Relations có bài riêng — đổi khung là làm yếu bốn bộ phận kia.
  //
  // Bộ headword không đổi: Travel purpose · Guest file. Chỉ một lượt nói khác
  // bài khung, và nó vẫn là lượt ÔN tuần 16 — `concierge` và `city tour` đều
  // là thẻ tuần 16 của Guest Relations (GR_16_3), nên nhãn "Ôn tuần 16" đúng.
  GR_17_4: (lx) => {
    const [, , , qo4, , , , po4, , qo10] = lx.bank.offers;
    const [, , , d4, , , , , , d10] = lx.bank.details;
    return lesson(lx, 17, 4, "Recording the Details", "Ghi lại thông tin", {
      vocabulary: [
        bw(d4, `Could I have your ${lo(d4)}?`),
        bw(d10, `I will add that to the ${lo(d10)}.`),
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
          "And what you are writing down — where does it go?",
          `I will add that to the ${lo(d10)}.`,
          "Ghi lại giúp khách, không bắt khách nhắc lại lần thứ hai.",
          undefined,
          undefined,
          `Thank you. I am writing it down now.`,
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
        // ĐÂY là lượt khác bài khung. Giữ nguyên 'could' của tuần 16 và giữ
        // nguyên headword City tour; đổi đúng ĐỘNG TỪ: đi hỏi quầy concierge
        // chứ không tự nhận sắp xếp một chuyến đi ngoài khách sạn.
        sp(
          "Could we change that?",
          `We could ask the concierge about ${wa(qo4)}.`,
          "Ôn tuần 16: 'could' làm lời đề nghị nhẹ đi — nhưng chuyến đi ngoài khách sạn là việc của quầy concierge, nên lời đề nghị là ĐI HỎI, không phải tự sắp xếp.",
        ),
        sp(
          "What does the price cover?",
          `The price includes ${lo(qo10)}.`,
          "Ôn tuần 16: includes để liệt kê thứ đã tính vào giá.",
        ),
      ],
      reading: read(
        `The last detail is needed. ${lx.staff} says: "Just your ${lo(d4)}, and that is everything." The guest gives it. "Thank you. I am writing it down now." This is the last question on the form. When the form is complete, ${lx.staff} checks every line again. The guest does not wait long, because the form asks only what the team really needs.`,
        [
          {
            q: "Nhân viên làm gì ngay sau khi khách trả lời?",
            options: ["Ghi lại ngay", "Đi hỏi quầy concierge", "Đọc lại bảng giá"],
            correct: 0,
            explanation: '"I am writing it down now."',
          },
          {
            q: "Vì sao khách không phải ngồi chờ lâu?",
            options: [
              "Vì tờ khai chỉ hỏi đúng những gì bộ phận cần, không hỏi cho đủ giấy",
              "Vì nhân viên bỏ qua vài dòng trên tờ khai để khách được về phòng sớm",
              "Vì khách đã điền sẵn phần lớn tờ khai từ trước khi tới quầy lễ tân",
            ],
            correct: 0,
            explanation: `Ghép hai câu: "This is the last question on the form" và "the form asks only what the team really needs".`,
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
        // Vòng hai, dựng trên thẻ d10 của chính bài. Đáp án xếp hạng NGẮN nhất.
        game(
          "Will I have to repeat this next time?",
          `I will add that to the ${lo(d10)}.`,
          `I will adding that to the ${lo(d10)}.`,
          "No need, madam. I will remember it myself.",
          undefined,
          "Câu này đúng ngữ pháp và thay hồ sơ bằng trí nhớ; ca sau không đọc được trí nhớ của bạn.",
        ),
      ],
    });
  },

  // Concierge có đúng một câu về xe trong tám tuần, và đó là câu thực đơn:
  // "The private car is available too." Không giờ đón, không điểm đón, không
  // tên tài xế, không thời gian di chuyển. Bài này thay bộ headword của ô.
  GR_18_2: (lx) => {
    // Bài thi nói của Guest Relations đòi "member number" và "sign the form",
    // và cho tới giờ chưa tuần nào cấp thẻ cho hai cụm ấy: bài riêng này thay
    // đúng bài khung dạy chúng. Ô 1 là thứ KHÁCH đưa, ô 9 là cụm động từ có
    // sẵn tân ngữ — cùng hình dạng mà khung đang đọc.
    const [, p2, , , , , , , , p10] = lx.bank.paperwork;
    return lesson(lx, 18, 2, "The Car at Six-Thirty", "Xe đón lúc sáu rưỡi", {
      vocabulary: [
        v("Pick-up time", "/ˈpɪk ʌp taɪm/", "Giờ đón", "Your pick-up time is six-thirty.", "🕡"),
        v("Driver's name", "/ˈdraɪvəz neɪm/", "Tên tài xế", "The driver's name is Mr Hung.", "🧑‍✈️"),
        bw(p2, `May I have your ${lo(p2)}, please?`),
        bw(p10, `Please ${lo(p10)} on this line.`),
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
          "Chỉ chỗ rồi đi cùng — đưa khách ra tận nơi mới là trọn việc.",
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
          "He is from our partner company, madam.",
          "Driver good, madam, no worry, he drive long time.",
          "I am not sure, madam. The company sends anyone.",
          undefined,
          "Câu này đúng ngữ pháp và bỏ khách lại với nỗi lo; việc của bạn là bảo đảm đúng phần mình biết chắc.",
        ),
      ],
    });
  },

  // Tình huống số một của mọi nhà hàng — khách chê món — không có một lượt nói
  // nào trong tám tuần, và giao tiếp với bếp chỉ có đúng một lượt. Bài này
  // thay bộ headword của ô, vì hai thẻ cũ là túi xách và két an toàn.
  FB_19_4: (lx) => {
    // Hai ô nội quy mà bài khung dạy ở vị trí này: tuần 20 vẫn bắt nói cả hai
    // ("Please keep your ${r6} with you, madam." và "I am afraid that is
    // ${r8}.") trong khi nhà hàng không có thẻ nào cho chúng.
    const [, , , , , r6, , r8] = lx.bank.rules;
    return lesson(lx, 19, 4, "When the Guest Is Not Happy", "Khi khách không hài lòng", {
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
        bw(r6, `Please keep your ${lo(r6)} with you, madam.`),
        bw(r8, `I am afraid that is ${lo(r8)}.`),
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
    });
  },
};

/** A review turn whose prompt opens with a back-reference is CONTINUING the
 *  turn written just before it: the two are one exchange, authored adjacent
 *  in DEPT_REVIEW. Deliberately the same opener set the `follows` inference
 *  in week-content.ts tests for — that inference is the consumer, and it only
 *  ever looks WITHIN one lesson, so a split pair is a pair it can no longer
 *  see. If the two ever drift, a pair merely stops being protected; it cannot
 *  produce a link that was not there before. */
const REVIEW_BACK_REFERENCE = /^(and|but|then|so|after that|actually|yes,|no,)([ ,.?!]|$)/i;

/** Spread a department's own review turns across the week's four lessons.
 *  Applied after the headword lock so they are never counted as this week's
 *  targets — they exist to put an EARLIER week's words back in the mouth.
 *
 *  The spread used to be `j % lessons.length`, which walks the list one turn
 *  at a time and therefore drops two CONSECUTIVE turns into two DIFFERENT
 *  lessons. Downstream, `follows` is inferred per lesson, so the orphaned
 *  second turn was chained to whatever happened to precede it in its new
 *  lesson — and the checkpoint replays a whole chain as one oral item, so a
 *  broken chain became a broken exam question. Measured before this change:
 *  0 of 3 authored pairs survived, and FO-22 answered "And if it is still not
 *  fixed tonight?" with a passport request.
 *
 *  So: deal CONTIGUOUS blocks, in authored order, and never cut inside an
 *  exchange. Each lesson still gets roughly its share of the turns. */
function withDeptReview(lessons: LessonContent[], code: string, week: number): LessonContent[] {
  const extra = DEPT_REVIEW[`${code}-${week}`];
  if (!extra) return lessons;

  // An exchange = one opening turn plus every back-referencing turn after it.
  const runs: SpeakingItem[][] = [];
  for (const item of extra) {
    if (runs.length && REVIEW_BACK_REFERENCE.test(item.guestPrompt.trim()))
      runs[runs.length - 1].push(item);
    else runs.push([item]);
  }

  const buckets: SpeakingItem[][] = lessons.map(() => []);
  let li = 0;
  let placed = 0;
  for (const run of runs) {
    buckets[li].push(...run);
    placed += run.length;
    // Move on once this lesson holds its share, so a long first exchange
    // cannot swallow the whole week.
    if (li < lessons.length - 1 && placed >= Math.round((extra.length * (li + 1)) / lessons.length))
      li++;
  }

  return lessons.map((lesson, i) => ({
    ...lesson,
    speaking: [...lesson.speaking, ...buckets[i]],
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
  const title = DEPT_WEEK_TITLES[`${lx.code}-${week}`] ?? meta;
  return {
    departmentId: lx.code,
    weekNumber: week,
    weekTitleEn: title.en,
    weekTitleVi: title.vi,
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
    const lx: Ctx = { ...base, bank: bankFor(code) };
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
    const lx: Ctx = { ...base, bank: bankFor(code) };
    const prior = priorWordsByDep[code] ?? [];
    for (let w = 15; w <= 22; w++) out[`${code}-${w}`] = buildWeek(lx, w, prior, overrides);
  }
  return out;
}
