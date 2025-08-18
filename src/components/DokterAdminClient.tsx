'use client';

import { useState } from 'react';
import { Dokter } from '@prisma/client';
import { deleteDokter } from '@/actions/admin.actions';
import DokterFormModal from '@/components/DokterFormModal';
import AdminActionButtons from '@/components/AdminActionButtons';
import { PlusCircle, User } from 'lucide-react';
import Image from 'next/image';

// Ini adalah Client Component, menangani state dan event
export default function DokterAdminClient({ initialDokter }: { initialDokter: Dokter[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDokter, setSelectedDokter] = useState<Dokter | undefined>(undefined);

  const handleOpenModal = (dokter?: Dokter) => {
    setSelectedDokter(dokter);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDokter(undefined);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen Dokter</h1>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-white shadow-md transition-colors hover:bg-cyan-600">
          <PlusCircle size={20} />
          <span>Tambah Dokter</span>
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Foto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Dokter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spesialisasi</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {initialDokter.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {item.foto ? (
                      <Image src={item.foto} alt={item.nama} width={48} height={48} className="object-cover" />
                    ) : (
                      <User className="text-gray-400" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{item.nama}</td>
                <td className="px-6 py-4 text-gray-600">{item.spesialisasi}</td>
                <td className="px-6 py-4 text-right">
                  <AdminActionButtons
                    onEdit={() => handleOpenModal(item)}
                    onDelete={() => deleteDokter(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DokterFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        dokterToEdit={selectedDokter}
      />
    </div>
  );
}
