import { BarChart3, ListOrdered, Stethoscope, Users } from 'lucide-react';
import Link from 'next/link';
import { getAnalyticsData } from '@/actions/analytics.actions';
import DashboardCharts from '@/components/DashboardCharts';

export default async function AdminPage() {
  const result = await getAnalyticsData();
  const analyticsData = result.success ? result.data : null;

  const stats = [
    {
      name: 'Antrian Hari Ini',
      description: 'Nomor aktif di loket saat ini',
      stat: analyticsData?.jumlahAntrian.harian ?? 'N/A',
      icon: ListOrdered,
      href: '/admin/antrian',
      color: 'bg-emerald-500',
    },
    {
      name: 'Total Layanan',
      description: 'Jenis pemeriksaan dan perawatan tersedia',
      stat: '8',
      icon: Stethoscope,
      href: '/admin/layanan',
      color: 'bg-cyan-500',
    },
    {
      name: 'Jumlah Dokter',
      description: 'Dokter dan tenaga medis terdaftar',
      stat: '4',
      icon: Users,
      href: '/admin/dokter',
      color: 'bg-amber-500',
    },
    {
      name: 'Waktu Tunggu Rata-rata',
      description: 'Perkiraan waktu layanan pasien',
      stat: `${analyticsData?.rataRataWaktuTunggu ?? 'N/A'} mnt`,
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-indigo-500',
    },
  ];
  const topService = analyticsData?.layananPopuler?.[0];

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="rounded-2xl sm:rounded-[2rem] bg-white border border-gray-100 p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700/80">
              Ringkasan Operasional
            </p>
            <h1 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 break-words">
              Dasbor Admin Meow-Care
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              Pantau performa klinik, penggunaan layanan, dan kondisi antrian dalam satu tampilan yang dirancang untuk keputusan cepat.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:gap-3 w-full lg:w-auto lg:grid-cols-1">
            <Link
              href="/admin/antrian"
              className="rounded-xl sm:rounded-2xl bg-emerald-50 px-4 sm:px-5 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              Lihat Antrian Sekarang
            </Link>
            <Link
              href="/admin/analytics"
              className="rounded-xl sm:rounded-2xl bg-slate-900 px-4 sm:px-5 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Buka Analitik
            </Link>
            <Link
              href="/admin/layanan"
              className="rounded-xl sm:rounded-2xl bg-white border border-gray-200 px-4 sm:px-5 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-slate-900 transition hover:border-emerald-300"
            >
              Kelola Layanan
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
          {stats.map((item) => (
            <Link href={item.href} key={item.name}>
              <div className="group rounded-[1.5rem] border border-gray-200 bg-white p-4 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl h-full">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-500">{item.name}</p>
                    <p className="mt-2 sm:mt-4 text-2xl sm:text-3xl font-bold text-slate-900 truncate">{item.stat}</p>
                  </div>
                  <div className={`${item.color} rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-lg flex-shrink-0`}>
                    <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" aria-hidden="true" />
                  </div>
                </div>
                <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-500 line-clamp-2">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="rounded-xl sm:rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-4 sm:p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">Insight Cepat</p>
            <h2 className="mt-2 sm:mt-4 text-xl sm:text-2xl font-semibold text-slate-900">Fokus Operasional</h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              {topService
                ? `Layanan terpopuler saat ini adalah ${topService.nama} dengan ${topService.jumlah} pendaftar. Pastikan stok kebutuhan dan ketersediaan dokter untuk layanan ini selalu siap.`
                : 'Data layanan populer belum tersedia. Silakan periksa ulang koneksi data atau halaman analitik.'}
            </p>
            <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-3 sm:grid-cols-2">
              <div className="rounded-lg sm:rounded-2xl bg-white p-3 sm:p-4 shadow-sm">
                <p className="text-xs sm:text-sm text-gray-500">Pengembangan Cepat</p>
                <p className="mt-2 sm:mt-3 text-sm sm:text-lg font-semibold text-slate-900">Koordinasi tim medis dengan cepat.</p>
              </div>
              <div className="rounded-lg sm:rounded-2xl bg-white p-3 sm:p-4 shadow-sm">
                <p className="text-xs sm:text-sm text-gray-500">Prioritas Pasien</p>
                <p className="mt-2 sm:mt-3 text-sm sm:text-lg font-semibold text-slate-900">Utamakan pasien darurat dan antrian panjang.</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-[1.5rem] border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Perhatian</p>
            <h2 className="mt-2 sm:mt-4 text-xl sm:text-2xl font-semibold text-slate-900">Kondisi Antrian Hari Ini</h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              Gunakan data antrian dan lama tunggu sebagai dasar prioritas layanan. Jika rata-rata waktu tunggu meningkat, pertimbangkan menambah kapasitas antrian atau mempercepat proses verifikasi pasien.
            </p>
          </div>
        </div>
      </section>

      {analyticsData ? (
        <DashboardCharts data={analyticsData} />
      ) : (
        <div className="rounded-xl sm:rounded-[1.5rem] bg-white p-6 sm:p-8 shadow-sm border border-red-100">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Data Analitik Tidak Tersedia</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Saat ini data grafik belum berhasil dimuat. Silakan refresh atau periksa koneksi database.</p>
        </div>
      )}
    </div>
  );
}