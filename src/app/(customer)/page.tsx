import prisma from '@/lib/prisma';
import TampilanAntrian from '@/components/TampilanAntrian';
import HeroSection from '@/components/HeroSection';
import Link from 'next/link';
import LayananSection from '@/components/LayananSection';
import AlurPendaftaranSection from '@/components/AlurPendaftaranSection';
import TestimoniSection from '@/components/TestimoniSection';
import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';

/**
 * Mengambil data antrian terkini (sedang dilayani dan berikutnya).
 */
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

/**
 * Mengambil 3 artikel terbaru yang sudah diterbitkan dari database.
 */
async function getArtikelTerbaru() {
    return prisma.artikel.findMany({
        where: { status: 'terbit' },
        take: 3,
        orderBy: { createdAt: 'desc' },
    });
}

/**
 * Komponen utama untuk halaman beranda.
 */
export default async function HomePage() {
  // Mengambil data secara paralel
  const [initialData, artikelTerbaru] = await Promise.all([
      getAntrianData(),
      getArtikelTerbaru()
  ]);

  return (
    <>
      <HeroSection />

      <AnimatedSection>
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
      </AnimatedSection>

      <AnimatedSection>
        <LayananSection />
      </AnimatedSection>

      <AnimatedSection>
        <AlurPendaftaranSection />
      </AnimatedSection>

      {/* --- SEKSI BARU: ARTIKEL TERBARU --- */}
      <AnimatedSection>
        <section id="blog-terbaru" className="py-20 bg-white">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Wawasan Terbaru dari Blog Kami</h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                    Ikuti artikel terbaru kami untuk mendapatkan tips dan informasi penting seputar dunia kucing.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {artikelTerbaru.map((artikel) => (
                      <Link key={artikel.id} href={`/blog/${artikel.slug}`} className="group block bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden text-left">
                        <div className="relative h-48 w-full">
                          <Image
                            src={artikel.gambar || '/kucing.jpg'} 
                            alt={artikel.judul}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-green transition-colors">{artikel.judul}</h3>
                          <p className="text-gray-600 text-sm mb-4">{artikel.kutipan}</p>
                          <span className="font-semibold text-brand-green text-sm">Baca Selengkapnya →</span>
                        </div>
                      </Link>
                    ))}
                </div>
                 <div className="mt-12">
                    <Link
                        href="/blog"
                        className="px-8 py-3 bg-brand-green text-white font-bold rounded-full shadow-md hover:bg-brand-green-dark transition-colors"
                    >
                        Lihat Semua Artikel
                    </Link>
                </div>
            </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <TestimoniSection />
      </AnimatedSection>
    </>
  );
}
