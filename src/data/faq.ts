// ============================================================================
// DAFTAR PERTANYAAN UMUM — satu sumber untuk halaman FAQ *dan* data
// terstruktur (schema FAQPage).
//
// 🔴 Google mensyaratkan jawaban FAQ TERLIHAT pengunjung, bukan hanya di
//    schema. Karena keduanya dibuat dari file ini, isinya mustahil beda.
//
// Isi teks diambil apa adanya dari web lama (sudah lolos audit kejujuran) —
// jangan ditulis ulang tanpa persetujuan. Penulisan copy = ranah Mbak Wulan.
// ============================================================================
import type { ItemFaq } from '../components/Faq.astro';
import { PAKET, PERSEN_PERAWATAN, biayaPerawatan } from '../config';

// 🔴 Harga dibaca dari config.ts — jangan menulis angka di FAQ.
const HARGA_STANDAR = PAKET.find((p) => p.kunci === 'standar')!.harga;
const _pro = PAKET.find((p) => p.kunci === 'pro')!.harga;

export const FAQ_UMUM: ItemFaq[] = [
  {
    tanya: 'Apakah ERP Studio berlangganan bulanan?',
    jawab:
      '<p>Tidak. ERP Studio memakai lisensi bayar sekali mulai ' + HARGA_STANDAR + '. Jadi Anda membeli, bukan menyewa. Perawatan dan pembaruan tahun pertama sudah termasuk. ' + `Mulai tahun kedua, perpanjangan perawatan bersifat pilihan dengan biaya ${PERSEN_PERAWATAN}% dari harga paket per tahun (Standar ${biayaPerawatan(HARGA_STANDAR)}, Pro ${biayaPerawatan(_pro)}).` + ' <strong>Aplikasi tetap berjalan walau Anda memutuskan tidak memperpanjang</strong>.</p>',
  },
  {
    tanya: 'Data usaha saya disimpan di mana?',
    jawab:
      '<p>Di Google Drive milik Anda sendiri, bukan di server kami. Setiap catatan penjualan, stok, dan keuangan tersimpan sebagai lembar kerja (spreadsheet) di Drive usaha Anda. Semuanya bisa dibuka, dicadangkan, atau dipindahkan kapan saja tanpa meminta izin kepada kami. Termasuk kalau suatu hari Anda berhenti bekerja sama dengan kami.</p>',
  },
  {
    tanya: 'Bisakah dipakai beberapa karyawan sekaligus?',
    jawab:
      '<p>Bisa. ERP Studio mendukung banyak pengguna dengan <strong>hak akses per peran</strong>: kasir, admin gudang, dan pemilik masing-masing melihat menu yang sesuai tanggung jawabnya. Jadi karyawan tidak perlu melihat data yang bukan urusannya, dan Anda tetap melihat keseluruhan.</p>',
  },
  {
    tanya: 'Usaha jasa seperti bengkel atau salon apakah cocok?',
    jawab:
      '<p>Cocok. ERP Studio mencatat antrean pesanan jasa dari masuk sampai selesai, menghitung komisi teknisi atau terapis, dan mengurus penggajian di satu aplikasi yang sama. Di usaha jasa yang punya karyawan, komisi dan antrean inilah yang paling sering masih dihitung manual tiap akhir bulan. Komisi dan penggajian ada di paket Pro.</p>',
  },
  {
    tanya: 'Saya jualan online atau punya kedai kopi. Bisa dipakai?',
    jawab:
      '<p>Bisa. Kedai kopi, jualan online, konveksi rumahan, dan usaha sejenis memakai alur yang sama: penjualan dicatat, stok ikut berkurang, dan pembukuan ikut terisi. Terus terang soal jualan online: <strong>ERP Studio tidak tersambung otomatis ke marketplace</strong>, jadi pesanan dari marketplace tetap Anda masukkan sendiri. Untuk konveksi yang ingin mencatat bahan dan hasil produksi, modul Produksi ada di paket Pro.</p>',
  },
  {
    tanya: 'Usaha saya masih saya kerjakan sendiri. Cocokkah?',
    jawab:
      '<p>Cocok. Usaha yang dipegang sendiri justru paling kekurangan waktu untuk mencatat. Di ERP Studio, Anda <strong>cukup mencatat sekali</strong>: penjualan yang Anda masukkan langsung mengurangi stok dan masuk ke pembukuan, jadi Anda tidak perlu menyalin ulang ke buku lain. Kalau nanti Anda mulai punya karyawan, aplikasinya tetap sama, tinggal menambah pengguna. Coba dulu gratis 3 hari dengan data Anda sendiri untuk menilai apakah terasa lebih ringan daripada cara Anda sekarang.</p>',
  },
  {
    tanya: 'Kalau data lama saya masih di Excel, hangus tidak?',
    jawab:
      '<p>Tidak. Catatan dari Excel atau buku lama bisa dipindahkan ke aplikasi, jadi Anda tidak mulai dari nol. Tersedia juga layanan pemindahan data berbayar bila Anda ingin dibantu sampai benar-benar siap pakai. Biayanya kami sampaikan terbuka di awal, bukan di tengah jalan.</p>',
  },
  {
    tanya: 'Saya tidak jago komputer. Bisa belajar?',
    jawab:
      '<p>Bisa, dan itu memang bagian dari pekerjaan kami. ERP Studio berjalan di layanan Google yang tampilannya sudah akrab bagi banyak orang, dan Anda masuk ke grup WhatsApp pendampingan sejak hari pertama. Prinsip kami: <strong>mengajari, bukan membuat Anda bergantung</strong>. Kalau setahun lagi Anda masih harus bertanya untuk hal dasar, berarti pekerjaan kami belum selesai.</p>',
  },
  {
    tanya: 'Kalau suatu hari Bedah Data tutup, bagaimana nasib aplikasi saya?',
    jawab:
      '<p>Pertanyaan yang wajar, dan jarang dijawab terang-terangan. Karena aplikasi berjalan di akun Google Anda dan datanya ada di Drive Anda, aplikasi tetap bisa Anda pakai. Tidak ada sakelar di pihak kami yang bisa mematikannya. Yang berhenti hanyalah layanan perawatan dan pengembangan dari kami.</p>',
  },
  {
    tanya: 'Kenapa muncul peringatan dari Google saat memasang?',
    jawab:
      '<p>Itu wajar. Aplikasi ini kami buat sendiri dan berjalan di akun Google Anda, jadi Google belum &ldquo;mengenalnya&rdquo; dan menampilkan layar <em>Google belum memverifikasi aplikasi ini</em>. Klik <strong>Lanjutan</strong>, lalu <strong>Buka</strong>, lalu izinkan akses yang diminta. Data Anda tetap berada di Google Drive Anda sendiri. Langkah lengkapnya ada di <a href="/mulai/">panduan mulai</a>.</p>',
  },
  {
    tanya: 'Apa batas kemampuan ERP Studio?',
    jawab:
      '<p>ERP Studio berjalan di Google Apps Script, yang punya batas pemakaian harian dan memori. Untuk usaha kecil dengan jumlah transaksi harian yang wajar, batas itu jarang terasa. Kalau usaha Anda sudah melewatinya, mari kita bahas sistem yang lebih tangguh lewat jalur Custom.</p>',
  },
];

/**
 * Mengubah daftar FAQ jadi data terstruktur FAQPage untuk Google.
 * Tag HTML dibuang karena schema hanya menerima teks biasa.
 */
export function faqSchema(items: ItemFaq[], id: string) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.tanya,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.jawab.replace(/<[^>]+>/g, '').trim(),
      },
    })),
  };
}
