// ============================================================================
// ISI HALAMAN SEGMEN (bengkel, salon, percetakan, toko bangunan)
//
// Struktur tiap halaman mengikuti kerangka di web/RENCANA_SEO.md §B.3:
//   1. H1 memuat kata kunci + masalahnya
//   2. Pengakuan masalah (bahasa pemilik usaha, bukan bahasa vendor)
//   3. Bagaimana ERP Studio menanganinya — spesifik segmen
//   4. 🔴 Syarat kecocokan yang JUJUR (menyaring yang tidak cocok)
//   5. FAQ khusus segmen
//
// 🔴 ATURAN KEJUJURAN yang mengikat seluruh file ini:
//    - Dilarang testimoni / nama klien / angka hasil usaha
//    - Dilarang menjanjikan hasil usaha ("omzet naik") — hanya kualitas
//      bahan keputusan (batas jujur Nilai #7)
//    - Dilarang kata "terjangkau"
//    - Dilarang menjanjikan integrasi marketplace otomatis (fitur ini TIDAK ADA)
// ============================================================================
import type { ItemFaq } from '../components/Faq.astro';

export interface IsiSegmen {
  slug: string;
  nama: string;
  /** Judul di tab browser & hasil pencarian Google. */
  title: string;
  description: string;
  h1: string;
  intro: string;
  /** Keluhan khas segmen ini — ditulis dengan bahasa pemiliknya. */
  keluhan: { judul: string; isi: string }[];
  /** Bagaimana sistem menanganinya. */
  penanganan: { judul: string; isi: string }[];
  /** Syarat kecocokan jujur — menyaring calon yang belum perlu. */
  cocok: string[];
  belumCocok: string;
  faq: ItemFaq[];
  pesanWa: string;
}

export const SEGMEN_ISI: IsiSegmen[] = [
  // ==========================================================================
  {
    slug: 'bengkel',
    nama: 'Bengkel',
    title: 'Aplikasi Hitung Komisi Mekanik dan Antrean Servis Bengkel | Bedah Data',
    description:
      'Komisi mekanik masih dihitung manual tiap akhir bulan? ERP Studio menghitung komisi dari data servis, mengatur antrean servis, dan mengurus gaji dalam satu aplikasi. Bayar sekali.',
    h1: 'Komisi mekanik masih dihitung manual tiap akhir bulan?',
    intro:
      'Kalau tiap akhir bulan Anda masih membuka nota servis satu per satu untuk menghitung bagian tiap mekanik, masalahnya bukan ketelitian Anda. Masalahnya, catatan servis, suku cadang (sparepart), dan upah tersimpan di tempat yang berbeda-beda. Jadi, tidak ada satu tempat yang bisa langsung menjawab.',
    keluhan: [
      {
        judul: 'Akhir bulan jadi malam lembur',
        isi: 'Nota servis dikumpulkan, dicocokkan dengan siapa yang mengerjakan, lalu dihitung satu per satu. Selesai tengah malam, dan besoknya masih ada yang protes karena merasa ada servis yang belum terhitung.',
      },
      {
        judul: 'Suku cadang keluar tanpa tercatat',
        isi: 'Barang diambil dari rak untuk satu pekerjaan, dipakai sebagian, dan sisanya dikembalikan, atau malah tidak. Saat stok opname, angkanya tidak pernah benar-benar cocok.',
      },
      {
        judul: '"Motor Pak Andi sudah selesai belum?"',
        isi: 'Untuk menjawab satu pertanyaan itu, Anda harus bertanya ke tiga orang dulu. Padahal pelanggan sedang menunggu di telepon.',
      },
      {
        judul: 'Mekanik merasa hitungannya tidak transparan',
        isi: 'Ketika perhitungan komisi hanya ada di kepala dan buku pemilik, kepercayaan gampang goyah. Bukan karena ada yang curang, tapi karena tidak ada catatan yang bisa diperiksa bersama.',
      },
    ],
    penanganan: [
      {
        judul: 'Komisi terhitung dari data servis',
        isi: 'Setiap pekerjaan servis mencatat siapa yang mengerjakan. Karena komisi dihitung dari catatan yang sama dengan yang dipakai menagih pelanggan, tidak ada lagi rekap terpisah di akhir bulan, dan hitungannya bisa ditunjukkan ke mekanik saat ditanya. Fitur komisi ada di paket Pro.',
      },
      {
        judul: 'Antrean servis dari masuk sampai selesai',
        isi: 'Setiap kendaraan yang masuk punya status yang terlihat: sedang dikerjakan, menunggu suku cadang, atau siap diambil. Pertanyaan "sudah selesai belum" bisa dijawab dengan membuka satu layar.',
      },
      {
        judul: 'Suku cadang terpotong otomatis dari stok',
        isi: 'Suku cadang yang dipakai pada satu servis langsung mengurangi stok dan ikut masuk ke nota pelanggan. Jadi barang yang keluar dari rak selalu ada pasangannya di catatan.',
      },
      {
        judul: 'Gaji dan komisi dalam satu tempat',
        isi: 'Absensi, gaji pokok, dan komisi dihitung di aplikasi yang sama. Tanggal gajian tidak lagi berarti membuka tiga berkas berbeda. Fitur HRD dan komisi ada di paket Pro.',
      },
    ],
    cocok: [
      'Dikerjakan sendiri atau bersama beberapa mekanik dan kasir',
      'Ada komisi atau upah per pekerjaan yang harus dihitung',
      'Menjual suku cadang, bukan hanya jasa',
      'Antrean servis mulai ramai sehingga sulit diingat',
    ],
    belumCocok:
      'Kalau yang Anda perlukan hanya mencatat uang masuk dan keluar, tanpa stok suku cadang, nota servis, atau komisi, sebagian besar fitur ERP Studio belum akan terpakai. Bengkel yang dikerjakan sendiri tetap bisa memakainya untuk nota, stok, dan pembukuan. Coba dulu gratis 3 hari untuk menilainya sendiri, dan kami akan berterus terang saat demo.',
    faq: [
      {
        tanya: 'Komisi mekanik di tempat saya hitungannya tidak standar. Bisa menyesuaikan?',
        jawab:
          '<p>Perhitungan komisi bisa disesuaikan dengan cara yang sudah Anda pakai, misalnya persentase dari jasa servis, nominal tetap per jenis pekerjaan, atau gabungan keduanya. Yang perlu kami ketahui saat demo adalah aturan main di bengkel Anda. Bukan Anda yang harus menyesuaikan diri dengan aplikasi.</p>',
      },
      {
        tanya: 'Mekanik saya tidak terbiasa memakai komputer. Bagaimana?',
        jawab:
          '<p>Di kebanyakan bengkel, yang memasukkan data bukan mekanik, melainkan admin atau kasir. Mekanik cukup dicatat sebagai pelaksana pekerjaan. Kalau Anda ingin mekanik ikut membuka aplikasi, ERP Studio mendukung <strong>hak akses per peran</strong>, jadi mereka hanya melihat pekerjaan yang menjadi tanggung jawabnya, bukan seluruh data bengkel.</p>',
      },
      {
        tanya: 'Bisa mencatat jasa dan suku cadang dalam satu nota?',
        jawab:
          '<p>Bisa. Satu nota servis dapat memuat jasa pengerjaan sekaligus suku cadang yang dipakai. Suku cadangnya otomatis mengurangi stok, sementara bagian jasanya yang menjadi dasar perhitungan komisi mekanik.</p>',
      },
    ],
    pesanWa: 'Halo Bedah Data, saya punya bengkel dan mau tanya soal hitung komisi mekanik',
  },

  // ==========================================================================
  {
    slug: 'salon',
    nama: 'Salon & Klinik',
    title: 'Aplikasi Hitung Komisi Terapis Salon dan Klinik | Bedah Data',
    description:
      'Komisi terapis, jadwal pelanggan, stok produk, dan gaji dalam satu aplikasi. ERP Studio menghitung komisi dari data layanan. Bayar sekali, bukan langganan bulanan.',
    h1: 'Komisi terapis masih dihitung dari buku catatan tiap akhir bulan?',
    intro:
      'Di salon dan klinik, hampir semua hal penting bergantung pada siapa yang mengerjakan: komisi terapis, pelanggan yang meminta orang tertentu, sampai produk yang terpakai selama perawatan. Ketika ketiganya dicatat di tempat terpisah, akhir bulan selalu berakhir dengan mencocokkan catatan satu per satu.',
    keluhan: [
      {
        judul: 'Komisi per terapis dihitung manual',
        isi: 'Buku layanan dibuka, dihitung siapa mengerjakan apa, lalu dikalikan persentasenya. Butuh berjam-jam, dan satu baris yang terlewat berarti ada yang merasa dirugikan.',
      },
      {
        judul: 'Produk perawatan habis tanpa ketahuan',
        isi: 'Krim, cat rambut, dan bahan perawatan terpakai sedikit demi sedikit tiap layanan. Karena tidak tercatat per pemakaian, Anda baru sadar saat barangnya benar-benar habis.',
      },
      {
        judul: 'Pelanggan langganan tidak terlacak',
        isi: 'Siapa yang terakhir datang tiga bulan lalu, siapa yang biasanya perawatan tiap bulan, semuanya mengandalkan ingatan kasir, bukan catatan.',
      },
      {
        judul: 'Terapis bertanya soal hitungan, Anda harus mengulang dari nol',
        isi: 'Karena perhitungannya tidak tersimpan rapi, satu pertanyaan berarti membuka lagi seluruh catatan bulan itu.',
      },
    ],
    penanganan: [
      {
        judul: 'Komisi dihitung dari catatan layanan',
        isi: 'Setiap layanan mencatat terapis yang mengerjakan. Komisi dihitung dari data yang sama dengan yang dipakai menagih pelanggan, sehingga hitungannya bisa dibuka kembali kapan saja saat ditanyakan. Fitur komisi ada di paket Pro.',
      },
      {
        judul: 'Produk terpotong saat layanan dicatat',
        isi: 'Bahan yang dipakai pada satu perawatan langsung mengurangi stok. Anda bisa melihat produk mana yang menipis sebelum benar-benar habis di tengah jam ramai.',
      },
      {
        judul: 'Riwayat pelanggan tersimpan',
        isi: 'Siapa pernah mengambil layanan apa dan kapan terakhir datang tercatat rapi. Jadi, menghubungi pelanggan lama tidak lagi bergantung pada ingatan seseorang.',
      },
      {
        judul: 'Gaji dan komisi jadi satu proses',
        isi: 'Absensi, gaji pokok, dan komisi terapis dihitung di aplikasi yang sama, sehingga tanggal gajian tidak lagi menjadi hari paling repot dalam sebulan. Fitur HRD dan komisi ada di paket Pro.',
      },
    ],
    cocok: [
      'Dikerjakan sendiri atau bersama beberapa terapis dan kasir',
      'Ada komisi per layanan atau target yang harus dihitung',
      'Memakai produk atau bahan yang stoknya perlu dipantau',
      'Punya pelanggan berulang yang ingin dilacak riwayatnya',
    ],
    belumCocok:
      'Kalau Anda bekerja sendiri tanpa terapis lain, fitur komisi belum Anda perlukan. Paket Standar tetap bisa dipakai untuk mencatat layanan, stok produk, dan pembukuan. Kalau yang Anda butuhkan hanya catatan uang masuk dan keluar, coba dulu gratis 3 hari untuk menilai apakah aplikasinya terasa pas.',
    faq: [
      {
        tanya: 'Terapis saya komisinya beda-beda per jenis layanan. Bisa?',
        jawab:
          '<p>Bisa. Persentase atau nominal komisi dapat dibedakan per jenis layanan, dan juga bisa berbeda antarterapis bila memang begitu aturan di tempat Anda. Yang penting, aturannya ditetapkan sekali di awal. Setelah itu, perhitungannya berjalan mengikuti data layanan.</p>',
      },
      {
        tanya: 'Bisa mencatat paket perawatan yang dibayar di muka?',
        jawab:
          '<p>Bisa dicatat sebagai penjualan dengan pemakaian bertahap, sehingga sisa kunjungan pelanggan tetap terlihat. Karena tiap salon punya aturan paket yang berbeda, sebaiknya bawa contoh paket Anda saat demo supaya kami bisa menunjukkan cara mencatatnya secara spesifik, dan berterus terang bila ada bagian yang perlu penyesuaian.</p>',
      },
      {
        tanya: 'Apakah ada fitur pemesanan jadwal (booking) daring untuk pelanggan?',
        jawab:
          '<p>Terus terang: <strong>belum ada halaman pemesanan jadwal yang bisa dibuka pelanggan sendiri</strong>. Yang tersedia adalah pencatatan jadwal dan antrean dari sisi admin salon. Kalau pemesanan jadwal daring adalah kebutuhan utama Anda, sebaiknya kita bicarakan dulu sebelum Anda memutuskan membeli.</p>',
      },
    ],
    pesanWa: 'Halo Bedah Data, saya punya salon/klinik dan mau tanya soal hitung komisi terapis',
  },

  // ==========================================================================
  {
    slug: 'percetakan',
    nama: 'Percetakan & Studio',
    title: 'Aplikasi Pencatatan Pesanan Percetakan dan Studio Foto | Bedah Data',
    description:
      'Antrean pesanan percetakan dari masuk sampai selesai, plus piutang pelanggan yang belum ditagih. ERP Studio lebih dulu dipakai di usaha cetak kami sendiri.',
    h1: 'Ada pesanan yang terlewat karena catatannya tercecer?',
    intro:
      'Pesanan percetakan jarang selesai dalam sekali sentuh. Ada desain yang menunggu revisi, ada yang menunggu bahan, ada yang sudah jadi tapi belum diambil, dan ada yang sudah diambil tapi belum dibayar. Semua itu berjalan bersamaan, dan buku catatan tidak bisa menunjukkan semuanya sekaligus.',
    keluhan: [
      {
        judul: 'Pesanan yang sedang berjalan tidak terlihat sekaligus',
        isi: 'Berapa pekerjaan yang sedang jalan sekarang? Untuk menjawabnya Anda harus bertanya ke bagian desain, bagian produksi, lalu mengecek nota di meja kasir.',
      },
      {
        judul: 'Piutang baru ketahuan saat rekap',
        isi: 'Pelanggan langganan mengambil barang dulu dan membayar belakangan. Kalau tidak ada yang mencatat rapi, tagihan yang lupa ditagih baru ketahuan berbulan-bulan kemudian.',
      },
      {
        judul: '"Kertas A3 masih ada berapa rim?"',
        isi: 'Jawaban "sepertinya masih ada" itu mahal, karena kekurangannya justru ketahuan saat pekerjaan sudah telanjur diterima dan tenggatnya besok.',
      },
      {
        judul: 'Revisi tidak tercatat sebagai pekerjaan',
        isi: 'Revisi berkali-kali menyita jam kerja, tapi karena tidak tercatat, biaya sebenarnya untuk mengerjakan satu pesanan tidak pernah terlihat.',
      },
    ],
    penanganan: [
      {
        judul: 'Papan antrean pesanan',
        isi: 'Setiap pesanan punya tahapan yang terlihat: masuk, dikerjakan, menunggu konfirmasi, sampai selesai. Satu layar menjawab pertanyaan "apa saja yang sedang jalan".',
      },
      {
        judul: 'Piutang tercatat sejak barang keluar',
        isi: 'Pesanan yang diambil tapi belum dibayar tercatat sebagai tagihan berjalan, lengkap dengan umur tagihannya. Jadi Anda tahu mana yang perlu ditagih lebih dulu.',
      },
      {
        judul: 'Bahan berkurang mengikuti pemakaian',
        isi: 'Kertas, tinta, dan bahan lain yang dipakai satu pesanan langsung mengurangi stok, sehingga "masih ada berapa" bisa dijawab tanpa harus mengecek gudang.',
      },
      {
        judul: 'Lebih dulu dipakai di usaha kami sendiri',
        isi: 'Alur pesanan di ERP Studio lahir dari usaha edit dan cetak foto yang kami jalankan sendiri. Dirancang dari pekerjaan sehari-hari, bukan dari daftar fitur.',
      },
    ],
    cocok: [
      'Dikerjakan sendiri atau bersama admin, desainer, dan operator',
      'Pesanan melewati beberapa tahap sebelum selesai',
      'Ada pelanggan langganan yang bayar belakangan (piutang)',
      'Memakai bahan yang stoknya perlu dipantau',
    ],
    belumCocok:
      'Kalau pesanan Anda sedikit, selalu selesai dalam sekali kerja, dan pembayarannya selalu langsung lunas, papan antrean dan catatan piutang belum banyak menolong. Yang mengerjakan semuanya sendiri tetap bisa memakai ERP Studio untuk mencatat pesanan, bahan, dan pembukuan. Coba dulu gratis 3 hari untuk menilainya.',
    faq: [
      {
        tanya: 'Bisakah satu pesanan punya beberapa tahap pengerjaan?',
        jawab:
          '<p>Bisa. Satu pesanan dapat dipecah menjadi beberapa langkah dengan status masing-masing, sehingga terlihat pekerjaan itu sedang tertahan di bagian mana. Inilah yang membedakan pencatatan pesanan jasa dari sekadar mencatat penjualan barang.</p>',
      },
      {
        tanya: 'Bagaimana dengan pelanggan yang membayar bertahap?',
        jawab:
          '<p>Pembayaran bertahap dan uang muka bisa dicatat, dan sisa tagihannya tetap terlihat sebagai piutang berjalan. Daftar tagihan juga bisa dilihat berdasarkan umurnya, sehingga yang paling lama tertunggak tidak terlewat.</p>',
      },
      {
        tanya: 'Bisakah menghitung biaya per pesanan untuk mengetahui untungnya?',
        jawab:
          '<p>Bahan yang dipakai per pesanan tercatat, jadi Anda bisa melihat perbandingan antara nilai pesanan dan bahan yang terpakai. Perlu kami katakan terus terang: <strong>ketelitiannya bergantung pada disiplin mencatat pemakaian bahan</strong>. Aplikasi tidak bisa menebak bahan yang dipakai tanpa dicatat.</p>',
      },
    ],
    pesanWa: 'Halo Bedah Data, saya punya percetakan/studio dan mau tanya soal pencatatan pesanan',
  },

  // ==========================================================================
  {
    slug: 'toko-bangunan',
    nama: 'Toko Bangunan & Grosir',
    title: 'Aplikasi Stok Barang Toko Bangunan dan Grosir | Bedah Data',
    description:
      'Stok di catatan tidak cocok dengan barang di gudang? ERP Studio mencatat keluar-masuk stok, penjualan, dan pembelian dalam satu aplikasi. Bayar sekali.',
    h1: 'Stok di catatan 40, di gudang 33. Ke mana perginya 7?',
    intro:
      'Di toko bangunan dan grosir, selisih stok jarang disebabkan satu hal besar. Biasanya kumpulan hal kecil: retur yang tidak dicatat, barang pecah, salah input satuan, atau barang diambil untuk contoh lalu lupa dikembalikan. Masing-masing kecil, tapi menumpuk sampai angkanya tidak bisa dipercaya lagi.',
    keluhan: [
      {
        judul: 'Stok opname selalu selisih',
        isi: 'Setiap kali dihitung ulang, ada saja yang tidak cocok. Karena tidak tahu selisihnya berasal dari mana, yang bisa dilakukan hanya menyesuaikan angkanya, dan masalah yang sama terulang bulan depan.',
      },
      {
        judul: 'Barang di lebih dari satu tempat',
        isi: 'Ada yang di toko, ada di gudang belakang, ada di gudang lain. Ketika pelanggan bertanya, jawabannya tergantung siapa yang ditanya.',
      },
      {
        judul: 'Satuan jual berbeda dengan satuan beli',
        isi: 'Beli per dus, jual per batang. Selama konversinya dihitung manual, salah hitung tinggal menunggu waktu.',
      },
      {
        judul: 'Harga khusus pelanggan langganan hanya ada di kepala',
        isi: 'Pelanggan tertentu punya harga berbeda. Kalau yang melayani sedang libur, karyawan lain hanya bisa menebak.',
      },
    ],
    penanganan: [
      {
        judul: 'Kartu stok yang bisa ditelusuri',
        isi: 'Setiap pergerakan barang tercatat: masuk dari pembelian, keluar karena penjualan, retur, atau penyesuaian. Ketika ada selisih, Anda bisa menelusuri riwayatnya, bukan sekadar menyesuaikan angka akhirnya.',
      },
      {
        judul: 'Selisih ketahuan sebelum menumpuk',
        isi: 'Stok opname dicatat sebagai penyesuaian dengan keterangannya, bukan menimpa angka lama diam-diam. Jadi, Anda tahu berapa yang hilang dan kapan, bukan cuma tahu angkanya sudah tidak cocok.',
      },
      {
        judul: 'Pembelian dan penjualan terhubung ke stok',
        isi: 'Barang masuk dari pembelian dan keluar dari penjualan mengubah stok secara otomatis. Catat sekali, tidak perlu menulis ulang di tempat lain.',
      },
      {
        judul: 'Data pelanggan dan harganya tersimpan',
        isi: 'Harga khusus per pelanggan tersimpan di aplikasi, bukan di ingatan satu orang, sehingga siapa pun yang melayani memberi harga yang sama.',
      },
    ],
    cocok: [
      'Dijaga sendiri atau bersama kasir dan bagian gudang',
      'Jenis barang cukup banyak sehingga sulit diingat',
      'Barang keluar-masuk setiap hari sehingga catatan mudah tertinggal',
      'Ada pelanggan yang membeli berulang dengan harga khusus',
    ],
    belumCocok:
      'Kalau jenis barangnya masih sedikit dan jarang berganti, selisih stok biasanya masih bisa diingat dan dikoreksi langsung, sehingga sebagian fitur belum akan terpakai. Toko yang Anda jaga sendiri tetap bisa memakai ERP Studio untuk kasir, stok, dan pembukuan. Coba dulu gratis 3 hari untuk menilainya.',
    faq: [
      {
        tanya: 'Bisa menangani satuan beli dan satuan jual yang berbeda?',
        jawab:
          '<p>Bisa. Konversi satuan (misalnya beli per dus, jual per batang) diatur sekali di data barang, lalu perhitungannya berjalan mengikuti aturan itu. Ini termasuk penyebab selisih stok yang paling sering kami temui, dan biasanya paling cepat terasa perbaikannya.</p>',
      },
      {
        tanya: 'Kalau ada barang rusak atau hilang, bagaimana mencatatnya?',
        jawab:
          '<p>Dicatat sebagai penyesuaian stok dengan keterangannya. Ini penting: dengan begitu selisih tidak menghilang begitu saja dari catatan, melainkan tercatat sebagai kejadian yang bisa dilihat polanya dari waktu ke waktu.</p>',
      },
      {
        tanya: 'Apakah pesanan dari marketplace bisa masuk sendiri?',
        jawab:
          '<p>Belum bisa, dan kami menyampaikannya terus terang: <strong>ERP Studio tidak tersambung otomatis ke marketplace</strong>. Pesanan dari Shopee atau Tokopedia tetap dimasukkan manual. Kalau sebagian besar penjualan Anda berasal dari marketplace dengan volume harian tinggi, katakan sejak awal supaya kami bisa menilai dengan jujur apakah aplikasi ini menolong atau justru menambah pekerjaan.</p>',
      },
    ],
    pesanWa: 'Halo Bedah Data, saya punya toko bangunan/grosir dan mau tanya soal pencatatan stok',
  },
  // ==========================================================================
  {
    slug: 'kedai-kopi',
    nama: 'Kedai Kopi',
    title: 'Aplikasi Kasir, Stok Bahan, dan Pembukuan Kedai Kopi | Bedah Data',
    description:
      'Uang di laci tidak cocok dengan penjualan, bahan cepat habis tanpa ketahuan? ERP Studio mencatat penjualan kasir, stok bahan, dan biaya harian kedai kopi di satu tempat. Bayar sekali.',
    h1: 'Uang di laci tidak cocok dengan penjualan hari ini?',
    intro:
      'Di kedai kopi, uang masuk dari banyak arah: tunai, transfer, dan dompet digital. Bahan seperti biji kopi, susu, dan gelas juga keluar setiap jam. Kalau semuanya dicatat di tempat berbeda, sulit tahu berapa sebenarnya untung hari ini.',
    keluhan: [
      {
        judul: 'Tutup kedai, hitungan uang tidak cocok',
        isi: 'Uang di laci dihitung, dicocokkan dengan catatan, dan selisihnya tidak tahu dari mana. Apalagi kalau yang jaga bergantian.',
      },
      {
        judul: 'Bahan habis tanpa terasa',
        isi: 'Susu atau biji kopi tiba-tiba tinggal sedikit, padahal rasanya baru belanja. Tidak ada catatan yang menunjukkan bahan keluar berapa dan kapan.',
      },
      {
        judul: 'Tidak tahu menu mana yang paling laku',
        isi: 'Semua menu terasa sama larisnya. Padahal tahu menu terlaris membantu memutuskan bahan mana yang perlu disetok lebih banyak.',
      },
      {
        judul: 'Pengeluaran kecil tidak tercatat',
        isi: 'Es batu, gas, plastik, ongkos parkir. Kecil-kecil, tapi kalau dijumlah sebulan lumayan, dan sering lupa dicatat.',
      },
    ],
    penanganan: [
      {
        judul: 'Kasir mencatat setiap pesanan',
        isi: 'Setiap pesanan dicatat di kasir (POS) lengkap dengan cara bayarnya. Di akhir hari, laporan penjualan sudah tersusun dan bisa dicocokkan dengan uang di laci.',
      },
      {
        judul: 'Stok bahan selalu tercatat',
        isi: 'Belanja bahan dicatat di Pembelian sehingga stok bertambah. Saat dicek ulang, selisihnya dicatat di koreksi stok. Bahan yang menipis diberi tanda supaya tidak kehabisan.',
      },
      {
        judul: 'Penjualan per menu terlihat',
        isi: 'Karena semua pesanan tercatat, Anda bisa melihat menu mana yang paling sering dibeli dalam sebulan.',
      },
      {
        judul: 'Biaya harian masuk pembukuan',
        isi: 'Pengeluaran kecil dicatat di menu Biaya dan langsung ikut ke laporan laba rugi. Jadi untung bulanan terlihat tanpa menghitung ulang.',
      },
    ],
    cocok: [
      'Dikerjakan sendiri atau bersama beberapa barista dan kasir',
      'Ingin uang di laci cocok dengan catatan penjualan',
      'Ingin tahu menu terlaris dan untung tiap bulan',
      'Belanja bahan rutin dan ingin stoknya terpantau',
    ],
    belumCocok:
      'ERP Studio tidak tersambung otomatis ke aplikasi pesan antar seperti GoFood atau GrabFood. Pesanan dari sana tetap dicatat di kasir secara manual. Pengurangan bahan per gelas secara otomatis memakai resep produksi yang ada di paket Pro. Coba dulu gratis 3 hari untuk menilai cocok atau tidak.',
    faq: [
      {
        tanya: 'Bisa dipakai di tablet atau HP untuk kasir?',
        jawab:
          '<p>Bisa. ERP Studio dibuka lewat peramban (browser), jadi bisa dipakai di laptop, tablet, maupun HP selama ada internet.</p>',
      },
      {
        tanya: 'Pesanan dari GoFood atau GrabFood bisa masuk sendiri?',
        jawab:
          '<p>Belum. Pesanan dari aplikasi pesan antar dicatat di kasir secara manual. Setelah dicatat, penjualan dan stoknya ikut terbarui seperti pesanan biasa.</p>',
      },
    ],
    pesanWa: 'Halo Bedah Data, saya punya kedai kopi dan mau tanya soal ERP Studio',
  },

  // ==========================================================================
  {
    slug: 'jualan-online',
    nama: 'Jualan Online',
    title: 'Aplikasi Catat Pesanan, Stok, dan Untung Jualan Online | Bedah Data',
    description:
      'Pesanan dari WhatsApp, Instagram, dan marketplace tercecer? ERP Studio mengumpulkan pesanan, stok, dan pembukuan jualan online di satu tempat. Bayar sekali.',
    h1: 'Pesanan dari WhatsApp, Instagram, dan marketplace tercecer?',
    intro:
      'Jualan online berarti pesanan datang dari banyak pintu. Kalau catatannya ikut tersebar di chat, buku, dan beberapa aplikasi, gampang ada pesanan yang terlewat dan stok yang tidak sesuai.',
    keluhan: [
      {
        judul: 'Ada pesanan yang terlewat',
        isi: 'Chat menumpuk, dan satu-dua pesanan lupa dikirim. Pembeli kecewa, padahal barangnya ada.',
      },
      {
        judul: 'Stok di satu toko habis, di toko lain masih tertulis ada',
        isi: 'Barang yang sama dijual di beberapa tempat. Begitu laku di satu tempat, stok di tempat lain belum ikut berkurang.',
      },
      {
        judul: 'Untung bersih tidak jelas',
        isi: 'Omzet terlihat besar, tapi setelah potongan admin marketplace, ongkos kirim, dan bungkus, untungnya tidak tahu berapa.',
      },
      {
        judul: 'Barang retur bikin catatan kacau',
        isi: 'Barang yang dikembalikan pembeli sering tidak dicatat balik, jadi stok dan uangnya tidak cocok lagi.',
      },
    ],
    penanganan: [
      {
        judul: 'Semua pesanan di satu tempat',
        isi: 'Pesanan dari mana pun dicatat di ERP Studio dengan tanda asalnya (channel). Pesanan dari marketplace tetap diinput manual, karena belum ada sambungan otomatis ke marketplace.',
      },
      {
        judul: 'Satu stok untuk semua tempat jualan',
        isi: 'Setiap pesanan yang dicatat langsung mengurangi stok yang sama. Jadi Anda selalu tahu barang tinggal berapa.',
      },
      {
        judul: 'Pesanan dipantau sampai terkirim',
        isi: 'Papan pesanan menunjukkan mana yang baru masuk, sedang dikemas, dan sudah dikirim, lengkap dengan nomor resi.',
      },
      {
        judul: 'Potongan dan ongkos ikut dihitung',
        isi: 'Biaya admin, ongkos kirim, dan bungkus dicatat sebagai biaya, sehingga laporan laba rugi menunjukkan untung yang sebenarnya. Untuk hitungan cepat, ada juga kalkulator biaya marketplace gratis di halaman Alat Gratis.',
      },
    ],
    cocok: [
      'Jualan sendiri atau dibantu admin dan tim packing',
      'Pesanan datang dari beberapa tempat sekaligus',
      'Ingin stok dan untung bersih terlihat jelas',
      'Siap mencatat pesanan marketplace secara manual',
    ],
    belumCocok:
      'Kalau Anda butuh pesanan dari marketplace masuk sendiri tanpa diketik, ERP Studio belum bisa: sambungan otomatis ke marketplace belum ada. Kalau jumlah pesanan per hari sudah ratusan, mencatat manual akan terasa berat. Ceritakan kondisinya lewat WhatsApp, kami akan berterus terang.',
    faq: [
      {
        tanya: 'Apakah tersambung otomatis ke Shopee atau Tokopedia?',
        jawab:
          '<p>Belum. Pesanan dari marketplace dicatat manual di ERP Studio. Setelah dicatat, stok, pesanan, dan pembukuannya ikut terbarui sendiri.</p>',
      },
      {
        tanya: 'Bisa mencatat nomor resi?',
        jawab:
          '<p>Bisa. Di papan pesanan ada kolom resi, jadi tim tahu pesanan mana yang sudah dikirim.</p>',
      },
    ],
    pesanWa: 'Halo Bedah Data, saya jualan online dan mau tanya soal ERP Studio',
  },

  // ==========================================================================
  {
    slug: 'konveksi',
    nama: 'Konveksi Rumahan',
    title: 'Aplikasi Pesanan, Bahan Kain, dan Upah Penjahit Konveksi | Bedah Data',
    description:
      'Bahan kain keluar-masuk tanpa tercatat, DP pesanan tercecer, upah penjahit dihitung manual? ERP Studio membantu konveksi rumahan mencatat semuanya di satu tempat. Bayar sekali.',
    h1: 'Bahan kain habis, tapi tidak jelas terpakai untuk pesanan mana?',
    intro:
      'Di konveksi rumahan, satu pesanan melibatkan banyak hal: bahan kain, benang, kancing, upah penjahit, dan uang muka dari pemesan. Kalau dicatat di buku yang berbeda-beda, sulit tahu untung dari satu pesanan.',
    keluhan: [
      {
        judul: 'Bahan keluar tanpa catatan',
        isi: 'Kain dan aksesori diambil untuk pesanan, sisanya kadang kembali, kadang tidak. Saat dicek, jumlahnya tidak cocok.',
      },
      {
        judul: 'DP pesanan tercecer',
        isi: 'Uang muka masuk lewat transfer dan tunai. Waktu pelunasan, sulit memastikan siapa sudah bayar berapa.',
      },
      {
        judul: 'Upah penjahit dihitung manual',
        isi: 'Upah borongan per potong dijumlah di buku setiap minggu. Lama, dan mudah salah.',
      },
      {
        judul: 'Untung per pesanan tidak kelihatan',
        isi: 'Harga sudah disepakati, tapi berapa biaya bahan dan upahnya baru dihitung kira-kira.',
      },
    ],
    penanganan: [
      {
        judul: 'Pesanan dan uang muka tercatat',
        isi: 'Setiap pesanan dicatat lengkap dengan uang muka dan sisa tagihan, jadi saat pelunasan Anda tahu persis kurangnya berapa.',
      },
      {
        judul: 'Stok bahan terpantau',
        isi: 'Pembelian kain dan aksesori menambah stok. Pemakaian dan sisa bahan dicatat, sehingga stok di gudang sama dengan catatan.',
      },
      {
        judul: 'Produksi dan resep bahan',
        isi: 'Modul Produksi (paket Pro) mencatat perintah kerja dan bahan yang dipakai per produk, sehingga biaya bahan per pesanan terlihat.',
      },
      {
        judul: 'Upah dihitung dari catatan',
        isi: 'Upah borongan bisa dicatat lewat modul Komisi dan penggajian (paket Pro). Aturan persisnya kita cocokkan bersama saat demo.',
      },
    ],
    cocok: [
      'Dikerjakan sendiri atau bersama beberapa penjahit',
      'Menerima pesanan dengan uang muka',
      'Membeli bahan sendiri dan ingin stoknya terpantau',
      'Ingin tahu untung dari tiap pesanan',
    ],
    belumCocok:
      'Kalau Anda hanya menjahit pesanan dengan bahan dari pemesan dan tidak menyimpan stok, sebagian besar fitur belum terpakai. Fitur produksi dan upah ada di paket Pro. Coba dulu gratis 3 hari untuk menilainya sendiri.',
    faq: [
      {
        tanya: 'Fitur produksi ada di paket apa?',
        jawab:
          '<p>Modul Produksi ada di paket Pro. Paket Standar sudah mencakup penjualan, pesanan, pembelian, stok, dan pembukuan.</p>',
      },
      {
        tanya: 'Bisa mencatat pesanan seragam dalam jumlah besar dengan DP?',
        jawab:
          '<p>Bisa. Pesanan dicatat dengan rincian barang dan jumlahnya, lalu uang muka dicatat sebagai pembayaran pertama. Sisa tagihannya terlihat sampai lunas.</p>',
      },
    ],
    pesanWa: 'Halo Bedah Data, saya punya konveksi rumahan dan mau tanya soal ERP Studio',
  },
];
