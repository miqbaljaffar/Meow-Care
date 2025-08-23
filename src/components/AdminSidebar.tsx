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
  User,
  PawPrint,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dasbor', icon: LayoutDashboard },
  { href: '/admin/antrian', label: 'Antrian', icon: ListOrdered },
  { href: '/admin/artikel', label: 'Artikel', icon: Newspaper },
  { href: '/admin/layanan', label: 'Layanan', icon: Stethoscope },
  { href: '/admin/testimoni', label: 'Testimoni', icon: MessageSquareQuote },
  { href: '/admin/dokter', label: 'Dokter', icon: User },
  { href: '/admin/analytics', label: 'Analitik', icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white text-gray-800 p-4 flex flex-col justify-between min-h-screen border-r border-gray-200">
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
           <PawPrint className="h-8 w-8 text-brand-green" />
           <h2 className="text-2xl font-bold text-gray-900">Meow-Care</h2>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                    pathname === item.href
                      ? 'bg-emerald-50 text-emerald-600 font-bold' // Style untuk link aktif
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' // Style untuk link non-aktif
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

      <div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-4 w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 hover:font-bold transition-colors duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}