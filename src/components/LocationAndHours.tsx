import { MapPin, Clock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

export default function LocationAndHours() {
  return (
    <AnimatedSection>
      <div className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Peta Lokasi */}
          <div>
            <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
              <MapPin className="text-brand-green" />
              Lokasi Kami
            </h3>
            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.902310164993!2d107.616675!3d-6.902216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64c5e8866e5%3A0x232247501a5e5811!2sGedung%20Sate!5e0!3m2!1sid!2sid!4v1678886518306"
                title="Lokasi Meow-Care"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Jam Operasional */}
          <div>
            <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
              <Clock className="text-brand-green" />
              Jam Operasional
            </h3>
            <div className="bg-gray-800 p-5 sm:p-6 rounded-lg shadow-lg border border-gray-700">
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <span className="text-gray-100 font-medium">Senin - Jumat</span>
                  <span className="font-semibold text-brand-green-light bg-gray-900 px-3 py-1.5 rounded-md text-sm sm:text-base text-center sm:text-right">
                    08:00 - 20:00 WIB
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <span className="text-gray-100 font-medium">Sabtu</span>
                  <span className="font-semibold text-brand-green-light bg-gray-900 px-3 py-1.5 rounded-md text-sm sm:text-base text-center sm:text-right">
                    09:00 - 18:00 WIB
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <span className="text-gray-100 font-medium">Minggu &amp; Hari Libur</span>
                  <span className="font-semibold text-red-300 bg-gray-900 px-3 py-1.5 rounded-md text-sm sm:text-base text-center sm:text-right">
                    Tutup
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}