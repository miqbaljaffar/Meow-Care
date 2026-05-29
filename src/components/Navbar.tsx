'use client';

import Link from 'next/link';
import { PawPrint, Menu, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import LogoutButton from './LogoutButton';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const navLinks = [
    { href: '/layanan', label: 'Layanan' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 sm:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <PawPrint className="text-brand-green" size={28} />
          <span className="text-lg sm:text-xl font-bold text-gray-800 hidden sm:inline">Meow-Care</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand-green transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!isLoading && (session?.user ? (
            <>
              <Link
                href="/profil"
                className="px-4 sm:px-6 py-2 text-brand-green font-semibold rounded-full hover:bg-emerald-50 transition-colors text-sm sm:text-base"
              >
                Profil
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 sm:px-6 py-2 text-brand-green font-semibold rounded-full hover:bg-emerald-50 transition-colors text-sm sm:text-base"
              >
                Login
              </Link>
              <Link
                href="/registrasi"
                className="px-4 sm:px-6 py-2 bg-brand-green text-white font-semibold rounded-full shadow-md hover:bg-brand-green-dark transition-colors text-sm sm:text-base"
              >
                Registrasi
              </Link>
            </>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-brand-green transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block px-4 py-2 text-gray-700 hover:text-brand-green hover:bg-emerald-50 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-3 mt-3 space-y-2">
              {!isLoading && (session?.user ? (
                <>
                  <Link
                    href="/profil"
                    onClick={closeMenu}
                    className="block px-4 py-2 text-brand-green font-semibold hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    Profil
                  </Link>
                  <div className="px-4 py-2">
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="block px-4 py-2 text-brand-green font-semibold hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/registrasi"
                    onClick={closeMenu}
                    className="block px-4 py-2 bg-brand-green text-white font-semibold rounded-lg hover:bg-brand-green-dark transition-colors"
                  >
                    Registrasi
                  </Link>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}