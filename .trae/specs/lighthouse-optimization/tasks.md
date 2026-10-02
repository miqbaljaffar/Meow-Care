# Puskesmas-Kucing Lighthouse Optimization - Implementation Plan

## Task 1: Perbaiki konfigurasi Customer Layout (Hapus force-dynamic / force-no-store)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Hapus `export const dynamic = 'force-dynamic'` dan `export const fetchCache = 'force-no-store'` dari `src/app/(customer)/layout.tsx`
  - Hanya tambahkan `dynamic = 'force-dynamic'` di page-level untuk halaman yang memang butuh data realtime user-specific bila diperlukan
- **Acceptance Criteria Addressed**: AC-4, AC-9, AC-10
- **Test Requirements**:
  - `rule` TR-1.1: Grep file customer layout, TIDAK menemukan string `export const dynamic = 'force-dynamic'` atau `export const fetchCache = 'force-no-store'`
  - `rubric` TR-1.2: Kemampuan halaman static-cache; scale 1-5; 1=fully dynamic tiap request, 3=partial, 5=default cache ISR allowed; threshold >= 4; evidence: cek export di file layout.
- **Notes**: Perubahan ini memungkinkan halaman marketing statis (/, /about, dll) di-cache ISR dan mempercepat TTFB/LCP secara drastis.

## Task 2: Lengkapi Global Metadata, Manifest, Sitemap, Robots (App Router)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: T1
- **Description**:
  - Perluas `metadata` di `src/app/layout.tsx`: tambah metadataBase, title template, description, keywords, authors, creator, publisher, openGraph lengkap (title, description, type, locale, siteName, url, images), twitter (card, title, description, images), alternates canonical, robots (index, follow, googleBot).
  - Buat `src/app/manifest.ts` (Next.js App Router Metadata Files) atau `manifest.webmanifest` route dengan atribut PWA dasar.
  - Buat `src/app/sitemap.ts` yang return URL statis + slug artikel dari Prisma.
  - Hapus `public/robots.txt` statis, ganti dengan `src/app/robots.ts` yang mereturn `rules` + `sitemap` absolute URL (mengarahkan ke /sitemap.xml).
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3
- **Test Requirements**:
  - `rule` TR-2.1: Setelah next build, `/sitemap.xml` HTTP 200, content-type application/xml, berisi minimal URL /, /layanan, /about, /blog, /login, /registrasi
  - `rule` TR-2.2: `/robots.txt` HTTP 200, berisi `Sitemap:` directive dengan URL absolute sitemap.xml
  - `rule` TR-2.3: `<head>` hasil render berisi `<link rel="canonical">`, `<meta property="og:title">`, `<meta name="twitter:card">`
  - `rule` TR-2.4: `/manifest.webmanifest` response JSON valid dengan name, short_name, start_url, display, theme_color, background_color
- **Notes**: metadataBase default menggunakan placeholder `https://meow-care.example.com` user harus ganti sebelum deploy.

## Task 3: Tambah Per-Page Metadata (Title Unik, OG, Canonical) untuk Semua Page Customer
- **Status**: `pending`
- **Priority**: high
- **Depends On**: T2
- **Description**:
  - Tambah `export const metadata` di tiap page:
    - `src/app/(customer)/page.tsx` (Home)
    - `src/app/(customer)/layanan/page.tsx`
    - `src/app/(customer)/about/page.tsx`
    - `src/app/(customer)/blog/page.tsx`
    - `src/app/(customer)/blog/[slug]/page.tsx` (dynamic generateMetadata by slug)
    - `src/app/(customer)/login/page.tsx`
    - `src/app/(customer)/registrasi/page.tsx`
    - `src/app/(customer)/antrian/baru/page.tsx`
    - `src/app/(customer)/antrian/[id]/page.tsx`
    - `src/app/(customer)/profil/page.tsx`
  - Pastikan tiap title unik (contoh: "Layanan Klinik Kucing | Meow-Care"), description relevan, canonical masing-masing.
- **Acceptance Criteria Addressed**: AC-1, AC-7
- **Test Requirements**:
  - `rule` TR-3.1: Setiap page punya export metadata (atau generateMetadata) mengandung title dan description non-empty.
  - `rule` TR-3.2: Dynamic routes (/blog/[slug]) tidak error ketika slug ada / fallback.
  - `rubric` TR-3.3: Kualitas metadata (title < 60 chars, description < 160 chars, keyword relevan); scale 1-5; threshold >= 4; evidence: inspect halaman via view-source.

## Task 4: Tambahkan Structured Data (JSON-LD) Schema.org
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: T3
- **Description**:
  - Home: Organization (type: VeterinaryHospital) dengan name, url, logo, address, telephone, openingHoursSpecification, sameAs social links.
  - Blog per artikel (BlogPosting) dengan headline, datePublished, dateModified, author, image, description.
  - Layanan page: List Service schema (nama, description, provider).
- **Acceptance Criteria Addressed**: AC-1 (SEO structured), AC-4 (build pass)
- **Test Requirements**:
  - `rule` TR-4.1: Halaman `/` merender <script type="application/ld+json"> tanpa syntax error.
  - `rule` TR-4.2: Google Rich Results Test (simulasi): cek valid JSON (tidak ada required field yang hilang - cukup structure dasar).
  - `rule` TR-4.3: Halaman blog/[slug] ada BlogPosting JSON-LD ketika data ada.

## Task 5: Optimasi Performance (Preconnect, Font Display, Priority Image, Reduce Motion, Skip Link)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: T1
- **Description**:
  - Font: Pastikan `Inter({ subsets: ['latin'], display: 'swap' })` (layout.tsx)
  - `preconnect`: Link ke fonts.gstatic.com atau domain third-party.
  - Tambahkan skip-to-content link (a href="#main-content") yang tersembunyi default, visible on focus, ditempatkan sebelum Navbar.
  - Perbaiki Hero image: set `sizes` akurat (sesuai grid 1 md:grid-cols-2 → half), pastikan priority hanya untuk gambar above-the-fold.
  - AnimatedSection wrapper: tambah `disabled` berdasarkan `useReducedMotion` dari framer-motion atau custom hook window.matchMedia('(prefers-reduced-motion: reduce)').
  - HeroSection infinite motion icons: hentikan animasi kalau reduced motion true (di HeroSection set animate null).
  - Perbaiki Gambar di public folder: minimal biarkan Next Image mengkompresi AVIF/WebP (sudah formats di next.config); tambahkan width/height atau aspectRatio yang jelas.
- **Acceptance Criteria Addressed**: AC-5, AC-6, AC-9, AC-10
- **Test Requirements**:
  - `rule` TR-5.1: Ada skip link di root (h1 ke main-content visible on focus; bukti via HTML check)
  - `rule` TR-5.2: AnimatedSection + HeroSection animasi tidak aktif jika `prefers-reduced-motion: reduce`
  - `rule` TR-5.3: Font Inter punya display: swap (no invisible text FOIT)
  - `rubric` TR-5.4: Sizes attribute pada setiap Next Image (Hero, dokter, artikel, about) informative; scale 1-5; 1 = banyak sizes tidak ada, 3 = sizes di sebagian, 5 = semua gambar atribut sizes akurat; threshold >= 4; evidence: grep src untuk "sizes=" pada komponen image usage.
- **Notes**: Tambahkan main id="main-content" pada CustomerLayout <main id="main-content"> agar skip link anchor valid.

## Task 6: Aksesibilitas (Alt Text, Semantic Headings, Contrast, Focusable Element, Decorative SVG)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: T5
- **Description**:
  - Audit tiap Image dan berikan alt text meaningful (contoh: Hero alt "Dokter hewan sedang memeriksa kucing persia" bukan "Kucing Lucu"). Decorative SVG (misal icon di dalam div feature yang punya text) → `aria-hidden="true"`.
  - Pastikan tepat 1 h1 per halaman. Home sudah 1 (HeroSection). About 1, Layanan page 1, Blog 1. Cek LayananSection h2 tidak nested salah.
  - Pastikan kontras teks body dengan background minimal 4.5:1 (brand-green dengan putih check - bila brand-green terlalu terang ganti shade).
  - Pastikan button dan link focus style jelas: tambahkan ring-2 / outline-none focus-visible dengan ring offset kalau belum ada (Tailwind default kadang kurang).
  - Footer sosial link `href="#"` jika tidak punya URL target, jangan jadi link kosong (bisa ganti button atau hapus sementara; sekurang-kurangnya `aria-label` benar).
  - Tambahkan `lang="id"` di html (SUDAH ADA) dan pastikan region landmark: `<header>`, `<main id="main-content">`, `<footer>` ada di setiap page.
- **Acceptance Criteria Addressed**: AC-6, AC-7, AC-8, AC-9
- **Test Requirements**:
  - `rule` TR-6.1: axe / lighthouse heading-order pass (tidak ada skipped heading level)
  - `rule` TR-6.2: lighthouse image-alt pass
  - `rule` TR-6.3: focus-visible dapat diakses tab dan jelas terlihat (tidak hilang outline)
  - `rubric` TR-6.4: Coverage aksesibilitas keseluruhan; scale 1-5; threshold >= 4; evidence lighthouse accessibility score.

## Task 7: Build Clean & Final Verification
- **Status**: `pending`
- **Priority**: high
- **Depends On**: T1, T2, T3, T4, T5, T6
- **Description**:
  - Jalankan `pnpm prisma generate`
  - Jalankan `pnpm build` → pastikan exit 0, tidak ada TS error
  - Jalankan ESLint `pnpm lint` bila error bisa diabaikan atau diperbaiki sekilas bila ringan
  - Self-report Lighthouse (user nanti jalankan di Chrome DevTools) → checklist bahwa semua AC coverage
- **Acceptance Criteria Addressed**: AC-11, AC-12
- **Test Requirements**:
  - `rule` TR-7.1: `pnpm build` exit code 0
  - `rule` TR-7.2: Diagnostics GetDiagnostics (TS) → 0 error
  - `rubric` TR-7.3: Evaluasi build output warning; scale 1-5; threshold >= 3; evidence build log.
