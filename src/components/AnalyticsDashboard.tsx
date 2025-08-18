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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analitik & Laporan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <Text>Antrian Hari Ini</Text>
          <Metric>{data.jumlahAntrian.harian}</Metric>
        </Card>
        <Card>
          <Text>Antrian Minggu Ini</Text>
          <Metric>{data.jumlahAntrian.mingguan}</Metric>
        </Card>
        <Card>
          <Text>Rata-rata Waktu Tunggu</Text>
          <Metric>{data.rataRataWaktuTunggu} Menit</Metric>
        </Card>
      </div>

      <Card>
        <Title>Layanan Terpopuler</Title>
        <BarChart
            className="mt-6"
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