'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { registerUser } from '@/actions/auth.actions';
import { User, AtSign, Lock } from 'lucide-react'; // Import ikon

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
      confirmPassword: formData.get('confirmPassword') as string,
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
    <form onSubmit={handleSubmit} className="space-y-4">
       <div className="relative">
        <label htmlFor="nama" className="sr-only">Nama Lengkap</label>
        <User className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
        <input type="text" name="nama" id="nama" required placeholder="Nama Lengkap" className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 shadow-sm focus:border-brand-green focus:ring-brand-green placeholder-gray-500 text-gray-900" />
      </div>
       <div className="relative">
        <label htmlFor="email" className="sr-only">Email</label>
        <AtSign className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
        <input type="email" name="email" id="email" required placeholder="Email" className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 shadow-sm focus:border-brand-green focus:ring-brand-green placeholder-gray-500 text-gray-900" />
      </div>
      <div className="relative">
        <label htmlFor="password" className="sr-only">Password</label>
        <Lock className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
        <input type="password" name="password" id="password" required placeholder="Password" className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 shadow-sm focus:border-brand-green focus:ring-brand-green placeholder-gray-500 text-gray-900" />
      </div>
      <div className="relative">
        <label htmlFor="confirmPassword" className="sr-only">Konfirmasi Password</label>
         <Lock className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
        <input type="password" name="confirmPassword" id="confirmPassword" required placeholder="Konfirmasi Password" className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 shadow-sm focus:border-brand-green focus:ring-brand-green placeholder-gray-500 text-gray-900" />
      </div>
      
      {error && <p className="text-sm text-center text-red-500">{error}</p>}
      
      <button
        type="submit"
        disabled={isPending}
        className="w-full justify-center py-3 px-4 border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green disabled:bg-gray-400 transition-transform transform hover:scale-105"
      >
        {isPending ? 'Mendaftarkan...' : 'Daftar'}
      </button>
    </form>
  );
}