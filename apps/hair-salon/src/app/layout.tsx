import type { Metadata, Viewport } from 'next';
import { getLocale } from 'next-intl/server';
import './global.css';

export const metadata: Metadata = {
  title: 'Nataliia Krasovska | Hair Stylist in Valencia',
  verification: {
    google: 'Z7E0bo4eTTRzmbs2bOL8-AobXSgII5Lu1IWgSKoB5TA',
  },
};

export const viewport: Viewport = {
  themeColor: '#fffefd',
  colorScheme: 'light',
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
