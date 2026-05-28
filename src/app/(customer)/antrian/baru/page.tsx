import AntrianForm from '@/components/AntrianForm';
import { Suspense } from 'react';
import { Stethoscope } from 'lucide-react';
import { auth } from '@/auth'; 
import { getUserProfile } from '@/actions/profil.actions';

// Definisikan tipe untuk user dan kucing
interface KucingProfil {
  id: number;
  nama: string;
}

interface UserData {
  nama: string;
  nomorTelepon: string | null;
  kucing: KucingProfil[];
}

// Komponen ini akan menangani logika server-side
async function AntrianPageContent({ layanan }: { layanan: string | null }) {
  if (!layanan) {
    return (
      <div className="text-center text-red-500">
        <p>Layanan tidak ditemukan. Silakan kembali dan pilih layanan yang valid.</p>
      </div>
    );
  }

  const session = await auth();
  let userData: UserData | null = null;

  if (session?.user?.id) {
    const userProfile = await getUserProfile(session.user.id);
    if (userProfile) {
      userData = {
        nama: userProfile.nama,
        nomorTelepon: userProfile.nomorTelepon,
        kucing: userProfile.kucing.map(k => ({ id: k.id, nama: k.nama })),
      };
    }
  }

  return <AntrianForm jenisLayanan={layanan} userData={userData} />;
}

// PERUBAHAN ADA DI SINI 👇
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Pastikan komponen utama menjadi async
export default async function HalamanBaruAntrian({ searchParams }: Props) {
  // Await searchParams sebelum digunakan
  const resolvedSearchParams = await searchParams;
  const layanan = resolvedSearchParams.layanan as string | null;

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <Stethoscope className="mx-auto text-brand-green mb-4" size={48} />
          <h1 className="text-4xl font-extrabold text-gray-800">Formulir Antrian</h1>
          <p className="text-lg text-gray-600 mt-2">
            Satu langkah lagi untuk mendapatkan perawatan terbaik.
          </p>
        </div>
        <Suspense fallback={<div className="text-center">Memuat data pengguna...</div>}>
          <AntrianPageContent layanan={layanan} />
        </Suspense>
      </div>
    </div>
  );
}