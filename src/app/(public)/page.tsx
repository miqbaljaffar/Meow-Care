import prisma from '@/lib/prisma';
import TampilanAntrian from '@/components/TampilanAntrian';
import HeroSection from '@/components/HeroSection';
import Link from 'next/link';
import LayananSection from '@/components/LayananSection'; // <-- Impor baru
import AlurPendaftaranSection from '@/components/AlurPendaftaranSection'; // <-- Impor baru
import TestimoniSection from '@/components/TestimoniSection'; // <-- Impor baru

async function getAntrianData() {
  const [sedangDilayani, antrianMenunggu] = await Promise.all([
    prisma.antrian.findFirst({
      where: { status: 'Dilayani' },
    }),
    prisma.antrian.findFirst({
      where: { status: 'Menunggu' },
      orderBy: { nomorAntrian: 'asc' },
    }),
  ]);
  return {
    current: sedangDilayani?.nomorAntrian,
    next: antrianMenunggu?.nomorAntrian,
  };
}

export default async function HomePage() {
  const initialData = await getAntrianData();

  return (
    <>
      <HeroSection />
      
      {/* Bagian Live Antrian */}
      <section id="antrian" className="py-20 bg-emerald-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Monitor Antrian Live
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Anda dapat memantau nomor antrian secara real-time di bawah ini. Pastikan Anda siap saat nomor Anda dipanggil.
          </p>
          <TampilanAntrian initialData={initialData} />
        </div>
      </section>

      {/* Konten Baru Ditambahkan Di Sini */}
      <LayananSection />
      <AlurPendaftaranSection />
      <TestimoniSection />
    </>
  );
}