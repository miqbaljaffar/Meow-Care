import { PawPrint } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import LocationAndHours from './LocationAndHours';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <LocationAndHours />

      <div className="container mx-auto py-12 px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-4" aria-hidden="true">
          <PawPrint size={28} className="text-brand-green" aria-hidden="true" focusable="false" />
          <span className="text-xl font-bold text-white">Meow-Care</span>
        </div>
        <p className="max-w-md mx-auto mb-6 text-gray-200">
          Memberikan perawatan terbaik untuk sahabat berbulu Anda dengan layanan modern dan penuh kasih.
        </p>
        <nav aria-label="Media sosial" className="flex justify-center gap-4 mb-8">
          <span
            aria-label="Facebook (segera hadir)"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-200 transition-colors hover:bg-brand-green hover:text-white cursor-not-allowed opacity-80"
            role="img"
          >
            <FaFacebookF size={16} aria-hidden="true" focusable="false" />
          </span>
          <span
            aria-label="Instagram (segera hadir)"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-200 transition-colors hover:bg-brand-green hover:text-white cursor-not-allowed opacity-80"
            role="img"
          >
            <FaInstagram size={16} aria-hidden="true" focusable="false" />
          </span>
          <span
            aria-label="X / Twitter (segera hadir)"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-200 transition-colors hover:bg-brand-green hover:text-white cursor-not-allowed opacity-80"
            role="img"
          >
            <FaXTwitter size={16} aria-hidden="true" focusable="false" />
          </span>
        </nav>
        <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} Meow-Care. All rights reserved.</p>
      </div>
    </footer>
  );
}