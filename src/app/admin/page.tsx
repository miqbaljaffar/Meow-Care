import prisma from '@/lib/prisma';
import DasborAdmin from '@/components/DasborAdmin';

export default async function AdminPage() {
  const daftarAntrian = await prisma.antrian.findMany({
    orderBy: { nomorAntrian: 'asc' },
  });

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-6">Dasbor Admin</h1>
      <DasborAdmin initialAntrian={daftarAntrian} />
    </div>
  );
}