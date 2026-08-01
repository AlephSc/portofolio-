# Plan: Loading Screen Trisula (Belah + Buka Panel)

## Goal
Ganti animasi entrance overlay yang sering “tidak terlihat” dengan **loading screen full-screen** yang:
1. Menampilkan **trisula** membelah dari **atas ke bawah**
2. **Garis belah** yang dilalui trisula **memancarkan cahaya**
3. Setelah belah, **panel kiri slide ke kiri** dan **panel kanan slide ke kanan** (terbelah)
4. Di balik panel: konten site sudah siap (atau siap di-reveal)

## Keputusan (disepakati)
| Topik | Keputusan |
|---|---|
| Isi panel | **Solid gelap** (bg gelap solid, bukan konten site di balik semi-transparan) |
| Scope | **Ganti entrance saja**; **strike ganti warna tetap** (bolt + band + flash di `LightningOverlay`) |
| Skip | **Auto-skip** jika `prefers-reduced-motion`; **tombol “Lewati”** untuk semua user |
| Timing | Trisula draw ~0.7–0.9s → glow crack peak → panels open ~0.6–0.8s → unmount |

## Out of scope
- Mengubah sistem warna biru↔oranye / interval 10s
- Mengubah strike ganti warna menjadi belah panel (tetap bolt overlay)
- Wipe warna spasial sejati
- Redesain Hero / dual identity (sudah ada)

## State sekarang (relevan)
- `App.tsx`: `showEntrance` + `LightningOverlay variant="entrance"`; `entranceDone` gate strike
- `LightningOverlay.tsx`: entrance + strike dalam satu komponen; entrance sering gagal “terasa” karena overlay di atas konten hidup + reduced-motion hide
- `MotionConfig reducedMotion="user"` di App
- Site: React SPA, Vite, Vercel, leptopia.web.id
- Z-index: grain 9999, lightning 10000, navbar 1000

---

## Design (sequence)

```
[0ms]     LoadingScreen mount
          - body scroll lock (overflow: hidden)
          - dua panel solid gelap: .ls-panel-left | .ls-panel-right
          - trisula SVG di tengah (z di atas panel)
          - garis crack tengah (belum full height)

[0–800ms] Trisula draw top→bottom (stroke-dash)
          Crack line grow height 0→100% + glow trail
          Optional: soft flash di axis tengah

[800ms]   Crack peak glow singkat

[800–1500ms] Panel open:
          left:  translateX(0 → -100%)
          right: translateX(0 → +100%)
          ease cubic-bezier cinematic
          Site di belakang sudah visible (selalu di DOM)

[1500ms]  onComplete → unmount LoadingScreen
          unlock scroll
          setEntranceDone(true)  // strike boleh fire
```

**Skip / reduced-motion:**
- `prefers-reduced-motion: reduce` → onComplete segera (0–100ms), tanpa animasi
- Tombol “Lewati” pojok → onComplete segera

---

## Task list

### 1. Komponen `LoadingScreen.tsx` (baru)
**Create:** `src/components/LoadingScreen.tsx`

Props:
```ts
{ onComplete: () => void }
```

Struktur DOM:
```html
<div class="loading-screen" aria-busy="true" aria-label="Memuat">
  <div class="ls-panel ls-panel-left" />
  <div class="ls-panel ls-panel-right" />
  <div class="ls-axis">
    <div class="ls-crack" />          <!-- glowing split line -->
    <svg class="ls-trisula">...</svg> <!-- 3-branch bolt -->
  </div>
  <button type="button" class="ls-skip">Lewati</button>
</div>
```

- `position: fixed; inset: 0; z-index: 20000` (di atas grain + navbar)
- `pointer-events: auto` pada skip; panels `pointer-events: none` setelah open start (atau seluruh screen block sampai selesai)
- Panel: `background: var(--bg-primary)` atau `#0A0D12` solid (dark default loading — independent of theme flash)
- Trisula: reuse path logic dari LightningOverlay (3 cabang) ATAU extract shared helper — prefer **copy simplified paths** di LoadingScreen dulu (hindari over-abstract)
- Crack: `width: 2–4px; left: 50%; transform: translateX(-50%); box-shadow: 0 0 20px accent blue`
- Animasi: CSS `@keyframes` (transform/opacity/stroke-dashoffset only)
- Lifecycle: `onComplete` via timeout total **atau** `animationend` panel terakhir + guard `doneRef`
- Skip button + reduced-motion: call `onComplete` once (idempotent)

### 2. Wire di `App.tsx`
**Edit:** `src/App.tsx`

- Ganti:
  ```tsx
  {showEntrance && <LightningOverlay variant="entrance" ... />}
  ```
  menjadi:
  ```tsx
  {showEntrance && <LoadingScreen onComplete={handleEntranceComplete} />}
  ```
- **Pertahankan** strike `LightningOverlay` (variant strike) setelah `entranceDone`
- `handleEntranceComplete` sama: `setShowEntrance(false); setEntranceDone(true)`
- Opsional: class `html` / `body` `data-loading="true"` untuk scroll lock dari CSS:
  ```css
  html[data-loading="true"], body[data-loading="true"] { overflow: hidden; }
  ```
  Set/remove di effect saat `showEntrance` true/false

### 3. CSS
**Prefer:** styles di dalam `LoadingScreen.tsx` inline `<style>` (konvensi project)  
**Atau** block di `styles/index.css` jika ingin global tokens.

Keyframes:
- `ls-trisula-draw` — stroke-dashoffset 1 → 0
- `ls-crack-grow` — height 0 → 100% + opacity glow
- `ls-panel-open-left` — translateX(0 → -105%)
- `ls-panel-open-right` — translateX(0 → 105%)
- Optional stagger: crack finishes slightly before panels open (animation-delay on panels ~0.75s)

Warna intro: **biru** (mode focus default), bukan oranye.

### 4. Bersihkan entrance di LightningOverlay (opsional tapi disarankan)
**Edit:** `src/components/LightningOverlay.tsx`

- Hapus / dead-code path `variant === 'entrance'` **atau** biarkan unused sementara
- Prefer: sederhanakan props ke `variant?: never` hanya strike — **atau** keep `variant` union tapi App hanya pass strike
- Minimal: App tidak lagi mount entrance; dead code entrance boleh dihapus di pass yang sama agar tidak membingungkan

### 5. A11y & edge cases
| Case | Behavior |
|---|---|
| Reduced motion | Skip animasi, onComplete cepat |
| Klik Lewati mid-anim | onComplete sekali, unmount |
| StrictMode double effect | `doneRef` guard |
| Double skip | noop after first complete |
| Focus trap | Skip button focusable; setelah unmount focus ke main/body (opsional `document.getElementById('home')?.focus()` tidak wajib) |
| Mobile | Full viewport panels; skip tombol min 44px touch |
| Theme light | Loading tetap dark solid (cinematic) — OK |

### 6. Validasi
- [ ] Load page: loading screen full gelap, trisula turun, crack glow, panel belah kiri/kanan
- [ ] Setelah selesai: site full, scroll unlock, tidak ada panel tersisa
- [ ] Lewati: langsung site
- [ ] Reduced-motion: langsung site
- [ ] Setelah intro: flip foto / 10s tetap trigger **strike** petir
- [ ] Tidak double-fire intro di StrictMode
- [ ] `npx tsc -b` + `npx oxlint src` clean
- [ ] Mobile: panel open smooth, no horizontal overflow residual

---

## Data flow
```
Mount App (showEntrance=true)
  → LoadingScreen
  → (optional) document.documentElement.dataset.loading = 'true'
  → trisula + crack → panels open
  → onComplete / Lewati / reduced-motion
  → showEntrance=false, entranceDone=true, clear data-loading
  → strike gate open

isIntense change (setelah entranceDone)
  → LightningOverlay strike (unchanged)
```

## Failure modes
| Risiko | Mitigasi |
|---|---|
| Intro “tidak muncul” lagi | Full-screen solid panels z-index 20000; tidak bergantung konten di bawah |
| Scroll bounce saat loading | overflow hidden on html/body |
| Panel open sisa gap | translateX ±105% + slight overshoot |
| Strike fire selama loading | entranceDone false sampai complete |
| Flash epilepsi | crack glow moderate; reduced-motion skip |
| FOUC konten di belakang panel | panels opaque solid; site may paint behind (OK) |

## File touch map
| Action | Path |
|---|---|
| Create | `src/components/LoadingScreen.tsx` |
| Edit | `src/App.tsx` |
| Edit (opsional) | `src/components/LightningOverlay.tsx` (hapus entrance) |
| Edit (opsional) | `src/styles/index.css` (data-loading scroll lock) |
| Edit | `logs.md` (setelah implementasi) |

## Urutan implementasi
1. `LoadingScreen.tsx` — panels + trisula + crack + open + skip + reduced-motion
2. Wire `App.tsx` — ganti entrance overlay; scroll lock
3. Pastikan strike tetap jalan setelah `entranceDone`
4. Bersihkan entrance dead code di LightningOverlay
5. Typecheck + lint + checklist manual (desktop + mobile width)

## Catatan untuk implementer
- **Jangan** reuse entrance LightningOverlay apa adanya — loading screen adalah komponen **berbeda** (curtain split).
- Strike tetap di `LightningOverlay` (atau rename nanti).
- Solid dark panels = opacity 1, full height/width half viewport each (`width: 50%`, left 0 / right 0).
- Trisula di layer di atas seam (z-index di dalam loading screen > panels).
- Tombol Lewati: `position: fixed; bottom/right; z-index di atas panels`.
