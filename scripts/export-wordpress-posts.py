import re
import html
from pathlib import Path

# XML source to parse
xml_path = Path('/Users/marcopellegrini/Downloads/suegiperl039italia.WordPress.2026-08-17.xml')
out_path = Path('/Users/marcopellegrini/Repository/Marco_website/src/data/blog-imported.ts')

if not xml_path.exists():
    raise FileNotFoundError(f'XML not found: {xml_path}')

text = xml_path.read_text(encoding='utf-8', errors='ignore')
blocks = re.findall(r'<item>(.*?)</item>', text, flags=re.S)


def clean_text(raw: str) -> str:
    cleaned = raw
    cleaned = re.sub(r'<!--.*?-->', '', cleaned, flags=re.S)
    cleaned = re.sub(r'<figure.*?</figure>', '', cleaned, flags=re.S)
    cleaned = re.sub(r'<script.*?</script>', '', cleaned, flags=re.S)
    cleaned = re.sub(r'<style.*?</style>', '', cleaned, flags=re.S)
    cleaned = re.sub(r'<br\s*/?>', '\n', cleaned, flags=re.I)
    cleaned = re.sub(r'</p>|</div>|</li>|</blockquote>|</h[1-6]>', '\n\n', cleaned, flags=re.I)
    cleaned = re.sub(r'<p[^>]*>|<div[^>]*>|<li[^>]*>|<blockquote[^>]*>|<h[1-6][^>]*>', '\n', cleaned, flags=re.I)
    cleaned = re.sub(r'<strong[^>]*>|<b[^>]*>', '', cleaned, flags=re.I)
    cleaned = re.sub(r'</strong>|</b>', '', cleaned, flags=re.I)
    cleaned = re.sub(r'<em[^>]*>|<i[^>]*>', '', cleaned, flags=re.I)
    cleaned = re.sub(r'</em>|</i>', '', cleaned, flags=re.I)
    cleaned = re.sub(r'<a[^>]*>', '', cleaned, flags=re.I)
    cleaned = re.sub(r'</a>', '', cleaned, flags=re.I)
    cleaned = re.sub(r'<[^>]+>', '', cleaned)
    cleaned = html.unescape(cleaned)
    cleaned = cleaned.replace('\xa0', ' ')
    cleaned = re.sub(r'\n\s*\n+', '\n\n', cleaned)
    cleaned = re.sub(r'[ \t]+\n', '\n', cleaned)
    return cleaned.strip()


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = html.unescape(value)
    value = re.sub(r'[^a-z0-9\s-]', '', value)
    value = re.sub(r'\s+', '-', value)
    value = re.sub(r'-+', '-', value)
    return value.strip('-')


def first_image_url(raw_html: str) -> str:
    match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', raw_html, flags=re.I)
    if match:
        return match.group(1)
    return 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80'


def extract_region(block: str) -> str:
    categories = re.findall(r'<category[^>]*>\<!\[CDATA\[(.*?)\]\]\></category>', block, flags=re.S)
    for cat in categories:
        clean = cat.strip()
        if clean and clean.lower() not in {'italia', 'post_tag', 'viaggio'}:
            return clean
    # fallback based on title keywords
    title_match = re.search(r'<title><!\[CDATA\[(.*?)\]\]></title>', block, flags=re.S)
    if title_match:
        title = title_match.group(1)
        lower = title.lower()
        if 'lucca' in lower:
            return 'Toscana'
        if 'dolomiti' in lower or 'trentino' in lower or 'alto adige' in lower:
            return 'Trentino-Alto Adige'
        if 'verona' in lower or 'veneto' in lower or 'garda' in lower or 'lessinia' in lower:
            return 'Veneto'
        if 'firenze' in lower or 'toscana' in lower or 'val d\'orcia' in lower or 'lucca' in lower:
            return 'Toscana'
        if 'napoli' in lower:
            return 'Campania'
        if 'livorno' in lower:
            return 'Toscana'
        if 'venezia' in lower:
            return 'Veneto'
        if 'torino' in lower:
            return 'Piemonte'
    return 'Italia'


records = []
for block in blocks:
    if '<wp:post_type><![CDATA[post]]></wp:post_type>' not in block:
        continue

    title_match = re.search(r'<title><!\[CDATA\[(.*?)\]\]></title>', block, flags=re.S)
    if not title_match:
        continue
    title = title_match.group(1).strip()
    if not title:
        continue

    slug_match = re.search(r'<wp:post_name><!\[CDATA\[(.*?)\]\]></wp:post_name>', block, flags=re.S)
    date_match = re.search(r'<wp:post_date><!\[CDATA\[(.*?)\]\]></wp:post_date>', block, flags=re.S)
    content_match = re.search(r'<content:encoded><!\[CDATA\[(.*?)\]\]></content:encoded>', block, flags=re.S)
    if not content_match:
        continue

    slug = slug_match.group(1) if slug_match else slugify(title)
    date = date_match.group(1) if date_match else '2025-01-01 00:00:00'
    raw_html = content_match.group(1)
    clean = clean_text(raw_html)
    paragraphs = [p.strip() for p in re.split(r'\n\s*\n+', clean) if p.strip()]
    if not paragraphs:
        paragraphs = [clean[:400].strip()]

    excerpt = paragraphs[0]
    if len(excerpt) > 220:
        excerpt = excerpt[:217].rstrip() + '...'

    image = first_image_url(raw_html)
    year = date[:4] if date else '2025'
    word_count = sum(len(p.split()) for p in paragraphs)
    minutes = max(3, round(word_count / 180))
    read_time = f'{minutes} min lettura'

    records.append({
        'slug': slug,
        'title': title,
        'excerpt': excerpt,
        'region': extract_region(block),
        'publishedAt': year,
        'readTime': read_time,
        'image': image,
        'sourceUrl': f'https://suegiuperlitalia.altervista.org/{slug}/',
        'body': paragraphs,
    })

out_path.parent.mkdir(parents=True, exist_ok=True)

lines = []
lines.append('export interface BlogPost {')
lines.append('  slug: string')
lines.append('  title: string')
lines.append('  excerpt: string')
lines.append('  region: string')
lines.append('  publishedAt: string')
lines.append('  readTime: string')
lines.append('  image: string')
lines.append('  sourceUrl: string')
lines.append('  body: string[]')
lines.append('}')
lines.append('')
lines.append('const posts: BlogPost[] = [')

for record in records:
    body_lines = []
    for paragraph in record['body']:
        safe = paragraph.replace('\\', '\\\\').replace('"', '\\"').replace("'", "\\'")
        safe = safe.replace('\n', ' ')
        body_lines.append(f"      '{safe}',")
    lines.append('  {')
    lines.append(f"    slug: '{record['slug']}',")
    lines.append(f"    title: '{record['title'].replace("\\", "\\\\").replace("'", "\\'")}',")
    lines.append(f"    excerpt: '{record['excerpt'].replace("\\", "\\\\").replace("'", "\\'")}',")
    lines.append(f"    region: '{record['region'].replace("\\", "\\\\").replace("'", "\\'")}',")
    lines.append(f"    publishedAt: '{record['publishedAt']}',")
    lines.append(f"    readTime: '{record['readTime']}',")
    lines.append(f"    image: '{record['image'].replace("\\", "\\\\").replace("'", "\\'")}',")
    lines.append(f"    sourceUrl: '{record['sourceUrl']}',")
    lines.append('    body: [')
    lines.extend(body_lines)
    lines.append('    ]')
    lines.append('  },')

lines.append(']')
lines.append('')
lines.append('export default posts')

out_path.write_text('\n'.join(lines) + '\n', encoding='utf-8')
print(f'Exported {len(records)} posts to {out_path}')
PY