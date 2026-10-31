# Tactile buttons (the Key style)

Elias, 2026-10-19: buttons are **minimal, clicky and tactile**, "like a good
keyboard key". Quiet at rest; the press is where the quality shows.

## Anatomy

| Part | Rule |
|---|---|
| Face | One solid fill. No gradient, no gloss, no inner glow |
| Lower edge | A hard, zero-blur edge under the face in a darker step of the key's own colour. Start at 3 px; tune on a real device |
| Label | Says what happens ("Check", "Save"). No arrow, no emoji |
| Radius | One radius per key family, chosen by the product |
| Calm keys | Secondary keys skip the edge and squeeze (scale 0.97) instead |

## The press

1. Pointer-down: the face drops onto its edge (edge height to 0-1 px) in 40-60 ms,
   the key sound plays, and a haptic fires on phones.
2. Release: spring back in 160-220 ms.
3. Nothing else on the screen moves.

## Rules

- One clear primary key per screen. Secondary actions are quieter, not smaller.
- Touch targets at least 44 x 44 pt; visible focus ring for keyboards.
- Disabled keys lose the edge and contrast, but their label stays readable.
- Text on the face passes WCAG AA (4.5:1).
- Sound and visual press on pointer-down, not on click.
- A pair (e.g. a confirm and a skip) is the reference test: if the pair feels
  right, the family is right.

## Check

Capture frames at 0, 16, 50 and 100 ms after pointer-down. At 50 ms the key must
already be down. Test with sound off and with reduced motion on.
