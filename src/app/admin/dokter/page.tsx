import prisma from '@/lib/prisma';
import DokterAdminClient from '@/components/DokterAdminClient';

// Ini adalah Server Component, tugasnya hanya mengambil data
export default async function AdminDokterPage() {
  const dokter = await prisma.dokter.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Melempar data ke Client Component untuk interaktivitas
  return <DokterAdminClient initialDokter={dokter} />;
}
