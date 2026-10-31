#!/usr/bin/env python3
# Turn a yt-dlp vtt + info.json into one short readable text file: details, timed transcript, top comments.
import json, re, sys, glob, os
base = sys.argv[1]  # the out-dir given to fetch.sh
raw = os.path.join(base, "raw")
out = os.path.join(base, "text")
os.makedirs(out, exist_ok=True)
def vtt(path, step=20):
    seen, lines = [], []
    bucket_t, bucket = None, []
    for block in open(path, encoding="utf8").read().split("\n\n"):
        m = re.search(r"(\d\d):(\d\d):(\d\d)\.\d+ -->", block)
        if not m: continue
        t = int(m[1])*3600 + int(m[2])*60 + int(m[3])
        for l in block.split("\n")[1:]:
            if "-->" in l: continue
            l = re.sub(r"<[^>]+>", "", l).strip()
            if not l or (seen and l in seen[-3:]): continue
            seen.append(l)
            if bucket_t is None: bucket_t = t
            bucket.append(l)
            if t - bucket_t >= step:
                lines.append(f"[{bucket_t//60}:{bucket_t%60:02d}] " + " ".join(bucket)); bucket_t, bucket = None, []
    if bucket: lines.append(f"[{bucket_t//60}:{bucket_t%60:02d}] " + " ".join(bucket))
    return "\n".join(lines)
for info in glob.glob(raw + "/*.info.json"):
    vid = os.path.basename(info).split(".")[0]
    d = json.load(open(info, encoding="utf8"))
    subs = [f"{raw}/{vid}.{s}.vtt" for s in ("en-orig","en","en-US","en-GB")]
    sub = next((s for s in subs if os.path.exists(s)), None)
    cm = sorted(d.get("comments") or [], key=lambda c: -(c.get("like_count") or 0))[:25]
    with open(f"{out}/{vid}.txt", "w", encoding="utf8") as f:
        f.write(f"{d.get('title')} | {d.get('channel')} | views {d.get('view_count')} | {d.get('upload_date')} | {d.get('duration_string')}\n\nDESCRIPTION\n{(d.get('description') or '')[:3000]}\n\n")
        if d.get("chapters"): f.write("CHAPTERS\n" + "\n".join(f"{int(c['start_time'])//60}:{int(c['start_time'])%60:02d} {c['title']}" for c in d["chapters"]) + "\n\n")
        f.write("TRANSCRIPT\n" + (vtt(sub) if sub else "(none)") + "\n\nTOP COMMENTS\n")
        for c in cm: f.write(f"({c.get('like_count')}) {c.get('text','')[:400]}\n")
