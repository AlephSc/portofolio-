<div align="center">

# Muhammad Fajar Fristiawan
### Software Engineer

Portfolio pribadi yang dibangun sebagai sebuah *visual narrative* — bukan sekadar daftar CV statis, melainkan perjalanan yang mengalir saat di-scroll.

</div>

<br>

> Saat pengunjung menyusuri timeline, warna aksen situs perlahan bergeser dari **teal tenang** menuju **oranye intens** sebagai lambang determinasi pada momen puncak kompetisi.

<br>

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0066?logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22C55E)

</div>

---

## Tentang

Website portofolio ini menampilkan profil, rekam jejak kompetisi, keahlian, serta jalur kontak — semuanya terhubung dalam satu alur cerita visual yang responsif dan ringan. Dibangun tanpa UI framework eksternal, mengandalkan CSS Custom Properties murni untuk sistem theming dan transisi emosi.

### Sorotan

- **Emotion-Driven Color System** — aksen berinterpolasi real-time (teal → oranye) dipicu scroll di momen `isIntenseMoment`.
- **Dark / Light Mode** — default gelap, menghormati `prefers-color-scheme`, preferensi tersimpan di `localStorage`.
- **Scroll Storytelling** — timeline dengan SVG pipe line beranimasi & reveal berurutan via Framer Motion `whileInView`.
- **Accessibility-First** — `MotionConfig reducedMotion="user"`, target sentuh 44px, kontras terjaga.
- **Performa** — bundle JS ~115 KB gzip, animasi GPU-friendly (`transform`/`opacity`), `prefers-reduced-motion` dihormati.
- **Data-Driven** — seluruh konten terpisah dari UI; tinggal edit file di `src/data/*`.

---

## Pencapaian

| Tahun | Kompetisi | Hasil |
|:---:|---|:---:|
| 2025 | JHIC 1.0 | Top 30 |
| 2025 | Kompetisi Robotika Nusantara (KRON) | Medali Perak |

---

## Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | React 19, TypeScript, Vite |
| Animasi | Framer Motion |
| Styling | Vanilla CSS + CSS Custom Properties |
| Icons | Lucide React |
| Build | Vite, Oxlint |

---

## Struktur Proyek

```
src/
├── components/      # UI modular (Hero, Timeline, Projects, Skills, dll)
├── data/            # Konten terpisah dari UI
│   ├── profile.ts
│   ├── experiences.ts
│   ├── projects.ts
│   └── skills.ts
├── hooks/           # useTheme, useScrollIntensity
├── styles/          # Design system (CSS variables, theming)
└── types/           # Interface TypeScript
```

> Semua konten portofolio diatur via file di `src/data/`. Tambahkan pengalaman/proyek baru tanpa menyentuh struktur komponen.

---

## Menjalankan

```bash
# Install dependencies
npm install

# Development server  →  http://localhost:5173
npm run dev

# Production build
npm run build

# Preview hasil build
npm run preview

# Lint
npm run lint
```

---

## Kustomisasi

Untuk memperbarui konten, cukup edit file data bersangkutan:

| Ingin mengubah | Edit file |
|---|---|
| Nama, bio, statistik, kontak | `src/data/profile.ts` |
| Timeline & kompetisi | `src/data/experiences.ts` |
| Daftar proyek | `src/data/projects.ts` |
| Keahlian | `src/data/skills.ts` |
| Foto profil | ganti `public/fajar-avatar.jpg` |

---

## Konfigurasi yang Direkomendasikan

Editor yang disarankan menggunakan [VS Code](https://code.visualstudio.com/). Tidak ada setup khusus selain ekstensi standar TypeScript/ESLint.

---

<div align="center">

**© 2025 Muhammad Fajar Fristiawan** — Dirancang & dikembangkan secara personal tanpa template AI.

[GitHub](https://github.com/AlephSc) · [Email](mailto:alephsc25@gmail.com)

</div>
