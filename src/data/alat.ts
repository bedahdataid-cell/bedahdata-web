// ============================================================================
// DATA SEMUA ALAT GRATIS (kalkulator)
// ----------------------------------------------------------------------------
// Satu mesin, banyak halaman — pola "satu konsep, banyak halaman" yang
// ditetapkan di dokumen-bisnis/SPEK_TOOLS_GRATIS_WEB_2026-08-05.md §1.
//
// 🔴 TIGA ATURAN YANG TIDAK BOLEH DILANGGAR (spek §0):
//    1. Kalkulator TERBUKA — tidak ada form penghalang. Hasil dasar langsung
//       tampil. Yang diminta lewat WhatsApp hanya BONUS-nya.
//    2. Dilarang menghitung penghematan / proyeksi untung. Semua rumus di
//       berkas ini murni ARITMETIKA dari angka yang diketik pengguna sendiri.
//    3. Angka pihak ketiga (tarif marketplace) WAJIB diberi tanggal & sumber.
//
// 🔵 Menambah alat baru = menambah satu objek di ALAT + satu berkas halaman
//    tipis di src/pages/alat/. Mesinnya tidak perlu disentuh.
// ============================================================================

// --- Bentuk data -------------------------------------------------------------

/** Satu kolom isian di kalkulator. */
export interface Isian {
  /** Nama kunci — dipakai di rumus. Huruf kecil tanpa spasi. */
  kunci: string;
  label: string;
  /** Keterangan kecil di bawah kolom. Boleh dikosongkan. */
  bantuan?: string;
  jenis: 'rupiah' | 'angka' | 'persen' | 'pilihan' | 'teks';
  /** Nilai awal saat halaman dibuka — dipilih agar contohnya masuk akal. */
  awal?: string | number;
  /** Untuk jenis 'pilihan'. */
  opsi?: { nilai: string; label: string }[];
  /**
   * Kolom hanya muncul kalau isian lain bernilai tertentu.
   * Contoh: { kunci: 'skema', nilai: ['persen'] }
   */
  tampilBila?: { kunci: string; nilai: string[] };
  /** Kolom boleh dibiarkan kosong tanpa membuat hasil gagal. */
  opsional?: boolean;
}

/** Satu baris hasil perhitungan. */
export interface Hasil {
  label: string;
  /** Cara menampilkan nilainya. */
  format: 'rupiah' | 'angka' | 'persen' | 'teks';
  /**
   * Rumusnya. Menerima objek nilai ({ omzet: 30000000, persen: 5 }) dan
   * mengembalikan angka atau teks. 🔴 Murni aritmetika dari input pengguna.
   */
  hitung: (n: Record<string, number | string>) => number | string;
  /** Baris utama ditampilkan lebih besar & berwarna. */
  utama?: boolean;
  /** Baris hanya muncul kalau fungsi ini mengembalikan true. */
  tampilBila?: (n: Record<string, number | string>) => boolean;
}

/** Peringatan yang muncul saat syarat tertentu terpenuhi (mis. batas lembur). */
export interface Peringatan {
  /** Muncul kalau fungsi ini true. */
  bila: (n: Record<string, number | string>) => boolean;
  teks: string;
  /** 'awas' = merah (melanggar aturan), 'info' = netral. */
  nada?: 'awas' | 'info';
}

export interface Faq {
  tanya: string;
  jawab: string;
}

export interface Alat {
  /** Bagian akhir URL: /alat/{kelompok}/{slug}/ */
  slug: string;
  kelompok: 'karyawan' | 'jualan-online' | 'dokumen';
  /** Judul H1 halaman. */
  judul: string;
  /** Judul pendek untuk kartu daftar & menu. */
  judulPendek: string;
  /** Satu baris penjelas di bawah H1. */
  ringkas: string;
  /** Meta description (150–160 karakter). */
  deskripsi: string;
  /** <title> halaman. */
  judulSeo: string;
  isian: Isian[];
  hasil: Hasil[];
  peringatan?: Peringatan[];
  /** Tawaran bonus di tombol WhatsApp. 🔴 Bonus, bukan syarat pakai. */
  bonusWa: string;
  /** Pesan pra-isi WhatsApp — 🔴 berbeda per alat, untuk atribusi manual. */
  pesanWa: string;
  /** Penjelasan cara hitung, 300–500 kata. Ditulis sebagai HTML sederhana. */
  penjelasan: string;
  faq: Faq[];
  /** Catatan sumber & tanggal, wajib untuk angka pihak ketiga. */
  sumber?: string;
}

// --- Nama kelompok -----------------------------------------------------------

export const KELOMPOK = {
  karyawan: {
    nama: 'Karyawan & Gaji',
    ringkas: 'Komisi, lembur, dan THR — hitungannya sering bikin ragu tiap bulan.',
  },
  'jualan-online': {
    nama: 'Jualan Online',
    ringkas: 'Potongan marketplace, margin, dan ongkir yang menggerus untung.',
  },
  dokumen: {
    nama: 'Dokumen Usaha',
    ringkas: 'Nota dan surat yang rapi tanpa perlu aplikasi berbayar.',
  },
} as const;

// --- Pembantu ----------------------------------------------------------------

const ang = (v: number | string): number => {
  const n = typeof v === 'number' ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : 0;
};

/** Upah sebulan versi resmi = gaji pokok + tunjangan tetap. */
const upahSebulan = (n: Record<string, number | string>) =>
  ang(n.gajipokok) + ang(n.tunjangan);

// ============================================================================
// KELOMPOK 1 — KARYAWAN
// ============================================================================

// --- Mesin komisi (dipakai 3 varian halaman) --------------------------------
// Istilah & contohnya beda, rumusnya sama persis (spek §3a).

interface VarianKomisi {
  slug: string;
  judul: string;
  judulPendek: string;
  judulSeo: string;
  ringkas: string;
  deskripsi: string;
  /** Sebutan pekerjanya: "teknisi", "kapster", "sales". */
  peran: string;
  /** Sebutan hasil kerjanya: "servis", "treatment", "penjualan". */
  kerja: string;
  penjelasan: string;
  faq: Faq[];
  contohOmzet: number;
  contohPersen: number;
}

function buatKomisi(v: VarianKomisi): Alat {
  return {
    slug: v.slug,
    kelompok: 'karyawan',
    judul: v.judul,
    judulPendek: v.judulPendek,
    judulSeo: v.judulSeo,
    ringkas: v.ringkas,
    deskripsi: v.deskripsi,
    bonusWa: `Mau rekap semua ${v.peran} sekaligus + template Google Sheets-nya? Klik WhatsApp, saya kirimkan.`,
    pesanWa: `Halo Bedah Data, saya baru pakai kalkulator komisi ${v.peran}. Boleh minta template rekap semua ${v.peran} + Google Sheets-nya?`,
    isian: [
      {
        kunci: 'nama',
        label: `Nama ${v.peran}`,
        bantuan: 'Boleh dikosongkan — hanya supaya hasilnya mudah dibaca.',
        jenis: 'teks',
        opsional: true,
      },
      {
        kunci: 'skema',
        label: 'Skema komisi',
        jenis: 'pilihan',
        awal: 'persen',
        opsi: [
          { nilai: 'persen', label: `Persen dari omzet ${v.kerja}` },
          { nilai: 'nominal', label: `Nominal tetap per ${v.kerja}` },
          { nilai: 'tingkat', label: 'Bertingkat (ada target)' },
        ],
      },

      // --- Skema 1: persen dari omzet ---
      {
        kunci: 'omzet',
        label: `Omzet ${v.kerja} bulan ini (Rp)`,
        jenis: 'rupiah',
        awal: v.contohOmzet,
        tampilBila: { kunci: 'skema', nilai: ['persen', 'tingkat'] },
      },
      {
        kunci: 'persen',
        label: 'Persentase komisi (%)',
        jenis: 'persen',
        awal: v.contohPersen,
        tampilBila: { kunci: 'skema', nilai: ['persen'] },
      },

      // --- Skema 2: nominal per order ---
      {
        kunci: 'jumlahorder',
        label: `Jumlah ${v.kerja} bulan ini`,
        jenis: 'angka',
        awal: 40,
        tampilBila: { kunci: 'skema', nilai: ['nominal'] },
      },
      {
        kunci: 'nominal',
        label: `Komisi per ${v.kerja} (Rp)`,
        jenis: 'rupiah',
        awal: 25000,
        tampilBila: { kunci: 'skema', nilai: ['nominal'] },
      },

      // --- Skema 3: bertingkat ---
      {
        kunci: 'target',
        label: 'Target omzet (Rp)',
        bantuan: 'Batas untuk naik ke persentase yang lebih tinggi.',
        jenis: 'rupiah',
        awal: v.contohOmzet,
        tampilBila: { kunci: 'skema', nilai: ['tingkat'] },
      },
      {
        kunci: 'persenbawah',
        label: 'Persen sebelum target (%)',
        jenis: 'persen',
        awal: v.contohPersen,
        tampilBila: { kunci: 'skema', nilai: ['tingkat'] },
      },
      {
        kunci: 'persenatas',
        label: 'Persen untuk kelebihan di atas target (%)',
        jenis: 'persen',
        awal: v.contohPersen + 2,
        tampilBila: { kunci: 'skema', nilai: ['tingkat'] },
      },

      {
        kunci: 'gajipokok',
        label: 'Gaji pokok (Rp)',
        bantuan: 'Boleh dikosongkan kalau hanya ingin melihat komisinya saja.',
        jenis: 'rupiah',
        awal: 0,
        opsional: true,
      },
    ],
    hasil: [
      {
        label: 'Komisi bulan ini',
        format: 'rupiah',
        utama: true,
        hitung: (n) => {
          const skema = String(n.skema);
          if (skema === 'nominal') return ang(n.jumlahorder) * ang(n.nominal);
          if (skema === 'tingkat') {
            const omzet = ang(n.omzet);
            const target = ang(n.target);
            const bawah = Math.min(omzet, target) * (ang(n.persenbawah) / 100);
            const atas = Math.max(0, omzet - target) * (ang(n.persenatas) / 100);
            return bawah + atas;
          }
          return ang(n.omzet) * (ang(n.persen) / 100);
        },
      },
      {
        label: 'Komisi dari omzet sampai target',
        format: 'rupiah',
        tampilBila: (n) => String(n.skema) === 'tingkat',
        hitung: (n) =>
          Math.min(ang(n.omzet), ang(n.target)) * (ang(n.persenbawah) / 100),
      },
      {
        label: 'Komisi dari kelebihan di atas target',
        format: 'rupiah',
        tampilBila: (n) => String(n.skema) === 'tingkat',
        hitung: (n) =>
          Math.max(0, ang(n.omzet) - ang(n.target)) * (ang(n.persenatas) / 100),
      },
      {
        label: 'Gaji pokok',
        format: 'rupiah',
        tampilBila: (n) => ang(n.gajipokok) > 0,
        hitung: (n) => ang(n.gajipokok),
      },
      {
        label: 'Total dibayarkan (gaji pokok + komisi)',
        format: 'rupiah',
        utama: true,
        tampilBila: (n) => ang(n.gajipokok) > 0,
        hitung: (n) => {
          const skema = String(n.skema);
          let komisi: number;
          if (skema === 'nominal') komisi = ang(n.jumlahorder) * ang(n.nominal);
          else if (skema === 'tingkat') {
            const omzet = ang(n.omzet);
            const target = ang(n.target);
            komisi =
              Math.min(omzet, target) * (ang(n.persenbawah) / 100) +
              Math.max(0, omzet - target) * (ang(n.persenatas) / 100);
          } else komisi = ang(n.omzet) * (ang(n.persen) / 100);
          return ang(n.gajipokok) + komisi;
        },
      },
    ],
    penjelasan: v.penjelasan,
    faq: v.faq,
  };
}

const komisiBengkel = buatKomisi({
  slug: 'komisi-teknisi-bengkel',
  judul: 'Kalkulator Komisi Teknisi Bengkel',
  judulPendek: 'Komisi Teknisi Bengkel',
  judulSeo: 'Kalkulator Komisi Teknisi Bengkel — Hitung Otomatis | Bedah Data',
  ringkas:
    'Hitung komisi mekanik dari omzet jasa servis, nominal per servis, atau skema bertingkat. Langsung pakai, tanpa daftar.',
  deskripsi:
    'Kalkulator komisi teknisi bengkel: hitung komisi mekanik dari persen omzet jasa, nominal per servis, atau skema bertingkat bertarget. Gratis, langsung pakai.',
  peran: 'teknisi',
  kerja: 'servis',
  contohOmzet: 24000000,
  contohPersen: 10,
  penjelasan: `
<h2>Cara menghitung komisi teknisi bengkel</h2>
<p>Di bengkel, komisi biasanya dihitung dari <strong>omzet jasa</strong> — bukan dari
total nota. Alasannya sederhana: sparepart itu barang yang Anda beli lalu jual
kembali, jadi marginnya sudah tipis dan sudah jadi milik bengkel. Yang benar-benar
dikerjakan teknisi adalah jasanya.</p>

<p>Ada tiga skema yang paling sering dipakai, dan ketiganya bisa dihitung di
kalkulator ini.</p>

<h3>1. Persen dari omzet jasa</h3>
<p>Paling umum. Teknisi mendapat persentase tetap dari nilai jasa yang dia kerjakan
sebulan. Rumusnya:</p>
<p><code>Komisi = omzet jasa × persentase</code></p>
<p>Contoh hitungan: kalau omzet jasa seorang teknisi sebulan Rp 24.000.000 dan
komisinya 10%, maka komisinya Rp 2.400.000. Angka ini contoh — silakan ganti dengan
angka bengkel Anda sendiri di kolom di atas.</p>

<h3>2. Nominal tetap per servis</h3>
<p>Dipakai kalau jenis pekerjaannya seragam, misalnya bengkel yang mayoritas servis
rutin. Teknisi dapat jumlah tetap tiap unit yang selesai, berapa pun nilai notanya.</p>
<p><code>Komisi = jumlah servis × nominal per servis</code></p>
<p>Kelebihannya: mudah dihitung dan mudah dijelaskan ke teknisi. Kekurangannya:
pekerjaan berat dan pekerjaan ringan dihargai sama, jadi biasanya perlu dibedakan
per jenis pekerjaan kalau bengkel sudah ramai.</p>

<h3>3. Bertingkat (ada target)</h3>
<p>Persentase kecil sampai target tercapai, lalu persentase lebih besar untuk
kelebihannya. Yang perlu diperhatikan: <strong>persentase yang lebih besar hanya
berlaku untuk selisih di atas target</strong>, bukan untuk seluruh omzet. Kalkulator
ini memecah keduanya supaya terlihat jelas.</p>

<h3>Yang sering bikin ribut di akhir bulan</h3>
<p>Bukan rumusnya — rumusnya biasanya sudah disepakati. Yang jadi masalah adalah
<strong>catatannya</strong>: nota mana masuk teknisi mana, servis yang dikerjakan
berdua dibagi bagaimana, dan pekerjaan ulang (rework) dihitung atau tidak. Sepakati
tiga hal itu di depan, tulis, lalu pakai konsisten.</p>

<p>Satu hal lagi yang sering terlewat: <strong>tetapkan kapan komisi dianggap
"jadi"</strong> — saat pekerjaan selesai, atau saat pelanggan benar-benar membayar.
Untuk bengkel yang melayani perusahaan dengan pembayaran tempo, dua tanggal itu bisa
berjarak sebulan.</p>
`,
  faq: [
    {
      tanya: 'Berapa persen komisi teknisi bengkel yang wajar?',
      jawab:
        '<p>Tidak ada angka resmi — ini kesepakatan antara bengkel dan teknisi, dan berbeda-beda tergantung apakah teknisi juga menerima gaji pokok, siapa yang menanggung alat, dan seberapa ramai bengkelnya. Yang penting: tetapkan dasarnya (omzet jasa, bukan total nota), tulis kesepakatannya, dan pakai konsisten tiap bulan.</p>',
    },
    {
      tanya: 'Komisi dihitung dari total nota atau dari jasa saja?',
      jawab:
        '<p>Umumnya dari <strong>jasa saja</strong>. Sparepart adalah barang yang dibeli bengkel lalu dijual kembali — marginnya sudah tipis dan risikonya (stok mati, salah beli) ditanggung bengkel. Kalau komisi dihitung dari total nota, teknisi yang kebetulan mengerjakan mobil dengan sparepart mahal akan dapat jauh lebih besar tanpa kerja lebih berat.</p>',
    },
    {
      tanya: 'Bagaimana kalau satu servis dikerjakan dua teknisi?',
      jawab:
        '<p>Sepakati porsinya di depan — misalnya dibagi rata, atau 70:30 untuk yang memegang pekerjaan utama. Yang penting aturannya ditulis sebelum pekerjaannya jalan, bukan diputuskan saat pembagian komisi. Di kalkulator ini, masukkan saja porsi omzet masing-masing teknisi secara terpisah.</p>',
    },
    {
      tanya: 'Kalau pekerjaan harus diulang, komisinya bagaimana?',
      jawab:
        '<p>Ini perlu disepakati tertulis karena paling sering jadi sumber perselisihan. Praktik yang umum: pekerjaan ulang karena kesalahan pengerjaan tidak dihitung sebagai omzet baru. Tapi apa pun aturan yang Anda pilih, yang menentukan adalah kejelasannya sejak awal.</p>',
    },
    {
      tanya: 'Komisi dihitung saat servis selesai atau saat pelanggan bayar?',
      jawab:
        '<p>Dua-duanya dipakai di lapangan. Kalau bengkel Anda banyak melayani pelanggan tempo (perusahaan, asuransi), menghitung komisi saat pembayaran masuk lebih aman untuk arus kas. Kalau mayoritas bayar tunai di tempat, menghitung saat selesai lebih sederhana. Pilih satu, lalu konsisten.</p>',
    },
    {
      tanya: 'Apakah hasil kalkulator ini bisa saya simpan?',
      jawab:
        '<p>Halaman ini menghitung satu teknisi sekali jalan dan tidak menyimpan apa pun — tidak ada data yang terkirim ke kami. Kalau butuh rekap semua teknisi sekaligus dalam satu lembar yang bisa dipakai tiap bulan, hubungi kami lewat WhatsApp dan kami kirimkan template Google Sheets-nya.</p>',
    },
  ],
});

const komisiSalon = buatKomisi({
  slug: 'komisi-kapster-salon',
  judul: 'Kalkulator Komisi Kapster & Terapis Salon',
  judulPendek: 'Komisi Kapster Salon',
  judulSeo: 'Kalkulator Komisi Kapster Salon & Terapis Klinik | Bedah Data',
  ringkas:
    'Hitung komisi kapster atau terapis dari omzet treatment, nominal per tindakan, atau skema bertingkat. Langsung pakai, tanpa daftar.',
  deskripsi:
    'Kalkulator komisi kapster salon dan terapis klinik: hitung dari persen omzet treatment, nominal per tindakan, atau skema bertingkat. Gratis, langsung pakai.',
  peran: 'kapster',
  kerja: 'treatment',
  contohOmzet: 15000000,
  contohPersen: 15,
  penjelasan: `
<h2>Cara menghitung komisi kapster dan terapis</h2>
<p>Di salon dan klinik kecantikan, komisi biasanya dihitung dari <strong>omzet
treatment</strong> yang dikerjakan orangnya sendiri. Produk yang dijual terpisah
(sampo, serum, skincare untuk dibawa pulang) umumnya punya skema sendiri, karena itu
penjualan barang, bukan hasil keterampilan tangan.</p>

<p>Angka yang beredar di praktik salon berkisar <strong>15–20% dari omzet
treatment</strong>. Ini bukan aturan resmi, hanya kebiasaan pasar — dan sangat
tergantung apakah kapster juga menerima gaji pokok, siapa yang menyediakan bahan,
dan apakah kapster membawa pelanggannya sendiri.</p>

<h3>1. Persen dari omzet treatment</h3>
<p><code>Komisi = omzet treatment × persentase</code></p>
<p>Contoh hitungan: kalau omzet treatment seorang kapster sebulan Rp 15.000.000 dan
komisinya 15%, komisinya Rp 2.250.000. Ganti angkanya dengan angka salon Anda di
kolom di atas.</p>

<h3>2. Nominal tetap per treatment</h3>
<p>Cocok untuk salon dengan daftar layanan yang seragam harganya. Tiap tindakan
selesai bernilai tetap, berapa pun nilai notanya.</p>
<p><code>Komisi = jumlah treatment × nominal per treatment</code></p>

<h3>3. Bertingkat (ada target)</h3>
<p>Persentase naik setelah target omzet tercapai. Perlu diingat: persentase yang
lebih tinggi hanya berlaku untuk <strong>kelebihan di atas target</strong>, bukan
untuk seluruh omzet — kalkulator ini memisahkan keduanya supaya jelas.</p>

<h3>Tiga hal yang perlu disepakati sejak awal</h3>
<p><strong>Bahan siapa yang menanggung.</strong> Treatment yang memakai bahan mahal
(pewarna, produk perawatan) kadang dipotong biaya bahannya dulu sebelum komisi
dihitung. Kalau itu aturannya, tulis dan jelaskan cara menghitungnya.</p>

<p><strong>Pelanggan walk-in versus pelanggan bawaan.</strong> Sebagian salon memberi
persentase berbeda untuk pelanggan yang datang sendiri ke salon dibanding pelanggan
yang memang mencari kapster tertentu.</p>

<p><strong>Treatment yang dikerjakan berdua.</strong> Untuk perawatan panjang yang
dibantu asisten, tetapkan porsinya di depan — jangan dibagi belakangan saat
angkanya sudah kelihatan.</p>

<h3>Kapan komisi dianggap "jadi"</h3>
<p>Untuk salon yang mayoritas pelanggannya membayar tunai di tempat, ini jarang jadi
masalah — treatment selesai, uang masuk, komisi terhitung. Yang perlu diperjelas
adalah <strong>paket perawatan yang dibayar di muka untuk beberapa kali
kunjungan</strong>. Uangnya masuk sekali, tapi pekerjaannya tersebar beberapa
minggu, dan kadang dikerjakan kapster yang berbeda.</p>
<p>Cara yang paling sedikit menimbulkan perselisihan: hitung komisi
<strong>tiap kali treatment dikerjakan</strong>, bukan saat paketnya dibeli. Dengan
begitu yang mengerjakan yang menerima, dan kalau pelanggan berhenti di tengah paket,
tidak ada komisi yang perlu ditarik kembali.</p>

<h3>Yang membuat hitungan ini melelahkan tiap bulan</h3>
<p>Bukan rumusnya. Yang melelahkan adalah mengumpulkan datanya: mencocokkan nota
dengan siapa yang mengerjakan, memisahkan treatment dari penjualan produk, lalu
menjumlahkannya per orang. Untuk salon dengan tiga kapster, itu masih bisa dikerjakan
dengan buku. Begitu jumlahnya bertambah, pencatatan yang rapi sejak transaksi terjadi
jauh lebih ringan daripada merekap semuanya di akhir bulan.</p>
`,
  faq: [
    {
      tanya: 'Berapa persen komisi kapster salon pada umumnya?',
      jawab:
        '<p>Praktik yang umum di salon berkisar <strong>15–20% dari omzet treatment</strong>. Ini kebiasaan pasar, bukan ketentuan resmi. Besarnya tergantung apakah ada gaji pokok, siapa yang menyediakan bahan, dan apakah kapster membawa pelanggan sendiri.</p>',
    },
    {
      tanya: 'Penjualan produk dihitung komisi juga?',
      jawab:
        '<p>Biasanya dipisah, dengan persentase sendiri yang lebih kecil, karena menjual produk berbeda dari mengerjakan treatment. Kalau Anda ingin menghitungnya, jalankan kalkulator ini dua kali — sekali untuk treatment, sekali untuk penjualan produk — lalu jumlahkan.</p>',
    },
    {
      tanya: 'Biaya bahan dipotong dulu sebelum komisi atau tidak?',
      jawab:
        '<p>Dua-duanya dipakai di lapangan. Kalau salon Anda memotong bahan lebih dulu, masukkan <strong>omzet treatment setelah dikurangi biaya bahan</strong> ke kolom omzet. Yang penting cara menghitungnya dijelaskan ke kapster sejak awal, bukan baru muncul saat gajian.</p>',
    },
    {
      tanya: 'Bagaimana menghitung komisi terapis di klinik kecantikan?',
      jawab:
        '<p>Cara hitungnya sama persis dengan kapster salon — yang berbeda hanya istilahnya (tindakan/treatment) dan biasanya nilai per tindakannya lebih besar. Kalkulator ini bisa dipakai untuk keduanya.</p>',
    },
    {
      tanya: 'Kalau kapster libur atau cuti, komisinya bagaimana?',
      jawab:
        '<p>Komisi mengikuti pekerjaan yang benar-benar dikerjakan, jadi hari libur otomatis tidak menghasilkan komisi. Yang perlu disepakati terpisah adalah gaji pokoknya — itu urusan aturan ketenagakerjaan, bukan skema komisi.</p>',
    },
    {
      tanya: 'Bisa menghitung semua kapster sekaligus?',
      jawab:
        '<p>Halaman ini menghitung satu orang sekali jalan dan tidak menyimpan data apa pun. Kalau butuh rekap semua kapster dalam satu lembar untuk dipakai tiap bulan, hubungi kami lewat WhatsApp — kami kirimkan template Google Sheets-nya.</p>',
    },
  ],
});

const komisiSales = buatKomisi({
  slug: 'komisi-sales',
  judul: 'Kalkulator Komisi Sales',
  judulPendek: 'Komisi Sales',
  judulSeo: 'Kalkulator Komisi Sales — Persen, Nominal & Bertingkat | Bedah Data',
  ringkas:
    'Hitung komisi sales dari persen omzet, nominal per penjualan, atau skema bertingkat bertarget. Langsung pakai, tanpa daftar.',
  deskripsi:
    'Kalkulator komisi sales: hitung komisi dari persen omzet, nominal per penjualan, atau skema bertingkat dengan target. Gratis dan langsung bisa dipakai.',
  peran: 'sales',
  kerja: 'penjualan',
  contohOmzet: 30000000,
  contohPersen: 5,
  penjelasan: `
<h2>Cara menghitung komisi sales</h2>
<p>Komisi sales adalah bagian dari nilai penjualan yang diberikan kepada orang yang
membawa penjualan itu masuk. Rumus dasarnya sederhana, tapi yang menentukan adalah
<strong>dari angka mana komisinya dihitung</strong>.</p>

<h3>1. Persen dari omzet</h3>
<p><code>Komisi = omzet × persentase</code></p>
<p>Contoh hitungan: omzet Rp 30.000.000 dengan komisi 5% menghasilkan komisi
Rp 1.500.000. Angka ini contoh saja — ganti dengan angka usaha Anda di kolom di atas.</p>

<h3>2. Nominal tetap per penjualan</h3>
<p>Tiap transaksi bernilai tetap, berapa pun nilainya. Cocok untuk produk yang
harganya seragam, atau ketika Anda ingin mendorong <em>jumlah</em> transaksi, bukan
nilainya.</p>
<p><code>Komisi = jumlah penjualan × nominal per penjualan</code></p>

<h3>3. Bertingkat (ada target)</h3>
<p>Ini yang paling sering dipakai untuk tim sales: persentase dasar sampai target,
lalu persentase lebih tinggi untuk kelebihannya. Yang sering salah dihitung:
<strong>persentase tinggi itu hanya untuk selisih di atas target</strong>, tidak
berlaku surut ke seluruh omzet. Kalkulator ini memecahnya jadi dua baris supaya
terlihat.</p>

<h3>Dari omzet atau dari laba kotor?</h3>
<p>Menghitung dari omzet itu paling mudah dijelaskan dan paling mudah diperiksa
sales sendiri. Kekurangannya: sales tidak punya alasan untuk menjaga harga — memberi
diskon besar tetap menghasilkan komisi selama nilainya besar.</p>
<p>Menghitung dari laba kotor menutup celah itu, tapi butuh HPP tiap produk yang
rapi dan konsisten. Kalau HPP Anda belum rapi, mulai dari omzet dulu, lalu batasi
wewenang memberi diskon secara terpisah.</p>

<h3>Kapan komisi dianggap "jadi"</h3>
<p>Ini yang paling sering jadi masalah, terutama untuk penjualan dengan pembayaran
tempo. Ada tiga pilihan yang lazim: saat pesanan masuk, saat barang dikirim, atau
saat uang benar-benar diterima. <strong>Untuk usaha kecil, menghitung saat
pembayaran diterima jauh lebih aman untuk arus kas</strong> — Anda tidak membayar
komisi atas uang yang belum masuk. Apa pun pilihannya, tulis di depan.</p>

<h3>Batasi diskon, bukan cuma atur komisinya</h3>
<p>Kalau komisi dihitung dari omzet, sales tidak dirugikan sama sekali oleh diskon —
yang menanggung Anda. Karena itu skema komisi sebaiknya berpasangan dengan
<strong>batas wewenang memberi diskon</strong>: sampai berapa persen boleh diputuskan
sendiri, dan di atas itu harus minta persetujuan. Tanpa batas ini, menaikkan
persentase komisi justru bisa mendorong harga turun.</p>

<h3>Retur dan pembatalan</h3>
<p>Ini yang paling sering merusak hubungan baik kalau tidak dibicarakan di awal.
Sepakati tertulis bahwa komisi atas transaksi yang batal atau diretur ikut
dibatalkan, dan tetapkan cara mengembalikannya — biasanya dipotong dari komisi bulan
berikutnya. Aturan seperti ini jauh lebih mudah diterima <strong>sebelum</strong>
kejadiannya daripada sesudah.</p>

<h3>Yang bikin repot bukan hitungannya</h3>
<p>Menghitung komisi satu orang untuk satu bulan cuma perkalian. Yang memakan waktu
adalah memastikan angka omzetnya benar: transaksi mana milik siapa, mana yang sudah
lunas, dan mana yang sudah diretur. Kalau catatan itu rapi sejak transaksi terjadi,
perhitungan komisinya selesai dalam hitungan menit.</p>
`,
  faq: [
    {
      tanya: 'Berapa persen komisi sales yang wajar?',
      jawab:
        '<p>Tidak ada angka baku — sangat tergantung margin produk dan apakah sales menerima gaji pokok. Yang bisa dijadikan pegangan: komisi harus muat di dalam margin Anda. Hitung dulu laba kotor per penjualan, baru tentukan berapa bagian yang bisa diberikan tanpa membuat penjualan itu merugi.</p>',
    },
    {
      tanya: 'Komisi dihitung dari omzet atau dari laba?',
      jawab:
        '<p>Dari omzet lebih mudah dijelaskan dan diperiksa, tapi tidak mendorong sales menjaga harga. Dari laba kotor lebih adil untuk usaha, tapi butuh HPP yang rapi. Kalau pencatatan HPP Anda belum rapi, pakai omzet dulu dan atur batas diskon secara terpisah.</p>',
    },
    {
      tanya: 'Komisi dibayar saat closing atau saat pelanggan bayar?',
      jawab:
        '<p>Untuk usaha kecil, membayar komisi <strong>saat uang benar-benar diterima</strong> lebih aman — Anda tidak mengeluarkan komisi atas penjualan yang ternyata batal atau tidak terbayar. Kalau penjualannya tempo panjang, sebagian usaha membayar sebagian saat closing dan sisanya saat lunas.</p>',
    },
    {
      tanya: 'Bagaimana kalau pelanggan membatalkan atau barang diretur?',
      jawab:
        '<p>Sepakati sejak awal bahwa komisi atas transaksi yang batal atau diretur ikut dibatalkan, dan cara mengembalikannya bagaimana — biasanya dipotong dari komisi bulan berikutnya. Aturan ini jauh lebih mudah diterima kalau ditulis sebelum kejadian.</p>',
    },
    {
      tanya: 'Bagaimana skema bertingkat dihitung dengan benar?',
      jawab:
        '<p>Persentase yang lebih tinggi hanya berlaku untuk <strong>kelebihan di atas target</strong>. Contohnya: target Rp 30 juta dengan 5%, lalu 7% untuk kelebihannya. Kalau omzetnya Rp 40 juta, hitungannya adalah 5% dari Rp 30 juta ditambah 7% dari Rp 10 juta — bukan 7% dari Rp 40 juta. Kalkulator ini sudah memisahkan keduanya.</p>',
    },
    {
      tanya: 'Bisa menghitung seluruh tim sales sekaligus?',
      jawab:
        '<p>Halaman ini menghitung satu orang sekali jalan dan tidak menyimpan apa pun. Untuk rekap seluruh tim dalam satu lembar yang dipakai tiap bulan, hubungi kami lewat WhatsApp — kami kirimkan template Google Sheets-nya.</p>',
    },
  ],
});

// --- Lembur ------------------------------------------------------------------
// 🟢 Rumus resmi: upah lembur per jam = 1/173 × upah sebulan.
//    Batas resmi: maksimal 4 jam/hari dan 18 jam/minggu.
//    🔴 Pengali lembur mengikuti ketentuan resmi — jangan dikarang sendiri.

const lembur: Alat = {
  slug: 'lembur',
  kelompok: 'karyawan',
  judul: 'Kalkulator Upah Lembur',
  judulPendek: 'Upah Lembur',
  judulSeo: 'Kalkulator Upah Lembur Karyawan — Rumus 1/173 Resmi | Bedah Data',
  ringkas:
    'Hitung upah lembur memakai rumus resmi 1/173 × upah sebulan, lengkap dengan peringatan batas 4 jam sehari dan 18 jam seminggu.',
  deskripsi:
    'Kalkulator upah lembur karyawan memakai rumus resmi 1/173 × upah sebulan. Menghitung hari kerja dan hari libur, plus peringatan batas 4 jam/hari & 18 jam/minggu.',
  bonusWa:
    'Mau rekap lembur semua karyawan dalam satu lembar + template Google Sheets-nya? Klik WhatsApp, saya kirimkan.',
  pesanWa:
    'Halo Bedah Data, saya baru pakai kalkulator lembur. Boleh minta template rekap lembur semua karyawan + Google Sheets-nya?',
  isian: [
    {
      kunci: 'gajipokok',
      label: 'Gaji pokok sebulan (Rp)',
      jenis: 'rupiah',
      awal: 3500000,
    },
    {
      kunci: 'tunjangan',
      label: 'Tunjangan tetap sebulan (Rp)',
      bantuan:
        'Hanya tunjangan tetap — yang jumlahnya sama tiap bulan dan tidak tergantung kehadiran.',
      jenis: 'rupiah',
      awal: 500000,
      opsional: true,
    },
    {
      kunci: 'harilembur',
      label: 'Lembur dilakukan pada',
      jenis: 'pilihan',
      awal: 'kerja',
      opsi: [
        { nilai: 'kerja', label: 'Hari kerja biasa' },
        { nilai: 'libur', label: 'Hari libur / istirahat mingguan' },
      ],
    },
    {
      kunci: 'jam',
      label: 'Jumlah jam lembur',
      bantuan: 'Isi jam lembur dalam satu hari.',
      jenis: 'angka',
      awal: 3,
    },
    {
      kunci: 'hari',
      label: 'Berapa hari lembur seperti ini?',
      bantuan: 'Untuk menghitung totalnya dalam sebulan. Isi 1 kalau hanya sehari.',
      jenis: 'angka',
      awal: 1,
    },
  ],
  hasil: [
    {
      label: 'Upah sebulan yang jadi dasar',
      format: 'rupiah',
      hitung: (n) => upahSebulan(n),
    },
    {
      label: 'Upah lembur per jam (1/173 × upah sebulan)',
      format: 'rupiah',
      hitung: (n) => upahSebulan(n) / 173,
    },
    {
      label: 'Upah lembur satu hari',
      format: 'rupiah',
      utama: true,
      hitung: (n) => hitungLemburSehari(n),
    },
    {
      label: 'Total upah lembur',
      format: 'rupiah',
      utama: true,
      tampilBila: (n) => ang(n.hari) > 1,
      hitung: (n) => hitungLemburSehari(n) * ang(n.hari),
    },
    {
      label: 'Total jam lembur',
      format: 'angka',
      tampilBila: (n) => ang(n.hari) > 1,
      hitung: (n) => ang(n.jam) * ang(n.hari),
    },
  ],
  peringatan: [
    {
      bila: (n) => ang(n.jam) > 4 && String(n.harilembur) === 'kerja',
      nada: 'awas',
      teks:
        'Lembur di hari kerja dibatasi <strong>maksimal 4 jam sehari</strong>. Jumlah jam yang Anda masukkan melampaui batas itu. Hitungannya tetap ditampilkan, tapi jadwal kerjanya perlu ditinjau.',
    },
    {
      bila: (n) => ang(n.jam) * ang(n.hari) > 18,
      nada: 'awas',
      teks:
        'Total jam lembur melebihi <strong>18 jam dalam seminggu</strong>. Kalau jam ini terkumpul dalam satu minggu yang sama, jadwalnya melampaui batas resmi.',
    },
    {
      bila: (n) => upahSebulan(n) > 0 && ang(n.jam) > 0 && ang(n.jam) <= 4,
      nada: 'info',
      teks:
        'Angka 173 dalam rumus adalah rata-rata jam kerja sebulan yang dipakai sebagai dasar resmi perhitungan upah per jam — bukan angka yang kami tentukan sendiri.',
    },
  ],
  penjelasan: `
<h2>Cara menghitung upah lembur</h2>
<p>Perhitungan upah lembur punya rumus resmi yang tidak boleh dikarang sendiri.
Dasarnya satu angka: <strong>upah sebulan dibagi 173</strong>.</p>

<p><code>Upah lembur per jam = 1/173 × upah sebulan</code></p>

<p>Angka 173 itu bukan angka acak. Itu rata-rata jam kerja dalam sebulan, yang
dipakai sebagai pembagi baku supaya semua perusahaan memakai dasar yang sama.</p>

<h3>Apa yang masuk "upah sebulan"</h3>
<p>Yang dihitung adalah <strong>gaji pokok ditambah tunjangan tetap</strong>.
Tunjangan tetap artinya yang jumlahnya sama tiap bulan dan tidak tergantung
kehadiran atau prestasi — misalnya tunjangan jabatan.</p>
<p>Yang <em>tidak</em> masuk: uang makan dan uang transport harian (karena tergantung
kehadiran), bonus, dan tunjangan tidak tetap lainnya.</p>

<h3>Pengalinya berbeda antara hari kerja dan hari libur</h3>
<p>Setelah dapat upah per jam, jumlah jam lembur dikalikan dengan pengali yang
berbeda tergantung kapan lemburnya dilakukan:</p>
<ul>
<li><strong>Hari kerja biasa</strong> — jam pertama dikali 1,5. Jam berikutnya
dikali 2.</li>
<li><strong>Hari libur atau istirahat mingguan</strong> — pengalinya lebih besar dan
bertingkat, mulai dari 2 untuk jam-jam awal, lalu naik untuk jam berikutnya.</li>
</ul>
<p>Kalkulator di atas sudah menerapkan tingkatan ini — Anda cukup memilih hari
kerja atau hari libur.</p>

<h3>Batas yang perlu diperhatikan</h3>
<p>Lembur dibatasi <strong>maksimal 4 jam dalam sehari</strong> dan <strong>18 jam
dalam seminggu</strong>. Kalau jam yang Anda masukkan melampaui batas itu,
kalkulator akan menampilkan peringatan. Hitungannya tetap ditampilkan — tapi
jadwal kerjanya yang perlu ditinjau, bukan hitungannya.</p>

<p>Perlu diingat juga bahwa lembur harus atas persetujuan karyawan dan sebaiknya
tercatat tertulis. Perintah lembur yang tidak tercatat adalah sumber perselisihan
yang paling mudah dihindari.</p>

<h3>Uang lembur bukan uang makan lembur</h3>
<p>Dua hal ini sering dicampur. Sebagian usaha memberi uang makan dan transport
tambahan untuk karyawan yang lembur — itu <strong>tambahan di luar upah
lembur</strong>, bukan penggantinya. Memberi uang makan lalu menganggap kewajiban
lemburnya selesai adalah kekeliruan yang cukup sering terjadi, dan biasanya baru
ketahuan ketika ada karyawan yang menanyakannya.</p>

<h3>Kenapa sebaiknya dicatat rapi sejak awal</h3>
<p>Perhitungan lembur satu orang untuk satu hari mudah. Yang melelahkan adalah
merekap belasan karyawan selama sebulan, dengan campuran hari kerja dan hari libur,
lalu mencocokkannya dengan absensi. Di situlah kesalahan biasanya muncul — bukan di
rumusnya.</p>
<p>Catat tiga hal setiap kali lembur terjadi: <strong>siapa, berapa jam, dan hari
apa</strong>. Tiga kolom itu sudah cukup untuk menghitung ulang kapan pun, dan jauh
lebih mudah diperiksa berdua dengan karyawan kalau suatu saat angkanya
dipertanyakan. Yang paling sering hilang justru keterangan hari kerja atau hari
libur — padahal itu yang membedakan pengalinya.</p>
`,
  faq: [
    {
      tanya: 'Kenapa upah lembur dibagi 173?',
      jawab:
        '<p>Angka 173 adalah rata-rata jumlah jam kerja dalam sebulan yang dipakai sebagai dasar baku perhitungan upah per jam. Dengan pembagi yang sama untuk semua, upah lembur per jam bisa dihitung dengan cara yang seragam dan bisa diperiksa siapa saja.</p>',
    },
    {
      tanya: 'Uang makan dan transport ikut dihitung?',
      jawab:
        '<p>Tidak. Yang masuk hitungan hanya <strong>gaji pokok dan tunjangan tetap</strong> — yang jumlahnya sama tiap bulan. Uang makan dan transport harian tergantung kehadiran, jadi termasuk tunjangan tidak tetap dan tidak ikut jadi dasar perhitungan lembur.</p>',
    },
    {
      tanya: 'Berapa jam maksimal karyawan boleh lembur?',
      jawab:
        '<p><strong>Maksimal 4 jam dalam sehari dan 18 jam dalam seminggu.</strong> Batas ini ada untuk melindungi kesehatan dan keselamatan kerja. Kalkulator di atas memberi peringatan otomatis kalau angka yang Anda masukkan melampauinya.</p>',
    },
    {
      tanya: 'Apakah semua karyawan berhak upah lembur?',
      jawab:
        '<p>Tidak semua. Karyawan dengan tanggung jawab sebagai pemikir, perencana, pelaksana, atau pengendali jalannya perusahaan — yang waktu kerjanya tidak bisa dibatasi jam — umumnya dikecualikan, dengan kompensasi yang lebih tinggi sebagai gantinya. Untuk karyawan operasional, hak upah lemburnya berlaku.</p>',
    },
    {
      tanya: 'Lembur di hari libur hitungannya beda?',
      jawab:
        '<p>Ya, pengalinya lebih besar dan bertingkat. Lembur di hari kerja biasa dimulai dari pengali 1,5 untuk jam pertama; lembur di hari libur dimulai dari pengali 2 dan naik untuk jam-jam berikutnya. Pilih saja jenis harinya di kalkulator — perbedaannya sudah diterapkan.</p>',
    },
    {
      tanya: 'Bagaimana merekap lembur banyak karyawan?',
      jawab:
        '<p>Halaman ini menghitung satu karyawan sekali jalan. Untuk rekap semua karyawan dalam satu lembar yang bisa dipakai tiap bulan, hubungi kami lewat WhatsApp — kami kirimkan template Google Sheets-nya.</p>',
    },
  ],
};

/** Upah lembur satu hari, mengikuti tingkatan pengali resmi. */
function hitungLemburSehari(n: Record<string, number | string>): number {
  const perJam = upahSebulan(n) / 173;
  const jam = ang(n.jam);
  if (jam <= 0 || perJam <= 0) return 0;

  if (String(n.harilembur) === 'libur') {
    // Hari libur: 8 jam pertama ×2, jam ke-9 ×3, jam ke-10 dst ×4.
    const j1 = Math.min(jam, 8);
    const j2 = Math.min(Math.max(jam - 8, 0), 1);
    const j3 = Math.max(jam - 9, 0);
    return perJam * (j1 * 2 + j2 * 3 + j3 * 4);
  }

  // Hari kerja: jam pertama ×1,5, jam berikutnya ×2.
  const j1 = Math.min(jam, 1);
  const j2 = Math.max(jam - 1, 0);
  return perJam * (j1 * 1.5 + j2 * 2);
}

// --- THR ---------------------------------------------------------------------
// 🟢 Rumus resmi:
//    masa kerja ≥ 12 bulan → 1 bulan upah
//    masa kerja 1–11 bulan → (masa kerja ÷ 12) × 1 bulan upah

const thr: Alat = {
  slug: 'thr',
  kelompok: 'karyawan',
  judul: 'Kalkulator THR Karyawan',
  judulPendek: 'THR Karyawan',
  judulSeo: 'Kalkulator THR Karyawan — Hitung Prorata Masa Kerja | Bedah Data',
  ringkas:
    'Hitung THR sesuai rumus resmi, termasuk prorata untuk karyawan yang masa kerjanya belum setahun. Sekalian totalnya untuk semua karyawan.',
  deskripsi:
    'Kalkulator THR karyawan sesuai rumus resmi: satu bulan upah untuk masa kerja 12 bulan ke atas, prorata untuk 1–11 bulan. Sekalian hitung total yang harus disiapkan.',
  bonusWa:
    'Mau rekap THR semua karyawan sekaligus + template Google Sheets-nya? Klik WhatsApp, saya kirimkan.',
  pesanWa:
    'Halo Bedah Data, saya baru pakai kalkulator THR. Boleh minta template rekap THR semua karyawan + Google Sheets-nya?',
  isian: [
    {
      kunci: 'gajipokok',
      label: 'Gaji pokok sebulan (Rp)',
      jenis: 'rupiah',
      awal: 3500000,
    },
    {
      kunci: 'tunjangan',
      label: 'Tunjangan tetap sebulan (Rp)',
      bantuan:
        'Hanya tunjangan tetap — yang jumlahnya sama tiap bulan dan tidak tergantung kehadiran.',
      jenis: 'rupiah',
      awal: 500000,
      opsional: true,
    },
    {
      kunci: 'masakerja',
      label: 'Masa kerja (bulan)',
      bantuan: 'Isi 12 atau lebih kalau sudah bekerja setahun penuh.',
      jenis: 'angka',
      awal: 12,
    },
    {
      kunci: 'jumlahkaryawan',
      label: 'Jumlah karyawan dengan kondisi sama',
      bantuan: 'Untuk melihat total yang perlu disiapkan. Isi 1 kalau hanya satu orang.',
      jenis: 'angka',
      awal: 1,
    },
  ],
  hasil: [
    {
      label: 'Upah sebulan yang jadi dasar',
      format: 'rupiah',
      hitung: (n) => upahSebulan(n),
    },
    {
      label: 'Bagian masa kerja yang dihitung',
      format: 'teks',
      tampilBila: (n) => ang(n.masakerja) < 12,
      hitung: (n) => `${ang(n.masakerja)} ÷ 12 bulan`,
    },
    {
      label: 'THR per karyawan',
      format: 'rupiah',
      utama: true,
      hitung: (n) => hitungThr(n),
    },
    {
      label: 'Total THR yang harus disiapkan',
      format: 'rupiah',
      utama: true,
      tampilBila: (n) => ang(n.jumlahkaryawan) > 1,
      hitung: (n) => hitungThr(n) * ang(n.jumlahkaryawan),
    },
  ],
  peringatan: [
    {
      bila: (n) => ang(n.masakerja) > 0 && ang(n.masakerja) < 1,
      nada: 'info',
      teks:
        'Masa kerja di bawah 1 bulan penuh umumnya belum menimbulkan hak THR. Periksa kembali tanggal mulai kerjanya.',
    },
    {
      bila: (n) => ang(n.masakerja) >= 1 && ang(n.masakerja) < 12,
      nada: 'info',
      teks:
        'Masa kerja belum genap setahun, jadi THR dihitung <strong>prorata</strong> — sebanding dengan lama bekerja, bukan satu bulan upah penuh.',
    },
  ],
  penjelasan: `
<h2>Cara menghitung THR karyawan</h2>
<p>THR punya rumus resmi yang cukup sederhana, dan yang membedakan hanya satu hal:
<strong>apakah masa kerjanya sudah genap 12 bulan atau belum</strong>.</p>

<h3>Masa kerja 12 bulan atau lebih</h3>
<p><code>THR = 1 bulan upah</code></p>
<p>Karyawan yang sudah bekerja setahun penuh atau lebih menerima THR sebesar satu
bulan upah. Tidak bertambah walau masa kerjanya sudah bertahun-tahun — kecuali
perusahaan Anda memang menetapkan lebih, yang boleh saja.</p>

<h3>Masa kerja 1 sampai 11 bulan</h3>
<p><code>THR = (masa kerja ÷ 12) × 1 bulan upah</code></p>
<p>Karyawan yang belum genap setahun tetap berhak THR, tapi dihitung
<strong>prorata</strong> — sebanding dengan lamanya bekerja. Contoh hitungan: masa
kerja 6 bulan dengan upah Rp 4.000.000 menghasilkan (6 ÷ 12) × Rp 4.000.000 =
Rp 2.000.000.</p>

<h3>Yang dimaksud "upah" di sini</h3>
<p>Sama seperti perhitungan lembur: <strong>gaji pokok ditambah tunjangan
tetap</strong>. Tunjangan tetap adalah yang jumlahnya sama tiap bulan dan tidak
tergantung kehadiran. Uang makan dan transport harian tidak termasuk.</p>

<h3>Kapan THR harus dibayarkan</h3>
<p>THR wajib dibayarkan <strong>paling lambat 7 hari sebelum hari raya
keagamaan</strong>, dan dibayarkan penuh — tidak boleh dicicil. Ini yang sering
membuat usaha kecil kelabakan: kewajibannya jatuh serentak untuk semua karyawan,
di bulan yang biasanya juga sedang banyak pengeluaran lain.</p>

<h3>Kenapa sebaiknya dihitung jauh hari</h3>
<p>Yang bikin repot bukan rumusnya — rumusnya cuma dua baris. Yang bikin repot
adalah <strong>menyiapkan uangnya</strong>. Kalau Anda punya 10 karyawan dengan upah
rata-rata Rp 4 juta, kewajiban THR-nya sekitar Rp 40 juta yang harus keluar
sekaligus dalam satu minggu.</p>
<p>Karena itu kalkulator ini punya kolom jumlah karyawan: supaya Anda bisa melihat
totalnya dari sekarang, bukan seminggu sebelum hari raya. Kalau karyawan Anda
punya upah yang berbeda-beda, jalankan kalkulator ini per kelompok upah lalu
jumlahkan.</p>

<h3>Menyisihkan sedikit tiap bulan jauh lebih ringan</h3>
<p>Kalau total kewajiban THR Anda sudah diketahui, membaginya ke dua belas bulan
mengubah satu pengeluaran besar jadi angka kecil yang hampir tidak terasa. Ini
sekadar aritmetika — total dibagi 12 — tapi bedanya besar untuk arus kas: menyiapkan
sejak awal tahun tidak menuntut apa pun dari kas di bulan hari raya, yang biasanya
justru bulan tersibuk sekaligus paling banyak pengeluaran lain.</p>

<h3>Yang berubah kalau jumlah karyawan bertambah</h3>
<p>Untuk tiga karyawan dengan upah sama, hitungan ini selesai dalam semenit. Yang
menyulitkan adalah ketika masa kerja setiap orang berbeda-beda — sebagian sudah
setahun lebih, sebagian baru masuk lima bulan lalu — sehingga tiap orang punya angka
prorata sendiri. Di titik itu yang dibutuhkan bukan kalkulator yang lebih pintar,
melainkan <strong>catatan tanggal masuk kerja yang rapi</strong>. Tanpa itu, angka
prorata-nya cuma kira-kira.</p>
`,
  faq: [
    {
      tanya: 'Karyawan baru 3 bulan apakah dapat THR?',
      jawab:
        '<p>Ya. Karyawan dengan masa kerja <strong>1 bulan penuh atau lebih</strong> sudah berhak THR, dihitung prorata: (masa kerja ÷ 12) × satu bulan upah. Untuk masa kerja 3 bulan, berarti 3/12 atau seperempat dari satu bulan upah.</p>',
    },
    {
      tanya: 'THR dihitung dari gaji pokok saja atau termasuk tunjangan?',
      jawab:
        '<p>Dari <strong>gaji pokok ditambah tunjangan tetap</strong>. Tunjangan tetap adalah yang jumlahnya sama tiap bulan tanpa tergantung kehadiran, misalnya tunjangan jabatan. Uang makan dan transport harian tidak ikut dihitung karena tergantung kehadiran.</p>',
    },
    {
      tanya: 'Kapan THR paling lambat dibayarkan?',
      jawab:
        '<p><strong>Paling lambat 7 hari sebelum hari raya keagamaan</strong>, dan harus dibayarkan penuh — tidak boleh dicicil. Karena kewajibannya jatuh serentak, sebaiknya totalnya dihitung jauh-jauh hari supaya penyiapan dananya tidak mendadak.</p>',
    },
    {
      tanya: 'Karyawan kontrak dan harian dapat THR juga?',
      jawab:
        '<p>Hak THR berlaku untuk karyawan tetap maupun kontrak, selama masa kerjanya sudah 1 bulan penuh atau lebih. Yang membedakan hanya besarannya, karena dihitung dari masa kerja dan upahnya masing-masing.</p>',
    },
    {
      tanya: 'Kalau karyawan resign sebelum hari raya bagaimana?',
      jawab:
        '<p>Untuk karyawan yang hubungan kerjanya berakhir dalam rentang tertentu sebelum hari raya, ketentuannya berbeda-beda tergantung jenis hubungan kerja dan alasan berakhirnya. Ini sebaiknya dicek langsung ke ketentuan yang berlaku atau ditanyakan ke dinas ketenagakerjaan setempat, karena kasusnya bervariasi.</p>',
    },
    {
      tanya: 'Bagaimana menghitung THR karyawan dengan upah berbeda-beda?',
      jawab:
        '<p>Jalankan kalkulator ini per kelompok upah, lalu jumlahkan totalnya. Kalau ingin sekali hitung untuk semua karyawan dalam satu lembar, hubungi kami lewat WhatsApp — kami kirimkan template Google Sheets-nya.</p>',
    },
  ],
};

function hitungThr(n: Record<string, number | string>): number {
  const upah = upahSebulan(n);
  const masa = ang(n.masakerja);
  if (upah <= 0 || masa < 1) return 0;
  if (masa >= 12) return upah;
  return (masa / 12) * upah;
}

// ============================================================================
// KELOMPOK 2 — JUALAN ONLINE
// ============================================================================

// 🔴 TARIF MARKETPLACE — WAJIB DIBERI TANGGAL & SUMBER (spek §4a).
//    Angka ini BERUBAH. Tinjau ulang tiap 3 bulan; tarif basi = informasi salah.
export const TARIF_DITINJAU = 'Agustus 2026';

const KATEGORI_BIAYA = [
  { nilai: '10', label: 'Fashion, FMCG & lifestyle (10%)' },
  { nilai: '9.5', label: 'Elektronik & perlengkapan rumah (9,5%)' },
  { nilai: '6.75', label: 'Hobi, olahraga & otomotif (6,75%)' },
  { nilai: '5.25', label: 'Barang besar & khusus (5,25%)' },
  { nilai: '4.25', label: 'Kategori tarif rendah (4,25%)' },
  { nilai: '2.5', label: 'Kategori khusus (2,5%)' },
];

const hargaMarketplace: Alat = {
  slug: 'harga-jual-marketplace',
  kelompok: 'jualan-online',
  judul: 'Kalkulator Harga Jual Marketplace',
  judulPendek: 'Harga Jual Marketplace',
  judulSeo:
    'Kalkulator Biaya Admin Marketplace — Shopee, Tokopedia & TikTok Shop | Bedah Data',
  ringkas:
    'Hitung potongan biaya admin marketplace dan berapa uang yang benar-benar Anda terima dari satu penjualan.',
  deskripsi:
    'Kalkulator biaya admin marketplace: hitung potongan Shopee, Tokopedia, dan TikTok Shop lalu lihat berapa uang bersih yang masuk dari satu penjualan.',
  sumber: `Tarif diperiksa pada ${TARIF_DITINJAU}. 🔴 Biaya admin marketplace berubah dari waktu ke waktu dan berbeda per kategori — cek ulang tarif terbaru di pusat bantuan penjual masing-masing platform sebelum menetapkan harga.`,
  bonusWa:
    'Mau bandingkan 3 platform sekaligus dalam satu lembar + template Google Sheets-nya? Klik WhatsApp, saya kirimkan.',
  pesanWa:
    'Halo Bedah Data, saya baru pakai kalkulator harga jual marketplace. Boleh minta perbandingan 3 platform + template Google Sheets-nya?',
  isian: [
    {
      kunci: 'platform',
      label: 'Platform',
      jenis: 'pilihan',
      awal: 'shopee',
      opsi: [
        { nilai: 'shopee', label: 'Shopee' },
        { nilai: 'tokopedia', label: 'Tokopedia / TikTok Shop' },
      ],
    },
    {
      kunci: 'kategori',
      label: 'Kategori produk',
      bantuan: 'Pilih yang paling mendekati — persentasenya berbeda tiap kategori.',
      jenis: 'pilihan',
      awal: '10',
      opsi: KATEGORI_BIAYA,
    },
    {
      kunci: 'harga',
      label: 'Harga jual di etalase (Rp)',
      jenis: 'rupiah',
      awal: 150000,
    },
    {
      kunci: 'hpp',
      label: 'HPP / modal per barang (Rp)',
      bantuan: 'Harga beli atau biaya produksi satu barang.',
      jenis: 'rupiah',
      awal: 90000,
    },
    {
      kunci: 'ongkir',
      label: 'Ongkir yang Anda tanggung (Rp)',
      bantuan: 'Isi 0 kalau ongkir sepenuhnya dibayar pembeli.',
      jenis: 'rupiah',
      awal: 0,
      opsional: true,
    },
    {
      kunci: 'iklan',
      label: 'Biaya iklan per penjualan (Rp)',
      bantuan: 'Kalau memakai iklan di dalam platform. Boleh dikosongkan.',
      jenis: 'rupiah',
      awal: 0,
      opsional: true,
    },
  ],
  hasil: [
    {
      label: 'Biaya admin platform',
      format: 'rupiah',
      hitung: (n) => biayaAdmin(n),
    },
    {
      label: 'Biaya admin dalam persen dari harga jual',
      format: 'persen',
      hitung: (n) => {
        const h = ang(n.harga);
        return h > 0 ? (biayaAdmin(n) / h) * 100 : 0;
      },
    },
    {
      label: 'Total potongan (admin + ongkir + iklan)',
      format: 'rupiah',
      hitung: (n) => biayaAdmin(n) + ang(n.ongkir) + ang(n.iklan),
    },
    {
      label: 'Uang bersih yang Anda terima',
      format: 'rupiah',
      utama: true,
      hitung: (n) =>
        ang(n.harga) - biayaAdmin(n) - ang(n.ongkir) - ang(n.iklan),
    },
    {
      label: 'Sisa setelah dikurangi HPP',
      format: 'rupiah',
      utama: true,
      hitung: (n) =>
        ang(n.harga) - biayaAdmin(n) - ang(n.ongkir) - ang(n.iklan) - ang(n.hpp),
    },
    {
      label: 'Sisa itu dalam persen dari harga jual',
      format: 'persen',
      hitung: (n) => {
        const h = ang(n.harga);
        if (h <= 0) return 0;
        return (
          ((h - biayaAdmin(n) - ang(n.ongkir) - ang(n.iklan) - ang(n.hpp)) / h) * 100
        );
      },
    },
  ],
  peringatan: [
    {
      bila: (n) =>
        ang(n.harga) > 0 &&
        ang(n.harga) - biayaAdmin(n) - ang(n.ongkir) - ang(n.iklan) - ang(n.hpp) < 0,
      nada: 'awas',
      teks:
        'Dengan angka yang Anda masukkan, hasilnya <strong>minus</strong> — uang yang diterima lebih kecil daripada modal barangnya. Periksa lagi harga jual, HPP, atau ongkir yang Anda tanggung.',
    },
    {
      bila: (n) => biayaAdminMentah(n) > 650000,
      nada: 'info',
      teks:
        'Persentase biaya admin pada nilai ini sudah melewati batas maksimum potongan per barang, jadi yang dipakai adalah nilai batasnya. 🔴 Besaran batas ini berubah dari waktu ke waktu — pastikan lagi di pusat bantuan penjual platform.',
    },
  ],
  penjelasan: `
<h2>Cara menghitung biaya admin marketplace</h2>
<p>Harga yang tertera di etalase bukan uang yang masuk ke rekening Anda. Marketplace
memotong biaya admin dari tiap penjualan, dan besarnya berbeda-beda tergantung
kategori produk.</p>

<p><code>Uang diterima = harga jual − biaya admin − ongkir ditanggung − biaya iklan</code></p>

<h3>Biaya admin berbeda per kategori</h3>
<p>Inilah yang sering membuat penjual salah hitung: biaya admin bukan satu angka
untuk semua barang. Kategori seperti fashion dan FMCG dikenai persentase paling
tinggi, sementara kategori tertentu jauh lebih rendah. Selisih antara kategori
tertinggi dan terendah bisa lebih dari dua kali lipat.</p>
<p>Karena itu, <strong>satu margin yang sama tidak bisa dipakai untuk semua
produk</strong> kalau kategorinya berbeda.</p>

<h3>Ada batas maksimum potongan per barang</h3>
<p>Potongan admin tidak naik tanpa batas mengikuti harga. Ada nilai maksimum per
barang, dan begitu persentasenya melewati nilai itu, yang dipakai adalah batasnya.</p>
<p><strong>Ini penting untuk barang mahal.</strong> Batas maksimum itu pernah
dinaikkan cukup jauh, dan kenaikannya berdampak langsung pada barang dengan harga
tinggi — potongan yang dulu berhenti di nilai kecil sekarang bisa jauh lebih besar.
Kalau Anda menjual barang mahal dan belum pernah menghitung ulang sejak perubahan
itu, angka margin lama Anda kemungkinan sudah tidak berlaku.</p>

<h3>Yang sering lupa dimasukkan</h3>
<p><strong>Ongkir yang Anda tanggung.</strong> Program gratis ongkir terlihat
menaikkan penjualan, tapi sebagian ongkirnya sering ditanggung penjual. Masukkan
angkanya, jangan diabaikan.</p>
<p><strong>Biaya iklan di dalam platform.</strong> Kalau Anda memakai iklan,
bagi total belanja iklan dengan jumlah penjualan yang dihasilkan, lalu masukkan
hasilnya sebagai biaya per penjualan.</p>
<p><strong>Biaya kemasan dan tenaga packing.</strong> Kalkulator ini tidak punya
kolomnya, tapi Anda bisa memasukkannya ke dalam HPP supaya ikut terhitung.</p>

<h3>Tarif berubah — jangan pakai angka lama</h3>
<p>Biaya admin marketplace ditinjau dan diubah oleh platform dari waktu ke waktu.
Angka di kalkulator ini diperiksa pada ${TARIF_DITINJAU}, dan
<strong>tetap perlu Anda cek ulang</strong> di pusat bantuan penjual masing-masing
platform sebelum menetapkan harga. Kalkulator ini menghitung dari angka yang Anda
masukkan — ketepatannya mengikuti ketepatan angka yang Anda pakai.</p>
`,
  faq: [
    {
      tanya: 'Berapa biaya admin Shopee dan Tokopedia sekarang?',
      jawab: `<p>Besarnya berbeda per kategori produk, mulai dari sekitar 2,5% untuk kategori khusus sampai sekitar 10% untuk kategori seperti fashion dan FMCG. Angka yang dipakai kalkulator ini diperiksa pada ${TARIF_DITINJAU}. <strong>Tarif ini berubah dari waktu ke waktu</strong> — selalu cek ulang di pusat bantuan penjual platform sebelum menetapkan harga.</p>`,
    },
    {
      tanya: 'Kenapa uang yang masuk lebih kecil dari harga jual?',
      jawab:
        '<p>Karena ada beberapa potongan sekaligus: biaya admin platform, ongkir yang Anda tanggung kalau ikut program gratis ongkir, dan biaya iklan kalau produk Anda diiklankan. Kalkulator di atas memecah ketiganya supaya terlihat mana yang paling besar memakan hasil penjualan.</p>',
    },
    {
      tanya: 'Apakah ada batas maksimum biaya admin per barang?',
      jawab:
        '<p>Ya. Potongan tidak naik terus mengikuti harga — ada nilai maksimum per barang, dan setelah persentasenya melewati nilai itu, yang dipakai adalah batasnya. Batas ini paling terasa pengaruhnya untuk barang mahal, dan besarannya pernah dinaikkan cukup jauh. Kalau Anda menjual barang berharga tinggi, hitung ulang marginnya.</p>',
    },
    {
      tanya: 'Bagaimana menentukan harga jual supaya tidak rugi?',
      jawab:
        '<p>Mulai dari HPP, lalu tambahkan semua potongan yang akan terjadi: biaya admin, ongkir yang Anda tanggung, dan biaya iklan. Baru setelah itu tambahkan bagian yang ingin Anda sisakan. Kalkulator di atas bekerja dari arah sebaliknya — Anda memasukkan harga jual, lalu melihat sisanya berapa. Coba beberapa harga sampai sisanya masuk akal untuk Anda.</p>',
    },
    {
      tanya: 'Biaya iklan dimasukkan bagaimana?',
      jawab:
        '<p>Bagi total belanja iklan Anda dengan jumlah penjualan yang dihasilkan iklan itu, lalu masukkan hasilnya sebagai biaya iklan per penjualan. Contohnya, belanja iklan Rp 500.000 yang menghasilkan 25 penjualan berarti Rp 20.000 per penjualan.</p>',
    },
    {
      tanya: 'Bisa membandingkan beberapa platform sekaligus?',
      jawab:
        '<p>Halaman ini menghitung satu platform sekali jalan — Anda bisa menggantinya dan menghitung lagi. Kalau ingin melihat perbandingan beberapa platform berdampingan dalam satu lembar, hubungi kami lewat WhatsApp dan kami kirimkan template Google Sheets-nya.</p>',
    },
  ],
};

/** Biaya admin sebelum dibatasi nilai maksimum. */
function biayaAdminMentah(n: Record<string, number | string>): number {
  return ang(n.harga) * (ang(n.kategori) / 100);
}

/**
 * Biaya admin setelah memperhitungkan batas maksimum per barang.
 * 🔴 Batas ini berubah dari waktu ke waktu — lihat catatan sumber di halaman.
 */
const BATAS_ADMIN = 650000;
function biayaAdmin(n: Record<string, number | string>): number {
  return Math.min(biayaAdminMentah(n), BATAS_ADMIN);
}

// --- Margin ------------------------------------------------------------------

const margin: Alat = {
  slug: 'margin',
  kelompok: 'jualan-online',
  judul: 'Kalkulator Margin & Markup',
  judulPendek: 'Margin & Markup',
  judulSeo: 'Kalkulator Margin dan Markup — Dua Arah Hitung | Bedah Data',
  ringkas:
    'Hitung margin dan markup dari HPP dan harga jual — atau sebaliknya, tentukan harga jual dari margin yang Anda inginkan.',
  deskripsi:
    'Kalkulator margin dan markup: hitung margin dari HPP dan harga jual, atau tentukan harga jual dari target margin. Termasuk penjelasan beda margin vs markup.',
  bonusWa:
    'Mau hitung margin semua produk sekaligus + template Google Sheets-nya? Klik WhatsApp, saya kirimkan.',
  pesanWa:
    'Halo Bedah Data, saya baru pakai kalkulator margin. Boleh minta template hitung margin semua produk + Google Sheets-nya?',
  isian: [
    {
      kunci: 'arah',
      label: 'Yang mau dihitung',
      jenis: 'pilihan',
      awal: 'darihargajual',
      opsi: [
        { nilai: 'darihargajual', label: 'Sudah tahu harga jual → cari marginnya' },
        { nilai: 'darimargin', label: 'Sudah tahu margin diinginkan → cari harga jualnya' },
      ],
    },
    {
      kunci: 'hpp',
      label: 'HPP / modal per barang (Rp)',
      bantuan: 'Harga beli atau biaya produksi satu barang, termasuk kemasan.',
      jenis: 'rupiah',
      awal: 60000,
    },
    {
      kunci: 'hargajual',
      label: 'Harga jual (Rp)',
      jenis: 'rupiah',
      awal: 100000,
      tampilBila: { kunci: 'arah', nilai: ['darihargajual'] },
    },
    {
      kunci: 'marginTarget',
      label: 'Margin yang diinginkan (%)',
      bantuan: 'Berapa persen dari harga jual yang ingin Anda sisakan.',
      jenis: 'persen',
      awal: 40,
      tampilBila: { kunci: 'arah', nilai: ['darimargin'] },
    },
  ],
  hasil: [
    {
      label: 'Harga jual',
      format: 'rupiah',
      utama: true,
      tampilBila: (n) => String(n.arah) === 'darimargin',
      hitung: (n) => {
        const m = ang(n.marginTarget);
        if (m >= 100) return 0;
        return ang(n.hpp) / (1 - m / 100);
      },
    },
    {
      label: 'Laba kotor per barang',
      format: 'rupiah',
      utama: true,
      hitung: (n) => hargaJualMargin(n) - ang(n.hpp),
    },
    {
      label: 'Margin (dari harga jual)',
      format: 'persen',
      utama: true,
      hitung: (n) => {
        const h = hargaJualMargin(n);
        return h > 0 ? ((h - ang(n.hpp)) / h) * 100 : 0;
      },
    },
    {
      label: 'Markup (dari HPP)',
      format: 'persen',
      hitung: (n) => {
        const hpp = ang(n.hpp);
        return hpp > 0 ? ((hargaJualMargin(n) - hpp) / hpp) * 100 : 0;
      },
    },
  ],
  peringatan: [
    {
      bila: (n) => hargaJualMargin(n) > 0 && hargaJualMargin(n) < ang(n.hpp),
      nada: 'awas',
      teks:
        'Harga jual lebih rendah daripada HPP — dengan angka ini, tiap barang yang terjual menambah kerugian. Periksa lagi angkanya.',
    },
    {
      bila: (n) => String(n.arah) === 'darimargin' && ang(n.marginTarget) >= 100,
      nada: 'awas',
      teks:
        'Margin tidak bisa 100% atau lebih. Margin dihitung sebagai bagian dari harga jual, jadi nilainya selalu di bawah 100%. Kalau yang Anda maksud melipatgandakan modal, itu <strong>markup</strong> — lihat penjelasan di bawah.',
    },
  ],
  penjelasan: `
<h2>Beda margin dan markup</h2>
<p>Dua istilah ini sering tertukar, dan tertukarnya mahal. Keduanya menghitung
selisih yang sama, tapi <strong>membaginya dengan angka yang berbeda</strong>.</p>

<p><code>Margin = (harga jual − HPP) ÷ harga jual</code><br>
<code>Markup = (harga jual − HPP) ÷ HPP</code></p>

<p>Contoh hitungan supaya jelas. Modal Rp 60.000, dijual Rp 100.000. Selisihnya
Rp 40.000.</p>
<ul>
<li><strong>Margin</strong> = 40.000 ÷ 100.000 = <strong>40%</strong></li>
<li><strong>Markup</strong> = 40.000 ÷ 60.000 = <strong>67%</strong></li>
</ul>

<p>Barang yang sama, selisih yang sama — tapi angkanya 40% atau 67% tergantung cara
membaginya. Anda bisa hitung sendiri dari angka itu untuk memastikan.</p>

<h3>Kesalahan yang paling sering terjadi</h3>
<p>Seseorang ingin margin 40%, lalu menaikkan harga 40% dari modal. Modal Rp 60.000
dinaikkan 40% jadi Rp 84.000. Tapi margin sebenarnya dari harga itu adalah
(84.000 − 60.000) ÷ 84.000 = <strong>28,6%</strong>, bukan 40%.</p>
<p>Untuk benar-benar mendapat margin 40%, harganya harus Rp 100.000. Itulah gunanya
pilihan kedua di kalkulator di atas: masukkan margin yang Anda inginkan, dan harga
jualnya dihitungkan.</p>

<h3>Pakai margin atau markup?</h3>
<p><strong>Margin</strong> lebih berguna untuk melihat kesehatan usaha, karena
dasarnya harga jual — angka yang sama dengan yang muncul di omzet Anda. Kalau
margin rata-rata 30%, artinya dari tiap Rp 100.000 penjualan tersisa Rp 30.000
sebelum biaya operasional.</p>
<p><strong>Markup</strong> lebih praktis saat menetapkan harga di lapangan, karena
Anda menghitung maju dari modal yang sudah diketahui.</p>
<p>Keduanya ditampilkan sekaligus di kalkulator ini supaya tidak perlu memilih.</p>

<h3>Yang perlu masuk ke HPP</h3>
<p>Bukan cuma harga beli barang. Masukkan juga kemasan, ongkos kirim masuk dari
pemasok, dan biaya lain yang menempel langsung pada barang itu. HPP yang terlalu
rendah membuat margin terlihat sehat padahal tidak.</p>
<p>Yang <em>tidak</em> masuk HPP: sewa tempat, gaji tetap, listrik, dan biaya
operasional lain yang tetap keluar walau tidak ada barang terjual. Itu dikurangkan
belakangan dari laba kotor, bukan dari tiap barang.</p>

<h3>Margin per barang belum tentu margin usaha Anda</h3>
<p>Ini yang paling sering menyesatkan. Margin 40% per barang terdengar sehat, tapi
angka itu <strong>belum dikurangi biaya operasional</strong>. Kalau laba kotor
sebulan Rp 12 juta sementara sewa, gaji, dan listrik menghabiskan Rp 10 juta, yang
benar-benar tersisa cuma Rp 2 juta — berapa pun bagusnya margin per barangnya.</p>
<p>Karena itu setelah tahu margin per produk, hitung juga hal berikut:
<strong>berapa laba kotor yang perlu Anda kumpulkan sebulan</strong> supaya seluruh
biaya tetap tertutup. Dari situ baru terlihat berapa banyak barang yang harus
terjual — dan apakah marginnya memang cukup.</p>

<h3>Barang yang terlihat laku belum tentu yang paling berjasa</h3>
<p>Barang dengan margin tipis bisa terjual paling banyak dan tetap menyumbang sedikit,
sementara barang yang jarang laku dengan margin tebal justru menyumbang lebih besar.
Yang menentukan bukan jumlah unit terjual, melainkan <strong>laba kotor per barang
dikali jumlah terjualnya</strong>. Menghitung margin satu per satu seperti di halaman
ini adalah langkah pertama untuk melihat itu.</p>
`,
  faq: [
    {
      tanya: 'Apa beda margin dan markup?',
      jawab:
        '<p>Selisihnya sama, pembaginya beda. <strong>Margin</strong> dibagi harga jual, <strong>markup</strong> dibagi HPP. Modal Rp 60.000 dijual Rp 100.000 memberi margin 40% tapi markup 67% — angka yang sama dibaca dua cara. Kalkulator di atas menampilkan keduanya sekaligus.</p>',
    },
    {
      tanya: 'Kenapa margin tidak bisa 100%?',
      jawab:
        '<p>Karena margin adalah bagian dari harga jual. Margin 100% berarti seluruh harga jual adalah laba, dan modalnya nol — yang tidak mungkin selama barangnya ada modalnya. Kalau Anda ingin harga jual dua kali lipat modal, itu markup 100%, yang setara margin 50%.</p>',
    },
    {
      tanya: 'Apa saja yang masuk HPP?',
      jawab:
        '<p>Semua biaya yang menempel langsung pada satu barang: harga beli, kemasan, dan ongkos kirim masuk dari pemasok. Yang <strong>tidak</strong> masuk adalah biaya yang tetap keluar walau tidak ada penjualan — sewa, gaji tetap, listrik. Biaya itu dikurangkan dari laba kotor, bukan dari tiap barang.</p>',
    },
    {
      tanya: 'Berapa margin yang sehat untuk usaha kecil?',
      jawab:
        '<p>Sangat berbeda antar jenis usaha — margin toko grosir yang mengandalkan volume wajar jauh lebih tipis daripada usaha jasa. Yang lebih berguna daripada membandingkan dengan angka orang lain: pastikan laba kotor Anda cukup menutup seluruh biaya operasional bulanan. Kalau belum, marginnya terlalu tipis untuk usaha Anda sendiri, berapa pun angkanya.</p>',
    },
    {
      tanya: 'Bagaimana menghitung harga jual dari margin yang saya inginkan?',
      jawab:
        '<p>Pilih opsi kedua di kalkulator ("sudah tahu margin diinginkan"), masukkan HPP dan target margin, lalu harga jualnya muncul. Rumusnya: <code>harga jual = HPP ÷ (1 − margin)</code>. 🔴 Jangan menaikkan modal sebesar persen margin — hasilnya akan meleset ke bawah.</p>',
    },
    {
      tanya: 'Bisa menghitung banyak produk sekaligus?',
      jawab:
        '<p>Halaman ini menghitung satu produk sekali jalan dan tidak menyimpan apa pun. Untuk menghitung seluruh daftar produk dalam satu lembar, hubungi kami lewat WhatsApp — kami kirimkan template Google Sheets-nya.</p>',
    },
  ],
};

function hargaJualMargin(n: Record<string, number | string>): number {
  if (String(n.arah) === 'darimargin') {
    const m = ang(n.marginTarget);
    if (m >= 100) return 0;
    return ang(n.hpp) / (1 - m / 100);
  }
  return ang(n.hargajual);
}

// --- Ambang gratis ongkir ----------------------------------------------------

const ambangOngkir: Alat = {
  slug: 'ambang-gratis-ongkir',
  kelompok: 'jualan-online',
  judul: 'Kalkulator Ambang Gratis Ongkir',
  judulPendek: 'Ambang Gratis Ongkir',
  judulSeo:
    'Kalkulator Ambang Minimum Gratis Ongkir — Berapa Batas Aman | Bedah Data',
  ringkas:
    'Hitung minimum belanja yang perlu ditetapkan supaya ongkir yang Anda tanggung masih tertutup laba kotornya.',
  deskripsi:
    'Kalkulator ambang gratis ongkir: hitung minimum belanja agar ongkir yang Anda tanggung masih tertutup laba kotor. Murni aritmetika dari angka Anda sendiri.',
  bonusWa:
    'Mau hitung ambang gratis ongkir untuk beberapa skenario sekaligus + template Google Sheets-nya? Klik WhatsApp, saya kirimkan.',
  pesanWa:
    'Halo Bedah Data, saya baru pakai kalkulator ambang gratis ongkir. Boleh minta template hitungannya + Google Sheets-nya?',
  isian: [
    {
      kunci: 'ongkir',
      label: 'Ongkir yang Anda tanggung per pesanan (Rp)',
      jenis: 'rupiah',
      awal: 20000,
    },
    {
      kunci: 'margin',
      label: 'Margin rata-rata Anda (%)',
      bantuan:
        'Berapa persen dari nilai pesanan yang tersisa sebagai laba kotor. Belum tahu? Hitung dulu di kalkulator margin.',
      jenis: 'persen',
      awal: 30,
    },
    {
      kunci: 'sisamargin',
      label: 'Margin yang ingin tetap tersisa (%)',
      bantuan:
        'Bagian yang ingin Anda pertahankan setelah menanggung ongkir. Isi 0 kalau hanya ingin tahu titik impasnya.',
      jenis: 'persen',
      awal: 15,
      opsional: true,
    },
    {
      kunci: 'aov',
      label: 'Rata-rata nilai pesanan sekarang (Rp)',
      bantuan: 'Untuk pembanding. Boleh dikosongkan.',
      jenis: 'rupiah',
      awal: 0,
      opsional: true,
    },
  ],
  hasil: [
    {
      label: 'Ambang minimum belanja',
      format: 'rupiah',
      utama: true,
      hitung: (n) => ambangMinimum(n),
    },
    {
      label: 'Titik impas — ongkir persis tertutup laba kotor',
      format: 'rupiah',
      hitung: (n) => {
        const m = ang(n.margin);
        return m > 0 ? ang(n.ongkir) / (m / 100) : 0;
      },
    },
    {
      label: 'Laba kotor pada nilai ambang itu',
      format: 'rupiah',
      hitung: (n) => ambangMinimum(n) * (ang(n.margin) / 100),
    },
    {
      label: 'Sisa setelah ongkir ditanggung',
      format: 'rupiah',
      hitung: (n) => ambangMinimum(n) * (ang(n.margin) / 100) - ang(n.ongkir),
    },
    {
      label: 'Selisih dari rata-rata pesanan Anda sekarang',
      format: 'rupiah',
      tampilBila: (n) => ang(n.aov) > 0,
      hitung: (n) => ambangMinimum(n) - ang(n.aov),
    },
  ],
  peringatan: [
    {
      bila: (n) => ang(n.sisamargin) >= ang(n.margin) && ang(n.margin) > 0,
      nada: 'awas',
      teks:
        'Margin yang ingin disisakan sama besar atau lebih besar daripada margin Anda sendiri — dengan angka itu ambangnya tidak bisa dihitung. Turunkan angka margin yang ingin disisakan.',
    },
    {
      bila: (n) => ang(n.aov) > 0 && ambangMinimum(n) > ang(n.aov) * 2,
      nada: 'info',
      teks:
        'Ambang yang dihitung lebih dari dua kali lipat rata-rata pesanan Anda sekarang. Angkanya benar secara hitungan, tapi ambang yang terlalu jauh dari kebiasaan pembeli biasanya jarang tercapai.',
    },
  ],
  penjelasan: `
<h2>Cara menghitung ambang gratis ongkir</h2>
<p>Gratis ongkir bukan benar-benar gratis — ongkirnya tetap dibayar, hanya
berpindah ke Anda. Yang menentukan apakah itu masuk akal adalah satu pertanyaan:
<strong>apakah laba kotor dari pesanan itu masih cukup menutup ongkir yang Anda
tanggung?</strong></p>

<h3>Titik impas</h3>
<p>Nilai pesanan di mana laba kotornya persis sama dengan ongkir:</p>
<p><code>Titik impas = ongkir ÷ margin</code></p>
<p>Contoh hitungan: ongkir Rp 20.000 dengan margin 30% memberi titik impas
20.000 ÷ 0,30 = Rp 66.667. Di nilai itu, seluruh laba kotor Anda habis untuk
ongkir — tidak rugi, tapi juga tidak menyisakan apa-apa.</p>

<h3>Ambang yang sebenarnya Anda butuhkan</h3>
<p>Karena itu titik impas saja tidak cukup. Anda perlu menetapkan berapa bagian yang
tetap ingin tersisa setelah ongkir ditanggung:</p>
<p><code>Ambang = ongkir ÷ (margin − margin yang ingin disisakan)</code></p>
<p>Contoh hitungan lanjutan: dengan margin 30% dan ingin tetap menyisakan 15%,
ambangnya menjadi 20.000 ÷ (0,30 − 0,15) = Rp 133.333. Artinya minimum belanja
sekitar Rp 133.000 ke atas.</p>

<h3>Kenapa jangan asal ikut minimum belanja toko lain</h3>
<p>Angka minimum belanja yang dipakai toko lain dihitung dari margin dan ongkir
<em>mereka</em>. Kalau margin Anda lebih tipis atau ongkir Anda lebih mahal karena
lokasi, angka yang sama bisa membuat tiap pesanan justru mengikis laba.</p>

<h3>Yang perlu diperiksa sebelum menetapkan</h3>
<p><strong>Bandingkan dengan kebiasaan pembeli Anda.</strong> Ambang yang jauh di
atas rata-rata nilai pesanan yang biasa terjadi umumnya jarang tercapai. Karena itu
kalkulator ini punya kolom rata-rata nilai pesanan — supaya selisihnya terlihat.</p>

<p><strong>Ongkir Anda tidak satu angka.</strong> Kirim dalam kota dan luar pulau
biayanya jauh berbeda. Kalau Anda menetapkan satu ambang untuk semua tujuan, pakai
ongkir rata-rata tertimbang, atau ongkir tujuan yang paling sering — bukan yang
paling murah.</p>

<p><strong>Margin tiap produk berbeda.</strong> Angka margin yang Anda masukkan di
sini sebaiknya margin rata-rata, bukan margin produk terbaik Anda. Kalau belum tahu
angkanya, hitung dulu di <a href="/alat/jualan-online/margin/">kalkulator
margin</a>.</p>

<p>Kalkulator ini hanya menghitung dari angka yang Anda masukkan sendiri. Apa yang
terjadi pada penjualan setelah ambang ditetapkan tergantung banyak hal di luar
hitungan ini — jadi tetapkan angkanya, lalu perhatikan sendiri hasilnya.</p>
`,
  faq: [
    {
      tanya: 'Berapa minimum belanja gratis ongkir yang tepat?',
      jawab:
        '<p>Tidak ada angka yang cocok untuk semua toko, karena tergantung margin dan ongkir Anda sendiri. Rumusnya: <code>ongkir ÷ (margin − margin yang ingin disisakan)</code>. Jangan menyalin angka toko lain — margin dan ongkir mereka berbeda dari Anda.</p>',
    },
    {
      tanya: 'Apa itu titik impas gratis ongkir?',
      jawab:
        '<p>Nilai pesanan di mana laba kotornya persis habis untuk menutup ongkir — tidak rugi, tapi juga tidak menyisakan apa pun. Rumusnya <code>ongkir ÷ margin</code>. Menetapkan ambang tepat di titik ini berarti tiap pesanan gratis ongkir tidak memberi Anda apa-apa, jadi biasanya ambangnya dipasang di atas titik itu.</p>',
    },
    {
      tanya: 'Margin mana yang harus saya masukkan?',
      jawab:
        '<p>Margin <strong>rata-rata</strong> Anda, bukan margin produk yang paling untung. Kalau yang dipakai margin terbaik, ambangnya akan terlihat lebih rendah daripada yang sebenarnya aman. Belum tahu angkanya? Hitung dulu di <a href="/alat/jualan-online/margin/">kalkulator margin</a>.</p>',
    },
    {
      tanya: 'Ongkir saya beda-beda tergantung tujuan, bagaimana?',
      jawab:
        '<p>Pakai ongkir tujuan yang <strong>paling sering</strong> Anda kirim, atau rata-rata tertimbangnya — jangan yang paling murah. Kalau selisih antar tujuan sangat jauh, sebagian toko memilih menetapkan ambang berbeda per wilayah daripada satu angka untuk semua.</p>',
    },
    {
      tanya: 'Apakah gratis ongkir pasti menaikkan penjualan?',
      jawab:
        '<p>Kalkulator ini tidak bisa menjawab itu, dan kami tidak akan menebaknya. Yang bisa dihitung di sini hanya satu hal: pada nilai pesanan berapa ongkir yang Anda tanggung masih tertutup laba kotor. Apa yang terjadi pada jumlah pesanan setelahnya tergantung produk, harga, dan pembeli Anda sendiri — perhatikan angkanya setelah berjalan.</p>',
    },
    {
      tanya: 'Bagaimana kalau hasilnya terasa terlalu tinggi?',
      jawab:
        '<p>Berarti ongkir Anda besar dibanding margin Anda. Pilihannya ada tiga: turunkan bagian yang ingin disisakan, tanggung sebagian ongkir saja (bukan seluruhnya), atau perbaiki marginnya lebih dulu. Menetapkan ambang di bawah hasil hitungan berarti Anda sadar menanggung selisihnya — itu boleh, asal disengaja.</p>',
    },
  ],
};

function ambangMinimum(n: Record<string, number | string>): number {
  const m = ang(n.margin) / 100;
  const sisa = ang(n.sisamargin) / 100;
  const beda = m - sisa;
  if (beda <= 0) return 0;
  return ang(n.ongkir) / beda;
}

// ============================================================================
// KELOMPOK 3 — DOKUMEN
// ============================================================================
// 🔵 Generator nota TIDAK memakai mesin kalkulator — bentuknya beda (daftar
//    barang + cetak). Halamannya berdiri sendiri di src/pages/alat/dokumen/,
//    tapi tetap didaftarkan di sini supaya muncul di daftar /alat/.

export const NOTA: Pick<
  Alat,
  'slug' | 'kelompok' | 'judul' | 'judulPendek' | 'judulSeo' | 'ringkas' | 'deskripsi' | 'faq' | 'penjelasan' | 'bonusWa' | 'pesanWa'
> = {
  slug: 'nota',
  kelompok: 'dokumen',
  judul: 'Generator Nota & Invoice',
  judulPendek: 'Generator Nota',
  judulSeo: 'Generator Nota & Invoice Gratis — Cetak Langsung ke PDF | Bedah Data',
  ringkas:
    'Isi datanya, notanya langsung rapi, lalu simpan sebagai PDF. Tidak perlu daftar dan datanya tidak dikirim ke mana pun.',
  deskripsi:
    'Generator nota dan invoice gratis: isi data toko dan daftar barang, lalu simpan sebagai PDF. Berjalan di HP dan komputer, tanpa perlu mendaftar.',
  bonusWa:
    'Mau nomor nota berurut otomatis dan riwayatnya tersimpan rapi? Klik WhatsApp, saya jelaskan caranya.',
  pesanWa:
    'Halo Bedah Data, saya baru pakai generator nota. Boleh tanya soal nota yang nomornya berurut otomatis dan tersimpan riwayatnya?',
  penjelasan: `
<h2>Cara membuat nota yang benar</h2>
<p>Nota bukan sekadar catatan berapa yang harus dibayar. Nota adalah bukti transaksi
— dan kalau isinya kurang, Anda yang repot ketika ada selisih atau komplain.</p>

<h3>Yang wajib ada di sebuah nota</h3>
<ul>
<li><strong>Identitas usaha Anda</strong> — nama, alamat, dan nomor yang bisa
dihubungi. Tanpa ini, nota Anda tidak bisa dipakai pelanggan sebagai bukti.</li>
<li><strong>Nomor nota</strong> — supaya bisa dicari kembali. Ini yang paling
sering diabaikan, dan paling menyusahkan ketika dibutuhkan.</li>
<li><strong>Tanggal transaksi</strong> — penting untuk garansi dan retur.</li>
<li><strong>Rincian barang atau jasa</strong> — nama, jumlah, harga satuan, dan
jumlahnya. Rincian yang jelas mencegah perdebatan belakangan.</li>
<li><strong>Total yang harus dibayar</strong> — setelah diskon dan pajak kalau ada.</li>
</ul>

<h3>Kenapa penomoran itu penting</h3>
<p>Nomor nota adalah satu-satunya cara mencari kembali satu transaksi di antara
ratusan lainnya. Tanpa nomor yang berurut, mencocokkan pembayaran dengan
penjualan berubah jadi membongkar tumpukan kertas.</p>
<p>Pakai pola yang sederhana dan konsisten, misalnya tahun-bulan-urutan. Yang
penting <strong>tidak ada nomor yang dobel</strong> dan tidak ada yang dilewati
tanpa alasan.</p>

<h3>Diskon dan pajak</h3>
<p>Tulis diskon sebagai baris tersendiri, jangan langsung mengurangi harga
satuannya. Pelanggan perlu melihat harga aslinya, dan Anda perlu tahu berapa
diskon yang sebenarnya sudah diberikan bulan ini.</p>
<p>Kalau usaha Anda memungut pajak, cantumkan terpisah dari nilai barang. Menyatukan
keduanya membuat pencatatan Anda sendiri jadi sulit dipisahkan kembali.</p>

<h3>Simpan salinannya</h3>
<p>Nota yang diberikan ke pelanggan tidak berguna untuk Anda kalau tidak ada
salinannya. Simpan berkas PDF-nya di satu folder yang rapi — itu jauh lebih mudah
dicari daripada buku nota, dan tidak bisa hilang tersiram atau terselip.</p>

<h3>Kapan cara ini mulai tidak cukup</h3>
<p>Membuat nota satu per satu seperti di halaman ini cukup untuk beberapa transaksi
sehari. Yang berubah ketika transaksi bertambah: nomornya harus berurut sendiri,
stoknya harus ikut berkurang saat barang terjual, dan piutang pelanggan harus
tercatat tanpa dihitung manual. Di titik itu, alat pembuat nota saja sudah tidak
cukup — yang dibutuhkan sistem yang menyambungkan nota dengan stok dan keuangan.</p>
`,
  faq: [
    {
      tanya: 'Apakah data yang saya isi tersimpan atau terkirim ke Bedah Data?',
      jawab:
        '<p><strong>Tidak.</strong> Seluruh proses berjalan di dalam browser Anda sendiri. Tidak ada data yang dikirim ke server kami — kami tidak bisa melihat nama toko, nama pelanggan, atau angka apa pun yang Anda ketik. Kalau halaman ditutup atau di-refresh, isinya hilang sepenuhnya.</p>',
    },
    {
      tanya: 'Bagaimana cara menyimpannya jadi PDF?',
      jawab:
        '<p>Tekan tombol "Simpan / Cetak PDF". Jendela cetak browser akan terbuka — pilih tujuan <strong>"Simpan sebagai PDF"</strong> (bukan nama printer), lalu simpan. Di HP, pilihan ini biasanya muncul sebagai "Simpan sebagai PDF" di menu cetak.</p>',
    },
    {
      tanya: 'Bisa dipakai di HP?',
      jawab:
        '<p>Bisa. Isian dan pratinjau notanya menyesuaikan layar HP, dan fungsi simpan PDF memakai fitur cetak bawaan browser HP. Untuk hasil cetak yang paling rapi, mengisinya di layar lebar lebih nyaman — tapi keduanya menghasilkan PDF yang sama.</p>',
    },
    {
      tanya: 'Bisa menambahkan logo toko saya?',
      jawab:
        '<p>Bisa. Klik kolom logo dan pilih berkas gambar dari perangkat Anda. Gambarnya hanya dimuat di dalam browser untuk ditampilkan di nota — sama seperti data lain, tidak dikirim ke mana pun.</p>',
    },
    {
      tanya: 'Nomor notanya berurut otomatis?',
      jawab:
        '<p>Belum. Halaman ini membuat satu nota sekali jalan dan tidak menyimpan riwayat, jadi nomornya Anda isi sendiri. Penomoran berurut otomatis memerlukan sistem yang menyimpan data — kalau usaha Anda sudah sampai ke kebutuhan itu, silakan hubungi kami lewat WhatsApp.</p>',
    },
    {
      tanya: 'Apakah nota dari sini sah dipakai?',
      jawab:
        '<p>Nota ini memuat unsur-unsur yang lazim ada pada bukti transaksi: identitas usaha, nomor, tanggal, rincian barang, dan total. Untuk keperluan umum jual beli, itu memadai. Kalau usaha Anda punya kewajiban perpajakan tertentu, ada dokumen dengan format khusus yang diatur terpisah — untuk itu sebaiknya dicek langsung ke ketentuan yang berlaku.</p>',
    },
  ],
};

// --- Kumpulan semua alat -----------------------------------------------------

export const ALAT: Alat[] = [
  komisiBengkel,
  komisiSalon,
  komisiSales,
  lembur,
  thr,
  hargaMarketplace,
  margin,
  ambangOngkir,
];

/** Semua alat termasuk yang tidak memakai mesin kalkulator (generator nota). */
export const SEMUA_ALAT = [
  ...ALAT.map((a) => ({
    slug: a.slug,
    kelompok: a.kelompok,
    judulPendek: a.judulPendek,
    ringkas: a.ringkas,
    href: `/alat/${a.kelompok}/${a.slug}/`,
  })),
  {
    slug: NOTA.slug,
    kelompok: NOTA.kelompok,
    judulPendek: NOTA.judulPendek,
    ringkas: NOTA.ringkas,
    href: `/alat/${NOTA.kelompok}/${NOTA.slug}/`,
  },
];
