/* One-time migration of the accepted local design into editable content slots. */
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const crypto = require('node:crypto');
const hash = value => crypto.createHash('sha256').update(value).digest('hex').slice(0, 16);
const read = file => fs.readFileSync(file, 'utf8');
const collections = {};

function extract(file, variable) {
  const source = ts.createSourceFile(file, read(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let expression;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(source) === variable) expression = node.initializer?.getText(source);
    ts.forEachChild(node, visit);
  }
  visit(source);
  if (!expression) throw new Error(`Missing ${variable} in ${file}`);
  const js = ts.transpileModule(`const value = ${expression}; return value;`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
  return new Function(js)();
}

const configs = [
  ['components/LeadershipSection.tsx', 'leaders', 'leaders'],
  ['data/ministries.ts', 'ministries', 'ministries'],
  ['content/church-history.ts', 'churchHistory', 'churchHistory'],
  ['components/PurpleParallaxSection.tsx', 'events', 'events'],
  ['components/GlobalPresence.tsx', 'locations', 'locations'],
  ['components/VisionMissionCards.tsx', 'cards', 'visionMission'],
  ['components/SocialPreviewSection.tsx', 'moments', 'socialMoments'],
  ['components/AboutHeroSection.tsx', 'photos', 'aboutPhotos'],
  ['components/HomepageIntro.tsx', 'frames', 'introFrames'],
  ['components/MissionsGallery.tsx', 'images', 'missionGallery'],
  ['content/missions.ts', 'missionActivities', 'missionActivities'],
  ['content/missions.ts', 'missionMetrics', 'missionMetrics'],
  ['app/resources/page.tsx', 'resources', 'resources'],
  ['components/UpcomingService.tsx', 'services', 'serviceSchedule'],
  ['components/ChurchSiteEnding.tsx', 'quickLinks', 'footerLinks'],
];
for (const [file, variable, key] of configs) collections[key] = extract(file, variable);
const testimonyJs = ts.transpileModule(read('content/testimonies.ts'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const testimonyExports = {};
new Function('exports', testimonyJs)(testimonyExports);
collections.testimonies = testimonyExports.testimonies;
collections.wallTestimonies = testimonyExports.wallTestimonies;
collections.navigation = [
  { label: 'About', href: '/about-us' }, { label: 'Services', href: '/services' },
  { label: 'Missions', href: '/missions' }, { label: 'Discipleship', href: '/discipleship' },
  { label: 'Resources', href: '/resources' }, { label: 'Contact', href: '/contact' },
];
fs.writeFileSync('content/cms-collections.json', JSON.stringify(collections, null, 2) + '\n');

function jsxValue(value) {
  const js = ts.transpileModule(`const x = <p>${value}</p>`, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const source = ts.createSourceFile('x.js', js, ts.ScriptTarget.Latest, true);
  let text = '';
  function visit(node) {
    if (ts.isPropertyAssignment(node) && node.name.getText(source) === 'children' && ts.isStringLiteral(node.initializer)) text = node.initializer.text;
    ts.forEachChild(node, visit);
  }
  visit(source);
  return text;
}

const catalog = [];
const media = new Set();
const links = new Set();
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]); }
const activeFiles = [
  ...walk('app').filter(file => file.endsWith('page.tsx') || file.endsWith('not-found.tsx')),
  ...['AboutHeroSection','ChurchSiteEnding','ContactForm','CookieBanner','FloatingNavbar','GlobalPresence','HomepageIntro','JourneyTimeline','LeadershipSection','MinistriesSection','MissionsGallery','MissionsImpact','MissionsJoinButton','MissionsSupportButton','PurpleParallaxSection','ResourceBooks','ResourceShelfHero','ScrollRevealStatement','ServicesLibrary','SocialPreviewSection','TestimoniesSection','TestimonyButton','TestimonyWall','UpcomingService','VisionMissionCards','YouTubeStreamCard'].map(name => `components/${name}.tsx`),
];

for (const file of activeFiles) {
  let text = read(file);
  if (text.includes("@/components/cms/CmsText")) throw new Error(`Already migrated: ${file}`);
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const scope = file.replaceAll('\\', '/').replace(/\.tsx$/, '');
  const entries = new Map();
  const edits = [];
  function visit(node) {
    if (ts.isJsxText(node)) {
      const value = jsxValue(node.getText(source));
      if (/[A-Za-z]/.test(value) && value.trim().length > 1) {
        const key = `${scope}:${hash(value)}`;
        entries.set(key, { key, text: value });
        edits.push({ start: node.pos, end: node.end, value: `<CmsText id=${JSON.stringify(key)} fallback=${JSON.stringify(value)} />` });
      }
    }
    if (ts.isStringLiteral(node)) {
      if (/^\/assets\//.test(node.text)) media.add(node.text);
      if (/^(https?:\/\/|mailto:|tel:)/.test(node.text) && !node.text.includes('googleapis.com') && !node.text.includes('/embed/') && !node.text.includes('maps.google.com/maps')) links.add(node.text);
      if (node.parent && ts.isJsxAttribute(node.parent) && node.parent.name.getText(source) === 'href' && /^\/(?!\/)/.test(node.text)) links.add(node.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  for (const edit of edits.sort((a, b) => b.start - a.start)) text = text.slice(0, edit.start) + edit.value + text.slice(edit.end);
  const imports = [];
  if (entries.size) { imports.push("import CmsText from '@/components/cms/CmsText';"); catalog.push({ source: scope, title: scope.replace(/^components\//, '').replace(/^app\//, '').replace(/\/page$/, ' page'), entries: [...entries.values()] }); }
  text = text.replace(/from (["'])next\/image\1/g, "from '@/components/cms/CmsImage'");
  text = text.replace(/from (["'])next\/link\1/g, "from '@/components/cms/CmsLink'");
  if (/<a[\s>]/.test(text)) {
    imports.push("import CmsLink from '@/components/cms/CmsLink';");
    text = text.replace(/<a(?=[\s>])/g, '<CmsLink').replace(/<\/a>/g, '</CmsLink>');
  }
  if (imports.length) {
    const directive = text.match(/^(["']use client["'];?\s*)/);
    const position = directive ? directive[0].length : 0;
    text = text.slice(0, position) + imports.join('\n') + '\n' + text.slice(position);
  }
  fs.writeFileSync(file, text);
}
// Include image paths from structured collections, including gallery arrays.
function collect(value) {
  if (typeof value === 'string' && value.startsWith('/assets/')) media.add(value);
  if (Array.isArray(value)) value.forEach(collect);
  else if (value && typeof value === 'object') Object.values(value).forEach(collect);
}
collect(collections);
fs.writeFileSync('content/cms-copy.json', JSON.stringify(catalog, null, 2) + '\n');
fs.writeFileSync('content/cms-media.json', JSON.stringify([...media].sort(), null, 2) + '\n');
fs.writeFileSync('content/cms-links.json', JSON.stringify([...links].sort(), null, 2) + '\n');
console.log(JSON.stringify({ sections: catalog.length, textFields: catalog.reduce((n, group) => n + group.entries.length, 0), media: media.size, links: links.size, collections: Object.keys(collections).length }));
