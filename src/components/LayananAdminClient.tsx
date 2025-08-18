'use client';

import { useState } from 'react';
import { Layanan } from '@prisma/client';
import { deleteLayanan } from '@/actions/admin.actions';
import LayananFormModal from '@/components/LayananFormModal';
import AdminActionButtons from '@/components/AdminActionButtons';
import { PlusCircle, Stethoscope } from 'lucide-react';

export default function LayananAdminClient({ initialLayanan }: { initialLayanan: Layanan[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLayanan, setSelectedLayanan] = useState<Layanan | undefined>(undefined);

  const handleOpenModal = (layanan?: Layanan) => {
    setSelectedLayanan(layanan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLayanan(undefined);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen Layanan</h1>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-white shadow-md transition-colors hover:bg-cyan-600">
          <PlusCircle size={20} />
          <span>Tambah Layanan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialLayanan.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div>
              <div className="flex items-center gap-3 mb-3">
                 <Stethoscope className="h-6 w-6 text-cyan-500" />
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.nama}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{item.deskripsi}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <AdminActionButtons
                    onEdit={() => handleOpenModal(item)}
                    onDelete={() => deleteLayanan(item.id)}
                />
            </div>
          </div>
        ))}
      </div>

      <LayananFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        layananToEdit={selectedLayanan}
      />
    </div>
  );
}