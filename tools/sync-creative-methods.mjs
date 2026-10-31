#!/usr/bin/env node
// Installs the shared skills and tools from pregamer189/creative-methods into a
// product repo, and checks that the installed copies are current. No dependencies.
// Run from the product repo's root:
//
//   node scripts/sync-creative-methods.mjs           install or update everything
//   node scripts/sync-creative-methods.mjs --check   report anything out of date (exit 1)
//   ... --from <path>                                where creative-methods is cloned
//                                                    (default: $CREATIVE_METHODS_DIR,
//                                                    ../creative-methods, /home/user/creative-methods)
//
// What it installs: every skills/<name>/ into .claude/skills/<name>/, and the
// canonical tools (skill-rules, skill-combos, this script into scripts/;
// papers-mcp into tools/). It records versions in .claude/skills/creative-methods.lock.json.
// Installed copies are never edited in the product repo: change creative-methods,
// then sync every repo that uses it (CHANGELOG.md there lists which).

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const CHECK = args.includes('--check');
const LOCK = '.claude/skills/creative-methods.lock.json';
const TOOLS = [
  ['tools/skill-rules.mjs', 'scripts/skill-rules.mjs'],
  ['tools/skill-combos.mjs', 'scripts/skill-combos.mjs'],
  ['tools/sync-creative-methods.mjs', 'scripts/sync-creative-methods.mjs'],
  ['tools/papers-mcp', 'tools/papers-mcp'],
];

const src = [flag('--from'), process.env.CREATIVE_METHODS_DIR, '../creative-methods', '/home/user/creative-methods']
  .find((p) => p && existsSync(join(p, 'skills')) && existsSync(join(p, 'METHOD-MAP.md')));
if (!src) {
  console.log('creative-methods: not cloned in this session, so the shared skills could not be checked. ' +
    'Add pregamer189/creative-methods to the session, then run node scripts/sync-creative-methods.mjs --check.');
  process.exit(0);
}

const files = (p) => statSync(p).isDirectory() ? readdirSync(p).flatMap((f) => files(join(p, f))) : [p];
const hash = (p) => createHash('sha1').update(files(p).sort().map((f) => f.slice(p.length) + '\0' + readFileSync(f)).join('\0')).digest('hex').slice(0, 12);
const version = (dir) => (existsSync(join(dir, 'SKILL.md')) && readFileSync(join(dir, 'SKILL.md'), 'utf8').match(/^Version (\d+\.\d+)/m)?.[1]) || '?';
let commit = '?';
try { commit = execSync(`git -C "${src}" rev-parse --short HEAD`, { encoding: 'utf8' }).trim(); } catch {}

const skills = readdirSync(join(src, 'skills'), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();
const lock = existsSync(LOCK) ? JSON.parse(readFileSync(LOCK, 'utf8')) : { skills: {}, tools: {} };

if (CHECK) {
  const out = [];
  for (const s of skills) {
    const from = join(src, 'skills', s), to = join('.claude/skills', s);
    if (!existsSync(to)) { out.push(`missing   ${s} ${version(from)} (not installed)`); continue; }
    if (hash(from) === hash(to)) continue;
    const vi = lock.skills?.[s]?.version || version(to), vs = version(from);
    if (lock.skills?.[s] && hash(to) !== lock.skills[s].hash) out.push(`edited    ${s}: changed here by hand; move the change into creative-methods instead`);
    else out.push(`outdated  ${s}: ${vi} installed, ${vs} in creative-methods`);
  }
  for (const [from, to] of TOOLS) {
    if (!existsSync(join(src, from))) continue;
    if (!existsSync(to) || hash(join(src, from)) !== hash(to)) out.push(`outdated  tool ${to}`);
  }
  if (!out.length) { console.log(`creative-methods: in sync (${skills.length} skills, source ${commit}).`); process.exit(0); }
  console.log(`creative-methods: THIS REPO IS BEHIND the shared skills (source ${commit}).`);
  for (const l of out) console.log('  ' + l);
  console.log('Fix: node scripts/sync-creative-methods.mjs, then node scripts/skill-combos.mjs ' +
    '(settle any new clash in RULE-OWNERS.md, then --lock), and commit.');
  process.exit(1);
}

const copy = (from, to) => {
  for (const f of files(from)) {
    const dest = join(to, f.slice(from.length));
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(f, dest);
  }
};
const next = { source: 'pregamer189/creative-methods', commit, synced: new Date().toISOString().slice(0, 10), skills: {}, tools: {} };
for (const s of skills) {
  const from = join(src, 'skills', s), to = join('.claude/skills', s);
  const before = existsSync(to) ? version(to) : null;
  copy(from, to);
  next.skills[s] = { version: version(to), hash: hash(to) };
  if (before !== next.skills[s].version) console.log(`${before ? 'updated' : 'installed'}  ${s} ${before ? before + ' -> ' : ''}${next.skills[s].version}`);
}
for (const [from, to] of TOOLS) {
  if (!existsSync(join(src, from))) continue;
  if (statSync(join(src, from)).isDirectory()) copy(join(src, from), to);
  else { mkdirSync(dirname(to), { recursive: true }); copyFileSync(join(src, from), to); }
  next.tools[to] = hash(to);
}
writeFileSync(LOCK, JSON.stringify(next, null, 1) + '\n');
console.log(`creative-methods: synced ${skills.length} skills and ${Object.keys(next.tools).length} tools from ${commit}. ` +
  'Next: node scripts/skill-combos.mjs (settle new clashes, then --lock).');
