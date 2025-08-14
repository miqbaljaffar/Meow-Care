import prisma from '@/lib/prisma';
import { User, Kucing, RiwayatLayanan } from '@prisma/client';
// Anda memerlukan cara untuk mendapatkan ID pengguna yang sedang login, misalnya dari sesi.
// Untuk contoh ini, kita akan hardcode ID pengguna.
const USER_ID = 1; 

async function getProfileData(userId: number) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            kucing: {
                include: {
                    riwayat: true,
                },
            },
        },
    });
    return user;
}

export default async function ProfilPage() {
    const user = await getProfileData(USER_ID);

    if (!user) {
        return <p>Pengguna tidak ditemukan.</p>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Profil Saya</h1>
            
            {/* Informasi Pemilik */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Informasi Pemilik</h2>
                <p><strong>Nama:</strong> {user.nama}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>

            {/* Informasi Kucing */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Kucing Saya</h2>
                {user.kucing.map((kucing) => (
                    <div key={kucing.id} className="mb-6 border-b pb-6">
                        <h3 className="text-xl font-semibold">{kucing.nama}</h3>
                        <p><strong>Spesies:</strong> {kucing.spesies}</p>
                        <p><strong>Umur:</strong> {kucing.umur} tahun</p>
                        
                        {/* Riwayat Layanan */}
                        <div className="mt-4">
                            <h4 className="font-bold">Riwayat Layanan:</h4>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                {kucing.riwayat.map((riwayat) => (
                                    <li key={riwayat.id}>
                                        {new Date(riwayat.tanggal).toLocaleDateString('id-ID')}: {riwayat.jenisLayanan}
                                        {riwayat.catatan && ` - Catatan: ${riwayat.catatan}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
                 {/* Tombol untuk menambah data kucing bisa ditambahkan di sini */}
            </div>
        </div>
    );
}