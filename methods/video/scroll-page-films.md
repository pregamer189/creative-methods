# Filming a scroll page

How to turn a long scrolling web page (a landing page, a story page, a prototype)
into a smooth vertical film for short-video feeds. A hand-held screen recording
of a scroll page looks cheap: the finger stutters, the browser drops frames, and
the timing can never be repeated. So the page is not recorded, it is **rendered**,
frame by frame, from a scripted scroll.

The page's art, words and brand stay in the product. This is only the method.

## The recorder

- A headless browser at phone shape (for example 432 x 768 at a device scale of
  2.5, which gives 1080 x 1920).
- **A fake clock.** Install the browser's test clock, pause it at a fixed moment,
  and advance it by exactly one frame per screenshot. Every animation on the page
  must run on the page clock for this to work, so the page should not use
  animation engines that keep their own time.
- **Seeded randomness**, so two runs give the same frames.
- **Each frame:** set the scroll position, fire the scroll event by hand (under a
  fake clock the browser may not fire it), advance the clock one frame, take the
  screenshot.
- **Log everything:** for each frame the scroll position, the time and any camera
  value the page computes, plus the time of every sound the page tried to play
  (swap the media element's `play` for a stub that writes the time down). The log
  is what the sound edit is cut to.
- A dry run with screenshots off takes seconds and is enough to check timing.

## Drive the scroll by what the viewer sees

A scroll page rarely moves one screen pixel per scroll pixel. Sections pin, slow
down, or turn vertical scroll into a sideways move. A steady scroll speed then
looks like crawling in one part and racing in the next.

1. **Measure the page first.** Step through the whole scroll in small steps and
   write down where the page's camera is at each one.
2. **Pick an on-screen speed**, in pixels per second as the viewer sees them, and
   work the scroll position backwards from the measured table so that speed holds
   through every section.
3. **Slow down on purpose** only where there is something to read or hear: a
   short dip (to roughly a third of the speed) centred on each such spot, wide
   enough that a spoken line finishes before its speaker leaves the frame.
4. **Ease in and out** at the start and the end; never a hard start.

## Two bugs that look like bad animation

- **Whole-pixel scroll.** Browsers round the scroll position to whole pixels. On a
  slow move this shows as a tiny stall every few frames. Give the page the exact
  fractional position (override what it reads as its scroll value) and the stall
  goes away.
- **Scroll events that never fire** under a fake clock: the page shows the same
  camera value for several frames. Fire them by hand.

Check every render with a script, not by eye: no frame may step backwards, and
the camera may not stand still where it should move.

## Frame rate

One frame rate for all films in a project (ours is 25) removes a whole class of
choppy scenes and jumps that come from mixing rates. The exception is a film that
is mostly fast movement across the frame with text in it: at a low rate the text
smears and cannot be read. Render that one film at 60 and keep everything else
where it was. If the higher rate is not possible, slow the movement instead.

## The opening second

Our first post of a page film held the page's still opening screen for a few
seconds. Most viewers left within one second. A still web page reads as an advert
and gets swiped.

- Be moving within the first second. Keep the opening screen if the owner wants
  it, but hold it for under a second and strip everything around it.
- **Shorten the start, do not cut the film.** Dropping whole sections to make the
  film shorter changed the piece and was rejected. Speed up the slow start and
  leave the journey whole.
- A small label in the first two seconds that says what this is ("the prototype
  of our ...") gives the viewer a reason to stay. Keep it clear of anything on the
  page it could cover.

## Sound

The page itself stays quiet. Sound is added in the edit:

- Music low under everything (about a third of full level), the whole mix near
  -16 LUFS, a limiter last.
- One short real sound per event in the journey (a change of place, an arrival, a
  tap), placed from the frame log.
- **No sound may start under a spoken word.** Place voices first, then fit sounds
  into the gaps.
- Ambience fades in and out with its place; nothing ends on a hard cut.
- Make the film with two music picks and let the owner choose, or post both a
  day apart and compare watch time.

## Record once

A page under review changes many times a day. Do not re-render the film for each
version. Wait until the page's owner says the batch of changes is in, then render
once. Keep the recorder settings with the film so the next render is one command.

## Only what was asked

When a page or film is being polished, it is tempting to add a glow, a soft
colour blend, sparkles, extra labels. Each one the owner did not ask for is a
thing they must find and ask to have removed. Add nothing that was not asked for;
suggest it in a sentence instead.

## Reading the first numbers

- The first few dozen views in the first minutes are the feed's test batch, on
  any account, however new. They say nothing about quality yet.
- **Average watch time and where people leave** are the numbers that matter.
  Leaving in the first two seconds means the opening picture is wrong; staying
  past three seconds and drifting off in the middle means the pace is.
- Change one thing between two posts, so the numbers can tell you what worked.
- Note each post's numbers in one log next to the file and the caption, so the
  next film starts from them.

## Posting notes

- **Safe zones.** The feed's own buttons and caption cover the right edge and the
  bottom. For slides with text, scale the content down a little and move it up
  and to the left; keep everything out of the right-hand strip and the lower
  quarter.
- The platform's upload preview can look darker than the feed. Judge the look in
  the feed.
- **Variations of one post** (two music picks, a shorter start) live under one
  entry in the post log, with one caption.
- Never post the same thing twice in two formats. Similar is fine, the same is not.
- Two accounts for one product mention each other in every caption. To show a
  post on the second account, repost or share it to a story; do not upload it twice.
- Sound can be missing for a minute right after upload while the platform
  processes it. Wait before re-uploading.
- When a better version replaces a post, remove or hide the old one.
