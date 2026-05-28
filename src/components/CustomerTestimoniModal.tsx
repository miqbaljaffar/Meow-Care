'use client';

import { useState, FormEvent } from 'react';
import { RiwayatLayanan } from '@prisma/client';
import toast from 'react-hot-toast';
import { createTestimoniForCustomer } from '@/actions/testimoni.actions';

interface CustomerTestimoniModalProps {
  isOpen: boolean;
  onClose: () => void;
  riwayat: RiwayatLayanan;
}

export default function CustomerTestimoniModal({ isOpen, onClose, riwayat }: CustomerTestimoniModalProps) {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    formData.append('riwayatLayananId', riwayat.id.toString());

    const result = await createTestimoniForCustomer(formData);

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
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
          Beri Ulasan Anda
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Bagaimana pengalaman Anda dengan layanan <span className="font-bold">{riwayat.jenisLayanan}</span>?
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="kutipan" className="sr-only">Testimoni</label>
            <textarea
              id="kutipan"
              name="kutipan"
              rows={4}
              placeholder="Ceritakan pengalaman Anda di sini..."
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 focus:border-2"
              required
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} disabled={isPending} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              Batal
            </button>
            <button type="submit" disabled={isPending} className="rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 disabled:opacity-50">
              {isPending ? 'Mengirim...' : 'Kirim Ulasan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}