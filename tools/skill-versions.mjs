#!/usr/bin/env node
// Checks that every skill in skills/ has a "Version x.y" line and that CHANGELOG.md
// has a row for that skill at that version. Run before every commit that touches
// a skill: node tools/skill-versions.mjs   (--since <git ref> lists skills the product repos must sync)
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

const log = readFileSync('CHANGELOG.md', 'utf8');
let fails = 0;
const skills = readdirSync('skills', { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
for (const name of skills) {
  const f = `skills/${name}/SKILL.md`;
  if (!existsSync(f)) continue;
  const v = readFileSync(f, 'utf8').match(/^Version (\d+\.\d+)/m)?.[1];
  const logged = new RegExp(`^\\|[^|]*\\| ${name} \\| ${v?.replace('.', '\\.')} \\|`, 'm').test(log);
  if (!v) { console.log(`FAIL  ${name}: no "Version x.y" line`); fails++; }
  else if (!logged) { console.log(`FAIL  ${name}: version ${v} has no CHANGELOG.md row`); fails++; }
  else console.log(`ok    ${name} ${v}`);
}
const i = process.argv.indexOf('--since');
if (i > 0) {
  const changed = execSync(`git diff --name-only ${process.argv[i + 1]} -- skills`, { encoding: 'utf8' })
    .split('\n').map((p) => p.match(/^skills\/([^/]+)\/SKILL\.md$/)?.[1]).filter(Boolean);
  console.log(changed.length ? `Sync into draft-concept and Prello: ${changed.join(', ')}` : 'Nothing to sync.');
}
process.exit(fails ? 1 : 0);
