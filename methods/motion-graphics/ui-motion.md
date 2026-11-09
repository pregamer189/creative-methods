# Interface motion, press feedback and sound

How an app should move and sound so it feels tactile and premium, not generated.
Values are starting points; a product sets its own in tokens and keeps the names.
Paste-ready version: `skills/motion-and-feedback/SKILL.md`.

## Principles

1. **Motion answers an action** (press, open, confirm, reveal). Ambient motion is
   rare and must earn its place.
2. **One moment per screen.** Name it in the plan before building (the reveal,
   the result, the progress object). Everything else is quiet.
3. **The press is where quality shows.** Quiet at rest, instant on touch.
4. **Sound off loses nothing but sound; reduced motion loses nothing but
   movement.**

## Press feedback (every tappable thing)

| What | Value |
|---|---|
| When | Visual press **and** sound on pointer-down, never on release |
| Press-in | 40-60 ms |
| Release | 160-220 ms with a small spring |
| Travel | 1 px down, or scale 0.97. Nothing else moves; never bounce the layout |
| Haptic (phones) | With every press: light for taps, rigid for keys, success or warning for results |
| Target | At least 44 x 44 pt; visible keyboard focus |

## Timing and curves

| Token (suggested name) | Value | Use |
|---|---|---|
| `--dur-press` | 60 ms | Press-in |
| `--dur-quick` | 120 ms | Small state changes |
| `--dur-base` | 240 ms | Release, open, close |
| `--dur-win` | 420 ms | The one moment per screen |
| `--ease-out` | e.g. `cubic-bezier(.2,.8,.2,1)` | Entrances |
| `--ease-in-out` | e.g. `cubic-bezier(.6,0,.3,1)` | Moves across the screen |
| `--spring` | small overshoot | Key releases, pops, a celebrating object |

- Nothing over 500 ms blocks the next tap. A celebration after a finished task
  may run longer (up to about 2 s) because the user waits for nothing else.
- Never ease-in on a response to a tap. **Linear only** where motion tracks time or
  scroll (a timer fill, a hold-to-confirm ring, a loop). Two measured exceptions
  (`measured-teardown.md`): exits leaving the screen may accelerate, and a progress
  bar jumping to a newly reached value fills ease-in, stops dead, and the reward
  fires on arrival.
- No elastic overshoot on sheets and dialogs; springs are for keys and characters.

## Motion budget

Set one per screen: how many things may move at once and how far. Page
transitions that show where you went help orientation; too much movement causes
motion sickness (Chris Raroque, app feel, 2026). Active tabs change fill (filled vs
outline), not just colour. When asking a model to build a complex animation, split
it into sub-steps in the prompt (enter, settle, react) instead of one request.

## Craft checks

- Animate `transform` and `opacity` only. No `transition: all`.
- Restart a CSS animation by removing its class and adding it back a frame later.
- `prefers-reduced-motion`: keep the state change and the sound, drop the movement.
- Check motion frame by frame (capture frames at 0, 16, 50, 100 ms...), not only
  the end state. The first 100 ms decide whether a press feels instant.

## Sound

- Short (most under 120 ms, results under 600 ms) and quiet, mixed so a room of
  taps never tires. The tap is the most-heard sound: it gets the most care.
- Every result sound is optimistic. "Wrong" is a soft, low nudge, never a buzzer.
- Prototype sounds can be synthesised (tone, click, whoosh, chime); a shipped app
  uses designed audio files.
- Voices: never device text-to-speech or a robot voice; designed voices only.
- Always offer a sound switch.

## AI tells in motion

Fade-and-slide-up on every section, hover lifts on every card, a spinner where a
skeleton or instant state would do, and 600 ms blur-ins. See
`../design/ai-tells.md`.

Sources: Elias (2026-10-19 tactile keys, 2026-10-20 voices); Emil Kowalski's
animation guidance (emilkowal.ski) for durations and curves; Apple HIG (haptics).
