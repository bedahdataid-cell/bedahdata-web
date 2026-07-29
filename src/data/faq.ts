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

export const FAQ_UMUM: ItemFaq[] = [
  {
    tanya: 'Apakah ERP Studio berlangganan bulanan?',
    jawab:
      '<p>Tidak. ERP Studio memakai lisensi bayar sekali mulai Rp 349.000 — ini beli, bukan sewa. Maintenance tahun pertama sudah termasuk. Setelah itu perpanjangan maintenance sifatnya pilihan, dan <strong>software tetap berjalan walau Anda memutuskan tidak memperpanjang</strong>.</p>',
  },
  {
    tanya: 'Data usaha saya disimpan di mana?',
    jawab:
      '<p>Di Google Drive milik Anda sendiri, bukan di server kami. Setiap catatan penjualan, stok, dan keuangan tersimpan sebagai spreadsheet di Drive usaha Anda — bisa dibuka, dibackup, atau dipindahkan kapan saja tanpa minta izin kepada kami. Termasuk kalau suatu hari Anda berhenti bekerja sama dengan kami.</p>',
  },
  {
    tanya: 'Bisa dipakai beberapa karyawan sekaligus?',
    jawab:
      '<p>Bisa. ERP Studio mendukung banyak pengguna dengan <strong>hak akses per peran</strong>: kasir, admin gudang, dan pemilik masing-masing melihat menu yang sesuai tanggung jawabnya. Jadi karyawan tidak perlu melihat data yang bukan urusannya, dan Anda tetap melihat keseluruhan.</p>',
  },
  {
    tanya: 'Usaha jasa seperti bengkel atau salon apakah cocok?',
    jawab:
      '<p>Cocok — asal pekerjaannya sudah dipegang beberapa orang. ERP Studio menangani antrean pesanan jasa dari masuk sampai selesai, menghitung komisi teknisi atau terapis, dan mengurus penggajian dalam satu sistem yang sama. Justru di usaha jasa berkaryawan inilah komisi dan antrean paling sering masih dihitung manual tiap akhir bulan.</p>',
  },
  {
    tanya: 'Usaha saya masih dikerjakan sendiri. Cocok tidak?',
    jawab:
      '<p>Terus terang: kemungkinan besar belum. Kalau semua Anda pegang sendiri dan tidak ada yang perlu dicocokkan antar orang, yang Anda butuhkan adalah catatan sederhana — dan untuk itu aplikasi pencatatan gratis sudah cukup baik. ERP Studio mulai berguna saat <strong>ada minimal tiga orang terlibat</strong> dan ada yang harus dicocokkan: stok, pesanan, komisi, atau piutang.</p>',
  },
  {
    tanya: 'Kalau data lama saya masih di Excel, hangus tidak?',
    jawab:
      '<p>Tidak. Catatan dari Excel atau buku lama bisa dipindahkan ke sistem, jadi Anda tidak mulai dari nol. Tersedia layanan migrasi data berbayar bila Anda ingin dibantu sampai benar-benar siap pakai — biayanya kami sampaikan terbuka di awal, bukan di tengah jalan.</p>',
  },
  {
    tanya: 'Saya tidak jago komputer. Bisa belajar?',
    jawab:
      '<p>Bisa, dan itu memang bagian dari pekerjaan kami. ERP Studio berjalan di Google Workspace yang tampilannya sudah familier, dan Anda masuk ke grup WhatsApp pendampingan sejak hari pertama. Prinsip kami: <strong>mengajari, bukan membuat Anda bergantung</strong> — kalau setahun lagi Anda masih harus bertanya untuk hal dasar, berarti kami yang belum selesai bekerja.</p>',
  },
  {
    tanya: 'Kalau suatu hari Bedah Data tutup, sistem saya bagaimana?',
    jawab:
      '<p>Pertanyaan yang wajar, dan jarang dijawab terang-terangan. Karena sistem berjalan di akun Google Workspace Anda dan datanya ada di Drive Anda, sistem tetap bisa Anda pakai — tidak ada saklar dari pihak kami yang bisa mematikannya. Yang berhenti hanyalah layanan pemeliharaan dan pengembangan dari kami.</p>',
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
