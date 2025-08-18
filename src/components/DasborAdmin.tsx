'use client';
import { useTransition } from 'react';
import { Antrian } from '@prisma/client';
import { updateStatusAntrian } from '@/actions/antrian.actions';
import { Clock, CheckCircle, PlayCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DasborAdmin({ initialAntrian }: { initialAntrian: Antrian[] }) {
  const [isPending, startTransition] = useTransition();

  const handleAction = (id: number, status: 'Dilayani' | 'Selesai', message: string) => {
    startTransition(async () => {
      const result = await updateStatusAntrian(id, status);
      if (result.success) {
        toast.success(message);
      } else {
        toast.error(result.message || 'Gagal memperbarui status.');
      }
    });
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Menunggu':
        return { icon: Clock, color: 'bg-yellow-100 text-yellow-800', textColor: 'text-yellow-500' };
      case 'Dilayani':
        return { icon: PlayCircle, color: 'bg-green-100 text-green-800', textColor: 'text-green-500' };
      case 'Selesai':
        return { icon: CheckCircle, color: 'bg-blue-100 text-blue-800', textColor: 'text-blue-500' };
      default:
        return { icon: Clock, color: 'bg-gray-100 text-gray-800', textColor: 'text-gray-500' };
    }
  };

  return (
    <div className="space-y-4">
      {initialAntrian.map((item) => {
        const statusInfo = getStatusInfo(item.status);
        return (
          <div key={item.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between transition-all hover:shadow-lg">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full ${statusInfo.textColor} bg-opacity-10`}>
                  <span className="text-3xl font-bold">{item.nomorAntrian}</span>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{item.namaPemilik}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.namaKucing} - <span className="font-medium">{item.jenisLayanan}</span></p>
                <span className={`mt-2 inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}>
                  <statusInfo.icon className="h-3 w-3" />
                  {item.status}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 flex gap-2 self-end sm:self-center">
              {item.status === 'Menunggu' && (
                <button 
                  onClick={() => handleAction(item.id, 'Dilayani', `Antrian #${item.nomorAntrian} dipanggil.`)} 
                  disabled={isPending} 
                  className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors"
                >
                  Panggil
                </button>
              )}
              {item.status === 'Dilayani' && (
                <button 
                  onClick={() => handleAction(item.id, 'Selesai', `Antrian #${item.nomorAntrian} selesai.`)} 
                  disabled={isPending} 
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
                >
                  Selesaikan
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}