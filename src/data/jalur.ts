// ============================================================================
// JALUR BELAJAR — urutan menonton tutorial untuk pembeli/peserta coba yang ingin jalan SENDIRI
// (keputusan owner 15 Nov 2026: funnel pembelian mandiri, tanpa kunjungan; bantuan terakhir = Google Meet).
// Halaman: /belajar/ (pages/belajar.astro). Video dibaca dari data/tutorial.ts lewat nomornya (`no`),
// jadi judul/durasi/tautan selalu sama dengan halaman /tutorial/. Tambah video baru di tutorial.ts,
// lalu tambahkan nomornya di tahap yang sesuai di sini.
// 🔴 Hanya nomor video yang SUDAH TAYANG. Video yang belum ada jangan dicantumkan.
// ============================================================================

export interface TahapJalur {
  id: string;
  judul: string;
  waktu: string;        // perkiraan kapan dikerjakan
  tujuan: string;       // hasil yang didapat pengguna di akhir tahap
  video: string[];      // nomor video (VideoTutorial.no)
  pro?: boolean;        // tahap memakai fitur paket Pro
}

export const TAHAP_UMUM: TahapJalur[] = [
  {
    id: 'pasang', judul: 'Pasang dan coba', waktu: 'Hari 1 · ±30 menit',
    tujuan: 'ERP Studio berjalan di Google Drive Anda dan siap dipakai.',
    video: ['P1', '#1'],
  },
  {
    id: 'data', judul: 'Siapkan data dasar', waktu: 'Hari 1–2',
    tujuan: 'Kategori, gudang, channel, pelanggan, pemasok, dan produk sudah terisi.',
    video: ['#2', '#3', '#4', '#5', '#6', '#7', '#8'],
  },
  {
    id: 'impor', judul: 'Masukkan data banyak sekaligus (opsional)', waktu: 'Hari 2',
    tujuan: 'Daftar produk dan pelanggan lama masuk dari Excel/Sheets tanpa mengetik satu per satu.',
    video: ['#9', '#10'],
  },
  {
    id: 'transaksi', judul: 'Catat transaksi harian', waktu: 'Hari 2–3',
    tujuan: 'Penjualan, pembayaran, pembelian, dan stok tercatat sendiri-sendiri dengan rapi.',
    video: ['#11', '#12', '#13', '#14', '#16', '#17', '#18'],
  },
  {
    id: 'laporan', judul: 'Baca angka dan laporan', waktu: 'Hari 3 dan seterusnya',
    tujuan: 'Biaya, jurnal, laba-rugi, neraca, dan arus kas bisa dibaca tanpa menebak.',
    video: ['#19', '#22', '#23', '#24', '#25', '#28'],
  },
  {
    id: 'tim', judul: 'Tim, absen, gaji, dan komisi', waktu: 'Minggu 2 · paket Pro',
    tujuan: 'Karyawan punya akun sendiri, absen tercatat, gaji dan komisi terhitung.',
    video: ['#29', '#31', '#36', '#38', '#39'],
    pro: true,
  },
  {
    id: 'izin', judul: 'Atur hak akses', waktu: 'Minggu 2 · paket Pro',
    tujuan: 'Tiap orang hanya melihat dan mengubah yang memang bagiannya.',
    video: ['#32', '#33', '#40', '#41', '#42'],
    pro: true,
  },
];

export interface JalurSegmen {
  slug: string;
  nama: string;
  tahap: TahapJalur;   // disisipkan sesudah "Catat transaksi harian"
}

export const JALUR_SEGMEN: JalurSegmen[] = [
  { slug: 'bengkel', nama: 'Bengkel', tahap: { id: 'khas', judul: 'Alur khas bengkel: antrean servis dan komisi', waktu: 'Hari 3', tujuan: 'Unit servis ditangani teknisi dari antrean sampai siap diambil; komisi terhitung dari data servis.', video: ['#51', '#39'] } },
  { slug: 'salon', nama: 'Salon & Klinik', tahap: { id: 'khas', judul: 'Alur khas salon dan klinik: layanan dan komisi petugas', waktu: 'Hari 3', tujuan: 'Layanan dikerjakan petugas dengan sub-langkah yang jelas; komisi terhitung.', video: ['#48', '#39'] } },
  { slug: 'percetakan', nama: 'Percetakan & Studio', tahap: { id: 'khas', judul: 'Alur khas percetakan dan studio: pesanan sampai cetak', waktu: 'Hari 3', tujuan: 'Pesanan desain/cetak diantre, direvisi, di-ACC, dicetak, dan ditagih.', video: ['#49', '#52'] } },
  { slug: 'toko-bangunan', nama: 'Toko Bangunan & Grosir', tahap: { id: 'khas', judul: 'Alur khas toko bangunan dan grosir: stok dan mutasi', waktu: 'Hari 3', tujuan: 'Stok per barang cocok dengan catatan; selisih ketahuan lewat opname.', video: ['#18', '#9', '#8'] } },
  { slug: 'kedai-kopi', nama: 'Kedai Kopi', tahap: { id: 'khas', judul: 'Alur khas kedai kopi: kasir, shift, dan pesanan', waktu: 'Hari 3', tujuan: 'Penjualan kasir dan shift tercatat; pesanan dari dapur ke saji berjalan.', video: ['#15', '#50', '#7'] } },
  { slug: 'jualan-online', nama: 'Jualan Online', tahap: { id: 'khas', judul: 'Alur khas jualan online: pesanan, resi, dan stok', waktu: 'Hari 3', tujuan: 'Pesanan dari banyak tempat dikemas, dikirim, dan stoknya cocok.', video: ['#47', '#3', '#7'] } },
  { slug: 'konveksi', nama: 'Konveksi Rumahan', tahap: { id: 'khas', judul: 'Alur khas konveksi: pesanan ber-DP dan pelunasan', waktu: 'Hari 3', tujuan: 'DP dan pelunasan tercatat; pesanan produksi diikuti dari masuk sampai selesai.', video: ['#12', '#49', '#16'] } },
  { slug: 'makanan-rumahan', nama: 'Makanan Rumahan', tahap: { id: 'khas', judul: 'Alur khas makanan rumahan: pesanan, DP, dan belanja bahan', waktu: 'Hari 3', tujuan: 'Pesanan dan uang muka tercatat; belanja bahan dan stok bahan terpantau.', video: ['#50', '#12', '#16'] } },
];
