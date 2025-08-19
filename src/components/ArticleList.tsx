import Link from 'next/link';
import Image from 'next/image';
import { Artikel } from '@prisma/client';
import { PawPrint } from 'lucide-react';

interface ArticleListProps {
  articles: Artikel[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
         <PawPrint className="mx-auto h-16 w-16 text-gray-300" />
        <p className="mt-4 text-xl text-gray-500 font-semibold">Oops! Artikel tidak ditemukan.</p>
        <p className="mt-2 text-gray-500">Coba gunakan kata kunci atau filter yang berbeda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((artikel) => (
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
            {artikel.kategori && (
                 <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2 px-2.5 py-0.5 rounded-full">
                    {artikel.kategori}
                </span>
            )}
            <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-brand-green transition-colors">{artikel.judul}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{artikel.kutipan}</p>
            <span className="font-semibold text-brand-green">Baca Selengkapnya →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}