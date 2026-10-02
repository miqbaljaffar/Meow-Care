import prisma from '@/lib/prisma';
import { MessageCircle, Cat } from 'lucide-react';
import { extractDbError } from '@/lib/log-error';

const fallbackTestimoni = [
  {
    id: 1,
    kutipan:
      'Pelayanan di Meow-Care sangat memuaskan. Dokter sangat sabar dan penanganannya profesional. Kucing saya sekarang sehat dan lincah kembali!',
    namaPemilik: 'Siti Rahmawati',
    namaKucing: 'Mochi',
  },
  {
    id: 2,
    kutipan:
      'Sistem antrian onlinenya sangat membantu. Saya tidak perlu menunggu lama di klinik. Harga juga terjangkau untuk kualitas yang diberikan.',
    namaPemilik: 'Rizky Pratama',
    namaKucing: 'Oyen',
  },
  {
    id: 3,
    kutipan:
      'Tim dokter di Meow-Care penuh kasih sayang. Kucing saya yang biasanya takut ke dokter hewan jadi lebih tenang saat diperiksa.',
    namaPemilik: 'Dewi Anggraeni',
    namaKucing: 'Snowy',
  },
  {
    id: 4,
    kutipan:
      'Grooming-nya rapih banget! Kucing saya bau wangi dan bulunya lembut seminggu setelah treatment. Pasti akan kembali lagi.',
    namaPemilik: 'Fajar Nugroho',
    namaKucing: 'Simba',
  },
];

type FallbackItem = (typeof fallbackTestimoni)[number];

async function getTestimoni(): Promise<FallbackItem[]> {
  try {
    const data = await prisma.testimoni.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      where: { status: 'PUBLISHED' },
      include: {
        riwayatLayanan: {
          include: {
            kucing: { include: { pemilik: true } },
          },
        },
      },
    });

    if (data.length === 0) return fallbackTestimoni;

    return data.map((t) => ({
      id: t.id,
      kutipan: t.kutipan,
      namaPemilik: t.riwayatLayanan?.kucing?.pemilik?.nama || 'Pelanggan Kami',
      namaKucing: t.riwayatLayanan?.kucing?.nama || 'Kucing',
    }));
  } catch (error) {
    console.warn('Gagal memuat testimoni (fallback ditampilkan):', extractDbError(error));
    return fallbackTestimoni;
  }
}

export default async function TestimoniSection() {
  const testimoni = await getTestimoni();

  return (
    <section id="testimoni" className="py-16 sm:py-20 bg-emerald-50/40">
      <div className="container mx-auto text-center px-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm mb-4 sm:mb-6">
          <MessageCircle size={18} className="text-brand-green" />
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700">Testimoni</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Kata Mereka Tentang Meow-Care</h2>
        <p className="text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Cerita nyata dari pemilik kucing yang telah mempercayakan perawatan sahabat berbulu mereka kepada kami.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
          {testimoni.map((item) => (
            <article
              key={item.id}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              <p className="text-gray-700 italic mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed flex-grow">
                &ldquo;{item.kutipan}&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="relative w-12 h-12 rounded-full bg-emerald-50 border-2 border-emerald-100 overflow-hidden shrink-0 flex items-center justify-center">
                  <Cat size={24} className="text-brand-green" strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 truncate">{item.namaPemilik}</p>
                  <p className="text-sm text-gray-500 truncate">Pemilik Kucing &ldquo;{item.namaKucing}&rdquo;</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}