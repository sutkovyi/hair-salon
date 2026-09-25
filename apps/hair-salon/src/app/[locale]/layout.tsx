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
  const isSpanish = locale === 'es';
  const stylistName =
    isEnglish || isSpanish ? 'Nataliia Krasovska' : 'Наталія Красовська';
  const title = isEnglish
    ? `${stylistName} — Hair Stylist in Valencia | Children's, Women's & Men's Haircuts`
    : isSpanish
      ? `${stylistName} — Peluquera en Valencia | Cortes y peinados`
      : `${stylistName} — перукар-стиліст у Валенсії | Дитячі, жіночі та чоловічі стрижки`;
  const description = isEnglish
    ? `${stylistName} is an independent hair stylist in Valencia. Children's, women's and men's haircuts, styling and hairstyles in Quatre Carreres.`
    : isSpanish
      ? `${stylistName} es peluquera independiente en Valencia. Cortes y peinados para niños, mujeres y hombres en Quatre Carreres.`
      : `${stylistName} — незалежний перукар-стиліст у Валенсії. Дитячі, жіночі та чоловічі стрижки, укладки та зачіски в районі Quatre Carreres.`;

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
        es: `${siteUrl}/es`,
        'x-default': `${siteUrl}/uk`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEnglish ? 'en_US' : isSpanish ? 'es_ES' : 'uk_UA',
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
