# Showing a change for review

Elias, I42 (2026-10-27): "the idea is the format of change, not the changes
themselves." Use this whenever a design or screen change goes to a person.

## The format

Stacked rows, each a real screenshot crop of the **same area at the same crop and
scale**, so the difference jumps out:

| Row | Label (bold, left) | Text (2-3 plain lines) |
|---|---|---|
| 1 | Before | What it was |
| 2 | A · built | What changed and why |
| 3 | B · alternative | The other way, and its trade-off (e.g. "leaves nothing to drag the window by") |

## Rules

- Real screenshots, never mock-ups of the change.
- Same crop, same scale, same state in every row.
- Two or three options at most; labelled (A, B, C) so a note can say "B, but darker".
- Plain words; no codes the reader has to look up.
- One question at the end, with a recommendation (a single change; a page of several picks follows the picker rules below).
- The smallest version that answers the question; stop there.

## Picker pages (hard rules, Elias, 2026-10-31)

A picker is any page where a person marks options (designs, ideas, films, plans).
He said: "I hate that I have no options to pick neither or make a short comment."

- **Read the feedback first.** Before making a picker, read the person's past marks
  and comments on the same area, and say in one line what changed because of them.
  An option they already rejected doesn't come back unless it was fixed.
- **Every item has "Neither"** next to its options, and **a comment button** (Elias,
  2026-10-31: "add text input ... thats a RULE"). Since 2026-11-03 the comment button
  opens the page host's own comment box, and **every pick button posts a real
  comment** (`Pick: B`); no text fields on the page where the host has comments. A
  comment alone, or "Neither" with no comment, is a valid answer.
- **Plain and literal** (Elias, 2026-11-01: the page read "like a riddle ... no
  content whatsoever that I can rate"). Every item is a real thing to see or hear in
  its real flow, with one sentence: "This is X. You are rating Y." One mark per thing.
- **The bias line** near the picks: "Rendering quality can bias your pick: judge the
  idea, not the polish."
- **Phone size first**, and every variation screenshot-checked at phone width before
  it is shown.
- **Each round is archived and cleared:** every mark and comment goes into the
  product's preferences log, every comment gets a change or an answer, then the
  page's marks are cleared.
- **Every option shows its quality tier** (same message: "that tier thing thats a
  RULE"): the page names the tier ladder once, each option carries its tier and
  what the next tier would add.
- **Every option makes sense on its own.** One plain sentence on what the person
  would get. If an item can't be explained in one line without codes, it isn't
  ready to show; plan it further.
- **Labelled options (A, B, C)**, at most three per item, one marked as the recommendation
  with a one-line reason.
- **Answers save as you go.** Each answer is written to the page host's shared
  store as its own document (`marks/<item id>`, about 0.5 s after the last change);
  on return the page repaints answers and hides answered items. The person only
  says "done" in chat and the agent reads the marks itself. "Copy my marks" (plain
  lines like `3: Neither - too cartoonish`) stays as the backup; browser storage
  is only a convenience. First used on two picker pages, 2026-10-31.
- **Never put words in the person's mouth.** A "you said" line quotes their words
  and links the message. (A picker once claimed Elias wanted "short sounds"; he
  never said it.)
- **Quality shown is the quality meant.** No rough mock-ups standing in for the
  final look; options are close to real, never kid-like or cartoonish.
- **A/B shape, like / dislike per part, a comment button per part, very little
  text, a light and clear page** (Elias, 2026-10-31: "basically the A/B test ...
  a comment button, because then I can transcribe the issue. And make a lot less
  random text, because I won't read it ... everything is kind of dark").
  The comment button opens a box with the cursor in it, ready for dictation.
- Few items per page (about seven at most). Leftover questions wait for the next page.
