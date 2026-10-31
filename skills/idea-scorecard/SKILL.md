---
name: idea-scorecard
description: Use when weighing ideas (product, feature, design, marketing, video, process) on their own merits. Scores each idea blind against outside evidence, keeps the owner's opinion as a separate meter, and says what would make a weak idea stronger.
---

# Idea scorecard

Judge ideas objectively: not by who said them, and not by whether they sound good
to the agent. The product's own rules come from the repo's `CLAUDE.md` or the
person's stated goals.

## When

On a batch the owner names, or when they say idea capture is done. Never as a
reason to drop an idea mid-capture.

## Steps

1. **Blind copy.** For each idea, write a neutral one-paragraph version: what it is
   and who it is for. Strip the author, the weight, how often it was said, and
   loaded words ("amazing", "obviously"). Keep the unusual part whole: that part
   is often the value.
2. **Kind.** Tag it: setup option, feature, product change, design, marketing,
   video, or process.
3. **Score blind, twice.** Two separate scorers (a fresh subagent each, or two
   passes that can't see each other's numbers), never the agent that wrote the
   idea up. Each fills the table below from evidence, citing where it came from.
4. **Average** the two. Where they differ by 2 or more on a line, mark it
   "unsure" and say what evidence would settle it.
5. **Owner meter**, kept apart: the weight the owner gave (1-5) and how often they
   came back to it. Never folded into the outside score.
6. **Write one line per idea** (format below).

## The outside meter (each line 0-4, with a source)

| Line | 4 means | Where to look |
|---|---|---|
| Evidence | strong research says it works (a review or several studies) | paper search (reviews first), research notes |
| User pull | users ask for it or praise it in reviews, forums, testimonials | app-store reviews, forums, user notes |
| Market and trend | rising search or social interest; a gap competitors leave | trend data, competitor notes |
| Fit | strengthens the product's core loop and rules | repo `CLAUDE.md`, decisions |
| Cost (reversed) | cheap to try: a sketch or prototype answers it | estimate in build days and tokens |
| Risk (reversed) | no harm to users, trust, privacy or the brand | rules, platform limits, law |

Outside score = sum (0-24), with a confidence: high (most lines cite a source),
medium, or low (mostly judgement).

## Output line

```
I12 · outside 15/24 (medium) · owner 4/5, said 3 times · kind: marketing
  Stronger if: tie it to one trust step per video instead of a style rule.
```

## Good and bad

- Good: "Evidence 1: one small study (doi:10.x), no review found." A low score with
  a source.
- Bad: "Evidence 3: this is a well-known effective technique." No source; the
  scorer's own belief.
- Good: a low-scoring idea gets "Stronger if: run it as an optional setting" and
  keeps its unusual part.
- Bad: "Drop it, it doesn't fit." The rail never drops; it reshapes.
- Bad: the scorer saw the weight or the author's name. Start again blind.

## Done when

Every idea in the batch has both meters, a kind, a confidence and a "stronger if"
line, and every outside line scored 3 or more cites a source.
