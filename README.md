# 🐾 MeowCare – Solusi Digital Klinik Hewan

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat\&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat\&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-green?style=flat\&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat\&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat)

MeowCare adalah aplikasi web modern untuk **klinik hewan** dengan fokus pada:
✅ *User Experience* pelanggan yang nyaman
✅ Manajemen admin yang efisien
✅ Skalabilitas & performa tinggi

---

## ✨ Fitur Utama

### 👩‍⚕️ Portal Pelanggan

* 🔐 **Autentikasi aman** dengan NextAuth.js
* ⏱ **Antrian online real-time** dengan Supabase Realtime
* 🐱 **Manajemen profil & riwayat medis kucing**
* 📰 **Blog kesehatan hewan** dengan pencarian & filter
* ⭐ **Testimoni & layanan klinik**

### 🛠️ Dasbor Admin

* 📋 **Manajemen antrian** (update status real-time)
* 📑 **CMS mini** untuk layanan, artikel, dokter, & testimoni
* 📊 **Analitik interaktif** (Tremor charts)

---

## 🛠️ Tech Stack

* **Next.js 14 (App Router)**
* **TypeScript** + **Tailwind CSS**
* **Prisma ORM** + Database (PostgreSQL/MySQL/MongoDB)
* **NextAuth.js** (autentikasi)
* **Lucide React** (ikon ringan)
* **Framer Motion** (animasi interaktif)
* **Supabase Realtime** (real-time)
* **Zod** (validasi form)

---

## 🚀 Cara Menjalankan Proyek

### 1️⃣ Prasyarat

* Node.js v18+
* npm / yarn / pnpm
* Database aktif (misalnya PostgreSQL)

### 2️⃣ Instalasi

```bash
git clone https://github.com/your-username/meowcare.git
cd meowcare
npm install
```

### 3️⃣ Setup Environment

Buat file `.env.local` lalu isi:

```env
DATABASE_URL="..."
NEXTAUTH_SECRET="..."
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-public-anon-key"
```

> Supabase Realtime akan otomatis memantau perubahan tabel `Antrian` di database.

### 4️⃣ Migrasi Database

```bash
npx prisma migrate dev
```

### 5️⃣ Jalankan Dev Server

```bash
npm run dev
```

👉 Buka di [http://localhost:3000](http://localhost:3000)

---

## 📂 Struktur Folder

```
/src
 ├── actions/        # Server Actions
 ├── app/            # Routing (App Router)
 │    ├── (customer) # Halaman pelanggan
 │    ├── admin      # Dasbor admin
 │    └── api        # API routes
 ├── components/     # Komponen UI
 ├── lib/            # Utilitas (Prisma, helper, dll)
 └── middleware.ts   # Middleware proteksi admin
```

---

## 🤝 Kontribusi

Kontribusi sangat terbuka!
Silakan **fork**, buat branch baru, lalu ajukan **pull request**. 🎉

---

## 📜 Lisensi

Proyek ini dirilis di bawah lisensi **MIT**.
