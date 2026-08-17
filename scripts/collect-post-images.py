import json
import re
import html
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Optional

REPO = Path(__file__).resolve().parent.parent
XML_PATH = Path('/Users/marcopellegrini/Downloads/suegiperl039italia.WordPress.2026-08-17.xml')
LOCAL_DIR = REPO / 'public' / 'images' / 'blog-import'
OUT_PATH = REPO / 'scripts' / 'post-images.json'

text = XML_PATH.read_text(encoding='utf-8', errors='ignore')
blocks = re.findall(r'<item>(.*?)</item>', text, flags=re.S)
post_blocks = [b for b in blocks if '<wp:post_type><![CDATA[post]]></wp:post_type>' in b]

local_files = {f.name for f in LOCAL_DIR.iterdir() if f.is_file()}


def strip_size_suffix(name: str) -> str:
    return re.sub(r'-\d+x\d+(?=\.\w+$)', '', name)


def local_name_for(url: str) -> Optional[str]:
    base = html.unescape(url.split('/')[-1].split('?')[0])
    base = urllib.parse.unquote(base)
    if base in local_files:
        return base
    stripped = strip_size_suffix(base)
    if stripped in local_files:
        return stripped
    return None


def try_download(url: str) -> Optional[str]:
    """For URLs not present locally, attempt a live download. Returns the
    saved filename, or None if the source is unreachable/not an image."""
    base = html.unescape(url.split('/')[-1].split('?')[0])
    base = urllib.parse.unquote(base)
    target_name = strip_size_suffix(base)
    if not target_name or '.' not in target_name:
        return None
    target = LOCAL_DIR / target_name
    if target.exists():
        local_files.add(target_name)
        return target_name

    safe_url = urllib.parse.quote(url, safe=':/?&=%')
    req = urllib.request.Request(safe_url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            ctype = resp.headers.get('Content-Type', '')
            if not ctype.startswith('image/'):
                return None
            data = resp.read()
            if len(data) < 500:
                return None
            target.write_bytes(data)
            local_files.add(target_name)
            print(f'  downloaded {target_name} ({len(data)} bytes)')
            return target_name
    except Exception as exc:
        print(f'  FAILED {url[:80]} -> {exc}')
        return None


result = {}
total_imgs = 0
total_resolved = 0

for block in post_blocks:
    slug_match = re.search(r'<wp:post_name><!\[CDATA\[(.*?)\]\]></wp:post_name>', block, flags=re.S)
    content_match = re.search(r'<content:encoded><!\[CDATA\[(.*?)\]\]></content:encoded>', block, flags=re.S)
    if not slug_match or not content_match:
        continue
    slug = slug_match.group(1)
    raw = content_match.group(1)
    urls = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', raw, flags=re.I)

    seen = set()
    ordered_paths = []
    for u in urls:
        total_imgs += 1
        if u in seen:
            continue
        seen.add(u)
        name = local_name_for(u)
        if not name:
            name = try_download(u)
        if name:
            total_resolved += 1
            path = f'/images/blog-import/{name}'
            if path not in ordered_paths:
                ordered_paths.append(path)

    if ordered_paths:
        result[slug] = ordered_paths

OUT_PATH.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding='utf-8')
print(f'\nposts with images: {len(result)}')
print(f'image tags seen: {total_imgs}, resolved: {total_resolved}')
print(f'wrote {OUT_PATH}')
