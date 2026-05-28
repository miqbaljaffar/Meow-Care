'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Artikel, User } from '@prisma/client';
import { createArtikel, updateArtikel } from '@/actions/admin.actions';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface ArtikelFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  artikelToEdit?: Artikel;
  authors: User[];
}

export default function ArtikelFormModal({ isOpen, onClose, artikelToEdit, authors }: ArtikelFormModalProps) {
  const [isPending, setIsPending] = useState(false);
  const [preview, setPreview] = useState<string | null>(artikelToEdit?.gambar || null);
  const isEditMode = !!artikelToEdit;

  useEffect(() => {
    // Reset preview saat modal dibuka/ditutup atau artikel berubah
    setPreview(artikelToEdit?.gambar || null);
  }, [isOpen, artikelToEdit]);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);

    const result = isEditMode
      ? await updateArtikel(artikelToEdit.id, formData)
      : await createArtikel(formData);

    if (result.success) {
      toast.success(result.message as string);
      onClose();
    } else {
       if (typeof result.message === 'string') {
        toast.error(result.message);
      } else {
        const validationErrors = Object.values(result.message).flat().join('\n');
        toast.error(`Periksa kembali isian Anda:\n${validationErrors}`);
      }
    }
    setIsPending(false);
  }
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-2xl my-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {isEditMode ? 'Edit Artikel' : 'Tambah Artikel Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="judul" className="block text-sm font-medium text-gray-700">Judul Artikel</label>
                <input id="judul" name="judul" type="text" defaultValue={artikelToEdit?.judul} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug URL</label>
              <input id="slug" name="slug" type="text" defaultValue={artikelToEdit?.slug} placeholder="contoh: tips-merawat-kucing" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
            </div>
          </div>

          <div>
            <label htmlFor="kutipan" className="block text-sm font-medium text-gray-700">Kutipan Singkat</label>
            <textarea id="kutipan" name="kutipan" rows={2} defaultValue={artikelToEdit?.kutipan} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
          </div>
          
          <div>
            <label htmlFor="konten" className="block text-sm font-medium text-gray-700">Konten (Markdown)</label>
            <textarea id="konten" name="konten" rows={8} defaultValue={artikelToEdit?.konten} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm font-mono text-sm" required />
            <p className="text-xs text-gray-500 mt-1">Anda bisa menggunakan sintaks Markdown untuk format teks.</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Gambar Utama</label>
            <div className="mt-2 flex items-center gap-4">
              {preview && <Image src={preview} alt="Preview" width={100} height={60} className="h-16 w-28 rounded-md object-cover" />}
              <input id="gambar" name="gambar" type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="penulisId" className="block text-sm font-medium text-gray-700">Penulis</label>
                <select id="penulisId" name="penulisId" defaultValue={artikelToEdit?.penulisId} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                  <option value="">Pilih Penulis</option>
                  {authors.map(author => (
                    <option key={author.id} value={author.id}>{author.nama}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">Kategori</label>
                <input id="kategori" name="kategori" type="text" defaultValue={artikelToEdit?.kategori || ''} placeholder="cth: Perawatan, Nutrisi" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select id="status" name="status" defaultValue={artikelToEdit?.status || 'draf'} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                  <option value="draf">Draf</option>
                  <option value="terbit">Terbit</option>
                </select>
              </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} disabled={isPending} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              Batal
            </button>
            <button type="submit" disabled={isPending} className="rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 disabled:opacity-50">
              {isPending ? 'Menyimpan...' : 'Simpan Artikel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}