import AntrianForm from '@/components/AntrianForm';

// Ubah fungsi komponen untuk menerima searchParams
export default function HalamanPendaftaran({ searchParams }: { searchParams: { layanan?: string } }) {
  
  // Ambil nilai 'layanan' dari URL, jika tidak ada, default ke string kosong
  const jenisLayanan = searchParams.layanan || 'Pemeriksaan Umum';

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-2">Daftar Antrian Baru</h1>
      <p className="text-center text-gray-500 mb-8">
        Lengkapi data di bawah untuk mendapatkan nomor antrian Anda.
      </p>
      {/* Kirim jenisLayanan sebagai prop ke komponen Form */}
      <AntrianForm jenisLayanan={jenisLayanan} />
    </div>
  );
}