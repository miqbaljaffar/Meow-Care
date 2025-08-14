import Image from 'next/image';

const tim = [
    { nama: 'Drh. Meilina', spesialisasi: 'Spesialis Penyakit Dalam', foto: '/dokter-1.jpg' },
    { nama: 'Drh. Adiputra', spesialisasi: 'Spesialis Bedah & Gigi', foto: '/dokter-2.jpg' },
]

export default function TimDokterSection() {
    return (
        <section id="tim" className="py-20 bg-white">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-12">Tim Dokter Profesional Kami</h2>
                <div className="flex flex-wrap justify-center gap-10">
                    {tim.map((dokter) => (
                        <div key={dokter.nama} className="text-center">
                            <div className="relative w-48 h-48 mx-auto mb-4">
                                {/* Ganti 'foto' dengan gambar asli di folder /public */}
                                <Image src={dokter.foto} alt={dokter.nama} layout="fill" objectFit="cover" className="rounded-full shadow-lg" />
                            </div>
                            <h3 className="text-xl font-bold">{dokter.nama}</h3>
                            <p className="text-brand-green">{dokter.spesialisasi}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}