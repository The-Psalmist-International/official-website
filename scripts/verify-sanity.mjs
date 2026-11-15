import nextEnv from '@next/env';
import { createClient } from '@sanity/client';

nextEnv.loadEnvConfig(process.cwd());
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const client = createClient({ projectId, dataset, token, apiVersion: '2025-02-19', useCdn: false, perspective: 'published' });
const documents = await client.fetch('*[!(_id in path("drafts.**"))]{_id,_type,key,entries}');
console.log(JSON.stringify({ projectId, dataset, documents: documents.length, copySections: documents.filter(doc => doc._type === 'pageCopy').length, copyFields: documents.filter(doc => doc._type === 'pageCopy').reduce((count, doc) => count + (doc.entries?.length || 0), 0), collections: documents.filter(doc => doc._type.startsWith('collection_')).length }));

if (process.argv.includes('--configure-cors')) {
  const endpoint = `https://api.sanity.io/v2025-02-19/projects/${projectId}/cors`;
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const response = await fetch(endpoint, { headers });
  if (!response.ok) throw new Error(`Unable to inspect Studio CORS origins (${response.status}).`);
  const existing = await response.json();
  for (const origin of ['http://localhost:3000', 'https://themartyrschurch.com', 'https://www.themartyrschurch.com']) {
    const current = existing.find(entry => entry.origin === origin);
    if (current) { console.log(JSON.stringify({ origin, allowCredentials: current.allowCredentials, existing: true })); continue; }
    const result = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify({ origin, allowCredentials: true }) });
    if (!result.ok) throw new Error(`Unable to add Studio CORS origin (${result.status}).`);
    console.log(JSON.stringify({ origin, allowCredentials: true, added: true }));
  }
}
