'use client';

import { useState } from 'react';
import { RiwayatLayanan } from '@prisma/client';
import { Cake, Cat, Pencil, Trash2, History, ChevronDown, MessageSquarePlus } from 'lucide-react';
import { deleteCat } from '@/actions/profil.actions';
import CatFormModal from './CatFormModal';
import toast from 'react-hot-toast';
import CustomerTestimoniModal from './CustomerTestimoniModal'; // <-- IMPORT BARU

// Impor tipe dari file page.tsx
import { KucingWithRiwayat } from '@/app/(customer)/profil/page';

interface CatCardProps {
  kucing: KucingWithRiwayat;
}

export default function CatCard({ kucing }: CatCardProps) {
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  // --- STATE BARU UNTUK MODAL TESTIMONI ---
  const [selectedRiwayat, setSelectedRiwayat] = useState<RiwayatLayanan | null>(null);

  const handleDelete = async () => {
    if (confirm(`Apakah Anda yakin ingin menghapus data "${kucing.nama}"?`)) {
      const result = await deleteCat(kucing.id.toString());
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <>
      <div className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-green hover:shadow-lg">
        {/* ... (bagian info kucing tidak berubah) ... */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800">{kucing.nama}</h3>
          <div className="mt-4 space-y-3 text-gray-600">
            <div className="flex items-center gap-3">
              <Cat className="h-5 w-5 text-gray-400" />
              <span>{kucing.spesies}</span>
            </div>
            <div className="flex items-center gap-3">
              <Cake className="h-5 w-5 text-gray-400" />
              <span>{kucing.umur} tahun</span>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button onClick={() => setIsCatModalOpen(true)} className="rounded-full p-2 text-blue-600 transition-colors hover:bg-blue-100" aria-label="Edit Kucing">
            <Pencil size={18} />
          </button>
          <button onClick={handleDelete} className="rounded-full p-2 text-red-600 transition-colors hover:bg-red-100" aria-label="Hapus Kucing">
            <Trash2 size={18} />
          </button>
        </div>
        <div className="mt-6 flex-grow border-t pt-4">
          <button onClick={() => setIsHistoryVisible(!isHistoryVisible)} className="flex w-full items-center justify-between text-left font-semibold text-gray-700 transition-colors hover:text-brand-green">
            <div className="flex items-center gap-2">
              <History size={18} />
              <span>Riwayat Medis</span>
            </div>
            <ChevronDown size={20} className={`transform transition-transform duration-300 ${isHistoryVisible ? 'rotate-180' : ''}`} />
          </button>
          {isHistoryVisible && (
            <div className="mt-4 space-y-4">
              {kucing.riwayat && kucing.riwayat.length > 0 ? (
                kucing.riwayat.map((riwayat) => (
                  <div key={riwayat.id} className="rounded-lg bg-gray-50 p-3 text-sm">
                    <p className="font-bold text-gray-800">
                      {new Date(riwayat.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="mt-1"><strong>Layanan:</strong> {riwayat.jenisLayanan}</p>
                    {riwayat.catatan && (<p><strong>Catatan:</strong> {riwayat.catatan}</p>)}
                    
                    {/* --- LOGIKA BARU UNTUK TESTIMONI --- */}
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      {riwayat.testimoni ? (
                        <p className="text-xs text-green-600 italic">Terima kasih atas ulasan Anda!</p>
                      ) : (
                        <button 
                          onClick={() => setSelectedRiwayat(riwayat)} 
                          className="flex items-center gap-1 text-xs font-semibold text-cyan-600 hover:underline"
                        >
                          <MessageSquarePlus size={14} />
                          Beri Ulasan
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="mt-2 text-sm text-gray-500">Belum ada riwayat medis yang tercatat.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <CatFormModal isOpen={isCatModalOpen} onClose={() => setIsCatModalOpen(false)} userId={kucing.pemilikId.toString()} kucingToEdit={kucing} />
      
      {/* --- RENDER MODAL TESTIMONI --- */}
      {selectedRiwayat && (
        <CustomerTestimoniModal 
          isOpen={!!selectedRiwayat} 
          onClose={() => setSelectedRiwayat(null)} 
          riwayat={selectedRiwayat} 
        />
      )}
    </>
  );
}