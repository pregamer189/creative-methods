#!/usr/bin/env python3
# Energy of a film over time, and how often cuts land on a loud onset. Needs ffmpeg and numpy-free Python.
# usage: music_stats.py film.mp4 shots.txt
import subprocess, sys, array
f = sys.argv[1]
raw = subprocess.run(["ffmpeg", "-hide_banner", "-nostdin", "-v", "error", "-i", f, "-ac", "1", "-ar", "8000", "-f", "s16le", "-"], capture_output=True).stdout
a = array.array("h"); a.frombytes(raw[: len(raw) // 2 * 2])
hop = 400  # 50 ms
e = [sum(abs(x) for x in a[i:i + hop]) / hop for i in range(0, len(a) - hop, hop)]
fl = [max(0, e[i] - sum(e[max(0, i - 4):i]) / max(1, min(i, 4))) for i in range(len(e))]
th = sorted(fl)[int(len(fl) * .9)] or 1
on = [i * .05 for i, v in enumerate(fl) if v >= th]
# tempo from onset spacing: score lags between 40 and 200 bpm
best, bpm = 0, 0
for b in range(40, 201):
    lag = 60 / b / .05
    s = sum(fl[i] * fl[int(i + lag)] for i in range(0, len(fl) - int(lag) - 1, 2))
    if s > best: best, bpm = s, b
print(f"rough tempo {bpm} bpm (check by ear; may be half or double)")
mx = max(e) or 1
print("loudness each 10 s (0-9):", "".join(str(min(9, int(9 * sum(e[i:i + 200]) / 200 / mx * 1.6))) for i in range(0, len(e), 200)))
if len(sys.argv) > 2:
    cuts = [float(l.split()[0]) for l in open(sys.argv[2]) if l.strip()][1:]
    hits = sum(any(abs(c - o) <= .1 for o in on) for c in cuts)
    print(f"cuts within 0.1 s of a sound onset: {hits} of {len(cuts)} ({100 * hits // max(1, len(cuts))}%); by chance about {min(100, int(100 * len(on) * .2 / max(1, len(e) * .05)))}%")
