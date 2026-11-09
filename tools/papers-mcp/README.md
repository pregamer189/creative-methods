# papers: free research-paper search (MCP + CLI)

Built 2026-10-31 for Elias's ask: a free paper search with more access than
Consensus, cheap on tokens. One file, no dependencies, so every line can be read.

| Source | Key? | Good for |
|---|---|---|
| ERIC | none | education research, free PDFs |
| Europe PMC | none | PubMed, PMC, preprints; abstracts and open-access flags |
| Crossref | none | every DOI; the widest net |
| OpenAlex | `OPENALEX_API_KEY` (free) | citations, open-access links, all fields |
| Semantic Scholar | `S2_API_KEY` (free; keyless is often rate limited) | short summaries, citations |
| arXiv | none | preprints; times out from the cloud, works on a laptop (`--sources arxiv`) |

Keys go in the environment's secrets, never in a file. `UNPAYWALL_EMAIL`, if set
to a project address (never Elias's own), adds free PDF links to `paper_details`.

**Tools:** `search_papers` (query, limit, sources, year_from) gives a short
merged list: up to two reviews or meta-analyses and two MOST CITED classics
first, then the newest relevant work, each with the sources that found it.
Quote the key term for a sharper list. `paper_details` (doi) gives the abstract and the
best free full-text link. Paywalled and needed anyway: ask for OneSearch on the Mac.

**Quality:** `BENCH.md` (10 fixed questions; rerun with `node tools/papers-mcp/bench.mjs`).
**Paywalled papers:** `ONESEARCH.md` (Elias's school library, on his Mac).

**Use:** the repo's `.mcp.json` loads it in any Claude Code session here.
Results are cached in the folder set by `PAPERS_CACHE_DIR` (for example `research/cache/papers/`) so the same search never costs twice.

```
node tools/papers-mcp/server.mjs search "habit formation automaticity" --limit 8 --from 2015
node tools/papers-mcp/server.mjs details 10.1891/1945-8959.18.2.160
```
