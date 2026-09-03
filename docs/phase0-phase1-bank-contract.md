# Phase 0 / Phase 1 bank contract (weeks 1–14, pre-A1 → A1)

Weeks 1–14 contain **no hand-authored content**. Every line all six departments
see is a frame in `src/lib/content/phase0.ts` or `phase1.ts` with a word
dropped into it. That is the phase's great strength — one pedagogical fix
lands in six departments at once — and its one failure mode: a word that does
not fit its frame ships six broken sentences, not one.

This is the counterpart to `phase4-bank-contract.md`. It has the same two
columns, plus a third that Phase 4 does not need. At B1.1 a slightly odd noun
still parses; at pre-A1 the frames are four words long and every word is
load-bearing, so **countability and polarity** decide whether the output is
English at all.

Read this before changing any word in `LEXICONS` (P0) or `P1_BANKS` (P1).

## What has actually gone wrong here

Every rule below was written after a defect, not before one.

| What shipped                                                   | Why the check that existed did not catch it                     |
| -------------------------------------------------------------- | --------------------------------------------------------------- |
| "I need some taxi." · "I need some toothbrush." (5 of 6 depts) | part of speech was right — noun. Countability was not.          |
| "This one is better. It is more expensive." (BO)               | part of speech and countability both right. Polarity was not.   |
| "He check ins every day." (all 6)                              | the frame concatenated instead of inflecting the head verb.     |
| "This one is more empty." (FO) · "more bright." (HK)           | the frame hardcoded "more" instead of reading `cmp`.            |
| "Can I have the fork?" for a first mention (all 6)             | Vietnamese has no articles, so the frame drilled the wrong one. |
| Female personas narrated as "He" in 25 passages                | the frame hardcoded a pronoun instead of reading `lx.pron`.     |

The pattern: **the frame and the bank each looked correct on their own.** Only
rendering all six departments showed the mismatch. Do that before you commit.

## Phase 0 — `LEXICONS` (weeks 1–6)

One lexicon per department. These are not free-text fields; each is consumed
by frames that assume a specific shape.

| Field            | Shape required                                                                       | Consumed by                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `staff`          | one given name, no title                                                             | narrates every reading passage: `${lx.staff} says: "…"`                                                              |
| `pron`           | must match `staff`'s gender                                                          | any frame referring back to `staff`. Never hardcode a pronoun.                                                       |
| `station`        | lowercase noun phrase **with its article**: "the front desk"                         | `A guest arrives at ${lx.station}.` — the frame supplies no article.                                                 |
| `items[6]`       | **countable, singular, capitalised**; a physical object staff hand over              | `Two ${i1}s`, `the wrong ${i1}`, `Here is my ${i1}.` The plural is formed by appending `s`, so no irregular plurals. |
| `service`        | `en` names the department's own service; `open` ≠ `close`, both spelled out as words | week 3's opening-hours frames. Identical open/close gives a reading question two identical options and no answer.    |
| `priced.vndWord` | the amount **in words, ≤ 3 words** ("five hundred thousand")                         | week 4. The pre-A1 cap is 5 words per sentence and the amount is most of one.                                        |
| `roomNo.spoken`  | digit-by-digit with hyphens, 0 as "oh": "two-oh-five"                                | week 2 teaches room numbers as digits, not as a whole number.                                                        |
| `floor.ordinal`  | bare ordinal, no "the": "second"                                                     | `The ${lx.floor.ordinal} floor, madam.`                                                                              |

**`items` is the strictest.** Frames put it after "the wrong", after "my",
and in a bare plural. A mass noun there ("Luggage" is a real one, and FO
declares it) breaks `Two ${i1}s`. If you add a mass noun, check every `items`
frame first.

## Phase 1 — `P1_BANKS` (weeks 7–14)

Eight slots × 8 words per department, one slot per week.

| Slot       | Week | Part of speech                       | Countability / form                          | Representative frames                                                          |
| ---------- | ---- | ------------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------ |
| `roles`    | 7    | **noun phrase, a job title**         | singular, takes "our"                        | `This is our {w}, sir.` · `Our {w} is on duty, madam.` · `I will ask our {w}.` |
| `places`   | 8    | **noun, a place in the hotel**       | singular, takes "the" and "a"                | `The {w} is on the left.` · `Is there a {w} here?` · `It is next to the {w}.`  |
| `requests` | 9    | **noun, something a guest asks for** | countable unless it declares `art: "some"`   | `Can I have {a/an w}?` · `I need some {plural}.` · `Would you like the {w}?`   |
| `states`   | 10   | **adjective**                        | gradable; declares `cmp` if it takes "-er"   | `It is very {w}, madam.` · `This is too {w}.` · `That one is {cmp}.`           |
| `routines` | 11   | **bare verb phrase**                 | head verb first, so `third()` can inflect it | `I {w} every day.` · `We {w} at {hour}.` · `Please {w} before you go.`         |
| `phone`    | 12   | **mixed — see per-index table**      | —                                            | see below                                                                      |
| `problems` | 13   | **adjective or past participle**     | describes a fault, never a thing             | `The {item} is {w}.` · `It is {w}, sir.`                                       |
| `closing`  | 14   | **mixed — see per-index table**      | —                                            | see below                                                                      |

### The two slots that are not uniform

`phone` and `closing` change part of speech **by index**. This is the single
easiest way to break weeks 12 and 14, because the slot name suggests one
category and the frames want six.

| Index | `phone` (week 12)                         | `closing` (week 14)                            |
| ----- | ----------------------------------------- | ---------------------------------------------- |
| 1     | noun — the desk you answer as             | noun — a thing handed over                     |
| 2     | noun — what you take from the caller      | noun — a thing left behind                     |
| 3     | **adverbial of time** — "in five minutes" | **adjective** — "spotless", "correct"          |
| 4     | **bare verb** — "transfer the call"       | noun — a period wished well: `Have a good {w}` |
| 5     | noun — what is ready                      | noun — a thing offered                         |
| 6     | **bare verb** — "note down"               | noun — a thing that is ready                   |
| 7     | **bare verb** — "call you back"           | noun — a thing to check                        |
| 8     | **bare verb, imperative** — "call us"     | _(unused — the slot holds 7)_                  |

### Polarity: the column Phase 4 does not need

`states` words are dropped into frames that only assert a fact — "It is very
{w}", "This is too {w}", "That one is {cmp}". **No frame may claim that more
of a `states` word is better**, because the slot mixes "clean" and "sour",
"bright" and "expensive". Week 10's reading used to say "This one is better,
madam. It is {cmp}." and so recommended the sourer dish in F&B and the dearer
option in Back Office. If you write a new comparative frame, put the
comparison in the guest's mouth or leave the judgement out.

`problems` has the opposite constraint and gets it for free: every word in it
is negative by definition, and the frames all apologise.

## Hard rules

1. **Render all six before committing.** `getWeekContent(dep, week)` for
   FO/FB/HK/SW/GR/BO. Five correct departments is the normal shape of a bug
   here, not evidence of a fix.
2. **Never put a bank word behind a bare "the" on first mention.** Use `wa()`.
   Vietnamese has no articles, so whichever article a frame drills is the one
   the learner keeps for the next 26 weeks.
3. **Never concatenate an inflection.** `third()` for third-person verbs (it
   inflects the head: "checks in"), `plural()` for quantified nouns (it
   inflects the tail: "sun beds"), `cmpOf()` for comparatives.
4. **Sentence caps are hard.** P0 target responses ≤ 5 words, P1 ≤ 8, one
   clause. A three-word bank entry leaves the frame almost nothing.
5. **≥ 2 words of ≥ 4 letters in every `targetResponse`**, or `ListeningSuite`
   silently drops that item's cloze task and the learner never sees it.
6. **≤ 1 headword shared with any other department in the same week**, and no
   department may meet the same headword twice with two meanings — this is why
   Guest Relations says "Lounge card" and not "Card".
7. **A frame may not hardcode another department's work.** "I will clean
   tomorrow" was taught to Front Office. Read `lx.items` / `lx.service` /
   `lx.station` instead. Shared courtesy language ("One moment, please, sir.")
   is different and should stay identical everywhere.

## Where the machine checks

`bun run verify:content` covers sentence caps, vocabulary counts, review
schedules, answer-position spread and the longest-answer share for both
reading and games. `bun run lint:content` layers A–L cover semantic class,
helpTip quoting, reading sentence length and answer skew. Neither one checks
countability or polarity — those are this document's job.
