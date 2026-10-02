import { PawPrint } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import LocationAndHours from './LocationAndHours';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <LocationAndHours />

      <div className="container mx-auto py-12 px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <PawPrint size={28} className="text-brand-green" />
          <span className="text-xl font-bold text-white">Meow-Care</span>
        </div>
        <p className="max-w-md mx-auto mb-6 text-gray-200">
          Memberikan perawatan terbaik untuk sahabat berbulu Anda dengan layanan modern dan penuh kasih.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <Link
            href="#"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-200 transition-colors hover:bg-brand-green hover:text-white"
          >
            <FaFacebookF size={16} />
          </Link>
          <Link
            href="#"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-200 transition-colors hover:bg-brand-green hover:text-white"
          >
            <FaInstagram size={16} />
          </Link>
          <Link
            href="#"
            aria-label="X (Twitter)"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-200 transition-colors hover:bg-brand-green hover:text-white"
          >
            <FaXTwitter size={16} />
          </Link>
        </div>
        <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} Meow-Care. All rights reserved.</p>
      </div>
    </footer>
  );
}