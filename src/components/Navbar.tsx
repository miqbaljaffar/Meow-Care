import Link from 'next/link';
import { PawPrint } from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <PawPrint className="text-brand-green" size={28} />
          <span className="text-xl font-bold text-gray-800">Meow-Care</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link href="/layanan" className="hover:text-brand-green transition-colors">Layanan</Link>
          <Link href="/blog" className="hover:text-brand-green transition-colors">Blog</Link>
          <Link href="/#alur" className="hover:text-brand-green transition-colors">Alur</Link>
          <Link href="/admin" className="hover:text-brand-green transition-colors">Admin</Link>
        </div>

        <div className="flex items-center gap-4">
          {session?.user ? (
            // Jika SUDAH LOGIN, tampilkan ini
            <>
              <Link
                href="/profil"
                className="px-6 py-2 text-brand-green font-bold rounded-full hover:bg-emerald-50 transition-colors"
              >
                Profil
              </Link>
              <LogoutButton />
            </>
          ) : (
            // Jika BELUM LOGIN, tampilkan ini
            <>
              <Link
                href="/login"
                className="px-6 py-2 text-brand-green font-bold rounded-full hover:bg-emerald-50 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/registrasi"
                className="px-6 py-2 bg-brand-green text-white font-bold rounded-full shadow-md hover:bg-brand-green-dark transition-colors"
              >
                Registrasi
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}