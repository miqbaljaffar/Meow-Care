'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Menu, X } from 'lucide-react';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar untuk desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
             <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <AdminSidebar />
          </div>
        </div>
      )}

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          {/* Tombol menu mobile */}
           <div className="p-4 lg:hidden">
             <button onClick={() => setIsSidebarOpen(true)} className="text-gray-500 hover:text-gray-700">
               <Menu className="h-6 w-6" />
             </button>
           </div>
           <div className="py-6 px-4 sm:px-6 lg:px-8">
             {children}
           </div>
        </main>
      </div>
    </div>
  );
}