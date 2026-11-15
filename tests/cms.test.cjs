const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

function loadTypes() {
  const compiled = ts.transpileModule(fs.readFileSync('lib/cms/types.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {};
  new Function('exports', compiled)(exports);
  return exports;
}
const { resolveCollection, safeContentUrl, emptyCmsSnapshot } = loadTypes();
const fallback = [{ id: 'leader-1', name: 'Existing leader', image: '/assets/church-bg-2.jpg', count: 10, active: true }];

test('unconfigured or empty CMS retains all local collections', () => {
  for (const value of [undefined, null, [], {}, [null], [false]]) assert.deepEqual(resolveCollection(value, fallback), fallback);
  assert.deepEqual(emptyCmsSnapshot(), { copy: {}, media: {}, links: {}, collections: {}, seo: {} });
});
test('partially edited collections preserve missing or blank fields', () => {
  const result = resolveCollection([{ id: 'leader-1', name: 'Published leader', image: '' }], fallback);
  assert.equal(result[0].name, 'Published leader');
  assert.equal(result[0].image, fallback[0].image);
});
test('zero counters and false settings are valid published values', () => {
  const result = resolveCollection([{ count: 0, active: false }], fallback);
  assert.equal(result[0].count, 0);
  assert.equal(result[0].active, false);
});
test('bad numeric values and wrong types cannot replace fallback fields', () => {
  const result = resolveCollection([{ count: -10, name: 15 }], fallback);
  assert.equal(result[0].count, 10);
  assert.equal(result[0].name, 'Existing leader');
});
test('published ordering and added items are retained', () => {
  const result = resolveCollection([{ id: 'b', name: 'Second' }, { id: 'a', name: 'First' }], fallback);
  assert.deepEqual(result.map(item => item.id), ['b', 'a']);
});
test('gallery arrays ignore malformed or blank entries', () => {
  assert.deepEqual(resolveCollection(['', null, '/assets/new.jpg'], ['/assets/old.jpg']), ['/assets/new.jpg']);
  assert.deepEqual(resolveCollection(['', null], ['/assets/old.jpg']), ['/assets/old.jpg']);
});
test('CMS destinations reject executable and protocol-relative URLs', () => {
  for (const value of ['javascript:alert(1)', '//untrusted.example', 'data:text/html,hello']) assert.equal(safeContentUrl(value, '/'), '/');
  for (const value of ['/missions', '#gallery', 'https://example.com', 'tel:+233509081558', 'mailto:hello@example.com']) assert.equal(safeContentUrl(value, '/'), value);
});
test('every copy slot has a fallback and unique key', () => {
  const groups = JSON.parse(fs.readFileSync('content/cms-copy.json', 'utf8'));
  const keys = new Set();
  for (const group of groups) for (const entry of group.entries) {
    assert.ok(entry.text.trim());
    assert.ok(!keys.has(entry.key), `Duplicate copy key: ${entry.key}`);
    keys.add(entry.key);
  }
});

function serverWith(fetch) {
  const compiled = ts.transpileModule(fs.readFileSync('lib/cms/server.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {};
  new Function('require', 'exports', compiled)(name => {
    if (name === 'server-only') return {};
    if (name === 'react') return { cache: fn => fn };
    if (name === '@sanity/client') return { createClient: () => ({ fetch }) };
    if (name === './types') return loadTypes();
    throw new Error(`Unexpected dependency: ${name}`);
  }, exports);
  return exports;
}

test('server skips Sanity entirely without a project or dataset', async () => {
  const previous = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  try {
    const server = serverWith(() => { throw new Error('Should not fetch'); });
    assert.deepEqual(await server.getCmsContent(), emptyCmsSnapshot());
  } finally { if (previous !== undefined) process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = previous; }
});

test('server merges published content without applying empty copy or unsafe links', async () => {
  const previous = [process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, process.env.NEXT_PUBLIC_SANITY_DATASET];
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'example'; process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';
  try {
    const server = serverWith(async () => [
      { _type: 'pageCopy', entries: [{ key: 'heading', text: 'Published heading' }, { key: 'empty', text: '' }, null] },
      { _type: 'siteLink', source: '/', href: 'javascript:alert(1)' },
      { _type: 'collection_leaders', key: 'leaders', items: [{ name: 'New leader' }] },
    ]);
    const result = await server.getCmsContent();
    assert.equal(result.copy.heading, 'Published heading');
    assert.equal(result.copy.empty, undefined);
    assert.equal(result.links['/'], undefined);
    assert.equal(result.collections.leaders[0].name, 'New leader');
  } finally {
    for (const [index, name] of ['NEXT_PUBLIC_SANITY_PROJECT_ID', 'NEXT_PUBLIC_SANITY_DATASET'].entries()) { if (previous[index] === undefined) delete process.env[name]; else process.env[name] = previous[index]; }
  }
});

test('Sanity failure leaves a usable fallback snapshot', async () => {
  const previous = [process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, process.env.NEXT_PUBLIC_SANITY_DATASET];
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'example'; process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';
  const warn = console.warn;
  console.warn = () => {};
  try { assert.deepEqual(await serverWith(async () => { throw new Error('Unavailable'); }).getCmsContent(), emptyCmsSnapshot()); }
  finally {
    console.warn = warn;
    for (const [index, name] of ['NEXT_PUBLIC_SANITY_PROJECT_ID', 'NEXT_PUBLIC_SANITY_DATASET'].entries()) { if (previous[index] === undefined) delete process.env[name]; else process.env[name] = previous[index]; }
  }
});
