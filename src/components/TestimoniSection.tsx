import prisma from '@/lib/prisma';
import Image from 'next/image';

async function getTestimoni() {
    return prisma.testimoni.findMany({
        take: 4, // Ambil 4 testimoni terbaru
        orderBy: { createdAt: 'desc' }
    });
}

export default async function TestimoniSection() {
    const testimoni = await getTestimoni();

    return (
        <section id="testimoni" className="py-20">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-12">Kata Mereka Tentang Meow-Care</h2>
                {testimoni.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimoni.map((item) => (
                            <div key={item.id} className="bg-white p-8 rounded-lg shadow-lg text-left">
                                <p className="text-gray-600 italic mb-4">&quot;{item.kutipan}&quot;</p>
                                <div className="flex items-center">
                                    <div className="relative w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                                        {/* Ganti div dengan Image */}
                                        <Image
                                            src={item.fotoKucing || '/kucing.jpg'} // Fallback jika tidak ada foto
                                            alt={`Kucing ${item.namaKucing}`}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold">{item.namaPelanggan}</p>
                                        <p className="text-sm text-gray-500">Pemilik Kucing &quot;{item.namaKucing}&quot;</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Belum ada testimoni.</p>
                )}
            </div>
        </section>
    );
}