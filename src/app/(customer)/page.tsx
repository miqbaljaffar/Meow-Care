import prisma from '@/lib/prisma';
import TampilanAntrian from '@/components/TampilanAntrian';
import HeroSection from '@/components/HeroSection';
import Link from 'next/link';
import LayananSection from '@/components/LayananSection';
import TestimoniSection from '@/components/TestimoniSection';
import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';
import TimDokterSection from '@/components/TimDokterSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import { BookOpen, Calendar } from 'lucide-react';

type ArtikelItem = {
  id: number;
  slug: string;
  judul: string;
  kutipan: string | null;
  gambar: string | null;
  createdAt: Date;
  kategori: string | null;
};

const fallbackArtikel: ArtikelItem[] = [
  {
    id: 1,
    slug: 'tips-merawat-kucing-di-musim-hujan',
    judul: '10 Tips Merawat Kucing di Musim Hujan',
    kutipan: 'Cuaca dingin dan lembab bisa memengaruhi kesehatan kucing. Berikut 10 tips agar kucing Anda tetap sehat dan hangat.',
    gambar: '/kucing.jpg',
    createdAt: new Date(),
    kategori: 'Perawatan',
  },
  {
    id: 2,
    slug: 'panduan-vaksinasi-kucing-lengkap',
    judul: 'Panduan Vaksinasi Kucing Lengkap',
    kutipan: 'Ketahui jadwal vaksinasi yang tepat untuk melindungi kucing Anda dari penyakit-penyakit berbahaya.',
    gambar: '/kucing.jpg',
    createdAt: new Date(),
    kategori: 'Kesehatan',
  },
  {
    id: 3,
    slug: 'tanda-kucing-stress-solusi',
    judul: 'Tanda-tanda Kucing Stress dan Solusinya',
    kutipan: 'Kucing bisa mengalami stress seperti manusia. Kenali tandanya dan temukan solusi untuk kucing bahagia.',
    gambar: '/kucing.jpg',
    createdAt: new Date(),
    kategori: 'Perilaku',
  },
];

const getAntrianData = async (): Promise<{ current: number | null; next: number | null }> => {
  try {
    const [sedangDilayani, antrianMenunggu] = await Promise.all([
      prisma.antrian.findFirst({ where: { status: 'Dilayani' } }),
      prisma.antrian.findFirst({ where: { status: 'Menunggu' }, orderBy: { nomorAntrian: 'asc' } }),
    ]);
    return {
      current: sedangDilayani?.nomorAntrian ?? null,
      next: antrianMenunggu?.nomorAntrian ?? null,
    };
  } catch (error) {
    console.warn('Gagal memuat data antrian (fallback ditampilkan):', error);
    return { current: null, next: null };
  }
};

const getArtikelTerbaru = async (): Promise<ArtikelItem[]> => {
  try {
    const data = await prisma.artikel.findMany({
      where: { status: 'terbit' },
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
    if (data.length === 0) return fallbackArtikel;
    return data.map((a) => ({
      id: a.id,
      slug: a.slug,
      judul: a.judul,
      kutipan: a.kutipan,
      gambar: a.gambar,
      createdAt: a.createdAt,
      kategori: a.kategori,
    }));
  } catch (error) {
    console.warn('Gagal memuat artikel terbaru (fallback ditampilkan):', error);
    return fallbackArtikel;
  }
};

export default async function HomePage() {
  const [initialData, artikelTerbaru] = await Promise.all([
    getAntrianData(),
    getArtikelTerbaru(),
  ]);

  return (
    <>
      <HeroSection />

      <AnimatedSection>
        <section id="antrian" className="py-16 sm:py-20 bg-emerald-50 px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm mb-3 sm:mb-4">
              <Calendar size={18} className="text-brand-green" />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Antrian Hari Ini
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              Monitor Antrian Live
            </h2>
            <p className="text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Anda dapat memantau nomor antrian secara real-time di bawah ini. Pastikan Anda siap saat nomor Anda dipanggil.
            </p>
            <TampilanAntrian initialData={initialData} />
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <LayananSection />
      </AnimatedSection>

      <WhyChooseUs />

      <AnimatedSection>
        <section id="blog-terbaru" className="py-16 sm:py-20 bg-white px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 shadow-sm mb-3 sm:mb-4">
              <BookOpen size={18} className="text-brand-green" />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Artikel & Edukasi
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              Wawasan Terbaru dari Blog Kami
            </h2>
            <p className="text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Ikuti artikel terbaru kami untuk mendapatkan tips dan informasi penting seputar dunia kucing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {artikelTerbaru.map((artikel) => (
                <Link
                  key={artikel.id}
                  href={`/blog/${artikel.slug}`}
                  className="group block bg-gray-50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-left border border-gray-100"
                >
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                    <Image
                      src={artikel.gambar || '/kucing.jpg'}
                      alt={artikel.judul}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    {artikel.kategori && (
                      <span className="inline-block text-xs font-semibold text-brand-green uppercase tracking-wider mb-2">
                        {artikel.kategori}
                      </span>
                    )}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-green transition-colors line-clamp-2">
                      {artikel.judul}
                    </h3>
                    {artikel.kutipan && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{artikel.kutipan}</p>
                    )}
                    <span className="font-semibold text-brand-green text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Baca Selengkapnya
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 sm:mt-12">
              <Link
                href="/blog"
                className="inline-block px-8 py-3 bg-brand-green text-white font-semibold rounded-full shadow-md hover:bg-brand-green-dark transition-all hover:shadow-lg active:scale-[0.98]"
              >
                Lihat Semua Artikel
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <div className="bg-gray-50">
          <TimDokterSection />
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <TestimoniSection />
      </AnimatedSection>
    </>
  );
}