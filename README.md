# creative-methods

One shared home for **video, motion graphics, emotion graphics and design
methods and skills**, plus the method tools behind them (skill audit, idea
scoring, paper search). Elias's projects read from it.

- **Owner and main author: the Language App project** (its "Set up proven
  skills and research tools" session). It writes and revises everything here.
- **Other projects (Prello, ...) only read.** They never rewrite these files.
  Improvements go back through the Language App project.
- **Generic only.** A product's own brand (palette, logo, fonts, music picks,
  name, content) stays in that product's repo. Methods here say "use the
  product's tokens"; they never name the values.
- **Living, not static.** Skills and methods change often; each skill carries a
  version and every change is logged in `CHANGELOG.md`, naming the repos that
  must sync. Each product repo installs the skills with
  `tools/sync-creative-methods.mjs` and checks itself at session start.
- Start with `METHOD-MAP.md`: how the pieces fit and which one to use when.

## Layout

| Folder | What goes in it |
|---|---|
| `METHOD-MAP.md` | The mental model: the chain from idea to finished work, who wins when rules clash, which method when |
| `skills/` | Ready-made skills in `SKILL.md` format, each complete on its own; installed into product repos by `tools/sync-creative-methods.mjs`. Index: `skills/README.md` |
| `methods/video/` | Story, storyboard, solo shooting, editing rules, coded films, the film quality gate |
| `methods/motion-graphics/` | Motion craft for interfaces and for films |
| `methods/emotion-graphics/` | Making a product feel alive and rewarding: reactions, sound, special moments |
| `methods/design/` | Visual rules that hold across products: no gradients, AI tells, tactile buttons |
| `methods/research/` | Idea scoring, paper search, learning from great references |
| `methods/skills/` | How to audit, combine and write skills so they don't contradict each other |
| `tools/` | Scripts the methods use: `skill-rules.mjs`, `skill-combos.mjs`, `papers-mcp/`. This is the canonical copy; product repos copy from here |
| `methods/branding/` | Brand knowledge base template |
| `SOURCES.md` | Every idea and source behind the methods, mapped to the file that uses it |
| `references/` | Tools, kits and libraries worth studying |
| `.claude/skills/` | This repo's self-audit: `RULE-OWNERS.md`, `combos.json`, `rules.lock.json`. `node tools/skill-combos.mjs` proves the skills agree with the methods |

## How a project uses this

1. Add `pregamer189/creative-methods` to the project's repositories and install
   with `node ../creative-methods/tools/sync-creative-methods.mjs` from the
   product repo's root. Add the session-start check (see `tools/README.md`).
2. Before video, motion or design work, read the matching `methods/` file and
   load the matching skill.
3. Put the product's own rules in its repo, and list them as the top authority
   in its `.claude/skills/RULE-OWNERS.md` (see `methods/skills/skill-audit.md`).
4. Need a change here? Ask in the Language App project.

## How to contribute (Language App)

- One subject per file, short and checkable (tables of checks beat prose).
- Say where each rule comes from (a source link, or "Elias, date").
- A mature method becomes `skills/<name>/SKILL.md`, listed in `skills/README.md`,
  and passes `node tools/skill-combos.mjs` in each repo that loads it.
- When a method improves in a product repo, update it here in the same change.
