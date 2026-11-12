// Skrip QA visual & teknis — dijalankan lokal, tidak ikut ke hosting.
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = 'http://localhost:4323';
const HALAMAN = [
  ['beranda', '/'],
  ['solusi', '/solusi'],
  ['harga', '/harga'],
  ['panduan', '/panduan'],
  ['artikel', '/panduan/cara-menghitung-hpp-jasa'],
  ['faq', '/faq'],
  ['tentang', '/tentang'],
  ['kontak', '/kontak'],
  ['bengkel', '/bengkel'],
  ['salon', '/salon'],
  ['percetakan', '/percetakan'],
  ['toko-bangunan', '/toko-bangunan'],
  ['404', '/tidak-ada-halaman-ini'],
];

const VIEWPORTS = [
  ['desktop', 1440, 900],
  ['mobile', 375, 812],
];

fs.mkdirSync('qa-shots', { recursive: true });
const hasil = [];
const browser = await chromium.launch();

for (const [vpNama, w, h] of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
  });

  for (const [nama, path] of HALAMAN) {
    const page = await ctx.newPage();
    const errorsJS = [];
    page.on('pageerror', (e) => errorsJS.push(String(e)));
    page.on('console', (m) => {
      if (m.type() === 'error') errorsJS.push('console: ' + m.text());
    });

    const resp = await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const cek = await page.evaluate(() => {
      const de = document.documentElement;
      const h1s = [...document.querySelectorAll('h1')].map((e) => e.textContent.trim());
      const imgs = [...document.querySelectorAll('img')];
      const imgTanpaAlt = imgs.filter((i) => !i.getAttribute('alt')).map((i) => i.src);
      // Cari elemen yang menonjol melebihi lebar layar
      const meluber = [...document.querySelectorAll('body *')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.right > de.clientWidth + 1.5;
        })
        .slice(0, 5)
        .map((el) => `${el.tagName}.${(el.className || '').toString().slice(0, 40)}`);
      const wa = [...document.querySelectorAll('a[href*="wa.me"]')].map((a) => a.href);
      const waSalah = wa.filter((u) => !u.includes('6285188244786'));
      const internal = [...document.querySelectorAll('a[href^="/"]')].map((a) =>
        a.getAttribute('href'),
      );
      return {
        judul: document.title,
        desc:
          document.querySelector('meta[name="description"]')?.getAttribute('content')?.length ||
          0,
        canonical: document.querySelector('link[rel=canonical]')?.href || '(tidak ada)',
        jumlahH1: h1s.length,
        h1: h1s[0]?.slice(0, 60),
        imgTanpaAlt,
        scrollW: de.scrollWidth,
        clientW: de.clientWidth,
        meluber,
        jumlahWA: wa.length,
        waSalah,
        internal: [...new Set(internal)],
        jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
      };
    });

    hasil.push({ viewport: vpNama, nama, path, status: resp.status(), errorsJS, ...cek });

    await page.screenshot({
      path: `qa-shots/${vpNama}-${nama}.png`,
      fullPage: false,
    });
    await page.close();
  }
  await ctx.close();
}

// --- Uji khusus: menu hamburger di HP ---
const ctxM = await browser.newContext({ viewport: { width: 375, height: 812 } });
const pM = await ctxM.newPage();
await pM.goto(BASE + '/', { waitUntil: 'networkidle' });
const tombolTampak = await pM.locator('#tombol-menu').isVisible();
await pM.locator('#tombol-menu').click();
await pM.waitForTimeout(500);
const navTampak = await pM.locator('#nav-utama').isVisible();
const ariaTerbuka = await pM.locator('#tombol-menu').getAttribute('aria-expanded');
await pM.screenshot({ path: 'qa-shots/mobile-menu-terbuka.png' });
await pM.keyboard.press('Escape');
await pM.waitForTimeout(400);
const ariaTertutup = await pM.locator('#tombol-menu').getAttribute('aria-expanded');
const menuQA = { tombolTampak, navTampak, ariaTerbuka, ariaTertutup };
await ctxM.close();

// --- Uji: konten tetap tampil walau JS mati ---
const ctxNoJs = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  javaScriptEnabled: false,
});
const pN = await ctxNoJs.newPage();
await pN.goto(BASE + '/', { waitUntil: 'load' });
const opacityTanpaJs = await pN.evaluate(() => {
  const el = document.querySelector('.reveal');
  return el ? getComputedStyle(el).opacity : 'tidak ada .reveal';
});
await ctxNoJs.close();

await browser.close();

fs.writeFileSync(
  'qa-hasil.json',
  JSON.stringify({ hasil, menuQA, opacityTanpaJs }, null, 2),
);

// --- Ringkasan ---
console.log('\n=== RINGKASAN QA ===');
console.log('Menu HP:', JSON.stringify(menuQA));
console.log('Opacity .reveal saat JS mati:', opacityTanpaJs);

let masalah = 0;
for (const r of hasil) {
  const p = [];
  if (r.jumlahH1 !== 1) p.push(`H1 = ${r.jumlahH1}`);
  if (r.imgTanpaAlt.length) p.push(`img tanpa alt: ${r.imgTanpaAlt.length}`);
  if (r.scrollW > r.clientW + 1) p.push(`OVERFLOW ${r.scrollW}>${r.clientW} [${r.meluber}]`);
  if (r.errorsJS.length) p.push(`JS ERROR: ${r.errorsJS.join('|').slice(0, 120)}`);
  if (r.waSalah.length) p.push(`WA salah: ${r.waSalah}`);
  if (r.desc < 70 || r.desc > 185) p.push(`desc ${r.desc} huruf`);
  if (r.jsonLd < 1 && r.nama !== '404') p.push('tanpa JSON-LD');
  if (p.length) {
    masalah++;
    console.log(`❌ [${r.viewport}] ${r.nama} (${r.status}) -> ${p.join(' ; ')}`);
  }
}
console.log(masalah === 0 ? '✅ Tidak ada masalah terdeteksi.' : `\nTotal baris bermasalah: ${masalah}`);

// Kumpulkan semua tautan internal untuk pengecekan tautan mati
const semuaInternal = [...new Set(hasil.flatMap((r) => r.internal))];
console.log('\n=== TAUTAN INTERNAL DIPAKAI ===');
console.log(semuaInternal.join(', '));
