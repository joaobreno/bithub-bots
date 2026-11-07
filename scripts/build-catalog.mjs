import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const categories = ['programacao', 'produtividade', 'pesquisa', 'escrita', 'planejamento'];
const fields = ['id', 'version', 'name', 'description', 'category', 'author', 'avatarSeed', 'featured', 'tags', 'skills'];
const normalize = text => text.replace(/\r\n?/g, '\n').trim();
const bytes = text => Buffer.byteLength(text, 'utf8');
const id = value => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && value.length <= 80;
const fail = message => { throw new Error(message); };
function text(value, label, max) {
  if (typeof value !== 'string' || !value.trim() || bytes(value) > max) fail(`${label} inválido ou acima de ${max} bytes.`);
  return normalize(value);
}

export function combinedInstructions(bot) {
  return bot.instructions + (bot.skills.length ? '\n\n## Habilidades incluídas\n\n' + bot.skills.map(skill => `### ${skill.name}\n\n${skill.description}\n\n${skill.content}`).join('\n\n') : '');
}

export async function buildCatalog(root) {
  const bots = [];
  const names = (await readdir(join(root, 'bots'), { withFileTypes: true })).filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
  const seen = new Set();
  for (const folder of names) {
    if (!id(folder)) fail(`Identificador de pasta inválido: ${folder}`);
    const metadata = JSON.parse(await readFile(join(root, 'bots', folder, 'bot.json'), 'utf8'));
    if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) fail(`Metadados inválidos: ${folder}`);
    if (Object.keys(metadata).some(key => !fields.includes(key))) fail(`Propriedade desconhecida em ${folder}.`);
    if (!id(metadata.id) || metadata.id !== folder || seen.has(metadata.id)) fail(`Identificador duplicado ou diferente da pasta: ${folder}`);
    seen.add(metadata.id);
    if (typeof metadata.version !== 'string' || !/^\d+\.\d+\.\d+$/.test(metadata.version) || metadata.version.length > 64) fail(`Versão inválida em ${folder}.`);
    if (!categories.includes(metadata.category) || typeof metadata.featured !== 'boolean') fail(`Categoria ou destaque inválido em ${folder}.`);
    if (typeof metadata.avatarSeed !== 'string' || !/^bit:[0-7]:[0-3](?::(?:1[0-8]|[0-9]))?$/.test(metadata.avatarSeed)) fail(`Aparência inválida em ${folder}.`);
    if (!Array.isArray(metadata.tags) || metadata.tags.length > 12 || metadata.tags.some(tag => typeof tag !== 'string' || !tag.trim() || bytes(tag) > 60)) fail(`Tags inválidas em ${folder}.`);
    if (!Array.isArray(metadata.skills) || metadata.skills.length > 12 || metadata.skills.some(skill => !id(skill)) || new Set(metadata.skills).size !== metadata.skills.length) fail(`Identificador de habilidade inválido em ${folder}.`);
    const skills = [];
    for (const slug of metadata.skills) {
      let source;
      try { source = normalize(await readFile(join(root, 'skills', slug, 'SKILL.md'), 'utf8')); }
      catch { fail(`Habilidade ausente: ${slug} (${folder}).`); }
      const match = source.match(/^---\nname: ([^\n]+)\ndescription: ([^\n]+)\n---\n([\s\S]+)$/);
      if (!match) fail(`Cabeçalho inválido da habilidade ${slug}; use name e description em linhas simples.`);
      skills.push({ id: slug, name: text(match[1], 'Nome da habilidade', 200), description: text(match[2], 'Descrição da habilidade', 1000), content: text(match[3], 'Conteúdo da habilidade', 30000) });
    }
    const bot = { id: metadata.id, version: metadata.version, name: text(metadata.name, 'Nome', 200), description: text(metadata.description, 'Descrição', 4000), category: metadata.category, author: text(metadata.author, 'Autor', 100), avatarSeed: metadata.avatarSeed, featured: metadata.featured, tags: metadata.tags.map(normalize), instructions: text(await readFile(join(root, 'bots', folder, 'INSTRUCTIONS.md'), 'utf8'), 'Instruções', 40000), skills };
    if (bytes(combinedInstructions(bot)) > 40000) fail(`As instruções combinadas de ${folder} excedem 40.000 bytes.`);
    bots.push(bot);
  }
  if (bots.length < 1 || bots.length > 100) fail('O catálogo deve conter de 1 a 100 bots.');
  const catalog = { schemaVersion: 1, bots };
  if (bytes(JSON.stringify(catalog, null, 2) + '\n') > 1024 * 1024) fail('O catálogo excede 1 MiB.');
  return catalog;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  try {
    const output = JSON.stringify(await buildCatalog(root), null, 2) + '\n';
    const target = join(root, 'catalog.json');
    if (process.argv.includes('--check')) {
      if (await readFile(target, 'utf8') !== output) fail('catalog.json desatualizado. Execute node scripts/build-catalog.mjs e inclua o resultado no commit.');
      console.log('Catálogo válido e atualizado.');
    } else { await writeFile(target, output); console.log('catalog.json gerado.'); }
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
