# Learning from great references

How to learn why a great film, screen or motion piece works, without copying it.

## The two rules (Elias)

- **Learn why it's good, don't blindly recreate it** (I13, I33, 2026-10-26). A copy
  can't surpass its original.
- **Do what you see, not what you think would fit** (I59, 2026-10-28). If the
  great references don't do something, don't add it.

These pull against each other on purpose: copy the *reasons* (pacing, reveals,
sound, restraint), never the content or look.

## Steps

1. **Find outliers, not favourites.** Pieces performing far above their channel's
   usual (views several times the channel median), recent, in the areas you work
   on. Record the link; download only if the owner asks.
2. **Measure, then infer.** Cut times, shot lengths, text hold times and music
   beats come from the file (scene detection, e.g. `ffmpeg -vf
   "select='gt(scene,0.3)',showinfo"`), not from watching. Label every note
   **measured** or **inferred**.
3. **Read what viewers said.** The top comments say what people loved and why.
   That's the evidence for "why it works".
4. **Write the grammar, not the content:** composition, pacing, transitions, how
   text and sound land, what's left out. One table per reference.
5. **Compare 2-3 references.** Keep what they share; that's the pattern. One
   reference alone is a style, not a rule.
6. **Turn it into checks.** A pattern earns a place in a method only as a
   checkable line (e.g. "result lands after 0.5 s of stillness").

Tools: `tools/video-refs/` fetches captions and comments, searches by real views, and
measures any film file. Captions miss everything visual: a gap in the timestamps may be
the best part of the film. Keep what you read honest: a sponsor's product in a tutorial
is not evidence, and comment sections hold spam.

Why a person's taste decides what gets studied: `taste.md`.

## Breakdown table (copy per reference)

| Field | Value | Measured or inferred |
|---|---|---|
| Link, date, views vs channel median | | measured |
| Length, number of cuts, average shot length | | measured |
| First 2 s: what happens | | measured |
| Music: tempo, where the drop lands | | measured |
| Transition types used | | measured |
| What viewers say they loved (top comments, quoted) | | measured |
| Why it works | | inferred |
| What we'd take (a reason, never a shot) | | inferred |

## Never

- Recreate a shot or look one to one.
- Generate people or copy a creator's face, voice or brand.
- Claim a reason without either a measurement or viewer quotes behind it.
