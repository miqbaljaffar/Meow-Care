'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { mkdir, unlink } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// --- General File Handling Utilities (Refactored) ---

/**
 * Handles file upload, compression to WebP, and saving to a specified subfolder.
 * @param file The file to upload.
 * @param subfolder The subfolder within 'public/uploads' (e.g., 'dokter', 'artikel').
 * @returns The public path to the saved file.
 */
const handleFileUpload = async (file: File, subfolder: string): Promise<string> => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name.split('.')[0]}.webp`;
  const savePath = path.join(process.cwd(), `public/uploads/${subfolder}`, filename);

  // Ensure the directory exists
  await mkdir(path.dirname(savePath), { recursive: true });

  // Compress and save the image as WebP
  await sharp(buffer).webp({ quality: 80 }).toFile(savePath);

  return `/uploads/${subfolder}/${filename}`;
};

/**
 * Deletes a file from the public directory.
 * @param filePath The public path of the file to delete (e.g., '/uploads/dokter/image.webp').
 */
const deleteFile = async (filePath: string | null | undefined) => {
  if (!filePath) return;
  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    await unlink(fullPath);
  } catch (error) {
    // Ignore error if file doesn't exist, but log other errors
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('Error deleting file:', error);
    }
  }
};


// --- Layanan ---
const LayananSchema = z.object({
  nama: z.string().min(3, 'Nama layanan harus diisi.'),
  deskripsi: z.string().min(10, 'Deskripsi harus lebih detail.'),
  icon: z.string().optional(),
});

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
  } catch (_error) {
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
  } catch (_error) {
    return { success: false, message: 'Database Error: Gagal memperbarui layanan.' };
  }
}

export async function deleteLayanan(id: number) {
  try {
    await prisma.layanan.delete({ where: { id } });
    revalidatePath('/admin/layanan');
    revalidatePath('/layanan');
    return { success: true, message: 'Layanan berhasil dihapus.' };
  } catch (_error) {
    return { success: false, message: 'Database Error: Gagal menghapus layanan.' };
  }
}


// --- Testimoni ---
export async function updateTestimoniStatus(id: number, status: 'PUBLISHED' | 'PENDING') {
  try {
    await prisma.testimoni.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/testimoni');
    revalidatePath('/#testimoni');
    return { success: true, message: `Status testimoni berhasil diubah.` };
  } catch (_error) {
    return { success: false, message: 'Gagal memperbarui status testimoni.' };
  }
}

export async function deleteTestimoni(id: number) {
  try {
    await prisma.testimoni.delete({ where: { id } });
    revalidatePath('/admin/testimoni');
    revalidatePath('/#testimoni');
    return { success: true, message: 'Testimoni berhasil dihapus.' };
  } catch (_error) {
    return { success: false, message: 'Database Error: Gagal menghapus testimoni.' };
  }
}


// --- Dokter ---
const DokterSchema = z.object({
  nama: z.string().min(3, 'Nama dokter harus diisi.'),
  spesialisasi: z.string().min(5, 'Spesialisasi harus diisi.'),
  foto: z.instanceof(File).optional(),
});

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
    let fotoPath: string | undefined = undefined;
    const fotoFile = validatedFields.data.foto;
    if (fotoFile && fotoFile.size > 0) {
      fotoPath = await handleFileUpload(fotoFile, 'dokter');
    }

    await prisma.dokter.create({
      data: {
        nama: validatedFields.data.nama,
        spesialisasi: validatedFields.data.spesialisasi,
        foto: fotoPath,
      },
    });
    revalidatePath('/admin/dokter');
    revalidatePath('/#tim');
    return { success: true, message: 'Data dokter berhasil ditambahkan.' };
  } catch (_error) {
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
    const dokterToUpdate = await prisma.dokter.findUnique({ where: { id } });
    if (!dokterToUpdate) {
      return { success: false, message: 'Data dokter tidak ditemukan.' };
    }

    let fotoPath: string | undefined = dokterToUpdate.foto || undefined;
    const fotoFile = validatedFields.data.foto;

    if (fotoFile && fotoFile.size > 0) {
      await deleteFile(dokterToUpdate.foto); // Delete old photo
      fotoPath = await handleFileUpload(fotoFile, 'dokter'); // Upload new one
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
  } catch (_error) {
    return { success: false, message: 'Database Error: Gagal memperbarui data dokter.' };
  }
}

export async function deleteDokter(id: number) {
  try {
    const dokterToDelete = await prisma.dokter.findUnique({ where: { id } });
    await deleteFile(dokterToDelete?.foto); // Delete photo from storage

    await prisma.dokter.delete({ where: { id } });
    revalidatePath('/admin/dokter');
    revalidatePath('/#tim');
    return { success: true, message: 'Data dokter berhasil dihapus.' };
  } catch (_error) {
    return { success: false, message: 'Database Error: Gagal menghapus data dokter.' };
  }
}


// --- Artikel ---
const ArtikelSchema = z.object({
  judul: z.string().min(5, 'Judul artikel harus lebih dari 5 karakter.'),
  slug: z.string().min(3, 'Slug harus diisi.').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.'),
  kutipan: z.string().min(10, 'Kutipan harus lebih detail.').max(200, 'Kutipan terlalu panjang.'),
  konten: z.string().min(50, 'Konten artikel terlalu pendek.'),
  kategori: z.string().optional(),
  status: z.enum(['draf', 'terbit']),
  // --- FIX IS HERE ---
  penulisId: z.coerce.number().min(1, { message: 'Penulis harus dipilih.' }),
  gambar: z.instanceof(File).optional(),
});

export async function createArtikel(formData: FormData) {
  const validatedFields = ArtikelSchema.safeParse({
    judul: formData.get('judul'),
    slug: formData.get('slug'),
    kutipan: formData.get('kutipan'),
    konten: formData.get('konten'),
    kategori: formData.get('kategori'),
    status: formData.get('status'),
    penulisId: formData.get('penulisId'),
    gambar: formData.get('gambar'),
  });

  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.flatten().fieldErrors };
  }
  
  const existingSlug = await prisma.artikel.findUnique({ where: { slug: validatedFields.data.slug } });
  if (existingSlug) {
    return { success: false, message: 'Slug ini sudah digunakan. Harap gunakan slug lain.' };
  }

  try {
    let gambarPath: string | undefined = undefined;
    const gambarFile = validatedFields.data.gambar;
    if (gambarFile && gambarFile.size > 0) {
      gambarPath = await handleFileUpload(gambarFile, 'artikel');
    }

    await prisma.artikel.create({
      data: {
        judul: validatedFields.data.judul,
        slug: validatedFields.data.slug,
        kutipan: validatedFields.data.kutipan,
        konten: validatedFields.data.konten,
        kategori: validatedFields.data.kategori,
        status: validatedFields.data.status,
        penulisId: validatedFields.data.penulisId,
        gambar: gambarPath,
      },
    });
    revalidatePath('/admin/artikel');
    revalidatePath('/blog');
    return { success: true, message: 'Artikel berhasil ditambahkan.' };
  } catch (_error) {
    return { success: false, message: 'Database Error: Gagal menambah artikel.' };
  }
}

export async function updateArtikel(id: number, formData: FormData) {
  const validatedFields = ArtikelSchema.safeParse({
    judul: formData.get('judul'),
    slug: formData.get('slug'),
    kutipan: formData.get('kutipan'),
    konten: formData.get('konten'),
    kategori: formData.get('kategori'),
    status: formData.get('status'),
    penulisId: formData.get('penulisId'),
    gambar: formData.get('gambar'),
  });

  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.flatten().fieldErrors };
  }
  
  const existingSlug = await prisma.artikel.findFirst({ where: { slug: validatedFields.data.slug, NOT: { id } } });
  if (existingSlug) {
    return { success: false, message: 'Slug ini sudah digunakan oleh artikel lain.' };
  }

  try {
    const artikelToUpdate = await prisma.artikel.findUnique({ where: { id } });
    if (!artikelToUpdate) {
        return { success: false, message: 'Artikel tidak ditemukan.' };
    }
    
    let gambarPath: string | undefined = artikelToUpdate.gambar || undefined;
    const gambarFile = validatedFields.data.gambar;

    if (gambarFile && gambarFile.size > 0) {
        await deleteFile(artikelToUpdate.gambar);
        gambarPath = await handleFileUpload(gambarFile, 'artikel');
    }

    await prisma.artikel.update({
      where: { id },
      data: {
        judul: validatedFields.data.judul,
        slug: validatedFields.data.slug,
        kutipan: validatedFields.data.kutipan,
        konten: validatedFields.data.konten,
        kategori: validatedFields.data.kategori,
        status: validatedFields.data.status,
        penulisId: validatedFields.data.penulisId,
        gambar: gambarPath,
      },
    });
    revalidatePath('/admin/artikel');
    revalidatePath('/blog');
    revalidatePath(`/blog/${validatedFields.data.slug}`);
    return { success: true, message: 'Artikel berhasil diperbarui.' };
  } catch (_error) {
    return { success: false, message: 'Database Error: Gagal memperbarui artikel.' };
  }
}

export async function deleteArtikel(id: number) {
  try {
    const artikelToDelete = await prisma.artikel.findUnique({ where: { id } });
    await deleteFile(artikelToDelete?.gambar);

    await prisma.artikel.delete({ where: { id } });

    revalidatePath('/admin/artikel');
    revalidatePath('/blog');
    return { success: true, message: 'Artikel berhasil dihapus.' };
  } catch (_error) {
    return { success: false, message: 'Database Error: Gagal menghapus artikel.' };
  }
}
