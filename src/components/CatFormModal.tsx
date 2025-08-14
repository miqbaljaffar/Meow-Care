'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Kucing } from '@prisma/client';
import { addCat, updateCat } from '@/actions/profil.actions';

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
      onClose();
    } else {
      alert(result.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {isEditMode ? 'Edit Data Kucing' : 'Tambah Kucing Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              required
            />
          </div>
          <div>
            <label htmlFor="spesies" className="block text-sm font-medium text-gray-700">Spesies</label>
            <input
              id="spesies"
              type="text"
              value={spesies}
              onChange={(e) => setSpesies(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              required
            />
          </div>
          <div>
            <label htmlFor="umur" className="block text-sm font-medium text-gray-700">Umur (tahun)</label>
            <input
              id="umur"
              type="number"
              value={umur}
              onChange={(e) => setUmur(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              required
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 disabled:opacity-50"
            >
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}