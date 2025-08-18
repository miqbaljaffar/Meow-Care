import prisma from '@/lib/prisma';
import {notFound} from 'next/navigation';
import { Ticket, Users, Clock } from 'lucide-react';

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
      nomorAntrian: {
        lt: antrian.nomorAntrian
      }
    }
  });

  return { ...antrian, antrianDiDepan };
}

export default async function HalamanStatusAntrian({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const detail = await getDetailAntrian(id);

  if (!detail) notFound();

  return (
    <div className="container mx-auto py-20 flex flex-col items-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
        <Ticket className="mx-auto text-brand-green mb-4" size={64} />
        <h1 className="text-2xl font-bold text-gray-800">Nomor Antrian Anda</h1>
        <p className="text-8xl font-extrabold text-brand-green my-4">{detail.nomorAntrian}</p>
        <div className="text-left space-y-3 bg-gray-50 p-4 rounded-lg">
          <p><strong>Nama Pemilik:</strong> {detail.namaPemilik}</p>
          <p><strong>Nama Kucing:</strong> {detail.namaKucing}</p>
          <p><strong>Status:</strong> 
            <span className="font-semibold ml-2 px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
              {detail.status}
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