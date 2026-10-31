# Motion in films (coded motion graphics)

For films built in code (HTML, CSS, GSAP, three.js, rendered frame by frame) and
for motion inserts in shot films. Build pipeline: `../video/coded-films-workflow.md`.

## Rules

| # | Rule | Why |
|---|---|---|
| 1 | Every frame is a pure function of time; seeded noise only | Renders are repeatable, a note on frame 212 stays true |
| 2 | Pause anywhere: something meaningful is mid-flight. No idle wobble, breathe or float | Filler motion reads as cheap |
| 3 | A 0.3-0.75 s stillness before each result lands | The eye needs a beat to see the result |
| 4 | Two or three transition types, repeated; never a crossfade | A small, consistent grammar reads as designed |
| 5 | Plan every seam: axis, direction and carrier (the element that carries the eye across the cut) | Hidden cuts land on motion (edit blindness) |
| 6 | At a seam: zero overlap, the outgoing element still moving, the incoming one entering mid-flight, same direction | No pop across the cut |
| 7 | One image = one shot = one move; no punch-in zoom on the same frame | `../video/editing-rules.md` |
| 8 | Every visual event has a sound | Sound sells the motion (I17) |
| 9 | Motion hits land on the music's bar grid, measured from the real first downbeat | Beat detection alone misses it |
| 10 | Text holds at least 1.8 s (letters / 15 + 1.5 s) | Readable at feed speed |
| 11 | No gradient or glow filler, flat fills only | `../design/no-gradients.md` |

## The levers that win quality (I17, Elias 2026-10-26)

Models hit a ceiling; these don't. Spend the effort here:

1. Music choice and the cut map on its bars.
2. Sound effects on every event.
3. How each element enters, moves and leaves (curves from `ui-motion.md`; springs
   for objects with weight).
4. Transitions that carry the eye (rule 5).
5. Inserts between elements: what each element does decides its insert (a card
   flips, a word types, a number counts).

## Checks

Contact sheet at each cut -0.1 s and +0.2 s and at shot midpoints; real playback
for motion and sync (stills catch layout, only playback catches motion). Full gate:
`../video/film-quality-gate.md`.

Sources: Prello's motion doctrine and film craft notes (2026-10); Lemo-Opuscar
`DIRECTOR.md` and `TECHNIQUE.md`; opus-video-skills `kinetic-reel`.
