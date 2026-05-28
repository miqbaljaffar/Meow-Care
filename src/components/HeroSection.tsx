'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Stethoscope, Bone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Kolom Kiri: Teks & CTA */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
            Perawatan Terbaik untuk
            <span className="block text-brand-green mt-2">
              Sahabat Terbaik Anda
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Di Meow-Care, kami menyediakan layanan kesehatan terdepan dengan sistem antrian online yang praktis. Kesehatan anabul Anda adalah prioritas kami.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/layanan" // Perubahan: Mengarahkan ke halaman layanan
              className="px-8 py-4 bg-brand-green text-white font-bold rounded-full shadow-lg hover:bg-brand-green-dark transition-transform transform hover:scale-105"
            >
              Pilih Layanan & Antri
            </Link>
            <Link
              href="#antrian"
              className="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300 transition-colors"
            >
              Lihat Antrian Live
            </Link>
          </div>
        </div>

        {/* Kolom Kanan: Gambar */}
        <div className="relative flex justify-center items-center">
          <div className="absolute w-4/5 h-4/5 bg-emerald-100 rounded-3xl transform -rotate-12"></div>
          <div className="relative z-10">
            <Image
              src="/kucing.jpg"
              alt="Kucing Lucu"
              width={450}
              height={450}
              className="rounded-2xl shadow-2xl"
              priority
            />
            {/* Ikon Dekoratif dengan Animasi */}
            <motion.div
              className="absolute -top-6 -left-6 bg-white p-3 rounded-full shadow-lg"
              animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Stethoscope className="text-brand-green" size={28} />
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white p-3 rounded-full shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="text-red-500" size={28} fill="currentColor" />
            </motion.div>
            <motion.div
              className="absolute top-1/2 -right-8 bg-white p-3 rounded-full shadow-lg"
              animate={{ x: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Bone className="text-yellow-600" size={28} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}