# Film quality gate

Every film passes this gate before a person sees it. Run it in order. Any failed
check means fix and rerun. Report a table: check, pass or fail, evidence (command
output, frame number or contact-sheet image). The paste-ready version is
`skills/film-quality-gate/SKILL.md`.

Why a gate and not a "looks good": same-model checks share the maker's blind
spots (I14, Elias 2026-10-26). So every check is either a fact a command can
measure, or a look at a named frame, plus one outside eye at the end.

Sources in brackets: [FC] film craft notes (Prello, 2026-10) · [LO] Lemo-Opuscar
`DIRECTOR.md` (github.com/lemomo-ai/lemo-opuscar) · [MD] motion doctrine (seam
rules, see `../motion-graphics/film-motion.md`) · [X] launch-video research
2026-10-18 (flowjam.com/blog/product-launch-video-examples-2026,
moonb.io/blog/product-launch-video, postfa.st/sizes/x/video) · [E] Elias.

## 1. The plan (before building)

| # | Check | Source |
|---|---|---|
| 1.1 | One idea in one sentence, and one logline: a maker, a goal, a turn. The film shows something the product really does for the viewer | [LO §3] [E I34] |
| 1.2 | It moves one step of a trust arc (curiosity, understanding, belief, action), not a pile of likeable things | [E I11] |
| 1.3 | The first 2 s show the product doing a real task (a real capture, or the product's approved stand-in such as abstract coded screens; or a typed prompt that lands). No logo first, no fade from black | [X] [FC] |
| 1.4 | The use case is said in one short line in the first seconds | [X] |
| 1.5 | Shape: framing, demo, closing, with one big move at the peak | [X] [LO §3] |
| 1.6 | Length fits the platform: about 30-45 s for a hero cut; anything longer is a separate film | [X] [FC] |
| 1.7 | A storyboard exists (`storyboard.md`), with a music cue map on the bar grid and a seam plan (axis, direction, carrier) for every cut | [LO §4] [MD] |

## 2. Automated checks (all must pass)

| # | Check | Source |
|---|---|---|
| 2.1 | The renderer's own lint passes (for HyperFrames: `npx hyperframes check`) | [FC] |
| 2.2 | Seams: no overlap at cuts, the outgoing element is still moving, the incoming one enters mid-flight, direction matches (a seam checker script if the project has one; otherwise frame pairs in 3.1) | [MD] |
| 2.3 | Loudness: `ffmpeg -i film.mp4 -af ebur128=peak=true -f null -` gives about -14 LUFS integrated and a true peak at or below -1 dBTP | [LO §11] [FC] |
| 2.4 | No black frames: `ffmpeg -i film.mp4 -vf blackdetect=d=0.05 -f null -` prints nothing | [FC] |
| 2.5 | H.264 + AAC MP4; 1920x1080 master; the 9:16 version recomposed, not cropped | [X] [FC] |

## 3. Frames (contact sheets, by eye)

| # | Check | Source |
|---|---|---|
| 3.1 | Stills at every cut -0.1 s and +0.2 s and at each shot's midpoint: no layout breakage, no visible pop across a cut (position, scale, opacity and direction carry on) | [FC] |
| 3.2 | Pause anywhere: something meaningful is mid-flight. No idle wobble, breathe or float | [MD] |
| 3.3 | A 0.3-0.75 s stillness before each result lands | [MD] |
| 3.4 | Two or three transition types, repeated; never a crossfade | [MD] |
| 3.5 | No same-scene cuts, no punch-in zooms, bounce or shake on the same frame (`editing-rules.md`) | [E I16] |
| 3.6 | Text is high contrast, inside the safe area, held long enough to read (at least 1.8 s; about letters / 15 + 1.5 s) | [LO §7] |
| 3.7 | Key subjects fill at least a third of the frame height; nothing important leaves the frame | [LO §8] |
| 3.8 | None of these: subject too small or too dark, colour on the same colour, captions over the subject, blank frames inside transitions, gradient or glow filler | [LO §10] [E] |
| 3.9 | The first frame works as a thumbnail | [FC] |

## 4. Sound

| # | Check | Source |
|---|---|---|
| 4.1 | Every visual event has a sound (a whoosh, a tick, a land); a depicted button press gets no UI click if the product's film rules ban it | [FC] |
| 4.2 | Music opens on a strong, clean section and ends on the film's last hit, no silent tail; it is not on the product's banned list | [FC] [E] |
| 4.3 | Music ducks 15-20 dB under any voice | [FC] |
| 4.4 | At least one near-silence before the turn | [LO §6] |

## 5. Watch tests (last)

| # | Check | Source |
|---|---|---|
| 5.1 | Muted, the first 2 s alone make you stop, and the product is clear after one watch (feeds autoplay muted). Short on-screen key lines carry it; a voiceover-led film doesn't subtitle every word (I36) | [FC] [X] [E] |
| 5.2 | Watch three times: full attention, muted on a phone, at 1.5x. Cut anything that drags at 1.5x | [FC] |
| 5.3 | The ending is one clear action or the product name, landing on the final hit | [X] |
| 5.4 | One outside eye (a person, or the film side by side with a reference it should match) | [E I14] |

## 6. The product's own rules

The product repo adds its brand checks here (logo, palette, fonts, music picks,
what may be generated). They live in that repo, never in this file.

## Delivery

Show the film with the gate table, the contact sheet and frame ids, so a note can
point at one frame. A film that fails any check is not shown.
