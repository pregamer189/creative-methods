# Paper search

How to find research evidence cheaply and honestly. Tool: `tools/papers-mcp/`
(a small MCP server and command line, no dependencies, free sources).

## Steps

1. **Quote the key term.** `"choice overload" meta-analysis` finds far better
   hits than the same words unquoted (measured in `tools/papers-mcp/BENCH.md`).
2. **Reviews first.** Read results flagged REVIEW (meta-analyses, systematic
   reviews) before single studies. Then the MOST CITED classics.
3. **Read the abstract, not just the title** (`details <doi>`), before citing.
4. **Cite with the DOI.** Never cite from memory; every claim in a brief points at
   a DOI or URL that was opened.
5. **Mark strength:** a review, several studies, one study, or none found. "No
   review found" is a finding.
6. **Paywalled and important?** Use the owner's library access on their own
   machine (they sign in themselves; PDFs are never committed). Recipe:
   `tools/papers-mcp/ONESEARCH.md`.
7. **Cache** the results in the project (the server's `PAPERS_CACHE_DIR`) so the
   same search isn't paid for twice.

## Sources and keys

| Source | Key | Notes |
|---|---|---|
| ERIC, Europe PMC, Crossref | none | Work keyless, also from cloud machines |
| OpenAlex | `OPENALEX_API_KEY` (free) | Refuses keyless calls from cloud machines |
| Semantic Scholar | `S2_API_KEY` (free) | Same |
| arXiv | none | Times out from some cloud machines; works on a laptop |
| Unpaywall (free PDFs) | `UNPAYWALL_EMAIL` | A project address, never a person's private email |

Keys go in environment secrets, never in files. Requests carry a generic
User-Agent, never a person's email.

## Effort

Research and planning run at high effort; the test (2026-10-31) cost about 5%
more tokens and gave a sourced, usable answer. Low effort only for lookups.
Big paid search tools return about ten times the text: use them only for hard
questions the free search can't answer.
