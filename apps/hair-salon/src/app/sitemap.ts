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
    '/uk/booking',
    '/en/booking',
    '/uk/privacy',
    '/en/privacy',
    '/uk/terms',
    '/en/terms',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
  }));
}