import prisma from '@/lib/prisma';
import LayananAdminClient from '@/components/LayananAdminClient';

// Ini adalah Server Component, tugasnya hanya mengambil data
export default async function AdminLayananPage() {
  const layanan = await prisma.layanan.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Melempar data ke Client Component untuk interaktivitas
  return <LayananAdminClient initialLayanan={layanan} />;
}
