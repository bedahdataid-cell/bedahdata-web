// ============================================================================
// KOLEKSI KONTEN — sistem blog / panduan.
//
// Cara kerjanya: setiap file .md di src/content/panduan/ otomatis jadi satu
// halaman artikel. Owner cukup menyalin satu file lama, ganti isinya, selesai.
// Panduan lengkap untuk owner: PANDUAN_TULIS_ARTIKEL.md
//
// Skema di bawah memaksa setiap artikel punya judul, deskripsi, dan tanggal.
// Kalau ada yang lupa diisi, `npm run build` GAGAL dengan pesan jelas —
// ini disengaja, supaya artikel tanpa deskripsi tidak pernah naik ke Google.
// ============================================================================
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const panduan = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/panduan' }),
  schema: z.object({
    /** Judul artikel — juga dipakai sebagai judul di hasil pencarian Google. */
    judul: z.string().max(75, 'Judul sebaiknya di bawah 75 huruf agar tidak terpotong di Google'),

    /** Ringkasan 1-2 kalimat. Inilah teks yang dibaca orang di Google. */
    deskripsi: z
      .string()
      .min(70, 'Deskripsi terlalu pendek — tulis 1-2 kalimat (±70-160 huruf)')
      .max(180, 'Deskripsi terlalu panjang — Google memotongnya di sekitar 160 huruf'),

    /** Tanggal terbit, format: 2026-07-29 */
    tanggal: z.coerce.date(),

    /** Tanggal terakhir diperbarui (opsional). */
    diperbarui: z.coerce.date().optional(),

    /** Pengelompokan artikel. */
    kategori: z
      .enum(['Keuangan Usaha', 'Mengelola Tim', 'Stok & Barang', 'Memilih Sistem'])
      .default('Keuangan Usaha'),

    /** Kata kunci utama yang dikejar artikel ini (untuk catatan internal). */
    kataKunci: z.string().optional(),

    /** Setel true kalau artikel belum siap tayang. */
    draf: z.boolean().default(false),
  }),
});

export const collections = { panduan };
