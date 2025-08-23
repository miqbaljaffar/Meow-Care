'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Skema validasi untuk pembaruan profil
const profileSchema = z.object({
  nama: z.string().min(3, 'Nama harus diisi.'),
  nomorTelepon: z.string().min(10, 'Nomor telepon tidak valid.').optional().or(z.literal('')),
});


// Mengambil data profil pengguna beserta kucing, riwayat, dan testimoni
export async function getUserProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) },
      include: {
        kucing: {
          include: {
            riwayat: {
              include: {
                testimoni: true, // <-- SERTAKAN DATA TESTIMONI
              },
              orderBy: {
                tanggal: 'desc', // Urutkan riwayat terbaru di atas
              },
            },
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

// FUNGSI BARU: Untuk update nama dan nomor telepon
export async function updateUserProfile(userId: string, formData: FormData) {
  const validatedFields = profileSchema.safeParse({
    nama: formData.get('nama'),
    nomorTelepon: formData.get('nomorTelepon'),
  });

  if (!validatedFields.success) {
    return { success: false, message: 'Data tidak valid.' };
  }

  try {
    await prisma.user.update({
      where: { id: parseInt(userId, 10) },
      data: {
        nama: validatedFields.data.nama,
        nomorTelepon: validatedFields.data.nomorTelepon,
      },
    });
    revalidatePath('/profil');
    return { success: true, message: 'Profil berhasil diperbarui.' };
  } catch {
    return { success: false, message: 'Gagal memperbarui profil.' };
  }
}


// Menambah data kucing baru
export async function addCat(data: {
  nama: string;
  spesies: string;
  umur: number;
  userId: string;
}) {
  try {
    await prisma.kucing.create({
      data: {
        nama: data.nama,
        spesies: data.spesies,
        umur: data.umur,
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
    // Hapus dulu testimoni yang terkait dengan riwayat layanan kucing ini
    await prisma.testimoni.deleteMany({
        where: {
            riwayatLayanan: {
                kucingId: parseInt(id, 10)
            }
        }
    });
    
    // Hapus riwayat layanan yang terkait
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
