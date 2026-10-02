import AdminShell from '@/components/AdminShell';
import { ReactNode } from 'react';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}