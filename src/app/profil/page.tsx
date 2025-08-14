// src/app/profil/page.tsx

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUserProfile } from '@/actions/profil.actions';
import CatCard from '@/components/CatCard';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { FaCat, FaUserCircle } from 'react-icons/fa';
import AddCatButton from '@/components/AddCatButton';

export default async function ProfilPage() {
  const session = await getServerSession(authOptions);

  // Cek sesi dan pastikan user.id ada
  if (!session?.user?.id) {
    redirect('/login');
  }

  // Gunakan session.user.id yang sudah pasti ada
  const user = await getUserProfile(session.user.id);

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
        <p className="text-xl text-gray-600">Gagal memuat profil pengguna.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* --- Bagian Header Profil --- */}
        <div className="mb-12 rounded-xl bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <FaUserCircle className="text-7xl text-cyan-500" />
            <div>
              {/* FIX: Menggunakan user.nama bukan user.name */}
              <h1 className="text-4xl font-bold text-gray-800">{user.nama}</h1>
              <p className="mt-1 text-lg text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* --- Bagian Data Kucing --- */}
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center gap-3">
              <FaCat className="text-3xl text-cyan-500" />
              <h2 className="text-3xl font-bold text-gray-800">
                Kucing Terdaftar
              </h2>
            </div>
            {/* FIX: Mengubah user.id (number) menjadi string */}
            <AddCatButton userId={user.id.toString()} />
          </div>

          {user.kucing && user.kucing.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {user.kucing.map((kucing) => (
                <CatCard key={kucing.id} kucing={kucing} />
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
              <FaCat className="text-5xl text-gray-400" />
              <p className="mt-4 text-xl font-medium text-gray-600">
                Anda belum mendaftarkan kucing.
              </p>
              <p className="mt-1 text-gray-500">
                {/* FIX: Mengganti " dengan &quot; untuk lolos dari ESLint */}
                Klik &quot;Tambah Kucing&quot; untuk memulai.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}