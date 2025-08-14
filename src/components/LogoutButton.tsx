'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })} // Redirect ke home setelah logout
      className="px-6 py-2 bg-red-500 text-white font-bold rounded-full shadow-md hover:bg-red-600 transition-colors"
    >
      Logout
    </button>
  );
}