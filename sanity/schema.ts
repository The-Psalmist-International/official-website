import { defineArrayMember, defineField, defineType, type FieldDefinition, type SchemaTypeDefinition } from 'sanity';
import collections from '@/content/cms-collections.json';

const title = (value: string) => value.replace(/([A-Z])/g, ' $1').replace(/^./, letter => letter.toUpperCase());
const collectionTypes: SchemaTypeDefinition[] = Object.entries(collections).map(([key, items]) => {
  const sample = items[0];
  const stringItems = typeof sample === 'string';
  const fields: FieldDefinition[] = stringItems ? [] : Object.entries(sample).filter(([field]) => !field.startsWith('_')).map(([name, value]) => defineField({
    name, title: title(name), type: typeof value === 'number' ? 'number' : typeof value === 'boolean' ? 'boolean' : ['description', 'text', 'bio', 'summary'].includes(name) ? 'text' : 'string',
    description: ['image', 'src'].includes(name) ? 'Existing local path or image URL. Use the image upload field below to replace it.' : undefined,
  } as FieldDefinition));
  if (!stringItems) {
    if ('image' in sample) fields.push(defineField({ name: 'imageAsset', title: 'Upload image', type: 'image', options: { hotspot: true } }));
    if ('src' in sample) fields.push(defineField({ name: 'srcAsset', title: 'Upload image', type: 'image', options: { hotspot: true } }));
    if (key === 'leaders') fields.push(defineField({ name: 'bio', title: 'Brief biography', type: 'text' }));
    if (key === 'resources') fields.push(defineField({ name: 'pdfAsset', title: 'Downloadable PDF', type: 'file', options: { accept: 'application/pdf' } }));
  }
  return defineType({
    name: `collection_${key}`, title: title(key), type: 'document',
    fields: [
      defineField({ name: 'key', title: 'Collection', type: 'string', initialValue: key, readOnly: true, validation: rule => rule.required() }),
      defineField({ name: 'items', title: 'Items (drag to reorder)', type: 'array', validation: rule => rule.min(1), of: [stringItems ? defineArrayMember({ type: 'string' }) : defineArrayMember({
        type: 'object', name: `${key}Item`, fields,
        preview: { select: { title: 'name', titleAlt: 'title', label: 'label', subtitle: 'role', media: 'imageAsset' }, prepare: ({ title: name, titleAlt, label, subtitle, media }) => ({ title: name || titleAlt || label || title(key), subtitle, media }) },
      })] }),
    ],
    preview: { prepare: () => ({ title: title(key), subtitle: 'Published items replace the local fallback list' }) },
  });
});

export const schemaTypes: SchemaTypeDefinition[] = [
  defineType({ name: 'pageSeo', title: 'Page titles & descriptions', type: 'document', fields: [
    defineField({ name: 'key', title: 'Page', type: 'string', readOnly: true }),
    defineField({ name: 'title', title: 'Browser / search title', type: 'string' }),
    defineField({ name: 'description', title: 'Search description', type: 'text' }),
  ], preview: { select: { title: 'key', subtitle: 'title' } } }),
  defineType({ name: 'pageCopy', title: 'Page & section copy', type: 'document', fields: [
    defineField({ name: 'title', title: 'Section', type: 'string', readOnly: true }),
    defineField({ name: 'source', title: 'Content source', type: 'string', readOnly: true }),
    defineField({ name: 'entries', title: 'Text fields', type: 'array', of: [defineArrayMember({ type: 'object', name: 'copyEntry', fields: [
      defineField({ name: 'key', type: 'string', hidden: true, readOnly: true }),
      defineField({ name: 'original', title: 'Original copy (reference)', type: 'text', readOnly: true }),
      defineField({ name: 'text', title: 'Published copy', type: 'text', description: 'Leave empty to use the existing website copy.' }),
    ], preview: { select: { title: 'original', subtitle: 'text' } } })] }),
  ], preview: { select: { title: 'title' } } }),
  defineType({ name: 'siteMedia', title: 'Website images', type: 'document', fields: [
    defineField({ name: 'source', title: 'Original image path', type: 'string', readOnly: true }),
    defineField({ name: 'image', title: 'Replacement image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'alt', title: 'Image description', type: 'string' }),
  ], preview: { select: { title: 'source', media: 'image' } } }),
  defineType({ name: 'siteLink', title: 'Website links', type: 'document', fields: [
    defineField({ name: 'source', title: 'Original destination', type: 'string', readOnly: true }),
    defineField({ name: 'href', title: 'Destination', type: 'string', validation: rule => rule.custom(value => !value || /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(value) || 'Use a page path, anchor, https://, mailto:, or tel: link.') }),
  ], preview: { select: { title: 'source', subtitle: 'href' } } }),
  ...collectionTypes,
];
