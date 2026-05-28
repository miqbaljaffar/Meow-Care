'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { AtSign, Lock } from 'lucide-react'; // Import ikon

export default function LoginForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error("Login gagal! Periksa kembali email dan password Anda.");
        setError("Login gagal! Periksa kembali email dan password Anda.");
        setIsPending(false);
      } else {
        toast.success('Login berhasil!');

        const response = await fetch('/api/auth/session');
        const session = await response.json();

        if (session?.user?.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/');
        }

        router.refresh();
      }
    } catch { // Hapus variabel 'err'
      toast.error("Terjadi kesalahan yang tidak terduga.");
      setError("Terjadi kesalahan yang tidak terduga.");
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <label htmlFor="email" className="sr-only">Email</label>
        <AtSign className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Email"
          className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 shadow-sm focus:border-brand-green focus:ring-brand-green placeholder-gray-500 text-gray-900"
        />
      </div>
      <div className="relative">
        <label htmlFor="password" className="sr-only">Password</label>
        <Lock className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password"
          className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 shadow-sm focus:border-brand-green focus:ring-brand-green placeholder-gray-500 text-gray-900"
        />
      </div>

      {error && <p className="text-sm text-center text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green disabled:bg-gray-400 transition-transform transform hover:scale-105"
      >
        {isPending ? 'Logging in...' : 'Login'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link href="/registrasi" className="font-medium text-brand-green hover:underline">
          Daftar di sini
        </Link>
      </p>
    </form>
  );
}