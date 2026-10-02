import { PawPrint, Heart, Stethoscope, Users } from 'lucide-react';
import Image from 'next/image';
import TimDokterSection from '@/components/TimDokterSection';
import AnimatedSection from '@/components/AnimatedSection';

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">
      <AnimatedSection>
        <div className="container mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-50 mb-4 sm:mb-6">
            <PawPrint className="text-brand-green" size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-5 leading-tight">
            Tentang Meow-Care
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kami lebih dari sekadar klinik hewan. Kami adalah komunitas pecinta kucing yang berdedikasi untuk memberikan kehidupan yang lebih sehat dan bahagia bagi setiap sahabat berbulu Anda.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="py-14 sm:py-20 bg-emerald-50/50">
          <div className="container mx-auto px-4 grid md:grid-cols-5 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-2 flex justify-center">
              <div className="relative w-full max-w-xs h-[360px] sm:h-[420px] lg:h-[480px] rounded-3xl shadow-xl overflow-hidden ring-1 ring-emerald-100">
                <Image
                  src="/poor-cat.jpg"
                  alt="Klinik Meow-Care"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="md:col-span-3 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700 shadow-sm mb-4 sm:mb-5">
                Cerita Kami
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
                Dari Garasi Kecil Menuju Klinik Modern
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-5 leading-relaxed text-sm sm:text-base">
                Meow-Care lahir dari sebuah mimpi sederhana: menciptakan sebuah tempat di mana kucing tidak hanya diobati, tetapi juga dicintai dan dipahami. Berawal dari garasi kecil dengan peralatan seadanya, kini kami telah berkembang menjadi klinik modern yang dilengkapi dengan fasilitas terbaik dan tim yang solid.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Setiap hari, kami berusaha untuk menjadi lebih baik, belajar hal baru, dan menerapkan teknologi terkini dalam perawatan hewan untuk memastikan anabul Anda mendapatkan yang terbaik. Tidak ada perawatan yang terlalu kecil untuk diberikan dengan sepenuh hati.
              </p>
              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-6 max-w-md">
                <div className="text-center p-3 sm:p-4 rounded-2xl bg-white shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-green">5+</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">Tahun Berjuang</div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-2xl bg-white shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-green">10K+</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">Kucing Dirawat</div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-2xl bg-white shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-green">15+</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">Layanan Kami</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <section id="values" className="py-14 sm:py-20">
          <div className="container mx-auto text-center px-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700 shadow-sm mb-3 sm:mb-4">
              Nilai-Nilai Kami
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 sm:mb-12 leading-tight">
              Apa yang Membuat Kami Berbeda
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 text-left flex flex-col h-full">
                <div className="flex justify-start mb-4 sm:mb-5">
                  <div className="p-3 sm:p-4 rounded-2xl bg-rose-50">
                    <Heart size={28} className="text-rose-500 sm:w-9 sm:h-9" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">Kasih Sayang</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-grow">
                  Kami merawat setiap pasien seolah-olah mereka adalah milik kami sendiri. Tidak hanya menyembuhkan, tapi juga memberikan kasih sayang yang tulus.
                </p>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 text-left flex flex-col h-full">
                <div className="flex justify-start mb-4 sm:mb-5">
                  <div className="p-3 sm:p-4 rounded-2xl bg-emerald-50">
                    <Stethoscope size={28} className="text-brand-green sm:w-9 sm:h-9" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">Profesionalisme</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-grow">
                  Tim kami terdiri dari para ahli yang berlisensi, berpengalaman, dan selalu mengikuti perkembangan medis terbaru di bidang kedokteran hewan.
                </p>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 text-left flex flex-col h-full">
                <div className="flex justify-start mb-4 sm:mb-5">
                  <div className="p-3 sm:p-4 rounded-2xl bg-sky-50">
                    <Users size={28} className="text-sky-500 sm:w-9 sm:h-9" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">Komunitas</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-grow">
                  Kami membangun hubungan yang kuat dengan pemilik hewan peliharaan dan aktif berbagi edukasi untuk menciptakan ekosistem pecinta kucing yang peduli.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <div className="bg-gray-50">
          <TimDokterSection />
        </div>
      </AnimatedSection>
    </div>
  );
}
