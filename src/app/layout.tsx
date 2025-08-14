import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; 
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Meow-Care | Puskesmas Kucing Modern',
  description: 'Antrian online untuk kesehatan anabul kesayangan Anda',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Toaster position="top-center" /> 
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}