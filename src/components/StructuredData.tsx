type OrganizationJsonLdProps = {
  siteUrl: string;
};

export function OrganizationJsonLd({ siteUrl }: OrganizationJsonLdProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    name: 'Meow-Care Klinik Kucing',
    alternateName: 'Meow-Care',
    url: siteUrl,
    logo: `${siteUrl}/og-default.svg`,
    image: `${siteUrl}/og-default.svg`,
    description:
      'Klinik kesehatan kucing modern dengan sistem antrian online, dokter hewan profesional, dan layanan lengkap: vaksinasi, grooming, sterilisasi, hingga konsultasi.',
    email: 'halo@meow-care.example.com',
    telephone: '+62-22-0000-0000',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Kucing Sejahtera No. 123',
      addressLocality: 'Bandung',
      addressRegion: 'Jawa Barat',
      postalCode: '40115',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-6.902216',
      longitude: '107.616675',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'PublicHolidays'],
        opens: '00:00',
        closes: '00:00',
      },
    ],
    sameAs: [
      'https://facebook.com/meowcare',
      'https://instagram.com/meowcare',
      'https://x.com/meowcare',
    ],
    areaServed: 'ID',
    availableLanguage: ['Indonesian', 'English'],
    healthcareSpecialty: ['Feline medicine', 'Vaccination', 'Surgery', 'Dental', 'Grooming'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

type BlogPostingJsonLdProps = {
  slug: string;
  siteUrl: string;
  judul: string;
  kutipan?: string | null;
  gambar?: string | null;
  penulisNama?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export function BlogPostingJsonLd({
  slug,
  siteUrl,
  judul,
  kutipan,
  gambar,
  penulisNama = 'Tim Meow-Care',
  createdAt,
  updatedAt,
}: BlogPostingJsonLdProps) {
  const url = `${siteUrl}/blog/${slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: judul,
    description: kutipan || judul,
    image: gambar ? [gambar] : [`${siteUrl}/og-default.svg`],
    datePublished: createdAt ? new Date(createdAt).toISOString() : new Date().toISOString(),
    dateModified: updatedAt ? new Date(updatedAt).toISOString() : new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: penulisNama,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Meow-Care',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/og-default.svg` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: 'kesehatan kucing, tips perawatan kucing, klinik kucing',
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

type ServiceListJsonLdProps = {
  siteUrl: string;
  layanan: Array<{ nama: string; deskripsi: string }>;
};

export function ServiceListJsonLd({ siteUrl, layanan }: ServiceListJsonLdProps) {
  const provider = {
    '@type': 'VeterinaryCare',
    name: 'Meow-Care Klinik Kucing',
    url: siteUrl,
  };

  const items = layanan.map((l, i) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}/layanan#service-${i + 1}`,
    serviceType: l.nama,
    name: l.nama,
    description: l.deskripsi,
    provider,
    areaServed: 'ID',
    availableLanguage: ['Indonesian'],
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Layanan Meow-Care Klinik Kucing',
        itemListElement: items.map((x, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: x,
        })),
      }) }}
    />
  );
}
