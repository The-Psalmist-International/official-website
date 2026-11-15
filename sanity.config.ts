'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schema';
import collections from './content/cms-collections.json';

export default defineConfig({
  name: 'martyrs-church', title: 'The Martyrs Church', basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'unconfigured',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool({ structure: builder => builder.list().title('Website content').items([
    builder.documentTypeListItem('pageCopy').title('Page & section copy'),
    builder.documentTypeListItem('siteMedia').title('Website images'),
    builder.documentTypeListItem('siteLink').title('Website links'),
    builder.documentTypeListItem('pageSeo').title('SEO titles & descriptions'),
    builder.divider(),
    ...Object.keys(collections).map(key => builder.listItem().title(key.replace(/([A-Z])/g, ' $1').replace(/^./, letter => letter.toUpperCase())).child(builder.document().schemaType(`collection_${key}`).documentId(`collection-${key}`))),
  ]) })], schema: { types: schemaTypes },
  document: { newDocumentOptions: () => [] },
});
