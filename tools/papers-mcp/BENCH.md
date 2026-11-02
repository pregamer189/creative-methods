# Paper search benchmark

Run 2026-10-31 from the cloud box, keyless (OpenAlex and Semantic Scholar off):
`node tools/papers-mcp/bench.mjs`. Ten fixed questions from the app's research
areas; eight results each. "On topic" = a result's title has the topic's key
words. "Landmark" = a known key paper (DOI checked in Crossref) is in the top 20.

| # | Question | Papers | DOI resolves | Free text | Reviews | On topic | Landmark in top 20 | Sources not used | Seconds |
|---|---|---|---|---|---|---|---|---|---|
| 1 | spaced repetition distributed practice vocabulary retention | 8 | 6/6 | 4 | 2 | yes | no | openalex; s2 | 2.1 |
| 2 | retrieval practice testing effect long-term retention | 8 | 8/8 | 2 | 0 | yes | no | openalex; s2 | 2.1 |
| 3 | spaced repetition scheduling algorithm memory model | 8 | 8/8 | 1 | 2 | yes | yes | openalex; s2 | 2.3 |
| 4 | Japanese pitch accent perception training second language learners | 8 | 7/7 | 2 | 3 | yes | - | openalex; s2 | 2.0 |
| 5 | high variability phonetic training non-native speech perception | 8 | 7/7 | 1 | 3 | yes | no | openalex; s2 | 2.2 |
| 6 | incidental vocabulary learning from reading second language | 8 | 6/6 | 4 | 2 | yes | - | crossref; openalex; s2 | 2.3 |
| 7 | unsuccessful retrieval attempts pretesting enhance learning | 8 | 8/8 | 3 | 1 | yes | yes | openalex; s2 | 2.3 |
| 8 | habit formation mobile learning app streaks engagement | 8 | 7/7 | 4 | 0 | yes | - | openalex; s2 | 2.0 |
| 9 | glossing second language reading vocabulary | 8 | 8/8 | 1 | 3 | yes | - | openalex; s2 | 2.4 |
| 10 | corrective feedback second language acquisition meta-analysis | 8 | 7/7 | 2 | 4 | yes | - | openalex; s2 | 2.5 |
| | **Total** | 80 | 72/72 | 24 | 20 | 10/10 | 2/5 | | |

## What changed because of it

| Version | DOIs that resolve | Reviews and meta-analyses in the top 8 | On topic | Landmark in top 20 |
|---|---|---|---|---|
| First build (relevance only) | 66/66 | 8 | 10/10 | 2/5 |
| + reviews pass and most-cited pass (now) | 72/72 | 20 | 10/10 | 2/5 |

- Plain relevance ranking buried the strongest evidence, so the tool now puts up
  to two reviews or meta-analyses and two most-cited classics first, then the
  newest relevant work.
- Quoting the key term helps a lot: `"high variability phonetic training"
  meta-analysis` surfaced four HVPT meta-analyses (2021, 2024, 2025 and one on
  production) that the unquoted query missed.

## Against SciSpace (the connector)

Same HVPT question: SciSpace found both recent HVPT meta-analyses at once
(semantic search is its strength) but returned about 30,000 characters for ten
papers. This tool returns about 2,800 characters for ten. Use SciSpace for a hard
question where wording matters; use this tool for everything else.

## Known gaps

- Old landmark papers whose titles don't share the query's words (Logan 1991
  "Training Japanese listeners to identify English /r/ and /l/", Cepeda 2006,
  Roediger & Karpicke 2006) are missed without OpenAlex or Semantic Scholar, which
  rank by meaning and citations. Fix: add the two free keys
  (`OPENALEX_API_KEY`, `S2_API_KEY`) to the environment's secrets, then rerun this
  benchmark.
- arXiv times out from the cloud box; works on the Mac.
