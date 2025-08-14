// src/app/api/antrian/terkini/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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