'use client';

import { useState, FormEvent, useRef } from 'react';
import { Dokter } from '@prisma/client';
import { createDokter, updateDokter } from '@/actions/admin.actions';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface DokterFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  dokterToEdit?: Dokter;
}

export default function DokterFormModal({ isOpen, onClose, dokterToEdit }: DokterFormModalProps) {
  const [isPending, setIsPending] = useState(false);
  const [preview, setPreview] = useState<string | null>(dokterToEdit?.foto || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditMode = !!dokterToEdit;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
        {/* Tambahkan enctype untuk upload file */}
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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
            <label htmlFor="foto" className="block text-sm font-medium text-gray-700">Foto Dokter</label>
            <div className="mt-2 flex items-center gap-4">
              {preview ? (
                <Image src={preview} alt="Preview" width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-100"></div>
              )}
              <input
                id="foto"
                name="foto"
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/png, image/jpeg, image/jpg"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
              />
            </div>
            {isEditMode && !preview && (
              <p className="text-xs text-gray-500 mt-1">Kosongkan jika tidak ingin mengubah foto.</p>
            )}
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