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
//    Domain utama sudah diputuskan owner: bedahdata.id
//    (bedahdata.online hanya 301 redirect, BUKAN situs kembar).
// ============================================================================

export default defineConfig({
  site: 'https://bedahdata.id',

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
