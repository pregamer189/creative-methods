#!/usr/bin/env python3
# Pace of the voice from a timed caption file (.vtt): words a minute, pauses, gaps with no speech.
# usage: voice_stats.py captions.vtt [window-seconds=60]
import re, sys
s = open(sys.argv[1], encoding="utf8").read()
win = int(sys.argv[2]) if len(sys.argv) > 2 else 60
words = []
for m in re.finditer(r"(\d\d):(\d\d):(\d\d)\.(\d+) --> .*?\n(.*?)(?:\n\n|\Z)", s, re.S):
    start = int(m[1]) * 3600 + int(m[2]) * 60 + int(m[3]) + int(m[4]) / 1000
    body = m[5]
    if "<c>" in body or re.search(r"<\d\d:", body):
        last = body.strip().split("\n")[-1]
        first = re.split(r"<\d\d:", last)[0]
        first = re.sub(r"<[^>]+>", "", first).strip()
        if first: words += [(start, w) for w in first.split()]
        for ts, w in re.findall(r"<(\d\d:\d\d:\d\d\.\d+)><c>\s*(.*?)</c>", last):
            h, mi, se = ts.split(":"); words.append((int(h) * 3600 + int(mi) * 60 + float(se), w.strip()))
words = [(t, w) for t, w in words if not re.fullmatch(r"\[.*\]|&gt;&gt;", w) and w]
if not words: print("no word timing in this file"); sys.exit()
end = words[-1][0]
gaps = [(a[0], b[0] - a[0]) for a, b in zip(words, words[1:]) if b[0] - a[0] >= 1.0]
big = [(t, g) for t, g in gaps if g >= 4]
speech = end - sum(g for _, g in big)
print(f"{len(words)} words, {len(words) / (speech / 60):.0f} words a minute while speaking, {100 * speech / end:.0f}% of the film has speech")
print(f"pauses of 1 s or more: {sum(1 for _, g in gaps if g < 4)}; stretches of 4 s or more with no words: {len(big)}")
print("longest no-word stretches:", ", ".join(f"{int(t)//60}:{int(t)%60:02d} for {g:.0f} s" for t, g in sorted(big, key=lambda x: -x[1])[:6]))
print(f"words a minute per {win} s:", " ".join(str(sum(1 for t, _ in words if i <= t < i + win) * 60 // win) for i in range(0, int(end) + 1, win)))
