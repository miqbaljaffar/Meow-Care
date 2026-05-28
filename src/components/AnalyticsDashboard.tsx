'use client';

import { BarChart, Card, Title, Text, Metric } from "@tremor/react";

interface AnalyticsData {
  jumlahAntrian: {
    harian: number;
    mingguan: number;
    bulanan: number;
  };
  layananPopuler: {
    nama: string;
    jumlah: number;
  }[];
  rataRataWaktuTunggu: number;
}

export default function AnalyticsDashboard({ data }: { data: AnalyticsData }) {

  const chartData = data.layananPopuler.map(item => ({
    name: item.nama,
    "Jumlah Penggunaan": item.jumlah,
  }));

  const topService = data.layananPopuler[0];

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white border border-gray-100 p-8 shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700/80">Analitik & Laporan</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">Data Performa Klinik</h1>
          </div>
          <div className="rounded-3xl bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
            {topService
              ? `Layanan terpopuler: ${topService.nama} (${topService.jumlah} pendaftar)`
              : 'Layanan populer belum tersedia.'}
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-gray-600 leading-relaxed">
          Lihat ringkasan performa antrian dan layanan untuk membantu tim Anda tetap cepat dalam mengambil keputusan.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="flex flex-col gap-3">
            <Title>Ringkasan Utama</Title>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-5">
                <Text>Antrian Hari Ini</Text>
                <Metric>{data.jumlahAntrian.harian}</Metric>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <Text>Antrian Minggu Ini</Text>
                <Metric>{data.jumlahAntrian.mingguan}</Metric>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <Text>Waktu Tunggu</Text>
                <Metric>{data.rataRataWaktuTunggu} Menit</Metric>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <Title>Wawasan Cepat</Title>
          <Text className="mt-3 text-gray-600 leading-relaxed">
            Prioritaskan layanan terpopuler dan atur jadwal dokter secara optimal untuk menurunkan waktu tunggu.
          </Text>
          <div className="mt-6 space-y-3">
            {data.layananPopuler.slice(0, 3).map((item) => (
              <div key={item.nama} className="rounded-3xl border border-gray-200 bg-white p-4">
                <p className="font-semibold text-slate-900">{item.nama}</p>
                <p className="text-sm text-gray-500">{item.jumlah} pasien memilih layanan ini</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="space-y-8">
        <Title>Visualisasi Layanan</Title>
        <BarChart
          className="mt-4"
          data={chartData}
          index="name"
          categories={["Jumlah Penggunaan"]}
          colors={["emerald"]}
          yAxisWidth={48}
        />
      </Card>
    </div>
  );
}