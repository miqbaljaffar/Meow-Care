'use client';

import { useState } from 'react';
import { Kucing } from '@prisma/client';
import { FaBirthdayCake, FaPaw, FaTrash, FaEdit } from 'react-icons/fa';
import { deleteCat } from '@/actions/profil.actions';
import CatFormModal from './CatFormModal'; // Komponen Modal Form

interface CatCardProps {
  kucing: Kucing;
}

export default function CatCard({ kucing }: CatCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    if (confirm('Apakah Anda yakin ingin menghapus data kucing ini?')) {
      // FIX: Mengubah kucing.id (number) menjadi string
      const result = await deleteCat(kucing.id.toString());
      if (!result.success) {
        alert(result.message);
      }
    }
  };

  return (
    <>
      <div className="transform rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-cyan-100">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">{kucing.nama}</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-500 transition hover:text-blue-700"
              aria-label="Edit Kucing"
            >
              <FaEdit size={20} />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 transition hover:text-red-700"
              aria-label="Hapus Kucing"
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <FaPaw className="text-cyan-500" />
            <span>Spesies: {kucing.spesies}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <FaBirthdayCake className="text-cyan-500" />
            <span>Umur: {kucing.umur} tahun</span>
          </div>
        </div>
      </div>

      <CatFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // FIX: Menggunakan kucing.pemilikId dan mengubahnya menjadi string
        userId={kucing.pemilikId.toString()}
        kucingToEdit={kucing}
      />
    </>
  );
}