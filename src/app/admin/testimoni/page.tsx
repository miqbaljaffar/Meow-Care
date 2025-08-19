import prisma from '@/lib/prisma';
import TestimoniAdminClient from '@/components/TestimoniAdminClient';

export default async function AdminTestimoniPage() {
  // Ambil data testimoni beserta relasinya
  const testimoni = await prisma.testimoni.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      riwayatLayanan: {
        include: {
          kucing: {
            include: {
              pemilik: true,
            },
          },
        },
      },
    },
  });

  return <TestimoniAdminClient initialTestimoni={testimoni as any} />;
}