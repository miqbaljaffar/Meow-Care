import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  // `req.auth` sudah secara otomatis memiliki tipe yang benar dari NextAuth.js
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Jika mencoba mengakses halaman admin
  if (pathname.startsWith('/admin')) {
    const userRole = session?.user?.role;

    // Jika tidak ada sesi (session) atau role bukan ADMIN, redirect ke halaman login
    if (!session || userRole !== 'ADMIN') {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Lanjutkan ke request berikutnya jika lolos pengecekan
  return NextResponse.next();
});

// Konfigurasi ini tetap sama
export const config = {
  matcher: ['/admin/:path*'],
};