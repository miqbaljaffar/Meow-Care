import prisma from '@/lib/prisma';
import Link from 'next/link';
// Impor semua ikon dari lucide-react sebagai satu objek
import * as LucideIcons from 'lucide-react';
import { Layanan } from '@prisma/client';
import type { ElementType } from 'react'; // <-- Perbaikan: Impor ElementType

// Tipe untuk memastikan kita hanya menggunakan nama ikon yang valid dari Lucide
type IconName = keyof typeof LucideIcons;

// Mengambil semua data layanan dari database
async function getAllLayanan(): Promise<Layanan[]> {
  return prisma.layanan.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export default async function HalamanLayanan() {
  const daftarLayanan = await getAllLayanan();

  return (
    <section id="layanan" className="py-20 bg-gray-50">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Pilih Layanan Kami</h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Kami menyediakan berbagai layanan kesehatan untuk memastikan sahabat Anda mendapatkan perawatan terbaik. Pilih layanan yang Anda butuhkan di bawah ini.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {daftarLayanan.map((layanan) => {
            // Logika untuk memilih komponen ikon secara dinamis
            // Jika nama ikon di database tidak valid atau kosong, gunakan 'Stethoscope' sebagai default
            const IconComponent = (LucideIcons[layanan.icon as IconName] || LucideIcons['Stethoscope']) as ElementType; // <-- Perbaikan: Tambahkan 'as ElementType'
            
            return (
              <div key={layanan.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col text-left">
                <div className="flex justify-start mb-4">
                  <IconComponent size={40} className="text-brand-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">{layanan.nama}</h3>
                <p className="text-gray-500 flex-grow">{layanan.deskripsi}</p>
                <div className="mt-6">
                  <Link
                    href={`/antrian/baru?layanan=${encodeURIComponent(layanan.nama)}`}
                    className="w-full text-center inline-block px-6 py-3 bg-brand-green text-white font-bold rounded-full shadow-md hover:bg-brand-green-dark transition-colors"
                  >
                    Daftar Layanan Ini
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
