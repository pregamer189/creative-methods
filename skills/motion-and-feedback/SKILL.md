---
name: motion-and-feedback
description: Use when adding animation, press feedback, haptics, sound effects or celebration moments to an app or web interface. Gives timing, curves, press recipes, sound rules and the feeling-first moment sheet that make an interface feel tactile, alive and kind.
---

# Motion and feedback

Version 1.0 (2026-10-31). Changes: CHANGELOG.md in pregamer189/creative-methods.

Quiet at rest, instant on touch, one moment per screen. The product's tokens and
rules win over the values here; use these when it has none.

## Press (every tappable thing)

- Visual press **and** sound on pointer-down, never on release.
- Press-in 40-60 ms; release 160-220 ms with a small spring.
- Travel 1 px down or scale 0.97. Nothing else moves; never bounce the layout.
- Phones: a haptic with every press (light tap, rigid key, success or warning on results).
- Targets at least 44 x 44 pt; visible keyboard focus.
- Tactile key: one solid fill on a hard, zero-blur lower edge in a darker step of
  its own colour (start 3 px); on press it drops onto the edge. No gradients.

## Timing and curves

| Use | Duration | Curve |
|---|---|---|
| Press-in | 60 ms | ease-out |
| Small state change | 120 ms | ease-out |
| Release, open, close | 240 ms | spring (keys) / ease-out (sheets, no overshoot) |
| The one moment per screen | 420 ms | spring or ease-in-out |
| Celebration after a finished task | up to ~2 s | spring |

- Nothing over 500 ms blocks the next tap.
- Never ease-in on UI. Linear only when motion tracks time or scroll (progress
  fill, hold-to-confirm, loop).
- Animate `transform` and `opacity` only; no `transition: all`.
- Restart a CSS animation by removing its class and re-adding it a frame later.
- Reduced motion: keep the state change and the sound, drop the movement.

## Sound

- Most sounds under 120 ms, results under 600 ms, quiet. The tap is heard most: it
  gets the most care.
- Every result is optimistic; "wrong" is a soft low nudge, never a buzzer.
- No device text-to-speech or robot voices. Offer a sound switch; muted must lose
  nothing but sound.

## Moments that carry a feeling

Before building a moment, fill this sheet:

| Field | Example |
|---|---|
| Trigger | Finished today's session |
| Feeling | Proud, a little playful |
| Visual cue | Progress object moves up one step with a small spring |
| Sound | Rising three-note chime, < 600 ms |
| Haptic | Success |
| Scale by outcome | Great: full move + chime. Light day: half move, softer chime |
| Never | A sad sound, a loss animation, a guilt line |
| Reduced motion | State swaps, chime still plays |

- Always upbeat, even on a light day. No guilt, fear or scary countdowns.
- Tiny living details react to actions; they don't idle-loop for attention.
- Rare things stay rare: milestones and easter eggs only.

## AI tells to avoid

Fade-and-slide-up on every section, hover lifts on every card, 600 ms blur-ins,
glow halos, gradient fills, arrows in button labels.

## Check

Capture frames at 0, 16, 50 and 100 ms after pointer-down: by 50 ms the press must
show. Watch each moment at the worst outcome (still kind?) and ten times in a row
(still fresh?). Test muted and with reduced motion.

## Done when

Every press lands by 50 ms with sound, every moment has a filled sheet, and the
screen has exactly one orchestrated moment.
