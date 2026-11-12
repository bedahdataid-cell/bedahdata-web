// QA harga & tautan beli. Jalankan SETELAH `npm run build`: node qa-harga.mjs
// Memindai SEMUA dist/**/*.html. Exit 1 bila ada pola harga lama/terlarang atau pola wajib hilang.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) { console.error('dist/ tidak ada. Jalankan npm run build dulu.'); process.exit(2); }

function semuaHtml(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? semuaHtml(p) : p.endsWith('.html') ? [p] : [];
  });
}

const TERLARANG = [
  [/349\.000|549\.000|199\.000/, 'harga lama (349/549/199 rb)'],
  [/Rp ?69\.000|Rp ?89\.000/, 'harga add-on satuan'],
  [/227 ?(ribu|thousand)|Rp ?227/, 'klaim "senilai 227 rb"'],
  [/\b[Bb]undle\b/, 'kata bundle'],
  [/349 ?(ribu|thousand)|549 ?(ribu|thousand)|349–549|mulai Rp 349/, 'rentang/harga lama dalam kalimat'],
  [/href=""/, 'tautan kosong href=""'],
  [/href="[^"]*undefined[^"]*"/, 'tautan memuat "undefined"'],
];

const gagal = [];
const berkas = semuaHtml(DIST);
// Artikel panduan & kalkulator boleh memakai kata "murah" secara deskriptif; halaman penjualan tidak.
const HALAMAN_JUAL = (f) => !/[\\/](alat|panduan)[\\/]/.test(f);
const POLA_MURAH = /\bmurah\b|\bterjangkau\b/i;

for (const f of berkas) {
  const html = readFileSync(f, 'utf8');
  if (HALAMAN_JUAL(f)) {
    const mm = POLA_MURAH.exec(html);
    if (mm) gagal.push(`${f}: kata murah/terjangkau sebagai daya jual -> "${mm[0]}"`);
  }
  for (const [pola, nama] of TERLARANG) {
    const m = pola.exec(html);
    if (m) gagal.push(`${f}: ${nama} -> "${m[0]}"`);
  }
}

function wajib(f, teks) {
  const p = join(DIST, f);
  if (!existsSync(p)) { gagal.push(`${p}: berkas tidak ada`); return; }
  if (!readFileSync(p, 'utf8').includes(teks)) gagal.push(`${p}: harus memuat "${teks}"`);
}
wajib('harga/index.html', 'Rp 75.000');
wajib('harga/index.html', 'Rp 149.000');
wajib('index.html', '75.000');

if (gagal.length) {
  console.log(`GAGAL (${gagal.length} masalah di ${berkas.length} halaman):`);
  gagal.forEach((g) => console.log(' - ' + g));
  process.exit(1);
}
console.log(`LOLOS: ${berkas.length} halaman diperiksa, tidak ada harga lama.`);

// ---- Halaman /mulai/, header, dan tautan internal (ditambahkan di Task D3) ----
{
  const gagal2 = [];
  const mulai = join(DIST, 'mulai/index.html');
  if (!existsSync(mulai)) gagal2.push('dist/mulai/index.html tidak ada');
  else if (!readFileSync(mulai, 'utf8').includes('belum memverifikasi')) gagal2.push('/mulai/ harus menjelaskan peringatan "belum memverifikasi"');
  const beranda = readFileSync(join(DIST, 'index.html'), 'utf8');
  if (!beranda.includes('Coba Gratis 3 Hari')) gagal2.push('beranda harus punya tombol "Coba Gratis 3 Hari"');
  if (!/data-sumber="header"[^>]*>\s*Coba Gratis 3 Hari/.test(beranda)) gagal2.push('tombol header harus "Coba Gratis 3 Hari"');
  for (const f of semuaHtml(DIST)) {
    const html = readFileSync(f, 'utf8');
    for (const m of html.matchAll(/href="(\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)"/g)) {
      gagal2.push(`${f}: tautan internal tanpa garis miring di akhir -> ${m[1]}`);
    }
  }
  if (gagal2.length) {
    console.log(`GAGAL tambahan (${gagal2.length}):`);
    gagal2.forEach((g) => console.log(' - ' + g));
    process.exit(1);
  }
  console.log('LOLOS tambahan: /mulai/, tombol beranda, garis miring tautan internal.');
}

// ---- Putaran perbaikan peninjau (12 Nov 2026): tidak ada klaim add-on; label CTA /mulai/ ----
{
  const gagal3 = [];
  for (const f of semuaHtml(DIST)) {
    if (!HALAMAN_JUAL(f)) continue;
    const html = readFileSync(f, 'utf8');
    const m = /[Aa]dd-on/.exec(html);
    if (m) gagal3.push(`${f}: klaim add-on (add-on satuan sudah dicabut) -> "${m[0]}"`);
  }
  const solusi = readFileSync(join(DIST, 'solusi/index.html'), 'utf8');
  if (!solusi.includes('Paket Pro')) gagal3.push('solusi: modul khusus Pro harus bertanda "Paket Pro"');
  if (/tinggal tambah sesuai kebutuhan/.test(solusi)) gagal3.push('solusi: masih menyuruh "tambah sesuai kebutuhan" untuk Standar');
  const mulai2 = readFileSync(join(DIST, 'mulai/index.html'), 'utf8');
  if (/Demo Gratis 30 Menit/.test(mulai2)) gagal3.push('/mulai/: label tombol penutup tidak boleh "Demo Gratis 30 Menit"');
  if (gagal3.length) {
    console.log(`GAGAL perbaikan peninjau (${gagal3.length}):`);
    gagal3.forEach((g) => console.log(' - ' + g));
    process.exit(1);
  }
  console.log('LOLOS perbaikan peninjau: tidak ada klaim add-on, solusi bertanda Paket Pro, label /mulai/ sesuai.');
}
