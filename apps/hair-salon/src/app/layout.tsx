import type { Metadata, Viewport } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: 'Nataliia Krasovska | Hair Stylist in Valencia',
};

export const viewport: Viewport = {
  themeColor: '#fffefd',
  colorScheme: 'light',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
