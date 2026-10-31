# Rule owners (this repo's self-audit)

The shared skills in `skills/` and the methods in `methods/` must agree with each
other before any product loads them. Checked with `node tools/skill-rules.mjs`
and proved with `node tools/skill-combos.mjs` (sets in `combos.json`).

## Order inside this repo

1. The methods (`methods/`): they hold the reasons and sources.
2. The skills (`skills/`): paste-ready copies of mature methods. When a skill and
   its method differ, the method wins and the skill gets fixed in the same change.

In a product repo, the product's own rules outrank both (see `METHOD-MAP.md`).

## Clashes found and how they are settled

| Topic | The clash | Winner and rule |
|---|---|---|
| Durations | `ui-motion` and `motion-and-feedback`: nothing over 500 ms blocks a tap; `emotion-graphics`: celebrations can run longer | Both, scoped: a celebration after a finished task may run up to about 2 s because nothing waits on it; everything else stays under 500 ms |
| Sound on presses | `ui-motion`: every press plays a sound; film notes (seeded from a product's film rules): no button-press clicks in films | Interfaces: every press sounds. Films: every visual event gets a sound, but a depicted button press uses a soft film sound unless the product's film rules ban clicks (Prello's do); the product rule wins |
| Sad sounds | Earlier rule: never a sad sound. Elias's I31: a tutor can make small sounds (happy, sad, it went worse), mostly positive, never discouraging | Both, merged: a character may give a brief gentle "oops" to a miss that resolves into encouragement in the same moment; results and progress objects always end upbeat; nothing discouraging. A product rule can be stricter (Language App: the streak vehicle only ever sounds good) |
| Game layer | I21 and I27 want small characters and easter eggs; I30 and store reviews: never playful-looking or "infantilising" | Both: delight is brief, rare and crafted, never childish, never costs task time, and can be turned off |
| Subtitles | Film gate: feeds autoplay muted, so text carries the message; I36: voiceover films, not many subtitles | Both: short on-screen key lines carry it muted; a voiceover-led film doesn't subtitle every word |
| Springs | `ui-motion`: springs on keys and characters; no overshoot on sheets and dialogs | One rule in both files: springs for keys, pops and characters; ease-out without overshoot for sheets and dialogs |

No clash found on: gradients (all ban them, depth from tone steps and edges),
colour (no pure black or white neutrals, emphasis by weight or one accent), easing
(no ease-in on UI, linear only for time or scroll), copy (learn reasons, never copy
shots), streak and guilt (always upbeat, no guilt or fear), button press (1 px or
0.97, pointer-down, 44 pt), motion (pause anywhere shows meaningful motion; one
moment per screen), ai_tells, icon (no sad app icon; no emoji or arrows in labels), research (sources cited, reviews first), asking
(owner-only choices such as banned tracks and downloads stay with the owner).

Reviewed topics: gradient, colour, easing, duration, motion, sound, button, copy, ai_tells, streak, research, asking, icon
