---
name: skill-audit
description: Use when adding, updating or combining skills in a repo, or when two skills seem to disagree. Finds rule clashes between skills and the repo's own rules, settles each with one owner, and proves the skill sets real tasks load together have no unowned clash.
---

# Skill audit

Skills from different places contradict each other, and an agent follows
whichever it read last. This skill makes one owner per rule and proves it.

## Order of precedence

1. What the person says now.
2. The repo's own rules: `CLAUDE.md`, quality bar, founder picks, design tokens.
3. Shared methods the repo adopts.
4. The repo's own skills and shared skills.
5. Imported skills (web, vendored, plugins): craft advice, never above 1-4.

## Steps

1. **Find the tools.** If the repo has `scripts/skill-rules.mjs` and
   `scripts/skill-combos.mjs`, use them. If not, copy them from the shared
   creative-methods repo (`tools/`), or do steps 2-4 by hand with the same table.
2. **Scan.** `node scripts/skill-rules.mjs` lists hard rules (must, never, always,
   don't, avoid, no) per topic and source. `node scripts/skill-rules.mjs --topic
   <t>` shows one topic side by side.
3. **Settle every shared topic** in `.claude/skills/RULE-OWNERS.md`:
   - Clash: one table row with the topic, the clash in one line, and the winner
     plus the exact rule to follow (a value, not "be careful").
   - Agreement: add the topic to a "no clash found" line.
   - Last line, machine-read: `Reviewed topics: topic1, topic2, ...`.
4. **Sets.** In `.claude/skills/combos.json`, list each set of skills a real task
   loads together: `{ "name", "task", "skills": [...] }`.
5. **Prove.** `node scripts/skill-combos.mjs` must print `ok` for every set. A set
   fails on a missing skill, a shared topic not in "Reviewed topics", or a skill
   whose rules changed since review.
6. **Lock.** `node scripts/skill-combos.mjs --lock` after reviewing.

## Writing a new skill

- One line on when to use it, and when not.
- Checkable rules: numbers, commands, named frames. Not "make it premium".
- Sources named. Values (palette, fonts, durations) deferred to the repo's
  tokens, not copied.
- Good and bad examples, and a "done when" line.
- An account skill (pasted into claude.ai) must be complete on its own: it can't
  open repo files.

## Example row

| Topic | The clash | Winner and rule |
|---|---|---|
| Durations | Skill A: 150-250 ms everywhere. Skill B: 600 ms blur-in | Repo tokens: 60 / 120 / 240 / 420 ms; 420 only for the one moment per screen; nothing over 500 ms blocks a tap |

Bad: "Durations: use judgement." No owner, no value.

## Done when

Every set in `combos.json` prints `ok`, every clash row names a winner and a
concrete rule, and `rules.lock.json` is updated.
