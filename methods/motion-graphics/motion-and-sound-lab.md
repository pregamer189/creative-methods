# Motion and sound lab

How we work out the small interactions, the moves between places and every sound,
before any of it goes into a product. Values a product owns (its sound set, its
tokens) stay in that product; this is the method. Timing and press recipes:
`ui-motion.md` and `skills/motion-and-feedback`.

## The lab page

- **One page with many working variations**, each playing inside its real moment
  at phone size (a sound card shows the moment it plays in; a card that only says
  "sound 3" explains nothing).
- **One mark per thing.** Each sound, move or take gets its own Like / Don't like /
  Neither, posted as a real comment, so a single bad one can be singled out.
- Groups we cover: presses and keys, answers (right, almost, not yet), arrivals of a
  thing, moves between places (fall, fly-through, fold, slide, door), completions,
  and button layouts judged side by side.

## Motion rules we keep

- One physics for the whole product, written down once (ours: slide and settle,
  damped, leave the way you came; only keys may overshoot).
- Respond on touch-down, track the finger 1:1, let a flick decide by speed;
  everything can be grabbed mid-move (springs for anything you touch).
- Tabs used many times a day swap with a short fade; only the indicator moves.
- One big moment per screen; only the end-of-day moment may run long, and it never
  blocks a tap.
- Reduced motion keeps the change and the sound and drops the travel.

## Sound rules we keep

1. **Real sounds, not synthesis.** Synthesised UI sets kept reading as "odd" and
   "cheap". Use recorded foley (CC0 libraries) or a sound model prompted for real
   objects. A character's reaction is a person's voice sound (a pleased "mm", a soft
   "oh"), never a chime.
2. **One family per kind of action** (press, place, reveal, finish), so the ear learns
   the product.
3. **Loudness by class**, all well under the voice (about -18 LUFS): touch about -30,
   objects and answers about -27, transitions about -26, completions about -23.
   Clean every take the same way: trim leading silence to a few ms, short fade-in,
   fade-out over the last 15%, mono.
4. **No background sound under focused work.** Elias, 2026-11-08: "I don't really
   like a lot of background noise ... it's harder to focus." A place may greet you on
   arrival (a quiet bed around -50 dBFS, gone in about 5 s, each moving part once),
   then silence. A setting can turn arrival sounds off.
5. **Time a sound to its meaning.** The sound of a thing arriving plays when the line
   that hands it over is said, not before. Never start a sound under a spoken word.
6. **Right is subtle.** The right-answer sound is small and pleasant; wrong is quiet
   (see `measured-teardown.md`).
7. **Generate lean.** Know what each sound is for before generating; measure the real
   cost per second (tool estimates were about 3x too high for us); drop takes that
   come back near silent (peak under about 0.03); keep each take's prompt and settings
   in a `takes.json` beside it.
8. **Rework only what fails.** Drop disliked takes; re-prompt a sound only when none
   of its takes was liked.

## Folder shape per sound round

`raw/` (as generated) · `clean/` (after the cleaning script) · `clean.py` ·
`takes.json` (prompt, settings, cost, marks).
