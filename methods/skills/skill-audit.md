# Skill audit: keeping combined skills from contradicting each other

Elias (2026-10-31): "a big trap is that you fetch too many skills that contradict
each other." An agent that loads three skills with different rules on the same
topic follows whichever it read last. The fix is one owner per rule, written down
and proved by a script. Paste-ready version: `skills/skill-audit/SKILL.md`.

## The order of precedence (every repo)

1. What the person says now.
2. The repo's own rules (`CLAUDE.md`, quality bar, founder picks, tokens).
3. These shared methods.
4. The repo's own skills and the shared skills from `skills/`.
5. Imported skills (from the web, vendored, plugins): craft advice that never
   overrides 1 to 4.

## The loop

1. **Scan.** `node scripts/skill-rules.mjs` pulls every hard rule (must, never,
   always, don't, avoid, no...) from the repo's rule files and every skill, and
   tags each by topic (gradient, shadow, colour, type, easing, duration, motion,
   sound, button, copy, ...). `--topic easing` shows one topic side by side.
2. **Settle.** For every topic where two sources give rules, read them side by
   side. If they clash, write the winner and the exact rule to follow in
   `.claude/skills/RULE-OWNERS.md` (a table: topic, the clash, winner and rule).
   If they agree, list the topic under "no clash found". End the file with one
   machine-read line: `Reviewed topics: gradient, shadow, ...`.
3. **Prove.** `.claude/skills/combos.json` lists the skill sets real tasks load
   together. `node scripts/skill-combos.mjs` fails a set when a skill is missing,
   a shared topic isn't reviewed, or a skill's rules changed since the last
   review (fingerprints in `rules.lock.json`).
4. **Lock.** After reviewing, `node scripts/skill-combos.mjs --lock`.
5. **Repeat** whenever a skill is added, updated or vendored again. The script
   fails until the new rules are reviewed, so an update can't slip in a clash.

## Setup in a repo

- Copy `tools/skill-rules.mjs` and `tools/skill-combos.mjs` into `scripts/`.
- Optional `.claude/skills/rule-sources.json`:
  `{ "sources": [["CLAUDE.md","CLAUDE.md"], ["QUALITY","design/QUALITY.md"]], "skillDirs": ["../creative-methods/skills"] }`.
  `sources` are the repo's rule files (rank 2); `skillDirs` adds skill folders
  beyond `.claude/skills`.
- Write `combos.json` from real tasks, not imagined ones: one set per kind of work.

## Writing or taking in a skill

| Check | Why |
|---|---|
| Says when to use it in one line, and what it must not be used for | Stops it loading for the wrong job |
| Rules are checkable (a number, a command, a named frame) | "Make it feel premium" can't be checked |
| Names its sources | So a clash can be judged on evidence |
| Defers to the repo's rules instead of repeating values (palette, fonts) | Values live in one place |
| Has good and bad examples and a "done when" line | Agents follow examples more than prose |
| Self-contained if it's an account skill | Account skills can't open repo files |
| Passes `skill-combos` in every repo that loads it | Proof, not hope |

Imported skills: read every file before loading; keep only the parts the work
uses; never let one override the repo's rules (rank 5).

## Choosing and keeping skills (Elias, I32, I37, I12)

- **Few, sharp, own skills** that distil the best sources beat many installed
  ones. Every description loaded costs context and raises the chance of a wrong
  pick.
- **Pick by proven results:** testimonials, reactions, views and shown output of
  the skill or tool, not likes or hype. Note the evidence when adding one.
- **Update on a miss.** When output goes wrong, find which rule steered it and fix
  the skill; that is how drift is stopped (the early-good, later-bad film drift,
  I12). The fingerprints in `rules.lock.json` make silent changes visible.
- **One lead skill per kind of work** names which skills run and in what order
  (like a plan-review chain). Write it only after one real piece of work has been
  made with those skills, so the order is proven, not guessed.
