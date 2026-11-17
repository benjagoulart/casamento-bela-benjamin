// Build do site: copia os arquivos para dist/ e baixa as fotos dos presentes.
// As fotos vêm dos links em scripts/imagens.json e são salvas em
// dist/assets/img/presentes/<id>.jpg (600x600, fundo creme da paleta).
// Se uma foto falhar, o site mostra um ícone no lugar.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const dist = path.join(raiz, 'dist');
const ignorar = new Set(['dist', 'node_modules', 'scripts', '.git', '.vercel', 'package.json', 'package-lock.json', 'vercel.json', 'README.md', 'CLAUDE.md']);
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(dist, { recursive: true });
for (const nome of await fs.readdir(raiz)) {
  if (ignorar.has(nome) || nome.startsWith('.')) continue;
  await fs.cp(path.join(raiz, nome), path.join(dist, nome), { recursive: true });
}

const imagens = JSON.parse(await fs.readFile(path.join(raiz, 'scripts', 'imagens.json'), 'utf8'));
const pasta = path.join(dist, 'assets', 'img', 'presentes');
await fs.mkdir(pasta, { recursive: true });

let ok = 0;
await Promise.all(Object.entries(imagens).map(async ([id, url]) => {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const buf = Buffer.from(await r.arrayBuffer());
    await sharp(buf)
      .resize(600, 600, { fit: 'contain', background: '#FFFDF1' })
      .flatten({ background: '#FFFDF1' })
      .jpeg({ quality: 82 })
      .toFile(path.join(pasta, id + '.jpg'));
    ok++;
  } catch (e) {
    console.warn('Foto não baixada:', id, e.message);
  }
}));
console.log(`Fotos dos presentes: ${ok}/${Object.keys(imagens).length}`);
