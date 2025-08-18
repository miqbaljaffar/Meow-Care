import AdminShell from '@/components/AdminShell'; // Komponen baru
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}