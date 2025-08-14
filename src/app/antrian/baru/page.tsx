import AntrianForm from '@/components/AntrianForm';

export default function HalamanPendaftaran() {
  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-2">Daftar Antrian Baru</h1>
      <p className="text-center text-gray-500 mb-8">
        Isi data di bawah untuk mendapatkan nomor antrian Anda.
      </p>
      <AntrianForm />
    </div>
  );
}