import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildCatalog } from './build-catalog.mjs';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'bithub-bots-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'bots/revisor'), { recursive: true });
  await mkdir(join(root, 'skills/evidencias'), { recursive: true });
  const metadata = { id: 'revisor', version: '1.0.0', name: 'Revisor', description: 'Revise mudanças.', category: 'programacao', author: 'Bithub', avatarSeed: 'bit:2:0', featured: true, tags: ['revisão'], skills: ['evidencias'] };
  await writeFile(join(root, 'bots/revisor/bot.json'), JSON.stringify(metadata));
  await writeFile(join(root, 'bots/revisor/INSTRUCTIONS.md'), 'Revise com atenção.\r\n');
  await writeFile(join(root, 'skills/evidencias/SKILL.md'), '---\nname: Evidências\ndescription: Fundamente as conclusões.\n---\n\nCite os arquivos lidos.\r\n');
  return { root, metadata };
}

test('produz conteúdo autocontido e normalizado com saída determinística', async t => {
  const { root } = await fixture(t);
  const first = await buildCatalog(root);
  assert.deepEqual(first, await buildCatalog(root));
  assert.equal(first.schemaVersion, 1);
  assert.equal(first.bots[0].instructions, 'Revise com atenção.');
  assert.deepEqual(first.bots[0].skills, [{ id: 'evidencias', name: 'Evidências', description: 'Fundamente as conclusões.', content: 'Cite os arquivos lidos.' }]);
});

test('recusa habilidade ausente em vez de gerar bot incompleto', async t => {
  const { root, metadata } = await fixture(t);
  metadata.skills = ['ausente'];
  await writeFile(join(root, 'bots/revisor/bot.json'), JSON.stringify(metadata));
  await assert.rejects(buildCatalog(root), /habilidade.*ausente/i);
});

test('recusa identificador duplicado e caminho que escape da pasta', async t => {
  const { root, metadata } = await fixture(t);
  await mkdir(join(root, 'bots/outro'));
  await writeFile(join(root, 'bots/outro/bot.json'), JSON.stringify(metadata));
  await writeFile(join(root, 'bots/outro/INSTRUCTIONS.md'), 'Outro.');
  await assert.rejects(buildCatalog(root), /identificador|pasta/i);
  await rm(join(root, 'bots/outro'), { recursive: true });
  metadata.skills = ['../evidencias'];
  await writeFile(join(root, 'bots/revisor/bot.json'), JSON.stringify(metadata));
  await assert.rejects(buildCatalog(root), /identificador/i);
});

test('recusa instruções combinadas acima do limite de bytes do Bithub', async t => {
  const { root } = await fixture(t);
  await writeFile(join(root, 'bots/revisor/INSTRUCTIONS.md'), 'á'.repeat(20_000));
  await assert.rejects(buildCatalog(root), /40.000|40000/);
});

test('recusa versão inválida e propriedade desconhecida', async t => {
  const { root, metadata } = await fixture(t);
  await writeFile(join(root, 'bots/revisor/bot.json'), JSON.stringify({ ...metadata, version: 'latest' }));
  await assert.rejects(buildCatalog(root), /versão/i);
  await writeFile(join(root, 'bots/revisor/bot.json'), JSON.stringify({ ...metadata, command: 'execute algo' }));
  await assert.rejects(buildCatalog(root), /desconhecid/i);
});

test('recusa aparência que o BitAvatar não suporta', async t => {
  const { root, metadata } = await fixture(t);
  await writeFile(join(root, 'bots/revisor/bot.json'), JSON.stringify({ ...metadata, avatarSeed: 'bit:2:5:23' }));
  await assert.rejects(buildCatalog(root), /aparência/i);
});
