#!/usr/bin/env node
// Proves that the skill sets we load together don't leave a clash unowned.
// No dependencies.
//
//   node scripts/skill-combos.mjs              check every set in .claude/skills/combos.json
//   node scripts/skill-combos.mjs --lock       after reviewing, record each source's rules
//
// A set fails when:
//   - one of its skills is missing;
//   - two or more of its skills (or a skill and a repo rule file) give rules on a
//     topic that RULE-OWNERS.md hasn't reviewed;
//   - a skill's rules changed since the last review (its fingerprint in rules.lock.json
//     differs), so a vendored update can't slip in a new clash unseen.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { table, REPO_SOURCES, SKILL_DIRS } from './skill-rules.mjs';

const OWNERS = '.claude/skills/RULE-OWNERS.md';
const LOCK = '.claude/skills/rules.lock.json';
const { combos } = JSON.parse(readFileSync('.claude/skills/combos.json', 'utf8'));
const reviewed = new Set((readFileSync(OWNERS, 'utf8').match(/^Reviewed topics: (.*)$/m)?.[1] || '').split(/,\s*/));

const fingerprint = (src) => createHash('sha1')
  .update(table.filter((r) => r.src === src).map((r) => r.text).join('\n')).digest('hex').slice(0, 12);
const sources = [...new Set(table.map((r) => r.src))].sort();

if (process.argv.includes('--lock')) {
  writeFileSync(LOCK, JSON.stringify(Object.fromEntries(sources.map((s) => [s, fingerprint(s)])), null, 1) + '\n');
  console.log(`rules.lock.json: ${sources.length} sources recorded`);
  process.exit(0);
}

const lock = existsSync(LOCK) ? JSON.parse(readFileSync(LOCK, 'utf8')) : {};
let fails = 0;
for (const c of combos) {
  const problems = [];
  const set = [...REPO_SOURCES, ...c.skills];
  for (const s of c.skills) if (!SKILL_DIRS.some((d) => existsSync(`${d}/${s}/SKILL.md`))) problems.push(`missing skill ${s}`);
  for (const s of set) {
    if (!sources.includes(s)) continue;
    if (lock[s] && lock[s] !== fingerprint(s)) problems.push(`${s} rules changed since review: rerun skill-rules, update RULE-OWNERS.md, then --lock`);
    if (!lock[s]) problems.push(`${s} never reviewed: add it to RULE-OWNERS.md, then --lock`);
  }
  const byTopic = {};
  for (const r of table) if (set.includes(r.src)) for (const t of r.topics) (byTopic[t] ||= new Set()).add(r.src);
  const shared = Object.entries(byTopic).filter(([, s]) => s.size > 1).map(([t]) => t);
  const open = shared.filter((t) => !reviewed.has(t));
  if (open.length) problems.push(`shared topics with no owner yet: ${open.join(', ')}`);
  fails += problems.length ? 1 : 0;
  console.log(`${problems.length ? 'FAIL' : 'ok  '}  ${c.name} (${c.skills.join(' + ')}): ${shared.length} shared topics${open.length ? '' : ', all owned'}`);
  for (const p of problems) console.log(`        ${p}`);
}
process.exit(fails ? 1 : 0);
