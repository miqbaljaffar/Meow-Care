import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';

async function getArtikelBySlug(slug: string) {
  const artikel = await prisma.artikel.findUnique({
    where: { slug, status: 'terbit' },
    include: {
        penulis: true // Ambil data penulis
    }
  });
  return artikel;
}

export default async function DetailArtikelPage({ params }: { params: { slug: string } }) {
  const artikel = await getArtikelBySlug(params.slug);

  if (!artikel) {
    notFound();
  }

  // Ubah Markdown menjadi HTML
  const contentHtml = marked(artikel.konten);

  return (
    <article className="container mx-auto py-16 px-4 max-w-4xl">
      {artikel.gambar && (
         <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8 shadow-lg">
            <Image
              src={artikel.gambar}
              alt={artikel.judul}
              layout="fill"
              objectFit="cover"
              priority
            />
         </div>
      )}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{artikel.judul}</h1>
      <div className="flex items-center gap-6 text-gray-500 mb-8">
        <div className="flex items-center gap-2">
            <User size={18} />
            <span>{artikel.penulis.nama}</span>
        </div>
        <div className="flex items-center gap-2">
            <Calendar size={18} />
            <time dateTime={artikel.createdAt.toISOString()}>
                {new Date(artikel.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric', month: 'long', day: 'numeric'
                })}
            </time>
        </div>
      </div>
      {/* Styling untuk konten dari markdown */}
      <div
        className="prose prose-lg max-w-none prose-h2:text-3xl prose-h2:font-bold prose-p:leading-relaxed prose-a:text-brand-green"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}

// Opsional: Generate metadata untuk SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const artikel = await getArtikelBySlug(params.slug);
    if (!artikel) {
        return { title: 'Artikel tidak ditemukan' }
    }
    return {
        title: `${artikel.judul} | Meow-Care Blog`,
        description: artikel.kutipan,
    }
}