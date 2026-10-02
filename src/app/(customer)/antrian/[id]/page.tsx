import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Ticket, Users, Clock } from 'lucide-react';
import type { Metadata } from 'next';

// 1. Ubah params (dan searchParams) menjadi Promise
type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getDetailAntrian(id: number) {
  const antrian = await prisma.antrian.findUnique({
    where: { id },
  });

  if (!antrian) {
    return null;
  }

  const antrianDiDepan = await prisma.antrian.count({
    where: {
      status: 'Menunggu',
      createdAt: {
        lt: antrian.createdAt,
      },
    },
  });

  return { ...antrian, antrianDiDepan };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // 2. Await params sebelum mengambil id
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  
  if (isNaN(id)) {
    return {
      title: 'Antrian Tidak Ditemukan',
    };
  }

  const detail = await getDetailAntrian(id);

  if (!detail) {
    return {
      title: 'Antrian Tidak Ditemukan',
    };
  }

  return {
    title: `Status Antrian #${detail.nomorAntrian} - Meow-Care`,
    description: `Status antrian untuk ${detail.namaPemilik} dengan kucing bernama ${detail.namaKucing}.`,
  };
}

export default async function HalamanStatusAntrian({ params }: PageProps) {
  // 3. Await params sebelum mengambil id
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  
  if (isNaN(id)) {
    notFound();
  }

  const detail = await getDetailAntrian(id);

  if (!detail) {
    notFound();
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Menunggu':
        return { text: 'Menunggu', color: 'bg-yellow-100 text-yellow-800' };
      case 'Dilayani':
        return { text: 'Sedang Dilayani', color: 'bg-green-100 text-green-800' };
      case 'Selesai':
        return { text: 'Selesai', color: 'bg-blue-100 text-blue-800' };
      default:
        return { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const statusInfo = getStatusInfo(detail.status);

  // ... (Sisa kode return JSX tetap sama dan tidak perlu diubah)
  return (
    <div className="container mx-auto py-12 sm:py-20 flex flex-col items-center px-4">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
        <Ticket className="mx-auto text-brand-green mb-4" size={48} />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Nomor Antrian Anda</h1>
        <p className="text-6xl sm:text-8xl font-extrabold text-brand-green my-4 sm:my-6 leading-none">
          {detail.nomorAntrian}
        </p>
        <div className="text-left space-y-3 bg-gray-50 p-4 sm:p-5 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span className="text-sm text-gray-500">Nama Pemilik</span>
            <span className="font-semibold text-gray-900">{detail.namaPemilik}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span className="text-sm text-gray-500">Nama Kucing</span>
            <span className="font-semibold text-gray-900">{detail.namaKucing}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="text-sm text-gray-500">Status</span>
            <span className={`inline-flex items-center font-semibold px-3 py-1 text-xs sm:text-sm rounded-full ${statusInfo.color}`}>
              {statusInfo.text}
            </span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 divide-x divide-gray-100">
          <div className="text-center px-2">
            <Users className="mx-auto text-gray-500 mb-1" size={24} />
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{detail.antrianDiDepan}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Antrian di Depan</p>
          </div>
          <div className="text-center px-2">
            <Clock className="mx-auto text-gray-500 mb-1" size={24} />
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              ~{detail.antrianDiDepan * 5}
              <span className="text-base font-medium ml-1">mnt</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Estimasi Waktu</p>
          </div>
        </div>
      </div>
    </div>
  );
}