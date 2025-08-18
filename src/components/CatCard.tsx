'use client';

import { useState } from 'react';
import { Kucing } from '@prisma/client';
import { Cake, Cat, Pencil, Trash2 } from 'lucide-react';
import { deleteCat } from '@/actions/profil.actions';
import CatFormModal from './CatFormModal';
import toast from 'react-hot-toast';

interface CatCardProps {
  kucing: Kucing;
}

export default function CatCard({ kucing }: CatCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Apakah Anda yakin ingin menghapus data "${kucing.nama}"?`)) {
      const result = await deleteCat(kucing.id.toString());
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <>
      <div className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-green hover:shadow-lg">
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800">{kucing.nama}</h3>
          
          <div className="mt-4 space-y-3 text-gray-600">
            <div className="flex items-center gap-3">
              <Cat className="h-5 w-5 text-gray-400" />
              <span>{kucing.spesies}</span>
            </div>
            <div className="flex items-center gap-3">
              <Cake className="h-5 w-5 text-gray-400" />
              <span>{kucing.umur} tahun</span>
            </div>
          </div>
        </div>
        
        {/* Tombol Aksi - Muncul saat hover */}
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full p-2 text-blue-600 transition-colors hover:bg-blue-100"
            aria-label="Edit Kucing"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="rounded-full p-2 text-red-600 transition-colors hover:bg-red-100"
            aria-label="Hapus Kucing"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <CatFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={kucing.pemilikId.toString()}
        kucingToEdit={kucing}
      />
    </>
  );
}