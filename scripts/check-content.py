"""Compare generated copy and links against a pre-redesign snapshot."""
from pathlib import Path
from html.parser import HTMLParser
import json
import sys

class Snapshot(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip = 0
        self.text = []
        self.links = []
        self.meta = []
        self.current = None

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag in ('script', 'style'):
            self.skip += 1
        if tag == 'a':
            self.current = [[], attributes.get('href')]
        if tag == 'meta' and attributes.get('name') != 'theme-color':
            self.meta.append([attributes.get('name') or attributes.get('property'), attributes.get('content')])

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip -= 1
        if tag == 'a' and self.current:
            self.links.append([' '.join(' '.join(self.current[0]).split()), self.current[1]])
            self.current = None

    def handle_data(self, data):
        if not self.skip:
            self.text.append(data)
            if self.current:
                self.current[0].append(data)

root = Path(__file__).resolve().parents[1] / 'dist'
baseline = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
failures = []
pages = sorted(root.rglob('*.html'))
for path in pages:
    snapshot = Snapshot()
    snapshot.feed(path.read_text(encoding='utf-8'))
    current = {'text': ' '.join(' '.join(snapshot.text).split()), 'links': snapshot.links, 'meta': snapshot.meta}
    original = baseline.get(str(path.relative_to(root)))
    for field in current:
        if not original or original[field] != current[field]:
            failures.append(f'{path.relative_to(root)}: {field} changed')
if len(pages) != len(baseline):
    failures.append('Page count changed')
if failures:
    raise SystemExit('\n'.join(failures))
print(f'Content preserved: all text, link labels, destinations and metadata match on {len(pages)} pages.')
