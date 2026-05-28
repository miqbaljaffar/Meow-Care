'use client';

import { AreaChart, BarChart, Card, Title } from "@tremor/react";

interface ChartData {
  layananPopuler: {
    nama: string;
    jumlah: number;
  }[];
  trenKunjungan: {
    date: string;
    'Jumlah Kunjungan': number;
  }[];
}

export default function DashboardCharts({ data }: { data: ChartData }) {

  const layananChartData = data.layananPopuler.map(item => ({
    name: item.nama,
    "Jumlah Pendaftar": item.jumlah,
  }));

  const valueFormatter = (number: number) => `${new Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <div className="space-y-6 mt-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="flex flex-col gap-3">
            <Title>Tren Kunjungan 7 Hari Terakhir</Title>
            <p className="text-sm text-gray-600">Pantau volume pasien dan identifikasi hari tersibuk untuk manajemen jadwal yang lebih efisien.</p>
          </div>
          <AreaChart
            className="h-72 mt-4"
            data={data.trenKunjungan}
            index="date"
            categories={["Jumlah Kunjungan"]}
            colors={["emerald"]}
            valueFormatter={valueFormatter}
          />
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex flex-col gap-3">
            <Title>Layanan Terpopuler</Title>
            <p className="text-sm text-gray-600">Lihat layanan yang paling banyak dipilih untuk memfokuskan promosi dan penempatan staf.</p>
          </div>
          <BarChart
            className="mt-6"
            data={layananChartData}
            index="name"
            categories={["Jumlah Pendaftar"]}
            colors={["emerald"]}
            valueFormatter={valueFormatter}
            yAxisWidth={48}
          />
        </Card>
      </div>

      <Card className="grid gap-4 lg:grid-cols-3">
        {data.layananPopuler.slice(0, 3).map((item) => (
          <div key={item.nama} className="rounded-3xl border border-gray-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">{item.nama}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{item.jumlah}</p>
            <p className="mt-2 text-sm text-gray-500">Pendaftar layanan</p>
          </div>
        ))}
      </Card>
    </div>
  );
}