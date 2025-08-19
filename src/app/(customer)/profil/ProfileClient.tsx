'use client';

import { useState } from 'react';
import { Cat, PawPrint, User as UserIcon, Phone, Mail } from 'lucide-react';
import CatCard from '@/components/CatCard';
import AddCatButton from '@/components/AddCatButton';
import ProfileEditButton from '@/components/ProfileEditButton';
import { UserProfile, KucingWithRiwayat } from './page'; 

interface ProfileClientProps {
  initialUser: UserProfile;
}

export default function ProfileClient({ initialUser }: ProfileClientProps) {
  const [user, setUser] = useState<UserProfile>(initialUser);

  // Fungsi untuk me-refresh data user dari server
  const refreshProfile = async () => {
    try {
      // Anda perlu membuat endpoint API atau server action untuk mengambil data user terbaru
      const response = await fetch(`/api/user/${user.id}`); // Contoh endpoint
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Gagal refresh profil:", error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header Profil yang Didesain Ulang */}
        <header className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-brand-green p-8 text-white shadow-lg">
           <div className="absolute -top-10 -right-10 h-48 w-48 text-white/10">
             <PawPrint className="h-full w-full" strokeWidth={1} />
           </div>
           <div className="relative z-10">
             <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
               <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                 <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 backdrop-blur-sm">
                   <UserIcon className="h-12 w-12 text-white" strokeWidth={1.5} />
                 </div>
                 <div>
                   <h1 className="text-4xl font-extrabold tracking-tight">{user.nama}</h1>
                   <div className="mt-2 flex flex-col md:flex-row md:items-center gap-x-4 gap-y-1 text-emerald-100">
                     <span className="flex items-center gap-2 justify-center"><Mail size={16} /> {user.email}</span>
                     <span className="flex items-center gap-2 justify-center"><Phone size={16} /> {user.nomorTelepon || 'Belum diisi'}</span>
                   </div>
                 </div>
               </div>
               <div className="flex-shrink-0">
                  <ProfileEditButton user={user} />
               </div>
             </div>
           </div>
         </header>

        {/* Daftar Kucing */}
        <main className="rounded-2xl bg-white p-6 shadow-subtle md:p-8">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Cat className="h-8 w-8 text-brand-green" />
              <h2 className="text-3xl font-bold text-gray-800">Kucing Saya</h2>
            </div>
            <AddCatButton userId={user.id.toString()} />
          </div>

          {user.kucing && user.kucing.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {user.kucing.map((kucing: KucingWithRiwayat) => (
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