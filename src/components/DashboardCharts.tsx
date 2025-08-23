'use client';

import { AreaChart, BarChart, Card, Title, Text } from "@tremor/react";

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
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-10">
      {/* Grafik Tren Kunjungan */}
      <Card className="lg:col-span-3">
        <Title>Tren Kunjungan 7 Hari Terakhir</Title>
        <AreaChart
          className="h-72 mt-4"
          data={data.trenKunjungan}
          index="date"
          categories={["Jumlah Kunjungan"]}
          colors={["emerald"]}
          valueFormatter={valueFormatter}
        />
      </Card>

      {/* Grafik Layanan Terpopuler */}
      <Card className="lg:col-span-2">
        <Title>Layanan Terpopuler</Title>
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
  );
}