import { auth } from '@/app/api/auth/[...nextauth]/route';
import { getUserProfile } from '@/actions/profil.actions';
import { redirect } from 'next/navigation';
import ProfileClient from './ProfileClient'; 
import { Kucing, RiwayatLayanan, Testimoni, User } from '@prisma/client';

// Definisikan tipe data yang dibutuhkan di sini
export type KucingWithRiwayat = Kucing & {
  riwayat: (RiwayatLayanan & { testimoni: Testimoni | null })[];
};

export type UserProfile = User & {
  kucing: KucingWithRiwayat[];
};

export default async function ProfilPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  const user: UserProfile | null = await getUserProfile(session.user.id);

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

  // Kirim data user ke Client Component
  return <ProfileClient user={user} />;
}
