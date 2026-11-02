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

## The harness is most of it (2026-10)

"The prompt is 10% of the outcome; the rest is the harness" (Margerie, 710k views).

1. **House rules file** read on every run: render contract, the look (bans), sound,
   the feedback loop. Ours is this repo.
2. **Real references, always:** a screen recording, screenshots or a film to study.
   They're why the result looks like real software (Matt Loui). Never a fake interface.
3. **"Ask me as many questions as you need"** before starting. Skipped questions become
   guesses (Matt Loui, whose first outputs were then usable).
4. **Style guide from a reference:** extract frames every 0.5 s, write palette, type,
   shot lengths, transition types, camera moves, texture, how text enters and leaves.
   "Take the grammar, never its content, logos or characters."
5. **Brand files plus a spec list** (buttons, loaders, checks, charts) so a look holds
   across films. Same project, same chat: it already knows the taste.
6. **Director's brief:** one-line film, references, tools, character bible if any, beat
   sheet, on-screen text, workflow gates, critique loop, deliverables. Role: director,
   animator, sound designer and render engineer.
7. **Beat grid before code,** as a table to read and correct.
8. **Sound in sync:** measure or synthesise the track, export `beats.json`, retime.
   Then synthesise or place a sound per event.
9. **Critique loop:** contact sheet; a pass that only critiques, citing scene and time;
   rank fixes must, major, polish; fix, re-render. "Code that runs is not visually
   correct." A score from the same model is a draft check, never the gate (I14).
10. **Draft cheap, finish once:** low resolution and short renders until approved.
11. **Finish in an editor when it helps:** the coded render is footage; sound, texture
    and pacing can be added outside it (Matt Loui).

Left to itself the model writes one HTML file rendered by Playwright and ffmpeg rather
than using a framework, so name the framework you want (Margerie, citing Tommy Rossi).

**Claude Motion** (launched 2026-10): an artifact type where a prompt becomes an
animated explanation, editable by comments, exported to MP4. Reported in beta for Team
and Enterprise (Anthropic's support page); limits unpublished. Fit for data stories and
quick drafts; untested by us for film-grade work.
