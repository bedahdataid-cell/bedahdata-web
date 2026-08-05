// QA khusus halaman ALAT GRATIS — menguji hitungannya BENAR, bukan cuma tampil.
//
// Cara pakai:
//   npm run build
//   npx astro preview --port 4325      (biarkan jalan di terminal lain)
//   node qa-alat.mjs                   (harus keluar "SEMUA LOLOS")
//
// 🔵 Butuh playwright, yang SENGAJA tidak dijadikan dependency proyek — ini
//    alat uji lokal, dan menambahkannya hanya memperberat build Cloudflare
//    tanpa guna. Pasang sekali saja bila belum ada:
//       npm i -D playwright && npx playwright install chromium
import { chromium } from 'playwright';

const BASE = 'http://localhost:4325';
const b = await chromium.launch();
let gagal = 0;
const catat = (ok, pesan) => {
  if (!ok) gagal++;
  console.log((ok ? '  OK   ' : '  GAGAL') + ' ' + pesan);
};

// Membaca angka dari teks "Rp 2.400.000" / "40%" -> 2400000 / 40
const keAngka = (t) =>
  parseFloat(String(t).replace(/[^\d,-]/g, '').replace(/\./g, '').replace(',', '.')) || 0;

const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });

async function buka(path) {
  const page = await ctx.newPage();
  const err = [];
  page.on('pageerror', (e) => err.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') err.push('console: ' + m.text());
  });
  const resp = await page.goto(BASE + path, { waitUntil: 'networkidle' });
  return { page, err, status: resp.status() };
}

/** Ambil nilai hasil berdasarkan label yang mengandung teks tertentu. */
async function nilaiHasil(page, potonganLabel) {
  return await page.evaluate((cari) => {
    const baris = Array.from(document.querySelectorAll('.baris-hasil'));
    const b = baris.find((x) =>
      x.querySelector('.label-hasil')?.textContent.toLowerCase().includes(cari.toLowerCase()),
    );
    return b ? b.querySelector('.nilai-hasil').textContent : null;
  }, potonganLabel);
}

async function isi(page, kunci, nilai) {
  const el = page.locator(`#f-${kunci}`);
  const tag = await el.evaluate((n) => n.tagName);
  if (tag === 'SELECT') await el.selectOption(nilai);
  else {
    await el.fill('');
    await el.type(String(nilai), { delay: 5 });
  }
  await page.waitForTimeout(80);
}

// =====================================================================
console.log('\n=== 1. KOMISI TEKNISI BENGKEL ===');
{
  const { page, err, status } = await buka('/alat/karyawan/komisi-teknisi-bengkel/');
  catat(status === 200, `status 200 (dapat ${status})`);

  // Skema persen: 24.000.000 x 10% = 2.400.000
  await isi(page, 'omzet', '24000000');
  await isi(page, 'persen', '10');
  let v = keAngka(await nilaiHasil(page, 'Komisi bulan ini'));
  catat(v === 2400000, `24jt x 10% = 2.400.000 (dapat ${v})`);

  // + gaji pokok 2.000.000 -> total 4.400.000
  await isi(page, 'gajipokok', '2000000');
  v = keAngka(await nilaiHasil(page, 'Total dibayarkan'));
  catat(v === 4400000, `total dgn gaji pokok = 4.400.000 (dapat ${v})`);

  // Skema nominal: 40 servis x 25.000 = 1.000.000
  await isi(page, 'skema', 'nominal');
  await isi(page, 'jumlahorder', '40');
  await isi(page, 'nominal', '25000');
  v = keAngka(await nilaiHasil(page, 'Komisi bulan ini'));
  catat(v === 1000000, `40 x 25.000 = 1.000.000 (dapat ${v})`);

  // Skema bertingkat: omzet 40jt, target 30jt, 5% & 7%
  //   = 30jt x 5% (1.500.000) + 10jt x 7% (700.000) = 2.200.000
  await isi(page, 'skema', 'tingkat');
  await isi(page, 'omzet', '40000000');
  await isi(page, 'target', '30000000');
  await isi(page, 'persenbawah', '5');
  await isi(page, 'persenatas', '7');
  v = keAngka(await nilaiHasil(page, 'Komisi bulan ini'));
  catat(v === 2200000, `bertingkat = 2.200.000 (dapat ${v})`);

  // Isian yang tersembunyi harus disabled (tidak bisa difokus keyboard)
  const persenDisabled = await page.locator('#f-persen').isDisabled();
  catat(persenDisabled, 'isian tak relevan di-disable saat skema lain dipilih');

  catat(err.length === 0, `nol error JS (${err.join(' | ')})`);
  await page.close();
}

// =====================================================================
console.log('\n=== 2. LEMBUR (rumus 1/173) ===');
{
  const { page, err } = await buka('/alat/karyawan/lembur/');
  // upah 4.000.000 -> per jam = 4.000.000/173 = 23121,38
  await isi(page, 'gajipokok', '3500000');
  await isi(page, 'tunjangan', '500000');
  await isi(page, 'jam', '3');
  await isi(page, 'hari', '1');

  const perJam = keAngka(await nilaiHasil(page, 'per jam'));
  catat(perJam === 23121, `per jam = 1/173 x 4jt = 23.121 (dapat ${perJam})`);

  // hari kerja, 3 jam: 1x1,5 + 2x2 = 5,5 -> 23121,38 x 5,5 = 127.167
  const sehari = keAngka(await nilaiHasil(page, 'satu hari'));
  catat(sehari === 127168 || sehari === 127167, `3 jam hari kerja = ~127.167 (dapat ${sehari})`);

  // Peringatan batas 4 jam
  await isi(page, 'jam', '5');
  const adaPeringatan = await page.locator('.peringatan.awas').count();
  catat(adaPeringatan > 0, 'peringatan muncul saat lembur > 4 jam');

  // Peringatan 18 jam/minggu
  await isi(page, 'jam', '4');
  await isi(page, 'hari', '6');
  const teks = await page.locator('.daftar-peringatan').innerText();
  catat(teks.includes('18 jam'), 'peringatan batas 18 jam/minggu muncul');

  catat(err.length === 0, `nol error JS (${err.join(' | ')})`);
  await page.close();
}

// =====================================================================
console.log('\n=== 3. THR (prorata) ===');
{
  const { page, err } = await buka('/alat/karyawan/thr/');
  await isi(page, 'gajipokok', '3500000');
  await isi(page, 'tunjangan', '500000');
  await isi(page, 'masakerja', '12');
  let v = keAngka(await nilaiHasil(page, 'THR per karyawan'));
  catat(v === 4000000, `masa kerja 12 bln = 1 bulan upah 4jt (dapat ${v})`);

  // 6 bulan -> 6/12 x 4jt = 2jt
  await isi(page, 'masakerja', '6');
  v = keAngka(await nilaiHasil(page, 'THR per karyawan'));
  catat(v === 2000000, `masa kerja 6 bln = prorata 2jt (dapat ${v})`);

  // 10 karyawan -> total 20jt
  await isi(page, 'jumlahkaryawan', '10');
  v = keAngka(await nilaiHasil(page, 'Total THR'));
  catat(v === 20000000, `10 karyawan = 20jt (dapat ${v})`);

  catat(err.length === 0, `nol error JS (${err.join(' | ')})`);
  await page.close();
}

// =====================================================================
console.log('\n=== 4. HARGA JUAL MARKETPLACE ===');
{
  const { page, err } = await buka('/alat/jualan-online/harga-jual-marketplace/');
  await isi(page, 'harga', '150000');
  await isi(page, 'hpp', '90000');
  await isi(page, 'kategori', '10');
  // admin 10% dari 150.000 = 15.000; bersih = 135.000; sisa = 45.000
  let v = keAngka(await nilaiHasil(page, 'Biaya admin platform'));
  catat(v === 15000, `admin 10% dari 150rb = 15.000 (dapat ${v})`);
  v = keAngka(await nilaiHasil(page, 'Uang bersih'));
  catat(v === 135000, `bersih = 135.000 (dapat ${v})`);
  v = keAngka(await nilaiHasil(page, 'Sisa setelah dikurangi HPP'));
  catat(v === 45000, `sisa stlh HPP = 45.000 (dapat ${v})`);

  // Peringatan minus: HPP dinaikkan jadi 200.000
  await isi(page, 'hpp', '200000');
  catat((await page.locator('.peringatan.awas').count()) > 0, 'peringatan muncul saat hasil minus');

  // Batas maksimum admin: harga 20jt kategori 10% -> mentah 2jt, dibatasi 650rb
  await isi(page, 'hpp', '0');
  await isi(page, 'harga', '20000000');
  v = keAngka(await nilaiHasil(page, 'Biaya admin platform'));
  catat(v === 650000, `admin dibatasi di 650.000 utk barang mahal (dapat ${v})`);

  catat(err.length === 0, `nol error JS (${err.join(' | ')})`);
  await page.close();
}

// =====================================================================
console.log('\n=== 5. MARGIN & MARKUP ===');
{
  const { page, err } = await buka('/alat/jualan-online/margin/');
  await isi(page, 'hpp', '60000');
  await isi(page, 'hargajual', '100000');
  let v = keAngka(await nilaiHasil(page, 'Margin'));
  catat(v === 40, `margin = 40% (dapat ${v})`);
  v = keAngka(await nilaiHasil(page, 'Markup'));
  catat(Math.round(v) === 67, `markup = ~67% (dapat ${v})`);
  v = keAngka(await nilaiHasil(page, 'Laba kotor'));
  catat(v === 40000, `laba kotor = 40.000 (dapat ${v})`);

  // Arah sebaliknya: HPP 60.000, target margin 40% -> harga jual 100.000
  await isi(page, 'arah', 'darimargin');
  await isi(page, 'hpp', '60000');
  await isi(page, 'marginTarget', '40');
  v = keAngka(await nilaiHasil(page, 'Harga jual'));
  catat(v === 100000, `dari margin 40% -> harga jual 100.000 (dapat ${v})`);

  // Margin 100% harus memicu peringatan
  await isi(page, 'marginTarget', '100');
  catat((await page.locator('.peringatan.awas').count()) > 0, 'peringatan saat margin >= 100%');

  catat(err.length === 0, `nol error JS (${err.join(' | ')})`);
  await page.close();
}

// =====================================================================
console.log('\n=== 6. AMBANG GRATIS ONGKIR ===');
{
  const { page, err } = await buka('/alat/jualan-online/ambang-gratis-ongkir/');
  await isi(page, 'ongkir', '20000');
  await isi(page, 'margin', '30');
  await isi(page, 'sisamargin', '15');
  // ambang = 20.000 / (0,30 - 0,15) = 133.333
  let v = keAngka(await nilaiHasil(page, 'Ambang minimum'));
  catat(v === 133333, `ambang = 133.333 (dapat ${v})`);
  // titik impas = 20.000 / 0,30 = 66.667
  v = keAngka(await nilaiHasil(page, 'Titik impas'));
  catat(v === 66667, `titik impas = 66.667 (dapat ${v})`);

  // sisamargin >= margin -> peringatan
  await isi(page, 'sisamargin', '30');
  catat((await page.locator('.peringatan.awas').count()) > 0, 'peringatan saat sisa margin >= margin');

  catat(err.length === 0, `nol error JS (${err.join(' | ')})`);
  await page.close();
}

// =====================================================================
console.log('\n=== 7. GENERATOR NOTA ===');
{
  const { page, err, status } = await buka('/alat/dokumen/nota/');
  catat(status === 200, `status 200 (dapat ${status})`);

  await page.locator('#toko').fill('Toko Maju Jaya');
  await page.locator('#pelanggan').fill('Bapak Andi');
  const items = page.locator('.item');
  await items.nth(0).locator('.i-nama').fill('Semen 50kg');
  await items.nth(0).locator('.i-jml').fill('10');
  await items.nth(0).locator('.i-harga').type('65000', { delay: 5 });
  await page.waitForTimeout(120);

  const nota = await page.locator('.nota-kertas').innerText();
  catat(nota.includes('Toko Maju Jaya'), 'nama toko muncul di nota');
  catat(nota.includes('Semen 50kg'), 'barang muncul di nota');
  // 10 x 65.000 = 650.000
  catat(nota.includes('650.000'), `subtotal 650.000 muncul (nota: ${nota.replace(/\n/g, ' | ').slice(0, 200)})`);

  // Tambah baris
  const sebelum = await page.locator('.item').count();
  await page.locator('[data-tambah]').click();
  catat((await page.locator('.item').count()) === sebelum + 1, 'tombol tambah baris bekerja');

  // Hapus baris — pakai baris TERAKHIR (kosong), supaya barang di baris
  // pertama tetap ada untuk uji diskon & pajak di bawah.
  await page.locator('.i-hapus').last().click();
  await page.waitForTimeout(80);
  catat((await page.locator('.item').count()) === sebelum, 'tombol hapus baris bekerja');
  const masihAda = await page.locator('.nota-kertas').innerText();
  catat(masihAda.includes('Semen 50kg'), 'barang lain tidak ikut terhapus');

  // Diskon & pajak: subtotal 650.000 - diskon 50.000 = 600.000, +10% = 660.000
  await page.locator('#diskon').fill('');
  await page.locator('#diskon').type('50000', { delay: 5 });
  await page.locator('#pajak').fill('10');
  await page.waitForTimeout(120);
  const nota2 = await page.locator('.nota-kertas').innerText();
  catat(nota2.includes('660.000'), `total stlh diskon+pajak = 660.000 (dapat: ${nota2.split('\n').slice(-6).join(' | ')})`);

  catat(err.length === 0, `nol error JS (${err.join(' | ')})`);
  await page.close();
}

// =====================================================================
console.log('\n=== 8. HALAMAN INDUK & NAVIGASI ===');
{
  const { page, err, status } = await buka('/alat/');
  catat(status === 200, `status 200 (dapat ${status})`);
  const kartu = await page.locator('.kartu').count();
  catat(kartu === 9, `9 alat terdaftar (dapat ${kartu})`);
  const navAlat = await page.locator('.nav a[href="/alat/"]').count();
  catat(navAlat === 1, 'menu utama memuat "Alat Gratis"');
  catat(err.length === 0, `nol error JS (${err.join(' | ')})`);
  await page.close();
}

// =====================================================================
console.log('\n=== 9. MOBILE 375px — geseran horizontal & sentuh ===');
{
  const ctxM = await b.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const halaman = [
    '/alat/',
    '/alat/karyawan/komisi-teknisi-bengkel/',
    '/alat/karyawan/lembur/',
    '/alat/karyawan/thr/',
    '/alat/jualan-online/harga-jual-marketplace/',
    '/alat/jualan-online/margin/',
    '/alat/jualan-online/ambang-gratis-ongkir/',
    '/alat/dokumen/nota/',
  ];
  for (const p of halaman) {
    const page = await ctxM.newPage();
    const err = [];
    page.on('pageerror', (e) => err.push(String(e)));
    await page.goto(BASE + p, { waitUntil: 'networkidle' });
    const geser = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    // Ukuran font input harus >= 16px supaya iOS tidak memperbesar layar
    // input[type=file] dikecualikan: tidak bisa diketik, jadi tidak pernah
    // memicu perbesaran otomatis iOS.
    const fontKecil = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('input, select, textarea'));
      return els.filter(
        (e) => e.type !== 'file' && parseFloat(getComputedStyle(e).fontSize) < 16,
      ).length;
    });
    catat(!geser, `${p} — tanpa geseran horizontal`);
    catat(fontKecil === 0, `${p} — semua input >= 16px (${fontKecil} melanggar)`);
    catat(err.length === 0, `${p} — nol error JS`);
    await page.close();
  }
  await ctxM.close();
}

// =====================================================================
console.log('\n=== 10. TANPA JAVASCRIPT ===');
{
  const ctxNo = await b.newContext({ javaScriptEnabled: false });
  const page = await ctxNo.newPage();
  await page.goto(BASE + '/alat/karyawan/komisi-teknisi-bengkel/');
  const teks = await page.locator('body').innerText();
  catat(teks.includes('Cara menghitung komisi'), 'penjelasan tetap terbaca tanpa JS');
  catat(teks.includes('Berapa persen komisi'), 'FAQ tetap terbaca tanpa JS');
  const isianTampil = await page.locator('#f-omzet').isVisible();
  catat(isianTampil, 'isian tetap tampil tanpa JS');
  await ctxNo.close();
}

// =====================================================================
console.log('\n=== 11. SEO — canonical & judul ===');
{
  const { page } = await buka('/alat/karyawan/thr/');
  const canon = await page.locator('link[rel=canonical]').getAttribute('href');
  catat(
    canon === 'https://bedahdata.online/alat/karyawan/thr/',
    `canonical dgn garis miring akhir (dapat ${canon})`,
  );
  const h1 = await page.locator('h1').count();
  catat(h1 === 1, `tepat satu <h1> (dapat ${h1})`);
  const desc = await page.locator('meta[name=description]').getAttribute('content');
  catat(desc && desc.length >= 100 && desc.length <= 175, `panjang description ${desc?.length}`);
  await page.close();
}

await b.close();
console.log('\n' + (gagal === 0 ? '=== SEMUA LOLOS ===' : `=== ${gagal} GAGAL ===`));
process.exit(gagal === 0 ? 0 : 1);
