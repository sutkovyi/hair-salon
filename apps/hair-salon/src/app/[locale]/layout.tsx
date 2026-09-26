import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
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
  const t = await getTranslations({ locale });
  const metadataT = await getTranslations({ locale, namespace: 'metadata' });
  const stylistName = t('stylistName');
  const title = metadataT('title');
  const description = metadataT('description');
  const isEnglish = locale === 'en';
  const isRussian = locale === 'ru';

  return {
    metadataBase: new URL(siteUrl),
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
    },
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
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        uk: `${siteUrl}/uk`,
        en: `${siteUrl}/en`,
        ru: `${siteUrl}/ru`,
        'x-default': `${siteUrl}/uk`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEnglish ? 'en_US' : isRussian ? 'ru_RU' : 'uk_UA',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: metadataT('ogAlt', { stylistName }),
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
