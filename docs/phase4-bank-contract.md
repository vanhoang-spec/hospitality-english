# Phase 4 bank contract (weeks 31–40, B1.1)

Each department bank has 9 slots × 14 words. The spine builds sentences by
dropping bank words into fixed frames, so **each slot has a required part of
speech**. A word that does not fit its frame produces ungrammatical output —
this is the single most common defect in this codebase's content history.

| Slot          | Week | Part of speech required                   | Frames it must fit                                                                          |
| ------------- | ---- | ----------------------------------------- | ------------------------------------------------------------------------------------------- |
| `story`       | 31   | **noun phrase**                           | `The {w} is what makes this place special.` · `Let me tell you about the {w}.`              |
| `preferences` | 32   | **noun phrase** naming a taste/need       | `Based on your {w}, I would suggest the quiet wing.` · `May I note your {w} in the system?` |
| `disputes`    | 33   | **noun phrase** naming a claim/loss       | `I am very sorry about the {w}.` · `Our policy allows compensation for the {w}.`            |
| `occasions`   | 34   | **noun phrase** naming an event element   | `We have prepared the {w} for you.` · `The {w} will be ready before you return.`            |
| `tradeoffs`   | 35   | **bare verb phrase** (after "we"/"I can") | `What if we {w} instead?` · `I can {w} in exchange for a longer stay.`                      |
| `emergencies` | 36   | **noun phrase** naming an incident        | `There is a {w} on the third floor.` · `Please stay calm — we are handling the {w}.`        |
| `terms`       | 37   | **noun phrase** naming a contract term    | `The {w} is valid for twelve months.` · `Could we review the {w} together?`                 |
| `proposal`    | 38   | **noun phrase** naming a proposal element | `The {w} is included in this offer.` · `I have attached the {w} for your review.`           |
| `wrapUp`      | 40   | **noun phrase**, mixed review             | `Let me confirm the {w} with you.`                                                          |

## Hard rules

1. **Lowercase-safe.** The spine calls `.toLowerCase()` on every word when it
   sits mid-sentence. So no word may depend on internal capitals. (`VIP` is the
   one accepted exception — it already appears that way in earlier banks.)
2. **No article inside the word.** Write `late departure fee`, not
   `a late departure fee`. The frame supplies "the"/"a".
3. **Verb-phrase slot (`tradeoffs`) starts with a bare infinitive**:
   `waive the resort fee`, not `waiving…` and not `to waive…`.
4. **Length.** Frames spend 6–10 words and the B1.1 cap is 22 words per
   sentence, so keep every word ≤ 5 words long.
5. **No duplicates** — not against `scripts/_existing-headwords.json` for that
   department (all of Phases 0–3 plus the hand-authored weeks), and not within
   the new bank itself. This list is now 350–385 words per department, so check
   with a script, not by eye.
6. **Department-specific.** ≥12 of each slot's 14 words must be meaningful only
   for that department's job. `verify:content` enforces a differentiation floor.
7. **Register: B1.1 hospitality ESP.** This is the top of the ladder — abstract
   and commercial language is now appropriate (`cancellation clause`,
   `goodwill gesture`, `contingency plan`), but it must still be language a
   hotel employee would actually use on shift. No general-business filler.
8. **`emergencies` must stay operational, not medical-advisory.** Name the
   incident (`power failure`, `guest fainting`, `kitchen fire alarm`); never
   author instructions that read as clinical advice.

## Item shape

```ts
{ word: "Goodwill gesture", phonetic: "/ˌɡʊdˈwɪl ˈdʒestʃə/", definition: "Cử chỉ thiện chí bù đắp", icon: "🤝" }
```

- `word` — Sentence case, first letter capital only.
- `phonetic` — IPA, British-leaning, matching the existing banks' style.
- `definition` — Vietnamese, concise, no English in it (loanwords already used
  in earlier banks — spa, VIP, minibar, buffet — are fine).
- `icon` — ONE emoji, single code point. No ZWJ sequences (👨‍👩‍👧 is rejected by
  the QA gate for exceeding the icon length limit); use 👪 instead.
