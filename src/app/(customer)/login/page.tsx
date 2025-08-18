import LoginForm from '@/components/LoginForm';
import Image from 'next/image';
import Link from 'next/link';
import { PawPrint } from 'lucide-react';

export default function HalamanLogin() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl shadow-lg md:flex-row">
        {/* Kolom Kiri: Gambar & Branding */}
        <div className="relative h-64 w-full md:h-auto md:w-1/2">
          <Image
            src="/login.jpg"
            alt="Kucing Lucu"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-8 text-white">
            <Link href="/" className="flex items-center gap-2">
                <PawPrint className="text-white" size={28} />
                <span className="text-xl font-bold">Meow-Care</span>
            </Link>
            <h1 className="mt-4 text-3xl font-bold">Selamat Datang Kembali</h1>
            <p className="mt-2 text-emerald-200">Login untuk melanjutkan dan merawat sahabat terbaik Anda.</p>
          </div>
        </div>

        {/* Kolom Kanan: Form */}
        <div className="w-full bg-white p-8 md:w-1/2">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Login ke Akun Anda</h2>
          <p className="text-center text-gray-500 mb-8">
            Akses semua fitur kami dengan mudah.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}