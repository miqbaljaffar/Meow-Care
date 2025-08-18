'use client';

import { FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useTransition } from 'react';

interface AdminActionButtonsProps {
  onEdit: () => void;
  onDelete: () => Promise<{ success: boolean; message: string; }>;
}

export default function AdminActionButtons({ onEdit, onDelete }: AdminActionButtonsProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      startTransition(async () => {
        const result = await onDelete();
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <button onClick={onEdit} className="text-blue-500 transition hover:text-blue-700" aria-label="Edit">
        <FaEdit size={18} />
      </button>
      <button onClick={handleDelete} disabled={isPending} className="text-red-500 transition hover:text-red-700 disabled:text-gray-400" aria-label="Hapus">
        <FaTrash size={18} />
      </button>
    </div>
  );
}