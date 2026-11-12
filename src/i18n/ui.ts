// ============================================================================
// DUA BAHASA — kamus teks antarmuka (tombol, label, judul bagian, dll)
// ----------------------------------------------------------------------------
// 🟢 Ditetapkan owner 5 Agustus 2026: situs tersedia dalam Bahasa Indonesia
//    dan Inggris, dengan tombol IN | EN di dekat menu.
//
// 🔴 SASARAN PEMBACA VERSI INGGRIS: tetap pemilik usaha kecil DI INDONESIA
//    yang lebih nyaman membaca bahasa Inggris (termasuk ekspatriat yang
//    menjalankan usaha di sini). Ini **terjemahan lurus**, bukan versi untuk
//    pasar luar negeri — jadi:
//      - Harga tetap Rupiah, struktur paket sama persis
//      - Klaim & batas kejujuran identik (tidak ada yang dilonggarkan
//        hanya karena bahasanya berbeda)
//      - Pendampingan tetap disebut apa adanya: bahasa Indonesia
//    🔴 Kalau suatu saat menyasar pasar luar negeri, itu keputusan BISNIS
//       (harga, klaim kepemilikan data, dukungan) — bukan pekerjaan
//       penerjemahan. Bahas dengan Penasihat Bisnis lebih dulu.
//
// 🔴 ATURAN KEJUJURAN BERLAKU PENUH DI KEDUA BAHASA:
//    - Dilarang menjanjikan hasil usaha ("revenue will grow")
//    - Dilarang kata "affordable"/"cheap" sebagai daya jual — padanan
//      "terjangkau"/"murah" yang sudah dicabut
//    - Dilarang testimoni / nama klien / jumlah pengguna (klien komersial
//      masih NOL)
// ============================================================================

export const BAHASA = {
  id: { kode: 'id', htmlLang: 'id', label: 'IN', nama: 'Bahasa Indonesia', ogLocale: 'id_ID' },
  en: { kode: 'en', htmlLang: 'en', label: 'EN', nama: 'English', ogLocale: 'en_US' },
} as const;

export type Bahasa = keyof typeof BAHASA;

/** Bahasa bawaan — halaman Indonesia TIDAK memakai awalan URL. */
export const BAHASA_DEFAULT: Bahasa = 'id';

/**
 * Membuat alamat halaman untuk bahasa tertentu.
 *   jalur('/harga/', 'id') -> '/harga/'
 *   jalur('/harga/', 'en') -> '/en/harga/'
 *
 * 🔴 Garis miring di akhir WAJIB dipertahankan (trailingSlash: 'always').
 */
export function jalur(path: string, bahasa: Bahasa): string {
  const bersih = path.startsWith('/') ? path : `/${path}`;
  return bahasa === BAHASA_DEFAULT ? bersih : `/en${bersih === '/' ? '/' : bersih}`;
}

/**
 * Kebalikannya: membuang awalan /en/ untuk mendapat jalur netral.
 * Dipakai tombol ganti bahasa supaya pengunjung mendarat di halaman yang
 * SAMA, bukan dilempar ke beranda.
 */
export function jalurNetral(pathname: string): string {
  const p = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return p.startsWith('/') ? p : `/${p}`;
}

/** Membaca bahasa dari alamat halaman yang sedang dibuka. */
export function bahasaDari(pathname: string): Bahasa {
  return /^\/en(\/|$)/.test(pathname) ? 'en' : 'id';
}

// ============================================================================
// KAMUS TEKS ANTARMUKA
// 🔵 Hanya teks yang dipakai ulang di banyak halaman. Isi khusus tiap halaman
//    ada di berkas datanya masing-masing (segmen.ts, alat.ts, faq.ts).
// ============================================================================

export const UI = {
  id: {
    // --- Navigasi ---
    navBeranda: 'Beranda',
    navSolusi: 'Solusi',
    navAlat: 'Alat Gratis',
    navHarga: 'Harga',
    navPanduan: 'Panduan',
    navFaq: 'FAQ',
    navTentang: 'Tentang',
    navKontak: 'Kontak',

    // --- Tombol & ajakan ---
    ctaDemo: 'Coba Gratis 3 Hari',
    ctaTanya: 'Tanya-tanya Dulu via WhatsApp',
    ctaLihatCara: 'Lihat Cara Kerjanya',
    ctaTanyaDulu: 'Tanya Dulu via WhatsApp',
    ctaBuka: 'Buka',
    ctaBukaKalkulator: 'Buka kalkulator',
    ctaBaca: 'Baca',

    // --- Aksesibilitas & kerangka ---
    lompatKonten: 'Lompat ke isi halaman',
    navUtama: 'Navigasi utama',
    bukaMenu: 'Buka menu',
    tutupMenu: 'Tutup menu',
    kembaliBeranda: 'Bedah Data — kembali ke beranda',
    gantiBahasa: 'Ganti bahasa',
    andaDiSini: 'Anda di sini',

    // --- Judul bagian yang dipakai ulang ---
    pertanyaanUmum: 'Pertanyaan umum',
    seringDitanyakan: 'Yang sering ditanyakan',
    alatLain: 'Alat lain yang mungkin berguna',
    alatLainSub: 'Semuanya bebas dipakai, tanpa perlu mendaftar.',
    alatGratis: 'Alat Gratis',

    // --- Kalkulator ---
    isiAngkanya: 'Isi angkanya',
    hasilnya: 'Hasilnya',
    hitung: 'Hitung',
    opsional: 'opsional',
    mintaWa: 'Minta lewat WhatsApp',
    catatanBebasPakai:
      'Kalkulator di atas bebas dipakai tanpa menghubungi siapa pun. Tombol ini hanya kalau Anda mau tambahan rekapnya.',
    tanpaJsKalkulator:
      'Perhitungannya memerlukan JavaScript. Aktifkan JavaScript di browser Anda, atau ikuti rumusnya yang ditulis lengkap di bagian <strong>“Cara menghitungnya”</strong> di bawah — semua angkanya bisa dihitung manual.',

    // --- CTA halus di bawah halaman alat ---
    ctaAlatJudul: 'Kalau hitungan ini mulai makan waktu tiap bulan',
    ctaAlatTeks:
      'Alat di atas cukup untuk hitungan sesekali, dan silakan dipakai selamanya tanpa membeli apa pun. Tapi kalau tiap bulan angkanya harus direkap ulang satu per satu dan perlu tersambung ke penjualan dan stok, itu yang kami kerjakan di ERP Studio — datanya tetap tersimpan di Google Drive usaha Anda sendiri.',
  },

  en: {
    // --- Navigasi ---
    navBeranda: 'Home',
    navSolusi: 'Solution',
    navAlat: 'Free Tools',
    navHarga: 'Pricing',
    navPanduan: 'Guides',
    navFaq: 'FAQ',
    navTentang: 'About',
    navKontak: 'Contact',

    // --- Tombol & ajakan ---
    ctaDemo: 'Try Free for 3 Days',
    ctaTanya: 'Ask a Question on WhatsApp',
    ctaLihatCara: 'See How It Works',
    ctaTanyaDulu: 'Ask on WhatsApp First',
    ctaBuka: 'Open',
    ctaBukaKalkulator: 'Open calculator',
    ctaBaca: 'Read',

    // --- Aksesibilitas & kerangka ---
    lompatKonten: 'Skip to main content',
    navUtama: 'Main navigation',
    bukaMenu: 'Open menu',
    tutupMenu: 'Close menu',
    kembaliBeranda: 'Bedah Data — back to home',
    gantiBahasa: 'Change language',
    andaDiSini: 'You are here',

    // --- Judul bagian yang dipakai ulang ---
    pertanyaanUmum: 'Common questions',
    seringDitanyakan: 'What people usually ask',
    alatLain: 'Other tools you might find useful',
    alatLainSub: 'All free to use, no sign-up needed.',
    alatGratis: 'Free Tools',

    // --- Kalkulator ---
    isiAngkanya: 'Enter your numbers',
    hasilnya: 'Your result',
    hitung: 'Calculate',
    opsional: 'optional',
    mintaWa: 'Request via WhatsApp',
    catatanBebasPakai:
      'The calculator above is free to use without contacting anyone. This button is only if you want the extra summary sheet.',
    tanpaJsKalkulator:
      'The calculation needs JavaScript. Please enable JavaScript in your browser, or follow the formula written out in full under <strong>“How the calculation works”</strong> below — every number can be worked out by hand.',

    // --- CTA halus di bawah halaman alat ---
    ctaAlatJudul: 'When this calculation starts eating your time every month',
    ctaAlatTeks:
      'The tool above is enough for the occasional calculation, and you are welcome to use it forever without buying anything. But if the numbers have to be re-tallied one by one every month and need to connect to your sales and stock, that is what we build in ERP Studio — with your data staying in your own business’s Google Drive.',
  },
} as const;

/** Pengambil teks UI untuk bahasa tertentu. */
export function t(bahasa: Bahasa) {
  return UI[bahasa];
}
