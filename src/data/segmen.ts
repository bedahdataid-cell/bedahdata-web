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
    title: 'Aplikasi Hitung Komisi Mekanik & Antrean Servis Bengkel | Bedah Data',
    description:
      'Komisi mekanik masih dihitung manual tiap akhir bulan? ERP Studio menghitung komisi dari data servis, mengatur antrean order, dan mengurus gaji dalam satu sistem. Bayar sekali.',
    h1: 'Komisi mekanik masih dihitung manual tiap akhir bulan?',
    intro:
      'Kalau tiap akhir bulan Anda masih membuka nota servis satu per satu untuk menghitung bagian tiap mekanik, masalahnya bukan ketelitian Anda. Masalahnya catatan servis, sparepart, dan upah tersimpan di tempat yang berbeda-beda — jadi tidak ada satu tempat yang bisa langsung menjawab.',
    keluhan: [
      {
        judul: 'Akhir bulan jadi malam lembur',
        isi: 'Nota servis dikumpulkan, dicocokkan dengan siapa yang mengerjakan, lalu dihitung satu-satu. Selesai tengah malam, dan besoknya masih ada yang protes karena merasa ada servis yang belum terhitung.',
      },
      {
        judul: 'Sparepart keluar tanpa tercatat',
        isi: 'Barang diambil dari rak untuk satu pekerjaan, dipakai sebagian, sisanya dikembalikan — atau tidak. Saat stok opname, angkanya tidak pernah benar-benar cocok.',
      },
      {
        judul: '"Motor Pak Andi sudah selesai belum?"',
        isi: 'Untuk menjawab satu pertanyaan itu, Anda harus bertanya ke tiga orang dulu. Padahal pelanggan sedang menunggu di telepon.',
      },
      {
        judul: 'Mekanik merasa hitungannya tidak transparan',
        isi: 'Ketika perhitungan komisi hanya ada di kepala dan buku pemilik, kepercayaan gampang goyah — bukan karena ada yang curang, tapi karena tidak ada yang bisa dicek bersama.',
      },
    ],
    penanganan: [
      {
        judul: 'Komisi terhitung dari data servis',
        isi: 'Setiap pekerjaan servis mencatat siapa yang mengerjakan. Karena komisi dihitung dari catatan yang sama dengan yang dipakai menagih pelanggan, tidak ada lagi rekap terpisah di akhir bulan — dan hitungannya bisa ditunjukkan ke mekanik saat ditanya.',
      },
      {
        judul: 'Antrean servis dari masuk sampai selesai',
        isi: 'Setiap kendaraan yang masuk punya status yang terlihat: sedang dikerjakan, menunggu sparepart, atau siap diambil. Pertanyaan "sudah selesai belum" bisa dijawab dengan membuka satu layar.',
      },
      {
        judul: 'Sparepart terpotong otomatis dari stok',
        isi: 'Sparepart yang dipakai pada satu servis langsung mengurangi stok dan ikut masuk ke nota pelanggan. Jadi barang yang keluar dari rak selalu ada pasangannya di catatan.',
      },
      {
        judul: 'Gaji dan komisi dalam satu tempat',
        isi: 'Absensi, gaji pokok, dan komisi dihitung di sistem yang sama. Tanggal gajian tidak lagi berarti membuka tiga file berbeda.',
      },
    ],
    cocok: [
      'Punya minimal 3 orang yang terlibat (mis. pemilik, kasir/admin, dan beberapa mekanik)',
      'Ada komisi atau upah per pekerjaan yang harus dihitung',
      'Menjual sparepart, bukan hanya jasa',
      'Antrean servis sudah cukup ramai sehingga sulit diingat',
    ],
    belumCocok:
      'Kalau bengkel masih Anda kerjakan sendiri atau berdua dan tidak ada komisi yang perlu dihitung, sistem ini belum perlu. Yang Anda butuhkan adalah catatan sederhana, dan untuk itu aplikasi pencatatan gratis sudah cukup baik. Kami akan mengatakan hal yang sama saat demo.',
    faq: [
      {
        tanya: 'Komisi mekanik di tempat saya hitungannya tidak standar. Bisa menyesuaikan?',
        jawab:
          '<p>Perhitungan komisi bisa disesuaikan dengan cara yang sudah Anda pakai — misalnya persentase dari jasa servis, nominal tetap per jenis pekerjaan, atau kombinasi keduanya. Yang perlu kami tahu saat demo adalah aturan main di bengkel Anda, bukan sebaliknya Anda yang menyesuaikan sistem.</p>',
      },
      {
        tanya: 'Mekanik saya tidak terbiasa pakai komputer. Bagaimana?',
        jawab:
          '<p>Dalam kebanyakan bengkel, yang menginput bukan mekanik melainkan admin atau kasir — mekanik cukup dicatat sebagai pelaksana pekerjaan. Kalau Anda ingin mekanik ikut mengakses, sistem mendukung <strong>hak akses per peran</strong>, jadi mereka hanya melihat pekerjaan yang menjadi tanggung jawabnya, bukan seluruh data bengkel.</p>',
      },
      {
        tanya: 'Bisa mencatat jasa dan sparepart dalam satu nota?',
        jawab:
          '<p>Bisa. Satu nota servis dapat memuat jasa pengerjaan sekaligus sparepart yang dipakai. Sparepart-nya otomatis mengurangi stok, sementara bagian jasanya yang menjadi dasar perhitungan komisi mekanik.</p>',
      },
    ],
    pesanWa: 'Halo Bedah Data, saya punya bengkel dan mau tanya soal hitung komisi mekanik',
  },

  // ==========================================================================
  {
    slug: 'salon',
    nama: 'Salon & Klinik',
    title: 'Aplikasi Hitung Komisi Terapis Salon & Klinik | Bedah Data',
    description:
      'Komisi terapis, jadwal pelanggan, stok produk, dan gaji dalam satu sistem. ERP Studio menghitung komisi dari data layanan — bayar sekali, bukan langganan bulanan.',
    h1: 'Komisi terapis masih dihitung dari buku catatan tiap akhir bulan?',
    intro:
      'Di salon dan klinik, hampir semua yang penting bergantung pada siapa yang mengerjakan: komisi terapis, pelanggan yang minta orang tertentu, sampai produk yang terpakai selama perawatan. Ketika ketiganya dicatat di tempat terpisah, akhir bulan selalu berakhir dengan cocok-cocokan.',
    keluhan: [
      {
        judul: 'Komisi per terapis dihitung manual',
        isi: 'Buku layanan dibuka, dihitung siapa mengerjakan apa, lalu dikalikan persentasenya. Butuh waktu berjam-jam, dan satu baris yang terlewat berarti ada yang merasa dirugikan.',
      },
      {
        judul: 'Produk perawatan habis tanpa ketahuan',
        isi: 'Krim, cat rambut, dan bahan perawatan terpakai sedikit demi sedikit tiap layanan. Karena tidak tercatat per pemakaian, Anda baru sadar saat barangnya benar-benar habis.',
      },
      {
        judul: 'Pelanggan langganan tidak terlacak',
        isi: 'Siapa yang terakhir datang tiga bulan lalu, siapa yang biasanya perawatan tiap bulan — semuanya mengandalkan ingatan kasir, bukan catatan.',
      },
      {
        judul: 'Terapis bertanya soal hitungan, Anda harus mengulang dari nol',
        isi: 'Karena perhitungannya tidak tersimpan rapi, satu pertanyaan berarti membuka lagi seluruh catatan bulan itu.',
      },
    ],
    penanganan: [
      {
        judul: 'Komisi dihitung dari catatan layanan',
        isi: 'Setiap layanan mencatat terapis yang mengerjakan. Komisi dihitung dari data yang sama dengan yang dipakai menagih pelanggan, sehingga hitungannya bisa dibuka kembali kapan saja saat ditanyakan.',
      },
      {
        judul: 'Produk terpotong saat layanan dicatat',
        isi: 'Bahan yang dipakai pada satu perawatan langsung mengurangi stok. Anda bisa melihat produk mana yang menipis sebelum benar-benar habis di tengah jam ramai.',
      },
      {
        judul: 'Riwayat pelanggan tersimpan',
        isi: 'Siapa pernah mengambil layanan apa dan kapan terakhir datang tercatat rapi — jadi menghubungi pelanggan lama tidak lagi bergantung pada ingatan seseorang.',
      },
      {
        judul: 'Gaji dan komisi jadi satu proses',
        isi: 'Absensi, gaji pokok, dan komisi terapis dihitung dalam sistem yang sama, sehingga tanggal gajian tidak lagi menjadi hari paling repot dalam sebulan.',
      },
    ],
    cocok: [
      'Punya minimal 3 orang terlibat (pemilik, kasir/admin, dan beberapa terapis)',
      'Ada komisi per layanan atau target yang harus dihitung',
      'Memakai produk/bahan yang stoknya perlu dipantau',
      'Punya pelanggan berulang yang ingin dilacak riwayatnya',
    ],
    belumCocok:
      'Kalau salon masih Anda kerjakan sendiri tanpa terapis lain, tidak ada komisi yang perlu dicocokkan antar orang — dan sistem ini akan terasa berlebihan. Catatan sederhana sudah cukup, dan kami akan mengatakannya terus terang.',
    faq: [
      {
        tanya: 'Terapis saya komisinya beda-beda per jenis layanan. Bisa?',
        jawab:
          '<p>Bisa. Persentase atau nominal komisi dapat dibedakan per jenis layanan, dan juga bisa berbeda antar terapis bila memang begitu aturan di tempat Anda. Yang penting aturannya kita tetapkan sekali di awal — setelah itu perhitungannya berjalan mengikuti data layanan.</p>',
      },
      {
        tanya: 'Bisa mencatat paket perawatan yang dibayar di muka?',
        jawab:
          '<p>Bisa dicatat sebagai penjualan dengan pemakaian bertahap, sehingga sisa kunjungan pelanggan tetap terlihat. Karena tiap salon punya aturan paket yang berbeda, sebaiknya bawa contoh paket Anda saat demo supaya kami bisa menunjukkan penanganannya secara spesifik — dan jujur bila ada bagian yang perlu penyesuaian.</p>',
      },
      {
        tanya: 'Apakah ada fitur booking online untuk pelanggan?',
        jawab:
          '<p>Terus terang: <strong>belum ada halaman booking yang bisa diakses pelanggan sendiri</strong>. Yang tersedia adalah pencatatan jadwal dan antrean dari sisi admin salon. Kalau booking online adalah kebutuhan utama Anda, sebaiknya kita bicarakan dulu sebelum Anda memutuskan membeli.</p>',
      },
    ],
    pesanWa: 'Halo Bedah Data, saya punya salon/klinik dan mau tanya soal hitung komisi terapis',
  },

  // ==========================================================================
  {
    slug: 'percetakan',
    nama: 'Percetakan & Studio',
    title: 'Sistem Pencatatan Order Percetakan & Studio Foto | Bedah Data',
    description:
      'Antrean order percetakan dari masuk sampai selesai, plus piutang pelanggan yang belum ditagih. ERP Studio dipakai lebih dulu di usaha cetak kami sendiri.',
    h1: 'Ada pesanan yang kelewat karena catatannya kececer?',
    intro:
      'Order percetakan jarang selesai dalam sekali sentuh. Ada desain yang menunggu revisi, ada yang menunggu bahan, ada yang sudah jadi tapi belum diambil — dan ada yang sudah diambil tapi belum dibayar. Semua itu berjalan bersamaan, dan buku catatan tidak bisa menunjukkan semuanya sekaligus.',
    keluhan: [
      {
        judul: 'Order berjalan tidak terlihat sekaligus',
        isi: 'Berapa pekerjaan yang sedang jalan sekarang? Untuk menjawabnya Anda harus bertanya ke bagian desain, bagian produksi, lalu mengecek nota di meja kasir.',
      },
      {
        judul: 'Piutang baru ketahuan saat rekap',
        isi: 'Pelanggan langganan mengambil barang dulu, bayar belakangan. Kalau tidak ada yang mencatat rapi, tagihan yang lupa ditagih baru ketahuan berbulan-bulan kemudian.',
      },
      {
        judul: '"Kertas A3 masih ada berapa rim?"',
        isi: 'Jawaban "kayaknya masih ada" itu mahal — karena ketahuannya justru saat pekerjaan sudah terlanjur diterima dan tenggatnya besok.',
      },
      {
        judul: 'Revisi tidak tercatat sebagai pekerjaan',
        isi: 'Revisi berkali-kali memakan jam kerja, tapi karena tidak tercatat, tidak pernah terlihat berapa sebenarnya biaya mengerjakan satu order.',
      },
    ],
    penanganan: [
      {
        judul: 'Papan antrean order berjalan',
        isi: 'Setiap pesanan punya tahapan yang terlihat — dari masuk, dikerjakan, menunggu konfirmasi, sampai selesai. Satu layar menjawab pertanyaan "apa saja yang sedang jalan".',
      },
      {
        judul: 'Piutang tercatat sejak barang keluar',
        isi: 'Order yang diambil tapi belum dibayar tercatat sebagai tagihan berjalan, lengkap dengan umur tagihannya. Jadi Anda tahu mana yang perlu ditagih lebih dulu.',
      },
      {
        judul: 'Bahan berkurang mengikuti pemakaian',
        isi: 'Kertas, tinta, dan bahan lain yang dipakai satu order langsung mengurangi stok — sehingga "masih ada berapa" bisa dijawab tanpa harus mengecek gudang.',
      },
      {
        judul: 'Dipakai lebih dulu di usaha kami sendiri',
        isi: 'Alur pesanan di ERP Studio lahir dari usaha edit dan cetak foto yang kami jalankan sendiri. Dirancang dari pekerjaan sehari-hari, bukan dari daftar fitur.',
      },
    ],
    cocok: [
      'Punya minimal 3 orang terlibat (admin, desainer/operator, produksi)',
      'Order melewati beberapa tahap sebelum selesai',
      'Ada pelanggan langganan yang bayar belakangan (piutang)',
      'Memakai bahan yang stoknya perlu dipantau',
    ],
    belumCocok:
      'Kalau semua order Anda kerjakan sendiri dari desain sampai cetak, dan pembayarannya selalu langsung lunas, tidak ada yang perlu dicocokkan antar orang. Dalam kondisi itu sistem ini belum menolong banyak.',
    faq: [
      {
        tanya: 'Satu order bisa punya beberapa tahap pengerjaan?',
        jawab:
          '<p>Bisa. Satu pesanan dapat dipecah menjadi beberapa langkah dengan status masing-masing, sehingga terlihat pekerjaan itu sedang tertahan di bagian mana. Inilah yang membedakan pencatatan order jasa dari sekadar mencatat penjualan barang.</p>',
      },
      {
        tanya: 'Bagaimana dengan pelanggan yang bayar bertahap?',
        jawab:
          '<p>Pembayaran bertahap dan uang muka bisa dicatat, dan sisa tagihannya tetap terlihat sebagai piutang berjalan. Daftar tagihan juga bisa dilihat berdasarkan umurnya, sehingga yang paling lama tertunggak tidak terlewat.</p>',
      },
      {
        tanya: 'Bisa menghitung biaya per order untuk tahu untungnya?',
        jawab:
          '<p>Bahan yang dipakai per order tercatat, jadi Anda bisa melihat perbandingan antara nilai order dan bahan yang terpakai. Perlu kami katakan terus terang: <strong>ketelitiannya bergantung pada disiplin mencatat pemakaian bahan</strong>. Sistem tidak bisa menebak bahan yang dipakai tanpa dicatat.</p>',
      },
    ],
    pesanWa: 'Halo Bedah Data, saya punya percetakan/studio dan mau tanya soal pencatatan order',
  },

  // ==========================================================================
  {
    slug: 'toko-bangunan',
    nama: 'Toko Bangunan & Grosir',
    title: 'Aplikasi Stok Barang Toko Bangunan & Grosir | Bedah Data',
    description:
      'Stok di catatan tidak cocok dengan barang di gudang? ERP Studio mencatat mutasi stok, penjualan, dan pembelian dalam satu sistem. Bayar sekali.',
    h1: 'Stok di catatan 40, di gudang 33. Ke mana perginya 7?',
    intro:
      'Di toko bangunan dan grosir, selisih stok jarang disebabkan satu hal besar. Biasanya kumpulan hal kecil: retur yang tidak dicatat, barang pecah, salah input satuan, atau barang diambil untuk contoh lalu lupa dikembalikan. Masing-masing kecil — tapi menumpuk sampai angkanya tidak bisa dipercaya lagi.',
    keluhan: [
      {
        judul: 'Stok opname selalu selisih',
        isi: 'Setiap kali dihitung ulang, ada saja yang tidak cocok. Karena tidak tahu selisihnya berasal dari mana, yang bisa dilakukan hanya menyesuaikan angkanya — dan masalah yang sama terulang bulan depan.',
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
        isi: 'Setiap pergerakan barang tercatat: masuk dari pembelian, keluar karena penjualan, retur, atau penyesuaian. Ketika ada selisih, Anda bisa menelusuri riwayatnya — bukan sekadar menyesuaikan angka akhirnya.',
      },
      {
        judul: 'Selisih ketahuan sebelum menumpuk',
        isi: 'Stok opname dicatat sebagai penyesuaian dengan keterangannya, bukan menimpa angka lama diam-diam. Jadi Anda tahu berapa yang hilang dan kapan — bukan cuma tahu angkanya sudah tidak cocok.',
      },
      {
        judul: 'Pembelian dan penjualan terhubung ke stok',
        isi: 'Barang masuk dari pembelian dan keluar dari penjualan mengubah stok secara otomatis, tanpa dicatat dua kali di tempat berbeda.',
      },
      {
        judul: 'Data pelanggan dan harganya tersimpan',
        isi: 'Harga khusus per pelanggan tersimpan di sistem, bukan di ingatan satu orang — sehingga siapa pun yang melayani memberi harga yang sama.',
      },
    ],
    cocok: [
      'Punya minimal 3 orang terlibat (kasir, gudang, pemilik)',
      'Jenis barang cukup banyak sehingga sulit diingat',
      'Barang keluar-masuk setiap hari sehingga catatan mudah tertinggal',
      'Ada pelanggan yang membeli berulang dengan harga khusus',
    ],
    belumCocok:
      'Kalau toko masih Anda jaga sendiri dan barangnya sedikit, selisih stok biasanya masih bisa diingat dan dikoreksi langsung. Dalam kondisi itu, sistem 8 modul akan terasa berlebihan.',
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
        tanya: 'Apakah bisa langsung menarik order dari marketplace?',
        jawab:
          '<p>Belum bisa, dan kami menyampaikannya terus terang: <strong>tidak ada integrasi otomatis ke marketplace</strong>. Order dari Shopee atau Tokopedia tetap diinput manual. Kalau sebagian besar penjualan Anda berasal dari marketplace dengan volume harian tinggi, katakan sejak awal supaya kami bisa jujur menilai apakah sistem ini menolong atau justru menambah pekerjaan.</p>',
      },
    ],
    pesanWa: 'Halo Bedah Data, saya punya toko bangunan/grosir dan mau tanya soal pencatatan stok',
  },
];
