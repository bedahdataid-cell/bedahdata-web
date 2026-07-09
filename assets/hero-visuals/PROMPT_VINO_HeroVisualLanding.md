# Prompt Image — Visual Alternatif Hero/Section Fitur Landing Page (Pengganti Sementara Video Demo)

**Tanggal:** 2026-07-09
**Dibuat oleh:** Mas Vino (AI Image Prompt Strategist)
**Alasan:** Video demo produk ditunda dulu sampai ada klien nyata (rekomendasi Pak Strategi). Ini
alternatif visual ringan untuk mengisi hero/section fitur `web/index.html` sementara waktu.
**Generator:** Gemini Nano Banana Pro (utama — teks di gambar akurat, DKV presisi)
**Folder aset tujuan:** `web/assets/hero-visuals/`
**Catatan penting:** Ini BUKAN konten sosmed mingguan — jadi disimpan permanen di `web/assets/`,
bukan di `Konten/W[XX]/`. Dimensi mengikuti kebutuhan web (bukan 4:5/9:16 sosmed).

---

## Ringkasan 3 Opsi

| # | Konsep                                | Peran di landing page                                 | Rasio disarankan                 | Nama file                             |
| - | ------------------------------------- | ----------------------------------------------------- | -------------------------------- | ------------------------------------- |
| 1 | Mockup UI dashboard dianotasi         | Ganti`#product-mockup` section "Buka satu layar..." | 16:10 (± hero banner)           | `Opsi1_MockupDashboard_Anotasi.png` |
| 2 | Before-after spreadsheet vs dashboard | Section fitur/pain point kompleksitas                 | 16:9 wide                        | `Opsi2_BeforeAfter_Spreadsheet.png` |
| 3 | Visual "data di Drive sendiri"        | Section kepercayaan/kepemilikan data                  | 4:3 atau 1:1 (fleksibel section) | `Opsi3_DataDiDriveSendiri.png`      |

> Semua prompt ditujukan ke **Gemini Nano Banana Pro** dan sudah memuat teks final + tata letak
> DKV di dalam gambar (siap tempel ke `<img>` setelah generate, tidak perlu render ulang oleh Mas
> Deni — kecuali owner ingin penyesuaian kecil).

---

## OPSI 1 — Mockup UI Dashboard Dianotasi

### Konsep singkat

- **Pesan utama:** ERP Studio itu satu layar sederhana yang menampilkan kondisi bisnis (omzet, stok,
  tagihan) — dan datanya ada di Drive milik user sendiri, bukan server vendor.
- **Pain point/pilar:** Kompleksitas (pilar ekonomi/kepercayaan) — UI harus terlihat *simpel*, bukan
  ERP korporat yang menakutkan. Anotasi menegaskan pilar kepercayaan (kepemilikan data).
- **Mood & tone:** Tenang, rapi, terpercaya, modern tapi bersahabat (bukan cold-corporate).
- **Peran gambar di layout:** Menggantikan wireframe CSS placeholder `#product-mockup` di section
  "Buka satu layar, kondisi bisnis langsung kebaca" — ditaruh dalam frame browser mockup (tilt 3D
  CSS sudah ada di halaman, jadi gambar cukup flat/rapi, efek 3D ditangani CSS).

### PROMPT UTAMA (Nano Banana Pro) — siap-posting

```
A clean, modern, photorealistic UI mockup screenshot of a business management dashboard software
called "ERP Studio", displayed inside a minimal browser window frame (thin gray browser chrome
with 3 dots top-left, no visible URL text). Aspect ratio 16:10, landscape orientation, high
resolution 1920x1200.

LAYOUT — DASHBOARD SCREEN CONTENT:
- Top navigation bar: left side shows small green square logo icon and text "ERP Studio" in bold
  dark teal (#0E3D33) sans-serif font (Poppins-style geometric sans). Right side shows a small
  circular user avatar placeholder icon.
- Left sidebar (dark navy #0E3D33 background, occupying ~18% width): vertical menu list with icon +
  label pairs, top item highlighted with green (#2ECC58) accent bar and lighter background, reading
  top to bottom: "Ringkasan" (active/highlighted), "Penjualan", "Inventory", "Keuangan", "HRD",
  "Pengaturan". Simple flat line icons beside each label, white/light gray text.
- Main content area (light background #F2F2F2 / white): 
  - Row of 3 KPI summary cards near top, each a white rounded card with soft shadow: 
    Card 1 label "Omzet Hari Ini" bold number "Rp 4.250.000" in dark teal, small green upward arrow
      icon with "+12%" in green text.
    Card 2 label "Stok Menipis" bold number "8 Produk" in dark teal, small amber/orange warning dot.
    Card 3 label "Tagihan Jatuh Tempo" bold number "3 Invoice" in dark teal, small red dot accent.
  - Below KPI cards: a simple clean bar chart widget titled "Grafik Penjualan 7 Hari Terakhir" in
    dark teal small heading text, 7 vertical bars in gradient green (#2ECC58 to #22A847), white card
    background with soft rounded corners and subtle shadow, minimal gridlines, no clutter.
  - Below chart: a simple data table widget titled "Transaksi Terbaru" with 3 clean rows showing
    placeholder-style short text (product name, amount, status badge in green "Lunas" pill shape),
    thin light gray row dividers.
- ANNOTATION OVERLAY (important, must render as accurate Indonesian text): a call-out annotation
  bubble/tag pointing from the bottom-right area of the dashboard content toward a small Google
  Drive icon (simplified triangular drive logo in brand-neutral colors, small, subtle, bottom right
  corner of the browser mockup, outside main content flow) — connected by a thin dashed line in
  green (#2ECC58). The annotation bubble has a white rounded rectangle background with soft shadow,
  small green border accent on the left edge, containing bold dark teal (#0E3D33) text that reads
  exactly: "Data ini tersimpan di Drive kamu sendiri" — text should be clean, legible, sans-serif,
  centered in the bubble, sized appropriately to fit on 1-2 lines.

STYLE: Flat modern SaaS dashboard UI design, generous white space, soft drop shadows on cards,
rounded corners (8-12px radius feel), consistent green (#2ECC58, #22A847) and dark teal (#0E3D33)
accent color system on white/light gray (#F2F2F2) background, professional but warm and approachable
— not sterile corporate, not overly complex, easy to read at a glance. Crisp UI rendering, sharp
text edges, pixel-perfect alignment, no visual noise or clutter, no fake cursor, no browser tabs,
no bookmarks bar.

NEGATIVE / AVOID: no photographic people, no hands, no distorted or garbled text, no misspelled
words, no random UI elements floating disconnected, no watermark, no logo other than the small
"ERP Studio" wordmark described, no clutter, no overly dense small text that's illegible, no dark
mode, no glossy 3D skeuomorphic effects, no generic stock-dashboard look (avoid looking like a
templated Envato mockup), no extra language other than Indonesian in on-screen text.
```

### Terjemahan ringkas (ID)

Mockup UI dashboard "ERP Studio" gaya SaaS modern dalam frame browser minimalis. Sidebar navy gelap
dengan menu (Ringkasan aktif, Penjualan, Inventory, Keuangan, HRD, Pengaturan). Konten utama: 3 kartu
KPI (Omzet Hari Ini, Stok Menipis, Tagihan Jatuh Tempo), grafik batang hijau 7 hari, tabel transaksi
terbaru. Ada anotasi bubble putih dengan teks **"Data ini tersimpan di Drive kamu sendiri"** yang
menunjuk ke ikon Google Drive kecil di pojok kanan bawah lewat garis putus-putus hijau. Gaya flat,
bersih, rapi, warna hijau+navy brand, bukan tampilan ERP korporat yang menakutkan.

### Peta zona (ASCII)

```
┌───────────────────────────────────────────────────┐
│ ● ● ●                    [ERP Studio logo]     👤 │ ← browser chrome + top bar
├────────────┬────────────────────────────────────────┤
│ Ringkasan▮ │ [KPI: Omzet] [KPI: Stok] [KPI: Tagihan]│
│ Penjualan  │                                        │
│ Inventory  │ [ Grafik Penjualan 7 Hari — bar chart ]│
│ Keuangan   │                                        │
│ HRD        │ [ Tabel: Transaksi Terbaru ]           │
│ Pengaturan │                          ┌─────────────┴┐
│            │                          │ "Data ini    │
│            │                    (Drive)│ tersimpan di │
│            │                      icon │ Drive kamu   │
│            │                          │ sendiri"     │
└────────────┴──────────────────────────┴──────────────┘
```

### Catatan generator

- **Gemini Nano Banana Pro** — wajib untuk opsi ini karena ada teks Indonesia + anotasi presisi.
- Rasio: minta **16:10** (mendekati aspect ratio umum screenshot browser); kalau Nano Banana Pro
  hanya izinkan preset tertentu, pakai **16:9** lalu crop tipis atas/bawah — masih aman untuk
  ditaruh di `.mockup-tilt-wrap` (CSS sudah handle border-radius & shadow).
- Cek sekilas ejaan "Ringkasan", "Penjualan", "Inventory", "Keuangan", "HRD", "Pengaturan" dan
  angka-angka KPI — walau Nano Banana Pro biasanya akurat.
- Setelah generate: simpan sebagai `screenshot-dashboard.png` di `web/assets/` (sesuai komentar di
  `index.html` baris 660-661) ATAU simpan dulu di folder `hero-visuals/` dengan nama konvensi
  `Opsi1_MockupDashboard_Anotasi.png`, baru owner/Mas Deni pindahkan+rename saat pasang final.
- Logo asli "ERP Studio"/"Bedah Data" TETAP ditempel manual oleh Mas Deni bila hasil AI kurang mirip
  logo asli — teks wordmark AI cukup untuk placeholder tapi jangan dipakai sebagai logo final kalau
  ada perbedaan bentuk dengan logo asli di `desain & logo branding/02. Logos/`.

---

## OPSI 2 — Before/After: Spreadsheet Berantakan vs Dashboard Rapi

### Konsep singkat

- **Pesan utama:** Dari spreadsheet manual yang berantakan dan bikin pusing, jadi satu dashboard
  rapi yang mudah dipahami — tanpa perlu jadi orang IT.
- **Pain point/pilar:** Kompleksitas ERP konvensional / kerumitan pencatatan manual (pilar ekonomi
  & lokal — "dirancang untuk UMKM Indonesia, sederhana").
- **Mood & tone:** Kontras kuat — sisi kiri terasa "lelah, ribet, warna-warni berantakan", sisi kanan
  "tenang, terang, terkendali". Split-screen membuat pesan langsung terasa.
- **Peran gambar di layout:** Visual pendukung section fitur/pain point (bisa dipasang sebagai
  ilustrasi section terpisah, wide format, dengan ruang kosong di tengah untuk arrow/CTA teks
  tambahan bila perlu ditambah Mas Deni).

### PROMPT UTAMA (Nano Banana Pro) — siap-posting

```
A wide split-screen comparison illustration, aspect ratio 16:9, resolution 1920x1080, divided into
two equal vertical halves by a thin soft vertical gradient line in the center.

LEFT HALF ("BEFORE"): A cluttered, chaotic spreadsheet screen mockup filling the frame. Numerous
thin-bordered cells in a dense grid, inconsistent cell coloring (random yellow, red, orange
highlight blocks scattered without clear pattern), overlapping small text labels that appear busy
and hard to read (blurred/illegible placeholder text is fine, must not attempt readable Indonesian
words here, just visual texture of a messy sheet), several columns with mismatched widths, a few
cells showing small red "#REF!" or triangular warning icons, sticky-note-yellow color cast overall,
slightly desaturated and dim lighting tone suggesting stress and confusion. Small label tag top-left
of this half in a muted red/gray pill badge reading exactly: "Sebelum: Manual & Berantakan" in white
bold sans-serif text.

RIGHT HALF ("AFTER"): A clean, modern dashboard UI mockup filling the frame — generous white space,
one clear KPI summary row with 3 rounded white cards, each showing a short Indonesian business label
above a bold short number/currency value (for example a label like "Omzet Hari Ini" with a value like
"Rp 4.250.000", a label like "Pelanggan Baru" with a value like "128", a label like "Pesanan" with a
value like "56") in dark teal color with small green accent icons — do not render any hex codes,
color codes, or raw numbers without a label; every number must sit directly below its own short
Indonesian label. Below the KPI row, one simple green gradient bar chart widget titled "Grafik
Penjualan" in small dark teal heading text, soft drop shadows, rounded corners, calm and organized
layout with clear visual hierarchy, bright and airy lighting tone suggesting relief and clarity.
Small label tag top-right of this half in a green pill badge reading exactly: "Sesudah: Satu
Dashboard, Rapi" in white bold sans-serif text.

CENTER TRANSITION: a subtle soft arrow icon or chevron shape in dark teal pointing from left to
right, positioned exactly at the vertical midline, small and unobtrusive, sitting on a short
vertical gap of clean white/light gray background that separates both halves — this gap serves as
negative space, leave it clean without extra decoration.

STYLE: Flat modern UI/UX illustration style, high contrast between the two halves in mood and color
temperature (left: dim, warm-cluttered, desaturated; right: bright, clean, green-accented), crisp
sharp rendering, no photographic textures, vector-flat illustration aesthetic mixed with realistic
UI mockup detail on both sides for credibility. Brand colors to use directly (do not write these
codes as visible text anywhere in the image): green accent, dark teal headings, neutral gray body
text, light gray background.

NEGATIVE / AVOID: no readable garbled text on the left side beyond the label badge, no misspelled
Indonesian words, no distorted hands or people, no watermark, no logo, no extra languages besides
Indonesian in the two label badges, no overly gory/dramatic imagery, no dark mode dashboard, no
clutter beyond what's described, no stock-photo corporate look, absolutely no hex color codes or
color-code-like strings (e.g. "0E3D33", "#2ECC58") rendered as on-screen text anywhere in the image,
no orphan numbers without a clear Indonesian label directly above them, no widget titled "Simpet
chart" or any nonsensical/garbled widget names — only use the exact labels specified above.
```

### Terjemahan ringkas (ID)

Ilustrasi split-screen 16:9. Kiri: spreadsheet berantakan, warna-warni tidak konsisten, teks
tumpang tindih, ada ikon peringatan kecil, nuansa kusam — dengan label **"Sebelum: Manual &
Berantakan"**. Kanan: dashboard UI bersih dengan 3 kartu KPI, grafik batang hijau, nuansa terang —
dengan label **"Sesudah: Satu Dashboard, Rapi"**. Ada panah kecil di tengah sebagai transisi.

### Peta zona (ASCII)

```
┌─────────────────────────┬─┬─────────────────────────┐
│ [Sebelum: Manual &      │→│ [Sesudah: Satu Dashboard,│
│  Berantakan]            │ │  Rapi]                   │
│                         │ │                          │
│  spreadsheet berantakan │ │  dashboard bersih + KPI  │
│  warna-warni, ribet     │ │  + grafik hijau          │
└─────────────────────────┴─┴─────────────────────────┘
```

### Catatan generator

- **Nano Banana Pro** — dua label badge pendek (masing-masing ≤5 kata) aman untuk akurasi teks.
- Rasio **16:9** pas untuk section fitur lebar landing page (full-bleed atau dalam card besar).
- Alternatif tanpa teks: hilangkan kedua badge label dari prompt (ganti instruksi jadi "no text in
  image, no watermark, no logo") lalu generate via **Firefly/Imagen** — pakai ini kalau Mas Deni
  ingin menambahkan label dengan animasi GSAP (fade-in) alih-alih teks statis di gambar.

---

## OPSI 3 — Visual "Data di Drive Kamu Sendiri"

### Konsep singkat

- **Pesan utama:** Data bisnis tidak disimpan di server vendor asing — tapi di Google Drive milik
  user sendiri, bisa dibuka/backup/audit kapan saja.
- **Pain point/pilar:** Kekhawatiran kepemilikan data (pilar kepercayaan).
- **Mood & tone:** Tenang, aman, personal — bukan teknikal/rumit. Kesan "ini punyamu, bukan dititipkan".
- **Peran gambar di layout:** Visual pendukung section kepercayaan (bisa square/4:3, fleksibel untuk
  card atau kolom sejajar dengan teks penjelasan).

### PROMPT UTAMA (Nano Banana Pro) — siap-posting

```
A clean flat-illustration style graphic, aspect ratio 4:3, resolution 1600x1200, centered
composition on a soft light background (#F2F2F2 to white subtle gradient).

CENTRAL ELEMENT: A friendly, simplified 3D-flat icon of a Google Drive folder (recognizable
triangular multi-color Drive-style folder shape, but simplified and slightly stylized — not an
exact trademark copy, using brand-neutral soft colors blended with brand green #2ECC58 accents)
sitting open, with 3-4 small flat document/file icons (simple rounded rectangle sheets with subtle
line details suggesting spreadsheet/data rows in green tones) gently floating/emerging out of the
folder opening, arranged in a soft upward diagonal composition suggesting organized data actively
flowing into personal ownership.

SUPPORTING ELEMENT: A subtle, minimal padlock icon in solid dark teal (#0E3D33), small size,
positioned overlapping the bottom-right corner of the folder shape, symbolizing security and
ownership — simple flat geometric lock icon, not skeuomorphic, no shine effects.

TEXT OVERLAY (must render accurately): Below the folder+documents illustration, centered, a short
bold headline in dark teal (#0E3D33) Poppins-style bold sans-serif reading exactly: "Data Bisnismu,
Punyamu Sepenuhnya" as the main line, with a smaller subline directly beneath in neutral gray
(#4D4D4D) medium-weight sans-serif reading exactly: "Tersimpan di Google Drive kamu sendiri, bisa
dibuka & dibackup kapan saja". Leave generous clean negative space around and below this text block
for a logo to be placed later (leave clean space for logo at bottom, roughly bottom 10% of frame,
empty).

STYLE: Modern flat vector-style illustration with soft subtle shadows for depth, warm and
trustworthy mood, generous white space, rounded soft shapes, consistent brand color harmony (greens
#2ECC58/#22A847, dark teal #0E3D33 heading, neutral gray #4D4D4D body text, light background
#F2F2F2), friendly and approachable — not corporate/cold, not overly techy/complex.

NEGATIVE / AVOID: no photographic realism for the folder icon (keep it flat-illustration, not photo),
no distorted or misspelled Indonesian text, no watermark, no actual Google logo/trademark exact
replica, no clutter, no extra random icons, no dark mode, no plastic/glossy 3D render look, no
people, no hands.
```

### Terjemahan ringkas (ID)

Ilustrasi flat 4:3: ikon folder Google Drive bergaya sederhana (bukan replika logo asli) dengan
beberapa lembar dokumen hijau melayang keluar dari folder, disertai ikon gembok kecil navy sebagai
simbol keamanan. Di bawahnya ada headline **"Data Bisnismu, Punyamu Sepenuhnya"** dan subline
**"Tersimpan di Google Drive kamu sendiri, bisa dibuka & dibackup kapan saja"**. Ruang kosong bersih
di bagian bawah untuk logo.

### Peta zona (ASCII)

```
┌───────────────────────────────┐
│                               │
│      [folder Drive + doc      │
│       icons melayang]  🔒     │
│                               │
│   "Data Bisnismu, Punyamu     │
│        Sepenuhnya"            │
│  "Tersimpan di Google Drive   │
│   kamu sendiri, bisa dibuka   │
│      & dibackup kapan saja"   │
│                               │
│      [ruang kosong logo]      │
└───────────────────────────────┘
```

### Catatan generator

- **Nano Banana Pro** — headline+subline pendek, aman untuk akurasi teks & tata letak.
- Rasio **4:3** fleksibel untuk card/section kepercayaan; bisa juga di-crop ke **1:1** kalau
  section landing page pakai grid kotak — beri tahu Mas Deni rasio final yang dipakai.
- **Penting:** ikon folder HARUS terlihat "terinspirasi" Drive tapi bukan replika logo Google
  persis (hindari isu merek dagang) — sudah diinstruksikan di prompt ("brand-neutral colors",
  "not an exact trademark copy").

---

## Dimensi & Penempatan di Landing Page (bukan format sosmed)

| Opsi                | Rasio disarankan                | Piksel disarankan            | Alasan                                                                                                                                                |
| ------------------- | ------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Mockup Dashboard | **16:10** (fallback 16:9) | 1920×1200 (atau 1920×1080) | Mengisi`#product-mockup` dalam `.mockup-tilt-wrap` — mendekati proporsi screenshot browser asli, sesuai komentar baris 660-661 di `index.html` |
| 2. Before/After     | **16:9**                  | 1920×1080                   | Visual section lebar (full-bleed atau card besar), umum untuk ilustrasi split-screen di web                                                           |
| 3. Data di Drive    | **4:3** (alternatif 1:1)  | 1600×1200 (atau 1200×1200) | Fleksibel untuk card kepercayaan/kolom sejajar teks — bukan hero penuh                                                                               |

> Ketiganya BUKAN rasio sosmed standar (4:5/9:16) — disesuaikan kebutuhan web sesuai instruksi
> owner. Setelah generate, cek tampilan responsif di breakpoint mobile (`index.html` sudah py
> class CSS untuk mockup, pastikan gambar tidak terlalu detail sehingga hilang saat di-scale kecil
> di HP).

## Negative Prompt (berlaku untuk ketiga opsi, sudah include di masing-masing)

`no text in image` *(kecuali teks yang memang diminta persis)*, no watermark, no logo asli replika,
no distorted hands/faces/text, no corporate stocky look, no clutter, no plastic/glossy skin or
render, no overly smooth AI look, no misspelled Indonesian words, no dark mode.

## Catatan Alur Kerja untuk Owner

1. Generate ketiga prompt di **Gemini Nano Banana Pro**.
2. Simpan hasil di folder `web/assets/hero-visuals/` dengan nama sesuai tabel di atas.
3. Cek sekilas ejaan teks di gambar (harusnya akurat, tapi tetap verifikasi).
4. Untuk Opsi 1: setelah final, pindahkan/rename ke `web/assets/screenshot-dashboard.png` lalu ganti
   isi `#product-mockup` di `index.html` (baris 660-687) sesuai instruksi komentar yang sudah ada di
   file, ATAU minta **Mas Aldo** yang mengerjakan penggantian HTML-nya.
5. Untuk Opsi 2 & 3: serahkan ke **Mas Aldo** untuk penempatan section + kemungkinan animasi
   GSAP fade-in/parallax ringan (selaras gaya animasi hero yang sudah ada).
6. Logo asli "Bedah Data"/"ERP Studio" tetap ditempel manual oleh **Mas Deni** bila versi AI kurang
   presisi dibanding logo asli di `desain & logo branding/02. Logos/`.
7. Bila nanti sudah ada klien nyata & video demo siap, ketiga visual placeholder ini bisa digantikan
   kembali — tidak perlu dihapus, cukup diarsipkan di folder ini sebagai riwayat.
