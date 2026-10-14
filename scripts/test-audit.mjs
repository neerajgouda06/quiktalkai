/**
 * Production Readiness & Codebase Audit Test Suite for QuikTalk AI
 * Validates build artifacts, links, assets, headers, SEO, and security policies.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'dist');

let passedAssertions = 0;
let failedAssertions = 0;
const errors = [];

function assert(condition, message) {
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    errors.push(message);
    console.error(`  FAIL: ${message}`);
  }
}

console.log('\n--- 1. Testing Core Required Build Artifacts ---');
const expectedPages = [
  'index.html',
  '404.html',
  'privacy-policy/index.html',
  'terms-of-service/index.html',
  'services/ai-employees/index.html',
  'services/ai-infrastructure/index.html',
  'services/ai-workflows/index.html',
  'services/web-development/index.html',
  'industries/automotive/index.html',
  'industries/healthcare/index.html',
  'industries/hospitality/index.html',
  'industries/professional-services/index.html',
  'industries/real-estate/index.html',
  'industries/trades/index.html',
];

for (const page of expectedPages) {
  const full = join(dist, page);
  const exists = existsSync(full);
  assert(exists, `Expected HTML page exists: ${page}`);
  if (exists) {
    const size = statSync(full).size;
    assert(size > 500, `Page ${page} is non-trivial (size: ${size} bytes)`);
  }
}

console.log('\n--- 2. Auditing Static Assets Referenced in HTML ---');
const htmlFiles = [];
function findHtml(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) findHtml(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
findHtml(dist);

const assetRegex = /(?:src|href|data-src)="([^"#:?]+)"/g;
const checkedAssets = new Set();

for (const file of htmlFiles) {
  const content = readFileSync(file, 'utf8');
  const relPath = relative(dist, file).replace(/\\/g, '/');

  let match;
  while ((match = assetRegex.exec(content)) !== null) {
    const ref = match[1];
    // Skip external protocols and anchor-only links
    if (/^(https?:|mailto:|tel:|#)/i.test(ref)) continue;
    // Skip canonical or HTML document navigations (handled in link check)
    if (ref.endsWith('.html') || ref.endsWith('/')) continue;

    const cacheKey = `${relPath} -> ${ref}`;
    if (checkedAssets.has(cacheKey)) continue;
    checkedAssets.add(cacheKey);

    const targetFile = ref.startsWith('/') ? join(dist, ref) : resolve(dirname(file), ref);
    const exists = existsSync(targetFile);
    assert(exists, `Asset exists: "${ref}" referenced from ${relPath} (resolved: ${targetFile})`);
    if (exists) {
      assert(statSync(targetFile).size > 0, `Asset is non-empty: "${ref}"`);
    }
  }
}

console.log('\n--- 3. Auditing Internal Navigation & Href Routing ---');
const hrefRegex = /href="([^"#?]+)(?:#([^"]*))?"/g;
for (const file of htmlFiles) {
  const content = readFileSync(file, 'utf8');
  const relPath = relative(dist, file).replace(/\\/g, '/');

  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const targetUrl = match[1];
    if (!targetUrl || /^(https?:|mailto:|tel:)/i.test(targetUrl)) continue;

    // Resolve target path
    let targetPath;
    if (targetUrl.startsWith('/')) {
      targetPath = join(dist, targetUrl);
    } else {
      targetPath = resolve(dirname(file), targetUrl);
    }

    if (existsSync(targetPath)) {
      if (statSync(targetPath).isDirectory()) {
        const hasIndex = existsSync(join(targetPath, 'index.html'));
        assert(hasIndex, `Directory link "${targetUrl}" has index.html in ${relPath}`);
      } else {
        assert(true, `Direct file link "${targetUrl}" exists in ${relPath}`);
      }
    } else {
      assert(false, `Broken link "${targetUrl}" in ${relPath} (target does not exist: ${targetPath})`);
    }
  }
}

console.log('\n--- 4. Auditing SEO, Canonicals, Sitemap & Robots ---');
const sitemapPath = join(dist, 'sitemap.xml');
assert(existsSync(sitemapPath), 'sitemap.xml exists in dist/');
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  assert(!sitemap.includes('chatgpt.site'), 'sitemap.xml does not contain temporary chatgpt.site origin');
  assert(sitemap.includes('<urlset'), 'sitemap.xml has valid XML structure');
  
  // Verify all expected public routes are in sitemap
  for (const page of expectedPages) {
    if (page === '404.html') continue; // 404 should not be in sitemap
    const route = page === 'index.html' ? '/' : `/${page.replace('index.html', '')}`;
    assert(sitemap.includes(route), `sitemap.xml includes route: ${route}`);
  }
}

const robotsPath = join(dist, 'robots.txt');
assert(existsSync(robotsPath), 'robots.txt exists in dist/');
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, 'utf8');
  assert(robots.includes('User-agent: *'), 'robots.txt defines User-agent');
  assert(robots.includes('Sitemap:'), 'robots.txt references Sitemap');
  assert(!robots.includes('chatgpt.site'), 'robots.txt does not contain temporary chatgpt.site origin');
}

// Canonical check across all HTML pages
for (const file of htmlFiles) {
  const content = readFileSync(file, 'utf8');
  const relPath = relative(dist, file).replace(/\\/g, '/');
  assert(!content.includes('randhawa787.chatgpt.site'), `Page ${relPath} contains no obsolete chatgpt.site domain references`);
  const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)">/);
  assert(Boolean(canonicalMatch), `Page ${relPath} defines a canonical URL`);
  if (canonicalMatch) {
    assert(!canonicalMatch[1].includes('chatgpt.site'), `Canonical URL for ${relPath} is production-ready: ${canonicalMatch[1]}`);
  }
}

console.log('\n--- 5. Auditing Security Headers & Cloudflare Configuration ---');
const headersPath = join(dist, '_headers');
assert(existsSync(headersPath), '_headers file exists in dist/');
if (existsSync(headersPath)) {
  const headers = readFileSync(headersPath, 'utf8');
  assert(headers.includes('X-Content-Type-Options: nosniff'), '_headers includes nosniff');
  assert(headers.includes('X-Frame-Options: DENY'), '_headers includes X-Frame-Options: DENY');
  assert(headers.includes('Strict-Transport-Security'), '_headers includes HSTS');
  assert(headers.includes('Content-Security-Policy'), '_headers includes CSP');
  assert(headers.includes('Cache-Control'), '_headers includes Cache-Control directives');
}

const redirectsPath = join(dist, '_redirects');
assert(existsSync(redirectsPath), '_redirects file exists in dist/');

const wranglerPath = resolve(root, 'wrangler.toml');
assert(existsSync(wranglerPath), 'wrangler.toml exists in root');
if (existsSync(wranglerPath)) {
  const wrangler = readFileSync(wranglerPath, 'utf8');
  assert(wrangler.includes('pages_build_output_dir'), 'wrangler.toml specifies pages_build_output_dir');
  assert(wrangler.includes('quiktalkai'), 'wrangler.toml names project correctly');
}

console.log('\n--- 6. Auditing Schema.org JSON-LD Blocks ---');
for (const file of htmlFiles) {
  const content = readFileSync(file, 'utf8');
  const relPath = relative(dist, file).replace(/\\/g, '/');
  const jsonLdMatches = [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const match of jsonLdMatches) {
    try {
      const parsed = JSON.parse(match[1]);
      assert(Boolean(parsed['@context']), `JSON-LD in ${relPath} has valid @context`);
    } catch (err) {
      assert(false, `Invalid JSON-LD in ${relPath}: ${err.message}`);
    }
  }
}

console.log('\n======================================================');
console.log(`Audit Summary: ${passedAssertions} assertions passed, ${failedAssertions} failed.`);
console.log('======================================================');

if (failedAssertions > 0) {
  console.error('\nAudit failed with the following issues:');
  for (const err of errors) console.error(` - ${err}`);
  process.exit(1);
} else {
  console.log('\nAll checks passed successfully! Project is fully production-ready.');
  process.exit(0);
}
