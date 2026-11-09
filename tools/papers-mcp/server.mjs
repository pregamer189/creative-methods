#!/usr/bin/env node
// Free research-paper search as a tiny MCP server (stdio) and a CLI.
// No dependencies: Node 18+ built-in fetch only, so every line can be read.
//
// Sources (all free):
//   eric       education research (US Dept. of Education), keyless
//   europepmc  PubMed + PMC + preprints, abstracts and open-access flags, keyless
//   crossref   every DOI-registered work (broadest), keyless
//   openalex   needs OPENALEX_API_KEY (free); skipped without it
//   s2         Semantic Scholar; S2_API_KEY (free) recommended, keyless is often rate limited
//   arxiv      keyless, but times out from the cloud container; works on a laptop
//
// Privacy rule: requests carry a generic User-Agent and never the user's email or name.
// Unpaywall (free PDF links) is used only when UNPAYWALL_EMAIL is set to a project address.
//
// CLI:  node server.mjs search "habit formation automaticity" [--limit 8] [--sources eric,crossref] [--from 2015]
//       node server.mjs details 10.1891/1945-8959.18.2.160
// MCP:  node server.mjs            (speaks JSON-RPC over stdin/stdout)

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const UA = 'creative-methods-papers/0.1 (no contact)';
const TIMEOUT_MS = Number(process.env.PAPERS_TIMEOUT_MS || 12000);
const CACHE_DIR = process.env.PAPERS_CACHE_DIR || '';
const ALL_SOURCES = ['eric', 'europepmc', 'crossref', 'openalex', 's2', 'arxiv'];
const DEFAULT_SOURCES = ['eric', 'europepmc', 'crossref', 'openalex', 's2'];

// ---------- helpers ----------

async function get(url, { headers = {}, text = false } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, ...headers }, signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return text ? await res.text() : await res.json();
  } finally {
    clearTimeout(t);
  }
}

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const clean = (s) => String(s ?? '').replace(/<[^>]+>/g, '')
  .replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) => e[0] === '#'
    ? String.fromCodePoint(parseInt(e.slice(1).replace(/^x/i, '0x'))) : ENT[e.toLowerCase()] ?? m)
  .replace(/\s+/g, ' ').trim();
const cut = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);
const normDoi = (d) => clean(d).toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, '') || '';
const titleKey = (p) => clean(p.title).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 80);
const key = (p) => p.doi || titleKey(p);
const isReview = (t) => /meta-?analy|systematic review|scoping review|\breview of\b/i.test(t);

function paper(p) {
  return {
    title: cut(clean(p.title), 200),
    year: p.year ? Number(p.year) || null : null,
    authors: (p.authors || []).map(clean).filter(Boolean).slice(0, 3),
    more: (p.authors || []).filter(Boolean).length > 3,
    venue: cut(clean(p.venue), 80),
    cites: p.cites == null || p.cites === '' ? null : Number(p.cites),
    doi: normDoi(p.doi),
    free: p.free || '',
    peer: p.peer ?? null,
    abstract: clean(p.abstract),
    src: p.src,
  };
}

function cacheRead(kind, arg) {
  if (!CACHE_DIR) return null;
  const f = join(CACHE_DIR, `${kind}-${createHash('sha1').update(JSON.stringify(arg)).digest('hex').slice(0, 16)}.json`);
  return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null;
}
function cacheWrite(kind, arg, data) {
  if (!CACHE_DIR) return;
  mkdirSync(CACHE_DIR, { recursive: true });
  const f = join(CACHE_DIR, `${kind}-${createHash('sha1').update(JSON.stringify(arg)).digest('hex').slice(0, 16)}.json`);
  writeFileSync(f, JSON.stringify({ arg, at: new Date().toISOString(), data }, null, 1));
}

// ---------- sources: search ----------

const search = {
  async eric(q, n, from) {
    const s = from ? `${q} publicationdateyear:[${from} TO 3000]` : q;
    const u = `https://api.ies.ed.gov/eric/?format=json&rows=${n}&search=${encodeURIComponent(s)}` +
      '&fields=id,title,author,publicationdateyear,description,url,e_fulltextauth,peerreviewed,source';
    const d = await get(u);
    return (d.response?.docs || []).map((r) => paper({
      title: r.title, year: r.publicationdateyear, authors: r.author, venue: r.source,
      doi: /doi\.org\//.test(r.url || '') ? r.url : '', abstract: r.description,
      free: r.e_fulltextauth ? `https://files.eric.ed.gov/fulltext/${r.id}.pdf` : '',
      peer: r.peerreviewed === 'T', src: 'eric',
    }));
  },
  async europepmc(q, n, from) {
    const s = from ? `(${q}) AND PUB_YEAR:[${from} TO 3000]` : q;
    const d = await get(`https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&resultType=core&pageSize=${n}&query=${encodeURIComponent(s)}`);
    return (d.resultList?.result || []).map((r) => paper({
      title: r.title, year: r.pubYear, authors: (r.authorString || '').split(', '),
      venue: r.journalInfo?.journal?.title || r.bookOrReportDetails?.publisher || r.source,
      cites: r.citedByCount, doi: r.doi, abstract: r.abstractText,
      free: r.isOpenAccess === 'Y' && r.pmcid ? `https://europepmc.org/article/PMC/${r.pmcid}` : '',
      peer: r.source === 'PPR' ? false : null, src: 'europepmc',
    }));
  },
  async crossref(q, n, from) {
    const f = from ? `&filter=from-pub-date:${from}` : '';
    const d = await get(`https://api.crossref.org/works?rows=${n}${f}&query=${encodeURIComponent(q)}` +
      '&select=DOI,title,issued,is-referenced-by-count,container-title,author,abstract,type');
    return (d.message?.items || []).filter((r) => r.type !== 'component').map((r) => paper({
      title: (r.title || [])[0], year: r.issued?.['date-parts']?.[0]?.[0],
      authors: (r.author || []).map((a) => a.family || a.name), venue: (r['container-title'] || [])[0],
      cites: r['is-referenced-by-count'], doi: r.DOI, abstract: r.abstract, src: 'crossref',
    }));
  },
  // Not a user-facing source: the most-cited of Crossref's 40 most relevant hits,
  // so classics (a 2006 meta-analysis with 1,400 citations) aren't buried under recent papers.
  async classics(q, n, from) {
    const f = from ? `&filter=from-pub-date:${from}` : '';
    const d = await get(`https://api.crossref.org/works?rows=40${f}&query=${encodeURIComponent(q)}` +
      '&select=DOI,title,issued,is-referenced-by-count,container-title,author,type');
    return (d.message?.items || []).filter((r) => r.type !== 'component' && r['is-referenced-by-count'] >= 50)
      .sort((a, b) => b['is-referenced-by-count'] - a['is-referenced-by-count']).slice(0, 2)
      .map((r) => ({ ...paper({
        title: (r.title || [])[0], year: r.issued?.['date-parts']?.[0]?.[0],
        authors: (r.author || []).map((a) => a.family || a.name), venue: (r['container-title'] || [])[0],
        cites: r['is-referenced-by-count'], doi: r.DOI, src: 'crossref',
      }), classic: true }));
  },
  // Not a user-facing source: reviews and meta-analyses on the topic, the strongest evidence,
  // which plain relevance ranking often leaves out of the top ten.
  async reviews(q, n, from) {
    const f = from ? `&filter=from-pub-date:${from}` : '';
    const d = await get(`https://api.crossref.org/works?rows=25${f}&query=${encodeURIComponent(q + ' meta-analysis systematic review')}` +
      '&select=DOI,title,issued,is-referenced-by-count,container-title,author,type');
    return (d.message?.items || []).filter((r) => r.type !== 'component' && isReview((r.title || [])[0] || ''))
      .slice(0, 2).map((r) => paper({
        title: (r.title || [])[0], year: r.issued?.['date-parts']?.[0]?.[0],
        authors: (r.author || []).map((a) => a.family || a.name), venue: (r['container-title'] || [])[0],
        cites: r['is-referenced-by-count'], doi: r.DOI, src: 'crossref',
      }));
  },
  async openalex(q, n, from) {
    const k = process.env.OPENALEX_API_KEY;
    if (!k) throw new Error('skipped: set OPENALEX_API_KEY (free)');
    const f = from ? `&filter=from_publication_date:${from}-01-01` : '';
    const d = await get(`https://api.openalex.org/works?per-page=${n}${f}&api_key=${encodeURIComponent(k)}&search=${encodeURIComponent(q)}` +
      '&select=title,publication_year,authorships,primary_location,cited_by_count,doi,open_access,abstract_inverted_index');
    return (d.results || []).map((r) => paper({
      title: r.title, year: r.publication_year, authors: (r.authorships || []).map((a) => a.author?.display_name),
      venue: r.primary_location?.source?.display_name, cites: r.cited_by_count, doi: r.doi,
      free: r.open_access?.oa_url || '', abstract: invert(r.abstract_inverted_index), src: 'openalex',
    }));
  },
  async s2(q, n, from) {
    const k = process.env.S2_API_KEY;
    const y = from ? `&year=${from}-` : '';
    const u = `https://api.semanticscholar.org/graph/v1/paper/search?limit=${n}${y}&query=${encodeURIComponent(q)}` +
      '&fields=title,year,authors,venue,citationCount,externalIds,openAccessPdf,abstract,tldr';
    const opts = { headers: k ? { 'x-api-key': k } : {} };
    // The keyless pool is shared and often busy: one retry after a short wait.
    const d = await get(u, opts).catch(async (e) => {
      if (!/429/.test(e.message)) throw e;
      await new Promise((r) => setTimeout(r, 1500));
      return get(u, opts);
    });
    return (d.data || []).map((r) => paper({
      title: r.title, year: r.year, authors: (r.authors || []).map((a) => a.name), venue: r.venue,
      cites: r.citationCount, doi: r.externalIds?.DOI, free: r.openAccessPdf?.url || '',
      abstract: r.tldr?.text || r.abstract, src: 's2',
    }));
  },
  async arxiv(q, n) {
    const x = await get(`https://export.arxiv.org/api/query?max_results=${n}&search_query=all:${encodeURIComponent(q)}`, { text: true });
    return [...x.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => {
      const tag = (t) => (e.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`)) || [])[1] || '';
      const id = tag('id');
      return paper({
        title: tag('title'), year: tag('published').slice(0, 4),
        authors: [...e.matchAll(/<name>([\s\S]*?)<\/name>/g)].map((m) => m[1]),
        venue: 'arXiv preprint', doi: (e.match(/<arxiv:doi[^>]*>([^<]+)</) || [])[1] || '',
        abstract: tag('summary'), free: id.replace('/abs/', '/pdf/'), peer: false, src: 'arxiv',
      });
    });
  },
};

function invert(idx) {
  if (!idx) return '';
  const words = [];
  for (const [w, pos] of Object.entries(idx)) for (const p of pos) words[p] = w;
  return words.join(' ');
}

// ---------- search_papers ----------

async function searchPapers({ query, limit = 8, sources = DEFAULT_SOURCES, year_from } = {}) {
  if (!query || !String(query).trim()) throw new Error('query is required');
  limit = Math.max(1, Math.min(20, Number(limit) || 8));
  sources = sources.filter((s) => ALL_SOURCES.includes(s));
  const arg = { query, limit, sources, year_from };
  const hit = cacheRead('search', arg);
  if (hit) return hit.data;

  const per = Math.min(limit, 10);
  const settled = await Promise.allSettled(sources.map((s) => search[s](query, per, year_from)));
  const [classics, reviews] = sources.includes('crossref')
    ? await Promise.all([search.classics(query, 3, year_from).catch(() => []),
      search.reviews(query, 3, year_from).catch(() => [])])
    : [[], []];
  const notes = [];
  const lists = settled.map((r, i) => {
    if (r.status === 'fulfilled') return r.value;
    notes.push(`${sources[i]}: ${r.reason?.name === 'AbortError' ? 'timed out' : r.reason?.message}`);
    return [];
  });

  // Round-robin merge keeps each source's own relevance order; duplicates are merged.
  const seen = new Map();
  const byTitle = new Map();
  for (const p of [...reviews, ...classics]) {
    if (seen.has(key(p)) || byTitle.has(titleKey(p))) continue;
    const e = { ...p, srcs: [p.src] }; seen.set(key(p), e); byTitle.set(titleKey(p), e);
  }
  for (let i = 0; i < per; i++) {
    for (const list of lists) {
      const p = list[i];
      if (!p || !p.title) continue;
      const k = key(p);
      const tk = titleKey(p);
      const old = seen.get(k) || byTitle.get(tk);
      if (!old) { const e = { ...p, srcs: [p.src] }; seen.set(k, e); byTitle.set(tk, e); continue; }
      if (old.srcs.includes(p.src)) continue;
      old.srcs.push(p.src);
      old.cites = Math.max(old.cites ?? 0, p.cites ?? 0) || old.cites;
      old.free ||= p.free;
      old.doi ||= p.doi;
      if (p.peer != null && old.peer == null) old.peer = p.peer;
      if (p.abstract.length > old.abstract.length) old.abstract = p.abstract;
    }
  }
  const out = { papers: [...seen.values()].slice(0, limit), notes };
  cacheWrite('search', arg, out);
  return out;
}

function formatSearch({ papers, notes }, query) {
  const lines = [`${papers.length} papers for "${query}" (reviews and MOST CITED classics first, then the newest relevant work; found in more sources = stronger match):`];
  papers.forEach((p, i) => {
    const bits = [
      p.year || 'n.d.',
      p.cites != null ? `${p.cites} cites` : null,
      isReview(p.title) ? 'REVIEW' : null,
      p.classic ? 'MOST CITED' : null,
      p.peer === true ? 'peer-reviewed' : p.peer === false ? 'not peer-reviewed' : null,
      p.srcs.join('+'),
    ].filter(Boolean).join(' · ');
    lines.push(`[${i + 1}] ${p.title} (${bits})`);
    const ids = [p.authors.length ? p.authors.join(', ') + (p.more ? ' et al.' : '') : '', p.venue,
      p.doi ? `doi:${p.doi}` : '', p.free ? `free: ${p.free}` : ''].filter(Boolean);
    if (ids.length) lines.push('    ' + ids.join(' | '));
  });
  if (notes.length) lines.push(`Sources not used: ${notes.join('; ')}`);
  lines.push('Use paper_details with a DOI for the abstract.');
  return lines.join('\n');
}

// ---------- paper_details ----------

async function paperDetails({ doi } = {}) {
  doi = normDoi(doi);
  if (!doi) throw new Error('doi is required');
  const hit = cacheRead('details', doi);
  if (hit) return hit.data;

  const tries = await Promise.allSettled([
    search.europepmc(`DOI:"${doi}"`, 1),
    get(`https://api.crossref.org/works/${encodeURIComponent(doi)}`).then((d) => {
      const r = d.message;
      return [paper({ title: (r.title || [])[0], year: r.issued?.['date-parts']?.[0]?.[0],
        authors: (r.author || []).map((a) => a.family || a.name), venue: (r['container-title'] || [])[0],
        cites: r['is-referenced-by-count'], doi: r.DOI, abstract: r.abstract, src: 'crossref' })];
    }),
    process.env.S2_API_KEY
      ? get(`https://api.semanticscholar.org/graph/v1/paper/DOI:${encodeURIComponent(doi)}?fields=title,year,authors,venue,citationCount,openAccessPdf,abstract,tldr`,
        { headers: { 'x-api-key': process.env.S2_API_KEY } }).then((r) => [paper({ title: r.title, year: r.year,
        authors: (r.authors || []).map((a) => a.name), venue: r.venue, cites: r.citationCount, doi,
        free: r.openAccessPdf?.url, abstract: r.abstract, src: 's2' })])
      : Promise.resolve([]),
    process.env.UNPAYWALL_EMAIL
      ? get(`https://api.unpaywall.org/v2/${encodeURIComponent(doi)}?email=${encodeURIComponent(process.env.UNPAYWALL_EMAIL)}`)
        .then((r) => [{ free: r.best_oa_location?.url_for_pdf || r.best_oa_location?.url || '' }])
      : Promise.resolve([]),
  ]);
  const found = tries.flatMap((t) => (t.status === 'fulfilled' ? t.value : []))
    .filter((p) => !p.doi || p.doi === doi);
  if (!found.length) throw new Error(`nothing found for doi:${doi}`);
  const best = found.reduce((a, p) => ({
    ...a,
    title: a.title || p.title, year: a.year || p.year, venue: a.venue || p.venue,
    authors: a.authors?.length ? a.authors : p.authors, cites: Math.max(a.cites ?? 0, p.cites ?? 0) || a.cites || p.cites,
    abstract: (p.abstract || '').length > (a.abstract || '').length ? p.abstract : a.abstract,
    free: a.free || p.free,
  }), {});
  best.doi = doi;
  cacheWrite('details', doi, best);
  return best;
}

function formatDetails(p) {
  return [
    `${p.title} (${p.year || 'n.d.'}${p.cites != null ? `, ${p.cites} cites` : ''}${isReview(p.title || '') ? ', REVIEW' : ''})`,
    [p.authors?.join(', '), p.venue, `doi:${p.doi}`].filter(Boolean).join(' | '),
    p.free ? `Free full text: ${p.free}` : 'No free full text found (OneSearch on the Mac can try).',
    `Abstract: ${p.abstract ? cut(p.abstract, 900) : 'none available'}`,
  ].join('\n');
}

// ---------- MCP over stdio ----------

const TOOLS = [
  {
    name: 'search_papers',
    description: 'Search free scholarly sources (ERIC, Europe PMC, Crossref, plus OpenAlex/Semantic Scholar when keyed) and get a short merged list: title, year, citations, review flag, DOI, free full-text link. Cheap on tokens; use paper_details for an abstract. Tip: put the key term in quotes (\"high variability phonetic training\") for a sharper list.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Plain-language search, e.g. "choice overload meta-analysis"' },
        limit: { type: 'integer', minimum: 1, maximum: 20, default: 8 },
        sources: { type: 'array', items: { type: 'string', enum: ALL_SOURCES }, description: `Default: ${DEFAULT_SOURCES.join(', ')}` },
        year_from: { type: 'integer', description: 'Only works published in or after this year' },
      },
      required: ['query'],
    },
  },
  {
    name: 'paper_details',
    description: 'Abstract, authors, venue, citation count and the best free full-text link for one paper by DOI.',
    inputSchema: { type: 'object', properties: { doi: { type: 'string' } }, required: ['doi'] },
  },
];

async function callTool(name, args) {
  if (name === 'search_papers') return formatSearch(await searchPapers(args), args.query);
  if (name === 'paper_details') return formatDetails(await paperDetails(args));
  throw new Error(`unknown tool ${name}`);
}

function serve() {
  const send = (m) => process.stdout.write(JSON.stringify(m) + '\n');
  let buf = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    buf += chunk;
    let nl;
    while ((nl = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (line) handle(line).catch((e) => process.stderr.write(String(e) + '\n'));
    }
  });
  async function handle(line) {
    let msg;
    try { msg = JSON.parse(line); } catch { return send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }); }
    const { id, method, params = {} } = msg;
    if (id === undefined) return; // notification
    const ok = (result) => send({ jsonrpc: '2.0', id, result });
    if (method === 'initialize') {
      return ok({
        protocolVersion: params.protocolVersion || '2025-06-18',
        capabilities: { tools: {} },
        serverInfo: { name: 'papers', version: '0.1.0' },
      });
    }
    if (method === 'ping') return ok({});
    if (method === 'tools/list') return ok({ tools: TOOLS });
    if (method === 'tools/call') {
      try {
        return ok({ content: [{ type: 'text', text: await callTool(params.name, params.arguments || {}) }] });
      } catch (e) {
        return ok({ content: [{ type: 'text', text: `Error: ${e.message}` }], isError: true });
      }
    }
    send({ jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } });
  }
}

// ---------- entry ----------

const [cmd, ...rest] = process.argv.slice(2);
if (!cmd) serve();
else {
  const flag = (f) => { const i = rest.indexOf(f); return i >= 0 ? rest.splice(i, 2)[1] : undefined; };
  const limit = flag('--limit');
  const sources = flag('--sources');
  const from = flag('--from');
  const arg = rest.join(' ');
  const run = cmd === 'search'
    ? searchPapers({ query: arg, limit, sources: sources ? sources.split(',') : undefined, year_from: from })
      .then((r) => formatSearch(r, arg))
    : cmd === 'details' ? paperDetails({ doi: arg }).then(formatDetails)
      : Promise.reject(new Error('usage: search "<query>" | details <doi>'));
  run.then((t) => console.log(t), (e) => { console.error(e.message); process.exit(1); });
}
