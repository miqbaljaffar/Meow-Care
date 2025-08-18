import prisma from '@/lib/prisma';
import TestimoniAdminClient from '@/components/TestimoniAdminClient';

// Ini adalah Server Component, tugasnya hanya mengambil data
export default async function AdminTestimoniPage() {
  const testimoni = await prisma.testimoni.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Melempar data ke Client Component untuk interaktivitas
  return <TestimoniAdminClient initialTestimoni={testimoni} />;
}
