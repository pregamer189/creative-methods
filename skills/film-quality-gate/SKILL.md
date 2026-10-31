---
name: film-quality-gate
description: Use before showing any finished film or video to a person. Checks the plan, measures the render (loudness, black frames, encoding), reviews frames at every cut, sound and watch tests, and blocks a film that fails any check.
---

# Film quality gate

Version 1.1 (2026-10-31). Changes: CHANGELOG.md in pregamer189/creative-methods.

Same-model checks share the maker's blind spots, so this gate uses only facts a
command can measure, looks at named frames, and one outside eye. Run in order.
Any failure: fix and rerun. **A film that fails any check is not shown.**

## 1. Plan

- [ ] One idea in one sentence; a logline with a maker, a goal and a turn.
- [ ] It moves one trust step (curiosity, understanding, belief or action).
- [ ] First 2 s show the real thing doing a real task. No logo first, no fade from black.
- [ ] The use case is said in one short line early.
- [ ] Length fits the platform (about 30-45 s for a hero cut).
- [ ] A storyboard exists with shot times on the music's bars and a plan for every cut.

## 2. Measure the render

```bash
ffmpeg -i film.mp4 -af ebur128=peak=true -f null - 2>&1 | tail -12   # about -14 LUFS, true peak <= -1 dBTP
ffmpeg -i film.mp4 -vf blackdetect=d=0.05 -f null - 2>&1 | grep black # must print nothing
ffprobe -v error -show_entries stream=codec_name,width,height -of csv=p=0 film.mp4  # h264 + aac
```
- [ ] Renderer's own lint passes, if it has one (e.g. `npx hyperframes check`).
- [ ] Master 1920x1080; the vertical 9:16 version recomposed, not cropped.

## 3. Frames (contact sheet)

Grab stills at every cut -0.1 s and +0.2 s and at shot midpoints
(`ffmpeg -ss <t> -i film.mp4 -frames:v 1 f_<t>.png`), tile them, and look.
- [ ] No layout breakage; no pop across a cut (position, scale, opacity, direction carry on).
- [ ] Pause anywhere: something meaningful is mid-flight; no idle wobble or float.
- [ ] 0.3-0.75 s of stillness before each result lands.
- [ ] Two or three transition types, repeated; never a crossfade.
- [ ] No same-scene cuts: never cut back into the same image at another zoom or crop; cut only on a new action. No punch-in zooms, bounce or shake.
- [ ] Text is high contrast, inside the safe area, held at least 1.8 s (letters / 15 + 1.5 s).
- [ ] Key subjects fill at least a third of the frame height.
- [ ] None of: subject too small or dark, colour on the same colour, captions over the subject, blank frames, gradient or glow filler.
- [ ] The first frame works as a thumbnail.

## 4. Sound

- [ ] Every visual event has a sound (no UI click on a depicted press if the product's film rules ban it).
- [ ] Music opens on a strong section, ends on the last hit, no silent tail; not on the product's banned list.
- [ ] Music ducks 15-20 dB under voice.
- [ ] One near-silence before the turn.

## 5. Watch tests

- [ ] Muted, the first 2 s make you stop, and the product is clear after one watch. Short on-screen key lines carry it; when a voiceover leads, don't subtitle every word.
- [ ] Watched three times: full attention, muted on a phone, at 1.5x. Cut what drags at 1.5x.
- [ ] Ends on one clear action or the product name, on the final hit.
- [ ] One outside eye: a person, or side by side with a reference it should match.

## 6. Product rules

Apply the product's own brand checks from its repo (logo, palette, fonts, music
picks, what may be generated). They outrank this list.

## Report

| Check | Pass/fail | Evidence (command output, frame id, contact sheet) |
|---|---|---|

Show the film with this table and the contact sheet, so a note can point at one frame.
