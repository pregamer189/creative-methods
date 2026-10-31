# The idea rail: scoring ideas on their merits

Elias's ask (2026-10-31): judge ideas objectively, not by whether he said them or
whether they sound good to the agent. Paste-ready version:
`skills/idea-scorecard/SKILL.md`.

## Why it is built this way

| Risk | Guard |
|---|---|
| The owner's ideas get a free pass | Score from a blind copy: author, weight and repeat count removed |
| The agent agrees with whoever spoke last | Two scorers who can't see each other's numbers, never the one who wrote the idea up |
| Same-model scorers share blind spots (I14) | Every line of 3 or more needs an outside source; big disagreements are flagged, not averaged away |
| Good unusual ideas get flattened | The rail never drops an idea; it says what would make it stronger and keeps the unusual part |
| Opinion leaks into the number | The owner's view is its own meter, shown next to the score |

## The two meters

**Outside meter** (each line 0-4, with a source): Evidence (research), User pull
(what users ask for or praise), Market and trend, Fit (with the product's rules),
Cost (reversed), Risk (reversed). Sum 0-24, plus a confidence: high (most lines
cite a source), medium, low (mostly judgement).

**Owner meter:** the weight the owner gave (1-5) and how often they came back to
it. Never folded into the outside score.

## When to run it

On a batch the owner names, or when they say capture is done. Never as a reason to
drop an idea mid-capture. Video ideas use the same rail; a product may add a
"shootable" or "buildable this week" line in its own repo.

## Output line

```
I12 · outside 15/24 (medium) · owner 4/5, said 3 times · kind: marketing
  Stronger if: tie it to one trust step per video instead of a style rule.
```
