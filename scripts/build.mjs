// Build do site: copia os arquivos para dist/ e prepara as fotos dos presentes.
// Cada foto sai em dist/assets/img/presentes/<id>.jpg (600x600, fundo branco),
// com as bordas vazias cortadas e o produto centralizado sempre com a mesma margem.
// De onde vem a foto:
//   1. fotos-presentes/<id>.jpg|png|webp, se existir (fotos enviadas por vocês, já recortadas);
//   2. senão, o link em scripts/imagens.json.
// Se uma foto falhar, o site mostra um ícone no lugar.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const dist = path.join(raiz, 'dist');
const ignorar = new Set(['dist', 'node_modules', 'scripts', 'fotos-presentes', '.git', '.vercel', 'package.json', 'package-lock.json', 'vercel.json', 'README.md', 'CLAUDE.md']);
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const LADO = 600;      // tamanho final da foto
const AREA = 500;      // o produto cabe num quadrado de 500px (margem de 50px em volta)
const FUNDO = '#FFFFFF'; // branco: no site o card aplica o tom bege por cima (mix-blend-mode)

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(dist, { recursive: true });
for (const nome of await fs.readdir(raiz)) {
  if (ignorar.has(nome) || nome.startsWith('.')) continue;
  await fs.cp(path.join(raiz, nome), path.join(dist, nome), { recursive: true });
}

const imagens = JSON.parse(await fs.readFile(path.join(raiz, 'scripts', 'imagens.json'), 'utf8'));
const pastaLocal = path.join(raiz, 'fotos-presentes');
const locais = {};
for (const f of await fs.readdir(pastaLocal).catch(() => [])) {
  const m = f.match(/^(.+)\.(jpe?g|png|webp)$/i);
  if (m) locais[m[1]] = path.join(pastaLocal, f);
}
const ids = new Set([...Object.keys(imagens), ...Object.keys(locais)]);
const pasta = path.join(dist, 'assets', 'img', 'presentes');
await fs.mkdir(pasta, { recursive: true });

async function baixar(url) {
  const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return Buffer.from(await r.arrayBuffer());
}

// Fundo branco, corta a borda vazia e centraliza o produto com margem igual
async function padronizar(buf) {
  const base = await sharp(buf).rotate().flatten({ background: '#FFFFFF' }).toBuffer();
  let recortada;
  try {
    recortada = await sharp(base).trim({ background: '#FFFFFF', threshold: 18 }).toBuffer();
  } catch {
    recortada = base;
  }
  const produto = await sharp(recortada)
    .resize(AREA, AREA, { fit: 'inside', withoutEnlargement: false })
    .toBuffer({ resolveWithObject: true });
  const { width, height } = produto.info;
  return sharp({ create: { width: LADO, height: LADO, channels: 3, background: FUNDO } })
    .composite([{ input: produto.data, left: Math.round((LADO - width) / 2), top: Math.round((LADO - height) / 2) }])
    .jpeg({ quality: 84 });
}

let ok = 0;
await Promise.all([...ids].map(async (id) => {
  try {
    const buf = locais[id] ? await fs.readFile(locais[id]) : await baixar(imagens[id]);
    await (await padronizar(buf)).toFile(path.join(pasta, id + '.jpg'));
    ok++;
  } catch (e) {
    console.warn('Foto não preparada:', id, e.message);
  }
}));
console.log(`Fotos dos presentes: ${ok}/${ids.size} (${Object.keys(locais).length} da pasta fotos-presentes)`);
