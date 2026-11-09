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
  ['peak-end rule remembered experience', /peak|retrospective|memor/i, '10.1016/0304-3959(96)02994-6'],
  ['prospect theory loss aversion decision under risk', /prospect|loss aversion/i, '10.2307/1914185'],
  ['habit formation automaticity real world', /habit/i, '10.1002/ejsp.674'],
  ['choice overload number of options meta-analysis', /choice overload|too many options|choice/i, '10.1086/651235'],
  ['aesthetic usability effect perceived usability', /usab/i, '10.1016/S0953-5438(00)00031-X'],
  ['reward prediction error dopamine', /reward/i, '10.1126/science.275.5306.1593'],
  ['edit blindness film cuts attention', /edit|cut/i, '10.16910/jemr.2.2.6'],
  ['self-determination theory intrinsic motivation', /self-determination|intrinsic motivation/i, '10.1037/0003-066X.55.1.68'],
  ['baby schema cuteness perception', /baby schema|cute/i, '10.1111/j.1439-0310.2008.01603.x'],
  ['visual complexity prototypicality website first impression', /visual complexity|first impression|prototypical/i, '10.1016/j.ijhcs.2012.06.003'],
];

const flag = process.argv.indexOf('--sources');
const sources = flag > 0 ? ['--sources', process.argv[flag + 1]] : [];

async function resolves(doi) {
  try {
    const r = await fetch(`https://doi.org/api/handles/${encodeURIComponent(doi)}`, {
      headers: { 'User-Agent': 'creative-methods-papers/0.1 (no contact)' }, signal: AbortSignal.timeout(8000),
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
