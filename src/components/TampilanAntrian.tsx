/* src/components/TampilanAntrian.tsx */
'use client';
import { useEffect, useState } from 'react';
import QueueCard from './QueueCard';

interface QueueData {
  current?: number;
  next?: number;
}

export default function TampilanAntrian({ initialData }: { initialData: QueueData }) {
  const [queue, setQueue] = useState(initialData);

  useEffect(() => {
    // URL server WebSocket
    const wsUrl = 'ws://localhost:3001';
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received queue update:', data);
        setQueue(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    // Cleanup function: tutup koneksi saat komponen di-unmount
    return () => {
      if (ws.readyState === 1) { // Jika koneksi masih OPEN
        ws.close();
      }
    };
  }, []); // Dependensi kosong agar hanya berjalan sekali saat komponen mount

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 md:grid-cols-2">
      <QueueCard label="Sedang Dilayani" queueNumber={queue.current || '-'} isCurrent={true} />
      <QueueCard label="Antrian Berikutnya" queueNumber={queue.next || '-'} />
    </div>
  );
}