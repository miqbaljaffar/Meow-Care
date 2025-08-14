// src/actions/auth.actions.ts
'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z, ZodIssue } from 'zod';

const registerSchema = z.object({
  nama: z.string().min(3, "Nama harus memiliki setidaknya 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password harus memiliki setidaknya 6 karakter"),
});

export async function registerUser(data: z.infer<typeof registerSchema>) {
  try {
    const validatedData = registerSchema.parse(data);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { success: false, message: 'Email sudah digunakan.' };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    
    await prisma.user.create({
      data: {
        nama: validatedData.nama,
        email: validatedData.email,
        password: hashedPassword,
      },
    });
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues.map((e: ZodIssue) => e.message).join(', ') };
    }
    return { success: false, message: 'Gagal mendaftarkan pengguna.' };
  }
}