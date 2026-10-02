import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/components/AuthProvider';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://meow-care.example.com';

const inter = Inter({ subsets: ['latin'], display: 'swap', preload: true });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Meow-Care | Klinik Kucing & Antrian Online',
    template: '%s | Meow-Care',
  },
  description:
    'Meow-Care adalah klinik kesehatan kucing modern dengan sistem antrian online, dokter hewan profesional, dan layanan lengkap mulai vaksinasi, grooming, hingga sterilisasi.',
  keywords: [
    'klinik kucing',
    'dokter hewan kucing',
    'antrian online klinik',
    'vaksinasi kucing',
    'grooming kucing',
    'sterilisasi kucing',
    'praktek hewan',
    'kesehatan kucing',
    'Meow-Care',
  ],
  authors: [{ name: 'Meow-Care Klinik Kucing' }],
  creator: 'Meow-Care',
  publisher: 'Meow-Care',
  category: 'health',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Meow-Care',
    title: 'Meow-Care | Klinik Kucing & Antrian Online',
    description:
      'Klinik kesehatan kucing modern dengan sistem antrian online. Layanan lengkap: vaksinasi, grooming, sterilisasi, konsultasi dokter hewan profesional.',
    url: SITE_URL,
    images: [
      {
        url: '/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Meow-Care - Klinik Kucing Modern',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meow-Care | Klinik Kucing & Antrian Online',
    description:
      'Klinik kesehatan kucing modern dengan sistem antrian online. Layanan lengkap untuk sahabat berbulu Anda.',
    images: ['/og-default.svg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#052e16' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com/maps" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <>
            <link rel="preconnect" href={new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin} crossOrigin="anonymous" />
          </>
        )}
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <AuthProvider>
          <Toaster position="top-center" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}