import prisma from '@/lib/prisma';
import TestimoniAdminClient from '@/components/TestimoniAdminClient';
import { Testimoni, RiwayatLayanan, Kucing, User } from '@prisma/client';

// Definisikan tipe yang lebih lengkap untuk data testimoni
export type FullTestimoni = Testimoni & {
  riwayatLayanan: RiwayatLayanan & {
    kucing: Kucing & {
      pemilik: User;
    };
  };
};

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

  // Kirim data dengan tipe yang benar, tanpa 'as any'
  return <TestimoniAdminClient initialTestimoni={testimoni as FullTestimoni[]} />;
}