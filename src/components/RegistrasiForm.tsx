'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { registerUser } from '@/actions/auth.actions';

export default function RegistrasiForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const data = {
      nama: formData.get('nama') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    startTransition(async () => {
      const result = await registerUser(data);
      if (result.success) {
        toast.success('Registrasi berhasil! Silakan login.');
        router.push('/login');
      } else {
        toast.error(result.message || 'Terjadi kesalahan.');
        setError(result.message || null);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg shadow-md">
      <div>
        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
        <input type="text" name="nama" id="nama" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm p-2" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" name="email" id="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm p-2" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" name="password" id="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm p-2" />
      </div>
      
      {error && <p className="text-sm text-red-500">{error}</p>}
      
      <button
        type="submit"
        disabled={isPending}
        className="w-full justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green disabled:bg-gray-400"
      >
        {isPending ? 'Mendaftarkan...' : 'Daftar'}
      </button>
    </form>
  );
}