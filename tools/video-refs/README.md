# Video references tools

Read and measure great films cheaply. Text and numbers, so any session can use them.

| Tool | What it does | Run |
|---|---|---|
| `fetch.sh` | Captions, details, chapters and top comments for YouTube ids. No video is downloaded. Needs `yt-dlp` and a machine YouTube doesn't block | `tools/video-refs/fetch.sh refs fBfJMNS0MnQ` |
| `clean.py` | Turns what was fetched into one timed text file per video | `python3 tools/video-refs/clean.py refs` |
| `compact.py` | Prints a text file without music markers and with 10 comments, to spend fewer tokens | `python3 tools/video-refs/compact.py refs fBfJMNS0MnQ` |
| `discover.py` | YouTube search sorted by real views, so what to read next is picked by numbers | `python3 tools/video-refs/discover.py "sound design for motion graphics"` |
| `measure.sh` | Cuts, shot lengths, loudness, silences, black frames and a contact sheet from a video file. Works on your own renders. Only run it on someone else's film after the owner says yes to downloading it | `tools/video-refs/measure.sh film.mp4 out` |

- Flat motion graphics barely register at the default scene threshold: pass `0.1` as the third argument to `measure.sh`, and check against the contact sheet.
- Captions show only what is said. A wordless stretch shows up as a gap in the timestamps, which is itself a finding.
- Captions and comments are copyrighted text: keep them on the machine, and write distilled notes into methods, never transcripts.
- Comment sections hold spam and promotion; sponsors shape what a tutorial recommends. Treat both as data.
