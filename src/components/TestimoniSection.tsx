// src/components/TestimoniSection.tsx
import Image from 'next/image';

export default function TestimoniSection() {
    return (
        <section id="testimoni" className="py-20">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-12">Kata Mereka Tentang Meow-Care</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-left">
                        <p className="text-gray-600 italic mb-4">&quot;Sistem antriannya sangat membantu! Saya tidak perlu menunggu lama di klinik, bisa pantau dari rumah. Pelayanannya juga sangat ramah dan profesional.&quot;</p>
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                            <div>
                                <p className="font-bold">Aulia Putri</p>
                                {/* Perubahan di baris ini */}
                                <p className="text-sm text-gray-500">Pemilik Kucing &quot;Oyen&quot;</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg text-left">
                        <p className="text-gray-600 italic mb-4">&quot;Dokternya sangat telaten dan sabar menghadapi kucing saya yang penakut. Penjelasannya detail dan mudah dimengerti. Sangat direkomendasikan!&quot;</p>
                         <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                            <div>
                                <p className="font-bold">Budi Santoso</p>
                                 {/* Perubahan di baris ini */}
                                <p className="text-sm text-gray-500">Pemilik Kucing &quot;Milo&quot;</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}