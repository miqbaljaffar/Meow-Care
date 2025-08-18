import prisma from '@/lib/prisma'; 
import { Stethoscope, ShieldCheck, HeartPulse, Scissors, ShowerHead, Hotel } from 'lucide-react';
import Link from 'next/link';

// Objek untuk memetakan nama ikon ke komponen ikon
const iconMap: { [key: string]: React.ReactNode } = {
  Stethoscope: <Stethoscope size={40} className="text-brand-green" />,
  ShieldCheck: <ShieldCheck size={40} className="text-brand-green" />,
  HeartPulse: <HeartPulse size={40} className="text-brand-green" />,
  Scissors: <Scissors size={40} className="text-brand-green" />,
  ShowerHead: <ShowerHead size={40} className="text-brand-green" />,
  Hotel: <Hotel size={40} className="text-brand-green" />
};

async function getAllLayanan() {
  return prisma.layanan.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export default async function HalamanLayanan() {
  const daftarLayanan = await getAllLayanan();

  return (
    <section id="layanan" className="py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Pilih Layanan Kami</h1>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Kami menyediakan berbagai layanan kesehatan untuk memastikan sahabat Anda mendapatkan perawatan terbaik. Pilih layanan yang Anda butuhkan di bawah ini.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {daftarLayanan.map((layanan) => (
            <div key={layanan.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="flex justify-center mb-4">
                {/* Ganti ikon berdasarkan nama atau field baru di database */}
                {iconMap['Stethoscope']}
              </div>
              <h3 className="text-xl font-bold mb-2">{layanan.nama}</h3>
              <p className="text-gray-500 flex-grow">{layanan.deskripsi}</p>
              <div className="mt-6">
                <Link
                  href={`/antrian/baru?layanan=${layanan.nama}`}
                  className="w-full inline-block px-6 py-3 bg-brand-green text-white font-bold rounded-full shadow-md hover:bg-brand-green-dark transition-colors"
                >
                  Daftar Layanan Ini
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}