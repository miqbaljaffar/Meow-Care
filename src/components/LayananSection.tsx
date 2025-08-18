import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Stethoscope, ShieldCheck, HeartPulse } from 'lucide-react';

// Fungsi untuk mengambil 3 layanan unggulan dari database
async function getLayananUnggulan() {
  return prisma.layanan.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
  });
}

export default async function LayananSection() {
  const layanan = await getLayananUnggulan();

  // Helper untuk memilih ikon (bisa dikembangkan lebih lanjut)
  const getIcon = (index: number) => {
    const icons = [
      <Stethoscope key="stethoscope" size={40} className="text-brand-green" />,
      <ShieldCheck key="shield" size={40} className="text-brand-green" />,
      <HeartPulse key="heart" size={40} className="text-brand-green" />,
    ];
    return icons[index % icons.length];
  };

  return (
    <section id="layanan" className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Layanan Unggulan Kami</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Kami menyediakan berbagai layanan kesehatan untuk memastikan sahabat Anda mendapatkan perawatan terbaik.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {layanan.map((item, index) => (
            <div key={item.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex justify-center mb-4">
                {getIcon(index)}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.nama}</h3>
              <p className="text-gray-500">{item.deskripsi}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link
            href="/layanan"
            className="px-8 py-3 bg-brand-green text-white font-bold rounded-full shadow-md hover:bg-brand-green-dark transition-colors"
          >
            Lihat Semua Layanan
          </Link>
        </div>
      </div>
    </section>
  );
}
