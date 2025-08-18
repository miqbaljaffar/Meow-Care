import { auth } from '@/app/api/auth/[...nextauth]/route';
import { getUserProfile } from '@/actions/profil.actions';
import CatCard from '@/components/CatCard';
import { redirect } from 'next/navigation';
import { Cat, PawPrint, User as UserIcon } from 'lucide-react';
import AddCatButton from '@/components/AddCatButton'; // <-- INI PERBAIKANNYA
import { Kucing } from '@prisma/client';

export default async function ProfilPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const user = await getUserProfile(session.user.id);

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Gagal memuat profil</h2>
          <p className="mt-2 text-gray-500">
            Terjadi kesalahan saat mengambil data profil Anda. Silakan coba lagi nanti.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50/50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* --- Bagian Header Profil --- */}
        <header className="relative mb-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-brand-green p-8 text-white shadow-lg overflow-hidden">
           <div className="absolute -top-10 -right-10 w-48 h-48 text-white/10">
                <PawPrint className="w-full h-full" strokeWidth={1} />
           </div>
          <div className="relative z-10 flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50">
              <UserIcon className="h-12 w-12 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">{user.nama}</h1>
              <p className="mt-1 text-lg text-emerald-100">{user.email}</p>
            </div>
          </div>
        </header>

        {/* --- Bagian Data Kucing --- */}
        <main className="rounded-2xl bg-white p-6 md:p-8 shadow-subtle">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Cat className="h-8 w-8 text-brand-green" />
              <h2 className="text-3xl font-bold text-gray-800">Kucing Saya</h2>
            </div>
            <AddCatButton userId={user.id.toString()} />
          </div>

          {user.kucing && user.kucing.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {user.kucing.map((kucing: Kucing) => (
                <CatCard key={kucing.id} kucing={kucing} />
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
              <PawPrint className="h-16 w-16 text-gray-300" />
              <p className="mt-4 text-xl font-semibold text-gray-700">
                Belum ada kucing terdaftar
              </p>
              <p className="mt-2 text-gray-500">
                Ayo tambahkan data sahabat berbulu Anda untuk memulai!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}