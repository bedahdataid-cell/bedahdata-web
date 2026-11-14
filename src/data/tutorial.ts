// ============================================================================
// DAFTAR VIDEO TUTORIAL — sumber tunggal halaman /tutorial/.
// Menambah video = tambah satu objek di VIDEO (urut menurut `no`) dan, bila
// perlu, satu kategori di KATEGORI. Halaman, pencarian, dan filter terbentuk
// sendiri.
// 🔴 Hanya video yang sudah TAYANG PUBLIK di playlist yang boleh masuk sini.
// 🔴 Jangan menulis harga di judul atau keterangan (aturan seri tutorial).
// Diperbarui: 14 Nov 2026 — 44 video (Panduan Pembeli 1–2, #1–#42).
// ============================================================================

export const PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PLJt7HHo40rRE';

export interface KategoriTutorial {
  id: string;
  nama: string;
  ringkas: string;
}

export interface VideoTutorial {
  /** ID video YouTube (11 karakter). */
  id: string;
  /** Penanda urutan yang tampil di kartu: "#12", "P1". */
  no: string;
  judul: string;
  /** Satu kalimat isi video — ikut dicari oleh kotak pencarian. */
  ket: string;
  /** Durasi, mis. "3:51". */
  durasi: string;
  kat: string;
}

export const KATEGORI: KategoriTutorial[] = [
  { id: 'mulai', nama: 'Mulai Memakai', ringkas: 'Pasang, coba gratis, dan siapkan ERP dari nol' },
  { id: 'master', nama: 'Data Master', ringkas: 'Kategori, gudang, channel, pelanggan, pemasok' },
  { id: 'produk', nama: 'Produk', ringkas: 'Data, harga, stok, dropship, varian' },
  { id: 'import', nama: 'Import Data', ringkas: 'Masukkan banyak data sekaligus dari template' },
  { id: 'penjualan', nama: 'Penjualan & Kasir', ringkas: 'Invoice, pembayaran, cetak, retur, kasir' },
  { id: 'pembelian', nama: 'Pembelian & Stok', ringkas: 'PO, terima barang, hutang, mutasi, opname' },
  { id: 'keuangan', nama: 'Keuangan', ringkas: 'Biaya, jurnal, laporan, tutup buku' },
  { id: 'antarmodul', nama: 'Antar Modul', ringkas: 'Catat sekali, modul lain ikut bergerak' },
  { id: 'tim', nama: 'Tim & HRD', ringkas: 'Karyawan, akun, absen, cuti, gaji, komisi, struktur' },
  { id: 'izin', nama: 'Hak Akses (Permission)', ringkas: 'Arti tiap centang izin pada peran dan jabatan' },
];

export const VIDEO: VideoTutorial[] = [
  { id: 'q5JDshq4Gf0', no: 'P1', kat: 'mulai', durasi: '2:59', judul: 'Pasang ERP Studio dan Coba Gratis 3 Hari', ket: 'Salin ERP ke Google Drive Anda, beri izin Google, setup awal, mulai trial, dan siapkan database.' },
  { id: 'OpnmtzTc_0k', no: 'P2', kat: 'mulai', durasi: '1:50', judul: 'Aktifkan Kode Lisensi Standar atau Pro', ket: 'Memasukkan kode lisensi ke ERP yang sudah terpasang; data selama trial tetap utuh.' },
  { id: 'd8pCtE1wbTY', no: '#1', kat: 'mulai', durasi: '1:52', judul: 'Mulai Pakai dari Nol: Setup sampai Siap Dipakai', ket: 'Setup, trial, login, siapkan modul, dan isi identitas usaha.' },

  { id: 'Ca2x3bwPz0Q', no: '#2', kat: 'master', durasi: '1:46', judul: 'Master Data 1: Kategori Produk dan Gudang', ket: 'Menu Master Data, menambah, mengubah, dan menghapus kategori; gudang beserta alamatnya.' },
  { id: 'F89iZnDUf7k', no: '#3', kat: 'master', durasi: '1:48', judul: 'Master Data 2: Channel dan Kategori Biaya', ket: 'Jenis channel penjualan, biaya admin persen, dan kategori biaya.' },
  { id: 'SrnfrMZkIPM', no: '#4', kat: 'master', durasi: '1:55', judul: 'Menambah Pelanggan: Tipe, Tempo dan Komisi', ket: 'Tipe pelanggan Retail, Reseller, Grosir; tempo bayar, limit kredit, dan komisi.' },
  { id: 'JytEIW1-bzs', no: '#5', kat: 'master', durasi: '1:16', judul: 'Menambah Pemasok: Data dan Tempo Bayar', ket: 'Mencatat data pemasok dan tempo pembayarannya.' },

  { id: 'ynry3iGi1sY', no: '#6', kat: 'produk', durasi: '2:05', judul: 'Menambah Produk 1: Data, Tipe dan Harga', ket: 'Tipe produk, tiga tingkat harga, HPP, dan satuan beli.' },
  { id: '9acx2HmfATs', no: '#7', kat: 'produk', durasi: '1:39', judul: 'Menambah Produk 2: Stok, Dropship dan Komisi', ket: 'Produk yang stoknya dilacak, produk titipan atau dropship, dan produk kena komisi.' },
  { id: 'sGhuu50coGc', no: '#8', kat: 'produk', durasi: '1:57', judul: 'Menambah Produk 3: Varian Ukuran dan Warna', ket: 'Generator kombinasi varian dan mengedit tiap varian.' },

  { id: '1mFyPK94RXE', no: '#9', kat: 'import', durasi: '3:01', judul: 'Import Data 1: Produk dari Template', ket: 'Unduh template, isi di Google Sheets, simpan sebagai CSV, lalu import produk beserta varian.' },
  { id: '3eGXkXg6WFE', no: '#10', kat: 'import', durasi: '1:56', judul: 'Import Data 2: Pelanggan dari Template', ket: 'Alur yang sama untuk memasukkan banyak pelanggan sekaligus.' },

  { id: 'UcjnG5Qce_A', no: '#11', kat: 'penjualan', durasi: '3:51', judul: 'Penjualan 1: Membuat Invoice', ket: 'Pilih pelanggan, produk, diskon, pajak, mode bayar, lalu simpan invoice.' },
  { id: '2Ycjs0PUgwY', no: '#12', kat: 'penjualan', durasi: '3:36', judul: 'Penjualan 2: Pembayaran dan Penagihan', ket: 'Lunas atau DP, filter status, tab Penagihan, bayar sebagian, dan melunasi sisa.' },
  { id: 'UkizDgdPN-Q', no: '#13', kat: 'penjualan', durasi: '3:02', judul: 'Penjualan 3: Cetak dan Kirim via WhatsApp', ket: 'Cetak invoice A4, struk 80 mm, kwitansi, dan kirim PDF lewat WhatsApp.' },
  { id: 'F4BESRdi-iY', no: '#14', kat: 'penjualan', durasi: '2:45', judul: 'Penjualan 4: Retur Penjualan', ket: 'Retur invoice lunas dan belum lunas, dampaknya ke dana dan sisa tagihan.' },
  { id: 'VnDZRkuWfkY', no: '#15', kat: 'penjualan', durasi: '3:24', judul: 'Penjualan 5: Layar Kasir dan Shift', ket: 'Aktifkan menu Kasir, buka shift, jual tunai dan QRIS, tutup shift.' },

  { id: 'Deuz2oS8T1o', no: '#16', kat: 'pembelian', durasi: '2:41', judul: 'Pembelian 1: Membuat Pesanan Pembelian (PO)', ket: 'Daftar PO, membuat PO, bayar di muka, dan menyimpan.' },
  { id: 'uTd1Vu9537o', no: '#17', kat: 'pembelian', durasi: '3:27', judul: 'Pembelian 2: Terima Barang dan Bayar Hutang', ket: 'Terima barang sebagian lalu sisanya, stok bertambah, bayar hutang, dan laporan pembelian.' },
  { id: '9ClzAWGN3uE', no: '#18', kat: 'pembelian', durasi: '3:35', judul: 'Inventaris: Stok, Mutasi dan Koreksi', ket: 'Melihat stok, mutasi manual, koreksi stok opname, dan laporan nilai stok.' },

  { id: 'LcI-Zz4qd6U', no: '#19', kat: 'keuangan', durasi: '3:43', judul: 'Keuangan 1: Biaya dan Kartu Kredit', ket: 'Catat cepat biaya tunai, biaya kartu kredit, filter, dan membatalkan biaya.' },
  { id: 'vktZH6XmzRc', no: '#20', kat: 'keuangan', durasi: '3:17', judul: 'Keuangan 2: Bagan Akun (COA)', ket: 'Kelompok akun, menambah dan mengubah akun, saldo awal.' },
  { id: 'WnCEYz8AkDc', no: '#21', kat: 'keuangan', durasi: '3:34', judul: 'Keuangan 3: Jurnal Umum', ket: 'Jurnal otomatis dari transaksi, membaca jurnal, jurnal manual, dan jurnal pembalik.' },
  { id: 'LFLElfAeYK8', no: '#22', kat: 'keuangan', durasi: '3:25', judul: 'Keuangan 4: Trial Balance dan Buku Besar', ket: 'Saldo tiap akun, cetak PDF, dan menelusuri satu akun.' },
  { id: 'Z0ZI16KLa2w', no: '#23', kat: 'keuangan', durasi: '3:16', judul: 'Keuangan 5: Laporan Laba-Rugi', ket: 'Pendapatan, HPP, biaya, dan laba bersih per periode.' },
  { id: 'jQ0QnbuQdCw', no: '#24', kat: 'keuangan', durasi: '3:03', judul: 'Keuangan 6: Neraca', ket: 'Aset, kewajiban, dan modal; memeriksa neraca seimbang.' },
  { id: 'UFgZxkH_mdU', no: '#25', kat: 'keuangan', durasi: '3:20', judul: 'Keuangan 7: Arus Kas', ket: 'Arus kas operasional, investasi, dan pendanaan.' },
  { id: 'r6--FcXsHZE', no: '#26', kat: 'keuangan', durasi: '2:58', judul: 'Keuangan 8: Kas Transit', ket: 'Uang yang belum masuk rekening, seperti QRIS dan transfer.' },
  { id: 'bhISmWuGBUE', no: '#27', kat: 'keuangan', durasi: '3:07', judul: 'Keuangan 9: Tutup Buku', ket: 'Menutup periode dan penguncian pembukuan.' },

  { id: 'b8QuC0OxUkU', no: '#28', kat: 'antarmodul', durasi: '5:00', judul: 'Satu Transaksi, Semua Modul Ikut Bergerak', ket: 'PO menambah stok, invoice mengurangi stok dan membentuk piutang, semua muncul di jurnal dan laba-rugi tanpa input ulang.' },

  { id: '8tfOsYCSEso', no: '#29', kat: 'tim', durasi: '3:21', judul: 'Menyalakan Modul HRD dan Mengenal Tab-nya', ket: 'Aktifkan HRD di Pengaturan, tur tab, dan tiga peran bawaan.' },
  { id: '8g39q8ULMN4', no: '#30', kat: 'tim', durasi: '3:31', judul: 'Divisi, Jabatan dan Pengaturan Kantor', ket: 'Master divisi dan jabatan, titik kantor, radius, jam kerja, jatah cuti.' },
  { id: '1hapY_XU6_A', no: '#31', kat: 'tim', durasi: '4:10', judul: 'Menambah Karyawan dan Membuat Akun Login', ket: 'Form karyawan, membuat username dan password, serta mengirim lewat WhatsApp.' },
  { id: 'hsmxfc3M60I', no: '#32', kat: 'tim', durasi: '4:19', judul: 'Tiga Peran Bawaan dan Hak Akses', ket: 'Administrator, Manager, Karyawan; tombol Permission dan hubungan izin dengan menu.' },
  { id: 'F3AZIQKemJ4', no: '#33', kat: 'tim', durasi: '4:42', judul: 'Membuat Peran Sendiri (Contoh: Kasir)', ket: 'Membuat jabatan baru, mengatur izin, lalu masuk sebagai peran itu.' },
  { id: 'zqpBq79sfuQ', no: '#34', kat: 'tim', durasi: '4:04', judul: 'Kelola Akun: Reset Password, Nonaktifkan dan PLT', ket: 'Reset password, nonaktifkan akun, dan menugaskan pelaksana tugas.' },
  { id: 'fmv8DSD1Rpw', no: '#35', kat: 'tim', durasi: '2:43', judul: 'Struktur Organisasi: Atasan dan Bagan Pohon', ket: 'Menentukan atasan, tabel hierarki, bagan pohon, dan filter divisi.' },
  { id: 'IXV6fWeLxgE', no: '#36', kat: 'tim', durasi: '4:03', judul: 'Absen Harian: Masuk, Pulang dan Rekap', ket: 'Karyawan absen masuk dan pulang dengan rencana dan capaian, dibatasi radius kantor, lalu owner atau HRD membaca hasilnya.' },
  { id: 'Kdg2XJUqp6w', no: '#37', kat: 'tim', durasi: '3:22', judul: 'Cuti, Izin dan Sakit: Ajukan dan Setujui', ket: 'Karyawan mengajukan cuti, izin, atau sakit; pemegang izin persetujuan menyetujui; saldo cuti berubah.' },
  { id: '3QIpBYyhlYo', no: '#38', kat: 'tim', durasi: '3:35', judul: 'Gaji dan Slip Gaji: Proses, Bayar dan Cetak', ket: 'Proses gaji bulanan semua karyawan, bayar, cetak atau kirim slip, dan lihat jurnalnya muncul sendiri di Keuangan.' },
  { id: 'byJUaXN-dL4', no: '#39', kat: 'tim', durasi: '4:24', judul: 'Aturan Komisi: Dari Invoice ke Pembayaran', ket: 'Membuat aturan komisi, memilih pelaku komisi di invoice, dan mengikuti status komisi sampai siap dibayar.' },

  { id: '8A8IpmK-v1k', no: '#40', kat: 'izin', durasi: '2:46', judul: 'Kamus Permission 1: Izin di Kelompok HRD', ket: 'Arti tiap centang izin HRD: karyawan, absen, cuti, gaji, akun, dan struktur organisasi.' },
  { id: '9uY0k72cnEo', no: '#41', kat: 'izin', durasi: '2:46', judul: 'Kamus Permission 2: Izin Transaksi dan Keuangan', ket: 'Arti tiap centang izin untuk penjualan, stok, pembelian, keuangan, biaya, dan kasir.' },
  { id: '0knaEtUs5Rk', no: '#42', kat: 'izin', durasi: '3:18', judul: 'Kamus Permission 3: Data, Fitur Tambahan dan Peran', ket: 'Arti tiap centang izin untuk pelanggan, produk, AI, komisi, CRM, prospek, pesanan, dan produksi, plus cara menyusun peran.' },
];
