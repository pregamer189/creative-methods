#!/usr/bin/env python3
# One frame per shot, tiled with timecodes, plus the film's main colours. For study by eye.
# usage: shots.py film.mp4 out-dir [scene-threshold=0.3] [columns=8]
# Needs ffmpeg and Pillow. Numbers come from the file; what you conclude from looking is inferred.
import subprocess, sys, os, re
from PIL import Image, ImageDraw
f, out = sys.argv[1], sys.argv[2]
thr = sys.argv[3] if len(sys.argv) > 3 else "0.3"
cols = int(sys.argv[4]) if len(sys.argv) > 4 else 8
os.makedirs(out, exist_ok=True)
dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], text=True))
log = subprocess.run(["ffmpeg", "-hide_banner", "-nostdin", "-i", f, "-filter:v", f"select='gt(scene,{thr})',showinfo", "-an", "-f", "null", "-"], capture_output=True, text=True).stderr
cuts = [float(x) for x in re.findall(r"pts_time:([0-9.]+)", log)]
edges = [0.0] + cuts + [dur]
shots = [(a, b) for a, b in zip(edges, edges[1:]) if b - a > 0.04]
lens = sorted(b - a for a, b in shots)
print(f"{os.path.basename(f)}: {dur:.0f} s, {len(shots)} shots, median {lens[len(lens)//2]:.2f} s, mean {dur/len(shots):.2f} s, longest {lens[-1]:.1f} s, under 1 s: {sum(l<1 for l in lens)}")
open(f"{out}/shots.txt", "w").write("\n".join(f"{a:.2f} {b-a:.2f}" for a, b in shots))
W, H = 240, 135
per = cols * 10
for page in range(0, len(shots), per):
    part = shots[page:page + per]
    sheet = Image.new("RGB", (cols * W, ((len(part) + cols - 1) // cols) * H), "black")
    for i, (a, b) in enumerate(part):
        p = subprocess.run(["ffmpeg", "-hide_banner", "-nostdin", "-v", "error", "-ss", f"{(a+b)/2:.2f}", "-i", f, "-frames:v", "1", "-vf", f"scale={W}:{H}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
        if len(p) != W * H * 3: continue
        im = Image.frombytes("RGB", (W, H), p); d = ImageDraw.Draw(im)
        d.rectangle([0, 0, 76, 12], fill="black"); d.text((3, 1), f"{int(a)//60}:{int(a)%60:02d} {b-a:.1f}s", fill="white")
        sheet.paste(im, ((i % cols) * W, (i // cols) * H))
    sheet.save(f"{out}/shots-{page//per+1}.jpg", quality=80)
# main colours from frames across the film
frames = []
for t in [dur * (i + .5) / 40 for i in range(40)]:
    p = subprocess.run(["ffmpeg", "-hide_banner", "-nostdin", "-v", "error", "-ss", f"{t:.1f}", "-i", f, "-frames:v", "1", "-vf", "scale=64:36", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
    if len(p) == 64 * 36 * 3: frames.append(Image.frombytes("RGB", (64, 36), p))
if frames:
    all_ = Image.new("RGB", (64, 36 * len(frames)))
    for i, fr in enumerate(frames): all_.paste(fr, (0, i * 36))
    q = all_.quantize(colors=6, method=Image.Quantize.MEDIANCUT); pal = q.getpalette(); cnt = sorted(q.getcolors(), reverse=True)
    tot = sum(c for c, _ in cnt)
    print("colours:", "  ".join(f"#{pal[i*3]:02x}{pal[i*3+1]:02x}{pal[i*3+2]:02x} {100*c//tot}%" for c, i in cnt))
