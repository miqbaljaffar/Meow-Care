import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Handler untuk GET (mengambil semua antrian)
export async function GET() {
    try {
        const antrian = await prisma.antrian.findMany({
            orderBy: { createdAt: 'asc' }
        });
        return NextResponse.json(antrian);
    } catch (error) {
        return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
    }
}

// Handler untuk POST (membuat antrian baru)
export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { namaPemilik, namaKucing, jenisLayanan, nomorTelepon } = data;

        // Cari nomor antrian terakhir
        const lastAntrian = await prisma.antrian.findFirst({
            orderBy: { nomorAntrian: 'desc' },
        });

        const newNomorAntrian = (lastAntrian?.nomorAntrian || 0) + 1;

        const newAntrian = await prisma.antrian.create({
            data: {
                namaPemilik,
                namaKucing,
                jenisLayanan,
                nomorTelepon,
                nomorAntrian: newNomorAntrian
            },
        });

        return NextResponse.json(newAntrian, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: 'Gagal membuat antrian' }, { status: 500 });
    }
}