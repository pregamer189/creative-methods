# Changelog

**Every change to a skill or tool here must be synced into every repo that uses
it: LanguageApp (pregamer189/LanguageApp) and Prello.** Run
`node scripts/sync-creative-methods.mjs` in each, then `node scripts/skill-combos.mjs`.
Each repo checks itself at session start (`--check`) and says loudly when it is
behind, so a repo that wasn't synced can't miss it.

Each change bumps the skill's `Version` line (`major.minor`: minor = a rule added,
changed or clarified; major = the skill's job or steps changed) and adds a row.

| Date | Item | Version | Change | Sync |
|---|---|---|---|---|
| 2026-10-31 | review-picker | 1.1 | Answered questions go away on return (Elias: "dont keep questions where i answered") | LanguageApp, Prello |
| 2026-10-31 | film-quality-gate | 1.5 | Elias's call: a new angle while the same move continues is allowed; re-crops, zooms of the same frame and same-frame time skips stay banned | LanguageApp, Prello |
| 2026-10-31 | video-storyboard | 1.7 | Elias's call: a new angle while the same move continues is allowed; re-crops, zooms of the same frame and same-frame time skips stay banned | LanguageApp, Prello |
| 2026-10-31 | sync tool | - | Runs the source's newer copy of itself first, so a tool added in an update installs on the first run (found when video-refs needed two runs) | LanguageApp, Prello |
| 2026-10-31 | review-picker | 1.0 | New: every item has numbered options, a recommendation, "Neither" and a short comment box; marks copy out as text; read past feedback first; options shown at real quality | LanguageApp, Prello |
| 2026-10-31 | video-storyboard | 1.6 | Read past feedback first and plan more; "sound" for a reaction means a person's voice; close to real, never kid-like; name the quality tier | LanguageApp, Prello |
| 2026-10-31 | film-quality-gate | 1.4 | Past feedback checked; close to real in every frame; character reaction sounds are a person's voice | LanguageApp, Prello |
| 2026-10-31 | motion-and-feedback | 1.3 | The gentle "oops" is a short human voice sound, never a beep; close to real, never kid-like; characters only once the owner picks a direction | LanguageApp, Prello |
| 2026-10-31 | methods | - | Owner corrections: "sound" means a person's voice; close to real, never kid-like; quality raised in tiers; plan more and read feedback first; picker hard rules | - |
| 2026-10-31 | video-storyboard | 1.5 | Choose carried or cut, carriers, screens as objects, words in the world, colour per chapter, what returns | LanguageApp, Prello |
| 2026-10-31 | methods | - | `visual-grammar.md`: frame-by-frame study of 10 films with measured cuts, shot lengths, colours and voice pace; carried-before-cut in film motion | - |
| 2026-10-31 | video-refs tools | - | `shots.py` (one frame per shot, colours), `voice_stats.py`, `music_stats.py`; note that downloads need a current yt-dlp | LanguageApp, Prello |
| 2026-10-31 | film-quality-gate | 1.3 | Texture, colour and "not everything moves" frame checks; sound checks for layers, key, one family, tails, phone and headphones, spliced voice; chosen stillness and chosen silence allowed; ducking may use an EQ pocket | LanguageApp, Prello |
| 2026-10-31 | video-storyboard | 1.4 | Five lines, reality beats expectation, rising points, script written to the song, a reason per shot, stillness and a stretch without voice; template gains five lines, taste, voice, sound family, finish | LanguageApp, Prello |
| 2026-10-31 | methods | - | Production foundation (every part: where from, how handled, how made, check); new `sound`, `voice`, `texture-and-finish`, `taste`; cut vocabulary, pacing and transitions in editing rules; film-motion rules 12-19; devices and script rules in storytelling; harness steps in coded films; `references/watch-list.md` | - |
| 2026-10-31 | video-refs tools | - | `tools/video-refs/`: fetch captions and comments, search by real views, measure a film file; added to the sync tool | LanguageApp, Prello |
| 2026-10-31 | motion-and-feedback | 1.2 | Motion budget, sub-step animation prompts, predictable rewards plus controlled surprise, unglamorous parts, human-drawn character bases (from the reference videos read by the ideas thread) | LanguageApp, Prello |
| 2026-10-31 | video-storyboard | 1.3 | Short-reel order (hook, ask, why), comment-bait buys reach not trust, show the quality you claim, no frame that makes the viewer think | LanguageApp, Prello |
| 2026-10-31 | methods | - | Reference lessons folded in: shape psychology, Andrew's order of importance, hand-cover cut, sound criticised hardest | - |
| 2026-10-31 | skill-combos tool | - | Fails when the installed shared skills are behind creative-methods | LanguageApp, Prello |
| 2026-10-31 | film-quality-gate | 1.2 | Opening and claims accept a product's approved coded stand-in (Prello explainers use no real captures); vocals follow the product's picks per film type | LanguageApp, Prello |
| 2026-10-31 | video-storyboard | 1.2 | Same stand-in rule; claims must be true of the real product | LanguageApp, Prello |
| 2026-10-31 | editing-rules (method) | - | Vocals for hype films, no vocals under an explainer voiceover (found clashing with Prello's picks) | - |
| 2026-10-31 | film-quality-gate | 1.1 | Bounce added to banned jump effects; voiceover films use short key lines, not full subtitles | LanguageApp, Prello |
| 2026-10-31 | video-storyboard | 1.1 | Sell the value, viewer motive and principle, own audience and voice, made to be quoted, measure by watch time and trials, two new shapes | LanguageApp, Prello |
| 2026-10-31 | motion-and-feedback | 1.1 | Gentle "oops" that resolves upbeat replaces "never a sad sound"; never playful-looking; delight never costs task time; meaningful zoom transitions | LanguageApp, Prello |
| 2026-10-31 | idea-scorecard | 1.1 | "Stronger if" pattern (proven mechanism + our capability + a human feeling); keep the unusual part | LanguageApp, Prello |
| 2026-10-31 | skill-audit | 1.1 | Choosing skills: few and sharp, proven results, fix on a miss, one lead skill once proven | LanguageApp, Prello |
| 2026-10-31 | sync tool | - | `tools/sync-creative-methods.mjs`: installs skills and tools, checks for drift | LanguageApp, Prello |
| 2026-10-31 | methods | - | Ideas pass: every idea I1-I70 mapped in `SOURCES.md`; show-changes and brand-kb methods added | - |
| 2026-10-31 | film-quality-gate | 1.0 | Rewritten self-contained | LanguageApp, Prello |
| 2026-10-31 | video-storyboard | 1.0 | New | LanguageApp, Prello |
| 2026-10-31 | motion-and-feedback | 1.0 | New | LanguageApp, Prello |
| 2026-10-31 | idea-scorecard | 1.0 | New (generic copy of the Language App skill) | LanguageApp, Prello |
| 2026-10-31 | skill-audit | 1.0 | New | LanguageApp, Prello |
