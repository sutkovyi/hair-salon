import type { MetadataRoute } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://care-of-your-hair.n-sutkovoy.workers.dev';

const lastModified = new Date('2026-09-24');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/booking',
    '/uk',
    '/en',
    '/es',
    '/uk/booking',
    '/en/booking',
    '/es/booking',
    '/uk/privacy',
    '/en/privacy',
    '/es/privacy',
    '/uk/terms',
    '/en/terms',
    '/es/terms',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
  }));
}
