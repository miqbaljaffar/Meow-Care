'use client';
import { useTransition } from 'react';
import { Antrian } from '@prisma/client';
import { updateStatusAntrian } from '@/actions/antrian.actions';
import { Clock, CheckCircle, PlayCircle, User, Cat } from 'lucide-react';
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
        return { icon: Clock, color: 'bg-amber-100 text-amber-800', textColor: 'text-amber-500' };
      case 'Dilayani':
        return { icon: PlayCircle, color: 'bg-cyan-100 text-cyan-800', textColor: 'text-cyan-500' };
      case 'Selesai':
        return { icon: CheckCircle, color: 'bg-emerald-100 text-emerald-800', textColor: 'text-emerald-500' };
      default:
        return { icon: Clock, color: 'bg-gray-100 text-gray-800', textColor: 'text-gray-500' };
    }
  };

  return (
    <div className="space-y-6">
      {initialAntrian.map((item) => {
        const statusInfo = getStatusInfo(item.status);
        return (
          <div key={item.id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between transition-all hover:shadow-xl hover:border-emerald-500 border-2 border-transparent">
            <div className="flex items-center gap-5 mb-4 sm:mb-0">
              <div className={`flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-2xl ${statusInfo.color}`}>
                  <span className={`text-4xl font-bold ${statusInfo.textColor}`}>{item.nomorAntrian}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <p className="text-lg font-bold text-gray-800">{item.namaPemilik}</p>
                </div>
                 <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Cat size={16} />
                    <span>{item.namaKucing} - <span className="font-medium text-gray-700">{item.jenisLayanan}</span></span>
                </div>
                <div className={`mt-2 inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full ${statusInfo.color}`}>
                  <statusInfo.icon className="h-4 w-4" />
                  {item.status}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 flex gap-3 self-end sm:self-center">
              {item.status === 'Menunggu' && (
                <button 
                  onClick={() => handleAction(item.id, 'Dilayani', `Antrian #${item.nomorAntrian} kini dilayani.`)} 
                  disabled={isPending} 
                  className="px-5 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-lg hover:bg-cyan-600 disabled:bg-gray-400 transition-all shadow-md hover:shadow-lg"
                >
                  Layani
                </button>
              )}
              {item.status === 'Dilayani' && (
                <button 
                  onClick={() => handleAction(item.id, 'Selesai', `Antrian #${item.nomorAntrian} telah selesai.`)} 
                  disabled={isPending} 
                  className="px-5 py-2 text-sm font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 disabled:bg-gray-400 transition-all shadow-md hover:shadow-lg"
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