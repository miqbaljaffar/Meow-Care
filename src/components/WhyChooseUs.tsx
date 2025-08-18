import { Award, DollarSign, Clock, Building2 } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const features = [
  {
    name: 'Fasilitas Modern',
    description: 'Kami menggunakan teknologi dan peralatan medis terkini untuk diagnosis dan perawatan yang akurat.',
    icon: Building2,
  },
  {
    name: 'Dokter Berpengalaman',
    description: 'Tim kami terdiri dari dokter hewan berlisensi dengan pengalaman bertahun-tahun dalam merawat kucing.',
    icon: Award,
  },
  {
    name: 'Sistem Antrian Online',
    description: 'Hemat waktu Anda dengan sistem antrian online kami yang praktis dan mudah dipantau dari mana saja.',
    icon: Clock,
  },
  {
    name: 'Harga Terjangkau',
    description: 'Kami menawarkan layanan berkualitas tinggi dengan harga yang kompetitif dan transparan.',
    icon: DollarSign,
  },
];

export default function WhyChooseUs() {
  return (
    <AnimatedSection>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Kenapa Memilih Meow-Care?</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Kami berkomitmen untuk memberikan pengalaman terbaik bagi Anda dan sahabat berbulu Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-green text-white mx-auto mb-4">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}