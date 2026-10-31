# Motion in films (coded motion graphics)

For films built in code (HTML, CSS, GSAP, three.js, rendered frame by frame) and
for motion inserts in shot films. Build pipeline: `../video/coded-films-workflow.md`.

## Rules

| # | Rule | Why |
|---|---|---|
| 1 | Every frame is a pure function of time; seeded noise only | Renders are repeatable, a note on frame 212 stays true |
| 2 | Pause anywhere: something meaningful is mid-flight, or a held frame you chose. No idle wobble, breathe or float | Filler motion reads as cheap; chosen stillness is what gives action its force (rule 12) |
| 3 | A 0.3-0.75 s stillness before each result lands | The eye needs a beat to see the result |
| 4 | Two or three transition types, repeated; never a crossfade | A small, consistent grammar reads as designed |
| 5 | Plan every seam: axis, direction and carrier (the element that carries the eye across the cut) | Hidden cuts land on motion (edit blindness) |
| 6 | At a seam: zero overlap, the outgoing element still moving, the incoming one entering mid-flight, same direction | No pop across the cut |
| 7 | One image = one shot = one move; no punch-in zoom on the same frame | `../video/editing-rules.md` |
| 8 | Every event that matters has a sound, or a chosen silence | Sound sells the motion (I17); `../video/sound.md` |
| 9 | Motion hits land on the music's bar grid, measured from the real first downbeat | Beat detection alone misses it |
| 10 | Text holds at least 1.8 s (letters / 15 + 1.5 s) | Readable at feed speed |
| 11 | No gradient or glow filler. Colours are flat; texture comes from material and grain layers | `../design/no-gradients.md`, `../design/texture-and-finish.md` |
| 12 | **Stillness against action.** Hold strong compositions, then let intense moments break out; keep flashy moments few | Axel Digoix chases "tension between stillness and action"; Potto Collective's limited moments give the big ones room |
| 13 | **Not everything moves.** Whatever moves becomes the most important thing on screen, so rank the elements first and animate from the top | Nowack, 800k views |
| 14 | **One frame right before many.** Rhythm, contrast and hierarchy come first; a good frame earns forgiveness for the motion | Nowack; top comment there |
| 15 | **Lead the eye.** Motion points to where the next thing arrives, so the viewer takes one piece at a time | Nowack |
| 16 | **Anticipation.** A small move the opposite way before the main one, often up to 3x its length; it can be on another property (rotation before position). Keep slow ramps very slightly moving | Ben Marriott, "#1 skill" |
| 17 | **One container never cuts** (product shots). Each state is the same element changing size, radius and fill, while content swaps behind a short blur | Margerie, on product UI films |
| 18 | **Text: reveal it.** Lines rise from behind a mask; words stagger in. Quick and quiet, nothing flashy | Apple-style guide; a comment notes no motion blur |
| 19 | **Banned as defaults:** generic particle bursts, excessive glow, random lens flares, constant camera shake, meaningless 3D rotation, elastic bounce, a fake interface | Motion Studio rules, via aiidelist.com |

## The levers that win quality (I17, Elias 2026-10-26)

Models hit a ceiling; these don't. Spend the effort here:

1. Music choice and the cut map on its bars.
2. Sound effects on every event.
3. How each element enters, moves and leaves (curves from `ui-motion.md`; springs
   for objects with weight).
4. Transitions that carry the eye (rule 5).
5. Inserts between elements: what each element does decides its insert (a card
   flips, a word types, a number counts).

## What the best motion of 2026 does

From Ben Marriott's yearly showcase (no AI in it). Take the reasons:

- **Interaction between worlds:** 2D that touches and changes a 3D surface (ManvsMachine).
- **Transitions as the invention:** frame-by-frame transitions that keep pulling you in
  (Space Dawg); miniature sets rotating as the scene change (Telstra).
- **Hide the product to raise interest:** torn edges and extreme close-ups make it feel
  like leaked footage (JOYCGI).
- **Premium and playful at once:** every shot has one satisfying move or sleight of
  hand, precise but never sterile (Andreas Wannerstedt, *Soft Logic*).
- **One person can do it** with immense scale, if the world and the composition come
  first (Paul Chadeisson, Sélim Lallaoui).
- **Small jobs stand out by quiet confidence:** the handmade Telstra spots against
  everything else in prime time.

Finish and texture: `../design/texture-and-finish.md`.

## Checks

Contact sheet at each cut -0.1 s and +0.2 s and at shot midpoints; real playback
for motion and sync (stills catch layout, only playback catches motion). Full gate:
`../video/film-quality-gate.md`.

Sources: Prello's motion doctrine and film craft notes (2026-10); Lemo-Opuscar
`DIRECTOR.md` and `TECHNIQUE.md`; opus-video-skills `kinetic-reel`.
