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
