#!/bin/bash
# Resize (max 1600px on the long side) and recompress every blog-import image
# in place. PNGs (no transparency in this set) are converted to JPEG, which
# is much smaller for photos; conversions are logged to png-to-jpg.log so
# source references can be updated afterwards.
set -euo pipefail
cd "$(dirname "$0")/../public/images/blog-import"

LOG="../../../scripts/png-to-jpg.log"
: > "$LOG"

shopt -s nullglob
for f in *.jpg *.jpeg *.JPG *.JPEG; do
  sips -Z 1600 -s formatOptions 78 "$f" >/dev/null
done

for f in *.png *.PNG; do
  base="${f%.*}"
  sips -Z 1600 -s format jpeg -s formatOptions 78 "$f" --out "${base}.jpg" >/dev/null
  rm "$f"
  echo "${f} -> ${base}.jpg" >> "$LOG"
done

echo "done. new total size:"
du -sh .
