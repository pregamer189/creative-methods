# Texture and finish

What stops a frame from looking clinical or "coded" (I16), once the design is right.
Mostly from Ben Marriott's breakdown of the best human motion work of 2026 and his
noise tutorials. Named pieces are links in `../../references/watch-list.md`.

## Rules

| # | Rule | Seen in |
|---|---|---|
| 1 | **Texture is a palette chosen from the start, not a filter on top.** A filter over finished work reads as a filter | Mattis Dovier + Chloé Nicquet: dither as "a palette of textures and values, considered from the beginning" |
| 2 | **Contrast hard and soft edges** in one frame | Mathilde Loubes, Burberry: drawn "with soft pastels" |
| 3 | **Analog finishes add warmth without taking over:** grain, a little chromatic aberration, light leaks. When you notice them, they are too much | Tezo Don Lee, RIMOWA |
| 4 | **Real material beats simulated material.** Print it, scan it, draw on it. Real light beats a light effect | Jimograph: risograph frames, Chinese ink, scanned back in. NOMINT: burning steel wool for every frame gives real light on everything nearby |
| 5 | **Hide and simplify.** What you leave out points at what matters. Balance line wobble, brush texture and frame rate as one decision | Giant Ant, OpenTable: looks simple, "every decision delivers on the brief" |
| 6 | **Handmade rather than machine-perfect** | Potto Collective, Kaho Yoshida, Telstra stop motion |
| 7 | **Confident colour beats colourful.** A desert with no orange-brown frame in it | Axel Digoix, Tinariwen |
| 8 | **Ruin the template on purpose:** something overlaps the type, one line runs across the layout, a controlled imbalance. Every element pays rent | Satori: "you are supposed to ruin that template style perfection". AI layouts are "too clean, too symmetrical" |
| 9 | **Give the eye something to resolve.** A small twist in the concept is what the viewer remembers | Satori: records forming a heart |

Rule 8 and centring: minimal "clean" styles centre everything (the Apple-style guide says
to). Centred text with a gradient is what generic AI output looks like (Margerie, and
`ai-tells.md`). Centre on purpose, not by default. Gradients stay banned
(`no-gradients.md`).

## Colour

- **Fewer colours feel more colourful.** "The less colours you're counterpointing and
  the stronger the choices ... the more you feel it" (Damien Chazelle on Vincente
  Minnelli, via Movie LUTs).
- **Dominant, secondary, accent,** roughly 60/30/10. The accent is the "third
  character" that commands attention.
- **Build a pattern, then break it once:** a colour that has not appeared yet marks the
  turn (Movie LUTs).
- Choose colours early: curate the board, step back, ask what it already leans to
  (Andrew). Put coloured objects in the frame, because grading alone can't invent them.
- Light first, grade second (Andrew, Gawx): film the shadow side; practical lights in
  the background "explain" the light. In code, the same logic: a visible source, a side
  in shadow.

## Frame rate is a look

Decide it from the theme. Gritty or handmade: lower rate, choppier. Technical: smooth
(Nowack). Pick 2-3 keywords for the theme and check every effect against them.

## How to make grain in a coded film

| Need | How |
|---|---|
| Grain that doesn't blur the picture | A layer of exactly 50% grey in overlay blend: anything darker darkens, lighter lightens, the grey itself changes nothing. Noise on it, a slight blur so it clumps like film (Ben Marriott) |
| Grain that moves like film | Hold each grain frame for 2 or more video frames, about 12 changes a second (Ben Marriott) |
| No banding on dark, flat colours | 16-bit colour if the pipeline allows, plus about 1% noise (Ben Marriott) |
| Elements feeling shot together | The same grain over everything, so nothing is cleaner than its neighbour (Ben Marriott) |
| Deterministic | Pre-render seeded noise frames, so a note on frame 212 stays true (`../motion-graphics/film-motion.md`) |
| Edges only | Slight chromatic shift and radial blur in a feathered mask at the corners, leaving the centre sharp (Matt Loui) |

## Checks

- [ ] A paused frame has at least two kinds of edge, and something that isn't flat vector.
- [ ] Grain on or off is a real difference, but nobody would call it "the grain video".
- [ ] 2-3 colours are named, and an accent has one job.
- [ ] One element in the layout breaks the template, and you can say why.
- [ ] Texture was in the first style frame, not added at the end.
