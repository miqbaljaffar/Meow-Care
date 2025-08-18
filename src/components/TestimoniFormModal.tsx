'use client';

import { useState, FormEvent } from 'react';
import { Testimoni } from '@prisma/client';
import { createTestimoni, updateTestimoni } from '@/actions/admin.actions';
import toast from 'react-hot-toast';

interface TestimoniFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimoniToEdit?: Testimoni;
}

export default function TestimoniFormModal({ isOpen, onClose, testimoniToEdit }: TestimoniFormModalProps) {
  const [isPending, setIsPending] = useState(false);
  const isEditMode = !!testimoniToEdit;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);

    const result = isEditMode
      ? await updateTestimoni(testimoniToEdit.id, formData)
      : await createTestimoni(formData);

    if (result.success) {
      toast.success(result.message as string); // Pastikan pesan sukses adalah string
      onClose();
    } else {
      // PENYESUAIAN DI SINI
      if (typeof result.message === 'string') {
        // Handle error umum dari server (cth: Database error)
        toast.error(result.message);
      } else {
        // Handle error validasi dari Zod
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
          {isEditMode ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="namaPelanggan" className="block text-sm font-medium text-gray-700">Nama Pelanggan</label>
            <input id="namaPelanggan" name="namaPelanggan" type="text" defaultValue={testimoniToEdit?.namaPelanggan} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
          </div>
          <div>
            <label htmlFor="namaKucing" className="block text-sm font-medium text-gray-700">Nama Kucing</label>
            <input id="namaKucing" name="namaKucing" type="text" defaultValue={testimoniToEdit?.namaKucing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
          </div>
          <div>
            <label htmlFor="fotoKucing" className="block text-sm font-medium text-gray-700">URL Foto Kucing (Opsional)</label>
            <input id="fotoKucing" name="fotoKucing" type="url" defaultValue={testimoniToEdit?.fotoKucing || ''} placeholder="https://example.com/kucing.jpg" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div>
            <label htmlFor="kutipan" className="block text-sm font-medium text-gray-700">Kutipan</label>
            <textarea id="kutipan" name="kutipan" rows={4} defaultValue={testimoniToEdit?.kutipan} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
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
