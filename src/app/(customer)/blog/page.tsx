import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import BlogPageClient from '@/components/BlogPageClient';
import type { Artikel } from '@prisma/client';
import { extractDbError } from '@/lib/log-error';

export const metadata: Metadata = {
  title: 'Blog & Edukasi',
  description: 'Tips perawatan, panduan kesehatan, panduan vaksinasi kucing, artikel edukasi dari dokter hewan Meow-Care.',
  keywords: ['blog kucing', 'edukasi kucing', 'tips perawatan kucing', 'panduan kesehatan kucing', 'vaksinasi kucing', 'meow-care blog'],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog & Edukasi | Meow-Care',
    description: 'Tips perawatan, panduan kesehatan, panduan vaksinasi kucing, artikel edukasi dari dokter hewan Meow-Care.',
    type: 'website',
    url: '/blog',
    images: [
      {
        url: '/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Blog & Edukasi Meow-Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Edukasi | Meow-Care',
    description: 'Tips perawatan, panduan kesehatan, panduan vaksinasi kucing, artikel edukasi dari dokter hewan Meow-Care.',
    images: ['/og-default.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const getArtikelTerbit = async (): Promise<Artikel[]> => {
  try {
    const artikel = await prisma.artikel.findMany({
      where: { status: 'terbit' },
      orderBy: { createdAt: 'desc' },
    });
    return artikel;
  } catch (error) {
    console.warn('Gagal memuat daftar artikel (fallback kosong):', extractDbError(error));
    return [];
  }
};

const getKategori = async (): Promise<string[]> => {
  try {
    const kategori = await prisma.artikel.findMany({
      where: { status: 'terbit' },
      select: { kategori: true },
      distinct: ['kategori'],
    });
    return kategori.map((item) => item.kategori).filter(Boolean) as string[];
  } catch (error) {
    console.warn('Gagal memuat kategori artikel:', extractDbError(error));
    return [];
  }
};

export default async function BlogPage() {
  const [daftarArtikel, daftarKategori] = await Promise.all([
    getArtikelTerbit(),
    getKategori(),
  ]);

  return (
    <div className="bg-gray-50 py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Blog & Edukasi
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3 sm:mb-4">Blog Meow-Care</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Temukan panduan, tips, dan wawasan terbaru seputar kesehatan dan perawatan kucing kesayangan Anda.
          </p>
        </div>
        <BlogPageClient articles={daftarArtikel} categories={daftarKategori} />
      </div>
    </div>
  );
}