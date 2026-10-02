import type { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://meow-care.example.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'daily', priority: 1.0, lastModified: new Date() },
    { url: `${SITE_URL}/layanan`, changeFrequency: 'weekly', priority: 0.9, lastModified: new Date() },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.7, lastModified: new Date() },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.8, lastModified: new Date() },
    { url: `${SITE_URL}/login`, changeFrequency: 'yearly', priority: 0.3, lastModified: new Date() },
    { url: `${SITE_URL}/registrasi`, changeFrequency: 'yearly', priority: 0.3, lastModified: new Date() },
  ];

  let artikelUrls: MetadataRoute.Sitemap = [];
  try {
    const artikel = await prisma.artikel.findMany({
      where: { status: 'terbit' },
      select: { slug: true, updatedAt: true },
    });
    artikelUrls = artikel.map((a) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch {
    artikelUrls = [];
  }

  return [...staticUrls, ...artikelUrls];
}
