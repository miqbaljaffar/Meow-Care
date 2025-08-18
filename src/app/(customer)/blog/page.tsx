import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

async function getArtikelTerbit() {
  const artikel = await prisma.artikel.findMany({
    where: { status: 'terbit' },
    orderBy: { createdAt: 'desc' },
  });
  return artikel;
}

export default async function BlogPage() {
  const daftarArtikel = await getArtikelTerbit();

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Blog Meow-Care</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan panduan, tips, dan wawasan terbaru seputar kesehatan dan perawatan kucing kesayangan Anda.
          </p>
        </div>

        {daftarArtikel.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {daftarArtikel.map((artikel) => (
              <Link key={artikel.id} href={`/blog/${artikel.slug}`} className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={artikel.gambar || '/kucing.jpg'} // Fallback ke gambar default
                    alt={artikel.judul}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-brand-green transition-colors">{artikel.judul}</h2>
                  <p className="text-gray-600 mb-4">{artikel.kutipan}</p>
                  <span className="font-semibold text-brand-green">Baca Selengkapnya →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">Belum ada artikel yang diterbitkan.</p>
          </div>
        )}
      </div>
    </div>
  );
}