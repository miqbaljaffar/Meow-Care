import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Ticket, Users, Clock } from 'lucide-react';
import { Metadata } from 'next';

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
        lt: antrian.createdAt, // Perbandingan berdasarkan waktu pembuatan untuk akurasi
      },
    },
  });

  return { ...antrian, antrianDiDepan };
}

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseInt(params.id, 10);
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

export default async function HalamanStatusAntrian({ params }: Props) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    notFound();
  }

  const detail = await getDetailAntrian(id);

  if (!detail) {
    notFound();
  }

  // Menentukan warna dan teks status
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

  return (
    <div className="container mx-auto py-20 flex flex-col items-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
        <Ticket className="mx-auto text-brand-green mb-4" size={64} />
        <h1 className="text-2xl font-bold text-gray-800">Nomor Antrian Anda</h1>
        <p className="text-8xl font-extrabold text-brand-green my-4">{detail.nomorAntrian}</p>
        <div className="text-left space-y-3 bg-gray-50 p-4 rounded-lg">
          <p>
            <strong>Nama Pemilik:</strong> {detail.namaPemilik}
          </p>
          <p>
            <strong>Nama Kucing:</strong> {detail.namaKucing}
          </p>
          <p className='flex items-center'>
            <strong>Status:</strong>
            <span className={`font-semibold ml-2 px-2 py-1 text-sm rounded-full ${statusInfo.color}`}>
              {statusInfo.text}
            </span>
          </p>
        </div>
        <div className="mt-6 flex justify-around">
          <div className="text-center">
            <Users className="mx-auto text-gray-500" />
            <p className="text-2xl font-bold">{detail.antrianDiDepan}</p>
            <p className="text-sm text-gray-500">Antrian di Depan</p>
          </div>
          <div className="text-center">
            <Clock className="mx-auto text-gray-500" />
            <p className="text-2xl font-bold">~{detail.antrianDiDepan * 5} Menit</p>
            <p className="text-sm text-gray-500">Estimasi Waktu</p>
          </div>
        </div>
      </div>
    </div>
  );
}