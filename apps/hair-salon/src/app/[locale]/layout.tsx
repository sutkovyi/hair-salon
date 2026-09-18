import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../global.css';

const sharingDescription =
  'Стиліст по волоссю. Дитячі, чоловічі та жіночі стрижки. Зачіски та повсякденне укладання.';

export const metadata = {
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
  },
  twitter: {
    card: 'summary',
    title: 'L’Élégance | Стрижка у Валенсії',
    description: sharingDescription,
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
