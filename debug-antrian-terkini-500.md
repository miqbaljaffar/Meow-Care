# Debug Session: antrian-terkini-500
- **Status**: [OPEN]
- **Session ID**: antrian-terkini-500
- **Created**: 2026-10-02
- **Symptom**: Endpoint `/api/antrian/terkini` mengembalikan HTTP 500 Internal Server Error secara berulang di production (Vercel: `https://meow-care-one.vercel.app/api/antrian/terkini`). Browser melakukan retry beberapa kali namun tetap 500.
- **Expected**: Mengembalikan HTTP 200 dengan data antrian terkini dalam format JSON (array atau object), atau 200 dengan payload kosong yang valid.
- **Environment**: Vercel production (Next.js 15 App Router), kemungkinan terkait Prisma / Supabase / runtime environment variables.

---

## Step 1. Hipotesis (Falsifiable)

| # | Hipotesis | Ekspektasi Bukti |
|---|-----------|-----------------|
| H1 | **Environment variable Prisma/Supabase tidak tersedia** di runtime Vercel (DATABASE_URL / DIRECT_URL / NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY). | Route entry log mencetak error `process.env.*` undefined; stack Prisma `PrismaClientInitializationError`. |
| H2 | **Prisma schema tidak sinkron dengan DB** (misalnya field `harga` atau relasi tertentu missing di production DB). | Prisma melempar `P2002 / P2014 / P2025 / raw "column does not exist"` di try-catch query findMany. |
| H3 | **Relasi `include` pada query Prisma tidak valid** (contoh: include model yang tidak punya relasi / typo nama field). | Stack trace menyebut Prisma validation error atau `invalid include selection`. |
| H4 | **Tipe data response tidak sesuai / null vs undefined mismatch** menyebabkan Next.js gagal serialize Response JSON (contoh: `BigInt`, `undefined` di object yang seharusnya null). | log `JSON.stringify` error atau Next.js App Router response serialization error. |
| H5 | **NextAuth / session tidak terkonfigurasi** tapi route memanggil `getServerSession` tanpa provider/callback terkonfigurasi di production. | stack `next-auth` / `AUTH_URL not set` / `secret missing`. |

---

## Step 2. Bukti Statis (pre-instrumentation)

- [route.ts](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/app/api/antrian/terkini/route.ts) — TIDAK PUNYA try-catch di sekitar `Promise.all([prisma.antrian.findFirst x2])`. Setiap Prisma error akan jadi unhandled → HTTP 500 mentah.
- [prisma.ts](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/lib/prisma.ts) — Singleton Prisma Client normal, tidak ada error handling global atau timeout.
- [.env](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/.env) — `DATABASE_URL` pakai `pooler.supabase.com:5432` dengan user `postgres.kqcfegtpsgrsmcjhrzzx`.
- [schema.prisma](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/prisma/schema.prisma) — Model Antrian sesuai (status String default "Menunggu", nomorAntrian Int unique).

Runtime evidence dari `pnpm build` (step 4, sebelum instrumentasi):
```
PrismaClientInitializationError: FATAL: (ENOTFOUND) tenant/user postgres.kqcfegtpsgrsmcjhrzzx not found
```
Terjadi pada SEMUA query prisma.* (dokter, artikel, layanan, antrian, testimoni) → H1 CONFIRMED: Koneksi Supabase invalid.

---

## Step 3. Instrumentasi & Runtime Evidence
DIBATALKAN. Bukti cukup dari stderr pnpm build — error 100% reproducible pada semua query Prisma yang melalui route try-catch (selalu muncul "Gagal memuat ... (fallback ditampilkan)"). Tidak butuh Debug Server.

---

## Step 4. Analisis Bukti

| Hipotesis | Status | Bukti |
|---|---|---|
| H1: Koneksi Supabase invalid (tenant/user not found) | ✅ CONFIRMED | Pesan `(ENOTFOUND) tenant/user postgres.kqcfegtpsgrsmcjhrzzx not found` muncul di 8+ query berbeda selama build phase static generate. |
| H2: Schema Prisma tidak sinkron | ❌ REJECTED | Query findFirst sederhana tanpa include pun gagal. Error terjadi SEBELUM parse result / kolom. |
| H3: Relasi include invalid | ❌ REJECTED | Sebagian query tidak pakai include tetap error. |
| H4: Serialize JSON gagal | ❌ REJECTED | Error sebelum return Response. |
| H5: NextAuth | ❌ REJECTED | Route terkini TIDAK memanggil auth. |

Penyebab tambahan (build noise):
- `console.warn(msg, errorObject)` default V8 mencetak stack trace penuh ke stderr. Selama `next build` → static generate pages (customer/) menjalankan async server components → semua 9 titik query gagal dan menulis 20+ baris stack trace. User salah mengartikannya sebagai "build error" (padahal exit code 0, `✓ Generating static pages (16/16)`).
- ESLint warning: `FallbackItem` di TestimoniSection.tsx didefinisikan tapi tidak dipakai → warning @typescript-eslint/no-unused-vars.

---

## Step 5. Fix (Patch)

### Patch 5.A — HTTP 500 Loop Resilience
**File**: [src/app/api/antrian/terkini/route.ts](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/app/api/antrian/terkini/route.ts#L1-L27)
- Bungkus Promise.all findFirst dengan try-catch.
- Fallback: `NextResponse.json({ current: null, next: null, error: 'Gagal mengambil data antrian' }, { status: 200 })`.
- **Alasan**: Browser tidak retry 2xx. Frontend RealtimeQueueDisplay dengan interval 3 detik akan menerima JSON valid tiap polling, tidak spam 500.

### Patch 5.B — Tipe QueueData konsisten (Project Memory)
- [RealtimeQueueDisplay.tsx](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/components/RealtimeQueueDisplay.tsx#L8-L11): `QueueData.current/next: number` → `number | null` (sinkron dengan TampilanAntrian dan API fallback).
- [QueueCard.tsx](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/components/QueueCard.tsx#L1-L29): Tambah `| null` pada props queueNumber, buat `const displayNumber = queueNumber ?? '—'` sehingga null → placeholder emdash (menghindari CLS kosong dan aria-label `null`).

### Patch 5.C — Hilangkan Unused FallbackItem
- [TestimoniSection.tsx](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/components/TestimoniSection.tsx#L35-L37): Ganti return type getTestimoni() menjadi `Promise<FallbackItem[]>` sehingga type alias dipakai → hapus warning eslint no-unused-vars.

### Patch 5.D — Build Log Noise Reduction (9 files)
Ganti `console.warn(msg, error)` dengan `console.warn(msg, error instanceof Error ? error.message : String(error))` di semua 9 lokasi fallback Prisma:
- [src/components/LayananSection.tsx](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/components/LayananSection.tsx#L23-L29)
- [src/components/TestimoniSection.tsx](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/components/TestimoniSection.tsx#L60-L66)
- [src/components/TimDokterSection.tsx](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/components/TimDokterSection.tsx#L22-L27)
- [src/app/(customer)/page.tsx (antrian)](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/app/(customer)/page.tsx#L98-L104)
- [src/app/(customer)/page.tsx (artikel)](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/app/(customer)/page.tsx#L124-L130)
- [src/app/(customer)/blog/page.tsx (daftar)](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/app/(customer)/blog/page.tsx#L46-L52)
- [src/app/(customer)/blog/page.tsx (kategori)](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/app/(customer)/blog/page.tsx#L63-L69)
- [src/app/(customer)/blog/[slug]/page.tsx](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/app/(customer)/blog/%5Bslug%5D/page.tsx#L19-L25)
- [src/app/(customer)/layanan/page.tsx](file:///c:/Users/M%20Iqbal/projectiqbal/pukeswan/puskesmas-kucing/src/app/(customer)/layanan/page.tsx#L111-L117)

---

## Step 6. Post-Fix Verification Checklist
- [ ] TypeScript: `GetDiagnostics` → 0 errors.
- [ ] Setelah deploy ke Vercel, Network tab: /api/antrian/terkini status **200** (bukan 500). Payload `{current: null, next: null, error: '...'}` bila DB invalid.
- [ ] QueueCard menampilkan `—` untuk nomor kosong (bukan blank).
- [ ] Console DevTools: Tidak ada error TS / 500 retry berantai.
- [ ] Pindahan SUPABASE ENV (manual user step):
  - Buka Vercel → Project Settings → Environment Variables.
  - Hapus `DATABASE_URL` dan `DIRECT_URL` lama.
  - Copy exact dari Supabase Dashboard → Project Settings → Database:
    - **DATABASE_URL** = Transaction Mode (Pooler) URL (port 6543, `?pgbouncer=true`)
    - **DIRECT_URL** = Session Mode URL (port 5432)
  - Redeploy (klik "Redeploy" tanpa cache build).
