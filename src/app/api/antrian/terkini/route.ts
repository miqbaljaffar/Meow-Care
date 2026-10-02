import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 10;

export async function GET() {
  try {
    const [sedangDilayani, antrianMenunggu] = await Promise.all([
      prisma.antrian.findFirst({ where: { status: 'Dilayani' } }),
      prisma.antrian.findFirst({
        where: { status: 'Menunggu' },
        orderBy: { nomorAntrian: 'asc' },
      }),
    ]);

    return NextResponse.json({
      current: sedangDilayani?.nomorAntrian ?? null,
      next: antrianMenunggu?.nomorAntrian ?? null,
    });
  } catch {
    return NextResponse.json(
      { current: null, next: null, error: 'Gagal mengambil data antrian' },
      { status: 200 }
    );
  }
}