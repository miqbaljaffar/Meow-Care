'use client';

import { Cat, PawPrint, User as UserIcon, Phone, Mail } from 'lucide-react';
import CatCard from '@/components/CatCard';
import AddCatButton from '@/components/AddCatButton';
import ProfileEditButton from '@/components/ProfileEditButton';
import { UserProfile, KucingWithRiwayat } from './page';
import { useState, useEffect } from 'react';
import { ProfileListSkeleton } from '@/components/SkeletonLoader'; 

// FIX: Renamed prop to 'user' for clarity
interface ProfileClientProps {
  user: UserProfile;
}

// FIX: Removed useState and used the 'user' prop directly
export default function ProfileClient({ user }: ProfileClientProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading selesai setelah component mount
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="relative mb-12 overflow-hidden rounded-2xl bg-gray-300 animate-pulse p-8 h-48" />
          <div className="rounded-2xl bg-white p-6 shadow-subtle md:p-8">
            <div className="h-10 w-32 bg-gray-300 rounded-lg mb-8 animate-pulse" />
            <ProfileListSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-brand-green p-6 sm:p-8 text-white shadow-lg">
           <div className="absolute -top-10 -right-10 h-48 w-48 text-white/10">
             <PawPrint className="h-full w-full" strokeWidth={1} />
           </div>
           <div className="relative z-10">
             <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
               <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left md:gap-6">
                 <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 backdrop-blur-sm flex-shrink-0">
                   <UserIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white" strokeWidth={1.5} />
                 </div>
                 <div>
                   <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">{user.nama}</h1>
                   <div className="mt-2 flex flex-col gap-1 text-sm sm:text-base text-emerald-100">
                     <span className="flex items-center gap-2 justify-center md:justify-start"><Mail size={16} /> {user.email}</span>
                     <span className="flex items-center gap-2 justify-center md:justify-start"><Phone size={16} /> {user.nomorTelepon || 'Belum diisi'}</span>
                   </div>
                 </div>
               </div>
               <div className="flex-shrink-0 w-full sm:w-auto">
                  <ProfileEditButton user={user} />
               </div>
             </div>
           </div>
         </header>

        <main className="rounded-2xl bg-white p-6 sm:p-8 shadow-subtle">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Cat className="h-8 w-8 text-brand-green" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Kucing Saya</h2>
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
            <div className="mt-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 sm:p-12 text-center">
              <PawPrint className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300" />
              <p className="mt-4 text-lg sm:text-xl font-semibold text-gray-700">
                Belum ada kucing terdaftar
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-500">
                Ayo tambahkan data sahabat berbulu Anda untuk memulai!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}