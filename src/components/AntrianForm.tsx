'use client';

import { useState, useTransition } from 'react';
import { createAntrian } from '@/actions/antrian.actions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

// Definisikan tipe props yang baru
interface KucingProfil {
  id: number;
  nama: string;
}

interface UserData {
  nama: string;
  nomorTelepon: string | null;
  kucing: KucingProfil[];
}

interface AntrianFormProps {
  jenisLayanan: string;
  userData: UserData | null; // Bisa null jika user adalah tamu
}

export default function AntrianForm({ jenisLayanan, userData }: AntrianFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  // Jika user login tapi belum punya kucing, tampilkan pesan
  if (userData && userData.kucing.length === 0) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Anda Belum Mendaftarkan Kucing</h3>
            <p className="text-gray-600 mb-6">
                Untuk mendaftar layanan, Anda perlu menambahkan data kucing Anda terlebih dahulu di halaman profil.
            </p>
            <Link href="/profil" className="px-6 py-3 bg-brand-green text-white font-bold rounded-full shadow-md hover:bg-brand-green-dark transition-colors">
                Ke Halaman Profil
            </Link>
        </div>
    )
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Dapatkan nama kucing dari dropdown jika ada, jika tidak dari input teks
    const namaKucingTerpilih = userData 
      ? formData.get('kucingId') 
        ? userData.kucing.find(k => k.id.toString() === formData.get('kucingId'))?.nama
        : ''
      : formData.get('namaKucing') as string;

    const data = {
      namaPemilik: formData.get('namaPemilik') as string,
      namaKucing: namaKucingTerpilih || '',
      nomorTelepon: formData.get('nomorTelepon') as string,
      jenisLayanan: formData.get('jenisLayanan') as string,
    };

    if (!data.namaKucing) {
      toast.error("Silakan pilih kucing Anda.");
      return;
    }

    startTransition(async () => {
      const result = await createAntrian(data);
      if (result.success) {
        toast.success(`Pendaftaran berhasil! Nomor antrian Anda: ${result.data?.nomorAntrian}`);
        router.push(`/antrian/${result.data?.id}`);
      } else {
        toast.error(result.message || 'Terjadi kesalahan.');
        setError(result.message || 'Terjadi kesalahan.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div className="bg-emerald-50 border-l-4 border-brand-green p-4 rounded-md">
        <p className="text-sm text-gray-600">Anda mendaftar untuk layanan:</p>
        <p className="font-bold text-lg text-gray-800">{jenisLayanan}</p>
      </div>

      <input type="hidden" name="jenisLayanan" value={jenisLayanan} />

      {/* Input Nama Pemilik */}
      <div>
        <label htmlFor="namaPemilik" className="block text-sm font-medium text-gray-800">Nama Pemilik</label>
        <input 
          type="text" 
          name="namaPemilik" 
          id="namaPemilik" 
          required 
          defaultValue={userData?.nama || ''}
          readOnly={!!userData} // Kunci input jika user sudah login
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm p-3 bg-white text-gray-900 placeholder-gray-500 read-only:bg-gray-100 read-only:cursor-not-allowed" 
        />
      </div>

      {/* Input Nama Kucing (Dropdown atau Teks) */}
      <div>
        <label htmlFor="namaKucing" className="block text-sm font-medium text-gray-800">Nama Kucing</label>
        {userData ? (
          <select
            name="kucingId"
            id="kucingId"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm p-3 bg-white text-gray-900"
          >
            <option value="" className="text-gray-600">-- Pilih Kucing --</option>
            {userData.kucing.map(k => (
              <option key={k.id} value={k.id} className="text-gray-900">{k.nama}</option>
            ))}
          </select>
        ) : (
          <input 
            type="text" 
            name="namaKucing" 
            id="namaKucing" 
            required 
            placeholder="Masukkan nama kucing Anda"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm p-3 bg-white text-gray-900 placeholder-gray-500" 
          />
        )}
      </div>

      {/* Input Nomor Telepon */}
       <div>
        <label htmlFor="nomorTelepon" className="block text-sm font-medium text-gray-800">Nomor Telepon</label>
        <input 
          type="tel" 
          name="nomorTelepon" 
          id="nomorTelepon" 
          required 
          placeholder="Contoh: 0812-3456-7890"
          defaultValue={userData?.nomorTelepon || ''}
          readOnly={!!userData?.nomorTelepon} // Kunci jika nomor sudah ada
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm p-3 bg-white text-gray-900 placeholder-gray-500 read-only:bg-gray-100 read-only:cursor-not-allowed" 
        />
        {userData && !userData.nomorTelepon && (
            <p className="text-xs text-gray-600 mt-1">
                Anda dapat menambahkan nomor telepon di <Link href="/profil" className="underline text-brand-green font-medium">halaman profil</Link> agar terisi otomatis.
            </p>
        )}
      </div>
      
      {error && <p className="text-sm text-red-500">{error}</p>}
      
      <button
        type="submit"
        disabled={isPending}
        className="w-full justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green disabled:bg-gray-400"
      >
        {isPending ? 'Mendaftarkan...' : 'Dapatkan Nomor Antrian'}
      </button>

      {!userData && (
        <p className="text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-medium text-brand-green hover:underline">
            Login di sini
          </Link>
          {' '}untuk proses lebih cepat.
        </p>
      )}
    </form>
  );
}