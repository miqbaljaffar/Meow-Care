'use client';

import { useState, useTransition } from 'react';
import { createAntrian } from '@/actions/antrian.actions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AntrianForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      namaPemilik: formData.get('namaPemilik') as string,
      namaKucing: formData.get('namaKucing') as string,
      nomorTelepon: formData.get('nomorTelepon') as string,
    };

    startTransition(async () => {
      const result = await createAntrian(data);
      if (result.success) {
        toast.success(`Pendaftaran berhasil! Nomor antrian Anda adalah ${result.data?.nomorAntrian}`);
        router.push('/');
    } else {
      toast.error(result.message || 'Terjadi kesalahan.');
      setError(result.message || 'Terjadi kesalahan.');
    }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg shadow-md">
      {/* ... Input fields untuk namaPemilik, namaKucing, nomorTelepon ... */}
      <div>
        <label htmlFor="namaPemilik" className="block text-sm font-medium text-gray-700">Nama Pemilik</label>
        <input type="text" name="namaPemilik" id="namaPemilik" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm p-2" />
      </div>
      <div>
        <label htmlFor="namaKucing" className="block text-sm font-medium text-gray-700">Nama Kucing</label>
        <input type="text" name="namaKucing" id="namaKucing" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm p-2" />
      </div>
       <div>
        <label htmlFor="nomorTelepon" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
        <input type="tel" name="nomorTelepon" id="nomorTelepon" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm p-2" />
      </div>
      
      {error && <p className="text-sm text-red-500">{error}</p>}
      
      <button
        type="submit"
        disabled={isPending}
        className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green disabled:bg-gray-400"
      >
        {isPending ? 'Mendaftarkan...' : 'Dapatkan Nomor Antrian'}
      </button>
    </form>
  );
}