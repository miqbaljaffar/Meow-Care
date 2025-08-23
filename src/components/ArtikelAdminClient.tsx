'use client';

import { useState } from 'react';
import { Artikel, User } from '@prisma/client';
import { deleteArtikel } from '@/actions/admin.actions';
import ArtikelFormModal from '@/components/ArtikelFormModal';
import AdminActionButtons from '@/components/AdminActionButtons';
import { PlusCircle, FileText, Calendar, Tag } from 'lucide-react';
import Image from 'next/image';

// Definisikan tipe Artikel dengan relasi Penulis
type ArtikelWithPenulis = Artikel & {
  penulis: User;
};

interface ArtikelAdminClientProps {
  initialArtikel: ArtikelWithPenulis[];
  authors: User[]; // Daftar penulis untuk dropdown
}

export default function ArtikelAdminClient({ initialArtikel, authors }: ArtikelAdminClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtikel, setSelectedArtikel] = useState<ArtikelWithPenulis | undefined>(undefined);

  const handleOpenModal = (artikel?: ArtikelWithPenulis) => {
    setSelectedArtikel(artikel);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedArtikel(undefined);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen Artikel Blog</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-white shadow-md transition-colors hover:bg-cyan-600"
        >
          <PlusCircle size={20} />
          <span>Tambah Artikel</span>
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Penulis</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {initialArtikel.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                     <div className="relative w-16 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                         {item.gambar ? (
                          <Image src={item.gambar} alt={item.judul} layout="fill" objectFit="cover" />
                        ) : (
                          <FileText className="w-full h-full text-gray-300 p-2" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{item.judul}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Tag size={12} /> {item.kategori || 'Tidak ada kategori'}
                        </div>
                      </div>
                   </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.penulis.nama}</td>
                <td className="px-6 py-4">
                   <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'terbit'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <AdminActionButtons
                    onEdit={() => handleOpenModal(item)}
                    onDelete={() => deleteArtikel(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <ArtikelFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        artikelToEdit={selectedArtikel}
        authors={authors}
      />
    </div>
  );
}