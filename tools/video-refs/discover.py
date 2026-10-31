#!/usr/bin/env python3
# YouTube search with view counts, to find what to read next. Prints: views | length | year | channel | title | id
import json, subprocess, sys
for q in sys.argv[1:]:
    print("## " + q)
    r = subprocess.run(["yt-dlp", "--no-warnings", "--flat-playlist", "--dump-json", f"ytsearch25:{q}"], capture_output=True, text=True, stdin=subprocess.DEVNULL, timeout=120)
    rows = []
    for l in r.stdout.splitlines():
        try: d = json.loads(l)
        except Exception: continue
        rows.append((d.get("view_count") or 0, d.get("duration") or 0, d.get("channel") or "", d.get("title") or "", d.get("id")))
    for v, dur, ch, t, i in sorted(rows, reverse=True)[:9]:
        print(f"{v//1000}k | {int(dur)//60}m | {ch[:24]} | {t[:80]} | {i}")
