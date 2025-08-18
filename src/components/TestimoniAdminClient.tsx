'use client';

import { useState } from 'react';
import { Testimoni } from '@prisma/client';
import { deleteTestimoni } from '@/actions/admin.actions';
import TestimoniFormModal from '@/components/TestimoniFormModal';
import AdminActionButtons from '@/components/AdminActionButtons';
import { PlusCircle } from 'lucide-react';

// Ini adalah Client Component, menangani state dan event
export default function TestimoniAdminClient({ initialTestimoni }: { initialTestimoni: Testimoni[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimoni, setSelectedTestimoni] = useState<Testimoni | undefined>(undefined);

  const handleOpenModal = (testimoni?: Testimoni) => {
    setSelectedTestimoni(testimoni);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTestimoni(undefined);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen Testimoni</h1>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-white shadow-md transition-colors hover:bg-cyan-600">
          <PlusCircle size={20} />
          <span>Tambah Testimoni</span>
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pelanggan & Kucing</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kutipan</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {initialTestimoni.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <div className="font-medium">{item.namaPelanggan}</div>
                  <div className="text-sm text-gray-500">{item.namaKucing}</div>
                </td>
                {/* PERBAIKAN: Menggunakan &quot; untuk kutipan */}
                <td className="px-6 py-4 italic text-gray-600">&quot;{item.kutipan}&quot;</td>
                <td className="px-6 py-4 text-right">
                  <AdminActionButtons
                    onEdit={() => handleOpenModal(item)}
                    onDelete={() => deleteTestimoni(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TestimoniFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        testimoniToEdit={selectedTestimoni}
      />
    </div>
  );
}
