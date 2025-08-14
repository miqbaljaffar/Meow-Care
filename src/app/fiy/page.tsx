import { PawPrint } from 'lucide-react';

const faktaKucing = [
  {
    judul: "Pendengaran Super Tajam",
    deskripsi: "Dengan 32 otot yang mengendalikan setiap telinga, kucing dapat memutar telinga hingga 180 derajat. Kemampuan ini memungkinkan mereka mendeteksi suara dengan presisi yang luar biasa.",
    sumber: "Narasi Tv"
  },
  {
    judul: "Tidak Bisa Merasakan Manis",
    deskripsi: "Kucing tidak memiliki reseptor rasa manis pada lidahnya. Jadi, jangan mencoba memberikan permen pada kucing Anda, mereka tidak akan menghargainya.",
    sumber: "Narasi Tv"
  },
  {
    judul: "Jago Lompat Tinggi",
    deskripsi: "Kucing dapat melompat hingga enam kali tinggi badan mereka sendiri, setara dengan manusia melompat setinggi gedung tiga lantai!",
    sumber: "Narasi Tv"
  },
  {
    judul: "Tidur Hampir Sepanjang Hari",
    deskripsi: "Rata-rata, kucing menghabiskan sekitar 15 jam sehari untuk tidur. Kebiasaan ini membantu mereka menghemat energi untuk berburu dan bermain.",
    sumber: "Gramedia.com"
  },
  {
    judul: "DNA Mirip Harimau",
    deskripsi: "Kucing memiliki 95,6% gen yang sama dengan harimau. Hal ini menjelaskan mengapa perilaku mereka, seperti mengintai dan menerkam, mirip dengan harimau.",
    sumber: "Gramedia.com"
  },
  {
    judul: "Hidung yang Unik",
    deskripsi: "Pola pada hidung kucing sama uniknya seperti sidik jari manusia. Tidak ada dua kucing yang memiliki pola hidung yang sama persis.",
    sumber: "kumparan.com"
  },
  {
      judul: "Berjalan Seperti Unta dan Jerapah",
      deskripsi: "Kucing berjalan dengan kedua kaki kanannya terlebih dahulu, lalu kedua kaki kirinya. Cara berjalan ini sama seperti yang dilakukan oleh unta dan jerapah.",
      sumber: "Purina Indonesia"
  },
   {
      judul: "Dengkuran Sebagai Terapi",
      deskripsi: "Suara dengkuran kucing memiliki frekuensi yang dapat membantu penyembuhan tulang dan jaringan. Frekuensi ini berkisar antara 25 hingga 150 Hertz.",
      sumber: "KlikDokter"
  }
];

export default function FiyPage() {
  return (
    <section id="fiy" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Fakta Menarik Tentang Kucing</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tambah wawasan Anda tentang sahabat berbulu dengan fakta-fakta unik yang mungkin belum Anda ketahui.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faktaKucing.map((fakta, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 p-3 rounded-full mr-4">
                  <PawPrint className="text-brand-green" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{fakta.judul}</h3>
              </div>
              <p className="text-gray-600 flex-grow">{fakta.deskripsi}</p>
              <p className="text-xs text-gray-400 mt-4">Sumber: {fakta.sumber}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}