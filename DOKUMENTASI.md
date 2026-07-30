# Dokumentasi Pekerjaan — Portfolio Website

**Tanggal:** 2026-07-30  
**Lokasi Proyek:** `/root/Portofolio/`  
**Status Build:** ✅ Berhasil (exit code 0)

---

## 1. Ringkasan Proyek

Membangun website **portofolio pribadi modern** dari nol menggunakan:

- **React 18 + TypeScript** (via Vite)
- **Framer Motion** — animasi scroll-driven
- **Lucide React** — icon library
- **Vanilla CSS** dengan CSS Custom Properties (tanpa Tailwind)
- **Desain referensi:** https://www.nirvan.my.id/

### Filosofi Desain

- Dark mode sebagai default, light mode sebagai alternatif
- Sistem warna emosi: **Normal (Teal #0D9488)** → **Intense (Orange #FF5500)** saat scroll melewati momen kritis di timeline
- Editorial & personal — bukan template AI generik
- Animasi bermakna: floating orbs, cyber grid, noise grain, typing effect, RGB glitch hover foto

---

## 2. Struktur File Lengkap

```
/root/Portofolio/
├── index.html                     ← SEO meta tags, Google Fonts preconnect
├── public/
│   ├── profile.jpg                ← Foto profil (AI-generated editorial portrait)
│   └── favicon.svg                ← Custom SVG favicon
├── package.json                   ← Dependencies: react, framer-motion, lucide-react
└── src/
    ├── main.tsx                   ← Entry point, import styles/index.css
    ├── App.tsx                    ← Root assembly semua section + hooks
    ├── types/
    │   └── index.ts               ← Interface TypeScript
    ├── data/
    │   ├── profile.ts             ← Data bio, statistik, social links
    │   ├── experiences.ts         ← 5 item timeline (2022–2026)
    │   ├── projects.ts            ← 4 proyek
    │   └── skills.ts              ← 4 kategori keahlian
    ├── hooks/
    │   ├── useTheme.ts            ← Dark/Light toggle + localStorage
    │   └── useScrollIntensity.ts  ← Interpolasi warna Teal→Orange via scroll
    ├── styles/
    │   └── index.css              ← Design system lengkap (281 → 490 baris)
    └── components/
        ├── AmbientBackground.tsx  ← Floating orbs + cyber grid + grain overlay
        ├── Navbar.tsx             ← Fixed navbar + mobile menu + tema toggle
        ├── Hero.tsx               ← Typing animation + RGB glitch photo hover
        ├── TechMarquee.tsx        ← Infinite dual-row ticker
        ├── Profile.tsx            ← Bio + philosophy cards
        ├── Timeline.tsx           ← SVG pipe line animation on scroll
        ├── TimelineCard.tsx       ← Framer Motion whileInView cards
        ├── Projects.tsx           ← Filter kategori + architecture spec
        ├── Skills.tsx             ← Tab sidebar + level meter
        ├── Contact.tsx            ← Copy email + social links
        ├── Footer.tsx             ← Minimalist footer
        └── Icons.tsx              ← Custom SVG GithubIcon, LinkedinIcon
```

---

## 3. Detail Setiap File

### `src/types/index.ts`
Interface TypeScript:
- `Theme` — 'dark' | 'light'
- `ProfileData` — nama, bio, stats, socials
- `TimelineItem` — data timeline + `isIntenseMoment` flag
- `ProjectItem` — data proyek + architecture spec
- `SkillCategory` — kategori skill dengan level Advanced / Proficient / Exploring

---

### `src/data/profile.ts`
```
Nama: Aditya Pratama
Role: Full-Stack Engineer & Systems Craftsman
Lokasi: Jakarta, Indonesia
Email: aditya.pratama.dev@example.com
GitHub: adityapratama
LinkedIn: aditya-pratama
Stats: 4+ Tahun, 18+ Proyek, <50ms Latency, 100% Dedikasi
```

---

### `src/data/experiences.ts`
5 item timeline dengan `isIntenseMoment` flag:

| Tahun | Judul | Kategori | isIntenseMoment |
|---|---|---|---|
| 2022 | Pondasi & Eksplorasi Komputasi | Foundation | false |
| 2023 | Transisi ke React & Backend Architecture | Breakthrough | false |
| 2024 | Ujian Performa: Re-Engineering Under Pressure | High Stakes | **true** |
| 2025 | Kompetisi Nasional & Real-Time Distributed Systems | Architecture | **true** |
| 2026 | Modern Web Engineering & Precision UI | Current Focus | false |

Flag `isIntenseMoment: true` memicu transisi warna orange di seluruh accent color situs.

---

### `src/data/projects.ts`
4 proyek dengan arsitektur detail:

| Nama | Kategori | Status |
|---|---|---|
| Nexus Data Stream Engine | Backend / Systems | Production |
| Aura Editorial Design System | Frontend / Architecture | Completed |
| Pulse Flow API Gateway | Security / Infrastructure | Production |
| Chrono Sync CLI Tool | Developer Tooling | Completed |

---

### `src/data/skills.ts`
4 kategori skill:
- **Frontend & UI Architecture** — React, TypeScript, CSS, DOM APIs
- **Backend & Systems Engineering** — Node.js, PostgreSQL, Redis, WebSockets
- **Infrastructure & Tooling** — Docker, Git, Vite, Linux
- **Prinsip & Metodologi Kerja** — Clean Architecture, Performance Budgeting, A11y

---

### `src/hooks/useTheme.ts`
- Membaca dari `localStorage` (key: `portfolio-theme`)
- Fallback ke `prefers-color-scheme` sistem jika belum pernah diset
- Default: dark mode
- Menulis atribut `data-theme` pada `<html>` untuk CSS variable switching

---

### `src/hooks/useScrollIntensity.ts`
- Mendeteksi elemen `[data-intense-trigger="true"]` di DOM
- Menghitung proximity elemen ke tengah viewport via `getBoundingClientRect()`
- Menginterpolasi warna RGB secara real-time:
  - Normal: rgb(13, 148, 136) — Teal
  - Intense: rgb(255, 85, 0) — Orange
- Update CSS variables: `--color-accent-rgb`, `--color-accent`, `--color-accent-glow`
- `toggleManualIntense()` tersedia untuk trigger manual via tombol Flame di navbar

---

### `src/styles/index.css`
Design system lengkap (490+ baris):

**CSS Variables (:root):**
- `--intensity-ratio` — nilai 0.0–1.0 dari scroll
- `--color-accent-rgb` — RGB yang diinterpolasi dinamis oleh JS
- Font: Outfit (heading), Plus Jakarta Sans (body), JetBrains Mono (mono)

**Dark Mode [data-theme="dark"]:**
- BG: #0A0D12 / #121721 / #1A202C / #111622
- Text: #F1F5F9 / #94A3B8 / #64748B

**Light Mode [data-theme="light"]:**
- BG: #FAFAFA / #F1F5F9 / #E2E8F0 / #FFFFFF
- Text: #0F172A / #475569 / #64748B

**Komponen global yang tersedia:**
- `.container`, `.section`, `.section-header`, `.section-label`, `.section-title`
- `.btn`, `.btn-primary`, `.btn-secondary`
- `.tag`, `.tag-accent`
- `.glass-card` — glassmorphism, backdrop-filter: blur(12px)
- `.hero-mask-pulse` — animasi pulse ring pada status pill
- `.reveal-element` / `.revealed` — scroll entrance utility
- `.ambient-bg`, `__base`, `__grid`, `__glow--a/b/c`, `__vignette` — background system
- `.grain-overlay` — fixed noise texture overlay
- `@keyframes ambient-drift-a/b/c` — slow floating orbs (28–34 detik siklus)
- `@media (prefers-reduced-motion: reduce)` — disable semua animasi

---

### `src/components/AmbientBackground.tsx`
- Fixed full-screen background layer (z-index: 0)
- Elemen: grain overlay, gradient base, dot grid, 3 floating glow orbs, vignette
- Prop `isIntense: boolean` — tambahkan class `ambient-intense` yang shift warna orbs ke orange

---

### `src/components/Navbar.tsx`
- Fixed positioned, background blur aktif saat scrollY > 40 (class `navbar-scrolled`)
- Active section detection via scroll listener + `offsetTop` comparison
- Desktop: horizontal links; Mobile (≤ 868px): hamburger → drawer
- Tombol Flame: toggle manual intense state + tampilkan persentase
- Tombol Sun/Moon: toggle dark/light theme

---

### `src/components/Hero.tsx`
- **Typing animation** dengan 4 role bergilir (typewriter effect, delete + retype)
- **Cyber RGB Glitch** pada foto saat hover — efek CRT monitor merah/cyan
- **Framer Motion** entrance: opacity 0→1, y 30→0 dengan ease spring
- Status pill dengan pulse animation
- 3 statistik di bawah CTA buttons

---

### `src/components/TechMarquee.tsx`
- 2 baris ticker, arah berlawanan (LTR 38s, RTL 44s)
- Hover pause otomatis via CSS `animation-play-state: paused`
- Fade gradient di tepi kiri dan kanan
- Konten: tech stack row 1 (15 item) + prinsip engineering row 2 (11 item)

---

### `src/components/Timeline.tsx`
- SVG animated pipe line: `strokeDashoffset` berubah berdasarkan scroll progress
- Progress dihitung dari posisi section #journey relatif terhadap viewport
- Desktop: card bergantian kiri-kanan dari garis tengah
- Mobile: semua card di kanan dari garis di posisi 20px dari kiri
- Node orange beranimasi `pulse-node` untuk `isIntenseMoment`

---

### `src/components/TimelineCard.tsx`
- Framer Motion `motion.div` dengan `whileInView`
- Animasi: `opacity: 0 → 1`, `y: 40 → 0`, duration 0.6s, ease spring
- `once: false` — animasi berulang jika user scroll naik-turun
- Class `glass-card` untuk glassmorphism effect
- `isIntenseMoment` → border-left #FF5500 + node animasi pulse merah

---

### `src/components/Projects.tsx`
- Filter button per 5 kategori
- Card: year badge, status dot (Production=hijau/Completed=amber), architecture spec box, highlight list, tech tags, GitHub/Live links

---

### `src/components/Skills.tsx`
- Sidebar: 4 tab kategori dengan panah aktif
- Konten: grid skill cards, level badge (Advanced/Proficient), progress bar 4px

---

### `src/components/Contact.tsx`
- Copy email ke clipboard dengan feedback transisi ikon (Copy → Check)
- Timeout 2.5 detik reset ke ikon Copy
- Social links: GitHub, LinkedIn, Email dengan slide hover effect

---

## 4. Dependensi NPM

```json
{
  "dependencies": {
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "framer-motion": "latest",
    "lucide-react": "^1.27.0"
  },
  "devDependencies": {
    "typescript": "~6.0.2",
    "vite": "^8.1.1",
    "@vitejs/plugin-react": "^6.0.3",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3"
  }
}
```

---

## 5. Build Output Final

```
dist/index.html                   1.53 kB │ gzip:  0.73 kB
dist/assets/index-B8ktuTAP.css    8.93 kB │ gzip:  2.78 kB
dist/assets/index-Z6ZKKru0.js   393.82 kB │ gzip: 118.77 kB

✓ built in 4.45s — exit code 0, zero TypeScript errors
```

---

## 6. Yang Belum Dikerjakan

| No | Fitur | Prioritas |
|---|---|---|
| 1 | Framer Motion whileInView pada section Profile, Projects, Skills, Contact | Tinggi |
| 2 | Fix `--bg-primary-rgb` undefined di Navbar blur (hardcode rgba sementara) | Sedang |
| 3 | `useReducedMotion()` Framer Motion untuk accessibility | Sedang |
| 4 | **Ganti semua data placeholder** dengan data nyata pemilik | Sangat Tinggi |
| 5 | **Ganti `/public/profile.jpg`** dengan foto nyata pemilik | Sangat Tinggi |
| 6 | **Ganti URL** GitHub/LinkedIn/email dengan yang asli | Sangat Tinggi |
| 7 | Light mode ambient background (orbs saat ini masih berwarna teal gelap) | Rendah |

---

## 7. Cara Menjalankan

```bash
cd /root/Portofolio

# Development
npm run dev
# → http://localhost:5173

# Production build
npm run build

# Preview production
npm run preview
```
