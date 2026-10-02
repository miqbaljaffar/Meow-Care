'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

export default function LogoutButton() {
  const [isPending, setIsPending] = useState(false);

  const handleLogout = () => {
    setIsPending(true);
    signOut({ callbackUrl: '/' });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-red-500 text-white font-semibold rounded-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
    >
      <LogOut size={16} strokeWidth={2} aria-hidden="true" />
      <span>{isPending ? 'Keluar...' : 'Logout'}</span>
    </button>
  );
}