# Sound

Viewers forgive a plain picture sooner than bad sound. "How on earth did you get these
animations to feel so real? The trick there is the sound design" (Matt Loui). Most of
what follows was not in our methods before 2026-10-31.

Hard rules on tracks and tempo stay in `editing-rules.md`. Voice: `voice.md`.
Pick and check: `film-quality-gate.md` section 4.

## Layers, in the order they go on

1. **Voice:** the most important sound; nothing may fight it.
2. **Music:** sets pace and mood.
3. **Ambience:** the place. First sound-design layer, quiet, grounding.
4. **Real sounds:** what is actually in the frame (a step, a door, a card landing).
5. **Creative sounds:** whooshes, risers, impacts, clicks.
6. **Mix.**

(Jacob Nordin, 1.2M views.) "Sometimes you don't need more than one or two layers."

## Music: be the conductor

| Step | How | Source |
|---|---|---|
| Find it early | Before writing, or at the latest before cutting; look at tempo and at the dips | Andrew, Gawx, Nordin |
| Mark it | A marker on every beat, another colour on bar 1 of each four. Everything snaps to them | Story Slice (a trailer editor in the comments confirms it) |
| Cut on its dips | Scene changes go where the song already dips, so nothing is forced | Andrew |
| Use stems | Mute what fights the voice; bring parts in and out to build. No stems: UVR splits any song | Herman Huang |
| Make it sound written for the film | Reverb on the song, a drone under it, a low hit; layer more as it goes. Sound effects can carry on when the music stops | Story Slice on The Last of Us trailers |
| Enter a track | Reverse the opening beat (or the tail) as a riser into it | Herman Huang |
| Leave a track | Reverb on the final beat, cut before the next. Add an impact to end hard | Herman Huang |
| Change the genre on purpose | Lo-fi is stale; jazz, house and cinematic carry a story better (one maker's view; the product's picks win) | Andrew |

Beats can be measured from the file (`beats.json` with tempo, beats, downbeats, hits),
and animation retimed to it. In code, a track can also be synthesised on the same
timeline as the picture (Margerie). Beat detection alone misses the first downbeat:
check it by ear (`editing-rules.md`).

**Composed music** is the other route: written last, to the finished film, to lift
the key moments (Kurzgesagt).

## Sound effects: four types

| Type | Job | Variants |
|---|---|---|
| **Whoosh** | Motion: direction, speed, weight. Carries you across a cut | Heavy (big, close, serious), light (fast, fun), whip (sudden), wind (gliding) |
| **Riser** | Tension: "something is coming" | Low rumble (felt more than heard), cymbal (bright, urgent), suckback |
| **Impact** | Emphasis: "this matters" | Deep with a long tail, sharp and short |
| **Click** | Snap in quick sequences | Shutter, pen, mouse; UI pop |

Also a **drone** under a section to set mood (Story Slice), and **line or draw** sounds
for things being drawn on screen (Matt Loui). Combos: riser into impact, low + bright
riser before a smash cut, whoosh into impact on a cut that must land.
(Tim Runia; his sound pack is his own product.)

## Handling them

| Technique | How | Source |
|---|---|---|
| **Layer by frequency** | A big whoosh is low + mid + high, like layers of a cake. One whoosh can't carry a big move | Herman Huang |
| **Keep it in key** | An effect off-key feels wrong even to untrained ears. Find the song's key, pitch the effect by semitones | Herman Huang |
| **One style per film** | A coherent pack beats the best sound from everywhere. Bass hits don't belong in a corporate film, or clean dings in streetwear | Herman Huang |
| **Pick a family first** | Audition several, keep a short list on the timeline, then place them | Matt Loui |
| **Make room for the voice** | Carve a pocket in the music's mids (a dynamic EQ triggered by the voice) rather than only lowering it | Herman Huang, Nordin |
| **Place them in space** | Reverb for the size of the place (around 70% of a preset on UI effects helps them sit); panning left and right | Nordin, Matt Loui |
| **End softly** | A fade on the tail so nothing stops abruptly | Matt Loui |
| **J and L cuts** | Hear the next scene before you see it; let the last one linger. Hides cuts | Nordin |
| **Emotional sound** | Sound what it feels like, not what it is. Coffee grounds as cracking icebergs, a pour as an ocean, all from one family of sounds | Herman Huang (from Euphoria), Nordin |

## Silence is a tool

The absence of sound adds tension, and everything after it hits harder.

- Drop the music just before a line that must land.
- Full silence mid-film can feel jarring. A **low-pass filter** swept from high to low
  feels like the world holding its breath, and keeps viewers in (Herman Huang).
- A stretch without narration is a real option. Ermia Ramez's 11-minute film has no
  narration from about 6:50 to 9:38: a song, then almost nothing said, over the "doing
  the work" chapters (captions show the gap; the picture carries it).
- When a film sounds flat, try deleting before adding (Herman Huang: "why did that
  feel better?").

**Settled clash:** "every visual event has a sound" now reads "every event that matters
has a sound, or a chosen silence". Sound only reinforces what is visible.

## Mix and check

- Nothing clips. About -14 LUFS, true peak under -1 dBTP (`film-quality-gate.md`).
- Listen on different speakers before posting (Nordin): phone speaker, headphones.
- Ask an audio person when you can. They hear what a visual maker doesn't.

## Sourcing

Paid libraries the sources use: Artlist (many tracks include stems), Musicbed, Boom
Library, Ghosthack, Happy Editing packs. Several of those videos are sponsored by them,
so treat that as what practitioners use, not proof of best. The product's rules on
licences and banned tracks win. Recording your own sounds for a film (foley) is what
makes a film sound unlike the library.
