---
name: review-picker
description: Use when making any page or message where a person picks between options (designs, ideas, films, plans, settings). Each item is an A/B comparison with like or dislike per part, "Neither", a tier on every option and a comment button, in very little text on a light, clear page; answers save as they are made.
---

# Review picker

Version 1.4 (2026-10-31). Changes: CHANGELOG.md in pregamer189/creative-methods.

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

The shape is an **A/B test** (the owner, 2026-10-31): A (what's built, or the
recommendation) beside B (the alternative), at most a third, C. Same crop, scale
and state for each, so the difference shows.

- One short question, verb first, in the person's own words.
- Each option: a real example (a screenshot, a clip, a quoted line) and **one short
  line**, under about ten words, on what the person gets.
- **Like / dislike on each part.** Each option, and each named part of it (for a
  screen: the header, the key, the colour), gets a quick 👍 / 👎, so the person
  can mark what they liked and what they didn't without writing.
- One option is **recommended**, with a reason of a few words.
- **"Neither"** always sits beside the options.
- Every option shows its **tier label** ("Tier 2 · polished").
- **A comment button on every part** (hard rule, the owner, 2026-10-31: "add text
  input ... thats a RULE"; "a comment button, because then I can transcribe the
  issue"). It opens a large text box with the cursor already in it, ready for
  phone dictation; once there is text it stays visible and is saved with the
  answer. A comment alone, with nothing picked, counts as an answer.## The page

- **Very little text** (the owner: "I won't read it, because it's just too much").
  No intro paragraphs; the feedback line and the tier ladder are one line each;
  everything else is pictures, labels, buttons and boxes.
- **Light and clear:** a light background, strong contrast, large type and large
  tap targets, so nothing reads as dark or murky. Images shown big.
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
  1: B (header 👍, key 👎)
  2: Neither - looks like a kids app
  3: A - but warmer
  ```
  Browser storage (localStorage) is only a convenience, never where answers live.
- **Never put words in the person's mouth.** Any "you said" line quotes their exact
  words and links the message they came from. No quote and link, no "you said".
- Show it at the quality you mean. A rough mock-up is not an option.

## Good and bad

- Good: "Badge on the home screen?" A · top left, small (recommended: main key
  stays biggest) 👍👎 · B · centre, large 👍👎 · Neither · 💬 Comment
- Bad: "6. Layer model B/C hybrid?" No sentence, a code, no example, no "Neither".
- Bad: a page whose marks live only in that browser.
- Bad: "Mostly short sounds instead of speech (your idea)" with no quote or link,
  when the person never said it.

## Done when

The feedback line is at the top, every item is an A/B with options, a
recommendation, like / dislike per part, "Neither", a tier label on every option
and a comment button, the page is light with almost no text, answers save to the shared store as
they are made (with Copy as the backup), every "you said" is quoted and linked,
and every option is shown at the real quality.
