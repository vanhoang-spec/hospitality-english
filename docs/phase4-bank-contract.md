# Phase 4 bank contract (weeks 31–40, B1.1)

Each department bank has 9 slots × 14 words. The spine builds sentences by
dropping bank words into fixed frames, so **each slot has a required part of
speech**. A word that does not fit its frame produces ungrammatical output —
this is the single most common defect in this codebase's content history.

Part of speech is necessary but **not sufficient**. Every defect the 2026-08
academic review found in this phase passed the part-of-speech check: the
frames were satisfied and the sentences still meant nothing. So each slot
also declares the **semantic class** its frames assume; both columns have to
hold when you author a replacement word.

| Slot          | Week | Part of speech required                   | Frames it must fit                                                                                         |
| ------------- | ---- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `story`       | 31   | **noun phrase**                           | `The {w} is what makes this place special.` · `Let me tell you about the {w}.`                             |
| `preferences` | 32   | **noun phrase** naming a taste/need       | `Based on your {w}, may I suggest something that suits you better?` · `May I note your {w} in the system?` |
| `disputes`    | 33   | **noun phrase** naming a claim/loss       | `I am very sorry about the {w}.` · `Our policy allows compensation for the {w}.`                           |
| `occasions`   | 34   | **noun phrase** naming an event element   | `We have prepared the {w} for you.` · `The {w} will be ready before you return.`                           |
| `tradeoffs`   | 35   | **bare verb phrase** (after "we"/"I can") | `What if we {w} instead?` · `I can {w} in exchange for a longer stay.`                                     |
| `emergencies` | 36   | **noun phrase** naming an incident        | `There is a {w} at the property.` · `Please stay calm — we are handling the {w}.`                          |
| `terms`       | 37   | **noun phrase** naming a contract term    | `The {w} is valid for twelve months.` · `Could we review the {w} together?`                                |
| `proposal`    | 38   | **noun phrase** naming a proposal element | `The {w} is included in this offer.` · `I have attached the {w} for your review.`                          |
| `wrapUp`      | 40   | **noun phrase**, mixed review             | `Let me confirm the {w} with you.` · `The {w} is routine for me now.`                                      |

### Semantic class per slot

| Slot          | Must denote                                    | Fails as                                                                                                                                                              |
| ------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `story`       | something about the property worth telling     | an internal KPI — "The market position is what makes this place special."                                                                                             |
| `preferences` | **a guest taste the staff can act on**         | a back-office setting — "Based on your preferred billing cycle…"                                                                                                      |
| `disputes`    | a loss or claim the guest raises               | a routine charge                                                                                                                                                      |
| `occasions`   | an element of a celebration                    | a commercial event with no guest present                                                                                                                              |
| `tradeoffs`   | a concession the speaker may grant             | an action needing approval the speaker does not have                                                                                                                  |
| `emergencies` | **an on-site incident a guest can witness**    | a back-office problem — "There is a cash shortage at the property."; an off-site event — "The flight cancellation has been fully resolved."; a medical event (rule 8) |
| `terms`       | a clause of an agreement                       | a party to the agreement                                                                                                                                              |
| `proposal`    | a component of a written offer                 | a decision                                                                                                                                                            |
| `wrapUp`      | **a detail the job requires you to get right** | a situation, a career step — "I am ready for the stay summary."                                                                                                       |

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
