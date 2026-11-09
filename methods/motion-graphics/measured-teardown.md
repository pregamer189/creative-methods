# Measured teardown: learning motion from a reference, frame by frame

When a reference app's motion "just feels good", measure it instead of guessing.
First used 2026-11-07 on a top consumer app (13 moments measured, 11
principles). We take the principles only: never its art, characters, colours or
layouts.

## Method

1. **Record on the real device** at its true frame rate (an iPhone screen recording
   is 60 fps; check the median gap between frames is about 16.7 ms). Record whole
   flows, not single taps.
2. **Split every frame** with ffmpeg at native timing.
3. **Track the moving thing** in each moment: its box or position, frame by frame
   (colour masks, edge tracking, shift matching), at a reduced resolution if needed.
4. **Fit the track** against standard curves (sine, quad, cubic, quart, quint, expo:
   out, in and in-out) and a damped spring. Report the best fit and its error (rms;
   0.01 = 1% off the real frames).
5. **Write each moment as a row:** what happens in order, and the numbers (start
   offset after the tap, duration, curve, overshoot or none).
6. **State the limits:** ±1 frame in time; touches are not drawn, so "after tap" is
   the first changed frame; sound and haptics are invisible in frames. Moments read
   from every 2nd-6th frame are marked approximate.
7. **Turn the rows into principles** written for your product, mapped onto its
   motion tokens. Write what you deliberately don't take, and list the gaps where
   more clips would help.
8. Slow the clips 4x for the review page; picks post as real comments.

## Principles we found (starting values, not final)

1. **Feedback is instant; decoration follows.** The verdict colour lands in the
   same frame as the tap (0 ms). Banner, glint and bar start 1-4 frames later.
   Never animate the verdict itself in.
2. **Wrong is quiet.** No shake, no flash. Mark it, hold about 0.5 s, then dim it
   out of play. Removed, not punished.
3. **Arrive fast, settle slowly.** Strong ease-out, about 90% of the move in the
   first half, a long soft tail. 200-300 ms visible.
4. **Exits are short and accelerate**, about a third of the entry (67 vs 230 ms).
   Big moment screens leave by a cut.
5. **Grow from the source.** Popups scale out of what you tapped, edge pinned to
   it, starting at about 30% size. Moving pieces travel the straight line to their
   slot and leave a placeholder.
6. **Progress accelerates toward the goal, then the reward fires on arrival.**
   Bars fill ease-in (about 400-450 ms) and stop dead; the payoff starts on the
   arrival frame. Chained bars wait about 67 ms between links.
7. **Reward = squash, lift, glint, settle**, under 0.5 s. The lift is a raised key.
   A glint is a solid band, not a gradient.
8. **Physical objects follow cartoon physics, kept subtle.** Falling stretches
   about 20%; landing squashes 10-12% and recovers in about 200 ms; a small
   anticipation dip (about 120 ms) before a big action, then a 50 ms pop. For a
   grown-up product, much smaller than the reference.
9. **Count up instead of showing a number**: big steps first, slow at the end
   (about 300 ms); stats arrive one at a time 300-400 ms apart.
10. **Celebrations are short spikes**: on in 2 frames, about 0.6 s, off in one.
    A big moment is a peak, not a show.
11. **One hold per beat.** A still moment of 300-800 ms after each animated beat,
    so each one registers.

## What we didn't take

The reference's characters and art, its palette, anything built on pressure or
rivalry, and any gradient wipe. Sound and haptics come from our own sound pass
(`motion-and-sound-lab.md`), with real recorded or generated foley.
