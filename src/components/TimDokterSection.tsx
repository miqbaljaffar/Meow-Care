import Image from 'next/image';
import prisma from '@/lib/prisma';
import { UserRound } from 'lucide-react';
import { extractDbError } from '@/lib/log-error';

const fallbackDokter = [
  { id: 1, nama: 'dr. Andini Putri', spesialisasi: 'Spesialis Kucing', foto: null as string | null },
  { id: 2, nama: 'dr. Budi Santoso', spesialisasi: 'Bedah Hewan', foto: null as string | null },
  { id: 3, nama: 'dr. Citra Maharani', spesialisasi: 'Dokter Umum', foto: null as string | null },
  { id: 4, nama: 'dr. Dimas Wijaya', spesialisasi: 'Gigi & Mulut', foto: null as string | null },
];

export default async function TimDokterSection() {
  let tim = fallbackDokter;

  try {
    const data = await prisma.dokter.findMany({
      orderBy: { createdAt: 'asc' },
    });
    if (data && data.length > 0) {
      tim = data;
    }
  } catch (error) {
    console.warn('Gagal memuat data dokter (fallback ditampilkan):', extractDbError(error));
  }

  return (
    <section id="tim" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 sm:mb-12">Tim Dokter Profesional Kami</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-8 sm:gap-10">
          {tim.map((dokter) => (
            <div key={dokter.id} className="text-center w-full sm:w-auto">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-3 sm:mb-4">
                {dokter.foto ? (
                  <Image
                    src={dokter.foto}
                    alt={dokter.nama}
                    fill
                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                    style={{ objectFit: 'cover' }}
                    className="rounded-full shadow-lg"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 flex items-center justify-center shadow-lg">
                    <UserRound size={56} className="text-brand-green" strokeWidth={1.5} />
                  </div>
                )}
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{dokter.nama}</h3>
              <p className="text-sm sm:text-base text-brand-green mt-1">{dokter.spesialisasi}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}