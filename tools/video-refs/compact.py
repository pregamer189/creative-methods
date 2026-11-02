#!/usr/bin/env python3
# Print text files without music markers, with few comments, to keep reading cheap.
import re, sys, os
here = sys.argv[1]  # the out-dir given to fetch.sh
for vid in sys.argv[2:]:
    t = open(f"{here}/text/{vid}.txt", encoding="utf8").read()
    head, _, rest = t.partition("DESCRIPTION\n")
    desc, _, rest = rest.partition("TRANSCRIPT\n")
    tr, _, cm = rest.partition("TOP COMMENTS\n")
    tr = re.sub(r"&gt;&gt;|\[music\]|\[Music\]|\[__\]|&nbsp;__&nbsp;", "", tr)
    tr = re.sub(r"\n\[\d+:\d+\]\s*(?=\n)", "", tr)
    tr = re.sub(r" +", " ", tr)
    print("=== " + vid + " " + head.strip() + "\n" + tr.strip() + "\nCOMMENTS\n" + "\n".join(l[:220] for l in cm.splitlines()[:10]) + "\n")
