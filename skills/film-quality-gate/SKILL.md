---
name: film-quality-gate
description: Run before showing any finished film or video to Elias; checks plan, automated render checks, frames, sound and watch tests, and blocks films that fail.
---

> From Prello, Language App may revise.

Run every check in `methods/video/film-quality-gate.md` of the creative-methods repo, in order.

1. Plan checks first (logline, first 2 s, length, storyboard, cut ledger).
2. Automated checks on the render: loudness about -14 LUFS, true peak <= -1 dBTP (`ffmpeg -af ebur128`), no black frames (`blackdetect`), H.264 + AAC, 16:9 master plus a recomposed 9:16.
3. Contact sheet at each cut (-0.1 s and +0.2 s) and check frames by eye.
4. Sound and watch tests (muted, phone, 1.5x).
5. Also apply `methods/video/editing-rules.md` (no same-scene cuts, banned tracks).

Report a table: check, pass/fail, evidence (command output, frame number or contact-sheet image).
Any failure: fix and rerun. **A film that fails any check is not shown.**
