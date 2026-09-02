// ============================================================
// PHASE 1 — A1 (weeks 7-14) · docs/curriculum-level-matrix.md
//
// Design rationale (Academic Director notes):
//
// Phase 0 could share ~90% of its language across the six departments
// because numbers, clock times and the alphabet are universal. That
// stops being true at A1, so Phase 1 runs at roughly 70% department-
// specific / 30% shared. The mechanism that makes this affordable —
// and pedagogically stronger than writing six separate courses — is:
//
//   SHARED SENTENCE FRAME  +  DEPARTMENT WORD BANK
//
// Every department drills the same 2-3 frames each week ("The {thing}
// is {adjective}.", "Can I have {thing}?"), but slots its own
// vocabulary into them. That is a substitution drill: the learner
// repeats one structure many times with different content, which is
// how sentence patterns actually become automatic at A1 — and it is
// self-servable at home, since practising means swapping a word into
// a frame you already know. The frames are surfaced to learners on the
// Weekly Handbook page (/handbook/$dep/$week).
//
// Word banks live in ./phase1-lexicon.ts (60 headwords per department).
// The P0 lexicon (staff name, station, department name, service hours)
// is imported rather than restated.
//
// HARD CONSTRAINTS (gated by scripts/verify-content.ts; the bank contract
// is docs/phase0-phase1-bank-contract.md):
//  · Target sentences ≤ 8 words, still ONE clause (P1 row of the matrix).
//  · Every `targetResponse` keeps ≥ 2 words of ≥ 4 letters, or
//    ListeningSuite silently drops its cloze task.
//  · ≤ 1 headword shared with any other department in the same week.
//  · No pre-teaching of vocabulary reserved for that department's
//    A2-B1 weeks in week-content.ts.
//  · 10-12 new headwords per week; graduated `reviewWords` recycling.
//
// Characters: Phase 0 and FO-17 already use David Green and Anna Smith,
// so Phase 1 introduces a fresh cast (Mr. Brooks, Mrs. Ruiz, Mr. Tanaka).
// ============================================================

import type { LessonContent, WeekContent } from "./week-content";
import {
  LEXICONS,
  game,
  g,
  lockWeekHeadwords,
  read,
  sp,
  spread,
  v,
  type P0Lexicon,
} from "./phase0";
import { P1_BANKS, type P1Bank, type P1Word } from "./phase1-lexicon";

type Ctx = P0Lexicon & { bank: P1Bank };

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

/** Turns a bank word into a vocabulary card with a frame-shaped example. */
function bw(w: P1Word, context: string) {
  return v(w.word, w.phonetic, w.definition, context, w.icon);
}
const lower = (w: P1Word) => w.word.toLowerCase();

/** The headword as a FIRST MENTION: "a fork", "an envelope", "some ice".
 *
 *  Week 9 is where the request formula becomes a reflex, and it shipped as
 *  "Can I have the fork?" — well-formed, but wrong for something the guest
 *  has not mentioned before, and wrong in the worst possible place:
 *  Vietnamese has no articles, so whatever this frame drills is what the
 *  learner will say for the rest of the course. Any frame putting a bank
 *  word in a first-mention position must use this, never `lower()` behind a
 *  bare "the". Mass nouns and plurals declare `art: "some"` in the lexicon;
 *  "Uniform" declares "a" because /juː/ is a consonant sound that the
 *  by-spelling default would get wrong. */
const wa = (w: P1Word) => {
  const bare = lower(w);
  const art = w.art ?? (/^[aeiou]/i.test(bare) ? "an" : "a");
  return art === "" ? bare : `${art} ${bare}`;
};

/** Sentence-initial form of a pronoun from lx.pron. Same helper as
 *  phase3.ts/phase4.ts — Phase 1 was the last spine still narrating its own
 *  department persona with a hardcoded pronoun. */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Subject pronoun for a ROLE headword, used where week 7 introduces a
 *  colleague rather than the persona. Unmarked roles read as "she": half the
 *  personas are women and every other narrating pronoun in the course now
 *  comes from lx.pron, so defaulting the other way would put the men back. */
const roleSubj = (w: P1Word) => (w.gender === "m" ? "He" : "She");

/** Third-person singular of a bank verb PHRASE. The -s belongs on the head
 *  verb, not on the end of the phrase: "Check in" → "checks in", "Make the
 *  bed" → "makes the bed". Naive concatenation shipped "He check ins…",
 *  "He make the beds…" and "He send an emails…" as the CORRECT model
 *  sentence in week 11, across all six departments. */
const third = (w: P1Word) => {
  const [head, ...rest] = lower(w).split(" ");
  const s = /(s|sh|ch|x|z|o)$/.test(head) ? "es" : /[^aeiou]y$/.test(head) ? "ies" : "s";
  const stem = s === "ies" ? head.slice(0, -1) : head;
  return [stem + s, ...rest].join(" ");
};

/** Plural of a bank NOUN phrase, for the frames that quantify it: "I need
 *  some taxis." The -s goes on the LAST word, the opposite of `third()`,
 *  so "Sun bed" → "sun beds" and not "suns bed". Words already declaring
 *  `art: "some"` are mass nouns and stay bare — "some papers" means
 *  something else.
 *
 *  Week 9's three "some" frames read `lower()` and so taught "I need some
 *  taxi.", "I need some toothbrush." and "I need some balloon." as the
 *  GUEST's line in the request drill, in five of six departments. The
 *  answer they drill against — "How many do you need, madam?" — only makes
 *  sense after a plural, so the frame had wanted this all along. */
const plural = (w: P1Word) => {
  const bare = lower(w);
  if (w.art === "some") return bare;
  const parts = bare.split(" ");
  const last = parts[parts.length - 1]!;
  const suffix = /(s|sh|ch|x|z)$/.test(last) ? "es" : /[^aeiou]y$/.test(last) ? "ies" : "s";
  parts[parts.length - 1] = (suffix === "ies" ? last.slice(0, -1) : last) + suffix;
  return parts.join(" ");
};

/** A routine verb WITH its object. Week 11's frames are intransitive shells
 *  ("I {v} every day.", "We {v} at {hour}."), and half the routines banks hold
 *  transitive verbs, so Guest Relations taught "We arrange at seven." six times
 *  in one lesson — vocabulary context, grammar model, speaking target, reading
 *  passage and correct game answer. F&B taught "We sometimes refill twice a
 *  day.", Spa "I usually fold first.", Front Office "We print at two."
 *
 *  The object lives on the bank word, not in the headword, so `third()` still
 *  inflects the head verb: "He prints the bill every day." */
const act = (w: P1Word) => (w.obj ? `${lower(w)} ${w.obj}` : lower(w));
const actThird = (w: P1Word) => (w.obj ? `${third(w)} ${w.obj}` : third(w));

/** Comparative form of a bank adjective: "-er" for the short ones, "more …"
 *  for the rest. The week-10 frame hardcoded "more", which is correct for
 *  "important" and wrong for "empty", "bright", "sour" and "tired". */
const cmpOf = (w: P1Word) => w.cmp ?? `more ${lower(w)}`;

// ============================================================
// WEEK 7 — People & Jobs in the Hotel
// FRAMES · "This is {name}. He/She is our {role}."
//         · "I work in {department}."
// ============================================================
function week7(lx: Ctx): LessonContent[] {
  const [r1, r2, r3, r4, r5, r6, r7, r8] = lx.bank.roles;
  return [
    lesson(lx, 7, 1, "Introducing a Colleague", "Giới thiệu đồng nghiệp", {
      vocabulary: [
        v("Colleague", "/ˈkɒliːɡ/", "Đồng nghiệp", "This is my colleague, Hoa.", "🤝"),
        v("Manager", "/ˈmænɪdʒə/", "Quản lý", "She is our manager.", "👔"),
        bw(r1, `This is ${lx.staff}. ${cap(lx.pron.subj)} is our ${lower(r1)}.`),
        bw(r2, `${roleSubj(r2)} is our ${lower(r2)}.`),
      ],
      grammar: [
        g(
          "This my colleague.",
          "This is my colleague, Hoa.",
          "Tiếng Anh cần động từ 'is': THIS IS my colleague. Tiếng Việt bỏ được 'là', tiếng Anh thì không.",
          "This is my colleague, her name Hoa.",
        ),
        g(
          `She our ${lower(r1)}.`,
          `She is our ${lower(r1)}.`,
          "Chủ ngữ + IS + chức danh. Nhớ tính từ sở hữu 'our' trước tên chức danh.",
          `She are our ${lower(r1)}.`,
        ),
      ],
      speaking: [
        sp(
          "Who is this, please?",
          `This is our ${lower(r1)}, sir.`,
          `Công thức: "This is our + chức danh". Thay ${lower(r1)} bằng chức danh bất kỳ để tự luyện ở nhà. 'This' mở đầu bằng /ð/ (lưỡi chạm răng, có rung) và đóng lại bằng /s/ — người Việt hay bỏ mất cả hai đầu.`,
        ),
      ],
      reading: read(
        `A guest meets two staff at ${lx.station}. ${lx.staff} says: "Good morning, sir. This is my colleague. ${roleSubj(r2)} is our ${lower(r2)}."`,
        [
          {
            q: "Người thứ hai làm chức danh gì?",
            options: [r2.definition, r1.definition, "Khách"],
            correct: 0,
            explanation: `${lx.staff} nói "${roleSubj(r2)} is our ${lower(r2)}" — tức ${r2.definition}.`,
          },
          {
            q: "Câu 'This is my colleague' thiếu gì nếu bỏ 'is'?",
            options: ["Thiếu động từ", "Thiếu tên", "Thiếu lời chào"],
            correct: 0,
            explanation: "Câu tiếng Anh bắt buộc có động từ. 'This my colleague' là câu sai.",
          },
        ],
      ),
      game: [
        game(
          "Is she the manager?",
          `No, sir. She is our ${lower(r1)}.`,
          `She our ${lower(r1)}.`,
          "Yes, sir. She is the manager of this hotel.",
          undefined,
          "Câu đó đúng ngữ pháp nhưng sai sự thật: người khách vừa hỏi có một chức danh khác. Gán nhầm chức danh cho đồng nghiệp làm khách tưởng đã tìm đúng người có quyền quyết — và họ sẽ quay lại bực bội khi biết là không.",
        ),
      ],
    }),

    lesson(lx, 7, 2, "The Team on Duty", "Đội ngũ đang trực ca", {
      vocabulary: [
        bw(r3, `Our ${lower(r3)} is here today.`),
        bw(r4, `The ${lower(r4)} starts at eight.`),
        bw(r5, `He is the ${lower(r5)} tonight.`),
      ],
      grammar: [
        g(
          `Today ${lower(r3)} not here.`,
          `The ${lower(r3)} is not here today.`,
          "Phủ định cần 'is not': THE + chức danh + IS NOT + here. Không nói 'not here' trống không.",
          `The ${lower(r3)} is no here today.`,
        ),
        g(
          `Who ${lower(r4)}?`,
          `Who is the ${lower(r4)}?`,
          "Câu hỏi với 'Who' cũng cần 'is': WHO IS the …?",
          `Who the ${lower(r4)} is?`,
        ),
      ],
      speaking: [
        sp(
          "Who is on duty now?",
          `Our ${lower(r3)} is on duty, madam.`,
          "Mẫu 'Our + chức danh + is on duty' dùng được cho mọi ca trực. 'duty' trọng âm âm tiết đầu: DU-ty.",
        ),
      ],
      reading: read(
        `It is Monday. The ${lower(r4)} begins work early. ${lx.staff} says: "Our ${lower(r3)} is on duty today, madam."`,
        [
          {
            q: "Hôm nay ai đang trực?",
            options: [r3.definition, r5.definition, "Không ai"],
            correct: 0,
            explanation: `Câu "Our ${lower(r3)} is on duty today" cho biết ${r3.definition} đang trực.`,
          },
          {
            q: "'On duty' nghĩa là gì?",
            options: [
              "Đang trong ca trực",
              "Đang có mặt ở khách sạn nhưng đã hết ca",
              "Đã nghỉ việc",
            ],
            correct: 0,
            explanation: "'On duty' = đang làm nhiệm vụ, đang trong ca.",
          },
        ],
      ),
      game: [
        game(
          "Is anyone here from your team?",
          `Yes, madam. Our ${lower(r5)} is here.`,
          `Yes, ${lower(r5)} here.`,
          "No, madam. Nobody from my team works today.",
          undefined,
          "Câu đó lễ phép và đúng ngữ pháp, nhưng nó đóng cửa. Khách hỏi có ai ở đây không là đang cần người giúp; trong ca của bạn luôn có ít nhất một đồng nghiệp, nói chức danh người đó ra thì khách biết phải tìm ai.",
        ),
      ],
    }),

    lesson(lx, 7, 3, "Where I Work", "Tôi làm ở bộ phận nào", {
      vocabulary: [
        v("Work", "/wɜːk/", "Làm việc", `I work in ${lx.deptEn}.`, "💼"),
        bw(r6, `Our ${lower(r6)} works here too.`),
      ],
      grammar: [
        g(
          `I work ${lx.deptEn}.`,
          `I work in ${lx.deptEn}.`,
          "Cần giới từ 'in' trước tên bộ phận: I work IN Housekeeping.",
          `I work on ${lx.deptEn}.`,
        ),
        g(
          "He work here.",
          "He works here every day.",
          "Ngôi thứ ba số ít (he/she) thì động từ thêm -s: he WORKS.",
          "He is works here every day.",
        ),
      ],
      speaking: [
        sp(
          "Which department are you in?",
          `I work in ${lx.deptEn}, sir.`,
          "Câu này dùng hằng ngày khi khách hỏi. Học thuộc như một khối. Âm /k/ cuối của 'work' phải bật ra — đừng dừng lại ở nguyên âm.",
        ),
      ],
      reading: read(
        `A new guest asks about the team. ${lx.staff} answers: "I work in ${lx.deptEn}. Our ${lower(r6)} works here too."`,
        [
          {
            q: `${lx.staff} làm ở bộ phận nào?`,
            options: [lx.deptVi, "Bếp", "Bảo vệ"],
            correct: 0,
            explanation: `"I work in ${lx.deptEn}" — tức bộ phận ${lx.deptVi}.`,
          },
          {
            q: "Vì sao viết 'He works' chứ không phải 'He work'?",
            options: [
              "Vì chủ ngữ là ngôi thứ ba số ít",
              "Vì trong tiếng Anh mọi động từ đều thêm -s",
              "Vì số nhiều",
            ],
            correct: 0,
            explanation: "He/She/It + động từ thêm -s ở thì hiện tại đơn.",
          },
        ],
      ),
      game: [
        game(
          "Do you work in the kitchen?",
          `No, sir. I work in ${lx.deptEn}.`,
          `No, I work ${lx.deptEn}.`,
          "Yes, I work in the kitchen.",
          undefined,
          "Đúng ngữ pháp, sai sự thật. Nhận mình ở một bộ phận không phải của mình là khách sẽ hỏi bạn những việc bạn không làm được. Nói 'no' rồi nói NGAY bộ phận thật thì khách không mất thêm một lượt hỏi nào.",
        ),
      ],
    }),

    lesson(lx, 7, 4, "Asking a Colleague for Help", "Nhờ đồng nghiệp giúp", {
      vocabulary: [
        bw(r7, `Please ask our ${lower(r7)}.`),
        bw(r8, `The ${lower(r8)} finishes at ten.`),
      ],
      grammar: [
        g(
          `You ask ${lower(r7)}.`,
          `Please ask our ${lower(r7)}.`,
          "Thêm 'Please' để câu thành lời nhờ, không thành mệnh lệnh.",
          `Please you ask our ${lower(r7)}.`,
        ),
        g(
          "I no know.",
          "I am not sure, sir.",
          "Không nói 'I no know'. Câu lịch sự khi chưa rõ là 'I am not sure' rồi hứa đi hỏi.",
          "I am no sure, sir.",
        ),
      ],
      speaking: [
        sp(
          "Can you help me with this?",
          `I am not sure. I will ask our ${lower(r7)}.`,
          "Không biết thì nói thật rồi hứa hành động — đừng đoán bừa với khách. Từ 'ask' kết thúc bằng cụm /sk/: nghe được cả hai âm, đừng thành 'át'.",
        ),
      ],
      reading: read(
        `A guest asks a difficult question. ${lx.staff} says: "I am not sure, sir. I will ask our ${lower(r7)}." The guest says: "Thank you."`,
        [
          {
            q: "Khi chưa biết câu trả lời, nên làm gì?",
            options: [
              "Nói chưa chắc và đi hỏi người phụ trách",
              "Trả lời theo phỏng đoán cho khách khỏi phải chờ",
              "Im lặng bỏ đi",
            ],
            correct: 0,
            explanation:
              "Nói thật và hứa hành động giữ được uy tín; đoán bừa gây sai thông tin cho khách.",
          },
          {
            q: "Câu nào lịch sự hơn?",
            options: ["I am not sure.", "I no know.", "I don't care."],
            correct: 0,
            explanation: "'I am not sure' là cách nói chuẩn mực và đúng ngữ pháp.",
          },
        ],
      ),
      game: [
        game(
          "I have a special request.",
          `One moment. I will ask our ${lower(r8)}.`,
          `I ask ${lower(r8)}.`,
          "I am sorry, madam. We do not do that here.",
          undefined,
          "Câu đó lịch sự nhưng từ chối một yêu cầu bạn còn chưa nghe hết. Ở trình độ này, câu an toàn luôn là hoãn lại và hỏi người có quyền quyết — 'I will ask…' giữ cửa mở mà chưa hứa gì.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 8 — Places & Directions
// FRAMES · "The {place} is on the {position}."
//         · "There is a {place} near the {place}."
// ============================================================
function week8(lx: Ctx): LessonContent[] {
  const [p1, p2, p3, p4, p5, p6, p7, p8] = lx.bank.places;
  return [
    lesson(lx, 8, 1, "Left, Right & Straight", "Bên trái, bên phải & đi thẳng", {
      vocabulary: [
        v("Left", "/left/", "Bên trái", "It is on the left.", "⬅️"),
        v("Right", "/raɪt/", "Bên phải", "It is on the right.", "➡️"),
        bw(p1, `The ${lower(p1)} is on the left.`),
        bw(p2, `The ${lower(p2)} is on the right.`),
      ],
      grammar: [
        g(
          `${p1.word} left.`,
          `The ${lower(p1)} is on the left.`,
          "Đủ ba phần: THE + nơi chốn + IS ON THE + hướng. Thiếu 'the' hoặc 'is' là câu sai.",
          `The ${lower(p1)} is on left.`,
        ),
        g(
          "Go straight there.",
          "Please go straight ahead.",
          "Chỉ đường đi thẳng nói 'go straight ahead', thêm 'Please' cho lịch sự.",
          "Please go to straight ahead.",
        ),
      ],
      speaking: [
        sp(
          `Excuse me, where is the ${lower(p1)}?`,
          `The ${lower(p1)} is on the left, sir.`,
          "Khung câu vàng của tuần này. Thay tên nơi chốn để tự luyện tại nhà. Từ 'left' đóng bằng cụm /ft/ — phải nghe cả /f/ lẫn /t/, đừng thành 'lép'.",
        ),
      ],
      reading: read(
        `A guest looks for the ${lower(p1)}. ${lx.staff} points and says: "The ${lower(p1)} is on the left, madam. Please go straight ahead."`,
        [
          {
            q: `${p1.definition} nằm ở phía nào?`,
            options: ["Bên trái", "Bên phải", "Phía sau"],
            correct: 0,
            explanation: `"on the left" nghĩa là bên trái.`,
          },
          {
            q: "Chỉ đường nên kèm cử chỉ nào?",
            options: ["Bàn tay mở hướng dẫn", "Ngón trỏ chỉ thẳng", "Không cần cử chỉ"],
            correct: 0,
            explanation: "Chuẩn dịch vụ 5 sao: dùng cả bàn tay mở, không chỉ trỏ bằng một ngón.",
          },
        ],
      ),
      game: [
        game(
          `Is the ${lower(p2)} this way?`,
          `Yes, madam. It is on the right.`,
          `${p2.word} right yes.`,
          "No, madam. It is on the left, near the lift.",
          undefined,
          "Đúng ngữ pháp nhưng chỉ ngược hướng: khách đang đi đúng đường và câu này bắt họ quay lại. Nghe kỹ 'this way' — khi khách đi đúng, việc của bạn chỉ là xác nhận rồi thêm một chi tiết cho chắc.",
        ),
      ],
    }),

    lesson(lx, 8, 2, "Near, Next To & Behind", "Gần, kế bên & phía sau", {
      vocabulary: [
        v("Near", "/nɪə/", "Gần", `It is near the ${lower(p3)}.`, "📍"),
        bw(p3, `The ${lower(p3)} is near the lift.`),
        bw(p4, `The ${lower(p4)} is next to it.`),
      ],
      grammar: [
        g(
          `${p3.word} near lift.`,
          `The ${lower(p3)} is near the lift.`,
          "Giới từ chỉ vị trí luôn đi với 'the': near THE lift, next to THE door.",
          `The ${lower(p3)} is near to the lift.`,
        ),
        g(
          `Have a ${lower(p4)} here.`,
          `There is a ${lower(p4)} here.`,
          "Nói 'có một cái gì đó' dùng 'There is', không dùng 'Have'.",
          `There have a ${lower(p4)} here.`,
        ),
      ],
      speaking: [
        sp(
          `Is there a ${lower(p4)} here?`,
          `Yes, there is one near the lift.`,
          "'There is' = 'có'. Đây là cấu trúc quan trọng nhất tuần này. 'there' mở đầu bằng /ð/ — lưỡi chạm răng và có rung, đừng để thành de hay ze.",
        ),
      ],
      reading: read(
        `${lx.staff} explains the area: "There is a ${lower(p4)} near the lift, sir. The ${lower(p3)} is next to it."`,
        [
          {
            q: `${p3.definition} nằm ở đâu?`,
            options: [`Kế bên ${p4.definition.toLowerCase()}`, "Ở tầng trên", "Ngoài bãi xe"],
            correct: 0,
            explanation: `"next to it" — kế bên ${p4.definition.toLowerCase()} vừa nhắc.`,
          },
          {
            q: "Cấu trúc nào dùng để nói 'có một…'?",
            options: ["There is a…", "Have a…", "It has a…"],
            correct: 0,
            explanation: "'There is a…' là cách nói sự tồn tại trong tiếng Anh.",
          },
        ],
      ),
      game: [
        game(
          "Excuse me, is there a lift near here?",
          `Yes, sir. It is next to the ${lower(p3)}.`,
          `Have lift there.`,
          `No, sir. There is no lift in this building.`,
          undefined,
          "Câu đó đúng ngữ pháp nhưng nói toà nhà không có thang máy, và khách sẽ xách vali đi thang bộ. Khi thứ khách hỏi có thật, việc của bạn là nói nó Ở CẠNH cái gì để khách tự tìm được.",
        ),
      ],
    }),

    lesson(lx, 8, 3, "Upstairs & Downstairs", "Tầng trên & tầng dưới", {
      vocabulary: [
        v("Upstairs", "/ˌʌpˈsteəz/", "Tầng trên", "The gym is upstairs.", "⬆️"),
        bw(p5, `The ${lower(p5)} is upstairs.`),
        bw(p6, `The ${lower(p6)} is downstairs.`),
      ],
      grammar: [
        g(
          `${p5.word} up floor.`,
          `The ${lower(p5)} is upstairs.`,
          "'Upstairs' và 'downstairs' đã đủ nghĩa, không cần thêm 'floor' phía sau.",
          `The ${lower(p5)} is upstairs floor.`,
        ),
        g(
          `Where ${lower(p6)}?`,
          `Where is the ${lower(p6)}?`,
          "Câu hỏi 'Where' cần 'is' và 'the': WHERE IS THE …?",
          `Where is ${lower(p6)}?`,
        ),
      ],
      speaking: [
        sp(
          `Where is the ${lower(p6)}?`,
          `It is downstairs, near the lobby.`,
          "Trả lời hai lớp thông tin: tầng nào + gần cái gì. Khách dễ hình dung hơn. Từ 'downstairs' trọng âm rơi vào STAIRS, và âm /z/ cuối phải rung.",
        ),
      ],
      reading: read(
        `A guest cannot find the ${lower(p5)}. ${lx.staff} says: "It is upstairs, madam. The ${lower(p6)} is downstairs."`,
        [
          {
            q: `${p5.definition} ở tầng nào?`,
            options: ["Tầng trên", "Tầng dưới", "Cùng tầng"],
            correct: 0,
            explanation: "'Upstairs' nghĩa là tầng trên.",
          },
          {
            q: "'Downstairs' nghĩa là gì?",
            options: ["Tầng dưới", "Tầng trên", "Ngoài trời"],
            correct: 0,
            explanation: "up = lên, down = xuống; downstairs = tầng dưới.",
          },
        ],
      ),
      game: [
        game(
          `Is the ${lower(p5)} on this floor?`,
          "No, madam. It is upstairs.",
          "No, up floor.",
          "Yes, it is this floor.",
          undefined,
          "Hai chỗ hỏng trong một câu ngắn: sai sự thật, nên khách đi tìm khắp tầng này; và thiếu giới từ — phải là 'on this floor'. Câu đúng chỉ cần một từ, vì 'upstairs' đã mang sẵn nghĩa tầng trên.",
        ),
      ],
    }),

    lesson(lx, 8, 4, "Taking the Guest There", "Dẫn khách tới nơi", {
      vocabulary: [
        bw(p7, `Let me show you the ${lower(p7)}.`),
        bw(p8, `The ${lower(p8)} is over there.`),
      ],
      grammar: [
        g(
          `I bring you ${lower(p7)}.`,
          `Let me show you the ${lower(p7)}.`,
          "Dẫn khách đi dùng 'Let me show you' — lịch sự và chuẩn mực hơn 'I bring you'.",
          `Let me to show you the ${lower(p7)}.`,
        ),
        g(
          `${p8.word} there.`,
          `The ${lower(p8)} is over there.`,
          "'Over there' = đằng kia. Vẫn cần 'The … is' ở đầu câu.",
          `The ${lower(p8)} it is over there.`,
        ),
      ],
      speaking: [
        sp(
          `Could you take me there?`,
          `Of course. Let me show you.`,
          "Khách nhờ dẫn đường thì đi cùng, đừng chỉ tay rồi thôi. Từ 'course' đóng bằng /s/ — đừng nuốt mất âm cuối.",
        ),
      ],
      reading: read(
        `The guest cannot find the way. ${lx.staff} smiles: "Let me show you, sir. The ${lower(p8)} is over there." They walk together.`,
        [
          {
            q: "Nhân viên làm gì để giúp khách?",
            options: ["Dẫn khách đi cùng", "Chỉ tay rồi quay đi", "Bảo khách tự tìm"],
            correct: 0,
            explanation: "'Let me show you' kèm việc đi cùng khách là chuẩn dịch vụ.",
          },
          {
            q: "'Over there' nghĩa là gì?",
            options: ["Đằng kia", "Ở đây", "Trên lầu"],
            correct: 0,
            explanation: "'Over there' chỉ nơi xa hơn, thường kèm cử chỉ tay.",
          },
        ],
      ),
      game: [
        game(
          "I am lost. Can you help?",
          "Of course, sir. Let me show you.",
          "I show you go.",
          "Of course, sir. It is just over there.",
          undefined,
          "Câu đó đúng ngữ pháp và nghe rất tự nhiên — nhưng khách vừa nói họ LẠC. 'Over there' chỉ có nghĩa với người biết mình đang đứng ở đâu. Với khách lạc đường, dẫn đi mới là câu giải quyết được việc.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 9 — Simple Guest Requests
// FRAMES · guest: "Can I have {thing}?"
//         · staff: "Of course. I will bring {thing}."
// ============================================================
function week9(lx: Ctx): LessonContent[] {
  const [q1, q2, q3, q4, q5, q6, q7, q8] = lx.bank.requests;
  return [
    lesson(lx, 9, 1, "Can I Have…?", "Khách xin đồ: Can I have…?", {
      vocabulary: [
        v("Need", "/niːd/", "Cần", `I need ${wa(q1)}.`, "🙋"),
        v("Another", "/əˈnʌðə/", "Thêm một cái nữa", "Another one, please.", "➕"),
        bw(q1, `Can I have ${wa(q1)}?`),
        bw(q2, `Here is your ${lower(q2)}.`),
      ],
      grammar: [
        g(
          `I want ${lower(q1)}.`,
          `Can I have ${wa(q1)}?`,
          "Khách lịch sự hỏi 'Can I have…?'. Nhân viên cần NGHE HIỂU mẫu này để đáp đúng.",
          `Can I to have ${wa(q1)}?`,
        ),
        g(
          `I bring ${lower(q1)}.`,
          `Of course. I will bring one.`,
          "Nhận lời dùng 'Of course' + hứa hành động với 'will'.",
          "Of course. I will bringing one.",
        ),
      ],
      speaking: [
        sp(
          `Can I have ${wa(q1)}, please?`,
          `Of course. I will bring one.`,
          "Câu đáp vạn năng của tuần này — dùng được với mọi món khách xin. Từ 'bring' có cụm /br/ ở đầu và /ŋ/ ở cuối: miệng vẫn mở khi kết thúc.",
        ),
      ],
      reading: read(
        `A guest needs something. He asks: "Can I have ${wa(q1)}?" ${lx.staff} answers: "Of course, sir. I will bring one."`,
        [
          {
            q: "Khách xin cái gì?",
            options: [q1.definition, q2.definition, "Không xin gì"],
            correct: 0,
            explanation: `Khách nói "Can I have ${wa(q1)}?"`,
          },
          {
            q: "Câu đáp nào đúng chuẩn dịch vụ?",
            options: [
              "Of course. I will bring one.",
              "Of course. You can come and get it.",
              "I bring.",
            ],
            correct: 0,
            explanation: "Nhận lời + hứa hành động cụ thể là mẫu đáp chuẩn.",
          },
        ],
      ),
      game: [
        game(
          "Could I get another one, please?",
          `Certainly, madam. One moment.`,
          "Yes, another you.",
          "Yes, that is extra.",
          undefined,
          "Câu đó biến một yêu cầu nhỏ thành chuyện tiền nong ngay lập tức, và cụt đến mức nghe như từ chối. Nhận lời trước rồi xin một chút thời gian; chuyện tính thêm tiền là việc của hoá đơn, không phải của câu này.",
        ),
      ],
    }),

    lesson(lx, 9, 2, "How Many Do You Need?", "Hỏi khách cần bao nhiêu", {
      vocabulary: [bw(q3, `Some ${plural(q3)}, please.`), bw(q4, `Do you need ${wa(q4)}?`)],
      grammar: [
        g(
          "How many?",
          "How many do you need, sir?",
          "Câu hỏi đầy đủ cần 'do you need'. Hỏi cụt 'How many?' nghe thiếu tôn trọng.",
          "How many you need, sir?",
        ),
        g(
          `You need ${lower(q4)}?`,
          `Do you need ${wa(q4)}, sir?`,
          "Câu hỏi Yes/No bắt đầu bằng 'Do you…?', không chỉ lên giọng cuối câu.",
          `Do you needs ${wa(q4)}, sir?`,
        ),
      ],
      speaking: [
        sp(
          `I need some ${plural(q3)}.`,
          `How many do you need, madam?`,
          "Luôn hỏi rõ số lượng trước khi đi lấy — tránh phải đi lại hai lần. Từ 'need' có /d/ cuối; bỏ nó đi thì thành knee, nghĩa khác hẳn.",
        ),
      ],
      reading: read(
        `The guest asks for ${plural(q3)}. ${lx.staff} asks: "How many do you need, madam?" She answers: "Two, please."`,
        [
          {
            q: "Khách cần mấy cái?",
            options: ["Hai", "Một", "Ba"],
            correct: 0,
            explanation: `Khách trả lời "Two, please."`,
          },
          {
            q: "Vì sao nên hỏi số lượng trước?",
            options: ["Để không phải đi lại hai lần", "Để khách chờ lâu", "Để tính thêm tiền"],
            correct: 0,
            explanation: "Xác nhận số lượng ngay là kỹ năng hiệu suất cơ bản.",
          },
        ],
      ),
      game: [
        game(
          // q4 is the slot for what the hotel SETS UP on request — a wake-up
          // call, an extra bed, a baby cot. "I will bring it now" is not what
          // you do with any of them, so this round asks about q1, the slot the
          // bank contract reserves for something you can carry in one hand.
          `Do you have ${wa(q1)}?`,
          `Yes, sir. I will bring one now.`,
          `Yes, have ${lower(q1)}.`,
          `Yes, sir. You can come and get it yourself.`,
          undefined,
          "Đúng ngữ pháp, sai nghề. Khách hỏi 'bạn có không' là đang nhờ mang tới. Đẩy khách tự đi lấy là bỏ đúng phần việc của mình — câu đúng nhận lời rồi hứa hành động bằng 'will'.",
        ),
      ],
    }),

    lesson(lx, 9, 3, "When Will It Come?", "Bao lâu thì có?", {
      vocabulary: [bw(q5, `Your ${lower(q5)} is coming.`), bw(q6, `I will bring ${wa(q6)}.`)],
      grammar: [
        g(
          `Five minute.`,
          `In five minutes, sir.`,
          "Cần 'In' trước khoảng thời gian và -s ở 'minutes': IN five minuteS.",
          "In five minute, sir.",
        ),
        g(
          `It come now.`,
          `It is coming now, madam.`,
          "Việc đang xảy ra dùng 'is coming' (hiện tại tiếp diễn).",
          "It is come now, madam.",
        ),
      ],
      speaking: [
        sp(
          `How long will it take?`,
          `In five minutes, madam.`,
          "Luôn cho khách một mốc thời gian cụ thể, đừng nói 'soon' chung chung. Từ 'minutes' trọng âm ở đầu và đóng bằng cụm /ts/: MI-nits, không phải mi-NÚT.",
        ),
      ],
      reading: read(
        `A guest wants a ${lower(q5)}. ${lx.staff} says: "Of course, madam. In five minutes." The ${lower(q5)} arrives on time.`,
        [
          {
            q: "Bao lâu thì đồ được mang tới?",
            options: ["Năm phút", "Một giờ", "Ngày mai"],
            correct: 0,
            explanation: `Nhân viên nói "In five minutes."`,
          },
          {
            q: "Vì sao nên nói mốc thời gian cụ thể?",
            options: ["Để khách yên tâm chờ", "Để khách không hỏi lại lần nữa", "Để khỏi phải làm"],
            correct: 0,
            explanation: "Cam kết thời gian rõ ràng giúp khách yên tâm và tạo lòng tin.",
          },
        ],
      ),
      game: [
        game(
          `Is my ${lower(q6)} ready?`,
          `Almost, sir. In five minutes.`,
          `Five minute yes.`,
          `I am not sure, sir. Maybe later today.`,
          undefined,
          "Câu đó không sai ngữ pháp nhưng không cho khách con số nào để chờ. 'Maybe later today' biến việc năm phút thành cả buổi trong đầu khách. Luôn đưa một mốc cụ thể; nếu chưa chắc thì hứa đi kiểm rồi báo lại.",
        ),
      ],
    }),

    lesson(lx, 9, 4, "Sorry, We Do Not Have It", "Khi không có thứ khách cần", {
      vocabulary: [bw(q7, `We have no ${lower(q7)} today.`), bw(q8, `Would you like ${wa(q8)}?`)],
      grammar: [
        g(
          `No have.`,
          `I am sorry, we do not have it.`,
          "Phủ định lịch sự: xin lỗi trước, rồi 'we do not have it'. Không nói cụt 'No have'.",
          "I am sorry, we do not have.",
        ),
        g(
          `You want ${lower(q8)}?`,
          `Would you like ${wa(q8)}?`,
          "Đề nghị lịch sự dùng 'Would you like…?' thay cho 'You want…?'.",
          `Do you would like ${wa(q8)}?`,
        ),
      ],
      speaking: [
        sp(
          `Do you have ${wa(q7)}?`,
          `I am sorry. Would you like ${wa(q8)}?`,
          "Hết đồ thì xin lỗi và đề xuất phương án thay thế — đừng chỉ nói 'không có'. Cụm 'Would you' nối liền thành /ˈwʊdʒu/ — người bản xứ không đọc tách rời từng từ.",
        ),
      ],
      reading: read(
        `We have no ${lower(q7)} today. ${lx.staff} says: "I am sorry, sir. Would you like ${wa(q8)}?" The guest says: "Yes, please."`,
        [
          {
            q: "Khi hết đồ khách cần, nên làm gì?",
            options: [
              "Xin lỗi và đề xuất phương án khác",
              "Nói hết rồi và để khách tự tìm chỗ khác",
              "Bỏ đi",
            ],
            correct: 0,
            explanation: "Xin lỗi + đề xuất thay thế giữ được trải nghiệm của khách.",
          },
          {
            q: "Câu đề nghị nào lịch sự nhất?",
            options: ["Would you like…?", "You want…?", "Take this."],
            correct: 0,
            explanation: "'Would you like…?' là mẫu đề nghị chuẩn mực trong khách sạn.",
          },
        ],
      ),
      game: [
        game(
          `I would like ${wa(q7)}.`,
          `I am sorry, madam. We have none today.`,
          `No ${lower(q7)} have.`,
          "I am sorry, madam. Please ask somebody else.",
          undefined,
          "Có xin lỗi nhưng vẫn là đá quả bóng đi. Khách không biết 'somebody else' là ai, và họ sẽ kể lại đúng câu này khi phàn nàn. Nói thẳng là hôm nay hết, rồi mời thứ thay thế nếu có.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 10 — Describing Things & States
// FRAMES · "The {thing} is {adjective}."
//         · "It is too {adjective}."
// ============================================================
function week10(lx: Ctx): LessonContent[] {
  const [s1, s2, s3, s4, s5, s6, s7, s8] = lx.bank.states;
  const [i1, i2] = lx.items;
  return [
    lesson(lx, 10, 1, "It Is + Adjective", "Mô tả bằng 'It is + tính từ'", {
      vocabulary: [
        v("Very", "/ˈveri/", "Rất", `It is very ${lower(s1)}.`, "⬆️"),
        bw(s1, `The room is ${lower(s1)}.`),
        bw(s2, `It is quite ${lower(s2)}.`),
        bw(s3, `It is ${lower(s3)} today.`),
      ],
      grammar: [
        g(
          `Room ${lower(s1)}.`,
          `The room is ${lower(s1)}.`,
          "Cần 'The' và 'is': THE room IS + tính từ. Đây là mẫu câu lõi của tuần.",
          `The room has ${lower(s1)}.`,
        ),
        g(
          `Very much ${lower(s1)}.`,
          `It is very ${lower(s1)}.`,
          "'Very' đứng ngay trước tính từ: very clean, very busy. Không nói 'very much + tính từ'.",
          `It is very much ${lower(s1)}.`,
        ),
      ],
      speaking: [
        sp(
          "How is the room today?",
          `It is very ${lower(s1)}, madam.`,
          "Khung câu vàng: 'It is very + tính từ'. Thay tính từ khác để tự luyện. Từ 'very' mở đầu bằng /v/ — răng trên chạm môi dưới, đừng thành 'be-ry'.",
        ),
      ],
      reading: read(
        `A guest asks about the room. ${lx.staff} answers: "It is very ${lower(s1)}, madam. It is quite ${lower(s2)} too."`,
        [
          {
            q: "Phòng được mô tả thế nào?",
            options: [`Rất ${s1.definition.toLowerCase()}`, "Rất bẩn", "Không rõ"],
            correct: 0,
            explanation: `"It is very ${lower(s1)}" — rất ${s1.definition.toLowerCase()}.`,
          },
          {
            q: "'Very' đứng ở đâu trong câu?",
            options: ["Ngay trước tính từ", "Sau tính từ, ở cuối câu", "Đầu câu"],
            correct: 0,
            explanation: "very + tính từ: very clean, very busy, very quiet.",
          },
        ],
      ),
      game: [
        game(
          // Was "How is the weather today?", and states[2] is the bank of
          // adjectives for the department's own things: Spa answered it with
          // "It is very strong, sir."
          "How is it here today?",
          `It is very ${lower(s3)}, sir.`,
          `Very much ${lower(s3)}.`,
          `I do not know, sir. I only work here.`,
          undefined,
          "Đúng ngữ pháp, và nghe như một câu vô hại — nhưng câu ấy nói với khách rằng bạn không định trả lời. Khách hỏi han về chỗ mình đang đứng là đang bắt chuyện; một câu bằng đúng tính từ tuần này là đủ, và nó mở ra cả cuộc trò chuyện.",
        ),
      ],
    }),

    lesson(lx, 10, 2, "Too Much: Using 'Too'", "Diễn đạt 'quá' với 'too'", {
      vocabulary: [
        v("Too", "/tuː/", "Quá (mức, mang nghĩa tiêu cực)", `It is too ${lower(s4)}.`, "⚠️"),
        bw(s4, `It is too ${lower(s4)} now.`),
        bw(s5, `It is a little ${lower(s5)}.`),
      ],
      grammar: [
        g(
          `Very very ${lower(s4)}.`,
          `It is too ${lower(s4)}, sir.`,
          "'Too' mang nghĩa quá mức gây khó chịu; 'very' chỉ là nhấn mạnh. Khách phàn nàn thường dùng 'too'.",
          `It is too much ${lower(s4)}, sir.`,
        ),
        g(
          `Little bit ${lower(s5)}.`,
          `It is a little ${lower(s5)}.`,
          "Đúng cụm là 'a little' + tính từ.",
          `It is little ${lower(s5)}.`,
        ),
      ],
      speaking: [
        sp(
          `This is too ${lower(s4)}.`,
          `I am sorry. I will change it.`,
          "Nghe 'too + tính từ' là khách đang phàn nàn — phải xin lỗi và hành động ngay. Từ 'change' mở bằng /tʃ/ và đóng bằng /dʒ/: hai âm khác nhau, đừng cụt thành 'chen'.",
        ),
      ],
      reading: read(
        `The guest says: "This is too ${lower(s4)}." ${lx.staff} answers at once: "I am very sorry, sir. I will change it now."`,
        [
          {
            q: "'Too' khác 'very' ở điểm nào?",
            options: [
              "'Too' mang nghĩa quá mức, gây khó chịu",
              "Hai từ giống hệt nhau",
              "'Too' nghĩa là rất tốt",
            ],
            correct: 0,
            explanation: "very hot = rất nóng (bình thường); too hot = nóng quá (có vấn đề).",
          },
          {
            q: "Nghe khách nói 'too…' thì nên làm gì?",
            options: [
              "Xin lỗi và xử lý ngay",
              "Giải thích vì sao ở đây vẫn bình thường",
              "Nói khách quen dần",
            ],
            correct: 0,
            explanation: "'Too + tính từ' là tín hiệu phàn nàn, cần phản ứng ngay.",
          },
        ],
      ),
      game: [
        game(
          `The room is too ${lower(s4)} for me.`,
          "I am sorry, madam. I will check it.",
          `Too ${lower(s4)} yes.`,
          "That is normal here, madam. Everybody says so.",
          undefined,
          "Câu đó không sai ngữ pháp nhưng nói với khách rằng cảm giác của họ không đáng kể. 'Everybody says so' là câu biến một lời phàn nàn nhỏ thành một đánh giá một sao. Xin lỗi rồi hứa đi kiểm.",
        ),
      ],
    }),

    lesson(lx, 10, 3, "Comparing Two Things", "So sánh hai thứ", {
      // "more" was hardcoded here, so a one-syllable bank word shipped as
      // "This one is more empty." (FO) and "more bright." (HK). cmpOf() reads
      // the form the lexicon declares and falls back to "more …".
      vocabulary: [
        bw(s6, `This one is ${lower(s6)}. That one is ${cmpOf(s6)}.`),
        bw(s7, `This one is ${lower(s7)}.`),
      ],
      grammar: [
        g(
          `This good, that no good.`,
          `This one is better, sir.`,
          "So sánh dùng 'better' (tốt hơn). Không ghép 'good/no good' theo lối tiếng Việt.",
          "This one is more better, sir.",
        ),
        g(
          `Same same.`,
          `They are the same, madam.`,
          "'Same same' không phải tiếng Anh. Câu đúng là 'They are the same'.",
          "They are same, madam.",
        ),
      ],
      speaking: [
        sp(
          "Which one is better?",
          `This one is better, madam.`,
          "Trả lời dứt khoát rồi mới giải thích — khách cần lời khuyên, không cần vòng vo. Từ 'better' trọng âm âm tiết đầu: BET-ter.",
        ),
      ],
      // The comparative belongs to the GUEST, not to the recommendation. It
      // read `"This one is better, madam. It is ${cmpOf(s6)}."`, which asserts
      // that more of s6 is what makes a thing better — true for "brighter",
      // false for "more sour" (FB), "more expensive" (BO) and meaningless for
      // "more important" (GR). The slot has no declared polarity and cannot
      // have one, so no frame may lean on it.
      reading: read(
        `A guest compares two things. ${lx.staff} says: "This one is better, madam." The guest looks and says: "That one is ${cmpOf(s6)}." The guest chooses the first one.`,
        [
          {
            q: "Nhân viên khuyên chọn cái nào?",
            options: ["Cái này", "Cái kia", "Không khuyên"],
            correct: 0,
            explanation: `"This one is better" — khuyên chọn cái này.`,
          },
          {
            q: "'Same same' có đúng tiếng Anh không?",
            options: [
              "Không, phải nói 'They are the same'",
              "Có, dùng bình thường",
              "Có, khách nước ngoài ở Việt Nam đều hiểu",
            ],
            correct: 0,
            explanation: "'Same same' là lỗi lặp từ phổ biến của người Việt.",
          },
        ],
      ),
      game: [
        game(
          "Are these two the same?",
          "They are the same, madam.",
          "Same same, madam.",
          "Yes, madam. This one is much better.",
          undefined,
          "Câu đó tự mâu thuẫn: nói 'yes' (giống nhau) rồi lại bảo cái này tốt hơn. Khách hỏi so sánh thì chọn đúng một trong hai — giống nhau, hoặc cái nào hơn — chứ không nói cả hai trong một câu.",
        ),
      ],
    }),

    lesson(lx, 10, 4, "Describing a Problem", "Mô tả tình trạng có vấn đề", {
      vocabulary: [bw(s8, `Careful, the floor is ${lower(s8)}.`)],
      grammar: [
        g(
          `Careful ${lower(s8)}!`,
          `Please be careful. It is ${lower(s8)}.`,
          "Cảnh báo lịch sự: 'Please be careful' rồi mới nói lý do.",
          `Please careful. It is ${lower(s8)}.`,
        ),
        g("Not good this.", "This is not good, sir.", "Trật tự đúng: chủ ngữ + is not + tính từ."),
      ],
      speaking: [
        sp(
          "Is it safe here?",
          `Please be careful. It is ${lower(s8)}.`,
          "Cảnh báo an toàn phải nói trước, giải thích sau — an toàn khách là ưu tiên số một. Từ 'careful' trọng âm ở đầu: CARE-ful, và âm /l/ cuối phải chạm lưỡi lên vòm.",
        ),
      ],
      reading: read(
        `${lx.staff} sees a risk and warns the guest: "Please be careful, madam. It is ${lower(s8)}." The guest walks slowly.`,
        [
          {
            q: "Nhân viên cảnh báo điều gì?",
            options: [s8.definition, "Trời mưa", "Hết phòng"],
            correct: 0,
            explanation: `"It is ${lower(s8)}" — cảnh báo về ${s8.definition.toLowerCase()}.`,
          },
          {
            q: "Thứ tự đúng khi cảnh báo là gì?",
            options: [
              "Cảnh báo trước, giải thích sau",
              "Giải thích dài rồi mới cảnh báo",
              "Không cần cảnh báo",
            ],
            correct: 0,
            explanation: "An toàn là ưu tiên: nói 'Please be careful' ngay lập tức.",
          },
        ],
      ),
      game: [
        game(
          "Can I walk here?",
          `Please be careful, sir. It is ${lower(s8)}.`,
          `Careful ${lower(s8)}!`,
          "Yes, sir. You can walk here, it is fine.",
          undefined,
          "Đây là câu nguy hiểm nhất trong bài: nó đúng ngữ pháp và cho phép khách đi vào chỗ bạn vừa được dạy là có rủi ro. Khi sàn hay lối đi có vấn đề, lời cảnh báo phải đi TRƯỚC lời cho phép.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 11 — Schedules & Shift Routines
// FRAMES · "I {verb} the {thing} every day."
//         · "We {verb} at {time}."
// ============================================================
function week11(lx: Ctx): LessonContent[] {
  const [t1, t2, t3, t4, t5, t6, t7, t8] = lx.bank.routines;
  return [
    lesson(lx, 11, 1, "Every Day at Work", "Công việc hằng ngày", {
      vocabulary: [
        v("Every day", "/ˈevri deɪ/", "Mỗi ngày", `I ${act(t1)} every day.`, "📅"),
        v("Always", "/ˈɔːlweɪz/", "Luôn luôn", "I always check the room.", "🔁"),
        bw(t1, `I ${act(t1)} every morning.`),
        bw(t2, `We ${act(t2)} after breakfast.`),
      ],
      grammar: [
        g(
          // No "it": the routines bank holds complete verb phrases ("Make the
          // bed", "Check in", "Send an email"), so the frame's own object
          // produced "I make the bed it every day." for four of six
          // departments — as the sentence the learner is told is correct.
          // The rude half used to be `Every day I …`, which is correct English —
          // a fronted time adverbial — and the paper marked it wrong, then the
          // reading question marked "sentence-initial" wrong too, and the
          // handbook printed it in red. The real error a Vietnamese learner
          // makes here is the one-word adjective for the two-word adverbial.
          `I ${act(t1)} everyday.`,
          `I ${act(t1)} every day.`,
          "Hai chữ 'every day' = mỗi ngày (trạng ngữ). Một chữ 'everyday' = thường ngày (tính từ), không dùng thay được.",
          `I everyday ${act(t1)}.`,
        ),
        g(
          // Same trap as the pair above, twice over: the -s was concatenated
          // onto the END of a verb phrase and the frame added an object the
          // phrase already carries, so "Check in" / "Make the bed" / "Send an
          // email" came out as "He check ins the room every day.", "He make
          // the beds the room every day.", "He send an emails the room every
          // day." — all six departments, in the sentence marked correct.
          // third() puts the -s on the head verb; the object stays in the
          // bank word where it belongs.
          `He ${act(t1)} every day.`,
          `He ${actThird(t1)} every day.`,
          "Ngôi thứ ba số ít thêm -s vào ĐỘNG TỪ CHÍNH: he checks in, he makes the bed.",
          `He is ${act(t1)} every day.`,
        ),
      ],
      speaking: [
        // A guest does not interview a room attendant about her routine. Week
        // 11 is the shift, so the person asking is the new colleague being
        // shown the ropes — and `speakerRole` has existed for that all along.
        sp(
          "What do you do first?",
          `I ${act(t1)} every day.`,
          "Mẫu 'I + động từ + tân ngữ + every day' — khung mô tả công việc thường ngày. Từ 'every' đọc hai âm tiết: EV-ry, không phải e-vơ-ri.",
          "colleague",
        ),
      ],
      reading: read(
        `${lx.staff} briefs a new colleague: "I ${act(t1)} every morning. We ${act(t2)} after breakfast."`,
        [
          {
            q: "Việc đầu tiên trong ngày là gì?",
            options: [t1.definition, t2.definition, "Nghỉ trưa"],
            correct: 0,
            explanation: `"I ${act(t1)} every morning" — việc làm mỗi sáng.`,
          },
          {
            q: "Viết 'mỗi ngày' thế nào cho đúng?",
            options: ["every day — hai chữ", "everyday — một chữ", "everydays — một chữ, có -s"],
            correct: 0,
            explanation:
              "Hai chữ là trạng ngữ chỉ thời gian. Một chữ 'everyday' là tính từ, nghĩa 'thường ngày' — 'everyday English' thì được, 'I work everyday' thì sai.",
          },
        ],
      ),
      game: [
        game(
          "Do you work on Sunday?",
          "Yes, I work every day.",
          "Every day I work yes.",
          "No, we close on Sunday.",
          "colleague",
          "Đây là đồng nghiệp hỏi, không phải khách — và câu đó nói khu nghỉ đóng cửa Chủ nhật. Khách sạn không có ngày nào đóng cửa; nói vậy với người cùng ca là hôm sau họ nói lại đúng như thế với khách.",
        ),
      ],
    }),

    lesson(lx, 11, 2, "We Start At…", "Nói giờ bắt đầu công việc", {
      vocabulary: [
        bw(t3, `We ${act(t3)} at ${lx.service.open}.`),
        bw(t4, `I ${act(t4)} before lunch.`),
      ],
      grammar: [
        g(
          `We ${act(t3)} ${lx.service.open}.`,
          `We ${act(t3)} at ${lx.service.open}.`,
          "Nhớ 'at' trước giờ — ôn lại quy tắc từ tuần 3.",
          `We ${act(t3)} in ${lx.service.open}.`,
        ),
        g(
          `Work start eight.`,
          `Our shift starts at eight.`,
          "Chủ ngữ đầy đủ + động từ chia đúng: our shift STARTS at eight.",
          "Our shift start at eight.",
        ),
      ],
      speaking: [
        // The prompt used to be "What time do you start?" and the model answer
        // named the time of a TASK — "We print the bill at two, madam." — which
        // does not answer it. Four auditors flagged the pair. Now the question
        // asks about the task the answer is actually about.
        sp(
          `What time do we ${lower(t3)}?`,
          `We ${act(t3)} at ${lx.service.open}.`,
          `Ôn lại 'at + giờ' của tuần 3, ghép với động từ công việc mới. Cụm 'at + giờ' đọc nối liền thành một khối: /t/ không bật rời ra, nhưng cũng không được biến mất.`,
          "colleague",
        ),
      ],
      reading: read(
        `A new colleague asks about the schedule. ${lx.staff} answers: "We ${act(t3)} at ${lx.service.open}. I ${act(t4)} before lunch."`,
        [
          {
            q: `Việc "${t3.definition.toLowerCase()}" làm lúc mấy giờ?`,
            options: [lx.service.open, lx.service.close, "Nửa đêm"],
            correct: 0,
            explanation: `"We ${act(t3)} at ${lx.service.open}".`,
          },
          {
            q: "Giới từ nào đứng trước giờ?",
            options: ["at", "in", "on"],
            correct: 0,
            explanation: "Trước giờ cụ thể luôn dùng 'at' — quy tắc đã học tuần 3.",
          },
        ],
      ),
      game: [
        game(
          `When do we ${lower(t3)}?`,
          `We ${act(t3)} at ${lx.service.open}.`,
          `${t3.word} ${lx.service.open}.`,
          `We ${act(t3)} at ${lx.service.close}.`,
          "colleague",
          "Câu đó đúng ngữ pháp từng chữ và sai đúng một con số. Đồng nghiệp hỏi giờ BẮT ĐẦU, bạn đọc ra giờ đóng cửa — cả ca sau sẽ vào muộn vì một câu trả lời nghe rất trôi chảy.",
        ),
      ],
    }),

    lesson(lx, 11, 3, "Sometimes & Usually", "Thỉnh thoảng & thường xuyên", {
      vocabulary: [
        v("Usually", "/ˈjuːʒuəli/", "Thường thường", `I usually ${act(t5)} first.`, "📊"),
        bw(t5, `I usually ${act(t5)} first.`),
        bw(t6, `We sometimes ${act(t6)} twice.`),
      ],
      grammar: [
        g(
          `I ${act(t5)} usually.`,
          `I usually ${act(t5)} first.`,
          "Trạng từ tần suất (usually, always, sometimes) đứng TRƯỚC động từ chính.",
          `I am usually ${act(t5)} first.`,
        ),
        g(
          `Sometime we ${act(t6)}.`,
          `We sometimes ${act(t6)} twice.`,
          "Đúng chính tả là 'sometimes' có -s ở cuối.",
          `We sometime ${act(t6)} twice.`,
        ),
      ],
      speaking: [
        sp(
          "Do you always do that?",
          `I usually ${act(t5)} first.`,
          "Trạng từ tần suất đứng trước động từ — vị trí này người Việt hay đặt sai. Từ 'first' đóng bằng cụm /st/ — cụm khó nhất tuần này, đừng dừng ở 'phơ'.",
          "colleague",
        ),
      ],
      reading: read(
        `${lx.staff} describes the routine to the new colleague: "I usually ${act(t5)} first. We sometimes ${act(t6)} twice a day."`,
        [
          {
            q: "Trạng từ 'usually' đứng ở đâu?",
            options: ["Trước động từ chính", "Cuối câu", "Trước chủ ngữ"],
            correct: 0,
            explanation: "I USUALLY start… — trạng từ tần suất đứng trước động từ.",
          },
          {
            q: "'Sometimes' viết đúng là gì?",
            options: ["sometimes", "sometime", "some time"],
            correct: 0,
            explanation: "Trạng từ tần suất là 'sometimes', luôn có -s.",
          },
        ],
      ),
      game: [
        game(
          "How often do you do it?",
          `We sometimes ${act(t6)} twice a day.`,
          `Sometime two time.`,
          `We ${act(t6)} once every week.`,
          "colleague",
          "Đúng ngữ pháp, sai tần suất — mà tần suất chính là thứ 'How often' hỏi. Một tuần một lần và một ngày hai lần là hai quy trình khác hẳn nhau, và người nghe sẽ làm theo con số bạn nói.",
        ),
      ],
    }),

    lesson(lx, 11, 4, "Finishing the Shift", "Kết thúc ca làm", {
      vocabulary: [bw(t7, `I ${act(t7)} at the end.`), bw(t8, `Please ${act(t8)} before you go.`)],
      grammar: [
        g(
          `Finish work I go home.`,
          `I go home after my shift.`,
          "Dùng 'after' để nối hai việc: I go home AFTER my shift.",
          "After my shift I go to home.",
        ),
        g(
          `You ${act(t8)} first.`,
          `Please ${act(t8)} before you go.`,
          "Thêm 'Please' và mốc thời gian 'before you go' cho câu dặn dò lịch sự.",
          `Please ${act(t8)} before you will go.`,
        ),
      ],
      speaking: [
        sp(
          "What do you do at the end?",
          `I ${act(t7)} and go home, madam.`,
          "Nối hai hành động bằng 'and' — cấu trúc đơn giản nhất để kể chuỗi việc. Từ 'home' đóng bằng /m/: phải ngậm môi lại, đừng bỏ lửng.",
          "manager",
        ),
      ],
      reading: read(
        `The shift is over. The supervisor asks about the handover. ${lx.staff} answers: "I ${act(t7)} at the end, then I go home." The supervisor says: "Well done."`,
        [
          {
            q: "Việc cuối ca là gì?",
            options: [t7.definition, t8.definition, "Ăn tối"],
            correct: 0,
            explanation: `"I ${act(t7)} at the end" — việc làm cuối ca.`,
          },
          {
            q: "Từ nào dùng để nối hai hành động?",
            options: ["and", "but", "or"],
            correct: 0,
            explanation: "'and' nối hai việc làm nối tiếp nhau.",
          },
        ],
      ),
      game: [
        game(
          "Is your work finished?",
          `Yes, sir. I ${act(t7)} and go home.`,
          `Finish work go home.`,
          "No, sir. My work is never finished here.",
          "manager",
          "Câu đó đúng ngữ pháp nhưng là một lời than trước mặt quản lý. Nếu việc chưa xong thì nói còn thiếu phần nào và bao lâu nữa; 'never finished' không trả lời câu hỏi, nó chỉ than.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 12 — Answering the Phone
// FRAMES · "Hello, {department}. {Name} speaking."
//         · "Hold on, please. I will check."
// ============================================================
function week12(lx: Ctx): LessonContent[] {
  const [f1, f2, f3, f4, f5, f6, f7, f8] = lx.bank.phone;
  return [
    lesson(lx, 12, 1, "Answering a Call", "Bắt máy đúng chuẩn", {
      vocabulary: [
        v(
          "Speaking",
          "/ˈspiːkɪŋ/",
          "Tôi đang nghe (khi nghe điện thoại)",
          `${lx.staff} speaking.`,
          "📞",
        ),
        v("Hold on", "/həʊld ɒn/", "Xin giữ máy", "Hold on, please.", "⏸️"),
        bw(f1, `Hello, ${lower(f1)}. ${lx.staff} speaking.`),
        bw(f2, `May I take your ${lower(f2)}?`),
      ],
      grammar: [
        g(
          "Hello? Who?",
          `Hello, ${lx.deptEn}. ${lx.staff} speaking.`,
          "Bắt máy phải xưng bộ phận và tên: 'Hello, + bộ phận. + Tên + speaking.'",
          `Hello, ${lx.deptEn}. I am ${lx.staff} speaking.`,
        ),
        g(
          "Wait wait.",
          "Hold on, please.",
          "Bảo khách chờ trên điện thoại nói 'Hold on, please' — không nói 'Wait'.",
          "Hold on you, please.",
        ),
      ],
      speaking: [
        sp(
          "Hello, is this the front desk?",
          `Hello, ${lx.deptEn}. ${lx.staff} speaking.`,
          "Câu bắt máy chuẩn — học thuộc nguyên khối, dùng mọi cuộc gọi. Từ 'speaking' có cụm /sp/ ở đầu và /ŋ/ ở cuối, trọng âm ở SPEA.",
        ),
      ],
      reading: read(
        `The phone rings. ${lx.staff} answers: "Hello, ${lx.deptEn}. ${lx.staff} speaking. How may I help you?"`,
        [
          {
            q: "Bắt máy cần nói những gì?",
            options: [
              "Tên bộ phận và tên mình",
              "Nói 'Hello' rồi chờ khách hỏi trước",
              "Chỉ hỏi 'Who?'",
            ],
            correct: 0,
            explanation: "Chuẩn khách sạn: xưng bộ phận + tên + 'speaking'.",
          },
          {
            q: "'Speaking' trong câu này nghĩa là gì?",
            options: ["Tôi đang nghe máy đây", "Tôi đang nói chuyện", "Xin nói to hơn"],
            correct: 0,
            explanation: "'… speaking' là cách xưng danh chuẩn khi nghe điện thoại.",
          },
        ],
      ),
      game: [
        game(
          "Hello? Can you hear me?",
          `Yes, madam. ${lx.staff} speaking.`,
          "Hello? Who you?",
          "Yes, I can hear you.",
          undefined,
          "Đúng ngữ pháp nhưng khách vẫn không biết đang nói chuyện với ai. Trên điện thoại khách không nhìn thấy bảng tên của bạn — xưng tên là phần bắt buộc của mọi câu bắt máy, không phải phần trang trí.",
        ),
      ],
    }),

    lesson(lx, 12, 2, "Taking a Message", "Ghi lại lời nhắn", {
      vocabulary: [bw(f3, `I will send it ${lower(f3)}.`), bw(f4, `Let me ${lower(f4)} for you.`)],
      grammar: [
        g(
          "I write your say.",
          "May I take a message?",
          "Xin ghi lời nhắn nói 'May I take a message?' — mẫu cố định.",
          "May I taking a message?",
        ),
        g(
          `I ${lower(f4)} you.`,
          `Let me ${lower(f4)} for you.`,
          "'Let me + động từ' là cách đề nghị giúp đỡ lịch sự trên điện thoại.",
          `Let I ${lower(f4)} for you.`,
        ),
      ],
      speaking: [
        sp(
          "Could you tell him I called?",
          "Of course. May I take a message?",
          "Chủ động xin ghi lời nhắn thay vì để khách phải yêu cầu. Từ 'message' trọng âm âm tiết đầu: MES-sage, âm cuối là /dʒ/.",
        ),
      ],
      reading: read(
        `The guest wants to leave a message. ${lx.staff} says: "Of course, sir. May I take a message? I will send it ${lower(f3)}."`,
        [
          {
            q: "Nhân viên đề nghị làm gì?",
            options: ["Ghi lại lời nhắn", "Chuyển máy", "Gọi lại sau"],
            correct: 0,
            explanation: `"May I take a message?" — xin ghi lời nhắn.`,
          },
          {
            q: "Cụm 'Let me…' dùng để làm gì?",
            options: ["Đề nghị giúp đỡ", "Xin phép khách cho mình được nghỉ", "Hỏi giá"],
            correct: 0,
            explanation: "'Let me check / Let me help' là mẫu đề nghị giúp lịch sự.",
          },
        ],
      ),
      game: [
        game(
          "Please tell her to call me.",
          "Certainly, madam. May I take a message?",
          "I write your say.",
          "Certainly, madam. She will call you back soon.",
          undefined,
          "Câu đó lịch sự nhưng hứa thay cho người khác, và hứa cả thời gian mà bạn không kiểm soát được. Nhận lời rồi xin lời nhắn — lúc đó bạn mới có tên, số phòng và nội dung để chuyển đi.",
        ),
      ],
    }),

    lesson(lx, 12, 3, "Transferring a Call", "Chuyển máy", {
      vocabulary: [bw(f5, `The ${lower(f5)} is ready.`), bw(f6, `Please ${lower(f6)}, sir.`)],
      grammar: [
        g(
          "I give you other people.",
          "I will transfer your call.",
          "Chuyển máy nói 'I will transfer your call', không dịch từng chữ từ tiếng Việt.",
          "I will transfer your call. Wait.",
        ),
        g(
          "Wrong number you.",
          "I am sorry, wrong number.",
          "Báo nhầm số cần xin lỗi trước: 'I am sorry, wrong number.'",
          "I am sorry, you wrong number.",
        ),
      ],
      speaking: [
        sp(
          "Can I speak to the manager?",
          "One moment. I will transfer you.",
          "Báo trước rồi mới chuyển máy — đừng chuyển im lặng khiến khách tưởng bị cắt. Là động từ, 'transfer' trọng âm ở âm tiết sau: trans-FER.",
        ),
      ],
      reading: read(
        `A guest asks for another department. ${lx.staff} says: "One moment, sir. I will transfer your call." The line connects.`,
        [
          {
            q: "Trước khi chuyển máy nên làm gì?",
            options: ["Báo khách biết", "Chuyển im lặng", "Cúp máy"],
            correct: 0,
            explanation: "Báo trước giúp khách không tưởng cuộc gọi bị ngắt.",
          },
          {
            q: "Câu nào đúng khi chuyển máy?",
            options: ["I will transfer your call.", "I give you other people.", "You call again."],
            correct: 0,
            explanation: "'Transfer a call' là thuật ngữ chuẩn cho việc chuyển máy.",
          },
        ],
      ),
      game: [
        game(
          "I need to speak to housekeeping.",
          "One moment, madam. I will transfer you.",
          "I give you other people.",
          "Please call housekeeping directly, madam.",
          undefined,
          "Câu đó đúng ngữ pháp nhưng bắt khách gọi thêm một lần nữa, và họ chưa chắc có số. Khi khách đã gọi tới được bạn, việc của bạn là nối máy chứ không phải trả cuộc gọi lại cho khách.",
        ),
      ],
    }),

    lesson(lx, 12, 4, "Ending the Call", "Kết thúc cuộc gọi", {
      vocabulary: [
        bw(f7, `I will ${lower(f7)} soon.`),
        bw(f8, `Please ${lower(f8)} any time, sir.`),
      ],
      grammar: [
        g(
          "Finish, bye.",
          "Thank you for calling. Goodbye.",
          "Kết thúc cuộc gọi chuẩn: cảm ơn đã gọi rồi mới chào tạm biệt.",
          "Thank you for call. Goodbye.",
        ),
        g(
          "Something more?",
          "Is there anything else, madam?",
          "Câu hỏi đầy đủ: 'Is there anything else?' — ôn lại 'Anything else' từ tuần 6.",
          "There is anything else, madam?",
        ),
      ],
      speaking: [
        sp(
          "That is all. I will call again tomorrow.",
          "Thank you for calling. Goodbye.",
          "Luôn để khách gác máy trước — đó là chuẩn lễ nghi điện thoại. Từ 'Thank' mở đầu bằng /θ/ — đầu lưỡi chạm nhẹ răng trên, đừng để thành tank.",
        ),
      ],
      reading: read(
        `The call is finished. ${lx.staff} says: "Is there anything else, sir? Thank you for calling. Goodbye." The guest hangs up first.`,
        [
          {
            q: "Ai nên gác máy trước?",
            options: ["Khách", "Nhân viên", "Ai cũng được"],
            correct: 0,
            explanation: "Lễ nghi điện thoại: để khách gác máy trước.",
          },
          {
            q: "Câu kết thúc chuẩn là gì?",
            options: [
              "Thank you for calling. Goodbye.",
              "Thank you. I am going to hang up now.",
              "Finish, bye.",
            ],
            correct: 0,
            explanation:
              "Cảm ơn khách đã gọi rồi mới chào tạm biệt — và để khách gác máy trước, không tự thông báo mình sắp cúp.",
          },
        ],
      ),
      game: [
        game(
          "Nothing else. I will ring again later.",
          "Thank you for calling. Goodbye, madam.",
          "OK finish bye.",
          "All right, madam. I will hang up now.",
          undefined,
          "Câu đó đúng ngữ pháp nhưng nói ra cái việc người ta chỉ làm chứ không thông báo — 'I will hang up now' nghe như bạn đang sốt ruột muốn cúp. Kết thúc chuẩn là cảm ơn đã gọi rồi mới chào.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 13 — Simple Problems & Apologies
// FRAMES · guest: "The {thing} is {problem}."
//         · staff: "I am sorry. I will {fix} it now."
// ============================================================
function week13(lx: Ctx): LessonContent[] {
  const [b1, b2, b3, b4, b5, b6, b7, b8] = lx.bank.problems;
  const [i1] = lx.items;
  return [
    lesson(lx, 13, 1, "Something Is Wrong", "Có thứ gì đó không ổn", {
      vocabulary: [
        v("Problem", "/ˈprɒbləm/", "Vấn đề, sự cố", "There is a problem, sir.", "⚠️"),
        // Not "I will fix it now." — Phase 0 puts that exact sentence on the
        // WRONG option and explains why: you are not the electrician, and the
        // moment you promise a repair the fault becomes yours. The card keeps
        // the word, because guests say it; the lesson stops modelling it as
        // the staff line.
        v("Fix", "/fɪks/", "Sửa (việc của bộ phận kỹ thuật)", "I cannot fix it, sir.", "🔧"),
        bw(b1, `The ${i1.word.toLowerCase()} is ${lower(b1)}.`),
        bw(b2, `It is ${lower(b2)}, sir.`),
      ],
      grammar: [
        g(
          `${i1.word} ${lower(b1)}.`,
          `The ${i1.word.toLowerCase()} is ${lower(b1)}.`,
          "Mẫu câu lõi tuần này: THE + đồ vật + IS + tình trạng hỏng.",
          `The ${i1.word.toLowerCase()} has ${lower(b1)}.`,
        ),
        g(
          "Manager I tell.",
          "I will tell my manager now.",
          "Báo lên trên: CHỦ NGỮ + WILL TELL + người. Tiếng Việt đảo được tân ngữ lên đầu, tiếng Anh thì không.",
          "I will tell to my manager now.",
        ),
      ],
      speaking: [
        sp(
          `The ${i1.word.toLowerCase()} is ${lower(b1)}.`,
          "I am sorry. I will tell my manager.",
          "Công thức vàng khi khách báo sự cố: xin lỗi + việc bạn THẬT SỰ sẽ làm. Đừng hứa sửa — hứa báo. Từ 'manager' trọng âm ở đầu: MAN-a-ger, hai âm sau đọc lướt.",
        ),
      ],
      reading: read(
        `A guest reports a fault: "The ${i1.word.toLowerCase()} is ${lower(b1)}." ${lx.staff} answers: "I am sorry, madam. I cannot fix it. I will tell my manager." ${lx.staff} writes the room number down.`,
        [
          {
            q: "Nhân viên phản ứng thế nào?",
            options: [
              "Xin lỗi, nói rõ mình không sửa được, rồi báo cấp trên",
              "Xin lỗi rồi tự sửa ngay tại chỗ",
              "Bảo khách chờ mai",
            ],
            correct: 0,
            explanation:
              "Xin lỗi + việc mình thật sự làm được. Nhận sửa nghe tận tình nhưng sai nghề: hỏng thêm thì trách nhiệm sang bạn, mà khách vẫn phải chờ đúng người.",
          },
          {
            q: "Vì sao nhân viên ghi lại số phòng?",
            options: [
              "Để cấp trên biết sự cố ở đâu",
              "Để tính thêm tiền vào phòng đó",
              "Để nhớ tên khách",
            ],
            correct: 0,
            explanation:
              "Báo sự cố mà thiếu số phòng thì người đến sửa không biết đi đâu. Ghi lại trước khi rời khách là một bước của quy trình, không phải thói quen cá nhân.",
          },
        ],
      ),
      game: [
        game(
          "Excuse me, something is not working.",
          "I am sorry, sir. I will tell my manager.",
          "Not working yes.",
          "I am sorry, sir. I will fix it now.",
          undefined,
          "Câu đó lễ phép, đúng ngữ pháp, và là câu nguy hiểm nhất bài: bạn vừa nhận trách nhiệm sửa một thứ bạn không được phép sửa. Hỏng nặng thêm thì lỗi thành của bạn, và khách vẫn phải chờ đúng người ấy tới. Xin lỗi rồi báo lên trên — đó mới là việc bạn làm được ngay.",
        ),
      ],
    }),

    lesson(lx, 13, 2, "Saying Sorry Properly", "Xin lỗi đúng cách", {
      vocabulary: [
        // Lesson 1 parameterises its subject from lx.items; these two were
        // written against the Housekeeping bank and hardcoded, so F&B taught
        // "The pipe is overcooked." and "The room is a little undercooked."
        // "It" is the subject the whole problems bank actually shares —
        // and "It is broken / It is a little smelly" is the A1 target
        // language anyway.
        bw(b3, `It is ${lower(b3)}, sir.`),
        bw(b4, `It is a little ${lower(b4)}.`),
      ],
      grammar: [
        g(
          "Sorry you.",
          "I am very sorry, sir.",
          "Câu xin lỗi đủ là 'I am very sorry' — ôn lại từ tuần 5, giờ ghép với sự cố cụ thể.",
          "I very sorry, sir.",
        ),
        g(
          "Not my problem.",
          "I will help you now.",
          "Tuyệt đối không nói 'Not my problem'. Luôn nhận trách nhiệm giúp khách.",
          "I will help for you now.",
        ),
      ],
      speaking: [
        sp(
          "This is really not acceptable.",
          "I am very sorry. I will help now.",
          "Khách bức xúc thì xin lỗi ngắn gọn rồi hành động — đừng biện minh. Từ 'help' đóng bằng cụm /lp/: lưỡi chạm vòm rồi mới ngậm môi.",
        ),
      ],
      reading: read(
        `The guest is unhappy. ${lx.staff} does not argue. ${lx.staff} says: "I am very sorry, sir. I will help you now."`,
        [
          {
            q: "Khi khách bức xúc, nên tránh điều gì?",
            options: ["Biện minh và tranh cãi", "Xin lỗi", "Hành động ngay"],
            correct: 0,
            explanation: "Tranh cãi làm tình huống xấu đi; xin lỗi và hành động mới xoa dịu được.",
          },
          {
            q: "Câu nào tuyệt đối không được nói?",
            options: ["Not my problem.", "I am very sorry.", "I will help you."],
            correct: 0,
            explanation: "'Not my problem' phá hủy hoàn toàn trải nghiệm của khách.",
          },
        ],
      ),
      game: [
        game(
          "Who is responsible for this?",
          "I am very sorry, madam. I will help.",
          "Not my problem, madam.",
          "The night shift did that, madam. Not me.",
          undefined,
          "Đúng ngữ pháp và có thể đúng sự thật — nhưng khách không hỏi để biết tên người sai, họ hỏi để có người sửa. Đổ cho ca khác trước mặt khách làm hỏng hình ảnh cả khách sạn, không riêng gì bạn.",
        ),
      ],
    }),

    lesson(lx, 13, 3, "I Will Check", "Hứa kiểm tra và quay lại", {
      vocabulary: [
        v("Check", "/tʃek/", "Kiểm tra", "I will check now.", "🔍"),
        // Hardcoded "machine" for the same reason as lesson 2 above — it
        // produced "The machine is unhappy." for F&B and "The machine is
        // melted." for Guest Relations.
        bw(b5, `It is ${lower(b5)} now.`),
        bw(b6, `It is ${lower(b6)} today.`),
      ],
      grammar: [
        g(
          "I check come back.",
          "I will check and come back.",
          "Nối hai việc bằng 'and': I will check AND come back.",
          "I will check and coming back.",
        ),
        g(
          "Five minute I come.",
          "I will come back in five minutes.",
          "Cần 'in' trước khoảng thời gian và -s ở 'minutes'.",
          "I will come back in five minute.",
        ),
      ],
      speaking: [
        sp(
          "Can you do something about it?",
          "I will check and come back.",
          "Hứa cụ thể và PHẢI quay lại đúng hẹn — lời hứa không giữ còn tệ hơn không hứa. Cả 'check' lẫn 'back' đều đóng bằng /k/ — đây là âm cuối người Việt nuốt nhiều nhất.",
        ),
      ],
      reading: read(
        `${lx.staff} cannot fix it alone. ${lx.staff} says: "I will check and come back in five minutes, sir." ${lx.staff} returns on time.`,
        [
          {
            q: "Nhân viên hứa gì?",
            options: [
              "Kiểm tra và quay lại sau 5 phút",
              "Chuyển việc cho người khác rồi đi làm việc khác",
              "Không làm gì",
            ],
            correct: 0,
            explanation: `"I will check and come back in five minutes."`,
          },
          {
            q: "Vì sao phải quay lại đúng hẹn?",
            options: [
              "Vì lời hứa không giữ còn tệ hơn không hứa",
              "Vì khách sẽ quên",
              "Vì quản lý yêu cầu",
            ],
            correct: 0,
            explanation: "Giữ đúng cam kết thời gian là nền tảng của lòng tin trong dịch vụ.",
          },
        ],
      ),
      game: [
        game(
          "How long will this take?",
          "I will come back in five minutes.",
          "Five minute I come.",
          "I will come back as soon as I can, sir.",
          undefined,
          "Câu đó lịch sự và đúng ngữ pháp nhưng không có con số nào. Khách hỏi 'how long' là cần một mốc để chờ; 'as soon as I can' để khách tự đoán, và họ luôn đoán ngắn hơn thực tế rồi thất vọng.",
        ),
      ],
    }),

    lesson(lx, 13, 4, "Making It Right", "Khắc phục cho khách hài lòng", {
      vocabulary: [bw(b7, `The item is ${lower(b7)}.`), bw(b8, `The service is ${lower(b8)}.`)],
      grammar: [
        g(
          "I change new one you.",
          "I will bring a new one.",
          "Câu đúng: I will bring A NEW ONE. Không xếp tân ngữ lộn xộn.",
          "I will bring new one.",
        ),
        g(
          "Problem finish now?",
          "Is everything all right now?",
          "Hỏi lại sau khi xử lý: 'Is everything all right now?'",
          "Is everything are all right now?",
        ),
      ],
      speaking: [
        sp(
          "Is it fixed now?",
          "Yes. Is everything all right now?",
          "Xử lý xong phải hỏi lại khách — bước này quyết định khách có hài lòng thật không. Từ 'everything' có /θ/ ở giữa và /ŋ/ ở cuối, trọng âm ở đầu: EV-ry-thing.",
        ),
      ],
      reading: read(
        `${lx.staff} brings a new one and asks: "Is everything all right now, madam?" The guest smiles: "Yes, thank you very much."`,
        [
          {
            q: "Sau khi khắc phục nên làm gì?",
            options: [
              "Hỏi lại khách đã ổn chưa",
              "Chờ khách gọi lại nếu vẫn còn vấn đề",
              "Bỏ đi ngay",
            ],
            correct: 0,
            explanation: "Hỏi lại là bước xác nhận khách thực sự hài lòng.",
          },
          {
            q: "Câu 'I will bring a new one' nghĩa là gì?",
            options: ["Tôi sẽ mang cái mới đến", "Tôi đã mang rồi", "Tôi không mang"],
            correct: 0,
            explanation: "'will bring' = sẽ mang tới; 'a new one' = một cái mới.",
          },
        ],
      ),
      game: [
        game(
          "Thank you, that is much better.",
          "You are welcome. Is everything all right?",
          "Problem finish now?",
          "You are welcome. Please do not tell my manager.",
          undefined,
          "Nửa đầu đúng, nửa sau kéo khách vào việc nội bộ và làm họ nghĩ bạn vừa làm sai điều gì đó. Sau khi xử lý xong, câu chốt luôn là hỏi lại xem mọi thứ đã ổn chưa.",
        ),
      ],
    }),
  ];
}

// ============================================================
// WEEK 14 — Checkpoint: First Sentences
// Chains the week 7-13 frames into three-turn exchanges:
// greet → take the request → close. New vocabulary is light and
// mostly shared; the load here is recall, not intake.
// ============================================================
function week14(lx: Ctx): LessonContent[] {
  const [c1, c2, c3, c4, c5, c6, c7] = lx.bank.closing;
  const [q1] = lx.bank.requests;
  const [s1] = lx.bank.states;
  return [
    lesson(lx, 14, 1, "Greet & Introduce", "Chào đón & giới thiệu", {
      vocabulary: [
        v(
          "How may I help",
          "/haʊ meɪ aɪ help/",
          "Tôi có thể giúp gì ạ",
          "How may I help you?",
          "🤝",
        ),
        bw(c1, `Here is your ${lower(c1)}.`),
        bw(c5, `Please take the ${lower(c5)}.`),
      ],
      grammar: [
        g(
          "Hello, what you want?",
          "Good morning. How may I help you?",
          "Nối tuần 7: chào đúng buổi rồi mời giúp bằng câu chuẩn.",
          "Good morning. How may I helping you?",
        ),
        g(`I ${lx.deptEn} work.`, `I work in ${lx.deptEn}.`, "Ôn tuần 7: 'work IN + bộ phận'."),
      ],
      speaking: [
        sp(
          "Good morning. Are you free?",
          "Good morning, sir. How may I help you?",
          "Chuỗi hai bước: chào theo buổi + mời giúp. Đây là mở đầu mọi ca làm. Âm cuối của 'morning' là /ŋ/ — miệng vẫn mở, đừng đóng lưỡi thành /n/.",
        ),
      ],
      reading: read(
        `A guest arrives at ${lx.station}. ${lx.staff} greets him: "Good morning, sir. I work in ${lx.deptEn}. How may I help you?"`,
        [
          {
            q: "Lời chào gồm mấy bước?",
            options: [
              "Ba: chào, giới thiệu, mời giúp",
              "Hai: chào rồi hỏi khách cần gì",
              "Một: chào",
            ],
            correct: 0,
            explanation: "Chào theo buổi + xưng bộ phận + mời giúp là chuỗi mở đầu chuẩn.",
          },
          {
            q: "Câu nào mời khách nói nhu cầu?",
            options: ["How may I help you?", "What you want?", "You need?"],
            correct: 0,
            explanation: "'How may I help you?' là câu mời giúp chuẩn mực nhất.",
          },
        ],
      ),
      game: [
        game(
          "Good afternoon. Are you busy?",
          "Good afternoon, madam. How may I help?",
          "Afternoon. What you want?",
          "Yes, madam. I am very busy at the moment.",
          undefined,
          "Đúng ngữ pháp, và đúng sự thật — nhưng 'Are you busy?' không phải câu hỏi về lịch làm việc của bạn, đó là cách khách xin phép làm phiền. Trả lời 'yes' là đóng cửa với người vừa định nhờ bạn.",
        ),
      ],
    }),

    lesson(lx, 14, 2, "Take the Request", "Tiếp nhận yêu cầu", {
      vocabulary: [
        v("Quickly", "/ˈkwɪkli/", "Nhanh chóng", "I will do it quickly.", "⚡"),
        bw(c2, `Please leave the ${lower(c2)} here.`),
        // "The X is ready, sir." demands a thing that gets prepared, and three
        // of six banks hold something abstract at this slot: "The quiet time is
        // ready, sir." Handing it over works for both.
        bw(c6, `Your ${lower(c6)}, sir.`),
      ],
      grammar: [
        g(
          `You want ${lower(q1)}?`,
          `Would you like ${wa(q1)}?`,
          "Ôn tuần 9: đề nghị lịch sự dùng 'Would you like…?'",
          `Would you like to ${wa(q1)}?`,
        ),
        g("How many you need?", "How many do you need, sir?", "Ôn tuần 9: câu hỏi cần 'do you'."),
      ],
      speaking: [
        sp(
          `Can I have ${wa(q1)}?`,
          "Of course. I will bring one.",
          "Ôn khung tuần 9. Đây là câu bạn dùng nhiều nhất mỗi ca. Từ 'one' đọc là /wʌn/ — mở đầu bằng âm /w/, không phải 'ôn'.",
        ),
      ],
      reading: read(
        `The guest asks for something. ${lx.staff} answers: "Of course, sir. How many do you need? I will bring them now."`,
        [
          {
            q: "Nhân viên hỏi gì trước khi đi lấy?",
            options: ["Số lượng khách cần", "Số phòng để mang lên tận nơi", "Tên khách"],
            correct: 0,
            explanation:
              "Hỏi số lượng trước để không phải đi lại nhiều lần. Nhưng nếu là chìa khoá hay đồ giao tận phòng thì luôn phải xác nhận số phòng trước.",
          },
          {
            q: "'Of course' thể hiện điều gì?",
            options: ["Vui vẻ nhận lời", "Từ chối", "Nghi ngờ"],
            correct: 0,
            explanation: "'Of course' là cách nhận lời tích cực, đã học từ tuần 5.",
          },
        ],
      ),
      game: [
        game(
          "I need two, please.",
          "Certainly, madam. I will bring two.",
          "Two you want yes.",
          "Certainly. I will bring one.",
          undefined,
          "Câu đó đúng ngữ pháp, chỉ sai con số — và sai số lượng là lỗi khách phát hiện ngay lúc bạn quay lại. Nhắc lại đúng con số khách vừa nói là cách rẻ nhất để chứng minh bạn đã nghe đúng.",
        ),
      ],
    }),

    lesson(lx, 14, 3, "Handle a Small Problem", "Xử lý sự cố nhỏ", {
      vocabulary: [bw(c3, `The work is ${lower(c3)}.`), bw(c7, `I will check the ${lower(c7)}.`)],
      grammar: [
        g(
          "Sorry, I check.",
          "I am sorry. I will check now.",
          "Ôn tuần 13: xin lỗi đủ câu + hứa hành động bằng 'will'.",
          "I am sorry. I will checking now.",
        ),
        g(
          `Room ${lower(s1)} no.`,
          `The room is not ${lower(s1)}.`,
          "Ôn tuần 10: phủ định là 'is not + tính từ'.",
          `The room not is ${lower(s1)}.`,
        ),
      ],
      speaking: [
        sp(
          "There is a problem in my room.",
          "I am sorry. I will check now.",
          "Ôn khung tuần 13 — xin lỗi rồi hành động, không biện minh. Từ 'sorry' trọng âm âm tiết đầu: SOR-ry, và âm /r/ ở giữa phải cong lưỡi.",
        ),
      ],
      reading: read(
        `A guest reports a problem. ${lx.staff} says: "I am very sorry, madam. I will check now." Ten minutes later the work is ${lower(c3)}.`,
        [
          {
            q: "Nhân viên phản ứng ra sao?",
            options: ["Xin lỗi và đi kiểm tra ngay", "Tranh cãi", "Bỏ qua"],
            correct: 0,
            explanation: "Xin lỗi + hành động ngay là công thức của tuần 13.",
          },
          {
            q: "Sau bao lâu thì xong việc?",
            options: ["Mười phút", "Một ngày", "Không xong"],
            correct: 0,
            // Quoted "…the work is done." while the passage says "…is
            // ${lower(c3)}" — correct / clean / spotless / tidy / wonderful /
            // finalised, one per department. A learner checking the answer
            // against the text found a sentence that was not there, in all six.
            explanation: `Bài đọc: "Ten minutes later the work is ${lower(c3)}."`,
          },
        ],
      ),
      game: [
        game(
          "My room is not ready yet.",
          "I am sorry, sir. I will check now.",
          "Room not ready no.",
          "I am sorry, sir. You will have to wait.",
          undefined,
          "Có xin lỗi nhưng chỉ báo lại cho khách một việc họ đã biết, và không nói phải chờ bao lâu. Xin lỗi rồi đi kiểm — kiểm xong bạn mới có con số để đưa cho khách.",
        ),
      ],
    }),

    lesson(lx, 14, 4, "Close the Conversation", "Kết thúc cuộc trò chuyện", {
      vocabulary: [
        v("My pleasure", "/maɪ ˈpleʒə/", "Hân hạnh được phục vụ", "My pleasure, madam.", "🌟"),
        bw(c4, `Have a good ${lower(c4)}, madam.`),
      ],
      grammar: [
        g(
          "Finish? Bye.",
          "Is there anything else, sir?",
          "Ôn tuần 12: hỏi chốt nhu cầu bằng câu đầy đủ.",
          "Is it anything else, sir?",
        ),
        g(
          "You go good.",
          "Enjoy your stay, madam.",
          "Ôn tuần 6: câu chúc chuẩn khi tiễn khách còn lưu trú.",
          "Enjoy with your stay, madam.",
        ),
      ],
      speaking: [
        sp(
          "No, that is all. I am going up now.",
          "Thank you, sir. Enjoy your stay.",
          "Kết thúc luôn ba phần: cảm ơn – lời chúc – nụ cười. Đây là ấn tượng cuối. Từ 'Enjoy' trọng âm ở âm tiết sau: en-JOY; cụm /st/ đầu 'stay' phải bật cả hai âm.",
        ),
      ],
      reading: read(
        `Everything is finished. ${lx.staff} asks: "Is there anything else, madam?" She says: "No, thank you." ${lx.staff} smiles: "Enjoy your stay."`,
        [
          {
            q: "Câu nào chốt nhu cầu của khách?",
            options: ["Is there anything else?", "Finish? Bye.", "You go now?"],
            correct: 0,
            explanation: "'Is there anything else?' là câu hỏi chốt chuẩn mực.",
          },
          {
            q: "Kết thúc gồm những phần nào?",
            options: [
              "Cảm ơn, lời chúc, nụ cười",
              "Chào tạm biệt và chúc khách đi vui vẻ",
              "Chỉ cảm ơn",
            ],
            correct: 0,
            explanation:
              "Ba phần này tạo nên ấn tượng cuối cùng của khách. Khách còn ở lại nên chúc 'Enjoy your stay', không phải lời chúc dành cho người sắp rời đi.",
          },
        ],
      ),
      game: [
        game(
          "That is everything, thank you.",
          "Thank you, madam. Enjoy your stay.",
          "Finish? Bye.",
          "Thank you, madam. Goodbye.",
          undefined,
          "Câu đó không sai ngữ pháp nhưng là câu tiễn khách RỜI ĐI. Khách này còn ở lại, nên chúc họ có kỳ nghỉ vui mới đúng; 'Goodbye' để dành cho lúc trả phòng.",
        ),
      ],
    }),
  ];
}

// ------------------------------------------------------------
// Week assembly + graduated spaced recycling.
// ------------------------------------------------------------
// ============================================================
// DEPARTMENT LESSONS
//
// A department lesson replaces the shared frame lesson at the SAME slot, and
// keeps the SAME headwords: the review scheduler keys on the word, so a swap
// that changes the card set leaves it pointing at something nobody taught.
// Everything else — grammar, speaking, reading, arcade — is the department’s
// own, which is where every operational audit said the gap was. Phase 0 has
// thirty-five of these and its lowest-scoring module climbed from 4.0 to 8.0
// as they landed; Phase 1 shipped with none, and all five operational reviews
// named that as the reason their score could not clear the bar by string
// edits alone.
// ============================================================
const DEPT_LESSONS: Record<string, (lx: Ctx) => LessonContent> = {
  // ── FRONT OFFICE ──────────────────────────────────────────────────────
  // Phase 0 spends a whole lesson on "May I see your passport?" and states the
  // rule with no exception. Week 9 then handed a key over on request, and week
  // 14 drilled it again. Same headwords; the verification comes back.
  FO_9_2: (lx) =>
    lesson(lx, 9, 2, "Two Keys, One Passport", "Chìa khoá và giấy tờ", {
      vocabulary: [
        v(
          "Extra key",
          "/ˈekstrə kiː/",
          "Chìa khóa dự phòng",
          "The extra key needs your passport.",
          "🔑",
        ),
        v(
          "Wake-up call",
          "/ˈweɪk ʌp kɔːl/",
          "Cuộc gọi báo thức",
          "Do you need a wake-up call?",
          "⏰",
        ),
      ],
      grammar: [
        g(
          "How many key?",
          "How many extra keys, sir?",
          "Danh từ đếm được thì phải có -s: extra keyS. Và hỏi đủ câu, đừng hỏi cụt một chữ.",
          "How many extra key, sir?",
        ),
        g(
          "Passport give me.",
          "May I see your passport, sir?",
          "Xin giấy tờ luôn mở bằng mẫu câu cố định 'May I see…', không dịch từng chữ từ tiếng Việt.",
          "May I to see your passport, sir?",
        ),
      ],
      speaking: [
        sp(
          "Can I have an extra key?",
          "Of course. May I see your passport?",
          "Nhận lời TRƯỚC rồi mới xin giấy tờ — khách nghe 'Of course' thì không thấy bị nghi ngờ. Cụm 'passport' trọng âm ở đầu: PASS-port.",
        ),
        sp(
          "Here is my passport.",
          "Thank you. Here is your extra key.",
          "Cảm ơn rồi trao. Chữ 'key' kết bằng /iː/ dài, đừng đọc cụt thành 'ki'.",
        ),
        sp(
          "Please wake me at six.",
          "Yes, sir. Your wake-up call is at six.",
          "Đọc lại giờ để khách sửa ngay nếu mình nghe sai. Cụm ba chữ 'wake-up call' đọc liền, trọng âm ở WAKE.",
        ),
        sp(
          "Room three-oh-five wants two extra keys.",
          "I will check the passport first.",
          "Lượt này là đồng nghiệp hỏi, không phải khách — nên không có sir/madam. Nói rõ mình kiểm giấy tờ trước, để cả ca làm giống nhau.",
          "colleague",
          ["passport"],
        ),
      ],
      reading: read(
        `A guest asks for an extra key. ${lx.staff} says: "May I see your passport, sir?" The guest shows it. ${lx.staff} gives one extra key. ${lx.staff} does not say the room number out loud.`,
        [
          {
            q: "Vì sao nhân viên xin hộ chiếu?",
            options: [
              "Chìa khoá chỉ đưa cho đúng người thuê phòng",
              "Để ghi tên khách vào sổ trực",
              "Để tính tiền chìa khoá dự phòng",
            ],
            correct: 0,
            explanation:
              "Người xin chìa khoá và người thuê phòng không phải lúc nào cũng là một. Đây là bước duy nhất chặn được việc đó, và nó không có ngoại lệ.",
          },
          {
            q: "Vì sao không đọc to số phòng?",
            options: [
              "Người đứng gần quầy sẽ nghe được số phòng của khách",
              "Vì nhân viên không nhớ chính xác số",
              "Vì khách không thích nghe số bằng tiếng Anh",
            ],
            correct: 0,
            explanation:
              "Quầy lễ tân là nơi đông người. Số phòng nói ra một lần là ai cũng nghe được — viết ra hoặc chỉ vào, đừng đọc.",
          },
        ],
      ),
      game: [
        game(
          "Can I have an extra key for room three-oh-five?",
          "May I see your passport, sir?",
          "Key three-oh-five yes.",
          "Of course, sir. Here is the extra key.",
          undefined,
          "Câu đó lịch sự, đúng ngữ pháp, và là lý do người ta mất đồ trong phòng. Khách nói đúng số phòng không chứng minh được họ ở phòng đó — số phòng là thứ dễ nhìn trộm nhất trong cả khách sạn.",
        ),
        game(
          "My wife will collect the key later.",
          "She can show her passport, sir.",
          "Wife come, key ready.",
          "No problem, sir. I will leave it here.",
          undefined,
          "Nghe rất chiều khách, và nó bỏ chìa khoá phòng ở quầy cho bất kỳ ai nói mình là vợ khách. Quy tắc không đổi theo quan hệ gia đình: ai lấy chìa khoá, người đó xuất trình giấy tờ.",
        ),
      ],
    }),

  // Four phone lessons in a row and not one of them refuses to say whether a
  // guest is staying — the single most common privacy trap on a hotel line.
  FO_12_3: (lx) =>
    lesson(lx, 12, 3, "I Cannot Say Who Is Here", "Không tiết lộ khách nào đang ở", {
      vocabulary: [
        v("Airport car", "/ˈeəpɔːt kɑː/", "Xe đón sân bay", "The airport car is at six.", "🚗"),
        v("Dial", "/ˈdaɪəl/", "Quay số, bấm số", "Please dial nine for reception.", "🔢"),
      ],
      grammar: [
        g(
          "Mr Brooks room five-oh-two.",
          "I am sorry. I cannot say.",
          "Không bao giờ nói khách nào đang ở, hay ở phòng nào. Xin lỗi rồi từ chối, và không giải thích thêm.",
          "I am sorry. I cannot to say.",
        ),
        g(
          "You dial nine.",
          "Please dial nine for reception.",
          "Câu hướng dẫn lịch sự mở bằng 'Please' rồi tới động từ nguyên thể, không có chủ ngữ.",
          "Please you dial nine for reception.",
        ),
      ],
      speaking: [
        sp(
          "Is Mr Brooks staying here?",
          "I am sorry, sir. I cannot say.",
          "Câu này phải bật ra không cần nghĩ. Đừng thêm lý do — càng giải thích càng lộ. Cụm 'cannot' nhấn ở CAN.",
          undefined,
          ["cannot"],
        ),
        sp(
          "Then put me through to him.",
          "I can take a message, sir.",
          "Từ chối rồi phải mở một lối khác, nếu không khách gọi lại và gặp người dễ tính hơn. Chữ 'message' có /dʒ/ ở cuối.",
        ),
        sp(
          "Can you check that for me?",
          "One moment, sir. Please hold on.",
          "Bài khung ở ô này dạy xin khách chờ, và bài riêng phải giữ lại chức năng đó. Cụm 'hold on' đọc nối thành một hơi.",
        ),
        sp(
          "I need a car to the airport.",
          "Of course, sir. The airport car at six?",
          "Đọc lại giờ và lên giọng cuối câu để khách xác nhận. Ba chữ 'airport car at six' đọc liền một hơi.",
        ),
      ],
      reading: read(
        `A caller asks for a guest by name. ${lx.staff} says: "I am sorry, sir. I cannot say." ${lx.staff} does not say yes and does not say no. ${lx.staff} offers to take a message. The guest decides who may know.`,
        [
          {
            q: "Vì sao trả lời 'no' cũng không an toàn?",
            options: [
              "Trả lời kiểu nào cũng cho biết khách có ở đây hay không",
              "Vì nói 'no' là nói dối với người gọi",
              "Vì người gọi sẽ gọi lại ngay sau đó",
            ],
            correct: 0,
            explanation:
              "Người gọi thử vài khách sạn; khách sạn nào nói 'no' là loại được, khách sạn nào ấp úng là trúng. Chỉ một câu duy nhất không rò rỉ gì: 'I cannot say.'",
          },
          {
            q: "Nhân viên làm gì thay vào đó?",
            options: [
              "Nhận lời nhắn để khách tự quyết có gọi lại không",
              "Chuyển máy thẳng vào phòng khách",
              "Ghi số người gọi rồi thôi, không nói gì",
            ],
            correct: 0,
            explanation:
              "Lời nhắn giữ được cả hai phía: người gọi có đường liên lạc, còn quyền quyết định vẫn nằm ở khách.",
          },
        ],
      ),
      game: [
        game(
          "Is Mrs Ruiz in room five-oh-two?",
          "I am sorry, madam. I cannot say.",
          "Ruiz five-oh-two yes.",
          "She is in five-oh-two, madam.",
          undefined,
          "Câu đó đúng ngữ pháp và vừa đọc số phòng của một người phụ nữ cho một người lạ qua điện thoại. Đây là loại sai một lần là lên báo, không phải loại sai bị nhắc nhở.",
        ),
        game(
          "I am her husband. Just tell me.",
          "I can take a message, madam.",
          "Husband OK, no problem.",
          "For family it is all right, madam.",
          undefined,
          "Người gọi tự xưng là ai thì bạn không kiểm được, và người nguy hiểm nhất với một vị khách thường tự xưng đúng như thế. Quan hệ gia đình không mở được quy tắc này.",
        ),
      ],
    }),

  // ── FOOD & BEVERAGE ───────────────────────────────────────────────────
  // Same two headwords, a scene that happens: the pool bar runs out of ice.
  FB_9_4: (lx) =>
    lesson(lx, 9, 4, "When the Bar Runs Out", "Khi quầy hết đồ", {
      vocabulary: [
        v("Ice", "/aɪs/", "Đá lạnh", "We have no ice at the moment.", "🧊"),
        v("Straw", "/strɔː/", "Ống hút", "Would you like a straw, sir?", "🥤"),
      ],
      grammar: [
        g(
          "No ice have.",
          "I am sorry. We have no ice.",
          "Báo hết hàng nói đủ câu: xin lỗi rồi 'we have no' + món. Nói cụt nghe như đang gắt với khách.",
          "I am sorry. We are no ice.",
        ),
        g(
          "Straw you want?",
          "Would you like a straw, sir?",
          "Đề nghị lịch sự mở bằng 'Would you like', và lần nhắc đầu tiên của một vật đếm được thì đi với 'a'.",
          "Would you like the straw, sir?",
        ),
      ],
      speaking: [
        sp(
          "Can I have more ice, please?",
          "I am sorry. We have no ice.",
          "Nói thẳng là hết, đừng vòng vo. Chữ 'ice' mở bằng /aɪ/ và đóng bằng /s/ — nghe rõ cả đuôi.",
          undefined,
          ["ice"],
        ),
        sp(
          "So what can you do?",
          "I will bring cold water, sir.",
          "Hết một thứ thì mời ngay một thứ CÓ THẬT. Đây là chỗ khách quyết định có phàn nàn hay không.",
        ),
        sp(
          "Can I have a straw?",
          "Of course, madam. Here you are.",
          "Ống hút chỉ đưa khi khách hỏi. Cụm 'Here you are' trọng âm rơi vào HERE.",
        ),
      ],
      reading: read(
        `The pool bar has no ice. ${lx.staff} says: "I am sorry, sir. We have no ice." Then ${lx.staff} says: "I will bring cold water." A straw comes only when a guest asks for one.`,
        [
          {
            q: "Nhân viên làm gì ngay sau khi báo hết đá?",
            options: [
              "Mời một thứ thay thế đang có thật",
              "Bảo khách chờ tới chiều",
              "Không nói gì thêm, chờ khách hỏi tiếp",
            ],
            correct: 0,
            explanation:
              "Một lời từ chối đứng một mình là một lời từ chối. Cùng lời đó kèm một phương án là một lần phục vụ.",
          },
          {
            q: "Khi nào khách được ống hút?",
            options: [
              "Khi khách hỏi xin",
              "Luôn cắm sẵn trong mọi ly",
              "Không bao giờ, khu nghỉ đã bỏ hẳn",
            ],
            correct: 0,
            explanation:
              "Đưa theo yêu cầu là quy định về rác nhựa của khu nghỉ. Khách hỏi thì vẫn có ngay, không phải xin phép ai.",
          },
        ],
      ),
      game: [
        game(
          "Two cold drinks, plenty of ice.",
          "I am sorry, sir. We have no ice.",
          "Ice no have sorry.",
          "Of course, sir. Two drinks with ice.",
          undefined,
          "Câu đó đúng ngữ pháp và hứa một thứ trong quầy không có. Khách sẽ phát hiện khi ly được mang ra, và lúc đó bạn vừa mất đá vừa mất lòng tin — nói thật ngay từ đầu rẻ hơn nhiều.",
        ),
        game(
          "Can I have a straw for my child?",
          "Of course, madam. Here you are.",
          "Straw yes child.",
          "We do not give straws, madam.",
          undefined,
          "Quy định là đưa theo yêu cầu, không phải cấm. Nói 'chúng tôi không đưa' biến một chính sách môi trường thành một lời từ chối với một đứa trẻ, và đó là dòng đầu tiên của bài đánh giá một sao.",
        ),
      ],
    }),

  // The order is the department's core transaction and eight weeks never took
  // one. The allergy question rides with it: Phase 0 teaches that "Of course"
  // answers a yes/no question as YES, which is fatal here.
  FB_14_2: (lx) =>
    lesson(lx, 14, 2, "Taking the Order", "Nhận gọi món", {
      vocabulary: [
        v("Quickly", "/ˈkwɪkli/", "Nhanh chóng", "I will bring it quickly, sir.", "⚡"),
        v("Tray", "/treɪ/", "Khay phục vụ", "Please leave the tray outside.", "🍽️"),
        v("Bill folder", "/bɪl ˈfəʊldə/", "Bìa đựng hóa đơn", "May I bring the bill folder?", "📁"),
      ],
      grammar: [
        g(
          "You order what?",
          "May I take your order, sir?",
          "Nhận gọi món là mẫu câu cố định 'May I take your order'. Học thuộc nguyên cụm, đừng ghép lại.",
          "May I taking your order, sir?",
        ),
        g(
          "Peanut inside? Yes sure.",
          "One moment. I will ask the kitchen.",
          "Câu hỏi về dị ứng KHÔNG BAO GIỜ trả lời bằng trí nhớ. Hoãn lại rồi đi hỏi bếp, dù bạn nghĩ mình biết.",
          "One moment. I will ask to the kitchen.",
        ),
      ],
      speaking: [
        sp(
          "We are ready to order.",
          "Of course. May I take your order?",
          "Nhận lời rồi mở sổ. Cụm 'take your order' đọc liền, đừng tách rời từng chữ.",
        ),
        sp(
          "Does this have peanuts in it?",
          "One moment. I will ask the kitchen.",
          "Đây là câu quan trọng nhất cả tuần. Đừng mở đầu bằng 'Of course' — trong tiếng Anh nó có nghĩa là CÓ.",
          undefined,
          ["kitchen"],
        ),
        sp(
          "That is everything, thank you.",
          "Thank you. I will repeat your order.",
          "Đọc lại đơn là bước rẻ nhất để bắt lỗi nghe. Chữ 'repeat' trọng âm ở âm sau: re-PEAT.",
        ),
        sp(
          "Can we have the bill now?",
          "Of course. I will bring the bill folder.",
          "Hoá đơn luôn đi trong bìa, không đưa tờ giấy trần. Cụm 'bill folder' trọng âm ở BILL.",
        ),
      ],
      reading: read(
        `Guests are ready to order. ${lx.staff} says: "May I take your order, sir?" A guest asks about peanuts. ${lx.staff} does not answer from memory. ${lx.staff} says: "One moment. I will ask the kitchen." Then ${lx.staff} repeats the whole order back.`,
        [
          {
            q: "Khách hỏi món có đậu phộng không — nhân viên làm gì?",
            options: [
              "Đi hỏi bếp rồi mới trả lời",
              "Trả lời ngay theo trí nhớ về món đó",
              "Nói món nào ở đây cũng an toàn",
            ],
            correct: 0,
            explanation:
              "Công thức đổi, bếp đổi ca, và một câu trả lời sai ở đây có thể giết người. Không ai trách bạn vì đi hỏi.",
          },
          {
            q: "Vì sao phải đọc lại cả đơn?",
            options: [
              "Để khách sửa ngay tại bàn khi mình nghe sai",
              "Để khách thấy mình nói được tiếng Anh",
              "Vì bếp yêu cầu đọc lại mới nhận đơn",
            ],
            correct: 0,
            explanation:
              "Sai đơn phát hiện tại bàn mất mười giây; phát hiện khi món ra mất một món, một chỗ ngồi và một lời xin lỗi.",
          },
        ],
      ),
      game: [
        game(
          "Is there peanut in this dish?",
          "One moment. I will ask the kitchen.",
          "No peanut, no problem.",
          "Of course, madam. It is safe.",
          undefined,
          "Câu đó lễ phép và là câu nguy hiểm nhất trong cả giáo trình. Trong tiếng Anh, 'Of course' đáp một câu hỏi có/không nghĩa là CÓ — bạn vừa trả lời rằng món ĐÚNG LÀ có đậu phộng, trong khi định trấn an. Với dị ứng, chỉ có một câu đúng: hoãn lại và đi hỏi bếp.",
        ),
        game(
          "We would like to order now.",
          "Of course. May I take your order?",
          "Order what you want?",
          "One moment, sir. I am busy now.",
          undefined,
          "Đúng ngữ pháp và đúng sự thật — nhưng khách vừa nói họ SẴN SÀNG gọi món, tức là họ đã chờ. Nói mình bận là đẩy thời gian chờ đó dài thêm mà không cho họ một mốc nào.",
        ),
      ],
    }),

  // ── HOUSEKEEPING ──────────────────────────────────────────────────────
  // The one sentence a room attendant says more than any other, and the spine
  // slot it replaces was a service-counter greeting.
  HK_14_1: (lx) =>
    lesson(lx, 14, 1, "Housekeeping. May I Come In?", "Gõ cửa & xin phép vào", {
      vocabulary: [
        v(
          "How may I help",
          "/haʊ meɪ aɪ help/",
          "Tôi có thể giúp gì ạ",
          "Good morning. How may I help?",
          "🤝",
        ),
        v("Checklist", "/ˈtʃeklɪst/", "Bảng kiểm tra", "The checklist is on my trolley.", "☑️"),
        v(
          "Fresh flowers",
          "/freʃ ˈflaʊəz/",
          "Hoa tươi",
          "I will bring fresh flowers, madam.",
          "💐",
        ),
      ],
      grammar: [
        g(
          "I come in now.",
          "Housekeeping. May I come in?",
          "Gõ cửa xong phải XƯNG BỘ PHẬN rồi XIN PHÉP, và chờ nghe trả lời. Không bao giờ tự mở cửa vào.",
          "Housekeeping. May I to come in?",
        ),
        g(
          "You want clean now?",
          "Good morning. How may I help?",
          "Câu mở lịch sự chuẩn: chào đúng buổi trong ngày rồi mời giúp, không hỏi trống không.",
          "Good morning. How I may help?",
        ),
      ],
      speaking: [
        sp(
          "Yes? Who is it?",
          "Housekeeping. May I come in?",
          "Xưng bộ phận trước tên mình — khách sau cánh cửa cần biết NGHỀ của bạn, không cần biết tên. Chữ 'may' kéo dài, đừng đọc cụt thành 'mê'.",
        ),
        sp(
          "Not now, please. Come back later.",
          "Of course, madam. I will come later.",
          "Khách từ chối thì nhận lời ngay, không thương lượng. Đây là lúc dễ mất điểm nhất trong cả ca.",
        ),
        sp(
          "Come in. The room is a mess.",
          "Good morning. How may I help?",
          "Vào rồi vẫn chào, và tuyệt đối không bình luận về tình trạng phòng.",
        ),
        sp(
          "Is room eight-one-two finished?",
          "Not yet. The checklist is here.",
          "Lượt này là đồng nghiệp hỏi nên không có sir/madam. Trả lời bằng cái đang có trong tay, đừng đoán.",
          "colleague",
        ),
      ],
      reading: read(
        `${lx.staff} knocks twice and waits. ${lx.staff} says: "Housekeeping. May I come in?" A guest opens the door. ${lx.staff} says: "Good morning. How may I help?" ${lx.staff} does not walk in first.`,
        [
          {
            q: "Nhân viên làm gì sau khi gõ cửa?",
            options: [
              "Xưng bộ phận, xin phép, rồi chờ khách trả lời",
              "Mở cửa và bước vào luôn cho nhanh",
              "Gọi điện xuống lễ tân hỏi phòng có khách không",
            ],
            correct: 0,
            explanation:
              "Thẻ từ mở được mọi cửa, và đó chính là lý do phải xin phép. Gõ, xưng, chờ — thiếu bước nào cũng thành xâm phạm.",
          },
          {
            q: "Khách bảo quay lại sau thì làm gì?",
            options: [
              "Nhận lời và quay lại sau, ghi lại phòng đó",
              "Vẫn vào vì đã tới giờ dọn phòng",
              "Đề nghị khách ra ngoài một lát",
            ],
            correct: 0,
            explanation:
              "Lịch dọn phòng là việc nội bộ, không phải quyền vào phòng. Khách nói không thì đó là câu trả lời cuối.",
          },
        ],
      ),
      game: [
        game(
          "Yes? What do you want?",
          "Housekeeping. May I come in?",
          "Clean room now yes.",
          "I am coming in, madam.",
          undefined,
          "Câu đó đúng ngữ pháp và nó thông báo chứ không xin phép. Khách trong phòng có thể đang thay đồ; giữa 'xin vào' và 'tôi đang vào' là toàn bộ khác biệt giữa phục vụ và xâm phạm.",
        ),
        game(
          "Please do not come in today.",
          "Of course, madam. I will come later.",
          "OK, tomorrow then.",
          "But your room is not clean, madam.",
          undefined,
          "Đúng ngữ pháp, và nó cãi lại khách về chính căn phòng khách đang trả tiền để ở. Nhận lời rồi ghi lại phòng — giám sát ca sẽ sắp xếp, đó không phải việc bạn phải thuyết phục tại cửa.",
        ),
      ],
    }),

  // The spine sent a guest looking for the store room. A store room holds
  // chemicals and clean linen, and no department lets a guest walk into one.
  HK_8_3: (lx) =>
    lesson(lx, 8, 3, "Upstairs, and Not In Here", "Tầng trên, và chỗ không dành cho khách", {
      vocabulary: [
        v("Upstairs", "/ˌʌpˈsteəz/", "Tầng trên", "The gym is upstairs, madam.", "⬆️"),
        v("Store room", "/stɔː ruːm/", "Kho chứa đồ", "The store room is for staff.", "📦"),
        v("Staircase", "/ˈsteəkeɪs/", "Cầu thang bộ", "The staircase is next to the lift.", "🪜"),
      ],
      grammar: [
        g(
          "Store room there, you go.",
          "The store room is for staff, sir.",
          "Khu vực nội bộ thì nói rõ 'for staff' rồi tự đi lấy giúp khách, đừng chỉ khách vào.",
          "The store room is for staff there.",
        ),
        g(
          "Gym up floor.",
          "The gym is upstairs, madam.",
          "'Upstairs' đã mang sẵn nghĩa tầng trên, không cần thêm 'floor' phía sau.",
          "The gym is upstairs floor, madam.",
        ),
      ],
      speaking: [
        sp(
          "Can I get a towel from in there?",
          "One moment, sir. I will bring one.",
          "Đừng giải thích dài — nhận việc rồi đi lấy là câu ngắn nhất và lịch sự nhất.",
        ),
        sp(
          "Is the gym on this floor?",
          "No, madam. The gym is upstairs.",
          "Trả lời 'no' rồi nói NGAY chỗ đúng, để khách không phải hỏi thêm lượt nữa.",
          undefined,
          ["upstairs"],
        ),
        sp(
          "Can I use the staircase?",
          "Of course. The staircase is next to the lift.",
          "Chữ 'staircase' trọng âm ở đầu: STAIR-case, và có /st/ bật rõ ở đầu từ.",
        ),
        sp(
          "Where is the linen room?",
          "Upstairs, next to the staircase.",
          "Lượt này là đồng nghiệp hỏi nên nói gọn, không kính ngữ.",
          "colleague",
        ),
      ],
      reading: read(
        `A guest looks for towels near the store room. ${lx.staff} says: "The store room is for staff, sir." Then ${lx.staff} says: "One moment. I will bring one." The guest waits in the corridor.`,
        [
          {
            q: "Vì sao không để khách vào kho?",
            options: [
              "Kho có hoá chất và đồ vải sạch, là khu vực nội bộ",
              "Vì kho quá nhỏ, không đủ chỗ đứng",
              "Vì khách sẽ không tìm được đường ra",
            ],
            correct: 0,
            explanation:
              "Hoá chất tẩy rửa để trong đó, và đồ vải sạch mất tiêu chuẩn ngay khi có người ngoài chạm vào. Từ chối ở đây là bảo vệ khách, không phải giữ bí mật.",
          },
          {
            q: "Nhân viên làm gì thay vì chỉ khách vào kho?",
            options: [
              "Tự đi lấy rồi mang ra cho khách",
              "Bảo khách gọi xuống lễ tân",
              "Bảo khách quay lại sau khi dọn xong",
            ],
            correct: 0,
            explanation:
              "Một lời từ chối phải đi kèm việc bạn làm thay. Nếu không, khách nghe được đúng một chữ: không.",
          },
        ],
      ),
      game: [
        game(
          "Can I take a towel from there?",
          "One moment, sir. I will bring one.",
          "Towel there, you take.",
          "Of course, sir. Please go in.",
          undefined,
          "Câu đó lịch sự và nó mời khách bước vào chỗ để hoá chất tẩy rửa. Nếu khách trượt ngã hay chạm phải thứ gì trong đó, người mở cửa là bạn.",
        ),
        game(
          "Which floor is the gym on?",
          "It is upstairs, madam.",
          "Gym up floor.",
          "This floor, madam. Near the store room.",
          undefined,
          "Sai hai lần trong một câu: sai tầng, nên khách đi hết tầng này để tìm một phòng không có ở đây; và lấy kho chứa đồ làm mốc chỉ đường, tức là dẫn khách tới đúng cánh cửa họ không được mở.",
        ),
      ],
    }),

  // ── SPA & WELLNESS ────────────────────────────────────────────────────
  // Most calls into a spa are bookings, and the phone week had four lessons
  // and no booking.
  SW_12_2: (lx) =>
    lesson(lx, 12, 2, "Booking a Treatment", "Đặt lịch trị liệu qua điện thoại", {
      vocabulary: [
        v("In the morning", "/ɪn ðə ˈmɔːnɪŋ/", "Vào buổi sáng", "Ten in the morning, madam?", "🌅"),
        v(
          "Change the time",
          "/tʃeɪndʒ ðə taɪm/",
          "Đổi giờ hẹn",
          "I can change the time, madam.",
          "🔄",
        ),
      ],
      grammar: [
        g(
          "Morning OK you?",
          "Ten in the morning, madam?",
          "Đọc lại giờ rồi lên giọng cuối câu để khách xác nhận. Buổi trong ngày luôn đi với 'in the'.",
          "Ten at the morning, madam?",
        ),
        g(
          "Time change can.",
          "I can change the time, madam.",
          "Chủ ngữ + CAN + động từ nguyên thể. Tiếng Việt bỏ chủ ngữ được, tiếng Anh thì không.",
          "I can to change the time, madam.",
        ),
      ],
      speaking: [
        sp(
          "I would like a massage tomorrow.",
          "Of course. Ten in the morning?",
          "Nhận lời rồi đề xuất ngay một giờ cụ thể. Hỏi trống không kiểu bao-giờ-cũng-được là đẩy việc chọn sang cho khách.",
          undefined,
          ["morning"],
        ),
        sp(
          "Sorry, I will be late.",
          "No problem. I can change the time.",
          "Khách xin đổi giờ thì trấn an trước. Chữ 'change' có /tʃ/ ở đầu và /dʒ/ ở cuối — hai âm khác nhau.",
        ),
        sp(
          "Is Mrs Lee booked for ten?",
          "Yes. She comes in the morning.",
          "Đồng nghiệp hỏi thì trả lời gọn, không kính ngữ. Cụm 'in the morning' đọc liền một hơi.",
          "colleague",
        ),
      ],
      reading: read(
        `A guest calls the spa. ${lx.staff} asks: "Ten in the morning, madam?" The guest says yes. Later the guest calls again. ${lx.staff} says: "No problem. I can change the time." ${lx.staff} writes the new time down.`,
        [
          {
            q: "Nhân viên làm gì trước khi chốt lịch?",
            options: [
              "Đọc lại giờ để khách xác nhận",
              "Ghi luôn vào sổ rồi cúp máy",
              "Hỏi tên khách trước tiên",
            ],
            correct: 0,
            explanation:
              "Nghe nhầm giờ qua điện thoại là lỗi thường gặp nhất, và nó chỉ lộ ra khi khách tới. Đọc lại mất ba giây.",
          },
          {
            q: "Khách xin đổi giờ thì sao?",
            options: [
              "Nhận lời và ghi lại giờ mới ngay",
              "Đề nghị khách giữ đúng giờ cũ",
              "Bảo khách gọi lại sau khi biết chắc",
            ],
            correct: 0,
            explanation:
              "Đổi giờ là việc bình thường của spa. Làm khó ở đây là mất luôn cả lượt khách đó.",
          },
        ],
      ),
      game: [
        game(
          "Can I book for tomorrow morning?",
          "Of course. Ten in the morning?",
          "Tomorrow morning yes OK.",
          "I do not know, madam. Please come and see.",
          undefined,
          "Đúng ngữ pháp và nó biến một cuộc gọi đặt lịch thành một chuyến đi không chắc chắn. Khách gọi điện chính là để khỏi phải đi — bảo họ tới xem là mất lượt đặt.",
        ),
        game(
          "Something came up. Can we move it?",
          "No problem. I can change the time.",
          "Change no problem yes.",
          "I am sorry, madam. It is too late now.",
          undefined,
          "Câu đó đúng ngữ pháp nhưng phạt khách vì một việc chưa xảy ra. Nếu có quy định phí đổi lịch thì đó là việc của quản lý nói, không phải câu đầu tiên khách nghe.",
        ),
      ],
    }),

  // Phase 0 teaches the reflex for heat and pressure: STOP. Week 13 replaced
  // it with a promise to adjust while the treatment continues.
  SW_13_1: (lx) =>
    lesson(lx, 13, 1, "Too Hot: Stop First", "Quá nóng: dừng trước đã", {
      vocabulary: [
        v("Problem", "/ˈprɒbləm/", "Vấn đề, sự cố", "Is there a problem, madam?", "⚠️"),
        v("Fix", "/fɪks/", "Sửa (việc của bộ phận kỹ thuật)", "I cannot fix it, madam.", "🔧"),
        v("Too hot", "/tuː hɒt/", "Quá nóng", "Tell me if it is too hot.", "🥵"),
        v("Too cold", "/tuː kəʊld/", "Quá lạnh", "Is the room too cold, madam?", "🥶"),
      ],
      grammar: [
        g(
          "Hot? Wait, finish soon.",
          "I am sorry. I will stop now.",
          "Khách kêu nóng là DỪNG trước, hỏi sau. Không bao giờ hứa 'sắp xong' khi da khách đang chịu nhiệt.",
          "I am sorry. I will stopping now.",
        ),
        g(
          "You tell me hot cold.",
          "Tell me if it is too hot.",
          "Câu dặn khách trước khi bắt đầu, mở bằng động từ: TELL ME IF…",
          "Tell me it is too hot.",
        ),
      ],
      speaking: [
        sp(
          "This is too hot!",
          "I am sorry. I will stop now.",
          "Một chữ duy nhất phải bật ra: STOP. Mọi câu khác đều đến sau khi đã dừng tay.",
          undefined,
          ["stop"],
        ),
        sp(
          "The room is too cold.",
          "I am sorry, madam. I will check it.",
          "Nóng thì dừng, lạnh thì kiểm — hai mức khác nhau vì rủi ro khác nhau.",
        ),
        sp(
          "It is fine now, thank you.",
          "Please tell me if it is too hot.",
          "Dặn lại một lần nữa sau khi xử lý, vì khách hay ngại kêu lần thứ hai. Thêm 'Please' cho câu thành lời mời, không thành mệnh lệnh.",
        ),
        sp(
          "Can you fix the heater?",
          "I cannot fix it. I will tell my manager.",
          "Nói rõ giới hạn của mình rồi chuyển tiếp. Trung thực ở đây nhanh hơn là thử sửa.",
          undefined,
          ["manager"],
        ),
      ],
      reading: read(
        `A guest says the towel is too hot. ${lx.staff} stops at once. ${lx.staff} says: "I am sorry, madam. I will stop now." ${lx.staff} does not finish the step first. Heat can burn skin in seconds.`,
        [
          {
            q: "Khách kêu quá nóng thì làm gì TRƯỚC?",
            options: [
              "Dừng tay ngay, rồi mới xin lỗi và xử lý",
              "Làm nốt bước đang dở cho nhanh",
              "Hỏi khách có chịu thêm được không",
            ],
            correct: 0,
            explanation:
              "Bỏng xảy ra trong vài giây. Thứ tự đúng là dừng — xin lỗi — kiểm; đảo thứ tự là hỏng cả ba.",
          },
          {
            q: "Vì sao không hứa 'sắp xong'?",
            options: [
              "Vì tổn thương xảy ra ngay trong lúc chờ cho xong",
              "Vì khách không hiểu câu tiếng Anh đó",
              "Vì quản lý cấm nói câu đó với khách",
            ],
            correct: 0,
            explanation:
              "Câu đó xin khách chịu đựng thêm một lát. Với nhiệt thì 'một lát' chính là khoảng thời gian gây bỏng.",
          },
        ],
      ),
      game: [
        game(
          "Ouch, that is too hot!",
          "I am sorry, madam. I will stop now.",
          "Hot? Almost finish.",
          "One moment, madam. I will fix it now.",
          undefined,
          "Câu đó đúng ngữ pháp, nghe rất chuyên nghiệp, và trong lúc bạn 'xử lý' thì tay bạn vẫn đang ở trên da khách. Với nhiệt, hành động đầu tiên không phải là sửa mà là bỏ tay ra.",
        ),
        game(
          "Is this all right for you?",
          "Tell me if it is too hot.",
          "Hot cold you say.",
          "It is fine, madam. Do not worry.",
          undefined,
          "Câu đó thay cảm nhận của khách bằng cảm nhận của bạn. Khách nằm sấp, mắt nhắm, không thấy gì — họ là người duy nhất biết nóng tới đâu, nên phải mời họ nói.",
        ),
      ],
    }),

  // "Do you have the hair cap?" -> "Would you like the appointment?" read as an
  // upsell straight after a failure. Fully booked is the real scene.
  SW_9_4: (lx) =>
    lesson(lx, 9, 4, "We Are Fully Booked", "Khi spa kín lịch", {
      vocabulary: [
        v("Appointment", "/əˈpɔɪntmənt/", "Lịch hẹn", "The next appointment is at four.", "📅"),
        v("Music", "/ˈmjuːzɪk/", "Nhạc", "Would you like some music, madam?", "🎵"),
      ],
      grammar: [
        g(
          "Today full, no.",
          "I am sorry. We are fully booked.",
          "Báo kín lịch nói đủ câu, và luôn nói kèm giờ còn trống ngay sau đó.",
          "I am sorry. We are fully book.",
        ),
        g(
          "Music you want?",
          "Would you like some music, madam?",
          "'Music' là danh từ không đếm được nên đi với 'some', không đi với 'a'.",
          "Would you like a music, madam?",
        ),
      ],
      speaking: [
        sp(
          "Can I have a massage now?",
          "I am sorry. We are fully booked.",
          "Nói thẳng là kín lịch, đừng để khách hy vọng rồi hụt. Cụm 'fully booked' đọc liền hai chữ.",
        ),
        sp(
          "So when can I come?",
          "The next appointment is at four.",
          "Luôn đưa một mốc giờ cụ thể. Chữ 'appointment' trọng âm ở giữa: a-POINT-ment.",
          undefined,
          ["appointment"],
        ),
        sp(
          "All right, four o'clock then.",
          "Thank you. Would you like some music?",
          "Chốt xong mới mời thêm — mời trước khi giải quyết xong nghe như đang bán hàng.",
        ),
      ],
      reading: read(
        `A guest wants a treatment now. ${lx.staff} says: "I am sorry, madam. We are fully booked." Then ${lx.staff} says: "The next appointment is at four." ${lx.staff} always gives a time, not only a no.`,
        [
          {
            q: "Sau khi báo kín lịch, nhân viên nói gì?",
            options: [
              "Giờ trống gần nhất",
              "Một lời xin lỗi nữa cho lịch sự",
              "Bảo khách hỏi lại ở quầy lễ tân",
            ],
            correct: 0,
            explanation:
              "Khách hỏi để biết khi nào được, không phải để biết bây giờ thì không. Con số là phần duy nhất họ dùng được.",
          },
          {
            q: "Vì sao phải đưa một mốc giờ?",
            options: [
              "Để khách còn quyết được là chờ hay đi chỗ khác",
              "Để khách thấy spa đang rất đông khách",
              "Vì quy định bắt phải đọc giờ ra",
            ],
            correct: 0,
            explanation:
              "Không có mốc thì khách tự đoán, và họ luôn đoán lâu hơn thực tế. Một con số giữ được lượt khách đó.",
          },
        ],
      ),
      game: [
        game(
          "I would like a massage at two.",
          "I am sorry. The next appointment is at four.",
          "Two no, four yes.",
          "I am sorry, madam. We have none today.",
          undefined,
          "Câu đó đúng ngữ pháp và nó đóng cửa cả ngày, trong khi bốn giờ vẫn còn chỗ. Khách nghe 'không có gì hôm nay' là đi tìm spa khác — và họ sẽ tìm được.",
        ),
        game(
          "It is very quiet in here.",
          "Would you like some music, madam?",
          "Music you want yes?",
          "Yes, madam. Nobody comes today.",
          undefined,
          "Đúng ngữ pháp và nó nói với khách rằng chỗ này ế. Khách nhận xét về không gian là đang bắt chuyện, không phải đang hỏi về tình hình kinh doanh.",
        ),
      ],
    }),

  // ── GUEST RELATIONS ───────────────────────────────────────────────────
  // The department whose whole job is knowing about guests, taught for eight
  // weeks without one sentence refusing to confirm that a guest is staying.
  GR_12_3: (lx) =>
    lesson(lx, 12, 3, "I Cannot Say Who Is Staying", "Không xác nhận khách đang lưu trú", {
      vocabulary: [
        v("Car", "/kɑː/", "Xe ô tô đưa đón", "The car is at the main door.", "🚗"),
        v("Arrange a car", "/əˈreɪndʒ ə kɑː/", "Bố trí xe", "Let me arrange a car for you.", "🚙"),
      ],
      grammar: [
        g(
          "Mrs Chen room three-one-two.",
          "I am sorry. I cannot say.",
          "Không xác nhận khách nào đang lưu trú, kể cả nói 'không có'. Xin lỗi rồi từ chối, không thêm gì.",
          "I am sorry. I cannot to say.",
        ),
        g(
          "Car I arrange you.",
          "Let me arrange a car for you.",
          "'Let me + động từ' là cách đề nghị giúp lịch sự nhất, và đúng trật tự chủ ngữ – động từ.",
          "Let me to arrange a car for you.",
        ),
      ],
      speaking: [
        sp(
          "Is Mrs Chen staying here?",
          "I am sorry, sir. I cannot say.",
          "Câu này phải bật ra không cần nghĩ, và dừng ở đó. Thêm bất kỳ chữ nào cũng là thêm thông tin.",
          undefined,
          ["cannot"],
        ),
        sp(
          "I am her colleague from work.",
          "I can take a message, sir.",
          "Từ chối rồi mở một lối khác. Chữ 'message' kết bằng /dʒ/, không phải /s/.",
        ),
        sp(
          "Can you check the record for me?",
          "One moment, sir. Please hold on.",
          "Bài khung ở ô này dạy xin khách chờ, và bài riêng phải giữ lại chức năng đó. Cụm 'hold on' đọc nối thành một hơi.",
        ),
        sp(
          "I need a car at eight.",
          "Of course. Let me arrange a car.",
          "Nhận việc về mình bằng 'Let me', đừng bảo khách tự gọi. Chữ 'arrange' trọng âm ở âm sau: a-RRANGE.",
          undefined,
          ["arrange"],
        ),
      ],
      reading: read(
        `A caller asks if Mrs Chen is staying. ${lx.staff} says: "I am sorry, sir. I cannot say." ${lx.staff} does not say yes and does not say no. ${lx.staff} takes a message instead. The guest decides who may know.`,
        [
          {
            q: "Vì sao không trả lời 'không' cho an toàn?",
            options: [
              "Trả lời kiểu nào cũng cho biết khách có ở đây hay không",
              "Vì nói 'không' là nói dối với người gọi",
              "Vì người gọi chắc chắn sẽ gọi lại lần nữa",
            ],
            correct: 0,
            explanation:
              "Người gọi thử vài khách sạn một lượt; nơi nào nói 'no' thì loại được, nơi nào ngập ngừng thì trúng. Chỉ một câu duy nhất không rò rỉ gì.",
          },
          {
            q: "Nhân viên làm gì thay vào đó?",
            options: [
              "Nhận lời nhắn, để khách tự quyết có gọi lại không",
              "Chuyển máy thẳng vào phòng khách",
              "Ghi lại số người gọi rồi thôi",
            ],
            correct: 0,
            explanation:
              "Lời nhắn giữ được cả hai phía: người gọi có đường liên lạc, còn quyền quyết định vẫn nằm ở khách.",
          },
        ],
      ),
      game: [
        game(
          "Is Mrs Chen in room three-one-two?",
          "I am sorry, sir. I cannot say.",
          "Chen three-one-two yes.",
          "No, sir. She is not staying here.",
          undefined,
          "Nghe như đã bảo vệ khách, nhưng nó vẫn là một câu trả lời: người gọi vừa biết chắc bà ấy KHÔNG ở đây, và sẽ gọi khách sạn tiếp theo. Từ chối đúng là không xác nhận theo cả hai chiều.",
        ),
        game(
          "Can you get me a car at eight?",
          "Of course. Let me arrange a car.",
          "Car eight, you wait.",
          "Please call a taxi yourself, sir.",
          undefined,
          "Đúng ngữ pháp và nó trả việc lại cho khách — trong khi bố trí xe là đúng phần việc của bộ phận này. Khách hỏi bạn vì họ không muốn tự lo, và câu đó nói rằng họ vẫn phải tự lo.",
        ),
      ],
    }),

  // "Can I walk here?" -> "Please be careful. It is dark." Every option let the
  // guest walk into the dark; none of them walked with her.
  GR_10_4: (lx) =>
    lesson(lx, 10, 4, "Careful — Walk With Them", "Chỗ tối: đi cùng khách", {
      vocabulary: [v("Dark", "/dɑːk/", "Tối", "The garden path is dark, sir.", "⚠️")],
      grammar: [
        g(
          "Careful dark!",
          "Please be careful. It is dark.",
          "Cảnh báo lịch sự đủ hai phần: 'Please be careful' rồi mới tới lý do.",
          "Please careful. It is dark.",
        ),
        g(
          "You wait, I go first.",
          "Please wait. Let me show you.",
          "Bảo khách chờ rồi mình đi trước — hai câu ngắn, không ghép thành một câu dài.",
          "Please wait. Let me to show you.",
        ),
      ],
      speaking: [
        sp(
          "Can I walk to the beach now?",
          "Please wait, sir. Let me show you.",
          "Cảnh báo suông vẫn để khách đi vào chỗ tối. Câu đúng giữ khách lại MỘT nhịp rồi đi cùng.",
          undefined,
          ["wait"],
        ),
        sp(
          "It is very dark out there.",
          "Yes, sir. Please be careful.",
          "Xác nhận điều khách vừa thấy trước, rồi mới dặn. Chữ 'careful' trọng âm ở đầu: CARE-ful.",
        ),
        sp(
          "Is it dark on the path?",
          "Yes, madam. I will walk with you.",
          "Đề nghị đi cùng là câu ghi điểm nhất cả tuần, và nó rẻ hơn một tai nạn.",
        ),
      ],
      reading: read(
        `A guest wants to walk to the beach at night. The path is dark. ${lx.staff} says: "Please wait, sir. Let me show you." ${lx.staff} walks with the guest to the light. ${lx.staff} does not only warn and stay behind.`,
        [
          {
            q: "Đường tối thì nhân viên làm gì?",
            options: [
              "Đi cùng khách, không chỉ nhắc rồi đứng lại",
              "Nhắc khách cẩn thận rồi để khách tự đi",
              "Bảo khách đi lối khác cho an toàn",
            ],
            correct: 0,
            explanation:
              "Lời nhắc không thay được ánh sáng. Nếu chỗ đó đủ nguy hiểm để phải cảnh báo thì nó cũng đủ nguy hiểm để phải đi cùng.",
          },
          {
            q: "Vì sao chỉ cảnh báo là chưa đủ?",
            options: [
              "Vì khách vẫn bước vào đúng chỗ có rủi ro",
              "Vì khách không hiểu câu tiếng Anh đó",
              "Vì quản lý không cho phép cảnh báo khách",
            ],
            correct: 0,
            explanation:
              "Cảnh báo chuyển rủi ro sang khách chứ không gỡ nó đi. Người duy nhất biết đường ở đây là bạn.",
          },
        ],
      ),
      game: [
        game(
          "Can I walk here?",
          "Please wait, sir. Let me show you.",
          "Careful dark!",
          "Yes, sir. Please be careful. It is dark.",
          undefined,
          "Câu đó lịch sự, đúng ngữ pháp, và vẫn cho phép khách đi vào chỗ bạn vừa nói là tối. Cảnh báo rồi đứng nhìn không phải là xử lý — nếu đủ nguy hiểm để cảnh báo thì đủ nguy hiểm để đi cùng.",
        ),
        game(
          "I know the way, thank you.",
          "Of course. I will walk with you.",
          "You know way OK.",
          "As you like, sir. It is dark.",
          undefined,
          "Đúng ngữ pháp và nó biến lời cảnh báo thành lời phủi tay: 'tuỳ ông, trời tối đấy'. Khách từ chối giúp thì vẫn đi cùng một đoạn — đề nghị lần hai không làm phiền ai.",
        ),
      ],
    }),
};

const WEEK_META: Record<number, { en: string; vi: string; build: (lx: Ctx) => LessonContent[] }> = {
  7: {
    en: "People & Jobs in the Hotel",
    vi: "Con người & Công việc trong khách sạn",
    build: week7,
  },
  8: { en: "Places & Directions", vi: "Vị trí & Chỉ đường trong khuôn viên", build: week8 },
  9: { en: "Simple Guest Requests", vi: "Yêu cầu đơn giản của khách", build: week9 },
  10: { en: "Describing Things & States", vi: "Mô tả đồ vật & Trạng thái", build: week10 },
  11: { en: "Schedules & Shift Routines", vi: "Lịch trình & Thói quen ca làm", build: week11 },
  12: { en: "Answering the Phone", vi: "Nghe điện thoại cơ bản", build: week12 },
  13: { en: "Simple Problems & Apologies", vi: "Sự cố đơn giản & Xin lỗi", build: week13 },
  14: {
    en: "Checkpoint — First Sentences",
    vi: "Kiểm tra tổng hợp — Giao tiếp câu đơn",
    build: week14,
  },
};

/** Headwords taught in a given Phase 1 week, for recycling lookups. */
/** The lessons a department actually gets for a week: the shared frame with
 *  any department lesson swapped in at the same slot. Every reader of Phase 1
 *  content goes through here, the review scheduler included — Phase 0 learned
 *  that the hard way when an override changed a headword and the scheduler
 *  went on pointing at a card nobody taught. */
function lessonsFor(lx: Ctx, week: number): LessonContent[] {
  return WEEK_META[week].build(lx).map((l) => DEPT_LESSONS[l.lessonId]?.(lx) ?? l);
}

function headwordsOf(lx: Ctx, week: number): string[] {
  return lessonsFor(lx, week).flatMap((l) => l.vocabulary.map((item) => item.word));
}

/**
 * Graduated spaced recycling. Phase 0 simply took the six most recent
 * headwords; that only ever rehearses last week's material. Retention
 * research favours *expanding* intervals, so a Phase 1 week pulls from
 * three distances at once:
 *   ~40% from 1 week back  (consolidation)
 *   ~30% from 3 weeks back (medium spacing)
 *   ~30% from Phase 0      (long-term retrieval of the foundation)
 * Week 14 is the checkpoint and sweeps the whole phase instead.
 */
function reviewWordsFor(lx: Ctx, week: number, phase0Words: string[]): string[] {
  if (week === 14) {
    // Checkpoint sweeps the whole phase.
    const all: string[] = [];
    for (let w = 7; w <= 13; w++) all.push(...headwordsOf(lx, w));
    return Array.from(new Set(all));
  }

  const out: string[] = [];

  // 1-back — consolidate last week while it is still fresh.
  //
  // These two were `.slice(0, 4)` and `.slice(0, 3)`. Headwords are authored
  // lesson by lesson, so both slices returned lesson 1's words — and returned
  // the SAME words, since [0..3] contains [0..2]. A week therefore had four of
  // its ~11 headwords recycled, twice, and the other seven never. Measured
  // across all six departments: 51 of 75 Phase 1 headwords arrived at the
  // week-14 checkpoint having never appeared in a weekly review list.
  //
  // Now the +1 visit takes a spread across all four lessons and the +3 visit
  // takes a spread of what +1 did not, so the two visits are disjoint and
  // together cover roughly seven of eleven.
  const oneBack = week - 1;
  if (oneBack >= 7) out.push(...headwordsOf(lx, oneBack));

  // 3-back — the medium interval.
  const threeBack = week - 3;
  if (threeBack >= 7) {
    const src = headwordsOf(lx, threeBack);
    const alreadySeen = new Set(src);
    out.push(
      ...spread(
        src.filter((w) => !alreadySeen.has(w)),
        3,
      ),
    );
  }

  // Long interval: walk the whole Phase 0 list across weeks 7-13 so every
  // pre-A1 headword is retrieved at least once instead of the same handful
  // being rehearsed forever.
  const slots = 7; // weeks 7..13
  const size = Math.ceil(phase0Words.length / slots);
  const start = (week - 7) * size;
  out.push(...phase0Words.slice(start, start + size));

  return Array.from(new Set(out));
}

function buildWeek(lx: Ctx, week: number, phase0Words: string[]): WeekContent {
  const meta = WEEK_META[week];
  return {
    departmentId: lx.code,
    weekNumber: week,
    weekTitleEn: meta.en,
    weekTitleVi: meta.vi,
    // Phase 0 locks its headwords into the grader here and Phase 1 did not,
    // so eight weeks of speaking could be passed without saying the word the
    // lesson exists to teach.
    lessons: lockWeekHeadwords(lessonsFor(lx, week)),
    reviewWords: reviewWordsFor(lx, week, phase0Words),
  };
}

/** All 48 Phase 1 weeks (6 departments × weeks 7-14), keyed `${DEP}-${week}`. */
export function buildPhase1(
  phase0WordsByDep: Record<string, string[]>,
): Record<string, WeekContent> {
  const out: Record<string, WeekContent> = {};
  for (const [code, base] of Object.entries(LEXICONS)) {
    const lx: Ctx = { ...base, bank: P1_BANKS[code] };
    const p0 = phase0WordsByDep[code] ?? [];
    for (let w = 7; w <= 14; w++) out[`${code}-${w}`] = buildWeek(lx, w, p0);
  }
  return out;
}

/** Every Phase 1 headword a department met, in teaching order — the
 *  medium-spacing pool Phase 2 recycles from. */
export function phase1WordsByDep(): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const [code, base] of Object.entries(LEXICONS)) {
    const lx: Ctx = { ...base, bank: P1_BANKS[code] };
    out[code] = [];
    for (let w = 7; w <= 14; w++) out[code].push(...headwordsOf(lx, w));
  }
  return out;
}
