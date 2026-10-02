import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Stethoscope, ShieldCheck, HeartPulse, Syringe, Scissors, Pill } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const fallbackLayanan = [
  { id: 1, nama: 'Pemeriksaan Umum', deskripsi: 'Pemeriksaan menyeluruh untuk memastikan kondisi kesehatan kucing Anda optimal.', icon: 'Stethoscope' },
  { id: 2, nama: 'Vaksinasi', deskripsi: 'Lindungi kucing dari penyakit berbahaya dengan program vaksinasi lengkap.', icon: 'Syringe' },
  { id: 3, nama: 'Grooming & Perawatan', deskripsi: 'Perawatan bulu, kuku, dan kebersihan untuk kucing yang sehat dan rapi.', icon: 'Scissors' },
];

const ICON_MAP: Record<string, LucideIcon> = {
  Stethoscope, ShieldCheck, HeartPulse, Syringe, Scissors, Pill,
};

async function getLayananUnggulan() {
  try {
    const data = await prisma.layanan.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
    return data.length > 0 ? data : fallbackLayanan;
  } catch (error) {
    console.warn('Gagal memuat layanan unggulan (fallback ditampilkan):', error);
    return fallbackLayanan;
  }
}

export default async function LayananSection() {
  const layanan = await getLayananUnggulan();

  const getIcon = (idx: number, iconName?: string | null) => {
    const Icon = (iconName && ICON_MAP[iconName]) || [Stethoscope, ShieldCheck, HeartPulse][idx % 3];
    return <Icon key={`icon-${idx}`} size={36} className="text-brand-green" />;
  };

  return (
    <section id="layanan" className="py-16 sm:py-20 bg-gray-50/50">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Layanan Unggulan Kami</h2>
        <p className="text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Kami menyediakan berbagai layanan kesehatan untuk memastikan sahabat Anda mendapatkan perawatan terbaik.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {layanan.map((item, idx) => (
            <div key={item.id} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 text-left flex flex-col h-full">
              <div className="flex justify-start mb-4">
                <div className="p-3 rounded-2xl bg-emerald-50">
                  {getIcon(idx, (item as { icon?: string | null }).icon || null)}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">{item.nama}</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-grow">{item.deskripsi}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 sm:mt-12">
          <Link
            href="/layanan"
            className="inline-block px-8 py-3 bg-brand-green text-white font-semibold rounded-full shadow-md hover:bg-brand-green-dark transition-all hover:shadow-lg active:scale-[0.98]"
          >
            Lihat Semua Layanan
          </Link>
        </div>
      </div>
    </section>
  );
}
