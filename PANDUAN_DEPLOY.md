# PANDUAN MENAYANGKAN WEBSITE — Bedah Data

**Untuk:** Owner (non-programmer) · **Disusun:** Mas Aldo · **29 Juli 2026**

Panduan ini menuntun dari **titik nol** — belum punya akun GitHub, belum punya repo —
sampai website tayang di `bedahdata.id`.

> **Perkiraan waktu:** 45–60 menit untuk pertama kali. Setelah ini, memperbarui website
> cukup 2 menit.

---

## ⚠️ SATU HAL YANG HARUS DIPAHAMI DULU

Website ini **tidak lagi berupa satu file HTML** yang tinggal di-upload. Sekarang bentuknya:

```
Anda mengubah file sumber  →  GitHub  →  Cloudflare merakit (build)  →  Website tayang
```

Artinya:

| | Dulu (HTML lama) | Sekarang (Astro) |
|---|---|---|
| Yang Anda edit | `web/index.html` | file di `web-src/src/` |
| Yang tayang | file yang sama persis | hasil rakitan di folder `dist/` |
| Cara menayangkan | upload manual | **otomatis** setiap kali Anda simpan ke GitHub |

🔴 **Folder `dist/` dan `node_modules/` JANGAN diikutkan ke GitHub.** Keduanya dibuat ulang
otomatis oleh Cloudflare. File `.gitignore` sudah mengatur ini — jangan dihapus.

---

## BAGIAN 1 — SIAPKAN AKUN GITHUB

GitHub adalah tempat menyimpan kode. Cloudflare mengambil kode dari sini.

### 1.1 Buat akun (kalau belum punya)

1. Buka **https://github.com/signup**
2. Isi email, buat kata sandi, pilih nama pengguna (misalnya `bedahdata`)
3. Verifikasi email yang dikirimkan GitHub

> 💡 Owner sudah punya akun `bedahdataid-cell` (dipakai untuk halaman kebijakan privasi).
> **Boleh memakai akun itu** — tidak perlu buat baru.

### 1.2 Pasang GitHub Desktop

Ini cara termudah tanpa mengetik perintah apa pun.

1. Unduh dari **https://desktop.github.com**
2. Pasang, lalu buka
3. Klik **Sign in to GitHub.com**, masuk dengan akun tadi

---

## BAGIAN 2 — UNGGAH KODE KE GITHUB

### 2.1 Buat repositori baru

1. Di GitHub Desktop: menu **File → New repository**
2. Isi:

| Kolom | Isi |
|---|---|
| **Name** | `bedahdata-web` |
| **Description** | `Website resmi Bedah Data` |
| **Local path** | 🔴 **JANGAN di Google Drive** — pilih misalnya `C:\Users\bedah\Projek` |
| **Git ignore** | None (kita sudah punya sendiri) |
| **License** | None |

3. Klik **Create repository**

> 🔴 **Kenapa jangan di Google Drive?** Google Drive terus-menerus menyinkronkan file.
> Saat memasang komponen program, ribuan file kecil dibuat sekaligus dan Drive gagal
> mengikutinya — pemasangan jadi rusak. **Ini sudah terbukti terjadi saat pembuatan situs ini.**

### 2.2 Salin file proyek ke folder repositori

Buka folder repositori yang baru dibuat (misalnya `C:\Users\bedah\Projek\bedahdata-web`),
lalu **salin seluruh isi** folder:

```
G:\My Drive\Workspace Bakti\Bedah Data\web-src\
```

ke dalamnya. Setelah disalin, isinya harus seperti ini:

```
bedahdata-web/
  .gitignore          ← penting, jangan sampai tertinggal
  astro.config.mjs
  package.json
  package-lock.json
  public/
  src/
```

> 🔴 Kalau ada folder `node_modules` atau `dist` yang ikut tersalin, **hapus saja** —
> keduanya dibuat ulang otomatis.

### 2.3 Kirim ke GitHub

1. Kembali ke GitHub Desktop — daftar file yang berubah akan muncul
2. 🔴 **Periksa:** pastikan `node_modules` **tidak** ada di daftar. Kalau ada, berarti
   `.gitignore` belum tersalin — ulangi langkah 2.2
3. Di kotak **Summary** ketik: `Website Astro pertama`
4. Klik **Commit to main**
5. Klik **Publish repository** di atas
6. 🔴 **Hilangkan centang "Keep this code private"** kalau ingin gratis selamanya di
   Cloudflare. (Repositori privat juga bisa, tapi publik lebih sederhana. Tidak ada
   data rahasia di dalamnya — hanya isi website yang memang akan dibaca publik.)
7. Klik **Publish repository**

✅ Kode Anda sekarang ada di GitHub.

---

## BAGIAN 3 — HUBUNGKAN KE CLOUDFLARE PAGES

### 3.1 Buat proyek Pages

1. Masuk ke **https://dash.cloudflare.com**
2. Menu kiri: **Workers & Pages** → tombol **Create** → tab **Pages**
3. Pilih **Connect to Git**
4. Klik **Connect GitHub**, izinkan Cloudflare mengakses akun Anda
5. Pilih repositori **`bedahdata-web`** → **Begin setup**

### 3.2 🔴 Pengaturan build — ISI PERSIS SEPERTI INI

| Kolom | Isi |
|---|---|
| **Project name** | `bedahdata-web` |
| **Production branch** | `main` |
| **Framework preset** | `Astro` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | *(kosongkan)* |

Kalau memilih preset **Astro**, dua kolom build biasanya terisi sendiri. **Tetap periksa**
apakah isinya sudah sesuai tabel di atas.

**Environment variables:** tambahkan satu ini supaya versi Node-nya pasti cocok:

| Variable name | Value |
|---|---|
| `NODE_VERSION` | `20` |

6. Klik **Save and Deploy**
7. Tunggu 1–3 menit. Kalau berhasil, muncul alamat sementara seperti
   `bedahdata-web.pages.dev` — **buka dan periksa tampilannya**

> ❗ **Kalau build gagal:** klik deployment yang gagal, baca bagian merah di log.
> Penyebab paling sering: `package.json` atau `package-lock.json` tidak ikut terunggah.

---

## BAGIAN 4 — PASANG DOMAIN `bedahdata.id`

### 4.1 Domain utama

1. Di proyek Pages Anda → tab **Custom domains** → **Set up a custom domain**
2. Ketik: `bedahdata.id` → **Continue** → **Activate domain**
3. Karena domain sudah ada di Cloudflare, catatan DNS dibuat otomatis
4. Tunggu 1–5 menit sampai statusnya **Active**

### 4.2 Versi `www`

1. Tambahkan lagi custom domain: `www.bedahdata.id`
2. Kita akan mengarahkannya ke versi tanpa `www` di langkah berikutnya

> **Kenapa harus dipilih salah satu?** Kalau `bedahdata.id` dan `www.bedahdata.id`
> sama-sama menampilkan isi, Google menganggapnya dua situs berbeda dengan isi kembar —
> dan kekuatan pencarian terbelah dua.

### 4.3 HTTPS

Cloudflare memasang sertifikat HTTPS otomatis dan gratis. Yang perlu dipastikan:

1. Menu **SSL/TLS** → **Overview** → mode: **Full (strict)**
2. Menu **SSL/TLS** → **Edge Certificates** → aktifkan **Always Use HTTPS**

---

## BAGIAN 5 — 🔴 ALIHKAN `bedahdata.online` KE `bedahdata.id`

Ini langkah yang **paling sering terlewat**, padahal menentukan.

> **Aturannya:** `bedahdata.online` **tidak berisi apa pun**. Ia hanya papan penunjuk jalan.
> 🔴 **Jangan menjalankan dua situs kembar** — itu membuat keduanya kalah bersaing di Google.

### 5.1 Pastikan domain ada di Cloudflare

`bedahdata.online` harus sudah ditambahkan sebagai *website* di akun Cloudflare yang sama.

### 5.2 Buat catatan DNS penampung

Pengalihan butuh sasaran, walau isinya tidak dipakai:

1. Pilih domain `bedahdata.online` → menu **DNS** → **Add record**
2. Isi:

| Kolom | Isi |
|---|---|
| Type | `AAAA` |
| Name | `@` |
| IPv6 address | `100::` |
| Proxy status | 🔴 **Proxied** (awan oranye menyala) |

3. Ulangi sekali lagi dengan **Name** diisi `www`

### 5.3 Buat aturan pengalihan

1. Masih di domain `bedahdata.online` → menu **Rules** → **Redirect Rules**
2. **Create rule**, isi:

| Kolom | Isi |
|---|---|
| Rule name | `Alihkan ke bedahdata.id` |
| **When incoming requests match** | pilih **All incoming requests** |
| **Type** | `Dynamic` |
| **Expression** | `concat("https://bedahdata.id", http.request.uri.path)` |
| **Status code** | 🔴 **301 (Permanent Redirect)** |
| **Preserve query string** | ✅ aktifkan |

3. **Deploy**

### 5.4 Alihkan `www.bedahdata.id` juga

Lakukan hal yang sama di domain `bedahdata.id`, tapi dengan syarat khusus:

| Kolom | Isi |
|---|---|
| Rule name | `www ke non-www` |
| **When** | Custom filter: `Hostname` `equals` `www.bedahdata.id` |
| **Type** | `Dynamic` |
| **Expression** | `concat("https://bedahdata.id", http.request.uri.path)` |
| **Status** | **301** |

### 5.5 🔴 Uji hasilnya

Buka di browser satu per satu — semuanya harus berakhir di `https://bedahdata.id`:

- `bedahdata.online` → ✅
- `bedahdata.online/harga` → ✅ harus mendarat di `bedahdata.id/**harga**`, bukan halaman depan
- `www.bedahdata.id` → ✅

> **Kenapa 301, bukan 302?** `301` berarti *pindah permanen*, dan hanya 301 yang
> **memindahkan kekuatan pencarian** ke domain tujuan. `302` berarti sementara — kerja SEO
> bertahun-tahun tidak akan terkumpul.

---

## BAGIAN 6 — SETELAH TAYANG

### 6.1 Daftarkan ke Google

1. Buka **https://search.google.com/search-console**
2. Tambahkan properti jenis **URL prefix**: `https://bedahdata.id`
3. Verifikasi (pilih metode **DNS**, Cloudflare mendukungnya)
4. Menu **Sitemaps** → kirimkan: `sitemap-index.xml`
5. 🔴 Daftarkan **juga** `bedahdata.online` sebagai properti terpisah — supaya perpindahannya
   terpantau

### 6.2 Statistik pengunjung

Di proyek Pages → tab **Analytics** → aktifkan **Web Analytics**.

Gratis, tanpa cookie, tidak memperlambat situs, dan **tidak memerlukan banner persetujuan
cookie** — berbeda dengan Google Analytics.

### 6.3 Periksa kecepatan

Buka **https://pagespeed.web.dev**, masukkan `https://bedahdata.id`, targetkan hijau di mobile.

---

## BAGIAN 7 — CARA MEMPERBARUI WEBSITE NANTI

Setelah semuanya terpasang, memperbarui jadi sangat mudah:

1. Ubah file di folder repositori (bukan di Google Drive)
2. Buka GitHub Desktop → tulis ringkasan perubahan → **Commit to main**
3. Klik **Push origin**
4. Tunggu 1–2 menit — Cloudflare merakit dan menayangkan sendiri

✅ Tidak perlu upload apa pun secara manual.

> **Menambah artikel blog?** Lihat `PANDUAN_TULIS_ARTIKEL.md` — lebih sederhana lagi.

---

## KALAU ADA MASALAH

| Gejala | Kemungkinan penyebab | Tindakan |
|---|---|---|
| Build gagal di Cloudflare | `package-lock.json` tidak terunggah | Periksa file itu ada di GitHub |
| Build gagal, pesan soal versi Node | `NODE_VERSION` belum diisi | Tambahkan environment variable `NODE_VERSION` = `20` |
| Website tayang tapi tanpa gambar/warna | Isi folder `public/` tidak ikut | Periksa `public/assets/` ada di GitHub |
| Domain masih "not active" | DNS belum menyebar | Tunggu sampai 30 menit |
| `bedahdata.online` tidak beralih | Catatan DNS `AAAA 100::` belum Proxied | Nyalakan awan oranye |
| Perubahan tidak muncul | Lupa **Push origin** | Cek GitHub Desktop |

---

## Terkait
`PANDUAN_TULIS_ARTIKEL.md` · `.claude/rules/website.md` · `web-arsip-html-lama/RENCANA_SEO.md`
