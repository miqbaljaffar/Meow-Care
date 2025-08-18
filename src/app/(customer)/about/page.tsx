import { PawPrint, Heart, Stethoscope, Users } from 'lucide-react';
import Image from 'next/image';
import TimDokterSection from '@/components/TimDokterSection';
import AnimatedSection from '@/components/AnimatedSection';

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <AnimatedSection>
        <div className="container mx-auto px-4 py-20 text-center">
          <PawPrint className="mx-auto text-brand-green mb-4" size={48} />
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Tentang Meow-Care</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kami lebih dari sekadar klinik hewan. Kami adalah komunitas pecinta kucing yang berdedikasi untuk memberikan kehidupan yang lebih sehat dan bahagia bagi setiap sahabat berbulu Anda.
          </p>
        </div>
      </AnimatedSection>

      {/* Our Story Section */}
      <AnimatedSection>
        <div className="py-20 bg-emerald-50/50">
          <div className="container mx-auto px-4 grid md:grid-cols-5 gap-12 items-center">
            {/* Kolom Gambar (Potrait) */}
            <div className="md:col-span-2 flex justify-center">
              <div className="relative w-full max-w-xs h-[450px] rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src="/poor-cat.jpg" 
                  alt="Klinik Meow-Care"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            {/* Kolom Teks */}
            <div className="md:col-span-3">
              <h2 className="text-3xl font-bold mb-4">Cerita Kami</h2>
              <p className="text-gray-600 mb-4">
                Meow-Care lahir dari sebuah mimpi sederhana: menciptakan sebuah tempat di mana kucing tidak hanya diobati, tetapi juga dicintai dan dipahami. Berawal dari garasi kecil, kini kami telah berkembang menjadi klinik modern yang dilengkapi dengan fasilitas terbaik dan tim yang solid.
              </p>
              <p className="text-gray-600">
                Setiap hari, kami berusaha untuk menjadi lebih baik, belajar hal baru, dan menerapkan teknologi terkini dalam perawatan hewan untuk memastikan anabul Anda mendapatkan yang terbaik.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection>
        <section id="values" className="py-20">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Nilai-Nilai Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <Heart size={40} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Kasih Sayang</h3>
                <p className="text-gray-500">Kami merawat setiap pasien seolah-olah mereka adalah milik kami sendiri.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <Stethoscope size={40} className="text-brand-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">Profesionalisme</h3>
                <p className="text-gray-500">Tim kami terdiri dari para ahli yang berlisensi dan berpengalaman.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <Users size={40} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Komunitas</h3>
                <p className="text-gray-500">Kami membangun hubungan yang kuat dengan pemilik hewan peliharaan.</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
      
      {/* Tim Dokter Section */}
      <AnimatedSection>
        <div className="bg-gray-50">
            <TimDokterSection />
        </div>
      </AnimatedSection>
    </div>
  );
}
