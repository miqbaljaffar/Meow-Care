'use server'; // Wajib ada di baris paling atas

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Aksi untuk membuat antrian baru
export async function createAntrian(data: {
  namaPemilik: string;
  namaKucing: string;
  nomorTelepon: string;
}) {
  try {
    const lastAntrian = await prisma.antrian.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    const newNomorAntrian = (lastAntrian?.nomorAntrian || 0) + 1;

    const antrianBaru = await prisma.antrian.create({
      data: {
        ...data,
        jenisLayanan: 'Pemeriksaan Umum', // Default atau bisa ditambahkan di form
        nomorAntrian: newNomorAntrian,
        status: 'Menunggu',
      },
    });

    revalidatePath('/'); // Refresh data di halaman utama
    revalidatePath('/admin'); // Refresh data di halaman admin
    return { success: true, data: antrianBaru };
  } catch (error) {
    return { success: false, message: 'Gagal membuat antrian.' };
  }
}

// Aksi untuk mengubah status antrian (dipanggil dari admin)
export async function updateStatusAntrian(id: number, status: 'Dilayani' | 'Selesai') {
  try {
    // Jika ada antrian yang sedang 'Dilayani', selesaikan dulu
    if (status === 'Dilayani') {
      await prisma.antrian.updateMany({
        where: { status: 'Dilayani' },
        data: { status: 'Selesai' },
      });
    }

    await prisma.antrian.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Gagal update status.' };
  }
}