# Skills

Each skill here is complete on its own, so it works when pasted into claude.ai as
an account skill (an account skill can't open repo files). The method behind each
one, with reasons and sources, is in `methods/`.

| Skill | Use when | Method |
|---|---|---|
| `film-quality-gate` | Checking any finished film before a person sees it | `methods/video/film-quality-gate.md` |
| `video-storyboard` | Planning a short film before building or shooting | `methods/video/storytelling.md`, `storyboard.md` |
| `motion-and-feedback` | Adding animation, press feedback, haptics, sound or a celebration moment to an interface | `methods/motion-graphics/ui-motion.md`, `methods/emotion-graphics/README.md` |
| `idea-scorecard` | Weighing ideas on their merits, blind, with the owner's view kept apart | `methods/research/idea-rail.md` |
| `skill-audit` | Adding, updating or combining skills; when two skills disagree | `methods/skills/skill-audit.md` |

## Add one to your account

claude.ai > Settings > Capabilities > Skills > upload or create, and paste the
`SKILL.md`. In a repo, copy the folder into `.claude/skills/` instead.

## Rules for this folder

- A skill is a mature method only: it has been used on real work at least once.
- Values a product owns (palette, fonts, music picks, names) are never written
  here; the skill says "the product's rules win".
- Skills keep changing. Every change bumps the skill's `Version` line (minor for a
  rule added or changed, major when its job or steps change) and adds a row to
  `CHANGELOG.md` saying whether account copies need re-pasting.
- After any change: `node tools/skill-combos.mjs` and `node tools/skill-versions.mjs`
  must both pass, then `node tools/skill-combos.mjs --lock`.
- `node tools/skill-versions.mjs --since <last pasted ref>` lists which skills to
  re-paste into claude.ai.
