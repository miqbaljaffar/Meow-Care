import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import Image from 'next/image';
import { CalendarDays, UserRound, ArrowLeft, BookOpen } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

const getArtikelBySlug = async (slug: string) => {
  try {
    const artikel = await prisma.artikel.findUnique({
      where: { slug, status: 'terbit' },
      include: {
        penulis: true,
      },
    });
    return artikel;
  } catch (error) {
    console.warn('Gagal memuat artikel detail:', error);
    return null;
  }
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DetailArtikelPage({ params }: PageProps) {
  const resolvedParams = await params;
  const artikel = await getArtikelBySlug(resolvedParams.slug);

  if (!artikel) {
    notFound();
  }

  const contentHtml = marked(artikel.konten);

  return (
    <article className="container mx-auto py-10 sm:py-16 px-4 max-w-4xl">
      <div className="mb-6 sm:mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-green hover:text-brand-green-dark transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Kembali ke Blog
        </Link>
      </div>

      <header className="mb-8 sm:mb-10">
        {artikel.kategori && (
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs sm:text-sm font-semibold text-brand-green uppercase tracking-wider mb-4 sm:mb-5">
            <BookOpen size={14} />
            {artikel.kategori}
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 sm:mb-6 leading-tight">
          {artikel.judul}
        </h1>
        {artikel.kutipan && (
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 border-l-4 border-brand-green pl-4 italic">
            {artikel.kutipan}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm sm:text-base text-gray-500">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-emerald-50">
              <UserRound size={16} className="text-brand-green" />
            </div>
            <span className="font-medium text-gray-700">
              {artikel.penulis?.nama || 'Tim Meow-Care'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-emerald-50">
              <CalendarDays size={16} className="text-brand-green" />
            </div>
            <time dateTime={artikel.createdAt.toISOString()}>
              {new Date(artikel.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </header>

      {artikel.gambar && (
        <div className="relative h-56 sm:h-72 md:h-96 w-full rounded-2xl overflow-hidden mb-8 sm:mb-10 shadow-xl ring-1 ring-gray-100">
          <Image
            src={artikel.gambar}
            alt={artikel.judul}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1024px, 1024px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}

      <div
        className="prose prose-lg sm:prose-xl max-w-none prose-headings:text-gray-900 prose-h1:text-3xl sm:prose-h1:text-4xl prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-extrabold prose-p:leading-relaxed prose-a:text-brand-green prose-a:no-underline hover:prose-a:underline prose-blockquote:border-brand-green prose-blockquote:text-gray-700 prose-strong:text-gray-900 prose-img:rounded-2xl prose-img:shadow-md"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const artikel = await getArtikelBySlug(resolvedParams.slug);

  if (!artikel) {
    return { title: 'Artikel tidak ditemukan | Meow-Care Blog' };
  }
  return {
    title: `${artikel.judul} | Meow-Care Blog`,
    description:
      artikel.kutipan ||
      `Baca artikel ${artikel.judul} untuk tips dan informasi seputar perawatan kucing.`,
    keywords: [artikel.kategori || 'kesehatan kucing', 'kucing', 'meow care', artikel.judul],
  };
}