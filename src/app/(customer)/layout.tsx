import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand-green focus:text-white focus:shadow-lg focus:outline-none"
      >
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">{children}</main>
      <Footer />
    </>
  );
}