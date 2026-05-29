'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Kucing } from '@prisma/client';
import { addCat, updateCat } from '@/actions/profil.actions';
import toast from 'react-hot-toast';

interface CatFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  kucingToEdit?: Kucing;
}

export default function CatFormModal({
  isOpen,
  onClose,
  userId,
  kucingToEdit,
}: CatFormModalProps) {
  const [nama, setNama] = useState('');
  const [spesies, setSpesies] = useState('');
  const [umur, setUmur] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!kucingToEdit;

  useEffect(() => {
    if (isEditMode && kucingToEdit) {
      setNama(kucingToEdit.nama);
      setSpesies(kucingToEdit.spesies);
      setUmur(kucingToEdit.umur.toString());
    } else {
      setNama('');
      setSpesies('');
      setUmur('');
    }
  }, [isOpen, kucingToEdit, isEditMode]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const catData = {
      nama,
      spesies,
      umur: parseInt(umur, 10),
    };

    let result;
    if (isEditMode && kucingToEdit) {
      // FIX: Mengubah kucingToEdit.id (number) menjadi string
      result = await updateCat(kucingToEdit.id.toString(), catData);
    } else {
      result = await addCat({ ...catData, userId });
    }

    setIsLoading(false);
    if (result.success) {
      toast.success(result.message || (isEditMode ? 'Profil kucing berhasil diperbarui!' : 'Profil kucing baru berhasil ditambahkan!'));
      onClose();
    } else {
      toast.error(result.message || 'Terjadi kesalahan saat menyimpan profil kucing');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl my-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {isEditMode ? 'Edit Data Kucing' : 'Tambah Kucing Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-800">Nama</label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 focus:border-2 focus:outline-none text-base"
              required
            />
          </div>
          <div>
            <label htmlFor="spesies" className="block text-sm font-medium text-gray-800">Spesies</label>
            <input
              id="spesies"
              type="text"
              value={spesies}
              onChange={(e) => setSpesies(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 focus:border-2 focus:outline-none text-base"
              required
            />
          </div>
          <div>
            <label htmlFor="umur" className="block text-sm font-medium text-gray-800">Umur (tahun)</label>
            <input
              id="umur"
              type="number"
              value={umur}
              onChange={(e) => setUmur(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 focus:border-2 focus:outline-none text-base"
              required
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}