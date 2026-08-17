import json
import re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
BLOG_TS = REPO / 'src' / 'data' / 'blog.ts'
IMAGES_JSON = REPO / 'scripts' / 'post-images.json'

images_by_slug = json.loads(IMAGES_JSON.read_text(encoding='utf-8'))
text = BLOG_TS.read_text(encoding='utf-8')

text = text.replace(
    '  image: string\n  sourceUrl: string\n',
    '  image: string\n  images: string[]\n  sourceUrl: string\n'
)

pattern = re.compile(
    r'"slug": "([^"]+)",\n'
    r'(\s+"title":[^\n]*\n\s+"excerpt":[^\n]*\n\s+"region":[^\n]*\n\s+"publishedAt":[^\n]*\n\s+"readTime":[^\n]*\n)'
    r'(\s+)"image": "([^"]*)",'
)

count = 0


def replace(match):
    global count
    slug, middle, indent, old_image = match.groups()
    imgs = images_by_slug.get(slug, [])
    new_image = imgs[0] if imgs else old_image
    count += 1
    images_literal = ', '.join(f'"{u}"' for u in imgs)
    return (
        f'"slug": "{slug}",\n'
        f'{middle}'
        f'{indent}"image": "{new_image}",\n'
        f'{indent}"images": [{images_literal}],'
    )


new_text = pattern.sub(replace, text)
BLOG_TS.write_text(new_text, encoding='utf-8')
print(f'patched {count} posts')
