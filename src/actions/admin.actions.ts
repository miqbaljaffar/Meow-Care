'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

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
    revalidatePath('/layanan'); // Revalidate halaman publik juga
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


// --- Skema Validasi untuk Testimoni ---
const TestimoniSchema = z.object({
    namaPelanggan: z.string().min(3, 'Nama pelanggan harus diisi.'),
    namaKucing: z.string().min(1, 'Nama kucing harus diisi.'),
    fotoKucing: z.string().url('URL foto tidak valid.').optional().or(z.literal('')), // <-- TAMBAHKAN INI
    kutipan: z.string().min(10, 'Kutipan testimoni harus lebih detail.'),
});


// --- CRUD Actions untuk Testimoni ---

export async function createTestimoni(formData: FormData) {
    const validatedFields = TestimoniSchema.safeParse({
        namaPelanggan: formData.get('namaPelanggan'),
        namaKucing: formData.get('namaKucing'),
        fotoKucing: formData.get('fotoKucing'), 
        kutipan: formData.get('kutipan'),
    });

    if (!validatedFields.success) {
        return { success: false, message: validatedFields.error.flatten().fieldErrors };
    }

    try {
        await prisma.testimoni.create({ data: validatedFields.data });
        revalidatePath('/admin/testimoni');
        revalidatePath('/#testimoni');
        return { success: true, message: 'Testimoni berhasil ditambahkan.' };
    } catch (error) {
        console.error('Create Testimoni Error:', error);
        return { success: false, message: 'Database Error: Gagal menambah testimoni.' };
    }
}

export async function updateTestimoni(id: number, formData: FormData) {
    const validatedFields = TestimoniSchema.safeParse({
        namaPelanggan: formData.get('namaPelanggan'),
        namaKucing: formData.get('namaKucing'),
        kutipan: formData.get('kutipan'),
    });

    if (!validatedFields.success) {
        return { success: false, message: validatedFields.error.flatten().fieldErrors };
    }

    try {
        await prisma.testimoni.update({ where: { id }, data: validatedFields.data });
        revalidatePath('/admin/testimoni');
        revalidatePath('/#testimoni');
        return { success: true, message: 'Testimoni berhasil diperbarui.' };
    } catch (error) {
        console.error('Update Testimoni Error:', error);
        return { success: false, message: 'Database Error: Gagal memperbarui testimoni.' };
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
  foto: z.string().url('URL foto tidak valid.').optional().or(z.literal('')),
});

// --- CRUD Actions untuk Dokter ---

export async function createDokter(formData: FormData) {
  const validatedFields = DokterSchema.safeParse({
    nama: formData.get('nama'),
    spesialisasi: formData.get('spesialisasi'),
    foto: formData.get('foto'),
  });

  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await prisma.dokter.create({ data: validatedFields.data });
    revalidatePath('/admin/dokter');
    revalidatePath('/#tim'); // Revalidate section tim di beranda
    return { success: true, message: 'Data dokter berhasil ditambahkan.' };
  } catch (error) {
    console.error('Create Dokter Error:', error);
    return { success: false, message: 'Database Error: Gagal menambah data dokter.' };
  }
}

export async function updateDokter(id: number, formData: FormData) {
  const validatedFields = DokterSchema.safeParse({
    nama: formData.get('nama'),
    spesialisasi: formData.get('spesialisasi'),
    foto: formData.get('foto'),
  });

  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await prisma.dokter.update({ where: { id }, data: validatedFields.data });
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
    await prisma.dokter.delete({ where: { id } });
    revalidatePath('/admin/dokter');
    revalidatePath('/#tim');
    return { success: true, message: 'Data dokter berhasil dihapus.' };
  } catch (error) {
    console.error('Delete Dokter Error:', error);
    return { success: false, message: 'Database Error: Gagal menghapus data dokter.' };
  }
}
