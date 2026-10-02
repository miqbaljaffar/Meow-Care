import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { Layanan } from '@prisma/client';
import type { ElementType } from 'react';
import { ServiceListJsonLd } from '@/components/StructuredData';
import { extractDbError } from '@/lib/log-error';

export const metadata: Metadata = {
  title: 'Layanan',
  description: 'Daftar layanan klinik kucing Meow-Care: pemeriksaan umum, vaksinasi, grooming, sterilisasi, dental care, dan konsultasi khusus dengan harga transparan.',
  keywords: ['layanan klinik kucing', 'pemeriksaan kucing', 'vaksinasi kucing', 'grooming kucing', 'sterilisasi kucing', 'dental kucing', 'meow-care'],
  alternates: {
    canonical: '/layanan',
  },
  openGraph: {
    title: 'Layanan | Meow-Care',
    description: 'Daftar layanan klinik kucing Meow-Care: pemeriksaan umum, vaksinasi, grooming, sterilisasi, dental care, dan konsultasi khusus dengan harga transparan.',
    type: 'website',
    url: '/layanan',
    images: [
      {
        url: '/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Layanan Meow-Care Klinik Kucing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Layanan | Meow-Care',
    description: 'Daftar layanan klinik kucing Meow-Care: pemeriksaan umum, vaksinasi, grooming, sterilisasi, dental care, dan konsultasi khusus dengan harga transparan.',
    images: ['/og-default.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const fallbackLayanan: Layanan[] = [
  {
    id: 1,
    nama: 'Pemeriksaan Umum',
    deskripsi:
      'Pemeriksaan menyeluruh untuk memastikan kondisi kesehatan kucing Anda optimal, termasuk suhu tubuh, detak jantung, mata, telinga, gigi, dan kulit.',
    icon: 'Stethoscope',
    harga: 150000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    nama: 'Vaksinasi Lengkap',
    deskripsi:
      'Lindungi kucing dari penyakit berbahaya seperti Panleukopenia, Rhinotracheitis, Calicivirus, dan Rabies dengan program vaksinasi lengkap.',
    icon: 'Syringe',
    harga: 300000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    nama: 'Grooming Premium',
    deskripsi:
      'Perawatan bulu lengkap: mandi, potong kuku, membersihkan telinga, sikat gigi, dan trimming bulu agar kucing Anda segar dan rapi.',
    icon: 'Scissors',
    harga: 200000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    nama: 'Konsultasi Khusus',
    deskripsi:
      'Konsultasi mendalam mengenai masalah kesehatan khusus, pola makan, perilaku, atau manajemen berat badan kucing Anda.',
    icon: 'MessageCircle',
    harga: 180000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    nama: 'Sterilisasi',
    deskripsi:
      'Tindakan operatif sterilisasi (kastrasi/spaying) yang aman dan higienis, dengan perawatan pasca-operasi.',
    icon: 'ShieldPlus',
    harga: 1500000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    nama: 'Dental Care',
    deskripsi:
      'Pembersihan karang gigi, perawatan gusi, dan pemeriksaan rongga mulut menyeluruh untuk kesehatan gigi kucing.',
    icon: 'Sparkles',
    harga: 350000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const getAllLayanan = async (): Promise<Layanan[]> => {
  try {
    const data = await prisma.layanan.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return data.length > 0 ? data : fallbackLayanan;
  } catch (error) {
    console.warn('Gagal memuat daftar layanan (fallback ditampilkan):', extractDbError(error));
    return fallbackLayanan;
  }
};

const formatRupiah = (nominal: number | null | undefined) => {
  if (!nominal) return '';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(nominal);
};

export default async function HalamanLayanan() {
  const daftarLayanan = await getAllLayanan();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://meow-care.example.com';

  return (
    <>
      <ServiceListJsonLd
        siteUrl={siteUrl}
        layanan={daftarLayanan.map((l) => ({ nama: l.nama, deskripsi: l.deskripsi }))}
      />
      <section id="layanan" className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto text-center px-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm mb-3 sm:mb-4">
          <LucideIcons.Stethoscope size={18} className="text-brand-green" />
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Layanan Klinik
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3 sm:mb-4">Pilih Layanan Kami</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          Kami menyediakan berbagai layanan kesehatan untuk memastikan sahabat Anda mendapatkan perawatan terbaik. Pilih layanan yang Anda butuhkan di bawah ini.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {daftarLayanan.map((layanan) => {
            const IconComponent = ((layanan.icon && (LucideIcons as unknown as Record<string, ElementType>)[layanan.icon]) ||
              LucideIcons.Stethoscope) as ElementType;

            return (
              <div
                key={layanan.id}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-left border border-gray-100 h-full"
              >
                <div className="flex justify-start mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-50">
                    <IconComponent size={36} className="text-brand-green" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{layanan.nama}</h3>
                <p className="text-gray-600 flex-grow leading-relaxed mb-5">{layanan.deskripsi}</p>
                <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
                  {layanan.harga != null && (
                    <div className="text-lg sm:text-xl font-bold text-brand-green">
                      {formatRupiah(layanan.harga)}
                    </div>
                  )}
                  <Link
                    href={`/antrian/baru?layanan=${encodeURIComponent(layanan.nama)}`}
                    className="w-full sm:w-auto text-center inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-brand-green text-white font-semibold rounded-full shadow-sm hover:bg-brand-green-dark transition-all hover:shadow-md active:scale-[0.98]"
                  >
                    Daftar Layanan Ini
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}