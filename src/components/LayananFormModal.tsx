'use client';

import { useState, FormEvent } from 'react';
import { Layanan } from '@prisma/client';
import { createLayanan, updateLayanan } from '@/actions/admin.actions';
import toast from 'react-hot-toast';

interface LayananFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  layananToEdit?: Layanan;
}

export default function LayananFormModal({ isOpen, onClose, layananToEdit }: LayananFormModalProps) {
  const [isPending, setIsPending] = useState(false);
  const isEditMode = !!layananToEdit;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);

    const result = isEditMode
      ? await updateLayanan(layananToEdit.id, formData)
      : await createLayanan(formData);

    if (result.success) {
      toast.success(result.message as string);
      onClose();
    } else {
      if (typeof result.message === 'string') {
        toast.error(result.message);
      } else {
        const validationErrors = Object.values(result.message).flat().join('\n');
        toast.error(`Periksa kembali isian Anda:\n${validationErrors}`);
      }
    }
    setIsPending(false);
  }
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {isEditMode ? 'Edit Layanan' : 'Tambah Layanan Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-800">Nama Layanan</label>
            <input
              id="nama"
              name="nama"
              type="text"
              defaultValue={layananToEdit?.nama}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 focus:border-2"
              required
            />
          </div>
          <div>
            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-800">Deskripsi</label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              rows={4}
              defaultValue={layananToEdit?.deskripsi}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 focus:border-2"
              required
            />
          </div>
          {/* INPUT BARU UNTUK IKON */}
          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-800">Nama Ikon (dari Lucide)</label>
            <input
              id="icon"
              name="icon"
              type="text"
              defaultValue={layananToEdit?.icon || ''}
              placeholder="Contoh: Stethoscope, ShieldCheck"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 focus:border-2"
            />
            <p className="text-xs text-gray-600 mt-1">
              Lihat daftar ikon di <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 underline">lucide.dev</a>.
            </p>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} disabled={isPending} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              Batal
            </button>
            <button type="submit" disabled={isPending} className="rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 disabled:opacity-50">
              {isPending ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}