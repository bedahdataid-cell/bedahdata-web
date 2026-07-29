# CARA MENAMBAH ARTIKEL BARU

**Untuk:** Owner · **Tingkat kesulitan:** mudah — tidak perlu bisa memprogram

Menambah artikel = **membuat satu file teks**. Halamannya terbuat sendiri, otomatis muncul
di daftar panduan, otomatis masuk sitemap Google.

---

## LANGKAH SINGKAT (untuk yang sudah pernah)

1. Salin salah satu file di `src/content/panduan/`
2. Ganti namanya (huruf kecil, pakai tanda hubung, akhiran `.md`)
3. Ubah bagian atas (judul, deskripsi, tanggal) dan isinya
4. Simpan → GitHub Desktop → **Commit** → **Push origin**
5. Tunggu 2 menit, artikel tayang

---

## LANGKAH LENGKAP

### 1. Buka folder artikel

```
bedahdata-web/src/content/panduan/
```

Isinya file berakhiran `.md`. Satu file = satu artikel.

### 2. Salin artikel lama sebagai contoh

Klik kanan `cara-menghitung-hpp-jasa.md` → **Copy** → **Paste**.

Ganti nama salinannya sesuai judul artikel baru:

| ✅ Benar | ❌ Salah |
|---|---|
| `cara-menghitung-komisi-mekanik.md` | `Cara Menghitung Komisi.md` (ada spasi & huruf besar) |
| `stok-tidak-cocok.md` | `artikel baru (1).md` |

> 🔴 **Nama file jadi alamat halamannya.** File `cara-menghitung-komisi-mekanik.md`
> akan tayang di `bedahdata.id/panduan/cara-menghitung-komisi-mekanik`.
> **Jangan pakai spasi, huruf besar, atau tanda baca.**

### 3. Buka file dengan Notepad (atau editor teks apa pun)

Bagian paling atas terlihat seperti ini — inilah **kartu identitas artikel**:

```markdown
---
judul: "Cara menghitung HPP jasa (bukan barang) untuk bengkel & salon"
deskripsi: "Panduan menghitung harga pokok satu pekerjaan jasa: bahan terpakai, upah pelaksana, dan biaya tetap. Lengkap dengan contoh perhitungan sederhana."
tanggal: 2026-07-29
kategori: "Keuangan Usaha"
kataKunci: "cara menghitung hpp jasa"
draf: false
---
```

🔴 **Tanda `---` di atas dan bawah wajib ada.** Kalau terhapus, artikel tidak akan muncul.

### Penjelasan tiap baris

| Baris | Wajib? | Aturan |
|---|---|---|
| `judul` | ✅ | Maksimal **75 huruf**. Ini yang muncul di Google |
| `deskripsi` | ✅ | **70–180 huruf**. Ini kalimat yang dibaca orang di Google — buat menarik |
| `tanggal` | ✅ | Format `TAHUN-BULAN-TANGGAL`, contoh `2026-08-15` |
| `kategori` | ✅ | 🔴 Harus **persis** salah satu dari daftar di bawah |
| `kataKunci` | tidak | Catatan internal, tidak tampil di website |
| `diperbarui` | tidak | Diisi kalau artikel lama direvisi, format sama dengan `tanggal` |
| `draf` | ✅ | `false` = tayang · `true` = disembunyikan |

**Kategori yang tersedia** (salin persis, termasuk huruf besar-kecilnya):

- `"Keuangan Usaha"`
- `"Mengelola Tim"`
- `"Stok & Barang"`
- `"Memilih Sistem"`

> 💡 **Belum selesai menulis?** Setel `draf: true`. Artikel tersimpan tapi tidak tayang.
> Ganti jadi `false` kalau sudah siap.

### 4. Tulis isinya

Di bawah tanda `---` kedua, tulis artikelnya. Aturan penulisannya sedikit:

```markdown
## Ini judul bagian

Ini paragraf biasa. Tulis seperti biasa saja.

Untuk **tebal**, apit dengan dua bintang.

### Ini sub-judul

- Ini daftar
- Baris kedua

1. Ini daftar bernomor
2. Baris kedua

> Ini kutipan atau catatan penting.

| Kolom A | Kolom B |
|---|---|
| isi 1 | isi 2 |

[Ini tautan](/harga) ke halaman harga.
```

**Yang perlu diingat:**

| Ingin | Tulis |
|---|---|
| Judul bagian | `## Judul` (dua pagar + spasi) |
| Sub-judul | `### Sub-judul` (tiga pagar) |
| Teks tebal | `**tebal**` |
| Baris baru antar paragraf | Kosongkan satu baris |

> 🔴 **Jangan pakai `#` satu** (satu pagar). Judul utama sudah otomatis diambil dari
> `judul:` di atas. Kalau ditulis lagi, halaman jadi punya dua judul utama dan
> nilainya turun di Google.

💡 **Daftar isi terbuat sendiri** dari semua `##` kalau jumlahnya lebih dari dua.

### 5. Kotak catatan khusus

Untuk menandai bahwa sebuah angka hanya contoh:

```markdown
<div class="catatan">

**Angka di atas hanya ilustrasi**, bukan data nyata. Ganti dengan angka usaha Anda.

</div>
```

🔴 **Baris kosong setelah `<div>` dan sebelum `</div>` wajib ada.**

### 6. Simpan & tayangkan

1. Simpan file (Ctrl+S)
2. Buka **GitHub Desktop** — file baru muncul di daftar
3. Tulis ringkasan, misalnya: `Artikel komisi mekanik`
4. **Commit to main** → **Push origin**
5. Tunggu 1–2 menit

Artikel otomatis muncul di `bedahdata.id/panduan`, masuk sitemap, dan siap ditemukan Google.

---

## 🔴 ATURAN ISI YANG TIDAK BOLEH DILANGGAR

Ini bukan aturan gaya menulis — ini batasan yang melindungi kepercayaan yang kita jual.

| Dilarang | Alasan |
|---|---|
| **Menjanjikan hasil usaha** — "omzet naik", "untung pasti bertambah" | Batas jujur Nilai #7. Boleh dijanjikan: *kualitas bahan keputusan*, bukan *hasilnya* |
| **Angka statistik tanpa sumber** — "80% UMKM gagal karena…" | Kalau tidak punya sumbernya, jangan ditulis |
| **Angka contoh tanpa penanda** | Wajib ditulis "contoh" atau "ilustrasi" |
| **Testimoni atau nama klien** | Klien komersial masih nol. Termasuk dilarang: contoh yang terlihat nyata |
| **Kata "terjangkau" / "murah"** | Sudah dicabut resmi. Harga boleh disebut sebagai fakta, bukan alasan membeli |
| **Menjelekkan pesaing** | Boleh membandingkan model bisnis secara faktual, bukan menyerang merek |
| **Menjanjikan integrasi marketplace otomatis** | 🔴 Fitur ini **tidak ada**. Order tetap diinput manual |

### ✅ Yang membuat artikel bagus

- **Berguna walau pembaca tidak membeli.** Ini bukan kebaikan hati — artikel yang
  benar-benar menjawab adalah yang bertahan di peringkat Google
- **Ajarkan cara manualnya sampai tuntas** dulu, baru sebut sistem di bagian akhir
  (kalau memang perlu disebut)
- **Satu artikel = satu kata kunci utama.** Jangan satu artikel mengejar lima topik
- **Akui yang belum bisa.** Artikel yang menyebut kelemahan sendiri justru lebih dipercaya

> ⏱️ **Irama yang realistis: 2 artikel per bulan.** Lebih baik konsisten 2 per bulan
> selama setahun daripada 10 artikel bulan ini lalu berhenti.

---

## KALAU ARTIKEL TIDAK MUNCUL

| Gejala | Penyebab tersering | Perbaikan |
|---|---|---|
| Build gagal setelah push | `deskripsi` kurang dari 70 huruf atau lebih dari 180 | Baca pesan errornya — sudah dalam bahasa jelas, sebutkan kolom mana |
| Build gagal, menyebut `kategori` | Kategori tidak sama persis dengan daftar | Salin persis dari daftar di atas |
| Artikel tidak tampil di daftar | `draf: true` | Ubah jadi `draf: false` |
| Judul tampil dua kali | Ada `# Judul` di dalam isi | Hapus, cukup pakai `##` ke bawah |
| Tanggal tampil salah | Format terbalik | Pakai `2026-08-15`, bukan `15-08-2026` |

> 💡 **Pesan error saat build sengaja dibuat jelas.** Kalau build gagal, itu justru sedang
> melindungi Anda — artikel tanpa deskripsi akan tampil buruk di Google.

---

## IDE ARTIKEL BERIKUTNYA

Diambil dari Pilar 3 (`Konten/STRATEGI_CHANNEL_MARKETING.md`) — topik yang dicari orang
di Google:

| Judul kerja | Kata kunci | Kategori |
|---|---|---|
| Cara menghitung komisi teknisi yang adil — 3 model & konsekuensinya | `cara menghitung komisi mekanik bengkel` | Mengelola Tim |
| Stok di catatan 40, di gudang 33. Ke mana perginya 7? | `stok tidak cocok dengan catatan` | Stok & Barang |
| Laporan keuangan untuk pengajuan KUR: apa saja yang diminta bank | `laporan keuangan untuk pengajuan KUR` | Keuangan Usaha |
| Beli sekali vs langganan bulanan: hitung-hitungan jujurnya | `software akuntansi sekali bayar` | Memilih Sistem |
| Kapan usaha Anda **belum** butuh sistem seperti ini | `kapan umkm butuh erp` | Memilih Sistem |
| Cara membaca laporan laba rugi dalam 3 menit | `cara membaca laporan laba rugi` | Keuangan Usaha |
| Cara pisah uang pribadi dan uang usaha | `cara pisah uang pribadi dan usaha` | Keuangan Usaha |

> ⭐ Artikel **"Kapan usaha Anda belum butuh sistem seperti ini"** adalah yang paling kuat
> di daftar ini. Tidak ada vendor lain yang berani menulisnya — ia membangun kepercayaan
> justru dengan menolak sebagian pembaca, sekaligus menyaring calon klien yang tidak cocok
> sebelum memakan jam layanan.

---

## Terkait
`PANDUAN_DEPLOY.md` · `Konten/STRATEGI_CHANNEL_MARKETING.md` (Pilar 3) · `.claude/rules/website.md`
