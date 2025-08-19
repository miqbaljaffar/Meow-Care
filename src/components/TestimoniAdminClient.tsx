'use client';

import { useTransition } from 'react';
import { Testimoni, RiwayatLayanan, Kucing, User } from '@prisma/client';
import { deleteTestimoni, updateTestimoniStatus } from '@/actions/admin.actions';
import { CheckCircle, XCircle, Trash2, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

// Definisikan tipe data yang lebih lengkap
type FullTestimoni = Testimoni & {
  riwayatLayanan: RiwayatLayanan & {
    kucing: Kucing & {
      pemilik: User;
    };
  };
};

export default function TestimoniAdminClient({ initialTestimoni }: { initialTestimoni: FullTestimoni[] }) {
  const [isPending, startTransition] = useTransition();

  const handleUpdateStatus = (id: number, status: 'PUBLISHED' | 'PENDING') => {
    startTransition(async () => {
      const result = await updateTestimoniStatus(id, status);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
      startTransition(async () => {
        const result = await deleteTestimoni(id);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Review Testimoni Pelanggan</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pelanggan & Kucing</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kutipan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {initialTestimoni.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <div className="font-medium">{item.riwayatLayanan.kucing.pemilik.nama}</div>
                  <div className="text-sm text-gray-500">{item.riwayatLayanan.kucing.nama}</div>
                </td>
                <td className="px-6 py-4 italic text-gray-600 max-w-sm">"{item.kutipan}"</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {item.status === 'PUBLISHED' ? <CheckCircle size={12} /> : <Clock size={12} />}
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    {item.status === 'PENDING' && (
                      <button onClick={() => handleUpdateStatus(item.id, 'PUBLISHED')} disabled={isPending} className="text-green-500 hover:text-green-700 disabled:text-gray-400" aria-label="Setujui">
                        <CheckCircle size={18} />
                      </button>
                    )}
                     {item.status === 'PUBLISHED' && (
                      <button onClick={() => handleUpdateStatus(item.id, 'PENDING')} disabled={isPending} className="text-yellow-500 hover:text-yellow-700 disabled:text-gray-400" aria-label="Batal Publikasi">
                        <XCircle size={18} />
                      </button>
                    )}
                    <button onClick={() => handleDelete(item.id)} disabled={isPending} className="text-red-500 hover:text-red-700 disabled:text-gray-400" aria-label="Hapus">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}