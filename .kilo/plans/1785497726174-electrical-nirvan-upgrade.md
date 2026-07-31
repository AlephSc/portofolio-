# Plan: Electrical Hybrid UI + Konten Nyata

## Goal
Membuat portofolio lebih dekat ke visual nirvan.my.id (grid segi empat, flip-foto = mode), sambil menambahkan identitas **electrical/hardware**, roadmap pendidikan, bahasa, dan hobi — tanpa tombol Intense/Focus di navbar.

## Keputusan (disetujui user)
| Topik | Keputusan |
|---|---|
| Palette + mood | **Electrical hybrid**: teal → orange intense; background grid segi empat + overlay jalur listrik/PCB |
| Mode Intense | **Hanya flip foto** (hapus tombol Flame; hapus auto-intense dari scroll KRON) |
| Konten | Pendidikan + bahasa + hobi sesuai data user; jujur, tidak fabrikasi |

## Out of scope
- Ganti foto `/public/profile.jpg` (user ganti sendiri)
- Isi projects (tetap empty-state)
- Migrasi ke Tailwind / rebuild total seperti nirvan
- Auto-flip periodik 7s (opsional nanti)

## State sekarang (relevan)
- Flip Hero sudah ada; `manualIntense` di-wire ke Hero + `data-mode`
- Navbar masih menampilkan tombol Flame Intense/Focus
- `useScrollIntensity` masih set intense dari scroll `[data-intense-trigger]`
- Grid ambient sudah ada (72px teal) tapi lemah; belum “electrical line”
- Skills: Lua / Debugging / AI Prompt — belum HTML/CSS/C++/Python
- Profile tags masih placeholder generik (Full-Stack, TypeScript, dll.)
- Marquee masih tech stack fiktif (React 18, GraphQL, …)
- Tidak ada section pendidikan

---

## Task list (urutan eksekusi)

### 1. Hapus tombol Intense/Focus — flip-only
**Files:** `Navbar.tsx`, `App.tsx`, `useScrollIntensity.ts`, `TimelineCard.tsx` (opsional), `types/index.ts` (komentar)

1. **Navbar**
   - Hapus prop `isIntense`, `onToggleManualIntense`
   - Hapus tombol Flame + CSS `.intensity-toggle-*`
   - Sisakan brand, nav links, theme toggle, mobile menu

2. **App.tsx**
   - Navbar hanya `theme` + `onToggleTheme`
   - Hero tetap `isFlipped={manualIntense}` + `onFlip={toggleManualIntense}`
   - AmbientBackground tetap `isIntense={isIntense}` (dari flip saja)

3. **useScrollIntensity** → rename mental: flip-only
   - Hapus listener scroll + `scrollIntense`
   - `isIntense === manualIntense`
   - Tetap set/remove `html[data-mode="intense"]` saat flip
   - Export: `{ isIntense, manualIntense, toggleManualIntense }` (atau sederhanakan ke `{ isIntense, toggleIntense }` — pilih minimal breaking)

4. **Timeline**
   - Biarkan `isIntenseMoment` untuk visual card (border/node flame) **tanpa** memicu global mode
   - Hapus/update komentar di types yang bilang “triggers intense orange when scrolled”

### 2. Background electrical + grid segi empat (nirvan-style)
**Files:** `AmbientBackground.tsx`, `styles/index.css`

1. Perkuat `.ambient-bg__grid` ala nirvan:
   - Dual linear-gradient 1px horizontal + vertical
   - `background-size: 72px 72px` (atau 60–72)
   - Opacity ~0.18–0.22 dark; lower di light
   - Radial mask fade ke tepi
   - Intense: warna garis oranye soft

2. Tambah layer **electrical lines** (CSS-only, light):
   - Elemen baru di `AmbientBackground`, mis. `.ambient-bg__circuit`
   - Pola subtle: horizontal traces + vertical stubs + small “via/node” dots (bisa multi-layer `linear-gradient` / pseudo, atau 1–2 SVG absolute `pointer-events: none`)
   - Opacity rendah; intensitas naik sedikit di `data-mode=intense`
   - Mobile: sembunyikan circuit detail jika berat (mirip nirvan hide grid di ≤768)

3. Jangan ganti orbs/vignette/grain secara radikal — refine warna agar selaras teal/copper.

### 3. Data: pendidikan, bahasa, hobi
**Files:** `types/index.ts`, `data/*` baru/edit, komponen section

#### 3a. Types
```ts
// EducationItem
{ id, stage: 'SD'|'SMP'|'SMK', school, location?, note? }

// Level bahasa user: map ke Skill level
// Lumayan → Proficient | Sedikit → Exploring
// (tetap pakai Advanced|Proficient|Exploring di UI)

// Hobbies di ProfileData atau data/hobbies.ts
{ id, name, description }[]  // Elektronika, Server, Pemrograman
```

#### 3b. Data files
| File | Isi |
|---|---|
| `data/education.ts` (baru) | MIN 4 Jombang (SD), MTsN 2 Jombang (SMP), SMK Telekomunikasi Darul Ulum (SMK) |
| `data/skills.ts` | Tambah kategori **Bahasa & Markup**: HTML Proficient, CSS Proficient, C++ Proficient, Python Exploring; pertahankan Lua/Debug/AI |
| `data/profile.ts` | Perbarui `fullBio` / tags agar sebut hobi Elektronika, Server, Pemrograman; buang tag generik palsu |
| `data/hobbies.ts` (baru, opsional) | 3 hobi dengan deskripsi singkat jujur |

#### 3c. UI sections
1. **Education roadmap** — komponen baru `Education.tsx` (atau block di Profile)
   - Horizontal/vertical roadmap cards: SD → SMP → SMK
   - Visual “pipe/trace” ringan (selaras electrical, bukan copy 1:1 nirvan)
   - `id="education"`; tambah nav link di Navbar
   - Sisipkan di `App.tsx` setelah Profile (sebelum Timeline) — direkomendasikan

2. **Hobi** — di Profile:
   - Ganti/kurangi `corePrinciples` generik **atau** tambah baris hobby cards (icon: CircuitBoard / Server / Code)
   - Tags: Elektronika, Server, Pemrograman, Lua, dll. (bukan Full-Stack fiktif)

3. **Skills** — otomatis ikut `skillsData` (pastikan level badge support `Exploring` styling)

4. **TechMarquee** — ganti item fiktif dengan yang jujur:
   - Line1: HTML, CSS, C++, Python, Lua, Debugging, …
   - Line2: Elektronika, Server, Robotika, AI Prompt, JHIC, KRON, …

### 4. Polish Hero flip (nirvan-like, tanpa button mode)
- Hint tetap `// klik untuk flip` / intense state
- Pastikan flip = satu-satunya kontrol mode (setelah task 1)
- Opsional: back-face copy lebih electrical (“hardware · systems · determination”) — minor copy only

### 5. Nav + a11y + reduced motion
- Nav: tambah `Pendidikan` / `education`
- Flip: tetap keyboard Enter/Space
- Circuit/grid: hormati `prefers-reduced-motion` (no extra motion; static lines OK)
- Touch targets navbar tetap ≥44px

### 6. Dokumentasi sesi
- Update `logs.md` ringkas setelah implementasi
- Jangan rewrite besar `DOKUMENTASI.md` kecuali diminta

### 7. Validasi
- `npm run lint` (oxlint)
- `npm run build` (tsc + vite) — **hanya jika user/izin; rules project bilang jangan build C++ — ini project web, build JS OK**
- Manual checklist:
  - [ ] Tidak ada tombol Intense/Focus di navbar
  - [ ] Flip foto → `data-mode=intense` + warna global; flip lagi → normal
  - [ ] Scroll KRON **tidak** flip mode global
  - [ ] Grid segi empat terlihat di dark
  - [ ] Electrical lines subtle, tidak berisik
  - [ ] Education: 3 sekolah benar
  - [ ] Skills: HTML/CSS/C++/Python level benar
  - [ ] Hobi: Elektronika, Server, Pemrograman
  - [ ] Marquee/tags tidak klaim stack palsu
  - [ ] Mobile: no overflow, circuit tidak merusak perf

---

## Data flow mode (setelah change)
```
User klik foto Hero
  → toggleManualIntense()
  → manualIntense true/false
  → isIntense = manualIntense
  → html[data-mode="intense"] set/remove
  → CSS @property transition accent + bg + grid + circuit
```

## Failure modes
| Risiko | Mitigasi |
|---|---|
| Circuit CSS terlalu ramai | Opacity rendah; hide di mobile |
| Exploring badge style hilang | Pastikan CSS `.level-exploring` / fallback di Skills |
| Nav overcrowded mobile | Label pendek “Sekolah”; drawer sudah ada |
| `isIntenseMoment` membingungkan | Hanya visual card; jangan wire ke data-mode |
| Light mode grid hampir invisible | Opacity light-specific terpisah |

## File touch map
| Action | Path |
|---|---|
| Edit | `src/App.tsx` |
| Edit | `src/hooks/useScrollIntensity.ts` |
| Edit | `src/components/Navbar.tsx` |
| Edit | `src/components/AmbientBackground.tsx` |
| Edit | `src/components/Hero.tsx` (minor copy if needed) |
| Edit | `src/components/Profile.tsx` |
| Edit | `src/components/Skills.tsx` (Exploring style if missing) |
| Edit | `src/components/TechMarquee.tsx` |
| Edit | `src/styles/index.css` |
| Edit | `src/types/index.ts` |
| Edit | `src/data/profile.ts`, `skills.ts` |
| Create | `src/data/education.ts` |
| Create | `src/components/Education.tsx` |
| Optional | `src/data/hobbies.ts` |
| Edit | `logs.md` (session log) |

## Urutan implementasi disarankan
1. Flip-only mode (task 1) — unblock UX request
2. Background grid + electrical (task 2)
3. Types + data (task 3a–b)
4. Education + Profile hobbies + Skills + Marquee (task 3c)
5. Nav link + polish (task 4–5)
6. Lint/build + logs (task 6–7)
