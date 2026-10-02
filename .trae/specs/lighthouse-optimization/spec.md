# Puskesmas-Kucing (Meow-Care) - Lighthouse 95-100 Optimization - Product Requirements Document

## Overview
- **Summary**: Mengoptimalkan seluruh halaman customer-facing pada website Meow-Care (Next.js 15 App Router) agar meraih skor Lighthouse minimal 95 untuk setiap dimensi: Performance, Accessibility, Best Practices, dan SEO — dengan target utama 100.
- **Purpose**: Meningkatkan Core Web Vitals, pengalaman pengguna (khususnya mobile-first), dan ranking pencarian organik, serta mematuhi standar aksesibilitas web (WCAG 2.1 AA) agar klinik terlihat profesional dan cepat diakses oleh seluruh segmen pengguna.
- **Target Users**: Pengunjung potensial klinik (pemilik kucing) di perangkat mobile & desktop, mesin pencari (Google/Bing), pengguna dengan kebutuhan aksesibilitas (screen reader, low vision, keyboard-only).

## Goals
- Skor Lighthouse Performance ≥ 95 (target 100) pada mobile untuk halaman Home (`/`)
- Skor Lighthouse Accessibility ≥ 95 (target 100) pada mobile
- Skor Lighthouse Best Practices ≥ 95 (target 100)
- Skor Lighthouse SEO ≥ 95 (target 100)
- Largest Contentful Paint (LCP) < 2.5s; First Input Delay (FID/INP) < 200ms; Cumulative Layout Shift (CLS) < 0.1
- Tidak ada temuan kritis/warning pada Chrome DevTools Issues

## Non-Goals
- Tidak mengubah visual desain (warna brand, struktur layout grid, atau copywriting utama) di luar yang disarankan oleh perbaikan a11y/seo/perf.
- Tidak menambah backend business logic baru di luar yang dibutuhkan metadata /robots/sitemap.
- Tidak menambah sistem testing end-to-end; hanya verifikasi via Lighthouse + typecheck + build yang ada.
- Tidak mengubah halaman admin (`/admin/*`) dan halaman authenticated seperti layout.tsx
- Tidak mengganti stack framework atau library (Next/Expo)

## Background & Context
Audit
Baseline menemukan:
  - Struktur: Root layout di src/app/layout.tsx (Metadata : title + description saja, tanpa og:image canonical, open graph, twitter card, manifest, alternatif bahasa, structured data).
  - Metadata per-page: hanya global saja.
  - Customer Layout (customer) memaksa dynamic = 'force-dynamic' di SELURUH halaman customer → tidak bisa di-static generate/diantara penyebab utama LCP/TTF lambat.
  - Customer Layout, no-cache'force-no-store' → hilang seluruh cache.
  - sitemap.ts + manifest + sitemap static robots (robots.txt tidak lengkap (tanpa Sitemap directive).
  - Halaman Home (/):  Tidak ada font display=swap Inter diatur (sudah next/font/google, tapi display tidak ada preload key request, preconnect/dns-prefetch untuk domain external (Google Maps iframe, Supabase realtime).
  - Tidak ada structured data (JSON-LD Organization, FAQ schema.org) untuk klinik hewan & blog artikel.
  - Gambar: `/kucing.jpg`, `poor-cat.jpg`, `login.jpg`, `regis.jpg` dll format JPG -> seharusnya AVIF/WebP (sudah `next.config` formats, tapi sumber gambar di public folder tidak dioptimasi Next Image component → format). Hero sudah Image (sumber JPG 450x450 fixed width tidak responsif sizes yang kecil.
  - Navbar: menggunakan `backdrop-blur`; mobile menu button sudah ada aria-label/aria-expanded.
  - Footer: social link href="#" tanpa aria-label ada.
  - LocationAndHours Google Maps iframe tanpa width/height eksplisit (aspect-video cukup.
  - AnimatedSection (framer-motion wrapper di semua section → potential layout shift tanpa reduce motion consideration (reduce-prefer-reduced-motion).
  - QueueCard menggunakan role="status" (bagus) tapi no heading struktur landmark.
  - Artikel Home (/) -> h2 tanpa section landmark minimal: hero h1 tunggal.
  - Button/ link tanpa skip-to-content.
  - Form tidak dicek (ada tapi ada di TampilanAntrian tidak ada tapi form di halaman utama. TampilanAntrian realtime Supabase.
  - Tidak ada canonical URL di <link rel="canonical">.
  - Force-dynamic force cache seluruh halaman → → pelanggaran best practice untuk halaman marketing static.
  - Ikon decorative ada beberapa tanpa aria-hidden (bagus sebagian tapi tidak semua.
  - TestimoniSection: `t.riwayatLayanan?.kucing?.pemilik?.nama sudah diperbaiki.
  - SEO: Tidak ada metadata Open Graph images, Twitter Card, canonical, robots meta robots lengkap.

## Functional Requirements
- **FR-1 (Metadata SEO Meta Lengkap)**: Root layout & setiap page yang ada (/, /layanan, /blog, /about, /login, /registrasi, /blog/[slug], /antrian/baru, /profil, /antrian/[id]) mengekspor metadata Next.js App Router lengkap: title (unique, deskripsi, keywords, canonical, openGraph (title, description, images, type, url, locale, siteName), twitter (card, title, description, images), alternates canonical, robots index/follow default, category, metadataBase.
- **FR-2 (Manifest & App Icons)**: Menyediakan manifest.webmanifest / manifest.ts di app route, favicon.ico sudah ada, tapi minimal apple-touch-icon dan di / manifest.
- **FR-3 (Sitemap & Robots)**: Menyediakan sitemap.ts (App Router di app/) yang mencantumkan URL statis dan dinamis (artikel slug). Menyediakan robots.ts dengan Sitemap directive lengkap (menggantikan robots.txt).
- **FR-4 (Structured Data / JSON-LD)**: Menambahkan <script> JSON-LD pada Home (Organization/VeterinaryHospital schema.org), halaman artikel (BlogPosting schema), halaman layanan (Service schema).
- **FR-5 (Font Optimization)**: Mengonfigurasi Inter dengan display=swap pada `next/font/google`, preload; menghindari layout shift dari Google Fonts.
- **FR-6 (Reduced Motion)**: Semua animasi framer-motion (HeroSection, AnimatedSection) menghormati prefers-reduced-motion user preference (disable animasi ketika di set).
- **FR-7 (Skip Link & Landmark)**: Menyediakan skip-to-content link di awal body untuk keyboard navigation.
- **FR-8 (Image Format Optimization)**: Mengganti gambar JPG di public menjadi format modern atau setidaknya memastikan Next Image dengan sizes akurat, priority hanya untuk yang above-the-fold, lazy default.
- **FR-9 (Preconnect External)**: Menambahkanpreconnect untuk domain pihak ketiga kritisyang digunakan (Google Maps, Supabase).
- **FR-10 (Caching di Customer Layout)**: Menghapus `dynamic = 'force-dynamic' dan fetchCache = 'force-no-store' di customer layout, dan untuk setiap page yang bisa static, membiarkan default Next.js ISR / cache normal (untuk halaman /, /layanan, /about, /blog, /blog/[slug], /login, /registrasi). Hanya halaman yang user authenticated yang butuh data realtime /anti cache seperti yang dibutuhkan.

## Non-Functional Requirements
- **NFR-1 (Performance LCP)**: Largest Contentful Paint element (halaman /) < 2.5 detik pada koneksi mobile throttled Lighthouse (Slow 4G).
- **NFR-2 (PerformanceCLS)**: Cumulative Layout Shift < 0.1 pada semua halaman teratas.
- **NFR-3 (Accessibility)**: WCAG 2.1 AA standar; contrast ratio minimal 4.5:1 untuk teks body, 3:1 large text; semua elemen interaktif fokus terjangkau keyboard; struktur heading h1→h2→h3 benar (1 h1 per page).
- **NFR-4 (Best Practices)**: Tidak ada insecure library vulnerable, tidak ada console error, HTTPS everywhere, CSP non-blocking, doctype benar, charset UTF-8, tidak ada link href="#" tanpa konten (ganti href="#nama-section" jika dekoratif atau button jika tidak).
- **NFR-5 (SEO)**: Meta tag lengkap, sitemap valid, robots valid, canonical tidak duplikat, structured data tanpa error Google Rich Results.
- **NFR-6 (Build Pass)**: `next build` exit code 0 tanpa error TypeScript atau ESLint.

## Constraints
- **Technical**: Stack Next.js 15 App Router, TypeScript strict mode, Tailwind v4, Prisma 6, lucide-react; tidak diperkenankan tambah dependency baru kecuali memang sangat diperlukan (lebih baik 0 tambahan dependencies).
- **Business**: Konten copywriting SEO mengikuti konteks klinik kucing Meow-Care (klinik hewan kucing Indonesia, bahasa Indonesia).
- **Dependencies**: Build `pnpm` build tersedia, Lighthouse bisa dijalankan via Chrome DevTools / Lighthouse CI / next build + start preview.

## Assumptions
- Domain production site production di-set metadataBase ke `https://example.com` sebagai default (user dapat mengganti sesuai domain final).
- OG image placeholder jika ada di /og.png atau menggunakan layout default (bila tidak, buat sederhana tanpa menambah dependency).
- User nanti akan run `pnpm build && pnpm start` dan test Lighthouse di hasil build.
- Force-dynamic dihapus kecuali page memang membutuhkan data sesi realtime (halaman /antrian, /profil masih bisa dynamic = force-dynamic opsional).

## Acceptance Criteria

### AC-1: Metadata Root Lengkap (Per Page Unique)
- **Type**: `rule`
- **Given**: Semua page route customer-facing yang tersedia (/, /layanan, /about, /blog, /login, /registrasi)
- **When**: Developer menjalankan build dan memeriksa `<head>` hasil render
- **Then**: Setiap page memiliki `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta property="og:*">` (title, description, image, url, type, site_name, locale), `<meta name="twitter:*">` (card, title, description, image)
- **Pass Condition**: Tidak ada page tanpa title/description; setiap canonical URL lengkap dan absolute; og dan twitter ada di setiap page.
- **Evidence**: `curl` / view-source hasil production build, atau `next build` + head element inspect.

### AC-2: Sitemap & Robots Ada dan Valid
- **Type**: `rule`
- **Given**: App Next.js ter-build
- **When**: Mengunjungi `/sitemap.xml` dan `/robots.txt`
- **Then**: `/sitemap.xml` mengembalikan XML valid dengan URL statis (/, /layanan, /about, /blog, /login, /registrasi) + URL artikel dinamis bila ada di DB; `/robots.txt` mengijinkan crawling dan menyertakan `Sitemap: <absolute-url>/sitemap.xml`
- **Pass Condition**: XSD sitemap valid, robots.txt line Sitemap tercantum, tidak ada error fetch.
- **Evidence**: Request HTTP 200 untuk keduanya, format XML/TXT valid.

### AC-3: App Manifest Terdefinisi
- **Type**: `rule`
- **Given**: Build sukses
- **When**: Mengunjungi `/manifest.webmanifest` atau inspect `<head>` manifest link
- **Then**: File/P route `manifest.*` valid JSON dengan `name`, `short_name`, `start_url`, `display`, `background_color`, `theme_color`, minimal 1 icon
- **Pass Condition**: Manifest valid menurut schema PWA minimal
- **Evidence**: curl `/manifest.webmanifest` response JSON, `<link rel="manifest">` di head.

### AC-4: Tidak Ada force-dynamic / force-no-store di CustomerLayout (Non-Auth Pages)
- **Type**: `rule`
- **Given**: File src/app/(customer)/layout.tsx
- **When**: Dicek line per line
- **Then**: Tidak ada `export const dynamic = 'force-dynamic'` atau `export const fetchCache = 'force-no-store'` di customer layout global (boleh ada di page-level untuk yang butuh realtime saja)
- **Pass Condition**: grep/vscode find tidak menemukan export dynamic/force-no-store di file customer layout
- **Evidence**: File diff / view file

### AC-5: Reduce Motion Dihormati
- **Type**: `rule`
- **Given**: HeroSection dan AnimatedSection & semua komponen menggunakan framer-motion
- **When**: User dengan system setting `prefers-reduced-motion: reduce`
- **Then**: Animasi berhenti / instant (tidak ada tweening, tidak ada infinite animation, hanya tampil normal)
- **Pass Condition**: Tidak ada animasi yang berjalan saat media query prefers-reduced-motion active; script tidak menghasilkan animasi
- **Evidence**: Inspect DevTools Emulate CSS media feature prefers-reduced-motion: reduce; lihat tidak ada transition animation.

### AC-6: Skip-to-Content Link Ada
- **Type**: `rule`
- **Given**: Setiap page
- **When**: Menekan tombol Tab pertama kali di page
- **Then**: Muncul link "Lewati ke konten utama" yang fokus ke main landmark
- **Pass Condition**: Link terlihat ketika fokus, dan klik memindahkan fokus ke `<main id="main-content">`
- **Evidence**: Keyboard nav test pertama di browser.

### AC-7: Struktur Heading (1 H1 per Halaman)
- **Type**: `rule`
- **Given**: Halaman /, /layanan, /about, /blog
- **When**: Memeriksa tag heading
- **Then**: Tepat satu `<h1>` per halaman, dan urutan h1→h2→h3 tidak bolong (tidak h3 tanpa h2 induk)
- **Pass Condition**: axe DevTools / lighthouse heading-order
- **Evidence**: axe / Lighthouse a11y heading-order: pass.

### AC-8: Alt Text Meaningful
- **Type**: `rule`
- **Given**: Seluruh `<Image>` / `<img>` / `<svg>` decorative vs informative
- **When**: Memeriksa atribut
- **Then**: Image informative punya `alt` deskriptif (tidak "image", "kucing" terlalu generik bila bisa lebih spesifik), decorative punya alt kosong `alt=""` dan `aria-hidden="true"`
- **Pass Condition**: Lighthouse image-alt audit pass
- **Evidence**: Lighthouse Accessibility image-alt pass; axe image-alt pass.

### AC-9: Performance (Lighthouse Skor Dimensi)
- **Type**: `rubric`
- **Dimension**: Skor Lighthouse mobile (Performance, Accessibility, Best Practices, SEO)
- **Scale**: 0-100
- **Anchors**: 0 = beberapa error 80-84. 90 = Sangat Baik 90-94. 100 = Sempurna ≥95
- **Pass Threshold**: Setiap dimensi ≥95 pada mobile untuk halaman `/` (target 100)
- **Evidence**: Lighthouse CLI / Chrome DevTools Lighthouse panel mobile report pada build production `next start`.

### AC-10: Core Web Vitals Threshold
- **Type**: `rubric`
- **Dimension**: Core Web Vitals score on mobile
- **Scale**: 0, 60, 90, 100
- **Anchors**: 0 = LCP > 4s / CLS > 0.25 / INP > 500ms. 60 = LCP 2.5-4s. 90 = baik. 100 = LCP < 2.5s & CLS < 0.1 & INP < 200ms
- **Pass Threshold**: ≥ 90 (LCP < 2.5, CLS < 0.1, INP < 200)
- **Evidence**: Report Lighthouse "Performance" section metrics.

### AC-11: Build Clean
- **Type**: `rule`
- **Given**: Kode sumber
- **When**: `pnpm build` (`prisma generate && next build`
- **Then**: Exit code 0, tidak ada TS error, tidak ada ESLint error yang fatal
- **Pass Condition**: Output build sukses
- **Evidence**: Output pnpm build log exit 0.

### AC-12: No Console Error Best Practices
- **Type**: `rule`
- **Given**: Production build
- **When**: Mengunjungi halaman di browser
- **Then**: Tidak ada error fatal di console (error, exception) dan tidak ada mixed content warnings
- **Pass Condition**: Chrome DevTools Console kosong dari error.

## Open Questions
- [ ] Apakah metadataBase production sudah punya domain final? (Defaultsementara dipakai `https://meow-care.example.com` sebagai placeholder yang user harus ganti sebelum deploy.)
- [ ] Perlukah OG image dedicated (mis. Akan /opengraph image dibuat otomatis dengan next/og atau cukup gambar kucing existing? (Default: pakai gambar /og dibuat sederhana jika ada / atau /kucing.jpg fallback)
