import { BarChart3, ListOrdered, Stethoscope, Users } from 'lucide-react';
import Link from 'next/link';

// Data dummy untuk statistik, idealnya ini diambil dari database
const stats = [
  { name: 'Antrian Hari Ini', stat: '12', icon: ListOrdered, href: '/admin/antrian' },
  { name: 'Total Layanan', stat: '8', icon: Stethoscope, href: '/admin/layanan' },
  { name: 'Jumlah Dokter', stat: '4', icon: Users, href: '/admin/dokter' },
  { name: 'Kunjungan Bulan Ini', stat: '152', icon: BarChart3, href: '/admin/analytics' },
];

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Dasbor Admin
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Selamat datang kembali! Berikut adalah ringkasan aktivitas klinik Anda.
      </p>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Link href={item.href} key={item.name}>
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-transparent hover:border-cyan-500">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-cyan-500 rounded-md p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{item.name}</dt>
                    <dd className="text-3xl font-bold text-gray-900 dark:text-white">{item.stat}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Konten Tambahan */}
      <div className="mt-10 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Akses Cepat</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Gunakan menu di samping untuk mengelola berbagai aspek dari klinik Meow-Care.</p>
      </div>
    </div>
  );
}