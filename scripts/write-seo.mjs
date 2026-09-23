import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://wellnessfrontdoor.com';
const snapshot = JSON.parse(readFileSync(join(root, 'data/snapshot.json'), 'utf8'));
const today = new Date().toISOString().slice(0, 10);
const publicDir = join(root, 'public');
mkdirSync(publicDir, { recursive: true });

const needSlugs = [
  'stress-overwhelm',
  'pain-discomfort',
  'energize-restore',
  'detox-rejuvenate',
  'sleep-rest',
  'connect-belong',
  'beauty-skin',
  'movement-flow',
];

const urls = [
  ['/', '1.0', 'weekly'],
  ['/explore', '0.9', 'weekly'],
  ['/needs', '0.8', 'weekly'],
  ['/categories', '0.8', 'weekly'],
  ['/neighborhoods', '0.8', 'weekly'],
  ['/events', '0.5', 'weekly'],
  ['/how-it-works', '0.6', 'monthly'],
  ['/about', '0.6', 'monthly'],
  ['/benefits', '0.6', 'monthly'],
  ['/for-providers', '0.7', 'monthly'],
  ['/your-concierge', '0.6', 'monthly'],
  ['/join', '0.7', 'monthly'],
  ['/contact', '0.5', 'monthly'],
];

for (const slug of needSlugs) urls.push([`/needs/${slug}`, '0.7', 'weekly']);
for (const item of snapshot.categories ?? []) urls.push([`/categories/${item.slug}`, '0.6', 'weekly']);
for (const item of snapshot.neighborhoods ?? []) urls.push([`/neighborhoods/${item.slug}`, '0.7', 'weekly']);
for (const item of snapshot.providers ?? []) urls.push([`/providers/${item.id}`, '0.7', 'weekly']);
for (const item of snapshot.events ?? []) {
  if (item.id) urls.push([`/events/${item.id}`, '0.7', 'weekly']);
}

const seen = new Set();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .filter(([path]) => {
    if (seen.has(path)) return false;
    seen.add(path);
    return true;
  })
  .map(
    ([path, priority, changefreq]) => `  <url>
    <loc>${origin}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(publicDir, 'sitemap.xml'), xml);
writeFileSync(
  join(publicDir, 'robots.txt'),
  `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/

Sitemap: ${origin}/sitemap.xml
`
);

console.log(`SEO files written: ${seen.size} sitemap URLs`);
