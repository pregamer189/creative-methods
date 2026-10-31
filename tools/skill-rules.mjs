#!/usr/bin/env node
// Pulls every hard rule (must / never / always / don't / avoid / no ...) out of
// our skills, CLAUDE.md and design/QUALITY.md, tags each by topic, and lists
// topics where two sources give rules, so clashes can be checked by eye.
// No dependencies.
//
//   node scripts/skill-rules.mjs                 summary: rules per topic and source
//   node scripts/skill-rules.mjs --topic easing  every rule on one topic, side by side
//   node scripts/skill-rules.mjs --json > out    the whole table
//
// Owners (who wins on each topic) live in .claude/skills/RULE-OWNERS.md.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// The repo's own rule files (they outrank skills). Override per repo with
// .claude/skills/rule-sources.json, either [["label", "path"], ...] or
// { "sources": [["label", "path"], ...], "skillDirs": ["../creative-methods/skills"] }.
// skillDirs adds skill folders beyond .claude/skills (e.g. shared skills loaded as
// account skills). Canonical copy: pregamer189/creative-methods tools/; product repos copy it as-is.
const CFG = '.claude/skills/rule-sources.json';
const raw = existsSync(CFG) ? JSON.parse(readFileSync(CFG, 'utf8')) : null;
const list = Array.isArray(raw) ? raw : raw?.sources;
const SOURCES = (list || [['CLAUDE.md', 'CLAUDE.md'], ['QUALITY', 'design/QUALITY.md']]).filter(([, f]) => existsSync(f));
export const REPO_SOURCES = SOURCES.map(([label]) => label);
export const SKILL_DIRS = ['.claude/skills', ...((!Array.isArray(raw) && raw?.skillDirs) || [])].filter((d) => existsSync(d));
for (const base of SKILL_DIRS) for (const d of readdirSync(base, { withFileTypes: true })) {
  if (!d.isDirectory()) continue;
  const dir = join(base, d.name);
  // The skill file plus its reference files, since vendored skills keep rules there.
  const files = [join(dir, 'SKILL.md')];
  for (const sub of ['reference', 'references']) {
    const r = join(dir, sub);
    if (existsSync(r)) for (const f of readdirSync(r)) if (f.endsWith('.md')) files.push(join(r, f));
  }
  for (const f of files) if (existsSync(f)) SOURCES.push([d.name, f]);
}
if (existsSync('.claude/agents')) {
  for (const f of readdirSync('.claude/agents')) if (f.endsWith('.md')) SOURCES.push(['agent:' + f.replace('.md', ''), join('.claude/agents', f)]);
}

// Topic words. A rule can carry several topics.
const TOPICS = {
  gradient: /gradient/i,
  shadow: /shadow|elevation|depth/i,
  colour: /colou?r|palette|hue|contrast|#[0-9a-f]{3,6}\b|oklch/i,
  dark: /dark mode|night|light mode|prefers-color-scheme/i,
  type: /font|typeface|typograph|letter-?spacing|line-height|serif/i,
  icon: /\bicons?\b|emoji/i,
  easing: /eas(e|ing)|cubic-bezier|spring|bounce|overshoot/i,
  duration: /\d+\s?ms\b|duration|seconds?\b/i,
  motion: /animat|motion|transition|keyframe/i,
  reduced: /reduced[- ]motion|prefers-reduced/i,
  sound: /\bsound|audio|haptic/i,
  layout: /grid|spacing|padding|margin|whitespace|card/i,
  button: /button|\bkey\b|press|tap target|touch target/i,
  copy: /copy|wording|microcopy|tone|em[- ]dash|exclamation/i,
  ai_tells: /\bAI\b|slop|generic|cliché|template/i,
  name: /product name|placeholder|kioku/i,
  language: /japanese|furigana|kanji|romaji|jlpt|per-language/i,
  streak: /streak|vehicle|guilt/i,
  research: /research|source|evidence|cite/i,
  asking: /\belias\b|ask|question/i,
  tokens_cost: /token|agents? at once|parallel|usage limit/i,
};

const RULE = /\b(must|never|always|don'?t|do not|avoid|no |not |only|instead|ban|forbid|required?|should not|prefer)\b/i;

function rules(file) {
  const out = [];
  let inCode = false;
  readFileSync(file, 'utf8').split('\n').forEach((raw, i) => {
    if (/^\s*```/.test(raw)) { inCode = !inCode; return; }
    if (inCode) return;
    const line = raw.replace(/^\s*([-*>|]|\d+\.)\s*/, '').replace(/\*\*/g, '').trim();
    if (line.length < 12 || line.startsWith('#') || /^(name|description):/.test(line)) return;
    if (!RULE.test(line)) return;
    const topics = Object.keys(TOPICS).filter((t) => TOPICS[t].test(line));
    if (topics.length) out.push({ line: i + 1, text: line.slice(0, 220), topics });
  });
  return out;
}

export const table = [];
for (const [src, file] of SOURCES) for (const r of rules(file)) table.push({ src, file, ...r });
export { TOPICS };

const args = process.argv.slice(2);
const isMain = import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('skill-rules.mjs');
if (!isMain) {
  // imported by skill-combos.mjs
} else if (args.includes('--json')) {
  console.log(JSON.stringify(table, null, 1));
} else if (args.includes('--topic')) {
  const t = args[args.indexOf('--topic') + 1];
  const src = args.includes('--src') ? args[args.indexOf('--src') + 1].split(',') : null;
  for (const r of table.filter((r) => r.topics.includes(t) && (!src || src.includes(r.src)))) {
    console.log(`${r.src.padEnd(22)} ${r.file.split('/').pop()}:${r.line}  ${r.text}`);
  }
} else {
  console.log(`${table.length} rules from ${new Set(table.map((r) => r.src)).size} sources\n`);
  for (const t of Object.keys(TOPICS)) {
    const by = {};
    for (const r of table) if (r.topics.includes(t)) by[r.src] = (by[r.src] || 0) + 1;
    const n = Object.keys(by).length;
    if (n < 2) continue;
    console.log(`${t.padEnd(12)} ${n} sources: ${Object.entries(by).sort((a, b) => b[1] - a[1]).map(([s, c]) => `${s}(${c})`).join(' ')}`);
  }
}
