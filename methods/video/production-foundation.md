# Production foundation

Elias, 2026-10-31: "if we just plan everything out, then the quality is going to
drop." A plan says what to make. This file says how each part gets made: where it
comes from, how it is handled and what checks it. Details are in the linked methods.

Built from about 25 videos read in full (captions and top comments, links in
`../../references/watch-list.md`), checked against what the methods already said.
These are sources' practice unless a paper is named. Sponsored tools in those
videos are not endorsed here.

What the picture actually does, seen frame by frame and measured: `visual-grammar.md`.

## Who brings what

| Input | Who | Why |
|---|---|---|
| **Taste** | The person | The model has none of its own. A human-looking result needs direction from someone with the background (Satori). Taste is trained by collecting what makes you stop (Barney Watts). See `../research/taste.md` |
| **Something to say** | The person | "Stories only you can tell" (Barney Watts). Writing is the bottleneck even at Kurzgesagt's size |
| **Build, measure, variations** | The model | Code, renders, cut lists, loudness, contact sheets |
| **Judgement** | An outside eye | Same-model checks share blind spots (I14). Critique loops help but never count alone |

## Every part

| Part | Where it comes from | How it is handled | How it is made | Check |
|---|---|---|---|---|
| **Idea** | The taste board, real product moments | One sentence; packaging (idea, title) before script | Five lines: situation, desire, conflict, change, result | Say it in one line; the title's promise is met in the first line |
| **Script** | Written by a person, AI edits at most | Read aloud with the song playing, so it lands on the beat | Outline first, gut-check that the points are new; second-best point first, best second | Viewers can't call it "AI written" (Isaac: "we know") |
| **Voice** | A designed voice nobody else has, or the maker's own | Sentence by sentence, about three takes each | Best parts spliced; pauses cut in by hand; cleaned with EQ | `voice.md`; audio people criticise this first (Andrew's top comments) |
| **Music** | Licensed track with stems | Marked bar by bar; dips picked as scene changes; stems muted and filtered | Reverse-beat riser in, reverb on the last beat out | `sound.md`; loudness measured |
| **Sound effects** | One coherent pack per film, plus sounds recorded for it | Four types: whoosh, riser, impact, click | Layered low, mid and high; pitched into the song's key | `sound.md`; every one of them earns its place |
| **Ambience** | A library, or recorded on location | First layer laid, quiet, panned | J and L cuts carry it across shots | Audible on headphones, never noticed |
| **Frame design** | Style frames before any motion | Hierarchy, contrast, one deliberate break of the template | One frame made right, then more | `../design/texture-and-finish.md`, `../design/ai-tells.md` |
| **Texture** | Real material where possible (scans, prints, paper, ink) | Chosen as a palette from the start, never a filter on top | Grain on a neutral overlay layer, matched across elements | Pausing a frame shows hard and soft edges, and it doesn't look clinical |
| **Colour** | 2-3 colours chosen early, by looking at what the taste board already leans to | Dominant, secondary, accent (about 60/30/10) | Correct first, then one look | Few colours, strong choices (Chazelle) |
| **Motion** | The story beat; nothing moves without a reason | Importance decided before animating | Anticipation, then the move; stillness against action | `../motion-graphics/film-motion.md` |
| **Product shots** | Real screens: recording or screenshots, never a made-up interface | Treated as an object: close, tilted, shallow focus, or touched by a hand. One container that changes state rather than cuts | Real recordings give real states; the model builds from them | Every claim true on a real screen; it doesn't look like a flat recording |
| **Cuts** | Decided from what each moment needs | A small vocabulary (flow, smash, action, match, rhythm) | Direction continues across the cut; eye stays in place | `editing-rules.md`; shot lengths measured with `tools/video-refs/measure.sh` |
| **Mix** | Everything above | Voice first, then music, then the rest | About -14 LUFS, true peak under -1 dBTP | Measured, then heard on phone speakers and headphones |
| **Reference study** | Outliers by real views, then what viewers said | Grammar written down, never content | Style guide file per reference | `../research/reference-analysis.md` |

## Order of work

Each step is cheap to redo before the next one starts.

1. **Taste board** for this film: a few rare things, and the reason each one works.
2. **Five lines**, then idea and title.
3. **Song** chosen and marked (when using a licensed track). Write the script with it
   playing. A composed score goes the other way, last and to the finished picture
   (Kurzgesagt).
4. **Style frames:** one or two frames with the finish already in them.
5. **Voice** takes spliced. This locks the timing.
6. **Beat grid:** a table with one row per shot: bar, picture, text, voice, sound and
   the cut out of it. Read before any code is written (Margerie).
7. **Animatic:** stills on voice and music. Fix story problems here.
8. **Motion.** Small drafts first; keep full renders for the end.
9. **Sound pass:** ambience, then real sounds, then creative effects.
10. **Finish:** texture and colour.
11. **Mix**, then `film-quality-gate.md`.
12. **Outside eye** marks it; one lesson goes into the methods.

## Expect the real effort

One-prompt claims hide the rest. "The prompt is 10% of the outcome, the rest is the
harness" (Margerie, whose best example took 163 model calls and nearly 7 hours).

| Film | Effort |
|---|---|
| Kurzgesagt, a 7-10 minute explainer | At least 1,200 hours, music composed for each film |
| Ermia Ramez, 11 minutes | 123 days |
| Gawx, one film | 60 to 300 hours |
| Andrew, one filming day | 4 hours for 40 seconds kept |

For a first film, keep it small, fast and allowed to be stupid (Ermia Ramez: 3 to 6
minutes, under 30 days). Make things that are only experiments (Barney Watts, Ben
Marriott: "a 4-second loop").

## Why the craft shows

- **People read effort as quality.** Judged quality rises with perceived effort
  (Kruger et al. 2004, doi:10.1016/s0022-1031(03)00065-9). Design Theory's envelope
  example makes the same point in the field. Top comments on the best films talk
  about the hours in them ("I feel guilty watching this for free").
- **Human-made is a signal right now.** Ermia Ramez's description says "not a single
  frame is AI generated"; Ben Marriott's "no AI in anything shown here" and "brands
  looking to stand out in the slop era, this is how". Provenance labels shape
  perceived creator effort on short video (Lim et al. 2026,
  doi:10.3389/fpsyg.2026.1840483). **Only claim what is true:** a coded film can say
  who directed it and show the process, never "no AI".
- **Influence for their benefit, with their consent, or it is manipulation** (Design
  Theory's test). Show real effort and real product; no fake vents.

## Not used

- **Face-swap and IP-block workarounds** (Sirio's Higgsfield teardown, 2026-10). It
  gets around model safeguards to put people into others' films. Against
  `../research/reference-analysis.md` and not what these methods are for.
- **Comment-bait and hard-sell formats** as a default (`storytelling.md`).
