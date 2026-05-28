'use client';

import { useState, FormEvent, useEffect } from 'react';
import { User } from '@prisma/client';
import { updateUserProfile } from '@/actions/profil.actions';
import toast from 'react-hot-toast';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export default function ProfileEditModal({ isOpen, onClose, user }: ProfileEditModalProps) {
  const [isPending, setIsPending] = useState(false);
  const [nama, setNama] = useState(user.nama);
  const [nomorTelepon, setNomorTelepon] = useState(user.nomorTelepon || '');

  useEffect(() => {
    if (isOpen) {
      setNama(user.nama);
      setNomorTelepon(user.nomorTelepon || '');
    }
  }, [isOpen, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);

    const result = await updateUserProfile(user.id.toString(), formData);

    if (result.success) {
      toast.success(result.message as string);
      onClose();
    } else {
      toast.error(result.message as string);
    }
    setIsPending(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Edit Profil
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-800">Nama Lengkap</label>
            <input
              id="nama"
              name="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              // --- TAMBAHKAN text-gray-900 DI SINI ---
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 focus:border-2"
              required
            />
          </div>
          <div>
            <label htmlFor="nomorTelepon" className="block text-sm font-medium text-gray-800">Nomor Telepon</label>
            <input
              id="nomorTelepon"
              name="nomorTelepon"
              type="tel"
              value={nomorTelepon}
              onChange={(e) => setNomorTelepon(e.target.value)}
              placeholder="Contoh: 081234567890"
              // --- TAMBAHKAN text-gray-900 DI SINI ---
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 focus:border-2"
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} disabled={isPending} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              Batal
            </button>
            <button type="submit" disabled={isPending} className="rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 disabled:opacity-50">
              {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}