# Visual grammar: what great films actually do

Elias, 2026-10-31: the value is "mainly in the visuals, examples of the visuals, the
voice that ties it" and the people and work they name. Captions can't show this, so
these notes come from looking at one frame per shot (`tools/video-refs/shots.py`) and
from measuring the files. Take reasons from here, never shots (`../research/reference-analysis.md`).

## Measured

Low-resolution copies, automatic scene detection at threshold 0.3, except the two
marked (0.1, because white backgrounds and continuous camera moves hide cuts at 0.3,
which reported only 2 and 3). Dark films undercount too, so read these as rough. Voice pace comes from timed captions.

| Film | Length | Hard cuts | Median shot | Longest | Voice, words a minute | Speech covers |
|---|---|---|---|---|---|---|
| Apple, Hello MacBook Neo (36M views) | 3:50 | about 50 (0.1) | about 4 s | - | - | - |
| Kurzgesagt, 1,200 hours | 6:47 | about 13 (0.1) | about 30 s | - | 160 | 98% |
| Barney Watts, creative | 6:08 | 170 | 1.2 s | 18 s | 164 | 91% |
| Tinariwen, by Axel Digoix | 3:41 | 96 | 1.5 s | 22 s | - | - |
| Ermia Ramez, watching to creating | 11:27 | 127 | 2.3 s | 49 s | 142 | 75% |
| Herman Huang, sound | 7:22 | 141 | 2.2 s | 20 s | 206 | 90% |
| Andrew, simple editing | 5:14 | 57 | 2.6 s | 50 s | 213 | 97% |
| Jacob Nordin, sound | 10:36 | 181 | 2.8 s | 23 s | 190 | 93% |
| Gorillaz, by The Line | 8:43 | 93 | 3.5 s | 84 s | - | - |

A rough onset check found cuts landing on a loud sound no more often than chance in
most of these (22-37% against about 40%; Gorillaz 48%). The tool is crude and misses
soft beats, but "cut on every beat" isn't what these films visibly do. Check by ear
before making it a rule.

## Patterns seen in several films

| Pattern | What it looks like | Seen in | Why it works (inferred) |
|---|---|---|---|
| **Carried or cut, choose a school** | Explainers barely cut: the world moves (Kurzgesagt, one cut about every 30 s). Apple cuts every 4 s or so, but the white void and hands hide it. Maker films cut often and visibly, with long holds | Carried: Kurzgesagt, Apple. Rhythmic: Barney, Tinariwen, Herman | Nothing to notice between moments. It's the opposite of the jump-cut films Elias disliked |
| **A physical carrier between moments** | A hand, a photo pulled through frame, a seat passing close, an object growing into the next scene | Apple's hands; RIMOWA's photograph and foreground pass | The eye follows the object, so the change of place feels earned |
| **Screens as objects** | Interface shot close, tilted, in shallow focus, with a cursor in it. Or touched: a hand pinches an icon, stretches a window, and pieces of it fall | Ermia (upload screen through a lens), Herman, Apple | A flat screen recording looks like a recording. An object has weight, and you want to touch it |
| **Words live in the world** | Written on a window, a notebook, a highlighted book page, a banner carried by birds, labels on a desk collage | Ermia, Kurzgesagt, Andrew | Text becomes part of the story rather than a layer on top |
| **Full-colour cards as chapters** | Solid colour filling the frame, wide-tracked white type, a progress marker. The same design each time | Barney (deep red, then ultramarine), Kurzgesagt (navy with progress dots), Herman (numbered tiles, current one red) | Rest for the eye, and a promise kept: you know where you are |
| **Colour marks the chapters** | Each section has one dominant hue, across the whole frame. Or one flip at the turn | Tinariwen (yellow, red, green, blue, purple), Kurzgesagt (a room per chapter), Gorillaz (green jungle, then blue on black) | Change you feel before you can name it |
| **One colour family** | Everything pulled into a grade, found images too. Barney: teal shadow, orange light. Ermia: amber with cool screens. Apple: white void, one lime object | All | Cohesion reads as intent |
| **Long hold, then burst** | 18 s of talking, then a run of 0.1-0.2 s frames | Barney at 2:27, Tinariwen, Herman's opening | Contrast is the energy. Even pacing has none |
| **A home frame that returns** | One composition comes back with the light changed; or a tree grows through the film | Barney's room (bright, then lamp-lit), Andrew's lamp, Kurzgesagt's tree | Change becomes visible (I22) |
| **A recurring character** | Small birds do every job in the film | Kurzgesagt | They hold a long explanation together |
| **Hand-made inserts** | Real paintings, prints and notebooks, shot at odd angles and close | Barney, Andrew's desk collage, ManvsMachine's patches | The effort is visible |
| **A hold to open** | The first shot runs long | Gorillaz 35 s, Barney 18 s | Only for an audience already there, so not for a feed opener |

Contrast within the list: Apple's white void and Kurzgesagt's saturated flat colour are
bright; Ermia's and Barney's frames are mostly dark (over 70% of Ermia's frames are
near-black or deep brown). Both read as premium, so choose one.

## The voice that ties a film together

| Kind | Example | Pace | Fits |
|---|---|---|---|
| A conversation, one voice questioning the other | Ermia Ramez | 142, with long gaps | Feeling and story |
| Dry first person, self-mocking | Barney Watts | 164 | Maker and personal |
| Calm narrator who never hurries | Kurzgesagt | 160 | Explaining |
| Talks to itself: "but how?" | Andrew | 213, almost no gaps | Tutorials |
| Quick and direct | Herman Huang | 206 | Tutorials |

The two slower ones leave room for image and music. Fast voices keep attention on the
words; they suit how-to films, and they use up the space sound needs. See `voice.md`.

## Named people and work to follow

Andrew credits Gawx, *The Bear* S3 E1, the A24 *Heretic* trailer (record shots), Bryan
Hynes (shot sequence), Casey Neistat, Sam Kolder, Sleepy Charlie, Life of Riza and Jake
Frew. Barney points at Wong Kar-wai, Hitchcock, Hopper and Bacon. Ermia names Rubin,
Kleon, Abdaal and Soderbergh. Both Ermia and Barney use Dehancer for film look; both
videos carry its discount code, so that is a tip, not proof. Ben Marriott's list is in
`../../references/watch-list.md`.

## Copyright

Study copies and frame sheets stay on the machine that made them, and are not
committed or published. A review page links to timestamps and uses our own
re-creations of the idea.
