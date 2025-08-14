import { PawPrint } from 'lucide-react';
import Link from 'next/link';

const faktaPilihan = [
    {
        judul: "Pendengaran Super Tajam",
        deskripsi: "Dengan 32 otot yang mengendalikan setiap telinga, kucing dapat memutar telinga hingga 180 derajat untuk mendeteksi suara dengan presisi luar biasa."
    },
    {
        judul: "Tidak Bisa Merasakan Manis",
        deskripsi: "Kucing adalah salah satu dari sedikit mamalia yang tidak memiliki reseptor rasa manis, membuat mereka acuh tak acuh terhadap makanan manis."
    },
    {
        judul: "Jago Lompat Tinggi",
        deskripsi: "Seekor kucing dapat melompat hingga enam kali tinggi badannya sendiri dalam sekali lompatan, berkat otot kaki belakangnya yang kuat."
    }
];

export default function FiySection() {
    return (
        <section id="fiy-homepage" className="py-20 bg-white">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Tahukah Anda?</h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                    Beberapa fakta menarik dan unik tentang kucing yang akan menambah wawasan Anda.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {faktaPilihan.map((fakta, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-center mb-3">
                                <PawPrint className="text-brand-green mr-3" size={24} />
                                <h3 className="text-xl font-bold text-gray-800">{fakta.judul}</h3>
                            </div>
                            <p className="text-gray-600">{fakta.deskripsi}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-12">
                    <Link
                        href="/fiy"
                        className="px-8 py-3 bg-brand-green text-white font-bold rounded-full shadow-md hover:bg-brand-green-dark transition-colors"
                    >
                        Lihat Fakta Lainnya
                    </Link>
                </div>
            </div>
        </section>
    );
}