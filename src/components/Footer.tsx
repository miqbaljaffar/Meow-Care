import { PawPrint, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import LocationAndHours from './LocationAndHours'; // <-- Import ditambahkan

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Seksi Lokasi & Jam Operasional ditambahkan di sini */}
      <LocationAndHours />

      <div className="container mx-auto py-12 px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <PawPrint size={28} className="text-brand-green" />
          <span className="text-xl font-bold text-white">Meow-Care</span>
        </div>
        <p className="max-w-md mx-auto mb-6 text-gray-200">
          Memberikan perawatan terbaik untuk sahabat berbulu Anda dengan layanan modern dan penuh kasih.
        </p>
        <div className="flex justify-center gap-6 mb-8">
          <Link href="#" className="text-gray-200 hover:text-brand-green transition-colors"><Facebook /></Link>
          <Link href="#" className="text-gray-200 hover:text-brand-green transition-colors"><Instagram /></Link>
          <Link href="#" className="text-gray-200 hover:text-brand-green transition-colors"><Twitter /></Link>
        </div>
        <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} Meow-Care. All rights reserved.</p>
      </div>
    </footer>
  );
}