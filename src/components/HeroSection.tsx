import Image from 'next/image';
import Link from 'next/link';
import { Heart, Stethoscope, Bone } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Kolom Kiri: Teks & CTA */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
            Perawatan Terbaik untuk
            <span className="block bg-gradient-to-r from-brand-green to-emerald-400 bg-clip-text text-transparent mt-2">
              Sahabat Terbaik Anda
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Di Meow-Care, kami menyediakan layanan kesehatan terdepan dengan sistem antrian online yang praktis. Kesehatan anabul Anda adalah prioritas kami.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/antrian/baru"
              className="px-8 py-4 bg-brand-green text-white font-bold rounded-full shadow-lg hover:bg-brand-green-dark transition-transform transform hover:scale-105"
            >
              Ambil Nomor Antrian
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
            {/* Ganti 'kucing-hero.png' dengan nama file gambar Anda */}
            <Image
              src="/kucing.jpg"
              alt="Kucing Lucu"
              width={450}
              height={450}
              className="rounded-2xl shadow-2xl"
              priority
            />
             {/* Ikon Dekoratif */}
            <div className="absolute -top-6 -left-6 bg-white p-3 rounded-full shadow-lg">
              <Stethoscope className="text-brand-green" size={28} />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-full shadow-lg">
              <Heart className="text-red-500" size={28} fill="currentColor" />
            </div>
             <div className="absolute top-1/2 -right-8 bg-white p-3 rounded-full shadow-lg">
              <Bone className="text-yellow-600" size={28} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}