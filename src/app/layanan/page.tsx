import { Stethoscope, ShieldCheck, HeartPulse, Scissors, ShowerHead, Hotel } from 'lucide-react';
import Link from 'next/link';

// Kita definisikan data layanan di sini agar mudah dikelola
const daftarLayanan = [
  {
    slug: 'pemeriksaan-umum',
    nama: "Pemeriksaan Umum",
    deskripsi: "Pemeriksaan kesehatan rutin untuk memastikan kucing Anda selalu dalam kondisi prima.",
    icon: <Stethoscope size={40} className="text-brand-green" />
  },
  {
    slug: 'vaksinasi-imunisasi',
    nama: "Vaksinasi & Imunisasi",
    deskripsi: "Layanan vaksinasi lengkap untuk melindungi anabul dari berbagai penyakit berbahaya.",
    icon: <ShieldCheck size={40} className="text-brand-green" />
  },
  {
    slug: 'penanganan-darurat',
    nama: "Penanganan Darurat",
    deskripsi: "Tim kami siap menangani kasus darurat dengan cepat dan peralatan yang memadai.",
    icon: <HeartPulse size={40} className="text-brand-green" />
  },
  {
    slug: 'sterilisasi',
    nama: "Sterilisasi (Kastrasi/Kebiri)",
    deskripsi: "Prosedur untuk mengontrol populasi dan menjaga kesehatan jangka panjang kucing Anda.",
    icon: <Scissors size={40} className="text-brand-green" />
  },
  {
    slug: 'grooming-sehat',
    nama: "Grooming Sehat",
    deskripsi: "Membuat kucing Anda bersih, wangi, dan bebas dari kutu atau jamur yang mengganggu.",
    icon: <ShowerHead size={40} className="text-brand-green" />
  },
  {
    slug: 'penitipan-kucing',
    nama: "Penitipan Kucing (Cat Hotel)",
    deskripsi: "Fasilitas penitipan yang nyaman dan aman saat Anda bepergian.",
    icon: <Hotel size={40} className="text-brand-green" />
  }
];

export default function HalamanLayanan() {
  return (
    <section id="layanan" className="py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Pilih Layanan Kami</h1>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Kami menyediakan berbagai layanan kesehatan untuk memastikan sahabat Anda mendapatkan perawatan terbaik. Pilih layanan yang Anda butuhkan di bawah ini.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {daftarLayanan.map((layanan) => (
            <div key={layanan.slug} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="flex justify-center mb-4">
                {layanan.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{layanan.nama}</h3>
              <p className="text-gray-500 flex-grow">{layanan.deskripsi}</p>
              <div className="mt-6">
                <Link
                  href={`/antrian/baru?layanan=${layanan.nama}`} // <-- Mengirim nama layanan via URL query
                  className="w-full inline-block px-6 py-3 bg-brand-green text-white font-bold rounded-full shadow-md hover:bg-brand-green-dark transition-colors"
                >
                  Daftar Layanan Ini
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}