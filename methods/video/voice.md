# Voice

The voice is what audio people and many viewers criticise first. A top comment on a
717k-view film video: the only flaw is the AI voiceover. Andrew's most-liked critical
comment is a radio reporter on his voice track. Treat it as a craft, not a setting.

## Where it comes from

| Source | Good for | Watch out |
|---|---|---|
| A designed voice (text description, then choose) | A brand voice nobody else has one click away | Keep the description; marry it, every film uses it |
| The maker's own voice, recorded | Maker stories; the audience wants the person | Needs a small soft room and takes |
| A clone of the maker's own voice | Dubs and fixes without re-recording | Your own voice only; never anyone else's (Isaac) |

A library voice is the weakest: everyone can use it.

## What makes speech sound human

Changes in tone and speed, pauses, emphasis, and words written by a person. A script
written by AI still sounds written by AI in any voice (Isaac).

## How to make it (AI voice)

1. **One or two sentences at a time.** Each generation comes out slightly different,
   as a person's sentences do. Pasting a whole script gives one even pattern that
   starts to feel off after a minute.
2. **About three takes of each.** Keep them all.
3. **Direct by writing:** `...` for doubt, `!` for lift, CAPS for the stressed word. On
   models with audio tags, write the direction in brackets like directing an actor
   (ElevenLabs): `[thoughtful]`, `[laughs]`.
4. **Splice.** Choose the best take for each sentence, then the best words across
   takes. This is where the uncanny feeling goes.
5. **Cut pauses by hand.** Remove dead air, then add silence before what matters.
6. **Clean it:** high-pass filter, cut boxy frequencies, light compression.
7. **Retime with pitch kept**; check for distortion.

Settings differ by source. ElevenLabs advises default similarity and style exaggeration
at zero. Isaac uses lower stability, similarity about 70% and raised style, on v2,
because in his tests v3 changed the voice itself. **Start from the vendor's defaults,
then compare takes on your own line.** Models change often.

## How to make it (recorded)

One complete pass first to keep the flow, then retake paragraphs and sentences until
they feel right (Kurzgesagt's narrator). Remove filler and bad takes before anything
else (Gawx). For small rooms see `solo-shoot.md`.

## Where it goes in the order

Voice before motion: it sets timing for animators (Kurzgesagt, Gawx on narrated
films). A film led by music can add the voice later and trim to it (`editing-rules.md`).

## The written voice

To write in a person's voice (Jay Yang's reel, De50ZcNNFTe, ghostwriter for well-known
founders): a **story bible** (upbringing, failures, dreams, everything), a **voice
skill** (transcripts of their podcasts and videos, with the model analysing the patterns
of how they speak), and an **anti-AI checklist** the writing is checked against. Use
it for a personal brand; the person still reads every line aloud.

## Dubbing

A finished film can be dubbed: export voice alone and music-plus-effects alone, dub the
voice, line it up, mute the original, upload as an extra audio track on YouTube. Isaac's
own numbers show real watch time from the added Spanish and Hindi tracks. His claims
about big channels are his reading, not a study.

## Check

- [ ] Heard at normal speed by someone who didn't make it: no "AI voice" comment.
- [ ] Pauses exist; every long sentence has a change in it.
- [ ] Sits above the music without fighting it (`sound.md`).
