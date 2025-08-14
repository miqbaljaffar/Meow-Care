import { ListPlus, Clock, Cat } from 'lucide-react';

export default function AlurPendaftaranSection() {
  return (
    <section id="alur" className="py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Hanya 3 Langkah Mudah</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Garis Penghubung (opsional, untuk tampilan desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5">
             <svg width="100%" height="2"><line x1="0" y1="1" x2="100%" y2="1" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="8 8"/></svg>
          </div>
          
          <div className="relative bg-white p-6 rounded-lg shadow-lg z-10">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full">
              <ListPlus className="text-brand-green" size={32} />
            </div>
            <h3 className="text-lg font-bold">1. Daftar Online</h3>
            <p className="text-sm text-gray-500">Isi formulir pendaftaran singkat untuk mendapatkan nomor antrian Anda secara instan.</p>
          </div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg z-10">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full">
              <Clock className="text-brand-green" size={32} />
            </div>
            <h3 className="text-lg font-bold">2. Pantau Antrian</h3>
            <p className="text-sm text-gray-500">Monitor nomor antrian secara live dari mana saja melalui website kami.</p>
          </div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg z-10">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full">
              <Cat className="text-brand-green" size={32} />
            </div>
            <h3 className="text-lg font-bold">3. Datang Tepat Waktu</h3>
            <p className="text-sm text-gray-500">Datanglah ke klinik saat nomor antrian Anda mendekati giliran.</p>
          </div>
        </div>
      </div>
    </section>
  );
}