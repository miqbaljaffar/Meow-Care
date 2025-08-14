'use client';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CatFormModal from './CatFormModal';

interface AddCatButtonProps {
  userId: string;
}

export default function AddCatButton({ userId }: AddCatButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-white shadow-md transition-all duration-300 hover:bg-cyan-600 hover:shadow-lg"
      >
        <FaPlus />
        <span>Tambah Kucing</span>
      </button>
      <CatFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
      />
    </>
  );
}