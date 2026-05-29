/* src/components/TampilanAntrian.tsx */
'use client';
import { useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import QueueCard from './QueueCard';
import { TampilanAntrianSkeleton } from './SkeletonLoader';

interface QueueData {
  current?: number;
  next?: number;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function createSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey, {
    realtime: {
      params: {
        events: ['INSERT', 'UPDATE', 'DELETE'],
      },
    },
  });
}

export default function TampilanAntrian({ initialData }: { initialData: QueueData }) {
  const [queue, setQueue] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseClient();
    let channel: ReturnType<SupabaseClient['channel']> | null = null;
    let intervalId: ReturnType<typeof window.setInterval> | null = null;

    const fetchLatestQueue = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/antrian/terkini');
        if (response.ok) {
          const latestData: QueueData = await response.json();
          setQueue(latestData);
        }
      } catch (error) {
        console.error('Gagal fetch antrian:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (supabase) {
      channel = supabase
        .channel('public:antrian')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'Antrian' }, () => {
          fetchLatestQueue();
        });

      channel.subscribe();
    } else {
      fetchLatestQueue();
      intervalId = setInterval(fetchLatestQueue, 3000);
    }

    return () => {
      if (channel && supabase) {
        supabase.removeChannel(channel);
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  if (isLoading) {
    return <TampilanAntrianSkeleton />;
  }

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
      <QueueCard label="Sedang Dilayani" queueNumber={queue.current || '-'} isCurrent={true} />
      <QueueCard label="Antrian Berikutnya" queueNumber={queue.next || '-'} />
    </div>
  );
}