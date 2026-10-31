> From Prello, Language App may revise. Brand-specific checks removed; source tags kept so they can be traced.

# Film quality gate

Every film passes this gate before a human sees it. Each check is taken from a source, which is named in
brackets; none of them is invented here. Run the gate in order. Any failing check means the film is fixed and the
gate runs again. Report the result as a table of check, pass or fail, and evidence (a command's output, a frame
number or a contact-sheet image).

Sources: [FP] founder picks · [FC] film craft notes · [MD] skill `motion-doctrine` ·
[PLV] skill `product-launch-video` · [LO] Lemo-Opuscar `DIRECTOR.md` · [X] launch-video research, 2026-10-18
(flowjam.com/blog/product-launch-video-examples-2026, moonb.io/blog/product-launch-video, postfa.st/sizes/x/video).

## 1. Before building (the plan)

| # | Check | Source |
|---|---|---|
| 1.1 | One logline: a maker, a goal, a turn. The film shows something the product really does for the viewer | [LO §3] [FP §6] |
| 1.2 | The opening shows the product doing a real task, or a typed prompt that lands, in the first 2 s. No logo first, no fade from black | [X] [FC] [FP §9] |
| 1.3 | The use case is stated in one short line in the first seconds | [X] |
| 1.4 | The structure is framing, then demo, then closing, with one native move at the peak | [X] [LO §3] |
| 1.5 | Length is 30–45 s for the hero cut, with any longer film separate (X standard limit is 140 s) | [X] [FC] |
| 1.6 | The vector ledger is written before any scene: every seam has its axis, direction and carrier | [MD] |
| 1.7 | The storyboard has `asset_candidates` for every frame and the music cue map on the bar grid | [PLV] [LO §4] |

## 2. Automated checks (all must exit 0)

| # | Command | Source |
|---|---|---|
| 2.1 | `npx hyperframes check` (lint, layout, motion, contrast) | [PLV] |
| 2.2 | `node .claude/skills/motion-doctrine/scripts/seam-gate.mjs verify --ledger ledger.json --project .` checks for zero overlap at cuts, an exit still moving, an entry mid-flight, matching direction and the Z sign | [MD] |
| 2.3 | `node .claude/skills/product-launch-video/scripts/transitions.mjs verify --storyboard ./STORYBOARD.md --index ./index.html` | [PLV] |
| 2.4 | On the render: `ffmpeg -af ebur128` gives about −14 LUFS and a true peak at or below −1 dBTP; `blackdetect` finds no black frames | [LO §11] [FC] |
| 2.5 | Encoding is H.264 + AAC MP4, 1920×1080 master, 9:16 recomposed, not cropped | [X] [FC] |

## 3. Frame review (contact sheets, by eye)

| # | Check | Source |
|---|---|---|
| 3.1 | `npx hyperframes snapshot --at <frame midpoints, each cut −0.1 s and +0.2 s>`: no layout failure at midpoints, and no visible pop across any cut (position, scale, opacity and direction continue) | [PLV] |
| 3.2 | Pause at any second: something meaningful is mid-flight. No idle wobble, breathe or float | [MD] |
| 3.3 | A 0.3–0.75 s stillness before each result lands | [MD] |
| 3.4 | Only 2–3 transition types, repeated, and never a crossfade | [MD] |
| 3.5 | Every text is clearly contrasty, inside the safe area, and held long enough to read (at least 1.8 s, about letters ÷ 15 + 1.5 s) | [FP §6] [LO §7] |
| 3.6 | Key subjects fill at least a third of the frame height; nothing important leaves the frame | [LO §8] [FP §6] |
| 3.7 | No failure from the list: subject too small, too dark, colour on the same colour, captions over the subject, blank frames in transitions | [LO §10] |
| 3.8 | The first frame works as a thumbnail | [FC] |

## 4. Sound

| # | Check | Source |
|---|---|---|
| 4.1 | Every visual event has a sound; no button-press clicks | [FC] [FP] |
| 4.2 | Music opens on a strong, clean section (no quiet build eating the first seconds) and ends on the film's last hit with no silent tail | [PLV] [FP §1] |
| 4.3 | Music ducks 15–20 dB under any voice | [FC] |
| 4.4 | At least one near-silence before the turn | [LO §6] |

## 5. Watch tests (last)

| # | Check | Source |
|---|---|---|
| 5.1 | Muted, the first 2 s alone make you stop, and the product is clear after one watch (X autoplays muted, so captions or on-screen text carry the message) | [FC] [X] |
| 5.2 | Watched three times (full attention, muted on a phone, at 1.5×), anything that drags at 1.5× is cut | [FC] |
| 5.3 | The ending is one clear action or the product name, then the knot on the final hit | [X] [FP] |

## Delivery

Show the film with the gate table, the contact sheet and the frame ids, so a note can target one frame. A film that
fails any check is not shown.

| (1.8, per product) | The product's own brand rules hold (logo, palette, no paid generated visuals without a yes). Keep these in the product repo. | |
