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
- Two or three options at most; numbered so a note can say "2, but darker".
- Plain words; no codes the reader has to look up.
- One question at the end, with a recommendation (a single change; a page of several picks follows the picker rules below).
- The smallest version that answers the question; stop there.

## Picker pages (hard rules, Elias, 2026-10-31)

A picker is any page where a person marks options (designs, ideas, films, plans).
He said: "I hate that I have no options to pick neither or make a short comment."

- **Read the feedback first.** Before making a picker, read the person's past marks
  and comments on the same area, and say in one line what changed because of them.
  An option they already rejected doesn't come back unless it was fixed.
- **Every item has "Neither"** next to its options, and **a short comment box**
  (one line, optional). A mark of "Neither" with no comment is still a valid answer.
- **Every option makes sense on its own.** One plain sentence on what the person
  would get. If an item can't be explained in one line without codes, it isn't
  ready to show; plan it further.
- **Numbered options**, at most three per item, one marked as the recommendation
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
- Few items per page (about seven at most). Leftover questions wait for the next page.
