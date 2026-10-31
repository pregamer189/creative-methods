# Coded films workflow (2026-10-17)

This version is built from online research: the HyperFrames docs and news, the
[awesome-ai-motion-graphics](https://github.com/benjoox/awesome-ai-motion-graphics) index of Claude video work,
and the skills and films listed there. 

## How people make good coded films with Claude right now

The current stack is **HTML + CSS + GSAP for layout and motion, three.js/WebGL for texture and post effects, rendered
frame by frame in headless Chrome and encoded with ffmpeg** (Elias, 2026-10-17: no 3D world, no Remotion). HyperFrames (HeyGen, Apache 2.0) is the agent-first
renderer for exactly this ([mindstudio](https://www.mindstudio.ai/blog/what-is-hyperframes-html-video-renderer-ai-agents),
[AI Engineer talk "HTML is all agents need"](https://ai.engineer/talks/html-is-all-agents-need)). The quality jump
comes from **packaged style skills** that Claude follows, not from the renderer:

| Skill / kit (all free, open source) | What it gives | Why use it |
|---|---|---|
| [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar) (MIT) | 51 film styles, each a `STYLE.md` (look and sound) plus a demo film built in code by Claude; shared `DIRECTOR.md` (story, rhythm, camera) and `TECHNIQUE.md` (frame rendering, voice, music, mixing). Canvas/WebGL/three.js | The model for our setup: one style file per look, the story supplied per film. Study its director and technique guides |
| [opus-video-skills](https://github.com/tuzhechen2005/opus-video-skills) | `kinetic-reel`: condensed display type, HUD micro-type, WebGL post pass; every frame a pure function of time; contact sheets before the encode | The closest look to a flashy product film |
| [Bang Motion](https://github.com/bangtutorial/bang-motion) | Promos, openers, product demos as one `index.html` (GSAP + three.js); proposes 3 concepts and a sourced palette before any code; `snap.mjs` checks key seconds; voice-over pause detection | Its concept-first brief and key-second checks |
| [Shipvideo](https://github.com/diggerhq/shipvideo) | Launch video from a URL or prompt, agent-written HTML | Reference for launch structure |
| HyperFrames built-in skills (`/product-launch-video`, `/motion-graphics`, `/music-to-video`) | Install per project | Renderer plus `check` and `snapshot` for the quality gate |

Where to study the look: [What Ships](https://whatships.com/) (library of product-launch videos for pacing, type and
direction), [ClaudeVideo](https://claudevideo.org/) (searchable index of Claude videos with their prompts), and
Movez's motion-design course on X (references, direction, springs, sound, critique).

## The workflow these projects share

1. **Separate stable instructions from changing inputs.** Style, direction and technique live in files written
   once; each film supplies only its subject, copy, music and assets.
2. **Reference analysis.** Take the visual grammar of 2–3 reference films (composition, pacing, transitions), not
   their content.
3. **Concept and director's brief before code.** Three concepts with a recommendation (Bang Motion), then timed
   shots, exact on-screen copy and continuity rules between shots.
4. **Measure the music first.** Beat detection alone misses the first downbeat, so measure the track.
5. **Deterministic frames.** Every frame is computed from its time; seeded noise only.
6. **Cheap review.** Render key stills and a rough animatic before the full render, then check real playback for
   motion and sync. Stills catch layout; only playback catches motion.
7. **One timed sequence, many formats.** 16:9 and 9:16 come from the same timing.
8. **A new chat per film**, so old decisions don't eat context and tokens.


Motion rules for these films: `../motion-graphics/film-motion.md`. Storyboard first: `storyboard.md`. Gate: `film-quality-gate.md`.
