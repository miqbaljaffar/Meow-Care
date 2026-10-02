import type { Metadata } from 'next';
import RegistrasiForm from '@/components/RegistrasiForm';
import Image from 'next/image';
import Link from 'next/link';
import { PawPrint } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Registrasi',
  description: 'Daftarkan akun Meow-Care gratis untuk mulai mendaftarkan antrian online, simpan data kucing, dan akses riwayat perawatan.',
  keywords: ['registrasi meow-care', 'daftar akun', 'antrian online kucing', 'buat akun meow-care'],
  alternates: {
    canonical: '/registrasi',
  },
  openGraph: {
    title: 'Registrasi | Meow-Care',
    description: 'Daftarkan akun Meow-Care gratis untuk mulai mendaftarkan antrian online, simpan data kucing, dan akses riwayat perawatan.',
    type: 'website',
    url: '/registrasi',
    images: [
      {
        url: '/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Registrasi Meow-Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Registrasi | Meow-Care',
    description: 'Daftarkan akun Meow-Care gratis untuk mulai mendaftarkan antrian online, simpan data kucing, dan akses riwayat perawatan.',
    images: ['/og-default.svg'],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function HalamanRegistrasi() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl shadow-lg md:flex-row">
        {/* Kolom Kiri: Gambar & Branding */}
        <div className="relative h-64 w-full md:h-auto md:w-1/2">
          <Image
            src="/regis.jpg"
            alt="Kucing Oren"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-8 text-white">
             <Link href="/" className="flex items-center gap-2">
                <PawPrint className="text-white" size={28} />
                <span className="text-xl font-bold">Meow-Care</span>
            </Link>
            <h1 className="mt-4 text-3xl font-bold">Bergabunglah dengan Kami</h1>
            <p className="mt-2 text-emerald-200">Daftarkan diri Anda dan berikan yang terbaik untuk kucing kesayangan.</p>
          </div>
        </div>

        {/* Kolom Kanan: Form */}
        <div className="w-full bg-white p-8 md:w-1/2">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Buat Akun Baru</h2>
            <p className="text-center text-gray-500 mb-8">
                Langkah awal untuk perawatan terbaik.
            </p>
            <RegistrasiForm />
        </div>
      </div>
    </div>
  );
}