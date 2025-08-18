import { auth } from '@/app/api/auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';

export default auth((req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Jika mencoba mengakses halaman admin
  if (pathname.startsWith('/admin')) {
    // Jika tidak ada token atau role bukan ADMIN, redirect ke login
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'], // Terapkan middleware ini pada semua rute di bawah /admin
};