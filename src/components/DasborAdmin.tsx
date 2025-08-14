'use client';
import { useState, useTransition } from 'react';
import { Antrian } from '@prisma/client'; // Import tipe Antrian dari Prisma
import { updateStatusAntrian } from '@/actions/antrian.actions';

export default function DasborAdmin({ initialAntrian }: { initialAntrian: Antrian[] }) {
  const [isPending, startTransition] = useTransition();
  // Tidak perlu state untuk antrian, karena Next.js akan revalidate/refresh halaman

  const handlePanggil = (id: number) => {
    startTransition(() => {
      updateStatusAntrian(id, 'Dilayani');
    });
  };

  const handleSelesai = (id: number) => {
    startTransition(() => {
      updateStatusAntrian(id, 'Selesai');
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pemilik & Kucing</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {initialAntrian.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-brand-green">{item.nomorAntrian}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{item.namaPemilik}</div>
                <div className="text-sm text-gray-500">{item.namaKucing}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  item.status === 'Menunggu' ? 'bg-yellow-100 text-yellow-800' :
                  item.status === 'Dilayani' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                {item.status === 'Menunggu' && (
                  <button onClick={() => handlePanggil(item.id)} disabled={isPending} className="text-green-600 hover:text-green-900 disabled:text-gray-400">Panggil</button>
                )}
                {item.status === 'Dilayani' && (
                  <button onClick={() => handleSelesai(item.id)} disabled={isPending} className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400">Selesaikan</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}