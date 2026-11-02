#!/usr/bin/env node
// Fixed 10-question benchmark for the papers tool (method plan, workstream 1).
// For each question: how many papers, how many with a DOI that really resolves,
// a free full text, a review flagged, whether a paper we know should be there
// shows up (title word match), and which sources answered.
//
//   node tools/papers-mcp/bench.mjs [--sources eric,europepmc,crossref]
//
// No cache, so it measures the live sources. Writes nothing; paste the table into BENCH.md.

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
// [question, title words a relevant paper has, landmark DOI (checked in Crossref 2026-10-31) or null]
const Q = [
  ['spaced repetition distributed practice vocabulary retention', /distributed practice|spacing|spaced/i, '10.1037/0033-2909.132.3.354'],
  ['retrieval practice testing effect long-term retention', /test-enhanced|testing effect|retrieval practice/i, '10.1111/j.1467-9280.2006.01693.x'],
  ['spaced repetition scheduling algorithm memory model', /schedul/i, '10.1145/3534678.3539081'],
  ['Japanese pitch accent perception training second language learners', /pitch accent/i],
  ['high variability phonetic training non-native speech perception', /high.variability/i, '10.1121/1.1894649'],
  ['incidental vocabulary learning from reading second language', /incidental/i],
  ['unsuccessful retrieval attempts pretesting enhance learning', /pretest|unsuccessful retrieval|errorful/i, '10.1037/a0015729'],
  ['habit formation mobile learning app streaks engagement', /habit/i],
  ['glossing second language reading vocabulary', /gloss/i],
  ['corrective feedback second language acquisition meta-analysis', /corrective feedback/i],
];

const flag = process.argv.indexOf('--sources');
const sources = flag > 0 ? ['--sources', process.argv[flag + 1]] : [];

async function resolves(doi) {
  try {
    const r = await fetch(`https://doi.org/api/handles/${encodeURIComponent(doi)}`, {
      headers: { 'User-Agent': 'LanguageApp-research/0.1 (no contact)' }, signal: AbortSignal.timeout(8000),
    });
    return r.ok && (await r.json()).responseCode === 1;
  } catch { return false; }
}

console.log('| # | Question | Papers | DOI resolves | Free text | Reviews | On topic | Landmark in top 20 | Sources not used | Seconds |');
console.log('|---|---|---|---|---|---|---|---|---|---|');
const tot = { n: 0, doi: 0, ok: 0, free: 0, rev: 0, hit: 0, lm: 0, lmn: 0 };
for (const [i, [q, want, landmark]] of Q.entries()) {
  const t0 = Date.now();
  const out = execFileSync('node', [join(here, 'server.mjs'), 'search', q, '--limit', '8', ...sources],
    { encoding: 'utf8', env: { ...process.env, PAPERS_CACHE_DIR: '' } });
  const secs = ((Date.now() - t0) / 1000).toFixed(1);
  const titles = [...out.matchAll(/^\[\d+\] (.*)$/gm)].map((m) => m[1]);
  const dois = [...out.matchAll(/doi:(\S+)/g)].map((m) => m[1]);
  const ok = (await Promise.all(dois.map(resolves))).filter(Boolean).length;
  const free = (out.match(/free: /g) || []).length;
  const rev = titles.filter((t) => /REVIEW/.test(t)).length;
  const hit = titles.some((t) => want.test(t));
  let lm = '-';
  if (landmark) {
    const wide = execFileSync('node', [join(here, 'server.mjs'), 'search', q, '--limit', '20', ...sources],
      { encoding: 'utf8', env: { ...process.env, PAPERS_CACHE_DIR: '' } });
    const found = wide.toLowerCase().includes('doi:' + landmark.toLowerCase());
    lm = found ? 'yes' : 'no'; tot.lmn++; tot.lm += +found;
  }
  const skipped = (out.match(/Sources not used: (.*)/) || [, ''])[1].replace(/: [^;]*/g, '');
  Object.entries({ n: titles.length, doi: dois.length, ok, free, rev, hit: +hit }).forEach(([k, v]) => (tot[k] += v));
  console.log(`| ${i + 1} | ${q} | ${titles.length} | ${ok}/${dois.length} | ${free} | ${rev} | ${hit ? 'yes' : 'no'} | ${lm} | ${skipped || '-'} | ${secs} |`);
}
console.log(`| | **Total** | ${tot.n} | ${tot.ok}/${tot.doi} | ${tot.free} | ${tot.rev} | ${tot.hit}/10 | ${tot.lm}/${tot.lmn} | | |`);
