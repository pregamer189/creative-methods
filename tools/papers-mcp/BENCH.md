# Paper search benchmark

Run 2026-11-08 from the cloud box, keyless (OpenAlex and Semantic Scholar off):
`node tools/papers-mcp/bench.mjs`. Ten fixed questions from behaviour, design and
film research; eight results each. "On topic" = a result's title has the topic's
key words. "Landmark" = a known key paper (DOI checked in Crossref) is in the top 20.

| # | Question | Papers | DOI resolves | Free text | Reviews | On topic | Landmark in top 20 | Sources not used | Seconds |
|---|---|---|---|---|---|---|---|---|---|
| 1 | peak-end rule remembered experience | 8 | 7/7 | 1 | 2 | yes | no | openalex; s2 | 2.2 |
| 2 | prospect theory loss aversion decision under risk | 8 | 7/7 | 2 | 1 | yes | yes | openalex; s2 | 2.1 |
| 3 | habit formation automaticity real world | 8 | 7/7 | 1 | 1 | yes | yes | openalex; s2 | 2.2 |
| 4 | choice overload number of options meta-analysis | 8 | 6/6 | 1 | 4 | yes | yes | openalex; s2 | 2.1 |
| 5 | aesthetic usability effect perceived usability | 8 | 7/7 | 3 | 2 | yes | no | openalex; s2 | 2.2 |
| 6 | reward prediction error dopamine | 8 | 7/7 | 0 | 2 | yes | no | openalex; s2 | 2.3 |
| 7 | edit blindness film cuts attention | 8 | 6/6 | 2 | 2 | yes | yes | openalex; s2 | 2.4 |
| 8 | self-determination theory intrinsic motivation | 8 | 8/8 | 0 | 2 | yes | no | openalex | 3.1 |
| 9 | baby schema cuteness perception | 8 | 7/7 | 1 | 2 | yes | yes | openalex; s2 | 2.9 |
| 10 | visual complexity prototypicality website first impression | 8 | 8/8 | 2 | 2 | yes | yes | openalex; s2 | 2.5 |
| | **Total** | 80 | 70/70 | 13 | 20 | 10/10 | 6/10 | | |

The question set was replaced on 2026-11-08 so this public file names no product's
subject; earlier runs on the old set are in git history.

## What changed because of it

| Version | DOIs that resolve | Reviews and meta-analyses in the top 8 | On topic |
|---|---|---|---|
| First build (relevance only, old set) | 66/66 | 8 | 10/10 |
| + reviews pass and most-cited pass (old set) | 72/72 | 20 | 10/10 |
| Same tool, new set (2026-11-08) | 70/70 | 20 | 10/10 |

- Plain relevance ranking buried the strongest evidence, so the tool puts up to
  two reviews or meta-analyses and two most-cited classics first, then the newest
  relevant work.
- Quoting the key term helps a lot: a quoted technical term plus "meta-analysis"
  surfaced several meta-analyses that the unquoted query missed.

## Against SciSpace (the connector)

On a hard question SciSpace found the recent meta-analyses at once (semantic search
is its strength) but returned about 30,000 characters for ten papers. This tool
returns about 2,800 characters for ten. Use SciSpace for a hard question where
wording matters; use this tool for everything else.

## Known gaps

- Old landmark papers whose titles don't share the query's words (here: Redelmeier &
  Kahneman 1996, Tractinsky 2000, Schultz 1997, Ryan & Deci 2000; the list shifts a
  little between runs) are missed without
  OpenAlex or Semantic Scholar, which rank by meaning and citations. Fix: add the
  two free keys (`OPENALEX_API_KEY`, `S2_API_KEY`) to the environment's secrets,
  then rerun this benchmark.
- arXiv times out from the cloud box; works on a laptop.
