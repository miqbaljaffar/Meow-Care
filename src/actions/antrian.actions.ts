'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateAntrianSchema = z.object({
  namaPemilik: z.string().min(2, { message: 'Nama pemilik minimal 2 karakter.' }),
  namaKucing: z.string().min(1, { message: 'Nama kucing harus diisi.' }),
  nomorTelepon: z
    .string()
    .min(8, { message: 'Nomor telepon tidak valid (minimal 8 digit).' })
    .regex(/^[0-9+\-\s()]+$/, { message: 'Nomor telepon hanya boleh berisi angka dan simbol + - ( ).' }),
  jenisLayanan: z.string().min(2, { message: 'Jenis layanan harus diisi.' }),
});

const UpdateStatusSchema = z.object({
  id: z.coerce.number().positive({ message: 'ID antrian tidak valid.' }),
  status: z.enum(['Dilayani', 'Selesai'], { message: 'Status antrian tidak valid.' }),
});

async function broadcastQueueUpdate() {
  try {
    const [sedangDilayani, antrianMenunggu] = await Promise.all([
      prisma.antrian.findFirst({ where: { status: 'Dilayani' } }),
      prisma.antrian.findFirst({ where: { status: 'Menunggu' }, orderBy: { nomorAntrian: 'asc' } }),
    ]);

    const data = {
      current: sedangDilayani?.nomorAntrian,
      next: antrianMenunggu?.nomorAntrian,
    };

    const wsUrl = process.env.WEBSOCKET_URL;
    if (wsUrl) {
      await fetch(`${wsUrl.replace(/\/$/, '')}/broadcast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(() => {});
    }
  } catch (error) {
    console.error('Failed to broadcast queue update:', error);
  }
}

export async function createAntrian(data: {
  namaPemilik: string;
  namaKucing: string;
  nomorTelepon: string;
  jenisLayanan: string;
}) {
  const validated = CreateAntrianSchema.safeParse(data);
  if (!validated.success) {
    const messages = validated.error.issues.map((i) => i.message).join(' ');
    return { success: false, message: messages };
  }

  try {
    const newNomorAntrian = await prisma.$transaction(async (tx) => {
      const lastAntrian = await tx.antrian.findFirst({
        orderBy: { nomorAntrian: 'desc' },
      });

      const nomor = (lastAntrian?.nomorAntrian || 0) + 1;

      await tx.antrian.create({
        data: {
          ...validated.data,
          nomorAntrian: nomor,
          status: 'Menunggu',
        },
      });

      return nomor;
    });

    const antrianBaru = await prisma.antrian.findFirst({
      where: { nomorAntrian: newNomorAntrian },
    });

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/antrian');
    await broadcastQueueUpdate();
    return { success: true, data: antrianBaru };
  } catch (error) {
    console.error('createAntrian error:', error);
    return { success: false, message: 'Gagal membuat antrian. Silakan coba lagi.' };
  }
}

export async function updateStatusAntrian(id: number, status: 'Dilayani' | 'Selesai') {
  const validated = UpdateStatusSchema.safeParse({ id, status });
  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues.map((i) => i.message).join(' '),
    };
  }

  try {
    const antrianToUpdate = await prisma.antrian.findUnique({
      where: { id: validated.data.id },
    });
    if (!antrianToUpdate) {
      return { success: false, message: 'Antrian tidak ditemukan.' };
    }

    await prisma.$transaction(async (tx) => {
      await tx.antrian.update({
        where: { id: validated.data.id },
        data: { status: validated.data.status },
      });

      if (validated.data.status === 'Selesai') {
        const kucing = await tx.kucing.findFirst({
          where: {
            nama: antrianToUpdate.namaKucing,
            pemilik: { nama: antrianToUpdate.namaPemilik },
          },
        });

        if (kucing) {
          await tx.riwayatLayanan.create({
            data: {
              kucingId: kucing.id,
              tanggal: new Date(),
              jenisLayanan: antrianToUpdate.jenisLayanan,
              catatan: 'Layanan selesai melalui antrian.',
            },
          });
        }
      }
    });

    revalidatePath('/');
    revalidatePath('/admin/antrian');
    revalidatePath('/admin');
    await broadcastQueueUpdate();
    return { success: true };
  } catch (error) {
    console.error('updateStatusAntrian error:', error);
    return { success: false, message: 'Gagal update status. Silakan coba lagi.' };
  }
}