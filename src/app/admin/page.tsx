import { BarChart3, ListOrdered, Stethoscope, Users } from 'lucide-react';
import Link from 'next/link';
import { getAnalyticsData } from '@/actions/analytics.actions';
import DashboardCharts from '@/components/DashboardCharts';

export default async function AdminPage() {
  const result = await getAnalyticsData();
  const analyticsData = result.success ? result.data : null;

  // Definisikan stats dengan data dinamis jika tersedia
  const stats = [
    { name: 'Antrian Hari Ini', stat: analyticsData?.jumlahAntrian.harian ?? 'N/A', icon: ListOrdered, href: '/admin/antrian', color: 'bg-emerald-500' },
    { name: 'Total Layanan', stat: '8', icon: Stethoscope, href: '/admin/layanan', color: 'bg-cyan-500' }, // Ganti dengan data dinamis jika ada
    { name: 'Jumlah Dokter', stat: '4', icon: Users, href: '/admin/dokter', color: 'bg-amber-500' }, // Ganti dengan data dinamis jika ada
    { name: 'Waktu Tunggu Rata-rata', stat: `${analyticsData?.rataRataWaktuTunggu ?? 'N/A'} mnt`, icon: BarChart3, href: '/admin/analytics', color: 'bg-indigo-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Dasbor Admin
      </h1>
      <p className="text-gray-600 mb-8">
        Selamat datang kembali! Berikut adalah ringkasan aktivitas klinik Anda.
      </p>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Link href={item.href} key={item.name}>
            <div className="bg-white overflow-hidden shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 truncate">{item.name}</p>
                  <p className="mt-1 text-4xl font-bold text-gray-900">{item.stat}</p>
                </div>
                <div className={`flex-shrink-0 ${item.color} rounded-lg p-4`}>
                  <item.icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Tampilkan Grafik jika data berhasil diambil */}
      {analyticsData ? (
        <DashboardCharts data={analyticsData} />
      ) : (
        <div className="mt-10 bg-white shadow-lg rounded-xl p-8 text-center">
            <p className="text-red-500">Gagal memuat data grafik.</p>
        </div>
      )}
    </div>
  );
}