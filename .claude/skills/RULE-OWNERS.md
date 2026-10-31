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
| Sad sounds | Earlier rule: never a sad sound. Elias's I31: a tutor can make small sounds (happy, sad, it went worse), mostly positive, never discouraging | Both, merged: a character may give a brief gentle "oops" (a short human voice sound, never a beep) to a miss that resolves into encouragement in the same moment; results and progress objects always end upbeat; nothing discouraging. A product rule can be stricter (Language App: the streak vehicle only ever sounds good) |
| Game layer | I21 and I27 want small characters and easter eggs; I30, store reviews and Elias 2026-10-31: never kid-like, close to real | Close to real wins: delight is brief, rare and crafted, never cartoonish or toy-like, never costs task time, and can be turned off |
| Subtitles | Film gate: feeds autoplay muted, so text carries the message; I36: voiceover films, not many subtitles | Both: short on-screen key lines carry it muted; a voiceover-led film doesn't subtitle every word |
| Where the ask goes | Film gate: the ending is one clear action; Hormozi reels: hook, then the ask, then the why | Both, by length: short reels (under ~20 s) put the ask after the hook; longer films end on it |
| Springs | `ui-motion`: springs on keys and characters; no overshoot on sheets and dialogs | One rule in both files: springs for keys, pops and characters; ease-out without overshoot for sheets and dialogs |

| Stillness | Gate and `film-motion`: pause anywhere, something is mid-flight; 2026 reference work and Gawx: stillness and static shots give action its force | Both: mid-flight or a held frame chosen in the storyboard. Idle wobble stays banned |
| Sound on every event | Gate: every visual event has a sound; Herman Huang and Nordin: silence adds tension, delete before adding | Every event that matters has a sound or a chosen silence, planned in the storyboard |
| Music order | Andrew, Gawx: music first; Kurzgesagt: composed last | A licensed track comes first and the script is written to it; a composed score comes last, to the finished picture. Default music-first stays in the storyboard |
| Ducking | Gate: duck 15-20 dB; Herman Huang: carve an EQ pocket instead | Keep the voice clear: 15-20 dB, or less with a pocket or a removed stem |
| Same-scene cuts | Hard rule: no cutting back into the same image; cut vocabulary: action cuts, shot sequences, jump cuts | Elias, 2026-10-31: a new angle while the same move continues is allowed. No re-crop or zoom of the same frame, no same-frame time skips |
| Voice settings | ElevenLabs: default similarity, style at zero; Isaac: low stability, similarity 70%, raised style | Start from the vendor's defaults, compare takes on your own line |
| Flat fills | `film-motion`: flat fills only; `texture-and-finish`: a frame must not be only flat vector | Both: colours stay flat with no gradient, and texture comes from material and grain layers on top |
| Centring | Apple-style guide: centre the layout; Satori and `ai-tells`: centred defaults read as AI | Centre on purpose only; one deliberate break of the template per frame |

No clash found on: gradients (all ban them, depth from tone steps and edges),
colour (no pure black or white neutrals, emphasis by weight or one accent), easing
(no ease-in on UI, linear only for time or scroll), copy (learn reasons, never copy
shots), streak and guilt (always upbeat, no guilt or fear), button press (1 px or
0.97, pointer-down, 44 pt), motion (pause anywhere shows meaningful motion; one
moment per screen), ai_tells, icon (no sad app icon; no emoji or arrows in labels), research (sources cited, reviews first), asking
(owner-only choices such as banned tracks and downloads stay with the owner).

Reviewed on 2026-10-31 after adding production-foundation, sound, voice, texture-and-finish and taste; the clashes above are what that review found.

Reviewed topics: gradient, colour, easing, duration, motion, sound, button, copy, ai_tells, streak, research, asking, icon
