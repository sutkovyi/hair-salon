import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../global.css';

const sharingDescription =
  'Стиліст по волоссю. Дитячі, чоловічі та жіночі стрижки. Зачіски та повсякденне укладання.';
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://care-of-your-hair.n-sutkovoy.workers.dev';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'L’Élégance | Стрижка у Валенсії',
  description: sharingDescription,
  keywords: [
    'стрижка Валенсія',
    'стрижка у Валенсії',
    'чоловіча стрижка у Валенсії',
    'жіноча стрижка у Валенсії',
    'дитяча стрижка у Валенсії',
  ],
  openGraph: {
    title: 'L’Élégance | Стрижка у Валенсії',
    description: sharingDescription,
    type: 'website',
    locale: 'uk_UA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Стиліст по волоссю за роботою в салоні L’Élégance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'L’Élégance | Стрижка у Валенсії',
    description: sharingDescription,
    images: ['/og-image.jpg'],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
