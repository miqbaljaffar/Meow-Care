import prisma from '@/lib/prisma';
import ArtikelAdminClient from '@/components/ArtikelAdminClient';

export default async function AdminArtikelPage() {
  // Ambil data artikel dan data penulis secara paralel
  const [artikel, authors] = await Promise.all([
    prisma.artikel.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        penulis: true, // Sertakan data penulis
      },
    }),
    prisma.user.findMany({
      where: { role: 'ADMIN' }, // Asumsi penulis adalah admin
    })
  ]);

  return <ArtikelAdminClient initialArtikel={artikel} authors={authors} />;
}