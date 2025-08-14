import RegistrasiForm from '@/components/RegistrasiForm';

export default function HalamanRegistrasi() {
  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-2">Buat Akun Baru</h1>
      <p className="text-center text-gray-500 mb-8">
        Daftarkan diri Anda untuk mengakses semua fitur kami.
      </p>
      <RegistrasiForm />
    </div>
  );
}