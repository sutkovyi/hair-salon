import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: 'Nataliia Krasovska | Hair Stylist in Valencia',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
