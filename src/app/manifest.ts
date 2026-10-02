import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Meow-Care Klinik Kucing',
    short_name: 'Meow-Care',
    description:
      'Sistem antrian online dan layanan kesehatan kucing terpercaya. Vaksinasi, grooming, sterilisasi, dan konsultasi dokter hewan profesional.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#047857',
    lang: 'id-ID',
    dir: 'ltr',
    categories: ['health', 'medical', 'lifestyle'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
        purpose: 'any',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
        purpose: 'maskable',
      },
    ],
    screenshots: [],
  };
}
