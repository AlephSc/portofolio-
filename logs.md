# Session logs — Portfolio

## 2026-08-01 — LoadingScreen trisula (curtain split)

- Create `LoadingScreen.tsx`: solid dark panels L/R, trisula draw, glowing crack, panels open outward
- App: entrance = LoadingScreen (z 20000); strike tetap LightningOverlay
- Scroll lock via data-loading + body overflow; Lewati + reduced-motion skip
- LightningOverlay: strike-only (entrance dihapus)

---

## 2026-08-01 — Fix lightning visibility + dual identity + Lua Scripting

- Lightning: stroke tebal, flash/band/crack dramatis (sebelumnya terlalu tipis → “tidak terlihat”)
- Hapus flip-hint `// mode intense · oranye`
- Dual identity: depan Fajar + foto; belakang **Aleph** + monogram **A tanpa garis tengah**
- Lua Programmer → **Lua Scripting** + bio Growtopia / Growlauncher (tanpa AI)
- Typecheck OK

---

## 2026-08-01 — Lightning overlay (trisula + petir ganti warna)

- Create `LightningOverlay.tsx`: entrance (trisula, flash bright) + strike (bolt acak + band + flash soft)
- `App.tsx`: entrance one-shot on mount; strike on every `isIntense` change after entrance
- z-index 10000 (di atas grain); reduced-motion skip visual + still complete
- Delay-based sync: color crossfade 0.7s starts with bolt (not perfect wipe)

---

## 2026-08-01 — Tambah project portfolio ke list

- `projects.ts`: entri **Leptopia — Personal Portfolio** (Production)
- Live: https://leptopia.web.id | GitHub: AlephSc/portofolio-
- Projects section title/subtitle diperhalus (bukan empty-state bombastis)

---

## 2026-08-01 — Fix foto production (rename + push)

- Rename `public/profile.jpg` → `public/fajar-avatar.jpg`
- `avatarUrl: "/fajar-avatar.jpg"` (bypass cache CDN/browser di `/profile.jpg`)
- Commit `3441510` pushed ke `origin/main`
- User: tunggu redeploy Vercel di leptopia.web.id, hard refresh

---

## 2026-08-01 — Konteks deploy user

- Portfolio = **project pertama** user
- Hosting: **Vercel**, domain kustom **leptopia.web.id** (bukan GitHub Pages subpath)
- Implikasi review: `base: '/'` di Vite **benar** untuk Vercel+custom domain; temuan subpath GH Pages tidak relevan

---

## 2026-07-31 — Footer + kontak lengkap

- Footer: GitHub AlephSc (link), WhatsApp 081515135960 (wa.me), IG @alepjir, email alephsc25@gmail.com
- `profile.socials` diperluas (Contact section ikut)
- Build/HMR via dev server

---

## 2026-07-31 — Title + meta → Muhammad Fajar Fristiawan

- `index.html`: title, description, keywords, author, og:* diganti dari Aditya Pratama ke **Muhammad Fajar Fristiawan — Portofolio**

---

## 2026-07-31 — Polish: auto color, timeline fix, edu pipe, server hobby

- Hapus bar "Catatan Emosi Visual" di Timeline
- Auto-alternate teal↔orange tiap 10s (`useScrollIntensity` + full palette intense tokens)
- TimelineCard: `viewport once: true` — fix jitter naik-turun saat scroll
- Hobi Server: teks jujur (software, belajar server, game server cloud/VPS)
- Education: SVG curved pipe + stroke-dash draw-on-view (desktop & mobile)
- Build ✅

---

## 2026-07-31 — Electrical hybrid + konten nyata (implementasi)

### Keputusan user
- Palette: electrical hybrid (teal → orange), grid segi empat + jalur listrik
- Mode intense: **hanya flip foto** (bukan tombol navbar, bukan scroll KRON)
- Konten: sekolah, bahasa, hobi jujur

### Perubahan
1. **Flip-only mode**
   - Navbar: tombol Flame Intense/Focus dihapus
   - `useScrollIntensity`: tanpa scroll listener; `isIntense === manualIntense`
   - Hero flip tetap satu-satunya saklar `data-mode="intense"`

2. **Background electrical**
   - Grid segi empat diperkuat (nirvan-style)
   - Layer `.ambient-bg__circuit` + SVG traces/nodes
   - Mobile: hide circuit/traces; intense: warna oranye

3. **Konten**
   - `education.ts` + `Education.tsx`: MIN 4 → MTsN 2 → SMK Telekomunikasi Darul Ulum
   - `hobbies.ts` + Profile: Elektronika, Server, Pemrograman
   - `skills.ts`: HTML/CSS/C++ (Proficient/Lumayan), Python (Exploring/Sedikit), Lua Advanced
   - TechMarquee & tags: stack jujur (bukan GraphQL/dll fiktif)
   - Nav: link Sekolah (`#education`)

4. **Build**
   - `npm run build` ✅ (tsc + vite), CSS ~12 kB, JS ~118 kB gzip

### File utama
- Edit: App, Navbar, useScrollIntensity, AmbientBackground, Hero, Profile, Skills, TechMarquee, index.css, types, profile, skills
- Create: education.ts, hobbies.ts, Education.tsx

---

## 2026-07-31 — Pemahaman kode + baca sesi ses_04c3

### Kodebase (baseline sebelum upgrade)
- Portfolio SPA React 19 + TS + Vite 8 + Framer Motion + Lucide + vanilla CSS
- Owner: Muhammad Fajar Fristiawan (AlephSc), Jombang
- Request backlog ses_04c3 (sekolah/bahasa/hobi/hapus tombol) — **sudah dikerjakan di sesi ini**
