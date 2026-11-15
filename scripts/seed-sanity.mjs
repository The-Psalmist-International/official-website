import { createClient } from '@sanity/client';
import nextEnv from '@next/env';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

nextEnv.loadEnvConfig(process.cwd());
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const dryRun = process.argv.includes('--dry-run');
const json = async name => JSON.parse(await readFile(new URL(`../content/${name}`, import.meta.url), 'utf8'));
const hash = text => createHash('sha256').update(text).digest('hex').slice(0, 20);
const documents = [];
for (const seo of await json('cms-seo.json')) documents.push({ _id: `seo-${hash(seo.key)}`, _type: 'pageSeo', ...seo });
for (const section of await json('cms-copy.json')) documents.push({ _id: `copy-${hash(section.source)}`, _type: 'pageCopy', title: section.title, source: section.source, entries: section.entries.map(entry => ({ _key: hash(entry.key), _type: 'copyEntry', key: entry.key, original: entry.text, text: entry.text })) });
for (const source of await json('cms-media.json')) documents.push({ _id: `media-${hash(source)}`, _type: 'siteMedia', source });
for (const source of await json('cms-links.json')) documents.push({ _id: `link-${hash(source)}`, _type: 'siteLink', source, href: source });
for (const [key, items] of Object.entries(await json('cms-collections.json'))) documents.push({ _id: `collection-${key}`, _type: `collection_${key}`, key, items: items.map((item, index) => typeof item === 'string' ? item : { ...item, _type: `${key}Item`, _key: hash(`${key}-${item.id || index}`) }) });

if (dryRun) {
  console.log(JSON.stringify({ dryRun: true, documents: documents.length, copySections: documents.filter(doc => doc._type === 'pageCopy').length, collections: documents.filter(doc => doc._type.startsWith('collection_')).length }));
} else {
  if (!projectId || !dataset || !token) throw new Error('Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN before seeding.');
  const client = createClient({ projectId, dataset, token, apiVersion: '2025-02-19', useCdn: false });
  for (let offset = 0; offset < documents.length; offset += 40) {
    let transaction = client.transaction();
    for (const doc of documents.slice(offset, offset + 40)) transaction = transaction.createIfNotExists(doc);
    await transaction.commit();
  }
  // New copy slots may be added after the initial migration; append only missing keys.
  const existing = await client.fetch('*[_type == "pageCopy"]{_id,_rev,entries}');
  for (const doc of existing) {
    const local = documents.find(candidate => candidate._id === doc._id);
    if (!local) continue;
    const keys = new Set((doc.entries || []).map(entry => entry.key));
    const missing = local.entries.filter(entry => !keys.has(entry.key));
    if (missing.length) await client.patch(doc._id).ifRevisionId(doc._rev).setIfMissing({ entries: [] }).append('entries', missing).commit();
  }
  console.log(`Seeded ${documents.length} content documents without overwriting existing documents.`);
}
