# Phase 3 bank contract (weeks 23–30, A2+)

Each department bank has 8 slots × 12 words. The spine builds sentences by
dropping bank words into fixed frames, so **each slot has a required part of
speech**. A word that does not fit its frame produces ungrammatical output.

Part of speech is necessary but **not sufficient**. Every defect the 2026-08
academic review found passed the part-of-speech check: "Duration" is a
perfectly good noun and a nonsense surcharge, "Received" is a perfectly good
past verb and cannot stand without an object. So each slot also declares the
**semantic class** its frames assume. When you author a replacement word,
both columns have to hold.

| Slot          | Week | Part of speech required                    | Frames it must fit                                                                  |
| ------------- | ---- | ------------------------------------------ | ----------------------------------------------------------------------------------- |
| `upgrades`    | 23   | **noun phrase** (usable after "the")       | `I recommend the {w}.` · `The {w} is quieter than the standard one.`                |
| `policies`    | 24   | **noun phrase** naming a fee/rule          | `There is a {w} for that.` · `We have to apply the {w} because it is hotel policy.` |
| `commitments` | 25   | **bare verb phrase** (after "will"/"can")  | `I will {w} within ten minutes.` · `We are going to {w} before three o'clock.`      |
| `partners`    | 26   | **noun phrase** naming a team/role         | `Let me check with {w}.` · `I will ask {w} to help you.`                            |
| `complaints`  | 27   | **noun phrase** naming a problem           | `I am very sorry about the {w}.` · `I understand your concern about the {w}.`       |
| `solutions`   | 28   | **bare verb phrase** (after "I can")       | `If you like, I can {w}.` · `If you prefer, we will {w} instead.`                   |
| `handover`    | 29   | **noun phrase** naming a shift-report item | `I updated the {w} this morning.` · `The {w} is ready for the next shift.`          |
| `wrapUp`      | 30   | **noun phrase**, mixed review              | `Let me confirm the {w}.` · `I can confirm the {w} myself now.`                     |

### Semantic class per slot

> Cột này nay **được thi hành bằng máy**: Layer D trong `scripts/lint-content.ts`.
> Nợ đã biết nằm ở `scripts/_semantic-debt.json`; bối cảnh ở `docs/semantic-class-debt.md`.

| Slot          | Must denote                              | Fails as                                                                      |
| ------------- | ---------------------------------------- | ----------------------------------------------------------------------------- |
| `upgrades`    | something a guest can be offered         | an abstraction with no price                                                  |
| `policies`    | **a charge or a rule**                   | a duration, an ID number, a payment term — "A ten percent duration is added." |
| `commitments` | an action the speaker performs           | an action requiring someone else                                              |
| `partners`    | a team or role, animate                  | a document                                                                    |
| `complaints`  | a problem the hotel caused               | a solution — "Recovery plan" inverts the apology                              |
| `solutions`   | a remedy the speaker may grant           | a task unrelated to the complaint                                             |
| `handover`    | an item recorded on a shift report       | a person                                                                      |
| `wrapUp`      | **a detail a guest asks you to confirm** | an incident, a career step — "I am ready for the flight time."                |

## Hard rules

1. **Lowercase-safe.** The spine calls `.toLowerCase()` on every word when it
   sits mid-sentence. So no word may depend on internal capitals.
2. **No article inside the word.** Write `sea-view room`, not `a sea-view room`.
   The frame supplies "the"/"a".
3. **Verb-phrase slots start with a bare infinitive**: `move you to another room`,
   not `moving you…` and not `to move…`.
4. **Length.** Frames already spend 6–9 words, and the A2+ cap is 16 words per
   sentence, so keep every word ≤ 5 words long.
5. **No duplicates** — not against `scripts/_existing-headwords.json` for that
   department (all of Phase 0/1/2 + hand-authored weeks), and not within the new
   bank itself.
6. **Department-specific.** ≥10 of each slot's 12 words must be meaningful only
   for that department's job. Generic service words waste the differentiation
   budget (`verify:content` enforces a floor).
7. **Register: A2+.** Concrete, operational hotel vocabulary. No idioms, no
   abstract business jargon (that is Phase 4).

## Item shape

```ts
{ word: "Sea-view room", phonetic: "/siː vjuː ruːm/", definition: "Phòng nhìn ra biển", icon: "🌊" }
```

- `word` — Sentence case, first letter capital only.
- `phonetic` — IPA, British-leaning, matching the existing banks' style.
- `definition` — Vietnamese, concise, no English in it.
- `icon` — one emoji, distinct within its slot.
