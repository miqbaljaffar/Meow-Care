'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const TestimoniSchema = z.object({
  kutipan: z.string().min(10, 'Testimoni harus lebih detail.').max(200, 'Testimoni terlalu panjang.'),
  riwayatLayananId: z.number(),
});

export async function createTestimoniForCustomer(formData: FormData) {
  const validatedFields = TestimoniSchema.safeParse({
    kutipan: formData.get('kutipan'),
    riwayatLayananId: Number(formData.get('riwayatLayananId')),
  });

  if (!validatedFields.success) {
    return { success: false, message: 'Data tidak valid.' };
  }

  try {
    // Pastikan belum ada testimoni untuk riwayat ini
    const existingTestimoni = await prisma.testimoni.findUnique({
      where: { riwayatLayananId: validatedFields.data.riwayatLayananId },
    });

    if (existingTestimoni) {
      return { success: false, message: 'Anda sudah memberikan testimoni untuk layanan ini.' };
    }

    await prisma.testimoni.create({
      data: {
        kutipan: validatedFields.data.kutipan,
        riwayatLayananId: validatedFields.data.riwayatLayananId,
        status: 'PENDING',
      },
    });

    revalidatePath('/profil');
    return { success: true, message: 'Terima kasih! Testimoni Anda akan kami review.' };
  } catch (error) {
    console.error('Create Testimoni Error:', error);
    return { success: false, message: 'Gagal mengirim testimoni.' };
  }
}