import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Revalidate data setiap 10 detik
export const revalidate = 10;

export async function GET() {
  const [sedangDilayani, antrianMenunggu] = await Promise.all([
    prisma.antrian.findFirst({ where: { status: 'Dilayani' } }),
    prisma.antrian.findFirst({ where: { status: 'Menunggu' }, orderBy: { nomorAntrian: 'asc' } }),
  ]);

  return NextResponse.json({
    current: sedangDilayani?.nomorAntrian,
    next: antrianMenunggu?.nomorAntrian,
  });
}