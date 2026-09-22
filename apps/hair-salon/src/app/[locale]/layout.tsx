import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { CookieBanner } from '../components/CookieBanner';
import { GoogleAnalytics } from '../components/GoogleAnalytics';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://care-of-your-hair.n-sutkovoy.workers.dev';

type Locale = (typeof routing.locales)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === 'en';
  const stylistName = isEnglish ? 'Nataliia Krasovska' : 'Наталія Красовська';
  const title = isEnglish
    ? `${stylistName} | Hair Stylist in Valencia`
    : `${stylistName} | Стрижка у Валенсії`;
  const description = isEnglish
    ? `${stylistName} — hair stylist. Kids', men's and women's haircuts, hairstyles, and everyday styling.`
    : `${stylistName} — стиліст по волоссю. Дитячі, чоловічі та жіночі стрижки. Зачіски та повсякденне укладання.`;

  return {
    metadataBase: new URL(siteUrl),
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon0.svg', type: 'image/svg+xml' },
        { url: '/icon1.png', type: 'image/png', sizes: '96x96' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    title,
    description,
    keywords: [
      'стрижка Валенсія',
      'стрижка у Валенсії',
      'чоловіча стрижка у Валенсії',
      'жіноча стрижка у Валенсії',
      'дитяча стрижка у Валенсії',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEnglish ? 'en_US' : 'uk_UA',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isEnglish
            ? `${stylistName} — hair stylist in Valencia`
            : `${stylistName} — стиліст по волоссю у Валенсії`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      <CookieBanner />
      <GoogleAnalytics />
    </NextIntlClientProvider>
  );
}
