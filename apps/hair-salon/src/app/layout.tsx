import './global.css';

export const metadata = {
  title: 'L’Élégance | Beauty Salon',
  description: 'Professional beauty care in Kyiv.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  )
}
