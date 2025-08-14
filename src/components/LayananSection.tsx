import { Stethoscope, ShieldCheck, HeartPulse } from 'lucide-react';

const layanan = [
  {
    icon: <Stethoscope size={40} className="text-brand-green" />,
    judul: "Pemeriksaan Umum",
    deskripsi: "Pemeriksaan kesehatan rutin untuk memastikan kucing Anda selalu dalam kondisi prima."
  },
  {
    icon: <ShieldCheck size={40} className="text-brand-green" />,
    judul: "Vaksinasi & Imunisasi",
    deskripsi: "Layanan vaksinasi lengkap untuk melindungi anabul dari berbagai penyakit berbahaya."
  },
  {
    icon: <HeartPulse size={40} className="text-brand-green" />,
    judul: "Penanganan Darurat",
    deskripsi: "Tim kami siap menangani kasus darurat dengan cepat dan peralatan yang memadai."
  }
];

export default function LayananSection() {
  return (
    <section id="layanan" className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Layanan Unggulan Kami</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Kami menyediakan berbagai layanan kesehatan untuk memastikan sahabat Anda mendapatkan perawatan terbaik.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {layanan.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.judul}</h3>
              <p className="text-gray-500">{item.deskripsi}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}