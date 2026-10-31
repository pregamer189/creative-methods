# No gradients

Elias, 2026-10-19 and 2026-10-26: "we dont like gradiant, they look AI". Applies
to every product and every film.

## The rule

- No linear, radial or conic gradients: buttons, marks, text, surfaces, page
  washes, chart areas, masks under sticky bars.
- No gradient text, no glow halos, no gradient or glow filler in film frames.
- A gradient headline word becomes one plain accent colour (and ask whether the
  accent word is needed at all: it is an AI tell, see `ai-tells.md`).
- Photos, illustrations and rendered images are pictures, not UI fills. Their own
  shading is fine.
- Per product: decide whether device-mockup shading counts.

## Where depth comes from instead

| Need | Do this |
|---|---|
| Layers | Tone steps: board, paper, surface, sunk. Lighter reads as closer; in dark mode each layer is a few OKLCH lightness points above the one below |
| A raised block | One edge (a 1 px line in a darker step) or one shadow. Never both |
| A floating layer (tab bar, sheet) | One soft shadow, tinted with the ink hue, not neutral grey |
| A tactile key | A hard, zero-blur lower edge in a darker step of the key's own colour (see `tactile-buttons.md`) |
| Paper or cut-out look | Flat stock, a cut edge, a thin hard shadow under each layer |
| Content scrolling under a bar | A hard edge or a tone step on the bar, not a fade mask |
| A chart area | A flat tint of the line colour |
| Emphasis | Weight, size or one accent colour, never a colour ramp |

## Checks

- Search the code: `grep -rnE "gradient\(" src/ styles/` returns nothing (allow
  only pictures).
- Text on a coloured fill passes WCAG AA (4.5:1); use the darker accent step if
  the lighter fails.
- Never pure #000 or #FFF for UI neutrals.
