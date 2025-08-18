'use client';

import { useState, FormEvent } from 'react';
import { Dokter } from '@prisma/client';
import { createDokter, updateDokter } from '@/actions/admin.actions';
import toast from 'react-hot-toast';

interface DokterFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  dokterToEdit?: Dokter;
}

export default function DokterFormModal({ isOpen, onClose, dokterToEdit }: DokterFormModalProps) {
  const [isPending, setIsPending] = useState(false);
  const isEditMode = !!dokterToEdit;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);

    const result = isEditMode
      ? await updateDokter(dokterToEdit.id, formData)
      : await createDokter(formData);

    if (result.success) {
      toast.success(result.message as string);
      onClose();
    } else {
      if (typeof result.message === 'string') {
        toast.error(result.message);
      } else {
        // Handle error validasi Zod
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
          {isEditMode ? 'Edit Data Dokter' : 'Tambah Dokter Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Dokter</label>
            <input
              id="nama"
              name="nama"
              type="text"
              defaultValue={dokterToEdit?.nama}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              required
            />
          </div>
          <div>
            <label htmlFor="spesialisasi" className="block text-sm font-medium text-gray-700">Spesialisasi</label>
            <input
              id="spesialisasi"
              name="spesialisasi"
              type="text"
              defaultValue={dokterToEdit?.spesialisasi}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              required
            />
          </div>
           <div>
            <label htmlFor="foto" className="block text-sm font-medium text-gray-700">URL Foto</label>
            <input
              id="foto"
              name="foto"
              type="url"
              defaultValue={dokterToEdit?.foto || ''}
              placeholder="https://example.com/foto.jpg"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
            />
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
