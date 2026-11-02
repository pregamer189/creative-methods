#!/bin/zsh
# Measure a film from the file itself: cuts, shot lengths, loudness, silences, black frames, and a contact sheet.
# Everything printed is MEASURED. Label anything you add by eye as inferred (methods/research/reference-analysis.md).
# usage: measure.sh film.mp4 [out-dir] [scene-threshold=0.3]
f=$1; out=${2:-measure}; thr=${3:-0.3}
mkdir -p "$out"
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of csv=p=0 "$f" | awk -v d="$dur" '{print "video: " $0 "  length: " d " s"}'
ffmpeg -hide_banner -nostdin -i "$f" -filter:v "select='gt(scene,$thr)',showinfo" -an -f null - 2>&1 | grep -o 'pts_time:[0-9.]*' | cut -d: -f2 > "$out/cuts.txt"
python3 - "$out/cuts.txt" "$dur" <<'PY'
import sys
cuts=[float(l) for l in open(sys.argv[1]) if l.strip()]; d=float(sys.argv[2])
e=[0]+cuts+[d]; s=sorted(b-a for a,b in zip(e,e[1:]))
if s:
    n=len(s); print(f"shots: {n}  mean: {sum(s)/n:.2f} s  median: {s[n//2]:.2f} s  shortest: {s[0]:.2f} s  longest: {s[-1]:.2f} s")
    print("shot lengths in order:", " ".join(f"{b-a:.1f}" for a,b in zip(e,e[1:])))
PY
ffmpeg -hide_banner -nostdin -i "$f" -af ebur128=peak=true -f null - 2>&1 | grep -E "^ +(I:|LRA:|Peak:)" | tr -s ' ' | tr '\n' ' '; echo
echo "silences (below -40 dB for 0.3 s or more):"; ffmpeg -hide_banner -nostdin -i "$f" -af silencedetect=n=-40dB:d=0.3 -f null - 2>&1 | grep -E "silence_end" | sed -E 's/.*silence_end: ([0-9.]+) \| silence_duration: ([0-9.]+)/  ends \1 s, lasts \2 s/'
echo "black frames:"; ffmpeg -hide_banner -nostdin -i "$f" -vf blackdetect=d=0.05 -an -f null - 2>&1 | grep -o 'black_start:[0-9.]* black_end:[0-9.]*' | sed 's/^/  /'
ffmpeg -hide_banner -nostdin -y -v error -i "$f" -vf "fps=2,scale=320:-1,tile=8x8" -frames:v 1 "$out/contact.jpg" && echo "contact sheet (2 frames a second, first 32 s): $out/contact.jpg"
echo "cuts listed in: $out/cuts.txt"
