import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // <-- Impor Footer

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Meow-Care | Puskesmas Kucing Modern',
  description: 'Antrian online untuk kesehatan anabul kesayangan Anda',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-brand-white text-gray-800`}>
        <Navbar />
        <main>{children}</main>
        <Footer /> {/* <-- Tambahkan Footer di sini */}
      </body>
    </html>
  );
}