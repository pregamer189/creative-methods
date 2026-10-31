#!/bin/zsh
# Fetch captions, details and top comments for reference videos. Text only, no video.
# Run on a machine YouTube doesn't block (a laptop, not a cloud box).
# usage: fetch.sh <out-dir> <id> [<id>...]
out=$1; shift
mkdir -p "$out/raw"; cd "$out/raw" || exit 1
for id in "$@"; do
  yt-dlp --skip-download --no-warnings --ignore-errors \
    --write-info-json --write-subs --write-auto-subs --sub-langs "en,en-orig,en-US,en-GB" --sub-format vtt \
    --write-comments --extractor-args "youtube:max_comments=40,all,0,0;comment_sort=top" \
    --retries 2 --sleep-requests 1 \
    -o "%(id)s.%(ext)s" "https://www.youtube.com/watch?v=$id" </dev/null 2>&1 | tail -1 | cut -c1-120
done
