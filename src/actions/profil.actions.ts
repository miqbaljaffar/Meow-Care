'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Mengambil data profil pengguna beserta kucing dan riwayat layanan
export async function getUserProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) },
      include: {
        kucing: {
          include: {
            riwayat: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

// Menambah data kucing baru
export async function addCat(data: {
  nama: string;
  spesies: string;
  umur: number;
  // foto?: string; // FOTO DIHAPUS
  userId: string;
}) {
  try {
    await prisma.kucing.create({
      data: {
        nama: data.nama,
        spesies: data.spesies,
        umur: data.umur,
        // foto: data.foto, // FOTO DIHAPUS
        pemilik: {
          connect: {
            id: parseInt(data.userId, 10),
          },
        },
      },
    });
    revalidatePath('/profil');
    return { success: true, message: 'Kucing berhasil ditambahkan.' };
  } catch (error) {
    console.error('Error adding cat:', error);
    return { success: false, message: 'Gagal menambahkan kucing.' };
  }
}

// Mengupdate data kucing
export async function updateCat(
  id: string,
  data: {
    nama: string;
    spesies: string;
    umur: number;
    // foto?: string; // FOTO DIHAPUS
  }
) {
  try {
    await prisma.kucing.update({
      where: { id: parseInt(id, 10) },
      data,
    });
    revalidatePath('/profil');
    return { success: true, message: 'Data kucing berhasil diperbarui.' };
  } catch (error) {
    console.error('Error updating cat:', error);
    return { success: false, message: 'Gagal memperbarui data kucing.' };
  }
}

// Menghapus data kucing
export async function deleteCat(id: string) {
  try {
    // Hapus dulu riwayat layanan yang terkait untuk menghindari error constraint
    await prisma.riwayatLayanan.deleteMany({
      where: { kucingId: parseInt(id, 10) },
    });
    // Baru hapus kucingnya
    await prisma.kucing.delete({
      where: { id: parseInt(id, 10) },
    });
    revalidatePath('/profil');
    return { success: true, message: 'Kucing berhasil dihapus.' };
  } catch (error) {
    console.error('Error deleting cat:', error);
    return { success: false, message: 'Gagal menghapus kucing.' };
  }
}