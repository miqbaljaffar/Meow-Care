'use server';

import prisma from '@/lib/prisma';
import { differenceInMinutes, subDays, startOfDay, endOfDay } from 'date-fns';

/**
 * Mengambil statistik dasar untuk dasbor analitik.
 */
export async function getAnalyticsData() {
  try {
    // 1. Menghitung jumlah antrian (harian, mingguan, bulanan)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const [
      jumlahAntrianHariIni,
      jumlahAntrianMingguIni,
      jumlahAntrianBulanIni,
    ] = await Promise.all([
      prisma.antrian.count({ where: { createdAt: { gte: today } } }),
      prisma.antrian.count({ where: { createdAt: { gte: oneWeekAgo } } }),
      prisma.antrian.count({ where: { createdAt: { gte: oneMonthAgo } } }),
    ]);

    // 2. Menemukan layanan terpopuler
    const layananPopuler = await prisma.antrian.groupBy({
      by: ['jenisLayanan'],
      _count: {
        jenisLayanan: true,
      },
      orderBy: {
        _count: {
          jenisLayanan: 'desc',
        },
      },
      take: 5,
    });

    // 3. Menghitung rata-rata waktu tunggu
    const antrianSelesai = await prisma.antrian.findMany({
      where: { status: 'Selesai' },
      select: { createdAt: true, updatedAt: true },
    });

    let totalWaktuTunggu = 0;
    if (antrianSelesai.length > 0) {
      const totalMenit = antrianSelesai.reduce((acc, antrian) => {
        const waktuTunggu = differenceInMinutes(antrian.updatedAt, antrian.createdAt);
        return acc + waktuTunggu;
      }, 0);
      totalWaktuTunggu = Math.round(totalMenit / antrianSelesai.length);
    }
    
    // 4. DATA BARU: Menghitung tren kunjungan 7 hari terakhir
    const trendData = [];
    for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const start = startOfDay(date);
        const end = endOfDay(date);

        const count = await prisma.antrian.count({
            where: {
                createdAt: {
                    gte: start,
                    lte: end,
                },
            },
        });

        trendData.push({
            date: date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' }),
            'Jumlah Kunjungan': count,
        });
    }


    return {
      success: true,
      data: {
        jumlahAntrian: {
          harian: jumlahAntrianHariIni,
          mingguan: jumlahAntrianMingguIni,
          bulanan: jumlahAntrianBulanIni,
        },
        layananPopuler: layananPopuler.map(item => ({
            nama: item.jenisLayanan,
            jumlah: item._count.jenisLayanan
        })),
        rataRataWaktuTunggu: totalWaktuTunggu, // dalam menit
        trenKunjungan: trendData, // <-- Tambahkan data baru
      },
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return { success: false, message: 'Gagal mengambil data analitik.' };
  }
}