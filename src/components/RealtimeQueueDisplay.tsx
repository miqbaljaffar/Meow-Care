'use client';

import { useEffect, useState } from 'react';
import QueueCard from './QueueCard';

// 1. Definisikan tipe untuk data antrian
interface QueueData {
  current: number;
  next: number;
}

// 2. Definisikan tipe untuk props komponen
interface RealtimeQueueDisplayProps {
  initialQueueData: QueueData;
}

// 3. Terapkan tipe tersebut ke props
export default function RealtimeQueueDisplay({ initialQueueData }: RealtimeQueueDisplayProps) {
  const [queue, setQueue] = useState<QueueData>(initialQueueData);

  useEffect(() => {
    const fetchLatestQueue = async () => {
      try {
        const response = await fetch('/api/antrian/terkini');
        if (response.ok) {
          const latestData: QueueData = await response.json();
          setQueue(latestData);
        }
      } catch (error) {
        console.error('Gagal fetch antrian:', error);
      }
    };

    const intervalId = setInterval(fetchLatestQueue, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mb-12">
      <QueueCard label="Sedang Dilayani" queueNumber={queue.current} isCurrent={true} />
      <QueueCard label="Antrian Berikutnya" queueNumber={queue.next} />
    </div>
  );
}