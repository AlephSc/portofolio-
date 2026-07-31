# Session logs — Portfolio

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
