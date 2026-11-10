# Changelog

**Every change to a skill or tool here must be synced into every repo that uses
it: draft-concept (pregamer189/draft-concept) and Prello.** Run
`node scripts/sync-creative-methods.mjs` in each, then `node scripts/skill-combos.mjs`.
Each repo checks itself at session start (`--check`) and says loudly when it is
behind, so a repo that wasn't synced can't miss it.

Each change bumps the skill's `Version` line (`major.minor`: minor = a rule added,
changed or clarified; major = the skill's job or steps changed) and adds a row.

| Date | Item | Version | Change | Sync |
|---|---|---|---|---|
| 2026-11-10 | methods | - | New `video/scroll-page-films.md` (render a scroll page as a film: fake clock, scroll driven by on-screen speed, fractional scroll, frame rate, the opening second, sound, reading first numbers); `web/landing-pages.md` gains lessons from review rounds (edge margins, nothing pops in, only what was asked) | - |
| 2026-11-09 | motion-and-feedback | 1.5 | The measured-teardown pointer is no longer a repo path, so installed copies pass the product repos' broken-link check | LanguageApp, Prello |
| 2026-11-08 | review-picker | 1.5 | Pick buttons post real comments on the page host and the comment button opens the host's own composer (no text fields on the page there); preset tags; one mark per thing; "This is X. You are rating Y."; the bias line; phone size first with every variation screenshot-checked; each round archived to the preferences log and cleared; verdicts as icons | draft-concept, Prello |
| 2026-11-08 | motion-and-feedback | 1.4 | Ease-in scoped: never on a tap response; exits may accelerate and a progress bar jumping to a new value fills ease-in with the reward on arrival (measured teardown); feedback mark lands on the tap frame; wrong is quiet | draft-concept, Prello |
| 2026-11-08 | video-storyboard | 1.8 | Examples made product-neutral (viewer motive, the good shot example) | draft-concept, Prello |
| 2026-11-08 | idea-scorecard | 1.2 | The worked example of the "stronger if" pattern made product-neutral | draft-concept, Prello |
| 2026-11-08 | skill-rules tool | - | Product terms removed from the shared topic words; a repo can add its own with `topics` in `rule-sources.json` | draft-concept, Prello |
| 2026-11-08 | methods | - | New `methods/principles/` (evidence first, product philosophy, running the work, idea to finished), `design/scene-kit.md`, `motion-graphics/measured-teardown.md`, `motion-graphics/motion-and-sound-lab.md`, `video/teaching-account.md`, `web/landing-pages.md`; show-changes updated; product hints scrubbed from the public docs and the paper benchmark | - |
| 2026-10-31 | review-picker | 1.4 | From the owner: A/B shape, like / dislike on each part, a comment button on each part (opens a box ready for dictation), very little text, a light and clear page; letters A/B allowed again | draft-concept, Prello |
| 2026-10-31 | review-picker | 1.3 | Hard rules from the owner: a free-text box on every item (always visible, saved, text alone counts), and a quality tier label on every option with a tier ladder at the top | draft-concept, Prello |
| 2026-10-31 | review-picker | 1.2 | Answers save as you go to the page host's shared store (one document per item, read back on load); the person only says "done"; Copy my marks is the backup; every "you said" quotes and links the message | draft-concept, Prello |
| 2026-10-31 | review-picker | 1.1 | Answered questions go away on return (Elias: "dont keep questions where i answered") | draft-concept, Prello |
| 2026-10-31 | film-quality-gate | 1.5 | Elias's call: a new angle while the same move continues is allowed; re-crops, zooms of the same frame and same-frame time skips stay banned | draft-concept, Prello |
| 2026-10-31 | video-storyboard | 1.7 | Elias's call: a new angle while the same move continues is allowed; re-crops, zooms of the same frame and same-frame time skips stay banned | draft-concept, Prello |
| 2026-10-31 | sync tool | - | Runs the source's newer copy of itself first, so a tool added in an update installs on the first run (found when video-refs needed two runs) | draft-concept, Prello |
| 2026-10-31 | review-picker | 1.0 | New: every item has numbered options, a recommendation, "Neither" and a short comment box; marks copy out as text; read past feedback first; options shown at real quality | draft-concept, Prello |
| 2026-10-31 | video-storyboard | 1.6 | Read past feedback first and plan more; "sound" for a reaction means a person's voice; close to real, never kid-like; name the quality tier | draft-concept, Prello |
| 2026-10-31 | film-quality-gate | 1.4 | Past feedback checked; close to real in every frame; character reaction sounds are a person's voice | draft-concept, Prello |
| 2026-10-31 | motion-and-feedback | 1.3 | The gentle "oops" is a short human voice sound, never a beep; close to real, never kid-like; characters only once the owner picks a direction | draft-concept, Prello |
| 2026-10-31 | methods | - | Owner corrections: "sound" means a person's voice; close to real, never kid-like; quality raised in tiers; plan more and read feedback first; picker hard rules | - |
| 2026-10-31 | video-storyboard | 1.5 | Choose carried or cut, carriers, screens as objects, words in the world, colour per chapter, what returns | draft-concept, Prello |
| 2026-10-31 | methods | - | `visual-grammar.md`: frame-by-frame study of 10 films with measured cuts, shot lengths, colours and voice pace; carried-before-cut in film motion | - |
| 2026-10-31 | video-refs tools | - | `shots.py` (one frame per shot, colours), `voice_stats.py`, `music_stats.py`; note that downloads need a current yt-dlp | draft-concept, Prello |
| 2026-10-31 | film-quality-gate | 1.3 | Texture, colour and "not everything moves" frame checks; sound checks for layers, key, one family, tails, phone and headphones, spliced voice; chosen stillness and chosen silence allowed; ducking may use an EQ pocket | draft-concept, Prello |
| 2026-10-31 | video-storyboard | 1.4 | Five lines, reality beats expectation, rising points, script written to the song, a reason per shot, stillness and a stretch without voice; template gains five lines, taste, voice, sound family, finish | draft-concept, Prello |
| 2026-10-31 | methods | - | Production foundation (every part: where from, how handled, how made, check); new `sound`, `voice`, `texture-and-finish`, `taste`; cut vocabulary, pacing and transitions in editing rules; film-motion rules 12-19; devices and script rules in storytelling; harness steps in coded films; `references/watch-list.md` | - |
| 2026-10-31 | video-refs tools | - | `tools/video-refs/`: fetch captions and comments, search by real views, measure a film file; added to the sync tool | draft-concept, Prello |
| 2026-10-31 | motion-and-feedback | 1.2 | Motion budget, sub-step animation prompts, predictable rewards plus controlled surprise, unglamorous parts, human-drawn character bases (from the reference videos read by the ideas thread) | draft-concept, Prello |
| 2026-10-31 | video-storyboard | 1.3 | Short-reel order (hook, ask, why), comment-bait buys reach not trust, show the quality you claim, no frame that makes the viewer think | draft-concept, Prello |
| 2026-10-31 | methods | - | Reference lessons folded in: shape psychology, Andrew's order of importance, hand-cover cut, sound criticised hardest | - |
| 2026-10-31 | skill-combos tool | - | Fails when the installed shared skills are behind creative-methods | draft-concept, Prello |
| 2026-10-31 | film-quality-gate | 1.2 | Opening and claims accept a product's approved coded stand-in (Prello explainers use no real captures); vocals follow the product's picks per film type | draft-concept, Prello |
| 2026-10-31 | video-storyboard | 1.2 | Same stand-in rule; claims must be true of the real product | draft-concept, Prello |
| 2026-10-31 | editing-rules (method) | - | Vocals for hype films, no vocals under an explainer voiceover (found clashing with Prello's picks) | - |
| 2026-10-31 | film-quality-gate | 1.1 | Bounce added to banned jump effects; voiceover films use short key lines, not full subtitles | draft-concept, Prello |
| 2026-10-31 | video-storyboard | 1.1 | Sell the value, viewer motive and principle, own audience and voice, made to be quoted, measure by watch time and trials, two new shapes | draft-concept, Prello |
| 2026-10-31 | motion-and-feedback | 1.1 | Gentle "oops" that resolves upbeat replaces "never a sad sound"; never playful-looking; delight never costs task time; meaningful zoom transitions | draft-concept, Prello |
| 2026-10-31 | idea-scorecard | 1.1 | "Stronger if" pattern (proven mechanism + our capability + a human feeling); keep the unusual part | draft-concept, Prello |
| 2026-10-31 | skill-audit | 1.1 | Choosing skills: few and sharp, proven results, fix on a miss, one lead skill once proven | draft-concept, Prello |
| 2026-10-31 | sync tool | - | `tools/sync-creative-methods.mjs`: installs skills and tools, checks for drift | draft-concept, Prello |
| 2026-10-31 | methods | - | Ideas pass: every idea I1-I70 mapped in `SOURCES.md`; show-changes and brand-kb methods added | - |
| 2026-10-31 | film-quality-gate | 1.0 | Rewritten self-contained | draft-concept, Prello |
| 2026-10-31 | video-storyboard | 1.0 | New | draft-concept, Prello |
| 2026-10-31 | motion-and-feedback | 1.0 | New | draft-concept, Prello |
| 2026-10-31 | idea-scorecard | 1.0 | New (generic copy of the draft-concept skill) | draft-concept, Prello |
| 2026-10-31 | skill-audit | 1.0 | New | draft-concept, Prello |
