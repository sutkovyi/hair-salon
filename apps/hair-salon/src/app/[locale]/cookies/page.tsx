import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { legalContent } from '../legal-content';

type Props = {
  params: Promise<{ locale: string }>;
};

type Locale = (typeof routing.locales)[number];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  const t = await getTranslations({ locale, namespace: 'cookiePolicy' });
  return { title: t('title'), description: t('description') };
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const content = legalContent[locale as Locale].cookies;

  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#2b2d42]">
      <Header />
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-32 lg:px-10">
        <div className="prose prose-lg max-w-none text-[#2b2d42]">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
