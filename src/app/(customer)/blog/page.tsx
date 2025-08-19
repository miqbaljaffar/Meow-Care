import { cache } from 'react';
import prisma from '@/lib/prisma';
import BlogPageClient from '@/components/BlogPageClient'; // <-- Komponen baru

// Ambil semua artikel yang sudah terbit
const getArtikelTerbit = cache(async () => {
  const artikel = await prisma.artikel.findMany({
    where: { status: 'terbit' },
    orderBy: { createdAt: 'desc' },
  });
  return artikel;
});

// Ambil semua kategori unik dari artikel
const getKategori = cache(async () => {
    const kategori = await prisma.artikel.findMany({
        where: { status: 'terbit' },
        select: {
            kategori: true,
        },
        distinct: ['kategori'],
    });
    // Ubah array of object menjadi array of string dan filter null/undefined
    return kategori.map(item => item.kategori).filter(Boolean) as string[];
});


export default async function BlogPage() {
  // Ambil data artikel dan kategori secara paralel
  const [daftarArtikel, daftarKategori] = await Promise.all([
    getArtikelTerbit(),
    getKategori(),
  ]);

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Blog Meow-Care</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan panduan, tips, dan wawasan terbaru seputar kesehatan dan perawatan kucing kesayangan Anda.
          </p>
        </div>
        {/* Gunakan Client Component untuk interaktivitas */}
        <BlogPageClient articles={daftarArtikel} categories={daftarKategori} />
      </div>
    </div>
  );
}