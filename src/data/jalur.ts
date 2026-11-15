// ============================================================================
// JALUR BELAJAR — urutan menonton tutorial untuk pembeli/peserta coba yang ingin jalan SENDIRI
// (keputusan owner 15 Nov 2026: funnel pembelian mandiri, tanpa kunjungan; bantuan terakhir = Google Meet).
// Halaman: /belajar/ (pages/belajar.astro). Video dibaca dari data/tutorial.ts lewat nomornya (`no`),
// jadi judul/durasi/tautan selalu sama dengan halaman /tutorial/.
//
// 🔴 ATURAN RINGKAS (owner 15 Nov 2026: "terlalu banyak dan berulang"):
//    - Jalur UTAMA = 4 tahap, ±9–11 video SAJA (inti yang cukup untuk mulai memakai).
//    - Satu video MUNCUL SEKALI per jalur: halaman membuang video yang sudah tampil di tahap sebelumnya
//      (utama → khas jenis usaha → lanjutan). Jadi boleh mencantumkan video yang sama di beberapa daftar;
//      yang dipakai hanya kemunculan pertama.
//    - Selebihnya masuk LANJUTAN (tertutup, opsional, tanpa centang progres).
//    - Hanya nomor video yang SUDAH TAYANG.
// ============================================================================

export interface TahapJalur {
  id: string;
  judul: string;
  waktu: string;        // perkiraan kapan dikerjakan
  tujuan: string;       // hasil yang didapat pengguna di akhir tahap
  video: string[];      // nomor video (VideoTutorial.no)
  pro?: boolean;        // memakai fitur paket Pro
}

// Jalur utama — urutan: pasang → data → jual → (khas jenis usaha) → baca angka
export const TAHAP_UTAMA: TahapJalur[] = [
  { id: 'pasang', judul: 'Pasang dan coba', waktu: 'Hari 1 · ±30 menit',
    tujuan: 'ERP Studio berjalan di Google Drive Anda dan siap dipakai.', video: ['P1', '#1'] },
  { id: 'data', judul: 'Isi produk dan pelanggan pertama', waktu: 'Hari 1',
    tujuan: 'Ada produk dan pelanggan yang bisa dipakai untuk mencatat penjualan.', video: ['#6', '#4'] },
  { id: 'jual', judul: 'Catat penjualan dan pembayaran', waktu: 'Hari 2',
    tujuan: 'Invoice dibuat, dibayar penuh atau dicicil, dan sisa tagihan terlihat.', video: ['#11', '#12'] },
  { id: 'baca', judul: 'Baca angkanya', waktu: 'Hari 3',
    tujuan: 'Laporan laba-rugi terbaca, dan Anda paham bagaimana satu catatan menggerakkan modul lain.', video: ['#23', '#28'] },
];

// Tahap khas tiap jenis usaha — disisipkan sesudah "Catat penjualan dan pembayaran"
export interface JalurSegmen { slug: string; nama: string; tahap: TahapJalur }
export const JALUR_SEGMEN: JalurSegmen[] = [
  { slug: 'bengkel', nama: 'Bengkel', tahap: { id: 'khas', judul: 'Khas bengkel: antrean servis dan komisi', waktu: 'Hari 2–3', tujuan: 'Unit servis ditangani teknisi dari antrean sampai siap diambil; komisi terhitung dari data servis.', video: ['#51', '#39'] } },
  { slug: 'salon', nama: 'Salon & Klinik', tahap: { id: 'khas', judul: 'Khas salon dan klinik: layanan dan komisi petugas', waktu: 'Hari 2–3', tujuan: 'Layanan dikerjakan petugas dengan langkah yang jelas; komisi terhitung.', video: ['#48', '#39'] } },
  { slug: 'percetakan', nama: 'Percetakan & Studio', tahap: { id: 'khas', judul: 'Khas percetakan dan studio: pesanan sampai cetak', waktu: 'Hari 2–3', tujuan: 'Pesanan desain dan cetak diantre, direvisi, di-ACC, lalu dicetak.', video: ['#49', '#52'] } },
  { slug: 'toko-bangunan', nama: 'Toko Bangunan & Grosir', tahap: { id: 'khas', judul: 'Khas toko bangunan dan grosir: stok dan pembelian', waktu: 'Hari 2–3', tujuan: 'Stok per barang cocok dengan catatan; barang masuk dari pemasok tercatat.', video: ['#18', '#16'] } },
  { slug: 'kedai-kopi', nama: 'Kedai Kopi', tahap: { id: 'khas', judul: 'Khas kedai kopi: kasir dan pesanan', waktu: 'Hari 2–3', tujuan: 'Penjualan kasir dan shift tercatat; pesanan dari dapur ke saji berjalan.', video: ['#15', '#50'] } },
  { slug: 'jualan-online', nama: 'Jualan Online', tahap: { id: 'khas', judul: 'Khas jualan online: pesanan, resi, dan stok', waktu: 'Hari 2–3', tujuan: 'Pesanan dari banyak tempat dikemas dan dikirim, stoknya cocok.', video: ['#47', '#7'] } },
  { slug: 'konveksi', nama: 'Konveksi Rumahan', tahap: { id: 'khas', judul: 'Khas konveksi: pesanan produksi', waktu: 'Hari 2–3', tujuan: 'Pesanan ber-DP diikuti dari masuk sampai selesai.', video: ['#49'] } },
  { slug: 'makanan-rumahan', nama: 'Makanan Rumahan', tahap: { id: 'khas', judul: 'Khas makanan rumahan: pesanan dan belanja bahan', waktu: 'Hari 2–3', tujuan: 'Pesanan makanan sampai diantar; belanja bahan tercatat.', video: ['#50', '#16'] } },
];

// Lanjutan — opsional, tertutup. Video yang sudah muncul di jalur utama/khas otomatis dibuang dari sini.
export interface GrupLanjutan { id: string; judul: string; video: string[]; pro?: boolean }
export const LANJUTAN: GrupLanjutan[] = [
  { id: 'cetak', judul: 'Cetak, kirim, retur, dan kasir', video: ['#13', '#14', '#15'] },
  { id: 'stok', judul: 'Pembelian dan stok', video: ['#16', '#17', '#18'] },
  { id: 'cepat', judul: 'Masukkan data lebih cepat', video: ['#5', '#7', '#8', '#9', '#10'] },
  { id: 'uang', judul: 'Keuangan lebih dalam', video: ['#19', '#22', '#24', '#25'] },
  { id: 'tim', judul: 'Tim, absen, gaji, dan komisi', video: ['#29', '#31', '#36', '#38', '#39'], pro: true },
  { id: 'izin', judul: 'Hak akses', video: ['#32', '#33', '#40', '#41', '#42'], pro: true },
];
