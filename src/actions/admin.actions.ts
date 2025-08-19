'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { mkdir, unlink } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// --- Skema Validasi untuk Layanan ---
const LayananSchema = z.object({
  nama: z.string().min(3, 'Nama layanan harus diisi.'),
  deskripsi: z.string().min(10, 'Deskripsi harus lebih detail.'),
  icon: z.string().optional(),
});

// --- CRUD Actions untuk Layanan ---

export async function createLayanan(formData: FormData) {
  const validatedFields = LayananSchema.safeParse({
    nama: formData.get('nama'),
    deskripsi: formData.get('deskripsi'),
    icon: formData.get('icon'),
  });
  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await prisma.layanan.create({ data: validatedFields.data });
    revalidatePath('/admin/layanan');
    revalidatePath('/layanan');
    return { success: true, message: 'Layanan berhasil ditambahkan.' };
  } catch (error) {
    console.error('Create Layanan Error:', error);
    return { success: false, message: 'Database Error: Gagal menambah layanan.' };
  }
}

export async function updateLayanan(id: number, formData: FormData) {
  const validatedFields = LayananSchema.safeParse({
    nama: formData.get('nama'),
    deskripsi: formData.get('deskripsi'),
    icon: formData.get('icon'),
  });

  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await prisma.layanan.update({ where: { id }, data: validatedFields.data });
    revalidatePath('/admin/layanan');
    revalidatePath('/layanan');
    return { success: true, message: 'Layanan berhasil diperbarui.' };
  } catch (error) {
    console.error('Update Layanan Error:', error);
    return { success: false, message: 'Database Error: Gagal memperbarui layanan.' };
  }
}

export async function deleteLayanan(id: number) {
  try {
    await prisma.layanan.delete({ where: { id } });
    revalidatePath('/admin/layanan');
    revalidatePath('/layanan');
    return { success: true, message: 'Layanan berhasil dihapus.' };
  } catch (error) {
    console.error('Delete Layanan Error:', error);
    return { success: false, message: 'Database Error: Gagal menghapus layanan.' };
  }
}

// --- Actions untuk Review Testimoni ---

export async function updateTestimoniStatus(id: number, status: 'PUBLISHED' | 'PENDING') {
  try {
    await prisma.testimoni.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/testimoni');
    revalidatePath('/#testimoni');
    return { success: true, message: `Status testimoni berhasil diubah.` };
  } catch (error) {
    console.error('Update Testimoni Status Error:', error);
    return { success: false, message: 'Gagal memperbarui status testimoni.' };
  }
}

export async function deleteTestimoni(id: number) {
  try {
    await prisma.testimoni.delete({ where: { id } });
    revalidatePath('/admin/testimoni');
    revalidatePath('/#testimoni');
    return { success: true, message: 'Testimoni berhasil dihapus.' };
  } catch (error) {
    console.error('Delete Testimoni Error:', error);
    return { success: false, message: 'Database Error: Gagal menghapus testimoni.' };
  }
}

// --- Skema Validasi untuk Dokter ---
const DokterSchema = z.object({
  nama: z.string().min(3, 'Nama dokter harus diisi.'),
  spesialisasi: z.string().min(5, 'Spesialisasi harus diisi.'),
  foto: z.instanceof(File).optional(),
});

// --- Fungsi Helper untuk mengelola file ---
const handleFileUpload = async (file: File): Promise<string> => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name.split('.')[0]}.webp`;
  const savePath = path.join(process.cwd(), 'public/uploads/dokter', filename);

  await mkdir(path.dirname(savePath), { recursive: true });

  await sharp(buffer).webp({ quality: 80 }).toFile(savePath);

  return `/uploads/dokter/${filename}`;
};

const deleteFile = async (filePath: string) => {
  if (!filePath) return;
  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    await unlink(fullPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('Error deleting file:', error);
    }
  }
};

// --- CRUD Actions untuk Dokter ---
export async function createDokter(formData: FormData) {
  const data = {
    nama: formData.get('nama'),
    spesialisasi: formData.get('spesialisasi'),
    foto: formData.get('foto'),
  };

  const validatedFields = DokterSchema.safeParse(data);
  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.flatten().fieldErrors };
  }

  try {
    let fotoPath: string | undefined = undefined;
    if (validatedFields.data.foto && validatedFields.data.foto.size > 0) {
      fotoPath = await handleFileUpload(validatedFields.data.foto);
    }

    await prisma.dokter.create({
      data: {
        ...validatedFields.data,
        foto: fotoPath,
      },
    });
    revalidatePath('/admin/dokter');
    revalidatePath('/#tim');
    return { success: true, message: 'Data dokter berhasil ditambahkan.' };
  } catch (error) {
    console.error('Create Dokter Error:', error);
    return { success: false, message: 'Database Error: Gagal menambah data dokter.' };
  }
}

export async function updateDokter(id: number, formData: FormData) {
  const data = {
    nama: formData.get('nama'),
    spesialisasi: formData.get('spesialisasi'),
    foto: formData.get('foto'),
  };

  const validatedFields = DokterSchema.safeParse(data);
  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const dokterToUpdate = await prisma.dokter.findUnique({ where: { id } });
    if (!dokterToUpdate) {
      return { success: false, message: 'Data dokter tidak ditemukan.' };
    }

    let fotoPath: string | undefined = dokterToUpdate.foto || undefined;

    if (validatedFields.data.foto && validatedFields.data.foto.size > 0) {
      if (dokterToUpdate.foto) {
        await deleteFile(dokterToUpdate.foto);
      }
      fotoPath = await handleFileUpload(validatedFields.data.foto);
    }

    await prisma.dokter.update({
      where: { id },
      data: {
        nama: validatedFields.data.nama,
        spesialisasi: validatedFields.data.spesialisasi,
        foto: fotoPath,
      },
    });
    revalidatePath('/admin/dokter');
    revalidatePath('/#tim');
    return { success: true, message: 'Data dokter berhasil diperbarui.' };
  } catch (error) {
    console.error('Update Dokter Error:', error);
    return { success: false, message: 'Database Error: Gagal memperbarui data dokter.' };
  }
}

export async function deleteDokter(id: number) {
  try {
    const dokterToDelete = await prisma.dokter.findUnique({ where: { id } });
    if (dokterToDelete?.foto) {
      await deleteFile(dokterToDelete.foto);
    }

    await prisma.dokter.delete({ where: { id } });
    revalidatePath('/admin/dokter');
    revalidatePath('/#tim');
    return { success: true, message: 'Data dokter berhasil dihapus.' };
  } catch (error) {
    console.error('Delete Dokter Error:', error);
    return { success: false, message: 'Database Error: Gagal menghapus data dokter.' };
  }
}
