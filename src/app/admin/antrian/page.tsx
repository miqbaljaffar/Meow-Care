// src/app/admin/antrian/page.tsx
import prisma from '@/lib/prisma';
import DasborAdmin from '@/components/DasborAdmin';

export default async function AdminAntrianPage() {
  const daftarAntrian = await prisma.antrian.findMany({
    orderBy: { nomorAntrian: 'asc' },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manajemen Antrian</h1>
      <DasborAdmin initialAntrian={daftarAntrian} />
    </div>
  );
}