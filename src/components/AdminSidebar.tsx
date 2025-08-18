'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Newspaper,
  Stethoscope,
  MessageSquareQuote,
  ListOrdered,
  BarChart3,
  LogOut,
  User, // <-- Tambahkan ikon User
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dasbor', icon: LayoutDashboard },
  { href: '/admin/antrian', label: 'Antrian', icon: ListOrdered },
  { href: '/admin/artikel', label: 'Artikel', icon: Newspaper },
  { href: '/admin/layanan', label: 'Layanan', icon: Stethoscope },
  { href: '/admin/testimoni', label: 'Testimoni', icon: MessageSquareQuote },
  { href: '/admin/dokter', label: 'Dokter', icon: User }, // <-- Tambahkan menu Dokter
  { href: '/admin/analytics', label: 'Analitik', icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-between min-h-screen">
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-brand-green'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* --- Tombol Logout --- */}
      <div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
