import type { MetadataRoute } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://krasovska.beauty';

const lastModified = new Date('2026-09-24');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/booking',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
  }));
}
