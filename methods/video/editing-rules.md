# Editing rules

Hard rules for cutting any film, coded or shot. Elias deleted three posted films
for breaking the first one, so treat it as a gate (checked in
`film-quality-gate.md` 3.5).

## Cuts

- **One image = one shot = one move.** Never cut from a frame back into the same
  scene or image at another zoom or crop (Elias, 2026-10-23/24).
- **Cut only on a new action:** something new happens, a new place, a new subject.
  Cuts that land on motion or a new event go unnoticed (edit blindness, Smith and
  Henderson 2008, doi:10.16910/jemr.2.2.6); a jump inside the same scene reads
  as a glitch.
- **No jump effects:** no punch-in zooms, bounce or shake on the same frame, no
  "zoomed-in cut" to fake energy (Elias, I16, 2026-10-26).
- Two or three transition types per film, repeated; never a crossfade.
- A physical move can hide a cut: a hand covering the lens, a body crossing frame,
  an object passing close (themoenkcuts reel, 2026-10). It counts as a new action.

## The cut vocabulary

Pick the cut the moment needs; a film doesn't need them all (Tim Runia, 740k views).

| Cut | What it does | How |
|---|---|---|
| **Flow** | Invisible; shots dance | Motion in one direction, picked up in the same direction next shot. Up then sideways is friction |
| **Action** | Smooth, alive | Cut in the middle of a movement; keep the subject in the same spot on screen; a few frames decide it |
| **Match** | Says two things belong together | Same shape, position or motion across the cut. Match the eye position on people |
| **Smash** | Resets attention | Sudden new scene, often with the sound cut too. Rare, or it stops being a surprise |
| **Rhythm** | Sets the feeling | Fast cuts build, slow ones let it land. Vary it |
| **Wide, medium, close** | Clarity | Where, what, feeling. Then break the order on purpose (start close, reveal late) |
| **Shot sequence** | A hook that also moves the story | Several angles of one action, same length each, flowing into each other in motion (Andrew) |
| **J and L** | Hides a cut with sound | `sound.md` |

**Settled by Elias, 2026-10-31:** a cut to a new angle while the same move continues is
allowed (action cuts, shot sequences). Re-cropping or zooming the same frame stays
banned, and so does a same-frame time skip (Runia's jump cut).

## Transitions must earn it

- **Decoration is what makes them amateur.** Ask what it accomplishes: time passing,
  world building, a connection. Otherwise cut it (Herman Huang, 590k views).
- Motion in the shot beats a plugin: push through something, pull out to reveal.
- A scale carry across a cut to a new scene (about 100 to 105%, easing hard into and out
  of the cut) holds attention cheaply. Ben Marriott warns that even 5% can be too much.
  This is not a punch-in: it never returns to the same image.
- When every shot has a crazy transition, none stands out.

## Pacing

A film moves like a long-distance runner: speeds up, slows, speeds up (McKee, via
StudioBinder). Fast passages need slow ones. Pace is set by more than cuts: scene
length, shot length, how much the camera moves, pauses in performance, and music that
speeds up or ticks (Jaws, Dunkirk). Fewer cuts can cover more story, as in Wolf of
Wall Street's montage. In Hollywood film, neighbouring shots
have grown more alike in length, approaching a pattern (1/f) that may help hold
attention on the story (Cutting et al. 2010, doi:10.1177/0956797610361679): vary shot
length gradually rather than at random. Measure yours: `tools/video-refs/measure.sh`.
Fewest cuts can win: an editor in Andrew's comments won the most awards for the film
with the fewest cuts and the longest takes. A static shot "goes with everything"
(Gawx).

## What made earlier films fail (Elias, I16 and I34, 2026-10-26)

Use this as a "never again" list when planning, not just when cutting.

| Failure | Fix |
|---|---|
| Short and meaningless; didn't cover the ideas that matter | One idea, said in one sentence, and the features people care about (`storytelling.md`) |
| No story | A trust arc with a turn; storyboard before build |
| Many ideas crammed in, badly connected ("slop") | One idea per film; cut anything that doesn't serve it |
| Jump cuts and zooms on the same frame | Rules above |
| Low "coded" look | Fix the levers we control: music, sound, element motion, transitions, inserts (I17); check frames, not just the end state |

## Music

- **Banned tracks (Elias's list, never use):** Mixkit 729 "Pop Track 03", Mixkit
  158 "Happy Times", Mixkit 726, "garage-24s". "pulse-20s" is not for coded films.
- Free, licensed music with **higher tempo (125-140 BPM)**, a clear hook, a drop and
  a clean ending. Soft corporate beds were rejected (Elias, 2026-10-17). Vocals:
  **real vocals for hype and launch films** (2026-10-17), but **inspiring music
  without vocals for explainers with a voiceover** (Elias's Prello film picks), so
  the voice isn't fighting a singer. A product's own picks decide per film type.
- Measure the track (first downbeat, bar length) before timing any cut. Beat
  detection alone misses the first downbeat.
- Open on a strong section, end on the last hit, no silent tail. Duck 15-20 dB
  under voice, or less when an EQ pocket or removed stem makes room (`sound.md`).
- A product may add its own picks and bans in its repo.

## Edit order (shot footage)

The full order for any film: `production-foundation.md`.

1. Music first: it sets pace and feeling.
2. Best take of each shot, in story order.
3. Cut on the beat and on new actions.
4. Voiceover; trim shots to it.
5. Sound effects and room tone.
6. Colour: correct first (white balance, exposure), then one look for the whole film.
7. Captions last, big and short.
8. Thumbnail: a still with strong colour contrast.

## Film types that worked in research (2026-10-24)

One-take real demo · before and after · side-by-side comparison · maker on camera ·
teaser · user reposts.
