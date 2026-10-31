---
name: review-picker
description: Use when making any page or message where a person picks between options (designs, ideas, films, plans, settings). Every item gets numbered options, a recommendation, "Neither", a quality tier on every option and a free-text box, and answers save as they are made.
---

# Review picker

Version 1.3 (2026-10-31). Changes: CHANGELOG.md in pregamer189/creative-methods.

A picker exists to get a clear answer fast. The owner rejected pickers that gave
no way to say "neither", no room for a short comment, and options that made no
sense on their own (2026-10-31). These rules are hard: a picker that breaks one
is not shown.

## Before making it

1. **Read the feedback first.** Find the person's past marks and comments on this
   area. Write one line at the top: "Changed since your last marks: ...". An option
   they rejected doesn't come back unless it was fixed, and the fix is named.
2. **Plan each item until it is clear.** If an option can't be explained in one
   plain sentence, without codes or internal names, it isn't ready. Plan more,
   don't show it.
3. **Name the tiers (a hard rule, the owner, 2026-10-31).** Quality is raised in
   tiers across the whole product. Write the tier ladder for this area once at the
   top of the page (for example "Tier 1 · works; Tier 2 · polished; Tier 3 · close
   to real"), then label **every option** with its tier and one line on what the
   next tier would add. The floor: close to real, never kid-like, cartoonish or
   toy-like.

## Each item

- One question, verb first, in the person's own words.
- Up to three **numbered** options (1, 2, 3; no letters). Each has one sentence on
  what the person gets, and a real example (a screenshot, a clip, a quoted line).
- One option is **recommended**, with a one-line reason.
- **"Neither"** always sits beside the options.
- Every option shows its **tier label** ("Tier 2 · polished; Tier 3 adds real
  texture and light").
- **A free-text box on every item** (a hard rule, the owner, 2026-10-31): always
  visible, never behind a toggle, saved with the answer. Text alone, with no option
  picked, counts as an answer.
- Same crop, scale and state when options are images, so the difference shows.

## The page

- About seven items at most; the rest wait for the next page.
- **Answered questions go away.** When the person comes back, show only what is still
  unanswered, with one key to bring the answered ones back. Never ask again what they
  already answered.
- **Answers save as you go, with no pasting** (the method that worked, 2026-10-31).
  The page declares its host's shared store (on a Claude Artifact, the `db`
  capability). Each answer is its own document, written about 0.5 s after the last
  change: `db.doc("marks/<item id>").set({ pick, note })`. On load the page reads
  `db.collection("marks").get()`, repaints the answers and hides the answered
  items. A status line says "Answers save as you go"; if the store is missing it
  says "Use Copy to send these".
- **The person only says "done" in chat.** The agent then reads the marks itself
  (on an Artifact: ArtifactData list, collection "marks") and never asks for a paste.
- A **"Copy my marks"** key stays as the backup: every answer as plain text, one
  line per item, for example:
  ```
  1: 2
  2: Neither - looks like a kids app
  3: 1 - but warmer
  ```
  Browser storage (localStorage) is only a convenience, never where answers live.
- **Never put words in the person's mouth.** Any "you said" line quotes their exact
  words and links the message they came from. No quote and link, no "you said".
- Show it at the quality you mean. A rough mock-up is not an option.

## Good and bad

- Good: "Where should the progress badge sit on the home screen? 1 · top left,
  small (recommended: keeps the main key the biggest thing). 2 · centre, large.
  Neither. Comment: ____"
- Bad: "6. Layer model B/C hybrid?" No sentence, a code, no example, no "Neither".
- Bad: a page whose marks live only in that browser.
- Bad: "Mostly short sounds instead of speech (your idea)" with no quote or link,
  when the person never said it.

## Done when

The feedback line is at the top, every item has numbered options, a
recommendation, "Neither", a tier label on every option and a free-text box, answers save to the shared store as
they are made (with Copy as the backup), every "you said" is quoted and linked,
and every option is shown at the real quality.
