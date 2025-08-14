/* src/components/TampilanAntrian.tsx */
'use client';
import { useEffect, useState } from 'react';
import QueueCard from './QueueCard'; // <-- Impor komponennya

interface QueueData {
  current?: number;
  next?: number;
}

export default function TampilanAntrian({ initialData }: { initialData: QueueData }) {
  const [queue, setQueue] = useState(initialData);

  useEffect(() => {
    const fetchLatestQueue = async () => {
      const res = await fetch('/api/antrian/terkini');
      if(res.ok) {
        const data = await res.json();
        setQueue(data);
      }
    };
    const interval = setInterval(fetchLatestQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
      <QueueCard label="Sedang Dilayani" queueNumber={queue.current || '-'} isCurrent={true} />
      <QueueCard label="Antrian Berikutnya" queueNumber={queue.next || '-'} />
    </div>
  );
}