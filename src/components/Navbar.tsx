import Link from 'next/link';
import { PawPrint } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <PawPrint className="text-brand-green" size={28} />
          <span className="text-xl font-bold text-gray-800">Meow-Care</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link href="/#layanan" className="hover:text-brand-green transition-colors">Layanan</Link>
          <Link href="/#tentang" className="hover:text-brand-green transition-colors">Tentang</Link>
          <Link href="/admin" className="hover:text-brand-green transition-colors">Admin</Link>
        </div>
        <Link
          href="/antrian/baru"
          className="px-6 py-2 bg-brand-green text-white font-bold rounded-full shadow-md hover:bg-brand-green-dark transition-colors"
        >
          Daftar Antrian
        </Link>
      </nav>
    </header>
  );
}