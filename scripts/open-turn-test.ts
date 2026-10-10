// An open spoken turn (src/lib/open-turn.ts): the marker a learner meets and
// the checks an author's turn must clear before it ships. Weeks 41–80 have no
// lessons yet, so the three turns below are written to the outline
// (docs/curriculum-41-80/) to stand in for them.
//
//   bun scripts/open-turn-test.ts
import type { OpenTurn } from "../src/lib/content/week-content.ts";
import { openTurnMaxWords, openTurnProblems, scoreOpenTurn } from "../src/lib/open-turn.ts";

let pass = 0;
let fail = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
}

// Front Office, week 43 — "A Better Room": the learner has to ask.
const betterRoom: OpenTurn = {
  prompt: "I'd like a better room, please.",
  taskVi: "Khách muốn phòng tốt hơn nhưng chưa nói tốt hơn là thế nào. Hỏi cho ra điều khách cần.",
  mustConvey: [
    {
      labelVi: "nhận lời",
      any: ["of course", "certainly", "let me see", "let me check", "happy to"],
    },
    {
      labelVi: "hỏi khách muốn gì ở phòng",
      any: [
        "could you tell me",
        "do you mean",
        "what matters",
        "would you like",
        "are you looking for",
      ],
      required: true,
    },
    {
      labelVi: "đưa ít nhất một hướng để khách chọn",
      any: ["quieter", "larger", "bigger", "higher floor", "a bath", "a view", "more space"],
    },
  ],
  minWords: 12,
  modelAnswer:
    "Of course, madam. Could you tell me whether you would like a quieter room or a larger one? Then I can see what we have tonight.",
  explanationVi:
    "Chưa biết khách cần gì thì chưa đổi được phòng: nhận lời, rồi hỏi bằng hai lựa chọn.",
};

// Spa, week 49 — "I Cannot Say; I Will Ask Our Nurse": the must-be-right turn.
const isItSafe: OpenTurn = {
  prompt: "I had surgery on my knee last month. Is the hot stone massage safe for me?",
  taskVi:
    "Khách hỏi một điều về sức khoẻ. Bạn không phải người trả lời; nói ai trả lời và khi nào bạn quay lại.",
  mustConvey: [
    {
      labelVi: "nói rõ mình không trả lời được câu này",
      any: [
        "cannot say",
        "can't say",
        "not able to say",
        "unable to say",
        "cannot tell you",
        "not for me to say",
      ],
      required: true,
    },
    { labelVi: "ai sẽ trả lời", any: ["nurse", "spa manager", "my manager"], required: true },
    {
      labelVi: "mốc giờ mình quay lại",
      any: ["ten minutes", "five minutes", "come back to you", "back to you"],
    },
  ],
  mustAvoidAsserted: ["it is safe", "it's safe", "you will be fine", "no problem"],
  minWords: 14,
  modelAnswer:
    "I cannot say whether it is safe for you, madam. I will ask our nurse now and come back to you in ten minutes.",
  explanationVi:
    "Kỹ thuật viên không chẩn đoán. Không đoán, không trấn an: nói ai trả lời và giờ mình quay lại.",
  risk: true,
};

// Housekeeping, week 52 — read back what the guest said; narrate nothing.
const leftOnTheDesk: OpenTurn = {
  prompt: "My watch was on the desk when I went out this morning. Now it is gone.",
  taskVi:
    "Khách báo mất đồ. Nhắc lại điều khách kể để ghi cho đúng, giữ nguyên phòng, và nói ai đang tới.",
  mustConvey: [
    {
      labelVi: "ghi nhận lời khách",
      any: ["i am sorry to hear", "sorry to hear", "i understand", "i hear you"],
    },
    {
      labelVi: "nhắc lại điều khách kể",
      any: ["you had left", "you left it", "it was on the desk", "so the watch was"],
      required: true,
    },
    {
      labelVi: "ai đang tới",
      any: ["my supervisor", "the duty manager", "security"],
      required: true,
    },
    {
      labelVi: "giữ nguyên phòng",
      any: ["not touch", "will not move", "leave everything", "as it is"],
    },
  ],
  mustAvoid: ["compensate", "refund", "we will pay", "nobody took", "must have been"],
  minWords: 16,
  modelAnswer:
    "I am sorry to hear that, sir. So you had left it on the desk before you went out? I will not touch anything, and my supervisor is coming to you now.",
  explanationVi:
    "Với người bị thiệt: nhắc lại lời khách, nói việc đang làm và ai đang tới. Không đoán, không hứa tiền.",
  risk: true,
};

const turns: Array<[string, OpenTurn, number]> = [
  ["FO w43 a better room", betterRoom, 43],
  ["SW w49 is it safe", isItSafe, 49],
  ["HK w52 the watch", leftOnTheDesk, 52],
];

// ── Three turns an author could ship ───────────────────────────────────────
for (const [name, turn, week] of turns) {
  const problems = openTurnProblems(turn, week);
  check(`${name}: nothing to fix`, problems.length === 0, problems.join(" | "));
}

// ── What the learner meets ─────────────────────────────────────────────────
{
  const said = (t: OpenTurn, s: string) => scoreOpenTurn(t, s);
  check(
    "another good answer in other words passes",
    said(
      betterRoom,
      "certainly madam let me check what we have do you mean a bigger room or one on a higher floor",
    ).passed,
  );
  check(
    "an answer that offers a room without asking does not",
    !said(
      betterRoom,
      "of course madam i can give you a larger room on a higher floor tonight no problem",
    ).passed,
  );
  check(
    'the safety turn: "I cannot say… I will ask our nurse" passes',
    said(
      isItSafe,
      "i cannot say that madam i will ask our nurse and come back to you in five minutes",
    ).passed,
  );
  check(
    'the safety turn: "do not worry, it is safe" does not, however complete',
    !said(
      isItSafe,
      "i cannot say for sure madam but do not worry it is safe i will ask our nurse and come back to you",
    ).passed,
  );
  check(
    "the lost watch: a promise of money does not pass",
    !said(
      leftOnTheDesk,
      "i am sorry to hear that sir so you had left it on the desk my supervisor is coming and we will pay for it",
    ).passed,
  );
  check(
    "typed on a device that cannot hear: the model answer passes with its punctuation",
    scoreOpenTurn(isItSafe, isItSafe.modelAnswer, "typed").passed,
  );
}

// ── What the gate tells an author ──────────────────────────────────────────
{
  const has = (t: OpenTurn, week: number, fragment: string) =>
    openTurnProblems(t, week).some((p) => p.includes(fragment));

  check(
    "two ideas are too few",
    has({ ...betterRoom, mustConvey: betterRoom.mustConvey.slice(0, 2) }, 43, "3 or 4"),
  );
  check(
    "an idea with one accepted wording is a sentence to say back",
    has(
      {
        ...betterRoom,
        mustConvey: [{ labelVi: "x", any: ["of course"] }, ...betterRoom.mustConvey.slice(1)],
      },
      43,
      "single accepted wording",
    ),
  );
  check(
    "a model answer over the week's ceiling is reported",
    has(
      { ...betterRoom, modelAnswer: `${betterRoom.modelAnswer} ${betterRoom.modelAnswer}` },
      43,
      "allows 40",
    ),
    `ceiling at week 43 is ${openTurnMaxWords(43)}, at week 75 ${openTurnMaxWords(75)}`,
  );
  check(
    "a model answer that fails its own marker is reported",
    has(
      {
        ...isItSafe,
        modelAnswer:
          "Yes madam, it is safe for you. I will ask our nurse and come back to you in ten minutes.",
      },
      49,
      "does not pass",
    ),
  );
  check(
    "English printed in the instructions is reported",
    has(
      { ...isItSafe, taskVi: "Nói với khách: I cannot say, rồi gọi y tá." },
      49,
      "printed in the instructions",
    ),
  );
  check(
    "a turn the guest's own words can pass is reported",
    has(
      {
        ...leftOnTheDesk,
        minWords: 10,
        mustAvoid: undefined,
        mustConvey: [
          { labelVi: "a", any: ["my watch", "the watch"] },
          { labelVi: "b", any: ["on the desk", "the desk"] },
          { labelVi: "c", any: ["this morning", "went out"] },
        ],
        modelAnswer:
          "So the watch was on the desk when you went out this morning, sir, is that right?",
      },
      52,
      "line back passes",
    ),
  );
  check(
    "a risk turn that forbids nothing is reported",
    has({ ...isItSafe, mustAvoidAsserted: undefined }, 49, "forbids nothing"),
  );
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
