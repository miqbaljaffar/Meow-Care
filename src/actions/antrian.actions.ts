'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Fungsi helper untuk mengirim data ke WebSocket server
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
    
    // Kirim POST request ke WebSocket server kita
    await fetch('http://localhost:3001/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Failed to broadcast queue update:', error);
  }
}

// Aksi untuk membuat antrian baru
export async function createAntrian(data: {
  namaPemilik: string;
  namaKucing: string;
  nomorTelepon: string;
  jenisLayanan: string;
}) {
  try {
    const lastAntrian = await prisma.antrian.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    const newNomorAntrian = (lastAntrian?.nomorAntrian || 0) + 1;

    const antrianBaru = await prisma.antrian.create({
      data: {
        ...data,
        nomorAntrian: newNomorAntrian,
        status: 'Menunggu',
      },
    });

    revalidatePath('/');
    revalidatePath('/admin');
    await broadcastQueueUpdate(); // Panggil fungsi broadcast
    return { success: true, data: antrianBaru };
  } catch {
    return { success: false, message: 'Gagal membuat antrian.' };
  }
}

// Aksi untuk mengubah status antrian (dipanggil dari admin)
export async function updateStatusAntrian(id: number, status: 'Dilayani' | 'Selesai') {
  try {
    const antrianToUpdate = await prisma.antrian.findUnique({ where: { id } });

    await prisma.antrian.update({
      where: { id },
      data: { status },
    });

    // Jika antrian selesai, buat riwayat layanan
    if (status === 'Selesai' && antrianToUpdate) {
        const kucing = await prisma.kucing.findFirst({
            where: {
                nama: antrianToUpdate.namaKucing,
                pemilik: { nama: antrianToUpdate.namaPemilik }
            }
        });

        if (kucing) {
            await prisma.riwayatLayanan.create({
                data: {
                    kucingId: kucing.id,
                    tanggal: new Date(),
                    jenisLayanan: antrianToUpdate.jenisLayanan,
                    catatan: 'Layanan selesai melalui antrian.',
                }
            });
        }
    }


    revalidatePath('/');
    revalidatePath('/admin/antrian');
    await broadcastQueueUpdate(); // Panggil fungsi broadcast
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Gagal update status.' };
  }
}