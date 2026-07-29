// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ============================================================================
// KONFIGURASI ASTRO — Bedah Data
// ----------------------------------------------------------------------------
// Situs ini dibangun statis (SSG) lalu di-hosting di Cloudflare Pages.
// Cloudflare Pages memakai pengaturan berikut (lihat web/PANDUAN_DEPLOY.md):
//   Build command    : npm run build
//   Output directory : dist
// ----------------------------------------------------------------------------
// 🔴 `site` WAJIB terisi benar — dipakai untuk canonical URL, sitemap.xml,
//    dan Open Graph. Salah isi = Google diberi tahu alamat yang keliru.
//
//    STATUS DOMAIN (29 Jul 2026):
//    - Yang DIMILIKI sekarang: bedahdata.online  ← dipakai sebagai domain utama
//    - bedahdata.id BELUM dibeli. Rekomendasi awal memilih .id karena
//      kredibilitas (Bedah Data menjual kepercayaan atas data usaha), tapi
//      domainnya belum ada — jadi tidak bisa dijadikan canonical.
//
//    KALAU NANTI bedahdata.id DIBELI, lakukan berurutan:
//      1. Ganti baris `site` di bawah jadi 'https://bedahdata.id'
//      2. Pasang bedahdata.id di Cloudflare (Add a site → ganti nameserver)
//      3. Sambungkan ke proyek ini (Settings → Domains & Routes)
//      4. Buat 301 redirect bedahdata.online → bedahdata.id
//         🔴 301 (permanen), BUKAN 302 — hanya 301 yang memindahkan
//            kekuatan SEO yang sudah terkumpul di .online
//      5. Daftarkan alamat baru di Google Search Console (Change of Address)
//    🔴 JANGAN biarkan kedua domain menyajikan isi yang sama tanpa redirect —
//       itu situs kembar, dan Google memecah nilainya ke dua alamat.
// ============================================================================

export default defineConfig({
  site: 'https://bedahdata.online',

  // Alamat halaman ditulis tanpa garis miring di akhir: /harga, bukan /harga/
  // Konsisten dengan canonical & sitemap supaya tidak ada URL kembar.
  trailingSlash: 'never',

  integrations: [
    sitemap({
      // Halaman yang tidak layak muncul di hasil pencarian dikeluarkan di sini.
      filter: (page) => !page.includes('/404'),
      i18n: undefined,
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],

  build: {
    // 🔴 JANGAN ganti ke 'file'. Dengan format 'file', Astro menghasilkan
    //    /harga.html dan canonical ikut memakai akhiran .html — sementara
    //    sitemap tetap menulis /harga. Dua alamat berbeda untuk satu halaman
    //    membuat Google bingung memilih mana yang asli.
    //    Format 'directory' menghasilkan /harga/index.html, dan Cloudflare
    //    Pages menyajikannya di alamat bersih /harga.
    format: 'directory',
    inlineStylesheets: 'auto',
  },

  // Kompres HTML hasil build — halaman jadi lebih ringan di HP.
  compressHTML: true,

  prefetch: {
    // Halaman yang tautannya terlihat di layar disiapkan diam-diam,
    // jadi pindah halaman terasa instan tanpa membebani muat awal.
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
