import NextAuth, { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Definisikan tipe AuthOptions secara eksplisit
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // Mengembalikan objek user dengan id, nama, dan email
          return { id: user.id.toString(), name: user.nama, email: user.email };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Objek `user` tersedia saat pertama kali sign-in
      // Kita teruskan `id` user ke dalam token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Token berisi `id` user, kita tambahkan ke objek session
      // agar bisa diakses di sisi client
      if (session.user) {
        // PERBAIKAN: Tipe `session.user` bawaan tidak memiliki `id`.
        // Kita lakukan casting untuk menambahkan properti `id` dari token.
        (session.user as { id: string; name?: string | null; email?: string | null; image?: string | null }).id = token.id as string;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };