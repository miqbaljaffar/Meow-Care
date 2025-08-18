import { DefaultSession, User } from 'next-auth';
import 'next-auth/jwt';
import type { NextRequest } from 'next/server'; // <-- Tambahkan import ini

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}

// Tambahkan deklarasi modul untuk NextRequest
declare module 'next/server' {
  interface NextRequest {
    auth: {
      user?: {
        id?: string;
        role?: string;
      } & DefaultSession['user'];
    } | null;
  }
}