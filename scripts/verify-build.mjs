import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const root = 'dist';
const origin = new URL(process.env.SITE_URL || 'https://yelen-blog.yelen4430.workers.dev').origin;
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);
}
const files = walk(root);
const pages = files.filter(p => p.endsWith('.html'));
const sitemap = readFileSync(join(root, 'sitemap-0.xml'), 'utf8');
for (const path of ['index.html', 'writing/index.html', 'projects/index.html', 'about/index.html', '404.html', 'rss.xml', 'robots.txt', 'sitemap-index.xml', 'sitemap-0.xml', 'build-info.json']) assert.ok(existsSync(join(root, path)), `Missing ${path}`);
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${file}: one h1`);
  for (const pattern of [/<title>[^<]+<\/title>/, /name="description" content="[^"]+"/, /name="viewport"/, /rel="canonical"/, /id="main-content"/, /href="#main-content"/]) assert.match(html, pattern, `${file}: missing ${pattern}`);
  const route = file === 'dist/index.html' ? '/' : '/' + file.slice(5).replace(/index\.html$/, '');
  if (file !== 'dist/404.html') {
    assert.ok(html.includes(`rel="canonical" href="${origin}${route}"`), `${file}: incorrect canonical`);
    assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`), `${file}: missing sitemap entry`);
  } else assert.match(html, /name="robots" content="noindex, follow"/);
  for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const asset = join(root, href);
    assert.ok(existsSync(asset) || existsSync(join(asset, 'index.html')), `${file}: broken internal link ${href}`);
  }
  if (file.includes('/writing/') && !file.endsWith('/writing/index.html')) {
    assert.match(html, /property="og:type" content="article"/);
    assert.match(html, /property="article:published_time"/);
  }
}
for (const file of ['rss.xml', 'sitemap-index.xml', 'sitemap-0.xml', 'robots.txt']) {
  const text = readFileSync(join(root, file), 'utf8');
  assert.ok(text.includes(origin), `${file}: production origin missing`);
  assert.ok(!text.includes('https://example.com'), `${file}: placeholder origin`);
}
const info = JSON.parse(readFileSync(join(root, 'build-info.json'), 'utf8'));
assert.match(info.commit, /^[a-f\d]{40}$/);
console.log(`Verified ${pages.length} HTML pages, internal links, SEO, feeds and build identity.`);
