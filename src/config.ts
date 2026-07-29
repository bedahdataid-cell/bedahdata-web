// ============================================================================
// KONFIGURASI SITUS — satu tempat untuk semua data yang sering berubah.
// Kalau nomor WhatsApp / harga / tautan sosmed berubah, UBAH DI SINI SAJA.
// Semua halaman ikut berubah sendiri.
// ============================================================================

export const SITE = {
  name: 'Bedah Data',
  legalName: 'Bedah Data Digital',
  url: 'https://bedahdata.id',
  locale: 'id-ID',
  email: 'bedahdata.id@gmail.com',
  description:
    'ERP Studio menyatukan stok, penjualan, keuangan, dan komisi karyawan dalam satu sistem. Bayar sekali, dan data tersimpan di Google Drive usaha Anda sendiri.',
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
  { nama: 'TikTok bedahdata', url: 'https://tiktok.com/@bedahdata' },
  { nama: 'YouTube bedahdata_id', url: 'https://youtube.com/@bedahdata_id' },
] as const;

export const PRIVACY_URL = 'https://bedahdataid-cell.github.io/bedahdata-legal/';

// --- Menu navigasi utama -----------------------------------------------------
// 🔴 Maksimal 6 item. Lebih dari itu membingungkan, terutama di HP.
export const NAV = [
  { label: 'Beranda', href: '/' },
  { label: 'Solusi', href: '/solusi' },
  { label: 'Harga', href: '/harga' },
  { label: 'Panduan', href: '/panduan' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Tentang', href: '/tentang' },
] as const;

// --- Halaman segmen (dipakai di footer & halaman solusi) ---------------------
export const SEGMEN = [
  {
    slug: 'bengkel',
    nama: 'Bengkel',
    ringkas: 'Komisi mekanik & antrean servis terhitung sendiri.',
  },
  {
    slug: 'salon',
    nama: 'Salon & Klinik',
    ringkas: 'Komisi terapis, jadwal, dan gaji dalam satu sistem.',
  },
  {
    slug: 'percetakan',
    nama: 'Percetakan & Studio',
    ringkas: 'Antrean order dari masuk sampai selesai, plus piutang.',
  },
  {
    slug: 'toko-bangunan',
    nama: 'Toko Bangunan & Grosir',
    ringkas: 'Stok dan mutasi barang cocok dengan catatan.',
  },
] as const;

// --- Harga -------------------------------------------------------------------
// 🔴 Struktur resmi: Standard / Pro / Custom. Model 8 paket per-industri
//    SUDAH DIHAPUS — jangan pernah dimunculkan lagi.
// 🔴 Custom TIDAK dipublikasikan angkanya — arahkan ke WhatsApp.
export const PAKET = [
  {
    nama: 'Standard',
    harga: 'Rp 349.000',
    satuan: 'lifetime',
    untuk: 'Pas untuk yang ingin mulai rapi: jualan, stok, dan keuangan beres dulu.',
    fitur: [
      'Penjualan, Pembelian & Inventory',
      'Keuangan & Biaya',
      'HRD dasar',
      'Master Data (Produk, Pelanggan, Pemasok)',
      'Maintenance tahun pertama gratis',
    ],
    cta: 'Mulai dari Sini',
    pesanWa: 'Halo Bedah Data, saya tertarik paket Standard',
    populer: false,
  },
  {
    nama: 'Pro',
    harga: 'Rp 549.000',
    satuan: 'lifetime',
    untuk:
      'Paket paling lengkap: selisih Rp 200 ribu dari Standard, sudah dapat semua add-on (senilai Rp 158 ribu) plus AI penasihat data.',
    fitur: [
      'Semua modul di paket Standard',
      'Add-on Komisi & CRM — sudah termasuk',
      'AI Decision Intelligence',
      'Tinggal aktifkan sendiri di Pengaturan',
    ],
    cta: 'Ambil yang Paling Lengkap',
    pesanWa: 'Halo Bedah Data, saya tertarik paket Pro',
    populer: true,
  },
  {
    nama: 'Custom',
    harga: 'Hubungi Kami',
    satuan: 'nego sesuai kebutuhan',
    untuk:
      'Untuk kebutuhan yang tidak biasa atau skala lebih besar — kita bahas berdua dulu, baru bicara angka.',
    fitur: [
      'Cakupan modul disesuaikan',
      'Harga dibahas berdasarkan kebutuhan',
      'Pendampingan menyeluruh',
    ],
    cta: 'Bahas Kebutuhan Saya',
    pesanWa: 'Halo Bedah Data, saya mau bahas paket Custom',
    populer: false,
  },
] as const;

// 🔴 Studio Kerja DICABUT sebagai add-on (owner, 29 Jul 2026) — modul Fulfillment/Pesanan
//    sudah menangani kebutuhan jasa & non-jasa; alokasi & komisi ditangani modul Komisi.
// 🔴 Bundle DIHAPUS — dengan add-on tinggal dua, bundle Rp 199rb jadi lebih mahal
//    daripada beli satuan (69rb + 89rb = 158rb). Jangan dimunculkan lagi.
export const ADDON = [
  { nama: 'Komisi', harga: 'Rp 69.000' },
  { nama: 'CRM', harga: 'Rp 89.000' },
] as const;
