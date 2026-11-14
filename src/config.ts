// ============================================================================
// KONFIGURASI SITUS — satu tempat untuk semua data yang sering berubah.
// Kalau nomor WhatsApp / harga / tautan sosmed berubah, UBAH DI SINI SAJA.
// Semua halaman ikut berubah sendiri.
// ============================================================================

export const SITE = {
  name: 'Bedah Data',
  legalName: 'Bedah Data Digital',
  // 🔴 HARUS sama dengan `site` di astro.config.mjs. Sebelumnya tertulis
  //    bedahdata.id — domain yang BELUM dibeli — sehingga @id di JSON-LD
  //    menunjuk alamat yang tidak ada. Diperbaiki 5 Agu 2026.
  //    Kalau bedahdata.id nanti dibeli, ganti KEDUANYA bersamaan.
  url: 'https://bedahdata.online',
  locale: 'id-ID',
  email: 'bedahdata.id@gmail.com',
  description:
    'ERP Studio adalah aplikasi pencatatan usaha yang menyatukan stok, penjualan, keuangan, dan komisi karyawan. Bayar sekali, dan data tersimpan di Google Drive usaha Anda sendiri.',
  descriptionEn:
    'ERP Studio brings stock, sales, finance, and staff commission into one system. Pay once, and your data stays in your own business’s Google Drive.',
} as const;

// --- WhatsApp: nomor & pembuat tautan ---------------------------------------
// Nomor ditulis format internasional tanpa tanda plus (dipakai wa.me).
export const WA_NUMBER = '6285188244786';
export const WA_DISPLAY = '0851 8824 4786';

/**
 * Membuat tautan WhatsApp lengkap dengan pesan pembuka yang sudah terisi.
 * Dipakai semua tombol CTA supaya pesan masuknya konsisten & mudah dilacak.
 */
export function waLink(pesan: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pesan)}`;
}

// --- Media sosial ------------------------------------------------------------
export const SOCIALS = [
  { nama: 'Instagram @bedahdata.id', url: 'https://instagram.com/bedahdata.id' },
  { nama: 'Facebook Bedahdata.id', url: 'https://facebook.com/Bedahdata.id' },
  { nama: 'TikTok @bedahdata.id', url: 'https://tiktok.com/@bedahdata.id' },
  { nama: 'YouTube bedahdata_id', url: 'https://www.youtube.com/channel/UCH23MmRbVlBtOR1I6vCmrIg' },
] as const;

// 🔴 Diperbarui 18 Agu 2026 — kebijakan privasi & syarat ketentuan kini
//    di-hosting sebagai halaman Astro di situs ini sendiri (/privacy/ dan
//    /terms/), bukan lagi GitHub Pages terpisah. Dibutuhkan untuk App
//    Review TikTok/Meta (dulu untuk Postiz, kini dimatikan). Alamat lama tetap hidup tapi
//    tidak lagi dirujuk dari sini.
export const PRIVACY_URL = '/privacy/';
export const TERMS_URL = '/terms/';

// --- Meta Pixel --------------------------------------------------------------
// 🔴 ISI ID-nya di sini saat pixel sudah dibuat di Meta Events Manager.
//    Selama masih string kosong, kode pixel TIDAK dimuat sama sekali — situs
//    tetap jalan normal, tidak ada permintaan jaringan ke Facebook, dan tidak
//    ada error di console. Jadi aman ditinggal kosong sampai owner siap.
//
//    Cara mengisi: Events Manager → Data Sources → pilih pixel → salin
//    angka Pixel ID (15–16 digit) ke dalam tanda kutip di bawah.
//
// 🔵 Kenapa dipasang sekarang walau ID belum ada: halaman alat gratis inilah
//    yang melatih pixel TANPA biaya iklan (SPEK_TOOLS_GRATIS_WEB §6). Kalau
//    kodenya baru dipasang belakangan, semua kunjungan sebelum itu hangus.
export const META_PIXEL_ID = '';

// --- Menu navigasi utama -----------------------------------------------------
// 🟢 7 item (owner, 5 Agu 2026) — batas lama 6 sengaja dilampaui supaya
//    "Alat Gratis" punya pintu masuk di menu utama. Alat gratis adalah mesin
//    trafik organik (SPEK_TOOLS_GRATIS_WEB §6 syarat 5: wajib ditautkan dari
//    menu utama), jadi menyembunyikannya di footer meniadakan tujuannya.
// 🔴 Jangan tambah item ke-8 tanpa mencabut salah satunya.
// 🔴 GARIS MIRING DI AKHIR WAJIB ADA. astro.config.mjs memakai
//    trailingSlash: 'always', jadi alamat tanpa garis miring dijawab 307
//    (redirect) — bukan 200. Tanpa ini, prefetch bawaan Astro meminta alamat
//    yang salah dan menghasilkan 404/307 beruntun di console.
//    Terbukti di QA 5 Agu 2026: enam permintaan 404 di setiap halaman.
// 🔵 `kunci` menunjuk teksnya di src/i18n/ui.ts, `href` adalah jalur NETRAL
//    (tanpa awalan bahasa). Header menambahkan /en/ sendiri lewat jalur().
export const NAV = [
  { kunci: 'navBeranda', href: '/' },
  { kunci: 'navSolusi', href: '/solusi/' },
  { kunci: 'navAlat', href: '/alat/' },
  { kunci: 'navHarga', href: '/harga/' },
  { kunci: 'navPanduan', href: '/panduan/' },
  { kunci: 'navFaq', href: '/faq/' },
  { kunci: 'navTentang', href: '/tentang/' },
] as const;

// --- Halaman segmen (dipakai di footer & halaman solusi) ---------------------
// 🔴 `slug` TIDAK diterjemahkan — alamatnya tetap /bengkel/ dan /en/bengkel/.
//    Mengubah slug per bahasa berarti dua alamat berbeda untuk satu halaman,
//    dan memutus semua tautan yang sudah terlanjur dibagikan.
export const SEGMEN = [
  {
    slug: 'bengkel',
    nama: 'Bengkel',
    namaEn: 'Auto Repair Shops',
    ringkas: 'Komisi mekanik dan antrean servis terhitung sendiri.',
    ringkasEn: 'Mechanic commission and service queue worked out for you.',
  },
  {
    slug: 'salon',
    nama: 'Salon & Klinik',
    namaEn: 'Salons & Beauty Clinics',
    ringkas: 'Komisi terapis, jadwal, dan gaji dalam satu aplikasi.',
    ringkasEn: 'Therapist commission, schedule, and payroll in one system.',
  },
  {
    slug: 'percetakan',
    nama: 'Percetakan & Studio',
    namaEn: 'Print Shops & Studios',
    ringkas: 'Antrean pesanan dari masuk sampai selesai, plus piutang.',
    ringkasEn: 'Order queue from intake to hand-over, plus receivables.',
  },
  {
    slug: 'toko-bangunan',
    nama: 'Toko Bangunan & Grosir',
    namaEn: 'Building Supplies & Wholesale',
    ringkas: 'Stok dan mutasi barang cocok dengan catatan.',
    ringkasEn: 'Stock and goods movement that match your records.',
  },
  {
    slug: 'kedai-kopi',
    nama: 'Kedai Kopi',
    namaEn: 'Coffee Shops',
    ringkas: 'Penjualan kasir, stok bahan, dan biaya harian tercatat rapi.',
    ringkasEn: 'Till sales, ingredient stock, and daily costs kept in order.',
  },
  {
    slug: 'jualan-online',
    nama: 'Jualan Online',
    namaEn: 'Online Sellers',
    ringkas: 'Pesanan dari banyak tempat, satu stok, untung bersih terlihat.',
    ringkasEn: 'Orders from many channels, one stock, clear net profit.',
  },
  {
    slug: 'konveksi',
    nama: 'Konveksi Rumahan',
    namaEn: 'Home Garment Makers',
    ringkas: 'Pesanan ber-DP, bahan kain, dan upah penjahit tercatat.',
    ringkasEn: 'Deposits, fabric stock, and tailor wages recorded.',
  },
  {
    slug: 'makanan-rumahan',
    nama: 'Makanan Rumahan',
    namaEn: 'Home Food Businesses',
    ringkas: 'Pesanan, uang muka, belanja bahan, dan untung per menu.',
    ringkasEn: 'Orders, deposits, ingredient spending, and profit per menu item.',
  },
] as const;

// --- Harga -------------------------------------------------------------------
// 🔴 SATU-SATUNYA sumber harga di situs. Jangan menulis angka harga di halaman,
//    artikel, atau komponen lain (JSON-LD di index.astro membacanya dari sini).
// 🟢 Struktur resmi sejak 12 Nov 2026: Free (3 hari) · Standar Rp 75.000 · Pro
//    Rp 149.000. Tanpa bundle, tanpa add-on satuan untuk modul yang sudah ada.
//    Model 8 paket per-industri SUDAH DIHAPUS — jangan dimunculkan lagi.
// 🔴 Custom TIDAK dipublikasikan angkanya — arahkan ke WhatsApp (lihat CUSTOM).
// 🔴 HARGA TETAP RUPIAH di kedua bahasa (keputusan owner 5 Agu 2026).
// 🔴 Isi paket mengikuti gerbang lisensi di Hub (Platform_LicenseV2.js
//    _LICV2_MODULE_GATES): Standar TIDAK memuat HRD, Produksi, AI, Komisi, CRM,
//    Prospek — semuanya ada di Pro. Ubah daftar fitur hanya bila gerbangnya berubah.
// 🔴 Dilarang: kata "murah/terjangkau" sebagai daya jual; angka "senilai …" untuk
//    harga yang tidak pernah dijual; bundle.

// Tautan checkout Lynk.id. 🔴 ISI saat produk sudah ditayangkan di Lynk. Selama
// kosong, tombol jatuh ke WhatsApp (bukan tautan rusak) — pola sama dengan META_PIXEL_ID.
export const LYNK = {
  gratis: 'https://lynk.id/bedahdata_id/v6pz2e8klv0g',
  standar: 'https://lynk.id/bedahdata_id/leqnw4vkv8k2',
  pro: 'https://lynk.id/bedahdata_id/wewk045j4god',
} as const;

export type KunciPaket = keyof typeof LYNK;

export const PAKET = [
  {
    kunci: 'gratis' as KunciPaket,
    nama: 'Free',
    harga: 'Rp 0',
    satuan: '3 hari',
    satuanEn: '3 days',
    untuk: 'Coba dulu dengan data Anda sendiri sebelum memutuskan.',
    untukEn: 'Try it with your own data before you decide.',
    fitur: [
      'Semua fitur bisa dicoba selama 3 hari',
      'Tanpa kewajiban membeli',
      'Data tetap utuh bila lanjut ke Standar atau Pro',
    ],
    fiturEn: [
      'Every feature is open for 3 days',
      'No obligation to buy',
      'Your data stays intact if you continue with Standard or Pro',
    ],
    cta: 'Coba Gratis 3 Hari',
    ctaEn: 'Try Free for 3 Days',
    pesanWa: 'Halo Bedah Data, saya mau coba ERP Studio gratis 3 hari',
    pesanWaEn: 'Hello Bedah Data, I would like to try ERP Studio free for 3 days',
    populer: false,
  },
  {
    kunci: 'standar' as KunciPaket,
    nama: 'Standar',
    harga: 'Rp 75.000',
    satuan: 'bayar sekali',
    satuanEn: 'one-time payment',
    untuk: 'Mulai rapi: jualan, stok, dan keuangan beres dulu.',
    untukEn: 'Get organised first: sales, stock, and finance sorted before anything else.',
    fitur: [
      'Penjualan, kasir (POS), dan pesanan',
      'Pembelian dan stok barang',
      'Keuangan dan biaya',
      'Data induk (produk, pelanggan, pemasok) dan impor data',
      'Perawatan dan pembaruan gratis di tahun pertama',
    ],
    fiturEn: [
      'Sales, Point of Sale & Orders',
      'Purchasing & Inventory',
      'Finance & Expenses',
      'Master Data (Products, Customers, Suppliers) & Import',
      'First year of maintenance included',
    ],
    cta: 'Beli Standar',
    ctaEn: 'Buy Standard',
    pesanWa: 'Halo Bedah Data, saya mau beli paket Standar',
    pesanWaEn: 'Hello Bedah Data, I would like to buy the Standard package',
    populer: false,
  },
  {
    kunci: 'pro' as KunciPaket,
    nama: 'Pro',
    harga: 'Rp 149.000',
    satuan: 'bayar sekali',
    satuanEn: 'one-time payment',
    untuk: 'Paling lengkap, untuk usaha yang sudah punya tim dan ingin melihat angka lebih dalam.',
    untukEn: 'The most complete one, for businesses that already have a team and want to see the numbers more deeply.',
    fitur: [
      'Semua yang ada di Standar',
      'HRD: absensi dan penggajian',
      'Produksi',
      'Komisi, pengelolaan pelanggan (CRM), dan calon pelanggan',
      'Penasihat AI yang membaca data usaha Anda (AI Decision Intelligence)',
    ],
    fiturEn: [
      'Everything in Standard',
      'HR: attendance & payroll',
      'Production',
      'Commission, CRM & Prospects',
      'AI data advisor (AI Decision Intelligence)',
    ],
    cta: 'Beli Pro',
    ctaEn: 'Buy Pro',
    pesanWa: 'Halo Bedah Data, saya mau beli paket Pro',
    pesanWaEn: 'Hello Bedah Data, I would like to buy the Pro package',
    populer: true,
  },
] as const;


// --- Biaya perawatan (owner 14 Nov 2026) --------------------------------------
// Tahun pertama gratis. Sesudahnya OPSIONAL: 40% dari harga paket. Aplikasi tetap
// berjalan walau tidak diperpanjang. Angka dihitung dari PAKET, jangan diketik manual.
export const PERSEN_PERAWATAN = 40;
export function biayaPerawatan(harga: string): string {
  const n = Number(harga.replace(/[^0-9]/g, ''));
  return 'Rp ' + Math.round((n * PERSEN_PERAWATAN) / 100).toLocaleString('id-ID');
}

// Jalur untuk usaha yang melewati batas ERP Google Apps Script. Tidak dijual swalayan.
export const CUSTOM = {
  nama: 'Custom',
  judul: 'Butuh sistem yang lebih besar?',
  judulEn: 'Need a bigger system?',
  teks: 'ERP Studio berjalan di Google Apps Script, yang punya batas pemakaian dan memori. Kalau usaha Anda sudah melewati batas itu, mari kita bahas sistem yang lebih tangguh bersama.',
  teksEn: 'This ERP runs on Google Apps Script, which has quota and memory limits. If your business has outgrown them, we discuss a sturdier system together.',
  cta: 'Bahas Kebutuhan Saya',
  ctaEn: 'Discuss My Needs',
  pesanWa: 'Halo Bedah Data, saya mau bahas sistem yang lebih besar (Custom)',
  pesanWaEn: 'Hello Bedah Data, I would like to discuss a bigger system (Custom)',
} as const;

/**
 * Tautan tombol beli/coba. Memakai tautan Lynk bila sudah diisi di LYNK,
 * selain itu jatuh ke WhatsApp dengan pesan paket tersebut.
 */
export function tautanBeli(kunci: KunciPaket, en = false): string {
  const url = LYNK[kunci];
  if (url) return url;
  const paket = PAKET.find((p) => p.kunci === kunci)!;
  return waLink(en ? paket.pesanWaEn : paket.pesanWa);
}
