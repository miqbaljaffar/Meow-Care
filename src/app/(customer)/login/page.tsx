import LoginForm from '@/components/LoginForm';

export default function HalamanLogin() {
  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-2">Login ke Akun Anda</h1>
      <p className="text-center text-gray-500 mb-8">
        Selamat datang kembali!
      </p>
      <LoginForm />
    </div>
  );
}